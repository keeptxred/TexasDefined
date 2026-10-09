# TexasDefined city authority — final acceptance and transportation source audit

**Audit recorded:** 2026-10-09. **Entity source-review date:** 2026-10-08 (intentionally unchanged). **Scope:** 11 /city/{slug} authority pages. **Repository:** keeptxred/TexasDefined.

## Evidence and interpretation

- The checked-in `src/data/city-authority-profiles.ts` was inspected individually for all 11 city records: each has `population2020`, `censusUrl`, `populationEstimate`, `jurisdiction`, `hero`, `districts`, `featured`, six `tripPlanning` subsections (`firstTime`, `stayAreas`, `freeThings`, `family`, `gettingAround`, `shoppingEntertainment`), and `systems`.
- The `scripts/data/validate-entity-template-quality.mjs` contract was inspected: it enforces counts for jurisdiction, hero, districts, featured, all new modules; city-specific examples; OG/social-image metadata for the 11 slugs; Fort Worth Census and multi-county relationships; cross-links and route behavior. The shared renderer is `src/components/content/EntityDepthSections.tsx`.
- Production deployment GitHub Actions **38001003182**, SHA **47ba103d88e055f3b44c9e7735fbf244885249b9**, completed successfully. Production city sitemap verifier reported **11/11 exact city URLs** and `lastmod=2026-10-08`; its evidence artifact **city-sitemap-live-evidence-38001003182** was retrieved in the project chat. The workflow also checked revision-bound live surfaces.
- This matrix is **source-structure plus previously completed CI/live-surface acceptance**, not an assertion that each image asset, each off-site link, every food venue, every Census data value, or all rendered pages were newly inspected manually on 2026-10-09. Operational links and schedules must be revisited as they change.

## 11-city source-structure acceptance matrix

Columns: **P** population/Census/estimate, **J** primary and overlap counties, **H** hero/OG, **D** districts, **F** featured guides, **T** six trip-planning sections, **S** systems/related internal references, **X** city-specific content, **V** validator contract, **M** exact URL and lastmod sitemap gate.

| City | P | J | H | D | F | T | S | X | V | M |
|---|---|---|---|---|---|---|---|---|---|---|
| [Houston](https://texasdefined.com/city/houston) | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| [Dallas](https://texasdefined.com/city/dallas) | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| [Fort Worth](https://texasdefined.com/city/fort-worth) | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| [Austin](https://texasdefined.com/city/austin) | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| [San Antonio](https://texasdefined.com/city/san-antonio) | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| [El Paso](https://texasdefined.com/city/el-paso) | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| [Arlington](https://texasdefined.com/city/arlington) | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| [Hurst](https://texasdefined.com/city/hurst) | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| [Corpus Christi](https://texasdefined.com/city/corpus-christi) | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| [Plano](https://texasdefined.com/city/plano) | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| [Lubbock](https://texasdefined.com/city/lubbock) | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |

**Further sitewide protections:** city social-image metadata is SSR-only; entity route has OG fallback; site renders canonical entity routes; sitemap verifier rejects missing/stale city entries; page templates provide relocation, school district, cost, utility and related resources. Food and FAQ are rendered through the shared entity components. These are protected integration/template contracts, not a substitute for a manual full-browser regression of every city.

**Scope caveat:** full live browser image-load, WCAG, outbound-link and content-factual line-item acceptance is *not proven by this source matrix*; it should not be called an independent exhaustive 11-page screenshot audit.

## Current official transportation-source review

Primary transportation sources accessed 2026-10-09. These are verified **source-to-durable-guidance comparisons**, not live promise of any particular timetable or fare.

| City | Verified service context | Official reference | Findings/caveats |
|---|---|---|---|
| Houston | METRO bus and METRORail; broader region car-dependent | [Official operator](https://map.ridemetro.org/) | METRORail central-corridor advice matches official rail map |
| Dallas | DART light rail, bus, streetcar; TRE regional | [Official operator](https://dart.org/guide/transit-and-use/rail/rail-line-details) | Do not hard-code headways; DART modified schedules July 20, 2026 |
| Fort Worth | Trinity Metro bus/TEXRail and regional TRE | [Official operator](https://ridetrinitymetro.org/routes-schedules/) | Separate Stockyards, Cultural District; regional rail not universal local coverage |
| Austin | CapMetro buses, Rapid, rail; outer areas often car-oriented | [Official operator](https://www.capmetro.org/destinations) | Schedule book effective Aug. 16, 2026; events can change service |
| San Antonio | VIA Metropolitan Transit buses | [Official operator](https://www.viainfo.net/trip-planning/) | Downtown walkable; outer attractions require journey planning |
| El Paso | Sun Metro bus/Brio and Downtown-Uptown Streetcar | [Official operator](https://sunmetro.net/streetcar/streetcar-route) | Streetcar route confirmed; Sun Metro service changes Sept. 20, 2026 |
| Arlington | Citywide Arlington On-Demand Via and CentrePort TRE connection | [Official operator](https://www.arlingtontx.gov/City-Services/Transportation-Streets-Traffic/Arlington-On-Demand) | On-demand service, NOT a downtown stadium rail station |
| Hurst | TRE Bell Station; mostly car-oriented local access | [Official operator](https://trinityrailwayexpress.org/stations/) | Bell Station: 3232 Bell Flight Blvd, Hurst; do not promise legacy Bell bus shuttle |
| Corpus Christi | CCRTA routes, plus island/beach driving considerations | [Official operator](https://www.ccrta.org/ride/routes) | Official routes include Padre Island Flex; guide correctly avoids universal car-free claim |
| Plano | DART rail east-central, bus and GoLink; western districts more car-oriented | [Official operator](https://dart.org/guide/transit-and-use/rail/rail-line-details) | Confirm route using DART planner; don't present every Plano neighborhood as rail-served |
| Lubbock | Citibus city and Texas Tech service; visitor car useful | [Official operator](https://citibus.com/) | Sept. 28, 2026 phase-one redesign; guide wisely avoids obsolete route numbers |

### Change-sensitive findings

1. **Lubbock:** Citibus announced new/reconfigured routes effective **September 28, 2026**. TexasDefined's trip-planning advice does not specify superseded route numbers. Source: https://citibus.com/.
2. **El Paso:** Sun Metro announced transit schedule changes effective **September 20, 2026**, and maintains an active downtown/uptown Streetcar route. Do not reuse older 2022/2023 operating hours. Sources: https://sunmetro.net/ and https://sunmetro.net/streetcar/about-streetcars.
3. **Dallas/Plano:** DART announced a return to non-World Cup frequencies effective **July 20, 2026**. Avoid static headway claims; refer readers to DART trip planning. Source: https://dart.org/about/news-and-events/newsreleases/newsrelease-detail/dart-returns-to-normal-service-frequency.
4. **Arlington:** official on-demand Via service reaches CentrePort TRE; this is not citywide fixed rail. Source: https://www.arlingtontx.gov/City-Services/Transportation-Streets-Traffic/Arlington-On-Demand.
5. **Hurst:** Bell Station is a TRE station within Hurst at 3232 Bell Flight Blvd; the former Bell employee connector was discontinued in 2022. Sources: https://trinityrailwayexpress.org/stations/ and https://ridetrinitymetro.org/bell-route-ending-aug-31/.
6. **Austin:** CapMetro's published schedule book is effective **August 16, 2026**; always consult current official alerts. Source: https://www.capmetro.org/destinations.

### Disposition

- **Official-source transportation review for all 11 cities: recorded.** No contradictory claim found in the inspected `gettingAround` descriptions.
- **Structured 11-city acceptance matrix: recorded.** All required source fields are present in all 11 profiles.
- **Review-date policy:** do not advance `cityAuthorityCheckedAt = '2026-10-08'` solely because this audit record was created; preserving existing dates prevents fabricated verification freshness.
- **No code changes warranted** from the findings reviewed here; no verified city-specific publication defect was established.
