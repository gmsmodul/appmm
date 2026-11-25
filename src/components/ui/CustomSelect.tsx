import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { ChevronDown, Check, Search, X, Lock } from 'lucide-react';
import { playUiMotionSound } from '../../utils/uiMotionSound';

export interface CustomSelectOption {
  value: string;
  label: string;
  meta?: string;
  disabled?: boolean;
  disabledReason?: string;
  clearBlockerLabel?: string;
  onClearBlocker?: () => void;
}

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: CustomSelectOption[];
  placeholder?: string;
  size?: 'sm' | 'md';
  pill?: boolean;
  align?: 'left' | 'right';
  direction?: 'down' | 'up';
  searchable?: boolean;
  searchPlaceholder?: string;
  emptyText?: string;
  maxVisibleHeight?: number;
  className?: string;
  triggerClassName?: string;
  menuClassName?: string;
  ariaLabel?: string;
  disabled?: boolean;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  value,
  onChange,
  options,
  placeholder = 'Pilih opsi...',
  size = 'md',
  pill = false,
  align = 'left',
  direction = 'down',
  searchable,
  searchPlaceholder = 'Ketik untuk filter...',
  emptyText = 'Tidak ada opsi cocok.',
  maxVisibleHeight = 272,
  className = '',
  triggerClassName = '',
  menuClassName = '',
  ariaLabel,
  disabled = false,
}) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [coords, setCoords] = useState<{
    top: number;
    left: number;
    width: number;
    maxHeight: number;
    openUp: boolean;
  } | null>(null);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const isSearchable = searchable ?? options.length >= 10;
  const selectedOption = options.find((opt) => opt.value === value);

  const filteredOptions = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!isSearchable || !q) return options;
    return options.filter(
      (opt) =>
        opt.label.toLowerCase().includes(q) ||
        opt.value.toLowerCase().includes(q) ||
        (opt.meta && opt.meta.toLowerCase().includes(q)) ||
        (opt.disabledReason && opt.disabledReason.toLowerCase().includes(q))
    );
  }, [isSearchable, options, searchQuery]);

  const updatePosition = useCallback(() => {
    const el = triggerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const hasReasons = options.some((opt) => opt.disabled && opt.disabledReason);
    const rowHeight = hasReasons ? 46 : 36;
    const searchChrome = isSearchable ? 48 : 0;
    const estimatedHeight = Math.min(
      options.length * rowHeight + searchChrome + 16,
      maxVisibleHeight
    );

    const spaceBelow = Math.max(0, window.innerHeight - rect.bottom - 12);
    const spaceAbove = Math.max(0, rect.top - 12);
    const shouldOpenUp =
      direction === 'up' ||
      (spaceBelow < Math.min(estimatedHeight, 200) && spaceAbove > spaceBelow);

    const availableSpace = shouldOpenUp ? spaceAbove : spaceBelow;
    const clampedMaxHeight = Math.max(132, Math.min(maxVisibleHeight, availableSpace));

    const hasWideReason = options.some((opt) => opt.onClearBlocker);
    const minMenuWidth = Math.max(rect.width, hasWideReason ? 260 : 176);
    let left = align === 'right' ? rect.right - minMenuWidth : rect.left;
    if (left + minMenuWidth > window.innerWidth - 12) {
      left = Math.max(12, window.innerWidth - minMenuWidth - 12);
    }
    if (left < 12) left = 12;

    setCoords({
      top: shouldOpenUp ? rect.top - 6 : rect.bottom + 6,
      left,
      width: minMenuWidth,
      maxHeight: clampedMaxHeight,
      openUp: shouldOpenUp,
    });
  }, [align, direction, isSearchable, maxVisibleHeight, options]);

  useEffect(() => {
    if (!open) {
      setSearchQuery('');
      return;
    }
    updatePosition();

    if (isSearchable) {
      requestAnimationFrame(() => {
        searchInputRef.current?.focus();
      });
    }

    const onPointerDown = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        triggerRef.current &&
        !triggerRef.current.contains(target) &&
        menuRef.current &&
        !menuRef.current.contains(target)
      ) {
        setOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    const onScrollOrResize = (e: Event) => {
      if (menuRef.current && e.target instanceof Node && menuRef.current.contains(e.target)) {
        return;
      }
      const el = triggerRef.current;
      if (!el) {
        setOpen(false);
        return;
      }
      const rect = el.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) {
        setOpen(false);
        return;
      }
      updatePosition();
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
  }, [open, isSearchable, updatePosition]);

  const sizeCls =
    size === 'sm'
      ? 'h-8 px-3 text-xs gap-1.5'
      : 'h-9 px-3.5 text-[13px] gap-2';

  const radiusCls = pill ? 'rounded-full' : 'rounded-lg';

  return (
    <div className={`relative inline-block ${className}`}>
      <button
        ref={triggerRef}
        type="button"
        disabled={disabled}
        aria-label={ariaLabel || selectedOption?.label || placeholder}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => {
          if (disabled) return;
          setOpen((prev) => {
            playUiMotionSound(!prev ? 'pop' : 'tick');
            return !prev;
          });
        }}
        className={`inline-flex items-center justify-between w-full border transition-all duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] cursor-pointer select-none focus:outline-none ${radiusCls} ${sizeCls} ${
          disabled
            ? 'bg-gray-100 dark:bg-[#181B21] border-gray-300 dark:border-white/[0.1] text-gray-500 dark:text-[#687182] cursor-not-allowed'
            : open
            ? 'bg-white dark:bg-[#181B21] border-primary-500 ring-2 ring-primary-500/15 text-gray-900 dark:text-[#F1F3F7]'
            : 'bg-white dark:bg-[#181B21] border-gray-300 dark:border-white/[0.12] hover:border-gray-400 dark:hover:border-white/[0.2] text-gray-800 dark:text-[#E5E7EB]'
        } font-medium ${triggerClassName}`}
      >
        <span className={`truncate ${!selectedOption ? 'text-gray-500 dark:text-[#98A0B0]' : ''}`}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 shrink-0 transition-transform duration-[180ms] ease-[cubic-bezier(0.23,1,0.32,1)] ${
            open ? 'rotate-180 text-primary-600 dark:text-[#F4729A]' : 'text-gray-500 dark:text-[#98A0B0]'
          }`}
        />
      </button>

      {open &&
        coords &&
        createPortal(
          <div
            ref={menuRef}
            role="listbox"
            data-ui-popover="true"
            style={{
              position: 'fixed',
              top: coords.top,
              left: coords.left,
              minWidth: coords.width,
              maxHeight: coords.maxHeight,
              transform: coords.openUp ? 'translateY(-100%)' : undefined,
            }}
            className={`${
              coords.openUp ? 'animate-ui-pop-up' : 'animate-ui-pop'
            } flex flex-col bg-white/95 dark:bg-[#181B21]/98 backdrop-blur-sm rounded-xl border border-gray-300 dark:border-white/[0.12] shadow-[0_16px_38px_-10px_rgba(15,23,42,0.16)] dark:shadow-[0_18px_42px_-10px_rgba(0,0,0,0.6)] z-[9999] overflow-hidden ${menuClassName}`}
          >
            {isSearchable && (
              <div className="p-1.5 border-b border-gray-200 dark:border-white/[0.08] bg-white/95 dark:bg-[#181B21] shrink-0">
                <div className="relative flex items-center">
                  <Search className="w-3.5 h-3.5 text-gray-500 dark:text-[#98A0B0] absolute left-2.5 pointer-events-none" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={searchPlaceholder}
                    aria-label={searchPlaceholder}
                    className="w-full h-8 pl-8 pr-7 rounded-lg border border-gray-300 dark:border-white/[0.12] bg-gray-50/70 dark:bg-[#121418] text-xs text-gray-800 dark:text-[#F1F3F7] placeholder:text-gray-500 dark:placeholder:text-[#687182] focus:bg-white dark:focus:bg-[#121418] focus:outline-none focus:border-primary-500"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery('');
                        searchInputRef.current?.focus();
                      }}
                      aria-label="Hapus filter"
                      className="absolute right-1.5 p-1 rounded text-gray-500 dark:text-[#98A0B0] hover:text-gray-800 dark:hover:text-[#F1F3F7] hover:bg-gray-100 dark:hover:bg-[#232730] cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            )}

            <div className="p-1.5 overflow-y-auto space-y-0.5 flex-1">
              {filteredOptions.length === 0 ? (
                <div className="px-3 py-4 text-center text-xs text-gray-500">
                  {emptyText}
                </div>
              ) : (
                filteredOptions.map((opt) => {
                  const isSelected = opt.value === value;

                  if (opt.disabled) {
                    const hasBlockerContext = Boolean(opt.disabledReason || opt.onClearBlocker);
                    if (hasBlockerContext) {
                      return (
                        <div
                          key={opt.value}
                          role="option"
                          aria-disabled="true"
                          aria-selected={false}
                          className="w-full px-2.5 py-2 rounded-lg bg-gray-50 border border-gray-200/90 flex items-start justify-between gap-2.5 text-xs"
                        >
                          <div className="flex items-start gap-2 min-w-0">
                            <Lock className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                            <div className="min-w-0 space-y-0.5">
                              <div className="font-semibold text-gray-700 truncate">{opt.label}</div>
                              {opt.disabledReason && (
                                <div className="text-[11px] text-gray-600 leading-snug">
                                  {opt.disabledReason}
                                </div>
                              )}
                            </div>
                          </div>
                          {opt.onClearBlocker && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                playUiMotionSound('success');
                                opt.onClearBlocker?.();
                              }}
                              className="px-2 py-1 rounded-md bg-white hover:bg-primary-50 text-primary-700 border border-primary-300 text-[11px] font-semibold whitespace-nowrap shrink-0 cursor-pointer transition-colors duration-150"
                            >
                              {opt.clearBlockerLabel || 'Buka blokir'}
                            </button>
                          )}
                        </div>
                      );
                    }

                    return (
                      <button
                        key={opt.value}
                        type="button"
                        role="option"
                        aria-selected={false}
                        disabled
                        className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium text-gray-500 cursor-not-allowed flex items-center justify-between gap-2"
                      >
                        <span className="truncate">{opt.label}</span>
                        {opt.meta && <span className="text-[10px] text-gray-500 shrink-0">{opt.meta}</span>}
                      </button>
                    );
                  }

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
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-between gap-2 transition-colors duration-[180ms] ease-[cubic-bezier(0.23,1,0.32,1)] cursor-pointer ${
                        isSelected
                          ? 'bg-primary-50 text-primary-700'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-gray-950'
                      }`}
                    >
                      <span className="truncate">{opt.label}</span>
                      <div className="flex items-center gap-1.5 shrink-0">
                        {opt.meta && (
                          <span className="text-[10px] font-medium text-gray-500">{opt.meta}</span>
                        )}
                        {isSelected && (
                          <Check className="w-3.5 h-3.5 text-primary-600 shrink-0 animate-ui-check" />
                        )}
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};
