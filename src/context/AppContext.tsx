import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import {
  AddDocTarget,
  CamMatrixItem,
  ChurchCategoryItem,
  CrewChiefTimelineItem,
  CrudEntityType,
  CrudModalState,
  DeleteConfirmState,
  DetailContentBlock,
  FdHandSignalItem,
  Gms2JabatanItem,
  Gms2PengantarRow,
  Gms2PrinsipRow,
  Gms2ServolutionRow,
  Gms2WiPrItem,
  LeaderDivisionRow,
  LevelingGradeItem,
  MinistryRoleItem,
  MinistryValueRow,
  MultimediaDetailModalPayload,
  NotificationItem,
  OrgChartNodeItem,
  OverviewTaglineConfig,
  PageAttachmentItem,
  PageId,
  PastelThemeKey,
  PerintisanMateriRow,
  PerintisanMetodeRow,
  PerintisanMilestoneRow,
  PerintisanProfilRow,
  PerintisanTargetRow,
  PilarMappingItem,
  PillarItem,
  RegionalItem,
  RuleItem,
  SinodalDefItem,
  SopModuleItem,
  SpaModulePageId,
  ToastItem,
  TpsStepRow,
  WsModuleRow,
  WsWeekRow,
} from '../types';
import { apiService } from '../services/api';
import { playUiMotionSound } from '../utils/uiMotionSound';
import {
  flushOfflineQueue,
  getOfflineQueueCount,
  subscribeOfflineQueue,
} from '../utils/offlineSyncQueue';
import { UI_KIT_CATALOG } from '../components/uikit/uiKitCatalog';
import {
  BUKUSAKU_LEADER_DIVISIONS,
  BUKUSAKU_VALUES_5,
  CAM_MATRIX_DATA,
  CHURCH_CATEGORY_DATA,
  CREW_CHIEF_TIMELINE_DATA,
  FD_HAND_SIGNALS_DATA,
  GMS2_JABATAN_DATA,
  GMS2_PENGANTAR_ROWS,
  GMS2_PRINSIP_PENGADAAN_ROWS,
  GMS2_SERVOLUTION_ROWS,
  GMS2_SINODAL_DEFINITIONS,
  GMS2_TPS_STEPS,
  GMS2_WS1_PHOTO,
  GMS2_WS1_VIDEO,
  GMS2_WS2_MODULES,
  INITIAL_GMS2_FORMS_DATA,
  INITIAL_GMS2_WIPR_DATA,
  INITIAL_MINISTRY_ROLES_17,
  INITIAL_MULTIMEDIA_NOTIFICATIONS,
  INITIAL_PAGE_ATTACHMENTS,
  INITIAL_RULES_DATA,
  INITIAL_SOP_V5_DATA,
  LEVELING_FRAMEWORK_DATA,
  ORG_CHART_V1_NODES,
  ORG_CHART_V2_NODES,
  PAGE_LABELS_MAP,
  PERINTISAN_MATERI_ROWS,
  PERINTISAN_METODE_ROWS,
  PERINTISAN_MILESTONE_ROWS,
  PERINTISAN_PROFIL_ROWS,
  PERINTISAN_TARGET_REGIONAL_ROWS,
  PILAR_MAPPING_5,
  PILLARS_DATA,
  REGIONAL_8_DATA,
} from '../data/multimediaPlatformData';
import {
  blocksToEditableText,
  editableTextToBlocks,
  splitLines,
} from '../components/multimedia/crudSchemas';

export interface UiKitUpdateItem {
  id: string;
  title: string;
  desc: string;
  time: string;
  unread: boolean;
  theme: PastelThemeKey;
  groupId: string;
  itemLabel: string;
  sectionId?: string;
}

const INITIAL_UI_UPDATES: UiKitUpdateItem[] = [
  {
    id: 'UI-UPD-OPT',
    title: 'App Optimization (Optimistic UI, Skeletons, Preload & Offline Queue)',
    desc: 'Code-split lazy chunks + shimmer skeletons, cache-first navigation, tactile scale(0.97) press physics, and offline mutation replay queue.',
    time: 'Just now',
    unread: true,
    theme: 'periwinkle',
    groupId: 'behavioral',
    itemLabel: 'App Optimization',
    sectionId: 'opt-optimistic',
  },
  {
    id: 'UI-UPD-375',
    title: 'Mobile 375px Fixes (Tables→Cards, 16px, 44px, Safe-Area)',
    desc: 'Table-to-Card below 640px, single-line KPI .kpi-value clamp, 16px anti-zoom inputs, 44px touch targets, and safe-area bottom clearance.',
    time: 'Just now',
    unread: true,
    theme: 'mint',
    groupId: 'mobilekit',
    itemLabel: 'Mobile 375px Fixes',
    sectionId: 'm375-tables',
  },
  {
    id: 'UI-UPD-MUX',
    title: '6 Menu UX Rules (Type to Filter, Typed Dates, Reasons Not Grey)',
    desc: 'Auto-search >10 rows, typed dates + month/year jump, stay-open multi-select with Done CTA, collision-aware flip-up, and inline blockers.',
    time: 'Just now',
    unread: true,
    theme: 'periwinkle',
    groupId: 'dataentry',
    itemLabel: 'Menu UX Rules',
    sectionId: 'mux-type-filter',
  },
  {
    id: 'UI-UPD-KGT',
    title: 'Kanban Board, Gantt Chart & Timeline',
    desc: 'Interactive drag-and-drop Kanban columns, 14-day sprint Gantt chart, and chronological activity/milestone timelines.',
    time: 'Just now',
    unread: true,
    theme: 'coral',
    groupId: 'datadisplay',
    itemLabel: 'Kanban Board',
    sectionId: 'knb-interactive',
  },
  {
    id: 'UI-UPD-00',
    title: 'Motion & Animations Showcase',
    desc: 'Interactive preview for CSS easing curves, stagger cascades, drawers, springs & reduced-motion rules.',
    time: 'Just now',
    unread: true,
    theme: 'periwinkle',
    groupId: 'behavioral',
    itemLabel: 'Motion & Animations',
    sectionId: 'mot-easing',
  },
  {
    id: 'UI-UPD-01',
    title: 'Primary Rose (#ee2e65) Action Pills',
    desc: 'Standardized primary CTAs & responsive mobile 1-word pill controls unified in Data Entry.',
    time: '5m ago',
    unread: true,
    theme: 'coral',
    groupId: 'dataentry',
    itemLabel: 'Buttons',
    sectionId: 'btn-action-pills',
  },
];

const DEFAULT_OVERVIEW_TAGLINE: OverviewTaglineConfig = {
  badge: 'Tagline GMS Multimedia',
  quote: '“Capturing and Spreading God’s Presence”',
  desc: 'Terinspirasi dari Pelayanan Saputangan Paulus (Kisah Para Rasul 19:11–12) — setiap tangkapan visual, tayangan ibadah, dan media digital menjadi saluran hadirat dan mukjizat Tuhan yang menjangkau jemaat di mana pun berada.',
};

// Seed normalizers assigning stable IDs to every record
const SEED_REGIONALS: RegionalItem[] = REGIONAL_8_DATA.map((r, i) => ({
  ...r,
  id: `reg-${i + 1}`,
}));
const SEED_CHURCH_CATEGORIES: ChurchCategoryItem[] = CHURCH_CATEGORY_DATA.map((c) => ({
  ...c,
  id: `cat-${c.cat}`,
}));
const SEED_PILAR_MAPPING: PilarMappingItem[] = PILAR_MAPPING_5.map((m, i) => ({
  ...m,
  id: `pmap-${i + 1}`,
}));
const SEED_LEVELS: LevelingGradeItem[] = LEVELING_FRAMEWORK_DATA.map((l, i) => ({
  ...l,
  id: `lvl-${i + 1}`,
}));
const SEED_JABATAN: Gms2JabatanItem[] = GMS2_JABATAN_DATA.map((j) => ({
  ...j,
  id: `jab-${j.num}`,
}));
const SEED_WS1_VIDEO: WsWeekRow[] = GMS2_WS1_VIDEO.map(([week, title, desc], i) => ({
  id: `ws1v-${i + 1}`,
  week,
  title,
  desc,
}));
const SEED_WS1_PHOTO: WsWeekRow[] = GMS2_WS1_PHOTO.map(([week, title, desc], i) => ({
  id: `ws1p-${i + 1}`,
  week,
  title,
  desc,
}));
const SEED_WS2_MODULES: WsModuleRow[] = GMS2_WS2_MODULES.map(([title, desc], i) => ({
  id: `ws2m-${i + 1}`,
  title,
  desc,
}));
const SEED_SINODAL_DEFS: SinodalDefItem[] = GMS2_SINODAL_DEFINITIONS.map((d, i) => ({
  ...d,
  id: `sdef-${i + 1}`,
}));
const SEED_TPS_STEPS: TpsStepRow[] = GMS2_TPS_STEPS.map(([step, title, desc], i) => ({
  id: `tps-${i + 1}`,
  step,
  title,
  desc,
}));
const SEED_BS_VALUES: MinistryValueRow[] = BUKUSAKU_VALUES_5.map(([num, name, desc], i) => ({
  id: `bsv-${i + 1}`,
  num,
  name,
  desc,
}));
const SEED_CREW_CHIEF: CrewChiefTimelineItem[] = CREW_CHIEF_TIMELINE_DATA.map((c, i) => ({
  ...c,
  id: `cct-${i + 1}`,
}));
const SEED_MINISTRY_ROLES: MinistryRoleItem[] = INITIAL_MINISTRY_ROLES_17.map((r) => ({
  ...r,
  id: `mrole-${r.num}`,
}));
const SEED_LEADER_DIVISIONS: LeaderDivisionRow[] = BUKUSAKU_LEADER_DIVISIONS.map((d, i) => ({
  ...d,
  id: `ldiv-${i + 1}`,
}));
const SEED_PERINTISAN_PROFIL: PerintisanProfilRow[] = PERINTISAN_PROFIL_ROWS.map((p, i) => ({
  ...p,
  id: `pprof-${i + 1}`,
}));
const SEED_PERINTISAN_MATERI: PerintisanMateriRow[] = PERINTISAN_MATERI_ROWS.map(
  ([code, title, desc], i) => ({
    id: `pmat-${i + 1}`,
    code,
    title,
    desc,
  })
);
const SEED_PERINTISAN_METODE: PerintisanMetodeRow[] = PERINTISAN_METODE_ROWS.map(
  ([aspect, m1, m2], i) => ({
    id: `pmet-${i + 1}`,
    aspect,
    m1,
    m2,
  })
);
const SEED_PERINTISAN_TARGET: PerintisanTargetRow[] = PERINTISAN_TARGET_REGIONAL_ROWS.map(
  (t, i) => ({
    ...t,
    id: `ptgt-${i + 1}`,
  })
);
const SEED_PERINTISAN_MILESTONE: PerintisanMilestoneRow[] = PERINTISAN_MILESTONE_ROWS.map(
  (m, i) => ({
    ...m,
    id: `pmil-${i + 1}`,
  })
);
const SEED_CAM_MATRIX: CamMatrixItem[] = CAM_MATRIX_DATA.map((c, i) => ({
  ...c,
  id: `cam-${i + 1}`,
}));
const SEED_FD_SIGNALS: FdHandSignalItem[] = FD_HAND_SIGNALS_DATA.map((s, i) => ({
  ...s,
  id: `fd-${i + 1}`,
}));

const makeUid = (prefix: string) =>
  `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

export type OrgSubtabId = 'bagan' | 'sinodal' | 'pilar';
export type Gms2SubtabId = 'pengantar' | 'pelayanan' | 'kantor' | 'pengadaan' | 'wipr';
export type PanduanSubtabId = 'value' | 'rules' | 'sop' | 'peran';

export interface AddDocumentSubmitPayload {
  target: AddDocTarget;
  title: string;
  categoryOrCode: string;
  summary: string;
  bodyLines: string;
}

interface AppContextType {
  // Navigation & Layout
  activePage: PageId;
  prevPage: PageId;
  setActivePage: (page: PageId) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;

  // Sub-tab states for direct deep-linking
  orgSubtab: OrgSubtabId;
  setOrgSubtab: (tab: OrgSubtabId) => void;
  gms2Subtab: Gms2SubtabId;
  setGms2Subtab: (tab: Gms2SubtabId) => void;
  panduanSubtab: PanduanSubtabId;
  setPanduanSubtab: (tab: PanduanSubtabId) => void;

  // Toasts
  toasts: ToastItem[];
  triggerToast: (
    title: string,
    message: string,
    type?: 'success' | 'info' | 'warning' | 'error'
  ) => void;

  // Full CRUD Datasets across every section
  overviewTagline: OverviewTaglineConfig;
  pillarsList: PillarItem[];
  orgV2Nodes: OrgChartNodeItem[];
  orgV1Nodes: OrgChartNodeItem[];
  regionalsList: RegionalItem[];
  churchCategoriesList: ChurchCategoryItem[];
  pilarMappingList: PilarMappingItem[];
  levelingList: LevelingGradeItem[];
  rulesList: RuleItem[];
  sopV5List: SopModuleItem[];
  jabatanList: Gms2JabatanItem[];
  gms2PengantarList: Gms2PengantarRow[];
  gms2ServolutionList: Gms2ServolutionRow[];
  gms2PrinsipList: Gms2PrinsipRow[];
  gms2FormsList: Gms2WiPrItem[];
  ws1VideoList: WsWeekRow[];
  ws1PhotoList: WsWeekRow[];
  ws2ModulesList: WsModuleRow[];
  sinodalDefsList: SinodalDefItem[];
  tpsStepsList: TpsStepRow[];
  gms2WiPrList: Gms2WiPrItem[];
  bukuSakuValuesList: MinistryValueRow[];
  crewChiefTimelineList: CrewChiefTimelineItem[];
  ministryRolesList: MinistryRoleItem[];
  leaderDivisionsList: LeaderDivisionRow[];
  perintisanProfilList: PerintisanProfilRow[];
  perintisanMateriList: PerintisanMateriRow[];
  perintisanMetodeList: PerintisanMetodeRow[];
  perintisanTargetList: PerintisanTargetRow[];
  perintisanMilestoneList: PerintisanMilestoneRow[];
  camMatrixList: CamMatrixItem[];
  fdSignalsList: FdHandSignalItem[];
  pageAttachments: Record<SpaModulePageId, PageAttachmentItem[]>;

  // Generic CRUD Modal & Confirmation
  crudModal: CrudModalState | null;
  openCrudCreate: (entity: CrudEntityType, defaults?: Record<string, string>) => void;
  openCrudEdit: (entity: CrudEntityType, itemId: string) => void;
  closeCrudModal: () => void;
  saveCrudItem: (
    entity: CrudEntityType,
    values: Record<string, string>,
    itemId?: string
  ) => void;
  deleteConfirm: DeleteConfirmState | null;
  requestDeleteItem: (entity: CrudEntityType, itemId: string, label: string) => void;
  confirmDeleteItem: () => void;
  cancelDeleteItem: () => void;
  resetAllPlatformData: () => void;

  // Detail Modal & Openers
  detailModal: MultimediaDetailModalPayload | null;
  setDetailModal: (payload: MultimediaDetailModalPayload | null) => void;
  openPillarModal: (pillarId: string) => void;
  openRuleModal: (ruleId: string) => void;
  openSopModal: (sopId: string) => void;
  openOrgNodeModal: (nodeId: string, versionTag?: string) => void;
  openJabatanModal: (numOrId: string) => void;
  openLevelModal: (gradeOrId: string) => void;
  openWiPrModal: (id: string) => void;
  openGms2FormModal: (id: string) => void;
  openMinistryRoleModal: (numOrId: string) => void;

  // Add Document Modal
  isAddDocOpen: boolean;
  addDocDefaultTarget: AddDocTarget;
  openAddDocModal: (target?: AddDocTarget) => void;
  closeAddDocModal: () => void;
  handleAddDocSubmit: (payload: AddDocumentSubmitPayload) => void;

  // Attach Document Modal
  isAttachDocOpen: boolean;
  attachDefaultPage: SpaModulePageId;
  openAttachModal: (page?: SpaModulePageId) => void;
  closeAttachModal: () => void;
  attachPageDocument: (page: SpaModulePageId, item: Omit<PageAttachmentItem, 'id'>) => void;
  removePageAttachment: (page: SpaModulePageId, id: string) => void;

  // Settings & Info Modal
  isSettingsInfoOpen: boolean;
  setIsSettingsInfoOpen: (open: boolean) => void;

  // Notifications & Global Search
  notifications: NotificationItem[];
  handleMarkAllRead: () => void;
  handleNotificationClick: (notif: NotificationItem) => void;
  unreadNotifCount: number;
  browserNotifEnabled: boolean;
  toggleBrowserNotifications: () => Promise<void>;
  isGlobalSearchOpen: boolean;
  setIsGlobalSearchOpen: React.Dispatch<React.SetStateAction<boolean>>;

  // UI Kit & Interactive Preview States
  isBottomSheetDemoOpen: boolean;
  setIsBottomSheetDemoOpen: (open: boolean) => void;
  activeDemoModal: string | null;
  setActiveDemoModal: (type: string | null) => void;
  activeDrawerSpec: { dir: 'left' | 'right' | 'top' | 'bottom'; type: string } | null;
  setActiveDrawerSpec: (
    spec: { dir: 'left' | 'right' | 'top' | 'bottom'; type: string } | null
  ) => void;
  uiSweetAlertType: 'success' | 'confirm' | null;
  setUiSweetAlertType: (type: 'success' | 'confirm' | null) => void;
  uiSessionModal: boolean;
  setUiSessionModal: (open: boolean) => void;
  uiCategory: string;
  prevUiCategory: string;
  uiSubJump: string;
  prevUiSubJump: string;
  uiTargetSectionId: string | null;
  selectUiNode: (groupId: string, subLabel?: string, sectionId?: string) => void;
  clearUiTargetSection: () => void;
  uiSearchFocusSeq: number;
  triggerUiSearchFocus: () => void;
  isUiMobileSearchOpen: boolean;
  setIsUiMobileSearchOpen: (open: boolean) => void;
  uiUpdates: UiKitUpdateItem[];
  unreadUiUpdatesCount: number;
  markAllUiUpdatesRead: () => void;
  handleUiUpdateClick: (item: UiKitUpdateItem) => void;

  // Connectivity & Theme
  isOnline: boolean;
  pendingSyncCount: number;
  syncPendingNow: () => Promise<void>;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [pageState, setPageState] = useState<{ active: PageId; prev: PageId }>(() => {
    if (typeof window !== 'undefined') {
      const p = new URLSearchParams(window.location.search).get('page');
      if (p === 'rules' || p === 'sop' || p === 'bukusaku') {
        return { active: 'panduan', prev: 'panduan' };
      }
      const valid: PageId[] = [
        'overview',
        'orgchart',
        'gms2',
        'panduan',
        'perintisan',
        'quickref',
      ];
      if (p && valid.includes(p as PageId)) {
        return { active: p as PageId, prev: p as PageId };
      }
    }
    return { active: 'orgchart', prev: 'orgchart' };
  });

  const activePage = pageState.active;
  const prevPage = pageState.prev;

  const setActivePage = useCallback((nextPage: PageId) => {
    setPageState((curr) => {
      if (curr.active === nextPage) return curr;
      playUiMotionSound('tick');
      return { active: nextPage, prev: curr.active };
    });
  }, []);

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isGlobalSearchOpen, setIsGlobalSearchOpen] = useState(false);

  const [orgSubtab, setOrgSubtab] = useState<OrgSubtabId>('bagan');
  const [gms2Subtab, setGms2Subtab] = useState<Gms2SubtabId>('pengantar');
  const [panduanSubtab, setPanduanSubtab] = useState<PanduanSubtabId>(() => {
    if (typeof window !== 'undefined') {
      const p = new URLSearchParams(window.location.search).get('page');
      if (p === 'rules') return 'rules';
      if (p === 'sop') return 'sop';
      if (p === 'bukusaku') return 'value';
    }
    return 'value';
  });

  // Toasts
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const triggerToast = useCallback(
    (
      title: string,
      message: string,
      type: 'success' | 'info' | 'warning' | 'error' = 'success'
    ) => {
      const id = Date.now() + Math.random();
      playUiMotionSound(type === 'success' ? 'success' : type === 'error' ? 'land' : 'pop');
      setToasts((prev) => [...prev, { id, title, message, type }]);
      window.setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 3500);
    },
    []
  );

  // Full Persisted Collections across every section
  const [overviewTagline, setOverviewTagline] = useState<OverviewTaglineConfig>(() =>
    apiService.getOverviewTagline(DEFAULT_OVERVIEW_TAGLINE)
  );
  const [pillarsList, setPillarsList] = useState<PillarItem[]>(() =>
    apiService.getCollection('pillars', PILLARS_DATA)
  );
  const [orgV2Nodes, setOrgV2Nodes] = useState<OrgChartNodeItem[]>(() =>
    apiService.getCollection('org_v2', ORG_CHART_V2_NODES)
  );
  const [orgV1Nodes, setOrgV1Nodes] = useState<OrgChartNodeItem[]>(() =>
    apiService.getCollection('org_v1', ORG_CHART_V1_NODES)
  );
  const [regionalsList, setRegionalsList] = useState<RegionalItem[]>(() =>
    apiService.getCollection('regionals', SEED_REGIONALS)
  );
  const [churchCategoriesList, setChurchCategoriesList] = useState<ChurchCategoryItem[]>(() =>
    apiService.getCollection('church_cats', SEED_CHURCH_CATEGORIES)
  );
  const [pilarMappingList, setPilarMappingList] = useState<PilarMappingItem[]>(() =>
    apiService.getCollection('pilar_mapping', SEED_PILAR_MAPPING)
  );
  const [levelingList, setLevelingList] = useState<LevelingGradeItem[]>(() =>
    apiService.getCollection('levels', SEED_LEVELS)
  );
  const [rulesList, setRulesList] = useState<RuleItem[]>(() =>
    apiService.getCollection('rules_v2', [
      ...apiService.getCustomRules(),
      ...INITIAL_RULES_DATA,
    ])
  );
  const [sopV5List, setSopV5List] = useState<SopModuleItem[]>(() =>
    apiService.getCollection('sop_v5_v2', [
      ...apiService.getCustomSopModules(),
      ...INITIAL_SOP_V5_DATA,
    ])
  );
  const [jabatanList, setJabatanList] = useState<Gms2JabatanItem[]>(() =>
    apiService.getCollection('jabatan', SEED_JABATAN)
  );
  const [gms2PengantarList, setGms2PengantarList] = useState<Gms2PengantarRow[]>(() =>
    apiService.getCollection('gms2_pengantar', GMS2_PENGANTAR_ROWS)
  );
  const [gms2ServolutionList, setGms2ServolutionList] = useState<Gms2ServolutionRow[]>(() =>
    apiService.getCollection('gms2_servolution', GMS2_SERVOLUTION_ROWS)
  );
  const [gms2PrinsipList, setGms2PrinsipList] = useState<Gms2PrinsipRow[]>(() =>
    apiService.getCollection('gms2_prinsip', GMS2_PRINSIP_PENGADAAN_ROWS)
  );
  const [gms2FormsList, setGms2FormsList] = useState<Gms2WiPrItem[]>(() =>
    apiService.getCollection('gms2_forms', INITIAL_GMS2_FORMS_DATA)
  );
  const [ws1VideoList, setWs1VideoList] = useState<WsWeekRow[]>(() =>
    apiService.getCollection('ws1_video', SEED_WS1_VIDEO)
  );
  const [ws1PhotoList, setWs1PhotoList] = useState<WsWeekRow[]>(() =>
    apiService.getCollection('ws1_photo', SEED_WS1_PHOTO)
  );
  const [ws2ModulesList, setWs2ModulesList] = useState<WsModuleRow[]>(() =>
    apiService.getCollection('ws2_modules', SEED_WS2_MODULES)
  );
  const [sinodalDefsList, setSinodalDefsList] = useState<SinodalDefItem[]>(() =>
    apiService.getCollection('sinodal_defs', SEED_SINODAL_DEFS)
  );
  const [tpsStepsList, setTpsStepsList] = useState<TpsStepRow[]>(() =>
    apiService.getCollection('tps_steps', SEED_TPS_STEPS)
  );
  const [gms2WiPrList, setGms2WiPrList] = useState<Gms2WiPrItem[]>(() =>
    apiService.getCollection('gms2_wipr', [
      ...apiService.getCustomGms2WiPr(),
      ...INITIAL_GMS2_WIPR_DATA,
    ])
  );
  const [bukuSakuValuesList, setBukuSakuValuesList] = useState<MinistryValueRow[]>(() =>
    apiService.getCollection('bs_values', SEED_BS_VALUES)
  );
  const [crewChiefTimelineList, setCrewChiefTimelineList] = useState<CrewChiefTimelineItem[]>(() =>
    apiService.getCollection('crew_chief_v2', SEED_CREW_CHIEF)
  );
  const [ministryRolesList, setMinistryRolesList] = useState<MinistryRoleItem[]>(() =>
    apiService.getCollection('ministry_roles', [
      ...apiService.getCustomMinistryRoles().map((r, i) => ({
        ...r,
        id: r.id || `mrole-c-${i + 1}`,
      })),
      ...SEED_MINISTRY_ROLES,
    ])
  );
  const [leaderDivisionsList, setLeaderDivisionsList] = useState<LeaderDivisionRow[]>(() =>
    apiService.getCollection('leader_divs', SEED_LEADER_DIVISIONS)
  );
  const [perintisanProfilList, setPerintisanProfilList] = useState<PerintisanProfilRow[]>(() =>
    apiService.getCollection('perintisan_profil', SEED_PERINTISAN_PROFIL)
  );
  const [perintisanMateriList, setPerintisanMateriList] = useState<PerintisanMateriRow[]>(() =>
    apiService.getCollection('perintisan_materi', SEED_PERINTISAN_MATERI)
  );
  const [perintisanMetodeList, setPerintisanMetodeList] = useState<PerintisanMetodeRow[]>(() =>
    apiService.getCollection('perintisan_metode', SEED_PERINTISAN_METODE)
  );
  const [perintisanTargetList, setPerintisanTargetList] = useState<PerintisanTargetRow[]>(() =>
    apiService.getCollection('perintisan_target', SEED_PERINTISAN_TARGET)
  );
  const [perintisanMilestoneList, setPerintisanMilestoneList] = useState<
    PerintisanMilestoneRow[]
  >(() => apiService.getCollection('perintisan_milestone', SEED_PERINTISAN_MILESTONE));
  const [camMatrixList, setCamMatrixList] = useState<CamMatrixItem[]>(() =>
    apiService.getCollection('cam_matrix', SEED_CAM_MATRIX)
  );
  const [fdSignalsList, setFdSignalsList] = useState<FdHandSignalItem[]>(() =>
    apiService.getCollection('fd_signals', SEED_FD_SIGNALS)
  );

  const [pageAttachments, setPageAttachments] = useState<
    Record<SpaModulePageId, PageAttachmentItem[]>
  >(() => apiService.getPageAttachments(INITIAL_PAGE_ATTACHMENTS));

  // Modals
  const [detailModal, setDetailModal] = useState<MultimediaDetailModalPayload | null>(null);
  const [crudModal, setCrudModal] = useState<CrudModalState | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<DeleteConfirmState | null>(null);
  const [isAddDocOpen, setIsAddDocOpen] = useState(false);
  const [addDocDefaultTarget, setAddDocDefaultTarget] = useState<AddDocTarget>('rules');
  const [isAttachDocOpen, setIsAttachDocOpen] = useState(false);
  const [attachDefaultPage, setAttachDefaultPage] = useState<SpaModulePageId>('orgchart');
  const [isSettingsInfoOpen, setIsSettingsInfoOpen] = useState(false);

  const closeCrudModal = useCallback(() => setCrudModal(null), []);
  const cancelDeleteItem = useCallback(() => setDeleteConfirm(null), []);

  const openCrudCreate = useCallback(
    (entity: CrudEntityType, defaults: Record<string, string> = {}) => {
      const baseDefaults: Record<string, Record<string, string>> = {
        pillar: { tone: 'brand', iconKey: 'shield' },
        orgNodeV2: { tone: 'brand', section: 'Bagian Baru: Struktur V2' },
        orgNodeV1: { tone: 'blue', section: 'Bagian Baru: Struktur V1' },
        level: { tone: 'brand' },
        rule: {
          tone: 'teal',
          iconKey: 'file',
          category: 'Kedisiplinan & Penampilan',
          type: 'ATURAN',
        },
        sop: {
          num: String(sopV5List.length + 1).padStart(2, '0'),
          section: 'VII',
          sectionTitle: 'Bagian VII: Modul Tambahan Tim',
          type: 'JOBDESK & SOP',
          tone: 'brand',
          iconKey: 'fileCheck',
        },
        jabatan: {
          num: String(jabatanList.length + 1).padStart(2, '0'),
          nature: 'Full Time',
        },
        gms2Pengantar: { tone: 'indigo', pages: 'Hal. 2–5' },
        gms2Servolution: { tone: 'brand', pages: 'Hal. 30–37' },
        gms2Prinsip: {
          code: `P-${String(gms2PrinsipList.length + 1).padStart(2, '0')}`,
          group: '6 Prinsip Pengadaan (Hal. 58)',
          tone: 'brand',
        },
        gms2Form: {
          code: `FM-GMS-SIN-M2M-${String(gms2FormsList.length + 1).padStart(2, '0')}`,
          type: 'FORM',
          tone: 'emerald',
          iconKey: 'clipboardCheck',
        },
        sinodalDef: { tone: 'neutral' },
        tpsStep: { step: String(tpsStepsList.length + 1).padStart(2, '0') },
        wipr: { type: 'WI', tone: 'brand', iconKey: 'clipboardCheck' },
        bsValue: { num: String(bukuSakuValuesList.length + 1).padStart(2, '0') },
        ministryRole: { num: String(ministryRolesList.length + 1).padStart(2, '0'), group: 'Umum' },
        leaderDiv: { tone: 'purple' },
        perintisanProfil: { tone: 'brand' },
        perintisanTarget: { tone: 'brand' },
        perintisanMilestone: { tone: 'brand' },
        camMatrix: { tone: 'brand' },
        regional: { no: String(regionalsList.length + 1).padStart(2, '0') },
      };

      setCrudModal({
        mode: 'create',
        entity,
        initialValues: {
          ...(baseDefaults[entity] || {}),
          ...defaults,
        },
      });
    },
    [
      bukuSakuValuesList.length,
      gms2FormsList.length,
      gms2PrinsipList.length,
      jabatanList.length,
      ministryRolesList.length,
      regionalsList.length,
      sopV5List.length,
      tpsStepsList.length,
    ]
  );

  const openCrudEdit = useCallback(
    (entity: CrudEntityType, itemId: string) => {
      let initialValues: Record<string, string> | null = null;

      switch (entity) {
        case 'overviewTagline':
          initialValues = {
            badge: overviewTagline.badge,
            quote: overviewTagline.quote,
            desc: overviewTagline.desc,
          };
          break;
        case 'pillar': {
          const item = pillarsList.find((x) => x.id === itemId);
          if (item) {
            initialValues = {
              name: item.name,
              group: item.group,
              role: item.role,
              tone: item.tone,
              iconKey: item.iconKey,
              responsibility: item.responsibility,
              jobdesk: item.jobdesk.join('\n'),
              baseSop: item.baseSop,
            };
          }
          break;
        }
        case 'orgNodeV2': {
          const item = orgV2Nodes.find((x) => x.id === itemId);
          if (item) {
            initialValues = {
              title: item.title,
              section: item.section,
              unit: item.unit,
              badge: item.badge,
              tone: item.tone,
              summary: item.summary,
              duties: item.duties.join('\n'),
              baseSop: item.baseSop || '',
            };
          }
          break;
        }
        case 'orgNodeV1': {
          const item = orgV1Nodes.find((x) => x.id === itemId);
          if (item) {
            initialValues = {
              title: item.title,
              section: item.section,
              unit: item.unit,
              badge: item.badge,
              tone: item.tone,
              summary: item.summary,
              duties: item.duties.join('\n'),
              baseSop: item.baseSop || '',
            };
          }
          break;
        }
        case 'regional': {
          const item = regionalsList.find((x) => (x.id || x.no) === itemId);
          if (item) {
            initialValues = {
              no: item.no,
              name: item.name,
              center: item.center,
              desc: item.desc,
            };
          }
          break;
        }
        case 'churchCat': {
          const item = churchCategoriesList.find((x) => (x.id || x.cat) === itemId);
          if (item) {
            initialValues = {
              cat: item.cat,
              label: item.label,
              statusGereja: item.statusGereja,
              capacity: item.capacity,
              building: item.building,
              otherRoomEquip: item.otherRoomEquip,
              staffMM: item.staffMM,
              relawan: item.relawan,
              equip: item.equip,
            };
          }
          break;
        }
        case 'pilarMap': {
          const item = pilarMappingList.find((x) => x.id === itemId);
          if (item) {
            initialValues = {
              pilar: item.pilar,
              unit: item.unit,
              focus: item.focus,
            };
          }
          break;
        }
        case 'level': {
          const item = levelingList.find((x) => (x.id || x.grade) === itemId);
          if (item) {
            initialValues = {
              grade: item.grade,
              role: item.role,
              msj: item.msj,
              modul: item.modul,
              scope: item.scope,
              duration: item.duration,
              attendance: item.attendance,
              tone: item.tone,
              filosofis: item.filosofis,
              objektif: item.objektif,
              spesifikasi: item.spesifikasi.join('\n'),
            };
          }
          break;
        }
        case 'rule': {
          const item = rulesList.find((x) => x.id === itemId);
          if (item) {
            initialValues = {
              title: item.title,
              category: item.category,
              type: item.type,
              tone: item.tone,
              iconKey: item.iconKey,
              summary: item.summary,
              bodyLines: blocksToEditableText(item.blocks),
            };
          }
          break;
        }
        case 'sop': {
          const item = sopV5List.find((x) => x.id === itemId);
          if (item) {
            initialValues = {
              num: item.num,
              section: item.section,
              sectionTitle: item.sectionTitle,
              title: item.title,
              type: item.type,
              tone: item.tone,
              iconKey: item.iconKey,
              summary: item.summary,
              bodyLines: blocksToEditableText(item.blocks),
            };
          }
          break;
        }
        case 'jabatan': {
          const item = jabatanList.find((x) => (x.id || x.num) === itemId);
          if (item) {
            initialValues = {
              num: item.num,
              pages: item.pages,
              title: item.title,
              nature: item.nature,
              desc: item.desc,
              deskripsiUmum: item.deskripsiUmum.join('\n'),
              deskripsiDetail: item.deskripsiDetail.join('\n'),
              tujuanProduk: item.tujuanProduk.join('\n'),
              kualifikasi: item.kualifikasi,
            };
          }
          break;
        }
        case 'gms2Pengantar': {
          const item = gms2PengantarList.find((x) => x.id === itemId);
          if (item) {
            initialValues = {
              section: item.section,
              pages: item.pages,
              tone: item.tone,
              desc: item.desc,
            };
          }
          break;
        }
        case 'gms2Servolution': {
          const item = gms2ServolutionList.find((x) => x.id === itemId);
          if (item) {
            initialValues = {
              component: item.component,
              pages: item.pages,
              tone: item.tone,
              desc: item.desc,
            };
          }
          break;
        }
        case 'gms2Prinsip': {
          const item = gms2PrinsipList.find((x) => x.id === itemId);
          if (item) {
            initialValues = {
              code: item.code,
              group: item.group,
              title: item.title,
              tone: item.tone,
              desc: item.desc,
            };
          }
          break;
        }
        case 'gms2Form': {
          const item = gms2FormsList.find((x) => x.id === itemId);
          if (item) {
            initialValues = {
              code: item.code,
              type: item.type,
              title: item.title,
              tone: item.tone,
              iconKey: item.iconKey,
              summary: item.summary,
              bodyLines: blocksToEditableText(item.blocks),
            };
          }
          break;
        }
        case 'ws1Video': {
          const item = ws1VideoList.find((x) => x.id === itemId);
          if (item) {
            initialValues = { week: item.week, title: item.title, desc: item.desc };
          }
          break;
        }
        case 'ws1Photo': {
          const item = ws1PhotoList.find((x) => x.id === itemId);
          if (item) {
            initialValues = { week: item.week, title: item.title, desc: item.desc };
          }
          break;
        }
        case 'ws2Module': {
          const item = ws2ModulesList.find((x) => x.id === itemId);
          if (item) {
            initialValues = { title: item.title, desc: item.desc };
          }
          break;
        }
        case 'sinodalDef': {
          const item = sinodalDefsList.find((x) => x.id === itemId);
          if (item) {
            initialValues = { title: item.title, tone: item.tone, desc: item.desc };
          }
          break;
        }
        case 'tpsStep': {
          const item = tpsStepsList.find((x) => x.id === itemId);
          if (item) {
            initialValues = { step: item.step, title: item.title, desc: item.desc };
          }
          break;
        }
        case 'wipr': {
          const item = gms2WiPrList.find((x) => x.id === itemId);
          if (item) {
            initialValues = {
              code: item.code,
              type: item.type,
              title: item.title,
              tone: item.tone,
              iconKey: item.iconKey,
              summary: item.summary,
              bodyLines: blocksToEditableText(item.blocks),
            };
          }
          break;
        }
        case 'bsValue': {
          const item = bukuSakuValuesList.find((x) => x.id === itemId);
          if (item) {
            initialValues = { num: item.num, name: item.name, desc: item.desc };
          }
          break;
        }
        case 'crewChief': {
          const item = crewChiefTimelineList.find((x) => (x.id || x.time) === itemId);
          if (item) {
            initialValues = { time: item.time, phase: item.phase, desc: item.desc };
          }
          break;
        }
        case 'ministryRole': {
          const item = ministryRolesList.find((x) => (x.id || x.num) === itemId);
          if (item) {
            initialValues = {
              num: item.num,
              group: item.group,
              name: item.name,
              req: item.req,
              duties: item.duties,
            };
          }
          break;
        }
        case 'leaderDiv': {
          const item = leaderDivisionsList.find((x) => x.id === itemId);
          if (item) {
            initialValues = {
              name: item.name,
              scope: item.scope,
              tone: item.tone,
              desc: item.desc,
            };
          }
          break;
        }
        case 'perintisanProfil': {
          const item = perintisanProfilList.find((x) => x.id === itemId);
          if (item) {
            initialValues = { label: item.label, tone: item.tone, desc: item.desc };
          }
          break;
        }
        case 'perintisanMateri': {
          const item = perintisanMateriList.find((x) => x.id === itemId);
          if (item) {
            initialValues = { code: item.code, title: item.title, desc: item.desc };
          }
          break;
        }
        case 'perintisanMetode': {
          const item = perintisanMetodeList.find((x) => x.id === itemId);
          if (item) {
            initialValues = { aspect: item.aspect, m1: item.m1, m2: item.m2 };
          }
          break;
        }
        case 'perintisanTarget': {
          const item = perintisanTargetList.find((x) => x.id === itemId);
          if (item) {
            initialValues = {
              act: item.act,
              freq: item.freq,
              tone: item.tone,
              desc: item.desc,
            };
          }
          break;
        }
        case 'perintisanMilestone': {
          const item = perintisanMilestoneList.find((x) => x.id === itemId);
          if (item) {
            initialValues = {
              aspect: item.aspect,
              tone: item.tone,
              m1: item.m1,
              m2: item.m2,
            };
          }
          break;
        }
        case 'camMatrix': {
          const item = camMatrixList.find((x) => (x.id || x.cam) === itemId);
          if (item) {
            initialValues = {
              cam: item.cam,
              rig: item.rig,
              lens: item.lens,
              tone: item.tone,
              notes: item.notes,
            };
          }
          break;
        }
        case 'fdSignal': {
          const item = fdSignalsList.find((x) => (x.id || x.code) === itemId);
          if (item) {
            initialValues = {
              code: item.code,
              gesture: item.gesture,
              meaning: item.meaning,
            };
          }
          break;
        }
      }

      if (initialValues) {
        setCrudModal({ mode: 'edit', entity, itemId, initialValues });
      }
    },
    [
      bukuSakuValuesList,
      camMatrixList,
      churchCategoriesList,
      crewChiefTimelineList,
      fdSignalsList,
      gms2FormsList,
      gms2PengantarList,
      gms2PrinsipList,
      gms2ServolutionList,
      gms2WiPrList,
      jabatanList,
      leaderDivisionsList,
      levelingList,
      ministryRolesList,
      orgV1Nodes,
      orgV2Nodes,
      overviewTagline,
      perintisanMateriList,
      perintisanMetodeList,
      perintisanMilestoneList,
      perintisanProfilList,
      perintisanTargetList,
      pilarMappingList,
      pillarsList,
      regionalsList,
      rulesList,
      sinodalDefsList,
      sopV5List,
      tpsStepsList,
      ws1PhotoList,
      ws1VideoList,
      ws2ModulesList,
    ]
  );

  const saveCrudItem = useCallback(
    (entity: CrudEntityType, v: Record<string, string>, itemId?: string) => {
      const isEdit = Boolean(itemId);
      const t = (key: string, fallback = '') => (v[key] ?? fallback).trim();

      switch (entity) {
        case 'overviewTagline': {
          const next: OverviewTaglineConfig = {
            badge: t('badge', DEFAULT_OVERVIEW_TAGLINE.badge),
            quote: t('quote', DEFAULT_OVERVIEW_TAGLINE.quote),
            desc: t('desc', DEFAULT_OVERVIEW_TAGLINE.desc),
          };
          setOverviewTagline(next);
          apiService.saveOverviewTagline(next);
          break;
        }
        case 'pillar': {
          const built: PillarItem = {
            id: itemId || makeUid('pillar'),
            name: t('name', 'Bidang Baru'),
            group: t('group', 'Operasional & Infrastruktur Teknis'),
            role: t('role', 'Peran Utama'),
            tone: (v.tone as PillarItem['tone']) || 'brand',
            iconKey: (v.iconKey as PillarItem['iconKey']) || 'shield',
            responsibility: t('responsibility'),
            jobdesk: splitLines(v.jobdesk || ''),
            baseSop: t('baseSop'),
          };
          setPillarsList((prev) => {
            const next = isEdit
              ? prev.map((x) => (x.id === itemId ? built : x))
              : [...prev, built];
            apiService.saveCollection('pillars', next);
            return next;
          });
          setDetailModal((curr) =>
            curr?.kind === 'pillar' && curr.pillar.id === built.id
              ? { kind: 'pillar', pillar: built }
              : curr
          );
          break;
        }
        case 'orgNodeV2': {
          const built: OrgChartNodeItem = {
            id: itemId || makeUid('v2-node'),
            title: t('title', 'Unit Baru'),
            section: t('section', 'Bagian Struktur V2'),
            unit: t('unit', 'Unit V2'),
            badge: t('badge', 'Struktur V2'),
            tone: (v.tone as OrgChartNodeItem['tone']) || 'brand',
            summary: t('summary'),
            duties: splitLines(v.duties || ''),
            baseSop: t('baseSop') || undefined,
          };
          setOrgV2Nodes((prev) => {
            const next = isEdit
              ? prev.map((x) => (x.id === itemId ? built : x))
              : [...prev, built];
            apiService.saveCollection('org_v2', next);
            return next;
          });
          setDetailModal((curr) =>
            curr?.kind === 'orgNode' && curr.node.id === built.id
              ? { ...curr, node: built }
              : curr
          );
          break;
        }
        case 'orgNodeV1': {
          const built: OrgChartNodeItem = {
            id: itemId || makeUid('v1-node'),
            title: t('title', 'Unit Baru'),
            section: t('section', 'Bagian Struktur V1'),
            unit: t('unit', 'Unit V1'),
            badge: t('badge', 'Dept. MM V1'),
            tone: (v.tone as OrgChartNodeItem['tone']) || 'blue',
            summary: t('summary'),
            duties: splitLines(v.duties || ''),
            baseSop: t('baseSop') || undefined,
          };
          setOrgV1Nodes((prev) => {
            const next = isEdit
              ? prev.map((x) => (x.id === itemId ? built : x))
              : [...prev, built];
            apiService.saveCollection('org_v1', next);
            return next;
          });
          setDetailModal((curr) =>
            curr?.kind === 'orgNode' && curr.node.id === built.id
              ? { ...curr, node: built }
              : curr
          );
          break;
        }
        case 'regional': {
          const built: RegionalItem = {
            id: itemId || makeUid('reg'),
            no: t('no', '00'),
            name: t('name'),
            center: t('center'),
            desc: t('desc'),
          };
          setRegionalsList((prev) => {
            const next = isEdit
              ? prev.map((x) => ((x.id || x.no) === itemId ? built : x))
              : [...prev, built];
            apiService.saveCollection('regionals', next);
            return next;
          });
          break;
        }
        case 'churchCat': {
          const built: ChurchCategoryItem = {
            id: itemId || makeUid('cat'),
            cat: t('cat', 'F'),
            label: t('label'),
            statusGereja: t('statusGereja'),
            capacity: t('capacity'),
            building: t('building'),
            otherRoomEquip: t('otherRoomEquip'),
            staffMM: t('staffMM'),
            relawan: t('relawan'),
            equip: t('equip'),
          };
          setChurchCategoriesList((prev) => {
            const next = isEdit
              ? prev.map((x) => ((x.id || x.cat) === itemId ? built : x))
              : [...prev, built];
            apiService.saveCollection('church_cats', next);
            return next;
          });
          break;
        }
        case 'pilarMap': {
          const built: PilarMappingItem = {
            id: itemId || makeUid('pmap'),
            pilar: t('pilar'),
            unit: t('unit'),
            focus: t('focus'),
          };
          setPilarMappingList((prev) => {
            const next = isEdit
              ? prev.map((x) => (x.id === itemId ? built : x))
              : [...prev, built];
            apiService.saveCollection('pilar_mapping', next);
            return next;
          });
          break;
        }
        case 'level': {
          const built: LevelingGradeItem = {
            id: itemId || makeUid('lvl'),
            grade: t('grade'),
            role: t('role'),
            msj: t('msj'),
            modul: t('modul'),
            scope: t('scope'),
            duration: t('duration'),
            attendance: t('attendance', '75%'),
            tone: (v.tone as LevelingGradeItem['tone']) || 'brand',
            filosofis: t('filosofis'),
            objektif: t('objektif'),
            spesifikasi: splitLines(v.spesifikasi || ''),
          };
          setLevelingList((prev) => {
            const next = isEdit
              ? prev.map((x) => ((x.id || x.grade) === itemId ? built : x))
              : [...prev, built];
            apiService.saveCollection('levels', next);
            return next;
          });
          setDetailModal((curr) =>
            curr?.kind === 'level' && (curr.level.id || curr.level.grade) === (built.id || built.grade)
              ? { kind: 'level', level: built }
              : curr
          );
          break;
        }
        case 'rule': {
          const existing = isEdit ? rulesList.find((x) => x.id === itemId) : undefined;
          const summary = t('summary');
          const built: RuleItem = {
            id: itemId || makeUid('rule'),
            title: t('title'),
            category: t('category', 'Umum'),
            type: t('type', 'ATURAN'),
            tone: (v.tone as RuleItem['tone']) || 'teal',
            iconKey: (v.iconKey as RuleItem['iconKey']) || 'file',
            summary,
            blocks: editableTextToBlocks(v.bodyLines || '', summary, existing?.blocks),
          };
          setRulesList((prev) => {
            const next = isEdit
              ? prev.map((x) => (x.id === itemId ? built : x))
              : [built, ...prev];
            apiService.saveCollection('rules_v2', next);
            return next;
          });
          setDetailModal((curr) =>
            curr?.kind === 'rule' && curr.rule.id === built.id
              ? { kind: 'rule', rule: built }
              : curr
          );
          break;
        }
        case 'sop': {
          const existing = isEdit ? sopV5List.find((x) => x.id === itemId) : undefined;
          const summary = t('summary');
          const secCode = t('section', 'VII');
          const built: SopModuleItem = {
            id: itemId || makeUid('sop'),
            num: t('num', String(sopV5List.length + 1).padStart(2, '0')),
            section: secCode,
            sectionTitle: t('sectionTitle', `Bagian ${secCode}: Tambahan Tim`),
            title: t('title'),
            type: t('type', 'SOP'),
            tone: (v.tone as SopModuleItem['tone']) || 'brand',
            iconKey: (v.iconKey as SopModuleItem['iconKey']) || 'fileCheck',
            summary,
            blocks: editableTextToBlocks(v.bodyLines || '', summary, existing?.blocks),
          };
          setSopV5List((prev) => {
            const next = isEdit
              ? prev.map((x) => (x.id === itemId ? built : x))
              : [built, ...prev];
            apiService.saveCollection('sop_v5_v2', next);
            return next;
          });
          setDetailModal((curr) =>
            curr?.kind === 'sop' && curr.sop.id === built.id ? { kind: 'sop', sop: built } : curr
          );
          break;
        }
        case 'jabatan': {
          const built: Gms2JabatanItem = {
            id: itemId || makeUid('jab'),
            num: t('num'),
            pages: t('pages', '-'),
            title: t('title'),
            nature: t('nature', 'Full Time'),
            desc: t('desc'),
            deskripsiUmum: splitLines(v.deskripsiUmum || ''),
            deskripsiDetail: splitLines(v.deskripsiDetail || ''),
            tujuanProduk: splitLines(v.tujuanProduk || ''),
            kualifikasi: t('kualifikasi'),
          };
          setJabatanList((prev) => {
            const next = isEdit
              ? prev.map((x) => ((x.id || x.num) === itemId ? built : x))
              : [...prev, built];
            apiService.saveCollection('jabatan', next);
            return next;
          });
          setDetailModal((curr) =>
            curr?.kind === 'jabatan' &&
            (curr.jabatan.id || curr.jabatan.num) === (built.id || built.num)
              ? { kind: 'jabatan', jabatan: built }
              : curr
          );
          break;
        }
        case 'gms2Pengantar': {
          const existing = isEdit ? gms2PengantarList.find((x) => x.id === itemId) : undefined;
          const built: Gms2PengantarRow = {
            id: itemId || makeUid('peng'),
            section: t('section'),
            pages: t('pages', 'Hal. 2–5'),
            tone: (v.tone as Gms2PengantarRow['tone']) || 'indigo',
            desc: t('desc'),
            linkPage: existing?.linkPage,
          };
          setGms2PengantarList((prev) => {
            const next = isEdit
              ? prev.map((x) => (x.id === itemId ? built : x))
              : [...prev, built];
            apiService.saveCollection('gms2_pengantar', next);
            return next;
          });
          break;
        }
        case 'gms2Servolution': {
          const built: Gms2ServolutionRow = {
            id: itemId || makeUid('serv'),
            component: t('component'),
            pages: t('pages', 'Hal. 30–37'),
            tone: (v.tone as Gms2ServolutionRow['tone']) || 'brand',
            desc: t('desc'),
          };
          setGms2ServolutionList((prev) => {
            const next = isEdit
              ? prev.map((x) => (x.id === itemId ? built : x))
              : [...prev, built];
            apiService.saveCollection('gms2_servolution', next);
            return next;
          });
          break;
        }
        case 'gms2Prinsip': {
          const built: Gms2PrinsipRow = {
            id: itemId || makeUid('prin'),
            code: t('code', 'P-00'),
            group: t('group', '6 Prinsip Pengadaan (Hal. 58)'),
            title: t('title'),
            tone: (v.tone as Gms2PrinsipRow['tone']) || 'brand',
            desc: t('desc'),
          };
          setGms2PrinsipList((prev) => {
            const next = isEdit
              ? prev.map((x) => (x.id === itemId ? built : x))
              : [...prev, built];
            apiService.saveCollection('gms2_prinsip', next);
            return next;
          });
          break;
        }
        case 'gms2Form': {
          const existing = isEdit ? gms2FormsList.find((x) => x.id === itemId) : undefined;
          const summary = t('summary');
          const built: Gms2WiPrItem = {
            id: itemId || makeUid('fm'),
            code: t('code', 'FM-BARU'),
            type: t('type', 'FORM'),
            title: t('title'),
            tone: (v.tone as Gms2WiPrItem['tone']) || 'emerald',
            iconKey: (v.iconKey as Gms2WiPrItem['iconKey']) || 'clipboardCheck',
            summary,
            blocks: editableTextToBlocks(v.bodyLines || '', summary, existing?.blocks),
          };
          setGms2FormsList((prev) => {
            const next = isEdit
              ? prev.map((x) => (x.id === itemId ? built : x))
              : [built, ...prev];
            apiService.saveCollection('gms2_forms', next);
            return next;
          });
          setDetailModal((curr) =>
            curr?.kind === 'gms2Form' && curr.item.id === built.id
              ? { kind: 'gms2Form', item: built }
              : curr
          );
          break;
        }
        case 'ws1Video': {
          const built: WsWeekRow = {
            id: itemId || makeUid('ws1v'),
            week: t('week'),
            title: t('title'),
            desc: t('desc'),
          };
          setWs1VideoList((prev) => {
            const next = isEdit
              ? prev.map((x) => (x.id === itemId ? built : x))
              : [...prev, built];
            apiService.saveCollection('ws1_video', next);
            return next;
          });
          break;
        }
        case 'ws1Photo': {
          const built: WsWeekRow = {
            id: itemId || makeUid('ws1p'),
            week: t('week'),
            title: t('title'),
            desc: t('desc'),
          };
          setWs1PhotoList((prev) => {
            const next = isEdit
              ? prev.map((x) => (x.id === itemId ? built : x))
              : [...prev, built];
            apiService.saveCollection('ws1_photo', next);
            return next;
          });
          break;
        }
        case 'ws2Module': {
          const built: WsModuleRow = {
            id: itemId || makeUid('ws2m'),
            title: t('title'),
            desc: t('desc'),
          };
          setWs2ModulesList((prev) => {
            const next = isEdit
              ? prev.map((x) => (x.id === itemId ? built : x))
              : [...prev, built];
            apiService.saveCollection('ws2_modules', next);
            return next;
          });
          break;
        }
        case 'sinodalDef': {
          const built: SinodalDefItem = {
            id: itemId || makeUid('sdef'),
            title: t('title'),
            tone: (v.tone as SinodalDefItem['tone']) || 'neutral',
            desc: t('desc'),
          };
          setSinodalDefsList((prev) => {
            const next = isEdit
              ? prev.map((x) => (x.id === itemId ? built : x))
              : [...prev, built];
            apiService.saveCollection('sinodal_defs', next);
            return next;
          });
          break;
        }
        case 'tpsStep': {
          const built: TpsStepRow = {
            id: itemId || makeUid('tps'),
            step: t('step'),
            title: t('title'),
            desc: t('desc'),
          };
          setTpsStepsList((prev) => {
            const next = isEdit
              ? prev.map((x) => (x.id === itemId ? built : x))
              : [...prev, built];
            apiService.saveCollection('tps_steps', next);
            return next;
          });
          break;
        }
        case 'wipr': {
          const existing = isEdit ? gms2WiPrList.find((x) => x.id === itemId) : undefined;
          const summary = t('summary');
          const built: Gms2WiPrItem = {
            id: itemId || makeUid('wipr'),
            code: t('code', 'WI-BARU'),
            type: t('type', 'WI'),
            title: t('title'),
            tone: (v.tone as Gms2WiPrItem['tone']) || 'brand',
            iconKey: (v.iconKey as Gms2WiPrItem['iconKey']) || 'clipboardCheck',
            summary,
            blocks: editableTextToBlocks(v.bodyLines || '', summary, existing?.blocks),
          };
          setGms2WiPrList((prev) => {
            const next = isEdit
              ? prev.map((x) => (x.id === itemId ? built : x))
              : [built, ...prev];
            apiService.saveCollection('gms2_wipr', next);
            return next;
          });
          setDetailModal((curr) =>
            curr?.kind === 'wipr' && curr.item.id === built.id
              ? { kind: 'wipr', item: built }
              : curr
          );
          break;
        }
        case 'bsValue': {
          const built: MinistryValueRow = {
            id: itemId || makeUid('bsv'),
            num: t('num'),
            name: t('name'),
            desc: t('desc'),
          };
          setBukuSakuValuesList((prev) => {
            const next = isEdit
              ? prev.map((x) => (x.id === itemId ? built : x))
              : [...prev, built];
            apiService.saveCollection('bs_values', next);
            return next;
          });
          break;
        }
        case 'crewChief': {
          const built: CrewChiefTimelineItem = {
            id: itemId || makeUid('cct'),
            time: t('time'),
            phase: t('phase'),
            desc: t('desc'),
          };
          setCrewChiefTimelineList((prev) => {
            const next = isEdit
              ? prev.map((x) => ((x.id || x.time) === itemId ? built : x))
              : [...prev, built];
            apiService.saveCollection('crew_chief_v2', next);
            return next;
          });
          break;
        }
        case 'ministryRole': {
          const built: MinistryRoleItem = {
            id: itemId || makeUid('mrole'),
            num: t('num'),
            group: t('group', 'Umum'),
            name: t('name'),
            req: t('req'),
            duties: t('duties'),
          };
          setMinistryRolesList((prev) => {
            const next = isEdit
              ? prev.map((x) => ((x.id || x.num) === itemId ? built : x))
              : [built, ...prev];
            apiService.saveCollection('ministry_roles', next);
            return next;
          });
          setDetailModal((curr) =>
            curr?.kind === 'ministryRole' &&
            (curr.role.id || curr.role.num) === (built.id || built.num)
              ? { kind: 'ministryRole', role: built }
              : curr
          );
          break;
        }
        case 'leaderDiv': {
          const built: LeaderDivisionRow = {
            id: itemId || makeUid('ldiv'),
            name: t('name'),
            scope: t('scope'),
            tone: (v.tone as LeaderDivisionRow['tone']) || 'purple',
            desc: t('desc'),
          };
          setLeaderDivisionsList((prev) => {
            const next = isEdit
              ? prev.map((x) => (x.id === itemId ? built : x))
              : [...prev, built];
            apiService.saveCollection('leader_divs', next);
            return next;
          });
          break;
        }
        case 'perintisanProfil': {
          const built: PerintisanProfilRow = {
            id: itemId || makeUid('pprof'),
            label: t('label'),
            tone: (v.tone as PerintisanProfilRow['tone']) || 'brand',
            desc: t('desc'),
          };
          setPerintisanProfilList((prev) => {
            const next = isEdit
              ? prev.map((x) => (x.id === itemId ? built : x))
              : [...prev, built];
            apiService.saveCollection('perintisan_profil', next);
            return next;
          });
          break;
        }
        case 'perintisanMateri': {
          const built: PerintisanMateriRow = {
            id: itemId || makeUid('pmat'),
            code: t('code'),
            title: t('title'),
            desc: t('desc'),
          };
          setPerintisanMateriList((prev) => {
            const next = isEdit
              ? prev.map((x) => (x.id === itemId ? built : x))
              : [...prev, built];
            apiService.saveCollection('perintisan_materi', next);
            return next;
          });
          break;
        }
        case 'perintisanMetode': {
          const built: PerintisanMetodeRow = {
            id: itemId || makeUid('pmet'),
            aspect: t('aspect'),
            m1: t('m1'),
            m2: t('m2'),
          };
          setPerintisanMetodeList((prev) => {
            const next = isEdit
              ? prev.map((x) => (x.id === itemId ? built : x))
              : [...prev, built];
            apiService.saveCollection('perintisan_metode', next);
            return next;
          });
          break;
        }
        case 'perintisanTarget': {
          const built: PerintisanTargetRow = {
            id: itemId || makeUid('ptgt'),
            act: t('act'),
            freq: t('freq'),
            tone: (v.tone as PerintisanTargetRow['tone']) || 'brand',
            desc: t('desc'),
          };
          setPerintisanTargetList((prev) => {
            const next = isEdit
              ? prev.map((x) => (x.id === itemId ? built : x))
              : [...prev, built];
            apiService.saveCollection('perintisan_target', next);
            return next;
          });
          break;
        }
        case 'perintisanMilestone': {
          const built: PerintisanMilestoneRow = {
            id: itemId || makeUid('pmil'),
            aspect: t('aspect'),
            tone: (v.tone as PerintisanMilestoneRow['tone']) || 'brand',
            m1: t('m1'),
            m2: t('m2'),
          };
          setPerintisanMilestoneList((prev) => {
            const next = isEdit
              ? prev.map((x) => (x.id === itemId ? built : x))
              : [...prev, built];
            apiService.saveCollection('perintisan_milestone', next);
            return next;
          });
          break;
        }
        case 'camMatrix': {
          const built: CamMatrixItem = {
            id: itemId || makeUid('cam'),
            cam: t('cam'),
            rig: t('rig'),
            lens: t('lens'),
            tone: (v.tone as CamMatrixItem['tone']) || 'brand',
            notes: t('notes'),
          };
          setCamMatrixList((prev) => {
            const next = isEdit
              ? prev.map((x) => ((x.id || x.cam) === itemId ? built : x))
              : [...prev, built];
            apiService.saveCollection('cam_matrix', next);
            return next;
          });
          break;
        }
        case 'fdSignal': {
          const built: FdHandSignalItem = {
            id: itemId || makeUid('fd'),
            code: t('code'),
            gesture: t('gesture'),
            meaning: t('meaning'),
          };
          setFdSignalsList((prev) => {
            const next = isEdit
              ? prev.map((x) => ((x.id || x.code) === itemId ? built : x))
              : [...prev, built];
            apiService.saveCollection('fd_signals', next);
            return next;
          });
          break;
        }
      }

      setCrudModal(null);
      triggerToast(
        isEdit ? 'Perubahan Disimpan' : 'Data Ditambahkan',
        isEdit ? 'Data berhasil diperbarui.' : 'Entri baru berhasil ditambahkan.',
        'success'
      );
    },
    [gms2FormsList, gms2PengantarList, gms2WiPrList, rulesList, sopV5List, triggerToast]
  );

  const requestDeleteItem = useCallback(
    (entity: CrudEntityType, itemId: string, label: string) => {
      setDeleteConfirm({ entity, itemId, label });
    },
    []
  );

  const confirmDeleteItem = useCallback(() => {
    if (!deleteConfirm) return;
    const { entity, itemId, label } = deleteConfirm;

    switch (entity) {
      case 'pillar':
        setPillarsList((prev) => {
          const next = prev.filter((x) => x.id !== itemId);
          apiService.saveCollection('pillars', next);
          return next;
        });
        break;
      case 'orgNodeV2':
        setOrgV2Nodes((prev) => {
          const next = prev.filter((x) => x.id !== itemId);
          apiService.saveCollection('org_v2', next);
          return next;
        });
        break;
      case 'orgNodeV1':
        setOrgV1Nodes((prev) => {
          const next = prev.filter((x) => x.id !== itemId);
          apiService.saveCollection('org_v1', next);
          return next;
        });
        break;
      case 'regional':
        setRegionalsList((prev) => {
          const next = prev.filter((x) => (x.id || x.no) !== itemId);
          apiService.saveCollection('regionals', next);
          return next;
        });
        break;
      case 'churchCat':
        setChurchCategoriesList((prev) => {
          const next = prev.filter((x) => (x.id || x.cat) !== itemId);
          apiService.saveCollection('church_cats', next);
          return next;
        });
        break;
      case 'pilarMap':
        setPilarMappingList((prev) => {
          const next = prev.filter((x) => x.id !== itemId);
          apiService.saveCollection('pilar_mapping', next);
          return next;
        });
        break;
      case 'level':
        setLevelingList((prev) => {
          const next = prev.filter((x) => (x.id || x.grade) !== itemId);
          apiService.saveCollection('levels', next);
          return next;
        });
        break;
      case 'rule':
        setRulesList((prev) => {
          const next = prev.filter((x) => x.id !== itemId);
          apiService.saveCollection('rules_v2', next);
          return next;
        });
        break;
      case 'sop':
        setSopV5List((prev) => {
          const next = prev.filter((x) => x.id !== itemId);
          apiService.saveCollection('sop_v5_v2', next);
          return next;
        });
        break;
      case 'jabatan':
        setJabatanList((prev) => {
          const next = prev.filter((x) => (x.id || x.num) !== itemId);
          apiService.saveCollection('jabatan', next);
          return next;
        });
        break;
      case 'gms2Pengantar':
        setGms2PengantarList((prev) => {
          const next = prev.filter((x) => x.id !== itemId);
          apiService.saveCollection('gms2_pengantar', next);
          return next;
        });
        break;
      case 'gms2Servolution':
        setGms2ServolutionList((prev) => {
          const next = prev.filter((x) => x.id !== itemId);
          apiService.saveCollection('gms2_servolution', next);
          return next;
        });
        break;
      case 'gms2Prinsip':
        setGms2PrinsipList((prev) => {
          const next = prev.filter((x) => x.id !== itemId);
          apiService.saveCollection('gms2_prinsip', next);
          return next;
        });
        break;
      case 'gms2Form':
        setGms2FormsList((prev) => {
          const next = prev.filter((x) => x.id !== itemId);
          apiService.saveCollection('gms2_forms', next);
          return next;
        });
        break;
      case 'ws1Video':
        setWs1VideoList((prev) => {
          const next = prev.filter((x) => x.id !== itemId);
          apiService.saveCollection('ws1_video', next);
          return next;
        });
        break;
      case 'ws1Photo':
        setWs1PhotoList((prev) => {
          const next = prev.filter((x) => x.id !== itemId);
          apiService.saveCollection('ws1_photo', next);
          return next;
        });
        break;
      case 'ws2Module':
        setWs2ModulesList((prev) => {
          const next = prev.filter((x) => x.id !== itemId);
          apiService.saveCollection('ws2_modules', next);
          return next;
        });
        break;
      case 'sinodalDef':
        setSinodalDefsList((prev) => {
          const next = prev.filter((x) => x.id !== itemId);
          apiService.saveCollection('sinodal_defs', next);
          return next;
        });
        break;
      case 'tpsStep':
        setTpsStepsList((prev) => {
          const next = prev.filter((x) => x.id !== itemId);
          apiService.saveCollection('tps_steps', next);
          return next;
        });
        break;
      case 'wipr':
        setGms2WiPrList((prev) => {
          const next = prev.filter((x) => x.id !== itemId);
          apiService.saveCollection('gms2_wipr', next);
          return next;
        });
        break;
      case 'bsValue':
        setBukuSakuValuesList((prev) => {
          const next = prev.filter((x) => x.id !== itemId);
          apiService.saveCollection('bs_values', next);
          return next;
        });
        break;
      case 'crewChief':
        setCrewChiefTimelineList((prev) => {
          const next = prev.filter((x) => (x.id || x.time) !== itemId);
          apiService.saveCollection('crew_chief_v2', next);
          return next;
        });
        break;
      case 'ministryRole':
        setMinistryRolesList((prev) => {
          const next = prev.filter((x) => (x.id || x.num) !== itemId);
          apiService.saveCollection('ministry_roles', next);
          return next;
        });
        break;
      case 'leaderDiv':
        setLeaderDivisionsList((prev) => {
          const next = prev.filter((x) => x.id !== itemId);
          apiService.saveCollection('leader_divs', next);
          return next;
        });
        break;
      case 'perintisanProfil':
        setPerintisanProfilList((prev) => {
          const next = prev.filter((x) => x.id !== itemId);
          apiService.saveCollection('perintisan_profil', next);
          return next;
        });
        break;
      case 'perintisanMateri':
        setPerintisanMateriList((prev) => {
          const next = prev.filter((x) => x.id !== itemId);
          apiService.saveCollection('perintisan_materi', next);
          return next;
        });
        break;
      case 'perintisanMetode':
        setPerintisanMetodeList((prev) => {
          const next = prev.filter((x) => x.id !== itemId);
          apiService.saveCollection('perintisan_metode', next);
          return next;
        });
        break;
      case 'perintisanTarget':
        setPerintisanTargetList((prev) => {
          const next = prev.filter((x) => x.id !== itemId);
          apiService.saveCollection('perintisan_target', next);
          return next;
        });
        break;
      case 'perintisanMilestone':
        setPerintisanMilestoneList((prev) => {
          const next = prev.filter((x) => x.id !== itemId);
          apiService.saveCollection('perintisan_milestone', next);
          return next;
        });
        break;
      case 'camMatrix':
        setCamMatrixList((prev) => {
          const next = prev.filter((x) => (x.id || x.cam) !== itemId);
          apiService.saveCollection('cam_matrix', next);
          return next;
        });
        break;
      case 'fdSignal':
        setFdSignalsList((prev) => {
          const next = prev.filter((x) => (x.id || x.code) !== itemId);
          apiService.saveCollection('fd_signals', next);
          return next;
        });
        break;
    }

    setDetailModal(null);
    setDeleteConfirm(null);
    triggerToast('Data Dihapus', `"${label}" berhasil dihapus.`, 'info');
  }, [deleteConfirm, triggerToast]);

  const resetAllPlatformData = useCallback(() => {
    apiService.clearAllPlatformCollections();
    setOverviewTagline(DEFAULT_OVERVIEW_TAGLINE);
    setPillarsList(PILLARS_DATA);
    setOrgV2Nodes(ORG_CHART_V2_NODES);
    setOrgV1Nodes(ORG_CHART_V1_NODES);
    setRegionalsList(SEED_REGIONALS);
    setChurchCategoriesList(SEED_CHURCH_CATEGORIES);
    setPilarMappingList(SEED_PILAR_MAPPING);
    setLevelingList(SEED_LEVELS);
    setRulesList(INITIAL_RULES_DATA);
    setSopV5List(INITIAL_SOP_V5_DATA);
    setJabatanList(SEED_JABATAN);
    setGms2PengantarList(GMS2_PENGANTAR_ROWS);
    setGms2ServolutionList(GMS2_SERVOLUTION_ROWS);
    setGms2PrinsipList(GMS2_PRINSIP_PENGADAAN_ROWS);
    setGms2FormsList(INITIAL_GMS2_FORMS_DATA);
    setWs1VideoList(SEED_WS1_VIDEO);
    setWs1PhotoList(SEED_WS1_PHOTO);
    setWs2ModulesList(SEED_WS2_MODULES);
    setSinodalDefsList(SEED_SINODAL_DEFS);
    setTpsStepsList(SEED_TPS_STEPS);
    setGms2WiPrList(INITIAL_GMS2_WIPR_DATA);
    setBukuSakuValuesList(SEED_BS_VALUES);
    setCrewChiefTimelineList(SEED_CREW_CHIEF);
    setMinistryRolesList(SEED_MINISTRY_ROLES);
    setLeaderDivisionsList(SEED_LEADER_DIVISIONS);
    setPerintisanProfilList(SEED_PERINTISAN_PROFIL);
    setPerintisanMateriList(SEED_PERINTISAN_MATERI);
    setPerintisanMetodeList(SEED_PERINTISAN_METODE);
    setPerintisanTargetList(SEED_PERINTISAN_TARGET);
    setPerintisanMilestoneList(SEED_PERINTISAN_MILESTONE);
    setCamMatrixList(SEED_CAM_MATRIX);
    setFdSignalsList(SEED_FD_SIGNALS);
    setDetailModal(null);
    triggerToast('Data Direset', 'Seluruh data dikembalikan ke standar awal GMS.', 'success');
  }, [triggerToast]);

  const openAddDocModal = useCallback(
    (target?: AddDocTarget) => {
      const resolved: AddDocTarget =
        target ||
        (activePage === 'gms2'
          ? 'gms2'
          : activePage === 'panduan'
          ? panduanSubtab
          : 'rules');
      setAddDocDefaultTarget(resolved);
      setIsAddDocOpen(true);
    },
    [activePage, panduanSubtab]
  );

  const closeAddDocModal = useCallback(() => setIsAddDocOpen(false), []);

  const openAttachModal = useCallback(
    (page?: SpaModulePageId) => {
      const targetPage: SpaModulePageId =
        page || (activePage === 'uikit' ? 'orgchart' : activePage);
      setAttachDefaultPage(targetPage);
      setIsAttachDocOpen(true);
    },
    [activePage]
  );

  const closeAttachModal = useCallback(() => setIsAttachDocOpen(false), []);

  const attachPageDocument = useCallback(
    (page: SpaModulePageId, item: Omit<PageAttachmentItem, 'id'>) => {
      const created: PageAttachmentItem = {
        ...item,
        id: `att-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      };
      setPageAttachments((prev) => {
        const next = {
          ...prev,
          [page]: [...(prev[page] || []), created],
        };
        apiService.savePageAttachments(next);
        return next;
      });
      triggerToast(
        'Lampiran Ditambahkan',
        `"${created.name}" dilampirkan ke ${PAGE_LABELS_MAP[page]}.`,
        'success'
      );
    },
    [triggerToast]
  );

  const removePageAttachment = useCallback(
    (page: SpaModulePageId, id: string) => {
      setPageAttachments((prev) => {
        const existing = (prev[page] || []).find((a) => a.id === id);
        if (existing?.url.startsWith('blob:')) {
          try {
            URL.revokeObjectURL(existing.url);
          } catch {
            // ignore
          }
        }
        const next = {
          ...prev,
          [page]: (prev[page] || []).filter((a) => a.id !== id),
        };
        apiService.savePageAttachments(next);
        return next;
      });
      triggerToast('Lampiran Dihapus', 'Lampiran dokumen telah dihapus dari halaman.', 'info');
    },
    [triggerToast]
  );

  const handleAddDocSubmit = useCallback(
    (payload: AddDocumentSubmitPayload) => {
      const title = payload.title.trim();
      const catOrCode = payload.categoryOrCode.trim();
      const summary = payload.summary.trim() || 'Dokumen tambahan tim Multimedia.';
      const lines = splitLines(payload.bodyLines);

      const blocks: DetailContentBlock[] =
        lines.length > 0
          ? [{ kind: 'list', items: lines.map((text) => ({ text })) }]
          : [{ kind: 'paragraph', text: summary }];

      if (payload.target === 'value') {
        const created: RuleItem = {
          id: makeUid('rule'),
          title,
          summary,
          category: 'Value & Komitmen',
          type: catOrCode || 'KOMITMEN',
          iconKey: 'heartHand',
          tone: 'teal',
          blocks,
        };
        setRulesList((prev) => {
          const next = [created, ...prev];
          apiService.saveCollection('rules_v2', next);
          return next;
        });
        setPanduanSubtab('value');
        setActivePage('panduan');
        triggerToast('Value & Komitmen Ditambahkan', `"${title}" berhasil disimpan.`, 'success');
      } else if (payload.target === 'rules') {
        const created: RuleItem = {
          id: makeUid('rule'),
          title,
          summary,
          category: catOrCode || 'Kedisiplinan & Penampilan',
          type: 'ATURAN BARU',
          iconKey: 'file',
          tone: 'teal',
          blocks,
        };
        setRulesList((prev) => {
          const next = [created, ...prev];
          apiService.saveCollection('rules_v2', next);
          return next;
        });
        setPanduanSubtab('rules');
        setActivePage('panduan');
        triggerToast('Aturan Ditambahkan', `Dokumen aturan "${title}" berhasil disimpan.`, 'success');
      } else if (payload.target === 'sop') {
        const num = String(sopV5List.length + 1).padStart(2, '0');
        const created: SopModuleItem = {
          id: makeUid('sop'),
          section: 'VII',
          sectionTitle: 'Bagian VII: SOP Tambahan Tim',
          num,
          title,
          type: catOrCode || 'SOP',
          summary,
          iconKey: 'fileCheck',
          tone: 'brand',
          blocks,
        };
        setSopV5List((prev) => {
          const next = [created, ...prev];
          apiService.saveCollection('sop_v5_v2', next);
          return next;
        });
        setPanduanSubtab('sop');
        setActivePage('panduan');
        triggerToast('SOP Operasional Ditambahkan', `Modul #${num} "${title}" berhasil ditambahkan.`, 'success');
      } else if (payload.target === 'gms2') {
        const created: Gms2WiPrItem = {
          id: makeUid('wipr'),
          code: catOrCode || 'WI-BARU',
          title,
          type: 'WI',
          summary,
          iconKey: 'clipboardCheck',
          tone: 'brand',
          blocks,
        };
        setGms2WiPrList((prev) => {
          const next = [created, ...prev];
          apiService.saveCollection('gms2_wipr', next);
          return next;
        });
        setGms2Subtab('wipr');
        setActivePage('gms2');
        triggerToast('Lampiran WI/PR Ditambahkan', `"${title}" berhasil ditambahkan ke GMS II.`, 'success');
      } else if (payload.target === 'peran') {
        const num = String(ministryRolesList.length + 1).padStart(2, '0');
        const created: MinistryRoleItem = {
          id: makeUid('mrole'),
          num,
          name: title,
          group: catOrCode || 'Tambahan',
          req: summary,
          duties: lines.length > 0 ? lines.join(' ') : summary,
        };
        setMinistryRolesList((prev) => {
          const next = [created, ...prev];
          apiService.saveCollection('ministry_roles', next);
          return next;
        });
        setPanduanSubtab('peran');
        setActivePage('panduan');
        triggerToast('Peran Tim Ditambahkan', `Peran #${num} "${title}" berhasil disimpan.`, 'success');
      }

      setIsAddDocOpen(false);
    },
    [ministryRolesList.length, setActivePage, sopV5List.length, triggerToast]
  );

  // Detail modal openers using live CRUD collections
  const openPillarModal = useCallback(
    (pillarId: string) => {
      const pillar = pillarsList.find((p) => p.id === pillarId);
      if (pillar) setDetailModal({ kind: 'pillar', pillar });
    },
    [pillarsList]
  );

  const openRuleModal = useCallback(
    (ruleId: string) => {
      const rule = rulesList.find((r) => r.id === ruleId);
      if (rule) setDetailModal({ kind: 'rule', rule });
    },
    [rulesList]
  );

  const openSopModal = useCallback(
    (sopId: string) => {
      const sop = sopV5List.find((s) => s.id === sopId);
      if (sop) setDetailModal({ kind: 'sop', sop });
    },
    [sopV5List]
  );

  const openOrgNodeModal = useCallback(
    (nodeId: string, versionTag?: string) => {
      const isV2 = nodeId.startsWith('v2-');
      const primaryPool = isV2 ? orgV2Nodes : orgV1Nodes;
      const node =
        primaryPool.find((n) => n.id === nodeId) ||
        [...orgV2Nodes, ...orgV1Nodes].find((n) => n.id === nodeId);
      if (node) {
        setDetailModal({
          kind: 'orgNode',
          node,
          versionTag: versionTag || (isV2 ? 'V2 Synodal' : 'V1 Dept. MM'),
        });
      }
    },
    [orgV1Nodes, orgV2Nodes]
  );

  const openJabatanModal = useCallback(
    (numOrId: string) => {
      const jabatan = jabatanList.find((j) => j.id === numOrId || j.num === numOrId);
      if (jabatan) setDetailModal({ kind: 'jabatan', jabatan });
    },
    [jabatanList]
  );

  const openLevelModal = useCallback(
    (gradeOrId: string) => {
      const level = levelingList.find((l) => l.id === gradeOrId || l.grade === gradeOrId);
      if (level) setDetailModal({ kind: 'level', level });
    },
    [levelingList]
  );

  const openWiPrModal = useCallback(
    (id: string) => {
      const item = gms2WiPrList.find((w) => w.id === id);
      if (item) setDetailModal({ kind: 'wipr', item });
    },
    [gms2WiPrList]
  );

  const openGms2FormModal = useCallback(
    (id: string) => {
      const item = gms2FormsList.find((f) => f.id === id);
      if (item) setDetailModal({ kind: 'gms2Form', item });
    },
    [gms2FormsList]
  );

  const openMinistryRoleModal = useCallback(
    (numOrId: string) => {
      const role = ministryRolesList.find((r) => r.id === numOrId || r.num === numOrId);
      if (role) setDetailModal({ kind: 'ministryRole', role });
    },
    [ministryRolesList]
  );

  // Notifications
  const [readNotifIds, setReadNotifIds] = useState<string[]>(() =>
    apiService.getReadNotificationIds()
  );

  const notifications = useMemo<NotificationItem[]>(() => {
    const readSet = new Set(readNotifIds);
    return INITIAL_MULTIMEDIA_NOTIFICATIONS.map((n) =>
      readSet.has(n.id) ? { ...n, unread: false } : n
    );
  }, [readNotifIds]);

  const unreadNotifCount = useMemo(
    () => notifications.filter((n) => n.unread).length,
    [notifications]
  );

  const handleMarkAllRead = useCallback(() => {
    const allIds = INITIAL_MULTIMEDIA_NOTIFICATIONS.map((n) => n.id);
    setReadNotifIds(allIds);
    apiService.saveReadNotificationIds(allIds);
    triggerToast('Notifikasi Dibaca', 'Semua notifikasi Multimedia ditandai sudah dibaca.', 'success');
  }, [triggerToast]);

  const handleNotificationClick = useCallback(
    (notif: NotificationItem) => {
      setReadNotifIds((prev) => {
        if (prev.includes(notif.id)) return prev;
        const next = [...prev, notif.id];
        apiService.saveReadNotificationIds(next);
        return next;
      });

      if (notif.targetPage) {
        setActivePage(notif.targetPage);
      }
      if (notif.targetPage === 'panduan' && notif.targetId === 'timeline') {
        setPanduanSubtab('sop');
      } else if (notif.targetPage === 'panduan' && notif.targetId) {
        setPanduanSubtab('rules');
        openRuleModal(notif.targetId);
      } else if (notif.targetPage === 'gms2' && notif.targetId) {
        setGms2Subtab('wipr');
        openWiPrModal(notif.targetId);
      }
    },
    [openRuleModal, openWiPrModal, setActivePage]
  );

  // Browser notification toggle support
  const [browserNotifEnabled, setBrowserNotifEnabled] = useState<boolean>(() => {
    if (typeof window === 'undefined' || !('Notification' in window)) return false;
    try {
      return (
        window.localStorage.getItem('mm_platform_browser_notif') === 'true' &&
        Notification.permission === 'granted'
      );
    } catch {
      return false;
    }
  });

  const toggleBrowserNotifications = useCallback(async () => {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      setBrowserNotifEnabled((prev) => !prev);
      triggerToast('Alert In-App Aktif', 'Pengingat SOP & aturan selalu aktif di ikon Lonceng.', 'info');
      return;
    }
    if (browserNotifEnabled) {
      setBrowserNotifEnabled(false);
      try {
        window.localStorage.setItem('mm_platform_browser_notif', 'false');
      } catch {
        // ignore
      }
      triggerToast('Alert Dijeda', 'Notifikasi browser dijeda; pengingat tetap tersedia di aplikasi.', 'info');
      return;
    }
    if (Notification.permission === 'granted') {
      setBrowserNotifEnabled(true);
      try {
        window.localStorage.setItem('mm_platform_browser_notif', 'true');
      } catch {
        // ignore
      }
      triggerToast('Alert Diaktifkan', 'Notifikasi pengingat SOP & deadline kini aktif.', 'success');
      return;
    }
    if (Notification.permission === 'denied') {
      triggerToast(
        'Izin Browser Diblokir',
        'Aktifkan izin notifikasi di pengaturan browser untuk menerima alert.',
        'warning'
      );
      return;
    }
    try {
      const perm = await Notification.requestPermission();
      if (perm === 'granted') {
        setBrowserNotifEnabled(true);
        window.localStorage.setItem('mm_platform_browser_notif', 'true');
        triggerToast('Alert Diaktifkan', 'Notifikasi pengingat Multimedia kini aktif.', 'success');
      } else {
        triggerToast('Izin Belum Diberikan', 'Gunakan ikon Lonceng untuk memantau pembaruan.', 'info');
      }
    } catch {
      triggerToast('Alert In-App Aktif', 'Gunakan ikon Lonceng untuk memantau pembaruan.', 'info');
    }
  }, [browserNotifEnabled, triggerToast]);

  // UI Kit Catalog Navigation & Updates State
  const [uiNavState, setUiNavState] = useState<{
    category: string;
    prevCategory: string;
    sub: string;
    prevSub: string;
    sectionId: string | null;
  }>(() => {
    const cached = apiService.getCachedUiNavState();
    const matchedGroup =
      (cached && UI_KIT_CATALOG.find((g) => g.id === cached.category)) || UI_KIT_CATALOG[0];
    const matchedSub =
      cached && matchedGroup.items.some((item) => item.label === cached.sub)
        ? cached.sub
        : matchedGroup.items[0]?.label || 'Grid';
    return {
      category: matchedGroup.id,
      prevCategory: matchedGroup.id,
      sub: matchedSub,
      prevSub: matchedSub,
      sectionId: null,
    };
  });
  const [uiSearchFocusSeq, setUiSearchFocusSeq] = useState(0);
  const [isUiMobileSearchOpen, setIsUiMobileSearchOpen] = useState(false);
  const [uiUpdates, setUiUpdates] = useState<UiKitUpdateItem[]>(() => {
    const readIds = new Set(apiService.getCachedReadUpdateIds());
    if (readIds.size === 0) return INITIAL_UI_UPDATES;
    return INITIAL_UI_UPDATES.map((u) => (readIds.has(u.id) ? { ...u, unread: false } : u));
  });

  const selectUiNode = useCallback((groupId: string, subLabel?: string, sectionId?: string) => {
    const group = UI_KIT_CATALOG.find((g) => g.id === groupId) || UI_KIT_CATALOG[0];
    const resolvedSub =
      subLabel && group.items.some((item) => item.label === subLabel)
        ? subLabel
        : group.items[0]?.label || 'Grid';
    playUiMotionSound('tick');
    apiService.saveCachedUiNavState({ category: group.id, sub: resolvedSub });
    setUiNavState((curr) => ({
      category: group.id,
      prevCategory: curr.category,
      sub: resolvedSub,
      prevSub: curr.sub,
      sectionId: sectionId ?? null,
    }));
    setPageState((curr) =>
      curr.active === 'uikit' ? curr : { active: 'uikit', prev: curr.active }
    );
  }, []);

  const clearUiTargetSection = useCallback(() => {
    setUiNavState((curr) => (curr.sectionId ? { ...curr, sectionId: null } : curr));
  }, []);

  const triggerUiSearchFocus = useCallback(() => {
    setUiSearchFocusSeq((n) => n + 1);
  }, []);

  const unreadUiUpdatesCount = useMemo(
    () => uiUpdates.filter((u) => u.unread).length,
    [uiUpdates]
  );

  const markAllUiUpdatesRead = useCallback(() => {
    setUiUpdates((prev) => {
      const next = prev.map((u) => ({ ...u, unread: false }));
      apiService.saveCachedReadUpdateIds(next.map((u) => u.id));
      return next;
    });
    triggerToast('Pembaruan Dibaca', 'Semua catatan UI KIT telah ditandai dibaca.', 'success');
  }, [triggerToast]);

  const handleUiUpdateClick = useCallback(
    (item: UiKitUpdateItem) => {
      setUiUpdates((prev) => {
        const next = prev.map((u) => (u.id === item.id ? { ...u, unread: false } : u));
        apiService.saveCachedReadUpdateIds(next.filter((u) => !u.unread).map((u) => u.id));
        return next;
      });
      selectUiNode(item.groupId, item.itemLabel, item.sectionId);
    },
    [selectUiNode]
  );

  // UI Kit Interactive Modals
  const [isBottomSheetDemoOpen, setIsBottomSheetDemoOpen] = useState(false);
  const [activeDemoModal, setActiveDemoModal] = useState<string | null>(null);
  const [activeDrawerSpec, setActiveDrawerSpec] = useState<{
    dir: 'left' | 'right' | 'top' | 'bottom';
    type: string;
  } | null>(null);
  const [uiSweetAlertType, setUiSweetAlertType] = useState<'success' | 'confirm' | null>(null);
  const [uiSessionModal, setUiSessionModal] = useState(false);

  // Offline status & sync queue listener
  const [isOnline, setIsOnline] = useState<boolean>(() =>
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );
  const [pendingSyncCount, setPendingSyncCount] = useState<number>(() => getOfflineQueueCount());

  const syncPendingNow = useCallback(async () => {
    const res = await flushOfflineQueue();
    if (res.flushed > 0) {
      triggerToast(
        'Sinkronisasi Selesai',
        `${res.flushed} perubahan offline berhasil dikirim ke server.`,
        'success'
      );
    }
  }, [triggerToast]);

  useEffect(() => {
    const unsubscribe = subscribeOfflineQueue(setPendingSyncCount);
    const onOnline = () => {
      setIsOnline(true);
      void syncPendingNow();
    };
    const onOffline = () => setIsOnline(false);
    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline);
    if (typeof navigator !== 'undefined' && navigator.onLine && getOfflineQueueCount() > 0) {
      void syncPendingNow();
    }
    return () => {
      unsubscribe();
      window.removeEventListener('online', onOnline);
      window.removeEventListener('offline', onOffline);
    };
  }, [syncPendingNow]);

  // App Theme (UI-KIT Light / Obsidian Dark)
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'light';
    try {
      const saved = window.localStorage.getItem('uikit_theme_v1');
      return saved === 'dark' ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    root.dataset.theme = theme;
    root.style.colorScheme = theme;
    try {
      window.localStorage.setItem('uikit_theme_v1', theme);
    } catch {
      // Ignore storage errors
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  // Global Search Keyboard Shortcut
  useEffect(() => {
    const onGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsGlobalSearchOpen((prev) => !prev);
        return;
      }
      if (
        e.key === '/' &&
        activePage !== 'uikit' &&
        document.activeElement?.tagName !== 'INPUT' &&
        document.activeElement?.tagName !== 'TEXTAREA' &&
        document.activeElement?.tagName !== 'SELECT' &&
        !(document.activeElement as HTMLElement | null)?.isContentEditable
      ) {
        e.preventDefault();
        setIsGlobalSearchOpen(true);
      }
    };
    window.addEventListener('keydown', onGlobalKeyDown);
    return () => window.removeEventListener('keydown', onGlobalKeyDown);
  }, [activePage]);

  return (
    <AppContext.Provider
      value={{
        activePage,
        prevPage,
        setActivePage,
        sidebarOpen,
        setSidebarOpen,
        mobileMenuOpen,
        setMobileMenuOpen,
        orgSubtab,
        setOrgSubtab,
        gms2Subtab,
        setGms2Subtab,
        panduanSubtab,
        setPanduanSubtab,
        toasts,
        triggerToast,
        overviewTagline,
        pillarsList,
        orgV2Nodes,
        orgV1Nodes,
        regionalsList,
        churchCategoriesList,
        pilarMappingList,
        levelingList,
        rulesList,
        sopV5List,
        jabatanList,
        gms2PengantarList,
        gms2ServolutionList,
        gms2PrinsipList,
        gms2FormsList,
        ws1VideoList,
        ws1PhotoList,
        ws2ModulesList,
        sinodalDefsList,
        tpsStepsList,
        gms2WiPrList,
        bukuSakuValuesList,
        crewChiefTimelineList,
        ministryRolesList,
        leaderDivisionsList,
        perintisanProfilList,
        perintisanMateriList,
        perintisanMetodeList,
        perintisanTargetList,
        perintisanMilestoneList,
        camMatrixList,
        fdSignalsList,
        pageAttachments,
        crudModal,
        openCrudCreate,
        openCrudEdit,
        closeCrudModal,
        saveCrudItem,
        deleteConfirm,
        requestDeleteItem,
        confirmDeleteItem,
        cancelDeleteItem,
        resetAllPlatformData,
        detailModal,
        setDetailModal,
        openPillarModal,
        openRuleModal,
        openSopModal,
        openOrgNodeModal,
        openJabatanModal,
        openLevelModal,
        openWiPrModal,
        openGms2FormModal,
        openMinistryRoleModal,
        isAddDocOpen,
        addDocDefaultTarget,
        openAddDocModal,
        closeAddDocModal,
        handleAddDocSubmit,
        isAttachDocOpen,
        attachDefaultPage,
        openAttachModal,
        closeAttachModal,
        attachPageDocument,
        removePageAttachment,
        isSettingsInfoOpen,
        setIsSettingsInfoOpen,
        notifications,
        handleMarkAllRead,
        handleNotificationClick,
        unreadNotifCount,
        browserNotifEnabled,
        toggleBrowserNotifications,
        isGlobalSearchOpen,
        setIsGlobalSearchOpen,
        isBottomSheetDemoOpen,
        setIsBottomSheetDemoOpen,
        activeDemoModal,
        setActiveDemoModal,
        activeDrawerSpec,
        setActiveDrawerSpec,
        uiSweetAlertType,
        setUiSweetAlertType,
        uiSessionModal,
        setUiSessionModal,
        uiCategory: uiNavState.category,
        prevUiCategory: uiNavState.prevCategory,
        uiSubJump: uiNavState.sub,
        prevUiSubJump: uiNavState.prevSub,
        uiTargetSectionId: uiNavState.sectionId,
        selectUiNode,
        clearUiTargetSection,
        uiSearchFocusSeq,
        triggerUiSearchFocus,
        isUiMobileSearchOpen,
        setIsUiMobileSearchOpen,
        uiUpdates,
        unreadUiUpdatesCount,
        markAllUiUpdatesRead,
        handleUiUpdateClick,
        isOnline,
        pendingSyncCount,
        syncPendingNow,
        theme,
        setTheme,
        toggleTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error('useApp must be used inside AppProvider');
  }
  return ctx;
};
