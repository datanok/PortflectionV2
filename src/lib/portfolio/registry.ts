// lib/portfolio/types.ts
export interface ComponentProps {
  [key: string]: any;
}

export interface StyleConfig {
  backgroundColor?: string;
  textColor?: string;
  paddingY?: string;
  paddingX?: string;
  textAlign?: "left" | "center" | "right";
  fontSize?: string;
  fontWeight?: string;
  borderRadius?: string;
  shadow?: string;
  primaryColor?: string;
  secondaryColor?: string;
}

export interface ComponentVariant {
  id: string;
  name: string;
  description: string;
  component: React.ComponentType<ComponentProps>;
  thumbnail: string; // URL or path to preview image
  defaultProps: ComponentProps;
  defaultStyles: StyleConfig;
  category: "layout" | "content" | "media" | "form";
  tags: string[];
  theme?: string; // Theme for consistent styling across sections
  isPopular?: boolean;
  isPremium?: boolean;
}

export interface ComponentSection {
  id: string;
  name: string;
  description: string;
  icon: string; // Lucide icon name
  variants: ComponentVariant[];
  allowMultiple?: boolean; // Can user add multiple instances
  isRequired?: boolean; // Must have at least one
}

export type SectionType =
  | "hero"
  | "about"
  | "skills"
  | "projects"
  | "experience"
  | "education"
  | "testimonials"
  | "contact"
  | "navbar"
  | "footer"
  | "custom";

// lib/portfolio/registry.ts

// Import component variants
import * as HeroComponents from "@/components/portfolio/sections/hero";
import * as AboutComponents from "@/components/portfolio/sections/about";
import * as ProjectsComponents from "@/components/portfolio/sections/projects";
import * as ContactComponents from "@/components/portfolio/sections/contact";
import * as SkillsComponents from "@/components/portfolio/sections/skills";
import * as NavbarComponents from "@/components/portfolio/sections/navbar";
import * as CustomComponents from "@/components/portfolio/sections/custom";
// Re-export components for easier access
export {
  HeroComponents,
  AboutComponents,
  ProjectsComponents,
  ContactComponents,
  SkillsComponents,
  NavbarComponents,
};

export const componentRegistry: Record<SectionType, ComponentSection> = {
  hero: {
    id: "hero",
    name: "Hero Section",
    description: "Eye-catching introduction at the top of your portfolio",
    icon: "Zap",
    isRequired: true,
    allowMultiple: false,
    variants: [
      {
        id: "hero-section",
        name: "Hero Section",
        description:
          "A stunning hero section with profile image, introduction text, CTA button, and social links",
        component: HeroComponents.HeroSection,
        thumbnail: "/thumbnails/hero-section.jpg",
        category: "layout",
        tags: ["hero", "landing", "profile", "introduction", "cta"],
        theme: "image",
        isPopular: true,
        defaultProps: {
          title: "John Doe",
          subtitle: "Full Stack Developer",
          description:
            "I craft beautiful, functional web experiences with modern technologies. Passionate about clean code, user experience, and continuous learning.",
          profileImage:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
          ctaText: "View My Work",
          ctaLink: "#projects",
          showSocialLinks: true,
          githubUrl: "https://github.com",
          linkedinUrl: "https://linkedin.com",
          emailUrl: "mailto:john@example.com",
          showScrollIndicator: true,
        },
        defaultStyles: {
          backgroundColor: "#ffffff",
          textColor: "#111827",
          primaryColor: "#3b82f6",
          secondaryColor: "#6b7280",
          paddingY: "64",
          paddingX: "16",
          textAlign: "center",
          fontSize: "xl",
          fontWeight: "bold",
          borderRadius: "0",
          shadow: "none",
        },
      },
      {
        id: "typography-hero",
        name: "Typography Hero Section",
        description:
          "Dramatic hero section with typing animation, code display, and developer-focused design perfect for portfolio landing pages",
        component: HeroComponents.TypographyHero,
        thumbnail: "/thumbnails/typography-hero.jpg",
        category: "content",
        tags: [
          "hero",
          "landing",
          "typography",
          "developer",
          "animation",
          "code",
        ],
        isPopular: true,
        defaultProps: {
          greeting: "HELLO_WORLD();",
          name: "JANE_DOE",
          title: "FULL_STACK_DEVELOPER",
          showStatus: true,
          statusText: "AVAILABLE_FOR_HIRE",
          showCodeSnippet: true,
          showScrollIndicator: true,
          typingTexts: [
            "FRONTEND_DEVELOPER",
            "BACKEND_ARCHITECT",
            "UI/UX_DESIGNER",
          ],
          description:
            "Passionate developer specializing in modern web technologies, user experience design, and scalable applications. Currently crafting the next generation of digital products.",
          buttons: [
            { label: "VIEW_WORK()", href: "#projects", isPrimary: true },
            {
              label: "DOWNLOAD_CV",
              href: "/resume.pdf",
              downloadFile: "resume.pdf",
            },
            { label: "CONTACT_ME", href: "#contact" },
          ],
        },
        defaultStyles: {
          backgroundColor: "#0f172a",
          textColor: "#e2e8f0",
          primaryColor: "#3b82f6",
          secondaryColor: "#64748b",
          paddingY: "80",
          paddingX: "16",
          textAlign: "left",
          fontSize: "xl",
          fontWeight: "bold",
          borderRadius: "0",
          shadow: "none",
        },
      },
    ],
  },
  about: {
    id: "about",
    name: "About Section",
    description: "Tell your story and background",
    icon: "User",
    isRequired: false,
    allowMultiple: false,
    variants: [
      {
        id: "about-typography",
        name: "Typography About",
        description:
          "Bold typography-focused about section with timeline and stats",
        component: AboutComponents.AboutTypography,
        thumbnail: "/thumbnails/about-typography.jpg",
        category: "content",
        tags: ["about", "typography", "bold", "timeline", "stats"],
        theme: "typography",
        isPopular: true,
        defaultProps: {
          title: "ABOUT",
          subtitle: "WHO I AM",
          bio: "I'm a passionate full-stack developer with a keen eye for design and a love for clean, efficient code. My journey in tech began over 8 years ago, and I've been fortunate to work with amazing teams building products that impact thousands of users daily.",
          location: "Mumbai, India",
          yearsExperience: "8+",
          currentRole: "Senior Developer",
          timelineItems: [
            {
              year: "2024",
              title: "Senior Full Stack Developer",
              company: "Tech Corp",
              description:
                "Leading development of scalable web applications using React, Node.js, and cloud technologies.",
              type: "work",
            },
            {
              year: "2022",
              title: "Full Stack Developer",
              company: "StartupXYZ",
              description:
                "Built entire product from ground up, implemented CI/CD pipelines and mentored junior developers.",
              type: "work",
            },
            {
              year: "2020",
              title: "Frontend Developer",
              company: "Digital Agency",
              description:
                "Created responsive web applications and collaborated with design teams on user experience.",
              type: "work",
            },
            {
              year: "2016",
              title: "Computer Science Degree",
              company: "University of Mumbai",
              description:
                "Graduated with honors, focused on software engineering and web technologies.",
              type: "education",
            },
          ],
          showStats: true,
          stats: [
            { number: "50+", label: "Projects", icon: "code" },
            { number: "8+", label: "Years", icon: "calendar" },
            { number: "15+", label: "Clients", icon: "users" },
            { number: "∞", label: "Coffee", icon: "coffee" },
          ],
          showTimeline: true,
          compactMode: false,
        },
        defaultStyles: {
          backgroundColor: "#ffffff",
          textColor: "#111827",
          primaryColor: "#000000",
          secondaryColor: "#6b7280",
          paddingY: "120",
          paddingX: "32",
          textAlign: "left",
          fontSize: "4xl",
          fontWeight: "black",
          borderRadius: "0",
          shadow: "none",
        },
      },
    ],
  },
  skills: {
    id: "skills",
    name: "Skills Section",
    description: "Showcase your technical skills",
    icon: "Code",
    isRequired: false,
    allowMultiple: false,
    variants: [
      {
        id: "skills-typography",
        name: "Typography Skills",
        description:
          "Minimal typography-focused skills section with optional proficiency bars",
        component: SkillsComponents.SkillsTypography,
        thumbnail: "/thumbnails/skills-typography.jpg",
        category: "content",
        tags: ["skills", "typography", "bold", "minimal", "proficiency"],
        theme: "typography",
        isPopular: true,
        defaultProps: {
          title: "SKILLS.EXE",
          subtitle: "TECHNICAL EXPERTISE",
          description:
            "A comprehensive breakdown of my technical arsenal and proficiency levels.",
          skills: [
            {
              name: "JavaScript",
              level: 95,
              category: "Frontend",
              yearsExperience: 5,
              status: "expert",
            },
            {
              name: "React",
              level: 90,
              category: "Frontend",
              yearsExperience: 4,
              status: "expert",
            },
            {
              name: "TypeScript",
              level: 85,
              category: "Frontend",
              yearsExperience: 3,
              status: "active",
            },
            {
              name: "Node.js",
              level: 80,
              category: "Backend",
              yearsExperience: 3,
              status: "active",
            },
            {
              name: "Python",
              level: 75,
              category: "Backend",
              yearsExperience: 2,
              status: "active",
            },
            {
              name: "Docker",
              level: 70,
              category: "DevOps",
              yearsExperience: 2,
              status: "learning",
            },
            {
              name: "AWS",
              level: 65,
              category: "Cloud",
              yearsExperience: 1,
              status: "learning",
            },
            {
              name: "MongoDB",
              level: 80,
              category: "Database",
              yearsExperience: 3,
              status: "active",
            },
          ],
          showProgressBars: true,
          showProficiency: true,
          showExperience: true,
          showStatus: true,
          categories: ["Frontend", "Backend", "DevOps", "Cloud", "Database"],
        },
        defaultStyles: {
          backgroundColor: "#ffffff",
          textColor: "#111827",
          primaryColor: "#3b82f6",
          secondaryColor: "#64748b",
          paddingY: "64",
          paddingX: "16",
          textAlign: "center",
          fontSize: "xl",
          fontWeight: "bold",
          borderRadius: "0",
          shadow: "none",
        },
      },
    ],
  },
  projects: {
    id: "projects",
    name: "Projects Section",
    description: "Highlight your best work",
    icon: "Folder",
    isRequired: false,
    allowMultiple: true,
    variants: [
      {
        id: "projects-typography",
        name: "Typography Projects",
        description:
          "Bold typography-focused projects section with expandable project details",
        component: ProjectsComponents.ProjectsTypography,
        thumbnail: "/thumbnails/projects-typography.jpg",
        category: "content",
        tags: ["projects", "typography", "bold", "expandable", "filters"],
        theme: "typography",
        isPopular: true,
        defaultProps: {
          title: "PROJECTS",
          subtitle: "SELECTED WORKS",
          description:
            "A collection of projects that showcase my expertise in modern web development, from concept to deployment.",
          projects: [
            {
              id: "01",
              title: "E-Commerce Platform",
              category: "Web Application",
              year: "2024",
              description:
                "Full-stack e-commerce solution with real-time inventory management",
              longDescription:
                "Built a comprehensive e-commerce platform using React, Node.js, and PostgreSQL. Features include real-time inventory tracking, payment processing, admin dashboard, and mobile-responsive design.",
              technologies: [
                "React",
                "Node.js",
                "PostgreSQL",
                "Stripe",
                "Redis",
              ],
              liveUrl: "https://example.com",
              githubUrl: "https://github.com",
              featured: true,
              status: "completed",
            },
            {
              id: "02",
              title: "Portfolio CMS",
              category: "Content Management",
              year: "2024",
              description:
                "Custom CMS for creative professionals with drag-and-drop interface",
              longDescription:
                "Developed a headless CMS specifically designed for creative professionals. Features include drag-and-drop page builder, asset management, and API-first architecture.",
              technologies: ["Next.js", "TypeScript", "Prisma", "AWS S3"],
              liveUrl: "https://example.com",
              githubUrl: "https://github.com",
              featured: true,
              status: "completed",
            },
            {
              id: "03",
              title: "Task Management App",
              category: "Mobile Application",
              year: "2023",
              description:
                "Cross-platform productivity app with team collaboration features",
              longDescription:
                "Created a cross-platform task management application with real-time collaboration, file sharing, and progress tracking capabilities.",
              technologies: ["React Native", "Firebase", "Redux", "Expo"],
              liveUrl: "https://example.com",
              githubUrl: "https://github.com",
              featured: false,
              status: "completed",
            },
            {
              id: "04",
              title: "Analytics Dashboard",
              category: "Data Visualization",
              year: "2023",
              description:
                "Real-time analytics dashboard with interactive data visualizations",
              longDescription:
                "Built an analytics dashboard for monitoring key business metrics with interactive charts, real-time updates, and customizable widgets.",
              technologies: ["Vue.js", "D3.js", "Python", "FastAPI", "MongoDB"],
              liveUrl: "https://example.com",
              githubUrl: "https://github.com",
              featured: false,
              status: "archived",
            },
          ],
          showFilters: true,
          showImages: false,
          layoutMode: "list",
          showProjectNumbers: true,
          showStatus: true,
          featuredFirst: true,
        },
        defaultStyles: {
          backgroundColor: "#ffffff",
          textColor: "#111827",
          primaryColor: "#000000",
          secondaryColor: "#6b7280",
          paddingY: "120",
          paddingX: "32",
          textAlign: "left",
          fontSize: "4xl",
          fontWeight: "black",
          borderRadius: "0",
          shadow: "none",
        },
      },
    ],
  },
  experience: {
    id: "experience",
    name: "Experience Section",
    description: "Share your professional experience",
    icon: "Briefcase",
    isRequired: false,
    allowMultiple: false,
    variants: [],
  },
  education: {
    id: "education",
    name: "Education Section",
    description: "Show your academic background",
    icon: "Book",
    isRequired: false,
    allowMultiple: false,
    variants: [],
  },
  testimonials: {
    id: "testimonials",
    name: "Testimonials Section",
    description: "Display client or peer testimonials",
    icon: "MessageCircle",
    isRequired: false,
    allowMultiple: false,
    variants: [],
  },
  contact: {
    id: "contact",
    name: "Contact Section",
    description: "Get in touch with visitors",
    icon: "Mail",
    isRequired: false,
    allowMultiple: false,
    variants: [
      {
        id: "contact-typography",
        name: "Typography Contact",
        description:
          "Minimal typography-focused contact section with essential contact methods and form",
        component: ContactComponents.ContactTypography,
        thumbnail: "/thumbnails/contact-typography.jpg",
        category: "form",
        tags: ["contact", "typography", "bold", "minimal", "form"],
        theme: "typography",
        isPopular: true,
        defaultProps: {
          title: "CONTACT",
          subtitle: "LET'S WORK TOGETHER",
          description:
            "I'm always interested in new opportunities and exciting projects. Whether you have a question or just want to say hi, feel free to reach out.",
          contactMethods: [
            {
              icon: "mail",
              label: "Email",
              value: "hello@johndoe.dev",
              link: "mailto:hello@johndoe.dev",
            },
            {
              icon: "phone",
              label: "Phone",
              value: "+91 98765 43210",
              link: "tel:+919876543210",
            },
            {
              icon: "mappin",
              label: "Location",
              value: "Mumbai, India",
              link: "https://maps.google.com/?q=Mumbai,India",
            },
          ],
          showContactForm: true,
          formTitle: "Send Message",
          formSubtitle: "Drop me a line",
        },
        defaultStyles: {
          backgroundColor: "#ffffff",
          textColor: "#111827",
          primaryColor: "#000000",
          secondaryColor: "#6b7280",
          paddingY: "120",
          paddingX: "32",
          textAlign: "left",
          fontSize: "4xl",
          fontWeight: "black",
          borderRadius: "0",
          shadow: "none",
        },
      },
    ],
  },
  navbar: {
    id: "navbar",
    name: "Navigation Bar",
    description: "Top navigation bar for your portfolio",
    icon: "Menu",
    isRequired: false,
    allowMultiple: false,
    variants: [
      {
        id: "typography-navbar",
        name: "Typography Navbar",
        description:
          "Developer-focused navigation with monospace typography, status indicators, and scroll effects",
        component: NavbarComponents.NavbarTypography,
        thumbnail: "/thumbnails/typography-navbar.jpg",
        category: "layout",
        tags: [
          "navbar",
          "navigation",
          "typography",
          "developer",
          "monospace",
          "fixed",
        ],
        isPopular: true,
        defaultProps: {
          logoText: "DEV.PORTFOLIO",
          showCTA: true,
          ctaText: "HIRE_ME()",
          showStatus: true,
          statusText: "AVAILABLE",
        },
        defaultStyles: {
          backgroundColor: "#ffffff",
          textColor: "#111827",
          primaryColor: "#3b82f6",
          secondaryColor: "#64748b",
          paddingY: "16",
          paddingX: "16",
          textAlign: "left",
          fontSize: "sm",
          fontWeight: "bold",
          borderRadius: "0",
          shadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
        },
      },
    ],
  },
  footer: {
    id: "footer",
    name: "Footer Section",
    description: "Footer for your portfolio",
    icon: "Layout",
    isRequired: false,
    allowMultiple: false,
    variants: [],
  },
  custom: {
    id: "custom",
    name: "Custom Section",
    description: "Add your own custom content",
    icon: "Code",
    isRequired: false,
    allowMultiple: true,
    variants: [
      {
        id: "typography-timeline",
        name: "Typography Timeline Section",
        description:
          "Versatile timeline component for experience, education, or mixed chronological content with developer-focused design",
        component: CustomComponents.TimelineTypography,
        thumbnail: "/thumbnails/typography-timeline.jpg",
        category: "content",
        tags: [
          "timeline",
          "experience",
          "education",
          "chronological",
          "typography",
          "developer",
        ],
        isPopular: true,
        defaultProps: {
          title: "EXPERIENCE.LOG",
          subtitle: "PROFESSIONAL JOURNEY",
          timelineType: "mixed",
          showTechnologies: true,
          showAchievements: true,
          showLocation: true,
          showType: true,
          sortOrder: "newest",
        },
        defaultStyles: {
          backgroundColor: "#ffffff",
          textColor: "#111827",
          primaryColor: "#3b82f6",
          secondaryColor: "#64748b",
          paddingY: "64",
          paddingX: "16",
          textAlign: "center",
          fontSize: "xl",
          fontWeight: "bold",
          borderRadius: "0",
          shadow: "none",
        },
      },
    ],
  },
};

// Helper functions
export const getComponentVariant = (
  sectionId: SectionType,
  variantId: string
) => {
  return componentRegistry[sectionId]?.variants.find((v) => v.id === variantId);
};

// Alias for backward compatibility
export const getComponent = getComponentVariant;

export const getPopularVariants = () => {
  const popular: ComponentVariant[] = [];
  Object.values(componentRegistry).forEach((section) => {
    section.variants.forEach((variant) => {
      if (variant.isPopular) popular.push(variant);
    });
  });
  return popular;
};

export const getVariantsByCategory = (
  category: ComponentVariant["category"]
) => {
  const variants: ComponentVariant[] = [];
  Object.values(componentRegistry).forEach((section) => {
    section.variants.forEach((variant) => {
      if (variant.category === category) variants.push(variant);
    });
  });
  return variants;
};

export const searchVariants = (query: string) => {
  const results: ComponentVariant[] = [];
  const searchTerm = query.toLowerCase();

  Object.values(componentRegistry).forEach((section) => {
    section.variants.forEach((variant) => {
      const matchesName = variant.name.toLowerCase().includes(searchTerm);
      const matchesDescription = variant.description
        .toLowerCase()
        .includes(searchTerm);
      const matchesTags = variant.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm)
      );

      if (matchesName || matchesDescription || matchesTags) {
        results.push(variant);
      }
    });
  });

  return results;
};
