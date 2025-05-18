import { notFound } from "next/navigation";
import { getUserPortfolioData } from "@/lib/portfolio-data";
import PortfolioClientPage from "./PortfolioClientPage";

export const revalidate = 3600; // Regenerate every 1 hour

export default async function PortfolioPage({ params }: { params: { id: string } }) {
  const portfolioData = await getUserPortfolioData(params.id);
  if (!portfolioData) notFound();

  const { portfolioType } = portfolioData;

  return (
    <PortfolioClientPage
      portfolioData={portfolioData}
      portfolioType={portfolioType}
    />
  );
}
