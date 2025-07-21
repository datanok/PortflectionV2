import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { authenticateUser } from "@/lib/authenticateUser";

// Query parameter validation
const ListPortfoliosSchema = z.object({
  page: z
    .string()
    .transform(Number)
    .pipe(z.number().min(1).max(100))
    .default("1"),
  limit: z
    .string()
    .transform(Number)
    .pipe(z.number().min(1).max(50))
    .default("10"),
  sortBy: z
    .enum(["createdAt", "updatedAt", "name", "views"])
    .default("updatedAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
  status: z.enum(["all", "published", "draft"]).default("all"),
  search: z.string().max(100).optional(),
  portfolioType: z
    .enum([
      "all",
      "developer",
      "designer",
      "contentCreator",
      "businessConsulting",
    ])
    .default("all"),
});

export async function GET(request: NextRequest) {
  try {
    // 1. Authenticate user
    const session = await authenticateUser(request);
    if (!session) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // 2. Parse and validate query parameters
    const { searchParams } = new URL(request.url);
    const queryParams = Object.fromEntries(searchParams.entries());

    const validationResult = ListPortfoliosSchema.safeParse(queryParams);

    if (!validationResult.success) {
      const errors = validationResult.error.errors.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      }));

      return NextResponse.json(
        {
          error: "Invalid query parameters",
          details: errors,
        },
        { status: 400 }
      );
    }

    const { page, limit, sortBy, sortOrder, status, search, portfolioType } =
      validationResult.data;

    // 3. Build query filters
    const where: any = {
      userId: session.user.id,
    };

    // Status filter
    if (status === "published") {
      where.isPublished = true;
    } else if (status === "draft") {
      where.isPublished = false;
    }

    // Portfolio type filter
    if (portfolioType !== "all") {
      where.portfolioType = portfolioType;
    }

    // Search filter
    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
        { slug: { contains: search, mode: "insensitive" } },
        { tags: { hasSome: [search] } },
      ];
    }

    // 4. Calculate pagination
    const skip = (page - 1) * limit;

    // 5. Execute query with pagination
    const [portfolios, totalCount] = await Promise.all([
      prisma.portfolio.findMany({
        where,
        select: {
          id: true,
          name: true,
          slug: true,
          description: true,
          thumbnail: true,
          isPublished: true,
          portfolioType: true,
          tags: true,
          views: true,
          lastViewedAt: true,
          createdAt: true,
          updatedAt: true,
          _count: {
            select: {
              components: true,
              viewsLog: true,
            },
          },
        },
        orderBy: {
          [sortBy]: sortOrder,
        },
        skip,
        take: limit,
      }),
      prisma.portfolio.count({ where }),
    ]);

    // 6. Calculate pagination metadata
    const totalPages = Math.ceil(totalCount / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    // 7. Prepare response data
    const portfoliosData = portfolios.map((portfolio) => ({
      id: portfolio.id,
      name: portfolio.name,
      slug: portfolio.slug,
      description: portfolio.description,
      thumbnail: portfolio.thumbnail,
      isPublic: portfolio.isPublished,
      portfolioType: portfolio.portfolioType,
      tags: portfolio.tags,
      views: portfolio.views,
      lastViewedAt: portfolio.lastViewedAt,
      createdAt: portfolio.createdAt,
      updatedAt: portfolio.updatedAt,
      stats: {
        components: portfolio._count.components,
        totalViews: portfolio._count.viewsLog,
      },
      // Generate preview URL
      previewUrl: `/portfolio/${portfolio.slug}`,
      editUrl: `/dashboard/portfolios/edit/${portfolio.id}`,
    }));

    return NextResponse.json({
      success: true,
      data: {
        portfolios: portfoliosData,
        pagination: {
          page,
          limit,
          totalCount,
          totalPages,
          hasNextPage,
          hasPrevPage,
        },
        filters: {
          status,
          portfolioType,
          search,
          sortBy,
          sortOrder,
        },
      },
    });
  } catch (error) {
    console.error("Portfolio list error:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Get portfolio statistics for the authenticated user
export async function POST(request: NextRequest) {
  try {
    const session = await authenticateUser(request);
    if (!session) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // Get comprehensive statistics
    const [
      totalPortfolios,
      publishedPortfolios,
      draftPortfolios,
      totalViews,
      recentViews,
      portfolioTypes,
      recentActivity,
    ] = await Promise.all([
      // Total portfolios
      prisma.portfolio.count({
        where: { userId: session.user.id },
      }),

      // Published portfolios
      prisma.portfolio.count({
        where: {
          userId: session.user.id,
          isPublished: true,
        },
      }),

      // Draft portfolios
      prisma.portfolio.count({
        where: {
          userId: session.user.id,
          isPublished: false,
        },
      }),

      // Total views across all portfolios
      prisma.portfolioView.count({
        where: {
          portfolio: {
            userId: session.user.id,
          },
        },
      }),

      // Recent views (last 30 days)
      prisma.portfolioView.count({
        where: {
          portfolio: {
            userId: session.user.id,
          },
          timestamp: {
            gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
          },
        },
      }),

      // Portfolio types distribution
      prisma.portfolio.groupBy({
        by: ["portfolioType"],
        where: { userId: session.user.id },
        _count: {
          portfolioType: true,
        },
      }),

      // Recent activity (last 10 updates)
      prisma.portfolio.findMany({
        where: { userId: session.user.id },
        select: {
          id: true,
          name: true,
          slug: true,
          updatedAt: true,
          isPublished: true,
        },
        orderBy: { updatedAt: "desc" },
        take: 10,
      }),
    ]);

    // Calculate view growth (last 7 days vs previous 7 days)
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const fourteenDaysAgo = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000);

    const [recentWeekViews, previousWeekViews] = await Promise.all([
      prisma.portfolioView.count({
        where: {
          portfolio: {
            userId: session.user.id,
          },
          timestamp: {
            gte: sevenDaysAgo,
          },
        },
      }),
      prisma.portfolioView.count({
        where: {
          portfolio: {
            userId: session.user.id,
          },
          timestamp: {
            gte: fourteenDaysAgo,
            lt: sevenDaysAgo,
          },
        },
      }),
    ]);

    const viewGrowth =
      previousWeekViews > 0
        ? ((recentWeekViews - previousWeekViews) / previousWeekViews) * 100
        : recentWeekViews > 0
        ? 100
        : 0;

    return NextResponse.json({
      success: true,
      data: {
        overview: {
          totalPortfolios,
          publishedPortfolios,
          draftPortfolios,
          totalViews,
          recentViews,
          viewGrowth: Math.round(viewGrowth * 100) / 100, // Round to 2 decimal places
        },
        portfolioTypes: portfolioTypes.map((type) => ({
          type: type.portfolioType,
          count: type._count.portfolioType,
        })),
        recentActivity,
        // Top performing portfolios
        topPortfolios: await prisma.portfolio.findMany({
          where: { userId: session.user.id },
          select: {
            id: true,
            name: true,
            slug: true,
            views: true,
            isPublished: true,
          },
          orderBy: { views: "desc" },
          take: 5,
        }),
      },
    });
  } catch (error) {
    console.error("Portfolio statistics error:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
