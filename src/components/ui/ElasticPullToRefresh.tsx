import React, { useRef, useState, useEffect, useCallback, useId } from 'react';
import { ArrowDown, RefreshCw, Check } from 'lucide-react';
import { playUiMotionSound } from '../../utils/uiMotionSound';

type PullStatus = 'idle' | 'pulling' | 'ready' | 'refreshing' | 'done';

interface ElasticPullToRefreshProps {
  children: React.ReactNode;
  /** Async or sync refresh handler invoked when pull crosses threshold and is released */
  onRefresh?: () => Promise<void> | void;
  /** Container classes */
  className?: string;
  /** Enable mouse click-drag even on wide desktop (used for UI Kit sandbox previews) */
  allowDesktopMousePull?: boolean;
  /** Increment to programmatically trigger an animated elastic pull-to-refresh preview */
  demoTriggerSeq?: number;
  /** Optional label overrides */
  labels?: {
    pull?: string;
    release?: string;
    refreshing?: string;
    done?: string;
  };
}

const THRESHOLD = 76;
const REFRESH_REST_HEIGHT = 60;
const MAX_PULL = 148;

function isScrollAtTop(target: EventTarget | null, boundary: HTMLElement | null): boolean {
  if (typeof window !== 'undefined' && window.scrollY > 2) return false;

  let node = target as HTMLElement | null;
  while (node && node !== boundary) {
    const style = window.getComputedStyle(node);
    const overflowY = style.overflowY;
    if ((overflowY === 'auto' || overflowY === 'scroll') && node.scrollTop > 2) {
      return false;
    }
    node = node.parentElement;
  }

  if (boundary && boundary.scrollTop > 2) return false;
  return true;
}

function shouldIgnoreTarget(target: EventTarget | null, selfContainer: HTMLElement | null): boolean {
  const el = target as HTMLElement | null;
  if (!el) return false;
  if (el.closest('input, textarea, select, option, [contenteditable="true"], [data-no-pull="true"]')) {
    return true;
  }
  const nearestPtr = el.closest('[data-elastic-ptr="true"]');
  if (nearestPtr && selfContainer && nearestPtr !== selfContainer) {
    return true;
  }
  return false;
}

export const ElasticPullToRefresh: React.FC<ElasticPullToRefreshProps> = ({
  children,
  onRefresh,
  className = '',
  allowDesktopMousePull = false,
  demoTriggerSeq = 0,
  labels,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const gradId = useId();

  const [status, setStatus] = useState<PullStatus>('idle');
  const [renderState, setRenderState] = useState({
    pull: 0,
    elasticExtra: 0,
    controlXRatio: 0.5,
  });

  // Physics state stored in refs for 60fps requestAnimationFrame updates
  const physRef = useRef({
    pull: 0,
    pullVel: 0,
    targetPull: 0,
    elasticExtra: 0,
    extraVel: 0,
    targetExtra: 0,
    controlXRatio: 0.5,
    rafId: null as number | null,
    status: 'idle' as PullStatus,
  });

  const gestureRef = useRef({
    tracking: false,
    engaged: false,
    lockedOut: false,
    startX: 0,
    startY: 0,
    isMouse: false,
  });

  const doneTimerRef = useRef<number | null>(null);
  const refreshRunRef = useRef(0);

  const setPullStatus = useCallback((next: PullStatus) => {
    const prev = physRef.current.status;
    if (prev !== next) {
      if (next === 'ready' && prev === 'pulling') {
        playUiMotionSound('pop');
      } else if (next === 'done') {
        playUiMotionSound('success');
      }
    }
    physRef.current.status = next;
    setStatus(next);
  }, []);

  const stopSpringLoop = useCallback(() => {
    if (physRef.current.rafId !== null) {
      window.cancelAnimationFrame(physRef.current.rafId);
      physRef.current.rafId = null;
    }
  }, []);

  const syncVisual = useCallback(() => {
    const p = physRef.current;
    setRenderState({
      pull: p.pull,
      elasticExtra: p.elasticExtra,
      controlXRatio: p.controlXRatio,
    });
  }, []);

  const startSpringLoop = useCallback(() => {
    if (physRef.current.rafId !== null) return;

    const reducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion) {
      physRef.current.pull = physRef.current.targetPull;
      physRef.current.elasticExtra = physRef.current.targetExtra;
      physRef.current.pullVel = 0;
      physRef.current.extraVel = 0;
      syncVisual();
      return;
    }

    const tick = () => {
      const p = physRef.current;
      // Under-damped spring for elastic rubber-band curve & snap-back
      const pullForce = (p.targetPull - p.pull) * 0.22;
      p.pullVel = (p.pullVel + pullForce) * 0.72;
      p.pull = Math.max(0, p.pull + p.pullVel);

      const extraForce = (p.targetExtra - p.elasticExtra) * 0.26;
      p.extraVel = (p.extraVel + extraForce) * 0.64;
      p.elasticExtra += p.extraVel;

      syncVisual();

      const settled =
        Math.abs(p.targetPull - p.pull) < 0.25 &&
        Math.abs(p.pullVel) < 0.25 &&
        Math.abs(p.targetExtra - p.elasticExtra) < 0.25 &&
        Math.abs(p.extraVel) < 0.25;

      if (settled) {
        p.pull = p.targetPull;
        p.elasticExtra = p.targetExtra;
        p.pullVel = 0;
        p.extraVel = 0;
        p.rafId = null;
        syncVisual();
        if (p.targetPull === 0 && p.status !== 'refreshing' && p.status !== 'done') {
          setPullStatus('idle');
        }
        return;
      }

      p.rafId = window.requestAnimationFrame(tick);
    };

    physRef.current.rafId = window.requestAnimationFrame(tick);
  }, [setPullStatus, syncVisual]);

  const executeRefresh = useCallback(async () => {
    const runId = ++refreshRunRef.current;
    setPullStatus('refreshing');
    physRef.current.targetPull = REFRESH_REST_HEIGHT;
    physRef.current.targetExtra = 0;
    startSpringLoop();

    const minWait = new Promise((r) => window.setTimeout(r, 850));
    try {
      await Promise.all([minWait, Promise.resolve(onRefresh?.())]);
    } catch {
      await minWait;
    }

    if (runId !== refreshRunRef.current) return;
    setPullStatus('done');

    if (doneTimerRef.current) window.clearTimeout(doneTimerRef.current);
    doneTimerRef.current = window.setTimeout(() => {
      if (runId !== refreshRunRef.current) return;
      physRef.current.targetPull = 0;
      physRef.current.targetExtra = 0;
      startSpringLoop();
      window.setTimeout(() => {
        if (runId === refreshRunRef.current && physRef.current.targetPull === 0) {
          setPullStatus('idle');
        }
      }, 260);
    }, 460);
  }, [onRefresh, setPullStatus, startSpringLoop]);

  const handleDragStart = useCallback(
    (clientX: number, clientY: number, target: EventTarget | null, isMouse: boolean) => {
      if (physRef.current.status === 'refreshing' || physRef.current.status === 'done') return;
      if (document.body.querySelector('[data-modal-sheet-backdrop="true"]')) return;
      if (shouldIgnoreTarget(target, containerRef.current)) return;
      if (!isScrollAtTop(target, containerRef.current)) return;

      if (isMouse && !allowDesktopMousePull && window.innerWidth >= 768) {
        return;
      }

      stopSpringLoop();
      gestureRef.current = {
        tracking: true,
        engaged: false,
        lockedOut: false,
        startX: clientX,
        startY: clientY,
        isMouse,
      };
    },
    [allowDesktopMousePull, stopSpringLoop]
  );

  const handleDragMove = useCallback(
    (clientX: number, clientY: number, preventDefault?: () => void) => {
      const g = gestureRef.current;
      if (!g.tracking || g.lockedOut) return;

      const dx = clientX - g.startX;
      const dy = clientY - g.startY;

      if (!g.engaged) {
        if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return;
        // Horizontal swipe or upward scroll -> lock out so normal UX is untouched
        if (Math.abs(dx) > Math.abs(dy) || dy <= 0) {
          g.lockedOut = true;
          g.tracking = false;
          return;
        }
        g.engaged = true;
      }

      preventDefault?.();

      const rawDy = Math.max(0, dy);
      // Asymptotic rubber-band damping
      const dampedPull = MAX_PULL * (1 - Math.exp(-rawDy / 175));
      const extraBelly = Math.max(0, (rawDy - dampedPull) * 0.24);

      const rect = containerRef.current?.getBoundingClientRect();
      const xRatio =
        rect && rect.width > 0
          ? Math.min(0.84, Math.max(0.16, (clientX - rect.left) / rect.width))
          : 0.5;

      const p = physRef.current;
      p.pull = dampedPull;
      p.targetPull = dampedPull;
      p.elasticExtra = Math.min(34, extraBelly);
      p.targetExtra = p.elasticExtra;
      p.controlXRatio = xRatio;
      p.pullVel = 0;
      p.extraVel = 0;

      setPullStatus(dampedPull >= THRESHOLD ? 'ready' : 'pulling');
      syncVisual();
    },
    [setPullStatus, syncVisual]
  );

  const handleDragEnd = useCallback(() => {
    const g = gestureRef.current;
    if (!g.tracking) return;
    const wasEngaged = g.engaged;
    g.tracking = false;
    g.engaged = false;
    g.lockedOut = false;

    if (!wasEngaged) return;

    const p = physRef.current;
    if (p.pull >= THRESHOLD) {
      executeRefresh();
    } else {
      p.targetPull = 0;
      p.targetExtra = 0;
      p.extraVel = -6;
      startSpringLoop();
    }
  }, [executeRefresh, startSpringLoop]);

  // Attach non-passive touch listeners so preventDefault suppresses native overscroll during active pull
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      handleDragStart(e.touches[0].clientX, e.touches[0].clientY, e.target, false);
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      handleDragMove(e.touches[0].clientX, e.touches[0].clientY, () => {
        if (e.cancelable) e.preventDefault();
      });
    };
    const onTouchEnd = () => handleDragEnd();

    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchmove', onTouchMove, { passive: false });
    el.addEventListener('touchend', onTouchEnd, { passive: true });
    el.addEventListener('touchcancel', onTouchEnd, { passive: true });

    return () => {
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove', onTouchMove);
      el.removeEventListener('touchend', onTouchEnd);
      el.removeEventListener('touchcancel', onTouchEnd);
    };
  }, [handleDragEnd, handleDragMove, handleDragStart]);

  // Mouse support for UI Kit sandbox or mobile-width preview
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!gestureRef.current.tracking || !gestureRef.current.isMouse) return;
      handleDragMove(e.clientX, e.clientY, () => e.preventDefault());
    };
    const onMouseUp = () => {
      if (!gestureRef.current.tracking || !gestureRef.current.isMouse) return;
      handleDragEnd();
    };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [handleDragEnd, handleDragMove]);

  // Programmatic demo trigger
  useEffect(() => {
    if (!demoTriggerSeq) return;
    stopSpringLoop();
    const p = physRef.current;
    p.controlXRatio = 0.5;
    p.pull = 0;
    p.targetPull = THRESHOLD + 22;
    p.elasticExtra = 0;
    p.targetExtra = 20;
    setPullStatus('pulling');
    startSpringLoop();

    const t1 = window.setTimeout(() => {
      setPullStatus('ready');
    }, 180);

    const t2 = window.setTimeout(() => {
      executeRefresh();
    }, 360);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [demoTriggerSeq, executeRefresh, setPullStatus, startSpringLoop, stopSpringLoop]);

  useEffect(() => {
    return () => {
      stopSpringLoop();
      if (doneTimerRef.current) window.clearTimeout(doneTimerRef.current);
    };
  }, [stopSpringLoop]);

  const { pull, elasticExtra, controlXRatio } = renderState;
  const isVisible = pull > 0.5 || status === 'refreshing' || status === 'done';
  const progress = Math.min(1, pull / THRESHOLD);

  // Compute SVG Elastic Quadratic Bézier Arc
  const headerTotalHeight = Math.max(0, pull + elasticExtra);
  const edgeY =
    status === 'refreshing' || status === 'done'
      ? Math.max(0, pull * 0.88)
      : Math.max(0, pull * 0.44);
  const apexY = Math.max(edgeY, pull * 1.14 + elasticExtra * 1.35);
  const svgH = Math.max(1, Math.ceil(apexY + 4));
  const controlX = Math.round(controlXRatio * 400);
  const svgPath = `M 0 0 L 400 0 L 400 ${edgeY.toFixed(1)} Q ${controlX} ${apexY.toFixed(1)} 0 ${edgeY.toFixed(1)} Z`;

  // Circular progress ring math
  const ringCircumference = 2 * Math.PI * 12;
  const ringDashOffset = ringCircumference * (1 - progress);

  const labelText =
    status === 'done'
      ? labels?.done || 'Data terbaru'
      : status === 'refreshing'
      ? labels?.refreshing || 'Memperbarui...'
      : status === 'ready'
      ? labels?.release || 'Lepaskan untuk segarkan'
      : labels?.pull || 'Tarik ke bawah';

  const showBadgeText = pull > 44 || status === 'refreshing' || status === 'done';
  const orbY = Math.max(-14, Math.min(pull - 42, (pull - 38) * 0.5));

  return (
    <div
      ref={containerRef}
      data-elastic-ptr="true"
      onMouseDown={(e) => {
        if (e.button !== 0) return;
        handleDragStart(e.clientX, e.clientY, e.target, true);
      }}
      className={`relative flex-1 min-h-0 flex flex-col overflow-hidden ${className}`}
    >
      {/* Elastic Curved SVG Header */}
      {isVisible && (
        <div
          aria-live="polite"
          className="pointer-events-none absolute top-0 inset-x-0 z-20 overflow-visible"
          style={{ height: `${headerTotalHeight}px` }}
        >
          <svg
            viewBox={`0 0 400 ${svgH}`}
            preserveAspectRatio="none"
            className="w-full block overflow-visible"
            style={{ height: `${svgH}px` }}
          >
            <defs>
              <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ee2e65" />
                <stop offset="100%" stopColor="#f45d8e" />
              </linearGradient>
            </defs>
            <path d={svgPath} fill={`url(#${gradId})`} />
          </svg>

          {/* Compact Floating Elastic Refresh Capsule */}
          <div
            className="absolute top-0 left-1/2 flex items-center"
            style={{
              transform: `translate3d(-50%, ${orbY}px, 0)`,
              opacity: Math.min(1, pull / 24),
            }}
          >
            <div
              className={`bg-white/95 backdrop-blur-xs rounded-full shadow-[0_8px_22px_-4px_rgba(238,46,101,0.42)] flex items-center transition-all duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                showBadgeText ? 'p-1 pr-3 gap-2' : 'p-1'
              } ${status === 'ready' ? 'scale-105' : 'scale-100'}`}
            >
              <div className="relative w-7 h-7 rounded-full bg-white flex items-center justify-center shrink-0">
                <svg
                  viewBox="0 0 30 30"
                  className={`absolute inset-0 w-full h-full -rotate-90 ${
                    status === 'refreshing' ? 'animate-spin' : ''
                  }`}
                >
                  <circle
                    cx="15"
                    cy="15"
                    r="12"
                    fill="none"
                    stroke="#FDE0E9"
                    strokeWidth="2.4"
                  />
                  <circle
                    cx="15"
                    cy="15"
                    r="12"
                    fill="none"
                    stroke={status === 'done' ? '#10B981' : '#ee2e65'}
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeDasharray={ringCircumference}
                    strokeDashoffset={
                      status === 'refreshing'
                        ? ringCircumference * 0.28
                        : status === 'done'
                        ? 0
                        : ringDashOffset
                    }
                    className="transition-[stroke] duration-200"
                  />
                </svg>

                {status === 'done' ? (
                  <Check className="w-3.5 h-3.5 text-[#10B981] stroke-[2.6px] animate-ui-check" />
                ) : status === 'refreshing' ? (
                  <RefreshCw className="w-3.5 h-3.5 text-[#ee2e65] animate-spin" />
                ) : (
                  <ArrowDown
                    className={`w-3.5 h-3.5 transition-colors duration-200 ${
                      status === 'ready' ? 'text-[#ee2e65]' : 'text-[#1C1D21]'
                    }`}
                    style={{
                      transform: `rotate(${status === 'ready' ? 180 : Math.round(progress * 165)}deg)`,
                    }}
                  />
                )}
              </div>

              {showBadgeText && (
                <span className="text-[11px] font-semibold text-[#1C1D21] tracking-tight whitespace-nowrap">
                  {labelText}
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Elastic Displaced Page Content */}
      <div
        className="relative flex-1 min-h-0 flex flex-col"
        style={{
          transform: pull > 0.2 ? `translate3d(0, ${pull.toFixed(2)}px, 0)` : undefined,
          willChange: pull > 0.2 ? 'transform' : undefined,
        }}
      >
        {children}
      </div>
    </div>
  );
};
