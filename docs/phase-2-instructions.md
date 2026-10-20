**Start Phase 2 — Part A Pages, Content and Media.**

Follow `AGENTS.md`, the approved scope and phase plan. Phase 1 is closed under D-024 and checkpointed on `main` at:

`e8582f3245540d2c32789da6a11db5937d44eb62`

## 1. Confirm the baseline

Inspect Git status, current branch and recent history. Preserve existing work and verify the Phase 1 checkpoint is present.

Read the relevant scope, sitemap, architecture, content inventory and Phase 1 closure report. Reuse the existing foundation.

D-024 remains effective: typography and accessible mobile navigation are provisionally accepted; exact reference equivalence remains unverified. Do not reopen those gates or repeat reference requests.

## 2. Implement the five bilingual pages

Replace the shells with coherent, responsive page layouts for:

1. Homepage.
2. Mission.
3. Team.
4. Past events.
5. Photos.

Preserve the organisation name:
**Rotary Fellowship for Diplomacy**

Follow the documented reference structure and existing shared visual system. Do not introduce a generic redesign or expand the approved scope.

### Homepage
Build a clear introduction using Data A’s mission and proposed slogan, followed by linked previews of the mission, team, past events and photos.

Only show factual profiles/media when supplied. Avoid fabricated statistics, testimonials, partner logos or unsupported join/donate/register buttons.

### Mission
Develop clear French/English draft copy faithfully expressing Data A:
- Connecting Rotarians and non-Rotarians worldwide.
- Intercultural dialogue.
- Peace and international cooperation.
- Commercial and economic exchange.
- Institutional communication.

Record drafted copy and translations as pending client review. Do not imply unverified official affiliation or endorsement.

### Team
Implement reusable profile components for supplied names, roles, biographies and portraits.

If no profiles are available, provide a concise bilingual empty state. Do not invent members or portraits.

### Past events
Implement the archive presentation using the supplied factual records:

- Forum sur la paix Paris 2026.
- Forum sur la jeunesse et diplomatie Paris 2026.

Do not invent dates, venues, speakers, attendance or organisational attribution. Record English title translations as drafts.

Use detail routes only where the agreed scope and available content justify them. Do not create title-only detail pages filled with missing-data messages.

### Photos
Implement the agreed photo/album presentation using supplied authorised assets.

Support responsive sizing, preserved aspect ratios, meaningful alternative text, captions and appropriate loading.

If no usable photographs exist, provide an honest bilingual empty state and document the exact asset inputs needed.

Add a lightbox only if required by the approved experience; if included, verify keyboard navigation, Escape and focus return.

## 3. Content handling

Inventory available materials before populating pages.

Separate:
- Source-backed facts.
- Client-supplied content.
- Draft editorial copy/translations.
- Missing content and assets.

Missing client materials must not prevent implementing reusable layouts and content components.

Do not present stock/generated imagery as photographs of the association’s real activities. Use test fixtures only in tests or isolated previews.

Keep development notes out of the main visitor experience. Document content status separately; retain clear preview notices where needed to avoid misleading users.

Integrate public email and legal/privacy text only if supplied. Otherwise preserve existing missing-content handling.

## 4. Preserve scope boundaries

No database, CMS, admin dashboard, authentication, forms, uploads, payments, ticketing, membership workflows, newsletter, CRM, analytics, AI agents or independent-project submissions.

Maintain French/English equivalent-page switching, correct document language, accurate 404 responses and development noindex settings.

Keep content structured and reusable without building speculative future features.

## 5. Validate the implementation

Run typecheck, lint, meaningful tests and production build.

Update shell-specific assertions to reflect implemented pages without weakening behavioural checks.

Verify:
- All French/English pages and internal links.
- Equivalent-language switching.
- Desktop, tablet and mobile layouts.
- Navigation, keyboard focus and heading structure.
- Relevant accessibility scans and unresolved findings.
- Empty and populated content states using isolated fixtures where necessary.
- Image loading and layout stability when assets exist.
- No fabricated facts, misleading controls or new console errors.

Capture representative rendered screenshots. Reuse unchanged Phase 1 evidence; do not repeat external-reference inspection.

## 6. Document completion

Update the content inventory, route map and documentation where changed.

Create `docs/phase-2-report.md` covering:
- Implemented pages and behaviour.
- Source-backed versus drafted content.
- Missing client inputs and expected formats.
- Checks and actual results.
- Screenshot evidence.
- Remaining defects.
- Publication dependencies.
- Phase 2 acceptance status and Phase 3 readiness.

Distinguish implementation completion from publication readiness. Missing client assets may remain publication dependencies; required implementation failures must remain open.

Complete Phase 2 autonomously within scope.

**Do not begin Phase 3, commit, push or deploy.** Stop after the report so we can review and checkpoint Phase 2.