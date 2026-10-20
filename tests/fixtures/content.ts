import type { PartAContent, PhotoAsset, PhotoAlbum, TeamProfile } from "../../src/content/types";
import { partAContent } from "../../src/content/site";

// Isolated TEST DATA ONLY. Not imported by src/ or any production route.
export const landscape: PhotoAsset = {
  id: "test-landscape", eventId: "test-event", path: "/media/verification-landscape.png", width: 320, height: 200,
  alt: { fr: "Mire de couleurs de test, pas une photographie de l’association", en: "Test colour chart, not an association photograph" },
  caption: { fr: "Image de test uniquement", en: "Test image only" }, credit: "TEST FIXTURE", publicationPermission: "approved",
};
export const portrait: PhotoAsset = {
  ...landscape, id: "test-portrait", path: "/media/verification-portrait.png", width: 120, height: 180,
};
export const profile: TeamProfile = {
  id: "test-profile", displayName: "TEST PROFILE", role: { fr: "Rôle de test", en: "Test role" }, biography: { fr: "Biographie de test, pas une personne réelle.", en: "Test biography, not a real person." }, portraitId: portrait.id, publicationPermission: "approved",
};
export const album: PhotoAlbum = { id: "test-album", title: { fr: "Album de test uniquement", en: "Test album only" }, description: null, eventId: "test-event", photoIds: [landscape.id, portrait.id] };
export const populated: PartAContent = {
  ...partAContent,
  team: { status: "draft", content: [profile] },
  photos: { status: "draft", content: [landscape, portrait] },
  albums: { status: "draft", content: [album] },
};
