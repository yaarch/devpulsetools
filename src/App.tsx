import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { ToastContainer } from './components/layout/ToastContainer';
import { GlobalSearchModal } from './components/layout/GlobalSearchModal';
import { Hero } from './components/home/Hero';
import { ToolGrid } from './components/home/ToolGrid';
import { EducationPromo } from './components/home/EducationPromo';
import { PopularTools } from './components/home/PopularTools';
import { RecentTools } from './components/home/RecentTools';
import { ToolView } from './components/tools/ToolView';
import { AllToolsPage } from './components/tools/AllToolsPage';
import { RealEstatePage } from './components/tools/RealEstatePage';
import { NotFoundPage } from './components/static/NotFoundPage';
import { StaticPages } from './components/static/StaticPages';
import { SEOHead } from './components/seo/SEOHead';
import { OfflineIndicator } from './components/pwa/OfflineIndicator';

const MainApp: React.FC = () => {
  const { activePage } = useApp();

  // Scroll to top on page navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);

  const renderActiveView = () => {
    switch (activePage.type) {
      case 'home':
        return (
          <>
            <Hero />
            <RecentTools />
            <PopularTools />
            <div id="tool-grid">
              <ToolGrid />
            </div>
            <EducationPromo />
          </>
        );

      case 'tools':
        return <AllToolsPage />;

      case 'real-estate':
        return <RealEstatePage />;

      case 'tool':
        return <ToolView toolId={activePage.toolId} />;

      case 'not-found':
        return <NotFoundPage />;

      case 'about':
      case 'privacy':
      case 'terms':
      case 'contact':
        return <StaticPages pageType={activePage.type} />;

      default:
        return (
          <>
            <Hero />
            <RecentTools />
            <PopularTools />
            <div id="tool-grid">
              <ToolGrid />
            </div>
            <EducationPromo />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-indigo-500 selection:text-white transition-colors duration-200">
      <SEOHead />
      <Header />
      <main className="flex-1 w-full pb-16">
        {renderActiveView()}
      </main>
      <Footer />
      <ToastContainer />
      <GlobalSearchModal />
      <OfflineIndicator />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
