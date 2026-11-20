# Texas flag authority — source-led quarterly review

**Primary authority hub:** `/texas-flag`  
**Companion research:** `/article/history-of-the-texas-flag`  
**Display guide:** `/article/texas-flag-etiquette-display-guide`  
**Last substantive page revision:** 2026-11-19  
**Review cadence:** GitHub Actions weekly Mondays at 13:17 UTC (source drift, uncached SEO, exact-page mobile/desktop PSI/CrUX where available), plus original quarterly in-depth review on February, May, August and November 15 (`texas-flag-quarterly.yml`).
**Release verification:** Use the existing manual-only `.github/workflows/flag-history-production-smoke.yml` after publication to verify the live flag authority hub, historical companion pages, sources, accessibility hooks, indexing and sitemap. This is deliberately not a blanket deployment-triggered fanout; quarterly source reviews remain scheduled separately.

## Historical facts and controlling sources

- Blue field with gold star: the Burnet national standard approved **December 10, 1836**; see the [Handbook of Texas](https://www.tshaonline.org/handbook/entries/flags-of-texas) and the [Texas House](https://house.texas.gov/index.php/about). Earlier revolutionary flags and a separate 1836 naval ensign mean “first Texas flag” needs contextual qualification.
- Red, white and blue Lone Star flag: approved **January 25, 1839** by President Lamar; the [Texas State Library](https://www.tsl.texas.gov/historicflags/1974066001LoneStar.html) preserves the signed artwork. Peter Krag drew the surviving original; the initiating designer remains unproven.
- Modern geometry, color definitions, meanings and protocol: Texas Government Code [Chapter 3100](https://tcss.legis.texas.gov/resources/GV/htm/GV.3100.htm), including § 3100.002. The diagrams are original vector illustrations, not archival artifact photos or definitive 1836 color samples.
- Legal gap 1879–1933: legislation did not carry forward the former state flag statute, but Texans continued using the design. Confirm from the [Handbook](https://www.tshaonline.org/handbook/entries/flags-of-texas).
- Signed original: [TSLAC 1974/066-001](https://www.tsl.texas.gov/treasures/flagsandmaps/flags/lone-star-design.html) shows the flag *and* seal and detail views of the government signatures; it does not settle first inventor attribution. Never silently substitute a drawing for a photo of cloth.
- Three official designs: the Handbook distinguishes the 1836 national standard, the separate 1836 naval flag, and the 1839 national design; do not confuse the maritime ensign with the Burnet standard.
- Texas Flag Day: March 2 under [Government Code § 662.048](https://tcss.legis.texas.gov/resources/GV/htm/GV.662.htm); this is different from the January 25, 1839 adoption anniversary.
- Hero image rights: the modern flag SVG on Commons is labeled public domain for insufficient originality and credits Paul B. Joiner. The article's ImageObject supplies source, public-domain designation, creator and copyright notice accurately; original archival reproduction rights are a separate matter.

## Recurring automated research and content updates (November 20, 2026)

- Schedule: `.github/workflows/texas-flag-quarterly.yml` now runs weekly Mondays **and** the existing quarterly dates, with a one-time launch on workflow/source changes to validate this automation.
- Source watcher: `scripts/editorial/refresh-texas-flag-sources.mjs` reads four official sources, checks historically material anchors, fingerprints the nearby source passages (not volatile website chrome), saves independent evidence and compares `ops/editorial/texas-flag-source-state.json`. It fails closed when a statute or archival page is unavailable or a key passage disappears.
- Automated rewrite workflow: on material/source baseline drift it opens a source-linked editorial **PR** with the affected flag URLs and concrete paragraphs to research and rewrite. The PR is **not** an automatic publication of unchecked AI-written historical claims; if sources are unchanged no public rewrite or fake edit date occurs. The initial automated baseline PR requires an evidence review.
- Live publishing: each scheduled run bypasses CDN HTML caches with unique probes, verifies the hub/history/etiquette canonicals, visible November 19 content, accessible SVGs, trusted source links, structured data, indexing signals, and current sitemap lastmod dates. A mismatch is a real failure, not a claim that cached search results reflect production.
- Field and lab performance: `scripts/ci/audit-texas-flag-vitals.mjs` requests Google PageSpeed mobile **and** desktop for the *exact* hub URL, distinguishes URL-level CrUX from origin fallback and Lighthouse lab, and saves an artifact. Missing/429 PSI data is UNKNOWN; poor verified field or lab measurements raise an actionable issue rather than a fictitious 95+ performance pass.
- Editorial safeguards: facts must be independently supported before public rewrite, author/date corrections or sitemap `lastmod` advance. Every new public version still requires protected merge-gate validation and new production acceptance, and Google's re-crawl/rank is not within GitHub's control.

## Acceptance tests

- Run `node scripts/data/validate-texas-flag-authority.mjs` after every relevant code change.
- Following a production deployment, run `node scripts/ci/verify-texas-flag-live.mjs --sources` to verify visible, accessible flag drawings, archive provenance, creator/license/copyright metadata, statutory Flag Day, canonicals, reciprocal links and both November 19 sitemap lastmod values.
- Check the page with mobile viewport, keyboard and screen-reader navigation. Vector flags must preserve meaningful titles/descriptions and layout without external image dependencies.
- Cite primary and specialist sources near assertions; do not claim unsupported designer attribution, first-ever flag or color mythology.
- Re-check the page's indexability, loading and speed against Google Search Essentials and the people-first guidance: https://developers.google.com/search/docs/essentials and https://developers.google.com/search/docs/fundamentals/creating-helpful-content .
- Content changes require actual review; do not update a date solely because a recurring workflow ran. Schedule failures raise a deduplicated GitHub issue, never automatically change historical claims.

## Historical release checkpoint — November 19, 2026 (completed; superseded by the November 20 scheduled-refresh work)

- Original source research and SEO/rights changes merged in PR #7406 (commit `599ff71dfb8dae4c214fa707204bb9b80331f866`).
- Original revision passed the protected premerge content, type/build and strict bundle checks.
- Exact flag acceptance passed in GitHub Actions run 44632583858, including both flag pages, other companion sources, image metadata and sitemap. The later production release commit `85cbb7a8d5dcfc6533fe9bbaf8bc3bb00bf3c1e2` passed production run 44665992423. This is historical release evidence, not evidence that Google has recrawled the revised content.
- Do not claim final Google Search indexing or Search policy approval from tests; URL Inspection and actual search performance lag publication.
- If deployment or test fails, record issue/PR, exact failing job, pending files and next step. Never advance an editorial date without a verified content change.

## Content architecture

The hub answers the key comparative, legal and visual questions. The flag history article owns detailed primary-research narrative, while the etiquette article owns practical display scenarios. Reciprocal links join the articles; `/texas-symbols`, `/texas-history`, `/article/six-flags-over-texas-meaning` and the Texas Revolution historic-sites road trip provide contextual discovery without duplicate near-identical articles.
