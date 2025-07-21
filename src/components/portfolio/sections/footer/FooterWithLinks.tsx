"use client";

import Link from "next/link";
import { Heart } from "lucide-react";

interface FooterWithLinksProps {
  brandName?: string;
  copyright?: string;
  links?: Array<{ label: string; href: string }>;
  backgroundColor?: string;
  textColor?: string;
  primaryColor?: string;
  showMadeWith?: boolean;
}

export default function FooterWithLinks({
  brandName = "Portfolio",
  copyright = `© ${new Date().getFullYear()} ${brandName}. All rights reserved.`,
  links = [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Contact", href: "/contact" },
  ],
  backgroundColor = "#f8fafc",
  textColor = "#64748b",
  primaryColor = "#3b82f6",
  showMadeWith = true,
}: FooterWithLinksProps) {
  return (
    <footer
      className="w-full py-8"
      style={{ backgroundColor, color: textColor }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Copyright */}
          <div className="text-sm">{copyright}</div>

          {/* Links */}
          <div className="flex items-center space-x-6">
            {links.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="text-sm hover:opacity-75 transition-opacity"
                style={{ color: textColor }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Made with Portflection */}
          {showMadeWith && (
            <div className="flex items-center space-x-2 text-sm">
              <span>Made with</span>
              <Heart
                className="h-4 w-4"
                style={{ color: primaryColor, fill: primaryColor }}
              />
              <span>by</span>
              <Link
                href="https://portflection.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold hover:opacity-75 transition-opacity"
                style={{ color: primaryColor }}
              >
                Portflection
              </Link>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
