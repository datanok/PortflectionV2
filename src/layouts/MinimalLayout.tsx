import { memo, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { usePortfolioData } from "@/components/PortfolioProvider";
import { ColorScheme } from "@/components/portfolioForms/types/ColorSchemes";

// Import minimal components
import { Navbar } from "@/components/ui/portfolio-components/minimal/Navbar";
import { Hero } from "@/components/ui/portfolio-components/minimal/Hero";
import { About } from "@/components/ui/portfolio-components/minimal/About";
import { Projects } from "@/components/ui/portfolio-components/minimal/Projects";
import { Contact } from "@/components/ui/portfolio-components/minimal/Contact";
import { Footer } from "@/components/ui/portfolio-components/minimal/Footer";

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
  const [activeSection, setActiveSection] = useState('hero');
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  if (!portfolioData) {
    return <div>Loading portfolio data...</div>;
  }

  const theme: ColorScheme = {
    primary: portfolioData.theme?.primary || '#3b82f6',
    secondary: portfolioData.theme?.secondary || '#64748b',
    accent: portfolioData.theme?.accent || '#8b5cf6',
    background: portfolioData.theme?.background || '#ffffff',
    card: portfolioData.theme?.card || '#ffffff',
    muted: portfolioData.theme?.muted || '#f8fafc',
    border: portfolioData.theme?.border || '#e2e8f0',
    body: portfolioData.theme?.body || '#1e293b',
    bodySecondary: portfolioData.theme?.bodySecondary || '#64748b',
    glass: portfolioData.theme?.glass || 'rgba(255, 255, 255, 0.8)',
    ...portfolioData.theme
  };

  // Map the portfolio data to the expected format
  const projects: Project[] = (portfolioData as any).projects?.map((p: any) => ({
    id: p.id || Math.random().toString(36).substr(2, 9),
    title: p.title || 'Project',
    description: p.description || '',
    tech: p.tech || [],
    github: p.github,
    demo: p.demo,
    image: p.image
  })) || [];

  const experience: ExperienceItem[] = portfolioData.experience?.map((exp: any) => ({
    company: exp.company || 'Company',
    position: exp.position || 'Position',
    startDate: exp.startDate || new Date().toISOString(),
    endDate: exp.endDate,
    current: exp.current,
    description: exp.description,
    achievements: exp.achievements || []
  })) || [];

  const education: EducationItem[] = portfolioData.education?.map((edu: any) => ({
    institution: edu.institution || 'Institution',
    degree: edu.degree || 'Degree',
    field: edu.field,
    startDate: edu.startDate || new Date().toISOString(),
    endDate: edu.endDate,
    current: edu.current,
    description: edu.description
  })) || [];

  const formattedCertifications = ((portfolioData as any).certifications || []).map((cert: any) => ({
    id: cert.id || '',
    name: cert.name || '',
    issuer: cert.issuer || '',
    issueDate: cert.issueDate || '',
    credentialUrl: cert.credentialUrl || ''
  }));

  const handleNavClick = (section: string) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleViewProjects = () => {
    handleNavClick('projects');
  };

  const handleContactClick = () => {
    handleNavClick('contact');
  };

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar 
        name={portfolioData.name || 'Your Name'}
        activeSection={activeSection}
        onNavClick={handleNavClick}
        theme={theme}
        onThemeToggle={() => {}}
        isDarkMode={false}
      />
      
      <main className="flex-1">
        <div id="hero">
          <Hero 
            name={portfolioData.name || 'Your Name'}
            title={portfolioData.title || 'Your Title'}
            about={portfolioData.about || 'A short bio about yourself'}
            profileImage={portfolioData.profileImage}
            location={portfolioData.location}
            socials={portfolioData.socials || {}}
            theme={theme}
            onViewProjects={handleViewProjects}
            onContactClick={handleContactClick}
          />
        </div>
        
        <div id="about">
          <About 
            about={portfolioData.about || ''}
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
              projects={projects.map(p => ({
                ...p,
                tags: p.tech || [],
                githubUrl: p.github,
                liveUrl: p.demo
              }))} 
              theme={theme}
              onViewAll={handleViewProjects}
            />
          </div>
        )}
        
        <div id="contact">
          <Contact 
            email={portfolioData.email || ''}
            theme={theme}
            onContactClick={handleContactClick}
          />
        </div>
      </main>
      
      <Footer 
        name={portfolioData.name || 'Your Name'}
        theme={theme}
        showScrollTop={showScrollTop}
        onScrollTop={handleScrollTop}
      />
    </div>
  );
};

export default memo(MinimalLayout);
