import React, { useState } from 'react';
import {
  Play,
  Monitor,
  Search,
  Camera,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UiDocPage, UiDocSection } from './UiDocBlock';
import { MULTIMEDIA_COLOR_FAMILIES, isLightHex } from '../../constants/multimediaColors';
import { IconFontsSection } from './IconFontsSection';

interface UtilitiesUiKitProps {
  activeSubJump?: string;
}

export const UtilitiesUiKit: React.FC<UtilitiesUiKitProps> = ({ activeSubJump }) => {
  const { triggerToast } = useApp();

  // Interactive states
  const [gridGutter, setGridGutter] = useState<'gap-2' | 'gap-4' | 'gap-6'>('gap-4');
  const [gridReversed, setGridReversed] = useState(false);
  const [rowColsCount, setRowColsCount] = useState<2 | 3 | 4>(3);
  const [bgOpacity, setBgOpacity] = useState<100 | 75 | 50 | 25 | 10>(100);
  const [borderSize, setBorderSize] = useState<'border' | 'border-2' | 'border-4'>('border-2');
  const [selectedColorHex, setSelectedColorHex] = useState('#ee2e65');
  const [selectedColorToken, setSelectedColorToken] = useState('primary');
  const [colorQuery, setColorQuery] = useState('');
  const [embedRatio, setEmbedRatio] = useState<'aspect-21/9' | 'aspect-video' | 'aspect-4/3' | 'aspect-square'>('aspect-video');
  const [spacingPad, setSpacingPad] = useState<'p-2' | 'p-4' | 'p-6'>('p-4');

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard?.writeText(text);
    triggerToast('Disalin', `${label} (${text}) disalin ke papan klip.`, 'success');
  };

  const isVisible = (itemKey: string) => {
    if (!activeSubJump) return true;
    return activeSubJump.toLowerCase().replace(/[^a-z0-9]/g, '') === itemKey.toLowerCase().replace(/[^a-z0-9]/g, '');
  };

  return (
    <div className="space-y-10 print-section">
      {/* 1.1 GRID */}
      {isVisible('grid') && (
        <UiDocPage
          title="Grid"
          subLinks={[
            { id: 'grid-basic', label: 'Basic Structure' },
            { id: 'grid-system', label: 'Grid System' },
            { id: 'grid-mix', label: 'Mix and match' },
            { id: 'grid-gutters', label: 'Gutters' },
            { id: 'grid-reorder', label: 'Reordering' },
            { id: 'grid-rowcols', label: 'Row Column' },
          ]}
        >
          <UiDocSection
            id="grid-basic"
            title="Basic Structure"
            classesHint="grid grid-cols-12 gap-4 col-span-4"
            codeSnippet={`<div className="grid grid-cols-12 gap-4">\n  <div className="col-span-4">Kolom 1</div>\n  <div className="col-span-4">Kolom 2</div>\n  <div className="col-span-4">Kolom 3</div>\n</div>`}
          >
            <div className="grid grid-cols-12 gap-4 text-center text-sm font-medium">
              <div className="col-span-4 p-3 rounded-lg bg-[#FEF1F5] text-[#9D113C] border border-[#FDE0E9]">col-span-4</div>
              <div className="col-span-4 p-3 rounded-lg bg-[#FEF1F5] text-[#9D113C] border border-[#FDE0E9]">col-span-4</div>
              <div className="col-span-4 p-3 rounded-lg bg-[#FEF1F5] text-[#9D113C] border border-[#FDE0E9]">col-span-4</div>
            </div>
          </UiDocSection>

          <UiDocSection
            id="grid-system"
            title="Grid System"
            classesHint="grid grid-cols-12 gap-4 col-span-12 md:col-span-8 md:col-span-4"
            codeSnippet={`<div className="grid grid-cols-12 gap-4">\n  <div className="col-span-12 md:col-span-8">Area Konten Utama</div>\n  <div className="col-span-12 md:col-span-4">Panel Samping</div>\n</div>`}
          >
            <div className="grid grid-cols-12 gap-4 text-center text-sm font-medium">
              <div className="col-span-12 md:col-span-8 p-3 rounded-lg bg-gray-900 text-white">col-span-12 md:col-span-8</div>
              <div className="col-span-12 md:col-span-4 p-3 rounded-lg bg-[#E6F9F0] text-[#146C43] border border-[#C4F0DC]">col-span-12 md:col-span-4</div>
            </div>
          </UiDocSection>

          <UiDocSection
            id="grid-mix"
            title="Mix and match"
            classesHint="col-span-12 md:col-span-6 lg:col-span-8"
            codeSnippet={`<div className="grid grid-cols-12 gap-4">\n  <div className="col-span-12 md:col-span-6 lg:col-span-8">8 kolom di desktop, 6 di tablet</div>\n  <div className="col-span-6 md:col-span-6 lg:col-span-4">4 kolom di desktop, 6 di tablet</div>\n</div>`}
          >
            <div className="grid grid-cols-12 gap-4 text-center text-sm font-medium">
              <div className="col-span-12 md:col-span-6 lg:col-span-8 p-3 rounded-lg bg-[#FFF5E6] text-[#8C5811] border border-[#FDE6C4]">
                col-12 md:col-6 lg:col-8
              </div>
              <div className="col-span-6 md:col-span-6 lg:col-span-4 p-3 rounded-lg bg-[#FFECEB] text-[#942922] border border-[#FAD2CF]">
                col-6 md:col-6 lg:col-4
              </div>
            </div>
          </UiDocSection>

          <UiDocSection
            id="grid-gutters"
            title="Gutters"
            classesHint={`grid grid-cols-2 ${gridGutter}`}
            codeSnippet={`<div className="grid grid-cols-2 ${gridGutter}">\n  <div>Sel Kiri</div>\n  <div>Sel Kanan</div>\n</div>`}
            actions={
              <div className="flex items-center gap-1 text-xs">
                {(['gap-2', 'gap-4', 'gap-6'] as const).map((g) => (
                  <button
                    key={g}
                    onClick={() => setGridGutter(g)}
                    className={`px-2.5 py-1 rounded-md font-medium cursor-pointer ${
                      gridGutter === g ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            }
          >
            <div className={`grid grid-cols-2 ${gridGutter} text-center text-sm font-medium`}>
              <div className="p-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-700">Gutter Kiri ({gridGutter})</div>
              <div className="p-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-700">Gutter Kanan ({gridGutter})</div>
            </div>
          </UiDocSection>

          <UiDocSection
            id="grid-reorder"
            title="Reordering"
            classesHint="order-1 order-2 order-3"
            codeSnippet={`<div className="grid grid-cols-3 gap-4">\n  <div className="${gridReversed ? 'order-3' : 'order-1'}">First in DOM</div>\n  <div className="order-2">Second in DOM</div>\n  <div className="${gridReversed ? 'order-1' : 'order-3'}">Third in DOM</div>\n</div>`}
            actions={
              <button
                onClick={() => setGridReversed(!gridReversed)}
                className="px-3 py-1 rounded-md bg-primary-50 text-primary-700 text-xs font-semibold cursor-pointer hover:bg-primary-100"
              >
                {gridReversed ? 'Urutan: Terbalik' : 'Urutan: Normal'}
              </button>
            }
          >
            <div className="grid grid-cols-3 gap-4 text-center text-sm font-medium">
              <div className={`p-3 rounded-lg border ${gridReversed ? 'order-3 bg-primary-50 border-primary-200 text-primary-800' : 'order-1 bg-gray-50 border-gray-300'}`}>
                First in DOM (Order {gridReversed ? 3 : 1})
              </div>
              <div className="p-3 rounded-lg bg-gray-50 border border-gray-300 order-2">
                Second in DOM (Order 2)
              </div>
              <div className={`p-3 rounded-lg border ${gridReversed ? 'order-1 bg-emerald-50 border-emerald-200 text-emerald-800' : 'order-3 bg-gray-50 border-gray-300'}`}>
                Third in DOM (Order {gridReversed ? 1 : 3})
              </div>
            </div>
          </UiDocSection>

          <UiDocSection
            id="grid-rowcols"
            title="Row Column"
            classesHint={`grid grid-cols-${rowColsCount} gap-4`}
            codeSnippet={`<div className="grid grid-cols-${rowColsCount} gap-4">\n  <div>Item #1</div>\n  <div>Item #2</div>\n  ...\n</div>`}
            actions={
              <div className="flex gap-1 text-xs">
                {([2, 3, 4] as const).map((cnt) => (
                  <button
                    key={cnt}
                    onClick={() => setRowColsCount(cnt)}
                    className={`px-2.5 py-1 rounded-md font-medium cursor-pointer ${
                      rowColsCount === cnt ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    cols-{cnt}
                  </button>
                ))}
              </div>
            }
          >
            <div
              className={`grid gap-4 text-center text-sm font-medium ${
                rowColsCount === 2 ? 'grid-cols-2' : rowColsCount === 3 ? 'grid-cols-3' : 'grid-cols-4'
              }`}
            >
              {Array.from({ length: rowColsCount * 2 }).map((_, i) => (
                <div key={i} className="p-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-700">
                  Row Col #{i + 1}
                </div>
              ))}
            </div>
          </UiDocSection>
        </UiDocPage>
      )}

      {/* 1.2 TYPOGRAPHY (Clean stacked Multimedia-style sections with Preview/React/Classes tabs) */}
      {isVisible('typography') && (
        <UiDocPage
          title="Typography"
          subLinks={[
            { id: 'typo-headings', label: 'Headings' },
            { id: 'typo-display', label: 'Display headings' },
            { id: 'typo-headings-icon', label: 'Headings Icon' },
            { id: 'typo-title', label: 'Title' },
            { id: 'typo-title-divider', label: 'Title with divider' },
            { id: 'typo-title-icon', label: 'Title with Icon' },
            { id: 'typo-blockquote', label: 'Blockquote' },
            { id: 'typo-customizing', label: 'Customizing headings' },
            { id: 'typo-paragraph', label: 'Paragraph' },
            { id: 'typo-lead', label: 'Lead' },
            { id: 'typo-inline', label: 'Inline text elements' },
            { id: 'typo-list', label: 'List' },
          ]}
        >
          <UiDocSection
            id="typo-headings"
            title="Headings"
            classesHint="text-[32px] text-[24px] text-[20px] text-[16px] text-[14px] text-[12px]"
            codeSnippet={`<h1 className="text-[32px] font-bold">h1. Heading Utama</h1>\n<h2 className="text-[24px] font-bold">h2. Sub Judul Seksi</h2>\n<h3 className="text-[20px] font-semibold">h3. Judul Kartu</h3>\n<h4 className="text-[16px] font-semibold">h4. Judul Kelompok</h4>\n<h5 className="text-[14px] font-semibold">h5. Label Bagian</h5>\n<h6 className="text-[12px] font-semibold">h6. Label Mikro</h6>`}
            noPadding
          >
            <div className="divide-y divide-gray-200">
              {[
                { tag: 'h1. UI KIT heading', cls: 'text-[32px] font-bold text-gray-900', spec: 'Bold 2rem (32px)' },
                { tag: 'h2. UI KIT heading', cls: 'text-[24px] font-bold text-gray-900', spec: 'Bold 1.5rem (24px)' },
                { tag: 'h3. UI KIT heading', cls: 'text-[20px] font-semibold text-gray-900', spec: 'Semibold 1.25rem (20px)' },
                { tag: 'h4. UI KIT heading', cls: 'text-[16px] font-semibold text-gray-900', spec: 'Semibold 1rem (16px)' },
                { tag: 'h5. UI KIT heading', cls: 'text-[14px] font-semibold text-gray-900', spec: 'Semibold 0.875rem (14px)' },
                { tag: 'h6. UI KIT heading', cls: 'text-[12px] font-semibold text-gray-900', spec: 'Semibold 0.75rem (12px)' },
              ].map((row) => (
                <div key={row.tag} className="px-6 py-4 flex items-center justify-between gap-4">
                  <span className={row.cls}>{row.tag}</span>
                  <span className="text-xs text-gray-500 shrink-0 tabular-nums">{row.spec}</span>
                </div>
              ))}
            </div>
          </UiDocSection>

          <UiDocSection
            id="typo-display"
            title="Display headings"
            classesHint="text-4xl font-bold tracking-tight"
            codeSnippet={`<div className="text-4xl font-bold tracking-tight">Display 1</div>\n<div className="text-3xl font-bold tracking-tight">Display 2</div>\n<div className="text-2xl font-bold tracking-tight">Display 3</div>`}
            noPadding
          >
            <div className="divide-y divide-gray-200">
              {[
                { label: 'Display 1', cls: 'text-4xl font-bold tracking-tight text-gray-950', spec: 'Bold 2.25rem (36px)' },
                { label: 'Display 2', cls: 'text-3xl font-bold tracking-tight text-gray-900', spec: 'Bold 1.875rem (30px)' },
                { label: 'Display 3', cls: 'text-2xl font-bold tracking-tight text-gray-900', spec: 'Bold 1.5rem (24px)' },
              ].map((row) => (
                <div key={row.label} className="px-6 py-4 flex items-center justify-between gap-4">
                  <span className={row.cls}>{row.label}</span>
                  <span className="text-xs text-gray-500 shrink-0 tabular-nums">{row.spec}</span>
                </div>
              ))}
            </div>
          </UiDocSection>

          <UiDocSection
            id="typo-headings-icon"
            title="Headings Icon"
            description={
              <>
                Gunakan <code className="px-1.5 py-0.5 rounded bg-gray-100 text-primary-700 font-mono text-xs">.heading-wth-icon</code> untuk menyandingkan ikon dengan judul bagian.
              </>
            }
            classesHint="flex items-center gap-3 font-semibold text-gray-900"
            codeSnippet={`<h2 className="flex items-center gap-3 text-2xl font-semibold text-gray-900">\n  <Monitor className="w-6 h-6 text-gray-700" />\n  <span>h2. UI KIT heading</span>\n</h2>`}
            noPadding
          >
            <div className="divide-y divide-gray-200">
              {[
                { label: 'h1. UI KIT heading', cls: 'text-[32px] font-semibold', iconCls: 'w-7 h-7', spec: 'Semibold 2rem (32px)' },
                { label: 'h2. UI KIT heading', cls: 'text-[24px] font-semibold', iconCls: 'w-6 h-6', spec: 'Semibold 1.5rem (24px)' },
                { label: 'h3. UI KIT heading', cls: 'text-[20px] font-semibold', iconCls: 'w-5 h-5', spec: 'Semibold 1.25rem (20px)' },
                { label: 'h4. UI KIT heading', cls: 'text-[16px] font-semibold', iconCls: 'w-4 h-4', spec: 'Semibold 1rem (16px)' },
                { label: 'h5. UI KIT heading', cls: 'text-[14px] font-semibold', iconCls: 'w-4 h-4', spec: 'Semibold 0.875rem (14px)' },
                { label: 'h6. UI KIT heading', cls: 'text-[12px] font-semibold', iconCls: 'w-3.5 h-3.5', spec: 'Semibold 0.75rem (12px)' },
              ].map((row) => (
                <div key={row.label} className="px-6 py-4 flex items-center justify-between gap-4">
                  <div className={`flex items-center gap-3 text-gray-900 ${row.cls}`}>
                    <Monitor className={`${row.iconCls} text-gray-600 shrink-0`} />
                    <span>{row.label}</span>
                  </div>
                  <span className="text-xs text-gray-500 shrink-0 tabular-nums">{row.spec}</span>
                </div>
              ))}
            </div>
          </UiDocSection>

          <UiDocSection
            id="typo-title"
            title="Title"
            description={
              <>
                Gunakan variasi kelas <code className="px-1.5 py-0.5 rounded bg-gray-100 text-primary-700 font-mono text-xs">title-lg</code>,{' '}
                <code className="px-1.5 py-0.5 rounded bg-gray-100 text-primary-700 font-mono text-xs">title</code>,{' '}
                <code className="px-1.5 py-0.5 rounded bg-gray-100 text-primary-700 font-mono text-xs">title-sm</code>, dan{' '}
                <code className="px-1.5 py-0.5 rounded bg-gray-100 text-primary-700 font-mono text-xs">title-xs</code> untuk ukuran judul komponen.
              </>
            }
            classesHint="text-[18px] text-[16px] text-[14px] text-[12px] font-semibold"
            codeSnippet={`<div className="text-[18px] font-semibold">Title Lg</div>\n<div className="text-[16px] font-semibold">Title Default</div>\n<div className="text-[14px] font-semibold">Title sm</div>\n<div className="text-[12px] font-semibold">Title xs</div>`}
            noPadding
          >
            <div className="divide-y divide-gray-200">
              {[
                { label: 'Title Lg', cls: 'text-[18px] font-semibold text-gray-900', spec: 'Semibold 1.125rem (18px)' },
                { label: 'Title Default', cls: 'text-[16px] font-semibold text-gray-900', spec: 'Semibold 1rem (16px)' },
                { label: 'Title sm', cls: 'text-[14px] font-semibold text-gray-900', spec: 'Semibold 0.875rem (14px)' },
                { label: 'Title xs', cls: 'text-[12px] font-semibold text-gray-900', spec: 'Semibold 0.75rem (12px)' },
              ].map((row) => (
                <div key={row.label} className="px-6 py-3.5 flex items-center justify-between gap-4">
                  <span className={row.cls}>{row.label}</span>
                  <span className="text-xs text-gray-500 shrink-0 tabular-nums">{row.spec}</span>
                </div>
              ))}
            </div>
          </UiDocSection>

          <UiDocSection
            id="typo-title-divider"
            title="Title with divider"
            description={
              <>
                Gunakan garis pembatas horizontal pada judul bagian dengan pola{' '}
                <code className="px-1.5 py-0.5 rounded bg-gray-100 text-primary-700 font-mono text-xs">.title-wth-divider</code>.
              </>
            }
            classesHint="flex items-center gap-4 flex-1 h-px bg-gray-300"
            codeSnippet={`<div className="flex items-center gap-4">\n  <span className="text-[16px] font-semibold text-gray-900 shrink-0">Title Default</span>\n  <span className="h-px flex-1 bg-gray-300" />\n</div>`}
            noPadding
          >
            <div className="divide-y divide-gray-200">
              {[
                { label: 'Title Lg', cls: 'text-[18px] font-semibold text-gray-900', spec: 'Semibold 1.125rem (18px)' },
                { label: 'Title Default', cls: 'text-[16px] font-semibold text-gray-900', spec: 'Semibold 1rem (16px)' },
                { label: 'Title sm', cls: 'text-[14px] font-semibold text-gray-900', spec: 'Semibold 0.875rem (14px)' },
                { label: 'Title xs', cls: 'text-[12px] font-semibold text-gray-900', spec: 'Semibold 0.75rem (12px)' },
              ].map((row) => (
                <div key={row.label} className="px-6 py-3.5 flex items-center gap-4">
                  <span className={`${row.cls} shrink-0`}>{row.label}</span>
                  <span className="h-px flex-1 bg-gray-300" />
                  <span className="text-xs text-gray-500 shrink-0 tabular-nums">{row.spec}</span>
                </div>
              ))}
            </div>
          </UiDocSection>

          <UiDocSection
            id="typo-title-icon"
            title="Title with Icon"
            description={
              <>
                Gunakan kombinasi ikon pendamping sebelum judul untuk menegaskan kategori konten menggunakan{' '}
                <code className="px-1.5 py-0.5 rounded bg-gray-100 text-primary-700 font-mono text-xs">.title-icon</code>.
              </>
            }
            classesHint="inline-flex items-center gap-2.5 font-semibold"
            codeSnippet={`<div className="flex items-center gap-2.5 text-[16px] font-semibold text-gray-900">\n  <Monitor className="w-4 h-4 text-primary-600" />\n  <span>Title Default</span>\n</div>`}
            noPadding
          >
            <div className="divide-y divide-gray-200">
              {[
                { label: 'Title Lg', cls: 'text-[18px] font-semibold text-gray-900', iconCls: 'w-4 h-4', spec: 'Semibold 1.125rem (18px)' },
                { label: 'Title Default', cls: 'text-[16px] font-semibold text-gray-900', iconCls: 'w-4 h-4', spec: 'Semibold 1rem (16px)' },
                { label: 'Title sm', cls: 'text-[14px] font-semibold text-gray-900', iconCls: 'w-3.5 h-3.5', spec: 'Semibold 0.875rem (14px)' },
                { label: 'Title xs', cls: 'text-[12px] font-semibold text-gray-900', iconCls: 'w-3 h-3', spec: 'Semibold 0.75rem (12px)' },
              ].map((row) => (
                <div key={row.label} className="px-6 py-3.5 flex items-center justify-between gap-4">
                  <div className={`flex items-center gap-2.5 ${row.cls}`}>
                    <Monitor className={`${row.iconCls} text-gray-600 shrink-0`} />
                    <span>{row.label}</span>
                  </div>
                  <span className="text-xs text-gray-500 shrink-0 tabular-nums">{row.spec}</span>
                </div>
              ))}
            </div>
          </UiDocSection>

          <UiDocSection
            id="typo-blockquote"
            title="Blockquote"
            description={
              <>
                Untuk menyorot kutipan dari sumber lain dalam dokumen, bungkus teks menggunakan elemen{' '}
                <code className="px-1.5 py-0.5 rounded bg-gray-100 text-primary-700 font-mono text-xs">&lt;blockquote&gt;</code>.
              </>
            }
            classesHint="blockquote space-y-1.5 text-base text-gray-800"
            codeSnippet={`<blockquote className="space-y-1.5">\n  <p className="text-base text-gray-800 italic">\n    “Desain sistem yang baik membuat setiap komponen terasa konsisten, cepat, dan mudah diprediksi.”\n  </p>\n  <footer className="text-xs text-gray-500">— Panduan UI KIT Design System</footer>\n</blockquote>`}
          >
            <blockquote className="space-y-1.5">
              <p className="text-base text-gray-800">
                “Pendidikan adalah menyalakan api rasa ingin tahu, bukan sekadar mengisi bejana.”
              </p>
              <footer className="text-xs text-gray-500">
                — Plutarch dalam <cite className="italic">Panduan UI KIT</cite>
              </footer>
            </blockquote>
          </UiDocSection>

          <UiDocSection
            id="typo-customizing"
            title="Customizing headings"
            classesHint="text-2xl font-semibold text-gray-900 text-gray-500 font-normal"
            codeSnippet={`<h3 className="text-2xl font-semibold text-gray-900">\n  Fancy display heading{' '}\n  <small className="font-normal text-gray-500">Dengan teks sekunder pudar</small>\n</h3>`}
          >
            <h3 className="text-2xl font-semibold text-gray-900">
              Fancy display heading{' '}
              <small className="font-normal text-gray-500">Dengan teks sekunder pudar</small>
            </h3>
          </UiDocSection>

          <UiDocSection
            id="typo-paragraph"
            title="Paragraph"
            description={
              <>
                Gunakan variasi ukuran paragraf dengan utilitas{' '}
                <code className="px-1.5 py-0.5 rounded bg-gray-100 text-primary-700 font-mono text-xs">text-xl</code>,{' '}
                <code className="px-1.5 py-0.5 rounded bg-gray-100 text-primary-700 font-mono text-xs">text-base</code>,{' '}
                <code className="px-1.5 py-0.5 rounded bg-gray-100 text-primary-700 font-mono text-xs">text-sm</code>, dan{' '}
                <code className="px-1.5 py-0.5 rounded bg-gray-100 text-primary-700 font-mono text-xs">text-xs</code>.
              </>
            }
            classesHint="text-xl text-base text-sm text-xs leading-relaxed"
            codeSnippet={`<p className="text-xl text-gray-800">Paragraph XL...</p>\n<p className="text-base text-gray-800">Paragraph LG...</p>\n<p className="text-sm text-gray-700">Paragraph Default (14px)...</p>\n<p className="text-xs text-gray-600">Paragraph SM (12px)...</p>`}
          >
            <div className="space-y-4 text-gray-800 leading-relaxed">
              <p className="text-xl">
                <strong className="font-semibold">Paragraph XL:</strong> Ringkasan modul pembelajaran interaktif untuk seluruh kelas terhubung.
              </p>
              <p className="text-base">
                <strong className="font-semibold">Paragraph LG:</strong> Materi pembelajaran tersusun bertahap agar siswa mudah memantau pencapaian mingguan.
              </p>
              <p className="text-sm text-gray-700">
                <strong className="font-semibold">Paragraph Default (14px):</strong> Standar ukuran isi utama pada panel, tabel, dan deskripsi modul pembelajaran.
              </p>
              <p className="text-xs text-gray-600">
                <strong className="font-semibold">Paragraph SM (12px):</strong> Catatan kaki, metadata waktu unggah, serta keterangan singkat di bawah kolom input.
              </p>
            </div>
          </UiDocSection>

          <UiDocSection
            id="typo-lead"
            title="Lead"
            description={
              <>
                Tampilkan paragraf pembuka yang lebih menonjol menggunakan ukuran{' '}
                <code className="px-1.5 py-0.5 rounded bg-gray-100 text-primary-700 font-mono text-xs">text-base font-medium</code>.
              </>
            }
            classesHint="text-base sm:text-lg font-normal text-gray-700 leading-relaxed"
            codeSnippet={`<p className="text-base sm:text-lg text-gray-700 leading-relaxed">\n  Paragraf pembuka yang menonjol untuk menjelaskan ringkasan silabus pembelajaran sebelum masuk ke detail bab.\n</p>`}
          >
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
              Paragraf pembuka yang menonjol untuk menjelaskan ringkasan silabus pembelajaran sebelum siswa masuk ke detail video dan tugas mingguan.
            </p>
          </UiDocSection>

          <UiDocSection
            id="typo-inline"
            title="Inline text elements"
            classesHint="mark del ins u strong em small"
            codeSnippet={`<p className="text-sm text-gray-700">\n  Gunakan <mark>sorotan</mark>, <del>tercoret</del>, <ins>sisipan</ins>, <u>garis bawah</u>, <strong>tebal</strong>, <em>miring</em>, dan <small>teks kecil</small>.\n</p>`}
          >
            <div className="space-y-2.5 text-sm text-gray-700">
              <p>Anda dapat memakai tag <mark className="bg-amber-100 text-amber-900 px-1 rounded">mark</mark> untuk menyorot teks penting.</p>
              <p><del className="text-gray-500">Baris ini menandakan teks yang telah dihapus atau direvisi.</del></p>
              <p><ins className="underline decoration-emerald-500">Baris ini menandakan teks tambahan baru pada silabus.</ins></p>
              <p><u>Baris ini dirender dengan garis bawah.</u></p>
              <p><strong>Baris ini dirender sebagai teks tebal (bold).</strong></p>
              <p><em>Baris ini dirender sebagai teks miring (italic).</em></p>
              <p><small className="text-xs text-gray-500">Baris ini ditujukan sebagai catatan kecil (small print).</small></p>
            </div>
          </UiDocSection>

          <UiDocSection
            id="typo-list"
            title="List"
            classesHint="list-disc list-decimal list-none flex gap-4"
            codeSnippet={`<ul className="list-disc list-inside">\n  <li>Modul Video HD</li>\n  <li>Lembar Latihan PDF</li>\n</ul>`}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-700">
              <div>
                <div className="text-xs font-semibold text-gray-500 mb-2">Disc List</div>
                <ul className="list-disc list-inside space-y-1">
                  <li>Modul Video HD</li>
                  <li>Lembar Latihan PDF</li>
                  <li>Kuis Evaluasi Bab</li>
                </ul>
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-500 mb-2">Ordered List</div>
                <ol className="list-decimal list-inside space-y-1">
                  <li>Prasyarat Dasar</li>
                  <li>Inti Praktikum</li>
                  <li>Ujian Akhir Term</li>
                </ol>
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-500 mb-2">Inline List</div>
                <ul className="flex flex-wrap gap-3 text-primary-700 font-medium">
                  <li>Item 1</li>
                  <li>·</li>
                  <li>Item 2</li>
                  <li>·</li>
                  <li>Item 3</li>
                </ul>
              </div>
            </div>
          </UiDocSection>
        </UiDocPage>
      )}

      {/* 1.3 BACKGROUND */}
      {isVisible('background') && (
        <UiDocPage
          title="Background"
          subLinks={[
            { id: 'bg-solid', label: 'Solid Color' },
            { id: 'bg-dark', label: 'Dark Color' },
            { id: 'bg-grey', label: 'Grey Color' },
            { id: 'bg-opacity', label: 'Background Opacity' },
            { id: 'bg-overlay', label: 'Overlay' },
          ]}
        >
          <UiDocSection
            id="bg-solid"
            title="Solid Color"
            classesHint="bg-[#ee2e65] bg-emerald-600 bg-amber-500 bg-rose-600"
            codeSnippet={`<div className="p-3.5 rounded-lg bg-[#ee2e65] text-white">Solid Primary</div>\n<div className="p-3.5 rounded-lg bg-emerald-600 text-white">Solid Mint</div>`}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm font-semibold">
              <div className="p-3.5 rounded-lg bg-[#ee2e65] text-white">Solid Primary</div>
              <div className="p-3.5 rounded-lg bg-emerald-600 text-white">Solid Mint</div>
              <div className="p-3.5 rounded-lg bg-amber-500 text-white">Solid Amber</div>
              <div className="p-3.5 rounded-lg bg-rose-600 text-white">Solid Crimson</div>
            </div>
          </UiDocSection>

          <UiDocSection
            id="bg-dark"
            title="Dark Color"
            classesHint="bg-gray-900 bg-[#1C1D21] bg-slate-800 bg-primary-950"
            codeSnippet={`<div className="p-3.5 rounded-lg bg-gray-900 text-white">Dark Charcoal</div>`}
          >
            <div data-dark-preserve="true" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm font-semibold">
              <div className="p-3.5 rounded-lg bg-[#1C1D21] text-white border border-white/10">Carbon Dark</div>
              <div className="p-3.5 rounded-lg bg-gray-900 text-white border border-white/10">Dark Charcoal</div>
              <div className="p-3.5 rounded-lg bg-slate-800 text-white border border-white/10">Slate 800</div>
              <div className="p-3.5 rounded-lg bg-primary-950 text-white border border-white/10">Deep Rose</div>
            </div>
          </UiDocSection>

          <UiDocSection
            id="bg-grey"
            title="Grey Color"
            classesHint="bg-gray-50 bg-gray-100 bg-gray-200 bg-[#FEF1F5]"
            codeSnippet={`<div className="p-3.5 rounded-lg bg-gray-100 text-gray-800">Grey 100 Surface</div>`}
          >
            <div data-dark-preserve="true" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm font-semibold">
              <div className="p-3.5 rounded-lg bg-gray-50 text-gray-700 border border-gray-300">Grey 50</div>
              <div className="p-3.5 rounded-lg bg-gray-100 text-gray-800 border border-gray-300">Grey 100 Surface</div>
              <div className="p-3.5 rounded-lg bg-gray-200 text-gray-900">Grey 200</div>
              <div className="p-3.5 rounded-lg bg-[#FEF1F5] text-[#9D113C] border border-[#FDE0E9]">Soft Rose</div>
            </div>
          </UiDocSection>

          <UiDocSection
            id="bg-opacity"
            title="Background Opacity"
            classesHint={`opacity-${bgOpacity}`}
            codeSnippet={`<div style={{ opacity: ${bgOpacity / 100} }} className="p-3 rounded-lg bg-[#ee2e65] text-white">\n  Opacity ${bgOpacity}%\n</div>`}
            actions={
              <div className="flex gap-1 text-xs">
                {([100, 75, 50, 25, 10] as const).map((op) => (
                  <button
                    key={op}
                    onClick={() => setBgOpacity(op)}
                    className={`px-2 py-1 rounded-md font-mono cursor-pointer ${
                      bgOpacity === op ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {op}%
                  </button>
                ))}
              </div>
            }
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm font-semibold">
              <div style={{ opacity: bgOpacity / 100 }} className="p-3.5 rounded-lg bg-[#ee2e65] text-white transition-opacity">
                Primary Opacity ({bgOpacity}%)
              </div>
              <div style={{ opacity: bgOpacity / 100 }} className="p-3.5 rounded-lg bg-gray-900 text-white transition-opacity">
                Charcoal Opacity ({bgOpacity}%)
              </div>
            </div>
          </UiDocSection>

          <UiDocSection
            id="bg-overlay"
            title="Overlay"
            description="Lapisan scrim gelap di atas media agar teks putih tetap terbaca dengan kontras WCAG AA."
            classesHint="bg-gradient-to-r from-gray-950/85 via-gray-900/60 to-transparent"
            codeSnippet={`<div className="relative h-28 rounded-xl overflow-hidden">\n  <div className="absolute inset-0 bg-gray-950/65" />\n  <div className="relative z-10 text-white p-5">Teks di atas overlay</div>\n</div>`}
          >
            <div className="relative h-28 rounded-xl overflow-hidden border border-gray-300 flex items-center px-6 text-white bg-gradient-to-br from-primary-600 via-primary-700 to-slate-800">
              <div className="absolute inset-0 bg-gray-950/60" />
              <div className="relative z-10 text-sm">
                <div className="font-bold">Permukaan Media + Scrim Overlay</div>
                <div className="text-gray-200 text-xs mt-0.5">Menjaga keterbacaan teks di atas latar visual bervariasi.</div>
              </div>
            </div>
          </UiDocSection>
        </UiDocPage>
      )}

      {/* 1.4 BORDER */}
      {isVisible('border') && (
        <UiDocPage
          title="Border"
          subLinks={[
            { id: 'border-color', label: 'Border color' },
            { id: 'border-radius', label: 'Border Radius' },
            { id: 'border-size', label: 'Border Size' },
          ]}
        >
          <UiDocSection
            id="border-color"
            title="Border color"
            classesHint={`${borderSize} border-primary-500 border-emerald-500 border-rose-400`}
            codeSnippet={`<div className="p-3 rounded-lg ${borderSize} border-primary-500">Primary Border</div>\n<div className="p-3 rounded-lg ${borderSize} border-emerald-500">Mint Border</div>`}
            actions={
              <div className="flex gap-1 text-xs">
                {(['border', 'border-2', 'border-4'] as const).map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setBorderSize(sz)}
                    className={`px-2 py-1 rounded-md font-mono cursor-pointer ${
                      borderSize === sz ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {sz === 'border' ? '1px' : sz === 'border-2' ? '2px' : '4px'}
                  </button>
                ))}
              </div>
            }
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm font-medium">
              <div className={`p-3.5 rounded-lg ${borderSize} border-primary-500 bg-primary-50/30 text-primary-900`}>Border Primary</div>
              <div className={`p-3.5 rounded-lg ${borderSize} border-emerald-500 bg-emerald-50/30 text-emerald-900`}>Border Mint</div>
              <div className={`p-3.5 rounded-lg ${borderSize} border-rose-400 bg-rose-50/30 text-rose-900`}>Border Coral</div>
            </div>
          </UiDocSection>

          <UiDocSection
            id="border-radius"
            title="Border Radius"
            classesHint="rounded-none rounded-lg rounded-xl rounded-full"
            codeSnippet={`<div className="rounded-none border p-3">0px</div>\n<div className="rounded-lg border p-3">8px</div>\n<div className="rounded-full border p-3">Pill</div>`}
          >
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm font-medium text-center">
              <div className="p-3 rounded-none border-2 border-gray-400 bg-gray-50">rounded-none</div>
              <div className="p-3 rounded-lg border-2 border-gray-400 bg-gray-50">rounded-lg</div>
              <div className="p-3 rounded-xl border-2 border-gray-400 bg-gray-50">rounded-xl</div>
              <div className="p-3 rounded-full border-2 border-gray-400 bg-gray-50">rounded-full</div>
            </div>
          </UiDocSection>

          <UiDocSection
            id="border-size"
            title="Border Size"
            classesHint="border border-2 border-4"
            codeSnippet={`<div className="border p-3">1px Border</div>\n<div className="border-2 p-3">2px Border</div>\n<div className="border-4 p-3">4px Border</div>`}
          >
            <div className="grid grid-cols-3 gap-3 text-sm font-medium text-center">
              <div className="p-3 rounded-lg border border-gray-400 bg-white">1px (border)</div>
              <div className="p-3 rounded-lg border-2 border-gray-500 bg-white">2px (border-2)</div>
              <div className="p-3 rounded-lg border-4 border-gray-700 bg-white">4px (border-4)</div>
            </div>
          </UiDocSection>
        </UiDocPage>
      )}

      {/* 1.5 COLOR */}
      {isVisible('color') && (() => {
        const q = colorQuery.trim().toLowerCase();
        const filteredFamilies = MULTIMEDIA_COLOR_FAMILIES.filter(
          (fam) =>
            !q ||
            fam.name.toLowerCase().includes(q) ||
            fam.slug.toLowerCase().includes(q) ||
            (fam.semanticRole && fam.semanticRole.toLowerCase().includes(q)) ||
            fam.baseHex.toLowerCase().includes(q)
        );

        const handleSelectShade = (token: string, hex: string) => {
          setSelectedColorHex(hex);
          setSelectedColorToken(token);
          copyToClipboard(hex, token);
        };

        return (
          <UiDocPage
            title="Color"
            description="Menetapkan satu Brand Primary (Primary Rose #ee2e65), empat warna status (Success, Info, Warning, Danger), serta palet tambahan dengan masing-masing 5 tingkatan terang dan 5 tingkatan gelap."
            subLinks={[
              { id: 'color-swatches', label: 'Brand, Status & Palet Tambahan' },
              { id: 'color-text', label: 'Text Color Utilities' },
            ]}
          >
            <UiDocSection
              id="color-swatches"
              title="Hierarki Warna & 22 Palet Lengkap"
              description="Klik tingkatan warna mana saja untuk menyalin kode hex ke papan klip."
              classesHint="Brand Primary: #ee2e65 | Status: Green, Cyan, Yellow, Red | Palet Tambahan: 17 keluarga warna"
              codeSnippet={`<button className="bg-[#ee2e65] hover:bg-[#c11448] text-white px-4 py-2 rounded-lg">Brand Primary</button>\n<div className="bg-[#eff9f2] text-[#05592b] p-3 rounded-lg">Status Success</div>\n<div className="bg-[#edf9fe] text-[#075875] p-3 rounded-lg">Palet Tambahan: Sky</div>`}
              actions={
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-gray-300 bg-gray-50/70 font-mono text-[11px] font-medium text-gray-700">
                    <span
                      className="w-2.5 h-2.5 rounded-xs border border-gray-300 shrink-0"
                      style={{ backgroundColor: selectedColorHex }}
                    />
                    <span>{selectedColorHex}</span>
                  </span>
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-gray-500 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      value={colorQuery}
                      onChange={(e) => setColorQuery(e.target.value)}
                      placeholder="Cari warna atau peran..."
                      className="pl-8 pr-3 py-1.5 text-xs border border-gray-300 rounded-lg bg-white text-gray-800 placeholder:text-gray-500 focus:outline-none focus:border-primary-500 w-44 sm:w-52"
                    />
                  </div>
                  {colorQuery && (
                    <button
                      type="button"
                      onClick={() => setColorQuery('')}
                      className="text-xs px-2.5 py-1.5 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 cursor-pointer"
                    >
                      Reset
                    </button>
                  )}
                </div>
              }
            >
              {filteredFamilies.length === 0 ? (
                <div className="py-10 text-center text-sm text-gray-500">
                  Tidak ada palet warna yang cocok dengan &ldquo;{colorQuery}&rdquo;.
                </div>
              ) : (
                <div className="space-y-5">
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pb-3 border-b border-gray-300 text-xs text-gray-600">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ee2e65] shrink-0" />
                      <span className="font-semibold text-gray-900">Brand Primary:</span>
                      <span>Primary Rose <code className="font-mono text-[11px] text-gray-500">#ee2e65</code></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-900">Status:</span>
                      <span>Green, Cyan, Yellow, Red</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-900">Palet Tambahan:</span>
                      <span>Sky, Blue, Indigo, Violet, Teal</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredFamilies.map((fam) => {
                    const baseIsLight = isLightHex(fam.baseHex);
                    return (
                      <div
                        key={fam.slug}
                        className="rounded-xl overflow-hidden border border-gray-300 bg-white flex flex-col"
                      >
                        {/* 5 Light Shades (light-5 -> light-1) */}
                        {fam.lightShades.map((shade) => {
                          const lightBg = isLightHex(shade.hex);
                          return (
                            <button
                              key={shade.token}
                              type="button"
                              onClick={() => handleSelectShade(shade.token, shade.hex)}
                              style={{ backgroundColor: shade.hex }}
                              title={`Klik untuk menyalin ${shade.token} (${shade.hex})`}
                              className={`w-full px-4 py-1.5 flex items-center justify-between text-xs cursor-pointer transition-opacity duration-200 hover:opacity-90 ${
                                lightBg ? 'text-gray-700' : 'text-white'
                              }`}
                            >
                              <span className="font-medium tracking-tight">{shade.token}</span>
                              <span className="font-mono tabular-nums opacity-85">{shade.hex}</span>
                            </button>
                          );
                        })}

                        {/* Tall Base Color Band */}
                        <button
                          type="button"
                          onClick={() => handleSelectShade(fam.slug, fam.baseHex)}
                          style={{ backgroundColor: fam.baseHex }}
                          title={`Klik untuk menyalin ${fam.name} (${fam.baseHex})`}
                          className={`w-full px-4 py-4 min-h-[88px] flex flex-col justify-between text-left cursor-pointer transition-opacity duration-200 hover:opacity-95 ${
                            baseIsLight ? 'text-gray-900' : 'text-white'
                          }`}
                        >
                          <div className="w-full flex items-center justify-between gap-2 text-xs">
                            <span className="font-medium opacity-95">
                              {fam.semanticRole || ''}
                            </span>
                            <span className="font-mono tabular-nums font-semibold">
                              {fam.baseHex}
                            </span>
                          </div>
                          <div className="text-base font-bold tracking-tight">{fam.name}</div>
                        </button>

                        {/* 5 Dark Shades (dark-1 -> dark-5) */}
                        {fam.darkShades.map((shade) => {
                          const lightBg = isLightHex(shade.hex);
                          return (
                            <button
                              key={shade.token}
                              type="button"
                              onClick={() => handleSelectShade(shade.token, shade.hex)}
                              style={{ backgroundColor: shade.hex }}
                              title={`Klik untuk menyalin ${shade.token} (${shade.hex})`}
                              className={`w-full px-4 py-1.5 flex items-center justify-between text-xs cursor-pointer transition-opacity duration-200 hover:opacity-90 ${
                                lightBg ? 'text-gray-900' : 'text-white'
                              }`}
                            >
                              <span className="font-medium tracking-tight">{shade.token}</span>
                              <span className="font-mono tabular-nums opacity-90">{shade.hex}</span>
                            </button>
                          );
                        })}
                      </div>
                    );
                  })}
                  </div>
                </div>
              )}
            </UiDocSection>

            <UiDocSection
              id="color-text"
              title="Text Color Utilities"
              classesHint={MULTIMEDIA_COLOR_FAMILIES.map((f) => `.text-${f.slug}`).join(' ')}
              codeSnippet={`<span className="text-[#ee2e65] font-semibold">.text-primary (Brand Primary)</span>\n<span className="text-[#22af47] font-semibold">.text-green (Status: Success)</span>\n<span className="text-[#f83f37] font-semibold">.text-red (Status: Danger)</span>\n<span className="text-[#00acf0] font-semibold">.text-sky (Palet Tambahan)</span>`}
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 text-sm font-semibold">
                {MULTIMEDIA_COLOR_FAMILIES.map((fam) => {
                  // For very bright yellow/lime/sun colors, show subtle dark badge dot beside readable text
                  const sampleHex =
                    fam.slug === 'sun' || fam.slug === 'lime'
                      ? fam.darkShades[1].hex
                      : fam.baseHex;
                  return (
                    <button
                      key={fam.slug}
                      type="button"
                      onClick={() => handleSelectShade(`text-${fam.slug}`, fam.baseHex)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-300 hover:border-gray-400 hover:bg-gray-50 hover:shadow-xs text-left cursor-pointer transition-colors duration-200"
                    >
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0 border border-black/15"
                        style={{ backgroundColor: fam.baseHex }}
                      />
                      <span style={{ color: sampleHex }} className="truncate">
                        .text-{fam.slug}
                      </span>
                    </button>
                  );
                })}
              </div>
            </UiDocSection>
          </UiDocPage>
        );
      })()}

      {/* 1.6 SHADOW */}
      {isVisible('shadow') && (
        <UiDocPage
          title="Shadow"
          subLinks={[
            { id: 'shadow-direction', label: 'Shadow Direction' },
            { id: 'shadow-hover', label: 'Shadow Hover' },
            { id: 'shadow-color', label: 'Shadow Colors Option' },
          ]}
        >
          <UiDocSection
            id="shadow-direction"
            title="Shadow Direction"
            classesHint="shadow-[0_-6px_14px_rgba(0,0,0,0.06)] shadow-[0_6px_14px_rgba(0,0,0,0.08)]"
            codeSnippet={`<div className="shadow-[0_6px_14px_rgba(0,0,0,0.08)]">Shadow Bottom</div>`}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm font-semibold text-center text-gray-800">
              <div className="p-5 bg-white rounded-xl shadow-[0_-6px_14px_rgba(0,0,0,0.06)] border border-gray-300">
                Shadow Direction: Top
              </div>
              <div className="p-5 bg-white rounded-xl shadow-[0_6px_14px_rgba(0,0,0,0.08)] border border-gray-300">
                Shadow Direction: Bottom
              </div>
            </div>
          </UiDocSection>

          <UiDocSection
            id="shadow-hover"
            title="Shadow Hover"
            classesHint="shadow-xs hover:shadow-xl transition-shadow"
            codeSnippet={`<div className="shadow-xs hover:shadow-xl transition-shadow">Hover Me</div>`}
          >
            <div className="p-5 bg-white rounded-xl shadow-xs hover:-translate-y-1.5 hover:shadow-[0_18px_36px_-12px_rgba(15,23,42,0.16)] transition-all duration-[240ms] ease-[cubic-bezier(0.23,1,0.32,1)] cursor-pointer border border-gray-300 text-sm font-semibold text-center text-gray-800">
              Arahkan kursor untuk melihat transisi bayangan hover
            </div>
          </UiDocSection>

          <UiDocSection
            id="shadow-color"
            title="Shadow Standard & Optional Color"
            description="Gunakan bayangan netral sebagai standar elevasi kartu, popover, dan modal. Bayangan berwarna hanya dipakai sebagai variasi opsional pada konteks spesifik seperti CTA kampanye atau kartu status terpilih."
            classesHint="Standar: shadow-[0_6px_16px_rgba(15,23,42,0.08)] | Opsional: shadow-[0_6px_16px_rgba(238,46,101,0.18)]"
            codeSnippet={`<div className="p-4 bg-white rounded-xl border border-gray-300 shadow-[0_6px_16px_rgba(15,23,42,0.08)]">Standar Netral</div>\n<button className="px-4 py-2 rounded-lg bg-primary-600 text-white shadow-[0_6px_16px_rgba(238,46,101,0.18)]">CTA Kampanye</button>`}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-left">
              <div className="p-4 bg-white rounded-xl border border-gray-300 shadow-[0_6px_16px_rgba(15,23,42,0.08)] flex items-center justify-between">
                <span className="font-semibold text-gray-900">Bayangan Netral (Standar)</span>
                <span className="text-[11px] text-gray-500">Default</span>
              </div>
              <div className="p-4 bg-white rounded-xl border border-gray-300 shadow-[0_6px_16px_rgba(238,46,101,0.16)] flex items-center justify-between gap-2">
                <span className="font-semibold text-gray-900">Opsional: CTA Kampanye</span>
                <button
                  type="button"
                  onClick={() => triggerToast('Tryout Nasional', 'Membuka halaman pendaftaran tryout.', 'info')}
                  className="px-2.5 py-1 rounded-lg bg-primary-600 text-white font-semibold cursor-pointer shrink-0"
                >
                  Daftar
                </button>
              </div>
              <div className="p-4 bg-white rounded-xl border border-emerald-200 shadow-[0_6px_16px_rgba(16,185,129,0.14)] flex items-center justify-between">
                <span className="font-semibold text-emerald-900">Opsional: Kartu Terpilih</span>
                <span className="text-[11px] text-emerald-700 font-medium">Aktif</span>
              </div>
            </div>
          </UiDocSection>
        </UiDocPage>
      )}

      {/* 1.7 SIZING */}
      {isVisible('sizing') && (
        <UiDocPage
          title="Sizing"
          subLinks={[
            { id: 'size-width-pct', label: 'Width in percentage' },
            { id: 'size-width-fixed', label: 'Fixed width' },
            { id: 'size-height-pct', label: 'Height in percentage' },
            { id: 'size-height-fixed', label: 'Fixed height' },
            { id: 'size-equal', label: 'Equal Height & Width' },
          ]}
        >
          <UiDocSection
            id="size-width-pct"
            title="Width in percentage"
            classesHint="w-1/4 w-1/2 w-3/4 w-full"
            codeSnippet={`<div className="w-3/4">75% Width</div>\n<div className="w-full">100% Width</div>`}
          >
            <div className="space-y-2.5 text-xs font-mono">
              <div className="w-1/4 bg-gray-100 px-3 py-2 rounded-lg">w-1/4 (25%)</div>
              <div className="w-1/2 bg-gray-100 px-3 py-2 rounded-lg">w-1/2 (50%)</div>
              <div className="w-3/4 bg-[#FEF1F5] text-[#9D113C] px-3 py-2 rounded-lg">w-3/4 (75%)</div>
              <div className="w-full bg-gray-900 text-white px-3 py-2 rounded-lg">w-full (100%)</div>
            </div>
          </UiDocSection>

          <UiDocSection
            id="size-width-fixed"
            title="Fixed width"
            classesHint="w-24 w-40 w-64"
            codeSnippet={`<div className="w-40">160px Fixed</div>`}
          >
            <div className="space-y-2.5 text-xs font-mono">
              <div className="w-28 bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-2 rounded-lg">w-28 (112px)</div>
              <div className="w-40 bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-2 rounded-lg">w-40 (160px)</div>
              <div className="w-64 bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-2 rounded-lg">w-64 (256px)</div>
            </div>
          </UiDocSection>

          <UiDocSection
            id="size-height-pct"
            title="Height in percentage"
            classesHint="h-1/3 h-2/3 h-full"
            codeSnippet={`<div className="h-32 flex items-end gap-3">\n  <div className="h-1/3">33%</div>\n  <div className="h-full">100%</div>\n</div>`}
          >
            <div className="h-32 p-3 rounded-xl bg-gray-50 border border-gray-300 flex items-end gap-3 text-xs font-mono text-center">
              <div className="h-1/3 flex-1 bg-primary-100 text-primary-800 rounded-md flex items-center justify-center">h-1/3</div>
              <div className="h-2/3 flex-1 bg-primary-200 text-primary-900 rounded-md flex items-center justify-center">h-2/3</div>
              <div className="h-full flex-1 bg-primary-600 text-white rounded-md flex items-center justify-center">h-full</div>
            </div>
          </UiDocSection>

          <UiDocSection
            id="size-height-fixed"
            title="Fixed height"
            classesHint="h-10 h-16 h-24 h-32"
            codeSnippet={`<div className="h-16 bg-emerald-50">64px Fixed</div>\n<div className="h-24 bg-emerald-100">96px Fixed</div>`}
          >
            <div className="flex flex-wrap items-end gap-4 text-xs font-mono text-center">
              <div className="w-24 h-10 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg flex items-center justify-center">h-10 (40px)</div>
              <div className="w-24 h-16 bg-emerald-100 border border-emerald-200 text-emerald-900 rounded-lg flex items-center justify-center">h-16 (64px)</div>
              <div className="w-24 h-24 bg-emerald-200 border border-emerald-300 text-emerald-950 rounded-lg flex items-center justify-center">h-24 (96px)</div>
              <div className="w-24 h-32 bg-emerald-600 text-white rounded-lg flex items-center justify-center">h-32 (128px)</div>
            </div>
          </UiDocSection>

          <UiDocSection
            id="size-equal"
            title="Equal Height & Width"
            classesHint="w-10 h-10 w-12 h-12 w-16 h-16"
            codeSnippet={`<div className="w-12 h-12 rounded-lg bg-[#ee2e65] text-white">48px</div>`}
          >
            <div className="flex items-end gap-4 text-xs font-mono">
              <div className="h-10 w-10 rounded-lg bg-gray-900 text-white flex items-center justify-center">40px</div>
              <div className="h-12 w-12 rounded-lg bg-[#ee2e65] text-white flex items-center justify-center">48px</div>
              <div className="h-16 w-16 rounded-lg bg-emerald-600 text-white flex items-center justify-center">64px²</div>
            </div>
          </UiDocSection>
        </UiDocPage>
      )}

      {/* 1.8 SPACING */}
      {isVisible('spacing') && (
        <UiDocPage
          title="Spacing"
          subLinks={[
            { id: 'space-padding', label: 'Padding' },
            { id: 'space-margin', label: 'Margin' },
            { id: 'space-gap', label: 'Gap' },
          ]}
        >
          <UiDocSection
            id="space-padding"
            title="Padding"
            classesHint={spacingPad}
            codeSnippet={`<div className="${spacingPad} bg-primary-50 rounded-lg">\n  <div>Inner Content</div>\n</div>`}
            actions={
              <div className="flex gap-1 text-xs">
                {(['p-2', 'p-4', 'p-6'] as const).map((sp) => (
                  <button
                    key={sp}
                    onClick={() => setSpacingPad(sp)}
                    className={`px-2.5 py-1 rounded-md font-mono cursor-pointer ${
                      spacingPad === sp ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {sp}
                  </button>
                ))}
              </div>
            }
          >
            <div className={`${spacingPad} bg-primary-50 border border-primary-200 rounded-xl transition-all text-xs`}>
              <div className="bg-white p-3 rounded-lg border border-gray-300 text-center font-medium text-gray-800">
                Inner Content Box ({spacingPad})
              </div>
            </div>
          </UiDocSection>

          <UiDocSection
            id="space-margin"
            title="Margin"
            classesHint="m-2 m-4 m-6"
            codeSnippet={`<div className="m-4 p-3 bg-white border rounded-lg">Margin 16px</div>`}
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
              <div className="bg-amber-50/70 border border-dashed border-amber-300 rounded-xl">
                <div className="m-2 bg-white p-2.5 rounded border border-gray-300 text-center text-gray-800">m-2 (8px)</div>
              </div>
              <div className="bg-amber-50/70 border border-dashed border-amber-300 rounded-xl">
                <div className="m-4 bg-white p-2.5 rounded border border-gray-300 text-center text-gray-800">m-4 (16px)</div>
              </div>
              <div className="bg-amber-50/70 border border-dashed border-amber-300 rounded-xl">
                <div className="m-6 bg-white p-2.5 rounded border border-gray-300 text-center text-gray-800">m-6 (24px)</div>
              </div>
            </div>
          </UiDocSection>

          <UiDocSection
            id="space-gap"
            title="Gap"
            classesHint="flex gap-4"
            codeSnippet={`<div className="flex gap-4">\n  <div>Item A</div>\n  <div>Item B</div>\n</div>`}
          >
            <div className="flex gap-4 text-xs font-mono">
              <div className="flex-1 p-3 bg-gray-100 rounded-lg text-center">gap-4 Item A</div>
              <div className="flex-1 p-3 bg-gray-100 rounded-lg text-center">gap-4 Item B</div>
              <div className="flex-1 p-3 bg-gray-100 rounded-lg text-center">gap-4 Item C</div>
            </div>
          </UiDocSection>
        </UiDocPage>
      )}

      {/* 1.9 SHAPES */}
      {isVisible('shapes') && (
        <UiDocPage
          title="Shapes"
          subLinks={[
            { id: 'shapes-img', label: 'Image Shapes' },
            { id: 'shapes-geo', label: 'Shapes' },
          ]}
        >
          <UiDocSection
            id="shapes-img"
            title="Image Shapes"
            classesHint="rounded-none rounded-md rounded-full p-1 border border-gray-300 bg-white"
            codeSnippet={`<div className="w-28 h-28 bg-gray-200 rounded-none flex items-center justify-center" />\n<div className="w-28 h-28 bg-gray-200 rounded-md flex items-center justify-center" />\n<div className="w-28 h-28 bg-gray-200 rounded-full flex items-center justify-center" />\n<div className="w-28 h-28 p-1 bg-white border border-gray-300 rounded-md">\n  <div className="w-full h-full bg-gray-200 rounded-xs" />\n</div>`}
          >
            <div className="flex flex-wrap items-center gap-6">
              {[
                { label: 'Default', classHint: 'rounded-none', frameClass: 'rounded-none', isThumbnail: false },
                { label: 'Rounded', classHint: 'rounded-md', frameClass: 'rounded-md', isThumbnail: false },
                { label: 'Circle', classHint: 'rounded-full', frameClass: 'rounded-full', isThumbnail: false },
                { label: 'Thumbnail', classHint: 'p-1 border border-gray-300 bg-white rounded-sm', frameClass: 'rounded-xs', isThumbnail: true },
              ].map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => copyToClipboard(item.classHint, `Image Shape (${item.label})`)}
                  title={`Klik untuk menyalin ${item.classHint}`}
                  className="group text-center space-y-2 cursor-pointer focus:outline-none"
                >
                  {item.isThumbnail ? (
                    <div className="w-28 h-28 sm:w-32 sm:h-32 p-1 border border-gray-300 bg-white rounded-xs transition-transform duration-[240ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-105">
                      <div className="w-full h-full bg-gray-300/80 flex items-center justify-center">
                        <Camera className="w-11 h-11 text-white fill-white/90 stroke-gray-500" />
                      </div>
                    </div>
                  ) : (
                    <div
                      className={`w-28 h-28 sm:w-32 sm:h-32 bg-gray-300/80 ${item.frameClass} flex items-center justify-center transition-transform duration-[240ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-105`}
                    >
                      <Camera className="w-11 h-11 text-white fill-white/90 stroke-gray-500" />
                    </div>
                  )}
                  <div className="text-xs text-gray-500 font-medium group-hover:text-gray-800 transition-colors">
                    {item.label}
                  </div>
                </button>
              ))}
            </div>
          </UiDocSection>

          <UiDocSection
            id="shapes-geo"
            title="Shapes"
            classesHint="rounded-none rounded-full rounded-3xl rounded-2xl rounded-lg"
            codeSnippet={`<div className="w-24 h-24 bg-gray-200 rounded-none" />\n<div className="w-24 h-24 bg-gray-200 rounded-full" />\n<div className="w-24 h-24 bg-gray-200 rounded-3xl" />\n<div className="w-24 h-24 bg-gray-200 rounded-2xl" />\n<div className="w-24 h-24 bg-gray-200 rounded-lg" />`}
          >
            <div className="flex flex-wrap items-center gap-5">
              {[
                { label: 'Square', classHint: 'rounded-none', shapeClass: 'rounded-none' },
                { label: 'Circle', classHint: 'rounded-full', shapeClass: 'rounded-full' },
                { label: 'Rounded 1', classHint: 'rounded-3xl', shapeClass: 'rounded-3xl' },
                { label: 'Rounded 2', classHint: 'rounded-2xl', shapeClass: 'rounded-2xl' },
                { label: 'Rounded 3', classHint: 'rounded-lg', shapeClass: 'rounded-lg' },
              ].map((shape) => (
                <button
                  key={shape.label}
                  type="button"
                  onClick={() => copyToClipboard(shape.classHint, `Shape (${shape.label})`)}
                  title={`Klik untuk menyalin ${shape.classHint}`}
                  className="group text-center space-y-2 cursor-pointer focus:outline-none"
                >
                  <div
                    className={`w-24 h-24 sm:w-28 sm:h-28 bg-gray-200 ${shape.shapeClass} transition-all duration-[240ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:bg-gray-300/80 group-hover:scale-105`}
                  />
                  <div className="text-xs text-gray-500 font-mono group-hover:text-gray-800 transition-colors">
                    .{shape.classHint}
                  </div>
                </button>
              ))}
            </div>
          </UiDocSection>
        </UiDocPage>
      )}

      {/* 1.10 SEPERATORS */}
      {isVisible('seperators') && (
        <UiDocPage
          title="Seperators"
          subLinks={[
            { id: 'sep-line', label: 'Line Seperators' },
            { id: 'sep-vert', label: 'Vertical Seperators' },
            { id: 'sep-hr', label: 'Hr' },
          ]}
        >
          <UiDocSection
            id="sep-line"
            title="Line Seperators"
            classesHint="flex items-center gap-3 flex-1 h-px bg-gray-300"
            codeSnippet={`<div className="flex items-center gap-3">\n  <div className="flex-1 h-px bg-gray-300" />\n  <span className="text-xs text-gray-500">ATAU</span>\n  <div className="flex-1 h-px bg-gray-300" />\n</div>`}
          >
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-300" />
              <span className="text-xs text-gray-500 font-medium">Pembatas Konten</span>
              <div className="flex-1 h-px bg-gray-300" />
            </div>
          </UiDocSection>

          <UiDocSection
            id="sep-vert"
            title="Vertical Seperators"
            classesHint="h-6 w-px bg-gray-300"
            codeSnippet={`<div className="flex items-center gap-4">\n  <span>Kolom Kiri</span>\n  <div className="h-6 w-px bg-gray-300" />\n  <span>Kolom Kanan</span>\n</div>`}
          >
            <div className="flex items-center justify-around py-2 bg-gray-50 rounded-lg border border-gray-300 text-sm text-gray-700">
              <span>Kolom Kiri</span>
              <div className="h-5 w-px bg-gray-300" />
              <span>Vertical Rule</span>
              <div className="h-5 w-px bg-gray-300" />
              <span>Kolom Kanan</span>
            </div>
          </UiDocSection>

          <UiDocSection
            id="sep-hr"
            title="Hr"
            classesHint="border-t border-gray-300 border-dashed"
            codeSnippet={`<hr className="border-t border-gray-300" />\n<hr className="border-t-2 border-dashed border-gray-400" />`}
          >
            <div className="space-y-4">
              <hr className="border-t border-gray-300" />
              <hr className="border-t-2 border-dashed border-gray-400" />
            </div>
          </UiDocSection>
        </UiDocPage>
      )}

      {/* 1.11 MEDIA OBJECTS */}
      {isVisible('mediaobjects') && (
        <UiDocPage
          title="Media Objects"
          subLinks={[
            { id: 'media-single', label: 'Single media object' },
            { id: 'media-nesting', label: 'Nesting' },
            { id: 'media-align', label: 'Alignment' },
          ]}
        >
          <UiDocSection
            id="media-single"
            title="Single media object"
            classesHint="flex items-start gap-3"
            codeSnippet={`<div className="flex items-start gap-3">\n  <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-700 font-bold flex items-center justify-center">CV</div>\n  <div>\n    <div className="font-semibold">Dr. Clara Vance</div>\n    <p className="text-sm text-gray-600">Panduan praktikum minggu keempat telah tersedia.</p>\n  </div>\n</div>`}
          >
            <div className="flex items-start gap-3.5 text-sm">
              <div className="w-10 h-10 rounded-full bg-[#FEF1F5] text-[#9D113C] font-bold flex items-center justify-center shrink-0">
                CV
              </div>
              <div>
                <div className="font-semibold text-gray-900">Dr. Clara Vance</div>
                <p className="text-gray-600 mt-0.5">Silakan unduh panduan praktikum minggu keempat sebelum sesi laboratorium dimulai.</p>
              </div>
            </div>
          </UiDocSection>

          <UiDocSection
            id="media-nesting"
            title="Nesting"
            classesHint="ml-12 pt-3 border-t border-gray-200"
            codeSnippet={`<div className="flex items-start gap-3">...<div className="mt-3 pt-3 border-t">Balasan bersarang</div></div>`}
          >
            <div className="flex items-start gap-3.5 text-sm">
              <div className="w-10 h-10 rounded-full bg-[#FEF1F5] text-[#9D113C] font-bold flex items-center justify-center shrink-0">
                CV
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-900">Dr. Clara Vance</div>
                <p className="text-gray-600 mt-0.5">Apakah semua kelompok sudah membaca panduan praktikum?</p>
                <div className="flex items-start gap-3 mt-3 pt-3 border-t border-gray-200">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center shrink-0">
                    JW
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">James Wilson · Balasan</div>
                    <p className="text-gray-600 mt-0.5">Sudah Bu, panduan PDF sudah kami pelajari.</p>
                  </div>
                </div>
              </div>
            </div>
          </UiDocSection>

          <UiDocSection
            id="media-align"
            title="Alignment"
            classesHint="items-start items-center items-end"
            codeSnippet={`<div className="flex items-center gap-3">...</div>`}
          >
            <div className="space-y-4 text-sm">
              {[
                { align: 'items-start', label: 'Top Aligned (items-start)' },
                { align: 'items-center', label: 'Center Aligned (items-center)' },
                { align: 'items-end', label: 'Bottom Aligned (items-end)' },
              ].map((it) => (
                <div key={it.align} className={`flex ${it.align} gap-3 p-3 rounded-lg bg-gray-50 border border-gray-300`}>
                  <div className="w-9 h-9 rounded-lg bg-gray-900 text-white text-xs font-bold flex items-center justify-center shrink-0">
                    M
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{it.label}</div>
                    <p className="text-xs text-gray-500 mt-0.5">Posisi kotak media di sebelah kiri otomatis menyesuaikan tinggi baris paragraf ini.</p>
                  </div>
                </div>
              ))}
            </div>
          </UiDocSection>
        </UiDocPage>
      )}

      {/* 1.12 EMBEDS */}
      {isVisible('embeds') && (
        <UiDocPage
          title="Embeds"
        >
          <UiDocSection
            id="embeds-ratio"
            title="Responsive Aspect Ratios"
            description="Pilih rasio aspek 21:9, 16:9, 4:3, atau 1:1 sesuai format video pembelajaran."
            classesHint={`${embedRatio} w-full`}
            codeSnippet={`<div className="${embedRatio} w-full rounded-xl bg-gray-950">\n  <iframe ... />\n</div>`}
            actions={
              <div className="flex gap-1 text-xs">
                {[
                  { label: '21:9', val: 'aspect-21/9' as const },
                  { label: '16:9', val: 'aspect-video' as const },
                  { label: '4:3', val: 'aspect-4/3' as const },
                  { label: '1:1', val: 'aspect-square' as const },
                ].map((r) => (
                  <button
                    key={r.label}
                    onClick={() => setEmbedRatio(r.val)}
                    className={`px-2.5 py-1 rounded-md font-mono cursor-pointer ${
                      embedRatio === r.val ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            }
          >
            <div className={`relative ${embedRatio} max-h-60 w-full rounded-xl bg-gray-950 text-white flex flex-col items-center justify-center overflow-hidden mx-auto transition-all duration-[240ms] ease-[cubic-bezier(0.23,1,0.32,1)]`}>
              <div className="w-12 h-12 rounded-full bg-white/15 flex items-center justify-center cursor-pointer hover:bg-white/25 hover:scale-110 transition-all duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]">
                <Play className="w-5 h-5 fill-white ml-0.5" />
              </div>
              <span className="text-xs text-gray-300 font-medium mt-2">{embedRatio.replace('aspect-', '')} Responsive Frame</span>
            </div>
          </UiDocSection>
        </UiDocPage>
      )}

      {/* 1.13 IMAGES */}
      {isVisible('images') && (
        <UiDocPage
          title="Images"
          subLinks={[
            { id: 'img-shapes', label: 'Image Shapes' },
            { id: 'img-align', label: 'Aligning images' },
            { id: 'img-figures', label: 'Figures' },
          ]}
        >
          <UiDocSection
            id="img-shapes"
            title="Image Shapes"
            classesHint="rounded-lg rounded-full p-1 border border-gray-300"
            codeSnippet={`<div className="w-16 h-16 rounded-full border" />`}
          >
            <div className="grid grid-cols-3 gap-6 text-center text-xs text-gray-600">
              <div className="space-y-2">
                <div className="w-16 h-16 rounded-lg bg-[#FEF1F5] text-[#9D113C] font-bold flex items-center justify-center mx-auto border border-[#FDE0E9]">
                  IMG
                </div>
                <div>Rounded</div>
              </div>
              <div className="space-y-2">
                <div className="w-16 h-16 rounded-full bg-[#E6F9F0] text-[#146C43] font-bold flex items-center justify-center mx-auto border border-[#C4F0DC]">
                  IMG
                </div>
                <div>Circle</div>
              </div>
              <div className="space-y-2">
                <div className="w-16 h-16 p-1 bg-white rounded-md mx-auto border border-gray-300 flex items-center justify-center">
                  <div className="w-full h-full bg-gray-100 rounded-sm flex items-center justify-center font-bold text-gray-700">
                    IMG
                  </div>
                </div>
                <div>Thumbnail</div>
              </div>
            </div>
          </UiDocSection>

          <UiDocSection
            id="img-align"
            title="Aligning images"
            classesHint="mr-auto mx-auto ml-auto block"
            codeSnippet={`<div className="mx-auto w-20 h-14">Centered</div>`}
          >
            <div className="grid grid-cols-3 gap-4 text-xs text-gray-500">
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-300">
                <div className="w-14 h-14 rounded-lg bg-gray-900 text-white flex items-center justify-center font-bold">L</div>
                <div className="mt-1.5">Left</div>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-300 text-center">
                <div className="w-14 h-14 rounded-lg bg-primary-600 text-white flex items-center justify-center font-bold mx-auto">C</div>
                <div className="mt-1.5">Center</div>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-300 text-right">
                <div className="w-14 h-14 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold ml-auto">R</div>
                <div className="mt-1.5">Right</div>
              </div>
            </div>
          </UiDocSection>

          <UiDocSection
            id="img-figures"
            title="Figures"
            classesHint="figure figcaption text-xs text-gray-500"
            codeSnippet={`<figure>\n  <div className="h-28 rounded-xl bg-gray-100" />\n  <figcaption className="text-xs text-gray-500 mt-1.5">Keterangan gambar di bawah media.</figcaption>\n</figure>`}
          >
            <figure className="max-w-sm">
              <div className="h-28 rounded-xl bg-gradient-to-br from-[#FEF1F5] to-[#E6F9F0] border border-gray-300 flex items-center justify-center text-sm font-semibold text-gray-800">
                Pratinjau Ilustrasi Modul
              </div>
              <figcaption className="text-xs text-gray-500 mt-2">
                Gambar 1. Diagram ilustrasi kurva pembelajaran kelas terpadu.
              </figcaption>
            </figure>
          </UiDocSection>
        </UiDocPage>
      )}

      {/* 1.14 ICON FONTS */}
      {isVisible('iconfonts') && <IconFontsSection />}
    </div>
  );
};
