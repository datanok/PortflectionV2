import { NextResponse, type NextRequest } from "next/server";
import { auth } from "../auth";

const authRoutes = ["/sign-in", "/sign-up"];
const passwordRoutes = ["/reset-password", "/forgot-password"];
const adminRoutes = ["/admin"];

export default async function authMiddleware(request: NextRequest) {
  const pathName = request.nextUrl.pathname;

  // ✅ Allow public access to portfolio routes and root
  if (pathName === "/" || pathName.startsWith("/portfolio")) {
    return NextResponse.next();
  }

  const isAuthRoute = authRoutes.includes(pathName);
  const isPasswordRoute = passwordRoutes.includes(pathName);
  const isAdminRoute = adminRoutes.includes(pathName);

  try {
    // Use Better Auth API directly
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      if (isAuthRoute || isPasswordRoute) {
        return NextResponse.next();
      }
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    if (isAuthRoute || isPasswordRoute) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    if (isAdminRoute && session.user.role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.warn("⚠️ Middleware auth error:", error);

    // On error, allow access to auth routes, redirect others to sign-in
    if (isAuthRoute || isPasswordRoute) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|.*\\.png$|portfolio|privacy-policy).*)",
  ],
};
