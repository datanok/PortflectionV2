import { cn } from "@/lib/utils";
import {
  FileCode2,
  Palette,
  ShieldCheck,
  BarChart,
  LayoutDashboard,
  Lock,
  Eye,
  Smartphone,
} from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      title: "Effortless Portfolio Creation",
      description:
        "Fill out a simple form, choose a template, and generate your professional portfolio in one click.",
      icon: <FileCode2 size={32} />,
    },
    {
      title: "Beautiful & Customizable Templates",
      description:
        "Select from professionally designed templates to showcase your work in the best way.",
      icon: <Palette size={32} />,
    },
    {
      title: "Analytics & Performance Tracking",
      description:
        "View real-time analytics to track portfolio views, engagement, and growth.",
      icon: <BarChart size={32} />,
    },
    {
      title: "Personalized Dashboard",
      description:
        "Manage and update your portfolios easily from a dedicated user dashboard.",
      icon: <LayoutDashboard size={32} />,
    },
    {
      title: "Secure & Private",
      description:
        "Your data is protected with secure authentication and privacy-focused settings.",
      icon: <ShieldCheck size={32} />,
    },
    {
      title: "Seamless SSO Authentication",
      description:
        "Sign in quickly with GitHub and other SSO providers without the hassle of passwords.",
      icon: <Lock size={32} />,
    },
    {
      title: "Live Preview Before Publishing",
      description:
        "See exactly how your portfolio will look before making it public.",
      icon: <Eye size={32} />,
    },
    {
      title: "Mobile & SEO Optimized",
      description:
        "Your portfolio is fully responsive and optimized for search engines to maximize visibility.",
      icon: <Smartphone size={32} />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto py-16">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r  py-10 relative group/feature dark:border-neutral-800",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-neutral-800"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-brand transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};
