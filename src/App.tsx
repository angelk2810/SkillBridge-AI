import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { ToastContainer } from './components/ToastContainer';
import { ExplainableModal } from './components/ExplainableModal';
import { PresentationGuide } from './components/PresentationGuide';

// Views
import { LandingPage } from './views/LandingPage';
import { StudentDashboard } from './views/StudentDashboard';
import { StudentOnboarding } from './views/StudentOnboarding';
import { SkillGapPage } from './views/SkillGapPage';
import { JobMatchingPage } from './views/JobMatchingPage';
import { CareerRoadmapPage } from './views/CareerRoadmapPage';
import { ResumeAnalyzerPage } from './views/ResumeAnalyzerPage';
import { CareerAIChat } from './views/CareerAIChat';
import { CareerProgressPage } from './views/CareerProgressPage';
import { InstitutionInsightsPage } from './views/InstitutionInsightsPage';
import { MapPage } from './views/MapPage';

const AppContent: React.FC = () => {
  const { currentView } = useApp();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const renderActiveView = () => {
    switch (currentView) {
      case 'landing':
        return <LandingPage />;
      case 'dashboard':
        return <StudentDashboard />;
      case 'onboarding':
        return <StudentOnboarding />;
      case 'skill-gap':
        return <SkillGapPage />;
      case 'job-matches':
        return <JobMatchingPage />;
      case 'roadmap':
        return <CareerRoadmapPage />;
      case 'resume-analyzer':
        return <ResumeAnalyzerPage />;
      case 'career-ai':
        return <CareerAIChat />;
      case 'progress':
        return <CareerProgressPage />;
      case 'institution-insights':
        return <InstitutionInsightsPage />;
      case 'map':
        return <MapPage />;
      default:
        return <StudentDashboard />;
    }
  };

  const isLanding = currentView === 'landing';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar onToggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)} />

      {/* Presentation Evaluator Guided Tour Overlay */}
      <PresentationGuide />

      {/* App Workspace Layout */}
      {isLanding ? (
        <main className="flex-1 w-full">{renderActiveView()}</main>
      ) : (
        <div className="flex-1 flex w-full relative">
          {/* Bento Navigation Sidebar */}
          <Sidebar
            isOpenMobile={mobileSidebarOpen}
            onCloseMobile={() => setMobileSidebarOpen(false)}
          />

          {/* Main Content Area */}
          <main className="flex-1 min-w-0 w-full lg:pl-72 py-2 overflow-x-hidden">
            {renderActiveView()}
          </main>
        </div>
      )}

      {/* Global Interactive Modals & Toast Alerts */}
      <ExplainableModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
