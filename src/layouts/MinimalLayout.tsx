import { memo, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { usePortfolioData } from "@/components/PortfolioProvider";
import { ColorScheme } from "@/app/types/portfolio";
import { ArrowUp } from "lucide-react";
import { BaseLayout } from "./BaseLayout";

// Import minimal components
import { Navbar } from "@/components/ui/portfolio-components/minimal/Navbar";
import { Hero } from "@/components/ui/portfolio-components/minimal/Hero";
import { About } from "@/components/ui/portfolio-components/minimal/About";
import { Projects } from "@/components/ui/portfolio-components/minimal/Projects";
import { Contact } from "@/components/ui/portfolio-components/minimal/Contact";
import { Footer } from "@/components/ui/portfolio-components/minimal/Footer";
import Experience from "@/components/ui/portfolio-components/minimal/Experience";

interface MinimalLayoutProps {
  isPreview?: boolean;
}

interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  github?: string;
  demo?: string;
  image?: string;
}

interface ExperienceItem {
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
  description?: string;
  achievements?: string[];
}

interface EducationItem {
  institution: string;
  degree: string;
  field?: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
  description?: string;
}

interface CertificationItem {
  name: string;
  issuingOrganization: string;
  issueDate: string;
  credentialUrl?: string;
}

const MinimalLayout = ({ isPreview = false }: MinimalLayoutProps) => {
  const portfolioData = usePortfolioData();
  const [activeSection, setActiveSection] = useState("hero");
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!portfolioData) {
    return <div>Loading portfolio data...</div>;
  }

  const theme: ColorScheme = {
    primary: portfolioData.theme?.primary || "#3b82f6",
    secondary: portfolioData.theme?.secondary || "#64748b",
    accent: portfolioData.theme?.accent || "#8b5cf6",
    background: portfolioData.theme?.background || "#ffffff",
    card: portfolioData.theme?.card || "#ffffff",
    muted: portfolioData.theme?.muted || "#f8fafc",
    fontHeading: portfolioData.theme?.fontHeading || "Inter",
    fontBody: portfolioData.theme?.fontBody || "Inter",
    body: portfolioData.theme?.body || "#064e3b",
  };

  // Map the portfolio data to the expected format
  const projects: Project[] =
    (portfolioData as any).extraData?.portfolioItems?.map((p: any) => ({
      id: p.id || Math.random().toString(36).substr(2, 9),
      title: p.title || "Project",
      description: p.description || "",
      technologies: Array.isArray(p.technologies)
        ? p.technologies
        : Array.isArray(p.tech)
        ? p.tech
        : [],
      type: p.type,
      githubUrl: p.github,
      liveUrl: p.demo,
      image: p.image,
    })) || [];
  const experience: ExperienceItem[] =
    portfolioData.extraData?.experience?.map((exp: any) => ({
      company: exp.company || "Company",
      position: exp.position || "Position",
      startDate: exp.startDate || new Date().toISOString(),
      endDate: exp.endDate,
      current: exp.current,
      description: exp.description,
      achievements: exp.achievements || [],
    })) || [];

  const education: EducationItem[] =
    portfolioData.extraData?.education?.map((edu: any) => ({
      institution: edu.institution || "Institution",
      degree: edu.degree || "Degree",
      field: edu.field,
      startDate: edu.startDate || new Date().toISOString(),
      endDate: edu.endDate,
      current: edu.current,
      description: edu.description,
    })) || [];

  const formattedCertifications = portfolioData.extraData?.certifications?.map(
    (cert: any) => ({
      id: cert.id || "",
      name: cert.name || "",
      issuer: cert.issuer || "",
      issueDate: cert.issueDate || "",
      credentialUrl: cert.credentialUrl || "",
    })
  );

  const handleNavClick = (section: string) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleViewProjects = () => {
    handleNavClick("projects");
  };

  const handleContactClick = () => {
    handleNavClick("contact");
  };

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <BaseLayout
      theme={{
        fontHeading: theme.fontHeading,
        fontBody: theme.fontBody,
        background: theme.background,
        body: theme.body,
      }}
    >
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
        <Navbar
          name={portfolioData.name || "Your Name"}
          activeSection={activeSection}
          onNavClick={handleNavClick}
          theme={theme}
        />

        <main className="flex-1">
          <div id="hero">
            <Hero
              name={portfolioData.name || "Your Name"}
              title={portfolioData.title || "Your Title"}
              about={portfolioData.about || "A short bio about yourself"}
              email={portfolioData.email}
              githubLink={portfolioData.socials?.github}
              linkedinLink={portfolioData.socials?.linkedin}
              personalWebsite={portfolioData.socials?.website}
              location={portfolioData.location}
              profileImage={portfolioData.profileImage}
              portfolioType="minimal"
              socials={portfolioData.socials || {}}
              theme={theme}
              onViewProjects={handleViewProjects}
              onContactClick={handleContactClick}
            />
          </div>
          <div id="experience">
            <Experience experiences={experience} theme={theme} />
          </div>
          <div id="about">
            <About
              about={portfolioData.about || ""}
              skills={portfolioData.skills || []}
              experience={experience}
              education={education}
              certifications={formattedCertifications}
              theme={theme}
            />
          </div>

          {projects.length > 0 && (
            <div id="projects">
              <Projects
                projects={projects.map((p) => ({
                  ...p,
                  tags: p.tech || [],
                  githubUrl: p.github,
                  liveUrl: p.demo,
                }))}
                theme={theme}
                onViewAll={handleViewProjects}
              />
            </div>
          )}

          <div id="contact">
            <Contact
              email={portfolioData.email || ""}
              theme={theme}
              onContactClick={handleContactClick}
            />
          </div>
        </main>

        <Footer
          name={portfolioData.name || "Your Name"}
          theme={theme}
          showScrollTop={showScrollTop}
          onScrollTop={handleScrollTop}
        />
        {showScrollTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-8 right-8 p-3 rounded-full shadow-lg transition-all hover:scale-110"
            style={{
              backgroundColor: theme.primary,
              color: "white",
            }}
          >
            <ArrowUp className="w-6 h-6" />
          </button>
        )}
      </div>
    </BaseLayout>
  );
};

export default memo(MinimalLayout);
