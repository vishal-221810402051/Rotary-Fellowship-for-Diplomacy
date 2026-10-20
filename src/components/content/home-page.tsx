import Link from "next/link";
import type { ReactNode } from "react";
import type { Locale } from "@/i18n/locales";
import { routeFor, type PageId } from "@/i18n/routes";
import { getDictionary } from "@/i18n/dictionaries";
import { partAContent, siteIdentity } from "@/content/site";
import { records, slotContent, resolveAlbumPhotos, canDisplayProfile } from "@/content/presentation";
import type { PartAContent } from "@/content/types";
import { PageIntro } from "./page-intro";
import { EventArchive } from "@/components/events/event-archive";
import { PhotoGallery } from "@/components/media/photo-gallery";

function PreviewSection({ locale, pageId, title, label, children }: { locale: Locale; pageId: Exclude<PageId, "home" | "legal" | "privacy">; title: string; label: string; children: ReactNode }) {
  return (
    <section aria-labelledby={`preview-${pageId}`} className="grid gap-6 border-t border-line py-9 sm:py-12 lg:grid-cols-3 lg:gap-12" data-preview={pageId}>
      <div>
        <p className="mb-3 text-sm font-semibold tracking-wide text-muted">{getDictionary(locale).navigation[pageId]}</p>
        <h2 id={`preview-${pageId}`} className="text-2xl font-semibold leading-snug text-brand-deep">{title}</h2>
      </div>
      <div className="min-w-0 space-y-5 lg:col-span-2">
        <div className="text-lg leading-relaxed text-muted">{children}</div>
        <Link href={routeFor(locale, pageId)} className="inline-flex min-h-11 items-center py-2 font-semibold text-brand-deep underline decoration-gold decoration-2 underline-offset-8">{label}</Link>
      </div>
    </section>
  );
}

export function HomePage({ locale, content = partAContent }: { locale: Locale; content?: PartAContent }) {
  const copy = getDictionary(locale).content;
  const organization = slotContent(content.organization[locale]);
  const mission = slotContent(content.mission[locale]);
  const profiles = records(content.team).filter(canDisplayProfile).slice(0, 3);
  const photos = records(content.photos);
  const previewAlbum = records(content.albums)
    .map((album) => ({ album, photos: resolveAlbumPhotos(album, photos) }))
    .find((group) => group.photos.length > 0);
  const events = records(content.events);
  return (
    <>
      <PageIntro title={siteIdentity.name}>
        {organization ? <><p className="text-xl font-medium leading-relaxed text-brand-deep sm:text-2xl">{organization.welcomeMessage}</p><p>{organization.introduction}</p></> : null}
      </PageIntro>
      <div className="mt-12 sm:mt-16">
        <PreviewSection locale={locale} pageId="mission" title={copy.missionHeading} label={copy.readMission}><p>{mission?.introduction}</p></PreviewSection>
        <PreviewSection locale={locale} pageId="team" title={copy.teamHeading} label={copy.readTeam}>
          {profiles.length ? <ul className="space-y-4">{profiles.map((profile) => <li key={profile.id}><p className="font-semibold text-brand-deep">{profile.displayName}</p><p>{profile.role[locale]}</p></li>)}</ul> : <p>{copy.teamEmptyTitle}</p>}
        </PreviewSection>
        <PreviewSection locale={locale} pageId="events" title={copy.eventsHeading} label={copy.readEvents}>
          {events.length ? <EventArchive events={events} locale={locale} headingLevel={3} /> : <p>{copy.eventsEmptyTitle}</p>}
        </PreviewSection>
        <PreviewSection locale={locale} pageId="photos" title={copy.photosHeading} label={copy.readPhotos}>
          {previewAlbum ? <PhotoGallery locale={locale} albums={[previewAlbum.album]} photos={previewAlbum.photos.slice(0, 3)} headingLevel={3} /> : <p>{copy.photosEmptyTitle}</p>}
        </PreviewSection>
      </div>
    </>
  );
}
