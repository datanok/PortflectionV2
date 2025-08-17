import React from "react";
import {
  Heart,
  Github,
  Linkedin,
  Twitter,
  Mail,
  ExternalLink,
} from "lucide-react";

const TypographyFooter = ({
  title = "LET'S_CONNECT()",
  copyrightText = "© 2024 All rights reserved.",
  socialLinks = [
    { platform: "GitHub", url: "https://github.com", username: "@janedoe" },
    {
      platform: "LinkedIn",
      url: "https://linkedin.com",
      username: "/in/janedoe",
    },
    { platform: "Twitter", url: "https://twitter.com", username: "@janedoe" },
    {
      platform: "Email",
      url: "mailto:hello@example.com",
      username: "hello@example.com",
    },
  ],

  contactInfo = {
    email: "hello@example.com",
    location: "Mumbai, India",
    website: "https://example.com",
  },
  showSocialLinks = true,
  showContactInfo = true,
  showCopyright = true,
  showMadeWith = true,
  madeWithText = "Made with",
  backgroundColor = "#0a0a0a",
  textColor = "#e5e5e5",
  primaryColor = "#3b82f6",
  secondaryColor = "#71717a",
  paddingY = "64",
  paddingX = "24",
}) => {
  const getSocialIcon = (platform: string) => {
    const iconProps = { size: 16, strokeWidth: 1.25 };
    switch (platform.toLowerCase()) {
      case "github":
        return <Github {...iconProps} />;
      case "linkedin":
        return <Linkedin {...iconProps} />;
      case "twitter":
        return <Twitter {...iconProps} />;
      case "email":
        return <Mail {...iconProps} />;
      default:
        return <ExternalLink {...iconProps} />;
    }
  };

  const currentYear = new Date().getFullYear();
  const finalCopyrightText = copyrightText.replace(
    "2024",
    currentYear.toString()
  );

  return (
    <footer
      style={{
        backgroundColor,
        color: textColor,
        fontFamily:
          '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
      className="px-6 py-8 md:px-12 md:py-16 text-sm"
    >
      <div className="flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Left - Title + Contact */}
        <div className="space-y-3 text-center md:text-left">
          <h3
            className="text-base md:text-lg font-semibold tracking-tight"
            style={{ color: primaryColor }}
          >
            {title}
          </h3>
          {showContactInfo && (
            <div
              className="space-y-1 text-xs md:text-sm"
              style={{ color: secondaryColor }}
            >
              <a
                href={`mailto:${contactInfo.email}`}
                className="hover:opacity-70 block"
              >
                {contactInfo.email}
              </a>
              <div>{contactInfo.location}</div>
              {contactInfo.website && (
                <a
                  href={contactInfo.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-70 block"
                >
                  {contactInfo.website.replace(/^https?:\/\//, "")}
                </a>
              )}
            </div>
          )}
        </div>

        {/* Right - Social Links */}
        {showSocialLinks && (
          <div className="text-center md:text-left">
            <h4 className="text-xs font-medium mb-2 uppercase tracking-wide opacity-70">
              Connect
            </h4>
            <div className="flex flex-wrap md:flex-nowrap gap-4 justify-center md:justify-start">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-70"
                  title={social.platform}
                  style={{ color: secondaryColor }}
                >
                  {getSocialIcon(social.platform)}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Bar */}
      <div
        className="mt-10 border-t pt-6 text-xs flex flex-col md:flex-row justify-between items-center gap-3 text-center md:text-left"
        style={{ borderColor: secondaryColor, color: secondaryColor }}
      >
        {showCopyright && (
          <span className="text-[11px] md:text-xs">{finalCopyrightText}</span>
        )}
        {showMadeWith && (
          <div className="flex items-center gap-1 text-[11px] md:text-xs">
            <span>{madeWithText}</span>
            <Heart className="w-3 h-3 text-red-500 fill-current" />
            <span>& precision</span>
          </div>
        )}
      </div>
    </footer>
  );
};

export default TypographyFooter;
