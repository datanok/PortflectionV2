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
  ArrowRight,
} from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      title: "Effortless Portfolio Creation",
      description:
        "Fill out a simple form, choose a template, and generate your professional portfolio in one click.",
      icon: <FileCode2 size={24} />,
      color: "var(--color-chart-1)",
    },
    {
      title: "Beautiful & Customizable Templates",
      description:
        "Select from professionally designed templates to showcase your work in the best way.",
      icon: <Palette size={24} />,
      color: "var(--color-chart-2)",
    },
    {
      title: "Analytics & Performance Tracking",
      description:
        "View real-time analytics to track portfolio views, engagement, and growth.",
      icon: <BarChart size={24} />,
      color: "var(--color-chart-3)",
    },
    {
      title: "Personalized Dashboard",
      description:
        "Manage and update your portfolios easily from a dedicated user dashboard.",
      icon: <LayoutDashboard size={24} />,
      color: "var(--color-chart-4)",
    },
    {
      title: "Secure & Private",
      description:
        "Your data is protected with secure authentication and privacy-focused settings.",
      icon: <ShieldCheck size={24} />,
      color: "var(--color-chart-5)",
    },
    {
      title: "Seamless SSO Authentication",
      description:
        "Sign in quickly with GitHub and other SSO providers without the hassle of passwords.",
      icon: <Lock size={24} />,
      color: "var(--color-primary)",
    },
    {
      title: "Live Preview Before Publishing",
      description:
        "See exactly how your portfolio will look before making it public.",
      icon: <Eye size={24} />,
      color: "var(--color-accent)",
    },
    {
      title: "Mobile & SEO Optimized",
      description:
        "Your portfolio is fully responsive and optimized for search engines to maximize visibility.",
      icon: <Smartphone size={24} />,
      color: "var(--color-secondary)",
    },
  ];

  return (
    <section className="py-12 sm:py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 px-4 sm:px-0"
            style={{ color: "var(--color-foreground)" }}
          >
            Everything you need to create
            <br />
            <span style={{ color: "var(--color-primary)" }}>
              stunning portfolios
            </span>
          </h2>
          <p
            className="text-base sm:text-lg max-w-2xl mx-auto px-4 sm:px-0"
            style={{ color: "var(--color-muted-foreground)" }}
          >
            Powerful features designed to help you showcase your work
            professionally and grow your online presence.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {features.map((feature, index) => (
            <Feature key={feature.title} {...feature} index={index} />
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-12 sm:mt-16 text-center">
          <div
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 transition-all duration-300 hover:scale-105 cursor-pointer group"
            style={{
              borderColor: "var(--color-border)",
              color: "var(--color-foreground)",
            }}
          >
            <span className="font-medium">Explore all features</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </section>
  );
}

const Feature = ({
  title,
  description,
  icon,
  color,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  index: number;
}) => {
  return (
    <div
      className="group relative p-4 sm:p-6 rounded-2xl border transition-all duration-300 hover:scale-105 hover:shadow-lg"
      style={{
        backgroundColor: "var(--color-card)",
        borderColor: "var(--color-border)",
        color: "var(--color-card-foreground)",
      }}
    >
      {/* Hover background effect */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-300"
        style={{ backgroundColor: color }}
      />

      {/* Icon */}
      <div
        className="relative z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-3 sm:mb-4 transition-all duration-300 group-hover:scale-110"
        style={{
          backgroundColor: `${color}15`,
          color: color,
        }}
      >
        {icon}
      </div>

      {/* Content */}
      <div className="relative z-10 space-y-2 sm:space-y-3">
        <h3
          className="text-base sm:text-lg font-semibold"
          style={{ color: "var(--color-foreground)" }}
        >
          {title}
        </h3>
        <p
          className="text-xs sm:text-sm leading-relaxed"
          style={{ color: "var(--color-muted-foreground)" }}
        >
          {description}
        </p>
      </div>

      {/* Decorative accent */}
      <div
        className="absolute top-0 right-0 w-12 h-12 sm:w-16 sm:h-16 rounded-bl-full opacity-0 group-hover:opacity-10 transition-opacity duration-300"
        style={{ backgroundColor: color }}
      />
    </div>
  );
};
