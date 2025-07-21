import React from "react";
import Image from "next/image";

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy?: string;
  duration: string;
  gpa?: string;
  achievements?: string[];
  logo?: string;
  location?: string;
}

interface EducationCardsProps {
  heading: string;
  education: EducationItem[];
  showGPA?: boolean;
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

export default function EducationCards({
  heading,
  education,
  showGPA = true,
  showAchievements = true,
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
}: EducationCardsProps) {
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
      <div className="max-w-7xl mx-auto">
        <h2 style={titleStyle} className="text-3xl text-center sm:text-4xl">
          {heading}
        </h2>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {education.map((edu) => (
            <div
              key={edu.id}
              className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200 flex flex-col h-full"
            >
              <div className="px-4 py-5 sm:px-6 flex-1">
                <div className="flex items-center">
                  {edu.logo && edu.logo.startsWith("http") && (
                    <div className="flex-shrink-0 h-12 w-12 rounded-full overflow-hidden mr-4">
                      <Image
                        className="h-full w-full object-cover"
                        src={edu.logo}
                        alt={`${edu.institution} logo`}
                        width={48}
                        height={48}
                      />
                    </div>
                  )}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {edu.institution}
                    </h3>
                    <p className="text-sm text-gray-500">{edu.location}</p>
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="text-md font-medium text-gray-900">
                    {edu.degree}
                  </h4>
                  {edu.fieldOfStudy && (
                    <p className="text-sm text-gray-500">{edu.fieldOfStudy}</p>
                  )}
                  <p className="text-sm text-gray-500 mt-1">{edu.duration}</p>

                  {showGPA && edu.gpa && (
                    <div className="mt-2">
                      <span className="text-sm font-medium text-gray-900">
                        GPA:
                      </span>
                      <span className="text-sm text-gray-600">{edu.gpa}</span>
                    </div>
                  )}
                </div>

                {showAchievements &&
                  edu.achievements &&
                  edu.achievements.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">
                        Achievements:
                      </h4>
                      <ul className="space-y-2">
                        {edu.achievements.map((achievement, idx) => (
                          <li key={idx} className="flex items-start">
                            <svg
                              className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0"
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
                            <span className="text-sm text-gray-600">
                              {achievement}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
              </div>

              <div className="px-4 py-4 bg-gray-50 text-right text-sm">
                <a
                  href={`#${edu.institution
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  View details
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            type="button"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            View All Education
          </button>
        </div>
      </div>
    </div>
  );
}
