# Sports venue content quality audit — 2026-09-10

Scope: all 84 currently verified TexasDefined sports-venue guides, with Phase 1D remediation focused on content/data rather than the parallel venue-layout work.

## Measured duplication and structural causes

- **84/84 venue pages** still expose the shared `Plan the trip` block from `src/routes/sports-venue.$slug.tsx`, including the identical heading **“Make the venue part of the weekend”** and the identical card labels **“Why people travel,” “Best trip pattern,” and “Before you go.”** The body copy comes from only 12 tag-based `venueProfile()` templates. This block remains a global layout concern and is intentionally not redesigned in Phase 1D.
- **84/84 venue records** are shaped by `SportsVenueEnrichment`, which currently requires `stayAndEat` and `nearby` strings. That schema encourages every record to produce lodging/weekend copy even when there is no venue-specific guidance worth publishing. Phase 1D does not break that shared schema; the quality-profile layers separate durable visitor facts, editorial history and source-review metadata so a later schema/layout migration can remove mandatory filler safely.
- The two knowledge-graph seed files (`major-sports-venues.ts` and `sports-venues-tier2.ts`) synthesize every base venue description from a small set of category templates plus a common wrapper sentence. Before Phase 1D, only **15 of 84** venue descriptions had venue-specific server editorial overrides, leaving **69 of 84** exposed to the helper-generated description pattern. The initial batch raised explicit editorial coverage to **18 of 84**. The second wave adds DKR–Texas Memorial Stadium, Dell Diamond and Foster Pavilion, bringing the total to **21 of 84** and leaving **63** candidates for record-by-record remediation.
- **84/84 venue quick-answer components** formerly included `TexasExplainedContextLinks surface="sports"`, regardless of whether those links were meaningfully related to the venue. Phase 1D removed that forced link injection.
- Because `verifiedAt` is mandatory in the enrichment schema, the quick-answer surface had framed source-review metadata as **“How current is this [venue] visitor guide?”** The review date is now displayed as source metadata, not as a consumer FAQ or FAQ-schema question.

## Initial batch remediated

### Amon G. Carter Stadium

- Corrected official capacity from the old approximate 40,000 wording to **46,000**.
- Records the official **2850 Stadium Drive, Fort Worth, TX 76109** address, natural-grass Moncrief Field, TCU football/Big 12 context, current accessibility guidance and current clear-bag/entry guidance in the separated quality profile.
- Replaced generic arrival copy with current TCU football guidance, including the current 90-minute gate-opening guidance while explicitly treating it as changeable game-day policy.
- Replaced generic Fort Worth weekend copy with TCU-campus-specific geography and removed the implication that unrelated Tarrant County attractions are venue-adjacent.

### Gerald J. Ford Stadium

- Added verified **33,200** capacity and **2000** opening year.
- Replaced season-specific history with durable venue history: the 2024 Garry Weber End Zone Complex and the natural-grass field installed in 2025.
- Records SMU/ACC context, current accessibility and clear-bag/security policy in the separated quality profile.
- Replaced generic Dallas lodging copy with campus/parking constraints, including SMU's warning about resident-only parking near the campus.

### Globe Life Field

- Added verified **approximately 40,300** capacity and **2020** opening year.
- Records the official **734 Stadium Drive, Arlington, TX 76011** address, Texas Rangers/MLB context, and Shaw Sports Turf B1K synthetic playing surface.
- Replaced generic entertainment-district weekend language with event-specific cashless parking/open-time guidance, accessibility/bag-policy source links and defensible immediate context: AT&T Stadium, Choctaw Stadium and Texas Live!.

### American Airlines Center

- Added verified **2001** opening year and event configuration capacities of **20,000 for basketball / 18,532 for hockey** from AAC's own venue description.
- Records the official **2500 Victory Avenue, Dallas, TX 75219** address, Mavericks/NBA and Stars/NHL context, accessibility and current bag/security policy.
- Replaced generic downtown-weekend copy with Victory Station rail access, current arena parking operations and Victory Park-specific context.

### Texas Motor Speedway

- Added verified **1997** opening year, official **3545 Lone Star Circle, Fort Worth, TX 76177** address and current track/property facts.
- Replaced generic “race weekend” filler with the operationally relevant scale of the 1.5-mile oval / 1,500-acre property, route-specific parking, camping and current race-day arrival guidance.
- Explicitly avoids presenting central Fort Worth attractions as if they are adjacent to the speedway.

## Second remediation wave

### DKR–Texas Memorial Stadium

- Replaced the approximate “more than 100,000” capacity with Texas Athletics' official **100,119** figure and records the **2139 San Jacinto Blvd., Austin, TX 78712** physical address.
- Records the current FieldTurf surface, Texas football/SEC context, current clear-bag policy, ADA guidance and the 2026 two-hours-before-kickoff general gate guidance as changeable event-day policy.
- Corrects the planning source to the canonical Texas Athletics DKR facility page instead of relying on the misleading `/facilities/bobcat-stadium/1` CMS alias.
- Replaces generic Austin weekend copy with campus-specific parking, gate assignment and central-Austin geography.

### Dell Diamond

- Records **8,631 permanent seats plus roughly 3,000 outfield-lawn capacity**, opened **2000**, the official **3400 E. Palm Valley Blvd., Round Rock, TX 78665** address, TifTuf Bermuda grass, Round Rock Express and Pacific Coast League/Texas Rangers affiliate context.
- Adds current official accessible-parking/ADA-entry and clear-bag guidance.
- Treats the approximately one-hour standard game gate opening as a changeable Express policy and avoids freezing event-specific parking prices into evergreen copy.
- Replaces generic Austin-area sports-weekend language with the actual east-Round-Rock/US 79 visitor context.

### Foster Pavilion

- Records the **January 2024** opening, **7,000+** capacity including roughly 500 standing-room spaces, Baylor men's and women's basketball and Big 12 context.
- Separates current public/BBF parking, accessible shuttle, clear-bag, no-re-entry and 60-minute gate guidance from durable venue history.
- Replaces generic Waco weekend language with the pavilion's actual Brazos River / Baylor campus / downtown-edge geography.

## Source standard used in this remediation

The eight remediated records use venue/team/university-operated sources for durable facts and official visitor guidance. Frequently changing policies are summarized conservatively and linked back to the official current page instead of being treated as permanent facts.

## Deferred global layout/schema work

Phase 1D intentionally does **not** redesign the global `Plan the trip` section or other shared venue-page composition. Those are global layout/schema decisions. The audit above keeps the remaining template problem visible so the layout work can remove or conditionally render weak sections rather than preserving generic content for SEO.

## Remaining remediation queue

The remaining **63** venues without explicit editorial-description overrides should be handled venue by venue, prioritizing pages with search impressions and major-tourist-draw tags. The same standard should apply: authoritative durable facts first, event-specific rules via official links, no required weekend filler, and no nearby/internal link unless geography or editorial relevance justifies it.
