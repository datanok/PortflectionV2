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
import { Trash2, PlusCircle, Star, Image } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";

interface FormProps<T extends FieldValues> {
  control: Control<T>;
  formState: {
    errors: FieldErrors<T>;
  };
}

interface DesignerPortfolioProps<T extends FieldValues> {
  form: FormProps<T>;
  trigger: UseFormTrigger<T>;
}


// Project Images Component
const ProjectImages = <T extends FieldValues>({
  control,
  projectIndex,
}: {
  control: Control<T>;
  projectIndex: number;
}) => {
  return (
    <div className="pt-4 border-t">
      <h3 className="text-sm font-medium mb-4 flex items-center">
        <Image className="h-4 w-4 mr-2 text-blue-500" />
        Project Image
      </h3>

      <FormField
        control={control}
        name={`portfolioItems.${projectIndex}.images`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Image URL</FormLabel>
            <FormControl>
              <Input
                placeholder="https://example.com/image.jpg"
                {...field}
                value={field.value || ""}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

// Testimonial Component
const ProjectTestimonial = <T extends FieldValues>({
  control,
  projectIndex,
}: {
  control: Control<T>;
  projectIndex: number;
}) => {
  return (
    <div className="pt-4 border-t">
      <h3 className="text-sm font-medium mb-4 flex items-center">
        <Star className="h-4 w-4 mr-2 text-yellow-500" />
        Client Testimonial
      </h3>

      <div className="p-4 border rounded-lg bg-slate-50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={control}
            name={`portfolioItems.${projectIndex}.testimonial.name`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Client Name*</FormLabel>
                <FormControl>
                  <Input placeholder="Jane Smith" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name={`portfolioItems.${projectIndex}.testimonial.position`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Position</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Marketing Director" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={control}
          name={`portfolioItems.${projectIndex}.testimonial.company`}
          render={({ field }) => (
            <FormItem className="mt-3">
              <FormLabel>Company</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Acme Inc." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name={`portfolioItems.${projectIndex}.testimonial.content`}
          render={({ field }) => (
            <FormItem className="mt-3">
              <FormLabel>Testimonial Content*</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="What the client said about your work..."
                  className="min-h-20"
                  {...field}
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

// Main Portfolio Component
const DesignerPortfolio = <T extends FieldValues>({
  form,
  trigger,
}: DesignerPortfolioProps<T>) => {
  const { control } = form;

  const {
    fields: projectFields,
    append: appendProject,
    remove: removeProject,
    move: moveProject,
  } = useFieldArray({
    control,
    name: "portfolioItems",
  });

  const handleAddProject = async () => {
    const isValid = await trigger("portfolioItems");
    if (projectFields.length > 0 && !isValid) return;

    appendProject({
      title: "",
      client: "",
      description: "",
      problem: "",
      solution: "",
      process: "",
      outcome: "",
      images: "",
      testimonial: {
        name: "",
        position: "",
        company: "",
        content: "",
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
        <div>
          <h2 className="text-xl font-semibold mb-1">Designer Portfolio</h2>
          <p className="text-sm text-gray-500">
            Showcase your skills and best design projects
          </p>
        </div>
        <Button
          type="button"
          variant="default"
          onClick={handleAddProject}
          className="flex items-center gap-2"
        >
          <PlusCircle className="h-4 w-4" /> Add Project
        </Button>
      </div>
      {/* Projects Section */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Your Projects</h2>

        {projectFields.length === 0 && (
          <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-lg mb-6">
            <p className="mb-2 text-gray-500">No projects added yet</p>
            <p className="mb-4 text-sm text-gray-400">
              Showcase your best work by adding your first project
            </p>
            <Button
              type="button"
              variant="default"
              onClick={handleAddProject}
              className="flex items-center gap-2"
            >
              <PlusCircle className="h-4 w-4" /> Add Your First Project
            </Button>
          </div>
        )}

        {projectFields.map((project, projectIndex) => (
          <Card
            key={project.id}
            className="w-full border-gray-200 shadow-sm mb-6"
          >
            <CardHeader className="flex flex-row items-start justify-between pb-2">
              <div>
                <CardTitle className="text-base flex items-center gap-2">
                  Project {projectIndex + 1}
                  {project.title && (
                    <span className="text-gray-500">— {project.title}</span>
                  )}
                </CardTitle>
                {project.client && (
                  <p className="text-sm text-gray-500 mt-1">
                    Client: {project.client}
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                {projectIndex > 0 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => moveProject(projectIndex, projectIndex - 1)}
                    className="text-gray-500"
                  >
                    ↑
                  </Button>
                )}
                {projectIndex < projectFields.length - 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => moveProject(projectIndex, projectIndex + 1)}
                    className="text-gray-500"
                  >
                    ↓
                  </Button>
                )}
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => removeProject(projectIndex)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="basic">Basic Info</TabsTrigger>
                  <TabsTrigger value="detail">Project Details</TabsTrigger>
                  <TabsTrigger value="assets">Images & Testimonial</TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className="space-y-4">
                  <FormField
                    control={control}
                    name={`portfolioItems.${projectIndex}.title`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Title*</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. Website Redesign for XYZ Company"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name={`portfolioItems.${projectIndex}.client`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Client</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. XYZ Company" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name={`portfolioItems.${projectIndex}.description`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Description*</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Provide a brief overview of the project..."
                            className="min-h-20"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>

                <TabsContent value="detail" className="space-y-4">
                  <FormField
                    control={control}
                    name={`portfolioItems.${projectIndex}.problem`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Problem Statement</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe the challenge or problem you were trying to solve..."
                            className="min-h-20"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name={`portfolioItems.${projectIndex}.solution`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Solution</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Explain your approach and solution to the problem..."
                            className="min-h-20"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name={`portfolioItems.${projectIndex}.process`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Design Process</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe your design process and methodology..."
                            className="min-h-20"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name={`portfolioItems.${projectIndex}.outcome`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Outcome & Results</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="What were the results and impact of your work?"
                            className="min-h-20"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>

                <TabsContent value="assets" className="space-y-6">
                  {/* Images Section */}
                  <ProjectImages
                    control={control}
                    projectIndex={projectIndex}
                  />

                  {/* Testimonial Section */}
                  <ProjectTestimonial
                    control={control}
                    projectIndex={projectIndex}
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        ))}

        {projectFields.length > 0 && (
          <Button
            type="button"
            variant="outline"
            onClick={handleAddProject}
            className="flex items-center gap-2"
          >
            <PlusCircle className="h-4 w-4" /> Add Another Project
          </Button>
        )}
      </div>
    </div>
  );
};

export default DesignerPortfolio;
