import { NextRequest, NextResponse } from "next/server";
import { cleanupNullSlugs } from "@/actions/portfolio-actions";
import { auth } from "../../../../auth";
import { headers } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    // Check if user is authenticated and is admin
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // For now, allow any authenticated user to run cleanup
    // In production, you might want to restrict this to admins only
    const result = await cleanupNullSlugs();

    return NextResponse.json({
      success: true,
      message: `Successfully cleaned up ${result.updatedCount} portfolios with null slugs`,
      updatedCount: result.updatedCount,
    });
  } catch (error) {
    console.error("Cleanup API error:", error);
    return NextResponse.json(
      { error: "Failed to cleanup null slugs" },
      { status: 500 }
    );
  }
}
