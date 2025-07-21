"use client";

import Link from "next/link";
import { Heart, Github, Twitter, Linkedin, Mail } from "lucide-react";

interface FooterWithSocialProps {
  brandName?: string;
  copyright?: string;
  socialLinks?: Array<{ platform: string; url: string; icon: any }>;
  backgroundColor?: string;
  textColor?: string;
  primaryColor?: string;
  showMadeWith?: boolean;
}

export default function FooterWithSocial({
  brandName = "Portfolio",
  copyright = `© ${new Date().getFullYear()} ${brandName}. All rights reserved.`,
  socialLinks = [
    { platform: "GitHub", url: "https://github.com", icon: Github },
    { platform: "Twitter", url: "https://twitter.com", icon: Twitter },
    { platform: "LinkedIn", url: "https://linkedin.com", icon: Linkedin },
    { platform: "Email", url: "mailto:hello@example.com", icon: Mail },
  ],
  backgroundColor = "#f8fafc",
  textColor = "#64748b",
  primaryColor = "#3b82f6",
  showMadeWith = true,
}: FooterWithSocialProps) {
  return (
    <footer
      className="w-full py-8"
      style={{ backgroundColor, color: textColor }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-6">
          {/* Social Links */}
          <div className="flex items-center space-x-4">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <Link
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full hover:bg-white/10 transition-colors"
                  style={{ color: textColor }}
                >
                  <Icon className="h-5 w-5" />
                  <span className="sr-only">{social.platform}</span>
                </Link>
              );
            })}
          </div>

          {/* Copyright */}
          <div className="text-sm text-center">{copyright}</div>

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
