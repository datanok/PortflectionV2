import { getContrastColor } from "@/lib/utils";
import React from "react";

interface NeoBrutalistSectionProps {
  children: React.ReactNode;
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: string;
  className?: string;
  style?: React.CSSProperties;
  containerBg?: string; // Background for the outer container
  padding?: string;
  margin?: string;
  borderRadius?: string;
  enableSoftShadow?: boolean;
}

/**
 * Shared wrapper component for Neo-Brutalist sections
 * Provides consistent background container styling and unified page appearance
 * Similar to the Runway design - soft containers instead of harsh shadows
 */
const NeoBrutalistSection: React.FC<NeoBrutalistSectionProps> = ({
  children,
  backgroundColor = "#fef08a",
  borderColor = "#000000",
  borderWidth = "1",
  className = "",
  style = {},
  containerBg = "transparent", // Transparent - page wrapper provides background
  padding = "0",
  margin = "0", // No margin to connect sections
  borderRadius = "0px", // No border radius on individual sections
  enableSoftShadow = true,
}) => {
  const backgroundColorContrast = getContrastColor(backgroundColor);
  const containerStyle: React.CSSProperties = {
    backgroundColor: backgroundColorContrast,
    padding,
    margin,
    borderRadius,
    maxWidth: "100%",
    ...style,
  };

  const sectionStyle: React.CSSProperties = {
    backgroundColor,
    border: `${borderWidth}px solid ${borderColor}`,
    // borderRadius: "0px", // Keep sections flat/connected
    boxShadow: "none", // Remove shadow for connected look
    position: "relative",
    overflow: "hidden",
    transition: "all 0.2s ease-out",
  };

  return (
    <div style={containerStyle}>
      <div className={className} style={sectionStyle}>
        {children}
      </div>
    </div>
  );
};

export default NeoBrutalistSection;
