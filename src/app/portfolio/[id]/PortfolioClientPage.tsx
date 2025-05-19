"use client";
import dynamic from "next/dynamic";
import { Suspense, useEffect } from "react";
import LoadingPortfolio from "@/components/ui/loading-portfolio";
import { PortfolioDataProvider } from "@/components/PortfolioProvider";
import { authClient } from "../../../../auth-client";

export default function PortfolioClientPage({
  portfolioData,
  portfolioType,
  isPreview = false,
}: {
  portfolioData: any;
  portfolioType: string;
  isPreview?: boolean;
}) {
  const { data, isPending } = authClient.useSession();
  const type = (portfolioType?.charAt(0).toUpperCase() + portfolioType?.slice(1)) || "Developer";

  useEffect(() => {
    if (isPending || !portfolioData.id) return;

    // Only track views if NOT preview mode (you can skip counting views for preview)
    if (!isPreview) {
      const cookieName = `portfolio_viewed_${portfolioData.id}`;
      if (!document.cookie.includes(cookieName)) {
        const userId = data?.user?.id;

        fetch("/api/portfolio/view", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: portfolioData.id, userId }),
        });

        document.cookie = `${cookieName}=1; path=/; max-age=604800`; // 1 week
      }
    }
  }, [portfolioData.id, data?.user?.id, isPending, isPreview]);

  // If preview and user session not loaded or user does not own portfolio, show message or redirect
  if (isPreview && !isPending && (!data || data.user.id !== portfolioData.userId)) {
    return <p>You are not authorized to preview this portfolio.</p>;
  }

  const PortfolioTemplate = dynamic(
    () => import(`@/layouts/${Developer}.tsx`),
    {
      loading: () => <LoadingPortfolio type={portfolioType} />,
      ssr: false,
    }
  );

  return (
    <Suspense fallback={<LoadingPortfolio type={portfolioType} />}>
      <PortfolioDataProvider value={portfolioData} type={portfolioType as 'developer' | 'designer' | 'contentCreator' | 'businessConsulting' | 'base'}>
        <PortfolioTemplate  isPreview={isPreview}/>
      </PortfolioDataProvider>
    </Suspense>
  );
}
