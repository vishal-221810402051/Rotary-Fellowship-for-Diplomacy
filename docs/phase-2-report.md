# Phase 2 — Part A pages, content and media

**19 October 2026, updated after AUD-01/AUD-02 corrections. Phase 2 implementation: COMPLETE. Approved content and publication readiness: PENDING.** Both independently identified homepage photo-selection defects are resolved by the implementation follow-up below. The original independent audit remains unchanged; this is not an independent re-audit. Phase 3 awaits explicit instruction. No staging, commit, push or deployment.

## Authority and preserved baseline

[D-026 / S-16](phase-2-instructions.md) authorizes this phase only. Started with clean `main` at the verified Phase 1 checkpoint `e8582f3245540d2c32789da6a11db5937d44eb62`; the checkpoint was present in history. HEAD/branch remain unchanged. [Initial baseline](evidence/phase-2/baseline.json) records SHA-256 for all 84 tracked files. Existing source extracts, original 86 Data A rows, Phase 1 reports/evidence and shared navigation/style/routing registry are preserved. No new dependencies or lockfile changes.

D-024 remains effective: existing tested typography/accessibility patterns are provisionally accepted. Reference typography/mobile-menu equivalence stays **UNVERIFIED**, not a passed comparison. No external-reference request, retry or asset copying occurred.

## Current audit-resolution follow-up

The owner expressly authorized fixing AUD-01/AUD-02 and targeted verification, with no Phase 3/commit/push/deployment. [Resolution record](phase-2-audit-resolution.md) details the root causes, fix, regressions, rendered evidence and limitations. [Original independent audit](phase-2-independent-audit.md) and all earlier evidence remain byte-for-byte unchanged. The pre-resolution implementation report is [preserved separately](evidence/phase-2-resolution-20261019T014821Z/phase-2-report-before-resolution.md).

A small shared `resolveAlbumPhotos` helper retains the existing permission/path/dimensions/paired-alt/credit checks and album `photoIds` order. Home now resolves eligible photos before selecting the first usable album, then limits that ordered result to three. The full gallery uses the same resolver without a preview limit. No other product component, page data, route, typography, navigation or collection behaviour changed.

Fresh checks: **typecheck, lint and production build exit 0; 27/27 tests pass** (12 new bilingual regression tests). Before the fix, the new tests reproduced eight failures; afterwards all 19 targeted content tests pass. **20 rendered homepage states and gallery journeys pass**, both locales at 1440x900 and 390x844, with 20 axe scans and zero violations/incompletes/console errors. Selected identities are asserted as `[d,c,b]`, with `[d,c,b,a]` retained in the full gallery, and empty text only when no album is usable. Four targeted actual-route HTTP checks pass for home/photos in both locales. Source hashes confirm the isolated build used the current changed files. [New evidence/manifest](evidence/phase-2-resolution-20261019T014821Z/browser/results.json), [command outputs](evidence/phase-2-resolution-20261019T014821Z/commands/test.json), [preservation/documentation check](evidence/phase-2-resolution-20261019T014821Z/preservation.json).

Initial lint found 53 errors in preserved one-off audit `.mjs` artifacts. The lint configuration now excludes `docs/evidence/**`; application code, maintained verification scripts and tests remain linted. The failed log is retained separately; no audit artifact was edited to make lint pass. Both components remain server-rendered, typed and free of new client boundaries/dependencies after the React review.

| Reassessed Phase 2 implementation criterion | Current result |
| --- | --- |
| Five bilingual areas, source-backed drafts/titles, identity and exclusions | PASS; preserved scope/content plus existing independent audit |
| Home previews, first usable album, eligible ordering/truncation, honest empty state | PASS; AUD-01/AUD-02 regression and rendered follow-up |
| Reusable gallery/profile/image eligibility and full-gallery sequence | PASS; current 27 tests, targeted gallery journeys and preserved media audit |
| Routing/language/404/legal/noindex/shared navigation/accessibility guarantees | PASS within documented coverage; four affected-route checks plus unchanged independent audit evidence, no unnecessary full rerun |
| Type/lint/tests/build, responsive rendered proof and documentation | PASS; fresh results above and linked preservation check |
| Approved editorial copy, real profiles/media/rights, brand and legal text | PENDING; retained client-content/publication gates |
| Exact reference typography/mobile-menu equivalence | UNVERIFIED under D-024, not a new reference pass |

No Phase 2 implementation blocker remains within this scope. Rendering checks used an isolated copy with existing installed dependencies and a separate localhost fixture server; no public website fixture route/content was added. The temporary chart was removed, a clean build passed, its direct URL returned 404, and temporary servers/workspace were removed. The existing 3100 preview was not rebuilt or used as proof of the changed source. See [cleanup](evidence/phase-2-resolution-20261019T014821Z/cleanup.json). This implementation follow-up supports Phase 2 completion, while editorial approval/publication remain pending and Phase 3 remains unstarted.

## Implemented pages and content

| Area | Both locales | Actual content and behaviour |
| --- | --- | --- |
| Home | `/fr`, `/en` | Organisation identity, Data A proposed slogan, faithful draft introduction, four editorial previews linking to the separate areas. Actual archive titles; team/photo previews remain honest empty text. |
| Mission | `/fr/mission`, `/en/mission` | Five paired themes: worldwide Rotarian/non-Rotarian connections, intercultural dialogue, peace/international cooperation, commercial/economic exchange and institutional communication. Draft prose, no unsupported affiliation/history/impact claim. |
| Team | `/fr/equipe`, `/en/team` | Concise bilingual empty state. Reusable ordered profiles support supplied approved name, role, biography and optional portrait; pending profiles/media are hidden, no invented people/avatar. |
| Past events | `/fr/evenements`, `/en/events` | Exact French titles supplied by D-026: “Forum sur la paix Paris 2026” and “Forum sur la jeunesse et diplomatie Paris 2026”. English titles are drafts. No precise dates, venues, descriptions, speakers, attendance or organising attribution inferred. No fake detail links or title-only routes. |
| Photos | `/fr/photos`, `/en/photos` | Honest bilingual empty state. Reusable ordered albums/figures filter unapproved/invalid assets; responsive optimiser srcset/sizes, intrinsic dimensions, full aspect ratios, alt text, supplied captions/credits and native lazy loading. No lightbox or extra album route. |

The 14-route allowlist, equivalent-language page switching, legal/privacy shells, true 404 responses, semantic shared shell, five-area navigation, keyboard controls and development noindex/robots policy remain. `/media/` now reaches static file handling so actual images can load; missing media still returns 404. No public contact action while email is absent. No collection workflow, backend, CMS, accounts, payments, integrations or tracking added.

Source-backed facts, drafted editorial text, missing inputs and permissions are distinct in `src/content/site.ts`, localized `pages.ts`, typed records and separate `provenance.ts`. Visitor copy carries a concise preparation/review notice; implementation/source notes remain in documentation. Existing questionnaire text was reused, not re-extracted.

## Initial Phase 2 checks and evidence (historical, preserved)

Environment: Windows, Node 24.16.0, installed Next 16.4.2 / React 19.3.1 / TypeScript 5.9.3 / Tailwind 4.3.3. Existing Playwright 1.64.1 / axe-core integration; installed Chrome **155.0.8059.84**, headless with sandbox enabled. No browser download, dependency install or system security change.

| Check / command | Actual result | Evidence |
| --- | --- | --- |
| `npm.cmd run typecheck` | Exit 0; generated route types and strict TypeScript pass. | [Output](evidence/phase-2/typecheck.json) |
| `npm.cmd run lint` | Exit 0, zero warnings. | [Output](evidence/phase-2/lint.json) |
| `npm.cmd test` | Exit 0; **15/15 pass**. Original eight routing/navigation checks retained; seven new content/permission/translation/media/preview checks. | [Output](evidence/phase-2/test.json) |
| `npm.cmd run build` | Exit 0; 14 localized pages plus framework not-found/robots output. Final build repeated after removing temporary public fixtures. | [Output](evidence/phase-2/build.json) |
| `npm.cmd run check:http` | Exit 0; **244 checks**, all 14 routes, root 308 redirect, 11 unsupported paths/locales true 404, legal gaps/noindex/robots/CSS, current navigation and every internal anchor target. Updated shell-only assertions now test actual drafts, themes, previews and honest empty states. | [Results](evidence/phase-2/http.json) |
| `npm.cmd run check:browser` | Exit 0; **49 focused checks**, 40 route/viewport measurements, no valid-route console errors or uncaught exceptions. Both locales × five pages × 1440×900, 768×1024, 390×844 and 320×844. | [Results/manifest](evidence/phase-2/browser/results.json) |
| `npm.cmd run check:media` (with documented isolated setup) | Exit 0; **six populated states**, FR/EN at 1440×900, 390×844 and 320×844. Real static files/Next optimiser return images; three images per state retain measured geometry through delayed loading, correct portrait/landscape ratios, localized alt/caption/credit and responsive lazy attributes. | [Results/manifest](evidence/phase-2/media-fixtures/results.json) |
| `python scripts/check-phase-2.py`, `git diff --check` | Working-tree documentation/preservation and whitespace checks pass; no staging required. | [Documentation results](evidence/phase-2/documentation.json) |

Browser journeys exercise all four homepage preview links by keyboard, destination focus for same-locale transitions, both directions of language switching, current navigation, skip link, visible focus, mobile menu open/Escape/close-after-navigation and heading/landmark structure. No horizontal overflow, clipped content text or broken production images in exercised views. Locale-layout switching can return focus to document entry; verified it does not leave focus inside hidden navigation. It is not falsely described as a same-locale focus transfer. Unchanged comprehensive nonmodal background/resize/404 behaviour reuses [Phase 1 evidence](phase-1-verification.md), rather than rerunning the old full suite.

Accessibility: **20 changed-page axe scans plus six populated fixture scans**, WCAG A/AA tags through 2.2, zero violations. The 20 page scans have only gradient `color-contrast` incompletes: 80 node reviews confirm white text and measured gradient stops, with a conservative contrast lower bound **5.511:1 ≥ 4.5:1**; targets/computed values/method retained per scan. Fixture scans have zero incompletes. Keyboard/heading/geometry checks are separate evidence. This is not a complete WCAG conformance certification or human visual approval.

Twenty actual-page screenshots (all five areas, FR/EN, desktop/mobile) and six clearly labelled isolated fixture screenshots are saved. [Evidence guide](phase-2-evidence.md) provides exact URLs, viewports, states and visual review samples. Phase 1 evidence was not overwritten. Phase 2 evidence remains local/ignored under the existing GitHub policy; it needs a separate review before any future authorized checkpoint.

## Defects and verification corrections

- Fixed a real foundation gap for future assets: the page-path guard intercepted `/media/`; static media now bypasses it while page allowlisting remains intact. Direct/missing/optimised fixture requests were verified.
- Plain Node ESM rendering exposed Next Image default-import interop in the component test. Used Next's documented server-safe `getImageProps` API, retaining real optimiser/srcset output and dimensions without a mock or extra client boundary. Unit and real-browser image checks pass.
- Corrected a test regex that confused `article` with an anchor. Updated assertions retain unsupported-action checks.
- First HTTP batch timed out; an independent server probe returned 200 and the bounded rerun passed. The isolated preview's cross-origin CSS caused axe resource-read console errors; serving the same compiled CSS through the isolated origin fixed them without changing app CORS/security settings.
- The focused browser harness initially required destination-main focus across a locale-layout change, beyond the established same-locale behaviour. A targeted probe distinguished document-entry focus from same-locale main focus; the check now explicitly validates those actual patterns. Hydration is awaited before interactions. Failed attempts are retained in [the verification history](evidence/phase-2/attempts.json); no unknown result is marked passed.

## Acceptance and dependencies

| Criterion | Status |
| --- | --- |
| Five coherent FR/EN pages with four working home previews, approved identity/scope | PASS — implementation |
| Faithful home/mission themes, source-versus-draft distinction, exact supplied forum titles, no invented facts/details | PASS — implementation; editorial/English title approval PENDING |
| Reusable profile/album/figure components and truthful empty/populated states | PASS — automated/browser fixtures; actual profiles/media PENDING |
| Routing/lang/current state/404/noindex/legal handling, keyboard/heading/responsive integration | PASS — focused Phase 2 checks plus preserved Phase 1 evidence |
| Image loading, responsive dimensions/alt/captions/loading and geometry through load | PASS — isolated charts only; real-client image performance/crop/context review PENDING |
| Type/lint/tests/build, documentation, representative screenshots, reviewed accessibility findings | PASS — limits above |
| Exact reference typography/mobile-menu match | UNVERIFIED; D-024 provisional choices retained, no reopened gate |
| Approved core content, team/photos, rights/brand, final legal/privacy and publication settings | PENDING — retained content/release gates, not fulfilled by drafts/fixtures |

No implementation blocker remains in tested Phase 2 scope. Required client inputs and exact integration formats/locations are in [the inventory](content-and-assets.md): approved FR/EN copy/metadata/interface vocabulary; ordered profiles with names/roles/bios/permissions; authorised photographs/albums with dimensions/context/credit/paired alt/caption/order; actual brand mark/use permission; approved bilingual legal/privacy and responsible identity. Further event details are optional unless later agreed, and must not be invented. Public email remains optional and omitted. Production domain/Vercel access and ownership remain Phase 4 dependencies.

**Phase 2 implementation is complete for review; approved-content completion and publication are not.** Phase 3 can begin only after an explicit instruction, for the planned completion/accessibility/content/SEO/performance checks and remaining defects using whatever approved material is then available. No Phase 3 work or release authorization is inferred. Local preview: `http://127.0.0.1:3100/fr` and `/en`; fixtures have been removed from public media and their isolated server is closed.
