import { getImageProps } from "next/image";
import type { PhotoAsset } from "@/content/types";
import { canDisplayPhoto } from "@/content/presentation";
import type { Locale } from "@/i18n/locales";

export function PhotoFigure({ photo, locale, creditLabel }: { photo: PhotoAsset; locale: Locale; creditLabel: string }) {
  if (!canDisplayPhoto(photo)) return null;
  // Next's server-safe helper retains the optimiser and responsive srcset
  // without adding a client component or a blur-placeholder lifecycle.
  const { props } = getImageProps({ src: photo.path, alt: photo.alt[locale], width: photo.width, height: photo.height, sizes: "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw", loading: "lazy", className: "h-auto w-full bg-surface", style: { aspectRatio: `${photo.width} / ${photo.height}` } });
  return (
    <figure className="min-w-0" data-photo-id={photo.id}>
      <img {...props} />
      <figcaption className="mt-3 space-y-1 text-sm leading-relaxed text-muted">
        {photo.caption[locale] ? <p>{photo.caption[locale]}</p> : null}
        <p>{creditLabel} {photo.credit}</p>
      </figcaption>
    </figure>
  );
}
