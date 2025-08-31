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
  console.log(portfolioData, "asdas");

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

  // Add null checks to prevent errors
  const safeTitle = title || "";
  const safePortfolioType = portfolioType || "Professional";

  const normalizedTitle = safeTitle.toLowerCase();
  const normalizedType = safePortfolioType.toLowerCase();

  const shouldIncludeType = !normalizedTitle.includes(normalizedType);

  const readableTitle = shouldIncludeType
    ? `${name} – ${safeTitle} ${safePortfolioType} Portfolio`
    : `${name} – ${safeTitle} Portfolio`;

  const description =
    about ||
    `View ${name}'s ${safePortfolioType.toLowerCase()} portfolio featuring their projects, skills, and experience.`;

  return {
    title: readableTitle,
    description,
    openGraph: {
      title: readableTitle,
      description,
      images: profileImage
        ? [{ url: profileImage, alt: `${name}'s profile photo` }]
        : undefined,
      type: "profile",
      siteName: "Portflection",
      locale: "en_US",
      url: `https://portflection.com/portfolio/${id}`,
    },
    twitter: {
      card: "summary_large_image",
      title: readableTitle,
      description,
      images: profileImage ? [profileImage] : undefined,
      creator: "@portflection",
      site: "@portflection",
    },
    alternates: {
      canonical: `https://portflection.com/portfolio/${id}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
// Main page component
export default async function PortfolioPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const portfolioData = await getUserPortfolioData(params.id);
  console.log(portfolioData, "asdas");
  if (!portfolioData) notFound();

  // Transform old portfolio data format to new format
  const transformedPortfolioData = {
    id: (portfolioData as any).id || params.id,
    name:
      (portfolioData as any).name ||
      (portfolioData as any).title ||
      "Untitled Portfolio",
    slug: (portfolioData as any).slug || (portfolioData as any).id || params.id,
    description: (portfolioData as any).description,
    theme: (portfolioData as any).theme,
    components:
      (portfolioData as any).components || (portfolioData as any).layout || [],
    userId: (portfolioData as any).userId,
    isPublic:
      (portfolioData as any).isPublished ||
      (portfolioData as any).isPublic ||
      false,
    portfolioType: (portfolioData as any).portfolioType || "developer",
    // Legacy fields for backward compatibility
    title: (portfolioData as any).title,
    email: (portfolioData as any).email,
    phone: (portfolioData as any).phone,
    location: (portfolioData as any).location,
    about: (portfolioData as any).about,
    profileImage: (portfolioData as any).profileImage,
    contactForm: (portfolioData as any).contactForm,
    linkedinLink: (portfolioData as any).linkedinLink,
    personalWebsite: (portfolioData as any).personalWebsite,
    socials: (portfolioData as any).socials,
    extraData: (portfolioData as any).extraData,
    user: (portfolioData as any).user,
  };

  return (
    <PortfolioClientPage
      portfolioData={transformedPortfolioData}
      portfolioType={transformedPortfolioData.portfolioType}
    />
  );
}
