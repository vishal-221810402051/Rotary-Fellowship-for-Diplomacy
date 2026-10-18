# Phase 1 bounded fidelity checklist

18 October 2026. **Phase 1 complete under owner amendment D-024.** Current tested typography and accessible mobile navigation are accepted as provisional choices; exact reference typography/menu equivalence is no longer required for closure. Those reference differences remain **UNVERIFIED**, not passed checks, and exact fidelity is **not accepted**. [Explicit owner decision](phase-1-acceptance-change.md), [amended plan](phase-plan.md), [closure report](phase-1-report.md). No new reference requests or unchanged tests.

Preserved evidence: [reference failures](evidence/phase-1-browser/reference/followup-results.json), [desktop measurements](evidence/phase-1-browser/reference/results.json), [local full run](evidence/phase-1-browser/local/results.json), [targeted recheck](evidence/phase-1-fidelity-review/local-results.json).

| Classification | Shared element | Conclusion |
| --- | --- | --- |
| Verified match | Desktop geometry at 1440x900 | 140px white identity row + 60px full-width blue navigation band; total header 200px. Centered container 1320px, x=60, inner left x=76. Existing captures and measurements agree. |
| Verified match | Footer structure | Blue upper band above white lower row; desktop upper band 132px. This establishes structure/height, not exact gradient/pixel equality. |
| Verified match after correction | Desktop navigation text size | Reference rendered anchor measured **20px/24px**. Local desktop size corrected from 18px to **20px**, retaining 24px line height. Six focused local checks pass; mobile text remains 18px. Font family/glyph metrics are not matched. |
| Known difference | Identity/navigation content | Exact RFFD text identity and native FR/EN controls replace the reference logo/flag. Five approved primary links replace unrelated reference groups/submenus. These are scope/content adaptations, not missing reference features to copy. |
| Known difference | Footer content/size | Local 205px total vs reference about 248px on desktop. Only legal/privacy and text identity are present; no reference contact/social/copyright/affiliation claims. Footer link text is 14px; reference nav container computes 18px, without a reliable healthy-font specimen for its links. |
| Known difference / provisional | Mobile header | Local closed header is 207.5px at 390px and 235px at 320px vs reference 140px. Readable full-name/native-language arrangement is retained; no broken-logo blank space or clipped trigger is copied. |
| Owner-accepted provisional design | Type and spacing | Arial, 16px base token, 36/30px shell headings and 48px desktop link boxes retained under D-024. Reference computes an 18px body, 43.2px desktop h1 and 60px anchor box; healthy face metrics remain missing. Matched size/row dimensions do not prove matched typography. |
| Owner-accepted provisional design | Mobile pattern/breakpoint | Tested inline nonmodal disclosure and 64rem transition retained under D-024. No inferred drawer, trap, scroll lock, overlay or animation implemented. |
| UNVERIFIED reference difference; no closure requirement | Healthy typography | Font-face errors prevent verification of reference glyph metrics, weight/spacing and healthy type scale. D-024 removes this closure dependency; it is not a passed comparison. |
| UNVERIFIED reference difference; no closure requirement | Reference mobile menu | No open drawer captured at 768/390/320; automated clicks timed out. Actual geometry, Escape/focus/background behaviour remain unknown. D-024 accepts the local choice provisionally without verifying reference equivalence. |

## Failure review: separate from implementation differences

- **Document access:** initial home HTTP 200; five later requests HTTP 429. The 429 images are access pages, never comparison targets. One subsequent home HTTP 200 was resized to four widths.
- **Resource loading:** follow-up records 47 `net::ERR_ABORTED` requests, including fonts, scripts and styles. Open Sans, Venturis Sans ADF and Venturis Sans ADF No2 have font-face error states; one logo has no natural image width. A computed family name or `document.fonts.status=loaded` does not prove successful font-face loading.
- **Runtime/interaction:** `wp is not defined`, a Linkz.ai domain error and three 5000ms drawer visibility timeouts were recorded. The logs lack request timing/initiators and resource HTTP statuses. They do **not** prove which cancellation caused the menu failure, whether some cancellations occurred during teardown, or that the site fails for every visitor. Root cause remains unestablished.
- These reference-session failures are **not local RFFD defects or intended reference behaviour**. The reliable size mismatch above was corrected independently. Further retries have no evidence-backed remedy in this bounded review, so inspection stops here; no security bypass or request replay.

## Historical missing evidence - not requested for Phase 1 closure

D-024 withdraws these capture dependencies for closure. The earlier evidence description is retained for traceability only; **no captures are currently requested**. No manual capture/interaction notes were received and no manual reference-menu failure is asserted. Both historical specimens concern <https://amicalerotaryfrancophonie.org/>.

| ID | Viewport/state | Minimum new evidence |
| --- | --- | --- |
| T | **1440x900**, menu closed, fonts successfully loaded | **One viewport screenshot** containing header/navigation and the first heading/body text. Confirm actual loaded font faces and give computed family/size/weight/line-height for a nav link and body/heading; a text note is enough. This replaces the missing healthy type specimen, not the already-measured geometry. No new footer image. |
| M | **390x844**, menu opened successfully | **One viewport screenshot** showing menu panel, close control and language control if present. Brief action notes (or a short recording): open/close, Tab order, Escape and focus return, background focus/scroll/click handling, destination and language-link results. Describe only what happens. No new closed-menu screenshot. |

All unobserved reference states remain UNVERIFIED. The owner's explicit acceptance amendment permits closure on the tested provisional local choices; it does not convert missing evidence into verification. Missing RFFD branding/content remains a separate development/publication dependency. Phase 2 is ready for explicit instruction and has not started.
