# Texas by the Numbers — GitHub-owned data refresh

The publication authority remains `keeptxred/TexasDefined`, with protected GitHub deployment to the existing Cloudflare Worker. No ChatGPT schedule, builder credits, pageview-triggered broad fetches, or new paid infrastructure is required for these scheduled jobs.

## Current scheduling

| Family | Job | Timing | Publication behavior |
| --- | --- | --- | --- |
| Metropolitan employment | `.github/workflows/refresh-texas-data.yml` | Monthly on the 5th, 12:41 UTC | Verifies BLS monthly release and Table 3; a newer or revised 13-metro snapshot creates a governed PR; the `Finish Texas Data Refresh` owner-side workflow validates the exact PR head and enables protected auto-merge |
| Property-tax rates | `.github/workflows/sync-property-tax-rates.yml` | Monthly on the 3rd | Updates verified rows in the existing Supabase rate registry, including historical revisions; fail-closed |
| County housing | `.github/workflows/refresh-acs-county-housing-costs.yml` | Monthly on the 6th | Checks the pinned ACS 2024 five-year source and creates a guarded snapshot PR when values change. **It does not roll its vintage forward automatically.** |
| Homeowners insurance | Supabase `texasdefined-tdi-homeowners-2025-fetch-weekly` | Weekly Mondays | Monitors official TDI 2025 premiums/coverage; detects revisions without automatically modifying the public premium/cost research page |
| Population/migration, homestead, TxDOT | Dated source-backed editorial snapshots | No independent scheduled auto-publication yet | Must be updated with specific source adapters; never silently claim these are current |

## Official-source BLS update safeguards

- Prefer the BLS metropolitan summary and Table 3 directly. When BLS returns an access-denied response to the GitHub runner, use the Federal Reserve Bank of St. Louis FRED CSV containing the **same 13 named BLS monthly, not-seasonally-adjusted, total-nonfarm-payroll series**. Validate a complete common observation month, source identity, number units, and reasonable change bounds. Do not use similarly named seasonal or annual series.
- Reject missing releases, changed table structure, missing/duplicate Texas metros, invalid source date, a backwards release month, or suspicious changes above 20% for a metro. Do not replace verified content when a source fails.
- The generated file is `src/data/generated/texas-metro-payrolls-current.json`. A stable `/texas-data/texas-metro-payrolls-latest` detail page and the four-metro hub comparison use it. Archived June and August 2026 briefs remain unchanged.
- Update the sitemap-safe date in `src/data/texas-data-center.ts` only after the source data is verified.
- The scheduled workflow is allowed to change **only** the generated BLS JSON and that sitemap-safe metadata file. It must never write directly to main.
- A `GITHUB_TOKEN`-generated PR does not trigger normal `pull_request` checks. The trusted `workflow_run` finisher reconciles with current main, dispatches existing validation workflows for the exact branch, verifies exact head/ancestry and then enables normal protected GitHub auto-merge; it never force-pushes or bypasses required validation.
- Site updates deploy via `Deploy TexasDefined production` and its existing configured cache management.

## Important remaining limitation

This implementation does **not** imply that every statistic on the hub auto-rolls to the next Census, ACS or TDI annual release. Those require independently validated source-schema adapters and updates to related editorial methodology, research CSVs and historical comparisons. Do not describe the entire hub as fully auto-updating until those adapters and their own end-to-end checks exist.
