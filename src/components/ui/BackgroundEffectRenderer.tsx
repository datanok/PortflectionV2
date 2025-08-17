import React from "react";
import { cn } from "@/lib/utils";
import {
  generateCompleteStyleCSS,
  BackgroundEffectSettings,
} from "@/lib/backgroundEffects";

interface BackgroundEffectRendererProps {
  children: React.ReactNode;
  className?: string;
  styles?: {
    backgroundColor?: string;
    backgroundEffect?: string;
    backgroundEffectColor?: string;
    backgroundEffectOpacity?: string;
    backgroundEffectSize?: string;
    backgroundEffectBlend?: string;
    gradientType?: string;
    gradientDirection?: string;
    gradientColors?: string[];
    customCSS?: string;
    boxShadow?: string;
    backdropBlur?: string;
    borderStyle?: string;
    borderWidth?: string;
    borderColor?: string;
    [key: string]: any;
  };
}

export function BackgroundEffectRenderer({
  children,
  className,
  styles = {},
}: BackgroundEffectRendererProps) {
  // Generate CSS for background effects
  const effectSettings = {
    backgroundEffect:
      styles.backgroundEffect && styles.backgroundEffect !== "none"
        ? ({
            type: styles.backgroundEffect as any,
            color: styles.backgroundEffectColor,
            opacity: styles.backgroundEffectOpacity,
            size: styles.backgroundEffectSize,
            blend: styles.backgroundEffectBlend as any,
          } as BackgroundEffectSettings)
        : undefined,
    gradient:
      styles.gradientType && styles.gradientColors
        ? {
            type: styles.gradientType as any,
            direction: styles.gradientDirection,
            colors: styles.gradientColors,
          }
        : undefined,
    border:
      styles.borderWidth && styles.borderColor
        ? {
            style: styles.borderStyle,
            width: styles.borderWidth,
            color: styles.borderColor,
          }
        : undefined,
    boxShadow: styles.boxShadow,
    backdropBlur: styles.backdropBlur,
  };

  // Generate the complete CSS
  const effectCSS = generateCompleteStyleCSS(effectSettings);

  // Combine custom CSS with generated CSS
  const combinedCSS = styles.customCSS
    ? `${styles.customCSS}; ${effectCSS}`
    : effectCSS;

  // Create inline styles object
  const inlineStyles: React.CSSProperties = {
    ...(styles.backgroundColor && { backgroundColor: styles.backgroundColor }),
    ...(styles.textColor && { color: styles.textColor }),
    ...(styles.primaryColor &&
      ({ "--primary-color": styles.primaryColor } as any)),
    ...(styles.secondaryColor &&
      ({ "--secondary-color": styles.secondaryColor } as any)),
    ...(styles.borderRadius && { borderRadius: styles.borderRadius }),
    ...(styles.fontSize && { fontSize: styles.fontSize }),
    ...(styles.fontWeight && { fontWeight: styles.fontWeight }),
    ...(styles.textAlign && { textAlign: styles.textAlign }),
    ...(styles.paddingY && {
      paddingTop: styles.paddingY,
      paddingBottom: styles.paddingY,
    }),
    ...(styles.paddingX && {
      paddingLeft: styles.paddingX,
      paddingRight: styles.paddingX,
    }),
  };

  // Apply CSS string if available
  if (combinedCSS) {
    // Parse CSS string and apply to inline styles
    const cssRules = combinedCSS.split(";").filter((rule) => rule.trim());
    cssRules.forEach((rule) => {
      const [property, value] = rule.split(":").map((part) => part.trim());
      if (property && value) {
        // Convert CSS property names to camelCase for React
        const camelProperty = property.replace(/-([a-z])/g, (g) =>
          g[1].toUpperCase()
        );
        (inlineStyles as any)[camelProperty] = value;
      }
    });
  }

  return (
    <div className={cn("relative", className)} style={inlineStyles}>
      {children}
    </div>
  );
}

// Higher-order component for easy wrapping
export function withBackgroundEffects<P extends object>(
  Component: React.ComponentType<P>,
  styles?: BackgroundEffectRendererProps["styles"]
) {
  return function WrappedComponent(props: P) {
    return (
      <BackgroundEffectRenderer styles={styles}>
        <Component {...props} />
      </BackgroundEffectRenderer>
    );
  };
}
