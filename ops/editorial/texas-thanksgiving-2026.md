# TexasDefined Thanksgiving 2026 authority checkpoint

Last content/source review: 2026-11-23. Publishing target: homepage November 23–29, 2026 America/Chicago. The seasonal homepage header is **Happy Thanksgiving**, then reverts without manual release. The 2026 campaign guard intentionally blocks replaying 2026 parade dates during 2027 or later until a new editorial review.

## Four authoritative local articles
- /article/texas-thanksgiving-turkey-frying-safety — NFPA / NPS warning, CDC and 2026 Texas A&M AgriLife sources; >1,000 original content words; fully thawed/dried turkey, oil displacement, at least 10 feet from structures, 165°F internal, water-free grease-fire response and professional alternatives.
- /article/texas-thanksgiving-recipes — oven turkey, jalapeño cornbread dressing, pecan pie, optional green beans; quantities and separate food-safety instructions, >1,000 words.
- /article/texas-thanksgiving-traditions — regional foodways, smoke, pecans, Tejano influence, family drive, Cowboys football, community runs and Indigenous/other perspectives, >1,000 words.
- /article/texas-thanksgiving-parades-2026 — sources checked against organizers November 23: Houston H-E-B parade Thu Nov 26 at 9am (actual Thanksgiving Day), El Paso Sun Bowl Parade Thu Nov 26 at 10am Mountain Time (also Thanksgiving Day), San Antonio Ford Holiday River Parade Fri Nov 27 6pm, Fort Worth GM Financial Parade of Lights Sun Nov 22 6pm (past), Dallas Holiday Parade Dec 5 (not Thanksgiving weekend). Do not invent unverified city parades.

## Primary official sources
- https://mytexas.ag.tamu.edu/publications/cooking-turkey-oven-roasting-and-deep-frying/
- https://www.nps.gov/articles/p52-deep-fried-turkey-fire-safety.htm
- https://www.cdc.gov/food-safety/foods/holiday-turkey.html
- https://www.houstontx.gov/thanksgivingparade/
- https://sunbowl.org/events/glasheen-valles-inderman-sun-bowl-parade
- https://visitelpaso.com/events/annual-events-and-festivals/sun-bowl-thanksgiving-parade
- https://www.thesanantonioriverwalk.com/events/ford-holiday-river-parade/
- https://www.sa.gov/Directory/News-Releases/Celebrate-the-Holidays-in-Downtown-San-Antonio-2026
- https://www.dfwi.org/do/gm-parade-of-lights
- https://dallasholidayparade.com/

## Deployment & maintenance
Uses the existing /article/$slug article router; no new route-tree entries required. Sources in src/data/fixtures/texas-thanksgiving-articles.ts are loaded lazily through src/data/fixtures/lazy-evergreen.ts and pass the standard >=600-word, author, hero and metadata readiness gates. Four metadata-only stubs are in src/data/fixtures/texas-thanksgiving-stubs.ts; the existing public sitemap resolves those stubs to full index-ready bodies before adding article routes.

Run: node --experimental-strip-types scripts/data/validate-texas-thanksgiving.mjs and npm run seo:validate. Annual GitHub review on October 20 creates a dated review issue for future campaigns. This is fact-check monitoring, not blind date-shifting or unsourced auto-publication. Production publishing remains GitHub Actions on main; verify actual 200, indexable canonical H1 and page content on the public site after deployment.
