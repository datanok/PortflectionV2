import React from "react";
import { useFieldArray, Control, FieldValues, FieldErrors, UseFormTrigger } from "react-hook-form";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Trash2, PlusCircle } from "lucide-react";

import { PROJECT_TYPES } from "@/lib/zod";

// Define proper form interface
interface FormProps<T extends FieldValues> {
  control: Control<T>;
  formState: {
    errors: FieldErrors<T>;
  };
  setValue?: any;
  watch?: any;
}

interface DeveloperPortfolioProps<T extends FieldValues> {
  form: FormProps<T>;
  trigger: UseFormTrigger<T>;
}

const DeveloperPortfolio = <T extends FieldValues>({ form, trigger }: DeveloperPortfolioProps<T>) => {
  const { control, formState } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "projects" as any
  });

  const handleAddProject = async () => {
    const isValid = await trigger("projects" as any);
    if (!isValid) return;

    append({
      title: "",
      description: "",
      technologies: "",
      githubLink: "",
      liveDemo: "",
      type: "WEB",
      roles: [],
      challenges: "",
      learnings: ""
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Project Portfolio</h2>
        <Button
          type="button"
          variant="outline"
          onClick={handleAddProject}
          className="flex items-center gap-2"
        >
          <PlusCircle className="h-4 w-4" />
          Add Project
        </Button>
      </div>

      {fields.map((field, index) => (
        <Card key={field.id} className="w-full border-gray-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base">Project {index + 1}</CardTitle>
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
              name={`projects.${index}.title` as any}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="My Awesome Project"
                      {...field}
                      className="focus:ring-2 focus:ring-blue-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name={`projects.${index}.description` as any}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe what this project does..."
                      {...field}
                      className="min-h-[100px] focus:ring-2 focus:ring-blue-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name={`projects.${index}.technologies` as any}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Technologies Used</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="React, Node.js, TypeScript"
                      {...field}
                      value={field.value || ""}
                      className="focus:ring-2 focus:ring-blue-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name={`projects.${index}.type` as any}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select project type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {PROJECT_TYPES.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name={`projects.${index}.githubLink` as any}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>GitHub Repository</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://github.com/username/repo"
                      {...field}
                      value={field.value || ""}
                      className="focus:ring-2 focus:ring-blue-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name={`projects.${index}.liveDemo` as any}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Live Demo (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://my-project.vercel.app"
                      {...field}
                      value={field.value || ""}
                      className="focus:ring-2 focus:ring-blue-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={control}
              name={`projects.${index}.challenges` as any}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Challenges Faced</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="What challenges did you overcome during this project?"
                      {...field}
                      value={field.value || ""}
                      className="min-h-[80px] focus:ring-2 focus:ring-blue-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name={`projects.${index}.learnings` as any}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Key Learnings</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="What did you learn from this project?"
                      {...field}
                      value={field.value || ""}
                      className="min-h-[80px] focus:ring-2 focus:ring-blue-500"
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
          <p className="mb-4 text-gray-500">No projects added yet</p>
          <Button
            type="button"
            variant="outline"
            onClick={handleAddProject}
            className="flex items-center gap-2"
          >
            <PlusCircle className="h-4 w-4" />
            Add Your First Project
          </Button>
        </div>
      )}
    </div>
  );
};

export default DeveloperPortfolio;