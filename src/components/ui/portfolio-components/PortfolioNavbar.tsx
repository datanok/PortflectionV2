"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import {
  FaHome,
  FaProjectDiagram,
  FaTools,
  FaBriefcase,
  FaGraduationCap,
} from "react-icons/fa";

const navLinks = [
  { name: "Home", href: "#hero", icon: <FaHome /> },
  { name: "Projects", href: "#projects", icon: <FaProjectDiagram /> },
  { name: "Skills", href: "#skills", icon: <FaTools /> },
  { name: "Experience", href: "#experience", icon: <FaBriefcase /> },
  { name: "Education", href: "#education", icon: <FaGraduationCap /> },
];

type Props = {
  theme: any;
  name?: string;
};

export const PortfolioNavbar = ({ theme}: Props) => {
  // Client-side only state initialization to prevent hydration errors
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Mark component as mounted after initial render
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Debounced scroll handler for better performance
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      clearTimeout(scrollTimeout);

      scrollTimeout = setTimeout(() => {
        setIsScrolled(window.scrollY > 10);

        // Update active section based on scroll position
        const sections = navLinks.map(link => link.href.substring(1));

        // Find the current section in view
        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
              setActiveSection(section);
              break;
            }
          }
        }
      }, 50); // Debounce time
    };

    // Initial check
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [mounted]);

  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const section = document.querySelector(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  // Default styles to use before hydration
  const defaultBackground = "#f1f5f9";
  const defaultPrimary = "#718096";
  const defaultMuted = "#e2e8f0";
  const defaultBody = "#2d3748";
  const defaultFontBody = "Lato";

  return (
    <>
      <nav
        className={clsx(
          "fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 rounded-full px-6",
          mounted && isScrolled ? "py-2 shadow-md " : "py-2",
          "hidden md:flex items-center justify-center"
        )}
        style={{
          backgroundColor: mounted
            ? `${isScrolled
              ? `${theme?.background || defaultBackground}80`
              : `${theme?.background || defaultBackground}1A`}`
            : `${defaultBackground}1A`,
          backdropFilter: "blur(8px)",
          border: `1px solid ${theme?.muted || defaultMuted}`,
          
        }}
      >
        
        <div className="container mx-auto gap-4 px-4 flex items-center justify-between">
          {/* Logo / Site Name */}
         

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = mounted && activeSection === link.href.substring(1);

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={clsx(
                    "flex items-center gap-2 px-3 py-1.5 rounded-full text-sm transition-all duration-200",
                    isActive
                      ? "bg-opacity-100 font-semibold"
                      : "hover:bg-opacity-70 hover:font-medium"
                  )}
                  style={{
                    color: isActive
                      ? theme?.background || defaultPrimary
                      : theme?.body || defaultBody,
                    backgroundColor: isActive
                      ? theme?.primary || defaultMuted
                      : "transparent",
                    fontFamily: theme?.fontBody || defaultFontBody,
                  }}
                >
                  {/* <span className="text-base" style={{ color: theme?.primary || defaultPrimary }}>
                    {link.icon}
                  </span> */}
                  <span className="text-base">{link.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Mobile Toggle - Hidden on desktop */}
          <button
            className="md:hidden flex flex-col justify-center items-center gap-1 p-2 rounded-md"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            style={{
              color: theme?.primary || defaultPrimary,
              backgroundColor: isMenuOpen ? theme?.muted || defaultMuted : "transparent"
            }}
          >
            <div className="w-6 h-0.5 bg-current" />
            <div className="w-6 h-0.5 bg-current" />
            <div className="w-6 h-0.5 bg-current" />
          </button>
        </div>
      </nav>

      {/* Mobile Sticky Bottom Button */}
      {mounted && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="bg-white/80 backdrop-blur-md px-6 py-3 rounded-full shadow-lg flex items-center gap-2"
            style={{
              color: theme?.primary || defaultPrimary,
              fontFamily: theme?.fontBody || defaultFontBody,
              border: `1px solid ${theme?.muted || defaultMuted}`,
            }}
          >
            <span>Menu</span>
          </button>
        </div>
      )}

      {/* Mobile Menu */}
      {mounted && isMenuOpen && (<>
        {/* Add a black transparent background */}
        <div
          className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40"
          onClick={() => setIsMenuOpen(false)}
        />
        <div
          className="fixed bottom-0 left-0 right-0 z-50 p-4 pt-6 rounded-t-2xl shadow-2xl transition-all duration-300 md:hidden"
          style={{
            backgroundColor: `${theme?.background || defaultBackground}f2`,
            backdropFilter: "blur(1px)"
          }}
        >


          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold" style={{ color: theme?.primary || defaultPrimary }}>
              Menu
            </span>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="text-lg font-bold"
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className="block py-3 px-4 my-1 rounded-md transition-all duration-200"
              style={{
                color: theme?.body || defaultBody,
                fontFamily: theme?.fontBody || defaultFontBody,
                backgroundColor: activeSection === link.href.substring(1)
                  ? theme?.muted || defaultMuted
                  : "transparent",
                borderLeft: activeSection === link.href.substring(1)
                  ? `3px solid ${theme?.primary || defaultPrimary}`
                  : "none",
                paddingLeft: activeSection === link.href.substring(1) ? "14px" : "16px",
                fontWeight: activeSection === link.href.substring(1) ? "600" : "normal"
              }}
            >
              <div className="flex items-center gap-3">
                {/* <span style={{ color: theme?.primary || defaultPrimary }}>
                  {link.icon}
                </span> */}
                {link.name}
              </div>
            </Link>
          ))}
        </div>
      </>
      )}
    </>
  );
};