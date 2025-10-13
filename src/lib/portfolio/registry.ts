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
  cardBackgroundColor?: string;
  successColor?: string;
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
import * as TestimonialsComponents from "@/components/portfolio/sections/testimonials";
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
  TestimonialsComponents,
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
          title: "JOHN DOE",
          subtitle: "Full Stack Developer",
          description:
            "Passionate developer with experience building modern web applications and digital solutions. I love creating user-friendly interfaces and robust backend systems using the latest technologies.",
          profileImage:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
          ctaText: "View My Work",
          ctaLink: "#projects",
          showSocialLinks: true,
          socialLinks: [
            {
              platform: "GitHub",
              url: "https://github.com/johndoe",
              username: "@johndoe",
            },
            {
              platform: "LinkedIn",
              url: "https://linkedin.com/in/johndoe",
              username: "@johndoe",
            },
            {
              platform: "Email",
              url: "mailto:john.doe@example.com",
              username: "john.doe@example.com",
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
          name: "JOHN_DOE",
          title: "FULL_STACK_DEVELOPER",
          profileImage: "",
          visualDisplay: "code",
          showStatus: true,
          statusText: "AVAILABLE_FOR_HIRE",
          tagline:
            "Building digital experiences with clean code & creative solutions",
          typingTexts: [
            "FULL_STACK_DEVELOPER",
            "REACT_DEVELOPER",
            "NODE_JS_DEVELOPER",
          ],
          description:
            "Passionate developer with experience building modern web applications and digital solutions. I love creating user-friendly interfaces and robust backend systems using the latest technologies.",
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
              url: "https://github.com/johndoe",
              username: "@johndoe",
            },
            {
              platform: "LinkedIn",
              url: "https://linkedin.com/in/johndoe",
              username: "@johndoe",
            },
            {
              platform: "Email",
              url: "mailto:john.doe@example.com",
              username: "john.doe@example.com",
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
          backgroundColor: "#ffffff",
          textColor: "#111827",
          primaryColor: "#000000",
          secondaryColor: "#6b7280",
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
          backgroundColor: "#fffef7",
          textColor: "#111111",
          primaryColor: "#ff6b35",
          secondaryColor: "#666666",
          accentColor: "#ffd23f",
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
      {
        id: "minimal-hero",
        name: "Minimal Hero",
        description:
          "Clean and minimal hero section with centered layout, profile image, social links, and resume download",
        component: HeroComponents.MinimalHero,
        thumbnail: "/thumbnails/minimal-hero.jpg",
        category: "layout",
        tags: [
          "hero",
          "minimal",
          "clean",
          "centered",
          "profile",
          "social",
          "resume",
          "simple",
        ],
        theme: "minimal",
        isPopular: true,
        defaultProps: {
          title: "Hi, I'm John Doe 👋",
          subtitle: "Full Stack Developer",
          description:
            "I'm a full stack developer passionate about creating exceptional digital experiences that are fast, accessible, visually appealing, and responsive. Even though I have been creating web applications for over 7 years, I still love it as if it was something new.",
          profileImage:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
          showSocialLinks: true,
          socialLinks: [
            {
              platform: "GitHub",
              url: "https://github.com/johndoe",
              username: "@johndoe",
            },
            {
              platform: "LinkedIn",
              url: "https://linkedin.com/in/johndoe",
              username: "@johndoe",
            },
            {
              platform: "Twitter",
              url: "https://twitter.com/johndoe",
              username: "@johndoe",
            },
            {
              platform: "Email",
              url: "mailto:john.doe@example.com",
              username: "john.doe@example.com",
            },
          ],
          showResumeButton: true,
          resumeUrl: "/resume.pdf",
          resumeText: "Download Resume",
        },
        propsSchema: {
          title: {
            type: "text",
            label: "Title",
            description: "Main hero title with greeting",
            placeholder: "Hi, I'm John Doe 👋",
          },
          subtitle: {
            type: "text",
            label: "Subtitle",
            description: "Your professional title or role",
            placeholder: "Full Stack Developer",
          },
          description: {
            type: "textarea",
            label: "Description",
            description: "Brief description about yourself",
            placeholder: "Tell visitors about yourself...",
          },
          profileImage: {
            type: "text",
            label: "Profile Image URL",
            description: "URL to your profile picture",
            placeholder: "https://example.com/image.jpg",
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
          showResumeButton: {
            type: "boolean",
            label: "Show Resume Button",
            description: "Display resume download button",
          },
          resumeUrl: {
            type: "text",
            label: "Resume URL",
            description: "URL to downloadable resume file",
            placeholder: "/resume.pdf",
          },
          resumeText: {
            type: "text",
            label: "Resume Button Text",
            description: "Text displayed on the resume button",
            placeholder: "Download Resume",
          },
        },
        defaultStyles: {
          backgroundColor: "#ffffff",
          textColor: "#1f2937",
          primaryColor: "#3b82f6",
          secondaryColor: "#6b7280",
          paddingY: "80",
          paddingX: "16",
          textAlign: "center",
          fontSize: "base",
          fontWeight: "normal",
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
          bio: "Passionate developer with experience building modern web applications and digital solutions. I love creating user-friendly interfaces and robust backend systems using the latest technologies. My expertise spans frontend development, backend API creation, and full-stack solutions.",
          location: "San Francisco, CA",
          yearsExperience: "5+",
          currentRole: "Full Stack Developer",
          timelineItems: [
            {
              year: "2022",
              title: "Full Stack Developer",
              company: "Tech Company Inc.",
              description:
                "Developed and maintained web applications using modern frameworks and technologies, contributing to various client projects.",
              type: "work",
            },
            {
              year: "2020",
              title: "B.S. in Computer Science",
              company: "University of Technology",
              description:
                "Graduated with focus on software engineering and web technologies.",
              type: "education",
            },
          ],
          showStats: true,
          stats: [
            { number: "5+", label: "Years Experience", icon: "calendar" },
            { number: "50+", label: "Projects Completed", icon: "code" },
            { number: "100%", label: "Client Satisfaction", icon: "shield" },
            { number: "40%", label: "Performance Boost", icon: "zap" },
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
          paddingY: "12",
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
          "Story-focused about section with experience timeline, achievements, and core values – perfect for showcasing your professional journey",
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
            "I'm John Doe, a Full Stack Developer with 5+ years building modern web applications and digital solutions. I specialize in React, Node.js, TypeScript, and cloud technologies. I enjoy solving complex problems with clean, maintainable code and creating features that enhance user experience and system performance.",
          mission:
            "Create innovative, scalable solutions with attention to detail and user experience — while building products that make a positive impact.",
          experience: [
            {
              role: "Full Stack Developer",
              company: "Tech Company Inc.",
              period: "2022 – Present",
              description:
                "End‑to‑end development of web applications using React, Node.js, and modern cloud technologies.",
              highlights: [
                "Delivered 30+ successful projects",
                "Improved performance by 40%",
                "Maintained 100% client satisfaction",
                "Built scalable, maintainable solutions",
              ],
            },
            {
              role: "B.S. in Computer Science",
              company: "University of Technology",
              period: "2016 – 2020",
              description:
                "Graduated with a focus on software engineering and web technologies.",
              highlights: [
                "Strong fundamentals in CS and web dev",
                "Projects in full‑stack development",
              ],
            },
          ],

          showStory: true,
          showExperience: true,
          showValues: true,
          backgroundColor: "#ffffff",
          textColor: "#111827",
          primaryColor: "#000000",
          secondaryColor: "#6b7280",
          accentColor: "#ffffff",
          borderColor: "#000000",
          borderRadius: "0",
          shadow: "none",
          paddingY: "12",
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
          showValues: {
            type: "boolean",
            label: "Show Values",
            description: "Display the values section",
          },
        },
        defaultStyles: {
          backgroundColor: "#fffef7",
          textColor: "#111111",
          primaryColor: "#ff6b35",
          secondaryColor: "#666666",
          accentColor: "#ffd23f",
          borderColor: "#000000",
          borderRadius: "0",
          shadow: "4px 4px 0px #000",
          paddingY: "12",
          paddingX: "32",
          textAlign: "left",
          fontSize: "4xl",
          fontWeight: "black",
          borderWidth: "4",
        },
      },
      {
        id: "minimal-about",
        name: "Minimal About",
        description:
          "Clean and minimal about section with story and experience timeline in card layout",
        component: AboutComponents.MinimalAbout,
        thumbnail: "/thumbnails/minimal-about.jpg",
        category: "content",
        tags: ["about", "minimal", "clean", "timeline", "experience", "story"],
        theme: "minimal",
        isPopular: true,
        defaultProps: {
          title: "About Me",
          subtitle: "My Journey",
          story:
            "I'm a passionate developer with a love for creating beautiful and functional web applications. My journey in tech started years ago, and I've been constantly learning and growing ever since.",
          experience: [
            {
              role: "Full Stack Developer",
              company: "Tech Company Inc.",
              period: "2022 – Present",
              description:
                "End‑to‑end development of web applications using React, Node.js, and modern cloud technologies.",
              highlights: [
                "Delivered 30+ successful projects",
                "Improved performance by 40%",
                "Maintained 100% client satisfaction",
                "Built scalable, maintainable solutions",
              ],
            },
            {
              role: "B.S. in Computer Science",
              company: "University of Technology",
              period: "2016 – 2020",
              description:
                "Graduated with a focus on software engineering and web technologies.",
              highlights: [
                "Strong fundamentals in CS and web dev",
                "Projects in full‑stack development",
              ],
            },
          ],
          showStory: true,
          showExperience: true,
          cardBackgroundColor: "#ffffff",
        },
        propsSchema: {
          title: {
            type: "text",
            label: "Section Title",
            description: "The main title for the about section",
            placeholder: "Enter section title...",
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
          subtitle: {
            type: "text",
            label: "Section Subtitle",
            description: "The subtitle displayed below the main title",
            placeholder: "Enter subtitle...",
          },
          story: {
            type: "textarea",
            label: "Your Story",
            description: "Tell your story and background",
            placeholder: "Tell your story...",
          },
          showStory: {
            type: "boolean",
            label: "Show Story",
            description: "Display the story section",
          },
          showExperience: {
            type: "boolean",
            label: "Show Experience",
            description: "Display the experience timeline",
          },
        },
        defaultStyles: {
          backgroundColor: "#ffffff",
          textColor: "#1f2937",
          primaryColor: "#3b82f6",
          secondaryColor: "#6b7280",
          cardBackgroundColor: "#f9fafb",
          paddingY: "80",
          paddingX: "16",
          textAlign: "center",
          fontSize: "base",
          fontWeight: "normal",
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
            "A comprehensive breakdown of my technical skills and proficiency levels across modern web development technologies.",
          skills: [
            {
              name: "React.js",
              level: 90,
              category: "Frontend",
              yearsExperience: 4,
              status: "expert",
            },
            {
              name: "Next.js",
              level: 85,
              category: "Frontend",
              yearsExperience: 3,
              status: "expert",
            },
            {
              name: "TypeScript",
              level: 85,
              category: "Frontend",
              yearsExperience: 3,
              status: "expert",
            },
            {
              name: "JavaScript (ES6+)",
              level: 90,
              category: "Frontend",
              yearsExperience: 5,
              status: "expert",
            },
            {
              name: "Vue.js",
              level: 80,
              category: "Frontend",
              yearsExperience: 2,
              status: "active",
            },
            {
              name: "Angular",
              level: 75,
              category: "Frontend",
              yearsExperience: 2,
              status: "active",
            },
            {
              name: "Node.js",
              level: 85,
              category: "Backend",
              yearsExperience: 4,
              status: "expert",
            },
            {
              name: "Express.js",
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
              name: "MongoDB",
              level: 80,
              category: "Database",
              yearsExperience: 3,
              status: "active",
            },
            {
              name: "PostgreSQL",
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
              level: 75,
              category: "DevOps",
              yearsExperience: 2,
              status: "learning",
            },
            {
              name: "AWS",
              level: 70,
              category: "DevOps",
              yearsExperience: 2,
              status: "learning",
            },
            {
              name: "CI/CD",
              level: 80,
              category: "DevOps",
              yearsExperience: 3,
              status: "active",
            },
            {
              name: "Vercel",
              level: 85,
              category: "DevOps",
              yearsExperience: 3,
              status: "active",
            },
            {
              name: "Netlify",
              level: 80,
              category: "DevOps",
              yearsExperience: 2,
              status: "active",
            },
            {
              name: "Git",
              level: 90,
              category: "DevOps",
              yearsExperience: 5,
              status: "expert",
            },
            {
              name: "GitHub",
              level: 90,
              category: "DevOps",
              yearsExperience: 5,
              status: "expert",
            },
            {
              name: "Agile",
              level: 85,
              category: "Methodology",
              yearsExperience: 4,
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
              level: 80,
              category: "Security",
              yearsExperience: 3,
              status: "active",
            },
            {
              name: "OAuth 2.0",
              level: 75,
              category: "Security",
              yearsExperience: 2,
              status: "active",
            },
            {
              name: "SSR",
              level: 80,
              category: "Frontend",
              yearsExperience: 2,
              status: "active",
            },
            {
              name: "SSG",
              level: 75,
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
          primaryColor: "#000000",
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
              level: 90,
              category: "FRONTEND",
              yearsExperience: 4,
              projects: 30,
              status: "mastered",
              color: "#ff6b35",
            },
            {
              name: "TYPESCRIPT",
              level: 85,
              category: "LANGUAGE",
              yearsExperience: 3,
              projects: 25,
              status: "mastered",
              color: "#f7931e",
            },
            {
              name: "NODE.JS",
              level: 85,
              category: "BACKEND",
              yearsExperience: 4,
              projects: 20,
              status: "proficient",
              color: "#ffd23f",
            },
            {
              name: "PYTHON",
              level: 75,
              category: "LANGUAGE",
              yearsExperience: 2,
              projects: 15,
              status: "proficient",
              color: "#06ffa5",
            },
            {
              name: "DOCKER",
              level: 70,
              category: "DEVOPS",
              yearsExperience: 2,
              projects: 10,
              status: "learning",
              color: "#4ecdc4",
            },
            {
              name: "AWS",
              level: 65,
              category: "CLOUD",
              yearsExperience: 1,
              projects: 8,
              status: "learning",
              color: "#45b7d1",
            },
            {
              name: "GRAPHQL",
              level: 80,
              category: "API",
              yearsExperience: 2,
              projects: 12,
              status: "proficient",
              color: "#96ceb4",
            },
            {
              name: "MONGODB",
              level: 80,
              category: "DATABASE",
              yearsExperience: 3,
              projects: 22,
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
      {
        id: "minimal-skills",
        name: "Minimal Skills",
        description:
          "Clean skills grid with progress bars, categories, and status badges",
        component: SkillsComponents.MinimalSkills,
        thumbnail: "/thumbnails/minimal-skills.jpg",
        category: "content",
        tags: [
          "skills",
          "minimal",
          "clean",
          "progress",
          "categories",
          "badges",
        ],
        theme: "minimal",
        isPopular: true,
        defaultProps: {
          title: "Skills",
          subtitle: "What I Work With",
          description: "Technologies and tools I use to bring ideas to life",
          skills: [
            {
              name: "React",
              level: 90,
              category: "Frontend",
              yearsExperience: 5,
              status: "expert",
            },
            {
              name: "TypeScript",
              level: 85,
              category: "Languages",
              yearsExperience: 4,
              status: "proficient",
            },
            {
              name: "Node.js",
              level: 80,
              category: "Backend",
              yearsExperience: 4,
              status: "proficient",
            },
            {
              name: "Next.js",
              level: 85,
              category: "Frontend",
              yearsExperience: 3,
              status: "expert",
            },
            {
              name: "Tailwind CSS",
              level: 90,
              category: "Styling",
              yearsExperience: 3,
              status: "expert",
            },
            {
              name: "MongoDB",
              level: 75,
              category: "Database",
              yearsExperience: 3,
              status: "proficient",
            },
          ],
          showLevelBars: true,
          showExperience: false,
          showStatus: false,
          showCategories: true,
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
            description: "Brief description of your skills",
            placeholder: "Enter description...",
          },
          showLevelBars: {
            type: "boolean",
            label: "Show Level Bars",
            description: "Display progress bars for skill levels",
          },
          showExperience: {
            type: "boolean",
            label: "Show Experience Years",
            description: "Display years of experience for each skill",
          },
          showStatus: {
            type: "boolean",
            label: "Show Status Badges",
            description: "Display status badges (learning/proficient/expert)",
          },
          showCategories: {
            type: "boolean",
            label: "Show Categories",
            description: "Group skills by category",
          },
        },
        defaultStyles: {
          backgroundColor: "#ffffff",
          textColor: "#1f2937",
          primaryColor: "#3b82f6",
          secondaryColor: "#6b7280",
          cardBackgroundColor: "#f9fafb",
          paddingY: "80",
          paddingX: "16",
          textAlign: "center",
          fontSize: "base",
          fontWeight: "normal",
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
                "Full-stack e-commerce platform with user authentication, product management, and payment processing",
              longDescription:
                "Developed a comprehensive e-commerce platform with user authentication, product catalog, shopping cart, and payment integration. Built with modern technologies including React, Node.js, and MongoDB. Features include real-time inventory updates, order tracking, and admin dashboard.",
              technologies: [
                "React.js",
                "Node.js",
                "MongoDB",
                "Express.js",
                "Stripe API",
                "JWT",
                "Redux",
                "Material-UI",
              ],
              liveUrl: "https://example-ecommerce.com",
              githubUrl: "https://github.com/johndoe/ecommerce-platform",
              featured: true,
              status: "completed",
            },
            {
              id: "02",
              title: "Task Management App",
              category: "Web Application",
              year: "2023",
              description:
                "Collaborative task management application with real-time updates and team features",
              longDescription:
                "Built a collaborative task management application with real-time updates, team collaboration features, and project tracking. Implemented WebSocket connections for live updates and user notifications.",
              technologies: [
                "React.js",
                "Node.js",
                "Socket.io",
                "PostgreSQL",
                "Express.js",
                "JWT",
                "Bootstrap",
              ],
              liveUrl: "https://example-tasks.com",
              githubUrl: "https://github.com/johndoe/task-manager",
              featured: true,
              status: "completed",
            },
            {
              id: "03",
              title: "Weather Dashboard",
              category: "Web Application",
              year: "2023",
              description:
                "Interactive weather dashboard with location-based forecasts and data visualization",
              longDescription:
                "Created an interactive weather dashboard that provides location-based weather forecasts with data visualization. Features include 7-day forecasts, weather maps, and historical data analysis.",
              technologies: [
                "React.js",
                "Chart.js",
                "Weather API",
                "CSS3",
                "JavaScript",
                "Local Storage",
              ],
              liveUrl: "https://example-weather.com",
              githubUrl: "https://github.com/johndoe/weather-dashboard",
              featured: false,
              status: "completed",
            },
            {
              id: "04",
              title: "Blog Platform",
              category: "Web Application",
              year: "2022",
              description:
                "Content management system for blogging with rich text editor and comment system",
              longDescription:
                "Developed a full-featured blog platform with rich text editor, comment system, user authentication, and admin panel. Includes features like post scheduling, category management, and SEO optimization.",
              technologies: [
                "Next.js",
                "Node.js",
                "MongoDB",
                "Express.js",
                "Quill.js",
                "JWT",
                "Tailwind CSS",
              ],
              liveUrl: "https://example-blog.com",
              githubUrl: "https://github.com/johndoe/blog-platform",
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
          paddingY: "12",
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
      {
        id: "minimal-projects",
        name: "Minimal Projects",
        description:
          "Beautiful bento grid layout with gradient overlays, featured projects, and dynamic sizing",
        component: ProjectsComponents.MinimalProjects,
        thumbnail: "/thumbnails/minimal-projects.jpg",
        category: "content",
        tags: [
          "projects",
          "minimal",
          "bento",
          "grid",
          "portfolio",
          "featured",
          "modern",
        ],
        theme: "minimal",
        isPopular: true,
        defaultProps: {
          title: "Projects",
          subtitle: "My Work",
          description: "A collection of projects I've built and contributed to",
          projects: [
            {
              title: "E-Commerce Platform",
              description:
                "A full-stack e-commerce solution with real-time inventory management and payment processing.",
              image:
                "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop",
              tags: ["React", "Node.js", "MongoDB", "Stripe"],
              link: "https://example.com",
              github: "https://github.com",
              featured: true,
              size: "large",
            },
            {
              title: "Task Manager App",
              description:
                "Collaborative task management tool with real-time updates and team features.",
              image:
                "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop",
              tags: ["Next.js", "TypeScript", "Prisma"],
              link: "https://example.com",
              size: "medium",
            },
            {
              title: "Weather Dashboard",
              description:
                "Beautiful weather app with forecasts and interactive maps.",
              image:
                "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&h=600&fit=crop",
              tags: ["React", "API Integration"],
              link: "https://example.com",
              size: "small",
            },
            {
              title: "Portfolio Builder",
              description:
                "SaaS platform for creating stunning portfolios without code.",
              image:
                "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
              tags: ["Vue.js", "Firebase", "Tailwind"],
              github: "https://github.com",
              size: "medium",
            },
            {
              title: "AI Chat Bot",
              description:
                "Intelligent chatbot with natural language processing capabilities.",
              image:
                "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&h=600&fit=crop",
              tags: ["Python", "OpenAI", "Flask"],
              size: "small",
            },
            {
              title: "Social Media Analytics",
              description:
                "Comprehensive analytics dashboard for social media insights and metrics.",
              image:
                "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
              tags: ["React", "D3.js", "Express"],
              featured: true,
              size: "large",
            },
          ],
          showTags: true,
          showLinks: true,
          bentoLayout: true,
        },
        propsSchema: {
          title: {
            type: "text",
            label: "Section Title",
            description: "The main title for the projects section",
            placeholder: "Enter section title...",
          },
          subtitle: {
            type: "text",
            label: "Section Subtitle",
            description: "The subtitle displayed above the main title",
            placeholder: "Enter subtitle...",
          },
          description: {
            type: "textarea",
            label: "Description",
            description: "Brief description of your projects",
            placeholder: "Enter description...",
          },
          projects: {
            type: "array",
            label: "Projects",
            description: "Your project portfolio",
            itemSchema: {
              title: {
                type: "text",
                label: "Project Title",
                description: "Name of the project",
                placeholder: "e.g., E-Commerce Platform",
              },
              description: {
                type: "textarea",
                label: "Description",
                description: "Brief description of the project",
                placeholder: "Describe your project...",
              },
              image: {
                type: "text",
                label: "Image URL",
                description: "Project image URL",
                placeholder: "https://...",
              },
              tags: {
                type: "array",
                label: "Tags",
                description: "Technologies used",
                itemSchema: {
                  tag: {
                    type: "text",
                    label: "Tag",
                    description: "Technology or tag name",
                    placeholder: "e.g., React",
                  },
                },
              },
              link: {
                type: "text",
                label: "Live Demo URL",
                description: "Link to live project",
                placeholder: "https://...",
              },
              github: {
                type: "text",
                label: "GitHub URL",
                description: "Link to source code",
                placeholder: "https://github.com/...",
              },
              featured: {
                type: "boolean",
                label: "Featured",
                description: "Mark as featured project",
              },
              size: {
                type: "select",
                label: "Size",
                description: "Project card size in bento layout",
                options: [
                  { value: "wide", label: "Wide" },
                  { value: "tall", label: "Tall" },
                  { value: "big", label: "Big" },
                ],
              },
              color: {
                type: "text",
                label: "Accent Color",
                description: "Custom accent color for this project (hex code)",
                placeholder: "#3b82f6",
              },
            },
          },
          showTags: {
            type: "boolean",
            label: "Show Tags",
            description: "Display technology tags for each project",
          },
          showLinks: {
            type: "boolean",
            label: "Show Links",
            description: "Display links to live demo and GitHub",
          },
          bentoLayout: {
            type: "boolean",
            label: "Bento Layout",
            description: "Use bento grid layout with dynamic sizing",
          },
        },
        defaultStyles: {
          backgroundColor: "#ffffff",
          textColor: "#1f2937",
          primaryColor: "#3b82f6",
          secondaryColor: "#6b7280",
          paddingY: "80",
          paddingX: "16",
          textAlign: "center",
          fontSize: "base",
          fontWeight: "normal",
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
    variants: [
      {
        id: "minimal-testimonial",
        name: "Minimal Testimonial",
        description:
          "Clean testimonial section with card-based layout, star ratings, and client photos",
        component: TestimonialsComponents.MinimalTestimonial,
        thumbnail: "/thumbnails/minimal-testimonial.jpg",
        category: "layout",
        tags: [
          "testimonials",
          "minimal",
          "clean",
          "cards",
          "ratings",
          "reviews",
          "clients",
        ],
        theme: "minimal",
        isPopular: true,
        defaultProps: {
          title: "Proof in Praise",
          subtitle: "TESTIMONIALS",
          testimonials: [
            {
              id: 1,
              name: "Sarah Johnson",
              role: "Product Manager",
              company: "TechCorp",
              content:
                "Working with this developer was an absolute pleasure. They delivered high-quality code on time and exceeded our expectations. Their attention to detail and problem-solving skills are exceptional.",
              rating: 5,
              image:
                "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
              featured: true,
            },
            {
              id: 2,
              name: "Michael Chen",
              role: "CTO",
              company: "StartupXYZ",
              content:
                "Incredible technical expertise and great communication skills. They helped us build a scalable solution that has been running smoothly for months. Highly recommended!",
              rating: 5,
              image:
                "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
            },
            {
              id: 3,
              name: "Emily Rodriguez",
              role: "Design Lead",
              company: "Creative Agency",
              content:
                "Perfect collaboration between design and development. They understood our vision and brought it to life with pixel-perfect precision. A true professional!",
              rating: 5,
              image:
                "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
            },
          ],
          showRatings: false,
          showQuotes: false,
        },
        propsSchema: {
          title: {
            type: "text",
            label: "Section Title",
            description: "Main heading for the testimonials section",
            placeholder: "What People Say",
          },
          subtitle: {
            type: "text",
            label: "Subtitle",
            description: "Subtitle or description for the section",
            placeholder: "Testimonials from clients and colleagues",
          },
          testimonials: {
            type: "array",
            label: "Testimonials",
            description: "List of client testimonials to display",
          },
          showRatings: {
            type: "boolean",
            label: "Show Star Ratings",
            description: "Display star ratings for each testimonial",
          },
          showQuotes: {
            type: "boolean",
            label: "Show Quote Icons",
            description: "Display quote icons on testimonial cards",
          },
          columns: {
            type: "select",
            label: "Columns",
            description: "Number of columns to display testimonials",
            options: [
              { value: "1", label: "1 Column" },
              { value: "2", label: "2 Columns" },
              { value: "3", label: "3 Columns" },
            ],
          },
        },
        defaultStyles: {
          backgroundColor: "#f9fafb",
          textColor: "#111827",
          primaryColor: "#2563eb",
          secondaryColor: "#6b7280",
          paddingY: "64",
          paddingX: "16",
          textAlign: "center",
          fontSize: "base",
          fontWeight: "normal",
          borderRadius: "24",
          shadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        },
      },
    ],
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
              value: "john.doe@example.com",
              link: "mailto:john.doe@example.com",
            },
            {
              icon: "phone",
              label: "Phone",
              value: "+1-555-123-4567",
              link: "tel:+15551234567",
            },
            {
              icon: "mappin",
              label: "Location",
              value: "San Francisco, CA",
              link: "https://maps.google.com/?q=San+Francisco,CA",
            },
            {
              icon: "linkedin",
              label: "LinkedIn",
              value: "linkedin.com/in/johndoe",
              link: "https://linkedin.com/in/johndoe",
            },
            {
              icon: "github",
              label: "GitHub",
              value: "github.com/johndoe",
              link: "https://github.com/johndoe",
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
          paddingY: "12",
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
              value: "john.doe@example.com",
              link: "mailto:john.doe@example.com",
            },
            {
              icon: "phone",
              label: "Phone",
              value: "+1-555-123-4567",
              link: "tel:+15551234567",
            },
            {
              icon: "mappin",
              label: "Location",
              value: "San Francisco, CA",
              link: "https://maps.google.com/?q=San+Francisco,CA",
            },
            {
              icon: "linkedin",
              label: "LinkedIn",
              value: "linkedin.com/in/johndoe",
              link: "https://linkedin.com/in/johndoe",
            },
            {
              icon: "github",
              label: "GitHub",
              value: "github.com/johndoe",
              link: "https://github.com/johndoe",
            },
          ],
          showContactForm: true,
          formTitle: "DROP A LINE",
          formSubtitle: "Let's chat!",
        },
        defaultStyles: {
          backgroundColor: "#fffef7",
          textColor: "#111111",
          primaryColor: "#ff6b35",
          secondaryColor: "#666666",
          accentColor: "#ffd23f",
          borderColor: "#000000",
          shadowColor: "#000000",
          cardBackgroundColor: "#ffffff",
          successColor: "#10b981",
          paddingY: "12",
          paddingX: "32",
          textAlign: "left",
          fontSize: "4xl",
          fontWeight: "black",
          borderRadius: "0",
          shadow: "4px 4px 0px #000",
          borderWidth: "4",
        },
      },
      {
        id: "minimal-contact",
        name: "Minimal Contact",
        description:
          "Clean card-based contact section with email card, social links, and QR code",
        component: ContactComponents.MinimalContact,
        thumbnail: "/thumbnails/minimal-contact.jpg",
        category: "layout",
        tags: [
          "contact",
          "minimal",
          "clean",
          "cards",
          "email",
          "social",
          "qr-code",
          "resume",
        ],
        theme: "minimal",
        isPopular: true,
        defaultProps: {
          title: "Let's Work Together",
          subtitle: "Ready to start your next project?",
          description:
            "I'm always interested in new opportunities and collaborations. Whether you have a project in mind or just want to chat about technology, feel free to reach out!",
          contactMethods: [
            {
              type: "email",
              label: "Email",
              value: "tanmay.patil@hotmail.com",
              href: "mailto:tanmay.patil@hotmail.com",
            },
          ],
          socialLinks: [
            {
              platform: "LinkedIn",
              url: "https://linkedin.com/in/johndoe",
              username: "@johndoe",
            },
            {
              platform: "GitHub",
              url: "https://github.com/johndoe",
              username: "@johndoe",
            },
          ],
          showContactForm: false,
          showQRCode: true,
          qrCodeUrl: "",
          profileImage:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
          resumeUrl: "/resume.pdf",
        },
        propsSchema: {
          title: {
            type: "text",
            label: "Section Title",
            description: "Main heading for the contact section",
            placeholder: "Let's Work Together",
          },
          subtitle: {
            type: "text",
            label: "Subtitle",
            description: "Subtitle for the contact section",
            placeholder: "Ready to start your next project?",
          },
          description: {
            type: "textarea",
            label: "Description",
            description: "Brief description about getting in touch",
            placeholder: "Tell visitors how to reach out...",
          },
          contactMethods: {
            type: "array",
            label: "Contact Methods",
            description: "Ways people can contact you (primarily email)",
          },
          socialLinks: {
            type: "array",
            label: "Social Links",
            description: "Social media links to display (up to 3 shown)",
          },
          showQRCode: {
            type: "boolean",
            label: "Show QR Code",
            description: "Display QR code in the social card",
          },
          qrCodeUrl: {
            type: "text",
            label: "QR Code URL",
            description: "URL to QR code image",
            placeholder: "https://example.com/qr-code.png",
          },
          profileImage: {
            type: "text",
            label: "Profile Image",
            description: "Profile image URL for the social card",
            placeholder: "https://example.com/profile.jpg",
          },
          resumeUrl: {
            type: "text",
            label: "Resume URL",
            description: "URL to downloadable resume file",
            placeholder: "/resume.pdf",
          },
        },
        defaultStyles: {
          backgroundColor: "#ffffff",
          textColor: "#1f2937",
          primaryColor: "#3b82f6",
          secondaryColor: "#6b7280",
          paddingY: "80",
          paddingX: "16",
          textAlign: "center",
          fontSize: "base",
          fontWeight: "normal",
          borderRadius: "12",
          shadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
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
          primaryColor: "#000000",
          secondaryColor: "#6b7280",
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
          backgroundColor: "#fffef7",
          textColor: "#111111",
          primaryColor: "#ff6b35",
          secondaryColor: "#666666",
          borderColor: "#000000",
          paddingY: "16",
          paddingX: "20",
          borderRadius: "0",
          shadow: "4px 4px 0px #000000",
          fontFamily: "monospace",
          fontWeight: "bold",
        },
      },
      {
        id: "minimal-navbar",
        name: "Minimal Navbar",
        description:
          "Clean and minimal navigation bar with simple typography and smooth interactions",
        component: NavbarComponents.MinimalNavbar,
        thumbnail: "/thumbnails/minimal-navbar.jpg",
        category: "layout",
        tags: [
          "navbar",
          "navigation",
          "minimal",
          "clean",
          "simple",
          "responsive",
        ],
        theme: "minimal",
        isPopular: true,
        defaultProps: {
          logoText: "<TP />",
          logoHref: "#",
          navItems: [
            { label: "About", href: "#about" },
            { label: "Work", href: "#work" },
            { label: "Testimonials", href: "#testimonials" },
            { label: "Contact", href: "#contact" },
          ],
          ctaText: "Download CV",
          ctaHref: "/resume.pdf",
          showCTA: true,
          isFixed: true,
          showBorder: true,
        },
        propsSchema: {
          logoText: {
            type: "text",
            label: "Logo Text",
            description: "Text or symbol for the logo",
            placeholder: "<TP />",
          },
          logoHref: {
            type: "text",
            label: "Logo Link",
            description: "Where the logo should link to",
            placeholder: "#",
          },
          navItems: {
            type: "array",
            label: "Navigation Items",
            description: "Navigation menu items",
          },
          ctaText: {
            type: "text",
            label: "CTA Button Text",
            description: "Text for the call-to-action button",
            placeholder: "Download CV",
          },
          ctaHref: {
            type: "text",
            label: "CTA Button Link",
            description: "Where the CTA button should link to",
            placeholder: "/resume.pdf",
          },
          showCTA: {
            type: "boolean",
            label: "Show CTA Button",
            description: "Display the call-to-action button",
          },
          isFixed: {
            type: "boolean",
            label: "Fixed Position",
            description: "Keep navbar fixed at top when scrolling",
          },
          showBorder: {
            type: "boolean",
            label: "Show Border",
            description: "Display bottom border",
          },
        },
        defaultStyles: {
          backgroundColor: "#ffffff",
          textColor: "#1f2937",
          primaryColor: "#3b82f6",
          secondaryColor: "#6b7280",
          borderColor: "#e5e7eb",
          paddingY: "16",
          paddingX: "24",
          fontSize: "base",
          fontWeight: "medium",
          borderRadius: "0",
          shadow: "none",
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
              url: "https://github.com/johndoe",
              username: "@johndoe",
            },
            {
              platform: "LinkedIn",
              url: "https://linkedin.com/in/johndoe",
              username: "/in/johndoe",
            },
            {
              platform: "Twitter",
              url: "https://twitter.com/johndoe",
              username: "@johndoe",
            },
            {
              platform: "Email",
              url: "mailto:john.doe@example.com",
              username: "john.doe@example.com",
            },
          ],
          contactInfo: {
            email: "john.doe@example.com",
            location: "San Francisco, CA",
            website: "https://johndoe.dev",
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
          backgroundColor: "#ffffff",
          textColor: "#111827",
          primaryColor: "#000000",
          secondaryColor: "#6b7280",
          paddingY: "64",
          paddingX: "24",
          textAlign: "left",
          fontSize: "1rem",
          fontWeight: "400",
          borderRadius: "0",
          shadow: "none",
        },
      },
      {
        id: "minimal-footer",
        name: "Minimal Footer",
        description:
          "Clean three-column footer with brand, quick links, contact info, and social links",
        component: FooterComponents.MinimalFooter,
        thumbnail: "/thumbnails/minimal-footer.jpg",
        category: "layout",
        tags: [
          "footer",
          "minimal",
          "clean",
          "social",
          "contact",
          "links",
          "three-column",
        ],
        theme: "minimal",
        isPopular: true,
        defaultProps: {
          brandName: "John Doe",
          tagline: "Full Stack Developer",
          description: "Building beautiful and functional web experiences.",
          email: "john.doe@example.com",
          phone: "+1 (555) 123-4567",
          location: "San Francisco, CA",
          socialLinks: [
            {
              platform: "GitHub",
              url: "https://github.com/johndoe",
              username: "@johndoe",
            },
            {
              platform: "LinkedIn",
              url: "https://linkedin.com/in/johndoe",
              username: "johndoe",
            },
            {
              platform: "Twitter",
              url: "https://twitter.com/johndoe",
              username: "@johndoe",
            },
          ],
          quickLinks: [
            { label: "About", url: "#about" },
            { label: "Projects", url: "#projects" },
            { label: "Skills", url: "#skills" },
            { label: "Contact", url: "#contact" },
          ],
          showSocialLinks: true,
          showQuickLinks: true,
          showContactInfo: true,
          copyrightText: `© ${new Date().getFullYear()} John Doe. All rights reserved.`,
        },
        propsSchema: {
          brandName: {
            type: "text",
            label: "Brand Name",
            description: "Your name or brand",
            placeholder: "Enter your name...",
          },
          tagline: {
            type: "text",
            label: "Tagline",
            description: "Your tagline or title",
            placeholder: "Enter your tagline...",
          },
          description: {
            type: "textarea",
            label: "Description",
            description: "Brief description about you or your brand",
            placeholder: "Enter description...",
          },
          email: {
            type: "text",
            label: "Email",
            description: "Your email address",
            placeholder: "email@example.com",
          },
          phone: {
            type: "text",
            label: "Phone",
            description: "Your phone number",
            placeholder: "+1 (555) 123-4567",
          },
          location: {
            type: "text",
            label: "Location",
            description: "Your location",
            placeholder: "City, State/Country",
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
          showQuickLinks: {
            type: "boolean",
            label: "Show Quick Links",
            description: "Display quick navigation links",
          },
          showContactInfo: {
            type: "boolean",
            label: "Show Contact Info",
            description: "Display contact information",
          },
        },
        defaultStyles: {
          backgroundColor: "#1f2937",
          textColor: "#f9fafb",
          primaryColor: "#3b82f6",
          secondaryColor: "#9ca3af",
          borderColor: "#374151",
          paddingY: "60",
          paddingX: "16",
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
          primaryColor: "#000000",
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
