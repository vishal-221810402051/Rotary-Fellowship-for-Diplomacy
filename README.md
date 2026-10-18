# Rotary Fellowship for Diplomacy

Phase 1 foundation: Next.js App Router, strict TypeScript, Tailwind CSS and developer-managed French/English content interfaces. The application currently contains **development shells**, not approved association content or publication-ready legal policies. There are no collection forms, accounts, payments, analytics or integrations.

Requirements: **Node.js 24.15.0 or later in the 24.x line** (24.16.0 used locally) and npm. npm and `package-lock.json` are the selected package-manager convention. Exact installed versions are recorded in the manifest/lockfile.

```powershell
npm.cmd ci
npm.cmd run dev -- --hostname 127.0.0.1
```

Open <http://127.0.0.1:3000/fr> or <http://127.0.0.1:3000/en>. `/` redirects to `/fr`. Language links preserve the corresponding page. Missing client content is explicitly labelled; all shells are `noindex` and `robots.txt` disallows crawling until an authorized release review.

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

Both checks default to <http://127.0.0.1:3100>; `TEST_BASE_URL` can select another localhost port. `check:http` validates responses/HTML; unit tests use a DOM emulator. `check:browser` uses Playwright and axe with installed Chrome (or bundled Chromium if Chrome is absent), headless with sandbox enabled. No system settings are changed. If neither binary exists, `npx.cmd playwright install chromium` installs the development verification browser. Browser evidence, screenshots and scan review are saved under `docs/evidence/phase-1-browser/local/`; `BROWSER_EVIDENCE_DIR` optionally selects a separate run folder.

See [project documentation](docs/README.md), [implementation](docs/phase-1-implementation.md), [verification](docs/phase-1-verification.md) and [closure report](docs/phase-1-report.md). **Phase 1 is complete under owner amendment D-024:** tested typography/accessible mobile navigation accepted provisionally; exact reference typography/menu equivalence remains UNVERIFIED and is no longer required for closure. [Explicit decision](docs/phase-1-acceptance-change.md). Phase 2 is ready for instruction, not started or authorized. Client content, logo/rights, translations and final legal text remain later dependencies. Do not deploy or advance phases without instruction.

The owner authorizes the Phase 1 GitHub checkpoint under D-025. [Publication contents and omissions](docs/github-checkpoint.md) explain why full questionnaires, raw logs and most historical captures stay local; some old source/evidence links are intentionally local-only. The published [verification summary](docs/evidence/public/verification-summary.json) and six reviewed screenshots preserve suitable review evidence. Run `python scripts/check-checkpoint.py` for staged/tracked checkpoint checks; older phase validators assume the private pre-commit workspace. No deployment or Phase 2 is authorized by this checkpoint.
