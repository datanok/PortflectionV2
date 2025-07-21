import React from "react";

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  duration: string;
  description: string;
  achievements?: string[];
  logo?: string;
}

interface ExperienceTimelineProps {
  heading: string;
  experiences: ExperienceItem[];
  showCompanyLogos?: boolean;
  showAchievements?: boolean;
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
}

export default function ExperienceTimeline({
  heading,
  experiences,
  showCompanyLogos = true,
  showAchievements = true,
  // Style props with defaults
  backgroundColor = "#ffffff",
  textColor = "#111827",
  paddingY = "64",
  paddingX = "16",
  textAlign = "center",
  fontSize = "xl",
  fontWeight = "bold",
  borderRadius = "0",
  shadow = "none",
}: ExperienceTimelineProps) {
  // Convert style props to CSS
  const containerStyle: React.CSSProperties = {
    backgroundColor,
    color: textColor,
    paddingTop: `${paddingY}px`,
    paddingBottom: `${paddingY}px`,
    paddingLeft: `${paddingX}px`,
    paddingRight: `${paddingX}px`,
    textAlign: textAlign as any,
    borderRadius: `${borderRadius}px`,
    boxShadow: shadow !== "none" ? shadow : undefined,
  };

  const titleStyle: React.CSSProperties = {
    color: textColor,
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
  };

  return (
    <div style={containerStyle} className="px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 style={titleStyle} className="text-3xl text-center sm:text-4xl">
          {heading}
        </h2>

        <div className="mt-12">
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div key={exp.id} className="relative">
                {/* Timeline line */}
                {index !== experiences.length - 1 && (
                  <div
                    className="absolute top-6 left-5 -bottom-8 w-0.5 bg-gray-200"
                    aria-hidden="true"
                  />
                )}

                <div className="relative flex items-start group">
                  {/* Timeline dot */}
                  <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center ring-8 ring-white z-10">
                    <svg
                      className="h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                        clipRule="evenodd"
                      />
                      <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                    </svg>
                  </div>

                  <div className="ml-6 pt-1 flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {exp.role}
                        </h3>
                        <div className="flex items-center mt-1">
                          {showCompanyLogos && exp.logo ? (
                            <img
                              className="h-5 w-5 rounded-full mr-2"
                              src={exp.logo}
                              alt={`${exp.company} logo`}
                            />
                          ) : (
                            <span className="text-sm text-gray-500">
                              {exp.company}
                            </span>
                          )}
                          <span className="mx-2 text-gray-300">•</span>
                          <span className="text-sm text-gray-500">
                            {exp.duration}
                          </span>
                        </div>
                      </div>

                      {showCompanyLogos && exp.logo && (
                        <span className="text-sm text-gray-500">
                          {exp.company}
                        </span>
                      )}
                    </div>

                    <p className="mt-2 text-gray-600">{exp.description}</p>

                    {showAchievements &&
                      exp.achievements &&
                      exp.achievements.length > 0 && (
                        <div className="mt-4">
                          <h4 className="text-sm font-medium text-gray-900">
                            Key Achievements:
                          </h4>
                          <ul className="mt-2 space-y-2">
                            {exp.achievements.map((achievement, idx) => (
                              <li key={idx} className="flex items-start">
                                <svg
                                  className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                <span className="text-gray-600">
                                  {achievement}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a
              href="/resume"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              View Full Resume
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
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
