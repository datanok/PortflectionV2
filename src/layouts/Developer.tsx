"use client";

import dynamic from "next/dynamic";
import { usePortfolioData } from "@/components/PortfolioProvider";
import { FONT_MAP } from "@/lib/fontMap";
import { getDefaultTheme } from "@/types/theme";
import { useCallback, useMemo } from "react";
import { memo } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { CertificationsSection } from "@/components/ui/portfolio-components/CertificationsSection";
import { publishPortfolioAction } from "@/app/dashboard/portfolios/actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";




const ExperienceTimeline = dynamic(
  () => import("@/components/ui/portfolio-components/Experience-card").then(mod => ({ 
    default: mod.ExperienceTimeline 
  })),
  { 
    ssr: false, 
    loading: () => (
      <div className="space-y-4 w-full">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-40 w-full" />
      </div>
    )
  }
);

const EducationSection = dynamic(
  () => import("@/components/ui/portfolio-components/Education-section"),
  { 
    ssr: false, 
    loading: () => (
      <div className="space-y-4 w-full">
        <Skeleton className="h-12 w-3/4" />
        <Skeleton className="h-32 w-full" />
      </div>
    )
  }
);

const DeveloperProjectSection = dynamic(
  () => import("@/components/ui/portfolio-components/DeveloperProjectSection"),
  { 
    ssr: false, 
    loading: () => (
      <div className="grid gap-4">
        <Skeleton className="h-12 w-3/4" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    )
  }
);

const DesignerProjectSection = dynamic(
  () => import("@/components/ui/portfolio-components/DesignerProjectSection"),
  { 
    ssr: false, 
    loading: () => (
      <div className="grid gap-4">
        <Skeleton className="h-12 w-3/4" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    )
  }
);

const BusinessProjectSection = dynamic(
  () => import("@/components/ui/portfolio-components/BusinessProjectSection"),
  { 
    ssr: false, 
    loading: () => (
      <div className="grid gap-4">
        <Skeleton className="h-12 w-3/4" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    )
  }
);

const HeroSection = dynamic(
  () => import("@/components/ui/portfolio-components/HeroSection"),
  { 
    ssr: false, 
    loading: () => (
      <div className="space-y-4 w-full">
        <Skeleton className="h-16 w-1/2" />
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-12 w-1/3" />
      </div>
    )
  }
);

const SkillsSection = dynamic(
  () => import("@/components/ui/portfolio-components/SkillsSection"),
  { 
    ssr: false, 
    loading: () => (
      <div className="space-y-4 w-full">
        <Skeleton className="h-12 w-1/3" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
        </div>
      </div>
    )
  }
);

const PortfolioNavbar = dynamic(
  () => import("@/components/ui/portfolio-components/PortfolioNavbar").then(mod => ({
    default: mod.PortfolioNavbar
  })),
  { 
    ssr: false, 
    loading: () => (
      <div className="flex justify-between items-center w-full p-4">
        <Skeleton className="h-8 w-32" />
        <div className="flex space-x-4">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-16" /> 
          <Skeleton className="h-6 w-16" />
        </div>
      </div>
    )
  }
);

const SocialIcon = dynamic(
  () => import("@/components/ui/portfolio-components/SocialIcons"),
  { 
    ssr: false, 
    loading: () => (
      <div className="flex space-x-2">
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
    )
  }
);



const MemoizedSocialIcon = memo(SocialIcon);

export default function Developer({isPreview}: {isPreview: boolean}) {
  const portfolio = usePortfolioData();
  const router = useRouter();

  const {
    name,
    title,
    about,
    profileImage,
    location,
    email,
    socials,
    theme: portfolioTheme,
    portfolioType,
  } = portfolio;
  
  type ExtraData = {
  experience: any[],
  education: any[],
  skills: any[],
  certifications: any[],
  portfolioItems: any[],
  };    
 const githubLink = 'githubLink' in portfolio ? portfolio.githubLink : '';
  const extraData = 'extraData' in portfolio ? portfolio.extraData : {};
  
  
  const theme = useMemo(() => {
    return {
      ...getDefaultTheme(),
      ...portfolioTheme
    };
  }, [portfolioTheme]);
console.log(portfolio);
  const {
    experience = [],
    education = [],
    skills = [],
    portfolioItems = [],
    certifications = [],
  } = extraData as ExtraData;
  const memoizedProjectSectionMap = useMemo(() => ({
    developer: DeveloperProjectSection,
    designer: DesignerProjectSection,
    businessConsulting: BusinessProjectSection,
  }), []);
  const getProjectSection = useCallback(() => {
    console.log(portfolioType);
    return memoizedProjectSectionMap[portfolioType] || DeveloperProjectSection;
  }, [portfolioType]);

  const ProjectSectionComponent = getProjectSection();

  const headingFont = useMemo(() => {
    return FONT_MAP[portfolio.theme.fontHeading] || FONT_MAP["Montserrat"];
  }, [portfolio.theme.fontHeading]);

  const bodyFont = useMemo(() => {
    return FONT_MAP[portfolio.theme.fontBody] || FONT_MAP["Lato"];
  }, [portfolio.theme.fontBody]);

  const handlePublish = async (portfolioId: string) => {
    try {
      await publishPortfolioAction(portfolioId); // you should have portfolioId
      router.push(`/portfolio/${portfolioId}`);
    } catch (err) {
      console.error(err);
      alert("Failed to publish portfolio");
    }
  };
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
      {isPreview && (
  <div className="fixed top-4 right-4 z-50">
    <button
      onClick={() => handlePublish(portfolio.id)}
      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
    >
      Publish
    </button>
  </div>
)}
{!isPreview && (
  <div className="fixed top-4 right-4 z-50">
    <button
      onClick={() => {
        const shareUrl = `${window.location.origin}/portfolio/${portfolio.id}`;
        navigator.clipboard.writeText(shareUrl);
        toast.success("Link copied to clipboard!");
      }}
      style={{
        backgroundColor: theme?.primary,
        color: theme?.light,
        padding: "8px 16px",
        borderRadius: "4px",
        border: `1px solid ${theme?.primary}`,
        fontFamily: theme?.fontBody,
      }}
    >
      Share
    </button>
  </div>
)}


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
          portfolioType={portfolioType}
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

      {/* Certifications Section */}
      {certifications.length > 0 && (
      <section id="certifications" className="container mx-auto scroll-mt-16">
        <CertificationsSection certifications={certifications} theme={theme} />
      </section>
      )}

      {/* Footer */}
      <footer
  className="py-10 px-6 border-t"
  style={{
    backgroundColor: theme?.dark || "#111827",
    color: theme?.light || "#f9fafb",
    fontFamily: theme?.fontBody || "Lato",
    borderColor: theme?.accent || "#374151"
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
        © {new Date().getFullYear()} by {name}
      </p>
    </div>

    {/* Center: Socials */}
    {socials && Object.keys(socials).length > 0 && (
      <div className="flex flex-col items-center md:items-start">
        <h3 className="text-sm font-medium mb-2">Connect</h3>
        <div className="flex flex-wrap gap-3">
          {Object.entries(socials).map(([platform, url]) => (
            <MemoizedSocialIcon key={platform} type={platform} url={url} theme={theme} />
          ))}
        </div>
      </div>
    )}

    {/* Right: CTA or Credit */}
    <div className="text-center md:text-right space-y-2">
      <p className="text-sm opacity-70">
        Built with <span style={{ color: theme?.primary }}>Portflection</span>
      </p>
      <a
        href="https://portflection.com"
        className="inline-block text-xs underline hover:opacity-80 transition-opacity"
        target="_blank"
        rel="noopener noreferrer"
      >
        Visit Portflection →
      </a>
    </div>
  </div>
</footer>

    </div>
  );
}