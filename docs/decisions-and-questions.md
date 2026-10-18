# Decisions and unresolved questions

> Historical instruction-setup log. These observations predate the authorized Phase 0 audit. See [current decisions and gaps](decisions-and-gaps.md) and [the Phase 0 report](phase-0-report.md) for updated source/Git/phase status; retain the original findings below as history.

## Confirmed decisions

| ID | Date | Source | Decision and scope effect |
| --- | --- | --- | --- |
| D-001 | 2026-10-18 | User's working-folder message | Use `C:\Users\visha\Desktop\International Diplomatic Project\website\rffd` as the working folder. |
| D-002 | 2026-10-18 | Standing instructions, sections 1 and 14 | Organisation name: Rotary Fellowship for Diplomacy. Authorize instruction setup only; wait for “Start Phase 0.” |
| D-003 | 2026-10-18 | Standing instructions, sections 9–10 | Exactly phases 0–4; one active phase; user instruction required to advance. |
| D-004 | 2026-10-18 | Standing instructions, sections 2 and 6 | Exclude Data B, independent project submissions and MEDIS unless explicitly introduced. |

## Scope questions reserved for Phase 0

These are recorded dependencies, not requests to begin work or decisions already resolved.

- Reconcile Data A's five indispensable elements (homepage, mission, team, past events, photos) with the wider collection marked “at launch” and the statement that “the rest” may wait. The five essentials are the **proposed initial showcase scope**, pending a precise Part A decision.
- Define supporting navigation, French/English coverage and legal/privacy requirements before dependent implementation.
- Verify broader registration, paid ticketing, annual contributions, donations and administrator requirements against Data A; determine timing and workflows explicitly. Do not implement payments, registrations, memberships, donations, CMS or authentication by implication.
- Reconcile the earlier questionnaire's press-release selection after obtaining the missing source.
- Record actual missing factual content, verified branding assets, photography/rights and approval dependencies during the inventory.

## Repository observations from setup

- The working folder was empty before this documentation setup.
- No `AGENTS.md` was found in the working folder or its ancestor directories before creating the root instructions.
- `git status --short --branch` reported that this directory is not a Git repository. Git was not initialized and no commit was made.
- No application stack has been selected or installed. Next.js App Router, TypeScript, maintainable styling, French/English routing and Vercel compatibility remain the user's requested **engineering proposal to evaluate for an empty repository**, not a PDF mandate or an implemented architecture.

## Setup verification boundary

Setup verifies documentation persistence and local source availability only. No PDF requirements audit, reference-site audit, implementation, dependency installation, application tests, production build or deployment has been performed. Development phase acceptance criteria remain to be defined during authorized work.
