import React from "react";
import {
  useFieldArray,
  Control,
  FieldValues,
  FieldErrors,
  UseFormTrigger,
  Path,
} from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Trash2, PlusCircle, Github, ExternalLink, Code } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { PROJECT_TYPES } from "@/lib/zod";
import { toast } from "sonner";

interface FormProps<T extends FieldValues> {
  control: Control<T>;
  formState: {
    errors: FieldErrors<T>;
  };
}

interface DeveloperPortfolioProps<T extends FieldValues> {
  form: FormProps<T>;
  trigger: UseFormTrigger<T>;
}

// Social Links Component
const SocialLinks = <T extends FieldValues>({
  control,
}: {
  control: Control<T>;
}) => {
  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <ExternalLink className="h-5 w-5 mr-2 text-blue-500" />
          Social & Professional Links
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={control}
            name="githubLink"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center">
                  <Github className="h-4 w-4 mr-1" /> GitHub
                </FormLabel>
                <FormControl>
                  <Input placeholder="https://github.com/username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="linkedinLink"
            render={({ field }) => (
              <FormItem>
                <FormLabel>LinkedIn</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://linkedin.com/in/username"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="personalWebsite"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Personal Website</FormLabel>
                <FormControl>
                  <Input placeholder="https://yourwebsite.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
};

// Technology Tags Input Component
const TechnologyTagsInput = ({
  value = [],
  onChange,
}: {
  value: string[] | string;
  onChange: (value: string[] | string) => void;
}) => {
  // Support both array and CSV string as value
  const initialTags = Array.isArray(value)
    ? value
    : value
    ? value.split(",").map((tag) => tag.trim()).filter(Boolean)
    : [];
  const [tags, setTags] = React.useState<string[]>(initialTags);
  const [inputValue, setInputValue] = React.useState("");

  const addTag = () => {
    if (inputValue.trim() !== "" && !tags.includes(inputValue.trim())) {
      const newTags = [...tags, inputValue.trim()];
      setTags(newTags);
      onChange(newTags); // Always emit as array
      setInputValue("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    const newTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(newTags);
    onChange(newTags); // Always emit as array
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag();
    }
  };

  React.useEffect(() => {
    const newTags = Array.isArray(value)
      ? value
      : value
      ? value.split(",").map((tag) => tag.trim()).filter(Boolean)
      : [];
    if (tags.join(",") !== newTags.join(",")) {
      setTags(newTags);
    }
  }, [value]);

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map((tag) => (
          <Badge
            key={tag}
            variant="secondary"
            className="flex items-center gap-1"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="ml-1 text-xs hover:text-red-500"
            >
              ×
            </button>
          </Badge>
        ))}
      </div>
      <div className="flex gap-2">
        <Input
          value={inputValue || ""}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add technology and press Enter"
          className="flex-1"
        />
        <Button type="button" variant="outline" size="sm" onClick={addTag}>
          Add
        </Button>
      </div>
    </div>
  );
};



// Project Roles Component
const ProjectRoles = <T extends FieldValues>({
  control,
  projectIndex,
}: {
  control: Control<T>;
  projectIndex: number;
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `portfolioItems.${projectIndex}.roles` as const,
  });

  const handleAddRole = () => {
    if (fields.length >= 5) {
      toast.error(
        "You can only add up to 5 roles per project. Please remove a role to add a new one."
      );
      return;
    }
    append("");
  };

  return (
    <div className="space-y-2">
      <FormLabel>Project Roles</FormLabel>
      <div className="space-y-2">
        {fields.map((role, roleIndex) => (
          <div key={role.id} className="flex items-center gap-2">
            <FormField
              control={control}
              name={`portfolioItems.${projectIndex}.roles.${roleIndex}`}
              render={({ field }) => (
                <FormItem className="flex-1 mb-0">
                  <FormControl>
                    <Input placeholder="e.g. Frontend Developer" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => remove(roleIndex)}
              className="text-red-500 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => handleAddRole()}
        className="mt-2"
      >
        <PlusCircle className="h-4 w-4 mr-2" />
        Add Role
      </Button>
    </div>
  );
};

// Main Portfolio Component
const DeveloperPortfolio = <T extends FieldValues>({
  form,
  trigger,
}: DeveloperPortfolioProps<T>) => {
  const { control, setValue } = form;

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
    const isValid = await trigger("portfolioItems" as Path<T>);
    if (projectFields.length > 0 && !isValid) return;

    appendProject({
      title: "",
      description: "",
      technologies: "",
      githubLink: "",
      liveDemo: "",
      type: "web-app",
      roles: ["Developer"],
      challenges: "",
      learnings: "",
    });
  };

  // Function to display project type in readable format
  const formatProjectType = (type: string) => {
    return type
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
        <div>
          <h2 className="text-xl font-semibold mb-1">Developer Portfolio</h2>
          <p className="text-sm text-gray-500">
            Showcase your skills and best development projects
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

      {/* Social Links Section */}
      <SocialLinks control={control} />


      {/* Projects Section */}
      <div>
        <h2 className="text-lg font-semibold mb-4 flex items-center">
          <Code className="h-5 w-5 mr-2 text-green-500" />
          Your Projects
        </h2>

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
                  <span className="text-gray-400">#{projectIndex + 1}</span>
                  {project.title || "New Project"}
                </CardTitle>
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
                  <TabsTrigger value="links">Links & Tech</TabsTrigger>
                  <TabsTrigger value="details">Additional Details</TabsTrigger>
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
                            placeholder="e.g. E-commerce Platform"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name={`portfolioItems.${projectIndex}.type`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Type*</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value || ""}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select project type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {PROJECT_TYPES.map((type) => (
                              <SelectItem key={type} value={type}>
                                {formatProjectType(type)}
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
                    name={`portfolioItems.${projectIndex}.description`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Description*</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Provide a brief overview of the project..."
                            className="min-h-24"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Describe the project purpose, features, and your role
                          in its development
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>

                <TabsContent value="links" className="space-y-4">
                  <FormField
                    control={control}
                    name={`portfolioItems.${projectIndex}.technologies`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Technologies Used*</FormLabel>
                        <FormControl>
                          <TechnologyTagsInput
                            value={field.value || ""}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormDescription>
                          Enter technologies one at a time (e.g. React, Node.js,
                          MongoDB)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <FormField
                      control={control}
                      name={`portfolioItems.${projectIndex}.                                  `}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center">
                            <Github className="h-4 w-4 mr-1" /> GitHub
                            Repository
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="https://github.com/username/project"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={control}
                      name={`portfolioItems.${projectIndex}.liveDemo`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center">
                            <ExternalLink className="h-4 w-4 mr-1" /> Live Demo
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="https://project-demo.com"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="details" className="space-y-4">
                  {/* Project Roles */}
                  <ProjectRoles control={control} projectIndex={projectIndex} />

                  <FormField
                    control={control}
                    name={`portfolioItems.${projectIndex}.challenges`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Challenges Faced</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="What challenges did you overcome during this project?"
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
                    name={`portfolioItems.${projectIndex}.learnings`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Key Learnings</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="What did you learn from this project?"
                            className="min-h-20"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="border-t pt-4 flex justify-between mt-2">
              <div className="flex flex-wrap gap-2">
                {project.technologies &&
                  typeof project.technologies === "string" &&
                  project.technologies.split(",").map(
                    (tech) =>
                      tech.trim() && (
                        <Badge key={tech.trim()} variant="secondary">
                          {tech.trim()}
                        </Badge>
                      )
                  )}
              </div>
              <div className="flex gap-3">
                {project.githubLink && (
                  <a
                    href={project.githubLink as string}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                )}
                {project.liveDemo && (
                  <a
                    href={project.liveDemo as string}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <ExternalLink className="h-5 w-5" />
                  </a>
                )}
              </div>
            </CardFooter>
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

export default DeveloperPortfolio;
