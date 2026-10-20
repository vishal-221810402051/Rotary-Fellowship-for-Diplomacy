import type { PhotoAsset, TeamProfile } from "@/content/types";
import { canDisplayProfile } from "@/content/presentation";
import { EmptyState } from "@/components/content/page-intro";
import { PhotoFigure } from "@/components/media/photo-figure";
import type { Locale } from "@/i18n/locales";
import { getDictionary } from "@/i18n/dictionaries";

export function TeamProfiles({ profiles, photos, locale }: { profiles: readonly TeamProfile[]; photos: readonly PhotoAsset[]; locale: Locale }) {
  const copy = getDictionary(locale).content;
  const visible = profiles.filter(canDisplayProfile);
  if (!visible.length) return <EmptyState title={copy.teamEmptyTitle} description={copy.teamEmptyBody} />;
  return (
    <ul className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3" data-profile-list="true">
      {visible.map((profile) => (
        <li key={profile.id} className="min-w-0 border-t-2 border-brand-deep pt-5">
          <h2 className="text-2xl font-semibold leading-snug text-brand-deep">{profile.displayName}</h2>
          <p className="mt-2 font-medium text-muted">{profile.role[locale]}</p>
          <p className="mt-4 leading-relaxed text-ink">{profile.biography[locale]}</p>
          {photos.filter((photo) => photo.id === profile.portraitId).map((photo) => <div key={photo.id} className="mt-6"><PhotoFigure photo={photo} locale={locale} creditLabel={copy.photoCredit} /></div>)}
        </li>
      ))}
    </ul>
  );
}
