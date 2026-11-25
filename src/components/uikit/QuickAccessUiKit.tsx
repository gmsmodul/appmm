import React, { useMemo, useState } from 'react';
import {
  Plus,
  QrCode,
  FileSpreadsheet,
  Megaphone,
  CalendarPlus,
  ClipboardCheck,
  Pin,
  Search,
  Clock,
  ArrowUpRight,
  SlidersHorizontal,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UiDocPage, UiDocSection } from './UiDocBlock';
import { playUiMotionSound } from '../../utils/uiMotionSound';

interface QuickShortcut {
  id: string;
  label: string;
  subtitle: string;
  shortcut: string;
  accentBg: string;
  accentText: string;
  icon: React.FC<{ className?: string }>;
  recentAt?: string;
}

const SHORTCUT_ITEMS: QuickShortcut[] = [
  {
    id: 'qa-material',
    label: 'Unggah Materi',
    subtitle: 'PDF, Video & Modul',
    shortcut: 'M',
    accentBg: 'bg-[#FEF1F5] dark:bg-[#ee2e65]/15',
    accentText: 'text-[#ee2e65] dark:text-[#f895b5]',
    icon: BookOpen,
    recentAt: '5 menit lalu',
  },
  {
    id: 'qa-qr',
    label: 'Scan Presensi QR',
    subtitle: 'Buka sesi hadir kelas',
    shortcut: 'Q',
    accentBg: 'bg-[#EDE9FE] dark:bg-indigo-500/15',
    accentText: 'text-[#543DE2] dark:text-indigo-300',
    icon: QrCode,
    recentAt: '22 menit lalu',
  },
  {
    id: 'qa-grade',
    label: 'Input Nilai Ujian',
    subtitle: 'Rekap & validasi skor',
    shortcut: 'N',
    accentBg: 'bg-[#E6F9F0] dark:bg-emerald-500/15',
    accentText: 'text-[#146C43] dark:text-emerald-300',
    icon: ClipboardCheck,
    recentAt: '1 jam lalu',
  },
  {
    id: 'qa-schedule',
    label: 'Tambah Jadwal',
    subtitle: 'Atur slot pertemuan',
    shortcut: 'J',
    accentBg: 'bg-[#FFF5E6] dark:bg-amber-500/15',
    accentText: 'text-[#8C5811] dark:text-amber-300',
    icon: CalendarPlus,
    recentAt: 'Kemarin',
  },
  {
    id: 'qa-broadcast',
    label: 'Kirim Pengumuman',
    subtitle: 'Broadcast ke batch aktif',
    shortcut: 'P',
    accentBg: 'bg-sky-50 dark:bg-sky-500/15',
    accentText: 'text-sky-700 dark:text-sky-300',
    icon: Megaphone,
    recentAt: 'Kemarin',
  },
  {
    id: 'qa-export',
    label: 'Ekspor Rapor CSV',
    subtitle: 'Unduh laporan semester',
    shortcut: 'E',
    accentBg: 'bg-gray-100 dark:bg-white/[0.08]',
    accentText: 'text-gray-700 dark:text-gray-200',
    icon: FileSpreadsheet,
    recentAt: '2 hari lalu',
  },
];

export const QuickAccessUiKit: React.FC = () => {
  const { triggerToast } = useApp();
  const [pinnedIds, setPinnedIds] = useState<string[]>(['qa-material', 'qa-qr', 'qa-grade']);
  const [filterQuery, setFilterQuery] = useState('');
  const [lastLaunchedId, setLastLaunchedId] = useState<string>('qa-material');

  const togglePin = (id: string, label: string) => {
    playUiMotionSound('tick');
    setPinnedIds((prev) => {
      const isPinned = prev.includes(id);
      const next = isPinned ? prev.filter((x) => x !== id) : [...prev, id];
      triggerToast(
        isPinned ? 'Pintasan Dilepas' : 'Disematkan ke Quick Access',
        label,
        'info'
      );
      return next;
    });
  };

  const launchShortcut = (item: QuickShortcut) => {
    playUiMotionSound('pop');
    setLastLaunchedId(item.id);
    triggerToast(`Quick Access · ${item.label}`, `${item.subtitle} dijalankan.`, 'success');
  };

  const filteredItems = useMemo(() => {
    const q = filterQuery.trim().toLowerCase();
    if (!q) return SHORTCUT_ITEMS;
    return SHORTCUT_ITEMS.filter(
      (item) =>
        item.label.toLowerCase().includes(q) || item.subtitle.toLowerCase().includes(q)
    );
  }, [filterQuery]);

  const pinnedItems = filteredItems.filter((item) => pinnedIds.includes(item.id));
  const otherItems = filteredItems.filter((item) => !pinnedIds.includes(item.id));

  return (
    <UiDocPage
      title="Quick Access"
      description="Pola navigasi akses cepat untuk memunculkan aksi utama yang sering dipakai: grid ubin pintasan dengan tombol pin, panel Pinned & Terakhir Diakses, serta bilah peluncur ringkas."
      subLinks={[
        { id: 'qa-tiles', label: 'Shortcut Tiles Grid' },
        { id: 'qa-pinned-recent', label: 'Pinned & Recent Launcher' },
        { id: 'qa-strip', label: 'Compact Quick Action Strip' },
      ]}
    >
      {/* 1. Shortcut Tiles Grid */}
      <UiDocSection
        id="qa-tiles"
        title="Quick Access Shortcut Tiles Grid"
        description="Klik ubin untuk meluncurkan aksi atau ikon pin di pojok kanan atas untuk menyematkan ke daftar prioritas."
        classesHint="grid grid-cols-2 sm:grid-cols-3 gap-3 / focus-visible:ring-2"
        codeSnippet={`<button className="group rounded-2xl border border-black/[0.12] bg-white p-3.5 text-left hover:border-[#ee2e65]/50 transition-all">\n  <div className="flex items-center justify-between">\n    <span className="w-9 h-9 rounded-xl bg-[#FEF1F5] text-[#ee2e65] flex items-center justify-center"><BookOpen /></span>\n    <kbd className="text-[10px] font-mono text-gray-500">⌘M</kbd>\n  </div>\n  <div className="mt-3 text-xs font-bold">Unggah Materi</div>\n</button>`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {SHORTCUT_ITEMS.map((item) => {
            const Icon = item.icon;
            const isPinned = pinnedIds.includes(item.id);
            const isActive = lastLaunchedId === item.id;
            return (
              <div
                key={item.id}
                className={`group relative rounded-2xl border p-3.5 transition-all duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                  isActive
                    ? 'border-[#ee2e65]/50 bg-[#FEF1F5]/35 dark:bg-[#ee2e65]/[0.07] dark:border-[#ee2e65]/40'
                    : 'border-black/[0.12] dark:border-white/[0.10] bg-white dark:bg-[#181B21] hover:border-gray-400 dark:hover:border-white/25'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => launchShortcut(item)}
                    className="flex items-center gap-3 text-left flex-1 min-w-0 cursor-pointer focus:outline-none"
                  >
                    <span
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105 ${item.accentBg} ${item.accentText}`}
                    >
                      <Icon className="w-4 h-4" />
                    </span>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-[#1C1D21] dark:text-[#F3F4F6] truncate">
                        {item.label}
                      </div>
                      <div className="text-[11px] text-[#5A5D67] dark:text-gray-400 truncate">
                        {item.subtitle}
                      </div>
                    </div>
                  </button>

                  <div className="flex items-center gap-1 shrink-0">
                    <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded border border-black/[0.10] dark:border-white/[0.12] bg-gray-50 dark:bg-[#121418] text-[10px] font-mono text-gray-500 dark:text-gray-400">
                      ⌘{item.shortcut}
                    </kbd>
                    <button
                      type="button"
                      onClick={() => togglePin(item.id, item.label)}
                      aria-label={isPinned ? `Lepas pin ${item.label}` : `Sematkan ${item.label}`}
                      className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
                        isPinned
                          ? 'text-[#ee2e65] bg-[#FEF1F5] dark:bg-[#ee2e65]/15 dark:text-[#f895b5]'
                          : 'text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/[0.06]'
                      }`}
                    >
                      <Pin className={`w-3.5 h-3.5 ${isPinned ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </UiDocSection>

      {/* 2. Pinned & Recent Launcher Panel */}
      <UiDocSection
        id="qa-pinned-recent"
        title="Pinned & Recently Accessed Launcher"
        description="Mengelompokkan pintasan yang disematkan (Pinned) dan daftar akses terakhir dengan filter instan."
        classesHint="rounded-2xl border / divide-y / filter input"
        codeSnippet={`<div className="rounded-2xl border border-black/[0.12] bg-white p-4 space-y-3">\n  <input placeholder="Filter quick access..." />\n  <div className="text-[11px] font-semibold uppercase text-gray-500">Pinned Shortcuts</div>\n  ...\n</div>`}
      >
        <div className="max-w-xl rounded-2xl border border-black/[0.12] dark:border-white/[0.10] bg-white dark:bg-[#181B21] overflow-hidden">
          <div className="p-3 border-b border-black/[0.08] dark:border-white/[0.08] flex items-center gap-2 bg-[#FAFBFD] dark:bg-[#15181E]">
            <Search className="w-4 h-4 text-gray-400 shrink-0" />
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder="Cari pintasan cepat (mis. QR, nilai, jadwal)..."
              className="w-full bg-transparent text-xs text-gray-900 dark:text-[#F3F4F6] placeholder:text-gray-400 focus:outline-none"
            />
            <span className="text-[11px] font-medium text-gray-500 dark:text-gray-400 tabular-nums shrink-0">
              {pinnedItems.length} pinned
            </span>
          </div>

          <div className="p-3.5 space-y-4">
            {/* Pinned Group */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                <span className="inline-flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-[#ee2e65]" />
                  Disematkan (Pinned)
                </span>
              </div>
              {pinnedItems.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {pinnedItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={`pin-${item.id}`}
                        type="button"
                        onClick={() => launchShortcut(item)}
                        className="flex items-center justify-between gap-2 px-3 py-2 rounded-xl border border-black/[0.10] dark:border-white/[0.10] bg-gray-50/70 dark:bg-[#1B1E24] hover:border-[#ee2e65]/50 text-left transition-colors cursor-pointer group"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span
                            className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${item.accentBg} ${item.accentText}`}
                          >
                            <Icon className="w-3.5 h-3.5" />
                          </span>
                          <span className="text-xs font-semibold text-gray-900 dark:text-[#F3F4F6] truncate">
                            {item.label}
                          </span>
                        </div>
                        <ArrowUpRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#ee2e65] shrink-0" />
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="text-xs text-gray-500 dark:text-gray-400 py-2">
                  Belum ada pintasan yang disematkan atau sesuai filter.
                </div>
              )}
            </div>

            {/* Recent / All Items */}
            <div className="space-y-1.5">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                <Clock className="w-3 h-3" />
                Terakhir Diakses
              </div>
              <div className="divide-y divide-black/[0.06] dark:divide-white/[0.06]">
                {(otherItems.length > 0 ? otherItems : filteredItems).slice(0, 4).map((item) => {
                  const Icon = item.icon;
                  const isPinned = pinnedIds.includes(item.id);
                  return (
                    <div
                      key={`rec-${item.id}`}
                      className="py-2 flex items-center justify-between gap-2 text-xs"
                    >
                      <button
                        type="button"
                        onClick={() => launchShortcut(item)}
                        className="flex items-center gap-2.5 min-w-0 flex-1 text-left hover:text-[#ee2e65] dark:hover:text-[#f895b5] transition-colors cursor-pointer"
                      >
                        <Icon className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400 shrink-0" />
                        <span className="font-medium text-gray-800 dark:text-gray-200 truncate">
                          {item.label}
                        </span>
                        <span className="text-[11px] text-gray-400 dark:text-gray-500 hidden sm:inline">
                          · {item.recentAt}
                        </span>
                      </button>
                      <button
                        type="button"
                        onClick={() => togglePin(item.id, item.label)}
                        className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 hover:text-[#ee2e65] dark:hover:text-[#f895b5] cursor-pointer shrink-0"
                      >
                        {isPinned ? 'Lepas' : 'Pin'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </UiDocSection>

      {/* 3. Compact Quick Action Strip */}
      <UiDocSection
        id="qa-strip"
        title="Compact Quick Action Strip"
        description="Bilah aksi cepat satu baris untuk header halaman atau empty state agar pengguna dapat langsung memulai tugas utama."
        classesHint="flex flex-wrap items-center gap-2 rounded-xl border p-2.5"
        codeSnippet={`<div className="flex flex-wrap items-center gap-2 p-2.5 rounded-xl border bg-[#FAFBFD]">\n  <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#ee2e65] text-white text-xs font-semibold">...</button>\n</div>`}
      >
        <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-xl border border-black/[0.12] dark:border-white/[0.10] bg-[#FAFBFD] dark:bg-[#15181E]">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => launchShortcut(SHORTCUT_ITEMS[0])}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#ee2e65] hover:bg-[#c11448] text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Buat Baru</span>
            </button>
            {SHORTCUT_ITEMS.slice(1, 4).map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={`strip-${item.id}`}
                  type="button"
                  onClick={() => launchShortcut(item)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-black/[0.12] dark:border-white/[0.10] bg-white dark:bg-[#1B1E24] hover:border-gray-400 dark:hover:border-white/25 text-xs font-medium text-gray-800 dark:text-gray-200 transition-colors cursor-pointer"
                >
                  <Icon className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
          <button
            type="button"
            onClick={() =>
              triggerToast('Pengaturan Quick Access', 'Kelola urutan pintasan cepat.', 'info')
            }
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-black/[0.04] dark:hover:bg-white/[0.06] cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Atur</span>
          </button>
        </div>
      </UiDocSection>
    </UiDocPage>
  );
};
