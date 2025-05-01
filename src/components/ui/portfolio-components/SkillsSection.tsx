import React, { useState, useEffect } from 'react';
import { 
  Code, Layers, PenTool, Cpu, TerminalSquare, Database, PieChart, 
  Workflow, Compass, Languages, Figma, Brush, Users, Award, 
  TrendingUp, LineChart, Briefcase, Globe, Clock, BookOpen,
  Truck, Zap, Coffee, MessageCircle, GitBranch, Share2
} from 'lucide-react';
import SectionHeader from './SectionHeader';

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
  
  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => setAnimateItems(true), 300);
    return () => clearTimeout(timer);
  }, []);
  
  // Define preset skill categories based on professional role
  const presetCategories = {
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

  // Expanded icon mapping for different professions
  const expandedIconMap = {
    // Developer icons
    "react": <Code />,
    "javascript": <Code />,
    "typescript": <Code />,
    "node": <TerminalSquare />,
    "html": <Code />,
    "css": <PenTool />,
    "tailwind": <Brush />,
    "next": <Code />,
    "sql": <Database />,
    "mongo": <Database />,
    "graphql": <Database />,
    "docker": <Layers />,
    "kubernetes": <Layers />,
    "python": <TerminalSquare />,
    "java": <Cpu />,
    "ai": <Compass />,
    "language": <Languages />,
    "git": <GitBranch />,
    
    // Designer icons
    "figma": <Figma />,
    "design": <PenTool />,
    "sketch": <PenTool />,
    "photoshop": <Brush />,
    "illustrator": <PenTool />,
    "ui": <Figma />,
    "ux": <Users />,
    "typography": <PenTool />,
    "color": <Brush />,
    "layout": <Layers />,
    "animation": <Zap />,
    
    // Manager icons
    "leadership": <Users />,
    "management": <Briefcase />,
    "team": <Users />,
    "strategy": <TrendingUp />,
    "agile": <Workflow />,
    "scrum": <Clock />,
    "project": <Clock />,
    "budget": <TrendingUp />,
    "stakeholder": <Share2 />,
    "communication": <MessageCircle />,
    
    // Marketer icons
    "marketing": <TrendingUp />,
    "seo": <Globe />,
    "social": <Share2 />,
    "content": <BookOpen />,
    "analytics": <PieChart />,
    "campaign": <TrendingUp />,
    "brand": <Award />,
    "email": <MessageCircle />,
    "copywriting": <BookOpen />,
    
    // General skills
    "presentation": <Layers />,
    "time": <Clock />,
    "research": <Compass />,
    "problem": <Coffee />,
    "delivery": <Truck />,
    "remote": <Globe />
  };
  
  // Get relevant categories based on presetType
  const getCategories = () => {
    if (customCategories) {
      return customCategories;
    }
    
    return presetCategories[presetType] || presetCategories.custom;
  };
  
  // Function to categorize skills
  const categorizeSkills = (skillsArray, categories) => {
    const categorized = categories.map(category => ({
      ...category,
      skills: []
    }));
    
    // Handle empty skills array
    if (!skillsArray || skillsArray.length === 0) {
      return categorized;
    }
    
    // First pass: try to match skills with categories based on keywords
    skillsArray.forEach(skill => {
        console.log(skill)
      const skillLower = skill?.toLowerCase();
      let matched = false;
      
      // Check each category for keyword matches
      for (const category of categorized) {
        if (category.keywords && category.keywords.length > 0) {
          // Check if any keyword is in the skill
          if (category.keywords.some(keyword => skillLower.includes(keyword.toLowerCase()))) {
            category.skills.push(skill);
            matched = true;
            break;
          }
        }
      }
      
      // If not matched to any category, add to the last category as "Other"
      if (!matched) {
        // Check if we need to create or use an "Other" category
        let otherCategory = categorized.find(cat => cat.name === "Other");
        
        if (!otherCategory) {
          // If we're using custom categories and there's no "Other" category, add to the last one
          categorized[categorized.length - 1].skills.push(skill);
        } else {
          otherCategory.skills.push(skill);
        }
      }
    });
    
    // For presets, if a category is empty, check if we should create an "Other" category
    if (presetType !== "custom" && !customCategories) {
      const emptyCategories = categorized.filter(cat => cat.skills.length === 0);
      const nonEmptyCategories = categorized.filter(cat => cat.skills.length > 0);
      
      if (emptyCategories.length > 0 && nonEmptyCategories.length > 0) {
        // Remove empty categories
        return nonEmptyCategories;
      }
    }
    
    return categorized;
  };
  
  // Get the appropriate icon for a skill
  const getSkillIcon = (skill) => {
    const skillLower = skill.toLowerCase();
    const matchedKey = Object.keys(expandedIconMap).find(key => skillLower.includes(key));
    return matchedKey ? expandedIconMap[matchedKey] : <Award />;
  };
  
  // Get and categorize skills
  const categories = getCategories();
  const categorizedSkills = categorizeSkills(skills, categories);
  
  // Filter out empty categories
  const finalCategories = categorizedSkills.filter(category => category.skills.length > 0);
  
  // If all categories are empty, create a default category with all skills
  const displayCategories = finalCategories.length > 0 ? finalCategories : [{
    name: "Skills",
    icon: <Award className="h-5 w-5" />,
    skills: skills
  }];
  
  // Section header component
 
  return (
    <section
      className="py-20 relative overflow-hidden"
      style={{
        backgroundColor: theme.muted,
      }}
    >
      {/* Background decorative elements */}
      <div className="absolute w-full h-full top-0 left-0 pointer-events-none overflow-hidden opacity-5">
        <div className="absolute top-20 right-20 w-72 h-72 rounded-full" style={{ background: theme.primary }} />
        <div className="absolute bottom-16 left-20 w-56 h-56 rounded-full" style={{ background: theme.secondary }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full" 
             style={{ background: theme.primary, opacity: 0.2 }} />
        
        {/* Code-like pattern */}
        <div className="grid grid-cols-12 grid-rows-12 gap-8 w-full h-full absolute">
          {Array.from({ length: 12 }).map((_, rowIdx) => (
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
          ))}
        </div>
      </div>
      
      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        <SectionHeader
          title={sectionTitle}
          subtitle={sectionSubtitle}
        />
        
        <div className="space-y-10">
          {displayCategories.map((category, idx) => (
            <div 
              key={idx}
              className="transform transition-all duration-500"
              style={{
                opacity: animateItems ? 1 : 0,
                transform: animateItems ? "translateY(0)" : "translateY(30px)",
                transitionDelay: `${idx * 150}ms`,
              }}
            >
              <div className="flex items-center mb-4 gap-2">
                <div 
                  className="p-2 rounded-lg"
                  style={{ background: `linear-gradient(135deg, ${theme.primary}15, ${theme.secondary}15)` }}
                >
                  {category.icon}
                </div>
                <h3 
                  className="text-xl font-semibold"
                  style={{ color: theme.dark, fontFamily: theme.fontHeading }}
                >
                  {category.name}
                </h3>
                <div className="flex-grow h-px ml-3" style={{ background: `linear-gradient(to right, ${theme.primary}30, transparent)` }}></div>
              </div>
              
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, i) => {
                  const skillIcon = getSkillIcon(skill);
                  
                  return (
                    <div
                      key={i}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-full transition-all duration-300 hover:shadow-md hover:-translate-y-1"
                      style={{
                        background: `linear-gradient(135deg, ${theme.background}, ${theme.card})`,
                        color: theme.dark,
                        fontFamily: theme.fontBody,
                        border: `1px solid ${theme.accent}`,
                        transitionDelay: `${i * 50}ms`,
                      }}
                    >
                      <div className="text-sm" style={{ color: theme.primary }}>
                        {React.cloneElement(skillIcon, { size: 14 })}
                      </div>
                      <span className="font-medium">{skill}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-16 opacity-10 overflow-hidden">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full">
          <path 
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
            style={{ fill: theme.primary }}
          />
        </svg>
      </div>
    </section>
  );
};

export default SkillsSection;