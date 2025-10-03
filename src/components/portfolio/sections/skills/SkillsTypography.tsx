import React, { useState } from "react";

interface Skill {
  name: string;
  level: number;
  category: string;
  yearsExperience?: number;
  status?: "active" | "learning" | "expert";
}

interface ComponentProps {
  // Content Props
  title?: string;
  subtitle?: string;
  description?: string;
  skills?: Skill[];
  showProgressBars?: boolean;
  showProficiency?: boolean;
  showExperience?: boolean;
  showStatus?: boolean;
  categories?: string[];

  // Style Props
  backgroundColor?: string;
  textColor?: string;
  primaryColor?: string;
  secondaryColor?: string;
  paddingY?: string;
  paddingX?: string;
  textAlign?: "left" | "center" | "right";
  fontSize?: string;
  fontWeight?: string;
  borderRadius?: string;
  shadow?: string;

  // Global Theme
  globalTheme?: any;
}

const SkillsTypography: React.FC<ComponentProps> = ({
  title = "SKILLS.EXE",
  subtitle = "TECHNICAL EXPERTISE",
  description = "A comprehensive breakdown of my technical arsenal and proficiency levels.",
  skills = [
    {
      name: "JavaScript",
      level: 95,
      category: "Frontend",
      yearsExperience: 5,
      status: "expert",
    },
    {
      name: "React",
      level: 90,
      category: "Frontend",
      yearsExperience: 4,
      status: "expert",
    },
    {
      name: "TypeScript",
      level: 85,
      category: "Frontend",
      yearsExperience: 3,
      status: "active",
    },
    {
      name: "Node.js",
      level: 80,
      category: "Backend",
      yearsExperience: 3,
      status: "active",
    },
    {
      name: "Python",
      level: 75,
      category: "Backend",
      yearsExperience: 2,
      status: "active",
    },
    {
      name: "Docker",
      level: 70,
      category: "DevOps",
      yearsExperience: 2,
      status: "learning",
    },
    {
      name: "AWS",
      level: 65,
      category: "Cloud",
      yearsExperience: 1,
      status: "learning",
    },
    {
      name: "MongoDB",
      level: 80,
      category: "Database",
      yearsExperience: 3,
      status: "active",
    },
  ],
  showProgressBars = true,
  showProficiency = true,
  showExperience = true,
  showStatus = true,
  categories = ["Frontend", "Backend", "DevOps", "Cloud", "Database"],
  backgroundColor = "#ffffff",
  textColor = "#111827",
  primaryColor = "#3b82f6",
  secondaryColor = "#64748b",
  paddingY = "64",
  paddingX = "16",
  textAlign = "center",
  fontSize = "xl",
  fontWeight = "bold",
  borderRadius = "0",
  shadow = "none",
}) => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "expert":
        return primaryColor; // Use primary color for expert status
      case "active":
        return primaryColor;
      case "learning":
        return secondaryColor; // Use secondary color for learning status
      default:
        return secondaryColor;
    }
  };

  const getStatusLabel = (status?: string) => {
    switch (status) {
      case "expert":
        return "EXPERT";
      case "active":
        return "ACTIVE";
      case "learning":
        return "LEARNING";
      default:
        return "FAMILIAR";
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
    boxShadow: shadow !== "none" ? shadow : undefined,
    fontFamily: "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
    position: "relative",
    overflow: "hidden",
  };

  const gridOverlayStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `
      linear-gradient(${primaryColor}08 1px, transparent 1px),
      linear-gradient(90deg, ${primaryColor}08 1px, transparent 1px)
    `,
    backgroundSize: "40px 40px",
    pointerEvents: "none",
  };

  return (
    <section style={sectionStyle} className="relative">
      <div style={gridOverlayStyle}></div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center justify-center mb-4">
            <div
              className="h-px flex-1 max-w-20"
              style={{ backgroundColor: primaryColor }}
            ></div>
            <span
              className="px-4 text-xs font-bold tracking-widest uppercase"
              style={{ color: secondaryColor }}
            >
              {subtitle}
            </span>
            <div
              className="h-px flex-1 max-w-20"
              style={{ backgroundColor: primaryColor }}
            ></div>
          </div>

          <h2
            className="text-xl md:text-2xl  ont-black mb-6 tracking-tight"
            style={{
              // fontSize: `clamp(2.5rem, 6vw, 6rem)`,
              fontWeight: 900,
              color: textColor,
              lineHeight: 0.9,
              fontSize: fontSize,
            }}
          >
            {title}
          </h2>

          {description && (
            <p
              className="text-base md:text-lg max-w-3xl mx-auto leading-relaxed"
              style={{
                color: secondaryColor,
                lineHeight: 1.7,
              }}
            >
              {description}
            </p>
          )}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {skills.map((skill, index) => (
            <div
              key={skill.name}
              className="group relative transition-all duration-300 hover:scale-105 p-2"
              style={{
                backgroundColor:
                  hoveredSkill === skill.name
                    ? `${primaryColor}10`
                    : "transparent",
                border: `2px solid ${
                  hoveredSkill === skill.name ? primaryColor : "transparent"
                }`,
                borderRadius: `${borderRadius}px`,
                animationDelay: `${index * 0.1}s`,
              }}
              onMouseEnter={() => setHoveredSkill(skill.name)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              {/* Skill Header */}
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3
                    className="text-sm md:text-lg font-black tracking-tight mb-1"
                    style={{ color: textColor }}
                  >
                    {skill.name}
                  </h3>
                  <span
                    className="text-xs font-bold tracking-widest uppercase hidden md:block"
                    style={{ color: secondaryColor }}
                  >
                    {skill.category}
                  </span>
                </div>

                {showStatus && skill.status && (
                  <div className="text-right">
                    <div
                      className="w-2.5 h-2.5 rounded-full mb-1"
                      style={{ backgroundColor: getStatusColor(skill.status) }}
                    ></div>
                    <span
                      className="text-xs font-bold tracking-widest"
                      style={{ color: getStatusColor(skill.status) }}
                    >
                      {getStatusLabel(skill.status)}
                    </span>
                  </div>
                )}
              </div>

              {/* Progress Bar */}
              {showProgressBars && showProficiency && (
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span
                      className="text-xs font-bold"
                      style={{ color: secondaryColor }}
                    >
                      PROFICIENCY
                    </span>
                    <span
                      className="text-base font-black"
                      style={{ color: primaryColor }}
                    >
                      {skill.level}%
                    </span>
                  </div>
                  <div
                    className="w-full h-2 rounded-full overflow-hidden"
                    style={{ backgroundColor: `${secondaryColor}20` }}
                  >
                    <div
                      className="h-full transition-all duration-1000 ease-out"
                      style={{
                        backgroundColor: primaryColor,
                        width: `${skill.level}%`,
                        transform:
                          hoveredSkill === skill.name
                            ? "scaleY(1.2)"
                            : "scaleY(1)",
                        transformOrigin: "left center",
                      }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Experience */}
              {showExperience && skill.yearsExperience && (
                <div className="flex items-center justify-between">
                  <span
                    className="text-xs font-bold tracking-widest uppercase"
                    style={{ color: secondaryColor }}
                  >
                    EXPERIENCE
                  </span>
                  <span
                    className="text-xs font-black"
                    style={{ color: textColor }}
                  >
                    {skill.yearsExperience}Y
                  </span>
                </div>
              )}

              {/* Accent Line */}
              <div
                className="absolute bottom-0 left-0 h-1 transition-all duration-300"
                style={{
                  backgroundColor: primaryColor,
                  width: hoveredSkill === skill.name ? "100%" : "0%",
                }}
              ></div>
            </div>
          ))}
        </div>

        {/* Bottom Accent */}
        <div className="flex items-center justify-center mt-16">
          <div
            className="h-px flex-1 max-w-32"
            style={{ backgroundColor: `${primaryColor}40` }}
          ></div>
          <div
            className="w-2 h-2 mx-4 rounded-full"
            style={{ backgroundColor: primaryColor }}
          ></div>
          <div
            className="h-px flex-1 max-w-32"
            style={{ backgroundColor: `${primaryColor}40` }}
          ></div>
        </div>
      </div>
    </section>
  );
};

export default SkillsTypography;
