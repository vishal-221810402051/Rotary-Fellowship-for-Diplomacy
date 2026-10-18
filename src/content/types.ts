import type { Locale } from "../i18n/locales";

export type Localized<T> = Record<Locale, T>;
export type ContentSlot<T> =
  | { status: "missing"; content: null }
  | { status: "draft" | "approved"; content: T };

export interface OrganizationContent {
  introduction: string;
  welcomeMessage: string;
}

export interface MissionContent {
  introduction: string;
  values: readonly { id: string; title: string; description: string }[];
}

export interface TeamProfile {
  id: string;
  displayName: string;
  role: Localized<string>;
  biography: Localized<string>;
  portraitId: string | null;
}

export interface PastEvent {
  id: string;
  slug: Localized<string>;
  title: Localized<string>;
  summary: Localized<string>;
  dateLabel: Localized<string> | null;
  location: Localized<string> | null;
  associationOrganised: true;
  photoIds: readonly string[];
}

export interface PhotoAsset {
  id: string;
  eventId: string;
  path: `/media/${string}`;
  width: number;
  height: number;
  alt: Localized<string>;
  caption: Localized<string>;
  credit: string;
  publicationPermission: "pending" | "approved";
}

export interface LegalContent {
  paragraphs: readonly string[];
}

export interface PartAContent {
  organization: Localized<ContentSlot<OrganizationContent>>;
  mission: Localized<ContentSlot<MissionContent>>;
  team: ContentSlot<readonly TeamProfile[]>;
  events: ContentSlot<readonly PastEvent[]>;
  photos: ContentSlot<readonly PhotoAsset[]>;
  legal: Localized<ContentSlot<LegalContent>>;
  privacy: Localized<ContentSlot<LegalContent>>;
}
