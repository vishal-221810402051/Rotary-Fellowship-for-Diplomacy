// Editorial/source status, deliberately kept out of visitor copy and client props.
export const contentProvenance = {
  introduction: { source: "Data A p.2, A01.04", status: "draft", review: "Client review of French copy and English translation required" },
  slogan: { source: "Data A p.3, A02.06", fr: "source wording; proposed, not approved", en: "draft translation" },
  mission: { source: "Data A p.2, A01.04; owner Phase 2 instruction D-026", status: "draft", topics: ["connections", "dialogue", "peace", "exchange", "communication"] },
  eventTitles: { source: "Data A p.5; owner supplies both records in D-026", fr: "source-backed titles", en: "draft title translations", dateVenueHost: "not supplied; null, not inferred from titles" },
  profiles: { source: "no delivered records", status: "missing" },
  photographs: { source: "no delivered authorised assets", status: "missing" },
  legal: { source: "no delivered approved text", status: "missing" },
} as const;
