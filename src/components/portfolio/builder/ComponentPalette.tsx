// components/portfolio/builder/ComponentPalette.tsx
import React, {
  useState,
  useMemo,
  useCallback,
  useRef,
  useEffect,
} from "react";
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
  Eye,
  Plus,
  Minus,
  Sparkles,
  X,
} from "lucide-react";
import {
  componentRegistry,
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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

// Lazy Image Component
const LazyImage: React.FC<{ src: string; alt: string; className?: string }> = ({
  src,
  alt,
  className,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [error, setError] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={imgRef} className={`relative ${className}`}>
      {isInView && !error ? (
        <img
          src={src}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setIsLoaded(true)}
          onError={() => setError(true)}
        />
      ) : null}

      {(!isInView || error || !isLoaded) && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center">
          <div className="w-8 h-8 bg-primary/60 rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-primary rounded" />
          </div>
        </div>
      )}
    </div>
  );
};
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
    item: () => ({
      type: { id: sectionId },
      variant,
      sectionId,
      componentId: `${sectionId}-${variant.id}-${Date.now()}`,
    }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [showPreviewDialog, setShowPreviewDialog] = useState(false);

  return (
    <>
      <div
        ref={drag as any}
        onClick={() => onSelect?.(variant)}
        className={`
          group relative bg-gradient-to-br from-card to-card/80 border border-border/60 rounded-xl p-3 
          cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 
          hover:border-primary/30 hover:-translate-y-0.5 active:scale-95
          ${isDragging ? "opacity-40 scale-95 rotate-2" : ""}
          ${
            variant.isPremium
              ? "ring-1 ring-amber-400/30 bg-gradient-to-br from-amber-50/50 to-card"
              : ""
          }
        `}
      >
        {/* Premium Badge */}
        {variant.isPremium && (
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg">
            <Sparkles className="w-3 h-3 text-white" />
          </div>
        )}

        {/* Component Preview - Lazy loaded */}
        <div className="w-full aspect-video bg-gradient-to-br from-muted/50 to-muted rounded-lg mb-3 overflow-hidden group-hover:scale-105 transition-transform duration-300">
          {variant.thumbnail ? (
            <LazyImage
              src={variant.thumbnail}
              alt={variant.name}
              className="w-full h-full"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center">
                <div className="w-5 h-5 bg-primary/60 rounded flex items-center justify-center">
                  <div className="w-2 h-2 bg-primary rounded-sm" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Component Info */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-sm text-foreground truncate pr-2">
              {variant.name}
            </h4>
            <Button
              size="sm"
              variant="ghost"
              className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-primary/10"
              onClick={(e) => {
                e.stopPropagation();
                setShowPreviewDialog(true);
              }}
            >
              <Eye className="w-3.5 h-3.5" />
            </Button>
          </div>

          <p className="text-xs text-muted-foreground line-clamp-2">
            {variant.description}
          </p>

          {/* Tags */}
          {variant.tags && variant.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {variant.tags.slice(0, 2).map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="text-xs px-1.5 py-0.5 h-auto"
                >
                  {tag}
                </Badge>
              ))}
              {variant.tags.length > 2 && (
                <Badge
                  variant="outline"
                  className="text-xs px-1.5 py-0.5 h-auto"
                >
                  +{variant.tags.length - 2}
                </Badge>
              )}
            </div>
          )}
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none">
          <div className="absolute bottom-2 left-2 right-2">
            <div className="bg-background/90 backdrop-blur-sm rounded-lg px-2 py-1 text-xs font-medium text-center shadow-lg border border-border/50">
              Click to add or drag
            </div>
          </div>
        </div>
      </div>

      {/* Preview Dialog */}
      <Dialog open={showPreviewDialog} onOpenChange={setShowPreviewDialog}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {variant.isPremium && (
                <div className="w-5 h-5 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full flex items-center justify-center">
                  <Sparkles className="w-3 h-3 text-white" />
                </div>
              )}
              {variant.name}
            </DialogTitle>
            <DialogDescription className="text-sm leading-relaxed">
              {variant.description}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Large Preview - Lazy loaded */}
            <div className="aspect-video bg-gradient-to-br from-muted/50 to-muted rounded-xl overflow-hidden border border-border/50">
              {variant.thumbnail ? (
                <LazyImage
                  src={variant.thumbnail}
                  alt={variant.name}
                  className="w-full h-full"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center">
                    <div className="w-10 h-10 bg-primary/60 rounded-xl" />
                  </div>
                </div>
              )}
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-sm mb-2 text-foreground">
                    Category
                  </h4>
                  <Badge variant="outline" className="capitalize">
                    {variant.category}
                  </Badge>
                </div>

                {variant.tags && variant.tags.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-sm mb-2 text-foreground">
                      Tags
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {variant.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                {variant.isPopular && (
                  <div className="flex items-center gap-2 text-sm">
                    <div className="p-1 bg-primary/10 rounded-full">
                      <Star className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-foreground font-medium">
                      Popular component
                    </span>
                  </div>
                )}

                {variant.isPremium && (
                  <div className="flex items-center gap-2 text-sm">
                    <div className="p-1 bg-gradient-to-r from-amber-400/20 to-orange-400/20 rounded-full">
                      <Sparkles className="w-4 h-4 text-amber-600" />
                    </div>
                    <span className="text-foreground font-medium">
                      Premium component
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4 border-t border-border/50">
              <Button
                onClick={() => {
                  setShowPreviewDialog(false);
                  onSelect?.(variant);
                }}
                className="flex-1 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Component
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowPreviewDialog(false)}
                className="px-6"
              >
                <X className="w-4 h-4 mr-2" />
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

// Modern Section Group
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
  const section = componentRegistry[sectionId];
  const sectionComponents = section?.variants || [];

  const filteredVariants = useMemo(() => {
    let variants = sectionComponents;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      variants = variants.filter(
        (variant) =>
          variant.name.toLowerCase().includes(query) ||
          variant.description.toLowerCase().includes(query) ||
          variant.tags?.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    if (activeFilter !== "all" && activeFilter !== "popular") {
      variants = variants.filter(
        (variant) => variant.category === activeFilter
      );
    }

    if (activeFilter === "popular") {
      variants = variants.filter((variant) => variant.isPopular);
    }

    return variants;
  }, [sectionComponents, searchQuery, activeFilter]);

  if (filteredVariants.length === 0) return null;

  return (
    <div className="mb-1">
      <button
        onClick={onToggle}
        className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 group
          ${
            isExpanded
              ? "bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 shadow-sm"
              : "hover:bg-muted/50"
          }`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`p-1.5 rounded-lg transition-colors duration-200
            ${
              isExpanded
                ? "bg-primary/20"
                : "bg-muted/80 group-hover:bg-primary/10"
            }`}
          >
            <div className="w-4 h-4 bg-primary/60 rounded" />
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-sm text-foreground">
              {section?.name || sectionId}
            </h3>
            <p className="text-xs text-muted-foreground">
              {filteredVariants.length} component
              {filteredVariants.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
        <div
          className={`p-1 rounded-full transition-all duration-200
          ${isExpanded ? "bg-primary/20 rotate-180" : "group-hover:bg-muted"}`}
        >
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </div>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-out
        ${
          isExpanded ? "max-h-[2000px] opacity-100 mt-2" : "max-h-0 opacity-0"
        }`}
      >
        <div className="grid grid-cols-1 gap-3 px-1">
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
  );
};

// Main Component Palette - Ultra Modern
export const ComponentPalette: React.FC<ComponentPaletteProps> = ({
  onComponentSelect,
  className = "",
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [expandedSections, setExpandedSections] = useState<Set<SectionType>>(
    new Set(["hero", "about", "projects"])
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
  }, []);

  const expandAll = () =>
    setExpandedSections(
      new Set(Object.keys(componentRegistry) as SectionType[])
    );
  const collapseAll = () => setExpandedSections(new Set());

  const uniqueCategories = useMemo(() => {
    const categories = new Set<string>();
    Object.values(componentRegistry).forEach((section) => {
      section.variants.forEach((variant) => categories.add(variant.category));
    });
    return Array.from(categories).sort();
  }, []);

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

  const activeFilterOption = filterOptions.find(
    (option) => option.value === activeFilter
  );

  const popularVariants = useMemo(() => {
    const allVariants = Object.values(componentRegistry).flatMap(
      (section) => section.variants
    );
    return allVariants
      .filter((variant) => variant.isPopular)
      .slice(0, 6)
      .map((variant) => {
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
      className={`bg-gradient-to-b from-background to-background/95 flex flex-col h-full ${className}`}
    >
      {/* Modern Header */}
      <div className="p-4 border-b border-border/50 bg-card/50 backdrop-blur-sm">
        {/* Search Bar */}
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search components..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-9 bg-background/50 border-border/50 focus:bg-background transition-colors"
          />
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 h-8 justify-start bg-background/50"
              >
                <Filter className="w-3.5 h-3.5 mr-2" />
                <span className="truncate">{activeFilterOption?.label}</span>
                <ChevronDown className="w-3 h-3 ml-auto opacity-50" />
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
                      activeFilter === option.value
                        ? "bg-primary/10 text-primary"
                        : ""
                    }
                  >
                    <Icon className="w-4 h-4 mr-3" />
                    {option.label}
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="outline"
            size="sm"
            onClick={expandAll}
            className="h-8 w-8 p-0 bg-background/50"
            title="Expand all"
          >
            <Plus className="w-3.5 h-3.5" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={collapseAll}
            className="h-8 w-8 p-0 bg-background/50"
            title="Collapse all"
          >
            <Minus className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      {/* Popular Section */}
      {(activeFilter === "popular" || activeFilter === "all") &&
        !searchQuery.trim() && (
          <div className="p-4 bg-gradient-to-br from-primary/5 to-transparent border-b border-border/30">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1 bg-primary/20 rounded-lg">
                <Star className="w-4 h-4 text-primary" />
              </div>
              <h3 className="font-semibold text-sm text-foreground">Popular</h3>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {popularVariants.slice(0, 3).map(({ variant, sectionId }) => (
                <DraggableComponent
                  key={variant.id}
                  variant={variant}
                  sectionId={sectionId}
                  onSelect={onComponentSelect}
                />
              ))}
            </div>
          </div>
        )}

      {/* Component Sections */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-border/50 scrollbar-track-transparent">
        <div className="p-4 space-y-2">
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
    </div>
  );
};

export default ComponentPalette;
