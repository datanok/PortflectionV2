import { FONT_MAP } from "./fontMap";

// Font loading utilities for portfolio sections
export class PortfolioFontLoader {
  /**
   * Get font CSS variable name from font name
   * Returns the actual CSS variable name like "--font-roboto"
   */
  static getFontVariable(fontName: string): string {
    // Map font names to their CSS variable names
    // We use the actual variable names, not the module property
    const variableMap: Record<string, string> = {
      Inter: "--font-inter",
      Roboto: "--font-roboto",
      Montserrat: "--font-montserrat",
      Poppins: "--font-poppins",
      Nunito: "--font-nunito",
      Oswald: "--font-oswald",
      Merriweather: "--font-merriweather",
      Lato: "--font-lato",
      Outfit: "--font-outfit",
      "Open Sans": "--font-open-sans",
      Lora: "--font-lora",
      "Playfair Display": "--font-playfair-display",
      "JetBrains Mono": "--font-jetbrains-mono",
    };

    return (
      variableMap[fontName] ||
      `--font-${fontName.toLowerCase().replace(/\s+/g, "-")}`
    );
  }

  /**
   * Get font family CSS value with fallback
   */
  static getFontFamily(
    fontName: string,
    fallback: string = "sans-serif"
  ): string {
    // Use getFontVariable to get the correct CSS variable name
    const variable = this.getFontVariable(fontName);
    return `var(${variable}, ${fallback})`;
  }

  /**
   * Get font style object for inline styles
   */
  static getFontStyle(
    fontName: string,
    weight?: string,
    fallback: string = "sans-serif"
  ): React.CSSProperties {
    return {
      fontFamily: this.getFontFamily(fontName, fallback),
      ...(weight && { fontWeight: weight }),
    };
  }

  /**
   * Get theme-based font style
   */
  static getThemeFontStyle(
    globalTheme: any,
    fontType: "heading" | "body" | "mono",
    fallback: string = "sans-serif"
  ): React.CSSProperties {
    let fontName: string;

    switch (fontType) {
      case "heading":
        fontName = globalTheme?.fontHeading || "Montserrat";
        break;
      case "body":
        fontName = globalTheme?.fontBody || "Lato";
        break;
      case "mono":
        fontName = globalTheme?.fontMono || "JetBrains Mono";
        break;
      default:
        fontName = globalTheme?.fontBody || "Lato";
    }

    return this.getFontStyle(fontName, undefined, fallback);
  }

  /**
   * Get font class names for CSS variables
   */
  static getFontClasses(globalTheme: any): string {
    const headingFont = globalTheme?.fontHeading || "Montserrat";
    const bodyFont = globalTheme?.fontBody || "Lato";
    const monoFont = globalTheme?.fontMono || "JetBrains Mono";

    const headingVariable = this.getFontVariable(headingFont);
    const bodyVariable = this.getFontVariable(bodyFont);
    const monoVariable = this.getFontVariable(monoFont);

    return `${headingVariable} ${bodyVariable} ${monoVariable}`;
  }

  /**
   * Get CSS variables for fonts
   */
  static getFontCSSVariables(globalTheme: any): React.CSSProperties {
    const headingFont = globalTheme?.fontHeading || "Montserrat";
    const bodyFont = globalTheme?.fontBody || "Lato";
    const monoFont = globalTheme?.fontMono || "JetBrains Mono";

    return {
      "--font-heading": this.getFontFamily(headingFont),
      "--font-body": this.getFontFamily(bodyFont),
      "--font-mono": this.getFontFamily(monoFont, "monospace"),
    } as React.CSSProperties;
  }

  /**
   * Validate if font exists in FONT_MAP
   */
  static isValidFont(fontName: string): boolean {
    return fontName in FONT_MAP;
  }

  /**
   * Get fallback font based on font type
   */
  static getFallbackFont(fontType: "heading" | "body" | "mono"): string {
    switch (fontType) {
      case "heading":
        return "Montserrat, system-ui, sans-serif";
      case "body":
        return "Lato, system-ui, sans-serif";
      case "mono":
        return "JetBrains Mono, Consolas, monospace";
      default:
        return "system-ui, sans-serif";
    }
  }

  /**
   * Get responsive font size with clamp
   */
  static getResponsiveFontSize(
    min: string,
    preferred: string,
    max: string
  ): string {
    return `clamp(${min}, ${preferred}, ${max})`;
  }

  /**
   * Create a complete typography style object
   */
  static createTypographyStyle(
    globalTheme: any,
    fontType: "heading" | "body" | "mono",
    size: string = "1rem",
    weight?: string,
    lineHeight?: string,
    letterSpacing?: string
  ): React.CSSProperties {
    const fontStyle = this.getThemeFontStyle(globalTheme, fontType);

    return {
      ...fontStyle,
      fontSize: size,
      ...(weight && { fontWeight: weight }),
      ...(lineHeight && { lineHeight }),
      ...(letterSpacing && { letterSpacing }),
    };
  }
}

// Hook for portfolio font loading
export const usePortfolioFonts = (globalTheme: any) => {
  return {
    getFontStyle: (fontType: "heading" | "body" | "mono") =>
      PortfolioFontLoader.getThemeFontStyle(globalTheme, fontType),
    getFontClasses: () => PortfolioFontLoader.getFontClasses(globalTheme),
    getFontCSSVariables: () =>
      PortfolioFontLoader.getFontCSSVariables(globalTheme),
    createTypographyStyle: (
      fontType: "heading" | "body" | "mono",
      size?: string,
      weight?: string,
      lineHeight?: string,
      letterSpacing?: string
    ) =>
      PortfolioFontLoader.createTypographyStyle(
        globalTheme,
        fontType,
        size,
        weight,
        lineHeight,
        letterSpacing
      ),
  };
};

export default PortfolioFontLoader;
