import React, { useState, useMemo } from "react";
import { Check, ChevronDown, Type } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FONT_MAP } from "@/lib/fontMap";

// Available Google Fonts for selection
const AVAILABLE_FONTS = [
  { name: "Inter", category: "Sans-serif", description: "Modern, clean, and highly readable" },
  { name: "Roboto", category: "Sans-serif", description: "Google's signature font" },
  { name: "Poppins", category: "Sans-serif", description: "Geometric sans-serif with friendly curves" },
  { name: "Lora", category: "Serif", description: "Elegant serif with excellent readability" },
  { name: "Playfair Display", category: "Serif", description: "High contrast serif for headings" },
  { name: "Montserrat", category: "Sans-serif", description: "Urban typography with geometric forms" },
  { name: "Lato", category: "Sans-serif", description: "Humanist sans-serif with warmth" },
  { name: "Nunito", category: "Sans-serif", description: "Rounded sans-serif with personality" },
  { name: "Oswald", category: "Sans-serif", description: "Condensed sans-serif for impact" },
  { name: "Merriweather", category: "Serif", description: "Designed for pleasant reading" },
  { name: "Outfit", category: "Sans-serif", description: "Modern geometric sans-serif" },
  { name: "Open Sans", category: "Sans-serif", description: "Humanist sans-serif designed for print and web" },
];

interface FontPickerProps {
  selectedFont: string;
  onFontChange: (font: string) => void;
  fontType: "heading" | "body";
  label?: string;
  className?: string;
}

export default function FontPicker({
  selectedFont,
  onFontChange,
  fontType,
  label,
  className = "",
}: FontPickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Get the current font configuration
  const currentFont = useMemo(() => {
    return AVAILABLE_FONTS.find(font => font.name === selectedFont) || AVAILABLE_FONTS[0];
  }, [selectedFont]);

  // Get font CSS variable for preview
  const fontVariable = useMemo(() => {
    const fontConfig = FONT_MAP[selectedFont];
    return fontConfig?.variable || `--font-${selectedFont.toLowerCase().replace(/\s+/g, "-")}`;
  }, [selectedFont]);

  const handleFontSelect = (fontName: string) => {
    onFontChange(fontName);
    setIsOpen(false);
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {label && (
        <div className="flex items-center gap-2">
          <Type className="h-4 w-4 text-muted-foreground" />
          <label className="text-sm font-medium">{label}</label>
          <Badge variant="secondary" className="text-xs">
            {fontType === "heading" ? "Headings" : "Body Text"}
          </Badge>
        </div>
      )}

      <Card className="border-2 border-dashed border-muted-foreground/25 hover:border-muted-foreground/50 transition-colors">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium">Font Preview</CardTitle>
            <Badge variant="outline" className="text-xs">
              {currentFont.category}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          {/* Font Preview Text */}
          <div 
            className="space-y-2"
            style={{
              fontFamily: `var(${fontVariable}, "${selectedFont}", sans-serif)`,
            }}
          >
            {fontType === "heading" ? (
              <>
                <h1 className="text-2xl font-bold text-foreground">
                  The Quick Brown Fox
                </h1>
                <h2 className="text-xl font-semibold text-muted-foreground">
                  Jumps Over The Lazy Dog
                </h2>
                <h3 className="text-lg font-medium text-muted-foreground">
                  Typography Sample
                </h3>
              </>
            ) : (
              <>
                <p className="text-base leading-relaxed text-foreground">
                  The quick brown fox jumps over the lazy dog. This is a sample of body text to demonstrate how the selected font will look in your portfolio.
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Smaller text for descriptions and secondary content. The font should remain readable at all sizes.
                </p>
              </>
            )}
          </div>

          {/* Font Description */}
          <p className="text-xs text-muted-foreground mt-3 pt-3 border-t">
            {currentFont.description}
          </p>
        </CardContent>
      </Card>

      {/* Font Selection Dropdown */}
      <div className="space-y-2">
        <Select
          value={selectedFont}
          onValueChange={handleFontSelect}
          open={isOpen}
          onOpenChange={setIsOpen}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a font">
              <div className="flex items-center gap-2">
                <span 
                  className="text-sm"
                  style={{
                    fontFamily: `var(${fontVariable}, "${selectedFont}", sans-serif)`,
                  }}
                >
                  {selectedFont}
                </span>
                <Badge variant="secondary" className="text-xs ml-auto">
                  {currentFont.category}
                </Badge>
              </div>
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="max-h-80">
            {AVAILABLE_FONTS.map((font) => {
              const fontVar = FONT_MAP[font.name]?.variable || `--font-${font.name.toLowerCase().replace(/\s+/g, "-")}`;
              return (
                <SelectItem key={font.name} value={font.name}>
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-3">
                      <span 
                        className="text-sm"
                        style={{
                          fontFamily: `var(${fontVar}, "${font.name}", sans-serif)`,
                        }}
                      >
                        {font.name}
                      </span>
                      {selectedFont === font.name && (
                        <Check className="h-4 w-4 text-primary" />
                      )}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {font.category}
                    </Badge>
                  </div>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>

      {/* Font Categories */}
      <div className="flex flex-wrap gap-1">
        {Array.from(new Set(AVAILABLE_FONTS.map(f => f.category))).map((category) => (
          <Badge key={category} variant="outline" className="text-xs">
            {category}
          </Badge>
        ))}
      </div>
    </div>
  );
}
