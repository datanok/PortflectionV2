import React from "react";

// Simple icon components for social links
const GithubLogo = ({ fill = "currentColor", width = 20, height = 20 }) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill={fill}>
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const LinkedInLogo = ({ fill = "currentColor", width = 20, height = 20 }) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill={fill}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const XLogo = ({ fill = "currentColor", width = 20, height = 20 }) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill={fill}>
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
);

const MailLogo = ({ fill = "currentColor", width = 20, height = 20 }) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill={fill}>
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
  </svg>
);

const InstagramLogo = ({ fill = "currentColor", width = 20, height = 20 }) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill={fill}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

interface MinimalHeroProps {
  title?: string;
  subtitle?: string;
  description?: string;
  profileImage?: string;
  showSocialLinks?: boolean;
  socialLinks?: Array<{
    platform: string;
    url: string;
    username?: string;
  }>;
  showResumeButton?: boolean;
  resumeUrl?: string;
  resumeText?: string;
  backgroundColor?: string;
  textColor?: string;
  primaryColor?: string;
  secondaryColor?: string;
  paddingY?: string;
  paddingX?: string;
  textAlign?: "left" | "center" | "right";
  fontSize?: string;
  fontWeight?: string;
  fontFamily?: string;
}

const MinimalHero: React.FC<MinimalHeroProps> = ({
  title = "Hi, I'm John Doe 👋",
  subtitle = "Full Stack Developer",
  description = "I'm a full stack developer passionate about creating exceptional digital experiences that are fast, accessible, visually appealing, and responsive. Even though I have been creating web applications for over 7 years, I still love it as if it was something new.",
  profileImage = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
  showSocialLinks = true,
  socialLinks = [
    { platform: "GitHub", url: "https://github.com/johndoe", username: "@johndoe" },
    { platform: "LinkedIn", url: "https://linkedin.com/in/johndoe", username: "@johndoe" },
    { platform: "Twitter", url: "https://twitter.com/johndoe", username: "@johndoe" },
    { platform: "Email", url: "mailto:john.doe@example.com", username: "john.doe@example.com" },
  ],
  showResumeButton = true,
  resumeUrl = "/resume.pdf",
  resumeText = "Download Resume",
  backgroundColor = "#ffffff",
  textColor = "#1f2937",
  primaryColor = "#3b82f6",
  secondaryColor = "#6b7280",
  paddingY = "80",
  paddingX = "16",
  textAlign = "center",
  fontSize = "base",
  fontWeight = "normal",
  fontFamily = "Inter, system-ui, sans-serif",
}) => {
  const getSocialIcon = (platform: string) => {
    const iconProps = { fill: secondaryColor, width: 20, height: 20 };
    
    switch (platform.toLowerCase()) {
      case "github":
        return <GithubLogo {...iconProps} />;
      case "linkedin":
        return <LinkedInLogo {...iconProps} />;
      case "twitter":
      case "x":
        return <XLogo {...iconProps} />;
      case "email":
        return <MailLogo {...iconProps} />;
      case "instagram":
        return <InstagramLogo {...iconProps} />;
      default:
        return <div className="w-5 h-5 bg-gray-400 rounded" />;
    }
  };

  const containerStyle = {
    backgroundColor,
    color: textColor,
    paddingTop: `${paddingY}px`,
    paddingBottom: `${paddingY}px`,
    paddingLeft: `${paddingX}px`,
    paddingRight: `${paddingX}px`,
    textAlign: textAlign as any,
    fontFamily,
    fontSize: fontSize === "base" ? "16px" : fontSize,
    fontWeight,
  };

  return (
    <section 
      className="min-h-screen flex items-center justify-center"
      style={containerStyle}
    >
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Profile Image */}
        {profileImage && (
          <div className="flex justify-center">
            <div 
              className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg"
              style={{ borderColor: `${primaryColor}20` }}
            >
              <img
                src={profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}

        {/* Title */}
        <div className="space-y-4">
          <h1 
            className="text-4xl md:text-5xl font-bold leading-tight"
            style={{ color: textColor }}
          >
            {title}
          </h1>
          
          {subtitle && (
            <p 
              className="text-xl md:text-2xl"
              style={{ color: secondaryColor }}
            >
              {subtitle}
            </p>
          )}
        </div>

        {/* Description */}
        {description && (
          <div className="max-w-xl mx-auto">
            <p 
              className="text-lg leading-relaxed"
              style={{ color: secondaryColor }}
            >
              {description}
            </p>
          </div>
        )}

        {/* Resume Button */}
        {showResumeButton && resumeUrl && (
          <div className="pt-8">
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg"
              style={{
                backgroundColor: primaryColor,
                color: "#ffffff",
                textDecoration: "none",
              }}
            >
              <svg 
                className="w-5 h-5 mr-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                />
              </svg>
              {resumeText}
            </a>
          </div>
        )}

        {/* Social Links */}
        {showSocialLinks && socialLinks && socialLinks.length > 0 && (
          <div className="flex justify-center space-x-6 pt-8">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full transition-all duration-200 hover:scale-110"
                style={{ 
                  backgroundColor: `${primaryColor}10`,
                  color: secondaryColor 
                }}
                title={link.username || link.platform}
              >
                {getSocialIcon(link.platform)}
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MinimalHero;
