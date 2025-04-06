// pages/portfolio-builder.tsx
"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// UI Components
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
  basePortfolioSchema,
  businessConsultingPortfolioSchema,
  contentCreatorPortfolioSchema,
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
import ErrorAlertDialog from "@/components/portfolioForms/ErrorDialog";
import ColorSchemeForm, {
  COLOR_SCHEMES,
} from "@/components/portfolioForms/ColorSchemeForm";
import DesignerPortfolio from "@/components/portfolioForms/DesignerPortfolio";
import ContentCreatorPortfolio from "@/components/portfolioForms/ContentCreatorPortfolio";
import BusinessConsultingPortfolio from "@/components/portfolioForms/ConsultingPortfolio";
import { populateFormWithDummyData } from "@/lib/dummyPortfolioData";
import { Code } from "lucide-react";
import DummyDataAlert from "@/components/portfolioForms/DummyDataAlert";

// Type definitions for better type safety
type PortfolioType =
  | "developer"
  | "designer"
  | "contentCreator"
  | "businessConsulting";
type TabType = "personal" | "career" | "contact" | "portfolio";

// Utility functions moved outside the component
const getSchemaForType = (type: PortfolioType) => {
  switch (type) {
    case "developer":
      return developerPortfolioSchema;
    case "designer":
      return designerPortfolioSchema;
    case "contentCreator":
      return contentCreatorPortfolioSchema;
    case "businessConsulting":
      return businessConsultingPortfolioSchema;
    default:
      return basePortfolioSchema;
  }
};

// Generate default values based on portfolio type
const getDefaultValues = (
  portfolioType: PortfolioType,
  colorScheme = COLOR_SCHEMES[0]
) => {
  const baseDefaults = {
    name: "",
    title: "",
    email: "",
    about: "",
    phone: "",
    location: "",
    theme: {
      primary: colorScheme.primary,
      secondary: colorScheme.secondary,
      mode: "light",
    },
  };

  // Type-specific defaults
  const typeDefaults = {
    developer: {
      githubLink: "",
      linkedinLink: "",
      personalWebsite: "",
      skills: {
        languages: [],
        frameworks: [],
        tools: [],
      },
      projects: [],
    },
    designer: {
      skills: [],
      tools: [],
      projects: [
        {
          title: "",
          description: "",
          client: "",
          problem: "",
          solution: "",
          process: "",
          outcome: "",
          images: [],
          testimonial: {
            name: "",
            position: "",
            company: "",
            content: "",
          },
        },
      ],
      testimonials: [],
      awards: [],
    },
    contentCreator: {
      specialties: [],
      portfolioItems: [
        {
          title: "",
          type: "Photography",
          description: "",
          url: "",
          image: "",
          tags: [],
          metadata: {},
        },
      ],
      testimonials: [],
      accolades: [],
      pricingPackages: [],
    },
    businessConsulting: {
      expertiseAreas: [],
      caseStudies: [
        {
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
          teamSize: 1,
          keyMetrics: [],
          images: [],
          testimonials: [],
          featured: false,
        },
      ],
      skills: [
        {
          category: "",
          skills: [],
        },
      ],
      tools: [],
      certifications: [],
      keyAchievements: [],
      industries: [],
    },
  };

  return {
    ...baseDefaults,
    ...(typeDefaults[portfolioType] || {}),
  };
};

// Define validation rules for each step and tab
const VALIDATION_RULES = {
  personal: ["name", "title", "about", "email", "location"],
  contact: ["phone"],
  career: ["experience", "education"],
  developer: ["skills", "projects", "githubLink"],
  designer: ["skills", "tools", "projects"],
  contentCreator: ["specialties", "portfolioItems"],
  businessConsulting: ["expertiseAreas", "caseStudies", "skills"],
  theme: ["theme"],
};

export default function PortfolioBuilder() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [portfolioType, setPortfolioType] =
    useState<PortfolioType>("developer");
  const [currentTab, setCurrentTab] = useState<TabType>("personal");
  const [isErrorDialogOpen, setIsErrorDialogOpen] = useState(false);
  const [isDummyDataAlertOpen, setIsDummyDataAlertOpen] = useState(false);

  // Create form with proper typing
  const form = useForm({
    resolver: zodResolver(getSchemaForType(portfolioType)),
    defaultValues: getDefaultValues(portfolioType),
    mode: "onChange",
  });

  console.log(form);
  const {
    control,
    handleSubmit,
    setValue,
    trigger,
    formState,
    reset,
    getValues,
  } = form;

  // Handle portfolio type change with proper form reset
  const handlePortfolioTypeChange = useCallback(
    (newType: PortfolioType) => {
      setPortfolioType(newType);
      // Get current theme values before reset
      const currentTheme = getValues("theme");

      // Reset with new schema and defaults while preserving theme
      reset(
        {
          ...getDefaultValues(newType),
          theme: currentTheme || {
            primary: COLOR_SCHEMES[0].primary,
            secondary: COLOR_SCHEMES[0].secondary,
            mode: "light",
          },
        },
        {
          resolver: zodResolver(getSchemaForType(newType)),
        }
      );
    },
    [getValues, reset]
  );

  // Memoize the validation fields for the current portfolio type and tab
  const portfolioValidationFields = useMemo(() => {
    return VALIDATION_RULES[portfolioType] || [];
  }, [portfolioType]);

  // Handle color scheme selection

  console.log(form);
  // Navigation functions with validation
  const nextStep = useCallback(async () => {
    let isValid = true;

    // Step-specific validation
    if (step === 2) {
      // In step 2, validate only the current tab's fields
      const fieldsToValidate =
        currentTab === "portfolio"
          ? portfolioValidationFields
          : VALIDATION_RULES[currentTab];
      console.log("fieldsToValidate:", fieldsToValidate);
      console.log(form.formState.errors);
      if (fieldsToValidate && fieldsToValidate.length > 0) {
        isValid = await trigger(fieldsToValidate as any);
      }
    } else if (step === 3) {
      isValid = await trigger("theme" as any);
    }

    if (isValid) {
      setStep((prev) => prev + 1);
    }
  }, [step, currentTab, portfolioValidationFields, trigger]);

  const handleLoadDummyData = () => {
    populateFormWithDummyData(form, portfolioType);
  };

  const prevStep = useCallback(() => {
    setStep((prev) => prev - 1);
  }, []);

  const handleTabChange = useCallback((newTab: string) => {
    setCurrentTab(newTab as TabType);
  }, []);

  // Handle form submission with toast feedback
  const onSubmit = useCallback(
    async (data: any) => {
      toast.promise(
        new Promise((resolve) => {
          setTimeout(() => {
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
            router.push("/portfolio-preview");
            return "Portfolio created successfully!";
          },
          error: "Failed to create portfolio. Please try again.",
        }
      );
    },
    [portfolioType, router]
  );

  // Render each step content
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <PortfolioTypeForm
            form={form}
            portfolioType={portfolioType}
            setPortfolioType={handlePortfolioTypeChange}
            nextStep={nextStep}
            reset={reset}
          />
        );
      case 2:
        return (
          <div className="space-y-6">
            <Tabs defaultValue="personal" onValueChange={handleTabChange}>
              <ScrollArea>
                <div className="w-full relative h-10">
                  <TabsList className="absolute flex flex-row justify-stretch w-full">
                    <TabsTrigger value="personal">Personal Info</TabsTrigger>
                    <TabsTrigger value="career">Career</TabsTrigger>
                    <TabsTrigger value="contact">Contact</TabsTrigger>
                    <TabsTrigger value="portfolio">Portfolio Items</TabsTrigger>
                  </TabsList>
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>

              <TabsContent value="personal" className="space-y-4">
                <PersonalInfoTab form={form} />
              </TabsContent>

              <TabsContent value="career">
                <CareerTab form={form} trigger={trigger} />
              </TabsContent>

              <TabsContent value="contact">
                <ContactInfoTab form={form} />
              </TabsContent>

              <TabsContent value="portfolio">
                {portfolioType === "developer" && (
                  <DeveloperPortfolio form={form} trigger={trigger} />
                )}
                {portfolioType === "designer" && (
                  <div className="space-y-6">
                    <DesignerPortfolio form={form} trigger={trigger} />
                  </div>
                )}
                {portfolioType === "contentCreator" && (
                  <div className="space-y-6">
                    <ContentCreatorPortfolio form={form} trigger={trigger} />
                  </div>
                )}
                {portfolioType === "businessConsulting" && (
                  <div className="space-y-6">
                    <BusinessConsultingPortfolio
                      form={form}
                      trigger={trigger}
                    />
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        );
      case 3:
        return (
          <ColorSchemeForm
            getValues={getValues}
            setValue={setValue}
            control={control}
          />
        );
      case 4:
        return <PreviewTab form={form} portfolioType={portfolioType} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row w-full gap-2">
      {/* Vertical Stepper */}
      <DummyDataAlert
        open={isDummyDataAlertOpen}
        setOpen={setIsDummyDataAlertOpen}
        onConfirm={handleLoadDummyData}
      />
      <VerticalStepper currentStep={step} />
      <ErrorAlertDialog
        errors={formState.errors}
        open={isErrorDialogOpen}
        onOpenChange={setIsErrorDialogOpen}
      />
      <Card className="flex-1 w-full max-w-5xl mx-auto">
        <CardHeader className="sticky top-0 z-10 flex items-center flex-row justify-between">
          <CardTitle className="text-2xl">Build Your Portfolio</CardTitle>
          {step > 1 && (
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsDummyDataAlertOpen(true)}
              className="flex items-center gap-2"
            >
              <Code className="h-4 w-4" />
              Load Sample Data
            </Button>
          )}
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)}>{renderStepContent()}</form>
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
            <Button type="submit" onClick={handleSubmit(onSubmit)}>
              Create Portfolio
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
