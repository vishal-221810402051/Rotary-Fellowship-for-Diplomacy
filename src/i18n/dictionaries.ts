import { fr } from "./dictionaries/fr";
import { en } from "./dictionaries/en";
import type { Dictionary } from "./dictionary-types";
import { isLocale, type Locale } from "./locales";

const dictionaries: Record<Locale, Dictionary> = { fr, en };

export function getDictionary(locale: Locale): Dictionary {
  if (!isLocale(locale)) throw new Error("Unsupported locale; no translation fallback is permitted.");
  return dictionaries[locale];
}
