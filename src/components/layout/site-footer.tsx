import Link from "next/link";
import { siteIdentity } from "@/content/site";
import type { Dictionary } from "@/i18n/dictionary-types";
import type { Locale } from "@/i18n/locales";
import { routeFor, type PageId } from "@/i18n/routes";

export function SiteFooter({ locale, pageId, dictionary }: { locale: Locale; pageId: PageId; dictionary: Dictionary }) {
  return (
    <footer className="border-t border-line bg-white">
      <div className="footer-band text-white">
      <div className="mx-auto flex min-h-33 max-w-site flex-wrap items-center justify-center px-4 py-7">
        <nav aria-label={dictionary.interface.footerNavigation}>
          <ul className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
            {(["legal", "privacy"] as const).map((page) => (
              <li key={page}><Link aria-current={pageId === page ? "page" : undefined} className={`inline-flex min-h-11 items-center underline underline-offset-4 ${pageId === page ? "font-semibold" : ""}`} href={routeFor(locale, page)}>{dictionary.navigation[page]}</Link></li>
            ))}
          </ul>
        </nav>
      </div>
      </div>
      <div className="mx-auto max-w-site px-4 py-6 text-center">
        <p className="font-semibold text-brand-deep">{siteIdentity.name}</p>
      </div>
    </footer>
  );
}
