import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { ChevronDown, Check, Filter } from 'lucide-react';
import { playUiMotionSound } from '../../utils/uiMotionSound';

export interface SplitFilterOption {
  value: string;
  label: string;
  mobileLabel?: string;
  badge?: number | string;
  badgeClassName?: string;
}

interface SplitFilterButtonProps {
  value: string;
  onChange: (value: string) => void;
  options: SplitFilterOption[];
  prefix?: string;
  icon?: React.ComponentType<{ className?: string }>;
  variant?: 'dark' | 'primary' | 'surface';
  align?: 'left' | 'right';
  ariaLabel?: string;
  className?: string;
}

export const SplitFilterButton: React.FC<SplitFilterButtonProps> = ({
  value,
  onChange,
  options,
  prefix,
  icon: Icon = Filter,
  variant = 'surface',
  align = 'left',
  ariaLabel,
  className = '',
}) => {
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState<{
    top: number;
    left: number;
    width: number;
    openUp: boolean;
  } | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const activeIndex = Math.max(
    0,
    options.findIndex((opt) => opt.value === value)
  );
  const activeOption = options[activeIndex] || options[0];

  const updatePosition = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const estimatedHeight = Math.min(options.length * 38 + 16, 280);
    const spaceBelow = window.innerHeight - rect.bottom;
    const shouldOpenUp = spaceBelow < estimatedHeight + 12 && rect.top > estimatedHeight;

    const minMenuWidth = Math.max(rect.width, 176);
    let left = align === 'right' ? rect.right - minMenuWidth : rect.left;
    if (left + minMenuWidth > window.innerWidth - 12) {
      left = Math.max(12, window.innerWidth - minMenuWidth - 12);
    }
    if (left < 12) left = 12;

    setCoords({
      top: shouldOpenUp ? rect.top - 6 : rect.bottom + 6,
      left,
      width: minMenuWidth,
      openUp: shouldOpenUp,
    });
  }, [align, options.length]);

  useEffect(() => {
    if (!open) return;
    updatePosition();

    const onPointerDown = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        containerRef.current &&
        !containerRef.current.contains(target) &&
        menuRef.current &&
        !menuRef.current.contains(target)
      ) {
        setOpen(false);
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };

    const onScrollOrResize = (e: Event) => {
      if (menuRef.current && e.target instanceof Node && menuRef.current.contains(e.target)) {
        return;
      }
      setOpen(false);
    };

    document.addEventListener('mousedown', onPointerDown);
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('scroll', onScrollOrResize, true);
    window.addEventListener('resize', onScrollOrResize);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('scroll', onScrollOrResize, true);
      window.removeEventListener('resize', onScrollOrResize);
    };
  }, [open, updatePosition]);

  const handleCycleNext = () => {
    if (options.length <= 1) return;
    playUiMotionSound('tick');
    const nextOption = options[(activeIndex + 1) % options.length];
    onChange(nextOption.value);
  };

  const getMobileLabel = (opt: SplitFilterOption) => {
    if (opt.mobileLabel) return opt.mobileLabel;
    const trimmed = opt.label.trim();
    return trimmed.split(/\s+/)[0] || trimmed;
  };

  const styles =
    variant === 'primary'
      ? {
          wrapper: 'border-[#FBC2D4] bg-[#FEF1F5] shadow-2xs',
          left: 'bg-[#FEF1F5] hover:bg-[#FDE0E9] text-[#9D113C]',
          right: 'bg-[#FDE6EE] hover:bg-[#FAD6E3] text-[#9D113C] border-l border-[#FBC2D4]',
          activeBadge: 'bg-[#9D113C] text-white',
          menuActive: 'bg-[#FEF1F5] text-[#9D113C] font-semibold',
          menuCheck: 'text-[#ee2e65]',
        }
      : variant === 'surface'
      ? {
          wrapper: 'border-[#C9C6FA] bg-[#EFEFFE] shadow-2xs',
          left: 'bg-[#EFEFFE] hover:bg-[#E2E0FC] text-[#3F3B99]',
          right: 'bg-[#E5E3FC] hover:bg-[#D7D4FA] text-[#3F3B99] border-l border-[#C9C6FA]',
          activeBadge: 'bg-[#3F3B99] text-white',
          menuActive: 'bg-[#EFEFFE] text-[#3F3B99] font-semibold',
          menuCheck: 'text-[#3F3B99]',
        }
      : {
          wrapper: 'border-[#ee2e65] bg-[#ee2e65] shadow-xs',
          left: 'bg-[#ee2e65] hover:bg-[#d82256] text-white',
          right: 'bg-[#dc265b] hover:bg-[#c81e50] text-white border-l border-white/20',
          activeBadge: 'bg-white/20 text-white',
          menuActive: 'bg-[#FEF1F5] text-[#9D113C] font-semibold',
          menuCheck: 'text-[#ee2e65]',
        };

  return (
    <div ref={containerRef} className={`relative inline-flex shrink-0 ${className}`}>
      <div
        className={`inline-flex items-stretch h-9 rounded-full overflow-hidden border transition-all ${styles.wrapper}`}
      >
        <button
          type="button"
          onClick={handleCycleNext}
          aria-label={ariaLabel || `Ganti ${prefix || 'filter'}`}
          title="Klik untuk beralih cepat, atau tekan panah untuk memilih opsi"
          className={`inline-flex items-center justify-center gap-1.5 px-3.5 text-[13px] font-medium transition-colors active:scale-[0.98] whitespace-nowrap cursor-pointer ${styles.left}`}
        >
          <Icon className="w-4 h-4 shrink-0" />
          <span className="sm:hidden">{getMobileLabel(activeOption)}</span>
          <span className="hidden sm:inline">
            {(() => {
              if (!prefix) return activeOption.label;
              const lowerLabel = activeOption.label.toLowerCase();
              const lowerPrefix = prefix.toLowerCase();
              if (
                lowerLabel.startsWith(lowerPrefix) ||
                ((lowerPrefix === 'class' || lowerPrefix === 'kelas') &&
                  (lowerLabel.includes('class') || lowerLabel.includes('kelas')))
              ) {
                return activeOption.label;
              }
              return `${prefix}: ${activeOption.label}`;
            })()}
          </span>
          {activeOption.badge !== undefined && (
            <span
              className={`min-w-[18px] h-[18px] px-1.5 rounded-full text-[10.5px] font-bold inline-flex items-center justify-center tabular-nums ${styles.activeBadge}`}
            >
              {activeOption.badge}
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={() =>
            setOpen((prev) => {
              playUiMotionSound(!prev ? 'pop' : 'tick');
              return !prev;
            })
          }
          aria-label={ariaLabel ? `Buka menu ${ariaLabel}` : 'Buka daftar filter'}
          aria-haspopup="listbox"
          aria-expanded={open}
          className={`inline-flex items-center justify-center px-2.5 transition-colors duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] cursor-pointer ${styles.right}`}
        >
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-[180ms] ease-[cubic-bezier(0.23,1,0.32,1)] ${
              open ? 'rotate-180' : ''
            }`}
          />
        </button>
      </div>

      {open &&
        coords &&
        createPortal(
          <div
            ref={menuRef}
            role="listbox"
            style={{
              position: 'fixed',
              top: coords.top,
              left: coords.left,
              minWidth: coords.width,
              transform: coords.openUp ? 'translateY(-100%)' : undefined,
            }}
            className={`${
              coords.openUp ? 'animate-ui-pop-up' : 'animate-ui-pop'
            } bg-white/95 backdrop-blur-sm rounded-2xl border border-black/[0.14] shadow-[0_16px_38px_-10px_rgba(15,23,42,0.18)] p-1.5 z-[9999] max-h-64 overflow-y-auto space-y-0.5`}
          >
            {options.map((opt) => {
              const isSelected = opt.value === value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    playUiMotionSound('tick');
                    onChange(opt.value);
                    setOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-[12.5px] flex items-center justify-between gap-2.5 transition-all duration-[180ms] ease-[cubic-bezier(0.23,1,0.32,1)] cursor-pointer ${
                    isSelected
                      ? styles.menuActive
                      : 'text-[#1C1D21] hover:bg-[#F4F5F8] font-medium'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="truncate">{opt.label}</span>
                    {opt.badge !== undefined && (
                      <span
                        className={`min-w-[18px] h-[18px] px-1.5 rounded-full text-[10.5px] font-bold inline-flex items-center justify-center tabular-nums ${
                          isSelected
                            ? variant === 'dark'
                              ? 'bg-white/20 text-white'
                              : 'bg-[#9D113C] text-white'
                            : opt.badgeClassName || 'bg-[#F4F5F8] text-[#1C1D21]'
                        }`}
                      >
                        {opt.badge}
                      </span>
                    )}
                  </div>
                  {isSelected && (
                    <Check className={`w-3.5 h-3.5 shrink-0 animate-ui-check ${styles.menuCheck}`} />
                  )}
                </button>
              );
            })}
          </div>,
          document.body
        )}
    </div>
  );
};
