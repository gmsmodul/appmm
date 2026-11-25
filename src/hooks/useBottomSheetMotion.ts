import React, { useRef, useCallback } from 'react';
import { playUiMotionSound } from '../utils/uiMotionSound';

interface UseBottomSheetMotionOptions {
  onClose: () => void;
  /** Allow drag-to-dismiss regardless of viewport width (e.g. bottom drawer). */
  alwaysBottomSheet?: boolean;
}

/**
 * Provides fluid iOS/Framer-style spring drag-to-dismiss, rubber-band upward
 * resistance, velocity-aware swipe exit, and smooth animated close for mobile bottom sheets.
 */
export function useBottomSheetMotion({
  onClose,
  alwaysBottomSheet = false,
}: UseBottomSheetMotionOptions) {
  const sheetRef = useRef<HTMLElement | null>(null);
  const backdropRef = useRef<HTMLDivElement | null>(null);
  const dragState = useRef({
    active: false,
    started: false,
    startY: 0,
    startTime: 0,
    lastY: 0,
  });
  const closingRef = useRef(false);

  const isBottomSheetViewport = () =>
    alwaysBottomSheet || (typeof window !== 'undefined' && window.innerWidth < 640);

  const prefersReducedMotion = () =>
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  const animateClose = useCallback(() => {
    if (closingRef.current) return;
    closingRef.current = true;

    const sheetEl = sheetRef.current;
    const backdropEl = backdropRef.current;

    if (backdropEl) {
      backdropEl.dataset.closing = 'true';
    }

    if (!sheetEl || prefersReducedMotion()) {
      closingRef.current = false;
      onClose();
      return;
    }

    const isMobileSheet = isBottomSheetViewport();
    sheetEl.style.willChange = 'transform, opacity, filter';
    sheetEl.style.transition = isMobileSheet
      ? 'transform 240ms cubic-bezier(0.23, 1, 0.32, 1), opacity 200ms cubic-bezier(0.23, 1, 0.32, 1)'
      : 'transform 200ms cubic-bezier(0.23, 1, 0.32, 1), opacity 180ms cubic-bezier(0.23, 1, 0.32, 1), filter 180ms cubic-bezier(0.23, 1, 0.32, 1)';
    sheetEl.style.transform = isMobileSheet
      ? 'translate3d(0, 105%, 0)'
      : 'translate3d(0, 14px, 0) scale(0.95)';
    sheetEl.style.opacity = '0';
    if (!isMobileSheet) {
      sheetEl.style.filter = 'blur(3px)';
    }

    if (backdropEl) {
      backdropEl.style.transition = 'opacity 200ms cubic-bezier(0.23, 1, 0.32, 1)';
      backdropEl.style.opacity = '0';
    }

    playUiMotionSound('tick', true);

    window.setTimeout(() => {
      closingRef.current = false;
      onClose();
    }, isMobileSheet ? 240 : 200);
  }, [onClose, alwaysBottomSheet]);

  const onPointerDown = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      if (!isBottomSheetViewport() || closingRef.current) return;
      if (e.button !== 0 && e.pointerType === 'mouse') return;

      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Do not hijack taps/clicks on interactive form controls or buttons
      if (
        target.closest(
          'button, a, input, textarea, select, label, [role="button"], [role="option"], [role="menuitem"], [role="combobox"]'
        )
      ) {
        return;
      }

      const sheetEl = sheetRef.current;
      const isHandle = Boolean(target.closest('[data-sheet-handle="true"]'));
      // Only start dragging from top if content isn't scrolled down (unless grabbing the handle directly)
      if (!isHandle && sheetEl && sheetEl.scrollTop > 4) {
        return;
      }

      dragState.current = {
        active: true,
        started: false,
        startY: e.clientY,
        startTime: Date.now(),
        lastY: 0,
      };

      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch {
        // Ignore if pointer capture is unavailable
      }
    },
    [alwaysBottomSheet]
  );

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLElement>) => {
    if (!dragState.current.active || closingRef.current) return;
    const rawDelta = e.clientY - dragState.current.startY;

    if (!dragState.current.started) {
      if (Math.abs(rawDelta) < 5) return;
      // If user scrolls down inside content (swiping up while scrollable), cancel sheet drag
      const sheetEl = sheetRef.current;
      const target = e.target as HTMLElement | null;
      const isHandle = Boolean(target?.closest('[data-sheet-handle="true"]'));
      if (rawDelta < 0 && !isHandle && sheetEl && sheetEl.scrollHeight > sheetEl.clientHeight + 4) {
        dragState.current.active = false;
        return;
      }
      dragState.current.started = true;
    }

    dragState.current.lastY = rawDelta;

    const sheetEl = sheetRef.current;
    const backdropEl = backdropRef.current;
    if (!sheetEl) return;

    // Gentle iOS rubber-band resistance if pulled slightly upward
    const translateY =
      rawDelta >= 0 ? rawDelta : -Math.pow(Math.abs(rawDelta), 0.56);
    const scale =
      rawDelta > 0 ? Math.max(0.965, 1 - rawDelta / 2800) : 1;

    sheetEl.style.transition = 'none';
    sheetEl.style.transform = `translate3d(0, ${translateY.toFixed(1)}px, 0) scale(${scale.toFixed(4)})`;

    if (backdropEl && rawDelta >= 0) {
      const nextOpacity = Math.max(0.12, 1 - rawDelta / 380);
      backdropEl.style.transition = 'none';
      backdropEl.style.opacity = nextOpacity.toFixed(3);
    }
  }, []);

  const finishDrag = useCallback(() => {
    if (!dragState.current.active) return;
    const wasStarted = dragState.current.started;
    const deltaY = dragState.current.lastY;
    const elapsed = Math.max(1, Date.now() - dragState.current.startTime);
    dragState.current.active = false;
    dragState.current.started = false;

    if (!wasStarted) return;

    const velocity = deltaY / elapsed; // px per ms
    const shouldDismiss = deltaY > 92 || (deltaY > 28 && velocity > 0.45);

    if (shouldDismiss) {
      animateClose();
      return;
    }

    // Snap back cleanly to resting position (< 300ms Emil Kowalski ease-out)
    const sheetEl = sheetRef.current;
    const backdropEl = backdropRef.current;
    if (sheetEl) {
      sheetEl.style.transition =
        'transform 260ms cubic-bezier(0.23, 1, 0.32, 1), opacity 200ms cubic-bezier(0.23, 1, 0.32, 1)';
      sheetEl.style.transform = 'translate3d(0, 0, 0) scale(1)';
      sheetEl.style.opacity = '1';
      playUiMotionSound('land', true);
    }
    if (backdropEl) {
      backdropEl.style.transition = 'opacity 220ms cubic-bezier(0.23, 1, 0.32, 1)';
      backdropEl.style.opacity = '1';
    }
  }, [animateClose]);

  const setSheetElement = useCallback((el: HTMLElement | null) => {
    sheetRef.current = el;
  }, []);

  return {
    setSheetElement,
    backdropRef,
    animateClose,
    sheetGestureProps: {
      onPointerDown,
      onPointerMove,
      onPointerUp: finishDrag,
      onPointerCancel: finishDrag,
    },
  };
}
