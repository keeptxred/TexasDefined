# Texas Defined — unranked county visitor-place editorial closure

Date: 2026-10-17
Scope: supplemental **More to explore in [County]** section only. This is **not** an inventory of every existing museum, state park, national park, beach, water park, fishing lake, town, or historical guide on the site.

## Decision

- All 254 Texas counties have an editorial outcome in the checked-in code.
- 201 counties have 339 individual, unranked, source-linked supplemental entries.
- 53 counties have **no additional visitor-place listing selected** in the current pass. They retain all their independently rendered county content. No empty or generic filler cards should be added.
- County membership is stored explicitly in `src/data/county-visitor-selection-decisions.ts` and verified against the canonical county registry by `src/data/county-visitor-places.test.ts`.
- No standalone authority page is generated automatically. Those remain separate, evidence-based editorial projects.

## Latest deliberate selections

Added to existing county pages only: the Sam Houston Statue & Visitor Center (Walker), Magnolia Station on Route 66 (Oldham), Henderson Civic Theatre (Rusk), TEXAS Outdoor Musical (Randall; summer season **over** for 2026), Cleburne Historic Homes Driving Tour (Johnson), historic downtown Terrell (Kaufman), Saint Jo square (Montague), Anson post-office New Deal mural and courthouse/historic district (Jones), Kermit downtown mural (Winkler), and Big Rocks Park (Somervell).

## Why 53 counties have no new supplemental place

Not finding a sufficiently strong **additional** record at this pass is a valid outcome. Do **not** reinterpret this as “the county has no attractions.” Existing thematic link components for museums, state parks, towns, public water recreation, coastal sites and other established authorities render separately. Rural roads, private ranches, closed sites, generic courthouses, tiny unverified parks, and made-up walking tours do not become authority-grade visitor recommendations just to fill a quota.

The static no-additional-selection list is intentionally finite. Reopening a county requires an independently checked source, a meaningful visitor experience, proper public access wording and a duplicate assessment against the other sections. Remove the county from the explicit no-additional-selection list **in the same commit** as adding a researched visitor place. Existing links in other sections remain the first choice.

## Integrity conditions

All supplemental entries: canonical county, useful description, category, HTTPS independent source, no within-county duplicate, no rank/destinationSlug requirement. The tests also confirm selected and no-additional-selection county sets are disjoint and together match all 254 canonical Texas counties. Current tour dates and admissions remain operator-controlled.

## Delivery boundary

Publishing via GitHub PR and normal required checks is separate from production verification. Do not claim the new batch is live without a successful merge and independent deployed-page confirmation. No Lovable, no paid services, and no broad site-wide audit required for this editorial closure.
