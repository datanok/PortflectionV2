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
} from "@/lib/zod";
import DeveloperPortfolio from "@/components/portfolioForms/DeveloperPortfolio";
import PersonalInfoTab from "@/components/portfolioForms/PersonalnfoTab";
import CareerTab from "@/components/portfolioForms/CarrerTab";
import PreviewTab from "@/components/portfolioForms/PreviewTab";
import VerticalStepper from "@/components/Stepper";
import PortfolioTypeForm from "@/components/portfolioForms/PortfolioTypeForm";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import ContactInfoTab from "@/components/portfolioForms/ContactForm";

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

  const stepFields = [
    ["name","title","location","about","email"],

  ]
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


  // Navigation between steps
  const nextStep = async () => {
    // const isValid = await trigger("portfolio");
    setStep(step+1)

  };
  const prevStep = () => setStep(step - 1);
  console.log(form, "form");

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
                          <TabsTrigger value="career">Career</TabsTrigger>
                          <TabsTrigger value="contact">
                            Contact
                          </TabsTrigger>
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
                    <TabsContent value="contact"><ContactInfoTab form={form} /></TabsContent>

                    {/* Portfolio Items Tab - Conditional based on portfolio type */}
                    <TabsContent value="portfolio">
                      {portfolioType === "developer" && (
                        <DeveloperPortfolio form={form} />
                      )}

                      {portfolioType === "designer" && (
                        <div className="space-y-6"></div>
                      )}

                      {portfolioType === "photographer" && (
                        <div className="space-y-6"></div>
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
