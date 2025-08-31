import React, { useState, useEffect, useCallback } from "react";
import {
  Save,
  Loader2,
  Settings,
  Palette,
  Menu,
  X,
  Sparkles,
  Type,
  Layers,
  Monitor,
  Smartphone,
  Tablet,
  Monitor as MonitorIcon,
} from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// Import your existing components (assuming they exist)
import {
  componentRegistry,
  ComponentVariant,
  SectionType,
} from "@/lib/portfolio/registry";
import BulkStyleModal from "./BulkStyleModal";
import PropertyPanel from "./PropertyPanel";
import ComponentPalette from "./ComponentPalette";
import DropCanvas from "./DropCanvas";
import {
  savePortfolio,
  updatePortfolio,
  PortfolioComponent,
} from "@/actions/portfolio-actions";
import { PortfolioComponent as TypesPortfolioComponent } from "@/lib/portfolio/types";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

// Simplified types
interface Portfolio {
  id?: string;
  name: string;
  slug: string;
  description?: string;
  components: PortfolioComponent[];
  isPublic: boolean;
}

interface EditorProps {
  portfolioId?: string;
  initialData?: Portfolio;
}

type PanelType = "components" | "canvas" | "Edit";
type PropertyTab = "content" | "style" | "advanced";

// Custom hooks for better separation of concerns
const useResponsive = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth < 768);
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return { isMobile };
};

const usePortfolioState = (initialData?: Portfolio) => {
  const [components, setComponents] = useState<PortfolioComponent[]>(
    initialData?.components || []
  );
  const [name, setName] = useState(initialData?.name || "Untitled Portfolio");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [isPublic, setIsPublic] = useState(initialData?.isPublic || false);

  return {
    components,
    setComponents,
    name,
    setName,
    slug,
    setSlug,
    isPublic,
    setIsPublic,
  };
};

export default function PortfolioEditor({
  portfolioId,
  initialData,
}: EditorProps) {
  const router = useRouter();
  const { isMobile } = useResponsive();

  // Portfolio state
  const {
    components,
    setComponents,
    name,
    setName,
    slug,
    setSlug,
    isPublic,
    setIsPublic,
  } = usePortfolioState(initialData);

  // UI state
  const [selectedComponent, setSelectedComponent] =
    useState<PortfolioComponent | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [activePanel, setActivePanel] = useState<PanelType>("canvas");
  const [activePropertyTab, setActivePropertyTab] =
    useState<PropertyTab>("content");
  const [isComponentPaletteOpen, setIsComponentPaletteOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [deviceSize, setDeviceSize] = useState<"mobile" | "tablet" | "desktop">(
    "desktop"
  );
  const [canvasZoom, setCanvasZoom] = useState(1);

  useEffect(() => {
    if (isMobile) {
      if (activePanel === "components") {
        setIsMobileSidebarOpen(true);
      } else {
        setIsMobileSidebarOpen(false);
      }
    }
  }, [activePanel, isMobile]);

  // Component management
  const createComponent = useCallback(
    (variant: ComponentVariant): PortfolioComponent => {
      // Find section type for variant
      let sectionType: SectionType = "hero";
      for (const [sectionId, section] of Object.entries(componentRegistry)) {
        if (section.variants.some((v) => v.id === variant.id)) {
          sectionType = sectionId as SectionType;
          break;
        }
      }

      return {
        id: uuidv4(),
        type: sectionType,
        variant: variant.id,
        props: variant.defaultProps || {},
        styles: variant.defaultStyles || {},
        order: components.length,
        isActive: true,
      };
    },
    [components.length]
  );

  const handleAddComponent = useCallback(
    (variant: ComponentVariant) => {
      const newComponent = createComponent(variant);
      setComponents((prev) => [...prev, newComponent]);
      setSelectedComponent(newComponent);

      if (isMobile) {
        setActivePanel("canvas");
        setIsMobileSidebarOpen(false);
      }

      toast.success(`Added ${variant.name}`);
    },
    [createComponent, isMobile]
  );

  const handleUpdateComponent = useCallback(
    (id: string, updates: Partial<PortfolioComponent>) => {
      setComponents((prev) =>
        prev.map((comp) => (comp.id === id ? { ...comp, ...updates } : comp))
      );

      setSelectedComponent((prev) =>
        prev?.id === id ? { ...prev, ...updates } : prev
      );
    },
    []
  );

  const handleDeleteComponent = useCallback(
    (id: string) => {
      setComponents((prev) => prev.filter((comp) => comp.id !== id));
      if (selectedComponent?.id === id) {
        setSelectedComponent(null);
      }
      toast.success("Component removed");
    },
    [selectedComponent?.id]
  );

  const handleMoveComponent = useCallback(
    (id: string, direction: "up" | "down") => {
      setComponents((prev) => {
        const index = prev.findIndex((comp) => comp.id === id);
        if (index === -1) return prev;

        const newComponents = [...prev];
        const targetIndex = direction === "up" ? index - 1 : index + 1;

        if (targetIndex >= 0 && targetIndex < newComponents.length) {
          [newComponents[index], newComponents[targetIndex]] = [
            newComponents[targetIndex],
            newComponents[index],
          ];
        }

        return newComponents.map((comp, i) => ({ ...comp, order: i }));
      });
    },
    []
  );

  const handleDuplicateComponent = useCallback(
    (component: PortfolioComponent) => {
      const duplicated = {
        ...component,
        id: uuidv4(),
        order: components.length,
      };

      setComponents((prev) => [...prev, duplicated]);
      setSelectedComponent(duplicated);

      if (isMobile) {
        setActivePanel("Edit");
      }

      toast.success("Component duplicated");
    },
    [components.length, isMobile]
  );

  const handleSelectComponent = useCallback(
    (component: PortfolioComponent | null) => {
      setSelectedComponent(component);

      if (component) {
        setIsComponentPaletteOpen(false);
        if (isMobile) {
          setActivePanel("Edit");
        }
      }
    },
    [isMobile]
  );

  // Save portfolio
  const handleSave = useCallback(async () => {
    if (components.length === 0) {
      toast.error("Please add at least one component");
      return;
    }

    if (!name.trim()) {
      toast.error("Please enter a portfolio name");
      return;
    }

    setIsSaving(true);

    try {
      const portfolioData = {
        name,
        slug:
          slug ||
          name
            .toLowerCase()
            .replace(/[^a-z0-9-]/g, "-")
            .replace(/-+/g, "-"),
        description: "Portfolio created with Portflection",
        layout: components.map((comp, index) => ({
          ...comp,
          order: index,
        })),
        isPublic,
        portfolioType: "developer" as const,
      };

      if (portfolioId) {
        await updatePortfolio({ id: portfolioId, ...portfolioData });
        toast.success("Portfolio updated!");
      } else {
        const result = await savePortfolio(portfolioData);
        toast.success("Portfolio saved!");
        router.push(`/dashboard/portfolios/edit/${result.data.id}`);
      }
    } catch (error) {
      console.error("Save error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to save");
    } finally {
      setIsSaving(false);
    }
  }, [components, name, slug, isPublic, portfolioId, router]);

  // Property tabs configuration
  const propertyTabs = [
    { tab: "content" as const, Icon: Type, label: "Content" },
    { tab: "style" as const, Icon: Palette, label: "Style" },
    { tab: "advanced" as const, Icon: Settings, label: "Advanced" },
  ];

  // Mobile navigation configuration
  const mobileNavItems = [
    { id: "components", label: "Components", icon: Layers },
    { id: "canvas", label: "Canvas", icon: Monitor },
    {
      id: "Edit",
      label: "Edit",
      icon: Settings,
      disabled: !selectedComponent,
    },
  ];

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col h-screen bg-background w-full overflow-hidden">
        {/* Enhanced Header with Bulk Editor */}
        <div className="border-b border-border bg-card flex-shrink-0">
          {/* Mobile Header */}
          <div className="md:hidden flex items-center justify-between p-3">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
              >
                {isMobileSidebarOpen ? (
                  <X className="w-4 h-4" />
                ) : (
                  <Menu className="w-4 h-4" />
                )}
              </Button>
              <input
                type="text"
                value={portfolioName}
                onChange={(e) => setPortfolioName(e.target.value)}
                className="text-sm font-medium bg-transparent border-none outline-none text-foreground flex-1 min-w-0"
                placeholder="Portfolio Name"
              />
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2 shrink-0">
              {isMobile ? (
                /* Mobile: Save button only */
                <Button
                  onClick={handleSave}
                  disabled={isSaving}
                  size="sm"
                  className="gap-1 sm:gap-2 px-2 sm:px-3"
                >
                  {isSaving ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  <span className="hidden xs:inline">
                    {isSaving ? "Saving..." : "Save"}
                  </span>
                </Button>
              ) : (
                /* Desktop: Bulk + Save */
                <>
                  <BulkStyleModal
                    components={components}
                    onUpdateComponents={(updates) =>
                      setComponents((prev) =>
                        prev.map((comp) => ({
                          ...comp,
                          styles: { ...comp.styles, ...updates.styles },
                        }))
                      )
                    }
                    trigger={
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1 sm:gap-2 px-2 sm:px-3"
                      >
                        <Sparkles className="w-4 h-4" />
                        <span className="hidden md:inline">Bulk</span>
                      </Button>
                    }
                  />

                  <Button
                    onClick={handleSave}
                    disabled={isSaving}
                    size="sm"
                    className="gap-1 sm:gap-2 px-2 sm:px-3"
                  >
                    {isSaving ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    <span className="hidden sm:inline">
                      {isSaving ? "Saving..." : "Save"}
                    </span>
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Desktop Header */}
          <div className="hidden md:flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
              <input
                type="text"
                value={portfolioName}
                onChange={(e) => setPortfolioName(e.target.value)}
                className="text-xl font-semibold bg-transparent border-none outline-none text-foreground"
                placeholder="Portfolio Name"
              />
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isPublic"
                  checked={isPublic}
                  onChange={(e) => setIsPublic(e.target.checked)}
                  className="rounded border-border"
                />
                <label
                  htmlFor="isPublic"
                  className="text-sm text-muted-foreground"
                >
                  Public
                </label>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <BulkStyleModal
                components={components.map(adaptToTypesComponent)}
                onUpdateComponents={(updates) => {
                  const updatedComponents = components.map((comp) => ({
                    ...comp,
                    styles: {
                      ...comp.styles,
                      ...updates.styles,
                    },
                  }));
                  setComponents(updatedComponents);
                }}
                trigger={
                  <Button variant="outline" size="sm" className="gap-2">
                    <Sparkles className="w-4 h-4" />
                    Bulk Style
                  </Button>
                }
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsPreviewOpen(true)}
              >
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                {isSaving ? "Saving..." : "Save"}
              </Button>
            </div>
          </div>
        </div>

        {/* Zoom Controls */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Zoom</h3>
          <div className="flex items-center gap-2 p-3 border rounded-lg bg-muted/30">
            <button
              onClick={() => setCanvasZoom(Math.max(0.25, canvasZoom - 0.1))}
              className="flex-1 px-3 py-2 text-sm bg-background hover:bg-muted rounded transition-colors disabled:opacity-50"
              disabled={canvasZoom <= 0.25}
            >
              Zoom Out
            </button>
            <span className="px-3 py-2 text-sm text-center min-w-[4rem] bg-background rounded">
              {Math.round(canvasZoom * 100)}%
            </span>
            <button
              onClick={() => setCanvasZoom(Math.min(1.5, canvasZoom + 0.1))}
              className="flex-1 px-3 py-2 text-sm bg-background hover:bg-muted rounded transition-colors disabled:opacity-50"
              disabled={canvasZoom >= 1.5}
            >
              Zoom In
            </button>
          </div>
          <button
            onClick={() => setCanvasZoom(1)}
            className="w-full px-3 py-2 text-sm bg-background hover:bg-muted rounded transition-colors"
          >
            Reset to 100%
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex min-h-0 relative overflow-hidden">
          {/* Mobile Sidebar Overlay */}
          {isMobile && isMobileSidebarOpen && (
            <div
              className="absolute inset-0 bg-black/50 z-40 md:hidden"
              onClick={() => setIsMobileSidebarOpen(false)}
            />
          )}

          {/* Left Sidebar - Component Palette */}
          <div
            className={`
            ${
              isMobile
                ? `absolute left-0 top-0 h-full w-80 z-50 transform transition-transform duration-300 ${
                    isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
                  } ${
                    activePanel === "components"
                      ? "relative translate-x-0 w-full"
                      : "absolute"
                  }`
                : "w-60 sm:w-64 lg:w-72 xl:w-80 relative"
            } 
            border-r bg-card overflow-y-auto flex-shrink-0 md:block
            ${isMobile && activePanel !== "components" ? "hidden" : ""}
          `}
          >
            <div className="p-3 md:p-4 border-b border-border">
              <h2 className="text-base md:text-lg font-semibold text-foreground">
                Components
              </h2>
            </div>
            <div className="flex-1 overflow-y-auto">
              <ComponentPalette onComponentSelect={handleAddComponent} />
            </div>
          </div>

          {/* Main Canvas Area */}
          <div
            className={`
            flex-1 min-w-0 overflow-hidden overflow-y-auto
            ${isMobile && activePanel !== "canvas" ? "hidden" : ""}
          `}
          >
            <DropCanvas
              components={components.map(adaptToTypesComponent)}
              onSelect={(component) => {
                const actionsComponent = components.find(
                  (c) => c.id === component.id
                );
                if (actionsComponent) {
                  handleComponentSelect(actionsComponent);
                }
              }}
              selectedId={selectedComponent?.id || null}
              onDrop={handleDropComponent}
            />
          </div>

          {/* Right Sidebar - Edit */}
          <aside
            className={`${
              isMobile
                ? `w-full ${
                    activePanel === "Edit" ? "" : "hidden"
                  } pb-16 sm:pb-20`
                : selectedComponent
                ? "w-64 lg:w-72 xl:w-80 border-l flex-shrink-0"
                : "w-0 overflow-hidden"
            } bg-card transition-all duration-200 z-10`}
          >
            {selectedComponent && (
              <>
                <div className="w-full">
                  <div className="flex items-center justify-between bg-muted/30 rounded-xl shadow-sm px-2 py-1">
                    {/* Tabs */}
                    <div className="flex flex-1 gap-2">
                      {propertyTabs.map(({ tab, Icon, label }: any) => {
                        const isActive = activePropertyTab === tab;
                        return (
                          <motion.button
                            key={tab}
                            onClick={() => setActivePropertyTab(tab)}
                            className={`relative cursor-pointer flex flex-1 flex-row items-center justify-center rounded-lg px-2 py-2 text-xs transition-colors min-w-[60px] ${
                              isActive
                                ? "bg-primary text-primary-foreground shadow-md"
                                : "hover:bg-muted"
                            }`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Icon className="w-4 h-4" />
                            {/* <span className="truncate">{label}</span> */}
                            {isActive && (
                              <motion.div
                                layoutId="activeTab"
                                className="absolute inset-0 rounded-lg bg-primary/20 pointer-events-none"
                                transition={{
                                  type: "spring",
                                  stiffness: 300,
                                  damping: 25,
                                }}
                              />
                            )}
                          </motion.button>
                        );
                      })}
                    </div>

                    {/* Close Button (Desktop only) */}
                    {!isMobile && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSelectedComponent(null)}
                        className="ml-2 rounded-full hover:bg-destructive/20 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                  <PropertyPanel
                    component={selectedComponent}
                    onUpdate={handleUpdateComponent}
                    onDelete={handleDeleteComponent}
                    onDuplicate={handleDuplicateComponent}
                    onMoveUp={(id) => handleMoveComponent(id, "up")}
                    onMoveDown={(id) => handleMoveComponent(id, "down")}
                    activeTab={activePropertyTab}
                  />
                </div>
              </>
            )}
          </aside>
        </div>

        {/* Mobile Navigation */}
        {isMobile && (
          <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur border-t z-50 safe-area-inset-bottom">
            <div className="flex justify-around p-1.5 sm:p-2 max-w-lg mx-auto">
              {mobileNavItems.map(({ id, label, icon: Icon, disabled }) => (
                <button
                  key={id}
                  onClick={() => {
                    if (!disabled) {
                      setActivePanel(id as PanelType);
                    }
                  }}
                  disabled={disabled}
                  className={`flex flex-col items-center gap-0.5 sm:gap-1 p-1.5 sm:p-2 rounded-lg transition-colors min-w-0 flex-1 ${
                    activePanel === id
                      ? "bg-primary text-primary-foreground"
                      : disabled
                      ? "text-muted-foreground/50"
                      : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  <span className="text-[10px] sm:text-xs leading-tight text-center truncate w-full">
                    {label}
                  </span>
                </button>
              ))}
            </div>
          </nav>
        )}
      </div>
    </DndProvider>
  );
}
