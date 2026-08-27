# Major Texas event inventory disposition — 2026-08-27

This file closes the research-accounting loop for the supplied 75-event discovery inventory used to expand TexasDefined's major-event authority layer.

## Verification rule

The supplied inventory is a discovery seed, not a publication authority. Permanent `/event/{slug}` guides may use:

- an organizer- or host-published current/future date;
- a clearly disclosed recurrence-derived date when the organizer publishes a stable annual rule; or
- the latest confirmed occurrence when the seed projects a future year that the organizer has not yet published.

Do not turn a projected seed date into `EventScheduled` markup merely because it appears in the inventory. If the current event is cancelled or no longer exists under the seeded identity, do not create scheduled Event markup.

## Material corrections already incorporated

The authority work intentionally corrected or replaced several seed records rather than copying them:

- South by Southwest: official 2027 conference/festival dates are March 15-21, not the seed's March 12-21 range.
- Texas SandFest: official 2027 dates are April 16-18, not the seed's May 14-16 range.
- George West Storyfest: replaced by the currently active Dobie Dichos literary event rather than preserving a stale event identity.
- San Antonio Rock 'n' Roll Marathon: replaced by the current San Antonio Marathon identity.
- Larry Joe Taylor Coastal Cowboy Festival: replaced by the organizer's active Larry Joe Taylor Texas Music Festival in Stephenville.
- General Granbury's Birthday Festival: represented by the active Granbury Founders Day Jubilee identity.
- Texas Legacies Outdoor Drama: represented by the currently active TEXAS Outdoor Musical at Palo Duro Canyon.
- Great American Scrapbook Convention: organizer now lists GASC-Mesquite at the Mesquite Convention Center for June 4-5, 2027, superseding the seed's July 2027 Arlington projection.
- Vague statewide Juneteenth seed: represented with a sourced Galveston Juneteenth celebrations authority record rather than inventing one statewide event schedule.

## Seed records intentionally not promoted to scheduled authority pages

These are not incomplete implementation tasks. They are research holds or rejected seed identities until stronger organizer evidence appears.

| Seed item | Disposition | Evidence / reason | Recheck trigger |
| --- | --- | --- | --- |
| Contemporary Austin's Critter Ball | Hold | Current Contemporary Austin searches do not surface an organizer-backed current Critter Ball event matching the seed. | Official Contemporary Austin event announcement with a specific date and public event page. |
| Texas Ranger Association Gathering | Hold / lower priority | The Texas Ranger Association Foundation documents an annual Retired Ranger Reunion in June in Waco, but the seed's March 2027 public-event framing is not supported. The reunion is primarily for retired/active Rangers, families and foundation participants. | Organizer publishes a dated public-facing 2027 event suitable for general travel discovery. |
| Inks Lake Spring Wildflower Viewing | Reject as singular annual event | Texas Parks and Wildlife publishes individual ranger walks/programs, not a single annual statewide event matching the seed identity. | TPWD creates a dated annual event page under a stable identity. |
| Stagecoach Ballroom Western Days | Reject seed identity | Stagecoach Ballroom's current official site publishes its regular Friday/Saturday/Sunday dance-hall programming, but no current named annual “Western Days” event matching the seed was verified. | Stagecoach Ballroom publishes a named dated Western Days event. |
| Texas State Arts & Crafts Fair | Hold | Hill Country Arts Foundation identifies the annual fair, but the 2025 fair was cancelled after Hill Country flooding and a current organizer-confirmed 2026/2027 fair schedule was not established. Third-party projected dates are insufficient. | HCAF publishes the next fair dates on its own event/calendar pages. |
| Arlington Highlands Summer Fest | Reject / unverified | No current organizer-backed annual event matching the seed identity was established. | Arlington Highlands publishes a dated event under that name or a clearly continuous successor identity. |
| Billy Bob's July 4th Picnic | Reject seed identity | Billy Bob's current calendar supports individual Independence Day-period concerts, not a current annual event under the seed's “July 4th Picnic” identity. | Billy Bob's publishes a named multi-day July 4th Picnic event page. |
| Texas Rangers Fan Fest (2027 seed) | Hold | The Rangers announced a January 24, 2026 Fan Fest, but that event was cancelled because of frozen precipitation. No organizer-confirmed 2027 Fan Fest date has been established. Existing event-page JSON-LD assumes `EventScheduled`, so a cancelled occurrence must not be represented as scheduled. | Texas Rangers publish a new 2027 Fan Fest date. |

## Existing-guide / duplicate handling

- State Fair of Texas already has a dedicated TexasDefined guide and should not receive a competing duplicate authority identity.
- The seed's “Chili Appreciation Society Cookoff” overlaps the CASI Terlingua championship authority work; do not create a second page merely from alternate seed wording.
- Recurrence-backed records such as Luling Watermelon Thump, National Polka Festival, Schulenburg Festival and Westfest must retain their recurrence disclosure until the organizer publishes the dedicated year schedule.

## Recheck queue

Priority rechecks should be source-driven rather than calendar guesses:

1. Texas Rangers Fan Fest 2027 announcement.
2. Hill Country Arts Foundation next Texas Arts & Crafts Fair schedule.
3. Any official 2027 schedules that replace latest-confirmed-2026 authority occurrences, including Poteet Strawberry Festival, Comicpalooza, Tejano Conjunto Festival, Great Texas Balloon Race, Rockport Art Festival, Viva! El Paso and Texas Shakespeare Festival.
4. Any official organizer revival of a rejected seed identity above.

When a recheck succeeds, update the server-only authority record and `sourceCheckedAt`, preserve the permanent slug when the event identity is continuous, update sitemap `lastmod`, and run the full protected CI / client-performance gate before merge.
