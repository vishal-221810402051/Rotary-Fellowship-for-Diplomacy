import { mkdir, writeFile } from "node:fs/promises";
import { launchVerificationBrowser } from "./browser-tooling";

// One request, then resize the same document. Stop immediately on an access
// failure; a 429 page is blocker evidence and never reference UI evidence.
const output = "docs/evidence/phase-1-browser/reference";
await mkdir(output, { recursive: true });
const browser = await launchVerificationBrowser();
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await context.newPage();
page.setDefaultTimeout(5000);
const results: object[] = [];
const errors: string[] = [];
const failedRequests: object[] = [];
page.on("pageerror", (error) => errors.push(error.message));
page.on("requestfailed", (request) => failedRequests.push({ url: request.url(), failure: request.failure() }));
let responseDetails: object | null = null;
try {
  const response = await page.goto("https://amicalerotaryfrancophonie.org/", { waitUntil: "load", timeout: 30000 });
  responseDetails = { status: response?.status(), url: page.url(), retryAfter: response?.headers()["retry-after"] ?? null };
  if (response?.status() !== 200) {
    await page.screenshot({ path: `${output}/followup-access-failure-1440x900.png` });
    results.push({ verifiedInterface: false, response: responseDetails, limitation: "Access failure; no further requests or UI comparison attempted." });
  } else {
    for (const viewport of [{ width: 1440, height: 900 }, { width: 768, height: 1024 }, { width: 390, height: 844 }, { width: 320, height: 844 }]) {
      await page.setViewportSize(viewport);
      await page.evaluate(async () => { await document.fonts.ready; window.scrollTo(0, 0); });
      const prefix = `${output}/followup-home-${viewport.width}x${viewport.height}`;
      const measurements = await page.evaluate(() => ({
        width: innerWidth, scrollWidth: document.documentElement.scrollWidth,
        fonts: Array.from(document.fonts).map((font) => ({ family: font.family, status: font.status })),
        brokenImages: Array.from(document.images).filter((image) => !image.naturalWidth).map((image) => image.src),
        elements: ["#masthead", ".site-container", ".site-branding", "#site-navigation", "#mobile-toggle", "#mobile-drawer", "#colophon", "#footer-navigation"].flatMap((selector) => Array.from(document.querySelectorAll(selector)).slice(0, 3).map((element) => {
          const rect = element.getBoundingClientRect(), style = getComputedStyle(element);
          return { selector, x: rect.x, y: rect.y, width: rect.width, height: rect.height, display: style.display, background: style.background, fontFamily: style.fontFamily, fontSize: style.fontSize, padding: style.padding };
        })),
      }));
      await page.screenshot({ path: `${prefix}-top.png` });
      await page.locator("#colophon").screenshot({ path: `${prefix}-footer.png` });
      let interaction: object | null = null;
      if (await page.locator("#mobile-toggle").isVisible()) {
        try {
          await page.locator("#mobile-toggle").click();
          await page.locator("#mobile-drawer").waitFor({ state: "visible" });
          await page.screenshot({ path: `${prefix}-menu-open.png` });
          const opened = await page.locator("#mobile-drawer").evaluate((element) => ({ rect: element.getBoundingClientRect().toJSON(), role: element.getAttribute("role"), modal: element.getAttribute("aria-modal"), focused: document.activeElement?.outerHTML.slice(0, 200) }));
          await page.keyboard.press("Escape");
          interaction = { opened, escapeClosed: !(await page.locator("#mobile-drawer").isVisible()), focusAfterEscape: await page.evaluate(() => document.activeElement?.outerHTML.slice(0, 200)) };
          if (await page.locator("#mobile-drawer").isVisible()) await page.locator(".menu-toggle-close").first().click();
        } catch (error) { interaction = { failure: String(error) }; }
      }
      results.push({ verifiedInterface: true, url: page.url(), viewport, measurements, interaction, screenshotPrefix: prefix });
    }
  }
} catch (error) {
  results.push({ verifiedInterface: false, failure: String(error) });
} finally {
  await writeFile(`${output}/followup-results.json`, JSON.stringify({ checkedAtUtc: new Date().toISOString(), browser: browser.version(), headless: true, sandboxEnabled: true, method: "Single public navigation; matched viewports reuse that document; no security bypass, content/assets copied or forms submitted", response: responseDetails, errors, failedRequests, results }, null, 2) + "\n");
  await browser.close();
}
console.log(JSON.stringify({ response: responseDetails, results: results.length, errors, failedRequests: failedRequests.length }));
