import React, { useState, useEffect } from "react";

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  status: "live" | "development" | "archived" | "featured";
  year: string;
  technologies: string[];
  image?: string;
  liveUrl?: string;
  githubUrl?: string;
  caseStudyUrl?: string;
  color: string;
  priority?: "high" | "medium" | "low";
}

interface ComponentProps {
  // Content Props
  title?: string;
  subtitle?: string;
  description?: string;
  projects?: Project[];
  showTechnologies?: boolean;
  showStatus?: boolean;
  showYear?: boolean;
  showLinks?: boolean;
  showImages?: boolean;
  animateOnScroll?: boolean;
  layoutStyle?: "tilted" | "grid" | "stacked";
  filterByStatus?: boolean;
  sortBy?: "year" | "status" | "title" | "priority";

  // Style Props
  backgroundColor?: string;
  textColor?: string;
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  borderColor?: string;
  paddingY?: string;
  paddingX?: string;
  textAlign?: "left" | "center" | "right";
  fontSize?: string;
  fontWeight?: string;
  borderRadius?: string;
  shadow?: string;
  borderWidth?: string;
  showNoise?: boolean;
  brutalistShadows?: boolean;
  maxTilt?: number;

  // Global Theme
  globalTheme?: any;
}

const NeobrutalistProjects: React.FC<ComponentProps> = ({
  title = "MY PROJECTS",
  subtitle = "BUILT WITH PASSION",
  description = "A showcase of digital products, experiments, and solutions I've crafted with code and creativity.",
  projects = [
    {
      id: "1",
      title: "E-COMMERCE BEAST",
      description: "Full-stack e-commerce platform with real-time inventory, payment processing, and admin dashboard. Built for scale and performance.",
      category: "WEB APP",
      status: "live",
      year: "2024",
      technologies: ["REACT", "NODE.JS", "MONGODB", "STRIPE"],
      image: "https://placehold.co/400x300/ff6b35/ffffff?text=ECOMMERCE",
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/user/project",
      color: "#ff6b35",
      priority: "high",
    },
    {
      id: "2", 
      title: "AI CHAT INTERFACE",
      description: "Modern chat application with AI integration, real-time messaging, and smart responses. Clean UI with powerful backend.",
      category: "AI/ML",
      status: "development",
      year: "2024",
      technologies: ["TYPESCRIPT", "PYTHON", "OPENAI", "WEBSOCKETS"],
      image: "https://placehold.co/400x300/06ffa5/ffffff?text=AI+CHAT",
      githubUrl: "https://github.com/user/ai-chat",
      color: "#06ffa5",
      priority: "high",
    },
    {
      id: "3",
      title: "PORTFOLIO BUILDER",
      description: "Drag-and-drop portfolio builder with 50+ components, themes, and export options. Made for creators and developers.",
      category: "TOOL",
      status: "featured",
      year: "2023",
      technologies: ["REACT", "TAILWIND", "FRAMER", "NEXT.JS"],
      image: "https://placehold.co/400x300/ffd23f/ffffff?text=PORTFOLIO",
      liveUrl: "https://portfolio-builder.com",
      caseStudyUrl: "https://case-study.com",
      color: "#ffd23f",
      priority: "high",
    },
    {
      id: "4",
      title: "CRYPTO TRACKER",
      description: "Real-time cryptocurrency tracking dashboard with portfolio management, alerts, and market analysis tools.",
      category: "FINTECH",
      status: "archived",
      year: "2023",
      technologies: ["VUE.JS", "PYTHON", "REDIS", "WEBSOCKETS"],
      image: "https://placehold.co/400x300/4ecdc4/ffffff?text=CRYPTO",
      githubUrl: "https://github.com/user/crypto-tracker",
      color: "#4ecdc4",
      priority: "medium",
    },
    {
      id: "5",
      title: "TASK MANAGEMENT",
      description: "Minimalist task manager with team collaboration, time tracking, and project analytics. Simple yet powerful.",
      category: "PRODUCTIVITY",
      status: "live",
      year: "2023",
      technologies: ["SVELTE", "FIREBASE", "TYPESCRIPT"],
      image: "https://placehold.co/400x300/f7931e/ffffff?text=TASKS",
      liveUrl: "https://task-manager.com",
      color: "#f7931e",
      priority: "medium",
    },
    {
      id: "6",
      title: "WEATHER VISUALIZER",
      description: "Interactive weather data visualization with maps, charts, and forecasting. Beautiful UI meets powerful data.",
      category: "DATA VIZ",
      status: "development",
      year: "2024",
      technologies: ["D3.JS", "REACT", "MAPBOX", "API"],
      image: "https://placehold.co/400x300/96ceb4/ffffff?text=WEATHER",
      color: "#96ceb4",
      priority: "low",
    },
  ],
  showTechnologies = true,
  showStatus = true,
  showYear = true,
  showLinks = true,
  showImages = true,
  animateOnScroll = true,
  layoutStyle = "tilted",
  filterByStatus = false,
  sortBy = "priority",
  backgroundColor = "#fffef7",
  textColor = "#111111",
  primaryColor = "#ff6b35",
  secondaryColor = "#666666",
  accentColor = "#ffd23f",
  borderColor = "#111111",
  paddingY = "100",
  paddingX = "20",
  textAlign = "left",
  fontSize = "xl",
  fontWeight = "900",
  borderRadius = "0",
  shadow = "12px 12px 0px #111111",
  borderWidth = "4",
  showNoise = true,
  brutalistShadows = true,
  maxTilt = 8,
}) => {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [visibleProjects, setVisibleProjects] = useState<string[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>("all");

  useEffect(() => {
    if (animateOnScroll) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const projectId = entry.target.getAttribute('data-project-id');
              if (projectId && !visibleProjects.includes(projectId)) {
                setVisibleProjects(prev => [...prev, projectId]);
              }
            }
          });
        },
        { threshold: 0.1 }
      );

      const projectElements = document.querySelectorAll('[data-project-id]');
      projectElements.forEach(el => observer.observe(el));

      return () => observer.disconnect();
    }
  }, [animateOnScroll, visibleProjects]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "live":
        return "#06ffa5";
      case "development":
        return "#ffd23f";
      case "featured":
        return "#ff6b35";
      case "archived":
        return "#666666";
      default:
        return secondaryColor;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "live":
        return "LIVE";
      case "development":
        return "IN DEV";
      case "featured":
        return "FEATURED";
      case "archived":
        return "ARCHIVED";
      default:
        return status.toUpperCase();
    }
  };

  const getTiltAngle = (index: number) => {
    if (layoutStyle !== "tilted") return 0;
    const angles = [2, -1, 3, -2, 1, -3, 2, -1];
    return angles[index % angles.length] * (maxTilt / 3);
  };

  const sortedProjects = [...projects].sort((a, b) => {
    switch (sortBy) {
      case "year":
        return parseInt(b.year) - parseInt(a.year);
      case "status":
        const statusOrder = { featured: 0, live: 1, development: 2, archived: 3 };
        return statusOrder[a.status] - statusOrder[b.status];
      case "title":
        return a.title.localeCompare(b.title);
      case "priority":
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return (priorityOrder[a.priority || "low"] || 2) - (priorityOrder[b.priority || "low"] || 2);
      default:
        return 0;
    }
  });

  const filteredProjects = filterByStatus && activeFilter !== "all"
    ? sortedProjects.filter(project => project.status === activeFilter)
    : sortedProjects;

  const sectionStyle: React.CSSProperties = {
    backgroundColor,
    color: textColor,
    paddingTop: `${paddingY}px`,
    paddingBottom: `${paddingY}px`,
    paddingLeft: `${paddingX}px`,
    paddingRight: `${paddingX}px`,
    fontFamily: "'Arial Black', 'Helvetica', sans-serif",
    position: "relative",
    overflow: "hidden",
  };

  const noiseStyle: React.CSSProperties = showNoise
    ? {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `
          radial-gradient(circle at 20% 80%, ${textColor}06 1px, transparent 1px),
          radial-gradient(circle at 80% 20%, ${textColor}04 1px, transparent 1px),
          radial-gradient(circle at 40% 40%, ${textColor}03 1px, transparent 1px)
        `,
        backgroundSize: "30px 30px, 45px 45px, 60px 60px",
        pointerEvents: "none",
      }
    : {};

  return (
    <section style={sectionStyle} className="relative">
      {/* Noise Texture */}
      <div style={noiseStyle}></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Brutal Header */}
        <div className="mb-20" style={{ textAlign }}>
          {/* Subtitle Block */}
          <div
            className="inline-block p-6 mb-8 border-4 transform rotate-1"
            style={{
              backgroundColor: primaryColor,
              borderColor: borderColor,
              boxShadow: brutalistShadows ? `16px 16px 0px ${borderColor}` : shadow,
            }}
          >
            <span
              className="text-sm font-black tracking-[0.4em] uppercase block"
              style={{ color: backgroundColor }}
            >
              {subtitle}
            </span>
          </div>

          {/* Main Title */}
          <h2
            className="text-5xl md:text-7xl font-black mb-8 tracking-tight transform hover:scale-105 transition-all duration-300"
            style={{
              color: textColor,
              fontSize: fontSize,
              fontWeight: parseInt(fontWeight),
              textShadow: brutalistShadows ? `6px 6px 0px ${primaryColor}` : undefined,
            }}
          >
            {title}
          </h2>

          {/* Description Block */}
          {description && (
            <div
              className="max-w-4xl mx-auto p-8 border-4 transform -rotate-1"
              style={{
                backgroundColor: accentColor,
                borderColor: borderColor,
                boxShadow: brutalistShadows ? `8px 8px 0px ${borderColor}` : shadow,
                textAlign: "left",
              }}
            >
              <p
                className="text-lg md:text-xl font-bold leading-tight"
                style={{
                  color: textColor,
                  lineHeight: 1.4,
                }}
              >
                {description}
              </p>
            </div>
          )}
        </div>

        {/* Filter Tabs */}
        {filterByStatus && (
          <div className="flex flex-wrap gap-4 mb-12 justify-center">
            {["all", "live", "development", "featured", "archived"].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className="px-6 py-3 border-4 font-black text-sm tracking-wider uppercase transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: activeFilter === filter ? primaryColor : backgroundColor,
                  borderColor: borderColor,
                  color: activeFilter === filter ? backgroundColor : textColor,
                  boxShadow: activeFilter === filter && brutalistShadows 
                    ? `6px 6px 0px ${borderColor}` 
                    : brutalistShadows ? `3px 3px 0px ${borderColor}` : shadow,
                }}
              >
                {filter === "all" ? "ALL PROJECTS" : getStatusLabel(filter)}
              </button>
            ))}
          </div>
        )}

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              data-project-id={project.id}
              className="group relative transition-all duration-500 hover:scale-105 cursor-pointer"
              style={{
                transform: `rotate(${getTiltAngle(index)}deg) ${
                  hoveredProject === project.id ? `rotate(${getTiltAngle(index) + 2}deg)` : ""
                }`,
                opacity: animateOnScroll ? (visibleProjects.includes(project.id) ? 1 : 0.3) : 1,
                transition: "all 0.5s ease",
              }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Main Project Card */}
              <div
                className="border-4 overflow-hidden relative"
                style={{
                  backgroundColor: project.color,
                  borderColor: borderColor,
                  borderWidth: `${borderWidth}px`,
                  borderRadius: `${borderRadius}px`,
                  boxShadow:
                    hoveredProject === project.id && brutalistShadows
                      ? `20px 20px 0px ${borderColor}`
                      : brutalistShadows
                      ? `12px 12px 0px ${borderColor}`
                      : shadow,
                }}
              >
                {/* Status Indicator */}
                {showStatus && (
                  <div className="absolute top-4 right-4 z-20">
                    <div
                      className="px-3 py-2 border-2 font-black text-xs tracking-wider flex items-center gap-2"
                      style={{
                        backgroundColor: getStatusColor(project.status),
                        borderColor: textColor,
                        color: textColor,
                      }}
                    >
                      <div
                        className="w-3 h-3 rounded-full animate-pulse"
                        style={{
                          backgroundColor: project.status === "live" ? "#00ff00" : 
                                           project.status === "development" ? "#ffff00" :
                                           project.status === "featured" ? "#ff4500" : "#808080"
                        }}
                      ></div>
                      {getStatusLabel(project.status)}
                    </div>
                  </div>
                )}

                {/* Project Image */}
                {showImages && project.image && (
                  <div className="relative overflow-hidden h-48">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(45deg, ${project.color}40, transparent)`,
                      }}
                    ></div>
                  </div>
                )}

                {/* Project Content */}
                <div className="p-6">
                  {/* Category & Year */}
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="px-3 py-1 border-2 text-xs font-black tracking-wider"
                      style={{
                        backgroundColor: backgroundColor,
                        borderColor: textColor,
                        color: textColor,
                      }}
                    >
                      {project.category}
                    </div>
                    {showYear && (
                      <span
                        className="text-2xl font-black"
                        style={{ color: backgroundColor }}
                      >
                        {project.year}
                      </span>
                    )}
                  </div>

                  {/* Project Title */}
                  <h3
                    className="text-2xl md:text-3xl font-black tracking-tight mb-4"
                    style={{ color: textColor }}
                  >
                    {project.title}
                  </h3>

                  {/* Project Description */}
                  <p
                    className="text-base font-bold mb-6 leading-tight"
                    style={{ color: textColor }}
                  >
                    {project.description}
                  </p>

                  {/* Technologies */}
                  {showTechnologies && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2 py-1 border-2 text-xs font-black tracking-wide"
                          style={{
                            backgroundColor: textColor,
                            borderColor: textColor,
                            color: backgroundColor,
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Action Links */}
                  {showLinks && (
                    <div className="flex flex-wrap gap-3">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 border-2 font-black text-sm tracking-wider uppercase transition-all duration-300 hover:scale-105"
                          style={{
                            backgroundColor: "#06ffa5",
                            borderColor: textColor,
                            color: textColor,
                            boxShadow: brutalistShadows ? `4px 4px 0px ${textColor}` : undefined,
                          }}
                        >
                          LIVE
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 border-2 font-black text-sm tracking-wider uppercase transition-all duration-300 hover:scale-105"
                          style={{
                            backgroundColor: backgroundColor,
                            borderColor: textColor,
                            color: textColor,
                            boxShadow: brutalistShadows ? `4px 4px 0px ${textColor}` : undefined,
                          }}
                        >
                          CODE
                        </a>
                      )}
                      {project.caseStudyUrl && (
                        <a
                          href={project.caseStudyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 border-2 font-black text-sm tracking-wider uppercase transition-all duration-300 hover:scale-105"
                          style={{
                            backgroundColor: accentColor,
                            borderColor: textColor,
                            color: textColor,
                            boxShadow: brutalistShadows ? `4px 4px 0px ${textColor}` : undefined,
                          }}
                        >
                          CASE STUDY
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Brutal Accent */}
        <div className="flex items-center justify-center mt-20 gap-8">
          <div
            className="w-12 h-12 border-4 transform rotate-45"
            style={{
              backgroundColor: primaryColor,
              borderColor: borderColor,
              boxShadow: brutalistShadows ? `6px 6px 0px ${borderColor}` : undefined,
            }}
          ></div>
        
          <div
            className="w-12 h-12 border-4 transform rotate-45"
            style={{
              backgroundColor: primaryColor,
              borderColor: borderColor,
              boxShadow: brutalistShadows ? `6px 6px 0px ${borderColor}` : undefined,
            }}
          ></div>
        </div>
      </div>
    </section>
  );
};

export default NeobrutalistProjects;