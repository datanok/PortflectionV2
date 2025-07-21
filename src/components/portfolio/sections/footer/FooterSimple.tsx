"use client";

import Link from "next/link";
import { Heart } from "lucide-react";

interface FooterSimpleProps {
  brandName?: string;
  copyright?: string;
  backgroundColor?: string;
  textColor?: string;
  primaryColor?: string;
  showMadeWith?: boolean;
}

export default function FooterSimple({
  brandName = "Portfolio",
  copyright = `© ${new Date().getFullYear()} ${brandName}. All rights reserved.`,
  backgroundColor = "#f8fafc",
  textColor = "#64748b",
  primaryColor = "#3b82f6",
  showMadeWith = true,
}: FooterSimpleProps) {
  return (
    <footer
      className="w-full py-8"
      style={{ backgroundColor, color: textColor }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Copyright */}
          <div className="text-sm">{copyright}</div>

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
