import React from "react";

interface CustomSectionProps {
  title: string;
  content: string;
  backgroundColor?: string;
  textColor?: string;
  children?: React.ReactNode;
  // Style props
  paddingY?: string;
  paddingX?: string;
  textAlign?: "left" | "center" | "right";
  fontSize?: string;
  fontWeight?: string;
  borderRadius?: string;
  shadow?: string;
}

export default function CustomSection({
  title,
  content,
  backgroundColor = "#ffffff",
  textColor = "#111827",
  children,
  // Style props with defaults
  paddingY = "48",
  paddingX = "16",
  textAlign = "center",
  fontSize = "xl",
  fontWeight = "bold",
  borderRadius = "0",
  shadow = "none",
}: CustomSectionProps) {
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

  const contentStyle: React.CSSProperties = {
    color: textColor,
    fontSize:
      fontSize === "sm" ? "0.875rem" : fontSize === "lg" ? "1.125rem" : "1rem",
    opacity: 0.9,
  };

  return (
    <div style={containerStyle} className="px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 style={titleStyle} className="text-3xl sm:text-4xl">
            {title}
          </h2>
          <div style={contentStyle} className="mt-3 text-xl">
            {content}
          </div>
        </div>

        {children && <div className="mt-8">{children}</div>}
      </div>
    </div>
  );
}
