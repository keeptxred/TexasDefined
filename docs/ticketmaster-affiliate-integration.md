# Ticketmaster affiliate integration

The approved TexasDefined Ticketmaster app supplies Discovery API event data. The consumer key lives only in the GitHub Actions secret `TICKETMASTER_API_KEY`; no consumer secret or Impact access token is needed. The approved public Impact link template is configured in the existing Sync Texas Events workflow. Credentials must never be committed or passed to client code.

The daily workflow fetches the next 90 days of US/Texas Ticketmaster events into `src/data/generated/ticketmaster-events.json`. Weekly request windows split further before the API's 1,000-result pagination limit; requests are paced below two per second and capped at 500. Failed, incomplete, or empty refreshes preserve the prior snapshot and fail the job. The existing protected event-refresh PR, validation, merge, and deployment process publishes successful updates.

The initial empty snapshot is intentional: the first successful workflow refresh populates live data. Run Sync Texas Events after this integration merges. Until then the existing editorial calendar is unchanged.

The server adapter maps known cities through the canonical geography index, matches venue pages through the existing exact venue resolver, and feeds the shared calendar and carousel. Unknown cities, test events, unknown dates, cancellations, postponements and reschedules are omitted. Snapshots older than 48 hours disappear from the calendar so stale commercial listings are not presented as current. No unlicensed provider images are imported. Prices are not cached or advertised.

The calendar now filters the complete upcoming inventory on the server before applying its existing 48-result response bound. The former 200-row pre-filter limit would make later dates and less common cities unreachable with Ticketmaster volume. Carousel (12 items) and venue (9 items) response limits remain enforced; the full snapshot is never sent to the client.

Raw API event URLs initially appeared without affiliate tracking; after profile propagation, Ticketmaster began returning Impact-wrapped links. The importer accepts both formats. Wrapped links must match the configured publisher/program exactly and contain one validated HTTPS ticketmaster.com event destination. It then uses the approved Impact-generated US template with the official destination encoded in `u` and TexasDefined placement tags. The shared ticket resolver supplies one sponsored Find Tickets CTA and a visible affiliate disclosure. An affiliate click does not guarantee commission; eligibility is governed by the Ticketmaster/Impact agreement.

Run `node --test scripts/events/ticketmaster-discovery.test.mjs`, `node scripts/data/validate-ticketmaster-integration.mjs`, and the canonical `node scripts/ci/run-premerge-validation.mjs` before merging. After the first data refresh deploys, verify a future Ticketmaster event appears in `/events`, its ticket button targets `ticketmaster.evyy.net/c/7758914/264167/4272`, its decoded `u` parameter is the matching event, and the disclosure appears. Verify a known matching sports venue also shows its events. The provider owns checkout; no test purchase is required.

References: https://developer.ticketmaster.com/products-and-docs/apis/discovery-api/v2/ and https://developer.ticketmaster.com/support/faq/#affiliates-a.
