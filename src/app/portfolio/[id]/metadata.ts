import { getUserPortfolioData } from "@/lib/portfolio-data";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const portfolioData = await getUserPortfolioData(params.id);
  if (!portfolioData) return { title: "Portfolio Not Found" };

  const { name, title, about, portfolioType, profileImage } = portfolioData;

  return {
    title: title || `${name}'s ${portfolioType} Portfolio | Your Platform Name`,
    description: about || `View ${name}'s professional ${portfolioType} portfolio featuring their projects, skills, and experience`,
    openGraph: {
      title: title || `${name}'s ${portfolioType} Portfolio`,
      description: about || `View ${name}'s professional ${portfolioType} portfolio`,
      images: profileImage ? [{ url: profileImage }] : undefined,
      type: "profile",
    },
    twitter: {
      card: "summary_large_image",
      title: title || `${name}'s Portfolio`,
      description: about || `View ${name}'s professional ${portfolioType} portfolio`,
      images: profileImage ? [{ url: profileImage }] : undefined,
    },
    alternates: {
      canonical: `https://yoursite.com/portfolio/${params.id}`,
    },
  };
}
