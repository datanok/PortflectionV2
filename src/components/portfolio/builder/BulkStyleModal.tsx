import React, { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Palette,
  Type,
  Layout,
  Save,
  RotateCcw,
  Sparkles,
  Zap,
  Globe,
  Settings,
  Layers,
  Paintbrush,
  Wand2,
  Target,
  Eye,
  Sparkles as SparklesIcon,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PortfolioComponent } from "@/lib/portfolio/types";
import { cn } from "@/lib/utils";
import { generateCompleteStyleCSS } from "@/lib/backgroundEffects";

interface BulkStyleModalProps {
  components: PortfolioComponent[];
  onUpdateComponents: (updates: Partial<PortfolioComponent>) => void;
  trigger?: React.ReactNode;
}

interface BulkStyleSettings {
  backgroundColor?: string;
  textColor?: string;
  primaryColor?: string;
  secondaryColor?: string;
  borderRadius?: string;
  fontSize?: string;
  fontWeight?: string;
  textAlign?: "left" | "center" | "right";
  paddingY?: string;
  paddingX?: string;

  // Gradient Options
  gradientType?: "linear" | "radial" | "conic";
  gradientDirection?:
    | "to-r"
    | "to-l"
    | "to-t"
    | "to-b"
    | "to-tr"
    | "to-tl"
    | "to-br"
    | "to-bl";
  gradientColors?: string[];
  // Advanced Effects
  backdropBlur?: string;
  boxShadow?: string;
  borderStyle?: "solid" | "dashed" | "dotted" | "double";
  borderWidth?: string;
  borderColor?: string;
}

export default function BulkStyleModal({
  components,
  onUpdateComponents,
  trigger,
}: BulkStyleModalProps) {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("colors");
  const [bulkSettings, setBulkSettings] = useState<BulkStyleSettings>({
    backgroundColor: "",
    textColor: "",
    primaryColor: "",
    secondaryColor: "",
    borderRadius: "",
    fontSize: "",
    fontWeight: "",
    textAlign: "left",
    paddingY: "",
    paddingX: "",

    // Gradient Options
    gradientType: "linear",
    gradientDirection: "to-r",
    gradientColors: ["#3b82f6", "#8b5cf6"],
    // Advanced Effects
    backdropBlur: "",
    boxShadow: "",
    borderStyle: "solid",
    borderWidth: "",
    borderColor: "",
  });

  const handleBulkUpdate = useCallback(() => {
    const styleUpdates: Record<string, any> = {};

    // Generate CSS for advanced styling
    const effectSettings = {
      gradient:
        bulkSettings.gradientType && bulkSettings.gradientColors
          ? {
              type: bulkSettings.gradientType,
              direction: bulkSettings.gradientDirection,
              colors: bulkSettings.gradientColors,
            }
          : undefined,
      border:
        bulkSettings.borderWidth && bulkSettings.borderColor
          ? {
              style: bulkSettings.borderStyle,
              width: bulkSettings.borderWidth,
              color: bulkSettings.borderColor,
            }
          : undefined,
      shadow: bulkSettings.boxShadow
        ? {
            type: "box" as const,
            color: "rgba(0,0,0,0.1)",
            blur: "4px",
            spread: "0px",
            offsetX: "0px",
            offsetY: "2px",
          }
        : undefined,
      backdropBlur: bulkSettings.backdropBlur,
    };

    // Generate CSS for effects
    const effectCSS = generateCompleteStyleCSS(effectSettings);
    if (effectCSS && Object.keys(effectCSS).length > 0) {
      // Merge the generated CSS properties into styleUpdates
      Object.assign(styleUpdates, effectCSS);
    }

    // Only include non-empty basic values
    Object.entries(bulkSettings).forEach(([key, value]) => {
      if (
        value &&
        value !== "" &&
        !key.startsWith("backgroundEffect") &&
        !key.startsWith("gradient") &&
        key !== "borderStyle" &&
        key !== "borderWidth" &&
        key !== "borderColor" &&
        key !== "boxShadow" &&
        key !== "backdropBlur"
      ) {
        styleUpdates[key] = value;
      }
    });

    if (Object.keys(styleUpdates).length > 0) {
      onUpdateComponents({ styles: styleUpdates });
      setOpen(false);
    }
  }, [bulkSettings, onUpdateComponents]);

  const handleReset = useCallback(() => {
    setBulkSettings({
      backgroundColor: "",
      textColor: "",
      primaryColor: "",
      secondaryColor: "",
      borderRadius: "",
      fontSize: "",
      fontWeight: "",
      textAlign: "left",
      paddingY: "",
      paddingX: "",

      // Gradient Options
      gradientType: "linear",
      gradientDirection: "to-r",
      gradientColors: ["#3b82f6", "#8b5cf6"],
      // Advanced Effects
      backdropBlur: "",
      boxShadow: "",
      borderStyle: "solid",
      borderWidth: "",
      borderColor: "",
    });
  }, []);

  const getComponentCount = () => {
    const typeCounts: Record<string, number> = {};
    components.forEach((comp) => {
      typeCounts[comp.type] = (typeCounts[comp.type] || 0) + 1;
    });
    return typeCounts;
  };

  const componentCounts = getComponentCount();
  const totalComponents = components.length;

  const defaultTrigger = (
    <Button variant="outline" size="sm" className="gap-2">
      <Sparkles className="w-4 h-4" />
      Bulk Style
    </Button>
  );

  return (
<Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>
      <DialogContent className="max-w-5xl max-h-[90vh] p-0 flex flex-col">
        {/* Compact Header */}
        <DialogHeader className="px-4 py-3 border-b bg-background/95 backdrop-blur flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 border border-primary/20">
                <Paintbrush className="w-4 h-4 text-primary" />
              </div>
              <div>
                <DialogTitle className="text-lg font-semibold">
                  Bulk Style Editor
                </DialogTitle>
                <p className="text-xs text-muted-foreground">
                  Apply styles to all components at once
                </p>
              </div>
            </div>
            <Badge variant="secondary" className="gap-1.5 text-xs px-2 py-1">
              <Target className="w-3 h-3" />
              {totalComponents}
            </Badge>
          </div>
        </DialogHeader>

        {/* Content */}
        <div className="flex-1 min-h-0 flex flex-col">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="flex-1 flex flex-col min-h-0"
          >
            {/* Compact Tab Navigation */}
            <div className="px-4 py-2 border-b bg-background/50 flex-shrink-0">
              <TabsList className="grid w-full grid-cols-4 h-8">
                <TabsTrigger value="colors" className="gap-1 text-xs px-2">
                  <Palette className="w-3 h-3" />
                  <span className="hidden sm:inline">Colors</span>
                </TabsTrigger>
                <TabsTrigger value="typography" className="gap-1 text-xs px-2">
                  <Type className="w-3 h-3" />
                  <span className="hidden sm:inline">Text</span>
                </TabsTrigger>
                <TabsTrigger value="layout" className="gap-1 text-xs px-2">
                  <Layout className="w-3 h-3" />
                  <span className="hidden sm:inline">Layout</span>
                </TabsTrigger>
                <TabsTrigger value="effects" className="gap-1 text-xs px-2">
                  <Sparkles className="w-3 h-3" />
                  <span className="hidden sm:inline">Effects</span>
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-3 min-h-0">
              {/* Colors Tab */}
              <TabsContent value="colors" className="space-y-3 mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {/* Background Color */}
                  <div className="space-y-2 p-3 rounded-lg border border-border/50">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-muted border" />
                      <span className="text-sm font-medium">Background</span>
                    </div>
                    <div className="flex gap-1.5">
                      <Input
                        type="color"
                        value={bulkSettings.backgroundColor || "#ffffff"}
                        onChange={(e) =>
                          setBulkSettings((prev) => ({
                            ...prev,
                            backgroundColor: e.target.value,
                          }))
                        }
                        className="w-8 h-7 p-0 border-0 rounded cursor-pointer"
                      />
                      <Input
                        value={bulkSettings.backgroundColor || ""}
                        onChange={(e) =>
                          setBulkSettings((prev) => ({
                            ...prev,
                            backgroundColor: e.target.value,
                          }))
                        }
                        placeholder="#ffffff"
                        className="flex-1 h-7 text-xs"
                      />
                    </div>
                  </div>

                  {/* Text Color */}
                  <div className="space-y-2 p-3 rounded-lg border border-border/50">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-foreground" />
                      <span className="text-sm font-medium">Text</span>
                    </div>
                    <div className="flex gap-1.5">
                      <Input
                        type="color"
                        value={bulkSettings.textColor || "#000000"}
                        onChange={(e) =>
                          setBulkSettings((prev) => ({
                            ...prev,
                            textColor: e.target.value,
                          }))
                        }
                        className="w-8 h-7 p-0 border-0 rounded cursor-pointer"
                      />
                      <Input
                        value={bulkSettings.textColor || ""}
                        onChange={(e) =>
                          setBulkSettings((prev) => ({
                            ...prev,
                            textColor: e.target.value,
                          }))
                        }
                        placeholder="#000000"
                        className="flex-1 h-7 text-xs"
                      />
                    </div>
                  </div>

                  {/* Primary Color */}
                  <div className="space-y-2 p-3 rounded-lg border border-border/50">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-primary" />
                      <span className="text-sm font-medium">Primary</span>
                    </div>
                    <div className="flex gap-1.5">
                      <Input
                        type="color"
                        value={bulkSettings.primaryColor || "#3b82f6"}
                        onChange={(e) =>
                          setBulkSettings((prev) => ({
                            ...prev,
                            primaryColor: e.target.value,
                          }))
                        }
                        className="w-8 h-7 p-0 border-0 rounded cursor-pointer"
                      />
                      <Input
                        value={bulkSettings.primaryColor || ""}
                        onChange={(e) =>
                          setBulkSettings((prev) => ({
                            ...prev,
                            primaryColor: e.target.value,
                          }))
                        }
                        placeholder="#3b82f6"
                        className="flex-1 h-7 text-xs"
                      />
                    </div>
                  </div>

                  {/* Secondary Color */}
                  <div className="space-y-2 p-3 rounded-lg border border-border/50">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-secondary" />
                      <span className="text-sm font-medium">Secondary</span>
                    </div>
                    <div className="flex gap-1.5">
                      <Input
                        type="color"
                        value={bulkSettings.secondaryColor || "#64748b"}
                        onChange={(e) =>
                          setBulkSettings((prev) => ({
                            ...prev,
                            secondaryColor: e.target.value,
                          }))
                        }
                        className="w-8 h-7 p-0 border-0 rounded cursor-pointer"
                      />
                      <Input
                        value={bulkSettings.secondaryColor || ""}
                        onChange={(e) =>
                          setBulkSettings((prev) => ({
                            ...prev,
                            secondaryColor: e.target.value,
                          }))
                        }
                        placeholder="#64748b"
                        className="flex-1 h-7 text-xs"
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Typography Tab */}
              <TabsContent value="typography" className="space-y-3 mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {/* Font Size */}
                  <div className="space-y-2 p-3 rounded-lg border border-border/50">
                    <div className="flex items-center gap-2">
                      <Type className="w-3.5 h-3.5" />
                      <span className="text-sm font-medium">Font Size</span>
                    </div>
                    <Select
                      value={bulkSettings.fontSize || ""}
                      onValueChange={(value) =>
                        setBulkSettings((prev) => ({
                          ...prev,
                          fontSize: value,
                        }))
                      }
                    >
                      <SelectTrigger className="h-7 text-xs">
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="xs">Extra Small</SelectItem>
                        <SelectItem value="sm">Small</SelectItem>
                        <SelectItem value="base">Base</SelectItem>
                        <SelectItem value="lg">Large</SelectItem>
                        <SelectItem value="xl">Extra Large</SelectItem>
                        <SelectItem value="2xl">2X Large</SelectItem>
                        <SelectItem value="3xl">3X Large</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Font Weight */}
                  <div className="space-y-2 p-3 rounded-lg border border-border/50">
                    <div className="flex items-center gap-2">
                      <Zap className="w-3.5 h-3.5" />
                      <span className="text-sm font-medium">Font Weight</span>
                    </div>
                    <Select
                      value={bulkSettings.fontWeight || ""}
                      onValueChange={(value) =>
                        setBulkSettings((prev) => ({
                          ...prev,
                          fontWeight: value,
                        }))
                      }
                    >
                      <SelectTrigger className="h-7 text-xs">
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

                  {/* Text Align */}
                  <div className="space-y-2 p-3 rounded-lg border border-border/50">
                    <div className="flex items-center gap-2">
                      <Layout className="w-3.5 h-3.5" />
                      <span className="text-sm font-medium">Text Align</span>
                    </div>
                    <Select
                      value={bulkSettings.textAlign || "left"}
                      onValueChange={(value: "left" | "center" | "right") =>
                        setBulkSettings((prev) => ({
                          ...prev,
                          textAlign: value,
                        }))
                      }
                    >
                      <SelectTrigger className="h-7 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="left">Left</SelectItem>
                        <SelectItem value="center">Center</SelectItem>
                        <SelectItem value="right">Right</SelectItem>
                        <SelectItem value="justify">Justify</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Border Radius */}
                  <div className="space-y-2 p-3 rounded-lg border border-border/50">
                    <div className="flex items-center gap-2">
                      <div className="w-3.5 h-3.5 rounded-sm bg-muted border" />
                      <span className="text-sm font-medium">Border Radius</span>
                    </div>
                    <Select
                      value={bulkSettings.borderRadius || ""}
                      onValueChange={(value) =>
                        setBulkSettings((prev) => ({
                          ...prev,
                          borderRadius: value,
                        }))
                      }
                    >
                      <SelectTrigger className="h-7 text-xs">
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
                </div>
              </TabsContent>

              {/* Layout Tab */}
              <TabsContent value="layout" className="space-y-3 mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {/* Vertical Padding */}
                  <div className="space-y-2 p-3 rounded-lg border border-border/50">
                    <div className="flex items-center gap-2">
                      <div className="w-3.5 h-2 bg-muted rounded border" />
                      <span className="text-sm font-medium">Vertical Padding</span>
                    </div>
                    <Input
                      value={bulkSettings.paddingY || ""}
                      onChange={(e) =>
                        setBulkSettings((prev) => ({
                          ...prev,
                          paddingY: e.target.value,
                        }))
                      }
                      placeholder="120px"
                      className="h-7 text-xs"
                    />
                  </div>

                  {/* Horizontal Padding */}
                  <div className="space-y-2 p-3 rounded-lg border border-border/50">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-3.5 bg-muted rounded border" />
                      <span className="text-sm font-medium">Horizontal Padding</span>
                    </div>
                    <Input
                      value={bulkSettings.paddingX || ""}
                      onChange={(e) =>
                        setBulkSettings((prev) => ({
                          ...prev,
                          paddingX: e.target.value,
                        }))
                      }
                      placeholder="32px"
                      className="h-7 text-xs"
                    />
                  </div>
                </div>
              </TabsContent>

              {/* Effects Tab */}
              <TabsContent value="effects" className="space-y-3 mt-0">
                {/* Compact Preview */}
                <div className="p-3 rounded-lg border border-border/50">
                  <div className="flex items-center gap-2 mb-2">
                    <Eye className="w-3.5 h-3.5" />
                    <span className="text-sm font-medium">Live Preview</span>
                  </div>
                  <div
                    className="w-full h-20 rounded-lg border-2 border-dashed border-muted-foreground/20 flex items-center justify-center relative overflow-hidden backdrop-blur-sm"
                    style={{
                      ...(bulkSettings.backgroundColor && {
                        backgroundColor: bulkSettings.backgroundColor,
                      }),
                      ...generateCompleteStyleCSS({
                        gradient:
                          bulkSettings.gradientType &&
                          bulkSettings.gradientColors
                            ? {
                                type: bulkSettings.gradientType,
                                direction: bulkSettings.gradientDirection,
                                colors: bulkSettings.gradientColors,
                              }
                            : undefined,
                        border:
                          bulkSettings.borderWidth && bulkSettings.borderColor
                            ? {
                                style: bulkSettings.borderStyle,
                                width: bulkSettings.borderWidth,
                                color: bulkSettings.borderColor,
                              }
                            : undefined,
                        shadow: bulkSettings.boxShadow
                          ? {
                              type: "box",
                              color: "rgba(0,0,0,0.1)",
                              blur: "4px",
                              spread: "0px",
                              offsetX: "0px",
                              offsetY: "2px",
                            }
                          : undefined,
                        backdropBlur: bulkSettings.backdropBlur,
                      }),
                    }}
                  >
                    <div className="text-center">
                      <div className="text-xs font-medium mb-0.5">Preview</div>
                      <div className="text-xs text-muted-foreground">
                        Style Preview
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {/* Gradient Type */}
                  <div className="space-y-2 p-3 rounded-lg border border-border/50">
                    <div className="flex items-center gap-2">
                      <Globe className="w-3.5 h-3.5" />
                      <span className="text-sm font-medium">Gradient</span>
                    </div>
                    <Select
                      value={bulkSettings.gradientType || ""}
                      onValueChange={(value: "linear" | "radial" | "conic") =>
                        setBulkSettings((prev) => ({
                          ...prev,
                          gradientType: value,
                        }))
                      }
                    >
                      <SelectTrigger className="h-7 text-xs">
                        <SelectValue placeholder="Select gradient" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="linear">Linear</SelectItem>
                        <SelectItem value="radial">Radial</SelectItem>
                        <SelectItem value="conic">Conic</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Box Shadow */}
                  <div className="space-y-2 p-3 rounded-lg border border-border/50">
                    <div className="flex items-center gap-2">
                      <div className="w-3.5 h-3.5 rounded-sm bg-muted border shadow-sm" />
                      <span className="text-sm font-medium">Shadow</span>
                    </div>
                    <Input
                      value={bulkSettings.boxShadow || ""}
                      onChange={(e) =>
                        setBulkSettings((prev) => ({
                          ...prev,
                          boxShadow: e.target.value,
                        }))
                      }
                      placeholder="0 4px 6px rgba(0,0,0,0.1)"
                      className="h-7 text-xs"
                    />
                  </div>

                  {/* Border Color */}
                  <div className="space-y-2 p-3 rounded-lg border border-border/50">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full border-2 border-border" />
                      <span className="text-sm font-medium">Border</span>
                    </div>
                    <div className="flex gap-1.5">
                      <Input
                        type="color"
                        value={bulkSettings.borderColor || "#e5e7eb"}
                        onChange={(e) =>
                          setBulkSettings((prev) => ({
                            ...prev,
                            borderColor: e.target.value,
                          }))
                        }
                        className="w-8 h-7 p-0 border-0 rounded cursor-pointer"
                      />
                      <Input
                        value={bulkSettings.borderColor || ""}
                        onChange={(e) =>
                          setBulkSettings((prev) => ({
                            ...prev,
                            borderColor: e.target.value,
                          }))
                        }
                        placeholder="#e5e7eb"
                        className="flex-1 h-7 text-xs"
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>

        {/* Compact Footer */}
        <div className="px-4 py-3 border-t bg-background/95 backdrop-blur flex-shrink-0">
          <div className="flex gap-2">
            <Button
              onClick={() => {
                console.log("🔍 [BulkStyleModal] Apply button clicked");
                handleBulkUpdate();
              }}
              className="flex-1 h-8 text-xs"
              size="sm"
            >
              <SparklesIcon className="w-3 h-3 mr-1.5" />
              Apply to All
            </Button>
            <Button
              onClick={() => {
                console.log("🔍 [BulkStyleModal] Reset button clicked");
                handleReset();
              }}
              variant="outline"
              size="sm"
              className="h-8 px-3"
            >
              <RotateCcw className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
