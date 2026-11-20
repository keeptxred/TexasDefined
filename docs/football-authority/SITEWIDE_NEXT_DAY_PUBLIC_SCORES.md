# TexasDefined statewide football: next-day scores and district standings

**Policy effective November 20, 2026:** Look up final scores **the day after games**, using first-party schools, UIL, and published public sports coverage. No paid feeds, real-time scores, or unattended score publication.

## All current football URLs are inventoried

The scheduled job indexes the exact 2026–28 UIL alignment: **1,268 team canonicals and 192 district canonicals**. It narrows active score lookups to published season schedules and result tables with a past-dated game missing a verified final, plus dated standings snapshots that need rechecking. Directory-only pages without 2026 scores are **not** falsely identified as outdated. Source inputs include the independently reviewed matchup snapshot and authored team and district datasets (including Districts 5, 11, 16, 21 and Katy/District 22). A file with multiple teams is not attributed to a particular school without its canonical slug or an independently matching opponent.

The complete URL inventory and unconfirmed fixture data are kept in a dated GitHub Action JSON artifact. Each published score research lead has the date, teams or district, source name, public article link, and an explicit **unverified** label. News RSS headline metadata is used for discovery only. Source pages that cannot be independently verified are left unchanged.

## GitHub schedule

See [the statewide football workflow](../../.github/workflows/refresh-football-scores-brackets.yml).

- **Daily during August–December, 17:37 UTC**: next-day score and standings research, including Saturday after Friday-night games.
- **Every Saturday during January–July, 17:37 UTC**: historical corrections, missed source links, and refresh evidence.
- **Eight parallel fixed GitHub shards** cover the 1,460 canonical inventory and audit actual outdated source data. Each shard investigates at most 32 source candidates per run. Recent past games are prioritized, and older open items rotate through later runs. The report records the complete queue and the items not yet researched; no item is silently discarded.
- The eight reports are combined into one statewide issue, with full source-linked JSON/Markdown artifacts retained for 30 days.
- The separate Canyon Lake next-day job and Aubrey local freshness monitor remain. The earlier statewide and Aubrey scheduled paid-feed import paths are retired from scheduled execution.

## Correcting the website

This is a **source review** system, not a publication bot. After confirming a final through reliable current reports, update the authored game ledger, the affected team pages, district records, W–L/point totals, playoff status, next opponent and any time-sensitive text through a normal protected editorial pull request. Never infer a certified UIL standings position or a playoff seed from incomplete district results. Deploy through the existing Cloudflare release checks and verify the fresh live pages.

An overdue game with no verified public result should display **Result awaiting verification**, not an invented final or an upcoming game. Score and district standings must not be portrayed as complete when only partial games have been source-verified. The research workflow does not re-date old historical scores just to manufacture freshness.

**Completion boundary:** Successful scheduled research means the backlog was inventoried and public sources were searched. It does not prove every team has a complete current record or every district an official final standings table. The outstanding evidence-backed corrections remain open for individual publication and validation.
