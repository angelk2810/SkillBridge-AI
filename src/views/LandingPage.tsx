import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Compass,
  ArrowRight,
  BrainCircuit,
  Target,
  Briefcase,
  Milestone,
  CheckCircle2,
  TrendingUp,
  Award,
  Layers,
  Sparkles,
  Play,
  Users,
  ShieldCheck,
  Zap,
  BookOpen,
  Building2,
  UserCheck
} from 'lucide-react';
import { motion } from 'motion/react';

export const LandingPage: React.FC = () => {
  const {
    setCurrentView,
    resetToDefaultProfile,
    loadDemoProfile,
    allDemoProfiles,
    setIsPresentationMode,
    setPresentationStep
  } = useApp();

  const handleStartAssessment = () => {
    setCurrentView('onboarding');
  };

  const handleTryDemoProfile = () => {
    resetToDefaultProfile();
    setCurrentView('dashboard');
  };

  const handleStartDemoTour = () => {
    setIsPresentationMode(true);
    setPresentationStep(0);
    setCurrentView('landing');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 px-4 sm:px-6 lg:px-8 border-b border-slate-200 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          {/* Tagline Pill */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold uppercase tracking-wider mb-6 shadow-xs"
          >
            <Compass className="w-3.5 h-3.5 text-indigo-600" />
            <span>AI Career Intelligence for Vocational & ITI Graduates</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 max-w-4xl mx-auto leading-[1.15]"
          >
            Turn Your Skills Into <br className="hidden sm:inline" />
            <span className="text-indigo-600">Your Career.</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed"
          >
            An AI-powered career intelligence platform that identifies your skill gaps, matches you with relevant opportunities, and builds a personalized path toward industry readiness.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto"
          >
            <button
              id="hero-start-assessment-btn"
              onClick={handleStartAssessment}
              className="w-full sm:w-auto px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white rounded-xl font-bold text-sm shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2 transition-all"
            >
              <span>Start Career Assessment</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              id="hero-try-demo-profile-btn"
              onClick={handleTryDemoProfile}
              className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-slate-100 active:scale-95 text-slate-800 border border-slate-300 rounded-xl font-bold text-sm shadow-xs flex items-center justify-center gap-2 transition-all group"
            >
              <Users className="w-4 h-4 text-indigo-600 group-hover:scale-110 transition-transform" />
              <span>Try Demo Profile (Arjun - COPA)</span>
            </button>
          </motion.div>

          <div className="mt-4 flex items-center justify-center gap-4 text-xs text-slate-500">
            <button
              onClick={handleStartDemoTour}
              className="text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1.5 underline underline-offset-4"
            >
              <Play className="w-3.5 h-3.5" /> Start Evaluator Presentation Walkthrough
            </button>
          </div>

          {/* Visual Architecture Pipeline: Skills → AI Analysis → Skill Gap → Job Match → Career Roadmap */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-14 p-6 sm:p-8 bg-white border border-slate-200 rounded-2xl shadow-xl max-w-5xl mx-auto"
          >
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 text-left mb-6 flex items-center justify-between">
              <span>Core Intelligence Engine Pipeline</span>
              <span className="text-[11px] font-mono text-indigo-600 font-semibold">Real-time Recalibration</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 relative">
              {[
                { title: '1. Vocational Skills', desc: 'Trade, certs & verified proficiencies', icon: UserCheck, color: 'text-indigo-600 bg-indigo-50 border-indigo-200' },
                { title: '2. AI Engine', desc: 'Transparent weighted attribute math', icon: BrainCircuit, color: 'text-purple-600 bg-purple-50 border-purple-200' },
                { title: '3. Skill Gap Analysis', desc: 'Strong, Developing & Missing metrics', icon: Compass, color: 'text-amber-600 bg-amber-50 border-amber-200' },
                { title: '4. Job Matching', desc: 'Transparent similarity & explainability', icon: Briefcase, color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
                { title: '5. Action Roadmap', desc: '4-phase personalized upskilling path', icon: Milestone, color: 'text-blue-600 bg-blue-50 border-blue-200' }
              ].map((step, idx) => {
                const StepIcon = step.icon;
                return (
                  <div key={idx} className={`p-4 rounded-xl border text-left flex flex-col justify-between ${step.color} transition-transform hover:-translate-y-1`}>
                    <div>
                      <div className="w-8 h-8 rounded-lg bg-white shadow-xs flex items-center justify-center mb-3">
                        <StepIcon className="w-4 h-4" />
                      </div>
                      <div className="font-bold text-xs text-slate-900">{step.title}</div>
                      <p className="text-[11px] text-slate-600 mt-1 leading-tight">{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why This Platform? Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-2">Why SkillBridge AI?</h2>
          <p className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Bridging Vocational Education & Industry 4.0
          </p>
          <p className="text-sm text-slate-600 mt-3">
            Traditional placement portals rely on keyword matching without analyzing competency depth. SkillBridge AI calculates explainable gaps and provides clear, staged guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Personalized Career Intelligence',
              desc: 'Continuous analysis based on ITI trade, skill proficiencies, and career goals rather than static resume filters.',
              icon: BrainCircuit,
              badge: 'Adaptive'
            },
            {
              title: 'Industry-Aligned Skill Analysis',
              desc: 'Benchmark skills directly against live job market criteria with exact delta percentage calculations.',
              icon: Target,
              badge: 'Benchmarked'
            },
            {
              title: 'Intelligent Job Matching',
              desc: 'Weighted multi-factor similarity matching that clearly reveals why an opportunity is recommended.',
              icon: Briefcase,
              badge: 'Explainable'
            },
            {
              title: 'Actionable Upskilling Roadmaps',
              desc: 'Staged 4-phase micro-learning curricula with free verified resources that improve scores dynamically.',
              icon: Milestone,
              badge: 'Dynamic'
            }
          ].map((card, idx) => {
            const CardIcon = card.icon;
            return (
              <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs hover:shadow-md transition-shadow text-left flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                      <CardIcon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                      {card.badge}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 leading-snug">{card.title}</h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">{card.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-100/70 border-y border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-2">Workflow Process</h2>
            <p className="text-3xl font-extrabold text-slate-900 tracking-tight">
              6 Steps From Enrollment to Job Readiness
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { num: '01', title: 'Build Profile', desc: 'Input ITI trade, qualifications, graduation year, and career aspirations.', action: 'Step 1 of Assessment' },
              { num: '02', title: 'Assess Skills', desc: 'Select technical, electrical, mechanical or IT tools with self-reported proficiency.', action: 'Categorized Skill Matrix' },
              { num: '03', title: 'Analyze Gaps', desc: 'AI compares competencies against industry role criteria and highlights deficit areas.', action: 'Strong vs Missing' },
              { num: '04', title: 'Match Opportunities', desc: 'Inspect curated job openings with detailed match reasoning and transparent weighting.', action: 'Similarity Scoring' },
              { num: '05', title: 'Personalized Upskill', desc: 'Follow a 4-phase structured roadmap with direct learning links and project guides.', action: 'Interactive Checklists' },
              { num: '06', title: 'Track Career Progress', desc: 'Watch readiness score jump in real-time as tasks are completed and resume is tuned.', action: 'Verified Milestones' }
            ].map((step, idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs relative">
                <span className="text-3xl font-extrabold text-slate-200 font-mono absolute top-5 right-5">{step.num}</span>
                <div className="pr-8">
                  <h4 className="text-base font-bold text-slate-900">{step.title}</h4>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">{step.desc}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-semibold text-indigo-600">
                  {step.action}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prototype Impact & Metrics (Clearly Labeled as Prototype Datasets) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-4 border border-indigo-500/30">
              <ShieldCheck className="w-3.5 h-3.5" /> Prototype Evaluation Metrics
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Validated Across 12+ ITI Vocational Trades
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
              Demonstration metrics calculated across simulated cohort datasets (COPA, Electrician, Electronics, Machinist, CAD Draughtsman, Instrumentation).
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10 pt-8 border-t border-slate-800">
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-indigo-400 font-mono">480+</div>
              <div className="text-xs text-slate-400 mt-1 font-medium">Simulated ITI Students</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-mono">12+</div>
              <div className="text-xs text-slate-400 mt-1 font-medium">Industry Roles Mapped</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-amber-400 font-mono">87%</div>
              <div className="text-xs text-slate-400 mt-1 font-medium">Scoring Match Accuracy</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-blue-400 font-mono">+18%</div>
              <div className="text-xs text-slate-400 mt-1 font-medium">Readiness Gain Post-Roadmap</div>
            </div>
          </div>
        </div>
      </section>

      {/* Diverse ITI Profiles Preview Strip */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <div>
            <h4 className="text-sm font-bold text-slate-900">Explore Pre-loaded Student Personas</h4>
            <p className="text-xs text-slate-500">Click any ITI graduate profile to simulate their custom gap analysis instantly.</p>
          </div>
          <button
            onClick={() => setCurrentView('dashboard')}
            className="text-xs text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-1"
          >
            <span>Open Active Dashboard</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {allDemoProfiles.slice(0, 4).map(p => (
            <button
              key={p.id}
              onClick={() => {
                loadDemoProfile(p.id);
                setCurrentView('dashboard');
              }}
              className="p-3 bg-white border border-slate-200 hover:border-indigo-500 rounded-xl text-left shadow-2xs hover:shadow-xs transition-all group"
            >
              <div className="flex items-center gap-2.5">
                <img src={p.avatarUrl} alt={p.name} className="w-9 h-9 rounded-full object-cover border border-slate-200 shrink-0" />
                <div className="min-w-0">
                  <div className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 truncate">{p.name}</div>
                  <div className="text-[11px] text-slate-500 truncate">{p.itiTrade.split(' ')[0]}</div>
                </div>
              </div>
              <div className="mt-2 text-[10px] text-slate-600 flex items-center justify-between">
                <span>Target: {p.targetRole.split(' ')[0]}</span>
                <span className="text-indigo-600 font-bold">Simulate →</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Final Landing CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-t border-slate-200 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
            "Your skills are your starting point. Your career is the destination."
          </p>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Experience the complete end-to-end ITI career intelligence prototype.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              id="landing-final-cta-btn"
              onClick={handleStartAssessment}
              className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white rounded-xl font-bold text-sm shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2 transition-all"
            >
              <span>Start Your Career Assessment</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={handleTryDemoProfile}
              className="w-full sm:w-auto px-6 py-4 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-semibold text-sm transition-all"
            >
              Open Active Dashboard Directly
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
