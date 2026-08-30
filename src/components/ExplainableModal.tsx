import React from 'react';
import { useApp } from '../context/AppContext';
import { X, CheckCircle2, AlertCircle, Sparkles, TrendingUp, ShieldCheck, HelpCircle, Layers, ArrowRight, BrainCircuit } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ExplainableModal: React.FC = () => {
  const {
    activeExplainJob,
    setActiveExplainJob,
    isScoreBreakdownOpen,
    setIsScoreBreakdownOpen,
    readinessScore,
    studentProfile,
    setCurrentView
  } = useApp();

  return (
    <>
      {/* 1. Job Match Explainability Modal */}
      <AnimatePresence>
        {activeExplainJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              id="job-explainability-modal"
              className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-2xl w-full p-6 sm:p-8 my-8 relative overflow-hidden"
            >
              <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-5">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
                    <BrainCircuit className="w-3.5 h-3.5" />
                    Explainable AI Match Audit
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 leading-tight">
                    Why did we recommend {activeExplainJob.job.title}?
                  </h3>
                  <p className="text-sm text-slate-600 mt-1">
                    {activeExplainJob.job.company} • {activeExplainJob.job.location}
                  </p>
                </div>
                <button
                  id="close-job-explain-modal"
                  onClick={() => setActiveExplainJob(null)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-6 space-y-6">
                {/* Overall Score Highlight */}
                <div className="bg-gradient-to-br from-indigo-50 to-slate-50 border border-indigo-100 rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Recommendation Match Score
                    </div>
                    <div className="text-3xl font-extrabold text-indigo-600 mt-1">
                      {activeExplainJob.overallMatch}% Match
                    </div>
                    <p className="text-xs text-slate-600 mt-1">
                      Weighted mathematical aggregation across 6 profile attributes.
                    </p>
                  </div>
                  <div className="text-xs text-slate-500 bg-white border border-slate-200 rounded-lg p-3 w-full sm:w-auto">
                    <div className="font-semibold text-slate-800">Formula Weights:</div>
                    <div className="grid grid-cols-2 gap-x-3 gap-y-0.5 mt-1 text-[11px]">
                      <span>Tech Skills: 40%</span>
                      <span>Education: 15%</span>
                      <span>Interests: 15%</span>
                      <span>Certs: 10%</span>
                      <span>Experience: 10%</span>
                      <span>Location: 10%</span>
                    </div>
                  </div>
                </div>

                {/* Score Factor Breakdown */}
                <div>
                  <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-indigo-600" />
                    Attribute Contribution Breakdown
                  </h4>
                  <div className="space-y-2.5">
                    {[
                      { label: 'Technical Skills Alignment', score: activeExplainJob.technicalMatch, weight: '40%' },
                      { label: 'Trade & Education Fit', score: activeExplainJob.educationMatch, weight: '15%' },
                      { label: 'Career Interests Fit', score: activeExplainJob.interestMatch, weight: '15%' },
                      { label: 'Verified Certifications', score: activeExplainJob.certificationMatch, weight: '10%' },
                      { label: 'Practical Experience Level', score: activeExplainJob.experienceMatch, weight: '10%' },
                      { label: 'Location & Work Preference', score: activeExplainJob.locationMatch, weight: '10%' },
                    ].map((item, idx) => (
                      <div key={idx} className="bg-slate-50 border border-slate-100 rounded-lg p-2.5 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-slate-800">{item.label}</span>
                          <span className="text-slate-400">({item.weight})</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-24 bg-slate-200 rounded-full h-2 overflow-hidden">
                            <div
                              className={`h-full rounded-full ${item.score >= 80 ? 'bg-emerald-500' : item.score >= 60 ? 'bg-indigo-500' : 'bg-amber-500'}`}
                              style={{ width: `${item.score}%` }}
                            />
                          </div>
                          <span className="font-bold text-slate-900 w-8 text-right">{item.score}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Skill Evidence vs What is Holding You Back */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-4">
                    <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Skill Evidence (Matches)
                    </div>
                    {activeExplainJob.strongSkills.length > 0 ? (
                      <ul className="space-y-1.5 text-xs text-slate-700">
                        {activeExplainJob.strongSkills.map((s, idx) => (
                          <li key={idx} className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            <span>{s}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-xs text-slate-500">Foundational match based on trade background.</p>
                    )}
                  </div>

                  <div className="bg-amber-50/50 border border-amber-100 rounded-xl p-4">
                    <div className="text-xs font-bold text-amber-800 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                      <AlertCircle className="w-4 h-4 text-amber-600" />
                      What is Holding You Back?
                    </div>
                    {activeExplainJob.missingSkills.length > 0 || activeExplainJob.holdingBackFactors.length > 0 ? (
                      <ul className="space-y-1.5 text-xs text-slate-700">
                        {activeExplainJob.missingSkills.map((s, idx) => (
                          <li key={idx} className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                            <span>Missing: {s}</span>
                          </li>
                        ))}
                        {activeExplainJob.holdingBackFactors.map((f, idx) => (
                          <li key={idx} className="flex items-center gap-1.5 text-slate-600">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-xs text-slate-500">No major blockers detected.</p>
                    )}
                  </div>
                </div>

                {/* AI Executive Reason */}
                <div className="p-4 bg-slate-900 text-white rounded-xl text-xs leading-relaxed">
                  <div className="flex items-center gap-1.5 text-indigo-300 font-semibold mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    AI Recommendation Reasoning
                  </div>
                  {activeExplainJob.matchReasoning}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                <p className="text-xs text-slate-500">
                  Simulated prototype prediction based on ITI curriculum benchmark.
                </p>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    id="modal-view-roadmap-btn"
                    onClick={() => {
                      setActiveExplainJob(null);
                      setCurrentView('roadmap');
                    }}
                    className="flex-1 sm:flex-none px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                  >
                    Bridge Gaps in Roadmap
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 2. Readiness Score Factor Breakdown Modal */}
      <AnimatePresence>
        {isScoreBreakdownOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              id="readiness-score-breakdown-modal"
              className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-2xl w-full p-6 sm:p-8 my-8 relative"
            >
              <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-5">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
                    <TrendingUp className="w-3.5 h-3.5" />
                    Readiness Score Breakdown
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 leading-tight">
                    What is Affecting My Career Readiness Score?
                  </h3>
                  <p className="text-sm text-slate-600 mt-1">
                    Transparent evaluation for {studentProfile.targetRole}
                  </p>
                </div>
                <button
                  id="close-score-breakdown-modal"
                  onClick={() => setIsScoreBreakdownOpen(false)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-6 space-y-6">
                {/* Score Summary Box */}
                <div className="flex items-center justify-between p-5 bg-slate-50 border border-slate-200 rounded-xl">
                  <div>
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Current Score
                    </div>
                    <div className="text-4xl font-extrabold text-slate-900 mt-1 flex items-baseline gap-2">
                      <span>{readinessScore.overallScore}</span>
                      <span className="text-lg font-medium text-slate-400">/ 100</span>
                    </div>
                    <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-xs font-semibold" style={{ backgroundColor: `${readinessScore.color}20`, color: readinessScore.color }}>
                      {readinessScore.readinessBand}
                    </span>
                  </div>
                  <div className="max-w-xs text-xs text-slate-600 text-right">
                    {readinessScore.explanation.summary}
                  </div>
                </div>

                {/* Score Component Cards */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Score Components & Weights
                  </h4>
                  {Object.values(readinessScore.components).map((comp, idx) => (
                    <div key={idx} className="p-3.5 bg-white border border-slate-200 rounded-xl hover:border-slate-300 transition-all">
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-slate-800">{comp.label}</span>
                          <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-mono">
                            Weight: {(comp.weight * 100).toFixed(0)}%
                          </span>
                        </div>
                        <div className="text-sm font-bold text-slate-900">
                          {comp.score} / 100 <span className="text-xs text-slate-500">({comp.weightedContribution} pts)</span>
                        </div>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2 mb-1.5 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-indigo-600 transition-all duration-500"
                          style={{ width: `${comp.score}%` }}
                        />
                      </div>
                      <p className="text-xs text-slate-500 leading-normal">{comp.description}</p>
                    </div>
                  ))}
                </div>

                {/* Positive vs Negative Factors */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-emerald-50/60 border border-emerald-200/60 rounded-xl">
                    <div className="text-xs font-bold text-emerald-900 flex items-center gap-1.5 mb-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Positive Score Drivers
                    </div>
                    <ul className="space-y-1.5 text-xs text-emerald-950">
                      {readinessScore.explanation.affectingFactors.positive.map((factor, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                          <span>{factor}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 bg-rose-50/60 border border-rose-200/60 rounded-xl">
                    <div className="text-xs font-bold text-rose-900 flex items-center gap-1.5 mb-2">
                      <AlertCircle className="w-4 h-4 text-rose-600" />
                      Opportunity Areas
                    </div>
                    <ul className="space-y-1.5 text-xs text-rose-950">
                      {readinessScore.explanation.affectingFactors.negative.map((factor, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                          <span>{factor}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Actionable Advice Box */}
                <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-xl text-xs text-indigo-950 flex items-start gap-3">
                  <Sparkles className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Next Recommended Action: </span>
                    {readinessScore.explanation.actionableAdvice}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-end">
                <button
                  id="close-breakdown-btn-bottom"
                  onClick={() => setIsScoreBreakdownOpen(false)}
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition-colors"
                >
                  Got It, Thanks
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
