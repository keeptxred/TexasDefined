# TexasDefined Event rich-result and lifecycle policy

Updated: 2026-09-30

This policy governs public TexasDefined event URLs, Event JSON-LD, event collection pages, sitemap inclusion, and lifecycle changes. It follows current Google Search Central Event structured-data guidance and Schema.org EventStatusType semantics.

## Canonical ownership

- Genuine individual event authority pages own Event JSON-LD. The canonical pattern is `/event/:slug`, except for deliberate permanent individual-event authority pages such as `/texas-state-fair`.
- Collection, region, weekend, month, category, filter, search, and discovery pages must not emit Event rich-result entities merely because they list events. They use CollectionPage/ItemList/WebPage markup and link to individual event pages.
- One public URL must represent one stable event identity. Multi-venue events at the same time require distinct occurrences when the locations are genuinely separate; filtered result sets are never disguised as individual events.

## Required Event contract

An Event entity must have a truthful name, startDate, physical Place location with PostalAddress, and a stable canonical URL. TexasDefined also emits, when applicable and verified, endDate, eventStatus, OfflineEventAttendanceMode, description, image, organizer, offers, performer, and previousStartDate.

Date-only ISO values are intentional when a trustworthy start/end clock time is not published. Do not invent midnight or UTC timestamps. When a trustworthy time is known, store the local time with the correct UTC offset.

Optional structured-data properties fail closed. Invalid organizer/performer entities, malformed ticket offers, unsupported availability values, invalid lifecycle metadata, and noncompliant images are omitted instead of being emitted as malformed JSON-LD.

## Recurring and multi-window events

A stable annual guide may remain one permanent editorial URL, but each genuinely scheduled occurrence window emitted in JSON-LD is a separate Event object with its own startDate/endDate. Recurrence-derived planning windows are not eligible for scheduled Event markup until a first-party source confirms the actual occurrence.

## Lifecycle handling

### Scheduled

Use `https://schema.org/EventScheduled`. Keep the verified current startDate/endDate and all other known properties.

### Cancelled

Use `https://schema.org/EventCancelled`. Keep the original startDate and location rather than deleting them; they help Google and readers identify the event whose status changed.

### Postponed

Use `https://schema.org/EventPostponed` when no replacement date is known. Keep the original startDate and location. Do not publish `previousStartDate` for postponed pages in TexasDefined's Google-facing contract.

### Rescheduled

Use `https://schema.org/EventRescheduled`. Update startDate/endDate to the new schedule and publish `previousStartDate` with the former verified date. `previousStartDate` is rejected for non-rescheduled statuses.

## Ended and expired events

Event rich-result eligibility is occurrence-based, while editorial authority URLs can be permanent.

- Confirmed occurrences that have ended no longer emit stale EventScheduled JSON-LD. The page downgrades to evergreen WebPage/Thing semantics until a new first-party occurrence is confirmed.
- Permanent annual authority guides can remain indexable and discoverable if they continue to provide useful planning/history/source value and have a compliant image.
- Thin, duplicate, or low-value expired occurrence pages should not be created as permanent URLs. Temporary feed-only occurrences disappear from active event surfaces after their Texas-local end date.
- Sitemap inclusion for permanent event authority guides is not tied solely to whether the most recent occurrence is still active. Image compliance and the site's normal SEO/public-route governance remain required.

## Images

Event images must represent the marked-up event or its actual location and satisfy TexasDefined's rights/provenance rules. Generic fallbacks are not valid permanent Event imagery. Pages without a compliant event image fail closed from indexing until remediated; they retain `follow` and `max-image-preview:large` behavior.

## Offers

Ticket offers are emitted only when a reviewed source supports a current public purchase/admission URL and numeric price. Price is non-negative and uses USD. When present, availability is limited to Google's supported InStock, SoldOut, or PreOrder values. `validFrom` and `validThrough` must use ISO date/date-time formatting. Unreleased ticketing data is omitted rather than guessed.

## Production verification

CI protects the source contract and production smoke tests verify rendered JSON-LD, canonical tags, indexing behavior, collection-page separation, lifecycle suppression, and representative event pages. Production verification should include at least one normal scheduled event, one recurring/multi-window event, one recurrence-derived guide whose Event markup is intentionally withheld, and the State Fair permanent event page.
