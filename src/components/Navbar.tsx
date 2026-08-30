import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Compass,
  Sparkles,
  Users,
  Bell,
  Menu,
  X,
  Target,
  ChevronDown,
  RefreshCw,
  Award,
  Layers,
  GraduationCap,
  Briefcase
} from 'lucide-react';

interface NavbarProps {
  onToggleMobileSidebar: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleMobileSidebar }) => {
  const {
    currentView,
    setCurrentView,
    studentProfile,
    allDemoProfiles,
    loadDemoProfile,
    allCareerRoles,
    changeTargetRole,
    setIsPresentationMode,
    setPresentationStep,
    readinessScore,
    resetToDefaultProfile
  } = useApp();

  const [isProfilesMenuOpen, setIsProfilesMenuOpen] = useState(false);
  const [isRoleMenuOpen, setIsRoleMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const notifications = [
    { id: 1, title: 'New Job Matches Available', desc: `3 new openings match your ${studentProfile.targetRole} profile.`, time: '10m ago' },
    { id: 2, title: 'Roadmap Milestone Recommended', desc: 'Complete Git & GitHub fundamentals to boost your readiness score +4%.', time: '1h ago' },
    { id: 3, title: 'Trade Benchmark Recalibrated', desc: 'Industry demand in your region increased by 14%.', time: '1d ago' }
  ];

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 lg:px-8 py-3 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Mobile hamburger + Brand logo */}
        <div className="flex items-center gap-3">
          <button
            id="mobile-sidebar-toggle-btn"
            onClick={onToggleMobileSidebar}
            className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 lg:hidden transition-colors"
            aria-label="Toggle Navigation Drawer"
          >
            <Menu className="w-5 h-5" />
          </button>

          <button
            id="brand-home-btn"
            onClick={() => setCurrentView('landing')}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-slate-900 tracking-tight text-base sm:text-lg">SkillBridge</span>
                <span className="px-1.5 py-0.2 rounded-md bg-indigo-100 text-indigo-700 text-[11px] font-bold tracking-wide">AI</span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium hidden sm:block">From Skills to Opportunities</p>
            </div>
          </button>
        </div>

        {/* Middle: Active Target Role Picker */}
        {currentView !== 'landing' && (
          <div className="hidden md:flex items-center gap-2">
            <div className="relative">
              <button
                id="target-role-dropdown-btn"
                onClick={() => {
                  setIsRoleMenuOpen(!isRoleMenuOpen);
                  setIsProfilesMenuOpen(false);
                }}
                className="flex items-center gap-2 px-3 py-1.5 bg-slate-100/90 hover:bg-slate-200/80 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 transition-colors"
              >
                <Target className="w-3.5 h-3.5 text-indigo-600" />
                <span className="text-slate-500 font-normal">Target Role:</span>
                <span className="font-bold text-slate-900 max-w-[160px] truncate">{studentProfile.targetRole}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              </button>

              {isRoleMenuOpen && (
                <div
                  id="target-role-dropdown-menu"
                  className="absolute left-0 mt-2 w-72 bg-white rounded-2xl border border-slate-200 shadow-xl p-2 z-50 animate-in fade-in slide-in-from-top-2"
                >
                  <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                    Switch Benchmark Target Role
                  </div>
                  <div className="max-h-64 overflow-y-auto py-1 space-y-0.5">
                    {allCareerRoles.map(r => (
                      <button
                        key={r.id}
                        onClick={() => {
                          changeTargetRole(r.title);
                          setIsRoleMenuOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors ${
                          studentProfile.targetRole === r.title
                            ? 'bg-indigo-50 text-indigo-900 font-bold'
                            : 'hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <span className="truncate">{r.title}</span>
                        <span className="text-[10px] text-slate-400 ml-2">{r.category}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Right Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Demo Profile Switcher */}
          <div className="relative">
            <button
              id="demo-profiles-dropdown-btn"
              onClick={() => {
                setIsProfilesMenuOpen(!isProfilesMenuOpen);
                setIsRoleMenuOpen(false);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 shadow-xs transition-colors"
            >
              <Users className="w-3.5 h-3.5 text-indigo-600" />
              <span className="hidden sm:inline">Profile:</span>
              <span className="font-bold text-slate-900 max-w-[100px] truncate">{studentProfile.name.split(' ')[0]}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {isProfilesMenuOpen && (
              <div
                id="demo-profiles-dropdown-menu"
                className="absolute right-0 mt-2 w-80 bg-white rounded-2xl border border-slate-200 shadow-xl p-3 z-50 animate-in fade-in slide-in-from-top-2"
              >
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                  <span className="text-xs font-bold text-slate-900">Switch ITI Demo Profile</span>
                  <button
                    onClick={() => {
                      resetToDefaultProfile();
                      setIsProfilesMenuOpen(false);
                    }}
                    className="text-[11px] text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1"
                  >
                    <RefreshCw className="w-3 h-3" /> Reset
                  </button>
                </div>
                <div className="max-h-72 overflow-y-auto space-y-1">
                  {allDemoProfiles.map(profile => (
                    <button
                      key={profile.id}
                      onClick={() => {
                        loadDemoProfile(profile.id);
                        setIsProfilesMenuOpen(false);
                      }}
                      className={`w-full text-left p-2 rounded-xl text-xs flex items-center gap-3 transition-colors ${
                        studentProfile.id === profile.id
                          ? 'bg-indigo-50 border border-indigo-100'
                          : 'hover:bg-slate-50 border border-transparent'
                      }`}
                    >
                      <img
                        src={profile.avatarUrl}
                        alt={profile.name}
                        className="w-8 h-8 rounded-full object-cover border border-slate-200"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-slate-900 truncate">{profile.name}</div>
                        <div className="text-[11px] text-slate-500 truncate">{profile.itiTrade}</div>
                        <div className="text-[10px] text-indigo-600 font-medium">Target: {profile.targetRole}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Presentation Tour Trigger */}
          <button
            id="navbar-evaluator-tour-btn"
            onClick={() => {
              setIsPresentationMode(true);
              setPresentationStep(0);
              setCurrentView('landing');
            }}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-xs transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Demo Tour</span>
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              id="notifications-toggle-btn"
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 relative transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-600 ring-2 ring-white" />
            </button>

            {isNotificationsOpen && (
              <div
                id="notifications-dropdown-menu"
                className="absolute right-0 mt-2 w-80 bg-white rounded-2xl border border-slate-200 shadow-xl p-3 z-50 animate-in fade-in slide-in-from-top-2"
              >
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                  <span className="text-xs font-bold text-slate-900">Notifications</span>
                  <span className="text-[10px] px-2 py-0.5 bg-indigo-50 text-indigo-700 font-semibold rounded-full">
                    3 New
                  </span>
                </div>
                <div className="space-y-2">
                  {notifications.map(n => (
                    <div key={n.id} className="p-2.5 rounded-xl bg-slate-50 hover:bg-indigo-50/50 border border-slate-100 transition-colors">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-xs text-slate-900">{n.title}</span>
                        <span className="text-[10px] text-slate-400">{n.time}</span>
                      </div>
                      <p className="text-[11px] text-slate-600 mt-1 leading-normal">{n.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
