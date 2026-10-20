import type { MissionContent, OrganizationContent } from "../types";

// Draft English editorial translations of the Data A themes and proposed slogan.
export const organization = {
  welcomeMessage: "Paths of Diplomacy through culture, peace, business and international exchange",
  introduction: "Connecting Rotarians and non-Rotarians around the world to open dialogue between cultures, encourage cooperation and contribute to peace. Rotary Fellowship for Diplomacy places encounters, economic exchange and institutional communication at the heart of this approach.",
} satisfies OrganizationContent;

export const mission = {
  introduction: "Building connections between people and cultures, with dialogue as a starting point for peace and international cooperation.",
  values: [
    { id: "connections", title: "Connecting people", description: "Bringing Rotarians and non-Rotarians together worldwide in a space for meeting and exchange, open to people with different backgrounds." },
    { id: "dialogue", title: "Encouraging intercultural dialogue", description: "Encouraging understanding between cultures through listening, meeting and sharing perspectives." },
    { id: "peace", title: "Supporting peace and cooperation", description: "Putting dialogue at the service of peace and international cooperation by looking for what connects people and communities." },
    { id: "exchange", title: "Developing economic exchange", description: "Making room for commercial and economic exchange in international relations through dialogue and cooperation." },
    { id: "communication", title: "Supporting institutional communication", description: "Helping ideas circulate and encouraging communication between people and institutions to support international exchange." },
  ],
} satisfies MissionContent;
