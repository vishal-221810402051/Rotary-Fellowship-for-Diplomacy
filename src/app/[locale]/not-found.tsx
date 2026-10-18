"use client";

import Link from "next/link";
import { useLocale } from "@/components/layout/locale-context";
import { getDictionary } from "@/i18n/dictionaries";
import { routeFor } from "@/i18n/routes";

export default function LocalizedNotFound() {
  const locale = useLocale();
  const dictionary = getDictionary(locale);
  return (
    <main className="mx-auto max-w-readable px-4 py-16">
      <h1 className="text-3xl font-semibold text-brand-deep">{dictionary.interface.notFoundTitle}</h1>
      <p className="mt-5">{dictionary.interface.notFoundMessage}</p>
      <Link className="mt-6 inline-block underline underline-offset-4" href={routeFor(locale, "home")}>{dictionary.interface.returnHome}</Link>
    </main>
  );
}
