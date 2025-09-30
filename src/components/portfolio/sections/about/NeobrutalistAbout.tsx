import React, { useState } from "react";
import {
  Award,
  Target,
  Rocket,
  Users,
  Trophy,
  Heart,
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
  borderColor?: string;
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

  // Global Theme (not used but kept for consistency)
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

  backgroundColor = "#22d3ee", // Tailwind cyan-400
  textColor = "#000000",
  primaryColor = "#000000",
  secondaryColor = "#1f2937", // Tailwind gray-800
  accentColor = "#f59e0b", // Tailwind amber-500
  shadowColor = "#000000",
  borderColor = "#000000",
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

  // --- Helper Functions ---

  // Converts Tailwind font size names to responsive clamp values
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

  // Maps icon names to Lucide React components
  const getIcon = (iconName: string) => {
    const iconMap: { [key: string]: React.ComponentType<any> } = {
      award: Award,
      target: Target,
      rocket: Rocket,
      users: Users,
      trophy: Trophy,
      heart: Heart,
      // coffee: Coffee,
      star: Star,
      briefcase: Briefcase,
      calendar: Calendar,
      mappin: MapPin,
    };
    return iconMap[iconName] || Award;
  };

  // --- Neobrutalist Styles Calculation ---

  const containerStyles: React.CSSProperties = {
    backgroundColor,
    color: textColor,
    // Enforce sharp corners for brutalism
    borderRadius: "0px",
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

  // Define consistent shadow and hover shadow
  const neoBrutalShadow = `${shadowOffset}px ${shadowOffset}px 0px ${shadowColor}`;
  const neoBrutalHoverShadow = `${parseInt(shadowOffset) + 4}px ${parseInt(shadowOffset) + 4
    }px 0px ${shadowColor}`;

  // Function to apply default shadow
  const applyDefaultShadow = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.boxShadow = neoBrutalShadow;
  };

  // Function to apply hover shadow and slight transformation
  const applyHoverStyle = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.boxShadow = neoBrutalHoverShadow;
    // Optional: Add a slight "press" effect on hover for responsiveness
    e.currentTarget.style.transform = "translate(-2px, -2px)";
  };

  // Function to reset style
  const resetStyle = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.boxShadow = neoBrutalShadow;
    e.currentTarget.style.transform = "translate(0px, 0px)";
  };

  // --- JSX Rendering ---

  return (
    <section
      className={`py-${paddingY} px-4 sm:px-${paddingX} relative overflow-hidden`}
      style={containerStyles}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className={`mb-20 text-${textAlign}`}>
          <h2 className="mb-6" style={titleStyles}>
            {title}
          </h2>
          <p className="mb-8" style={subtitleStyles}>
            {subtitle}
          </p>
        </div>

        {/* Story Section - Removed all rotational transforms */}
        {showStory && (
          <div className="mb-20">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
              {/* Main Story Block */}
              <div
                className="p-8 border transition-all duration-300 cursor-pointer"
                style={{
                  backgroundColor: backgroundColor,
                  borderColor: primaryColor,
                  borderWidth: `${borderWidth}px`,
                  boxShadow: neoBrutalShadow,
                  textAlign: textAlign,
                }}
                onMouseEnter={applyHoverStyle}
                onMouseLeave={resetStyle}
              >
                {/* Title Tag - Removed rotation */}
                <div
                  className="inline-block px-4 py-2 border mb-6"
                  style={{
                    backgroundColor: accentColor, // Use accent for visual pop
                    borderColor: primaryColor,
                    borderWidth: `2px`,
                    color: primaryColor,
                    fontFamily: "'Space Grotesk', 'Inter', sans-serif",
                    fontWeight: "800",
                    textTransform: "uppercase",
                    fontSize: getFontSize("lg"),
                    textAlign: textAlign,
                    boxShadow: `4px 4px 0px ${shadowColor}`, // Add a small shadow here too
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

              {/* Mission Block */}
              <div
                className="p-8 border transition-all duration-300 cursor-pointer"
                style={{
                  backgroundColor: backgroundColor,
                  borderColor: primaryColor,
                  borderWidth: `${borderWidth}px`,
                  boxShadow: neoBrutalShadow,
                  textAlign: textAlign,
                }}
                onMouseEnter={applyHoverStyle}
                onMouseLeave={resetStyle}
              >
                <p
                  className="text-2xl font-extrabold mb-4 uppercase"
                  style={{
                    color: accentColor,
                    fontFamily: "'Space Grotesk', 'Inter', sans-serif",
                    textAlign: textAlign,
                  }}
                >
                  The Mission
                </p>
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

        {/* Quote Section - Removed translational transform */}
        {showQuote && (
          <div className="mb-20">
            <div
              className="max-w-4xl mx-auto p-8 border transition-all duration-300 cursor-pointer"
              style={{
                backgroundColor: accentColor, // Use accent color for high contrast
                borderColor: primaryColor,
                borderWidth: `${borderWidth}px`,
                boxShadow: neoBrutalShadow,
                textAlign: textAlign,
              }}
              onMouseEnter={applyHoverStyle}
              onMouseLeave={resetStyle}
            >
              <div className="mb-4">
                <Quote size={48} color={primaryColor} />
              </div>

              <blockquote
                className="mb-6 italic"
                style={{
                  color: primaryColor,
                  fontSize: getFontSize("2xl"), // Make quote stand out
                  fontFamily: "'Space Grotesk', 'Inter', sans-serif",
                }}
              >
                &quot;{quote}&quot;
              </blockquote>

              <div
                className="inline-block px-4 py-2 border font-bold"
                style={{
                  backgroundColor: primaryColor, // Invert colors for authorship tag
                  borderColor: primaryColor,
                  borderWidth: `2px`,
                  color: accentColor,
                  fontFamily: "'Space Grotesk', 'Inter', sans-serif",
                  boxShadow: `4px 4px 0px ${secondaryColor}`,
                }}
              >
                - {quoteAuthor}
              </div>
            </div>
          </div>
        )}

        {/* Experience Timeline - Simplified navigation styling */}
        {showExperience && (
          <div className="mb-20">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Experience Navigation */}
              <div className="space-y-4">
                {experience.map((exp, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveExperience(index)}
                    className={`w-full p-4 border transition-all duration-300 flex items-center justify-between ${activeExperience === index
                        ? "shadow-none translate-x-1 translate-y-1" // "Pressed" state
                        : "hover:translate-x-0.5 hover:translate-y-0.5"
                      }`}
                    style={{
                      backgroundColor:
                        activeExperience === index
                          ? secondaryColor
                          : backgroundColor,
                      borderColor: borderColor,
                      borderWidth: `${borderWidth}px`,
                      boxShadow:
                        activeExperience === index
                          ? "none"
                          : neoBrutalShadow, // Only show shadow when inactive
                      color:
                        activeExperience === index ? backgroundColor : primaryColor, // Swap text color
                      textAlign: textAlign,
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <Briefcase size={20} color={activeExperience === index ? backgroundColor : primaryColor} />
                      <div>
                        <div
                          className="font-bold text-lg"
                          style={{
                            fontFamily: "'Space Grotesk', 'Inter', sans-serif",
                            textAlign: textAlign,
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
                    </div>
                    <ChevronRight size={16} />
                  </button>
                ))}
              </div>

              {/* Experience Details */}
              <div className="lg:col-span-2">
                {experience.map((exp, index) => (
                  <div
                    key={index}
                    className={`transition-all duration-500 ${activeExperience === index ? "block" : "hidden"
                      }`}
                  >
                    <div
                      className="p-8 border transition-all duration-300 cursor-pointer"
                      style={{
                        backgroundColor: backgroundColor,
                        borderColor: borderColor,
                        borderWidth: `${borderWidth}px`,
                        boxShadow: neoBrutalShadow,
                        textAlign: textAlign,
                      }}
                      onMouseEnter={applyHoverStyle}
                      onMouseLeave={resetStyle}
                    >
                      <div className="flex flex-col sm:flex-row items-start justify-between mb-6">
                        <div>
                          <h3
                            className="text-2xl font-bold mb-2 uppercase"
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
                              color: secondaryColor,
                              textAlign: textAlign,
                              fontFamily:
                                "'Space Grotesk', 'Inter', sans-serif",
                            }}
                          >
                            {exp.company}
                          </p>
                        </div>
                        <span
                          className="mt-4 sm:mt-0 px-4 py-2 border font-bold flex-shrink-0"
                          style={{
                            backgroundColor: secondaryColor,
                            borderColor: borderColor,
                            borderWidth: `2px`,
                            color: backgroundColor, // Background color for text
                            fontFamily: "'Space Grotesk', 'Inter', sans-serif",
                            boxShadow: `4px 4px 0px ${accentColor}`, // Accent color pop
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

                      <div className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
                        {exp.highlights.map((highlight, highlightIndex) => (
                          <div
                            key={highlightIndex}
                            className="flex items-center gap-3"
                          >
                            <div
                              className="w-2 h-2 flex-shrink-0"
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

        {/* Achievements Timeline - Removed rotational transforms */}
        {showAchievements && (
          <div className="mb-20">


            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {achievements.map((achievement, index) => {
                const IconComponent = getIcon(achievement.icon || "award");
                const blockBg = index % 2 === 0 ? secondaryColor : backgroundColor;
                const blockTextColor = index % 2 === 0 ? backgroundColor : primaryColor;

                return (
                  <div
                    key={index}
                    className="p-6 border transition-all duration-300 cursor-pointer"
                    style={{
                      backgroundColor: blockBg,
                      borderColor: borderColor,
                      borderWidth: `${borderWidth}px`,
                      boxShadow: neoBrutalShadow,
                    }}
                    onMouseEnter={applyHoverStyle}
                    onMouseLeave={resetStyle}
                  >
                    <div className="flex flex-col sm:flex-row items-start gap-4">
                      <div
                        className="w-12 h-12 border flex items-center justify-center flex-shrink-0"
                        style={{
                          backgroundColor: accentColor,
                          borderColor: borderColor,
                          borderWidth: `2px`,
                          boxShadow: `4px 4px 0px ${primaryColor}`,
                        }}
                      >
                        <IconComponent size={24} color={primaryColor} />
                      </div>

                      <div className="flex-1 flex flex-col">
                        <div className="flex flex-col sm:flex-row sm:justify-between mb-3">
                          <h4
                            className="text-lg font-bold mb-2 uppercase"
                            style={{
                              color: blockTextColor,
                              textAlign: textAlign,
                              fontSize: getFontSize("lg"),
                              fontFamily: "'Space Grotesk', 'Inter', sans-serif",
                            }}
                          >
                            {achievement.title}
                          </h4>
                          <span
                            className="px-3 py-1 border text-sm font-bold"
                            style={{
                              backgroundColor: primaryColor,
                              borderColor: borderColor,
                              color: blockBg,
                              fontFamily: "'Space Grotesk', 'Inter', sans-serif",
                              boxShadow: `2px 2px 0px ${accentColor}`,
                              alignSelf: "flex-start",
                            }}
                          >
                            {achievement.year}
                          </span>
                        </div>

                        <p
                          className="leading-relaxed font-medium text-sm"
                          style={{
                            color: blockTextColor,
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
