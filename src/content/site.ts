import type { PartAContent } from "./types";

export const siteIdentity = {
  name: "Rotary Fellowship for Diplomacy",
  publicEmail: null as string | null,
} as const;

// No client content has been supplied/approved in the working tree.
// A missing slot is not an approved empty collection or a fabricated sample.
export const partAContent = {
  organization: { fr: { status: "missing", content: null }, en: { status: "missing", content: null } },
  mission: { fr: { status: "missing", content: null }, en: { status: "missing", content: null } },
  team: { status: "missing", content: null },
  events: { status: "missing", content: null },
  photos: { status: "missing", content: null },
  legal: { fr: { status: "missing", content: null }, en: { status: "missing", content: null } },
  privacy: { fr: { status: "missing", content: null }, en: { status: "missing", content: null } },
} as const satisfies PartAContent;
