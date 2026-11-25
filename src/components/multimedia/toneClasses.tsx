import React from 'react';
import {
  AlertTriangle,
  Boxes,
  CheckCircle2,
  Clapperboard,
  ClipboardCheck,
  Clock,
  Compass,
  Database,
  DoorOpen,
  FileCheck,
  FileText,
  GraduationCap,
  Hand,
  Headset,
  Heart,
  HeartHandshake,
  Laptop,
  Megaphone,
  MessageSquare,
  Monitor,
  Move,
  Package,
  Plug,
  Radio,
  RotateCcw,
  Scale,
  ShieldCheck,
  Shirt,
  ShoppingCart,
  Sliders,
  Sparkles,
  Sprout,
  TrendingUp,
  Type,
  UserCheck,
  Video,
  Camera,
  Wrench,
} from 'lucide-react';
import { ContentCalloutTone, Gms2WiPrItem, PillarItem, RuleItem, SopModuleItem } from '../../types';

export function getBadgeToneClass(tone: string): string {
  switch (tone) {
    case 'brand':
      return 'bg-[#FEF1F5] dark:bg-[#ee2e65]/20 text-[#9D113C] dark:text-[#f895b5] border-[#FBC2D4] dark:border-[#ee2e65]/35';
    case 'blue':
      return 'bg-blue-50 dark:bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-500/30';
    case 'indigo':
      return 'bg-indigo-50 dark:bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-500/30';
    case 'purple':
      return 'bg-purple-50 dark:bg-purple-500/15 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-500/30';
    case 'emerald':
    case 'teal':
    case 'lime':
      return 'bg-emerald-50 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-500/30';
    case 'amber':
      return 'bg-amber-50 dark:bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-500/30';
    case 'red':
      return 'bg-rose-50 dark:bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-500/30';
    case 'sky':
      return 'bg-sky-50 dark:bg-sky-500/15 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-500/30';
    default:
      return 'bg-gray-100 dark:bg-white/[0.08] text-gray-700 dark:text-gray-300 border-gray-200 dark:border-white/[0.12]';
  }
}

export function getIconBoxToneClass(tone: string): string {
  switch (tone) {
    case 'brand':
      return 'bg-[#FEF1F5] dark:bg-[#ee2e65]/20 text-[#ee2e65] dark:text-[#f895b5] border-[#FBC2D4] dark:border-[#ee2e65]/30';
    case 'blue':
    case 'sky':
      return 'bg-blue-50 dark:bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-500/30';
    case 'indigo':
      return 'bg-indigo-50 dark:bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-500/30';
    case 'purple':
      return 'bg-purple-50 dark:bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-500/30';
    case 'emerald':
    case 'teal':
    case 'lime':
      return 'bg-emerald-50 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/30';
    case 'amber':
      return 'bg-amber-50 dark:bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-500/30';
    case 'red':
      return 'bg-rose-50 dark:bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-500/30';
    default:
      return 'bg-gray-100 dark:bg-white/[0.08] text-gray-600 dark:text-gray-300 border-gray-200 dark:border-white/[0.12]';
  }
}

export function getCalloutToneClass(tone: ContentCalloutTone): {
  wrapper: string;
  title: string;
} {
  switch (tone) {
    case 'brand':
      return {
        wrapper:
          'bg-[#FEF1F5]/70 dark:bg-[#ee2e65]/12 border-[#FBC2D4] dark:border-[#ee2e65]/30',
        title: 'text-[#9D113C] dark:text-[#f895b5]',
      };
    case 'info':
      return {
        wrapper:
          'bg-blue-50/80 dark:bg-blue-500/12 border-blue-200 dark:border-blue-500/30',
        title: 'text-blue-700 dark:text-blue-300',
      };
    case 'amber':
      return {
        wrapper:
          'bg-amber-50/80 dark:bg-amber-500/12 border-amber-200 dark:border-amber-500/30',
        title: 'text-amber-700 dark:text-amber-300',
      };
    case 'orange':
      return {
        wrapper:
          'bg-orange-50/80 dark:bg-orange-500/12 border-orange-200 dark:border-orange-500/30',
        title: 'text-orange-700 dark:text-orange-300',
      };
    case 'red':
      return {
        wrapper:
          'bg-rose-50/80 dark:bg-rose-500/12 border-rose-200 dark:border-rose-500/30',
        title: 'text-rose-700 dark:text-rose-300',
      };
    case 'emerald':
      return {
        wrapper:
          'bg-emerald-50/80 dark:bg-emerald-500/12 border-emerald-200 dark:border-emerald-500/30',
        title: 'text-emerald-700 dark:text-emerald-300',
      };
    case 'purple':
      return {
        wrapper:
          'bg-purple-50/80 dark:bg-purple-500/12 border-purple-200 dark:border-purple-500/30',
        title: 'text-purple-700 dark:text-purple-300',
      };
    case 'indigo':
      return {
        wrapper:
          'bg-indigo-50/80 dark:bg-indigo-500/12 border-indigo-200 dark:border-indigo-500/30',
        title: 'text-indigo-700 dark:text-indigo-300',
      };
    default:
      return {
        wrapper:
          'bg-[#F9FAFC] dark:bg-[#1B1E24] border-black/[0.08] dark:border-white/[0.10]',
        title: 'text-gray-800 dark:text-gray-200',
      };
  }
}

export function renderPillarIcon(key: PillarItem['iconKey'], className = 'w-4 h-4'): React.ReactNode {
  switch (key) {
    case 'shield':
      return <ShieldCheck className={className} />;
    case 'wrench':
      return <Wrench className={className} />;
    case 'graduation':
      return <GraduationCap className={className} />;
    case 'heart':
      return <Heart className={className} />;
    case 'sprout':
      return <Sprout className={className} />;
  }
}

export function renderRuleIcon(key: RuleItem['iconKey'], className = 'w-4 h-4'): React.ReactNode {
  switch (key) {
    case 'clock':
      return <Clock className={className} />;
    case 'shirt':
      return <Shirt className={className} />;
    case 'headset':
      return <Headset className={className} />;
    case 'clipboard':
      return <ClipboardCheck className={className} />;
    case 'scale':
      return <Scale className={className} />;
    case 'stairs':
      return <TrendingUp className={className} />;
    case 'comments':
      return <MessageSquare className={className} />;
    case 'heartHand':
      return <HeartHandshake className={className} />;
    default:
      return <FileText className={className} />;
  }
}

export function renderSopIcon(key: SopModuleItem['iconKey'], className = 'w-4 h-4'): React.ReactNode {
  switch (key) {
    case 'userTie':
      return <UserCheck className={className} />;
    case 'boxes':
      return <Boxes className={className} />;
    case 'clapperboard':
      return <Clapperboard className={className} />;
    case 'hand':
      return <Hand className={className} />;
    case 'sliders':
      return <Sliders className={className} />;
    case 'broadcast':
      return <Radio className={className} />;
    case 'display':
      return <Monitor className={className} />;
    case 'type':
      return <Type className={className} />;
    case 'fileSlides':
      return <FileText className={className} />;
    case 'sparkles':
      return <Sparkles className={className} />;
    case 'video':
      return <Video className={className} />;
    case 'cameraRotate':
      return <RotateCcw className={className} />;
    case 'camera':
      return <Camera className={className} />;
    case 'compass':
      return <Compass className={className} />;
    case 'track':
      return <CheckCircle2 className={className} />;
    case 'move':
      return <Move className={className} />;
    case 'tripod':
      return <Video className={className} />;
    case 'headset':
      return <Headset className={className} />;
    case 'door':
      return <DoorOpen className={className} />;
    case 'plug':
      return <Plug className={className} />;
    case 'shield':
      return <ShieldCheck className={className} />;
    case 'alert':
      return <AlertTriangle className={className} />;
    default:
      return <FileCheck className={className} />;
  }
}

export function renderWiPrIcon(key: Gms2WiPrItem['iconKey'], className = 'w-4 h-4'): React.ReactNode {
  switch (key) {
    case 'megaphone':
      return <Megaphone className={className} />;
    case 'database':
      return <Database className={className} />;
    case 'clipboardCheck':
      return <ClipboardCheck className={className} />;
    case 'package':
      return <Package className={className} />;
    case 'laptop':
      return <Laptop className={className} />;
    case 'cart':
      return <ShoppingCart className={className} />;
    case 'graduation':
      return <GraduationCap className={className} />;
    default:
      return <ShieldCheck className={className} />;
  }
}
