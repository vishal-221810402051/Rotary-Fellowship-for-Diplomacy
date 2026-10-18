import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/content/page-shell";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, locales } from "@/i18n/locales";
import { pageIds, resolvePage, routeSegments } from "@/i18n/routes";

type RouteParams = { locale: string; segments?: string[] };

function requireRoute({ locale, segments }: RouteParams) {
  if (!isLocale(locale)) notFound();
  const pageId = resolvePage(locale, segments);
  if (!pageId) notFound();
  return { locale, pageId };
}

export function generateStaticParams() {
  return locales.flatMap((locale) => pageIds.map((pageId) => ({
    locale,
    segments: routeSegments[locale][pageId] ? [routeSegments[locale][pageId]] : [],
  })));
}

export async function generateMetadata({ params }: { params: Promise<RouteParams> }): Promise<Metadata> {
  const { locale, pageId } = requireRoute(await params);
  return { title: getDictionary(locale).pages[pageId].title };
}

export default async function LocalizedPage({ params }: { params: Promise<RouteParams> }) {
  const { locale, pageId } = requireRoute(await params);
  return <PageShell locale={locale} pageId={pageId} />;
}
