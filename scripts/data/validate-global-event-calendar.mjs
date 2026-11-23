import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { execFileSync } from "node:child_process";

const root = process.cwd();
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), "utf8");
const failures = [];
const requireText = (source, needle, label) => { if (!source.includes(needle)) failures.push(`${label}: missing ${needle}`); };

const contract = read("src/data/events/texas-event-record.ts");
const adapter = read("src/data/events/texas-event-records.server.ts");
const calendarServer = read("src/data/events/texas-event-calendar.server.ts");
const ticketmasterMatcher = read("src/data/events/ticketmaster-event-match.ts");
const ticketmasterLoader = read("src/data/events/ticketmaster-events.server.ts");
requireText(ticketmasterLoader, "ticketmasterIsPrimaryAdmissionTitle(event.name)", "Ticketmaster add-on filter");
for (const marker of [
  "export function ticketmasterVenueMatches(",
  "export function ticketmasterShowtimeMatches(",
  "matchingProviderPerformances === 1",
  "export function ticketmasterIsPrimaryAdmissionTitle(",
]) requireText(ticketmasterMatcher, marker, "pure Ticketmaster venue and showtime identity");
for (const marker of [
  'from "./ticketmaster-event-match"',
  "const existing = new Map<string, number[]>();",
  "performanceMatches(records[candidate])",
  "ticketmasterVenueMatches(record, providerRecord)",
  "ticketmasterShowtimeMatches(record, providerRecord, sameVenueProviderCount)",
  "isReviewedChristmasTicketmasterDoorTime(record, providerRecord, sameVenueProviderCount)",
  "ticketmasterVenueMatches(editorial, providerRecord)",
  "ticketmasterShowtimeMatches(editorial, providerRecord, sameVenueProviderCount)",
  "const providersByTitleAndDate = new Map<string, TexasEventRecord[]>();",
  "const sameVenueProviderCount =",
  "remember(key, records.length)",
]) requireText(adapter, marker, "venue-safe Ticketmaster duplicate reconciliation");

const christmasShows = read("src/data/events/christmas-performances-2026.server.ts");
for (const marker of ["export function isReviewedChristmasTicketmasterDoorTime", 'curated.slug === "grand-ol-christmas-dallas-2026"', "sameVenueProviderPerformances === 1"]) {
  requireText(christmasShows, marker, "verified Dallas doors versus showtime exception");
}
const christmasProductionAcceptance = read("scripts/ci/verify-christmas-calendar-12-production.mjs");
for (const marker of [
  "const cases = [",
  "cases.length !== 12",
  "new Set(cases.map(x=>x[0]))",
  "ev-results-list",
  "expected exactly one",
  "ev-ticket",
  "const editorial = matched.filter(card => !card.id.startsWith('ticketmaster:'))",

  "christmas-calendar-qa",
]) requireText(christmasProductionAcceptance, marker, "live Christmas 12-show production acceptance");
try {
  execFileSync(process.execPath, ["--check", path.join(root, "scripts/ci/verify-christmas-calendar-12-production.mjs")], { stdio: "pipe" });
} catch (error) {
  failures.push("live Christmas 12-show production acceptance must have valid JavaScript syntax: " + String(error.stderr || error.message));
}

// Original 2027 Refugio County Fair Association: current-edition event dates,
// separately confirmed by organizer calendar and Easter-shift notice.
// Only independently dated original 2027 Willacy County Fair Association
// programs enter the shared county/statewide list. No guessed exact times.
// Tyler County Dogwood Festival Association ORIGINAL dated 2027
// weekends are confirmed. Its detail page program/times remain 2026 only.
const tylerDogwood2027 = read("src/data/events/tyler-dogwood-2027.server.ts");
requireText(adapter,'import { getVerifiedTylerCountyDogwoodEvents2027 } from "./tyler-dogwood-2027.server";',"Tyler County 2027 statewide event adapter import");
requireText(adapter,"...getVerifiedTylerCountyDogwoodEvents2027()","Tyler County 2027 county/statewide deduplication");
for(const marker of [
  'id: "curated-tyler-county-dogwood-2027:festival-of-the-arts"',
  'id: "curated-tyler-county-dogwood-2027:western-weekend"',
  'id: "curated-tyler-county-dogwood-2027:queens-weekend"',
  'startDate: "2027-03-21"',
  'startDate: "2027-03-26"',
  'endDate: "2027-03-27"',
  'startDate: "2027-04-03"',
  'city: "Woodville"',
  'countySlug: "tyler"',
  'countyName: "Tyler County"',
  'region: "east-texas"',
  'officialEventUrl: "https://www.tylercountydogwoodfestival.org/"',
  'lastVerifiedAt: "2026-11-23"',
  'status: "scheduled"',
]) requireText(tylerDogwood2027,marker,"Original 2027 Woodville Tyler County Dogwood Festival date");
if ((tylerDogwood2027.match(/id: "curated-tyler-county-dogwood-2027:/g)??[]).length !== 3)
  failures.push("Tyler County Dogwood 2027 must have exactly three organizer-confirmed weekends");
if (/startTime:|endTime:|affiliateUrl:|officialTicketUrl:|imageUrl:/.test(tylerDogwood2027))
  failures.push("Tyler Dogwood 2026 detailed program times/fees/media rights cannot be projected onto 2027");
if (/startDate: "2026-|startDate: "2028-/.test(tylerDogwood2027))
  failures.push("Tyler Dogwood 2027 source records must not contain prior or projected year editions");

const willacy2027 = read("src/data/events/willacy-fair-2027.server.ts");
requireText(adapter,'import { getVerifiedWillacyFairCalendarEvents2027 } from "./willacy-fair-2027.server";',"Willacy 2027 shared calendar import");
requireText(adapter,"...getVerifiedWillacyFairCalendarEvents2027()","Willacy statewide and county calendar deduplication");
for(const marker of [
  'id: "curated-willacy-fair-2027:beef-syndicate-bbq"',
  'id: "curated-willacy-fair-2027:chili-cookoff"',
  'id: "curated-willacy-fair-2027:livestock-show"',
  'startDate: "2027-01-16"',
  'startDate: "2027-01-22"',
  'endDate: "2027-01-23"',
  'startDate: "2027-01-27"',
  'endDate: "2027-01-30"',
  'countySlug: "willacy"',
  'countyName: "Willacy County"',
  'city: "Raymondville"',
  'https://www.wclsf.com/',
  'status: "scheduled"',
  'lastVerifiedAt: "2026-11-23"',
]) requireText(willacy2027,marker,"Original first-party Willacy County 2027 fair event edition");
if ((willacy2027.match(/id: "curated-willacy-fair-2027:/g)??[]).length !== 3)
  failures.push("Willacy source-qualified 2027 fair must have exactly 3 distinct original events");
if (/startTime:|endTime:|officialTicketUrl:|affiliateUrl:|imageUrl:/.test(willacy2027))
  failures.push("Willacy original 2027 dates did not verify start times, official ticket or photo/affiliate permissions");
if (/startDate: "2026-|startDate: "2028-/.test(willacy2027))
  failures.push("Willacy 2027 specific events must not infer 2026 or 2028 annual dates");

// Baylor County Seymour Helping Hands original NEW 2027 event is not a replay
// of generic City of Seymour or Chamber yearly brochure dates.
const seymour2027 = read("src/data/events/seymour-spring-fling-2027.server.ts");
requireText(adapter,'import { getVerifiedSeymourSpringFlingEvent2027 } from "./seymour-spring-fling-2027.server";',"Seymour 2027 original nonprofit statewide calendar import");
requireText(adapter,"...getVerifiedSeymourSpringFlingEvent2027()","Seymour 2027 county and statewide deduped calendar inclusion");
for(const marker of [
 'id: "curated-seymour-2027:spring-fling-car-show"',
 'slug: "seymour-spring-fling-car-show"',
 'startDate: "2027-05-08"',
 'city: "Seymour"',
 'countySlug: "baylor"',
 'countyName: "Baylor County"',
 'region: "prairies-lakes"',
 'officialEventUrl: "https://www.seymourhelpinghands.com/post/the-road-to-75-starts-now"',
 'status: "scheduled"',
 'lastVerifiedAt: "2026-11-23"',
]) requireText(seymour2027,marker,"Seymour nonprofit exact original May 8 2027 edition evidence");
if((seymour2027.match(/id: "curated-seymour-2027:/g)??[]).length!==1)
 failures.push("Seymour source only confirms ONE May 8 2027 date-specific program");
if(/\\b(startTime|endTime|ticketing|image|officialTicketUrl|affiliateUrl):/.test(seymour2027))
 failures.push("Seymour source does not verify show start/end hours, admission, ticket or media permissions");
if(/startDate: "2026-|startDate: "2028-/.test(seymour2027))
 failures.push("Seymour 2027 car show must not project prior or future year editions");

const refugio2027 = read("src/data/events/refugio-fair-2027.server.ts");
requireText(adapter,'import { getVerifiedRefugioFairCalendarEvents2027 } from "./refugio-fair-2027.server";',"Refugio statewide server import");
requireText(adapter,"...getVerifiedRefugioFairCalendarEvents2027()","Refugio shared county/statewide deduplication");
for (const marker of [
  'id: "curated-refugio-fair-2027:pride-of-texas-carnival"',
  'id: "curated-refugio-fair-2027:fair-parade"',
  'id: "curated-refugio-fair-2027:ranch-rodeo"',
  'id: "curated-refugio-fair-2027:livestock-shows"',
  'startDate: "2027-03-24"',
  'startDate: "2027-03-27"',
  'startDate: "2027-03-31"',
  'endDate: "2027-04-02"',
  'startTime: "10:00 AM"',
  'startTime: "12:30 PM"',
  'https://www.refugiocountyfair.com/events/',
  'https://www.refugiocountyfair.com/uncategorized/2027-refugio-county-fair-dates/',
  'countySlug: "refugio"',
  'countyName: "Refugio County"',
  'status: "scheduled"',
  'lastVerifiedAt: "2026-11-23"',
]) requireText(refugio2027,marker,"Refugio organizer-confirmed exact 2027 fair editions");
if ((refugio2027.match(/id: "curated-refugio-fair-2027:/g)??[]).length !== 4)
  failures.push("Refugio 2027 must have exactly four individual date-verified first-party events");
if ((refugio2027.match(/startTime: /g)??[]).length !== 2)
  failures.push("Only the 10 AM parade and 12:30 PM ranch rodeo exact 2027 Refugio start times may be asserted");
if (/\b(ticketing|image|officialTicketUrl|affiliateUrl):/.test(refugio2027))
  failures.push("No Refugio photo/ticket/licensing rights or provider partnership was verified");
if (/startDate: "2026-|startDate: "2028-/.test(refugio2027))
  failures.push("Refugio 2027 event records must not project old or future year editions");

const mardiGrasCompanions = read("src/data/events/mardi-gras-companion-events-2027.server.ts");
const mardiGrasHub = read("src/routes/events.mardi-gras.lazy.tsx");
const mardiGrasNewFestivals = read("src/data/events/mardi-gras-new-festivals-2027.server.ts");
requireText(adapter, "getVerifiedMardiGrasNewFestivalCalendarEvents2027()", "shared calendar new Mardi Gras parades");
if ((mardiGrasNewFestivals.match(/id: "curated-mardi-gras-2027:/g) ?? []).length !== 5) failures.push("Bastrop, Houston and Granbury must produce five unique, source-dated events");
for (const slug of [
  "bastrop-mayors-mardi-gras-ball",
  "bastrop-mardi-gras-festival",
  "bastrop-lighted-mardi-gras-parade",
  "houston-krewe-of-porus-parade",
  "granbury-carnival",
]) requireText(mardiGrasNewFestivals, slug, "additional Mardi Gras source-qualified calendar records");
for (const text of [
  'id="more-parades"',
  "Bastrop Mardi Gras Festival &amp; Lighted Parade",
  "Krewe of Porus",
  "Inaugural Granbury Carnival",
  "Bastrop Mayor's Mardi Gras Ball",
  "/events?start=2027-02-05&amp;end=2027-02-07#calendar",
]) requireText(mardiGrasHub, text, "statewide additional Mardi Gras festival discovery");

for (const token of [
  'getVerifiedMardiGrasCompanionCalendarEvents2027()',
  'const knownCompanions = new Set(',
  'knownCompanions.has(key)',
]) requireText(adapter, token, "Mardi Gras event calendar integration");
for (const slug of [
  "crystal-beach-mardi-gras-chicken-run",
  "jefferson-queen-mab-ball",
  "beaumont-lagniappe-mardi-gras-soiree",
  "livingston-mardi-gras-gumbo-cookoff",
  "port-arthur-mardi-gras-masquerade-ball",
  "yachty-gras-kickoff-party",
  "jefferson-mardi-gras-tshirt-poster-party",
  "yachty-gras-parade-awards-breakfast",
]) requireText(mardiGrasCompanions, slug, "Mardi Gras exact-event calendar record");
if (/slug: "[a-z0-9-]+-20\d{2}"/.test(mardiGrasCompanions)) failures.push("Mardi Gras companion event public slugs must be evergreen and must not end in an event year");
if ((mardiGrasCompanions.match(/id: "curated-mardi-gras-2027:/g) ?? []).length !== 8) failures.push("2027 Mardi Gras companion calendar must include eight unique curated events");
if ((mardiGrasCompanions.match(/startTime:/g) ?? []).length !== 4) failures.push("Only the confirmed Jefferson, Beaumont, Port Arthur and merchandise-party companion start times may be asserted");
for (const token of [
  "getVerifiedMardiGrasCompanionCalendarEvents2027",
  "2027-01-16", "2027-01-23", "2027-02-05", "2027-02-06",
  "officialEventUrl:", "lastVerifiedAt: \"2026-10-25\"",
]) requireText(mardiGrasCompanions, token, "Mardi Gras verified event records");
for (const token of [
  "Crystal Beach · Saturday, January 16 · time to reconfirm",
  "One local calendar lists 5–8 p.m. while another lists 9:30 a.m.–5 p.m.",
  "Two Creeks Mardi Gras Gumbo Cookoff",
  "Port Arthur Chamber Mardi Gras Masquerade Ball",
  "Yachty Gras Parade Awards Breakfast",
  "Find the January 30 Seabrook gathering in the calendar",
  "Find the January 31 merchandise party in the calendar",
  "/events?start=2027-02-05&amp;end=2027-02-06#calendar",
  "do not assume public walk-in admission",
]) requireText(mardiGrasHub, token, "Mardi Gras hub current source/visitor details");

const christmas = read("src/data/events/christmas-performances-2026.server.ts");
const christmasHub = `${read("src/routes/events.$collection.tsx")}\n${read("src/routes/events.$collection.lazy.tsx")}`;
const christmasIds = [...christmas.matchAll(/id: "([^"]+-2026)"/g)].map((match) => match[1]);
if (christmasIds.length !== 12 || new Set(christmasIds).size !== 12) {
  failures.push("Christmas statewide calendar must project exactly 12 unique curated shows");
}
for (const needle of [
  "getVerifiedChristmasPerformanceCalendarRecords2026",
  "isSameChristmasPerformanceCalendarEvent",
  "startDate: show.date",
  "confirmedStartTimes[show.id]",
  "matchChristmasTicketmasterPerformance(show, ticketmaster, today)",
  "ticketmasterVenueMatches({ venueName: show.venue }, event)",
  "ticketmasterShowtimeMatches({ startTime }, event, candidates.length)",
  "exactShowtime.length === 1",

  "officialEventUrl: show.sourceUrl",
  "officialTicketUrl: show.featuredTicketUrl ?? show.sourceUrl",
  "!featuredDatePassed && show.featuredTicketUrl ? show.featuredTicketUrl : show.sourceUrl",
  "https://www.etix.com/ticket/p/62230269/a-christmas-story-conroe-crighton-theatre",
  'saleStatus: "unknown"',
  'category: theatreIds.has(show.id) ? "culture" : "music"',
]) requireText(christmas, needle, "curated Christmas calendar projection");
for (const needle of [
  "getVerifiedChristmasPerformanceCalendarRecords2026()",
  "isSameChristmasPerformanceCalendarEvent(performance, record)",
  "isSameChristmasPerformanceCalendarEvent(performance, providerRecord)",
  "mergeEventTicketing(records[index].ticketing, performance.ticketing)",
]) requireText(adapter, needle, "shared event registry Christmas integration");
for (const needle of [
  "View this show on the statewide calendar",
  "encodeURIComponent(`city:${show.city}`)",
  '/events?start=',
]) requireText(christmasHub, needle, "Christmas hub calendar crosslinks");
for (const needle of [
  'Number(right.startDate === exactDay) - Number(left.startDate === exactDay)',
  'const exactDay = search.start && search.start === search.end',
]) requireText(calendarServer, needle, "exact-day event visibility");
if (/endDate: show.endDate/.test(christmas)) {
  failures.push("Do not treat a discontinuous Christmas theatre run as daily calendar availability");
}

const eventDirectoryFacade = read("src/data/major-event-directory.ts");
const eventCalendarFacade = read("src/data/major-event-calendar.ts");
const eventServerSurface = `${eventDirectoryFacade}\n${eventCalendarFacade}`;
const carousel = read("src/components/editorial/TexasEventCarousel.tsx");
const carouselStyles = read("src/components/editorial/texas-event-carousel.css");
const eventStyles = read("src/components/events/events-landing.css");
const globalStyles = read("src/styles.css");
const route = read("src/routes/events.index.tsx");
const lazyRoute = read("src/routes/events.index.lazy.tsx");
const landing = read("src/components/events/EventsLandingPage.tsx");
const routeSurface = `${lazyRoute}\n${landing}`;
const venueEventFacade = read("src/data/sports-venue-events.functions.ts");
const sportsVenueRoute = read("src/routes/sports-venue.$slug.tsx");
const sportsVenuePilot = read("src/components/sports/SportsVenueGuidePilotContent.tsx");
const sportsVenueGuide = read("src/components/sports/SportsVenueGuidePage.tsx");

for (const field of ["id: string", "title: string", "startDate: string", "startTime?: string", "endDate?: string", "endTime?: string", "venueId?: string", "city: string", "countySlug?: string", "region: TexasRegion", "category: TexasEvent[\"category\"]", "officialEventUrl: string", "ticketing?: TexasEventTicketingMetadata", "image?: TexasEventImageMetadata", "licenseUrl?: string", "status: TexasEventLifecycleStatus", "lastVerifiedAt: string", "lastUpdatedAt: string"]) requireText(contract, field, "event contract");
for (const selector of ["eventsForVenue", "eventsForCity", "eventsForCounty", "eventsForRegion", "eventsForCategory"]) requireText(contract, `export function ${selector}`, "context selector contract");
for (const lifecycle of ["scheduled", "cancelled", "postponed", "rescheduled"]) requireText(contract, `\"${lifecycle}\"`, "lifecycle contract");
for (const rights of ["verified-reusable", "official-source-only", "unknown"]) requireText(contract, `\"${rights}\"`, "image-rights contract");

for (const token of ["getGeneratedTexasEvents(500)", "loadMajorEventGuideDirectoryServer", "getMajorEventRecordServer", "getMajorEventSchemaEnrichmentServer", "resolveSportsVenueEventLink", "getSportsVenuePhoto", "isCompliantMajorEventImage", "const approved = isCompliantMajorEventImage(image)", 'rightsStatus: approved ? "verified-reusable" : "unknown"', "displayAllowed: approved", "licenseName: approved ? image.licenseName : undefined", "licenseUrl: approved ? image.licenseUrl : undefined", "credit: approved ? image.rightsNote : undefined", "buildDisplayImage", 'rightsStatus: "verified-reusable"', "photo.licenseName", "photo.licenseUrl", "photo.author", "displayAllowed: true", "loadUpcomingTexasEventRecordsServer"]) requireText(adapter, token, "event adapter");
requireText(calendarServer, 'guidePath: event.guidePath || calendarHref(search, { start: event.startDate, end: event.startDate })', "calendar fallback link for events with no guide");
requireText(landing, 'event.guidePath?.startsWith("/events?")', "SSR-safe event guide label");
for (const token of ['search.category === "guides"', "buildGlobalEventCalendarServer", "buildTexasEventCarouselItemsServer", "formatCarouselRange", "categoryLabel", "lastVerifiedLabel", "contextMatches", "matchesLocation", "overlapsRange", 'timeZone: "America/Chicago"', "calendarDays", "calendarHref", "slice(0, 48)", "previousHref", "todayHref", "nextWeekHref", "nextHref", "calendarDays: calendarDays(monthKey).map", "results: displayed.map"]) requireText(calendarServer, token, "server calendar view model");
for (const token of ["createServerFn", "loadUpcomingTexasCalendarRecordsServer", "upcomingEventRecords", "buildTexasEventCarouselItemsServer(records.slice(0, 12))", "buildGlobalEventCalendarServer", "calendarView", "noindex, follow"]) requireText(eventServerSurface, token, "normalized landing-event integration");
for (const token of ["createServerFn", "getMajorEventLandingDirectory", "loadUpcomingTexasCalendarRecordsServer", "buildGlobalEventCalendarServer"]) requireText(eventCalendarFacade, token, "deferred calendar RPC boundary");
requireText(calendarServer, ": filtered).slice(0, 48)", "calendar payload remains bounded after filtering full server inventory");
if (eventCalendarFacade.includes("limit: 200")) failures.push("calendar must not truncate the inventory before date/location filters");
if (eventDirectoryFacade.includes("loadUpcomingTexasEventRecordsServer") || eventDirectoryFacade.includes("buildGlobalEventCalendarServer")) failures.push("eager event directory facade must not own global calendar normalization");

for (const accessibility of ['aria-roledescription="carousel"', 'aria-label="Previous events"', 'aria-label="Next events"', 'event.key === "ArrowLeft"', 'event.key === "ArrowRight"', 'event.key === "Home"', 'event.key === "End"', 'className="ec-v"', 'className="ec-card"']) requireText(carousel, accessibility, "event carousel");
for (const token of ["event.image?.displayAllowed", "event.image.sourceUrl", "event.image.licenseUrl", "event.categoryLabel", "event.dateLabel", "event.locationLabel", "event.lastVerifiedLabel", "Official event site", "Last verified", "View all events", "View Calendar", 'viewAllHref.includes("#calendar")', 'viewAllHref.replace(/#calendar$/, "")', 'import "./texas-event-carousel.css";', "export type TexasEventCarouselItem"]) requireText(carousel, token, "event carousel");
for (const token of [".ec-v {", "overflow-x: auto", "scroll-snap-type: x mandatory", ".ec-card { min-width: 84%", "min-width: calc(33.333% - .7rem)", ".ec-b:hover", "@media (min-width: 640px)", "@media (min-width: 1024px)"]) requireText(carouselStyles, token, "shared route-split carousel styles");
for (const token of [".ev-cal {", ".ev-days {"]) requireText(eventStyles, token, "route-scoped event calendar styles");
requireText(lazyRoute, 'import "@/components/events/events-landing.css";', "lazy event stylesheet boundary");
if (globalStyles.includes(".ec-") || globalStyles.includes(".ev-")) failures.push("event route styles must not inflate the primary global stylesheet");

for (const token of ["validateSearch", "location:", "start:", "end:", "category:", "venue:", "getMajorEventLandingDirectory", 'import("@/data/major-event-calendar")', 'import("@/data/major-event-directory")', 'import("@/data/queries")', "data: deps.search", "filtered: deps.filtered", "head: ({ loaderData }) => loaderData?.head ?? {}"] ) requireText(route, token, "events route search/SEO contract");
if (route.includes('import { getEventsPageHead } from "@/data/major-event-directory"')) failures.push("events route must keep the event-head server-function facade behind the loader boundary");
if (route.includes('import { eventsQuery, regionsQuery } from "@/data/queries"')) failures.push("events route must keep query helpers behind the loader boundary");
const carouselOffset = landing.indexOf('<Container><TexasEventCarousel');
const calendarOffset = landing.indexOf('<GlobalEventCalendar calendarView={calendarView}');
const editorialOffset = landing.indexOf('<DiscoverySection eyebrow="Plan by time"');
if (!(carouselOffset >= 0 && calendarOffset > carouselOffset && editorialOffset > calendarOffset)) failures.push("interactive monthly calendar must follow upcoming carousel and precede editorial discovery collections");

for (const token of ['value="guides"', "Next 7 days", "TexasEventCarousel", "GlobalEventCalendar", "calendarView.calendarDays", "calendarView.previousHref", "calendarView.todayHref", "calendarView.nextWeekHref", "calendarView.nextHref", "Previous", "Today", "Next", "Jump to next event", 'name="location"', 'name="category"', 'name="venue"', "aria-current", "Official event site", "Last verified", "calendarView.results.length", "calendarView.totalCount"]) requireText(routeSurface, token, "global calendar UX");

for (const token of ["createServerFn", "loadUpcomingTexasEventRecordsServer", "buildTexasEventCarouselItemsServer", "getSportsVenuePhoto", "venueId = `sports-venue:${data.slug}`", "limit: 9", "const photo = getSportsVenuePhoto(data.slug)", "event.image.url === photo.imageUrl", "event.image.sourceUrl === photo.sourcePage", "eventWithoutVenueHeroFallback", "events,", "calendarHref:"]) requireText(venueEventFacade, token, "venue event server boundary");
for (const token of ["isSportsVenueGuidePilot(params.slug)", 'import(\'@/data/sports-venue-events.functions\')', "upcomingEvents: guideEvents?.events ?? []", "eventCalendarHref: guideEvents?.calendarHref ?? '/events'", "upcomingEvents={upcomingEvents}", "eventCalendarHref={eventCalendarHref}"]) requireText(sportsVenueRoute, token, "sports venue route integration");
for (const token of ["upcomingEvents: readonly TexasEventCarouselItem[]", "eventCalendarHref: string", "const photo = getSportsVenuePhoto(slug)", "event.image?.url !== photo.imageUrl", "event.image?.sourceUrl !== photo.sourcePage", "eventWithoutDuplicateVenueImage", "upcomingEvents={venueEvents}", "eventCalendarHref={eventCalendarHref}", 'document.querySelector("[data-stay-nearby-slot]")', 'document.getElementById("expedia-travel-surface")', "surface.parentElement !== slot", "surface.remove()", "TexasDefinedStayNearby?.refresh?.()"] ) requireText(sportsVenuePilot, token, "sports venue pilot integration");
for (const token of ["TexasEventCarousel", "events={upcomingEvents}", "viewAllHref={eventCalendarHref}", "data-stay-nearby-slot"]) requireText(sportsVenueGuide, token, "sports venue guide integration");
for (const stale of ["SportsVenueEventItem", "SportsVenueEventsIntegration", "SportsVenueHotelItem", "SportsVenueStayNearbyIntegration", "SportsVenueUpcomingEventsSection", "SportsVenueStayNearbySection"]) {
  if (sportsVenueGuide.includes(stale)) failures.push(`sports venue guide must not retain obsolete placeholder integration: ${stale}`);
}
if (sportsVenueRoute.includes("texas-event-records.server") || sportsVenueRoute.includes("texas-event-calendar.server")) failures.push("sports venue route must keep event registry/normalization behind the server-function boundary");

if (failures.length) {
  console.error("Global event/calendar validation failed:\n" + failures.map((failure) => `- ${failure}`).join("\n"));
  process.exit(1);
}

console.log("PASS: one source-qualified Texas event contract powers statewide and venue-scoped calendars/carousels with rights-safe imagery, server-boundary and render-boundary venue-guide hero deduplication by URL or source identity, freshness disclosure, accessible controls, distinct venue event/calendar actions, a server-bounded venue payload, the existing Stay Nearby slot, a lazy-mount refresh guard, and route-split styling that protects the main client bundle.");
