import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import AxeBuilder from "@axe-core/playwright";
import { launchVerificationBrowser } from "./browser-tooling";
import { routeFor } from "../src/i18n/routes";
import { siteIdentity } from "../src/content/site";

const base = process.env.TEST_BASE_URL ?? "http://127.0.0.1:3113";
assert.match(base, /^http:\/\/(127\.0\.0\.1|localhost):\d+$/);
const output = process.env.HEADER_BRANDING_EVIDENCE_DIR ?? `docs/evidence/header-branding-${Date.now()}`;
await mkdir(output, { recursive: true });
const browser = await launchVerificationBrowser();
const states: object[] = [], errors: string[] = [], imageResponses: object[] = [];
try {
  for (const viewport of [{ width: 1440, height: 900 }, { width: 768, height: 1024 }, { width: 390, height: 844 }, { width: 320, height: 844 }]) {
    for (const locale of ["fr", "en"] as const) {
      const context = await browser.newContext({ viewport });
      const page = await context.newPage();
      page.on("pageerror", (error) => errors.push(String(error)));
      page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
      page.on("response", (response) => {
        if (response.request().resourceType() === "image") {
          imageResponses.push({ url: response.url(), status: response.status(), contentType: response.headers()["content-type"] });
          if (!response.ok()) errors.push(`Image HTTP ${response.status()}: ${response.url()}`);
        }
      });
      page.on("requestfailed", (request) => { if (request.resourceType() === "image") errors.push(`Image request failed: ${request.url()}`); });
      const response = await page.goto(`${base}${routeFor(locale, "mission")}`);
      assert.equal(response?.status(), 200);
      await page.waitForFunction(() => Object.keys(document.querySelector("header button") ?? {}).some((key) => key.startsWith("__reactProps")));
      const header = page.locator("header");
      const brand = header.getByRole("link", { name: siteIdentity.name, exact: true });
      assert.equal(await brand.count(), 1, "Single accessible branding link");
      assert.equal(await brand.getAttribute("href"), routeFor(locale, "home"));
      assert.equal(await brand.getAttribute("aria-label"), siteIdentity.name);
      assert.equal(await brand.locator("img").getAttribute("alt"), "");
      assert.equal(await brand.locator("img").getAttribute("width"), "774");
      assert.equal(await brand.locator("img").getAttribute("height"), "542");
      await brand.locator("img").evaluate((image: HTMLImageElement) => image.decode());
      assert.equal(await header.locator(".site-identity-title").count(), 1);
      assert.deepEqual(await brand.locator(".site-identity-title > span").allTextContents(), ["Rotary Fellowship", "for Diplomacy"]);
      const geometry = await brand.evaluate((element) => {
        const title = element.querySelector<HTMLElement>(".site-identity-title")!;
        const image = element.querySelector<HTMLImageElement>("img")!;
        const boxes = [element, title, element.querySelector(".site-identity-symbol")!, image,
          document.querySelector("header nav")!, document.querySelector("header button")!,
          element.parentElement!.parentElement!, ...title.children].map((node) => {
          const b = node.getBoundingClientRect();
          return { x: b.x, y: b.y, width: b.width, height: b.height, right: b.right, bottom: b.bottom };
        });
        return {
          brand: boxes[0]!, title: boxes[1]!, lines: [boxes[7]!, boxes[8]!],
          symbol: boxes[2]!, image: boxes[3]!, language: boxes[4]!, button: boxes[5]!,
          color: getComputedStyle(title).color, font: getComputedStyle(title).fontFamily, weight: getComputedStyle(title).fontWeight,
          naturalWidth: image.naturalWidth, naturalHeight: image.naturalHeight,
          viewport: innerWidth, scrollWidth: document.documentElement.scrollWidth,
          container: boxes[6]!,
        };
      });
      assert.ok(geometry.naturalWidth > 0 && geometry.naturalHeight > 0);
      assert.equal(geometry.color, "rgb(59, 80, 99)");
      assert.equal(geometry.weight, "700");
      assert.ok(geometry.font.startsWith("Arial"));
      assert.ok(Math.abs(geometry.image.width / geometry.image.height - 774 / 542) < 0.001, "Unstretched source aspect ratio");
      assert.ok(geometry.scrollWidth <= viewport.width);
      assert.ok(geometry.brand.x >= 0 && geometry.brand.right <= viewport.width);
      assert.equal(geometry.lines[0]!.x, geometry.lines[1]!.x);
      assert.ok(geometry.lines[1]!.y >= geometry.lines[0]!.bottom - 0.5);
      assert.ok(Math.abs(geometry.symbol.y + geometry.symbol.height / 2 - geometry.title.y - geometry.title.height / 2) < 0.5);
      assert.ok(Math.abs(geometry.brand.x - geometry.container.x - 16) < 0.5, "Existing container alignment");
      const overlaps = (a: typeof geometry.brand, b: typeof geometry.brand) => b.width > 0 && b.height > 0 && a.x < b.right && a.right > b.x && a.y < b.bottom && a.bottom > b.y;
      assert.equal(overlaps(geometry.brand, geometry.language), false);
      assert.equal(overlaps(geometry.brand, geometry.button), false);
      // Dark-pixel bounds measured from the original JPEG. Only blank intrinsic
      // margins may leave the reserved window; all meaningful bridge pixels fit.
      const scale = geometry.image.width / 774;
      assert.ok(geometry.image.x + 55 * scale >= geometry.symbol.x);
      assert.ok(geometry.image.x + 737 * scale <= geometry.symbol.right);
      assert.ok(geometry.image.y + 193 * scale >= geometry.symbol.y);
      assert.ok(geometry.image.y + 346 * scale <= geometry.symbol.bottom);
      const scan = await new AxeBuilder({ page }).include("header").withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
      const contrastReview: object[] = [];
      for (const finding of scan.incomplete) {
        assert.equal(finding.id, "color-contrast", "No unreviewed incomplete rule allowed");
        for (const node of finding.nodes) {
          const target = node.target[0]; assert.equal(typeof target, "string");
          const styles = await page.locator(target as string).evaluate((element) => ({ color: getComputedStyle(element).color, background: getComputedStyle(element.closest(".navigation-band")!).backgroundImage }));
          assert.equal(styles.color, "rgb(255, 255, 255)");
          assert.match(styles.background, /^linear-gradient\(90deg(?: in srgb)?, rgb\(/);
          const stops = Array.from(styles.background.matchAll(/rgb\((\d+), (\d+), (\d+)\)/g)).map((match) => match.slice(1).map(Number));
          assert.equal(stops.length, 2);
          const maximum = [0, 1, 2].map((index) => Math.max(...stops.map((rgb) => rgb[index]!)));
          const linear = maximum.map((channel) => channel / 255 <= 0.04045 ? channel / 255 / 12.92 : ((channel / 255 + 0.055) / 1.055) ** 2.4);
          const bound = 1.05 / (0.2126 * linear[0]! + 0.7152 * linear[1]! + 0.0722 * linear[2]! + 0.05);
          assert.ok(bound >= 4.5);
          contrastReview.push({ target, ...styles, conservativeMaximumRgb: maximum, contrastLowerBound: bound, required: 4.5, resolved: true });
        }
      }
      assert.deepEqual(scan.violations, []);
      const screenshot = `${output}/${locale}-${viewport.width}.png`;
      await header.screenshot({ path: screenshot });
      await page.keyboard.press("Tab"); // Existing skip link.
      await page.keyboard.press("Tab");
      assert.equal(await brand.evaluate((element) => element === document.activeElement), true);
      const focus = await brand.evaluate((element) => ({ style: getComputedStyle(element).outlineStyle, width: getComputedStyle(element).outlineWidth, color: getComputedStyle(element).outlineColor }));
      assert.equal(focus.style, "solid"); assert.equal(focus.width, "3px");
      let focusScreenshot: string | null = null;
      if ((locale === "fr" && viewport.width === 1440) || (locale === "en" && viewport.width === 320)) {
        focusScreenshot = `${output}/${locale}-${viewport.width}-focus.png`;
        await header.screenshot({ path: focusScreenshot });
      }
      await page.keyboard.press("Enter");
      await page.waitForURL(`${base}${routeFor(locale, "home")}`);
      assert.equal(await page.locator("html").getAttribute("lang"), locale);
      const other = locale === "fr" ? "en" : "fr";
      await header.locator(`a[hreflang="${other}"]`).click();
      await page.waitForURL(`${base}${routeFor(other, "home")}`);
      await header.locator(`a[hreflang="${locale}"]`).click();
      await page.waitForURL(`${base}${routeFor(locale, "home")}`);
      const toggle = header.locator("button");
      if (viewport.width < 1024) {
        await toggle.focus(); await page.keyboard.press("Enter");
        assert.equal(await toggle.getAttribute("aria-expanded"), "true");
        await page.keyboard.press("Escape");
        assert.equal(await toggle.getAttribute("aria-expanded"), "false");
        assert.equal(await toggle.evaluate((element) => element === document.activeElement), true);
        await toggle.click();
      }
      const mission = header.locator(`a[href="${routeFor(locale, "mission")}"]:visible`);
      await mission.focus(); await page.keyboard.press("Enter");
      await page.waitForURL(`${base}${routeFor(locale, "mission")}`);
      await page.waitForFunction(() => document.activeElement?.id === "main-content");
      if (viewport.width < 1024) assert.equal(await toggle.getAttribute("aria-expanded"), "false");
      assert.equal(await header.locator('a[aria-current="page"]:visible').count(), viewport.width < 1024 ? 0 : 1);
      await header.locator(`a[hreflang="${other}"]`).click();
      await page.waitForURL(`${base}${routeFor(other, "mission")}`);
      assert.equal(await page.locator("html").getAttribute("lang"), other);
      assert.equal(await header.getByRole("link", { name: siteIdentity.name, exact: true }).getAttribute("href"), routeFor(other, "home"));
      states.push({ url: `${base}${routeFor(locale, "mission")}`, locale, viewport, geometry, focus, screenshot, focusScreenshot, axe: { engine: scan.testEngine, violations: scan.violations, incomplete: scan.incomplete, contrastReview }, homepageKeyboardActivation: true, equivalentLanguageSwitch: true, navigationKeyboardJourney: true, mobileEscapeAndCloseAfterNavigation: viewport.width < 1024 ? true : "not applicable", passed: true });
      await context.close();
    }
  }
  assert.ok(imageResponses.length >= 8); assert.deepEqual(errors, []);
} finally {
  await writeFile(`${output}/results.json`, JSON.stringify({ checkedAtUtc: new Date().toISOString(), base, browser: browser.version(), states, imageResponses, errors, scope: "Focused header branding/navigation, not Phase 3 or reference equivalence", limits: "Header-only axe scans and Chrome developer verification; no client visual approval, trademark-rights verification or full accessibility certification" }, null, 2) + "\n");
  await browser.close();
}
console.log(`PASS: ${states.length} bilingual header states, image/geometry/focus/navigation and header axe checks.`);
