"use client";

import Link from "next/link";
import { Menu, X, Mail, Phone } from "lucide-react";
import { useState } from "react";
import {
  generateNavigationLinks,
  type PortfolioSection,
  type NavigationLink,
} from "./utils";

interface NavbarWithLogoProps {
  logo?: string;
  brandName?: string;
  tagline?: string;
  menuItems?: Array<{ label: string; href: string }>;
  sections?: PortfolioSection[];
  contactInfo?: {
    email?: string;
    phone?: string;
  };
  backgroundColor?: string;
  textColor?: string;
  primaryColor?: string;
  showContactInfo?: boolean;
  sticky?: boolean;
}

export default function NavbarWithLogo({
  logo = "/assets/logo.png",
  brandName = "Portfolio",
  tagline = "Professional Portfolio",
  menuItems,
  sections,
  contactInfo = {
    email: "hello@example.com",
    phone: "+1 (555) 123-4567",
  },
  backgroundColor = "#ffffff",
  textColor = "#111827",
  primaryColor = "#3b82f6",
  showContactInfo = true,
  sticky = true,
}: NavbarWithLogoProps) {
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

  return (
    <nav
      className={`w-full ${sticky ? "sticky top-0 z-50" : ""}`}
      style={{ backgroundColor, color: textColor }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar with Contact Info */}
        {showContactInfo && contactInfo && (
          <div
            className="hidden md:flex justify-end items-center py-2 text-sm border-b"
            style={{ borderColor: `${textColor}20` }}
          >
            {contactInfo.email && (
              <div className="flex items-center mr-6">
                <Mail size={14} className="mr-2" />
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="hover:opacity-75 transition-opacity"
                >
                  {contactInfo.email}
                </a>
              </div>
            )}
            {contactInfo.phone && (
              <div className="flex items-center">
                <Phone size={14} className="mr-2" />
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="hover:opacity-75 transition-opacity"
                >
                  {contactInfo.phone}
                </a>
              </div>
            )}
          </div>
        )}

        {/* Main Navigation */}
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <Link href="#home" className="flex items-center space-x-3">
              {logo && (
                <img
                  src={logo}
                  alt={`${brandName} logo`}
                  className="h-10 w-10 object-contain"
                />
              )}
              <div>
                <div className="text-xl font-bold">{brandName}</div>
                {tagline && <div className="text-xs opacity-75">{tagline}</div>}
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationLinks.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="hover:opacity-75 transition-opacity font-medium"
                style={{ color: textColor }}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2"
              style={{ color: textColor }}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div
              className="px-2 pt-2 pb-3 space-y-1 border-t"
              style={{ borderColor: `${textColor}20` }}
            >
              {navigationLinks.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="block px-3 py-2 rounded-md text-base font-medium hover:opacity-75 transition-opacity"
                  style={{ color: textColor }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              {showContactInfo && contactInfo && (
                <div
                  className="pt-4 mt-4 border-t space-y-2"
                  style={{ borderColor: `${textColor}20` }}
                >
                  {contactInfo.email && (
                    <div className="flex items-center px-3 py-2">
                      <Mail size={16} className="mr-3" />
                      <a
                        href={`mailto:${contactInfo.email}`}
                        className="text-sm"
                      >
                        {contactInfo.email}
                      </a>
                    </div>
                  )}
                  {contactInfo.phone && (
                    <div className="flex items-center px-3 py-2">
                      <Phone size={16} className="mr-3" />
                      <a href={`tel:${contactInfo.phone}`} className="text-sm">
                        {contactInfo.phone}
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
