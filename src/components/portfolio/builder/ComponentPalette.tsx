// components/portfolio/builder/ComponentPalette.tsx
import React, { useState, useMemo, useCallback } from "react";
import { useDrag } from "react-dnd";
import {
  Search,
  Grid,
  Layout,
  Type,
  Image,
  FileText,
  Star,
  ChevronDown,
  ChevronRight,
  Filter,
} from "lucide-react";
import {
  componentRegistry,
  getPopularVariants,
  getVariantsByCategory,
  searchVariants,
  ComponentVariant,
  SectionType,
} from "@/lib/portfolio/registry";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ComponentPaletteProps {
  onComponentSelect?: (variant: ComponentVariant) => void;
  className?: string;
}

type FilterType =
  | "all"
  | "popular"
  | "layout"
  | "content"
  | "media"
  | "form"
  | string;

// Draggable Component Item
interface DraggableComponentProps {
  variant: ComponentVariant;
  sectionId: SectionType;
  onSelect?: (variant: ComponentVariant) => void;
}

const DraggableComponent: React.FC<DraggableComponentProps> = ({
  variant,
  sectionId,
  onSelect,
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "component",
    item: () => {
      return {
        type: { id: sectionId },
        variant,
        sectionId,
        componentId: `${sectionId}-${variant.id}-${Date.now()}`,
      };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const handleClick = () => {
    if (onSelect) {
      onSelect(variant);
    }
  };

  return (
    <div
      ref={drag}
      onClick={handleClick}
      className={`
        group relative bg-card border border-border rounded-lg p-3 cursor-pointer transition-all duration-200 hover:shadow-md hover:border-primary/50
        ${isDragging ? "opacity-50 scale-95" : ""}
        ${variant.isPremium ? "ring-1 ring-yellow-400/50" : ""}
      `}
    >
      {/* Component Thumbnail */}
      <div className="aspect-video bg-muted rounded-md mb-2 flex items-center justify-center overflow-hidden">
        {variant.thumbnail ? (
          <img
            src={variant.thumbnail}
            alt={variant.name}
            className="w-full h-full object-fill rounded-xl shadow"
          />
        ) : (
          <div className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center">
            <div className="w-4 h-4 bg-primary rounded" />
          </div>
        )}
      </div>

      {/* Component Info */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium text-foreground truncate">
            {variant.name}
          </h4>
          {variant.isPremium && (
            <div className="w-3 h-3 text-yellow-500 flex-shrink-0">★</div>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {variant.tags?.slice(0, 2).map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="text-xs px-1 py-0 h-4"
            >
              {tag}
            </Badge>
          ))}
          {variant.tags && variant.tags.length > 2 && (
            <Badge variant="outline" className="text-xs px-1 py-0 h-4">
              +{variant.tags.length - 2}
            </Badge>
          )}
        </div>
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
        <div className="bg-background/90 backdrop-blur-sm rounded px-2 py-1 text-xs font-medium">
          Drag to add
        </div>
      </div>
    </div>
  );
};

// Section Group Component
interface SectionGroupProps {
  sectionId: SectionType;
  isExpanded: boolean;
  onToggle: () => void;
  onComponentSelect?: (variant: ComponentVariant) => void;
  searchQuery: string;
  activeFilter: FilterType;
}

const SectionGroup: React.FC<SectionGroupProps> = ({
  sectionId,
  isExpanded,
  onToggle,
  onComponentSelect,
  searchQuery,
  activeFilter,
}) => {
  // Get section data from registry
  const section = componentRegistry[sectionId];

  // Get components for this section
  const sectionComponents = useMemo(() => {
    return section?.variants || [];
  }, [section]);

  // Filter variants based on search and filter
  const filteredVariants = useMemo(() => {
    let variants = sectionComponents;

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      variants = variants.filter(
        (variant) =>
          variant.name.toLowerCase().includes(query) ||
          variant.description.toLowerCase().includes(query) ||
          variant.tags?.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // Apply category filter
    if (activeFilter !== "all" && activeFilter !== "popular") {
      variants = variants.filter(
        (variant) => variant.category === activeFilter
      );
    }

    // Apply popular filter
    if (activeFilter === "popular") {
      variants = variants.filter((variant) => variant.isPopular);
    }

    return variants;
  }, [sectionComponents, searchQuery, activeFilter, sectionId]);

  if (filteredVariants.length === 0) {
    return null;
  }

  return (
    <div className="border-b border-border">
      <button
        onClick={() => {
          onToggle();
        }}
        className={`w-full flex items-center justify-between p-3 text-left transition-colors ${
          isExpanded
            ? "bg-primary/10 border-l-4 border-primary"
            : "hover:bg-muted"
        }`}
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
            {/* Icon based on section type */}
            <div className="w-4 h-4 bg-primary rounded flex items-center justify-center text-background text-xs font-bold">
              {sectionId.charAt(0).toUpperCase()}
            </div>
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-sm text-foreground">
              {section?.name || sectionId}
            </h3>
            <p className="text-xs text-muted-foreground">
              {filteredVariants.length} component
              {filteredVariants.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
        {isExpanded ? (
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        ) : (
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        )}
      </button>

      <div
        className={`overflow-auto transition-all duration-200 ease-in-out ${
          isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="p-3 bg-muted/50">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
            {filteredVariants.map((variant) => (
              <DraggableComponent
                key={variant.id}
                variant={variant}
                sectionId={sectionId}
                onSelect={onComponentSelect}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Component Palette
export const ComponentPalette: React.FC<ComponentPaletteProps> = ({
  onComponentSelect,
  className = "",
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [expandedSections, setExpandedSections] = useState<Set<SectionType>>(
    new Set(["hero", "about", "projects"]) // Default expanded sections
  );

  const toggleSection = useCallback((sectionId: SectionType) => {
    setExpandedSections((prev) => {
      const newExpanded = new Set(prev);
      if (newExpanded.has(sectionId)) {
        newExpanded.delete(sectionId);
      } else {
        newExpanded.add(sectionId);
      }
      return newExpanded;
    });
  }, []); // Removed expandedSections dependency to prevent infinite re-renders

  const expandAll = useCallback(() => {
    const allSections = Object.keys(componentRegistry) as SectionType[];
    setExpandedSections(new Set(allSections));
  }, []);

  const collapseAll = useCallback(() => {
    setExpandedSections(new Set());
  }, []);

  // Get unique categories from registry - memoized to prevent infinite re-renders
  const uniqueCategories = useMemo(() => {
    const categories = new Set<string>();
    Object.values(componentRegistry).forEach((section) => {
      section.variants.forEach((variant) => {
        categories.add(variant.category);
      });
    });
    const sortedCategories = Array.from(categories).sort();
    return sortedCategories;
  }, []); // Empty dependency array since componentRegistry is static

  const filterOptions = useMemo(
    () => [
      { value: "all" as FilterType, label: "All", icon: Grid },
      { value: "popular" as FilterType, label: "Popular", icon: Star },
      ...uniqueCategories.map((category) => ({
        value: category as FilterType,
        label: category.charAt(0).toUpperCase() + category.slice(1),
        icon:
          category === "layout"
            ? Layout
            : category === "content"
            ? Type
            : category === "media"
            ? Image
            : category === "form"
            ? FileText
            : Grid,
      })),
    ],
    [uniqueCategories]
  );

  const activeFilterOption = useMemo(
    () => filterOptions.find((option) => option.value === activeFilter),
    [filterOptions, activeFilter]
  );

  // Memoize popular variants to prevent re-renders
  const popularVariants = useMemo(() => {
    const allVariants = Object.values(componentRegistry).flatMap(
      (section) => section.variants
    );
    const popular = allVariants.filter((variant) => variant.isPopular);
    return popular.slice(0, 4).map((variant) => {
      const sectionId = Object.keys(componentRegistry).find((key) =>
        componentRegistry[key as SectionType].variants.some(
          (v) => v.id === variant.id
        )
      ) as SectionType;
      return { variant, sectionId: sectionId || "custom" };
    });
  }, []);

  return (
    <div
      className={`bg-background border-r border-border flex flex-col h-full min-h-0 ${className}`}
    >
      {/* Header */}
      <div className="p-4 border-b border-border">
        {/* Search */}
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filters and Actions */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex-1">
                <Filter className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">
                  {activeFilterOption?.label}
                </span>
                <span className="sm:hidden">Filter</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              {filterOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <DropdownMenuItem
                    key={option.value}
                    onClick={() => setActiveFilter(option.value)}
                    className={
                      activeFilter === option.value ? "bg-primary/10" : ""
                    }
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {option.label}
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={expandAll}
              className={`px-2 text-xs flex-1 sm:flex-none ${
                expandedSections.size === Object.keys(componentRegistry).length
                  ? "bg-primary/10 text-primary"
                  : ""
              }`}
            >
              <span className="hidden sm:inline">Expand</span>
              <span className="sm:hidden">+</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={collapseAll}
              className={`px-2 text-xs flex-1 sm:flex-none ${
                expandedSections.size === 0 ? "bg-primary/10 text-primary" : ""
              }`}
            >
              <span className="hidden sm:inline">Collapse</span>
              <span className="sm:hidden">-</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Popular Components Quick Access */}
      {activeFilter === "popular" && !searchQuery.trim() && (
        <div className="p-4 bg-primary/5 border-b border-border">
          <h3 className="text-sm font-medium text-foreground mb-2 flex items-center gap-1">
            <Star className="w-4 h-4 text-primary" />
            <span className="hidden sm:inline">Popular</span>
            <span className="sm:hidden">Popular</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {popularVariants.map(({ variant, sectionId }) => (
              <div key={variant.id} className="text-center">
                <DraggableComponent
                  variant={variant}
                  sectionId={sectionId}
                  onSelect={onComponentSelect}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Component Sections */}
      <div className="flex-1 overflow-y-auto min-h-0">
        <div className="pb-4">
          {(Object.keys(componentRegistry) as SectionType[]).map(
            (sectionId) => (
              <SectionGroup
                key={sectionId}
                sectionId={sectionId}
                isExpanded={expandedSections.has(sectionId)}
                onToggle={() => toggleSection(sectionId)}
                onComponentSelect={onComponentSelect}
                searchQuery={searchQuery}
                activeFilter={activeFilter}
              />
            )
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-border bg-muted">
        <div className="text-xs text-muted-foreground text-center">
          <p className="hidden sm:block">Drag to add components</p>
          <p className="sm:hidden">Tap to add components</p>
          <p className="mt-1 text-muted-foreground">Built-in components</p>
        </div>
      </div>
    </div>
  );
};

export default ComponentPalette;
