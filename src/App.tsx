import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { SearchModal } from './components/SearchModal';

// Views
import { HomeView } from './views/HomeView';
import { GettingStartedView } from './views/GettingStartedView';
import { ArchitectureView } from './views/ArchitectureView';
import { DataView } from './views/DataView';
import { BrandSelectionView } from './views/BrandSelectionView';
import { HeadlineMetricsView } from './views/HeadlineMetricsView';
import { PhasesView } from './views/PhasesView';
import { IntentClassificationView } from './views/IntentClassificationView';
import { RetrievalView } from './views/RetrievalView';
import { ReplyGenerationView } from './views/ReplyGenerationView';
import { EscalationView } from './views/EscalationView';
import { EvaluationView } from './views/EvaluationView';
import { DecisionLogView } from './views/DecisionLogView';
import { ProjectStructureView } from './views/ProjectStructureView';
import { DeveloperGuideView } from './views/DeveloperGuideView';
import { FaqGlossaryView } from './views/FaqGlossaryView';
import { InteractiveAgentSimulator } from './components/InteractiveAgentSimulator';

export const App: React.FC = () => {
  // Theme state: fixed to light to keep background white as requested
  const [theme, setTheme] = useState<'light'>('light');

  // Current navigation path
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.hash.replace('#', '') || '/';
  });

  // Search modal state
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Mobile menu open state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Ensure root HTML stays light with white background
  useEffect(() => {
    localStorage.setItem('hiver_doc_theme', 'light');
    const root = document.documentElement;
    root.classList.remove('dark');
  }, []);

  // Global Ctrl/Cmd + K shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Sync hash routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') || '/';
      setCurrentPath(hash);
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (path: string) => {
    window.location.hash = path;
    setCurrentPath(path);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Route dispatcher
  const renderCurrentView = () => {
    if (currentPath === '/' || currentPath === '') {
      return <HomeView onNavigate={navigateTo} />;
    }

    if (currentPath === '/docs/getting-started') {
      return <GettingStartedView onNavigate={navigateTo} />;
    }

    if (currentPath === '/docs/architecture') {
      return <ArchitectureView onNavigate={navigateTo} />;
    }

    if (currentPath === '/docs/data') {
      return <DataView onNavigate={navigateTo} />;
    }

    if (currentPath === '/docs/brand-selection') {
      return <BrandSelectionView onNavigate={navigateTo} />;
    }

    if (currentPath === '/docs/headline-metrics') {
      return <HeadlineMetricsView onNavigate={navigateTo} />;
    }

    // Phases list & Phase details
    if (currentPath === '/docs/phases') {
      return <PhasesView onNavigate={navigateTo} />;
    }
    if (currentPath.startsWith('/docs/phases/')) {
      const phaseNum = currentPath.replace('/docs/phases/', '');
      return <PhasesView phaseId={phaseNum} onNavigate={navigateTo} />;
    }

    // Agent Components
    if (currentPath === '/docs/components/intent-classification') {
      return <IntentClassificationView onNavigate={navigateTo} />;
    }
    if (currentPath === '/docs/components/retrieval') {
      return <RetrievalView onNavigate={navigateTo} />;
    }
    if (currentPath === '/docs/components/reply-generation') {
      return <ReplyGenerationView onNavigate={navigateTo} />;
    }
    if (currentPath === '/docs/components/escalation') {
      return <EscalationView onNavigate={navigateTo} />;
    }
    if (currentPath === '/docs/components/sandbox') {
      return (
        <div className="space-y-6">
          <div className="border-b border-slate-200  pb-4">
            <h1 className="text-3xl font-extrabold text-slate-900  tracking-tight">
              Interactive Agent Sandbox
            </h1>
            <p className="text-sm text-slate-600  mt-2">
              Simulate live customer queries and inspect intent routing, vector similarity scores, and deterministic safety decisions in real time.
            </p>
          </div>
          <InteractiveAgentSimulator />
        </div>
      );
    }

    // Evaluation sub-pages
    if (currentPath.startsWith('/docs/evaluation')) {
      const sub = currentPath.replace('/docs/evaluation/', '') as any;
      return <EvaluationView subPage={sub} onNavigate={navigateTo} />;
    }

    // Developer Guide sub-pages
    if (currentPath === '/docs/developer/configuration') {
      return <DeveloperGuideView guideType="configuration" onNavigate={navigateTo} />;
    }
    if (currentPath === '/docs/developer/run-agent') {
      return <DeveloperGuideView guideType="run-agent" onNavigate={navigateTo} />;
    }
    if (currentPath === '/docs/developer/testing') {
      return <DeveloperGuideView guideType="testing" onNavigate={navigateTo} />;
    }
    if (currentPath === '/docs/developer/troubleshooting') {
      return <DeveloperGuideView guideType="troubleshooting" onNavigate={navigateTo} />;
    }
    if (currentPath === '/docs/developer/reproducibility') {
      return <DeveloperGuideView guideType="reproducibility" onNavigate={navigateTo} />;
    }
    if (currentPath === '/docs/developer/project-structure') {
      return <ProjectStructureView onNavigate={navigateTo} />;
    }
    if (currentPath === '/docs/developer/modifying') {
      return <DeveloperGuideView guideType="modifying" onNavigate={navigateTo} />;
    }

    // Reference
    if (currentPath === '/docs/reference/decision-log') {
      return <DecisionLogView onNavigate={navigateTo} />;
    }
    if (currentPath === '/docs/reference/faq') {
      return <FaqGlossaryView mode="faq" onNavigate={navigateTo} />;
    }
    if (currentPath === '/docs/reference/glossary') {
      return <FaqGlossaryView mode="glossary" onNavigate={navigateTo} />;
    }

    // Default fallback
    return <HomeView onNavigate={navigateTo} />;
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Top sticky navigation header */}
      <Header
        theme={theme}
        onThemeChange={setTheme}
        onOpenSearch={() => setIsSearchOpen(true)}
        mobileMenuOpen={mobileMenuOpen}
        onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
        onNavigate={navigateTo}
      />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto flex">
        {/* Left Sidebar */}
        <Sidebar
          currentPath={currentPath}
          onNavigate={navigateTo}
          mobileMenuOpen={mobileMenuOpen}
          onCloseMobileMenu={() => setMobileMenuOpen(false)}
        />

        {/* Content Area */}
        <main className="flex-1 min-w-0 px-4 sm:px-6 lg:px-10 py-8 lg:py-10">
          {renderCurrentView()}
        </main>
      </div>

      {/* Global Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={navigateTo}
      />
    </div>
  );
};

export default App;
