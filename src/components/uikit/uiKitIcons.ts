import React from 'react';
import {
  LayoutGrid,
  Layers,
  SlidersHorizontal,
  BellRing,
  Table2,
  BarChart2,
  MapPin,
  Compass,
  Sparkles,
  LayoutTemplate,
  ShieldCheck,
  Smartphone,
} from 'lucide-react';

export const UI_KIT_CATEGORY_ICONS: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  utilities: LayoutGrid,
  datadisplay: Layers,
  dataentry: SlidersHorizontal,
  feedback: BellRing,
  tables: Table2,
  charts: BarChart2,
  maps: MapPin,
  navigation: Compass,
  behavioral: Sparkles,
  layout: LayoutTemplate,
  authstate: ShieldCheck,
  mobilekit: Smartphone,
};

export function getUiKitCategoryIcon(groupId: string) {
  return UI_KIT_CATEGORY_ICONS[groupId] || Layers;
}
