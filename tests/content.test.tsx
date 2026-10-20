import assert from "node:assert/strict";
import { test } from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import { JSDOM } from "jsdom";
import { TeamProfiles } from "../src/components/people/team-profiles";
import { PhotoGallery } from "../src/components/media/photo-gallery";
import { EventArchive } from "../src/components/events/event-archive";
import { HomePage } from "../src/components/content/home-page";
import { partAContent } from "../src/content/site";
import { canDisplayPhoto, records } from "../src/content/presentation";
import { getDictionary } from "../src/i18n/dictionaries";
import { routeFor } from "../src/i18n/routes";
import { album, landscape, portrait, profile, populated } from "./fixtures/content";
import { photoSelectionCases, orderedAlbum, emptyAlbum, mixedAlbum, selectionPhotos, rejectedPhotos } from "./fixtures/photo-selection";

test("empty team and gallery states are bilingual and never invent profiles, images or actions", () => {
  for (const locale of ["fr", "en"] as const) {
    const copy = getDictionary(locale).content;
    const html = renderToStaticMarkup(<><TeamProfiles profiles={[]} photos={[]} locale={locale} /><PhotoGallery albums={[]} photos={[]} locale={locale} /></>);
    assert.ok(html.includes(copy.teamEmptyTitle));
    assert.ok(html.includes(copy.photosEmptyTitle));
    assert.doesNotMatch(html, /<img|TEST PROFILE|<a |<button/);
  }
});

test("supplied profile uses the selected language and pending profiles/portraits stay hidden", () => {
  for (const locale of ["fr", "en"] as const) {
    const html = renderToStaticMarkup(<TeamProfiles profiles={[profile]} photos={[portrait]} locale={locale} />);
    assert.ok(html.includes(profile.role[locale]) && html.includes(profile.biography[locale]));
    assert.ok(html.includes(portrait.alt[locale]));
    const pending = renderToStaticMarkup(<TeamProfiles profiles={[{ ...profile, publicationPermission: "pending" }]} photos={[portrait]} locale={locale} />);
    assert.doesNotMatch(pending, /TEST PROFILE|<img/);
    const noPortrait = renderToStaticMarkup(<TeamProfiles profiles={[profile]} photos={[{ ...portrait, publicationPermission: "pending" }]} locale={locale} />);
    assert.doesNotMatch(noPortrait, /<img/);
    assert.match(noPortrait, /TEST PROFILE/);
  }
});

test("gallery preserves album sequence, localized alt/caption, credit, dimensions and lazy loading", () => {
  for (const locale of ["fr", "en"] as const) {
    const dom = new JSDOM(renderToStaticMarkup(<PhotoGallery albums={[{ ...album, photoIds: [portrait.id, landscape.id] }]} photos={[landscape, portrait]} locale={locale} />));
    try {
      const figures = dom.window.document.querySelectorAll("figure");
      assert.equal(figures[0]?.getAttribute("data-photo-id"), portrait.id);
      const image = figures[0]?.querySelector("img");
      assert.equal(image?.getAttribute("width"), "120");
      assert.equal(image?.getAttribute("height"), "180");
      assert.equal(image?.getAttribute("loading"), "lazy");
      assert.equal(image?.getAttribute("alt"), portrait.alt[locale]);
      assert.ok(image?.getAttribute("sizes")?.includes("100vw"));
      assert.ok(figures[0]?.textContent?.includes(portrait.caption[locale]));
      assert.ok(figures[0]?.textContent?.includes("TEST FIXTURE"));
    } finally { dom.window.close(); }
  }
});

test("invalid or unapproved media cannot produce an image or an empty album heading", () => {
  for (const photo of [{ ...landscape, width: 0 }, { ...landscape, alt: { fr: "", en: "" } }, { ...landscape, path: "/media/../private.png" as const }, { ...landscape, publicationPermission: "pending" as const }]) {
    assert.equal(canDisplayPhoto(photo), false);
    const html = renderToStaticMarkup(<PhotoGallery albums={[album]} photos={[photo]} locale="en" />);
    assert.doesNotMatch(html, /<img|Test album only/);
    assert.ok(html.includes(getDictionary("en").content.photosEmptyTitle));
  }
});

test("archive contains only the supplied two title records; unknown facts remain null and no fake detail action exists", () => {
  const events = records(partAContent.events);
  assert.equal(events.length, 2);
  assert.deepEqual(events.map((event) => event.title.fr), ["Forum sur la paix Paris 2026", "Forum sur la jeunesse et diplomatie Paris 2026"]);
  for (const event of events) {
    assert.equal(event.summary, null);
    assert.equal(event.dateLabel, null);
    assert.equal(event.location, null);
    assert.equal(event.associationOrganised, null);
  }
  for (const locale of ["fr", "en"] as const) {
    const html = renderToStaticMarkup(<EventArchive events={events} locale={locale} />);
    assert.ok(html.includes(events[0]!.title[locale]));
    assert.doesNotMatch(html, /<a(?:\s|>)|<time|<button|<img/);
  }
});

test("actual mission sections have paired stable identities and complete draft translations without production fixtures", () => {
  const fr = partAContent.mission.fr.content, en = partAContent.mission.en.content;
  assert.deepEqual(fr.values.map((value) => value.id), en.values.map((value) => value.id));
  assert.equal(new Set(fr.values.map((value) => value.id)).size, 5);
  for (const locale of ["fr", "en"] as const) {
    const mission = partAContent.mission[locale];
    assert.equal(mission.status, "draft");
    assert.ok(mission.content.introduction.trim());
    for (const value of mission.content.values) assert.ok(value.title.trim() && value.description.trim());
    assert.equal(partAContent.organization[locale].status, "draft");
  }
  assert.equal(partAContent.team.status, "missing");
  assert.equal(partAContent.photos.status, "missing");
  assert.equal(partAContent.albums.status, "missing");
  assert.doesNotMatch(JSON.stringify(partAContent), /TEST PROFILE|verification-landscape|verification-portrait/);
});

test("home links all four distinct areas and adapts empty versus supplied profile/photo previews", () => {
  for (const locale of ["fr", "en"] as const) {
    const dom = new JSDOM(renderToStaticMarkup(<HomePage locale={locale} content={populated} />));
    try {
      for (const page of ["mission", "team", "events", "photos"] as const) assert.ok(dom.window.document.querySelector(`[data-preview="${page}"] a[href="${routeFor(locale, page)}"]`));
      assert.equal(dom.window.document.querySelectorAll("h1").length, 1);
      assert.ok(dom.window.document.querySelector('[data-preview="team"]')?.textContent?.includes(profile.displayName));
      assert.equal(dom.window.document.querySelectorAll('[data-preview="photos"] img').length, 2);
      const empty = renderToStaticMarkup(<HomePage locale={locale} />);
      assert.doesNotMatch(empty, /TEST PROFILE|<img/);
      assert.ok(empty.includes(getDictionary(locale).content.teamEmptyTitle));
    } finally { dom.window.close(); }
  }
});

for (const locale of ["fr", "en"] as const) {
  for (const scenario of photoSelectionCases) {
    test(`${locale} home photo preview: ${scenario.name}`, () => {
      const content = { ...populated, photos: { status: "draft" as const, content: scenario.photos }, albums: { status: "draft" as const, content: scenario.albums } };
      const dom = new JSDOM(renderToStaticMarkup(<HomePage locale={locale} content={content} />));
      try {
        const preview = dom.window.document.querySelector('[data-preview="photos"]')!;
        assert.deepEqual(Array.from(preview.querySelectorAll("figure")).map((figure) => figure.getAttribute("data-photo-id")), scenario.expectedIds);
        assert.equal(preview.textContent?.includes(getDictionary(locale).content.photosEmptyTitle), scenario.expectedIds.length === 0);
        assert.equal(preview.querySelector("a")?.getAttribute("href"), routeFor(locale, "photos"));
        for (const image of preview.querySelectorAll("img")) assert.equal(image.alt, landscape.alt[locale]);
      } finally { dom.window.close(); }
    });
  }

  test(`${locale} full gallery keeps all eligible photos in album and photoIds order`, () => {
    const second = { ...orderedAlbum, id: "test-second", photoIds: ["a", "d"] };
    const dom = new JSDOM(renderToStaticMarkup(<PhotoGallery locale={locale} albums={[emptyAlbum, mixedAlbum, second]} photos={[...selectionPhotos, ...rejectedPhotos]} />));
    try {
      assert.deepEqual(Array.from(dom.window.document.querySelectorAll("figure")).map((figure) => figure.getAttribute("data-photo-id")), ["d", "c", "b", "a", "a", "d"]);
      assert.deepEqual(Array.from(dom.window.document.querySelectorAll("h2")).map((heading) => heading.id), ["album-test-ordered", "album-test-second"]);
    } finally { dom.window.close(); }
  });
}
