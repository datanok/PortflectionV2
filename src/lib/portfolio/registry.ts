// lib/portfolio/types.ts
export interface ComponentProps {
  [key: string]: any;
}

// New interface for field metadata to support dropdowns and other field types
export interface FieldMetadata {
  type: "text" | "textarea" | "boolean" | "array" | "object" | "select";
  options?: Array<{ value: string; label: string }>; // For select/dropdown fields
  label?: string; // Human-readable label
  description?: string; // Field description
  placeholder?: string; // Placeholder text
}

export interface ComponentPropsSchema {
  [key: string]: FieldMetadata;
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
  propsSchema?: ComponentPropsSchema; // New field for field metadata
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
import * as FooterComponents from "@/components/portfolio/sections/footer";
import * as CustomComponents from "@/components/portfolio/sections/custom";
// Re-export components for easier access
export {
  HeroComponents,
  AboutComponents,
  ProjectsComponents,
  ContactComponents,
  SkillsComponents,
  NavbarComponents,
  FooterComponents,
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
          title: "TANMAY PATIL",
          subtitle: "Software Development Engineer (Full-Stack)",
          description:
            "Software Engineer with over 3 years of experience building high-performance, scalable web applications for enterprise platforms serving millions of users. Proficient across the modern JavaScript ecosystem, I specialize in delivering robust end-to-end features using TypeScript, React.js, and Node.js.",
          profileImage:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
          ctaText: "View My Work",
          ctaLink: "#projects",
          showSocialLinks: true,
          socialLinks: [
            {
              platform: "GitHub",
              url: "https://github.com/datanok",
              username: "@datanok",
            },
            {
              platform: "LinkedIn",
              url: "https://linkedin.com/in/tanmaypatil25",
              username: "@tanmaypatil25",
            },
            {
              platform: "Email",
              url: "mailto:tanmaypatiltp25@gmail.com",
              username: "tanmaypatiltp25@gmail.com",
            },
          ],
        },
        propsSchema: {
          title: {
            type: "text",
            label: "Name",
            description: "Your full name",
            placeholder: "Enter your name...",
          },
          subtitle: {
            type: "text",
            label: "Job Title",
            description: "Your professional title or role",
            placeholder: "e.g., Full Stack Developer",
          },
          description: {
            type: "textarea",
            label: "Description",
            description: "A brief introduction about yourself",
            placeholder: "Tell visitors about yourself...",
          },
          profileImage: {
            type: "text",
            label: "Profile Image URL",
            description: "URL to your profile picture",
            placeholder: "https://example.com/image.jpg",
          },
          ctaText: {
            type: "text",
            label: "CTA Button Text",
            description: "Text for the call-to-action button",
            placeholder: "e.g., View My Work",
          },
          ctaLink: {
            type: "text",
            label: "CTA Button Link",
            description: "Where the CTA button should link to",
            placeholder: "#projects",
          },
          showSocialLinks: {
            type: "boolean",
            label: "Show Social Links",
            description: "Display social media links",
          },
          socialLinks: {
            type: "array",
            label: "Social Links",
            description: "Social media links to display",
          },
        },
        defaultStyles: {
          backgroundColor: "#ffffff",
          textColor: "#000",
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
        thumbnail:
          "https://res.cloudinary.com/portflection/image/upload/v1755714165/Portflection%20Assets/TypograpgyHero_qtsdtr.png",
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
          name: "TANMAY_PATIL",
          title: "SOFTWARE_DEVELOPMENT_ENGINEER",
          profileImage: "",
          showProfileImage: false,
          visualDisplay: "code",
          showStatus: true,
          statusText: "AVAILABLE_FOR_HIRE",
          showCodeSnippet: true,
          tagline:
            "Building digital experiences with clean code & creative solutions",
          typingTexts: [
            "FULL_STACK_DEVELOPER",
            "REACT_DEVELOPER",
            "NODE_JS_DEVELOPER",
          ],
          description:
            "Software Engineer with over 3 years of experience building high-performance, scalable web applications for enterprise platforms serving millions of users. Proficient across the modern JavaScript ecosystem, I specialize in delivering robust end-to-end features using TypeScript, React.js, and Node.js.",
          buttons: [
            { label: "VIEW_WORK()", href: "#projects", isPrimary: true },
            {
              label: "DOWNLOAD_CV",
              href: "/resume.pdf",
              downloadFile: "resume.pdf",
            },
            { label: "CONTACT_ME", href: "#contact" },
          ],
          socialLinks: [
            {
              platform: "GitHub",
              url: "https://github.com/datanok",
              username: "@datanok",
            },
            {
              platform: "LinkedIn",
              url: "https://linkedin.com/in/tanmaypatil25",
              username: "@tanmaypatil25",
            },
            {
              platform: "Email",
              url: "mailto:tanmaypatiltp25@gmail.com",
              username: "tanmaypatiltp25@gmail.com",
            },
          ],
        },
        propsSchema: {
          greeting: {
            type: "text",
            label: "Greeting",
            description: "The greeting text displayed at the top",
            placeholder: "Enter greeting text...",
          },
          showProfileImage: {
            type: "boolean",
            label: "Show Profile Image",
            description: "Display the profile image",
          },
          profileImage: {
            type: "text",
            label: "Profile Image",
            description: "The image to display in the hero section",
            placeholder: "Enter your profile image URL...",
          },
          visualDisplay: {
            type: "select",
            label: "Visual Display",
            description:
              "Choose the visual element to display in the hero section",
            options: [
              { value: "code", label: "Code Snippet" },
              { value: "profile", label: "Profile Image" },
              { value: "geometric", label: "Geometric Animation" },
              { value: "minimal", label: "Minimal Design" },
              { value: "none", label: "None" },
            ],
          },
          name: {
            type: "text",
            label: "Name",
            description: "Your name or display name",
            placeholder: "Enter your name...",
          },
          title: {
            type: "text",
            label: "Title",
            description: "Your professional title or role",
            placeholder: "Enter your title...",
          },
          tagline: {
            type: "text",
            label: "Tagline",
            description: "A short tagline to describe yourself",
            placeholder: "Enter your tagline...",
          },

          showStatus: {
            type: "boolean",
            label: "Show Status",
            description: "Display the status indicator",
          },
          statusText: {
            type: "text",
            label: "Status Text",
            description: "The status text to display",
            placeholder: "Enter status text...",
          },
          showCodeSnippet: {
            type: "boolean",
            label: "Show Code Snippet",
            description: "Display the code snippet section",
          },

          typingTexts: {
            type: "array",
            label: "Typing Texts",
            description: "Texts to cycle through in the typing animation",
          },
          description: {
            type: "textarea",
            label: "Description",
            description: "Your professional description or bio",
            placeholder: "Enter your description...",
          },
          buttons: {
            type: "array",
            label: "Action Buttons",
            description: "Buttons displayed in the hero section",
          },
          socialLinks: {
            type: "array",
            label: "Social Links",
            description: "Social media links to display",
          },
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
          bio: "Software Engineer with over 3 years of experience building high-performance, scalable web applications for enterprise platforms serving millions of users. Proficient across the modern JavaScript ecosystem, I specialize in delivering robust end-to-end features using TypeScript, React.js, and Node.js. My expertise spans frontend architecture, backend API development, performance optimization, and security enhancements within fast-paced Agile/CI/CD environments.",
          location: "Mumbai, Maharashtra",
          yearsExperience: "3+",
          currentRole: "Software Development Engineer (Full-Stack)",
          timelineItems: [
            {
              year: "2022",
              title: "Software Development Engineer (Full-Stack)",
              company: "Jio Platforms Limited",
              description:
                "Built and maintained 50%+ of core user-facing features using React.js and Redux-Saga, enabling thousands of daily transactions for nationwide retail partners.",
              type: "work",
            },
            {
              year: "2019",
              title: "B.E. in Computer Engineering",
              company: "Pillai HOC College of Engineering and Technology",
              description:
                "Graduated with focus on software engineering and web technologies.",
              type: "education",
            },
          ],
          showStats: true,
          stats: [
            { number: "3+", label: "Years Experience", icon: "calendar" },
            { number: "50%+", label: "Core Features", icon: "code" },
            { number: "95%", label: "Security Improvement", icon: "shield" },
            { number: "30%", label: "Performance Boost", icon: "zap" },
          ],
          showTimeline: true,
          compactMode: false,
        },
        propsSchema: {
          title: {
            type: "text",
            label: "Section Title",
            description: "The main title for the about section",
            placeholder: "Enter section title...",
          },
          subtitle: {
            type: "text",
            label: "Section Subtitle",
            description: "The subtitle displayed below the main title",
            placeholder: "Enter subtitle...",
          },
          bio: {
            type: "textarea",
            label: "Biography",
            description: "Your personal story and background",
            placeholder: "Tell your story...",
          },
          location: {
            type: "text",
            label: "Location",
            description: "Your current location",
            placeholder: "City, Country",
          },
          yearsExperience: {
            type: "text",
            label: "Years of Experience",
            description: "Your years of professional experience",
            placeholder: "e.g., 5+",
          },
          currentRole: {
            type: "text",
            label: "Current Role",
            description: "Your current job title or role",
            placeholder: "e.g., Senior Developer",
          },
          showStats: {
            type: "boolean",
            label: "Show Statistics",
            description: "Display the statistics section",
          },
          showTimeline: {
            type: "boolean",
            label: "Show Timeline",
            description: "Display the timeline section",
          },
          compactMode: {
            type: "select",
            label: "Layout Mode",
            description: "Choose the layout style for the section",
            options: [
              { value: "false", label: "Full Layout" },
              { value: "true", label: "Compact Layout" },
            ],
          },
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
            "A comprehensive breakdown of my technical arsenal and proficiency levels across the modern JavaScript ecosystem.",
          skills: [
            {
              name: "React.js",
              level: 95,
              category: "Frontend",
              yearsExperience: 3,
              status: "expert",
            },
            {
              name: "Next.js",
              level: 90,
              category: "Frontend",
              yearsExperience: 3,
              status: "expert",
            },
            {
              name: "TypeScript",
              level: 90,
              category: "Frontend",
              yearsExperience: 3,
              status: "expert",
            },
            {
              name: "JavaScript (ES6+)",
              level: 95,
              category: "Frontend",
              yearsExperience: 3,
              status: "expert",
            },
            {
              name: "Redux",
              level: 85,
              category: "Frontend",
              yearsExperience: 3,
              status: "active",
            },
            {
              name: "Redux-Saga",
              level: 85,
              category: "Frontend",
              yearsExperience: 3,
              status: "active",
            },
            {
              name: "Node.js",
              level: 85,
              category: "Backend",
              yearsExperience: 3,
              status: "active",
            },
            {
              name: "Express.js",
              level: 80,
              category: "Backend",
              yearsExperience: 3,
              status: "active",
            },
            {
              name: "Prisma ORM",
              level: 80,
              category: "Backend",
              yearsExperience: 2,
              status: "active",
            },
            {
              name: "MongoDB",
              level: 75,
              category: "Database",
              yearsExperience: 2,
              status: "active",
            },
            {
              name: "SQL",
              level: 75,
              category: "Database",
              yearsExperience: 2,
              status: "active",
            },
            {
              name: "Firebase",
              level: 70,
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
              name: "Jenkins",
              level: 65,
              category: "DevOps",
              yearsExperience: 2,
              status: "learning",
            },
            {
              name: "CI/CD",
              level: 75,
              category: "DevOps",
              yearsExperience: 2,
              status: "active",
            },
            {
              name: "Vercel",
              level: 80,
              category: "DevOps",
              yearsExperience: 2,
              status: "active",
            },
            {
              name: "Netlify",
              level: 75,
              category: "DevOps",
              yearsExperience: 2,
              status: "active",
            },
            {
              name: "Git",
              level: 90,
              category: "DevOps",
              yearsExperience: 3,
              status: "expert",
            },
            {
              name: "GitHub",
              level: 90,
              category: "DevOps",
              yearsExperience: 3,
              status: "expert",
            },
            {
              name: "Agile",
              level: 85,
              category: "Methodology",
              yearsExperience: 3,
              status: "active",
            },
            {
              name: "Scrum",
              level: 80,
              category: "Methodology",
              yearsExperience: 3,
              status: "active",
            },
            {
              name: "JWT",
              level: 85,
              category: "Security",
              yearsExperience: 3,
              status: "active",
            },
            {
              name: "OAuth 2.0",
              level: 80,
              category: "Security",
              yearsExperience: 2,
              status: "active",
            },
            {
              name: "SSR",
              level: 85,
              category: "Frontend",
              yearsExperience: 2,
              status: "active",
            },
            {
              name: "SSG",
              level: 80,
              category: "Frontend",
              yearsExperience: 2,
              status: "active",
            },
          ],
          showProgressBars: true,
          showProficiency: true,
          showExperience: true,
          showStatus: true,
          categories: [
            "Frontend",
            "Backend",
            "Database",
            "DevOps",
            "Security",
            "Methodology",
          ],
        },
        propsSchema: {
          title: {
            type: "text",
            label: "Section Title",
            description: "The main title for the skills section",
            placeholder: "Enter section title...",
          },
          subtitle: {
            type: "text",
            label: "Section Subtitle",
            description: "The subtitle displayed below the main title",
            placeholder: "Enter subtitle...",
          },
          description: {
            type: "textarea",
            label: "Description",
            description: "Brief description of your skills and expertise",
            placeholder: "Describe your technical expertise...",
          },
          showProgressBars: {
            type: "boolean",
            label: "Show Progress Bars",
            description: "Display visual progress bars for skill levels",
          },
          showProficiency: {
            type: "boolean",
            label: "Show Proficiency",
            description: "Display proficiency indicators",
          },
          showExperience: {
            type: "boolean",
            label: "Show Experience",
            description: "Display years of experience for each skill",
          },
          showStatus: {
            type: "select",
            label: "Status Display",
            description: "Choose how to display skill status",
            options: [
              { value: "true", label: "Show Status" },
              { value: "false", label: "Hide Status" },
            ],
          },
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
              title: "Portflection – Full-Stack Portfolio Builder",
              category: "Web Application",
              year: "2024",
              description:
                "Multi-tenant platform allowing users to create and deploy SEO-optimized portfolios without coding",
              longDescription:
                "Developed a multi-tenant platform allowing users to create and deploy SEO-optimized portfolios without coding. Implemented Google/GitHub OAuth 2.0, JWT-based sessions, and schema validation (Zod + React Hook Form). Used Next.js SSR + SSG to achieve Lighthouse performance/accessibility/SEO scores above 95%.",
              technologies: [
                "Next.js",
                "TypeScript",
                "Prisma",
                "MongoDB",
                "Tailwind CSS",
                "OAuth 2.0",
                "JWT",
                "Zod",
                "React Hook Form",
              ],
              liveUrl: "https://portflection.com",
              githubUrl: "https://github.com/datanok/portflection-v2",
              featured: true,
              status: "completed",
            },
            {
              id: "02",
              title: "B2B E-commerce Platform",
              category: "Enterprise Application",
              year: "2022-2024",
              description:
                "Built and maintained 50%+ of core user-facing features using React.js and Redux-Saga",
              longDescription:
                "Built and maintained 50%+ of core user-facing features using React.js and Redux-Saga, enabling thousands of daily transactions for nationwide retail partners. Implemented JWT-based authentication with single-device login, reducing unauthorized access incidents by 95%.",
              technologies: [
                "React.js",
                "Redux-Saga",
                "JWT",
                "REST APIs",
                "Node.js",
                "Express.js",
              ],
              liveUrl: "https://jio.com",
              githubUrl: "https://github.com/datanok",
              featured: true,
              status: "completed",
            },
            {
              id: "03",
              title: "SIM Inventory Management System",
              category: "Enterprise Application",
              year: "2023",
              description:
                "React.js-based digital logbook replacing manual tracking for 20+ machines",
              longDescription:
                "Designed React.js-based digital logbook replacing manual tracking for 20+ machines, processing 20M+ SIM kits annually, reducing data entry time by 40%. Delivered real-time dashboards improving visibility and reducing operator onboarding time by 25%.",
              technologies: [
                "React.js",
                "Node.js",
                "Real-time Dashboards",
                "Inventory Management",
                "Data Processing",
              ],
              liveUrl: "https://jio.com",
              githubUrl: "https://github.com/datanok",
              featured: false,
              status: "completed",
            },
            {
              id: "04",
              title: "Refund Approval System",
              category: "Enterprise Application",
              year: "2023",
              description:
                "Developed Refund Approval System and Etoptup Reprocess module",
              longDescription:
                "Developed Refund Approval System and Etoptup Reprocess module, improving operational efficiency by 15% and cutting reconciliation errors by 1,000+ cases/month.",
              technologies: [
                "React.js",
                "Node.js",
                "Business Logic",
                "Process Automation",
                "Error Handling",
              ],
              liveUrl: "https://jio.com",
              githubUrl: "https://github.com/datanok",
              featured: false,
              status: "completed",
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
              value: "tanmaypatiltp25@gmail.com",
              link: "mailto:tanmaypatiltp25@gmail.com",
            },
            {
              icon: "phone",
              label: "Phone",
              value: "+91-8779557510",
              link: "tel:+918779557510",
            },
            {
              icon: "mappin",
              label: "Location",
              value: "Mumbai, Maharashtra",
              link: "https://maps.google.com/?q=Mumbai,Maharashtra",
            },
            {
              icon: "linkedin",
              label: "LinkedIn",
              value: "linkedin.com/in/tanmaypatil25",
              link: "https://linkedin.com/in/tanmaypatil25",
            },
            {
              icon: "github",
              label: "GitHub",
              value: "github.com/datanok",
              link: "https://github.com/datanok",
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
    variants: [
      {
        id: "footer-typography",
        name: "Typography Footer",
        description:
          "Minimal typography-focused footer with social links and quick links",
        component: FooterComponents.TypographyFooter,
        thumbnail: "/thumbnails/footer-typography.jpg",
        category: "layout",
        tags: ["footer", "typography", "social", "quick links"],
        theme: "typography",
        isPopular: true,
        defaultProps: {
          title: "LET'S_CONNECT()",
          copyrightText: "© 2024 All rights reserved.",
          socialLinks: [
            {
              platform: "GitHub",
              url: "https://github.com",
              username: "@janedoe",
            },
            {
              platform: "LinkedIn",
              url: "https://linkedin.com",
              username: "/in/janedoe",
            },
            {
              platform: "Twitter",
              url: "https://twitter.com",
              username: "@janedoe",
            },
            {
              platform: "Email",
              url: "mailto:hello@example.com",
              username: "hello@example.com",
            },
          ],
          contactInfo: {
            email: "hello@example.com",
            location: "Mumbai, India",
            website: "https://example.com",
          },
          showSocialLinks: true,
          showContactInfo: true,
          showCopyright: true,
          showMadeWith: true,
          madeWithText: "Made with",
        },
        propsSchema: {
          title: {
            type: "text",
            label: "Footer Title",
            description: "The main title for the footer section",
            placeholder: "Enter footer title...",
          },
          copyrightText: {
            type: "text",
            label: "Copyright Text",
            description: "Copyright notice text",
            placeholder: "© 2024 All rights reserved.",
          },
          showSocialLinks: {
            type: "boolean",
            label: "Show Social Links",
            description: "Display social media links",
          },
          showContactInfo: {
            type: "boolean",
            label: "Show Contact Info",
            description: "Display contact information",
          },
          showCopyright: {
            type: "boolean",
            label: "Show Copyright",
            description: "Display copyright notice",
          },
          showMadeWith: {
            type: "boolean",
            label: "Show Made With",
            description: "Display 'Made with love & precision' text",
          },
          madeWithText: {
            type: "text",
            label: "Made With Text",
            description: "Text before the 'Made with love & precision' section",
            placeholder: "Made with",
          },
        },
        defaultStyles: {
          backgroundColor: "#0a0a0a",
          textColor: "#e5e5e5",
          primaryColor: "#3b82f6",
          secondaryColor: "#71717a",
          paddingY: "64",
          paddingX: "24",
          textAlign: "left",
          fontSize: "1rem",
          fontWeight: "400",
          borderRadius: "0",
          shadow: "none",
        },
      },
    ],
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
          timelineType: "experience",
          sortOrder: "newest",
          showTechnologies: true,
          showAchievements: true,
          showLocation: true,
          showType: true,
        },
        propsSchema: {
          title: {
            type: "text",
            label: "Section Title",
            description: "The main title for the timeline section",
            placeholder: "Enter section title...",
          },
          subtitle: {
            type: "text",
            label: "Section Subtitle",
            description: "The subtitle displayed below the main title",
            placeholder: "Enter subtitle...",
          },
          timelineType: {
            type: "select",
            label: "Timeline Type",
            description: "Choose the timeline type",
            options: [
              { value: "experience", label: "Experience" },
              { value: "education", label: "Education" },
              { value: "mixed", label: "Mixed" },
            ],
            placeholder: "Select timeline type",
          },
          sortOrder: {
            type: "select",
            label: "Sort Order",
            description: "Choose the sort order",
            options: [
              { value: "newest", label: "Newest First" },
              { value: "oldest", label: "Oldest First" },
            ],
            placeholder: "Select sort order",
          },
          showTechnologies: {
            type: "boolean",
            label: "Show Technologies",
            description: "Display technologies for each timeline item",
          },
          showAchievements: {
            type: "boolean",
            label: "Show Achievements",
            description: "Display achievements for each timeline item",
          },
          showLocation: {
            type: "boolean",
            label: "Show Location",
            description: "Display location for each timeline item",
          },
          showType: {
            type: "boolean",
            label: "Show Type",
            description: "Display type indicators for timeline items",
          },
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
