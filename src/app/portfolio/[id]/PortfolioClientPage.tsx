"use client";
import dynamic from "next/dynamic";
import { Suspense, useEffect } from "react";
import LoadingPortfolio from "@/components/ui/loading-portfolio";
import { PortfolioDataProvider } from "@/components/PortfolioProvider";
import { authClient } from "../../../../auth-client";

export default function PortfolioClientPage({ portfolioData, portfolioType }: { portfolioData: any, portfolioType: string }) {
  // Capitalize the portfolioType to match your file names

  const { data, isPending } = authClient.useSession();
  const type = (portfolioType?.charAt(0).toUpperCase() + portfolioType?.slice(1)) || "Developer";
  useEffect(() => {
    if (isPending || !portfolioData.id) return;
  
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
  }, [portfolioData.id, data?.user?.id, isPending]);
  

  const PortfolioTemplate = dynamic(
    () => import(`@/layouts/${type}.tsx`),
    {
      loading: () => <LoadingPortfolio type={portfolioType} />, ssr: false
    }
  );

  return (
    <Suspense fallback={<LoadingPortfolio type={portfolioType} />}>
      <PortfolioDataProvider value={portfolioData}>
        <PortfolioTemplate />
      </PortfolioDataProvider>
    </Suspense>
  );
}