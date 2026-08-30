import {
  StudentProfile,
  CareerRole,
  SkillGapItem,
  ReadinessScoreResult,
  JobMatchResult,
  JobPosting,
  UpskillingRoadmap,
  RoadmapPhase,
  RoadmapTask,
  SkillProficiency,
  ResumeAnalysisResult
} from '../types';
import { CAREER_ROLES, DEMO_JOBS, ALL_AVAILABLE_SKILLS } from '../data/demoData';

// Numerical mapping for skills
export const PROFICIENCY_NUMERICAL: Record<SkillProficiency | 'None', number> = {
  None: 0,
  Beginner: 33.33,
  Intermediate: 66.66,
  Advanced: 100
};

export const LEVEL_MAP: Record<string, SkillProficiency> = {
  '3': 'Advanced',
  '2': 'Intermediate',
  '1': 'Beginner',
  '0': 'Beginner'
};

/**
 * Calculates detailed Skill Gap Analysis for a Student Profile against a Target Role
 */
export function calculateSkillGapAnalysis(profile: StudentProfile, targetRoleTitle?: string): {
  role: CareerRole;
  gaps: SkillGapItem[];
  strongSkills: SkillGapItem[];
  developingSkills: SkillGapItem[];
  missingSkills: SkillGapItem[];
  summaryText: string;
  overallCompetencyCoverage: number;
} {
  const roleName = targetRoleTitle || profile.targetRole;
  const role = CAREER_ROLES.find(r => r.title.toLowerCase() === roleName.toLowerCase()) || CAREER_ROLES[0];

  const userSkillsMap = new Map<string, SkillProficiency>();
  profile.skills.forEach(s => {
    userSkillsMap.set(s.name.toLowerCase().trim(), s.level);
  });

  const gaps: SkillGapItem[] = [];
  const strongSkills: SkillGapItem[] = [];
  const developingSkills: SkillGapItem[] = [];
  const missingSkills: SkillGapItem[] = [];

  let totalWeightedScore = 0;
  let totalMaxWeight = 0;

  role.requiredSkills.forEach(req => {
    const userLevel = userSkillsMap.get(req.name.toLowerCase().trim()) || 'None';
    const userScore = PROFICIENCY_NUMERICAL[userLevel];
    const reqScore = PROFICIENCY_NUMERICAL[req.requiredLevel];

    const gapScore = Math.max(0, reqScore - userScore);
    totalWeightedScore += Math.min(userScore, reqScore) * req.weight;
    totalMaxWeight += reqScore * req.weight;

    let status: 'Strong' | 'Developing' | 'Missing' = 'Missing';
    if (userScore >= reqScore) {
      status = 'Strong';
    } else if (userScore > 0) {
      status = 'Developing';
    } else {
      status = 'Missing';
    }

    let recommendation = '';
    let estimatedTimeToMaster = '2-3 weeks';

    if (status === 'Strong') {
      recommendation = `Proficiency meets or exceeds industry standard for ${role.title}. Continue maintaining hands-on practice.`;
      estimatedTimeToMaster = 'Mastered';
    } else if (status === 'Developing') {
      recommendation = `Upgrade from ${userLevel} to ${req.requiredLevel} by completing practical labs and real-world project tasks.`;
      estimatedTimeToMaster = req.requiredLevel === 'Advanced' ? '3-4 weeks' : '1-2 weeks';
    } else {
      recommendation = `Crucial competency missing. Start with foundational tutorials and basic exercises.`;
      estimatedTimeToMaster = req.requiredLevel === 'Advanced' ? '4-6 weeks' : '2-3 weeks';
    }

    const gapItem: SkillGapItem = {
      skillName: req.name,
      userLevel,
      userLevelScore: Math.round(userScore),
      requiredLevel: req.requiredLevel,
      requiredLevelScore: Math.round(reqScore),
      gapScore: Math.round(gapScore),
      status,
      category: req.category,
      criticality: req.category,
      recommendation,
      estimatedTimeToMaster
    };

    gaps.push(gapItem);

    if (status === 'Strong') strongSkills.push(gapItem);
    else if (status === 'Developing') developingSkills.push(gapItem);
    else missingSkills.push(gapItem);
  });

  const overallCompetencyCoverage = totalMaxWeight > 0 ? Math.round((totalWeightedScore / totalMaxWeight) * 100) : 0;

  // Generate explainable summary
  let summaryText = '';
  if (strongSkills.length > 0) {
    const strongList = strongSkills.slice(0, 2).map(s => s.skillName).join(' and ');
    if (missingSkills.length > 0 || developingSkills.length > 0) {
      const gapList = [...missingSkills, ...developingSkills].slice(0, 3).map(s => s.skillName).join(', ');
      summaryText = `Your strongest alignment for ${role.title} is in ${strongList}. Your largest growth opportunity areas are ${gapList}. Focus on these to elevate your career readiness.`;
    } else {
      summaryText = `Outstanding alignment! You meet or exceed all core technical competencies required for ${role.title}.`;
    }
  } else {
    const topMissing = missingSkills.slice(0, 3).map(s => s.skillName).join(', ');
    summaryText = `You are starting your journey toward ${role.title}. Priority should be given to establishing core skills in ${topMissing}.`;
  }

  return {
    role,
    gaps,
    strongSkills,
    developingSkills,
    missingSkills,
    summaryText,
    overallCompetencyCoverage
  };
}

/**
 * Calculates transparent Explainable Career Readiness Score
 */
export function calculateReadinessScore(profile: StudentProfile, targetRoleTitle?: string): ReadinessScoreResult {
  const { role, gaps, overallCompetencyCoverage, strongSkills, missingSkills, developingSkills } = calculateSkillGapAnalysis(profile, targetRoleTitle);

  // 1. Technical Skills Score (0-100) based on weighted skill gap analysis
  const technicalScore = overallCompetencyCoverage;

  // 2. Certification Alignment Score (0-100)
  let certScore = 30; // base score for ITI NCVT
  if (profile.certifications.length > 0) {
    certScore += Math.min(70, profile.certifications.length * 25);
  }

  // 3. Experience & Apprenticeship Score (0-100)
  let expScore = 50;
  if (profile.experienceLevel === 'Apprenticeship Completed') expScore = 80;
  else if (profile.experienceLevel === '1-2 Years') expScore = 95;

  // 4. Industry & Trade Alignment Score (0-100)
  const isTradeMatched = role.suitableTrades.some(t =>
    t.toLowerCase().includes(profile.itiTrade.toLowerCase()) ||
    profile.itiTrade.toLowerCase().includes(t.toLowerCase())
  );
  const industryAlignmentScore = isTradeMatched ? 92 : 65;

  // 5. Job / Interest Compatibility Score (0-100)
  const interestMatchCount = profile.interests.filter(interest =>
    role.category.toLowerCase().includes(interest.toLowerCase()) ||
    role.description.toLowerCase().includes(interest.toLowerCase())
  ).length;
  const jobCompatibilityScore = Math.min(100, 60 + interestMatchCount * 20);

  // 6. Location Alignment Score (0-100)
  const locationAlignmentScore = profile.workModePreference === 'Remote' ? 95 : 85;

  // Added boost from completed roadmap tasks
  const completedTaskBonus = Math.min(15, (profile.completedRoadmapTaskIds?.length || 0) * 3);

  // Weights (Transparent mathematical formula)
  // Technical: 40%, Industry Alignment: 15%, Certifications: 10%, Interests/Compatibility: 15%, Experience: 10%, Location: 10%
  const weightedOverall =
    technicalScore * 0.40 +
    industryAlignmentScore * 0.15 +
    certScore * 0.10 +
    jobCompatibilityScore * 0.15 +
    expScore * 0.10 +
    locationAlignmentScore * 0.10 +
    completedTaskBonus;

  const finalScore = Math.min(100, Math.round(weightedOverall));

  let readinessBand: 'Job Ready' | 'Industry Aligned' | 'Developing Competency' | 'Needs Foundation' = 'Developing Competency';
  let color = '#f59e0b'; // Amber

  if (finalScore >= 80) {
    readinessBand = 'Job Ready';
    color = '#10b981'; // Emerald
  } else if (finalScore >= 65) {
    readinessBand = 'Industry Aligned';
    color = '#3b82f6'; // Blue
  } else if (finalScore >= 50) {
    readinessBand = 'Developing Competency';
    color = '#f59e0b'; // Amber
  } else {
    readinessBand = 'Needs Foundation';
    color = '#ef4444'; // Red
  }

  // Affecting factors explanation
  const positiveFactors: string[] = [];
  const negativeFactors: string[] = [];

  if (strongSkills.length > 0) {
    positiveFactors.push(`Strong mastery in ${strongSkills.map(s => s.skillName).join(', ')} directly aligns with ${role.title} requirements.`);
  }
  if (isTradeMatched) {
    positiveFactors.push(`Your ITI Trade (${profile.itiTrade}) has high curriculum alignment with industry roles.`);
  }
  if (profile.certifications.length > 0) {
    positiveFactors.push(`Active vocational certifications (${profile.certifications.length}) enhance employer confidence.`);
  }
  if (profile.completedRoadmapTaskIds?.length > 0) {
    positiveFactors.push(`Completed ${profile.completedRoadmapTaskIds.length} upskilling tasks (+${completedTaskBonus}% boost).`);
  }

  if (missingSkills.length > 0) {
    negativeFactors.push(`Missing core industry skills: ${missingSkills.map(s => s.skillName).join(', ')}.`);
  }
  if (developingSkills.length > 0) {
    negativeFactors.push(`Developing competencies need upgrade to Advanced: ${developingSkills.map(s => s.skillName).join(', ')}.`);
  }
  if (profile.certifications.length === 0) {
    negativeFactors.push(`No specialized industry credentials verified yet.`);
  }

  const actionableAdvice = missingSkills.length > 0
    ? `Complete the recommended roadmap tasks for ${missingSkills[0].skillName} to gain an immediate 5-8 point readiness jump.`
    : `Build 1 portfolio project or participate in mock technical interviews to cross the 85+ score threshold.`;

  const explanationSummary = `Your readiness score is ${finalScore}/100 for ${role.title}. Technical competency contributes ${(technicalScore * 0.4).toFixed(1)} pts, Trade alignment contributes ${(industryAlignmentScore * 0.15).toFixed(1)} pts, and Certifications add ${(certScore * 0.1).toFixed(1)} pts.`;

  return {
    overallScore: finalScore,
    scoreDelta: +4,
    readinessBand,
    color,
    components: {
      technicalSkills: {
        label: 'Technical Skills & Tools',
        score: Math.round(technicalScore),
        weight: 0.40,
        weightedContribution: Number((technicalScore * 0.40).toFixed(1)),
        description: 'Evaluated from skill proficiencies vs role requirement matrix.',
        status: technicalScore >= 75 ? 'High' : technicalScore >= 50 ? 'Moderate' : 'Low'
      },
      industryAlignment: {
        label: 'ITI Trade & Domain Alignment',
        score: Math.round(industryAlignmentScore),
        weight: 0.15,
        weightedContribution: Number((industryAlignmentScore * 0.15).toFixed(1)),
        description: 'Curriculum overlap between your ITI vocational trade and industry standards.',
        status: industryAlignmentScore >= 75 ? 'High' : 'Moderate'
      },
      jobCompatibility: {
        label: 'Interests & Role Compatibility',
        score: Math.round(jobCompatibilityScore),
        weight: 0.15,
        weightedContribution: Number((jobCompatibilityScore * 0.15).toFixed(1)),
        description: 'Compatibility between stated career interests and daily job functions.',
        status: jobCompatibilityScore >= 75 ? 'High' : 'Moderate'
      },
      certifications: {
        label: 'Verified Certifications',
        score: Math.round(certScore),
        weight: 0.10,
        weightedContribution: Number((certScore * 0.10).toFixed(1)),
        description: 'Recognized NCVT, NPTEL, Coursera or government skill badges.',
        status: certScore >= 75 ? 'High' : certScore >= 50 ? 'Moderate' : 'Low'
      },
      experience: {
        label: 'Practical & Apprenticeship Exp.',
        score: Math.round(expScore),
        weight: 0.10,
        weightedContribution: Number((expScore * 0.10).toFixed(1)),
        description: 'Hands-on workshop projects, internships, or 1-2 year apprenticeships.',
        status: expScore >= 75 ? 'High' : 'Moderate'
      },
      locationAlignment: {
        label: 'Location & Work Preference',
        score: Math.round(locationAlignmentScore),
        weight: 0.10,
        weightedContribution: Number((locationAlignmentScore * 0.10).toFixed(1)),
        description: 'Work mode and geographical alignment with target employers.',
        status: 'High'
      }
    },
    explanation: {
      summary: explanationSummary,
      topStrengths: positiveFactors,
      topGaps: negativeFactors,
      actionableAdvice,
      affectingFactors: {
        positive: positiveFactors,
        negative: negativeFactors
      }
    }
  };
}

/**
 * Matches all available jobs against a Student Profile with Explainable AI reasoning
 */
export function matchJobsForProfile(profile: StudentProfile): JobMatchResult[] {
  const userSkillsMap = new Map<string, SkillProficiency>();
  profile.skills.forEach(s => userSkillsMap.set(s.name.toLowerCase().trim(), s.level));

  const results: JobMatchResult[] = DEMO_JOBS.map(job => {
    let techScoreTotal = 0;
    const strongSkills: string[] = [];
    const partialSkills: string[] = [];
    const missingSkills: string[] = [];

    job.requiredSkills.forEach(req => {
      const userLevel = userSkillsMap.get(req.name.toLowerCase().trim()) || 'None';
      const userNum = PROFICIENCY_NUMERICAL[userLevel];
      const reqNum = PROFICIENCY_NUMERICAL[req.requiredLevel];

      if (userNum >= reqNum) {
        strongSkills.push(`${req.name} (${userLevel})`);
        techScoreTotal += 100;
      } else if (userNum > 0) {
        partialSkills.push(`${req.name} (${userLevel} vs ${req.requiredLevel} req.)`);
        techScoreTotal += (userNum / reqNum) * 100;
      } else {
        missingSkills.push(req.name);
      }
    });

    const technicalMatch = job.requiredSkills.length > 0
      ? Math.round(techScoreTotal / job.requiredSkills.length)
      : 70;

    // Education & Trade Match
    const isTargetRole = job.targetRole.toLowerCase() === profile.targetRole.toLowerCase();
    const educationMatch = isTargetRole ? 95 : 75;

    // Certification Match
    let certCount = 0;
    job.preferredCertifications.forEach(cert => {
      if (profile.certifications.some(c => c.toLowerCase().includes(cert.toLowerCase()) || cert.toLowerCase().includes(c.toLowerCase()))) {
        certCount++;
      }
    });
    const certificationMatch = job.preferredCertifications.length > 0
      ? Math.min(100, 50 + (certCount / job.preferredCertifications.length) * 50)
      : 80;

    // Interest Match
    const interestMatch = profile.interests.some(i => job.industry.toLowerCase().includes(i.toLowerCase()) || job.title.toLowerCase().includes(i.toLowerCase()))
      ? 92
      : 70;

    // Experience Match
    const experienceMatch = profile.experienceLevel === 'Apprenticeship Completed' || profile.experienceLevel === '1-2 Years'
      ? 90
      : 75;

    // Location Match
    const isCityMatched = profile.locationPreference.toLowerCase().includes(job.city.toLowerCase()) || profile.location.toLowerCase().includes(job.city.toLowerCase()) || profile.workModePreference === 'Remote';
    const locationMatch = isCityMatched ? 95 : 70;

    // Overall Match (Weighted Formula)
    const overallMatch = Math.min(99, Math.max(35, Math.round(
      technicalMatch * 0.40 +
      educationMatch * 0.15 +
      certificationMatch * 0.10 +
      interestMatch * 0.15 +
      experienceMatch * 0.10 +
      locationMatch * 0.10
    )));

    // Explainable reasoning
    let matchReasoning = `Your profile exhibits an overall ${overallMatch}% compatibility with this ${job.title} role. `;
    if (strongSkills.length > 0) {
      matchReasoning += `You demonstrate strong competency in ${strongSkills.slice(0, 2).join(' and ')}. `;
    }
    if (isTargetRole) {
      matchReasoning += `Directly matches your designated target career role (${profile.targetRole}).`;
    }

    const holdingBackFactors: string[] = [];
    if (missingSkills.length > 0) {
      holdingBackFactors.push(`Requires unverified skills: ${missingSkills.join(', ')}.`);
    }
    if (partialSkills.length > 0) {
      holdingBackFactors.push(`Developing skill levels: ${partialSkills.join(', ')}.`);
    }
    if (!isCityMatched && job.workMode === 'On-site') {
      holdingBackFactors.push(`Located in ${job.location}, which requires relocation from ${profile.location}.`);
    }

    return {
      job,
      overallMatch,
      technicalMatch,
      educationMatch,
      certificationMatch,
      interestMatch,
      experienceMatch,
      locationMatch,
      strongSkills,
      partialSkills,
      missingSkills,
      matchReasoning,
      holdingBackFactors,
      isTopRecommendation: overallMatch >= 80
    };
  });

  // Sort descending by overall match percentage
  return results.sort((a, b) => b.overallMatch - a.overallMatch);
}

/**
 * Generates dynamic, Personalized 4-Phase Upskilling Roadmap tailored to specific skill deficits
 */
export function generateUpskillingRoadmap(profile: StudentProfile, targetRoleTitle?: string): UpskillingRoadmap {
  const { role, gaps, missingSkills, developingSkills } = calculateSkillGapAnalysis(profile, targetRoleTitle);
  const readinessResult = calculateReadinessScore(profile, targetRoleTitle);

  const completedIds = new Set(profile.completedRoadmapTaskIds || []);

  const phases: RoadmapPhase[] = [];

  // Phase 1: Strengthen Foundations
  const phase1Tasks: RoadmapTask[] = [];
  const foundationalSkills = [...missingSkills, ...developingSkills].filter(s => s.category === 'Core' || s.category === 'Foundation').slice(0, 2);

  if (foundationalSkills.length > 0) {
    foundationalSkills.forEach((s, idx) => {
      phase1Tasks.push({
        id: `task-p1-${idx}-${s.skillName.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
        phaseId: 1,
        title: `Core Fundamentals of ${s.skillName}`,
        description: `Master core principles, basic syntax/operating steps, and solve 10 interactive drill exercises.`,
        difficulty: 'Beginner',
        estimatedHours: 12,
        estimatedDurationDays: 7,
        skillGained: s.skillName,
        category: 'Foundation',
        impactOnReadiness: 4,
        resources: [
          { title: `${s.skillName} Official Primer`, provider: 'Bharat Skills & NPTEL', type: 'Course', link: 'https://bharatskills.gov.in', isFree: true },
          { title: `Interactive Code & Video Labs`, provider: 'SWAYAM Vocational Hub', type: 'Video Tutorial', link: 'https://swayam.gov.in', isFree: true }
        ]
      });
    });
  } else {
    phase1Tasks.push({
      id: 'task-p1-adv-foundation',
      phaseId: 1,
      title: 'Advanced Technical Documentation & Standards',
      description: 'Review IS / IEEE / ISO compliance standards and coding style guidelines for your trade.',
      difficulty: 'Intermediate',
      estimatedHours: 8,
      estimatedDurationDays: 5,
      skillGained: 'Technical Standards',
      category: 'Foundation',
      impactOnReadiness: 3,
      resources: [
        { title: 'DGT Vocational Reference Handbook', provider: 'DGT Govt of India', type: 'Documentation', link: 'https://dgt.gov.in', isFree: true }
      ]
    });
  }

  phases.push({
    phaseNumber: 1,
    title: 'Phase 1 — Strengthen Foundations',
    duration: '2 Weeks',
    description: 'Bridge foundational skill gaps and solidify standard operating concepts.',
    badge: 'Core Competency',
    tasks: phase1Tasks
  });

  // Phase 2: Build Industry Tools & Workflows
  const phase2Tasks: RoadmapTask[] = [];
  const secondarySkills = [...missingSkills, ...developingSkills].slice(2, 4);

  if (secondarySkills.length > 0) {
    secondarySkills.forEach((s, idx) => {
      phase2Tasks.push({
        id: `task-p2-${idx}-${s.skillName.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
        phaseId: 2,
        title: `Hands-on Workflow with ${s.skillName}`,
        description: `Implement industry-grade workflows, error debugging, and parameter tuning in a simulated environment.`,
        difficulty: 'Intermediate',
        estimatedHours: 16,
        estimatedDurationDays: 10,
        skillGained: s.skillName,
        category: 'Hands-on Tool',
        impactOnReadiness: 5,
        resources: [
          { title: `${s.skillName} Industry Bootcamp`, provider: 'Coursera / OpenLab', type: 'Course', link: 'https://coursera.org', isFree: true },
          { title: `Practical Troubleshooting Guide`, provider: 'GitHub Learning Lab', type: 'Documentation', link: 'https://github.com', isFree: true }
        ]
      });
    });
  } else {
    phase2Tasks.push({
      id: 'task-p2-tools-1',
      phaseId: 2,
      title: 'Git & Collaboration Workflow Mastery',
      description: 'Learn branch management, pull requests, and automated deployment pipelines.',
      difficulty: 'Intermediate',
      estimatedHours: 10,
      estimatedDurationDays: 7,
      skillGained: 'Git & GitHub',
      category: 'Hands-on Tool',
      impactOnReadiness: 4,
      resources: [
        { title: 'Git for Technical Vocations', provider: 'FreeCodeCamp', type: 'Course', link: 'https://freecodecamp.org', isFree: true }
      ]
    });
  }

  phases.push({
    phaseNumber: 2,
    title: 'Phase 2 — Build Industry Skills & Tooling',
    duration: '3 Weeks',
    description: 'Learn modern software tools, diagnostics, and industry-standard workflows.',
    badge: 'Tooling & Execution',
    tasks: phase2Tasks
  });

  // Phase 3: Build Real-world Portfolio Projects
  const phase3Tasks: RoadmapTask[] = [
    {
      id: `task-p3-capstone-1`,
      phaseId: 3,
      title: `${role.title} Industry Capstone Project`,
      description: `Build an end-to-end practical project mimicking real workplace deliverables for ${role.title}. Document the architecture and share live evidence.`,
      difficulty: 'Advanced',
      estimatedHours: 24,
      estimatedDurationDays: 14,
      skillGained: 'Project Delivery & Architecture',
      category: 'Project',
      impactOnReadiness: 6,
      resources: [
        { title: 'Capstone Project Guidelines & Rubric', provider: 'SkillBridge AI Curators', type: 'Project', link: '#', isFree: true }
      ]
    },
    {
      id: `task-p3-troubleshoot-2`,
      phaseId: 3,
      title: 'Real-world Bug Fixing & Maintenance Scenario',
      description: 'Simulate resolving 3 critical production failure scenarios and measure turnaround time.',
      difficulty: 'Intermediate',
      estimatedHours: 12,
      estimatedDurationDays: 7,
      skillGained: 'Diagnostics & Root Cause Analysis',
      category: 'Project',
      impactOnReadiness: 4,
      resources: [
        { title: 'Case Study: Real-world Failure Analysis', provider: 'Industrial Case Vault', type: 'Documentation', link: '#', isFree: true }
      ]
    }
  ];

  phases.push({
    phaseNumber: 3,
    title: 'Phase 3 — Build Portfolio & Project Evidence',
    duration: '2 Weeks',
    description: 'Develop concrete portfolio evidence and practical proof-of-work for recruiters.',
    badge: 'Portfolio & Proof',
    tasks: phase3Tasks
  });

  // Phase 4: Job & Placement Readiness
  const phase4Tasks: RoadmapTask[] = [
    {
      id: `task-p4-resume-1`,
      phaseId: 4,
      title: 'ATS-Optimized Resume & Portfolio Polish',
      description: 'Format your ITI trade achievements with quantifiable metrics and targeted keywords.',
      difficulty: 'Beginner',
      estimatedHours: 6,
      estimatedDurationDays: 3,
      skillGained: 'Resume Engineering',
      category: 'Interview Prep',
      impactOnReadiness: 3,
      resources: [
        { title: 'AI Resume Analyzer & Checklist', provider: 'SkillBridge AI', type: 'Documentation', link: '#resume-analyzer', isFree: true }
      ]
    },
    {
      id: `task-p4-mock-2`,
      phaseId: 4,
      title: 'Technical & HR Mock Interview Drill',
      description: 'Practice answering 25 high-frequency technical interview questions with CareerAI.',
      difficulty: 'Intermediate',
      estimatedHours: 8,
      estimatedDurationDays: 4,
      skillGained: 'Technical Communication',
      category: 'Interview Prep',
      impactOnReadiness: 4,
      resources: [
        { title: 'Interactive Mock Interview with CareerAI', provider: 'SkillBridge CareerAI', type: 'Course', link: '#career-ai', isFree: true }
      ]
    }
  ];

  phases.push({
    phaseNumber: 4,
    title: 'Phase 4 — Placement & Interview Readiness',
    duration: '1 Week',
    description: 'Optimize resume keywords, rehearse technical responses, and apply to matched jobs.',
    badge: 'Placement Ready',
    tasks: phase4Tasks
  });

  // Calculate totals
  let totalTasks = 0;
  let completedCount = 0;
  phases.forEach(p => {
    p.tasks.forEach(t => {
      totalTasks++;
      if (completedIds.has(t.id)) {
        completedCount++;
      }
    });
  });

  const completionPercentage = totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;
  const projectedReadiness = Math.min(98, readinessResult.overallScore + (totalTasks - completedCount) * 4);

  return {
    targetRole: role.title,
    generatedAt: new Date().toISOString(),
    currentReadiness: readinessResult.overallScore,
    projectedReadiness,
    totalEstimatedWeeks: 8,
    phases,
    completedTaskCount: completedCount,
    totalTaskCount: totalTasks,
    completionPercentage
  };
}

/**
 * Intelligent AI Resume Analyzer Engine (Parses text, matches against target role, extracts keywords)
 */
export function analyzeResumeText(
  resumeText: string,
  fileName: string,
  targetRoleTitle: string
): ResumeAnalysisResult {
  const role = CAREER_ROLES.find(r => r.title.toLowerCase() === targetRoleTitle.toLowerCase()) || CAREER_ROLES[0];

  const lowerText = resumeText.toLowerCase();

  // Search all available skills in resume text
  const extractedSkills: string[] = [];
  ALL_AVAILABLE_SKILLS.forEach(s => {
    const skillToken = s.name.toLowerCase();
    // Check keyword variation
    if (lowerText.includes(skillToken) ||
        (skillToken.includes('python') && lowerText.includes('python')) ||
        (skillToken.includes('sql') && lowerText.includes('sql')) ||
        (skillToken.includes('html') && lowerText.includes('html')) ||
        (skillToken.includes('autocad') && lowerText.includes('autocad')) ||
        (skillToken.includes('wiring') && lowerText.includes('wiring')) ||
        (skillToken.includes('cnc') && lowerText.includes('cnc')) ||
        (skillToken.includes('plc') && lowerText.includes('plc'))
    ) {
      if (!extractedSkills.includes(s.name)) {
        extractedSkills.push(s.name);
      }
    }
  });

  // Matched skills vs missing keywords for target role
  const matchedSkills: string[] = [];
  const missingKeywords: string[] = [];

  role.requiredSkills.forEach(req => {
    const isFound = extractedSkills.some(es => es.toLowerCase() === req.name.toLowerCase()) ||
                    lowerText.includes(req.name.toLowerCase().replace(/[^a-z0-9]/g, ''));
    if (isFound) {
      matchedSkills.push(req.name);
    } else {
      missingKeywords.push(req.name);
    }
  });

  const skillCoveragePercentage = role.requiredSkills.length > 0
    ? Math.round((matchedSkills.length / role.requiredSkills.length) * 100)
    : 75;

  const actionableSuggestions: ResumeAnalysisResult['actionableSuggestions'] = [];

  if (missingKeywords.length > 0) {
    actionableSuggestions.push({
      category: 'Keywords',
      recommendation: `Add explicit keyword mentions of ${missingKeywords.slice(0, 3).join(', ')} in your project descriptions to pass ATS keyword filters.`,
      impact: 'High'
    });
  }

  actionableSuggestions.push({
    category: 'Metrics',
    recommendation: `Incorporate measurable metrics (e.g., 'Reduced machine downtime by 15%', 'Built database with 10k+ rows', 'Maintained 0.01mm tolerance across 500+ parts').`,
    impact: 'High'
  });

  actionableSuggestions.push({
    category: 'Skills',
    recommendation: `Group your skills into clear categories: 'Core Technical Skills', 'Tools & Hardware', and 'Certifications'.`,
    impact: 'Medium'
  });

  return {
    fileName: fileName || 'Uploaded_Resume.pdf',
    targetRole: role.title,
    skillCoveragePercentage,
    extractedProfile: {
      name: resumeText.split('\n')[0]?.slice(0, 30) || 'Candidate Resume',
      education: lowerText.includes('iti') ? 'ITI National Trade Certificate (NCVT)' : 'Vocational Technical Diploma',
      trade: role.suitableTrades[0] || 'Technical Trade',
      extractedSkills: extractedSkills.length > 0 ? extractedSkills : ['Python', 'SQL', 'HTML/CSS', 'Operating Systems'],
      extractedCertifications: ['NCVT Trade Certificate', 'NPTEL Programming Certification'],
      extractedProjects: ['Student Record System CLI', 'Responsive Web Catalog'],
      experienceSummary: '1+ year academic and workshop practical projects in trade syllabus.'
    },
    matchedSkills: matchedSkills.length > 0 ? matchedSkills : ['SQL', 'Operating System Basics'],
    missingKeywords: missingKeywords.length > 0 ? missingKeywords : ['Cloud Fundamentals', 'Git & GitHub', 'REST APIs'],
    formattingScore: 84,
    impactScore: 76,
    actionableSuggestions
  };
}

/**
 * Intelligent local contextual fallback for CareerAI assistant
 */
export function generateLocalAssistantResponse(
  userQuery: string,
  profile: StudentProfile
): { responseText: string; suggestedActions: { label: string; actionType: 'view_gap' | 'view_jobs' | 'view_roadmap' | 'switch_role'; payload?: string }[] } {
  const query = userQuery.toLowerCase();
  const { role, missingSkills, developingSkills, strongSkills } = calculateSkillGapAnalysis(profile);
  const readiness = calculateReadinessScore(profile);

  if (query.includes('missing') || query.includes('gap') || query.includes('need to learn')) {
    const missingList = missingSkills.map(s => s.skillName).join(', ');
    const devList = developingSkills.map(s => s.skillName).join(', ');
    return {
      responseText: `For your target role as **${role.title}**, you are currently missing **${missingList || 'no critical skills'}** and developing **${devList || 'none'}**. Your strongest skills are **${strongSkills.map(s => s.skillName).join(', ')}**. I recommend starting with the top task in your personalized roadmap!`,
      suggestedActions: [
        { label: 'View Detailed Skill Gap', actionType: 'view_gap' },
        { label: 'Open My Roadmap', actionType: 'view_roadmap' }
      ]
    };
  }

  if (query.includes('readiness') || query.includes('score') || query.includes('improve')) {
    return {
      responseText: `Your current Career Readiness Score is **${readiness.overallScore}/100** (${readiness.readinessBand}). Technical competencies account for 40% of this score. To boost your score by 8–12 points quickly, complete 2 tasks from your Phase 1 Roadmap and verify an online certification!`,
      suggestedActions: [
        { label: 'View Score Breakdown', actionType: 'view_gap' },
        { label: 'Start Upskilling Task', actionType: 'view_roadmap' }
      ]
    };
  }

  if (query.includes('job') || query.includes('match') || query.includes('apply') || query.includes('ready to apply')) {
    const matches = matchJobsForProfile(profile);
    const topJob = matches[0];
    return {
      responseText: `Based on your profile, you match **${matches.filter(m => m.overallMatch >= 75).length} active jobs** with ≥75% compatibility. Your top match is **${topJob.job.title} at ${topJob.job.company}** with an **${topJob.overallMatch}% match score**.`,
      suggestedActions: [
        { label: 'Explore Matching Jobs', actionType: 'view_jobs' },
        { label: 'Why This Match?', actionType: 'view_jobs' }
      ]
    };
  }

  if (query.includes('project') || query.includes('build') || query.includes('portfolio')) {
    return {
      responseText: `For **${role.title}**, recruiters look for practical proof-of-work. I recommend building a **${role.title} Capstone Project** showcasing error-handling, clean documentation, and measurable outcomes. You can track this in Phase 3 of your roadmap!`,
      suggestedActions: [
        { label: 'View Portfolio Phase', actionType: 'view_roadmap' }
      ]
    };
  }

  if (query.includes('role') || query.includes('career') || query.includes('switch')) {
    return {
      responseText: `You are currently targeting **${profile.targetRole}**. Other suitable roles for your ITI Trade (${profile.itiTrade}) include **Data Analyst**, **Web Developer**, and **QA & Software Test Associate**. Would you like to explore them?`,
      suggestedActions: [
        { label: 'Explore Data Analyst', actionType: 'switch_role', payload: 'Data Analyst' },
        { label: 'Explore Web Developer', actionType: 'switch_role', payload: 'Web Developer (Frontend / Full Stack)' }
      ]
    };
  }

  // Default response
  return {
    responseText: `Hello ${profile.name}! I am CareerAI, your personalized vocational career mentor. I have analyzed your profile against industry criteria for **${profile.targetRole}**. You currently hold a **${readiness.overallScore}% readiness score**. You can ask me what skills you need, how to pass interviews, or which jobs to apply for!`,
    suggestedActions: [
      { label: 'What skills am I missing?', actionType: 'view_gap' },
      { label: 'How to improve my readiness?', actionType: 'view_roadmap' },
      { label: 'Find matching jobs', actionType: 'view_jobs' }
    ]
  };
}
