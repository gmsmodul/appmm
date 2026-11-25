import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Search,
  Download,
  CheckCircle2,
  Clock,
  ChevronRight,
  MoreHorizontal,
  Eye,
  Check,
  CheckSquare,
  Square,
  MinusSquare,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UiDocPage, UiDocSection } from './UiDocBlock';
import { CustomSelect } from '../ui/CustomSelect';
import { HorizontalSlideTrack } from '../ui/HorizontalSlideTrack';

interface TableUiKitProps {
  activeSubJump?: string;
}

export const TableUiKit: React.FC<TableUiKitProps> = ({ activeSubJump }) => {
  const { triggerToast } = useApp();

  const isVisible = (itemKey: string) => {
    if (!activeSubJump) return true;
    return activeSubJump.toLowerCase().replace(/[^a-z0-9]/g, '') === itemKey.toLowerCase().replace(/[^a-z0-9]/g, '');
  };

  // ==========================================
  // 1. BASIC TABLE STATES
  // ==========================================
  const [basicSearch, setBasicSearch] = useState('');

  const basicData = [
    {
      id: 1,
      name: 'James Wilson',
      role: 'Student · Gr 12',
      email: 'james.w@uikit.design',
      classCode: 'Class 302',
      status: 'Active',
      ctxBg: 'bg-emerald-50/60',
      badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    {
      id: 2,
      name: 'Sarah Anderson',
      role: 'Honor Roll · Gr 12',
      email: 'sarah.a@uikit.design',
      classCode: 'Class 302',
      status: 'Honor Roll',
      ctxBg: 'bg-primary-50/60',
      badge: 'bg-primary-50 text-primary-700 border-primary-200',
    },
    {
      id: 3,
      name: 'Emily Carter',
      role: 'Student · Gr 12',
      email: 'emily.c@uikit.design',
      classCode: 'Class 303',
      status: 'Pending Review',
      ctxBg: 'bg-amber-50/70',
      badge: 'bg-amber-50 text-amber-700 border-amber-200',
    },
    {
      id: 4,
      name: 'Brandon Wright',
      role: 'Student · Gr 10',
      email: 'brandon.w@uikit.design',
      classCode: 'Class 303',
      status: 'Active',
      ctxBg: 'bg-white',
      badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    {
      id: 5,
      name: 'Hannah Turner',
      role: 'Student · Gr 12',
      email: 'hannah.t@uikit.design',
      classCode: 'Class 302',
      status: 'Needs Support',
      ctxBg: 'bg-rose-50/60',
      badge: 'bg-rose-50 text-rose-700 border-rose-200',
    },
  ];

  const filteredBasicData = basicData.filter(
    (r) =>
      r.name.toLowerCase().includes(basicSearch.toLowerCase()) ||
      r.classCode.toLowerCase().includes(basicSearch.toLowerCase())
  );

  // ==========================================
  // 2. DATA TABLE STATES
  // ==========================================
  const [dataSearch, setDataSearch] = useState('');
  const [dataClassFilter, setDataClassFilter] = useState('All');
  const [dataStatusFilter, setDataStatusFilter] = useState('All');
  const [dataSortCol, setDataSortCol] = useState<'name' | 'classCode' | 'rate' | 'score'>('name');
  const [dataSortDir, setDataSortDir] = useState<'asc' | 'desc'>('asc');
  const [dataSelectedIds, setDataSelectedIds] = useState<number[]>([2]);
  const [dataPage, setDataPage] = useState(1);
  const [dataPageSize, setDataPageSize] = useState(5);

  const rawDataTableData = [
    { id: 1, name: 'James Wilson', classCode: 'Class 302', subject: 'Mathematics', rate: 96, score: 88, status: 'Active', date: '11 Feb 2026' },
    { id: 2, name: 'Sarah Anderson', classCode: 'Class 302', subject: 'Mathematics', rate: 98, score: 94, status: 'Honor Roll', date: '11 Feb 2026' },
    { id: 3, name: 'Emily Carter', classCode: 'Class 302', subject: 'Mathematics', rate: 92, score: 82, status: 'Active', date: '10 Feb 2026' },
    { id: 4, name: 'Hannah Turner', classCode: 'Class 302', subject: 'Mathematics', rate: 72, score: 65, status: 'Needs Support', date: '09 Feb 2026' },
    { id: 5, name: 'Alice Lindqvist', classCode: 'Class 303', subject: 'Physics', rate: 99, score: 96, status: 'Honor Roll', date: '08 Feb 2026' },
    { id: 6, name: 'Brandon Wright', classCode: 'Class 303', subject: 'Physics', rate: 91, score: 84, status: 'Active', date: '08 Feb 2026' },
    { id: 7, name: 'Chloe Martin', classCode: 'Class 303', subject: 'Physics', rate: 94, score: 89, status: 'Active', date: '07 Feb 2026' },
    { id: 8, name: 'George Hill', classCode: 'Class 304', subject: 'Fine Arts', rate: 93, score: 86, status: 'Active', date: '06 Feb 2026' },
    { id: 9, name: 'Isabella Scott', classCode: 'Class 304', subject: 'Fine Arts', rate: 97, score: 95, status: 'Honor Roll', date: '05 Feb 2026' },
    { id: 10, name: 'Olivia Brown', classCode: 'Class 305', subject: 'English', rate: 95, score: 91, status: 'Honor Roll', date: '04 Feb 2026' },
    { id: 11, name: 'Laura Miller', classCode: 'Class 305', subject: 'English', rate: 94, score: 87, status: 'Active', date: '03 Feb 2026' },
    { id: 12, name: 'David Kim', classCode: 'Class 303', subject: 'Physics', rate: 95, score: 92, status: 'Active', date: '02 Feb 2026' },
  ];

  const filteredDataTable = useMemo(() => {
    return rawDataTableData
      .filter((row) => {
        const matchesSearch =
          row.name.toLowerCase().includes(dataSearch.toLowerCase()) ||
          row.classCode.toLowerCase().includes(dataSearch.toLowerCase()) ||
          row.subject.toLowerCase().includes(dataSearch.toLowerCase());
        const matchesClass = dataClassFilter === 'All' || row.classCode === dataClassFilter;
        const matchesStatus = dataStatusFilter === 'All' || row.status === dataStatusFilter;
        return matchesSearch && matchesClass && matchesStatus;
      })
      .sort((a, b) => {
        const factor = dataSortDir === 'asc' ? 1 : -1;
        if (dataSortCol === 'name') return factor * a.name.localeCompare(b.name);
        if (dataSortCol === 'classCode') return factor * a.classCode.localeCompare(b.classCode);
        if (dataSortCol === 'rate') return factor * (a.rate - b.rate);
        if (dataSortCol === 'score') return factor * (a.score - b.score);
        return 0;
      });
  }, [dataSearch, dataClassFilter, dataStatusFilter, dataSortCol, dataSortDir]);

  const totalPages = Math.ceil(filteredDataTable.length / dataPageSize) || 1;
  const pagedDataTable = useMemo(() => {
    const start = (dataPage - 1) * dataPageSize;
    return filteredDataTable.slice(start, start + dataPageSize);
  }, [filteredDataTable, dataPage, dataPageSize]);

  const handleSelectAllToggle = () => {
    if (dataSelectedIds.length === pagedDataTable.length) {
      setDataSelectedIds([]);
    } else {
      setDataSelectedIds(pagedDataTable.map((r) => r.id));
    }
  };

  const handleToggleRowSelect = (id: number) => {
    setDataSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSortCol = (col: 'name' | 'classCode' | 'rate' | 'score') => {
    if (dataSortCol === col) {
      setDataSortDir(dataSortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setDataSortCol(col);
      setDataSortDir('asc');
    }
  };

  const handleExportCsv = () => {
    const header = 'ID,Name,Class,Subject,Attendance,Score,Status\n';
    const rows = filteredDataTable
      .map((r) => `${r.id},"${r.name}","${r.classCode}","${r.subject}",${r.rate}%,${r.score},"${r.status}"`)
      .join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'uikit-data-table.csv';
    a.click();
    URL.revokeObjectURL(url);
    triggerToast('Export Table (CSV)', `${filteredDataTable.length} baris berhasil diunduh.`, 'success');
  };

  // ==========================================
  // 3. ADVANCE TABLE UI STATES
  // ==========================================
  const [expandedRows, setExpandedRows] = useState<number[]>([1]);
  const [advanceMenuOpenId, setAdvanceMenuOpenId] = useState<number | null>(null);
  const [advanceHoverEnabled, setAdvanceHoverEnabled] = useState(true);
  const advanceMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (advanceMenuOpenId === null) return;
    const onPointerDown = (e: MouseEvent) => {
      if (advanceMenuRef.current && !advanceMenuRef.current.contains(e.target as Node)) {
        setAdvanceMenuOpenId(null);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setAdvanceMenuOpenId(null);
    };
    document.addEventListener('mousedown', onPointerDown);
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [advanceMenuOpenId]);

  const [advanceRows, setAdvanceRows] = useState([
    {
      id: 1,
      course: 'Calculus IV: Multivariable Integrals',
      instructor: 'Dr. Hendra (Design Lead)',
      classCode: 'Class 302',
      type: 'video',
      videoDuration: '38:15',
      watchProgress: 100,
      isWatchedCompleted: true,
      studentsEnrolled: 24,
      status: 'Completed',
      tags: ['Calculus', 'Video', 'Term 1'],
      breakdown: {
        totalLectures: 12,
        completedLectures: 12,
        avgScore: '94.2%',
        lastActive: 'Today at 09:15 am',
        notes: 'Semua mahasiswa telah menonton rekaman materi video sampai menit terakhir.',
      },
    },
    {
      id: 2,
      course: 'Electromagnetic Induction Practical B',
      instructor: 'Dr. Hendra (Design Lead)',
      classCode: 'Class 303',
      type: 'video',
      videoDuration: '45:00',
      watchProgress: 65,
      isWatchedCompleted: false,
      studentsEnrolled: 22,
      status: 'In Progress',
      tags: ['Physics', 'Lab', 'Induction'],
      breakdown: {
        totalLectures: 10,
        completedLectures: 6,
        avgScore: '88.5%',
        lastActive: 'Yesterday',
        notes: '65% video terselesaikan. Menit 28:00 fokus pada demonstrasi kumparan Faraday.',
      },
    },
    {
      id: 3,
      course: 'Comparative Modernist Poetry Analysis',
      instructor: 'Dr. Hendra (Design Lead)',
      classCode: 'Class 305',
      type: 'document',
      videoDuration: '—',
      watchProgress: 0,
      isWatchedCompleted: false,
      studentsEnrolled: 21,
      status: 'Draft',
      tags: ['Literature', 'MLA Format'],
      breakdown: {
        totalLectures: 8,
        completedLectures: 2,
        avgScore: '91.0%',
        lastActive: '3 days ago',
        notes: 'Handout PDF silabus dan panduan esai komparatif telah terbit.',
      },
    },
    {
      id: 4,
      course: 'Gouache Tonal Value & Still Life Studio',
      instructor: 'Dr. Hendra (Design Lead)',
      classCode: 'Class 304',
      type: 'video',
      videoDuration: '24:00',
      watchProgress: 10,
      isWatchedCompleted: false,
      studentsEnrolled: 20,
      status: 'Needs Review',
      tags: ['Studio', 'Fine Arts'],
      breakdown: {
        totalLectures: 6,
        completedLectures: 1,
        avgScore: '86.0%',
        lastActive: '5 days ago',
        notes: 'Video tutorial teknik mixing palet telah diunggah.',
      },
    },
  ]);

  const toggleRowExpand = (id: number) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleAdvanceStatusChange = (id: number, newStatus: string) => {
    setAdvanceRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
    triggerToast('Status Updated', `Status materi diubah menjadi ${newStatus}.`, 'success');
  };

  const handleAdvanceVideoToggle = (id: number) => {
    setAdvanceRows((prev) =>
      prev.map((r) => {
        if (r.id !== id) return r;
        const nowCompleted = !r.isWatchedCompleted;
        return {
          ...r,
          isWatchedCompleted: nowCompleted,
          watchProgress: nowCompleted ? 100 : 0,
        };
      })
    );
    triggerToast('Progress Video Diperbarui', 'Status menonton video diperbarui.', 'info');
  };

  const renderBasicTable = (
    variant: 'regular' | 'striped' | 'bordered' | 'borderless' | 'hover' | 'small' | 'large' | 'contextual' | 'pastel',
    headOpt: 'light' | 'dark' | 'pastel' = 'light',
    rowsLimit = 4
  ) => {
    const rowsToShow = filteredBasicData.slice(0, rowsLimit);
    const cellPad =
      variant === 'small' ? 'py-1.5 px-3' : variant === 'large' ? 'py-4 px-5' : 'py-3 px-4';
    const cellBorder = variant === 'bordered' ? 'border-r border-gray-300 last:border-r-0' : '';
    return (
      <HorizontalSlideTrack
        fadeEdges={false}
        indicatorSize="wide"
        accent="primary"
        trackClassName=""
        indicatorClassName="pb-2"
      >
        <table className={`w-full text-left border-collapse text-sm ${variant === 'bordered' ? 'border-y border-gray-300' : ''}`}>
          <thead>
            <tr
              className={`text-xs font-semibold uppercase tracking-wider ${
                variant === 'borderless' ? '' : 'border-b border-gray-300'
              } ${
                headOpt === 'dark'
                  ? 'bg-gray-900 text-white'
                  : headOpt === 'pastel' || variant === 'pastel'
                  ? 'bg-[#FEF1F5] text-[#9D113C]'
                  : 'bg-gray-50 text-gray-600'
              }`}
            >
              <th className={cellPad}>No</th>
              <th className={cellPad}>Nama Mahasiswa</th>
              <th className={cellPad}>Email Kampus</th>
              <th className={cellPad}>Kelas</th>
              <th className={cellPad}>Status</th>
            </tr>
          </thead>
          <tbody
            className={
              variant === 'borderless'
                ? ''
                : variant === 'striped'
                ? 'divide-y divide-gray-200'
                : 'divide-y divide-gray-200'
            }
          >
            {rowsToShow.map((row, idx) => {
              const isEven = idx % 2 === 1;
              return (
                <tr
                  key={row.id}
                  className={`transition-colors ${
                    variant === 'contextual'
                      ? row.ctxBg
                      : variant === 'striped' && isEven
                      ? 'bg-gray-50/70'
                      : 'bg-white'
                  } ${variant === 'hover' ? 'hover:bg-primary-50/50' : 'hover:bg-gray-50/40'}`}
                >
                  <td className={`${cellPad} ${cellBorder} text-xs font-mono text-gray-500 tabular-nums`}>
                    0{row.id}
                  </td>
                  <td className={`${cellPad} ${cellBorder} font-semibold text-gray-900`}>
                    <div>{row.name}</div>
                    <div className="text-xs text-gray-500 font-normal">{row.role}</div>
                  </td>
                  <td className={`${cellPad} ${cellBorder} text-gray-600 text-xs`}>{row.email}</td>
                  <td className={`${cellPad} ${cellBorder} text-gray-700 font-medium text-xs`}>{row.classCode}</td>
                  <td className={cellPad}>
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${row.badge}`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </HorizontalSlideTrack>
    );
  };

  return (
    <div className="space-y-10 print-section">
      {/* 5.1 BASIC TABLES */}
      {isVisible('basictables') && (
        <UiDocPage
          title="Basic Tables"
          subLinks={[
            { id: 'tbl-regular', label: 'Regular Table' },
            { id: 'tbl-dark', label: 'Dark Header' },
            { id: 'tbl-pastel', label: 'Pastel Header' },
            { id: 'tbl-striped', label: 'Striped Rows' },
            { id: 'tbl-hover', label: 'Hoverable Rows' },
            { id: 'tbl-bordered', label: 'Bordered Table' },
            { id: 'tbl-borderless', label: 'Borderless Table' },
            { id: 'tbl-sm', label: 'Small Table' },
            { id: 'tbl-lg', label: 'Large Table' },
            { id: 'tbl-contextual', label: 'Contextual Table' },
          ]}
        >
          <UiDocSection
            id="tbl-regular"
            title="Regular Table & Quick Search"
            classesHint="w-full text-left border-collapse text-sm"
            codeSnippet={`<table className="w-full text-left border-collapse text-sm">\n  <thead className="bg-gray-50 text-xs uppercase border-b border-gray-300">...</thead>\n  <tbody className="divide-y divide-gray-200">...</tbody>\n</table>`}
            noPadding
            actions={
              <div className="relative text-xs">
                <Search className="w-3.5 h-3.5 text-gray-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={basicSearch}
                  onChange={(e) => setBasicSearch(e.target.value)}
                  placeholder="Filter baris tabel..."
                  className="pl-8 pr-2.5 py-1 rounded-md border border-gray-300 bg-white text-xs placeholder:text-gray-500 focus:outline-none focus:border-gray-900"
                />
              </div>
            }
          >
            {renderBasicTable('regular', 'light', 5)}
          </UiDocSection>

          <UiDocSection
            id="tbl-dark"
            title="Dark Header (.thead-dark)"
            classesHint="thead: bg-gray-900 text-white"
            codeSnippet={`<thead className="bg-gray-900 text-white text-xs uppercase">...</thead>`}
            noPadding
          >
            {renderBasicTable('regular', 'dark', 3)}
          </UiDocSection>

          <UiDocSection
            id="tbl-pastel"
            title="Pastel Header (.thead-pastel)"
            classesHint="thead: bg-[#FEF1F5] text-[#9D113C]"
            codeSnippet={`<thead className="bg-[#FEF1F5] text-[#9D113C] text-xs uppercase">...</thead>`}
            noPadding
          >
            {renderBasicTable('pastel', 'pastel', 3)}
          </UiDocSection>

          <UiDocSection
            id="tbl-striped"
            title="Striped Rows (.table-striped)"
            classesHint="even:bg-gray-50/70"
            codeSnippet={`<tr className="even:bg-gray-50/70">...</tr>`}
            noPadding
          >
            {renderBasicTable('striped', 'light', 4)}
          </UiDocSection>

          <UiDocSection
            id="tbl-hover"
            title="Hoverable Rows (.table-hover)"
            classesHint="hover:bg-primary-50/50"
            codeSnippet={`<tr className="hover:bg-primary-50/50">...</tr>`}
            noPadding
          >
            {renderBasicTable('hover', 'light', 4)}
          </UiDocSection>

          <UiDocSection
            id="tbl-bordered"
            title="Bordered Table (.table-bordered)"
            classesHint="border-r border-gray-300"
            codeSnippet={`<td className="py-3 px-4 border-r border-gray-300 last:border-r-0">...</td>`}
            noPadding
          >
            {renderBasicTable('bordered', 'light', 3)}
          </UiDocSection>

          <UiDocSection
            id="tbl-borderless"
            title="Borderless Table (.table-borderless)"
            classesHint="divide-none"
            codeSnippet={`<tbody className="divide-none">...</tbody>`}
            noPadding
          >
            {renderBasicTable('borderless', 'light', 3)}
          </UiDocSection>

          <UiDocSection
            id="tbl-sm"
            title="Small Table (.table-sm)"
            classesHint="py-1.5 px-3"
            codeSnippet={`<td className="py-1.5 px-3">Compact</td>`}
            noPadding
          >
            {renderBasicTable('small', 'light', 3)}
          </UiDocSection>

          <UiDocSection
            id="tbl-lg"
            title="Large Table (.table-lg)"
            classesHint="py-4 px-5"
            codeSnippet={`<td className="py-4 px-5">Spacious</td>`}
            noPadding
          >
            {renderBasicTable('large', 'light', 3)}
          </UiDocSection>

          <UiDocSection
            id="tbl-contextual"
            title="Contextual Table"
            classesHint="bg-emerald-50/60 / bg-primary-50/60 / bg-amber-50/70 / bg-rose-50/60"
            codeSnippet={`<tr className="bg-emerald-50/60">...</tr>\n<tr className="bg-amber-50/70">...</tr>`}
            noPadding
          >
            {renderBasicTable('contextual', 'light', 5)}
          </UiDocSection>
        </UiDocPage>
      )}

      {/* 5.2 DATA TABLES */}
      {isVisible('datatables') && (
        <UiDocPage title="Data Tables">
          <UiDocSection
            title="Search, Filter, Sort, Bulk Select & Export CSV"
            description="Centang baris untuk memunculkan bilah aksi massal, klik judul kolom untuk mengurutkan, atau ekspor ke CSV."
            classesHint="overflow-x-auto / divide-y divide-gray-200 / tabular-nums"
            codeSnippet={`<div className="border border-gray-300 rounded-xl overflow-hidden">\n  <DataTableToolbar onSearch={setSearch} onExport={handleExportCsv} />\n  <table className="w-full text-left text-sm">...</table>\n</div>`}
            noPadding
          >
            <div>
              {/* Top Toolbar */}
              <div className="p-4 border-b border-gray-300 bg-gray-50/50 flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="relative flex-1 max-w-sm">
                  <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={dataSearch}
                    onChange={(e) => {
                      setDataSearch(e.target.value);
                      setDataPage(1);
                    }}
                    placeholder="Cari nama, kelas, atau mapel..."
                    className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-white border border-gray-300 text-xs placeholder:text-gray-500 focus:outline-none focus:border-gray-900"
                  />
                  {dataSearch && (
                    <button
                      onClick={() => setDataSearch('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-gray-500 hover:text-gray-800"
                    >
                      ×
                    </button>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <CustomSelect
                    size="sm"
                    value={dataClassFilter}
                    onChange={(val) => {
                      setDataClassFilter(val);
                      setDataPage(1);
                    }}
                    ariaLabel="Filter kelas tabel"
                    options={[
                      { value: 'All', label: 'Semua Kelas' },
                      { value: 'Class 302', label: 'Class 302' },
                      { value: 'Class 303', label: 'Class 303' },
                      { value: 'Class 304', label: 'Class 304' },
                      { value: 'Class 305', label: 'Class 305' },
                    ]}
                  />

                  <CustomSelect
                    size="sm"
                    value={dataStatusFilter}
                    onChange={(val) => {
                      setDataStatusFilter(val);
                      setDataPage(1);
                    }}
                    ariaLabel="Filter status tabel"
                    options={[
                      { value: 'All', label: 'Semua Status' },
                      { value: 'Honor Roll', label: 'Honor Roll' },
                      { value: 'Active', label: 'Active' },
                      { value: 'Needs Support', label: 'Needs Support' },
                    ]}
                  />

                  <button
                    onClick={handleExportCsv}
                    className="px-3 py-1.5 rounded-lg border border-gray-300 bg-white hover:bg-gray-100 text-gray-700 font-semibold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export CSV</span>
                  </button>
                </div>
              </div>

              {/* Bulk Action Bar */}
              {dataSelectedIds.length > 0 && (
                <div className="px-4 py-2.5 bg-primary-50 border-b border-primary-100 flex items-center justify-between text-xs animate-ui-slide-down">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-primary-900 tabular-nums">
                      {dataSelectedIds.length} baris terpilih
                    </span>
                    <button
                      onClick={() => setDataSelectedIds([])}
                      className="text-primary-600 hover:underline cursor-pointer"
                    >
                      Batalkan pilihan
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => triggerToast('Aksi Massal', `${dataSelectedIds.length} baris telah diekspor.`, 'success')}
                      className="px-2.5 py-1 rounded-md bg-white border border-primary-200 text-primary-800 font-semibold hover:bg-primary-100/60 cursor-pointer"
                    >
                      Ekspor Terpilih
                    </button>
                    <button
                      onClick={() => triggerToast('Aksi Massal', `Status ${dataSelectedIds.length} siswa diset Active.`, 'success')}
                      className="px-2.5 py-1 rounded-md bg-primary-600 text-white font-semibold hover:bg-primary-700 cursor-pointer"
                    >
                      Tandai Aktif
                    </button>
                  </div>
                </div>
              )}

              {/* Mobile (< 640px) Card View — Zero hidden columns behind horizontal swipe */}
              <div className="sm:hidden divide-y divide-gray-200 bg-white">
                {pagedDataTable.length === 0 ? (
                  <div className="py-8 px-4 text-center text-xs text-gray-500">
                    Tidak ada entri data yang cocok dengan kriteria pencarian.
                  </div>
                ) : (
                  pagedDataTable.map((row) => {
                    const isSelected = dataSelectedIds.includes(row.id);
                    return (
                      <div
                        key={`mob-${row.id}`}
                        className={`p-3.5 space-y-2.5 ${isSelected ? 'bg-primary-50/50' : 'bg-white'}`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-start gap-2.5 min-w-0">
                            <button
                              type="button"
                              onClick={() => handleToggleRowSelect(row.id)}
                              aria-label={`Pilih ${row.name}`}
                              className="touch-target-44 -ml-1.5 px-1.5 flex items-center justify-center cursor-pointer text-gray-500 hover:text-gray-900 shrink-0"
                            >
                              {isSelected ? <CheckSquare className="w-4 h-4 text-primary-600" /> : <Square className="w-4 h-4" />}
                            </button>
                            <div className="min-w-0">
                              <div className="font-semibold text-sm text-gray-900 truncate">{row.name}</div>
                              <div className="text-[11px] text-gray-500 tabular-nums">
                                #{row.id.toString().padStart(3, '0')} · {row.classCode} ({row.subject})
                              </div>
                            </div>
                          </div>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[11px] font-semibold border whitespace-nowrap shrink-0 ${
                              row.status === 'Honor Roll'
                                ? 'bg-primary-50 text-primary-700 border-primary-200'
                                : row.status === 'Active'
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                : 'bg-rose-50 text-rose-700 border-rose-200'
                            }`}
                          >
                            {row.status}
                          </span>
                        </div>

                        <div className="flex items-center justify-between gap-3 pt-1 text-xs tabular-nums">
                          <div className="flex items-center gap-3 text-gray-600">
                            <span>
                              Hadir: <strong className="text-gray-900">{row.rate}%</strong>
                            </span>
                            <span>
                              Skor: <strong className="text-gray-900">{row.score}/100</strong>
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => triggerToast(row.name, `Membuka rekam jejak akademik ${row.classCode}`, 'info')}
                            className="touch-target-44 px-3 py-1 rounded-lg border border-gray-300 text-xs font-semibold text-gray-700 hover:bg-gray-100 whitespace-nowrap shrink-0 cursor-pointer"
                          >
                            Detail
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Desktop (>= 640px) Data Table */}
              <div className="hidden sm:block">
                <HorizontalSlideTrack
                  fadeEdges={false}
                  indicatorSize="wide"
                  accent="primary"
                  trackClassName=""
                  indicatorClassName="pb-2"
                >
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wider border-b border-gray-300 select-none">
                        <th className="py-3 px-4 w-10">
                          <button
                            type="button"
                            onClick={handleSelectAllToggle}
                            className="flex items-center justify-center cursor-pointer text-gray-500 hover:text-gray-900"
                            title="Pilih Semua"
                          >
                            {dataSelectedIds.length === pagedDataTable.length && pagedDataTable.length > 0 ? (
                              <CheckSquare className="w-4 h-4 text-primary-600" />
                            ) : dataSelectedIds.length > 0 ? (
                              <MinusSquare className="w-4 h-4 text-primary-600" />
                            ) : (
                              <Square className="w-4 h-4" />
                            )}
                          </button>
                        </th>

                        <th onClick={() => handleSortCol('name')} className="py-3 px-4 cursor-pointer hover:text-gray-900 group">
                          <div className="flex items-center gap-1 font-semibold">
                            <span>Nama Mahasiswa</span>
                            {dataSortCol === 'name' ? (
                              dataSortDir === 'asc' ? <ArrowUp className="w-3.5 h-3.5 text-primary-600" /> : <ArrowDown className="w-3.5 h-3.5 text-primary-600" />
                            ) : (
                              <ArrowUpDown className="w-3 h-3 text-gray-500 group-hover:text-gray-700" />
                            )}
                          </div>
                        </th>

                        <th onClick={() => handleSortCol('classCode')} className="py-3 px-4 cursor-pointer hover:text-gray-900 group">
                          <div className="flex items-center gap-1 font-semibold">
                            <span>Kelas & Mapel</span>
                            {dataSortCol === 'classCode' && (
                              dataSortDir === 'asc' ? <ArrowUp className="w-3.5 h-3.5 text-primary-600" /> : <ArrowDown className="w-3.5 h-3.5 text-primary-600" />
                            )}
                          </div>
                        </th>

                        <th onClick={() => handleSortCol('rate')} className="py-3 px-4 cursor-pointer hover:text-gray-900 group">
                          <div className="flex items-center gap-1 font-semibold">
                            <span>Kehadiran</span>
                            {dataSortCol === 'rate' && (
                              dataSortDir === 'asc' ? <ArrowUp className="w-3.5 h-3.5 text-primary-600" /> : <ArrowDown className="w-3.5 h-3.5 text-primary-600" />
                            )}
                          </div>
                        </th>

                        <th onClick={() => handleSortCol('score')} className="py-3 px-4 cursor-pointer hover:text-gray-900 group">
                          <div className="flex items-center gap-1 font-semibold">
                            <span>Nilai Skor</span>
                            {dataSortCol === 'score' && (
                              dataSortDir === 'asc' ? <ArrowUp className="w-3.5 h-3.5 text-primary-600" /> : <ArrowDown className="w-3.5 h-3.5 text-primary-600" />
                            )}
                          </div>
                        </th>

                        <th className="py-3 px-4 font-semibold">Status</th>
                        <th className="py-3 px-4 font-semibold text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {pagedDataTable.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="py-8 text-center text-xs text-gray-500">
                            Tidak ada entri data yang cocok dengan kriteria pencarian.
                          </td>
                        </tr>
                      ) : (
                        pagedDataTable.map((row) => {
                          const isSelected = dataSelectedIds.includes(row.id);
                          return (
                            <tr key={row.id} className={`transition-colors duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] ${isSelected ? 'bg-primary-50/50' : 'hover:bg-gray-50/70'}`}>
                              <td className="py-3 px-4">
                                <button
                                  type="button"
                                  onClick={() => handleToggleRowSelect(row.id)}
                                  className="flex items-center justify-center cursor-pointer text-gray-500 hover:text-gray-900"
                                >
                                  {isSelected ? <CheckSquare className="w-4 h-4 text-primary-600" /> : <Square className="w-4 h-4" />}
                                </button>
                              </td>

                              <td className="py-3 px-4">
                                <div className="font-semibold text-gray-900">{row.name}</div>
                                <div className="text-xs text-gray-500 tabular-nums">ID #{row.id.toString().padStart(3, '0')}</div>
                              </td>

                              <td className="py-3 px-4">
                                <div className="text-xs font-semibold text-gray-800">{row.classCode}</div>
                                <div className="text-xs text-gray-500">{row.subject}</div>
                              </td>

                              <td className="py-3 px-4">
                                <div className="flex items-center gap-2 tabular-nums">
                                  <span className="font-semibold text-xs text-gray-900">{row.rate}%</span>
                                  <div className="w-16 bg-gray-200 h-1.5 rounded-full overflow-hidden">
                                    <div
                                      className={`h-full rounded-full ${
                                        row.rate >= 95 ? 'bg-emerald-500' : row.rate >= 85 ? 'bg-primary-500' : 'bg-rose-500'
                                      }`}
                                      style={{ width: `${row.rate}%` }}
                                    />
                                  </div>
                                </div>
                              </td>

                              <td className="py-3 px-4 font-semibold text-gray-900 tabular-nums">{row.score}/100</td>

                              <td className="py-3 px-4">
                                <span
                                  className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                                    row.status === 'Honor Roll'
                                      ? 'bg-primary-50 text-primary-700 border-primary-200'
                                      : row.status === 'Active'
                                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                      : 'bg-rose-50 text-rose-700 border-rose-200'
                                  }`}
                                >
                                  {row.status}
                                </span>
                              </td>

                              <td className="py-3 px-4 text-right">
                                <button
                                  onClick={() => triggerToast(row.name, `Membuka rekam jejak akademik ${row.classCode}`, 'info')}
                                  className="px-2.5 py-1 rounded-lg border border-gray-300 text-xs font-medium text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
                                >
                                  Detail
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </HorizontalSlideTrack>
              </div>

              {/* Pagination */}
              <div className="px-4 py-3 bg-gray-50/70 border-t border-gray-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-gray-600 tabular-nums">
                <div className="flex items-center gap-2">
                  <span>Tampilkan</span>
                  <CustomSelect
                    size="sm"
                    value={String(dataPageSize)}
                    onChange={(val) => {
                      setDataPageSize(Number(val));
                      setDataPage(1);
                    }}
                    ariaLabel="Jumlah baris per halaman"
                    options={[
                      { value: '5', label: '5 baris' },
                      { value: '10', label: '10 baris' },
                    ]}
                  />
                  <span>
                    {(dataPage - 1) * dataPageSize + 1} – {Math.min(dataPage * dataPageSize, filteredDataTable.length)} dari {filteredDataTable.length} entri
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    disabled={dataPage === 1}
                    onClick={() => setDataPage((p) => Math.max(1, p - 1))}
                    className="px-2.5 py-1 rounded border border-gray-300 bg-white hover:bg-gray-100 disabled:opacity-40 cursor-pointer"
                  >
                    Sebelumnya
                  </button>
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setDataPage(i + 1)}
                      className={`w-7 h-7 rounded text-xs font-semibold flex items-center justify-center transition-colors cursor-pointer ${
                        dataPage === i + 1
                          ? 'bg-gray-900 text-white'
                          : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    disabled={dataPage === totalPages}
                    onClick={() => setDataPage((p) => Math.min(totalPages, p + 1))}
                    className="px-2.5 py-1 rounded border border-gray-300 bg-white hover:bg-gray-100 disabled:opacity-40 cursor-pointer"
                  >
                    Selanjutnya
                  </button>
                </div>
              </div>
            </div>
          </UiDocSection>
        </UiDocPage>
      )}

      {/* 5.3 ADVANCE TABLE UI */}
      {isVisible('advancetableui') && (
        <UiDocPage title="Advance Table UI">
          <UiDocSection
            title="Expandable Rows, Video Progress & Inline Status"
            description="Klik panah pada kolom pertama untuk membuka rincian baris atau ubah progres video langsung."
            classesHint="divide-y divide-gray-200 / hover:bg-primary-50/40"
            codeSnippet={`<React.Fragment key={row.id}>\n  <tr>...master row...</tr>\n  {isExpanded && <tr><td colSpan={6}>...accordion detail...</td></tr>}\n</React.Fragment>`}
            noPadding
            actions={
              <button
                onClick={() => setAdvanceHoverEnabled(!advanceHoverEnabled)}
                className={`px-3 py-1 rounded-md text-xs font-semibold border cursor-pointer ${
                  advanceHoverEnabled
                    ? 'bg-primary-50 text-primary-700 border-primary-200'
                    : 'bg-gray-100 text-gray-700 border-gray-300'
                }`}
              >
                Table Hover: {advanceHoverEnabled ? 'Aktif' : 'Basic'}
              </button>
            }
          >
            <div>
              <HorizontalSlideTrack
                fadeEdges={false}
                indicatorSize="wide"
                accent="primary"
                trackClassName=""
                indicatorClassName="pb-2"
              >
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wider border-b border-gray-300">
                      <th className="py-3.5 px-4 w-10">Expand</th>
                      <th className="py-3.5 px-4 w-[32%]">Modul & Kursus</th>
                      <th className="py-3.5 px-4 w-[16%]">Kelas & Pengajar</th>
                      <th className="py-3.5 px-4 w-[28%]">Progress Materi Video</th>
                      <th className="py-3.5 px-4 w-[14%]">Status Inline</th>
                      <th className="py-3.5 px-4 w-12 text-right">Opsi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {advanceRows.map((row) => {
                      const isExpanded = expandedRows.includes(row.id);
                      const isVideo = row.type === 'video';

                      return (
                        <React.Fragment key={row.id}>
                          <tr className={`transition-colors duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] ${advanceHoverEnabled ? 'hover:bg-primary-50/40' : ''} ${isExpanded ? 'bg-primary-50/20' : ''}`}>
                            <td className="py-3.5 px-4 align-top">
                              <button
                                type="button"
                                onClick={() => toggleRowExpand(row.id)}
                                className="w-7 h-7 rounded-lg hover:bg-gray-200/70 flex items-center justify-center text-gray-500 transition-all duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] cursor-pointer"
                                title={isExpanded ? 'Tutup Rincian' : 'Buka Rincian'}
                              >
                                <ChevronRight
                                  className={`w-4 h-4 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                                    isExpanded ? 'rotate-90 text-primary-600' : ''
                                  }`}
                                />
                              </button>
                            </td>

                            <td className="py-3.5 px-4 align-top">
                              <div
                                className="font-bold text-gray-900 hover:text-primary-600 cursor-pointer"
                                onClick={() => toggleRowExpand(row.id)}
                              >
                                {row.course}
                              </div>
                              <div className="flex flex-wrap items-center gap-1.5 mt-1">
                                {row.tags.map((t, i) => (
                                  <span
                                    key={i}
                                    className="px-2 py-0.5 rounded-full bg-gray-100 text-[11px] font-medium text-gray-600"
                                  >
                                    {t}
                                  </span>
                                ))}
                              </div>
                            </td>

                            <td className="py-3.5 px-4 align-top">
                              <div className="font-semibold text-xs text-gray-900">{row.classCode}</div>
                              <div className="text-xs text-gray-600 mt-0.5">{row.instructor}</div>
                              <div className="text-xs text-gray-500 mt-0.5 tabular-nums">{row.studentsEnrolled} Siswa</div>
                            </td>

                            <td className="py-3.5 px-4 align-top">
                              {isVideo ? (
                                <div className="space-y-1.5">
                                  <div className="flex items-center justify-between text-xs">
                                    <span className="font-semibold text-gray-800 flex items-center gap-1">
                                      {row.isWatchedCompleted ? (
                                        <>
                                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                          <span className="text-emerald-700">Sudah Ditonton Habis</span>
                                        </>
                                      ) : row.watchProgress > 0 ? (
                                        <>
                                          <Clock className="w-3.5 h-3.5 text-amber-600" />
                                          <span className="text-amber-800 tabular-nums">Ditonton {row.watchProgress}%</span>
                                        </>
                                      ) : (
                                        <span className="text-gray-500">Belum Ditonton</span>
                                      )}
                                    </span>
                                    <span className="font-mono text-xs font-bold text-gray-700 tabular-nums">
                                      {row.watchProgress}%
                                    </span>
                                  </div>

                                  <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                                    <div
                                      className={`h-full rounded-full transition-all duration-[260ms] ease-[cubic-bezier(0.23,1,0.32,1)] ${
                                        row.isWatchedCompleted
                                          ? 'bg-emerald-500'
                                          : row.watchProgress > 0
                                          ? 'bg-amber-500'
                                          : 'bg-transparent'
                                      }`}
                                      style={{ width: `${row.watchProgress}%` }}
                                    />
                                  </div>

                                  <div className="flex items-center justify-between text-[11px] text-gray-500 tabular-nums">
                                    <span>Durasi: {row.videoDuration}</span>
                                    <button
                                      onClick={() => handleAdvanceVideoToggle(row.id)}
                                      className="text-primary-600 hover:text-primary-800 font-semibold cursor-pointer"
                                    >
                                      {row.isWatchedCompleted ? 'Reset' : 'Tandai 100%'}
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 font-medium text-xs">
                                  Dokumen PDF Terverifikasi
                                </span>
                              )}
                            </td>

                            <td className="py-3.5 px-4 align-top">
                              <CustomSelect
                                size="sm"
                                value={row.status}
                                onChange={(val) => handleAdvanceStatusChange(row.id, val)}
                                ariaLabel={`Status baris ${row.course}`}
                                triggerClassName="font-semibold"
                                options={[
                                  { value: 'Completed', label: 'Completed' },
                                  { value: 'In Progress', label: 'In Progress' },
                                  { value: 'Needs Review', label: 'Needs Review' },
                                  { value: 'Draft', label: 'Draft' },
                                ]}
                              />
                            </td>

                            <td className="py-3.5 px-4 align-top text-right">
                              <div
                                ref={advanceMenuOpenId === row.id ? advanceMenuRef : undefined}
                                className="relative inline-block"
                              >
                                <button
                                  onClick={() => setAdvanceMenuOpenId(advanceMenuOpenId === row.id ? null : row.id)}
                                  className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-500 cursor-pointer"
                                >
                                  <MoreHorizontal className="w-4 h-4" />
                                </button>

                                {advanceMenuOpenId === row.id && (
                                  <div className="absolute right-0 top-9 w-44 bg-white/95 backdrop-blur-sm rounded-xl shadow-[0_14px_28px_-10px_rgba(15,23,42,0.16)] border border-gray-300 p-1.5 z-40 space-y-1 text-left text-xs animate-ui-pop origin-top-right">
                                    <button
                                      onClick={() => {
                                        setAdvanceMenuOpenId(null);
                                        toggleRowExpand(row.id);
                                      }}
                                      className="w-full px-2.5 py-1.5 rounded-md hover:bg-gray-100 flex items-center gap-2 text-gray-700 transition-colors duration-200 cursor-pointer"
                                    >
                                      <Eye className="w-3.5 h-3.5 text-gray-500" />
                                      <span>Lihat Rincian</span>
                                    </button>
                                    <button
                                      onClick={() => {
                                        setAdvanceMenuOpenId(null);
                                        handleAdvanceVideoToggle(row.id);
                                      }}
                                      className="w-full px-2.5 py-1.5 rounded-md hover:bg-gray-100 flex items-center gap-2 text-gray-700 transition-colors duration-200 cursor-pointer"
                                    >
                                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                                      <span>Tandai Selesai</span>
                                    </button>
                                    <button
                                      onClick={() => {
                                        setAdvanceMenuOpenId(null);
                                        triggerToast('Unduhan Dimulai', `Mengunduh silabus ${row.course}`, 'info');
                                      }}
                                      className="w-full px-2.5 py-1.5 rounded-md hover:bg-gray-100 flex items-center gap-2 text-gray-700 transition-colors duration-200 cursor-pointer"
                                    >
                                      <Download className="w-3.5 h-3.5 text-gray-500" />
                                      <span>Download Silabus</span>
                                    </button>
                                  </div>
                                )}
                              </div>
                            </td>
                          </tr>

                          {isExpanded && (
                            <tr className="bg-gray-50/70">
                              <td colSpan={6} className="px-6 py-4 border-t border-b border-gray-300">
                                <div className="space-y-3 animate-ui-slide-down">
                                  <div className="flex items-center justify-between border-b border-gray-300 pb-2">
                                    <span className="text-xs font-bold uppercase tracking-wider text-primary-900">
                                      Rincian Modul & Perkembangan Mahasiswa
                                    </span>
                                    <span className="text-xs text-gray-500">
                                      Aktivitas terakhir: {row.breakdown.lastActive}
                                    </span>
                                  </div>

                                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
                                    <div className="pt-1 sm:pt-0">
                                      <div className="text-gray-500">Penyelesaian Sesi</div>
                                      <div className="text-base font-bold text-gray-900 mt-0.5 tabular-nums">
                                        {row.breakdown.completedLectures} / {row.breakdown.totalLectures} Sesi
                                      </div>
                                    </div>
                                    <div className="pt-2 sm:pt-0 sm:pl-4">
                                      <div className="text-gray-500">Nilai Rata-rata Kelas</div>
                                      <div className="text-base font-bold text-gray-900 mt-0.5 tabular-nums">
                                        {row.breakdown.avgScore}
                                      </div>
                                    </div>
                                    <div className="pt-2 sm:pt-0 sm:pl-4">
                                      <div className="text-gray-500">Tingkat Ketuntasan</div>
                                      <div className="text-base font-bold text-emerald-600 mt-0.5 tabular-nums">
                                        {Math.round((row.breakdown.completedLectures / row.breakdown.totalLectures) * 100)}%
                                      </div>
                                    </div>
                                  </div>

                                  <div className="text-xs text-gray-700 bg-amber-50/70 p-3 rounded-lg border border-amber-200/70">
                                    <strong>Catatan Dosen:</strong> {row.breakdown.notes}
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </tbody>
                </table>
              </HorizontalSlideTrack>
            </div>
          </UiDocSection>
        </UiDocPage>
      )}
    </div>
  );
};
