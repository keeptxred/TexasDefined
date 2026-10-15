# TexasDefined TPWD 90-site park-by-park completion matrix

Source: `TPWD_OFFICIAL_90_SITE_INVENTORY_2026-10-12.json` on main 4fedab37c37d9fd8f4e72caeaf300e06e6e22c1b.
Snapshot: 2026-10-15. This is a truthful baseline/backlog, not an authority certification. Local 84/84 structural readiness was reported by the merged park diagnostic; full editorial/sitewide production acceptance remains outstanding.
Supabase source-monitor update, checked October 15, 2026: all 335 previously inventoried TPWD park sources had responded HTTP 200, including both Devil's Sinkhole pages that were unprobed at the initial matrix snapshot. Successful HTTP fetches do NOT certify facts, photo rights or published editorial quality. The park acceptance queue remains in `needs_research` (153 state-park/natural-area-pattern paths in the initial snapshot, including aliases and non-primary pages). Registry `source_changed` remains a review signal, not proof that the corresponding guide is stale; in-scope priority cases include Abilene's park and RV-loop aliases and the separately indexed Fort Parker lake. Do not clear them without comparing published facts against source changes.
Preserve special statuses (83 public parks, 1 guided-only property, 6 developing/closed/auxiliary records). Do not mark any guide accepted without page-specific source, facilities, image, editorial, discovery, affiliate and production evidence.

## Record fields

`editorial_authority`, `facilities`, `official_source`, `photo_license`, `entrance_map`, `internal_links`, `affiliate_relevance`, `seo_indexability`, and `production_verification` are independent completion gates. A 'locally_ready' SEO field is *not* a live check. To close a row, replace status fields with dated evidence and link the PR/commit plus tested URL.

## Machine-readable matrix

The authoritative current matrix is in the companion CSV `TPWD_90_AUTHORITY_COMPLETION_MATRIX_2026-10-15.csv`, with one record per TPWD official entry.

## Known review priorities

1. Confirm real-time `/explore/state-parks` count and all 84 canonical routes against a fresh deployed Worker; search-engine copies still display 38 and cannot prove current live behavior.
2. Devil's Sinkhole's two source-monitor URLs were fetched and baselined HTTP 200 on October 15; its official tour departure, season, fees and platform access were compared with the published source-backed authority overlay. Canonical hero mapping and post-dedup recovery still need deployed-page verification.
3. Review changed source flags for Abilene main/RV-loop and Fort Parker lake; current Abilene park-alert warnings (lake restrictions, pool closure and burn ban) were incorporated in the facility layer, but third-party reservation and lake access source fingerprints are still pending comparative editorial review. Do not unflag merely because a warning was added.
4. Individually confirm hero correctness and licensing, park units/facilities, reciprocal links, offers, and SERP/SEO behavior before marking an authority guide accepted.

## Completed technical foundation (not the completion certificate)

- Merged PRs #4697, #4950, #4951, #4955.
- Current source-backed inventory classifies public/guided/special properties.
- Static readiness and runtime diagnostics exist; do not replace them with repeated expensive sitewide scans.

