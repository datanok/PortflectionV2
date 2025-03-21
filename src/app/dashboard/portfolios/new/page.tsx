// pages/portfolio-builder.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";

// UI Components
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { designerPortfolioSchema, developerPortfolioSchema, photographerPortfolioSchema } from "@/lib/zod";
import DeveloperPortfolio from "@/components/portfolioForms/DeveloperPortfolio";
import PersonalInfoTab from "@/components/portfolioForms/PersonalnfoTab";

// // Base schema with common fields for all portfolio types
// const basePortfolioSchema = z.object({
//   name: z.string().min(2, "Name must be at least 2 characters"),
//   title: z.string().min(2, "Title must be at least 2 characters"),
//   email: z.string().email("Please enter a valid email address"),
//   about: z.string().min(50, "Please write at least 50 characters about yourself"),
//   theme: z.object({
//     primary: z.string().default('#3490dc'),
//     secondary: z.string().default('#ffed4a'),
//     mode: z.enum(["light", "dark"]).default("light"),
//   }),
// });

// // Portfolio type-specific schemas
// const developerPortfolioSchema = basePortfolioSchema.extend({
//   projects: z.array(
//     z.object({
//       title: z.string(),
//       description: z.string().optional(),
//       repoLink: z.string().url(),
//       liveDemo: z.string().url().optional(),
//     })
//   ),
//   skills: z.array(z.string()),
// });

// const designerPortfolioSchema = basePortfolioSchema.extend({
//   caseStudies: z.array(
//     z.object({
//       title: z.string(),
//       description: z.string(),
//       images: z.array(z.string().url()).optional(),
//     })
//   ),
//   testimonials: z.array(
//     z.object({
//       client: z.string(),
//       feedback: z.string(),
//     })
//   ).optional(),
// });

// const photographerPortfolioSchema = basePortfolioSchema.extend({
//   gallery: z.array(
//     z.object({
//       image: z.string().url(),
//       caption: z.string().optional(),
//     })
//   ),
//   clients: z.array(z.string()).optional(),
// });

// Define the color schemes available
const colorSchemes = [
  { name: "Professional Blue", primary: "#3490dc", secondary: "#4fd1c5" },
  { name: "Creative Purple", primary: "#9f7aea", secondary: "#f687b3" },
  { name: "Modern Green", primary: "#38a169", secondary: "#ecc94b" },
  { name: "Bold Red", primary: "#e53e3e", secondary: "#ed8936" },
  { name: "Elegant Grey", primary: "#718096", secondary: "#f56565" },
];

// Select the right schema based on portfolio type
const getSchemaForType = (type: string) => {
  switch (type) {
    case "developer":
      return developerPortfolioSchema;
    case "designer":
      return designerPortfolioSchema;
    case "photographer":
      return photographerPortfolioSchema;
    default:
      return developerPortfolioSchema;
  }
};

export default function PortfolioBuilder() {
  const router = useRouter();
  const [portfolioType, setPortfolioType] = useState("developer");
  const [step, setStep] = useState(1);
  const [selectedColorScheme, setSelectedColorScheme] = useState(0);
  
  // Initialize form with the appropriate schema
  const form = useForm({
    resolver: zodResolver(getSchemaForType(portfolioType)),
    defaultValues: {
      name: "",
      title: "",
      email: "",
      about: "",
      phone: "", // Default to an empty string
      location: "", // Default to an empty string
      theme: {
        primary: colorSchemes[0].primary,
        secondary: colorSchemes[0].secondary,
        mode: "light",
      },
      ...(portfolioType === "developer" && {
        projects: [{ title: "", description: "", repoLink: "" }],
        skills: [],
      }),
      ...(portfolioType === "designer" && {
        caseStudies: [{ title: "", description: "" }],
        testimonials: [],
      }),
      ...(portfolioType === "photographer" && {
        gallery: [{ image: "", caption: "" }],
        clients: [],
      }),
    },
    mode:"onChange",
  });

  // Update form when portfolio type changes
  const handlePortfolioTypeChange = (type: string) => {
    setPortfolioType(type);
    form.reset({
      name: form.getValues("name"),
      title: form.getValues("title"),
      email: form.getValues("email"),
      about: form.getValues("about"),
      theme: form.getValues("theme"),
      ...(type === "developer" && {
        projects: [{ title: "", description: "", repoLink: "" }],
        skills: [],
      }),
      ...(type === "designer" && {
        caseStudies: [{ title: "", description: "" }],
        testimonials: [],
      }),
      ...(type === "photographer" && {
        gallery: [{ image: "", caption: "" }],
        clients: [],
      }),
    });
  };

  // Handle color scheme selection
  const handleColorSchemeChange = (index: number) => {
    setSelectedColorScheme(index);
    form.setValue("theme.primary", colorSchemes[index].primary);
    form.setValue("theme.secondary", colorSchemes[index].secondary);
  };

  // Handle form submission
  const onSubmit = async (data: any) => {
    toast.promise(
      // This would be your API call in a real application
      new Promise((resolve) => {
        // Simulate API call
        setTimeout(() => {
          // Save to localStorage for demo purposes
          localStorage.setItem("portfolio", JSON.stringify({
            ...data,
            type: portfolioType,
            createdAt: new Date().toISOString()
          }));
          resolve(data);
        }, 1500);
      }),
      {
        loading: "Creating your portfolio...",
        success: () => {
          // Navigate to preview page
          router.push("/portfolio-preview");
          return "Portfolio created successfully!";
        },
        error: "Failed to create portfolio. Please try again.",
      }
    );
  };

  // Add new item to array fields
  const addItemToArray = (fieldName: string, defaultValue: any) => {
    const currentItems = form.getValues(fieldName) || [];
    form.setValue(fieldName, [...currentItems, defaultValue]);
  };

  // Remove item from array fields
  const removeItemFromArray = (fieldName: string, index: number) => {
    const currentItems = form.getValues(fieldName);
    form.setValue(
      fieldName,
      currentItems.filter((_: any, i: number) => i !== index)
    );
  };

  // Navigation between steps
  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Build Your Portfolio</CardTitle>
          {step === 1 && <p className="text-muted-foreground">Step 1: Choose Portfolio Type</p>}
          {step === 2 && <p className="text-muted-foreground">Step 2: Enter Your Details</p>}
          {step === 3 && <p className="text-muted-foreground">Step 3: Choose Theme Colors</p>}
          {step === 4 && <p className="text-muted-foreground">Step 4: Review & Submit</p>}
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              {/* Step 1: Portfolio Type Selection */}
              {step === 1 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card 
                      className={`cursor-pointer border-2 ${
                        portfolioType === "developer" ? "border-primary" : "border-transparent"
                      }`}
                      onClick={() => handlePortfolioTypeChange("developer")}
                    >
                      <CardHeader>
                        <CardTitle>Developer</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>Showcase your coding projects, technical skills, and GitHub repositories.</p>
                      </CardContent>
                    </Card>

                    <Card 
                      className={`cursor-pointer border-2 ${
                        portfolioType === "designer" ? "border-primary" : "border-transparent"
                      }`}
                      onClick={() => handlePortfolioTypeChange("designer")}
                    >
                      <CardHeader>
                        <CardTitle>Designer</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>Display your design work, case studies, and client testimonials.</p>
                      </CardContent>
                    </Card>

                    <Card 
                      className={`cursor-pointer border-2 ${
                        portfolioType === "photographer" ? "border-primary" : "border-transparent"
                      }`}
                      onClick={() => handlePortfolioTypeChange("photographer")}
                    >
                      <CardHeader>
                        <CardTitle>Photographer</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>Feature your photography, galleries, and professional clients.</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}

              {/* Step 2: Portfolio Details */}
              {step === 2 && (
                <div className="space-y-6">
                  <Tabs defaultValue="personal">
                    <TabsList className="grid w-full grid-cols-6">
                    <TabsTrigger value="personal">Personal Info</TabsTrigger>
    <TabsTrigger value="about">About</TabsTrigger>
    <TabsTrigger value="socials">Social Links</TabsTrigger>
    <TabsTrigger value="experience">Experience</TabsTrigger>
                      <TabsTrigger value="portfolio">Portfolio Items</TabsTrigger>
                    </TabsList>

                    {/* Personal Information Tab */}
                 <PersonalInfoTab form={form} />

                    {/* About Tab */}
                    <TabsContent value="about">
                      <FormField
                        control={form.control}
                        name="about"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>About Me</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Tell potential clients or employers about yourself..." 
                                className="min-h-32" 
                                {...field} 
                              />
                            </FormControl>
                            <FormDescription>
                              Minimum 50 characters. This will be displayed prominently on your portfolio.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </TabsContent>

                    {/* Portfolio Items Tab - Conditional based on portfolio type */}
                    <TabsContent value="portfolio">
                      {portfolioType === "developer" && <DeveloperPortfolio form={form} />}
                      
                      {portfolioType === "designer" && (
                        <div className="space-y-6">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-medium">Case Studies</h3>
                            <Button 
                              type="button" 
                              variant="outline" 
                              onClick={() => addItemToArray("caseStudies", { 
                                title: "", 
                                description: "",
                                images: [] 
                              })}
                            >
                              Add Case Study
                            </Button>
                          </div>
                          
                          {form.watch("caseStudies")?.map((_, index) => (
                            <Card key={index} className="p-4">
                              <div className="flex justify-between items-center mb-4">
                                <h4 className="font-medium">Case Study {index + 1}</h4>
                                {index > 0 && (
                                  <Button
                                    type="button"
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => removeItemFromArray("caseStudies", index)}
                                  >
                                    Remove
                                  </Button>
                                )}
                              </div>
                              
                              <div className="space-y-4">
                                <FormField
                                  control={form.control}
                                  name={`caseStudies.${index}.title`}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Case Study Title</FormLabel>
                                      <FormControl>
                                        <Input placeholder="Brand Redesign for XYZ" {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                
                                <FormField
                                  control={form.control}
                                  name={`caseStudies.${index}.description`}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Description</FormLabel>
                                      <FormControl>
                                        <Textarea placeholder="Describe the challenge, process, and outcome..." {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                
                                <FormField
                                  control={form.control}
                                  name={`caseStudies.${index}.images`}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Image URLs (one per line)</FormLabel>
                                      <FormControl>
                                        <Textarea 
                                          placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg" 
                                          value={field.value?.join("\n") || ""}
                                          onChange={(e) => {
                                            const imagesArray = e.target.value
                                              .split("\n")
                                              .map((url) => url.trim())
                                              .filter((url) => url);
                                            field.onChange(imagesArray);
                                          }}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                            </Card>
                          ))}
                        </div>
                      )}
                      
                      {portfolioType === "photographer" && (
                        <div className="space-y-6">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-medium">Gallery</h3>
                            <Button 
                              type="button" 
                              variant="outline" 
                              onClick={() => addItemToArray("gallery", { 
                                image: "", 
                                caption: ""
                              })}
                            >
                              Add Photo
                            </Button>
                          </div>
                          
                          {form.watch("gallery")?.map((_, index) => (
                            <Card key={index} className="p-4">
                              <div className="flex justify-between items-center mb-4">
                                <h4 className="font-medium">Photo {index + 1}</h4>
                                {index > 0 && (
                                  <Button
                                    type="button"
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => removeItemFromArray("gallery", index)}
                                  >
                                    Remove
                                  </Button>
                                )}
                              </div>
                              
                              <div className="space-y-4">
                                <FormField
                                  control={form.control}
                                  name={`gallery.${index}.image`}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Image URL</FormLabel>
                                      <FormControl>
                                        <Input placeholder="https://example.com/photo.jpg" {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                
                                <FormField
                                  control={form.control}
                                  name={`gallery.${index}.caption`}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Caption (Optional)</FormLabel>
                                      <FormControl>
                                        <Input placeholder="Sunset over the mountains" {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                            </Card>
                          ))}
                          
                          <div className="mt-6">
                            <FormLabel className="text-lg font-medium">Clients (Optional)</FormLabel>
                            <FormDescription className="mb-2">Enter client names separated by commas</FormDescription>
                            <FormField
                              control={form.control}
                              name="clients"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input
                                      placeholder="ABC Magazine, XYZ Agency, The Local Gallery"
                                      value={field.value?.join(", ") || ""}
                                      onChange={(e) => {
                                        const clientsArray = e.target.value
                                          .split(",")
                                          .map((client) => client.trim())
                                          .filter((client) => client);
                                        field.onChange(clientsArray);
                                      }}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
                </div>
              )}

              {/* Step 3: Theme Selection */}
              {step === 3 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-medium">Choose Your Color Scheme</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {colorSchemes.map((scheme, index) => (
                      <Card 
                        key={index} 
                        className={`cursor-pointer border-2 ${
                          selectedColorScheme === index ? "border-primary" : "border-transparent"
                        }`}
                        onClick={() => handleColorSchemeChange(index)}
                      >
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">{scheme.name}</CardTitle>
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
                  
                  <div className="mt-6">
                    <h3 className="text-lg font-medium mb-4">Light or Dark Mode</h3>
                    <FormField
                      control={form.control}
                      name="theme.mode"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
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
              )}

              {/* Step 4: Review and Submit */}
              {step === 4 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-medium">Review Your Portfolio</h3>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Portfolio Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-medium">Type</h4>
                        <p className="capitalize">{portfolioType}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium">Personal Information</h4>
                        <p>{form.getValues("name")}</p>
                        <p>{form.getValues("title")}</p>
                        <p>{form.getValues("email")}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium">About</h4>
                        <p className="line-clamp-3">{form.getValues("about")}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium">Items</h4>
                        {portfolioType === "developer" && (
                          <p>{form.getValues("projects")?.length || 0} projects, {form.getValues("skills")?.length || 0} skills</p>
                        )}
                        {portfolioType === "designer" && (
                          <p>{form.getValues("caseStudies")?.length || 0} case studies</p>
                        )}
                        {portfolioType === "photographer" && (
                          <p>{form.getValues("gallery")?.length || 0} photos</p>
                        )}
                      </div>
                      
                      <div>
                        <h4 className="font-medium">Theme</h4>
                        <div className="flex items-center space-x-2">
                          <div 
                            className="w-6 h-6 rounded-full" 
                            style={{ backgroundColor: form.getValues("theme.primary") }}
                          ></div>
                          <div 
                            className="w-6 h-6 rounded-full" 
                            style={{ backgroundColor: form.getValues("theme.secondary") }}
                          ></div>
                          <p className="capitalize">{form.getValues("theme.mode")} mode</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </form>
          </Form>
        </CardContent>

        <CardFooter className="flex justify-between">
          {step > 1 && (
            <Button type="button" variant="outline" onClick={prevStep}>
              Previous
            </Button>
          )}
          
          {step < 4 ? (
            <Button type="button" onClick={nextStep}>
              Next Step
            </Button>
          ) : (
            <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
              Create Portfolio
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}