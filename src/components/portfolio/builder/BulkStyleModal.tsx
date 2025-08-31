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
      <DialogContent className="max-w-6xl max-h-[95vh] p-0 flex flex-col">
        {/* Header */}
        <DialogHeader className="px-4 sm:px-6 py-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex-shrink-0">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 border border-primary/20">
                <Paintbrush className="w-5 h-5 text-primary" />
              </div>
              <div>
                <DialogTitle className="text-xl font-semibold tracking-tight">
                  Bulk Style Editor
                </DialogTitle>
                <p className="text-sm text-muted-foreground">
                  Apply styles to all components at once
                </p>
              </div>
            </div>
            <Badge variant="secondary" className="gap-2 w-fit">
              <Target className="w-3 h-3" />
              {totalComponents} components
            </Badge>
          </div>
        </DialogHeader>

        {/* Component Summary */}

        {/* Content */}
        <div className="flex-1 min-h-0 flex flex-col">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="flex-1 flex flex-col min-h-0"
          >
            <div className="px-4 sm:px-6 py-3 border-b bg-background/50 flex-shrink-0">
              <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 h-10">
                <TabsTrigger value="colors" className="gap-1.5 text-sm">
                  <Palette className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Colors</span>
                </TabsTrigger>
                <TabsTrigger value="typography" className="gap-1.5 text-sm">
                  <Type className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Typography</span>
                </TabsTrigger>
                <TabsTrigger value="layout" className="gap-1.5 text-sm">
                  <Layout className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Layout</span>
                </TabsTrigger>
                <TabsTrigger value="effects" className="gap-1.5 text-sm">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Effects</span>
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 min-h-0">
              <TabsContent value="colors" className="space-y-6 mt-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* Background Color */}
                  <Card className="border-0 shadow-sm">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-muted border" />
                        Background Color
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex gap-2">
                        <Input
                          type="color"
                          value={bulkSettings.backgroundColor || "#ffffff"}
                          onChange={(e) =>
                            setBulkSettings((prev) => ({
                              ...prev,
                              backgroundColor: e.target.value,
                            }))
                          }
                          className="w-12 h-9 p-1 rounded-lg border cursor-pointer"
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
                          className="flex-1 h-9"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Text Color */}
                  <Card className="border-0 shadow-sm">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-foreground" />
                        Text Color
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex gap-2">
                        <Input
                          type="color"
                          value={bulkSettings.textColor || "#000000"}
                          onChange={(e) =>
                            setBulkSettings((prev) => ({
                              ...prev,
                              textColor: e.target.value,
                            }))
                          }
                          className="w-12 h-9 p-1 rounded-lg border cursor-pointer"
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
                          className="flex-1 h-9"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Primary Color */}
                  <Card className="border-0 shadow-sm">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-primary" />
                        Primary Color
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex gap-2">
                        <Input
                          type="color"
                          value={bulkSettings.primaryColor || "#3b82f6"}
                          onChange={(e) =>
                            setBulkSettings((prev) => ({
                              ...prev,
                              primaryColor: e.target.value,
                            }))
                          }
                          className="w-12 h-9 p-1 rounded-lg border cursor-pointer"
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
                          className="flex-1 h-9"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Secondary Color */}
                  <Card className="border-0 shadow-sm">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-secondary" />
                        Secondary Color
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex gap-2">
                        <Input
                          type="color"
                          value={bulkSettings.secondaryColor || "#64748b"}
                          onChange={(e) =>
                            setBulkSettings((prev) => ({
                              ...prev,
                              secondaryColor: e.target.value,
                            }))
                          }
                          className="w-12 h-9 p-1 rounded-lg border cursor-pointer"
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
                          className="flex-1 h-9"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="typography" className="space-y-6 mt-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* Font Size */}
                  <Card className="border-0 shadow-sm">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium flex items-center gap-2">
                        <Type className="w-4 h-4" />
                        Font Size
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Select
                        value={bulkSettings.fontSize || ""}
                        onValueChange={(value) =>
                          setBulkSettings((prev) => ({
                            ...prev,
                            fontSize: value,
                          }))
                        }
                      >
                        <SelectTrigger className="h-9">
                          <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sm">Small</SelectItem>
                          <SelectItem value="base">Base</SelectItem>
                          <SelectItem value="lg">Large</SelectItem>
                          <SelectItem value="xl">Extra Large</SelectItem>
                          <SelectItem value="2xl">2XL</SelectItem>
                          <SelectItem value="3xl">3XL</SelectItem>
                        </SelectContent>
                      </Select>
                    </CardContent>
                  </Card>

                  {/* Font Weight */}
                  <Card className="border-0 shadow-sm">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium flex items-center gap-2">
                        <Zap className="w-4 h-4" />
                        Font Weight
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Select
                        value={bulkSettings.fontWeight || ""}
                        onValueChange={(value) =>
                          setBulkSettings((prev) => ({
                            ...prev,
                            fontWeight: value,
                          }))
                        }
                      >
                        <SelectTrigger className="h-9">
                          <SelectValue placeholder="Select weight" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="normal">Normal</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="semibold">Semibold</SelectItem>
                          <SelectItem value="bold">Bold</SelectItem>
                          <SelectItem value="black">Black</SelectItem>
                        </SelectContent>
                      </Select>
                    </CardContent>
                  </Card>

                  {/* Text Align */}
                  <Card className="border-0 shadow-sm">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium flex items-center gap-2">
                        <Layout className="w-4 h-4" />
                        Text Align
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Select
                        value={bulkSettings.textAlign || "left"}
                        onValueChange={(value: "left" | "center" | "right") =>
                          setBulkSettings((prev) => ({
                            ...prev,
                            textAlign: value,
                          }))
                        }
                      >
                        <SelectTrigger className="h-9">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="left">Left</SelectItem>
                          <SelectItem value="center">Center</SelectItem>
                          <SelectItem value="right">Right</SelectItem>
                        </SelectContent>
                      </Select>
                    </CardContent>
                  </Card>

                  {/* Border Radius */}
                  <Card className="border-0 shadow-sm">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium flex items-center gap-2">
                        <div className="w-4 h-4 rounded-sm bg-muted border" />
                        Border Radius
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Input
                        value={bulkSettings.borderRadius || ""}
                        onChange={(e) =>
                          setBulkSettings((prev) => ({
                            ...prev,
                            borderRadius: e.target.value,
                          }))
                        }
                        placeholder="0px"
                        className="h-9"
                      />
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="layout" className="space-y-6 mt-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* Vertical Padding */}
                  <Card className="border-0 shadow-sm">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium flex items-center gap-2">
                        <div className="w-4 h-2 bg-muted rounded border" />
                        Vertical Padding
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Input
                        value={bulkSettings.paddingY || ""}
                        onChange={(e) =>
                          setBulkSettings((prev) => ({
                            ...prev,
                            paddingY: e.target.value,
                          }))
                        }
                        placeholder="120px"
                        className="h-9"
                      />
                    </CardContent>
                  </Card>

                  {/* Horizontal Padding */}
                  <Card className="border-0 shadow-sm">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium flex items-center gap-2">
                        <div className="w-2 h-4 bg-muted rounded border" />
                        Horizontal Padding
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Input
                        value={bulkSettings.paddingX || ""}
                        onChange={(e) =>
                          setBulkSettings((prev) => ({
                            ...prev,
                            paddingX: e.target.value,
                          }))
                        }
                        placeholder="32px"
                        className="h-9"
                      />
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="effects" className="space-y-6 mt-0">
                {/* Preview Section */}
                <Card className="border-0 shadow-sm">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      Live Preview
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div
                      className="w-full h-32 rounded-xl border-2 border-dashed border-muted-foreground/20 flex items-center justify-center relative overflow-hidden backdrop-blur-sm"
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
                        <div className="text-sm font-medium mb-1">Preview</div>
                        <div className="text-xs text-muted-foreground">
                          Style Preview
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Gradient Type */}
                  <Card className="border-0 shadow-sm">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium flex items-center gap-2">
                        <Globe className="w-4 h-4" />
                        Gradient Type
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Select
                        value={bulkSettings.gradientType || "linear"}
                        onValueChange={(value: "linear" | "radial" | "conic") =>
                          setBulkSettings((prev) => ({
                            ...prev,
                            gradientType: value,
                          }))
                        }
                      >
                        <SelectTrigger className="h-9">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="linear">Linear</SelectItem>
                          <SelectItem value="radial">Radial</SelectItem>
                          <SelectItem value="conic">Conic</SelectItem>
                        </SelectContent>
                      </Select>
                    </CardContent>
                  </Card>

                  {/* Box Shadow */}
                  <Card className="border-0 shadow-sm">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium flex items-center gap-2">
                        <div className="w-4 h-4 rounded-sm bg-muted border shadow-sm" />
                        Box Shadow
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Input
                        value={bulkSettings.boxShadow || ""}
                        onChange={(e) =>
                          setBulkSettings((prev) => ({
                            ...prev,
                            boxShadow: e.target.value,
                          }))
                        }
                        placeholder="0 4px 6px -1px rgba(0,0,0,0.1)"
                        className="h-9 text-xs"
                      />
                    </CardContent>
                  </Card>

                  {/* Border Color */}
                  <Card className="border-0 shadow-sm">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full border-2 border-border" />
                        Border Color
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex gap-2">
                        <Input
                          type="color"
                          value={bulkSettings.borderColor || "#e5e7eb"}
                          onChange={(e) =>
                            setBulkSettings((prev) => ({
                              ...prev,
                              borderColor: e.target.value,
                            }))
                          }
                          className="w-12 h-9 p-1 rounded-lg border cursor-pointer"
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
                          className="flex-1 h-9"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>

        {/* Footer */}
        <div className="px-4 sm:px-6 py-4 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex-shrink-0">
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={() => {
                console.log("🔍 [BulkStyleModal] Apply button clicked");
                handleBulkUpdate();
              }}
              className="flex-1 h-10"
              size="lg"
            >
              <SparklesIcon className="w-4 h-4 mr-2" />
              Apply to All Components
            </Button>
            <Button
              onClick={() => {
                console.log("🔍 [BulkStyleModal] Reset button clicked");
                handleReset();
              }}
              variant="outline"
              size="lg"
              className="h-10 sm:w-auto"
            >
              <RotateCcw className="w-4 h-4 sm:mr-0 mr-2" />
              <span className="sm:hidden">Reset</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
