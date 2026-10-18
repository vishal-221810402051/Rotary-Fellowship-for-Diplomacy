import type { Dictionary } from "../dictionary-types";

export const en = {
  navigation: { home: "Home", mission: "Mission", team: "Team", events: "Past events", photos: "Photos", legal: "Legal notice", privacy: "Privacy" },
  interface: {
    skipLink: "Skip to content",
    mainNavigation: "Main navigation",
    footerNavigation: "Legal information",
    languageNavigation: "Choose language",
    currentLanguage: "current language",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    draftLabel: "Website in preparation",
    shellMessage: "The content of this page is in preparation and has not yet been approved.",
    legalMissing: "The official text for this page has not yet been supplied. This page is not an approved policy.",
    explore: "Explore the website",
    notFoundTitle: "Page not found",
    notFoundMessage: "This address does not match a page on the website.",
    returnHome: "Return home",
  },
  pages: { home: { title: "Home" }, mission: { title: "Mission" }, team: { title: "Team" }, events: { title: "Past events" }, photos: { title: "Photos" }, legal: { title: "Legal notice" }, privacy: { title: "Privacy" } },
} as const satisfies Dictionary;
