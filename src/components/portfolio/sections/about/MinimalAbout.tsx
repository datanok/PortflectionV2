import React from "react";
import { PortfolioFontLoader } from "@/lib/portfolioFontLoader";

interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
  highlights?: string[];
}

interface MinimalAboutProps {
  title?: string;
  subtitle?: string;
  story?: string;
  experience?: Experience[];
  showStory?: boolean;
  showExperience?: boolean;
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

const MinimalAbout: React.FC<MinimalAboutProps> = ({
  title = "About Me",
  subtitle = "My Journey",
  story = "I'm a passionate developer with a love for creating beautiful and functional web applications. My journey in tech started years ago, and I've been constantly learning and growing ever since.",
  experience = [
    {
      role: "Senior Developer",
      company: "Tech Company",
      period: "2022 - Present",
      description:
        "Leading development of key features and mentoring junior developers.",
      highlights: [
        "Built scalable applications",
        "Improved performance by 40%",
      ],
    },
    {
      role: "Developer",
      company: "Startup Inc",
      period: "2020 - 2022",
      description:
        "Developed full-stack applications using modern technologies.",
      highlights: ["Launched 5+ products", "Collaborated with design team"],
    },
  ],
  showStory = true,
  showExperience = true,
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

  const headingFontFamily = PortfolioFontLoader.getThemeFontStyle(
    globalTheme,
    "heading"
  ).fontFamily;

  return (
    <section style={sectionStyle}>
      <div className="max-w-6xl mx-auto">
        {/* Header with decorative element */}
        <div className="text-center mb-20 relative">
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
              className="text-5xl md:text-6xl font-bold relative inline-block"
              style={{
                color: textColor,
                fontFamily: headingFontFamily,
              }}
            >
              {title}
              {/* Underline accent */}
              <div
                className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 h-1 rounded-full"
                style={{
                  width: "60%",
                  backgroundColor: primaryColor,
                }}
              />
            </h2>
          )}
        </div>

        {/* Story with side accent */}
        {showStory && story && (
          <div className="mb-20">
            <div className="max-w-3xl mx-auto relative">
              {/* Left accent line */}
              <div
                className="absolute left-0 top-0 bottom-0 w-1 rounded-full"
                style={{ backgroundColor: hexToRgba(primaryColor, 0.2) }}
              />
              <div className="pl-8">
                <p
                  className="text-xl leading-relaxed"
                  style={{ color: secondaryColor }}
                >
                  {story}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Experience with timeline design */}
        {showExperience && experience && experience.length > 0 && (
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-12">
              <div
                className="h-px flex-1 max-w-xs"
                style={{ backgroundColor: hexToRgba(primaryColor, 0.2) }}
              />
              <h3
                className="text-3xl font-bold px-6"
                style={{ color: textColor, fontFamily: headingFontFamily }}
              >
                Experience
              </h3>
              <div
                className="h-px flex-1 max-w-xs"
                style={{ backgroundColor: hexToRgba(primaryColor, 0.2) }}
              />
            </div>

            <div className="relative">
              {/* Vertical timeline line */}
              <div
                className="absolute left-8 top-0 bottom-0 w-px hidden md:block"
                style={{ backgroundColor: hexToRgba(primaryColor, 0.15) }}
              />

              <div className="space-y-8">
                {experience.map((exp, index) => (
                  <div key={index} className="relative">
                    {/* Timeline dot */}
                    <div
                      className="absolute left-6 top-7 w-5 h-5 rounded-full border-4 hidden md:block z-10"
                      style={{
                        backgroundColor,
                        borderColor: primaryColor,
                      }}
                    />

                    <div
                      className="ml-0 md:ml-20 rounded-2xl p-8 transition-all duration-300 hover:scale-105 group"
                      style={{
                        backgroundColor: backgroundColor,
                        boxShadow: `0 4px 6px ${hexToRgba(textColor, 0.05)}`,
                        border: `1px solid ${hexToRgba(primaryColor, 0.1)}`,
                      }}
                    >
                      {/* Period badge */}
                      <div
                        className="inline-block px-4 py-1 rounded-full text-xs font-semibold mb-4"
                        style={{
                          backgroundColor: hexToRgba(primaryColor, 0.1),
                          color: primaryColor,
                        }}
                      >
                        {exp.period}
                      </div>

                      <div className="mb-4">
                        <h4
                          className="text-2xl font-bold mb-2"
                          style={{
                            color: textColor,
                            fontFamily: headingFontFamily,
                          }}
                        >
                          {exp.role}
                        </h4>
                        <p
                          className="text-lg font-semibold"
                          style={{ color: primaryColor }}
                        >
                          {exp.company}
                        </p>
                      </div>

                      <p
                        className="mb-4 text-base leading-relaxed"
                        style={{ color: secondaryColor }}
                      >
                        {exp.description}
                      </p>

                      {exp.highlights && exp.highlights.length > 0 && (
                        <div className="space-y-2 mt-6">
                          {exp.highlights.map((highlight, idx) => (
                            <div key={idx} className="flex items-start">
                              <div
                                className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mr-3 mt-0.5"
                                style={{
                                  backgroundColor: hexToRgba(primaryColor, 0.1),
                                }}
                              >
                                <div
                                  className="w-2 h-2 rounded-sm"
                                  style={{ backgroundColor: primaryColor }}
                                />
                              </div>
                              <span
                                className="text-sm leading-relaxed"
                                style={{ color: secondaryColor }}
                              >
                                {highlight}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MinimalAbout;
