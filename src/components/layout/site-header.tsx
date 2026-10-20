import Link from "next/link";
import Image from "next/image";
import bridgeLogo from "@/components/media/logo.jpeg";
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
        <div className="flex flex-col items-start gap-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-x-8 lg:min-h-35">
          <Link href={routeFor(locale, "home")} className="site-identity" aria-label={siteIdentity.name}>
            <span className="site-identity-symbol" aria-hidden="true">
              <Image src={bridgeLogo} alt="" sizes="(min-width: 1024px) 157px, (min-width: 640px) 131px, 96px" preload />
            </span>
            <span className="site-identity-title">
              <span>Rotary Fellowship</span>{" "}
              <span>for Diplomacy</span>
            </span>
          </Link>
          <LanguageSwitch locale={locale} pageId={pageId} label={dictionary.interface.languageNavigation} currentLabel={dictionary.interface.currentLanguage} />
        </div>
      </div>
      <SiteNavigation key={`${locale}-${pageId}`} locale={locale} currentPage={pageId} labels={dictionary.navigation} navigationLabel={dictionary.interface.mainNavigation} openLabel={dictionary.interface.openMenu} closeLabel={dictionary.interface.closeMenu} />
    </header>
  );
}
