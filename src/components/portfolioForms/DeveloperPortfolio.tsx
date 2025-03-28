import React from "react";
import { UseFormReturn, useFieldArray } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
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

import { DeveloperPortfolioFormData } from "./types/portfolio";
import { PROJECT_TYPES } from "@/lib/zod";



const DeveloperPortfolio = ({ form }: { form: UseFormReturn<DeveloperPortfolioFormData> }) => {
  const { control, register, trigger, formState: { errors } } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "projects"
  });

  const handleAddProject = async () => {
    const isValid = await trigger("projects");
    if (!isValid) return;

    append({
      title: "",
      description: "",
      technologies: [],
      githubLink: "",
      liveDemo: "",
      type: ""
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
              name={`projects.${index}.title`}
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
              name={`projects.${index}.description`}
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
              name={`projects.${index}.technologies`}
              render={({ field: { value, onChange, ...field } }) => (
                <FormItem>
                  <FormLabel>Technologies Used</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="React, Node.js, TypeScript"
                      value={value || ""} // Ensure value is always a string
                      onChange={(e) => onChange(e.target.value)}
                      {...field}
                      className="focus:ring-2 focus:ring-blue-500"
                    />
                  </FormControl>
                  <FormDescription>
                    Enter technologies separated by commas
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name={`projects.${index}.type`}
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
              name={`projects.${index}.githubLink`}
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
              name={`projects.${index}.liveDemo`}
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
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DeveloperPortfolio;