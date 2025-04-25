import { FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useCallback } from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import clsx from "clsx";
import { Controller } from "react-hook-form";
import { cn } from "@/lib/utils";

export const COLOR_SCHEMES = [
  {
    name: "Professional Blue",
    primary: "#3490dc",
    secondary: "#4fd1c5",
    dark: "#2d3748",
    light: "#f8fafc",
    background: "#ffffff",
    card: "#f4f4f4",
    muted: "#f1f5f9",
    accent: "#e0e7ff",
    fontHeading: "Montserrat",
    fontBody: "Open Sans",
  },
  {
    name: "Creative Purple",
    primary: "#9f7aea",
    secondary: "#f687b3",
    dark: "#322659",
    light: "#faf5ff",
    background: "#f8f0fc",
    card: "#f3e8ff",
    muted: "#e9d8fd",
    accent: "#b794f4",
    fontHeading: "Poppins",
    fontBody: "Lato",
  },
  {
    name: "Modern Green",
    primary: "#38a169",
    secondary: "#ecc94b",
    dark: "#22543d",
    light: "#f0fff4",
    background: "#e6fffa",
    card: "#c6f6d5",
    muted: "#f0fff4",
    accent: "#68d391",
    fontHeading: "Nunito",
    fontBody: "Roboto",
  },
  {
    name: "Bold Red",
    primary: "#e53e3e",
    secondary: "#ed8936",
    dark: "#742a2a",
    light: "#fff5f5",
    background: "#fffaf0",
    card: "#fed7d7",
    muted: "#fff5f5",
    accent: "#f56565",
    fontHeading: "Oswald",
    fontBody: "Open Sans",
  },
  {
    name: "Elegant Grey",
    primary: "#718096",
    secondary: "#f56565",
    dark: "#2d3748",
    light: "#f7fafc",
    background: "#f1f5f9",
    card: "#e2e8f0",
    muted: "#edf2f7",
    accent: "#a0aec0",
    fontHeading: "Merriweather",
    fontBody: "Lato",
  },
];

interface ColorSchemeFormProps {
  control: any;
}

const ColorSchemeForm: React.FC<ColorSchemeFormProps> = ({ control }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Choose Your Color Scheme</h3>
      
      {/* Color Scheme Selection */}
      <Controller
        name="theme"
        control={control}
        render={({ field }) => (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {COLOR_SCHEMES.map((scheme, index) => (
              <Card
                key={index}
                className={cn(
                  "relative overflow-hidden rounded-lg ring-1 transition-all duration-300 hover:shadow-lg cursor-pointer",
                  field.value?.primary === scheme.primary
                    ? "ring-2 ring-primary bg-primary/10 dark:bg-primary/10"
                    : "bg-card hover:bg-muted dark:bg-card dark:hover:bg-muted"
                )}
                onClick={() => field.onChange({
                  primary: scheme.primary,
                  secondary: scheme.secondary,
                  dark: scheme.dark,
                  light: scheme.light,
                  background: scheme.background,
                  card: scheme.card,
                  muted: scheme.muted,
                  accent: scheme.accent,
                  fontHeading: scheme.fontHeading,
                  fontBody: scheme.fontBody,
                })}
              >
                <CardHeader className="pb-2">
                  <h3 className="text-lg font-medium text-foreground text-balance">{scheme.name}</h3>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-2">
                    <div className="w-10 h-10 rounded-full" style={{ backgroundColor: scheme.primary }}></div>
                    <div className="w-10 h-10 rounded-full" style={{ backgroundColor: scheme.secondary }}></div>
                    <div className="w-10 h-10 rounded-full" style={{ backgroundColor: scheme.background }} title="Background"></div>
                    <div className="w-10 h-10 rounded-full" style={{ backgroundColor: scheme.card }} title="Card"></div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="text-xs" style={{ fontFamily: scheme.fontHeading }}>Heading: {scheme.fontHeading}</span>
                    <span className="text-xs" style={{ fontFamily: scheme.fontBody }}>Body: {scheme.fontBody}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      />

      {/* Dark/Light Mode Selection */}
      {/* <div className="mt-6">
        <h3 className="text-lg font-medium mb-4">Light or Dark Mode</h3>
        <FormField
          control={control}
          name="theme.mode"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="light" id="light" />
                    <label htmlFor="light">Light Mode</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="dark" id="dark" />
                    <label htmlFor="dark">Dark Mode</label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div> */}
    </div>
  );
};

export default ColorSchemeForm;