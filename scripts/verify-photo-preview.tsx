import assert from "node:assert/strict";
import { createServer } from "node:http";
import { mkdir, writeFile } from "node:fs/promises";
import { renderToStaticMarkup } from "react-dom/server";
import AxeBuilder from "@axe-core/playwright";
import { launchVerificationBrowser } from "./browser-tooling";
import { HomePage } from "../src/components/content/home-page";
import { PhotoGallery } from "../src/components/media/photo-gallery";
import { getDictionary } from "../src/i18n/dictionaries";
import { populated } from "../tests/fixtures/content";
import { photoSelectionCases } from "../tests/fixtures/photo-selection";

const base = process.env.TEST_BASE_URL ?? "http://127.0.0.1:3112";
assert.match(base, /^http:\/\/(127\.0\.0\.1|localhost):\d+$/);
const output = process.env.PHOTO_PREVIEW_EVIDENCE_DIR ?? `docs/evidence/phase-2-photo-preview-${Date.now()}`;
await mkdir(output, { recursive: true });
const html = await (await fetch(`${base}/fr`)).text();
const css = html.match(/<link rel="stylesheet" href="([^"]+)"/)?.[1];
assert.ok(css);
const server = createServer(async (request, response) => {
  try {
    const url = new URL(request.url ?? "/", "http://127.0.0.1");
    if (url.pathname.startsWith("/_next/")) {
      const upstream = await fetch(`${base}${url.pathname}${url.search}`);
      response.writeHead(upstream.status, { "Content-Type": upstream.headers.get("content-type") ?? "application/octet-stream" });
      response.end(Buffer.from(await upstream.arrayBuffer())); return;
    }
    const locale = url.pathname.startsWith("/fr") ? "fr" : "en";
    const referer = new URL(request.headers.referer ?? "/", "http://127.0.0.1");
    const index = Number(url.searchParams.get("case") ?? referer.searchParams.get("case") ?? "0");
    const scenario = photoSelectionCases[index]; assert.ok(scenario);
    const gallery = url.pathname === `/${locale}/photos`;
    const content = { ...populated, photos: { status: "draft" as const, content: scenario.photos }, albums: { status: "draft" as const, content: scenario.albums } };
    const body = renderToStaticMarkup(<><header lang="en" className="border-b border-line px-4 py-6"><p>ISOLATED TEST DATA ONLY — NOT ASSOCIATION PHOTOGRAPHS</p><p>{scenario.name}</p></header><main className="mx-auto max-w-site px-4 py-10">{gallery ? <><h1 className="mb-8 text-3xl">Photos</h1><PhotoGallery locale={locale} albums={scenario.albums} photos={scenario.photos} /></> : <HomePage locale={locale} content={content} />}</main></>);
    response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    response.end(`<!doctype html><html lang="${locale}"><head><meta name="viewport" content="width=device-width,initial-scale=1"><title>Isolated photo preview verification</title><link rel="icon" href="data:,"><link rel="stylesheet" href="${css}"></head><body>${body}</body></html>`);
  } catch (error) { response.writeHead(500); response.end(String(error)); }
});
await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
const address = server.address(); assert.ok(address && typeof address !== "string");
const origin = `http://127.0.0.1:${address.port}`;
const browser = await launchVerificationBrowser();
const states: object[] = [], scans: object[] = [], errors: string[] = [];
try {
  for (const viewport of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
    for (const locale of ["fr", "en"] as const) {
      const context = await browser.newContext({ viewport }); const page = await context.newPage();
      page.on("pageerror", (error) => errors.push(String(error)));
      page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
      for (const [index, scenario] of photoSelectionCases.entries()) {
        await page.goto(`${origin}/${locale}?case=${index}`);
        const preview = page.locator('[data-preview="photos"]');
        for (const image of await preview.locator("img").all()) { await image.scrollIntoViewIfNeeded(); await image.evaluate((element: HTMLImageElement) => element.decode()); }
        const actualIds = await preview.locator("figure").evaluateAll((figures) => figures.map((figure) => figure.getAttribute("data-photo-id")));
        assert.deepEqual(actualIds, scenario.expectedIds);
        assert.equal((await preview.innerText()).includes(getDictionary(locale).content.photosEmptyTitle), scenario.expectedIds.length === 0);
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
        const axe = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
        scans.push({ url: page.url(), viewport, violations: axe.violations, incomplete: axe.incomplete, engine: axe.testEngine });
        assert.deepEqual(axe.violations, []); assert.deepEqual(axe.incomplete, []);
        await page.evaluate(() => scrollTo(0, 0));
        const screenshot = `${output}/${locale}-${viewport.width}-case-${index}.png`;
        await page.screenshot({ path: screenshot, fullPage: true });
        const url = page.url();
        const link = preview.locator("a"); await link.focus();
        assert.notEqual(await link.evaluate((element) => getComputedStyle(element).outlineStyle), "none");
        await page.keyboard.press("Enter"); await page.waitForURL(`${origin}/${locale}/photos`);
        const galleryIds = await page.locator("figure").evaluateAll((figures) => figures.map((figure) => figure.getAttribute("data-photo-id")));
        assert.deepEqual(galleryIds, scenario.expectedIds.length ? ["d", "c", "b", "a"] : []);
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
        states.push({ url, viewport, locale, scenario: scenario.name, expectedIds: scenario.expectedIds, actualIds, screenshot, galleryUrl: page.url(), galleryIds, passed: true });
      }
      await context.close();
    }
  }
  assert.deepEqual(errors, []);
} finally {
  await browser.close();
  await new Promise<void>((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
  await writeFile(`${output}/results.json`, JSON.stringify({ checkedAtUtc: new Date().toISOString(), applicationBase: base, browser: browser.version(), method: "Actual HomePage and PhotoGallery SSR in separate localhost preview; real compiled CSS/optimiser; no application fixture routes", states, scans, errors, isolatedServerClosed: true }, null, 2) + "\n");
}
console.log(`PASS: ${states.length} populated/empty homepage states and gallery journeys; ${scans.length} axe scans, no violations/incompletes or console errors.`);
