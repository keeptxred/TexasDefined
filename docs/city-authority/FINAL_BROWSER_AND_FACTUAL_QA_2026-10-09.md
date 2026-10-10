# TexasDefined 11-city final browser and factual QA — evidence ledger

**Recorded:** 2026-10-09. **Status: IN PROGRESS — NOT ACCEPTED.**  
**Repository:** keeptxred/TexasDefined. **Observed main baseline:** `a1766a48d00f4a58285e5229f0946941266b0e27`.  
**Earlier evidence:** [final transit and structure audit](FINAL_ACCEPTANCE_AND_TRANSIT_AUDIT_2026-10-09.md); production deploy run 38001003182 (historical, not asserted current).

## Evidence classes and limits

- **Source inspection:** actual GitHub files `src/data/city-authority-profiles.ts`, `EntityDepthSections.tsx`, and `validate-entity-template-quality.mjs` examined. Existing structural validator covers all 11 profiles.
- **Production HTML retrieval:** all eleven canonical URLs returned readable editorial content and city headings through independent HTTP web retrieval on 2026-10-09. This does **not** verify actual Chrome rendering, load-event image success, keyboard controls, mobile viewport or hydration.
- **Automated CI:** new 33-combination Chrome runner `scripts/ci/verify-city-authority-browser.mjs` and `.github/workflows/verify-city-authority-browser.yml` added to QA branch; no results asserted until workflow run and artifact inspection.
- **Actual browser testing:** NOT TESTED as of this record; planned Chrome CI will supply screenshot and runtime evidence, but does not substitute for all manual accessibility or functional test cases.
- **Official factual verification:** census Houston and Fort Worth values below independently compared against official Census QuickFacts. Prior transportation review is documented in the previous audit; not relabeled as newly individually checked.
- **Production deployment:** new QA workflow and script are not asserted deployed before successful protected PR merge.

## Per-city production and browser matrix

Columns: **HTML** = readable live retrieval; **Chrome** = real browser run at 390x844, 768x1024, 1440x900; **Images**, **Links**, **Responsive**, **SEO**, **Accessibility**, **Interactions** require specialized live verification.

| City | HTML | Chrome | Images | Links | Responsive | SEO | Accessibility | Interactions |
|---|---|---|---|---|---|---|---|---|
| Houston | PASS (HTML retrieval) | NOT TESTED | NOT TESTED | NOT TESTED | NOT TESTED | NOT TESTED | NOT TESTED | NOT TESTED |
| Dallas | PASS (HTML retrieval) | NOT TESTED | NOT TESTED | NOT TESTED | NOT TESTED | NOT TESTED | NOT TESTED | NOT TESTED |
| Fort Worth | PASS (HTML retrieval) | NOT TESTED | NOT TESTED | NOT TESTED | NOT TESTED | NOT TESTED | NOT TESTED | NOT TESTED |
| Austin | PASS (HTML retrieval) | NOT TESTED | NOT TESTED | NOT TESTED | NOT TESTED | NOT TESTED | NOT TESTED | NOT TESTED |
| San Antonio | PASS (HTML retrieval) | NOT TESTED | NOT TESTED | NOT TESTED | NOT TESTED | NOT TESTED | NOT TESTED | NOT TESTED |
| El Paso | PASS (HTML retrieval) | NOT TESTED | NOT TESTED | NOT TESTED | NOT TESTED | NOT TESTED | NOT TESTED | NOT TESTED |
| Arlington | PASS (HTML retrieval) | NOT TESTED | NOT TESTED | NOT TESTED | NOT TESTED | NOT TESTED | NOT TESTED | NOT TESTED |
| Hurst | PASS (HTML retrieval) | NOT TESTED | NOT TESTED | NOT TESTED | NOT TESTED | NOT TESTED | NOT TESTED | NOT TESTED |
| Corpus Christi | PASS (HTML retrieval) | NOT TESTED | NOT TESTED | NOT TESTED | NOT TESTED | NOT TESTED | NOT TESTED | NOT TESTED |
| Plano | PASS (HTML retrieval) | NOT TESTED | NOT TESTED | NOT TESTED | NOT TESTED | NOT TESTED | NOT TESTED | NOT TESTED |
| Lubbock | PASS (HTML retrieval) | NOT TESTED | NOT TESTED | NOT TESTED | NOT TESTED | NOT TESTED | NOT TESTED | NOT TESTED |

No failures have yet been substantiated with Chrome reproduction screenshots. Unknown results must stay NOT TESTED, not PASS.

## Independent factual comparison ledger

| City | Claim | Published | Official value | Official source | Checked | Outcome | Correction | Resolution |
|---|---|---|---|---|---|---|---|---|
| Houston | 2020 city population | 2,304,580 | 2,304,580 | https://www.census.gov/quickfacts/fact/table/houstoncitytexas/PST120223 | 2026-10-09 | PASS | No | Agrees |
| Houston | July 1, 2025 city estimate | 2,397,315 | 2,397,315 | https://www.census.gov/quickfacts/fact/table/houstoncitytexas/PST120223 | 2026-10-09 | PASS | No | Agrees |
| Fort Worth | 2020 city population | 918,915 | 918,915 | https://www.census.gov/quickfacts/fact/table/fortworthcitytexas/HSG860222 | 2026-10-09 | PASS | No | Agrees |
| Fort Worth | July 1, 2025 city estimate | 1,028,117 | 1,028,117 | https://www.census.gov/quickfacts/fact/table/fortworthcitytexas/HSG860222 | 2026-10-09 | PASS | No | Agrees |
| Dallas | Population, jurisdictions, featured attractions, transit, relocation | In city profile | NOT INDEPENDENTLY CHECKED | Pending primary-source retrieval | 2026-10-09 | UNVERIFIED | Pending evidence | Open |
| Austin | Population, jurisdictions, featured attractions, transit, relocation | In city profile | NOT INDEPENDENTLY CHECKED | Pending primary-source retrieval | 2026-10-09 | UNVERIFIED | Pending evidence | Open |
| San Antonio | Population, jurisdictions, featured attractions, transit, relocation | In city profile | NOT INDEPENDENTLY CHECKED | Pending primary-source retrieval | 2026-10-09 | UNVERIFIED | Pending evidence | Open |
| El Paso | Population, jurisdictions, featured attractions, transit, relocation | In city profile | NOT INDEPENDENTLY CHECKED | Pending primary-source retrieval | 2026-10-09 | UNVERIFIED | Pending evidence | Open |
| Arlington | Population, jurisdictions, featured attractions, transit, relocation | In city profile | NOT INDEPENDENTLY CHECKED | Pending primary-source retrieval | 2026-10-09 | UNVERIFIED | Pending evidence | Open |
| Hurst | Population, jurisdictions, featured attractions, transit, relocation | In city profile | NOT INDEPENDENTLY CHECKED | Pending primary-source retrieval | 2026-10-09 | UNVERIFIED | Pending evidence | Open |
| Corpus Christi | Population, jurisdictions, featured attractions, transit, relocation | In city profile | NOT INDEPENDENTLY CHECKED | Pending primary-source retrieval | 2026-10-09 | UNVERIFIED | Pending evidence | Open |
| Plano | Population, jurisdictions, featured attractions, transit, relocation | In city profile | NOT INDEPENDENTLY CHECKED | Pending primary-source retrieval | 2026-10-09 | UNVERIFIED | Pending evidence | Open |
| Lubbock | Population, jurisdictions, featured attractions, transit, relocation | In city profile | NOT INDEPENDENTLY CHECKED | Pending primary-source retrieval | 2026-10-09 | UNVERIFIED | Pending evidence | Open |
| Houston | Counties, featured venues, districts, transit, relocation | In city profile | NOT INDEPENDENTLY CHECKED in this QA pass | Pending municipal/provider evidence | 2026-10-09 | UNVERIFIED | Pending | Open |
| Fort Worth | Counties, featured venues, districts, transit, relocation | In city profile | NOT INDEPENDENTLY CHECKED in this QA pass | Pending municipal/provider evidence | 2026-10-09 | UNVERIFIED | Pending | Open |

The prior audit records official transit links for all eleven: METRO, DART, Trinity Metro/TEXRail/TRE, CapMetro, VIA, Sun Metro, Arlington On-Demand, Bell TRE, CCRTA, Plano DART/GoLink, and Citibus. That prior review is preserved, not counted a second time as newly verified facts.

## Known constraints and follow-up acceptance

1. Run the new Chrome workflow and inspect its JSON and screenshots. Mark individual checks PASS/FAIL only after seeing evidence. Its automated signals are narrower than manual WCAG, navigation, content/licensing and visual quality review.
2. Compare all 11 municipal boundary/county claims to municipal GIS, and census populations to current Census QuickFacts, individually.
3. Check every featured museum, attraction, food venue and system link against its current official website; record an itemized claim for each.
4. Document any reproduced failure with exact city URL, viewport, steps, expected/actual behavior, severity and artifact.
5. Fix only proven defects, refresh main before writes, require protected CI before merge, and confirm production SHA plus live sitemap afterward.
6. Keep the city fact source-review date unchanged until corresponding facts have actually been reverified.

**Acceptance: NOT COMPLETE.** No manual viewport, accessibility or complete factual verification is certified by this document.
