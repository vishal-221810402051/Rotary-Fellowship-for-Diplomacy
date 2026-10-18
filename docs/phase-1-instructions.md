**Start Phase 1 — Application Foundation and Shared Interface.**

Follow `AGENTS.md` and the completed Phase 0 documentation. Implement Phase 1 only.

## 1. Establish the baseline

Read the relevant scope, architecture, sitemap, reference audit, decisions and phase plan.

Inspect Git status and existing files before editing. Preserve unrelated changes. Do not overwrite the documentation or recreate completed planning work.

Phase 0 is complete under the documented no-browser fallback. Rendered reference appearance and interactions remain unverified. Preserve that limitation throughout implementation and reporting.

## 2. Approved scope

Build the foundation for **Rotary Fellowship for Diplomacy** using:
- Next.js App Router.
- TypeScript with strict checking.
- Tailwind CSS.
- Structured, developer-managed bilingual content.
- Vercel-compatible configuration.

Implement:
- `/fr/...` and `/en/...` routes.
- `/` redirecting to `/fr`.
- Equivalent-page language switching.
- Five public page shells: home, mission, team, past events and photos.
- Legal/privacy route structures.
- Shared header, navigation, mobile menu and footer.

Use the approved route map. If exact slugs are unspecified, choose clear locale-appropriate slugs and record the mapping.

Do not implement full page content or the event/photo experiences assigned to Phase 2.

## 3. Reference-based interface

Use the verified source observations in the reference audit:
https://amicalerotaryfrancophonie.org/

Match the documented structure where evidence supports it. Apply the association’s requested blue/yellow direction.

For details that require screenshots:
- Use maintainable provisional tokens and components.
- Record assumptions and affected components.
- Avoid elaborate styling based on guesses.
- Do not claim exact visual or interaction fidelity.

Build only the navigation entries required by our sitemap. Do not reproduce reference sections excluded from Part A or add unsupported nested menus.

Use the organisation’s exact name. If no approved logo exists, use a clean text identity temporarily; do not invent an official logo or affiliation statement.

## 4. Architecture and content interfaces

Separate routing, content and presentation.

Create typed structures sufficient for later:
- Organisation and mission content.
- Team profiles.
- Past events.
- Photo assets and captions.
- Navigation and interface translations.
- Legal/privacy content availability.

Define only fields needed by Part A. Do not design a speculative platform.

Use stable route/content identifiers so language switching does not depend on brittle string replacement.

Validate supported locales and handle unknown routes appropriately. Missing translations must have an explicit policy and must not silently display the wrong language.

Keep missing client content identifiable in development. Do not fabricate people, events, photographs, statistics, contact information or legal text.

## 5. Shared behaviour and accessibility

Implement:
- Semantic landmarks and a skip link.
- Clear current-page navigation.
- Keyboard-accessible navigation.
- Visible focus styles.
- Mobile menu button with correct accessible name and expanded state.
- Escape-to-close and appropriate focus handling.
- Menu closure after navigation.
- No background keyboard interaction while a modal menu is open, if using a modal pattern.
- Accessible French/English switching.
- Correct document language for each locale.
- Responsive layouts without horizontal overflow.
- Reduced-motion support for any animation.

Do not add animation or complex interactions without a clear purpose.

The footer must omit unavailable email, social links and other missing details. Do not create dead links or misleading controls.

## 6. Scope exclusions

Do not add:
- Database, CMS or admin dashboard.
- Authentication or member accounts.
- Forms, uploads or data collection.
- Ticketing, donations or payment integrations.
- Newsletter, CRM or analytics.
- AI agents.
- Invented legal policies.
- Full Phase 2 page implementations.

Legal/privacy shells must clearly reflect missing final content in development. They are not publication-ready policies.

## 7. Dependencies and local execution

Use the existing package manager and lockfile conventions. If none exist, choose one and document it.

Use compatible stable dependencies and keep additions minimal. Check current official documentation when version-specific behaviour is uncertain.

Dependency installation and local development execution are authorised for Phase 1.

Do not deploy, commit, push or change remote configuration.

## 8. Verification

Run checks appropriate to the implementation:
- Type checking.
- Linting with an explicit supported command.
- Production build.
- Route and redirect verification.
- Both language versions of every agreed shell.
- Equivalent-page language switching.
- Unknown locale/route handling.
- Translation-key completeness.
- Navigation and mobile menu behaviour.

Use meaningful automated tests for routing and interaction logic where practical.

Check representative desktop/mobile layouts and keyboard behaviour if a browser becomes available. Otherwise document those checks as pending and provide exact manual verification steps.

A passing build is not proof of visual fidelity or browser interaction correctness.

## 9. Documentation and evidence

Update relevant documents with:
- Actual project structure and commands.
- Route mapping and translation policy.
- Content interfaces and missing-content handling.
- Provisional design assumptions.
- Files/components awaiting reference screenshots.
- Validation results and publication dependencies.

Create `docs/phase-1-report.md`.

Assess completion against the existing Phase 1 acceptance criteria. Do not weaken criteria merely to mark the phase complete.

## 10. Final report and stop

Report:
1. Phase 1 status and resulting behaviour.
2. Main files/components implemented.
3. Commands and checks run, with results.
4. Browser checks actually performed versus pending.
5. Reference-fidelity limitations.
6. Content and release dependencies.
7. Local run instructions.
8. Git status and Phase 2 readiness.

Complete all authorised Phase 1 work autonomously. Resolve routine implementation choices from the approved documents.

Stop after Phase 1. Do not begin Phase 2 without my instruction.