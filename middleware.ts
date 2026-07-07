import createMiddleware from "next-intl/middleware";
import { routing } from "./src/i18n/routing";
import { NextRequest, NextResponse } from "next/server";

const handleI18nRouting = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Przekieruj "/" na "/pl"
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/pl", request.url));
  }

  return handleI18nRouting(request);
}

export const config = {
  matcher: ["/", "/(pl|en|de)/:path*", "/((?!api|_next|_vercel|.*\\..*).*)"],
};
