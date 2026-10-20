import type { PhotoAlbum, PhotoAsset } from "@/content/types";
import { resolveAlbumPhotos } from "@/content/presentation";
import { EmptyState } from "@/components/content/page-intro";
import { PhotoFigure } from "./photo-figure";
import type { Locale } from "@/i18n/locales";
import { getDictionary } from "@/i18n/dictionaries";

export function PhotoGallery({ albums, photos, locale, headingLevel = 2 }: { albums: readonly PhotoAlbum[]; photos: readonly PhotoAsset[]; locale: Locale; headingLevel?: 2 | 3 }) {
  const copy = getDictionary(locale).content;
  const Heading = headingLevel === 2 ? "h2" : "h3";
  const visible = albums.map((album) => ({ album, photos: resolveAlbumPhotos(album, photos) })).filter((group) => group.photos.length > 0);
  if (!visible.length) return <EmptyState title={copy.photosEmptyTitle} description={copy.photosEmptyBody} />;
  return (
    <div className="space-y-14" data-photo-gallery="true">
      {visible.map(({ album, photos: pictures }) => (
        <section key={album.id} aria-labelledby={`album-${album.id}`}>
          <Heading id={`album-${album.id}`} className="text-2xl font-semibold text-brand-deep">{album.title[locale]}</Heading>
          {album.description ? <p className="mt-4 max-w-readable text-lg leading-relaxed text-muted">{album.description[locale]}</p> : null}
          <div className="mt-7 grid items-start gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {pictures.map((photo) => <PhotoFigure key={photo.id} photo={photo} locale={locale} creditLabel={copy.photoCredit} />)}
          </div>
        </section>
      ))}
    </div>
  );
}
