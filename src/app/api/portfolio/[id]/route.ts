import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authenticateUser } from "@/lib/authenticateUser";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const session = await authenticateUser(request);

    // Try to find portfolio by ID first, then by slug
    let portfolio = await prisma.portfolio.findFirst({
      where: {
        id,
        slug: { not: null }, // Filter out portfolios with null slugs
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
        _count: {
          select: {
            viewsLog: true,
          },
        },
      },
    });

    // If not found by ID, try by slug
    if (!portfolio) {
      portfolio = await prisma.portfolio.findFirst({
        where: {
          slug: id,
          AND: {
            slug: { not: null }, // Filter out portfolios with null slugs
          },
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
          _count: {
            select: {
              viewsLog: true,
            },
          },
        },
      });
    }

    if (!portfolio) {
      return NextResponse.json(
        { error: "Portfolio not found" },
        { status: 404 }
      );
    }

    // Check if user can access this portfolio
    const isOwner = session?.user.id === portfolio.userId;
    const isPublic = portfolio.isPublished;

    if (!isPublic && !isOwner) {
      return NextResponse.json(
        { error: "Portfolio is private" },
        { status: 403 }
      );
    }

    // Increment view count for public portfolios (not for owners viewing their own)
    if (isPublic && !isOwner) {
      await prisma.$transaction(async (tx) => {
        // Update view count
        await tx.portfolio.update({
          where: { id: portfolio!.id },
          data: {
            views: { increment: 1 },
            lastViewedAt: new Date(),
          },
        });

        // Log the view for analytics
        const ip =
          request.headers.get("x-forwarded-for") ||
          request.headers.get("x-real-ip") ||
          "unknown";

        await tx.portfolioView.create({
          data: {
            portfolioId: portfolio!.id,
            ip: ip.split(",")[0].trim(), // Get first IP if multiple
            userAgent: request.headers.get("user-agent") || undefined,
            referrer: request.headers.get("referer") || undefined,
          },
        });
      });
    }

    // Prepare response data
    const responseData = {
      id: portfolio.id,
      name: portfolio.name,
      slug: portfolio.slug,
      description: portfolio.description,
      layout: portfolio.layout,
      theme: portfolio.theme,
      isPublic: portfolio.isPublished,
      tags: portfolio.tags,
      thumbnail: portfolio.thumbnail,
      views: portfolio.views,
      lastViewedAt: portfolio.lastViewedAt,
      createdAt: portfolio.createdAt,
      updatedAt: portfolio.updatedAt,

      // Legacy fields
      portfolioType: portfolio.portfolioType,
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
      extraData: portfolio.extraData,

      // Components
      components: portfolio.components,

      // User info (limited for privacy)
      user: {
        id: portfolio.user.id,
        name: portfolio.user.name,
        image: portfolio.user.image,
      },

      // Analytics (only for owners)
      analytics: isOwner
        ? {
            totalViews: portfolio._count.viewsLog,
            recentViews: await prisma.portfolioView.findMany({
              where: { portfolioId: portfolio.id },
              orderBy: { timestamp: "desc" },
              take: 10,
              select: {
                timestamp: true,
                ip: true,
                country: true,
                referrer: true,
                userAgent: true,
              },
            }),
          }
        : undefined,
    };

    return NextResponse.json({
      success: true,
      data: responseData,
    });
  } catch (error) {
    console.error("Portfolio retrieval error:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const session = await authenticateUser(request);

    if (!session) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // Find portfolio
    const portfolio = await prisma.portfolio.findFirst({
      where: {
        id,
        slug: { not: null }, // Filter out portfolios with null slugs
      },
      select: { id: true, userId: true, name: true },
    });

    if (!portfolio) {
      return NextResponse.json(
        { error: "Portfolio not found" },
        { status: 404 }
      );
    }

    // Verify ownership
    if (portfolio.userId !== session.user.id) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    // Delete portfolio (cascade will handle related records)
    await prisma.portfolio.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: `Portfolio "${portfolio.name}" deleted successfully`,
    });
  } catch (error) {
    console.error("Portfolio deletion error:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
