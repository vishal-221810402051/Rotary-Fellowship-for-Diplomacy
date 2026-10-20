import type { PageId } from "./routes";

export interface Dictionary {
  navigation: Record<PageId, string>;
  interface: {
    skipLink: string;
    mainNavigation: string;
    footerNavigation: string;
    languageNavigation: string;
    currentLanguage: string;
    openMenu: string;
    closeMenu: string;
    draftLabel: string;
    shellMessage: string;
    legalMissing: string;
    explore: string;
    notFoundTitle: string;
    notFoundMessage: string;
    returnHome: string;
  };
  pages: Record<PageId, { title: string }>;
  content: {
    previewNote: string;
    missionHeading: string;
    teamHeading: string;
    eventsHeading: string;
    photosHeading: string;
    readMission: string;
    readTeam: string;
    readEvents: string;
    readPhotos: string;
    teamIntro: string;
    teamEmptyTitle: string;
    teamEmptyBody: string;
    eventsIntro: string;
    eventsEmptyTitle: string;
    eventsEmptyBody: string;
    photosIntro: string;
    photosEmptyTitle: string;
    photosEmptyBody: string;
    photoCredit: string;
  };
}
