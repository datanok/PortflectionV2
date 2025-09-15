import React, { useState, useEffect } from "react";

interface Skill {
  name: string;
  level: number;
  category: string;
  yearsExperience?: number;
  projects?: number;
  status?: "mastered" | "proficient" | "learning";
  color?: string;
}

interface ComponentProps {
  // Content Props
  title?: string;
  subtitle?: string;
  description?: string;
  skills?: Skill[];
  showLevelBars?: boolean;
  showExperience?: boolean;
  showProjects?: boolean;
  showStatus?: boolean;
  showCategories?: boolean;
  animateOnLoad?: boolean;
  layoutStyle?: "blocks" | "stack" | "masonry";
  sortBy?: "level" | "experience" | "projects" | "name";

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

  // Global Theme
  globalTheme?: any;
}

const NeoBrutalistSkills: React.FC<ComponentProps> = ({
  title = "MY SKILLS",
  subtitle = "TECHNICAL ARSENAL",
  description = "Raw, unfiltered breakdown of my technical capabilities and expertise levels.",
  skills = [
    {
      name: "REACT",
      level: 95,
      category: "FRONTEND",
      yearsExperience: 4,
      projects: 25,
      status: "mastered",
      color: "#ff6b35",
    },
    {
      name: "TYPESCRIPT",
      level: 90,
      category: "LANGUAGE",
      yearsExperience: 3,
      projects: 20,
      status: "mastered",
      color: "#f7931e",
    },
    {
      name: "NODE.JS",
      level: 85,
      category: "BACKEND",
      yearsExperience: 3,
      projects: 15,
      status: "proficient",
      color: "#ffd23f",
    },
    {
      name: "PYTHON",
      level: 80,
      category: "LANGUAGE",
      yearsExperience: 2,
      projects: 12,
      status: "proficient",
      color: "#06ffa5",
    },
    {
      name: "DOCKER",
      level: 75,
      category: "DEVOPS",
      yearsExperience: 2,
      projects: 8,
      status: "learning",
      color: "#4ecdc4",
    },
    {
      name: "AWS",
      level: 70,
      category: "CLOUD",
      yearsExperience: 1,
      projects: 6,
      status: "learning",
      color: "#45b7d1",
    },
    {
      name: "GRAPHQL",
      level: 85,
      category: "API",
      yearsExperience: 2,
      projects: 10,
      status: "proficient",
      color: "#96ceb4",
    },
    {
      name: "MONGODB",
      level: 80,
      category: "DATABASE",
      yearsExperience: 3,
      projects: 18,
      status: "proficient",
      color: "#ffeaa7",
    },
  ],
  showLevelBars = true,
  showExperience = true,
  showProjects = true,
  showStatus = true,
  showCategories = true,
  animateOnLoad = true,
  layoutStyle = "blocks",
  sortBy = "level",
  backgroundColor = "#fffef7",
  textColor = "#111111",
  primaryColor = "#ff6b35",
  secondaryColor = "#666666",
  accentColor = "#ffd23f",
  borderColor = "#111111",
  paddingY = "80",
  paddingX = "20",
  textAlign = "center",
  fontSize = "xl",
  fontWeight = "900",
  borderRadius = "0",
  shadow = "8px 8px 0px #111111",
  borderWidth = "4",
  showNoise = true,
  brutalistShadows = true,
}) => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [animationStep, setAnimationStep] = useState(0);

  useEffect(() => {
    if (animateOnLoad) {
      const timer = setInterval(() => {
        setAnimationStep((prev) => (prev < skills.length ? prev + 1 : prev));
      }, 150);

      return () => clearInterval(timer);
    }
  }, [animateOnLoad, skills.length]);

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "mastered":
        return "#06ffa5";
      case "proficient":
        return primaryColor;
      case "learning":
        return accentColor;
      default:
        return secondaryColor;
    }
  };

  const getStatusLabel = (status?: string) => {
    switch (status) {
      case "mastered":
        return "MASTERED";
      case "proficient":
        return "PROFICIENT";
      case "learning":
        return "LEARNING";
      default:
        return "FAMILIAR";
    }
  };



  const sortedSkills = [...skills].sort((a, b) => {
    switch (sortBy) {
      case "level":
        return b.level - a.level;
      case "experience":
        return (b.yearsExperience || 0) - (a.yearsExperience || 0);
      case "projects":
        return (b.projects || 0) - (a.projects || 0);
      case "name":
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const getGridColumns = () => {
    const count = skills.length;
    if (count <= 4) return "grid-cols-1 md:grid-cols-2 lg:grid-cols-4";
    if (count <= 6) return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
    if (count <= 8) return "grid-cols-1 md:grid-cols-2 lg:grid-cols-4";
    return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
  };

  const getLayoutClasses = (layoutStyle: "blocks" | "stack" | "masonry" = "blocks") => {
    switch (layoutStyle) {
      case "stack":
        return "flex flex-row gap-8 overflow-auto"; // stacked vertically
      case "masonry":
        return "columns-2 md:columns-3 gap-6 [column-fill:_balance]"; // masonry columns
      case "blocks":
      default:
        return `grid ${getGridColumns()} gap-8`; // default grid blocks
    }
  };


  const sectionStyle: React.CSSProperties = {
    backgroundColor,
    color: textColor,
    paddingTop: `${paddingY}px`,
    paddingBottom: `${paddingY}px`,
    paddingLeft: `${paddingX}px`,
    paddingRight: `${paddingX}px`,
    textAlign,
    borderRadius: `${borderRadius}px`,
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
          radial-gradient(circle at 25% 25%, ${textColor}08 1px, transparent 1px),
          radial-gradient(circle at 75% 75%, ${textColor}05 1px, transparent 1px)
        `,
      backgroundSize: "20px 20px, 30px 30px",
      pointerEvents: "none",
    }
    : {};

  return (
    <section style={sectionStyle} className="relative">
      {/* Noise Texture */}
      <div style={noiseStyle}></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-20">
          {/* Brutal Header Block */}
          <div
            className="inline-block p-6 mb-8 border-4 transform -rotate-2"
            style={{
              backgroundColor: primaryColor,
              borderColor: borderColor,
              boxShadow: brutalistShadows ? `12px 12px 0px ${borderColor}` : shadow,
            }}
          >
            <span
              className="text-sm font-black tracking-[0.3em] uppercase block"
              style={{ color: backgroundColor }}
            >
              {subtitle}
            </span>
          </div>

          <h2
            className="text-4xl md:text-6xl font-black mb-8 tracking-tight transform hover:scale-105 transition-transform duration-300"
            style={{
              color: textColor,
              fontSize: fontSize,
              fontWeight: 900,
              textShadow: brutalistShadows ? `4px 4px 0px ${primaryColor}` : undefined,
            }}
          >
            {title}
          </h2>

          {description && (
            <div
              className="max-w-4xl mx-auto p-6 border-4"
              style={{
                backgroundColor: accentColor,
                borderColor: borderColor,
                boxShadow: brutalistShadows ? `6px 6px 0px ${borderColor}` : shadow,
              }}
            >
              <p
                className="text-base md:text-lg font-bold leading-tight"
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

        {/* Skills Grid */}
        <div style={sectionStyle}>
          <div className={getLayoutClasses(layoutStyle)}>
            {sortedSkills.map((skill, index) => (
              <div
                key={skill.name}
                className={`group relative transition-all duration-300 hover:scale-105 cursor-pointer ${layoutStyle === "masonry" ? "mb-6 break-inside-avoid" : ""
                  }`}
                style={{
                  opacity: animateOnLoad && index >= animationStep ? 0.3 : 1,
                  transform: `translateY(${animateOnLoad && index >= animationStep ? 30 : 0
                    }px) rotate(${hoveredSkill === skill.name ? 2 : 0}deg)`,
                }}
                onMouseEnter={() => setHoveredSkill(skill.name)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                {layoutStyle === "stack" ? (
                  // 🔹 Minimal Card: Only Name
                  <div
                    className="p-6 border-4 text-center"
                    style={{
                      backgroundColor: skill.color || primaryColor,
                      borderColor,
                      borderRadius: `${borderRadius}px`,
                      boxShadow:
                        hoveredSkill === skill.name && brutalistShadows
                          ? `12px 12px 0px ${borderColor}`
                          : shadow,
                    }}
                  >
                    <h3
                      className="text-2xl md:text-3xl font-black tracking-tight"
                      style={{ color: textColor }}
                    >
                      {skill.name}
                    </h3>
                  </div>
                ) : (
                  // 🔹 Full Card (existing design)
                  <div
                    className="p-6 border-4 relative overflow-hidden"
                    style={{
                      backgroundColor: skill.color || primaryColor,
                      borderColor,
                      borderWidth: `${borderWidth}px`,
                      borderRadius: `${borderRadius}px`,
                      boxShadow:
                        hoveredSkill === skill.name && brutalistShadows
                          ? `16px 16px 0px ${borderColor}`
                          : brutalistShadows
                            ? `8px 8px 0px ${borderColor}`
                            : shadow,
                      transition: "all 0.3s ease",
                    }}
                  >
                    <div className="mb-6">
                      <h3
                        className="text-xl md:text-2xl font-black tracking-tight mb-2"
                        style={{ color: textColor }}
                      >
                        {skill.name}
                      </h3>

                      {showCategories && (
                        <div
                          className="inline-block px-3 py-1 border-2 text-xs font-black tracking-wider"
                          style={{
                            backgroundColor,
                            borderColor: textColor,
                            color: textColor,
                          }}
                        >
                          {skill.category}
                        </div>
                      )}
                    </div>

                    {/* Level */}
                    <div className="mb-6">
                      <div
                        className="text-4xl md:text-5xl font-black tabular-nums mb-2"
                        style={{ color: textColor }}
                      >
                        {skill.level}
                        <span className="text-2xl">%</span>
                      </div>

                      {showLevelBars && (
                        <div className="relative">
                          <div
                            className="w-full h-6 border-2 overflow-hidden"
                            style={{
                              borderColor: textColor,
                              backgroundColor,
                            }}
                          >
                            <div
                              className="h-full transition-all duration-1000 ease-out border-r-2"
                              style={{
                                backgroundColor: textColor,
                                borderColor: textColor,
                                width: `${skill.level}%`,
                                boxShadow: `inset 0 0 0 2px ${backgroundColor}`,
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Experience + Projects */}
                    <div className="flex gap-4 mb-4">
                      {showExperience && skill.yearsExperience && (
                        <div
                          className="flex-1 p-3 border-2 text-center"
                          style={{ backgroundColor, borderColor: textColor }}
                        >
                          <div
                            className="text-2xl font-black"
                            style={{ color: textColor }}
                          >
                            {skill.yearsExperience}
                          </div>
                          <div
                            className="text-xs font-black tracking-wider uppercase"
                            style={{ color: secondaryColor }}
                          >
                            YEARS
                          </div>
                        </div>
                      )}

                      {showProjects && skill.projects && (
                        <div
                          className="flex-1 p-3 border-2 text-center"
                          style={{ backgroundColor, borderColor: textColor }}
                        >
                          <div
                            className="text-2xl font-black"
                            style={{ color: textColor }}
                          >
                            {skill.projects}
                          </div>
                          <div
                            className="text-xs font-black tracking-wider uppercase"
                            style={{ color: secondaryColor }}
                          >
                            PROJECTS
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Status */}
                    {showStatus && skill.status && (
                      <div
                        className="inline-block px-4 py-2 border-2 font-black text-xs tracking-[0.2em] uppercase"
                        style={{
                          backgroundColor: getStatusColor(skill.status),
                          borderColor: textColor,
                          color: textColor,
                        }}
                      >
                        {getStatusLabel(skill.status)}
                      </div>
                    )}

                    {/* Hover Overlay */}
                    <div
                      className="absolute inset-0 transition-all duration-300 pointer-events-none border-4"
                      style={{
                        backgroundColor:
                          hoveredSkill === skill.name ? `${backgroundColor}20` : "transparent",
                        borderColor: hoveredSkill === skill.name ? textColor : "transparent",
                      }}
                    />
                  </div>
                )}
              </div>
            ))}

          </div>
        </div>


        {/* Bottom Brutal Accent */}
        <div className="flex items-center justify-center mt-20 gap-6">
          <div
            className="w-8 h-8 border-4 transform rotate-45"
            style={{
              backgroundColor: primaryColor,
              borderColor: borderColor,
              boxShadow: brutalistShadows ? `4px 4px 0px ${borderColor}` : undefined,
            }}
          ></div>
      
          <div
            className="w-8 h-8 border-4 transform rotate-45"
            style={{
              backgroundColor: primaryColor,
              borderColor: borderColor,
              boxShadow: brutalistShadows ? `4px 4px 0px ${borderColor}` : undefined,
            }}
          ></div>
        </div>
      </div>
    </section>
  );
};

export default NeoBrutalistSkills;