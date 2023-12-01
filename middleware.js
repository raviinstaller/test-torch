import { NextResponse } from "next/server";

export function middleware(request) {
  let verify = request.cookies.get("loggedIn");
  const path = request.nextUrl.pathname;
  const isPublicPath = path === "/login";

  if (path.includes("/user/test/") && !verify?.value) {
    return NextResponse.redirect(
      new URL(`/login/?redirectToTest=${path.split("/")[3]}`, request.url)
    );
  }

  if (!verify?.value && !isPublicPath) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/creator/:path*", "/user/:path*", "/login"],
};
