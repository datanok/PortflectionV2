export interface Theme {
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
}

export function getDefaultTheme(): Theme {
  return {
    primary: "#1f2937",
    secondary: "#374151",
    dark: "#111827",
    light: "#f3f4f6",
    background: "#f1f5f9",
    card: "#ffffff",
    muted: "#edf2f7",
    accent: "#6366f1",
    fontHeading: "Montserrat",
    fontBody: "Lato",
    body: "#1a202c"
  };
}
