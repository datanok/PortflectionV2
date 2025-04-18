import { notFound } from "next/navigation";
import { getUserPortfolioData } from "@/lib/portfolio-data";
import PortfolioClientPage from "./PortfolioClientPage";

export default async function PortfolioPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const portfolioData = await getUserPortfolioData(id);
  console.log("hello")
  if (!portfolioData) notFound();

  const { portfolioType } = portfolioData;
  console.log(portfolioData,"data")

  return (
    <PortfolioClientPage
      portfolioData={portfolioData}
      portfolioType={portfolioType}
    />
  );
}

// This would typically come from a database in production
// For this example, we're generating static params for demo users
export async function generateStaticParams() {
  // In a real app, this would fetch from your database
  const demoUsers = [
    'janedeveloper',
    'alexdesigner',
    'taylorcontent',
    'jordanconsultant'
  ];
  
  return demoUsers.map(id => ({
    id
  }));
}
