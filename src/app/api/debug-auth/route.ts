import { NextRequest, NextResponse } from "next/server";
import { betterFetch } from "@better-fetch/fetch";
import { Session } from "../../../../auth";

export async function GET(request: NextRequest) {
  const debugInfo = {
    betterAuthUrl: process.env.BETTER_AUTH_URL,
    hasBetterAuthUrl: !!process.env.BETTER_AUTH_URL,
    cookies: request.headers.get("cookie"),
    hasCookies: !!request.headers.get("cookie"),
    userAgent: request.headers.get("user-agent"),
    host: request.headers.get("host"),
    url: request.url,
    timestamp: new Date().toISOString(),
  };

  console.log("🔍 Debug Auth Info:", debugInfo);

  // Try to fetch session data
  let sessionData = null;
  let sessionError = null;

  if (process.env.BETTER_AUTH_URL) {
    try {
      const { data: session, error } = await betterFetch<Session>(
        "/api/auth/get-session",
        {
          baseURL: process.env.BETTER_AUTH_URL,
          headers: {
            cookie: request.headers.get("cookie") || "",
          },
          cache: "no-store",
        }
      );

      sessionData = session;
      sessionError = error;

      console.log("🔍 Session fetch result:", {
        hasSession: !!session,
        hasError: !!error,
        session: session,
        error: error,
      });
    } catch (error) {
      sessionError = error;
      console.error("❌ Session fetch failed:", error);
    }
  }

  return NextResponse.json({
    success: true,
    debug: {
      ...debugInfo,
      sessionData,
      sessionError,
      sessionStatus: sessionData ? "authenticated" : "not_authenticated",
    },
    message: "Check the console for detailed debug information",
  });
}
