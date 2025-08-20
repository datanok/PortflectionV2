import React from "react";
import {
  ChevronDown,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
} from "lucide-react";

interface HeroSectionProps {
  // Content Props
  title?: string;
  subtitle?: string;
  description?: string;
  profileImage?: string;
  ctaText?: string;
  ctaLink?: string;
  showSocialLinks?: boolean;
  githubUrl?: string;
  linkedinUrl?: string;
  emailUrl?: string;

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

const HeroSection: React.FC<HeroSectionProps> = ({
  title = "John Doe",
  subtitle = "Full Stack Developer",
  description = "I craft beautiful, functional web experiences with modern technologies. Passionate about clean code, user experience, and continuous learning.",
  profileImage = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
  ctaText = "View My Work",
  ctaLink = "#projects",
  showSocialLinks = true,
  githubUrl = "https://github.com",
  linkedinUrl = "https://linkedin.com",
  emailUrl = "mailto:john@example.com",
  backgroundColor = "#ffffff",
  textColor = "#111827",
  primaryColor = "#3b82f6",
  secondaryColor = "#6b7280",
  paddingY = "64",
  paddingX = "16",
  textAlign = "center",
  fontSize = "xl",
  fontWeight = "bold",
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

  const titleStyles = {
    color: textColor,
    fontSize: fontSize === "xl" ? "3rem" : fontSize,
    fontWeight: fontWeight === "bold" ? "700" : fontWeight,
  };

  const subtitleStyles = {
    color: primaryColor,
    fontSize: "1.5rem",
    fontWeight: "600",
  };

  const descriptionStyles = {
    color: secondaryColor,
    fontSize: "1.125rem",
    lineHeight: "1.7",
  };

  const ctaStyles = {
    backgroundColor: primaryColor,
    color: "#ffffff",
    borderRadius: "0.5rem",
    transition: "all 0.3s ease",
  };

  const ctaHoverStyles = {
    transform: "translateY(-2px)",
    boxShadow: `0 10px 25px ${primaryColor}33`,
  };

  return (
    <section
      className={`min-h-screen flex items-center justify-center relative overflow-hidden px-${paddingX} py-${paddingY}`}
      style={containerStyles}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-10"
          style={{ backgroundColor: primaryColor }}
        />
        <div
          className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-5"
          style={{ backgroundColor: primaryColor }}
        />
      </div>

      <div className={`max-w-4xl mx-auto text-${textAlign} relative z-10`}>
        {/* Profile Image */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <img
              src={profileImage}
              alt="Profile"
              className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover shadow-xl ring-4 ring-white ring-opacity-50"
            />
            <div
              className="absolute inset-0 rounded-full ring-2 ring-opacity-30"
              style={{ borderColor: primaryColor }}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          <h1
            className="text-4xl md:text-6xl lg:text-7xl leading-tight tracking-tight"
            style={titleStyles}
          >
            {title}
          </h1>

          <h2
            className="text-xl md:text-2xl lg:text-3xl font-medium"
            style={subtitleStyles}
          >
            {subtitle}
          </h2>

          <p
            className="max-w-2xl mx-auto text-lg md:text-xl leading-relaxed"
            style={descriptionStyles}
          >
            {description}
          </p>

          {/* CTA and Social Links */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
            <a
              href={ctaLink}
              className="group inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 hover:scale-105"
              style={ctaStyles}
              onMouseEnter={(e) => {
                Object.assign(e.currentTarget.style, ctaHoverStyles);
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {ctaText}
              <ExternalLink
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </a>

            {showSocialLinks && (
              <div className="flex items-center gap-4">
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full border-2 border-gray-200 hover:border-gray-300 transition-all duration-300 hover:scale-110 hover:shadow-lg"
                  style={{ borderColor: `${secondaryColor}40` }}
                >
                  <Github size={24} style={{ color: secondaryColor }} />
                </a>
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full border-2 border-gray-200 hover:border-gray-300 transition-all duration-300 hover:scale-110 hover:shadow-lg"
                  style={{ borderColor: `${secondaryColor}40` }}
                >
                  <Linkedin size={24} style={{ color: secondaryColor }} />
                </a>
                <a
                  href={emailUrl}
                  className="p-3 rounded-full border-2 border-gray-200 hover:border-gray-300 transition-all duration-300 hover:scale-110 hover:shadow-lg"
                  style={{ borderColor: `${secondaryColor}40` }}
                >
                  <Mail size={24} style={{ color: secondaryColor }} />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
