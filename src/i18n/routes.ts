import { isLocale, type Locale } from "./locales";

export const pageIds = ["home", "mission", "team", "events", "photos", "legal", "privacy"] as const;
export type PageId = (typeof pageIds)[number];
export const primaryPageIds = ["home", "mission", "team", "events", "photos"] as const satisfies readonly PageId[];

export const routeSegments = {
  fr: { home: "", mission: "mission", team: "equipe", events: "evenements", photos: "photos", legal: "mentions-legales", privacy: "confidentialite" },
  en: { home: "", mission: "mission", team: "team", events: "events", photos: "photos", legal: "legal-notice", privacy: "privacy" },
} as const satisfies Record<Locale, Record<PageId, string>>;

export function routeFor(locale: Locale, pageId: PageId): string {
  const segment = routeSegments[locale][pageId];
  return segment ? `/${locale}/${segment}` : `/${locale}`;
}

export function resolvePage(locale: Locale, segments: readonly string[] = []): PageId | null {
  // Phase 1 has shells only: no invented event slugs or nested future routes.
  if (segments.length > 1) return null;
  const segment = segments[0] ?? "";
  return pageIds.find((id) => routeSegments[locale][id] === segment) ?? null;
}

export function equivalentRoute(pathname: string, targetLocale: Locale): string | null {
  const route = resolvePathname(pathname);
  return route ? routeFor(targetLocale, route.pageId) : null;
}

export function resolvePathname(pathname: string): { locale: Locale; pageId: PageId } | null {
  if (!pathname.startsWith("/")) return null;
  const [locale, ...segments] = pathname.slice(1).split("/");
  if (!isLocale(locale)) return null;
  const pageId = resolvePage(locale, segments);
  if (!pageId || pathname !== routeFor(locale, pageId)) return null;
  return { locale, pageId };
}
