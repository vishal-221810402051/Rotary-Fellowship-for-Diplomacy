import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { isLocale } from "@/i18n/locales";
import { siteIdentity } from "@/content/site";
import { LocaleProvider } from "@/components/layout/locale-context";
import { RouteFocus } from "@/components/layout/route-focus";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: { default: siteIdentity.name, template: `%s | ${siteIdentity.name}` },
  // No approved brand icon has been delivered; avoid a broken automatic request.
  icons: { icon: "data:," },
  // These development shells are never presented as publication-ready content.
  robots: { index: false, follow: false },
};

export default async function LocaleLayout({ children, params }: { children: ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <html lang={locale}>
      <body><LocaleProvider locale={locale}>{children}<RouteFocus /></LocaleProvider></body>
    </html>
  );
}
