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
      <div className="flex flex-col h-screen bg-background overflow-hidden">
        {/* Header */}
        <header className="border-b bg-card shadow-sm flex-shrink-0">
          <div className="flex items-center justify-between p-2 sm:p-3 gap-2 sm:gap-3">
            {/* Left side */}
            <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
              {isMobile ? (
                /* Mobile: Menu button only */
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setIsMobileSidebarOpen(true);
                  }}
                >
                  <Menu className="w-4 h-4" />
                </Button>
              ) : (
                /* Desktop: Component toggle + Portfolio info + Device sizes */
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setIsComponentPaletteOpen(!isComponentPaletteOpen);
                      if (!isComponentPaletteOpen && selectedComponent) {
                        setSelectedComponent(null);
                      }
                    }}
                    className="gap-1 sm:gap-2 px-2 sm:px-3"
                  >
                    <Layers className="w-4 h-4" />
                    <span className="hidden sm:inline">Components</span>
                  </Button>
                  <Separator orientation="vertical" className="h-6 hidden md:block" />

                  {/* Portfolio name */}
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Portfolio Name"
                    className="bg-transparent border-none focus:ring-1 flex-1 min-w-0 text-sm sm:text-base"
                  />

                  {/* Device size options */}
                  <div className="hidden lg:flex items-center gap-1 border rounded-lg p-1">
                    {[
                      {
                        size: "mobile" as const,
                        icon: Smartphone,
                        label: "Mobile",
                      },
                      {
                        size: "tablet" as const,
                        icon: Tablet,
                        label: "Tablet",
                      },
                      {
                        size: "desktop" as const,
                        icon: MonitorIcon,
                        label: "Desktop",
                      },
                    ].map(({ size, icon: Icon, label }) => (
                      <button
                        key={size}
                        onClick={() => setDeviceSize(size)}
                        className={`flex items-center gap-1 px-2 py-1 text-xs rounded transition-colors ${deviceSize === size
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted"
                          }`}
                        title={label}
                      >
                        <Icon className="w-3 h-3" />
                        <span className="hidden xl:inline">{label}</span>
                      </button>
                    ))}
                  </div>

                  {/* Compact Device Toggle for medium screens */}
                  <div className="lg:hidden md:flex items-center gap-1 border rounded-lg p-1">
                    <button
                      onClick={() => {
                        const sizes = ["mobile", "tablet", "desktop"];
                        const currentIndex = sizes.indexOf(deviceSize);
                        const nextIndex = (currentIndex + 1) % sizes.length;
                        setDeviceSize(sizes[nextIndex] as any);
                      }}
                      className="flex items-center gap-1 px-2 py-1 text-xs rounded hover:bg-muted transition-colors"
                      title={`Switch from ${deviceSize}`}
                    >
                      {deviceSize === "mobile" && <Smartphone className="w-3 h-3" />}
                      {deviceSize === "tablet" && <Tablet className="w-3 h-3" />}
                      {deviceSize === "desktop" && <MonitorIcon className="w-3 h-3" />}
                    </button>
                  </div>

                  {/* Zoom controls */}
                  <div className="hidden md:flex items-center gap-1 border rounded-lg p-1 bg-background">
                    <button
                      onClick={() => setCanvasZoom(Math.max(0.25, canvasZoom - 0.1))}
                      className="px-1.5 sm:px-2 py-1 text-xs hover:bg-muted rounded transition-colors disabled:opacity-50"
                      title="Zoom Out"
                      disabled={canvasZoom <= 0.25}
                    >
                      -
                    </button>
                    <span className="px-1.5 sm:px-2 py-1 text-xs text-muted-foreground min-w-[2.5rem] sm:min-w-[3rem] text-center">
                      {Math.round(canvasZoom * 100)}%
                    </span>
                    <button
                      onClick={() => setCanvasZoom(Math.min(1.5, canvasZoom + 0.1))}
                      className="px-1.5 sm:px-2 py-1 text-xs hover:bg-muted rounded transition-colors disabled:opacity-50"
                      title="Zoom In"
                      disabled={canvasZoom >= 1.5}
                    >
                      +
                    </button>
                    <button
                      onClick={() => setCanvasZoom(1)}
                      className="hidden sm:block px-2 py-1 text-xs hover:bg-muted rounded transition-colors"
                      title="Reset Zoom (100%)"
                    >
                      Reset
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-1 sm:gap-2">
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
                /* Desktop: All actions + Property tabs */
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
                      <Button variant="outline" size="sm" className="gap-1 sm:gap-2 px-2 sm:px-3">
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

                  {/* Property tabs (when component selected) */}
                  {selectedComponent && (
                    <div className="hidden lg:flex gap-1 ml-2 border rounded-lg p-1">
                      {propertyTabs.map(({ tab, Icon, label }) => (
                        <button
                          key={tab}
                          onClick={() => setActivePropertyTab(tab)}
                          className={`flex items-center gap-1 px-2 xl:px-3 py-1.5 text-xs rounded transition-colors ${activePropertyTab === tab
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted"
                            }`}
                        >
                          <Icon className="w-3 h-3" />
                          <span className="hidden xl:inline">{label}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex flex-1 min-h-0 relative">
          {/* Left Sidebar - Components (Desktop) */}
          {!isMobile && (
            <aside
              className={`${isComponentPaletteOpen ? "w-60 lg:w-72 xl:w-80" : "w-0"
                } bg-card border-r transition-all duration-200 overflow-hidden flex-shrink-0 z-10`}
            >
              {isComponentPaletteOpen && (
                <div className="h-full overflow-y-auto">
                  <ComponentPalette onComponentSelect={handleAddComponent} />
                </div>
              )}
            </aside>
          )}

          {/* Mobile Drawer Content */}
          {isMobile && (
            <Drawer
              open={isMobileSidebarOpen}
              onOpenChange={(open) => {
                setIsMobileSidebarOpen(open);
                if (!open) {
                  setActivePanel("canvas");
                }
              }}
            >
              <DrawerContent className="h-[80vh] sm:h-[85vh]">
                <DrawerHeader className="pb-2">
                  <DrawerTitle className="text-lg">
                    {activePanel === "components" ? "Components" : "Options"}
                  </DrawerTitle>
                </DrawerHeader>
                <div className="flex-1 overflow-y-auto p-3 sm:p-4">
                  {activePanel === "components" ? (
                    <ComponentPalette onComponentSelect={handleAddComponent} />
                  ) : (
                    <div className="space-y-4 sm:space-y-6">
                      {/* Portfolio Settings */}
                      <div className="space-y-3 sm:space-y-4">
                        <h3 className="text-sm font-medium">
                          Portfolio Settings
                        </h3>

                        {/* Portfolio Name */}
                        <div className="space-y-2">
                          <label className="text-xs text-muted-foreground">
                            Portfolio Name
                          </label>
                          <Input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Portfolio Name"
                            className="w-full text-sm sm:text-base"
                          />
                        </div>

                        {/* Public Toggle */}
                        <div className="flex items-center space-x-2 p-3 border rounded-lg">
                          <Checkbox
                            id="public"
                            checked={isPublic}
                            onCheckedChange={(checked) =>
                              setIsPublic(checked === true)
                            }
                          />
                          <label
                            htmlFor="public"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Make portfolio public
                          </label>
                        </div>
                      </div>

                      {/* Device Size Selection */}
                      <div className="space-y-2">
                        <h3 className="text-sm font-medium">Device Preview</h3>
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            {
                              size: "mobile" as const,
                              icon: Smartphone,
                              label: "Mobile",
                              dimensions: "375×667"
                            },
                            {
                              size: "tablet" as const,
                              icon: Tablet,
                              label: "Tablet",
                              dimensions: "768×1024"
                            },
                            {
                              size: "desktop" as const,
                              icon: MonitorIcon,
                              label: "Desktop",
                              dimensions: "Responsive"
                            },
                          ].map(({ size, icon: Icon, label, dimensions }) => (
                            <button
                              key={size}
                              onClick={() => setDeviceSize(size)}
                              className={`flex flex-col items-center gap-2 p-3 border rounded-lg transition-colors ${deviceSize === size
                                ? "bg-primary text-primary-foreground border-primary"
                                : "hover:bg-muted"
                                }`}
                            >
                              <Icon className="w-5 h-5" />
                              <div className="text-center">
                                <div className="text-xs font-medium">{label}</div>
                                <div className="text-[10px] opacity-70">{dimensions}</div>
                              </div>
                            </button>
                          ))}
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

                      {/* Bulk Edit */}
                      <div className="space-y-2">
                        <h3 className="text-sm font-medium">Bulk Edit</h3>
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
                            <Button variant="outline" className="w-full gap-2">
                              <Sparkles className="w-4 h-4" />
                              Bulk Style Editor
                            </Button>
                          }
                        />
                      </div>
                    </div>
                  )}
                </div>
              </DrawerContent>
            </Drawer>
          )}

          {/* Canvas */}
          <main
            className={`flex-1 bg-muted/30 ${isMobile && activePanel !== "canvas" ? "hidden" : ""
              } ${isMobile ? "pb-16 sm:pb-20" : ""} min-w-0`}
          >
            <div className="h-full overflow-auto flex items-center justify-center"
              style={{
                padding: `${Math.max(8, 16 * canvasZoom)}px`
              }}>
              {/* Device Preview Container */}
              <div
                className="bg-white dark:bg-gray-900 shadow-lg rounded-lg transition-all duration-300"
                style={{
                  transform: `scale(${canvasZoom})`,
                  transformOrigin: "center center",
                  // Responsive widths based on device size and available space
                  width: "100%",
                  height:"100%",
                  // Dynamic margin based on zoom level to prevent overflow
                  margin: `${Math.max(10, 40 / canvasZoom)}px`,
                }}
              >
                {/* Device Frame */}
                <div className="relative w-full h-full overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
                  {/* Device Header (for mobile/tablet) */}
                  {(deviceSize === "mobile" || deviceSize === "tablet") && (
                    <div className="absolute top-0 left-0 right-0 h-6 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-center z-10">
                      <div className="w-12 sm:w-16 h-1 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                    </div>
                  )}

                  {/* Device Notch (for mobile) */}
                  {deviceSize === "mobile" && (
                    <div className="absolute top-1.5 sm:top-2 left-1/2 transform -translate-x-1/2 w-16 sm:w-20 h-1.5 sm:h-2 bg-gray-800 dark:bg-gray-200 rounded-b-lg z-10"></div>
                  )}

                  {/* Canvas Content */}
                  <div
                    className={`
                      w-full h-full overflow-y-auto bg-white dark:bg-gray-900
                      ${deviceSize === "mobile" || deviceSize === "tablet" ? "pt-6" : ""}
                    `}
                  >
                    <DropCanvas
                      components={components}
                      onSelect={handleSelectComponent}
                      selectedId={selectedComponent?.id || null}
                      deviceSize={deviceSize}
                      onDrop={(component) => {
                        const newComponent = { ...component, id: uuidv4() };
                        setComponents((prev) => [...prev, newComponent]);
                        setSelectedComponent(newComponent);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </main>

          {/* Right Sidebar - Edit */}
          <aside
            className={`${isMobile
              ? `w-full ${activePanel === "Edit" ? "" : "hidden"} pb-16 sm:pb-20`
              : selectedComponent
                ? "w-64 lg:w-72 xl:w-80 border-l flex-shrink-0"
                : "w-0 overflow-hidden"
              } bg-card transition-all duration-200 z-10`}
          >
            {selectedComponent && (
              <>
                <div className="p-2 border-b bg-muted">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-xs sm:text-base">Edit</h3>
                    {!isMobile && (
                      <Button
                        variant="ghost"
                        className="cursor:pointer"
                        size="sm"
                        onClick={() => setSelectedComponent(null)}
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
                  className={`flex flex-col items-center gap-0.5 sm:gap-1 p-1.5 sm:p-2 rounded-lg transition-colors min-w-0 flex-1 ${activePanel === id
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
