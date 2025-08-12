import React, { useState, useCallback } from "react";
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
    <Button
      variant="outline"
      size="sm"
      className="group relative overflow-hidden bg-gradient-to-r from-purple-500/10 to-blue-500/10 hover:from-purple-500/20 hover:to-blue-500/20 border-purple-200/50 hover:border-purple-300/50 transition-all duration-300"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative flex items-center gap-2">
        <div className="relative">
          <Sparkles className="w-4 h-4 text-purple-500" />
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
        </div>
        <span className="text-sm font-medium bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Bulk Style
        </span>
      </div>
    </Button>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0 border-0 bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="flex flex-col h-full">
          {/* Header */}
          <DialogHeader className="p-6 pb-4 border-b border-slate-200/50 dark:border-slate-700/50 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                    <Paintbrush className="w-5 h-5 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-pink-400 to-orange-400 rounded-full animate-pulse" />
                </div>
                <div>
                  <DialogTitle className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    Bulk Style Editor
                  </DialogTitle>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Apply styles to all {totalComponents} components at once
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant="secondary"
                  className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
                >
                  <Target className="w-3 h-3 mr-1" />
                  {totalComponents} components
                </Badge>
              </div>
            </div>
          </DialogHeader>

          {/* Component Summary */}
          <div className="p-6 pb-4 border-b border-slate-200/50 dark:border-slate-700/50">
            <div className="flex items-center gap-2 mb-3">
              <Layers className="w-4 h-4 text-slate-500" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Components to Update
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {Object.entries(componentCounts).map(([type, count]) => (
                <Badge
                  key={type}
                  variant="outline"
                  className="bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-600 text-xs hover:bg-purple-50 dark:hover:bg-purple-950/20 transition-colors"
                >
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 mr-2" />
                  {type}: {count}
                </Badge>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-hidden">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="h-full flex flex-col"
            >
              <div className="px-6 pt-4">
                <TabsList className="grid w-full grid-cols-3 bg-slate-100/50 dark:bg-slate-800/50 p-1 rounded-xl">
                  <TabsTrigger
                    value="colors"
                    className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:shadow-sm rounded-lg transition-all duration-200"
                  >
                    <Palette className="w-4 h-4 mr-2" />
                    Colors
                  </TabsTrigger>
                  <TabsTrigger
                    value="typography"
                    className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:shadow-sm rounded-lg transition-all duration-200"
                  >
                    <Type className="w-4 h-4 mr-2" />
                    Typography
                  </TabsTrigger>
                  <TabsTrigger
                    value="layout"
                    className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:shadow-sm rounded-lg transition-all duration-200"
                  >
                    <Layout className="w-4 h-4 mr-2" />
                    Layout
                  </TabsTrigger>
                </TabsList>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                <TabsContent value="colors" className="space-y-6 mt-0">
                  <div className="grid grid-cols-2 gap-6">
                    {/* Background Color */}
                    <Card className="border-slate-200/50 dark:border-slate-700/50 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-slate-400 to-slate-600" />
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
                            className="w-12 h-10 p-1 rounded-lg border-2 border-slate-200 dark:border-slate-600 cursor-pointer"
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
                            className="flex-1 h-10"
                          />
                        </div>
                      </CardContent>
                    </Card>

                    {/* Text Color */}
                    <Card className="border-slate-200/50 dark:border-slate-700/50 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-gray-400 to-gray-600" />
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
                            className="w-12 h-10 p-1 rounded-lg border-2 border-slate-200 dark:border-slate-600 cursor-pointer"
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
                            className="flex-1 h-10"
                          />
                        </div>
                      </CardContent>
                    </Card>

                    {/* Primary Color */}
                    <Card className="border-slate-200/50 dark:border-slate-700/50 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-400 to-blue-600" />
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
                            className="w-12 h-10 p-1 rounded-lg border-2 border-slate-200 dark:border-slate-600 cursor-pointer"
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
                            className="flex-1 h-10"
                          />
                        </div>
                      </CardContent>
                    </Card>

                    {/* Secondary Color */}
                    <Card className="border-slate-200/50 dark:border-slate-700/50 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-400 to-purple-600" />
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
                            className="w-12 h-10 p-1 rounded-lg border-2 border-slate-200 dark:border-slate-600 cursor-pointer"
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
                            className="flex-1 h-10"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="typography" className="space-y-6 mt-0">
                  <div className="grid grid-cols-2 gap-6">
                    {/* Font Size */}
                    <Card className="border-slate-200/50 dark:border-slate-700/50 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                          <Type className="w-4 h-4 text-blue-500" />
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
                          <SelectTrigger className="h-10">
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
                    <Card className="border-slate-200/50 dark:border-slate-700/50 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                          <Zap className="w-4 h-4 text-purple-500" />
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
                          <SelectTrigger className="h-10">
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
                    <Card className="border-slate-200/50 dark:border-slate-700/50 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                          <Layout className="w-4 h-4 text-green-500" />
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
                          <SelectTrigger className="h-10">
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
                    <Card className="border-slate-200/50 dark:border-slate-700/50 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                          <div className="w-4 h-4 rounded-sm bg-gradient-to-r from-orange-400 to-orange-600" />
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
                          className="h-10"
                        />
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="layout" className="space-y-6 mt-0">
                  <div className="grid grid-cols-2 gap-6">
                    {/* Vertical Padding */}
                    <Card className="border-slate-200/50 dark:border-slate-700/50 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                          <div className="w-4 h-2 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded" />
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
                          className="h-10"
                        />
                      </CardContent>
                    </Card>

                    {/* Horizontal Padding */}
                    <Card className="border-slate-200/50 dark:border-slate-700/50 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                          <div className="w-2 h-4 bg-gradient-to-r from-pink-400 to-pink-600 rounded" />
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
                          className="h-10"
                        />
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>

          {/* Footer */}
          <div className="p-6 pt-4 border-t border-slate-200/50 dark:border-slate-700/50 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-900/50">
            <div className="flex gap-3">
              <Button
                onClick={handleBulkUpdate}
                className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                size="lg"
              >
                <SparklesIcon className="w-4 h-4 mr-2" />
                Apply to All Components
              </Button>
              <Button
                onClick={handleReset}
                variant="outline"
                size="lg"
                className="border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
