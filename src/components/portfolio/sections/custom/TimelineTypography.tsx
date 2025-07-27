import React, { useState } from "react";

interface TimelineItem {
  id: string;
  title: string;
  organization: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
  description: string;
  technologies?: string[];
  achievements?: string[];
  type?: "work" | "education" | "certification" | "project";
  level?: string; // For education: "Bachelor's", "Master's", etc.
  gpa?: string;
  honors?: string[];
}

interface ComponentProps {
  // Content Props
  title?: string;
  subtitle?: string;
  description?: string;
  timelineItems?: TimelineItem[];
  showTechnologies?: boolean;
  showAchievements?: boolean;
  showLocation?: boolean;
  showType?: boolean;
  timelineType?: "experience" | "education" | "mixed";
  sortOrder?: "newest" | "oldest";

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

const TypographyTimeline: React.FC<ComponentProps> = ({
  title = "EXPERIENCE.LOG",
  subtitle = "PROFESSIONAL JOURNEY",
  description = "A chronological breakdown of my career progression, key achievements, and technical growth.",
  timelineItems = [
    {
      id: "1",
      title: "Senior Frontend Developer",
      organization: "Tech Innovations Inc.",
      location: "San Francisco, CA",
      startDate: "2023-01",
      current: true,
      description:
        "Leading frontend development for enterprise applications, mentoring junior developers, and architecting scalable React-based solutions.",
      technologies: ["React", "TypeScript", "Next.js", "GraphQL", "AWS"],
      achievements: [
        "Reduced bundle size by 40% through code splitting optimization",
        "Led migration from legacy codebase to modern React architecture",
        "Mentored 5 junior developers and established coding standards",
      ],
      type: "work",
    },
    {
      id: "2",
      title: "Frontend Developer",
      organization: "Digital Solutions Co.",
      location: "Austin, TX",
      startDate: "2021-06",
      endDate: "2022-12",
      description:
        "Developed responsive web applications and collaborated with UX/UI teams to implement pixel-perfect designs.",
      technologies: ["React", "JavaScript", "Sass", "Redux", "Jest"],
      achievements: [
        "Improved page load times by 60% through performance optimization",
        "Built reusable component library used across 8 projects",
      ],
      type: "work",
    },
    {
      id: "3",
      title: "Computer Science",
      organization: "University of Technology",
      location: "Boston, MA",
      startDate: "2017-09",
      endDate: "2021-05",
      level: "Bachelor of Science",
      gpa: "3.8/4.0",
      description:
        "Focused on software engineering, algorithms, and web technologies. Active in coding clubs and hackathons.",
      honors: [
        "Magna Cum Laude",
        "Dean's List (6 semesters)",
        "Outstanding CS Student Award",
      ],
      type: "education",
    },
  ],
  showTechnologies = true,
  showAchievements = true,
  showLocation = true,
  showType = true,
  timelineType = "mixed",
  sortOrder = "newest",
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
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  // Sort timeline items
  const sortedItems = [...timelineItems].sort((a, b) => {
    const dateA = new Date(a.startDate);
    const dateB = new Date(b.startDate);
    return sortOrder === "newest"
      ? dateB.getTime() - dateA.getTime()
      : dateA.getTime() - dateB.getTime();
  });

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + "-01");
    return date
      .toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
      })
      .toUpperCase();
  };

  const getTypeIcon = (type?: string) => {
    switch (type) {
      case "work":
        return "💼";
      case "education":
        return "🎓";
      case "certification":
        return "📜";
      case "project":
        return "🚀";
      default:
        return "📍";
    }
  };

  const getTypeColor = (type?: string) => {
    switch (type) {
      case "work":
        return primaryColor;
      case "education":
        return "#10b981";
      case "certification":
        return "#f59e0b";
      case "project":
        return "#8b5cf6";
      default:
        return secondaryColor;
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
      linear-gradient(rgba(59, 130, 246, 0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(59, 130, 246, 0.03) 1px, transparent 1px)
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
              className="px-4 text-sm font-bold tracking-widest uppercase"
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
            className="text-4xl md:text-6xl lg:text-8xl font-black mb-6 tracking-tight"
            style={{
              fontSize: `clamp(3rem, 8vw, 8rem)`,
              fontWeight: 900,
              color: textColor,
              lineHeight: 0.9,
            }}
          >
            {title}
          </h2>

          {description && (
            <p
              className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
              style={{
                color: secondaryColor,
                lineHeight: 1.7,
              }}
            >
              {description}
            </p>
          )}
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div
            className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 transform md:-translate-x-px"
            style={{ backgroundColor: `${primaryColor}40` }}
          ></div>

          {/* Timeline Items */}
          <div className="space-y-12">
            {sortedItems.map((item, index) => (
              <div
                key={item.id}
                className={`relative flex flex-col md:flex-row items-start ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Timeline Node */}
                <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center z-10">
                  <div
                    className="w-4 h-4 rounded-full border-4 transition-all duration-300"
                    style={{
                      backgroundColor: item.current
                        ? getTypeColor(item.type)
                        : backgroundColor,
                      borderColor: getTypeColor(item.type),
                      transform:
                        hoveredItem === item.id ? "scale(1.5)" : "scale(1)",
                    }}
                  ></div>
                </div>

                {/* Content Card */}
                <div
                  className={`w-full md:w-5/12 ml-16 md:ml-0 ${
                    index % 2 === 0 ? "md:mr-8" : "md:ml-8"
                  }`}
                >
                  <div
                    className="group relative transition-all duration-300 hover:scale-105 cursor-pointer"
                    style={{
                      backgroundColor:
                        hoveredItem === item.id
                          ? `${primaryColor}08`
                          : "transparent",
                      border: `2px solid ${
                        hoveredItem === item.id ? primaryColor : "transparent"
                      }`,
                      borderRadius: `${borderRadius}px`,
                      padding: "24px",
                    }}
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                    onClick={() =>
                      setExpandedItem(expandedItem === item.id ? null : item.id)
                    }
                  >
                    {/* Card Header */}
                    <div className="mb-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3
                            className="text-xl font-black tracking-tight mb-1"
                            style={{ color: textColor }}
                          >
                            {item.title}
                          </h3>
                          <div className="flex items-center space-x-2 mb-1">
                            <span
                              className="text-lg font-bold"
                              style={{ color: primaryColor }}
                            >
                              {item.organization}
                            </span>
                            {item.level && (
                              <>
                                <span style={{ color: secondaryColor }}>•</span>
                                <span
                                  className="text-sm font-medium"
                                  style={{ color: secondaryColor }}
                                >
                                  {item.level}
                                </span>
                              </>
                            )}
                          </div>
                          {showLocation && item.location && (
                            <p
                              className="text-sm"
                              style={{ color: secondaryColor }}
                            >
                              📍 {item.location}
                            </p>
                          )}
                        </div>

                        {showType && item.type && (
                          <div className="flex flex-col items-end">
                            <span className="text-2xl mb-1">
                              {getTypeIcon(item.type)}
                            </span>
                            <span
                              className="text-xs font-bold tracking-widest uppercase"
                              style={{ color: getTypeColor(item.type) }}
                            >
                              {item.type}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Date Range */}
                      <div className="flex items-center space-x-2 mb-3">
                        <span
                          className="text-sm font-bold"
                          style={{ color: secondaryColor }}
                        >
                          {formatDate(item.startDate)}
                        </span>
                        <div
                          className="w-6 h-px"
                          style={{ backgroundColor: primaryColor }}
                        ></div>
                        <span
                          className="text-sm font-bold"
                          style={{
                            color: item.current
                              ? getTypeColor(item.type)
                              : secondaryColor,
                          }}
                        >
                          {item.current
                            ? "PRESENT"
                            : item.endDate
                            ? formatDate(item.endDate)
                            : "ONGOING"}
                        </span>
                        {item.current && (
                          <div
                            className="w-2 h-2 rounded-full animate-pulse"
                            style={{ backgroundColor: getTypeColor(item.type) }}
                          ></div>
                        )}
                      </div>

                      {/* GPA for education */}
                      {item.gpa && (
                        <div className="flex items-center space-x-2 mb-2">
                          <span
                            className="text-xs font-bold tracking-widest uppercase"
                            style={{ color: secondaryColor }}
                          >
                            GPA:
                          </span>
                          <span
                            className="text-sm font-bold"
                            style={{ color: primaryColor }}
                          >
                            {item.gpa}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Description */}
                    <p
                      className="text-base leading-relaxed mb-4"
                      style={{
                        color: textColor,
                        lineHeight: 1.6,
                      }}
                    >
                      {item.description}
                    </p>

                    {/* Technologies */}
                    {showTechnologies &&
                      item.technologies &&
                      item.technologies.length > 0 && (
                        <div className="mb-4">
                          <h4
                            className="text-xs font-bold tracking-widest uppercase mb-2"
                            style={{ color: secondaryColor }}
                          >
                            TECH_STACK
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {item.technologies.map((tech, techIndex) => (
                              <span
                                key={tech}
                                className="px-2 py-1 text-xs font-medium border transition-all duration-300 hover:scale-105"
                                style={{
                                  backgroundColor: "transparent",
                                  color: primaryColor,
                                  borderColor: primaryColor,
                                  borderRadius: `${borderRadius}px`,
                                }}
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                    {/* Achievements / Honors */}
                    {showAchievements && (
                      <div>
                        {item.achievements && item.achievements.length > 0 && (
                          <div
                            className={`transition-all duration-300 overflow-hidden ${
                              expandedItem === item.id
                                ? "max-h-96 opacity-100"
                                : "max-h-20 opacity-75"
                            }`}
                          >
                            <h4
                              className="text-xs font-bold tracking-widest uppercase mb-2"
                              style={{ color: secondaryColor }}
                            >
                              KEY_ACHIEVEMENTS
                            </h4>
                            <ul className="space-y-1">
                              {item.achievements.map(
                                (achievement, achIndex) => (
                                  <li
                                    key={achIndex}
                                    className="text-sm flex items-start"
                                    style={{ color: textColor }}
                                  >
                                    <span
                                      className="mr-2 mt-1 flex-shrink-0"
                                      style={{ color: primaryColor }}
                                    >
                                      →
                                    </span>
                                    {achievement}
                                  </li>
                                )
                              )}
                            </ul>
                          </div>
                        )}

                        {item.honors && item.honors.length > 0 && (
                          <div
                            className={`transition-all duration-300 overflow-hidden ${
                              expandedItem === item.id
                                ? "max-h-96 opacity-100"
                                : "max-h-20 opacity-75"
                            }`}
                          >
                            <h4
                              className="text-xs font-bold tracking-widest uppercase mb-2"
                              style={{ color: secondaryColor }}
                            >
                              HONORS_&_AWARDS
                            </h4>
                            <ul className="space-y-1">
                              {item.honors.map((honor, honorIndex) => (
                                <li
                                  key={honorIndex}
                                  className="text-sm flex items-start"
                                  style={{ color: textColor }}
                                >
                                  <span
                                    className="mr-2 mt-1 flex-shrink-0"
                                    style={{ color: getTypeColor(item.type) }}
                                  >
                                    ★
                                  </span>
                                  {honor}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {((item.achievements && item.achievements.length > 0) ||
                          (item.honors && item.honors.length > 0)) && (
                          <button
                            className="mt-2 text-xs font-bold tracking-widest uppercase transition-all duration-300 hover:scale-105"
                            style={{ color: primaryColor }}
                            onClick={(e) => {
                              e.stopPropagation();
                              setExpandedItem(
                                expandedItem === item.id ? null : item.id
                              );
                            }}
                          >
                            {expandedItem === item.id
                              ? "SHOW_LESS"
                              : "SHOW_MORE"}
                          </button>
                        )}
                      </div>
                    )}

                    {/* Accent Line */}
                    <div
                      className="absolute bottom-0 left-0 h-1 transition-all duration-300"
                      style={{
                        backgroundColor: getTypeColor(item.type),
                        width: hoveredItem === item.id ? "100%" : "0%",
                      }}
                    ></div>
                  </div>
                </div>

                {/* Empty space for alternating layout */}
                <div className="hidden md:block w-5/12"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="flex items-center justify-center mt-16 space-x-8">
          <div className="text-center">
            <div
              className="text-3xl font-black mb-1"
              style={{ color: primaryColor }}
            >
              {sortedItems.filter((item) => item.type === "work").length}
            </div>
            <div
              className="text-xs font-bold tracking-widest uppercase"
              style={{ color: secondaryColor }}
            >
              POSITIONS
            </div>
          </div>
          <div
            className="w-px h-8"
            style={{ backgroundColor: `${primaryColor}40` }}
          ></div>
          <div className="text-center">
            <div
              className="text-3xl font-black mb-1"
              style={{ color: primaryColor }}
            >
              {new Date().getFullYear() -
                new Date(
                  sortedItems[sortedItems.length - 1]?.startDate || "2020"
                ).getFullYear()}
              +
            </div>
            <div
              className="text-xs font-bold tracking-widest uppercase"
              style={{ color: secondaryColor }}
            >
              YEARS
            </div>
          </div>
          <div
            className="w-px h-8"
            style={{ backgroundColor: `${primaryColor}40` }}
          ></div>
          <div className="text-center">
            <div
              className="text-3xl font-black mb-1"
              style={{ color: primaryColor }}
            >
              {
                Array.from(
                  new Set(
                    sortedItems.flatMap((item) => item.technologies || [])
                  )
                ).length
              }
            </div>
            <div
              className="text-xs font-bold tracking-widest uppercase"
              style={{ color: secondaryColor }}
            >
              TECHNOLOGIES
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TypographyTimeline;
