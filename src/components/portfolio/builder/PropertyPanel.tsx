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

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ContentEditor from "./ContentEditor";
import ColorPanel from "./ColorPanel";

interface PropertyPanelProps {
  component: PortfolioComponent | null;
  onUpdate: (id: string, updates: Partial<PortfolioComponent>) => void;
  onDelete?: (id: string) => void;
  onDuplicate?: (component: PortfolioComponent) => void;
  onMoveUp?: (id: string) => void;
  onMoveDown?: (id: string) => void;
  activeTab?: "content" | "style" | "advanced";
}

export default function PropertyPanel({
  component,
  onUpdate,
  onDelete,
  onDuplicate,
  onMoveUp,
  onMoveDown,
  activeTab = "content",
}: PropertyPanelProps) {


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
        <div key={key} className="mb-4">
          <Label className="text-xs text-muted-foreground">{key}</Label>
          <div className="flex gap-2 mt-1 items-center">
            <Input
              type="color"
              value={value}
              onChange={(e) => handleStyleChange(key, e.target.value)}
              className="w-12 h-8 p-1"
            />
            <Input
              value={value}
              onChange={(e) => handleStyleChange(key, e.target.value)}
              className="flex-1 h-8"
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
        <div key={key} className="mb-4">
          <Label className="text-xs text-muted-foreground">{key}</Label>
          <Input
            type="number"
            value={value}
            onChange={(e) => handleStyleChange(key, e.target.value)}
            className="h-8"
          />
        </div>
      );
    }
    // Typography selects
    if (key === "fontSize") {
      return (
        <div key={key} className="mb-4">
          <Label className="text-xs text-muted-foreground">Font Size</Label>
          <Select
            value={value}
            onValueChange={(v) => handleStyleChange(key, v)}
          >
            <SelectTrigger className="h-8 mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sm">Small</SelectItem>
              <SelectItem value="base">Base</SelectItem>
              <SelectItem value="lg">Large</SelectItem>
              <SelectItem value="xl">Extra Large</SelectItem>
            </SelectContent>
          </Select>
        </div>
      );
    }
    if (key === "fontWeight") {
      return (
        <div key={key} className="mb-4">
          <Label className="text-xs text-muted-foreground">Font Weight</Label>
          <Select
            value={value}
            onValueChange={(v) => handleStyleChange(key, v)}
          >
            <SelectTrigger className="h-8 mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="normal">Normal</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="semibold">Semibold</SelectItem>
              <SelectItem value="bold">Bold</SelectItem>
            </SelectContent>
          </Select>
        </div>
      );
    }
    if (key === "textAlign") {
      return (
        <div key={key} className="mb-4">
          <Label className="text-xs text-muted-foreground">Text Align</Label>
          <Select
            value={value}
            onValueChange={(v) => handleStyleChange(key, v)}
          >
            <SelectTrigger className="h-8 mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="left">Left</SelectItem>
              <SelectItem value="center">Center</SelectItem>
              <SelectItem value="right">Right</SelectItem>
            </SelectContent>
          </Select>
        </div>
      );
    }
    // Default to text input
    return (
      <div key={key} className="mb-4">
        <Label className="text-xs text-muted-foreground">{key}</Label>
        <Input
          value={value}
          onChange={(e) => handleStyleChange(key, e.target.value)}
          className="h-8"
        />
      </div>
    );
  };

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

  // Debounced style change for color inputs
  const debouncedStyleChange = (key: string, value: any) => {
    if (debounceRefs.current[key]) {
      clearTimeout(debounceRefs.current[key]);
    }
    debounceRefs.current[key] = setTimeout(() => {
      handleStyleChange(key, value);
    }, 200);
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
    <div className="w-full sm:w-64 lg:w-72 xl:w-80 bg-gradient-to-b from-background to-muted/20 border-l border-border flex flex-col relative z-10">
      {/* Header */}
      <div className="p-3 border-b border-border bg-gradient-to-r from-background to-muted/30">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">

            <div className="min-w-0 flex-1">
              <h2 className="text-sm font-semibold text-foreground truncate">
                {component.variant}
              </h2>

            </div>
          </div>
          <Badge variant="secondary" className="text-xs shrink-0">
            {component.type}
          </Badge>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-1">
          <TooltipProvider>
            {onMoveUp && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onMoveUp(component.id)}
                    className="flex-1 h-5 px-2"
                  >
                    <MoveUp className="w-2 h-2" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Move Up</TooltipContent>
              </Tooltip>
            )}
            {onMoveDown && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onMoveDown(component.id)}
                    className="flex-1 h-5 px-2"
                  >
                    <MoveDown className="w-2 h-2" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Move Down</TooltipContent>
              </Tooltip>
            )}
            {onDuplicate && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDuplicate(component)}
                    className="flex-1 h-5 px-2"
                  >
                    <Copy className="w-2 h-2" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Duplicate</TooltipContent>
              </Tooltip>
            )}
            {onDelete && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(component.id)}
                    className="flex-1 h-5 px-2 text-destructive hover:text-destructive-foreground"
                  >
                    <Trash2 className="w-2 h-2" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Delete</TooltipContent>
              </Tooltip>
            )}
          </TooltipProvider>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden overflow-y-auto max-h-[calc(100vh-180px)]">
        {activeTab === "content" && (
          <div className="p-3 space-y-4 overflow-y-auto max-h-[calc(100vh-200px)]">
            {/* Variant Selection */}
            <Card className="p-2">
              <CardHeader className="p-2 pb-0">
                <CardTitle className="text-xs font-medium flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <Layers className="w-3 h-3" />
                    Variant
                  </span>
                  <span className="flex items-center gap-1 text-primary text-[10px] bg-primary/10 px-1 py-0.5 rounded">
                    <Sparkles className="w-2 h-2" />
                    Changes saved
                  </span>
                </CardTitle>
              </CardHeader>

              <CardContent className="p-2 pt-1 space-y-1">
                <Select
                  value={component.variant}
                  onValueChange={(value) => handleChange("variant", value)}
                >
                  <SelectTrigger className="h-7 text-xs px-2">
                    <SelectValue placeholder="Select variant" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableVariants.length > 0 ? (
                      availableVariants.map((variant) => (
                        <SelectItem key={variant.id} value={variant.id} className="text-xs">
                          {variant.name}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value={component.variant} className="text-xs">
                        {component.variant}
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>

                {availableVariants.length > 0 && (
                  <p className="text-[10px] text-muted-foreground">
                    {availableVariants.length} variant
                    {availableVariants.length !== 1 ? "s" : ""}
                  </p>
                )}
              </CardContent>
            </Card>


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
          <div className="p-2 space-y-2 overflow-y-auto max-h-[calc(100vh-200px)]">
  {/* ColorPanel for all color fields */}
  {colorKeys.length > 0 && (
    <Card key="Colors" className="p-2">
      <CardHeader className="pb-1 px-2">
        <CardTitle className="text-[11px] font-medium">Colors</CardTitle>
      </CardHeader>
      <CardContent className="space-y-1 px-2 py-1">
        <ColorPanel colors={colors} setColors={setColors} />
      </CardContent>
    </Card>
  )}

  {/* Render other style groups, skipping color fields */}
  {Object.entries(styleGroups).map(([group, keys]) =>
    group !== "Colors" && keys.length > 0 ? (
      <Card key={group} className="p-2">
        <CardHeader className="pb-1 px-2">
          <CardTitle className="text-[11px] font-medium">{group}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1 px-2 py-1">
          {keys.map(renderStyleField)}
        </CardContent>
      </Card>
    ) : null
  )}
</div>

        )}

        {activeTab === "advanced" && (
          <div className="p-3 space-y-4 overflow-y-auto max-h-[calc(100vh-200px)]">
            {/* Component Info */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-medium flex items-center gap-2">
                  <Settings className="w-3 h-3" />
                  Info
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label className="text-xs text-muted-foreground">ID</Label>
                  <Input
                    value={component.id}
                    readOnly
                    className="mt-1 h-7 bg-muted/50 text-xs"
                  />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Order</Label>
                  <Input
                    type="number"
                    value={component.order}
                    onChange={(e) =>
                      handleChange("order", parseInt(e.target.value))
                    }
                    className="mt-1 h-7 text-xs"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Raw Data */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-medium flex items-center gap-2">
                  <Code className="w-3 h-3" />
                  Raw Data
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
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
                    className="mt-1 font-mono text-xs h-20"
                  />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Props</Label>
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
                    className="mt-1 font-mono text-xs h-20"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
