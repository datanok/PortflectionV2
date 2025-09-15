// Standardized color schemes for portfolio components
export interface ColorScheme {
  id: string;
  name: string;
  description: string;
  preview: string;
  styles: {
    backgroundColor: string;
    textColor: string;
    primaryColor: string;
    secondaryColor: string;
    accentColor?: string;
    borderColor?: string;
    shadowColor?: string;
  };
}

export const colorSchemes: ColorScheme[] = [
  {
    id: "modern-blue",
    name: "Modern Blue",
    description: "Professional blue theme with clean whites and subtle grays",
    preview: "linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)",
    styles: {
      backgroundColor: "#ffffff",
      textColor: "#111827",
      primaryColor: "#3b82f6",
      secondaryColor: "#64748b",
      accentColor: "#dbeafe",
      borderColor: "#e5e7eb",
    },
  },
  {
    id: "dark-mode",
    name: "Dark Mode",
    description: "Sleek dark theme with blue accents and high contrast",
    preview: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
    styles: {
      backgroundColor: "#0f172a",
      textColor: "#e2e8f0",
      primaryColor: "#3b82f6",
      secondaryColor: "#64748b",
      accentColor: "#1e293b",
      borderColor: "#334155",
    },
  },
  {
    id: "brutalist-orange",
    name: "Brutalist Orange",
    description: "Bold orange and yellow with black borders and shadows",
    preview: "linear-gradient(135deg, #ff6b35 0%, #ffd23f 100%)",
    styles: {
      backgroundColor: "#fffef7",
      textColor: "#111111",
      primaryColor: "#ff6b35",
      secondaryColor: "#666666",
      accentColor: "#ffd23f",
      borderColor: "#111111",
      shadowColor: "#111111",
    },
  },
  {
    id: "minimal-black",
    name: "Minimal Black",
    description: "Clean black and white with subtle gray accents",
    preview: "linear-gradient(135deg, #000000 0%, #374151 100%)",
    styles: {
      backgroundColor: "#ffffff",
      textColor: "#111827",
      primaryColor: "#000000",
      secondaryColor: "#6b7280",
      accentColor: "#f9fafb",
      borderColor: "#e5e7eb",
    },
  },
  {
    id: "vibrant-purple",
    name: "Vibrant Purple",
    description: "Creative purple and pink with energetic gradients",
    preview: "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)",
    styles: {
      backgroundColor: "#ffffff",
      textColor: "#111827",
      primaryColor: "#8b5cf6",
      secondaryColor: "#64748b",
      accentColor: "#f3e8ff",
      borderColor: "#d1d5db",
    },
  },
  {
    id: "warm-green",
    name: "Warm Green",
    description: "Natural green tones with earth-inspired colors",
    preview: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    styles: {
      backgroundColor: "#ffffff",
      textColor: "#111827",
      primaryColor: "#10b981",
      secondaryColor: "#64748b",
      accentColor: "#d1fae5",
      borderColor: "#d1d5db",
    },
  },
  {
    id: "sunset-red",
    name: "Sunset Red",
    description: "Warm red and orange with sunset-inspired gradients",
    preview: "linear-gradient(135deg, #ef4444 0%, #f97316 100%)",
    styles: {
      backgroundColor: "#ffffff",
      textColor: "#111827",
      primaryColor: "#ef4444",
      secondaryColor: "#64748b",
      accentColor: "#fef2f2",
      borderColor: "#d1d5db",
    },
  },
  {
    id: "ocean-teal",
    name: "Ocean Teal",
    description: "Calming teal and blue with ocean-inspired tones",
    preview: "linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)",
    styles: {
      backgroundColor: "#ffffff",
      textColor: "#111827",
      primaryColor: "#14b8a6",
      secondaryColor: "#64748b",
      accentColor: "#ccfbf1",
      borderColor: "#d1d5db",
    },
  },
];

// Apply color scheme to component styles
export function applyColorScheme(styles: any, colorScheme: ColorScheme): any {
  const appliedStyles = {
    ...styles,
    backgroundColor: colorScheme.styles.backgroundColor,
    textColor: colorScheme.styles.textColor,
    primaryColor: colorScheme.styles.primaryColor,
    secondaryColor: colorScheme.styles.secondaryColor,
  };

  // Apply optional color properties if they exist in the color scheme
  if (colorScheme.styles.accentColor) {
    appliedStyles.accentColor = colorScheme.styles.accentColor;
  }
  if (colorScheme.styles.borderColor) {
    appliedStyles.borderColor = colorScheme.styles.borderColor;
  }
  if (colorScheme.styles.shadowColor) {
    appliedStyles.shadowColor = colorScheme.styles.shadowColor;
  }

  return appliedStyles;
}

// Get color scheme by ID
export function getColorScheme(id: string): ColorScheme | undefined {
  return colorSchemes.find(scheme => scheme.id === id);
}

// Get default color scheme
export function getDefaultColorScheme(): ColorScheme {
  return colorSchemes[0]; // Modern Blue
}

// Apply color scheme to all components in a portfolio
export function applyColorSchemeToPortfolio(portfolio: any, colorSchemeId: string): any {
  const colorScheme = getColorScheme(colorSchemeId);
  if (!colorScheme) return portfolio;

  const updatedPortfolio = {
    ...portfolio,
    layout: portfolio.layout?.map((component: any) => ({
      ...component,
      styles: applyColorScheme(component.styles || {}, colorScheme),
    })) || [],
  };

  return updatedPortfolio;
}
