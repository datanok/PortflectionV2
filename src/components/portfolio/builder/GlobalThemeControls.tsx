"use client";

import React, { useState } from "react";
import {
  Palette,
  Sun,
  Moon,
  Monitor,
  Type,
  Zap,
  Settings,
  ChevronDown,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Font options with categories
const FONT_OPTIONS = {
  "Sans Serif": [
    { name: "Inter", value: "Inter", category: "Modern" },
    { name: "Open Sans", value: "Open Sans", category: "Clean" },
    { name: "Roboto", value: "Roboto", category: "Google" },
    { name: "Lato", value: "Lato", category: "Friendly" },
    {
      name: "Source Sans Pro",
      value: "Source Sans Pro",
      category: "Professional",
    },
    { name: "Outfit", value: "Outfit", category: "Modern" },
  ],
  Serif: [
    { name: "Merriweather", value: "Merriweather", category: "Elegant" },
    { name: "Nunito", value: "Nunito", category: "Rounded" },
  ],
  Display: [
    { name: "Montserrat", value: "Montserrat", category: "Bold" },
    { name: "Poppins", value: "Poppins", category: "Geometric" },
    { name: "Oswald", value: "Oswald", category: "Condensed" },
  ],
};

// Predefined color schemes
const COLOR_SCHEMES = {
  "Modern Blue": {
    primary: "#3b82f6",
    secondary: "#64748b",
    accent: "#8b5cf6",
    background: "#ffffff",
    card: "#f8fafc",
    muted: "#f1f5f9",
  },
  "Warm Orange": {
    primary: "#f97316",
    secondary: "#f59e0b",
    accent: "#ef4444",
    background: "#ffffff",
    card: "#fef7f0",
    muted: "#fef3c7",
  },
  "Professional Gray": {
    primary: "#374151",
    secondary: "#6b7280",
    accent: "#10b981",
    background: "#ffffff",
    card: "#f9fafb",
    muted: "#f3f4f6",
  },
  "Creative Purple": {
    primary: "#8b5cf6",
    secondary: "#a855f7",
    accent: "#ec4899",
    background: "#ffffff",
    card: "#faf5ff",
    muted: "#f3e8ff",
  },
  "Minimal Black": {
    primary: "#000000",
    secondary: "#374151",
    accent: "#3b82f6",
    background: "#ffffff",
    card: "#ffffff",
    muted: "#f9fafb",
  },
};

// Spacing presets
const SPACING_PRESETS = {
  Compact: { base: 0.75, section: 1.5, component: 1 },
  Standard: { base: 1, section: 2, component: 1.25 },
  Relaxed: { base: 1.25, section: 2.5, component: 1.5 },
  Spacious: { base: 1.5, section: 3, component: 2 },
};

export interface GlobalTheme {
  // Color scheme
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  card: string;
  muted: string;

  // Typography
  fontHeading: string;
  fontBody: string;

  // Spacing
  spacingBase: number;
  spacingSection: number;
  spacingComponent: number;

  // Mode
  mode: "light" | "dark" | "auto";

  // Additional options
  borderRadius: number;
  shadowIntensity: number;
  animationSpeed: number;
}

interface GlobalThemeControlsProps {
  theme: GlobalTheme;
  onThemeChange: (theme: GlobalTheme) => void;
  className?: string;
}

export default function GlobalThemeControls({
  theme,
  onThemeChange,
  className = "",
}: GlobalThemeControlsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "colors" | "typography" | "spacing" | "advanced"
  >("colors");
  const [localTheme, setLocalTheme] = useState<GlobalTheme>(theme);

  // Update local theme when prop changes
  React.useEffect(() => {
    setLocalTheme(theme);
  }, [theme]);

  const updateLocalTheme = (updates: Partial<GlobalTheme>) => {
    const newTheme = { ...localTheme, ...updates };
    setLocalTheme(newTheme);
    onThemeChange(newTheme);
  };

  const applyColorScheme = (scheme: keyof typeof COLOR_SCHEMES) => {
    const colors = COLOR_SCHEMES[scheme];
    updateLocalTheme(colors);
  };

  const applySpacingPreset = (preset: keyof typeof SPACING_PRESETS) => {
    const spacing = SPACING_PRESETS[preset];
    updateLocalTheme({
      spacingBase: spacing.base,
      spacingSection: spacing.section,
      spacingComponent: spacing.component,
    });
  };

  const getFontDisplayName = (fontValue: string) => {
    for (const category of Object.values(FONT_OPTIONS)) {
      const font = category.find((f) => f.value === fontValue);
      if (font) return font.name;
    }
    return fontValue;
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className={className}>
          <Palette className="w-4 h-4 mr-2" />
          Global Theme
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Palette className="w-5 h-5" />
            Global Theme Settings
          </DialogTitle>
          <DialogDescription>
            Customize the appearance of your entire portfolio with these global
            theme controls.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Mode Toggle */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Theme Mode</Label>
            <div className="flex gap-2">
              <Button
                variant={localTheme.mode === "light" ? "default" : "outline"}
                size="sm"
                onClick={() => updateLocalTheme({ mode: "light" })}
                className="flex items-center gap-2"
              >
                <Sun className="w-4 h-4" />
                Light
              </Button>
              <Button
                variant={localTheme.mode === "dark" ? "default" : "outline"}
                size="sm"
                onClick={() => updateLocalTheme({ mode: "dark" })}
                className="flex items-center gap-2"
              >
                <Moon className="w-4 h-4" />
                Dark
              </Button>
              <Button
                variant={localTheme.mode === "auto" ? "default" : "outline"}
                size="sm"
                onClick={() => updateLocalTheme({ mode: "auto" })}
                className="flex items-center gap-2"
              >
                <Monitor className="w-4 h-4" />
                Auto
              </Button>
            </div>
          </div>

          <Separator />

          {/* Tab Navigation */}
          <div className="flex gap-1">
            {[
              { id: "colors", label: "Colors", icon: Palette },
              { id: "typography", label: "Typography", icon: Type },
              { id: "spacing", label: "Spacing", icon: Zap },
              { id: "advanced", label: "Advanced", icon: Settings },
            ].map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab(tab.id as any)}
                className="flex items-center gap-2"
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </Button>
            ))}
          </div>

          {/* Colors Tab */}
          {activeTab === "colors" && (
            <div className="space-y-4">
              {/* Color Schemes */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">
                  Quick Color Schemes
                </Label>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(COLOR_SCHEMES).map(([name, colors]) => (
                    <Button
                      key={name}
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        applyColorScheme(name as keyof typeof COLOR_SCHEMES)
                      }
                      className="h-auto p-3 flex flex-col items-start gap-2"
                    >
                      <div className="flex gap-1">
                        {Object.values(colors)
                          .slice(0, 3)
                          .map((color, i) => (
                            <div
                              key={i}
                              className="w-4 h-4 rounded border border-gray-200"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                      </div>
                      <span className="text-xs font-medium">{name}</span>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Individual Color Controls */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Custom Colors</Label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { key: "primary", label: "Primary" },
                    { key: "secondary", label: "Secondary" },
                    { key: "accent", label: "Accent" },
                    { key: "background", label: "Background" },
                  ].map(({ key, label }) => (
                    <div key={key} className="space-y-2">
                      <Label className="text-xs">{label}</Label>
                      <div className="flex gap-2">
                        <input
                          type="color"
                          value={localTheme[key as keyof GlobalTheme] as string}
                          onChange={(e) =>
                            updateLocalTheme({ [key]: e.target.value })
                          }
                          className="w-8 h-8 rounded border border-gray-200 cursor-pointer"
                        />
                        <input
                          type="text"
                          value={localTheme[key as keyof GlobalTheme] as string}
                          onChange={(e) =>
                            updateLocalTheme({ [key]: e.target.value })
                          }
                          className="flex-1 text-xs px-2 py-1 border border-gray-200 rounded"
                          placeholder="#000000"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Typography Tab */}
          {activeTab === "typography" && (
            <div className="space-y-4">
              {/* Font Selection */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Fonts</Label>
                <div className="grid grid-cols-1 gap-3">
                  <div className="space-y-2">
                    <Label className="text-xs">Heading Font</Label>
                    <Select
                      value={localTheme.fontHeading}
                      onValueChange={(value) =>
                        updateLocalTheme({ fontHeading: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(FONT_OPTIONS).map(
                          ([category, fonts]) => (
                            <div key={category}>
                              <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
                                {category}
                              </div>
                              {fonts.map((font) => (
                                <SelectItem key={font.value} value={font.value}>
                                  <div className="flex items-center justify-between w-full">
                                    <span style={{ fontFamily: font.name }}>
                                      {font.name}
                                    </span>
                                    <Badge
                                      variant="secondary"
                                      className="text-xs"
                                    >
                                      {font.category}
                                    </Badge>
                                  </div>
                                </SelectItem>
                              ))}
                            </div>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs">Body Font</Label>
                    <Select
                      value={localTheme.fontBody}
                      onValueChange={(value) =>
                        updateLocalTheme({ fontBody: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(FONT_OPTIONS).map(
                          ([category, fonts]) => (
                            <div key={category}>
                              <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
                                {category}
                              </div>
                              {fonts.map((font) => (
                                <SelectItem key={font.value} value={font.value}>
                                  <div className="flex items-center justify-between w-full">
                                    <span style={{ fontFamily: font.name }}>
                                      {font.name}
                                    </span>
                                    <Badge
                                      variant="secondary"
                                      className="text-xs"
                                    >
                                      {font.category}
                                    </Badge>
                                  </div>
                                </SelectItem>
                              ))}
                            </div>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Font Preview */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Preview</Label>
                <div className="p-3 border border-gray-200 rounded-lg bg-gray-50">
                  <h3
                    className="text-lg font-semibold mb-2"
                    style={{
                      fontFamily: getFontDisplayName(localTheme.fontHeading),
                    }}
                  >
                    Sample Heading
                  </h3>
                  <p
                    className="text-sm text-gray-600"
                    style={{
                      fontFamily: getFontDisplayName(localTheme.fontBody),
                    }}
                  >
                    This is a sample body text to preview how your selected
                    fonts will look together.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Spacing Tab */}
          {activeTab === "spacing" && (
            <div className="space-y-4">
              {/* Spacing Presets */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Spacing Presets</Label>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(SPACING_PRESETS).map(([name, spacing]) => (
                    <Button
                      key={name}
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        applySpacingPreset(name as keyof typeof SPACING_PRESETS)
                      }
                      className="h-auto p-3 flex flex-col items-start gap-2"
                    >
                      <div className="flex gap-1">
                        {[spacing.base, spacing.section, spacing.component].map(
                          (value, i) => (
                            <div
                              key={i}
                              className="bg-gray-300 rounded"
                              style={{
                                width: `${value * 8}px`,
                                height: "8px",
                              }}
                            />
                          )
                        )}
                      </div>
                      <span className="text-xs font-medium">{name}</span>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Custom Spacing Controls */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Custom Spacing</Label>
                <div className="space-y-4">
                  {[
                    {
                      key: "spacingBase",
                      label: "Base Spacing",
                      description: "General spacing between elements",
                    },
                    {
                      key: "spacingSection",
                      label: "Section Spacing",
                      description: "Spacing between major sections",
                    },
                    {
                      key: "spacingComponent",
                      label: "Component Spacing",
                      description: "Spacing within components",
                    },
                  ].map(({ key, label, description }) => (
                    <div key={key} className="space-y-2">
                      <div className="flex justify-between">
                        <Label className="text-xs">{label}</Label>
                        <span className="text-xs text-muted-foreground">
                          {localTheme[key as keyof GlobalTheme]}rem
                        </span>
                      </div>
                      <Slider
                        value={[localTheme[key as keyof GlobalTheme] as number]}
                        onValueChange={([value]) =>
                          updateLocalTheme({ [key]: value })
                        }
                        min={0.5}
                        max={3}
                        step={0.25}
                        className="w-full"
                      />
                      <p className="text-xs text-muted-foreground">
                        {description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Advanced Tab */}
          {activeTab === "advanced" && (
            <div className="space-y-4">
              {/* Border Radius */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Border Radius</Label>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label className="text-xs">Global Border Radius</Label>
                    <span className="text-xs text-muted-foreground">
                      {localTheme.borderRadius}rem
                    </span>
                  </div>
                  <Slider
                    value={[localTheme.borderRadius]}
                    onValueChange={([value]) =>
                      updateLocalTheme({ borderRadius: value })
                    }
                    min={0}
                    max={2}
                    step={0.25}
                    className="w-full"
                  />
                  <div className="flex gap-2">
                    {[0, 0.25, 0.5, 1, 1.5, 2].map((radius) => (
                      <Button
                        key={radius}
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          updateLocalTheme({ borderRadius: radius })
                        }
                        className="px-2"
                      >
                        {radius}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Shadow Intensity */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Shadow Intensity</Label>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label className="text-xs">Shadow Strength</Label>
                    <span className="text-xs text-muted-foreground">
                      {localTheme.shadowIntensity}%
                    </span>
                  </div>
                  <Slider
                    value={[localTheme.shadowIntensity]}
                    onValueChange={([value]) =>
                      updateLocalTheme({ shadowIntensity: value })
                    }
                    min={0}
                    max={100}
                    step={10}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Animation Speed */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Animation Speed</Label>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label className="text-xs">Animation Duration</Label>
                    <span className="text-xs text-muted-foreground">
                      {localTheme.animationSpeed}ms
                    </span>
                  </div>
                  <Slider
                    value={[localTheme.animationSpeed]}
                    onValueChange={([value]) =>
                      updateLocalTheme({ animationSpeed: value })
                    }
                    min={100}
                    max={1000}
                    step={50}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
