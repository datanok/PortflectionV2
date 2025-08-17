"use client";

import { BaseLayout } from "./BaseLayout";
import dynamic from "next/dynamic";
import React, { memo, useEffect, useState, useMemo, useCallback } from "react";
import { usePortfolioData } from "@/components/PortfolioProvider";
import type { Theme } from "@/types/theme";
import { getDefaultTheme } from "@/types/theme";
import {
  Code,
  Briefcase,
  Mail,
  Github,
  Linkedin,
  Globe,
  Twitter,
  Instagram,
  Facebook,
  Youtube,
} from "lucide-react";
import type { ReactNode, ComponentType } from "react";

import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

// Define social icon types
type SocialIconType =
  | "github"
  | "linkedin"
  | "website"
  | "twitter"
  | "instagram"
  | "facebook"
  | "youtube"
  | "medium";
type SocialLinks = Partial<Record<SocialIconType, string>>;

// Skeleton loaders
const HeroSkeleton = () => (
  <div className="space-y-4 w-full">
    <Skeleton className="h-16 w-1/2" />
    <Skeleton className="h-8 w-3/4" />
    <Skeleton className="h-12 w-1/3" />
  </div>
);

const SkillsSkeleton = () => (
  <div className="space-y-4 w-full">
    <Skeleton className="h-12 w-1/3" />
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Skeleton className="h-16 w-full" />
      <Skeleton className="h-16 w-full" />
      <Skeleton className="h-16 w-full" />
      <Skeleton className="h-16 w-full" />
    </div>
  </div>
);

const NavbarSkeleton = () => (
  <div className="flex justify-between items-center w-full p-4">
    <Skeleton className="h-8 w-32" />
    <div className="flex space-x-4">
      <Skeleton className="h-6 w-16" />
      <Skeleton className="h-6 w-16" />
      <Skeleton className="h-6 w-16" />
    </div>
  </div>
);

// Type definitions for component props
type PortfolioType =
  | "developer"
  | "designer"
  | "contentCreator"
  | "businessConsulting";

interface PortfolioData {
  name?: string;
  title?: string;
  about?: string;
  profileImage?: string;
  location?: string;
  email?: string;
  phone?: string;
  portfolioType?: PortfolioType;
  skills?: string[];
  socials?: SocialLinks;
  experience?: any[];
  education?: any[];
  portfolioItems?: any[];
  certifications?: any[];
  keyAchievements?: any[];
  theme?: Theme;
}
interface ThemeProps {
  theme: any;
}

interface PortfolioNavbarProps {
  theme: any;
}

interface ExperienceTimelineProps {
  experience: any[];
  theme: any;
}

interface EducationSectionProps {
  education: any[];
  theme: any;
}

interface CertificationsSectionProps {
  certifications: any[];
  theme: any;
}

interface HeaderProps {
  name: string;
  title: string;
  email: string;
  personalWebsite: string;
  location: string;
  profileImage: string;
  socials: Record<string, string>;
  theme: any;
}

interface HeroSectionProps {
  name: string;
  title: string;
  about: string;
  email: string;
  githubLink: string;
  linkedinLink?: string;
  personalWebsite?: string;
  location: string;
  profileImage: string;
  portfolioType: string;
  socials: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
    website?: string;
    github?: string;
  };
  theme: any;
}

interface SkillsSectionProps {
  skills: string[];
  presetType:
    | "developer"
    | "designer"
    | "contentCreator"
    | "businessConsulting";
  theme: any;
}

interface ProjectSectionProps {
  portfolioItems: any[];
  theme: any;
}

interface FooterProps {
  name: string;
  socials: SocialLinks;
  theme: any;
}

// Dynamic imports with loading states and proper typing
const HeroSection = dynamic<HeroSectionProps>(
  () =>
    import("@/components/ui/portfolio-components/classic/HeroSection") as any,
  { ssr: false, loading: () => <HeroSkeleton /> }
);

const SkillsSection = dynamic<SkillsSectionProps>(
  () =>
    import("@/components/ui/portfolio-components/classic/SkillsSection") as any,
  { ssr: false, loading: () => <SkillsSkeleton /> }
);

// Import the PortfolioNavbar component without its props type to avoid conflicts
import { PortfolioNavbar } from "@/components/ui/portfolio-components/classic/PortfolioNavbar";

// Create a properly typed dynamic component
const PortfolioNavbarDynamic = dynamic<
  React.ComponentProps<typeof PortfolioNavbar>
>(
  () =>
    import("@/components/ui/portfolio-components/classic/PortfolioNavbar").then(
      (mod) => mod.PortfolioNavbar
    ),
  {
    ssr: false,
    loading: () => <NavbarSkeleton />,
  }
) as React.ComponentType<React.ComponentProps<typeof PortfolioNavbar>>;

const ExperienceTimeline = dynamic<ExperienceTimelineProps>(
  () =>
    import(
      "@/components/ui/portfolio-components/classic/Experience-card"
    ) as any,
  { ssr: false, loading: () => <div>Loading experience...</div> }
);

const EducationSection = dynamic<EducationSectionProps>(
  () =>
    import(
      "@/components/ui/portfolio-components/classic/Education-section"
    ) as any,
  { ssr: false, loading: () => <div>Loading education...</div> }
);

const CertificationsSection = dynamic<CertificationsSectionProps>(
  () =>
    import(
      "@/components/ui/portfolio-components/classic/CertificationsSection"
    ) as any,
  { ssr: false, loading: () => <div>Loading certifications...</div> }
);

const FooterComponent = dynamic<FooterProps>(
  () => import("@/components/ui/portfolio-components/classic/Footer") as any,
  {
    ssr: false,
    loading: () => (
      <footer className="py-10 px-6 border-t bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center">
            <Skeleton className="h-6 w-32" />
            <div className="flex space-x-4">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
          </div>
        </div>
      </footer>
    ),
  }
);

// Dynamic imports for project sections
const DeveloperProjectSection = dynamic(
  () =>
    import(
      "@/components/ui/portfolio-components/classic/DeveloperProjectSection"
    ),
  { ssr: false, loading: () => <div>Loading projects...</div> }
);

const DesignerProjectSection = dynamic(
  () =>
    import(
      "@/components/ui/portfolio-components/classic/DesignerProjectSection"
    ),
  { ssr: false, loading: () => <div>Loading projects...</div> }
);

const BusinessProjectSection = dynamic(
  () =>
    import(
      "@/components/ui/portfolio-components/classic/BusinessProjectSection"
    ),
  { ssr: false, loading: () => <div>Loading projects...</div> }
);

// Memoize components with proper typing
const MemoizedHeroSection = memo(HeroSection);
MemoizedHeroSection.displayName = "MemoizedHeroSection";

const MemoizedSkillsSection = memo(SkillsSection);
MemoizedSkillsSection.displayName = "MemoizedSkillsSection";

// Memoize the PortfolioNavbar component with proper typing
const MemoizedPortfolioNavbar = memo(function PortfolioNavbarWrapper({
  theme,
  name = "Portfolio",
}: {
  theme: Theme;
  name?: string;
}) {
  return <PortfolioNavbar theme={theme} name={name} />;
});
MemoizedPortfolioNavbar.displayName = "MemoizedPortfolioNavbar";

// Memoize project section components
const MemoizedDeveloperProjectSection = memo(DeveloperProjectSection);
MemoizedDeveloperProjectSection.displayName = "MemoizedDeveloperProjectSection";

const MemoizedDesignerProjectSection = memo(DesignerProjectSection);
MemoizedDesignerProjectSection.displayName = "MemoizedDesignerProjectSection";

const MemoizedBusinessProjectSection = memo(BusinessProjectSection);
MemoizedBusinessProjectSection.displayName = "MemoizedBusinessProjectSection";

// Memoize other components with proper typing
const MemoizedExperienceTimeline = memo(ExperienceTimeline);
MemoizedExperienceTimeline.displayName = "MemoizedExperienceTimeline";

const MemoizedEducationSection = memo(EducationSection);
MemoizedEducationSection.displayName = "MemoizedEducationSection";

const MemoizedCertificationsSection = memo(CertificationsSection);
MemoizedCertificationsSection.displayName = "MemoizedCertificationsSection";

const MemoizedFooter = memo(FooterComponent);
MemoizedFooter.displayName = "MemoizedFooter";

// Social Icons component
interface SocialIconProps {
  type: SocialIconType;
  url: string;
  theme: any;
  className?: string;
}

const SOCIAL_ICONS: Record<SocialIconType, ComponentType<{ size: number }>> = {
  github: Github,
  linkedin: Linkedin,
  website: Globe,
  twitter: Twitter,
  instagram: Instagram,
  facebook: Facebook,
  youtube: Youtube,
  medium: Github,
} as const;

const SocialIcon: React.FC<SocialIconProps> = ({
  type,
  url,
  theme,
  className = "",
}) => {
  const Icon = SOCIAL_ICONS[type];
  if (!Icon) return null;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`p-2 rounded-full hover:bg-opacity-10 hover:bg-white transition-colors ${className}`}
      style={{ color: theme?.light || "#ffffff" }}
      aria-label={`${type} profile`}
    >
      <Icon size={20} />
    </a>
  );
};

const MemoizedSocialIcon = memo(SocialIcon);
MemoizedSocialIcon.displayName = "MemoizedSocialIcon";

const SocialIcons = ({
  socials,
  theme,
}: {
  socials: SocialLinks;
  theme: any;
}): React.ReactElement => {
  const socialIcons: Record<SocialIconType, ReactNode> = {
    github: <Github size={20} />,
    linkedin: <Linkedin size={20} />,
    website: <Globe size={20} />,
    twitter: <Twitter size={20} />,
    instagram: <Instagram size={20} />,
    facebook: <Facebook size={20} />,
    youtube: <Youtube size={20} />,
    medium: <Github size={20} />,
  };

  return (
    <div className="flex space-x-4">
      {(Object.entries(socials) as [SocialIconType, string][]).map(
        ([key, value]) => {
          const Icon = socialIcons[key];

          if (!value || !Icon) return null;

          return (
            <a
              key={key}
              href={value}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-${
                theme?.textSecondary || "gray-500"
              } hover:text-${theme?.primary || "blue-500"} transition-colors`}
              aria-label={key}
            >
              {Icon}
            </a>
          );
        }
      )}
    </div>
  );
};

const MemoizedSocialIcons = memo(SocialIcons);
MemoizedSocialIcons.displayName = "MemoizedSocialIcons";

interface FooterProps {
  name: string;
  socials: SocialLinks;
  theme: any;
}

const Footer = memo(({ name, socials, theme }: FooterProps) => (
  <footer
    className="py-10 px-6 border-t"
    style={{
      backgroundColor: theme?.dark || "#111827",
      color: theme?.light || "#f9fafb",
      fontFamily: theme?.fontBody || "Lato",
      borderColor: theme?.accent || "#374151",
    }}
  >
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Left: Branding */}
      <div className="space-y-2 text-center md:text-left">
        <h2 className="text-xl font-semibold tracking-tight">Portflection</h2>
        <p className="text-sm opacity-70">
          Crafted with purpose. Built to showcase you.
        </p>
        <p className="text-xs opacity-50 mt-1">
          &copy; {new Date().getFullYear()} by {name || "Portfolio Owner"}
        </p>
      </div>

      {/* Center: Socials */}
      {socials && Object.keys(socials).length > 0 && (
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-sm font-medium mb-2">Connect</h3>
          <div className="flex flex-wrap gap-3">
            {(Object.entries(socials) as [SocialIconType, string][]).map(
              ([platform, url]) => (
                <MemoizedSocialIcon
                  key={platform}
                  type={platform}
                  url={url}
                  theme={theme}
                />
              )
            )}
          </div>
        </div>
      )}

      {/* Right: CTA or Credit */}
      <div className="text-center md:text-right space-y-2">
        <p className="text-sm opacity-70">
          Built with{" "}
          <span style={{ color: theme?.primary || "#4F46E5" }}>
            Portflection
          </span>
        </p>
        <a
          href="https://portflection.com"
          className="inline-block text-xs underline hover:opacity-80 transition-opacity"
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit Portflection &rarr;
        </a>
      </div>
    </div>
  </footer>
));
Footer.displayName = "Footer";

// Define portfolio data type locally since we can't import it
interface PortfolioData {
  name?: string;
  title?: string;
  about?: string;
  profileImage?: string;
  location?: string;
  email?: string;
  phone?: string;
  portfolioType?: PortfolioType;
  skills?: string[];
  socials?: SocialLinks;
  experience?: any[];
  education?: any[];
  portfolioItems?: any[];
  certifications?: any[];
  keyAchievements?: any[];
  theme?: Theme;
}

// Using the new PortfolioNavbar component from portfolio-components/classic

// Imported HeroSection component from portfolio-components

interface ClassicLayoutProps {
  isPreview?: boolean;
  children?: ReactNode;
}

const ClassicLayout: React.FC<ClassicLayoutProps> = ({
  isPreview = false,
  children,
}) => {
  const [mounted, setMounted] = useState(false);
  const portfolioData = usePortfolioData();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Define default theme
  const defaultTheme = useMemo<Theme>(
    () => ({
      ...getDefaultTheme(),
      primary: "#000000",
      secondary: "#ffffff",
      dark: "#1a1a1a",
      light: "#f5f5f5",
      accent: "#3b82f6",
      background: "#ffffff",
      card: "#ffffff",
      muted: "#f3f4f6",
      fontHeading: "system-ui, -apple-system, sans-serif",
      fontBody: "system-ui, -apple-system, sans-serif",
      body: "#ffffff",
    }),
    []
  );

  // Safely extract portfolio data with defaults and handle extraData
  const portfolioDataTyped: PortfolioData = {
    ...(portfolioData || {}),
    // Ensure all required properties have default values
    name: portfolioData?.name || "Your Name",
    title: portfolioData?.title || "Your Title",
    about: portfolioData?.about || "A brief introduction about yourself.",
    profileImage: portfolioData?.profileImage || "",
    location: portfolioData?.location || "Location",
    email: portfolioData?.email || "your.email@example.com",
    phone: portfolioData?.phone || "",
    // Extract arrays from extraData if available, otherwise use direct properties or empty arrays
    experience: Array.isArray(portfolioData?.extraData?.experience)
      ? portfolioData.extraData.experience
      : Array.isArray(portfolioData?.experience)
      ? portfolioData.experience
      : [],
    education: Array.isArray(portfolioData?.extraData?.education)
      ? portfolioData.extraData.education
      : Array.isArray(portfolioData?.education)
      ? portfolioData.education
      : [],
    portfolioItems: Array.isArray(portfolioData?.extraData?.portfolioItems)
      ? portfolioData.extraData.portfolioItems
      : Array.isArray(portfolioData?.portfolioItems)
      ? portfolioData.portfolioItems
      : [],
    certifications: Array.isArray(portfolioData?.extraData?.certifications)
      ? portfolioData.extraData.certifications
      : Array.isArray((portfolioData as any)?.certifications)
      ? (portfolioData as any).certifications
      : [],
    keyAchievements: Array.isArray(portfolioData?.extraData?.keyAchievements)
      ? portfolioData.extraData.keyAchievements
      : Array.isArray((portfolioData as any)?.keyAchievements)
      ? (portfolioData as any).keyAchievements
      : [],
    skills: Array.isArray(portfolioData?.extraData?.skills)
      ? portfolioData.extraData.skills
      : Array.isArray(portfolioData?.skills)
      ? portfolioData.skills
      : [],
    socials: portfolioData?.socials || {},
    portfolioType:
      (portfolioData?.portfolioType as PortfolioType) || "developer",
    // Ensure theme is properly typed with defaults
    theme: portfolioData?.theme
      ? {
          ...defaultTheme,
          ...portfolioData.theme,
        }
      : defaultTheme,
  };
  // Destructure the typed portfolio data
  const {
    name,
    title,
    about,
    profileImage,
    location,
    email,
    skills,
    socials: socialLinks,
    experience,
    education,
    portfolioItems,
    certifications,
    keyAchievements,
    portfolioType,
  } = portfolioDataTyped;

  // Combine skills, removing duplicates
  const allSkills = useMemo(() => {
    return [...new Set(skills)];
  }, [skills]);

  // Extract socials with defaults
  const socials = useMemo(
    () => ({
      github: "",
      linkedin: "",
      twitter: "",
      instagram: "",
      website: "",
      behance: "",
      ...socialLinks,
    }),
    [socialLinks]
  );

  // Combine default theme with any custom theme from portfolio data
  const theme = useMemo<Theme>(() => {
    const customTheme = portfolioData?.theme || {};
    // Create a new theme object with all required properties
    const mergedTheme: Theme = {
      // Start with default theme as base
      ...defaultTheme,
      // Override with any custom theme properties
      ...customTheme,
      // Ensure all required Theme properties are provided with fallbacks
      primary: customTheme.primary ?? defaultTheme.primary,
      secondary: customTheme.secondary ?? defaultTheme.secondary,
      dark: customTheme.dark ?? defaultTheme.dark,
      light: customTheme.light ?? defaultTheme.light,
      background: customTheme.background ?? defaultTheme.background,
      card: customTheme.card ?? defaultTheme.card,
      muted: customTheme.muted ?? defaultTheme.muted,
      accent: customTheme.accent ?? defaultTheme.accent,
      fontHeading: customTheme.fontHeading ?? defaultTheme.fontHeading,
      fontBody: customTheme.fontBody ?? defaultTheme.fontBody,
      body: customTheme.body ?? defaultTheme.body,
    };
    return mergedTheme;
  }, [defaultTheme, portfolioData?.theme]);

  // Memoize project section component mapping
  const projectSectionMap = useMemo(
    () => ({
      developer: MemoizedDeveloperProjectSection,
      designer: MemoizedDesignerProjectSection,
      businessConsulting: MemoizedBusinessProjectSection,
    }),
    []
  );

  // Memoize the component selection function
  const ProjectSectionComponent = useMemo(() => {
    const defaultComponent = MemoizedDeveloperProjectSection;
    if (!portfolioType) return defaultComponent;
    return (
      projectSectionMap[portfolioType as keyof typeof projectSectionMap] ||
      defaultComponent
    );
  }, [portfolioType, projectSectionMap]);

  // Create a wrapper component for project sections
  const ProjectSectionWrapper: React.FC<
    { type: string } & ProjectSectionProps
  > = ({ type, ...props }) => {
    switch (type) {
      case "developer":
        return <MemoizedDeveloperProjectSection {...props} />;
      case "designer":
        return <MemoizedDesignerProjectSection {...props} />;
      case "businessConsulting":
        return <MemoizedBusinessProjectSection {...props} />;
      default:
        return <MemoizedDeveloperProjectSection {...props} />;
    }
  };

  // Create a Footer component with proper typing
  const PortfolioFooter = useMemo(() => {
    return (
      <footer
        className="py-10 px-6 border-t"
        style={{
          backgroundColor: theme?.dark || "#111827",
          color: theme?.light || "#f9fafb",
          borderColor: theme?.accent || "#374151",
        }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm">
                {" "}
                &copy; {new Date().getFullYear()} {name || "Portfolio"}
              </p>
            </div>
            <div className="flex space-x-4">
              {Object.entries(socials).map(
                ([platform, url]) =>
                  url && (
                    <a
                      key={platform}
                      href={url as string}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-75 transition-opacity"
                      aria-label={platform}
                    >
                      {platform === "github" && <Github size={20} />}
                      {platform === "linkedin" && <Linkedin size={20} />}
                      {platform === "website" && <Globe size={20} />}
                    </a>
                  )
              )}
            </div>
          </div>
        </div>
      </footer>
    );
  }, [name, socials, theme]);

  // Share button handler
  const handleShare = useCallback(() => {
    try {
      const shareUrl = window.location.href;
      navigator.clipboard.writeText(shareUrl);
      toast.success("Link copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy link:", err);
      toast.error("Failed to copy link");
    }
  }, []);

  if (!mounted) return null;

  // Ensure all required theme properties are included
  const navbarTheme: Theme = {
    primary: theme.primary || "#1f2937",
    secondary: theme.secondary || "#374151",
    dark: theme.dark || "#111827",
    light: theme.light || "#f3f4f6",
    background: theme.background || "#f1f5f9",
    card: theme.card || "#ffffff",
    muted: theme.muted || "#edf2f7",
    accent: theme.accent || "#6366f1",
    fontHeading: theme.fontHeading || "Montserrat",
    fontBody: theme.fontBody || "Lato",
    body: theme.body || "#1a202c",
  };

  return (
    <BaseLayout className="">
      <MemoizedPortfolioNavbar theme={navbarTheme} name={name} />
      <main className="relative overflow-hidden ">
        {/* Hero Section */}
        <section id="hero" className="scroll-mt-16">
          <MemoizedHeroSection
            name={name}
            title={title}
            about={about}
            email={email}
            githubLink={socialLinks.github || ""}
            linkedinLink={socialLinks.linkedin}
            personalWebsite={socialLinks.website}
            location={location}
            profileImage={profileImage}
            portfolioType={portfolioType}
            socials={{
              github: socialLinks.github,
              linkedin: socialLinks.linkedin,
              twitter: socialLinks.twitter,
              instagram: socialLinks.instagram,
              website: socialLinks.website,
            }}
            theme={theme}
          />
        </section>

        <section id="portfolioItems" className="scroll-mt-16">
          <ProjectSectionWrapper
            type={portfolioType}
            portfolioItems={portfolioItems}
            theme={theme}
          />
        </section>

        <section id="skills" className="scroll-mt-16">
          <MemoizedSkillsSection
            skills={allSkills}
            presetType={portfolioType}
            theme={{
              primary: theme.primary,
              secondary: theme.secondary,
              dark: theme.dark,
              light: theme.light,
              background: theme.background,
              card: theme.card,
              muted: theme.muted,
              accent: theme.accent,
              fontHeading: theme.fontHeading,
              fontBody: theme.fontBody,
            }}
          />
        </section>

        {/* Projects Section - Rendered from children */}
        {children && (
          <section id="projects" className="py-20 scroll-mt-16">
            {children}
          </section>
        )}

        {/* Experience Section */}
        <section
          id="experience"
          className="scroll-mt-16"
          style={{ backgroundColor: theme?.muted || "#edf2f7" }}
        >
          <MemoizedExperienceTimeline
            experience={experience}
            theme={{
              primary: theme.primary,
              secondary: theme.secondary,
              dark: theme.dark,
              light: theme.light,
              background: theme.background,
              card: theme.card,
              muted: theme.muted,
              accent: theme.accent,
              fontHeading: theme.fontHeading,
              fontBody: theme.fontBody,
            }}
          />
        </section>

        {/* Education Section */}
        <section id="education" className="scroll-mt-16">
          <MemoizedEducationSection
            education={education}
            theme={{
              primary: theme.primary,
              secondary: theme.secondary,
              dark: theme.dark,
              light: theme.light,
              background: theme.background,
              card: theme.card,
              muted: theme.muted,
              accent: theme.accent,
              fontHeading: theme.fontHeading,
              fontBody: theme.fontBody,
            }}
          />
        </section>

        {/* Certifications Section */}
        {certifications && certifications.length > 0 && (
          <section id="certifications" className="scroll-mt-16">
            <MemoizedCertificationsSection
              certifications={certifications}
              theme={{
                primary: theme.primary,
                secondary: theme.secondary,
                dark: theme.dark,
                light: theme.light,
                background: theme.background,
                card: theme.card,
                muted: theme.muted,
                accent: theme.accent,
                fontHeading: theme.fontHeading,
                fontBody: theme.fontBody,
              }}
            />
          </section>
        )}

        {/* Footer */}
        <MemoizedFooter
          name={name}
          socials={socials}
          theme={{
            primary: theme.primary,
            secondary: theme.secondary,
            dark: theme.dark,
            light: theme.light,
            background: theme.background,
            card: theme.card,
            muted: theme.muted,
            accent: theme.accent,
            fontHeading: theme.fontHeading,
            fontBody: theme.fontBody,
          }}
        />

        {/* Contact Section */}
      </main>
    </BaseLayout>
  );
};

export default memo(ClassicLayout);
