"use client";

import dynamic from "next/dynamic";
import { PortfolioData, usePortfolioData } from "@/components/PortfolioProvider";
import { FONT_MAP } from "@/lib/fontMap";
import { getDefaultTheme } from "@/types/theme";
import { useCallback, useMemo, memo, useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { CertificationsSection } from "@/components/ui/portfolio-components/classic/CertificationsSection";
import { publishPortfolioAction } from "@/app/dashboard/portfolios/actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// Create skeleton loaders
const TimelineSkeleton = () => (
  <div className="space-y-4 w-full">
    <Skeleton className="h-12 w-full" />
    <Skeleton className="h-40 w-full" />
    <Skeleton className="h-40 w-full" />
  </div>
);

const ShareDialogSkeleton = () => (
  <div className="space-y-4 w-full">
    <Skeleton className="h-12 w-full" />
  </div>
) 

const EducationSkeleton = () => (
  <div className="space-y-4 w-full">
    <Skeleton className="h-12 w-3/4" />
    <Skeleton className="h-32 w-full" />
  </div>
);

const ProjectSectionSkeleton = () => (
  <div className="grid gap-4">
    <Skeleton className="h-12 w-3/4" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Skeleton className="h-64 w-full" />
      <Skeleton className="h-64 w-full" />
    </div>
  </div>
);

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

const SocialIconSkeleton = () => (
  <div className="flex space-x-2">
    <Skeleton className="h-8 w-8 rounded-full" />
    <Skeleton className="h-8 w-8 rounded-full" />
    <Skeleton className="h-8 w-8 rounded-full" />
  </div>
);

// Dynamic imports with memoized loading components
const ExperienceTimeline = dynamic(
  () => import("@/components/ui/portfolio-components/classic/Experience-card").then(mod => ({ 
    default: mod.ExperienceTimeline 
  })),
  { ssr: false, loading: () => <TimelineSkeleton /> }
);

const EducationSection = dynamic(
  () => import("@/components/ui/portfolio-components/classic/Education-section"),
  { ssr: false, loading: () => <EducationSkeleton /> }
);

const DeveloperProjectSection = dynamic(
  () => import("@/components/ui/portfolio-components/classic/DeveloperProjectSection"),
  { ssr: false, loading: () => <ProjectSectionSkeleton /> }
);

const DesignerProjectSection = dynamic(
  () => import("@/components/ui/portfolio-components/classic/DesignerProjectSection"),
  { ssr: false, loading: () => <ProjectSectionSkeleton /> }
);

const BusinessProjectSection = dynamic(
  () => import("@/components/ui/portfolio-components/classic/BusinessProjectSection"),
  { ssr: false, loading: () => <ProjectSectionSkeleton /> }
);

const HeroSection = dynamic(
  () => import("@/components/ui/portfolio-components/classic/HeroSection"),
  { ssr: false, loading: () => <HeroSkeleton /> }
);

const SkillsSection = dynamic(
  () => import("@/components/ui/portfolio-components/classic/SkillsSection"),
  { ssr: false, loading: () => <SkillsSkeleton /> }
);

const PortfolioNavbar = dynamic(
  () => import("@/components/ui/portfolio-components/classic/PortfolioNavbar").then(mod => ({
    default: mod.PortfolioNavbar
  })),
  { ssr: false, loading: () => <NavbarSkeleton /> }
);

const SocialIcon = dynamic(
  () => import("@/components/ui/portfolio-components/classic/SocialIcons"),
  { ssr: false, loading: () => <SocialIconSkeleton /> }
);

const ShareDialog = dynamic(
  () => import("@/components/ui/portfolio-components/classic/ShareDialog"),
  { ssr: false, loading: () => <ShareDialogSkeleton /> }
);

// Memoize components that don't need to re-render frequently
const MemoizedSocialIcon = memo(SocialIcon);
MemoizedSocialIcon.displayName = 'MemoizedSocialIcon';

const MemoizedHeroSection = memo(HeroSection);
MemoizedHeroSection.displayName = 'MemoizedHeroSection';

const MemoizedSkillsSection = memo(SkillsSection);
MemoizedSkillsSection.displayName = 'MemoizedSkillsSection';

const MemoizedExperienceTimeline = memo(ExperienceTimeline);
MemoizedExperienceTimeline.displayName = 'MemoizedExperienceTimeline';

const MemoizedEducationSection = memo(EducationSection);
MemoizedEducationSection.displayName = 'MemoizedEducationSection';

const MemoizedCertificationsSection = memo(CertificationsSection);
MemoizedCertificationsSection.displayName = 'MemoizedCertificationsSection';

const MemoizedPortfolioNavbar = memo(PortfolioNavbar);
MemoizedPortfolioNavbar.displayName = 'MemoizedPortfolioNavbar';

// Memoize the project section components
const MemoizedDeveloperProjectSection = memo(DeveloperProjectSection);
MemoizedDeveloperProjectSection.displayName = 'MemoizedDeveloperProjectSection';

const MemoizedDesignerProjectSection = memo(DesignerProjectSection);
MemoizedDesignerProjectSection.displayName = 'MemoizedDesignerProjectSection';

const MemoizedBusinessProjectSection = memo(BusinessProjectSection);
MemoizedBusinessProjectSection.displayName = 'MemoizedBusinessProjectSection';

// Publish button component - with explicit error handling
const PublishButton = memo(({ id, handlePublish }) => {
  const onClick = useCallback(() => {
    if (!id) {
      toast.error("Portfolio ID is missing");
      return;
    }
    handlePublish(id);
  }, [id, handlePublish]);

  return (
    <button
      onClick={onClick}
      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
    >
      Publish
    </button>
  );
});
PublishButton.displayName = 'PublishButton';

// Share button component - with explicit error handling
const ShareButton = memo(({ id, theme }) => {
  const onClick = useCallback(() => {
    if (!id) {
      toast.error("Portfolio ID is missing");
      return;
    }
    
    try {
      const shareUrl = `${window.location.origin}/portfolio/${id}`;
      navigator.clipboard.writeText(shareUrl);
      toast.success("Link copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy link:", err);
      toast.error("Failed to copy link");
    }
  }, [id]);

  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: theme?.primary || "#4F46E5",
        color: theme?.light || "#FFFFFF",
        padding: "8px 16px",
        borderRadius: "25px",
        border: `1px solid ${theme?.primary || "#4F46E5"}`,
        fontFamily: theme?.fontBody || "sans-serif",
      }}
    >
      Share
    </button>
  );
});
ShareButton.displayName = 'ShareButton';

// Footer component with displayName
const Footer = memo(({ name, socials, theme }: { name: string; socials: any; theme: any }) => (
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
          © {new Date().getFullYear()} by {name || 'Portfolio Owner'}
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
          Built with <span style={{ color: theme?.primary || "#4F46E5" }}>Portflection</span>
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
));
Footer.displayName = 'Footer';

const Developer = ({ isPreview }) => {
  // Hook calls must be in the exact same order on every render
  const portfolio: PortfolioData = usePortfolioData();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  
  // Wait until component is mounted to render
  useEffect(() => {
    setMounted(true);
  }, []);

  // Memoize all values that should be stable between renders
  const {
    id = '',
    name = '',
    title = '',
    about = '',
    profileImage = '',
    location = '',
    email = '',
    socials = {},
    theme: portfolioTheme = {},
    portfolioType = 'developer',
    githubLink = '',
    extraData = {}
  } = useMemo(() => {
    if (!portfolio) return {};
    
    // Safely extract portfolio data with fallbacks
    const baseData = {
      id: portfolio.id || '',
      name: portfolio.name || '',
      title: portfolio.title || '',
      about: portfolio.about || '',
      profileImage: portfolio.profileImage || '',
      location: portfolio.location || '',
      email: portfolio.email || '',
      socials: portfolio.socials || {},
      theme: portfolio.theme || {},
      portfolioType: portfolio.portfolioType || 'developer',
    };
    
    // Handle optional properties
    const githubLink = 'githubLink' in portfolio ? portfolio.githubLink : '';
    const extraData = 'extraData' in portfolio ? portfolio.extraData : {};
    
    return {
      ...baseData,
      githubLink,
      extraData
    };
  }, [portfolio]);

  // Extract extra data with default values - must be a separate memo to avoid conditional hooks
  const {
    experience = [],
    education = [],
    skills = [],
    portfolioItems = [],
    certifications = [],
  } = useMemo(() => extraData || {}, [extraData]);

  // Memoize the theme to prevent unnecessary recalculations
  const theme = useMemo(() => ({
    ...getDefaultTheme(),
    ...portfolioTheme
  }), [portfolioTheme]);

  // Memoize project section component mapping - with stable references
  const projectSectionMap = useMemo(() => ({
    developer: MemoizedDeveloperProjectSection,
    designer: MemoizedDesignerProjectSection,
    businessConsulting: MemoizedBusinessProjectSection,
  }), []);

  // Memoize the component selection function
  const ProjectSectionComponent = useMemo(() => {
    const defaultComponent = MemoizedDeveloperProjectSection;
    if (!portfolioType) return defaultComponent;
    return projectSectionMap[portfolioType] || defaultComponent;
  }, [portfolioType, projectSectionMap]);

  // Safely memoize fonts to prevent recalculation
  const headingFont = useMemo(() => {
    const fontName = portfolioTheme?.fontHeading || "Montserrat";
    return FONT_MAP[fontName] || FONT_MAP["Montserrat"];
  }, [portfolioTheme?.fontHeading]);

  const bodyFont = useMemo(() => {
    const fontName = portfolioTheme?.fontBody || "Lato";
    return FONT_MAP[fontName] || FONT_MAP["Lato"];
  }, [portfolioTheme?.fontBody]);

  // Memoize the publish handler with error handling
  const handlePublish = useCallback(async (portfolioId) => {
    if (!portfolioId) {
      toast.error("Portfolio ID is missing");
      return;
    }
    
    try {
      await publishPortfolioAction(portfolioId);
      router.push(`/portfolio/${portfolioId}`);
    } catch (err) {
      toast.error("Failed to publish portfolio");
    }
  }, [router]);

  // Bail early if not mounted yet
  if (!mounted) {
    return null; // Return nothing during SSR to prevent hydration mismatch
  }

  return (
    <div
      style={{
        backgroundColor: theme?.background || "#f1f5f9",
        color: theme?.body || "#1a202c",
        minHeight: "100vh",
      }}
      className={`${bodyFont?.variable || ''} ${headingFont?.variable || ''} scroll-smooth`}
    >
      {/* Action Button */}
      <div className="fixed top-4 right-4 z-50">
        {isPreview ? (
          <PublishButton id={id} handlePublish={handlePublish} />
        ) : (
          <ShareDialog portfolioId={id} theme={theme} />
        )}
      </div>

      {/* Navbar */}
      <MemoizedPortfolioNavbar theme={theme} name={name || ''} />

      {/* Hero Section */}
      <section id="hero" className="scroll-mt-16">
        <MemoizedHeroSection
          name={name || ''}
          title={title || ''}
          about={about || ''}
          email={email || ''}
          githubLink={githubLink || ''}
          location={location || ''}
          profileImage={profileImage || ''}
          socials={socials || {}}
          theme={theme}
          portfolioType={portfolioType || 'developer'}
        />
      </section>

      {/* Projects Section */}
      <section id="portfolioItems" className="scroll-mt-16">
        <ProjectSectionComponent portfolioItems={portfolioItems || []} theme={theme} />
      </section>

      {/* Skills Section */}
      <section id="skills" className="scroll-mt-16">
        <MemoizedSkillsSection skills={skills || []} theme={theme} />
      </section>

      {/* Experience Section */}
      <section
        id="experience"
        className="scroll-mt-16"
        style={{ backgroundColor: theme?.muted || "#edf2f7" }}
      >
        <MemoizedExperienceTimeline theme={theme} experience={experience || []} />
      </section>

      {/* Education Section */}
      <section id="education" className="scroll-mt-16">
        <MemoizedEducationSection education={education || []} theme={theme} />
      </section>

      {/* Certifications Section */}
      {certifications && certifications.length > 0 && (
        <section id="certifications" className="scroll-mt-16">
          <MemoizedCertificationsSection certifications={certifications} theme={theme} />
        </section>
      )}

      {/* Footer */}
      <Footer name={name || ''} socials={socials || {}} theme={theme} />
    </div>
  );
};

// Add displayName to the main Developer component
Developer.displayName = 'Developer';

// Fix debugging issues with memo components
const MemoizedDeveloper = memo(Developer);
MemoizedDeveloper.displayName = 'MemoizedDeveloper';

export default MemoizedDeveloper;