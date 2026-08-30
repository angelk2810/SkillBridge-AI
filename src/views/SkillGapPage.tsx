import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Compass,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  HelpCircle,
  Target,
  Filter,
  Layers,
  ArrowRight,
  TrendingUp,
  Sparkles,
  Info,
  ChevronDown,
  ExternalLink,
  Plus
} from 'lucide-react';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from 'recharts';
import { SkillProficiency } from '../types';

export const SkillGapPage: React.FC = () => {
  const {
    studentProfile,
    skillGapAnalysis,
    allCareerRoles,
    changeTargetRole,
    updateSkill,
    setCurrentView,
    addToast
  } = useApp();

  const [activeFilter, setActiveFilter] = useState<'All' | 'Strong' | 'Developing' | 'Missing'>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [editingSkill, setEditingSkill] = useState<string | null>(null);

  const categories = ['All', ...Array.from(new Set(skillGapAnalysis.gaps.map(g => g.category)))];

  const filteredGaps = skillGapAnalysis.gaps.filter(gap => {
    const matchesFilter = activeFilter === 'All' || gap.status === activeFilter;
    const matchesCategory = selectedCategory === 'All' || gap.category === selectedCategory;
    return matchesFilter && matchesCategory;
  });

  // Data for Radar Chart comparison
  const radarChartData = skillGapAnalysis.gaps.slice(0, 7).map(gap => ({
    skill: gap.skillName.length > 12 ? `${gap.skillName.substring(0, 10)}...` : gap.skillName,
    fullName: gap.skillName,
    StudentLevel: gap.userLevelScore,
    BenchmarkRequired: gap.requiredLevelScore
  }));

  const handleProficiencyUpdate = (skillName: string, level: SkillProficiency) => {
    updateSkill(skillName, level);
    setEditingSkill(null);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Top Header & Role Switcher Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-2">
              <Compass className="w-3.5 h-3.5" />
              Automated Skill Gap Analysis Engine
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Skill Gap & Industry Benchmark
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Comparing your verified profile competencies against live employer requirements for{' '}
              <strong className="text-slate-900 font-bold">{studentProfile.targetRole}</strong>.
            </p>
          </div>

          {/* Benchmark Target Role Selector */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Benchmark Role:</span>
            <select
              value={studentProfile.targetRole}
              onChange={e => changeTargetRole(e.target.value)}
              className="px-3.5 py-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-300 rounded-xl text-xs sm:text-sm font-bold text-indigo-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
            >
              {allCareerRoles.map(role => (
                <option key={role.id} value={role.title}>
                  {role.title} ({role.category})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 4 Metric Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-100">
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
            <div className="text-xs text-slate-500 font-medium">Overall Coverage</div>
            <div className="text-2xl font-extrabold text-indigo-600 mt-1">
              {skillGapAnalysis.overallCompetencyCoverage}%
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">Weighted benchmark fit</div>
          </div>

          <div className="p-3.5 bg-emerald-50/50 rounded-xl border border-emerald-100">
            <div className="text-xs text-emerald-800 font-medium flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Strong Skills
            </div>
            <div className="text-2xl font-extrabold text-emerald-700 mt-1">
              {skillGapAnalysis.strongSkills.length}
            </div>
            <div className="text-[10px] text-emerald-600/80 mt-0.5">Meets or exceeds reqs</div>
          </div>

          <div className="p-3.5 bg-amber-50/50 rounded-xl border border-amber-100">
            <div className="text-xs text-amber-800 font-medium flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" /> Developing
            </div>
            <div className="text-2xl font-extrabold text-amber-700 mt-1">
              {skillGapAnalysis.developingSkills.length}
            </div>
            <div className="text-[10px] text-amber-600/80 mt-0.5">Needs 1 proficiency step</div>
          </div>

          <div className="p-3.5 bg-rose-50/50 rounded-xl border border-rose-100">
            <div className="text-xs text-rose-800 font-medium flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 text-rose-600" /> Missing Prereqs
            </div>
            <div className="text-2xl font-extrabold text-rose-700 mt-1">
              {skillGapAnalysis.missingSkills.length}
            </div>
            <div className="text-[10px] text-rose-600/80 mt-0.5">Not yet in profile</div>
          </div>
        </div>
      </div>

      {/* Visual Chart Section: Radar Comparison & Explanatory Callout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Radar Chart Visualizer (2 Cols) */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Competency Polygon Chart
              </h3>
              <p className="text-xs text-slate-500">
                Visualizing student proficiency (Indigo) vs required benchmark (Slate)
              </p>
            </div>
            <span className="text-[11px] px-2.5 py-1 bg-indigo-50 text-indigo-700 font-bold rounded-lg">
              Top 7 Competencies
            </span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarChartData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="skill" tick={{ fill: '#475569', fontSize: 11, fontWeight: 600 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#94a3b8', fontSize: 10 }} />
                <Radar
                  name="Student Current"
                  dataKey="StudentLevel"
                  stroke="#4f46e5"
                  fill="#6366f1"
                  fillOpacity={0.4}
                />
                <Radar
                  name="Industry Benchmark"
                  dataKey="BenchmarkRequired"
                  stroke="#94a3b8"
                  fill="#cbd5e1"
                  fillOpacity={0.25}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl text-xs">
                          <p className="font-bold text-indigo-300">{data.fullName}</p>
                          <p className="mt-1">Student Level: <span className="font-bold text-white">{data.StudentLevel}%</span></p>
                          <p>Required: <span className="font-bold text-slate-300">{data.BenchmarkRequired}%</span></p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Explainability / Methodology Card (1 Col) */}
        <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-2xl p-6 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-800 text-indigo-200 text-[10px] font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3 h-3 text-amber-400" /> Transparent Math
            </div>
            <h3 className="text-base font-bold text-white">How Gaps Are Computed</h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Our engine normalizes proficiencies on a 0–100 scale:
            </p>
            <ul className="mt-3 space-y-1.5 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span><strong>Strong:</strong> Current score ≥ Required score</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span><strong>Developing:</strong> Gap is within 35% points</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                <span><strong>Missing:</strong> Not present in verified skill matrix</span>
              </li>
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800">
            <button
              onClick={() => setCurrentView('roadmap')}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-md"
            >
              <span>Bridge Gaps via Roadmap</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Interactive Skills Breakdown Table */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs">
        {/* Filters and Search toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <span className="text-xs font-bold text-slate-400 uppercase mr-1">Status:</span>
            {(['All', 'Strong', 'Developing', 'Missing'] as const).map(status => (
              <button
                key={status}
                onClick={() => setActiveFilter(status)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeFilter === status
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase">Category:</span>
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none"
            >
              {categories.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Gaps List Cards / Rows */}
        <div className="space-y-3">
          {filteredGaps.map((gap, idx) => {
            const isEditing = editingSkill === gap.skillName;

            return (
              <div
                key={idx}
                className="p-4 bg-slate-50 hover:bg-white border border-slate-200 hover:border-indigo-300 rounded-2xl shadow-2xs hover:shadow-xs transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="text-sm font-bold text-slate-900">{gap.skillName}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-200 text-slate-700 font-medium">
                      {gap.category}
                    </span>
                    <span
                      className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                        gap.status === 'Strong'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : gap.status === 'Developing'
                          ? 'bg-amber-100 text-amber-800 border border-amber-300'
                          : 'bg-rose-100 text-rose-800 border border-rose-300'
                      }`}
                    >
                      {gap.status}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      Priority: {gap.criticality}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 mt-1">{gap.recommendation}</p>

                  {/* Level comparison pill */}
                  <div className="mt-2 flex items-center gap-4 text-xs font-medium">
                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-400">Current:</span>
                      <span className="font-bold text-slate-800">{gap.userLevel}</span>
                    </div>
                    <span className="text-slate-300">→</span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-400">Target Required:</span>
                      <span className="font-bold text-indigo-700">{gap.requiredLevel}</span>
                    </div>
                    {gap.gapScore > 0 && (
                      <span className="text-rose-600 font-bold font-mono">
                        (-{gap.gapScore}% deficit)
                      </span>
                    )}
                  </div>
                </div>

                {/* Right Action: Quick update proficiency */}
                <div className="shrink-0 w-full md:w-auto flex items-center justify-end gap-2 pt-2 md:pt-0 border-t md:border-t-0 border-slate-200">
                  {isEditing ? (
                    <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-slate-300 shadow-sm">
                      {(['Beginner', 'Intermediate', 'Advanced'] as SkillProficiency[]).map(lvl => (
                        <button
                          key={lvl}
                          onClick={() => handleProficiencyUpdate(gap.skillName, lvl)}
                          className="px-2.5 py-1 text-xs font-bold rounded-lg hover:bg-indigo-600 hover:text-white transition-colors"
                        >
                          {lvl}
                        </button>
                      ))}
                      <button
                        onClick={() => setEditingSkill(null)}
                        className="text-xs text-slate-400 hover:text-slate-600 px-1"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setEditingSkill(gap.skillName)}
                      className="px-3.5 py-1.5 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl text-xs font-semibold text-slate-700 shadow-2xs transition-colors"
                    >
                      Update Proficiency
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
