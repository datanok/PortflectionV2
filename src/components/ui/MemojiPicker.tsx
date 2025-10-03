'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Search, Filter, X, Loader2, Grid, List } from 'lucide-react';
import { Memoji, MemojiPickerProps, MemojiFilters, MemojiCategory } from '@/types/memoji';
import { 
  filterMemojis, 
  getOptimizedMemojiUrl, 
  getUniqueCategories, 
  getPopularTags, 
  debounce,
  preloadMemojiImages 
} from '@/lib/memoji-utils';
import { loadMemojis } from '@/lib/memoji-data';

const MemojiPicker: React.FC<MemojiPickerProps> = ({
  onSelect,
  selectedMemoji = null,
  className = '',
  showSearch = true,
  showCategories = true,
  maxHeight = '500px',
  gridCols = 6
}) => {
  const [memojis, setMemojis] = useState<Memoji[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<MemojiFilters>({
    category: 'all',
    search: '',
    tags: []
  });
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  // Load memojis on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await loadMemojis();
        setMemojis(data);
        
        // Preload first batch of images
        const firstBatch = data.slice(0, 20);
        preloadMemojiImages(firstBatch, { width: 80, height: 80 });
        
        setError(null);
      } catch (err) {
        setError('Failed to load memojis');
        console.error('Error loading memojis:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Debounced search handler
  const debouncedSearch = useMemo(
    () => debounce((searchTerm: string) => {
      setFilters(prev => ({ ...prev, search: searchTerm }));
    }, 300),
    []
  );

  // Handle search input
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  }, [debouncedSearch]);

  // Filter memojis based on current filters
  const filteredMemojis = useMemo(() => {
    return filterMemojis(memojis, filters);
  }, [memojis, filters]);

  // Get unique categories
  const categories = useMemo(() => {
    return getUniqueCategories(memojis);
  }, [memojis]);

  // Get popular tags
  const popularTags = useMemo(() => {
    return getPopularTags(memojis, 10);
  }, [memojis]);

  // Handle category change
  const handleCategoryChange = useCallback((category: MemojiCategory) => {
    setFilters(prev => ({ ...prev, category }));
  }, []);

  // Handle tag toggle
  const handleTagToggle = useCallback((tag: string) => {
    setFilters(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  }, []);

  // Handle memoji selection
  const handleMemojiSelect = useCallback((memoji: Memoji) => {
    onSelect(memoji);
  }, [onSelect]);

  // Handle image load
  const handleImageLoad = useCallback((fileName: string) => {
    setLoadedImages(prev => new Set(prev).add(fileName));
  }, []);

  // Clear all filters
  const clearFilters = useCallback(() => {
    setFilters({
      category: 'all',
      search: '',
      tags: []
    });
  }, []);

  if (loading) {
    return (
      <div className={`flex items-center justify-center p-8 ${className}`}>
        <Loader2 className="w-6 h-6 animate-spin mr-2" />
        <span>Loading memojis...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`flex items-center justify-center p-8 text-red-500 ${className}`}>
        <span>{error}</span>
      </div>
    );
  }

  const gridColsClass = {
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6',
    7: 'grid-cols-7',
    8: 'grid-cols-8'
  }[gridCols] || 'grid-cols-6';

  return (
    <div className={`bg-white border border-gray-200 rounded-lg shadow-sm ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900">Choose Memoji</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
              title={`Switch to ${viewMode === 'grid' ? 'list' : 'grid'} view`}
            >
              {viewMode === 'grid' ? <List className="w-4 h-4" /> : <Grid className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
              title="Toggle filters"
            >
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Search */}
        {showSearch && (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search memojis by name or tags..."
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        )}
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="p-4 bg-gray-50 border-b border-gray-200">
          {/* Categories */}
          {showCategories && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Categories
              </label>
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                      filters.category === category
                        ? 'bg-blue-500 text-white border-blue-500'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {category === 'all' ? 'All' : category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Popular Tags */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Popular Tags
            </label>
            <div className="flex flex-wrap gap-2">
              {popularTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => handleTagToggle(tag)}
                  className={`px-2 py-1 text-xs rounded-md border transition-colors ${
                    filters.tags.includes(tag)
                      ? 'bg-green-500 text-white border-green-500'
                      : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Clear Filters */}
          {(filters.category !== 'all' || filters.search || filters.tags.length > 0) && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1 text-sm text-red-600 hover:text-red-700"
            >
              <X className="w-3 h-3" />
              Clear all filters
            </button>
          )}
        </div>
      )}

      {/* Results Count */}
      <div className="px-4 py-2 bg-gray-50 border-b border-gray-200 text-sm text-gray-600">
        Showing {filteredMemojis.length} of {memojis.length} memojis
      </div>

      {/* Memoji Grid/List */}
      <div 
        className="p-4 overflow-y-auto"
        style={{ maxHeight }}
      >
        {filteredMemojis.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-2">🔍</div>
            <p>No memojis found matching your criteria</p>
            <button
              onClick={clearFilters}
              className="mt-2 text-blue-500 hover:text-blue-600 text-sm"
            >
              Clear filters to see all memojis
            </button>
          </div>
        ) : (
          <div className={
            viewMode === 'grid' 
              ? `grid ${gridColsClass} gap-3`
              : 'space-y-2'
          }>
            {filteredMemojis.map((memoji) => {
              const isSelected = selectedMemoji?.id === memoji.id;
              const imageUrl = getOptimizedMemojiUrl(memoji.fileName, {
                width: viewMode === 'grid' ? 80 : 60,
                height: viewMode === 'grid' ? 80 : 60,
                quality: 'auto',
                format: 'auto'
              });
              const isLoaded = loadedImages.has(memoji.fileName);

              return (
                <button
                  key={memoji.id}
                  onClick={() => handleMemojiSelect(memoji)}
                  className={`
                    relative group transition-all duration-200 rounded-lg border-2 overflow-hidden
                    ${viewMode === 'grid' ? 'aspect-square p-2' : 'flex items-center gap-3 p-3'}
                    ${isSelected 
                      ? 'border-blue-500 bg-blue-50 shadow-md' 
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                    }
                  `}
                  title={`${memoji.name} - ${memoji.category}`}
                >
                  {/* Image Container */}
                  <div className={`
                    relative overflow-hidden rounded-md bg-gray-100
                    ${viewMode === 'grid' ? 'w-full h-full' : 'w-12 h-12 flex-shrink-0'}
                  `}>
                    {!isLoaded && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
                      </div>
                    )}
                    <img
                      src={imageUrl}
                      alt={memoji.name}
                      className={`
                        w-full h-full object-contain transition-opacity duration-200
                        ${isLoaded ? 'opacity-100' : 'opacity-0'}
                      `}
                      onLoad={() => handleImageLoad(memoji.fileName)}
                      loading="lazy"
                    />
                  </div>

                  {/* List View Info */}
                  {viewMode === 'list' && (
                    <div className="flex-1 text-left">
                      <div className="font-medium text-gray-900 text-sm">
                        {memoji.name.replace('memoji_', 'Memoji ')}
                      </div>
                      <div className="text-xs text-gray-500 capitalize">
                        {memoji.category}
                      </div>
                      {memoji.tags.length > 0 && (
                        <div className="text-xs text-gray-400 mt-1">
                          {memoji.tags.slice(0, 3).join(', ')}
                          {memoji.tags.length > 3 && '...'}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Selection Indicator */}
                  {isSelected && (
                    <div className="absolute top-1 right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                  )}

                  {/* Hover Overlay for Grid View */}
                  {viewMode === 'grid' && (
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-200 rounded-md" />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Selected Memoji Info */}
      {selectedMemoji && (
        <div className="p-4 bg-blue-50 border-t border-blue-200">
          <div className="flex items-center gap-3">
            <img
              src={getOptimizedMemojiUrl(selectedMemoji.fileName, { width: 40, height: 40 })}
              alt={selectedMemoji.name}
              className="w-10 h-10 rounded-md"
            />
            <div>
              <div className="font-medium text-blue-900">
                {selectedMemoji.name.replace('memoji_', 'Memoji ')}
              </div>
              <div className="text-sm text-blue-700 capitalize">
                {selectedMemoji.category} • {selectedMemoji.tags.slice(0, 2).join(', ')}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemojiPicker;
