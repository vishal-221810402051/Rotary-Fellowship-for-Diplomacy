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
}
