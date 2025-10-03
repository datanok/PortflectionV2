import { Memoji, MemojiFilters, MemojiCategory } from '@/types/memoji';

// Cloudinary configuration
const CLOUDINARY_BASE_URL = 'https://res.cloudinary.com/portflection/image/upload';
const MEMOJI_FOLDER = 'Portflection%20Assets/memojis';

// Cloudinary API configuration (for server-side operations)
export const CLOUDINARY_CONFIG = {
  cloud_name: "portflection",
  api_key: process.env.CLOUDINARY_API_KEY || "",
  api_secret: process.env.CLOUDINARY_API_SECRET || "",
  secure: true
};

/**
 * Parse existing Cloudinary URL to extract public_id and version
 */
function parseCloudinaryUrl(url: string): { publicId: string; version?: string } {
  // Handle URLs like: https://res.cloudinary.com/portflection/image/upload/v1759482913/Portflection%20Assets/memojis/activity_6_qqwwrx.png
  const urlPattern = /https:\/\/res\.cloudinary\.com\/[^\/]+\/image\/upload\/(v\d+\/)?(.+)/;
  const match = url.match(urlPattern);
  
  if (match) {
    const version = match[1] ? match[1].slice(0, -1) : undefined; // Remove trailing slash
    const publicId = match[2];
    return { publicId, version };
  }
  
  // Fallback: assume it's just a filename
  return { publicId: `${MEMOJI_FOLDER}/${url}` };
}

/**
 * Generate optimized Cloudinary URL for memoji images
 * Handles both filename strings and full Cloudinary URLs
 */
export function getOptimizedMemojiUrl(
  fileNameOrUrl: string,
  options: {
    width?: number;
    height?: number;
    quality?: 'auto' | number;
    format?: 'auto' | 'webp' | 'png' | 'jpg';
    crop?: 'fill' | 'fit' | 'scale' | 'crop';
  } = {}
): string {
  const {
    width = 100,
    height = 100,
    quality = 'auto',
    format = 'auto',
    crop = 'fill'
  } = options;

  const transformations = [
    `w_${width}`,
    `h_${height}`,
    `c_${crop}`,
    `q_${quality}`,
    `f_${format}`
  ].join(',');

  // Check if input is already a full Cloudinary URL
  if (fileNameOrUrl.startsWith('https://res.cloudinary.com/')) {
    const { publicId, version } = parseCloudinaryUrl(fileNameOrUrl);
    const versionPart = version ? `${version}/` : '';
    return `${CLOUDINARY_BASE_URL}/${transformations}/${versionPart}${publicId}`;
  }

  // Handle simple filename
  return `${CLOUDINARY_BASE_URL}/${transformations}/${MEMOJI_FOLDER}/${fileNameOrUrl}`;
}

/**
 * Get original Cloudinary URL for memoji
 */
export function getOriginalMemojiUrl(fileName: string): string {
  return `${CLOUDINARY_BASE_URL}/${MEMOJI_FOLDER}/${fileName}`;
}

/**
 * Filter memojis based on search criteria
 */
export function filterMemojis(memojis: Memoji[], filters: MemojiFilters): Memoji[] {
  return memojis.filter(memoji => {
    // Category filter
    if (filters.category !== 'all' && memoji.category !== filters.category) {
      return false;
    }

    // Search filter (name, tags, category)
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const matchesName = memoji.name.toLowerCase().includes(searchLower);
      const matchesCategory = memoji.category.toLowerCase().includes(searchLower);
      const matchesTags = memoji.tags.some(tag => 
        tag.toLowerCase().includes(searchLower)
      );
      
      if (!matchesName && !matchesCategory && !matchesTags) {
        return false;
      }
    }

    // Tag filters
    if (filters.tags.length > 0) {
      const hasMatchingTag = filters.tags.some(filterTag =>
        memoji.tags.some(memojiTag => 
          memojiTag.toLowerCase().includes(filterTag.toLowerCase())
        )
      );
      if (!hasMatchingTag) {
        return false;
      }
    }

    return true;
  });
}

/**
 * Get unique categories from memojis
 */
export function getUniqueCategories(memojis: Memoji[]): MemojiCategory[] {
  const categories = new Set(memojis.map(m => m.category));
  return ['all', ...Array.from(categories)] as MemojiCategory[];
}

/**
 * Get popular tags from memojis (most frequently used)
 */
export function getPopularTags(memojis: Memoji[], limit: number = 20): string[] {
  const tagCounts = new Map<string, number>();
  
  memojis.forEach(memoji => {
    memoji.tags.forEach(tag => {
      const normalizedTag = tag.toLowerCase().trim();
      tagCounts.set(normalizedTag, (tagCounts.get(normalizedTag) || 0) + 1);
    });
  });

  return Array.from(tagCounts.entries())
    .sort(([, a], [, b]) => b - a)
    .slice(0, limit)
    .map(([tag]) => tag);
}

/**
 * Group memojis by category
 */
export function groupMemojisByCategory(memojis: Memoji[]): Record<string, Memoji[]> {
  return memojis.reduce((groups, memoji) => {
    const category = memoji.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(memoji);
    return groups;
  }, {} as Record<string, Memoji[]>);
}

/**
 * Get random memojis from a category
 */
export function getRandomMemojis(
  memojis: Memoji[], 
  count: number = 6, 
  category?: MemojiCategory
): Memoji[] {
  let filteredMemojis = memojis;
  
  if (category && category !== 'all') {
    filteredMemojis = memojis.filter(m => m.category === category);
  }
  
  const shuffled = [...filteredMemojis].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

/**
 * Preload memoji images for better UX
 */
export function preloadMemojiImages(memojis: Memoji[], options?: { width?: number; height?: number }): void {
  memojis.forEach(memoji => {
    const img = new Image();
    img.src = getOptimizedMemojiUrl(memoji.fileName, options);
  });
}

/**
 * Fetch memojis from Cloudinary using Search API (server-side only)
 */
export async function fetchMemojisFromCloudinary(options: {
  maxResults?: number;
  sortBy?: 'public_id' | 'created_at' | 'uploaded_at';
  sortOrder?: 'asc' | 'desc';
} = {}): Promise<any[]> {
  const {
    maxResults = 100,
    sortBy = 'public_id',
    sortOrder = 'desc'
  } = options;

  // This should only run on the server side
  if (typeof window !== 'undefined') {
    console.warn('fetchMemojisFromCloudinary should only be called server-side');
    return [];
  }

  try {
    // Dynamic import for server-side only
    const { v2: cloudinary } = await import('cloudinary');
    
    cloudinary.config(CLOUDINARY_CONFIG);

    const result = await cloudinary.search
      .expression(`folder:${MEMOJI_FOLDER.replace('%20', ' ')}/*`)
      .sort_by(sortBy, sortOrder)
      .max_results(maxResults)
      .execute();

    return result.resources || [];
  } catch (error) {
    console.error('Error fetching memojis from Cloudinary:', error);
    return [];
  }
}

/**
 * Transform Cloudinary resource to Memoji format
 */
export function transformCloudinaryResourceToMemoji(resource: any, index: number): Memoji {
  // Extract filename from public_id
  const publicIdParts = resource.public_id.split('/');
  const fileName = publicIdParts[publicIdParts.length - 1];
  
  // Try to extract category from filename or folder structure
  let category = 'general';
  if (fileName.includes('emotion')) category = 'emotion';
  else if (fileName.includes('style')) category = 'style';
  else if (fileName.includes('activity')) category = 'activity';

  // Generate tags from filename and metadata
  const tags = [
    category,
    'memoji',
    'avatar',
    'character',
    ...(resource.tags || [])
  ];

  return {
    id: index + 1,
    name: `memoji_${index + 1}`,
    fileName: `${fileName}.${resource.format}`,
    category,
    tags,
    faceCount: 0,
    personCount: 0,
    emotions: [],
    genderClues: [],
    url: resource.secure_url
  };
}

/**
 * Debounce function for search input
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}
