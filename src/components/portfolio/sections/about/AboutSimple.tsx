import React from "react";
import Image from "next/image";
import { GlobalTheme } from "../../builder/GlobalThemeControls";

interface AboutSimpleProps {
  heading?: string;
  bio?: string;
  highlights?: string[];
  imageUrl?: string;
  ctaText?: string;
  ctaLink?: string;
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
  primaryColor?: string;
  secondaryColor?: string;
  // Global theme
  globalTheme?: GlobalTheme;
}

export default function AboutSimple({
  heading = "About Me",
  bio = "I'm a passionate developer with over 5 years of experience creating digital solutions. I specialize in React, Next.js, and modern web technologies.",
  highlights = ["Full-Stack Development", "UI/UX Design", "Problem Solving"],
  imageUrl = "/placeholder-about.jpg",
  ctaText = "Learn More",
  ctaLink = "#",
  // Style props with defaults
  backgroundColor = "#ffffff",
  textColor = "#111827",
  paddingY = "64",
  paddingX = "16",
  textAlign = "left",
  fontSize = "base",
  fontWeight = "normal",
  borderRadius = "0",
  shadow = "none",
  primaryColor = "#3b82f6",
  secondaryColor = "#64748b",
  globalTheme,
}: AboutSimpleProps) {
  // Use global theme values if available, otherwise fall back to props
  const effectivePrimaryColor = globalTheme?.primary || primaryColor;
  const effectiveSecondaryColor = globalTheme?.secondary || secondaryColor;
  const effectiveBackgroundColor = globalTheme?.background || backgroundColor;
  const effectiveTextColor =
    globalTheme?.mode === "dark" ? "#ffffff" : textColor;
  const effectiveBorderRadius = globalTheme?.borderRadius
    ? `${globalTheme.borderRadius}rem`
    : `${borderRadius}px`;

  // Convert style props to CSS
  const sectionStyle: React.CSSProperties = {
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
        ? "1.875rem"
        : fontSize === "2xl"
        ? "1.5rem"
        : "1.25rem",
    fontWeight:
      fontWeight === "bold"
        ? "bold"
        : fontWeight === "semibold"
        ? "600"
        : "normal",
    fontFamily: globalTheme?.fontHeading,
  };

  const textStyle: React.CSSProperties = {
    color: effectiveTextColor,
    fontSize:
      fontSize === "sm" ? "0.875rem" : fontSize === "lg" ? "1.125rem" : "1rem",
    fontFamily: globalTheme?.fontBody,
  };

  return (
    <section style={sectionStyle} className="bg-white">
      <div className="container px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
          <div className="relative h-64 mb-8 lg:mb-0 lg:h-auto">
            <Image
              src={imageUrl}
              alt="About me"
              layout="fill"
              objectFit="cover"
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="lg:pl-12">
            <h2
              style={titleStyle}
              className="text-3xl font-extrabold sm:text-4xl"
            >
              {heading}
            </h2>
            <div className="mt-6 space-y-6">
              <p style={textStyle}>{bio}</p>
              {highlights && highlights.length > 0 && (
                <ul className="list-disc list-inside space-y-2">
                  {highlights.map((highlight, i) => (
                    <li key={i} style={textStyle}>
                      {highlight}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {ctaText && (
              <div className="mt-8">
                <a
                  href={ctaLink}
                  style={{
                    color: "#ffffff",
                    backgroundColor: effectivePrimaryColor,
                    fontSize: textStyle.fontSize,
                    fontWeight: textStyle.fontWeight,
                    borderRadius: effectiveBorderRadius,
                  }}
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent transition-colors duration-200"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      effectiveSecondaryColor;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor =
                      effectivePrimaryColor;
                  }}
                >
                  {ctaText}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
