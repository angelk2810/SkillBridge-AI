import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  User,
  GraduationCap,
  Wrench,
  Award,
  Heart,
  Target,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Plus,
  Trash2,
  Sparkles,
  Info,
  Layers,
  Search,
  Briefcase
} from 'lucide-react';
import { ALL_AVAILABLE_SKILLS, CAREER_ROLES } from '../data/demoData';
import { SkillProficiency, UserSkill } from '../types';

export const StudentOnboarding: React.FC = () => {
  const {
    studentProfile,
    updateProfile,
    setCurrentView,
    addToast,
    resetToDefaultProfile
  } = useApp();

  const [step, setStep] = useState<number>(1);

  // Form State initialized with current profile
  const [formData, setFormData] = useState({
    name: studentProfile.name,
    age: studentProfile.age,
    location: studentProfile.location,
    education: studentProfile.education,
    itiTrade: studentProfile.itiTrade,
    institutionName: studentProfile.institutionName || 'Government ITI',
    graduationYear: studentProfile.graduationYear,
    skills: [...studentProfile.skills],
    certifications: [...studentProfile.certifications],
    interests: [...studentProfile.interests],
    targetRole: studentProfile.targetRole,
    preferredIndustry: studentProfile.preferredIndustry,
    locationPreference: studentProfile.locationPreference,
    workModePreference: studentProfile.workModePreference,
    salaryExpectation: studentProfile.salaryExpectation,
    experienceLevel: studentProfile.experienceLevel
  });

  const [skillSearchQuery, setSkillSearchQuery] = useState('');
  const [selectedSkillCategory, setSelectedSkillCategory] = useState<string>('All');
  const [newCertInput, setNewCertInput] = useState('');

  const commonInterests = [
    'Software Development',
    'Data Analytics',
    'Web Development',
    'Electrical Maintenance',
    'Manufacturing & Machining',
    'Industrial Automation & PLC',
    'Networking & IT Support',
    'CAD & 3D Mechanical Design',
    'Electronics Hardware & PCB',
    'Renewable Solar Energy'
  ];

  const commonCerts = [
    'NCVT National Trade Certificate',
    'NPTEL Programming in Python (Elite)',
    'Bharat Skills IT & Web Certificate',
    'State Electrical Wireman License Class-B',
    'Siemens Automation Certified Associate',
    'Autodesk Certified Professional: AutoCAD',
    'Coursera Google Data Analytics Badge',
    'freeCodeCamp Responsive Web Design',
    'Fanuc CNC Operator Certification',
    'Schneider Electric Low Voltage Safety'
  ];

  const itiTradesList = [
    'COPA (Computer Operator & Programming Assistant)',
    'Electrician',
    'Electronics Mechanic',
    'Fitter',
    'Machinist',
    'Turner',
    'Draughtsman Mechanical',
    'Information Technology',
    'Instrument Mechanic',
    'Welder',
    'Mechanic Motor Vehicle',
    'IoT Technician (Smart City)'
  ];

  const handleSkillToggle = (skillName: string, category?: any) => {
    setFormData(prev => {
      const exists = prev.skills.some(s => s.name.toLowerCase() === skillName.toLowerCase());
      if (exists) {
        return {
          ...prev,
          skills: prev.skills.filter(s => s.name.toLowerCase() !== skillName.toLowerCase())
        };
      } else {
        return {
          ...prev,
          skills: [...prev.skills, { name: skillName, level: 'Intermediate', category, verified: true }]
        };
      }
    });
  };

  const handleProficiencyChange = (skillName: string, level: SkillProficiency) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.map(s => (s.name.toLowerCase() === skillName.toLowerCase() ? { ...s, level } : s))
    }));
  };

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => {
      const exists = prev.interests.includes(interest);
      return {
        ...prev,
        interests: exists ? prev.interests.filter(i => i !== interest) : [...prev.interests, interest]
      };
    });
  };

  const handleCertToggle = (cert: string) => {
    setFormData(prev => {
      const exists = prev.certifications.includes(cert);
      return {
        ...prev,
        certifications: exists ? prev.certifications.filter(c => c !== cert) : [...prev.certifications, cert]
      };
    });
  };

  const handleAddCustomCert = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCertInput.trim() && !formData.certifications.includes(newCertInput.trim())) {
      setFormData(prev => ({
        ...prev,
        certifications: [...prev.certifications, newCertInput.trim()]
      }));
      setNewCertInput('');
    }
  };

  const handleSaveAndAnalyze = () => {
    updateProfile(formData);
    addToast({
      type: 'success',
      title: 'Skills & Profile Saved',
      message: 'AI Skill Gap engine recalibrated. Redirecting to your dashboard...'
    });
    setCurrentView('dashboard');
  };

  const handleLoadSampleCOPA = () => {
    resetToDefaultProfile();
    setFormData({
      name: 'Arjun Kumar',
      age: 20,
      location: 'Bengaluru, Karnataka',
      education: 'ITI Certificate (2-Year)',
      itiTrade: 'COPA (Computer Operator & Programming Assistant)',
      institutionName: 'Govt. Model ITI Peenya, Bengaluru',
      graduationYear: 2024,
      skills: [
        { name: 'Python', level: 'Intermediate', category: 'Programming', verified: true },
        { name: 'SQL', level: 'Intermediate', category: 'Database', verified: true },
        { name: 'HTML / CSS', level: 'Advanced', category: 'Web', verified: true },
        { name: 'JavaScript', level: 'Beginner', category: 'Web', verified: false },
        { name: 'Excel Advanced', level: 'Intermediate', category: 'Database', verified: true },
        { name: 'Operating System Installation & Troubleshooting', level: 'Advanced', category: 'Hardware', verified: true }
      ],
      certifications: [
        'NCVT National Trade Certificate (COPA)',
        'NPTEL Introduction to Python Programming (Elite)',
        'Bharat Skills Basic Computing & IT'
      ],
      interests: ['Software Development', 'Data Analytics', 'Web Development'],
      targetRole: 'Junior Software Developer',
      preferredIndustry: 'IT & Software Services',
      locationPreference: 'Bengaluru / Hyderabad / Remote',
      workModePreference: 'Hybrid',
      salaryExpectation: '₹3.5 - 4.5 LPA',
      experienceLevel: 'Entry-Level'
    });
    addToast({
      type: 'info',
      title: 'Sample Data Loaded',
      message: 'Loaded sample ITI COPA profile for demo evaluation.'
    });
  };

  const filteredSkills = ALL_AVAILABLE_SKILLS.filter(s => {
    const matchesQuery = s.name.toLowerCase().includes(skillSearchQuery.toLowerCase());
    const matchesCategory = selectedSkillCategory === 'All' || s.category === selectedSkillCategory;
    return matchesQuery && matchesCategory;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header & Progress indicator */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Comprehensive Student Assessment
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Skill & Career Profile Assessment
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Provide your vocational background to calculate precision skill gaps and match live industry roles.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleLoadSampleCOPA}
              className="px-3.5 py-2 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-xl border border-indigo-200 transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" /> Auto-Fill Demo Profile
            </button>
          </div>
        </div>

        {/* 5-Step Progress Bar */}
        <div className="mt-6">
          <div className="flex items-center justify-between text-xs font-bold text-slate-600 mb-2">
            <span>Step {step} of 5</span>
            <span className="text-indigo-600">
              {step === 1 && '1. Personal Profile & ITI Trade'}
              {step === 2 && '2. Technical Skills Matrix'}
              {step === 3 && '3. Verified Certifications'}
              {step === 4 && '4. Domain Interests'}
              {step === 5 && '5. Career Preferences'}
            </span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden flex">
            {[1, 2, 3, 4, 5].map(s => (
              <div
                key={s}
                className={`h-full flex-1 transition-all duration-300 ${
                  s <= step ? 'bg-indigo-600' : 'bg-transparent'
                } ${s > 1 ? 'border-l border-white/40' : ''}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main Form Body Container */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
        {/* STEP 1: Personal Profile & ITI Trade */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <User className="w-5 h-5 text-indigo-600" />
                Step 1 — Personal Details & ITI Trade
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Your educational background anchors the industry benchmark and trade matching algorithms.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g. Arjun Kumar"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Age *
                </label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={e => setFormData({ ...formData, age: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g. 21"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Current Location / City *
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={e => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g. Bengaluru, Karnataka"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  ITI Trade Specialization *
                </label>
                <select
                  value={formData.itiTrade}
                  onChange={e => setFormData({ ...formData, itiTrade: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {itiTradesList.map((trade, idx) => (
                    <option key={idx} value={trade}>
                      {trade}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Institution / ITI College Name
                </label>
                <input
                  type="text"
                  value={formData.institutionName}
                  onChange={e => setFormData({ ...formData, institutionName: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g. Govt. Model ITI Peenya"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Graduation / Passing Year
                </label>
                <select
                  value={formData.graduationYear}
                  onChange={e => setFormData({ ...formData, graduationYear: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {[2026, 2025, 2024, 2023, 2022, 2021].map(yr => (
                    <option key={yr} value={yr}>
                      {yr}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Technical Skills Matrix */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Wrench className="w-5 h-5 text-indigo-600" />
                    Step 2 — Technical Skills & Proficiency Matrix
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Select your competencies and assign proficiency (Beginner, Intermediate, Advanced).
                  </p>
                </div>
                <div className="text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full">
                  {formData.skills.length} Skills Selected
                </div>
              </div>
            </div>

            {/* Skill Search & Filter Bar */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Search vocational & technical skills (e.g. Python, SQL, AutoCAD, PLC, Wiring)..."
                  value={skillSearchQuery}
                  onChange={e => setSkillSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex gap-1.5 overflow-x-auto pb-1">
                {['All', 'Programming', 'Database', 'Web', 'Electrical', 'Mechanical', 'Automation', 'Hardware'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedSkillCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                      selectedSkillCategory === cat
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Skills with Proficiency Pickers */}
            {formData.skills.length > 0 && (
              <div className="bg-indigo-50/40 border border-indigo-100 rounded-xl p-4">
                <div className="text-xs font-bold text-indigo-900 uppercase tracking-wider mb-3">
                  Your Selected Skill Inventory & Proficiency
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {formData.skills.map((skill, idx) => (
                    <div key={idx} className="bg-white border border-slate-200 rounded-xl p-3 flex items-center justify-between gap-3 shadow-2xs">
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-slate-900 truncate">{skill.name}</div>
                        <div className="text-[10px] text-slate-400">{skill.category || 'Skill'}</div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <select
                          value={skill.level}
                          onChange={e => handleProficiencyChange(skill.name, e.target.value as SkillProficiency)}
                          className={`text-xs font-bold px-2 py-1 rounded-lg border focus:outline-none ${
                            skill.level === 'Advanced'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                              : skill.level === 'Intermediate'
                              ? 'bg-blue-50 text-blue-700 border-blue-300'
                              : 'bg-amber-50 text-amber-700 border-amber-300'
                          }`}
                        >
                          <option value="Beginner">Beginner</option>
                          <option value="Intermediate">Intermediate</option>
                          <option value="Advanced">Advanced</option>
                        </select>

                        <button
                          onClick={() => handleSkillToggle(skill.name)}
                          className="p-1 text-slate-400 hover:text-rose-600 rounded-md transition-colors"
                          title="Remove skill"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Available Skills Grid */}
            <div>
              <div className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2.5">
                Click to Add / Toggle Skills from Catalog
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-h-64 overflow-y-auto p-1">
                {filteredSkills.map((s, idx) => {
                  const isSelected = formData.skills.some(userSkill => userSkill.name.toLowerCase() === s.name.toLowerCase());
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSkillToggle(s.name, s.category)}
                      className={`p-2.5 rounded-xl border text-left text-xs font-semibold flex items-center justify-between transition-all ${
                        isSelected
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                          : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800'
                      }`}
                    >
                      <span className="truncate mr-1">{s.name}</span>
                      {isSelected ? (
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-white" />
                      ) : (
                        <Plus className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Certifications */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Award className="w-5 h-5 text-indigo-600" />
                Step 3 — Industry & Vocational Certifications
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Verified certifications increase your employer credibility and raise your certification score factor by up to 25 pts.
              </p>
            </div>

            <div>
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                Select Common Recognized Certifications
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {commonCerts.map((cert, idx) => {
                  const isSelected = formData.certifications.includes(cert);
                  return (
                    <button
                      key={idx}
                      onClick={() => handleCertToggle(cert)}
                      className={`p-3 rounded-xl border text-left text-xs font-semibold flex items-center justify-between transition-all ${
                        isSelected
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-900 shadow-2xs'
                          : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      <span className="truncate mr-2">{cert}</span>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom Certification Input */}
            <form onSubmit={handleAddCustomCert} className="pt-4 border-t border-slate-100">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Add Other Custom Certificate
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. Siemens S7-1200 Automation Badge"
                  value={newCertInput}
                  onChange={e => setNewCertInput(e.target.value)}
                  className="flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition-colors"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        )}

        {/* STEP 4: Interests */}
        {step === 4 && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Heart className="w-5 h-5 text-indigo-600" />
                Step 4 — Career Interests & Focus Areas
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Your stated interests refine the job compatibility weighting in our recommendation model.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {commonInterests.map((interest, idx) => {
                const isSelected = formData.interests.includes(interest);
                return (
                  <button
                    key={idx}
                    onClick={() => handleInterestToggle(interest)}
                    className={`p-3.5 rounded-xl border text-left text-xs font-semibold flex items-center justify-between transition-all ${
                      isSelected
                        ? 'bg-indigo-50 border-indigo-300 text-indigo-900 shadow-2xs'
                        : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <span className="truncate mr-2">{interest}</span>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 5: Career Preferences */}
        {step === 5 && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Target className="w-5 h-5 text-indigo-600" />
                Step 5 — Career Target & Work Preferences
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Designate your desired career goal to benchmark against specific industry skill gaps.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Target Career Role *
                </label>
                <select
                  value={formData.targetRole}
                  onChange={e => setFormData({ ...formData, targetRole: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-bold text-indigo-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {CAREER_ROLES.map(r => (
                    <option key={r.id} value={r.title}>
                      {r.title} ({r.category})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Preferred Industry Sector
                </label>
                <input
                  type="text"
                  value={formData.preferredIndustry}
                  onChange={e => setFormData({ ...formData, preferredIndustry: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g. IT & Software Services, Automotive"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Work Mode Preference
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['Hybrid', 'On-site', 'Remote'].map(mode => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setFormData({ ...formData, workModePreference: mode as any })}
                      className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                        formData.workModePreference === mode
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Experience Level
                </label>
                <select
                  value={formData.experienceLevel}
                  onChange={e => setFormData({ ...formData, experienceLevel: e.target.value as any })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Entry-Level">Entry-Level (Fresh Graduate)</option>
                  <option value="Apprenticeship Completed">Apprenticeship Completed (1 Year)</option>
                  <option value="1-2 Years">1-2 Years Industry Experience</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Preferred Location & Salary Expectation
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={formData.locationPreference}
                    onChange={e => setFormData({ ...formData, locationPreference: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900"
                    placeholder="e.g. Bengaluru / Hyderabad / Remote"
                  />
                  <input
                    type="text"
                    value={formData.salaryExpectation}
                    onChange={e => setFormData({ ...formData, salaryExpectation: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900"
                    placeholder="e.g. ₹3.5 - 4.5 LPA"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Wizard Footer Controls */}
        <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </button>
          ) : (
            <div />
          )}

          {step < 5 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
            >
              Continue to Step {step + 1}
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              id="save-and-analyze-skills-btn"
              onClick={handleSaveAndAnalyze}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-md shadow-emerald-600/20 transition-all active:scale-95"
            >
              <Sparkles className="w-4 h-4" />
              Save & Launch AI Skill Gap Analysis
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
