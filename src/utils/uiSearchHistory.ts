export interface RecentSearchEntry {
  id: string;
  query: string;
  groupId?: string;
  groupLabel?: string;
  itemLabel?: string;
  sectionId?: string;
  sectionTitle?: string;
  timestamp: number;
}

export interface SuggestionSearchEntry {
  id: string;
  label: string;
  query: string;
  hint: string;
  groupId: string;
  itemLabel: string;
  sectionId?: string;
}

const RECENT_SEARCH_STORAGE_KEY = 'uikit_recent_searches_v1';
const MAX_RECENT_SEARCHES = 5;

export const UI_SUGGESTION_SEARCHES: SuggestionSearchEntry[] = [
  {
    id: 'sug-loading-animations',
    label: '20 Loading Animations',
    query: 'Loading Animations',
    hint: 'Feedback · loader/spinner-arc',
    groupId: 'feedback',
    itemLabel: 'Loading Animations',
    sectionId: 'ldr-stage',
  },
  {
    id: 'sug-skeleton',
    label: 'Skeleton',
    query: 'Skeleton',
    hint: 'Feedback · UiSkeleton',
    groupId: 'feedback',
    itemLabel: 'Skeleton',
    sectionId: 'skl-search',
  },
  {
    id: 'sug-page-search',
    label: 'Page Search',
    query: 'Page Search',
    hint: 'Data Entry · Recent & Suggestion',
    groupId: 'dataentry',
    itemLabel: 'Page Search',
    sectionId: 'ps-recent-suggestion',
  },
  {
    id: 'sug-motion',
    label: 'Motion & Animations',
    query: 'Motion',
    hint: 'Behavioral · Spring & Easing',
    groupId: 'behavioral',
    itemLabel: 'Motion & Animations',
    sectionId: 'mot-emil-rules',
  },
  {
    id: 'sug-buttons',
    label: 'Action Pill Buttons',
    query: 'Action Pill',
    hint: 'Data Entry · Primary Rose',
    groupId: 'dataentry',
    itemLabel: 'Buttons',
    sectionId: 'btn-action-pills',
  },
  {
    id: 'sug-kanban',
    label: 'Kanban Board',
    query: 'Kanban',
    hint: 'Data Display · Drag & Drop',
    groupId: 'datadisplay',
    itemLabel: 'Kanban Board',
    sectionId: 'knb-interactive',
  },
  {
    id: 'sug-quick-access',
    label: 'Quick Access',
    query: 'Quick Access',
    hint: 'Navigation · Shortcut & Pinned',
    groupId: 'navigation',
    itemLabel: 'Quick Access',
    sectionId: 'qa-tiles',
  },
  {
    id: 'sug-kpi-card',
    label: 'KPI Card',
    query: 'KPI Card',
    hint: 'Data Display · Metric & Sparkline',
    groupId: 'datadisplay',
    itemLabel: 'KPI Card',
    sectionId: 'kpi-standard',
  },
  {
    id: 'sug-card-article',
    label: 'Card Article',
    query: 'Card Article',
    hint: 'Data Display · Editorial Feed',
    groupId: 'datadisplay',
    itemLabel: 'Card Article',
    sectionId: 'art-vertical',
  },
  {
    id: 'sug-mobile-375',
    label: 'Mobile 375px Fixes',
    query: '375px',
    hint: 'Mobile UI Kit · Responsive',
    groupId: 'mobilekit',
    itemLabel: 'Mobile 375px Fixes',
    sectionId: 'm375-tables',
  },
];

export function loadRecentSearches(): RecentSearchEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(RECENT_SEARCH_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter(
        (item): item is RecentSearchEntry =>
          Boolean(item) &&
          typeof item.id === 'string' &&
          typeof item.query === 'string' &&
          item.query.trim().length > 0
      )
      .slice(0, MAX_RECENT_SEARCHES);
  } catch {
    return [];
  }
}

function persistRecentSearches(entries: RecentSearchEntry[]): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(RECENT_SEARCH_STORAGE_KEY, JSON.stringify(entries));
  } catch {
    // Ignore storage quota or private-mode errors
  }
}

export function saveRecentSearch(
  entry: Omit<RecentSearchEntry, 'id' | 'timestamp'>
): RecentSearchEntry[] {
  const trimmed = entry.query.trim();
  if (!trimmed) return loadRecentSearches();

  const current = loadRecentSearches();
  const normalized = trimmed.toLowerCase();
  const filtered = current.filter((item) => {
    if (entry.itemLabel && item.itemLabel) {
      return !(
        item.query.toLowerCase() === normalized &&
        item.groupId === entry.groupId &&
        item.itemLabel === entry.itemLabel &&
        item.sectionId === entry.sectionId
      );
    }
    return item.query.toLowerCase() !== normalized;
  });

  const nextEntry: RecentSearchEntry = {
    ...entry,
    query: trimmed,
    id: `rec-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    timestamp: Date.now(),
  };

  const next = [nextEntry, ...filtered].slice(0, MAX_RECENT_SEARCHES);
  persistRecentSearches(next);
  return next;
}

export function removeRecentSearch(id: string): RecentSearchEntry[] {
  const next = loadRecentSearches().filter((item) => item.id !== id);
  persistRecentSearches(next);
  return next;
}

export function clearRecentSearches(): RecentSearchEntry[] {
  persistRecentSearches([]);
  return [];
}
