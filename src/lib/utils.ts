import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getContrastColor(hex: string) {
  if (hex.length === 4) {
    hex = "#" + [...hex.slice(1)].map((c) => c + c).join("");
  }

  const r = parseInt(hex.substr(1, 2), 16);
  const g = parseInt(hex.substr(3, 2), 16);
  const b = parseInt(hex.substr(5, 2), 16);

  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  return brightness > 128 ? "#000000" : "#FFFFFF";
}

export const getFontSize = (size: string) => {
  const sizeMap: { [key: string]: string } = {
    xs: "clamp(0.75rem, 2vw, 1rem)",
    sm: "clamp(0.875rem, 2vw, 1.125rem)",
    base: "clamp(1rem, 2.5vw, 1.25rem)",
    lg: "clamp(1.125rem, 3vw, 1.5rem)",
    xl: "clamp(1.25rem, 3.5vw, 1.75rem)",
    "2xl": "clamp(1.5rem, 4vw, 2rem)",
    "3xl": "clamp(1.875rem, 5vw, 2.5rem)",
    "4xl": "clamp(2.25rem, 6vw, 3rem)",
    "5xl": "clamp(3rem, 8vw, 4rem)",
    "6xl": "clamp(3.75rem, 10vw, 5rem)",
  };
  return sizeMap[size] || size;
};
