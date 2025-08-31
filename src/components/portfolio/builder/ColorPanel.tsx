import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Save, RotateCcw, Palette, Sparkles, Eye } from "lucide-react";

// Fallback color picker if react-colorful is not available
const FallbackColorPicker: React.FC<{
  color: string;
  onChange: (color: string) => void;
  label: string;
}> = ({ color, onChange, label }) => (
  <div className="space-y-2">
    <Label className="text-xs text-muted-foreground">{label}</Label>
    <div className="flex gap-2">
      <Input
        type="color"
        value={color}
        onChange={(e) => onChange(e.target.value)}
        className="w-12 h-8 p-1"
      />
      <Input
        value={color}
        onChange={(e) => onChange(e.target.value)}
        placeholder="#000000"
        className="flex-1 h-8"
      />
    </div>
  </div>
);

interface ColorPanelProps {
  colors: Record<string, string>;
  setColors: (
    updater: (c: Record<string, string>) => Record<string, string>
  ) => void;
  styles?: Record<string, any>;
  onStylesChange?: (styles: Record<string, any>) => void;
  onSave?: () => void;
  saveMode?: boolean;
  className?: string;
}

const ColorPanel: React.FC<ColorPanelProps> = ({
  colors,
  setColors,
  styles = {},
  onStylesChange,
  onSave,
  saveMode,
  className,
}) => {
  const [ColorPicker, setColorPicker] = React.useState<any>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [activeTab, setActiveTab] = React.useState("colors");
  const [previewMode, setPreviewMode] = React.useState(false);

  React.useEffect(() => {
    const loadColorPicker = async () => {
      try {
        const { HexColorPicker } = await import("react-colorful");
        setColorPicker(() => HexColorPicker);
      } catch (error) {
        console.warn("react-colorful not available, using fallback");
        setColorPicker(null);
      } finally {
        setIsLoading(false);
      }
    };
    loadColorPicker();
  }, []);

  const updateStyle = (key: string, value: any) => {
    if (onStylesChange) {
      onStylesChange({ ...styles, [key]: value });
    }
  };

  const resetEffects = () => {
    if (onStylesChange) {
      const resetStyles = { ...styles };

      delete resetStyles.gradientType;
      delete resetStyles.gradientDirection;
      delete resetStyles.gradientColors;
      delete resetStyles.boxShadow;
      delete resetStyles.backdropBlur;
      delete resetStyles.borderStyle;
      delete resetStyles.borderWidth;
      delete resetStyles.borderColor;
      onStylesChange(resetStyles);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse space-y-2">
          <div className="h-4 bg-muted rounded w-24"></div>
          <div className="h-32 bg-muted rounded"></div>
        </div>
        <div className="animate-pulse space-y-2">
          <div className="h-4 bg-muted rounded w-20"></div>
          <div className="h-32 bg-muted rounded"></div>
        </div>
        <div className="animate-pulse space-y-2">
          <div className="h-4 bg-muted rounded w-28"></div>
          <div className="h-32 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full ${className}`}>
      <Card className="">
        <CardContent>
          {/* <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="colors">Colors</TabsTrigger>
              <TabsTrigger value="effects">Effects</TabsTrigger>
              <TabsTrigger value="gradients">Gradients</TabsTrigger>
            </TabsList> */}

          {/* Colors Tab */}
          {/* <TabsContent value="colors" className="space-y-4"> */}
          {Object.entries(colors).map(([key, value]) => (
            <div key={key} className="space-y-3">
              <Label className="text-xs text-muted-foreground">
                {key.charAt(0).toUpperCase() +
                  key.slice(1).replace(/([A-Z])/g, " $1")}{" "}
                Color
              </Label>
              {ColorPicker ? (
                <ColorPicker
                  color={value}
                  onChange={(color: string) =>
                    setColors((c: any) => ({ ...c, [key]: color }))
                  }
                  className="w-full h-32"
                />
              ) : (
                <FallbackColorPicker
                  color={value}
                  onChange={(color) =>
                    setColors((c: any) => ({ ...c, [key]: color }))
                  }
                  label={`${
                    key.charAt(0).toUpperCase() +
                    key.slice(1).replace(/([A-Z])/g, " $1")
                  } Color`}
                />
              )}
              <div className="flex gap-2">
                <Input
                  value={value}
                  onChange={(e) =>
                    setColors((c: any) => ({ ...c, [key]: e.target.value }))
                  }
                  placeholder="#ffffff"
                  className="flex-1 h-8"
                />
                <div
                  className="w-8 h-8 rounded border border-border"
                  style={{ backgroundColor: value }}
                />
              </div>
            </div>
          ))}

          {/* Color Preview */}
          <Card>
            <CardContent className="pt-4">
              <Label className="text-xs text-muted-foreground mb-2 block">
                Color Preview
              </Label>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(colors)
                  .slice(0, 2)
                  .map(([key, value], idx) => (
                    <div
                      key={key}
                      className="h-8 rounded border border-border flex items-center justify-center text-xs font-medium"
                      style={{
                        backgroundColor: value,
                        color:
                          idx === 0 && colors.text ? colors.text : undefined,
                      }}
                    >
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
          {/* </TabsContent> */}

          {/* Effects Tab */}
          {/* <TabsContent value="effects" className="space-y-4">
              <div className="text-center text-muted-foreground py-8">
                <Sparkles className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>Effects coming soon...</p>
              </div>
            </TabsContent> */}
          {/* <TabsContent value="gradients" className="space-y-4">
              <div className="space-y-2">
                <Label>Gradient Type</Label>
                <Select
                  value={styles.gradientType || "none"}
                  onValueChange={(value) => updateStyle("gradientType", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select gradient" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="linear">Linear</SelectItem>
                    <SelectItem value="radial">Radial</SelectItem>
                    <SelectItem value="conic">Conic</SelectItem>
                    <SelectItem value="mesh">Mesh</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {styles.gradientType &&
                styles.gradientType !== "none" &&
                styles.gradientType !== "mesh" && (
                  <div className="space-y-2">
                    <Label>Direction</Label>
                    <Select
                      value={styles.gradientDirection || "to right"}
                      onValueChange={(value) =>
                        updateStyle("gradientDirection", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="to right">To Right</SelectItem>
                        <SelectItem value="to left">To Left</SelectItem>
                        <SelectItem value="to top">To Top</SelectItem>
                        <SelectItem value="to bottom">To Bottom</SelectItem>
                        <SelectItem value="to top right">
                          To Top Right
                        </SelectItem>
                        <SelectItem value="to top left">To Top Left</SelectItem>
                        <SelectItem value="to bottom right">
                          To Bottom Right
                        </SelectItem>
                        <SelectItem value="to bottom left">
                          To Bottom Left
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

              {styles.gradientType && styles.gradientType !== "none" && (
                <div className="space-y-2">
                  <Label>Gradient Colors</Label>
                  <div className="space-y-2">
                    {[0, 1, 2, 3].map((index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          type="color"
                          value={styles.gradientColors?.[index] || "#3b82f6"}
                          onChange={(e) => {
                            const colors = [
                              ...(styles.gradientColors || [
                                "#3b82f6",
                                "#8b5cf6",
                              ]),
                            ];
                            colors[index] = e.target.value;
                            updateStyle("gradientColors", colors);
                          }}
                          className="w-12 h-8 p-1"
                        />
                        <Input
                          value={styles.gradientColors?.[index] || "#3b82f6"}
                          onChange={(e) => {
                            const colors = [
                              ...(styles.gradientColors || [
                                "#3b82f6",
                                "#8b5cf6",
                              ]),
                            ];
                            colors[index] = e.target.value;
                            updateStyle("gradientColors", colors);
                          }}
                          placeholder="#3b82f6"
                          className="flex-1 h-8"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent> */}
          {/* </Tabs> */}

          {/* Save Button */}
          {saveMode && onSave && (
            <div className="pt-4 border-t">
              <Button onClick={onSave} className="w-full" size="sm">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ColorPanel;
