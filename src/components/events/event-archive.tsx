import type { PastEvent } from "@/content/types";
import type { Locale } from "@/i18n/locales";

export function EventArchive({ events, locale, headingLevel = 2 }: { events: readonly PastEvent[]; locale: Locale; headingLevel?: 2 | 3 }) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <ul className="divide-y divide-line border-y border-line" data-event-archive="true">
      {events.map((event) => (
        <li key={event.id} className="py-7 sm:py-9" data-event-id={event.id}>
          <article className="max-w-readable">
            <Heading className="text-xl font-semibold leading-snug text-brand-deep sm:text-2xl">{event.title[locale]}</Heading>
            {event.summary ? <p className="mt-4 text-lg leading-relaxed text-muted">{event.summary[locale]}</p> : null}
            {event.dateLabel ? <p className="mt-3 text-muted">{event.dateLabel[locale]}</p> : null}
            {event.location ? <p className="mt-2 text-muted">{event.location[locale]}</p> : null}
          </article>
        </li>
      ))}
    </ul>
  );
}
