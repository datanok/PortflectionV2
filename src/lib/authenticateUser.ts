import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "../../auth";

// Use the Better Auth session type directly
type Session = typeof auth.$Infer.Session;

export const authenticateUser = async (
  req: NextRequest
): Promise<Session | null> => {
  try {
    const cookie = req.headers.get("cookie");
    console.log(
      "🔍 Authenticating user with cookie:",
      cookie ? "Present" : "Missing"
    );

    // Use Better Auth API directly instead of betterFetch
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    console.log("📊 Session response:", {
      hasData: !!session,
      session: session,
    });

    if (!session) {
      console.warn("⚠️ No session data received");
      return null;
    }

    console.log("✅ Authentication successful for user:", session.user.email);
    return session;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("❌ Authentication failed:", error.message);
    } else {
      console.error("❌ Unknown authentication error:", error);
    }
    return null;
  }
};

/**
 * Throws an error if the portfolio doesn't exist or the user doesn't own it.
 */
export async function verifyPortfolioOwnership(
  portfolioId: string,
  userId: string
) {
  try {
    const portfolio = await prisma.portfolio.findFirst({
      where: {
        id: portfolioId,
        slug: { not: null }, // Filter out portfolios with null slugs
      },
    });

    if (!portfolio) throw new Error("Portfolio not found");

    if (portfolio.userId !== userId)
      throw new Error("Access denied. Edit your own portfolio.");

    return portfolio;
  } catch (error) {
    console.error("Error in verifyPortfolioOwnership:", error);
    throw new Error("Portfolio not found or access denied");
  }
}
