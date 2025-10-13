// Standardized color schemes for portfolio components
export interface ColorScheme {
  id: string;
  name: string;
  description: string;
  preview: string;
  styles: {
    // Main colors
    backgroundColor: string;
    textColor: string;
    primaryColor: string;
    secondaryColor: string;

    // Optional/Additional colors
    accentColor?: string;
    borderColor?: string;
    shadowColor?: string;
    statusColor?: string;
    cardBackgroundColor?: string;
  };
}

export const colorSchemes: ColorScheme[] = [
  {
    id: "classic-blue",
    name: "Classic Blue",
    description:
      "Modern professional blue theme with clean whites and subtle grays.",
    preview: "linear-gradient(135deg, #2563eb 0%, #1e3a8a 100%)",
    styles: {
      backgroundColor: "#ffffff",
      textColor: "#0f172a",
      primaryColor: "#2563eb",
      secondaryColor: "#475569",
      accentColor: "#eff6ff",
      borderColor: "#e2e8f0",
      shadowColor: "rgba(37, 99, 235, 0.1)",
      statusColor: "#22c55e",
      cardBackgroundColor: "#f8fafc",
    },
  },
  {
    id: "midnight-dark",
    name: "Midnight Dark",
    description:
      "Elegant dark mode with blue-gray accents and balanced contrast.",
    preview: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
    styles: {
      backgroundColor: "#0f172a",
      textColor: "#e2e8f0",
      primaryColor: "#3b82f6",
      secondaryColor: "#94a3b8",
      accentColor: "#1e293b",
      borderColor: "#334155",
      shadowColor: "rgba(0, 0, 0, 0.6)",
      statusColor: "#22c55e",
      cardBackgroundColor: "#1e293b",
    },
  },
  {
    id: "soft-neutral",
    name: "Soft Neutral",
    description:
      "Minimal beige and taupe tones for a sophisticated portfolio look.",
    preview: "linear-gradient(135deg, #f5f5f4 0%, #e7e5e4 100%)",
    styles: {
      backgroundColor: "#fafaf9",
      textColor: "#1c1917",
      primaryColor: "#78716c",
      secondaryColor: "#a8a29e",
      accentColor: "#f5f5f4",
      borderColor: "#e7e5e4",
      shadowColor: "rgba(0, 0, 0, 0.05)",
      statusColor: "#10b981",
      cardBackgroundColor: "#ffffff",
    },
  },
  {
    id: "vivid-purple",
    name: "Vivid Purple",
    description: "Bold violet and pink blend with minimal white backgrounds.",
    preview: "linear-gradient(135deg, #7c3aed 0%, #db2777 100%)",
    styles: {
      backgroundColor: "#ffffff",
      textColor: "#111827",
      primaryColor: "#7c3aed",
      secondaryColor: "#6b7280",
      accentColor: "#f5f3ff",
      borderColor: "#e5e7eb",
      shadowColor: "rgba(124, 58, 237, 0.15)",
      statusColor: "#ec4899",
      cardBackgroundColor: "#faf5ff",
    },
  },
  {
    id: "sandstone",
    name: "Sandstone",
    description: "Warm earthy palette with subtle browns and cream undertones.",
    preview: "linear-gradient(135deg, #d97706 0%, #b45309 100%)",
    styles: {
      backgroundColor: "#fefcfb",
      textColor: "#1c1917",
      primaryColor: "#b45309",
      secondaryColor: "#78350f",
      accentColor: "#fef3c7",
      borderColor: "#e5e7eb",
      shadowColor: "rgba(180, 83, 9, 0.1)",
      statusColor: "#84cc16",
      cardBackgroundColor: "#fff7ed",
    },
  },
  {
    id: "aqua-fresh",
    name: "Aqua Fresh",
    description:
      "Clean turquoise and mint palette ideal for modern portfolios.",
    preview: "linear-gradient(135deg, #06b6d4 0%, #14b8a6 100%)",
    styles: {
      backgroundColor: "#f8fafc",
      textColor: "#0f172a",
      primaryColor: "#06b6d4",
      secondaryColor: "#0e7490",
      accentColor: "#ecfeff",
      borderColor: "#e0f2fe",
      shadowColor: "rgba(6, 182, 212, 0.15)",
      statusColor: "#10b981",
      cardBackgroundColor: "#f0fdfa",
    },
  },
  {
    id: "crimson-focus",
    name: "Crimson Focus",
    description:
      "Sophisticated red and charcoal mix for bold yet elegant portfolios.",
    preview: "linear-gradient(135deg, #dc2626 0%, #991b1b 100%)",
    styles: {
      backgroundColor: "#ffffff",
      textColor: "#111827",
      primaryColor: "#dc2626",
      secondaryColor: "#6b7280",
      accentColor: "#fef2f2",
      borderColor: "#fca5a5",
      shadowColor: "rgba(220, 38, 38, 0.15)",
      statusColor: "#f97316",
      cardBackgroundColor: "#fff7f7",
    },
  },
  {
    id: "forest-green",
    name: "Forest Green",
    description: "Earthy green tones with nature-inspired calmness.",
    preview: "linear-gradient(135deg, #15803d 0%, #166534 100%)",
    styles: {
      backgroundColor: "#f9fafb",
      textColor: "#111827",
      primaryColor: "#15803d",
      secondaryColor: "#475569",
      accentColor: "#dcfce7",
      borderColor: "#bbf7d0",
      shadowColor: "rgba(21, 128, 61, 0.15)",
      statusColor: "#22c55e",
      cardBackgroundColor: "#f0fdf4",
    },
  },
  {
    id: "slate-gray",
    name: "Slate Gray",
    description:
      "Balanced gray-based palette with soft contrast and modern feel.",
    preview: "linear-gradient(135deg, #334155 0%, #1e293b 100%)",
    styles: {
      backgroundColor: "#f8fafc",
      textColor: "#0f172a",
      primaryColor: "#334155",
      secondaryColor: "#64748b",
      accentColor: "#e2e8f0",
      borderColor: "#cbd5e1",
      shadowColor: "rgba(51, 65, 85, 0.15)",
      statusColor: "#0ea5e9",
      cardBackgroundColor: "#ffffff",
    },
  },
  {
    id: "rose-gold",
    name: "Rose Gold",
    description: "Luxurious blush tones with metallic warmth and soft depth.",
    preview: "linear-gradient(135deg, #fca5a5 0%, #fcd34d 100%)",
    styles: {
      backgroundColor: "#fffafc",
      textColor: "#1f2937",
      primaryColor: "#f472b6",
      secondaryColor: "#f59e0b",
      accentColor: "#fff1f2",
      borderColor: "#fecdd3",
      shadowColor: "rgba(244, 114, 182, 0.15)",
      statusColor: "#f9a8d4",
      cardBackgroundColor: "#fff7f9",
    },
  },
];

// Apply color scheme to component styles
export function applyColorScheme(styles: any, colorScheme: ColorScheme): any {
  const appliedStyles = {
    ...styles,
    // Main colors (always applied)
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
  if (colorScheme.styles.statusColor) {
    appliedStyles.statusColor = colorScheme.styles.statusColor;
  }
  if (colorScheme.styles.cardBackgroundColor) {
    appliedStyles.cardBackgroundColor = colorScheme.styles.cardBackgroundColor;
  }

  return appliedStyles;
}

// Get color scheme by ID
export function getColorScheme(id: string): ColorScheme | undefined {
  return colorSchemes.find((scheme) => scheme.id === id);
}

// Get default color scheme
export function getDefaultColorScheme(): ColorScheme {
  return colorSchemes[0]; // Modern Blue
}

// Apply color scheme to all components in a portfolio
export function applyColorSchemeToPortfolio(
  portfolio: any,
  colorSchemeId: string
): any {
  const colorScheme = getColorScheme(colorSchemeId);
  if (!colorScheme) return portfolio;

  const updatedPortfolio = {
    ...portfolio,
    layout:
      portfolio.layout?.map((component: any) => ({
        ...component,
        styles: applyColorScheme(component.styles || {}, colorScheme),
      })) || [],
  };

  return updatedPortfolio;
}
