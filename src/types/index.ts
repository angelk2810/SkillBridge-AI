export type SkillProficiency = 'Beginner' | 'Intermediate' | 'Advanced';

export interface UserSkill {
  name: string;
  level: SkillProficiency;
  category?: 'Programming' | 'Database' | 'Web' | 'Electrical' | 'Mechanical' | 'Automation' | 'Hardware' | 'Electronics' | 'Tools' | 'Soft Skills';
  verified?: boolean;
}

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  age: number;
  location: string;
  education: string;
  itiTrade: string;
  institutionName: string;
  graduationYear: number;
  skills: UserSkill[];
  certifications: string[];
  interests: string[];
  targetRole: string;
  preferredIndustry: string;
  locationPreference: string;
  workModePreference: 'Remote' | 'On-site' | 'Hybrid';
  salaryExpectation: string;
  experienceLevel: 'Entry-Level' | 'Apprenticeship Completed' | '1-2 Years';
  completedRoadmapTaskIds: string[];
  resumeText?: string;
  resumeFileName?: string;
  createdAt: string;
  lastUpdated: string;
}

export interface RequiredSkill {
  name: string;
  requiredLevel: SkillProficiency;
  weight: number; // 1 to 5 scale of criticality
  category: 'Core' | 'Secondary' | 'Emerging';
  description: string;
}

export interface CareerRole {
  id: string;
  title: string;
  category: 'Software & IT' | 'Electronics & Hardware' | 'Electrical & Power' | 'Manufacturing & Mechanical' | 'Automation & IoT';
  description: string;
  shortSummary: string;
  suitableTrades: string[];
  averageSalaryRange: string;
  industryDemand: 'Very High' | 'High' | 'Moderate';
  hiringCompanies: string[];
  requiredSkills: RequiredSkill[];
  recommendedCertifications: string[];
}

export interface JobPosting {
  id: string;
  title: string;
  company: string;
  location: string;
  city: string;
  state: string;
  type: 'Full-time' | 'Apprenticeship' | 'Internship' | 'Contract';
  workMode: 'On-site' | 'Hybrid' | 'Remote';
  experienceRequired: string;
  salary: string;
  postedDaysAgo: number;
  openings: number;
  description: string;
  targetRole: string;
  industry: string;
  requiredSkills: { name: string; requiredLevel: SkillProficiency }[];
  preferredCertifications: string[];
  isDemoVerified: boolean;
  applicationDeadline: string;
}

export interface SkillGapItem {
  skillName: string;
  userLevel: SkillProficiency | 'None';
  userLevelScore: number; // 0, 33, 66, 100
  requiredLevel: SkillProficiency;
  requiredLevelScore: number; // 33, 66, 100
  gapScore: number; // required - user (positive means deficit)
  status: 'Strong' | 'Developing' | 'Missing';
  category: string;
  criticality: 'Core' | 'Secondary' | 'Emerging';
  recommendation: string;
  estimatedTimeToMaster: string;
  learningResource?: {
    title: string;
    provider: string;
    url?: string;
  };
}

export interface ScoreComponent {
  label: string;
  score: number;
  weight: number;
  weightedContribution: number;
  description: string;
  status: 'High' | 'Moderate' | 'Low';
}

export interface ReadinessScoreResult {
  overallScore: number;
  previousScore?: number;
  scoreDelta: number;
  readinessBand: 'Job Ready' | 'Industry Aligned' | 'Developing Competency' | 'Needs Foundation';
  color: string;
  components: {
    technicalSkills: ScoreComponent;
    certifications: ScoreComponent;
    experience: ScoreComponent;
    industryAlignment: ScoreComponent;
    jobCompatibility: ScoreComponent;
    locationAlignment: ScoreComponent;
  };
  explanation: {
    summary: string;
    topStrengths: string[];
    topGaps: string[];
    actionableAdvice: string;
    affectingFactors: {
      positive: string[];
      negative: string[];
    };
  };
}

export interface JobMatchResult {
  job: JobPosting;
  overallMatch: number;
  technicalMatch: number;
  educationMatch: number;
  certificationMatch: number;
  interestMatch: number;
  experienceMatch: number;
  locationMatch: number;
  strongSkills: string[];
  partialSkills: string[];
  missingSkills: string[];
  matchReasoning: string;
  holdingBackFactors: string[];
  isTopRecommendation: boolean;
}

export interface RoadmapTask {
  id: string;
  phaseId: number;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedHours: number;
  estimatedDurationDays: number;
  skillGained: string;
  category: 'Foundation' | 'Hands-on Tool' | 'Project' | 'Certification' | 'Interview Prep';
  impactOnReadiness: number; // points added to readiness upon completion
  resources: {
    title: string;
    provider: string;
    type: 'Course' | 'Project' | 'Documentation' | 'Video Tutorial';
    link: string;
    isFree: boolean;
  }[];
}

export interface RoadmapPhase {
  phaseNumber: number;
  title: string;
  duration: string;
  description: string;
  badge: string;
  tasks: RoadmapTask[];
}

export interface UpskillingRoadmap {
  targetRole: string;
  generatedAt: string;
  currentReadiness: number;
  projectedReadiness: number;
  totalEstimatedWeeks: number;
  phases: RoadmapPhase[];
  completedTaskCount: number;
  totalTaskCount: number;
  completionPercentage: number;
}

export interface ResumeAnalysisResult {
  fileName: string;
  targetRole: string;
  skillCoveragePercentage: number;
  extractedProfile: {
    name: string;
    education: string;
    trade: string;
    extractedSkills: string[];
    extractedCertifications: string[];
    extractedProjects: string[];
    experienceSummary: string;
  };
  matchedSkills: string[];
  missingKeywords: string[];
  formattingScore: number;
  impactScore: number;
  actionableSuggestions: {
    category: 'Skills' | 'Projects' | 'Keywords' | 'Metrics';
    recommendation: string;
    impact: 'High' | 'Medium';
  }[];
}

export interface InstitutionAnalytics {
  totalStudents: number;
  averageReadiness: number;
  topSkillGaps: { skill: string; count: number; percentage: number; trade: string }[];
  desiredRolesDistribution: { role: string; count: number; percentage: number }[];
  readinessDistribution: { category: string; count: number; percentage: number; color: string }[];
  trainingPriorities: {
    skill: string;
    priority: 'Critical' | 'High' | 'Medium';
    affectedStudents: number;
    recommendedAction: string;
    targetTrades: string[];
  }[];
  tradePerformance: {
    trade: string;
    students: number;
    avgReadiness: number;
    topRole: string;
    topGap: string;
    placementReadyPercentage: number;
  }[];
  monthlyReadinessTrend: {
    month: string;
    averageScore: number;
    industryInterviews: number;
    skillsMastered: number;
  }[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestedActions?: { label: string; actionType: 'view_gap' | 'view_jobs' | 'view_roadmap' | 'switch_role'; payload?: string }[];
}
