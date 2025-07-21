import React from "react";

interface SkillItem {
  name: string;
  level: number; // 1-5
  category?: string;
}

interface SkillsListProps {
  title: string;
  description?: string;
  skills: SkillItem[];
  showCategories?: boolean;
  showLevels?: boolean;
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

export default function SkillsList({
  title,
  description,
  skills = [],
  showCategories = false,
  showLevels = true,
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
}: SkillsListProps) {
  // Group skills by category if showCategories is true
  const skillsByCategory = showCategories
    ? skills.reduce<Record<string, SkillItem[]>>((acc, skill) => {
        const category = skill.category || "Other";
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(skill);
        return acc;
      }, {})
    : { "": skills };

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
    <section style={containerStyle}>
      <div className="container px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 style={titleStyle} className="text-3xl sm:text-4xl">
            {title}
          </h2>
          {description && (
            <p
              style={descriptionStyle}
              className="max-w-2xl mx-auto mt-3 text-xl"
            >
              {description}
            </p>
          )}
        </div>

        <div className="mt-12">
          {Object.entries(skillsByCategory).map(
            ([category, categorySkills]) => (
              <div key={category} className="mb-12">
                {showCategories && category && (
                  <h3 className="mb-6 text-xl font-semibold text-gray-900">
                    {category}
                  </h3>
                )}
                <div className="space-y-4">
                  {categorySkills.map((skill, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-900">
                          {skill.name}
                        </span>
                        {showLevels && (
                          <span className="text-xs text-gray-500">
                            {skill.level}/5
                          </span>
                        )}
                      </div>
                      {showLevels && (
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-600 rounded-full"
                            style={{ width: `${(skill.level / 5) * 100}%` }}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
