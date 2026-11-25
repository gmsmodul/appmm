import React, { useMemo, useState } from 'react';
import {
  Check,
  Clock,
  Flag,
  GitCommit,
  MessageSquare,
  Plus,
  Rocket,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { UiDocPage, UiDocSection } from './UiDocBlock';
import { ACTION_BTN_PRIMARY } from '../../constants/buttonStyles';
import { playUiMotionSound } from '../../utils/uiMotionSound';

type TimelineCategory = 'all' | 'commit' | 'review' | 'release';

interface TimelineEntry {
  id: string;
  category: Exclude<TimelineCategory, 'all'>;
  title: string;
  actor: string;
  timestamp: string;
  detail: string;
  statusLabel: string;
}

const INITIAL_TIMELINE_EVENTS: TimelineEntry[] = [
  {
    id: 'tm-1',
    category: 'release',
    title: 'Rilis v2.4 Design System UI KIT',
    actor: 'Nadia Putri',
    timestamp: 'Hari ini · 14:20',
    detail: 'Menambahkan komponen Kanban Board, Gantt Chart, dan Timeline beserta standar kontras abu-abu.',
    statusLabel: 'Published',
  },
  {
    id: 'tm-2',
    category: 'review',
    title: 'Persetujuan Audit Kontras & Aksesibilitas',
    actor: 'Sinta Dewi',
    timestamp: 'Hari ini · 11:05',
    detail: 'Semua teks bantu, border kartu, dan garis grid grafik lolos rasio kontras permukaan terang.',
    statusLabel: 'Approved',
  },
  {
    id: 'tm-3',
    category: 'commit',
    title: 'Pembaruan Kurva Easing & Spring Motion',
    actor: 'Dimas Arya',
    timestamp: 'Kemarin · 16:45',
    detail: 'Penyelarasan transisi dropdown 180ms dan scale(0.95) tanpa pergeseran tata letak tombol.',
    statusLabel: 'Merged',
  },
  {
    id: 'tm-4',
    category: 'commit',
    title: 'Kalibrasi Custom Pill Scrollbar Matrix',
    actor: 'Raka Pratama',
    timestamp: '15 Nov · 09:30',
    detail: 'Menerapkan rail scrollbar kapsul seragam pada tabel matriks dan daftar panjang.',
    statusLabel: 'Verified',
  },
];

const HORIZONTAL_MILESTONES = [
  {
    id: 'q1',
    stage: 'Tahap 1',
    title: 'Audit Token & Struktur',
    date: '04 Nov 2026',
    status: 'completed' as const,
    summary: 'Penetapan skala spasi, tipografi tabular-nums, dan palet kontras permukaan terang.',
    deliverables: ['Color Palette Contrast Matrix', 'Typography Scale Spec', 'Border & Hairline Rules'],
  },
  {
    id: 'q2',
    stage: 'Tahap 2',
    title: 'Motion & Micro-Interactions',
    date: '11 Nov 2026',
    status: 'completed' as const,
    summary: 'Integrasi kurva ease-out 200ms, spring drawer, dan umpan balik sentuh non-blocking.',
    deliverables: ['180ms Popover Curve', 'Custom Scrollbar Track', 'Swipeable Bottom Sheet'],
  },
  {
    id: 'q3',
    stage: 'Tahap 3',
    title: 'Board, Gantt & Timeline',
    date: '17 Nov 2026',
    status: 'active' as const,
    summary: 'Pembangunan modul visualisasi kerja: Kanban Board, Gantt Chart interaktif, dan Timeline kronologis.',
    deliverables: ['Kanban WIP & Swimlanes', '14-Day Gantt Schedule', 'Audit & Milestone Timeline'],
  },
  {
    id: 'q4',
    stage: 'Tahap 4',
    title: 'Dokumentasi & Rilis Final',
    date: '24 Nov 2026',
    status: 'upcoming' as const,
    summary: 'Finalisasi cuplikan kode React siap pakai, uji regresi lintas viewport, dan ekspor PDF.',
    deliverables: ['Full Component Catalog', 'Responsive Print Sheet', 'Release Notes v2.5'],
  },
];

const ROADMAP_ALTERNATING = [
  {
    period: 'Minggu 1 · Fondasi',
    title: 'Standardisasi Komponen Inti & Utilitas',
    description: 'Penyatuan sistem grid, border kontras tinggi, tombol pill utama, dan input formulir tervalidasi.',
    owner: 'Tim Core UI',
    state: 'Selesai',
  },
  {
    period: 'Minggu 2 · Interaksi',
    title: 'Sistem Navigasi & Animasi Terukur',
    description: 'Implementasi drawer terarah, bottom dock mobile, dan transisi halaman berorientasi sumbu.',
    owner: 'Tim Motion',
    state: 'Selesai',
  },
  {
    period: 'Minggu 3 · Visualisasi',
    title: 'Kanban Board, Gantt Chart & Timeline',
    description: 'Menyediakan pola manajemen tugas, penjadwalan proyek, dan riwayat aktivitas kronologis.',
    owner: 'Tim Data Display',
    state: 'Aktif Sekarang',
  },
  {
    period: 'Minggu 4 · QA & Publikasi',
    title: 'Audit Aksesibilitas & Serah Terima',
    description: 'Verifikasi keyboard navigation, kontras WCAG AA, dan kelengkapan kode contoh di tiap modul.',
    owner: 'Tim QA Design',
    state: 'Terjadwal',
  },
];

const VERTICAL_TIMELINE_SNIPPET = `<ol className="relative border-l border-gray-300 ml-3 space-y-5">
  {events.map((ev) => (
    <li key={ev.id} className="pl-6 relative">
      <span className="absolute -left-[13px] top-0.5 w-6 h-6 rounded-full bg-white border border-gray-300 flex items-center justify-center">
        <GitCommit className="w-3.5 h-3.5 text-[#ee2e65]" />
      </span>
      <div className="text-xs font-semibold text-gray-900">{ev.title}</div>
      <p className="text-xs text-gray-600 mt-1">{ev.detail}</p>
    </li>
  ))}
</ol>`;

const HORIZONTAL_TIMELINE_SNIPPET = `<div className="grid grid-cols-1 md:grid-cols-4 gap-3">
  {steps.map((step, i) => (
    <button key={step.id} onClick={() => setActiveIdx(i)} className="text-left p-3.5 rounded-xl border border-gray-300 bg-white">
      <div className="text-[11px] font-semibold text-[#9D113C]">{step.stage}</div>
      <div className="text-xs font-semibold text-gray-900 mt-0.5">{step.title}</div>
    </button>
  ))}
</div>`;

const ALTERNATING_TIMELINE_SNIPPET = `<div className="space-y-6">
  {items.map((item, idx) => (
    <div key={item.period} className="grid grid-cols-1 md:grid-cols-[1fr_32px_1fr] gap-3 items-start">
      <div className={idx % 2 === 0 ? 'md:text-right' : 'md:order-3'}>...</div>
      <div className="hidden md:flex justify-center"><span className="w-3 h-3 rounded-full bg-[#ee2e65]" /></div>
      <div className={idx % 2 === 0 ? '' : 'md:order-1 md:text-right'} />
    </div>
  ))}
</div>`;

export const TimelineUiKit: React.FC = () => {
  const { triggerToast } = useApp();
  const [events, setEvents] = useState<TimelineEntry[]>(INITIAL_TIMELINE_EVENTS);
  const [filterCat, setFilterCat] = useState<TimelineCategory>('all');
  const [activeMilestoneIdx, setActiveMilestoneIdx] = useState(2);

  const filteredEvents = useMemo(() => {
    return events.filter((e) => filterCat === 'all' || e.category === filterCat);
  }, [events, filterCat]);

  const handleAppendEvent = () => {
    const newEv: TimelineEntry = {
      id: `tm-${Date.now()}`,
      category: 'commit',
      title: `Pembaruan Log Aktivitas #${events.length + 1}`,
      actor: 'Anda',
      timestamp: 'Baru saja · ' + new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      detail: 'Entri kronologis baru ditambahkan untuk menguji animasi dan urutan linimasa.',
      statusLabel: 'Logged',
    };
    playUiMotionSound('pop');
    setEvents((prev) => [newEv, ...prev]);
    triggerToast('Event Ditambahkan', 'Entri aktivitas baru muncul di puncak timeline.', 'success');
  };

  const renderCategoryIcon = (cat: TimelineEntry['category']) => {
    if (cat === 'release') return <Rocket className="w-3.5 h-3.5 text-[#ee2e65]" />;
    if (cat === 'review') return <MessageSquare className="w-3.5 h-3.5 text-emerald-700" />;
    return <GitCommit className="w-3.5 h-3.5 text-gray-800" />;
  };

  const renderStatusStyle = (label: string) => {
    if (label === 'Published' || label === 'Approved') {
      return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
    }
    if (label === 'Logged') {
      return 'bg-[#FEF1F5] text-[#9D113C] border border-[#FBC2D4]';
    }
    return 'bg-gray-100 text-gray-700 border border-gray-300';
  };

  const activeMilestone = HORIZONTAL_MILESTONES[activeMilestoneIdx];

  return (
    <UiDocPage
      title="Timeline"
      description="Pola linimasa kronologis untuk log aktivitas vertikal, pelacak milestone horizontal, dan peta jalan berpasangan."
      subLinks={[
        { id: 'tml-vertical', label: 'Vertical Activity Timeline' },
        { id: 'tml-horizontal', label: 'Horizontal Milestone Stepper' },
        { id: 'tml-alternating', label: 'Chronological Roadmap Split' },
      ]}
    >
      {/* 1. Vertical Activity Timeline */}
      <UiDocSection
        id="tml-vertical"
        title="Vertical Activity & Audit Timeline"
        description="Linimasa vertikal dengan filter kategori aktivitas serta tombol simulasi untuk menyisipkan log baru di urutan teratas."
        classesHint="relative border-l border-gray-300 ml-3 space-y-5"
        codeSnippet={VERTICAL_TIMELINE_SNIPPET}
        actions={
          <button
            type="button"
            onClick={handleAppendEvent}
            className={ACTION_BTN_PRIMARY}
          >
            <Plus className="w-3.5 h-3.5 shrink-0" />
            <span>Tambah Log</span>
          </button>
        }
      >
        <div className="space-y-4">
          <div className="inline-flex items-center gap-1 p-1 rounded-lg bg-gray-100 border border-gray-300">
            {(
              [
                { id: 'all', label: 'Semua' },
                { id: 'release', label: 'Release' },
                { id: 'review', label: 'Review' },
                { id: 'commit', label: 'Commit' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  playUiMotionSound('tick');
                  setFilterCat(tab.id);
                }}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  filterCat === tab.id
                    ? 'bg-white text-gray-900 shadow-2xs font-semibold'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <ol className="relative border-l border-gray-300 ml-3.5 space-y-4">
            <AnimatePresence initial={false}>
              {filteredEvents.map((ev) => (
                <motion.li
                  key={ev.id}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0, transition: { duration: 0.2, ease: [0.23, 1, 0.32, 1] } }}
                  exit={{ opacity: 0, y: -6, transition: { duration: 0.14 } }}
                  className="pl-6 relative"
                >
                  <span className="absolute -left-[13px] top-1 w-6 h-6 rounded-full bg-white border border-gray-300 flex items-center justify-center shadow-2xs">
                    {renderCategoryIcon(ev.category)}
                  </span>

                  <div className="rounded-xl border border-gray-300 bg-white p-3.5 space-y-1.5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h4 className="text-xs font-semibold text-gray-900">{ev.title}</h4>
                      <span className={`px-2 py-0.5 rounded text-[10.5px] font-semibold ${renderStatusStyle(ev.statusLabel)}`}>
                        {ev.statusLabel}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">{ev.detail}</p>
                    <div className="pt-1 flex flex-wrap items-center gap-1.5 text-[11px] text-gray-500 tabular-nums">
                      <span className="font-medium text-gray-700">{ev.actor}</span>
                      <span aria-hidden="true">·</span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{ev.timestamp}</span>
                      </span>
                    </div>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </ol>
        </div>
      </UiDocSection>

      {/* 2. Horizontal Milestone Stepper Timeline */}
      <UiDocSection
        id="tml-horizontal"
        title="Horizontal Milestone Stepper Timeline"
        description="Klik salah satu tahapan milestone untuk meninjau daftar keluaran (deliverables) pada panel rincian di bawah."
        classesHint="grid grid-cols-1 md:grid-cols-4 gap-3"
        codeSnippet={HORIZONTAL_TIMELINE_SNIPPET}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {HORIZONTAL_MILESTONES.map((step, idx) => {
              const isSelected = activeMilestoneIdx === idx;
              const isCompleted = step.status === 'completed';
              const isCurrent = step.status === 'active';

              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => {
                    playUiMotionSound('tick');
                    setActiveMilestoneIdx(idx);
                  }}
                  className={`text-left p-3.5 rounded-2xl border transition-colors duration-200 cursor-pointer flex flex-col justify-between gap-2.5 ${
                    isSelected
                      ? 'border-[#ee2e65] bg-[#FEF1F5]/50 shadow-xs'
                      : 'border-gray-300 bg-white hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold tabular-nums shrink-0 ${
                        isCompleted
                          ? 'bg-emerald-600 text-white'
                          : isCurrent
                          ? 'bg-[#ee2e65] text-white'
                          : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      {isCompleted ? <Check className="w-3.5 h-3.5 stroke-[2.5]" /> : idx + 1}
                    </span>
                    <span className="text-[11px] font-medium text-gray-600 tabular-nums">
                      {step.date}
                    </span>
                  </div>

                  <div>
                    <div className="text-[11px] font-semibold text-gray-600">{step.stage}</div>
                    <div className="text-xs font-semibold text-gray-900 mt-0.5 leading-snug">
                      {step.title}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Synchronized Milestone Inspector */}
          <div
            key={activeMilestone.id}
            className="animate-ui-fade rounded-2xl border border-gray-300 bg-[#FAFBFD] p-4 space-y-3"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <div className="text-[11px] font-semibold text-[#9D113C]">
                  {activeMilestone.stage} · {activeMilestone.date}
                </div>
                <h4 className="text-sm font-semibold text-gray-900">{activeMilestone.title}</h4>
              </div>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-800 bg-white px-2.5 py-1 rounded-lg border border-gray-300">
                <Flag className="w-3.5 h-3.5 text-[#ee2e65]" />
                <span>
                  {activeMilestone.status === 'completed'
                    ? 'Selesai'
                    : activeMilestone.status === 'active'
                    ? 'Sedang Berjalan'
                    : 'Direncanakan'}
                </span>
              </span>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed">{activeMilestone.summary}</p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {activeMilestone.deliverables.map((del) => (
                <div
                  key={del}
                  className="px-3 py-2 rounded-xl bg-white border border-gray-200 text-xs font-medium text-gray-800 flex items-center gap-2"
                >
                  <Check
                    className={`w-3.5 h-3.5 shrink-0 ${
                      activeMilestone.status === 'completed'
                        ? 'text-emerald-600'
                        : activeMilestone.status === 'active'
                        ? 'text-[#ee2e65]'
                        : 'text-gray-400'
                    }`}
                  />
                  <span className="truncate">{del}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </UiDocSection>

      {/* 3. Alternating / Chronological Roadmap Timeline */}
      <UiDocSection
        id="tml-alternating"
        title="Chronological Roadmap Split"
        description="Tata letak linimasa dua sisi pada layar desktop dan otomatis merapat ke satu kolom rapi pada layar seluler."
        classesHint="grid grid-cols-1 md:grid-cols-[1fr_32px_1fr]"
        codeSnippet={ALTERNATING_TIMELINE_SNIPPET}
      >
        <div className="relative space-y-4">
          {ROADMAP_ALTERNATING.map((item, idx) => {
            const isLeft = idx % 2 === 0;
            const isActive = item.state === 'Aktif Sekarang';
            const isDone = item.state === 'Selesai';

            return (
              <div
                key={item.period}
                className="grid grid-cols-1 md:grid-cols-[1fr_32px_1fr] gap-3 items-stretch"
              >
                {/* Card Slot */}
                <div
                  className={`rounded-2xl border p-4 bg-white space-y-1.5 ${
                    isActive ? 'border-[#ee2e65]' : 'border-gray-300'
                  } ${isLeft ? 'md:text-right' : 'md:col-start-3'}`}
                >
                  <div
                    className={`flex flex-wrap items-center gap-2 text-[11px] text-gray-600 tabular-nums ${
                      isLeft ? 'md:justify-end' : 'justify-start'
                    }`}
                  >
                    <span className="font-semibold text-gray-800">{item.period}</span>
                    <span aria-hidden="true">·</span>
                    <span
                      className={`font-semibold ${
                        isDone
                          ? 'text-emerald-700'
                          : isActive
                          ? 'text-[#9D113C]'
                          : 'text-gray-600'
                      }`}
                    >
                      {item.state}
                    </span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-semibold text-gray-900">{item.title}</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">{item.description}</p>
                  <div className="text-[11px] font-medium text-gray-500 pt-0.5">
                    Penanggung jawab: {item.owner}
                  </div>
                </div>

                {/* Center Axis Marker (Desktop) */}
                <div className="hidden md:flex md:col-start-2 md:row-start-1 flex-col items-center">
                  <span
                    className={`w-3.5 h-3.5 rounded-full border-2 border-white shadow-xs mt-4 shrink-0 ${
                      isDone
                        ? 'bg-emerald-600'
                        : isActive
                        ? 'bg-[#ee2e65]'
                        : 'bg-gray-400'
                    }`}
                  />
                  {idx < ROADMAP_ALTERNATING.length - 1 && (
                    <span className="w-px flex-1 bg-gray-300 my-1" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </UiDocSection>
    </UiDocPage>
  );
};
