"use client";

import dynamic from "next/dynamic";
import { usePortfolioData } from "@/components/PortfolioProvider";
import { FONT_MAP } from "@/lib/fontMap";

// Dynamic imports correctly handling named exports vs default exports
const ExperienceTimeline = dynamic(
  () => import("@/components/ui/portfolio-components/Experience-card").then(mod => ({ 
    default: mod.ExperienceTimeline 
  })),
  { ssr: false, loading: () => <p>Loading experience...</p> }
);

const EducationSection = dynamic(
  () => import("@/components/ui/portfolio-components/Education-section"),
  { ssr: false, loading: () => <p>Loading education...</p> }
);

const DeveloperProjectSection = dynamic(
  () => import("@/components/ui/portfolio-components/DeveloperProjectSection"),
  { ssr: false, loading: () => <p>Loading developer projects...</p> }
);

const DesignerProjectSection = dynamic(
  () => import("@/components/ui/portfolio-components/DesignerProjectSection"),
  { ssr: false, loading: () => <p>Loading designer projects...</p> }
);

const BusinessProjectSection = dynamic(
  () => import("@/components/ui/portfolio-components/BusinessProjectSection"),
  { ssr: false, loading: () => <p>Loading business projects...</p> }
);

const HeroSection = dynamic(
  () => import("@/components/ui/portfolio-components/HeroSection"),
  { ssr: false, loading: () => <p>Loading hero section...</p> }
);

const SkillsSection = dynamic(
  () => import("@/components/ui/portfolio-components/SkillsSection"),
  { ssr: false, loading: () => <p>Loading skills...</p> }
);

const PortfolioNavbar = dynamic(
  () => import("@/components/ui/portfolio-components/PortfolioNavbar").then(mod => ({
    default: mod.PortfolioNavbar
  })),
  { ssr: false, loading: () => <p>Loading navbar...</p> }
);

const SocialIcon = dynamic(
  () => import("@/components/ui/portfolio-components/SocialIcons"),
  { ssr: false, loading: () => <p>Loading social icons...</p> }
);

export default function Developer() {
  const portfolio = usePortfolioData();

  const {
    name,
    title,
    about,
    profileImage,
    location,
    email,
    githubLink,
    socials,
    theme,
    type,
    extraData = {},
  } = portfolio;

  const {
    experience = [],
    education = [],
    skills = [],
    portfolioItems = [],
  } = extraData;

  const { portfolioType } = portfolio;

  const projectSectionMap = {
    developer: DeveloperProjectSection,
    designer: DesignerProjectSection,
    businessConsulting: BusinessProjectSection,
  };

  const ProjectSectionComponent =
    projectSectionMap[portfolioType] || DeveloperProjectSection;

  const headingFont =
    FONT_MAP[portfolio.theme.fontHeading] || FONT_MAP["Montserrat"];
  const bodyFont = FONT_MAP[portfolio.theme.fontBody] || FONT_MAP["Lato"];

  return (
    <div
      style={{
        backgroundColor: theme?.background || "#f1f5f9",
        color: theme?.body || "#1a202c",
        minHeight: "100vh",
      }}
      className={`${bodyFont.variable} ${headingFont.variable} scroll-smooth`}
    >
      {/* Navbar */}
      <PortfolioNavbar theme={theme} name={name} />

      {/* Hero Section */}
      <section id="hero" className="scroll-mt-16">
        <HeroSection
          name={name}
          title={title}
          about={about}
          email={email}
          githubLink={githubLink}
          location={location}
          profileImage={profileImage}
          socials={socials}
          theme={theme}
          portfolioType={type}
        />
      </section>

      {/* Projects Section */}
      <section id="portfolioItems" className="container mx-auto scroll-mt-16">
        <ProjectSectionComponent portfolioItems={portfolioItems} theme={theme} />
      </section>

      {/* Skills Section */}
      <section id="skills" className="container mx-auto scroll-mt-16">
        <SkillsSection skills={skills} theme={theme} />
      </section>

      {/* Experience Section */}
      <section
        id="experience"
        className="container mx-auto scroll-mt-16"
        style={{ backgroundColor: theme?.muted || "#edf2f7" }}
      >
        <ExperienceTimeline theme={theme} experience={experience} />
      </section>

      {/* Education Section */}
      <section id="education" className="container mx-auto scroll-mt-16">
        <EducationSection education={education} theme={theme} />
      </section>

      {/* Footer */}
      <footer
        className="py-4 px-4"
        style={{
          backgroundColor: theme?.primary || "#1f2937",
          color: theme?.light || "#f7fafc",
          fontFamily: theme?.fontBody || "Lato",
        }}
      >
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-center md:text-left">
          <p className="text-xs md:text-sm shrink-0">
            © {new Date().getFullYear()} Portfolio by {name}
          </p>

          {socials && Object.keys(socials).length > 0 && (
            <div className="flex justify-center md:justify-start flex-wrap gap-3">
              {Object.entries(socials).map(([platform, url]) => (
                <SocialIcon key={platform} type={platform} url={url} theme={theme} />
              ))}
            </div>
          )}

          <p className="text-[11px] opacity-60">
            Made with ❤️ using{" "}
            <a
              href="https://portflection.com"
              className="underline hover:text-inherit"
              target="_blank"
              rel="noopener noreferrer"
            >
              Portflection
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}