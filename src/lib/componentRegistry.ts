import { ApprovedComponent } from "@prisma/client";

export interface ComponentMetadata {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  version: string;
  isPremium: boolean;
  price?: number;
  compatibility: string[];
  dependencies: string[];
  authorName: string;
  authorEmail: string;
  authorGithub?: string;
  downloads: number;
  rating: number;
  reviewCount: number;
  approvedAt: Date;
  filePath?: string; // Path to the .tsx file (if converted)
  componentCode?: string; // Original code from database
  propsSchema?: Record<string, any>; // TypeScript props interface
  previewImage?: string;
  demoUrl?: string;
  documentationUrl?: string;
  githubUrl?: string;
}

export interface ComponentRegistry {
  [componentId: string]: ComponentMetadata;
}

// Convert Prisma model to our metadata format
export function convertToComponentMetadata(
  component: ApprovedComponent
): ComponentMetadata {
  return {
    id: component.id,
    name: component.name,
    description: component.description,
    category: component.category,
    tags: component.tags,
    version: component.version,
    isPremium: component.isPremium,
    price: component.price || undefined,
    compatibility: component.compatibility,
    dependencies: component.dependencies,
    authorName: component.authorName,
    authorEmail: component.authorEmail,
    authorGithub: component.authorGithub || undefined,
    downloads: component.downloads,
    rating: component.rating,
    reviewCount: component.reviewCount,
    approvedAt: component.approvedAt,
    filePath: `src/components/community/${component.name.replace(
      /[^a-zA-Z0-9]/g,
      ""
    )}.tsx`,
    componentCode: component.componentCode, // Keep the original code
    previewImage: component.thumbnail || undefined,
    demoUrl: component.demoUrl || undefined,
    documentationUrl: component.documentationUrl || undefined,
    githubUrl: component.githubUrl || undefined,
  };
}

// Cache for the registry to avoid repeated database calls
let registryCache: ComponentRegistry | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Load the registry from the database
export async function loadComponentRegistry(): Promise<ComponentRegistry> {
  const now = Date.now();

  // Return cached registry if it's still valid
  if (registryCache && now - cacheTimestamp < CACHE_DURATION) {
    console.log("📦 Returning cached registry");
    return registryCache;
  }

  console.log("🔄 Loading fresh registry from database...");

  const { PrismaClient } = await import("@prisma/client");
  const prisma = new PrismaClient();

  try {
    const approvedComponents = await prisma.approvedComponent.findMany({
      orderBy: { approvedAt: "desc" },
    });

    const registry: ComponentRegistry = {};

    for (const component of approvedComponents) {
      registry[component.id] = convertToComponentMetadata(component);
    }

    // Update cache
    registryCache = registry;
    cacheTimestamp = now;

    console.log(
      `✅ Loaded ${Object.keys(registry).length} components into registry`
    );
    return registry;
  } finally {
    await prisma.$disconnect();
  }
}

// Clear the registry cache (useful after updates)
export function clearRegistryCache(): void {
  registryCache = null;
  cacheTimestamp = 0;
  console.log("🗑️ Registry cache cleared");
}

// Get component metadata by ID
export async function getComponentMetadata(
  componentId: string
): Promise<ComponentMetadata | null> {
  const registry = await loadComponentRegistry();
  return registry[componentId] || null;
}

// Get components by category
export async function getComponentsByCategory(
  category: string
): Promise<ComponentMetadata[]> {
  const registry = await loadComponentRegistry();
  return Object.values(registry).filter((comp) => comp.category === category);
}

// Get all available categories
export async function getAvailableCategories(): Promise<string[]> {
  const registry = await loadComponentRegistry();
  const categories = new Set(
    Object.values(registry).map((comp) => comp.category)
  );
  return Array.from(categories).sort();
}

// Check if a component has been converted to a file
export async function isComponentConvertedToFile(
  componentId: string
): Promise<boolean> {
  const metadata = await getComponentMetadata(componentId);
  if (!metadata) return false;

  try {
    const fs = await import("fs/promises");
    await fs.access(metadata.filePath!);
    return true;
  } catch {
    return false;
  }
}

// Force refresh the registry (useful after component approval)
export async function refreshRegistry(): Promise<ComponentRegistry> {
  clearRegistryCache();
  return await loadComponentRegistry();
}
