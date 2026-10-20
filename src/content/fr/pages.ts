import type { MissionContent, OrganizationContent } from "../types";

// Editorial drafts based on Data A pp.2-3. Client review is still required.
export const organization = {
  welcomeMessage: "Les Routes de la Diplomatie par la culture, la paix, le business et les échanges internationaux",
  introduction: "Relier les Rotariens et les non-Rotariens à travers le monde pour ouvrir le dialogue entre les cultures, encourager la coopération et contribuer à la paix. Rotary Fellowship for Diplomacy place les rencontres, les échanges économiques et la communication institutionnelle au cœur de cette démarche.",
} satisfies OrganizationContent;

export const mission = {
  introduction: "Créer des liens entre les personnes et les cultures, pour faire du dialogue un point de départ vers la paix et la coopération internationale.",
  values: [
    { id: "connections", title: "Relier les personnes", description: "Réunir les Rotariens et les non-Rotariens, partout dans le monde, autour d’un espace de rencontre et d’échange ouvert à des parcours différents." },
    { id: "dialogue", title: "Faire vivre le dialogue interculturel", description: "Favoriser la compréhension entre les cultures par l’écoute, la rencontre et le partage des points de vue." },
    { id: "peace", title: "Encourager la paix et la coopération", description: "Placer le dialogue au service de la paix et de la coopération internationale, en recherchant ce qui rapproche les personnes et les communautés." },
    { id: "exchange", title: "Développer les échanges économiques", description: "Donner une place aux échanges commerciaux et économiques dans les relations internationales, dans une démarche de dialogue et de coopération." },
    { id: "communication", title: "Soutenir la communication institutionnelle", description: "Faciliter la circulation des idées et la communication entre les personnes et les institutions, pour nourrir les échanges internationaux." },
  ],
} satisfies MissionContent;
