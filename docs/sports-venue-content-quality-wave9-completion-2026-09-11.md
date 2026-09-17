# Sports venue content quality remediation — Phase 1D completion

Date: 2026-09-11

This completion record supplements the 2026-09-10 sports-venue content-quality audit and records the final Wave 9 state.

## Final coverage

- Verified sports-venue inventory: **84 venues**.
- Explicit venue-specific server editorial descriptions: **84/84**.
- Phase 1D separated quality/runtime remediation profiles: **71 venues**.
- September 5 GSC sports `IMPROVE` queue: **17/17 remediated**.
- Broader editorial-description backlog: **0**.
- Shared `Plan the trip` / `Make the venue part of the weekend` filler remains removed.
- `stayAndEat` and `nearby` remain optional rather than schema-required filler.

The remaining 13 venues retain established deep visitor profiles and explicit editorial descriptions but do not need duplicate Phase 1D remediation overlays merely to reach an artificial 84/84 overlay count.

## Wave 9 — final ten venue-specific remediations

### Amarillo National Center
- Records **3301 SE 10th Ave., Amarillo, TX 79104** and the official **5,000 permanent seats plus up to 5,000 floor seats** configuration.
- Centers the page on the Tri-State Fairgrounds arena's rodeo, ranch-horse, livestock, mounted-shooting and motorsports infrastructure rather than generic Amarillo event copy.
- Keeps gate, accessible-seating and fair/event operations controlled by the current event page.

### Extraco Events Center
- Records **4601 Bosque Blvd., Waco, TX 76710** and the complex's **1953** Coliseum roots.
- Separates the Coliseum, Show Pavilion and **55,000-square-foot BASE** rather than treating the property as one interchangeable arena.
- Preserves the Heart O' Texas Fair & Rodeo and more than 300 annual events as durable venue-specific context.

### Expo Center of Taylor County
- Records **1700 Hwy 36, Abilene, TX 79602**, the **117-acre** campus, more than **5,600 permanent seats** in Taylor Telecom Arena and roughly **5,000 parking spaces** across the property.
- Uses the West Texas Fair & Rodeo, Western Heritage Classic and recurring equine/livestock events as the durable visitor story.
- Keeps building, entrance and seating-map instructions event-specific.

### MSR Houston
- Records **1 Performance Drive, Angleton, TX 77515** and the **163-acre** motorsports campus.
- Records the **2.38-mile, 17-turn, 40-foot-wide FIA-approved road course**, separate karting circuit, large paddock and skid pad.
- Treats scheduled track access, driver schools, testing and racing as the real visitor experience rather than generic Houston motorsports language.

### Eagles Canyon Raceway
- Records **7629 North FM-51, Decatur, TX 76234**.
- Records the current **2.7-mile FIA-spec course with 15 turns / 20 apexes**, plus karting, driver-development and off-road facilities.
- Makes membership/scheduled access and current event registration central to trip planning.

### Xtreme Raceway Park
- Records **1800 S Interstate 45 Service Rd., Ferris, TX 75125** and current I-45 access guidance.
- Centers the venue on active drag racing, bracket/specialty events, test-and-tune and fan-focused covered viewing rather than generic Dallas-area racing copy.
- Does not freeze event-specific parking or admission details.

### Houston Motorsports Park
- Records **11620 N Lake Houston Pkwy, Houston, TX 77044**.
- Preserves the venue's current 2026 combined **oval + drag-strip** identity across grassroots race nights, street nights and test-and-tune events.
- Keeps gates, classes, schedules and prices controlled by the live event posts instead of evergreen copy.

### National Shooting Complex
- Records **5931 Roft Road, San Antonio, TX 78253** and the **696-acre** championship complex.
- Centers the page on the National Skeet Shooting Association / National Sporting Clays Association headquarters role and major championship competition.
- Keeps field assignments and competition programs tied to the current event map/program rather than generic shooting-sports advice.

### Waco Surf
- Records **5347 Old Mexia Road, Waco, TX 76705**.
- Separates surf-lagoon sessions, cable-park wakeboarding, seasonal water-park activities and on-property lodging as distinct activity products.
- Explicitly treats activity status and reservation availability as live operational data; temporary equipment or seasonal notices are not frozen into evergreen editorial copy.

### Lee and Joe Jamail Texas Swimming Center
- Records **1900 Red River St., Austin, TX 78712**, **1979** competitive opening, **2,100 fixed seats plus 500 portable seats**, 50-meter competition pool and dedicated diving well/tower.
- Centers the description on Texas swimming and diving plus major collegiate, scholastic and national aquatic competition.
- Preserves current meet-specific spectator, deck and parking guidance as event-controlled information.

## Governance added at completion

`validate-sports-venue-deep-completeness.mjs` now fails closed unless:

- exactly **84** seeded sports venues remain in the governed inventory;
- exactly **84** unique explicit server editorial descriptions exist across the primary and Wave 6–9 registries;
- every seeded sports-venue slug has an explicit server editorial description;
- all ten Wave 9 slugs retain both quality and runtime remediation records;
- all ten Wave 9 slugs retain explicit Wave 9 editorial descriptions;
- the Wave 8 editorial registry delegates misses to Wave 9; and
- the combined enrichment lookup checks Wave 9 before the legacy enrichment fallbacks.

This keeps the final editorial-completeness contract inside the existing protected sports-venue validation path without weakening the earlier 74/84 coverage checks.

## Editorial standard after Phase 1D

Venue pages should continue to prefer fewer, durable, source-backed facts over generic travel filler. First-party venue/team/university/city/district sources control durable facts. Frequently changing prices, parking assignments, gate times, schedules, field assignments and attraction availability should remain linked to the current official source rather than being converted into permanent copy.
