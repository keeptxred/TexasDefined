# Aubrey football: verified automatic score updates (2026)

## Activation status and rights

The Aubrey site can accept automatically verified final scores through two independently authorized machine-readable JSON feeds. **Until both source URLs are configured and legitimately licensed, the workflow fails visibly and opens a GitHub setup issue. It does not auto-publish scores.** Public MaxPreps/UIL pages and widgets are *not* machine-data licenses and must not be scraped for these feeds.

Repository **Actions variables**:
- `AUBREY_SCORE_FEED_PRIMARY_URL`: licensed HTTPS JSON source one
- `AUBREY_SCORE_FEED_SECONDARY_URL`: separately hosted licensed HTTPS JSON source two

Optional repository **Actions secrets**:
- `AUBREY_SCORE_FEED_PRIMARY_TOKEN`: primary provider bearer credential
- `AUBREY_SCORE_FEED_SECONDARY_TOKEN`: secondary provider bearer credential

The providers must expressly authorize automated data extraction/processing and the public display of the resulting facts with citations. Two endpoints for the same underlying provider are not independent; different hostnames are mandatory but not by themselves sufficient evidence of genuine editorial independence.

## November 12, 2026 — manual regular-season verification (not an API authorization)

The previously published Aubrey page still carried the October 16 (4–3, 4–0) snapshot because the licensed automatic score feeds remain unconfigured. A one-time, individual-source editorial review verified the final three regular-season games, each using two distinct public source publications:

| Date | Result | Independent references |
| --- | --- | --- |
| 2026-10-23 | Aubrey 28, Lake Dallas 21 | [MaxPreps game](https://www.maxpreps.com/tx/football/game/aubrey-vs-lake-dallas-corinth/10-23-2026/?c=5c4d82c3-101a-4f9e-b7d3-db9701873193), [Denton County Football Beat](https://www.dentoncountyfb.com/event/2026-aubrey-vs-lake-dallas/) |
| 2026-10-30 | Aubrey 70, Alvarado 40 | [MaxPreps game](https://www.maxpreps.com/tx/football/game/alvarado-vs-aubrey/10-30-2026/?c=90afab36-dc46-44fc-8df8-bd3c9ea0f8b9), [High School On SI](https://www.si.com/high-school/stats/texas/29243-division-4a1/football/scores?date=2026-10-30) |
| 2026-11-06 | Aubrey 55, Godley 22 | [MaxPreps game](https://www.maxpreps.com/tx/football/game/aubrey-vs-godley/11-6-2026/?c=a0a3b34c-60a4-482e-b20b-dac3abb57b93), [High School On SI](https://www.si.com/high-school/texas/texas-high-school-football-final-scores-results-november-6-01m6rw22dr0m) |

The ten-game **regular-season** record is therefore **7–3 overall / 7–0 district**, through November 6. A separate 4A Division I bi-district matchup against Andrews was scheduled for Thursday November 12 at Sweetwater Mustang Bowl; that game is **not** a known final in this record and must not be added to the ten-game ledger until a verified result is available. [Midland Reporter-Telegram schedule](https://www.mrt.com/sports/highschool/article/andrews-football-faces-aubrey-4a-division-22523740.php). This is a venue correction: the reported bi-district game is at Sweetwater, not the Aubrey home stadium suggested by some generic matchup templates.

These three factual scores were individually researched and cited by an editor, then stored with `verificationMethod: "manual-editorial-review"`. This is **not** a licensed API feed, does not permit automated extraction of MaxPreps or the other publishers, and does not close the unattended-feed issue. The two independent licensed machine-readable feed variables remain required for future automatic updates. The importer preserves previously published verified results when a current authorized feed omits historical games, but fails on any later contradictory report. All automatic score PRs still require the protected checks and normal production deployment.

## Required provider response

Each feed responds to one bounded HTTPS GET with JSON and a maximum of 16 Aubrey results for the 2026 season. The schema is:

```json
{
  "season": "2026",
  "teamSlug": "aubrey",
  "games": [
    {
      "date": "2026-10-23",
      "opponent": "Lake Dallas",
      "status": "final",
      "aubreyScore": 21,
      "opponentScore": 17,
      "sourceUrl": "https://approved-score-source.example.org/results/aubrey-2026-10-23"
    }
  ]
}
```

**The example scores are fictional test values, NOT a verified result and NOT authorized for publication.** Use an empty `games` list when no results are confirmed. The source URL for each result must be on its corresponding feed hostname. Dates are in Texas local calendar time. Both feeds must identify the same existing scheduled opponent and game date and independently agree on both integer scores; ties, future/unlisted games, changing opponents, duplicate dates, private-IP targets, redirects, conflicts, or rewrites of previously published finals fail closed.

## Operation and deployment

- Source: `.github/workflows/aubrey-verified-score-sync.yml`. Runs daily August–December with an additional weekend run, plus manual dispatch. No paid Cloudflare cron needed.
- Validation: `scripts/data/update-aubrey-verified-results.mjs` compares source reports with the immutable ten-game Aubrey 2026 schedule in `program-editorial.ts`; updates only the small `aubrey-auto-results.snapshot.json`.
- Presentation: `applyAubreyAutoResults` in the school profile loader overlays agreed finals and recomputes wins, losses, district record, last result source, last-verification date and description. Other school profiles do not change. Previously authored final scores cannot be rewritten silently.
- Publication: the daily workflow opens a one-file score PR. `finish-aubrey-score-sync.yml` (triggered by the successful owner-side run) checks the bot author, PR identity and exact diff, reconciles current main, executes the repository's exact-sha full premerge and merge-gate verification, and requests protected auto-merge. Once merged, existing Cloudflare deployment handles production. **No direct main pushes or branch-protection bypasses.**
- Hold cases: absent authorized feeds create a visible blocker issue; missing independent score confirmation creates a review issue. Provider errors or conflicts fail the run; unpublished scores remain blank rather than invented. Correct the source record and rerun.
- Costs: GitHub Actions usage and any provider fees depend on account/provider terms. Do not purchase a feed subscription without owner approval. No additional Cloudflare Worker scheduling or scores scraping is added.

A successful unit test or merged workflow is **not** proof of current source connectivity. To certify true unattended publishing, first configure both licensed URLs, run the workflow against a real independently reported new final, verify that the protected PR auto-merges, and inspect the actual live Aubrey page. Until that end-to-end check succeeds, label the system **prepared, source-connection blocked**, not live-updating.
