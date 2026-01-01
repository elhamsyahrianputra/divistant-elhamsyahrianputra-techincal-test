import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

function decodeJWT(token: string): { roles: string[]; exp: number } | null {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join(""),
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value || null;
  const { pathname } = request.nextUrl;

  // Get user role from token
  let userRole: string | null = null;
  if (token) {
    const payload = decodeJWT(token);
    if (
      payload &&
      payload.exp * 1000 > Date.now() &&
      payload.roles?.length > 0
    ) {
      userRole = payload.roles[0]; // Get primary role
    }
  }

  // Auth pages: /login, /register
  const isAuthPage =
    pathname.startsWith("/login") || pathname.startsWith("/register");

  // Dashboard pages: /dashboard
  const isDashboardPage = pathname.startsWith("/dashboard");

  // If user is logged in and trying to access auth pages
  if (isAuthPage && userRole) {
    // Redirect admin to dashboard, member to home
    if (userRole === "admin") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If trying to access dashboard
  if (isDashboardPage) {
    // Not logged in - redirect to login
    if (!userRole) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    // Member trying to access dashboard - redirect to home
    if (userRole !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/register", "/dashboard/:path*"],
};
