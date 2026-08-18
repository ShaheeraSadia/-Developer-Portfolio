export interface ProjectMetric {
  label: string;
  value: string;
  change?: string;
  isPositive?: boolean;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: string;
  year: string;
  role: string;
  clientOrContext: string;
  featured: boolean;
  status: 'production' | 'open_source' | 'archived';
  metrics: ProjectMetric[];
  stack: string[];
  summary: string;
  challenges: string[];
  architecturalDecisions: string[];
  impactDescription: string;
  githubUrl?: string;
  liveUrl?: string;
  codeSnippet?: {
    filename: string;
    language: string;
    code: string;
    explanation: string;
  };
  benchmarkComparison?: {
    metricName: string;
    before: string;
    after: string;
    improvement: string;
  }[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  type: 'Full-time' | 'Contract' | 'Advisory';
  summary: string;
  achievements: string[];
  technologies: string[];
  statsBadge?: string;
}

export interface PhilosophyPillar {
  id: string;
  title: string;
  tagline: string;
  iconName: string;
  quote: string;
  description: string;
  codeExample: {
    title: string;
    filename: string;
    code: string;
  };
}

export interface SkillCategory {
  category: string;
  skills: {
    name: string;
    level: string;
    experienceYears: string;
    focus: string;
  }[];
}

export interface DeveloperConfig {
  name: string;
  handle: string;
  role: string;
  level: string;
  location: string;
  timezone: string;
  status: string;
  yearsOfExperience: number;
  terminal: string;
  editor: string;
  email: string;
  github: string;
  linkedin: string;
  twitter: string;
  rss: string;
  coreStack: string[];
  principles: string[];
}
