"use client";

import { useEffect } from "react";

interface NavigationHelperProps {
  children: React.ReactNode;
}

export default function NavigationHelper({ children }: NavigationHelperProps) {
  useEffect(() => {
    // Add smooth scrolling behavior to the document
    const style = document.createElement("style");
    style.textContent = `
      html {
        scroll-behavior: smooth;
      }
    `;
    document.head.appendChild(style);

    // Enhanced smooth scrolling for anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href^="#"]') as HTMLAnchorElement;

      if (link) {
        e.preventDefault();
        const targetId = link.getAttribute("href")?.substring(1);
        if (targetId) {
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            // Account for fixed navbar height
            const navbarHeight = 80; // Adjust based on your navbar height
            const targetPosition = targetElement.offsetTop - navbarHeight;

            window.scrollTo({
              top: targetPosition,
              behavior: "smooth",
            });
          }
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.head.removeChild(style);
      document.removeEventListener("click", handleAnchorClick);
    };
  }, []);

  return <>{children}</>;
}
