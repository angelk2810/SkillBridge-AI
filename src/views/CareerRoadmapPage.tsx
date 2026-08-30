import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Milestone,
  CheckCircle2,
  Circle,
  Clock,
  ExternalLink,
  Sparkles,
  ChevronDown,
  ChevronUp,
  BookOpen,
  ArrowRight,
  Printer,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';

export const CareerRoadmapPage: React.FC = () => {
  const {
    roadmap,
    studentProfile,
    readinessScore,
    toggleRoadmapTask,
    setCurrentView
  } = useApp();

  const [expandedPhaseNumber, setExpandedPhaseNumber] = useState<number>(
    roadmap.phases[0]?.phaseNumber || 1
  );

  const handleTaskCheck = (taskId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const isCompleted = studentProfile.completedRoadmapTaskIds?.includes(taskId);
    toggleRoadmapTask(taskId);

    if (!isCompleted) {
      // Trigger confetti effect
      try {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.7 }
        });
      } catch {
        // Safe fallback
      }
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Top Header Bento Card */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-2">
              <Milestone className="w-3.5 h-3.5" />
              Dynamic Upskilling Engine
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Personalized 4-Phase Career Roadmap
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Custom-tailored curriculum to bridge specific skill gaps for{' '}
              <strong className="text-slate-900">{studentProfile.targetRole}</strong>.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => window.print()}
              className="px-4 py-2.5 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-bold text-slate-700 transition-colors flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Roadmap</span>
            </button>

            <button
              onClick={() => setCurrentView('job-matches')}
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5"
            >
              <span>View Target Jobs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Progress & Readiness Projection Stats Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-100">
          <div className="p-4 sm:p-5 bg-slate-50 rounded-2xl border border-slate-200/80 flex flex-col justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Roadmap Progress</span>
            <div className="text-2xl font-black text-slate-900 mt-1 flex items-baseline gap-2">
              <span>{roadmap.completionPercentage}%</span>
              <span className="text-xs text-slate-500 font-normal">
                ({roadmap.completedTaskCount}/{roadmap.totalTaskCount} tasks)
              </span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2 mt-3 overflow-hidden">
              <div
                className="h-full bg-emerald-500 transition-all duration-500 rounded-full"
                style={{ width: `${roadmap.completionPercentage}%` }}
              />
            </div>
          </div>

          <div className="p-4 sm:p-5 bg-indigo-50/70 rounded-2xl border border-indigo-100 flex flex-col justify-between">
            <span className="text-xs font-bold text-indigo-900 uppercase tracking-widest">Current Readiness Index</span>
            <div className="text-2xl font-black text-indigo-600 mt-1">
              {readinessScore.overallScore} <span className="text-xs font-bold text-slate-400">/ 100</span>
            </div>
            <span className="text-[11px] text-indigo-700 font-semibold mt-1">
              Band: {readinessScore.readinessBand}
            </span>
          </div>

          <div className="p-4 sm:p-5 bg-emerald-50/70 rounded-2xl border border-emerald-100 flex flex-col justify-between">
            <span className="text-xs font-bold text-emerald-900 uppercase tracking-widest flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> Projected Score After Completion
            </span>
            <div className="text-2xl font-black text-emerald-700 mt-1">
              {roadmap.projectedReadiness} <span className="text-xs font-bold text-slate-400">/ 100</span>
            </div>
            <span className="text-[11px] text-emerald-800 font-semibold mt-1">
              +{roadmap.projectedReadiness - readinessScore.overallScore} Points Estimated Gain
            </span>
          </div>
        </div>
      </div>

      {/* 4-Phase Accordion / Timeline Container */}
      <div className="space-y-4">
        {roadmap.phases.map((phase) => {
          const isExpanded = expandedPhaseNumber === phase.phaseNumber;
          const completedInPhase = phase.tasks.filter(t => studentProfile.completedRoadmapTaskIds?.includes(t.id)).length;
          const isPhaseFullyDone = completedInPhase === phase.tasks.length && phase.tasks.length > 0;

          return (
            <div
              key={phase.phaseNumber}
              className={`bg-white rounded-3xl border transition-all overflow-hidden ${
                isPhaseFullyDone
                  ? 'border-emerald-300 shadow-2xs'
                  : isExpanded
                  ? 'border-indigo-400 shadow-xs'
                  : 'border-slate-200 shadow-xs'
              }`}
            >
              {/* Phase Header Accordion Trigger */}
              <button
                type="button"
                onClick={() => setExpandedPhaseNumber(isExpanded ? 0 : phase.phaseNumber)}
                className="w-full p-5 sm:p-6 text-left flex items-start sm:items-center justify-between gap-4 bg-white hover:bg-slate-50/80 transition-colors"
              >
                <div className="flex items-start sm:items-center gap-3.5 min-w-0">
                  <div
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-sm shrink-0 shadow-xs ${
                      isPhaseFullyDone
                        ? 'bg-emerald-600 text-white'
                        : 'bg-indigo-600 text-white'
                    }`}
                  >
                    {isPhaseFullyDone ? <Check className="w-5 h-5 stroke-[3]" /> : `0${phase.phaseNumber}`}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600">
                        {phase.duration}
                      </span>
                      <span className="text-xs text-slate-400">•</span>
                      <span className="text-xs text-slate-500 font-mono">
                        {completedInPhase}/{phase.tasks.length} Done
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-semibold">
                        {phase.badge}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug mt-0.5">
                      {phase.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">{phase.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                  )}
                </div>
              </button>

              {/* Phase Tasks List Body */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-slate-100 bg-slate-50/50 p-5 sm:p-6 space-y-3"
                  >
                    {phase.tasks.map(task => {
                      const isTaskCompleted = studentProfile.completedRoadmapTaskIds?.includes(task.id);

                      return (
                        <div
                          key={task.id}
                          onClick={e => handleTaskCheck(task.id, e)}
                          className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                            isTaskCompleted
                              ? 'bg-emerald-50/60 border-emerald-200'
                              : 'bg-white border-slate-200 hover:border-indigo-300 shadow-2xs'
                          }`}
                        >
                          <div className="flex items-start gap-3.5 min-w-0">
                            <button
                              type="button"
                              onClick={e => handleTaskCheck(task.id, e)}
                              className="mt-0.5 text-slate-400 hover:text-indigo-600 transition-colors shrink-0"
                            >
                              {isTaskCompleted ? (
                                <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                              ) : (
                                <Circle className="w-5 h-5" />
                              )}
                            </button>

                            <div className="min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span
                                  className={`text-sm font-bold ${
                                    isTaskCompleted ? 'text-emerald-950 line-through' : 'text-slate-900'
                                  }`}
                                >
                                  {task.title}
                                </span>
                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-bold border border-indigo-100">
                                  +{task.impactOnReadiness}% Readiness Gain
                                </span>
                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">
                                  {task.difficulty}
                                </span>
                              </div>

                              <p className="text-xs text-slate-600 mt-1 leading-normal">
                                {task.description}
                              </p>

                              {/* Free learning resource badge */}
                              {task.resources && task.resources.length > 0 && (
                                <div className="mt-2.5 flex items-center gap-2 text-[11px] text-indigo-700 bg-indigo-50/80 border border-indigo-100 px-3 py-1 rounded-xl w-fit">
                                  <BookOpen className="w-3.5 h-3.5 shrink-0" />
                                  <span className="font-semibold">{task.resources[0].title}</span>
                                  <span className="text-indigo-400">({task.resources[0].provider})</span>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                            <div className="text-right text-xs text-slate-500 font-mono flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5 text-slate-400" />
                              <span>{task.estimatedHours} hrs</span>
                            </div>

                            <button
                              type="button"
                              onClick={e => handleTaskCheck(task.id, e)}
                              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                                isTaskCompleted
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs'
                              }`}
                            >
                              {isTaskCompleted ? 'Completed ✓' : 'Mark Done'}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};
