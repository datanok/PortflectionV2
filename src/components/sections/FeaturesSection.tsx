import { cn } from "@/lib/utils";
import {
  FileCode2,
  Palette,
  BarChart,
  LayoutDashboard,
  Lock,
  Eye,
  Smartphone,
  ArrowRight,
  Component,
} from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      title: "Component-Based Builder",
      description:
        "Choose from a library of pre-designed components like hero sections, project cards, or contact forms to assemble your portfolio.",
      icon: <Component size={24} />,
      color: "var(--color-primary)",
    },
    {
      title: "Real-Time Customization",
      description:
        "Edit text, images, and styles with instant live preview—see your changes as you make them.",
      icon: <Eye size={24} />,
      color: "var(--color-primary)",
    },
    {
      title: "Flexible Design Options",
      description:
        "Mix and match layouts, typography, and colors to create a portfolio that feels uniquely yours.",
      icon: <Palette size={24} />,
      color: "var(--color-primary)",
    },
    {
      title: "Personalized Dashboard",
      description:
        "Manage your saved portfolios, switch themes, and update content from one central dashboard.",
      icon: <LayoutDashboard size={24} />,
      color: "var(--color-primary)",
    },
    {
      title: "Live Publishing",
      description:
        "Publish your portfolio instantly and update it anytime without downtime.",
      icon: <FileCode2 size={24} />,
      color: "var(--color-primary)",
    },
    {
      title: "Secure & Simple Authentication",
      description:
        "Sign in securely with GitHub, Google, and other SSO providers to access your builder.",
      icon: <Lock size={24} />,
      color: "var(--color-primary)",
    },
    {
      title: "Analytics & Insights",
      description:
        "Track portfolio visits, viewer engagement, and performance over time.",
      icon: <BarChart size={24} />,
      color: "var(--color-primary)",
    },
    {
      title: "Mobile & SEO Friendly",
      description:
        "Every portfolio is responsive by default and optimized for search engine visibility.",
      icon: <Smartphone size={24} />,
      color: "var(--color-primary)",
    },
  ];

  return (
    <section className="py-12 sm:py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 ">
          {features.map((feature, index) => (
            <Feature key={feature.title} {...feature} index={index} />
          ))}
        </div>

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

      <style jsx>{`
        .blueprint-section {
          position: relative;
          border: 2px dashed var(--blueprint-accent);
          margin: 4rem auto;
          padding: 4rem 2rem;
          max-width: 90%;
        }

        .blueprint-section:first-child {
          margin-top: 0;
        }

        .blueprint-section:last-child {
          margin-bottom: 0;
        }

        /* Corner brackets - Top Left */
        .blueprint-section::before {
          content: "";
          position: absolute;
          width: 50px;
          height: 50px;
          top: -2px;
          left: -2px;
          border-top: 3px solid var(--blueprint-accent);
          border-left: 3px solid var(--blueprint-accent);
          pointer-events: none;
        }

        /* Corner brackets - Top Right */
        .blueprint-section::after {
          content: "";
          position: absolute;
          width: 50px;
          height: 50px;
          top: -2px;
          right: -2px;
          border-top: 3px solid var(--blueprint-accent);
          border-right: 3px solid var(--blueprint-accent);
          pointer-events: none;
        }

        /* Bottom corner brackets container */
        .blueprint-corners {
          position: absolute;
          bottom: -2px;
          left: -2px;
          right: -2px;
          height: 50px;
          pointer-events: none;
        }

        /* Bottom Left corner */
        .blueprint-corners::before {
          content: "";
          position: absolute;
          width: 50px;
          height: 50px;
          bottom: 0;
          left: 0;
          border-bottom: 3px solid var(--blueprint-accent);
          border-left: 3px solid var(--blueprint-accent);
        }

        /* Bottom Right corner */
        .blueprint-corners::after {
          content: "";
          position: absolute;
          width: 50px;
          height: 50px;
          bottom: 0;
          right: 0;
          border-bottom: 3px solid var(--blueprint-accent);
          border-right: 3px solid var(--blueprint-accent);
        }

        @media (min-width: 1024px) {
          .blueprint-section {
            max-width: 85%;
          }
        }
      `}</style>
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
      className="group relative p-4 sm:p-6 blueprint-card transition-all duration-300 hover:scale-105"
      style={{
        backgroundColor: "var(--color-card)",
        color: "var(--color-card-foreground)",
      }}
    >
      <div className="blueprint-corners"></div>
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-300"
        style={{ backgroundColor: color }}
      />
      <div
        className="relative z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-3 sm:mb-4 transition-all duration-300 group-hover:scale-110"
        style={{
          backgroundColor: `${color}15`,
          color: color,
        }}
      >
        {icon}
      </div>

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

      <div
        className="absolute top-0 right-0 w-12 h-12 sm:w-16 sm:h-16 rounded-bl-full opacity-0 group-hover:opacity-10 transition-opacity duration-300"
        style={{ backgroundColor: color }}
      />

      <style jsx>{`
        .blueprint-card {
          position: relative;
          border: 2px dashed rgba(50, 130, 200, 0.2);
        }

        /* Corner brackets - Top Left */
        .blueprint-card::before {
          content: "";
          position: absolute;
          width: 30px;
          height: 30px;
          top: -2px;
          left: -2px;
          border-top: 2px solid var(--blueprint-accent);
          border-left: 2px solid var(--blueprint-accent);
          pointer-events: none;
        }

        /* Corner brackets - Top Right */
        .blueprint-card::after {
          content: "";
          position: absolute;
          width: 30px;
          height: 30px;
          top: -2px;
          right: -2px;
          border-top: 2px solid var(--blueprint-accent);
          border-right: 2px solid var(--blueprint-accent);
          pointer-events: none;
        }

        /* Bottom corner brackets container */
        .blueprint-corners {
          position: absolute;
          bottom: -2px;
          left: -2px;
          right: -2px;
          height: 30px;
          pointer-events: none;
        }

        /* Bottom Left corner */
        .blueprint-corners::before {
          content: "";
          position: absolute;
          width: 30px;
          height: 30px;
          bottom: 0;
          left: 0;
          border-bottom: 2px solid var(--blueprint-accent);
          border-left: 2px solid var(--blueprint-accent);
        }

        /* Bottom Right corner */
        .blueprint-corners::after {
          content: "";
          position: absolute;
          width: 30px;
          height: 30px;
          bottom: 0;
          right: 0;
          border-bottom: 2px solid var(--blueprint-accent);
          border-right: 2px solid var(--blueprint-accent);
        }
      `}</style>
    </div>
  );
};
