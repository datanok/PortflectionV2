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
  Crown,
  ChevronDown,
  ChevronRight,
  Filter,
} from "lucide-react";
import {
  componentRegistry,
  getPopularVariants,
  getVariantsByCategory,
  searchVariants,
} from "@/lib/portfolio/registry";
import { ComponentVariant, SectionType } from "@/lib/portfolio/registry";
import {
  getHybridComponentsForSection,
  getAllHybridComponents,
  searchHybridComponents,
  getPopularHybridComponents,
  isMarketplaceComponent,
  getComponentDisplayName,
  getComponentThumbnail,
  getComponentDescription,
  getComponentTags,
  isComponentPopular,
  isComponentPremium,
  type HybridComponentVariant,
  type MarketplaceComponentVariant,
} from "@/lib/portfolio/hybrid-registry";
import {
  useInstalledComponents,
  useMarketplaceComponents,
} from "@/components/LiveMarketplaceComponent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ComponentPaletteProps {
  onComponentSelect?: (variant: HybridComponentVariant) => void;
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
  variant: HybridComponentVariant;
  sectionId: SectionType;
  onSelect?: (variant: HybridComponentVariant) => void;
}

const DraggableComponent: React.FC<DraggableComponentProps> = ({
  variant,
  sectionId,
  onSelect,
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "component",
    item: () => {
      console.log("Drag started for:", getComponentDisplayName(variant));
      return {
        type: { id: sectionId },
        variant,
        sectionId,
        componentId: `${sectionId}-${variant.id}-${Date.now()}`,
        isMarketplace: isMarketplaceComponent(variant),
      };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const handleClick = useCallback(() => {
    onSelect?.(variant);
  }, [onSelect, variant]);

  return (
    <div
      ref={drag as any}
      onClick={handleClick}
      className={`
        group relative cursor-move p-2 sm:p-3 border rounded-lg transition-all duration-200 hover:shadow-md
        ${isDragging ? "opacity-50 scale-95" : "opacity-100 scale-100"}
        ${
          variant.isPopular
            ? "border-primary/30 bg-primary/10"
            : "border-border bg-card"
        }
        hover:border-primary hover:bg-primary/5
      `}
    >
      {/* Thumbnail */}
      <div className="relative mb-2 rounded-md overflow-hidden bg-muted aspect-video">
        <img
          src={getComponentThumbnail(variant)}
          alt={getComponentDisplayName(variant)}
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback to placeholder
            e.currentTarget.src = `https://placehold.co/200x120/e2e8f0/64748b?text=${encodeURIComponent(
              getComponentDisplayName(variant)
            )}`;
          }}
        />

        {/* Overlay with badges */}
        <div className="absolute top-2 left-2 flex gap-1">
          {isComponentPopular(variant) && (
            <Badge className="bg-primary/10 text-primary text-xs">
              <Star className="w-3 h-3 mr-1" />
              Popular
            </Badge>
          )}
          {isComponentPremium(variant) && (
            <Badge className="bg-secondary/10 text-secondary text-xs">
              <Crown className="w-3 h-3 mr-1" />
              Pro
            </Badge>
          )}
          {isMarketplaceComponent(variant) && (
            <Badge className="bg-green-500/10 text-green-500 text-xs">
              Community
            </Badge>
          )}
        </div>
      </div>

      {/* Component Info */}
      <div className="space-y-1 sm:space-y-2">
        <h4 className="font-medium text-xs sm:text-sm text-foreground group-hover:text-primary line-clamp-1">
          {getComponentDisplayName(variant)}
        </h4>
        <p className="text-xs text-muted-foreground line-clamp-2 hidden sm:block">
          {getComponentDescription(variant)}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {getComponentTags(variant)
            .slice(0, 2)
            .map((tag) => (
              <span
                key={tag}
                className="px-1 sm:px-2 py-0.5 sm:py-1 bg-muted text-muted-foreground text-xs rounded-md"
              >
                {tag}
              </span>
            ))}
          {getComponentTags(variant).length > 2 && (
            <span className="px-1 sm:px-2 py-0.5 sm:py-1 bg-muted text-muted-foreground text-xs rounded-md">
              +{getComponentTags(variant).length - 2}
            </span>
          )}
        </div>
      </div>

      {/* Drag indicator */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="bg-foreground/20 text-background px-2 py-1 rounded text-xs">
          Drag
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
  onComponentSelect?: (variant: HybridComponentVariant) => void;
  searchQuery: string;
  activeFilter: FilterType;
  marketplaceComponents?: MarketplaceComponentVariant[];
}

const SectionGroup: React.FC<SectionGroupProps> = ({
  sectionId,
  isExpanded,
  onToggle,
  onComponentSelect,
  searchQuery,
  activeFilter,
  marketplaceComponents = [],
}) => {
  // Get section data from registry
  const section = componentRegistry[sectionId];

  // Get components for this section (both static and marketplace)
  const sectionComponents = useMemo(() => {
    return getHybridComponentsForSection(sectionId, marketplaceComponents);
  }, [sectionId, marketplaceComponents]);

  // Filter variants based on search and filter
  const filteredVariants = useMemo(() => {
    let variants = sectionComponents;
    console.log(
      `Section ${sectionId}: Starting with ${variants.length} variants`
    );

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      variants = variants.filter(
        (variant) =>
          getComponentDisplayName(variant).toLowerCase().includes(query) ||
          getComponentDescription(variant).toLowerCase().includes(query) ||
          getComponentTags(variant).some((tag) =>
            tag.toLowerCase().includes(query)
          )
      );
      console.log(
        `Section ${sectionId}: After search filter: ${variants.length} variants`
      );
    }

    // Apply category filter
    if (activeFilter !== "all" && activeFilter !== "popular") {
      variants = variants.filter(
        (variant) => getComponentCategory(variant) === activeFilter
      );
      console.log(
        `Section ${sectionId}: After category filter (${activeFilter}): ${variants.length} variants`
      );
    }

    // Apply popular filter
    if (activeFilter === "popular") {
      variants = variants.filter((variant) => isComponentPopular(variant));
      console.log(
        `Section ${sectionId}: After popular filter: ${variants.length} variants`
      );
    }

    console.log(
      `Section ${sectionId}: Final filtered variants:`,
      variants.map((v) => ({
        name: v.name,
        category: v.category,
        isPopular: v.isPopular,
      }))
    );
    return variants;
  }, [sectionComponents, searchQuery, activeFilter, sectionId]);

  if (filteredVariants.length === 0) {
    return null;
  }

  return (
    <div className="border-b border-border">
      <button
        onClick={() => {
          console.log(
            "Section button clicked:",
            sectionId,
            "isExpanded:",
            isExpanded
          );
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
              {filteredVariants.length} variant
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

  // Fetch both installed and all marketplace components
  const { installedComponents, loading: installedLoading } =
    useInstalledComponents();
  const { marketplaceComponents, loading: marketplaceLoading } =
    useMarketplaceComponents();

  const toggleSection = useCallback((sectionId: SectionType) => {
    console.log(
      "Toggling section:",
      sectionId,
      "Current expanded:",
      Array.from(expandedSections)
    );
    setExpandedSections((prev) => {
      const newExpanded = new Set(prev);
      if (newExpanded.has(sectionId)) {
        newExpanded.delete(sectionId);
      } else {
        newExpanded.add(sectionId);
      }
      console.log("New expanded sections:", Array.from(newExpanded));
      return newExpanded;
    });
  }, []); // Removed expandedSections dependency to prevent infinite re-renders

  const expandAll = useCallback(() => {
    console.log("Expanding all sections");
    const allSections = Object.keys(componentRegistry) as SectionType[];
    console.log("All sections:", allSections);
    setExpandedSections(new Set(allSections));
  }, []);

  const collapseAll = useCallback(() => {
    console.log("Collapsing all sections");
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
    console.log("Available categories:", sortedCategories);
    return sortedCategories;
  }, []); // Empty dependency array since componentRegistry is static

  const filterOptions = useMemo(
    () => [
      { value: "all" as FilterType, label: "All Components", icon: Grid },
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
    const variants = getPopularHybridComponents(marketplaceComponents);
    console.log(
      "Popular hybrid variants:",
      variants.map((v) => ({
        name: getComponentDisplayName(v),
        isPopular: isComponentPopular(v),
      }))
    );
    return variants.slice(0, 4).map((variant) => {
      const sectionId = Object.keys(componentRegistry).find((key) =>
        getHybridComponentsForSection(
          key as SectionType,
          marketplaceComponents
        ).some((v) => v.id === variant.id)
      ) as SectionType;
      return { variant, sectionId: sectionId || "custom" };
    });
  }, [marketplaceComponents]);

  // Memoize debug info to prevent re-renders
  const debugInfo = useMemo(() => {
    const sectionCount = Object.keys(componentRegistry).length;
    const componentCount = Object.values(componentRegistry).reduce(
      (total, section) => total + section.variants.length,
      0
    );
    return { sectionCount, componentCount };
  }, []);

  return (
    <div
      className={`bg-background border-r border-border flex flex-col h-full min-h-0 ${className}`}
    >
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground mb-3 hidden lg:block">
          Components
        </h2>

        {/* Search */}
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search components..."
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
            <span className="hidden sm:inline">Popular Components</span>
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
        {/* Debug info - remove in production */}
        <div className="px-4 py-2 text-xs text-muted-foreground border-b border-border bg-card sticky top-0 z-10">
          {debugInfo.sectionCount} sections, {debugInfo.componentCount}{" "}
          components available
        </div>

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
                marketplaceComponents={marketplaceComponents}
              />
            )
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-border bg-muted">
        <div className="text-xs text-muted-foreground text-center">
          <p className="hidden sm:block">Drag components to the canvas</p>
          <p className="sm:hidden">Tap to add components</p>
          <p className="mt-1 text-muted-foreground">
            Built-in + {installedComponents.length} installed components
          </p>
        </div>
      </div>
    </div>
  );
};

export default ComponentPalette;
