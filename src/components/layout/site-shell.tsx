import type { ReactNode } from "react";
import type { Locale } from "@/i18n/locales";
import type { PageId } from "@/i18n/routes";
import { getDictionary } from "@/i18n/dictionaries";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";

export function SiteShell({ locale, pageId, children }: { locale: Locale; pageId: PageId; children: ReactNode }) {
  const dictionary = getDictionary(locale);
  return (
    <div className="flex min-h-dvh flex-col">
      <a href="#main-content" className="sr-only rounded-sm bg-brand-deep text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:min-h-11 focus:p-3">{dictionary.interface.skipLink}</a>
      <SiteHeader locale={locale} pageId={pageId} dictionary={dictionary} />
      <main id="main-content" tabIndex={-1} className="mx-auto w-full max-w-site flex-1 px-4 py-12 sm:py-16">{children}</main>
      <SiteFooter locale={locale} pageId={pageId} dictionary={dictionary} />
    </div>
  );
}
