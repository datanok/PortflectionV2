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

export const PortfolioNavbar = ({ theme, name }: Props) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      
      // Update active section based on scroll position
      const sections = navLinks.map(link => link.href.substring(1));
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const section = document.querySelector(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <nav
      className={clsx(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "py-2 shadow-md" : "py-4"
      )}
      style={{
        backgroundColor: isScrolled 
          ? `${theme?.background || "#f1f5f9"}e6` 
          : `${theme?.background || "#f1f5f9"}99`,
        backdropFilter: "blur(8px)"
      }}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo / Site Name */}
        <Link
          href="/"
          className="text-xl font-bold tracking-wide"
          style={{
            color: theme?.primary || "#718096",
            fontFamily: theme?.fontHeading || "Merriweather",
          }}
        >
          {name || "Portfolio"}
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className="flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-200"
              style={{
                color: theme?.body || "#1a202c",
                fontFamily: theme?.fontBody || "Lato",
                backgroundColor: activeSection === link.href.substring(1)
                  ? `${theme?.muted || "#edf2f7"}`
                  : "transparent",
                borderBottom: activeSection === link.href.substring(1)
                  ? `2px solid ${theme?.primary || "#718096"}`
                  : "none",
                fontWeight: activeSection === link.href.substring(1) ? "600" : "normal"
              }}
            >
              <span className="text-lg" style={{ 
                color: theme?.primary || "#718096" 
              }}>
                {link.icon}
              </span>
              <span>{link.name}</span>
            </Link>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden flex flex-col justify-center items-center gap-1 p-2 rounded-md"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
          style={{
            color: theme?.primary || "#718096",
            backgroundColor: isMenuOpen ? theme?.muted || "#edf2f7" : "transparent"
          }}
        >
          <div className="w-6 h-0.5 bg-current" />
          <div className="w-6 h-0.5 bg-current" />
          <div className="w-6 h-0.5 bg-current" />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div 
          className="md:hidden mt-2 px-4 py-2 rounded-b-lg shadow-lg"
          style={{
            backgroundColor: `${theme?.background || "#f1f5f9"}f2`,
            backdropFilter: "blur(10px)"
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className="block py-3 px-4 my-1 rounded-md transition-all duration-200"
              style={{
                color: theme?.body || "#1a202c",
                fontFamily: theme?.fontBody || "Lato",
                backgroundColor: activeSection === link.href.substring(1)
                  ? theme?.muted || "#edf2f7"
                  : "transparent",
                borderLeft: activeSection === link.href.substring(1)
                  ? `3px solid ${theme?.primary || "#718096"}`
                  : "none",
                paddingLeft: activeSection === link.href.substring(1) ? "14px" : "16px",
                fontWeight: activeSection === link.href.substring(1) ? "600" : "normal"
              }}
            >
              <div className="flex items-center gap-3">
                <span style={{ color: theme?.primary || "#718096" }}>
                  {link.icon}
                </span> 
                {link.name}
              </div>
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};