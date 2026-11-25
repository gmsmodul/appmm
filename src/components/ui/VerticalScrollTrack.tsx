import React, { useRef, useState, useEffect, useCallback } from 'react';

export type VerticalScrollAccent = 'violet' | 'primary' | 'dark';

interface VerticalScrollTrackProps {
  children: React.ReactNode;
  /** Outer wrapper className (should define fixed height or flex-1) */
  className?: string;
  /** Inner scrollable container className */
  contentClassName?: string;
  /** Scrollbar color accent ('violet' matches screenshot reference, 'primary' matches #ee2e65, 'dark' matches #1C1D21) */
  accent?: VerticalScrollAccent;
  /** Right padding offset reserved for the floating pill rail */
  railInsetClass?: string;
}

const ACCENT_TOKENS: Record<
  VerticalScrollAccent,
  { track: string; thumb: string; thumbActive: string }
> = {
  violet: {
    track: 'bg-[#EDE9FE]',
    thumb: 'bg-[#6852EC]',
    thumbActive: 'bg-[#543DE2] shadow-[0_0_10px_rgba(104,82,236,0.4)]',
  },
  primary: {
    track: 'bg-[#FEF1F5]',
    thumb: 'bg-[#ee2e65]',
    thumbActive: 'bg-[#C11448] shadow-[0_0_10px_rgba(238,46,101,0.4)]',
  },
  dark: {
    track: 'bg-[#EAECEF]',
    thumb: 'bg-[#1C1D21]',
    thumbActive: 'bg-black shadow-[0_0_10px_rgba(28,29,33,0.28)]',
  },
};

/**
 * Floating pill vertical scrollbar track matching the sleek inset rounded capsule design.
 * Supports smooth native wheel/touch scrolling, direct rail click-to-jump, and pointer-dragged thumb.
 */
export const VerticalScrollTrack: React.FC<VerticalScrollTrackProps> = ({
  children,
  className = 'h-72',
  contentClassName = 'pr-3.5',
  accent = 'violet',
  railInsetClass = 'top-2 bottom-2 right-1.5',
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const moveTimerRef = useRef<number | null>(null);
  const dragRef = useRef<{
    active: boolean;
    startY: number;
    startScrollTop: number;
  }>({ active: false, startY: 0, startScrollTop: 0 });

  const [metrics, setMetrics] = useState({
    hasOverflow: false,
    thumbHeight: 56,
    thumbY: 0,
  });
  const [isActive, setIsActive] = useState(false);

  const measure = useCallback(() => {
    const el = scrollRef.current;
    const rail = railRef.current;
    if (!el) return;

    const { scrollTop, scrollHeight, clientHeight } = el;
    const maxScroll = Math.max(0, scrollHeight - clientHeight);
    const hasOverflow = maxScroll > 2;
    const railHeight = rail?.clientHeight || Math.max(80, clientHeight - 16);

    if (!hasOverflow) {
      setMetrics({ hasOverflow: false, thumbHeight: railHeight, thumbY: 0 });
      return;
    }

    const ratio = clientHeight / scrollHeight;
    const thumbHeight = Math.max(36, Math.min(railHeight * 0.72, Math.round(railHeight * ratio)));
    const maxTravel = Math.max(0, railHeight - thumbHeight);
    const progress = Math.min(1, Math.max(0, scrollTop / maxScroll));

    setMetrics({
      hasOverflow: true,
      thumbHeight,
      thumbY: progress * maxTravel,
    });
  }, []);

  const pulseScroll = useCallback(() => {
    setIsActive(true);
    if (moveTimerRef.current) window.clearTimeout(moveTimerRef.current);
    moveTimerRef.current = window.setTimeout(() => {
      if (!dragRef.current.active) setIsActive(false);
      moveTimerRef.current = null;
    }, 240);
  }, []);

  useEffect(() => {
    measure();
    const el = scrollRef.current;
    const rail = railRef.current;
    if (!el || typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', measure);
      return () => window.removeEventListener('resize', measure);
    }
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    if (rail) ro.observe(rail);
    Array.from(el.children).forEach((child) => ro.observe(child));
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [measure, children]);

  useEffect(() => {
    return () => {
      if (moveTimerRef.current) window.clearTimeout(moveTimerRef.current);
    };
  }, []);

  const handleScroll = () => {
    measure();
    pulseScroll();
  };

  const handleThumbPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const el = scrollRef.current;
    if (!el || !metrics.hasOverflow) return;

    dragRef.current = {
      active: true,
      startY: e.clientY,
      startScrollTop: el.scrollTop,
    };
    setIsActive(true);

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // Ignore if capture is unavailable
    }
  };

  const handleThumbPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.active) return;
    const el = scrollRef.current;
    const rail = railRef.current;
    if (!el || !rail) return;

    const maxTravel = Math.max(1, rail.clientHeight - metrics.thumbHeight);
    const maxScroll = Math.max(1, el.scrollHeight - el.clientHeight);
    const dy = e.clientY - dragRef.current.startY;
    const nextTop = dragRef.current.startScrollTop + (dy / maxTravel) * maxScroll;
    el.scrollTop = Math.max(0, Math.min(maxScroll, nextTop));
  };

  const handleThumbPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.active) return;
    dragRef.current.active = false;
    setIsActive(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // Ignore
    }
  };

  const handleRailClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = scrollRef.current;
    const rail = railRef.current;
    if (!el || !rail || !metrics.hasOverflow) return;
    const rect = rail.getBoundingClientRect();
    const clickY = e.clientY - rect.top - metrics.thumbHeight / 2;
    const maxTravel = Math.max(1, rect.height - metrics.thumbHeight);
    const ratio = Math.min(1, Math.max(0, clickY / maxTravel));
    const maxScroll = Math.max(0, el.scrollHeight - el.clientHeight);
    el.scrollTo({ top: ratio * maxScroll, behavior: 'smooth' });
    pulseScroll();
  };

  const token = ACCENT_TOKENS[accent];

  return (
    <div className={`relative min-h-0 ${className}`}>
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className={`no-scrollbar h-full overflow-y-auto overscroll-contain ${contentClassName}`}
      >
        {children}
      </div>

      {metrics.hasOverflow && (
        <div
          ref={railRef}
          role="scrollbar"
          aria-orientation="vertical"
          aria-valuemin={0}
          aria-valuemax={100}
          onClick={handleRailClick}
          className={`absolute ${railInsetClass} w-[5px] rounded-full ${token.track} cursor-pointer select-none z-20`}
        >
          <div
            onPointerDown={handleThumbPointerDown}
            onPointerMove={handleThumbPointerMove}
            onPointerUp={handleThumbPointerUp}
            onPointerCancel={handleThumbPointerUp}
            onClick={(e) => e.stopPropagation()}
            style={{
              height: `${metrics.thumbHeight}px`,
              transform: `translate3d(0, ${metrics.thumbY}px, 0)`,
            }}
            className={`vertical-scroll-thumb w-full rounded-full cursor-grab active:cursor-grabbing ${
              isActive ? `${token.thumbActive} scale-x-[1.18]` : `${token.thumb} hover:scale-x-[1.15]`
            }`}
          />
        </div>
      )}
    </div>
  );
};
