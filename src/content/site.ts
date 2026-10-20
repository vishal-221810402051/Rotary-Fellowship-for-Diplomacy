import type { PartAContent } from "./types";
import * as fr from "./fr/pages";
import * as en from "./en/pages";

export const siteIdentity = {
  name: "Rotary Fellowship for Diplomacy",
  publicEmail: null as string | null,
} as const;

// Source-backed editorial drafts and the two owner-supplied event titles only.
// No client profiles, photographs, legal text or public email were delivered.
export const partAContent = {
  organization: { fr: { status: "draft", content: fr.organization }, en: { status: "draft", content: en.organization } },
  mission: { fr: { status: "draft", content: fr.mission }, en: { status: "draft", content: en.mission } },
  team: { status: "missing", content: null },
  events: { status: "draft", content: [
    { id: "peace-forum-paris-2026", title: { fr: "Forum sur la paix Paris 2026", en: "Forum on Peace, Paris 2026" }, summary: null, dateLabel: null, location: null, associationOrganised: null, photoIds: [] },
    { id: "youth-diplomacy-forum-paris-2026", title: { fr: "Forum sur la jeunesse et diplomatie Paris 2026", en: "Forum on Youth and Diplomacy, Paris 2026" }, summary: null, dateLabel: null, location: null, associationOrganised: null, photoIds: [] },
  ] },
  photos: { status: "missing", content: null },
  albums: { status: "missing", content: null },
  legal: { fr: { status: "missing", content: null }, en: { status: "missing", content: null } },
  privacy: { fr: { status: "missing", content: null }, en: { status: "missing", content: null } },
} as const satisfies PartAContent;
