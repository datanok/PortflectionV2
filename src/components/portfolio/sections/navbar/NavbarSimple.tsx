"use client";

import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import {
  generateNavigationLinks,
  type PortfolioSection,
  type NavigationLink,
} from "./utils";

interface NavbarSimpleProps {
  logo?: string;
  brandName?: string;
  menuItems?: Array<{ label: string; href: string }>;
  sections?: PortfolioSection[];
  backgroundColor?: string;
  textColor?: string;
  primaryColor?: string;
  showMobileMenu?: boolean;
  sticky?: boolean;
  glassmorphism?: boolean;
  showActiveIndicator?: boolean;
  animateOnScroll?: boolean;
}

export default function NavbarSimple({
  logo = "/assets/logo.png",
  brandName = "Portfolio",
  menuItems,
  sections,
  backgroundColor = "rgba(255, 255, 255, 0.95)",
  textColor = "#111827",
  primaryColor = "#3b82f6",
  showMobileMenu = true,
  sticky = true,
  glassmorphism = true,
  showActiveIndicator = true,
  animateOnScroll = true,
}: NavbarSimpleProps) {
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
  const [activeSection, setActiveSection] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  // Track scroll position and active section
  useEffect(() => {
    if (!animateOnScroll && !showActiveIndicator) return;

    const handleScroll = () => {
      const scrolled = window.scrollY > 20;
      setIsScrolled(scrolled);

      if (!showActiveIndicator) return;

      // Find active section based on scroll position
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
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, [navigationLinks, animateOnScroll, showActiveIndicator]);

  // Dynamic navbar styles based on scroll
  const navbarStyle: React.CSSProperties = {
    backgroundColor:
      glassmorphism && isScrolled
        ? "rgba(255, 255, 255, 0.9)"
        : backgroundColor,
    backdropFilter: glassmorphism ? "blur(20px)" : "none",
    WebkitBackdropFilter: glassmorphism ? "blur(20px)" : "none",
    color: textColor,
    borderBottom: isScrolled ? `1px solid ${textColor}15` : "none",
    boxShadow: isScrolled ? "0 4px 20px rgba(0, 0, 0, 0.1)" : "none",
    transform:
      animateOnScroll && isScrolled ? "translateY(0)" : "translateY(0)",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  };

  const brandStyle: React.CSSProperties = {
    background: `linear-gradient(135deg, ${primaryColor} 0%, ${textColor} 100%)`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    fontWeight: "800",
    fontSize: "1.5rem",
    letterSpacing: "-0.025em",
  };

  const linkStyle: React.CSSProperties = {
    color: textColor,
    position: "relative",
    fontWeight: "500",
    transition: "all 0.3s ease",
    padding: "0.5rem 1rem",
    borderRadius: "0.5rem",
  };

  const activeLinkStyle: React.CSSProperties = {
    ...linkStyle,
    backgroundColor: `${primaryColor}15`,
    color: primaryColor,
  };

  const mobileMenuStyle: React.CSSProperties = {
    backgroundColor: glassmorphism
      ? "rgba(255, 255, 255, 0.98)"
      : backgroundColor,
    backdropFilter: glassmorphism ? "blur(20px)" : "none",
    WebkitBackdropFilter: glassmorphism ? "blur(20px)" : "none",
    borderTop: `1px solid ${textColor}15`,
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
  };

  return (
    <>
      <nav
        className={`w-full ${sticky ? "sticky top-0 z-50" : ""}`}
        style={navbarStyle}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Enhanced Logo/Brand */}
            <div className="flex items-center">
              <Link
                href="#home"
                className="flex items-center space-x-3 group transition-transform duration-300 hover:scale-105"
              >
                {logo && (
                  <div className="relative">
                    <img
                      src={logo}
                      alt={`${brandName} logo`}
                      className="h-10 w-10 object-contain transition-transform duration-300 group-hover:rotate-12"
                      style={{
                        filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))",
                      }}
                    />
                    <div
                      className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                      style={{ backgroundColor: primaryColor }}
                    />
                  </div>
                )}
                <span style={brandStyle}>{brandName}</span>
              </Link>
            </div>

            {/* Enhanced Desktop Menu */}
            <div className="hidden md:flex items-center space-x-2">
              {navigationLinks.map((item, index) => {
                const isActive =
                  showActiveIndicator && activeSection === item.href;
                return (
                  <Link
                    key={index}
                    href={item.href}
                    className="relative group transition-all duration-300 hover:scale-105"
                    style={isActive ? activeLinkStyle : linkStyle}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = `${primaryColor}08`;
                        e.currentTarget.style.color = primaryColor;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.color = textColor;
                      }
                    }}
                  >
                    {item.label}
                    {/* Active indicator dot */}
                    {isActive && (
                      <div
                        className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full transition-all duration-300"
                        style={{ backgroundColor: primaryColor }}
                      />
                    )}
                    {/* Hover effect */}
                    <div
                      className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                      style={{
                        background: `linear-gradient(135deg, ${primaryColor}10 0%, ${primaryColor}05 100%)`,
                      }}
                    />
                  </Link>
                );
              })}
            </div>

            {/* Enhanced Mobile Menu Button */}
            {showMobileMenu && (
              <div className="md:hidden">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="relative p-3 rounded-lg transition-all duration-300 hover:scale-110"
                  style={{
                    color: textColor,
                    backgroundColor: isMobileMenuOpen
                      ? `${primaryColor}15`
                      : "transparent",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = `${primaryColor}10`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = isMobileMenuOpen
                      ? `${primaryColor}15`
                      : "transparent";
                  }}
                >
                  <div className="relative">
                    {isMobileMenuOpen ? (
                      <X
                        size={24}
                        className="transform rotate-180 transition-transform duration-300"
                      />
                    ) : (
                      <Menu
                        size={24}
                        className="transition-transform duration-300"
                      />
                    )}
                  </div>
                  {/* Button background effect */}
                  <div
                    className="absolute inset-0 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300 -z-10"
                    style={{
                      background: `radial-gradient(circle, ${primaryColor}20 0%, transparent 70%)`,
                    }}
                  />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Mobile Menu */}
        {showMobileMenu && (
          <div
            className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
              isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
            style={mobileMenuStyle}
          >
            <div className="px-4 pt-4 pb-6 space-y-2">
              {navigationLinks.map((item, index) => {
                const isActive =
                  showActiveIndicator && activeSection === item.href;
                return (
                  <Link
                    key={index}
                    href={item.href}
                    className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 transform ${
                      isMobileMenuOpen
                        ? "translate-x-0 opacity-100"
                        : "translate-x-4 opacity-0"
                    }`}
                    style={{
                      color: isActive ? primaryColor : textColor,
                      backgroundColor: isActive
                        ? `${primaryColor}15`
                        : "transparent",
                      transitionDelay: `${index * 50}ms`,
                      borderLeft: isActive
                        ? `3px solid ${primaryColor}`
                        : "3px solid transparent",
                    }}
                    onClick={() => setIsMobileMenuOpen(false)}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = `${primaryColor}08`;
                        e.currentTarget.style.paddingLeft = "1.25rem";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.paddingLeft = "1rem";
                      }
                    }}
                  >
                    <div className="flex items-center justify-between">
                      {item.label}
                      {isActive && (
                        <div
                          className="w-2 h-2 rounded-full animate-pulse"
                          style={{ backgroundColor: primaryColor }}
                        />
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </nav>

      {/* Spacer to prevent content from hiding behind fixed navbar */}
      {sticky && (
        <div
          style={{
            height: isScrolled ? "80px" : "64px",
            transition: "height 0.3s ease",
          }}
        />
      )}

      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slide-in {
          animation: slideIn 0.3s ease-out;
        }

        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }

        /* Smooth scroll behavior */
        html {
          scroll-behavior: smooth;
        }

        /* Enhanced mobile menu animations */
        @media (max-width: 768px) {
          .mobile-menu-item {
            animation: fadeIn 0.3s ease-out forwards;
          }
        }
      `}</style>
    </>
  );
}
