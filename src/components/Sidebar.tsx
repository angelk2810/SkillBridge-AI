import React from 'react';
import { useApp, AppView } from '../context/AppContext';
import {
  LayoutDashboard,
  UserCheck,
  Compass,
  Briefcase,
  Milestone,
  FileText,
  Bot,
  TrendingUp,
  Building2,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  HelpCircle,
  Home
} from 'lucide-react';

interface SidebarProps {
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpenMobile, onCloseMobile }) => {
  const { currentView, setCurrentView, studentProfile, readinessScore, setIsScoreBreakdownOpen } = useApp();

  const navigationItems: { id: AppView; label: string; icon: React.FC<{ className?: string }>; badge?: string; desc: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, desc: 'Overview & Readiness Score' },
    { id: 'onboarding', label: 'My Profile & Skills', icon: UserCheck, desc: 'Trades, Skills & Interests' },
    { id: 'skill-gap', label: 'Skill Gap Analysis', icon: Compass, badge: 'AI Engine', desc: 'Industry Benchmarks' },
    { id: 'job-matches', label: 'Job Matching', icon: Briefcase, badge: 'Smart Match', desc: 'Curated Opportunities' },
    { id: 'roadmap', label: 'Career Roadmap', icon: Milestone, badge: '4 Phases', desc: 'Actionable Upskilling' },
    { id: 'resume-analyzer', label: 'AI Resume Analyzer', icon: FileText, desc: 'ATS Keyword Match' },
    { id: 'career-ai', label: 'CareerAI Assistant', icon: Bot, badge: 'Live AI', desc: 'Vocational Career Mentor' },
    { id: 'progress', label: 'Career Progress', icon: TrendingUp, desc: 'Milestones & Badges' },
    { id: 'institution-insights', label: 'Institution Insights', icon: Building2, desc: 'ITI Analytics Dashboard' }
  ];

  const handleNavClick = (view: AppView) => {
    setCurrentView(view);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar container */}
      <aside
        id="app-sidebar"
        className={`fixed top-0 bottom-0 left-0 z-40 w-72 bg-white border-r border-slate-200/90 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top Header inside sidebar */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <button
            onClick={() => handleNavClick('landing')}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-sm shadow-indigo-500/20">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-slate-900 text-sm tracking-tight">SkillBridge AI</span>
              <p className="text-[10px] text-slate-500 font-mono">v1.0 (Demo Prototype)</p>
            </div>
          </button>

          <button
            onClick={() => handleNavClick('landing')}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 text-xs flex items-center gap-1 transition-colors"
            title="Go to Landing Page"
          >
            <Home className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Student Intelligence
          </div>

          {navigationItems.map(item => {
            const Icon = item.icon;
            const isActive = currentView === item.id;

            return (
              <button
                key={item.id}
                id={`sidebar-nav-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-all group ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-700 font-bold border border-indigo-100/80 shadow-2xs'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'}`} />
                  <div className="truncate">
                    <div className="leading-tight">{item.label}</div>
                  </div>
                </div>

                {item.badge && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-mono shrink-0 ml-2 ${
                      isActive
                        ? 'bg-indigo-100/80 text-indigo-800 font-bold'
                        : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200/70 group-hover:text-slate-700'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Bottom Profile & Readiness summary widget */}
        <div className="p-3.5 border-t border-slate-100 bg-slate-50/60">
          <div className="bg-white rounded-xl border border-slate-200 p-3 shadow-xs">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <img
                  src={studentProfile.avatarUrl}
                  alt={studentProfile.name}
                  className="w-8 h-8 rounded-full object-cover border border-slate-200 shrink-0"
                />
                <div className="min-w-0">
                  <div className="text-xs font-bold text-slate-900 truncate">{studentProfile.name}</div>
                  <div className="text-[10px] text-slate-500 truncate">{studentProfile.itiTrade.split(' ')[0]}</div>
                </div>
              </div>

              {/* Mini Readiness Score */}
              <button
                onClick={() => setIsScoreBreakdownOpen(true)}
                className="flex flex-col items-end shrink-0 text-right group"
                title="Click to view readiness breakdown"
              >
                <span className="text-[10px] text-slate-400 group-hover:text-indigo-600 font-medium">Score</span>
                <span className="text-xs font-extrabold text-slate-900 group-hover:text-indigo-600">
                  {readinessScore.overallScore}<span className="text-[10px] text-slate-400 font-normal">/100</span>
                </span>
              </button>
            </div>

            {/* Target Role preview pill */}
            <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px]">
              <span className="text-slate-500 truncate">Target: {studentProfile.targetRole}</span>
              <button
                onClick={() => handleNavClick('onboarding')}
                className="text-indigo-600 hover:text-indigo-800 font-semibold shrink-0"
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
