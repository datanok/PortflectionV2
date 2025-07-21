import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../auth";

// Authentication middleware
const authenticateUser = async (req: NextRequest) => {
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    return session;
  } catch (error) {
    console.error("❌ Authentication error:", error);
    return null;
  }
};

export async function GET(req: NextRequest) {
  try {
    const session = await authenticateUser(req);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const searchParams = req.nextUrl.searchParams;

    // Get all portfolios for this user
    const userPortfolios = await prisma.portfolio.findMany({
      where: { userId },
      select: {
        id: true,
        name: true, // Assuming there's a name field, include relevant fields
        views: true,
      },
      orderBy: { createdAt: "asc" }, // Order by creation date
    });

    if (userPortfolios.length === 0) {
      return NextResponse.json(
        {
          error: {
            code: "NO_PORTFOLIOS",
            message: "You haven't created any portfolios yet.",
          },
        },
        { status: 404 }
      );
    }

    // Extract all portfolio IDs
    const portfolioIds = userPortfolios.map((portfolio) => portfolio.id);

    const period = searchParams.get("period") || "7days"; // default to last 7 days

    // Calculate date range based on period
    const now = new Date();
    let startDate = new Date();

    switch (period) {
      case "24h":
        startDate.setDate(now.getDate() - 1);
        break;
      case "7days":
        startDate.setDate(now.getDate() - 7);
        break;
      case "30days":
        startDate.setDate(now.getDate() - 30);
        break;
      case "90days":
        startDate.setDate(now.getDate() - 90);
        break;
      case "all":
        startDate = new Date(0); // Beginning of time
        break;
      default:
        startDate.setDate(now.getDate() - 7);
    }

    // Calculate total views across all portfolios
    const totalViews = userPortfolios.reduce(
      (sum, portfolio) => sum + (portfolio.views || 0),
      0
    );

    // Get views over time for all portfolios
    const viewsOverTime = await prisma.portfolioView.groupBy({
      by: ["timestamp", "portfolioId"],
      where: {
        portfolioId: { in: portfolioIds },
        timestamp: { gte: startDate },
      },
      _count: {
        id: true,
      },
      orderBy: {
        timestamp: "asc",
      },
    });

    // Get views by country for all portfolios
    const viewsByCountry = await prisma.portfolioView.groupBy({
      by: ["country", "portfolioId"],
      where: {
        portfolioId: { in: portfolioIds },
        timestamp: { gte: startDate },
        country: { not: null },
      },
      _count: {
        id: true,
      },
      orderBy: {
        _count: {
          id: "desc",
        },
      },
    });

    // Get views by referrer for all portfolios
    const viewsByReferrer = await prisma.portfolioView.groupBy({
      by: ["referrer", "portfolioId"],
      where: {
        portfolioId: { in: portfolioIds },
        timestamp: { gte: startDate },
        referrer: { not: null },
      },
      _count: {
        id: true,
      },
      orderBy: {
        _count: {
          id: "desc",
        },
      },
      take: 20, // Increased to account for multiple portfolios
    });

    // Get bot vs human traffic for all portfolios
    const botTraffic = await prisma.portfolioView.groupBy({
      by: ["isBot", "portfolioId"],
      where: {
        portfolioId: { in: portfolioIds },
        timestamp: { gte: startDate },
      },
      _count: {
        id: true,
      },
    });

    // Recent visitors for all portfolios
    const recentVisitors = await prisma.portfolioView.findMany({
      where: {
        portfolioId: { in: portfolioIds },
        timestamp: { gte: startDate },
      },
      orderBy: {
        timestamp: "desc",
      },
      take: 50,
      select: {
        portfolioId: true,
        timestamp: true,
        country: true,
        referrer: true,
        userAgent: true,
        isBot: true,
      },
    });

    // Process the data to organize it by portfolio
    const portfolioData = {};

    // Initialize data structure for each portfolio
    userPortfolios.forEach((portfolio) => {
      portfolioData[portfolio.id] = {
        id: portfolio.id,
        name: portfolio.name || `Portfolio ${portfolio.id}`,
        totalViews: portfolio.views || 0,
        viewsOverTime: [],
        viewsByCountry: [],
        viewsByReferrer: [],
        botTraffic: [],
        recentVisitors: [],
      };
    });

    // Populate views over time
    viewsOverTime.forEach((view) => {
      const portfolioId = view.portfolioId;
      if (portfolioData[portfolioId]) {
        portfolioData[portfolioId].viewsOverTime.push({
          timestamp: view.timestamp,
          count: view._count.id,
        });
      }
    });

    // Populate views by country
    viewsByCountry.forEach((view) => {
      const portfolioId = view.portfolioId;
      if (portfolioData[portfolioId]) {
        portfolioData[portfolioId].viewsByCountry.push({
          country: view.country,
          count: view._count.id,
        });
      }
    });

    // Populate views by referrer
    viewsByReferrer.forEach((view) => {
      const portfolioId = view.portfolioId;
      if (portfolioData[portfolioId]) {
        portfolioData[portfolioId].viewsByReferrer.push({
          referrer: view.referrer,
          count: view._count.id,
        });
      }
    });

    // Populate bot traffic
    botTraffic.forEach((view) => {
      const portfolioId = view.portfolioId;
      if (portfolioData[portfolioId]) {
        portfolioData[portfolioId].botTraffic.push({
          isBot: view.isBot,
          count: view._count.id,
        });
      }
    });

    // Populate recent visitors
    recentVisitors.forEach((visitor) => {
      const portfolioId = visitor.portfolioId;
      if (portfolioData[portfolioId]) {
        portfolioData[portfolioId].recentVisitors.push({
          timestamp: visitor.timestamp,
          country: visitor.country,
          referrer: visitor.referrer,
          userAgent: visitor.userAgent,
          isBot: visitor.isBot,
        });
      }
    });

    // Also calculate aggregated stats across all portfolios
    const aggregatedStats = {
      totalViews,
      viewsOverTime: {},
      viewsByCountry: {},
      viewsByReferrer: {},
      botTraffic: {
        bot: 0,
        human: 0,
      },
    };

    // Aggregate views over time
    viewsOverTime.forEach((view) => {
      const timestamp = view.timestamp.toISOString().split("T")[0]; // Get just the date part
      if (!aggregatedStats.viewsOverTime[timestamp]) {
        aggregatedStats.viewsOverTime[timestamp] = 0;
      }
      aggregatedStats.viewsOverTime[timestamp] += view._count.id;
    });

    // Aggregate views by country
    viewsByCountry.forEach((view) => {
      if (!aggregatedStats.viewsByCountry[view.country]) {
        aggregatedStats.viewsByCountry[view.country] = 0;
      }
      aggregatedStats.viewsByCountry[view.country] =
        (aggregatedStats.viewsByCountry[view.country] || 0) +
        Number(view._count?.id || 0);
    });

    // Aggregate views by referrer
    viewsByReferrer.forEach((view) => {
      if (!aggregatedStats.viewsByReferrer[view.referrer]) {
        aggregatedStats.viewsByReferrer[view.referrer] = 0;
      }
      aggregatedStats.viewsByReferrer[view.referrer] =
        (aggregatedStats.viewsByReferrer[view.referrer] || 0) +
        Number(view._count?.id || 0);
    });

    // Aggregate bot traffic
    botTraffic.forEach((view) => {
      if (view.isBot) {
        aggregatedStats.botTraffic.bot =
          (aggregatedStats.botTraffic.bot || 0) + Number(view._count?.id || 0);
      } else {
        aggregatedStats.botTraffic.human =
          (aggregatedStats.botTraffic.human || 0) +
          Number(view._count?.id || 0);
      }
    });

    // Convert aggregated stats objects to arrays for easier consumption
    const formattedAggregatedStats = {
      totalViews: aggregatedStats.totalViews,
      viewsOverTime: Object.entries(aggregatedStats.viewsOverTime)
        .map(([date, count]) => ({
          date,
          count,
        }))
        .sort((a, b) => a.date.localeCompare(b.date)),
      viewsByCountry: Object.entries(aggregatedStats.viewsByCountry)
        .map(([country, count]) => ({
          country,
          count: Number(count),
        }))
        .sort((a, b) => Number(b.count) - Number(a.count)),
      viewsByReferrer: Object.entries(aggregatedStats.viewsByReferrer)
        .map(([referrer, count]) => ({
          referrer,
          count: Number(count),
        }))
        .sort((a, b) => Number(b.count) - Number(a.count))
        .slice(0, 10),
      botTraffic: [
        { isBot: true, count: aggregatedStats.botTraffic.bot },
        { isBot: false, count: aggregatedStats.botTraffic.human },
      ],
    };

    return NextResponse.json({
      portfolios: userPortfolios.map((p) => ({
        id: p.id,
        name: p.name || `Portfolio ${p.id}`,
      })),
      portfolioData,
      aggregatedStats: formattedAggregatedStats,
    });
  } catch (error) {
    console.error("Analytics API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
