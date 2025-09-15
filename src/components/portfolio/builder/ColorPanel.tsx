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
import { Save, RotateCcw, Palette, Sparkles, Eye, Layers, ChevronDown } from "lucide-react";
import { colorSchemes, applyColorSchemeToPortfolio } from "@/lib/colorSchemes";

// Compact fallback color picker for small sidebar
const FallbackColorPicker: React.FC<{
  color: string;
  onChange: (color: string) => void;
  label: string;
}> = ({ color, onChange, label }) => (
  <div className="space-y-1.5">
    <Label className="text-xs font-medium">{label}</Label>
    <div className="flex gap-1.5">
      <Input
        type="color"
        value={color}
        onChange={(e) => onChange(e.target.value)}
        className="w-8 h-7 p-0 border-0 rounded cursor-pointer"
      />
      <Input
        value={color}
        onChange={(e) => onChange(e.target.value)}
        placeholder="#000000"
        className="flex-1 h-7 text-xs"
      />
    </div>
  </div>
);

// Collapsible section component
const CollapsibleSection: React.FC<{
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}> = ({ title, children, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);
  
  return (
    <div className="border border-border/50 rounded-md">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 py-2 flex items-center justify-between text-sm font-medium hover:bg-accent/50 transition-colors"
      >
        {title}
        <ChevronDown 
          className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>
      {isOpen && (
        <div className="px-3 pb-3 pt-1">
          {children}
        </div>
      )}
    </div>
  );
};

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
  portfolio?: any;
  onPortfolioChange?: (portfolio: any) => void;
}

const ColorPanel: React.FC<ColorPanelProps> = ({
  colors,
  setColors,
  styles = {},
  onStylesChange,
  onSave,
  saveMode,
  className,
  portfolio,
  onPortfolioChange,
}) => {
  const [ColorPicker, setColorPicker] = React.useState<any>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [activeTab, setActiveTab] = React.useState("colors");
  const [expandedColor, setExpandedColor] = React.useState<string | null>(null);

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

  const applyColorScheme = (colorSchemeId: string) => {
    if (portfolio && onPortfolioChange) {
      const updatedPortfolio = applyColorSchemeToPortfolio(portfolio, colorSchemeId);
      onPortfolioChange(updatedPortfolio);
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
      delete resetStyles.shadowColor;
      onStylesChange(resetStyles);
    }
  };

  const formatColorName = (key: string) => {
    return key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1");
  };

  if (isLoading) {
    return (
      <div className="space-y-2 p-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="h-3 bg-muted rounded w-16 mb-1"></div>
            <div className="h-16 bg-muted rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`w-full ${className}`}>
      <div className="space-y-3">
        {/* Header */}
        <div className="px-3 py-2 border-b border-border/50">
          <h3 className="text-sm font-semibold flex items-center gap-2">
            <Palette className="w-4 h-4" />
            Colors & Themes
          </h3>
        </div>

        <div className="px-3 space-y-3">
          {/* Color Schemes Section */}
          {colorSchemes && colorSchemes.length > 0 && (
            <CollapsibleSection title="Quick Themes" defaultOpen={false}>
              <div className="grid grid-cols-1 gap-2">
                {colorSchemes.slice(0, 4).map((scheme) => (
                  <button
                    key={scheme.id}
                    className="flex items-center gap-2 p-2 rounded-md border border-border/50 hover:bg-accent/50 transition-colors text-left w-full"
                    onClick={() => applyColorScheme(scheme.id)}
                  >
                    <div
                      className="w-6 h-6 rounded-sm border border-border/50 flex-shrink-0"
                      style={{ background: scheme.preview }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium truncate">{scheme.name}</div>
                      <div className="text-xs text-muted-foreground truncate">
                        {scheme.description}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </CollapsibleSection>
          )}

          {/* Individual Colors Section */}
          <CollapsibleSection title="Custom Colors" defaultOpen={true}>
            <div className="space-y-2">
              {Object.entries(colors).map(([key, value]) => (
                <div key={key} className="space-y-1.5">
                  <div 
                    className="flex items-center justify-between cursor-pointer p-2 rounded-md border border-border/50 hover:bg-accent/50 transition-colors"
                    onClick={() => setExpandedColor(expandedColor === key ? null : key)}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-5 h-5 rounded border border-border/50"
                        style={{ backgroundColor: value }}
                      />
                      <span className="text-xs font-medium">{formatColorName(key)}</span>
                    </div>
                    <ChevronDown 
                      className={`w-3 h-3 transition-transform ${expandedColor === key ? 'rotate-180' : ''}`} 
                    />
                  </div>
                  
                  {expandedColor === key && (
                    <div className="mt-2 space-y-2 bg-accent/20 p-2 rounded-md">
                      {ColorPicker ? (
                        <ColorPicker
                          color={value}
                          onChange={(color: string) =>
                            setColors((c: any) => ({ ...c, [key]: color }))
                          }
                          className="w-full h-20"
                        />
                      ) : (
                        <FallbackColorPicker
                          color={value}
                          onChange={(color) =>
                            setColors((c: any) => ({ ...c, [key]: color }))
                          }
                          label=""
                        />
                      )}
                      <Input
                        value={value}
                        onChange={(e) =>
                          setColors((c: any) => ({ ...c, [key]: e.target.value }))
                        }
                        placeholder="#ffffff"
                        className="h-7 text-xs"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CollapsibleSection>

          {/* Color Preview */}
          <CollapsibleSection title="Preview" defaultOpen={false}>
            <div className="grid grid-cols-2 gap-1.5">
              {Object.entries(colors).slice(0, 4).map(([key, value], idx) => (
                <div
                  key={key}
                  className="h-8 rounded border border-border/50 flex items-center justify-center text-xs font-medium"
                  style={{
                    backgroundColor: value,
                    color: idx === 0 && colors.text ? colors.text : 
                           (value && value !== '#ffffff' && value !== '#fff') ? '#ffffff' : '#000000',
                  }}
                >
                  {key.slice(0, 3).toUpperCase()}
                </div>
              ))}
            </div>
          </CollapsibleSection>
        </div>

        {/* Save Button */}
        {saveMode && onSave && (
          <div className="px-3 pt-2 border-t border-border/50">
            <Button onClick={onSave} className="w-full h-8 text-xs" size="sm">
              <Save className="w-3 h-3 mr-1.5" />
              Save Changes
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ColorPanel;