export type PastelThemeKey = 'periwinkle' | 'peach' | 'coral' | 'mint';

export interface PastelTheme {
  bg: string;
  header: string;
  border: string;
  text: string;
  dot: string;
  hex: string;
}

export type PageId =
  | 'overview'
  | 'orgchart'
  | 'gms2'
  | 'panduan'
  | 'perintisan'
  | 'quickref'
  | 'uikit';

export type SpaModulePageId = Exclude<PageId, 'uikit'>;

export interface NotificationItem {
  id: string;
  title: string;
  desc: string;
  time: string;
  unread: boolean;
  category: string;
  targetPage?: PageId;
  targetId?: string;
  theme: PastelThemeKey;
  reminderTag?: string;
  sourceType?: 'system' | 'panduan' | 'gms2';
  isReminder?: boolean;
}

export interface ToastItem {
  id: number;
  title: string;
  message: string;
  type?: 'success' | 'info' | 'warning' | 'error';
}

// Structured content blocks for safe, theme-aware detail modals
export type ContentCalloutTone = 'neutral' | 'brand' | 'info' | 'amber' | 'orange' | 'red' | 'emerald' | 'purple' | 'indigo';

export interface StructuredBulletItem {
  lead?: string;
  text: string;
}

export type DetailContentBlock =
  | {
      kind: 'callout';
      tone: ContentCalloutTone;
      title?: string;
      text?: string;
      items?: StructuredBulletItem[];
      ordered?: boolean;
    }
  | {
      kind: 'list';
      title?: string;
      ordered?: boolean;
      items: StructuredBulletItem[];
    }
  | {
      kind: 'paragraph';
      text: string;
    }
  | {
      kind: 'metaBox';
      lines: Array<{ label: string; value: string }>;
    }
  | {
      kind: 'fdSignalsTable';
    }
  | {
      kind: 'camMatrixTable';
    };

export interface PillarItem {
  id: string;
  group: string;
  name: string;
  role: string;
  iconKey: 'shield' | 'wrench' | 'graduation' | 'heart' | 'sprout';
  tone: 'blue' | 'amber' | 'emerald' | 'brand' | 'purple';
  responsibility: string;
  jobdesk: string[];
  baseSop: string;
}

export interface RuleItem {
  id: string;
  title: string;
  summary: string;
  category: string;
  type: string;
  iconKey: 'clock' | 'shirt' | 'headset' | 'clipboard' | 'scale' | 'stairs' | 'comments' | 'heartHand' | 'file';
  tone: 'blue' | 'amber' | 'indigo' | 'emerald' | 'red' | 'brand' | 'purple' | 'teal';
  blocks: DetailContentBlock[];
}

export interface SopSectionMeta {
  id: string;
  label: string;
}

export interface SopModuleItem {
  id: string;
  section: string;
  sectionTitle: string;
  num: string;
  title: string;
  type: string;
  summary: string;
  iconKey:
    | 'userTie'
    | 'boxes'
    | 'clapperboard'
    | 'hand'
    | 'sliders'
    | 'broadcast'
    | 'display'
    | 'type'
    | 'fileSlides'
    | 'sparkles'
    | 'video'
    | 'cameraRotate'
    | 'camera'
    | 'compass'
    | 'track'
    | 'move'
    | 'tripod'
    | 'headset'
    | 'door'
    | 'plug'
    | 'shield'
    | 'alert'
    | 'fileCheck';
  tone: 'blue' | 'brand' | 'purple' | 'indigo' | 'amber' | 'emerald' | 'teal' | 'red';
  blocks: DetailContentBlock[];
}

export interface Gms2JabatanItem {
  id?: string;
  num: string;
  title: string;
  pages: string;
  nature: string;
  desc: string;
  deskripsiUmum: string[];
  deskripsiDetail: string[];
  tujuanProduk: string[];
  kualifikasi: string;
}

export interface Gms2WiPrItem {
  id: string;
  code: string;
  title: string;
  type: 'WI' | 'PR' | 'FORM' | string;
  summary: string;
  iconKey: 'megaphone' | 'database' | 'clipboardCheck' | 'package' | 'laptop' | 'cart' | 'graduation' | 'shield';
  tone: 'brand' | 'indigo' | 'amber' | 'teal' | 'blue' | 'emerald' | 'purple';
  blocks: DetailContentBlock[];
}

export interface Gms2PengantarRow {
  id: string;
  section: string;
  pages: string;
  tone: 'neutral' | 'brand' | 'indigo' | 'emerald';
  desc: string;
  linkPage?: PageId;
}

export interface Gms2ServolutionRow {
  id: string;
  component: string;
  pages: string;
  tone: 'neutral' | 'brand' | 'indigo' | 'amber' | 'emerald';
  desc: string;
}

export interface Gms2PrinsipRow {
  id: string;
  code: string;
  group: string;
  title: string;
  tone: 'brand' | 'indigo' | 'emerald' | 'amber' | 'blue' | 'purple';
  desc: string;
}

export interface MinistryRoleItem {
  id?: string;
  num: string;
  name: string;
  group: string;
  req: string;
  duties: string;
}

export interface CrewChiefTimelineItem {
  id?: string;
  time: string;
  phase: string;
  desc: string;
}

export interface CamMatrixItem {
  id?: string;
  cam: string;
  rig: string;
  lens: string;
  tone: 'brand' | 'indigo' | 'blue' | 'purple' | 'amber' | 'emerald';
  notes: string;
}

export interface FdHandSignalItem {
  id?: string;
  code: string;
  gesture: string;
  meaning: string;
}

export interface LevelingGradeItem {
  id?: string;
  grade: string;
  role: string;
  msj: string;
  modul: string;
  filosofis: string;
  objektif: string;
  scope: string;
  duration: string;
  attendance: string;
  tone: 'gray' | 'blue' | 'indigo' | 'purple' | 'brand';
  spesifikasi: string[];
}

export interface ChurchCategoryItem {
  id?: string;
  cat: string;
  label: string;
  statusGereja: string;
  capacity: string;
  building: string;
  otherRoomEquip: string;
  staffMM: string;
  relawan: string;
  equip: string;
}

export interface RegionalItem {
  id?: string;
  no: string;
  name: string;
  center: string;
  desc: string;
}

export interface PilarMappingItem {
  id: string;
  pilar: string;
  unit: string;
  focus: string;
}

export interface WsWeekRow {
  id: string;
  week: string;
  title: string;
  desc: string;
}

export interface WsModuleRow {
  id: string;
  title: string;
  desc: string;
}

export interface SinodalDefItem {
  id: string;
  title: string;
  tone: 'neutral' | 'brand' | 'emerald';
  desc: string;
}

export interface TpsStepRow {
  id: string;
  step: string;
  title: string;
  desc: string;
}

export interface MinistryValueRow {
  id: string;
  num: string;
  name: string;
  desc: string;
}

export interface LeaderDivisionRow {
  id: string;
  name: string;
  scope: string;
  tone: 'purple' | 'amber' | 'emerald' | 'brand' | 'blue';
  desc: string;
}

export interface PerintisanProfilRow {
  id: string;
  label: string;
  tone: 'brand' | 'indigo' | 'emerald' | 'amber';
  desc: string;
}

export interface PerintisanMateriRow {
  id: string;
  code: string;
  title: string;
  desc: string;
}

export interface PerintisanMetodeRow {
  id: string;
  aspect: string;
  m1: string;
  m2: string;
}

export interface PerintisanTargetRow {
  id: string;
  act: string;
  freq: string;
  tone: 'brand' | 'indigo' | 'emerald' | 'amber';
  desc: string;
}

export interface PerintisanMilestoneRow {
  id: string;
  aspect: string;
  tone: 'brand' | 'indigo' | 'emerald' | 'amber';
  m1: string;
  m2: string;
}

export interface OverviewTaglineConfig {
  badge: string;
  quote: string;
  desc: string;
}

export interface OrgChartNodeItem {
  id: string;
  section: string;
  title: string;
  unit: string;
  badge: string;
  tone: 'blue' | 'purple' | 'amber' | 'lime' | 'brand' | 'sky' | 'slate' | 'emerald' | 'teal' | 'indigo';
  summary: string;
  duties: string[];
  baseSop?: string;
}

export interface PageAttachmentItem {
  id: string;
  name: string;
  kind: 'file' | 'link';
  url: string;
  meta: string;
}

export type AddDocTarget = 'value' | 'rules' | 'sop' | 'peran' | 'gms2';

export type CrudEntityType =
  | 'overviewTagline'
  | 'pillar'
  | 'orgNodeV2'
  | 'orgNodeV1'
  | 'regional'
  | 'churchCat'
  | 'pilarMap'
  | 'level'
  | 'rule'
  | 'sop'
  | 'jabatan'
  | 'gms2Pengantar'
  | 'gms2Servolution'
  | 'gms2Prinsip'
  | 'gms2Form'
  | 'ws1Video'
  | 'ws1Photo'
  | 'ws2Module'
  | 'sinodalDef'
  | 'tpsStep'
  | 'wipr'
  | 'bsValue'
  | 'crewChief'
  | 'ministryRole'
  | 'leaderDiv'
  | 'perintisanProfil'
  | 'perintisanMateri'
  | 'perintisanMetode'
  | 'perintisanTarget'
  | 'perintisanMilestone'
  | 'camMatrix'
  | 'fdSignal';

export interface CrudModalState {
  mode: 'create' | 'edit';
  entity: CrudEntityType;
  itemId?: string;
  initialValues: Record<string, string>;
}

export interface DeleteConfirmState {
  entity: CrudEntityType;
  itemId: string;
  label: string;
}

export type MultimediaDetailModalPayload =
  | { kind: 'pillar'; pillar: PillarItem }
  | { kind: 'rule'; rule: RuleItem }
  | { kind: 'sop'; sop: SopModuleItem }
  | { kind: 'orgNode'; node: OrgChartNodeItem; versionTag: string }
  | { kind: 'jabatan'; jabatan: Gms2JabatanItem }
  | { kind: 'level'; level: LevelingGradeItem }
  | { kind: 'wipr'; item: Gms2WiPrItem }
  | { kind: 'gms2Form'; item: Gms2WiPrItem }
  | { kind: 'ministryRole'; role: MinistryRoleItem };

// Preserved UI Kit exam position types (referenced by src/data/examPositions.ts & DataEntryUiKit.tsx)
export interface ExamGradeBand {
  id: string;
  grade: string;
  minScore: number;
  label: string;
  passed: boolean;
}

export interface ExamScaleOption {
  id: string;
  value: number;
  label: string;
}

export interface ExamAssessmentScale {
  id: string;
  name: string;
  options: ExamScaleOption[];
}

export interface ExamSegment {
  id: string;
  positionId: string;
  name: string;
}

export interface ExamPositionParameter {
  id: string;
  segmentId?: string;
  label: string;
  description: string;
  weightPct: number;
}

export interface ExamPositionTemplate {
  id: string;
  name: string;
  department: string;
  scaleId?: string;
  parameters: ExamPositionParameter[];
}

export interface ExamGradingRule {
  scaleMax: number;
  passingScore: number;
  gradeBands: ExamGradeBand[];
  assessmentScales?: ExamAssessmentScale[];
  positionTemplates?: ExamPositionTemplate[];
  segments?: ExamSegment[];
}
