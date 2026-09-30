# TexasDefined Events operational growth audit

Review date: 2026-09-30
Scope: Events only

This audit covers the remaining non-GSC operational work after the Events expansion was merged and deployed.

## Freshness automation

### Daily event sync

The production `Sync Texas Events` workflow is scheduled at `17 11 * * *` UTC.

Current contract remains appropriate:

- source-aware event refresh;
- generated catalog writes only;
- no-op detection;
- branch/PR publication instead of direct protected-`main` writes;
- stale/cancelled Ticketmaster inventory suppression;
- no inferred annual dates;
- stable source-review timestamps when source facts are unchanged.

### Temporal production verification

The independent temporal verifier is scheduled at `23 11 * * *` UTC and also runs after production deployments. This is intentionally separate from the content sync so a successful fetch/write cannot hide a bad live temporal surface.

### September 30 deployment evidence

The September 30 Events deployment and its dedicated post-deploy completion workflow both passed. The live production job verified expanded Events surfaces after the Worker deployment. This confirms that the newly strengthened weekend/city inventory is not merely present in source control; the production routes rendered successfully under the existing guardrails.

## Stale-date and recurrence decision

No change to the existing policy is warranted:

- past occurrences must not appear as future;
- an evergreen event entity may remain discoverable between editions;
- scheduled `Event` schema requires a supported current occurrence;
- annual recurrence is not evidence of next year's date;
- cancelled, postponed and rescheduled lifecycle states remain authoritative over commercial availability;
- Ticketmaster remains a commercial discovery/ticket source, not the canonical event-status authority.

## Weekend workflow maturity

`src/data/events/weekend-editorial-package.server.ts` now provides a reusable package for the statewide canonical weekend collection.

It produces:

- newsletter subject;
- preheader;
- heading and intro;
- Markdown newsletter body;
- Facebook copy;
- Instagram copy;
- X copy;
- the permanent guide paths used as source material.

The package is deliberately send-neutral. It does not send email, publish social posts or schedule distribution. This is the right boundary until a newsletter/social send is explicitly authorized.

### Recommended editorial shipping rhythm

Keep the permanent `/events/this-weekend` URL and use the following operating cadence:

1. **Monday-Tuesday:** source refresh and regional-gap review.
2. **Wednesday:** review low-confidence/one-source queue and remove anything that cannot be defended.
3. **Thursday:** lock the editorial picks, regional balance and practical planning callouts.
4. **Friday morning:** generate the reusable weekend package from the same verified collection.
5. **Weekend:** only lifecycle corrections, cancellations or materially important schedule changes; do not manufacture fake freshness.
6. **Monday:** allow the same evergreen URL to roll forward rather than creating disposable weekly URLs.

## Regional balance rule

A statewide weekend package should not become a Houston/DFW-only product simply because those metros have the deepest feeds.

Prefer a balanced set when source-qualified inventory exists, but never weaken the source threshold to fill a geographic quota. Thin regions should appear when they have defensible permanent guides, not because every edition needs an artificial eight-region checklist.

## QA queue

Every weekly review should surface:

- events with only one weak/secondary source;
- events whose official source has not been rechecked recently enough for the operating details being claimed;
- image-incomplete permanent guides;
- future occurrences derived only from historical recurrence;
- ticket inventory whose commercial freshness is near the existing cutoff;
- cancelled/postponed/rescheduled events still present in active discovery;
- metro-heavy editorial selections that can be improved with equally strong regional alternatives.

## Monetization audit

The current event monetization stack is sufficient and should not be expanded with thin affiliate-first pages.

### Ticket intent

Major event guides already support provider-neutral ticket metadata and only render an actionable ticket CTA when current ticket inventory exists. Affiliate placements are explicitly marked in the page layer.

Keep this sequence:

1. official event facts and current lifecycle status;
2. actionable ticket CTA only when inventory is current;
3. no fabricated ticket price or implied availability;
4. organizer facts always override marketplace inventory.

### Stay-nearby intent

Major event pages already have the governed Hotels.com affiliate path for lodging intent. Use lodging placement most strongly on destination-scale events where an overnight stay is a natural visitor job.

Do not turn small local events into hotel funnels simply because an affiliate link is available.

### Local dining / destination value

Prefer internal links to existing TexasDefined city, county, food and destination guides before inventing commercial modules. A strong event page should help readers answer:

- where is the event actually held;
- where should I stay if I need an overnight trip;
- what can I do nearby;
- what city/county context matters;
- where can I verify the latest organizer information.

### Sponsorship

Event/venue sponsorship is a legitimate future revenue layer through the existing partner/advertiser infrastructure, but sponsorship must remain visibly commercial and cannot change event rankings, source facts, cancellation status or editorial inclusion standards.

## Relationship/backlink workflow

The separate source-relationship priority document identifies first-wave targets in the Panhandle, Big Bend/Far West, Piney Woods and South Texas/RGV.

When outreach is explicitly authorized, the first ask should be:

1. corrections/updates;
2. recurring event announcements;
3. rights-cleared photography;
4. source attribution/organizer introductions;
5. backlink/reference only when the TexasDefined page is already strong enough to be genuinely useful.

Do not send outreach automatically from this workflow.

## Next measurable checkpoints

- finalized GSC impressions/clicks for `/events/this-weekend` after the September 30 deployment;
- whether Big Bend and Rodeos maintain page-one visibility while CTR improves;
- whether Austin and San Antonio weekend hubs continue to clear the source-qualified content threshold as the date window rolls;
- whether Panhandle, Far West, Piney Woods and RGV permanent-guide counts improve through first-party source expansion;
- whether event-session growth preserves the strong engagement seen on the statewide `/events` hub;
- whether new commercial placements add value without increasing thin or stale event pages.
