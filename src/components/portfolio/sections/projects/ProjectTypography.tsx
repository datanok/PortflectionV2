import React, { useState } from "react";
import {
  ExternalLink,
  Github,
  Calendar,
  Code,
  Palette,
  Database,
  Globe,
  ArrowRight,
  Filter,
} from "lucide-react";

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

  // Global Theme
  globalTheme?: any;
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
  paddingY = "120",
  paddingX = "32",
  textAlign = "left",
  fontSize = "3xl",
  fontWeight = "black",
  borderRadius = "0",
  shadow = "none",
  globalTheme,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  const containerStyles = {
    backgroundColor,
    color: textColor,
    borderRadius: borderRadius !== "0" ? `${borderRadius}px` : "0px",
    boxShadow: shadow !== "none" ? shadow : "none",
  };

  const titleStyles = {
    color: primaryColor,
    fontSize: fontSize === "2xs" ? "clamp(3rem, 8vw, 8rem)" : fontSize,
    fontWeight: fontWeight === "black" ? "900" : fontWeight,
    fontFamily: "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
    lineHeight: "0.85",
    letterSpacing: "-0.02em",
  };

  const subtitleStyles = {
    color: secondaryColor,
    fontSize: "1.5rem",
    fontWeight: "400",
    fontFamily: "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
    letterSpacing: "0.1em",
    textTransform: "uppercase" as const,
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
    const iconMap: {
      [key: string]: React.ComponentType<{ size: number; style: any }>;
    } = {
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
        return "#6b7280";
      default:
        return secondaryColor;
    }
  };

  return (
    <section
      className={`py-${paddingY} px-${paddingX} relative`}
      style={containerStyles}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className={`mb-16 text-${textAlign}`}>
          <h2 className="mb-4 tracking-tighter" style={titleStyles}>
            {title}
          </h2>
          <p className="mb-8" style={subtitleStyles}>
            {subtitle}
          </p>
          {description && (
            <p
              className="max-w-3xl text-lg leading-relaxed"
              style={{ color: textColor }}
            >
              {description}
            </p>
          )}
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="mb-16">
            <div className="flex flex-wrap gap-4">
              {categories.map((category) => {
                const IconComponent = getCategoryIcon(category);
                const isActive = selectedCategory === category;

                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`flex items-center gap-2 px-6 py-3 border transition-all duration-300 uppercase tracking-wider text-sm font-medium ${
                      isActive
                        ? "border-black bg-black text-white"
                        : "border-gray-300 hover:border-black"
                    }`}
                    style={{
                      borderColor: isActive
                        ? primaryColor
                        : `${secondaryColor}40`,
                      backgroundColor: isActive ? primaryColor : "transparent",
                      color: isActive ? backgroundColor : textColor,
                      fontFamily:
                        "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
                    }}
                  >
                    <IconComponent
                      size={16}
                      style={{ color: isActive ? backgroundColor : textColor }}
                    />
                    {category.replace(/([A-Z])/g, " $1").trim()}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Projects */}
        <div className={`space-y-${layoutMode === "minimal" ? "4" : "12"}`}>
          {filteredProjects.map((project, index) => {
            const isExpanded = expandedProject === project.id;

            return (
              <div
                key={project.id}
                className={`group cursor-pointer transition-all duration-500 ${
                  layoutMode === "minimal"
                    ? "border-b border-gray-200 pb-4"
                    : "border border-gray-200 hover:border-black"
                }`}
                style={{
                  borderColor:
                    layoutMode === "minimal"
                      ? `${secondaryColor}20`
                      : isExpanded
                      ? primaryColor
                      : `${secondaryColor}20`,
                }}
                onClick={() =>
                  setExpandedProject(isExpanded ? null : project.id)
                }
              >
                <div className={`${layoutMode === "minimal" ? "py-6" : "p-8"}`}>
                  {/* Project Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-6 mb-4">
                        {showProjectNumbers && (
                          <div
                            className="text-6xl font-black opacity-20 leading-none"
                            style={{
                              color: textColor,
                              fontFamily:
                                "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
                            }}
                          >
                            {project.id}
                          </div>
                        )}

                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-2">
                            <h3
                              className="text-2xl md:text-3xl font-bold group-hover:translate-x-2 transition-transform duration-300"
                              style={{ color: textColor }}
                            >
                              {project.title}
                            </h3>

                            {project.featured && (
                              <span
                                className="px-2 py-1 text-xs uppercase tracking-wider font-bold border"
                                style={{
                                  color: primaryColor,
                                  borderColor: primaryColor,
                                  fontFamily:
                                    "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
                                }}
                              >
                                Featured
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-6 mb-3">
                            <span
                              className="text-sm uppercase tracking-wider"
                              style={{
                                color: secondaryColor,
                                fontFamily:
                                  "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
                              }}
                            >
                              {project.category}
                            </span>

                            <div className="flex items-center gap-2">
                              <Calendar
                                size={14}
                                style={{ color: secondaryColor }}
                              />
                              <span
                                className="text-sm"
                                style={{
                                  color: secondaryColor,
                                  fontFamily:
                                    "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
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
                                  className="text-sm capitalize"
                                  style={{
                                    color: secondaryColor,
                                    fontFamily:
                                      "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
                                  }}
                                >
                                  {project.status.replace("-", " ")}
                                </span>
                              </div>
                            )}
                          </div>

                          <p
                            className="text-lg leading-relaxed mb-4"
                            style={{ color: textColor }}
                          >
                            {project.description}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Action Links */}
                    <div className="flex items-center gap-4 ml-8">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 border hover:bg-black hover:text-white transition-all duration-300 group/link"
                          style={{ borderColor: `${secondaryColor}40` }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink
                            size={18}
                            className="group-hover/link:scale-110 transition-transform"
                          />
                        </a>
                      )}

                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 border hover:bg-black hover:text-white transition-all duration-300 group/link"
                          style={{ borderColor: `${secondaryColor}40` }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Github
                            size={18}
                            className="group-hover/link:scale-110 transition-transform"
                          />
                        </a>
                      )}

                      <div className="p-3">
                        <ArrowRight
                          size={18}
                          style={{ color: primaryColor }}
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
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 text-xs uppercase tracking-wider border"
                        style={{
                          color: secondaryColor,
                          borderColor: `${secondaryColor}30`,
                          fontFamily:
                            "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Expanded Content */}
                  {isExpanded && project.longDescription && (
                    <div
                      className="border-t pt-6 mt-6 animate-in slide-in-from-top duration-300"
                      style={{ borderColor: `${secondaryColor}20` }}
                    >
                      <p
                        className="text-lg leading-relaxed"
                        style={{ color: textColor }}
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
        <div className="mt-24 flex justify-center">
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-px"
              style={{ backgroundColor: primaryColor }}
            />
            <span
              className="text-sm uppercase tracking-widest"
              style={{
                color: secondaryColor,
                fontFamily:
                  "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
              }}
            >
              {filteredProjects.length} Projects
            </span>
            <div
              className="w-12 h-px"
              style={{ backgroundColor: primaryColor }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsTypography;
