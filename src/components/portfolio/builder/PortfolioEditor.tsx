import React, { useState, useEffect } from "react";
import { Save, Eye, Loader2, Settings, Palette } from "lucide-react";
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
import GlobalThemeControls, { GlobalTheme } from "./GlobalThemeControls";
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
  theme?: GlobalTheme;
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
  const [showThemePanel, setShowThemePanel] = useState(false);

  // Portfolio metadata
  const [portfolioName, setPortfolioName] = useState(
    initialData?.name || "Untitled Portfolio"
  );
  const [portfolioSlug, setPortfolioSlug] = useState(initialData?.slug || "");
  const [isPublic, setIsPublic] = useState(initialData?.isPublic || false);

  // Global theme state
  const [globalTheme, setGlobalTheme] = useState<GlobalTheme>({
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
    mode: "light",
    borderRadius: 0.5,
    shadowIntensity: 50,
    animationSpeed: 300,
  });

  // Load portfolio data on mount if editing
  useEffect(() => {
    if (portfolioId && initialData) {
      console.log("Loading initial data:", initialData);
      setComponents(initialData.components || []);
      setGlobalTheme(initialData.theme || globalTheme);
      setPortfolioName(initialData.name || "Untitled Portfolio");
      setPortfolioSlug(initialData.slug || "");
      setIsPublic(initialData.isPublic || false);
    }
  }, [portfolioId, initialData]);

  const handleAddComponent = (variant: ComponentVariant) => {
    // Find the section type for this variant
    let sectionType: SectionType = "hero"; // fallback
    for (const [sectionId, section] of Object.entries(componentRegistry)) {
      if (section.variants.some((v) => v.id === variant.id)) {
        sectionType = sectionId as SectionType;
        break;
      }
    }

    const newComponent: ActionsPortfolioComponent = {
      id: `${variant.id}-${Date.now()}`,
      type: sectionType,
      variant: variant.id,
      props: variant.defaultProps || {},
      styles: variant.defaultStyles || {},
      order: components.length,
      isActive: true,
    };

    setComponents((prev) => [...prev, newComponent]);
    setSelectedComponent(newComponent);
    toast.success(`Added ${variant.name}`);
  };

  const handleDropComponent = (component: TypesPortfolioComponent) => {
    const actionsComponent = adaptToActionsComponent(component);
    setComponents((prev) => [...prev, actionsComponent]);
    setSelectedComponent(actionsComponent);
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
      id: `${actionsComponent.id}-copy-${Date.now()}`,
      order: components.length,
      isActive: true,
    };

    setComponents((prev) => [...prev, duplicatedComponent]);
    setSelectedComponent(duplicatedComponent);
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
        theme: globalTheme,
        isPublic,
        portfolioType: "developer" as const,
      };

      // Debug: Log the data being sent
      console.log(
        "Saving portfolio data:",
        JSON.stringify(portfolioData, null, 2)
      );

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

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex h-screen bg-background">
        {/* Left Sidebar - Component Palette */}
        <div className="w-80 border-r bg-card overflow-y-auto">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">Component Library</h2>
            <p className="text-sm text-muted-foreground">
              Drag components to build your portfolio
            </p>
          </div>

          <div className="flex-1 overflow-y-auto">
            <ComponentPalette onComponentSelect={handleAddComponent} />
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Top Bar */}
          <div className="border-b bg-card p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <input
                  type="text"
                  value={portfolioName}
                  onChange={(e) => setPortfolioName(e.target.value)}
                  className="text-xl font-semibold bg-transparent border-none outline-none"
                  placeholder="Portfolio Name"
                />
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isPublic"
                    checked={isPublic}
                    onChange={(e) => setIsPublic(e.target.checked)}
                    className="rounded"
                  />
                  <label htmlFor="isPublic" className="text-sm">
                    Public
                  </label>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowThemePanel(!showThemePanel)}
                >
                  <Palette className="w-4 h-4 mr-2" />
                  Theme
                </Button>
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

          {/* Content Area */}
          <div className="flex-1 flex overflow-scroll">
            {/* Drop Canvas */}
            <div className="flex-1 overflow-scroll">
              <DropCanvas
                components={components.map(adaptToTypesComponent)}
                onSelect={(component) => {
                  const actionsComponent = components.find(
                    (c) => c.id === component.id
                  );
                  if (actionsComponent) {
                    setSelectedComponent(actionsComponent);
                  }
                }}
                selectedId={selectedComponent?.id || null}
                onDrop={handleDropComponent}
                globalTheme={globalTheme}
              />
            </div>

            {/* Right Sidebar - Property Panel */}
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
            />
          </div>
        </div>

        {/* Theme Panel */}
        {showThemePanel && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-50">
            <div className="absolute right-0 top-0 h-full w-96 bg-card border-l shadow-lg">
              <div className="p-4 border-b">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Global Theme</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowThemePanel(false)}
                  >
                    ×
                  </Button>
                </div>
              </div>
              <div className="p-4">
                <GlobalThemeControls
                  theme={globalTheme}
                  onThemeChange={setGlobalTheme}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </DndProvider>
  );
}
