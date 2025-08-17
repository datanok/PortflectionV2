export interface BackgroundEffectSettings {
  type:
    | "none"
    | "gradient-grid"
    | "dots"
    | "lines"
    | "waves"
    | "mesh"
    | "noise";
  color?: string;
  opacity?: string;
  size?: string;
  blend?: "normal" | "multiply" | "screen" | "overlay" | "soft-light";
}

export function generateBackgroundEffectCSS(
  settings: BackgroundEffectSettings
): string {
  if (!settings || settings.type === "none") {
    return "";
  }

  const color = settings.color || "#3b82f6";
  const opacity = settings.opacity || "0.1";
  const size = settings.size || "20px";
  const blend = settings.blend || "normal";

  switch (settings.type) {
    case "gradient-grid":
      return `
        background-image: 
          linear-gradient(${color} ${opacity}), 
          linear-gradient(90deg, transparent 50%, ${color} ${opacity} 50%),
          linear-gradient(transparent 50%, ${color} ${opacity} 50%);
        background-size: ${size} ${size};
        background-blend-mode: ${blend};
      `;

    case "dots":
      return `
        background-image: radial-gradient(circle, ${color} ${opacity} 1px, transparent 1px);
        background-size: ${size} ${size};
        background-blend-mode: ${blend};
      `;

    case "lines":
      return `
        background-image: repeating-linear-gradient(
          45deg,
          transparent,
          transparent 2px,
          ${color} ${opacity} 2px,
          ${color} ${opacity} 4px
        );
        background-blend-mode: ${blend};
      `;

    case "waves":
      return `
        background-image: 
          radial-gradient(ellipse at 50% 50%, ${color} ${opacity} 0%, transparent 50%),
          radial-gradient(ellipse at 80% 20%, ${color} ${opacity} 0%, transparent 50%),
          radial-gradient(ellipse at 20% 80%, ${color} ${opacity} 0%, transparent 50%);
        background-size: ${size} ${size}, ${size} ${size}, ${size} ${size};
        background-position: 0% 0%, 100% 0%, 0% 100%;
        background-blend-mode: ${blend};
      `;

    case "mesh":
      return `
        background-image: 
          radial-gradient(at 40% 20%, ${color} ${opacity} 0px, transparent 50%),
          radial-gradient(at 80% 0%, ${color} ${opacity} 0px, transparent 50%),
          radial-gradient(at 0% 50%, ${color} ${opacity} 0px, transparent 50%),
          radial-gradient(at 80% 50%, ${color} ${opacity} 0px, transparent 50%),
          radial-gradient(at 0% 100%, ${color} ${opacity} 0px, transparent 50%),
          radial-gradient(at 80% 100%, ${color} ${opacity} 0px, transparent 50%),
          radial-gradient(at 0% 0%, ${color} ${opacity} 0px, transparent 50%);
        background-size: ${size} ${size};
        background-blend-mode: ${blend};
      `;

    case "noise":
      return `
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        background-size: ${size} ${size};
        opacity: ${opacity};
        background-blend-mode: ${blend};
      `;

    default:
      return "";
  }
}

export function generateGradientCSS(
  type: "linear" | "radial" | "conic" = "linear",
  direction: string = "to-r",
  colors: string[] = ["#3b82f6", "#8b5cf6"]
): string {
  if (!colors || colors.length < 2) {
    return "";
  }

  const colorStops = colors.join(", ");

  switch (type) {
    case "linear":
      return `background: linear-gradient(${direction}, ${colorStops});`;

    case "radial":
      return `background: radial-gradient(circle, ${colorStops});`;

    case "conic":
      return `background: conic-gradient(from 0deg, ${colorStops});`;

    default:
      return `background: linear-gradient(${direction}, ${colorStops});`;
  }
}

export function generateBorderCSS(
  style: string = "solid",
  width: string = "1px",
  color: string = "#e5e7eb"
): string {
  if (!width || !color) {
    return "";
  }

  return `border: ${width} ${style} ${color};`;
}

export function generateBoxShadowCSS(shadow: string): string {
  if (!shadow) {
    return "";
  }

  return `box-shadow: ${shadow};`;
}

export function generateBackdropBlurCSS(blur: string): string {
  if (!blur) {
    return "";
  }

  return `backdrop-filter: blur(${blur});`;
}

// Combined function to generate all CSS properties
export function generateCompleteStyleCSS(settings: {
  backgroundEffect?: BackgroundEffectSettings;
  gradient?: {
    type: "linear" | "radial" | "conic";
    direction: string;
    colors: string[];
  };
  border?: {
    style: string;
    width: string;
    color: string;
  };
  boxShadow?: string;
  backdropBlur?: string;
}): string {
  let css = "";

  // Background effects
  if (settings.backgroundEffect) {
    css += generateBackgroundEffectCSS(settings.backgroundEffect);
  }

  // Gradients
  if (settings.gradient) {
    css += generateGradientCSS(
      settings.gradient.type,
      settings.gradient.direction,
      settings.gradient.colors
    );
  }

  // Borders
  if (settings.border) {
    css += generateBorderCSS(
      settings.border.style,
      settings.border.width,
      settings.border.color
    );
  }

  // Box shadow
  if (settings.boxShadow) {
    css += generateBoxShadowCSS(settings.boxShadow);
  }

  // Backdrop blur
  if (settings.backdropBlur) {
    css += generateBackdropBlurCSS(settings.backdropBlur);
  }

  return css.trim();
}
