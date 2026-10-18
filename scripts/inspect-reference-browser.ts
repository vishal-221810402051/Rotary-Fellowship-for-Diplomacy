import { mkdir, writeFile } from "node:fs/promises";
import { launchVerificationBrowser } from "./browser-tooling";

const output = "docs/evidence/phase-1-browser/reference";
await mkdir(output, { recursive: true });
const browser = await launchVerificationBrowser();
const results: object[] = [];
try {
  targets: for (const target of [
    { path: "/", key: "home", widths: [1440, 768, 390, 320] },
    { path: "/a-propos/", key: "about", widths: [1440, 390] },
  ]) {
    for (const width of target.widths) {
      const viewport = { width, height: width === 1440 ? 900 : width === 768 ? 1024 : 844 };
      const page = await browser.newPage({ viewport });
      page.setDefaultTimeout(10_000);
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));
      const base = `${target.key}-${width}x${viewport.height}`;
      try {
        const response = await page.goto(`https://amicalerotaryfrancophonie.org${target.path}`, { waitUntil: "load", timeout: 30_000 });
        if (response?.status() !== 200) {
          await page.screenshot({ path: `${output}/${base}-access-failure.png` });
          results.push({ url: page.url(), httpStatus: response?.status(), viewport, verifiedInterface: false, limitation: "Access failure; stopped further requests." });
          break targets;
        }
        await page.evaluate(async () => {
          await Promise.race([document.fonts.ready, new Promise((resolve) => setTimeout(resolve, 5000))]);
        });
        const measurements = await page.evaluate(() => {
          const selectors = ["#masthead", ".site-branding", ".site-branding img", "#site-navigation", "#site-navigation a", "#secondary-navigation", "#mobile-toggle", "#mobile-drawer", ".site-header-row-layout-contained", ".site-container", "#primary", ".entry-content", "h1", "#colophon", "#footer-navigation", "#colophon .site-footer-row"];
          return {
            viewport: { width: innerWidth, height: innerHeight },
            pageWidth: document.documentElement.scrollWidth,
            fontsLoaded: document.fonts.status,
            elements: selectors.flatMap((selector) => Array.from(document.querySelectorAll<HTMLElement>(selector)).slice(0, 3).map((element) => {
              const box = element.getBoundingClientRect();
              const style = getComputedStyle(element);
              return { selector, visible: box.width > 0 && box.height > 0 && style.visibility !== "hidden", x: box.x, y: box.y, width: box.width, height: box.height, display: style.display, position: style.position, font: style.fontFamily, fontSize: style.fontSize, weight: style.fontWeight, lineHeight: style.lineHeight, color: style.color, background: style.backgroundColor, padding: style.padding, text: selector.includes("navigation a") ? element.textContent?.trim().slice(0, 60) : undefined };
            })),
            menuButtons: Array.from(document.querySelectorAll<HTMLButtonElement>("button")).filter((button) => button.getBoundingClientRect().width > 0).map((button) => ({ id: button.id, name: button.getAttribute("aria-label") ?? button.textContent?.trim(), expanded: button.getAttribute("aria-expanded"), controls: button.getAttribute("aria-controls"), target: button.getAttribute("data-toggle-target") })),
          };
        });
        await page.screenshot({ path: `${output}/${base}-top.png` });
        const header = page.locator("#masthead");
        if (await header.count()) await header.screenshot({ path: `${output}/${base}-header.png` });
        const footer = page.locator("#colophon");
        if (await footer.count()) await footer.screenshot({ path: `${output}/${base}-footer.png` });
        let mobileInteraction: object | null = null;
        const toggle = page.locator("#mobile-toggle");
        if (width < 1025 && await toggle.isVisible()) {
          await toggle.scrollIntoViewIfNeeded();
          await toggle.click();
          const drawer = page.locator("#mobile-drawer");
          await drawer.waitFor({ state: "visible" });
          await page.screenshot({ path: `${output}/${base}-menu-open.png` });
          const open = await drawer.evaluate((element) => {
            const box = element.getBoundingClientRect();
            return { x: box.x, y: box.y, width: box.width, height: box.height, role: element.getAttribute("role"), modal: element.getAttribute("aria-modal"), bodyClass: document.body.className, focusedElement: document.activeElement?.outerHTML.slice(0, 220), links: Array.from(element.querySelectorAll("a")).slice(0, 8).map((a) => ({ text: a.textContent?.trim(), href: a.getAttribute("href") })) };
          });
          await page.keyboard.press("Escape");
          mobileInteraction = { open, escapeClosed: !(await drawer.isVisible()), focusAfterEscape: await page.evaluate(() => ({ id: document.activeElement?.id, name: document.activeElement?.getAttribute("aria-label") })) };
          if (await drawer.isVisible()) {
            const close = drawer.locator('button.menu-toggle-close');
            if (await close.count()) await close.click();
          }
        }
        results.push({ url: page.url(), requestedUrl: `https://amicalerotaryfrancophonie.org${target.path}`, httpStatus: response?.status(), viewport, measurements, mobileInteraction, errors, screenshotPrefix: `${output}/${base}` });
        console.log(`Reference captured: ${target.key} ${width}x${viewport.height}, HTTP ${response?.status()}`);
      } catch (error) {
        results.push({ url: `https://amicalerotaryfrancophonie.org${target.path}`, viewport, failure: String(error), errors });
        console.log(`Reference failure ${target.key}/${width}: ${String(error).slice(0, 250)}`);
      } finally {
        await page.close();
      }
    }
  }
} finally {
  await writeFile(`${output}/results.json`, JSON.stringify({ checkedAtUtc: new Date().toISOString(), browser: browser.version(), headless: true, sandboxEnabled: true, method: "Rendered Playwright inspection of public reference shared elements; no forms submitted or assets incorporated into application", results }, null, 2) + "\n");
  await browser.close();
}
