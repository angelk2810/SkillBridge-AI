import React from 'react';
import { useApp } from '../context/AppContext';
import {
  TrendingUp,
  Award,
  CheckCircle2,
  Calendar,
  Clock,
  Sparkles,
  ShieldCheck,
  Download,
  Share2,
  Milestone,
  ArrowRight,
  BookOpen
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';

export const CareerProgressPage: React.FC = () => {
  const {
    studentProfile,
    readinessScore,
    roadmap,
    setCurrentView,
    addToast
  } = useApp();

  // Simulated Score Progression over Weeks
  const scoreProgressionData = [
    { week: 'W1 (Enrollment)', score: 48 },
    { week: 'W2 (Assessment)', score: 55 },
    { week: 'W4 (Phase 1 Start)', score: 62 },
    { week: 'W6 (Skills Added)', score: 68 },
    { week: 'Current Status', score: readinessScore.overallScore },
    { week: 'Projected', score: roadmap.projectedReadiness }
  ];

  const badges = [
    {
      id: 1,
      title: 'NCVT Trade Certified',
      desc: `Verified graduate in ${studentProfile.itiTrade.split(' ')[0]} trade.`,
      icon: Award,
      earned: true,
      color: 'bg-emerald-500 text-white'
    },
    {
      id: 2,
      title: 'Skill Matrix Complete',
      desc: 'Completed comprehensive 5-step vocational competency assessment.',
      icon: ShieldCheck,
      earned: true,
      color: 'bg-indigo-600 text-white'
    },
    {
      id: 3,
      title: 'Roadmap Explorer',
      desc: 'Completed active learning milestones on personal career roadmap.',
      icon: Milestone,
      earned: (studentProfile.completedRoadmapTaskIds || []).length > 0,
      color: 'bg-amber-500 text-white'
    },
    {
      id: 4,
      title: 'ATS-Optimized Resume',
      desc: 'Tested and aligned keywords with industry employer expectations.',
      icon: Sparkles,
      earned: true,
      color: 'bg-blue-600 text-white'
    }
  ];

  const handleSharePassport = () => {
    addToast({
      type: 'success',
      title: 'Career Passport Copied! 📋',
      message: 'Shareable verification link copied to clipboard.'
    });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-2">
              <TrendingUp className="w-3.5 h-3.5" />
              Career Progress & Milestones
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Competency Growth & Career Passport
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Track your readiness velocity, earned vocational badges, and verified progress milestones.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSharePassport}
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share Career Passport</span>
            </button>
          </div>
        </div>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-100">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-xs text-slate-500 font-medium">Current Readiness Index</span>
            <div className="text-3xl font-extrabold text-indigo-600 mt-1">
              {readinessScore.overallScore} <span className="text-xs font-normal text-slate-400">/ 100</span>
            </div>
            <span className="text-[11px] text-slate-500 font-semibold">{readinessScore.readinessBand}</span>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-xs text-slate-500 font-medium">Roadmap Completion</span>
            <div className="text-3xl font-extrabold text-slate-900 mt-1">
              {roadmap.completionPercentage}%
            </div>
            <span className="text-[11px] text-slate-500">
              {roadmap.completedTaskCount} of {roadmap.totalTaskCount} tasks verified
            </span>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-xs text-slate-500 font-medium">Verified Skills Inventory</span>
            <div className="text-3xl font-extrabold text-emerald-600 mt-1">
              {studentProfile.skills.length}
            </div>
            <span className="text-[11px] text-slate-500">Across IT & Technical trades</span>
          </div>
        </div>
      </div>

      {/* Historical Score Progression Chart */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Readiness Score Velocity Trend
            </h3>
            <p className="text-xs text-slate-500">
              Showing measured score gain as upskilling tasks and certifications are completed.
            </p>
          </div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
            +24 Pts Growth
          </span>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={scoreProgressionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="week" tick={{ fill: '#64748b', fontSize: 11 }} />
              <YAxis domain={[40, 100]} tick={{ fill: '#64748b', fontSize: 11 }} />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-slate-900 text-white p-2.5 rounded-xl text-xs shadow-xl">
                        <p className="font-bold">{payload[0].payload.week}</p>
                        <p className="text-indigo-300 font-bold mt-0.5">Readiness Score: {payload[0].value} / 100</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#4f46e5"
                strokeWidth={3}
                dot={{ fill: '#4f46e5', r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Badges & Credential Showcase */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Award className="w-4 h-4 text-indigo-600" />
              Earned Vocational Badges & Credentials
            </h3>
            <p className="text-xs text-slate-500">
              Verified digital credentials recognized by SkillBridge recruiting partners.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {badges.map(b => {
            const BadgeIcon = b.icon;
            return (
              <div
                key={b.id}
                className={`p-5 rounded-2xl border transition-all text-left flex flex-col justify-between ${
                  b.earned ? 'bg-slate-50 border-slate-200' : 'bg-slate-50/40 border-slate-100 opacity-60'
                }`}
              >
                <div>
                  <div className={`w-10 h-10 rounded-xl ${b.color} flex items-center justify-center shadow-xs mb-3`}>
                    <BadgeIcon className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">{b.title}</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-normal">{b.desc}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
                  <span className={`font-bold ${b.earned ? 'text-emerald-700' : 'text-slate-400'}`}>
                    {b.earned ? 'Verified Badge ✓' : 'In Progress'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
