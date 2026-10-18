import assert from "node:assert/strict";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import AxeBuilder from "@axe-core/playwright";
import { launchVerificationBrowser } from "./browser-tooling";

// Bounded local regression check for the evidence-supported desktop type change.
// Never navigates to the reference or overwrites the earlier full verification.
const output = "docs/evidence/phase-1-fidelity-review";
const base = "http://127.0.0.1:3100";
const prior = JSON.parse(await readFile("docs/evidence/phase-1-browser/local/results.json", "utf8")) as {
  scans: { contrastReview: { color: string; background: string; contrastLowerBound: number }[] }[];
};
const reviewedColours = prior.scans.flatMap((scan) => scan.contrastReview);
await mkdir(output, { recursive: true });
const browser = await launchVerificationBrowser();
const results: object[] = [];
const consoleErrors: string[] = [];
const errors: string[] = [];
try {
  for (const target of [
    { path: "/fr", width: 1440, height: 900 },
    { path: "/en/team", width: 1440, height: 900 },
    { path: "/fr", width: 1024, height: 900 },
    { path: "/en/team", width: 1024, height: 900 },
    { path: "/fr", width: 390, height: 844 },
    { path: "/en/team", width: 320, height: 844 },
  ]) {
    const viewport = { width: target.width, height: target.height };
    const context = await browser.newContext({ viewport });
    const page = await context.newPage();
    page.on("console", (message) => { if (message.type() === "error") consoleErrors.push(message.text()); });
    page.on("pageerror", (error) => errors.push(error.message));
    const response = await page.goto(`${base}${target.path}`);
    assert.equal(response?.status(), 200);
    const desktop = target.width >= 1024;
    if (!desktop) {
      await page.locator("header button").click();
      await page.locator("#mobile-navigation").waitFor({ state: "visible" });
    }
    const links = page.locator(desktop ? ".navigation-band nav:visible a" : "#mobile-navigation a");
    await page.keyboard.press("Tab");
    await links.first().focus();
    const layout = await page.evaluate(() => {
      const groups = ["header", ".navigation-band > div", ".site-identity", ".navigation-band a", "footer", ".footer-band"].map((selector) => Array.from(document.querySelectorAll<HTMLElement>(selector)).filter((e) => e.getBoundingClientRect().width > 0).map((e) => {
        const rect = e.getBoundingClientRect(), css = getComputedStyle(e);
        return { text: e.textContent, x: rect.x, y: rect.y, right: rect.right, bottom: rect.bottom, width: rect.width, height: rect.height, fontSize: css.fontSize, lineHeight: css.lineHeight, padding: css.padding, focused: document.activeElement === e, outline: css.outlineStyle, outlineWidth: css.outlineWidth, outlineColor: css.outlineColor };
      }));
      return { width: innerWidth, scrollWidth: document.documentElement.scrollWidth, header: groups[0]!, container: groups[1]!, identity: groups[2]!, navLinks: groups[3]!, footer: groups[4]!, footerBand: groups[5]! };
    });
    assert.equal(layout.scrollWidth, target.width);
    assert.equal(layout.navLinks.length, 5);
    for (const link of layout.navLinks) {
      assert.equal(link.fontSize, desktop ? "20px" : "18px");
      assert.ok(link.height >= 44 && link.x >= 0 && link.right <= target.width);
    }
    for (let index = 1; index < layout.navLinks.length; index++) {
      const previous = layout.navLinks[index - 1]!, current = layout.navLinks[index]!;
      assert.ok(desktop ? previous.right <= current.x : previous.bottom <= current.y, "navigation overlap");
    }
    const focused = layout.navLinks.find((link) => link.focused);
    assert.ok(focused && focused.outline !== "none" && parseFloat(focused.outlineWidth) >= 2);
    if (desktop) assert.equal(layout.header[0]?.height, 200);
    if (target.width === 1440) {
      assert.equal(layout.container[0]?.width, 1320);
      assert.equal(layout.identity[0]?.x, 76);
      assert.equal(layout.footerBand[0]?.height, 132);
    }
    let accessibility: object | null = null;
    if (target.width === 1440) {
      const scan = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
      assert.equal(scan.violations.length, 0);
      const contrastReview: object[] = [];
      for (const finding of scan.incomplete) {
        assert.equal(finding.id, "color-contrast");
        for (const node of finding.nodes) {
          assert.equal(typeof node.target[0], "string");
          const colours = await page.locator(node.target[0] as string).evaluate((e) => ({ color: getComputedStyle(e).color, background: getComputedStyle(e.closest(".navigation-band, .footer-band")!).backgroundImage }));
          const existing = reviewedColours.find((entry) => entry.color === colours.color && entry.background === colours.background);
          assert.ok(existing && existing.contrastLowerBound >= 4.5, "changed or unreviewed gradient colours");
          contrastReview.push({ target: node.target, ...colours, contrastLowerBound: existing.contrastLowerBound, resolved: true, method: "Actual computed colours equal the previously reviewed sRGB gradient; unchanged conservative calculation reused", evidence: "../phase-1-browser/local/results.json" });
        }
      }
      accessibility = { engine: scan.testEngine, violations: scan.violations, incomplete: scan.incomplete, contrastReview };
    }
    const screenshot = `${output}/${target.path.slice(1).replaceAll("/", "-")}-${target.width}x${target.height}.png`;
    await page.screenshot({ path: screenshot, fullPage: true });
    if (desktop) {
      const team = target.path.startsWith("/fr") ? "/fr/equipe" : "/en/team";
      await page.locator(`.navigation-band nav:visible a[href="${team}"]`).focus();
      await page.keyboard.press("Enter");
      await page.waitForURL(`${base}${team}`);
      assert.equal(await page.locator('.navigation-band nav:visible a[aria-current="page"]').getAttribute("href"), team);
    } else {
      await page.keyboard.press("Escape");
      await page.locator("#mobile-navigation").waitFor({ state: "hidden" });
      assert.equal(await page.locator("header button").evaluate((e) => e === document.activeElement), true);
    }
    results.push({ url: `${base}${target.path}`, viewport, state: desktop ? "desktop navigation focused" : "mobile disclosure open, navigation focused", layout, screenshot, accessibility, passed: true });
    await context.close();
  }
  assert.deepEqual(errors, []);
  assert.deepEqual(consoleErrors, []);
} catch (error) {
  errors.push(String(error));
  throw error;
} finally {
  await writeFile(`${output}/local-results.json`, JSON.stringify({ checkedAtUtc: new Date().toISOString(), browser: browser.version(), headless: true, sandboxEnabled: true, referenceRequests: 0, results, errors, consoleErrors }, null, 2) + "\n");
  await browser.close();
}
console.log(`PASS: ${results.length} targeted viewport/route checks; 2 axe scans; existing full-suite evidence preserved.`);
