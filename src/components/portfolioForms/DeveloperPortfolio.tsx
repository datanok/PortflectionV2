import { UseFormReturn, useFieldArray } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DeveloperPortfolioFormData } from "./types/portfolio";

const DeveloperPortfolio = ({ form }: { form: UseFormReturn<DeveloperPortfolioFormData> }) => {
  const { control } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "projects",
  });

  return (
    <div className="space-y-6">
      {/* Projects Section */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Projects</h3>
        <Button
          type="button"
          variant="outline"
          onClick={() =>
            append({
              title: "",
              description: "",
              repoLink: "",
              liveDemo: "",
            })
          }
        >
          Add Project
        </Button>
      </div>
      
      {fields.map((field, index) => (
        <Card key={field.id} className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-medium">Project {index + 1}</h4>
            {index > 0 && (
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => remove(index)}
              >
                Remove
              </Button>
            )}
          </div>

          <div className="space-y-4">
            <FormField
              control={control}
              name={`projects.${index}.title`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Title</FormLabel>
                  <FormControl>
                    <Input placeholder="My Awesome Project" {...field} />
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
                    <Textarea placeholder="Describe what this project does..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name={`projects.${index}.repoLink`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Repository Link</FormLabel>
                  <FormControl>
                    <Input placeholder="https://github.com/username/repo" {...field} />
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
                    <Input placeholder="https://my-project.vercel.app" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </Card>
      ))}
      
      {/* Skills Section */}
      <div className="mt-6">
        <FormLabel className="text-lg font-medium">Skills</FormLabel>
        <FormDescription className="mb-2">
          Enter skills separated by commas (JavaScript, React, Node.js, etc.)
        </FormDescription>
        <FormField
          control={control}
          name="skills"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="JavaScript, React, Node.js, TypeScript, Next.js"
                  value={field.value?.join(", ") || ""}
                  onChange={(e) => {
                    const skillsArray = e.target.value
                      .split(",")
                      .map((skill) => skill.trim())
                      .filter((skill) => skill);
                    field.onChange(skillsArray);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default DeveloperPortfolio;