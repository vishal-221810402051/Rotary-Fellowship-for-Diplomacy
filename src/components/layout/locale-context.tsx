"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Locale } from "@/i18n/locales";

const LocaleContext = createContext<Locale | null>(null);

export function LocaleProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}

export function useLocale(): Locale {
  const locale = useContext(LocaleContext);
  if (locale === null) throw new Error("Locale context is required; no default-language fallback.");
  return locale;
}
