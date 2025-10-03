import React, { useState, useEffect } from "react";

// Menu icon for mobile
const MenuIcon = ({ width = 24, height = 24, fill = "currentColor" }) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill={fill}>
    <path d="M3 12h18M3 6h18M3 18h18" stroke={fill} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);

// Close icon for mobile
const CloseIcon = ({ width = 24, height = 24, fill = "currentColor" }) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill={fill}>
    <path d="M18 6L6 18M6 6l12 12" stroke={fill} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);

interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

interface MinimalNavbarProps {
  logoText?: string;
  logoHref?: string;
  navItems?: NavItem[];
  ctaText?: string;
  ctaHref?: string;
  showCTA?: boolean;
  backgroundColor?: string;
  textColor?: string;
  primaryColor?: string;
  secondaryColor?: string;
  borderColor?: string;
  paddingY?: string;
  paddingX?: string;
  fontSize?: string;
  fontWeight?: string;
  fontFamily?: string;
  isFixed?: boolean;
  showBorder?: boolean;
}

const MinimalNavbar: React.FC<MinimalNavbarProps> = ({
  logoText = "<TP />",
  logoHref = "#",
  navItems = [
    { label: "About", href: "#about" },
    { label: "Work", href: "#work" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
  ],
  ctaText = "Download CV",
  ctaHref = "/resume.pdf",
  showCTA = true,
  backgroundColor = "#ffffff",
  textColor = "#1f2937",
  primaryColor = "#3b82f6",
  secondaryColor = "#6b7280",
  borderColor = "#e5e7eb",
  paddingY = "16",
  paddingX = "24",
  fontSize = "base",
  fontWeight = "medium",
  fontFamily = "Inter, system-ui, sans-serif",
  isFixed = true,
  showBorder = true,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    if (isFixed) {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [isFixed]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navbarStyle = {
    backgroundColor: isScrolled ? `${backgroundColor}f8` : backgroundColor,
    color: textColor,
    paddingTop: `${paddingY}px`,
    paddingBottom: `${paddingY}px`,
    paddingLeft: `${paddingX}px`,
    paddingRight: `${paddingX}px`,
    fontFamily,
    fontSize: fontSize === "base" ? "16px" : fontSize,
    fontWeight,
    borderBottom: showBorder ? `1px solid ${borderColor}` : "none",
    backdropFilter: isScrolled ? "blur(10px)" : "none",
    transition: "all 0.3s ease",
  };

  const ctaStyle = {
    backgroundColor: primaryColor,
    color: "#ffffff",
    padding: "8px 16px",
    borderRadius: "6px",
    textDecoration: "none",
    transition: "all 0.2s ease",
    fontSize: "14px",
    fontWeight: "500",
  };

  return (
    <nav 
      className={`w-full z-50 ${isFixed ? "fixed top-0" : "relative"}`}
      style={navbarStyle}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a
              href={logoHref}
              className="text-xl font-bold hover:opacity-80 transition-opacity"
              style={{ color: textColor }}
            >
              {logoText}
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                target={item.isExternal ? "_blank" : undefined}
                rel={item.isExternal ? "noopener noreferrer" : undefined}
                className="hover:opacity-70 transition-opacity"
                style={{ color: secondaryColor }}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center">
            {showCTA && (
              <a
                href={ctaHref}
                style={ctaStyle}
                className="hover:opacity-90 transition-opacity"
                target={ctaHref.startsWith("http") ? "_blank" : undefined}
                rel={ctaHref.startsWith("http") ? "noopener noreferrer" : undefined}
              >
                {ctaText}
              </a>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-md hover:bg-gray-100 transition-colors"
              style={{ color: textColor }}
            >
              {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t" style={{ borderColor }}>
            <div className="flex flex-col space-y-4 pt-4">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  target={item.isExternal ? "_blank" : undefined}
                  rel={item.isExternal ? "noopener noreferrer" : undefined}
                  className="hover:opacity-70 transition-opacity"
                  style={{ color: secondaryColor }}
                  onClick={closeMobileMenu}
                >
                  {item.label}
                </a>
              ))}
              
              {showCTA && (
                <div className="pt-2">
                  <a
                    href={ctaHref}
                    style={ctaStyle}
                    className="inline-block hover:opacity-90 transition-opacity"
                    target={ctaHref.startsWith("http") ? "_blank" : undefined}
                    rel={ctaHref.startsWith("http") ? "noopener noreferrer" : undefined}
                    onClick={closeMobileMenu}
                  >
                    {ctaText}
                  </a>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default MinimalNavbar;
