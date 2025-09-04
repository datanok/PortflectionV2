// lib/portfolio/types.ts
export interface ComponentProps {
  [key: string]: any;
}

export interface FieldMetadata {
  type:
    | "text"
    | "textarea"
    | "boolean"
    | "array"
    | "object"
    | "select"
    | "number";
  options?: Array<{ value: string; label: string }>; // For select/dropdown fields
  label?: string; // Human-readable label
  description?: string; // Field description
  placeholder?: string; // Placeholder text
  min?: number;
  max?: number;
  itemSchema?: ComponentPropsSchema; // For array fields - defines structure of array items
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
  fontFamily?: string;
  borderColor?: string;
  fontWeight?: string;
  borderRadius?: string;
  shadow?: string;
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  borderWidth?: string;
  shadowColor?: string;
  shadowOffset?: string;
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
  customization?: any;
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
      {
        id: "neo-brutalist-hero",
        name: "Neo Brutalist Hero",
        description:
          "A bold brutalist hero section with polygon-masked visuals, animated buttons, and scroll indicator",
        component: HeroComponents.NeoBrutalistHero,
        thumbnail: "/thumbnails/neo-brutalist-hero.jpg",
        category: "layout",
        tags: [
          "hero",
          "brutalist",
          "bold",
          "polygon",
          "scroll",
          "interactive",
          "creative",
        ],
        isPopular: true,
        defaultProps: {
          title: "CREATIVE DEVELOPER & DESIGNER",
          subtitle: "BUILDING THE FUTURE",
          description:
            "I create bold, innovative digital experiences that push boundaries and challenge conventions. Let's build something extraordinary together.",
          buttons: [
            {
              text: "VIEW MY WORK",
              href: "#work",
              variant: "primary",
            },
            {
              text: "DOWNLOAD CV",
              href: "#",
              variant: "secondary",
            },
          ],
          showScrollIndicator: true,
          scrollTarget: "#about",
          profileImage: "https://placehold.co/100x100/fecaca/000000?text=PFP",
          heroImage:
            "https://placehold.co/1000x800/d9f991/000000?text=Hero+Image",
          showBadge: true,
          badgeText: "AVAILABLE FOR HIRE",
          badgeIcon: "Star",
          imageShape: "hexagon",
          imageSize: "large",
        },
        propsSchema: {
          title: {
            type: "text",
            label: "Title",
            description: "Main hero title",
            placeholder: "Enter your title...",
          },
          subtitle: {
            type: "text",
            label: "Subtitle",
            description: "Secondary title below main title",
            placeholder: "Enter subtitle...",
          },
          description: {
            type: "textarea",
            label: "Description",
            description: "Hero description text",
            placeholder: "Enter description...",
          },
          showBadge: {
            type: "boolean",
            label: "Show Badge",
            description: "Display status badge",
          },
          badgeText: {
            type: "text",
            label: "Badge Text",
            description: "Text for the status badge",
            placeholder: "e.g., AVAILABLE FOR HIRE",
          },
          showScrollIndicator: {
            type: "boolean",
            label: "Show Scroll Indicator",
            description: "Display scroll down indicator",
          },
          scrollTarget: {
            type: "text",
            label: "Scroll Target",
            description: "ID of section to scroll to",
            placeholder: "#about",
          },
          profileImage: {
            type: "text",
            label: "Profile Image",
            description: "URL for profile image",
            placeholder: "https://example.com/image.jpg",
          },
          heroImage: {
            type: "text",
            label: "Hero Image",
            description: "URL for main hero image",
            placeholder: "https://example.com/hero.jpg",
          },
          imageShape: {
            type: "select",
            label: "Image Shape",
            description: "Clip-path shape for hero image",
            options: [
              { value: "circle", label: "Circle" },
              { value: "hexagon", label: "Hexagon" },
              { value: "diamond", label: "Diamond" },
              { value: "blob", label: "Blob" },
              { value: "star", label: "Star" },
              { value: "triangle", label: "Triangle" },
              { value: "octagon", label: "Octagon" },
              { value: "figure8", label: "Figure 8" },
              { value: "heart", label: "Heart" },
              { value: "lightning", label: "Lightning" },
              { value: "pentagon", label: "Pentagon" },
              { value: "cross", label: "Cross" },
            ],
          },
          imageSize: {
            type: "select",
            label: "Image Size",
            description: "Size of the hero image shape",
            options: [
              { value: "small", label: "Small" },
              { value: "medium", label: "Medium" },
              { value: "large", label: "Large" },
            ],
          },
        },
        defaultStyles: {
          backgroundColor: "#fef08a",
          textColor: "#111111",
          primaryColor: "#ef4444",
          secondaryColor: "#8b5cf6",
          accentColor: "#fef08a",
          borderColor: "#000000",
          borderRadius: "0",
          shadow: "4px 4px 0px #000",
          paddingY: "2rem",
          paddingX: "1.5rem",
          textAlign: "center",
          fontSize: "base",
          fontWeight: "bold",
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
      {
        id: "neobrutalist-about",
        name: "Neobrutalist About",
        description:
          "Story-focused about section with experience timeline, achievements, and core values – tailored with Tanmay Patil's resume details",
        component: AboutComponents.NeobrutalistAbout,
        thumbnail: "/thumbnails/neobrutalist-about.jpg",
        category: "content",
        tags: [
          "about",
          "neobrutalism",
          "story",
          "experience",
          "achievements",
          "values",
          "timeline",
        ],
        theme: "neobrutalism",
        isPopular: true,
        defaultProps: {
          title: "MY STORY",
          subtitle: "THE JOURNEY SO FAR",
          story:
            "I'm Tanmay Patil, a Software Development Engineer (Full‑Stack) with 3+ years building high‑performance, scalable web apps used by millions. I specialize in TypeScript, React, Next.js, Node.js, and modern tooling. I enjoy solving hard problems with clean, reliable code and shipping features end‑to‑end that measurably improve user experience and platform performance.",
          mission:
            "Deliver robust, maintainable products with craftsmanship, pragmatism, and performance in mind — while creating delightful experiences for users and teammates alike.",
          quote:
            "Great software feels simple on the surface and solid underneath.",
          quoteAuthor: "Tanmay Patil",
          achievements: [
            {
              title: "Core Features at Scale",
              description:
                "Built and maintained 50%+ of core user‑facing features for nationwide retail partners",
              year: "2022‑2024",
              icon: "rocket",
            },
            {
              title: "Performance Boost",
              description:
                "Delivered ~30% performance improvement through profiling, code‑splitting, and caching",
              year: "2023",
              icon: "trophy",
            },
            {
              title: "Security Hardening",
              description:
                "Improved security posture by ~95% across critical flows",
              year: "2023",
              icon: "shield",
            },
            {
              title: "Open Source & Community",
              description: "Active contributor and continuous learner",
              year: "2023‑Present",
              icon: "star",
            },
          ],
          experience: [
            {
              role: "Software Development Engineer (Full‑Stack)",
              company: "Jio Platforms Limited",
              period: "2022 – Present",
              description:
                "End‑to‑end development of high‑traffic features with React, Next.js, Node.js, and TypeScript across Agile/CI/CD environments.",
              highlights: [
                "Built and maintained 50%+ of core features",
                "Improved performance by ~30%",
                "Security posture improved by ~95%",
                "Shipped reliable, scalable components",
              ],
            },
            {
              role: "B.E. in Computer Engineering",
              company: "Pillai HOC College of Engineering and Technology",
              period: "2015 – 2019",
              description:
                "Graduated with a focus on software engineering and web technologies.",
              highlights: [
                "Strong fundamentals in CS and web dev",
                "Projects in full‑stack and tooling",
              ],
            },
          ],

          showStory: true,
          showExperience: true,
          showAchievements: true,
          showValues: true,
          showQuote: true,
          backgroundColor: "#ffffff",
          textColor: "#111827",
          primaryColor: "#000000",
          secondaryColor: "#6b7280",
          accentColor: "#ffffff",
          borderColor: "#000000",
          borderRadius: "0",
          shadow: "none",
          paddingY: "120",
          paddingX: "32",
          textAlign: "left",
          fontSize: "4xl",
          fontWeight: "black",
          borderWidth: "0",
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
          story: {
            type: "textarea",
            label: "Story",
            description: "Your personal story and background",
            placeholder: "Tell your story...",
          },
          mission: {
            type: "textarea",
            label: "Mission",
            description: "Your mission statement",
            placeholder: "Enter your mission...",
          },
          quote: {
            type: "textarea",
            label: "Quote",
            description: "A quote from yourself",
            placeholder: "Enter your quote...",
          },
          quoteAuthor: {
            type: "text",
            label: "Quote Author",
            description: "The author of the quote",
            placeholder: "Enter quote author...",
          },
          achievements: {
            type: "array",
            label: "Achievements",
            description: "Your key achievements and milestones",
            itemSchema: {
              title: {
                type: "text",
                label: "Achievement Title",
                description: "Title of the achievement",
                placeholder: "e.g., First App Published",
              },
              description: {
                type: "textarea",
                label: "Description",
                description: "Detailed description of the achievement",
                placeholder: "Describe what you accomplished...",
              },
              year: {
                type: "text",
                label: "Year",
                description: "When this achievement occurred",
                placeholder: "e.g., 2023",
              },
              icon: {
                type: "select",
                label: "Icon",
                description: "Icon to represent this achievement",
                options: [
                  { value: "rocket", label: "Rocket" },
                  { value: "trophy", label: "Trophy" },
                  { value: "shield", label: "Shield" },
                  { value: "star", label: "Star" },
                  { value: "award", label: "Award" },
                  { value: "users", label: "Users" },
                  { value: "target", label: "Target" },
                  { value: "heart", label: "Heart" },
                ],
              },
            },
          },
          experience: {
            type: "array",
            label: "Experience",
            description: "Your work and educational experience",
            itemSchema: {
              role: {
                type: "text",
                label: "Role/Title",
                description: "Your job title or role",
                placeholder: "e.g., Senior Developer",
              },
              company: {
                type: "text",
                label: "Company/Institution",
                description: "Company or educational institution name",
                placeholder: "e.g., Tech Company Inc.",
              },
              period: {
                type: "text",
                label: "Period",
                description: "Time period of this experience",
                placeholder: "e.g., 2022 - Present",
              },
              description: {
                type: "textarea",
                label: "Description",
                description: "Overview of your role and responsibilities",
                placeholder: "Describe your role and key responsibilities...",
              },
              highlights: {
                type: "array",
                label: "Key Highlights",
                description: "List of key achievements and highlights",
                itemSchema: {
                  highlight: {
                    type: "text",
                    label: "Highlight",
                    description: "A key achievement or highlight",
                    placeholder: "e.g., Improved performance by 30%",
                  },
                },
              },
            },
          },
          values: {
            type: "array",
            label: "Core Values",
            description: "Your personal and professional values",
            itemSchema: {
              title: {
                type: "text",
                label: "Value Title",
                description: "Name of the value",
                placeholder: "e.g., Quality First",
              },
              description: {
                type: "textarea",
                label: "Description",
                description: "Explanation of this value",
                placeholder: "Describe what this value means to you...",
              },
              icon: {
                type: "select",
                label: "Icon",
                description: "Icon to represent this value",
                options: [
                  { value: "target", label: "Target" },
                  { value: "heart", label: "Heart" },
                  { value: "rocket", label: "Rocket" },
                  { value: "users", label: "Users" },
                  { value: "star", label: "Star" },
                  { value: "shield", label: "Shield" },
                  { value: "award", label: "Award" },
                  { value: "coffee", label: "Coffee" },
                ],
              },
            },
          },
          showStory: {
            type: "boolean",
            label: "Show Story",
            description: "Display the story section",
          },
          showExperience: {
            type: "boolean",
            label: "Show Experience",
            description: "Display the experience section",
          },
          showAchievements: {
            type: "boolean",
            label: "Show Achievements",
            description: "Display the achievements section",
          },
          showValues: {
            type: "boolean",
            label: "Show Values",
            description: "Display the values section",
          },
          showQuote: {
            type: "boolean",
            label: "Show Quote",
            description: "Display the quote section",
          },
        },
        defaultStyles: {
          backgroundColor: "#ffffff",
          textColor: "#111827",
          primaryColor: "#000000",
          secondaryColor: "#6b7280",
          accentColor: "#ffffff",
          borderColor: "#000000",
          borderRadius: "0",
          shadow: "none",
          paddingY: "120",
          paddingX: "32",
          textAlign: "left",
          fontSize: "4xl",
          fontWeight: "black",
          borderWidth: "0",
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
      {
        id: "skills-brutalist",
        name: "NeoBrutalist Skills",
        description:
          "A bold neo-brutalist skills section with chunky blocks, heavy shadows, and raw geometric shapes",
        component: SkillsComponents.NeoBrutalistSkills,
        thumbnail: "/thumbnails/skills-brutalist.jpg",
        category: "layout",
        tags: [
          "skills",
          "brutalist",
          "bold",
          "geometric",
          "chunky",
          "portfolio",
          "raw",
          "blocks",
          "heavy",
          "striking",
        ],
        isPopular: true,
        defaultProps: {
          title: "MY SKILLS",
          subtitle: "TECHNICAL ARSENAL",
          description:
            "Raw, unfiltered breakdown of my technical capabilities and expertise levels.",
          skills: [
            {
              name: "REACT",
              level: 95,
              category: "FRONTEND",
              yearsExperience: 4,
              projects: 25,
              status: "mastered",
              color: "#ff6b35",
            },
            {
              name: "TYPESCRIPT",
              level: 90,
              category: "LANGUAGE",
              yearsExperience: 3,
              projects: 20,
              status: "mastered",
              color: "#f7931e",
            },
            {
              name: "NODE.JS",
              level: 85,
              category: "BACKEND",
              yearsExperience: 3,
              projects: 15,
              status: "proficient",
              color: "#ffd23f",
            },
            {
              name: "PYTHON",
              level: 80,
              category: "LANGUAGE",
              yearsExperience: 2,
              projects: 12,
              status: "proficient",
              color: "#06ffa5",
            },
            {
              name: "DOCKER",
              level: 75,
              category: "DEVOPS",
              yearsExperience: 2,
              projects: 8,
              status: "learning",
              color: "#4ecdc4",
            },
            {
              name: "AWS",
              level: 70,
              category: "CLOUD",
              yearsExperience: 1,
              projects: 6,
              status: "learning",
              color: "#45b7d1",
            },
            {
              name: "GRAPHQL",
              level: 85,
              category: "API",
              yearsExperience: 2,
              projects: 10,
              status: "proficient",
              color: "#96ceb4",
            },
            {
              name: "MONGODB",
              level: 80,
              category: "DATABASE",
              yearsExperience: 3,
              projects: 18,
              status: "proficient",
              color: "#ffeaa7",
            },
          ],
          showLevelBars: true,
          showExperience: true,
          showProjects: true,
          showStatus: true,
          showCategories: true,
          animateOnLoad: true,
          layoutStyle: "blocks",
          sortBy: "level",
          showNoise: true,
          brutalistShadows: true,
        },
        propsSchema: {
          title: {
            type: "text",
            label: "Title",
            description: "Main section title",
            placeholder: "Enter title...",
          },
          subtitle: {
            type: "text",
            label: "Subtitle",
            description: "Section subtitle displayed in colored block",
            placeholder: "Enter subtitle...",
          },
          description: {
            type: "textarea",
            label: "Description",
            description: "Section description in highlighted box",
            placeholder: "Enter description...",
          },
          showLevelBars: {
            type: "boolean",
            label: "Show Level Bars",
            description: "Display chunky progress bars for skill levels",
          },
          showExperience: {
            type: "boolean",
            label: "Show Experience",
            description: "Display years of experience in stat blocks",
          },
          showProjects: {
            type: "boolean",
            label: "Show Projects",
            description: "Display number of projects in stat blocks",
          },
          showStatus: {
            type: "boolean",
            label: "Show Status",
            description: "Display status badges (mastered/proficient/learning)",
          },
          showCategories: {
            type: "boolean",
            label: "Show Categories",
            description: "Display category tags for each skill",
          },
          animateOnLoad: {
            type: "boolean",
            label: "Animate on Load",
            description: "Enable staggered loading animation",
          },
          showNoise: {
            type: "boolean",
            label: "Show Texture",
            description: "Add subtle noise texture to background",
          },
          brutalistShadows: {
            type: "boolean",
            label: "Brutalist Shadows",
            description: "Use heavy geometric shadows instead of soft shadows",
          },
          sortBy: {
            type: "select",
            label: "Sort Skills By",
            description: "How to sort the skills display",
            options: [
              { value: "level", label: "Proficiency Level" },
              { value: "experience", label: "Years of Experience" },
              { value: "projects", label: "Number of Projects" },
              { value: "name", label: "Alphabetical" },
            ],
          },
          layoutStyle: {
            type: "select",
            label: "Layout Style",
            description: "Visual arrangement of skill blocks",
            options: [
              { value: "blocks", label: "Grid Blocks" },
              { value: "stack", label: "Stacked Cards" },
              { value: "masonry", label: "Masonry Layout" },
            ],
          },
          borderWidth: {
            type: "select",
            label: "Border Width",
            description: "Thickness of borders around elements",
            options: [
              { value: "2", label: "Thin (2px)" },
              { value: "4", label: "Medium (4px)" },
              { value: "6", label: "Thick (6px)" },
              { value: "8", label: "Extra Thick (8px)" },
            ],
          },
        },
        defaultStyles: {
          backgroundColor: "#fffef7",
          textColor: "#111111",
          primaryColor: "#ff6b35",
          secondaryColor: "#666666",
          accentColor: "#ffd23f",
          borderColor: "#111111",
          borderRadius: "0",
          shadow: "8px 8px 0px #111111",
          paddingY: "5rem",
          paddingX: "1.25rem",
          textAlign: "center",
          fontSize: "xl",
          fontWeight: "900",
          borderWidth: "4",
        },
        customization: {
          skillsData: {
            type: "array",
            label: "Skills Data",
            description: "Configure individual skills with their properties",
            itemSchema: {
              name: {
                type: "text",
                label: "Skill Name",
                required: true,
                placeholder: "e.g., REACT, PYTHON",
              },
              level: {
                type: "number",
                label: "Proficiency Level (0-100)",
                min: 0,
                max: 100,
                required: true,
              },
              category: {
                type: "text",
                label: "Category",
                placeholder: "e.g., FRONTEND, BACKEND, DEVOPS",
                required: true,
              },
              yearsExperience: {
                type: "number",
                label: "Years of Experience",
                min: 0,
                max: 20,
              },
              projects: {
                type: "number",
                label: "Number of Projects",
                min: 0,
              },
              status: {
                type: "select",
                label: "Status",
                options: [
                  { value: "mastered", label: "Mastered" },
                  { value: "proficient", label: "Proficient" },
                  { value: "learning", label: "Learning" },
                ],
              },
              color: {
                type: "color",
                label: "Block Color",
                description: "Background color for this skill block",
                placeholder: "#ff6b35",
              },
            },
          },
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
      {
        id: "projects-brutalist",
        name: "Brutalist Projects",
        description:
          "A bold neo-brutalist project showcase with tilted cards, animated status indicators, and chunky geometric elements",
        component: ProjectsComponents.NeobrutalistProjects,
        thumbnail: "/thumbnails/projects-brutalist.jpg",
        category: "content",
        tags: [
          "projects",
          "brutalist",
          "portfolio",
          "tilted",
          "animated",
          "status",
          "bold",
          "geometric",
          "showcase",
          "chunky",
        ],
        isPopular: true,
        defaultProps: {
          title: "MY PROJECTS",
          subtitle: "BUILT WITH PASSION",
          description:
            "A showcase of digital products, experiments, and solutions I've crafted with code and creativity.",
          projects: [
            {
              id: "1",
              title: "E-COMMERCE BEAST",
              description:
                "Full-stack e-commerce platform with real-time inventory, payment processing, and admin dashboard. Built for scale and performance.",
              category: "WEB APP",
              status: "live",
              year: "2024",
              technologies: ["REACT", "NODE.JS", "MONGODB", "STRIPE"],
              image:
                "https://placehold.co/400x300/ff6b35/ffffff?text=ECOMMERCE",
              liveUrl: "https://example.com",
              githubUrl: "https://github.com/user/project",
              color: "#ff6b35",
              priority: "high",
            },
            {
              id: "2",
              title: "AI CHAT INTERFACE",
              description:
                "Modern chat application with AI integration, real-time messaging, and smart responses. Clean UI with powerful backend.",
              category: "AI/ML",
              status: "development",
              year: "2024",
              technologies: ["TYPESCRIPT", "PYTHON", "OPENAI", "WEBSOCKETS"],
              image: "https://placehold.co/400x300/06ffa5/ffffff?text=AI+CHAT",
              githubUrl: "https://github.com/user/ai-chat",
              color: "#06ffa5",
              priority: "high",
            },
            {
              id: "3",
              title: "PORTFOLIO BUILDER",
              description:
                "Drag-and-drop portfolio builder with 50+ components, themes, and export options. Made for creators and developers.",
              category: "TOOL",
              status: "featured",
              year: "2023",
              technologies: ["REACT", "TAILWIND", "FRAMER", "NEXT.JS"],
              image:
                "https://placehold.co/400x300/ffd23f/ffffff?text=PORTFOLIO",
              liveUrl: "https://portfolio-builder.com",
              caseStudyUrl: "https://case-study.com",
              color: "#ffd23f",
              priority: "high",
            },
            {
              id: "4",
              title: "CRYPTO TRACKER",
              description:
                "Real-time cryptocurrency tracking dashboard with portfolio management, alerts, and market analysis tools.",
              category: "FINTECH",
              status: "archived",
              year: "2023",
              technologies: ["VUE.JS", "PYTHON", "REDIS", "WEBSOCKETS"],
              image: "https://placehold.co/400x300/4ecdc4/ffffff?text=CRYPTO",
              githubUrl: "https://github.com/user/crypto-tracker",
              color: "#4ecdc4",
              priority: "medium",
            },
            {
              id: "5",
              title: "TASK MANAGEMENT",
              description:
                "Minimalist task manager with team collaboration, time tracking, and project analytics. Simple yet powerful.",
              category: "PRODUCTIVITY",
              status: "live",
              year: "2023",
              technologies: ["SVELTE", "FIREBASE", "TYPESCRIPT"],
              image: "https://placehold.co/400x300/f7931e/ffffff?text=TASKS",
              liveUrl: "https://task-manager.com",
              color: "#f7931e",
              priority: "medium",
            },
            {
              id: "6",
              title: "WEATHER VISUALIZER",
              description:
                "Interactive weather data visualization with maps, charts, and forecasting. Beautiful UI meets powerful data.",
              category: "DATA VIZ",
              status: "development",
              year: "2024",
              technologies: ["D3.JS", "REACT", "MAPBOX", "API"],
              image: "https://placehold.co/400x300/96ceb4/ffffff?text=WEATHER",
              color: "#96ceb4",
              priority: "low",
            },
          ],
          showTechnologies: true,
          showStatus: true,
          showYear: true,
          showLinks: true,
          showImages: true,
          animateOnScroll: true,
          layoutStyle: "tilted",
          filterByStatus: false,
          sortBy: "priority",
          showNoise: true,
          brutalistShadows: true,
          maxTilt: 8,
        },
        propsSchema: {
          title: {
            type: "text",
            label: "Title",
            description: "Main section title",
            placeholder: "Enter title...",
          },
          subtitle: {
            type: "text",
            label: "Subtitle",
            description: "Section subtitle displayed in colored block",
            placeholder: "Enter subtitle...",
          },
          description: {
            type: "textarea",
            label: "Description",
            description: "Section description in highlighted box",
            placeholder: "Enter description...",
          },
          showTechnologies: {
            type: "boolean",
            label: "Show Technologies",
            description: "Display technology tags for each project",
          },
          showStatus: {
            type: "boolean",
            label: "Show Status",
            description: "Display animated status indicators",
          },
          showYear: {
            type: "boolean",
            label: "Show Year",
            description: "Display project year",
          },
          showLinks: {
            type: "boolean",
            label: "Show Action Links",
            description: "Display live, code, and case study links",
          },
          showImages: {
            type: "boolean",
            label: "Show Images",
            description: "Display project preview images",
          },
          animateOnScroll: {
            type: "boolean",
            label: "Animate on Scroll",
            description: "Enable scroll-triggered animations",
          },
          filterByStatus: {
            type: "boolean",
            label: "Enable Status Filtering",
            description: "Show filter tabs to sort by project status",
          },
          showNoise: {
            type: "boolean",
            label: "Show Texture",
            description: "Add subtle noise texture to background",
          },
          brutalistShadows: {
            type: "boolean",
            label: "Brutalist Shadows",
            description: "Use heavy geometric shadows instead of soft shadows",
          },
          layoutStyle: {
            type: "select",
            label: "Layout Style",
            description: "Visual arrangement of project cards",
            options: [
              { value: "tilted", label: "Tilted Cards (Brutalist)" },
              { value: "grid", label: "Standard Grid" },
              { value: "stacked", label: "Stacked Layout" },
            ],
          },
          sortBy: {
            type: "select",
            label: "Sort Projects By",
            description: "How to sort the projects display",
            options: [
              { value: "priority", label: "Priority Level" },
              { value: "year", label: "Year (Newest First)" },
              { value: "status", label: "Project Status" },
              { value: "title", label: "Alphabetical" },
            ],
          },
          maxTilt: {
            type: "number",
            label: "Maximum Tilt Angle",
            description: "Maximum rotation angle for tilted cards (degrees)",
            min: 0,
            max: 15,
            placeholder: "8",
          },
          borderWidth: {
            type: "select",
            label: "Border Width",
            description: "Thickness of borders around elements",
            options: [
              { value: "2", label: "Thin (2px)" },
              { value: "4", label: "Medium (4px)" },
              { value: "6", label: "Thick (6px)" },
              { value: "8", label: "Extra Thick (8px)" },
            ],
          },
        },
        defaultStyles: {
          backgroundColor: "#fffef7",
          textColor: "#111111",
          primaryColor: "#ff6b35",
          secondaryColor: "#666666",
          accentColor: "#ffd23f",
          borderColor: "#111111",
          borderRadius: "0",
          shadow: "12px 12px 0px #111111",
          paddingY: "6.25rem",
          paddingX: "1.25rem",
          textAlign: "left",
          fontSize: "xl",
          fontWeight: "900",
          borderWidth: "4",
        },
        customization: {
          projectsData: {
            type: "array",
            label: "Projects Data",
            description: "Configure individual projects with their properties",
            itemSchema: {
              title: {
                type: "text",
                label: "Project Title",
                required: true,
                placeholder: "e.g., E-COMMERCE BEAST",
              },
              description: {
                type: "textarea",
                label: "Project Description",
                required: true,
                placeholder: "Brief description of the project...",
              },
              category: {
                type: "text",
                label: "Category",
                placeholder: "e.g., WEB APP, AI/ML, TOOL",
                required: true,
              },
              status: {
                type: "select",
                label: "Project Status",
                required: true,
                options: [
                  { value: "live", label: "Live" },
                  { value: "development", label: "In Development" },
                  { value: "featured", label: "Featured" },
                  { value: "archived", label: "Archived" },
                ],
              },
              year: {
                type: "text",
                label: "Year",
                placeholder: "e.g., 2024",
                required: true,
              },
              technologies: {
                type: "array",
                label: "Technologies",
                description: "List of technologies used",
                itemType: "text",
                placeholder: "e.g., REACT, NODE.JS, MONGODB",
              },
              image: {
                type: "text",
                label: "Preview Image URL",
                placeholder: "https://example.com/image.jpg",
              },
              liveUrl: {
                type: "text",
                label: "Live Demo URL",
                placeholder: "https://example.com",
              },
              githubUrl: {
                type: "text",
                label: "GitHub URL",
                placeholder: "https://github.com/user/project",
              },
              caseStudyUrl: {
                type: "text",
                label: "Case Study URL",
                placeholder: "https://case-study.com",
              },
              color: {
                type: "color",
                label: "Card Background Color",
                description: "Background color for this project card",
                placeholder: "#ff6b35",
                required: true,
              },
              priority: {
                type: "select",
                label: "Priority",
                description: "Project priority for sorting",
                options: [
                  { value: "high", label: "High Priority" },
                  { value: "medium", label: "Medium Priority" },
                  { value: "low", label: "Low Priority" },
                ],
              },
            },
          },
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
      {
        id: "neobrutalist-contact",
        name: "Neobrutalist Contact",
        description:
          "Bold and vibrant contact section with characteristic neobrutalist shadows, sharp edges, and playful interactions",
        component: ContactComponents.NeobrutalistContact,
        thumbnail: "/thumbnails/neobrutalist-contact.jpg",
        category: "form",
        tags: [
          "contact",
          "neobrutalism",
          "bold",
          "colorful",
          "form",
          "interactive",
        ],
        theme: "neobrutalism",
        isPopular: true,
        defaultProps: {
          title: "GET IN TOUCH",
          subtitle: "LET'S CREATE SOMETHING AMAZING",
          description:
            "Ready to bring your wildest ideas to life? Drop me a line and let's make some digital magic happen. No boring projects, please!",
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
          formTitle: "DROP A LINE",
          formSubtitle: "Let's chat!",
        },
        defaultStyles: {
          backgroundColor: "#fbbf24",
          textColor: "#000000",
          primaryColor: "#000000",
          secondaryColor: "#1f2937",
          accentColor: "#ef4444",
          shadowColor: "#000000",
          paddingY: "120",
          paddingX: "32",
          textAlign: "left",
          fontSize: "4xl",
          fontWeight: "black",
          borderRadius: "0",
          shadowOffset: "8",
          borderWidth: "4",
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
      {
        id: "neo-brutalist-navbar",
        name: "Neo Brutalist Navbar",
        description:
          "A bold, brutalist-inspired navbar with double-text effects, status indicator, animated mobile menu, and scroll-aware styling.",
        component: NavbarComponents.NeoBrutalistNavbar,
        thumbnail: "/thumbnails/neo-brutalist-navbar.jpg",
        category: "layout",
        tags: [
          "navbar",
          "navigation",
          "brutalist",
          "double-text",
          "bold",
          "mobile",
          "status",
          "developer",
        ],
        isPopular: true,
        defaultProps: {
          logoText: "DEV.PORTFOLIO",
          showCTA: true,
          ctaText: "HIRE_ME()",
          ctaHref: "#contact",
          showStatus: true,
          statusText: "AVAILABLE",
          statusColor: "#00ff87",
          backgroundColor: "#ffffff",
          textColor: "#000000",
          primaryColor: "#ff6b35",
          secondaryColor: "#64748b",
          borderColor: "#000000",
          borderRadius: "0",
          shadow: "4px 4px 0px #000000",
          doubleText: true,
          showMobileMenu: true,
          logoIcon: true,
        },
        defaultStyles: {
          backgroundColor: "#ffffff",
          textColor: "#000000",
          primaryColor: "#ff6b35",
          secondaryColor: "#64748b",
          borderColor: "#000000",
          paddingY: "16",
          paddingX: "20",
          borderRadius: "0",
          shadow: "4px 4px 0px #000000",
          fontFamily: "monospace",
          fontWeight: "bold",
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
