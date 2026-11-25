import React from 'react';
import { motion } from 'motion/react';
import { Loader2 } from 'lucide-react';
import { playUiMotionSound } from '../../utils/uiMotionSound';

export type ToggleSize = 'sm' | 'md' | 'lg';
export type ToggleColor = 'primary' | 'emerald' | 'violet' | 'dark';

export interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  size?: ToggleSize;
  color?: ToggleColor;
  disabled?: boolean;
  loading?: boolean;
  label?: string;
  description?: string;
  ariaLabel?: string;
  onLabel?: string;
  offLabel?: string;
  checkedIcon?: React.ReactNode;
  uncheckedIcon?: React.ReactNode;
  soundEnabled?: boolean;
  className?: string;
}

const SIZE_MAP: Record<
  ToggleSize,
  {
    track: string;
    trackWithText: string;
    thumb: string;
    shiftX: number;
    shiftTextX: number;
    textCls: string;
    spinner: string;
  }
> = {
  sm: {
    track: 'w-8 h-[18px] p-[2px]',
    trackWithText: 'w-11 h-[20px] p-[2px]',
    thumb: 'w-[14px] h-[14px]',
    shiftX: 14,
    shiftTextX: 24,
    textCls: 'text-[8.5px]',
    spinner: 'w-2.5 h-2.5',
  },
  md: {
    track: 'w-10 h-[22px] p-[2px]',
    trackWithText: 'w-[52px] h-[24px] p-[2px]',
    thumb: 'w-[18px] h-[18px]',
    shiftX: 18,
    shiftTextX: 28,
    textCls: 'text-[9.5px]',
    spinner: 'w-3 h-3',
  },
  lg: {
    track: 'w-[50px] h-7 p-[3px]',
    trackWithText: 'w-[62px] h-7 p-[3px]',
    thumb: 'w-[22px] h-[22px]',
    shiftX: 22,
    shiftTextX: 34,
    textCls: 'text-[10px]',
    spinner: 'w-3.5 h-3.5',
  },
};

const COLOR_MAP: Record<ToggleColor, { activeBg: string; ring: string }> = {
  primary: {
    activeBg: 'bg-[#ee2e65] shadow-[0_4px_12px_-3px_rgba(238,46,101,0.48)]',
    ring: 'focus-visible:ring-[#ee2e65]/30',
  },
  emerald: {
    activeBg: 'bg-[#10B981] shadow-[0_4px_12px_-3px_rgba(16,185,129,0.45)]',
    ring: 'focus-visible:ring-[#10B981]/30',
  },
  violet: {
    activeBg: 'bg-[#6852EC] shadow-[0_4px_12px_-3px_rgba(104,82,236,0.48)]',
    ring: 'focus-visible:ring-[#6852EC]/30',
  },
  dark: {
    activeBg: 'bg-[#1C1D21] shadow-[0_4px_12px_-3px_rgba(28,29,33,0.35)]',
    ring: 'focus-visible:ring-[#1C1D21]/25',
  },
};

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  checked,
  onChange,
  size = 'md',
  color = 'primary',
  disabled = false,
  loading = false,
  label,
  description,
  ariaLabel,
  onLabel,
  offLabel,
  checkedIcon,
  uncheckedIcon,
  soundEnabled = true,
  className = '',
}) => {
  const isBlocked = disabled || loading;
  const hasTrackText = Boolean(onLabel || offLabel);
  const sz = SIZE_MAP[size];
  const palette = COLOR_MAP[color];
  const shift = hasTrackText ? sz.shiftTextX : sz.shiftX;

  const handleToggle = () => {
    if (isBlocked) return;
    const next = !checked;
    playUiMotionSound(next ? 'pop' : 'tick', soundEnabled);
    onChange(next);
  };

  const control = (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-disabled={isBlocked}
      aria-busy={loading}
      aria-label={ariaLabel || label || 'Toggle switch'}
      disabled={isBlocked}
      onClick={handleToggle}
      className={`no-press relative inline-flex items-center shrink-0 rounded-full transition-colors duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] focus:outline-none focus-visible:ring-4 ${
        hasTrackText ? sz.trackWithText : sz.track
      } ${palette.ring} ${
        checked ? palette.activeBg : 'bg-[#B5BAC6] hover:bg-[#A3A9B7] border border-black/[0.10]'
      } ${isBlocked ? 'opacity-55 cursor-not-allowed' : 'cursor-pointer'} ${
        !label && !description ? className : ''
      }`}
    >
      {hasTrackText && (
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-y-0 flex items-center font-bold uppercase tracking-wider select-none transition-opacity duration-150 ${
            sz.textCls
          } ${
            checked
              ? 'left-2 text-white opacity-100'
              : 'right-2 text-[#5A5D67] opacity-90'
          }`}
        >
          {checked ? onLabel || 'ON' : offLabel || 'OFF'}
        </span>
      )}

      <motion.span
        aria-hidden="true"
        initial={false}
        animate={{ x: checked ? shift : 0 }}
        whileTap={isBlocked ? undefined : { scale: 0.94 }}
        transition={{ type: 'spring', stiffness: 520, damping: 32, mass: 0.7 }}
        className={`relative z-10 rounded-full bg-white shadow-[0_1px_4px_rgba(15,23,42,0.22)] flex items-center justify-center ${sz.thumb}`}
      >
        {loading ? (
          <Loader2 className={`${sz.spinner} text-[#5A5D67] animate-spin`} />
        ) : checked ? (
          checkedIcon || null
        ) : (
          uncheckedIcon || null
        )}
      </motion.span>
    </button>
  );

  if (!label && !description) {
    return control;
  }

  return (
    <div
      onClick={handleToggle}
      className={`inline-flex items-center justify-between gap-3 select-none ${
        isBlocked ? 'opacity-65 cursor-not-allowed' : 'cursor-pointer'
      } ${className}`}
    >
      <div
        className="min-w-0"
        onClick={(e) => {
          e.stopPropagation();
          handleToggle();
        }}
      >
        {label && (
          <div className="text-[12.5px] font-semibold text-[#1C1D21] leading-snug">
            {label}
          </div>
        )}
        {description && (
          <div className="text-[11px] text-[#646772] leading-snug mt-0.5">
            {description}
          </div>
        )}
      </div>
      <div onClick={(e) => e.stopPropagation()} className="shrink-0 flex items-center">
        {control}
      </div>
    </div>
  );
};
