"use client";

import React, { useState, useEffect, useMemo, useCallback, memo } from 'react';
import { 
  Code, Layers, PenTool, Cpu, TerminalSquare, Database, PieChart, 
  Workflow, Compass, Languages, Figma, Brush, Users, Award, 
  TrendingUp, LineChart, Briefcase, Globe, Clock, BookOpen,
  Truck, Zap, Coffee, MessageCircle, GitBranch, Share2
} from 'lucide-react';
import SectionHeader from './SectionHeader';

const ICON_MAP = {
  "react": <Code size={14} />,
  "javascript": <Code size={14} />,
  "typescript": <Code size={14} />,
  "node": <TerminalSquare size={14} />,
  "html": <Code size={14} />,
  "css": <PenTool size={14} />,
  "tailwind": <Brush size={14} />,
  "next": <Code size={14} />,
  "sql": <Database size={14} />,
  "mongo": <Database size={14} />,
  "graphql": <Database size={14} />,
  "docker": <Layers size={14} />,
  "kubernetes": <Layers size={14} />,
  "python": <TerminalSquare size={14} />,
  "java": <Cpu size={14} />,
  "ai": <Compass size={14} />,
  "language": <Languages size={14} />,
  "git": <GitBranch size={14} />,
  
  // Designer icons
  "figma": <Figma size={14} />,
  "design": <PenTool size={14} />,
  "sketch": <PenTool size={14} />,
  "photoshop": <Brush size={14} />,
  "illustrator": <PenTool size={14} />,
  "ui": <Figma size={14} />,
  "ux": <Users size={14} />,
  "typography": <PenTool size={14} />,
  "color": <Brush size={14} />,
  "layout": <Layers size={14} />,
  "animation": <Zap size={14} />,
  
  // Manager icons
  "leadership": <Users size={14} />,
  "management": <Briefcase size={14} />,
  "team": <Users size={14} />,
  "strategy": <TrendingUp size={14} />,
  "agile": <Workflow size={14} />,
  "scrum": <Clock size={14} />,
  "project": <Clock size={14} />,
  "budget": <TrendingUp size={14} />,
  "stakeholder": <Share2 size={14} />,
  "communication": <MessageCircle size={14} />,
  
  // Marketer icons
  "marketing": <TrendingUp size={14} />,
  "seo": <Globe size={14} />,
  "social": <Share2 size={14} />,
  "content": <BookOpen size={14} />,
  "analytics": <PieChart size={14} />,
  "campaign": <TrendingUp size={14} />,
  "brand": <Award size={14} />,
  "email": <MessageCircle size={14} />,
  "copywriting": <BookOpen size={14} />,
  
  // General skills
  "presentation": <Layers size={14} />,
  "time": <Clock size={14} />,
  "research": <Compass size={14} />,
  "problem": <Coffee size={14} />,
  "delivery": <Truck size={14} />,
  "remote": <Globe size={14} />,
  
  // Default
  "default": <Award size={14} />
};

// Preset categories defined outside component to prevent recreation on each render
const PRESET_CATEGORIES = {
  developer: [
    {
      name: "Frontend Technologies",
      icon: <Code className="h-5 w-5" />,
      keywords: ["react", "javascript", "typescript", "html", "css", "tailwind", "next", "vue", "angular", "sass", "redux", "frontend", "ui", "ux", "web"]
    },
    {
      name: "Backend & Databases",
      icon: <Database className="h-5 w-5" />,
      keywords: ["node", "express", "django", "flask", "postgresql", "mongodb", "mysql", "firebase", "graphql", "api", "aws", "azure", "backend", "server", "database", "sql"]
    },
    {
      name: "DevOps & Tools",
      icon: <Workflow className="h-5 w-5" />,
      keywords: ["git", "docker", "kubernetes", "ci/cd", "jenkins", "aws", "azure", "gcp", "linux", "testing", "devops", "deployment", "monitoring", "security"]
    }
  ],
  designer: [
    {
      name: "Design Tools",
      icon: <Figma className="h-5 w-5" />,
      keywords: ["figma", "sketch", "adobe", "illustrator", "photoshop", "indesign", "xd", "after effects", "premiere", "canva", "invision", "design", "tool"]
    },
    {
      name: "Design Skills",
      icon: <PenTool className="h-5 w-5" />,
      keywords: ["ui", "ux", "typography", "color theory", "layout", "wireframing", "prototyping", "responsive", "visual", "illustration", "branding", "logo", "identity"]
    },
    {
      name: "Creative & Other",
      icon: <Brush className="h-5 w-5" />,
      keywords: ["animation", "motion", "3d", "photography", "video", "art", "creative", "presentation", "storytelling", "concept"]
    }
  ],
  manager: [
    {
      name: "Leadership",
      icon: <Users className="h-5 w-5" />,
      keywords: ["team", "leadership", "management", "mentoring", "coaching", "hiring", "delegation", "conflict resolution", "strategic", "vision", "executive"]
    },
    {
      name: "Business Skills",
      icon: <TrendingUp className="h-5 w-5" />,
      keywords: ["strategy", "budgeting", "forecasting", "reporting", "analytics", "kpi", "metrics", "optimization", "growth", "stakeholder", "presentation", "negotiation"]
    },
    {
      name: "Project Management",
      icon: <Clock className="h-5 w-5" />,
      keywords: ["agile", "scrum", "kanban", "waterfall", "prince2", "pmp", "planning", "scheduling", "risk", "resource", "project", "program", "portfolio", "jira", "asana", "trello"]
    }
  ],
  marketer: [
    {
      name: "Digital Marketing",
      icon: <Globe className="h-5 w-5" />,
      keywords: ["seo", "sem", "ppc", "ads", "google", "facebook", "instagram", "social media", "content", "email", "analytics", "digital"]
    },
    {
      name: "Content & Creative",
      icon: <BookOpen className="h-5 w-5" />,
      keywords: ["copywriting", "content", "storytelling", "blog", "video", "podcast", "creative", "brand", "messaging", "voice", "tone", "writing"]
    },
    {
      name: "Strategy & Analytics",
      icon: <LineChart className="h-5 w-5" />,
      keywords: ["analytics", "data", "strategy", "campaign", "funnel", "conversion", "roi", "kpi", "metrics", "research", "competitor", "market", "audience", "segmentation"]
    }
  ],
  custom: [
    {
      name: "Skills",
      icon: <Award className="h-5 w-5" />,
      keywords: []
    }
  ]
};

// Memoized components for better performance
const CategoryHeader = memo(({ icon, name, theme }) => {
  return (
    <div className="flex items-center mb-4 gap-2">
      <div 
        className="p-2 rounded-lg"
        style={{ background: `linear-gradient(135deg, ${theme.primary}15, ${theme.secondary}15)` }}
      >
        {icon}
      </div>
      <h3 
        className="text-xl font-semibold"
        style={{ color: theme.body, fontFamily: theme.fontHeading }}
      >
        {name}
      </h3>
      <div className="flex-grow h-px ml-3" style={{ background: `linear-gradient(to right, ${theme.primary}30, transparent)` }}></div>
    </div>
  );
});

CategoryHeader.displayName = 'CategoryHeader';

const Skill = memo(({ skill, theme, icon, delay }) => {
  return (
    <div
      className="flex items-center gap-2 px-4 py-2.5 rounded-full transition-all duration-300 hover:shadow-md hover:-translate-y-1"
      style={{
        background: `linear-gradient(135deg, ${theme.background}, ${theme.card})`,
        color: theme.body,
        fontFamily: theme.fontBody,
        border: `1px solid ${theme.accent}`,
        transitionDelay: `${delay}ms`,
      }}
    >
      <div className="text-sm" style={{ color: theme.primary }}>
        {icon}
      </div>
      <span className="font-medium">{skill}</span>
    </div>
  );
});

Skill.displayName = 'Skill';

const SkillsSection = ({
  // Customizable title and subtitle
  sectionTitle = "Skills & Expertise",
  sectionSubtitle = "Technologies and tools I specialize in",
  badgeText = "Technical Proficiency",
  
  // Preset types that adjust default categories based on profession
  presetType = "developer", // Options: "developer", "designer", "manager", "marketer", "custom"
  
  // Custom skill categories (override the preset if provided)
  customCategories = null,
  
  // Skills array that can be passed directly
  skills = [],
  
  // Theme customization
  theme = {
    primary: "#3490dc",
    secondary: "#4fd1c5",
    dark: "#2d3748",
    light: "#f8fafc",
    background: "#ffffff",
    card: "#f4f4f4",
    muted: "#f1f5f9",
    accent: "#e0e7ff",
    fontHeading: "Montserrat",
    fontBody: "Open Sans"
  }
}) => {
  const [animateItems, setAnimateItems] = useState(false);
  
  // Animation timing - only run once on mount
  useEffect(() => {
    const animationTimer = setTimeout(() => setAnimateItems(true), 300);
    return () => clearTimeout(animationTimer);
  }, []);

  // Memoize the getSkillIcon function to avoid unnecessary calculations
  const getSkillIcon = useCallback((skill) => {
    const skillLower = skill.toLowerCase();
    
    // Check if the skill contains any of our predefined icon keys
    for (const key of Object.keys(ICON_MAP)) {
      if (skillLower.includes(key)) {
        return ICON_MAP[key];
      }
    }
    
    // Default icon if no match
    return ICON_MAP.default;
  }, []);
  
  // Get categories based on preset or custom - memoized to prevent recalculation
  const categories = useMemo(() => {
    if (customCategories) {
      return customCategories;
    }
    return PRESET_CATEGORIES[presetType] || PRESET_CATEGORIES.custom;
  }, [customCategories, presetType]);
  
  // Memoize the categorized skills to prevent recalculation on each render
  const displayCategories = useMemo(() => {
    // Handle empty skills array
    if (!skills || skills.length === 0) {
      return categories.map(category => ({
        ...category,
        skills: []
      }));
    }
    
    // Deep copy the categories to avoid mutating the original
    const categorized = categories.map(category => ({
      ...category,
      skills: []
    }));
    
    // Categorize skills
    const skillsMap = new Map(); // Track if a skill has been assigned
    
    // First assign skills to categories based on keywords
    skills.forEach(skill => {
      if (!skill) return;
      
      const skillLower = skill.toLowerCase();
      let matched = false;
      
      // Try to match with categories
      for (const category of categorized) {
        if (category.keywords && category.keywords.length > 0) {
          for (const keyword of category.keywords) {
            if (skillLower.includes(keyword.toLowerCase())) {
              category.skills.push(skill);
              skillsMap.set(skill, true);
              matched = true;
              break;
            }
          }
          if (matched) break;
        }
      }
    });
    
    // Assign unmatched skills to the last category
    skills.forEach(skill => {
      if (!skill || skillsMap.has(skill)) return;
      
      // Find "Other" category or use last category
      const otherCategory = categorized.find(cat => cat.name === "Other");
      if (otherCategory) {
        otherCategory.skills.push(skill);
      } else {
        categorized[categorized.length - 1].skills.push(skill);
      }
    });
    
    // Filter out empty categories
    const filteredCategories = categorized.filter(category => category.skills.length > 0);
    
    // If all categories are empty, create a default category
    if (filteredCategories.length === 0 && skills.length > 0) {
      return [{
        name: "Skills",
        icon: <Award className="h-5 w-5" />,
        skills: [...skills]
      }];
    }
    
    return filteredCategories;
  }, [categories, skills]);

  // Background pattern dots - memoized to avoid recreating on every render
  const backgroundDots = useMemo(() => {
    return Array.from({ length: 12 }).map((_, rowIdx) => (
      Array.from({ length: 12 }).map((_, colIdx) => {
        const opacity = Math.random() * 0.2;
        return (
          <div 
            key={`${rowIdx}-${colIdx}`} 
            className="w-1 h-1 rounded-full"
            style={{ 
              opacity, 
              background: Math.random() > 0.5 ? theme.primary : theme.secondary,
              gridColumn: colIdx + 1,
              gridRow: rowIdx + 1,
            }} 
          />
        );
      })
    ));
  }, [theme.primary, theme.secondary]);
 
  return (
    <section
      className="py-20 relative overflow-hidden"
      style={{ backgroundColor: theme.background }}
    >
      {/* Background decorative elements */}
      <div className="absolute w-full h-full top-0 left-0 pointer-events-none overflow-hidden opacity-5">
        <div className="absolute top-20 right-20 w-72 h-72 rounded-full" style={{ background: theme.primary }} />
        <div className="absolute bottom-16 left-20 w-56 h-56 rounded-full" style={{ background: theme.secondary }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full" 
             style={{ background: theme.primary, opacity: 0.2 }} />
        
        {/* Code-like pattern */}
        <div className="grid grid-cols-12 grid-rows-12 gap-8 w-full h-full absolute">
          {backgroundDots}
        </div>
      </div>
      
      <div className="container max-w-6xl mx-auto px-4 relative z-10" style={{ color: theme.body }}>
        <SectionHeader
          title={sectionTitle}
          subtitle={sectionSubtitle}
          theme={theme}
        />
        
        <div className="space-y-10">
          {displayCategories.map((category, idx) => (
            <div 
              key={`category-${idx}`}
              className="transform transition-all duration-500"
              style={{
                opacity: animateItems ? 1 : 0,
                transform: animateItems ? "translateY(0)" : "translateY(30px)",
                transitionDelay: `${idx * 150}ms`,
              }}
            >
              <CategoryHeader 
                icon={category.icon} 
                name={category.name} 
                theme={theme} 
              />
              
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, i) => {
                  if (!skill) return null;
                  const skillIcon = getSkillIcon(skill);
                  
                  return (
                    <Skill 
                      key={`skill-${idx}-${i}`}
                      skill={skill}
                      theme={theme}
                      icon={skillIcon}
                      delay={i * 50}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default React.memo(SkillsSection);