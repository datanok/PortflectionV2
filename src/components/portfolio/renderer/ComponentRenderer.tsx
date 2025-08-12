import React from "react";
import { PortfolioComponent } from "@/lib/portfolio/types";
import { getComponent, componentRegistry } from "@/lib/portfolio/registry";
import { LiveMarketplaceComponent } from "@/components/LiveMarketplaceComponent";

interface ComponentRendererProps {
  component: PortfolioComponent;
  preview?: boolean;
}

export default function ComponentRenderer({
  component,
  preview = true,
}: ComponentRendererProps) {
  // Log the full component object in detail
  console.log(
    "ComponentRenderer - FULL component object:",
    JSON.stringify(component, null, 2)
  );

  console.log("ComponentRenderer - component properties:", {
    type: component.type,
    variant: component.variant,
    props: component.props,
    styles: component.styles,
    isMarketplace: component.isMarketplace,
    hasComponentCode: !!component.componentCode,
    componentCodeLength: component.componentCode?.length,
    componentCodePreview: component.componentCode?.substring(0, 100) + "...",
  });

  // Check if this is a marketplace component first
  if (component.isMarketplace && component.componentCode) {
    console.log("✅ Rendering marketplace component:", component.variant);
    return (
      <LiveMarketplaceComponent
        componentCode={component.componentCode}
        componentProps={component.props}
        className="w-full"
      />
    );
  }

  // Also check if it has componentCode but isMarketplace flag is missing
  if (component.componentCode && !component.isMarketplace) {
    console.log(
      "✅ Rendering marketplace component (fallback):",
      component.variant
    );
    return (
      <LiveMarketplaceComponent
        componentCode={component.componentCode}
        componentProps={component.props}
        className="w-full"
      />
    );
  }

  // If we get here, it's not a marketplace component
  console.log("❌ Treating as static component, looking up in registry...");
  console.log("❌ isMarketplace:", component.isMarketplace);
  console.log("❌ hasComponentCode:", !!component.componentCode);

  const componentConfig = getComponent(
    component.type as any,
    component.variant
  );

  console.log("ComponentRenderer - componentConfig:", componentConfig);

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
      `}</style>
    </section>
  );
}
