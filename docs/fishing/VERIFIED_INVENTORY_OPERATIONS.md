# TexasDefined fishing source inventory — governed expansion

Verified source review: November 5, 2026. This work does **not** claim complete statewide coverage or present historical reports as current.

## Initial inventory

- Original Lake Conroe pilot: 8 TPWD-linked access facilities.
- Additional TPWD lake inventories: Lake Fork, Sam Rayburn, Livingston, Texoma, Buchanan and Travis. The JSON catalog records facility name, lake relationship and source only; it does not assert live access, current fees, closures or ramp usability.
- **Reuse, do not duplicate:** the pre-existing TexasDefined statewide lake authority network has 57 independently reviewed access-facility arrays. The directory now imports those existing dated TPWD-backed dossiers, de-duplicates by lake and normalized facility name, and rejects generated lake-level "public access inventory" placeholders. The exact resulting count is determined by the validated catalog, not a hardcoded headline.
- Business guide catalog: independent operator websites rather than scraped third-party directory profiles. These are **not owner-claimed listings** and **do not imply independently verified insurance, guide licensing, booking availability or price**.
- Historical reports: source-backed February 2026 TPWD weekly reports and an October 2026 guide report. TPWD reports were paused after February. These are dated historical snapshots, not live water conditions.

## Search indexation protections

- `/fishing/access` remains `noindex,follow` until **at least 20 represented lakes and 100 verified access records**. Only explicit facility dossiers may count; inherited synthetic inventory placeholders never qualify. The directory can index when substantive multi-region source coverage qualifies; individual source-only facility pages still do not.
- Access facility profiles without their own street address or verified coordinates remain noindex and absent from XML sitemaps.
- The guide directory may index as a genuine cross-lake directory; unclaimed, short business-summary profiles remain noindex and absent from XML sitemaps.
- Historical/stale report collections and profiles remain noindex; only genuinely recent reports pass current-report sitemap gates.
- Never count recent weather, water-level or seasonal advice as a fishing/catch report.

## Automated source maintenance

GitHub Actions `Fishing verified source inventory review` runs twice weekly, compares named access points with TPWD's published public-access inventory and checks first-party guide site reachability. It writes a traceable artifact and records drift in a GitHub issue. No source outage may silently yield invented fishing access or status changes.

## Directory source-review and sitemap dates

The statewide access directory, guide directory, and historical report archive derive their displayed dataset review date from the latest **actually verified published record**, with the August 14, 2026 foundation date as a fallback for any still-empty legacy directory. The indexable access and guide directory sitemap `lastmod` values use those source-reviewed dates, and guide/report CollectionPage date metadata follows the same review evidence. This avoids continuing to tell crawlers that the substantially expanded November catalog was last reviewed in August.

These are **catalog source-review dates**, not real-time conditions or a guarantee that all 380 access facilities were checked on the same day. Scheduled reachability and deployment events never automatically advance verification. Individual source citations and the applicable official/operator notices control current validity. Current-report indexing still requires fresh, genuine published observations; historical archive pages remain `noindex`.

## Subsequent geographic expansion

After the seven-lake seeded cohort, expand across Panhandle, South Texas, Gulf Coast and other lake regions by reusing the existing published lake authority research. Independently verify any source drift before adding new facility claims. Verify each new TPWD access page and resolve ambiguous names, ramps and fee/closure facts before publication. Keep the directory noindex until its stated quality/indexability threshold is actually supported by finished data, rather than lowering that threshold to pass an arbitrary validator.

Future reports must be **attributable, explicitly dated and independently sourced**. Do not resume "current" labels based solely on a historical archive or an unchanged TPWD website.
