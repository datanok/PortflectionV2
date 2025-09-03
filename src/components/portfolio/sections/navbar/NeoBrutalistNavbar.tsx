"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePortfolioNavigation } from "@/hooks/usePortfolioNavigation";
import { Menu, X, Zap, Code2 } from "lucide-react";

interface NavItem {
  label: string;
  href: string;
}

interface ComponentProps {
  logoText?: string;
  navItems?: NavItem[];
  sections?:any[];
  showCTA?: boolean;
  ctaText?: string;
  ctaHref?: string;
  showStatus?: boolean;
  statusText?: string;
  statusColor?: string;
  backgroundColor?: string;
  textColor?: string;
  primaryColor?: string;
  secondaryColor?: string;
  borderColor?: string;
  paddingY?: string;
  paddingX?: string;
  borderRadius?: string;
  shadow?: string;
  doubleText?: boolean;
  showMobileMenu?: boolean;
  logoIcon?: boolean;
}

const NeoBrutalistNavbar: React.FC<ComponentProps> = ({
  logoText = "DEV.PORTFOLIO",
  navItems: propNavItems,
  sections,
  showCTA = true,
  ctaText = "HIRE_ME()",
  ctaHref = "#contact",
  showStatus = true,
  statusText = "AVAILABLE",
  statusColor = "#00ff87",
  backgroundColor = "#ffffff",
  textColor = "#000000",
  primaryColor = "#ff6b35",
  secondaryColor = "#64748b",
  borderColor = "#000000",
  paddingY = "16",
  paddingX = "20",
  borderRadius = "0",
  shadow = "4px 4px 0px #000000",
  doubleText = true,
  showMobileMenu = true,
  logoIcon = true,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const { activeSection, scrollToSection, scrollToTop } = usePortfolioNavigation();

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const handleNavClick = (href: string) => {
    scrollToSection(href.replace("#", ""));
    setIsMenuOpen(false);
  };

  const navbarStyles = {
    backgroundColor,
    color: textColor,
    borderBottom: `4px solid ${borderColor}`,
    boxShadow: isScrolled ? shadow : `2px 2px 0px ${borderColor}`,
    padding: `${paddingY}px ${paddingX}px`,
    borderRadius: `${borderRadius}px`,
    transform: isScrolled ? 'translateY(-2px)' : 'translateY(0)',
  };

  const buttonBaseStyles = {
    border: `3px solid ${borderColor}`,
    borderRadius: `${borderRadius}px`,
    fontFamily: 'monospace',
    fontWeight: 'bold',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.1em',
    transition: 'all 0.15s ease',
  };

  const ctaStyles = {
    ...buttonBaseStyles,
    backgroundColor: primaryColor,
    color: backgroundColor,
    boxShadow: shadow,
  };

  const statusStyles = {
    backgroundColor: statusColor,
    color: backgroundColor,
    border: `2px solid ${borderColor}`,
    borderRadius: `${borderRadius}px`,
    fontFamily: 'monospace',
    fontWeight: 'bold',
    fontSize: '0.75rem',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.1em',
  };

  return (
    <>
      {/* Main Navbar */}
      <nav 
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled && "backdrop-blur-sm"
        )}
        style={navbarStyles}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo Section */}
          <button
            onClick={scrollToTop}
            className="flex items-center space-x-3 group"
          >
            {logoIcon && (
              <div 
                className="p-2 transition-transform duration-200 group-hover:scale-110 group-hover:-rotate-3"
                style={{
                  backgroundColor: primaryColor,
                  border: `2px solid ${borderColor}`,
                  borderRadius: `${borderRadius}px`,
                  boxShadow: `2px 2px 0px ${borderColor}`,
                }}
              >
                <Code2 size={20} color={backgroundColor} />
              </div>
            )}
            <div className="relative">
              <span 
                className="font-black text-xl tracking-tight font-mono relative z-10"
                style={{ color: textColor }}
              >
                {logoText}
              </span>
              {doubleText && (
                <span
                  className="absolute left-1 top-1 font-black text-xl tracking-tight font-mono opacity-30"
                  style={{ color: primaryColor }}
                >
                  {logoText}
                </span>
              )}
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item, index) => {
              const isActive = activeSection === item.href.replace('#', '');
              const isHovered = hoveredItem === item.label;
              
              return (
                <button
                  key={index}
                  onClick={() => handleNavClick(item.href)}
                  onMouseEnter={() => setHoveredItem(item.label)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={cn(
                    "relative px-4 py-2 font-bold font-mono text-sm uppercase tracking-wider transition-all duration-200",
                    isActive && "z-10"
                  )}
                  style={{
                    backgroundColor: isActive ? primaryColor : (isHovered ? backgroundColor : 'transparent'),
                    color: isActive ? backgroundColor : textColor,
                    border: `2px solid ${isActive || isHovered ? borderColor : 'transparent'}`,
                    borderRadius: `${borderRadius}px`,
                    boxShadow: isActive ? shadow : (isHovered ? `2px 2px 0px ${borderColor}` : 'none'),
                    transform: isHovered && !isActive ? 'translate(-1px, -1px)' : 'translate(0, 0)',
                  }}
                >
                  <span className="relative z-10">{item.label}</span>
                  {doubleText && (isActive || isHovered) && (
                    <span
                      className="absolute left-[17px] top-[9px] opacity-20 font-bold font-mono text-sm uppercase tracking-wider"
                      style={{ 
                        color: isActive ? backgroundColor : primaryColor,
                      }}
                    >
                      {item.label}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Status & CTA Section */}
          <div className="hidden md:flex items-center space-x-4">
            {showStatus && (
              <div 
                className="flex items-center space-x-2 px-3 py-1"
                style={statusStyles}
              >
                <div 
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: backgroundColor }}
                />
                <span>{statusText}</span>
              </div>
            )}
            
            {showCTA && (
              <button
                onClick={() => handleNavClick(ctaHref)}
                className="px-6 py-3 font-mono font-bold text-sm uppercase tracking-wider transition-all duration-200 hover:transform hover:-translate-y-1 hover:-translate-x-1 active:translate-x-0 active:translate-y-0"
                style={ctaStyles}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `6px 6px 0px ${borderColor}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = shadow;
                }}
              >
                <span className="relative z-10">{ctaText}</span>
                {doubleText && (
                  <span
                    className="absolute left-[25px] top-[13px] opacity-20 font-mono font-bold text-sm uppercase tracking-wider"
                    style={{ color: backgroundColor }}
                  >
                    {ctaText}
                  </span>
                )}
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          {showMobileMenu && (
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-3 transition-all duration-200 group"
              style={{
                backgroundColor: isMenuOpen ? primaryColor : 'transparent',
                color: isMenuOpen ? backgroundColor : textColor,
                border: `3px solid ${borderColor}`,
                borderRadius: `${borderRadius}px`,
                boxShadow: isMenuOpen ? `3px 3px 0px ${borderColor}` : 'none',
                transform: isMenuOpen ? 'translate(-1px, -1px)' : 'translate(0, 0)',
              }}
            >
              <div className="relative">
                {isMenuOpen ? (
                  <X size={24} className="transform rotate-0 transition-transform duration-200" />
                ) : (
                  <Menu size={24} className="group-hover:scale-110 transition-transform duration-200" />
                )}
              </div>
            </button>
          )}
        </div>
      </nav>

      {/* Mobile Menu Panel */}
      {showMobileMenu && (
        <div 
          className={cn(
            "fixed inset-0 z-40 md:hidden transition-all duration-300 flex flex-col",
            isMenuOpen ? 'opacity-100 visible translate-x-0' : 'opacity-0 invisible translate-x-full'
          )}
          style={{
            backgroundColor,
            border: `4px solid ${borderColor}`,
            marginTop: `${parseInt(paddingY) * 2 + 60}px`,
            boxShadow: shadow,
          }}
        >
          {/* Mobile Nav Items */}
          <div className="flex-1 flex flex-col justify-center items-center space-y-4 p-8">
            {navItems.map((item, index) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <button
                  key={index}
                  onClick={() => handleNavClick(item.href)}
                  className="w-full max-w-xs py-4 font-bold font-mono text-xl uppercase tracking-wider transition-all duration-200 relative group"
                  style={{
                    backgroundColor: isActive ? primaryColor : 'transparent',
                    color: isActive ? backgroundColor : textColor,
                    border: `3px solid ${borderColor}`,
                    borderRadius: `${borderRadius}px`,
                    boxShadow: `4px 4px 0px ${borderColor}`,
                  }}
                >
                  <span className="relative z-10">{item.label}</span>
                  {doubleText && (
                    <span
                      className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 translate-x-1 translate-y-1 opacity-20 font-bold font-mono text-xl uppercase tracking-wider"
                      style={{ 
                        color: isActive ? backgroundColor : primaryColor,
                      }}
                    >
                      {item.label}
                    </span>
                  )}
                </button>
              );
            })}

            {/* Mobile Status & CTA */}
            <div className="flex flex-col items-center space-y-4 mt-8">
              {showStatus && (
                <div 
                  className="flex items-center space-x-3 px-4 py-2"
                  style={statusStyles}
                >
                  <Zap size={16} color={backgroundColor} />
                  <span>{statusText}</span>
                </div>
              )}
              
              {showCTA && (
                <button
                  onClick={() => handleNavClick(ctaHref)}
                  className="px-8 py-4 font-bold font-mono text-lg uppercase tracking-wider transition-all duration-200 relative"
                  style={ctaStyles}
                >
                  <span className="relative z-10">{ctaText}</span>
                  {doubleText && (
                    <span
                      className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 translate-x-1 translate-y-1 opacity-20 font-bold font-mono text-lg uppercase tracking-wider"
                      style={{ color: backgroundColor }}
                    >
                      {ctaText}
                    </span>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Mobile Menu Footer */}
          <div 
            className="p-6 border-t-4 text-center"
            style={{ borderColor: borderColor }}
          >
            <p className="font-mono text-sm uppercase tracking-wider opacity-60" style={{ color: textColor }}>
              BRUTALIST_UI.EXE
            </p>
          </div>
        </div>
      )}

      {/* Background Overlay for Mobile Menu */}
      {showMobileMenu && isMenuOpen && (
        <div 
          className="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

  
    </>
  );
};

export default NeoBrutalistNavbar;