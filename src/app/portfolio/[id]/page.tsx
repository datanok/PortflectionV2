import { notFound } from "next/navigation";
import { getUserPortfolioData } from "@/lib/portfolio-data";
import PortfolioClientPage from "./PortfolioClientPage";
import type { Metadata } from "next";

export const revalidate = 3600; // Regenerate every 1 hour

// Generate metadata for this page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const portfolioData = await getUserPortfolioData(id);

  if (!portfolioData) {
    return {
      title: "Portfolio Not Found | Portflection",
      description: "The requested portfolio could not be found.",
    };
  }

  const {
    name = "This Creator",
    title = "",
    about,
    portfolioType = "Professional",
    profileImage,
  } = portfolioData;

  const normalizedTitle = title.toLowerCase();
  const normalizedType = portfolioType.toLowerCase();

  const shouldIncludeType = !normalizedTitle.includes(normalizedType);

  const readableTitle = shouldIncludeType
    ? `${name} – ${title} ${portfolioType} Portfolio`
    : `${name} – ${title} Portfolio`;

  const description =
    about ||
    `View ${name}'s ${portfolioType.toLowerCase()} portfolio featuring their projects, skills, and experience.`;

  return {
    title: readableTitle, // Remove the extra template literal wrapping
    description,
    openGraph: {
      title: readableTitle,
      description,
      images: profileImage ? [{ url: profileImage, alt: `${name}'s profile photo` }] : undefined,
      type: "profile",
      siteName: "Portflection",
      locale: "en_US",
      url: `https://portflection.com/portfolio/${id}`, // Add canonical URL
    },
    twitter: {
      card: "summary_large_image",
      title: readableTitle,
      description,
      images: profileImage ? [profileImage] : undefined, // Twitter images can be simpler
      creator: "@portflection",
      site: "@portflection",
    },
    alternates: {
      canonical: `https://portflection.com/portfolio/${id}`, // SEO canonical URL
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
// Main page component
export default async function PortfolioPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
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