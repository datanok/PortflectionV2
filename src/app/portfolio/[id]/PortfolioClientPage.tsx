"use client";
import { Suspense, useEffect } from "react";
import { authClient } from "../../../../auth-client";
import {
  componentRegistry,
  getComponentVariant,
} from "@/lib/portfolio/registry";
import { NavigationHelper } from "@/components/portfolio/sections/navbar";

interface GlobalTheme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  card: string;
  muted: string;
  fontHeading: string;
  fontBody: string;
  spacingBase: number;
  spacingSection: number;
  spacingComponent: number;
  mode: string;
  borderRadius: number;
  shadowIntensity: number;
  animationSpeed: number;
}

interface PortfolioComponent {
  id: string;
  type: string;
  variant: string;
  props: Record<string, any>;
  styles?: Record<string, any>;
  order: number;
  isActive: boolean;
}

interface PortfolioData {
  id: string;
  name: string;
  slug: string;
  description?: string;
  theme?: GlobalTheme;
  components: PortfolioComponent[];
  userId: string;
  isPublic: boolean;
  portfolioType: string;
  // Legacy fields for backward compatibility
  title?: string;
  email?: string;
  phone?: string;
  location?: string;
  about?: string;
  profileImage?: string;
  contactForm?: boolean;
  linkedinLink?: string;
  personalWebsite?: string;
  socials?: any;
  extraData?: any;
}

export default function PortfolioClientPage({
  portfolioData,
  isPreview = false,
}: {
  portfolioData: PortfolioData;
  portfolioType: string;
  isPreview?: boolean;
}) {
  const { data, isPending } = authClient.useSession();

  useEffect(() => {
    if (isPending || !portfolioData.id) return;

    if (!isPreview) {
      const cookieName = `portfolio_viewed_${portfolioData.id}`;
      if (!document.cookie.includes(cookieName)) {
        const userId = data?.user?.id;

        const urlParams = new URLSearchParams(window.location.search);
        const utmSource = urlParams.get("utm_source");

        fetch("/api/portfolio/view", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: portfolioData.id, userId, utmSource }),
        });
      }
    }
  }, [portfolioData.id, data?.user?.id, isPending, isPreview]);

  // If preview and user session not loaded or user does not own portfolio, show message or redirect
  if (
    isPreview &&
    !isPending &&
    (!data || data.user.id !== portfolioData.userId)
  ) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-muted-foreground">
            You are not authorized to preview this portfolio.
          </p>
        </div>
      </div>
    );
  }

  // Get the global theme from portfolio data
  const globalTheme = portfolioData.theme || {
    primary: "#3b82f6",
    secondary: "#64748b",
    accent: "#8b5cf6",
    background: "#ffffff",
    card: "#f8fafc",
    muted: "#f1f5f9",
    fontHeading: "Inter",
    fontBody: "Inter",
    spacingBase: 1,
    spacingSection: 2,
    spacingComponent: 1.25,
    mode: "light",
    borderRadius: 0.5,
    shadowIntensity: 50,
    animationSpeed: 300,
  };

  // Sort components by order
  const sortedComponents = portfolioData.components
    .filter((comp) => comp.isActive)
    .sort((a, b) => a.order - b.order);

  // Get section IDs from component types
  const sectionIds = sortedComponents.map((comp) => comp.type);

  // Check if portfolio uses Neo-Brutalist theme
  const isNeoBrutalist = sortedComponents.some((comp) =>
    comp.variant?.toLowerCase().includes("neobrutalist")
  );

  return (
    <NavigationHelper sections={sectionIds}>
      <div
        className="min-h-screen"
        style={{
          backgroundColor: globalTheme.background,
          fontFamily: globalTheme.fontBody,
        }}
      >
        <Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
            </div>
          }
        >
          {isNeoBrutalist ? (
            <div
              style={
                {
                  // maxWidth: "1400px",
                  // backgroundColor: "#f5f5f5",
                  // borderRadius: "24px",
                  // overflow: "hidden",
                  // boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                }
              }
            >
              {sortedComponents.map((component) => {
                try {
                  // Get the component variant from the registry
                  const variant = getComponentVariant(
                    component.type as any,
                    component.variant
                  );

                  if (!variant) {
                    console.warn(
                      `Component variant not found: ${component.type}/${component.variant}`
                    );
                    return null;
                  }

                  const Component = variant.component;

                  // Merge default props with component props and global theme
                  const mergedProps = {
                    ...variant.defaultProps,
                    ...component.props,
                    globalTheme,
                    ...component.styles,
                    // Pass sections data to navbar components for dynamic navigation
                    ...(component.type === "navbar" && {
                      sections: sortedComponents,
                    }),
                  };

                  return (
                    <div
                      key={component.id}
                      className="w-full"
                      style={{
                        paddingTop: "5px",
                        paddingLeft: "5px",
                        paddingRight: "5px",
                      }}
                    >
                      <section id={component.type}>
                        <Component {...mergedProps} />
                      </section>
                    </div>
                  );
                } catch (error) {
                  console.error(
                    `Error rendering component ${component.type}/${component.variant}:`,
                    error
                  );
                  return (
                    <div
                      key={component.id}
                      className="p-8 text-center text-muted-foreground"
                    >
                      <p>Error loading component: {component.type}</p>
                    </div>
                  );
                }
              })}
            </div>
          ) : (
            sortedComponents.map((component) => {
              try {
                // Get the component variant from the registry
                const variant = getComponentVariant(
                  component.type as any,
                  component.variant
                );

                if (!variant) {
                  console.warn(
                    `Component variant not found: ${component.type}/${component.variant}`
                  );
                  return null;
                }

                const Component = variant.component;

                // Merge default props with component props and global theme
                const mergedProps = {
                  ...variant.defaultProps,
                  ...component.props,
                  globalTheme,
                  ...component.styles,
                  // Pass sections data to navbar components for dynamic navigation
                  ...(component.type === "navbar" && {
                    sections: sortedComponents,
                  }),
                };

                return (
                  <div key={component.id} className="w-full">
                    <section id={component.type}>
                      <Component {...mergedProps} />
                    </section>
                  </div>
                );
              } catch (error) {
                console.error(
                  `Error rendering component ${component.type}/${component.variant}:`,
                  error
                );
                return (
                  <div
                    key={component.id}
                    className="p-8 text-center text-muted-foreground"
                  >
                    <p>Error loading component: {component.type}</p>
                  </div>
                );
              }
            })
          )}
        </Suspense>
      </div>
    </NavigationHelper>
  );
}
