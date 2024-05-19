import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/dashboard") && !req.cookies.has("admin-tkn")) {
    return NextResponse.rewrite(new URL("/sign-in", req.url));
  }

  if (
    (pathname.startsWith("/transaction") ||
      pathname.startsWith("/my-event") ||
      pathname.startsWith("/checkout") ||
      pathname.startsWith("/profile")) &&
    !req.cookies.has("user-tkn")
  ) {
    return NextResponse.rewrite(new URL("/sign-in", req.url));
  }
}
