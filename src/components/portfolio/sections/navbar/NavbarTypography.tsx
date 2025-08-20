import React, { useState, useEffect } from "react";
import { usePortfolioNavigation } from "@/hooks/usePortfolioNavigation";

interface NavItem {
  label: string;
  href: string;
  isActive?: boolean;
}

interface ComponentProps {
  // Content Props
  logo?: string;
  logoText?: string;
  navItems?: NavItem[];
  sections?: any[]; // Add sections prop for dynamic navigation
  showCTA?: boolean;
  ctaText?: string;
  ctaHref?: string;
  showStatus?: boolean;
  statusText?: string;
  statusColor?: string;

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

const TypographyNavbar: React.FC<ComponentProps> = ({
  logo,
  logoText = "DEV.PORTFOLIO",
  navItems: propNavItems,
  sections,
  showCTA = true,
  ctaText = "HIRE_ME()",
  ctaHref = "#contact",
  showStatus = true,
  statusText = "AVAILABLE",
  statusColor = "#10b981",
  backgroundColor = "#ffffff",
  textColor = "#111827",
  primaryColor = "#3b82f6",
  secondaryColor = "#64748b",
  paddingY = "16",
  paddingX = "16",
  textAlign = "left",
  fontSize = "sm",
  fontWeight = "bold",
  borderRadius = "0",
  shadow = "0 1px 3px 0 rgb(0 0 0 / 0.1)",
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { activeSection, scrollToSection, scrollToTop } =
    usePortfolioNavigation();

  const filteredSections =
    sections &&
    sections.filter(
      (section) => section.type !== "navbar" && section.type !== "footer"
    );

  const navItems =
    propNavItems ||
    (filteredSections
      ? filteredSections.map((section, index) => ({
          label: section.type?.toUpperCase() || `SECTION ${index + 1}`,
          href: `#${section.type}`,
          isActive: index === 0,
        }))
      : [
          { label: "HOME", href: "#hero", isActive: true },
          { label: "ABOUT", href: "#about", isActive: false },
          { label: "SKILLS", href: "#skills", isActive: false },
          { label: "PROJECTS", href: "#portfolioItems", isActive: false },
          { label: "EXPERIENCE", href: "#experience", isActive: false },
          { label: "CONTACT", href: "#contact", isActive: false },
        ]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string, e: React.MouseEvent) => {
    e.preventDefault();
    const sectionId = href.replace("#", "");

    if (sectionId === "hero" || sectionId === "home") {
      scrollToTop();
    } else {
      scrollToSection(sectionId);
    }

    // Close mobile menu if open
    setIsMobileMenuOpen(false);
  };

  const handleCTAClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const sectionId = ctaHref.replace("#", "");
    scrollToSection(sectionId);
    setIsMobileMenuOpen(false);
  };

  const navbarStyle: React.CSSProperties = {
    backgroundColor: isScrolled ? `${backgroundColor}f5` : backgroundColor,
    color: textColor,
    paddingTop: `${paddingY}px`,
    paddingBottom: `${paddingY}px`,
    paddingLeft: `${paddingX}px`,
    paddingRight: `${paddingX}px`,
    borderRadius: `${borderRadius}px`,
    boxShadow: isScrolled ? shadow : "none",
    fontFamily: "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
    position: "sticky",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    backdropFilter: isScrolled ? "blur(10px)" : "none",
    transition: "all 0.3s ease",
    borderBottom: isScrolled ? `1px solid ${primaryColor}20` : "none",
  };

  const logoStyle: React.CSSProperties = {
    fontSize: "1.5rem",
    fontWeight: 900,
    color: textColor,
    textDecoration: "none",
    letterSpacing: "-0.025em",
    transition: "all 0.3s ease",
  };

  return (
    <nav style={navbarStyle}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center space-x-4">
          <a
            href="#home"
            style={logoStyle}
            className="hover:scale-105 transition-transform"
          >
            {logo ? (
              <img src={logo} alt="Logo" className="h-8 w-auto" />
            ) : (
              <span className="relative">
                {logoText}
                <div
                  className="absolute -bottom-1 left-0 h-0.5 w-0 transition-all duration-300 hover:w-full"
                  style={{ backgroundColor: primaryColor }}
                ></div>
              </span>
            )}
          </a>

          {showStatus && (
            <div className="hidden md:flex items-center space-x-2">
              <div
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: statusColor }}
              ></div>
              <span
                className="text-xs font-bold tracking-widest"
                style={{ color: statusColor }}
              >
                {statusText}
              </span>
            </div>
          )}
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item, index) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(item.href, e)}
              className="relative group transition-all duration-300 hover:scale-105"
              style={{
                color:
                  activeSection === item.href.replace("#", "")
                    ? primaryColor
                    : secondaryColor,
                fontSize: "0.875rem",
                fontWeight: 700,
                textDecoration: "none",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {item.label}
              <div
                className="absolute bottom-0 left-0 h-0.5 transition-all duration-300"
                style={{
                  backgroundColor: primaryColor,
                  width:
                    activeSection === item.href.replace("#", "")
                      ? "100%"
                      : "0%",
                }}
              ></div>
            </a>
          ))}
        </div>

        {/* CTA Button & Mobile Menu */}
        <div className="flex items-center space-x-4">
          {showCTA && (
            <a
              href={ctaHref}
              className="hidden md:block px-6 py-2 font-bold tracking-wider uppercase transition-all duration-300 hover:scale-105 border-2"
              style={{
                backgroundColor: primaryColor,
                color: "#ffffff",
                borderColor: primaryColor,
                borderRadius: `${borderRadius}px`,
                fontSize: "0.875rem",
                textDecoration: "none",
              }}
              onClick={handleCTAClick}
            >
              {ctaText}
            </a>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex flex-col space-y-1 p-2"
            style={{ color: textColor }}
          >
            <div
              className={`w-6 h-0.5 transition-all duration-300 ${
                isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
              style={{ backgroundColor: textColor }}
            ></div>
            <div
              className={`w-6 h-0.5 transition-all duration-300 ${
                isMobileMenuOpen ? "opacity-0" : ""
              }`}
              style={{ backgroundColor: textColor }}
            ></div>
            <div
              className={`w-6 h-0.5 transition-all duration-300 ${
                isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
              style={{ backgroundColor: textColor }}
            ></div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{
          backgroundColor: `${backgroundColor}f8`,
          backdropFilter: "blur(10px)",
          borderTop: `1px solid ${primaryColor}20`,
          marginTop: "16px",
        }}
      >
        <div className="px-4 py-6 space-y-4">
          {showStatus && (
            <div
              className="flex items-center space-x-2 pb-4 border-b"
              style={{ borderColor: `${primaryColor}20` }}
            >
              <div
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: statusColor }}
              ></div>
              <span
                className="text-xs font-bold tracking-widest"
                style={{ color: statusColor }}
              >
                {statusText}
              </span>
            </div>
          )}

          {navItems.map((item, index) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(item.href, e)}
              className="block py-2 font-bold tracking-wider uppercase transition-all duration-300"
              style={{
                color:
                  activeSection === item.href.replace("#", "")
                    ? primaryColor
                    : secondaryColor,
                fontSize: "0.875rem",
                textDecoration: "none",
                animationDelay: `${index * 0.1}s`,
                borderLeft:
                  activeSection === item.href.replace("#", "")
                    ? `3px solid ${primaryColor}`
                    : "none",
                paddingLeft:
                  activeSection === item.href.replace("#", "") ? "12px" : "0px",
              }}
            >
              {item.label}
            </a>
          ))}

          {showCTA && (
            <a
              href={ctaHref}
              className="block w-full text-center px-6 py-3 font-bold tracking-wider uppercase transition-all duration-300 border-2 mt-6"
              style={{
                backgroundColor: primaryColor,
                color: "#ffffff",
                borderColor: primaryColor,
                borderRadius: `${borderRadius}px`,
                fontSize: "0.875rem",
                textDecoration: "none",
              }}
              onClick={handleCTAClick}
            >
              {ctaText}
            </a>
          )}
        </div>
      </div>
    </nav>
  );
};

export default TypographyNavbar;
