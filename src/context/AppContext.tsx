import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  StudentProfile,
  ReadinessScoreResult,
  JobMatchResult,
  UpskillingRoadmap,
  SkillGapItem,
  CareerRole,
  SkillProficiency
} from '../types';
import { DEMO_STUDENTS, CAREER_ROLES } from '../data/demoData';
import {
  calculateReadinessScore,
  calculateSkillGapAnalysis,
  matchJobsForProfile,
  generateUpskillingRoadmap
} from '../services/aiEngine';

export type AppView =
  | 'landing'
  | 'dashboard'
  | 'onboarding'
  | 'skill-gap'
  | 'job-matches'
  | 'roadmap'
  | 'resume-analyzer'
  | 'career-ai'
  | 'progress'
  | 'institution-insights'
  | 'map';

export interface ToastNotification {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: number;
}

interface AppContextType {
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  studentProfile: StudentProfile;
  setStudentProfile: React.Dispatch<React.SetStateAction<StudentProfile>>;
  updateProfile: (updates: Partial<StudentProfile>) => void;
  loadDemoProfile: (studentId: string) => void;
  resetToDefaultProfile: () => void;
  allDemoProfiles: StudentProfile[];

  // Computed AI Metrics (Reactive to Profile State)
  readinessScore: ReadinessScoreResult;
  skillGapAnalysis: ReturnType<typeof calculateSkillGapAnalysis>;
  jobMatches: JobMatchResult[];
  roadmap: UpskillingRoadmap;
  allCareerRoles: CareerRole[];

  // Actions
  updateSkill: (skillName: string, level: SkillProficiency) => void;
  addSkill: (skillName: string, level: SkillProficiency) => void;
  removeSkill: (skillName: string) => void;
  changeTargetRole: (newRole: string) => void;
  toggleRoadmapTask: (taskId: string) => void;

  // Presentation Mode / Evaluator Guided Tour
  isPresentationMode: boolean;
  setIsPresentationMode: (active: boolean) => void;
  presentationStep: number;
  setPresentationStep: (step: number) => void;
  nextPresentationStep: () => void;
  prevPresentationStep: () => void;
  exitPresentationMode: () => void;

  // Notification Toast System
  toasts: ToastNotification[];
  addToast: (toast: Omit<ToastNotification, 'id' | 'timestamp'>) => void;
  removeToast: (id: string) => void;

  // Explainability Modal state
  activeExplainJob: JobMatchResult | null;
  setActiveExplainJob: (job: JobMatchResult | null) => void;
  isScoreBreakdownOpen: boolean;
  setIsScoreBreakdownOpen: (open: boolean) => void;
}

const STORAGE_KEY = 'skillbridge_active_profile_v1';

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Navigation View State
  const [currentView, setCurrentView] = useState<AppView>('landing');

  // Student Profile State with LocalStorage Persistence
  const [studentProfile, setStudentProfile] = useState<StudentProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to load profile from storage', e);
    }
    return DEMO_STUDENTS[0]; // Default Arjun Kumar (COPA ITI Graduate)
  });

  // Presentation Mode
  const [isPresentationMode, setIsPresentationMode] = useState<boolean>(false);
  const [presentationStep, setPresentationStep] = useState<number>(0);

  // Toasts
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  // Explainability Modals
  const [activeExplainJob, setActiveExplainJob] = useState<JobMatchResult | null>(null);
  const [isScoreBreakdownOpen, setIsScoreBreakdownOpen] = useState<boolean>(false);

  // Persist Profile to LocalStorage on changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(studentProfile));
    } catch (e) {
      console.warn('Failed to save profile to storage', e);
    }
  }, [studentProfile]);

  // Reactive AI Calculations
  const readinessScore = calculateReadinessScore(studentProfile);
  const skillGapAnalysis = calculateSkillGapAnalysis(studentProfile);
  const jobMatches = matchJobsForProfile(studentProfile);
  const roadmap = generateUpskillingRoadmap(studentProfile);

  const addToast = (toast: Omit<ToastNotification, 'id' | 'timestamp'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: ToastNotification = {
      ...toast,
      id,
      timestamp: Date.now()
    };
    setToasts(prev => [...prev, newToast]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const updateProfile = (updates: Partial<StudentProfile>) => {
    setStudentProfile(prev => ({
      ...prev,
      ...updates,
      lastUpdated: new Date().toISOString()
    }));
    addToast({
      type: 'success',
      title: 'Profile Updated',
      message: 'AI skill gap and matching models recalibrated successfully.'
    });
  };

  const loadDemoProfile = (studentId: string) => {
    const found = DEMO_STUDENTS.find(s => s.id === studentId);
    if (found) {
      setStudentProfile(found);
      addToast({
        type: 'info',
        title: `Profile Loaded: ${found.name}`,
        message: `Trade: ${found.itiTrade} | Target: ${found.targetRole}`
      });
    }
  };

  const resetToDefaultProfile = () => {
    setStudentProfile(DEMO_STUDENTS[0]);
    addToast({
      type: 'info',
      title: 'Profile Reset',
      message: 'Loaded baseline profile: Arjun Kumar (COPA ITI Graduate).'
    });
  };

  const updateSkill = (skillName: string, level: SkillProficiency) => {
    setStudentProfile(prev => {
      const existing = prev.skills.find(s => s.name.toLowerCase() === skillName.toLowerCase());
      let updatedSkills = [...prev.skills];
      if (existing) {
        updatedSkills = updatedSkills.map(s =>
          s.name.toLowerCase() === skillName.toLowerCase() ? { ...s, level } : s
        );
      } else {
        updatedSkills.push({ name: skillName, level, verified: true });
      }
      return {
        ...prev,
        skills: updatedSkills,
        lastUpdated: new Date().toISOString()
      };
    });
    addToast({
      type: 'success',
      title: 'Skill Updated',
      message: `${skillName} is now set to ${level}. Recalculating readiness...`
    });
  };

  const addSkill = (skillName: string, level: SkillProficiency) => {
    updateSkill(skillName, level);
  };

  const removeSkill = (skillName: string) => {
    setStudentProfile(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s.name.toLowerCase() !== skillName.toLowerCase()),
      lastUpdated: new Date().toISOString()
    }));
    addToast({
      type: 'info',
      title: 'Skill Removed',
      message: `${skillName} removed from profile.`
    });
  };

  const changeTargetRole = (newRole: string) => {
    setStudentProfile(prev => ({
      ...prev,
      targetRole: newRole,
      lastUpdated: new Date().toISOString()
    }));
    addToast({
      type: 'info',
      title: 'Target Role Switched',
      message: `Target role changed to ${newRole}. New skill benchmark generated.`
    });
  };

  const toggleRoadmapTask = (taskId: string) => {
    setStudentProfile(prev => {
      const currentCompleted = prev.completedRoadmapTaskIds || [];
      const isAlreadyCompleted = currentCompleted.includes(taskId);
      const updated = isAlreadyCompleted
        ? currentCompleted.filter(id => id !== taskId)
        : [...currentCompleted, taskId];

      return {
        ...prev,
        completedRoadmapTaskIds: updated,
        lastUpdated: new Date().toISOString()
      };
    });

    const isAlreadyCompleted = (studentProfile.completedRoadmapTaskIds || []).includes(taskId);
    if (!isAlreadyCompleted) {
      addToast({
        type: 'success',
        title: 'Milestone Completed! 🎉',
        message: 'Your practical progress has boosted your Career Readiness score.'
      });
    } else {
      addToast({
        type: 'info',
        title: 'Task Unchecked',
        message: 'Task marked as in-progress.'
      });
    }
  };

  // Presentation Mode Flow
  const presentationStepsList: AppView[] = [
    'landing',
    'dashboard',
    'skill-gap',
    'job-matches',
    'roadmap',
    'resume-analyzer',
    'career-ai',
    'institution-insights'
  ];

  const nextPresentationStep = () => {
    if (presentationStep < presentationStepsList.length - 1) {
      const nextStep = presentationStep + 1;
      setPresentationStep(nextStep);
      setCurrentView(presentationStepsList[nextStep]);
    } else {
      exitPresentationMode();
    }
  };

  const prevPresentationStep = () => {
    if (presentationStep > 0) {
      const prevStep = presentationStep - 1;
      setPresentationStep(prevStep);
      setCurrentView(presentationStepsList[prevStep]);
    }
  };

  const exitPresentationMode = () => {
    setIsPresentationMode(false);
    setPresentationStep(0);
    addToast({
      type: 'info',
      title: 'Presentation Mode Exited',
      message: 'You can now explore the prototype freely.'
    });
  };

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        studentProfile,
        setStudentProfile,
        updateProfile,
        loadDemoProfile,
        resetToDefaultProfile,
        allDemoProfiles: DEMO_STUDENTS,
        readinessScore,
        skillGapAnalysis,
        jobMatches,
        roadmap,
        allCareerRoles: CAREER_ROLES,
        updateSkill,
        addSkill,
        removeSkill,
        changeTargetRole,
        toggleRoadmapTask,
        isPresentationMode,
        setIsPresentationMode,
        presentationStep,
        setPresentationStep,
        nextPresentationStep,
        prevPresentationStep,
        exitPresentationMode,
        toasts,
        addToast,
        removeToast,
        activeExplainJob,
        setActiveExplainJob,
        isScoreBreakdownOpen,
        setIsScoreBreakdownOpen
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
