import { Card, CardContent, CardHeader } from "../ui/card";
import { Controller, useWatch } from "react-hook-form";
import { cn } from "@/lib/utils";
import { getColorSchemesForLayout, LayoutType } from "./types/ColorSchemes";
import { useState, useEffect } from "react";
import { ColorScheme } from "@/app/types/portfolio";
import { FONT_MAP } from "@/lib/fontMap";

interface ColorSchemeFormProps {
  control: any;
  layoutType?: LayoutType;
}

const ColorSchemeForm: React.FC<ColorSchemeFormProps> = ({ 
  control, 
  layoutType 
}) => {
  // Get color schemes for the current layout type
  console.log(layoutType,"layoutType");
  const colorSchemes = getColorSchemesForLayout(layoutType);
  
  // Watch the 'theme' field to reflect changes in the preview
  const selectedScheme = useWatch({ control, name: "theme" });
  const [defaultScheme, setDefaultScheme] = useState<ColorScheme | null>(null);

  // Set default scheme when layout changes or on initial load
  useEffect(() => {
    if (colorSchemes.length > 0) {
      if (!selectedScheme || !colorSchemes.some(s => s.name === selectedScheme.name)) {
        setDefaultScheme(colorSchemes[0]);
      } else {
        setDefaultScheme(selectedScheme);
      }
    }
  }, [colorSchemes, selectedScheme]);

  const displayScheme = selectedScheme || defaultScheme;

  return (
    <div className="p-2">
      <h3 className="text-lg font-medium">Choose Your Color Scheme</h3>

      {/* Mobile View: Preview First */}
      <div className="block md:hidden">
        <PreviewCard scheme={displayScheme} />
      </div>

      <div className="flex flex-col md:flex-row gap-6 ">
        {/* Color Scheme Selector - Full width on mobile, 2/3 on desktop */}
        <div className="w-full md:w-2/3">
          <Controller
            name="theme"
            control={control}
            render={({ field }) => (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[500px] md:max-h-[600px] pr-2">
                {colorSchemes.map((scheme, index) => (
                  <Card
                    key={index}
                    className={cn(
                      "relative overflow-hidden rounded-lg ring-1 transition-all duration-300 hover:shadow-lg cursor-pointer",
                      field.value?.primary === scheme.primary
                        ? "ring-2 ring-primary bg-primary/10 dark:bg-primary/10"
                        : "bg-card hover:bg-muted dark:bg-card dark:hover:bg-muted"
                    )}
                    onClick={() => field.onChange(scheme)}
                  >
                    <CardHeader className="pb-2">
                      <h3 className="text-lg font-medium text-foreground text-balance">{scheme.name}</h3>
                    </CardHeader>
                    <CardContent>
                      <div className="flex space-x-2">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full" style={{ backgroundColor: scheme.primary }}></div>
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full" style={{ backgroundColor: scheme.secondary }}></div>
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full" style={{ backgroundColor: scheme.background }}></div>
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full" style={{ backgroundColor: scheme.card }}></div>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="text-xs" style={{ fontFamily: scheme.fontHeading }}>
                          Heading: {scheme.fontHeading}
                        </span>
                        <span className="text-xs" style={{ fontFamily: scheme.fontBody }}>
                          Body: {scheme.fontBody}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          />
        </div>

        {/* Live Preview - Hidden on mobile (shown at top instead), 1/3 on desktop */}
        <div className="hidden md:block md:w-1/3">
          <div className="sticky top-6">
            <PreviewCard scheme={displayScheme} />
          </div>
        </div>
      </div>
    </div>
  );
};

export const PreviewCard = ({ scheme }: { scheme: ColorScheme }) => {
  const headingFont = FONT_MAP[scheme.fontHeading] || FONT_MAP["Montserrat"];
  const bodyFont = FONT_MAP[scheme.fontBody] || FONT_MAP["Lato"];

  return (
    <Card className={`shadow-md ${headingFont.variable} ${bodyFont.variable}`}>
      <CardHeader>
        <h4 className="text-xl font-bold">Live Preview</h4>
      </CardHeader>
      <CardContent>
        <div
          className="rounded-xl p-4 shadow-inner transition-all duration-300"
          style={{
            backgroundColor: scheme.background,
            color: scheme.body,
            fontFamily: scheme.fontBody,
          }}
        >
          <h4
            className="text-lg font-bold mb-4"
            style={{
              color: scheme.body,
              fontFamily: scheme.fontHeading,
            }}
          >
            {scheme.name}
          </h4>

          <div className="space-y-4">
            <div
              className="rounded-md p-3"
              style={{
                backgroundColor: scheme.card,
                color: scheme.body,
                fontFamily: scheme.fontBody,
              }}
            >
              <strong style={{ fontFamily: scheme.fontHeading }}>Card</strong>
              <p>This is a card styled with the selected color scheme.</p>
            </div>

            <button
              className="w-full px-4 py-2 rounded-md font-medium text-white"
              style={{
                backgroundColor: scheme.primary,
                fontFamily: scheme.fontBody,
              }}
            >
              Primary Button
            </button>

            <button
              className="w-full px-4 py-2 rounded-md font-medium text-white"
              style={{
                backgroundColor: scheme.secondary,
                fontFamily: scheme.fontBody,
              }}
            >
              Secondary Button
            </button>

            <div
              className="p-2 rounded-md"
              style={{
                backgroundColor: scheme.accent,
                color: scheme.body,
              }}
            >
              Accent Element
            </div>

            <div
              className="p-2 rounded-md"
              style={{
                backgroundColor: scheme.muted,
                color: scheme.body,
              }}
            >
              Muted Element
            </div>

            <div>
              <h5 style={{ fontFamily: scheme.fontHeading, color: scheme.body }}>
                Fonts
              </h5>
              <p style={{ fontFamily: scheme.fontHeading, color: scheme.body }}>
                Heading: {scheme.fontHeading}
              </p>
              <p style={{ fontFamily: scheme.fontBody, color: scheme.body }}>
                Body: {scheme.fontBody}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};


export default ColorSchemeForm;