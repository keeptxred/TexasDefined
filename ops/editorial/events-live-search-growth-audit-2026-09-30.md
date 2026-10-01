# TexasDefined Events live search-growth audit

Review date: 2026-09-30
Scope: Events only

This audit replaces the older repository-only Events search snapshot with live connected Google Search Console and GA4 evidence. It is intentionally conservative: early impressions are used to identify opportunities, not as permission to churn titles, create thin pages or weaken current indexability safeguards.

## Data windows and caveats

- Google Search Console account: `sc-domain:texasdefined.com`
- GSC window: 2026-08-31 through 2026-09-27, using finalized data rather than the freshest incomplete days.
- GA4 property: TexasDefined (`552999834`)
- GA4 window: 2026-08-31 through 2026-09-27.
- GSC anonymizes some low-volume queries, so page aggregates can be materially larger than the visible query rows.
- Newly deployed September 30 surfaces such as the strengthened `/events/this-weekend` and Austin/San Antonio weekend inventory are too new for this window to evaluate fairly.

## Live GSC Events baseline

| Page | Clicks | Impressions | CTR | Avg position | Interpretation |
| --- | ---: | ---: | ---: | ---: | --- |
| `/events` | 2 | 157 | 1.27% | 32.43 | Statewide hub is being discovered but is still mostly outside the high-CTR range. Internal authority and crawl demand matter more than title churn here. |
| `/events/rodeos` | 1 | 63 | 1.59% | 6.81 | Strongest immediate CTR watch candidate. Ranking is already competitive enough that snippet/title performance matters. |
| `/events/big-bend-events` | 0 | 66 | 0% | 7.80 | Highest-priority zero-click watch candidate. Query rows are too anonymized to justify a speculative title rewrite yet. |
| `/events/gulf-coast-events` | 0 | 23 | 0% | 6.91 | Page-one visibility is emerging; wait for more query evidence before changing the search promise. |
| `/events/north-texas-events` | 0 | 35 | 0% | 10.31 | Borderline page-one visibility; current geography/title alignment is already strong. |
| `/events/seasonal-events` | 0 | 10 | 0% | 11.40 | Too little aggregate volume for intervention. Visible query `seasonal events` appeared at about position 7.8 on five impressions. |
| `/events/arts-culture` | 0 | 3 | 0% | 74.00 | Not enough signal. |
| `/events/piney-woods-events` | 0 | 1 | 0% | 96.00 | Discovery/authority problem, not CTR. |

Visible query examples include `events in texas`, `texas events`, `events in texas this weekend`, `north texas events`, `north texas festivals`, and `seasonal events`. The statewide hub has impressions across broad event/festival intent, but the visible query sample is too sparse to infer a safe winning title from query text alone.

## Live GA4 Events baseline

| Page | Sessions | Active users | Views | Engagement rate | Avg session duration |
| --- | ---: | ---: | ---: | ---: | ---: |
| `/events` | 22 | 20 | 44 | 77.27% | 71.66s |
| `/events/big-bend-events` | 1 | 1 | 1 | 0% | 0.25s |
| `/events/christmas-events` | 1 | 1 | 1 | 100% | 5.11s |
| `/events/county-fairs` | 1 | 1 | 1 | 0% | 5.17s |
| `/events/panhandle-events` | 1 | 1 | 1 | 100% | 17.57s |
| `/events/rodeos` | 1 | 1 | 1 | 100% | 12.40s |
| `/events/south-texas-events` | 1 | 1 | 1 | 100% | 49.30s |
| `/events/tournaments-basketball` | 1 | 1 | 1 | 100% | 25.67s |

The statewide `/events` hub is the only Events surface with enough GA4 volume in this window to interpret behavior. Its engagement is healthy enough that the immediate problem is acquisition scale, not obvious landing-page rejection.

## CTR intervention rules

Do not rewrite an Events title or description merely because CTR is 0% on a tiny sample. A metadata intervention should normally require all of the following:

1. at least 50 finalized GSC impressions in the comparison window;
2. average position roughly 3-20;
3. CTR materially below expectation for that position;
4. enough visible query evidence to identify a mismatch in intent, geography or wording;
5. no conflict with the permanent evergreen URL model or annual-date freshness rules.

Current watchlist:

- **Rodeos:** qualifies on impressions and position; collect more visible query evidence before changing a currently accurate title.
- **Big Bend:** qualifies on impressions and position and is the highest-priority zero-click page, but query anonymization is still too severe for a defensible title rewrite.
- **Gulf Coast:** position qualifies but volume is below the 50-impression default threshold.
- **North Texas:** near threshold; preserve current title while impressions accumulate.

## Search actions now justified

- Keep the September 30 permanent `this-weekend` architecture intact and measure the canonical evergreen URL rather than creating weekly URLs.
- Use first-party source expansion to increase permanent-guide depth in Piney Woods, Panhandle/High Plains, South Texas/RGV and Big Bend/Far West instead of manufacturing thin location pages.
- Continue linking permanent event guides into region, timing, city and topic surfaces so Google has multiple contextual crawl paths.
- Keep image-incomplete event leaves `noindex, follow` and outside sitemaps until a rights-compliant hero exists; search pressure is not a reason to bypass image governance.
- Re-run this audit after the newly deployed weekend/city inventory has had a finalized GSC observation window.

## Cannibalization decision

No evidence in the live query sample justifies collapsing the statewide, region, topic or rolling-weekend architecture. The page purposes are distinct: statewide discovery, durable regional comparison, durable topic authority and time-sensitive weekend planning. Continue watching for the same query appearing with meaningful impressions across multiple indexable Events URLs before changing canonicals or consolidating pages.

## Success measures for the next review

- Growth in finalized impressions and clicks for `/events/this-weekend` after the September 30 deployment.
- Big Bend and Rodeos CTR movement while maintaining page-one visibility.
- More Event collection pages reaching at least 50 impressions in a 28-day window.
- New permanent guides from currently thin regions earning crawl impressions without lowering source or image standards.
- Increased GA4 sessions to Events surfaces with engagement comparable to the statewide hub rather than low-quality bounce traffic.
