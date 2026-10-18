# Phase 1 report — 18 October 2026

## 1. Status and resulting behaviour

**INCOMPLETE against the retained Phase 1 acceptance criteria.** The authorized foundation/shared-interface code and available local automated checks are implemented and passing. Real-browser viewport/keyboard/accessibility checks and matched reference comparison are still unperformed; they have not been weakened or counted as passed. **Phase 2 has not started.**

The Next.js application provides 14 FR/EN development shells: five primary areas plus legal/privacy in each locale. `/` returns a permanent **308** to `/fr`. Stable page IDs drive translated routes and equivalent-page language targets. Supported locales have correct document language; invalid/wrong-language/nested/excluded routes return actual **404**, including uppercase `/FR`, which otherwise reached a case-folded prerender. Known-locale errors are localized; unsupported/unlocalized errors are clearly bilingual. No invented event routes or automatic home/wrong-language fallback.

Header, primary nav/current page, language control, mobile disclosure, semantic main/skip link and footer are shared. Identity is the organisation's exact name in text; no official logo or affiliation has been invented. Footer omits unavailable email/social/contact actions. Shells label content as in preparation; legal/privacy explicitly state approved text is missing. All shells are `noindex` and development robots disallow crawling. No full Phase 2 page copy, team entries, event details, photographs, albums or legal policies have been fabricated/populated.

## 2. Main files and routine engineering choices

See [actual implementation](phase-1-implementation.md) and [root run instructions](../README.md). Main paths: `src/app/[locale]/`, `src/proxy.ts`, `src/lib/not-found-document.ts`, `src/i18n/`, `src/content/`, `src/components/{layout,navigation,content}/`, `src/styles/globals.css`, `tests/`, `scripts/verify-http.ts`, and root Next/PostCSS/TypeScript/ESLint/npm configuration.

No prior package-manager convention existed; **npm + package-lock.json** chosen, exact versions pinned. Verified toolchain: Node **24.16.0**, npm **11.13.0**, Next **16.4.2**, React/React DOM **19.3.1**, TypeScript **5.9.3**, Tailwind **4.3.3**, ESLint **10.13.0**. Runtime is the 24.x line; local test dependencies require 24.15.0 or later in that line. No external fonts, logo assets or service credentials are needed.

The mobile menu is a simple **non-modal disclosure**, not an assumed reference drawer. It has a named trigger/control relationship, explicit hidden/expanded state, Escape/focus return, close on selection, and desktop-transition focus handling. No background focus trap/inert state is appropriate because there is no modal overlay. No unsupported submenus or animation were added. Code review covered server/client boundaries, serialized props, stable IDs, dictionary completeness, effect cleanup and focus logic; DOM tests are separate from real-browser acceptance.

The final compatible lint set is ESLint + TypeScript + React Hooks recommended rules. The default Next lint preset's vulnerable glob/peer chain was removed; no forced dependency override/downgrade remains. Final `npm ls` and audit are clean. This custom lint set is not claimed to include every Next/JSX accessibility rule; real browser accessibility scanning remains pending. The initial uppercase-locale regression is fixed by the exact-path terminal 404 guard; no experimental framework flag is retained.

## 3. Commands and actual results

| Command | Actual result |
| --- | --- |
| `npm.cmd install ...` | Completed; minimal runtime/framework/styles and verification tooling installed; manifest/lockfile retained. |
| `npm.cmd run typecheck` | **PASS**, exit 0: `next typegen && tsc --noEmit`; strict/noUncheckedIndexedAccess/exactOptionalPropertyTypes enabled. |
| `npm.cmd run lint` | **PASS**, exit 0: `eslint . --max-warnings=0`, no warnings. |
| `npm.cmd test` | **PASS**, exit 0: **7/7** routing, translation and component-logic tests. |
| `npm.cmd run build` | **PASS**, exit 0: production compile, type checks and 14 generated locale shells; robots/error framework output included. |
| `npm.cmd ls --depth=0` | **PASS**, exit 0; compatible final dependency tree. |
| `npm.cmd audit --json` | **PASS**, exit 0; **0 vulnerabilities** reported, including development tree, at time of check. |
| `npm.cmd run start -- --hostname 127.0.0.1 --port 3100` | Local production server started successfully. No external deployment. |
| `npm.cmd run check:http` | **PASS**, exit 0: **216 HTTP/HTML checks** over all 14 shells, root redirect, 11 invalid/excluded paths, localized documents/errors, alternate targets, current navigation, missing-content/collection boundaries, robots and served CSS. |
| `python scripts/check-docs.py` | **PASS**, exit 0: **8 checks**, **137 local links**, **86 original Data A rows** preserved; no original source evidence changed or previous documents deleted. |

Evidence: [command outputs and limits](evidence/phase-1-checks.json), [HTTP results](evidence/phase-1-http.json), [documentation checks](evidence/phase-1-docs.json), [pre-edit baseline](evidence/phase-1-baseline.json). Original source evidence and **86 Data A rows** remain preserved; Phase 0 planning/source work was not recreated or re-extracted. Earlier command failures were corrected before the final runs above: PostCSS export lint warning, jsdom's absent `self`, lint peer/advisory chain and invalid-locale prerender behaviour. Final results are not claims about the earlier failed runs.

## 4. Browser checks performed versus pending

The connected browser inventory returned **no apps/browsers**. **No browser-rendered screenshots, console inspection, actual pointer/Tab/Enter/Space behaviour, layout measurements or browser accessibility scan were performed.** No browser was installed. jsdom checks menu state and Escape/focus logic in an emulated DOM; HTTP checks validate response/HTML, not browser interaction.

Exact manual steps are in [Phase 1 verification](phase-1-verification.md): **1440×900 desktop**, **768×1024 tablet**, **390×844 mobile**; menu keyboard/pointer/resize behaviour, focus and skip link, all language switches/errors, console/network, overflow and accessibility scan. Capture URLs/viewports/results, then compare against [requested reference evidence](reference-capture-request.md).

| Retained Phase 1 gate | Assessment |
| --- | --- |
| Type/lint/build succeed; no selected out-of-scope providers | Met by available checks/code review. |
| Locale shells/default/unknown routes/equivalent targets and `html lang` | HTTP/helper-level checks pass; actual browser language-click journey still pending. |
| Responsive nav at three target viewports; no horizontal overflow; real keyboard/pointer/focus | **Unmet evidence:** implementation and DOM logic present, real-browser checks pending. |
| Semantic/skip/focus foundations and automated browser accessibility scan/manual keyboard | Foundations present; **scan/manual acceptance pending**. |
| Matched reference header/footer/container/type/menu comparison | **Unmet B-01:** only source observations/provisional choices; no matched rendered evidence. |
| No misleading facts/actions or release-visible approved-looking draft claims | Shells explicitly label missing content, omit unavailable actions and block indexing. Publication remains prohibited; draft shells are not a release. |

## 5. Reference fidelity and content/release dependencies

Reference source colours/declared 1320/880px widths and 1rem edges informed semantic tokens. Header rows, 64rem navigation breakpoint, simple non-modal mobile arrangement, spacing/system font and footer geometry are **provisional engineering choices**. Affected components/tokens and evidence needed are listed in [implementation assumptions](phase-1-implementation.md). No exact visual/interaction fidelity claim is made.

Missing logo/charter/rights, approved mission/home copy, team biographies/portraits, past-event facts, photographs/permissions, FR/EN translations/approval and final legal/privacy text remain [inventory dependencies](content-and-assets.md). No approved logo exists in the inspected workspace; temporary text identity is authorized. Missing email means omit action, not invent details. Final required content, rights, legal identity/text, actual production host/configuration, browser checks and visual/content acceptance gate publication.

## 6. Local run instructions

```powershell
npm.cmd ci
npm.cmd run dev -- --hostname 127.0.0.1
```

Open <http://127.0.0.1:3000/fr> or `/en`. Production build/serve and response verification:

```powershell
npm.cmd run build
npm.cmd run start -- --hostname 127.0.0.1 --port 3100
# In a second terminal:
npm.cmd run check:http
```

The checked local production preview is at <http://127.0.0.1:3100/fr> and <http://127.0.0.1:3100/en>. No environment variables/secrets are required. `TEST_BASE_URL` optionally changes the localhost port for HTTP verification. No Vercel project/domain/deployment has been configured.

## 7. Git status and Phase 2 readiness

Branch remains **master**, unborn; original untracked `AGENTS.md`/documentation preserved with authorized updates. New application/configuration, lockfile, tests/scripts and reports are untracked; `.gitignore` excludes node_modules, build/cache, credentials and deployment linkage. Nothing staged or committed. Origin configuration unchanged; no push, remote-history operation or deployment. Local Git state is captured by documentation evidence without a network remote query.

The foundation/content interfaces are prepared for later work, but **Phase 2 is not cleared**: real-browser/shared-interface and reference-fidelity gates remain unmet. No full page/event/gallery population has begun. Stop after this report and wait for the owner's instruction; do not treat a passing build as completion of those missing gates.
