import React from "react";

import { GlobalTheme } from "../../builder/GlobalThemeControls";

interface HeroMinimalProps {
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
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
  backgroundImage?: string;
  overlayOpacity?: number;
  // Global theme
  globalTheme?: GlobalTheme;
}

export default function HeroMinimal({
  title,
  subtitle,
  ctaText,
  ctaLink = "#",
  secondaryCtaText,
  secondaryCtaLink = "#",
  // Style props with defaults
  backgroundColor = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  textColor = "#ffffff",
  paddingY = "120",
  paddingX = "24",
  textAlign = "center",
  fontSize = "xl",
  fontWeight = "bold",
  borderRadius = "0",
  shadow = "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  primaryColor = "#ffffff",
  secondaryColor = "#f8fafc",
  backgroundImage,
  overlayOpacity = 0.4,
  globalTheme,
}: HeroMinimalProps) {
  // Use global theme values if available, otherwise fall back to props
  const effectivePrimaryColor = globalTheme?.primary || primaryColor;
  const effectiveSecondaryColor = globalTheme?.secondary || secondaryColor;
  const effectiveBackgroundColor = globalTheme?.background || backgroundColor;
  const effectiveTextColor =
    globalTheme?.mode === "dark" ? "#ffffff" : textColor;
  const effectiveBorderRadius = globalTheme?.borderRadius
    ? `${globalTheme.borderRadius}rem`
    : `${borderRadius}px`;

  // Enhanced container style with modern design
  const containerStyle: React.CSSProperties = {
    background: backgroundImage
      ? `linear-gradient(rgba(0,0,0,${overlayOpacity}), rgba(0,0,0,${overlayOpacity})), url(${backgroundImage})`
      : effectiveBackgroundColor,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    color: effectiveTextColor,
    paddingTop: `${paddingY}px`,
    paddingBottom: `${paddingY}px`,
    paddingLeft: `${paddingX}px`,
    paddingRight: `${paddingX}px`,
    textAlign: textAlign as any,
    borderRadius: effectiveBorderRadius,
    boxShadow: shadow !== "none" ? shadow : undefined,
    fontFamily: globalTheme?.fontBody,
    position: "relative",
    overflow: "hidden",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  // Enhanced typography styles
  const titleStyle: React.CSSProperties = {
    color: effectiveTextColor,
    fontSize:
      fontSize === "xl" ? "4rem" : fontSize === "2xl" ? "3.5rem" : "3rem",
    fontWeight:
      fontWeight === "bold" ? "800" : fontWeight === "semibold" ? "700" : "600",
    fontFamily:
      globalTheme?.fontHeading || "system-ui, -apple-system, sans-serif",
    lineHeight: "1.1",
    letterSpacing: "-0.02em",
    marginBottom: "1.5rem",
    textShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
    background:
      "linear-gradient(135deg, currentColor 0%, rgba(255,255,255,0.8) 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  };

  const subtitleStyle: React.CSSProperties = {
    color: effectiveTextColor,
    fontSize:
      fontSize === "sm"
        ? "1.125rem"
        : fontSize === "lg"
        ? "1.375rem"
        : "1.25rem",
    fontFamily: globalTheme?.fontBody || "system-ui, -apple-system, sans-serif",
    lineHeight: "1.6",
    fontWeight: "400",
    opacity: 0.9,
    marginBottom: "3rem",
    maxWidth: "48rem",
    margin: "0 auto 3rem auto",
  };

  // Enhanced button styles
  const primaryButtonStyle: React.CSSProperties = {
    color: "#ffffff",
    background: `linear-gradient(135deg, ${effectivePrimaryColor} 0%, ${effectiveSecondaryColor} 100%)`,
    fontSize: "1.125rem",
    fontWeight: "600",
    borderRadius:
      effectiveBorderRadius === "0px" ? "0.75rem" : effectiveBorderRadius,
    padding: "1rem 2rem",
    border: "none",
    cursor: "pointer",
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2), 0 4px 10px rgba(0, 0, 0, 0.1)",
    transform: "translateY(0)",
    marginRight: "1rem",
    marginBottom: "1rem",
  };

  const secondaryButtonStyle: React.CSSProperties = {
    color: effectiveTextColor,
    background: "transparent",
    fontSize: "1.125rem",
    fontWeight: "600",
    borderRadius:
      effectiveBorderRadius === "0px" ? "0.75rem" : effectiveBorderRadius,
    padding: "1rem 2rem",
    border: `2px solid ${effectiveTextColor}`,
    cursor: "pointer",
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    transform: "translateY(0)",
    marginBottom: "1rem",
  };

  // Decorative elements
  const decorativeCircle1: React.CSSProperties = {
    position: "absolute",
    top: "10%",
    left: "10%",
    width: "200px",
    height: "200px",
    borderRadius: "50%",
    background: "rgba(255, 255, 255, 0.1)",
    filter: "blur(80px)",
    zIndex: 0,
  };

  const decorativeCircle2: React.CSSProperties = {
    position: "absolute",
    bottom: "20%",
    right: "15%",
    width: "300px",
    height: "300px",
    borderRadius: "50%",
    background: "rgba(255, 255, 255, 0.05)",
    filter: "blur(100px)",
    zIndex: 0,
  };

  const contentWrapperStyle: React.CSSProperties = {
    position: "relative",
    zIndex: 1,
    maxWidth: "1200px",
    width: "100%",
    padding: "0 1rem",
  };

  return (
    <div style={containerStyle}>
      {/* Decorative background elements */}
      <div style={decorativeCircle1}></div>
      <div style={decorativeCircle2}></div>

      {/* Main content */}
      <div style={contentWrapperStyle}>
        <h1 style={titleStyle}>{title}</h1>

        {subtitle && <p style={subtitleStyle}>{subtitle}</p>}

        {(ctaText || secondaryCtaText) && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent:
                textAlign === "center"
                  ? "center"
                  : textAlign === "right"
                  ? "flex-end"
                  : "flex-start",
              gap: "1rem",
              marginTop: "2rem",
            }}
          >
            {ctaText && (
              <a
                href={ctaLink}
                style={primaryButtonStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 15px 35px rgba(0, 0, 0, 0.3), 0 6px 15px rgba(0, 0, 0, 0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 25px rgba(0, 0, 0, 0.2), 0 4px 10px rgba(0, 0, 0, 0.1)";
                }}
              >
                {ctaText}
                <svg
                  style={{
                    marginLeft: "0.5rem",
                    width: "1.25rem",
                    height: "1.25rem",
                  }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            )}

            {secondaryCtaText && (
              <a
                href={secondaryCtaLink}
                style={secondaryButtonStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = effectiveTextColor;
                  e.currentTarget.style.color = backgroundColor.includes(
                    "gradient"
                  )
                    ? "#1f2937"
                    : effectiveBackgroundColor;
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = effectiveTextColor;
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {secondaryCtaText}
              </a>
            )}
          </div>
        )}

        {/* Scroll indicator */}
        <div
          style={{
            position: "absolute",
            bottom: "2rem",
            left: "50%",
            transform: "translateX(-50%)",
            opacity: 0.7,
            animation: "bounce 2s infinite",
          }}
        >
          <svg
            style={{ width: "2rem", height: "2rem", color: effectiveTextColor }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>

      <style>
        {`
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {
              transform: translateX(-50%) translateY(0);
            }
            40% {
              transform: translateX(-50%) translateY(-10px);
            }
            60% {
              transform: translateX(-50%) translateY(-5px);
            }
          }
          
          @media (max-width: 768px) {
            h1 {
              font-size: 2.5rem !important;
            }
          }
          
          @media (max-width: 480px) {
            h1 {
              font-size: 2rem !important;
            }
          }
        `}
      </style>
    </div>
  );
}
