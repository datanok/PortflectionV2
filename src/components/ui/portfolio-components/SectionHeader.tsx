import React from "react";

export interface SectionHeaderTheme {
  accent?: string;
  primary?: string;
  dark?: string;
  fontHeading?: string;
  fontBody?: string;
}

export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  theme?: SectionHeaderTheme;
  icon?: React.ReactElement;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  theme,
  icon,
}) => (
  <div className="mb-16 text-center">
    <div className="inline-flex items-center justify-center gap-2 mb-4">
      {icon &&
        React.cloneElement(icon, {
          size: 24,
          color: theme?.primary 
        })}
      <h2
        className="text-4xl md:text-5xl font-bold"
        style={{
          color: theme?.primary,
          fontFamily: theme?.fontHeading || "Nunito",
        }}
      >
        {title}
      </h2>
    </div>

    {subtitle && (
      <p
        className="text-lg max-w-2xl mx-auto"
        style={{
          color: theme?.body || "#22543d",
          fontFamily: theme?.fontBody || "Roboto",
          opacity: 0.9,
        }}
      >
        {subtitle}
      </p>
    )}
  </div>
);

export default SectionHeader;
