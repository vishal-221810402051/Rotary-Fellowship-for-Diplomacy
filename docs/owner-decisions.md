# Project-owner decisions — Phase 0 closure

Source **S-09**: the owner's explicit continuation message in this chat on **18 October 2026**, titled “Continue and close Phase 0 only. Do not start Phase 1.” This is a record of owner instructions, **not statements extracted from Data A**. The original questionnaires, extracted answers and their original launch priorities remain unchanged.

| ID | Explicit owner decision | Effect on initial build |
| --- | --- | --- |
| D-009 | **Part A:** French/English homepage, mission, team, past events and photos. | Defines initial public content scope. Wider PDF launch selections remain recorded separately, outside Part A. |
| D-010 | **Page structure:** separate routes for the five areas; homepage previews link to the relevant pages. | Mission, team, past events and photos are distinct destinations, not sections replacing those routes. |
| D-011 | **Languages:** `/fr/...`, `/en/...`; `/` redirects to `/fr`; switching preserves equivalent page where available. | Locale/default/switch policy resolved. Exact translated slug names remain a documented engineering choice. |
| D-012 | **Stack:** Next.js App Router, TypeScript and **Tailwind CSS**, compatible with Vercel. | Supersedes the previous CSS Modules recommendation. No packages installed and no application scaffolded in Phase 0. |
| D-013 | **Content:** structured, developer-managed Part A content; CMS and administrator accounts deferred. | Resolves temporary editing model; four-admin/self-service requirements stay in original evidence for later scope. |
| D-014 | **Data collection:** no application forms, document uploads, accounts, payments, newsletter subscriptions or visitor-profiling analytics in Part A. | No corresponding application endpoints, provider integrations or misleading controls. |
| D-015 | **Contact:** use a supplied public email link when available; until then record missing address and omit public contact action; never invent details. | No dedicated contact page/form in the current route map. Missing email does not block planning or mandate a fake CTA. |
| D-016 | **Deferred:** registration, ticketing, membership payments, donations, volunteering forms, newsletter, CRM, AI agents and independent project-submission platform. | Explicit deferrals, not PDF requirements removed or implemented by implication. |
| D-017 | **Legal/privacy:** prepare supporting routes/layout; supplied final text remains a release dependency; no invented approved text. | Structure can be planned/developed before text delivery. Public release must use approved content. |
| D-018 | **Reference evidence fallback:** check existing browser/automation; if unavailable, document a precise screenshot request and identify implementation decisions blocked by missing evidence; do not claim verification or install application dependencies. | This conditional fallback replaces the earlier rendered-only Phase 0 evidence gate. Rendered evidence remains open; completing the fallback permits planning closure without asserting visual acceptance. |
| D-019 | **Dependency separation:** missing logo, team biographies, photos or final legal text do not automatically block planning if formats/locations are documented. | Classify evidence limits, development inputs and publication gates separately. |
| D-020 | **Phase boundary:** reconcile/check/report Phase 0 only; no commit, push, deployment or Phase 1. | Stop after closure report. No implementation authorized by the settled stack or routes. |

The reference fallback has been exercised: [availability evidence](evidence/reference-browser-availability.json), [capture request](reference-capture-request.md), [audit](reference-ui-audit.md). See [decision resolution](decisions-and-gaps.md) for the disposition of earlier Q-01–Q-07 and remaining content inputs. Completion of planning is separate from rendered audit completion and release readiness.

## Subsequent owner decision: Phase 1 acceptance

**D-024 / S-15, 18 October 2026:** the owner accepts the tested local typography and accessible mobile navigation as provisional design choices and explicitly removes exact reference typography/mobile-menu equivalence from Phase 1 closure requirements. Those comparisons remain UNVERIFIED, not passed checks. All other gates are retained; saved evidence permits Phase 1 closure. [Verbatim instruction and precise scope](phase-1-acceptance-change.md), [closure report](phase-1-report.md). No new reference requests, unchanged tests, Phase 2 work, commit, push or deployment. This is an owner decision, not a Data A answer.
