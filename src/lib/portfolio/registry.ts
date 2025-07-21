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

// Import all component variants
import * as HeroComponents from "@/components/portfolio/sections/hero";
import * as AboutComponents from "@/components/portfolio/sections/about";
import * as SkillsComponents from "@/components/portfolio/sections/skills";
import * as ProjectsComponents from "@/components/portfolio/sections/projects";
import * as ExperienceComponents from "@/components/portfolio/sections/experience";
import * as EducationComponents from "@/components/portfolio/sections/education";
import * as TestimonialsComponents from "@/components/portfolio/sections/testimonials";
import * as ContactComponents from "@/components/portfolio/sections/contact";
import * as NavbarComponents from "@/components/portfolio/sections/navbar";
import * as FooterComponents from "@/components/portfolio/sections/footer";
import * as CustomComponents from "@/components/portfolio/sections/custom";

// Re-export all components for easier access
export {
  HeroComponents,
  AboutComponents,
  SkillsComponents,
  ProjectsComponents,
  ExperienceComponents,
  EducationComponents,
  TestimonialsComponents,
  ContactComponents,
  NavbarComponents,
  FooterComponents,
  CustomComponents,
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
        id: "hero-minimal",
        name: "Minimal",
        description: "Clean and simple hero with text only",
        component: HeroComponents.HeroMinimal,
        thumbnail: "/thumbnails/hero-minimal.jpg",
        category: "layout",
        tags: ["simple", "text", "minimal"],
        isPopular: true,
        defaultProps: {
          title: "Hi, I'm [Your Name]",
          subtitle: "[Your Professional Title]",
          ctaText: "Get In Touch",
          ctaLink: "#contact",
        },
        defaultStyles: {
          backgroundColor: "#ffffff",
          textColor: "#111827",
          paddingY: "32",
          textAlign: "center",
          fontSize: "xl",
          primaryColor: "#3b82f6",
          secondaryColor: "#64748b",
        },
      },
      {
        id: "hero-with-image",
        name: "With Image",
        description: "Hero section with profile image",
        component: HeroComponents.HeroWithImage,
        thumbnail: "/thumbnails/hero-with-image.jpg",
        category: "media",
        tags: ["image", "photo", "visual"],
        isPopular: true,
        defaultProps: {
          title: "Hi, I'm [Your Name]",
          subtitle: "[Your Professional Title]",
          imageUrl: "[Your Profile Image URL]",
          ctaText: "View My Work",
          ctaLink: "#projects",
        },
        defaultStyles: {
          backgroundColor: "#f9fafb",
          textColor: "#111827",
          paddingY: "24",
          textAlign: "center",
          primaryColor: "#3b82f6",
          secondaryColor: "#64748b",
        },
      },
      {
        id: "hero-split",
        name: "Split Layout",
        description: "Two-column hero with content and image",
        component: HeroComponents.HeroSplit,
        thumbnail: "/thumbnails/hero-split.jpg",
        category: "layout",
        tags: ["two-column", "layout", "image"],
        defaultProps: {
          title: "[Your Professional Title]",
          subtitle: "[Your Professional Summary]",
          imageUrl: "[Your Hero Image URL]",
          features: [
            "[Your Key Achievement 1]",
            "[Your Key Achievement 2]",
            "[Your Key Achievement 3]",
          ],
          ctaText: "Let's Work Together",
          ctaLink: "#contact",
        },
        defaultStyles: {
          backgroundColor: "#ffffff",
          textColor: "#111827",
          paddingY: "20",
          textAlign: "left",
          primaryColor: "#3b82f6",
          secondaryColor: "#64748b",
        },
      },
      {
        id: "hero-video",
        name: "Video Background",
        description: "Hero with video background",
        component: HeroComponents.HeroVideo,
        thumbnail: "/thumbnails/hero-video.jpg",
        category: "media",
        tags: ["video", "dynamic", "premium"],
        isPremium: true,
        defaultProps: {
          title: "Bringing Ideas to Life",
          subtitle: "Through innovative design and development",
          videoUrl: "https://player.vimeo.com/video/example",
          overlayOpacity: 0.5,
          ctaText: "Explore My Work",
        },
        defaultStyles: {
          textColor: "#ffffff",
          paddingY: "32",
          textAlign: "center",
        },
      },
    ],
  },

  about: {
    id: "about",
    name: "About Section",
    description: "Tell your story and background",
    icon: "User",
    allowMultiple: false,
    variants: [
      {
        id: "about-simple",
        name: "Simple Text",
        description: "Clean text-based about section",
        component: AboutComponents.AboutSimple,
        thumbnail: "/thumbnails/about-simple.jpg",
        category: "content",
        tags: ["text", "simple", "minimal"],
        isPopular: true,
        defaultProps: {
          heading: "About Me",
          bio: "I'm a passionate developer with over 5 years of experience creating digital solutions. I specialize in React, Next.js, and modern web technologies.",
          highlights: [
            "Full-Stack Development",
            "UI/UX Design",
            "Problem Solving",
          ],
        },
        defaultStyles: {
          backgroundColor: "#f9fafb",
          textColor: "#111827",
          paddingY: "16",
          textAlign: "left",
          primaryColor: "#3b82f6",
          secondaryColor: "#64748b",
        },
      },
      {
        id: "about-with-image",
        name: "With Profile Image",
        description: "About section with your photo",
        component: AboutComponents.AboutWithImage,
        thumbnail: "/thumbnails/about-with-image.jpg",
        category: "media",
        tags: ["image", "photo", "personal"],
        isPopular: true,
        defaultProps: {
          heading: "Get to Know Me",
          bio: "I'm a creative professional who loves turning complex problems into simple, beautiful designs. When I'm not coding, you'll find me exploring new technologies or hiking in nature.",
          imageUrl:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
          skills: ["JavaScript", "React", "Node.js", "Design"],
        },
        defaultStyles: {
          backgroundColor: "#ffffff",
          textColor: "#111827",
          paddingY: "20",
          textAlign: "left",
        },
      },
    ],
  },

  skills: {
    id: "skills",
    name: "Skills Section",
    description: "Showcase your technical abilities",
    icon: "Wrench",
    allowMultiple: false,
    variants: [
      {
        id: "skills-grid",
        name: "Skills Grid",
        description: "Grid layout with skill cards",
        component: SkillsComponents.SkillsGrid,
        thumbnail: "/thumbnails/skills-grid.jpg",
        category: "content",
        tags: ["grid", "cards", "visual"],
        isPopular: true,
        defaultProps: {
          heading: "My Skills",
          skillCategories: [
            {
              name: "Frontend",
              skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
            },
            {
              name: "Backend",
              skills: ["Node.js", "Prisma", "PostgreSQL", "API Design"],
            },
            {
              name: "Tools",
              skills: ["Git", "Docker", "Figma", "VS Code"],
            },
          ],
        },
        defaultStyles: {
          backgroundColor: "#ffffff",
          textColor: "#111827",
          paddingY: "16",
          textAlign: "center",
        },
      },
      {
        id: "skills-bars",
        name: "Progress Bars",
        description: "Skills with proficiency levels",
        component: SkillsComponents.SkillsBars,
        thumbnail: "/thumbnails/skills-bars.jpg",
        category: "content",
        tags: ["progress", "levels", "detailed"],
        defaultProps: {
          heading: "Technical Skills",
          skills: [
            { name: "React", level: 90 },
            { name: "TypeScript", level: 85 },
            { name: "Next.js", level: 88 },
            { name: "Node.js", level: 75 },
            { name: "PostgreSQL", level: 70 },
          ],
        },
        defaultStyles: {
          backgroundColor: "#f9fafb",
          textColor: "#111827",
          paddingY: "16",
          textAlign: "left",
        },
      },
    ],
  },

  projects: {
    id: "projects",
    name: "Projects Section",
    description: "Display your best work",
    icon: "FolderOpen",
    allowMultiple: true,
    variants: [
      {
        id: "projects-grid",
        name: "Project Grid",
        description: "Grid layout for project showcase",
        component: ProjectsComponents.ProjectsGrid,
        thumbnail: "/thumbnails/projects-grid.jpg",
        category: "content",
        tags: ["grid", "showcase", "portfolio"],
        isPopular: true,
        defaultProps: {
          heading: "Featured Projects",
          projects: [
            {
              id: "1",
              title: "E-commerce Platform",
              description:
                "Full-stack e-commerce solution with React and Node.js",
              image:
                "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
              technologies: ["React", "Node.js", "MongoDB"],
              liveUrl: "#",
              githubUrl: "#",
            },
            {
              id: "2",
              title: "Task Management App",
              description: "Collaborative project management tool",
              image:
                "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop",
              technologies: ["Next.js", "Prisma", "PostgreSQL"],
              liveUrl: "#",
              githubUrl: "#",
            },
          ],
        },
        defaultStyles: {
          backgroundColor: "#ffffff",
          textColor: "#111827",
          paddingY: "20",
          textAlign: "center",
        },
      },
    ],
  },

  experience: {
    id: "experience",
    name: "Experience Section",
    description: "Your work history and achievements",
    icon: "Briefcase",
    allowMultiple: false,
    variants: [
      {
        id: "experience-timeline",
        name: "Timeline Layout",
        description: "Chronological timeline of your career",
        component: ExperienceComponents.ExperienceTimeline,
        thumbnail: "/thumbnails/experience-timeline.jpg",
        category: "content",
        tags: ["timeline", "chronological", "career"],
        isPopular: true,
        defaultProps: {
          heading: "Work Experience",
          experiences: [
            {
              id: "1",
              role: "Senior Frontend Developer",
              company: "Tech Solutions Inc.",
              duration: "2022 - Present",
              description:
                "Lead frontend development for client projects using React and Next.js",
              achievements: [
                "Increased performance by 40%",
                "Led team of 3 developers",
              ],
            },
          ],
        },
        defaultStyles: {
          backgroundColor: "#f9fafb",
          textColor: "#111827",
          paddingY: "20",
          textAlign: "left",
        },
      },
    ],
  },

  education: {
    id: "education",
    name: "Education Section",
    description: "Academic background and certifications",
    icon: "GraduationCap",
    allowMultiple: false,
    variants: [
      {
        id: "education-cards",
        name: "Education Cards",
        description: "Card-based education display",
        component: EducationComponents.EducationCards,
        thumbnail: "/thumbnails/education-cards.jpg",
        category: "content",
        tags: ["cards", "academic", "certifications"],
        defaultProps: {
          heading: "Education & Certifications",
          education: [
            {
              id: "1",
              institution: "University of Technology",
              degree: "Bachelor of Computer Science",
              duration: "2018 - 2022",
              gpa: "3.8/4.0",
            },
          ],
        },
        defaultStyles: {
          backgroundColor: "#ffffff",
          textColor: "#111827",
          paddingY: "16",
          textAlign: "center",
        },
      },
    ],
  },

  testimonials: {
    id: "testimonials",
    name: "Testimonials Section",
    description: "Client feedback and recommendations",
    icon: "MessageSquare",
    allowMultiple: false,
    variants: [
      {
        id: "testimonials-carousel",
        name: "Testimonial Carousel",
        description: "Sliding testimonials with client photos",
        component: TestimonialsComponents.TestimonialsCarousel,
        thumbnail: "/thumbnails/testimonials-carousel.jpg",
        category: "content",
        tags: ["carousel", "slider", "reviews"],
        isPopular: true,
        defaultProps: {
          heading: "What Clients Say",
          testimonials: [
            {
              id: "1",
              quote:
                "Exceptional work and great communication throughout the project.",
              author: "Jane Smith",
              role: "CEO, StartupCo",
              avatar:
                "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
            },
          ],
        },
        defaultStyles: {
          backgroundColor: "#f0f9ff",
          textColor: "#111827",
          paddingY: "20",
          textAlign: "center",
        },
      },
    ],
  },

  contact: {
    id: "contact",
    name: "Contact Section",
    description: "Ways for people to reach you",
    icon: "Mail",
    allowMultiple: false,
    variants: [
      {
        id: "contact-form",
        name: "Contact Form",
        description: "Interactive form for inquiries",
        component: ContactComponents.ContactForm,
        thumbnail: "/thumbnails/contact-form.jpg",
        category: "form",
        tags: ["form", "interactive", "inquiries"],
        isPopular: true,
        defaultProps: {
          heading: "Let's Work Together",
          subtitle: "Have a project in mind? I'd love to hear about it.",
          email: "hello@example.com",
          formFields: ["name", "email", "message"],
        },
        defaultStyles: {
          backgroundColor: "#111827",
          textColor: "#ffffff",
          paddingY: "24",
          textAlign: "center",
        },
      },
      {
        id: "contact-form",
        name: "Contact Form",
        description: "Interactive contact form with email submission",
        component: ContactComponents.ContactForm,
        thumbnail: "/thumbnails/contact-form.jpg",
        category: "form",
        tags: ["form", "interactive", "contact"],
        defaultProps: {
          email: "hello@example.com",
          showPhone: true,
          showSocialLinks: true,
        },
        defaultStyles: {
          backgroundColor: "#ffffff",
          textColor: "#111827",
          paddingY: "16",
          paddingX: "4",
          textAlign: "left",
        },
      },
    ],
  },

  custom: {
    id: "custom",
    name: "Custom Elements",
    description: "Additional components for customization",
    icon: "Plus",
    allowMultiple: true,
    variants: [
      {
        id: "text-block",
        name: "Text Block",
        description: "Custom text content block",
        component: CustomComponents.TextBlock,
        thumbnail: "/thumbnails/text-block.jpg",
        category: "content",
        tags: ["text", "custom", "flexible"],
        defaultProps: {
          content:
            "Add your custom text content here. This block supports rich formatting.",
          alignment: "left",
        },
        defaultStyles: {
          backgroundColor: "#ffffff",
          textColor: "#111827",
          paddingY: "8",
          textAlign: "left",
        },
      },
      {
        id: "image-gallery",
        name: "Image Gallery",
        description: "Photo gallery or image showcase",
        component: CustomComponents.ImageGallery,
        thumbnail: "/thumbnails/image-gallery.jpg",
        category: "media",
        tags: ["images", "gallery", "showcase"],
        defaultProps: {
          heading: "Gallery",
          images: [
            {
              id: "1",
              url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop",
              alt: "Image 1",
            },
          ],
          columns: 3,
        },
        defaultStyles: {
          backgroundColor: "#ffffff",
          textColor: "#111827",
          paddingY: "16",
          textAlign: "center",
        },
      },
      {
        id: "spacer",
        name: "Spacer",
        description: "Add custom spacing between sections",
        component: CustomComponents.Spacer,
        thumbnail: "/thumbnails/spacer.jpg",
        category: "layout",
        tags: ["spacing", "layout", "utility"],
        defaultProps: {
          height: 60,
        },
        defaultStyles: {
          backgroundColor: "transparent",
        },
      },
    ],
  },

  navbar: {
    id: "navbar",
    name: "Navigation Bar",
    description: "Site navigation and branding",
    icon: "Navigation",
    allowMultiple: false,
    variants: [
      {
        id: "navbar-simple",
        name: "Simple",
        description: "Clean and minimal navigation bar",
        component: NavbarComponents.NavbarSimple,
        thumbnail: "/thumbnails/navbar-simple.jpg",
        category: "layout",
        tags: ["navigation", "simple", "minimal"],
        isPopular: true,
        defaultProps: {
          brandName: "Portfolio",
          showMobileMenu: true,
          sticky: true,
        },
        defaultStyles: {
          backgroundColor: "#ffffff",
          textColor: "#111827",
          primaryColor: "#3b82f6",
        },
      },
      {
        id: "navbar-with-logo",
        name: "With Logo",
        description: "Navigation with logo and contact info",
        component: NavbarComponents.NavbarWithLogo,
        thumbnail: "/thumbnails/navbar-with-logo.jpg",
        category: "layout",
        tags: ["navigation", "logo", "contact"],
        defaultProps: {
          brandName: "Portfolio",
          tagline: "Professional Portfolio",
          contactInfo: {
            email: "hello@example.com",
            phone: "+1 (555) 123-4567",
          },
          showContactInfo: true,
          sticky: true,
        },
        defaultStyles: {
          backgroundColor: "#ffffff",
          textColor: "#111827",
          primaryColor: "#3b82f6",
        },
      },
      {
        id: "navbar-transparent",
        name: "Transparent",
        description: "Transparent navbar with scroll effect",
        component: NavbarComponents.NavbarTransparent,
        thumbnail: "/thumbnails/navbar-transparent.jpg",
        category: "layout",
        tags: ["navigation", "transparent", "scroll"],
        defaultProps: {
          brandName: "Portfolio",
          showBackgroundOnScroll: true,
          sticky: true,
        },
        defaultStyles: {
          textColor: "#ffffff",
          primaryColor: "#3b82f6",
        },
      },
    ],
  },

  footer: {
    id: "footer",
    name: "Footer",
    description: "Site footer with branding and links",
    icon: "Footer",
    allowMultiple: false,
    variants: [
      {
        id: "footer-simple",
        name: "Simple",
        description: "Clean footer with copyright and branding",
        component: FooterComponents.FooterSimple,
        thumbnail: "/thumbnails/footer-simple.jpg",
        category: "layout",
        tags: ["footer", "simple", "copyright"],
        isPopular: true,
        defaultProps: {
          brandName: "Portfolio",
          showMadeWith: true,
        },
        defaultStyles: {
          backgroundColor: "#f8fafc",
          textColor: "#64748b",
          primaryColor: "#3b82f6",
        },
      },
      {
        id: "footer-with-links",
        name: "With Links",
        description: "Footer with navigation links",
        component: FooterComponents.FooterWithLinks,
        thumbnail: "/thumbnails/footer-with-links.jpg",
        category: "layout",
        tags: ["footer", "links", "navigation"],
        defaultProps: {
          brandName: "Portfolio",
          links: [
            { label: "Privacy Policy", href: "/privacy" },
            { label: "Terms of Service", href: "/terms" },
            { label: "Contact", href: "/contact" },
          ],
          showMadeWith: true,
        },
        defaultStyles: {
          backgroundColor: "#f8fafc",
          textColor: "#64748b",
          primaryColor: "#3b82f6",
        },
      },
      {
        id: "footer-with-social",
        name: "With Social",
        description: "Footer with social media links",
        component: FooterComponents.FooterWithSocial,
        thumbnail: "/thumbnails/footer-with-social.jpg",
        category: "layout",
        tags: ["footer", "social", "media"],
        defaultProps: {
          brandName: "Portfolio",
          socialLinks: [
            { platform: "GitHub", url: "https://github.com", icon: "Github" },
            {
              platform: "Twitter",
              url: "https://twitter.com",
              icon: "Twitter",
            },
            {
              platform: "LinkedIn",
              url: "https://linkedin.com",
              icon: "Linkedin",
            },
            {
              platform: "Email",
              url: "mailto:hello@example.com",
              icon: "Mail",
            },
          ],
          showMadeWith: true,
        },
        defaultStyles: {
          backgroundColor: "#f8fafc",
          textColor: "#64748b",
          primaryColor: "#3b82f6",
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
