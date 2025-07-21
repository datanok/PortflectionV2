import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../auth";

export async function GET(request: NextRequest) {
  try {
    console.log("🧪 Testing Better Auth session...");

    // Use the auth.api.getSession method directly
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    console.log("🧪 Session result:", {
      hasSession: !!session,
      session: session,
    });

    return NextResponse.json({
      success: true,
      hasSession: !!session,
      session: session,
      message: session ? "Session found" : "No session found",
    });
  } catch (error) {
    console.error("❌ Session test failed:", error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        message: "Session test failed",
      },
      { status: 500 }
    );
  }
}
