import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "../../../../auth";
import { headers } from "next/headers";

export async function GET(request: NextRequest) {
  try {
    // Check if user is authenticated
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // Find portfolios with null slugs
    const portfoliosWithNullSlugs = await prisma.portfolio.findMany({
      where: { slug: null },
      select: { id: true, name: true, userId: true },
    });

    // Find all portfolios for the user
    const userPortfolios = await prisma.portfolio.findMany({
      where: { userId: session.user.id },
      select: { id: true, name: true, slug: true },
    });

    return NextResponse.json({
      success: true,
      data: {
        portfoliosWithNullSlugs,
        userPortfolios,
        totalNullSlugs: portfoliosWithNullSlugs.length,
        totalUserPortfolios: userPortfolios.length,
      },
    });
  } catch (error) {
    console.error("Debug portfolios error:", error);
    return NextResponse.json(
      { error: "Failed to debug portfolios" },
      { status: 500 }
    );
  }
}
