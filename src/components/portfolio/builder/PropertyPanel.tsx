import React, { useState } from "react";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
import ContentEditor from "./ContentEditor";

interface PropertyPanelProps {
  component: PortfolioComponent | null;
  onUpdate: (id: string, updates: Partial<PortfolioComponent>) => void;
  onDelete?: (id: string) => void;
  onDuplicate?: (component: PortfolioComponent) => void;
  onMoveUp?: (id: string) => void;
  onMoveDown?: (id: string) => void;
}

export default function PropertyPanel({
  component,
  onUpdate,
  onDelete,
  onDuplicate,
  onMoveUp,
  onMoveDown,
}: PropertyPanelProps) {
  // Use component ID to maintain tab state per component
  const [activeTab, setActiveTab] = useState("content");
  const [componentTabStates, setComponentTabStates] = useState<
    Record<string, string>
  >({});

  // Update active tab when component changes, but preserve tab state per component
  React.useEffect(() => {
    if (component) {
      const savedTab = componentTabStates[component.id] || "content";
      setActiveTab(savedTab);
    }
  }, [component?.id, componentTabStates]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    if (component) {
      setComponentTabStates((prev) => ({
        ...prev,
        [component.id]: tabId,
      }));
    }
  };

  if (!component) {
    return (
      <div className="w-full lg:w-80 xl:w-96 p-4 bg-white border-l border-gray-200 min-h-0">
        <div className="flex items-center gap-2 mb-4">
          <Settings className="w-5 h-5 text-gray-500" />
          <h2 className="text-lg font-semibold text-gray-700">Properties</h2>
        </div>
        <div className="text-center py-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <Eye className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-sm text-gray-500 mb-2">No component selected</p>
          <p className="text-xs text-gray-400">
            Select a component to edit its properties
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

  // Debug: Log component info
  console.log("PropertyPanel - Component:", {
    type: component.type,
    variant: component.variant,
    availableVariants: availableVariants,
    componentConfig: componentConfig,
  });
  const handleChange = (field: string, value: any) => {
    if (field === "variant") {
      // When changing variant, preserve user changes and only merge with defaults for missing properties
      try {
        const newVariantConfig = getComponent(component.type as any, value);
        if (newVariantConfig) {
          // Merge defaultProps with existing props, but ensure all required props are present
          const mergedProps = {
            ...newVariantConfig.defaultProps, // Start with new variant defaults
            ...component.props, // Override with existing user props (preserves user changes)
          };
          // Ensure all keys from defaultProps are present
          for (const key of Object.keys(newVariantConfig.defaultProps)) {
            if (mergedProps[key] === undefined || mergedProps[key] === "") {
              mergedProps[key] = newVariantConfig.defaultProps[key];
            }
          }

          const mergedStyles = {
            ...newVariantConfig.defaultStyles, // Start with new variant defaults
            ...component.styles, // Override with existing user styles (preserves user changes)
          };

          onUpdate(component.id, {
            variant: value,
            props: mergedProps,
            styles: mergedStyles,
          });
        } else {
          // Fallback if variant config not found
          onUpdate(component.id, { variant: value });
        }
      } catch (error) {
        console.error("Error updating variant:", error);
        onUpdate(component.id, { variant: value });
      }
    } else {
      onUpdate(component.id, { [field]: value });
    }
  };

  const handlePropChange = (key: string, value: any) => {
    console.log(`PropertyPanel: Updating prop ${key} to`, value);
    console.log(`PropertyPanel: Current props:`, component.props);
    handleChange("props", {
      ...component.props,
      [key]: value,
    });
  };

  const handleStyleChange = (key: string, value: any) => {
    console.log(`PropertyPanel: Updating style ${key} to`, value);
    console.log(`PropertyPanel: Current styles:`, component.styles);
    handleChange("styles", {
      ...component.styles,
      [key]: value,
    });
  };

  const tabs = [
    { id: "content", label: "Content", icon: Type },
    { id: "style", label: "Style", icon: Palette },
    { id: "layout", label: "Layout", icon: Layout },
    { id: "advanced", label: "Advanced", icon: Settings },
  ];

  return (
    <div className="w-full lg:w-80 xl:w-96 bg-white border-l border-gray-200 min-h-screen overflow-scroll flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-900">
              {component.type
                ? component.type.charAt(0).toUpperCase() +
                  component.type.slice(1)
                : "Component"}{" "}
              Properties
            </h2>
          </div>
          <Badge variant="secondary" className="text-xs">
            {component.variant}
          </Badge>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-1">
          {onMoveUp && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onMoveUp(component.id)}
              className="flex-1"
            >
              <MoveUp className="w-4 h-4" />
            </Button>
          )}
          {onMoveDown && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onMoveDown(component.id)}
              className="flex-1"
            >
              <MoveDown className="w-4 h-4" />
            </Button>
          )}
          {onDuplicate && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDuplicate(component)}
              className="flex-1"
            >
              <Copy className="w-4 h-4" />
            </Button>
          )}
          {onDelete && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(component.id)}
              className="flex-1 text-red-600 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {activeTab === "content" && (
          <div className="space-y-4">
            {/* Variant Selection */}
            <div>
              <Label className="text-sm font-medium">Variant</Label>
              <Select
                value={component.variant}
                onValueChange={(value) => {
                  console.log(
                    "Changing variant from",
                    component.variant,
                    "to",
                    value
                  );
                  handleChange("variant", value);
                }}
              >
                <SelectTrigger className="mt-1">
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
                    <>
                      <SelectItem value="default">Default</SelectItem>
                      <SelectItem value="minimal">Minimal</SelectItem>
                      <SelectItem value="detailed">Detailed</SelectItem>
                      <SelectItem value={component.variant}>
                        {component.variant}
                      </SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
              {availableVariants.length > 0 && (
                <p className="mt-1 text-xs text-gray-500">
                  {availableVariants.length} variant
                  {availableVariants.length !== 1 ? "s" : ""} available
                </p>
              )}
              <p className="mt-1 text-xs text-blue-600">
                💡 Your content and style changes will be preserved when
                switching variants
              </p>
            </div>

            {/* Dynamic Content Editor */}
            <ContentEditor
              data={component.props || {}}
              onUpdate={(newProps) => handleChange("props", newProps)}
              componentType={component.type}
              componentVariant={component.variant}
            />
          </div>
        )}

        {activeTab === "style" && (
          <div className="space-y-4">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="colors">
                <AccordionTrigger className="text-sm">Colors</AccordionTrigger>
                <AccordionContent className="space-y-3">
                  <div>
                    <Label className="text-sm">Background Color</Label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        type="color"
                        value={component.styles?.backgroundColor || "#ffffff"}
                        onChange={(e) =>
                          handleStyleChange("backgroundColor", e.target.value)
                        }
                        className="w-12 h-8 p-1"
                      />
                      <Input
                        value={component.styles?.backgroundColor || "#ffffff"}
                        onChange={(e) =>
                          handleStyleChange("backgroundColor", e.target.value)
                        }
                        placeholder="#ffffff"
                        className="flex-1"
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm">Text Color</Label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        type="color"
                        value={component.styles?.textColor || "#000000"}
                        onChange={(e) =>
                          handleStyleChange("textColor", e.target.value)
                        }
                        className="w-12 h-8 p-1"
                      />
                      <Input
                        value={component.styles?.textColor || "#000000"}
                        onChange={(e) =>
                          handleStyleChange("textColor", e.target.value)
                        }
                        placeholder="#000000"
                        className="flex-1"
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm">Primary Color</Label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        type="color"
                        value={component.styles?.primaryColor || "#3b82f6"}
                        onChange={(e) =>
                          handleStyleChange("primaryColor", e.target.value)
                        }
                        className="w-12 h-8 p-1"
                      />
                      <Input
                        value={component.styles?.primaryColor || "#3b82f6"}
                        onChange={(e) =>
                          handleStyleChange("primaryColor", e.target.value)
                        }
                        placeholder="#3b82f6"
                        className="flex-1"
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm">Secondary Color</Label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        type="color"
                        value={component.styles?.secondaryColor || "#64748b"}
                        onChange={(e) =>
                          handleStyleChange("secondaryColor", e.target.value)
                        }
                        className="w-12 h-8 p-1"
                      />
                      <Input
                        value={component.styles?.secondaryColor || "#64748b"}
                        onChange={(e) =>
                          handleStyleChange("secondaryColor", e.target.value)
                        }
                        placeholder="#64748b"
                        className="flex-1"
                      />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="spacing">
                <AccordionTrigger className="text-sm">Spacing</AccordionTrigger>
                <AccordionContent className="space-y-3">
                  <div>
                    <Label className="text-sm">Padding Y</Label>
                    <Input
                      type="number"
                      value={component.styles?.paddingY || "16"}
                      onChange={(e) =>
                        handleStyleChange("paddingY", e.target.value)
                      }
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-sm">Padding X</Label>
                    <Input
                      type="number"
                      value={component.styles?.paddingX || "4"}
                      onChange={(e) =>
                        handleStyleChange("paddingX", e.target.value)
                      }
                      className="mt-1"
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="typography">
                <AccordionTrigger className="text-sm">
                  Typography
                </AccordionTrigger>
                <AccordionContent className="space-y-3">
                  <div>
                    <Label className="text-sm">Text Align</Label>
                    <Select
                      value={component.styles?.textAlign || "left"}
                      onValueChange={(value) =>
                        handleStyleChange("textAlign", value)
                      }
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="left">Left</SelectItem>
                        <SelectItem value="center">Center</SelectItem>
                        <SelectItem value="right">Right</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm">Font Size</Label>
                    <Select
                      value={component.styles?.fontSize || "base"}
                      onValueChange={(value) =>
                        handleStyleChange("fontSize", value)
                      }
                    >
                      <SelectTrigger className="mt-1">
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
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        )}

        {activeTab === "layout" && (
          <div className="space-y-4">
            <div>
              <Label className="text-sm">Component Order</Label>
              <Input
                type="number"
                value={component.order}
                onChange={(e) =>
                  handleChange("order", parseInt(e.target.value))
                }
                className="mt-1"
              />
            </div>
            <div>
              <Label className="text-sm">Component ID</Label>
              <Input
                value={component.id}
                readOnly
                className="mt-1 bg-gray-50"
              />
            </div>
          </div>
        )}

        {activeTab === "advanced" && (
          <div className="space-y-4">
            <div>
              <Label className="text-sm">Raw Styles (JSON)</Label>
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
                className="mt-1 font-mono text-xs"
                rows={6}
              />
            </div>
            <div>
              <Label className="text-sm">Raw Props (JSON)</Label>
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
                className="mt-1 font-mono text-xs"
                rows={6}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
