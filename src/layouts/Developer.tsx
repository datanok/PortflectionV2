"use client";

import { usePortfolioData } from "@/components/PortfolioProvider";
import { ExperienceTimeline } from "@/components/ui/portfolio-components/Experience-card";
import { EducationSection } from "@/components/ui/portfolio-components/Education-section";
import DeveloperProjectSection from "@/components/ui/portfolio-components/DeveloperProjectSection";
import DesignerProjectSection from "@/components/ui/portfolio-components/DesignerProjectSection";
import HeroSection from "@/components/ui/portfolio-components/HeroSection";
import SkillsSection from "@/components/ui/portfolio-components/SkillsSection";
import { PortfolioNavbar } from "@/components/ui/portfolio-components/PortfolioNavbar";

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
    extraData = {},
  } = portfolio;

  const {
    experience = [],
    education = [],
    skills = [],
    projects = [],
  } = extraData;

  // Dynamically select the ProjectSection component based on portfolioType
  const { portfolioType } = portfolio;
  const projectSectionMap = {
    developer: DeveloperProjectSection,
    designer: DesignerProjectSection,
    // Add more types as you create them
  };
  const ProjectSectionComponent = projectSectionMap[portfolioType] || DeveloperProjectSection;

  return (
    <div
      style={{
        backgroundColor: theme?.background || "#f1f5f9",
        color: theme?.body || "#1a202c",
        fontFamily: theme?.fontBody || "Lato",
        minHeight: "100vh",
      }}
      className="scroll-smooth"
    >
      {/* Navbar */}
      <PortfolioNavbar theme={theme} name={name} />
      
      {/* Main Content */}
      <div>
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
          />
        </section>

        {/* Projects Section */}
        <section 
          id="projects" 
          className="container mx-auto py-20 px-4 scroll-mt-16"
          style={{ backgroundColor: theme?.muted || "#edf2f7" }}
        >
          <div className="max-w-5xl mx-auto">
            <h2 
              className="text-3xl font-bold mb-12 text-center" 
              style={{ 
                color: theme?.primary || "#718096", 
                fontFamily: theme?.fontHeading || "Merriweather" 
              }}
            >
              My Projects
            </h2>
            <ProjectSectionComponent projects={projects} theme={theme} />
          </div>
        </section>

        {/* Skills Section */}
        <section 
          id="skills" 
          className="container mx-auto py-20 px-4 scroll-mt-16"
        >
          <div className="max-w-5xl mx-auto">
            <h2 
              className="text-3xl font-bold mb-12 text-center" 
              style={{ 
                color: theme?.primary || "#718096", 
                fontFamily: theme?.fontHeading || "Merriweather" 
              }}
            >
              Skills & Expertise
            </h2>
            <SkillsSection skills={skills} theme={theme} />
          </div>
        </section>

        {/* Experience Section */}
        <section 
          id="experience" 
          className="container mx-auto py-20 px-4 scroll-mt-16"
          style={{ backgroundColor: theme?.muted || "#edf2f7" }}
        >
          <div className="max-w-5xl mx-auto">
            <h2 
              className="text-3xl font-bold mb-12 text-center" 
              style={{ 
                color: theme?.primary || "#718096", 
                fontFamily: theme?.fontHeading || "Merriweather" 
              }}
            >
              Work Experience
            </h2>
            <ExperienceTimeline theme={theme} experience={experience} />
          </div>
        </section>

        {/* Education Section */}
        <section 
          id="education" 
          className="container mx-auto py-20 px-4 scroll-mt-16"
        >
          <div className="max-w-5xl mx-auto">
            <h2 
              className="text-3xl font-bold mb-12 text-center" 
              style={{ 
                color: theme?.primary || "#718096", 
                fontFamily: theme?.fontHeading || "Merriweather" 
              }}
            >
              Education
            </h2>
            <EducationSection education={education} theme={theme} />
          </div>
        </section>

        {/* Footer */}
        <footer 
          className="py-12 text-center" 
          style={{ 
            backgroundColor: theme?.primary || "#718096",
            color: theme?.light || "#f7fafc"
          }}
        >
          <div className="container mx-auto px-4">
            <p className="mb-6 text-lg">© {new Date().getFullYear()} {name} | Portfolio</p>
            
            {/* Social Links */}
            {socials && socials.length > 0 && (
              <div className="flex justify-center space-x-6 mt-6">
                {socials.map((social, index) => (
                  <a 
                    key={index} 
                    href={social.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="transition-opacity hover:opacity-80 text-lg"
                    style={{ color: theme?.light || "#f7fafc" }}
                  >
                    {social.platform}
                  </a>
                ))}
              </div>
            )}
            
            {/* Back to top button */}
            <a 
              href="#hero" 
              className="inline-flex items-center mt-8 px-6 py-3 rounded-md transition-all"
              style={{
                backgroundColor: theme?.accent || "#a0aec0",
                color: theme?.light || "#f7fafc",
              }}
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              Back to Top
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}