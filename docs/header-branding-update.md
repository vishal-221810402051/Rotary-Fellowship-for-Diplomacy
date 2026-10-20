# Focused header branding update

**D-028 / S-19, 20 October 2026. COMPLETE within the focused implementation/verification scope.** Owner instruction authorizes header branding only after Phase 2 checkpoint `18992c062022e1caa0ed94c7e273655b4389bd12`. No Phase 3, staging, commit, push or deployment. D-024 remains unchanged; exact external-reference equivalence remains UNVERIFIED.

## Supplied input and design

- Owner-provided `src/components/media/logo.jpeg` was inspected directly: **774x542 JPEG, bridge symbol only**, no embedded wordmark or EXIF. Original SHA-256: `27ab24df62c1b5c7181ac43c6e466f268e1924efcd11df63d3f2d55719c41026`; bytes preserved. The owner explicitly authorizes header use. This is not independent verification of trademark/brand rights.
- No separate visual-reference attachment was available in this message. The supplied JPEG and explicit written arrangement determine this update; no unseen reference typography is claimed verified.
- Exact visible HTML lines, left aligned in both locales: **Rotary Fellowship** / **for Diplomacy**. Arial/Helvetica/sans-serif, weight 700, using the existing system stack. Text colour **`#3b5063`**, the dominant sampled dark interior RGB `(59,80,99)` of the supplied bridge (15,072 sampled pixels). No font dependency added.
- Original symbol is statically imported with Next Image, empty decorative alt and a single link name **Rotary Fellowship for Diplomacy**. Link targets the current locale's homepage. Visible text is present once; the link's canonical accessible label includes the separating space between lines.
- The JPEG's large blank margins are handled by a reserved CSS window: original source region x=40..750, y=176..366. Measured complete dark bridge bounds x=55..736, y=193..345 fit inside it. Only excess blank margin falls outside; no original asset editing, recolouring, stretching or loss of meaningful bridge content. The original warm background is retained. Static dimensions, explicit source aspect ratio and `contain` fitting reserve geometry independently of image loading.
- Desktop keeps the existing 1320px container and padding. Title sizes are 32px desktop, 28px from 640px, 20px below 640px. Symbol windows are respectively 144/120/88px wide, centred vertically beside the two-line title. At narrow widths language controls occupy a separate row; existing menu structure/behaviour is retained.

## Actual checks

Checks used a source-matched isolated production copy with existing installed dependencies, installed headless Chrome **155.0.8059.85**, sandbox enabled, localhost port 3113. No dependencies installed, system security modified or existing preview rebuilt. [Exact source identity](evidence/header-branding-20261020/source-identity.json) confirms 42 relevant inputs match; original JPEG and unrelated local generated declaration are unchanged.

| Check | Result / local evidence |
| --- | --- |
| `npm.cmd run typecheck` | PASS, exit 0; [output](evidence/header-branding-20261020/typecheck.json) |
| `npm.cmd run lint` | PASS, exit 0, zero warnings; [output](evidence/header-branding-20261020/lint.json) |
| Targeted navigation/routing tests | PASS, **8/8**, 0 skipped; [output](evidence/header-branding-20261020/navigation.json). Unrelated content tests were not repeated. |
| `npm.cmd run build` | PASS, exit 0; same 14 localized routes, no fixture routes or temporary public files; [output](evidence/header-branding-20261020/build.json) |
| `node node_modules/tsx/dist/cli.mjs scripts/verify-header-branding.ts` | PASS, **8 bilingual viewport states**; [command](evidence/header-branding-20261020/browser-command.json), [results/geometry/network/scan manifest](evidence/header-branding-20261020/browser/results.json) |
| Whitespace, links, baseline preservation and cleanup | PASS; [final review](evidence/header-branding-20261020/final-review.json) |

Each viewport checks both locales on mission, keyboard-activates the branding home link, switches home languages in both directions, keyboard-navigates back to mission, then switches to the equivalent other-language mission. The branding destination/name stays correct. Mobile/tablet additionally verify menu opening, Escape/trigger focus and closing after navigation. Existing eight tests cover nonmodal background focus, desktop-breakpoint handling, current state, locale and route behaviour.

All eight states verify exact two-line text, one accessible name, no duplicate header wordmark, left alignment, bold sampled colour, full bridge bounds, original source ratio, container position, readable reserved geometry, no horizontal overflow or language/menu overlap, and a visible 3px focus outline. Eight image requests return **200**, with successful decoding and no browser console errors/uncaught exceptions. No broken image request is recorded.

Eight header-scoped WCAG A/AA axe scans report **zero violations**. Two desktop scans each have a `color-contrast` incomplete rule for existing white-on-gradient navigation: all **eight nodes** are reviewed against actual computed colours; the conservative sRGB contrast bound is **5.511:1**, exceeding 4.5:1. Incompletes and the review are retained in the manifest, not silently turned into scanner passes. Other six scans have no incompletes. This is focused developer verification, not full WCAG certification or client visual approval.

## Captures and visual review

These are **local-only, ignored** header PNG captures, not newly published GitHub evidence. Exact URLs/viewports/state are in the manifest. Normal captures show mission with menu closed; two additional captures show actual keyboard focus. Directly inspected desktop, tablet, mobile/narrow and focus captures: complete bridge, readable identical spelling, two-line left-aligned title, balanced symbol/text, correct colour and unobstructed controls observed.

| Locale / URL on the temporary localhost preview | Viewport | Capture |
| --- | --- | --- |
| `http://127.0.0.1:3113/fr/mission` | 1440x900 | [French desktop](evidence/header-branding-20261020/browser/fr-1440.png), [keyboard focus](evidence/header-branding-20261020/browser/fr-1440-focus.png) |
| `http://127.0.0.1:3113/en/mission` | 1440x900 | [English desktop](evidence/header-branding-20261020/browser/en-1440.png) |
| `http://127.0.0.1:3113/fr/mission` | 768x1024 | [French tablet](evidence/header-branding-20261020/browser/fr-768.png) |
| `http://127.0.0.1:3113/en/mission` | 768x1024 | [English tablet](evidence/header-branding-20261020/browser/en-768.png) |
| `http://127.0.0.1:3113/fr/mission` | 390x844 | [French mobile](evidence/header-branding-20261020/browser/fr-390.png) |
| `http://127.0.0.1:3113/en/mission` | 390x844 | [English mobile](evidence/header-branding-20261020/browser/en-390.png) |
| `http://127.0.0.1:3113/fr/mission` | 320x844 | [French narrow](evidence/header-branding-20261020/browser/fr-320.png) |
| `http://127.0.0.1:3113/en/mission` | 320x844 | [English narrow](evidence/header-branding-20261020/browser/en-320.png), [keyboard focus](evidence/header-branding-20261020/browser/en-320-focus.png) |

## Corrections and preserved boundaries

The new verifier's initial nested helper failed browser serialization (`__name is not defined`) before visual assertions; [failed attempt](evidence/header-branding-20261020/attempt1-command.json) is preserved. A subsequent ratio assertion exposed automatic sizing using rounded optimiser dimensions; explicit original ratio/contain fitting corrected it ([failure](evidence/header-branding-20261020/attempt2-command.json), [measured diagnostic](evidence/header-branding-20261020/aspect-ratio-diagnostic.json)). The next scan found a label-content mismatch because adjacent JSX spans lacked a literal separator; visible text was made accessible and an explicit space inserted without changing the two-line layout ([failure](evidence/header-branding-20261020/attempt3-command.json)). Final checks pass on the corrected source; no criterion was weakened. Affected type/lint/build checks were refreshed after application changes.

Application changes are confined to `site-header.tsx` and header identity CSS. The maintained Phase 2 browser assertion now normalizes visible whitespace so the required two-line name retains its original identity check. New `scripts/verify-header-branding.ts` provides focused reproducible coverage. [Asset inventory](content-and-assets.md), authorization/source registers and documentation index record the input/change. Footer, headings, content, navigation implementation, locale routes, permission helpers, tests, lockfile and historical reports/audit/evidence are preserved. No temporary fixture files/routes entered the application. Temporary server/workspace are removed after evidence collection.

All changes remain **unstaged/uncommitted** on `main` at the Phase 2 checkpoint. The supplied JPEG remains untracked and in use; the unrelated generated `next-env.d.ts` modification is preserved. Approved editorial content, real-media/profile/brand permissions, final legal/privacy text and production readiness remain separate pending publication dependencies. Phase 3 has not started.
