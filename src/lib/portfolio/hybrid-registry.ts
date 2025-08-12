import React from "react";
import { componentRegistry, ComponentVariant, SectionType } from "./registry";
import { LiveMarketplaceComponent } from "@/components/live/LiveMarketplaceComponent";

// Extended interface for marketplace components
export interface MarketplaceComponentVariant
  extends Omit<ComponentVariant, "component"> {
  id: string;
  name: string;
  description: string;
  componentCode: string; // The actual code string from database
  thumbnail: string;
  category: "layout" | "content" | "media" | "form";
  tags: string[];
  isPopular?: boolean;
  isPremium?: boolean;
  isMarketplace?: true; // Flag to identify marketplace components
  downloads?: number;
  rating?: number;
  author?: {
    name: string;
    email: string;
    github?: string;
  };
}

// Hybrid component variant that can be either static or marketplace
export type HybridComponentVariant =
  | ComponentVariant
  | MarketplaceComponentVariant;

// Wrapper component for marketplace components
export function MarketplaceComponentWrapper({
  componentCode,
  ...props
}: {
  componentCode: string;
  [key: string]: any;
}) {
  return React.createElement(LiveMarketplaceComponent, {
    componentCode,
    componentProps: props,
  });
}

// Helper to check if a component is from marketplace
export function isMarketplaceComponent(
  variant: HybridComponentVariant
): variant is MarketplaceComponentVariant {
  return "isMarketplace" in variant && variant.isMarketplace === true;
}

// Re-export for better compatibility
export { isMarketplaceComponent as default } from "./hybrid-registry";

// Helper to get component display name
export function getComponentDisplayName(
  variant: HybridComponentVariant
): string {
  if (isMarketplaceComponent(variant)) {
    return `${variant.name} (Community)`;
  }
  return variant.name;
}

// Helper to get component thumbnail
export function getComponentThumbnail(variant: HybridComponentVariant): string {
  if (isMarketplaceComponent(variant)) {
    return (
      variant.thumbnail ||
      `https://placehold.co/200x120/e2e8f0/64748b?text=${encodeURIComponent(
        variant.name
      )}`
    );
  }
  return variant.thumbnail;
}

// Helper to get component description
export function getComponentDescription(
  variant: HybridComponentVariant
): string {
  if (isMarketplaceComponent(variant)) {
    return `${variant.description} - By ${variant.author?.name || "Community"}`;
  }
  return variant.description;
}

// Helper to get component tags
export function getComponentTags(variant: HybridComponentVariant): string[] {
  const baseTags = variant.tags || [];
  if (isMarketplaceComponent(variant)) {
    return [...baseTags, "community", "marketplace"];
  }
  return [...baseTags, "built-in"];
}

// Helper to get component category
export function getComponentCategory(variant: HybridComponentVariant): string {
  if (isMarketplaceComponent(variant)) {
    return variant.category;
  }
  return variant.category;
}

// Helper to check if component is popular
export function isComponentPopular(variant: HybridComponentVariant): boolean {
  if (isMarketplaceComponent(variant)) {
    return (variant.downloads || 0) > 100 || (variant.rating || 0) > 4.5;
  }
  return variant.isPopular || false;
}

// Helper to check if component is premium
export function isComponentPremium(variant: HybridComponentVariant): boolean {
  if (isMarketplaceComponent(variant)) {
    return variant.isPremium || false;
  }
  return variant.isPremium || false;
}

// Get all components (static + marketplace) for a section
export function getHybridComponentsForSection(
  sectionId: SectionType,
  marketplaceComponents: MarketplaceComponentVariant[] = []
): HybridComponentVariant[] {
  const staticComponents = componentRegistry[sectionId]?.variants || [];

  // Filter marketplace components by section (using category as proxy)
  const sectionMarketplaceComponents = marketplaceComponents.filter((comp) => {
    // Map section types to categories
    const sectionCategoryMap: Record<SectionType, string[]> = {
      hero: ["layout", "content"],
      about: ["content"],
      skills: ["content"],
      projects: ["content", "media", "projects"], // Keep "projects" here
      experience: ["content"],
      education: ["content"],
      testimonials: ["content"],
      contact: ["form", "content"],
      navbar: ["layout"],
      footer: ["layout"],
      custom: ["layout", "content", "media", "form", "custom"], // Change "projects" to "custom"
    };

    return sectionCategoryMap[sectionId]?.includes(comp.category) || false;
  });

  return [...staticComponents, ...sectionMarketplaceComponents];
}

// Get all components across all sections
export function getAllHybridComponents(
  marketplaceComponents: MarketplaceComponentVariant[] = []
): HybridComponentVariant[] {
  const staticComponents = Object.values(componentRegistry).flatMap(
    (section) => section.variants
  );

  return [...staticComponents, ...marketplaceComponents];
}

// Search across both static and marketplace components
export function searchHybridComponents(
  query: string,
  marketplaceComponents: MarketplaceComponentVariant[] = []
): HybridComponentVariant[] {
  const allComponents = getAllHybridComponents(marketplaceComponents);

  const searchTerm = query.toLowerCase();

  return allComponents.filter((component) => {
    const name = component.name.toLowerCase();
    const description = component.description.toLowerCase();
    const tags = component.tags?.map((tag) => tag.toLowerCase()) || [];

    return (
      name.includes(searchTerm) ||
      description.includes(searchTerm) ||
      tags.some((tag) => tag.includes(searchTerm))
    );
  });
}

// Get popular components from both sources
export function getPopularHybridComponents(
  marketplaceComponents: MarketplaceComponentVariant[] = []
): HybridComponentVariant[] {
  const allComponents = getAllHybridComponents(marketplaceComponents);

  return allComponents
    .filter((component) => isComponentPopular(component))
    .sort((a, b) => {
      // Sort by popularity metrics
      if (isMarketplaceComponent(a) && isMarketplaceComponent(b)) {
        return (b.downloads || 0) - (a.downloads || 0);
      }
      if (isMarketplaceComponent(a)) return -1;
      if (isMarketplaceComponent(b)) return 1;
      return 0;
    })
    .slice(0, 8); // Return top 8 popular components
}
