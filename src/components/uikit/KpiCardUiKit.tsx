import React, { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  Users,
  BookOpen,
  CheckCircle2,
  Clock,
  Target,
  BarChart3,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UiDocPage, UiDocSection } from './UiDocBlock';
import { PASTEL_THEMES } from '../../constants/theme';
import { playUiMotionSound } from '../../utils/uiMotionSound';

type TimeframeKey = '7d' | '30d' | '90d';

interface KpiMetricItem {
  id: string;
  label: string;
  value: string;
  delta: string;
  trend: 'up' | 'down';
  comparison: string;
  contextNote: string;
  icon: React.FC<{ className?: string }>;
}

const KPI_DATA_BY_PERIOD: Record<TimeframeKey, KpiMetricItem[]> = {
  '7d': [
    {
      id: 'active-students',
      label: 'Siswa Aktif',
      value: '1.284',
      delta: '+4.8%',
      trend: 'up',
      comparison: 'vs 7 hari lalu',
      contextNote: '94.2% partisipasi kelas',
      icon: Users,
    },
    {
      id: 'completion',
      label: 'Ketuntasan Modul',
      value: '87.6%',
      delta: '+2.3%',
      trend: 'up',
      comparison: 'vs 7 hari lalu',
      contextNote: '312 modul diselesaikan',
      icon: CheckCircle2,
    },
    {
      id: 'avg-study',
      label: 'Durasi Belajar',
      value: '42m',
      delta: '-3.1%',
      trend: 'down',
      comparison: 'vs 7 hari lalu',
      contextNote: 'Rata-rata per sesi',
      icon: Clock,
    },
    {
      id: 'avg-score',
      label: 'Rata-rata Nilai',
      value: '84.5',
      delta: '+1.9%',
      trend: 'up',
      comparison: 'vs 7 hari lalu',
      contextNote: 'Dari 18 evaluasi aktif',
      icon: BookOpen,
    },
  ],
  '30d': [
    {
      id: 'active-students',
      label: 'Siswa Aktif',
      value: '1.412',
      delta: '+11.4%',
      trend: 'up',
      comparison: 'vs bulan lalu',
      contextNote: '96.1% partisipasi kelas',
      icon: Users,
    },
    {
      id: 'completion',
      label: 'Ketuntasan Modul',
      value: '91.2%',
      delta: '+6.7%',
      trend: 'up',
      comparison: 'vs bulan lalu',
      contextNote: '1.240 modul diselesaikan',
      icon: CheckCircle2,
    },
    {
      id: 'avg-study',
      label: 'Durasi Belajar',
      value: '48m',
      delta: '+5.4%',
      trend: 'up',
      comparison: 'vs bulan lalu',
      contextNote: 'Rata-rata per sesi',
      icon: Clock,
    },
    {
      id: 'avg-score',
      label: 'Rata-rata Nilai',
      value: '86.2',
      delta: '+3.2%',
      trend: 'up',
      comparison: 'vs bulan lalu',
      contextNote: 'Dari 64 evaluasi aktif',
      icon: BookOpen,
    },
  ],
  '90d': [
    {
      id: 'active-students',
      label: 'Siswa Aktif',
      value: '1.520',
      delta: '+18.2%',
      trend: 'up',
      comparison: 'vs kuartal lalu',
      contextNote: '97.4% retensi semester',
      icon: Users,
    },
    {
      id: 'completion',
      label: 'Ketuntasan Modul',
      value: '93.8%',
      delta: '+9.5%',
      trend: 'up',
      comparison: 'vs kuartal lalu',
      contextNote: '3.890 modul diselesaikan',
      icon: CheckCircle2,
    },
    {
      id: 'avg-study',
      label: 'Durasi Belajar',
      value: '46m',
      delta: '-1.2%',
      trend: 'down',
      comparison: 'vs kuartal lalu',
      contextNote: 'Efisiensi materi meningkat',
      icon: Clock,
    },
    {
      id: 'avg-score',
      label: 'Rata-rata Nilai',
      value: '88.1',
      delta: '+4.6%',
      trend: 'up',
      comparison: 'vs kuartal lalu',
      contextNote: 'Dari 190 evaluasi aktif',
      icon: BookOpen,
    },
  ],
};

interface SparklineCardData {
  id: string;
  label: string;
  value: string;
  delta: string;
  trend: 'up' | 'down';
  stroke: string;
  points: { day: string; val: number }[];
}

const SPARKLINE_CARDS: SparklineCardData[] = [
  {
    id: 'sp-attendance',
    label: 'Kehadiran Harian',
    value: '95.4%',
    delta: '+3.2%',
    trend: 'up',
    stroke: '#ee2e65',
    points: [
      { day: 'Sen', val: 89 },
      { day: 'Sel', val: 92 },
      { day: 'Rab', val: 91 },
      { day: 'Kam', val: 94 },
      { day: 'Jum', val: 96 },
      { day: 'Sab', val: 95 },
    ],
  },
  {
    id: 'sp-submission',
    label: 'Pengumpulan Tugas',
    value: '428',
    delta: '+14.8%',
    trend: 'up',
    stroke: '#10b981',
    points: [
      { day: 'Sen', val: 52 },
      { day: 'Sel', val: 64 },
      { day: 'Rab', val: 60 },
      { day: 'Kam', val: 78 },
      { day: 'Jum', val: 84 },
      { day: 'Sab', val: 90 },
    ],
  },
  {
    id: 'sp-latency',
    label: 'Waktu Koreksi Rata-rata',
    value: '1.8 jam',
    delta: '-22.0%',
    trend: 'down',
    stroke: '#6366f1',
    points: [
      { day: 'Sen', val: 3.1 },
      { day: 'Sel', val: 2.8 },
      { day: 'Rab', val: 2.4 },
      { day: 'Kam', val: 2.1 },
      { day: 'Jum', val: 1.9 },
      { day: 'Sab', val: 1.8 },
    ],
  },
];

function buildSvgPolyline(points: { val: number }[], width = 140, height = 42): string {
  const vals = points.map((p) => p.val);
  const min = Math.min(...vals);
  const max = Math.max(...vals);
  const span = max - min || 1;
  return points
    .map((p, idx) => {
      const x = (idx / Math.max(1, points.length - 1)) * width;
      const y = height - ((p.val - min) / span) * (height - 8) - 4;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');
}

export const KpiCardUiKit: React.FC = () => {
  const { triggerToast } = useApp();
  const [period, setPeriod] = useState<TimeframeKey>('30d');
  const [hoveredPoint, setHoveredPoint] = useState<Record<string, number | null>>({});

  const activeMetrics = KPI_DATA_BY_PERIOD[period];

  return (
    <UiDocPage
      title="KPI Card"
      description="Kartu metrik kinerja utama (Key Performance Indicator) dengan angka tabular-nums, indikator arah tren disertai ikon eksplisit, sparkline SVG, dan bilah target pencapaian."
      subLinks={[
        { id: 'kpi-standard', label: 'Metric Grid & Timeframe' },
        { id: 'kpi-sparkline', label: 'Sparkline Trend Card' },
        { id: 'kpi-target', label: 'Target & Progress Card' },
        { id: 'kpi-compact', label: 'Compact Split & Pastel KPI' },
      ]}
    >
      {/* 1. Standard KPI Grid with Timeframe Filter */}
      <UiDocSection
        id="kpi-standard"
        title="KPI Metric Grid & Timeframe Switcher"
        description="Grid KPI responsif 4-kolom dengan angka tabular-nums (.kpi-value), ikon tren + label perbandingan agar tidak bergantung pada warna saja."
        classesHint="rounded-2xl border border-black/[0.12] dark:border-white/[0.10] bg-white dark:bg-[#181B21] p-4"
        codeSnippet={`<div className="rounded-2xl border border-black/[0.12] bg-white p-4 space-y-2">\n  <div className="flex items-center justify-between text-xs text-gray-500">\n    <span>Siswa Aktif</span>\n    <Users className="w-4 h-4" />\n  </div>\n  <div className="kpi-value font-bold text-gray-900">1.412</div>\n  <div className="flex items-center gap-1.5 text-xs">\n    <span className="inline-flex items-center gap-1 font-semibold text-emerald-700">\n      <TrendingUp className="w-3.5 h-3.5" /> +11.4%\n    </span>\n    <span className="text-gray-500">vs bulan lalu</span>\n  </div>\n</div>`}
        actions={
          <div className="inline-flex rounded-lg bg-gray-100 dark:bg-[#1B1E24] p-0.5 border border-black/[0.08] dark:border-white/[0.08] text-[11px]">
            {(
              [
                { id: '7d', label: '7 Hari' },
                { id: '30d', label: '30 Hari' },
                { id: '90d', label: 'Kuartal' },
              ] as const
            ).map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  playUiMotionSound('tick');
                  setPeriod(item.id);
                }}
                className={`px-2.5 py-1 rounded-md font-semibold transition-colors cursor-pointer ${
                  period === item.id
                    ? 'bg-white dark:bg-[#252A34] text-gray-900 dark:text-[#F3F4F6] shadow-2xs'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        }
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3.5">
          {activeMetrics.map((metric) => {
            const Icon = metric.icon;
            const isUp = metric.trend === 'up';
            return (
              <button
                key={metric.id}
                type="button"
                onClick={() =>
                  triggerToast(
                    metric.label,
                    `${metric.value} (${metric.delta} ${metric.comparison})`,
                    'info'
                  )
                }
                className="kpi-container group text-left rounded-2xl border border-black/[0.12] dark:border-white/[0.10] bg-white dark:bg-[#181B21] p-4 hover:border-[#ee2e65]/40 dark:hover:border-[#ee2e65]/50 hover:shadow-[0_10px_28px_-14px_rgba(15,23,42,0.16)] transition-all duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] cursor-pointer overflow-hidden"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-medium text-[#5A5D67] dark:text-gray-400 truncate">
                    {metric.label}
                  </span>
                  <span className="w-7 h-7 rounded-lg bg-gray-100 dark:bg-[#1F242D] text-gray-700 dark:text-gray-300 flex items-center justify-center shrink-0 group-hover:bg-[#FEF1F5] group-hover:text-[#ee2e65] dark:group-hover:bg-[#ee2e65]/15 dark:group-hover:text-[#f895b5] transition-colors">
                    <Icon className="w-3.5 h-3.5" />
                  </span>
                </div>

                <div className="mt-2.5 kpi-value font-bold text-[#1C1D21] dark:text-[#F3F4F6] tracking-tight">
                  {metric.value}
                </div>

                <div className="mt-2.5 flex items-center flex-wrap gap-x-2 gap-y-0.5 text-[11px] tabular-nums">
                  <span
                    className={`inline-flex items-center gap-1 font-semibold ${
                      isUp
                        ? 'text-emerald-700 dark:text-emerald-400'
                        : 'text-rose-700 dark:text-rose-400'
                    }`}
                  >
                    {isUp ? (
                      <TrendingUp className="w-3.5 h-3.5 shrink-0" />
                    ) : (
                      <TrendingDown className="w-3.5 h-3.5 shrink-0" />
                    )}
                    <span>{metric.delta}</span>
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">{metric.comparison}</span>
                </div>

                <div className="mt-3 pt-2.5 border-t border-black/[0.07] dark:border-white/[0.07] flex items-center justify-between text-[11px] text-gray-500 dark:text-gray-400">
                  <span className="truncate">{metric.contextNote}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-[#ee2e65]" />
                </div>
              </button>
            );
          })}
        </div>
      </UiDocSection>

      {/* 2. KPI Sparkline Cards */}
      <UiDocSection
        id="kpi-sparkline"
        title="Sparkline Trend KPI Card"
        description="Arahkan kursor atau klik titik hari pada grafik mini SVG untuk membaca nilai harian tanpa meninggalkan kartu KPI."
        classesHint="rounded-2xl border / svg polyline / tabular-nums"
        codeSnippet={`<svg viewBox="0 0 140 42" className="w-full h-11 overflow-visible">\n  <polyline fill="none" stroke="#ee2e65" strokeWidth="2.2" points={pointsStr} />\n</svg>`}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {SPARKLINE_CARDS.map((card) => {
            const activeIdx = hoveredPoint[card.id] ?? null;
            const activeSample =
              activeIdx !== null ? card.points[activeIdx] : card.points[card.points.length - 1];
            const polyPoints = buildSvgPolyline(card.points, 140, 42);
            const vals = card.points.map((p) => p.val);
            const min = Math.min(...vals);
            const max = Math.max(...vals);
            const span = max - min || 1;
            const isUp = card.trend === 'up';

            return (
              <div
                key={card.id}
                className="kpi-container rounded-2xl border border-black/[0.12] dark:border-white/[0.10] bg-white dark:bg-[#181B21] p-4 flex flex-col justify-between gap-3 overflow-hidden"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="text-xs font-medium text-gray-500 dark:text-gray-400">
                      {card.label}
                    </div>
                    <div className="mt-1 kpi-value font-bold text-[#1C1D21] dark:text-[#F3F4F6]">
                      {card.value}
                    </div>
                  </div>
                  <span
                    className={`inline-flex items-center gap-1 text-[11px] font-semibold tabular-nums shrink-0 ${
                      card.id === 'sp-latency' || isUp
                        ? 'text-emerald-700 dark:text-emerald-400'
                        : 'text-rose-700 dark:text-rose-400'
                    }`}
                  >
                    {isUp ? (
                      <TrendingUp className="w-3.5 h-3.5" />
                    ) : (
                      <TrendingDown className="w-3.5 h-3.5" />
                    )}
                    {card.delta}
                  </span>
                </div>

                <div className="flex items-end justify-between gap-3">
                  <svg
                    viewBox="0 0 140 42"
                    className="w-36 h-11 overflow-visible shrink-0"
                    role="img"
                    aria-label={`Tren ${card.label}`}
                  >
                    <polyline
                      fill="none"
                      stroke={card.stroke}
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      points={polyPoints}
                    />
                    {card.points.map((pt, idx) => {
                      const cx = (idx / Math.max(1, card.points.length - 1)) * 140;
                      const cy = 42 - ((pt.val - min) / span) * 34 - 4;
                      const isHighlighted =
                        activeIdx === idx ||
                        (activeIdx === null && idx === card.points.length - 1);
                      return (
                        <g key={pt.day}>
                          <circle
                            cx={cx}
                            cy={cy}
                            r={isHighlighted ? 4 : 2.5}
                            fill={isHighlighted ? card.stroke : 'transparent'}
                            stroke={isHighlighted ? '#ffffff' : 'transparent'}
                            strokeWidth="1.5"
                          />
                          <circle
                            cx={cx}
                            cy={cy}
                            r={9}
                            fill="transparent"
                            className="cursor-pointer"
                            onMouseEnter={() =>
                              setHoveredPoint((prev) => ({ ...prev, [card.id]: idx }))
                            }
                            onMouseLeave={() =>
                              setHoveredPoint((prev) => ({ ...prev, [card.id]: null }))
                            }
                            onClick={() =>
                              setHoveredPoint((prev) => ({ ...prev, [card.id]: idx }))
                            }
                          />
                        </g>
                      );
                    })}
                  </svg>

                  <div className="text-right text-[11px] tabular-nums min-w-0">
                    <div className="font-semibold text-gray-800 dark:text-gray-200">
                      {activeSample.day}: {activeSample.val}
                    </div>
                    <div className="text-gray-500 dark:text-gray-400">6 hari terakhir</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </UiDocSection>

      {/* 3. Target Progress KPI Card */}
      <UiDocSection
        id="kpi-target"
        title="KPI Target & Progress Card"
        description="Menggabungkan angka realisasi, target kuartal, dan bilah progres agar tim segera mengetahui selisih pencapaian."
        classesHint="rounded-2xl border / h-2 rounded-full bg-gray-100"
        codeSnippet={`<div className="rounded-2xl border border-black/[0.12] bg-white p-4 space-y-3">\n  <div className="flex justify-between text-xs">\n    <span>Target Kelulusan Batch</span>\n    <span className="font-semibold tabular-nums">Target 90%</span>\n  </div>\n  <div className="kpi-value font-bold">84.2%</div>\n  <div className="h-2 rounded-full bg-gray-100 overflow-hidden">\n    <div className="h-full rounded-full bg-[#ee2e65] w-[84.2%]" />\n  </div>\n</div>`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
          {[
            {
              title: 'Target Kelulusan Batch XI',
              current: 84.2,
              target: 90,
              unit: '%',
              barClass: 'bg-[#ee2e65]',
              remaining: '5.8% lagi menuju target',
              updated: 'Diperbarui 10 menit lalu',
            },
            {
              title: 'Evaluasi Portofolio Terselesaikan',
              current: 92,
              target: 100,
              unit: '%',
              barClass: 'bg-emerald-600 dark:bg-emerald-500',
              remaining: '12 berkas tersisa untuk diperiksa',
              updated: 'Deadline Jumat, 17:00',
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-black/[0.12] dark:border-white/[0.10] bg-white dark:bg-[#181B21] p-4 space-y-3"
            >
              <div className="flex items-center justify-between gap-2 text-xs">
                <span className="font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5 text-[#ee2e65]" />
                  {item.title}
                </span>
                <span className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 tabular-nums">
                  Target {item.target}
                  {item.unit}
                </span>
              </div>

              <div className="flex items-baseline justify-between gap-2">
                <div className="kpi-value font-bold text-[#1C1D21] dark:text-[#F3F4F6]">
                  {item.current}
                  {item.unit}
                </div>
                <span className="text-[11px] font-medium text-gray-500 dark:text-gray-400 tabular-nums">
                  {item.remaining}
                </span>
              </div>

              <div className="w-full h-2 rounded-full bg-gray-100 dark:bg-[#232730] overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${item.barClass}`}
                  style={{ width: `${Math.min(100, item.current)}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-gray-500 dark:text-gray-400">
                <span>{item.updated}</span>
                <button
                  type="button"
                  onClick={() =>
                    triggerToast(item.title, `Progres saat ini ${item.current}${item.unit}.`, 'info')
                  }
                  className="font-semibold text-[#ee2e65] hover:underline cursor-pointer"
                >
                  Lihat Detail
                </button>
              </div>
            </div>
          ))}
        </div>
      </UiDocSection>

      {/* 4. Compact Split & Pastel Comparison */}
      <UiDocSection
        id="kpi-compact"
        title="Compact Split & Pastel Comparison KPI"
        description="Varian strip perbandingan padat untuk ringkasan dashboard atau panel samping dengan dukungan Light & Dark surface."
        classesHint="grid grid-cols-1 sm:grid-cols-3 divide-x / PASTEL_THEMES"
        codeSnippet={`<div className="rounded-2xl border border-black/[0.12] dark:border-white/[0.10] grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x">\n  <div className="p-4">...</div>\n</div>`}
      >
        <div className="max-w-2xl space-y-3">
          <div className="rounded-2xl border border-black/[0.12] dark:border-white/[0.10] overflow-hidden grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-black/[0.10] dark:divide-white/[0.08]">
            <div className={`p-4 ${PASTEL_THEMES.periwinkle.bg} dark:bg-[#1B1E24]`}>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-[#9D113C] dark:text-[#f895b5]">
                Sesi Live Quiz
              </div>
              <div className="mt-1 kpi-value font-bold text-[#1C1D21] dark:text-[#F3F4F6]">
                38
              </div>
              <div className="mt-1 flex items-center gap-1 text-[11px] font-medium text-emerald-700 dark:text-emerald-400 tabular-nums">
                <TrendingUp className="w-3 h-3" />
                <span>+6 sesi minggu ini</span>
              </div>
            </div>
            <div className={`p-4 ${PASTEL_THEMES.mint.bg} dark:bg-[#181C22]`}>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-[#146C43] dark:text-emerald-400">
                Presensi QR Valid
              </div>
              <div className="mt-1 kpi-value font-bold text-[#1C1D21] dark:text-[#F3F4F6]">
                98.7%
              </div>
              <div className="mt-1 flex items-center gap-1 text-[11px] font-medium text-[#5A5D67] dark:text-gray-400 tabular-nums">
                <BarChart3 className="w-3 h-3" />
                <span>1.184 / 1.200 scan</span>
              </div>
            </div>
            <div className={`p-4 ${PASTEL_THEMES.peach.bg} dark:bg-[#1B1E24]`}>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-[#8C5811] dark:text-amber-300">
                Umpan Balik Siswa
              </div>
              <div className="mt-1 kpi-value font-bold text-[#1C1D21] dark:text-[#F3F4F6]">
                4.9 / 5
              </div>
              <div className="mt-1 flex items-center gap-1 text-[11px] font-medium text-[#5A5D67] dark:text-gray-400 tabular-nums">
                <TrendingUp className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                <span>+0.2 dari semester lalu</span>
              </div>
            </div>
          </div>
        </div>
      </UiDocSection>
    </UiDocPage>
  );
};
