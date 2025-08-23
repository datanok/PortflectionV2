import React, { useState, useEffect, useCallback, useMemo } from "react";
import { PortfolioFontLoader } from "@/lib/portfolioFontLoader";

// Simple icon components since we can't import
const GithubLogo = ({ fill, width, height }) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill={fill}>
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const LinkedInLogo = ({ fill, width, height }) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill={fill}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const XLogo = ({ fill, width, height }) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill={fill}>
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
);

const DribbbleLogo = ({ fill, width, height }) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill={fill}>
    <path d="M12 0C5.374 0 0 5.373 0 12s5.374 12 12 12 12-5.373 12-12S18.626 0 12 0zm9.568 7.21c.693 1.454 1.109 3.077 1.137 4.79-3.085-.654-6.13-.654-8.863 0 .462-1.108.924-2.24 1.385-3.348 2.616.923 4.617 1.846 6.341-1.442zm-7.71-5.637c1.732.077 3.348.461 4.789 1.154-1.616 2.616-3.617 3.693-6.156 4.385-.385-1.077-.77-2.155-1.109-3.232 1.155-.923 1.732-1.462 2.476-2.307zm-2.4 3.54c.308 1.077.693 2.155 1.077 3.232-2.77.847-5.233 1.847-7.618 3.54C3.232 9.925 5.233 7.925 8.31 6.309c.616-.308 1.231-.539 1.847-.77.231-.077.385-.154.616-.231.231-.077.385-.154.539-.231zm-3.694 5.867c2.77-1.847 5.694-2.924 8.787-3.694.308.847.539 1.693.77 2.539-3.155.77-5.925 2.308-7.926 4.77-1.077-1.155-1.693-2.693-1.631-4.155zm2.924 5.156c1.693-2.155 4.155-3.54 7.002-4.232.385 1.54.693 3.079.846 4.694-2.693.923-5.694.693-8.31-.924.154-.154.308-.308.462-.462zm6.002-.154c-.231-1.54-.539-3.002-.924-4.463 2.385-.539 5.002-.385 7.618.385-.846 2.308-2.77 4.155-5.233 5.156-.462-.385-.924-.693-1.461-1.078z" />
  </svg>
);

const MetaLogo = ({ fill, width, height }) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill={fill}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const InstagramLogo = ({ fill, width, height }) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill={fill}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const MailLogo = ({ fill, width, height }) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill={fill}>
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
  </svg>
);

const YoutubeLogo = ({ fill, width, height }) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill={fill}>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

interface HeroAction {
  label: string;
  href: string;
  isPrimary?: boolean;
  downloadFile?: string;
}

interface SocialLink {
  platform: string;
  url: string;
  username: string;
}

interface ComponentProps {
  // Content Props
  greeting?: string;
  name?: string;
  title?: string;
  tagline?: string;
  description?: string;
  typingTexts?: string[];
  buttons?: HeroAction[];
  socialLinks?: SocialLink[];
  showStatus?: boolean;
  statusText?: string;
  statusColor?: string;
  profileImage?: string;
  showProfileImage?: boolean;
  showCodeSnippet?: boolean;
  codeSnippet?: string;
  floatingCodeElement1?: string;
  floatingCodeElement2?: string;

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

  // Theme Options
  theme?: "minimal" | "code" | "modern";

  // Visual Display Options
  visualDisplay?: "profile" | "code" | "geometric" | "minimal" | "none";

  // Global Theme
  globalTheme?: any;
}

function getContrastColor(hex: string) {
  if (hex.length === 4) {
    hex = "#" + [...hex.slice(1)].map((c) => c + c).join("");
  }

  const r = parseInt(hex.substr(1, 2), 16);
  const g = parseInt(hex.substr(3, 2), 16);
  const b = parseInt(hex.substr(5, 2), 16);

  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  return brightness > 128 ? "#000000" : "#FFFFFF";
}

const TypographyHero: React.FC<ComponentProps> = ({
  greeting = "HELLO_WORLD();",
  name = "JANE_DOE",
  title = "FULL_STACK_DEVELOPER",
  tagline = "Building digital experiences with clean code & creative solutions",
  description = "Passionate developer specializing in modern web technologies, user experience design, and scalable applications. Currently crafting the next generation of digital products.",
  typingTexts,
  buttons,
  socialLinks,
  showStatus = true,
  statusText = "AVAILABLE_FOR_HIRE",
  statusColor = "#10b981",
  profileImage = "",
  showProfileImage = false,
  showCodeSnippet = true,
  codeSnippet,
  floatingCodeElement1 = 'console.log("Hello!");',
  floatingCodeElement2 = "return success;",
  backgroundColor = "#0f172a",
  textColor = "#ffffff",
  primaryColor = "#3b82f6",
  secondaryColor = "#64748b",
  paddingY = "40",
  paddingX = "16",
  textAlign = "left",
  fontSize = "xl",
  fontWeight = "bold",
  borderRadius = "8",
  shadow = "none",
  theme = "code",
  visualDisplay = "code",
  globalTheme,
}) => {
  const [currentTypingIndex, setCurrentTypingIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Theme configurations
  const themeConfigs = {
    minimal: {
      backgroundColor: backgroundColor,
      textColor: textColor,
      primaryColor: primaryColor,
      secondaryColor: secondaryColor,
      showGrid: false,
      showFloatingElements: false,
    },
    code: {
      backgroundColor: "#0f172a",
      textColor: "#ffffff",
      primaryColor: "#3b82f6",
      secondaryColor: "#64748b",
      showGrid: true,
      showFloatingElements: true,
    },
    modern: {
      backgroundColor: "#1a1a1a",
      textColor: "#ffffff",
      primaryColor: "#8b5cf6",
      secondaryColor: "#a1a1aa",
      showGrid: true,
      showFloatingElements: true,
    },
  };

  const currentTheme = themeConfigs["minimal"];

  const memoizedTypingTexts = useMemo(() => {
    return (
      typingTexts || [
        "FRONTEND_DEVELOPER",
        "BACKEND_ARCHITECT",
        "UI/UX_DESIGNER",
        "PROBLEM_SOLVER",
        "CODE_CRAFTSMAN",
      ]
    );
  }, [typingTexts]);

  const memoizedButtons = useMemo(() => {
    return (
      buttons || [
        { label: "VIEW_WORK()", href: "#projects", isPrimary: true },
        {
          label: "DOWNLOAD_CV",
          href: "/resume.pdf",
          downloadFile: "resume.pdf",
        },
        { label: "CONTACT_ME", href: "#contact" },
      ]
    );
  }, [buttons]);

  const memoizedSocialLinks = useMemo(() => {
    return (
      socialLinks || [
        { platform: "GitHub", url: "https://github.com", username: "@janedoe" },
        {
          platform: "LinkedIn",
          url: "https://linkedin.com",
          username: "/in/janedoe",
        },
        {
          platform: "Twitter",
          url: "https://twitter.com",
          username: "@janedoe",
        },
      ]
    );
  }, [socialLinks]);

  const memoizedCodeSnippet = useMemo(() => {
    return (
      codeSnippet ||
      `const developer = {
  name: "${name}",
  passion: "Creating amazing UX",
  status: "available"
};`
    );
  }, [codeSnippet, name]);

  // Typing animation effect
  useEffect(() => {
    const targetText = memoizedTypingTexts[currentTypingIndex];
    const typingSpeed = isDeleting ? 80 : 150;
    const pauseTime = isDeleting ? 500 : 2000;

    const timer = setTimeout(() => {
      if (!isDeleting && currentText === targetText) {
        setTimeout(() => setIsDeleting(true), pauseTime);
      } else if (isDeleting && currentText === "") {
        setIsDeleting(false);
        setCurrentTypingIndex(
          (prev) => (prev + 1) % memoizedTypingTexts.length
        );
      } else {
        setCurrentText((prev) =>
          isDeleting ? prev.slice(0, -1) : targetText.slice(0, prev.length + 1)
        );
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentTypingIndex, memoizedTypingTexts]);

  const sectionStyle: React.CSSProperties = useMemo(
    () => ({
      backgroundColor: currentTheme.backgroundColor,
      color: currentTheme.textColor,
      paddingTop: `${paddingY}px`,
      paddingBottom: `${paddingY}px`,
      paddingLeft: `${paddingX}px`,
      paddingRight: `${paddingX}px`,
      borderRadius: `${borderRadius}px`,
      boxShadow: shadow !== "none" ? shadow : undefined,
      fontFamily: PortfolioFontLoader.getThemeFontStyle(globalTheme, "body")
        .fontFamily,
      position: "relative",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      overflow: "hidden",
    }),
    [currentTheme, paddingY, paddingX, borderRadius, shadow, theme]
  );

  const gridOverlayStyle: React.CSSProperties = useMemo(
    () => ({
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage: currentTheme.showGrid
        ? `
        linear-gradient(rgba(59, 130, 246, 0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(59, 130, 246, 0.03) 1px, transparent 1px)
      `
        : "none",
      backgroundSize: "60px 60px",
      pointerEvents: "none",
    }),
    [currentTheme.showGrid]
  );

  const getSocialIcon = useCallback((platform: string, color: string) => {
    const icons: Record<string, React.ReactNode> = {
      GitHub: <GithubLogo fill={color} width={20} height={20} />,
      LinkedIn: <LinkedInLogo fill={color} width={20} height={20} />,
      Twitter: <XLogo fill={color} width={20} height={20} />,
      Dribbble: <DribbbleLogo fill={color} width={20} height={20} />,
      Facebook: <MetaLogo fill={color} width={20} height={20} />,
      Instagram: <InstagramLogo fill={color} width={20} height={20} />,
      Email: <MailLogo fill={color} width={20} height={20} />,
      YouTube: <YoutubeLogo fill={color} width={20} height={20} />,
    };
    return icons[platform] || "🔗";
  }, []);

  // Render visual display based on type
  const renderVisualDisplay = () => {
    switch (visualDisplay) {
      case "profile":
        return showProfileImage && profileImage ? (
          <div className="relative flex items-center justify-center w-full">
            {showProfileImage && profileImage ? (
              <div
                className="relative w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-lg overflow-hidden border"
                style={{
                  borderColor: primaryColor,
                }}
              >
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : showCodeSnippet ? (
              <div className="relative w-full max-w-md md:max-w-lg">
                {/* Code Window */}
                <div
                  className="rounded-lg overflow-hidden shadow-md"
                  style={{
                    backgroundColor: secondaryColor,
                    border: `1px solid ${primaryColor}40`,
                  }}
                >
                  {/* Window Header */}
                  <div
                    className="flex items-center justify-between px-3 py-2 border-b"
                    style={{
                      backgroundColor: primaryColor,
                    }}
                  >
                    <div className="flex space-x-1">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                    </div>
                    <span
                      className="text-[10px] md:text-xs font-medium truncate"
                      style={{ color: getContrastColor(primaryColor) }}
                    >
                      {title}
                    </span>
                  </div>

                  {/* Code Content */}
                  <div className="p-4 overflow-x-auto text-xs md:text-sm">
                    <pre
                      style={{
                        color: getContrastColor(secondaryColor),
                        fontFamily:
                          "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
                      }}
                    >
                      <code>
                        {memoizedCodeSnippet.split("\n").map((line, index) => (
                          <div key={index} className="flex items-start">
                            <span className="opacity-50 pr-3 select-none">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            <span>{line}</span>
                          </div>
                        ))}
                      </code>
                    </pre>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-5xl md:text-7xl font-bold opacity-20">
                {"</>"}
              </div>
            )}
          </div>
        ) : null;

      case "geometric":
        return (
          <div className="relative flex items-center justify-center">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80">
              <div
                className="absolute inset-0 rounded-full border-4 animate-spin"
                style={{
                  borderColor: currentTheme.primaryColor + "20",
                  borderTopColor: currentTheme.primaryColor,
                  animationDuration: "8s",
                }}
              ></div>
              <div
                className="absolute inset-8 rounded-full border-2 animate-spin"
                style={{
                  borderColor: currentTheme.secondaryColor + "30",
                  borderRightColor: currentTheme.primaryColor,
                  animationDuration: "6s",
                  animationDirection: "reverse",
                }}
              ></div>
              <div
                className="absolute inset-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl sm:text-6xl font-black"
                style={{ color: currentTheme.primaryColor }}
              >
                {"</>"}
              </div>
            </div>
          </div>
        );

      case "minimal":
        return (
          <div className="relative flex items-center justify-center">
            <div className="text-center space-y-4">
              <div
                className="text-6xl sm:text-7xl lg:text-8xl font-black opacity-10"
                style={{ color: currentTheme.primaryColor }}
              >
                {"{}"}
              </div>
              <div
                className="text-2xl sm:text-3xl font-light opacity-20"
                style={{ color: currentTheme.secondaryColor }}
              >
                {title.toLowerCase().replace(/_/g, " ")}
              </div>
            </div>
          </div>
        );

      case "code":
        return showCodeSnippet ? (
          <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg">
            <div
              className="rounded-lg overflow-hidden shadow-2xl"
              style={{
                backgroundColor: currentTheme.secondaryColor,
                border: `1px solid ${currentTheme.primaryColor}40`,
              }}
            >
              <div
                className="flex items-center justify-between px-3 py-2 sm:px-4 sm:py-3 border-b"
                style={{
                  backgroundColor: currentTheme.primaryColor,
                  borderColor: getContrastColor(currentTheme.primaryColor),
                }}
              >
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500"></div>
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500"></div>
                </div>
                <span
                  className="text-xs font-medium hidden sm:block"
                  style={{ color: currentTheme.secondaryColor }}
                >
                  {title}
                </span>
              </div>

              <div className="p-3 sm:p-4 lg:p-6">
                <pre
                  className="text-xs leading-relaxed"
                  style={{
                    color: getContrastColor(currentTheme.secondaryColor),
                    fontFamily:
                      "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
                  }}
                >
                  <code>
                    {memoizedCodeSnippet.split("\n").map((line, index) => (
                      <div
                        key={index}
                        className="px-1 sm:px-2 py-1 rounded transition-colors duration-200 hover:bg-blue-500 hover:bg-opacity-10 cursor-pointer"
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor =
                            currentTheme.primaryColor;
                          e.currentTarget.style.color = getContrastColor(
                            currentTheme.primaryColor
                          );
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "transparent";
                          e.currentTarget.style.color = getContrastColor(
                            currentTheme.secondaryColor
                          );
                        }}
                      >
                        <span
                          className="text-xs mr-2 sm:mr-4 select-none"
                          style={{
                            color: getContrastColor(
                              currentTheme.secondaryColor
                            ),
                          }}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span>{line}</span>
                      </div>
                    ))}
                  </code>
                </pre>
              </div>
            </div>

            <div
              className="absolute -top-6 -left-6 sm:-top-8 sm:-left-8 px-2 py-1 rounded text-xs font-bold animate-float"
              style={{
                backgroundColor: currentTheme.primaryColor,
                color: getContrastColor(currentTheme.primaryColor),
              }}
            >
              {floatingCodeElement1}
            </div>
            <div
              className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 px-2 py-1 rounded text-xs font-bold animate-float"
              style={{
                backgroundColor: statusColor,
                color: getContrastColor(statusColor),
                animationDelay: "1s",
              }}
            >
              {floatingCodeElement2}
            </div>
          </div>
        ) : null;

      case "none":
      default:
        return null;
    }
  };

  // Floating elements for non-minimal themes
  const floatingElements = currentTheme.showFloatingElements ? (
    <>
      <div
        className="floating-element text-4xl sm:text-5xl lg:text-6xl hidden sm:block"
        style={{
          top: "10%",
          right: "10%",
          opacity: 0.1,
          color: currentTheme.primaryColor,
        }}
      >
        {"{ }"}
      </div>
      <div
        className="floating-element text-3xl sm:text-4xl hidden sm:block"
        style={{
          bottom: "20%",
          left: "5%",
          opacity: 0.1,
          color: currentTheme.primaryColor,
        }}
      >
        {"</>"}
      </div>
      <div
        className="floating-element text-2xl sm:text-3xl hidden lg:block"
        style={{
          top: "30%",
          left: "15%",
          opacity: 0.08,
          color: currentTheme.secondaryColor,
        }}
      >
        {"()"}
      </div>
      <div
        className="floating-element text-xl sm:text-2xl hidden lg:block"
        style={{
          bottom: "40%",
          right: "20%",
          opacity: 0.06,
          color: currentTheme.secondaryColor,
        }}
      >
        {"[]"}
      </div>
    </>
  ) : null;

  return (
    <section style={sectionStyle}>
      <div style={gridOverlayStyle}></div>

      {floatingElements}

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Main Content */}
          <div
            className={`${
              textAlign === "center"
                ? "text-center lg:text-left"
                : textAlign === "right"
                ? "text-right"
                : "text-left"
            } space-y-6 lg:space-y-8`}
          >
            {/* Status Badge */}
            {showStatus && (
              <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
                <div
                  className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full animate-pulse"
                  style={{ backgroundColor: statusColor }}
                ></div>
                <span
                  className="text-xs font-bold tracking-widest uppercase"
                  style={{ color: statusColor }}
                >
                  {statusText}
                </span>
              </div>
            )}

            {/* Greeting */}
            <div className="space-y-2">
              <p
                className="text-sm sm:text-base md:text-lg font-bold tracking-wide"
                style={{
                  color: currentTheme.primaryColor,
                  animationDelay: "0.2s",
                }}
              >
                {greeting}
              </p>
            </div>

            {/* Name */}
            <h1
              className="font-black tracking-tight leading-none"
              style={{
                fontSize: "clamp(2rem, 8vw, 4rem)",
                color: currentTheme.textColor,
                fontWeight: 900,
                lineHeight: 0.85,
                animationDelay: "0.4s",
              }}
            >
              {name}
            </h1>

            {/* Dynamic Title with Typing Effect */}
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center space-x-2 sm:space-x-4">
                <span
                  className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-black tracking-tight"
                  style={{ color: currentTheme.primaryColor }}
                >
                  {currentText}
                  <span
                    className="animate-pulse"
                    style={{ color: currentTheme.primaryColor }}
                  >
                    |
                  </span>
                </span>
              </div>

              <p
                className="text-base sm:text-lg md:text-xl font-medium leading-relaxed"
                style={{
                  color: currentTheme.secondaryColor,
                  lineHeight: 1.6,
                }}
              >
                {tagline}
              </p>
            </div>

            {/* Description */}
            <p
              className="text-sm sm:text-base leading-relaxed max-w-2xl"
              style={{
                color: currentTheme.textColor,
                lineHeight: 1.7,
                animationDelay: "0.8s",
              }}
            >
              {description}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 lg:space-x-6 pt-4 sm:pt-6">
              {memoizedButtons.map((button, index) => (
                <a
                  key={button.label}
                  href={button.href}
                  download={button.downloadFile}
                  className="group w-full sm:w-fit px-4 py-2 sm:px-6 sm:py-3 font-bold tracking-wider uppercase transition-all duration-300 hover:scale-105 border-2 relative text-center"
                  style={{
                    backgroundColor: button.isPrimary
                      ? currentTheme.primaryColor
                      : "transparent",
                    color: button.isPrimary
                      ? getContrastColor(currentTheme.primaryColor)
                      : currentTheme.primaryColor,
                    borderColor: currentTheme.primaryColor,
                    borderRadius: `${borderRadius}px`,
                    fontSize: "0.75rem",
                    textDecoration: "none",
                    animationDelay: `${1 + index * 0.1}s`,
                  }}
                >
                  <span className="relative z-10">{button.label}</span>
                  <div
                    style={{ backgroundColor: currentTheme.primaryColor }}
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                  ></div>
                </a>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-6 pt-4 sm:pt-6">
              <span
                className="text-xs font-bold tracking-widest uppercase"
                style={{ color: currentTheme.secondaryColor }}
              >
                CONNECT:
              </span>
              <div className="flex items-center space-x-4 sm:space-x-6">
                {memoizedSocialLinks.map((social, index) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center space-x-2 transition-all duration-300 hover:scale-110"
                    style={{
                      color: currentTheme.secondaryColor,
                      textDecoration: "none",
                      animationDelay: `${1.4 + index * 0.1}s`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = currentTheme.primaryColor;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = currentTheme.secondaryColor;
                    }}
                  >
                    <span
                      className="text-base sm:text-lg"
                      style={{ color: currentTheme.primaryColor }}
                    >
                      {getSocialIcon(
                        social.platform,
                        currentTheme.primaryColor
                      )}
                    </span>
                    <span className="text-xs font-medium hidden md:block">
                      {social.username}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Visual Element */}
          <div className="relative flex items-center justify-center mt-8 lg:mt-0">
            {renderVisualDisplay()}
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .floating-element {
          position: absolute;
          pointer-events: none;
          animation: float 6s ease-in-out infinite;
        }

        .floating-element:nth-child(1) {
          animation-delay: 0s;
        }

        .floating-element:nth-child(2) {
          animation-delay: 2s;
        }

        .floating-element:nth-child(3) {
          animation-delay: 4s;
        }

        .floating-element:nth-child(4) {
          animation-delay: 1s;
        }

        @media (max-width: 640px) {
          .floating-element {
            display: none;
          }
        }
      `}</style>
    </section>
  );
};

export default TypographyHero;
