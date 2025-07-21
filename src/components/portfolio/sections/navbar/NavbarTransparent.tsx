"use client";

import Link from "next/link";
import { Menu, X, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import {
  generateNavigationLinks,
  type PortfolioSection,
  type NavigationLink,
} from "./utils";

interface NavbarTransparentProps {
  logo?: string;
  brandName?: string;
  menuItems?: Array<{ label: string; href: string }>;
  sections?: PortfolioSection[];
  textColor?: string;
  primaryColor?: string;
  sticky?: boolean;
  showBackgroundOnScroll?: boolean;
}

export default function NavbarTransparent({
  logo = "/assets/logo.png",
  brandName = "Portfolio",
  menuItems,
  sections,
  textColor = "#ffffff",
  primaryColor = "#3b82f6",
  sticky = true,
  showBackgroundOnScroll = true,
}: NavbarTransparentProps) {
  // Always use dynamic links if sections prop is provided
  const navigationLinks: NavigationLink[] = sections
    ? generateNavigationLinks(sections)
    : menuItems || [
        { label: "Home", href: "#home" },
        { label: "About", href: "#about" },
        { label: "Projects", href: "#projects" },
        { label: "Contact", href: "#contact" },
      ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    if (!showBackgroundOnScroll) return;

    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      setHasScrolled(scrolled);

      // Track active section
      const sections = navigationLinks
        .map((link) => {
          const element = document.querySelector(link.href);
          if (element) {
            const rect = element.getBoundingClientRect();
            return {
              href: link.href,
              top: rect.top,
              bottom: rect.bottom,
            };
          }
          return null;
        })
        .filter(Boolean);

      const current = sections.find(
        (section) => section && section.top <= 100 && section.bottom >= 100
      );

      if (current) {
        setActiveSection(current.href);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showBackgroundOnScroll, navigationLinks]);

  const currentTextColor = hasScrolled ? "#111827" : textColor;
  const currentPrimaryColor = hasScrolled ? primaryColor : textColor;

  const navbarStyle: React.CSSProperties = {
    backgroundColor: hasScrolled ? "rgba(255, 255, 255, 0.95)" : "transparent",
    backdropFilter: hasScrolled ? "blur(20px)" : "none",
    WebkitBackdropFilter: hasScrolled ? "blur(20px)" : "none",
    borderBottom: hasScrolled ? "1px solid rgba(0, 0, 0, 0.1)" : "none",
    boxShadow: hasScrolled
      ? "0 4px 20px rgba(0, 0, 0, 0.08)"
      : "0 2px 10px rgba(0, 0, 0, 0.1)",
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    color: currentTextColor,
  };

  const brandStyle: React.CSSProperties = {
    background: hasScrolled
      ? `linear-gradient(135deg, ${primaryColor} 0%, #1f2937 100%)`
      : `linear-gradient(135deg, ${textColor} 0%, rgba(255,255,255,0.8) 100%)`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    fontWeight: "900",
    fontSize: "1.5rem",
    letterSpacing: "-0.025em",
    textShadow: hasScrolled ? "none" : "0 2px 4px rgba(0, 0, 0, 0.3)",
  };

  const linkBaseStyle: React.CSSProperties = {
    position: "relative",
    fontWeight: "500",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    padding: "0.75rem 1.25rem",
    borderRadius: "0.75rem",
    textShadow: hasScrolled ? "none" : "0 1px 2px rgba(0, 0, 0, 0.3)",
  };

  const mobileMenuStyle: React.CSSProperties = {
    backgroundColor: hasScrolled
      ? "rgba(255, 255, 255, 0.98)"
      : "rgba(0, 0, 0, 0.85)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    borderTop: hasScrolled
      ? "1px solid rgba(17, 24, 39, 0.1)"
      : `1px solid ${textColor}30`,
    boxShadow: hasScrolled
      ? "0 4px 20px rgba(0, 0, 0, 0.1)"
      : "0 4px 20px rgba(0, 0, 0, 0.3)",
  };

  return (
    <>
      <nav
        className={`w-full ${sticky ? "fixed top-0 z-50" : ""}`}
        style={navbarStyle}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Enhanced Logo/Brand */}
            <div className="flex items-center">
              <Link
                href="#home"
                className="flex items-center space-x-3 group transition-all duration-300 hover:scale-105"
              >
                {logo && (
                  <div className="relative">
                    <img
                      src={logo}
                      alt={`${brandName} logo`}
                      className="h-10 w-10 object-contain transition-all duration-300 group-hover:rotate-12"
                      style={{
                        filter: hasScrolled
                          ? "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))"
                          : "drop-shadow(0 4px 12px rgba(0, 0, 0, 0.4))",
                      }}
                    />
                    <div
                      className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-300"
                      style={{
                        backgroundColor: currentPrimaryColor,
                        filter: "blur(8px)",
                      }}
                    />
                  </div>
                )}
                <span style={brandStyle}>{brandName}</span>
              </Link>
            </div>

            {/* Enhanced Desktop Menu */}
            <div className="hidden md:flex items-center space-x-2">
              {navigationLinks.map((item, index) => {
                const isActive = activeSection === item.href;
                return (
                  <Link
                    key={index}
                    href={item.href}
                    className="relative group transition-all duration-300 hover:scale-105"
                    style={{
                      ...linkBaseStyle,
                      color: isActive ? currentPrimaryColor : currentTextColor,
                      backgroundColor: isActive
                        ? hasScrolled
                          ? `${primaryColor}15`
                          : `${textColor}20`
                        : "transparent",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = hasScrolled
                          ? `${primaryColor}10`
                          : `${textColor}15`;
                        e.currentTarget.style.color = currentPrimaryColor;
                        e.currentTarget.style.transform = "translateY(-2px)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.color = currentTextColor;
                        e.currentTarget.style.transform = "translateY(0)";
                      }
                    }}
                  >
                    {item.label}

                    {/* Active indicator */}
                    {isActive && (
                      <div
                        className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 h-0.5 w-8 rounded-full transition-all duration-300"
                        style={{ backgroundColor: currentPrimaryColor }}
                      />
                    )}

                    {/* Hover glow effect */}
                    <div
                      className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                      style={{
                        background: hasScrolled
                          ? `radial-gradient(circle, ${primaryColor}15 0%, transparent 70%)`
                          : `radial-gradient(circle, ${textColor}20 0%, transparent 70%)`,
                        filter: "blur(4px)",
                      }}
                    />
                  </Link>
                );
              })}
            </div>

            {/* Enhanced Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="relative p-3 rounded-xl transition-all duration-300 hover:scale-110 group"
                style={{
                  color: currentTextColor,
                  backgroundColor: isMobileMenuOpen
                    ? hasScrolled
                      ? `${primaryColor}15`
                      : `${textColor}20`
                    : "transparent",
                  backdropFilter: "blur(10px)",
                  border: `1px solid ${
                    hasScrolled ? "rgba(0,0,0,0.1)" : `${textColor}30`
                  }`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = hasScrolled
                    ? `${primaryColor}20`
                    : `${textColor}25`;
                  e.currentTarget.style.transform = "scale(1.1) rotate(5deg)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = isMobileMenuOpen
                    ? hasScrolled
                      ? `${primaryColor}15`
                      : `${textColor}20`
                    : "transparent";
                  e.currentTarget.style.transform = "scale(1) rotate(0deg)";
                }}
              >
                <div className="relative">
                  {isMobileMenuOpen ? (
                    <X
                      size={24}
                      className="transform transition-all duration-300 rotate-180"
                    />
                  ) : (
                    <Menu size={24} className="transition-all duration-300" />
                  )}
                </div>

                {/* Button glow effect */}
                <div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                  style={{
                    background: `radial-gradient(circle, ${currentPrimaryColor}30 0%, transparent 70%)`,
                    filter: "blur(6px)",
                  }}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
          style={mobileMenuStyle}
        >
          <div className="px-6 pt-6 pb-8 space-y-3">
            {navigationLinks.map((item, index) => {
              const isActive = activeSection === item.href;
              return (
                <Link
                  key={index}
                  href={item.href}
                  className={`group flex items-center justify-between px-4 py-4 rounded-xl text-base font-medium transition-all duration-300 transform ${
                    isMobileMenuOpen
                      ? "translate-x-0 opacity-100"
                      : "translate-x-8 opacity-0"
                  }`}
                  style={{
                    color: isActive ? currentPrimaryColor : currentTextColor,
                    backgroundColor: isActive
                      ? hasScrolled
                        ? `${primaryColor}15`
                        : `${textColor}20`
                      : "transparent",
                    transitionDelay: `${index * 75}ms`,
                    borderLeft: isActive
                      ? `4px solid ${currentPrimaryColor}`
                      : "4px solid transparent",
                  }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = hasScrolled
                        ? `${primaryColor}10`
                        : `${textColor}15`;
                      e.currentTarget.style.paddingLeft = "1.25rem";
                      e.currentTarget.style.color = currentPrimaryColor;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.paddingLeft = "1rem";
                      e.currentTarget.style.color = currentTextColor;
                    }
                  }}
                >
                  <span className="flex items-center space-x-3">
                    {item.label}
                    {isActive && (
                      <div
                        className="w-2 h-2 rounded-full animate-pulse"
                        style={{ backgroundColor: currentPrimaryColor }}
                      />
                    )}
                  </span>
                  <ChevronRight
                    size={16}
                    className="opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300"
                  />
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Spacer for fixed navbar */}
      {sticky && (
        <div
          style={{
            height: hasScrolled ? "80px" : "64px",
            transition: "height 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />
      )}

      <style jsx>{`
        @keyframes slideDown {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slide-down {
          animation: slideDown 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.3s ease-out;
        }

        /* Smooth scroll */
        html {
          scroll-behavior: smooth;
        }

        /* Enhanced mobile animations */
        @media (max-width: 768px) {
          .mobile-nav-item {
            animation: fadeInUp 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          }
        }

        /* Glassmorphism enhancement */
        @supports (backdrop-filter: blur(20px)) {
          .glass-nav {
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
          }
        }
      `}</style>
    </>
  );
}
