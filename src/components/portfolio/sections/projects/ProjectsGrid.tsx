import React from "react";
import Image from "next/image";
import Link from "next/link";
import { GlobalTheme } from "../../builder/GlobalThemeControls";

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
}

interface ProjectsGridProps {
  heading: string;
  projects: Project[];
  columns?: 1 | 2 | 3 | 4;
  showViewAll?: boolean;
  viewAllLink?: string;
  // Style props
  backgroundColor?: string;
  textColor?: string;
  paddingY?: string;
  paddingX?: string;
  textAlign?: "left" | "center" | "right";
  fontSize?: string;
  fontWeight?: string;
  borderRadius?: string;
  shadow?: string;
  // Global theme
  globalTheme?: GlobalTheme;
}

export default function ProjectsGrid({
  heading,
  projects,
  columns = 3,
  showViewAll = false,
  viewAllLink = "/projects",
  // Style props with defaults
  backgroundColor = "#f9fafb",
  textColor = "#111827",
  paddingY = "64",
  paddingX = "16",
  textAlign = "center",
  fontSize = "xl",
  fontWeight = "bold",
  borderRadius = "0",
  shadow = "none",
  globalTheme,
}: ProjectsGridProps) {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  };

  // Use global theme values if available, otherwise fall back to props
  const effectiveBackgroundColor = globalTheme?.background || backgroundColor;
  const effectiveTextColor =
    globalTheme?.mode === "dark" ? "#ffffff" : textColor;
  const effectiveBorderRadius = globalTheme?.borderRadius
    ? `${globalTheme.borderRadius}rem`
    : `${borderRadius}px`;

  // Convert style props to CSS
  const containerStyle: React.CSSProperties = {
    backgroundColor: effectiveBackgroundColor,
    color: effectiveTextColor,
    paddingTop: `${paddingY}px`,
    paddingBottom: `${paddingY}px`,
    paddingLeft: `${paddingX}px`,
    paddingRight: `${paddingX}px`,
    textAlign: textAlign as any,
    borderRadius: effectiveBorderRadius,
    boxShadow: shadow !== "none" ? shadow : undefined,
    fontFamily: globalTheme?.fontBody,
  };

  const titleStyle: React.CSSProperties = {
    color: effectiveTextColor,
    fontSize:
      fontSize === "xl"
        ? "2.25rem"
        : fontSize === "2xl"
        ? "1.875rem"
        : "1.5rem",
    fontWeight:
      fontWeight === "bold"
        ? "bold"
        : fontWeight === "semibold"
        ? "600"
        : "normal",
    fontFamily: globalTheme?.fontHeading,
  };

  const descriptionStyle: React.CSSProperties = {
    color: effectiveTextColor,
    fontSize:
      fontSize === "sm" ? "0.875rem" : fontSize === "lg" ? "1.125rem" : "1rem",
    fontFamily: globalTheme?.fontBody,
  };

  return (
    <div style={containerStyle} className="px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 style={titleStyle} className="text-3xl sm:text-4xl">
            {heading}
          </h2>
          <p
            style={descriptionStyle}
            className="mt-3 max-w-2xl mx-auto text-xl sm:mt-4"
          >
            A selection of my recent work and projects
          </p>
        </div>

        <div className={`mt-12 grid gap-8 ${gridCols[columns]}`}>
          {projects.map((project) => (
            <div
              key={project.id}
              className="flex flex-col rounded-lg shadow-lg overflow-hidden bg-white hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex-shrink-0 h-48 relative">
                {project.image && project.image.startsWith("http") ? (
                  <Image
                    className="w-full h-full object-cover"
                    src={project.image}
                    alt={project.title}
                    width={400}
                    height={300}
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <p className="mt-2 text-sm">Add project image</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div className="flex-1">
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        style={{
                          backgroundColor: globalTheme?.muted || "#dbeafe",
                          color: globalTheme?.primary || "#1d4ed8",
                        }}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <Link href={`/projects/${project.id}`} className="block mt-2">
                    <h3
                      className="text-xl font-semibold transition-colors"
                      style={{
                        color: effectiveTextColor,
                        fontFamily: globalTheme?.fontHeading,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color =
                          globalTheme?.primary || "#3b82f6";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = effectiveTextColor;
                      }}
                    >
                      {project.title}
                    </h3>
                  </Link>
                  <p
                    className="mt-3 text-base"
                    style={{
                      color:
                        globalTheme?.mode === "dark" ? "#9ca3af" : "#6b7280",
                      fontFamily: globalTheme?.fontBody,
                    }}
                  >
                    {project.description}
                  </p>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  {(project.liveUrl || project.githubUrl) && (
                    <div className="flex space-x-3">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            backgroundColor: globalTheme?.primary || "#3b82f6",
                            borderRadius: effectiveBorderRadius,
                          }}
                          className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium text-white hover:opacity-90 transition-opacity"
                        >
                          Live Demo
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            color: globalTheme?.primary || "#374151",
                            backgroundColor: globalTheme?.card || "#ffffff",
                            borderColor: globalTheme?.muted || "#d1d5db",
                            borderRadius: effectiveBorderRadius,
                          }}
                          className="inline-flex items-center px-3 py-1.5 border text-xs font-medium hover:opacity-80 transition-opacity"
                        >
                          <svg
                            className="h-4 w-4 mr-1"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.027 2.747-1.027.546 1.377.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.58.688.482A10.02 10.02 0 0022 12.017C22 6.484 17.522 2 12 2z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Code
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {showViewAll && (
          <div className="mt-12 text-center">
            <Link
              href={viewAllLink}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              View All Projects
              <svg
                className="ml-2 -mr-1 w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
