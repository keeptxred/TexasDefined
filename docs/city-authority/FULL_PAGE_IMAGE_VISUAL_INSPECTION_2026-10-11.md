# Eleven-city full-page desktop visual inspection — October 11, 2026

**Scope and evidence:** Downloaded production browser [run #38112038659](https://github.com/keeptxred/TexasDefined/actions/runs/38112038659), [artifact #11692037648](https://github.com/keeptxred/TexasDefined/actions/runs/38112038659/artifacts/11692037648), exact deployed revision `8ec1831af195c6b8c7c5f4c25963d590aafaee20`. Retained eleven **1440px-wide by 11,155–14,311px-tall full-page PNG files** were extracted. Each was split into three tall consecutive visual sections and independently examined in grouped contact sheets (11 cities × 3 sections), including bottom/footer; 11 mobile and desktop viewport snapshots had been separately examined in the acceptance matrix.

## Observations

- Houston, Dallas, Fort Worth, Austin, San Antonio, El Paso, Arlington, Hurst, Corpus Christi, Plano and Lubbock: full-page sections consistently display the main guide architecture, title, local systems, jurisdiction, neighborhoods, visitor-planning, related places, practical confirmations, shopping/affiliate and footer blocks.
- In the examined full-page captures, **Houston, Fort Worth and Austin** show an apparently empty/blank hero-photo region while Dallas, San Antonio, El Paso, Arlington, Hurst, Corpus Christi, Plano and Lubbock have visible hero imagery.
- These images are configured as `loading="lazy"` and the original `fullPage:true` screenshot happened without deliberately scrolling the page to trigger lazy assets. The earlier quick image check reported `imageCount >0`, zero broken complete images and PASS, which **does not guarantee a lazy image loaded before full-page screenshot**. The discrepancy is therefore **evidence-generation failure suspected, actual page defect not yet reproduced**.
- No obvious shared clipped text, overlapping card columns, horizontal overflow or missing footer in the overall 11-city screenshot panoramas at the inspected contact-sheet scale. This is **limited manual visual evidence**. Narrow-screen menus, text-level legibility in all states, bottom-of-page image uniqueness and full WCAG/manual keyboard behavior need higher-resolution independent review. Do not mark full city visual acceptance PASS on this evidence alone.
- The existing runner itself requires screenshot scroll top; a full-page capture is not a proof that all below-fold lazy images have finished loading.

## Corrective regression change in this PR

In `scripts/ci/verify-city-authority-browser.mjs`, before the full-page **desktop** image: simulate viewport-height incremental scroll from top to bottom to trigger actual lazy image loading; briefly wait for complete imagery with bounded timeout; retain per-image source, alt, loading attribute, natural/rendered dimensions and precise **LOADED/FAILED/PENDING** outcomes in `results.json`, plus aggregate readiness and a `REVIEW` value if any remain incomplete. Return to scrollY=0, assert and record `fullPageScreenshotTop`, then take the full-page capture. All previous 33-viewport checks and their protected deployment gate are retained.

### Required independent retest

After a guarded merge and successful exact-SHA protected deploy, obtain new 11-city Chrome artifact and **visually inspect Houston, Fort Worth and Austin hero photographs at native resolution**, not just HTML `img.complete`. If source fetches fail (e.g. Commons 429), distinguish transient image host rate limit from site image duplication or broken media; then fix the actual production defect if independently reproduced. Explicitly do not advance any photo, population or GIS fact verification dates as a side effect of this screenshot methodology change.

**Final acceptance remains PARTIAL/UNVERIFIED as appropriate**, regardless of the automated success of this proposed method.

## Added mobile/tablet menu interaction regression (same existing 11-city runner)

At 390×844 and 768×1024, the updated runner now locates the real Header `button[aria-controls="mobile-main-menu"]`, checks a nonempty accessible name and minimum **44×44 CSS pixel** bounding box, opens the menu by click, asserts `aria-expanded=true` and visible `nav[aria-label="Main menu"]` with link content, then closes it and asserts `aria-expanded=false` and the menu is hidden. It retains `row.menuEvidence` for every city/viewport and fails the relevant automated case if the interaction is not actually functional. This closes a specific automated navigation gap; it does **not** certify comprehensive touch or screen-reader accessibility or all interaction states. Post-merge independent runtime PASS required.
