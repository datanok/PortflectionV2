import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Save, RotateCcw } from "lucide-react";

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
  onSave?: () => void;
  saveMode?: boolean;
}

const ColorPanel: React.FC<ColorPanelProps> = ({
  colors,
  setColors,
  onSave,
  saveMode,
}) => {
  // Try to import react-colorful dynamically
  const [ColorPicker, setColorPicker] = React.useState<any>(null);
  const [isLoading, setIsLoading] = React.useState(true);

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
    <div className="space-y-6 w-full max-w-full">
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

      {/* Save Button */}
      {saveMode && onSave && (
        <Card>
          <CardContent className="pt-4">
            <Button onClick={onSave} className="w-full" size="sm">
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Color Preview (shows up to 2 colors if available) */}
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
                    color: idx === 0 && colors.text ? colors.text : undefined,
                  }}
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ColorPanel;
