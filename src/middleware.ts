import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("token")?.value;
  const role = request.cookies.get("role")?.value;

  const isLoginPage = pathname === "/login";
  const isAdminRoute = pathname.startsWith("/admin");

  // If logged in and tries to access login
  if (isLoginPage && token) {
    if (role === "admin") {
      return NextResponse.redirect(
        new URL("/admin/addvideos", request.url)
      );
    }
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Redirect /admin → /admin/addvideos
  if (pathname === "/admin") {
    return NextResponse.redirect(
      new URL("/admin/addvideos", request.url)
    );
  }

  // Protect Admin Routes
  if (isAdminRoute) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    if (role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}