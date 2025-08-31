export interface BackgroundEffectSettings {
  type:
    | "none"
    | "gradient-grid"
    | "dots"
    | "lines"
    | "waves"
    | "mesh"
    | "noise"
    | "hexagons"
    | "triangles"
    | "circles"
    | "stars"
    | "geometric"
    | "organic"
    | "tech"
    | "artistic";
  color?: string;
  opacity?: string;
  size?: string;
  blend?:
    | "normal"
    | "multiply"
    | "screen"
    | "overlay"
    | "soft-light"
    | "hard-light"
    | "color-dodge"
    | "color-burn"
    | "darken"
    | "lighten"
    | "difference"
    | "exclusion"
    | "hue"
    | "saturation"
    | "color"
    | "luminosity";
  intensity?: string;
  direction?: string;
  animation?: "none" | "pulse" | "float" | "rotate" | "wave";
  animationSpeed?: string;
}

export interface GradientSettings {
  type: "linear" | "radial" | "conic" | "mesh";
  direction?: string;
  colors: string[];
  stops?: number[];
  center?: string;
  angle?: string;
}

export interface BorderSettings {
  style:
    | "solid"
    | "dashed"
    | "dotted"
    | "double"
    | "groove"
    | "ridge"
    | "inset"
    | "outset";
  width: string;
  color: string;
  radius?: string;
  sides?: "all" | "top" | "right" | "bottom" | "left";
}

export interface ShadowSettings {
  type: "box" | "text" | "drop";
  color: string;
  blur: string;
  spread?: string;
  offsetX?: string;
  offsetY?: string;
  inset?: boolean;
}

export interface CompleteStyleSettings {
  backgroundEffect?: BackgroundEffectSettings;
  gradient?: GradientSettings;
  border?: BorderSettings;
  shadow?: ShadowSettings;
  backdropBlur?: string;
  backdropFilter?: string;
  customCSS?: string;
}

// Enhanced background effect generation with conflict resolution
export function generateBackgroundEffectCSS(
  settings: BackgroundEffectSettings
): Record<string, string> {
  if (!settings || settings.type === "none") {
    return {};
  }

  const color = settings.color || "#3b82f6";
  const opacity = settings.opacity || "0.1";
  const size = settings.size || "20px";
  const blend = settings.blend || "normal";
  const intensity = settings.intensity || "1";
  const direction = settings.direction || "45deg";

  const baseStyles: Record<string, string> = {
    backgroundBlendMode: blend,
  };

  // Add animation if specified
  if (settings.animation && settings.animation !== "none") {
    const speed = settings.animationSpeed || "3s";
    baseStyles.animation = `${settings.animation} ${speed} ease-in-out infinite`;
  }

  switch (settings.type) {
    case "gradient-grid":
      return {
        ...baseStyles,
        backgroundImage: `
          linear-gradient(${color} ${opacity}), 
          linear-gradient(90deg, transparent 50%, ${color} ${opacity} 50%),
          linear-gradient(transparent 50%, ${color} ${opacity} 50%)
        `,
        backgroundSize: `${size} ${size}`,
      };

    case "dots":
      return {
        ...baseStyles,
        backgroundImage: `radial-gradient(circle, ${color} ${opacity} 1px, transparent 1px)`,
        backgroundSize: `${size} ${size}`,
      };

    case "lines":
      return {
        ...baseStyles,
        backgroundImage: `repeating-linear-gradient(
          ${direction},
          transparent,
          transparent 2px,
          ${color} ${opacity} 2px,
          ${color} ${opacity} 4px
        )`,
      };

    case "waves":
      return {
        ...baseStyles,
        backgroundImage: `
          radial-gradient(ellipse at 50% 50%, ${color} ${opacity} 0%, transparent 50%),
          radial-gradient(ellipse at 80% 20%, ${color} ${opacity} 0%, transparent 50%),
          radial-gradient(ellipse at 20% 80%, ${color} ${opacity} 0%, transparent 50%)
        `,
        backgroundSize: `${size} ${size}, ${size} ${size}, ${size} ${size}`,
        backgroundPosition: "0% 0%, 100% 0%, 0% 100%",
      };

    case "mesh":
      return {
        ...baseStyles,
        backgroundImage: `
          radial-gradient(at 40% 20%, ${color} ${opacity} 0px, transparent 50%),
          radial-gradient(at 80% 0%, ${color} ${opacity} 0px, transparent 50%),
          radial-gradient(at 0% 50%, ${color} ${opacity} 0px, transparent 50%),
          radial-gradient(at 80% 50%, ${color} ${opacity} 0px, transparent 50%),
          radial-gradient(at 0% 100%, ${color} ${opacity} 0px, transparent 50%),
          radial-gradient(at 80% 100%, ${color} ${opacity} 0px, transparent 50%),
          radial-gradient(at 0% 0%, ${color} ${opacity} 0px, transparent 50%)
        `,
        backgroundSize: `${size} ${size}`,
      };

    case "hexagons":
      return {
        ...baseStyles,
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='${size}' height='${size}' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='hex' width='50' height='43.4' patternUnits='userSpaceOnUse'%3E%3Cpolygon points='25,2 47,13.4 47,36.6 25,48 3,36.6 3,13.4' fill='none' stroke='${color.replace(
          "#",
          "%23"
        )}' stroke-width='1' opacity='${opacity}'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100' height='100' fill='url(%23hex)'/%3E%3C/svg%3E")`,
        backgroundSize: `${size} ${size}`,
      };

    case "triangles":
      return {
        ...baseStyles,
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='${size}' height='${size}' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='tri' width='50' height='43.4' patternUnits='userSpaceOnUse'%3E%3Cpolygon points='25,2 47,43.4 3,43.4' fill='none' stroke='${color.replace(
          "#",
          "%23"
        )}' stroke-width='1' opacity='${opacity}'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100' height='100' fill='url(%23tri)'/%3E%3C/svg%3E")`,
        backgroundSize: `${size} ${size}`,
      };

    case "circles":
      return {
        ...baseStyles,
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='${size}' height='${size}' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='circles' width='50' height='50' patternUnits='userSpaceOnUse'%3E%3Ccircle cx='25' cy='25' r='8' fill='none' stroke='${color.replace(
          "#",
          "%23"
        )}' stroke-width='2' opacity='${opacity}'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100' height='100' fill='url(%23circles)'/%3E%3C/svg%3E")`,
        backgroundSize: `${size} ${size}`,
      };

    case "stars":
      return {
        ...baseStyles,
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='${size}' height='${size}' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='stars' width='50' height='50' patternUnits='userSpaceOnUse'%3E%3Cpolygon points='25,2 30,18 47,18 33,28 38,45 25,35 12,45 17,28 3,18 20,18' fill='${color.replace(
          "#",
          "%23"
        )}' opacity='${opacity}'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100' height='100' fill='url(%23stars)'/%3E%3C/svg%3E")`,
        backgroundSize: `${size} ${size}`,
      };

    case "geometric":
      return {
        ...baseStyles,
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='${size}' height='${size}' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='geo' width='50' height='50' patternUnits='userSpaceOnUse'%3E%3Crect x='10' y='10' width='30' height='30' fill='none' stroke='${color.replace(
          "#",
          "%23"
        )}' stroke-width='2' opacity='${opacity}'/%3E%3Ccircle cx='25' cy='25' r='5' fill='${color.replace(
          "#",
          "%23"
        )}' opacity='${opacity}'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100' height='100' fill='url(%23geo)'/%3E%3C/svg%3E")`,
        backgroundSize: `${size} ${size}`,
      };

    case "organic":
      return {
        ...baseStyles,
        backgroundImage: `
          radial-gradient(ellipse at 20% 20%, ${color} ${opacity} 0%, transparent 50%),
          radial-gradient(ellipse at 80% 80%, ${color} ${opacity} 0%, transparent 50%),
          radial-gradient(ellipse at 40% 60%, ${color} ${opacity} 0%, transparent 50%)
        `,
        backgroundSize: `${size} ${size}, ${size} ${size}, ${size} ${size}`,
        backgroundPosition: "0% 0%, 100% 100%, 50% 50%",
      };

    case "tech":
      return {
        ...baseStyles,
        backgroundImage: `
          linear-gradient(90deg, transparent 50%, ${color} ${opacity} 50%),
          linear-gradient(0deg, transparent 50%, ${color} ${opacity} 50%),
          radial-gradient(circle at 25% 25%, ${color} ${opacity} 0%, transparent 50%)
        `,
        backgroundSize: `${size} ${size}, ${size} ${size}, ${size} ${size}`,
      };

    case "artistic":
      return {
        ...baseStyles,
        backgroundImage: `
          conic-gradient(from 0deg at 50% 50%, ${color} ${opacity} 0deg, transparent 60deg, ${color} ${opacity} 120deg, transparent 180deg, ${color} ${opacity} 240deg, transparent 300deg),
          radial-gradient(circle at 30% 70%, ${color} ${opacity} 0%, transparent 50%)
        `,
        backgroundSize: `${size} ${size}, ${size} ${size}`,
      };

    case "noise":
      return {
        ...baseStyles,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' fill='${color.replace(
          "#",
          "%23"
        )}' opacity='${opacity}'/%3E%3C/svg%3E")`,
        backgroundSize: `${size} ${size}`,
      };

    default:
      return {};
  }
}

// Enhanced gradient generation
export function generateGradientCSS(
  settings: GradientSettings
): Record<string, string> {
  if (!settings || !settings.colors || settings.colors.length < 2) {
    return {};
  }

  const colors = settings.colors;
  const stops =
    settings.stops || colors.map((_, i) => (i / (colors.length - 1)) * 100);
  const colorStops = colors
    .map((color, i) => `${color} ${stops[i]}%`)
    .join(", ");

  switch (settings.type) {
    case "linear":
      const direction = settings.direction || "to right";
      return {
        background: `linear-gradient(${direction}, ${colorStops})`,
      };

    case "radial":
      const center = settings.center || "circle at center";
      return {
        background: `radial-gradient(${center}, ${colorStops})`,
      };

    case "conic":
      const angle = settings.angle || "from 0deg";
      return {
        background: `conic-gradient(${angle}, ${colorStops})`,
      };

    case "mesh":
      return {
        background: `radial-gradient(at 40% 20%, ${
          colors[0]
        } 0px, transparent 50%),
                     radial-gradient(at 80% 0%, ${
                       colors[1]
                     } 0px, transparent 50%),
                     radial-gradient(at 0% 50%, ${
                       colors[2] || colors[0]
                     } 0px, transparent 50%),
                     radial-gradient(at 80% 50%, ${
                       colors[3] || colors[1]
                     } 0px, transparent 50%)`,
        backgroundSize: "100% 100%",
      };

    default:
      return {};
  }
}

// Enhanced border generation
export function generateBorderCSS(
  settings: BorderSettings
): Record<string, string> {
  if (!settings || !settings.width || !settings.color) {
    return {};
  }

  const { style, width, color, radius, sides } = settings;

  if (sides && sides !== "all") {
    const borderStyles: Record<string, string> = {};
    const sidesMap = {
      top: "Top",
      right: "Right",
      bottom: "Bottom",
      left: "Left",
    };

    if (sides in sidesMap) {
      const side = sidesMap[sides as keyof typeof sidesMap];
      borderStyles[`border${side}`] = `${width} ${style} ${color}`;
    }

    if (radius) {
      borderStyles.borderRadius = radius;
    }

    return borderStyles;
  }

  return {
    border: `${width} ${style} ${color}`,
    ...(radius && { borderRadius: radius }),
  };
}

// Enhanced shadow generation
export function generateShadowCSS(
  settings: ShadowSettings
): Record<string, string> {
  if (!settings || !settings.color || !settings.blur) {
    return {};
  }

  const {
    type,
    color,
    blur,
    spread = "0",
    offsetX = "0",
    offsetY = "0",
    inset = false,
  } = settings;
  const insetStr = inset ? "inset " : "";
  const shadowValue = `${insetStr}${offsetX} ${offsetY} ${blur} ${spread} ${color}`;

  switch (type) {
    case "box":
      return { boxShadow: shadowValue };
    case "text":
      return { textShadow: shadowValue };
    case "drop":
      return { filter: `drop-shadow(${offsetX} ${offsetY} ${blur} ${color})` };
    default:
      return { boxShadow: shadowValue };
  }
}

// Animation keyframes for background effects
export const backgroundEffectAnimations = {
  pulse: `
    @keyframes pulse {
      0%, 100% { opacity: 0.3; }
      50% { opacity: 0.7; }
    }
  `,
  float: `
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }
  `,
  rotate: `
    @keyframes rotate {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `,
  wave: `
    @keyframes wave {
      0%, 100% { transform: translateX(0); }
      50% { transform: translateX(10px); }
    }
  `,
};

// Main function to generate complete styles with conflict resolution
export function generateCompleteStyleCSS(
  settings: CompleteStyleSettings
): Record<string, string> {
  const styles: Record<string, string> = {};

  // Background effects (highest priority for background-image)
  if (settings.backgroundEffect) {
    const effectStyles = generateBackgroundEffectCSS(settings.backgroundEffect);
    Object.assign(styles, effectStyles);
  }

  // Gradients (will override background if no effect, or blend with effect)
  if (settings.gradient) {
    const gradientStyles = generateGradientCSS(settings.gradient);
    Object.assign(styles, gradientStyles);
  }

  // Borders
  if (settings.border) {
    const borderStyles = generateBorderCSS(settings.border);
    Object.assign(styles, borderStyles);
  }

  // Shadows
  if (settings.shadow) {
    const shadowStyles = generateShadowCSS(settings.shadow);
    Object.assign(styles, shadowStyles);
  }

  // Backdrop effects
  if (settings.backdropBlur) {
    styles.backdropFilter = `blur(${settings.backdropBlur})`;
  }

  if (settings.backdropFilter) {
    styles.backdropFilter = settings.backdropFilter;
  }

  return styles;
}

// Utility function to convert CSS object to string (for backward compatibility)
export function stylesToCSSString(styles: Record<string, string>): string {
  return Object.entries(styles)
    .map(([property, value]) => `${property}: ${value}`)
    .join("; ");
}

// Preset configurations for common use cases
export const backgroundEffectPresets = {
  modern: {
    type: "gradient-grid" as const,
    color: "#3b82f6",
    opacity: "0.05",
    size: "30px",
    blend: "normal" as const,
  },
  creative: {
    type: "waves" as const,
    color: "#f59e0b",
    opacity: "0.15",
    size: "40px",
    blend: "soft-light" as const,
  },
  minimal: {
    type: "dots" as const,
    color: "#6b7280",
    opacity: "0.1",
    size: "25px",
    blend: "normal" as const,
  },
  tech: {
    type: "tech" as const,
    color: "#10b981",
    opacity: "0.08",
    size: "35px",
    blend: "screen" as const,
  },
  artistic: {
    type: "artistic" as const,
    color: "#8b5cf6",
    opacity: "0.12",
    size: "50px",
    blend: "overlay" as const,
  },
};

// Hook for React components to use background effects
export function useBackgroundEffects(settings: CompleteStyleSettings) {
  const styles = generateCompleteStyleCSS(settings);

  return {
    styles,
    cssString: stylesToCSSString(styles),
    className: "background-effects-applied",
  };
}
