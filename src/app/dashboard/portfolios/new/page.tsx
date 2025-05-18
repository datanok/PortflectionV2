// pages/portfolio-builder.tsx
"use client";

import { useState, useMemo, useCallback ,useEffect} from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  deletePortfolioAction,
  createPortfolioAction,
  updatePortfolioAction,
} from "../actions";

// UI Components
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
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
import ColorSchemeForm from "@/components/portfolioForms/ColorSchemeForm";
import DesignerPortfolio from "@/components/portfolioForms/DesignerPortfolio";
import ContentCreatorPortfolio from "@/components/portfolioForms/ContentCreatorPortfolio";
import BusinessConsultingPortfolio from "@/components/portfolioForms/ConsultingPortfolio";
import { populateFormWithDummyData } from "@/lib/dummyPortfolioData";
import { Code } from "lucide-react";
import DummyDataAlert from "@/components/portfolioForms/DummyDataAlert";
import { z, ZodType } from "zod";
import { COLOR_SCHEMES } from "@/components/portfolioForms/types/ColorSchemes";
import { PortfolioType } from "@/app/types/portfolio";
import { Prisma } from "@prisma/client";
import { authClient } from "../../../../../auth-client";

interface PortfolioBuilderProps {
  editMode?: boolean;
  defaultValues?: any; // Consider using a more specific type if possible
  portfolioId?: string | null;
}
// Type definitions for better type safety

type TabType = "personal" | "career" | "contact" | "portfolio";

type PortfolioDefaultValueMap = {
  developer: z.infer<typeof developerPortfolioSchema>;
  designer: z.infer<typeof designerPortfolioSchema>;
  contentCreator: z.infer<typeof contentCreatorPortfolioSchema>;
  businessConsulting: z.infer<typeof businessConsultingPortfolioSchema>;
};

type PortfolioFormData = {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  about: string;
  linkedin: string;
  personalWebsite: string;
  portfolioType: PortfolioType;
  portfolioItems: any[];
  theme: {
    primary: string;
    secondary: string;
  };
} & (
  | { portfolioType: 'developer' }
  | { portfolioType: 'designer' }
  | { portfolioType: 'contentCreator' }
  | { portfolioType: 'businessConsulting' }
) & Prisma.PortfolioCreateInput;

// Utility functions moved outside the component
const getSchemaForType = (type: PortfolioType): ZodType => {
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
    portfolioType: portfolioType,
    theme: {
      primary: colorScheme.primary,
      secondary: colorScheme.secondary,
    },
  };

  const typeDefaults: PortfolioDefaultValueMap = {
    developer: {
      linkedin: "",
      personalWebsite: "",

      portfolioItems: [],
      ...baseDefaults,
    },
    designer: {
      skills: [],
      tools: [],
      portfolioItems: [],
      testimonials: [],
      awards: [],
      ...baseDefaults,
    },
    contentCreator: {
      specialties: [],
      portfolioItems: [],
      testimonials: [],
      accolades: [],
      pricingPackages: [],
      ...baseDefaults,
    },
    businessConsulting: {
      portfolioItems: [],
      skills: [],
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
  developer: ["skills", "portfolioItems", "githubLink"],
  designer: ["skills", "tools", "portfolioItems"],
  contentCreator: ["specialties", "portfolioItems"],
  businessConsulting: ["portfolioItems", "skills"],
  theme: ["theme"],
};

export default function PortfolioBuilder({
  editMode = false,
  defaultValues = null,
  portfolioId = null,
}: PortfolioBuilderProps = {}) {
  const router = useRouter();
  const [step, setStep] = useState(1);

  const [currentTab, setCurrentTab] = useState<TabType>("personal");
  const [isErrorDialogOpen, setIsErrorDialogOpen] = useState(false);
  const [isDummyDataAlertOpen, setIsDummyDataAlertOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: session } = authClient.useSession();
  
  const tabs = useMemo(() => ["personal", "career", "contact", "portfolio"], []);
  const [portfolioType, setPortfolioType] = useState<PortfolioType>(
    editMode ? (defaultValues?.portfolioType as PortfolioType) : "developer"
  );

  const form = useForm<PortfolioFormData>({
    resolver: zodResolver(getSchemaForType(portfolioType)),
    defaultValues: getDefaultValues(portfolioType),
  });

  const { control, handleSubmit, trigger, formState, reset, getValues } = form;

  // Update the form schema when portfolio type changes
  useEffect(() => {
    const currentTheme = getValues("theme");
    form.reset({
      ...getDefaultValues(portfolioType),
      theme: currentTheme || {
        primary: COLOR_SCHEMES[0].primary,
        secondary: COLOR_SCHEMES[0].secondary,
      },
      portfolioType: portfolioType,
    });
    form.setValue("portfolioType", portfolioType);
  }, [portfolioType, form, getValues]);

  // Handle portfolio type change with proper form reset
  const handlePortfolioTypeChange = useCallback(
    (newType: PortfolioType) => {
      setPortfolioType(newType);
      reset(
        {
          ...getDefaultValues(newType),
          theme: getValues("theme") || {
            primary: COLOR_SCHEMES[0].primary,
            secondary: COLOR_SCHEMES[0].secondary,
          },
          portfolioType: newType,
        },

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

    const currentIndex = tabs.indexOf(currentTab);
  
    if (step === 2) {
      // Validate only the current tab's fields
      const fieldsToValidate =
        currentTab === "portfolio"
          ? portfolioValidationFields
          : VALIDATION_RULES[currentTab];
  
      if (fieldsToValidate && fieldsToValidate.length > 0) {
        isValid = await trigger(fieldsToValidate as any);
      }
  
      if (!isValid) return;
      
      if (currentIndex < tabs.length - 1) {
        // Move to next tab, NOT next step
        setCurrentTab(tabs[currentIndex + 1] as any);
        return;
      }
  
      // If currentTab is the last tab and valid, allow step increment
    } else if (step === 3) {
      isValid = await trigger("theme" as any);
      if (!isValid) return;
    }
  
    // Only proceed to next step if validation passed
    setStep((prev) => prev + 1);
  }, [step, currentTab, portfolioValidationFields, trigger, tabs, setCurrentTab, setStep]);
  
  const prevStep = useCallback(() => {
    const currentIndex = tabs.indexOf(currentTab);
  
    if (step === 2 && currentIndex > 0) {
      // Go back one tab within step 2
      setCurrentTab(tabs[currentIndex - 1] as any);
    } else {
      // Go back one step (e.g., from 3 to 2 or from 2 to 1 if already at first tab)
      setStep((prev) => Math.max(prev - 1, 1));
    }
  }, [step, currentTab, tabs, setCurrentTab, setStep]);
  

  const handleTabChange = useCallback((newTab: string) => {
    setCurrentTab(newTab as TabType);
  }, []);


  const handleLoadDummyData = () => {
    populateFormWithDummyData(form, portfolioType);
  };
  // Handle form submission with toast feedback
  const onSubmit = useCallback(
    async (data: PortfolioFormData) => {
      setIsSubmitting(true);
      try {
        if (editMode && portfolioId) {
          const result = await updatePortfolioAction({
            ...data,
            id: portfolioId,
          });
          toast.success("Portfolio updated successfully!");
          router.push(`/portfolio/${result.id}`);
        } else {
          // Add required fields for creation
          const portfolioData = {
            ...data,
            user: {
              connect: {
                id: session?.user?.id || ''
              }
            }
          };
          const result = await createPortfolioAction(portfolioData as Prisma.PortfolioCreateInput);
          toast.success("Portfolio created successfully!");
          router.push(`/portfolio/${result.id}`);
        }
      } catch (error: any) {
        setIsSubmitting(false);
        toast.error(
          error.message ||
            (editMode
              ? "Failed to update portfolio."
              : "Failed to create portfolio.")
        );
      }
    },
    [router, editMode, portfolioId, session]
  );

  // Render each step content
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <PortfolioTypeForm
            form={form}
            portfolioType={portfolioType}
            reset={reset}
            setPortfolioType={setPortfolioType}
            nextStep={nextStep}
          />
        );
      case 2:
        return (
          <div className="space-y-6">
            <Tabs
              defaultValue="personal"
              onValueChange={handleTabChange}
              key={currentTab} // Add this to force re-render
              value={currentTab}
            >
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
        return <ColorSchemeForm control={control} />;
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
            <VerticalStepper currentStep={step} tabList={tabs} currentTab={currentTab} />
          </div>
        </div>

        <Card className="w-full max-w-7xl mx-auto shadow-none overflow-hidden h-[80vh] flex flex-col">
          <CardHeader className="sticky top-0 z-10">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-medium">
                {editMode ? "Edit Portfolio" : "Build Your Portfolio"}
              </CardTitle>

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

          <CardContent className="flex-1 overflow-auto p-2">
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
                {step < 4
                  ? "Next Step"
                  : editMode
                  ? "Update Portfolio"
                  : "Create Portfolio"}
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
