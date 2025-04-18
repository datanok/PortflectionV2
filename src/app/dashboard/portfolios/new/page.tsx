// pages/portfolio-builder.tsx
"use client";

import { useState, useMemo, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// UI Components
import { Button } from "@/components/ui/button";
import {
  Form
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { z, ZodType } from "zod";
import { PortfolioFormData } from "@/components/portfolioForms/types/portfolio";

interface PortfolioBuilderProps {
  editMode?: boolean;
  defaultValues?: any; // Consider using a more specific type if possible
  portfolioId?: string | null;
}
// Type definitions for better type safety
type PortfolioType =
  | "developer"
  | "designer"
  | "contentCreator"
  | "businessConsulting";
type TabType = "personal" | "career" | "contact" | "portfolio";

type PortfolioDefaultValueMap = {
  developer: z.infer<typeof developerPortfolioSchema>;
  designer: z.infer<typeof designerPortfolioSchema>;
  "contentCreator": z.infer<typeof contentCreatorPortfolioSchema>;
  businessConsulting: z.infer<typeof businessConsultingPortfolioSchema>;
};
// Utility functions moved outside the component
const getSchemaForType  = (type: PortfolioType):ZodType => {
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

const getDefaultValues = <T extends keyof PortfolioDefaultValueMap>(
  portfolioType: T,
  colorScheme = COLOR_SCHEMES[0]
): PortfolioDefaultValueMap[T] => {
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
    },
  };

  const typeDefaults: PortfolioDefaultValueMap = {
    developer: {
      githubLink: "",
      linkedinLink: "",
      personalWebsite: "",
     
      projects: [],
      ...baseDefaults,
    },
    designer: {
      skills: [],
      tools: [],
      projects: [],
      testimonials: [],
      awards: [],
      ...baseDefaults,
    },
    "contentCreator": {
      specialties: [],
      portfolioItems: [],
      testimonials: [],
      accolades: [],
      pricingPackages: [],
      ...baseDefaults,
    },
    businessConsulting: {
      caseStudies: [],
      skills: [
        {
          category: "",
          skills: [],
        },
      ],
      certifications: [],
      keyAchievements: [],
      ...baseDefaults,
    },
  };

  return typeDefaults[portfolioType];
};


// Define validation rules for each step and tab
const VALIDATION_RULES = {
  personal: ["name", "title", "about", "email", "location"],
  contact: ["phone"],
  career: ["experience", "education"],
  developer: ["skills", "projects", "githubLink"],
  designer: ["skills", "tools", "projects"],
  contentCreator: ["specialties", "portfolioItems"],
  businessConsulting: ["caseStudies", "skills"],
  theme: ["theme"],
};

export default function PortfolioBuilder({ editMode = false, defaultValues = null, portfolioId = null }:PortfolioBuilderProps = {}) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [portfolioType, setPortfolioType] = useState<PortfolioType>(defaultValues?.type || "developer");
  const [currentTab, setCurrentTab] = useState<TabType>("personal");
  const [isErrorDialogOpen, setIsErrorDialogOpen] = useState(false);
  const [isDummyDataAlertOpen, setIsDummyDataAlertOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Create form with proper typing
  const form = useForm<PortfolioDefaultValueMap[typeof portfolioType]>({
    resolver: zodResolver(getSchemaForType(portfolioType)),
    defaultValues: defaultValues || getDefaultValues(portfolioType),
    mode: "onBlur",
  });
  
  
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

  const nextStep = useCallback(async () => {
    let isValid = true;

    // Step-specific validation
    if (step === 2) {
      // In step 2, validate only the current tab's fields
      const fieldsToValidate =
        currentTab === "portfolio"
          ? portfolioValidationFields
          : VALIDATION_RULES[currentTab];
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
    async (data: PortfolioDefaultValueMap[typeof portfolioType]) => {
      setIsSubmitting(true);
      try {
        let response, result;
        if (editMode && portfolioId) {
          response = await fetch(`/api/portfolio/update`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...data, id: portfolioId }),
          });
        } else {
          response = await fetch(`/api/portfolio/create`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          });
        }
        result = await response.json();
        if (!response.ok) throw new Error(result.message || "Error");
        toast.success(editMode ? "Portfolio updated successfully!" : "Portfolio created successfully!");
        router.push("/dashboard/portfolios");
      } catch (error: any) {
        setIsSubmitting(false);
        toast.error(error.message || (editMode ? "Failed to update portfolio." : "Failed to create portfolio."));
      }
    },
    [portfolioType, router, editMode, portfolioId]
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
    <div className="container max-w-7xl mx-auto overflow-hidden">
    <DummyDataAlert
      open={isDummyDataAlertOpen}
      setOpen={setIsDummyDataAlertOpen}
      onConfirm={handleLoadDummyData}
    />
    
    <ErrorAlertDialog
      errors={formState.errors}
      open={isErrorDialogOpen}
      onOpenChange={setIsErrorDialogOpen}
    />
    
    <div className="grid lg:grid-cols-[280px_1fr] gap-6">
      <div className="">
        <div className="sticky">
          <VerticalStepper currentStep={step} />
        </div>
      </div>

        <Card className="w-full max-w-7xl mx-auto shadow-none overflow-hidden h-[80vh] flex flex-col">
          <CardHeader className="sticky top-0 z-10">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-medium">{editMode ? "Edit Portfolio" : "Build Your Portfolio"}</CardTitle>

              {step > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setIsDummyDataAlertOpen(true)}
                  size="sm"
                  className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <Code className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Load Sample Data</span>
                  <span className="sm:hidden">Sample</span>
                </Button>
              )}
            </div>

         
        </CardHeader>

        <CardContent className="flex-1 overflow-auto">
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {renderStepContent()}
      </form>
    </Form>
  </CardContent>


  <CardFooter className="">
          <div className="flex justify-between w-full">
            <div>
              {step > 1 && (
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={prevStep}
                  size="sm"
                >
                  Previous
                </Button>
              )}
            </div>
            
            <Button 
              type={step < 4 ? "button" : "submit"}
              onClick={step < 4 ? nextStep : handleSubmit(onSubmit)}
              size="sm"
              disabled={isSubmitting}
            >
              {step < 4 ? "Next Step" : (editMode ? "Update Portfolio" : "Create Portfolio")}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  </div>
  );
}
