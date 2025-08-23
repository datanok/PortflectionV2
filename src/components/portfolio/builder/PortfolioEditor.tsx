import React, { useState, useEffect } from "react";
import {
  Save,
  Eye,
  Loader2,
  Settings,
  Palette,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Type,
  Code,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  componentRegistry,
  getComponentVariant,
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
  getPortfolio,
  PortfolioComponent as ActionsPortfolioComponent,
} from "@/actions/portfolio-actions";
import { PortfolioComponent as TypesPortfolioComponent } from "@/lib/portfolio/types";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

// Type adapter to convert between the two PortfolioComponent types
const adaptToTypesComponent = (
  comp: ActionsPortfolioComponent
): TypesPortfolioComponent => ({
  id: comp.id || "",
  type: comp.type,
  variant: comp.variant,
  props: comp.props,
  styles: comp.styles || {},
  order: comp.order,
  createdAt: undefined,
  updatedAt: undefined,
});

const adaptToActionsComponent = (
  comp: TypesPortfolioComponent
): ActionsPortfolioComponent => ({
  id: comp.id,
  type: comp.type,
  variant: comp.variant,
  props: comp.props,
  styles: comp.styles,
  order: comp.order,
  isActive: true,
});

interface PortfolioData {
  id?: string;
  name: string;
  slug: string;
  description?: string;
  components: ActionsPortfolioComponent[];
  isPublic: boolean;
  portfolioType: string;
}

export default function PortfolioEditor({
  portfolioId,
  initialData,
}: {
  portfolioId?: string;
  initialData?: any;
}) {
  const router = useRouter();
  const [components, setComponents] = useState<ActionsPortfolioComponent[]>([]);
  const [selectedComponent, setSelectedComponent] =
    useState<ActionsPortfolioComponent | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Mobile navigation states
  const [activePanel, setActivePanel] = useState<
    "components" | "canvas" | "properties"
  >("canvas");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Property panel tab state
  const [activePropertyTab, setActivePropertyTab] = useState<
    "content" | "style" | "advanced"
  >("content");

  // Portfolio metadata
  const [portfolioName, setPortfolioName] = useState(
    initialData?.name || "Untitled Portfolio"
  );
  const [portfolioSlug, setPortfolioSlug] = useState(initialData?.slug || "");
  const [isPublic, setIsPublic] = useState(initialData?.isPublic || false);

  // Responsive hook
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Load portfolio data on mount if editing
  useEffect(() => {
    if (portfolioId && initialData) {
      setComponents(initialData.components || []);
      setPortfolioName(initialData.name || "Untitled Portfolio");
      setPortfolioSlug(initialData.slug || "");
      setIsPublic(initialData.isPublic || false);
    }
  }, [portfolioId, initialData]);

  const handleAddComponent = (variant: ComponentVariant) => {
    // Find the section type for this variant
    let sectionType: SectionType = "hero"; // fallback

    // For static registry components
    for (const [sectionId, section] of Object.entries(componentRegistry)) {
      if (section.variants.some((v) => v.id === variant.id)) {
        sectionType = sectionId as SectionType;
        break;
      }
    }

    const newComponent: ActionsPortfolioComponent = {
      id: uuidv4(),
      type: sectionType,
      variant: variant.id,
      props: variant.defaultProps || {},
      styles: variant.defaultStyles || {},
      order: components.length,
      isActive: true,
    };

    setComponents((prev) => [...prev, newComponent]);
    setSelectedComponent(newComponent);

    // Mobile: switch to canvas after adding component
    if (isMobile) {
      setActivePanel("canvas");
      setIsMobileSidebarOpen(false);
    }

    toast.success(`Added ${variant.name}`);
  };

  const handleDropComponent = (component: TypesPortfolioComponent) => {
    const actionsComponent = adaptToActionsComponent(component);
    actionsComponent.id = uuidv4();

    setComponents((prev) => {
      const newComponents = [...prev, actionsComponent];
      return newComponents;
    });

    setSelectedComponent(actionsComponent);

    // Mobile: switch to properties after dropping
    if (isMobile) {
      setActivePanel("properties");
    }

    toast.success(`Added ${component.type} component`);
  };

  const handleUpdateComponent = (
    id: string,
    updates: Partial<ActionsPortfolioComponent>
  ) => {
    setComponents((prev) =>
      prev.map((comp) =>
        comp.id === id
          ? {
              ...comp,
              ...updates,
              type: comp.type, // Always preserve the original type
            }
          : comp
      )
    );

    if (selectedComponent?.id === id) {
      setSelectedComponent((prev) =>
        prev ? { ...prev, ...updates, type: prev.type } : null
      );
    }
  };

  const handleDeleteComponent = (id: string) => {
    setComponents((prev) => prev.filter((comp) => comp.id !== id));
    if (selectedComponent?.id === id) {
      setSelectedComponent(null);
    }
    toast.success("Component removed");
  };

  const handleMoveComponent = (id: string, direction: "up" | "down") => {
    setComponents((prev) => {
      const index = prev.findIndex((comp) => comp.id === id);
      if (index === -1) return prev;

      const newComponents = [...prev];
      if (direction === "up" && index > 0) {
        [newComponents[index], newComponents[index - 1]] = [
          newComponents[index - 1],
          newComponents[index],
        ];
      } else if (direction === "down" && index < newComponents.length - 1) {
        [newComponents[index], newComponents[index + 1]] = [
          newComponents[index + 1],
          newComponents[index],
        ];
      }

      return newComponents.map((comp, i) => ({ ...comp, order: i }));
    });
  };

  const handleDuplicateComponent = (component: TypesPortfolioComponent) => {
    const actionsComponent = adaptToActionsComponent(component);
    const duplicatedComponent: ActionsPortfolioComponent = {
      ...actionsComponent,
      id: uuidv4(),
      order: components.length,
      isActive: true,
    };

    setComponents((prev) => [...prev, duplicatedComponent]);
    setSelectedComponent(duplicatedComponent);

    // Mobile: switch to properties after duplicating
    if (isMobile) {
      setActivePanel("properties");
    }

    toast.success("Component duplicated");
  };

  const handleSave = async () => {
    if (components.length === 0) {
      toast.error("Please add at least one component to your portfolio");
      return;
    }

    if (!portfolioName.trim()) {
      toast.error("Please enter a portfolio name");
      return;
    }

    setIsSaving(true);
    try {
      const portfolioData = {
        name: portfolioName,
        slug:
          portfolioSlug ||
          portfolioName
            .toLowerCase()
            .replace(/[^a-z0-9-]/g, "-")
            .replace(/-+/g, "-")
            .replace(/^-|-$/g, ""),
        description: `Portfolio created with Portflection`,
        layout: components.map((comp, index) => ({
          id: comp.id || `component-${index}`,
          type: comp.type || "hero",
          variant: comp.variant || "default",
          props: comp.props || {},
          styles: comp.styles || {},
          order: index,
          isActive: true,
        })),

        isPublic,
        portfolioType: "developer" as const,
      };

      let result;
      if (portfolioId) {
        result = await updatePortfolio({
          id: portfolioId,
          ...portfolioData,
        });
        toast.success("Portfolio updated successfully!");
      } else {
        result = await savePortfolio(portfolioData);
        toast.success("Portfolio saved successfully!");
        router.push(`/dashboard/portfolios/edit/${result.data.id}`);
      }
    } catch (error) {
      console.error("Save error:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to save portfolio"
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleComponentSelect = (component: ActionsPortfolioComponent) => {
    console.log("Component selected:", component);
    setSelectedComponent(component);
    if (isMobile) {
      setActivePanel("properties");
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col h-screen bg-background w-full overflow-hidden">
        {/* Enhanced Header with Bulk Editor */}
        <div className="border-b border-border bg-card flex-shrink-0 shadow-sm">
          <div className="flex items-center justify-between p-2 gap-2">
            {/* Left side - Mobile menu + Portfolio name + Public toggle */}
            <div className="flex items-center gap-2 flex-1 min-w-0">
              {/* Mobile menu */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
                className="md:hidden p-1.5 h-8 w-8"
                aria-label={
                  isMobileSidebarOpen ? "Close sidebar" : "Open sidebar"
                }
              >
                {isMobileSidebarOpen ? (
                  <X className="w-4 h-4" />
                ) : (
                  <Menu className="w-4 h-4" />
                )}
              </Button>

              {/* Portfolio name */}
              <Input
                value={portfolioName}
                onChange={(e) => setPortfolioName(e.target.value)}
                className="text-sm md:text-base font-medium bg-transparent border-none focus:ring-1 focus:ring-primary h-8 px-2 flex-1 min-w-0"
                placeholder="Portfolio Name"
              />

              {/* Public toggle - compact */}
              <div className="flex items-center gap-1.5">
                <Checkbox
                  id="isPublic"
                  checked={isPublic}
                  onCheckedChange={setIsPublic}
                  className="h-4 w-4"
                />
                <label
                  htmlFor="isPublic"
                  className="text-xs font-medium text-muted-foreground whitespace-nowrap"
                >
                  Public
                </label>
              </div>
            </div>

            {/* Center - Property tabs (when component selected) */}
            {selectedComponent && (
              <div className="flex gap-1">
                {[
                  { tab: "content", Icon: Type, label: "Content" },
                  { tab: "style", Icon: Palette, label: "Style" },
                  { tab: "advanced", Icon: Settings, label: "Advanced" },
                ].map(({ tab, Icon, label }) => (
                  <button
                    key={tab}
                    onClick={() => setActivePropertyTab(tab)}
                    className={`flex items-center gap-1 px-2 py-1 text-xs font-medium rounded transition-colors h-8 ${
                      activePropertyTab === tab
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                    aria-label={`Switch to ${label} tab`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">{label}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Right side - Action buttons */}
            <div className="flex items-center gap-1">
              <BulkStyleModal
                components={components.map(adaptToTypesComponent)}
                onUpdateComponents={(updates) =>
                  setComponents(
                    components.map((comp) => ({
                      ...comp,
                      styles: { ...comp.styles, ...updates.styles },
                    }))
                  )
                }
                trigger={
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 px-2 gap-1"
                    aria-label="Bulk style editor"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span className="hidden lg:inline text-xs">Bulk</span>
                  </Button>
                }
              />

              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsPreviewOpen(true)}
                className="h-8 px-2 gap-1"
                aria-label="Preview portfolio"
              >
                <Eye className="w-4 h-4" />
                <span className="hidden lg:inline text-xs">Preview</span>
              </Button>

              <Button
                onClick={handleSave}
                disabled={isSaving}
                size="sm"
                className="bg-primary text-primary-foreground hover:bg-primary/90 h-8 px-2 gap-1"
                aria-label={isSaving ? "Saving" : "Save portfolio"}
              >
                {isSaving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                <span className="hidden md:inline text-xs">
                  {isSaving ? "Saving..." : "Save"}
                </span>
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Bottom Navigation */}
        <div className="md:hidden border-t border-border bg-card flex flex-shrink-0">
          <button
            className={`flex-1 py-3 text-xs font-medium flex flex-col items-center gap-1 ${
              activePanel === "components"
                ? "text-primary bg-primary/10"
                : "text-muted-foreground"
            }`}
            onClick={() => setActivePanel("components")}
          >
            <Palette className="w-4 h-4" />
            Components
          </button>
          <button
            className={`flex-1 py-3 text-xs font-medium flex flex-col items-center gap-1 ${
              activePanel === "canvas"
                ? "text-primary bg-primary/10"
                : "text-muted-foreground"
            }`}
            onClick={() => setActivePanel("canvas")}
          >
            <Eye className="w-4 h-4" />
            Canvas
          </button>
          <button
            className={`flex-1 py-3 text-xs font-medium flex flex-col items-center gap-1 ${
              activePanel === "properties"
                ? "text-primary bg-primary/10"
                : "text-muted-foreground"
            } ${!selectedComponent ? "opacity-50" : ""}`}
            onClick={() => setActivePanel("properties")}
            disabled={!selectedComponent}
          >
            <Settings className="w-4 h-4" />
            Properties
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
            {/* <div className="p-3 md:p-4 border-b border-border">
              <h2 className="text-base md:text-lg font-semibold text-foreground">
                Components
              </h2>
            </div> */}
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

          {/* Right Sidebar - Properties */}
          <div
            className={`
            ${
              isMobile
                ? `w-full ${activePanel === "properties" ? "" : "hidden"}`
                : "w-64 sm:w-72 lg:w-80 xl:w-96"
            } 
            border-l border-border bg-card flex flex-col min-h-0 flex-shrink-0 relative z-20
          `}
          >
            {/* Property Panel */}
            <div className="flex-1 overflow-hidden overflow-y-auto">
              <PropertyPanel
                component={
                  selectedComponent
                    ? adaptToTypesComponent(selectedComponent)
                    : null
                }
                onUpdate={(id, updates) => {
                  const actionsUpdates = adaptToActionsComponent(
                    updates as TypesPortfolioComponent
                  );
                  handleUpdateComponent(id, actionsUpdates);
                }}
                onDelete={handleDeleteComponent}
                onDuplicate={handleDuplicateComponent}
                onMoveUp={(id) => handleMoveComponent(id, "up")}
                onMoveDown={(id) => handleMoveComponent(id, "down")}
                activeTab={activePropertyTab}
              />
            </div>
          </div>
        </div>
      </div>
    </DndProvider>
  );
}
