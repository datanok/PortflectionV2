import { NextResponse, type NextRequest } from "next/server";

const authRoutes = ["/sign-in", "/sign-up"];
const passwordRoutes = ["/reset-password", "/forgot-password"];
const adminRoutes = ["/admin"];

export default function authMiddleware(request: NextRequest) {
  const pathName = request.nextUrl.pathname;

  // ✅ Allow public access to portfolio routes and root
  if (pathName === "/" || pathName.startsWith("/portfolio")) {
    return NextResponse.next();
  }

  const isAuthRoute = authRoutes.includes(pathName);
  const isPasswordRoute = passwordRoutes.includes(pathName);
  const isAdminRoute = adminRoutes.includes(pathName);

  // Check for Better Auth session cookie
  const sessionToken = request.cookies.get("better-auth.session_token");

  if (!sessionToken) {
    if (isAuthRoute || isPasswordRoute) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // If user is already signed in, redirect away from auth routes
  if (isAuthRoute || isPasswordRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // (Optional) You cannot check user role in middleware without DB, so skip admin check

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|.*\\.png$|portfolio|privacy-policy).*)",
  ],
};
