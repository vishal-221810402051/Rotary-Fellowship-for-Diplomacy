import Link from "next/link";
import { locales, type Locale } from "@/i18n/locales";
import { routeFor, type PageId } from "@/i18n/routes";

const languageNames = { fr: "Français", en: "English" } as const;

export function LanguageSwitch({ locale, pageId, label, currentLabel }: {
  locale: Locale;
  pageId: PageId;
  label: string;
  currentLabel: string;
}) {
  return (
    <nav aria-label={label} className="shrink-0 text-sm">
      <ul className="flex flex-wrap items-center gap-x-4 gap-y-2">
        {locales.map((language) => (
          <li key={language}>
            {language === locale ? (
              <span aria-current="true" className="inline-flex min-h-11 items-center font-semibold text-brand-deep">
                <span lang={language}>{languageNames[language]}</span>
                <span className="sr-only"> ({currentLabel})</span>
              </span>
            ) : (
              <Link href={routeFor(language, pageId)} hrefLang={language} lang={language} className="inline-flex min-h-11 items-center underline decoration-brand/40 underline-offset-4 hover:decoration-brand">
                {languageNames[language]}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
