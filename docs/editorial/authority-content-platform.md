# Shared authority visitor system

## Editorial contract

**One verified fact belongs to one canonical entity/offer record. One search intent belongs to one canonical page. Components may be reused; substantive editorial text must be unique.**

Do not copy address, booking price, access rules or verified-date metadata into several article fixtures. Source destination identity, location, links and accessibility notes from the existing destination catalog. Source volatile price/duration/age offerings from the dated experience-offers registry. New offers need the direct operator URL and an actual checked date. Current prices expire from the UI after 45 days; an unattended GitHub run must never silently restamp them.

Each cluster records page ownership in content-ownership.json. The Fredericksburg article owns winery comparisons and weekend decisions. Its individual destination pages own history, facilities and one-venue logistics; the town directory owns broad discovery; the statewide wine article owns regional comparison. The existing /explore/trip-planner owns customized trip state (parameterized plans are non-indexable). Do not publish near-identical new article slugs to display different filters.

## Component applicability

* Winery comparison: show only if relevant canonical venue records exist, sourced fresh offers where available, and known coordinates for map markers; unknown values stay unknown.
* Trip budget: use fresh operator prices only; the visitor supplies lodging, dining and transportation budgets. A calculator is a planning estimate, not a quote.
* Itineraries: a handful of concise editorial pacing suggestions can be reused as a UI, but page-specific route selections and narrative must be unique.
* Camping/fishing/parks/museums: reuse existing DestinationVerifiedVisitorFacts, DestinationVisitPlanner, camping/fishing entities and trip planner. Do not force a winery comparison into those pages; extend the common interface when verified category-specific data exists.
* Accessibility, children, pets: display actual sourced facts only; unknown is not the same as permitted or accessible.

## Operational controls

Run node scripts/data/validate-authority-experiences.mjs in the existing destination visitor-fact weekly GitHub workflow and protected merge gate. The weekly review reports stale offerings as STALE and raises the existing editorial research issue; it never edits prices or changes checkedAt. Keep existing URLs, canonicals, Article structured data and server-rendered editorial content.

Pilot changes must first pass TypeScript/build, checks, mobile QA and real HTTP production acceptance. Do not loosen 2026 football indexation gates or the November 17 evaluation baseline. After pilot, add article-specific records and owner roles by region or subject only when each new set of records has verified unique usefulness. Do not mass-generate pages from a generic template.
