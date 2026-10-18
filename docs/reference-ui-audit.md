# Reference UI/UX audit

**Closure disposition, owner D-024:** [explicit acceptance amendment](phase-1-acceptance-change.md) accepts tested local typography/mobile navigation provisionally and removes exact reference typography/menu equivalence as Phase 1 closure requirements. They remain UNVERIFIED. The audit and failure evidence below remain historical observations, not newly passed checks. Phase 1 is complete under the amended basis; no further reference request or inferred interaction.

**Phase 1 update: shared desktop/closed-mobile elements are partially rendered and compared; healthy typography and working mobile drawer remain unverified.** Audit date: 18 October 2026. The source audit and Phase 0 no-browser fallback below are historical and preserved. Latest [browser evidence](evidence/phase-1-browser/README.md) supersedes the browser-availability limitation, not the original source facts. Local behaviour passes separately from incomplete reference fidelity.

## Phase 0 access limitation (historical)

`cua.createBrowserTab("iab", referenceURL, {visible:true})` returned **“Browser is not available: iab”**. `cua.getState()` returned `apps: []`, `browsers: []`. No usable browser surface was available for viewport changes, screenshots, computed dimensions, clicks or keyboard/focus checks. **No reference screenshots were captured.**

Closure recheck: `cua.getState()` again returned no apps/browsers. No Playwright/Chrome/Edge command was found on PATH; `playwright`, `@playwright/test` and `puppeteer` were not resolvable from the workspace; checked standard automation caches were absent. [Recheck evidence](evidence/reference-browser-availability.json) defines those search bounds; this does not assert that no browser binary exists anywhere on the computer. Existing site/PDF inspection was not repeated, and nothing was installed to bypass the gap.

The [evidence JSON](evidence/reference-source-observations.json) records URLs, collection timestamps, HTTP results, response hashes, landmarks, heading samples, navigation/buttons, image attributes and layout declarations. The [HTTP inspection script](evidence/inspect-reference-source.py) does not render or execute the site. No reference media was downloaded as application assets.

| ID | Source URL | Inspection | Viewport / screenshots |
| --- | --- | --- | --- |
| REF-01 | [Home](https://amicalerotaryfrancophonie.org/) | Live HTML/CSS, HTTP 200; web-reader text corroboration. | None; not rendered. |
| REF-02 | [About](https://amicalerotaryfrancophonie.org/a-propos/) | HTML, HTTP 200; text corroboration. | None; not rendered. |
| REF-03 | [Team](https://amicalerotaryfrancophonie.org/equipe/) | HTML, HTTP 200. | None; not rendered. |
| REF-04 | [Events archive](https://amicalerotaryfrancophonie.org/category/evenement/) | HTML, HTTP 200. | None; not rendered. |
| REF-05 | [News archive](https://amicalerotaryfrancophonie.org/category/actualite/) | HTML, HTTP 200. | None; not rendered. |
| REF-06 | [Event detail](https://amicalerotaryfrancophonie.org/evenement/symposium-pour-la-paix-2026/) | Live HTML, HTTP 200. Web reader returned a different registration-oriented version; do not combine these into one claimed live layout. | None; not rendered. |
| REF-07 | [Past-event article](https://amicalerotaryfrancophonie.org/evenement/journee-rotary-unesco-2024/) | HTML, HTTP 200; text corroboration. | None; not rendered. |

## Observations verified in source only

| ID | Source observation | Evidence / limitation |
| --- | --- | --- |
| OBS-01 | Linked logo; primary and secondary nav landmarks; language link; grouped submenu markup. | REF-01–07: `site-navigation`, `secondary-navigation`. Logo attributes 1433×217 and alternate 874×217 are intrinsic asset sizes, not displayed dimensions or placement. |
| OBS-02 | Nav groups organisation information/team, membership/contact, events, actions and news. | REF-01 `navigation_links`. Hover-related classes exist, but hover/click behaviour is untested. Do not import all reference features. |
| OBS-03 | Homepage source sequence: identity/intro; mission/network context; featured event; explanatory network/institution material and participation links; past-event feature; shared contact/footer material. | REF-01 headings/links and text reading. Visual section boundaries, fold, hero background and image alignment unverified. Reference counters/statistics must not be reused. |
| OBS-04 | Declared content width 1320px; narrow width 880px; wide width `calc(1320px + 230px)`; edge padding 1rem. | REF-01 inline declarations. Source tokens, not viewport measurements; nested rules/cascade may alter actual geometry. |
| OBS-05 | Declared palette: #0067c8, #17458f, #f7a81b, #54565a, #b9d9eb, #ffffff. | REF-01 declarations. These reference values are provisional comparison inputs, not independently verified RFFD brand assets/rights. |
| OBS-06 | Body declares Open Sans; headings inherit; primary nav declares Venturis Sans ADF with Georgia fallback; fluid font-size declarations exist. | REF-01 inline/CSS evidence. Font loading, licensing and computed sizes unverified. |
| OBS-07 | Centered container rules use edge padding; header/footer CSS includes grid layouts. Boxed-padding declarations include 1.6rem, 2rem and 1.5rem in differing contexts. | REF-01 stylesheet samples. Do not treat one contextual rule as universal measured spacing. |
| OBS-08 | About uses a page title and thematic sections; team groups entries by role. | REF-02/03 headings. Role hierarchy and biographies belong to the reference organisation and are not RFFD facts. |
| OBS-09 | Event/news archives have repeated entry headers/footers and linked headings. Event pages have thematic sections and related reading. | REF-04–07 source. Card columns, image crops, pagination behaviour and detail geometry unverified. |
| OBS-10 | Shared footer landmark/nav includes a legal destination; shared output has contact heading and form-submit markup. | REF-01–07. Footer visual arrangement and form behaviour untested. A reference form does not authorize an RFFD form. |
| OBS-11 | Mobile toggle targets `#mobile-drawer`; source declares `aria-expanded=false`, right-drawer class, open/close focus targets, separate mobile nav and nested toggles. | REF-01–07 button/nav attributes. Intended drawer behaviour only; open/close, Escape, focus management and nested interactions untested. |
| OBS-12 | CSS contains media conditions at 719/720px, 767/768px and 1024/1025px among others. Images carry dimensions/lazy-related classes. | REF-01 CSS/image attributes. Not observed breakpoint transitions or verified image-loading results. |

## Original broader rendered capture plan: B-01

| Proposed viewport | Pages/actions | Evidence still required |
| --- | --- | --- |
| 1440×900 desktop | Home, about, team, archive and one detail; top/middle/footer; submenus/language link. | URL/viewport-labelled captures; header/logo placement, actual container/text widths, gaps, typography, image proportions, footer. |
| 390×844 mobile | Same representative pages; menu open/close and nested navigation; language control; media reflow. | Closed/open menu captures; overflow/tap targets; keyboard/focus behaviour recorded separately. |
| 768×1024 tablet | Header transition, archive/media layouts. | Observed breakpoint behaviour and geometry. |

These are **planned viewports, not performed checks**. The owner's requested desktop/mobile capture set and interaction states are in [the capture request](reference-capture-request.md); tablet remains a later implementation verification target. Captures can resolve appearance; they cannot alone verify keyboard behaviour. B-01 remains an evidence dependency for final layout/menu/fidelity decisions, not an unresolved business-scope question or missing-content blocker. No claim of close visual fidelity or mobile interaction verification is justified yet.

Adapt only applicable patterns through [the mapping](part-a-scope.md). Use approved RFFD content; do not transfer reference text, photographs, logos, names, statistics, partners or institutional claims into the application.

## Phase 1 rendered follow-up: actual evidence and comparison

Installed Chrome 155.0.8059.84 under Playwright 1.64.1, headless with sandbox enabled, rendered the reference homepage at 1440x900 (HTTP 200). Five subsequent viewport/page requests returned HTTP 429; their captures are access failures, not reference UI. One later HTTP 200 navigation was reused at 1440x900, 768x1024, 390x844 and 320x844 without reloads. [Initial results](evidence/phase-1-browser/reference/results.json) and [single-load follow-up](evidence/phase-1-browser/reference/followup-results.json) preserve URLs, browser, viewport, geometry, failed requests and exact mobile timeouts. No reference content/assets were added to the application.

| Shared element | Rendered observation | Local comparison / disposition |
| --- | --- | --- |
| Desktop header/container | White 140px identity row, full-width 60px blue gradient nav, total header 200px; 1320px centered container x=60 and 16px inner inset at 1440px. | Corrected earlier compact white-nav treatment; local dimensions match. Temporary text identity/native language links differ intentionally from unavailable logo/flag assets. |
| Desktop navigation | White labels, computed anchor 20px/24px, Venturis Sans ADF/Georgia family declaration; reference has unrelated groups/submenus. | Only the five owner-approved areas. Bounded review corrected desktop nav to 20px; Arial face remains provisional. No reference wording/extra workflows copied. |
| Footer | Gradient blue upper row, white lower row; desktop upper height 132px, total about 248px. Mobile reference footer reflows to about 462px at 390px. | Upper 132px band and white lower row adapted. Local footer is 205px with only legal/privacy and text identity; no reference contact/social/copyright/affiliation claims. |
| Mobile closed header | White 140px row; right-side trigger visible at 768/390/320. At 320, trigger's measured right edge exceeds viewport despite document scrollWidth remaining 320. Broken logo is not a usable identity reference. | White local layout retains readable full name/native languages; taller rows (390: 207.5px, 320: 235px) and inline menu remain explicit provisional deviations. No copying clipping/broken-logo state. |
| Type/spacing | Initial computed body 18px/28.8px, nav 20px/24px, h1 43.2px/50.4px. Open Sans/Venturis requests failed; declarations do not establish healthy face metrics. | Desktop nav size now 20px/24px. Local Arial, 18px mobile nav, 14px footer, 36/30px shell h1 and spacing remain provisional. Healthy face/type specimen pending. |
| Mobile interaction | Clicking `#mobile-toggle` at 768/390/320 never exposed `#mobile-drawer`; each visibility wait timed out after 5000ms. Navigation JS and other resources failed (`net::ERR_ABORTED`); page errors include `wp is not defined` and Linkz.ai invalid-domain error. | Open drawer layout, Escape, focus return/trap/background and destination behaviour remain unverified. Locally verified nonmodal disclosure is not accepted as equivalent reference behaviour. |

**B-01 remains open for final typography and working mobile-menu fidelity; lack of a local browser is resolved.** Representative [desktop header](evidence/phase-1-browser/reference/home-1440x900-header.png), [desktop footer](evidence/phase-1-browser/reference/home-1440x900-footer.png), [390px closed view](evidence/phase-1-browser/reference/followup-home-390x844-top.png), and [local comparison evidence](evidence/phase-1-browser/local/results.json). Healthy reference typography/header/footer and open-menu captures/action notes are the narrowed Phase 1 request. Broader team/event/page content comparison belongs to its later authorized phase, not this shared-interface follow-up.

Bounded review: [fidelity checklist](phase-1-fidelity-checklist.md) separates loading failures from implementation differences. The 47 `net::ERR_ABORTED` entries have no timing/initiators/resource status evidence; do not treat them as proof of a particular root cause or universal reference failure. No further automated reference requests were made. The current [minimum request](reference-capture-request.md) supersedes the broader request above: two missing specimens only, no duplicate closed/footer captures. Exact fidelity remains unaccepted.
