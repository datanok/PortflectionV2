/**
 * Tests for slug utility functions
 */

import {
  toSlug,
  generateUniqueSlugWithTimestamp,
  generateUniqueSlugWithRandom,
  generateUniqueSlugWithCounter,
} from "../slugUtils";

describe("Slug Utils", () => {
  describe("toSlug", () => {
    it("should convert text to URL-friendly slug", () => {
      expect(toSlug("John Doe")).toBe("john-doe");
      expect(toSlug("Software Developer")).toBe("software-developer");
      expect(toSlug("  Multiple   Spaces  ")).toBe("multiple-spaces");
      expect(toSlug("Special@#$%Characters!")).toBe("special-characters");
      expect(toSlug("UPPERCASE")).toBe("uppercase");
    });

    it("should handle empty and undefined strings", () => {
      expect(toSlug("")).toBe("");
      expect(toSlug("   ")).toBe("");
    });
  });

  describe("generateUniqueSlugWithTimestamp", () => {
    it("should generate unique slugs with timestamp", () => {
      const slug1 = generateUniqueSlugWithTimestamp("John Doe");
      const slug2 = generateUniqueSlugWithTimestamp("John Doe");

      expect(slug1).toMatch(/^john-doe-\d+$/);
      expect(slug2).toMatch(/^john-doe-\d+$/);
      expect(slug1).not.toBe(slug2);
    });

    it("should handle empty names", () => {
      const slug = generateUniqueSlugWithTimestamp("");
      expect(slug).toMatch(/^imported-portfolio-\d+$/);
    });
  });

  describe("generateUniqueSlugWithRandom", () => {
    it("should generate unique slugs with random suffix", () => {
      const slug1 = generateUniqueSlugWithRandom("John Doe");
      const slug2 = generateUniqueSlugWithRandom("John Doe");

      expect(slug1).toMatch(/^john-doe-[a-z0-9]{6}$/);
      expect(slug2).toMatch(/^john-doe-[a-z0-9]{6}$/);
      expect(slug1).not.toBe(slug2);
    });
  });

  describe("generateUniqueSlugWithCounter", () => {
    it("should generate slugs with counter", () => {
      expect(generateUniqueSlugWithCounter("John Doe", 1)).toBe("john-doe");
      expect(generateUniqueSlugWithCounter("John Doe", 2)).toBe("john-doe-2");
      expect(generateUniqueSlugWithCounter("John Doe", 10)).toBe("john-doe-10");
    });
  });
});
