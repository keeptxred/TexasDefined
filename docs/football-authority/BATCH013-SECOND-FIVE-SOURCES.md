# Batch013 — next five school-specific first-party source dossiers

Research date: 2026-11-05. **Source evidence only; NOT an implemented page, production Chrome pass or VERIFIED promotion.** Assigned canonical slugs: `cypress-falls`, `cypress-lakes`, `cypress-park`, `cypress-ranch`, `cypress-ridge`. The authoritative registry was recovered through GitHub's blob-by-SHA endpoint (blob `e9d3cb659a93eee226c61ba691ee34b4c82200f2`); no registry status changes in this PR.

## Shared official district rules (cite individually, do not substitute for school-specific editorial)
- CFISD [2026 varsity football schedules](https://www.cfisd.net/athletics/schedules/high-school-schedules/football-hs) separates full, stadium/date and campus views. Distinguish schedule from results; verify last-minute changes with host.
- CFISD [high-school schedule hub](https://www.cfisd.net/athletics/schedules/high-school-schedules) explicitly warns that schedules can change for location, delays or cancellation.
- CFISD [ticket guidance](https://www.cfisd.net/athletics/tickets): on-campus events are listed under the HOME team; varsity football has a separate event for each team. A visiting-school ticket link alone may not establish host venue or entry.
- **Do not** infer a home stadium from a campus address, assume ticket price/ADA access, or reproduce third-party logos/photos, scores or standings.

## Cypress Falls — `cypress-falls`
- Official [athletic teams](https://cyfalls.cfisd.net/athletics/athletic-teams) lists football, separately from **flag football**, and names Chris Brister in its football coaching section. Staff can change; label with research date if used.
- [Campus athletics](https://cyfalls.cfisd.net/athletics) identifies Cypress Falls High School at **9811 Huffmeister Rd., Houston, TX 77095**. This is a campus address, **not proof of game venue**.
- Useful distinct angle: distinguish the campus's football and flag-football offerings; direct varsity game-goers to CFISD's varsity stadium/date schedule and host-specific tickets, not a generic campus calendar.

## Cypress Lakes — `cypress-lakes`
- Official [Cy Lakes athletics](https://cylakes.cfisd.net/athletics/cy-lakes-athletics) identifies **Spartans** and explicitly separates **freshman, JV and varsity** football; it also links Berry Center & Pidgeon Stadium resources, which are **not evidence every home game is at either venue**.
- Official [campus contact](https://cylakes.cfisd.net/our-school/contact-us): **5750 Greenhouse Rd., Katy, TX 77449**.
- Distinct angle: prevent confusing freshman/JV and varsity schedules, and explain that the district's stadium/date schedule must be checked for a particular fixture.

## Cypress Park — `cypress-park`
- Official [athletics](https://cypark.cfisd.net/athletics) states a program mission focused on academic and athletic development; campus address **7425 Westgreen Blvd., Cypress, TX 77433**.
- Official [athletic staff](https://cypark.cfisd.net/athletics/staff) lists Donald Lawrence as athletic director/head football coach as of research date.
- The school posted an official [Sept. 14, 2026 program milestone](https://cypark.cfisd.net/cypark-post-details/~board/2026-2027-cfisd-district-news/post/cypress-park-snaps-43-game-losing-streak-in-dramatic-fashion) describing the end of a long losing streak. This is **a dated historical school-reported event**, not a live record or licensed feed; do not reproduce its photo or present its result as a current standing.
- A dated [Nov. 5 varsity event](https://cypark.cfisd.net/cy-park-calendar-post-page/~occur-id/47809_2026-11-06T00%3A30%3A00Z_2026-11-06T01%3A30%3A00Z) lists Scherer Memorial Stadium for that **specific event only**. Never generalize the venue to all games.

## Cypress Ranch — `cypress-ranch`
- Official [football program](https://cyranch.cfisd.net/athletics/sports/football) provides football schedule and coaching staff; William Blaylock is listed as head coach as of research date.
- Official [athletic office](https://cyranch.cfisd.net/athletics/athletic-office) links **all-sports** and **district** athletic schedules, and identifies an athletic coordinator and trainers.
- Official [campus contact](https://cyranch.cfisd.net/our-school/contact-us): **10700 Fry Rd., Cypress, TX 77433**. Distinct angle: route readers to the program's football-specific schedule rather than the all-sports feed, and distinguish athletic-office contacts from event host/ticket contacts.

## Cypress Ridge — `cypress-ridge`
- Official [athletic sports](https://cyridge.cfisd.net/athletics/athletic-sports) lists football alongside other sports, with an explicit football category.
- Official [athletics](https://cyridge.cfisd.net/athletics) links athletic staff, tickets and Rank One Sport; these links have different purposes and should not be presented as interchangeable sources for game location.
- Official [campus contact](https://cyridge.cfisd.net/our-school/contact-us): **7900 N. Eldridge Pkwy., Houston, TX 77041**. Distinct angle: help readers distinguish a campus athletics page, sports listing, scheduling service and host-specific ticketing.

## Implementation and acceptance gates
1. Write five distinct original editorial entries with independently grounded FAQs and no duplicated generic lead; cite each first-party source in rendered content.
2. Confirm physical-campus county mapping against existing authoritative school records before adding reciprocal county edges. Never infer county solely from postal city.
3. Use only original CSS/graphics or separately licensed media. No invented scores, standing, current rosters, admissions, ADA details or stadium assignments.
4. Protected PR with existing source validators; after all 25 Batch013 pages are implemented, require one real non-skipped 25-school × 3 viewport Chrome run, county reciprocity, signed source SHA ↔ active Worker release, and separate evidence-only graduation PR. Do not mark any school VERIFIED from this dossier.
