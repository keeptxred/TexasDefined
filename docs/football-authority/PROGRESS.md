# Football Authority — Execution Ledger

Updated 2026-10-08. Repository: `keeptxred/TexasDefined`.

## Canonical inventory
- **1,292 source-declared existing profiles:** 1,268 UIL 2026–28 alignment slugs and 24 other featured/non-UIL profile slugs.
- This is a deterministic repository inventory; it is **not** proof that all 1,292 live URLs were individually crawled. Do not auto-create more pages or confuse reported UIL alignment with a played season.
- Unresearched school identity, images, venues and private classifications remain unknown rather than guessed.

## Batch 001 — five schools, no new assignments
1. **Wills Point:** 1965 championship, coach James Boxley, Ken Autry Davis Field; blue/white editorial milestone visuals. Licensed school/stadium photography remains unavailable.
2. **Abbott:** 2015 six-man title, 2012/2022 finals and 2024 semifinal, plus authentic public-domain circa-1950 photo and documented Abbott football alumnus Willie Nelson. Archival photo intentionally remains small.
3. **Katy:** nine state titles, Mike Johnston/Gary Joseph, Red Sea and official 2026 schedule/venue links; public-domain archival school photograph.
4. **Fort Davis:** district announced cancellation of its **2026 football season**; UIL 2026–28 classification does not establish games. Includes 2003 state-final story and licensed historic Bart Coan Field photo.
5. **Southlake Carroll:** eight actual titles, not nine; UIL 2003 recap confirms 16–15 loss to Katy. Current 2026 coach Lee Munn, source-backed schedule, Dragon Stadium and Dragons identity; licensed authentic photo remains unresolved.

Each school has an individual documented audit in `docs/football-authority/schools/`. Program-specific research and design must not be treated as a generic template update.

## Merger, deployment and current status
- **#4330**: original five researched profiles and permanent registry merged at `7ec7444474dde1db49bfe50219f5ca013b3aff49`.
- **#4331**: Katy/Fort Davis licensed historical imagery and enhanced football live assertions merged at `ad0cf18ab922c4832740c0cb969ec429a0eebb73`.
- **#4332**: public-domain Abbott archival football photo and corrected high-school portrait sizing, plus prior checkpoint, merged at `e21c9b0ed61b850cf800484ba0f1ad5c49409c0c`. Required Merge Gate, Site Quality Watchdog and orphan-link workflows succeeded.
- **Cloudflare production and live deployment checks succeeded for #4332's merge commit:** GitHub combined statuses `texasdefined-cloudflare`, `texasdefined-live` and `texasdefined-production` are success. This confirms a production deployment pipeline pass for the merged content—not independent rendered mobile or desktop certification of every school.
- The first #4330 deployment attempt ([run 37785976546](https://github.com/keeptxred/TexasDefined/actions/runs/37785976546)) failed during unrelated pre-existing Wikimedia Commons Gonzales Discover derivative generation (HTTP 429). Its later attempt completed successfully: logged cloudflare, blocking live checks, IndexNow and recovery ledger all succeeded.
- The dedicated Friday Night Lights production smoke `friday-night-lights-production-smoke.yml` is separately triggered after deployment. **Its latest post-#4332 outcome has not been independently retrieved in this chat.** Do not infer it solely from the general `texasdefined-live` status.
- Five schools are **DEPLOYED; zero are VERIFIED**. No individual real-browser desktop/mobile accessibility and image rendering passes have been observed here. The research browser could not access these five live URLs. Manual QA must not be backfilled from a successful CI job.

## Counts
| Metric | Current |
|---|---:|
| Existing source-declared profiles | 1,292 |
| Individually researched | 5 |
| Implemented | 5 |
| Merged | 5 |
| Deployed (GitHub production pipeline verified) | 5 |
| Independently VERIFIED against all applicable acceptance criteria | 0 |
| Schools not individually VERIFIED | 1,292 |

## Open acceptance work, confined to these five schools
- Visually review real production at mobile and desktop widths; verify imagery actually loads, captions/rights, title/H1, canonical, navigation, contrast, layout, official resource links and schema.
- Five targeted, SSR-visible **incoming county links** are now implemented on this PR branch but still require merge/live verification: Wills Point from Van Zandt, Abbott from Hill, Katy from Fort Bend, Fort Davis from Jeff Davis, and Southlake Carroll from Tarrant. The campus-county relationship was researched from federal public-school records (for example, Katy High is **Fort Bend**, not automatically Harris because of the city name). Independently review any remaining city/venue inbound links without adding unrelated site changes.
- Wills Point and Southlake Carroll: no independently confirmed reuse rights for the actual football/stadium photos found on school, booster, contractor and publisher sites. Do not copy or imply search-result visibility gives permission. Their original sourced graphics remain appropriate alternatives.
- Confirm school-specific coaching/schedule and game-day details that are still unsupported: Abbott 2026 head coach/stadium policy; Wills Point parking/tickets; Carroll tickets/parking; game-specific Katy venues. No fabricated facts.
- After merging this branch, inspect actual county-to-team link renderings and the independent dedicated football production smoke result; investigate any actual failures.
- Keep first five assigned until all applicable evidence and links are finished or limitations are documented. Do not claim Batch 002 in this execution chat.

## This continuation branch
- Adds five factual county-to-football-profile links plus federal campus-county citations; these are **pending merge** and therefore do not yet count as deployed.
- Adds explicit **per-school production SEO contracts** for these five profiles (unique SSR title, meaningful description, exact canonical, SportsTeam and breadcrumb schema) to the existing Friday Night Lights live smoke, and Abbott's photo license rendering assertion.
- Registry status accurately advances from MERGED to DEPLOYED, **not** VERIFIED, based on observed success statuses. Leave `actualProductionVerified=false` until real rendered manual review.
- Branch: `football-authority-batch-001-production-acceptance-20261008`. Merge only with standard required CI and current-main reconciliation.

## Handoff
Refresh latest `main`, read `MASTER.md`, `REGISTRY.json` and this ledger. Inspect/finish the above PR and required CI without lowering protections. Confirm the separate football smoke, run real deployed mobile/desktop checks for only these five, close school-specific gaps and update ledger truthfully. Do not start a sixth school during this batch.
