# TexasDefined Events system completion

Review date: 2026-09-30
Scope: Events only

This review closes the 18-item Events backlog without creating thin doorway pages, weakening source standards, bypassing image-rights safeguards or changing unrelated TexasDefined systems.

## Task 1 — Austin weekend inventory

Completed. Three first-party sourced permanent guides were added for the October 2-4 weekend: AustOberfest, Boo at the Zoo and Ta Se Dhin Tak Tabla Festival. Austin City Limits Music Festival was already present for October 2-4. Together they provide at least four source-qualified permanent Austin-area guides for the rolling weekend threshold.

## Task 2 — San Antonio weekend inventory

Completed. Four permanent guides were added for October 2-4: San Antonio Black International Film Festival, Historic Market Square 12th Annual Car Show, Tejanos at the Alamo and the Monarch Butterfly & Pollinator Festival. Each uses an event owner, venue or public-institution page as the factual authority.

## Task 3 — Broaden event-source coverage

Completed for the current priority gap. The source registry now records automated statewide sources, first-party Austin and San Antonio sources, secondary discovery sources, and the next geographic source-expansion priorities. First-party organizer/venue/public-agency pages remain authoritative for dates, lifecycle and operating details.

## Task 4 — Geographic coverage audit

Completed. Houston/Gulf Coast core and DFW/North Texas are currently strong; Austin and San Antonio were strengthened in this pass. East Texas/Piney Woods and South Texas/RGV are moderate and seasonal. Panhandle/High Plains and Big Bend/Far West remain the thinnest corridors and are explicitly prioritized for future first-party discovery. Thin regions are not padded simply to make an indexable page.

## Task 5 — Category and interest coverage audit

Completed. Durable topic authority already exists for rodeos, food, music, arts/culture, seasonal/holiday events, sports and tournaments. Family-friendly, outdoors, free and Worth-the-Drive are better handled as sections/filters inside strong rolling pages until each intent has sustained permanent-guide depth.

## Task 6 — Additional dedicated landing-page evaluation

Completed. No new thin landing pages are being created. A future dedicated family/free/outdoor weekend page should require at least six source-qualified permanent guides in its live window and should maintain that depth across repeated refreshes. One unusually busy weekend is not sufficient evidence for a standalone SEO surface.

## Task 7 — Event collection UX audit

Completed. Temporal collection pages expose a current verified date window, a clear planning section, source-policy context, verified-guide counts, related event paths and fail-closed indexability. The permanent URL rolls forward rather than spawning year/week duplicate URLs.

## Task 8 — Individual event UX/content audit

Completed. The permanent event template already supports event-specific title/description, visible source trail, planning sections, ticket CTAs when actionable, stay-nearby placement, parking map placement, related discovery links and Event JSON-LD when occurrence/image requirements are satisfied. The seven new guides follow the same planning/source/relationship structure.

## Task 9 — Event image audit

Completed as a rights-and-indexability audit. The event image model requires documented source provenance, commercial-use approval, location truthfulness and explicit image-source type. Prohibited social/review hosts cannot be treated as image provenance. Image-incomplete permanent guides fail closed to `noindex, follow` and remain out of the sitemap rather than borrowing an unauthorized organizer photo. Failed enrichment images are hidden cleanly on the client.

The new event guides deliberately do not claim image compliance without a rights-cleared asset. They can participate in reader-facing rolling discovery, but their permanent leaves remain fail-closed for search until the existing image governance accepts a compliant hero.

## Task 10 — Social-preview audit

Completed. Individual event metadata runs through the shared `buildMeta` path with event-specific title, description, canonical, image and image alt when a compliant event image exists. Image-incomplete guides do not pretend that a generic organizer image is safe. Collection pages retain their existing canonical/social metadata contract.

## Task 11 — Internal-link coverage audit

Completed. The event hub links timing, topic and region collections. The new Austin guides backlink to Austin This Weekend and relevant Austin/topic/county surfaces; the new San Antonio guides backlink to San Antonio This Weekend and relevant area/topic/county surfaces. Permanent guides remain available to regional/month/season discovery through the shared authority directory.

## Task 12 — Historical and expired event cleanup audit

Completed. Past occurrences are removed from the active major-event landing directory. Reviewed permanent authority guides may remain discoverable as evergreen entities between annual editions, while the sitemap separately enforces image compliance. Expired occurrence data does not justify a current scheduled Event claim.

## Task 13 — Recurring-event rollover audit

Completed. Multi-window events use explicit occurrence windows; annual events require a newly verified official date instead of copying last year's weekend. Recurrence-derived planning windows remain visibly labeled where that model is intentionally used. The source registry now makes the no-inference rule explicit.

## Task 14 — Cancellation/postponement monitoring

Completed as a source-governed lifecycle contract. Canonical event records and schema support scheduled, cancelled, postponed and rescheduled states with lifecycle source/verification data. Ticketmaster records marked cancelled/postponed/rescheduled are suppressed from live commercial discovery, and stale Ticketmaster inventory is hidden after 48 hours.

## Task 15 — Event refresh automation reliability

Completed. The daily Sync Texas Events workflow runs at 11:17 UTC, uses non-cancelling concurrency, checks out current `main`, writes only generated event catalogs, detects no-op runs, creates a branch/PR for changes and prevalidates the generated branch without bypassing branch protection. The safe annual-source sync preserves stable `sourceCheckedAt` values for unchanged records. The independent temporal-production verifier runs daily and after successful production deploys.

The completion validator is also scheduled so future changes to the event architecture fail visibly if they remove any of these contracts.

## Task 16 — Event-specific GSC/indexation review

Completed using the latest stored repository GSC snapshot (2026-09-13) plus current technical indexability safeguards. That snapshot records 69 individual event URLs and 40 event-collection URLs in Google's `Discovered - currently not indexed` issue family. The snapshot itself warns that this is a crawl-demand signal, not proof that every URL has a page-quality defect.

Response: keep strong permanent guides/qualified collections crawlable; strengthen source depth, internal linking and freshness; noindex thin temporal pages automatically; do not blanket-noindex the event family merely because Google has not crawled every discovered URL. Current live temporal verification separately checks canonical, robots and sitemap behavior.

## Task 17 — Event monetization review

Completed. The existing event page layer already supports provider-neutral ticket metadata and only renders an actionable ticket CTA when current inventory exists. Affiliate links are labeled with sponsored/nofollow semantics. A stay-nearby slot and Hotels.com affiliate path already exist for lodging intent. No fake ticket price, inactive partnership or checkout capability is introduced.

Highest-value event monetization sequence remains: current ticket CTA where verified, nearby lodging for destination-scale events, then event/venue sponsorship packages through existing advertiser infrastructure. Monetization must never override organizer facts or event safety/status information.

## Task 18 — Reusable newsletter/social output

Completed. `src/data/events/weekend-editorial-package.server.ts` turns the already source-qualified statewide `this-weekend` collection into a reusable subject, preheader, newsletter Markdown body and Facebook/Instagram/X copy. It is deliberately send-neutral: it does not enable a newsletter, send mail, schedule posts or publish to social networks.

## Indexability decision after this pass

The rolling Austin and San Antonio weekend collections now have enough source-qualified permanent guides in the current October 2-4 window to satisfy the existing four-guide content threshold once this branch is deployed. Individual newly added event leaves remain governed independently by the existing image-compliance indexability gate; no rights-cleared hero means noindex and no sitemap inclusion.

## Ongoing fail-closed rules

- First-party source beats directory/aggregator copy.
- No inferred annual dates.
- No thin dedicated interest landing page below sustained depth.
- No unauthorized event imagery.
- No Event schema for unsupported current occurrences.
- No cancelled/postponed/rescheduled commercial inventory in active discovery.
- No stale Ticketmaster catalog after the existing freshness window.
- No direct automation write around protected `main`.
- No newsletter/social sending is activated by this work.
