# Decisions, gaps and blockers

Current authority: [owner closure decisions](owner-decisions.md), read with [Phase 0 request](phase-0-instructions.md) and [standing rules](standing-instructions.md). Preserve the [original setup log](decisions-and-questions.md) as history; its absence/no-phase/no-Git observations describe that earlier point, not current status.

Current authority: [Phase 2 request S-16 / D-026](phase-2-instructions.md), 19 October 2026. Phase 1 is closed and checkpointed. Phase 2 implementation is complete. D-027 / S-18 (20 October 2026) authorizes the [GitHub checkpoint](phase-2-github-checkpoint.md) only; no Phase 3 or deployment. See [Phase 2 report](phase-2-report.md). Earlier phase restrictions below describe their historical authorization, not the current wait state.

## Confirmed changes / decision history

| ID | Date / source | Decision / observed change | Effect |
| --- | --- | --- | --- |
| D-001–D-004 | 2026-10-18; setup log | Working folder, organisation identity, five phases, Data B/MEDIS exclusions established. | Preserved; no identity or exclusion change. |
| D-005 | 2026-10-18; explicit Phase 0 request | Start Phase 0 only; Git init/add origin authorized if absent. | Supersedes setup-only wait; does not authorize Phase 1, dependencies, app code, commits/push/deploy. |
| D-006 | 2026-10-18; current user-supplied Downloads path + file check | Earlier 11 October questionnaire is available and fully text-read, despite pasted request calling it missing. | Supersedes earlier access gap. Does not alter Data A priority. Press releases still require reconciliation. |
| D-007 | 2026-10-18; repository commands | Initialized local Git; added supplied origin; remote reachable with no advertised refs. | No remote history imported/replaced; no commit/push/branch switch. See report for branch/root/status. |
| D-008 | 2026-10-18; PDF evidence | Data A 8 pages; earlier questionnaire 10 pages, printed dates 15/10 and 11/10/2026. | Source-backed requirements replace orientation-only status. Original PDF facts unchanged. |
| D-021 | 2026-10-18; explicit Phase 1 request | Start Phase 1 only; install minimal compatible dependencies and execute locally; implement shells/shared interface with provisional styling and clear content gaps. | Supersedes earlier Phase 1 authorization wait. Retains browser/fidelity limits and existing phase acceptance gates; no Phase 2/commit/push/deployment. |
| D-022 | 2026-10-18; explicit owner verification follow-up | Continue Phase 1 only; Playwright/Chromium development verification installation authorized if needed, no security changes; actual local browser and separate rendered reference checks, fixes/rechecks and report required. | Existing Chrome successfully used with pinned Playwright/axe dev dependencies; no browser download/security changes. Local acceptance checks pass; reference typography/open-menu gate remains pending. No Phase 2/commit/push/deploy. |
| D-023 | 2026-10-18; explicit owner bounded fidelity review | Preserve passing checks/evidence; distinguish resource failures from implementation differences, correct reliable discrepancies only, document matches/differences/provisional/blocked items and request only missing minimum captures. Stop unresolved automated retries; no criteria change. | Desktop nav size corrected to measured 20px; six affected checks/two axe scans plus required checks pass. No new reference request; [checklist](phase-1-fidelity-checklist.md) narrows manual evidence to two specimens. Exact fidelity remains unaccepted; no Phase 2/commit/push/deploy. |
| D-024 | 2026-10-18; explicit owner acceptance amendment S-15 | Accept tested local typography and accessible mobile navigation provisionally; exact reference typography/menu equivalence no longer required for Phase 1 closure. Keep these reference differences UNVERIFIED, not passed. Review remaining gates on existing evidence; close if met. | [Verbatim decision](phase-1-acceptance-change.md). All remaining gates met; **Phase 1 complete**, Phase 2 ready for instruction but not started/authorized. No repeated reference requests, unchanged tests, commit, push or deployment. |
| D-025 | 2026-10-18; explicit owner GitHub checkpoint instruction | Review contents/privacy, create `Complete Phase 1 foundation and verification`, push to the supplied origin and verify remote SHA; no force push, deployment or Phase 2. | Commit/push now authorized for this checkpoint. Origin matches; local and remote initially have no refs/history, so use main. [Contents, reviewed evidence and local-only omissions](github-checkpoint.md). Application checks reused. |
| D-026 | 2026-10-19; explicit owner Phase 2 request S-16 | Implement five bilingual pages, home/mission editorial drafts faithful to Data A, the two supplied forum titles in the archive, reusable team/media presentation and honest empty states. Draft English event titles; no inferred event detail, dates/venues/ownership. Use isolated test fixtures only; preserve D-024 and existing foundation. | Missing client assets may remain publication dependencies while reusable implementation is completed and verified. Approval/core content completion remains pending. No title-only detail pages, speculative lightbox, services, Phase 3, commit, push or deployment. [Verbatim authority](phase-2-instructions.md), [results](phase-2-report.md). |
| D-027 | 2026-10-20; explicit owner checkpoint request S-18 | Review all completed Phase 2 changes from the Phase 1 checkpoint, commit and push main normally, verify remote SHA and preserve excluded local evidence. | Supersedes earlier commit/push restrictions for this checkpoint only. No Phase 3/deployment; D-024 and content/publication dependencies unchanged. [Review and omissions](phase-2-github-checkpoint.md). |

## Owner decisions and resolution of earlier questions

[Explicit owner decisions D-009–D-020](owner-decisions.md) define the current build boundary and supersede the earlier proposals. They are separate from Data A. The original source requirements and priority evidence remain unchanged.

| Earlier question | Current disposition | Remaining non-scope input |
| --- | --- | --- |
| Q-01: showcase vs broad launch list | **Resolved D-009/D-014/D-016.** Five-area bilingual Part A; named services deferred/excluded. Other editorial/catalogue features outside that boundary remain later requirements, including press releases. | No business-scope blocker. |
| Q-02: page split / past-event records | **Structure resolved D-010; titles supplied D-026.** Separate pages with home previews. Owner now supplies the two named forums as factual archive records. | C-06: English titles drafted; further facts/rights/publication approval remain inputs. Exact dates, venues and organising attribution remain unknown. No detail routes justified by title-only records. |
| Q-03: primary contact action | **Resolved D-015.** Supplied public email link only; omit public contact action while missing. No contact route/form. | C-09 optional email, not an automatic release blocker. Internal homepage preview links remain usable. |
| Q-04: language policy | **Resolved D-011.** `/fr/...`, `/en/...`, `/ → /fr`, equivalent-page switch where available. Exact translated slugs are engineering choices. | C-11 delivery/approval of bilingual content; not an unsettled routing decision. |
| Q-05: file content vs four admins | **Resolved D-013.** Structured developer-managed Part A; CMS/admin accounts deferred. | Original self-service/four-admin requirement remains in Data A for later scope. |
| Q-06: technical foundation | **Resolved with change D-012.** Next.js App Router + TypeScript + **Tailwind CSS**, Vercel-compatible. The earlier CSS Modules recommendation is superseded. | C-01 brand delivery and B-01 rendered geometry constrain final styling; package versions/config chosen in authorized Phase 1. |
| Q-07: collection/integrations/privacy | **Resolved D-014/D-016/D-017.** No forms/uploads/accounts/payments/subscriptions/profiling; named integrations deferred; legal/privacy structure prepared separately from final text. | C-10 approved final legal/privacy/identity content before release. |

## Phase 0 evidence and planning status

| ID | Current status | Effect |
| --- | --- | --- |
| B-01 | **UNVERIFIED reference differences retained; no Phase 1 closure blocker under D-024.** Rendered shared geometry is partial; typography and mobile-menu equivalence remain unverified after the recorded failures. | Owner accepts tested local typography/menu provisionally and removes their exact reference equivalence requirement. [Decision](phase-1-acceptance-change.md). No new evidence/pass is inferred, no further reference request. Phase 1 closes on the amended basis. |
| B-02 | **Resolved.** Earlier Q-01–Q-07 scope decisions are recorded above. | No planning-scope blocker. Phase 1 is subsequently authorized by D-021; that instruction does not authorize Phase 2. |

**Remaining Phase 0 closure blockers: none under the owner's conditional no-browser fallback.** This is completion of planning, not completion of the rendered audit. No visual-verification waiver, approved generic redesign or implementation permission is inferred.

## Development inputs and publication gates (separate from Phase 0)

| ID | Class / status | Effect |
| --- | --- | --- |
| B-03 / C-01–C-07, C-11 | **Development content inputs outstanding.** Logo/charter, copy, team, photos, event facts, optional PDFs and translations may arrive during development. | [Formats and planned locations](content-and-assets.md) documented. Not automatic planning blockers. Required real content/rights/approval must exist before release; placeholders do not satisfy core completion. |
| C-09 | **Optional public email missing.** | Omit action until supplied; do not invent address or add contact page/form. |
| C-10 | **Release blocker: final approved legal/privacy and responsible identity not delivered.** | Prepare supporting routes/layout in development. Never label invented text approved; must resolve before publication. |
| B-04 / C-13 | **Release dependency: production ownership/configuration and handover details not yet supplied.** | Future Phase 4 instruction/access required; no planning blocker. |
| B-01 | **Evidence dependency for final reference fidelity.** | Source values are provisional. Captures can support appearance; keyboard/focus behaviour requires actual interaction evidence. |

No questionnaire source-access blocker remains. No database/CMS/auth/payment/analytics provider selected, no legal approval inferred and no facts/assets invented. **Phase 1 complete under D-024; Phase 2 implementation/verification complete under D-026.** Exact reference typography/menu equivalence remains UNVERIFIED, outside closure requirements. Approved core content/media/rights/legal remain outstanding; see the [current report](phase-2-report.md). Phase 3 is ready for explicit instruction and has not started. The subsequent D-027 checkpoint authorizes commit/push only; no deployment or Phase 3 work.
