# Eleven-city production artifact reinspection — 2026-10-13 (Chicago)

**Classification: historical automated evidence; NO final per-city editorial certification.**
Review executed using the original retained JSON/screenshot ZIP artifacts, **not** by trusting a workflow green state alone.

## 1. Exact prior deployment and browser screenshots

- [Protected production deploy run #38112038581](https://github.com/keeptxred/TexasDefined/actions/runs/38112038581): success, SHA `8ec1831af195c6b8c7c5f4c25963d590aafaee20` (2026-10-11).
- [Real Chrome viewport verification #38112038659](https://github.com/keeptxred/TexasDefined/actions/runs/38112038659): success, same SHA, [original archived ZIP artifact #11692037648](https://github.com/keeptxred/TexasDefined/actions/runs/38112038659/artifacts/11692037648).
- Downloaded ZIP and parsed `results.json`: **33/33 viewport cases** (11 city routes × 390 × 844, 768 × 1024, and 1440 × 900) had no automated check failures. Inspectable screenshots include all 33 above-the-fold viewports and 11 additional full-page desktop captures.
- Opened three contact sheets of all 33 actual viewport images and one overview contact sheet of the 11 full-page desktop captures. At this overview scale, no obvious systematic hero/title overlap or catastrophic horizontal clipping was visible. This is a **high-level visual scan only**: downscaled full-page previews are not a substitute for detailed text/contrast/individual-gallery inspection, mobile interactions, 320px reflow, or screen-reader/keyboard manual evaluation. It does **not** prove current-main production equivalence.

## 2. Automated axe and exhaustive HTML link-target retrieval (historical)

- [Run #38112038646](https://github.com/keeptxred/TexasDefined/actions/runs/38112038646) **success** on identical Oct 11 production SHA; downloaded [actual `independent-review.json` artifact #11691837851](https://github.com/keeptxred/TexasDefined/actions/runs/38112038646/artifacts/11691837851).
- Exactly **33 automated axe viewport cases**, **zero reported rule violations**, **zero reported manual-review incomplete nodes** in the retained machine JSON. These are **automated rule results only**, not a claim of manual WCAG 2.2 AA conformity.
- Exactly **222 distinct rendered destination links** inventoried across 11 city main-content areas. **185** categorized `HTTP_SUCCESS`; **29** classified `ACCESS_OR_RATE_LIMIT_UNCONFIRMED`; **8** classified `REDIRECT_CHECK_CONTEXT`. No automatic blanket claim of 222/222 good, or of 37 broken links. Unconfirmed URLs need browser/operator or canonical follow-up; redirect contexts need destination-intent review.

## 3. SEO and markup verification (historical)

- [SEO run #38139303220](https://github.com/keeptxred/TexasDefined/actions/runs/38139303220), SHA `8a213e2919c83c14b25ed4d6bdd3636b1ac8b365`; downloaded [machine JSON artifact #11702254597](https://github.com/keeptxred/TexasDefined/actions/runs/38139303220/artifacts/11702254597).
- JSON summary: `visited=11`, `routeHttp200=11`, `validCityGraphs=11`, `validBreadcrumbGraphs=11`, `sitemapListed=11`, `needsReview=[]`. The primary sitemap responded 200 and listed 3,118 `<loc>` URLs at that historical snapshot. All eleven /city/ URLs had one H1, indexable robots metadata, canonical and a valid `City` plus `BreadcrumbList` schema according to that auditor's checks.
- **Not** equivalent to Google Search Console indexed status, rich-result eligibility, full live structured-data examination at the current production SHA or content quality certification.

## 4. Subsequent live source-monitoring completion

The new [Supabase city enrollment ledger](SUPABASE_CITY_FACT_SOURCE_ENROLLMENT_2026-10-13.md) documents actual registration of 69 official/source URLs across all 11 cities and the first existing-worker HTTP probe results: 49 2xx, 20 403/429 access restricted. **HTTP fingerprints are not factual checks.**

[Follow-up source-cadence migration PR #4802](https://github.com/keeptxred/TexasDefined/pull/4802) adds only a nullable source-specific interval and preserves 90-day page editorial review; it is **not effective** until explicitly applied and checked in the shared live Supabase project. Different cadence reflects only source monitoring, not claim-level truth freshness or editor sign-off.

## 5. Still not accepted

All eleven city editorial and jurisdiction acceptance decisions remain open until current exact-deployed-SHA audits, complete individual actual-image/manual interaction review, claim-by-claim school/tax/utility/visitor/restaurant checks, destination reciprocity, 37 historic link exception triages, and independent GIS municipal legal exceptions are resolved. **No final accepted city status can be inferred from automated success.**
