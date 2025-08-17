import React, { useEffect, useRef, useState } from "react";

interface NavigationHelperProps {
  children: React.ReactNode;
  sections?: string[];
  offset?: number;
  smooth?: boolean;
  duration?: number;
}

interface SectionInfo {
  id: string;
  element: HTMLElement;
  top: number;
  bottom: number;
}

const NavigationHelper: React.FC<NavigationHelperProps> = ({
  children,
  sections = [
    "hero",
    "about",
    "skills",
    "portfolioItems",
    "experience",
    "contact",
  ],
  offset = 80,
  smooth = true,
  duration = 800,
}) => {
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [sectionsInfo, setSectionsInfo] = useState<SectionInfo[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Initialize sections and create intersection observer
  useEffect(() => {
    const updateSectionsInfo = () => {
      const info: SectionInfo[] = [];

      sections.forEach((sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          info.push({
            id: sectionId,
            element,
            top: rect.top + window.scrollY,
            bottom: rect.bottom + window.scrollY,
          });
        }
      });

      setSectionsInfo(info);
    };

    // Update sections info on mount and resize
    updateSectionsInfo();
    window.addEventListener("resize", updateSectionsInfo);

    // Create intersection observer for active section detection
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            if (sections.includes(sectionId)) {
              setActiveSection(sectionId);
            }
          }
        });
      },
      {
        rootMargin: `-${offset}px 0px -${offset}px 0px`,
        threshold: 0.1,
      }
    );

    // Observe all sections
    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element && observerRef.current) {
        observerRef.current.observe(element);
      }
    });

    return () => {
      window.removeEventListener("resize", updateSectionsInfo);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [sections, offset]);

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (!element) {
      return;
    }

    const targetPosition = element.offsetTop - offset;

    if (smooth) {
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    } else {
      window.scrollTo(0, targetPosition);
    }

    // Update active section immediately for better UX
    setActiveSection(sectionId);
  };

  // Scroll to top
  const scrollToTop = () => {
    if (smooth) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      window.scrollTo(0, 0);
    }
    setActiveSection("hero");
  };

  // Get current section based on scroll position
  const getCurrentSection = () => {
    const scrollPosition = window.scrollY + offset;

    for (let i = sectionsInfo.length - 1; i >= 0; i--) {
      const section = sectionsInfo[i];
      if (scrollPosition >= section.top) {
        return section.id;
      }
    }

    return "hero";
  };

  // Update active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentSection = getCurrentSection();
      if (currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection, sectionsInfo]);

  // Expose navigation functions globally for use by other components
  useEffect(() => {
    (window as any).portfolioNavigation = {
      scrollToSection,
      scrollToTop,
      getCurrentSection: () => activeSection,
      getSections: () => sections,
    };

    return () => {
      delete (window as any).portfolioNavigation;
    };
  }, [activeSection, sections]);

  return (
    <>
      {children}
      {/* Navigation context provider - invisible but provides navigation state */}
      <div
        style={{ display: "none" }}
        data-active-section={activeSection}
        data-sections={sections.join(",")}
      />
    </>
  );
};

export default NavigationHelper;
