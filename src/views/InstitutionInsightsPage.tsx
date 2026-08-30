import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Building2,
  TrendingUp,
  Users,
  Award,
  BookOpen,
  ArrowUpRight,
  AlertTriangle,
  CheckCircle2,
  Layers,
  Sparkles,
  Download,
  Filter,
  BarChart3
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell
} from 'recharts';

export const InstitutionInsightsPage: React.FC = () => {
  const { setCurrentView, addToast } = useApp();
  const [selectedTrade, setSelectedTrade] = useState<string>('All Trades');

  // Trade Aggregated Metrics Data
  const tradeCompetencyData = [
    { trade: 'COPA (IT)', enrolled: 120, avgScore: 74, topGap: 'Git & Version Control', placementRate: 88 },
    { trade: 'Electrician', enrolled: 95, avgScore: 69, topGap: 'PLC Automation', placementRate: 82 },
    { trade: 'Fitter', enrolled: 80, avgScore: 71, topGap: 'CNC Programming', placementRate: 79 },
    { trade: 'Welder', enrolled: 60, avgScore: 76, topGap: 'TIG/MIG Welding', placementRate: 91 },
    { trade: 'Mechanic Diesel', enrolled: 70, avgScore: 68, topGap: 'EV Powertrain Diagnostics', placementRate: 75 },
    { trade: 'Electronics Mech', enrolled: 85, avgScore: 72, topGap: 'IoT Sensor Calibration', placementRate: 84 }
  ];

  const placementStatusData = [
    { name: 'Placed in Industry', value: 310, color: '#4f46e5' },
    { name: 'Apprenticeship / OJT', value: 125, color: '#10b981' },
    { name: 'Active Upskilling', value: 65, color: '#f59e0b' },
    { name: 'Seeking Placement', value: 30, color: '#94a3b8' }
  ];

  const curriculumRecommendations = [
    {
      title: 'Integrate Git & Collaborative Workflow into COPA Module',
      trade: 'COPA',
      urgency: 'High Urgency',
      impact: '82% of hiring companies require Git version control for Junior Developer roles.'
    },
    {
      title: 'Add Industrial PLC & SCADA Hands-on Labs to Electrician Trade',
      trade: 'Electrician',
      urgency: 'Medium Urgency',
      impact: 'Smart manufacturing hubs in Bengaluru and Pune report 35% higher salary offers for PLC skills.'
    },
    {
      title: 'EV Battery Diagnostic Units in Diesel Mechanic Syllabus',
      trade: 'Mechanic Diesel',
      urgency: 'Strategic (Future-Ready)',
      impact: 'Clean mobility transition is driving demand for EV diagnostic technicians in auto OEMs.'
    }
  ];

  const handleExportReport = () => {
    addToast({
      type: 'success',
      title: 'Institutional Report Generated 📊',
      message: 'Downloaded NCVT compliance and student placement analytics summary.'
    });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Top Header Banner Bento Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-2">
            <Building2 className="w-3.5 h-3.5" />
            Institutional Intelligence Dashboard
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Government Model ITI • Aggregate Analytics
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time competency coverage, systemic curriculum gaps, and placement velocity across 510 enrolled students.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <button
            onClick={handleExportReport}
            className="flex-1 md:flex-none px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-2xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Analytics</span>
          </button>

          <button
            onClick={() => setCurrentView('dashboard')}
            className="flex-1 md:flex-none px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-1.5"
          >
            <span>Back to Student View</span>
          </button>
        </div>
      </div>

      {/* Bento Grid Row 1: KPI Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Enrolled Students</span>
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-3xl font-black text-slate-900">510</span>
            <p className="text-xs text-emerald-600 font-semibold mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +12% vs last academic batch
            </p>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Avg Readiness Score</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-3xl font-black text-indigo-600">71.8</span>
            <span className="text-xs font-bold text-slate-400 ml-1">/ 100</span>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Band: Industry Ready Baseline
            </p>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Placement Rate</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-3xl font-black text-emerald-600">84.2%</span>
            <p className="text-xs text-slate-500 font-medium mt-1">
              435 / 510 placed or apprenticed
            </p>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Active Hiring Partners</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-3xl font-black text-slate-900">48</span>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Across IT, Auto, and Manufacturing
            </p>
          </div>
        </div>
      </div>

      {/* Bento Grid Row 2: Charts & Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Trade Competency Bar Chart (Col 8) */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <h3 className="font-bold text-lg text-slate-900">Average Readiness by Vocational Trade</h3>
              <p className="text-xs text-slate-500">Comparing batch benchmarks against industry standards.</p>
            </div>
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full w-fit">
              NCVT Trade Matrix
            </span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={tradeCompetencyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="trade" tick={{ fill: '#64748b', fontSize: 11 }} />
                <YAxis domain={[40, 100]} tick={{ fill: '#64748b', fontSize: 11 }} />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-slate-900 text-white p-3 rounded-xl text-xs shadow-xl space-y-1">
                          <p className="font-bold">{data.trade}</p>
                          <p className="text-indigo-300">Avg Readiness: {data.avgScore}%</p>
                          <p className="text-emerald-300">Placement: {data.placementRate}%</p>
                          <p className="text-slate-400">Primary Gap: {data.topGap}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="avgScore" fill="#4f46e5" radius={[6, 6, 0, 0]} barSize={36} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Placement Status Distribution Pie (Col 4) */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-lg text-slate-900 mb-1">Placement Outcomes</h3>
            <p className="text-xs text-slate-500 mb-4">Batch 2023-2024 student status breakdown</p>

            <div className="h-44 w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={placementStatusData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={68}
                    paddingAngle={4}
                  >
                    {placementStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-black text-slate-800">510</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase">Students</span>
              </div>
            </div>

            <div className="space-y-2 mt-4">
              {placementStatusData.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-slate-700 font-medium">{item.name}</span>
                  </div>
                  <span className="font-bold text-slate-900 font-mono">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bento Grid Row 3: Actionable Curriculum Recommendations */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              AI Recommendations for Principal & Training Officers
            </h3>
            <p className="text-xs text-slate-500">
              Systemic trade interventions based on aggregate missing employer prerequisites.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {curriculumRecommendations.map((rec, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-indigo-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-800">
                    Trade: {rec.trade}
                  </span>
                  <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                    {rec.urgency}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 leading-snug mt-2">{rec.title}</h4>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">{rec.impact}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200 text-right">
                <span className="text-[11px] text-indigo-600 font-bold hover:underline cursor-pointer">
                  Generate Syllabus Module →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
