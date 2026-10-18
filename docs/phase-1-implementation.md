# Phase 1 implementation

Authority: [explicit Phase 1 request](phase-1-instructions.md), 18 October 2026. Exactly Phase 1 is active; full page/event/photo content remains Phase 2. The original source/requirements evidence and Phase 0 closure record are retained.

## Actual structure

| Location | Responsibility |
| --- | --- |
| `package.json`, `package-lock.json`, `.npmrc` | npm convention; exact dependency versions; dev/build/start/typecheck/lint/test/local HTTP scripts. |
| `next.config.ts` | `/ → /fr` permanent 308, no `X-Powered-By`. No experimental flags, custom domain, services or deployment linkage. |
| `src/proxy.ts`, `src/lib/not-found-document.ts` | Exact-path validation before prerender lookup. Invalid paths terminate with true 404 HTML: localized for known locale, clearly bilingual otherwise. No request path reflected into HTML, external calls, auth, cookies or profiling. |
| `src/app/[locale]/layout.tsx` | Validated locale, correct `<html lang>`, shared CSS, locale context for localized error output, development `noindex`. |
| `src/app/[locale]/[[...segments]]/page.tsx` | Allowlisted seven page IDs in each locale; 14 generated shells, no event detail or arbitrary nested routes. |
| `src/app/[locale]/not-found.tsx` | Defense-in-depth route-error UI using explicit locale context; normal invalid URL responses terminate in the tested Proxy guard. No fallback dictionary. |
| `src/app/robots.ts` | Disallow all crawling while the app consists of development shells. No invented production origin or sitemap URLs. |
| `src/i18n/` | Locale guards, stable route IDs, explicit translated segments, complete typed dictionaries and equivalent-route resolver. |
| `src/content/types.ts`, `site.ts` | Minimal Part A interfaces and explicit missing content slots; exact organisation name, no approved logo or public email. No sample people/events/photos. |
| `src/components/layout/` | Reusable shell/header/footer, document locale context, semantic landmarks and skip link. |
| `src/components/layout/route-focus.tsx` | Persistent client-side route change focuses destination main; initial page load retains normal skip-link entry. |
| `src/components/navigation/` | Accessible locale links/current-language indicator; primary navigation and non-modal mobile disclosure. |
| `src/components/content/page-shell.tsx` | Translated titles, clear missing-content state, simple home links/preview slots. No Phase 2 marketing/event/gallery implementation. |
| `src/styles/globals.css` | Tailwind import; semantic provisional colour/container tokens, system font, visible focus, reduced-motion override. |
| `tests/`, `scripts/verify-http.ts` | Routing/translation/component logic checks and local response/HTML verification. Browser results are tracked separately. |
| `scripts/browser-tooling.ts`, `verify-browser.ts` | Installed Chrome/bundled Chromium launcher with sandbox; localhost viewport/navigation/keyboard/focus/axe checks and screenshot manifest. |
| `scripts/inspect-reference-browser.ts`, `inspect-reference-followup.ts` | Rendered public shared-element evidence; access failures stop requests, follow-up resizes a single loaded document. No reference assets enter the app. |

## Route/content separation

The implemented mapping follows [the sitemap](sitemap.md): `/fr`/`/en`, mission, equipe/team, evenements/events, photos, mentions-legales/legal-notice and confidentialite/privacy. Page IDs are stable (`home`, `mission`, `team`, `events`, `photos`, `legal`, `privacy`). Unknown slugs, mixed-language slugs, unsupported locales and nested event routes are rejected rather than becoming home or an invented event. No contact/news/admin/member/donation routes.

`routeFor` constructs paths from IDs; `resolvePage` validates locale-specific segments; `equivalentRoute` resolves identity before changing locale. The visible switch receives that same stable ID. It does not replace substrings in the URL. Current-page links have `aria-current="page"`; the current language is explicitly marked. Only English/French are supported; no Accept-Language inference, cookies or profiling.

No translation fallback: both dictionaries must satisfy the complete `Dictionary` shape, runtime locale selection rejects unsupported values, and tests compare nonempty leaf keys. Factual content uses explicit `ContentSlot<T>` states (`missing`, `draft`, `approved`) and paired `Localized<T>` values. Missing content is never rendered as a translation copied from the other locale. Current factual slots are all `missing`; dictionaries are draft **interface copy**, not client-approved association prose.

Minimal interfaces cover organisation/mission, team profiles, own past events (dates as supplied labels, not invented precision), photo dimensions/caption/alt/credit/publication permission, and legal/privacy availability. No speculative project platform, uploads, membership schema or admin system. No factual records or media files are populated in this phase. Planned delivery formats/paths in [the inventory](content-and-assets.md) remain future integration contracts; current in-memory typed slots are in `site.ts`.

## Shared behaviour and boundaries

Text-only exact organisation name is temporary identity; no emblem, Rotary wheel, official logo or affiliation claim. Footer has legal/privacy links only; unavailable email/social/contact information is omitted. Public content is expressly in preparation and legal shells say their text is missing and not approved. Production compilation is a local test artifact; it is not permission to publish placeholders. All current shells block indexing; release must replace required content and deliberately review this policy later.

Mobile navigation is a **non-modal inline disclosure**, not a dialog or an accepted reference drawer match. Only five primary entries are present. Trigger reports its controlled region and expanded state; hidden region is excluded from focus and actual Tab order. Focus stays on the trigger on opening; Escape closes and restores trigger focus. Current-page selection returns trigger focus; a new page focuses destination main. Crossing to desktop closes and transfers actual mobile focus to the equivalent desktop link, remembering it across Chromium's early CSS blur. Focus/pointer interaction outside the menu clears that memory so background focus is preserved. There is no modal overlay, focus trap or inaccurate `aria-modal` claim. Locale/page-key remount clears menu state. These behaviours now pass in real Chrome at all target widths; source-only reference drawer behaviour remains unaccepted.

## Provisional design / reference dependencies

| Item | Evidence used / choice | Affected files / pending evidence |
| --- | --- | --- |
| Colours | Reference source #0067c8, #17458f, #f7a81b, #54565a; blue/yellow owner direction. No brand licence inferred. | `globals.css`, header/nav/footer; supplied approved charter and rendered colours/contrast review. |
| Widths | 1320px centered container and 16px edges measured on rendered reference desktop; local final x=60, inner x=76 match at 1440px. 880px readable width remains source-informed. | `globals.css`, `site-shell`, `page-shell`; final content geometry/healthy typography still pending. |
| Header/nav | Rendered desktop supports 140px white identity row + 60px full-width gradient navigation, now matched locally. Text identity/native language links substitute for unavailable approved logo. | Header/navigation/language components; no unsupported submenus; type/logo detail remains provisional. |
| Mobile | White closed header observed; inline nonmodal disclosure and 64rem breakpoint remain engineering choices. Local header is taller for readable text/language links; reference drawer failed to open at three widths. | `site-navigation`; actual reference open state/focus/background evidence still needed for B-01. |
| Type/spacing | Local Arial, 20px desktop/18px mobile nav, 14px footer, 36/30px shell h1. Bounded review corrected desktop nav to the reliable measured 20px/24px size; healthy face metrics remain missing. No font/asset rights inferred. | [Fidelity checklist](phase-1-fidelity-checklist.md); healthy type specimen/open menu still needed. |
| Footer/internal layout | Rendered desktop supports 132px blue upper band + white lower row, now adapted with legal/privacy only and text identity. Local total 205px vs reference about 248px with different content. | Footer/page shell; excluded contact/social/copyright/affiliation content omitted. |

No claim of exact visual or interaction fidelity. [Owner D-024](phase-1-acceptance-change.md) accepts the tested typography and accessible mobile navigation as provisional choices and removes their exact reference equivalence from Phase 1 closure requirements. Those reference differences remain UNVERIFIED; the capture request is inactive for closure. Local checks pass separately and Phase 1 is complete under the amended criteria; Phase 2 awaits instruction.

## Tooling / technical references

Node 24.x (24.16.0 verified; jsdom requires at least 24.15.0 in this line) and npm selected because no prior package-manager convention existed. Dependencies are pinned in `package-lock.json`; tests use the Node runner via `tsx`, jsdom and Testing Library. Playwright 1.64.1 and axe 4.14.0 were subsequently added as dev-only verification tools under D-022; existing Chrome 155.0.8059.84 launched headless with sandbox enabled, no browser download/security change. TypeScript 5.9.3 remains compatible with the selected lint peer range.

Next.js documents locale segments, App Router params, explicit ESLint commands and permanent redirects. A local HTTP test exposed the prerender lookup serving `/FR` as the `/fr` shell; the exact-path Proxy guard now rejects it and other invalid paths before that lookup, with terminal localized/bilingual HTML 404 responses. No experimental global-not-found configuration remains. See [internationalization](https://nextjs.org/docs/app/guides/internationalization), [redirects](https://nextjs.org/docs/app/api-reference/config/next-config-js/redirects), [Next.js Proxy](https://nextjs.org/docs/app/api-reference/file-conventions/proxy) and [ESLint](https://nextjs.org/docs/app/api-reference/config/eslint). Guard allowlist must be extended deliberately when actual Phase 2 event/media routes are introduced.

Lint uses ESLint 10 with `@eslint/js`, compatible `typescript-eslint` and React Hooks recommended rules. The stock Next lint preset's incompatible peer/vulnerable glob chain was removed. The final dependency tree validates and audit reports zero vulnerabilities. This custom set does not include every stock Next/import/JSX-a11y rule; component boundaries were reviewed separately and 20 actual browser axe scans now have zero violations, with gradient contrast incompletes explicitly reviewed. No force-downgrade/unsafe audit override remains. Tailwind's [Next.js integration](https://tailwindcss.com/docs/installation/framework-guides/nextjs) supplies PostCSS/import configuration. No remote fonts/assets or production services are needed locally; an empty data favicon avoids a missing-brand-icon request.
