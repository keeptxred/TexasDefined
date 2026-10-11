# Eleven-city production axe and link defects — October 10, 2026

**Status:** Defects reproduced from protected deployed SHA `8d433e8bb91b29a94de636dcb89362be2e987366`. **Fixes are proposed on this branch, not yet deployed or independently retested. Do not award WCAG certification.**

## Exact artifact

- [Deployment #38110971859](https://github.com/keeptxred/TexasDefined/actions/runs/38110971859) **SUCCESS**, attempt 1, SHA `8d433e8bb91b29a94de636dcb89362be2e987366`.
- [City a11y and links run #38110971993](https://github.com/keeptxred/TexasDefined/actions/runs/38110971993) **SUCCESS** (diagnostic execution only), [artifact #11691093802](https://github.com/keeptxred/TexasDefined/actions/runs/38110971993/artifacts/11691093802) containing `independent-review.json`.
- 11 city pages x mobile 390x844, tablet 768x1024, desktop 1440x900: **33/33 rendered HTTP 200**; `axe-core` detected **124 serious color contrast violation nodes** and 33 `aria-prohibited-attr` incomplete/manual-review nodes across 33 viewport cases.
- All eleven share the same footer navigation small `eyebrow text-primary` headings on surface #f2e7d7. Axe measured **4.18:1** at 11px bold where **4.5:1 minimum** is required. Some three-market CityPASS cards and the El Paso mobile Viator heading also appear at **4.43:1** on #f6eee2; the visual difference is small but axe flagged it correctly.
- `nav[aria-label="Explore Texas"] > h2`, `nav[aria-label="Texas Life"] > h2`, `nav[aria-label="Read & Use"] > h2` occur on all eleven pages. Source fix: `src/components/layout/Footer.tsx`.
- CityPASS callout `aside > .eyebrow`, guide-link and commercial-link text on Dallas, Houston, San Antonio: `src/components/monetization/CityPassCalloutContent.tsx`. A dynamical tours label in El Paso mobile: `public/city-experience-affiliate.js`.
- `src/components/content/EntityDepthSections.tsx` county badges had `aria-label` on a div without an implicit permissible naming role. **Manual-review / rule incomplete**, not misrepresented as a confirmed critical axe violation; corrected with `role="group"` for meaningful group labeling.

## Proposed accessibility repairs

The text-only terracotta accents cited above now use **#8c3e23** rather than #b1522a. On the measured surfaces, calculated contrast rises from ~4.18/4.43 to **6.08/6.45**, respectively. This preserves the publication palette without broadly changing `--primary` site-wide, and touches only the demonstrated failing areas. Must rerun actual live axe and inspect visual appearance after protected deployment; calculated contrast is not final runtime proof.

## Complete-link diagnostic

The runner inventoried **225 unique destinations** across all eleven pages, with **43 non-success/unconfirmed or redirect-review outcomes**. These included many Census/Wikimedia/Hurst/Viator 403s or 429s. These are **NOT proven broken site links**; no bulk replacement authorized by that evidence. No internal city destination returned an HTTP error in this run.

Four external links returned **404 twice independently**:

| City | Published destination | Evidence | Proposed disposition |
|---|---|---|---|
| Houston | `https://citypass.7eer.net/c/7236213/305542/3331` | 404 twice in protected Chrome API and 404 in independent web fetch | Pause tracked destination; send direct to https://www.citypass.com/houston |
| Dallas | `https://citypass.7eer.net/c/7236213/305537/3331` | 404 twice in protected Chrome API | Pause tracked destination; send direct to https://www.citypass.com/dallas |
| San Antonio | `https://citypass.7eer.net/c/7236213/305547/3331` | 404 twice in protected Chrome API | Pause tracked destination; send direct to https://www.citypass.com/san-antonio |
| El Paso | `https://www.elpasotexas.gov/planning-and-inspections/gis/` | 404 twice in protected Chrome API | Replace with official City of El Paso municipal GIS CityLimits FeatureServer URL |

El Paso: the replacement reference is `https://gis.elpasotexas.gov/accela/rest/services/311/CityLimits/FeatureServer/0`, an official GIS city-limits polygon source already recorded in the municipal research ledger; destination must be independently retested after deployment.

The official CityPASS market destination pages were independently retrieved as live with current market names and offer descriptions. Old affiliate URLs are preserved in the data registry (so approved affiliate identifiers are not lost), but the checkout CTA now defaults to working **non-affiliate** official pages with truthful no-commission disclosure. No affiliate tracking events or `rel=sponsored` attribute are assigned to these direct fallbacks. An actual validated and approved replacement tracking link must be obtained from the partner before restoring the affiliate flag; **this requires partner-account action, not a guessed identifier or bypass**.

## Further acceptance required

1. Protected PR checks must pass; merge only when checks permit.
2. Wait for exact-SHA protected production deployment and repeat 33 viewports axe-core diagnostic.
3. Confirm zero **previously reproduced** contrast rule violations; separately review all axe incomplete cases and manual keyboard/focus/menu/touch behavior. No automated tool provides full WCAG acceptance.
4. Recheck El Paso official GIS URL and three CityPASS direct targets; confirm human usefulness (do not rely on HTTP success alone), preserve canonical guide links.
5. Record final checks in `INDEPENDENT_ACCEPTANCE_MATRIX_2026-10-10.md` after independently retrieving evidence. GIS and exhaustive factual verification remain separate incomplete categories.
