// app/dashboard/portfolios/preview/[id]/page.tsx (server component)

import { notFound, redirect } from "next/navigation";
import { getUserPortfolioData } from "@/lib/portfolio-data";
import PortfolioClientPage from "@/app/portfolio/[id]/PortfolioClientPage";
import { getSession } from "@/app/actions/portfolio-actions";

export const revalidate = 0; // no caching, always fresh preview

export default async function PortfolioPreviewPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const session = await getSession()
  if (!session) redirect("/login");

  const portfolioData = await getUserPortfolioData(params.id);
  console.log(portfolioData,"asd")

  // If no portfolio or user does not own it or is not authorized
  if (
    !portfolioData ||
    portfolioData?.userId !== session.user.id
  ) {
    notFound();
  }

  return (
    <PortfolioClientPage
      portfolioData={portfolioData}
      portfolioType={portfolioData.portfolioType}
      isPreview={true}
    />
  );
}
