import type { Dictionary } from "../dictionary-types";

export const fr = {
  navigation: { home: "Accueil", mission: "Mission", team: "Équipe", events: "Événements passés", photos: "Photos", legal: "Mentions légales", privacy: "Confidentialité" },
  interface: {
    skipLink: "Aller au contenu",
    mainNavigation: "Navigation principale",
    footerNavigation: "Informations légales",
    languageNavigation: "Choisir la langue",
    currentLanguage: "langue actuelle",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    draftLabel: "Site en préparation",
    shellMessage: "Le contenu de cette page est en préparation et n’a pas encore été validé.",
    legalMissing: "Le texte officiel de cette page n’a pas encore été fourni. Cette page ne constitue pas une politique approuvée.",
    explore: "Explorer le site",
    notFoundTitle: "Page introuvable",
    notFoundMessage: "Cette adresse ne correspond à aucune page du site.",
    returnHome: "Retour à l’accueil",
  },
  pages: { home: { title: "Accueil" }, mission: { title: "Mission" }, team: { title: "Équipe" }, events: { title: "Événements passés" }, photos: { title: "Photos" }, legal: { title: "Mentions légales" }, privacy: { title: "Confidentialité" } },
} as const satisfies Dictionary;
