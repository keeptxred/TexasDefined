# TexasDefined 11-city final browser and factual QA — evidence ledger

**Recorded:** 2026-10-09. **Status: IN PROGRESS — NOT ACCEPTED.**  
**Repository:** keeptxred/TexasDefined. **Observed main baseline:** `a1766a48d00f4a58285e5229f0946941266b0e27`.  
**Earlier evidence:** [final transit and structure audit](FINAL_ACCEPTANCE_AND_TRANSIT_AUDIT_2026-10-09.md); production deploy run 38001003182 (historical, not asserted current).

## Evidence classes and limits

- **Source inspection:** actual GitHub files `src/data/city-authority-profiles.ts`, `EntityDepthSections.tsx`, and `validate-entity-template-quality.mjs` examined. Existing structural validator covers all 11 profiles.
- **Production HTML retrieval:** all eleven canonical URLs returned readable editorial content and city headings through independent HTTP web retrieval on 2026-10-09. This does **not** verify actual Chrome rendering, load-event image success, keyboard controls, mobile viewport or hydration.
- **Automated CI:** new runner and workflow passed 33/33 viewport combinations in run 38021044139; assertions include HTTP, H1, canonical, description, indexability, OG, overflow, image load/alt, link presence and JS errors. Does not establish every link's actual target or licensing.
- **Actual browser testing:** production Chrome workflow [38021044139](https://github.com/keeptxred/TexasDefined/actions/runs/38021044139) SUCCESS. Real headless Chrome completed 33/33 city/viewport runs at 390x844, 768x1024 and 1440x900. Screenshot and JSON artifacts retained. This is not a full manual visual/accessibility audit.
- **Official factual verification:** 2020 and 2025 population values for all eleven cities independently compared against U.S. Census Bureau QuickFacts. Prior transportation review is documented in the previous audit; not relabeled as newly individually checked.
- **Production deployment:** new QA workflow and script are not asserted deployed before successful protected PR merge.

## Per-city production and browser matrix

Columns: **HTML** = readable live retrieval; **Chrome** = real browser run at 390x844, 768x1024, 1440x900; **Images**, **Links**, **Responsive**, **SEO**, **Accessibility**, **Interactions** require specialized live verification.

| City | HTML | Chrome | Images | Links | Responsive | SEO | Accessibility | Interactions |
|---|---|---|---|---|---|---|---|---|
| Houston | PASS (HTML retrieval) | PASS (automated 3 sizes) | PASS (load/alt only) | NOT TESTED (targets) | PASS (overflow only) | PASS (metadata) | NOT TESTED (full WCAG) | NOT TESTED (click flow) |
| Dallas | PASS (HTML retrieval) | PASS (automated 3 sizes) | PASS (load/alt only) | NOT TESTED (targets) | PASS (overflow only) | PASS (metadata) | NOT TESTED (full WCAG) | NOT TESTED (click flow) |
| Fort Worth | PASS (HTML retrieval) | PASS (automated 3 sizes) | PASS (load/alt only) | NOT TESTED (targets) | PASS (overflow only) | PASS (metadata) | NOT TESTED (full WCAG) | NOT TESTED (click flow) |
| Austin | PASS (HTML retrieval) | PASS (automated 3 sizes) | PASS (load/alt only) | NOT TESTED (targets) | PASS (overflow only) | PASS (metadata) | NOT TESTED (full WCAG) | NOT TESTED (click flow) |
| San Antonio | PASS (HTML retrieval) | PASS (automated 3 sizes) | PASS (load/alt only) | NOT TESTED (targets) | PASS (overflow only) | PASS (metadata) | NOT TESTED (full WCAG) | NOT TESTED (click flow) |
| El Paso | PASS (HTML retrieval) | PASS (automated 3 sizes) | PASS (load/alt only) | NOT TESTED (targets) | PASS (overflow only) | PASS (metadata) | NOT TESTED (full WCAG) | NOT TESTED (click flow) |
| Arlington | PASS (HTML retrieval) | PASS (automated 3 sizes) | PASS (load/alt only) | NOT TESTED (targets) | PASS (overflow only) | PASS (metadata) | NOT TESTED (full WCAG) | NOT TESTED (click flow) |
| Hurst | PASS (HTML retrieval) | PASS (automated 3 sizes) | PASS (load/alt only) | NOT TESTED (targets) | PASS (overflow only) | PASS (metadata) | NOT TESTED (full WCAG) | NOT TESTED (click flow) |
| Corpus Christi | PASS (HTML retrieval) | PASS (automated 3 sizes) | PASS (load/alt only) | NOT TESTED (targets) | PASS (overflow only) | PASS (metadata) | NOT TESTED (full WCAG) | NOT TESTED (click flow) |
| Plano | PASS (HTML retrieval) | PASS (automated 3 sizes) | PASS (load/alt only) | NOT TESTED (targets) | PASS (overflow only) | PASS (metadata) | NOT TESTED (full WCAG) | NOT TESTED (click flow) |
| Lubbock | PASS (HTML retrieval) | PASS (automated 3 sizes) | PASS (load/alt only) | NOT TESTED (targets) | PASS (overflow only) | PASS (metadata) | NOT TESTED (full WCAG) | NOT TESTED (click flow) |

Automated Chrome logged no failures across 33 viewport runs. Manual screenshot review, full functional and WCAG verification are NOT TESTED.

## Independent factual comparison ledger

| City | Claim | Published | Official value | Official source | Checked | Outcome | Correction | Resolution |
|---|---|---|---|---|---|---|---|---|
| Houston | 2020 city population | 2,304,580 | 2,304,580 | https://www.census.gov/quickfacts/fact/table/houstoncitytexas/PST120223 | 2026-10-09 | PASS | No | Agrees |
| Houston | July 1, 2025 city estimate | 2,397,315 | 2,397,315 | https://www.census.gov/quickfacts/fact/table/houstoncitytexas/PST120223 | 2026-10-09 | PASS | No | Agrees |
| Fort Worth | 2020 city population | 918,915 | 918,915 | https://www.census.gov/quickfacts/fact/table/fortworthcitytexas/HSG860222 | 2026-10-09 | PASS | No | Agrees |
| Fort Worth | July 1, 2025 city estimate | 1,028,117 | 1,028,117 | https://www.census.gov/quickfacts/fact/table/fortworthcitytexas/HSG860222 | 2026-10-09 | PASS | No | Agrees |
| Dallas | 2020 city population | 1,304,379 | 1,304,379 | https://www.census.gov/quickfacts/fact/table/dallascitytexas/PST045225 | 2026-10-09 | PASS | No | Agrees |\n| Dallas | July 1, 2025 city estimate | 1,329,491 | 1,329,491 | https://www.census.gov/quickfacts/fact/table/dallascitytexas/PST045225 | 2026-10-09 | PASS | No | Agrees |\n| Dallas | Jurisdictions, featured attractions, transit, relocation | In city profile | NOT INDEPENDENTLY CHECKED in this QA pass | Pending individual official records | 2026-10-09 | UNVERIFIED | Pending | Open |
| Austin | 2020 city population | 961,855 | 961,855 | https://www.census.gov/quickfacts/fact/table/austincitytexas/PST045225 | 2026-10-09 | PASS | No | Agrees |\n| Austin | July 1, 2025 city estimate | 1,002,632 | 1,002,632 | https://www.census.gov/quickfacts/fact/table/austincitytexas/PST045225 | 2026-10-09 | PASS | No | Agrees |\n| Austin | Jurisdictions, featured attractions, transit, relocation | In city profile | NOT INDEPENDENTLY CHECKED in this QA pass | Pending individual official records | 2026-10-09 | UNVERIFIED | Pending | Open |
| San Antonio | 2020 city population | 1,434,625 | 1,434,625 | https://www.census.gov/quickfacts/fact/table/sanantoniocitytexas/PST045225 | 2026-10-09 | PASS | No | Agrees |\n| San Antonio | July 1, 2025 city estimate | 1,548,422 | 1,548,422 | https://www.census.gov/quickfacts/fact/table/sanantoniocitytexas/PST045225 | 2026-10-09 | PASS | No | Agrees |\n| San Antonio | Jurisdictions, featured attractions, transit, relocation | In city profile | NOT INDEPENDENTLY CHECKED in this QA pass | Pending individual official records | 2026-10-09 | UNVERIFIED | Pending | Open |
| El Paso | 2020 city population | 678,815 | 678,815 | https://www.census.gov/quickfacts/fact/table/elpasocitytexas/PST045225 | 2026-10-09 | PASS | No | Agrees |\n| El Paso | July 1, 2025 city estimate | 683,012 | 683,012 | https://www.census.gov/quickfacts/fact/table/elpasocitytexas/PST045225 | 2026-10-09 | PASS | No | Agrees |\n| El Paso | Jurisdictions, featured attractions, transit, relocation | In city profile | NOT INDEPENDENTLY CHECKED in this QA pass | Pending individual official records | 2026-10-09 | UNVERIFIED | Pending | Open |
| Arlington | 2020 city population | 394,266 | 394,266 | https://www.census.gov/quickfacts/fact/table/arlingtoncitytexas/PST045225 | 2026-10-09 | PASS | No | Agrees |\n| Arlington | July 1, 2025 city estimate | 402,134 | 402,134 | https://www.census.gov/quickfacts/fact/table/arlingtoncitytexas/PST045225 | 2026-10-09 | PASS | No | Agrees |\n| Arlington | Jurisdictions, featured attractions, transit, relocation | In city profile | NOT INDEPENDENTLY CHECKED in this QA pass | Pending individual official records | 2026-10-09 | UNVERIFIED | Pending | Open |
| Hurst | 2020 city population | 40,413 | 40,413 | https://www.census.gov/quickfacts/fact/table/hurstcitytexas/PST045225 | 2026-10-09 | PASS | No | Agrees |\n| Hurst | July 1, 2025 city estimate | 38,974 | 38,974 | https://www.census.gov/quickfacts/fact/table/hurstcitytexas/PST045225 | 2026-10-09 | PASS | No | Agrees |\n| Hurst | Jurisdictions, featured attractions, transit, relocation | In city profile | NOT INDEPENDENTLY CHECKED in this QA pass | Pending individual official records | 2026-10-09 | UNVERIFIED | Pending | Open |
| Corpus Christi | 2020 city population | 317,863 | 317,863 | https://www.census.gov/quickfacts/fact/table/corpuschristicitytexas/PST045225 | 2026-10-09 | PASS | No | Agrees |\n| Corpus Christi | July 1, 2025 city estimate | 317,247 | 317,247 | https://www.census.gov/quickfacts/fact/table/corpuschristicitytexas/PST045225 | 2026-10-09 | PASS | No | Agrees |\n| Corpus Christi | Jurisdictions, featured attractions, transit, relocation | In city profile | NOT INDEPENDENTLY CHECKED in this QA pass | Pending individual official records | 2026-10-09 | UNVERIFIED | Pending | Open |
| Plano | 2020 city population | 285,494 | 285,494 | https://www.census.gov/quickfacts/fact/table/planocitytexas/PST045225 | 2026-10-09 | PASS | No | Agrees |\n| Plano | July 1, 2025 city estimate | 293,028 | 293,028 | https://www.census.gov/quickfacts/fact/table/planocitytexas/PST045225 | 2026-10-09 | PASS | No | Agrees |\n| Plano | Jurisdictions, featured attractions, transit, relocation | In city profile | NOT INDEPENDENTLY CHECKED in this QA pass | Pending individual official records | 2026-10-09 | UNVERIFIED | Pending | Open |
| Lubbock | 2020 city population | 257,141 | 257,141 | https://www.census.gov/quickfacts/fact/table/lubbockcitytexas/PST045225 | 2026-10-09 | PASS | No | Agrees |\n| Lubbock | July 1, 2025 city estimate | 273,071 | 273,071 | https://www.census.gov/quickfacts/fact/table/lubbockcitytexas/PST045225 | 2026-10-09 | PASS | No | Agrees |\n| Lubbock | Jurisdictions, featured attractions, transit, relocation | In city profile | NOT INDEPENDENTLY CHECKED in this QA pass | Pending individual official records | 2026-10-09 | UNVERIFIED | Pending | Open |
| Houston | Counties, featured venues, districts, transit, relocation | In city profile | NOT INDEPENDENTLY CHECKED in this QA pass | Pending municipal/provider evidence | 2026-10-09 | UNVERIFIED | Pending | Open |
| Fort Worth | Counties, featured venues, districts, transit, relocation | In city profile | NOT INDEPENDENTLY CHECKED in this QA pass | Pending municipal/provider evidence | 2026-10-09 | UNVERIFIED | Pending | Open |

The prior audit records official transit links for all eleven: METRO, DART, Trinity Metro/TEXRail/TRE, CapMetro, VIA, Sun Metro, Arlington On-Demand, Bell TRE, CCRTA, Plano DART/GoLink, and Citibus. That prior review is preserved, not counted a second time as newly verified facts.

## Independent municipal jurisdiction evidence (partial)

| City | Published counties | Official confirmation | Result |
|---|---|---|---|
| Dallas | Dallas, Collin, Denton, Kaufman, Rockwall | https://www.dallascityhall.com/government/citysecretary/elections/Pages/elections.aspx | PASS |
| Fort Worth | Tarrant, Denton, Parker, Johnson, Wise | https://www.fortworthtexas.gov/files/assets/public/v/1/the-fwlab/documents/planning/comprehensive-planning/adopted/25-intergovernmental-cooperation-final-2023.pdf | PASS |
| Austin | Travis, Williamson, Hays | https://www.austintexas.gov/ready-central-texas/news/city-austin-become-ipaws-alerting-authority | PASS |
| San Antonio | Bexar, Comal, Medina | https://comptroller.texas.gov/taxes/sales/combined-area.php establishes Medina; city 2016 annexation record establishes Comal; comprehensive 2026 municipal overlay still not assessed | UNVERIFIED (partial) |

Remaining municipal boundaries require independent spatial verification. ETJ must not be conflated with city limits.

## Confirmed defect and correction

- **Medium / broken internal destination link:** `https://texasdefined.com/city/fort-worth` linked its featured Kimbell Art Museum guide (and one trip-planning guide) to `/destination/kimbell-art-museum`. On 2026-10-09 this target returned **404 Not Found** in direct website retrieval. The correct published guide is `https://texasdefined.com/destination/kimbell-art-museum-fort-worth` (official editorial Kimbell guide, found in search). **Fix:** both literals replaced in `src/data/city-authority-profiles.ts` on PR #4519. **Production outcome: PENDING DEPLOYMENT** until merged and checked.
- **WhirlyBall Hurst:** independent retrieval of `/destination/whirlyball-hurst` timed out once (400 fetch-timeout reported by website inspection). Not classified as a confirmed HTTP application defect because the retrieval layer did not reliably return an origin response; requires real browser/live HTTP recheck.

## Known constraints and follow-up acceptance

1. Manually review all Chrome screenshots and exercise link targets, keyboard navigation, menus, interactive flows, mobile cropping, contrast and visual quality. Automated viewport evidence alone does not certify these.
2. Compare all 11 municipal boundary/county claims to municipal GIS, and census populations to current Census QuickFacts, individually.
3. Check every featured museum, attraction, food venue and system link against its current official website; record an itemized claim for each.
4. Document any reproduced failure with exact city URL, viewport, steps, expected/actual behavior, severity and artifact.
5. Fix only proven defects, refresh main before writes, require protected CI before merge, and confirm production SHA plus live sitemap afterward.
6. Keep the city fact source-review date unchanged until corresponding facts have actually been reverified.

**Acceptance: NOT COMPLETE.** Automated live-browser viewport regression is certified; full manual visual/accessibility and exhaustive factual review remain outstanding.
