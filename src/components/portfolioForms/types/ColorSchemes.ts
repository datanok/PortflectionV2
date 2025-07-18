export interface ColorScheme {
  name: string;
  primary: string;
  secondary: string;
  dark: string;
  light: string;
  background: string;
  card: string;
  muted: string;
  accent: string;
  fontHeading: string;
  fontBody: string;
  body: string;
  cardHover?: string;
  bodySecondary?: string;
  border?: string;
  glass?: string;
}

// Define the color schemes for different layout types
export const COLOR_SCHEMES = {
  classic: [
    {
      name: "Professional Blue",
      primary: "#3490dc",
      secondary: "#4fd1c5",
      dark: "#2d3748",
      light: "#f8fafc",
      background: "#ffffff",
      card: "#f4f4f4",
      muted: "#f1f5f9",
      accent: "#e0e7ff",
      fontHeading: "Montserrat",
      fontBody: "Open Sans",
      body: "#1a202c",
    },
    {
      name: "Creative Purple",
      primary: "#9f7aea",
      secondary: "#f687b3",
      dark: "#322659",
      light: "#faf5ff",
      background: "#f8f0fc",
      card: "#f3e8ff",
      muted: "#e9d8fd",
      accent: "#b794f4",
      fontHeading: "Poppins",
      fontBody: "Lato",
      body: "#1a202c",
    },
    {
      name: "Modern Green",
      primary: "#38a169",
      secondary: "#ecc94b",
      dark: "#22543d",
      light: "#f0fff4",
      background: "#e6fffa",
      card: "#c6f6d5",
      muted: "#f0fff4",
      accent: "#68d391",
      fontHeading: "Nunito",
      fontBody: "Roboto",
      body: "#1a202c",
    },
    {
      name: "Bold Red",
      primary: "#e53e3e",
      secondary: "#ed8936",
      dark: "#742a2a",
      light: "#fff5f5",
      background: "#fffaf0",
      card: "#fed7d7",
      muted: "#fff5f5",
      accent: "#f56565",
      fontHeading: "Oswald",
      fontBody: "Open Sans",
      body: "#1a202c",
    },
    {
      name: "Elegant Grey",
      primary: "#6B7280",        // Tailwind gray-500 (cool gray)
      secondary: "#EF4444",      // Tailwind red-500 (punchy red)
      dark: "#1F2937",           // Deep slate blue-gray
      light: "#F9FAFB",          // Very soft white
      background: "#F3F4F6",     // Tailwind gray-100
      card: "#E5E7EB",           // Tailwind gray-200
      muted: "#E0E0E0",          // Light muted neutral
      accent: "#9CA3AF",         // Tailwind gray-400
      fontHeading: "Merriweather",
      fontBody: "Lato",
      body: "#111827",           // True slate
    },
    
    {
      name: "Dark Prism",
      primary: "#818CF8",        // Tailwind indigo-400
      secondary: "#A78BFA",      // Tailwind violet-400
      dark: "#F9FAFB",           // Light in a dark theme
      light: "#1F2937",          // Base canvas
      background: "#111827",     // Deep navy
      card: "#1E293B",           // Slightly elevated panel
      muted: "#374151",          // Dark muted
      accent: "#5EEAD4",         // Tailwind teal-300 (pops well on dark)
      fontHeading: "Inter",
      fontBody: "Roboto",
      body: "#F3F4F6",           // Light gray for text
    },
    
    {
      name: "Midnight Bloom",
      primary: "#60A5FA",        // Sky blue (Tailwind blue-400)
      secondary: "#34D399",      // Emerald green (Tailwind emerald-400)
      dark: "#F1F5F9",           // Light for dark base
      light: "#0F172A",          // Midnight navy
      background: "#1E293B",     // Deep slate
      card: "#334155",           // Panel slate
      muted: "#475569",          // Muted gray-blue
      accent: "#F472B6",         // Rose pink (Tailwind pink-400)
      fontHeading: "Outfit",
      fontBody: "Source Sans Pro",
      body: "#E5E7EB",           // Light gray
    }
    
  ],
  minimal: [
    {
      name: "Minimal Light",
      primary: "#3b82f6",
      secondary: "#8b5cf6",
      dark: "#1e293b",
      light: "#f8fafc",
      background: "#ffffff",
      card: "#f1f5f9",
      muted: "#e2e8f0",
      accent: "#60a5fa",
      fontHeading: "Inter",
      fontBody: "Inter",
      body: "#1e293b"
    },
    {
      name: "Minimal Dark",
      primary: "#818cf8",
      secondary: "#c7d2fe",
      dark: "#0f172a",
      light: "#e2e8f0",
      background: "#0f172a",
      card: "#1e293b",
      muted: "#334155",
      accent: "#818cf8",
      fontHeading: "Inter",
      fontBody: "Inter",
      body: "#f1f5f9"
    },
    {
      name: "Minimal Warm",
      primary: "#f59e0b",
      secondary: "#fbbf24",
      dark: "#78350f",
      light: "#fffbeb",
      background: "#ffffff",
      card: "#fef3c7",
      muted: "#fef3c7",
      accent: "#fcd34d",
      fontHeading: "Inter",
      fontBody: "Inter",
      body: "#1e293b"
    },
    {
      name: "Minimal Green",
      primary: "#10b981",
      secondary: "#6ee7b7",
      dark: "#064e3b",
      light: "#ecfdf5",
      background: "#ffffff",
      card: "#d1fae5",
      muted: "#d1fae5",
      accent: "#34d399",
      fontHeading: "Inter",
      fontBody: "Inter",
      body: "#064e3b"
    },
    {
      name: "Minimal Pink",
      primary: "#ec4899",
      secondary: "#f9a8d4",
      dark: "#831843",
      light: "#fdf2f8",
      background: "#ffffff",
      card: "#fce7f3",
      muted: "#fce7f3",
      accent: "#f472b6",
      fontHeading: "Inter",
      fontBody: "Inter",
      body: "#831843"
    },
    {
      name: "Midnight Blue",
      primary: "#0F172A",
      secondary: "#3B82F6",
      dark: "#0F172A",
      light: "#F1F5F9",
      background: "#0F172A",
      card: "#1E293B",
      muted: "#334155",
      accent: "#60A5FA",
      fontHeading: "Inter",
      fontBody: "Inter",
      body: "#F1F5F9"
    },
    {
      name: "Forest Depth",
      primary: "#064E3B",
      secondary: "#10B981",
      dark: "#064E3B",
      light: "#ECFDF5",
      background: "linear-gradient(135deg, #064E3B 0%, #065F46 100%)",
      card: "rgba(6, 95, 70, 0.4)",
      cardHover: "rgba(6, 95, 70, 0.6)",
      muted: "rgba(52, 211, 153, 0.1)",
      accent: "#34D399",
      fontHeading: "Inter",
      fontBody: "Inter",
      body: "#ECFDF5",
      bodySecondary: "#A7F3D0",
      border: "rgba(52, 211, 153, 0.2)",
      glass: "rgba(6, 78, 59, 0.8)"
    },
    {
      name: "Royal Purple",
      primary: "#581C87",
      secondary: "#A855F7",
      dark: "#4C1D95",
      light: "#FAF5FF",
      background: "linear-gradient(135deg, #581C87 0%, #7C3AED 100%)",
      card: "rgba(139, 92, 246, 0.15)",
      cardHover: "rgba(139, 92, 246, 0.25)",
      muted: "rgba(196, 181, 253, 0.1)",
      accent: "#C4B5FD",
      fontHeading: "Inter",
      fontBody: "Inter",
      body: "#FAF5FF",
      bodySecondary: "#DDD6FE",
      border: "rgba(196, 181, 253, 0.2)",
      glass: "rgba(88, 28, 135, 0.8)"
    },
    {
      name: "Monochrome Elite",
      primary: "#0A0A0A",
      secondary: "#525252",
      dark: "#0A0A0A",
      light: "#FAFAFA",
      background: "linear-gradient(135deg, #0A0A0A 0%, #171717 100%)",
      card: "rgba(38, 38, 38, 0.6)",
      cardHover: "rgba(38, 38, 38, 0.8)",
      muted: "rgba(115, 115, 115, 0.1)",
      accent: "#737373",
      fontHeading: "Inter",
      fontBody: "Inter",
      body: "#FAFAFA",
      bodySecondary: "#D4D4D4",
      border: "rgba(115, 115, 115, 0.2)",
      glass: "rgba(10, 10, 10, 0.9)"
    },
    {
      name: "Sunset Glow",
      primary: "#9A3412",
      secondary: "#F97316",
      dark: "#7C2D12",
      light: "#FFFBEB",
      background: "linear-gradient(135deg, #9A3412 0%, #EA580C 100%)",
      card: "rgba(234, 88, 12, 0.15)",
      cardHover: "rgba(234, 88, 12, 0.25)",
      muted: "rgba(251, 146, 60, 0.1)",
      accent: "#FB923C",
      fontHeading: "Inter",
      fontBody: "Inter",
      body: "#FFFBEB",
      bodySecondary: "#FED7AA",
      border: "rgba(251, 146, 60, 0.2)",
      glass: "rgba(154, 52, 18, 0.8)"
    }
  ]
} as const;

// Type definitions
export type LayoutType = keyof typeof COLOR_SCHEMES;
export type ColorSchemeName<T extends LayoutType> = typeof COLOR_SCHEMES[T][number]['name'];

/**
 * Get all color schemes for a specific layout type
 * @param layoutType The layout type ('classic' or 'minimal')
 * @returns Array of color schemes for the specified layout type
 */
export const getColorSchemesForLayout = <T extends LayoutType>(
  layoutType: T
): readonly ColorScheme[] => {
  return COLOR_SCHEMES[layoutType] || [];
};

/**
 * Get a specific color scheme by name for a layout type
 * @param layoutType The layout type ('classic' or 'minimal')
 * @param schemeName The name of the color scheme to find
 * @returns The color scheme if found, undefined otherwise
 */
export const getColorScheme = (
  layoutType: LayoutType,
  schemeName: string
): ColorScheme | undefined => {
  const schemes = COLOR_SCHEMES[layoutType];
  return schemes.find(scheme => scheme.name === schemeName);
};

// Export all color schemes for backward compatibility
export const CLASSIC_COLOR_SCHEMES = COLOR_SCHEMES.classic;
export const MINIMAL_COLOR_SCHEMES = COLOR_SCHEMES.minimal;