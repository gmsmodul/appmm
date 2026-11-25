import React, { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { PageId } from '../../types';
import { useIsMobile } from '../../hooks/useIsMobile';
import { playUiMotionSound } from '../../utils/uiMotionSound';

const MOBILE_PAGE_ORDER: PageId[] = [
  'overview',
  'orgchart',
  'panduan',
  'gms2',
  'perintisan',
  'quickref',
  'uikit',
];

const DESKTOP_PAGE_ORDER: PageId[] = [
  'overview',
  'orgchart',
  'gms2',
  'panduan',
  'perintisan',
  'quickref',
  'uikit',
];

export function getOrderedDirection(
  prevKey: string,
  nextKey: string,
  order: readonly string[]
): 1 | -1 {
  const prevIdx = order.indexOf(prevKey);
  const nextIdx = order.indexOf(nextKey);
  if (prevIdx === -1 || nextIdx === -1 || prevIdx === nextIdx) return 1;
  return nextIdx > prevIdx ? 1 : -1;
}

export function getPageDirection(
  prevPage: PageId,
  activePage: PageId,
  isMobile: boolean
): 1 | -1 {
  const order = isMobile ? MOBILE_PAGE_ORDER : DESKTOP_PAGE_ORDER;
  return getOrderedDirection(prevPage, activePage, order);
}

interface PageTransitionProps {
  activePage?: PageId;
  prevPage?: PageId;
  transitionKey?: string;
  directionOverride?: 1 | -1;
  scrollResetOnChange?: boolean;
  className?: string;
  children: React.ReactNode;
}

interface TransitionCustom {
  direction: 1 | -1;
  isMobile: boolean;
}

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

const pageVariants = {
  enter: ({ direction, isMobile }: TransitionCustom) =>
    isMobile
      ? {
          opacity: 0,
          x: direction * 24,
          y: 0,
          scale: 0.95,
          filter: 'blur(4px)',
        }
      : {
          opacity: 0,
          x: 0,
          y: direction * 14,
          scale: 0.95,
          filter: 'blur(4px)',
        },
  center: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      x: { duration: 0.1, ease: EASE_OUT },
      y: { duration: 0.1, ease: EASE_OUT },
      scale: { duration: 0.1, ease: EASE_OUT },
      opacity: { duration: 0.1, ease: EASE_OUT },
      filter: { duration: 0.1, ease: EASE_OUT },
    },
  },
  exit: ({ direction, isMobile }: TransitionCustom) =>
    isMobile
      ? {
          opacity: 0,
          x: direction * -18,
          y: 0,
          scale: 0.95,
          filter: 'blur(2px)',
          pointerEvents: 'none' as const,
          transition: {
            x: { duration: 0.05, ease: EASE_OUT },
            scale: { duration: 0.05, ease: EASE_OUT },
            opacity: { duration: 0.05, ease: EASE_OUT },
            filter: { duration: 0.05, ease: EASE_OUT },
          },
        }
      : {
          opacity: 0,
          x: 0,
          y: direction * -10,
          scale: 0.95,
          filter: 'blur(2px)',
          pointerEvents: 'none' as const,
          transition: {
            y: { duration: 0.05, ease: EASE_OUT },
            scale: { duration: 0.05, ease: EASE_OUT },
            opacity: { duration: 0.05, ease: EASE_OUT },
            filter: { duration: 0.05, ease: EASE_OUT },
          },
        },
};

export const PageTransition: React.FC<PageTransitionProps> = ({
  activePage = 'orgchart',
  prevPage = 'orgchart',
  transitionKey,
  directionOverride,
  scrollResetOnChange = true,
  className = 'flex-1 min-h-0 flex flex-col w-full',
  children,
}) => {
  const isMobile = useIsMobile();
  const key = transitionKey ?? activePage;
  const direction = directionOverride ?? getPageDirection(prevPage, activePage, isMobile);
  const prevKeyRef = useRef(key);

  useEffect(() => {
    if (scrollResetOnChange && isMobile && typeof window !== 'undefined' && window.scrollY > 0) {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }
  }, [key, isMobile, scrollResetOnChange]);

  return (
    <AnimatePresence mode="popLayout" initial={false} custom={{ direction, isMobile }}>
      <motion.div
        key={key}
        custom={{ direction, isMobile }}
        variants={pageVariants}
        initial="enter"
        animate="center"
        exit="exit"
        onAnimationComplete={(definition) => {
          if (definition === 'center' && prevKeyRef.current !== key) {
            prevKeyRef.current = key;
            playUiMotionSound('land', true);
          }
        }}
        style={{ willChange: 'transform, opacity, filter' }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
