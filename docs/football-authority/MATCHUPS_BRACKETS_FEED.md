# TexasDefined 2026 football matchups and brackets

**Initial rollout: 2026-10-16.** This feature is not an official or live MaxPreps feed.

## Pages
- `/texas-high-school-football-matchups`: curated, source-backed matchups.
- `/texas-high-school-football-matchups/$slug`: game page with verified schedule or reported final and team links.
- `/texas-high-school-football-playoff-brackets`: interactive class/division selector for the 12 UIL playoff paths, links to the corresponding authoritative UIL bracket; local rounds only appear after individually verified games are imported.

The first Memorial–Alief Taylor matchup is sourced to MaxPreps and Memorial's published schedule. The 42–18 result comes from the *Houston Chronicle* Week 8 score report; it is a reported final, not independently certified as UIL-official. Current schedule cards are not live scores.

## Official postseason brackets: zero-fetch public links, optional MaxPreps embed (2026-10-17)

The brackets page now gives direct, always-current **UIL official links to all 12 class/division paths**, with source-first access from the selected bracket. Links are free for readers and **do not** require a game-results feed or server polling.

MaxPreps [publishes a tournament widget creation tool](https://www.maxpreps.com/widgets/create_tournament_widget.aspx) and explicitly permits site owners to embed its brackets so source updates appear automatically. **It requires a signed-in MaxPreps account before issuing embed code.** As of this implementation, no unauthenticated, verified embed URL or published price for this specific widget has been established; do not state that embedded brackets are already live or buy a subscription on assumption.

Implementation: `src/data/high-school-football/maxpreps-bracket-embeds.ts` is intentionally empty until provider-generated embed URLs are available. To add a bracket:

1. Use UIL's official bracket page to open the relevant MaxPreps tournament, then choose **Add to My Site** or the [tournament widget builder](https://www.maxpreps.com/widgets/create_tournament_widget.aspx).
2. Sign in to a regular MaxPreps account and confirm the widget is actually **no-charge** before proceeding. Do not provide payment credentials or subscribe.
3. Copy the actual MaxPreps-generated embed snippet. If it contains a standalone HTTPS iframe `src`, check the allowed hostname and add that exact URL in the mapping as `'6AD1': 'https://...'` etc. If the provider supplies only a JS script, **review and implement that documented integration separately**; do not put a script URL in an iframe.
4. Validate a single frame in Chrome on mobile/desktop and verify it displays the intended 2026 bracket and updates from the official source. Apply to remaining 11 only after a successful test; retain direct official links as fallback.

Do **not** iframe the ordinary UIL or MaxPreps web page or guess an embed endpoint: they can prohibit third-party framing. Do **not** scrape brackets or treat a MaxPreps widget as a licensed raw JSON feed. All result dates and qualifiers remain controlled by UIL and MaxPreps, and actual native TexasDefined matchup pages still require separate verified source data. No Cloudflare CPU, scheduled scans, or new service subscription is required to display the official links.

## Daily score and bracket updates

UIL uses MaxPreps for scores and championship brackets, but public display does not constitute a third-party redistribution license or a stable open data API. Do not scrape MaxPreps/UIL or infer postseason winners. Secure explicit permission for a machine-readable feed before enabling ingestion.

Repo **variable**: `FOOTBALL_RESULTS_FEED_URL` — provider-authorized HTTPS URL.
Repo **secret**: `FOOTBALL_RESULTS_FEED_TOKEN` — optional bearer token, when required.

Until the URL variable is configured, the scheduled job is skipped; it costs no Cloudflare CPU and publishes no imaginary fresh scores. With the variable set, the GitHub Actions workflow makes one bounded HTTPS feed request per day during Aug–Dec, validates records and score evidence, and opens a changed-data PR rather than bypassing production protections. A conflicting published final stops with an error for source reconciliation.

Feed shape: `{"season":"2026","games":[{...complete matchup record...}]}`. Use `football-matchups.snapshot.json` for the complete JSON shape. Final scores require nonnegative integer home/away scores and an HTTPS result citation. Playoff entries additionally require a class, division (1/2), and named round. Never treat an unfilled internal bracket as proof that the UIL has not posted a bracket.

The sitemap contains the inaugural manually verified routes only. When scheduled ingestion adds games, update the sitemap source to be data-derived rather than indexing fictitious matchups. The index should remain bounded, so do not ingest statewide schedules into every client bundle without a separately planned data store.

## Verification and operating cost

Do focused checks: validate the matchup and bracket routes, render both pages, verify source links and meta tags, then verify production after passing PR checks. Do not run a sitewide crawl after every result update. No auto-merge of results is enabled until required checks and an approved authoritative feed are established.
