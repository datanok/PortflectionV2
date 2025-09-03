import React from "react";
import { PortfolioComponent } from "@/lib/portfolio/types";
import { getComponent, componentRegistry } from "@/lib/portfolio/registry";

interface ComponentRendererProps {
  component: PortfolioComponent;
  preview?: boolean;
  deviceSize?: "mobile" | "tablet" | "desktop";
}

export default function ComponentRenderer({
  component,
  preview = true,
  deviceSize = "desktop",
}: ComponentRendererProps) {
  const componentConfig = getComponent(
    component.type as any,
    component.variant
  );

  if (!componentConfig) {
    console.error("Component not found:", {
      type: component.type,
      variant: component.variant,
      availableTypes: Object.keys(componentRegistry || {}),
      availableVariants:
        componentRegistry?.[component.type as any]?.variants?.map(
          (v) => v.id
        ) || [],
    });
    return (
      <div className="p-4 text-red-600 bg-red-100 border border-red-200 rounded">
        Component &quot;{component.type}&quot; not found.
        <br />
        <small>
          Type: {component.type}, Variant: {component.variant}
        </small>
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
  };

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
      ${deviceSize === "mobile" ? "mobile-preview" : ""}
      ${deviceSize === "tablet" ? "tablet-preview" : ""}
      ${deviceSize === "desktop" ? "desktop-preview" : ""}
      ${getDynamicClasses()}
    `}
      style={getStyleObject()}
    >
      {/* Preview overlay indicator - only show in debug mode */}

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

        /* Mobile Preview Styles */
        .mobile-preview :global(*) {
          font-size: 0.85em !important;
        }
        .mobile-preview :global(h1) {
          font-size: 1.75rem !important;
          line-height: 1.2 !important;
        }
        .mobile-preview :global(h2) {
          font-size: 1.5rem !important;
          line-height: 1.3 !important;
        }
        .mobile-preview :global(h3) {
          font-size: 1.25rem !important;
          line-height: 1.4 !important;
        }
        .mobile-preview :global(p) {
          font-size: 0.875rem !important;
          line-height: 1.5 !important;
        }
        .mobile-preview :global(button) {
          font-size: 0.75rem !important;
          padding: 0.375rem 0.75rem !important;
        }
        .mobile-preview :global(input),
        .mobile-preview :global(textarea) {
          font-size: 0.75rem !important;
          padding: 0.375rem !important;
        }
        .mobile-preview :global(.container) {
          padding-left: 1rem !important;
          padding-right: 1rem !important;
        }

        /* Tablet Preview Styles */
        .tablet-preview :global(*) {
          font-size: 0.9em !important;
        }
        .tablet-preview :global(h1) {
          font-size: 2rem !important;
          line-height: 1.25 !important;
        }
        .tablet-preview :global(h2) {
          font-size: 1.75rem !important;
          line-height: 1.3 !important;
        }
        .tablet-preview :global(h3) {
          font-size: 1.375rem !important;
          line-height: 1.4 !important;
        }
        .tablet-preview :global(p) {
          font-size: 0.9375rem !important;
          line-height: 1.5 !important;
        }
        .tablet-preview :global(button) {
          font-size: 0.8125rem !important;
          padding: 0.4375rem 0.875rem !important;
        }
        .tablet-preview :global(input),
        .tablet-preview :global(textarea) {
          font-size: 0.8125rem !important;
          padding: 0.4375rem !important;
        }
        .tablet-preview :global(.container) {
          padding-left: 1.5rem !important;
          padding-right: 1.5rem !important;
        }

        /* Desktop Preview Styles */
        // .desktop-preview :global(*) {
        //   font-size: 1em !important;
        // }
        // .desktop-preview :global(h1) {
        //   font-size: 2.5rem !important;
        //   line-height: 1.2 !important;
        // }
        // .desktop-preview :global(h2) {
        //   font-size: 2rem !important;
        //   line-height: 1.25 !important;
        // }
        // .desktop-preview :global(h3) {
        //   font-size: 1.5rem !important;
        //   line-height: 1.3 !important;
        // }
        // .desktop-preview :global(p) {
        //   font-size: 1rem !important;
        //   line-height: 1.6 !important;
        // }
        // .desktop-preview :global(button) {
        //   font-size: 0.875rem !important;
        //   padding: 0.5rem 1rem !important;
        // }
        // .desktop-preview :global(input),
        // .desktop-preview :global(textarea) {
        //   font-size: 0.875rem !important;
        //   padding: 0.5rem !important;
        // }
        .desktop-preview :global(.container) {
          padding-left: 2rem !important;
          padding-right: 2rem !important;
        }
      `}</style>
    </section>
  );
}
