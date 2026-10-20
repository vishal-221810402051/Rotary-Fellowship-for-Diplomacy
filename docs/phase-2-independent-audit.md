# Phase 2 independent audit

**19 October 2026. Unconditional Phase 2 implementation acceptance is not supported yet.** The existing commands reproduce their passing results, and the current draft/empty-content routes work in the exercised browser. Additional populated-state tests expose one medium-severity defect and one low-severity ordering defect in the homepage photo preview. Neither is a missing-client-content issue. No critical/high-severity defect was found in this audit. No fixes were implemented.

Editorial approval and publication readiness remain blocked by the previously documented client inputs. Exact reference typography/mobile-menu equivalence remains **UNVERIFIED** under D-024. Phase 3 and publication remain unstarted.

## Authority, audited revision and preservation

The [current audit request](evidence/phase-2-independent-audit-20261019T010251Z/audit-request.txt) supersedes older implementation permissions for this turn: audit only; no application fixes, dependency installation, staging, commit, push, deployment or security changes. Read AGENTS, standing instructions, phase plan, D-009 through D-026, source register, Part A scope, sitemap, inventory, implementation report and evidence guide before executing checks.

Authorized implementation scope remains [D-026 / S-16](phase-2-instructions.md): five bilingual Part A areas and linked home previews; source-faithful marked editorial drafts; two supplied archive titles without invented facts or title-only details; reusable team/album/figure components and honest empty states; preserved routing, shared accessibility and noindex policy. No collection workflows, services, lightbox requirement or new primary navigation area. Approved core content remains a separate retained gate. D-024 accepts the tested typography/nonmodal menu provisionally without proving reference equivalence. No external-reference inspection or asset copying occurred.

Actual initial state: `main`, HEAD **`e8582f3245540d2c32789da6a11db5937d44eb62`**, the documented Phase 1 checkpoint. The working tree already had **20 modified tracked files and 20 untracked files** from Phase 2, with nothing staged. This is an audit of those working-tree bytes, not just the committed Phase 1 revision. [Baseline](evidence/phase-2-independent-audit-20261019T010251Z/baseline.json) records full status, tracked/untracked/ignored inventory and SHA-256 for 216 existing project/content/evidence files, excluding Git internals, installed dependencies and generated build/cache trees. Raw questionnaires/logs/unreviewed captures remain ignored locally.

Compared all 84 checkpoint-file hashes against the saved Phase 2 starting baseline, reviewed the 20-file normalized Git diff and untracked implementation files, and checked the preserved extraction baseline. **All 86 original Data A rows and original source/extraction records are preserved.** Phase 1 evidence, reports, shared navigation/layout/styles, route registry and lockfile remain intact. Package manifest changes concern verification scripts only; no dependency/provider additions. Raw HEAD-blob differences caused by checkout line endings were distinguished from actual Git changes. [Preservation review](evidence/phase-2-independent-audit-20261019T010251Z/preservation-review.json).

## Findings, in severity order

### AUD-01 — MEDIUM: homepage falsely reports no photos when a later album has usable photos

**Location:** [home-page.tsx:33](../src/components/content/home-page.tsx#L33), lines 33-36 and 50-51. Contrast [photo-gallery.tsx:11](../src/components/media/photo-gallery.tsx#L11), which filters out empty groups before rendering.

**Reproduction:** supply two ordered albums to the existing `HomePage` content prop: first album has no usable photos (an empty `photoIds` array suffices); second contains approved, valid photo IDs. Give `PhotoGallery` the same albums/photos. Render either locale. No source modification or real-client media is needed.

**Expected:** the homepage selects an eligible album, or otherwise avoids saying photographs are unavailable when its linked gallery can display them. **Actual:** `records(content.albums).slice(0, 1)` selects the empty first album before eligibility filtering. The homepage renders zero images and “Photos are not yet available” / “Les photos ne sont pas encore disponibles”; the full gallery renders four images from the same records. This is inconsistent visitor-facing information once real albums are delivered. Current all-empty production content does not expose it.

Confirmed independently by bilingual SSR, then a separate rendered fixture preview using the unmodified components and actual compiled CSS/Next image optimiser. [Probe results](evidence/phase-2-independent-audit-20261019T010251Z/component-probes.json), [rendered reproduction and ephemeral URLs/viewports](evidence/phase-2-independent-audit-20261019T010251Z/independent/preview-reproduction.json), [English mobile screenshot](evidence/phase-2-independent-audit-20261019T010251Z/independent/false-empty-en-390.png), [French desktop screenshot](evidence/phase-2-independent-audit-20261019T010251Z/independent/false-empty-fr-1440.png). These are prominently labelled TEST DATA, not association photographs.

**Required correction before unconditional implementation acceptance:** select the first eligible album after resolving permission-filtered photos, and derive the preview/empty state from that eligible set. Add the empty-first/usable-later case to the existing content tests. Recommendation only; no fix made.

### AUD-02 — LOW: truncation drops the album's leading photograph when manifest order differs

**Location:** [home-page.tsx:34](../src/components/content/home-page.tsx#L34). Related coverage: [content.test.tsx:99](../tests/content.test.tsx#L99), lines 99-110.

**Reproduction:** valid approved asset records ordered `[a,b,c,d]`; one album's explicit `photoIds` order is `[d,c,b,a]`. Render home and the full gallery in either locale.

**Expected:** if the preview displays the first three album photographs, the selected IDs are `[d,c,b]`, following the documented ordered-album content contract. **Actual:** home first truncates asset-manifest order to `[a,b,c]`, then `PhotoGallery` orders that subset as `[c,b,a]`. The full gallery correctly renders `[d,c,b,a]`. The lead photograph `d` disappears from the preview. [Bilingual actual/expected results](evidence/phase-2-independent-audit-20261019T010251Z/component-probes.json).

**Impact:** the existing selection policy is undocumented and inconsistent with the supplied album sequence. Resolve photo IDs in album order before truncation, or explicitly approve/document another curation policy. Test more than three assets with differing orders. This is a low-severity populated-state defect, not fabricated current content; no fix made.

## Methods, environment and source/build identity

Story audited: navigation/locale selection -> allowlisted Next route/prerender -> typed developer-managed content -> server-rendered page/preview, plus static/optimised images. No database/API business workflow exists in scope.

The documented commands write to fixed Phase 2 evidence paths, so running them in the original checkout would overwrite evidence. An isolated source copy reproduced the audited bytes and reused the already installed dependency files through temporary hardlinks; **no package installation** occurred. Its production build/server used `http://127.0.0.1:3111`. Environment-only Git directory/work-tree settings let the unchanged documentation validator inspect that copy against the original read-only checkpoint/index. [Setup](evidence/phase-2-independent-audit-20261019T010251Z/setup.json), [command runner](evidence/phase-2-independent-audit-20261019T010251Z/run-command.py).

Node **24.16.0**, npm **11.13.0**, Next **16.4.2**, React/React DOM **19.3.1**, TypeScript **5.9.3**, Tailwind **4.3.3**, Playwright **1.64.1**, axe Playwright integration **4.14.0**, installed Chrome **155.0.8059.84**, headless with sandbox enabled. [Actual environment](evidence/phase-2-independent-audit-20261019T010251Z/environment.json). No other browser engine or deployment was tested.

The reported `3100` preview was a pre-existing original-project Next process. Recorded original build ID `FzmmXBuO44hkGp2cuHvGQ` and fresh initial audit build ID `YKGj36Pw9eoA0Y_hRspeD`. Independently fetched **all 14 routes from both servers** and compared hashes of parsed language/title/main/header/footer markup: all match. This establishes served-content parity and a separately built source copy; it does not pretend different builds have identical entire HTML/chunk bytes. [Parity, independent requests and browser evidence](evidence/phase-2-independent-audit-20261019T010251Z/independent/results.json).

## Actual verification results

All nine applicable documented commands were executed using the unchanged scripts. Counts below are fresh observations, not accepted from the old report. The production build ran before starting the audit server. Temporary chart copies existed only in the isolated workspace; the server was stopped, copies removed, and a final clean build/server check performed afterwards.

| Command | Exit / actual result | Fresh log |
| --- | --- | --- |
| `npm.cmd run typecheck` | 0; route generation and TypeScript pass | [Log](evidence/phase-2-independent-audit-20261019T010251Z/commands/typecheck.json) |
| `npm.cmd run lint` | 0; zero warnings | [Log](evidence/phase-2-independent-audit-20261019T010251Z/commands/lint.json) |
| `npm.cmd test` | 0; 15 pass, 0 fail/skip | [Log](evidence/phase-2-independent-audit-20261019T010251Z/commands/test.json) |
| `npm.cmd run build` | 0; initial and post-fixture-cleanup builds; 14 localized routes plus framework not-found/robots | [Initial summary](evidence/phase-2-independent-audit-20261019T010251Z/commands/build-with-fixtures-summary.json), [final log](evidence/phase-2-independent-audit-20261019T010251Z/commands/build.json) |
| `npm.cmd run check:http` | 0; 244 checks, 14 allowed routes, root 308 and 11 unsupported paths/locales | [Log](evidence/phase-2-independent-audit-20261019T010251Z/commands/http.json), [new results](evidence/phase-2-independent-audit-20261019T010251Z/recorded-scripts/http.json) |
| `npm.cmd run check:browser` | 0; 49 pass, 0 fail; 40 page/viewport measurements; 20 axe scans | [Log](evidence/phase-2-independent-audit-20261019T010251Z/commands/browser.json), [new results](evidence/phase-2-independent-audit-20261019T010251Z/recorded-scripts/browser/results.json) |
| `npm.cmd run check:media` | 0; six isolated populated FR/EN viewport states; real static/optimised image requests, reserved/loaded dimensions and six axe scans | [Log](evidence/phase-2-independent-audit-20261019T010251Z/commands/media.json), [new results](evidence/phase-2-independent-audit-20261019T010251Z/recorded-scripts/media-fixtures/results.json) |
| `python scripts/check-phase-2.py` | 0; 43 checks, 285 local documentation links, 32 protected files | [Log](evidence/phase-2-independent-audit-20261019T010251Z/commands/docs.json) |
| `git diff --check` | 0; no whitespace diagnostics | [Log](evidence/phase-2-independent-audit-20261019T010251Z/commands/whitespace.json) |

Independent of those scripts, visited **all 14 localized routes at all four requested viewports** (56 rendered measurements): 1440x900, 768x1024, 390x844 and 320x844. Exercised all five navigation targets and both footer destinations in each locale/viewport; identity links, real skip-link activation, Tab focus visibility, Space/Enter menu opening, Escape/trigger return, current-page states and closed menu exclusion were checked. The existing focused run additionally exercises all four home previews by keyboard at each locale/viewport. Every anchor destination is allowlisted or resolves the actual `#main-content` ID. No unsupported event/album detail route appeared. No observed overflow, clipped main text, overlapping identity/language controls, broken actual-page assets, valid-route console errors or uncaught browser exceptions.

The independent first run recorded **107 checks: 99 passed and eight locale-focus probe failures**. Each failure occurred when the audit harness queried `:focus` after a locale transition returned focus to document entry: `BODY` need not match that selector. Preserved those failures rather than relabel them. A [targeted follow-up](evidence/phase-2-independent-audit-20261019T010251Z/independent/locale-focus-followup.json) read `document.activeElement` directly and verified actual next-Tab behaviour: **20 journeys pass**, including all seven page identities in both directions at mobile and root switching at the other widths. Same-locale destination-main focus remains separately verified. [Six additional disclosure checks](evidence/phase-2-independent-audit-20261019T010251Z/independent/disclosure-followup.json) pass for nonmodal background interaction, closed Tab exclusion, Escape and breakpoint focus transfer/preservation.

Independent HTTP requests additionally confirm no title-only event/album paths, true localized/global 404s, valid direct/optimised chart images and **404 for a missing optimised image**. The expected server warning `internal image response failed ... 404` came from that deliberate missing-image request, not a valid-route browser error. Root redirect, robots/noindex, language and legal missing-text behaviour remain correct in tested views.

## Accessibility and rendered review

Fresh scans: **20 application pages + six populated fixture states + six independent legal/privacy/error states + two open-menu states = 34 axe scans**, zero violations. The last eight scans extend the existing script's coverage. Existing 80 gradient-incomplete node reviews were independently recomputed; the additional scans have 12 footer contrast-incomplete nodes using the same shared white-on-gradient treatment. Fixture scans have no incompletes. [Independent legal/error scans](evidence/phase-2-independent-audit-20261019T010251Z/independent/results.json), [open-menu scans](evidence/phase-2-independent-audit-20261019T010251Z/independent/disclosure-followup.json).

Computed gradient stops are `(0,103,200)` and `(23,69,143)` in sRGB, with white text. Independently calculated WCAG linearisation/luminance: the channel-wise upper bound `(23,103,200)` gives a conservative minimum contrast **5.511005:1**, above the **4.5:1 normal-text** threshold. Sampling 10,001 interpolation positions gives minimum **5.564203:1**, consistent with that conservative bound. Measured footer opacity is 1; no pixel-identical or scanner-only claim is made. [Calculation and fresh style samples](evidence/phase-2-independent-audit-20261019T010251Z/independent/contrast-review.json). Manual keyboard/heading/geometry checks are distinct from scanner findings. This is not full WCAG certification.

There are **34 fresh PNG captures**: 20 actual-page, six normal populated-fixture, six extra responsive/menu and two diagnostic false-empty reproductions. URLs, viewport sizes and states are recorded in their manifests. Inspected ten fresh captures directly: English desktop home, French mobile mission, French desktop events, English mobile team, French mobile photos, French 320px home, English tablet mission, English open keyboard menu, English 320px populated charts, and the English diagnostic false-empty reproduction. Readable wrapping, hierarchy, spacing, focus rings and chart aspect ratios were visually observed; actual team/photo pages contain no invented assets. This developer audit is not client visual approval.

Representative evidence: [desktop home](evidence/phase-2-independent-audit-20261019T010251Z/recorded-scripts/browser/en-home-1440.png), [mobile mission](evidence/phase-2-independent-audit-20261019T010251Z/recorded-scripts/browser/fr-mission-390.png), [tablet mission](evidence/phase-2-independent-audit-20261019T010251Z/independent/en-1-768.png), [320px home](evidence/phase-2-independent-audit-20261019T010251Z/independent/fr-0-320.png), [keyboard menu](evidence/phase-2-independent-audit-20261019T010251Z/independent/en-menu-keyboard-390.png), [isolated charts](evidence/phase-2-independent-audit-20261019T010251Z/recorded-scripts/media-fixtures/en-320.png).

## Content, provenance and coverage limits

Actual Data A page-2 mission and page-3 proposed slogan were read from preserved extracts, not re-extracted. Identity is exactly **Rotary Fellowship for Diplomacy**. FR/EN home/mission cover the authorized themes without adding founding/legal/affiliation/impact claims. The two French event titles exactly match D-026; English title translations preserve their meaning and are drafts in the structured slot/provenance, alongside the visible preparation/review notice. Dates, venue, organising attribution and descriptions remain null. Data A priorities were not rewritten. No invented people, photographs, speakers, attendance, contacts or brand rights were found. Legal/privacy shells expressly state the official text is missing. Missing email produces no contact action. Main visitor copy does not expose development/source notes.

Pending profiles and photos are rejected by the actual permission filters; independent bilingual probes also reject invalid dimensions and traversal paths. Full-gallery ordering and normal image dimensions/srcset/sizes/alt/caption/credit/lazy attributes pass. These are typed developer-managed input checks, not a file-access authorization system or proof of client consent. Fixtures prove rendering and dimension stability through delayed loading, not real-photograph quality, crop/context, performance or publication permission. No real client image could be audited.

Meaningful verification gaps:

- The [home content test](../tests/content.test.tsx#L99) only counts two fixture images in one album; it does not check first-eligible-album selection or truncation under a different asset order. The gallery sequence test does not cover the homepage's preceding selection. This explains why all 15 tests pass alongside AUD-01/AUD-02.
- `check:browser` tests current empty photo content, so it cannot reveal the populated-preview defects. The separate media check renders `TeamProfiles`/`PhotoGallery`, not a populated homepage.
- [check-phase-2.py:62](../scripts/check-phase-2.py#L62) validates saved counts, files and prior exit fields, not freshness against every current source byte or the semantics of every scan. A passing documentation check is not independent execution proof; fresh command logs and explicit snapshot/parity evidence supply that proof here. Some copied context files under `recorded-scripts` are historical; the fresh proof is the linked HTTP/browser/media results and `commands/` logs, not inherited command-status JSONs.
- The image check measures image-box dimensions before/after load, not total page CLS, real-client transfer budgets or cross-browser rendering. DOM assertions often compare against shared dictionaries; this audit separately read the actual bilingual copy/source.
- Final factual/translation approval, real media/rights, production SEO/performance/release settings and other browser engines remain outside demonstrated acceptance. These are not fabricated failures or instructions to begin Phase 3.

The diagnostic screenshot attempt initially mixed React module instances between the original and copied dependency trees and failed with an invalid-hook-call error. The [attempt source](evidence/phase-2-independent-audit-20261019T010251Z/preview-reproduction-attempt1.mjs) and [failure record](evidence/phase-2-independent-audit-20261019T010251Z/independent/preview-attempt1.json) are retained. Resolving both React and its renderer from the snapshot corrected only the audit artifact; the targeted rendered reproduction then succeeded. No application code or acceptance assertion was weakened.

## Acceptance matrix and discrepancy assessment

| Criterion | Audit status | Evidence / qualification |
| --- | --- | --- |
| Authorized five-area identity, routes and scope; no excluded services/collection/tracking | PASS | Source/diff inspection, 14-route HTTP checks and independent markup parity |
| Source-faithful bilingual draft prose, exact supplied French event titles, no invented facts | PASS | Preserved Data A extracts, D-026, actual content/provenance/rendering |
| Current truthful team/photo/legal empty states and omitted missing-email action | PASS | Fresh browser/HTTP and source inspection |
| Permission filtering and ordinary populated profile/full-gallery/image states | PASS | Seven content tests plus independent permission probes and six media states; no real media approval implied |
| Homepage preview always selects usable photos when available | **FAIL** | AUD-01; bilingual SSR and rendered zero-versus-four reproduction |
| Homepage preview respects album order before truncation | **FAIL** | AUD-02; expected `[d,c,b]`, actual `[c,b,a]` |
| All route/language/navigation/footer/skip/menu/focus/heading/landmark/noindex/404 behaviours exercised | PASS | 56 independent render states, documented journeys, targeted focus/disclosure follow-ups |
| Representative responsive/keyboard/accessibility/image checks | PASS | Fresh captures, 34 reviewed scans and contrast review; bounded Chrome coverage |
| Existing script pass counts and commands reproducible | PASS | Fresh 15/244/49/26 documented-command counts reproduced; independent probes add coverage |
| Existing claim of no remaining implementation defect / complete acceptance | **FAIL** | Previously untested populated homepage cases now fail; prior report is preserved, not silently rewritten |
| Exact reference typography/mobile-menu equivalence | UNVERIFIED | D-024 unchanged; no external reference reopened |
| Approved editorial translations, profiles/photos/brand/rights and final legal identity/text | BLOCKED | Not delivered/approved; intentional D-026 development allowance does not approve publication |
| Publication readiness | BLOCKED | Content/rights/legal dependencies, later production configuration and explicit phase/release authorization outstanding |

The previous reported numerical passes are supported by fresh execution. Its narrow “in the exercised scope” wording is accurate for the old fixtures, but its broader implementation-complete/no-blocker conclusion omits the now-reproduced preview defects. Missing client materials, omitted optional email, absent title-only details/lightbox/services and retained UNVERIFIED reference status are intentional boundaries, not implementation defects.

## Final disposition and cleanup

**Implementation correctness:** current draft/empty-content journeys are supported; reusable homepage photo selection needs correction/recheck before unconditional Phase 2 acceptance. **Verification completeness:** requested audit coverage was completed with preserved failures, targeted harness corrections and explicit limits; passing existing scripts alone is insufficient. **Editorial approval:** outstanding. **Publication readiness:** blocked. Required client inputs remain approved paired copy/metadata/vocabulary, ordered profiles and permissions, authorised/contextualised photos/albums/credits/alt/captions, actual logo/brand rights, final bilingual legal/privacy/responsible identity and eventual production ownership/configuration. Optional email and further event facts are not invented or silently made mandatory.

Audit-created static chart copies were removed, direct URLs returned 404 after the clean rebuild, isolated preview servers and audit Chrome sessions were closed, the audit Next server on 3111 was stopped, and the entire audit-created temporary source/dependency/build/cache workspace was removed. Only intentionally retained ignored audit documentation/results/screenshots remain. The pre-existing original preview on 3100 is intentionally preserved. [Cleanup evidence](evidence/phase-2-independent-audit-20261019T010251Z/cleanup.json).

Final original Git state: same `main` and checkpoint SHA, empty staging, original 20 modified tracked files and original 20 untracked files preserved; only this additional audit report is newly untracked. All 216 original audited file hashes, including the implementation report and previous evidence, remain unchanged. [Final preservation/status verification](evidence/phase-2-independent-audit-20261019T010251Z/final-state.json). No fixes, dependency installs, staging, commit, push, deployment or security changes. **Phase 3 and publication remain unstarted.**
