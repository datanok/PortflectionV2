import React, { useState } from "react";
import {
  Award,
  Target,
  Rocket,
  Users,
  Trophy,
  Heart,
  Coffee,
  Calendar,
  MapPin,
  Briefcase,
  Star,
  ChevronRight,
  Quote,
} from "lucide-react";

interface Achievement {
  title: string;
  description: string;
  year: string;
  icon?: string;
}

interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
  highlights: string[];
}

interface Value {
  title: string;
  description: string;
  icon: string;
}

interface NeobrutalistAboutProps {
  // Content Props
  title?: string;
  subtitle?: string;
  story?: string;
  mission?: string;
  quote?: string;
  quoteAuthor?: string;

  achievements?: Achievement[];
  experience?: Experience[];
  values?: Value[];

  showStory?: boolean;
  showExperience?: boolean;
  showAchievements?: boolean;
  showValues?: boolean;
  showQuote?: boolean;

  // Style Props
  backgroundColor?: string;
  textColor?: string;
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  shadowColor?: string;
  paddingY?: string;
  paddingX?: string;
  textAlign?: "left" | "center" | "right";
  fontSize?: string;
  fontWeight?: string;
  borderRadius?: string;
  shadowOffset?: string;
  borderWidth?: string;

  // Global Theme
  globalTheme?: any;
}

const NeobrutalistAbout: React.FC<NeobrutalistAboutProps> = ({
  title = "MY STORY",
  subtitle = "THE JOURNEY SO FAR",
  story = "Started as a curious kid who broke more computers than fixed them. Fast forward through countless late-night coding sessions, failed projects that taught me everything, and eureka moments that kept me going. Today, I'm passionate about creating digital experiences that don't just work, but make people's lives better.",
  mission = "My mission is simple: turn complex problems into elegant solutions. I believe great software should feel like magic to users while being rock-solid under the hood.",
  quote = "Code is poetry written in logic, and every bug is just a plot twist waiting for its resolution.",
  quoteAuthor = "Me, after fixing a particularly stubborn bug at 3 AM",

  achievements = [
    {
      title: "First App Published",
      description:
        "Built and launched my first mobile app that got 1000+ downloads in the first month",
      year: "2020",
      icon: "rocket",
    },
    {
      title: "Team Lead Promotion",
      description:
        "Promoted to lead a team of 5 developers on a major product redesign",
      year: "2022",
      icon: "users",
    },
    {
      title: "Open Source Contribution",
      description:
        "Contributed to popular open-source projects with 50k+ GitHub stars",
      year: "2023",
      icon: "star",
    },
    {
      title: "Speaking Engagement",
      description:
        "Gave my first tech conference talk about modern web development",
      year: "2024",
      icon: "award",
    },
  ],

  experience = [
    {
      role: "Senior Full Stack Developer",
      company: "TechCorp Inc.",
      period: "2022 - Present",
      description:
        "Leading development of scalable web applications and mentoring junior developers.",
      highlights: [
        "Improved app performance by 60%",
        "Led team of 5 developers",
        "Architected microservices infrastructure",
        "Reduced deployment time by 80%",
      ],
    },
    {
      role: "Frontend Developer",
      company: "StartupXYZ",
      period: "2020 - 2022",
      description:
        "Built responsive user interfaces and collaborated with design team.",
      highlights: [
        "Increased user engagement by 40%",
        "Built component library used across products",
        "Implemented automated testing pipeline",
        "Mentored 2 junior developers",
      ],
    },
    {
      role: "Junior Developer",
      company: "WebSolutions Ltd.",
      period: "2019 - 2020",
      description:
        "Started my journey building websites and learning the fundamentals.",
      highlights: [
        "Built 15+ client websites",
        "Learned modern development practices",
        "Contributed to internal tools",
        "Earned full-stack certification",
      ],
    },
  ],

  values = [
    {
      title: "Quality First",
      description:
        "I believe in writing clean, maintainable code that stands the test of time.",
      icon: "target",
    },
    {
      title: "User-Centric",
      description:
        "Every line of code I write has the end user's experience in mind.",
      icon: "heart",
    },
    {
      title: "Continuous Learning",
      description:
        "Technology evolves fast, and I make sure to evolve with it.",
      icon: "rocket",
    },
    {
      title: "Team Player",
      description: "Great software is built by great teams working together.",
      icon: "users",
    },
  ],

  showStory = true,
  showExperience = true,
  showAchievements = true,
  showValues = true,
  showQuote = true,

  backgroundColor = "#22d3ee",
  textColor = "#000000",
  primaryColor = "#000000",
  secondaryColor = "#1f2937",
  accentColor = "#f59e0b",
  shadowColor = "#000000",
  paddingY = "120",
  paddingX = "32",
  textAlign = "left",
  fontSize = "4xl",
  fontWeight = "black",
  borderRadius = "0",
  shadowOffset = "8",
  borderWidth = "4",
  globalTheme,
}) => {
  const [activeExperience, setActiveExperience] = useState(0);

  const getFontSize = (size: string) => {
    const sizeMap: { [key: string]: string } = {
      xs: "clamp(0.75rem, 2vw, 1rem)",
      sm: "clamp(0.875rem, 2vw, 1.125rem)",
      base: "clamp(1rem, 2.5vw, 1.25rem)",
      lg: "clamp(1.125rem, 3vw, 1.5rem)",
      xl: "clamp(1.25rem, 3.5vw, 1.75rem)",
      "2xl": "clamp(1.5rem, 4vw, 2rem)",
      "3xl": "clamp(1.875rem, 5vw, 2.5rem)",
      "4xl": "clamp(2.25rem, 6vw, 3rem)",
      "5xl": "clamp(3rem, 8vw, 4rem)",
      "6xl": "clamp(3.75rem, 10vw, 5rem)",
    };
    return sizeMap[size] || size;
  };

  const getIcon = (iconName: string) => {
    const iconMap: { [key: string]: React.ComponentType<any> } = {
      award: Award,
      target: Target,
      rocket: Rocket,
      users: Users,
      trophy: Trophy,
      heart: Heart,
      coffee: Coffee,
      star: Star,
      briefcase: Briefcase,
      calendar: Calendar,
      mappin: MapPin,
    };
    return iconMap[iconName] || Award;
  };

  const containerStyles: React.CSSProperties = {
    backgroundColor,
    color: textColor,
    borderRadius: borderRadius !== "0" ? `${borderRadius}px` : "0px",
  };

  const titleStyles: React.CSSProperties = {
    color: primaryColor,
    fontSize: getFontSize(fontSize),
    fontWeight: fontWeight === "black" ? "900" : fontWeight,
    fontFamily: "'Space Grotesk', 'Inter', sans-serif",
    lineHeight: "0.9",
    letterSpacing: "-0.025em",
    textTransform: "uppercase",
    textAlign: textAlign,
  };

  const subtitleStyles: React.CSSProperties = {
    color: secondaryColor,
    fontSize: getFontSize("xl"),
    fontWeight: "700",
    fontFamily: "'Space Grotesk', 'Inter', sans-serif",
    letterSpacing: "0.05em",
    textTransform: "uppercase",
    textAlign: textAlign,
  };

  const neoBrutalShadow = `${shadowOffset}px ${shadowOffset}px 0px ${shadowColor}`;
  const neoBrutalHoverShadow = `${parseInt(shadowOffset) + 2}px ${
    parseInt(shadowOffset) + 2
  }px 0px ${shadowColor}`;

  return (
    <section
      className={`py-${paddingY} px-4 sm:px-${paddingX} relative overflow-hidden`}
      style={containerStyles}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className={`mb-16 text-${textAlign}`}>
          <h2 className="mb-6" style={titleStyles}>
            {title}
          </h2>
          <p className="mb-8" style={subtitleStyles}>
            {subtitle}
          </p>
        </div>

        {/* Story Section */}
        {showStory && (
          <div className="mb-16">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
              {/* Main Story */}
              <div
                className="p-8 border transform -rotate-1 hover:rotate-0 transition-all duration-500"
                style={{
                  backgroundColor: backgroundColor,
                  borderColor: primaryColor,
                  borderWidth: `${borderWidth}px`,
                  boxShadow: neoBrutalShadow,
                  textAlign: textAlign,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = neoBrutalHoverShadow;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = neoBrutalShadow;
                }}
              >
                <div
                  className="inline-block px-4 py-2 border mb-6 transform rotate-2"
                  style={{
                    backgroundColor: backgroundColor,
                    borderColor: primaryColor,
                    borderWidth: `2px`,
                    color: textColor,
                    fontFamily: "'Space Grotesk', 'Inter', sans-serif",
                    fontWeight: "800",
                    textTransform: "uppercase",
                    fontSize: getFontSize("lg"),
                    textAlign: textAlign,
                  }}
                >
                  The Origin Story
                </div>

                <p
                  className="text-lg leading-relaxed font-medium"
                  style={{
                    color: primaryColor,
                    textAlign: textAlign,
                    fontFamily: "'Space Grotesk', 'Inter', sans-serif",
                  }}
                >
                  {story}
                </p>
              </div>

              {/* Mission */}
              <div
                className="p-8 border transform rotate-1 hover:rotate-0 transition-all duration-500"
                style={{
                  backgroundColor: backgroundColor,
                  borderColor: primaryColor,
                  borderWidth: `${borderWidth}px`,
                  boxShadow: neoBrutalShadow,
                  textAlign: textAlign,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = neoBrutalHoverShadow;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = neoBrutalShadow;
                }}
              >
                <p
                  className="text-lg leading-relaxed font-medium"
                  style={{
                    color: primaryColor,
                    fontFamily: "'Space Grotesk', 'Inter', sans-serif",
                    textAlign: textAlign,
                  }}
                >
                  {mission}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Quote Section */}
        {showQuote && (
          <div className="mb-16">
            <div
              className="max-w-4xl mx-auto p-8 border transform hover:-translate-y-2 transition-all duration-300"
              style={{
                backgroundColor: backgroundColor,
                borderColor: primaryColor,
                borderWidth: `${borderWidth}px`,
                boxShadow: neoBrutalShadow,
                textAlign: textAlign,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = neoBrutalHoverShadow;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = neoBrutalShadow;
              }}
            >
              <div className="mb-4">
                <Quote size={40} color={textColor} />
              </div>

              <blockquote
                className=" mb-6 italic"
                style={{
                  color: textColor,
                  fontSize: getFontSize("lg"),
                  fontFamily: "'Space Grotesk', 'Inter', sans-serif",
                }}
              >
                &quot;{quote}&quot;
              </blockquote>

              <div
                className="inline-block px-4 py-2 border font-bold"
                style={{
                  backgroundColor: backgroundColor,
                  borderColor: primaryColor,
                  borderWidth: `2px`,
                  color: textColor,
                  fontFamily: "'Space Grotesk', 'Inter', sans-serif",
                }}
              >
                - {quoteAuthor}
              </div>
            </div>
          </div>
        )}

        {/* Experience Timeline */}
        {showExperience && (
          <div className="mb-16">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Experience Navigation */}
              <div className="space-y-4">
                {experience.map((exp, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveExperience(index)}
                    className={`w-full border transform transition-all duration-300 ${
                      activeExperience === index
                        ? "hover:-translate-y-1 -translate-y-1"
                        : "hover:-translate-y-1"
                    }`}
                    style={{
                      backgroundColor:
                        activeExperience === index
                          ? accentColor
                          : backgroundColor,
                      borderColor: primaryColor,
                      borderWidth: `${borderWidth}px`,
                      boxShadow:
                        activeExperience === index
                          ? neoBrutalHoverShadow
                          : `4px 4px 0px ${shadowColor}`,
                      color:
                        activeExperience === index ? textColor : primaryColor,
                      textAlign: textAlign,
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <Briefcase size={20} />
                      <div>
                        <div
                          className="font-bold"
                          style={{
                            fontFamily: "'Space Grotesk', 'Inter', sans-serif",
                          }}
                        >
                          {exp.company}
                        </div>
                        <div
                          className="text-sm opacity-80"
                          style={{
                            fontFamily: "'Space Grotesk', 'Inter', sans-serif",
                            textAlign: textAlign,
                          }}
                        >
                          {exp.period}
                        </div>
                      </div>
                      <ChevronRight size={16} className="ml-auto" />
                    </div>
                  </button>
                ))}
              </div>

              {/* Experience Details */}
              <div className="lg:col-span-2">
                {experience.map((exp, index) => (
                  <div
                    key={index}
                    className={`transition-all duration-500 ${
                      activeExperience === index ? "block" : "hidden"
                    }`}
                  >
                    <div
                      className="p-8 border transform hover:-translate-y-1 hover:translate-x-1 transition-all duration-300"
                      style={{
                        backgroundColor: backgroundColor,
                        borderColor: primaryColor,
                        borderWidth: `${borderWidth}px`,
                        boxShadow: neoBrutalShadow,
                        textAlign: textAlign,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = neoBrutalHoverShadow;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = neoBrutalShadow;
                      }}
                    >
                      <div className="flex items-start justify-between mb-6">
                        <div>
                          <h3
                            className="text-2xl font-bold mb-2"
                            style={{
                              color: primaryColor,
                              textAlign: textAlign,
                              fontFamily:
                                "'Space Grotesk', 'Inter', sans-serif",
                            }}
                          >
                            {exp.role}
                          </h3>
                          <p
                            className="font-bold text-lg"
                            style={{
                              color: accentColor,
                              textAlign: textAlign,
                              fontFamily:
                                "'Space Grotesk', 'Inter', sans-serif",
                            }}
                          >
                            {exp.company}
                          </p>
                        </div>
                        <span
                          className="px-4 py-2 border font-bold"
                          style={{
                            backgroundColor: accentColor,
                            borderColor: primaryColor,
                            borderWidth: `2px`,
                            color: textColor,
                            fontFamily: "'Space Grotesk', 'Inter', sans-serif",
                          }}
                        >
                          {exp.period}
                        </span>
                      </div>

                      <p
                        className="text-lg mb-6 leading-relaxed"
                        style={{
                          color: secondaryColor,
                          fontFamily: "'Space Grotesk', 'Inter', sans-serif",
                        }}
                      >
                        {exp.description}
                      </p>

                      <div
                        className="mb-4 font-bold uppercase tracking-wider"
                        style={{
                          color: primaryColor,
                          fontFamily: "'Space Grotesk', 'Inter', sans-serif",
                          fontSize: "0.875rem",
                        }}
                      >
                        Key Achievements:
                      </div>

                      <div className="space-y-3">
                        {exp.highlights.map((highlight, highlightIndex) => (
                          <div
                            key={highlightIndex}
                            className="flex items-center gap-3"
                          >
                            <div
                              className="w-2 h-2"
                              style={{ backgroundColor: accentColor }}
                            />
                            <span
                              className="font-medium"
                              style={{
                                color: secondaryColor,
                                fontFamily:
                                  "'Space Grotesk', 'Inter', sans-serif",
                              }}
                            >
                              {highlight}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Achievements Timeline */}
        {showAchievements && (
          <div className="mb-16">
            <div
              className="inline-block px-6 py-3 border mb-8 transform rotate-1"
              style={{
                backgroundColor: "#ffffff",
                borderColor: primaryColor,
                borderWidth: `${borderWidth}px`,
                boxShadow: neoBrutalShadow,
                fontFamily: "'Space Grotesk', 'Inter', sans-serif",
                fontWeight: "800",
                color: primaryColor,
                textTransform: "uppercase",
                fontSize: getFontSize("xl"),
              }}
            >
              Milestone Moments
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {achievements.map((achievement, index) => {
                const IconComponent = getIcon(achievement.icon || "award");
                const isOdd = index % 2 === 1;

                return (
                  <div
                    key={index}
                    className={`p-6 border transform transition-all duration-300 ${
                      isOdd
                        ? "rotate-1 hover:rotate-0"
                        : "-rotate-1 hover:rotate-0"
                    } hover:-translate-y-2`}
                    style={{
                      backgroundColor: isOdd ? "#f3f4f6" : "#ffffff",
                      borderColor: primaryColor,
                      borderWidth: `${borderWidth}px`,
                      boxShadow: neoBrutalShadow,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = neoBrutalHoverShadow;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = neoBrutalShadow;
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className="w-16 h-16 border flex items-center justify-center flex-shrink-0"
                        style={{
                          backgroundColor: accentColor,
                          borderColor: primaryColor,
                          borderWidth: `2px`,
                        }}
                      >
                        <IconComponent size={24} color={textColor} />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <h4
                            className="text-lg font-bold"
                            style={{
                              color: primaryColor,
                              textAlign: textAlign,
                              fontSize: getFontSize("lg"),
                              fontFamily:
                                "'Space Grotesk', 'Inter', sans-serif",
                            }}
                          >
                            {achievement.title}
                          </h4>
                          <span
                            className="px-3 py-1 border text-sm font-bold"
                            style={{
                              backgroundColor: primaryColor,
                              borderColor: primaryColor,
                              color: backgroundColor,
                              fontFamily:
                                "'Space Grotesk', 'Inter', sans-serif",
                            }}
                          >
                            {achievement.year}
                          </span>
                        </div>

                        <p
                          className="leading-relaxed font-medium"
                          style={{
                            color: secondaryColor,
                            fontFamily: "'Space Grotesk', 'Inter', sans-serif",
                          }}
                        >
                          {achievement.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default NeobrutalistAbout;
