import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), "utf8");
const failures = [];
const requireText = (source, needle, label) => { if (!source.includes(needle)) failures.push(`${label}: missing ${needle}`); };

const contract = read("src/data/events/texas-event-record.ts");
const adapter = read("src/data/events/texas-event-records.server.ts");
const calendarServer = read("src/data/events/texas-event-calendar.server.ts");
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
for (const lifecycle of ["scheduled", "cancelled", "postponed"]) requireText(contract, `\"${lifecycle}\"`, "lifecycle contract");
for (const rights of ["verified-reusable", "official-source-only", "unknown"]) requireText(contract, `\"${rights}\"`, "image-rights contract");

for (const token of ["getGeneratedTexasEvents(500)", "loadMajorEventGuideDirectoryServer", "getMajorEventRecordServer", "getMajorEventSchemaEnrichmentServer", "resolveSportsVenueEventLink", "getSportsVenuePhoto", 'rightsStatus: "unknown"', "displayAllowed: false", "buildDisplayImage", 'rightsStatus: "verified-reusable"', "photo.licenseName", "photo.licenseUrl", "photo.author", "displayAllowed: true", "loadUpcomingTexasEventRecordsServer"]) requireText(adapter, token, "event adapter");
for (const token of ["buildGlobalEventCalendarServer", "buildTexasEventCarouselItemsServer", "formatCarouselRange", "categoryLabel", "lastVerifiedLabel", "contextMatches", "matchesLocation", "overlapsRange", 'timeZone: "America/Chicago"', "calendarDays", "calendarHref", "slice(0, 48)", "previousHref", "todayHref", "nextHref", "calendarDays: calendarDays(monthKey).map", "results: displayed.map"]) requireText(calendarServer, token, "server calendar view model");
for (const token of ["createServerFn", "loadUpcomingTexasEventRecordsServer", "upcomingEventRecords", "buildTexasEventCarouselItemsServer(records.slice(0, 12))", "limit: 200", "buildGlobalEventCalendarServer", "calendarView", "noindex, follow"]) requireText(eventServerSurface, token, "normalized landing-event integration");
for (const token of ["createServerFn", "getMajorEventLandingDirectory", "loadUpcomingTexasEventRecordsServer", "buildGlobalEventCalendarServer"]) requireText(eventCalendarFacade, token, "deferred calendar RPC boundary");
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
for (const token of ["TexasEventCarousel", "GlobalEventCalendar", "calendarView.calendarDays", "calendarView.previousHref", "calendarView.todayHref", "calendarView.nextHref", "Previous", "Today", "Next", "Jump to next event", 'name="location"', 'name="category"', 'name="venue"', "aria-current", "Official event site", "Last verified", "calendarView.results.length", "calendarView.totalCount"]) requireText(routeSurface, token, "global calendar UX");

for (const token of ["createServerFn", "loadUpcomingTexasEventRecordsServer", "buildTexasEventCarouselItemsServer", "venueId = `sports-venue:${data.slug}`", "limit: 9", "calendarHref:"]) requireText(venueEventFacade, token, "venue event server boundary");
for (const token of ["isSportsVenueGuidePilot(params.slug)", 'import(\'@/data/sports-venue-events.functions\')', "upcomingEvents: guideEvents?.events ?? []", "eventCalendarHref: guideEvents?.calendarHref ?? '/events'", "upcomingEvents={upcomingEvents}", "eventCalendarHref={eventCalendarHref}"]) requireText(sportsVenueRoute, token, "sports venue route integration");
for (const token of ["upcomingEvents: readonly TexasEventCarouselItem[]", "eventCalendarHref: string", "upcomingEvents={upcomingEvents}", "eventCalendarHref={eventCalendarHref}", 'document.querySelector("[data-stay-nearby-slot]")', 'document.getElementById("expedia-travel-surface")', "surface.parentElement !== slot", "surface.remove()", "TexasDefinedStayNearby?.refresh?.()"] ) requireText(sportsVenuePilot, token, "sports venue pilot integration");
for (const token of ["TexasEventCarousel", "events={upcomingEvents}", "viewAllHref={eventCalendarHref}", "data-stay-nearby-slot"]) requireText(sportsVenueGuide, token, "sports venue guide integration");
for (const stale of ["SportsVenueEventItem", "SportsVenueEventsIntegration", "SportsVenueHotelItem", "SportsVenueStayNearbyIntegration", "SportsVenueUpcomingEventsSection", "SportsVenueStayNearbySection"]) {
  if (sportsVenueGuide.includes(stale)) failures.push(`sports venue guide must not retain obsolete placeholder integration: ${stale}`);
}
if (sportsVenueRoute.includes("texas-event-records.server") || sportsVenueRoute.includes("texas-event-calendar.server")) failures.push("sports venue route must keep event registry/normalization behind the server-function boundary");

if (failures.length) {
  console.error("Global event/calendar validation failed:\n" + failures.map((failure) => `- ${failure}`).join("\n"));
  process.exit(1);
}

console.log("PASS: one source-qualified Texas event contract powers statewide and venue-scoped calendars/carousels with rights-safe imagery, freshness disclosure, accessible controls, distinct venue event/calendar actions, a server-bounded venue payload, the existing Stay Nearby slot, a lazy-mount refresh guard, and route-split styling that protects the main client bundle.");
