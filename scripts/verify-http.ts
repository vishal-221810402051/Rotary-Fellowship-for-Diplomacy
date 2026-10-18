import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { JSDOM } from "jsdom";
import { getDictionary } from "../src/i18n/dictionaries";
import { locales } from "../src/i18n/locales";
import { pageIds, routeFor } from "../src/i18n/routes";

const base = new URL(process.env.TEST_BASE_URL ?? "http://127.0.0.1:3100");
if (!["127.0.0.1", "localhost", "[::1]"].includes(base.hostname)) throw new Error("This check is for an authorized local server only.");
const results: object[] = [];
let checks = 0;
const expect = (value: unknown, message: string) => { checks += 1; assert.ok(value, message); };
const localFetch = (path: string, init: RequestInit = {}) => fetch(new URL(path, base), { ...init, signal: AbortSignal.timeout(10_000) });

const root = await localFetch("/", { redirect: "manual" });
expect(root.status === 308, `Root redirect status was ${root.status}`);
expect(new URL(root.headers.get("location") ?? "", base).pathname === "/fr", "Root must redirect to /fr");
results.push({ path: "/", status: root.status, location: root.headers.get("location") });

const allowedPaths = new Set(locales.flatMap((locale) => pageIds.map((page) => routeFor(locale, page))));
let stylesheet: string | null = null;
for (const locale of locales) {
  const dictionary = getDictionary(locale);
  for (const pageId of pageIds) {
    const path = routeFor(locale, pageId);
    const response = await localFetch(path);
    const html = await response.text();
    const dom = new JSDOM(html);
    const document = dom.window.document;
    expect(response.status === 200, `${path}: expected 200, got ${response.status}`);
    expect(document.documentElement.lang === locale, `${path}: document language`);
    expect(document.querySelectorAll("h1").length === 1 && document.querySelector("h1")?.textContent === dictionary.pages[pageId].title, `${path}: localized single h1`);
    expect(document.querySelector('meta[name="robots"]')?.getAttribute("content")?.includes("noindex"), `${path}: development content must not be indexed`);
    expect(document.querySelector("header") && document.querySelector("main#main-content") && document.querySelector("footer"), `${path}: semantic shell`);
    expect(document.querySelector('a[href="#main-content"]')?.textContent === dictionary.interface.skipLink, `${path}: skip link`);
    expect(document.querySelector('[data-content-status="missing"]'), `${path}: missing factual content remains explicit`);
    expect(document.querySelector("main")?.textContent?.includes(pageId === "legal" || pageId === "privacy" ? dictionary.interface.legalMissing : dictionary.interface.shellMessage), `${path}: localized missing content`);
    const otherLocale = locale === "fr" ? "en" : "fr";
    expect(document.querySelector(`a[hreflang="${otherLocale}"]`)?.getAttribute("href") === routeFor(otherLocale, pageId), `${path}: equivalent-page language target`);
    expect(Array.from(document.querySelectorAll('a[aria-current="page"]')).some((link) => link.getAttribute("href") === path), `${path}: current page marked in navigation`);
    expect(!document.querySelector('form, input, textarea, iframe, img, a[href^="mailto:"], a[href^="https://www.facebook"]'), `${path}: no excluded collection, invented media/contact or embeds`);
    const links = Array.from(document.querySelectorAll<HTMLAnchorElement>("a[href]"));
    expect(links.every((link) => link.getAttribute("href") === "#main-content" || allowedPaths.has(link.getAttribute("href") ?? "")), `${path}: no dead/unsupported link target`);
    expect(document.querySelector("#mobile-navigation")?.hasAttribute("hidden"), `${path}: mobile disclosure initially closed`);
    stylesheet ??= document.querySelector('link[rel="stylesheet"]')?.getAttribute("href") ?? null;
    results.push({ path, status: response.status, language: locale, pageId, languageTarget: routeFor(otherLocale, pageId), checks: "HTTP/DOM only" });
    dom.window.close();
  }
}

for (const path of ["/de", "/de/team", "/FR", "/mission", "/fr/unknown", "/en/unknown", "/fr/team", "/en/equipe", "/fr/evenements/unsupplied-event", "/fr/contact", "/en/donate"]) {
  const response = await localFetch(path);
  const html = await response.text();
  expect(response.status === 404, `${path}: true HTTP 404 required, got ${response.status}`);
  expect(/noindex/.test(html), `${path}: errors must not be indexed`);
  if (path.startsWith("/fr/") || path.startsWith("/en/")) {
    const locale = path.startsWith("/fr/") ? "fr" : "en";
    const dom = new JSDOM(html);
    expect(dom.window.document.documentElement.lang === locale, `${path}: localized error document`);
    dom.window.close();
  }
  results.push({ path, status: response.status });
}
const robots = await localFetch("/robots.txt");
expect(robots.status === 200 && (await robots.text()).includes("Disallow: /"), "Development robots policy");
expect(stylesheet, "Compiled stylesheet must be linked");
if (stylesheet) {
  const css = await localFetch(stylesheet);
  expect(css.status === 200 && (await css.text()).includes("--color-brand-deep"), "Tailwind/theme stylesheet must be served");
}
await mkdir("docs/evidence", { recursive: true });
await writeFile("docs/evidence/phase-1-http.json", JSON.stringify({
  checkedAtUtc: new Date().toISOString(), baseUrl: base.href, checks, results,
  method: "Local production server HTTP responses and parsed HTML; no rendering or browser interaction",
  browserChecksPerformed: false, referenceFidelityVerified: false,
}, null, 2) + "\n");
console.log(`PASS: ${checks} HTTP/DOM checks; ${allowedPaths.size} localized shells, root redirect and ${11} unknown/excluded routes. No browser interaction claims.`);
