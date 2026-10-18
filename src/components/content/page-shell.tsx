import Link from "next/link";
import { getDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/locales";
import { primaryPageIds, routeFor, type PageId } from "@/i18n/routes";
import { partAContent } from "@/content/site";
import { SiteShell } from "@/components/layout/site-shell";

export function PageShell({ locale, pageId }: { locale: Locale; pageId: PageId }) {
  const dictionary = getDictionary(locale);
  const isLegal = pageId === "legal" || pageId === "privacy";
  const availability = isLegal ? partAContent[pageId][locale].status : "missing";
  return (
    <SiteShell locale={locale} pageId={pageId}>
      <div className="max-w-readable" data-content-status={availability}>
        <p className="mb-5 inline-block rounded-sm border-l-4 border-gold bg-white px-4 py-2 text-sm font-medium text-muted">{dictionary.interface.draftLabel}</p>
        <h1 className="text-3xl leading-tight font-semibold tracking-tight text-brand-deep sm:text-4xl">{dictionary.pages[pageId].title}</h1>
        <p className="mt-6 max-w-prose text-lg leading-relaxed text-muted">{isLegal ? dictionary.interface.legalMissing : dictionary.interface.shellMessage}</p>
      </div>
      {pageId === "home" ? (
        <section aria-labelledby="explore-title" className="mt-12 border-t border-line pt-8">
          <h2 id="explore-title" className="text-xl font-semibold text-brand-deep">{dictionary.interface.explore}</h2>
          <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-4">
            {primaryPageIds.filter((id) => id !== "home").map((id) => (
              <li key={id}><Link href={routeFor(locale, id)} className="inline-block py-2 font-medium text-brand-deep underline decoration-gold decoration-2 underline-offset-8">{dictionary.navigation[id]}</Link></li>
            ))}
          </ul>
        </section>
      ) : null}
    </SiteShell>
  );
}
