# Five-phase plan and acceptance gates

**Exactly phases 0–4. Phase 0 and Phase 1 are complete.** Phase 1 closes under [owner acceptance change D-024](phase-1-acceptance-change.md): tested typography/mobile navigation accepted provisionally; exact reference typography/menu equivalence no longer required for closure and remain UNVERIFIED. All other Phase 1 gates below are unchanged and met by saved evidence; see [the report](phase-1-report.md). Phase 2 is ready for explicit instruction; phases 2–4 have not started or been authorized. User instruction remains required before each transition. Phase 0 rows record historical closure status.

## Phase 0 — Evidence, scope and project blueprint

Scope: repository/source audit, reference audit, requirements/scope reconciliation, blueprint and validation documentation. Excludes application scaffolding/code, dependency installation, services, commits/pushes and deployment. Git initialization and origin setup are explicitly authorized.

| Criterion | Measurable gate | Current result |
| --- | --- | --- |
| P0-01 | Local root/branch/remotes/status inspected; preserve files/history; remote access result recorded. | Met; initial remote inspection reachable with no refs, reused without another network query at closure. Local root/branch/origin/staging state checked; no commit/push. |
| P0-02 | Full Data A read with actual path, printed date, page count and page-level evidence; earlier questionnaire status accurate. | Met; 8 + 10 pages extracted/read, source manifest and hashes recorded. |
| P0-03 | Summary and all 11 questionnaire sections accounted for; material answers have page/priority/interpretation/treatment/dependency and future acceptance. | Met in register/coverage check; unknowns and broader requirements retained. |
| P0-04 | Owner's revised conditional gate D-018: rendered desktop/mobile evidence if a browser is available; otherwise availability recheck, precise page/viewport/state capture request and identification of blocked implementation decisions. | **Met through authorized no-browser fallback.** Availability evidence and request recorded; source observations preserved. **B-01 rendering/menu/focus evidence remains unverified**, not converted into a visual pass. |
| P0-05 | Source conflict preserved; owner A/deferred boundary, bilingual separate routes/component mapping, selected architecture, inventory contracts and 0–4 gates documented; scope decisions recorded separately from PDF facts. | Met: D-009–D-020 resolve earlier Q-01–Q-07; Tailwind supersedes CSS Modules. Factual deliveries remain development/release dependencies. |
| P0-06 | Required files exist; local doc links resolve; sources/instruction originals preserved; no app/install/deployment/commit/push. | Documentation checks recorded in report; runtime/app checks not applicable. |

The latest owner instruction explicitly provides the no-browser completion path and separates missing assets/legal text from planning completion when formats/locations are documented. Phase 0 closes through that path; the earlier rendered-only gate is superseded for planning closure. This does **not** close B-01 visual evidence, accept an unverified design or authorize Phase 1. Stop after the report.

## Phase 1 — Foundation and shared interface

Entry instruction received: [Phase 1 request](phase-1-instructions.md), 18 October 2026. Local checks pass; partial reference evidence supports shared geometry corrections. Subsequent [D-024](phase-1-acceptance-change.md) explicitly amends only the reference typography/menu closure requirement and accepts the tested local choices provisionally. Missing content/logo may arrive during development; placeholders must remain identifiable. [Phase 1 report](phase-1-report.md) reviews every remaining exit gate and records closure; the pre-amendment plan is preserved separately.

Scope: **Next.js App Router + TypeScript + Tailwind CSS** foundation, compatible scripts/lockfile and Tailwind integration; semantic tokens/theme, structured developer-managed content interfaces, FR/EN dictionaries and route registry; five separate area shell routes in each locale plus legal/privacy layout/route structures; `/ → /fr`, locale validation, equivalent-page language switch; shared container/header/nav/mobile menu/footer, skip link/focus/accessibility base and relevant checks. Homepage preview slots are established, with actual preview content/page templates/media integrated in Phase 2. Optional supplied-public-email link omitted while address missing. Metadata/configuration primitives contain no invented production domain. No CMS/admin accounts, forms/uploads/accounts/payments/newsletter/profiling, deferred integrations or deployment.

Measurable exit gates:

- Type check, configured lint and production build exit successfully; report actual commands/versions. No selected providers or exposed credentials.
- `/fr` and `/en`, translated representative shell paths and default entry behave as approved; supported locale produces correct `html lang`; unknown path/locale returns 404. Same-page language switching resolves paired route keys without a home reset.
- Shared navigation works at 390×844, 768×1024 and 1440×900 without unintended horizontal overflow; mobile menu open/close, Escape and focus return verified with keyboard/pointer.
- Keyboard focus visible; skip link/landmarks/labels meaningful; automated accessibility scan has no unresolved serious/critical findings on representative shells, with manual keyboard evidence separately recorded.
- Shared header/footer/container comparison uses available rendered reference evidence at matched viewports; screenshots/measurements, known differences and provisional choices are documented. **Owner amendment D-024:** current tested typography and accessible mobile navigation are accepted provisionally; exact reference typography and mobile-menu equivalence are no longer required for Phase 1 closure. Their reference status remains **UNVERIFIED**, not PASS. No generic redesign, unseen interaction, exact fidelity or pixel equality is inferred.
- No misleading live links, fake contacts or release-visible draft content. Phase 1 shells are clearly development work, not finished Part A pages.

## Phase 2 — Part A implementation

Entry: Phase 1 accepted and explicit instruction; owner-approved separate area/page/content boundary in force; content may arrive during development with identifiable local drafts tracked. Actual approval remains necessary for content completion/release.

Scope: five separate home/mission/team/past-events/photos pages with home previews; content-supported event details/albums, supplied contextual public bilingual PDFs where available, legal/privacy text when supplied and optional public email link only once available; paired content/media/meta. Excludes contact page/form, deferred workflows/services and redesign beyond approved mapping.

Exit: all agreed routes render approved content in both languages; home→essential, applicable event/album paths and legal/privacy/optional-email journeys pass; translation key/content ID parity and media/document references validate; no invented facts/rights or unapproved public content; visible controls have real destinations. Verify representative desktop/mobile screenshots against mapping, image sizes/crops/alt, optional controls and inventory. Missing required real content means content completion remains incomplete, not silent omission. Missing optional email means omit action, not block the whole release by default.

## Phase 3 — Verification and completion

Entry: explicit instruction; implemented A ready for full checks. Scope: defect resolution and verification; no additional business features/services.

Exit: type/lint/build pass; every approved route and FR/EN counterpart checked; no broken internal links/missing assets; unknown routes correctly fail; all proposed journeys pass by pointer and keyboard at desktop/tablet/mobile targets. Metadata, reciprocal language links, canonical URLs, sitemap, robots and share previews reflect approved production configuration. No draft placeholders, fabricated claims, public rights evidence/secrets or misleading controls.

Proposed quality gates: no unresolved serious/critical automated accessibility findings plus manual focus, heading, labels/alt, contrast and reduced-motion checks against agreed WCAG 2.2 AA targets. Accessibility conformance is not established solely by a scanner. Record one Lighthouse mobile run on home and a representative detail under a documented environment, with proposed targets performance ≥90, accessibility ≥95 and SEO ≥90; investigate material failures rather than claim unrun scores. Compare matched-viewport screenshots for all page templates; document approved deviations and obtain human visual/content acceptance. Record remaining blockers honestly.

## Phase 4 — Release and deployment

Entry: explicit release/deployment instruction, prior checks accepted, approved content/legal/rights complete, owner-controlled Vercel/domain access and production settings available. Scope: configuration, deployment, live verification and handover only.

Exit: actual deployment URL/status recorded; HTTPS/root redirect/all agreed locale routes/media/PDFs/404s/language switch verified on deployed site; production metadata/domain/robots/sitemap and any approved redirects checked; no draft or credential exposure. Record live checks/limitations, rollback/redeploy path, domain/config ownership, bilingual content update process, media backup/restore procedure and handover owner. Deployment attempted ≠ successful release; unreachable/untested output remains incomplete. Do not commit/push/deploy without the applicable later authorization.
