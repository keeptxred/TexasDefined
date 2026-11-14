# TexasDefined — McAllen Day Trips Completion Record
Updated: October 24, 2026.

## Target
- Production: https://texasdefined.com/explore/near/mcallen/day-trips
- Original implementation PR: https://github.com/keeptxred/TexasDefined/pull/5296 (merged).
- Merge SHA: `195554dafbdfd36da3e030ccadd299be7ab30e3c`.
- Worker deployment run: https://github.com/keeptxred/TexasDefined/actions/runs/39320421599 (completed successfully).
- Verified worker version for this release: `2029d3ca-99f7-4a6c-8323-7d1a6593e48a` (at that run; newer independent releases may supersede it).

## Implemented
1. Ten independently selectable featured McAllen day trips, with approximate OSM map pins and Google Maps live driving destinations.
2. Source-credited licensed attraction imagery. Key Wikimedia files: Quinta Mazatlán (Alan Schmierer, CC0); Sabal Palm Sanctuary (William L. Farr, CC BY-SA 4.0); Edinburg museum historic jail (Larry D. Moore, CC BY 4.0). Keep attribution and source links.
3. Featured count labeled **10 curated choices**, additional researched destinations separately grouped.
4. One consolidated post-guide overnight module retaining Expedia, Hotels.com, Travelocity and Vrbo choices with disclosures and hydration protections.
5. Distinct local / half-day / full-day / coastal guidance and non-fabricated live route links.
6. Existing Santa Ana road-closure and Bobcat detour, museum canonical/redirects, Old Hidalgo Pumphouse guide, SEO/indexability safeguards and geography rules preserved.

## Performance and protected merge
- Initial stylesheet: 141,669 bytes; hard budget: 141,450; over by 219.
- Correction commits `db530c0d` and `9c710951` removed unique page-generated Tailwind utilities without raising the budget.
- Final required Merge Gate: https://github.com/keeptxred/TexasDefined/actions/runs/39319985708 (passed).
- Protected auto-merge preserved. Client performance validation passed, stylesheet under unchanged cap.

## Production acceptance
- Production Chrome artifact run: https://github.com/keeptxred/TexasDefined/actions/runs/39321199638.
- Original browser report: **44/44 checks desktop and 44/44 mobile**, zero JS page errors; checked live SHA `195554dafbdfd36da3e030ccadd299be7ab30e3c` with worker version `4d14f75a-0c7e-4aa7-95d0-4cc355894dfd` at capture time (after concurrent deployments).
- Screenshots artifact `mcallen-day-trips-visual-39321199638` (GitHub Actions artifact ID `12219897864`). Original frames were visually reviewed. Several lazy image areas and map looked empty **in the captured full-page screenshots**, while only the above-fold image check ran. This is not, by itself, proof that real visitors see broken images; it is a real screenshot/acceptance blind spot.
- Follow-up PR: https://github.com/keeptxred/TexasDefined/pull/5325. Scroll each lazy image and the OSM iframe into view, await image load/error, check featured image readiness and map tiles, then capture desktop/mobile screenshots. **Do not mark final visual acceptance complete until this enhanced scenario passes and new screenshots are inspected.**

## Separate, non-McAllen blocker
- An independent sitewide cache-purge verification workflow failed: https://github.com/keeptxred/TexasDefined/actions/runs/39320603199, because `/images/discover/collin-county.webp` returned HTTP 404. Cloudflare accepted the URL purge batches and canonical freshness check succeeded; this does not demonstrate a McAllen page failure. It must not be hidden or counted as resolved by the McAllen PR.

## Restart instructions
- Refresh current `main` before any material write.
- Inspect PR #5325 and its protected check; resolve actual image/map failures in scoped changes if they appear.
- Once merged/deployed, inspect its screenshot artifact visually at desktop 1365×900 and mobile 390×844 and update this record with the new verification run, issues found, and final status.
- Do not enter workflow-status polling loops; pursue independent tasks if CI remains active.

## October 24 current-state reconciliation and blocker
- GitHub `main` baseline at the start of this work: `d5d044af8d0a1cef8e320aa2dbc75724b94dddc5`. Relevant PRs #5004, #5011, #5250, #5251, #5252, #5261, #5264, #5296 and #5325 are merged. No competing open McAllen PR was found.
- Latest production deploy https://github.com/keeptxred/TexasDefined/actions/runs/40128558317 completed successfully, but its follow-up McAllen workflow run https://github.com/keeptxred/TexasDefined/actions/runs/40129034952 ran **no Chrome scenario** because the unrelated change was out of scope. Workflow success does not imply new visual QA.
- The latest executing focused Chrome run before this change, https://github.com/keeptxred/TexasDefined/actions/runs/39517773352, reported 46/47 desktop + 46/47 mobile checks. All featured photos loaded on scroll; both fails were the **Leaflet-only map-tile selector**. Artifact `mcallen-day-trips-visual-39517773352` ID `12308481912`, screenshots personally inspected: iframe appears empty in full-page screenshots while all ten featured image panels render.
- Confirmed external change: OpenStreetMap migrated `/export/embed.html` from Leaflet to MapLibre with https://github.com/openstreetmap/openstreetmap-website/pull/6804 (merged April 4, 2026). The old `img.leaflet-tile-loaded` probe is no longer sufficient.
- Current focused repair: verify MapLibre canvas *or* Leaflet imagery; capture standalone iframe screenshot while visible; require nonblank map screenshot evidence. Provide an external OpenStreetMap view for cases where third-party embedding is blocked. No paid mapping API added.
- **Acceptance gate resolved October 24**: see verified production and screenshot evidence below. The earlier failed Leaflet-only run remains preserved as historical debugging evidence.

## Final production acceptance — October 24, 2026

**Outcome: COMPLETE for the six McAllen day-trip acceptance batches.** This section supersedes the earlier October 19 open verification note and initial October 20 map-selector failure.

- Scoped correction PR [#5832](https://github.com/keeptxred/TexasDefined/pull/5832) merged after all protected checks passed; merge SHA `5c60dbd8aceb34d64020aa11d9ba1e10f8e66b6b`. No previously merged page work was replayed.
- Production deployment [#40130054305](https://github.com/keeptxred/TexasDefined/actions/runs/40130054305) succeeded for that exact SHA, including Worker and canonical-domain health, scoped SSR production smoke. Cloudflare deployment version `cccd19b6-0d11-45fd-a25d-3a58c1edcfc9` served the tested page at 100% rollout.
- Actual GitHub Chrome post-deploy browser QA [#40130565411](https://github.com/keeptxred/TexasDefined/actions/runs/40130565411) **PASSED 47/47 desktop at 1365×900 and 47/47 mobile at 390×844**, zero page errors and no hydration mismatches. Report checked deployed SHA `5c60dbd8aceb34d64020aa11d9ba1e10f8e66b6b` and above Cloudflare Worker version (do not mistake skipped later workflows for new acceptance).
- QA artifact **[mcallen-day-trips-visual-40130565411](https://github.com/keeptxred/TexasDefined/actions/runs/40130565411/artifacts/12574757737)**, artifact ID `12574757737`, contains `qa-report.json`, `mcallen-day-trips-desktop.png`, `mcallen-day-trips-mobile.png`, `mcallen-embedded-map-desktop.png`, and `mcallen-embedded-map-mobile.png`. The desktop and mobile full-page screenshots **and both standalone embedded-map screenshots were individually visually inspected** after the run.
- Map evidence: all 10 selection controls update the selected attraction; all 10 unique Google Maps destination queries verified; standalone desktop/mobile iframe screenshots visibly show OpenStreetMap roads, Quinta Mazatlán approximate marker, zoom controls and attribution. The full-page stitched screenshots omit the map's cross-origin rendered tiles, a capture/compositing limitation, **not a genuine visitor-facing blank map**: separately captured visible iframe screenshots show the tiles and selected marker. The direct OpenStreetMap link remains a free fallback.
- Photos: both viewports loaded all **10/10** featured destination photos after actual scroll, zero reported broken loaded images. Attribution and source/license links retained for Quinta Mazatlán, Sabal Palm Sanctuary, and the museum, with existing catalog-photo provenance retained elsewhere.
- Editorial/destinations: all 10 curated selections present, including Quinta, Sabal, one Old Hidalgo Pumphouse, canonical Museum of South Texas History; Santa Ana access notice and official links retained. Earlier merged PRs #5250–#5252 govern the museum permanent redirect, initial canonical links and federal access notice; no regression detected.
- SEO: route canonical including query-param exclusion checked in both Chrome viewports; head source retains quality-gated indexability, title/meta description, CollectionPage, ItemList and BreadcrumbList and hub/county guide links. Additional geographic results remain clearly separate (2 secondary places in the accepted desktop capture), not counted as featured.
- Lodging: a single post-guide section presents Expedia, Hotels.com, Travelocity and Vrbo choices with affiliate disclosure; not embedded within featured cards. The site remains independent of AdSense. The QA checks placement, DOM navigation and absence of hydration errors, **not completed affiliate conversions or third-party booking transactions**.
- Layout: desktop cards use columns, mobile cards stack, no horizontal overflow or card overlap in Chrome. Captured mobile and desktop photographs render above and below the fold.
- No new paid services, retired site-builder usage, placeholder destination guide or indexing-threshold relaxation. No confirmed outstanding McAllen-specific defects within this bounded acceptance. The original external-provider maps and affiliate links may change later and should be handled as future maintenance, not retroactive acceptance failures.

### Ongoing restart guidance

If a later regression is reported, start from the current `main`, reread this record and the exact current production worker version, then rerun the existing bounded `scripts/ci/verify-mcallen-day-trips-visual.mjs` on exactly the one McAllen URL. Only reopen a batch on evidence of a real defect; do not replay #5296 or #5832, and do not conflate skipped workflow success with executed Chrome QA.
