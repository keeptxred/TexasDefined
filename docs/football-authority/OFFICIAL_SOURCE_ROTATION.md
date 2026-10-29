# Football authority official-source rotation (GitHub owned)

**Checkpoint: October 29, 2026.** This is a bounded school/UIL source-change watcher, **not** a public scoreboard feed, licensed MaxPreps API, player-image acquisition system or automatic coaching fact publisher. The original official-source watcher predates this rotation.

## Coverage and cost

- Canonical source list: `docs/football-authority/official-source-watch.json`, currently **37 approved HTTPS source endpoints**: 25 current Batch010 school programs, ten researched Batch009 programs, the individually sourced Frisco Lone Star program, and one official UIL alignment endpoint. This is a monitored subset of the 1,292 school universe, not a false claim that all 1,292 have primary-source automation.
- A single run processes **at most 25 source URLs**. An integer `nextSourceIndex` persists where the next run begins. Circular selection of 25 from 37 covers all 37 within **two successful runs** without scanning the entire site or increasing Cloudflare Worker CPU usage.
- All rows must belong to an existing canonical school registry slug, except the approved `uil-2026-alignment` marker. Every HTTPS host is explicitly allowlisted; redirects outside the approved host set fail. 12-second per-source timeout and 1.6MB body cap remain enforced.
- Year-round Tuesday 12:43 UTC check; additional Saturday 12:23 UTC check August–December (configured in the existing GitHub Actions workflow). Lone Star's 2026 Frisco ISD varsity schedule joins the same rotation, with an explicit January 29, 2027 quarter-boundary editorial review deadline. No new duplicate scheduled workflow.

## Evidence and protected updates

Each run creates an artifact recording total sources, actually checked sources, cursor start/end, changes, missing/overdue checks, and source failures. A source fingerprint change triggers an editorial review issue **without** assuming a new coach, final score, ticket price, site rights or UIL district. Technical source hash/cursor changes go to one protected PR with auto-merge only after Required merge gate succeeds; no direct writes to main.

The cursor advances after a completed bounded probe. The next run starts at the persisted cursor. If a job fails before finishing and publishing the ledger, the cursor remains unchanged and the same cohort is safely retried. When an authorized score data provider becomes available, that is handled separately by `.github/workflows/refresh-football-scores-brackets.yml` and its source-rights safeguards, not by scraping watched school pages.

## Expanding beyond this cohort

As school-specific research is completed in later batches, add one school-owned URL at a time with validated canonical slug and approved host. The inventory cap is finite (1,500 URLs, more than the 1,292-school universe) and per-run requests remain capped at 25. Do not add generic aggregator scores, private student information, prohibited scraping sources or URLs whose use is not legitimate. Review source deadlines deliberately. Coach appointments, district reclassification, stadium access and records are published only after independent factual validation and protected deployment.
