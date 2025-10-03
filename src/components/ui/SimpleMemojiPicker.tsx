'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Search, X, Loader2 } from 'lucide-react';
import { Memoji } from '@/types/memoji';
import { getOptimizedMemojiUrl, debounce } from '@/lib/memoji-utils';
import { loadMemojis } from '@/lib/memoji-data';

interface SimpleMemojiPickerProps {
  onSelect: (memoji: Memoji) => void;
  selectedMemoji?: Memoji | null;
  className?: string;
}

const SimpleMemojiPicker: React.FC<SimpleMemojiPickerProps> = ({
  onSelect,
  selectedMemoji = null,
  className = ''
}) => {
  const [memojis, setMemojis] = useState<Memoji[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Load memojis on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Try API route first, fallback to direct import
        try {
          const response = await fetch('/api/memojis?source=fallback');
          const result = await response.json();
          
          if (result.success && result.data.length > 0) {
            setMemojis(result.data);
            return;
          }
        } catch (apiError) {
          console.warn('API route failed, using direct import:', apiError);
        }
        
        // Fallback to direct import
        const data = await loadMemojis();
        setMemojis(data);
      } catch (err) {
        console.error('Error loading memojis:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Debounced search
  const debouncedSearch = useMemo(
    () => debounce((term: string) => setSearchTerm(term), 300),
    []
  );

  // Filter memojis
  const filteredMemojis = useMemo(() => {
    return memojis.filter(memoji => {
      // Category filter
      if (selectedCategory !== 'all' && memoji.category !== selectedCategory) {
        return false;
      }

      // Search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        return (
          memoji.name.toLowerCase().includes(searchLower) ||
          memoji.category.toLowerCase().includes(searchLower) ||
          memoji.tags.some(tag => tag.toLowerCase().includes(searchLower))
        );
      }

      return true;
    });
  }, [memojis, searchTerm, selectedCategory]);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set(memojis.map(m => m.category));
    return ['all', ...Array.from(cats)];
  }, [memojis]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  }, [debouncedSearch]);

  if (loading) {
    return (
      <div className={`flex items-center justify-center p-8 ${className}`}>
        <Loader2 className="w-6 h-6 animate-spin mr-2" />
        <span>Loading memojis...</span>
      </div>
    );
  }

  return (
    <div className={`bg-white border border-gray-200 rounded-lg shadow-sm ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Choose Memoji</h3>
        
        {/* Search */}
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search memojis..."
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              {category === 'all' ? 'All' : category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="p-4">
        <div className="text-sm text-gray-600 mb-3">
          Showing {filteredMemojis.length} memojis
        </div>

        {filteredMemojis.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-2">🔍</div>
            <p>No memojis found</p>
          </div>
        ) : (
          <div className="grid grid-cols-5 gap-3 max-h-96 overflow-y-auto">
            {filteredMemojis.map((memoji) => {
              const isSelected = selectedMemoji?.id === memoji.id;
              const imageUrl = getOptimizedMemojiUrl(memoji.fileName, {
                width: 80,
                height: 80,
                quality: 'auto',
                format: 'auto'
              });

              return (
                <button
                  key={memoji.id}
                  onClick={() => onSelect(memoji)}
                  className={`
                    relative group aspect-square p-2 rounded-lg border-2 transition-all duration-200
                    ${isSelected 
                      ? 'border-blue-500 bg-blue-50 shadow-md' 
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                    }
                  `}
                  title={`${memoji.name} - ${memoji.category}`}
                >
                  <img
                    src={imageUrl}
                    alt={memoji.name}
                    className="w-full h-full object-contain rounded-md"
                    loading="lazy"
                  />

                  {/* Selection Indicator */}
                  {isSelected && (
                    <div className="absolute top-1 right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
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
                {selectedMemoji.category}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SimpleMemojiPicker;
