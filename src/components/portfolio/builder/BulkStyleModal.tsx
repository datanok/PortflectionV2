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
  RotateCcw,
  Sparkles,
  Zap,
  Paintbrush,
  Target,
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
import { colorSchemes } from "@/lib/colorSchemes";

interface BulkStyleModalProps {
  components: PortfolioComponent[];
  onUpdateComponents: (updates: Partial<PortfolioComponent>) => void;
  trigger?: React.ReactNode;
}

interface BulkStyleSettings {
  // All color variables
  backgroundColor?: string;
  textColor?: string;
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  borderColor?: string;
  shadowColor?: string;
  statusColor?: string;
  cardBackgroundColor?: string;

  // Font options
  headingFont?: string;
  bodyFont?: string;

  // Typography
  borderRadius?: string;
  fontSize?: string;
  fontWeight?: string;
  textAlign?: "left" | "center" | "right";

  // Layout
  paddingY?: string;
  paddingX?: string;
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
    accentColor: "",
    borderColor: "",
    shadowColor: "",
    statusColor: "",
    cardBackgroundColor: "",
    headingFont: "",
    bodyFont: "",
    borderRadius: "",
    fontSize: "",
    fontWeight: "",
    textAlign: "left",
    paddingY: "",
    paddingX: "",
  });

  const handleBulkUpdate = useCallback(() => {
    const styleUpdates: Record<string, any> = {};

    // Only include non-empty values
    Object.entries(bulkSettings).forEach(([key, value]) => {
      if (value && value !== "") {
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
      accentColor: "",
      borderColor: "",
      shadowColor: "",
      statusColor: "",
      cardBackgroundColor: "",
      headingFont: "",
      bodyFont: "",
      borderRadius: "",
      fontSize: "",
      fontWeight: "",
      textAlign: "left",
      paddingY: "",
      paddingX: "",
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
                <TabsTrigger value="themes" className="gap-1 text-xs px-2">
                  <Sparkles className="w-3 h-3" />
                  <span className="hidden sm:inline">Themes</span>
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-3 min-h-0">
              {/* Colors Tab */}
              <TabsContent value="colors" className="space-y-3 mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
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

                  {/* Accent Color */}
                  <div className="space-y-2 p-3 rounded-lg border border-border/50">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-accent" />
                      <span className="text-sm font-medium">Accent</span>
                    </div>
                    <div className="flex gap-1.5">
                      <Input
                        type="color"
                        value={bulkSettings.accentColor || "#f59e0b"}
                        onChange={(e) =>
                          setBulkSettings((prev) => ({
                            ...prev,
                            accentColor: e.target.value,
                          }))
                        }
                        className="w-8 h-7 p-0 border-0 rounded cursor-pointer"
                      />
                      <Input
                        value={bulkSettings.accentColor || ""}
                        onChange={(e) =>
                          setBulkSettings((prev) => ({
                            ...prev,
                            accentColor: e.target.value,
                          }))
                        }
                        placeholder="#f59e0b"
                        className="flex-1 h-7 text-xs"
                      />
                    </div>
                  </div>

                  {/* Border Color */}
                  <div className="space-y-2 p-3 rounded-lg border border-border/50">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full border-2" />
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

                  {/* Shadow Color */}
                  <div className="space-y-2 p-3 rounded-lg border border-border/50">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full shadow-md" />
                      <span className="text-sm font-medium">Shadow</span>
                    </div>
                    <div className="flex gap-1.5">
                      <Input
                        type="color"
                        value={bulkSettings.shadowColor || "#000000"}
                        onChange={(e) =>
                          setBulkSettings((prev) => ({
                            ...prev,
                            shadowColor: e.target.value,
                          }))
                        }
                        className="w-8 h-7 p-0 border-0 rounded cursor-pointer"
                      />
                      <Input
                        value={bulkSettings.shadowColor || ""}
                        onChange={(e) =>
                          setBulkSettings((prev) => ({
                            ...prev,
                            shadowColor: e.target.value,
                          }))
                        }
                        placeholder="#000000"
                        className="flex-1 h-7 text-xs"
                      />
                    </div>
                  </div>

                  {/* Status Color */}
                  <div className="space-y-2 p-3 rounded-lg border border-border/50">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                      <span className="text-sm font-medium">Status</span>
                    </div>
                    <div className="flex gap-1.5">
                      <Input
                        type="color"
                        value={bulkSettings.statusColor || "#22c55e"}
                        onChange={(e) =>
                          setBulkSettings((prev) => ({
                            ...prev,
                            statusColor: e.target.value,
                          }))
                        }
                        className="w-8 h-7 p-0 border-0 rounded cursor-pointer"
                      />
                      <Input
                        value={bulkSettings.statusColor || ""}
                        onChange={(e) =>
                          setBulkSettings((prev) => ({
                            ...prev,
                            statusColor: e.target.value,
                          }))
                        }
                        placeholder="#22c55e"
                        className="flex-1 h-7 text-xs"
                      />
                    </div>
                  </div>

                  {/* Card Background Color */}
                  <div className="space-y-2 p-3 rounded-lg border border-border/50">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-sm bg-card border" />
                      <span className="text-sm font-medium">Card BG</span>
                    </div>
                    <div className="flex gap-1.5">
                      <Input
                        type="color"
                        value={bulkSettings.cardBackgroundColor || "#f8fafc"}
                        onChange={(e) =>
                          setBulkSettings((prev) => ({
                            ...prev,
                            cardBackgroundColor: e.target.value,
                          }))
                        }
                        className="w-8 h-7 p-0 border-0 rounded cursor-pointer"
                      />
                      <Input
                        value={bulkSettings.cardBackgroundColor || ""}
                        onChange={(e) =>
                          setBulkSettings((prev) => ({
                            ...prev,
                            cardBackgroundColor: e.target.value,
                          }))
                        }
                        placeholder="#f8fafc"
                        className="flex-1 h-7 text-xs"
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Typography Tab */}
              <TabsContent value="typography" className="space-y-3 mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {/* Heading Font */}
                  <div className="space-y-2 p-3 rounded-lg border border-border/50">
                    <div className="flex items-center gap-2">
                      <Type className="w-3.5 h-3.5" />
                      <span className="text-sm font-medium">Heading Font</span>
                    </div>
                    <Input
                      value={bulkSettings.headingFont || ""}
                      onChange={(e) =>
                        setBulkSettings((prev) => ({
                          ...prev,
                          headingFont: e.target.value,
                        }))
                      }
                      placeholder="e.g., Inter, Roboto"
                      className="h-7 text-xs"
                    />
                  </div>

                  {/* Body Font */}
                  <div className="space-y-2 p-3 rounded-lg border border-border/50">
                    <div className="flex items-center gap-2">
                      <Type className="w-3.5 h-3.5" />
                      <span className="text-sm font-medium">Body Font</span>
                    </div>
                    <Input
                      value={bulkSettings.bodyFont || ""}
                      onChange={(e) =>
                        setBulkSettings((prev) => ({
                          ...prev,
                          bodyFont: e.target.value,
                        }))
                      }
                      placeholder="e.g., Inter, Roboto"
                      className="h-7 text-xs"
                    />
                  </div>

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
                      <span className="text-sm font-medium">
                        Vertical Padding
                      </span>
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
                      <span className="text-sm font-medium">
                        Horizontal Padding
                      </span>
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

              {/* Themes Tab */}
              <TabsContent value="themes" className="space-y-3 mt-0">
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground px-1">
                    Apply a pre-built color scheme to all components instantly
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {colorSchemes.map((scheme) => (
                      <button
                        key={scheme.id}
                        onClick={() => {
                          // Apply the color scheme to bulkSettings
                          setBulkSettings((prev) => ({
                            ...prev,
                            backgroundColor: scheme.styles.backgroundColor,
                            textColor: scheme.styles.textColor,
                            primaryColor: scheme.styles.primaryColor,
                            secondaryColor: scheme.styles.secondaryColor,
                            accentColor: scheme.styles.accentColor || "",
                            borderColor: scheme.styles.borderColor || "",
                            shadowColor: scheme.styles.shadowColor || "",
                            statusColor: scheme.styles.statusColor || "",
                            cardBackgroundColor:
                              scheme.styles.cardBackgroundColor || "",
                          }));
                        }}
                        className="group p-3 rounded-lg border border-border/50 hover:border-primary/50 transition-all duration-200 text-left hover:shadow-md"
                      >
                        <div className="space-y-2">
                          {/* Color Preview */}
                          <div
                            className="w-full h-16 rounded-md border"
                            style={{
                              background: scheme.preview,
                            }}
                          />

                          {/* Theme Info */}
                          <div>
                            <h4 className="text-sm font-semibold group-hover:text-primary transition-colors">
                              {scheme.name}
                            </h4>
                            <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">
                              {scheme.description}
                            </p>
                          </div>

                          {/* Color Swatches */}
                          <div className="flex gap-1">
                            <div
                              className="w-5 h-5 rounded-sm border"
                              style={{
                                backgroundColor: scheme.styles.backgroundColor,
                              }}
                              title="Background"
                            />
                            <div
                              className="w-5 h-5 rounded-sm border"
                              style={{
                                backgroundColor: scheme.styles.primaryColor,
                              }}
                              title="Primary"
                            />
                            <div
                              className="w-5 h-5 rounded-sm border"
                              style={{
                                backgroundColor: scheme.styles.secondaryColor,
                              }}
                              title="Secondary"
                            />
                            {scheme.styles.accentColor && (
                              <div
                                className="w-5 h-5 rounded-sm border"
                                style={{
                                  backgroundColor: scheme.styles.accentColor,
                                }}
                                title="Accent"
                              />
                            )}
                          </div>
                        </div>
                      </button>
                    ))}
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
