import React, { useState, useRef, useCallback, useMemo } from "react";
import { PortfolioComponent } from "@/lib/portfolio/types";
import { getComponent, componentRegistry } from "@/lib/portfolio/registry";
import {
  Settings,
  Palette,
  Type,
  Image,
  Layout,
  Eye,
  Copy,
  Trash2,
  ChevronDown,
  ChevronRight,
  MoveUp,
  MoveDown,
  Save,
  RotateCcw,
  Sparkles,
  Layers,
  Zap,
  User,
  Globe,
  Mail,
  Github,
  Linkedin,
  ExternalLink,
  ToggleLeft,
  ToggleRight,
  Code,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ContentEditor from "./ContentEditor";
import ColorPanel from "./ColorPanel";
import FontPicker from "./FontPicker";

interface PropertyPanelProps {
  component: PortfolioComponent | null;
  onUpdate: (id: string, updates: Partial<PortfolioComponent>) => void;
  onDelete?: (id: string) => void;
  onDuplicate?: (component: PortfolioComponent) => void;
  onMoveUp?: (id: string) => void;
  onMoveDown?: (id: string) => void;
  activeTab?: "content" | "style" | "advanced";
  // New props for color schemes
  portfolio?: any;
  onPortfolioChange?: (portfolio: any) => void;
  // Theme props
  globalTheme?: any;
  onGlobalThemeChange?: (theme: any) => void;
}

export default function PropertyPanel({
  component,
  onUpdate,
  onDelete,
  onDuplicate,
  onMoveUp,
  onMoveDown,
  activeTab = "content",
  portfolio,
  onPortfolioChange,
  globalTheme,
  onGlobalThemeChange,
}: PropertyPanelProps) {
  const [componentTabStates, setComponentTabStates] = useState<
    Record<string, string>
  >({});
  const [saveMode, setSaveMode] = useState(false);
  const [showLivePreview, setShowLivePreview] = useState(true);
  const [styleTab, setStyleTab] = useState("colors");

  // Debounce refs for color updates
  const debounceRefs = useRef<Record<string, NodeJS.Timeout>>({});

  // Centralized color state - moved before early return
  const colorState = useMemo(
    () => ({
      background: component?.styles?.backgroundColor || "#ffffff",
      text: component?.styles?.textColor || "#111827",
      primary: component?.styles?.primaryColor || "#3b82f6",
      secondary: component?.styles?.secondaryColor || "#6b7280",
    }),
    [component?.styles]
  );

  // --- DYNAMIC COLOR KEYS EXTRACTION ---
  // Get defaultStyles from the registry for the selected variant
  const defaultStyles = useMemo(() => {
    if (!component) return {};
    const config = getComponent(component.type as any, component.variant);
    return config?.defaultStyles || {};
  }, [component?.type, component?.variant, component]);

  // Dynamically extract color keys from defaultStyles
  const colorKeys = useMemo(() => {
    return Object.keys(defaultStyles).filter((key) =>
      key.toLowerCase().includes("color")
    );
  }, [defaultStyles]);

  // Map registry color keys to user-friendly keys for ColorPanel
  const colorKeyMap = {
    backgroundColor: "background",
    textColor: "text",
    primaryColor: "primary",
    secondaryColor: "secondary",
    accentColor: "accent",
    borderColor: "border",
    shadowColor: "shadow",
    statusColor: "status",
  };

  // Build colors object for ColorPanel dynamically
  const colors = useMemo(() => {
    const result: Record<string, string> = {};
    colorKeys.forEach((key) => {
      const friendlyKey = colorKeyMap[key] || key;
      result[friendlyKey] =
        component?.styles?.[key] ?? defaultStyles[key] ?? "";
    });
    return result;
  }, [colorKeys, component?.styles, defaultStyles]);

  // setColors for ColorPanel (dynamic)
  const setColors = useCallback(
    (updater: (colors: any) => any) => {
      if (!component) return;
      const newColors = updater(colors);
      const updatedStyles = { ...component.styles };
      Object.entries(newColors).forEach(([friendlyKey, value]) => {
        // Find the registry key for this friendlyKey
        const registryKey =
          Object.entries(colorKeyMap).find(([, v]) => v === friendlyKey)?.[0] ||
          friendlyKey;
        updatedStyles[registryKey] = value;
      });
      handleChange("styles", updatedStyles);
    },
    [component, colors]
  );

  // Group style keys
  const styleGroups = useMemo(() => {
    const groups: Record<string, string[]> = {
      Colors: [],
      Spacing: [],
      Typography: [],
      Other: [],
    };
    Object.keys(defaultStyles).forEach((key) => {
      if (key.toLowerCase().includes("color")) groups.Colors.push(key);
      else if (
        key.toLowerCase().includes("padding") ||
        key.toLowerCase().includes("margin")
      )
        groups.Spacing.push(key);
      else if (
        [
          "fontSize",
          "fontWeight",
          "textAlign",
          "lineHeight",
          "letterSpacing",
        ].includes(key)
      )
        groups.Typography.push(key);
      else groups.Other.push(key);
    });
    return groups;
  }, [defaultStyles]);

  // Render a style field based on key and value
  const renderStyleField = (key: string) => {
    // Skip color fields, handled by ColorPanel
    if (colorKeys.includes(key)) return null;
    const value = component.styles?.[key] ?? defaultStyles[key] ?? "";
    
    // Color picker
    if (key.toLowerCase().includes("color")) {
      return (
        <div key={key} className="mb-3">
          <Label className="text-xs font-medium">{key}</Label>
          <div className="flex gap-1.5 mt-1 items-center">
            <Input
              type="color"
              value={value}
              onChange={(e) => handleStyleChange(key, e.target.value)}
              className="w-8 h-7 p-0 border-0 rounded cursor-pointer"
            />
            <Input
              value={value}
              onChange={(e) => handleStyleChange(key, e.target.value)}
              className="flex-1 h-7 text-xs"
            />
          </div>
        </div>
      );
    }
    
    // Number input for spacing
    if (
      key.toLowerCase().includes("padding") ||
      key.toLowerCase().includes("margin")
    ) {
      return (
        <div key={key} className="mb-3">
          <Label className="text-xs font-medium">{key}</Label>
          <Input
            type="number"
            value={value}
            onChange={(e) => handleStyleChange(key, e.target.value)}
            className="h-7 text-xs mt-1"
            placeholder="0"
          />
        </div>
      );
    }
    
    // Typography selects
    if (key === "fontSize") {
      return (
        <div key={key} className="mb-3">
          <Label className="text-xs font-medium">Font Size</Label>
          <Select
            value={value}
            onValueChange={(v) => handleStyleChange(key, v)}
          >
            <SelectTrigger className="h-7 mt-1 text-xs">
              <SelectValue placeholder="Select size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="xs">Extra Small</SelectItem>
              <SelectItem value="sm">Small</SelectItem>
              <SelectItem value="base">Base</SelectItem>
              <SelectItem value="lg">Large</SelectItem>
              <SelectItem value="xl">Extra Large</SelectItem>
              <SelectItem value="2xl">2X Large</SelectItem>
            </SelectContent>
          </Select>
        </div>
      );
    }
    
    if (key === "fontWeight") {
      return (
        <div key={key} className="mb-3">
          <Label className="text-xs font-medium">Font Weight</Label>
          <Select
            value={value}
            onValueChange={(v) => handleStyleChange(key, v)}
          >
            <SelectTrigger className="h-7 mt-1 text-xs">
              <SelectValue placeholder="Select weight" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="normal">Normal</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="semibold">Semibold</SelectItem>
              <SelectItem value="bold">Bold</SelectItem>
              <SelectItem value="extrabold">Extra Bold</SelectItem>
            </SelectContent>
          </Select>
        </div>
      );
    }
    
    if (key === "textAlign") {
      return (
        <div key={key} className="mb-3">
          <Label className="text-xs font-medium">Text Align</Label>
          <Select
            value={value}
            onValueChange={(v) => handleStyleChange(key, v)}
          >
            <SelectTrigger className="h-7 mt-1 text-xs">
              <SelectValue placeholder="Select alignment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="left">Left</SelectItem>
              <SelectItem value="center">Center</SelectItem>
              <SelectItem value="right">Right</SelectItem>
              <SelectItem value="justify">Justify</SelectItem>
            </SelectContent>
          </Select>
        </div>
      );
    }
    
    // Border radius selector
    if (key === "borderRadius") {
      return (
        <div key={key} className="mb-3">
          <Label className="text-xs font-medium">Border Radius</Label>
          <Select
            value={value}
            onValueChange={(v) => handleStyleChange(key, v)}
          >
            <SelectTrigger className="h-7 mt-1 text-xs">
              <SelectValue placeholder="Select radius" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="sm">Small</SelectItem>
              <SelectItem value="md">Medium</SelectItem>
              <SelectItem value="lg">Large</SelectItem>
              <SelectItem value="xl">Extra Large</SelectItem>
              <SelectItem value="full">Full</SelectItem>
            </SelectContent>
          </Select>
        </div>
      );
    }
    
    // Display/positioning selects
    if (key === "display") {
      return (
        <div key={key} className="mb-3">
          <Label className="text-xs font-medium">Display</Label>
          <Select
            value={value}
            onValueChange={(v) => handleStyleChange(key, v)}
          >
            <SelectTrigger className="h-7 mt-1 text-xs">
              <SelectValue placeholder="Select display" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="block">Block</SelectItem>
              <SelectItem value="inline">Inline</SelectItem>
              <SelectItem value="inline-block">Inline Block</SelectItem>
              <SelectItem value="flex">Flex</SelectItem>
              <SelectItem value="grid">Grid</SelectItem>
              <SelectItem value="none">None</SelectItem>
            </SelectContent>
          </Select>
        </div>
      );
    }
    
    if (key === "flexDirection") {
      return (
        <div key={key} className="mb-3">
          <Label className="text-xs font-medium">Flex Direction</Label>
          <Select
            value={value}
            onValueChange={(v) => handleStyleChange(key, v)}
          >
            <SelectTrigger className="h-7 mt-1 text-xs">
              <SelectValue placeholder="Select direction" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="row">Row</SelectItem>
              <SelectItem value="row-reverse">Row Reverse</SelectItem>
              <SelectItem value="column">Column</SelectItem>
              <SelectItem value="column-reverse">Column Reverse</SelectItem>
            </SelectContent>
          </Select>
        </div>
      );
    }
    
    if (key === "justifyContent") {
      return (
        <div key={key} className="mb-3">
          <Label className="text-xs font-medium">Justify Content</Label>
          <Select
            value={value}
            onValueChange={(v) => handleStyleChange(key, v)}
          >
            <SelectTrigger className="h-7 mt-1 text-xs">
              <SelectValue placeholder="Select justify" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="start">Start</SelectItem>
              <SelectItem value="center">Center</SelectItem>
              <SelectItem value="end">End</SelectItem>
              <SelectItem value="between">Space Between</SelectItem>
              <SelectItem value="around">Space Around</SelectItem>
              <SelectItem value="evenly">Space Evenly</SelectItem>
            </SelectContent>
          </Select>
        </div>
      );
    }
    
    if (key === "alignItems") {
      return (
        <div key={key} className="mb-3">
          <Label className="text-xs font-medium">Align Items</Label>
          <Select
            value={value}
            onValueChange={(v) => handleStyleChange(key, v)}
          >
            <SelectTrigger className="h-7 mt-1 text-xs">
              <SelectValue placeholder="Select align" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="start">Start</SelectItem>
              <SelectItem value="center">Center</SelectItem>
              <SelectItem value="end">End</SelectItem>
              <SelectItem value="stretch">Stretch</SelectItem>
              <SelectItem value="baseline">Baseline</SelectItem>
            </SelectContent>
          </Select>
        </div>
      );
    }
    
    // Default to text input with better styling
    console.log(key, value);
    return (
      <div key={key} className="mb-3">
        <Label className="text-xs font-medium">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</Label>
        <Input
          value={value}
          onChange={(e) => handleStyleChange(key, e.target.value)}
          className="h-7 text-xs mt-1"
          placeholder={`Enter ${key}`}
        />
      </div>
    );
  }

  if (!component) {
    return (
      <div className="w-full lg:w-80 xl:w-96 bg-gradient-to-b from-background to-muted/20 border-l border-border min-h-screen flex flex-col">
        <div className="p-6 text-center">
          <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl flex items-center justify-center">
            <Eye className="w-10 h-10 text-primary/60" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            No Component Selected
          </h3>
          <p className="text-sm text-muted-foreground">
            Select a component from the canvas to edit its properties
          </p>
        </div>
      </div>
    );
  }

  const componentConfig = component.type
    ? getComponent(component.type as any, component.variant)
    : null;

  // Get all available variants for this component type
  const getAvailableVariants = () => {
    try {
      if (!component.type) return [];
      const section = componentRegistry[component.type as any];
      if (section && section.variants) {
        return section.variants.map((variant) => ({
          id: variant.id,
          name: variant.name,
          description: variant.description,
        }));
      }
    } catch (error) {
      console.error(
        "Error getting variants for component type:",
        component.type,
        error
      );
    }
    return [];
  };

  const availableVariants = getAvailableVariants();

  const handleChange = (field: string, value: any) => {
    if (field === "variant") {
      try {
        const newVariantConfig = getComponent(component.type as any, value);
        if (newVariantConfig) {
          const mergedProps = {
            ...newVariantConfig.defaultProps,
            ...component.props,
          };
          for (const key of Object.keys(newVariantConfig.defaultProps)) {
            if (mergedProps[key] === undefined || mergedProps[key] === "") {
              mergedProps[key] = newVariantConfig.defaultProps[key];
            }
          }

          const mergedStyles = {
            ...newVariantConfig.defaultStyles,
            ...component.styles,
          };

          onUpdate(component.id, {
            ...component,
            variant: value,
            props: mergedProps,
            styles: mergedStyles,
          });
        } else {
          onUpdate(component.id, { ...component, variant: value });
        }
      } catch (error) {
        console.error("Error updating variant:", error);
        onUpdate(component.id, { ...component, variant: value });
      }
    } else {
      onUpdate(component.id, {
        ...component,
        [field]: value,
      });
    }
  };

  const handlePropChange = (key: string, value: any) => {
    handleChange("props", {
      ...component.props,
      [key]: value,
    });
  };

  const handleStyleChange = (key: string, value: any) => {
    handleChange("styles", {
      ...component.styles,
      [key]: value,
    });
  };

  const handleSave = () => {
    // Save to localStorage or backend
    localStorage.setItem(
      `portfolio-${component.id}-colors`,
      JSON.stringify(colorState)
    );
    // Show success feedback
  };

  const getComponentIcon = (type: string) => {
    const icons: Record<string, any> = {
      hero: Zap,
      about: User,
      skills: Sparkles,
      projects: Layers,
      experience: Globe,
      education: Mail,
      testimonials: User,
      contact: Mail,
      navbar: Layout,
      footer: Layout,
      custom: Settings,
    };
    return icons[type] || Settings;
  };

  const ComponentIcon = getComponentIcon(component.type || "");

  return (
    <div className="w-full h-[calc(100vh-66px)] bg-gradient-to-b from-background to-muted/20 border-l border-border flex flex-col relative z-10">
      {/* Header */}
      <div className="px-4 py-3 border-b border-border/50">
        <div className="flex items-center justify-between group">
          {/* Component Info */}
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="w-6 h-6 bg-primary/10 rounded-md flex items-center justify-center">
              <ComponentIcon className="w-3 h-3 text-primary/80" />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-sm font-medium text-foreground truncate">
                {component.type
                  ? component.type.charAt(0).toUpperCase() +
                    component.type.slice(1)
                  : "Component"}
              </h2>
              {component.variant && (
                <p className="text-xs text-muted-foreground/70 truncate">
                  {component.variant}
                </p>
              )}
            </div>
          </div>

          {/* Actions - Only visible on hover */}
          <div className="flex items-center gap-0.5">
            <TooltipProvider delayDuration={300}>
              {onMoveUp && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onMoveUp(component.id)}
                      className="w-7 h-7 hover:bg-muted/50"
                    >
                      <MoveUp className="w-3.5 h-3.5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="text-xs">
                    Move Up
                  </TooltipContent>
                </Tooltip>
              )}

              {onMoveDown && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onMoveDown(component.id)}
                      className="w-7 h-7 hover:bg-muted/50"
                    >
                      <MoveDown className="w-3.5 h-3.5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="text-xs">
                    Move Down
                  </TooltipContent>
                </Tooltip>
              )}

              {onDuplicate && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDuplicate(component)}
                      className="w-7 h-7 hover:bg-muted/50"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="text-xs">
                    Duplicate
                  </TooltipContent>
                </Tooltip>
              )}

              {onDelete && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(component.id)}
                      className="w-7 h-7 hover:bg-destructive/10 text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="text-xs">
                    Delete
                  </TooltipContent>
                </Tooltip>
              )}
            </TooltipProvider>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto">
          {activeTab === "content" && (
            <div className="p-4 space-y-6">
              {/* Variant Selection */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-muted-foreground" />
                  <h3 className="text-sm font-medium">
                    {availableVariants.length > 0 && (
                      <>
                        {availableVariants.length} variant
                        {availableVariants.length !== 1 ? "s" : ""}
                      </>
                    )}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/50 px-3 py-2 rounded-lg border border-emerald-200 dark:border-emerald-800">
                    <Sparkles className="w-3 h-3" />
                    <span>Changes preserved</span>
                  </div>
                </div>

                <Select
                  value={component.variant}
                  onValueChange={(value) => handleChange("variant", value)}
                >
                  <SelectTrigger className="h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {availableVariants.length > 0 ? (
                      availableVariants.map((variant) => (
                        <SelectItem key={variant.id} value={variant.id}>
                          {variant.name}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value={component.variant}>
                        {component.variant}
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>

              {/* Content Editor */}
              <ContentEditor
                key={`${component.type}-${component.variant}-${component.id}`}
                data={component.props || {}}
                onUpdate={(newProps) => handleChange("props", newProps)}
                componentType={component.type}
                componentVariant={component.variant}
              />
            </div>
          )}

          {activeTab === "style" && (
            <div className="p-4">
              <Tabs
                value={styleTab}
                onValueChange={setStyleTab}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="colors" className="text-xs">
                    Colors
                  </TabsTrigger>
                  <TabsTrigger value="typography" className="text-xs">
                    Typography
                  </TabsTrigger>
                  <TabsTrigger value="styles" className="text-xs">
                    Styles
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="colors" className="space-y-6 mt-4">
                  {/* Colors */}
                  {colorKeys.length > 0 && (
                    <ColorPanel 
                      colors={colors} 
                      setColors={setColors}
                      portfolio={portfolio}
                      onPortfolioChange={onPortfolioChange}
                    />
                  )}
                </TabsContent>

                <TabsContent value="typography" className="space-y-6 mt-4">
                  {/* Typography Settings */}
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">Font Selection</h3>
                      <p className="text-xs text-muted-foreground">
                        Choose fonts for your portfolio. These will be applied globally across all components.
                      </p>
                      
                      <div className="space-y-4">
                        <FontPicker
                          selectedFont={globalTheme?.fontHeading || "Inter"}
                          onFontChange={(font) => {
                            if (onGlobalThemeChange) {
                              onGlobalThemeChange({
                                ...globalTheme,
                                fontHeading: font,
                              });
                            }
                          }}
                          fontType="heading"
                          label="Heading Font"
                        />
                        
                        <FontPicker
                          selectedFont={globalTheme?.fontBody || "Inter"}
                          onFontChange={(font) => {
                            if (onGlobalThemeChange) {
                              onGlobalThemeChange({
                                ...globalTheme,
                                fontBody: font,
                              });
                            }
                          }}
                          fontType="body"
                          label="Body Font"
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="styles" className="space-y-6 mt-4">
                  {/* Other Style Groups */}
                  {Object.entries(styleGroups).map(([group, keys]) =>
                    group !== "Colors" && keys.length > 0 ? (
                      <div key={group} className="space-y-3">
                        <h3 className="text-sm font-medium">{group}</h3>
                        <div className="space-y-3">
                          {keys.map(renderStyleField)}
                        </div>
                      </div>
                    ) : null
                  )}
                </TabsContent>
              </Tabs>
            </div>
          )}

          {activeTab === "advanced" && (
            <div className="p-4 space-y-6">
              {/* Component Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Settings className="w-4 h-4 text-muted-foreground" />
                  <h3 className="text-sm font-medium">Info</h3>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">ID</Label>
                    <Input
                      value={component.id}
                      readOnly
                      className="h-8 bg-muted/50 text-xs font-mono"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">
                      Order
                    </Label>
                    <Input
                      type="number"
                      value={component.order}
                      onChange={(e) =>
                        handleChange("order", parseInt(e.target.value))
                      }
                      className="h-8 text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Raw Data */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Code className="w-4 h-4 text-muted-foreground" />
                  <h3 className="text-sm font-medium">Raw Data</h3>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">
                      Styles
                    </Label>
                    <Textarea
                      value={JSON.stringify(component.styles, null, 2)}
                      onChange={(e) => {
                        try {
                          const parsed = JSON.parse(e.target.value);
                          handleChange("styles", parsed);
                        } catch (error) {
                          // Invalid JSON, ignore
                        }
                      }}
                      placeholder="Edit styles as JSON..."
                      className="font-mono text-xs h-24 resize-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">
                      Props
                    </Label>
                    <Textarea
                      value={JSON.stringify(component.props, null, 2)}
                      onChange={(e) => {
                        try {
                          const parsed = JSON.parse(e.target.value);
                          handleChange("props", parsed);
                        } catch (error) {
                          // Invalid JSON, ignore
                        }
                      }}
                      placeholder="Edit props as JSON..."
                      className="font-mono text-xs h-24 resize-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
