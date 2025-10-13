import React, { useMemo } from "react";
import { PortfolioFontLoader } from "@/lib/portfolioFontLoader";
import { getFontWithDefault } from "@/lib/componentDefaultFonts";
import { getFontSize } from "@/lib/utils";

interface Skill {
  name: string;
  level: number;
  category?: string;
  yearsExperience?: number;
  status?: "learning" | "proficient" | "expert";
}

interface MinimalSkillsProps {
  title?: string;
  subtitle?: string;
  description?: string;
  skills?: Skill[];
  showLevelBars?: boolean;
  showExperience?: boolean;
  showStatus?: boolean;
  showCategories?: boolean;
  backgroundColor?: string;
  textColor?: string;
  primaryColor?: string;
  secondaryColor?: string;
  cardBackgroundColor?: string;
  paddingY?: string;
  paddingX?: string;
  textAlign?: string;
  fontSize?: string;
  fontWeight?: string;
  borderRadius?: string;
  shadow?: string;
  globalTheme?: any;
}

const MinimalSkills: React.FC<MinimalSkillsProps> = ({
  title = "Skills",
  subtitle = "What I Work With",
  description = "Technologies and tools I use to bring ideas to life",
  skills = [
    {
      name: "React",
      level: 90,
      category: "Frontend",
      yearsExperience: 5,
      status: "expert",
    },
    {
      name: "TypeScript",
      level: 85,
      category: "Languages",
      yearsExperience: 4,
      status: "proficient",
    },
    {
      name: "Node.js",
      level: 80,
      category: "Backend",
      yearsExperience: 4,
      status: "proficient",
    },
    {
      name: "Next.js",
      level: 85,
      category: "Frontend",
      yearsExperience: 3,
      status: "expert",
    },
    {
      name: "Tailwind CSS",
      level: 90,
      category: "Styling",
      yearsExperience: 3,
      status: "expert",
    },
    {
      name: "MongoDB",
      level: 75,
      category: "Database",
      yearsExperience: 3,
      status: "proficient",
    },
  ],
  showLevelBars = true,
  showExperience = false,
  showStatus = false,
  showCategories = true,
  backgroundColor = "#ffffff",
  textColor = "#1f2937",
  primaryColor = "#3b82f6",
  secondaryColor = "#6b7280",
  cardBackgroundColor = "#f9fafb",
  paddingY = "80",
  paddingX = "16",
  textAlign = "center",
  fontSize = "base",
  fontWeight = "normal",
  borderRadius = "0",
  shadow = "none",
  globalTheme,
}) => {
  // Helper to create rgba from hex
  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const sectionStyle: React.CSSProperties = {
    backgroundColor,
    color: textColor,
    paddingTop: `${paddingY}px`,
    paddingBottom: `${paddingY}px`,
    paddingLeft: `${paddingX}px`,
    paddingRight: `${paddingX}px`,
    fontFamily: PortfolioFontLoader.getThemeFontStyle(globalTheme, "body")
      .fontFamily,
  };

  const bodyFont = useMemo(() => {
    const fontName = getFontWithDefault(globalTheme, "body", "typography");
    return PortfolioFontLoader.getFontFamily(fontName);
  }, [globalTheme]);

  const headingFont = useMemo(() => {
    const fontName = getFontWithDefault(globalTheme, "heading", "typography");
    return PortfolioFontLoader.getFontFamily(fontName);
  }, [globalTheme]);

  // Group skills by category if needed
  const groupedSkills = showCategories
    ? skills.reduce((acc, skill) => {
        const category = skill.category || "Other";
        if (!acc[category]) acc[category] = [];
        acc[category].push(skill);
        return acc;
      }, {} as Record<string, Skill[]>)
    : { "All Skills": skills };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "expert":
        return "#10b981";
      case "proficient":
        return primaryColor;
      case "learning":
        return "#f59e0b";
      default:
        return secondaryColor;
    }
  };

  return (
    <section style={sectionStyle}>
      <div className="max-w-7xl mx-auto">
        {/* Header with decorative element */}
        <div className="text-center mb-16 relative">
          {/* Decorative line accent */}
          <div className="flex items-center justify-center mb-8">
            <div
              className="h-px w-12"
              style={{ backgroundColor: hexToRgba(primaryColor, 0.3) }}
            />
            {subtitle && (
              <p
                className="text-xs font-semibold uppercase tracking-widest mx-4"
                style={{
                  color: hexToRgba(primaryColor, 0.8),
                  letterSpacing: "0.2em",
                }}
              >
                {subtitle}
              </p>
            )}
            <div
              className="h-px w-12"
              style={{ backgroundColor: hexToRgba(primaryColor, 0.3) }}
            />
          </div>

          {title && (
            <h2
              className="text-5xl md:text-6xl font-bold relative inline-block mb-6"
              style={{
                color: textColor,
                fontFamily: headingFont,
              }}
            >
              {title}
              {/* Underline accent */}
              <div
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 rounded-full"
                style={{
                  width: "50%",
                  backgroundColor: primaryColor,
                }}
              />
            </h2>
          )}

          {description && (
            <p
              className="max-w-2xl mx-auto mt-8"
              style={{
                color: secondaryColor,
                fontFamily: bodyFont,
                fontWeight: fontWeight,
                fontSize: getFontSize(fontSize),
              }}
            >
              {description}
            </p>
          )}
        </div>

        {/* Compact Skills Grid */}
        <div className="space-y-10">
          {Object.entries(groupedSkills).map(([category, categorySkills]) => (
            <div key={category}>
              {showCategories && Object.keys(groupedSkills).length > 1 && (
                <div className="flex items-center mb-6">
                  <div
                    className="w-2 h-8 rounded-full mr-3"
                    style={{ backgroundColor: primaryColor }}
                  />
                  <h3
                    className="font-bold"
                    style={{
                      color: textColor,
                      fontFamily: headingFont,
                      fontWeight: fontWeight,
                      fontSize: fontSize,
                    }}
                  >
                    {category}
                  </h3>
                  <div
                    className="flex-1 h-px ml-4"
                    style={{ backgroundColor: hexToRgba(primaryColor, 0.15) }}
                  />
                </div>
              )}

              {/* Compact Grid - 3 columns for better space usage */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categorySkills.map((skill, index) => (
                  <div
                    key={index}
                    className="group relative rounded-xl p-5 transition-all duration-300 hover:scale-105"
                    style={{
                      backgroundColor,
                      boxShadow: shadow !== "none" ? shadow : undefined,
                      border: `1px solid ${hexToRgba(primaryColor, 0.9)}`,
                    }}
                  >
                    {/* Top section with name and level */}
                    <div className="flex items-start justify-between mb-3">
                      <h4
                        className="font-bold flex-1"
                        style={{
                          color: textColor,
                          fontFamily: headingFont,
                          fontWeight: fontWeight,
                          fontSize: fontSize,
                        }}
                      >
                        {skill.name}
                      </h4>
                      {showLevelBars && (
                        <div
                          className="ml-2 px-2 py-0.5 rounded-md text-xs font-bold"
                          style={{
                            backgroundColor: hexToRgba(primaryColor, 0.5),
                            fontFamily: bodyFont,
                            fontWeight: fontWeight,
                            fontSize: getFontSize(fontSize),
                            color: primaryColor,
                          }}
                        >
                          {skill.level}%
                        </div>
                      )}
                    </div>

                    {/* Meta info */}
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      {showExperience && skill.yearsExperience && (
                        <span
                          className="text-xs px-2 py-0.5 rounded-md"
                          style={{
                            color: secondaryColor,
                            backgroundColor: hexToRgba(secondaryColor, 0.9),
                            fontFamily: bodyFont,
                            fontWeight: fontWeight,
                            fontSize: getFontSize(fontSize),
                          }}
                        >
                          {skill.yearsExperience}+ yrs
                        </span>
                      )}
                      {showStatus && skill.status && (
                        <span
                          className="text-xs px-2 py-0.5 rounded-md font-medium"
                          style={{
                            backgroundColor: hexToRgba(
                              getStatusColor(skill.status),
                              0.15
                            ),
                            color: getStatusColor(skill.status),
                            fontFamily: bodyFont,
                            fontWeight: fontWeight,
                            fontSize: getFontSize(fontSize),
                          }}
                        >
                          {skill.status.charAt(0).toUpperCase() +
                            skill.status.slice(1)}
                        </span>
                      )}
                    </div>

                    {/* Circular progress indicator */}
                    {showLevelBars && (
                      <div className="relative">
                        {/* Background bar */}
                        <div
                          className="w-full h-1.5 rounded-full overflow-hidden"
                          style={{
                            backgroundColor: hexToRgba(primaryColor, 0.1),
                            fontFamily: bodyFont,
                            fontWeight: fontWeight,
                            fontSize: getFontSize(fontSize),
                          }}
                        >
                          {/* Progress bar with gradient effect */}
                          <div
                            className="h-full rounded-full transition-all duration-700 ease-out"
                            style={{
                              width: `${skill.level}%`,
                              background: `linear-gradient(90deg, ${primaryColor} 0%, ${hexToRgba(
                                primaryColor,
                                0.7
                              )} 100%)`,
                              fontFamily: bodyFont,
                              fontWeight: fontWeight,
                              fontSize: getFontSize(fontSize),
                            }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Hover indicator */}
                    <div
                      className="absolute top-0 right-0 w-12 h-12 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: `linear-gradient(135deg, ${hexToRgba(
                          primaryColor,
                          0.1
                        )} 0%, transparent 100%)`,
                        fontFamily: bodyFont,
                        fontWeight: fontWeight,
                        fontSize: getFontSize(fontSize),
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MinimalSkills;
