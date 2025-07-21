import React from "react";
import { motion } from "framer-motion";

interface SkillItem {
  name: string;
  icon?: string; // Could be an emoji or icon class
  level?: number; // 1-5
  category?: string;
}

interface SkillsGridProps {
  title: string;
  description?: string;
  skills: SkillItem[];
  columns?: 2 | 3 | 4 | 5 | 6;
  showIcons?: boolean;
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

export default function SkillsGrid({
  title,
  description,
  skills = [],
  columns = 4,
  showIcons = true,
  showLevels = false,
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
}: SkillsGridProps) {
  const gridCols = {
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-2 sm:grid-cols-3 md:grid-cols-4",
    5: "grid-cols-2 sm:grid-cols-3 md:grid-cols-5",
    6: "grid-cols-3 sm:grid-cols-4 md:grid-cols-6",
  };

  // Get a random emoji if icon is not provided
  const getRandomEmoji = (name: string) => {
    const emojis = ["🔧", "💻", "🎨", "📱", "🚀", "📊", "🧠", "⚡"];
    const index =
      name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) %
      emojis.length;
    return emojis[index];
  };

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

        <div className={`mt-12 grid gap-6 ${gridCols[columns]}`}>
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -5 }}
              className="p-6 text-center bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200"
            >
              {showIcons && (
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-3 text-3xl rounded-full bg-blue-50 text-blue-600">
                  {skill.icon || getRandomEmoji(skill.name)}
                </div>
              )}
              <h3 className="text-lg font-medium text-gray-900">
                {skill.name}
              </h3>
              {showLevels && skill.level !== undefined && (
                <div className="mt-2">
                  <div className="flex justify-center space-x-1">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <div
                        key={level}
                        className={`w-3 h-3 rounded-full ${
                          level <= (skill.level || 0)
                            ? "bg-blue-600"
                            : "bg-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
