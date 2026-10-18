# Phase 1 verification and remaining evidence

**Closure update D-024, 18 October 2026:** [owner decision](phase-1-acceptance-change.md) accepts tested typography/accessible mobile navigation provisionally and removes exact reference typography/menu equivalence as closure requirements. Those comparisons remain UNVERIFIED. All other gates pass on the evidence below; [Phase 1 is complete](phase-1-report.md). No application/reference checks are rerun, and the earlier manual checklist below is historical and inactive. Phase 2 awaits explicit instruction.

The local foundation journey is URL -> validated locale/page identity -> structured translations/missing-content shell -> shared navigation/language destination. No application API, database, external content provider or collection workflow exists.

## Checks actually performed

- `npm.cmd run check:http`: 216 production HTTP/DOM checks, including all 14 shells, root redirect, 11 invalid/excluded routes, language/meta/navigation/no-collection boundaries and served CSS.
- `npm.cmd test`: 8 routing/translation/component tests, including CSS-blur/desktop focus transfer and preserving background focus. jsdom is not browser proof.
- `npm.cmd run check:browser`: actual installed Chrome 155.0.8059.84 via Playwright 1.64.1, headless with sandbox enabled. All 14 routes at 1440x900, 768x1024, 390x844 and 320x844; 95 checks, 28 screenshots, 20 axe scans. [Final results](evidence/phase-1-browser/local/results.json) include all URLs, viewports, states, assertions, geometry and scan data.
- Actual pointer and keyboard events verify desktop destination/current state, equivalent-language journeys on every shell, skip/focus, Enter/Space/Escape, closed-menu Tab exclusion, current/new-page menu closure, nonmodal background interaction and desktop-transition focus. Separate screenshot review covers desktop, mobile open menu, narrow focus and legal shells.
- Root redirect and eight invalid browser URLs verify actual 404 documents, localized/bilingual language and accessible error shells. Legal/privacy explicitly report unapproved missing text.
- No horizontal overflow, clipped identity, identity/language overlap, uncaught local exception or valid-route console error remained. No client photos/assets exist yet; future media loading/crops/alt still require later content checks.

## Accessibility review boundary

Axe 4.14.0 checked WCAG 2 A/AA, 2.1 A/AA and 2.2 AA rule tags. Twenty representative home closed/open, legal and error scans reported zero violations. Eighteen had color-contrast incompletes on 54 gradient-backed link instances. These were reviewed separately against computed white foreground, explicit/default-normalized sRGB gradients and a conservative maximum colour [23,103,200], giving a contrast lower bound 5.511:1 (normal text target 4.5:1). Every target/style/calculation is retained in `contrastReview`; no incomplete was silently discarded.

Codex exercised browser keyboard/pointer interactions through Playwright and visually inspected captures. No human physical-keyboard or screen-reader session is claimed. Passing automated scans and these keyboard checks are not full WCAG conformance, client visual acceptance or cross-browser/device certification. Later real content/media and broader accessibility review remain necessary in their authorized phase. Reduced-motion CSS removes motion; no animation is intentionally introduced, but a dedicated emulated reduced-motion check was not added in this follow-up.

## Reference verification is separate

[Initial](evidence/phase-1-browser/reference/results.json) and [follow-up](evidence/phase-1-browser/reference/followup-results.json) rendered reference inspections establish partial shared desktop/closed-mobile geometry only. Initial subsequent requests returned 429; those captures show access pages. One later loaded homepage was resized across the four widths without reloads. Font/assets/script failures degraded output, and clicks at all three mobile/tablet widths never opened the drawer (5000ms visibility timeouts).

Header/container/footer dimensions support the Phase 1 corrections in [the report](phase-1-report.md). Local text/language identity, narrower navigation scope and omitted contact/social/affiliation content are intentional adaptations. Local Arial/size/spacing and inline mobile disclosure remain provisional. Working reference mobile behaviour and healthy type metrics remain unaccepted; local tests cannot prove equivalence.

## Historical manual evidence checklist (no longer a closure dependency)

1. At <https://amicalerotaryfrancophonie.org/>, 1440x900, capture only the missing healthy type specimen: menu closed, header/nav and first heading/body text after fonts successfully load. Note actual loaded faces/computed type; no footer image or duplicate geometry request.
2. At the same URL, 390x844, capture only the missing successfully open menu including close/language controls if present; brief action notes for click open/close, Escape/focus, Tab/background handling, destination and language result URLs. Existing closed/tablet/narrow/footer captures are reused; no duplicates requested. Other open widths remain pending, not waived.
3. Record URL, viewport, browser/version, date, action/result and failed requests. Compare only Phase 1 shared elements; resolve documented type/mobile differences and rerun affected local checks if code changes. Do not import reference content/assets or extra scope.

The [earlier capture request](reference-capture-request.md) is inactive under D-024; it is retained for traceability, not repeated. Reference equivalence remains unverified without blocking closure. Missing client content remains a development/publication dependency, not a reason to discard completed local verification. Phase 2 is ready for explicit instruction and has not started.

Bounded review: the reliable desktop nav size is corrected to 20px/24px, with mobile 18px unchanged. Six [targeted checks and two axe scans](evidence/phase-1-fidelity-review/local-results.json) supplement the preserved full run. No full-suite or reference retries; no inferred drawer behaviour. The [fidelity checklist](phase-1-fidelity-checklist.md) separates local verification from pending reference acceptance.

## Repeat locally

Start the documented production app from [README](../README.md), then run `npm.cmd run check:browser` in a second terminal. The launcher uses installed Chrome; if absent, bundled Chromium is attempted. On a machine with neither, `npx.cmd playwright install chromium` installs development tooling under the owner's authorization. No security setting change is needed. `TEST_BASE_URL` supports another localhost port; `BROWSER_EVIDENCE_DIR` selects a separate evidence folder. The scripts/report retain the distinction between HTTP, jsdom, rendered local behaviour and reference fidelity.
