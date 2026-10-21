# Texas pro-team weekend guides

Thirteen independently authored guides live at /sports/teams/{slug}, discovered through /sports, the team index, matching venue guides and the primary sitemap's static route registry.

## Commercial behavior
Home games reuse the canonical event registry and EventTicketCta. Selection requires the correct sports venue, complete team name and a fixture-style title; concerts, parking passes, deposits, tours and cancelled/postponed events cannot become home games. Filtering precedes the 12-game display limit. Existing ticket-provider freshness and affiliate attribution rules remain authoritative. Official team schedules remain available when inventory is missing. No new ticket partnership or fabricated affiliate URL is introduced.

The lodging bootstraps recognize only team detail routes, wait for the owning React guide to hydrate and use the explicit active-venue slot. They reuse existing curated venue hotels, Expedia search and CJ hotel comparison choices. Viator links use the existing approved market mapping, affiliate builder and click tracker. A market catalog is labeled as such and never presented as a specific stadium tour.

## Changing sports information
An optional server-only ESPN adapter resolves exact team identity within its league, then retrieves the overall record and provider standing summary. It caches source responses for at most 15 minutes, preserves the original retrieval timestamp, uses a shared 3.5-second request budget and returns no fabricated record on failure. It refreshes automatically on demand without a paid service or a separate ChatGPT schedule. The provider may retain the completed season in the offseason, which the guide explicitly explains. Official league standings remain one click away.

Major updates are limited to three linked ESPN reports from the last 21 days. Exact team metadata, HTTPS source URLs, significant-move terms and non-rumor language are required. The official team's announcements or transactions are always available. No full news articles or daily story stream are republished.

## Venue transitions and imagery
Wings pages distinguish College Park Center and American Airlines Center and preserve the official 2027 move announcement. Spurs pages warn that special games can occur outside San Antonio. Venue photographs reuse the existing rights-governed image registry with attribution; they are labeled as venue photographs. Game cards omit repeated venue imagery.

## Verification
The canonical premerge runner includes src/data/pro-teams.test.mjs for 13-team coverage, independent content, home-game isolation, venue changes, record integrity and significant-update filtering. Run the entire canonical contract before PR creation and after reconciliation, then verify the deployed pages and commercial surfaces in the browser.
