import React from 'react';
import { MotionConfig, motion } from 'motion/react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { ToastContainer } from './components/ui/ToastContainer';
import { ModalsContainer } from './components/modals/ModalsContainer';
import { MobileBottomNav } from './components/layout/MobileBottomNav';
import { ElasticPullToRefresh } from './components/ui/ElasticPullToRefresh';
import { PageTransition } from './components/ui/PageTransition';
import { PageId } from './types';

// Multimedia Platform SPA Pages & UI Kit
import { MultimediaOverviewPage } from './components/pages/MultimediaOverviewPage';
import { OrgChartPage } from './components/pages/OrgChartPage';
import { PlatformGms2Page } from './components/pages/PlatformGms2Page';
import { UnifiedGuidePage } from './components/pages/UnifiedGuidePage';
import { PerintisanPage } from './components/pages/PerintisanPage';
import { QuickRefPage } from './components/pages/QuickRefPage';
import { UiKitPage } from './components/pages/UiKitPage';

interface MenuShellTint {
  light: string;
  dark: string;
}

const PAGE_SHELL_TINTS: Record<PageId, MenuShellTint> = {
  overview: { light: '#E6E0FF', dark: '#4C3F82' },
  orgchart: { light: '#FCE3EC', dark: '#73314B' },
  gms2: { light: '#DFEEFF', dark: '#2E4C73' },
  panduan: { light: '#DFF5EB', dark: '#285D49' },
  perintisan: { light: '#E7F4DF', dark: '#3A5C30' },
  quickref: { light: '#EDE3FE', dark: '#543978' },
  uikit: { light: '#FCE3EC', dark: '#73314B' },
};

const SHELL_TINT_MASK_LIGHT =
  'linear-gradient(135deg, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.22) 28%, rgba(0,0,0,0) 56%)';
const SHELL_TINT_MASK_DARK =
  'linear-gradient(135deg, rgba(0,0,0,0.42) 0%, rgba(0,0,0,0.14) 28%, rgba(0,0,0,0) 56%)';

function MainLayout() {
  const { activePage, prevPage, theme, triggerToast } = useApp();
  const shellTint = PAGE_SHELL_TINTS[activePage] || PAGE_SHELL_TINTS.orgchart;
  const activeTintColor = theme === 'dark' ? shellTint.dark : shellTint.light;
  const activeMask = theme === 'dark' ? SHELL_TINT_MASK_DARK : SHELL_TINT_MASK_LIGHT;

  const handleWorkspaceRefresh = async () => {
    triggerToast(
      'Data Disinkronkan',
      'Seluruh modul SOP V5, Platform GMS II, dan struktur organisasi terbaru.',
      'success'
    );
  };

  const renderActivePage = () => {
    switch (activePage) {
      case 'overview':
        return <MultimediaOverviewPage />;
      case 'orgchart':
        return <OrgChartPage />;
      case 'gms2':
        return <PlatformGms2Page />;
      case 'panduan':
        return <UnifiedGuidePage />;
      case 'perintisan':
        return <PerintisanPage />;
      case 'quickref':
        return <QuickRefPage />;
      case 'uikit':
        return <UiKitPage />;
      default:
        return <OrgChartPage />;
    }
  };

  return (
    <div className="min-h-screen md:h-screen md:overflow-hidden bg-[#E8E9F0] dark:bg-[#0B0D10] p-1 sm:p-1.5 md:p-2 font-sans text-[#1C1D21] dark:text-[#F3F4F6] flex items-stretch selection:bg-[#D6D4FF] selection:text-[#1C1D21] dark:selection:bg-[#C6F135]/30 dark:selection:text-white transition-colors duration-200">
      <div className="app-shell-container w-full md:h-full bg-white dark:bg-[#16191F] rounded-[20px] sm:rounded-[24px] md:rounded-[26px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] dark:shadow-[0_24px_70px_-15px_rgba(0,0,0,0.65)] border border-white/80 dark:border-white/[0.08] flex overflow-hidden relative min-w-0 min-h-0 transition-colors duration-200">
        <motion.div
          aria-hidden="true"
          animate={{ backgroundColor: activeTintColor }}
          transition={{ duration: 0.1, ease: [0.23, 1, 0.32, 1] }}
          style={{
            backgroundColor: activeTintColor,
            maskImage: activeMask,
            WebkitMaskImage: activeMask,
          }}
          className="pointer-events-none absolute inset-0 z-0"
        />

        <Sidebar />

        <main className="relative z-10 flex-1 bg-white dark:bg-[#121418] m-1 sm:m-1.5 rounded-[16px] sm:rounded-[22px] shadow-[0_2px_20px_rgba(0,0,0,0.02)] dark:shadow-none border border-black/[0.12] dark:border-white/[0.08] flex flex-col min-w-0 min-h-0 overflow-hidden pb-[calc(5.25rem+env(safe-area-inset-bottom,0px))] md:pb-0 transition-colors duration-200">
          <Header />

          <ElasticPullToRefresh onRefresh={handleWorkspaceRefresh}>
            <PageTransition activePage={activePage} prevPage={prevPage}>
              {activePage === 'uikit' ? (
                renderActivePage()
              ) : (
                <div className="flex-1 min-h-0 w-full overflow-y-auto custom-sidebar-scrollbar">
                  {renderActivePage()}
                </div>
              )}
            </PageTransition>
          </ElasticPullToRefresh>
        </main>
      </div>

      <MobileBottomNav />
      <ModalsContainer />
      <ToastContainer />
    </div>
  );
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <AppProvider>
        <MainLayout />
      </AppProvider>
    </MotionConfig>
  );
}
