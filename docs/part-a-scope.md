# Part A scope — owner approved

**Scope approved by the project owner. Phase 2 pages/content/media are authorized under [D-026](phase-2-instructions.md).** [Owner decisions D-009–D-020](owner-decisions.md) settle the boundary. Drafts/empty states may complete implementation; approved core content remains a separate publication gate. [Original requirements](requirements-register.md), particularly A03/A05.07/A11, remain preserved. No Phase 3, commit, push or deployment.

## Source conflict and owner resolution

Data A pp.1/3 marks home, history, mission, team, gallery, events, news, photos/videos, membership, volunteering, donations, contact and legal/privacy at launch; p.5 also marks search/category/status/featured exploration at launch. Yet p.8 specifies a showcase, names only home, mission, team, past events and photos as indispensable, and says **“Le reste”** can wait. Page 5 says no projects at launch while suggesting two previous forums; p.3 places international diplomacy later while p.4 places its gallery at launch.

No source statement is discarded. The owner has now explicitly chosen the five-area Part A showcase, file-based content and no collection workflows. Features outside that boundary remain in the requirements register for later scope; their original launch priorities are unchanged. This is an owner decision, not a new interpretation attributed to Data A.

## Approved public boundary

| Area | Part A behaviour | Basis / release condition |
| --- | --- | --- |
| Home | Separate home route in each locale, with mission/team/past-event/photo previews linking to their separate pages. Approved introduction; email action only after a public address is supplied. | D-009–D-011/D-015; C-02–C-04. Internal preview links do not depend on contact delivery. |
| Mission | Separate mission route, with approved mission/values. An association introduction may support it; no separate history commitment or invented history/legal affiliation. | D-009–D-010; A03.03; C-02. |
| Team | Approved names, roles, short biographies and portraits only. | A03.04; C-05. Required page cannot be declared content-complete without team delivery. |
| Past events | Separate archive with the two factual titles now supplied by D-026; English translations drafted. No title-only detail pages. | D-026; A05.07/A06.05; C-06. No inferred exact dates/venues/speakers/attendance/organising attribution. |
| Photos | Association-event albums; event-linked photographs, captions, credits and alt text in both languages. Responsive figures without unneeded interactions; honest empty state while files missing. | D-026; A03.11/A06.05; C-03–C-04. No lightbox required; no raw-image links, upload facility or project catalogue. |
| Shared support | Header, responsive nav, equivalent-page language switch, footer, skip link/focus states, metadata/social previews, sitemap/robots, truthful errors; legal/privacy route/layout structures. | D-011/D-017. Final legal text is a release dependency. No contact page/form; missing email means omit public contact action. |
| Event PDFs | Optional contextual links to actually supplied, approved public FR/EN programmes; omit unavailable controls. | A06.06; C-07. No PDF library, fake download or invented translation. |

The five essentials, separate routes, homepage previews, locale/default policy, stack, editorial model, collection exclusions and email handling are now **explicit owner decisions**. Exact slug spelling, supporting event-detail/album presentation and component design remain engineering choices. Missing facts/assets may arrive during development; they do not prevent planning closure when contracts/locations are documented, and cannot be fabricated to pass release.

## Deferrals / exclusions under the approved boundary

| Category | Items | Status |
| --- | --- | --- |
| Explicit owner deferrals/exclusions | Registration, ticketing, membership payments, donations, volunteering forms, newsletter/subscriptions, CRM, AI agents, independent project-submission platform; application forms, uploads, accounts, payments and visitor profiling. | D-014/D-016. No corresponding controls/endpoints/providers. |
| Other broader PDF features outside the five-area boundary | News/articles, general project catalogue/search/filters/featured projects, editorial video/podcast/report systems, upcoming-event workflows/calendar integration and sponsorship transactions. | Consequence of D-009's scope boundary, not a rewritten PDF answer. Supplied factual context/media may support approved past events without introducing these systems. |
| Administration | Four full-access admins, CMS/self-service dashboard, drafts/notifications/permissions. | D-013 explicitly defers CMS/admin accounts; developer-managed structured content approved. |
| Explicitly later | Actions/programmes, dedicated international diplomacy programme, partners, newsletter. | Retain source status; no launch navigation to empty pages. |
| Explicitly not required | Member login, mentoring, youth/education service page, debate/eloquence, citizen contributions, resources library, project cards/grid, country/region/SDG filters, interactive world map. | No implementation absent explicit change. Photo thumbnails are a distinct presentation decision. |
| Not in evidence / excluded | Public submissions, independent-project gallery, MEDIS, meeting clues/Data B, invented affiliations/endpoints/impact claims. | Excluded unless expressly introduced. |
| Earlier-questionnaire reconciliation | Press releases. | Retained source item; outside the owner-approved five-area Part A, alongside news. |

## Reference-to-page/component mapping

Evidence IDs refer to [the source audit](reference-ui-audit.md). Shared Phase 1 geometry uses saved rendered evidence. D-024 accepts tested local typography/mobile navigation provisionally; exact reference equivalence remains UNVERIFIED. The content layouts below adapt existing thematic/editorial patterns, not a newly verified reference match; no external inspection repeated in Phase 2.

| Pattern | Proposed RFFD page/component | Retain / adapt | What is not transferred |
| --- | --- | --- | --- |
| REF-01 / OBS-01–02,11 | All routes: `SiteHeader`, `PrimaryNavigation`, `MobileNavigation`, `LanguageSwitch` | Linked approved logo; grouped institutional navigation where needed; responsive menu adapted after actual inspection. | Reference logo, unrelated menu entries, membership flow. |
| REF-01 / OBS-03 | Home: `HomeIntro`, `MissionOverview`, `TeamPreview`, `PastEventFeature`, `PhotoPreview`, optional `EmailLink` | Preview links serve the four separate area pages. Adapt the reference introduction/context/event patterns; final visual sequence requires B-01. | Network counters, membership claims, institutional endorsements, event artwork. |
| REF-02 / OBS-08 | Mission: `PageIntro`, `ContentSection` | Structured internal page with thematic mission/values sections. | Reference history, partnerships or affiliation claims. |
| REF-03 / OBS-08 | Team: `TeamMember` | Role-based presentation using supplied entries; geometry pending rendered audit. | Reference staff, role hierarchy or biographies. |
| REF-04/05 / OBS-09 | Past events: `EventArchive`; no news section A | Repeated editorial title rows. No link when no justified detail content exists. | Reference event content; unapproved project-grid filters. |
| REF-06/07 / OBS-09 | Past detail: not implemented under D-026 | No supplied narrative/document justifies a detail page. | Registration/embed/payment, invented speakers/partners or title-only details. |
| REF-07 media / OBS-12 | Photos: `EventAlbum`, `PhotoFigure` | Event-linked media; layout/crops/loading pattern needs B-01. A separate reusable photo layout is an engineering proposal. | Reference photographs; assumed lightbox behaviour. |
| REF-01–07 / OBS-10 | All routes: `SiteFooter`; optional supplied-public-email `EmailLink` | Legal/privacy structure and agreed navigation/language support. | Contact page/form, invented addresses, reference social links/copyright/legal text. |

Part A acceptance: all agreed essentials and support routes work in FR/EN, contain only approved factual content/media, pass Phase 3 checks and match approved reference observations. A mock page or placeholder is not a completed essential.

Under D-026, Phase 2 **implementation completion** is assessed separately from that retained final content/publication acceptance. Empty states and isolated fixtures prove reusable rendering/behaviour; they do not approve missing team/photos, legal text or draft translations. [Phase 2 report](phase-2-report.md) keeps those statuses separate.
