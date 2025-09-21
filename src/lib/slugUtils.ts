/**
 * Utility functions for generating unique slugs
 */

/**
 * Convert a string to a URL-friendly slug
 */
export function toSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Generate a unique slug with timestamp to avoid conflicts
 * This is useful for resume imports where we want to ensure uniqueness
 */
export function generateUniqueSlugWithTimestamp(baseText: string): string {
  const baseSlug = toSlug(baseText || "imported-portfolio");
  return `${baseSlug}-${Date.now()}`;
}

/**
 * Generate a unique slug with random suffix to avoid conflicts
 * This is useful for resume imports where we want to ensure uniqueness
 */
export function generateUniqueSlugWithRandom(baseText: string): string {
  const baseSlug = toSlug(baseText || "imported-portfolio");
  const randomSuffix = Math.random().toString(36).substring(2, 8);
  return `${baseSlug}-${randomSuffix}`;
}

/**
 * Generate a unique slug with counter to avoid conflicts
 * This is useful for resume imports where we want to ensure uniqueness
 */
export function generateUniqueSlugWithCounter(
  baseText: string,
  counter: number = 1
): string {
  const baseSlug = toSlug(baseText || "imported-portfolio");
  return counter === 1 ? baseSlug : `${baseSlug}-${counter}`;
}
