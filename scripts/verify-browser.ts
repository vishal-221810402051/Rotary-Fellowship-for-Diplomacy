import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import AxeBuilder from "@axe-core/playwright";
import type { Page } from "playwright";
import { launchVerificationBrowser } from "./browser-tooling";
import { pageIds, primaryPageIds, routeFor } from "../src/i18n/routes";
import { getDictionary } from "../src/i18n/dictionaries";
import type { Locale } from "../src/i18n/locales";

const baseUrl = process.env.TEST_BASE_URL ?? "http://127.0.0.1:3100";
assert.match(baseUrl, /^http:\/\/(127\.0\.0\.1|localhost):\d+$/);
const output = process.env.BROWSER_EVIDENCE_DIR ?? "docs/evidence/phase-1-browser/local";
await mkdir(output, { recursive: true });
const browser = await launchVerificationBrowser();
const checks: { name: string; passed: boolean; detail?: string }[] = [];
const screenshots: object[] = [];
const scans: object[] = [];
const measurements: object[] = [];
const errors: string[] = [];
const consoleErrors: object[] = [];
async function check(name: string, run: () => Promise<void>) {
  try { await run(); checks.push({ name, passed: true }); }
  catch (error) { const detail = error instanceof Error ? error.stack ?? String(error) : String(error); checks.push({ name, passed: false, detail }); console.error(name, detail); }
}
async function capture(page: Page, name: string, state: string) {
  const path = `${output}/${name}.png`;
  await page.screenshot({ path, fullPage: true });
  screenshots.push({ path, url: page.url(), viewport: page.viewportSize(), state });
}
async function scan(page: Page, state: string) {
  const result = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
  const contrastReview: object[] = [];
  for (const finding of result.incomplete) {
    assert.equal(finding.id, "color-contrast", `Unreviewed axe incomplete: ${finding.id}`);
    for (const node of finding.nodes) {
      const target = node.target[0];
      assert.equal(typeof target, "string");
      const styles = await page.locator(target as string).evaluate((element) => ({ color: getComputedStyle(element).color, background: getComputedStyle(element.closest(".navigation-band, .footer-band")!).backgroundImage }));
      assert.equal(styles.color, "rgb(255, 255, 255)");
      // The CSS optimiser/browser may omit the explicit default sRGB keyword.
      assert.match(styles.background, /^linear-gradient\(90deg(?: in srgb)?, rgb\(/);
      const stops = Array.from(styles.background.matchAll(/rgb\((\d+), (\d+), (\d+)\)/g)).map((match) => match.slice(1).map(Number));
      assert.equal(stops.length, 2);
      // A conservative channel-wise maximum is at least as luminous as ANY
      // interpolated sRGB pixel, including pixels between the measured stops.
      const maximum = [0, 1, 2].map((index) => Math.max(...stops.map((rgb) => rgb[index]!)));
      const linear = maximum.map((channel) => channel / 255 <= 0.04045 ? channel / 255 / 12.92 : ((channel / 255 + 0.055) / 1.055) ** 2.4);
      const luminance = 0.2126 * linear[0]! + 0.7152 * linear[1]! + 0.0722 * linear[2]!;
      const minimumRatio = 1.05 / (luminance + 0.05);
      assert.ok(minimumRatio >= 4.5, `Gradient contrast lower bound ${minimumRatio}`);
      contrastReview.push({ target, ...styles, conservativeMaximumRgb: maximum, contrastLowerBound: minimumRatio, required: 4.5, resolved: true, method: "Computed browser colours; WCAG relative luminance with conservative sRGB interpolation bound; no pixel equality claim" });
    }
  }
  scans.push({ url: page.url(), viewport: page.viewportSize(), state, engine: result.testEngine, violations: result.violations, incomplete: result.incomplete, contrastReview, passedRules: result.passes.length });
  assert.equal(result.violations.length, 0, `axe violations: ${result.violations.map((v) => `${v.id} (${v.impact})`).join(", ")}`);
}
async function geometry(page: Page) {
  const result = await page.evaluate(() => {
    const name = document.querySelector<HTMLElement>(".site-identity")!;
    const languages = document.querySelector<HTMLElement>('header nav[aria-label="Choose language"], header nav[aria-label="Choisir la langue"]') ?? name.parentElement!.lastElementChild!;
    const a = name.getBoundingClientRect(), b = languages.getBoundingClientRect();
    return {
      viewport: { width: innerWidth, height: innerHeight }, width: document.documentElement.clientWidth, scrollWidth: document.documentElement.scrollWidth,
      identity: { text: name.textContent, width: a.width, height: a.height, x: a.x, fontSize: getComputedStyle(name).fontSize, clientWidth: name.clientWidth, scrollWidth: name.scrollWidth },
      controlsOverlap: a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top,
      landmarks: { banner: document.querySelectorAll("header").length, main: document.querySelectorAll("main").length, footer: document.querySelectorAll("footer").length, h1: document.querySelectorAll("h1").length },
      brokenImages: Array.from(document.images).filter((image) => !image.complete || !image.naturalWidth).map((image) => image.src),
      sharedElements: ["header", "header > div > div", ".navigation-band > div", "main", "main > div", "h1", "footer", ".footer-band", ".footer-band > div"].map((selector) => {
        const element = document.querySelector<HTMLElement>(selector)!;
        const rect = element.getBoundingClientRect(), css = getComputedStyle(element);
        return { selector, x: rect.x, y: rect.y, width: rect.width, height: rect.height, fontFamily: css.fontFamily, fontSize: css.fontSize, lineHeight: css.lineHeight, padding: css.padding, background: css.background };
      }),
    };
  });
  measurements.push({ url: page.url(), ...result });
  assert.ok(result.scrollWidth <= result.width, `horizontal overflow ${result.scrollWidth}/${result.width}`);
  assert.equal(result.controlsOverlap, false, "identity overlaps language controls");
  assert.equal(result.identity.text, "Rotary Fellowship for Diplomacy");
  assert.ok(result.identity.scrollWidth <= result.identity.clientWidth, "identity clipped");
  assert.ok(parseFloat(result.identity.fontSize) >= 20, "identity too small");
  assert.deepEqual(result.landmarks, { banner: 1, main: 1, footer: 1, h1: 1 });
  assert.deepEqual(result.brokenImages, []);
}
try {
  for (const viewport of [{ width: 1440, height: 900 }, { width: 768, height: 1024 }, { width: 390, height: 844 }, { width: 320, height: 844 }]) {
    const context = await browser.newContext({ viewport });
    const page = await context.newPage();
    page.setDefaultTimeout(8000);
    page.on("pageerror", (error) => errors.push(`${page.url()}: ${error.message}`));
    page.on("console", (message) => { if (message.type() === "error") consoleErrors.push({ url: page.url(), text: message.text(), location: message.location() }); });
    for (const locale of ["fr", "en"] as const) {
      const dictionary = getDictionary(locale);
      for (const pageId of pageIds) {
        const path = routeFor(locale, pageId);
        await check(`${viewport.width} ${path}: rendering, geometry, language, active state and equivalent-page journey`, async () => {
          const response = await page.goto(`${baseUrl}${path}`);
          assert.equal(response?.status(), 200);
          // A native button event confirms React hydration before keyboard/pointer tests.
          await page.waitForFunction(() => Object.keys(document.querySelector("header button") ?? {}).some((key) => key.startsWith("__reactProps")));
          assert.equal(await page.locator("html").getAttribute("lang"), locale);
          await geometry(page);
          const region = primaryPageIds.includes(pageId as typeof primaryPageIds[number]) ? "header" : "footer";
          const active = page.locator(`${region} a[aria-current="page"]:visible`);
          if (region === "footer" || viewport.width >= 1024) assert.equal(await active.getAttribute("href"), path);
          assert.equal(await page.locator("h1").innerText(), dictionary.pages[pageId].title);
          assert.ok((await page.locator("main").innerText()).includes(dictionary.interface.draftLabel));
          if (pageId === "legal" || pageId === "privacy") assert.ok((await page.locator("main").innerText()).includes(dictionary.interface.legalMissing));
          const other: Locale = locale === "fr" ? "en" : "fr";
          const switchLink = page.locator(`header a[hreflang="${other}"]`);
          await switchLink.click();
          await page.waitForURL(`${baseUrl}${routeFor(other, pageId)}`);
          assert.equal(await page.locator("html").getAttribute("lang"), other);
          assert.equal(await page.locator("h1").innerText(), getDictionary(other).pages[pageId].title);
        });
      }
      await page.goto(`${baseUrl}${routeFor(locale, "home")}`);
      await check(`${viewport.width} ${locale}: keyboard skip link and visible focus`, async () => {
        await page.keyboard.press("Tab");
        assert.equal(await page.locator(":focus").innerText(), dictionary.interface.skipLink);
        const focus = await page.locator(":focus").evaluate((element) => {
          const rect = element.getBoundingClientRect(), css = getComputedStyle(element);
          return { x: rect.x, y: rect.y, width: rect.width, height: rect.height, outline: css.outlineStyle, outlineWidth: css.outlineWidth };
        });
        assert.ok(focus.x >= 0 && focus.y >= 0 && focus.width > 20 && focus.height >= 44, JSON.stringify(focus));
        assert.notEqual(focus.outline, "none");
        assert.ok(parseFloat(focus.outlineWidth) >= 2);
        await capture(page, `${locale}-${viewport.width}-skip-focus`, "first Tab: skip link visible with focus ring");
        await page.keyboard.press("Enter");
        assert.equal(await page.locator(":focus").getAttribute("id"), "main-content");
      });
      if (viewport.width < 1024) {
        await check(`${viewport.width} ${locale}: disclosure pointer/keyboard/Escape, nonmodal background, route close and resize focus`, async () => {
          const toggle = page.locator("header button");
          const menu = page.locator("#mobile-navigation");
          const waitMenu = async (open: boolean) => {
            await menu.waitFor({ state: open ? "visible" : "hidden" });
            await page.waitForFunction((expanded) => document.querySelector("header button")?.getAttribute("aria-expanded") === String(expanded), open);
          };
          assert.equal(await menu.isVisible(), false);
          await toggle.focus();
          await page.keyboard.press("Tab");
          assert.equal(await page.locator(":focus").evaluate((element) => !!element.closest("#mobile-navigation")), false, "closed links excluded from Tab order");
          await toggle.focus();
          await page.keyboard.press("Enter");
          await waitMenu(true);
          assert.equal(await toggle.getAttribute("aria-expanded"), "true");
          assert.equal(await menu.isVisible(), true);
          assert.equal(await menu.locator('a[aria-current="page"]').getAttribute("href"), routeFor(locale, "home"));
          await geometry(page);
          await page.keyboard.press("Tab");
          assert.equal(await page.locator(":focus").getAttribute("href"), routeFor(locale, "home"));
          assert.equal(await page.locator(":focus").evaluate((element) => getComputedStyle(element).outlineStyle !== "none"), true);
          await capture(page, `${locale}-${viewport.width}-menu-open`, "nonmodal disclosure open; first navigation link focused");
          await scan(page, "mobile disclosure open");
          await page.keyboard.press("Escape");
          await waitMenu(false);
          assert.equal(await menu.isVisible(), false);
          assert.equal(await toggle.evaluate((element) => element === document.activeElement), true);
          await page.keyboard.press("Space");
          await waitMenu(true);
          assert.equal(await menu.isVisible(), true);
          // Pointer toggle closes. Background remains focusable/clickable for this nonmodal pattern.
          await page.getByRole("button", { name: dictionary.interface.closeMenu, exact: true }).click();
          await waitMenu(false);
          assert.equal(await menu.isVisible(), false);
          await toggle.click();
          await waitMenu(true);
          const legal = page.locator(`footer a[href="${routeFor(locale, "legal")}"]`);
          await legal.focus();
          assert.equal(await legal.evaluate((element) => element === document.activeElement && !element.closest("[inert]")), true);
          await legal.click();
          await page.waitForURL(`${baseUrl}${routeFor(locale, "legal")}`);
          await page.waitForFunction(() => document.activeElement?.id === "main-content");
          assert.equal(await menu.isVisible(), false);
          await page.getByRole("button", { name: dictionary.interface.openMenu, exact: true }).click();
          await waitMenu(true);
          await menu.locator(`a[href="${routeFor(locale, "mission")}"]`).click();
          await page.waitForURL(`${baseUrl}${routeFor(locale, "mission")}`);
          assert.equal(await menu.isVisible(), false);
          await page.waitForFunction(() => document.activeElement?.id === "main-content").catch(async (error: unknown) => { throw new Error(`Destination focus: ${await page.evaluate(() => document.activeElement?.outerHTML.slice(0, 300))}; ${String(error)}`); });
          assert.equal(await page.locator(":focus").getAttribute("id"), "main-content");
          await page.getByRole("button", { name: dictionary.interface.openMenu, exact: true }).click();
          await waitMenu(true);
          await menu.locator(`a[href="${routeFor(locale, "mission")}"]`).click();
          await waitMenu(false);
          assert.equal(await menu.isVisible(), false);
          assert.equal(await toggle.evaluate((element) => element === document.activeElement), true);
          await toggle.click();
          await waitMenu(true);
          const team = menu.locator(`a[href="${routeFor(locale, "team")}"]`);
          await team.focus();
          await page.setViewportSize({ width: 1440, height: 900 });
          await page.waitForFunction(() => document.activeElement?.getAttribute("href")?.endsWith("/team") || document.activeElement?.getAttribute("href")?.endsWith("/equipe")).catch(async (error: unknown) => { throw new Error(`Resize focus: ${await page.evaluate(() => document.activeElement?.outerHTML.slice(0, 300))}; ${String(error)}`); });
          assert.equal(await page.locator(":focus").isVisible(), true);
          await page.setViewportSize(viewport);
          assert.equal(await menu.isVisible(), false);
          await toggle.click();
          await waitMenu(true);
          const background = page.locator("footer a").first();
          await background.focus();
          await page.setViewportSize({ width: 1440, height: 900 });
          await waitMenu(false);
          assert.equal(await background.evaluate((element) => document.activeElement === element), true, "resize must not steal background focus");
          await page.setViewportSize(viewport);
        });
      } else {
        await check(`${locale}: desktop navigation pointer and keyboard current-page state`, async () => {
          const link = page.locator(`header a[href="${routeFor(locale, "team")}"]:visible`);
          await link.focus();
          await page.keyboard.press("Enter");
          await page.waitForURL(`${baseUrl}${routeFor(locale, "team")}`);
          assert.equal(await page.locator('header a[aria-current="page"]:visible').getAttribute("href"), routeFor(locale, "team"));
          await page.locator(`header a[href="${routeFor(locale, "events")}"]:visible`).click();
          await page.waitForURL(`${baseUrl}${routeFor(locale, "events")}`);
        });
      }
      await page.goto(`${baseUrl}${routeFor(locale, "home")}`);
      await capture(page, `${locale}-${viewport.width}-home`, "home, menu closed; full page including footer");
      await check(`${viewport.width} ${locale}: axe closed shell`, async () => scan(page, "home menu closed"));
      if (viewport.width === 1440 || viewport.width === 390) {
        await page.goto(`${baseUrl}${routeFor(locale, "legal")}`);
        await capture(page, `${locale}-${viewport.width}-legal`, "legal shell explicitly missing approved text");
        await check(`${viewport.width} ${locale}: axe legal shell`, async () => scan(page, "legal shell"));
      }
    }
    await context.close();
    console.log(`Completed local viewport ${viewport.width}x${viewport.height}`);
  }
  const errorContext = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await errorContext.newPage();
  await check("default entry redirects to /fr in browser", async () => {
    await page.goto(baseUrl);
    assert.equal(page.url(), `${baseUrl}/fr`);
    assert.equal(await page.locator("html").getAttribute("lang"), "fr");
  });
  for (const path of ["/fr/unknown", "/en/unknown", "/de", "/FR", "/en/equipe", "/fr/events", "/fr/mission/nested", "/en/register"]) {
    await check(`${path}: browser terminal 404 language and accessible error`, async () => {
      const response = await page.goto(`${baseUrl}${path}`);
      assert.equal(response?.status(), 404);
      assert.equal(await page.locator("main").count(), 1);
      const known = path.startsWith("/fr/") ? "fr" : path.startsWith("/en/") ? "en" : null;
      if (known) assert.equal(await page.locator("html").getAttribute("lang"), known);
      else { assert.ok((await page.locator("body").innerText()).includes("Page not found")); assert.ok(await page.locator('[lang="fr"]').count()); }
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
      if (path === "/en/unknown" || path === "/de") { await capture(page, `error-${path.slice(1).replaceAll("/", "-")}`, "actual HTTP 404"); await scan(page, "404 shell"); }
    });
  }
  await page.close();
  await errorContext.close();
  checks.push({ name: "no uncaught local browser exceptions", passed: errors.length === 0, detail: JSON.stringify(errors) });
  checks.push({ name: "no console errors on valid local routes", passed: consoleErrors.length === 0, detail: JSON.stringify(consoleErrors) });
} finally {
  await writeFile(`${output}/results.json`, JSON.stringify({ checkedAtUtc: new Date().toISOString(), baseUrl, browser: browser.version(), headless: true, sandboxEnabled: true, checks, screenshots, measurements, scans, errors, consoleErrors, summary: { passed: checks.filter((c) => c.passed).length, failed: checks.filter((c) => !c.passed).length, axeScans: scans.length } }, null, 2) + "\n");
  await browser.close();
}
console.log(`${checks.filter((c) => c.passed).length} passed; ${checks.filter((c) => !c.passed).length} failed; ${scans.length} axe scans.`);
if (checks.some((c) => !c.passed)) process.exitCode = 1;
