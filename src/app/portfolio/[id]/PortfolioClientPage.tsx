"use client";
import { Suspense, useEffect } from "react";
import { PortfolioDataProvider } from "@/components/PortfolioProvider";
import { authClient } from "../../../../auth-client";
import { PortfolioLayout } from "@/layouts";
import { LayoutType } from "@/types/layout";

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
  if (isPreview && !isPending && (!data || data.user.id !== portfolioData.userId)) {
    return <p>You are not authorized to preview this portfolio.</p>;
  }

  // Get layout from portfolio data, default to 'classic' if not set
  console.log(portfolioData,"portfolioData");
  const layoutType = (portfolioData.layoutType || 'classic') as LayoutType;

  return (
    <PortfolioDataProvider 
      value={{
        ...portfolioData,
        portfolioType: portfolioType as 'developer' | 'designer' | 'contentCreator' | 'businessConsulting' | 'base'
      }}
    >
      <PortfolioLayout 
        layoutType={layoutType}
        isPreview={isPreview} 
      />
    </PortfolioDataProvider>
  );
}
