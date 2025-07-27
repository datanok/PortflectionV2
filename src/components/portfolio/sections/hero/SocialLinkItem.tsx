import React from "react";
import { SocialLink } from "./TypographyHero";

interface SocialLinkItemProps {
  social: SocialLink;
  primaryColor: string;
  secondaryColor: string;
  index: number;
}

const getSocialIcon = (platform: string) => {
  const icons: Record<string, string> = {
    GitHub: "⚡",
    LinkedIn: "💼",
    Twitter: "🐦",
    Dribbble: "🎨",
    Instagram: "📷",
  };
  return icons[platform] || "🔗";
};

const SocialLinkItem: React.FC<SocialLinkItemProps> = ({
  social,
  primaryColor,
  secondaryColor,
  index,
}) => (
  <a
    href={social.url}
    target="_blank"
    rel="noopener noreferrer"
    className="group flex items-center space-x-2 transition-all duration-300 hover:scale-110"
    style={{
      color: secondaryColor,
      textDecoration: "none",
      animationDelay: `${1.4 + index * 0.1}s`,
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.color = primaryColor;
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.color = secondaryColor;
    }}
  >
    <span className="text-xl">{getSocialIcon(social.platform)}</span>
    <span className="text-xs font-medium hidden sm:block">
      {social.username}
    </span>
  </a>
);

export default SocialLinkItem;
