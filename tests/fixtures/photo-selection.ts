import type { PhotoAlbum, PhotoAsset } from "../../src/content/types";
import { landscape } from "./content";

// Synthetic chart records only; never imported by application content/routes.
export const selectionPhotos: readonly PhotoAsset[] = ["a", "b", "c", "d"].map((id) => ({
  ...landscape, id, caption: { fr: `Image de TEST ${id}`, en: `TEST image ${id}` },
}));
export const rejectedPhotos: readonly PhotoAsset[] = [
  { ...landscape, id: "pending", publicationPermission: "pending" },
  { ...landscape, id: "bad-path", path: "/media/../private.png" },
  { ...landscape, id: "bad-size", width: 0 },
  { ...landscape, id: "bad-alt", alt: { fr: "Texte de test", en: "" } },
];
export const orderedAlbum: PhotoAlbum = {
  id: "test-ordered", title: { fr: "Album de TEST ordonné", en: "Ordered TEST album" },
  description: null, eventId: "test-event", photoIds: ["d", "c", "b", "a"],
};
export const emptyAlbum: PhotoAlbum = { ...orderedAlbum, id: "test-empty", photoIds: [] };
export const rejectedAlbum: PhotoAlbum = { ...orderedAlbum, id: "test-rejected", photoIds: ["missing", ...rejectedPhotos.map((photo) => photo.id)] };
export const mixedAlbum: PhotoAlbum = { ...orderedAlbum, photoIds: ["pending", "missing", "d", "bad-path", "c", "bad-size", "b", "bad-alt", "a"] };

export const photoSelectionCases: readonly { name: string; albums: readonly PhotoAlbum[]; photos: readonly PhotoAsset[]; expectedIds: readonly string[] }[] = [
  { name: "empty first album followed by usable album", albums: [emptyAlbum, orderedAlbum], photos: selectionPhotos, expectedIds: ["d", "c", "b"] },
  { name: "rejected and missing first-album photos followed by usable album", albums: [rejectedAlbum, orderedAlbum], photos: [...selectionPhotos, ...rejectedPhotos], expectedIds: ["d", "c", "b"] },
  { name: "album order wins over four-photo manifest order", albums: [orderedAlbum], photos: selectionPhotos, expectedIds: ["d", "c", "b"] },
  { name: "rejections are removed before the three-photo limit", albums: [mixedAlbum], photos: [...selectionPhotos, ...rejectedPhotos], expectedIds: ["d", "c", "b"] },
  { name: "no usable photos anywhere", albums: [emptyAlbum, rejectedAlbum], photos: rejectedPhotos, expectedIds: [] },
];
