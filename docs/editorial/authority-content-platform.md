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


## November 2 continuation checkpoint: completed code versus pending release

The shared operator registry, dated price/source records, content-owner manifest, Fredericksburg article tool and venue-specific offer projection merged in PR #6543 (merge commit `945762bd05df8eb8074747bccbc6d9d6af43cfd0`). The component is intentionally not a generic page generator.

The follow-up branch `feat/authority-visitor-multistop-budget-20261102` improves that existing toolkit, rather than rebuilding it:
- Multiple chosen operator experiences are estimated together from the one dated offer registry; over-capacity offers are explicitly excluded, not treated as zero-cost.
- Mapped visitor stops can be selected in sequence (maximum five), opening external driving directions. No invented ETA or route distance is published.
- The existing per-destination offer projection reads destination slugs directly from the offer registry, not a second hardcoded list.
- Reusable tools tolerate a missing itinerary or venue list instead of rendering a broken placeholder.
- A targeted budget regression is wired into the existing SEO validation command.

**Release proof still required:** protected CI, complete deployment and live cached/direct Worker HTML checks for the Fredericksburg article and selected individual winery pages. As checked November 2, production run [41503121919](https://github.com/keeptxred/TexasDefined/actions/runs/41503121919) failed at its pre-existing JS/CSS asset verification step. A merged PR is not proof that the newest content is live.

## Page-type rollout without cloning content

| Family | Existing source of truth | Permitted distinct tools | Do not duplicate |
| --- | --- | --- | --- |
| Winery itineraries | Canonical Destination records + dated operator offers | Comparisons, multi-stop map, group budgets and editorial pacing | Individual winery history, address or stale pricing |
| Individual wineries | Their Destination record + matching offer IDs | Venue-specific official offers, access notes and source checks | Multi-winery article or town directory |
| City and small-town guides | Existing destination/city authority + trip planner | Selected attraction comparisons and distinct day plans only when researched | Individual attraction biographies or regional histories |
| Museums and historic sites | Existing DestinationAuthorityGuide/visitor facts | Timed admission options and accessible visit planning if sourced | Duplicate default authority itinerary renderer |
| Parks and outdoor sites | Existing TPWD/park visitor facts and authority guides | Verified permits, access, closures, trail or campsite choices | Generic repeated park itinerary blocks |
| Fishing and camping | Existing fishing and camping profile registries | Species and access decisions, launch/camp selection with official rules | Repeated statewide regulations or campground directory prose |
| Road trips | Existing trip-planner and route guides | Unique geographic route/time constraints | Another indexable query-parameter itinerary |

**Admission gate for each additional page:** choose one controlling search intent; confirm a distinct source record and sufficient verified facts; reuse the existing visitor component only if it answers a new decision; suppress unverified price/age/ADA claims; test responsive presentation, source accuracy, canonical and visible SSR text. If the current destination already supplies the same itinerary or comparison, do not add another widget. Register each rollout in the ownership manifest only when the exact real canonical page path has been checked. No mass-generated duplicate URLs.

Original photos and operator interviews require separately documented permission, licensing and dated evidence. Do not present a representative vineyard as a verified venue photograph, invent field visits, or advance checked dates based solely on a scheduled run.

## Weekly operator-source change watch

The existing `.github/workflows/destination-visitor-fact-freshness.yml` is the sole schedule for this review. It checks the bounded list of official URLs already referenced by canonical operator records, normalizes visible HTML and saves a SHA-256 source fingerprint artifact for the next run. The snapshot is technical change evidence, **not** a factual verification or proof that any policy is correct. No extra indexed articles, database clone or new scheduler is created.

A new source URL's first successful read establishes a baseline without advancing `checkedAt`. An observed change remains `SOURCE_REVIEW` in following runs until the oldest checked date across all dependent offers is later than the detection date; a temporarily unreachable or bot-challenged operator website remains `SOURCE_UNAVAILABLE` and is never silently considered verified. The single existing visitor-fact research issue groups these alerts with 45-day expired offers.

A human or verified editorial research process must check the actual changed policy against the source before altering public facts and dates. Never auto-update prices just because the HTML changed, and never treat unchanged content as confirmation of accuracy. The monitoring job deliberately uses a bounded set of ordinary HTTPS requests and does not evade anti-bot protections. GitHub Actions snapshot artifacts are retained for 60 days; any missing/corrupt history must be treated as a new technical baseline, not source approval.

Production deployment remains governed by the existing protected build, SEO, asset continuity, image rights and live Worker acceptance gates.

## Cross-category pilot ownership (November 2, 2026)

The existing primary-page experiences are already specialized. Reusing the winery comparison template indiscriminately would duplicate their useful research. The single `src/data/authority/content-ownership.json` manifest now explicitly assigns page purposes, their canonical paths, and the *existing source files* for six additional page families; the protected validator refuses unknown files or reused canonical paths.

| Family | Primary canonical intent | Verified source-of-truth surfaces already in production code | What the shared system adds without duplication |
| --- | --- | --- | --- |
| Hill Country small towns | `/explore/small-towns` helps choose the town | Wimberley and Boerne's own Destination records + sitewide DestinationAuthorityGuide | Destination-prefilled, category-specific trip-planner form; do not repeat town narratives or attractions |
| USS Lexington / World War II | One museum's visitor logistics versus statewide WWII historical context | `military-museum-destinations.ts`, existing WWII article, verified visitor facts | Historic-site trip interest defaults; no second museum ticket table or repeated naval history |
| State parks | `/explore/state-parks` statewide discovery versus Enchanted Rock/Brazos Bend local access | Existing state-park authority data, TPWD references, `StateParkVisitorEssentials` | Park-appropriate trip planner defaults; preserve individual day-pass and closure guidance |
| Lake Conroe fishing | `/fishing/lakes/lake-conroe` reservoir overview, separate access/rules/camping intents | `lake-conroe-prototype.ts` and `lake-conroe-page-data.server.ts` | Ownership/duplicate-content protections; preserve lake-specific source and separate subroutes; no cloned generic campground module |
| Texas camping | Statewide camping comparison versus Garner's individual destination visit | `camping/profiles.ts`, lean `camping/discovery.ts` browser projection | Existing campground comparison remains the single UI owner; RV/camping trip interests apply when a valid catalog destination is selected |
| History road trip | `/article/fredericksburg-johnson-city-historic-road-trip` connects local stops rather than replacing town guides | Existing evergreen road-trip fixture + Johnson City destination | Historic/scenic trip defaults without duplicating published route text or creating new indexable query states |

**Admission tests:** `validate-authority-experiences.mjs` checks that every declared primary path is owned, every actual canonical path is unique, intents are sufficiently distinct and source catalog paths exist. `validate-authority-category-coverage.mjs` checks the six named families against their declared canonical data and proves the existing museum, park, camping, fishing and destination source/visitor rendering boundaries are still in place. A category is *not* assigned the winery offer widget unless it actually has authenticated dated operator offers. The shareable trip planner remains `noindex, follow` when its query state contains a destination, trip or approved article preset.

**Release evidence:** Successful production workflow [#41525013603](https://github.com/keeptxred/TexasDefined/actions/runs/41525013603) on `6e22f79ed2bc6da57096ebc4908eb26a8ba5eb48` performed passing old/current JS/CSS asset continuity, direct Worker and canonical domain health, plus `verify-el-paso-fredericksburg-release.mjs`: the Fredericksburg guide returned HTTP 200 on both hosts for canonical, cache-busted and tracking-parameter paths, all resolving to the single authoritative canonical URL. This certifies the original pilot's production surface, not automatically any *later* category-default or ownership commits; their own production workflow still must pass.

**Still requires separately verified evidence:** Additional winery first-party operator responses, ADA policies, current booking prices and explicit individual image permissions. The existing scheduled source change watcher reports diffs but never re-stamps operator-reviewed facts or asserts a human firsthand visit. Do not invent evidence to mark those requests finished.
