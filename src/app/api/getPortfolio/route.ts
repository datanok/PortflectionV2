import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const idOrSlug = new URL(req.url).searchParams.get("id");

    if (!idOrSlug) {
      return NextResponse.json(
        { error: "Missing portfolio ID or slug" },
        { status: 400 }
      );
    }

    // Try to find portfolio by ID first, then by slug
    const portfolio = await prisma.portfolio.findFirst({
      where: {
        OR: [{ id: idOrSlug }, { slug: idOrSlug }],
      },
      include: {
        components: {
          where: { isActive: true },
          orderBy: { order: "asc" },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
    });

    if (!portfolio) {
      return NextResponse.json(
        { error: "Portfolio not found" },
        { status: 404 }
      );
    }

    // Transform the portfolio data to work with the new component system
    const transformedPortfolio = {
      id: portfolio.id,
      name: portfolio.name,
      slug: portfolio.slug,
      description: portfolio.description,
      theme: portfolio.theme,
      components: portfolio.components.map((comp) => ({
        id: comp.id,
        type: comp.type,
        variant: comp.variant,
        props: comp.props,
        styles: comp.styles,
        order: comp.order,
        isActive: comp.isActive,
      })),
      userId: portfolio.userId,
      isPublic: portfolio.isPublished,
      portfolioType: portfolio.portfolioType,
      // Legacy fields for backward compatibility
      title: portfolio.title,
      email: portfolio.email,
      phone: portfolio.phone,
      location: portfolio.location,
      about: portfolio.about,
      profileImage: portfolio.profileImage,
      contactForm: portfolio.contactForm,
      linkedinLink: portfolio.linkedinLink,
      personalWebsite: portfolio.personalWebsite,
      socials: portfolio.socials,
      layoutType: portfolio.layoutType,
      extraData: portfolio.extraData,
      user: portfolio.user,
    };

    return NextResponse.json(transformedPortfolio);
  } catch (error) {
    console.error("Portfolio fetch error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
