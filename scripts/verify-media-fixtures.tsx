import assert from "node:assert/strict";
import { createServer } from "node:http";
import { mkdir, writeFile } from "node:fs/promises";
import { renderToStaticMarkup } from "react-dom/server";
import AxeBuilder from "@axe-core/playwright";
import { launchVerificationBrowser } from "./browser-tooling";
import { TeamProfiles } from "../src/components/people/team-profiles";
import { PhotoGallery } from "../src/components/media/photo-gallery";
import { album, landscape, portrait, profile } from "../tests/fixtures/content";

const base = process.env.TEST_BASE_URL ?? "http://127.0.0.1:3100";
assert.match(base, /^http:\/\/(127\.0\.0\.1|localhost):\d+$/);
const output = "docs/evidence/phase-2/media-fixtures";
await mkdir(output, { recursive: true });
const appHtml = await (await fetch(`${base}/fr`)).text();
const stylesheet = appHtml.match(/<link rel="stylesheet" href="([^"]+)"/)?.[1];
assert.ok(stylesheet, "Use the real compiled application CSS");
for (const photo of [landscape, portrait]) {
  const response = await fetch(`${base}${photo.path}`);
  assert.equal(response.status, 200, "Temporarily copy tests/fixtures/media PNGs to their verification-only public paths before starting Next");
  assert.match(response.headers.get("content-type") ?? "", /image\/png/);
}
assert.equal((await fetch(`${base}/media/does-not-exist.png`)).status, 404);
const server = createServer(async (request, response) => {
  try {
    const url = new URL(request.url ?? "/", "http://127.0.0.1");
    if (url.pathname === "/_next/image" || url.pathname.startsWith("/media/") || url.pathname === stylesheet) {
      const upstream = await fetch(`${base}${url.pathname}${url.search}`);
      response.writeHead(upstream.status, { "Content-Type": upstream.headers.get("content-type") ?? "application/octet-stream" });
      response.end(Buffer.from(await upstream.arrayBuffer()));
      return;
    }
    assert.ok(url.pathname === "/fr" || url.pathname === "/en");
    const locale = url.pathname === "/fr" ? "fr" : "en";
    const body = renderToStaticMarkup(<main className="mx-auto max-w-site px-4 py-10"><h1 className="mb-10 text-3xl font-semibold">ISOLATED TEST DATA — NOT ASSOCIATION CONTENT</h1><TeamProfiles locale={locale} profiles={[profile]} photos={[portrait]} /><div className="mt-12"><PhotoGallery locale={locale} albums={[album]} photos={[landscape, portrait]} /></div></main>);
    response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    response.end(`<!doctype html><html lang="${locale}"><head><meta name="viewport" content="width=device-width,initial-scale=1"><title>Isolated media verification</title><link rel="icon" href="data:,"><link rel="stylesheet" href="${stylesheet}"></head><body>${body}</body></html>`);
  } catch (error) { response.writeHead(500); response.end(String(error)); }
});
await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
const address = server.address();
assert.ok(address && typeof address !== "string");
const origin = `http://127.0.0.1:${address.port}`;
const browser = await launchVerificationBrowser();
const results: object[] = [], errors: string[] = [];
try {
  for (const viewport of [{ width: 1440, height: 900 }, { width: 390, height: 844 }, { width: 320, height: 844 }]) {
    for (const locale of ["fr", "en"] as const) {
      const context = await browser.newContext({ viewport });
      const page = await context.newPage();
      page.on("pageerror", (error) => errors.push(error.message));
      page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
      const imageResponses: object[] = [];
      page.on("response", (response) => { if (response.url().includes("/_next/image?")) imageResponses.push({ url: response.url(), status: response.status(), contentType: response.headers()["content-type"] }); });
      let releaseImages!: () => void;
      const gate = new Promise<void>((resolve) => { releaseImages = resolve; });
      await page.route("**/_next/image?**", async (route) => { await gate; await route.continue(); });
      await page.goto(`${origin}/${locale}`, { waitUntil: "domcontentloaded" });
      await page.locator("h1").waitFor();
      // CSS must be applied before comparing reserved dimensions with loaded dimensions.
      await page.waitForFunction(() => getComputedStyle(document.querySelector("h1")!).fontSize === "30px");
      const before = await page.locator("img").evaluateAll((images) => images.map((image) => ({ width: image.getBoundingClientRect().width, height: image.getBoundingClientRect().height, complete: (image as HTMLImageElement).complete })));
      assert.equal(before.length, 3);
      assert.ok(before.every((image) => image.width > 0 && image.height > 0 && !image.complete));
      releaseImages();
      for (const image of await page.locator("img").all()) { await image.scrollIntoViewIfNeeded(); await image.evaluate((element: HTMLImageElement) => element.decode()); }
      const after = await page.locator("img").evaluateAll((images) => images.map((element) => ({ width: element.getBoundingClientRect().width, height: element.getBoundingClientRect().height, naturalWidth: (element as HTMLImageElement).naturalWidth, naturalHeight: (element as HTMLImageElement).naturalHeight, alt: element.getAttribute("alt"), loading: element.getAttribute("loading"), srcset: element.getAttribute("srcset") })));
      for (let index = 0; index < after.length; index++) {
        const image = after[index]!;
        assert.ok(image.naturalWidth > 0 && image.naturalHeight > 0);
        assert.ok(Math.abs(image.width - before[index]!.width) < 1 && Math.abs(image.height - before[index]!.height) < 1, "reserved dimensions stable through load");
        const expectedRatio = index === 1 ? 320 / 200 : 120 / 180;
        assert.ok(Math.abs(image.width / image.height - expectedRatio) < 0.01);
        assert.equal(image.alt, landscape.alt[locale]);
        assert.equal(image.loading, "lazy");
        assert.ok(image.srcset?.includes("/_next/image?"));
      }
      assert.ok(imageResponses.length >= 2);
      assert.ok(imageResponses.every((response) => (response as { status: number }).status === 200));
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
      assert.ok((await page.locator("main").innerText()).includes(profile.biography[locale]));
      const axe = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
      assert.deepEqual(axe.violations, []);
      assert.deepEqual(axe.incomplete, []);
      await page.evaluate(() => scrollTo(0, 0));
      const screenshot = `${output}/${locale}-${viewport.width}.png`;
      await page.screenshot({ path: screenshot, fullPage: true });
      results.push({ url: page.url(), viewport, locale, screenshot, state: "Isolated test profile/album, nonphotographic charts, all images loaded; no production fixture route", before, after, imageResponses, axe: { engine: axe.testEngine, violations: axe.violations, incomplete: axe.incomplete, passes: axe.passes.length } });
      await context.close();
    }
  }
  assert.deepEqual(errors, []);
} finally {
  await writeFile(`${output}/results.json`, JSON.stringify({ checkedAtUtc: new Date().toISOString(), applicationBase: base, browser: browser.version(), temporaryPublicFiles: [landscape.path, portrait.path], directStaticFiles: "200 image/png", missingStaticFile: 404, results, errors }, null, 2) + "\n");
  await browser.close();
  await new Promise<void>((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
}
console.log(`PASS: ${results.length} isolated bilingual/viewport media states; real optimiser requests, load geometry and axe checked.`);
