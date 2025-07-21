export interface PortfolioSection {
  id: string;
  type: string;
  variant: string;
  props: Record<string, any>;
  styles?: Record<string, any>;
  order: number;
  isActive: boolean;
}

export interface NavigationLink {
  label: string;
  href: string;
}

// Map section types to display names
const sectionTypeLabels: Record<string, string> = {
  hero: "Home",
  about: "About",
  skills: "Skills",
  projects: "Projects",
  experience: "Experience",
  education: "Education",
  testimonials: "Testimonials",
  contact: "Contact",
  navbar: "Navigation",
  footer: "Footer",
  custom: "Custom",
};

// Generate navigation links from portfolio sections
export function generateNavigationLinks(
  sections: PortfolioSection[]
): NavigationLink[] {
  const links: NavigationLink[] = [];

  // Filter out navbar and footer sections, and sort by order
  const navigationSections = sections
    .filter((section) => section.type !== "navbar" && section.type !== "footer")
    .sort((a, b) => a.order - b.order);

  navigationSections.forEach((section) => {
    const label =
      sectionTypeLabels[section.type] ||
      section.type.charAt(0).toUpperCase() + section.type.slice(1);
    const href = `#${section.type === "hero" ? "home" : section.type}`;

    // Check if this section type is already added (avoid duplicates)
    const existingLink = links.find((link) => link.href === href);
    if (!existingLink) {
      links.push({ label, href });
    }
  });

  return links;
}

// Get section display name
export function getSectionDisplayName(sectionType: string): string {
  return (
    sectionTypeLabels[sectionType] ||
    sectionType.charAt(0).toUpperCase() + sectionType.slice(1)
  );
}
