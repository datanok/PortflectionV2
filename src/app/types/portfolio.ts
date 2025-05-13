// types/portfolio.ts

export type PortfolioType = "developer" | "designer" | "contentCreator" | "businessConsulting";

export interface ColorScheme {
  name: string;
  primary: string;
  secondary: string;
  dark: string;
  light: string;
  background: string;
  card: string;
  muted: string;
  accent: string;
  fontHeading: string;
  fontBody: string;
  body: string;
}
export interface Theme {
  primary?: string;
  secondary?: string;
  dark?: string;
  light?: string;
  background?: string;
  card?: string;
  muted?: string;
  accent?: string;
  fontHeading?: string;
  fontBody?: string;
  body?: string;
};

export interface BasePortfolio {
  name: string;
  title: string;
  email: string;
  about: string;
  phone: string;
  location: string;
  theme: Theme;
  experience?: ExperienceItem[];
  education?: EducationItem[];
}

export interface ExperienceItem {
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
  description: string;
  responsibilities?: string[];
}

export interface EducationItem {
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
  description?: string;
}

export interface DeveloperProject {
  title: string;
  description: string;
  technologies: string;
  githubLink?: string;
  liveDemo?: string;
  type: "WEB" | "MOBILE" | "DESKTOP" | "OTHER";
  roles: string[];
  challenges?: string;
  learnings?: string;
}

export interface DeveloperSkills {
  languages: string[];
  frameworks: string[];
  tools: string[];
}

export interface DeveloperPortfolio extends BasePortfolio {
  githubLink?: string;
  linkedinLink?: string;
  personalWebsite?: string;
  skills: DeveloperSkills;
  projects: DeveloperProject[];
}

export interface DesignerProject {
  title: string;
  description: string;
  client?: string;
  problem?: string;
  solution?: string;
  process?: string;
  outcome?: string;
  images: string[];
  testimonial?: Testimonial;
}

export interface Testimonial {
  name: string;
  position?: string;
  company?: string;
  content: string;
}

export interface DesignerPortfolio extends BasePortfolio {
  skills: string[];
  tools: string[];
  projects: DesignerProject[];
  testimonials: Testimonial[];
}

export interface PortfolioItem {
  title: string;
  type: string;
  description: string;
  url?: string;
  image?: string;
  tags: string[];
  metadata?: Record<string, any>;
}

export interface ContentCreatorPortfolio extends BasePortfolio {
  specialties: string[];
  portfolioItems: PortfolioItem[];
  testimonials: Testimonial[];
  accolades?: string[];
  pricingPackages?: any[];
}

export interface CaseStudy {
  title: string;
  organization: string;
  role: string;
  startDate?: string;
  endDate?: string;
  ongoing?: boolean;
  description: string;
  challenges: string;
  solutions: string;
  outcomes: string;
  teamSize?: number;
  keyMetrics: string[];
  images?: string[];
  testimonials?: Testimonial[];
  featured?: boolean;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}


export interface BusinessConsultingPortfolio extends BasePortfolio {
  caseStudies: CaseStudy[];
  skills: SkillCategory[];
  tools?: string[];
  certifications?: string[];
  keyAchievements?: string[];
  industries?: string[];
}

export type Portfolio = BasePortfolio & 
  Partial<DeveloperPortfolio> & 
  Partial<DesignerPortfolio> & 
  Partial<ContentCreatorPortfolio> & 
  Partial<BusinessConsultingPortfolio>;