import Link from "next/link";
import { siteIdentity } from "@/content/site";
import type { Dictionary } from "@/i18n/dictionary-types";
import type { Locale } from "@/i18n/locales";
import { routeFor, type PageId } from "@/i18n/routes";
import { LanguageSwitch } from "@/components/navigation/language-switch";
import { SiteNavigation } from "@/components/navigation/site-navigation";

export function SiteHeader({ locale, pageId, dictionary }: { locale: Locale; pageId: PageId; dictionary: Dictionary }) {
  return (
    <header className="bg-white">
      <div className="mx-auto max-w-site px-4">
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-5 py-6 lg:min-h-35">
          <Link href={routeFor(locale, "home")} className="site-identity max-w-xl text-xl leading-snug font-semibold text-brand-deep sm:text-2xl">
            {siteIdentity.name}
          </Link>
          <LanguageSwitch locale={locale} pageId={pageId} label={dictionary.interface.languageNavigation} currentLabel={dictionary.interface.currentLanguage} />
        </div>
      </div>
      <SiteNavigation key={`${locale}-${pageId}`} locale={locale} currentPage={pageId} labels={dictionary.navigation} navigationLabel={dictionary.interface.mainNavigation} openLabel={dictionary.interface.openMenu} closeLabel={dictionary.interface.closeMenu} />
    </header>
  );
}
