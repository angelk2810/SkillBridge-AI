import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Compass,
  Briefcase,
  Milestone,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  HelpCircle,
  Clock,
  Send,
  Building2,
  Check,
  ChevronRight
} from 'lucide-react';
import { generateLocalAssistantResponse } from '../services/aiEngine';

export const StudentDashboard: React.FC = () => {
  const {
    studentProfile,
    readinessScore,
    skillGapAnalysis,
    jobMatches,
    roadmap,
    setCurrentView,
    setIsScoreBreakdownOpen,
    setActiveExplainJob,
    toggleRoadmapTask,
    addToast
  } = useApp();

  const [quickAiInput, setQuickAiInput] = useState('');
  const [quickAiReply, setQuickAiReply] = useState<string | null>(null);
  const [isAiReplying, setIsAiReplying] = useState(false);

  const topJobMatches = jobMatches.slice(0, 2);

  // Time-based greeting
  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) return 'Good morning';
    if (hours < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const handleQuickAiSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickAiInput.trim()) return;

    setIsAiReplying(true);
    setTimeout(() => {
      const reply = generateLocalAssistantResponse(quickAiInput, studentProfile);
      setQuickAiReply(reply.responseText);
      setIsAiReplying(false);
      setQuickAiInput('');
    }, 400);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Top Header Banner in Bento Style */}
      <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {getGreeting()}, {studentProfile.name.split(' ')[0]}
            </h1>
            <span className="bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full text-[11px] font-bold">
              Active Student
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Here is your personalized career readiness and upskilling overview.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-amber-100 text-amber-900 px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 border border-amber-200 shrink-0">
            <span>⚡</span>
            <span>DEMO PROFILE: ACTIVE</span>
          </div>

          <button
            onClick={() => setCurrentView('skill-gap')}
            className="hidden md:flex px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-colors items-center gap-1.5"
          >
            <Compass className="w-3.5 h-3.5 text-indigo-600" />
            <span>Full Gap Analysis</span>
          </button>
        </div>
      </header>

      {/* Main 12-Column Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Bento Tile 1: Readiness Score Circular Gauge (Col 4) */}
        <div className="col-span-12 lg:col-span-4 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col items-center justify-between text-center">
          <div className="w-full flex items-center justify-between mb-2">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Readiness Score
            </p>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700">
              Live AI Index
            </span>
          </div>

          {/* SVG Circular Progress Meter */}
          <div className="relative w-44 h-44 flex items-center justify-center my-4">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              {/* Background ring */}
              <path
                className="stroke-slate-100"
                strokeDasharray="100, 100"
                strokeWidth="3"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              {/* Colored progress arc */}
              <path
                className="stroke-indigo-600 transition-all duration-1000 ease-out"
                strokeDasharray={`${readinessScore.overallScore}, 100`}
                strokeLinecap="round"
                strokeWidth="3"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-black text-slate-900 tracking-tight">
                {readinessScore.overallScore}
              </span>
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-0.5">
                / 100
              </span>
            </div>
          </div>

          <div className="px-2 space-y-2">
            <div className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700">
              {readinessScore.readinessBand}
            </div>
            <p className="text-xs text-slate-600 leading-relaxed max-w-xs">
              {readinessScore.explanation.summary}
            </p>
          </div>

          <button
            id="what-is-affecting-score-btn"
            onClick={() => setIsScoreBreakdownOpen(true)}
            className="mt-6 w-full px-4 py-2.5 border border-slate-200 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-50 hover:border-slate-300 transition-colors flex items-center justify-center gap-1.5"
          >
            <HelpCircle className="w-3.5 h-3.5 text-indigo-600" />
            <span>What is affecting my score?</span>
          </button>
        </div>

        {/* Bento Tile 2: AI Skill Gap Analysis (Col 8) */}
        <div className="col-span-12 lg:col-span-8 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs overflow-hidden flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
              <div>
                <h3 className="font-bold text-lg text-slate-900">AI Skill Gap Analysis</h3>
                <p className="text-xs text-slate-500">Benchmark against verified industry requirements</p>
              </div>
              <span className="text-xs text-indigo-600 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-xl font-bold w-fit">
                Target: {studentProfile.targetRole}
              </span>
            </div>

            {/* Skill Bars with Goal vs Current comparison */}
            <div className="space-y-4">
              {skillGapAnalysis.gaps.slice(0, 4).map((gap, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-xs font-bold mb-1.5">
                    <span className="text-slate-800">{gap.skillName}</span>
                    <span className="text-slate-400 font-mono text-[11px]">
                      Goal: {gap.requiredLevelScore}% — Current: {gap.userLevelScore}%
                    </span>
                  </div>

                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden flex">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        gap.status === 'Strong'
                          ? 'bg-indigo-600'
                          : gap.status === 'Developing'
                          ? 'bg-indigo-400'
                          : 'bg-amber-400'
                      }`}
                      style={{ width: `${gap.userLevelScore}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Insight Box */}
          <div className="mt-6 bg-indigo-50/80 border border-indigo-100 rounded-2xl p-4 flex items-start gap-3">
            <Sparkles className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
            <p className="text-xs leading-relaxed text-indigo-950 font-medium">
              <strong className="text-indigo-900 mr-1">AI INSIGHT:</strong>
              {readinessScore.explanation.topStrengths[0] || 'Your trade foundation is solid.'}{' '}
              {readinessScore.explanation.topGaps[0] ? `The largest opportunity areas for immediate score boost are: ${readinessScore.explanation.topGaps[0]}` : ''}
            </p>
          </div>
        </div>

        {/* Bento Tile 3: Intelligent Job Matching (Col 8) */}
        <div className="col-span-12 lg:col-span-8 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-bold text-lg text-slate-900">Intelligent Job Matching</h3>
                <p className="text-xs text-slate-500">Curated opportunities ranked by verified skill compatibility</p>
              </div>
              <button
                onClick={() => setCurrentView('job-matches')}
                className="text-xs text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-1"
              >
                <span>View All ({jobMatches.length})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {topJobMatches.map((match, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveExplainJob(match)}
                  className="border border-slate-200 rounded-2xl p-4 relative hover:border-indigo-300 hover:shadow-xs transition-all cursor-pointer bg-slate-50/50 hover:bg-white flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <div className="w-10 h-10 bg-indigo-50 border border-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 font-bold text-xs">
                        {match.job.company.substring(0, 2).toUpperCase()}
                      </div>
                      <span
                        className={`text-[10px] font-black px-2.5 py-1 rounded-full ${
                          match.overallMatch >= 80
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-indigo-100 text-indigo-800'
                        }`}
                      >
                        {match.overallMatch}% MATCH
                      </span>
                    </div>

                    <h4 className="font-bold text-sm text-slate-900 leading-tight">
                      {match.job.title}
                    </h4>
                    <p className="text-xs text-slate-500 mt-1 mb-3 font-medium">
                      {match.job.company} • {match.job.location}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {match.strongSkills.slice(0, 2).map((s, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-[9px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md uppercase font-bold"
                        >
                          {s}
                        </span>
                      ))}
                      {match.missingSkills.slice(0, 1).map((m, mIdx) => (
                        <span
                          key={mIdx}
                          className="text-[9px] border border-amber-200 bg-amber-50 text-amber-700 px-2 py-0.5 rounded-md uppercase font-bold"
                        >
                          Missing: {m}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    <span className="text-indigo-600 font-bold hover:underline">
                      Why This Match?
                    </span>
                    <span className="text-slate-400 font-mono">{match.job.salary}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bento Tile 4: CareerAI Assistant & Current Roadmap (Col 4) */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
          {/* Deep Indigo AI Assistant Bento Box */}
          <div className="bg-indigo-900 rounded-3xl p-6 text-white flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-sm flex items-center gap-2 text-white">
                  <span className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse" />
                  CareerAI Assistant
                </h3>
                <span className="text-[10px] text-indigo-300 font-mono">Vocational Mentor</span>
              </div>

              <div className="text-xs text-indigo-100 leading-relaxed mb-4 italic bg-indigo-950/40 p-3 rounded-xl border border-indigo-800/60">
                {quickAiReply ? (
                  <p className="not-italic">{quickAiReply}</p>
                ) : (
                  `"Hi ${studentProfile.name.split(' ')[0]}! I noticed your readiness for ${studentProfile.targetRole} is ${readinessScore.overallScore}%. Would you like to generate a crash course for ${readinessScore.explanation.topGaps[0] || 'Git fundamentals'} to bridge that last gap?"`
                )}
              </div>
            </div>

            <form onSubmit={handleQuickAiSubmit} className="relative">
              <input
                type="text"
                value={quickAiInput}
                onChange={e => setQuickAiInput(e.target.value)}
                placeholder="Ask CareerAI..."
                className="w-full bg-indigo-800/60 border border-indigo-700 rounded-xl py-2 pl-3 pr-8 text-xs placeholder:text-indigo-400 text-white focus:outline-none focus:ring-1 focus:ring-indigo-400"
              />
              <button
                type="submit"
                disabled={isAiReplying || !quickAiInput.trim()}
                className="absolute right-2 top-2 text-indigo-300 hover:text-white transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

          {/* Current Roadmap Bento Box */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-sm text-slate-900">Current Roadmap</h3>
                <button
                  onClick={() => setCurrentView('roadmap')}
                  className="text-xs text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-0.5"
                >
                  <span>View All</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-3.5">
                {roadmap.phases.slice(0, 2).map((phase, idx) => {
                  const completedInPhase = phase.tasks.filter(t => studentProfile.completedRoadmapTaskIds?.includes(t.id)).length;
                  const isDone = completedInPhase === phase.tasks.length && phase.tasks.length > 0;

                  return (
                    <div key={phase.phaseNumber} className="flex items-start gap-3">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                          isDone
                            ? 'bg-emerald-100 text-emerald-600'
                            : 'border-2 border-indigo-600 bg-indigo-50'
                        }`}
                      >
                        {isDone ? (
                          <Check className="w-3 h-3 text-emerald-700 stroke-[3]" />
                        ) : (
                          <div className="w-2 h-2 bg-indigo-600 rounded-full" />
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className={`text-xs font-bold leading-tight ${isDone ? 'text-slate-800' : 'text-indigo-600'}`}>
                          {phase.title}
                        </p>
                        <p className="text-[10px] text-slate-400 mt-0.5">
                          {isDone ? 'Completed' : `${completedInPhase}/${phase.tasks.length} tasks done • ${phase.duration}`}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <span>Roadmap Progress:</span>
              <span className="font-bold text-slate-900 font-mono">{roadmap.completionPercentage}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
