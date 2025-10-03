import { Memoji } from '@/types/memoji';
import { fetchMemojisFromCloudinary, transformCloudinaryResourceToMemoji } from './memoji-utils';

let memojiCache: Memoji[] | null = null;
let cloudinaryCache: Memoji[] | null = null;

/**
 * Load memoji data from the scripts directory
 */
export async function loadMemojis(): Promise<Memoji[]> {
  if (memojiCache) {
    return memojiCache;
  }

  try {
    // Import the JSON directly from scripts directory
    const memojiData = await import('../../scripts/memojis.json');
    const memojis: Memoji[] = memojiData.default || memojiData;
    memojiCache = memojis;
    return memojis;
  } catch (error) {
    console.error('Error loading memojis:', error);
    return [];
  }
}

/**
 * Load memojis directly from Cloudinary (server-side only)
 */
export async function loadMemojisFromCloudinary(): Promise<Memoji[]> {
  if (cloudinaryCache) {
    return cloudinaryCache;
  }

  try {
    const resources = await fetchMemojisFromCloudinary({
      maxResults: 100,
      sortBy: 'public_id',
      sortOrder: 'asc'
    });

    const memojis = resources.map((resource, index) => 
      transformCloudinaryResourceToMemoji(resource, index)
    );

    cloudinaryCache = memojis;
    return memojis;
  } catch (error) {
    console.error('Error loading memojis from Cloudinary:', error);
    return [];
  }
}

/**
 * Load memojis with fallback strategy: try Cloudinary first, then static JSON
 */
export async function loadMemojisWithFallback(): Promise<Memoji[]> {
  // Try Cloudinary first (server-side only)
  if (typeof window === 'undefined') {
    try {
      const cloudinaryMemojis = await loadMemojisFromCloudinary();
      if (cloudinaryMemojis.length > 0) {
        return cloudinaryMemojis;
      }
    } catch (error) {
      console.warn('Cloudinary loading failed, falling back to static JSON:', error);
    }
  }

  // Fallback to static JSON
  return loadMemojis();
}

/**
 * Clear the memoji cache (useful for development)
 */
export function clearMemojiCache(): void {
  memojiCache = null;
  cloudinaryCache = null;
}

/**
 * Get memojis with server-side rendering support
 */
export async function getStaticMemojis(): Promise<Memoji[]> {
  // For SSR/SSG, we can import the JSON directly
  if (typeof window === 'undefined') {
    try {
      // Dynamic import for server-side
      const fs = await import('fs');
      const path = await import('path');
      
      const filePath = path.join(process.cwd(), 'scripts/memojis.json');
      const fileContents = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(fileContents);
    } catch (error) {
      console.error('Error loading memojis on server:', error);
      return [];
    }
  }
  
  // Client-side loading
  return loadMemojis();
}
