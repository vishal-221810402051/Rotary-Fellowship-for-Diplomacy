import { getDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/locales";
import type { PageId } from "@/i18n/routes";
import { partAContent } from "@/content/site";
import { records, slotContent } from "@/content/presentation";
import type { LegalContent } from "@/content/types";
import { SiteShell } from "@/components/layout/site-shell";
import { HomePage } from "./home-page";
import { PageIntro, EmptyState } from "./page-intro";
import { TeamProfiles } from "@/components/people/team-profiles";
import { EventArchive } from "@/components/events/event-archive";
import { PhotoGallery } from "@/components/media/photo-gallery";

export function PageShell({ locale, pageId }: { locale: Locale; pageId: PageId }) {
  const dictionary = getDictionary(locale);
  const isLegal = pageId === "legal" || pageId === "privacy";
  const copy = dictionary.content;
  const availability = isLegal ? partAContent[pageId][locale].status : pageId === "home" ? partAContent.organization[locale].status : pageId === "mission" ? partAContent.mission[locale].status : partAContent[pageId].status;
  const events = records(partAContent.events);
  const legal = isLegal ? slotContent<LegalContent>(partAContent[pageId][locale]) : null;
  return (
    <SiteShell locale={locale} pageId={pageId}>
      <div data-content-status={availability}>
        <p className="mb-8 text-sm leading-relaxed text-muted"><span className="mr-3 inline-block border-l-4 border-gold pl-3 font-medium">{dictionary.interface.draftLabel}</span>{copy.previewNote}</p>
        {pageId === "home" ? <HomePage locale={locale} /> : (
          <>
            <PageIntro title={dictionary.pages[pageId].title}>
              {pageId === "mission" ? <p>{partAContent.mission[locale].content.introduction}</p> : null}
              {pageId === "team" ? <p>{copy.teamIntro}</p> : null}
              {pageId === "events" ? <p>{copy.eventsIntro}</p> : null}
              {pageId === "photos" ? <p>{copy.photosIntro}</p> : null}
              {isLegal && !legal ? <p>{dictionary.interface.legalMissing}</p> : null}
            </PageIntro>
            <div className="mt-10 sm:mt-12">
              {pageId === "mission" ? <div className="max-w-readable divide-y divide-line border-t border-line">{partAContent.mission[locale].content.values.map((value) => (
                <section key={value.id} aria-labelledby={`mission-${value.id}`} className="py-7 sm:py-9">
                  <h2 id={`mission-${value.id}`} className="text-2xl font-semibold leading-snug text-brand-deep">{value.title}</h2>
                  <p className="mt-4 text-lg leading-relaxed text-muted">{value.description}</p>
                </section>
              ))}</div> : null}
              {pageId === "team" ? <TeamProfiles locale={locale} profiles={records(partAContent.team)} photos={records(partAContent.photos)} /> : null}
              {pageId === "events" ? events.length ? <EventArchive events={events} locale={locale} /> : <EmptyState title={copy.eventsEmptyTitle} description={copy.eventsEmptyBody} /> : null}
              {pageId === "photos" ? <PhotoGallery locale={locale} albums={records(partAContent.albums)} photos={records(partAContent.photos)} /> : null}
              {legal ? <div className="max-w-readable space-y-5 text-lg leading-relaxed text-muted">{legal.paragraphs.map((text, index) => <p key={index}>{text}</p>)}</div> : null}
            </div>
          </>
        )}
      </div>
    </SiteShell>
  );
}
