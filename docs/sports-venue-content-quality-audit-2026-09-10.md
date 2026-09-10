# Sports venue content quality audit — 2026-09-10

Scope: all 84 currently verified TexasDefined sports-venue guides, with Phase 1D remediation focused on content/data rather than the parallel venue-layout work.

## Measured duplication and structural causes

- **84/84 venue pages** render the shared `Plan the trip` block from `src/routes/sports-venue.$slug.tsx`, including the identical heading **“Make the venue part of the weekend”** and the identical card labels **“Why people travel,” “Best trip pattern,” and “Before you go.”** The body copy comes from only 12 tag-based `venueProfile()` templates. This block is intentionally not changed in Phase 1D because the parallel Phase 1A layout work owns the global venue-page composition.
- **84/84 venue records** are shaped by `SportsVenueEnrichment`, which currently requires `stayAndEat` and `nearby` strings. That schema encourages every record to produce lodging/weekend copy even when there is no venue-specific guidance worth publishing. Phase 1D does not break that shared schema; the new quality-profile layer separates durable visitor facts, editorial history and source-review metadata so the layout/schema work can migrate away from mandatory filler safely.
- The two knowledge-graph seed files (`major-sports-venues.ts` and `sports-venues-tier2.ts`) synthesize every base venue description from a small set of category templates plus a common wrapper sentence. Before this batch, only **15 of 84** venue descriptions had venue-specific server editorial overrides, leaving **69 of 84** exposed to the helper-generated description pattern. This batch adds specific overrides for Gerald J. Ford Stadium, Globe Life Field and Texas Motor Speedway and improves the existing Amon G. Carter Stadium and American Airlines Center overrides. After this batch, **18 of 84** have explicit editorial descriptions and **66** remain candidates for record-by-record remediation.
- **84/84 venue quick-answer components** included `TexasExplainedContextLinks surface="sports"`, regardless of whether those links were meaningfully related to the venue. Phase 1D removes that forced link injection from the venue quick-answer component.
- Because `verifiedAt` is mandatory in the enrichment schema and was passed into `SportsVenueQuickAnswers`, the component could turn source-review metadata into a consumer FAQ question: **“How current is this [venue] visitor guide?”** Phase 1D removes that FAQ/FAQ-schema item. The existing page-level Reviewed/Source metadata can remain metadata rather than masquerading as a user question.

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

## Source standard used in this batch

The five remediated records use venue/team/university-operated sources only for durable facts and official visitor guidance. Frequently changing policies are summarized conservatively and linked back to the official current page instead of being treated as permanent facts.

## Deferred to the parallel layout/schema work

Phase 1D intentionally does **not** remove or redesign the global `Plan the trip` section, county visitor grid, related-venue grid or other page-composition blocks in `sports-venue.$slug.tsx`. Those are global layout decisions already in scope for the parallel Phase 1A branch. The audit above identifies them so the layout branch can remove or conditionally render them rather than preserving generic content for SEO.

## Remaining remediation queue

The remaining **66** venues without explicit editorial-description overrides should be handled venue by venue, prioritizing pages with search impressions and major tourist draw tags. The same standard should be applied: authoritative durable facts first, event-specific rules via official links, no required weekend filler, and no nearby/internal link unless geography or editorial relevance justifies it.
