import React from "react";
import { ArrowRight, Github, Linkedin, Mail, ChevronDown } from "lucide-react";

interface HeroTypographyProps {
  // Content Props
  title?: string;
  subtitle?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
  showSocialLinks?: boolean;
  githubUrl?: string;
  linkedinUrl?: string;
  emailUrl?: string;
  showScrollIndicator?: boolean;
  largeTitle?: boolean;
  monospaceFont?: boolean;

  // Style Props
  backgroundColor?: string;
  textColor?: string;
  primaryColor?: string;
  secondaryColor?: string;
  paddingY?: string;
  paddingX?: string;
  textAlign?: "left" | "center" | "right";
  fontSize?: string;
  fontWeight?: string;
  borderRadius?: string;
  shadow?: string;

  // Global Theme
  globalTheme?: any;
}

const HeroTypography: React.FC<HeroTypographyProps> = ({
  title = "DESIGNER",
  subtitle = "DEVELOPER",
  description = "Creating digital experiences that matter",
  ctaText = "Explore",
  ctaLink = "#work",
  showSocialLinks = false,
  githubUrl = "https://github.com",
  linkedinUrl = "https://linkedin.com",
  emailUrl = "mailto:john@example.com",
  showScrollIndicator = false,
  largeTitle = true,
  monospaceFont = true,
  backgroundColor = "#000000",
  textColor = "#ffffff",
  primaryColor = "#ffffff",
  secondaryColor = "#888888",
  paddingY = "120",
  paddingX = "32",
  textAlign = "left",
  fontSize = "6xl",
  fontWeight = "black",
  borderRadius = "0",
  shadow = "none",
  globalTheme,
}) => {
  const containerStyles = {
    backgroundColor,
    color: textColor,
    borderRadius: borderRadius !== "0" ? `${borderRadius}px` : "0px",
    boxShadow: shadow !== "none" ? shadow : "none",
  };

  const getFontSize = () => {
    if (!largeTitle) return fontSize === "6xl" ? "3rem" : fontSize;

    switch (fontSize) {
      case "6xl":
        return "clamp(4rem, 12vw, 12rem)";
      case "5xl":
        return "clamp(3rem, 10vw, 10rem)";
      case "4xl":
        return "clamp(2.5rem, 8vw, 8rem)";
      default:
        return "clamp(4rem, 12vw, 12rem)";
    }
  };

  const titleStyles = {
    color: textColor,
    fontSize: getFontSize(),
    fontWeight: fontWeight === "black" ? "900" : fontWeight,
    fontFamily: monospaceFont
      ? "'JetBrains Mono', 'Fira Code', 'Consolas', monospace"
      : "inherit",
    lineHeight: "0.85",
    letterSpacing: "-0.02em",
  };

  const subtitleStyles = {
    color: primaryColor,
    fontSize: getFontSize(),
    fontWeight: fontWeight === "black" ? "900" : fontWeight,
    fontFamily: monospaceFont
      ? "'JetBrains Mono', 'Fira Code', 'Consolas', monospace"
      : "inherit",
    lineHeight: "0.85",
    letterSpacing: "-0.02em",
    opacity: "0.7",
  };

  const descriptionStyles = {
    color: secondaryColor,
    fontSize: "1.25rem",
    fontWeight: "400",
    fontFamily: monospaceFont
      ? "'JetBrains Mono', 'Fira Code', 'Consolas', monospace"
      : "inherit",
    letterSpacing: monospaceFont ? "0.02em" : "normal",
  };

  const ctaStyles = {
    color: primaryColor,
    borderColor: primaryColor,
    fontFamily: monospaceFont
      ? "'JetBrains Mono', 'Fira Code', 'Consolas', monospace"
      : "inherit",
    fontWeight: "500",
    letterSpacing: "0.05em",
  };

  return (
    <section
      className={`min-h-screen flex items-center relative overflow-hidden px-${paddingX} py-${paddingY}`}
      style={containerStyles}
    >
      {/* Grid overlay for tech aesthetic */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `linear-gradient(${primaryColor} 1px, transparent 1px), linear-gradient(90deg, ${primaryColor} 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div
        className={`max-w-7xl mx-auto w-full text-${textAlign} relative z-10`}
      >
        <div className="space-y-8">
          {/* Main Typography */}
          <div className="space-y-2 overflow-hidden">
            <div className="transform transition-all duration-1000 ease-out">
              <h1
                className="tracking-tighter transform hover:scale-105 transition-transform duration-500"
                style={titleStyles}
              >
                {title}
              </h1>
            </div>

            {subtitle && (
              <div className="transform transition-all duration-1000 ease-out delay-200">
                <h2
                  className="tracking-tighter transform hover:scale-105 transition-transform duration-500"
                  style={subtitleStyles}
                >
                  {subtitle}
                </h2>
              </div>
            )}
          </div>

          {/* Description and CTA Row */}
          <div
            className={`flex ${
              textAlign === "center"
                ? "justify-center"
                : textAlign === "right"
                ? "justify-end"
                : "justify-start"
            } items-end gap-12 flex-wrap`}
          >
            <div className="flex-1 max-w-md space-y-6">
              <p
                className="leading-relaxed transform transition-all duration-1000 ease-out delay-400"
                style={descriptionStyles}
              >
                {description}
              </p>

              {/* CTA Button */}
              <div className="transform transition-all duration-1000 ease-out delay-600">
                <a
                  href={ctaLink}
                  className="group inline-flex items-center gap-3 px-6 py-3 border-2 rounded-none uppercase text-sm tracking-widest hover:bg-white hover:text-black transition-all duration-300"
                  style={ctaStyles}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = primaryColor;
                    e.currentTarget.style.color = backgroundColor;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = primaryColor;
                  }}
                >
                  {ctaText}
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-2 transition-transform duration-300"
                  />
                </a>
              </div>
            </div>

            {/* Social Links */}
            {showSocialLinks && (
              <div className="flex flex-col gap-4 transform transition-all duration-1000 ease-out delay-800">
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 border border-gray-600 hover:border-white transition-all duration-300 hover:scale-110"
                  style={{ borderColor: `${secondaryColor}60` }}
                >
                  <Github size={20} style={{ color: secondaryColor }} />
                </a>
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 border border-gray-600 hover:border-white transition-all duration-300 hover:scale-110"
                  style={{ borderColor: `${secondaryColor}60` }}
                >
                  <Linkedin size={20} style={{ color: secondaryColor }} />
                </a>
                <a
                  href={emailUrl}
                  className="p-2 border border-gray-600 hover:border-white transition-all duration-300 hover:scale-110"
                  style={{ borderColor: `${secondaryColor}60` }}
                >
                  <Mail size={20} style={{ color: secondaryColor }} />
                </a>
              </div>
            )}
          </div>

          {/* Bottom Info Bar */}
          <div
            className={`flex ${
              textAlign === "center"
                ? "justify-center"
                : textAlign === "right"
                ? "justify-end"
                : "justify-between"
            } items-center pt-16 border-t border-gray-800 transform transition-all duration-1000 ease-out delay-1000`}
          >
            <div className="flex items-center gap-8">
              <div
                className="text-xs uppercase tracking-widest"
                style={{
                  color: secondaryColor,
                  fontFamily: monospaceFont
                    ? "'JetBrains Mono', 'Fira Code', 'Consolas', monospace"
                    : "inherit",
                }}
              >
                Portfolio 2025
              </div>
              <div
                className="text-xs uppercase tracking-widest"
                style={{
                  color: secondaryColor,
                  fontFamily: monospaceFont
                    ? "'JetBrains Mono', 'Fira Code', 'Consolas', monospace"
                    : "inherit",
                }}
              >
                Based in Mumbai
              </div>
            </div>

            {/* Scroll Indicator */}
            {showScrollIndicator && (
              <div className="flex items-center gap-2">
                <ChevronDown
                  size={16}
                  style={{ color: secondaryColor }}
                  className="animate-bounce"
                />
                <span
                  className="text-xs uppercase tracking-widest"
                  style={{
                    color: secondaryColor,
                    fontFamily: monospaceFont
                      ? "'JetBrains Mono', 'Fira Code', 'Consolas', monospace"
                      : "inherit",
                  }}
                >
                  Scroll
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Accent elements */}
      <div
        className="absolute top-10 right-10 w-2 h-20 opacity-30"
        style={{ backgroundColor: primaryColor }}
      />
      <div
        className="absolute bottom-10 left-10 w-20 h-2 opacity-30"
        style={{ backgroundColor: primaryColor }}
      />
    </section>
  );
};

export default HeroTypography;
