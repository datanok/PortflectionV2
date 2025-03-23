// pages/portfolio-builder.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

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
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  designerPortfolioSchema,
  developerPortfolioSchema,
  photographerPortfolioSchema,
} from "@/lib/zod";
import DeveloperPortfolio from "@/components/portfolioForms/DeveloperPortfolio";
import PersonalInfoTab from "@/components/portfolioForms/PersonalnfoTab";
import CareerTab from "@/components/portfolioForms/CarrerTab";
import PreviewTab from "@/components/portfolioForms/PreviewTab";
import VerticalStepper from "@/components/Stepper";
import PortfolioTypeForm from "@/components/portfolioForms/PortfolioTypeForm";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

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
  const [step, setStep] = useState(1);
  const [selectedColorScheme, setSelectedColorScheme] = useState(0);
  const [portfolioType, setPortfolioType] = useState("developer");
  // Update form when portfolio type changes

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
    mode: "onChange",
  });

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
          localStorage.setItem(
            "portfolio",
            JSON.stringify({
              ...data,
              type: portfolioType,
              createdAt: new Date().toISOString(),
            })
          );
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
  console.log(form.getValues(), "form");

  return (
    <div className="flex flex-col md:flex-row w-full gap-2">
      {/* Vertical Stepper */}
      <VerticalStepper currentStep={step} />

      <Card className="flex-1 w-full max-w-5xl mx-auto">
        <CardHeader className="sticky top-0 z-10">
          <CardTitle className="text-2xl">Build Your Portfolio</CardTitle>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              {/* Step 1: Portfolio Type Selection */}
              {step === 1 && (
                <PortfolioTypeForm
                  form={form}
                  portfolioType={portfolioType}
                  setPortfolioType={setPortfolioType}
                  nextStep={nextStep}
                />
              )}

              {/* Step 2: Portfolio Details */}
              {step === 2 && (
                <div className="space-y-6">
                  <Tabs defaultValue="personal">
                    <ScrollArea>
                      <div className="w-full relative h-10">
                        <TabsList className="absolute flex flex-row justify-stretch w-full">
                          <TabsTrigger value="personal">
                            Personal Info
                          </TabsTrigger>
                          <TabsTrigger value="socials">
                            Social Links
                          </TabsTrigger>
                          <TabsTrigger value="career">Career</TabsTrigger>
                          <TabsTrigger value="portfolio">
                            Portfolio Items
                          </TabsTrigger>
                        </TabsList>
                      </div>
                      <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                    <TabsContent value="personal" className="space-y-4">
                      <PersonalInfoTab form={form} />
                    </TabsContent>

                    <TabsContent value="career">
                      <CareerTab form={form} />
                    </TabsContent>

                    {/* Portfolio Items Tab - Conditional based on portfolio type */}
                    <TabsContent value="portfolio">
                      {portfolioType === "developer" && (
                        <DeveloperPortfolio form={form} />
                      )}

                      {portfolioType === "designer" && (
                        <div className="space-y-6">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-medium">
                              Case Studies
                            </h3>
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() =>
                                addItemToArray("caseStudies", {
                                  title: "",
                                  description: "",
                                  images: [],
                                })
                              }
                            >
                              Add Case Study
                            </Button>
                          </div>

                          {form.watch("caseStudies")?.map((_, index) => (
                            <Card key={index} className="p-4">
                              <div className="flex justify-between items-center mb-4">
                                <h4 className="font-medium">
                                  Case Study {index + 1}
                                </h4>
                                {index > 0 && (
                                  <Button
                                    type="button"
                                    variant="destructive"
                                    size="sm"
                                    onClick={() =>
                                      removeItemFromArray("caseStudies", index)
                                    }
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
                                        <Input
                                          placeholder="Brand Redesign for XYZ"
                                          {...field}
                                        />
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
                                        <Textarea
                                          placeholder="Describe the challenge, process, and outcome..."
                                          {...field}
                                        />
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
                                      <FormLabel>
                                        Image URLs (one per line)
                                      </FormLabel>
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
                              onClick={() =>
                                addItemToArray("gallery", {
                                  image: "",
                                  caption: "",
                                })
                              }
                            >
                              Add Photo
                            </Button>
                          </div>

                          {form.watch("gallery")?.map((_, index) => (
                            <Card key={index} className="p-4">
                              <div className="flex justify-between items-center mb-4">
                                <h4 className="font-medium">
                                  Photo {index + 1}
                                </h4>
                                {index > 0 && (
                                  <Button
                                    type="button"
                                    variant="destructive"
                                    size="sm"
                                    onClick={() =>
                                      removeItemFromArray("gallery", index)
                                    }
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
                                        <Input
                                          placeholder="https://example.com/photo.jpg"
                                          {...field}
                                        />
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
                                        <Input
                                          placeholder="Sunset over the mountains"
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                            </Card>
                          ))}

                          <div className="mt-6">
                            <FormLabel className="text-lg font-medium">
                              Clients (Optional)
                            </FormLabel>
                            <FormDescription className="mb-2">
                              Enter client names separated by commas
                            </FormDescription>
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

              {step === 3 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-medium">
                    Choose Your Color Scheme
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {colorSchemes.map((scheme, index) => (
                      <Card
                        key={index}
                        className={`cursor-pointer border-2 ${
                          selectedColorScheme === index
                            ? "border-primary"
                            : "border-transparent"
                        }`}
                        onClick={() => handleColorSchemeChange(index)}
                      >
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">
                            {scheme.name}
                          </CardTitle>
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
                    <h3 className="text-lg font-medium mb-4">
                      Light or Dark Mode
                    </h3>
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
              {step === 4 && (
                <PreviewTab form={form} portfolioType={portfolioType} />
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
