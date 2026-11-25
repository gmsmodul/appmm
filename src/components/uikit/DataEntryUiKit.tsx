import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  Check,
  Calendar,
  UploadCloud,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  X,
  Star,
  Eye,
  EyeOff,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  List,
  ListOrdered,
  Link,
  Code,
  Quote,
  Plus,
  Minus,
  Crop,
  Lock,
  Mail,
  Phone,
  AlertCircle,
  CheckCircle2,
  FileText,
  Sliders,
  ArrowRight,
  Heart,
  CreditCard,
  Hash,
  Share2,
  Globe,
  Github,
  Send,
  User,
  BookOpen,
  Loader2,
  Clock,
  AlertTriangle,
  RotateCcw,
  Download,
  Filter,
  Sparkles,
  RefreshCw,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UiDocPage, UiDocSection } from './UiDocBlock';
import { CustomSelect } from '../ui/CustomSelect';
import { SplitFilterButton } from '../ui/SplitFilterButton';
import { ToggleSwitch } from '../ui/ToggleSwitch';
import { UiSkeletonSearchPanel } from '../ui/UiSkeleton';
import { SelectCheckboxRadioUiKit } from './SelectCheckboxRadioUiKit';
import { ToggleUiKit } from './ToggleUiKit';
import { MenuUxRulesUiKit } from './MenuUxRulesUiKit';
import {
  ACTION_BTN_PRIMARY,
  ACTION_BTN_SECONDARY,
  ACTION_BTN_SOFT_PRIMARY,
  ACTION_BTN_DARK,
  ACTION_BTN_DANGER_SOFT,
} from '../../constants/buttonStyles';
import { getScaleOptionAnalogousColors } from '../../data/examPositions';

interface DataEntryUiKitProps {
  activeSubJump?: string;
}

export const DataEntryUiKit: React.FC<DataEntryUiKitProps> = ({ activeSubJump }) => {
  const { triggerToast } = useApp();

  // 3.1 Buttons
  const [btnLoading, setBtnLoading] = useState(false);
  const [activeBtnGroup, setActiveBtnGroup] = useState('Bulan Ini');
  const [activeBtnGroupV, setActiveBtnGroupV] = useState('2. Daftar Hadir Siswa');
  const [splitDropdownOpen, setSplitDropdownOpen] = useState(false);
  const [dropupOpen, setDropupOpen] = useState(false);
  const [ctaCompactMode, setCtaCompactMode] = useState<'desktop' | 'mobile'>('desktop');
  const [actionSplitVal, setActionSplitVal] = useState('All');
  const splitDropdownRef = useRef<HTMLDivElement>(null);
  const dropupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!splitDropdownOpen && !dropupOpen) return;
    const onPointerDown = (e: MouseEvent) => {
      const target = e.target as Node;
      if (splitDropdownOpen && splitDropdownRef.current && !splitDropdownRef.current.contains(target)) {
        setSplitDropdownOpen(false);
      }
      if (dropupOpen && dropupRef.current && !dropupRef.current.contains(target)) {
        setDropupOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSplitDropdownOpen(false);
        setDropupOpen(false);
      }
    };
    document.addEventListener('mousedown', onPointerDown);
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [splitDropdownOpen, dropupOpen]);

  // 3.2 Form Elements
  const [inputText, setInputText] = useState('Matematika Peminatan Kelas 12');
  const [textareaText, setTextareaText] = useState(
    'Silabus ini mencakup turunan fungsi trigonometri dan aplikasi laju perubahan.'
  );
  const [selectedFileName, setSelectedFileName] = useState('Belum ada berkas dipilih');
  const [checkboxA, setCheckboxA] = useState(true);
  const [checkboxB, setCheckboxB] = useState(false);
  const [radioSelected, setRadioSelected] = useState('online');
  const [switchA, setSwitchA] = useState(true);
  const [switchB, setSwitchB] = useState(false);
  const [multiMenuSelected, setMultiMenuSelected] = useState<string[]>(['Kalkulus', 'Statistika']);
  const [nativeColor, setNativeColor] = useState('#ee2e65');
  const [nativeRange, setNativeRange] = useState(65);
  const [basicSelectVal, setBasicSelectVal] = useState('');
  const [groupSelectClass, setGroupSelectClass] = useState('Class 302');
  const [inlineTermVal, setInlineTermVal] = useState('Term 1');
  const [validationMajor, setValidationMajor] = useState('');

  // 3.5 Form Mask
  const [phoneMask, setPhoneMask] = useState('+62 812-3456-7890');
  const [studentIdMask, setStudentIdMask] = useState('SRV-2026-9042');
  const [cardMask, setCardMask] = useState('4112 · 8820 · 3091 · 7714');
  const [dateMask, setDateMask] = useState('14 / 02 / 2026');
  const [currencyMask] = useState('Rp 1.250.000');

  // 3.6 Form Validation
  const [liveEmail, setLiveEmail] = useState('designer@uikit.design');
  const isEmailValid = liveEmail.includes('@') && liveEmail.includes('.');
  const [serverChecking, setServerChecking] = useState(false);
  const [serverUsername, setServerUsername] = useState('uikit_system');
  const [serverStatus, setServerStatus] = useState<'available' | 'taken'>('available');

  // 3.6B Form Input State
  const initialCourseTitle = 'Fisika Kuantum Dasar';
  const [dirtyInputVal, setDirtyInputVal] = useState(initialCourseTitle);
  const [semanticStatePreview, setSemanticStatePreview] = useState<'valid' | 'warning' | 'error'>('warning');
  const [asyncSubmitState, setAsyncSubmitState] = useState<'idle' | 'submitting' | 'saved'>('idle');
  const [asyncCourseCode, setAsyncCourseCode] = useState('FIS-302');

  // 3.7 Advance Form UI
  const [showPassword, setShowPassword] = useState(false);
  const [passwordValue, setPasswordValue] = useState('UiKitDesign2026!');
  const [floatingName, setFloatingName] = useState('Dr. Hendra Wijaya, M.Pd');
  const [floatingEmail, setFloatingEmail] = useState('hendra.w@uikit.design');
  const getPasswordStrength = (pass: string) => {
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    if (score <= 1) return { label: 'Lemah', color: 'bg-rose-500', text: 'text-rose-600', width: 'w-1/4' };
    if (score === 2) return { label: 'Cukup', color: 'bg-amber-500', text: 'text-amber-600', width: 'w-2/4' };
    if (score === 3) return { label: 'Bagus', color: 'bg-primary-500', text: 'text-primary-600', width: 'w-3/4' };
    return { label: 'Sangat Kuat', color: 'bg-emerald-500', text: 'text-emerald-600', width: 'w-full' };
  };
  const pwStrength = getPasswordStrength(passwordValue);

  // 3.8 Cropperjs
  const [cropAspect, setCropAspect] = useState<'1:1' | '4:3' | '16:9' | 'free'>('1:1');
  const [cropZoom, setCropZoom] = useState(100);

  // 3.9 Dropzone
  const [uploadedFiles, setUploadedFiles] = useState([
    { name: 'Silabus_Kalkulus_Term1.pdf', size: '2.4 MB', type: 'PDF' },
    { name: 'Modul_Praktikum_Fisika.docx', size: '1.8 MB', type: 'DOCX' },
  ]);

  // 3.10 Date Picker (Typed Dates + Month/Year Jump 1960-2030)
  const dpMonthNames = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ];
  const dpMonthOptions = dpMonthNames.map((m, i) => ({ value: String(i), label: m }));
  const dpYearOptions = Array.from({ length: 71 }, (_, i) => {
    const yr = String(2030 - i);
    return { value: yr, label: yr };
  });
  const getDpDaysInMonth = (y: number, m: number) => new Date(y, m + 1, 0).getDate();
  const getDpLeadingOffset = (y: number, m: number) => (new Date(y, m, 1).getDay() + 6) % 7;
  const formatDpStr = (y: number, m: number, d: number) =>
    `${String(d).padStart(2, '0')}/${String(m + 1).padStart(2, '0')}/${y}`;
  const parseDpFlexible = (raw: string): { year: number; month: number; day: number } | null => {
    const s = raw.trim();
    const dmy = s.match(/^(\d{1,2})[/.-](\d{1,2})[/.-](\d{4})$/);
    if (dmy) {
      const day = Number(dmy[1]);
      const month = Number(dmy[2]) - 1;
      const year = Number(dmy[3]);
      if (year >= 1940 && year <= 2035 && month >= 0 && month <= 11 && day >= 1 && day <= getDpDaysInMonth(year, month)) {
        return { year, month, day };
      }
    }
    const ymd = s.match(/^(\d{4})[/.-](\d{1,2})[/.-](\d{1,2})$/);
    if (ymd) {
      const year = Number(ymd[1]);
      const month = Number(ymd[2]) - 1;
      const day = Number(ymd[3]);
      if (year >= 1940 && year <= 2035 && month >= 0 && month <= 11 && day >= 1 && day <= getDpDaysInMonth(year, month)) {
        return { year, month, day };
      }
    }
    return null;
  };

  const [dpYear, setDpYear] = useState(2026);
  const [dpMonth, setDpMonth] = useState(1);
  const [selectedDay, setSelectedDay] = useState(14);
  const [dpTypedInput, setDpTypedInput] = useState('14/02/2026');
  const [dpTypedInvalid, setDpTypedInvalid] = useState(false);

  const [dtYear, setDtYear] = useState(2026);
  const [dtMonth, setDtMonth] = useState(1);
  const [dateTimeDay, setDateTimeDay] = useState(18);
  const [dtTypedInput, setDtTypedInput] = useState('18/02/2026');
  const [dateTimeHour, setDateTimeHour] = useState('09');
  const [dateTimeMinute, setDateTimeMinute] = useState('30');

  const syncPrimaryDate = (y: number, m: number, d: number) => {
    const safeDay = Math.min(d, getDpDaysInMonth(y, m));
    setDpYear(y);
    setDpMonth(m);
    setSelectedDay(safeDay);
    setDpTypedInput(formatDpStr(y, m, safeDay));
    setDpTypedInvalid(false);
  };

  const syncTimeDate = (y: number, m: number, d: number) => {
    const safeDay = Math.min(d, getDpDaysInMonth(y, m));
    setDtYear(y);
    setDtMonth(m);
    setDateTimeDay(safeDay);
    setDtTypedInput(formatDpStr(y, m, safeDay));
  };

  // 3.11 Color Picker
  const [selectedColor, setSelectedColor] = useState('#ee2e65');
  const themeColors = ['#ee2e65', '#10B981', '#F59E0B', '#EF4444', '#3B82F6', '#C11448', '#111827'];

  // 3.12 React Select
  const [selectedClass, setSelectedClass] = useState('Class 302');
  const [multiSelectedTags, setMultiSelectedTags] = useState(['Kalkulus', 'Fisika']);
  const [creatableOptions, setCreatableOptions] = useState(['Kalkulus', 'Fisika', 'Kimia', 'Biologi', 'Statistika']);
  const [newSelectTag, setNewSelectTag] = useState('');

  // 3.13 Range Slider
  const [rangeSingle, setRangeSingle] = useState(72);

  // 3.14 Input Spinner
  const [spinnerInt, setSpinnerInt] = useState(4);
  const [spinnerDec, setSpinnerDec] = useState(2.5);

  // 3.15 Form Wizard
  const [wizardStep, setWizardStep] = useState(1);

  // 3.16 Tinymce
  const [richFormat, setRichFormat] = useState({
    bold: false,
    italic: false,
    underline: false,
    strike: false,
    list: false,
    ordered: false,
    code: false,
  });
  const [richContent, setRichContent] = useState(
    'Pertemuan 4: Penerapan aturan rantai pada turunan fungsi trigonometri untuk menghitung laju perubahan sesaat dalam fenomena gelombang elektromagnetik.'
  );

  // 3.17 Chips
  const [chips, setChips] = useState(['Kalkulus', 'Fisika Terapan', 'Kelas 12', 'Laboratorium B']);
  const [tickChips, setTickChips] = useState<string[]>(['PDF Silabus', 'Video HD']);
  const [userChips, setUserChips] = useState([
    { name: 'James Wilson', init: 'JW', bg: 'bg-primary-600' },
    { name: 'Sarah Anderson', init: 'SA', bg: 'bg-emerald-600' },
  ]);
  const [newChipText, setNewChipText] = useState('');

  // 3.18 Ratings
  const [starRating, setStarRating] = useState(4);
  const [hoverStar, setHoverStar] = useState<number | null>(null);
  const [progressiveRating, setProgressiveRating] = useState(4);
  const [spectrumRatingIdx, setSpectrumRatingIdx] = useState<number>(3);
  const ratingLabels = ['Sangat Kurang', 'Kurang', 'Cukup', 'Baik', 'Sangat Baik'];
  const spectrumOptions = [
    { id: 'sp-1', value: 20, label: 'Needs Improvement' },
    { id: 'sp-2', value: 40, label: 'Fair' },
    { id: 'sp-3', value: 60, label: 'Good' },
    { id: 'sp-4', value: 80, label: 'Very Good' },
    { id: 'sp-5', value: 100, label: 'Excellent' },
  ];

  // 3.19 Page Search
  const [pageSearch, setPageSearch] = useState('');
  const [demoSearchFocused, setDemoSearchFocused] = useState(true);
  const [demoSearchLoading, setDemoSearchLoading] = useState(false);
  const [demoRecentSearches, setDemoRecentSearches] = useState<string[]>([
    'Kalkulus IV',
    'Induksi Elektromagnetik',
    'Class 303',
  ]);
  const demoSuggestions = [
    { label: 'Kalkulus IV', category: 'Class 302' },
    { label: 'Puisi Modernis', category: 'Class 305' },
    { label: 'Palet Gouache', category: 'Class 304' },
    { label: 'Lab Fisika', category: 'Class 303' },
  ];
  const searchCatalog = [
    { title: 'Kalkulus IV: Integral Lipat', tag: 'Class 302', type: 'Video' },
    { title: 'Induksi Elektromagnetik B', tag: 'Class 303', type: 'Lab' },
    { title: 'Analisis Puisi Modernis', tag: 'Class 305', type: 'PDF' },
    { title: 'Teknik Palet Gouache Studio', tag: 'Class 304', type: 'Video' },
  ];
  const filteredSearch = searchCatalog.filter(
    (s) =>
      s.title.toLowerCase().includes(pageSearch.toLowerCase()) ||
      s.tag.toLowerCase().includes(pageSearch.toLowerCase())
  );

  useEffect(() => {
    if (!pageSearch.trim()) return;
    setDemoSearchLoading(true);
    const timer = window.setTimeout(() => setDemoSearchLoading(false), 220);
    return () => window.clearTimeout(timer);
  }, [pageSearch]);

  const handleSaveDemoRecent = (term: string) => {
    const clean = term.trim();
    if (!clean) return;
    setDemoRecentSearches((prev) =>
      [clean, ...prev.filter((item) => item.toLowerCase() !== clean.toLowerCase())].slice(0, 5)
    );
  };

  const isVisible = (itemKey: string) => {
    if (!activeSubJump) return true;
    return activeSubJump.toLowerCase().replace(/[^a-z0-9]/g, '') === itemKey.toLowerCase().replace(/[^a-z0-9]/g, '');
  };

  const handleAddChip = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newChipText.trim()) {
      e.preventDefault();
      if (!chips.includes(newChipText.trim())) {
        setChips([...chips, newChipText.trim()]);
      }
      setNewChipText('');
    }
  };

  const handleCreateSelectOption = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newSelectTag.trim()) {
      e.preventDefault();
      const val = newSelectTag.trim();
      if (!creatableOptions.includes(val)) {
        setCreatableOptions([...creatableOptions, val]);
      }
      if (!multiSelectedTags.includes(val)) {
        setMultiSelectedTags([...multiSelectedTags, val]);
      }
      setNewSelectTag('');
      triggerToast('Opsi Dibuat', `Tag "${val}" ditambahkan ke React Select.`, 'success');
    }
  };

  const handleCheckServerUsername = (val: string) => {
    setServerUsername(val);
    setServerChecking(true);
    setTimeout(() => {
      setServerStatus(val.toLowerCase() === 'admin' || val.length < 4 ? 'taken' : 'available');
      setServerChecking(false);
    }, 450);
  };

  return (
    <div className="space-y-10 print-section">
      {/* 3.1 BUTTONS */}
      {isVisible('buttons') && (
        <UiDocPage
          title="Buttons"
          subLinks={[
            { id: 'btn-default', label: 'Default buttons' },
            { id: 'btn-soft', label: 'Soft buttons' },
            { id: 'btn-outline', label: 'Outline buttons' },
            { id: 'btn-flush', label: 'Flush buttons' },
            { id: 'btn-flush-hover', label: 'Flush hover' },
            { id: 'btn-link', label: 'Link buttons' },
            { id: 'btn-animated', label: 'Animated buttons' },
            { id: 'btn-rounded', label: 'Rounded button' },
            { id: 'btn-square', label: 'Square button' },
            { id: 'btn-gradient', label: 'Gradient buttons' },
            { id: 'btn-floating', label: 'Floating buttons' },
            { id: 'btn-sizes', label: 'Sizes' },
            { id: 'btn-disabled', label: 'Disabled State' },
            { id: 'btn-loader', label: 'Button Loader' },
            { id: 'btn-block', label: 'Block buttons' },
            { id: 'btn-group-h', label: 'Button Group Horizontal' },
            { id: 'btn-group-v', label: 'Button Group Vertical' },
            { id: 'btn-icons', label: 'Buttons with icons' },
            { id: 'btn-icon-only', label: 'Icons buttons' },
            { id: 'btn-social', label: 'Social buttons' },
            { id: 'btn-badge', label: 'Badge on buttons' },
            { id: 'btn-dropdown', label: 'Dropdown button' },
            { id: 'btn-dropup', label: 'Dropup button' },
            { id: 'btn-action-pills', label: 'Action Pill Buttons (Primary Rose #ee2e65)' },
          ]}
        >
          <UiDocSection
            id="btn-default"
            title="Default buttons"
            classesHint="px-3.5 py-2 rounded-lg bg-gray-900 text-white / bg-primary-600 text-white"
            codeSnippet={`<button className="px-3.5 py-2 rounded-lg bg-gray-900 text-white font-semibold">Default Dark</button>\n<button className="px-3.5 py-2 rounded-lg bg-primary-600 text-white font-semibold">Default Primary</button>`}
          >
            <div className="flex flex-wrap gap-2.5 text-xs font-semibold">
              <button className="px-3.5 py-2 rounded-lg bg-gray-900 text-white hover:bg-black cursor-pointer">
                Default Dark
              </button>
              <button className="px-3.5 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700 cursor-pointer">
                Default Primary
              </button>
              <button className="px-3.5 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 cursor-pointer">
                Success
              </button>
              <button className="px-3.5 py-2 rounded-lg bg-rose-600 text-white hover:bg-rose-700 cursor-pointer">
                Danger
              </button>
            </div>
          </UiDocSection>

          <UiDocSection
            id="btn-soft"
            title="Soft buttons"
            classesHint="bg-primary-50 text-primary-700 border border-primary-200"
            codeSnippet={`<button className="px-3.5 py-2 rounded-lg bg-primary-50 text-primary-700 border border-primary-200 font-semibold">Soft Primary</button>`}
          >
            <div className="flex flex-wrap gap-2.5 text-xs font-semibold">
              <button className="px-3.5 py-2 rounded-lg bg-primary-50 text-primary-700 border border-primary-200 hover:bg-primary-100 cursor-pointer">
                Soft Primary
              </button>
              <button className="px-3.5 py-2 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 cursor-pointer">
                Soft Mint
              </button>
              <button className="px-3.5 py-2 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100 cursor-pointer">
                Soft Amber
              </button>
              <button className="px-3.5 py-2 rounded-lg bg-rose-50 text-rose-800 border border-rose-200 hover:bg-rose-100 cursor-pointer">
                Soft Rose
              </button>
            </div>
          </UiDocSection>

          <UiDocSection
            id="btn-outline"
            title="Outline buttons"
            classesHint="border border-gray-300 text-gray-800 / border-primary-600 text-primary-600"
            codeSnippet={`<button className="px-3.5 py-2 rounded-lg border border-gray-300 text-gray-800 font-semibold">Outline</button>`}
          >
            <div className="flex flex-wrap gap-2.5 text-xs font-semibold">
              <button className="px-3.5 py-2 rounded-lg border border-gray-300 text-gray-800 hover:bg-gray-50 cursor-pointer">
                Outline Default
              </button>
              <button className="px-3.5 py-2 rounded-lg border border-primary-600 text-primary-600 hover:bg-primary-50 cursor-pointer">
                Outline Primary
              </button>
              <button className="px-3.5 py-2 rounded-lg border border-emerald-600 text-emerald-700 hover:bg-emerald-50 cursor-pointer">
                Outline Success
              </button>
            </div>
          </UiDocSection>

          <UiDocSection
            id="btn-flush"
            title="Flush buttons"
            classesHint="text-gray-700 hover:text-primary-700"
            codeSnippet={`<button className="px-3 py-1.5 text-gray-700 hover:text-primary-700 font-semibold">Flush Text</button>`}
          >
            <div className="flex flex-wrap gap-3 text-xs font-semibold">
              <button className="px-3 py-1.5 text-gray-700 hover:text-primary-700 cursor-pointer">Flush Default</button>
              <button className="px-3 py-1.5 text-primary-600 hover:text-primary-800 cursor-pointer">Flush Indigo</button>
              <button className="px-3 py-1.5 text-rose-600 hover:text-rose-800 cursor-pointer">Flush Rose</button>
            </div>
          </UiDocSection>

          <UiDocSection
            id="btn-flush-hover"
            title="Flush hover"
            classesHint="rounded-lg text-primary-700 hover:bg-primary-50"
            codeSnippet={`<button className="px-3 py-1.5 rounded-lg text-primary-700 hover:bg-primary-50">Flush Hover</button>`}
          >
            <div className="flex flex-wrap gap-2.5 text-xs font-semibold">
              <button className="px-3 py-1.5 rounded-lg text-primary-700 hover:bg-primary-50 transition-colors cursor-pointer">
                Flush Hover Indigo
              </button>
              <button className="px-3 py-1.5 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer">
                Flush Hover Slate
              </button>
            </div>
          </UiDocSection>

          <UiDocSection
            id="btn-link"
            title="Link buttons"
            classesHint="text-primary-600 underline hover:text-primary-800"
            codeSnippet={`<button className="px-2 py-1 text-primary-600 underline hover:text-primary-800">Link Button</button>`}
          >
            <button className="px-2 py-1 text-xs font-semibold text-primary-600 underline hover:text-primary-800 cursor-pointer">
              Link Button
            </button>
          </UiDocSection>

          <UiDocSection
            id="btn-animated"
            title="Animated buttons"
            classesHint="group inline-grid / group-hover:translate-x-1"
            codeSnippet={`<button className="group px-3.5 py-2 rounded-lg bg-gray-900 text-white flex items-center gap-1.5">\n  <span>Animated</span><ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />\n</button>`}
          >
            <button
              onClick={() => {
                setBtnLoading(true);
                setTimeout(() => setBtnLoading(false), 1200);
              }}
              className="group px-4 py-2 rounded-lg bg-gray-900 text-white text-xs font-semibold inline-grid place-items-center transition-colors cursor-pointer"
            >
              <span
                className={`[grid-area:1/1] inline-flex items-center gap-1.5 transition-opacity duration-150 ${
                  btnLoading ? 'opacity-0 invisible' : 'opacity-100'
                }`}
              >
                <span>Animated</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </span>
              <span
                aria-hidden={!btnLoading}
                className={`[grid-area:1/1] inline-flex items-center gap-1.5 transition-opacity duration-150 ${
                  btnLoading ? 'opacity-100' : 'opacity-0 invisible'
                }`}
              >
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Menyimpan...</span>
              </span>
            </button>
          </UiDocSection>

          <UiDocSection
            id="btn-rounded"
            title="Rounded button"
            classesHint="rounded-full"
            codeSnippet={`<button className="px-4 py-2 rounded-full bg-gray-900 text-white font-semibold">Rounded Pill</button>`}
          >
            <div className="flex flex-wrap gap-2.5 text-xs font-semibold">
              <button className="px-4 py-2 rounded-full bg-gray-900 text-white hover:bg-black cursor-pointer">
                Rounded Pill
              </button>
              <button className="px-4 py-2 rounded-full border border-primary-600 text-primary-600 hover:bg-primary-50 cursor-pointer">
                Rounded Outline
              </button>
            </div>
          </UiDocSection>

          <UiDocSection
            id="btn-square"
            title="Square button"
            classesHint="rounded-none"
            codeSnippet={`<button className="px-3.5 py-2 rounded-none bg-primary-600 text-white font-semibold">Square Button</button>`}
          >
            <div className="flex flex-wrap gap-2.5 text-xs font-semibold">
              <button className="px-3.5 py-2 rounded-none bg-primary-600 text-white hover:bg-primary-700 cursor-pointer">
                Square Button
              </button>
              <button className="px-3.5 py-2 rounded-none border border-gray-800 text-gray-900 hover:bg-gray-100 cursor-pointer">
                Square Outline
              </button>
            </div>
          </UiDocSection>

          <UiDocSection
            id="btn-gradient"
            title="Gradient buttons (Konteks Khusus)"
            description="Gunakan tombol solid sebagai standar tindakan utama agar hierarki halaman tetap tenang. Tombol gradient dibatasi khusus untuk konteks kampanye, pengumuman acara, atau program khusus."
            classesHint="Standar: bg-primary-600 | Khusus Acara: bg-gradient-to-r from-primary-600 to-rose-700"
            codeSnippet={`{/* Standar tindakan utama */}\n<button className="px-4 py-2 rounded-lg bg-primary-600 text-white font-semibold">Simpan Materi</button>\n{/* Konteks kampanye / acara khusus */}\n<button className="px-4 py-2 rounded-lg bg-gradient-to-r from-primary-600 to-rose-700 text-white font-semibold">Daftar Olimpiade 2026</button>`}
          >
            <div className="flex flex-wrap items-center gap-3 text-xs font-semibold">
              <button
                type="button"
                onClick={() => triggerToast('Standar Utama', 'Menggunakan tombol solid sebagai standar halaman.', 'success')}
                className="px-4 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700 cursor-pointer"
              >
                Simpan Materi (Solid Standar)
              </button>
              <button
                type="button"
                onClick={() => triggerToast('Kampanye Acara', 'Tombol gradient khusus untuk acara/kampanye.', 'info')}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-primary-600 to-rose-700 text-white hover:opacity-95 cursor-pointer"
              >
                Daftar Olimpiade 2026 (Acara)
              </button>
            </div>
          </UiDocSection>

          <UiDocSection
            id="btn-floating"
            title="Floating buttons"
            classesHint="w-10 h-10 rounded-full shadow-lg"
            codeSnippet={`<button className="w-10 h-10 rounded-full bg-gray-900 text-white shadow-lg flex items-center justify-center"><Plus /></button>`}
          >
            <div className="flex items-center gap-3">
              <button
                onClick={() => triggerToast('Floating FAB', 'Aksi cepat floating dipicu.', 'info')}
                className="w-10 h-10 rounded-full bg-gray-900 text-white shadow-lg flex items-center justify-center hover:scale-105 transition-transform cursor-pointer"
                title="Floating Button"
              >
                <Plus className="w-4 h-4" />
              </button>
              <button
                onClick={() => triggerToast('Floating Primary', 'FAB aksen primary dipicu.', 'success')}
                className="w-10 h-10 rounded-full bg-primary-600 text-white shadow-lg flex items-center justify-center hover:scale-105 transition-transform cursor-pointer"
                title="Floating Primary Button"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </UiDocSection>

          <UiDocSection
            id="btn-sizes"
            title="Sizes"
            classesHint="px-2 py-0.5 text-[11px] ... px-5 py-2.5 text-base"
            codeSnippet={`<button className="px-2.5 py-1 text-xs rounded-md bg-gray-900 text-white">Small</button>\n<button className="px-5 py-2.5 text-base rounded-xl bg-gray-900 text-white">Large</button>`}
          >
            <div className="flex flex-wrap items-center gap-2.5 font-semibold">
              <button className="px-2 py-0.5 text-[11px] rounded bg-gray-900 text-white">XS</button>
              <button className="px-2.5 py-1 text-xs rounded-md bg-gray-900 text-white">Small</button>
              <button className="px-3.5 py-1.5 text-sm rounded-lg bg-gray-900 text-white">Medium</button>
              <button className="px-5 py-2.5 text-base rounded-xl bg-gray-900 text-white">Large</button>
            </div>
          </UiDocSection>

          <UiDocSection
            id="btn-disabled"
            title="Disabled State"
            classesHint="bg-gray-200 text-gray-500 cursor-not-allowed"
            codeSnippet={`<button disabled className="px-3.5 py-1.5 text-sm rounded-lg bg-gray-200 text-gray-500 cursor-not-allowed">Disabled</button>`}
          >
            <div className="flex flex-wrap gap-2.5 text-xs font-semibold">
              <button disabled className="px-3.5 py-2 rounded-lg bg-gray-200 text-gray-500 cursor-not-allowed">
                Disabled Solid
              </button>
              <button disabled className="px-3.5 py-2 rounded-lg border border-gray-300 text-gray-500 cursor-not-allowed">
                Disabled Outline
              </button>
            </div>
          </UiDocSection>

          <UiDocSection
            id="btn-loader"
            title="Button Loader"
            description="Tombol dengan indikator pemuatan (spinner, icon loader, dan simulasi kirim asinkron) untuk mencegah klik ganda."
            classesHint="inline-flex items-center gap-2 disabled:opacity-75 cursor-wait"
            codeSnippet={`<button disabled={loading} onClick={handleSubmit} className="px-4 py-2 rounded-lg bg-primary-600 text-white font-semibold inline-flex items-center gap-2">\n  {loading && <Loader2 className="w-4 h-4 animate-spin" />}\n  <span>{loading ? 'Menyimpan...' : 'Simpan Perubahan'}</span>\n</button>`}
          >
            <div className="flex flex-wrap items-center gap-3 text-xs font-semibold">
              <button
                type="button"
                disabled={btnLoading}
                onClick={() => {
                  setBtnLoading(true);
                  setTimeout(() => {
                    setBtnLoading(false);
                    triggerToast('Tersimpan', 'Perubahan modul berhasil disimpan.', 'success');
                  }, 1400);
                }}
                className="px-4 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-75 inline-grid place-items-center cursor-pointer disabled:cursor-wait transition-colors"
              >
                <span
                  aria-hidden={!btnLoading}
                  className={`[grid-area:1/1] inline-flex items-center gap-2 transition-opacity duration-150 ${
                    btnLoading ? 'opacity-100' : 'opacity-0 invisible'
                  }`}
                >
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Menyimpan...</span>
                </span>
                <span
                  className={`[grid-area:1/1] inline-flex items-center transition-opacity duration-150 ${
                    btnLoading ? 'opacity-0 invisible' : 'opacity-100'
                  }`}
                >
                  Klik Simulasi Loader
                </span>
              </button>

              <button
                type="button"
                disabled
                className="px-4 py-2 rounded-lg bg-gray-900 text-white opacity-85 inline-flex items-center gap-2 cursor-wait"
              >
                <span className="w-3.5 h-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                <span>Border Spinner</span>
              </button>

              <button
                type="button"
                disabled
                className="px-4 py-2 rounded-lg bg-primary-50 text-primary-700 border border-primary-200 inline-flex items-center gap-2 cursor-wait"
              >
                <span>Mengunggah</span>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              </button>

              <button
                type="button"
                disabled
                className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 inline-flex items-center gap-2 cursor-wait"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <span>Menyinkronkan...</span>
              </button>

              <button
                type="button"
                aria-label="Memuat"
                disabled
                className="w-9 h-9 rounded-lg bg-gray-900 text-white inline-flex items-center justify-center opacity-85 cursor-wait"
              >
                <Loader2 className="w-4 h-4 animate-spin" />
              </button>
            </div>
          </UiDocSection>

          <UiDocSection
            id="btn-block"
            title="Block buttons"
            classesHint="w-full py-2.5 rounded-lg"
            codeSnippet={`<button className="w-full py-2.5 rounded-lg bg-primary-600 text-white font-semibold">Block Button (Full Width)</button>`}
          >
            <button className="w-full py-2.5 rounded-lg bg-primary-600 text-white text-xs font-semibold hover:bg-primary-700 cursor-pointer">
              Block Button (Full Width)
            </button>
          </UiDocSection>

          <UiDocSection
            id="btn-group-h"
            title="Button Group Horizontal"
            classesHint="inline-flex rounded-lg border border-gray-300 bg-gray-50 p-0.5"
            codeSnippet={`<div className="inline-flex rounded-lg border border-gray-300 bg-gray-50 p-0.5">\n  <button className="px-3 py-1.5 rounded-md bg-white text-gray-900 font-semibold">Bulan Ini</button>\n</div>`}
          >
            <div className="space-y-3 text-xs">
              <div className="relative inline-grid grid-cols-3 rounded-lg border border-gray-300 bg-gray-100/80 p-0.5">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0.5 left-0.5 w-[calc((100%-0.25rem)/3)] rounded-md bg-white shadow-2xs transition-transform duration-[220ms] ease-[cubic-bezier(0.23,1,0.32,1)]"
                  style={{
                    transform: `translate3d(${Math.max(0, ['Hari Ini', 'Minggu Ini', 'Bulan Ini'].indexOf(activeBtnGroup)) * 100}%, 0, 0)`,
                  }}
                />
                {['Hari Ini', 'Minggu Ini', 'Bulan Ini'].map((item) => (
                  <button
                    key={item}
                    onClick={() => setActiveBtnGroup(item)}
                    className={`relative z-10 px-3 py-1.5 rounded-md font-semibold text-center transition-colors duration-200 cursor-pointer ${
                      activeBtnGroup === item ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <div>
                <div className="inline-flex rounded-md border border-gray-300 overflow-hidden text-[11px] font-semibold">
                  <button className="px-2.5 py-1 bg-white hover:bg-gray-50 border-r border-gray-300">L</button>
                  <button className="px-2.5 py-1 bg-gray-900 text-white border-r border-gray-300">M</button>
                  <button className="px-2.5 py-1 bg-white hover:bg-gray-50">R</button>
                </div>
              </div>
            </div>
          </UiDocSection>

          <UiDocSection
            id="btn-group-v"
            title="Button Group Vertical"
            classesHint="relative inline-grid grid-rows-3 w-52 rounded-lg border border-gray-300"
            codeSnippet={`<div className="inline-grid grid-rows-3 w-52 rounded-lg border border-gray-300">\n  <button className="px-3 py-2 text-left border-b">1. Profil Kelas 302</button>\n</div>`}
          >
            <div className="relative inline-grid grid-rows-3 w-52 rounded-lg border border-gray-300 overflow-hidden bg-white text-xs divide-y divide-gray-200">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-primary-50/90 transition-transform duration-[220ms] ease-[cubic-bezier(0.23,1,0.32,1)]"
                style={{
                  transform: `translate3d(0, ${Math.max(0, ['1. Profil Kelas 302', '2. Daftar Hadir Siswa', '3. Rapor Semester'].indexOf(activeBtnGroupV)) * 100}%, 0)`,
                }}
              >
                <span className="absolute left-0 inset-y-1.5 w-[3px] rounded-r-full bg-primary-600" />
              </span>
              {['1. Profil Kelas 302', '2. Daftar Hadir Siswa', '3. Rapor Semester'].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setActiveBtnGroupV(item)}
                  className={`relative z-10 px-3.5 py-2 rounded-none text-left font-semibold transition-colors duration-200 cursor-pointer ${
                    activeBtnGroupV === item ? 'text-primary-700' : 'text-gray-700 hover:text-gray-950'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </UiDocSection>

          <UiDocSection
            id="btn-icons"
            title="Buttons with icons"
            classesHint="inline-flex items-center gap-1.5"
            codeSnippet={`<button className="px-3 py-2 rounded-lg bg-gray-900 text-white flex items-center gap-1.5">\n  <Send className="w-3.5 h-3.5" /> <span>Kirim Tugas</span>\n</button>`}
          >
            <div className="flex flex-wrap gap-2.5 text-xs font-semibold">
              <button className="group px-3 py-2 rounded-lg bg-gray-900 text-white flex items-center gap-1.5 cursor-pointer hover:bg-black">
                <Send className="w-3.5 h-3.5 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                <span>Kirim Tugas</span>
              </button>
              <button className="group px-3.5 py-2 rounded-lg bg-primary-50 text-primary-700 border border-primary-200 flex items-center gap-2 cursor-pointer hover:bg-primary-100">
                <BookOpen className="w-4 h-4 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-110" />
                <span>Buka materi</span>
              </button>
            </div>
          </UiDocSection>

          <UiDocSection
            id="btn-icon-only"
            title="Icons buttons"
            classesHint="w-8 h-8 rounded-lg / w-9 h-9 rounded-full"
            codeSnippet={`<button className="w-8 h-8 rounded-lg border flex items-center justify-center"><Heart className="w-4 h-4 text-rose-500" /></button>`}
          >
            <div className="flex items-center gap-3">
              <button className="group w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 cursor-pointer">
                <Heart className="w-4 h-4 text-rose-500 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-110" />
              </button>
              <button className="group w-9 h-9 rounded-full bg-primary-600 text-white flex items-center justify-center hover:bg-primary-700 cursor-pointer">
                <Share2 className="w-4 h-4 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-110" />
              </button>
            </div>
          </UiDocSection>

          <UiDocSection
            id="btn-social"
            title="Social buttons"
            classesHint="inline-flex items-center gap-1.5 font-semibold"
            codeSnippet={`<button className="px-3 py-1.5 rounded-lg bg-gray-900 text-white flex items-center gap-1.5"><Github className="w-3.5 h-3.5" /> GitHub</button>`}
          >
            <div className="flex flex-wrap gap-2.5 text-xs font-semibold">
              <button className="group px-3 py-1.5 rounded-lg bg-gray-900 text-white flex items-center gap-1.5 cursor-pointer hover:bg-black">
                <Github className="w-3.5 h-3.5 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-110" />
                <span>GitHub</span>
              </button>
              <button className="group px-3 py-1.5 rounded-lg bg-sky-600 text-white flex items-center gap-1.5 cursor-pointer hover:bg-sky-700">
                <Globe className="w-3.5 h-3.5 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-110" />
                <span>Portal Web</span>
              </button>
              <button className="group px-3 py-1.5 rounded-lg bg-primary-600 text-white flex items-center gap-1.5 cursor-pointer hover:bg-primary-700">
                <Mail className="w-3.5 h-3.5 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-110" />
                <span>Google SSO</span>
              </button>
            </div>
          </UiDocSection>

          <UiDocSection
            id="btn-badge"
            title="Badge on buttons"
            classesHint="inline-flex items-center gap-2"
            codeSnippet={`<button className="px-3 py-2 rounded-lg border flex items-center gap-2">Notifikasi <span className="px-1.5 py-0.5 rounded-full bg-rose-600 text-white">4</span></button>`}
          >
            <button className="px-3 py-2 rounded-lg border border-gray-300 bg-white text-xs font-semibold flex items-center gap-2">
              <span>Notifikasi</span>
              <span className="px-1.5 py-0.5 rounded-full bg-rose-600 text-white text-[10px] tabular-nums">4</span>
            </button>
          </UiDocSection>

          <UiDocSection
            id="btn-dropdown"
            title="Dropdown button"
            classesHint="relative inline-flex rounded-lg"
            codeSnippet={`<div className="relative inline-flex rounded-lg">\n  <button className="px-3 py-1.5 bg-gray-900 text-white rounded-l-lg">Dropdown Ekspor</button>\n  <button className="px-2 py-1.5 bg-gray-900 text-white rounded-r-lg">▼</button>\n</div>`}
          >
            <div className="pb-24 text-xs">
              <div ref={splitDropdownRef} className="relative inline-flex rounded-lg">
                <button
                  onClick={() => triggerToast('Ekspor', 'Memproses ekspor silabus...', 'info')}
                  className="px-3 py-1.5 bg-gray-900 text-white font-semibold rounded-l-lg hover:bg-black border-r border-gray-800 cursor-pointer"
                >
                  Dropdown Ekspor
                </button>
                <button
                  onClick={() => setSplitDropdownOpen(!splitDropdownOpen)}
                  className="px-2 py-1.5 bg-gray-900 text-white rounded-r-lg hover:bg-black cursor-pointer"
                >
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-[180ms] ease-[cubic-bezier(0.23,1,0.32,1)] ${splitDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {splitDropdownOpen && (
                  <div className="absolute left-0 top-9 w-40 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border border-gray-300 p-1 z-20 animate-ui-pop">
                    <button onClick={() => setSplitDropdownOpen(false)} className="w-full text-left p-1.5 rounded hover:bg-gray-100 text-gray-700 transition-colors duration-200 cursor-pointer">
                      Format PDF (.pdf)
                    </button>
                    <button onClick={() => setSplitDropdownOpen(false)} className="w-full text-left p-1.5 rounded hover:bg-gray-100 text-gray-700 transition-colors duration-200 cursor-pointer">
                      Format Excel (.xlsx)
                    </button>
                  </div>
                )}
              </div>
            </div>
          </UiDocSection>

          <UiDocSection
            id="btn-dropup"
            title="Dropup button"
            classesHint="relative inline-flex rounded-lg / bottom-9"
            codeSnippet={`<div className="relative inline-flex rounded-lg">\n  <button className="px-3 py-1.5 bg-white border rounded-lg">Dropup Menu ▲</button>\n</div>`}
          >
            <div className="pt-20 text-xs">
              <div ref={dropupRef} className="relative inline-flex rounded-lg">
                <button
                  onClick={() => setDropupOpen(!dropupOpen)}
                  className="px-3 py-1.5 bg-white border border-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-50 flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Dropup Menu</span>
                  <ChevronUp className={`w-3.5 h-3.5 transition-transform duration-[180ms] ease-[cubic-bezier(0.23,1,0.32,1)] ${dropupOpen ? 'rotate-180' : ''}`} />
                </button>
                {dropupOpen && (
                  <div className="absolute left-0 bottom-9 w-40 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border border-gray-300 p-1 z-20 animate-ui-pop-up">
                    <button onClick={() => setDropupOpen(false)} className="w-full text-left p-1.5 rounded hover:bg-gray-100 text-gray-700 transition-colors duration-200 cursor-pointer">
                      Duplikat Bab
                    </button>
                    <button onClick={() => setDropupOpen(false)} className="w-full text-left p-1.5 rounded hover:bg-gray-100 text-rose-600 transition-colors duration-200 cursor-pointer">
                      Hapus Draft
                    </button>
                  </div>
                )}
              </div>
            </div>
          </UiDocSection>

          <UiDocSection
            id="btn-action-pills"
            title="Action Pill Buttons (Primary Rose #ee2e65)"
            description="Token tombol standar dari buttonStyles.ts: tinggi konsisten h-9, rounded-full, whitespace-nowrap shrink-0, dengan Primary Rose (#ee2e65) sebagai CTA utama serta adaptasi 1 kata di mode mobile."
            classesHint="ACTION_BTN_PRIMARY | ACTION_BTN_SECONDARY | ACTION_BTN_SOFT_PRIMARY | SplitFilterButton"
            codeSnippet={`import { ACTION_BTN_PRIMARY, ACTION_BTN_SECONDARY } from '../constants/buttonStyles';\n\n<button className={ACTION_BTN_PRIMARY}>\n  <Plus className="w-4 h-4 shrink-0" />\n  <span className="sm:hidden">New</span>\n  <span className="hidden sm:inline">New Component</span>\n</button>`}
            actions={
              <div className="inline-flex bg-gray-100 p-0.5 rounded-lg text-[11px] font-semibold">
                <button
                  type="button"
                  onClick={() => setCtaCompactMode('desktop')}
                  className={`px-2.5 py-1 rounded-md cursor-pointer transition-all ${
                    ctaCompactMode === 'desktop' ? 'bg-white text-gray-900 shadow-2xs' : 'text-gray-500'
                  }`}
                >
                  Desktop
                </button>
                <button
                  type="button"
                  onClick={() => setCtaCompactMode('mobile')}
                  className={`px-2.5 py-1 rounded-md cursor-pointer transition-all ${
                    ctaCompactMode === 'mobile' ? 'bg-white text-gray-900 shadow-2xs' : 'text-gray-500'
                  }`}
                >
                  Mobile (1-Word)
                </button>
              </div>
            }
          >
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => triggerToast('ACTION_BTN_PRIMARY', 'Primary Rose (#ee2e65) CTA diklik.', 'success')}
                  className={ACTION_BTN_PRIMARY}
                >
                  <Plus className="w-4 h-4 shrink-0" />
                  <span>{ctaCompactMode === 'mobile' ? 'Create' : 'New Component'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => triggerToast('ACTION_BTN_SECONDARY', 'Secondary Outline CTA diklik.', 'info')}
                  className={ACTION_BTN_SECONDARY}
                >
                  <Download className="w-4 h-4 shrink-0" />
                  <span>{ctaCompactMode === 'mobile' ? 'Export' : 'Export JSON'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => triggerToast('ACTION_BTN_SOFT_PRIMARY', 'Soft Primary CTA diklik.', 'info')}
                  className={ACTION_BTN_SOFT_PRIMARY}
                >
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{ctaCompactMode === 'mobile' ? 'Verify' : 'Verify Tokens'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => triggerToast('ACTION_BTN_DARK', 'Dark Neutral CTA diklik.', 'info')}
                  className={ACTION_BTN_DARK}
                >
                  <Sliders className="w-4 h-4 shrink-0" />
                  <span>{ctaCompactMode === 'mobile' ? 'Config' : 'Configure'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => triggerToast('ACTION_BTN_DANGER_SOFT', 'Destructive Soft CTA diklik.', 'warning')}
                  className={ACTION_BTN_DANGER_SOFT}
                >
                  <Minus className="w-4 h-4 shrink-0" />
                  <span>{ctaCompactMode === 'mobile' ? 'Reset' : 'Reset Token'}</span>
                </button>
              </div>

              <div className="pt-2 border-t border-black/[0.12] flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs text-gray-500">Pasangan filter sebaris:</span>
                <SplitFilterButton
                  value={actionSplitVal}
                  onChange={setActionSplitVal}
                  prefix="Status"
                  icon={Filter}
                  variant="surface"
                  options={[
                    { value: 'All', label: 'All Tokens', mobileLabel: 'All' },
                    { value: 'Stable', label: 'Stable v2', mobileLabel: 'Stable' },
                    { value: 'Draft', label: 'Draft Spec', mobileLabel: 'Draft' },
                  ]}
                />
              </div>
            </div>
          </UiDocSection>
        </UiDocPage>
      )}

      {/* 3.2 FORM ELEMENTS */}
      {isVisible('formelements') && (
        <UiDocPage
          title="Form Elements"
          subLinks={[
            { id: 'fe-input', label: 'Input' },
            { id: 'fe-helptext', label: 'Help text' },
            { id: 'fe-readonly', label: 'Readonly plain text' },
            { id: 'fe-textarea', label: 'Textarea' },
            { id: 'fe-select', label: 'Select' },
            { id: 'fe-sizing', label: 'Sizing' },
            { id: 'fe-shapes', label: 'Input Shapes' },
            { id: 'fe-check', label: 'Checkbox' },
            { id: 'fe-radio', label: 'Radio' },
            { id: 'fe-switch', label: 'Switch' },
            { id: 'fe-multiselect', label: 'Multiple select Menu' },
            { id: 'fe-file', label: 'File browser' },
            { id: 'fe-datalist', label: 'Datalists' },
            { id: 'fe-color', label: 'Color' },
            { id: 'fe-range', label: 'Range' },
          ]}
        >
          <UiDocSection
            id="fe-input"
            title="Input"
            classesHint="w-full px-3 py-2 rounded-lg border border-gray-300"
            codeSnippet={`<input type="text" value={val} className="w-full px-3 py-2 rounded-lg border border-gray-300" />`}
          >
            <div className="max-w-md text-xs">
              <label className="font-semibold text-gray-700 block mb-1">Judul Mata Pelajaran</label>
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-primary-600"
              />
            </div>
          </UiDocSection>

          <UiDocSection
            id="fe-helptext"
            title="Help text"
            classesHint="text-[11px] text-gray-500 mt-1 block"
            codeSnippet={`<input type="text" className="w-full px-3 py-2 rounded-lg border" />\n<span className="text-[11px] text-gray-500 mt-1 block">Help text panduan.</span>`}
          >
            <div className="max-w-md text-xs">
              <input
                type="text"
                placeholder="Masukkan kode modul..."
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-primary-600"
              />
              <span className="text-[11px] text-gray-500 mt-1 block">
                Help text: Masukkan judul bab sesuai silabus Kurikulum Merdeka.
              </span>
            </div>
          </UiDocSection>

          <UiDocSection
            id="fe-readonly"
            title="Readonly plain text"
            classesHint="bg-transparent border-0 text-gray-600 font-mono"
            codeSnippet={`<input type="text" readOnly value="tokens@uikit.design" className="bg-transparent border-0 font-mono" />`}
          >
            <div className="max-w-md text-xs">
              <label className="font-semibold text-gray-700 block mb-1">Email Referensi Sistem</label>
              <input
                type="text"
                readOnly
                value="tokens@uikit.design (Readonly)"
                className="w-full px-0 py-1 bg-transparent border-0 text-gray-600 font-mono focus:outline-none"
              />
            </div>
          </UiDocSection>

          <UiDocSection
            id="fe-textarea"
            title="Textarea"
            classesHint="w-full px-3 py-2 rounded-lg border border-gray-300 resize-none"
            codeSnippet={`<textarea rows={2} value={val} className="w-full px-3 py-2 rounded-lg border border-gray-300" />`}
          >
            <div className="max-w-md text-xs">
              <textarea
                rows={3}
                value={textareaText}
                onChange={(e) => setTextareaText(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-primary-600 resize-none"
              />
            </div>
          </UiDocSection>

          <UiDocSection
            id="fe-select"
            title="Select"
            classesHint="CustomSelect / rounded-xl popup + Primary Rose active highlight"
            codeSnippet={`<CustomSelect\n  value={val}\n  onChange={setVal}\n  placeholder="Pilih kelas..."\n  options={[\n    { value: '302', label: 'Class 302 — Kalkulus IV' },\n    { value: '303', label: 'Class 303 — Fisika Induksi' },\n  ]}\n/>`}
          >
            <div className="max-w-md text-xs">
              <CustomSelect
                className="w-full"
                triggerClassName="px-3 py-2"
                value={basicSelectVal}
                onChange={setBasicSelectVal}
                placeholder="Open this select menu"
                ariaLabel="Contoh Select UI Kit"
                options={[
                  { value: '1', label: 'Class 302 — Kalkulus IV' },
                  { value: '2', label: 'Class 303 — Fisika Induksi' },
                  { value: '3', label: 'Class 304 — Seni Rupa Murni' },
                ]}
              />
            </div>
          </UiDocSection>

          <UiDocSection
            id="fe-sizing"
            title="Sizing"
            classesHint="py-1 text-xs / py-2 text-sm / py-2.5 text-base"
            codeSnippet={`<input className="px-2.5 py-1 text-xs rounded-md border" />\n<input className="px-3.5 py-2.5 text-base rounded-xl border" />`}
          >
            <div className="max-w-md space-y-2">
              <input type="text" placeholder="Small input (py-1 text-xs)" className="w-full px-2.5 py-1 text-xs rounded-md border border-gray-300" />
              <input type="text" placeholder="Default input (py-2 text-sm)" className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300" />
              <input type="text" placeholder="Large input (py-2.5 text-base)" className="w-full px-3.5 py-2.5 text-base rounded-xl border border-gray-300" />
            </div>
          </UiDocSection>

          <UiDocSection
            id="fe-shapes"
            title="Input Shapes"
            classesHint="rounded-none / rounded-lg / rounded-full"
            codeSnippet={`<input className="rounded-none" />\n<input className="rounded-lg" />\n<input className="rounded-full" />`}
          >
            <div className="max-w-lg grid grid-cols-3 gap-2.5 text-xs">
              <input type="text" placeholder="Square" className="px-2.5 py-2 rounded-none border border-gray-300" />
              <input type="text" placeholder="Rounded" className="px-2.5 py-2 rounded-lg border border-gray-300" />
              <input type="text" placeholder="Pill" className="px-3 py-2 rounded-full border border-gray-300" />
            </div>
          </UiDocSection>

          <UiDocSection
            id="fe-check"
            title="Checkbox"
            classesHint="rounded text-primary-600"
            codeSnippet={`<input type="checkbox" className="w-4 h-4 rounded text-primary-600" />`}
          >
            <div className="space-y-2.5 text-xs max-w-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={checkboxA} onChange={(e) => setCheckboxA(e.target.checked)} className="w-3.5 h-3.5 rounded text-primary-600" />
                <span>Small Check (sm)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={checkboxB} onChange={(e) => setCheckboxB(e.target.checked)} className="w-4 h-4 rounded text-primary-600" />
                <span>Medium Check (md)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-5 h-5 rounded text-primary-600" />
                <span>Large Check (lg)</span>
              </label>
            </div>
          </UiDocSection>

          <UiDocSection
            id="fe-radio"
            title="Radio"
            classesHint="text-primary-600"
            codeSnippet={`<input type="radio" name="method" className="w-4 h-4 text-primary-600" />`}
          >
            <div className="space-y-2.5 text-xs max-w-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="method" value="online" checked={radioSelected === 'online'} onChange={(e) => setRadioSelected(e.target.value)} className="w-3.5 h-3.5 text-primary-600" />
                <span>Online Video (sm)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="method" value="lab" checked={radioSelected === 'lab'} onChange={(e) => setRadioSelected(e.target.value)} className="w-4 h-4 text-primary-600" />
                <span>Lab Tatap Muka (md)</span>
              </label>
            </div>
          </UiDocSection>

          <UiDocSection
            id="fe-switch"
            title="Switch"
            classesHint="ToggleSwitch | Spring physics thumb + --ease-out track"
            codeSnippet={`<ToggleSwitch checked={on} onChange={setOn} color="primary" />`}
          >
            <div className="flex flex-wrap items-center gap-5 text-xs">
              <ToggleSwitch
                checked={switchA}
                onChange={setSwitchA}
                color="primary"
                ariaLabel="Primary switch preview"
              />
              <ToggleSwitch
                checked={switchB}
                onChange={setSwitchB}
                color="emerald"
                ariaLabel="Emerald switch preview"
              />
            </div>
          </UiDocSection>

          <UiDocSection
            id="fe-multiselect"
            title="Multiple select Menu"
            classesHint="select multiple h-24 rounded-lg border"
            codeSnippet={`<select multiple value={selected} className="w-full h-24 p-2 rounded-lg border">...</select>`}
          >
            <div className="max-w-xs text-xs">
              <select
                multiple
                value={multiMenuSelected}
                onChange={(e) => setMultiMenuSelected(Array.from(e.target.selectedOptions, (o) => o.value))}
                className="w-full h-24 p-2 rounded-lg border border-gray-300 text-xs focus:outline-none focus:border-primary-600"
              >
                <option value="Kalkulus">Kalkulus IV</option>
                <option value="Fisika">Fisika Induksi</option>
                <option value="Statistika">Statistika Terapan</option>
                <option value="Kimia">Kimia Organik</option>
              </select>
            </div>
          </UiDocSection>

          <UiDocSection
            id="fe-file"
            title="File browser"
            classesHint="flex items-center justify-between px-3 py-2 rounded-lg border bg-gray-50"
            codeSnippet={`<label className="flex items-center justify-between px-3 py-2 rounded-lg border bg-gray-50">\n  <span>{fileName}</span>\n  <span className="px-2 py-0.5 bg-gray-900 text-white">Browse</span>\n</label>`}
          >
            <div className="max-w-sm text-xs">
              <label className="group flex items-center justify-between px-3 py-2 rounded-lg border border-gray-300 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                <span className="truncate text-gray-600">{selectedFileName}</span>
                <span className="px-2 py-0.5 rounded bg-gray-900 group-hover:bg-black text-white font-semibold text-[11px] shrink-0 transition-colors">Browse</span>
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) setSelectedFileName(f.name);
                  }}
                />
              </label>
            </div>
          </UiDocSection>

          <UiDocSection
            id="fe-datalist"
            title="Datalists"
            classesHint="list='uikit-categories'"
            codeSnippet={`<input list="categories" placeholder="Ketik kategori..." className="px-3 py-2 rounded-lg border" />`}
          >
            <div className="max-w-sm text-xs">
              <input
                list="uikit-categories"
                placeholder="Ketik atau pilih kategori..."
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-primary-600"
              />
              <datalist id="uikit-categories">
                <option value="1. Utilities (Grid & Color)" />
                <option value="2. Data Display (Accordion & Cards)" />
                <option value="3. Data Entry (Action Pill Buttons)" />
                <option value="12. Mobile UI Kit (Dock & Motion)" />
              </datalist>
            </div>
          </UiDocSection>

          <UiDocSection
            id="fe-color"
            title="Color"
            classesHint="type='color'"
            codeSnippet={`<input type="color" value={color} className="w-10 h-9 rounded border p-0.5" />`}
          >
            <div className="flex items-center gap-3 text-xs">
              <input
                type="color"
                value={nativeColor}
                onChange={(e) => setNativeColor(e.target.value)}
                className="w-10 h-9 rounded border border-gray-300 p-0.5 cursor-pointer"
              />
              <span className="font-mono text-gray-700 font-semibold">{nativeColor}</span>
            </div>
          </UiDocSection>

          <UiDocSection
            id="fe-range"
            title="Range"
            classesHint="type='range' accent-primary-600"
            codeSnippet={`<input type="range" min={0} max={100} className="w-full accent-primary-600" />`}
          >
            <div className="max-w-sm space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-700">Nilai Aktif</span>
                <span className="font-mono text-primary-600 font-bold tabular-nums">{nativeRange}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={nativeRange}
                onChange={(e) => setNativeRange(Number(e.target.value))}
                className="w-full accent-primary-600"
              />
            </div>
          </UiDocSection>
        </UiDocPage>
      )}

      {/* 3.3 INPUT GROUPS */}
      {isVisible('inputgroups') && (
        <UiDocPage
          title="Input Groups"
          subLinks={[
            { id: 'ig-basic', label: 'Basic Example' },
            { id: 'ig-sizing', label: 'Sizing' },
            { id: 'ig-multi-input', label: 'Multiple inputs' },
            { id: 'ig-multi-addon', label: 'Multiple addons' },
            { id: 'ig-custom', label: 'Custom forms' },
          ]}
        >
          <UiDocSection
            id="ig-basic"
            title="Basic Example"
            classesHint="flex / rounded-l-lg bg-gray-100 border border-r-0"
            codeSnippet={`<div className="flex">\n  <span className="px-3 py-2 rounded-l-lg bg-gray-100 border border-r-0">@</span>\n  <input className="flex-1 px-3 py-2 rounded-r-lg border" />\n</div>`}
          >
            <div className="max-w-sm flex text-xs">
              <span className="px-3 py-2 rounded-l-lg bg-gray-100 border border-r-0 border-gray-300 text-gray-600 font-semibold">@</span>
              <input type="text" defaultValue="guru.kalkulus" className="flex-1 px-3 py-2 rounded-r-lg border border-gray-300 focus:outline-none focus:border-primary-600" />
            </div>
          </UiDocSection>

          <UiDocSection
            id="ig-sizing"
            title="Sizing"
            classesHint="py-1 text-xs / py-2 text-sm / py-2.5 text-base"
            codeSnippet={`<div className="flex text-xs"><span className="px-2.5 py-1 bg-gray-100 border">Sm</span><input className="px-2.5 py-1 border" /></div>`}
          >
            <div className="max-w-sm space-y-2.5">
              <div className="flex text-xs">
                <span className="px-2.5 py-1 rounded-l-md bg-gray-100 border border-r-0 border-gray-300 font-semibold">Sm</span>
                <input type="text" defaultValue="Small group" className="flex-1 px-2.5 py-1 rounded-r-md border border-gray-300" />
              </div>
              <div className="flex text-sm">
                <span className="px-3 py-2 rounded-l-lg bg-gray-100 border border-r-0 border-gray-300 font-semibold">Md</span>
                <input type="text" defaultValue="Default group" className="flex-1 px-3 py-2 rounded-r-lg border border-gray-300" />
              </div>
              <div className="flex text-base">
                <span className="px-3.5 py-2.5 rounded-l-xl bg-gray-100 border border-r-0 border-gray-300 font-semibold">Lg</span>
                <input type="text" defaultValue="Large group" className="flex-1 px-3.5 py-2.5 rounded-r-xl border border-gray-300" />
              </div>
            </div>
          </UiDocSection>

          <UiDocSection
            id="ig-multi-input"
            title="Multiple inputs"
            classesHint="flex / border-r-0"
            codeSnippet={`<div className="flex"><span className="px-3 py-2 bg-gray-100 border">Nama</span><input className="w-1/2 border" /><input className="w-1/2 border" /></div>`}
          >
            <div className="max-w-md flex text-xs">
              <span className="px-3 py-2 rounded-l-lg bg-gray-100 border border-r-0 border-gray-300 font-semibold">Nama</span>
              <input type="text" defaultValue="James" className="w-1/2 px-2.5 py-2 border border-r-0 border-gray-300" />
              <input type="text" defaultValue="Wilson" className="w-1/2 px-2.5 py-2 rounded-r-lg border border-gray-300" />
            </div>
          </UiDocSection>

          <UiDocSection
            id="ig-multi-addon"
            title="Multiple addons"
            classesHint="flex / bg-gray-100 + bg-gray-50"
            codeSnippet={`<div className="flex">\n  <span className="px-2.5 py-2 bg-gray-100 border">Rp</span>\n  <span className="px-2.5 py-2 bg-gray-50 border">0.00</span>\n  <input className="flex-1 px-2.5 py-2 border" />\n</div>`}
          >
            <div className="max-w-md flex text-xs">
              <span className="px-2.5 py-2 rounded-l-lg bg-gray-100 border border-r-0 border-gray-300 font-bold">Rp</span>
              <span className="px-2.5 py-2 bg-gray-50 border border-r-0 border-gray-300 text-gray-500">0.00</span>
              <input type="text" defaultValue="150.000" className="flex-1 px-2.5 py-2 rounded-r-lg border border-gray-300 font-mono" />
            </div>
          </UiDocSection>

          <UiDocSection
            id="ig-custom"
            title="Custom forms"
            classesHint="flex / CustomSelect + input + button"
            codeSnippet={`<div className="flex">\n  <CustomSelect triggerClassName="rounded-l-lg rounded-r-none bg-gray-100 border-r-0" ... />\n  <input className="flex-1 border" />\n  <button className="rounded-r-lg bg-gray-900 text-white">Terapkan</button>\n</div>`}
          >
            <div className="max-w-md flex text-xs">
              <CustomSelect
                value={groupSelectClass}
                onChange={setGroupSelectClass}
                triggerClassName="px-2.5 py-2 rounded-l-lg rounded-r-none bg-gray-100 border-r-0 border-gray-300 font-semibold"
                ariaLabel="Pilih kelas kode akses"
                options={[
                  { value: 'Class 302', label: 'Class 302' },
                  { value: 'Class 303', label: 'Class 303' },
                ]}
              />
              <input type="text" defaultValue="Kode Akses" className="flex-1 px-2.5 py-2 border border-gray-300 focus:outline-none focus:border-primary-600" />
              <button
                onClick={() => triggerToast('Input Group', `Kode akses ${groupSelectClass} diterapkan!`, 'success')}
                className="px-3.5 py-2 rounded-r-lg bg-gray-900 text-white font-semibold cursor-pointer"
              >
                Terapkan
              </button>
            </div>
          </UiDocSection>
        </UiDocPage>
      )}

      {/* 3.4 FORM LAYOUT */}
      {isVisible('formlayout') && (
        <UiDocPage
          title="Form Layout"
          subLinks={[
            { id: 'fl-grid', label: 'Form grid' },
            { id: 'fl-gutters', label: 'Gutters' },
            { id: 'fl-icon', label: 'Form with icon' },
            { id: 'fl-horizontal', label: 'Horizontal form' },
            { id: 'fl-inline', label: 'Inline forms' },
          ]}
        >
          <UiDocSection
            id="fl-grid"
            title="Form grid"
            classesHint="grid grid-cols-1 sm:grid-cols-2 gap-3"
            codeSnippet={`<div className="grid grid-cols-2 gap-3">\n  <input placeholder="Nama Depan" />\n  <input placeholder="Nama Belakang" />\n</div>`}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs max-w-xl">
              <input type="text" placeholder="First name" defaultValue="James" className="w-full px-3 py-2 rounded-lg border border-gray-300" />
              <input type="text" placeholder="Last name" defaultValue="Wilson" className="w-full px-3 py-2 rounded-lg border border-gray-300" />
            </div>
          </UiDocSection>

          <UiDocSection
            id="fl-gutters"
            title="Gutters"
            classesHint="grid grid-cols-1 sm:grid-cols-2 gap-5"
            codeSnippet={`<div className="grid grid-cols-2 gap-5">\n  <input placeholder="Email" />\n  <input placeholder="Password" />\n</div>`}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs max-w-xl">
              <div>
                <label className="font-semibold text-gray-700 block mb-1">Email</label>
                <input type="email" placeholder="james@uikit.design" className="w-full px-3 py-2 rounded-lg border border-gray-300" />
              </div>
              <div>
                <label className="font-semibold text-gray-700 block mb-1">Password</label>
                <input type="password" defaultValue="password123" className="w-full px-3 py-2 rounded-lg border border-gray-300" />
              </div>
              <div className="sm:col-span-2">
                <label className="font-semibold text-gray-700 block mb-1">Alamat Kampus</label>
                <input type="text" placeholder="Jl. Akademik No. 12" className="w-full px-3 py-2 rounded-lg border border-gray-300" />
              </div>
            </div>
          </UiDocSection>

          <UiDocSection
            id="fl-icon"
            title="Form with icon"
            classesHint="relative / pl-9 pr-3"
            codeSnippet={`<div className="relative">\n  <User className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2" />\n  <input className="w-full pl-9 pr-3 py-2 rounded-lg border" />\n</div>`}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs max-w-xl">
              <div>
                <label className="font-semibold text-gray-700 block mb-1">Nama Pengajar</label>
                <div className="relative">
                  <User className="w-3.5 h-3.5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input type="text" defaultValue="James Wilson" className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-300" />
                </div>
              </div>
              <div>
                <label className="font-semibold text-gray-700 block mb-1">Email Kampus</label>
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input type="email" defaultValue="james@edu.id" className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-300" />
                </div>
              </div>
            </div>
          </UiDocSection>

          <UiDocSection
            id="fl-horizontal"
            title="Horizontal form"
            classesHint="grid grid-cols-12 items-center gap-2"
            codeSnippet={`<div className="grid grid-cols-12 items-center gap-2">\n  <label className="col-span-4 font-semibold">Email Dosen</label>\n  <input className="col-span-8 px-3 py-1.5 rounded-lg border" />\n</div>`}
          >
            <div className="max-w-md space-y-3 text-xs">
              <div className="grid grid-cols-12 items-center gap-2">
                <label className="col-span-4 font-semibold text-gray-700">Email Lead</label>
                <input type="email" defaultValue="lead@uikit.design" className="col-span-8 px-3 py-1.5 rounded-lg border border-gray-300" />
              </div>
              <div className="grid grid-cols-12 items-center gap-2">
                <label className="col-span-4 font-semibold text-gray-700">Kode Kelas</label>
                <input type="text" defaultValue="Class 302" className="col-span-8 px-3 py-1.5 rounded-lg border border-gray-300" />
              </div>
            </div>
          </UiDocSection>

          <UiDocSection
            id="fl-inline"
            title="Inline forms"
            classesHint="flex flex-wrap items-center gap-2"
            codeSnippet={`<div className="flex flex-wrap items-center gap-2">\n  <input placeholder="Cari..." />\n  <CustomSelect value={term} onChange={setTerm} options={...} />\n  <button>Cari</button>\n</div>`}
          >
            <div className="max-w-lg flex flex-wrap items-center gap-2 text-xs">
              <input type="text" placeholder="Cari NIP/NIS..." className="flex-1 min-w-[140px] px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-primary-600" />
              <CustomSelect
                value={inlineTermVal}
                onChange={setInlineTermVal}
                triggerClassName="px-3 py-2"
                ariaLabel="Pilih Term"
                options={[
                  { value: 'Term 1', label: 'Term 1' },
                  { value: 'Term 2', label: 'Term 2' },
                ]}
              />
              <button
                onClick={() => triggerToast('Filter Inline', `Menampilkan data ${inlineTermVal}.`, 'info')}
                className="px-4 py-2 rounded-lg bg-gray-900 text-white font-semibold cursor-pointer"
              >
                Cari
              </button>
            </div>
          </UiDocSection>
        </UiDocPage>
      )}

      {/* 3.5 FORM MASK */}
      {isVisible('formmask') && (
        <UiDocPage
          title="Form Mask"
        >
          <UiDocSection
            title="Masked Input Patterns"
            classesHint="font-mono pl-8 pr-3 py-2 rounded-lg border border-gray-300"
            codeSnippet={`<input type="text" value={phoneMask} onChange={(e) => setPhoneMask(e.target.value)} className="font-mono pl-8 pr-3 py-2 rounded-lg border" />`}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="font-semibold text-gray-700 block mb-1">Telepon</label>
                <div className="relative">
                  <Phone className="w-3.5 h-3.5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input type="text" value={phoneMask} onChange={(e) => setPhoneMask(e.target.value)} className="w-full pl-8 pr-3 py-2 rounded-lg border border-gray-300 font-mono" />
                </div>
              </div>
              <div>
                <label className="font-semibold text-gray-700 block mb-1">NISN</label>
                <div className="relative">
                  <Hash className="w-3.5 h-3.5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input type="text" value={studentIdMask} onChange={(e) => setStudentIdMask(e.target.value)} className="w-full pl-8 pr-3 py-2 rounded-lg border border-gray-300 font-mono" />
                </div>
              </div>
              <div>
                <label className="font-semibold text-gray-700 block mb-1">RFID Card</label>
                <div className="relative">
                  <CreditCard className="w-3.5 h-3.5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input type="text" value={cardMask} onChange={(e) => setCardMask(e.target.value)} className="w-full pl-8 pr-3 py-2 rounded-lg border border-gray-300 font-mono" />
                </div>
              </div>
              <div>
                <label className="font-semibold text-gray-700 block mb-1">Tanggal & Biaya ({currencyMask})</label>
                <div className="relative">
                  <Calendar className="w-3.5 h-3.5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input type="text" value={dateMask} onChange={(e) => setDateMask(e.target.value)} className="w-full pl-8 pr-3 py-2 rounded-lg border border-gray-300 font-mono" />
                </div>
              </div>
            </div>
          </UiDocSection>
        </UiDocPage>
      )}

      {/* 3.6 FORM VALIDATION */}
      {isVisible('formvalidation') && (
        <UiDocPage
          title="Form Validation"
          subLinks={[
            { id: 'fv-custom', label: 'Custom styles' },
            { id: 'fv-browser', label: 'Browser Default' },
            { id: 'fv-server', label: 'Server side' },
            { id: 'fv-supported', label: 'Supported elements' },
            { id: 'fv-tooltips', label: 'Tooltips' },
          ]}
        >
          <UiDocSection
            id="fv-custom"
            title="Custom styles"
            classesHint="border-emerald-500 bg-emerald-50/30 / border-rose-500 bg-rose-50/30"
            codeSnippet={`<input type="email" value={email} className={isValid ? 'border-emerald-500' : 'border-rose-500'} />`}
          >
            <div className="max-w-md text-xs">
              <label className="font-semibold text-gray-700 block mb-1">Email Live Validation</label>
              <div className="relative">
                <input
                  type="email"
                  value={liveEmail}
                  onChange={(e) => setLiveEmail(e.target.value)}
                  className={`w-full px-3 py-2 pr-9 rounded-lg border focus:outline-none ${
                    isEmailValid ? 'border-emerald-500 bg-emerald-50/30' : 'border-rose-500 bg-rose-50/30'
                  }`}
                />
                {isEmailValid ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 absolute right-3 top-1/2 -translate-y-1/2 animate-ui-check" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-600 absolute right-3 top-1/2 -translate-y-1/2 animate-ui-check" />
                )}
              </div>
            </div>
          </UiDocSection>

          <UiDocSection
            id="fv-browser"
            title="Browser Default"
            classesHint="input required"
            codeSnippet={`<form onSubmit={handleSubmit}><input required type="text" /><button type="submit">Cek</button></form>`}
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                triggerToast('Browser Default', 'Validasi HTML5 required berhasil lolos!', 'success');
              }}
              className="max-w-md flex items-center gap-2 text-xs"
            >
              <input required type="text" placeholder="Wajib diisi sebelum kirim (required)..." className="flex-1 px-3 py-2 rounded-lg border border-gray-300" />
              <button type="submit" className="px-4 py-2 rounded-lg bg-gray-900 text-white font-semibold cursor-pointer">
                Cek
              </button>
            </form>
          </UiDocSection>

          <UiDocSection
            id="fv-server"
            title="Server side"
            description='Simulasikan verifikasi username ke server (ketik "admin" untuk memicu status terpakai).'
            classesHint="text-emerald-600 / text-rose-600"
            codeSnippet={`<span className={status === 'available' ? 'text-emerald-600' : 'text-rose-600'}>\n  {status === 'available' ? 'Tersedia' : 'Sudah dipakai'}\n</span>`}
          >
            <div className="max-w-md space-y-2 text-xs">
              <label className="font-semibold text-gray-700 block">Server-side Username Check</label>
              <input
                type="text"
                value={serverUsername}
                onChange={(e) => handleCheckServerUsername(e.target.value)}
                className={`w-full px-3 py-2 rounded-lg border ${
                  serverStatus === 'available' ? 'border-emerald-500' : 'border-rose-500'
                }`}
              />
              <span
                key={`${serverChecking}-${serverStatus}`}
                className={`text-[11px] font-semibold block ${
                  serverStatus === 'available' ? 'text-emerald-600 animate-ui-fade' : `text-rose-600 ${!serverChecking ? 'animate-ui-shake' : 'animate-ui-fade'}`
                }`}
              >
                {serverChecking
                  ? 'Memeriksa ketersediaan di server...'
                  : serverStatus === 'available'
                  ? `✓ Username "${serverUsername}" tersedia di server.`
                  : `✗ Username "${serverUsername}" sudah dipakai atau terlalu pendek.`}
              </span>
            </div>
          </UiDocSection>

          <UiDocSection
            id="fv-supported"
            title="Supported elements"
            classesHint="border-rose-500 bg-rose-50/20"
            codeSnippet={`<CustomSelect triggerClassName="border-rose-500 bg-rose-50/20" ... />`}
          >
            <div className="max-w-md space-y-3 text-xs">
              <CustomSelect
                className="w-full"
                triggerClassName={
                  validationMajor
                    ? 'px-3 py-2 border-emerald-500 bg-emerald-50/20'
                    : 'px-3 py-2 border-rose-500 bg-rose-50/20'
                }
                value={validationMajor}
                onChange={setValidationMajor}
                placeholder="Pilih jurusan kuliah..."
                ariaLabel="Jurusan kuliah wajib"
                options={[
                  { value: 'math', label: 'Matematika' },
                  { value: 'physics', label: 'Fisika' },
                ]}
              />
              <label className="flex items-center gap-2 text-rose-600 font-medium">
                <input type="checkbox" className="rounded border-rose-500" />
                <span>Saya menyetujui ketentuan akademik (wajib dicentang)</span>
              </label>
            </div>
          </UiDocSection>

          <UiDocSection
            id="fv-tooltips"
            title="Tooltips"
            description="Menampilkan pesan galat validasi dalam lencana tooltip melayang padat di bawah input."
            classesHint="inline-block px-2.5 py-1 rounded bg-rose-600 text-white"
            codeSnippet={`<div className="inline-block px-2.5 py-1 rounded bg-rose-600 text-white text-[11px] font-semibold">\n  Silakan pilih salah satu jurusan wajib!\n</div>`}
          >
            <div className="max-w-md space-y-1.5 text-xs">
              <input type="text" defaultValue="" placeholder="Nama Koordinator" className="w-full px-3 py-2 rounded-lg border border-rose-500" />
              <div className="inline-block px-2.5 py-1 rounded bg-rose-600 text-white text-[11px] font-semibold shadow-sm">
                Silakan isi nama koordinator terlebih dahulu!
              </div>
            </div>
          </UiDocSection>
        </UiDocPage>
      )}

      {/* 3.6B FORM INPUT STATE */}
      {isVisible('forminputstate') && (
        <UiDocPage
          title="Form Input State"
          description="Dokumentasi lengkap kondisi interaktif field formulir: Pristine vs Dirty, Valid/Warning/Error, Disabled/Read-Only, serta kunci pengiriman asinkron."
          subLinks={[
            { id: 'fis-lifecycle', label: 'Pristine, Focus & Dirty' },
            { id: 'fis-semantic', label: 'Valid, Warning & Error' },
            { id: 'fis-lock', label: 'Disabled vs Read-Only' },
            { id: 'fis-async', label: 'Async Submitting Lock' },
          ]}
        >
          <UiDocSection
            id="fis-lifecycle"
            title="Pristine, Focus & Dirty State"
            description="Lacak otomatis apakah nilai input masih asli (pristine) atau sudah diubah pengguna (dirty) dengan tombol reset cepat."
            classesHint="border-primary-500 ring-2 ring-primary-500/15"
            codeSnippet={`const isDirty = value !== initialValue;\n<input value={value} onChange={(e) => setValue(e.target.value)} className={isDirty ? 'border-primary-500' : 'border-gray-300'} />`}
          >
            <div className="max-w-md space-y-2.5 text-xs">
              <div className="flex items-center justify-between">
                <label className="font-semibold text-gray-800">Judul Mata Kuliah</label>
                <span
                  className={`px-2 py-0.5 rounded-md text-[11px] font-semibold ${
                    dirtyInputVal !== initialCourseTitle
                      ? 'bg-primary-50 text-primary-700 border border-primary-200'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {dirtyInputVal !== initialCourseTitle ? 'Dirty (Diubah)' : 'Pristine (Asli)'}
                </span>
              </div>
              <input
                type="text"
                value={dirtyInputVal}
                onChange={(e) => setDirtyInputVal(e.target.value)}
                className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary-500/15 focus:border-primary-600 transition-colors ${
                  dirtyInputVal !== initialCourseTitle ? 'border-primary-400 bg-primary-50/20' : 'border-gray-300 bg-white'
                }`}
              />
              <div className="flex items-center justify-between text-[11px] text-gray-500">
                <span>Ubah teks untuk memicu status dirty, lalu reset.</span>
                {dirtyInputVal !== initialCourseTitle && (
                  <button
                    type="button"
                    onClick={() => setDirtyInputVal(initialCourseTitle)}
                    className="group inline-flex items-center gap-1 font-semibold text-primary-600 hover:underline cursor-pointer animate-ui-fade"
                  >
                    <RotateCcw className="w-3 h-3 transition-transform duration-200 group-hover:-rotate-90" />
                    <span>Reset Nilai Awal</span>
                  </button>
                )}
              </div>
            </div>
          </UiDocSection>

          <UiDocSection
            id="fis-semantic"
            title="Valid, Warning & Error Input States"
            classesHint="border-emerald-500 / border-amber-500 / border-rose-500"
            codeSnippet={`<input className="border-amber-500 bg-amber-50/30" />\n<p className="text-amber-700 text-xs">Mendekati batas maksimum 60 karakter.</p>`}
          >
            <div className="max-w-md space-y-3 text-xs">
              <div className="flex gap-1.5">
                {(['valid', 'warning', 'error'] as const).map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setSemanticStatePreview(st)}
                    className={`px-3 py-1 rounded-md font-semibold capitalize cursor-pointer ${
                      semanticStatePreview === st ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>

              <div
                key={semanticStatePreview}
                className={`space-y-1.5 ${semanticStatePreview === 'error' ? 'animate-ui-shake' : 'animate-ui-fade'}`}
              >
                <label className="font-semibold text-gray-800 block">Kode Akses Kelas</label>
                <div className="relative">
                  <input
                    type="text"
                    readOnly
                    value={
                      semanticStatePreview === 'valid'
                        ? 'KL-2026-FISIKA'
                        : semanticStatePreview === 'warning'
                        ? 'KL-2026-FISIKA-TERAPAN-LANJUTAN'
                        : 'KL 2026!'
                    }
                    className={`w-full px-3 py-2 pr-9 rounded-lg border font-medium focus:outline-none transition-colors ${
                      semanticStatePreview === 'valid'
                        ? 'border-emerald-500 bg-emerald-50/30 text-emerald-950'
                        : semanticStatePreview === 'warning'
                        ? 'border-amber-500 bg-amber-50/30 text-amber-950'
                        : 'border-rose-500 bg-rose-50/30 text-rose-950'
                    }`}
                  />
                  {semanticStatePreview === 'valid' && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 absolute right-3 top-1/2 -translate-y-1/2 animate-ui-check" />
                  )}
                  {semanticStatePreview === 'warning' && (
                    <AlertTriangle className="w-4 h-4 text-amber-600 absolute right-3 top-1/2 -translate-y-1/2 animate-ui-check" />
                  )}
                  {semanticStatePreview === 'error' && (
                    <AlertCircle className="w-4 h-4 text-rose-600 absolute right-3 top-1/2 -translate-y-1/2 animate-ui-check" />
                  )}
                </div>
                <p
                  className={`text-[11px] font-medium ${
                    semanticStatePreview === 'valid'
                      ? 'text-emerald-700'
                      : semanticStatePreview === 'warning'
                      ? 'text-amber-700'
                      : 'text-rose-700'
                  }`}
                >
                  {semanticStatePreview === 'valid' && 'Format kode kelas valid dan siap dipublikasikan.'}
                  {semanticStatePreview === 'warning' && 'Kode terlalu panjang; disarankan maksimal 18 karakter.'}
                  {semanticStatePreview === 'error' && 'Kode tidak boleh mengandung spasi atau karakter tanda seru.'}
                </p>
              </div>
            </div>
          </UiDocSection>

          <UiDocSection
            id="fis-lock"
            title="Disabled vs Read-Only State"
            classesHint="disabled:bg-gray-100 disabled:cursor-not-allowed / readOnly:bg-gray-50"
            codeSnippet={`<input disabled value="Terkunci sistem" className="bg-gray-100 text-gray-500 cursor-not-allowed" />\n<input readOnly value="SRV-TOKEN-2026" className="bg-gray-50 text-gray-700 select-all" />`}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-gray-600 inline-flex items-center gap-1">
                  <Lock className="w-3 h-3" />
                  <span>Disabled Input</span>
                </label>
                <input
                  type="text"
                  disabled
                  value="Semester Genap (Terkunci)"
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-gray-100 text-gray-500 cursor-not-allowed"
                />
              </div>
              <div className="space-y-1">
                <label className="font-semibold text-gray-700">Read-Only Input (Dapat Disalin)</label>
                <input
                  type="text"
                  readOnly
                  value="ID-KELAS-302-A"
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-gray-50 text-gray-700 font-mono select-all focus:outline-none focus:border-primary-400"
                />
              </div>
            </div>
          </UiDocSection>

          <UiDocSection
            id="fis-async"
            title="Async Submitting Lock"
            description="Input otomatis terkunci bersama indikator pemuatan saat proses penyimpanan berlangsung di server."
            classesHint="disabled:opacity-70 inline-flex items-center gap-2"
            codeSnippet={`<input disabled={submitting} value={code} />\n<button disabled={submitting}>{submitting ? 'Menyimpan...' : 'Simpan'}</button>`}
          >
            <div className="max-w-md space-y-2.5 text-xs">
              <div className="flex gap-2">
                <input
                  type="text"
                  disabled={asyncSubmitState === 'submitting'}
                  value={asyncCourseCode}
                  onChange={(e) => {
                    setAsyncCourseCode(e.target.value);
                    if (asyncSubmitState === 'saved') setAsyncSubmitState('idle');
                  }}
                  className="flex-1 px-3 py-2 rounded-lg border border-gray-300 disabled:bg-gray-100 disabled:text-gray-500 focus:outline-none focus:border-primary-600 font-mono"
                />
                <button
                  type="button"
                  disabled={asyncSubmitState === 'submitting'}
                  onClick={() => {
                    setAsyncSubmitState('submitting');
                    setTimeout(() => {
                      setAsyncSubmitState('saved');
                      triggerToast('Input Tersimpan', `Kode ${asyncCourseCode} berhasil diperbarui.`, 'success');
                    }, 950);
                  }}
                  className="px-4 py-2 rounded-lg bg-primary-600 text-white font-semibold hover:bg-primary-700 disabled:opacity-75 inline-grid place-items-center cursor-pointer disabled:cursor-wait shrink-0 transition-colors"
                >
                  <span
                    aria-hidden={asyncSubmitState !== 'submitting'}
                    className={`[grid-area:1/1] inline-flex items-center gap-1.5 transition-opacity duration-150 ${
                      asyncSubmitState === 'submitting' ? 'opacity-100' : 'opacity-0 invisible'
                    }`}
                  >
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Menyimpan...</span>
                  </span>
                  <span
                    className={`[grid-area:1/1] transition-opacity duration-150 ${
                      asyncSubmitState === 'submitting' ? 'opacity-0 invisible' : 'opacity-100'
                    }`}
                  >
                    Simpan
                  </span>
                </button>
              </div>
              {asyncSubmitState === 'saved' && (
                <div className="text-[11px] font-semibold text-emerald-700 inline-flex items-center gap-1 animate-ui-slide-down">
                  <CheckCircle2 className="w-3.5 h-3.5 animate-ui-check" />
                  <span>Perubahan kode tersimpan ke server.</span>
                </div>
              )}
            </div>
          </UiDocSection>
        </UiDocPage>
      )}

      {/* 3.7 ADVANCE FORM UI */}
      {isVisible('advanceformui') && (
        <UiDocPage
          title="Advance Form UI"
          subLinks={[
            { id: 'af-floating', label: 'Floating labels' },
            { id: 'af-password', label: 'Custom Form controls' },
          ]}
        >
          <UiDocSection
            id="af-floating"
            title="Floating labels"
            classesHint="relative / pt-5 pb-1.5 rounded-lg border"
            codeSnippet={`<div className="relative">\n  <input value={val} className="w-full px-3 pt-5 pb-1.5 rounded-lg border" />\n  <label className="absolute left-3 top-1.5 text-[10px] font-semibold text-primary-600">Nama Lengkap</label>\n</div>`}
          >
            <div className="max-w-md space-y-3 text-xs">
              <div className="relative">
                <input
                  type="text"
                  value={floatingName}
                  onChange={(e) => setFloatingName(e.target.value)}
                  placeholder=" "
                  className="peer w-full px-3 pt-5 pb-1.5 rounded-lg border border-gray-300 focus:outline-none focus:border-primary-600"
                />
                <label className="absolute left-3 top-1.5 text-[10px] font-semibold text-primary-600">Nama Lengkap (Floating)</label>
              </div>
              <div className="relative">
                <input
                  type="email"
                  value={floatingEmail}
                  onChange={(e) => setFloatingEmail(e.target.value)}
                  placeholder=" "
                  className="peer w-full px-3 pt-5 pb-1.5 rounded-lg border border-gray-300 focus:outline-none focus:border-primary-600"
                />
                <label className="absolute left-3 top-1.5 text-[10px] font-semibold text-primary-600">Email Akademik (Floating)</label>
              </div>
            </div>
          </UiDocSection>

          <UiDocSection
            id="af-password"
            title="Custom Form controls (Password Strength Meter)"
            classesHint="h-1.5 rounded-full / Eye & EyeOff toggle"
            codeSnippet={`<div className="relative">\n  <input type={show ? 'text' : 'password'} value={pw} />\n  <div className="h-1.5 bg-emerald-500 w-full" />\n</div>`}
          >
            <div className="max-w-md space-y-2 text-xs">
              <div className="relative">
                <Lock className="w-3.5 h-3.5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={passwordValue}
                  onChange={(e) => setPasswordValue(e.target.value)}
                  className="w-full pl-8 pr-8 py-2 rounded-lg border border-gray-300 font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-gray-500">Kekuatan Sandi:</span>
                <span className={`font-bold ${pwStrength.text}`}>{pwStrength.label}</span>
              </div>
              <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                <div className={`h-full ${pwStrength.color} ${pwStrength.width} transition-all duration-[260ms] ease-[cubic-bezier(0.23,1,0.32,1)]`} />
              </div>
            </div>
          </UiDocSection>
        </UiDocPage>
      )}

      {/* 3.8 CROPPERJS */}
      {isVisible('cropperjs') && (
        <UiDocPage
          title="Cropperjs"
          description="Pratinjau area pemotongan gambar profil dan thumbnail materi dengan pilihan rasio aspek serta kendali pembesaran (zoom)."
        >
          <UiDocSection
            title="Aspect Ratio & Zoom Cropper"
            classesHint="overflow-hidden border-2 border-dashed border-primary-400"
            codeSnippet={`<div style={{ transform: \`scale(\${cropZoom / 100})\` }} className="border-2 border-primary-400 border-dashed">{cropAspect}</div>`}
            actions={<Crop className="w-4 h-4 text-primary-600" />}
          >
            <div className="max-w-md space-y-3 text-xs">
              <div className="flex gap-1.5">
                {(['1:1', '4:3', '16:9', 'free'] as const).map((r) => (
                  <button
                    key={r}
                    onClick={() => setCropAspect(r)}
                    className={`px-2.5 py-1 rounded-md font-semibold cursor-pointer ${
                      cropAspect === r ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
              <div className="relative h-32 rounded-xl bg-gray-900 text-white flex items-center justify-center overflow-hidden">
                <div
                  style={{ transform: `scale(${cropZoom / 100})` }}
                  className={`border-2 border-primary-400 border-dashed flex items-center justify-center bg-primary-500/20 transition-all duration-[240ms] ease-[cubic-bezier(0.23,1,0.32,1)] ${
                    cropAspect === '1:1'
                      ? 'w-20 h-20 rounded-full'
                      : cropAspect === '4:3'
                      ? 'w-24 h-18 rounded-lg'
                      : cropAspect === '16:9'
                      ? 'w-28 h-16 rounded-lg'
                      : 'w-24 h-20 rounded-lg'
                  }`}
                >
                  <span className="text-[11px] font-mono text-primary-200">{cropAspect}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <input type="range" min={70} max={130} value={cropZoom} onChange={(e) => setCropZoom(Number(e.target.value))} className="flex-1 accent-primary-600" />
                <span className="text-xs font-mono text-gray-500 tabular-nums">{cropZoom}%</span>
                <button
                  onClick={() => triggerToast('Cropperjs', 'Area gambar berhasil dipotong!', 'success')}
                  className="px-3 py-1.5 rounded-md bg-gray-900 text-white font-semibold hover:bg-black cursor-pointer"
                >
                  Crop
                </button>
              </div>
            </div>
          </UiDocSection>
        </UiDocPage>
      )}

      {/* 3.9 DROPZONE */}
      {isVisible('dropzone') && (
        <UiDocPage
          title="Dropzone"
          description="Area seret-dan-lepas (drag & drop) untuk mengunggah berkas PDF, slide presentasi, atau video lengkap dengan antrean daftar berkas."
        >
          <UiDocSection
            title="File Dropzone & Upload Queue"
            classesHint="border-2 border-dashed border-gray-300 hover:border-primary-500 rounded-xl"
            codeSnippet={`<div onClick={addMockFile} className="border-2 border-dashed border-gray-300 p-6 rounded-xl text-center cursor-pointer">\n  <UploadCloud className="w-6 h-6 mx-auto" /> Klik atau seret berkas ke sini\n</div>`}
          >
            <div className="max-w-lg space-y-3 text-xs">
              <div
                onClick={() => {
                  setUploadedFiles([
                    ...uploadedFiles,
                    { name: `Modul_Baru_${Date.now().toString().slice(-3)}.pdf`, size: '1.2 MB', type: 'PDF' },
                  ]);
                  triggerToast('Dropzone', 'Berkas baru ditambahkan ke antrean!', 'success');
                }}
                className="group border-2 border-dashed border-gray-300 hover:border-primary-500 p-5 rounded-xl text-center cursor-pointer transition-colors bg-gray-50/50"
              >
                <UploadCloud className="w-7 h-7 text-primary-600 mx-auto mb-1.5 transition-transform duration-[240ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-1" />
                <div className="font-semibold text-gray-800">Klik atau seret berkas ke sini</div>
                <div className="text-[11px] text-gray-500 mt-0.5">PDF, PPTX, MP4 (Maks. 50 MB)</div>
              </div>
              <div className="space-y-1.5">
                {uploadedFiles.map((file, idx) => (
                  <div key={`${file.name}-${idx}`} className="flex items-center justify-between p-2.5 rounded-lg bg-gray-50 border border-gray-300 animate-ui-slide-down">
                    <div className="flex items-center gap-2 truncate">
                      <FileText className="w-4 h-4 text-primary-600 shrink-0" />
                      <span className="truncate font-medium text-gray-800">{file.name}</span>
                    </div>
                    <button
                      onClick={() => setUploadedFiles(uploadedFiles.filter((_, i) => i !== idx))}
                      className="text-rose-500 hover:text-rose-700 ml-2 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </UiDocSection>
        </UiDocPage>
      )}

      {/* 3.10 DATE PICKER */}
      {isVisible('datepicker') && (
        <UiDocPage
          title="Date Picker"
          description="Pemilih tanggal modern yang menggabungkan ketik langsung (typed dates DD/MM/YYYY atau YYYY-MM-DD), lompatan Bulan & Tahun (1960–2030), dan grid kalender akurat."
          subLinks={[
            { id: 'dp-calendar', label: 'Typed Date + Calendar Jump' },
            { id: 'dp-time', label: 'Date Picker with Time' },
          ]}
        >
          <UiDocSection
            id="dp-calendar"
            title="Typed Date + Month & Year Jump"
            classesHint="Typed input (DD/MM/YYYY | YYYY-MM-DD) + Month/Year CustomSelect + grid-cols-7"
            actions={
              <button
                type="button"
                onClick={() => {
                  const parsed = parseDpFlexible('14/08/1994');
                  if (parsed) syncPrimaryDate(parsed.year, parsed.month, parsed.day);
                }}
                className={ACTION_BTN_SOFT_PRIMARY}
              >
                <span>Coba 14/08/1994</span>
              </button>
            }
            codeSnippet={`<input value={typedDate} onChange={parseAndSyncCalendar} placeholder="DD/MM/YYYY" />\n<div className="flex gap-1.5">\n  <CustomSelect options={monthOptions} value={String(month)} onChange={...} />\n  <CustomSelect options={yearOptions} value={String(year)} onChange={...} />\n</div>\n<div className="grid grid-cols-7 gap-1 text-center">...</div>`}
          >
            <div className="max-w-sm space-y-3 text-xs">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-gray-700 block">
                  Ketik Tanggal Langsung (DD/MM/YYYY atau YYYY-MM-DD)
                </label>
                <div className="relative">
                  <Calendar className="w-3.5 h-3.5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={dpTypedInput}
                    onChange={(e) => {
                      const val = e.target.value;
                      setDpTypedInput(val);
                      const parsed = parseDpFlexible(val);
                      if (parsed) {
                        setDpYear(parsed.year);
                        setDpMonth(parsed.month);
                        setSelectedDay(parsed.day);
                        setDpTypedInvalid(false);
                      } else if (val.trim()) {
                        setDpTypedInvalid(true);
                      } else {
                        setDpTypedInvalid(false);
                      }
                    }}
                    placeholder="14/08/1994"
                    className={`w-full h-9 pl-9 pr-3 rounded-lg border font-mono tabular-nums focus:outline-none ${
                      dpTypedInvalid
                        ? 'border-rose-500 bg-rose-50/40 text-rose-700'
                        : 'border-gray-300 focus:border-primary-600 text-gray-900'
                    }`}
                  />
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <CustomSelect
                  className="flex-1"
                  size="sm"
                  value={String(dpMonth)}
                  onChange={(val) => syncPrimaryDate(dpYear, Number(val), selectedDay)}
                  options={dpMonthOptions}
                  ariaLabel="Pilih Bulan"
                />
                <CustomSelect
                  className="w-24"
                  size="sm"
                  value={String(dpYear)}
                  onChange={(val) => syncPrimaryDate(Number(val), dpMonth, selectedDay)}
                  options={dpYearOptions}
                  ariaLabel="Pilih Tahun"
                />
                <button
                  type="button"
                  aria-label="Bulan sebelumnya"
                  onClick={() => {
                    const prevM = dpMonth === 0 ? 11 : dpMonth - 1;
                    const prevY = dpMonth === 0 ? Math.max(1960, dpYear - 1) : dpYear;
                    syncPrimaryDate(prevY, prevM, selectedDay);
                  }}
                  className="h-8 w-8 rounded-lg border border-gray-300 bg-white hover:bg-gray-100 flex items-center justify-center cursor-pointer shrink-0"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  aria-label="Bulan berikutnya"
                  onClick={() => {
                    const nextM = (dpMonth + 1) % 12;
                    const nextY = dpMonth === 11 ? Math.min(2030, dpYear + 1) : dpYear;
                    syncPrimaryDate(nextY, nextM, selectedDay);
                  }}
                  className="h-8 w-8 rounded-lg border border-gray-300 bg-white hover:bg-gray-100 flex items-center justify-center cursor-pointer shrink-0"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div key={`${dpYear}-${dpMonth}`} className="grid grid-cols-7 gap-1 text-center tabular-nums animate-ui-fade">
                {['Sn', 'Sl', 'Rb', 'Km', 'Jm', 'Sb', 'Mg'].map((d) => (
                  <div key={d} className="font-bold text-gray-500 py-1">{d}</div>
                ))}
                {Array.from({ length: getDpLeadingOffset(dpYear, dpMonth) }).map((_, i) => (
                  <div key={`lead-${i}`} />
                ))}
                {Array.from({ length: getDpDaysInMonth(dpYear, dpMonth) }).map((_, i) => {
                  const dayNum = i + 1;
                  return (
                    <button
                      key={dayNum}
                      type="button"
                      onClick={() => syncPrimaryDate(dpYear, dpMonth, dayNum)}
                      className={`py-1.5 rounded-md transition-colors cursor-pointer ${
                        selectedDay === dayNum ? 'bg-gray-900 text-white font-bold' : 'hover:bg-primary-50 text-gray-700'
                      }`}
                    >
                      {dayNum}
                    </button>
                  );
                })}
              </div>
              <div className="text-xs text-gray-500 pt-2 border-t border-gray-200">
                Terpilih:{' '}
                <strong className="text-gray-900 tabular-nums">
                  {selectedDay} {dpMonthNames[dpMonth]} {dpYear}
                </strong>
              </div>
            </div>
          </UiDocSection>

          <UiDocSection
            id="dp-time"
            title="Date Picker with Time"
            classesHint="grid grid-cols-1 sm:grid-cols-12 gap-5"
            codeSnippet={`<div className="flex flex-col sm:flex-row gap-4 p-4 border rounded-xl">\n  <CalendarWithJump value={date} onChange={setDate} />\n  <TimeSelector hour={hour} minute={minute} onChange={setTime} />\n</div>`}
            actions={
              <span className="text-xs font-mono font-semibold text-primary-700 bg-primary-50 px-2.5 py-1 rounded-md tabular-nums">
                {dateTimeDay} {dpMonthNames[dtMonth]} {dtYear} · {dateTimeHour}:{dateTimeMinute} WIB
              </span>
            }
          >
            <div className="max-w-2xl grid grid-cols-1 sm:grid-cols-12 gap-5 text-xs">
              {/* Calendar Grid */}
              <div className="sm:col-span-7 space-y-3 border border-gray-300 rounded-xl p-3.5 bg-white">
                <input
                  type="text"
                  value={dtTypedInput}
                  onChange={(e) => {
                    const val = e.target.value;
                    setDtTypedInput(val);
                    const parsed = parseDpFlexible(val);
                    if (parsed) {
                      setDtYear(parsed.year);
                      setDtMonth(parsed.month);
                      setDateTimeDay(parsed.day);
                    }
                  }}
                  placeholder="Ketik DD/MM/YYYY..."
                  aria-label="Ketik tanggal jadwal"
                  className="w-full h-8 px-2.5 rounded-lg border border-gray-300 font-mono text-xs tabular-nums focus:outline-none focus:border-primary-600"
                />
                <div className="flex items-center gap-1.5">
                  <CustomSelect
                    className="flex-1"
                    size="sm"
                    value={String(dtMonth)}
                    onChange={(val) => syncTimeDate(dtYear, Number(val), dateTimeDay)}
                    options={dpMonthOptions}
                    ariaLabel="Pilih Bulan Jadwal"
                  />
                  <CustomSelect
                    className="w-24"
                    size="sm"
                    value={String(dtYear)}
                    onChange={(val) => syncTimeDate(Number(val), dtMonth, dateTimeDay)}
                    options={dpYearOptions}
                    ariaLabel="Pilih Tahun Jadwal"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const prevM = dtMonth === 0 ? 11 : dtMonth - 1;
                      const prevY = dtMonth === 0 ? Math.max(1960, dtYear - 1) : dtYear;
                      syncTimeDate(prevY, prevM, dateTimeDay);
                    }}
                    className="p-1.5 rounded-lg border border-gray-300 hover:bg-gray-100 cursor-pointer shrink-0"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const nextM = (dtMonth + 1) % 12;
                      const nextY = dtMonth === 11 ? Math.min(2030, dtYear + 1) : dtYear;
                      syncTimeDate(nextY, nextM, dateTimeDay);
                    }}
                    className="p-1.5 rounded-lg border border-gray-300 hover:bg-gray-100 cursor-pointer shrink-0"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div key={`${dtYear}-${dtMonth}`} className="grid grid-cols-7 gap-1 text-center tabular-nums animate-ui-fade">
                  {['Sn', 'Sl', 'Rb', 'Km', 'Jm', 'Sb', 'Mg'].map((d) => (
                    <div key={d} className="font-bold text-gray-500 py-1">{d}</div>
                  ))}
                  {Array.from({ length: getDpLeadingOffset(dtYear, dtMonth) }).map((_, i) => (
                    <div key={`tlead-${i}`} />
                  ))}
                  {Array.from({ length: getDpDaysInMonth(dtYear, dtMonth) }).map((_, i) => {
                    const dayNum = i + 1;
                    return (
                      <button
                        key={dayNum}
                        type="button"
                        onClick={() => syncTimeDate(dtYear, dtMonth, dayNum)}
                        className={`py-1.5 rounded-md transition-colors cursor-pointer ${
                          dateTimeDay === dayNum
                            ? 'bg-primary-600 text-white font-bold'
                            : 'hover:bg-primary-50 text-gray-700'
                        }`}
                      >
                        {dayNum}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Selector Column */}
              <div className="sm:col-span-5 flex flex-col justify-between gap-3 border border-gray-300 rounded-xl p-3.5 bg-gray-50/60">
                <div className="space-y-3">
                  <div className="flex items-center gap-1.5 font-bold text-gray-800">
                    <Clock className="w-3.5 h-3.5 text-primary-600" />
                    <span>Pilih Waktu (WIB)</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[11px] font-semibold text-gray-500 block mb-1">Jam</label>
                      <CustomSelect
                        className="w-full"
                        size="sm"
                        triggerClassName="px-2.5 py-1.5 font-mono font-semibold text-gray-800 tabular-nums"
                        value={dateTimeHour}
                        onChange={setDateTimeHour}
                        ariaLabel="Pilih jam"
                        options={['07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '19', '20'].map((h) => ({
                          value: h,
                          label: h,
                        }))}
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-gray-500 block mb-1">Menit</label>
                      <CustomSelect
                        className="w-full"
                        size="sm"
                        triggerClassName="px-2.5 py-1.5 font-mono font-semibold text-gray-800 tabular-nums"
                        value={dateTimeMinute}
                        onChange={setDateTimeMinute}
                        ariaLabel="Pilih menit"
                        options={['00', '15', '30', '45'].map((m) => ({
                          value: m,
                          label: m,
                        }))}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-[11px] font-semibold text-gray-500 block">Slot Cepat</span>
                    <div className="grid grid-cols-2 gap-1.5 tabular-nums">
                      {[
                        { h: '08', m: '00' },
                        { h: '09', m: '30' },
                        { h: '13', m: '00' },
                        { h: '15', m: '30' },
                      ].map((slot) => {
                        const active = dateTimeHour === slot.h && dateTimeMinute === slot.m;
                        return (
                          <button
                            key={`${slot.h}:${slot.m}`}
                            type="button"
                            onClick={() => {
                              setDateTimeHour(slot.h);
                              setDateTimeMinute(slot.m);
                            }}
                            className={`px-2 py-1.5 rounded-md font-mono font-semibold border transition-colors cursor-pointer ${
                              active
                                ? 'bg-primary-600 text-white border-primary-600'
                                : 'bg-white text-gray-700 border-gray-300 hover:bg-primary-50'
                            }`}
                          >
                            {slot.h}:{slot.m}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    triggerToast(
                      'Jadwal Ditetapkan',
                      `${dateTimeDay} ${dpMonthNames[dtMonth]} ${dtYear} pukul ${dateTimeHour}:${dateTimeMinute} WIB.`,
                      'success'
                    )
                  }
                  className="w-full py-2 rounded-lg bg-gray-900 hover:bg-black text-white font-semibold cursor-pointer transition-colors"
                >
                  Terapkan Tanggal &amp; Waktu
                </button>
              </div>
            </div>
          </UiDocSection>
        </UiDocPage>
      )}

      {/* 3.11 COLOR PICKER */}
      {isVisible('colorpicker') && (
        <UiDocPage
          title="Color Picker"
          subLinks={[
            { id: 'cp-react', label: 'React Color Palette' },
            { id: 'cp-bootstrap', label: 'Bootstrap Color Picker' },
          ]}
        >
          <UiDocSection
            id="cp-react"
            title="React Color Palette"
            classesHint="type='color' / font-mono uppercase"
            codeSnippet={`<div className="flex items-center gap-2">\n  <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />\n  <input type="text" value={color} className="font-mono uppercase" />\n</div>`}
          >
            <div className="max-w-md space-y-3 text-xs">
              <div className="flex flex-wrap gap-2">
                {themeColors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-7 h-7 rounded-lg border-2 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-110 cursor-pointer ${
                      selectedColor === color ? 'border-gray-900 scale-110' : 'border-transparent'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  className="w-9 h-9 rounded border border-gray-300 cursor-pointer p-0.5"
                />
                <input
                  type="text"
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-lg border border-gray-300 font-mono uppercase"
                />
              </div>
              <div className="p-2.5 rounded-lg text-white font-semibold text-center transition-colors duration-200" style={{ backgroundColor: selectedColor }}>
                Preview Aksen {selectedColor}
              </div>
            </div>
          </UiDocSection>

          <UiDocSection
            id="cp-bootstrap"
            title="Bootstrap Color Picker"
            classesHint="flex / rounded-l-lg / rounded-r-lg"
            codeSnippet={`<div className="flex">\n  <span className="px-3 py-2 rounded-l-lg bg-gray-100 border">HEX</span>\n  <input type="text" value={color} className="flex-1 px-3 py-2 border font-mono uppercase" />\n  <span className="w-9 rounded-r-lg border" style={{ backgroundColor: color }} />\n</div>`}
          >
            <div className="max-w-md space-y-3 text-xs">
              <div className="flex">
                <span className="px-3 py-2 rounded-l-lg bg-gray-100 border border-r-0 border-gray-300 font-semibold">HEX</span>
                <input
                  type="text"
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 font-mono uppercase"
                />
                <span className="w-9 rounded-r-lg border border-l-0 border-gray-300" style={{ backgroundColor: selectedColor }} />
              </div>
              <div className="p-2.5 rounded-lg border border-gray-300 flex items-center justify-between">
                <span className="text-gray-600">Warna aktif tersinkronisasi:</span>
                <span className="font-mono font-bold text-gray-900">{selectedColor}</span>
              </div>
            </div>
          </UiDocSection>
        </UiDocPage>
      )}

      {/* 3.12 REACT SELECT */}
      {isVisible('reactselect') && (
        <UiDocPage
          title="React Select"
          subLinks={[
            { id: 'rs-basic', label: 'Basic example' },
            { id: 'rs-creatable', label: 'Creatable Multiselect' },
          ]}
        >
          <UiDocSection
            id="rs-basic"
            title="Basic example"
            classesHint="CustomSelect / rounded-xl popup + active Primary Rose"
            codeSnippet={`<CustomSelect\n  value={val}\n  onChange={setVal}\n  options={[\n    { value: 'Class 302', label: 'Class 302' },\n    { value: 'Class 303', label: 'Class 303' },\n  ]}\n/>`}
          >
            <div className="max-w-md text-xs">
              <label className="font-semibold text-gray-700 block mb-1">Pilih Kelas Aktif</label>
              <CustomSelect
                className="w-full"
                triggerClassName="px-3 py-2"
                value={selectedClass}
                onChange={setSelectedClass}
                ariaLabel="Pilih Kelas Aktif"
                options={[
                  { value: 'Class 302', label: 'Class 302' },
                  { value: 'Class 303', label: 'Class 303' },
                  { value: 'Class 304', label: 'Class 304' },
                  { value: 'Class 305', label: 'Class 305' },
                ]}
              />
            </div>
          </UiDocSection>

          <UiDocSection
            id="rs-creatable"
            title="Creatable Multiselect"
            classesHint="flex flex-wrap gap-1.5 p-2 rounded-lg border border-gray-300"
            codeSnippet={`<div className="flex flex-wrap gap-1.5 p-2 rounded-lg border">\n  {tags.map(t => <span className="badge">{t}</span>)}\n  <input placeholder="+ Ketik opsi lalu Enter" />\n</div>`}
          >
            <div className="max-w-lg text-xs">
              <div className="flex flex-wrap gap-1.5 p-2 rounded-lg border border-gray-300 bg-white">
                {multiSelectedTags.map((tag) => (
                  <span key={tag} className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary-50 text-primary-700 text-xs font-semibold animate-ui-pop">
                    <span>{tag}</span>
                    <button onClick={() => setMultiSelectedTags(multiSelectedTags.filter((t) => t !== tag))} className="cursor-pointer hover:text-primary-950">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                <input
                  type="text"
                  placeholder="+ Ketik opsi lalu Enter"
                  value={newSelectTag}
                  onChange={(e) => setNewSelectTag(e.target.value)}
                  onKeyDown={handleCreateSelectOption}
                  className="flex-1 min-w-[110px] text-xs focus:outline-none"
                />
              </div>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {creatableOptions
                  .filter((o) => !multiSelectedTags.includes(o))
                  .map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setMultiSelectedTags([...multiSelectedTags, opt])}
                      className="px-2 py-0.5 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 text-[11px] cursor-pointer"
                    >
                      + {opt}
                    </button>
                  ))}
              </div>
            </div>
          </UiDocSection>
        </UiDocPage>
      )}

      {/* 3.13 RANGE SLIDER */}
      {isVisible('rangeslider') && (
        <UiDocPage
          title="Range Slider"
          subLinks={[
            { id: 'rng-basic', label: 'Basic Range Slider' },
            { id: 'rng-color', label: 'Range Slider Color' },
          ]}
        >
          <UiDocSection
            id="rng-basic"
            title="Basic Range Slider"
            classesHint="w-full accent-primary-600 cursor-pointer"
            codeSnippet={`<input type="range" min="0" max="100" value={val} className="w-full accent-primary-600" />`}
            actions={<Sliders className="w-4 h-4 text-primary-600" />}
          >
            <div className="max-w-md space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-700 tabular-nums">Nilai KKM ({rangeSingle}%)</span>
                <span className="font-mono text-primary-600 font-bold tabular-nums">{rangeSingle}/100</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={rangeSingle}
                onChange={(e) => setRangeSingle(Number(e.target.value))}
                className="w-full cursor-pointer accent-primary-600"
              />
              <div className="flex justify-between gap-1 text-[11px]">
                {['Dasar', 'Menengah', 'Lanjut', 'Olimpiade'].map((lvl, idx) => (
                  <span key={lvl} className={`px-2.5 py-0.5 rounded ${idx === 1 ? 'bg-primary-600 text-white font-bold' : 'bg-gray-100 text-gray-600'}`}>
                    {lvl}
                  </span>
                ))}
              </div>
            </div>
          </UiDocSection>

          <UiDocSection
            id="rng-color"
            title="Range Slider Color"
            classesHint="accent-primary-600 / accent-emerald-600 / accent-rose-600"
            codeSnippet={`<input type="range" className="w-full accent-primary-600" />\n<input type="range" className="w-full accent-emerald-600" />\n<input type="range" className="w-full accent-rose-600" />`}
          >
            <div className="max-w-md space-y-4 text-xs">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-semibold text-primary-700">Indigo Accent</span>
                  <span className="font-mono text-gray-500 tabular-nums">{rangeSingle}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={rangeSingle}
                  onChange={(e) => setRangeSingle(Number(e.target.value))}
                  className="w-full cursor-pointer accent-primary-600"
                />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-semibold text-emerald-700">Emerald Accent</span>
                  <span className="font-mono text-gray-500 tabular-nums">84%</span>
                </div>
                <input type="range" min="0" max="100" defaultValue={84} className="w-full cursor-pointer accent-emerald-600" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-semibold text-rose-700">Rose Accent</span>
                  <span className="font-mono text-gray-500 tabular-nums">56%</span>
                </div>
                <input type="range" min="0" max="100" defaultValue={56} className="w-full cursor-pointer accent-rose-600" />
              </div>
            </div>
          </UiDocSection>
        </UiDocPage>
      )}

      {/* 3.14 INPUT SPINNER */}
      {isVisible('inputspinner') && (
        <UiDocPage
          title="Input Spinner"
          subLinks={[
            { id: 'spn-basic', label: 'Basic Example' },
            { id: 'spn-sizing', label: 'Sizing (SM, MD, LG)' },
          ]}
        >
          <UiDocSection
            id="spn-basic"
            title="Basic Example (Integer & Decimal Stepper)"
            classesHint="inline-flex items-center border border-gray-300"
            codeSnippet={`<div className="flex items-center">\n  <button onClick={dec}>-</button>\n  <div className="font-mono font-bold">{val}</div>\n  <button onClick={inc}>+</button>\n</div>`}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
              <div>
                <label className="font-semibold text-gray-700 block mb-1.5">Jumlah SKS (Integer)</label>
                <div className="flex items-center">
                  <button
                    onClick={() => setSpinnerInt((p) => Math.max(1, p - 1))}
                    className="w-9 h-9 rounded-l-lg border border-r-0 border-gray-300 hover:bg-gray-100 flex items-center justify-center cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <div className="w-16 h-9 border border-gray-300 flex items-center justify-center font-mono font-bold text-sm tabular-nums">
                    {spinnerInt}
                  </div>
                  <button
                    onClick={() => setSpinnerInt((p) => Math.min(10, p + 1))}
                    className="w-9 h-9 rounded-r-lg border border-l-0 border-gray-300 hover:bg-gray-100 flex items-center justify-center cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div>
                <label className="font-semibold text-gray-700 block mb-1.5">Bobot Praktikum (Desimal)</label>
                <div className="flex items-center">
                  <button
                    onClick={() => setSpinnerDec((p) => Math.max(0.5, Number((p - 0.5).toFixed(1))))}
                    className="w-9 h-9 rounded-l-lg border border-r-0 border-gray-300 hover:bg-gray-100 flex items-center justify-center cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <div className="w-16 h-9 border border-gray-300 flex items-center justify-center font-mono font-bold tabular-nums">
                    {spinnerDec}
                  </div>
                  <button
                    onClick={() => setSpinnerDec((p) => Math.min(5.0, Number((p + 0.5).toFixed(1))))}
                    className="w-9 h-9 rounded-r-lg border border-l-0 border-gray-300 hover:bg-gray-100 flex items-center justify-center cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </UiDocSection>

          <UiDocSection
            id="spn-sizing"
            title="Sizing (SM, MD & LG)"
            classesHint="w-7 h-7 (sm) / w-9 h-9 (md) / w-11 h-11 (lg)"
            codeSnippet={`<div className="flex flex-wrap items-center gap-6">\n  <Spinner size="sm" />\n  <Spinner size="md" />\n  <Spinner size="lg" />\n</div>`}
          >
            <div className="flex flex-wrap items-end gap-6 text-xs">
              <div>
                <span className="text-[11px] font-bold text-gray-500 uppercase block mb-1.5">Small (SM)</span>
                <div className="flex items-center">
                  <button
                    onClick={() => setSpinnerInt((p) => Math.max(1, p - 1))}
                    className="w-7 h-7 rounded-l-lg border border-r-0 border-gray-300 hover:bg-gray-100 flex items-center justify-center cursor-pointer"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <div className="w-12 h-7 text-xs border border-gray-300 flex items-center justify-center font-mono font-bold tabular-nums">
                    {spinnerInt}
                  </div>
                  <button
                    onClick={() => setSpinnerInt((p) => Math.min(10, p + 1))}
                    className="w-7 h-7 rounded-r-lg border border-l-0 border-gray-300 hover:bg-gray-100 flex items-center justify-center cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>

              <div>
                <span className="text-[11px] font-bold text-gray-500 uppercase block mb-1.5">Medium (MD)</span>
                <div className="flex items-center">
                  <button
                    onClick={() => setSpinnerInt((p) => Math.max(1, p - 1))}
                    className="w-9 h-9 rounded-l-lg border border-r-0 border-gray-300 hover:bg-gray-100 flex items-center justify-center cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <div className="w-16 h-9 text-sm border border-gray-300 flex items-center justify-center font-mono font-bold tabular-nums">
                    {spinnerInt}
                  </div>
                  <button
                    onClick={() => setSpinnerInt((p) => Math.min(10, p + 1))}
                    className="w-9 h-9 rounded-r-lg border border-l-0 border-gray-300 hover:bg-gray-100 flex items-center justify-center cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div>
                <span className="text-[11px] font-bold text-gray-500 uppercase block mb-1.5">Large (LG)</span>
                <div className="flex items-center">
                  <button
                    onClick={() => setSpinnerInt((p) => Math.max(1, p - 1))}
                    className="w-11 h-11 rounded-l-lg border border-r-0 border-gray-300 hover:bg-gray-100 flex items-center justify-center cursor-pointer"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <div className="w-20 h-11 text-base border border-gray-300 flex items-center justify-center font-mono font-bold tabular-nums">
                    {spinnerInt}
                  </div>
                  <button
                    onClick={() => setSpinnerInt((p) => Math.min(10, p + 1))}
                    className="w-11 h-11 rounded-r-lg border border-l-0 border-gray-300 hover:bg-gray-100 flex items-center justify-center cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </UiDocSection>
        </UiDocPage>
      )}

      {/* 3.15 FORM WIZARD */}
      {isVisible('formwizard') && (
        <UiDocPage
          title="Form Wizard"
        >
          <UiDocSection
            title="3-Step Module Registration Wizard"
            classesHint="flex items-center justify-between / bg-gray-50 border border-gray-300 rounded-xl"
            codeSnippet={`<div className="space-y-3">\n  <StepHeader current={step} />\n  <StepContent step={step} />\n</div>`}
            actions={
              <span className="text-xs font-bold text-primary-600 bg-primary-50 px-2.5 py-0.5 rounded-full tabular-nums">
                {wizardStep} / 3
              </span>
            }
          >
            <div className="max-w-lg space-y-4 text-xs">
              <div className="flex items-center justify-between">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex items-center gap-2">
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center font-bold tabular-nums transition-all duration-200 ${
                        wizardStep === step ? 'bg-gray-900 text-white' : wizardStep > step ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {wizardStep > step ? '✓' : step}
                    </span>
                    <span className={`transition-colors duration-150 ${wizardStep === step ? 'font-bold text-gray-900' : 'text-gray-500'}`}>
                      {step === 1 ? 'Data Dasar' : step === 2 ? 'Silabus' : 'Publikasi'}
                    </span>
                  </div>
                ))}
              </div>
              <div key={wizardStep} className="p-4 rounded-xl border border-gray-300 bg-gray-50/60 text-gray-800 animate-ui-slide-down">
                {wizardStep === 1 && <div>Langkah 1: Masukkan detail judul dan kode kelas pengampu.</div>}
                {wizardStep === 2 && <div>Langkah 2: Unggah berkas dokumen silabus pembelajaran.</div>}
                {wizardStep === 3 && <div>Langkah 3: Konfirmasi dan publikasikan ke portal siswa.</div>}
              </div>
              <div className="flex justify-between">
                <button
                  disabled={wizardStep === 1}
                  onClick={() => setWizardStep((p) => p - 1)}
                  className="px-3 py-1.5 rounded-md border border-gray-300 text-gray-700 disabled:opacity-40 cursor-pointer"
                >
                  Kembali
                </button>
                <button
                  onClick={() => {
                    if (wizardStep < 3) setWizardStep((p) => p + 1);
                    else triggerToast('Selesai', 'Modul berhasil diterbitkan melalui Wizard!', 'success');
                  }}
                  className="px-4 py-1.5 rounded-md bg-gray-900 text-white font-semibold hover:bg-black cursor-pointer"
                >
                  {wizardStep === 3 ? 'Selesaikan' : 'Lanjut'}
                </button>
              </div>
            </div>
          </UiDocSection>
        </UiDocPage>
      )}

      {/* 3.16 TINYMCE */}
      {isVisible('tinymce') && (
        <UiDocPage
          title="Tinymce"
        >
          <UiDocSection
            title="WYSIWYG Rich Text Editor Toolbar"
            classesHint="p-2 bg-gray-100 rounded-lg border border-gray-300"
            codeSnippet={`<div className="space-y-2">\n  <Toolbar onToggle={setFormat} />\n  <textarea value={content} className="w-full p-3 rounded-lg border" />\n</div>`}
            actions={<span className="text-xs text-gray-500 font-mono">WYSIWYG Toolbar</span>}
          >
            <div className="space-y-3 text-xs">
              <div className="flex flex-wrap items-center gap-1 p-2 bg-gray-100 rounded-lg border border-gray-300 text-gray-700">
                <button onClick={() => setRichFormat({ ...richFormat, bold: !richFormat.bold })} className={`p-1.5 rounded hover:bg-white cursor-pointer ${richFormat.bold ? 'bg-white text-primary-700 shadow-2xs' : ''}`}>
                  <Bold className="w-4 h-4" />
                </button>
                <button onClick={() => setRichFormat({ ...richFormat, italic: !richFormat.italic })} className={`p-1.5 rounded hover:bg-white cursor-pointer ${richFormat.italic ? 'bg-white text-primary-700 shadow-2xs' : ''}`}>
                  <Italic className="w-4 h-4" />
                </button>
                <button onClick={() => setRichFormat({ ...richFormat, underline: !richFormat.underline })} className={`p-1.5 rounded hover:bg-white cursor-pointer ${richFormat.underline ? 'bg-white text-primary-700 shadow-2xs' : ''}`}>
                  <Underline className="w-4 h-4" />
                </button>
                <button onClick={() => setRichFormat({ ...richFormat, strike: !richFormat.strike })} className={`p-1.5 rounded hover:bg-white cursor-pointer ${richFormat.strike ? 'bg-white text-primary-700 shadow-2xs' : ''}`}>
                  <Strikethrough className="w-4 h-4" />
                </button>
                <span className="h-4 w-[1px] bg-gray-300 mx-1" />
                <button onClick={() => setRichFormat({ ...richFormat, list: !richFormat.list })} className={`p-1.5 rounded hover:bg-white cursor-pointer ${richFormat.list ? 'bg-white text-primary-700 shadow-2xs' : ''}`}>
                  <List className="w-4 h-4" />
                </button>
                <button onClick={() => setRichFormat({ ...richFormat, ordered: !richFormat.ordered })} className={`p-1.5 rounded hover:bg-white cursor-pointer ${richFormat.ordered ? 'bg-white text-primary-700 shadow-2xs' : ''}`}>
                  <ListOrdered className="w-4 h-4" />
                </button>
                <button onClick={() => setRichFormat({ ...richFormat, code: !richFormat.code })} className={`p-1.5 rounded hover:bg-white cursor-pointer ${richFormat.code ? 'bg-white text-primary-700 shadow-2xs' : ''}`}>
                  <Code className="w-4 h-4" />
                </button>
                <span className="h-4 w-[1px] bg-gray-300 mx-1" />
                <button onClick={() => triggerToast('Link', 'Dialog sematkan tautan web terbuka.', 'info')} className="p-1.5 rounded hover:bg-white cursor-pointer">
                  <Link className="w-4 h-4" />
                </button>
                <button onClick={() => triggerToast('Quote', 'Format kutipan referensi diterapkan.', 'info')} className="p-1.5 rounded hover:bg-white cursor-pointer">
                  <Quote className="w-4 h-4" />
                </button>
              </div>
              <textarea
                rows={3}
                value={richContent}
                onChange={(e) => setRichContent(e.target.value)}
                className={`w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-primary-600 text-sm text-gray-800 ${
                  richFormat.bold ? 'font-bold' : ''
                } ${richFormat.italic ? 'italic' : ''} ${richFormat.underline ? 'underline' : ''} ${
                  richFormat.strike ? 'line-through' : ''
                } ${richFormat.code ? 'font-mono bg-gray-50' : ''}`}
              />
              <div className="flex justify-between items-center text-gray-500 tabular-nums">
                <span>
                  {richContent.split(' ').filter(Boolean).length} Kata · {richContent.length} Karakter
                </span>
                <button
                  onClick={() => triggerToast('Tersimpan', 'Catatan materi perkuliahan berhasil disimpan!', 'success')}
                  className="px-3.5 py-1.5 rounded-lg bg-gray-900 text-white font-semibold hover:bg-black cursor-pointer"
                >
                  Simpan Catatan
                </button>
              </div>
            </div>
          </UiDocSection>
        </UiDocPage>
      )}

      {/* 3.17 CHIPS */}
      {isVisible('chips') && (
        <UiDocPage
          title="Chips"
          subLinks={[
            { id: 'chp-default', label: 'Default chips' },
            { id: 'chp-pill', label: 'Chips Pill' },
            { id: 'chp-outline', label: 'Chips Outline' },
            { id: 'chp-icon', label: 'Chips with Icon' },
            { id: 'chp-tick', label: 'Chips Tick' },
            { id: 'chp-users', label: 'User Chips' },
            { id: 'chp-sizing', label: 'Sizing' },
            { id: 'chp-input', label: 'Input Chips' },
          ]}
        >
          <UiDocSection
            id="chp-default"
            title="Default chips"
            classesHint="px-2.5 py-1 rounded-md bg-gray-100 text-gray-800"
            codeSnippet={`<span className="px-2.5 py-1 rounded-md bg-gray-100 text-gray-800 text-xs font-semibold">Default</span>`}
          >
            <div className="flex flex-wrap gap-2 text-xs font-semibold">
              <span className="px-2.5 py-1 rounded-md bg-gray-100 text-gray-800">Default</span>
              <span className="px-2.5 py-1 rounded-md bg-primary-50 text-primary-700">Matematika</span>
              <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700">Selesai</span>
            </div>
          </UiDocSection>

          <UiDocSection
            id="chp-pill"
            title="Chips Pill"
            classesHint="px-2.5 py-1 rounded-full bg-primary-50 text-primary-700"
            codeSnippet={`<span className="px-2.5 py-1 rounded-full bg-primary-50 text-primary-700 font-semibold">Pill</span>`}
          >
            <div className="flex flex-wrap gap-2 text-xs font-semibold">
              <span className="px-2.5 py-1 rounded-full bg-primary-50 text-primary-700">Pill Primary</span>
              <span className="px-2.5 py-1 rounded-full bg-gray-900 text-white">Pill Dark</span>
            </div>
          </UiDocSection>

          <UiDocSection
            id="chp-outline"
            title="Chips Outline"
            classesHint="px-2.5 py-1 rounded-full border border-primary-400 text-primary-700"
            codeSnippet={`<span className="px-2.5 py-1 rounded-full border border-primary-400 text-primary-700 font-semibold">Outline</span>`}
          >
            <div className="flex flex-wrap gap-2 text-xs font-semibold">
              <span className="px-2.5 py-1 rounded-full border border-primary-400 text-primary-700">Outline Primary</span>
              <span className="px-2.5 py-1 rounded-full border border-gray-300 text-gray-700">Outline Slate</span>
            </div>
          </UiDocSection>

          <UiDocSection
            id="chp-icon"
            title="Chips with Icon"
            classesHint="inline-flex items-center gap-1 px-2.5 py-1 rounded-full"
            codeSnippet={`<span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800">\n  <BookOpen className="w-3.5 h-3.5" /> With Icon\n</span>`}
          >
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold">
              <BookOpen className="w-3.5 h-3.5" /> With Icon
            </span>
          </UiDocSection>

          <UiDocSection
            id="chp-tick"
            title="Chips Tick"
            classesHint="inline-flex items-center gap-1 px-3 py-1 rounded-full border"
            codeSnippet={`<button className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-900 text-white">\n  <Check className="w-3 h-3" /> PDF Silabus\n</button>`}
          >
            <div className="flex flex-wrap gap-2">
              {['PDF Silabus', 'Video HD', 'Kuis'].map((item) => {
                const active = tickChips.includes(item);
                return (
                  <button
                    key={item}
                    onClick={() => setTickChips((prev) => (active ? prev.filter((i) => i !== item) : [...prev, item]))}
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border cursor-pointer transition-colors ${
                      active ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-700 border-gray-300'
                    }`}
                  >
                    {active && <Check className="w-3 h-3 animate-ui-check" />}
                    <span>{item}</span>
                  </button>
                );
              })}
            </div>
          </UiDocSection>

          <UiDocSection
            id="chp-users"
            title="User Chips"
            classesHint="pl-1 pr-2.5 py-0.5 rounded-full bg-gray-100"
            codeSnippet={`<span className="inline-flex items-center gap-1.5 pl-1 pr-2.5 py-0.5 rounded-full bg-gray-100">\n  <span className="w-5 h-5 rounded-full bg-primary-600 text-white">JW</span>\n  <span>James Wilson</span>\n</span>`}
          >
            <div className="flex flex-wrap gap-2 text-xs">
              {userChips.map((u) => (
                <span key={u.name} className="inline-flex items-center gap-1.5 pl-1 pr-2.5 py-0.5 rounded-full bg-gray-100 border border-gray-300 font-semibold text-gray-800">
                  <span className={`w-5 h-5 rounded-full ${u.bg} text-white text-[9px] flex items-center justify-center`}>{u.init}</span>
                  <span>{u.name}</span>
                  <button onClick={() => setUserChips(userChips.filter((x) => x.name !== u.name))} className="text-gray-500 hover:text-gray-800 cursor-pointer">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </UiDocSection>

          <UiDocSection
            id="chp-sizing"
            title="Sizing"
            classesHint="text-[10px] px-2 py-0.5 / text-sm px-3.5 py-1.5"
            codeSnippet={`<span className="px-2 py-0.5 text-[10px] rounded-full">Small</span>\n<span className="px-3.5 py-1.5 text-sm rounded-full">Large</span>`}
          >
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full bg-primary-50 text-primary-700 text-[10px] font-semibold">Small</span>
              <span className="px-2.5 py-1 rounded-full bg-primary-50 text-primary-700 text-xs font-semibold">Medium</span>
              <span className="px-3.5 py-1.5 rounded-full bg-primary-50 text-primary-700 text-sm font-semibold">Large</span>
            </div>
          </UiDocSection>

          <UiDocSection
            id="chp-input"
            title="Input Chips"
            classesHint="flex flex-wrap gap-1.5"
            codeSnippet={`<input type="text" placeholder="Ketik tag lalu tekan Enter..." onKeyDown={handleAddChip} />`}
          >
            <div className="max-w-md space-y-2.5 text-xs">
              <div className="flex flex-wrap gap-1.5">
                {chips.map((chip) => (
                  <span key={chip} className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary-50 text-primary-700 font-semibold animate-ui-pop">
                    <span>{chip}</span>
                    <button onClick={() => setChips(chips.filter((c) => c !== chip))} className="hover:text-primary-950 cursor-pointer">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
              <input
                type="text"
                placeholder="Ketik tag lalu tekan Enter..."
                value={newChipText}
                onChange={(e) => setNewChipText(e.target.value)}
                onKeyDown={handleAddChip}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-primary-600"
              />
            </div>
          </UiDocSection>
        </UiDocPage>
      )}

      {/* 3.18 RATINGS */}
      {isVisible('ratings') && (
        <UiDocPage
          title="Ratings"
          subLinks={[
            { id: 'rtg-default', label: 'Default rating' },
            { id: 'rtg-tooltip', label: 'Tooltip' },
            { id: 'rtg-prog', label: 'Progressives' },
            { id: 'rtg-readonly', label: 'Read only' },
            { id: 'rtg-sizes', label: 'Sizes' },
            { id: 'rtg-spectrum', label: 'Semantic Spectrum Rubric Grid' },
          ]}
        >
          <UiDocSection
            id="rtg-default"
            title="Default rating"
            classesHint="text-amber-400 fill-amber-400"
            codeSnippet={`<div className="flex items-center gap-1">\n  {[1,2,3,4,5].map(s => <Star key={s} className={s <= rating ? 'text-amber-400 fill-amber-400' : 'text-gray-400'} />)}\n</div>`}
          >
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setStarRating(star)}
                  className="cursor-pointer transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-115 active:scale-90"
                >
                  <Star className={`w-5 h-5 transition-colors duration-200 ${star <= starRating ? 'text-amber-400 fill-amber-400' : 'text-gray-400'}`} />
                </button>
              ))}
            </div>
          </UiDocSection>

          <UiDocSection
            id="rtg-tooltip"
            title="Tooltip"
            classesHint="hover:scale-110 / bg-amber-50 text-amber-800"
            codeSnippet={`<div className="flex items-center gap-2">\n  {/* Star buttons with hover tooltip */}\n  <span>{ratingLabels[(hoverStar ?? starRating) - 1]}</span>\n</div>`}
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onMouseEnter={() => setHoverStar(star)}
                    onMouseLeave={() => setHoverStar(null)}
                    onClick={() => setStarRating(star)}
                    className="cursor-pointer transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-115 active:scale-90"
                  >
                    <Star className={`w-5 h-5 transition-colors duration-200 ${star <= (hoverStar ?? starRating) ? 'text-amber-400 fill-amber-400' : 'text-gray-400'}`} />
                  </button>
                ))}
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 text-[11px] font-bold">
                {ratingLabels[(hoverStar ?? starRating) - 1]}
              </span>
            </div>
          </UiDocSection>

          <UiDocSection
            id="rtg-prog"
            title="Progressives"
            classesHint="flex gap-1.5 / h-2.5 flex-1 rounded bg-primary-600"
            codeSnippet={`<div className="flex gap-1.5">\n  {[1,2,3,4,5].map(n => <button className={n <= val ? 'bg-primary-600' : 'bg-gray-200'} />)}\n</div>`}
          >
            <div className="max-w-sm space-y-1.5 text-xs">
              <div className="font-semibold text-gray-700 tabular-nums">Skor: {progressiveRating}/5</div>
              <div className="flex gap-1.5">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    onClick={() => setProgressiveRating(n)}
                    className={`h-2.5 flex-1 rounded cursor-pointer transition-all duration-[220ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:opacity-90 ${n <= progressiveRating ? 'bg-primary-600' : 'bg-gray-200'}`}
                  />
                ))}
              </div>
            </div>
          </UiDocSection>

          <UiDocSection
            id="rtg-readonly"
            title="Read only"
            classesHint="flex items-center gap-0.5"
            codeSnippet={`<div className="flex items-center gap-0.5">\n  {[1,2,3,4].map(n => <Star className="w-4 h-4 text-amber-400 fill-amber-400" />)}\n  <Star className="w-4 h-4 text-gray-400" />\n</div>`}
          >
            <div className="flex items-center gap-1 text-xs text-gray-600">
              {[1, 2, 3, 4].map((n) => (
                <Star key={n} className="w-4 h-4 text-amber-400 fill-amber-400" />
              ))}
              <Star className="w-4 h-4 text-gray-400" />
              <span className="ml-2 font-semibold tabular-nums">4.0 / 5.0</span>
            </div>
          </UiDocSection>

          <UiDocSection
            id="rtg-sizes"
            title="Sizes"
            classesHint="w-3.5 h-3.5 / w-5 h-5 / w-7 h-7"
            codeSnippet={`<Star className="w-3.5 h-3.5" />\n<Star className="w-5 h-5" />\n<Star className="w-7 h-7" />`}
          >
            <div className="space-y-2.5">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <Star key={n} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <Star key={n} className="w-5 h-5 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <Star key={n} className="w-7 h-7 text-amber-400 fill-amber-400" />
                ))}
              </div>
            </div>
          </UiDocSection>

          <UiDocSection
            id="rtg-spectrum"
            title="Semantic Spectrum Rubric Grid"
            description="Skala penilaian 5-tingkat dengan gradasi semantik merah-ke-hijau otomatis dari getScaleOptionAnalogousColors, dilengkapi persentase tabular-nums dan ring status aktif."
            classesHint="getScaleOptionAnalogousColors(value, options, idx) / grid-cols-2 sm:grid-cols-5"
            codeSnippet={`const colors = getScaleOptionAnalogousColors(opt.value, options, idx);\n<button className={isSelected ? colors.selected : colors.unselected}>\n  <span className="font-bold tabular-nums">{opt.value}%</span>\n  <span className="text-[11px]">{opt.label}</span>\n</button>`}
            actions={
              <span className="px-2.5 py-0.5 rounded-full bg-[#FEF1F5] text-[#9D113C] text-xs font-bold tabular-nums">
                Selected: {spectrumOptions[spectrumRatingIdx].value}% · {spectrumOptions[spectrumRatingIdx].label}
              </span>
            }
          >
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {spectrumOptions.map((opt, idx) => {
                const colors = getScaleOptionAnalogousColors(opt.value, spectrumOptions, idx);
                const isSelected = spectrumRatingIdx === idx;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSpectrumRatingIdx(idx)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected ? colors.selected : colors.unselected
                    }`}
                  >
                    <div className="text-sm font-bold tabular-nums">{opt.value}%</div>
                    <div
                      className={`text-[11px] font-medium mt-0.5 truncate ${
                        isSelected ? 'text-white/90' : colors.subLabelUnselected
                      }`}
                    >
                      {opt.label}
                    </div>
                  </button>
                );
              })}
            </div>
          </UiDocSection>
        </UiDocPage>
      )}

      {/* 3.19 PAGE SEARCH */}
      {isVisible('pagesearch') && (
        <UiDocPage
          title="Page Search"
          description="Pola pencarian lengkap mencakup Page Search, Recent Search, Suggestion Search, serta loading state memakai komponen reusable <UiSkeletonSearchPanel /> (.ui-skeleton-shimmer)."
          subLinks={[
            { id: 'ps-page', label: 'Page Search' },
            { id: 'ps-recent-suggestion', label: 'Recent & Suggestion' },
            { id: 'ps-list', label: 'List Search' },
            { id: 'ps-dropdown', label: 'Dropdown Search' },
            { id: 'ps-card', label: 'Card Search' },
          ]}
        >
          <UiDocSection
            id="ps-page"
            title="Page Search"
            classesHint="relative / pl-9 pr-12 py-2 rounded-lg border"
            codeSnippet={`<div className="relative">\n  <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-500" />\n  <input value={query} onChange={...} className="w-full pl-9 pr-12 py-2 rounded-lg border" />\n</div>`}
          >
            <div className="max-w-lg space-y-3 text-xs">
              <div className="relative">
                <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Cari modul (Page search)..."
                  value={pageSearch}
                  onChange={(e) => setPageSearch(e.target.value)}
                  className="w-full pl-9 pr-12 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-primary-600"
                />
                <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono font-bold bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded border border-gray-300">
                  ⌘K
                </span>
              </div>
              <div className="text-gray-500">
                Saran cepat:{' '}
                <button
                  type="button"
                  onClick={() => {
                    setPageSearch('Kalkulus');
                    handleSaveDemoRecent('Kalkulus');
                  }}
                  className="underline text-primary-600 cursor-pointer"
                >
                  Kalkulus
                </button>
                ,{' '}
                <button
                  type="button"
                  onClick={() => {
                    setPageSearch('Class 303');
                    handleSaveDemoRecent('Class 303');
                  }}
                  className="underline text-primary-600 cursor-pointer"
                >
                  Class 303
                </button>
              </div>
            </div>
          </UiDocSection>

          <UiDocSection
            id="ps-recent-suggestion"
            title="Recent Search & Suggestion Search (with UiSkeleton)"
            description="Menampilkan Pencarian Terakhir dan Saran Pencarian saat input kosong/fokus, serta transisi shimmer <UiSkeletonSearchPanel /> ketika memuat hasil."
            classesHint="<UiSkeletonSearchPanel /> + Recent Search + Suggestion Chips"
            actions={
              <button
                type="button"
                onClick={() => {
                  setDemoSearchFocused(true);
                  setDemoSearchLoading((prev) => !prev);
                }}
                className="group inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border border-gray-300 bg-white text-xs font-semibold text-gray-700 hover:bg-gray-50 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:rotate-90" />
                <span>{demoSearchLoading ? 'Tampilkan Hasil' : 'Simulasikan UiSkeleton'}</span>
              </button>
            }
            codeSnippet={`{isLoading ? (\n  <UiSkeletonSearchPanel mode={query ? 'results' : 'recent-and-suggestions'} rows={3} />\n) : (\n  <RecentAndSuggestionPanel\n    recent={recentSearches}\n    suggestions={suggestions}\n    onSelect={(term) => setQuery(term)}\n  />\n)}`}
          >
            <div className="max-w-lg space-y-2.5 text-xs">
              <div className="relative">
                <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Ketik kata kunci atau klik riwayat & saran di bawah..."
                  value={pageSearch}
                  onFocus={() => setDemoSearchFocused(true)}
                  onChange={(e) => {
                    setPageSearch(e.target.value);
                    setDemoSearchFocused(true);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && pageSearch.trim()) {
                      e.preventDefault();
                      handleSaveDemoRecent(pageSearch);
                    }
                  }}
                  className="w-full pl-9 pr-16 py-2 rounded-lg border border-gray-300 bg-white focus:outline-none focus:border-primary-600"
                />
                {pageSearch && (
                  <button
                    type="button"
                    onClick={() => setPageSearch('')}
                    aria-label="Hapus kata kunci"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded text-gray-400 hover:text-gray-700 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {demoSearchFocused && (
                <div className="rounded-xl border border-gray-300 bg-white shadow-sm overflow-hidden">
                  {demoSearchLoading ? (
                    <UiSkeletonSearchPanel
                      mode={pageSearch.trim() ? 'results' : 'recent-and-suggestions'}
                      rows={3}
                    />
                  ) : !pageSearch.trim() ? (
                    <div className="p-3 space-y-3 animate-ui-fade">
                      {/* Recent Search */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-[11px] font-semibold text-gray-500 px-1">
                          <span className="inline-flex items-center gap-1.5">
                            <Clock className="w-3 h-3 text-gray-400" />
                            <span>Pencarian Terakhir</span>
                          </span>
                          {demoRecentSearches.length > 0 && (
                            <button
                              type="button"
                              onClick={() => setDemoRecentSearches([])}
                              className="inline-flex items-center gap-1 text-[11px] font-medium text-gray-500 hover:text-[#ee2e65] cursor-pointer"
                            >
                              <Minus className="w-3 h-3" />
                              <span>Hapus semua</span>
                            </button>
                          )}
                        </div>
                        {demoRecentSearches.length === 0 ? (
                          <div className="px-2.5 py-2 rounded-lg bg-gray-50 border border-dashed border-gray-200 text-[11px] text-gray-500">
                            Riwayat pencarian kosong. Klik saran di bawah atau tekan Enter pada input.
                          </div>
                        ) : (
                          <div className="space-y-1">
                            {demoRecentSearches.map((term) => (
                              <div
                                key={term}
                                className="flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-lg hover:bg-primary-50/50 transition-colors"
                              >
                                <button
                                  type="button"
                                  onClick={() => {
                                    setPageSearch(term);
                                    handleSaveDemoRecent(term);
                                  }}
                                  className="flex-1 flex items-center gap-2 text-left text-gray-800 font-medium cursor-pointer truncate"
                                >
                                  <Clock className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                                  <span className="truncate">{term}</span>
                                </button>
                                <button
                                  type="button"
                                  aria-label={`Hapus ${term}`}
                                  onClick={() =>
                                    setDemoRecentSearches((prev) => prev.filter((item) => item !== term))
                                  }
                                  className="p-0.5 rounded text-gray-400 hover:text-gray-700 cursor-pointer"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Suggestion Search */}
                      <div className="space-y-1.5 pt-2.5 border-t border-gray-200">
                        <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-gray-500 px-1">
                          <Sparkles className="w-3 h-3 text-[#ee2e65]" />
                          <span>Saran Pencarian</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5 px-1">
                          {demoSuggestions.map((sug) => (
                            <button
                              key={sug.label}
                              type="button"
                              onClick={() => {
                                setPageSearch(sug.label);
                                handleSaveDemoRecent(sug.label);
                              }}
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-gray-200 bg-gray-50 hover:bg-[#FEF1F5] hover:border-[#FBC2D4] hover:text-[#9D113C] text-[11.5px] font-medium text-gray-700 transition-colors cursor-pointer"
                            >
                              <span>{sug.label}</span>
                              <span className="text-[10px] text-gray-400">{sug.category}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="divide-y divide-gray-200 animate-ui-fade">
                      {filteredSearch.length === 0 ? (
                        <div className="p-3.5 text-center space-y-2">
                          <p className="text-gray-600">Tidak ada modul untuk &ldquo;{pageSearch}&rdquo;.</p>
                          <div className="flex flex-wrap justify-center gap-1.5">
                            {demoSuggestions.slice(0, 3).map((sug) => (
                              <button
                                key={sug.label}
                                type="button"
                                onClick={() => setPageSearch(sug.label)}
                                className="px-2.5 py-1 rounded-full bg-[#FEF1F5] border border-[#FBC2D4] text-[11px] font-medium text-[#9D113C] cursor-pointer"
                              >
                                {sug.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      ) : (
                        filteredSearch.map((item) => (
                          <button
                            key={item.title}
                            type="button"
                            onClick={() => {
                              handleSaveDemoRecent(item.title);
                              triggerToast('Dipilih', `Membuka ${item.title}`, 'info');
                            }}
                            className="w-full px-3 py-2 flex items-center justify-between hover:bg-primary-50/40 text-left cursor-pointer"
                          >
                            <span className="font-medium text-gray-800 truncate">{item.title}</span>
                            <span className="text-gray-500 text-[11px] shrink-0 ml-2">
                              {item.tag} · {item.type}
                            </span>
                          </button>
                        ))
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </UiDocSection>

          <UiDocSection
            id="ps-list"
            title="List Search"
            classesHint="border border-gray-300 rounded-lg divide-y"
            codeSnippet={`<div className="border border-gray-300 rounded-lg divide-y divide-gray-200">\n  {items.map(item => <div className="px-3 py-2 flex justify-between">...</div>)}\n</div>`}
          >
            <div className="max-w-lg space-y-3 text-xs">
              <div className="relative">
                <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter daftar materi (List search)..."
                  value={pageSearch}
                  onChange={(e) => setPageSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-primary-600"
                />
              </div>
              <div className="border border-gray-300 rounded-lg divide-y divide-gray-200">
                {filteredSearch.map((item) => (
                  <div key={item.title} className="px-3 py-2 flex items-center justify-between hover:bg-gray-50 hover:pl-4 transition-all duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]">
                    <span className="font-medium text-gray-800 truncate">{item.title}</span>
                    <span className="text-gray-500 shrink-0 ml-2">{item.tag} · {item.type}</span>
                  </div>
                ))}
              </div>
            </div>
          </UiDocSection>

          <UiDocSection
            id="ps-dropdown"
            title="Dropdown Search"
            classesHint="shadow-md bg-white border border-gray-300 rounded-lg"
            codeSnippet={`<div className="shadow-md bg-white border border-gray-300 rounded-lg divide-y">\n  {results.map(r => <div className="px-3 py-2">...</div>)}\n</div>`}
          >
            <div className="max-w-lg space-y-2 text-xs">
              <div className="relative">
                <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Cari dengan hasil dropdown melayang..."
                  value={pageSearch}
                  onChange={(e) => setPageSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-primary-600"
                />
              </div>
              <div className="border border-gray-300 rounded-lg divide-y divide-gray-200 shadow-md bg-white">
                {filteredSearch.slice(0, 3).map((item) => (
                  <div key={item.title} className="px-3 py-2.5 flex items-center justify-between hover:bg-primary-50/40 hover:pl-4 transition-all duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] cursor-pointer">
                    <span className="font-medium text-gray-800 truncate">{item.title}</span>
                    <span className="text-gray-500 text-[11px] shrink-0 ml-2">{item.tag}</span>
                  </div>
                ))}
              </div>
            </div>
          </UiDocSection>

          <UiDocSection
            id="ps-card"
            title="Card Search"
            classesHint="grid grid-cols-2 gap-2.5"
            codeSnippet={`<div className="grid grid-cols-2 gap-2.5">\n  {items.map(item => <div className="p-3 rounded-lg border bg-gray-50">...</div>)}\n</div>`}
          >
            <div className="max-w-lg space-y-3 text-xs">
              <div className="relative">
                <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Cari kartu modul (Card search)..."
                  value={pageSearch}
                  onChange={(e) => setPageSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-primary-600"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {filteredSearch.map((item) => (
                  <div key={item.title} className="p-3 rounded-lg border border-gray-300 bg-gray-50 hover:bg-white hover:-translate-y-0.5 hover:shadow-xs transition-all duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] cursor-pointer">
                    <div className="font-bold text-gray-800 truncate">{item.title}</div>
                    <div className="text-gray-500 text-[11px] mt-0.5">{item.tag} · {item.type}</div>
                  </div>
                ))}
              </div>
            </div>
          </UiDocSection>
        </UiDocPage>
      )}

      <SelectCheckboxRadioUiKit isVisible={isVisible} />
      <ToggleUiKit isVisible={isVisible} />
      <MenuUxRulesUiKit isVisible={isVisible} />
    </div>
  );
};
