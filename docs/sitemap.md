# Bilingual sitemap and routes

**Five separate areas and locale/default/switch policy approved by the owner (D-009–D-011).** Phase 2 replaces the five shell pairs with page layouts under D-026; legal/privacy remain accurate missing-text shells. The registry still contains 14 localized routes. Labels/slugs are engineering choices. [Current implementation/evidence](phase-2-report.md).

| Stable page key | French label / URL | English label / URL | Component template | Requirement / condition |
| --- | --- | --- | --- | --- |
| home | Accueil — `/fr` | Home — `/en` | `HomePage` | D-010: previews linking to mission/team/past events/photos. |
| mission | Mission — `/fr/mission` | Mission — `/en/mission` | `PageShell` / thematic sections | Five source-faithful draft themes; no dedicated history page. |
| team | Équipe — `/fr/equipe` | Team — `/en/team` | `TeamProfiles` | Honest empty state; reusable supplied-profile layout, C-05. |
| events | Événements passés — `/fr/evenements` | Past events — `/en/events` | `EventArchive` | Two owner-supplied titles; no organising attribution inferred. |
| photos | Photos — `/fr/photos` | Photos — `/en/photos` | `PhotoGallery` / `PhotoFigure` | Empty state until authorised assets/album context supplied; album headings use `album-<id>` IDs. |
| legal | Mentions légales — `/fr/mentions-legales` | Legal notice — `/en/legal-notice` | `LegalPage` | A03.15; C-10, C-11; approved text only. |
| privacy | Confidentialité — `/fr/confidentialite` | Privacy — `/en/privacy` | `PrivacyPage` | A03.15/A10.02; actual processing/legal owner required. |

## Route mechanics

- Owner-approved `/` redirect to `/fr`; explicit links use the selected locale. No automatic geolocation/profile detection or language cookie is planned.
- Build one route registry mapping page/event identity to each locale path; do not translate arbitrary URL strings. `LanguageSwitch` preserves the current page/event; photo links may preserve an album anchor when paired. Root support files: `/sitemap.xml`, `/robots.txt`; these are technical routes, not extra content sections.
- D-026 now supplies the two forum titles as archive records. **No detail slug, exact date, venue or organising attribution is supplied.** No event detail routes were implemented; nested event URLs still return 404. No dynamic public project routes.
- Invalid locale, unregistered slug and unknown route must return a genuine 404, localized when locale is valid; unsupported/unlocalized paths use a clearly bilingual global 404. Never display an invented event. Phase 1's local checks record actual results separately. `/fr/evenements` and `/en/events` remain explicitly labelled past events.
- No separate album-detail route, lightbox, raw-image action or unsupported back-link. Albums render in-page only when linked authorised photos exist. No actual albums/photographs are delivered; fixture previews are on a separate temporary localhost server, never application routes.
- Core navigation: home, mission, team, past events, photos; homepage previews link to each separate internal area. Language control separate. Footer: legal/privacy and a `mailto:` link only once a public email is supplied; otherwise no public contact action. No contact route/form or disabled membership/donation/news controls.
- Legal/privacy routes/layout can be created before final text delivery. Draft text stays clearly marked in development; approved final text is required before public release, and no invented text is presented as approved.
- Locale links are generated from the same registry now. Production canonical/alternate metadata and sitemap publication remain later work once the verified host/content exists; no domain or sitemap URLs are invented. All current shells are explicitly `noindex`, and `robots.txt` disallows crawling until release review. Optional later `x-default` will use the agreed default entry.

## Proposed journeys / acceptance

| Journey | Future check |
| --- | --- |
| Home → mission/team/archive/photos | All five essentials reachable by keyboard and pointer in both locales. |
| Archive / photo albums | Two readable title records; no unsupported detail action. Empty gallery is honest. Populated album/image behaviour verified in isolated fixtures; actual asset approval remains pending. |
| Any page → language counterpart | Equivalent page/event, current locale indicated, no unexpected home reset. |
| Mobile menu → target; close/Escape | Usable menu, visible focus, focus returns predictably, route destination correct. |
| Footer → legal/privacy and optional email | Correct locale; approved final legal text at release; no email action while address is missing, then supplied public `mailto:` destination only. |
| Unknown route/event/locale | True 404; no indexable placeholders or silent cross-language content. |

Broader/deferred features have no Part A routes. Their original requirements remain in [the register](requirements-register.md); the separate [owner decisions](owner-decisions.md) set the effective initial scope. Detailed event facts, translations and legal text are development/release inputs, not remaining planning-scope decisions.
