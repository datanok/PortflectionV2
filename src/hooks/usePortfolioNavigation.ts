import { useEffect, useState } from "react";

interface NavigationFunctions {
  scrollToSection: (sectionId: string) => void;
  scrollToTop: () => void;
  getCurrentSection: () => string;
  getSections: () => string[];
}

interface UsePortfolioNavigationReturn extends NavigationFunctions {
  activeSection: string;
  isNavigationAvailable: boolean;
}

export const usePortfolioNavigation = (): UsePortfolioNavigationReturn => {
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [isNavigationAvailable, setIsNavigationAvailable] = useState(false);

  useEffect(() => {
    // Check if navigation is available
    const checkNavigation = () => {
      const navigation = (window as any).portfolioNavigation;
      if (navigation) {
        setIsNavigationAvailable(true);
        // Update active section from global navigation
        setActiveSection(navigation.getCurrentSection());
      }
    };

    // Check immediately and on window load
    checkNavigation();
    window.addEventListener("load", checkNavigation);

    // Listen for navigation updates
    const handleNavigationUpdate = () => {
      const navigation = (window as any).portfolioNavigation;
      if (navigation) {
        setActiveSection(navigation.getCurrentSection());
      }
    };

    // Create a custom event listener for navigation updates
    window.addEventListener(
      "portfolio-navigation-update",
      handleNavigationUpdate
    );

    return () => {
      window.removeEventListener("load", checkNavigation);
      window.removeEventListener(
        "portfolio-navigation-update",
        handleNavigationUpdate
      );
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const navigation = (window as any).portfolioNavigation;
    if (navigation) {
      navigation.scrollToSection(sectionId);
      setActiveSection(sectionId);
    }
  };

  const scrollToTop = () => {
    const navigation = (window as any).portfolioNavigation;
    if (navigation) {
      navigation.scrollToTop();
      setActiveSection("home");
    }
  };

  const getCurrentSection = (): string => {
    const navigation = (window as any).portfolioNavigation;
    return navigation ? navigation.getCurrentSection() : activeSection;
  };

  const getSections = (): string[] => {
    const navigation = (window as any).portfolioNavigation;
    return navigation ? navigation.getSections() : [];
  };

  return {
    activeSection,
    isNavigationAvailable,
    scrollToSection,
    scrollToTop,
    getCurrentSection,
    getSections,
  };
};
