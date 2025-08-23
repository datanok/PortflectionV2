"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// Enhanced mapping for better breadcrumb titles
const getBreadcrumbTitle = (segment: string) => {
  const titleMap: Record<string, string> = {
    dashboard: "Dashboard",
    portfolio: "Portfolio",
    portfolios: "Portfolios",
    builder: "Builder",
    edit: "Edit",
    new: "New",
    settings: "Settings",
    analytics: "Analytics",
    admin: "Admin",
    components: "Components",

    submit: "Submit",
    review: "Review",
    users: "Users",
    test: "Test",
    debug: "Debug",
    api: "API",
    auth: "Authentication",
    signin: "Sign In",
    signup: "Sign Up",
    "email-verified": "Email Verified",
    "privacy-policy": "Privacy Policy",
    terms: "Terms of Service",
    themes: "Themes",
    preview: "Preview",
    "my-portfolios": "My Portfolios",
    "portfolio-builder": "Portfolio Builder",
  };

  return titleMap[segment.toLowerCase()] || formatTitle(segment);
};

// Function to format breadcrumb titles
const formatTitle = (segment: string) => {
  return segment
    .replace(/-/g, " ") // Replace dashes with spaces
    .replace(/\b\w/g, (char) => char.toUpperCase()) // Capitalize first letter
    .replace(/\b\w+/g, (word) => {
      // Handle common abbreviations
      const abbreviations: Record<string, string> = {
        api: "API",
        ui: "UI",
        ux: "UX",
        cv: "CV",
        faq: "FAQ",
        cta: "CTA",
      };
      return abbreviations[word.toLowerCase()] || word;
    });
};

// Check if path should be hidden from breadcrumbs
const shouldHideSegment = (segment: string) => {
  const hiddenSegments = ["(public)", "(auth)", "page", "route", "layout"];
  return hiddenSegments.includes(segment);
};

export default function DynamicBreadcrumb() {
  const pathname = usePathname();
  const pathSegments = pathname
    .split("/")
    .filter((segment) => segment && !shouldHideSegment(segment));
  const isPortfolioEdit = pathname?.includes("/dashboard/portfolios/edit/");

  // Don't show breadcrumb on home page or if only dashboard
  if (
    pathSegments.length === 0 ||
    (pathSegments.length === 1 && pathSegments[0] === "dashboard") ||
    isPortfolioEdit
  ) {
    return null;
  }

  return (
    <div className="w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4 py-2">
        <Breadcrumb>
          <BreadcrumbList className="flex items-center space-x-1 text-sm">
            {/* Dashboard link - only show if not already on dashboard */}
            {pathSegments[0] !== "dashboard" && (
              <>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href="/dashboard"
                    className="hover:text-primary transition-colors duration-200 text-muted-foreground hover:text-foreground"
                  >
                    Dashboard
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-muted-foreground">
                  <ChevronRight className="w-3 h-3" />
                </BreadcrumbSeparator>
              </>
            )}

            {pathSegments.map((segment, index) => {
              const isLast = index === pathSegments.length - 1;
              const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
              const title = getBreadcrumbTitle(segment);

              return (
                <React.Fragment key={href}>
                  <BreadcrumbItem>
                    {isLast ? (
                      <BreadcrumbPage className="font-medium text-foreground">
                        <span className="hidden sm:inline">{title}</span>
                        <span className="sm:hidden">
                          {title.length > 12
                            ? title.substring(0, 12) + "..."
                            : title}
                        </span>
                      </BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink
                        href={href}
                        className="hover:text-primary transition-colors duration-200 text-muted-foreground hover:text-foreground"
                      >
                        <span className="hidden sm:inline">{title}</span>
                        <span className="sm:hidden">
                          {title.length > 12
                            ? title.substring(0, 12) + "..."
                            : title}
                        </span>
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                  {!isLast && (
                    <BreadcrumbSeparator className="text-muted-foreground">
                      <ChevronRight className="w-3 h-3" />
                    </BreadcrumbSeparator>
                  )}
                </React.Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
}
