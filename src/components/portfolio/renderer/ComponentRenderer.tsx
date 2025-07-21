import React from "react";
import { PortfolioComponent } from "@/lib/portfolio/types";
import { getComponent } from "@/lib/portfolio/registry";
import { GlobalTheme } from "../builder/GlobalThemeControls";

interface ComponentRendererProps {
  component: PortfolioComponent;
  preview?: boolean;
  globalTheme?: GlobalTheme;
}

export default function ComponentRenderer({
  component,
  preview = true,
  globalTheme,
}: ComponentRendererProps) {
  const componentConfig = getComponent(
    component.type as any,
    component.variant
  );

  if (!componentConfig) {
    return (
      <div className="p-4 text-red-600 bg-red-100 border border-red-200 rounded">
        Component &quot;{component.type}&quot; not found.
      </div>
    );
  }

  const Component = componentConfig.component;
  const styles = { ...componentConfig.defaultStyles, ...component.styles };

  // Merge props with styles for components that accept style props
  const props = {
    ...componentConfig.defaultProps,
    ...component.props,
    // Pass style props to components
    backgroundColor: styles.backgroundColor,
    textColor: styles.textColor,
    paddingY: styles.paddingY,
    paddingX: styles.paddingX,
    textAlign: styles.textAlign,
    fontSize: styles.fontSize,
    fontWeight: styles.fontWeight,
    borderRadius: styles.borderRadius,
    shadow: styles.shadow,
    primaryColor: styles.primaryColor,
    secondaryColor: styles.secondaryColor,
    // Pass global theme to components
    globalTheme,
  };

  // Debug: Log the styles being applied
  console.log(`Component ${component.type} styles:`, {
    defaultStyles: componentConfig.defaultStyles,
    customStyles: component.styles,
    mergedStyles: styles,
  });

  // Convert styles to CSS properties and Tailwind classes
  const getStyleObject = () => {
    const styleObj: React.CSSProperties = {};

    if (styles.backgroundColor) {
      styleObj.backgroundColor = styles.backgroundColor;
    }
    if (styles.textColor) {
      styleObj.color = styles.textColor;
    }
    if (styles.paddingY) {
      styleObj.paddingTop = `${styles.paddingY}px`;
      styleObj.paddingBottom = `${styles.paddingY}px`;
    }
    if (styles.paddingX) {
      styleObj.paddingLeft = `${styles.paddingX}px`;
      styleObj.paddingRight = `${styles.paddingX}px`;
    }
    if (styles.textAlign) {
      styleObj.textAlign = styles.textAlign as any;
    }
    if (styles.fontSize) {
      styleObj.fontSize = styles.fontSize;
    }
    if (styles.fontWeight) {
      styleObj.fontWeight = styles.fontWeight;
    }
    if (styles.borderRadius) {
      styleObj.borderRadius = styles.borderRadius;
    }
    if (styles.shadow) {
      styleObj.boxShadow = styles.shadow;
    }

    return styleObj;
  };

  // Generate dynamic CSS classes based on styles
  const getDynamicClasses = () => {
    const classes: string[] = [];

    // Text alignment
    if (styles.textAlign) {
      switch (styles.textAlign) {
        case "left":
          classes.push("text-left");
          break;
        case "center":
          classes.push("text-center");
          break;
        case "right":
          classes.push("text-right");
          break;
      }
    }

    // Font size
    if (styles.fontSize) {
      switch (styles.fontSize) {
        case "sm":
          classes.push("text-sm");
          break;
        case "base":
          classes.push("text-base");
          break;
        case "lg":
          classes.push("text-lg");
          break;
        case "xl":
          classes.push("text-xl");
          break;
        case "2xl":
          classes.push("text-2xl");
          break;
        case "3xl":
          classes.push("text-3xl");
          break;
      }
    }

    // Font weight
    if (styles.fontWeight) {
      switch (styles.fontWeight) {
        case "normal":
          classes.push("font-normal");
          break;
        case "medium":
          classes.push("font-medium");
          break;
        case "semibold":
          classes.push("font-semibold");
          break;
        case "bold":
          classes.push("font-bold");
          break;
      }
    }

    return classes.join(" ");
  };

  // Apply global theme styles
  const getGlobalThemeStyles = () => {
    if (!globalTheme) return {};

    return {
      fontFamily: globalTheme.fontBody,
      "--primary-color": globalTheme.primary,
      "--secondary-color": globalTheme.secondary,
      "--accent-color": globalTheme.accent,
      "--background-color": globalTheme.background,
      "--card-color": globalTheme.card,
      "--muted-color": globalTheme.muted,
      "--border-radius": `${globalTheme.borderRadius}rem`,
      "--shadow-intensity": `${globalTheme.shadowIntensity}%`,
      "--animation-speed": `${globalTheme.animationSpeed}ms`,
    } as React.CSSProperties;
  };

  // Generate section ID for navigation
  const getSectionId = () => {
    const sectionMap: Record<string, string> = {
      hero: "home",
      about: "about",
      skills: "skills",
      projects: "projects",
      experience: "experience",
      education: "education",
      testimonials: "testimonials",
      contact: "contact",
      navbar: "navbar",
      footer: "footer",
    };
    return sectionMap[component.type] || component.type;
  };

  const sectionId = getSectionId();

  return (
    <section
      id={sectionId}
      className={`
      component-wrapper relative
      ${preview ? "preview-mode" : ""}
      ${getDynamicClasses()}
    `}
      style={{
        ...getStyleObject(),
        ...getGlobalThemeStyles(),
      }}
    >
      {/* Preview overlay indicator - only show in debug mode */}
      {preview && process.env.NODE_ENV === "development" && (
        <div className="absolute top-2 right-2 z-10 bg-blue-500 text-white text-xs px-2 py-1 rounded-full opacity-75">
          Preview
        </div>
      )}

      <Component {...props} />

      <style jsx>{`
        .component-wrapper {
          pointer-events: none;
        }
        .component-wrapper :global(*) {
          pointer-events: auto;
        }
        .preview-mode {
          max-width: 100%;
          overflow: hidden;
        }
        .preview-mode :global(*) {
          font-size: 0.95em;
        }
        .preview-mode :global(h1) {
          font-size: 2.25rem !important;
        }
        .preview-mode :global(h2) {
          font-size: 1.875rem !important;
        }
        .preview-mode :global(h3) {
          font-size: 1.5rem !important;
        }
        .preview-mode :global(p) {
          font-size: 1rem !important;
        }
        .preview-mode :global(button) {
          font-size: 0.875rem !important;
          padding: 0.5rem 1rem !important;
        }
        .preview-mode :global(input),
        .preview-mode :global(textarea) {
          font-size: 0.875rem !important;
          padding: 0.5rem !important;
        }
      `}</style>
    </section>
  );
}
