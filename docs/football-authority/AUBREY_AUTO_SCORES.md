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
