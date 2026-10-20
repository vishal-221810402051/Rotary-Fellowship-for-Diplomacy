# Rotary Fellowship for Diplomacy

Phase 2 Part A: five responsive French/English pages, home previews, source-faithful draft mission/introduction, two supplied forum titles and reusable permission-aware team/album/image components. No team profiles/photos have been supplied, so those pages show honest empty states. Text awaits approval; legal/privacy text is still missing. There are no collection forms, accounts, payments, analytics or integrations.

Requirements: **Node.js 24.15.0 or later in the 24.x line** (24.16.0 used locally) and npm. npm and `package-lock.json` are the selected package-manager convention. Exact installed versions are recorded in the manifest/lockfile.

```powershell
npm.cmd ci
npm.cmd run dev -- --hostname 127.0.0.1
```

Open <http://127.0.0.1:3000/fr> or <http://127.0.0.1:3000/en>. `/` redirects to `/fr`. Language links preserve the corresponding page. Preview/missing content is labelled; all pages are `noindex` and `robots.txt` disallows crawling until an authorized release review.

```powershell
npm.cmd run typecheck
npm.cmd run lint
npm.cmd test
npm.cmd run build
npm.cmd run start -- --hostname 127.0.0.1 --port 3100
```

With the production server running, use a second terminal:

```powershell
npm.cmd run check:http
npm.cmd run check:browser
```

Both checks default to <http://127.0.0.1:3100>; `TEST_BASE_URL` can select another localhost port. `check:http` validates all route responses/HTML; `check:browser` now targets changed Phase 2 pages/integration at four viewport sizes using Playwright/axe and installed Chrome (fallback bundled Chromium), headless with sandbox enabled. No system settings changed. Evidence is saved under `docs/evidence/phase-2/` locally; Phase 1 evidence is preserved. See [media-fixture setup/cleanup and evidence guide](docs/phase-2-evidence.md) before `npm.cmd run check:media`. The old comprehensive Phase 1 script remains historical; it is not rerun for Phase 2 closure.

See [project documentation](docs/README.md) and [Phase 2 report](docs/phase-2-report.md). **Phase 2 implementation/verification complete; content approval and publication readiness pending.** Phase 1 remains closed under [D-024](docs/phase-1-acceptance-change.md); exact reference typography/menu equivalence stays UNVERIFIED. Phase 3 awaits explicit instruction. The owner has authorized the [Phase 2 source checkpoint](docs/phase-2-github-checkpoint.md) under D-027; Phase 3 and deployment remain unauthorized. Client content, logo/rights, translations and final legal text remain dependencies.

The Phase 1 GitHub checkpoint under D-025 remains `e8582f3245540d2c32789da6a11db5937d44eb62`. [Contents and omissions](docs/github-checkpoint.md) explain local-only questionnaires/raw evidence. Phase 2 raw evidence remains local-only under the existing ignore policy; the [reviewed summary](docs/evidence/public/phase-2-verification-summary.json) and [additional omissions](docs/evidence/public/phase-2-omissions.json) document the current checkpoint review. `python scripts/check-phase-2.py` validates the current working-tree documentation/preservation; `check-checkpoint.py` targets staged/tracked publication, and older validators retain historical assumptions. No staging, commit or remote change is needed for Phase 2 checks.
