import { ExternalLinkIcon } from "lucide-react";
import React, { useState, useMemo } from "react";
import { PortfolioFontLoader } from "@/lib/portfolioFontLoader";
import { getFontWithDefault } from "@/lib/componentDefaultFonts";

// Simple icon components since we can't import lucide-react
const ExternalLink = ({ size, className, style }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={style}
  >
    <path d="m9 9 5 12 1.774-5.226L21 14 9 9z" />
    <path d="m16 16 2 2" />
    <path d="m11 11 2 2" />
  </svg>
);

const Github = ({ size, className, style }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={style}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Calendar = ({ size, style }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={style}
  >
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
    <line x1="16" x2="16" y1="2" y2="6" />
    <line x1="8" x2="8" y1="2" y2="6" />
    <line x1="3" x2="21" y1="10" y2="10" />
  </svg>
);

const Code = ({ size, style }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={style}
  >
    <polyline points="16,18 22,12 16,6" />
    <polyline points="8,6 2,12 8,18" />
  </svg>
);

const Palette = ({ size, style }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={style}
  >
    <circle cx="13.5" cy="6.5" r=".5" />
    <circle cx="17.5" cy="10.5" r=".5" />
    <circle cx="8.5" cy="7.5" r=".5" />
    <circle cx="6.5" cy="12.5" r=".5" />
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
  </svg>
);

const Database = ({ size, style }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={style}
  >
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M3 5V19A9 3 0 0 0 21 19V5" />
    <path d="M3 12A9 3 0 0 0 21 12" />
  </svg>
);

const Globe = ({ size, style }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={style}
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="2" x2="22" y1="12" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const ArrowRight = ({ size, style, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={style}
    className={className}
  >
    <line x1="5" x2="19" y1="12" y2="12" />
    <polyline points="12,5 19,12 12,19" />
  </svg>
);

const Filter = ({ size, style }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={style}
  >
    <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46 22,3" />
  </svg>
);

interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  image?: string;
  featured?: boolean;
  status: "completed" | "in-progress" | "archived";
}

interface ProjectsTypographyProps {
  // Content Props
  title?: string;
  subtitle?: string;
  description?: string;
  projects?: Project[];
  showFilters?: boolean;
  showImages?: boolean;
  layoutMode?: "list" | "grid" | "minimal";
  showProjectNumbers?: boolean;
  showStatus?: boolean;
  featuredFirst?: boolean;

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

  // Theme Options
  theme?: "minimal" | "code" | "modern";
  fontFamily?: string;

  // Global Theme
  globalTheme?: any;
}

function getContrastColor(hex: string) {
  if (hex.length === 4) {
    hex = "#" + [...hex.slice(1)].map((c) => c + c).join("");
  }

  const r = parseInt(hex.substr(1, 2), 16);
  const g = parseInt(hex.substr(3, 2), 16);
  const b = parseInt(hex.substr(5, 2), 16);

  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 128 ? "#000000" : "#FFFFFF";
}

const ProjectsTypography: React.FC<ProjectsTypographyProps> = ({
  title = "PROJECTS",
  subtitle = "SELECTED WORKS",
  description = "A collection of projects that showcase my expertise in modern web development, from concept to deployment.",
  projects = [
    {
      id: "01",
      title: "E-Commerce Platform",
      category: "Web Application",
      year: "2024",
      description:
        "Full-stack e-commerce solution with real-time inventory management",
      longDescription:
        "Built a comprehensive e-commerce platform using React, Node.js, and PostgreSQL. Features include real-time inventory tracking, payment processing, admin dashboard, and mobile-responsive design.",
      technologies: ["React", "Node.js", "PostgreSQL", "Stripe", "Redis"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      featured: true,
      status: "completed",
    },
    {
      id: "02",
      title: "Portfolio CMS",
      category: "Content Management",
      year: "2024",
      description:
        "Custom CMS for creative professionals with drag-and-drop interface",
      longDescription:
        "Developed a headless CMS specifically designed for creative professionals. Features include drag-and-drop page builder, asset management, and API-first architecture.",
      technologies: ["Next.js", "TypeScript", "Prisma", "AWS S3"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      featured: true,
      status: "completed",
    },
    {
      id: "03",
      title: "Task Management App",
      category: "Mobile Application",
      year: "2023",
      description:
        "Cross-platform productivity app with team collaboration features",
      longDescription:
        "Created a cross-platform task management application with real-time collaboration, file sharing, and progress tracking capabilities.",
      technologies: ["React Native", "Firebase", "Redux", "Expo"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      featured: false,
      status: "completed",
    },
    {
      id: "04",
      title: "Analytics Dashboard",
      category: "Data Visualization",
      year: "2023",
      description:
        "Real-time analytics dashboard with interactive data visualizations",
      longDescription:
        "Built an analytics dashboard for monitoring key business metrics with interactive charts, real-time updates, and customizable widgets.",
      technologies: ["Vue.js", "D3.js", "Python", "FastAPI", "MongoDB"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      featured: false,
      status: "archived",
    },
  ],
  showFilters = true,
  showImages = false,
  layoutMode = "list",
  showProjectNumbers = true,
  showStatus = true,
  featuredFirst = true,
  backgroundColor = "#ffffff",
  textColor = "#111827",
  primaryColor = "#000000",
  secondaryColor = "#6b7280",
  paddingY = "80",
  paddingX = "20",
  textAlign = "left",
  fontSize = "3xl",
  fontWeight = "black",
  borderRadius = "8",
  shadow = "none",
  theme = "code",
  fontFamily = "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
  globalTheme,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Get font families from global theme with typography defaults
  const bodyFont = useMemo(() => {
    const fontName = getFontWithDefault(globalTheme, "body", "typography");
    return PortfolioFontLoader.getFontFamily(fontName);
  }, [globalTheme]);

  const headingFont = useMemo(() => {
    const fontName = getFontWithDefault(globalTheme, "heading", "typography");
    return PortfolioFontLoader.getFontFamily(fontName);
  }, [globalTheme]);
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  // Theme configurations
  const themeConfigs = {
    minimal: {
      backgroundColor: backgroundColor || "#ffffff",
      textColor: textColor || "#000000",
      primaryColor: primaryColor || "#000000",
      secondaryColor: secondaryColor || "#666666",
      fontFamily: "'Inter', 'system-ui', sans-serif",
    },
    code: {
      backgroundColor: backgroundColor || "#0f172a",
      textColor: textColor || "#ffffff",
      primaryColor: primaryColor || "#3b82f6",
      secondaryColor: secondaryColor || "#64748b",
      fontFamily:
        fontFamily || "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
    },
    modern: {
      backgroundColor: backgroundColor || "#1a1a1a",
      textColor: textColor || "#ffffff",
      primaryColor: primaryColor || "#8b5cf6",
      secondaryColor: secondaryColor || "#a1a1aa",
      fontFamily: "'Inter', 'system-ui', sans-serif",
    },
  };

  const currentTheme = themeConfigs[theme];

  const containerStyles: React.CSSProperties = {
    backgroundColor: currentTheme.backgroundColor,
    color: currentTheme.textColor,
    paddingTop: `${paddingY}px`,
    paddingBottom: `${paddingY}px`,
    paddingLeft: `${paddingX}px`,
    paddingRight: `${paddingX}px`,
    borderRadius: borderRadius !== "0" ? `${borderRadius}px` : "0px",
    boxShadow: shadow !== "none" ? shadow : "none",
    fontFamily: bodyFont,
  };

  const titleStyles: React.CSSProperties = {
    color: currentTheme.primaryColor,
    fontSize: "clamp(2.5rem, 8vw, 6rem)",
    fontWeight: fontWeight === "black" ? 900 : fontWeight,
    fontFamily: currentTheme.fontFamily,
    lineHeight: 0.85,
    letterSpacing: "-0.02em",
    marginBottom: "1rem",
  };

  const subtitleStyles: React.CSSProperties = {
    color: currentTheme.secondaryColor,
    fontSize: "clamp(1rem, 3vw, 1.5rem)",
    fontWeight: 400,
    fontFamily: currentTheme.fontFamily,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    marginBottom: "2rem",
  };

  // Get unique categories
  const categories = [
    "all",
    ...Array.from(new Set(projects.map((p) => p.category))),
  ];

  // Filter and sort projects
  let filteredProjects = projects.filter(
    (project) =>
      selectedCategory === "all" || project.category === selectedCategory
  );

  if (featuredFirst) {
    filteredProjects = filteredProjects.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    });
  }

  const getCategoryIcon = (category: string) => {
    const iconMap: Record<string, React.ComponentType<any>> = {
      "Web Application": Globe,
      "Mobile Application": Code,
      "Content Management": Database,
      "Data Visualization": Palette,
      all: Filter,
    };
    return iconMap[category] || Code;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "#10b981";
      case "in-progress":
        return "#f59e0b";
      case "archived":
        return currentTheme.secondaryColor;
      default:
        return currentTheme.secondaryColor;
    }
  };

  return (
    <section style={containerStyles}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className={`mb-12 lg:mb-16`} style={{ textAlign }}>
          <h2 style={titleStyles}>{title}</h2>
          <p style={subtitleStyles}>{subtitle}</p>
          {description && (
            <p
              className="max-w-3xl text-base sm:text-lg leading-relaxed"
              style={{
                color: currentTheme.textColor,
                margin:
                  textAlign === "center"
                    ? "0 auto"
                    : textAlign === "right"
                    ? "0 0 0 auto"
                    : "0",
              }}
            >
              {description}
            </p>
          )}
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="mb-12 lg:mb-16">
            <div className="flex flex-wrap gap-3 sm:gap-4">
              {categories.map((category) => {
                const IconComponent = getCategoryIcon(category);
                const isActive = selectedCategory === category;

                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-3 border transition-all duration-300 uppercase tracking-wider text-xs sm:text-sm font-medium hover:scale-105"
                    style={{
                      borderColor: isActive
                        ? currentTheme.primaryColor
                        : `${currentTheme.secondaryColor}40`,
                      backgroundColor: isActive
                        ? currentTheme.primaryColor
                        : "transparent",
                      color: isActive
                        ? getContrastColor(currentTheme.primaryColor)
                        : currentTheme.textColor,
                      fontFamily: currentTheme.fontFamily,
                      borderRadius: `${borderRadius}px`,
                    }}
                  >
                    <IconComponent
                      size={14}
                      style={{
                        color: isActive
                          ? getContrastColor(currentTheme.primaryColor)
                          : currentTheme.textColor,
                      }}
                    />
                    <span className="hidden sm:inline">
                      {category.replace(/([A-Z])/g, " $1").trim()}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Projects */}
        <div
          className={`space-y-${
            layoutMode === "minimal" ? "6" : "8"
          } sm:space-y-${layoutMode === "minimal" ? "8" : "12"}`}
        >
          {filteredProjects.map((project, index) => {
            const isExpanded = expandedProject === project.id;

            return (
              <div
                key={project.id}
                className="group cursor-pointer transition-all duration-500 hover:scale-[1.02]"
                style={{
                  border:
                    layoutMode === "minimal"
                      ? "none"
                      : `1px solid ${
                          isExpanded
                            ? currentTheme.primaryColor
                            : currentTheme.secondaryColor
                        }20`,
                  borderBottom:
                    layoutMode === "minimal"
                      ? `1px solid ${currentTheme.secondaryColor}20`
                      : undefined,
                  borderRadius:
                    layoutMode === "minimal" ? "0" : `${borderRadius}px`,
                  backgroundColor: isExpanded
                    ? `${currentTheme.primaryColor}05`
                    : "transparent",
                }}
                onClick={() =>
                  setExpandedProject(isExpanded ? null : project.id)
                }
              >
                <div
                  className={`${
                    layoutMode === "minimal"
                      ? "py-4 sm:py-6"
                      : "p-4 sm:p-6 lg:p-8"
                  }`}
                >
                  {/* Project Header */}
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between mb-4 sm:mb-6">
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6 mb-4">
                        {showProjectNumbers && (
                          <div
                            className="text-4xl sm:text-5xl lg:text-6xl font-black opacity-20 leading-none order-2 sm:order-1"
                            style={{
                              color: currentTheme.textColor,
                              fontFamily: currentTheme.fontFamily,
                            }}
                          >
                            {project.id}
                          </div>
                        )}

                        <div className="flex-1 order-1 sm:order-2">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
                            <h3
                              className="text-xl sm:text-2xl lg:text-3xl font-bold group-hover:translate-x-2 transition-transform duration-300"
                              style={{
                                color: currentTheme.textColor,
                                fontFamily: currentTheme.fontFamily,
                              }}
                            >
                              {project.title}
                            </h3>

                            {project.featured && (
                              <span
                                className="px-2 py-1 text-xs uppercase tracking-wider font-bold border w-fit"
                                style={{
                                  color: currentTheme.primaryColor,
                                  borderColor: currentTheme.primaryColor,
                                  fontFamily: currentTheme.fontFamily,
                                  borderRadius: `${borderRadius}px`,
                                }}
                              >
                                Featured
                              </span>
                            )}
                          </div>

                          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 mb-3">
                            <span
                              className="text-xs sm:text-sm uppercase tracking-wider"
                              style={{
                                color: currentTheme.secondaryColor,
                                fontFamily: currentTheme.fontFamily,
                              }}
                            >
                              {project.category}
                            </span>

                            <div className="flex items-center gap-2">
                              <Calendar
                                size={14}
                                style={{ color: currentTheme.secondaryColor }}
                              />
                              <span
                                className="text-xs sm:text-sm"
                                style={{
                                  color: currentTheme.secondaryColor,
                                  fontFamily: currentTheme.fontFamily,
                                }}
                              >
                                {project.year}
                              </span>
                            </div>

                            {showStatus && (
                              <div className="flex items-center gap-2">
                                <div
                                  className="w-2 h-2 rounded-full"
                                  style={{
                                    backgroundColor: getStatusColor(
                                      project.status
                                    ),
                                  }}
                                />
                                <span
                                  className="text-xs sm:text-sm capitalize"
                                  style={{
                                    color: currentTheme.secondaryColor,
                                    fontFamily: currentTheme.fontFamily,
                                  }}
                                >
                                  {project.status.replace("-", " ")}
                                </span>
                              </div>
                            )}
                          </div>

                          <p
                            className="text-sm sm:text-base lg:text-lg leading-relaxed mb-4"
                            style={{
                              color: currentTheme.textColor,
                              fontFamily: currentTheme.fontFamily,
                            }}
                          >
                            {project.description}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Action Links */}
                    <div className="flex items-center gap-3 sm:gap-4 lg:ml-8 order-3">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 sm:p-3 border hover:scale-110 transition-all duration-300"
                          style={{
                            borderColor: `${currentTheme.secondaryColor}40`,
                            borderRadius: `${borderRadius}px`,
                          }}
                          onClick={(e) => e.stopPropagation()}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor =
                              currentTheme.primaryColor;
                            e.currentTarget.style.color = getContrastColor(
                              currentTheme.primaryColor
                            );
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor =
                              "transparent";
                            e.currentTarget.style.color =
                              currentTheme.textColor;
                          }}
                        >
                          <ExternalLinkIcon size={16} />
                        </a>
                      )}

                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 sm:p-3 border hover:scale-110 transition-all duration-300"
                          style={{
                            borderColor: `${currentTheme.secondaryColor}40`,
                            borderRadius: `${borderRadius}px`,
                          }}
                          onClick={(e) => e.stopPropagation()}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor =
                              currentTheme.primaryColor;
                            e.currentTarget.style.color = getContrastColor(
                              currentTheme.primaryColor
                            );
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor =
                              "transparent";
                            e.currentTarget.style.color =
                              currentTheme.textColor;
                          }}
                        >
                          <Github size={16} />
                        </a>
                      )}

                      <div className="p-2 sm:p-3">
                        <ArrowRight
                          size={16}
                          style={{ color: currentTheme.primaryColor }}
                          className={`transform transition-transform duration-300 ${
                            isExpanded
                              ? "rotate-90"
                              : "group-hover:translate-x-1"
                          }`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 sm:px-3 sm:py-1 text-xs uppercase tracking-wider border"
                        style={{
                          color: currentTheme.secondaryColor,
                          borderColor: `${currentTheme.secondaryColor}30`,
                          fontFamily: currentTheme.fontFamily,
                          borderRadius: `${borderRadius}px`,
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Expanded Content */}
                  {isExpanded && project.longDescription && (
                    <div
                      className="border-t pt-4 sm:pt-6 mt-4 sm:mt-6 animate-in slide-in-from-top duration-300"
                      style={{
                        borderColor: `${currentTheme.secondaryColor}20`,
                      }}
                    >
                      <p
                        className="text-sm sm:text-base lg:text-lg leading-relaxed"
                        style={{
                          color: currentTheme.textColor,
                          fontFamily: currentTheme.fontFamily,
                        }}
                      >
                        {project.longDescription}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom accent */}
        <div className="mt-16 sm:mt-20 lg:mt-24 flex justify-center">
          <div className="flex items-center gap-4">
            <div
              className="w-8 sm:w-12 h-px"
              style={{ backgroundColor: currentTheme.primaryColor }}
            />
            <span
              className="text-xs sm:text-sm uppercase tracking-widest"
              style={{
                color: currentTheme.secondaryColor,
                fontFamily: currentTheme.fontFamily,
              }}
            >
              {filteredProjects.length} Project
              {filteredProjects.length !== 1 ? "s" : ""}
            </span>
            <div
              className="w-8 sm:w-12 h-px"
              style={{ backgroundColor: currentTheme.primaryColor }}
            />
          </div>
        </div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes slide-in-from-top {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-in {
          animation-fill-mode: both;
        }

        .slide-in-from-top {
          animation-name: slide-in-from-top;
        }

        .duration-300 {
          animation-duration: 300ms;
        }
      `}</style>
    </section>
  );
};

export default ProjectsTypography;
