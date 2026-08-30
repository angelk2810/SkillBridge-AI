import React from 'react';
import { useApp } from '../context/AppContext';
import { Play, ChevronLeft, ChevronRight, X, Sparkles, CheckCircle, Lightbulb } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const PRESENTATION_STEPS = [
  {
    step: 0,
    view: 'landing',
    title: '1. Vision & Architecture Overview',
    summary: 'SkillBridge AI bridges the vocational-to-industry gap for ITI graduates using personalized AI intelligence.',
    evaluatorNotes: 'Notice the clean, high-contrast SaaS aesthetic, demo profile loader, and clear visual pipeline (Skills → Gap Analysis → Matching → Roadmap).'
  },
  {
    step: 1,
    view: 'dashboard',
    title: '2. Student Dashboard & Explainable Score',
    summary: 'Real-time Career Readiness Score calculated from a transparent 6-factor weighted formula.',
    evaluatorNotes: 'Click "What is affecting my score?" to observe transparent mathematical audit trails without black-box opacity.'
  },
  {
    step: 2,
    view: 'skill-gap',
    title: '3. AI Skill Gap Analysis Engine',
    summary: 'Direct comparison between student competencies and target industry requirements.',
    evaluatorNotes: 'Categorizes skills into Strong, Developing, and Missing with numerical gap metrics. Try switching the Target Role to see dynamic recalculation!'
  },
  {
    step: 3,
    view: 'job-matches',
    title: '4. Intelligent Job Matching & Transparency',
    summary: 'Weighted job similarity matching with live filters for location, salary, and experience.',
    evaluatorNotes: 'Click "Why This Match?" on any job card to inspect the exact skill evidence and missing prerequisites.'
  },
  {
    step: 4,
    view: 'roadmap',
    title: '5. Actionable 4-Phase Career Roadmap',
    summary: 'Staged, personalized learning path customized specifically for the student\'s detected skill deficits.',
    evaluatorNotes: 'Click checkboxes to complete roadmap tasks! Notice how the Career Readiness score dynamically updates in real-time.'
  },
  {
    step: 5,
    view: 'resume-analyzer',
    title: '6. AI Resume Analyzer & ATS Keyword Match',
    summary: 'Parses student resumes, extracts technical credentials, and pinpoints missing keywords against target job roles.',
    evaluatorNotes: 'Try testing pre-loaded ITI sample resumes or uploading custom text to view coverage scores.'
  },
  {
    step: 6,
    view: 'career-ai',
    title: '7. CareerAI Conversational Assistant',
    summary: 'Context-aware vocational mentor that knows the student\'s exact gaps, score, and career targets.',
    evaluatorNotes: 'Click any suggested prompt to see intelligent contextual responses with clickable action deep links.'
  },
  {
    step: 7,
    view: 'institution-insights',
    title: '8. Institution Dashboard & ITI Training Insights',
    summary: 'Aggregated analytics for ITI principals and training officers to identify systemic trade skill gaps.',
    evaluatorNotes: 'Visualizes cohort readiness distribution, trade-wise performance, and recommended faculty training priorities.'
  }
];

export const PresentationGuide: React.FC = () => {
  const {
    isPresentationMode,
    setIsPresentationMode,
    presentationStep,
    setPresentationStep,
    setCurrentView
  } = useApp();

  if (!isPresentationMode) {
    return (
      <div className="fixed bottom-6 left-6 z-40">
        <button
          id="start-presentation-tour-btn"
          onClick={() => {
            setIsPresentationMode(true);
            setPresentationStep(0);
            setCurrentView('landing');
          }}
          className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-full shadow-lg border border-slate-700 text-xs font-semibold tracking-wide transition-all hover:scale-105 active:scale-95 group"
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-400 group-hover:rotate-12 transition-transform" />
          <span>Evaluator Demo Walkthrough</span>
          <span className="px-1.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-mono">
            8 Steps
          </span>
        </button>
      </div>
    );
  }

  const currentStepData = PRESENTATION_STEPS[presentationStep] || PRESENTATION_STEPS[0];

  const handleNext = () => {
    if (presentationStep < PRESENTATION_STEPS.length - 1) {
      const next = presentationStep + 1;
      setPresentationStep(next);
      setCurrentView(PRESENTATION_STEPS[next].view as any);
    } else {
      setIsPresentationMode(false);
    }
  };

  const handlePrev = () => {
    if (presentationStep > 0) {
      const prev = presentationStep - 1;
      setPresentationStep(prev);
      setCurrentView(PRESENTATION_STEPS[prev].view as any);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        id="evaluator-walkthrough-bar"
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-2xl w-full px-4"
      >
        <div className="bg-slate-900/95 backdrop-blur-md text-white border border-slate-700/80 rounded-2xl shadow-2xl p-4 sm:p-5">
          <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                Presentation Mode • Step {presentationStep + 1} of {PRESENTATION_STEPS.length}
              </span>
            </div>
            <button
              id="exit-presentation-tour-btn"
              onClick={() => setIsPresentationMode(false)}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
              title="Exit Walkthrough"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-3">
            <h4 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              {currentStepData.title}
            </h4>
            <p className="text-xs text-slate-300 mt-1 leading-normal">
              {currentStepData.summary}
            </p>

            <div className="mt-2.5 p-2.5 bg-slate-800/80 border border-slate-700 rounded-xl flex items-start gap-2 text-[11px] text-amber-200">
              <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-amber-300">Evaluator Highlight: </span>
                {currentStepData.evaluatorNotes}
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-1.5">
              {PRESENTATION_STEPS.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setPresentationStep(idx);
                    setCurrentView(s.view as any);
                  }}
                  className={`h-1.5 rounded-full transition-all ${idx === presentationStep ? 'w-6 bg-indigo-400' : 'w-2 bg-slate-700 hover:bg-slate-500'}`}
                  title={s.title}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                id="prev-walkthrough-step-btn"
                onClick={handlePrev}
                disabled={presentationStep === 0}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 transition-colors"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                Previous
              </button>

              <button
                id="next-walkthrough-step-btn"
                onClick={handleNext}
                className="px-4 py-1.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-1.5 shadow-md shadow-indigo-600/30 transition-all hover:scale-105 active:scale-95"
              >
                <span>{presentationStep === PRESENTATION_STEPS.length - 1 ? 'Finish Tour' : 'Next Step'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
