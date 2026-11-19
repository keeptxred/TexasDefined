# Texas flag authority — source-led quarterly review

**Primary authority hub:** `/texas-flag`  
**Companion research:** `/article/history-of-the-texas-flag`  
**Display guide:** `/article/texas-flag-etiquette-display-guide`  
**Last substantive page revision:** 2026-11-18  
**Review cadence:** Quarterly — February, May, August and November 15 (GitHub workflow `texas-flag-quarterly.yml`).
**Release verification:** Use the existing manual-only `.github/workflows/flag-history-production-smoke.yml` after publication to verify the live flag authority hub, historical companion pages, sources, accessibility hooks, indexing and sitemap. This is deliberately not a blanket deployment-triggered fanout; quarterly source reviews remain scheduled separately.

## Historical facts and controlling sources

- Blue field with gold star: the Burnet national standard approved **December 10, 1836**; see the [Handbook of Texas](https://www.tshaonline.org/handbook/entries/flags-of-texas) and the [Texas House](https://house.texas.gov/index.php/about). Earlier revolutionary flags and a separate 1836 naval ensign mean “first Texas flag” needs contextual qualification.
- Red, white and blue Lone Star flag: approved **January 25, 1839** by President Lamar; the [Texas State Library](https://www.tsl.texas.gov/historicflags/1974066001LoneStar.html) preserves the signed artwork. Peter Krag drew the surviving original; the initiating designer remains unproven.
- Modern geometry, color definitions, meanings and protocol: Texas Government Code [Chapter 3100](https://tcss.legis.texas.gov/resources/GV/htm/GV.3100.htm), including § 3100.002. The diagrams are original vector illustrations, not archival artifact photos or definitive 1836 color samples.
- Legal gap 1879–1933: legislation did not carry forward the former state flag statute, but Texans continued using the design. Confirm from the [Handbook](https://www.tshaonline.org/handbook/entries/flags-of-texas).

## Acceptance tests

- Run `node scripts/data/validate-texas-flag-authority.mjs` after every relevant code change.
- Following a production deployment, run `node scripts/ci/verify-texas-flag-live.mjs --sources` to verify visible, accessible flag drawings, sources, canonical, Article companion backlinks and sitemap lastmod.
- Check the page with mobile viewport, keyboard and screen-reader navigation. Vector flags must preserve meaningful titles/descriptions and layout without external image dependencies.
- Cite primary and specialist sources near assertions; do not claim unsupported designer attribution, first-ever flag or color mythology.
- Re-check the page's indexability, loading and speed against Google Search Essentials and the people-first guidance: https://developers.google.com/search/docs/essentials and https://developers.google.com/search/docs/fundamentals/creating-helpful-content .
- Content changes require actual review; do not update a date solely because a recurring workflow ran. Schedule failures raise a deduplicated GitHub issue, never automatically change historical claims.

## Content architecture

The hub answers the key comparative, legal and visual questions. The flag history article owns detailed primary-research narrative, while the etiquette article owns practical display scenarios. Reciprocal links join the articles; `/texas-symbols`, `/texas-history`, `/article/six-flags-over-texas-meaning` and the Texas Revolution historic-sites road trip provide contextual discovery without duplicate near-identical articles.
