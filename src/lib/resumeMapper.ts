import { SavePortfolioData } from "@/actions/portfolio-actions";
import { ColorScheme, applyColorScheme, getColorScheme } from "./colorSchemes";
import { generateUniqueSlugWithTimestamp } from "./slugUtils";

export type ResumeJson = {
  basics?: {
    name?: string;
    label?: string;
    email?: string;
    phone?: string;
    location?: string;
    summary?: string;
    profiles?: Array<{ platform: string; url: string; username?: string }>;
    websites?: string[];
  };
  skills?: Array<{
    name: string;
    level?: number;
    category?: string;
    years?: number;
    status?: string;
  }>;
  work?: Array<{
    company?: string;
    position?: string;
    startDate?: string;
    endDate?: string | null;
    location?: string;
    summary?: string;
    highlights?: string[];
    technologies?: string[];
  }>;
  projects?: Array<{
    name: string;
    description?: string;
    highlights?: string[];
    technologies?: string[];
    urls?: {
      live?: string | null;
      github?: string | null;
      caseStudy?: string | null;
      image?: string | null;
    };
    year?: number | string;
    status?: "live" | "development" | "featured" | "archived";
    category?: string;
  }>;
  education?: any[];
};

export type Preset = "minimal" | "typography" | "brutalist";

const toSlug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

const up = (s?: string) => (s ? s.toUpperCase() : undefined);

export function mapResumeToPortfolio(
  resume: ResumeJson,
  preset: Preset = "minimal"
): SavePortfolioData {
  const name = resume.basics?.name || "Imported Portfolio";
  // Generate a unique slug with timestamp to avoid conflicts
  const slug = generateUniqueSlugWithTimestamp(name);

  const layout: SavePortfolioData["layout"] = [] as any;

  // Hero - shared
  layout.push({
    type: "hero",
    variant: preset === "typography" ? "typography-hero" : preset === "minimal" ? "minimal-hero" : "hero-section",
    props: {
      title: preset === "minimal" ? `Hi, I'm ${resume.basics?.name || "John Doe"} 👋` : up(resume.basics?.name) || "YOUR NAME",
      name: up(resume.basics?.name) || "YOUR NAME",
      subtitle: resume.basics?.label || "SOFTWARE DEVELOPER",
      description: resume.basics?.summary || "",
      socialLinks: (resume.basics?.profiles || []).map((p) => ({
        platform: up(p.platform || "") || "",
        url: p.url,
        username: p.username || p.url?.split("/").pop() || "",
      })),
      ctaText: "VIEW MY WORK",
      ctaLink: "#projects",
      showStatus: preset === "typography",
      statusText: preset === "typography" ? "AVAILABLE_FOR_HIRE" : undefined,
      showCodeSnippet: preset === "typography",
      showResumeButton: preset === "minimal",
      resumeUrl: "/resume.pdf",
      resumeText: "Download Resume",
    },
    styles: {},
    order: 0,
    isActive: true,
  });

  // About (timeline)
  const experienceTimeline = (resume.work || []).map((w) => ({
    role: w.position || "",
    company: w.company || "",
    period: [w.startDate, w.endDate || "Present"].filter(Boolean).join(" – "),
    description: w.summary || "",
    highlights: w.highlights || [],
  }));

  if (experienceTimeline.length) {
    layout.push({
      type: "about",
      variant: preset === "minimal" ? "minimal-about" : "neobrutalist-about",
      props: {
        title: preset === "minimal" ? "About Me" : "MY STORY",
        subtitle: preset === "minimal" ? "My Journey" : "THE JOURNEY SO FAR",
        story: resume.basics?.summary || "",
        experience: experienceTimeline,
        showStory: true,
        showExperience: true,
      },
      styles: {},
      order: 1,
      isActive: true,
    });
  }

  // Skills
  const skillsProps = (resume.skills || []).slice(0, 20).map((s) => ({
    name: up(s.name),
    level: s.level ?? 80,
    category: s.category || "GENERAL",
    yearsExperience: s.years ?? 0,
    status: (s.status as any) || "proficient",
  }));

  if (skillsProps.length) {
    layout.push({
      type: "skills",
      variant:
        preset === "brutalist" ? "skills-brutalist" : preset === "minimal" ? "minimal-skills" : "skills-typography",
      props:
        preset === "brutalist"
          ? {
              title: "MY SKILLS",
              subtitle: "TECHNICAL ARSENAL",
              description: "",
              skills: skillsProps.map((s, i) => ({
                ...s,
                projects: Math.max(0, Math.round((s.yearsExperience || 0) * 3)),
                color: [
                  "#ff6b35",
                  "#f7931e",
                  "#ffd23f",
                  "#06ffa5",
                  "#4ecdc4",
                  "#96ceb4",
                ][i % 6],
              })),
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
            }
          : preset === "minimal"
          ? {
              title: "Skills",
              subtitle: "What I Work With",
              description: "",
              skills: skillsProps,
              showLevelBars: true,
              showExperience: false,
              showStatus: false,
              showCategories: true,
            }
          : {
              title: "SKILLS.EXE",
              subtitle: "TECHNICAL EXPERTISE",
              description: "",
              skills: skillsProps,
              showProficiency: true,
              showExperience: true,
              showStatus: true,
            },
      styles: {},
      order: 2,
      isActive: true,
    });
  }

  // Projects - brutalist looks great here
  const projectColor = ["#ffd23f", "#ff6b35", "#06ffa5", "#4ecdc4", "#96ceb4"];
  const projectsProps = (resume.projects || []).slice(0, 6).map((p, idx) => ({
    id: String(idx + 1),
    title: up(p.name),
    description: p.description || p.highlights?.[0] || "",
    category: up(p.category || "PROJECT"),
    status: (p.status as any) || (p.urls?.live ? "live" : "development"),
    year: String(p.year || new Date().getFullYear()),
    technologies: (p.technologies || [])
      .map((t) => up(t))
      .filter(Boolean) as string[],
    image: p.urls?.image || undefined,
    liveUrl: p.urls?.live || undefined,
    githubUrl: p.urls?.github || undefined,
    caseStudyUrl: p.urls?.caseStudy || undefined,
    color: projectColor[idx % projectColor.length],
    priority: "high",
  }));

  if (projectsProps.length) {
    layout.push({
      type: "projects",
      variant: preset === "minimal" ? "minimal-projects" : "projects-brutalist",
      props: preset === "minimal" ? {
        title: "Projects",
        subtitle: "Things I've Built",
        projects: projectsProps,
        showTechnologies: true,
        showStatus: false,
        showYear: true,
        showLinks: true,
        showImages: true,
      } : {
        title: "MY PROJECTS",
        subtitle: "BUILT WITH PASSION",
        projects: projectsProps,
        showTechnologies: true,
        showStatus: true,
        showYear: true,
        showLinks: true,
        showImages: false,
        animateOnScroll: true,
        layoutStyle: "tilted",
        filterByStatus: false,
        sortBy: "priority",
        showNoise: true,
        brutalistShadows: true,
        maxTilt: 8,
      },
      styles: {},
      order: 3,
      isActive: true,
    });
  }

  // Contact
  const contactMethods: Array<{
    icon: string;
    label: string;
    value: string;
    link: string;
  }> = [];
  if (resume.basics?.email)
    contactMethods.push({
      icon: "mail",
      label: "Email",
      value: resume.basics.email,
      link: `mailto:${resume.basics.email}`,
    });
  if (resume.basics?.phone)
    contactMethods.push({
      icon: "phone",
      label: "Phone",
      value: resume.basics.phone,
      link: `tel:${resume.basics.phone}`,
    });
  if (resume.basics?.location)
    contactMethods.push({
      icon: "mappin",
      label: "Location",
      value: resume.basics.location,
      link: `https://maps.google.com/?q=${encodeURIComponent(
        resume.basics.location
      )}`,
    });
  (resume.basics?.profiles || []).forEach((p) => {
    const icon = (p.platform || "").toLowerCase();
    contactMethods.push({
      icon,
      label: p.platform,
      value: p.username || p.url,
      link: p.url,
    });
  });

  if (contactMethods.length) {
    layout.push({
      type: "contact",
      variant: preset === "minimal" ? "minimal-contact" : "neobrutalist-contact",
      props: preset === "minimal" ? {
        title: "Let's Work Together",
        subtitle: "Ready to start your next project?",
        description: "I'm always interested in new opportunities and collaborations. Whether you have a project in mind or just want to chat about technology, feel free to reach out!",
        contactMethods: contactMethods.map(method => ({
          type: method.icon === "mail" ? "email" : method.icon === "phone" ? "phone" : "location",
          label: method.label,
          value: method.value,
          href: method.link,
        })),
        socialLinks: (resume.basics?.profiles || []).map((p) => ({
          platform: p.platform || "",
          url: p.url,
          username: p.username || p.url?.split("/").pop() || "",
        })),
        showContactForm: false,
        showQRCode: true,
        resumeUrl: "/resume.pdf",
      } : {
        title: "GET IN TOUCH",
        subtitle: "LET'S CREATE SOMETHING AMAZING",
        description: "",
        contactMethods,
        showContactForm: false,
      },
      styles: {},
      order: 4,
      isActive: true,
    });
  }

  return {
    name: `${name}'s Portfolio`,
    slug,
    description: "Imported from resume",
    layout,
    isPublic: false,
  };
}

// Registry-based mapping: start from variant.defaultProps/defaultStyles and overlay resume-derived props
import {
  componentRegistry,
  getComponentVariant,
} from "@/lib/portfolio/registry";
import type { PortfolioComponent } from "@/actions/portfolio-actions";

type ChosenVariants = {
  hero: string;
  about?: string;
  skills?: string;
  projects?: string;
  contact?: string;
  colorScheme?: string;
};

function createFromRegistry<T extends keyof typeof componentRegistry>(
  section: T,
  variantId: string,
  overrides: Record<string, any>,
  order: number,
  colorScheme?: ColorScheme
): PortfolioComponent {
  const variant = getComponentVariant(section, variantId);
  if (!variant)
    throw new Error(`Variant not found: ${String(section)}/${variantId}`);

  let styles = { ...(variant.defaultStyles || {}) };

  // Apply color scheme if provided
  if (colorScheme) {
    styles = applyColorScheme(styles, colorScheme);
  }

  return {
    id: undefined,
    type: section,
    variant: variant.id,
    props: { ...(variant.defaultProps || {}), ...overrides },
    styles,
    order,
    isActive: true,
  };
}

export function mapWithRegistry(
  resume: ResumeJson,
  chosen: ChosenVariants
): SavePortfolioData {
  const name = resume.basics?.name || "Imported Portfolio";
  // Generate a unique slug with timestamp to avoid conflicts
  const slug = generateUniqueSlugWithTimestamp(name);

  const layout: PortfolioComponent[] = [];

  // Get color scheme
  const colorScheme = chosen.colorScheme
    ? getColorScheme(chosen.colorScheme)
    : undefined;

  // Hero (required)
  const socialLinks = (resume.basics?.profiles || []).map((p) => ({
    platform:
      (p.platform || "").charAt(0).toUpperCase() +
      (p.platform || "").slice(1).toLowerCase(),
    url: p.url?.startsWith("http") ? p.url : `https://${p.url}`,
    username: p.username || p.url?.split("/").pop() || "",
  }));

  // Extract individual social URLs for hero-section variant
  const githubProfile = socialLinks.find(
    (p) => p.platform.toLowerCase() === "github"
  );
  const linkedinProfile = socialLinks.find(
    (p) => p.platform.toLowerCase() === "linkedin"
  );
  const emailProfile = socialLinks.find(
    (p) =>
      p.platform.toLowerCase() === "email" || p.platform.toLowerCase() === "web"
  );

  const heroProps = {
    title: up(resume.basics?.name) || "YOUR NAME",
    subtitle: up(resume.basics?.label) || "SOFTWARE DEVELOPER",
    description: resume.basics?.summary || "",
  };

  // Add social links based on variant
  if (chosen.hero === "hero-section") {
    // HeroSections component expects individual URL props
    Object.assign(heroProps, {
      showSocialLinks: true,
      githubUrl: githubProfile?.url || "https://github.com",
      linkedinUrl: linkedinProfile?.url || "https://linkedin.com",
      emailUrl: resume.basics?.email
        ? `mailto:${resume.basics.email}`
        : "mailto:example@email.com",
    });
  } else {
    // Other hero variants expect socialLinks array
    Object.assign(heroProps, {
      socialLinks,
    });
  }

  layout.push(
    createFromRegistry("hero", chosen.hero, heroProps, 0, colorScheme)
  );

  // About (optional)
  const experience = (resume.work || []).map((w) => ({
    role: w.position || "",
    company: w.company || "",
    period: [w.startDate, w.endDate || "Present"].filter(Boolean).join(" – "),
    description: w.summary || "",
    highlights: w.highlights || [],
  }));
  if (chosen.about && experience.length) {
    layout.push(
      createFromRegistry(
        "about",
        chosen.about,
        {
          title: "MY STORY",
          subtitle: "THE JOURNEY SO FAR",
          story: resume.basics?.summary || "",
          experience,
          showStory: true,
          showExperience: true,
        },
        1,
        colorScheme
      )
    );
  }

  // Skills (optional)
  const skillsArr = (resume.skills || []).slice(0, 20).map((s) => ({
    name: up(s.name),
    level: s.level ?? 80,
    category: s.category || "GENERAL",
    yearsExperience: s.years ?? 0,
    status: (s.status as any) || "proficient",
  }));
  if (chosen.skills && skillsArr.length) {
    layout.push(
      createFromRegistry(
        "skills",
        chosen.skills,
        {
          title:
            chosen.skills === "skills-brutalist" ? "MY SKILLS" : "SKILLS.EXE",
          subtitle:
            chosen.skills === "skills-brutalist"
              ? "TECHNICAL ARSENAL"
              : "TECHNICAL EXPERTISE",
          description: "",
          skills: skillsArr,
          showProficiency: true,
          showExperience: true,
          showStatus: true,
        },
        2,
        colorScheme
      )
    );
  }

  // Projects (optional)
  const colors = ["#ffd23f", "#ff6b35", "#06ffa5", "#4ecdc4", "#96ceb4"];
  const projects = (resume.projects || []).slice(0, 6).map((p, i) => ({
    id: String(i + 1),
    title: up(p.name),
    description: p.description || p.highlights?.[0] || "",
    category: up(p.category || "PROJECT"),
    status: (p.status as any) || (p.urls?.live ? "live" : "development"),
    year: String(p.year || new Date().getFullYear()),
    technologies: (p.technologies || [])
      .map((t) => up(t))
      .filter(Boolean) as string[],
    image: p.urls?.image || undefined,
    liveUrl: p.urls?.live || undefined,
    githubUrl: p.urls?.github || undefined,
    caseStudyUrl: p.urls?.caseStudy || undefined,
    color: colors[i % colors.length],
    priority: "high",
  }));
  if (chosen.projects && projects.length) {
    layout.push(
      createFromRegistry(
        "projects",
        chosen.projects,
        {
          title: "MY PROJECTS",
          subtitle: "BUILT WITH PASSION",
          projects,
          showTechnologies: true,
          showStatus: true,
          showYear: true,
          showLinks: true,
          showImages: false,
        },
        3,
        colorScheme
      )
    );
  }

  // Contact (optional)
  const contactMethods: Array<{
    icon: string;
    label: string;
    value: string;
    link: string;
  }> = [];
  if (resume.basics?.email)
    contactMethods.push({
      icon: "mail",
      label: "Email",
      value: resume.basics.email,
      link: `mailto:${resume.basics.email}`,
    });
  if (resume.basics?.phone)
    contactMethods.push({
      icon: "phone",
      label: "Phone",
      value: resume.basics.phone,
      link: `tel:${resume.basics.phone}`,
    });
  if (resume.basics?.location)
    contactMethods.push({
      icon: "mappin",
      label: "Location",
      value: resume.basics.location,
      link: `https://maps.google.com/?q=${encodeURIComponent(
        resume.basics.location
      )}`,
    });
  (resume.basics?.profiles || []).forEach((p) => {
    const icon = (p.platform || "").toLowerCase();
    contactMethods.push({
      icon,
      label: p.platform,
      value: p.username || p.url,
      link: p.url?.startsWith("http") ? p.url : `https://${p.url}`,
    });
  });
  if (chosen.contact && contactMethods.length) {
    layout.push(
      createFromRegistry(
        "contact",
        chosen.contact,
        {
          title: "GET IN TOUCH",
          subtitle: "LET'S CREATE SOMETHING AMAZING",
          description: "",
          contactMethods,
          showContactForm: false,
        },
        4,
        colorScheme
      )
    );
  }

  return {
    name: `${name}'s Portfolio`,
    slug,
    description: "Imported from resume",
    layout,
    isPublic: false,
  };
}
