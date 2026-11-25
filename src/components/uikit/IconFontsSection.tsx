import React, { useState } from 'react';
import {
  Activity,
  Airplay,
  AlarmClock,
  AlarmClockPlus,
  AlertCircle,
  AlertOctagon,
  AlertTriangle,
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Anchor,
  Aperture,
  AppWindow,
  Archive,
  ArrowDown,
  ArrowDownCircle,
  ArrowDownLeft,
  ArrowDownRight,
  ArrowLeft,
  ArrowLeftCircle,
  ArrowLeftRight,
  ArrowRight,
  ArrowRightCircle,
  ArrowUp,
  ArrowUpCircle,
  ArrowUpDown,
  ArrowUpLeft,
  ArrowUpRight,
  Asterisk,
  AtSign,
  Award,
  BarChart,
  BarChart2,
  Barcode,
  Battery,
  BatteryFull,
  BatteryLow,
  BatteryMedium,
  Beer,
  Bell,
  BellOff,
  BellRing,
  Bird,
  Bluetooth,
  Bomb,
  Book,
  Bookmark,
  Briefcase,
  Bug,
  Building2,
  Calendar,
  Camera,
  CheckCircle2,
  Circle,
  ClipboardCheck,
  ClipboardList,
  Clock,
  Cloud,
  CloudDownload,
  CloudUpload,
  Code,
  Columns2,
  Delete,
  Dog,
  Download,
  Ear,
  FileText,
  Folder,
  Globe,
  Hand,
  Heart,
  Home,
  Layers,
  LayoutDashboard,
  Lock,
  Mail,
  Maximize,
  Maximize2,
  Megaphone,
  Menu,
  Minimize2,
  Move,
  PawPrint,
  PiggyBank,
  PlusSquare,
  Radiation,
  Radio,
  Redo2,
  RefreshCw,
  RotateCcw,
  Rows2,
  Search,
  Settings,
  Shield,
  ShoppingBag,
  ShoppingBasket,
  ShoppingCart,
  SkipBack,
  SlidersHorizontal,
  Smartphone,
  Smile,
  Star,
  Target,
  Upload,
  User,
  UserCheck,
  UserCircle,
  UserSquare,
  Volume1,
  Wallet,
  Wand2,
  Wrench,
  Accessibility,
  type LucideIcon,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UiDocPage, UiDocSection } from './UiDocBlock';

interface IconTileItem {
  name: string;
  copyText: string;
  Icon?: LucideIcon;
  filled?: boolean;
  duotone?: boolean;
  strokeWidth?: number;
  emoji?: string;
  flagCode?: string;
}

const renderSvgFlag = (code: string) => {
  switch (code) {
    case 'id':
      return (
        <svg viewBox="0 0 28 20" className="w-7 h-5 rounded-[2px] border border-gray-300">
          <rect width="28" height="10" fill="#E11D48" />
          <rect y="10" width="28" height="10" fill="#FFFFFF" />
        </svg>
      );
    case 'jp':
      return (
        <svg viewBox="0 0 28 20" className="w-7 h-5 rounded-[2px] border border-gray-300">
          <rect width="28" height="20" fill="#FFFFFF" />
          <circle cx="14" cy="10" r="5" fill="#BC002D" />
        </svg>
      );
    case 'in':
      return (
        <svg viewBox="0 0 28 20" className="w-7 h-5 rounded-[2px] border border-gray-300">
          <rect width="28" height="6.67" fill="#FF9933" />
          <rect y="6.67" width="28" height="6.67" fill="#FFFFFF" />
          <rect y="13.33" width="28" height="6.67" fill="#138808" />
          <circle cx="14" cy="10" r="2.2" fill="none" stroke="#000080" strokeWidth="0.9" />
        </svg>
      );
    case 'de':
      return (
        <svg viewBox="0 0 28 20" className="w-7 h-5 rounded-[2px] border border-gray-300">
          <rect width="28" height="6.67" fill="#111827" />
          <rect y="6.67" width="28" height="6.67" fill="#DC2626" />
          <rect y="13.33" width="28" height="6.67" fill="#FACC15" />
        </svg>
      );
    case 'fr':
      return (
        <svg viewBox="0 0 28 20" className="w-7 h-5 rounded-[2px] border border-gray-300">
          <rect width="9.33" height="20" fill="#1D4ED8" />
          <rect x="9.33" width="9.34" height="20" fill="#FFFFFF" />
          <rect x="18.67" width="9.33" height="20" fill="#DC2626" />
        </svg>
      );
    case 'br':
      return (
        <svg viewBox="0 0 28 20" className="w-7 h-5 rounded-[2px] border border-gray-300">
          <rect width="28" height="20" fill="#009B3A" />
          <polygon points="14,3 24,10 14,17 4,10" fill="#FEDF00" />
          <circle cx="14" cy="10" r="3.4" fill="#002776" />
        </svg>
      );
    case 'ca':
      return (
        <svg viewBox="0 0 28 20" className="w-7 h-5 rounded-[2px] border border-gray-300">
          <rect width="7" height="20" fill="#DC2626" />
          <rect x="7" width="14" height="20" fill="#FFFFFF" />
          <rect x="21" width="7" height="20" fill="#DC2626" />
          <circle cx="14" cy="10" r="3.2" fill="#DC2626" />
        </svg>
      );
    case 'us':
      return (
        <svg viewBox="0 0 28 20" className="w-7 h-5 rounded-[2px] border border-gray-300">
          <rect width="28" height="20" fill="#FFFFFF" />
          <rect y="0" width="28" height="2.8" fill="#B91C1C" />
          <rect y="5.6" width="28" height="2.8" fill="#B91C1C" />
          <rect y="11.2" width="28" height="2.8" fill="#B91C1C" />
          <rect y="16.8" width="28" height="3.2" fill="#B91C1C" />
          <rect width="13" height="11" fill="#1E3A8A" />
        </svg>
      );
    case 'gb':
      return (
        <svg viewBox="0 0 28 20" className="w-7 h-5 rounded-[2px] border border-gray-300">
          <rect width="28" height="20" fill="#012169" />
          <path d="M0,0 L28,20 M28,0 L0,20" stroke="#FFFFFF" strokeWidth="3.5" />
          <path d="M0,0 L28,20 M28,0 L0,20" stroke="#C8102E" strokeWidth="1.8" />
          <path d="M14,0 V20 M0,10 H28" stroke="#FFFFFF" strokeWidth="5" />
          <path d="M14,0 V20 M0,10 H28" stroke="#C8102E" strokeWidth="3" />
        </svg>
      );
    case 'au':
    case 'nz':
      return (
        <svg viewBox="0 0 28 20" className="w-7 h-5 rounded-[2px] border border-gray-300">
          <rect width="28" height="20" fill="#00008B" />
          <rect width="12" height="10" fill="#012169" />
          <path d="M6,0 V10 M0,5 H12" stroke="#FFFFFF" strokeWidth="2" />
          <path d="M6,0 V10 M0,5 H12" stroke="#C8102E" strokeWidth="1" />
          <circle cx="21" cy="6" r="1.3" fill={code === 'nz' ? '#DC2626' : '#FFFFFF'} />
          <circle cx="19" cy="13" r="1.1" fill={code === 'nz' ? '#DC2626' : '#FFFFFF'} />
          <circle cx="23" cy="12" r="1.1" fill={code === 'nz' ? '#DC2626' : '#FFFFFF'} />
        </svg>
      );
    case 'eu':
      return (
        <svg viewBox="0 0 28 20" className="w-7 h-5 rounded-[2px] border border-gray-300">
          <rect width="28" height="20" fill="#003399" />
          <circle cx="14" cy="10" r="5" fill="none" stroke="#FFCC00" strokeWidth="1.4" strokeDasharray="1.5 2" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 28 20" className="w-7 h-5 rounded-[2px] border border-gray-300">
          <rect width="28" height="20" fill="#0EA5E9" />
          <circle cx="14" cy="10" r="5" fill="none" stroke="#FFFFFF" strokeWidth="1.5" />
        </svg>
      );
  }
};

const MONOCHROME_ICONS: IconTileItem[] = [
  { name: 'uim-house-user', copyText: '<i className="uim uim-house-user" />', Icon: Home, duotone: true },
  { name: 'uim-apps', copyText: '<i className="uim uim-apps" />', Icon: LayoutDashboard, duotone: true },
  { name: 'uim-user', copyText: '<i className="uim uim-user" />', Icon: User, duotone: true },
  { name: 'uim-folder', copyText: '<i className="uim uim-folder" />', Icon: Folder, duotone: true },
  { name: 'uim-document-layout', copyText: '<i className="uim uim-document-layout" />', Icon: FileText, duotone: true },
  { name: 'uim-calender', copyText: '<i className="uim uim-calender" />', Icon: Calendar, duotone: true },
  { name: 'uim-bell', copyText: '<i className="uim uim-bell" />', Icon: Bell, duotone: true },
  { name: 'uim-envelope', copyText: '<i className="uim uim-envelope" />', Icon: Mail, duotone: true },
  { name: 'uim-chart-pie', copyText: '<i className="uim uim-chart-pie" />', Icon: BarChart2, duotone: true },
  { name: 'uim-cog', copyText: '<i className="uim uim-cog" />', Icon: Settings, duotone: true },
  { name: 'uim-shield-check', copyText: '<i className="uim uim-shield-check" />', Icon: Shield, duotone: true },
  { name: 'uim-lock', copyText: '<i className="uim uim-lock" />', Icon: Lock, duotone: true },
  { name: 'uim-search', copyText: '<i className="uim uim-search" />', Icon: Search, duotone: true },
  { name: 'uim-layer-group', copyText: '<i className="uim uim-layer-group" />', Icon: Layers, duotone: true },
  { name: 'uim-bookmark', copyText: '<i className="uim uim-bookmark" />', Icon: Bookmark, duotone: true },
  { name: 'uim-clock', copyText: '<i className="uim uim-clock" />', Icon: Clock, duotone: true },
  { name: 'uim-award', copyText: '<i className="uim uim-award" />', Icon: Award, duotone: true },
  { name: 'uim-download-alt', copyText: '<i className="uim uim-download-alt" />', Icon: Download, duotone: true },
  { name: 'uim-upload-alt', copyText: '<i className="uim uim-upload-alt" />', Icon: Upload, duotone: true },
  { name: 'uim-check-circle', copyText: '<i className="uim uim-check-circle" />', Icon: CheckCircle2, duotone: true },
  { name: 'uim-star', copyText: '<i className="uim uim-star" />', Icon: Star, duotone: true },
  { name: 'uim-sliders-v', copyText: '<i className="uim uim-sliders-v" />', Icon: SlidersHorizontal, duotone: true },
  { name: 'uim-globe', copyText: '<i className="uim uim-globe" />', Icon: Globe, duotone: true },
  { name: 'uim-briefcase', copyText: '<i className="uim uim-briefcase" />', Icon: Briefcase, duotone: true },
];

const DRIPICONS_LIST: IconTileItem[] = [
  { name: 'alarm', copyText: '<i className="dripicons dripicons-alarm" />', Icon: AlarmClock },
  { name: 'align-center', copyText: '<i className="dripicons dripicons-align-center" />', Icon: AlignCenter },
  { name: 'align-justify', copyText: '<i className="dripicons dripicons-align-justify" />', Icon: AlignJustify },
  { name: 'align-left', copyText: '<i className="dripicons dripicons-align-left" />', Icon: AlignLeft },
  { name: 'align-right', copyText: '<i className="dripicons dripicons-align-right" />', Icon: AlignRight },
  { name: 'anchor', copyText: '<i className="dripicons dripicons-anchor" />', Icon: Anchor },
  { name: 'archive', copyText: '<i className="dripicons dripicons-archive" />', Icon: Archive },
  { name: 'arrow-down', copyText: '<i className="dripicons dripicons-arrow-down" />', Icon: ArrowDown },
  { name: 'arrow-left', copyText: '<i className="dripicons dripicons-arrow-left" />', Icon: ArrowLeft },
  { name: 'arrow-right', copyText: '<i className="dripicons dripicons-arrow-right" />', Icon: ArrowRight },
  { name: 'arrow-thin-down', copyText: '<i className="dripicons dripicons-arrow-thin-down" />', Icon: ArrowDown, strokeWidth: 1.35 },
  { name: 'arrow-thin-left', copyText: '<i className="dripicons dripicons-arrow-thin-left" />', Icon: ArrowLeft, strokeWidth: 1.35 },
  { name: 'arrow-thin-right', copyText: '<i className="dripicons dripicons-arrow-thin-right" />', Icon: ArrowRight, strokeWidth: 1.35 },
  { name: 'arrow-thin-up', copyText: '<i className="dripicons dripicons-arrow-thin-up" />', Icon: ArrowUp, strokeWidth: 1.35 },
  { name: 'arrow-up', copyText: '<i className="dripicons dripicons-arrow-up" />', Icon: ArrowUp },
  { name: 'article', copyText: '<i className="dripicons dripicons-article" />', Icon: FileText },
  { name: 'backspace', copyText: '<i className="dripicons dripicons-backspace" />', Icon: Delete },
  { name: 'basket', copyText: '<i className="dripicons dripicons-basket" />', Icon: ShoppingBasket },
  { name: 'basketball', copyText: '<i className="dripicons dripicons-basketball" />', Icon: Circle },
  { name: 'battery-empty', copyText: '<i className="dripicons dripicons-battery-empty" />', Icon: Battery },
  { name: 'battery-full', copyText: '<i className="dripicons dripicons-battery-full" />', Icon: BatteryFull },
  { name: 'battery-low', copyText: '<i className="dripicons dripicons-battery-low" />', Icon: BatteryLow },
  { name: 'battery-medium', copyText: '<i className="dripicons dripicons-battery-medium" />', Icon: BatteryMedium },
  { name: 'bell', copyText: '<i className="dripicons dripicons-bell" />', Icon: Bell },
  { name: 'blog', copyText: '<i className="dripicons dripicons-blog" />', Icon: Book },
  { name: 'bluetooth', copyText: '<i className="dripicons dripicons-bluetooth" />', Icon: Bluetooth },
  { name: 'cloud', copyText: '<i className="dripicons dripicons-cloud" />', Icon: Cloud },
  { name: 'cloud-download', copyText: '<i className="dripicons dripicons-cloud-download" />', Icon: CloudDownload },
  { name: 'cloud-upload', copyText: '<i className="dripicons dripicons-cloud-upload" />', Icon: CloudUpload },
  { name: 'code', copyText: '<i className="dripicons dripicons-code" />', Icon: Code },
];

const MATERIAL_ICONS_LIST: IconTileItem[] = [
  { name: '3d_rotation', copyText: '<i className="material-icons">3d_rotation</i>', Icon: RefreshCw },
  { name: 'accessibility', copyText: '<i className="material-icons">accessibility</i>', Icon: Accessibility },
  { name: 'accessible_forward', copyText: '<i className="material-icons">accessible_forward</i>', Icon: UserCheck },
  { name: 'account_balance', copyText: '<i className="material-icons">account_balance</i>', Icon: Building2 },
  { name: 'account_balance_wallet', copyText: '<i className="material-icons">account_balance_wallet</i>', Icon: Wallet },
  { name: 'account_box', copyText: '<i className="material-icons">account_box</i>', Icon: UserSquare },
  { name: 'account_circle', copyText: '<i className="material-icons">account_circle</i>', Icon: UserCircle },
  { name: 'add_shopping_cart', copyText: '<i className="material-icons">add_shopping_cart</i>', Icon: ShoppingCart },
  { name: 'alarm', copyText: '<i className="material-icons">alarm</i>', Icon: AlarmClock },
  { name: 'alarm_add', copyText: '<i className="material-icons">alarm_add</i>', Icon: AlarmClockPlus },
  { name: 'alarm_off', copyText: '<i className="material-icons">alarm_off</i>', Icon: BellOff },
  { name: 'all_out', copyText: '<i className="material-icons">all_out</i>', Icon: Maximize2 },
  { name: 'android', copyText: '<i className="material-icons">android</i>', Icon: Smartphone },
  { name: 'announcement', copyText: '<i className="material-icons">announcement</i>', Icon: Megaphone },
  { name: 'assessment', copyText: '<i className="material-icons">assessment</i>', Icon: BarChart2 },
  { name: 'assignment', copyText: '<i className="material-icons">assignment</i>', Icon: ClipboardList },
  { name: 'assignment_ind', copyText: '<i className="material-icons">assignment_ind</i>', Icon: User },
  { name: 'assignment_late', copyText: '<i className="material-icons">assignment_late</i>', Icon: AlertCircle },
  { name: 'assignment_return', copyText: '<i className="material-icons">assignment_return</i>', Icon: RotateCcw },
  { name: 'assignment_returned', copyText: '<i className="material-icons">assignment_returned</i>', Icon: Download },
  { name: 'assignment_turned_in', copyText: '<i className="material-icons">assignment_turned_in</i>', Icon: ClipboardCheck },
  { name: 'backup', copyText: '<i className="material-icons">backup</i>', Icon: CloudUpload },
  { name: 'book', copyText: '<i className="material-icons">book</i>', Icon: Book },
  { name: 'bookmark', copyText: '<i className="material-icons">bookmark</i>', Icon: Bookmark, filled: true },
  { name: 'bookmark_border', copyText: '<i className="material-icons">bookmark_border</i>', Icon: Bookmark },
  { name: 'build', copyText: '<i className="material-icons">build</i>', Icon: Wrench },
  { name: 'bug_report', copyText: '<i className="material-icons">bug_report</i>', Icon: Bug },
  { name: 'cached', copyText: '<i className="material-icons">cached</i>', Icon: RefreshCw },
];

const FEATHER_ICONS_LIST: IconTileItem[] = [
  { name: 'circle', copyText: '<Circle />', Icon: Circle },
  { name: 'activity', copyText: '<Activity />', Icon: Activity },
  { name: 'airplay', copyText: '<Airplay />', Icon: Airplay },
  { name: 'alert-circle', copyText: '<AlertCircle />', Icon: AlertCircle },
  { name: 'alert-octagon', copyText: '<AlertOctagon />', Icon: AlertOctagon },
  { name: 'align-center', copyText: '<AlignCenter />', Icon: AlignCenter },
  { name: 'align-justify', copyText: '<AlignJustify />', Icon: AlignJustify },
  { name: 'align-left', copyText: '<AlignLeft />', Icon: AlignLeft },
  { name: 'align-right', copyText: '<AlignRight />', Icon: AlignRight },
  { name: 'anchor', copyText: '<Anchor />', Icon: Anchor },
  { name: 'aperture', copyText: '<Aperture />', Icon: Aperture },
  { name: 'archive', copyText: '<Archive />', Icon: Archive },
  { name: 'arrow-down-circle', copyText: '<ArrowDownCircle />', Icon: ArrowDownCircle },
  { name: 'arrow-down-left', copyText: '<ArrowDownLeft />', Icon: ArrowDownLeft },
  { name: 'arrow-down-right', copyText: '<ArrowDownRight />', Icon: ArrowDownRight },
  { name: 'arrow-down', copyText: '<ArrowDown />', Icon: ArrowDown },
  { name: 'arrow-left-circle', copyText: '<ArrowLeftCircle />', Icon: ArrowLeftCircle },
  { name: 'arrow-left', copyText: '<ArrowLeft />', Icon: ArrowLeft },
  { name: 'arrow-right-circle', copyText: '<ArrowRightCircle />', Icon: ArrowRightCircle },
  { name: 'arrow-right', copyText: '<ArrowRight />', Icon: ArrowRight },
  { name: 'arrow-up-circle', copyText: '<ArrowUpCircle />', Icon: ArrowUpCircle },
  { name: 'arrow-up-left', copyText: '<ArrowUpLeft />', Icon: ArrowUpLeft },
  { name: 'arrow-up-right', copyText: '<ArrowUpRight />', Icon: ArrowUpRight },
  { name: 'arrow-up', copyText: '<ArrowUp />', Icon: ArrowUp },
  { name: 'at-sign', copyText: '<AtSign />', Icon: AtSign },
  { name: 'award', copyText: '<Award />', Icon: Award },
  { name: 'bar-chart-2', copyText: '<BarChart2 />', Icon: BarChart2 },
  { name: 'bar-chart', copyText: '<BarChart />', Icon: BarChart },
];

const FONTAWESOME_ICONS_LIST: IconTileItem[] = [
  { name: 'fa-adjust', copyText: '<FontAwesomeIcon icon={faAdjust} />', Icon: Circle, filled: true },
  { name: 'fa-anchor', copyText: '<FontAwesomeIcon icon={faAnchor} />', Icon: Anchor, strokeWidth: 2.3 },
  { name: 'fa-archive', copyText: '<FontAwesomeIcon icon={faArchive} />', Icon: Archive, filled: true },
  { name: 'fa-asterisk', copyText: '<FontAwesomeIcon icon={faAsterisk} />', Icon: Asterisk, strokeWidth: 2.5 },
  { name: 'fa-piggy-bank', copyText: '<FontAwesomeIcon icon={faPiggyBank} />', Icon: PiggyBank, filled: true },
  { name: 'fa-chart-column', copyText: '<FontAwesomeIcon icon={faChartColumn} />', Icon: BarChart2, strokeWidth: 2.4 },
  { name: 'fa-barcode', copyText: '<FontAwesomeIcon icon={faBarcode} />', Icon: Barcode, strokeWidth: 2.2 },
  { name: 'fa-bars', copyText: '<FontAwesomeIcon icon={faBars} />', Icon: Menu, strokeWidth: 2.5 },
  { name: 'fa-beer', copyText: '<FontAwesomeIcon icon={faBeer} />', Icon: Beer, filled: true },
  { name: 'fa-bell', copyText: '<FontAwesomeIcon icon={faBell} />', Icon: Bell, filled: true },
  { name: 'fa-bomb', copyText: '<FontAwesomeIcon icon={faBomb} />', Icon: Bomb, filled: true },
  { name: 'fa-book', copyText: '<FontAwesomeIcon icon={faBook} />', Icon: Book, filled: true },
  { name: 'fa-bookmark', copyText: '<FontAwesomeIcon icon={faBookmark} />', Icon: Bookmark, filled: true },
  { name: 'fa-briefcase', copyText: '<FontAwesomeIcon icon={faBriefcase} />', Icon: Briefcase, filled: true },
  { name: 'fa-bug', copyText: '<FontAwesomeIcon icon={faBug} />', Icon: Bug, filled: true },
  { name: 'fa-building', copyText: '<FontAwesomeIcon icon={faBuilding} />', Icon: Building2, filled: true },
  { name: 'fa-bullhorn', copyText: '<FontAwesomeIcon icon={faBullhorn} />', Icon: Megaphone, filled: true },
  { name: 'fa-bullseye', copyText: '<FontAwesomeIcon icon={faBullseye} />', Icon: Target, strokeWidth: 2.3 },
  { name: 'fa-window-maximize', copyText: '<FontAwesomeIcon icon={faWindowMaximize} />', Icon: AppWindow, strokeWidth: 2.2 },
  { name: 'fa-calendar', copyText: '<FontAwesomeIcon icon={faCalendar} />', Icon: Calendar, filled: true },
  { name: 'fa-camera', copyText: '<FontAwesomeIcon icon={faCamera} />', Icon: Camera, filled: true },
];

const REMIX_ICONS_LIST: IconTileItem[] = [
  { name: 'ti-arrow-up', copyText: '<i className="ti-arrow-up" />', Icon: ArrowUp },
  { name: 'ti-arrow-right', copyText: '<i className="ti-arrow-right" />', Icon: ArrowRight },
  { name: 'ti-arrow-left', copyText: '<i className="ti-arrow-left" />', Icon: ArrowLeft },
  { name: 'ti-arrow-down', copyText: '<i className="ti-arrow-down" />', Icon: ArrowDown },
  { name: 'ti-arrow-vertical', copyText: '<i className="ti-arrow-vertical" />', Icon: ArrowUpDown },
  { name: 'ti-arrows-horizontal', copyText: '<i className="ti-arrows-horizontal" />', Icon: ArrowLeftRight },
  { name: 'ti-move', copyText: '<i className="ti-move" />', Icon: Move },
  { name: 'ti-fullscreen', copyText: '<i className="ti-fullscreen" />', Icon: Maximize },
  { name: 'ti-arrow-top-right', copyText: '<i className="ti-arrow-top-right" />', Icon: ArrowUpRight },
  { name: 'ti-arrow-top-left', copyText: '<i className="ti-arrow-top-left" />', Icon: ArrowUpLeft },
  { name: 'ti-arrow-circle-up', copyText: '<i className="ti-arrow-circle-up" />', Icon: ArrowUpCircle },
  { name: 'ti-arrow-circle-right', copyText: '<i className="ti-arrow-circle-right" />', Icon: ArrowRightCircle },
  { name: 'ti-arrow-circle-left', copyText: '<i className="ti-arrow-circle-left" />', Icon: ArrowLeftCircle },
  { name: 'ti-arrow-circle-down', copyText: '<i className="ti-arrow-circle-down" />', Icon: ArrowDownCircle },
  { name: 'ti-arrows-corner', copyText: '<i className="ti-arrows-corner" />', Icon: Minimize2 },
  { name: 'ti-split-v', copyText: '<i className="ti-split-v" />', Icon: Rows2 },
  { name: 'ti-split-h', copyText: '<i className="ti-split-h" />', Icon: Columns2 },
  { name: 'ti-hand-point-up', copyText: '<i className="ti-hand-point-up" />', Icon: Hand },
  { name: 'ti-wand', copyText: '<i className="ti-wand" />', Icon: Wand2 },
];

const LINE_AWESOME_LIST: IconTileItem[] = [
  { name: 'la-battery-three-quarters', copyText: '<i className="las la-battery-three-quarters" />', Icon: BatteryMedium, strokeWidth: 1.5 },
  { name: 'la-exclamation-triangle', copyText: '<i className="las la-exclamation-triangle" />', Icon: AlertTriangle, strokeWidth: 1.5 },
  { name: 'la-wheelchair', copyText: '<i className="las la-wheelchair" />', Icon: Accessibility, strokeWidth: 1.5 },
  { name: 'la-radiation', copyText: '<i className="las la-radiation" />', Icon: Radiation, strokeWidth: 1.5 },
  { name: 'la-assistive-listening', copyText: '<i className="las la-assistive-listening-systems" />', Icon: Ear, strokeWidth: 1.5 },
  { name: 'la-crow', copyText: '<i className="las la-crow" />', Icon: Bird, strokeWidth: 1.5 },
  { name: 'la-dog', copyText: '<i className="las la-dog" />', Icon: Dog, strokeWidth: 1.5 },
  { name: 'la-paw', copyText: '<i className="las la-paw" />', Icon: PawPrint, strokeWidth: 1.5 },
  { name: 'la-angle-down', copyText: '<i className="las la-angle-down" />', Icon: ArrowDown, strokeWidth: 1.5 },
  { name: 'la-angle-left', copyText: '<i className="las la-angle-left" />', Icon: ArrowLeft, strokeWidth: 1.5 },
  { name: 'la-angle-right', copyText: '<i className="las la-angle-right" />', Icon: ArrowRight, strokeWidth: 1.5 },
  { name: 'la-arrow-circle-left', copyText: '<i className="las la-arrow-alt-circle-left" />', Icon: ArrowLeftCircle, strokeWidth: 1.5 },
  { name: 'la-arrow-circle-right', copyText: '<i className="las la-arrow-alt-circle-right" />', Icon: ArrowRightCircle, strokeWidth: 1.5 },
  { name: 'la-arrow-circle-up', copyText: '<i className="las la-arrow-alt-circle-up" />', Icon: ArrowUpCircle, strokeWidth: 1.5 },
  { name: 'la-arrow-circle-down', copyText: '<i className="las la-arrow-alt-circle-down" />', Icon: ArrowDownCircle, strokeWidth: 1.5 },
  { name: 'la-podcast', copyText: '<i className="las la-podcast" />', Icon: Radio, strokeWidth: 1.5 },
  { name: 'la-redo', copyText: '<i className="las la-redo" />', Icon: Redo2, strokeWidth: 1.5 },
  { name: 'la-volume-down', copyText: '<i className="las la-volume-down" />', Icon: Volume1, strokeWidth: 1.5 },
  { name: 'la-step-backward', copyText: '<i className="las la-step-backward" />', Icon: SkipBack, strokeWidth: 1.5 },
  { name: 'la-sync', copyText: '<i className="las la-sync" />', Icon: RefreshCw, strokeWidth: 1.5 },
];

const FLAG_ICONS_LIST: IconTileItem[] = [
  { name: 'flag-icon-id', copyText: '<i className="flag-icon flag-icon-id" />', flagCode: 'id' },
  { name: 'flag-icon-in', copyText: '<i className="flag-icon flag-icon-in" />', flagCode: 'in' },
  { name: 'flag-icon-au', copyText: '<i className="flag-icon flag-icon-au" />', flagCode: 'au' },
  { name: 'flag-icon-br', copyText: '<i className="flag-icon flag-icon-br" />', flagCode: 'br' },
  { name: 'flag-icon-ca', copyText: '<i className="flag-icon flag-icon-ca" />', flagCode: 'ca' },
  { name: 'flag-icon-jp', copyText: '<i className="flag-icon flag-icon-jp" />', flagCode: 'jp' },
  { name: 'flag-icon-nz', copyText: '<i className="flag-icon flag-icon-nz" />', flagCode: 'nz' },
  { name: 'flag-icon-us', copyText: '<i className="flag-icon flag-icon-us" />', flagCode: 'us' },
  { name: 'flag-icon-gb', copyText: '<i className="flag-icon flag-icon-gb" />', flagCode: 'gb' },
  { name: 'flag-icon-de', copyText: '<i className="flag-icon flag-icon-de" />', flagCode: 'de' },
  { name: 'flag-icon-fr', copyText: '<i className="flag-icon flag-icon-fr" />', flagCode: 'fr' },
  { name: 'flag-icon-eu', copyText: '<i className="flag-icon flag-icon-eu" />', flagCode: 'eu' },
  { name: 'flag-icon-un', copyText: '<i className="flag-icon flag-icon-un" />', flagCode: 'un' },
];

const EMOJI_ICONS_LIST: IconTileItem[] = [
  { name: 'em---1', copyText: '<i className="em em---1" />', emoji: '👍' },
  { name: 'em-100', copyText: '<i className="em em-100" />', emoji: '💯' },
  { name: 'em-abcd', copyText: '<i className="em em-abcd" />', emoji: '🔤' },
  { name: 'em-airplane', copyText: '<i className="em em-airplane" />', emoji: '✈️' },
  { name: 'em-alembic', copyText: '<i className="em em-alembic" />', emoji: '⚗️' },
  { name: 'em-ambulance', copyText: '<i className="em em-ambulance" />', emoji: '🚑' },
  { name: 'em-arrow_right', copyText: '<i className="em em-arrow_right" />', emoji: '➡️' },
  { name: 'em-art', copyText: '<i className="em em-art" />', emoji: '🎨' },
  { name: 'em-athletic_shoe', copyText: '<i className="em em-athletic_shoe" />', emoji: '👟' },
  { name: 'em-bar_chart', copyText: '<i className="em em-bar_chart" />', emoji: '📊' },
  { name: 'em-baseball', copyText: '<i className="em em-baseball" />', emoji: '⚾' },
  { name: 'em-basketball', copyText: '<i className="em em-basketball" />', emoji: '🏀' },
  { name: 'em-bathtub', copyText: '<i className="em em-bathtub" />', emoji: '🛁' },
  { name: 'em-beer', copyText: '<i className="em em-beer" />', emoji: '🍺' },
  { name: 'em-bike', copyText: '<i className="em em-bike" />', emoji: '🚲' },
  { name: 'em-black_nib', copyText: '<i className="em em-black_nib" />', emoji: '✒️' },
  { name: 'em-bowl_with_spoon', copyText: '<i className="em em-bowl_with_spoon" />', emoji: '🥣' },
];

const BOOTSTRAP_ICONS_LIST: IconTileItem[] = [
  { name: 'bi bi-alarm-fill', copyText: '<i className="bi bi-alarm-fill" />', Icon: AlarmClock, filled: true },
  { name: 'bi bi-app-indicator', copyText: '<i className="bi bi-app-indicator" />', Icon: BellRing },
  { name: 'bi bi-archive', copyText: '<i className="bi bi-archive" />', Icon: Archive },
  { name: 'bi bi-basket-fill', copyText: '<i className="bi bi-basket-fill" />', Icon: ShoppingBasket, filled: true },
  { name: 'bi bi-bag-plus', copyText: '<i className="bi bi-bag-plus" />', Icon: PlusSquare },
  { name: 'bi bi-bag', copyText: '<i className="bi bi-bag" />', Icon: ShoppingBag },
  { name: 'bi bi-emoji-heart-eyes', copyText: '<i className="bi bi-emoji-heart-eyes" />', Icon: Smile },
  { name: 'bi bi-bar-chart-fill', copyText: '<i className="bi bi-bar-chart-fill" />', Icon: BarChart2, filled: true },
  { name: 'bi bi-bell', copyText: '<i className="bi bi-bell" />', Icon: Bell },
  { name: 'bi bi-heart-fill', copyText: '<i className="bi bi-heart-fill" />', Icon: Heart, filled: true },
];

interface IconTileGridProps {
  items: IconTileItem[];
  onCopy: (text: string, label: string) => void;
  query: string;
}

const IconTileGrid: React.FC<IconTileGridProps> = ({ items, onCopy, query }) => {
  const q = query.trim().toLowerCase();
  const filtered = q ? items.filter((it) => it.name.toLowerCase().includes(q)) : items;

  if (filtered.length === 0) {
    return (
      <div className="py-6 text-center text-xs text-gray-500">
        Tidak ada ikon yang cocok dengan &ldquo;{query}&rdquo;.
      </div>
    );
  }

  return (
    <ul className="flex flex-wrap gap-2.5 p-0 m-0 list-none">
      {filtered.map((item) => {
        const IconComp = item.Icon;
        return (
          <li key={item.name}>
            <button
              type="button"
              onClick={() => onCopy(item.copyText, item.name)}
              title={`Klik untuk menyalin ${item.copyText}`}
              className="group relative w-[96px] h-[96px] rounded-lg border border-gray-300 bg-white hover:bg-gray-900 hover:border-gray-900 hover:shadow-md text-gray-800 hover:text-white flex flex-col items-center justify-center p-2 cursor-pointer transition-colors duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            >
              {item.flagCode ? (
                renderSvgFlag(item.flagCode)
              ) : item.emoji ? (
                <span className="text-2xl leading-none select-none transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-110">{item.emoji}</span>
              ) : IconComp ? (
                <IconComp
                  className={`w-6 h-6 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-110 ${
                    item.duotone ? 'fill-current/15' : item.filled ? 'fill-current/85' : ''
                  }`}
                  strokeWidth={item.strokeWidth ?? 1.85}
                />
              ) : null}

              {/* Quiet label underneath */}
              <span className="mt-2 text-[11px] text-gray-500 group-hover:text-gray-300 truncate max-w-[82px] font-mono">
                {item.name}
              </span>

              {/* Multimedia signature blue hover tooltip */}
              <span className="pointer-events-none opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] absolute -top-2.5 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-mono px-2 py-0.5 rounded shadow-sm whitespace-nowrap z-10">
                Salin
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export const IconFontsSection: React.FC = () => {
  const { triggerToast } = useApp();
  const [iconQuery, setIconQuery] = useState('');

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard?.writeText(text);
    triggerToast('Disalin', `Ikon ${label} (${text}) disalin ke papan klip.`, 'success');
  };

  return (
    <UiDocPage
      title="Icon Fonts"
      description="Klik ubin ikon mana saja untuk menyalin nama atau sintaks kelasnya."
      subLinks={[
        { id: 'icon-monochrome', label: 'Monochrome' },
        { id: 'icon-dripicons', label: 'Dripicons' },
        { id: 'icon-material', label: 'Material Icons' },
        { id: 'icon-feather', label: 'Feathericons' },
        { id: 'icon-fontawesome', label: 'Fontawesome' },
        { id: 'icon-remix', label: 'Remix Icons' },
        { id: 'icon-lineawesome', label: 'Line Awesome Icons' },
        { id: 'icon-flags', label: 'Flag Icons' },
        { id: 'icon-emoji', label: 'Emoji' },
        { id: 'icon-bootstrap', label: 'Bootstrap Icon' },
      ]}
    >
      {/* Search bar across all icon sets */}
      <div className="flex items-center justify-end gap-2">
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-gray-500 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={iconQuery}
            onChange={(e) => setIconQuery(e.target.value)}
            placeholder="Cari nama ikon..."
            className="pl-8 pr-3 py-1.5 text-xs border border-gray-300 rounded-lg bg-white text-gray-800 placeholder:text-gray-500 focus:outline-none focus:border-primary-500 w-56"
          />
        </div>
        {iconQuery && (
          <button
            type="button"
            onClick={() => setIconQuery('')}
            className="text-xs px-2.5 py-1.5 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 cursor-pointer"
          >
            Reset
          </button>
        )}
      </div>

      {/* 0. Monochrome Icons */}
      <UiDocSection
        id="icon-monochrome"
        title="Monochrome Icons"
        classesHint="uim uim-[icon-name] text-gray-800 fill-current/15"
        codeSnippet={`import React from 'react';\n\nconst MonochromeIcon = () => {\n  return <i className="uim uim-house-user text-gray-800" />;\n};\n\nexport default MonochromeIcon;`}
      >
        <IconTileGrid items={MONOCHROME_ICONS} onCopy={handleCopy} query={iconQuery} />
      </UiDocSection>

      {/* 1. Dripicons */}
      <UiDocSection
        id="icon-dripicons"
        title="Dripicons"
        classesHint="dripicons dripicons-[icon-name]"
        codeSnippet={`import React from 'react';\n\nconst Dripicons = () => {\n  return <i className="dripicons dripicons-alarm" />;\n};\n\nexport default Dripicons;`}
      >
        <IconTileGrid items={DRIPICONS_LIST} onCopy={handleCopy} query={iconQuery} />
      </UiDocSection>

      {/* 2. Material Icons */}
      <UiDocSection
        id="icon-material"
        title="Material Icons"
        classesHint="material-icons"
        codeSnippet={`<i className="material-icons">account_circle</i>\n<i className="material-icons">assignment_turned_in</i>`}
      >
        <IconTileGrid items={MATERIAL_ICONS_LIST} onCopy={handleCopy} query={iconQuery} />
      </UiDocSection>

      {/* 3. Feathericons */}
      <UiDocSection
        id="icon-feather"
        title="Feathericons"
        classesHint="feather w-6 h-6 text-gray-800"
        codeSnippet={`import { Activity, Airplay, Award } from 'lucide-react';\n\n<Activity className="w-5 h-5 text-gray-800" />`}
      >
        <IconTileGrid items={FEATHER_ICONS_LIST} onCopy={handleCopy} query={iconQuery} />
      </UiDocSection>

      {/* 4. Fontawesome */}
      <UiDocSection
        id="icon-fontawesome"
        title="Fontawesome"
        classesHint="fa fa-[icon-name]"
        codeSnippet={`import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';\n\n<FontAwesomeIcon icon={faBell} size="lg" />`}
      >
        <IconTileGrid items={FONTAWESOME_ICONS_LIST} onCopy={handleCopy} query={iconQuery} />
      </UiDocSection>

      {/* 5. Remix Icons */}
      <UiDocSection
        id="icon-remix"
        title="Remix Icons"
        classesHint="ti-[icon-name] / ri-[icon-name]"
        codeSnippet={`<i className="ti-arrow-up" />\n<i className="ti-fullscreen" />`}
      >
        <IconTileGrid items={REMIX_ICONS_LIST} onCopy={handleCopy} query={iconQuery} />
      </UiDocSection>

      {/* 6. Line Awesome Icons */}
      <UiDocSection
        id="icon-lineawesome"
        title="Line Awesome Icons"
        classesHint="las la-[icon-name]"
        codeSnippet={`<i className="las la-battery-three-quarters" />\n<i className="las la-sync" />`}
      >
        <IconTileGrid items={LINE_AWESOME_LIST} onCopy={handleCopy} query={iconQuery} />
      </UiDocSection>

      {/* 7. Flag Icons */}
      <UiDocSection
        id="icon-flags"
        title="Flag Icons"
        classesHint="flag-icon flag-icon-[code]"
        codeSnippet={`<i className="flag-icon flag-icon-id" />\n<i className="flag-icon flag-icon-us" />`}
      >
        <IconTileGrid items={FLAG_ICONS_LIST} onCopy={handleCopy} query={iconQuery} />
      </UiDocSection>

      {/* 8. Emoji */}
      <UiDocSection
        id="icon-emoji"
        title="Emoji"
        classesHint="em em-[name]"
        codeSnippet={`<i className="em em---1" />\n<i className="em em-100" />`}
      >
        <IconTileGrid items={EMOJI_ICONS_LIST} onCopy={handleCopy} query={iconQuery} />
      </UiDocSection>

      {/* 9. Bootstrap Icon */}
      <UiDocSection
        id="icon-bootstrap"
        title="Bootstrap Icon"
        classesHint="bi bi-[icon-name]"
        codeSnippet={`<i className="bi bi-alarm-fill" />\n<i className="bi bi-app-indicator" />`}
      >
        <IconTileGrid items={BOOTSTRAP_ICONS_LIST} onCopy={handleCopy} query={iconQuery} />
      </UiDocSection>
    </UiDocPage>
  );
};
