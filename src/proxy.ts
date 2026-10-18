import { NextResponse, type NextRequest } from "next/server";
import { isLocale } from "./i18n/locales";
import { resolvePathname } from "./i18n/routes";
import { notFoundDocument } from "./lib/not-found-document";

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  if (pathname === "/" || resolvePathname(pathname)) return NextResponse.next();

  // Prerender lookup can otherwise serve /FR as /fr without running locale guards.
  // Validate before that lookup and terminate invalid requests with a real 404.
  const locale = pathname.split("/")[1];
  return new NextResponse(notFoundDocument(isLocale(locale) ? locale : null), {
    status: 404,
    headers: { "Content-Type": "text/html; charset=utf-8", "X-Robots-Tag": "noindex, nofollow" },
  });
}

export const config = { matcher: ["/((?!_next/|robots\\.txt$).*)"] };
