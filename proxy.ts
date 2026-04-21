import { NextRequest, NextResponse } from "next/server";
import { auth } from "./app/lib/auth";

const publicRoutes = ["/login"];
const protectedAPIRoutes = ["/api/pdf/member-directory"];

export async function proxy(req: NextRequest) {
  const { nextUrl } = req;

  // ── Skip middleware for static assets + cron ──────────────────────────────
  if (
    nextUrl.pathname.startsWith("/api/cron/") ||
    nextUrl.pathname.startsWith("/_next") ||
    nextUrl.pathname.includes(".") ||
    nextUrl.pathname.startsWith("/icon") ||
    nextUrl.pathname.startsWith("/api/placeholder")
  ) {
    return NextResponse.next();
  }

  const session = await auth();
  const isLoggedIn = !!session?.user;
  const role = session?.user?.role;

  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isProtectedPage =
    nextUrl.pathname.startsWith("/dashboard") ||
    nextUrl.pathname.startsWith("/super") ||
    nextUrl.pathname.startsWith("/rosebud");
  const isSuperUserRoute = nextUrl.pathname.startsWith("/super");
  const isDashboardRoute = nextUrl.pathname.startsWith("/dashboard");

  // ── Logged-in user hitting a public route → redirect to their home ────────
  if (isLoggedIn && isPublicRoute) {
    if (nextUrl.pathname === "/login") {
      let dest = "/rosebud";
      if (role === "SUPERUSER") dest = "/super";
      else if (role === "ADMIN") dest = "/dashboard";
      return NextResponse.redirect(new URL(dest, nextUrl));
    }
    return NextResponse.next();
  }

  // ── Protected page → send to login ───────────────────────────────────────
  if (isProtectedPage && !isLoggedIn) {
    const loginUrl = new URL("/login", nextUrl);
    loginUrl.searchParams.set("callbackUrl", nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // ── Non-superuser hitting /super → back to their home ────────────────────
  if (isLoggedIn && isSuperUserRoute && role !== "SUPERUSER") {
    const dest = role === "ADMIN" ? "/dashboard" : "/rosebud";
    return NextResponse.redirect(new URL(dest, nextUrl));
  }

  // ── Non-admin/superuser hitting /dashboard → back to rosebud ─────────────
  if (isLoggedIn && isDashboardRoute && role === "ROSEBUD") {
    return NextResponse.redirect(new URL("/rosebud", nextUrl));
  }

  // ── Protected API routes → 401 if not logged in ───────────────────────────
  if (
    protectedAPIRoutes.some((r) => nextUrl.pathname.startsWith(r)) &&
    !isLoggedIn
  ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|icon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
