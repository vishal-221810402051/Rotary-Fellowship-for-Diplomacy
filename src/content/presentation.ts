import type { ContentSlot, PhotoAlbum, PhotoAsset, TeamProfile } from "./types";

export function slotContent<T>(slot: ContentSlot<T>): T | null {
  return slot.status === "missing" ? null : slot.content;
}

export function records<T>(slot: ContentSlot<readonly T[]>): readonly T[] {
  return slot.status === "missing" ? [] : slot.content;
}

export function canDisplayPhoto(photo: PhotoAsset): boolean {
  return photo.publicationPermission === "approved"
    && /^\/media\/(?:[a-zA-Z0-9_-]+\/)*[a-zA-Z0-9_-]+\.(?:jpe?g|png|webp|avif)$/.test(photo.path)
    && Number.isInteger(photo.width) && photo.width > 0
    && Number.isInteger(photo.height) && photo.height > 0
    && [photo.alt.fr, photo.alt.en, photo.credit].every((text) => text.trim().length > 0);
}

/** Keep album order and eligibility identical for full galleries and previews. */
export function resolveAlbumPhotos(album: PhotoAlbum, photos: readonly PhotoAsset[]): readonly PhotoAsset[] {
  return album.photoIds.flatMap((id) => photos.filter((photo) => photo.id === id && canDisplayPhoto(photo)));
}

export function canDisplayProfile(profile: TeamProfile): boolean {
  return profile.publicationPermission === "approved"
    && [profile.displayName, profile.role.fr, profile.role.en, profile.biography.fr, profile.biography.en].every((text) => text.trim().length > 0);
}
