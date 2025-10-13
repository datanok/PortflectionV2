import React from "react";
import { PortfolioFontLoader } from "@/lib/portfolioFontLoader";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Facebook,
} from "lucide-react";

interface SocialLink {
  platform: string;
  url: string;
  username?: string;
}

interface QuickLink {
  label: string;
  url: string;
}

interface MinimalFooterProps {
  brandName?: string;
  tagline?: string;
  description?: string;
  email?: string;
  phone?: string;
  location?: string;
  socialLinks?: SocialLink[];
  quickLinks?: QuickLink[];
  showSocialLinks?: boolean;
  showQuickLinks?: boolean;
  showContactInfo?: boolean;
  copyrightText?: string;
  backgroundColor?: string;
  textColor?: string;
  primaryColor?: string;
  secondaryColor?: string;
  borderColor?: string;
  paddingY?: string;
  paddingX?: string;
  globalTheme?: any;
}

const MinimalFooter: React.FC<MinimalFooterProps> = ({
  brandName = "John Doe",
  tagline = "Full Stack Developer",
  description = "Building beautiful and functional web experiences.",
  email = "john.doe@example.com",
  phone = "+1 (555) 123-4567",
  location = "San Francisco, CA",
  socialLinks = [
    {
      platform: "GitHub",
      url: "https://github.com/johndoe",
      username: "@johndoe",
    },
    {
      platform: "LinkedIn",
      url: "https://linkedin.com/in/johndoe",
      username: "johndoe",
    },
    {
      platform: "Twitter",
      url: "https://twitter.com/johndoe",
      username: "@johndoe",
    },
  ],
  quickLinks = [
    { label: "About", url: "#about" },
    { label: "Projects", url: "#projects" },
    { label: "Skills", url: "#skills" },
    { label: "Contact", url: "#contact" },
  ],
  showSocialLinks = true,
  showQuickLinks = true,
  showContactInfo = true,
  copyrightText = `© ${new Date().getFullYear()} John Doe. All rights reserved.`,
  backgroundColor = "#1f2937",
  textColor = "#f9fafb",
  primaryColor = "#3b82f6",
  secondaryColor = "#9ca3af",
  borderColor = "#374151",
  paddingY = "60",
  paddingX = "16",
  globalTheme,
}) => {
  const sectionStyle: React.CSSProperties = {
    backgroundColor,
    color: textColor,
    paddingTop: `${paddingY}px`,
    paddingBottom: `24px`,
    paddingLeft: `${paddingX}px`,
    paddingRight: `${paddingX}px`,
    fontFamily: PortfolioFontLoader.getThemeFontStyle(globalTheme, "body")
      .fontFamily,
  };

  const getSocialIcon = (platform: string) => {
    const iconProps = { className: "w-5 h-5" };
    const icons: Record<string, React.ReactElement> = {
      github: <Github {...iconProps} />,
      linkedin: <Linkedin {...iconProps} />,
      twitter: <Twitter {...iconProps} />,
      instagram: <Instagram {...iconProps} />,
      facebook: <Facebook {...iconProps} />,
    };
    return icons[platform.toLowerCase()] || null;
  };

  return (
    <footer style={sectionStyle}>
      <div className="max-w-6xl mx-auto">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <h3
              className="text-2xl font-bold mb-2"
              style={{
                color: textColor,
                fontFamily: PortfolioFontLoader.getThemeFontStyle(
                  globalTheme,
                  "heading"
                ).fontFamily,
              }}
            >
              {brandName}
            </h3>
            <p
              className="text-sm font-medium mb-3"
              style={{ color: primaryColor }}
            >
              {tagline}
            </p>
            {description && (
              <p
                className="text-sm leading-relaxed"
                style={{ color: secondaryColor }}
              >
                {description}
              </p>
            )}
          </div>

          {/* Quick Links */}
          {showQuickLinks && quickLinks && quickLinks.length > 0 && (
            <div>
              <h4
                className="text-lg font-semibold mb-4"
                style={{ color: textColor }}
              >
                Quick Links
              </h4>
              <ul className="space-y-2">
                {quickLinks.map((link, idx) => (
                  <li key={idx}>
                    <a
                      href={link.url}
                      className="text-sm transition-colors hover:underline"
                      style={{ color: secondaryColor }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = primaryColor;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = secondaryColor;
                      }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Contact Info */}
          {showContactInfo && (
            <div>
              <h4
                className="text-lg font-semibold mb-4"
                style={{ color: textColor }}
              >
                Contact
              </h4>
              <ul className="space-y-3">
                {email && (
                  <li className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4" style={{ color: primaryColor }} />
                    <a
                      href={`mailto:${email}`}
                      className="transition-colors hover:underline"
                      style={{ color: secondaryColor }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = primaryColor;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = secondaryColor;
                      }}
                    >
                      {email}
                    </a>
                  </li>
                )}
                {phone && (
                  <li className="flex items-center gap-2 text-sm">
                    <Phone
                      className="w-4 h-4"
                      style={{ color: primaryColor }}
                    />
                    <a
                      href={`tel:${phone.replace(/\D/g, "")}`}
                      className="transition-colors hover:underline"
                      style={{ color: secondaryColor }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = primaryColor;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = secondaryColor;
                      }}
                    >
                      {phone}
                    </a>
                  </li>
                )}
                {location && (
                  <li className="flex items-center gap-2 text-sm">
                    <MapPin
                      className="w-4 h-4"
                      style={{ color: primaryColor }}
                    />
                    <span style={{ color: secondaryColor }}>{location}</span>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="border-t mb-8" style={{ borderColor }}></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Copyright */}
          <p className="text-sm" style={{ color: secondaryColor }}>
            {copyrightText}
          </p>

          {/* Social Links */}
          {showSocialLinks && socialLinks && socialLinks.length > 0 && (
            <div className="flex items-center gap-4">
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-all duration-300 hover:scale-110"
                  style={{ color: secondaryColor }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = primaryColor;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = secondaryColor;
                  }}
                  aria-label={social.platform}
                >
                  {getSocialIcon(social.platform)}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Built with Love */}
        <div className="text-center mt-8">
          <p className="text-xs" style={{ color: secondaryColor }}>
            Built with <span style={{ color: primaryColor }}>♥</span> using
            Next.js & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};

export default MinimalFooter;
