import createMiddleware from "next-intl/middleware";
import { routing } from "./src/i18n/routing";
import { NextRequest, NextResponse } from "next/server";

const handleI18nRouting = createMiddleware(routing);

function isLocalePath(pathname: string) {
  return routing.locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
}

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/") {
    return NextResponse.redirect(new URL("/pl", request.url));
  }

  if (!isLocalePath(pathname)) {
    if (
      pathname === "/favicon.ico" ||
      pathname.startsWith("/api/") ||
      pathname.startsWith("/_next/") ||
      pathname.startsWith("/_vercel/") ||
      pathname.includes(".")
    ) {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL(`/pl${pathname}`, request.url));
  }

  return handleI18nRouting(request);
}

export const config = {
  matcher: ["/", "/(pl|en|de)/:path*", "/((?!api|_next|_vercel|.*\\..*).*)"],
};
