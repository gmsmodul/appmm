import {
  ExamAssessmentScale,
  ExamGradingRule,
  ExamPositionTemplate,
  ExamScaleOption,
  ExamSegment,
} from '../types';

export function recalculateScaleOptionWeights(
  options: ExamScaleOption[]
): ExamScaleOption[] {
  const total = options.length;
  if (total === 0) return [];
  return options.map((opt, idx) => ({
    ...opt,
    value: Math.round(((idx + 1) / total) * 100),
  }));
}

export const DEFAULT_ASSESSMENT_SCALES: ExamAssessmentScale[] = [
  {
    id: 'scale-competency-100',
    name: 'Skala Kompetensi (4 Tingkat)',
    options: [
      { id: 'opt-4-1', value: 25, label: 'Kurang' },
      { id: 'opt-4-2', value: 50, label: 'Cukup' },
      { id: 'opt-4-3', value: 75, label: 'KKM / Baik' },
      { id: 'opt-4-4', value: 100, label: 'Unggul' },
    ],
  },
  {
    id: 'scale-likert-5',
    name: 'Rating 5 Tingkat (Needs Improvement – Excellent)',
    options: [
      { id: 'opt-5-1', value: 20, label: 'Needs improvement' },
      { id: 'opt-5-2', value: 40, label: 'Fair' },
      { id: 'opt-5-3', value: 60, label: 'Good' },
      { id: 'opt-5-4', value: 80, label: 'Very Good' },
      { id: 'opt-5-5', value: 100, label: 'Excellent' },
    ],
  },
];

export const DEFAULT_EXAM_SEGMENTS: ExamSegment[] = [
  { id: 'seg-fl-service', positionId: 'pos-frontliner', name: 'Service & Hospitality' },
  { id: 'seg-fl-ops', positionId: 'pos-frontliner', name: 'Operasional & Transaksi' },
  { id: 'seg-bar-craft', positionId: 'pos-barista', name: 'Teknik & Kalibrasi Minuman' },
  { id: 'seg-bar-std', positionId: 'pos-barista', name: 'Standar Resep & Kebersihan Bar' },
  { id: 'seg-kit-std', positionId: 'pos-kitchen', name: 'Food Safety & Standar Resep' },
  { id: 'seg-kit-exec', positionId: 'pos-kitchen', name: 'Eksekusi Masak & Stasiun' },
  { id: 'seg-srv-floor', positionId: 'pos-server', name: 'Sequence & Service Floor' },
  { id: 'seg-srv-coord', positionId: 'pos-server', name: 'Product Knowledge & Koordinasi' },
  { id: 'seg-sup-lead', positionId: 'pos-supervisor', name: 'Kepemimpinan & Shift Control' },
  { id: 'seg-sup-qc', positionId: 'pos-supervisor', name: 'Quality Control & Pembinaan' },
  { id: 'seg-trn-mod', positionId: 'pos-trainer', name: 'Penguasaan Materi & Penyampaian' },
  { id: 'seg-trn-eval', positionId: 'pos-trainer', name: 'Evaluasi & Kesiapan Sesi' },
];

export const EXAM_POSITIONS: ExamPositionTemplate[] = [
  {
    id: 'pos-frontliner',
    name: 'Frontliner / Cashier',
    department: 'Front of House',
    scaleId: 'scale-competency-100',
    parameters: [
      {
        id: 'fl-grooming',
        segmentId: 'seg-fl-service',
        label: 'Grooming & Hospitality Attitude',
        description: 'Kerapihan seragam, senyum, sapaan standar, dan kontak mata dengan tamu.',
        weightPct: 20,
      },
      {
        id: 'fl-pos',
        segmentId: 'seg-fl-ops',
        label: 'Penguasaan SOP Transaksi & POS',
        description: 'Ketepatan input pesanan, metode pembayaran, dan kesesuaian struk.',
        weightPct: 30,
      },
      {
        id: 'fl-upselling',
        segmentId: 'seg-fl-service',
        label: 'Komunikasi & Penawaran Produk',
        description: 'Kejelasan menjelaskan menu unggulan serta kemampuan rekomendasi paket.',
        weightPct: 25,
      },
      {
        id: 'fl-speed',
        segmentId: 'seg-fl-ops',
        label: 'Kecepatan & Ketelitian Layanan',
        description: 'Durasi pelayanan per antrean dan zero-error saat jam sibuk.',
        weightPct: 25,
      },
    ],
  },
  {
    id: 'pos-barista',
    name: 'Barista / Beverage Specialist',
    department: 'Beverage Bar',
    scaleId: 'scale-competency-100',
    parameters: [
      {
        id: 'bar-calibration',
        segmentId: 'seg-bar-craft',
        label: 'Kalibrasi Espresso & Teknik Ekstraksi',
        description: 'Ketepatan dosis, tamping, waktu ekstraksi, dan konsistensi rasa.',
        weightPct: 30,
      },
      {
        id: 'bar-milk',
        segmentId: 'seg-bar-craft',
        label: 'Steaming Susu & Kualitas Penyajian',
        description: 'Tekstur microfoam, suhu susu sesuai standar, dan tampilan minuman.',
        weightPct: 25,
      },
      {
        id: 'bar-recipe',
        segmentId: 'seg-bar-std',
        label: 'Pengetahuan Menu & Takaran Resep',
        description: 'Hafalan gramasi bahan, urutan peracikan, dan konsistensi standar resep.',
        weightPct: 25,
      },
      {
        id: 'bar-hygiene',
        segmentId: 'seg-bar-std',
        label: 'Kebersihan Bar & Efisiensi Kerja',
        description: 'Keteraturan stasiun kerja, sanitasi alat, dan kecepatan eksekusi pesanan.',
        weightPct: 20,
      },
    ],
  },
  {
    id: 'pos-kitchen',
    name: 'Kitchen / Culinary Crew',
    department: 'Back of House',
    scaleId: 'scale-competency-100',
    parameters: [
      {
        id: 'kit-safety',
        segmentId: 'seg-kit-std',
        label: 'Food Safety, Higiene & Sanitasi',
        description: 'Kepatuhan APD dapur, penyimpanan bahan FIFO, dan kebersihan area masak.',
        weightPct: 25,
      },
      {
        id: 'kit-recipe',
        segmentId: 'seg-kit-std',
        label: 'Kepatuhan Resep & Porsi Standar',
        description: 'Akurasi penimbangan bahan, tingkat kematangan, dan standar rasa.',
        weightPct: 30,
      },
      {
        id: 'kit-plating',
        segmentId: 'seg-kit-exec',
        label: 'Teknik Pengolahan & Plating',
        description: 'Penguasaan alat masak, konsistensi suhu saji, dan estetika penyajian.',
        weightPct: 25,
      },
      {
        id: 'kit-time',
        segmentId: 'seg-kit-exec',
        label: 'Manajemen Waktu & Alur Stasiun',
        description: 'Ketepatan ticket time serta koordinasi persiapan bahan (mise en place).',
        weightPct: 20,
      },
    ],
  },
  {
    id: 'pos-server',
    name: 'Server / Dining Room Crew',
    department: 'Service Floor',
    scaleId: 'scale-competency-100',
    parameters: [
      {
        id: 'srv-sequence',
        segmentId: 'seg-srv-floor',
        label: 'Sequence of Service & Etika Tamu',
        description: 'Penyambutan tamu, pengantaran pesanan akurat, dan kontrol meja aktif.',
        weightPct: 30,
      },
      {
        id: 'srv-product',
        segmentId: 'seg-srv-coord',
        label: 'Product Knowledge & Alergen',
        description: 'Pemahaman komposisi menu, rekomendasi pairing, dan info alergen tamu.',
        weightPct: 25,
      },
      {
        id: 'srv-clearup',
        segmentId: 'seg-srv-floor',
        label: 'Ketepatan Penyajian & Clear-Up',
        description: 'Teknik membawa nampan, penataan meja, dan kecepatan pembersihan meja.',
        weightPct: 25,
      },
      {
        id: 'srv-complaint',
        segmentId: 'seg-srv-coord',
        label: 'Koordinasi Tim & Penanganan Keluhan',
        description: 'Komunikasi dengan kitchen/bar dan ketenangan menghadapi kendala tamu.',
        weightPct: 20,
      },
    ],
  },
  {
    id: 'pos-supervisor',
    name: 'Shift Leader / Supervisor',
    department: 'Operations Leadership',
    scaleId: 'scale-competency-100',
    parameters: [
      {
        id: 'sup-briefing',
        segmentId: 'seg-sup-lead',
        label: 'Briefing Shift & Pembagian Tugas',
        description: 'Kejelasan target shift, penempatan personel, dan pengecekan kesiapan tim.',
        weightPct: 25,
      },
      {
        id: 'sup-qc',
        segmentId: 'seg-sup-qc',
        label: 'Kontrol Kualitas SOP & Layanan',
        description: 'Inspeksi kualitas produk, kebersihan outlet, dan kepatuhan standar operasional.',
        weightPct: 30,
      },
      {
        id: 'sup-problem',
        segmentId: 'seg-sup-lead',
        label: 'Problem Solving & Service Recovery',
        description: 'Kecepatan mengambil keputusan saat bottleneck atau komplain pelanggan.',
        weightPct: 25,
      },
      {
        id: 'sup-report',
        segmentId: 'seg-sup-qc',
        label: 'Laporan Shift & Pembinaan Crew',
        description: 'Akurasi serah terima shift, disiplin tim, dan catatan evaluasi harian.',
        weightPct: 20,
      },
    ],
  },
  {
    id: 'pos-trainer',
    name: 'Trainer / Mentor Akademi',
    department: 'Training & Development',
    scaleId: 'scale-competency-100',
    parameters: [
      {
        id: 'trn-mastery',
        segmentId: 'seg-trn-mod',
        label: 'Penguasaan Materi & Standar Modul',
        description: 'Ketepatan konsep, regulasi SOP terbaru, dan kedalaman materi uji.',
        weightPct: 30,
      },
      {
        id: 'trn-delivery',
        segmentId: 'seg-trn-mod',
        label: 'Teknik Penyampaian & Demonstrasi',
        description: 'Kejelasan instruksi praktik, intonasi, dan keterlibatan peserta didik.',
        weightPct: 25,
      },
      {
        id: 'trn-eval',
        segmentId: 'seg-trn-eval',
        label: 'Objektivitas Evaluasi & Umpan Balik',
        description: 'Ketepatan asesmen kompetensi serta penyampaian coaching yang konstruktif.',
        weightPct: 25,
      },
      {
        id: 'trn-prep',
        segmentId: 'seg-trn-eval',
        label: 'Kesiapan Alat Uji & Ketepatan Waktu',
        description: 'Kelengkapan perlengkapan praktik dan pengelolaan durasi sesi pelatihan.',
        weightPct: 20,
      },
    ],
  },
];

export interface ScoreOptionItem {
  value: number;
  tierLabel: string;
}

export function getExamScoreButtons(scaleMax: number, passingScore: number): ScoreOptionItem[] {
  const safeMax = Math.max(10, scaleMax || 100);
  if (safeMax === 100) {
    const values = [50, 60, 70, 75, 80, 85, 90, 95, 100];
    return values.map((val) => ({
      value: val,
      tierLabel:
        val < passingScore
          ? 'Kurang'
          : val === passingScore
            ? 'KKM'
            : val >= 95
              ? 'Unggul'
              : val >= 85
                ? 'Sangat Baik'
                : 'Baik',
    }));
  }

  const ratios = [0.5, 0.6, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95, 1];
  const seen = new Set<number>();
  return ratios
    .map((r) => Math.round(safeMax * r))
    .filter((v) => {
      if (seen.has(v)) return false;
      seen.add(v);
      return true;
    })
    .map((val) => ({
      value: val,
      tierLabel:
        val < passingScore
          ? 'Kurang'
          : val === passingScore
            ? 'KKM'
            : val >= safeMax * 0.95
              ? 'Unggul'
              : 'Lulus',
    }));
}

export function cloneDefaultAssessmentScales(): ExamAssessmentScale[] {
  return DEFAULT_ASSESSMENT_SCALES.map((s) => ({
    ...s,
    options: s.options.map((o) => ({ ...o })),
  }));
}

export function cloneDefaultExamPositions(): ExamPositionTemplate[] {
  return EXAM_POSITIONS.map((p) => ({
    ...p,
    parameters: p.parameters.map((param) => ({ ...param })),
  }));
}

export function cloneDefaultExamSegments(): ExamSegment[] {
  return DEFAULT_EXAM_SEGMENTS.map((seg) => ({ ...seg }));
}

export interface ResolvedExamAssessmentConfig {
  scales: ExamAssessmentScale[];
  positions: ExamPositionTemplate[];
  segments: ExamSegment[];
}

export function resolveExamAssessmentConfig(
  rule?: Partial<ExamGradingRule> | null
): ResolvedExamAssessmentConfig {
  const scales =
    Array.isArray(rule?.assessmentScales) && rule.assessmentScales.length > 0
      ? rule.assessmentScales.map((s) => ({
          ...s,
          options: Array.isArray(s.options)
            ? recalculateScaleOptionWeights(
                [...s.options]
                  .map((o) => ({ ...o }))
                  .sort((a, b) => a.value - b.value)
              )
            : [],
        }))
      : cloneDefaultAssessmentScales();

  const positions =
    Array.isArray(rule?.positionTemplates) && rule.positionTemplates.length > 0
      ? rule.positionTemplates.map((p) => ({
          ...p,
          parameters: Array.isArray(p.parameters)
            ? p.parameters.map((param) => ({ ...param }))
            : [],
        }))
      : cloneDefaultExamPositions();

  const segments =
    Array.isArray(rule?.segments)
      ? rule.segments.map((seg) => ({ ...seg }))
      : cloneDefaultExamSegments();

  return { scales, positions, segments };
}

export function getScaleForPosition(
  config: ResolvedExamAssessmentConfig,
  position: ExamPositionTemplate | null | undefined,
  fallbackRule?: Partial<ExamGradingRule>
): ExamAssessmentScale {
  if (position?.scaleId) {
    const matched = config.scales.find((s) => s.id === position.scaleId);
    if (matched && matched.options.length > 0) return matched;
  }
  const firstValid = config.scales.find((s) => s.options.length > 0);
  if (firstValid) return firstValid;

  const fallbackBtns = getExamScoreButtons(
    fallbackRule?.scaleMax || 100,
    fallbackRule?.passingScore ?? 75
  );
  return {
    id: 'scale-fallback',
    name: 'Skala Kompetensi',
    options: fallbackBtns.map((btn, idx) => ({
      id: `fb-${idx}`,
      value: btn.value,
      label: btn.tierLabel,
    })),
  };
}

export function normalizeScaleValueToExamMax(
  chosenValue: number,
  scale: ExamAssessmentScale,
  examScaleMax: number
): number {
  const safeExamMax = Math.max(10, examScaleMax || 100);
  const maxOptionVal = Math.max(...scale.options.map((o) => Number(o.value) || 0), 1);
  if (maxOptionVal === safeExamMax) return chosenValue;
  return (chosenValue / maxOptionVal) * safeExamMax;
}

export interface ScaleOptionColorClasses {
  unselected: string;
  selected: string;
  subLabelUnselected: string;
}

const ANALOGOUS_RED_TO_GREEN_PALETTE: ScaleOptionColorClasses[] = [
  {
    unselected:
      'bg-[#FEE2E2] border-[#F87171]/60 text-[#991B1B] hover:bg-[#FECACA] hover:border-[#EF4444]',
    selected:
      'bg-[#DC2626] border-[#DC2626] text-white shadow-sm ring-2 ring-[#DC2626]/25',
    subLabelUnselected: 'text-[#B91C1C]/85',
  },
  {
    unselected:
      'bg-[#FFE7DC] border-[#FB8C65]/60 text-[#9A2D19] hover:bg-[#FFD6C4] hover:border-[#F97316]',
    selected:
      'bg-[#E04322] border-[#E04322] text-white shadow-sm ring-2 ring-[#E04322]/25',
    subLabelUnselected: 'text-[#B83B22]/85',
  },
  {
    unselected:
      'bg-[#FFEDD5] border-[#FB923C]/65 text-[#9A3412] hover:bg-[#FED7AA] hover:border-[#EA580C]',
    selected:
      'bg-[#EA580C] border-[#EA580C] text-white shadow-sm ring-2 ring-[#EA580C]/25',
    subLabelUnselected: 'text-[#C2410C]/85',
  },
  {
    unselected:
      'bg-[#FEF0D4] border-[#FBBF24]/70 text-[#92400E] hover:bg-[#FDE2AD] hover:border-[#D97706]',
    selected:
      'bg-[#D97706] border-[#D97706] text-white shadow-sm ring-2 ring-[#D97706]/25',
    subLabelUnselected: 'text-[#B45309]/85',
  },
  {
    unselected:
      'bg-[#FEF9C3] border-[#EAB308]/65 text-[#854D0E] hover:bg-[#FEF08A] hover:border-[#CA8A04]',
    selected:
      'bg-[#B45309] border-[#B45309] text-white shadow-sm ring-2 ring-[#B45309]/25',
    subLabelUnselected: 'text-[#A16207]/85',
  },
  {
    unselected:
      'bg-[#F2F9C9] border-[#A3E635]/75 text-[#4D6E0A] hover:bg-[#E7F4A9] hover:border-[#84CC16]',
    selected:
      'bg-[#65A30D] border-[#65A30D] text-white shadow-sm ring-2 ring-[#65A30D]/25',
    subLabelUnselected: 'text-[#5C8011]/85',
  },
  {
    unselected:
      'bg-[#ECFCCB] border-[#84CC16]/65 text-[#3F6212] hover:bg-[#D9F99D] hover:border-[#65A30D]',
    selected:
      'bg-[#4D7C0F] border-[#4D7C0F] text-white shadow-sm ring-2 ring-[#4D7C0F]/25',
    subLabelUnselected: 'text-[#4D7C0F]/85',
  },
  {
    unselected:
      'bg-[#E2FCE4] border-[#4ADE80]/65 text-[#166534] hover:bg-[#C6F6CD] hover:border-[#22C55E]',
    selected:
      'bg-[#16A34A] border-[#16A34A] text-white shadow-sm ring-2 ring-[#16A34A]/25',
    subLabelUnselected: 'text-[#15803D]/85',
  },
  {
    unselected:
      'bg-[#DCFCE7] border-[#22C55E]/65 text-[#14532D] hover:bg-[#BBF7D0] hover:border-[#16A34A]',
    selected:
      'bg-[#15803D] border-[#15803D] text-white shadow-sm ring-2 ring-[#15803D]/25',
    subLabelUnselected: 'text-[#166534]/85',
  },
];

export function getScaleOptionAnalogousColors(
  value: number,
  sortedOptions: { value: number }[],
  index: number
): ScaleOptionColorClasses {
  const total = sortedOptions.length;
  if (total <= 1) {
    return ANALOGOUS_RED_TO_GREEN_PALETTE[ANALOGOUS_RED_TO_GREEN_PALETTE.length - 1];
  }
  const minVal = Number(sortedOptions[0]?.value) || 0;
  const maxVal = Number(sortedOptions[total - 1]?.value) || 0;
  const ratio =
    maxVal > minVal
      ? Math.max(0, Math.min(1, (value - minVal) / (maxVal - minVal)))
      : Math.max(0, Math.min(1, index / (total - 1)));
  const paletteIdx = Math.round(ratio * (ANALOGOUS_RED_TO_GREEN_PALETTE.length - 1));
  return ANALOGOUS_RED_TO_GREEN_PALETTE[paletteIdx];
}


