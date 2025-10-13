import React from "react";
import { PortfolioFontLoader } from "@/lib/portfolioFontLoader";

interface Project {
  title: string;
  description: string;
  image?: string;
  tags?: string[];
  link?: string;
  github?: string;
  featured?: boolean;
  size?: "small" | "medium" | "large"; // For bento grid sizing
  color?: string; // Custom accent color for this project
}

interface MinimalProjectsProps {
  title?: string;
  subtitle?: string;
  description?: string;
  projects?: Project[];
  showTags?: boolean;
  showLinks?: boolean;
  bentoLayout?: boolean;
  backgroundColor?: string;
  textColor?: string;
  primaryColor?: string;
  secondaryColor?: string;
  cardBackgroundColor?: string;
  paddingY?: string;
  paddingX?: string;
  globalTheme?: any;
  textAlign?: string;
}

const MinimalProjects: React.FC<MinimalProjectsProps> = ({
  title = "Projects",
  subtitle = "My Work",
  description = "A collection of projects I've built and contributed to",
  projects = [
    {
      title: "E-Commerce Platform",
      description:
        "A full-stack e-commerce solution with real-time inventory management and payment processing.",
      image:
        "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop",
      tags: ["React", "Node.js", "MongoDB", "Stripe"],
      link: "https://example.com",
      github: "https://github.com",
      featured: true,
      size: "large",
    },
    {
      title: "Task Manager App",
      description:
        "Collaborative task management tool with real-time updates and team features.",
      image:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop",
      tags: ["Next.js", "TypeScript", "Prisma"],
      link: "https://example.com",
      size: "medium",
    },
    {
      title: "Weather Dashboard",
      description: "Beautiful weather app with forecasts and interactive maps.",
      image:
        "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&h=600&fit=crop",
      tags: ["React", "API Integration"],
      link: "https://example.com",
      size: "small",
    },
    {
      title: "Portfolio Builder",
      description:
        "SaaS platform for creating stunning portfolios without code.",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      tags: ["Vue.js", "Firebase", "Tailwind"],
      github: "https://github.com",
      size: "medium",
    },
    {
      title: "AI Chat Bot",
      description:
        "Intelligent chatbot with natural language processing capabilities.",
      image:
        "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&h=600&fit=crop",
      tags: ["Python", "OpenAI", "Flask"],
      size: "small",
    },
    {
      title: "Social Media Analytics",
      description:
        "Comprehensive analytics dashboard for social media insights and metrics.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      tags: ["React", "D3.js", "Express"],
      featured: true,
      size: "large",
    },
  ],
  showTags = true,
  showLinks = true,
  bentoLayout = true,
  backgroundColor = "#ffffff",
  textColor = "#1f2937",
  primaryColor = "#3b82f6",
  secondaryColor = "#6b7280",
  cardBackgroundColor = "#f9fafb",
  paddingY = "80",
  paddingX = "16",
  textAlign = "center",
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

  // Get bento grid class based on size
  const getBentoClass = (size: string) => {
    if (!bentoLayout) return ""; // Don't apply if not in Bento mode

    switch (size) {
      case "wide":
        return "md:col-span-2";
      case "tall":
        return "md:row-span-2";
      case "big":
        return "md:col-span-2 md:row-span-2";
      default:
        return ""; // Normal size
    }
  };

  return (
    <section style={sectionStyle}>
      <div className="max-w-7xl mx-auto">
        {/* Header with decorative element */}
        <div
          className="text-center mb-16 relative"
          style={{ textAlign: textAlign as any }}
        >
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
                fontFamily: headingFontFamily,
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
              className="text-lg max-w-2xl mx-auto mt-8"
              style={{ color: secondaryColor }}
            >
              {description}
            </p>
          )}
        </div>

        {/* Projects Bento Grid */}
        <div
          className={
            bentoLayout
              ? "grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-fr"
              : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          }
        >
          {projects.map((project, index) => {
            const accentColor = project.color || primaryColor;

            return (
              <div
                key={index}
                className={`group relative rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02] ${getBentoClass(
                  project.size
                )}`}
                style={{
                  backgroundColor: cardBackgroundColor,
                  border: `1px solid ${hexToRgba(accentColor, 0.15)}`,
                  boxShadow: `0 4px 6px ${hexToRgba(textColor, 0.05)}`,
                  minHeight: bentoLayout ? "280px" : "auto",
                }}
              >
                {/* Featured badge */}
                {project.featured && (
                  <div
                    className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full text-xs font-bold"
                    style={{
                      backgroundColor: hexToRgba(accentColor, 0.9),
                      color: "#ffffff",
                    }}
                  >
                    Featured
                  </div>
                )}

                {/* Image Section */}
                {project.image && (
                  <div className="relative w-full h-48 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Gradient overlay */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(to bottom, transparent 0%, ${hexToRgba(
                          cardBackgroundColor,
                          0.8
                        )} 100%)`,
                      }}
                    />
                  </div>
                )}

                {/* Content Section */}
                <div
                  className={`p-6 ${
                    project.image ? "" : "h-full flex flex-col"
                  }`}
                >
                  {/* Top accent line */}
                  <div
                    className="w-12 h-1 rounded-full mb-4"
                    style={{ backgroundColor: accentColor }}
                  />

                  <h3
                    className="text-2xl font-bold mb-3"
                    style={{ color: textColor, fontFamily: headingFontFamily }}
                  >
                    {project.title}
                  </h3>

                  <p
                    className="text-sm leading-relaxed mb-4"
                    style={{ color: secondaryColor }}
                  >
                    {project.description}
                  </p>

                  {/* Tags */}
                  {showTags && project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-3 py-1 rounded-full text-xs font-medium"
                          style={{
                            backgroundColor: hexToRgba(accentColor, 0.1),
                            color: accentColor,
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Links */}
                  {showLinks && (project.link || project.github) && (
                    <div className="flex gap-3 mt-auto">
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 hover:scale-105"
                          style={{
                            backgroundColor: accentColor,
                            color: "#ffffff",
                          }}
                        >
                          <span>View Project</span>
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                        </a>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300 hover:scale-105"
                          style={{
                            backgroundColor: hexToRgba(accentColor, 0.1),
                            color: accentColor,
                          }}
                        >
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                          </svg>
                        </a>
                      )}
                    </div>
                  )}
                </div>

                {/* Hover corner accent */}
                <div
                  className="absolute bottom-0 left-0 w-16 h-16 rounded-tr-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(45deg, ${hexToRgba(
                      accentColor,
                      0.1
                    )} 0%, transparent 100%)`,
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Bottom decorative element */}
        <div className="flex justify-center mt-16">
          <div className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: hexToRgba(primaryColor, 0.3) }}
            />
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: hexToRgba(primaryColor, 0.5) }}
            />
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: primaryColor }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MinimalProjects;
