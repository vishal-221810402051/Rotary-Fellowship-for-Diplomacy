import assert from "node:assert/strict";
import { test } from "node:test";
import { getDictionary } from "../src/i18n/dictionaries";
import { isLocale, type Locale } from "../src/i18n/locales";
import { equivalentRoute, resolvePage, resolvePathname, routeFor, type PageId } from "../src/i18n/routes";

const expected: Record<PageId, [string, string]> = {
  home: ["/fr", "/en"], mission: ["/fr/mission", "/en/mission"], team: ["/fr/equipe", "/en/team"],
  events: ["/fr/evenements", "/en/events"], photos: ["/fr/photos", "/en/photos"],
  legal: ["/fr/mentions-legales", "/en/legal-notice"], privacy: ["/fr/confidentialite", "/en/privacy"],
};

test("all approved shells keep their page identity across both language switches", () => {
  for (const [id, [fr, en]] of Object.entries(expected)) {
    assert.equal(routeFor("fr", id as PageId), fr);
    assert.equal(routeFor("en", id as PageId), en);
    assert.equal(equivalentRoute(fr, "en"), en);
    assert.equal(equivalentRoute(en, "fr"), fr);
  }
});

test("unknown locales and paths never become an unrelated page or wrong-language fallback", () => {
  assert.equal(isLocale("fr"), true);
  assert.equal(isLocale("en"), true);
  for (const locale of ["de", "FR", "en-US", "", undefined]) assert.equal(isLocale(locale), false);
  assert.equal(resolvePage("fr", ["team"]), null);
  assert.equal(resolvePage("en", ["equipe"]), null);
  assert.equal(resolvePage("fr", ["evenements", "unsupplied-event"]), null);
  assert.equal(resolvePage("en", ["privacy", "extra"]), null);
  for (const path of ["/de/team", "/en/donate", "/fr/contact", "/team"]) assert.equal(equivalentRoute(path, "fr"), null);
  assert.throws(() => getDictionary("de" as Locale), /no translation fallback/);
  for (const path of ["/FR", "/EN/team", "/fr/MISSION", "/fr//mission", "/en/events/extra", "fr/mission"]) {
    assert.equal(resolvePathname(path), null, `${path} must not bypass the exact-path allowlist`);
  }
});

function leafKeys(value: object, prefix = ""): string[] {
  return Object.entries(value).flatMap(([key, child]) => {
    const path = prefix ? `${prefix}.${key}` : key;
    if (typeof child === "object" && child !== null) return leafKeys(child, path);
    assert.equal(typeof child, "string", `${path} must be a translated string`);
    assert.notEqual(String(child).trim(), "", `${path} must not be blank`);
    return [path];
  }).sort();
}

test("every interface/page translation key exists and is nonempty in both languages", () => {
  assert.deepEqual(leafKeys(getDictionary("fr")), leafKeys(getDictionary("en")));
});
