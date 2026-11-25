import {
  Gms2WiPrItem,
  MinistryRoleItem,
  OverviewTaglineConfig,
  PageAttachmentItem,
  RuleItem,
  SopModuleItem,
  SpaModulePageId,
} from '../types';

const STORAGE_PREFIX = 'mm_platform_';
const COLLECTION_PREFIX = 'col_';

function loadStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const raw = window.localStorage.getItem(`${STORAGE_PREFIX}${key}`);
    return raw ? (JSON.parse(raw) as T) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function saveStorage<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(`${STORAGE_PREFIX}${key}`, JSON.stringify(value));
  } catch {
    // Ignore storage quota / privacy mode restrictions
  }
}

export interface CachedUiNavState {
  category: string;
  sub: string;
}

export const apiService = {
  // UI Kit nav & update read-state cache
  getCachedUiNavState(): CachedUiNavState | null {
    return loadStorage<CachedUiNavState | null>('ui_nav_state', null);
  },
  saveCachedUiNavState(state: CachedUiNavState): void {
    saveStorage('ui_nav_state', state);
  },
  getCachedReadUpdateIds(): string[] {
    return loadStorage<string[]>('ui_updates_read', []);
  },
  saveCachedReadUpdateIds(ids: string[]): void {
    saveStorage('ui_updates_read', ids);
  },

  // Multimedia notifications read IDs
  getReadNotificationIds(): string[] {
    return loadStorage<string[]>('read_notif_ids', []);
  },
  saveReadNotificationIds(ids: string[]): void {
    saveStorage('read_notif_ids', ids);
  },

  // Generic persisted CRUD collections (seed on first visit, full CRUD persisted afterward)
  getCollection<T>(key: string, seed: T[]): T[] {
    return loadStorage<T[]>(`${COLLECTION_PREFIX}${key}`, seed);
  },
  saveCollection<T>(key: string, items: T[]): void {
    saveStorage(`${COLLECTION_PREFIX}${key}`, items);
  },

  getOverviewTagline(seed: OverviewTaglineConfig): OverviewTaglineConfig {
    return loadStorage<OverviewTaglineConfig>('overview_tagline', seed);
  },
  saveOverviewTagline(config: OverviewTaglineConfig): void {
    saveStorage('overview_tagline', config);
  },

  clearAllPlatformCollections(): void {
    if (typeof window === 'undefined') return;
    try {
      const toRemove: string[] = [];
      for (let i = 0; i < window.localStorage.length; i += 1) {
        const k = window.localStorage.key(i);
        if (
          k &&
          (k.startsWith(`${STORAGE_PREFIX}${COLLECTION_PREFIX}`) ||
            k === `${STORAGE_PREFIX}overview_tagline` ||
            k === `${STORAGE_PREFIX}custom_rules` ||
            k === `${STORAGE_PREFIX}custom_sop_v5` ||
            k === `${STORAGE_PREFIX}custom_gms2_wipr` ||
            k === `${STORAGE_PREFIX}custom_ministry_roles`)
        ) {
          toRemove.push(k);
        }
      }
      toRemove.forEach((k) => window.localStorage.removeItem(k));
    } catch {
      // Ignore storage errors
    }
  },

  // Legacy custom document helpers (kept for seamless migration)
  getCustomRules(): RuleItem[] {
    return loadStorage<RuleItem[]>('custom_rules', []);
  },
  saveCustomRules(items: RuleItem[]): void {
    saveStorage('custom_rules', items);
  },
  getCustomSopModules(): SopModuleItem[] {
    return loadStorage<SopModuleItem[]>('custom_sop_v5', []);
  },
  saveCustomSopModules(items: SopModuleItem[]): void {
    saveStorage('custom_sop_v5', items);
  },
  getCustomGms2WiPr(): Gms2WiPrItem[] {
    return loadStorage<Gms2WiPrItem[]>('custom_gms2_wipr', []);
  },
  saveCustomGms2WiPr(items: Gms2WiPrItem[]): void {
    saveStorage('custom_gms2_wipr', items);
  },
  getCustomMinistryRoles(): MinistryRoleItem[] {
    return loadStorage<MinistryRoleItem[]>('custom_ministry_roles', []);
  },
  saveCustomMinistryRoles(items: MinistryRoleItem[]): void {
    saveStorage('custom_ministry_roles', items);
  },

  // Persisted external links & non-ephemeral attachments per page
  getPageAttachments(
    seed: Record<SpaModulePageId, PageAttachmentItem[]>
  ): Record<SpaModulePageId, PageAttachmentItem[]> {
    const saved = loadStorage<Partial<Record<SpaModulePageId, PageAttachmentItem[]>> | null>(
      'page_attachments',
      null
    );
    if (!saved) return seed;
    const merged: Record<SpaModulePageId, PageAttachmentItem[]> = { ...seed };
    (Object.keys(seed) as SpaModulePageId[]).forEach((key) => {
      if (Array.isArray(saved[key])) {
        merged[key] = saved[key] as PageAttachmentItem[];
      }
    });
    return merged;
  },
  savePageAttachments(attachments: Record<SpaModulePageId, PageAttachmentItem[]>): void {
    // Strip transient blob: URLs before storing across reloads
    const sanitized: Record<SpaModulePageId, PageAttachmentItem[]> = {
      overview: [],
      orgchart: [],
      gms2: [],
      panduan: [],
      perintisan: [],
      quickref: [],
    };
    (Object.keys(attachments) as SpaModulePageId[]).forEach((pageKey) => {
      sanitized[pageKey] = (attachments[pageKey] || []).filter(
        (item) => !item.url.startsWith('blob:')
      );
    });
    saveStorage('page_attachments', sanitized);
  },
};
