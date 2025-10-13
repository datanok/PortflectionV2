/**
 * Default font configurations for different portfolio component styles
 * These fonts are used when globalTheme doesn't specify custom fonts
 */

export interface DefaultFontConfig {
  heading: string;
  body: string;
  mono?: string;
}

export const COMPONENT_STYLE_FONTS: Record<string, DefaultFontConfig> = {
  // Typography style components - Elegant serif fonts
  typography: {
    heading: "Playfair Display",
    body: "Lora",
    mono: "JetBrains Mono",
  },

  // Minimal style components - Clean sans-serif fonts
  minimal: {
    heading: "Inter",
    body: "Lato",
    mono: "JetBrains Mono",
  },

  // NeoBrutalist style components - Bold, impactful fonts
  neobrutalist: {
    heading: "Oswald",
    body: "Inter",
    mono: "JetBrains Mono",
  },

  // Default fallback
  default: {
    heading: "Montserrat",
    body: "Lato",
    mono: "JetBrains Mono",
  },
};

/**
 * Get default font configuration for a component style
 */
export function getDefaultFontsForStyle(styleType: string): DefaultFontConfig {
  const normalizedStyle = styleType.toLowerCase();
  return (
    COMPONENT_STYLE_FONTS[normalizedStyle] || COMPONENT_STYLE_FONTS.default
  );
}

/**
 * Helper to get font with fallback to component style defaults
 */
export function getFontWithDefault(
  globalTheme: any,
  fontType: "heading" | "body" | "mono",
  componentStyle: string
): string {
  // First try to get from globalTheme
  if (globalTheme) {
    const themeFontKey = `font${
      fontType.charAt(0).toUpperCase() + fontType.slice(1)
    }`;
    if (globalTheme[themeFontKey]) {
      return globalTheme[themeFontKey];
    }
  }

  // Fallback to component style defaults
  const defaultFonts = getDefaultFontsForStyle(componentStyle);
  return defaultFonts[fontType] || defaultFonts.body;
}
