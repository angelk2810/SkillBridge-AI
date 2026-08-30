import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  FileText,
  Upload,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  FileCheck,
  Award,
  RefreshCw,
  Search,
  Check
} from 'lucide-react';
import { analyzeResumeText } from '../services/aiEngine';
import { ResumeAnalysisResult } from '../types';

export const ResumeAnalyzerPage: React.FC = () => {
  const { studentProfile, addToast, setCurrentView } = useApp();

  const [resumeText, setResumeText] = useState<string>(
    `Rahul Sharma\nNational Trade Certificate (COPA) - NCVT Govt ITI\n\nTechnical Skills:\n- Python Programming (Loops, OOP basics, SQLite)\n- Database: SQL queries, MySQL, Table schemas\n- HTML5, CSS3 responsive page creation\n- Windows & Linux CLI basics\n\nAcademic Project:\n- Student Enrollment Database: Developed Python CLI tool storing 500+ records in SQLite.\n- Web Portfolio: Built personal responsive site using HTML5 & CSS3.`
  );
  const [fileName, setFileName] = useState<string>('Rahul_Sharma_COPA_Resume.pdf');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<ResumeAnalysisResult | null>(() =>
    analyzeResumeText(
      `Rahul Sharma\nNational Trade Certificate (COPA) - NCVT Govt ITI\n\nTechnical Skills:\n- Python Programming (Loops, OOP basics, SQLite)\n- Database: SQL queries, MySQL, Table schemas\n- HTML5, CSS3 responsive page creation\n- Windows & Linux CLI basics\n\nAcademic Project:\n- Student Enrollment Database: Developed Python CLI tool storing 500+ records in SQLite.\n- Web Portfolio: Built personal responsive site using HTML5 & CSS3.`,
      'Rahul_Sharma_COPA_Resume.pdf',
      studentProfile.targetRole
    )
  );

  const handleAnalyze = () => {
    if (!resumeText.trim()) return;

    setIsAnalyzing(true);
    setTimeout(() => {
      const result = analyzeResumeText(resumeText, fileName, studentProfile.targetRole);
      setAnalysisResult(result);
      setIsAnalyzing(false);
      addToast({
        type: 'success',
        title: 'Resume Analysis Complete ✨',
        message: `Extracted ${result.extractedProfile.extractedSkills.length} skills with ${result.skillCoveragePercentage}% target coverage.`
      });
    }, 600);
  };

  const handleSampleLoad = (roleTrade: string) => {
    let sample = '';
    let name = '';
    if (roleTrade === 'Electrician') {
      name = 'Vikas_Patel_Electrician_Resume.pdf';
      sample = `Vikas Patel\nNCVT Electrician Trade Certificate - Govt ITI\n\nSkills & Competencies:\n- Single & Three-Phase AC/DC Motor Wiring & Maintenance\n- Industrial Relay Logic, Contactor circuits, Transformer testing\n- Substation safety standards, Multimeter & Megger insulation testing\n- AutoCAD Electrical schematics reading\n\nApprenticeship Project:\n- Assisted 11kV Substation maintenance and panel wiring inspection.`;
    } else {
      name = 'Rahul_Sharma_COPA_Resume.pdf';
      sample = `Rahul Sharma\nNational Trade Certificate (COPA) - NCVT Govt ITI\n\nTechnical Skills:\n- Python Programming (Loops, OOP basics, SQLite)\n- Database: SQL queries, MySQL, Table schemas\n- HTML5, CSS3 responsive page creation\n- Windows & Linux CLI basics\n\nAcademic Project:\n- Student Enrollment Database: Developed Python CLI tool storing 500+ records in SQLite.\n- Web Portfolio: Built personal responsive site using HTML5 & CSS3.`;
    }

    setFileName(name);
    setResumeText(sample);
    const result = analyzeResumeText(sample, name, studentProfile.targetRole);
    setAnalysisResult(result);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Top Header Bento Card */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-2">
            <FileCheck className="w-3.5 h-3.5" />
            AI Resume & ATS Parser
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Resume Match & Skill Verification
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Extract vocational credentials, match against target role{' '}
            <strong className="text-slate-900">{studentProfile.targetRole}</strong>, and optimize keyword density.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-slate-400 font-semibold">Load Sample:</span>
          <button
            onClick={() => handleSampleLoad('COPA')}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-bold text-slate-700 transition-colors"
          >
            COPA (IT)
          </button>
          <button
            onClick={() => handleSampleLoad('Electrician')}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-bold text-slate-700 transition-colors"
          >
            Electrician
          </button>
        </div>
      </div>

      {/* Main 12-Col Bento Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Col 5: Resume Input Card */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-600" />
                Resume Plaintext & Metadata
              </h3>
              <span className="text-[11px] font-mono text-slate-400">{fileName}</span>
            </div>

            <textarea
              value={resumeText}
              onChange={e => setResumeText(e.target.value)}
              rows={14}
              placeholder="Paste raw resume text or type competencies here..."
              className="w-full text-xs font-mono p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 leading-relaxed resize-none"
            />
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
            <button
              onClick={() => handleSampleLoad('COPA')}
              className="text-xs text-slate-500 hover:text-slate-700 font-semibold"
            >
              Reset Text
            </button>

            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing || !resumeText.trim()}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-xs font-bold shadow-xs transition-colors flex items-center gap-2"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Parsing NLP Engine...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Run ATS Verification</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Col 7: Analysis & Keyword Extraction Bento Results */}
        <div className="lg:col-span-7 space-y-6">
          {analysisResult && (
            <>
              {/* Score KPI Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Target Coverage</span>
                  <div className="mt-2">
                    <span className="text-3xl font-black text-indigo-600">
                      {analysisResult.skillCoveragePercentage}%
                    </span>
                    <p className="text-[11px] text-slate-500 mt-1 font-medium">
                      Matched {analysisResult.matchedSkills.length} key competencies
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Formatting ATS Score</span>
                  <div className="mt-2">
                    <span className="text-3xl font-black text-emerald-600">
                      {analysisResult.formattingScore}/100
                    </span>
                    <p className="text-[11px] text-slate-500 mt-1 font-medium">Clean structure & hierarchy</p>
                  </div>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Action Impact Score</span>
                  <div className="mt-2">
                    <span className="text-3xl font-black text-slate-900">
                      {analysisResult.impactScore}/100
                    </span>
                    <p className="text-[11px] text-slate-500 mt-1 font-medium">Outcome-oriented phrasing</p>
                  </div>
                </div>
              </div>

              {/* Matched vs Missing Competency Breakdown */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
                <h3 className="font-bold text-base text-slate-900 mb-4">
                  Extracted Skills & Keyword Coverage
                </h3>

                <div className="space-y-4">
                  <div>
                    <span className="text-xs font-bold text-emerald-700 flex items-center gap-1.5 mb-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Verified Matched Competencies ({analysisResult.matchedSkills.length})
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {analysisResult.matchedSkills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-xs font-bold text-amber-700 flex items-center gap-1.5 mb-2">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                      Missing High-Demand Keywords ({analysisResult.missingKeywords.length})
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {analysisResult.missingKeywords.map((kw, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl text-xs font-bold"
                        >
                          + Add {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Actionable Suggestions Bento Card */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
                <h3 className="font-bold text-base text-slate-900 mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  Actionable AI Improvements
                </h3>

                <div className="space-y-3">
                  {analysisResult.actionableSuggestions.map((sug, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3"
                    >
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-800 shrink-0 mt-0.5">
                        {sug.category}
                      </span>
                      <div className="flex-1 text-xs text-slate-700 leading-relaxed font-medium">
                        {sug.recommendation}
                      </div>
                      <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 shrink-0">
                        {sug.impact} Impact
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500">Ready to boost your readiness?</span>
                  <button
                    onClick={() => setCurrentView('roadmap')}
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                  >
                    <span>Proceed to Upskilling Roadmap</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
