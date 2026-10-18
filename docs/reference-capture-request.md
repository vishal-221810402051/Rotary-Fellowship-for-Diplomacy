# Reference captures requested

**Current status: no reference captures requested for Phase 1 closure.** [Owner amendment D-024](phase-1-acceptance-change.md) accepts the tested typography and accessible mobile navigation provisionally and removes exact reference typography/menu equivalence as closure requirements. They remain UNVERIFIED, not passed. Phase 1 is complete under that basis; Phase 2 awaits explicit instruction. The requests below are historical and inactive; do not repeat them without a new instruction.

## Historical minimum Phase 1 request (before D-024)

Saved reference shared elements were reviewed at four widths. Further automated reference retries have stopped; failure causes cannot be established from the saved cancellation/runtime logs. See the [concise fidelity checklist](phase-1-fidelity-checklist.md) for verified matches, differences, provisional choices and blockers. Existing evidence is preserved.

- **T: <https://amicalerotaryfrancophonie.org/>, 1440x900, menu closed with fonts successfully loaded:** one viewport screenshot containing header/navigation and first heading/body text. Confirm the actual loaded faces; provide computed family/size/weight/line-height for nav/body/heading as text if available. This is the missing healthy type specimen; no new footer image.
- **M: same URL, 390x844, menu successfully open:** one viewport screenshot showing panel, close control and language control if present. Brief notes or a short recording of open/close, Tab order, Escape/focus return, background focus/scroll/click handling, destination and language-link results. Include actual resulting URLs. No new closed-menu capture.

Use CSS-pixel viewports, zoom 100%, and record date/browser/version. Existing closed-menu/header/footer evidence at 1440x900, 768x1024, 390x844 and 320x844 is reused. No new closed states, footer, tablet/narrow duplicates, other pages or nested submenus are requested. The historical broader request below is not the current request. Open states at other widths remain unverified; requesting only the minimum now does not waive acceptance criteria.

Blocked decisions: final typography metrics and mobile panel/control/focus/background fidelity. Local nonmodal functionality is verified separately; reference equivalence and exact fidelity are not accepted. No broken behaviour, reference content/assets or extra navigation will be copied. Phase 2 remains unstarted.

## Preserved Phase 0 broader request (historical)

At Phase 0 closure, no usable connected browser or workspace automation installation was found within the recorded search bounds; [historical availability evidence](evidence/reference-browser-availability.json). No rendering/interactions had then been verified. The following broader capture plan is preserved for later page-template work; the current Phase 1 request above is narrower.

Please provide the following reference captures. Use **CSS-pixel viewport sizes**, browser zoom 100%, and label each file with URL, width×height, state and capture date. A full-page capture should retain the stated viewport width; do not shrink a desktop page to simulate mobile.

| Page | URL | Viewports / states |
| --- | --- | --- |
| Home | <https://amicalerotaryfrancophonie.org/> | **1440×900** and **390×844**; full-page/default menu closed, showing header, section order and footer. |
| Mission/internal layout | <https://amicalerotaryfrancophonie.org/a-propos/> | Same two viewports; full page, including text/image layout and footer. |
| Team | <https://amicalerotaryfrancophonie.org/equipe/> | Same two viewports; full page, including member layout and mobile reflow. |
| Event archive | <https://amicalerotaryfrancophonie.org/category/evenement/> | Same two viewports; full page, including entry proportions and any pagination. |
| Event detail | <https://amicalerotaryfrancophonie.org/evenement/journee-rotary-unesco-2024/> | Same two viewports; full page, including heading, body/media and related entries. |

Additional **homepage** states: desktop **1440×900 with an institutional submenu expanded**; mobile **390×844 with menu open**, then **a nested submenu expanded**. A short screen recording or brief action/result notes for opening/closing the menu, selecting a destination and using the language switch will distinguish behaviour from appearance. Record the destination URL after navigation/language switching. Screenshot-only evidence cannot establish Escape/focus return or keyboard accessibility; those stay explicitly unverified until exercised.

## Implementation decisions still dependent on this evidence

- Actual header/logo/nav placement and displayed sizes; desktop submenu geometry and responsive transition.
- Mobile drawer/menu geometry, nested navigation, opening/closing behaviour and language-control placement.
- Actual container widths, column ratios, section spacing, rendered type sizes/weights and image crops/proportions.
- Footer layout, archive/detail/member layouts and their mobile reflow.
- Final reference-fidelity acceptance. Source CSS tokens remain provisional; keyboard/focus and live navigation require interaction evidence, not assumptions.

The owner-approved stack, five-area route structure, locale policy, file-based content model and no-collection boundary are settled independently. This request satisfies the owner's Phase 0 no-browser fallback; it does not verify the missing reference appearance or authorize a generic redesign. Content delivery is tracked separately in [the inventory](content-and-assets.md).
