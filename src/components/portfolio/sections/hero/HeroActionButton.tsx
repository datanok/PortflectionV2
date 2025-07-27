import React from "react";
import { HeroAction } from "./TypographyHero";

interface HeroActionButtonProps {
  action: HeroAction;
  primaryColor: string;
  borderRadius: string;
  index: number;
}

const HeroActionButton: React.FC<HeroActionButtonProps> = ({
  action,
  primaryColor,
  borderRadius,
  index,
}) => (
  <a
    href={action.href}
    download={action.downloadFile}
    className="group px-8 py-4 font-bold tracking-wider uppercase transition-all duration-300 hover:scale-105 border-2 relative overflow-hidden"
    style={{
      backgroundColor: action.isPrimary ? primaryColor : "transparent",
      color: action.isPrimary ? "#ffffff" : primaryColor,
      borderColor: primaryColor,
      borderRadius: `${borderRadius}px`,
      fontSize: "0.875rem",
      textDecoration: "none",
      animationDelay: `${1 + index * 0.1}s`,
    }}
  >
    <span className="relative z-10">{action.label}</span>
    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
  </a>
);

export default HeroActionButton;
