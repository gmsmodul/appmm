import React, { useMemo, useState } from 'react';
import {
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Diamond,
  Link2,
  Minus,
  Plus,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UiDocPage, UiDocSection } from './UiDocBlock';
import { playUiMotionSound } from '../../utils/uiMotionSound';

type GanttPhase = 'All' | 'Design' | 'Engineering' | 'QA';
type GanttScale = 'day' | 'week';

interface GanttTask {
  id: string;
  code: string;
  title: string;
  phase: Exclude<GanttPhase, 'All'>;
  owner: { name: string; initials: string };
  startDay: number; // 0-based index within 14-day sprint window
  duration: number; // in days
  progress: number; // 0..100
  status: 'On Track' | 'At Risk' | 'Completed';
  dependsOn?: string;
  isMilestone?: boolean;
  barColor: string;
}

const TOTAL_DAYS = 14;
const TODAY_INDEX = 6; // Nov 17

const DAY_LABELS = Array.from({ length: TOTAL_DAYS }, (_, idx) => {
  const dayNum = 11 + idx;
  const weekday = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'][idx % 7];
  return { idx, dayNum, weekday, label: `${dayNum} Nov` };
});

const INITIAL_GANTT_TASKS: GanttTask[] = [
  {
    id: 'g-1',
    code: 'GNT-01',
    title: 'Audit Token Warna & Tipografi',
    phase: 'Design',
    owner: { name: 'Raka Pratama', initials: 'RP' },
    startDay: 0,
    duration: 4,
    progress: 100,
    status: 'Completed',
    barColor: 'bg-emerald-600',
  },
  {
    id: 'g-2',
    code: 'GNT-02',
    title: 'Wireframe Kanban & Timeline',
    phase: 'Design',
    owner: { name: 'Sinta Dewi', initials: 'SD' },
    startDay: 2,
    duration: 5,
    progress: 100,
    status: 'Completed',
    dependsOn: 'GNT-01',
    barColor: 'bg-emerald-600',
  },
  {
    id: 'g-3',
    code: 'GNT-03',
    title: 'Sign-Off Spesifikasi UI Kit',
    phase: 'Design',
    owner: { name: 'Nadia Putri', initials: 'NP' },
    startDay: 6,
    duration: 1,
    progress: 100,
    status: 'Completed',
    dependsOn: 'GNT-02',
    isMilestone: true,
    barColor: 'bg-[#ee2e65]',
  },
  {
    id: 'g-4',
    code: 'GNT-04',
    title: 'Integrasi Komponen Kanban & Gantt',
    phase: 'Engineering',
    owner: { name: 'Dimas Arya', initials: 'DA' },
    startDay: 5,
    duration: 5,
    progress: 68,
    status: 'On Track',
    dependsOn: 'GNT-03',
    barColor: 'bg-[#ee2e65]',
  },
  {
    id: 'g-5',
    code: 'GNT-05',
    title: 'Kalibrasi Scroll Horizontal & Responsif',
    phase: 'Engineering',
    owner: { name: 'Nadia Putri', initials: 'NP' },
    startDay: 7,
    duration: 5,
    progress: 45,
    status: 'At Risk',
    dependsOn: 'GNT-04',
    barColor: 'bg-amber-600',
  },
  {
    id: 'g-6',
    code: 'GNT-06',
    title: 'Uji Regresi Kontras & Keyboard A11y',
    phase: 'QA',
    owner: { name: 'Sinta Dewi', initials: 'SD' },
    startDay: 10,
    duration: 4,
    progress: 20,
    status: 'On Track',
    dependsOn: 'GNT-05',
    barColor: 'bg-[#1C1D21]',
  },
];

const GANTT_CODE_SNIPPET = `<div className="rounded-2xl border border-gray-300 bg-white overflow-x-auto ui-scrollbar-violet">
  <div className="min-w-[760px]">
    {tasks.map((task) => {
      const leftPct = (task.startDay / totalDays) * 100;
      const widthPct = (task.duration / totalDays) * 100;
      return (
        <div key={task.id} className="grid grid-cols-[240px_1fr] border-b border-gray-200 items-center">
          <div className="px-3.5 py-2.5 text-xs font-medium text-gray-900">{task.title}</div>
          <div className="relative h-10 flex items-center">
            <div style={{ left: \`\${leftPct}%\`, width: \`\${widthPct}%\` }} className="absolute h-6 rounded-md bg-[#ee2e65] text-white text-[11px] tabular-nums px-2 flex items-center">
              {task.progress}%
            </div>
          </div>
        </div>
      );
    })}
  </div>
</div>`;

const RESOURCE_CODE_SNIPPET = `<div className="divide-y divide-gray-200 rounded-2xl border border-gray-300 bg-white">
  {phases.map(p => (
    <div key={p.label} className="p-4 flex items-center justify-between gap-4">
      <div className="text-xs font-semibold text-gray-900">{p.label}</div>
      <div className="flex-1 h-2.5 rounded-full bg-gray-200 overflow-hidden">
        <div style={{ width: \`\${p.pct}%\` }} className="h-full bg-[#ee2e65] rounded-full" />
      </div>
      <span className="text-xs font-semibold tabular-nums text-gray-700">{p.pct}%</span>
    </div>
  ))}
</div>`;

export const GanttChartUiKit: React.FC = () => {
  const { triggerToast } = useApp();
  const [tasks, setTasks] = useState<GanttTask[]>(INITIAL_GANTT_TASKS);
  const [phaseFilter, setPhaseFilter] = useState<GanttPhase>('All');
  const [scale, setScale] = useState<GanttScale>('day');
  const [selectedTaskId, setSelectedTaskId] = useState<string>('g-4');
  const [collapsedPhases, setCollapsedPhases] = useState<Record<string, boolean>>({});

  const visibleTasks = useMemo(() => {
    return tasks.filter((t) => phaseFilter === 'All' || t.phase === phaseFilter);
  }, [tasks, phaseFilter]);

  const selectedTask = tasks.find((t) => t.id === selectedTaskId) || visibleTasks[0] || tasks[0];

  const shiftTaskStart = (taskId: string, delta: -1 | 1) => {
    playUiMotionSound('tick');
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== taskId) return t;
        const maxStart = TOTAL_DAYS - t.duration;
        const nextStart = Math.max(0, Math.min(maxStart, t.startDay + delta));
        return { ...t, startDay: nextStart };
      })
    );
  };

  const adjustTaskDuration = (taskId: string, delta: -1 | 1) => {
    playUiMotionSound('tick');
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== taskId || t.isMilestone) return t;
        const maxDur = TOTAL_DAYS - t.startDay;
        const nextDur = Math.max(1, Math.min(maxDur, t.duration + delta));
        return { ...t, duration: nextDur };
      })
    );
  };

  const updateTaskProgress = (taskId: string, progress: number) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== taskId) return t;
        const nextStatus: GanttTask['status'] =
          progress >= 100 ? 'Completed' : t.status === 'Completed' ? 'On Track' : t.status;
        return { ...t, progress, status: nextStatus };
      })
    );
  };

  const phaseSummary = useMemo(() => {
    return (['Design', 'Engineering', 'QA'] as const).map((phase) => {
      const items = tasks.filter((t) => t.phase === phase);
      const avg = items.length
        ? Math.round(items.reduce((acc, item) => acc + item.progress, 0) / items.length)
        : 0;
      return { phase, count: items.length, avg };
    });
  }, [tasks]);

  const statusTextStyle = (status: GanttTask['status']) => {
    if (status === 'Completed') return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
    if (status === 'At Risk') return 'bg-amber-50 text-amber-800 border border-amber-200';
    return 'bg-[#FEF1F5] text-[#9D113C] border border-[#FBC2D4]';
  };

  return (
    <UiDocPage
      title="Gantt Chart"
      description="Grafik jadwal proyek berbasis rentang waktu dengan penanda garis Hari Ini, milestone berlian, ketergantungan tugas, dan kontrol durasi interaktif."
      subLinks={[
        { id: 'gnt-roadmap', label: 'Interactive Sprint Gantt Chart' },
        { id: 'gnt-phases', label: 'Phase Completion & Milestones' },
      ]}
    >
      <UiDocSection
        id="gnt-roadmap"
        title="Interactive Project Gantt Chart"
        description="Pilih baris tugas untuk menggeser tanggal mulai, menyesuaikan durasi hari, atau memperbarui persentase progres langsung pada grafik."
        classesHint="grid-cols-[240px_1fr] / relative timeline track / Today vertical line"
        codeSnippet={GANTT_CODE_SNIPPET}
        actions={
          <div className="inline-flex items-center gap-1 p-1 rounded-lg bg-gray-100 border border-gray-300">
            {(['day', 'week'] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => {
                  playUiMotionSound('tick');
                  setScale(mode);
                }}
                className={`px-2.5 py-1 rounded-md text-xs font-medium capitalize transition-colors cursor-pointer whitespace-nowrap ${
                  scale === mode ? 'bg-white text-gray-900 shadow-2xs font-semibold' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {mode === 'day' ? 'Harian (14H)' : 'Mingguan (2M)'}
              </button>
            ))}
          </div>
        }
      >
        <div className="space-y-4">
          {/* Phase Filter & Legend */}
          <div className="flex flex-wrap items-center justify-between gap-2.5">
            <div className="inline-flex items-center gap-1 p-1 rounded-lg bg-gray-100 border border-gray-300">
              {(['All', 'Design', 'Engineering', 'QA'] as const).map((ph) => (
                <button
                  key={ph}
                  type="button"
                  onClick={() => {
                    playUiMotionSound('tick');
                    setPhaseFilter(ph);
                  }}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                    phaseFilter === ph
                      ? 'bg-white text-gray-900 shadow-2xs font-semibold'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {ph}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3 text-[11.5px] text-gray-600">
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#ee2e65]" />
                <span>Hari Ini (17 Nov)</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Diamond className="w-3 h-3 text-[#ee2e65] fill-[#ee2e65]" />
                <span>Milestone</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Link2 className="w-3.5 h-3.5 text-gray-500" />
                <span>Ketergantungan</span>
              </span>
            </div>
          </div>

          {/* Scrollable Gantt Table Grid */}
          <div className="rounded-2xl border border-gray-300 bg-white overflow-x-auto ui-scrollbar-violet">
            <div className="min-w-[760px]">
              {/* Header Row */}
              <div className="grid grid-cols-[260px_1fr] bg-[#FAFBFD] border-b border-gray-300 text-xs font-semibold text-gray-700">
                <div className="px-4 py-2.5 border-r border-gray-300 flex items-center justify-between">
                  <span>Tugas &amp; Fase</span>
                  <span className="text-[11px] font-medium text-gray-500 tabular-nums">
                    {visibleTasks.length} item
                  </span>
                </div>

                {scale === 'day' ? (
                  <div className="grid grid-cols-[repeat(14,minmax(0,1fr))] relative">
                    {DAY_LABELS.map((d) => (
                      <div
                        key={d.idx}
                        className={`py-2 text-center border-r last:border-r-0 border-gray-200 tabular-nums ${
                          d.idx === TODAY_INDEX ? 'bg-[#FEF1F5] text-[#9D113C] font-bold' : ''
                        }`}
                      >
                        <div className="text-[10px] text-gray-500 font-medium">{d.weekday}</div>
                        <div className="text-[11px]">{d.dayNum}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2.5 border-r border-gray-200 flex items-center justify-between tabular-nums">
                      <span>Minggu 1 · Sprint Foundation</span>
                      <span className="text-[11px] text-gray-500 font-normal">11 – 17 Nov</span>
                    </div>
                    <div className="px-4 py-2.5 flex items-center justify-between tabular-nums">
                      <span>Minggu 2 · Build &amp; QA Release</span>
                      <span className="text-[11px] text-gray-500 font-normal">18 – 24 Nov</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Rows Grouped by Visible Phases */}
              <div className="divide-y divide-gray-200">
                {(['Design', 'Engineering', 'QA'] as const)
                  .filter((ph) => phaseFilter === 'All' || phaseFilter === ph)
                  .map((phaseName) => {
                    const phaseItems = visibleTasks.filter((t) => t.phase === phaseName);
                    if (phaseItems.length === 0) return null;
                    const isCollapsed = Boolean(collapsedPhases[phaseName]);

                    return (
                      <React.Fragment key={phaseName}>
                        {/* Phase Group Header Row */}
                        <div className="grid grid-cols-[260px_1fr] bg-gray-50/90">
                          <button
                            type="button"
                            onClick={() =>
                              setCollapsedPhases((prev) => ({
                                ...prev,
                                [phaseName]: !prev[phaseName],
                              }))
                            }
                            className="px-4 py-2 border-r border-gray-300 flex items-center justify-between text-left text-xs font-semibold text-gray-900 hover:bg-gray-100 cursor-pointer"
                          >
                            <span className="flex items-center gap-1.5">
                              {isCollapsed ? (
                                <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
                              ) : (
                                <ChevronDown className="w-3.5 h-3.5 text-gray-600" />
                              )}
                              <span>Fase {phaseName}</span>
                            </span>
                            <span className="text-[11px] text-gray-500 tabular-nums">
                              {phaseItems.length}
                            </span>
                          </button>
                          <div className="relative">
                            {/* Today line continuation */}
                            <div
                              style={{ left: `${((TODAY_INDEX + 0.5) / TOTAL_DAYS) * 100}%` }}
                              className="absolute inset-y-0 w-px bg-[#ee2e65]/50 pointer-events-none"
                            />
                          </div>
                        </div>

                        {!isCollapsed &&
                          phaseItems.map((task) => {
                            const leftPct = (task.startDay / TOTAL_DAYS) * 100;
                            const widthPct = (task.duration / TOTAL_DAYS) * 100;
                            const isSelected = selectedTask?.id === task.id;
                            const startLabel = DAY_LABELS[task.startDay]?.label || '';
                            const endIdx = Math.min(TOTAL_DAYS - 1, task.startDay + task.duration - 1);
                            const endLabel = DAY_LABELS[endIdx]?.label || '';

                            return (
                              <div
                                key={task.id}
                                onClick={() => setSelectedTaskId(task.id)}
                                className={`grid grid-cols-[260px_1fr] items-center cursor-pointer transition-colors ${
                                  isSelected ? 'bg-[#FEF1F5]/45' : 'hover:bg-gray-50/80'
                                }`}
                              >
                                {/* Task Info Column */}
                                <div className="px-4 py-2.5 border-r border-gray-300 min-w-0">
                                  <div className="flex items-center justify-between gap-2">
                                    <span className="text-xs font-semibold text-gray-900 truncate">
                                      {task.title}
                                    </span>
                                  </div>
                                  <div className="mt-0.5 flex items-center gap-1.5 text-[11px] text-gray-600 tabular-nums truncate">
                                    <span className="font-mono text-gray-700">{task.code}</span>
                                    <span aria-hidden="true">·</span>
                                    <span>{task.owner.initials}</span>
                                    {task.dependsOn && (
                                      <>
                                        <span aria-hidden="true">·</span>
                                        <span className="inline-flex items-center gap-0.5 text-gray-500">
                                          <Link2 className="w-3 h-3" />
                                          {task.dependsOn}
                                        </span>
                                      </>
                                    )}
                                  </div>
                                </div>

                                {/* Timeline Bar Track */}
                                <div className="relative h-12 flex items-center">
                                  {/* Background Column Gridlines */}
                                  <div
                                    className={`absolute inset-0 grid pointer-events-none ${
                                      scale === 'day' ? 'grid-cols-[repeat(14,minmax(0,1fr))]' : 'grid-cols-2'
                                    }`}
                                  >
                                    {Array.from({ length: scale === 'day' ? TOTAL_DAYS : 2 }).map((_, idx) => (
                                      <div
                                        key={idx}
                                        className="border-r last:border-r-0 border-gray-200 h-full"
                                      />
                                    ))}
                                  </div>

                                  {/* Today Vertical Marker */}
                                  <div
                                    style={{ left: `${((TODAY_INDEX + 0.5) / TOTAL_DAYS) * 100}%` }}
                                    className="absolute inset-y-0 w-px bg-[#ee2e65] z-10 pointer-events-none"
                                  />

                                  {/* Task Bar or Diamond Milestone */}
                                  {task.isMilestone ? (
                                    <div
                                      style={{ left: `calc(${leftPct}% + ${(100 / TOTAL_DAYS / 2).toFixed(2)}% - 10px)` }}
                                      title={`${task.title} · ${startLabel}`}
                                      className="absolute z-20 flex items-center gap-2"
                                    >
                                      <div
                                        className={`w-5 h-5 rotate-45 rounded-[3px] bg-[#ee2e65] border-2 border-white shadow-xs transition-transform ${
                                          isSelected ? 'scale-110 ring-2 ring-[#ee2e65]/40' : ''
                                        }`}
                                      />
                                      <span className="text-[11px] font-semibold text-gray-900 whitespace-nowrap bg-white/90 px-1.5 py-0.5 rounded border border-gray-300 tabular-nums">
                                        {startLabel}
                                      </span>
                                    </div>
                                  ) : (
                                    <div
                                      style={{ left: `${leftPct}%`, width: `${widthPct}%` }}
                                      title={`${task.title} (${startLabel} – ${endLabel}, ${task.progress}%)`}
                                      className={`absolute z-20 h-7 rounded-lg ${task.barColor} text-white overflow-hidden shadow-2xs transition-all duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] flex items-center justify-between px-2.5 ${
                                        isSelected ? 'ring-2 ring-offset-1 ring-[#1C1D21]' : ''
                                      }`}
                                    >
                                      {/* Progress Overlay */}
                                      <div
                                        style={{ width: `${task.progress}%` }}
                                        className="absolute inset-y-0 left-0 bg-black/18 pointer-events-none"
                                      />
                                      <span className="relative z-10 text-[11px] font-semibold truncate">
                                        {task.duration}h
                                      </span>
                                      <span className="relative z-10 text-[11px] font-bold tabular-nums shrink-0 ml-1">
                                        {task.progress}%
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                      </React.Fragment>
                    );
                  })}
              </div>
            </div>
          </div>

          {/* Interactive Selected Task Schedule Inspector */}
          {selectedTask && (
            <div className="p-4 rounded-2xl border border-gray-300 bg-[#FAFBFD] flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="space-y-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="font-mono font-semibold text-gray-800">{selectedTask.code}</span>
                  <span aria-hidden="true" className="text-gray-400">·</span>
                  <span className="font-semibold text-gray-900">{selectedTask.title}</span>
                  <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${statusTextStyle(selectedTask.status)}`}>
                    {selectedTask.status}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-[11.5px] text-gray-600 tabular-nums">
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-gray-500" />
                    <span>
                      {DAY_LABELS[selectedTask.startDay]?.label} –{' '}
                      {DAY_LABELS[Math.min(TOTAL_DAYS - 1, selectedTask.startDay + selectedTask.duration - 1)]?.label}
                    </span>
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>Durasi {selectedTask.duration} hari</span>
                  <span aria-hidden="true">·</span>
                  <span>PIC: {selectedTask.owner.name}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <div className="flex items-center gap-1.5 text-xs">
                  <span className="text-gray-600 font-medium">Geser:</span>
                  <button
                    type="button"
                    disabled={selectedTask.startDay <= 0}
                    onClick={() => shiftTaskStart(selectedTask.id, -1)}
                    aria-label="Geser 1 hari lebih awal"
                    className="w-7 h-7 rounded-lg border border-gray-300 bg-white hover:bg-gray-100 disabled:opacity-35 flex items-center justify-center cursor-pointer"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    disabled={selectedTask.startDay + selectedTask.duration >= TOTAL_DAYS}
                    onClick={() => shiftTaskStart(selectedTask.id, 1)}
                    aria-label="Geser 1 hari lebih lambat"
                    className="w-7 h-7 rounded-lg border border-gray-300 bg-white hover:bg-gray-100 disabled:opacity-35 flex items-center justify-center cursor-pointer"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {!selectedTask.isMilestone && (
                  <div className="flex items-center gap-1.5 text-xs">
                    <span className="text-gray-600 font-medium">Durasi:</span>
                    <button
                      type="button"
                      disabled={selectedTask.duration <= 1}
                      onClick={() => adjustTaskDuration(selectedTask.id, -1)}
                      aria-label="Kurangi durasi 1 hari"
                      className="w-7 h-7 rounded-lg border border-gray-300 bg-white hover:bg-gray-100 disabled:opacity-35 flex items-center justify-center cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={selectedTask.startDay + selectedTask.duration >= TOTAL_DAYS}
                      onClick={() => adjustTaskDuration(selectedTask.id, 1)}
                      aria-label="Tambah durasi 1 hari"
                      className="w-7 h-7 rounded-lg border border-gray-300 bg-white hover:bg-gray-100 disabled:opacity-35 flex items-center justify-center cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                <div className="flex items-center gap-2 text-xs">
                  <span className="text-gray-600 font-medium tabular-nums w-20">
                    Progres: <strong className="text-gray-900">{selectedTask.progress}%</strong>
                  </span>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    step={5}
                    value={selectedTask.progress}
                    onChange={(e) => updateTaskProgress(selectedTask.id, Number(e.target.value))}
                    aria-label="Atur progres tugas"
                    className="w-24 accent-[#ee2e65] cursor-pointer"
                  />
                </div>

                <button
                  type="button"
                  onClick={() =>
                    triggerToast(
                      'Jadwal Disimpan',
                      `${selectedTask.code} (${selectedTask.progress}%) diperbarui pada Gantt Chart.`,
                      'success'
                    )
                  }
                  className="h-8 px-3 rounded-lg bg-[#1C1D21] hover:bg-black text-white text-xs font-semibold cursor-pointer whitespace-nowrap"
                >
                  Terapkan
                </button>
              </div>
            </div>
          )}
        </div>
      </UiDocSection>

      <UiDocSection
        id="gnt-phases"
        title="Phase Completion Summary"
        description="Ringkasan agregat progres setiap fase proyek yang otomatis terhitung ulang saat bar Gantt diperbarui."
        classesHint="rounded-2xl border border-gray-300 bg-white divide-y divide-gray-200"
        codeSnippet={RESOURCE_CODE_SNIPPET}
      >
        <div className="rounded-2xl border border-gray-300 bg-white divide-y divide-gray-200">
          {phaseSummary.map((item) => (
            <div
              key={item.phase}
              className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="sm:w-48 shrink-0">
                <div className="text-xs font-semibold text-gray-900">Fase {item.phase}</div>
                <div className="text-[11px] text-gray-600 tabular-nums">{item.count} tugas terjadwal</div>
              </div>
              <div className="flex-1 h-2.5 rounded-full bg-gray-200 overflow-hidden">
                <div
                  style={{ width: `${item.avg}%` }}
                  className={`h-full rounded-full transition-[width] duration-200 ${
                    item.avg >= 90
                      ? 'bg-emerald-600'
                      : item.avg >= 50
                      ? 'bg-[#ee2e65]'
                      : 'bg-amber-600'
                  }`}
                />
              </div>
              <div className="sm:w-14 sm:text-right text-xs font-bold text-gray-900 tabular-nums shrink-0">
                {item.avg}%
              </div>
            </div>
          ))}
        </div>
      </UiDocSection>
    </UiDocPage>
  );
};
