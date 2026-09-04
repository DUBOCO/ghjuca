import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, adminSessionToken } from "@/lib/admin-auth";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isAdminPage = pathname.startsWith("/admin") && pathname !== "/admin/login";
  const isAdminApi = pathname.startsWith("/api/admin") && pathname !== "/api/admin/login";

  if (!isAdminPage && !isAdminApi) {
    return NextResponse.next();
  }

  const expected = await adminSessionToken();
  const cookie = req.cookies.get(ADMIN_COOKIE)?.value;

  if (!expected || cookie !== expected) {
    if (isAdminPage) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
