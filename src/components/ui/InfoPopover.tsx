import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export interface InfoPopoverProps {
  content: React.ReactNode;
  label?: string;
  align?: 'left' | 'right' | 'center';
  maxWidth?: number;
  className?: string;
}

export const InfoPopover: React.FC<InfoPopoverProps> = ({
  content,
  label = 'Informasi',
  align = 'left',
  maxWidth = 320,
  className = '',
}) => {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const hoverCloseTimerRef = useRef<number | null>(null);

  const [pinned, setPinned] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [coords, setCoords] = useState<{
    top: number;
    left: number;
    width: number;
    placement: 'bottom' | 'top';
  }>({ top: 0, left: 0, width: maxWidth, placement: 'bottom' });

  const isOpen = pinned || hovered;

  const clearHoverTimer = () => {
    if (hoverCloseTimerRef.current !== null) {
      window.clearTimeout(hoverCloseTimerRef.current);
      hoverCloseTimerRef.current = null;
    }
  };

  const updatePosition = useCallback(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;

    const rect = trigger.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const width = Math.min(maxWidth, vw - 24);

    let left = rect.left;
    if (align === 'right') {
      left = rect.right - width;
    } else if (align === 'center') {
      left = rect.left + rect.width / 2 - width / 2;
    }
    left = Math.min(Math.max(12, left), Math.max(12, vw - width - 12));

    const popHeight = popoverRef.current?.offsetHeight || 88;
    const spaceBelow = vh - rect.bottom;
    const spaceAbove = rect.top;
    const placement: 'bottom' | 'top' =
      spaceBelow < popHeight + 16 && spaceAbove > spaceBelow ? 'top' : 'bottom';

    const top =
      placement === 'bottom'
        ? Math.min(vh - popHeight - 12, rect.bottom + 8)
        : Math.max(12, rect.top - popHeight - 8);

    setCoords({ top, left, width, placement });
  }, [align, maxWidth]);

  useLayoutEffect(() => {
    if (!isOpen) return;
    updatePosition();
    const raf = window.requestAnimationFrame(updatePosition);
    return () => window.cancelAnimationFrame(raf);
  }, [isOpen, content, updatePosition]);

  useEffect(() => {
    if (!isOpen) return;

    const handleScrollOrResize = () => updatePosition();
    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node | null;
      if (
        target &&
        !triggerRef.current?.contains(target) &&
        !popoverRef.current?.contains(target)
      ) {
        setPinned(false);
        setHovered(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setPinned(false);
        setHovered(false);
      }
    };

    window.addEventListener('resize', handleScrollOrResize);
    window.addEventListener('scroll', handleScrollOrResize, true);
    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('touchstart', handlePointerDown, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('resize', handleScrollOrResize);
      window.removeEventListener('scroll', handleScrollOrResize, true);
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('touchstart', handlePointerDown);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, updatePosition]);

  useEffect(() => () => clearHoverTimer(), []);

  if (!content) return null;

  const handleMouseEnter = () => {
    clearHoverTimer();
    setHovered(true);
  };

  const handleMouseLeave = () => {
    clearHoverTimer();
    hoverCloseTimerRef.current = window.setTimeout(() => {
      setHovered(false);
    }, 110);
  };

  return (
    <span
      className={`relative inline-flex items-center align-middle shrink-0 ${className}`}
      onClick={(e) => e.stopPropagation()}
      onKeyDown={(e) => e.stopPropagation()}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-label={label}
        aria-expanded={isOpen}
        onClick={(e) => {
          e.stopPropagation();
          clearHoverTimer();
          setPinned((prev) => !prev);
        }}
        className={`w-[17px] h-[17px] rounded-full border inline-flex items-center justify-center transition-colors shrink-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ee2e65]/40 ${
          isOpen
            ? 'bg-[#FEF1F5] dark:bg-[#ee2e65]/20 border-[#ee2e65] text-[#9D113C] dark:text-[#F8A5C2]'
            : 'bg-white dark:bg-[#1B1E24] border-black/[0.16] dark:border-white/[0.14] text-[#6E717A] dark:text-[#98A0B0] hover:text-[#1C1D21] dark:hover:text-[#F1F3F7] hover:border-black/[0.35] dark:hover:border-white/[0.25]'
        }`}
      >
        <span className="text-[10px] font-bold leading-none select-none">?</span>
      </button>

      {isOpen &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            ref={popoverRef}
            role="tooltip"
            data-ui-popover="true"
            aria-label={label}
            onClick={(e) => e.stopPropagation()}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
              position: 'fixed',
              top: `${coords.top}px`,
              left: `${coords.left}px`,
              width: `${coords.width}px`,
              zIndex: 9999,
            }}
            className="bg-white dark:bg-[#181B21] rounded-2xl border border-black/[0.12] dark:border-white/[0.12] shadow-[0_14px_34px_-10px_rgba(15,23,42,0.2)] dark:shadow-[0_16px_38px_-10px_rgba(0,0,0,0.6)] p-3.5 text-[12px] leading-relaxed text-[#4B4E57] dark:text-[#C5CAD3] animate-ui-pop select-text cursor-default"
          >
            {content}
          </div>,
          document.body
        )}
    </span>
  );
};
