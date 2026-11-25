import React, { useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckSquare,
  GripVertical,
  Plus,
  Search,
  Trash2,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { UiDocPage, UiDocSection } from './UiDocBlock';
import { ACTION_BTN_PRIMARY } from '../../constants/buttonStyles';
import { playUiMotionSound } from '../../utils/uiMotionSound';

type KanbanColumnId = 'backlog' | 'in_progress' | 'review' | 'done';
type TaskPriority = 'High' | 'Medium' | 'Low';

interface KanbanTask {
  id: string;
  code: string;
  title: string;
  stream: string;
  priority: TaskPriority;
  assignee: { name: string; initials: string; bg: string; text: string };
  dueDate: string;
  checklistDone: number;
  checklistTotal: number;
  columnId: KanbanColumnId;
}

const COLUMNS: {
  id: KanbanColumnId;
  title: string;
  wipLimit: number | null;
  dotColor: string;
}[] = [
  { id: 'backlog', title: 'Backlog', wipLimit: null, dotColor: 'bg-gray-500' },
  { id: 'in_progress', title: 'In Progress', wipLimit: 3, dotColor: 'bg-[#ee2e65]' },
  { id: 'review', title: 'Review', wipLimit: 2, dotColor: 'bg-amber-600' },
  { id: 'done', title: 'Done', wipLimit: null, dotColor: 'bg-emerald-600' },
];

const INITIAL_TASKS: KanbanTask[] = [
  {
    id: 'k-1',
    code: 'UI-101',
    title: 'Audit kontras warna teks abu-abu dan garis pembatas',
    stream: 'Accessibility',
    priority: 'High',
    assignee: { name: 'Raka Pratama', initials: 'RP', bg: 'bg-[#FEF1F5]', text: 'text-[#9D113C]' },
    dueDate: '18 Nov',
    checklistDone: 4,
    checklistTotal: 4,
    columnId: 'done',
  },
  {
    id: 'k-2',
    code: 'UI-104',
    title: 'Implementasi Kanban Board dengan drag & drop dan batas WIP',
    stream: 'Data Display',
    priority: 'High',
    assignee: { name: 'Nadia Putri', initials: 'NP', bg: 'bg-[#EDE9FE]', text: 'text-[#543DE2]' },
    dueDate: '20 Nov',
    checklistDone: 3,
    checklistTotal: 5,
    columnId: 'in_progress',
  },
  {
    id: 'k-3',
    code: 'UI-107',
    title: 'Sinkronisasi skala waktu mingguan & bulanan pada Gantt Chart',
    stream: 'Charts',
    priority: 'Medium',
    assignee: { name: 'Dimas Arya', initials: 'DA', bg: 'bg-[#E6F9F0]', text: 'text-[#146C43]' },
    dueDate: '22 Nov',
    checklistDone: 2,
    checklistTotal: 4,
    columnId: 'in_progress',
  },
  {
    id: 'k-4',
    code: 'UI-110',
    title: 'Review animasi transisi ease-out 200ms pada komponen Timeline',
    stream: 'Motion',
    priority: 'Medium',
    assignee: { name: 'Sinta Dewi', initials: 'SD', bg: 'bg-[#FFF5E6]', text: 'text-[#8C5811]' },
    dueDate: '23 Nov',
    checklistDone: 3,
    checklistTotal: 3,
    columnId: 'review',
  },
  {
    id: 'k-5',
    code: 'UI-112',
    title: 'Dokumentasi token radius nested container pada pedoman layout',
    stream: 'Utilities',
    priority: 'Low',
    assignee: { name: 'Raka Pratama', initials: 'RP', bg: 'bg-[#FEF1F5]', text: 'text-[#9D113C]' },
    dueDate: '26 Nov',
    checklistDone: 1,
    checklistTotal: 3,
    columnId: 'backlog',
  },
  {
    id: 'k-6',
    code: 'UI-115',
    title: 'Tambahkan pintasan keyboard untuk navigasi cepat antar kolom',
    stream: 'Navigation',
    priority: 'Low',
    assignee: { name: 'Nadia Putri', initials: 'NP', bg: 'bg-[#EDE9FE]', text: 'text-[#543DE2]' },
    dueDate: '29 Nov',
    checklistDone: 0,
    checklistTotal: 2,
    columnId: 'backlog',
  },
];

const PRIORITY_STYLES: Record<TaskPriority, { text: string; bg: string; label: string }> = {
  High: { text: 'text-rose-700', bg: 'bg-rose-50 border border-rose-200', label: 'High' },
  Medium: { text: 'text-amber-800', bg: 'bg-amber-50 border border-amber-200', label: 'Medium' },
  Low: { text: 'text-gray-700', bg: 'bg-gray-100 border border-gray-300', label: 'Low' },
};

const KANBAN_CODE_SNIPPET = `<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3.5">
  {columns.map(col => (
    <div
      key={col.id}
      onDragOver={(e) => e.preventDefault()}
      onDrop={() => moveTask(draggedId, col.id)}
      className="rounded-2xl border border-gray-300 bg-[#FAFBFD] p-3 flex flex-col gap-2.5"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-gray-900">{col.title}</span>
        <span className="text-[11px] font-semibold text-gray-600 tabular-nums">{col.tasks.length}</span>
      </div>
      {col.tasks.map(task => (
        <article draggable key={task.id} className="rounded-xl border border-gray-300 bg-white p-3">
          <div className="text-xs font-semibold text-gray-900">{task.title}</div>
        </article>
      ))}
    </div>
  ))}
</div>`;

const SWIMLANE_CODE_SNIPPET = `<div className="space-y-3">
  {lanes.map(lane => (
    <div key={lane.id} className="rounded-2xl border border-gray-300 bg-white overflow-hidden">
      <button onClick={() => toggleLane(lane.id)} className="w-full px-4 py-3 flex items-center justify-between">
        <span className="text-xs font-semibold text-gray-900">{lane.title}</span>
        <span className="text-xs text-gray-600 tabular-nums">{lane.count} tugas</span>
      </button>
    </div>
  ))}
</div>`;

export const KanbanBoardUiKit: React.FC = () => {
  const { triggerToast } = useApp();
  const [tasks, setTasks] = useState<KanbanTask[]>(INITIAL_TASKS);
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);
  const [dragOverCol, setDragOverCol] = useState<KanbanColumnId | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState<'All' | TaskPriority>('All');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskCol, setNewTaskCol] = useState<KanbanColumnId>('backlog');
  const [composerOpen, setComposerOpen] = useState(false);

  // Swimlane state
  const [wipLimitDemo, setWipLimitDemo] = useState(2);
  const [collapsedLanes, setCollapsedLanes] = useState<Record<string, boolean>>({});

  const filteredTasks = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return tasks.filter((t) => {
      const matchPriority = priorityFilter === 'All' || t.priority === priorityFilter;
      const matchSearch =
        !q ||
        t.title.toLowerCase().includes(q) ||
        t.code.toLowerCase().includes(q) ||
        t.stream.toLowerCase().includes(q);
      return matchPriority && matchSearch;
    });
  }, [tasks, searchQuery, priorityFilter]);

  const moveTaskToColumn = (taskId: string, targetCol: KanbanColumnId) => {
    const targetTask = tasks.find((t) => t.id === taskId);
    if (!targetTask || targetTask.columnId === targetCol) return;

    playUiMotionSound('pop');
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, columnId: targetCol } : t))
    );
    const colLabel = COLUMNS.find((c) => c.id === targetCol)?.title || targetCol;
    triggerToast('Kartu Dipindahkan', `${targetTask.code} dipindahkan ke ${colLabel}.`, 'info');
  };

  const stepTaskColumn = (taskId: string, delta: -1 | 1) => {
    const targetTask = tasks.find((t) => t.id === taskId);
    if (!targetTask) return;
    const idx = COLUMNS.findIndex((c) => c.id === targetTask.columnId);
    const nextIdx = idx + delta;
    if (nextIdx < 0 || nextIdx >= COLUMNS.length) return;
    moveTaskToColumn(taskId, COLUMNS[nextIdx].id);
  };

  const handleDeleteTask = (taskId: string) => {
    const target = tasks.find((t) => t.id === taskId);
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
    playUiMotionSound('tick');
    if (target) {
      triggerToast('Kartu Dihapus', `${target.code} dihapus dari papan Kanban.`, 'info');
    }
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    const title = newTaskTitle.trim();
    if (!title) return;
    const nextNumber = 116 + tasks.length;
    const newItem: KanbanTask = {
      id: `k-${Date.now()}`,
      code: `UI-${nextNumber}`,
      title,
      stream: 'Design System',
      priority: 'Medium',
      assignee: { name: 'Raka Pratama', initials: 'RP', bg: 'bg-[#FEF1F5]', text: 'text-[#9D113C]' },
      dueDate: '30 Nov',
      checklistDone: 0,
      checklistTotal: 3,
      columnId: newTaskCol,
    };
    setTasks((prev) => [newItem, ...prev]);
    setNewTaskTitle('');
    setComposerOpen(false);
    playUiMotionSound('pop');
    triggerToast('Tugas Ditambahkan', `${newItem.code} ditambahkan ke papan.`, 'success');
  };

  const toggleLane = (laneId: string) => {
    playUiMotionSound('tick');
    setCollapsedLanes((prev) => ({ ...prev, [laneId]: !prev[laneId] }));
  };

  return (
    <UiDocPage
      title="Kanban Board"
      description="Papan alur kerja berbasis kolom dengan drag-and-drop, tombol pindah cepat aksesibel, filter prioritas, serta peringatan batas WIP."
      subLinks={[
        { id: 'knb-interactive', label: 'Interactive Kanban Board' },
        { id: 'knb-swimlanes', label: 'WIP Limit & Swimlane View' },
      ]}
    >
      <UiDocSection
        id="knb-interactive"
        title="Interactive Kanban Board (Drag & Drop + Quick Move)"
        description="Seret kartu antar kolom atau gunakan tombol panah kiri/kanan pada kartu untuk memindahkan status tugas secara instan."
        classesHint="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3.5 / draggable + onDrop"
        codeSnippet={KANBAN_CODE_SNIPPET}
        actions={
          <button
            type="button"
            onClick={() => setComposerOpen((prev) => !prev)}
            className={ACTION_BTN_PRIMARY}
          >
            <Plus className="w-3.5 h-3.5 shrink-0" />
            <span>Tambah Kartu</span>
          </button>
        }
      >
        <div className="space-y-4">
          {/* Toolbar: Search & Priority Filter */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <div className="relative flex-1 max-w-xs">
              <Search className="w-3.5 h-3.5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari kode atau judul tugas..."
                aria-label="Cari tugas Kanban"
                className="w-full h-9 pl-8 pr-3 rounded-lg border border-gray-300 bg-white text-xs text-gray-900 placeholder:text-gray-500 focus:outline-none focus:border-[#ee2e65]"
              />
            </div>

            <div className="inline-flex items-center gap-1 p-1 rounded-lg bg-gray-100 border border-gray-300 self-start sm:self-auto">
              {(['All', 'High', 'Medium', 'Low'] as const).map((prio) => (
                <button
                  key={prio}
                  type="button"
                  onClick={() => {
                    playUiMotionSound('tick');
                    setPriorityFilter(prio);
                  }}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer ${
                    priorityFilter === prio
                      ? 'bg-white text-gray-900 shadow-2xs font-semibold'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {prio}
                </button>
              ))}
            </div>
          </div>

          {/* Inline Add Card Form */}
          <AnimatePresence initial={false}>
            {composerOpen && (
              <motion.form
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1, transition: { duration: 0.18, ease: [0.23, 1, 0.32, 1] } }}
                exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.14 } }}
                onSubmit={handleAddTask}
                className="p-3.5 rounded-xl border border-gray-300 bg-[#FAFBFD] flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5"
              >
                <input
                  type="text"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder="Tulis judul tugas baru..."
                  className="flex-1 h-9 px-3 rounded-lg border border-gray-300 bg-white text-xs text-gray-900 placeholder:text-gray-500 focus:outline-none focus:border-[#ee2e65]"
                />
                <select
                  value={newTaskCol}
                  onChange={(e) => setNewTaskCol(e.target.value as KanbanColumnId)}
                  aria-label="Pilih kolom tujuan"
                  className="h-9 px-3 rounded-lg border border-gray-300 bg-white text-xs font-medium text-gray-800 focus:outline-none focus:border-[#ee2e65]"
                >
                  {COLUMNS.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title}
                    </option>
                  ))}
                </select>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => setComposerOpen(false)}
                    className="h-9 px-3 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-xs font-medium text-gray-700 cursor-pointer whitespace-nowrap"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="h-9 px-3.5 rounded-lg bg-[#ee2e65] hover:bg-[#d82256] text-white text-xs font-semibold cursor-pointer whitespace-nowrap"
                  >
                    Simpan
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>

          {/* 4-Column Board */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3.5">
            {COLUMNS.map((col, colIdx) => {
              const colTasks = filteredTasks.filter((t) => t.columnId === col.id);
              const totalInCol = tasks.filter((t) => t.columnId === col.id).length;
              const isOverWip = col.wipLimit !== null && totalInCol > col.wipLimit;
              const isDropTarget = dragOverCol === col.id;

              return (
                <div
                  key={col.id}
                  onDragOver={(e) => {
                    e.preventDefault();
                    if (dragOverCol !== col.id) setDragOverCol(col.id);
                  }}
                  onDragLeave={() => {
                    if (dragOverCol === col.id) setDragOverCol(null);
                  }}
                  onDrop={() => {
                    if (draggedTaskId) {
                      moveTaskToColumn(draggedTaskId, col.id);
                    }
                    setDraggedTaskId(null);
                    setDragOverCol(null);
                  }}
                  className={`rounded-2xl border p-3 flex flex-col gap-2.5 min-h-[260px] transition-colors duration-200 ${
                    isDropTarget
                      ? 'border-[#ee2e65] bg-[#FEF1F5]/40'
                      : isOverWip
                      ? 'border-amber-400 bg-amber-50/30'
                      : 'border-gray-300 bg-[#FAFBFD]'
                  }`}
                >
                  {/* Column Header */}
                  <div className="flex items-center justify-between gap-2 px-0.5 pb-1 border-b border-gray-200">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className={`w-2 h-2 rounded-full shrink-0 ${col.dotColor}`} />
                      <h4 className="text-xs font-semibold text-gray-900 truncate">{col.title}</h4>
                    </div>
                    <span
                      className={`text-[11px] font-semibold tabular-nums shrink-0 ${
                        isOverWip ? 'text-amber-800' : 'text-gray-600'
                      }`}
                    >
                      {col.wipLimit !== null ? `${totalInCol}/${col.wipLimit}` : totalInCol}
                    </span>
                  </div>

                  {isOverWip && (
                    <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-amber-50 border border-amber-200 text-[11px] font-medium text-amber-900">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>Melebihi batas WIP ({totalInCol}/{col.wipLimit})</span>
                    </div>
                  )}

                  {/* Column Task Cards */}
                  <div className="space-y-2.5 flex-1">
                    {colTasks.length === 0 ? (
                      <div className="h-28 rounded-xl border border-dashed border-gray-300 flex items-center justify-center text-[11.5px] text-gray-500 text-center px-3">
                        Tidak ada kartu di kolom ini
                      </div>
                    ) : (
                      colTasks.map((task) => {
                        const prioStyle = PRIORITY_STYLES[task.priority];
                        const isDragging = draggedTaskId === task.id;
                        return (
                          <article
                            key={task.id}
                            draggable
                            onDragStart={() => setDraggedTaskId(task.id)}
                            onDragEnd={() => {
                              setDraggedTaskId(null);
                              setDragOverCol(null);
                            }}
                            className={`rounded-xl border border-gray-300 bg-white p-3 space-y-2.5 cursor-grab active:cursor-grabbing transition-[opacity,transform,box-shadow] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:shadow-sm ${
                              isDragging ? 'opacity-50 scale-[0.98]' : 'opacity-100'
                            }`}
                          >
                            {/* Top Row: Unboxed Metadata + Priority + Drag Handle */}
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-1.5 text-[11px] text-gray-600 font-medium min-w-0 truncate tabular-nums">
                                <GripVertical className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                                <span className="font-mono font-semibold text-gray-800">{task.code}</span>
                                <span aria-hidden="true">·</span>
                                <span className="truncate">{task.stream}</span>
                              </div>
                              <span
                                className={`px-1.5 py-0.5 rounded text-[10px] font-semibold shrink-0 ${prioStyle.bg} ${prioStyle.text}`}
                              >
                                {prioStyle.label}
                              </span>
                            </div>

                            {/* Card Title */}
                            <h5 className="text-xs font-semibold text-gray-900 leading-snug">
                              {task.title}
                            </h5>

                            {/* Subtasks + Due Date */}
                            <div className="flex items-center justify-between text-[11px] text-gray-600 tabular-nums">
                              <span className="inline-flex items-center gap-1">
                                <CheckSquare className="w-3.5 h-3.5 text-gray-500" />
                                <span>
                                  {task.checklistDone}/{task.checklistTotal}
                                </span>
                              </span>
                              <span>Tenggat {task.dueDate}</span>
                            </div>

                            {/* Footer: Assignee + Accessible Move & Delete */}
                            <div className="pt-2 border-t border-gray-200 flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2 min-w-0">
                                <span
                                  className={`w-6 h-6 rounded-full ${task.assignee.bg} ${task.assignee.text} text-[10px] font-bold flex items-center justify-center shrink-0`}
                                >
                                  {task.assignee.initials}
                                </span>
                                <span className="text-[11px] font-medium text-gray-700 truncate">
                                  {task.assignee.name}
                                </span>
                              </div>

                              <div className="flex items-center gap-1 shrink-0">
                                <button
                                  type="button"
                                  disabled={colIdx === 0}
                                  onClick={() => stepTaskColumn(task.id, -1)}
                                  title="Pindah ke kolom kiri"
                                  aria-label={`Pindah ${task.code} ke kiri`}
                                  className="w-6 h-6 rounded-md border border-gray-300 bg-white hover:bg-gray-100 disabled:opacity-35 disabled:cursor-not-allowed flex items-center justify-center text-gray-700 cursor-pointer"
                                >
                                  <ArrowLeft className="w-3 h-3" />
                                </button>
                                <button
                                  type="button"
                                  disabled={colIdx === COLUMNS.length - 1}
                                  onClick={() => stepTaskColumn(task.id, 1)}
                                  title="Pindah ke kolom kanan"
                                  aria-label={`Pindah ${task.code} ke kanan`}
                                  className="w-6 h-6 rounded-md border border-gray-300 bg-white hover:bg-gray-100 disabled:opacity-35 disabled:cursor-not-allowed flex items-center justify-center text-gray-700 cursor-pointer"
                                >
                                  <ArrowRight className="w-3 h-3" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteTask(task.id)}
                                  title="Hapus kartu"
                                  aria-label={`Hapus ${task.code}`}
                                  className="w-6 h-6 rounded-md border border-gray-300 bg-white hover:bg-rose-50 hover:border-rose-300 hover:text-rose-700 flex items-center justify-center text-gray-600 cursor-pointer"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          </article>
                        );
                      })
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </UiDocSection>

      <UiDocSection
        id="knb-swimlanes"
        title="Compact Swimlane & WIP Limit Policy"
        description="Pengelompokan tugas horizontal per stream kerja dengan batas Work-In-Progress (WIP) dinamis yang dapat disesuaikan."
        classesHint="rounded-2xl border border-gray-300 bg-white divide-y divide-gray-200"
        codeSnippet={SWIMLANE_CODE_SNIPPET}
        actions={
          <div className="inline-flex items-center gap-2 text-xs">
            <span className="text-gray-600 font-medium">Batas WIP:</span>
            <div className="inline-flex items-center rounded-lg border border-gray-300 bg-white overflow-hidden">
              {[1, 2, 3].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setWipLimitDemo(n)}
                  className={`px-2.5 py-1 text-xs font-semibold tabular-nums cursor-pointer transition-colors ${
                    wipLimitDemo === n
                      ? 'bg-[#1C1D21] text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        }
      >
        <div className="space-y-3">
          {(['High', 'Medium', 'Low'] as TaskPriority[]).map((prio) => {
            const laneTasks = tasks.filter((t) => t.priority === prio);
            const activeWip = laneTasks.filter((t) => t.columnId === 'in_progress' || t.columnId === 'review').length;
            const collapsed = Boolean(collapsedLanes[prio]);
            const exceeded = activeWip > wipLimitDemo;

            return (
              <div
                key={prio}
                className="rounded-2xl border border-gray-300 bg-white overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggleLane(prio)}
                  className="w-full px-4 py-3 flex flex-wrap items-center justify-between gap-2 bg-[#FAFBFD] hover:bg-gray-100/70 transition-colors cursor-pointer text-left"
                >
                  <div className="flex items-center gap-2.5 text-xs">
                    {collapsed ? (
                      <ChevronDown className="w-4 h-4 text-gray-600 shrink-0" />
                    ) : (
                      <ChevronUp className="w-4 h-4 text-gray-600 shrink-0" />
                    )}
                    <span className="font-semibold text-gray-900">Prioritas {prio}</span>
                    <span aria-hidden="true" className="text-gray-400">·</span>
                    <span className="text-gray-600 tabular-nums">{laneTasks.length} tugas total</span>
                  </div>

                  <div className="flex items-center gap-2 text-xs tabular-nums">
                    <span
                      className={`px-2 py-0.5 rounded-md font-semibold ${
                        exceeded
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}
                    >
                      Aktif {activeWip}/{wipLimitDemo} {exceeded ? '· Overload' : '· Normal'}
                    </span>
                  </div>
                </button>

                {!collapsed && (
                  <div className="p-3 grid grid-cols-1 md:grid-cols-3 gap-2.5 border-t border-gray-200">
                    {laneTasks.map((t) => {
                      const colLabel = COLUMNS.find((c) => c.id === t.columnId)?.title || t.columnId;
                      return (
                        <div
                          key={t.id}
                          className="p-3 rounded-xl border border-gray-200 bg-white flex flex-col justify-between gap-2"
                        >
                          <div className="flex items-center justify-between text-[11px] text-gray-600 tabular-nums">
                            <span className="font-mono font-semibold text-gray-800">{t.code}</span>
                            <span className="font-medium text-gray-700">{colLabel}</span>
                          </div>
                          <div className="text-xs font-semibold text-gray-900 leading-snug">
                            {t.title}
                          </div>
                          <div className="text-[11px] text-gray-600 flex items-center justify-between tabular-nums">
                            <span>{t.assignee.name}</span>
                            <span>{t.dueDate}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </UiDocSection>
    </UiDocPage>
  );
};
