import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useEffect } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";

export const layoutTypeFormSchema = z.object({
  layoutType: z.enum(["classic", "minimal"]).default("classic"),
});

export type LayoutTypeFormValues = z.infer<typeof layoutTypeFormSchema>;

interface LayoutTypeFormProps {
  onNext: (values: LayoutTypeFormValues) => void;
  form: UseFormReturn<LayoutTypeFormValues>;
}

export function LayoutTypeForm({ onNext, form }: LayoutTypeFormProps) {

  const onSubmit = (data: LayoutTypeFormValues) => {
    onNext(data);
  };

  const handleNext = () => {
    form.handleSubmit(onSubmit)();
  };

  // Log form state changes
  useEffect(() => {
    const subscription = form.watch((value, { name, type }) => {
      console.log('Form value changed:', { value, name, type });
    });
    return () => subscription.unsubscribe();
  }, [form]);

  // Log initial form values
  useEffect(() => {
    console.log('Initial form values:', form.getValues());
  }, [form]);

  return (
    <div>
      <p className="mb-6 text-muted-foreground">
        Select a layout that best represents your personal brand and style.
      </p>

      <Form {...form}>
        <div className="space-y-8">
          <FormField
            control={form.control}
            name="layoutType"
            render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value) => {
                        console.log('RadioGroup value changed to:', value);
                        field.onChange(value);
                      }}
                      value={field.value || 'classic'}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2"
                    >
                      <div>
                        <RadioGroupItem value="classic" id="classic" className="peer sr-only" />
                        <label
                          htmlFor="classic"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                        >
                          <div className="w-full flex items-center justify-between">
                            <div>
                              <h3 className="text-lg font-semibold">Classic</h3>
                              <p className="text-sm text-muted-foreground">
                                Traditional multi-section layout
                              </p>
                            </div>
                            <div className="h-6 w-6 rounded-full border-2 border-muted-foreground flex items-center justify-center">
                              {field.value === 'classic' && (
                                <div className="h-3 w-3 rounded-full bg-primary" />
                              )}
                            </div>
                          </div>
                          <div className="mt-4 w-full h-32 bg-gradient-to-br from-blue-100 to-blue-50 rounded-md border border-border" />
                        </label>
                      </div>
                      <div>
                        <RadioGroupItem value="minimal" id="minimal" className="peer sr-only" />
                        <label
                          htmlFor="minimal"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                        >
                          <div className="w-full flex items-center justify-between">
                            <div>
                              <h3 className="text-lg font-semibold">Minimal</h3>
                              <p className="text-sm text-muted-foreground">
                                Clean, single-page layout
                              </p>
                            </div>
                            <div className="h-6 w-6 rounded-full border-2 border-muted-foreground flex items-center justify-center">
                              {field.value === 'minimal' && (
                                <div className="h-3 w-3 rounded-full bg-primary" />
                              )}
                            </div>
                          </div>
                          <div className="mt-4 w-full h-32 bg-gradient-to-br from-gray-100 to-gray-50 rounded-md border border-border" />
                        </label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
          </div>
        </Form>
      </div>
  );
};
