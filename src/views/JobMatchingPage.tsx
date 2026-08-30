import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Briefcase,
  Search,
  Filter,
  MapPin,
  IndianRupee,
  Building2,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Bookmark,
  BookmarkCheck,
  Send,
  ExternalLink,
  ChevronRight,
  Info,
  Clock,
  Layers,
  Check
} from 'lucide-react';
import { JobPosting, JobMatchResult } from '../types';

export const JobMatchingPage: React.FC = () => {
  const {
    jobMatches,
    studentProfile,
    setActiveExplainJob,
    addToast,
    setCurrentView
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [workModeFilter, setWorkModeFilter] = useState<string>('All');
  const [experienceFilter, setExperienceFilter] = useState<string>('All');
  const [savedJobIds, setSavedJobIds] = useState<string[]>([]);
  const [appliedJobIds, setAppliedJobIds] = useState<string[]>([]);
  const [selectedJobForDetails, setSelectedJobForDetails] = useState<JobMatchResult | null>(null);

  const filteredMatches = jobMatches.filter(match => {
    const job = match.job;
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.requiredSkills.some(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesWorkMode = workModeFilter === 'All' || job.workMode === workModeFilter;
    const matchesExperience = experienceFilter === 'All' || job.experienceRequired === experienceFilter;

    return matchesSearch && matchesWorkMode && matchesExperience;
  });

  const handleToggleSave = (jobId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (savedJobIds.includes(jobId)) {
      setSavedJobIds(savedJobIds.filter(id => id !== jobId));
      addToast({
        type: 'info',
        title: 'Job Removed from Saved',
        message: 'Job removed from your saved bookmarks.'
      });
    } else {
      setSavedJobIds([...savedJobIds, jobId]);
      addToast({
        type: 'success',
        title: 'Job Saved! 📌',
        message: 'You can review this opportunity anytime.'
      });
    }
  };

  const handleApply = (job: JobPosting, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!appliedJobIds.includes(job.id)) {
      setAppliedJobIds([...appliedJobIds, job.id]);
      addToast({
        type: 'success',
        title: 'Application Submitted! 🎉',
        message: `Profile sent to ${job.company} for ${job.title}. (Simulated Submission)`
      });
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Top Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-2">
              <Briefcase className="w-3.5 h-3.5" />
              Intelligent Matching Engine
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Curated Vocational Job Opportunities
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Showing {filteredMatches.length} opportunities ranked by mathematical skill compatibility for{' '}
              <strong className="text-slate-900">{studentProfile.name}</strong>.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-3 py-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl">
              {appliedJobIds.length} Applications Sent
            </span>
            <span className="text-xs font-bold px-3 py-1.5 bg-indigo-50 text-indigo-800 border border-indigo-200 rounded-xl">
              {savedJobIds.length} Saved
            </span>
          </div>
        </div>

        {/* Search & Filter Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-100">
          <div className="sm:col-span-2 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by job title, company, skills, or city..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <select
              value={workModeFilter}
              onChange={e => setWorkModeFilter(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none"
            >
              <option value="All">All Work Modes</option>
              <option value="On-site">On-site Only</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Remote">Remote</option>
            </select>
          </div>

          <div>
            <select
              value={experienceFilter}
              onChange={e => setExperienceFilter(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none"
            >
              <option value="All">All Experience Levels</option>
              <option value="Entry-Level / ITI Fresher">Entry-Level / ITI Fresher</option>
              <option value="0-1 Years / NAPS Apprentice">0-1 Years / NAPS Apprentice</option>
              <option value="1-2 Years Experience">1-2 Years Experience</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Jobs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredMatches.map((match, idx) => {
          const job = match.job;
          const isSaved = savedJobIds.includes(job.id);
          const isApplied = appliedJobIds.includes(job.id);

          return (
            <div
              key={job.id}
              onClick={() => setSelectedJobForDetails(match)}
              className="bg-white border border-slate-200 hover:border-indigo-400 rounded-2xl p-5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between cursor-pointer group relative"
            >
              <div>
                {/* Card Top: Work mode, Save bookmark, Match badge */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                      {job.workMode}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700">
                      {job.industry}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={e => handleToggleSave(job.id, e)}
                      className="p-1 rounded-lg text-slate-400 hover:text-indigo-600 transition-colors"
                      title={isSaved ? 'Remove Bookmark' : 'Save Bookmark'}
                    >
                      {isSaved ? (
                        <BookmarkCheck className="w-4 h-4 text-indigo-600 fill-indigo-600" />
                      ) : (
                        <Bookmark className="w-4 h-4" />
                      )}
                    </button>

                    <div className="text-right">
                      <span
                        className={`text-sm font-extrabold px-2.5 py-0.5 rounded-full ${
                          match.overallMatch >= 85
                            ? 'bg-emerald-100 text-emerald-800'
                            : match.overallMatch >= 70
                            ? 'bg-indigo-100 text-indigo-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {match.overallMatch}% Match
                      </span>
                    </div>
                  </div>
                </div>

                {/* Company & Job Title */}
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center font-extrabold text-slate-800 text-xs shrink-0">
                    {job.company.substring(0, 2).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors truncate">
                      {job.title}
                    </h3>
                    <p className="text-xs font-semibold text-slate-600 truncate">{job.company}</p>
                  </div>
                </div>

                {/* Location & Salary */}
                <div className="space-y-1 text-xs text-slate-500 my-3">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{job.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <IndianRupee className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="font-semibold text-slate-800">{job.salary}</span>
                  </div>
                </div>

                {/* Skill Match Pills Preview */}
                <div className="mt-3 pt-3 border-t border-slate-100">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Required Competencies:
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {job.requiredSkills.map((req, sIdx) => {
                      const isStrong = match.strongSkills.some(s => s.toLowerCase().includes(req.name.toLowerCase()));
                      const isMissing = match.missingSkills.some(s => s.toLowerCase().includes(req.name.toLowerCase()));

                      return (
                        <span
                          key={sIdx}
                          className={`text-[10px] px-2 py-0.5 rounded-md font-medium flex items-center gap-1 ${
                            isStrong
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                              : isMissing
                              ? 'bg-rose-50 text-rose-800 border border-rose-200'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {isStrong && <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />}
                          {isMissing && <AlertCircle className="w-2.5 h-2.5 text-rose-500" />}
                          <span>{req.name}</span>
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={e => {
                    e.stopPropagation();
                    setActiveExplainJob(match);
                  }}
                  className="text-xs text-indigo-600 hover:text-indigo-800 font-bold hover:underline"
                >
                  Why This Match?
                </button>

                <button
                  type="button"
                  onClick={e => handleApply(job, e)}
                  disabled={isApplied}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 ${
                    isApplied
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-default'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                  }`}
                >
                  {isApplied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      Applied
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      Quick Apply
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Job Full Details Modal */}
      {selectedJobForDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-2xl w-full p-6 sm:p-8 my-8 relative">
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 uppercase tracking-wider">
                  {selectedJobForDetails.job.workMode} • {selectedJobForDetails.job.category}
                </span>
                <h2 className="text-xl font-bold text-slate-900 mt-2">
                  {selectedJobForDetails.job.title}
                </h2>
                <p className="text-xs text-slate-600 font-semibold mt-0.5">
                  {selectedJobForDetails.job.company} • {selectedJobForDetails.job.location}
                </p>
              </div>
              <button
                onClick={() => setSelectedJobForDetails(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-4 text-xs text-slate-700">
              <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-xl">
                <div>
                  <span className="text-slate-400 block font-medium">Salary Package:</span>
                  <span className="font-bold text-slate-900 text-sm">{selectedJobForDetails.job.salary}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Experience Needed:</span>
                  <span className="font-bold text-slate-900">{selectedJobForDetails.job.experienceRequired}</span>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-1.5">Job Overview</h4>
                <p className="leading-relaxed text-slate-600">{selectedJobForDetails.job.description}</p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-1.5">Trade & Education Eligibility</h4>
                <p className="leading-relaxed text-slate-600">{selectedJobForDetails.job.educationEligibility}</p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-1.5">Key Responsibilities</h4>
                <ul className="list-disc pl-4 space-y-1 text-slate-600">
                  {selectedJobForDetails.job.responsibilities.map((r, idx) => (
                    <li key={idx}>{r}</li>
                  ))}
                </ul>
              </div>

              <div className="p-3 bg-indigo-50/70 border border-indigo-100 rounded-xl">
                <span className="font-bold text-indigo-900">AI Compatibility Analysis:</span>
                <p className="mt-1 text-indigo-950">{selectedJobForDetails.matchReasoning}</p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => {
                  setActiveExplainJob(selectedJobForDetails);
                  setSelectedJobForDetails(null);
                }}
                className="text-xs text-indigo-600 font-bold hover:underline"
              >
                Inspect 6-Factor AI Weights
              </button>

              <button
                onClick={() => {
                  handleApply(selectedJobForDetails.job);
                  setSelectedJobForDetails(null);
                }}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-xs"
              >
                Apply for this Position
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
