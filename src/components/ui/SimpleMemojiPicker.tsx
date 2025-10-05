"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Search, Loader2 } from "lucide-react";
import { Memoji } from "@/types/memoji";
import { getOptimizedMemojiUrl, debounce } from "@/lib/memoji-utils";
import { loadMemojis } from "@/lib/memoji-data";

interface SimpleMemojiPickerProps {
  onSelect: (memoji: Memoji) => void;
  selectedMemoji?: Memoji | null;
  className?: string;
}

const SimpleMemojiPicker: React.FC<SimpleMemojiPickerProps> = ({
  onSelect,
  selectedMemoji = null,
  className = "",
}) => {
  const [memojis, setMemojis] = useState<Memoji[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Load memojis on component mount
  useEffect(() => {
    const loadData = async () => {
      console.log("loadData");
      try {
        setLoading(true);

        // Try API route first, fallback to direct import
        try {
          const response = await fetch("/api/memojis");
          const result = await response.json();

          if (result.success && result.data.length > 0) {
            setMemojis(result.data);
            return;
          }
        } catch (apiError) {
          console.warn("API route failed, using direct import:", apiError);
        }

        // Fallback to direct import
        const data = await loadMemojis();
        setMemojis(data);
      } catch (err) {
        console.error("Error loading memojis:", err);
      } finally {
        setLoading(false);
      }
    };
    console.log("memojis", memojis);
    if (memojis && memojis.length > 0) {
      setLoading(false);
      return;
    }
    loadData();
  }, []);

  // Debounced search
  const debouncedSearch = useMemo(
    () => debounce((term: string) => setSearchTerm(term), 300),
    []
  );

  // Filter memojis
  const filteredMemojis = useMemo(() => {
    return memojis.filter((memoji) => {
      // Category filter
      if (selectedCategory !== "all" && memoji.category !== selectedCategory) {
        return false;
      }

      // Search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        return (
          memoji.name.toLowerCase().includes(searchLower) ||
          memoji.category.toLowerCase().includes(searchLower) ||
          memoji.tags.some((tag) => tag.toLowerCase().includes(searchLower))
        );
      }

      return true;
    });
  }, [memojis, searchTerm, selectedCategory]);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set(memojis.map((m) => m.category));
    return ["all", ...Array.from(cats)];
  }, [memojis]);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      debouncedSearch(e.target.value);
    },
    [debouncedSearch]
  );

  if (loading) {
    return (
      <div className={`flex items-center justify-center p-8 ${className}`}>
        <Loader2 className="w-6 h-6 animate-spin mr-2 text-muted-foreground" />
        <span className="text-muted-foreground">Loading memojis...</span>
      </div>
    );
  }

  return (
    <div
      className={`bg-card border border-border rounded-lg shadow-sm ${className}`}
    >
      {/* Header */}
      <div className="p-3 sm:p-4 border-b border-border">
        <h3 className="text-base sm:text-lg font-semibold text-card-foreground mb-3">
          Choose Memoji
        </h3>

        {/* Search */}
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <input
            type="text"
            placeholder="Search memojis..."
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2 text-sm sm:text-base bg-background border border-input rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors"
          />
        </div>

        {/* Categories - Horizontal scroll on mobile */}
        <div className="flex gap-2 overflow-x-auto pb-2 -mb-2 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1.5 text-xs sm:text-sm rounded-full border transition-all whitespace-nowrap flex-shrink-0 ${
                selectedCategory === category
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-card-foreground border-border hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              {category === "all"
                ? "All"
                : category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="p-3 sm:p-4">
        <div className="text-xs sm:text-sm text-muted-foreground mb-3">
          Showing {filteredMemojis.length} memojis
        </div>

        {filteredMemojis.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <div className="text-3xl sm:text-4xl mb-2">🔍</div>
            <p className="text-sm sm:text-base">No memojis found</p>
          </div>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 sm:gap-3 max-h-64 sm:max-h-80 md:max-h-96 overflow-y-auto">
            {filteredMemojis.map((memoji) => {
              const isSelected = selectedMemoji?.id === memoji.id;
              const imageUrl = getOptimizedMemojiUrl(memoji.fileName, {
                width: 80,
                height: 80,
                quality: "auto",
                format: "auto",
              });

              return (
                <button
                  key={memoji.id}
                  onClick={() => onSelect(memoji)}
                  className={`
                    relative group aspect-square p-1.5 sm:p-2 rounded-lg border-2 transition-all duration-200
                    ${
                      isSelected
                        ? "border-primary bg-accent shadow-md"
                        : "border-border hover:border-accent hover:shadow-sm hover:bg-accent/50"
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
                    <div className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 w-4 h-4 sm:w-5 sm:h-5 bg-primary rounded-full flex items-center justify-center">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary-foreground rounded-full" />
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
        <div className="p-3 sm:p-4 bg-accent border-t border-border">
          <div className="flex items-center gap-2 sm:gap-3">
            <img
              src={getOptimizedMemojiUrl(selectedMemoji.fileName, {
                width: 40,
                height: 40,
              })}
              alt={selectedMemoji.name}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-md flex-shrink-0"
            />
            <div className="min-w-0">
              <div className="font-medium text-accent-foreground text-sm sm:text-base truncate">
                {selectedMemoji.name.replace("memoji_", "Memoji ")}
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground capitalize truncate">
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
