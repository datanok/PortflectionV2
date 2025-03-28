import { PortfolioFormData } from "@/lib/zod";
import { UseFormReturn } from "react-hook-form";
import { Button } from "../ui/button";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface PortfolioTypeFormProps {
  form: UseFormReturn<PortfolioFormData>;
  portfolioType: string;
  setPortfolioType: React.Dispatch<React.SetStateAction<string>>;
  nextStep: () => void;
}
const PortfolioTypeForm: React.FC<PortfolioTypeFormProps> = ({
  form,
  portfolioType,
  setPortfolioType,
  nextStep,
}) => {
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

  const portfolioTypes = [
    {
      id: "developer",
      title: "Developer",
      description: "Showcase your coding projects, technical skills, and GitHub repositories.",
    },
    {
      id: "designer",
      title: "Designer",
      description: "Display your design work, case studies, and client testimonials.",
    },
    {
      id: "contentCreator",
      title: "Content Creator",
      description: "Highlight your multimedia content, writing, photography, and creative work.",
    },
    {
      id: "businessConsulting",
      title: "Business Consulting",
      description: "Showcase your professional expertise, case studies, and industry impact.",
    }
  ];
  

  return (
    <div className="space-y-6">
       
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {portfolioTypes.map((type) => (
        <div
          key={type.id}
          onClick={() => handlePortfolioTypeChange(type.id)}
          className={cn(
            "relative overflow-hidden rounded-lg ring-1 transition-all duration-300 hover:shadow-lg cursor-pointer",
            portfolioType === type.id
              ? "ring-2 ring-primary bg-primary/10 dark:bg-primary/10"
              : "bg-card hover:bg-muted dark:bg-card dark:hover:bg-muted"
          )}
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-foreground">{type.title}</h3>
              {portfolioType === type.id && (
                <span className="text-primary">
                  <Check />
                </span>
              )}
            </div>
            <p className="text-muted-foreground text-sm">{type.description}</p>
          </div>
        </div>
      ))}
    </div>


      <div className="mt-8 flex justify-center">
        <Button
          onClick={nextStep}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors shadow-sm"
        >
          Continue with{" "}
          {portfolioTypes.find((type) => type.id === portfolioType)?.title}
        </Button>
      </div>
    </div>
  );
};

export default PortfolioTypeForm;
