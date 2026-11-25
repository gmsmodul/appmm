import { lazy } from 'react';

const loaders = {
  utilities: () => import('./UtilitiesUiKit').then((m) => ({ default: m.UtilitiesUiKit })),
  datadisplay: () => import('./DataDisplayUiKit').then((m) => ({ default: m.DataDisplayUiKit })),
  dataentry: () => import('./DataEntryUiKit').then((m) => ({ default: m.DataEntryUiKit })),
  feedback: () => import('./FeedbackUiKit').then((m) => ({ default: m.FeedbackUiKit })),
  tables: () => import('./TableUiKit').then((m) => ({ default: m.TableUiKit })),
  other: () => import('./OtherMultimediaUiKit').then((m) => ({ default: m.OtherMultimediaUiKit })),
  authstate: () => import('./AuthStateUiKit').then((m) => ({ default: m.AuthStateUiKit })),
  mobilekit: () => import('./MobileUiKit').then((m) => ({ default: m.MobileUiKit })),
};

export const LazyUtilitiesUiKit = lazy(loaders.utilities);
export const LazyDataDisplayUiKit = lazy(loaders.datadisplay);
export const LazyDataEntryUiKit = lazy(loaders.dataentry);
export const LazyFeedbackUiKit = lazy(loaders.feedback);
export const LazyTableUiKit = lazy(loaders.tables);
export const LazyOtherMultimediaUiKit = lazy(loaders.other);
export const LazyAuthStateUiKit = lazy(loaders.authstate);
export const LazyMobileUiKit = lazy(loaders.mobilekit);

const preloadedKeys = new Set<string>();

function resolveLoaderKey(categoryId: string): keyof typeof loaders {
  if (['charts', 'maps', 'navigation', 'behavioral', 'layout'].includes(categoryId)) {
    return 'other';
  }
  if (categoryId in loaders) {
    return categoryId as keyof typeof loaders;
  }
  return 'utilities';
}

export function preloadCategoryModule(categoryId: string): void {
  const key = resolveLoaderKey(categoryId);
  if (preloadedKeys.has(key)) return;
  preloadedKeys.add(key);
  void loaders[key]();
}

const ORDERED_CATEGORY_IDS = [
  'utilities',
  'datadisplay',
  'dataentry',
  'feedback',
  'tables',
  'charts',
  'maps',
  'navigation',
  'behavioral',
  'layout',
  'authstate',
  'mobilekit',
];

export function preloadAdjacentCategories(activeCategoryId: string): void {
  preloadCategoryModule(activeCategoryId);
  const idx = ORDERED_CATEGORY_IDS.indexOf(activeCategoryId);
  if (idx > 0) preloadCategoryModule(ORDERED_CATEGORY_IDS[idx - 1]);
  if (idx >= 0 && idx < ORDERED_CATEGORY_IDS.length - 1) {
    preloadCategoryModule(ORDERED_CATEGORY_IDS[idx + 1]);
  }
}

let idlePreloadScheduled = false;

export function scheduleIdleUiKitPreload(): void {
  if (typeof window === 'undefined' || idlePreloadScheduled) return;
  idlePreloadScheduled = true;

  const preloadAll = () => {
    (Object.keys(loaders) as (keyof typeof loaders)[]).forEach((key, idx) => {
      window.setTimeout(() => {
        if (!preloadedKeys.has(key)) {
          preloadedKeys.add(key);
          void loaders[key]();
        }
      }, idx * 140);
    });
  };

  const w = window as Window & {
    requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
  };
  if (typeof w.requestIdleCallback === 'function') {
    w.requestIdleCallback(preloadAll, { timeout: 1200 });
  } else {
    window.setTimeout(preloadAll, 450);
  }
}
