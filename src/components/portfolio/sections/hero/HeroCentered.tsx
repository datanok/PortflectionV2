import React from "react";
import Image from "next/image";
import { GlobalTheme } from "../../builder/GlobalThemeControls";

interface HeroCenteredProps {
  title: string;
  subtitle: string;
  description?: string;
  primaryCta?: string;
  secondaryCta?: string;
  imageUrl?: string;
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

export default function HeroCentered({
  title,
  subtitle,
  description,
  primaryCta = "Get Started",
  secondaryCta = "Learn More",
  imageUrl = "/placeholder-avatar.jpg",
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
  globalTheme,
}: HeroCenteredProps) {
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
    <div style={containerStyle} className="relative overflow-hidden">
      <div className="relative pt-6 pb-16 sm:pb-24">
        <main className="px-4 mx-auto mt-16 max-w-7xl sm:mt-24">
          <div className="text-center">
            <h1
              style={titleStyle}
              className="text-4xl tracking-tight sm:text-5xl md:text-6xl"
            >
              <span className="block">{title}</span>
              <span
                className="block"
                style={{ color: globalTheme?.primary || "#3b82f6" }}
              >
                {subtitle}
              </span>
            </h1>
            {description && (
              <p
                style={descriptionStyle}
                className="max-w-md mx-auto mt-3 text-base sm:text-lg md:mt-5 md:text-xl md:max-w-3xl"
              >
                {description}
              </p>
            )}
            <div className="max-w-md mx-auto mt-5 sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <a
                  href="#"
                  style={{
                    backgroundColor: globalTheme?.primary || "#3b82f6",
                    borderRadius: effectiveBorderRadius,
                  }}
                  className="flex items-center justify-center w-full px-8 py-3 text-base font-medium text-white border border-transparent hover:opacity-90 md:py-4 md:text-lg md:px-10 transition-opacity"
                >
                  {primaryCta}
                </a>
              </div>
              {secondaryCta && (
                <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                  <a
                    href="#"
                    style={{
                      color: globalTheme?.primary || "#3b82f6",
                      backgroundColor: globalTheme?.card || "#ffffff",
                      borderRadius: effectiveBorderRadius,
                    }}
                    className="flex items-center justify-center w-full px-8 py-3 text-base font-medium border border-transparent hover:opacity-80 md:py-4 md:text-lg md:px-10 transition-opacity"
                  >
                    {secondaryCta}
                  </a>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
