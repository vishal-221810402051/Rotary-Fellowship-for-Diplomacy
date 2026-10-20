# Phase 2 audit resolution: AUD-01 and AUD-02

**19 October 2026. Both findings resolved by implementation follow-up. Phase 2 implementation complete; editorial approval and publication readiness remain pending.** No independent re-audit is claimed. The [original audit](phase-2-independent-audit.md), its failing captures and all historical evidence are unchanged. Current owner instruction expressly permits these fixes/tests only; Phase 3, staging, commit, push and deployment remain unauthorized. D-024 is unchanged: exact reference typography/menu equivalence remains UNVERIFIED.

| Finding | Root cause | Fix | Disposition |
| --- | --- | --- | --- |
| AUD-01 | Home chose the first album before checking for usable photos. Empty/rejected-only first albums hid valid later albums. | Resolve every album's eligible photos first; select the first nonempty result. Empty state is shown only if none exists. | RESOLVED, targeted implementation verification |
| AUD-02 | Home truncated asset-manifest order before applying album order. | Resolve in explicit `photoIds` order, filter eligibility, then apply three-photo limit. `[a,b,c,d]` manifest plus `[d,c,b,a]` album now yields `[d,c,b]`. | RESOLVED, targeted implementation verification |

`src/content/presentation.ts` exports the small shared `resolveAlbumPhotos`. Home and gallery use it, preserving the existing gallery behaviour and eligibility predicates (permission, safe path, positive integer dimensions, meaningful FR/EN alt and credit). No page data, route registry, navigation/style, profile component, image renderer or dependency changed. No broad refactor or new client boundary. The React component review found no new hook/state/client-store requirement.

## Regression and rendered proof

`tests/fixtures/photo-selection.ts` contains obvious synthetic chart records only. Twelve new bilingual tests in `tests/content.test.tsx` cover empty-first, rejected/missing-first, reversed four-photo manifest/album order, rejected records before the three-photo limit, nowhere-usable empty state and unchanged complete gallery ordering. Assertions use explicit photo identities/order, translated empty text and the real gallery link, not just image counts. The new assertions failed eight times before the source fix; all 19 content tests pass afterwards. [Observed red-test summary](evidence/phase-2-resolution-20261019T014821Z/red-tests.json).

| Actual check | Result / new evidence |
| --- | --- |
| `npm.cmd run typecheck` | Exit 0; [log](evidence/phase-2-resolution-20261019T014821Z/commands/typecheck.json) |
| `npm.cmd run lint` | Exit 0; [log](evidence/phase-2-resolution-20261019T014821Z/commands/lint.json) |
| `npm.cmd test` | Exit 0; **27 pass, 0 fail/skip**; [log](evidence/phase-2-resolution-20261019T014821Z/commands/test.json) |
| `npm.cmd run build` | Exit 0, including final build after fixture removal; [log](evidence/phase-2-resolution-20261019T014821Z/commands/build.json) |
| `npx.cmd tsx scripts/verify-photo-preview.tsx` | Exit 0; **20 homepage states + gallery journeys**, FR/EN x five scenarios x 1440x900/390x844; **20 axe scans, no violations/incompletes**, no overflow or new console/uncaught errors; [command](evidence/phase-2-resolution-20261019T014821Z/commands/photo-preview.json), [manifest/results](evidence/phase-2-resolution-20261019T014821Z/browser/results.json) |
| Affected real home/photos routes | Four 200 responses with noindex and no production fixture data; exact current-source/copy hashes match; [results](evidence/phase-2-resolution-20261019T014821Z/targeted-http-and-source.json) |
| Documentation/preservation/whitespace | [Results](evidence/phase-2-resolution-20261019T014821Z/preservation.json); no historical evidence overwritten |

The browser fixture uses the actual `HomePage` and `PhotoGallery`, actual compiled CSS and real Next optimiser output on a separate ephemeral localhost server. The photo link is activated by keyboard, with visible focus and the correct gallery destination/order. All usable cases show `[d,c,b]`, retain leading `d`, omit the photo-empty message, and reach the full `[d,c,b,a]` gallery. No-usable cases show the correct empty state and no photos. The isolated chart inputs are prominently labelled TEST DATA and never imported into application content or registered as Next routes.

Twenty fresh screenshots have exact URLs/viewports/scenarios in the manifest. Visually inspected [French desktop later-album preview](evidence/phase-2-resolution-20261019T014821Z/browser/fr-1440-case-0.png), [English mobile filtered/order preview](evidence/phase-2-resolution-20261019T014821Z/browser/en-390-case-3.png) and [French mobile no-usable state](evidence/phase-2-resolution-20261019T014821Z/browser/fr-390-case-4.png). The labelled captions show `d`, `c`, `b`; wrapping, aspect ratios and empty-state placement are readable. This is developer verification, not client visual/content approval or full WCAG certification.

Initial lint failed on 53 undefined-global errors in historical audit `.mjs` artifacts under ignored `docs/evidence/`. [Failure retained](evidence/phase-2-resolution-20261019T014821Z/commands/lint-before-evidence-exclusion.json). The lint configuration now excludes evidence artifacts; source, tests and maintained scripts are still checked. The audit/evidence files themselves were not edited. No installation or security change was needed.

## Reproduction, preservation and limitations

With existing dependencies, prepare the existing landscape chart **only in an isolated source copy** at `public/media/verification-landscape.png`, build and start on localhost (3112 used here). Set `TEST_BASE_URL` to that local origin and `PHOTO_PREVIEW_EVIDENCE_DIR` to a fresh evidence directory; run `npx.cmd tsx scripts/verify-photo-preview.tsx`. Stop the server, remove only that temporary public chart, and rebuild. The maintained verifier closes its separate fixture server and browser. This run also confirmed the removed chart URL returns 404 and deleted the whole temporary dependency/build/cache workspace. [Setup](evidence/phase-2-resolution-20261019T014821Z/setup.json), [cleanup](evidence/phase-2-resolution-20261019T014821Z/cleanup.json).

The required commands ran against a source-matched isolated copy using existing installed dependency hardlinks, preserving old command outputs and the pre-existing 3100 preview/build. No claim is made that 3100 was rebuilt with this fix. Unchanged route/language/menu/reference guarantees reuse the independent audit; a full external/reference or unrelated browser suite was not repeated. The [pre-resolution report](evidence/phase-2-resolution-20261019T014821Z/phase-2-report-before-resolution.md) is retained before updating the current report. New evidence is local/ignored under the existing publication policy.

Changed files for this follow-up: `src/content/presentation.ts`, `src/components/content/home-page.tsx`, `src/components/media/photo-gallery.tsx`, `tests/content.test.tsx`, new `tests/fixtures/photo-selection.ts`, new `scripts/verify-photo-preview.tsx`, `eslint.config.mjs`, `docs/phase-2-report.md`, `docs/README.md` and this resolution record. [Baseline/final preservation](evidence/phase-2-resolution-20261019T014821Z/preservation.json) guards all other existing files, including the independent audit and original failing evidence. Branch/HEAD remain `main` / `e8582f3245540d2c32789da6a11db5937d44eb62`; all changes are unstaged/uncommitted.

All Phase 2 implementation criteria are reassessed in the [current report](phase-2-report.md) and pass within documented coverage. Real-client copy/translation approval, profile/media/brand permissions, final legal/privacy text and production ownership/configuration remain pending. Fixtures do not approve real photography or performance. Exact reference equivalence remains UNVERIFIED. **Phase 3 and publication remain unstarted.**
