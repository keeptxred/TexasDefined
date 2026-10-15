# TexasDefined TPWD 90-site park-by-park completion matrix

Source: `TPWD_OFFICIAL_90_SITE_INVENTORY_2026-10-12.json` on main 4fedab37c37d9fd8f4e72caeaf300e06e6e22c1b.
Snapshot: 2026-10-15. This is a truthful baseline/backlog, not an authority certification. Local 84/84 structural readiness was reported by the merged park diagnostic; full editorial/sitewide production acceptance remains outstanding.
Current Supabase spot-check: 335 associated TPWD park source records in `/destination` or `/explore` scope, 333 HTTP 200, 2 never checked (both Devil's Sinkhole). Separately, all `state-park`/`state-natural-area` acceptance-path records found were `needs_research` (153, including aliases and non-primary pages). Figures are snapshots, not individualized acceptance.
Preserve special statuses (83 public parks, 1 guided-only property, 6 developing/closed/auxiliary records). Do not mark any guide accepted without page-specific source, facilities, image, editorial, discovery, affiliate and production evidence.

## Record fields

`editorial_authority`, `facilities`, `official_source`, `photo_license`, `entrance_map`, `internal_links`, `affiliate_relevance`, `seo_indexability`, and `production_verification` are independent completion gates. A 'locally_ready' SEO field is *not* a live check. To close a row, replace status fields with dated evidence and link the PR/commit plus tested URL.

## Machine-readable matrix

The authoritative current matrix is in the companion CSV `TPWD_90_AUTHORITY_COMPLETION_MATRIX_2026-10-15.csv`, with one record per TPWD official entry.

## Known review priorities

1. Confirm real-time `/explore/state-parks` count and all 84 canonical routes against a fresh deployed Worker; search-engine copies still display 38 and cannot prove current live behavior.
2. Complete source-monitor fetches for the two Devil's Sinkhole URLs using existing scheduled jobs; then compare tour departure, schedule, fee and accessibility facts with published page.
3. Review changed park-related source flags for Abilene main/auxiliary RV loop and Fort Parker lake; do not unflag without fact reconciliation.
4. Individually confirm hero correctness and licensing, park units/facilities, reciprocal links, offers, and SERP/SEO behavior before marking an authority guide accepted.

## Completed technical foundation (not the completion certificate)

- Merged PRs #4697, #4950, #4951, #4955.
- Current source-backed inventory classifies public/guided/special properties.
- Static readiness and runtime diagnostics exist; do not replace them with repeated expensive sitewide scans.

