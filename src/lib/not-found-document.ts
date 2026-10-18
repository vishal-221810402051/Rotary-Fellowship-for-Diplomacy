import { siteIdentity } from "../content/site";
import { getDictionary } from "../i18n/dictionaries";
import type { Locale } from "../i18n/locales";
import { routeFor } from "../i18n/routes";

function escapeHtml(value: string): string {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#39;");
}

/** Small terminal proxy response; never interpolate the untrusted request path. */
export function notFoundDocument(locale: Locale | null): string {
  const language = locale ?? "fr";
  const dictionary = getDictionary(language);
  const title = locale === null ? 'Page introuvable / <span lang="en">Page not found</span>' : escapeHtml(dictionary.interface.notFoundTitle);
  const message = locale === null
    ? '<p>Cette adresse ne correspond à aucune page du site.</p><p lang="en">This address does not match a page on the website.</p>'
    : `<p>${escapeHtml(dictionary.interface.notFoundMessage)}</p>`;
  const links = locale === null
    ? '<a href="/fr" lang="fr">Accueil en français</a><a href="/en" lang="en">Home in English</a>'
    : `<a href="${routeFor(locale, "home")}">${escapeHtml(dictionary.interface.returnHome)}</a>`;
  return `<!doctype html><html lang="${language}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex, nofollow"><title>404 | ${escapeHtml(siteIdentity.name)}</title><style>body{font-family:Arial,Helvetica,sans-serif;color:#222b39;margin:0;background:#f7fafc}main{max-width:55rem;margin:auto;padding:3rem 1rem}h1{color:#17458f;font-size:2rem}nav{display:flex;flex-wrap:wrap;gap:1.5rem;margin-top:2rem}a{color:#17458f;display:inline-flex;align-items:center;min-height:44px}:focus-visible{outline:3px solid #0067c8;outline-offset:4px}</style></head><body><main><p>${escapeHtml(siteIdentity.name)}</p><h1>404 — ${title}</h1>${message}<nav aria-label="${escapeHtml(locale === null ? 'Accueil / Home' : dictionary.interface.returnHome)}">${links}</nav></main></body></html>`;
}
