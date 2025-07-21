// Optimized GET API endpoint
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
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
    // Authenticate user
    const session = await authenticateUser(req);
    if (!session || !session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get query parameters
    const url = new URL(req.url);
    const detailView = url.searchParams.get("detail") === "true";
    const limitParam = url.searchParams.get("limit");

    const limit = limitParam ? parseInt(limitParam, 10) : undefined;

    if (detailView) {
      // If detail view is requested, return full portfolio data
      const portfolios = await prisma.portfolio.findMany({
        where: { userId: session.user.id },
        orderBy: { updatedAt: "desc" },
      });

      return NextResponse.json({ portfolios });
    } else {
      // For list view, only return essential data
      const portfoliosList = await prisma.portfolio.findMany({
        ...(limit ? { take: limit } : {}),
        where: { userId: session.user.id },
        select: {
          id: true,
          title: true,
          portfolioType: true,
          updatedAt: true,
          isPublished: true,
        },
        orderBy: { updatedAt: "desc" },
      });

      // After fetching portfoliosList
      const totalCount = await prisma.portfolio.count({
        where: { userId: session.user.id },
      });

      return NextResponse.json({
        portfolios: portfoliosList,
        totalCount,
      });
    }
  } catch (err) {
    console.error("Portfolio fetch error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
