# TexasDefined: attraction authority is visitor-driven
Updated October 12, 2026.

## Editorial question before any checklist

**Ask what someone considering a visit to this specific place actually needs to know.** Answer those decisions first, using evidence from the responsible operator. A facility fact belongs on the page only when it influences an actual visitor choice. Do not manufacture sections to satisfy a common template.

Examples of **different** editorial decisions, not requirements to repeat everywhere:

| Type of visit | Questions worth answering |
|---|---|
| Museum or indoor exhibition | How long should I allow? What are the exhibits and ticket restrictions? Can a wheelchair user enter and reach all relevant levels? Are elevators, seating or sensory accommodations available? Are any exhibits temporarily closed? |
| Remote state park, preserve or desert route | Which entrance is open? Do I need a reservation or high-clearance vehicle? Are drinking water and restrooms available where I will hike/camp? Which trail map and weather alerts should I use? |
| Cave tour | Which tour suits children and mobility needs? How many stairs, how steep, what is the humidity? Is advance booking essential? |
| Large campus attraction | Which ticketed experiences are open? How do I move between buildings? Is parking paid or accessible? What will fit in one visit? |
| Aquarium or zoo | Which exhibits and animal experiences are included? Are timed presentations, mobility access or special policies important? Which visitor map will help with the itinerary? |
| Roadside public art | Can I legally stop and park? Is access free? Is this a quick stop or a destination? Are surfaces hazardous after rain? |

These are **starting prompts** for an editor. Individual attractions may need different questions. A museum does not need an obligatory "Restrooms and maps" panel just because the catalog stores those facts. When in doubt, avoid content that merely states the obvious. Accessibility needs should be answered specifically where relevant, including limitations, rather than claiming general compliance.

## Publication acceptance

1. **Canonical place**: Correct name, operator, geography, current availability, appropriate Explore category; prevent duplicates from competing with the canonical guide.
2. **Distinctive substance**: Accurate background, interpretation and actual visitor decisions—not copied generic travel boilerplate. Structure, itinerary count and headings should reflect the attraction; do not force three visits or a history timeline where they add no value.
3. **Source-backed answers**: Prioritize the official operator for admissions, hours, closures, accessibility, facility limitations, entry points and booking rules; support relevant history/science claims with institutions. Mark genuine uncertainty where a decision matters, and never invent facilities.
4. **Context-sensitive logistics**: A remote preserve may need specific restroom, water and parking evidence. An indoor museum usually needs access/amenities only where they affect accessibility or planning. A scenic drive needs a route map and road suitability; a small indoor collection may not.
5. **Photographs**: Use genuine subject-specific, free-to-reuse images with documented rights and accurate credit; no unauthorized image use or generic stand-ins.
6. **Relevant cross-links**: Explore categories, counties, nearby destinations, cities, regions and itineraries should connect when they help someone plan. No arbitrary link quotas or irrelevant reciprocal links.
7. **Relevant affiliates**: Offer appropriate approved tracked lodging/experiences only where they serve the trip; preserve direct official visitor links and disclose commercial links.
8. **Verification**: Review facts based on rate of change; never advance a verification date merely because a script ran or a link responded. Material closure/booking changes take priority.
9. **Real release testing**: Check factual/source accuracy, accessibility, loading, mobile layouts, canonical/index policy, image rights and live deployed output.

## How the code enforces editorial discretion

- `src/data/types.ts`: `visitorFacilities.editorialFocus` is an **optional editor-selected list** of parking, restrooms or official site map topics. It is not inferred or required because a destination belongs to any category. `editorialHeading` and `editorialIntro` explain the place-specific reason to show the section.
- `src/components/editorial/DestinationVisitorEssentials.tsx`: returns `null` when the editor has not chosen any relevant topics; it displays only chosen topics. Other destination planning, accessibility and operator/source fields remain available in their existing page sections.
- `src/data/destination-visitor-facilities.ts`: retains verified facts even when they are not editorially useful for the page. A museum may retain a verified restroom note for data consumers without advertising it.
- `src/data/destination-authority-audit.ts`: evaluates parking, restrooms and maps **only if explicitly prioritized for the destination**; separately suggests specific wheelchair/elevator/circulation verification for exhibition venues. This is a research/backlog tool, not a universal content generator.
- `scripts/data/validate-sitewide-attraction-authority.mjs`: prevents reverting to the universal checklists and tests distinct presentation priorities for an aquarium versus a remote hiking site.

## What still requires editorial completion

The live Supabase inventory, individually researched missing attractions, rights-cleared image collection, source-backed visitor decisions, useful internal links and final production QA require separate place-by-place evidence. Static audit scores do not certify first-hand review or publication quality.
