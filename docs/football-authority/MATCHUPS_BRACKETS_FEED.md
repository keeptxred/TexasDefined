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

**2026-10-20 update:** The TexasDefined owner generated and supplied the **actual 6A Division I MaxPreps tournament widget code**. The provider uses an anchor with `class="maxpreps-widget-link"` and data attributes, plus the external script `https://www.maxpreps.com/includes/js/widget/widget.compressed.js`, **not an iframe**. The exact generated `href`, public widget member ID, 900×600 dimensions, and scrollbar preference are recorded in `src/data/high-school-football/maxpreps-bracket-embeds.ts`, and `src/components/sports/MaxPrepsTournamentWidget.tsx` loads the external provider script on the client only. The JSX preserves a static subtree so MaxPreps can enhance the anchor without React overwriting the provider DOM. Only the 6A D1 bracket has genuine provider-issued widget code at this point; the other eleven use official UIL and MaxPreps direct links.

To enable another bracket:

1. Use UIL's official bracket page to open the relevant MaxPreps tournament, then choose **Add to My Site** or the [tournament widget builder](https://www.maxpreps.com/widgets/create_tournament_widget.aspx).
2. Sign in to a regular MaxPreps account and confirm the widget is actually **no-charge** before proceeding. Do not provide payment credentials or subscribe.
3. Copy the complete generated MaxPreps HTML snippet for that **specific bracket**. Check the provider-issued `href`, `data-member-id`, `data-type`, `data-width`, `data-height`, and `data-allow-scrollbar` against the tournament label. Add the verified values to the `approvedMaxPrepsJsTournamentWidgets` map. Do not infer an account identifier or reuse 6A D1 values for other tournaments without checking provider output.
4. Validate the actual provider-rendered widget in Chrome at mobile/desktop and verify the selected year, bracket and updates. Preserve UIL and MaxPreps direct links as fallback. Never interpret the widget as a raw JSON API license.

Do **not** iframe the ordinary UIL or MaxPreps web page or guess an embed endpoint: they can prohibit third-party framing. The provider-generated JavaScript widget is used only for the approved bracket. Do **not** scrape brackets or treat a MaxPreps widget as a licensed raw JSON feed. All result dates and qualifiers remain controlled by UIL and MaxPreps, and actual native TexasDefined matchup pages still require separate verified source data. No Cloudflare CPU, scheduled scans, or new service subscription is required to display the official links.


### Verified 2026 provider-specific widget-creation links (October 19)

Every link below was reached through the matching public MaxPreps tournament's **Add to My Site** control. Each is preselected to the correct 2026 UIL bracket. These links open the widget-creator screen, **not** an existing embed and not a no-cost pricing guarantee. MaxPreps requires an authenticated account to generate the actual widget HTML.

| UIL bracket | MaxPreps Add to My Site |
| --- | --- |
| 1A D1 | [Open matching widget creator](https://www.maxpreps.com/widgets/create_tournament_widget.aspx?bracketid=bde6ec22-c928-4019-a011-ecbd6f1bae67&ssid=2286cd80-c46d-4739-8dd1-92a67ca8daa7&tournamentid=7a33d24f-4de2-43eb-aa37-7987d5c334ab) |
| 1A D2 | [Open matching widget creator](https://www.maxpreps.com/widgets/create_tournament_widget.aspx?bracketid=02fd2729-c7dc-4a3b-9d19-cc492d9ce3db&ssid=2286cd80-c46d-4739-8dd1-92a67ca8daa7&tournamentid=7a33d24f-4de2-43eb-aa37-7987d5c334ab) |
| 2A D1 | [Open matching widget creator](https://www.maxpreps.com/widgets/create_tournament_widget.aspx?bracketid=d558b0ac-9921-463a-baca-a73c26203e38&ssid=2286cd80-c46d-4739-8dd1-92a67ca8daa7&tournamentid=7a33d24f-4de2-43eb-aa37-7987d5c334ab) |
| 2A D2 | [Open matching widget creator](https://www.maxpreps.com/widgets/create_tournament_widget.aspx?bracketid=68a6915d-fa00-4faa-8dae-1aa653502be4&ssid=2286cd80-c46d-4739-8dd1-92a67ca8daa7&tournamentid=7a33d24f-4de2-43eb-aa37-7987d5c334ab) |
| 3A D1 | [Open matching widget creator](https://www.maxpreps.com/widgets/create_tournament_widget.aspx?bracketid=e3805d8a-fb1e-4bf0-ac81-193ab795180d&ssid=2286cd80-c46d-4739-8dd1-92a67ca8daa7&tournamentid=7a33d24f-4de2-43eb-aa37-7987d5c334ab) |
| 3A D2 | [Open matching widget creator](https://www.maxpreps.com/widgets/create_tournament_widget.aspx?bracketid=4eecdfe3-1ecc-4aa8-a6b9-7127939288ae&ssid=2286cd80-c46d-4739-8dd1-92a67ca8daa7&tournamentid=7a33d24f-4de2-43eb-aa37-7987d5c334ab) |
| 4A D1 | [Open matching widget creator](https://www.maxpreps.com/widgets/create_tournament_widget.aspx?bracketid=0723a324-be87-49da-9461-4063c2294e90&ssid=2286cd80-c46d-4739-8dd1-92a67ca8daa7&tournamentid=7a33d24f-4de2-43eb-aa37-7987d5c334ab) |
| 4A D2 | [Open matching widget creator](https://www.maxpreps.com/widgets/create_tournament_widget.aspx?bracketid=b2d6af41-4c12-46c4-8008-1af85dde7341&ssid=2286cd80-c46d-4739-8dd1-92a67ca8daa7&tournamentid=7a33d24f-4de2-43eb-aa37-7987d5c334ab) |
| 5A D1 | [Open matching widget creator](https://www.maxpreps.com/widgets/create_tournament_widget.aspx?bracketid=4cc4d252-d23d-41ad-b706-761d65cdfe58&ssid=2286cd80-c46d-4739-8dd1-92a67ca8daa7&tournamentid=7a33d24f-4de2-43eb-aa37-7987d5c334ab) |
| 5A D2 | [Open matching widget creator](https://www.maxpreps.com/widgets/create_tournament_widget.aspx?bracketid=15f0b8b4-192d-4208-828c-4f26f39ce6a8&ssid=2286cd80-c46d-4739-8dd1-92a67ca8daa7&tournamentid=7a33d24f-4de2-43eb-aa37-7987d5c334ab) |
| 6A D1 | [Open matching widget creator](https://www.maxpreps.com/widgets/create_tournament_widget.aspx?bracketid=ade72ad3-0f62-42ef-a2cb-143bf425942b&ssid=2286cd80-c46d-4739-8dd1-92a67ca8daa7&tournamentid=7a33d24f-4de2-43eb-aa37-7987d5c334ab) |
| 6A D2 | [Open matching widget creator](https://www.maxpreps.com/widgets/create_tournament_widget.aspx?bracketid=412dffeb-8db4-405a-90d8-d835b3a6ca23&ssid=2286cd80-c46d-4739-8dd1-92a67ca8daa7&tournamentid=7a33d24f-4de2-43eb-aa37-7987d5c334ab) |

The public tournament page and its matching provider widget-creation URL are also stored in `src/data/high-school-football/maxpreps-2026-uil-tournaments.ts` for exact source reference. Do not paste widget **creation** links into the iframe config. A signed-in MaxPreps account must supply the final generated HTML; if the widget requires payment, do not proceed without user approval.

## Daily score and bracket updates

UIL uses MaxPreps for scores and championship brackets, but public display does not constitute a third-party redistribution license or a stable open data API. Do not scrape MaxPreps/UIL or infer postseason winners. Secure explicit permission for a machine-readable feed before enabling ingestion.

Repo **variable**: `FOOTBALL_RESULTS_FEED_URL` — provider-authorized HTTPS URL.
Repo **secret**: `FOOTBALL_RESULTS_FEED_TOKEN` — optional bearer token, when required.

Until the URL variable is configured, the scheduled job is skipped; it costs no Cloudflare CPU and publishes no imaginary fresh scores. With the variable set, the GitHub Actions workflow makes one bounded HTTPS feed request per day during Aug–Dec, validates records and score evidence, and opens a changed-data PR rather than bypassing production protections. A conflicting published final stops with an error for source reconciliation.

Feed shape: `{"season":"2026","games":[{...complete matchup record...}]}`. Use `football-matchups.snapshot.json` for the complete JSON shape. Final scores require nonnegative integer home/away scores and an HTTPS result citation. Playoff entries additionally require a class, division (1/2), and named round. Never treat an unfilled internal bracket as proof that the UIL has not posted a bracket.

The sitemap contains the inaugural manually verified routes only. When scheduled ingestion adds games, update the sitemap source to be data-derived rather than indexing fictitious matchups. The index should remain bounded, so do not ingest statewide schedules into every client bundle without a separately planned data store.

## Verification and operating cost

Do focused checks: validate the matchup and bracket routes, render both pages, verify source links and meta tags, then verify production after passing PR checks. Do not run a sitewide crawl after every result update. No auto-merge of results is enabled until required checks and an approved authoritative feed are established.
