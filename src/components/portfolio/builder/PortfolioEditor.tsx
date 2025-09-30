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
  RotateCcw,
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
} from "@/actions/portfolio-actions";
import { PortfolioComponent } from "@/lib/portfolio/types";
import { motion } from "framer-motion";

// Simplified types
interface Portfolio {
  id?: string;
  name: string;
  slug: string;
  description?: string;
  components: PortfolioComponent[];
  isPublic: boolean;
  theme?: any;
}

interface EditorProps {
  portfolioId?: string;
  initialData?: Portfolio;
}

type PanelType = "components" | "canvas" | "properties";
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

const usePortfolioState = (initialData?: Portfolio, portfolioId?: string) => {
  const [components, setComponents] = useState<PortfolioComponent[]>(
    initialData?.components || []
  );
  const [name, setName] = useState(initialData?.name || "Untitled Portfolio");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [isPublic, setIsPublic] = useState(initialData?.isPublic || false);
  
  // Theme state with default values
  const [globalTheme, setGlobalTheme] = useState({
    primary: "#3b82f6",
    secondary: "#64748b",
    accent: "#8b5cf6",
    background: "#ffffff",
    card: "#f8fafc",
    muted: "#f1f5f9",
    fontHeading: "Inter",
    fontBody: "Inter",
    spacingBase: 1,
    spacingSection: 2,
    spacingComponent: 1.25,
    mode: "light" as const,
    borderRadius: 0.5,
    shadowIntensity: 50,
    animationSpeed: 300,
    ...initialData?.theme, // Merge with initial theme data if available
  });

  // Create portfolio object
  const portfolio = {
    id: portfolioId,
    name,
    slug,
    components,
    isPublic,
    theme: globalTheme,
  };

  // Create setPortfolio function
  const setPortfolio = (newPortfolio: any) => {
    if (newPortfolio.name !== undefined) setName(newPortfolio.name);
    if (newPortfolio.slug !== undefined) setSlug(newPortfolio.slug);
    if (newPortfolio.components !== undefined) setComponents(newPortfolio.components);
    if (newPortfolio.isPublic !== undefined) setIsPublic(newPortfolio.isPublic);
    if (newPortfolio.theme !== undefined) setGlobalTheme(newPortfolio.theme);
  };

  return {
    components,
    setComponents,
    name,
    setName,
    slug,
    setSlug,
    isPublic,
    setIsPublic,
    globalTheme,
    setGlobalTheme,
    portfolio,
    setPortfolio,
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
    globalTheme,
    setGlobalTheme,
    portfolio,
    setPortfolio,
  } = usePortfolioState(initialData, portfolioId);

  // UI state
  const [selectedComponent, setSelectedComponent] =
    useState<PortfolioComponent | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [activePanel, setActivePanel] = useState<PanelType>("canvas");
  const [activePropertyTab, setActivePropertyTab] =
    useState<PropertyTab>("content");
  const [isComponentPaletteOpen, setIsComponentPaletteOpen] = useState(true);
  
  // History for undo/redo
  const [history, setHistory] = useState<PortfolioComponent[][]>([components]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [deviceSize, setDeviceSize] = useState<"mobile" | "tablet" | "desktop">(
    "desktop"
  );
  const [canvasZoom, setCanvasZoom] = useState(0.9);

  // Add to history when components change
  const addToHistory = useCallback((newComponents: PortfolioComponent[]) => {
    setHistory(prev => {
      const newHistory = prev.slice(0, historyIndex + 1);
      newHistory.push(newComponents);
      return newHistory.slice(-50); // Keep only last 50 states
    });
    setHistoryIndex(prev => Math.min(prev + 1, 49));
  }, [historyIndex]);

  // Undo function
  const undo = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setComponents(history[newIndex]);
    }
  }, [historyIndex, history]);

  // Redo function
  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setComponents(history[newIndex]);
    }
  }, [historyIndex, history]);


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
      setComponents((prev) => {
        const newComponents = prev.map((comp) => (comp.id === id ? { ...comp, ...updates } : comp));
        addToHistory(newComponents);
        return newComponents;
      });

      setSelectedComponent((prev) =>
        prev?.id === id ? { ...prev, ...updates } : prev
      );
    },
    [addToHistory]
  );

  const handleDeleteComponent = useCallback(
    (id: string) => {
      setComponents((prev) => {
        const newComponents = prev.filter((comp) => comp.id !== id);
        addToHistory(newComponents);
        return newComponents;
      });
      if (selectedComponent?.id === id) {
        setSelectedComponent(null);
      }
      toast.success("Component removed");
    },
    [selectedComponent?.id, addToHistory]
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
        setActivePanel("properties");
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
          setActivePanel("properties");
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
        theme: globalTheme,
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
  }, [components, name, slug, isPublic, portfolioId, router, globalTheme]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'z':
            e.preventDefault();
            if (e.shiftKey) {
              redo();
            } else {
              undo();
            }
            break;
          case 's':
            e.preventDefault();
            handleSave();
            break;
          case 'y':
            e.preventDefault();
            redo();
            break;
        }
      }
      
      // Delete selected component
      if (e.key === 'Delete' && selectedComponent) {
        handleDeleteComponent(selectedComponent.id);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo, selectedComponent, handleSave, handleDeleteComponent]);

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
      id: "properties",
      label: "Properties",
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
                  size="icon"
                  onClick={() => setIsMobileSidebarOpen(true)}
                  className="shrink-0"
                >
                  <Menu className="w-5 h-5" />
                </Button>
              ) : (
                /* Desktop: Component toggle + Portfolio info + Device sizes + Zoom */
                <>
                  {/* Components toggle */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setIsComponentPaletteOpen(!isComponentPaletteOpen);
                      if (!isComponentPaletteOpen && selectedComponent) {
                        setSelectedComponent(null);
                      }
                    }}
                    className="gap-2 shrink-0"
                  >
                    <Layers className="w-4 h-4" />
                    <span className="hidden md:inline">Components</span>
                  </Button>

                  <Separator
                    orientation="vertical"
                    className="h-6 hidden sm:block"
                  />

                  {/* Portfolio name */}
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Portfolio Name"
                    className="bg-transparent border-none focus:ring-1 flex-1 min-w-0 text-sm"
                  />

                  {/* Device size options */}
                  <div className="flex items-center gap-1 border rounded-lg p-1 overflow-x-auto">
                    {[
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
                        className={`flex items-center gap-1 px-2 py-1 text-xs rounded transition-colors flex-shrink-0 ${
                          deviceSize === size
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted"
                        }`}
                        title={label}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="hidden lg:inline">{label}</span>
                      </button>
                    ))}
                  </div>

                  {/* Zoom controls */}
                  <div className="flex items-center gap-1 border rounded-lg p-1 flex-shrink-0">
                    <button
                      onClick={() =>
                        setCanvasZoom(Math.max(0.5, canvasZoom - 0.1))
                      }
                      className="px-2 py-1 text-xs hover:bg-muted rounded transition-colors"
                      title="Zoom Out"
                    >
                      −
                    </button>
                    <span className="px-2 py-1 text-xs text-muted-foreground min-w-[3rem] text-center">
                      {Math.round(canvasZoom * 100)}%
                    </span>
                    <button
                      onClick={() =>
                        setCanvasZoom(Math.min(2, canvasZoom + 0.1))
                      }
                      className="px-2 py-1 text-xs hover:bg-muted rounded transition-colors"
                      title="Zoom In"
                    >
                      +
                    </button>
                    <button
                      onClick={() => setCanvasZoom(1)}
                      className="px-2 py-1 text-xs hover:bg-muted rounded transition-colors"
                      title="Reset Zoom"
                    >
                      Reset
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2 shrink-0">
              {isMobile ? (
                /* Mobile: Save button only */
                <Button
                  onClick={handleSave}
                  disabled={isSaving}
                  size="sm"
                  className="gap-2"
                >
                  {isSaving ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  {isSaving ? "Saving..." : "Save"}
                </Button>
              ) : (
                /* Desktop: Undo/Redo + Bulk + Save */
                <>
                  {/* Undo/Redo buttons */}
                  <div className="flex items-center gap-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={undo}
                      disabled={historyIndex === 0}
                      className="p-2"
                      title="Undo (Ctrl+Z)"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={redo}
                      disabled={historyIndex === history.length - 1}
                      className="p-2"
                      title="Redo (Ctrl+Y)"
                    >
                      <RotateCcw className="w-4 h-4 rotate-180" />
                    </Button>
                  </div>

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
                      <Button variant="outline" size="sm" className="gap-2">
                        <Sparkles className="w-4 h-4" />
                        Bulk
                      </Button>
                    }
                  />

                  <Button
                    onClick={handleSave}
                    disabled={isSaving}
                    size="sm"
                    className="gap-2"
                  >
                    {isSaving ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    {isSaving ? "Saving..." : "Save"}
                  </Button>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex flex-1 min-h-0">
          {/* Left Sidebar - Components (Desktop) */}
          {!isMobile && (
            <aside
              className={`${
                isComponentPaletteOpen ? "w-80" : "w-0"
              } bg-card border-r transition-all duration-200 overflow-hidden`}
            >
              {isComponentPaletteOpen && (
                <div className="h-full overflow-y-auto p-4">
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
              <DrawerContent className="h-[85vh]">
                <DrawerHeader>
                  <DrawerTitle>
                    {activePanel === "components" ? "Components" : "Options"}
                  </DrawerTitle>
                </DrawerHeader>
                <div className="flex-1 overflow-y-auto p-4">
                  {activePanel === "components" ? (
                    <ComponentPalette onComponentSelect={handleAddComponent} />
                  ) : (
                    <div className="space-y-6">
                      {/* Portfolio Settings */}
                      <div className="space-y-4">
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
                            className="w-full"
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

                      {/* Device Size Info */}
                      <div className="space-y-2">
                        <h3 className="text-sm font-medium">Device Preview</h3>
                        <div className="p-3 border rounded-lg bg-muted/30">
                          <div className="flex items-center gap-2 mb-2">
                            {deviceSize === "mobile" && (
                              <Smartphone className="w-4 h-4" />
                            )}
                            {deviceSize === "tablet" && (
                              <Tablet className="w-4 h-4" />
                            )}
                            {deviceSize === "desktop" && (
                              <MonitorIcon className="w-4 h-4" />
                            )}
                            <span className="text-sm font-medium capitalize">
                              {deviceSize}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {deviceSize === "mobile" && "375×667 pixels"}
                            {deviceSize === "tablet" && "768×1024 pixels"}
                            {deviceSize === "desktop" &&
                              "Full width responsive"}
                          </p>
                        </div>
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
            className={`flex-1 bg-muted/30 ${
              isMobile && activePanel !== "canvas" ? "hidden" : ""
            } ${isMobile ? "pb-20" : ""}`}
          >
            <div className="overflow-y-auto flex items-center justify-center h-full">
              {/* Device Preview Container */}
              <div
                className={`
                  bg-white h-full dark:bg-gray-900 shadow-lg rounded-lg transition-all duration-300
                  ${deviceSize === "mobile" ? "w-[375px] " : ""}
                  ${deviceSize === "tablet" ? "w-[768px] " : ""}
                  ${deviceSize === "desktop" ? "w-full " : ""}
                `}
                style={{
                  transform: `scale(${canvasZoom})`,
                  transformOrigin: "center center",
                }}
              >
                {/* Device Frame */}
                <div className="relative w-full h-full overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
                  {/* Device Header (for mobile/tablet) */}
                  {(deviceSize === "mobile" || deviceSize === "tablet") && (
                    <div className="absolute top-0 left-0 right-0 h-6 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-center">
                      <div className="w-16 h-1 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                    </div>
                  )}

                  {/* Device Notch (for mobile) */}
                  {deviceSize === "mobile" && (
                    <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-20 h-2 bg-gray-800 dark:bg-gray-200 rounded-b-lg"></div>
                  )}

                  {/* Canvas Content */}
                  <div
                    className={`
                    w-full h-full overflow-y-auto bg-white dark:bg-gray-900
                    ${
                      deviceSize === "mobile" || deviceSize === "tablet"
                        ? "pt-6"
                        : ""
                    }
                  `}
                  >
                    <DropCanvas
                      components={components}
                      onSelect={handleSelectComponent}
                      selectedId={selectedComponent?.id || null}
                      deviceSize={deviceSize}
                      globalTheme={globalTheme}
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

          {/* Right Sidebar - Properties */}
          <aside
            className={`${
              isMobile
                ? `w-full ${activePanel === "properties" ? "" : "hidden"} pb-20`
                : selectedComponent
                ? "w-80 border-l"
                : "w-0 overflow-hidden"
            } bg-card transition-all duration-200`}
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
                    portfolio={portfolio}
                    onPortfolioChange={setPortfolio}
                    globalTheme={globalTheme}
                    onGlobalThemeChange={setGlobalTheme}
                  />
                </div>
              </>
            )}
          </aside>
        </div>

        {/* Mobile Navigation */}
        {isMobile && (
          <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur border-t z-50">
            <div className="flex justify-around p-2">
              {mobileNavItems.map(({ id, label, icon: Icon, disabled }) => (
                <button
                  key={id}
                  onClick={() => {
                    if (!disabled) {
                      setActivePanel(id as PanelType);
                    }
                  }}
                  disabled={disabled}
                  className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
                    activePanel === id
                      ? "bg-primary text-primary-foreground"
                      : disabled
                      ? "text-muted-foreground/50"
                      : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs">{label}</span>
                </button>
              ))}
            </div>
          </nav>
        )}
      </div>
    </DndProvider>
  );
}
