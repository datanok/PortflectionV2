import React from "react";

interface Skill {
  name: string;
  level: number; // 0-100
}

interface SkillsBarsProps {
  heading: string;
  skills: Skill[];
  showLevels?: boolean;
  barColor?: string;
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

export default function SkillsBars({
  heading,
  skills,
  showLevels = true,
  barColor = "bg-blue-600",
  // Style props with defaults
  backgroundColor = "#ffffff",
  textColor = "#111827",
  paddingY = "48",
  paddingX = "16",
  textAlign = "center",
  fontSize = "xl",
  fontWeight = "bold",
  borderRadius = "0",
  shadow = "none",
}: SkillsBarsProps) {
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

  const descriptionStyle: React.CSSProperties = {
    color: textColor,
    fontSize:
      fontSize === "sm" ? "0.875rem" : fontSize === "lg" ? "1.125rem" : "1rem",
  };

  return (
    <div style={containerStyle} className="px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h2 style={titleStyle} className="text-3xl text-center sm:text-4xl">
          {heading}
        </h2>

        <div className="mt-12 space-y-6">
          {skills.map((skill, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between">
                <span className={`text-sm font-medium ${textColor}`}>
                  {skill.name}
                </span>
                {showLevels && (
                  <span className="text-sm font-medium text-gray-500">
                    {skill.level}%
                  </span>
                )}
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className={`h-2.5 rounded-full ${barColor}`}
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p style={descriptionStyle} className="text-base">
            And many more skills in my toolbelt. I&apos;m always learning and
            expanding my knowledge.
          </p>
        </div>
      </div>
    </div>
  );
}
