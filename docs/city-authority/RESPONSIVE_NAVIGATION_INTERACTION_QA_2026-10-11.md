# Eleven-city manual-accessibility gap — mobile/tablet navigation interaction evidence (October 11, 2026)

The earlier 33/33 axe audit observed zero automated rule violations, but **did not exercise the responsive navigation menu**. A visible trigger plus a successful Tab event is insufficient proof that the menu responds to touch/click, has a meaningful name, exposes expansion state or that a reader can access its links.

## Added free production diagnostic (not a manual screen-reader audit)

File: `scripts/ci/audit-city-authority-a11y-links.mjs`; automatically executes on the same protected deployed SHA as the existing axe and comprehensive link checks.

For all **11 city pages × mobile 390×844 and tablet 768×1024**, assert:

- A visible `button[aria-controls="mobile-main-menu"]` exists, has a nonblank accessible label, `aria-expanded=false` initially, and a minimum 24×24 CSS-pixel trigger rectangle (WCAG 2.2 minimum target; aiming for the site's existing 44×44 design).
- A real browser pointer click changes the button to `aria-expanded=true`, makes the labeled `nav[aria-label="Main menu"]` visible and exposes at least five navigable links.
- Capture a separately inspectable `{city}-{viewport}-menu-open.png` image for visual review rather than claiming an invisible DOM-only check.
- A second actual click collapses the menu, restores `aria-expanded=false` and hides it.
- Desktop 1440×900 instead requires visible `nav[aria-label="Main navigation"]` with at least five links.
- Record actual failure details in each viewport row of the existing `independent-review.json`, and fail the diagnostic workflow when a navigation probe is actually broken.

The target selector is grounded in `src/components/layout/Header.tsx` and the feature's existing `lg` breakpoint, not guessed.

## Remaining manual scope

This materially extends reproducible interactivity evidence but **is not equivalent to a manual WCAG conformance audit**. Independent keyboard logical order, visible focus style for each state, zoom at 200/400%, screen-reader announcements, tactile hit area on all controls, actual responsive tablet screenshots and semantic alt appropriateness remain PARTIAL until reviewed. Never set 11/11 FULLY CERTIFIED solely from a successful menu test.
