import React from "react";
import {
  useFieldArray,
  Control,
  FieldValues,
  FieldErrors,
  UseFormTrigger,
} from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Trash2, PlusCircle } from "lucide-react";

interface FormProps<T extends FieldValues> {
  control: Control<T>;
  formState: {
    errors: FieldErrors<T>;
  };
  setValue?: any;
  watch?: any;
}

interface BusinessConsultingPortfolioProps<T extends FieldValues> {
  form: FormProps<T>;
  trigger: UseFormTrigger<T>;
}

const BusinessConsultingPortfolio = <T extends FieldValues>({
  form,
  trigger,
}: BusinessConsultingPortfolioProps<T>) => {
  const { control, formState } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "caseStudies" as any,
  });

  const handleAddCaseStudy = async () => {
    const isValid = await trigger("caseStudies" as any);
    if (!isValid) return;

    append({
      title: "",
      organization: "",
      role: "",
      startDate: "",
      endDate: "",
      ongoing: false,
      description: "",
      challenges: "",
      solutions: "",
      outcomes: "",
      teamSize: undefined,
      keyMetrics: [],
      images: [],
      testimonials: [],
      featured: false,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Case Studies</h2>
        <Button
          type="button"
          variant="outline"
          onClick={handleAddCaseStudy}
          className="flex items-center gap-2"
        >
          <PlusCircle className="h-4 w-4" />
          Add Case Study
        </Button>
      </div>

      {fields.map((field, index) => (
        <Card key={field.id} className="w-full border-gray-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base">Case Study {index + 1}</CardTitle>
            {index > 0 && (
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => remove(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={control}
              name={`caseStudies.${index}.title` as any}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Market Expansion Strategy"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name={`caseStudies.${index}.organization` as any}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organization</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., ABC Corp" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name={`caseStudies.${index}.role` as any}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Role</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Lead Consultant" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name={`caseStudies.${index}.startDate` as any}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name={`caseStudies.${index}.endDate` as any}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name={`caseStudies.${index}.description` as any}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Brief description of the case study..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name={`caseStudies.${index}.challenges` as any}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Challenges</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Key challenges faced..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name={`caseStudies.${index}.solutions` as any}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Solutions</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Solutions proposed and implemented..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name={`caseStudies.${index}.outcomes` as any}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Outcomes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Impact and results achieved..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
      ))}

      {fields.length === 0 && (
        <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg">
          <p className="mb-4 text-gray-500">No case studies added yet</p>
          <Button
            type="button"
            variant="outline"
            onClick={handleAddCaseStudy}
            className="flex items-center gap-2"
          >
            <PlusCircle className="h-4 w-4" />
            Add Your First Case Study
          </Button>
        </div>
      )}
    </div>
  );
};

export default BusinessConsultingPortfolio;
