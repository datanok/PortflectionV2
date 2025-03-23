import { PortfolioFormData } from "@/lib/zod";
import { UseFormReturn } from "react-hook-form";
import { Button } from "../ui/button";

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
      description:
        "Showcase your coding projects, technical skills, and GitHub repositories.",
    },
    {
      id: "designer",
      title: "Designer",
      description:
        "Display your design work, case studies, and client testimonials.",
    },
    {
      id: "photographer",
      title: "Photographer",
      description:
        "Feature your photography, galleries, and professional clients.",
    },
    // {
    //   id: "freelancer",
    //   title: "Freelancer",
    //   description:
    //     "Showcase your skills, portfolio, and testimonials for freelance work.",
    // },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {portfolioTypes.map((type) => (
          <div
            key={type.id}
            onClick={() => handlePortfolioTypeChange(type.id)}
            className={`relative overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-lg cursor-pointer${
              portfolioType === type.id
                ? "ring-2 ring-blue-500 bg-blue-50"
                : "bg-white hover:bg-gray-50"
            }`}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">{type.title}</h3>
                {portfolioType === type.id && (
                  <span className="text-blue-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </span>
                )}
              </div>
              <p className="text-gray-600 text-sm">{type.description}</p>
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
