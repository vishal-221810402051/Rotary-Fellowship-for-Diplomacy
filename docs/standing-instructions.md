You are the lead web engineer working with me in Codex inside VS Code.

We are building the website for **Rotary Fellowship for Diplomacy**, with final deployment to **Vercel**.

This message establishes the project’s standing rules. Read and retain them in the repository’s project documentation. **Do not start a development phase yet.**

## 1. Project identity

The correct organisation name is:

**Rotary Fellowship for Diplomacy**

Do not identify this website as Expressions de France.

The supplied questionnaires retain Expressions de France headings, but the completed report explicitly states that this project concerns a new association named Rotary Fellowship for Diplomacy.

Do not invent the association’s legal status, official affiliations, endorsements, registration details or rights to branding.

## 2. Source register and authority

Maintain clear distinctions between these sources:

### Data A — Primary requirements
`Expressions_de_France_Requirements_2026-10-15.pdf`

This is the completed client questionnaire and the primary source of business requirements. Read the full document when Phase 0 begins.

### Earlier incomplete questionnaire
`Expressions_de_France_Requirements_2026-10-11.pdf`

This is mostly unanswered. Its populated selections are:
- Upcoming events.
- Photo gallery.
- Press releases.
- Podcasts.

Do not let unanswered fields override Data A. Record press releases as an additional item requiring reconciliation, not an automatic addition to launch scope.

### UI/UX reference
https://amicalerotaryfrancophonie.org/

Use this as the visual and interaction reference, not as a source of the new association’s facts or functional scope.

### Data B — Meeting clues
Meeting screenshots and provisional interpretations are excluded from the current build unless I explicitly introduce them into scope.

### Later instructions
My explicit later decisions can update the requirements. Record what changed, its source and its effect on scope. Do not silently rewrite the original source evidence.

If a source file is unavailable, identify the missing file. Do not reconstruct its full contents from memory or claim to have read it.

## 3. Visual fidelity

The objective is to reproduce the reference website’s **UI/UX structure as closely as applicable to our agreed content**.

Do not substitute a generic template or independently redesign the site.

When Phase 0 starts, inspect representative desktop and mobile pages and document:
- Header, logo placement and navigation.
- Container widths and layout proportions.
- Homepage section sequence.
- Typography, colours, spacing and image treatments.
- News, event and internal-page layouts.
- Footer.
- Responsive navigation and relevant interactions.

Distinguish observed behaviour from assumptions. Use screenshots and measurements where available.

If inspection is blocked, report the limitation and the evidence needed. Do not fabricate an audit.

Adapt the structure to our requirements. Do not copy the reference organisation’s text, photographs, logos, statistics or claims.

Follow Data A’s blue/yellow branding direction using supplied or verified assets. Record missing assets.

## 4. Requirements discipline

For each material requirement, record:
- Requirement ID.
- Source and PDF page where applicable.
- Client wording or faithful summary.
- Priority.
- Interpretation.
- Scope status.
- Acceptance criteria.
- Unresolved dependencies.

Distinguish:
1. Explicit client requirements.
2. My explicit decisions.
3. Engineering proposals.
4. Assumptions awaiting clarification.

An unanswered field is unknown. It does not mean “no.”
A selected feature is not proof that its workflow is fully specified.
Do not turn recommendations into client requirements.

## 5. Part A and the launch-scope conflict

We will build Part A first, but its boundary must be documented before implementation.

Data A identifies these five indispensable elements:
- Homepage.
- Mission.
- Team.
- Past events.
- Photos.

It also marks a much larger collection of features “at launch,” then says “the rest” can wait.

Do not silently choose one interpretation.

Use the five essentials as the **proposed initial showcase scope**. During Phase 0:
- Map the wider requirements.
- Explain the contradiction.
- Propose a precise Part A boundary.
- Identify supporting navigation, bilingual and legal/privacy requirements.
- Separate deferred features.
- Present material scope decisions for resolution before dependent implementation.

Continue independent Phase 0 work while unresolved decisions are recorded.

Do not implement payments, registration, memberships, donations, CMS or authentication merely because they appear somewhere in the PDF.

## 6. Known requirements to verify against Data A

The following are orientation notes, not a substitute for reading the PDF:

- Global audience: Rotarians, Rotaractors, young adults aged 18–35 and the public.
- Mission: intercultural dialogue, peace, international cooperation and economic exchange.
- French and English throughout.
- Institutional, modern, elegant, diplomatic and accessible to young people.
- Strong photography and participation-focused presentation.
- Target launch: 1 December 2026.
- Two past forums are named for potential presentation.
- The gallery answers currently concern events organised by the association.
- No member login area is requested.
- Four administrators with full access are requested for the broader system.
- Registration, paid ticketing, €10 annual contributions and donations appear in the broader requirements, but their launch timing and workflows need resolution.

Do not assume an open gallery for independent projects, public project submissions or MEDIS inclusion.

## 7. Content integrity

Do not invent:
- Team members or biographies.
- Partners, sponsors or endorsements.
- Event dates, venues, programmes or speakers.
- Statistics, testimonials or impact claims.
- Contact details.
- Legal text presented as approved.
- Translations of documents that have not been supplied.

You may propose bilingual interface copy and draft translations, clearly recording their status.

Use identifiable placeholders in development where needed. Missing factual content must remain a documented release dependency.

Do not publish development placeholders as real association content.

## 8. Technical approach

Inspect the repository and applicable AGENTS.md instructions before making changes.

Preserve existing work and avoid overwriting unrelated changes.

If starting from an empty repository, propose:
- Next.js App Router.
- TypeScript.
- A maintainable styling system.
- French/English routing.
- Vercel-compatible deployment.

The PDF does not mandate this stack; record it as an engineering choice.

Keep content separate from presentation and translations structured.

Add services only when the agreed active scope needs them. Do not prematurely introduce:
- Databases or CMS.
- Authentication.
- Payment providers.
- CRM or newsletter integrations.
- AI agents.
- Member portals.

Use environment variables for configuration and secrets. Never commit credentials.

For any implemented form or upload, define validation, storage, access and retention behaviour before treating it as complete.

## 9. Exactly five phases

Use phases **0–4**. Do not create additional numbered phases.

### Phase 0 — Evidence and project blueprint
Read sources, audit the reference and repository, reconcile scope, propose the sitemap and architecture, document gaps and define acceptance criteria.

### Phase 1 — Foundation and shared interface
Build the approved technical foundation, design tokens, typography, shared layouts, responsive navigation, footer and language routing.

### Phase 2 — Part A implementation
Build the agreed pages, content structures, media presentation and bilingual experience using the approved reference mapping.

### Phase 3 — Verification and completion
Verify implemented journeys, responsive behaviour, accessibility, content, SEO, performance and production build. Resolve defects and record blockers.

### Phase 4 — Release and deployment
Prepare production configuration and handover documentation. Deploy to Vercel when instructed and access is available. Verify the deployed website and report its actual status.

Use tasks within these phases for finer detail.

## 10. Phase controls

Work on one active phase at a time.

For each phase:
- Define scope and exclusions.
- State measurable acceptance criteria.
- Implement only the authorised work.
- Run relevant checks.
- Record results and remaining blockers.
- Provide a concise completion report.

Continue routine, reversible work autonomously within the active phase.

Do not advance to another phase until I instruct you.

Do not claim completion based only on code being written. Report which checks actually ran and which did not.

If required evidence or acceptance criteria remain unmet, mark the phase incomplete or blocked.

## 11. Verification standards

Use checks appropriate to the actual implementation, including:
- Type checking, linting and production build.
- Navigation and route checks.
- French/English switching and content completeness.
- Desktop, tablet and mobile behaviour.
- Keyboard navigation, focus visibility and semantic structure.
- Image loading, sizing and alternative text.
- Broken links and missing assets.
- Relevant metadata and sitemap.
- Comparison with the reference at representative viewports.
- No exposed secrets, fabricated facts or misleading controls.

Add meaningful tests for real behaviour. Avoid tests that simply repeat implementation details.

Never describe an untested deployment or interaction as verified.

## 12. Persistent project documentation

Follow an existing repository convention where available. Otherwise maintain concise documents under `docs/` for:
- Source register.
- Requirements register.
- Reference UI/UX audit.
- Scope, exclusions and sitemap.
- Architecture.
- Five-phase plan.
- Content/asset inventory.
- Decisions and unresolved questions.
- Validation evidence and handover.

Create or update root AGENTS.md only after reading any existing instructions. Keep it concise and link to detailed documents rather than duplicating them.

Preserve source facts and decision history.

## 13. Communication

Lead updates with outcomes, findings and blockers.

Ask only questions that materially affect scope, behaviour or implementation. Make reasonable routine engineering choices and record them.

Clearly identify proposals, verified facts and missing information.

Do not claim to have inspected files, websites, run tests or deployed anything unless you actually did so.

## 14. Action for this message only

Perform project setup of these standing instructions only:

1. Inspect the repository instructions and structure.
2. Record these rules in suitable project documentation without altering application behaviour.
3. Record the supplied sources and check which are available.
4. Acknowledge the organisation name and the five-phase structure.
5. List any source-access blockers.
6. Wait for my instruction: **“Start Phase 0.”**

Do not start the reference audit, application implementation, dependency installation or deployment yet.