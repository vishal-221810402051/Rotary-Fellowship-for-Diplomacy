# Bilingual sitemap and routes

**Five separate areas and locale/default/switch policy approved by the owner (D-009–D-011).** Human-facing labels and exact translated slugs below are engineering choices, not quotations from Data A. Phase 1 implements all five shell pairs plus legal/privacy pairs (14 shells); supporting event details/albums remain Phase 2. See [actual mapping and policy](phase-1-implementation.md).

| Stable page key | French label / URL | English label / URL | Component template | Requirement / condition |
| --- | --- | --- | --- | --- |
| home | Accueil — `/fr` | Home — `/en` | `HomePage` | D-010: previews linking to mission/team/past events/photos. |
| mission | Mission — `/fr/mission` | Mission — `/en/mission` | `MissionPage` | Separate mission page, D-009–D-010; no dedicated history page. |
| team | Équipe — `/fr/equipe` | Team — `/en/team` | `TeamPage` | A03.04; C-05. |
| events | Événements passés — `/fr/evenements` | Past events — `/en/events` | `EventArchivePage` | A03.08; own past events only. |
| event (supporting, not Phase 1) | `/fr/evenements/[slug]` | `/en/events/[slug]` | Future `EventDetailPage` | Deferred to Phase 2 supplied approved content; these nested URLs currently return 404. Not a sixth primary area. |
| photos | Photos — `/fr/photos` | Photos — `/en/photos` | `PhotosPage` with album anchors | A03.11; event photos only. |
| legal | Mentions légales — `/fr/mentions-legales` | Legal notice — `/en/legal-notice` | `LegalPage` | A03.15; C-10, C-11; approved text only. |
| privacy | Confidentialité — `/fr/confidentialite` | Privacy — `/en/privacy` | `PrivacyPage` | A03.15/A10.02; actual processing/legal owner required. |

## Route mechanics

- Owner-approved `/` redirect to `/fr`; explicit links use the selected locale. No automatic geolocation/profile detection or language cookie is planned.
- Build one route registry mapping page/event identity to each locale path; do not translate arbitrary URL strings. `LanguageSwitch` preserves the current page/event; photo links may preserve an album anchor when paired. Root support files: `/sitemap.xml`, `/robots.txt`; these are technical routes, not extra content sections.
- Event candidates are the two p.5 forum names. **No factual slug/date/venue is approved yet.** Locale slugs must be confirmed with supplied content. No dynamic public project routes are proposed.
- Invalid locale, unregistered slug and unknown route must return a genuine 404, localized when locale is valid; unsupported/unlocalized paths use a clearly bilingual global 404. Never display an invented event. Phase 1's local checks record actual results separately. `/fr/evenements` and `/en/events` remain explicitly labelled past events.
- No separate album-detail route in baseline A: event detail links to `photos#<stable-event-id>` and Photos links back to paired event detail. A lightbox or album route would require a recorded decision.
- Core navigation: home, mission, team, past events, photos; homepage previews link to each separate internal area. Language control separate. Footer: legal/privacy and a `mailto:` link only once a public email is supplied; otherwise no public contact action. No contact route/form or disabled membership/donation/news controls.
- Legal/privacy routes/layout can be created before final text delivery. Draft text stays clearly marked in development; approved final text is required before public release, and no invented text is presented as approved.
- Locale links are generated from the same registry now. Production canonical/alternate metadata and sitemap publication remain later work once the verified host/content exists; no domain or sitemap URLs are invented. All current shells are explicitly `noindex`, and `robots.txt` disallows crawling until release review. Optional later `x-default` will use the agreed default entry.

## Proposed journeys / acceptance

| Journey | Future check |
| --- | --- |
| Home → mission/team/archive/photos | All five essentials reachable by keyboard and pointer in both locales. |
| Archive → event → album → event | Correct stable event identity throughout; no unsupported facts or missing media. |
| Any page → language counterpart | Equivalent page/event, current locale indicated, no unexpected home reset. |
| Mobile menu → target; close/Escape | Usable menu, visible focus, focus returns predictably, route destination correct. |
| Footer → legal/privacy and optional email | Correct locale; approved final legal text at release; no email action while address is missing, then supplied public `mailto:` destination only. |
| Unknown route/event/locale | True 404; no indexable placeholders or silent cross-language content. |

Broader/deferred features have no Part A routes. Their original requirements remain in [the register](requirements-register.md); the separate [owner decisions](owner-decisions.md) set the effective initial scope. Detailed event facts, translations and legal text are development/release inputs, not remaining planning-scope decisions.
