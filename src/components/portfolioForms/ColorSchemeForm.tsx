import { FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useCallback } from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import clsx from "clsx";
import { Controller } from "react-hook-form";
import { cn } from "@/lib/utils";

export const COLOR_SCHEMES = [
  { name: "Professional Blue", primary: "#3490dc", secondary: "#4fd1c5" },
  { name: "Creative Purple", primary: "#9f7aea", secondary: "#f687b3" },
  { name: "Modern Green", primary: "#38a169", secondary: "#ecc94b" },
  { name: "Bold Red", primary: "#e53e3e", secondary: "#ed8936" },
  { name: "Elegant Grey", primary: "#718096", secondary: "#f56565" },
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
                  mode: field.value?.mode || 'light' // Preserve existing mode
                })}
              >
                <CardHeader className="pb-2">
                <h3 className="text-lg font-medium text-foreground text-balance">{scheme.name}</h3>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-2">
                    <div
                      className="w-10 h-10 rounded-full"
                      style={{ backgroundColor: scheme.primary }}
                    ></div>
                    <div
                      className="w-10 h-10 rounded-full"
                      style={{ backgroundColor: scheme.secondary }}
                    ></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      />

      {/* Dark/Light Mode Selection */}
      <div className="mt-6">
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
      </div>
    </div>
  );
};

export default ColorSchemeForm;