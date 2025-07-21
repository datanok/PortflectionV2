import { NextRequest, NextResponse } from "next/server";
import { authenticateUser } from "@/lib/authenticateUser";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    // Authenticate user
    const session = await authenticateUser(request);
    if (!session) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // Get confirmation from request body
    const { confirm } = await request.json();

    if (confirm !== "YES_DELETE_ALL_PORTFOLIOS") {
      return NextResponse.json(
        {
          error:
            "Confirmation required. Send confirm: 'YES_DELETE_ALL_PORTFOLIOS'",
        },
        { status: 400 }
      );
    }

    console.log("🔄 Starting portfolio cleanup via API...");

    // Get count before deletion
    const portfolioCount = await prisma.portfolio.count();

    if (portfolioCount === 0) {
      return NextResponse.json({
        message: "No portfolios to delete. Database is already clean.",
        deleted: {
          portfolios: 0,
          components: 0,
          views: 0,
        },
      });
    }

    // Delete related data first (foreign key constraints)
    const viewsDeleted = await prisma.portfolioView.deleteMany({});
    const componentsDeleted = await prisma.portfolioComponent.deleteMany({});

    // Finally, delete all portfolios
    const portfoliosDeleted = await prisma.portfolio.deleteMany({});

    console.log("🎉 Portfolio cleanup completed via API!");

    return NextResponse.json({
      message: "All portfolios cleared successfully",
      deleted: {
        portfolios: portfoliosDeleted.count,
        components: componentsDeleted.count,
        views: viewsDeleted.count,
      },
    });
  } catch (error) {
    console.error("❌ Error during portfolio cleanup:", error);
    return NextResponse.json(
      { error: "Failed to clear portfolios", details: error.message },
      { status: 500 }
    );
  }
}
