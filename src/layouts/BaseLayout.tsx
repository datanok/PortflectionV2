import { LayoutProps } from "@/types/layout";
import { ReactNode, useMemo } from "react";
import { FONT_MAP } from "@/lib/fontMap";

interface BaseLayoutProps extends LayoutProps {
  children: ReactNode;
  className?: string;
  theme?: {
    fontHeading?: string;
    fontBody?: string;
    background?: string;
    body?: string;
  };
}

export function BaseLayout({ 
  children, 
  className = "",
  theme = {}
}: BaseLayoutProps) {
  const headingFont = useMemo(() => {
    const fontName = theme?.fontHeading || "Montserrat";
    return FONT_MAP[fontName] || FONT_MAP["Montserrat"];
  }, [theme?.fontHeading]);

  const bodyFont = useMemo(() => {
    const fontName = theme?.fontBody || "Lato";
    return FONT_MAP[fontName] || FONT_MAP["Lato"];
  }, [theme?.fontBody]);

  return (
    <div 
      className={`min-h-screen flex flex-col ${bodyFont?.variable || ''} ${headingFont?.variable || ''} scroll-smooth ${className}`}
      style={{
        backgroundColor: theme?.background,
        color: theme?.body,
        fontFamily: 'var(--font-body, var(--font-lato), sans-serif)'
      }}
    >
      {children}
    </div>
  );
}
