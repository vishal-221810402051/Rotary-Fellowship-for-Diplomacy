import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import AxeBuilder from "@axe-core/playwright";
import type { Page } from "playwright";
import { launchVerificationBrowser } from "./browser-tooling";
import { primaryPageIds, routeFor } from "../src/i18n/routes";
import { getDictionary } from "../src/i18n/dictionaries";
import { siteIdentity } from "../src/content/site";

const base = process.env.TEST_BASE_URL ?? "http://127.0.0.1:3100";
assert.match(base, /^http:\/\/(127\.0\.0\.1|localhost):\d+$/);
const output = "docs/evidence/phase-2/browser";
await mkdir(output, { recursive: true });
const browser = await launchVerificationBrowser();
const checks: { name: string; passed: boolean; detail?: string }[] = [];
const screenshots: object[] = [], measurements: object[] = [], scans: object[] = [];
const errors: string[] = [], consoleErrors: object[] = [];
async function check(name: string, run: () => Promise<void>) {
  try { await run(); checks.push({ name, passed: true }); }
  catch (error) { const detail = String(error); checks.push({ name, passed: false, detail }); console.error(name, detail); }
}
async function capture(page: Page, name: string, state: string) {
  const path = `${output}/${name}.png`;
  await page.screenshot({ path, fullPage: true });
  screenshots.push({ path, url: page.url(), viewport: page.viewportSize(), state });
}
async function hydrated(page: Page) {
  await page.waitForFunction(() => Object.keys(document.querySelector("header button") ?? {}).some((key) => key.startsWith("__reactProps")));
}
async function scan(page: Page) {
  const result = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
  const contrastReview: object[] = [];
  for (const finding of result.incomplete) {
    assert.equal(finding.id, "color-contrast", `Unreviewed incomplete: ${finding.id}`);
    for (const node of finding.nodes) {
      const target = node.target[0];
      assert.equal(typeof target, "string");
      const styles = await page.locator(target as string).evaluate((element) => ({ color: getComputedStyle(element).color, background: getComputedStyle(element.closest(".navigation-band, .footer-band")!).backgroundImage }));
      assert.equal(styles.color, "rgb(255, 255, 255)");
      assert.match(styles.background, /^linear-gradient\(90deg(?: in srgb)?, rgb\(/);
      const stops = Array.from(styles.background.matchAll(/rgb\((\d+), (\d+), (\d+)\)/g)).map((match) => match.slice(1).map(Number));
      assert.equal(stops.length, 2);
      const maximum = [0, 1, 2].map((index) => Math.max(...stops.map((rgb) => rgb[index]!)));
      const linear = maximum.map((channel) => channel / 255 <= 0.04045 ? channel / 255 / 12.92 : ((channel / 255 + 0.055) / 1.055) ** 2.4);
      const bound = 1.05 / (0.2126 * linear[0]! + 0.7152 * linear[1]! + 0.0722 * linear[2]! + 0.05);
      assert.ok(bound >= 4.5);
      contrastReview.push({ target, ...styles, conservativeMaximumRgb: maximum, contrastLowerBound: bound, required: 4.5, resolved: true, method: "Computed browser colours and conservative sRGB interpolation bound; not a scanner-only pass" });
    }
  }
  scans.push({ url: page.url(), viewport: page.viewportSize(), engine: result.testEngine, violations: result.violations, incomplete: result.incomplete, contrastReview, passedRules: result.passes.length });
  assert.equal(result.violations.length, 0, JSON.stringify(result.violations));
}
try {
  for (const viewport of [{ width: 1440, height: 900 }, { width: 768, height: 1024 }, { width: 390, height: 844 }, { width: 320, height: 844 }]) {
    const context = await browser.newContext({ viewport });
    const page = await context.newPage();
    page.on("pageerror", (error) => errors.push(`${page.url()}: ${error.message}`));
    page.on("console", (message) => { if (message.type() === "error") consoleErrors.push({ url: page.url(), text: message.text() }); });
    for (const locale of ["fr", "en"] as const) {
      const dictionary = getDictionary(locale);
      for (const pageId of primaryPageIds) {
        const path = routeFor(locale, pageId);
        await check(`${viewport.width} ${path}: content, geometry, headings, navigation and language switch`, async () => {
          const response = await page.goto(`${base}${path}`);
          await hydrated(page);
          assert.equal(response?.status(), 200);
          assert.equal(await page.locator("html").getAttribute("lang"), locale);
          assert.equal(await page.locator("h1").innerText(), pageId === "home" ? siteIdentity.name : dictionary.pages[pageId].title);
          const geometry = await page.evaluate(() => ({
            width: innerWidth, scrollWidth: document.documentElement.scrollWidth,
            landmarks: [document.querySelectorAll("header").length, document.querySelectorAll("main").length, document.querySelectorAll("footer").length],
            headings: Array.from(document.querySelectorAll("main h1, main h2, main h3")).map((element) => ({ level: Number(element.tagName.slice(1)), text: element.textContent })),
            overflowing: Array.from(document.querySelectorAll("main p, main h1, main h2, main h3, main a")).filter((element) => element.scrollWidth > element.clientWidth + 1).map((element) => element.textContent),
            identity: document.querySelector<HTMLElement>(".site-identity")!.innerText.replace(/\s+/g, " ").trim(),
            brokenImages: Array.from(document.images).filter((image) => !image.complete || !image.naturalWidth).length,
          }));
          measurements.push({ url: page.url(), viewport, ...geometry });
          assert.ok(geometry.scrollWidth <= geometry.width);
          assert.deepEqual(geometry.landmarks, [1, 1, 1]);
          assert.equal(geometry.identity, siteIdentity.name);
          assert.equal(geometry.brokenImages, 0);
          assert.deepEqual(geometry.overflowing, []);
          assert.equal(geometry.headings.filter((heading) => heading.level === 1).length, 1);
          for (let index = 1; index < geometry.headings.length; index++) assert.ok(geometry.headings[index]!.level <= geometry.headings[index - 1]!.level + 1, "heading level skipped");
          if (pageId === "mission") assert.equal(await page.locator("main h2").count(), 5);
          if (pageId === "events") { assert.equal(await page.locator("main article").count(), 2); assert.equal(await page.locator("main a").count(), 0); }
          if (pageId === "team" || pageId === "photos") assert.equal(await page.locator('[data-empty-state="true"]').count(), 1);
          assert.equal(await page.locator('main img, main form, main button, a[href^="mailto:"]').count(), 0);
          assert.ok(!(await page.locator("main").innerText()).includes("TEST PROFILE"));
          if (viewport.width >= 1024) assert.equal(await page.locator('header a[aria-current="page"]:visible').getAttribute("href"), path);
          if (viewport.width === 1440 || viewport.width === 390) {
            await capture(page, `${locale}-${pageId}-${viewport.width}`, "Part A preview; menu closed; real content/empty state, no fixtures");
            await scan(page);
          }
          const other = locale === "fr" ? "en" : "fr";
          await page.locator(`header a[hreflang="${other}"]`).click();
          await page.waitForURL(`${base}${routeFor(other, pageId)}`);
          assert.equal(await page.locator("html").getAttribute("lang"), other);
          assert.equal(await page.locator("h1").innerText(), pageId === "home" ? siteIdentity.name : getDictionary(other).pages[pageId].title);
          // Locale layout changes can reset focus to document entry. Check it
          // is never left in hidden navigation; same-locale journeys below
          // separately require RouteFocus to move to destination main.
          assert.equal(await page.evaluate(() => !!document.activeElement?.closest("[hidden], [inert]")), false);
        });
      }
      await check(`${viewport.width} ${locale}: home preview journeys, skip/focus and shared navigation integration`, async () => {
        for (const target of ["mission", "team", "events", "photos"] as const) {
          await page.goto(`${base}${routeFor(locale, "home")}`);
          await hydrated(page);
          const link = page.locator(`[data-preview="${target}"] a`);
          await link.focus();
          assert.notEqual(await link.evaluate((element) => getComputedStyle(element).outlineStyle), "none");
          await page.keyboard.press("Enter");
          await page.waitForURL(`${base}${routeFor(locale, target)}`);
          await page.waitForFunction(() => document.activeElement?.id === "main-content");
        }
        await page.goto(`${base}${routeFor(locale, "home")}`);
        await hydrated(page);
        await page.keyboard.press("Tab");
        assert.equal(await page.locator(":focus").innerText(), dictionary.interface.skipLink);
        await page.keyboard.press("Enter");
        assert.equal(await page.locator(":focus").getAttribute("id"), "main-content");
        if (viewport.width < 1024) {
          const toggle = page.locator("header button");
          await toggle.focus(); await page.keyboard.press("Enter");
          await page.locator("#mobile-navigation").waitFor({ state: "visible" });
          await page.keyboard.press("Escape");
          await page.locator("#mobile-navigation").waitFor({ state: "hidden" });
          assert.equal(await toggle.evaluate((element) => element === document.activeElement), true);
          await toggle.click();
          await page.locator(`#mobile-navigation a[href="${routeFor(locale, "photos")}"]`).click();
          await page.waitForURL(`${base}${routeFor(locale, "photos")}`);
          await page.locator("#mobile-navigation").waitFor({ state: "hidden" });
          assert.equal(await page.locator(":focus").getAttribute("id"), "main-content");
        }
      });
    }
    await context.close();
    console.log(`Completed changed-page integration at ${viewport.width}x${viewport.height}`);
  }
  checks.push({ name: "no uncaught exceptions or console errors on valid routes", passed: errors.length === 0 && consoleErrors.length === 0 });
} finally {
  await writeFile(`${output}/results.json`, JSON.stringify({ checkedAtUtc: new Date().toISOString(), base, browser: browser.version(), headless: true, sandboxEnabled: true, scope: "Changed Phase 2 templates and integration; unchanged full disclosure/404 behaviour retains Phase 1 evidence", checks, screenshots, measurements, scans, errors, consoleErrors, summary: { passed: checks.filter((check) => check.passed).length, failed: checks.filter((check) => !check.passed).length, axeScans: scans.length } }, null, 2) + "\n");
  await browser.close();
}
console.log(`${checks.filter((check) => check.passed).length} passed; ${checks.filter((check) => !check.passed).length} failed; ${scans.length} axe scans.`);
if (checks.some((check) => !check.passed)) process.exitCode = 1;
