import React, { useState, useEffect, useCallback, useMemo } from "react";

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
  showScrollIndicator?: boolean;
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

  // Global Theme
  globalTheme?: any;
}
function getContrastColor(hex: string) {
  // Expand shorthand hex (#abc -> #aabbcc)
  if (hex.length === 4) {
    hex = "#" + [...hex.slice(1)].map((c) => c + c).join("");
  }

  // Convert hex to RGB
  const r = parseInt(hex.substr(1, 2), 16);
  const g = parseInt(hex.substr(3, 2), 16);
  const b = parseInt(hex.substr(5, 2), 16);

  // Calculate brightness (perceived luminance)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  // Return black for light backgrounds, white for dark
  return brightness > 128 ? "#000000" : "#FFFFFF";
}
const TypographyHero: React.FC<ComponentProps> = ({
  greeting = "HELLO_WORLD();",
  name = "JANE_DOE",
  title = "FULL_STACK_DEVELOPER",
  tagline = "Building digital experiences with clean code & creative solutions",
  description = "Passionate developer specializing in modern web technologies, user experience design, and scalable applications. Currently crafting the next generation of digital products.",
  typingTexts = [
    "FRONTEND_DEVELOPER",
    "BACKEND_ARCHITECT",
    "UI/UX_DESIGNER",
    "PROBLEM_SOLVER",
    "CODE_CRAFTSMAN",
  ],
  buttons = [
    { label: "VIEW_WORK()", href: "#projects", isPrimary: true },
    { label: "DOWNLOAD_CV", href: "/resume.pdf", downloadFile: "resume.pdf" },
    { label: "CONTACT_ME", href: "#contact" },
  ],
  socialLinks = [
    { platform: "GitHub", url: "https://github.com", username: "@janedoe" },
    {
      platform: "LinkedIn",
      url: "https://linkedin.com",
      username: "/in/janedoe",
    },
    { platform: "Twitter", url: "https://twitter.com", username: "@janedoe" },
  ],
  showStatus = true,
  statusText = "AVAILABLE_FOR_HIRE",
  statusColor = "#10b981",
  showScrollIndicator = true,
  profileImage = "",
  showProfileImage = false,
  showCodeSnippet = true,
  codeSnippet = `const developer = {
  name: ${name},
  passion: "Creating amazing UX",
  status: "available"
};`,
  floatingCodeElement1 = 'console.log("Hello!");',
  floatingCodeElement2 = "return success;",
  backgroundColor = "#0f172a",
  textColor = "#000",
  primaryColor = "#3b82f6",
  secondaryColor = "#64748b",
  paddingY = "80",
  paddingX = "16",
  textAlign = "left",
  fontSize = "xl",
  fontWeight = "bold",
  borderRadius = "0",
  shadow = "none",
}) => {
  const [currentTypingIndex, setCurrentTypingIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Throttled mouse movement handler
  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  }, []);

  // Typing animation effect - optimized with longer intervals
  useEffect(() => {
    const targetText = typingTexts[currentTypingIndex];
    const typingSpeed = isDeleting ? 80 : 150; // Increased from 50/100 to 80/150ms
    const pauseTime = isDeleting ? 500 : 2000;

    const timer = setTimeout(() => {
      if (!isDeleting && currentText === targetText) {
        setTimeout(() => setIsDeleting(true), pauseTime);
      } else if (isDeleting && currentText === "") {
        setIsDeleting(false);
        setCurrentTypingIndex((prev) => (prev + 1) % typingTexts.length);
      } else {
        setCurrentText((prev) =>
          isDeleting ? prev.slice(0, -1) : targetText.slice(0, prev.length + 1)
        );
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentTypingIndex, typingTexts]);

  // Mouse tracking for interactive effects - throttled
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const throttledMouseMove = (e: MouseEvent) => {
      if (timeoutId) return; // Skip if already scheduled

      timeoutId = setTimeout(() => {
        handleMouseMove(e);
        timeoutId = null as any;
      }, 16); // ~60fps throttling
    };

    window.addEventListener("mousemove", throttledMouseMove);
    return () => {
      window.removeEventListener("mousemove", throttledMouseMove);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [handleMouseMove]);

  // Memoize expensive calculations
  const sectionStyle: React.CSSProperties = useMemo(
    () => ({
      backgroundColor,
      color: textColor,
      paddingTop: `${paddingY}px`,
      paddingBottom: `${paddingY}px`,
      paddingLeft: `${paddingX}px`,
      paddingRight: `${paddingX}px`,
      borderRadius: `${borderRadius}px`,
      boxShadow: shadow !== "none" ? shadow : undefined,
      fontFamily: "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
      position: "relative",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      overflow: "hidden",
    }),
    [backgroundColor, textColor, paddingY, paddingX, borderRadius, shadow]
  );

  const gridOverlayStyle: React.CSSProperties = useMemo(
    () => ({
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage: `
      linear-gradient(rgba(59, 130, 246, 0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(59, 130, 246, 0.03) 1px, transparent 1px)
    `,
      backgroundSize: "60px 60px",
      pointerEvents: "none",
    }),
    []
  );

  const floatingElementStyle: React.CSSProperties = useMemo(
    () => ({
      position: "absolute",
      transform: `translate(${mousePosition.x * 0.02}px, ${
        mousePosition.y * 0.02
      }px)`,
      transition: "transform 0.2s ease-out",
    }),
    [mousePosition.x, mousePosition.y]
  );

  const getSocialIcon = useCallback((platform: string) => {
    const icons: Record<string, string> = {
      GitHub: "⚡",
      LinkedIn: "💼",
      Twitter: "🐦",
      Dribbble: "🎨",
      Instagram: "📷",
    };
    return icons[platform] || "🔗";
  }, []);

  // Memoize static floating elements
  const floatingElements = useMemo(
    () => (
      <>
        <div
          style={{
            ...floatingElementStyle,
            top: "10%",
            right: "10%",
            opacity: 0.1,
          }}
          className="text-6xl"
        >
          {"{ }"}
        </div>
        <div
          style={{
            ...floatingElementStyle,
            bottom: "20%",
            left: "5%",
            opacity: 0.1,
          }}
          className="text-4xl"
        >
          {"</>"}
        </div>
      </>
    ),
    [floatingElementStyle]
  );

  return (
    <section style={sectionStyle}>
      <div style={gridOverlayStyle}></div>

      {/* Floating Elements */}
      {floatingElements}

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Main Content */}
          <div
            className={`${
              textAlign === "center"
                ? "text-center lg:text-left"
                : textAlign === "right"
                ? "text-right"
                : "text-left"
            } space-y-8`}
          >
            {/* Status Badge */}
            {showStatus && (
              <div className="flex items-center space-x-3 mb-6">
                <div
                  className="w-2.5 h-2.5 rounded-full animate-pulse"
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
                className="text-base md:text-lg font-bold tracking-wide"
                style={{
                  color: primaryColor,
                  animationDelay: "0.2s",
                }}
              >
                {greeting}
              </p>
            </div>

            <h1
              className="font-black tracking-tight leading-none"
              style={{
                fontSize: "clamp(2.5rem, 10vw, 6rem)",
                color: textColor,
                fontWeight: 900,
                lineHeight: 0.85,
                animationDelay: "0.4s",
              }}
            >
              {name}
            </h1>

            {/* Dynamic Title with Typing Effect */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span
                  className="text-xl md:text-3xl font-black tracking-tight"
                  style={{ color: primaryColor }}
                >
                  {currentText}
                  <span
                    className="animate-pulse"
                    style={{ color: primaryColor }}
                  >
                    |
                  </span>
                </span>
              </div>

              <p
                className="text-lg md:text-xl font-medium leading-relaxed"
                style={{
                  color: secondaryColor,
                  lineHeight: 1.6,
                }}
              >
                {tagline}
              </p>
            </div>

            {/* Description */}
            <p
              className="text-base leading-relaxed max-w-2xl"
              style={{
                color: textColor,
                lineHeight: 1.7,
                animationDelay: "0.8s",
              }}
            >
              {description}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              {buttons.map((button, index) => (
                <a
                  key={button.label}
                  href={button.href}
                  download={button.downloadFile}
                  className="group px-6 py-3 font-bold tracking-wider uppercase transition-all duration-300 hover:scale-105 border-2 relative overflow-hidden"
                  style={{
                    backgroundColor: button.isPrimary
                      ? primaryColor
                      : "transparent",
                    color: button.isPrimary
                      ? getContrastColor(primaryColor)
                      : primaryColor,
                    borderColor: primaryColor,
                    borderRadius: `${borderRadius}px`,
                    fontSize: "0.75rem",
                    textDecoration: "none",
                    animationDelay: `${1 + index * 0.1}s`,
                  }}
                >
                  <span className="relative z-10">{button.label}</span>
                  <div
                    style={{ backgroundColor: primaryColor }}
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                  ></div>
                </a>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-6 pt-6">
              <span
                className="text-xs font-bold tracking-widest uppercase"
                style={{ color: secondaryColor }}
              >
                CONNECT:
              </span>
              {socialLinks.map((social, index) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center space-x-2 transition-all duration-300 hover:scale-110"
                  style={{
                    color: secondaryColor,
                    textDecoration: "none",
                    animationDelay: `${1.4 + index * 0.1}s`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = primaryColor;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = secondaryColor;
                  }}
                >
                  <span className="text-lg">
                    {getSocialIcon(social.platform)}
                  </span>
                  <span className="text-xs font-medium hidden sm:block">
                    {social.username}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Right Column - Visual Element */}
          <div className="relative flex items-center justify-center">
            {showProfileImage && profileImage ? (
              <div className="relative">
                <div
                  className="w-80 h-80 rounded-full overflow-hidden border-4 shadow-2xl"
                  style={{ borderColor: primaryColor }}
                >
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div
                  className="absolute -top-4 -right-4 w-8 h-8 rounded-full animate-bounce"
                  style={{ backgroundColor: statusColor }}
                ></div>
              </div>
            ) : showCodeSnippet ? (
              <div className="relative w-full max-w-lg">
                {/* Code Window */}
                <div
                  className="rounded-lg overflow-hidden shadow-2xl"
                  style={{
                    backgroundColor: secondaryColor,
                    border: `1px solid ${primaryColor}40`,
                  }}
                >
                  {/* Window Header */}
                  <div
                    className="flex items-center justify-between px-4 py-3 border-b"
                    style={{
                      backgroundColor: primaryColor,
                      borderColor: getContrastColor(primaryColor),
                    }}
                  >
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <span
                      className="text-xs font-medium"
                      style={{ color: secondaryColor }}
                    >
                      {title}
                    </span>
                  </div>

                  {/* Code Content */}
                  <div className="p-6">
                    <pre
                      className="text-xs leading-relaxed"
                      style={{
                        color: getContrastColor(secondaryColor),
                        fontFamily:
                          "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
                      }}
                    >
                      <code>
                        {codeSnippet.split("\n").map((line, index) => (
                          <div
                            key={index}
                            className="px-2 py-1 rounded transition-colors duration-200 hover:bg-blue-500 hover:bg-opacity-10 cursor-pointer hover:text-white"
                            style={{
                              animationDelay: `${index * 0.1}s`,
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor =
                                primaryColor;
                              e.currentTarget.style.color =
                                getContrastColor(primaryColor);
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor =
                                "transparent";
                              e.currentTarget.style.color =
                                getContrastColor(secondaryColor);
                            }}
                          >
                            <span
                              className="text-xs mr-4 select-none"
                              style={{
                                color: getContrastColor(secondaryColor),
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

                {/* Floating Code Elements */}
                <div
                  className="absolute -top-8 -left-8 px-2 py-1 rounded text-xs font-bold animate-float"
                  style={{
                    backgroundColor: primaryColor,
                    color: getContrastColor(primaryColor),
                  }}
                >
                  {floatingCodeElement1}
                </div>
                <div
                  className="absolute -bottom-6 -right-6 px-2 py-1 rounded text-xs font-bold animate-float"
                  style={{
                    backgroundColor: statusColor,
                    color: getContrastColor(statusColor),
                    animationDelay: "1s",
                  }}
                >
                  {floatingCodeElement2}
                </div>
              </div>
            ) : (
              <div className="text-center">
                <div
                  className="text-6xl md:text-7xl font-black opacity-20 animate-pulse"
                  style={{ color: primaryColor }}
                >
                  {"</>"}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Scroll Indicator */}
        {showScrollIndicator && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-2 animate-bounce">
            <span
              className="text-xs font-bold tracking-widest uppercase"
              style={{ color: secondaryColor }}
            >
              SCROLL
            </span>
            <div
              className="w-6 h-10 border-2 rounded-full flex justify-center"
              style={{ borderColor: primaryColor }}
            >
              <div
                className="w-1 h-3 rounded-full mt-2 animate-pulse"
                style={{ backgroundColor: primaryColor }}
              ></div>
            </div>
          </div>
        )}
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
      `}</style>
    </section>
  );
};

export default TypographyHero;
