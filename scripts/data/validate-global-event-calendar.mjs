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
const carousel = read("src/components/editorial/TexasEventCarousel.tsx");
const eventsLandingPage = read("src/components/events/EventsLandingPage.tsx");
const styles = read("src/styles.css");
const route = read("src/routes/events.index.tsx");
const lazyRoute = read("src/routes/events.index.lazy.tsx");
const eventsSurface = `${lazyRoute}\n${eventsLandingPage}`;

for (const field of ["id: string", "title: string", "startDate: string", "startTime?: string", "endDate?: string", "endTime?: string", "venueId?: string", "city: string", "countySlug?: string", "region: TexasRegion", "category: TexasEvent[\"category\"]", "officialEventUrl: string", "ticketing?: TexasEventTicketingMetadata", "image?: TexasEventImageMetadata", "licenseUrl?: string", "status: TexasEventLifecycleStatus", "lastVerifiedAt: string", "lastUpdatedAt: string"]) requireText(contract, field, "event contract");
for (const selector of ["eventsForVenue", "eventsForCity", "eventsForCounty", "eventsForRegion", "eventsForCategory"]) requireText(contract, `export function ${selector}`, "context selector contract");
for (const lifecycle of ["scheduled", "cancelled", "postponed"]) requireText(contract, `\"${lifecycle}\"`, "lifecycle contract");
for (const rights of ["verified-reusable", "official-source-only", "unknown"]) requireText(contract, `\"${rights}\"`, "image-rights contract");

for (const token of ["getGeneratedTexasEvents(500)", "loadMajorEventGuideDirectoryServer", "getMajorEventRecordServer", "getMajorEventSchemaEnrichmentServer", "resolveSportsVenueEventLink", "getSportsVenuePhoto", 'rightsStatus: "unknown"', "displayAllowed: false", "buildDisplayImage", 'rightsStatus: "verified-reusable"', "photo.licenseName", "photo.licenseUrl", "photo.author", "displayAllowed: true", "loadUpcomingTexasEventRecordsServer"]) requireText(adapter, token, "event adapter");
for (const token of ["buildGlobalEventCalendarServer", "buildTexasEventCarouselItemsServer", "formatCarouselRange", "categoryLabel", "lastVerifiedLabel", "contextMatches", "matchesLocation", "overlapsRange", 'timeZone: "America/Chicago"', "calendarDays", "calendarHref", "slice(0, 48)", "previousHref", "todayHref", "nextHref", "nextEventHref", "calendarDays: calendarDays(monthKey).map", "results: displayed.map"]) requireText(calendarServer, token, "server calendar view model");
for (const token of ["createServerFn", "loadUpcomingTexasEventRecordsServer", "upcomingEventRecords", "buildTexasEventCarouselItemsServer(records.slice(0, 12))", "limit: 200", "buildGlobalEventCalendarServer", "calendarView", "noindex, follow"]) requireText(eventDirectoryFacade, token, "normalized landing-event integration");

for (const accessibility of ['aria-roledescription="carousel"', 'aria-label="Previous events"', 'aria-label="Next events"', 'event.key === "ArrowLeft"', 'event.key === "ArrowRight"', 'className="ec-v"', 'className="ec-card"']) requireText(carousel, accessibility, "event carousel");
for (const token of ["event.image?.displayAllowed", "event.image.sourceUrl", "event.image.licenseUrl", "event.categoryLabel", "event.dateLabel", "event.locationLabel", "event.lastVerifiedLabel", "Official event site", "Last verified", "View all events"]) requireText(carousel, token, "event carousel");
for (const token of [".ec-v {", "overflow-x: auto", "scroll-snap-type: x mandatory", ".ec-card { min-width: 84%", "min-width: calc(33.333% - .7rem)", ".ec-b:hover", "@media (min-width: 640px)", "@media (min-width: 1024px)"]) requireText(styles, token, "event carousel responsive styles");

for (const token of ["validateSearch", "location:", "start:", "end:", "category:", "venue:", "getMajorEventLandingDirectory", "data: deps.search", "filtered: deps.filtered", "head: ({ loaderData }) => loaderData?.head ?? {}"] ) requireText(route, token, "events route search/SEO contract");
for (const token of ["lazy(() => import(\"@/components/events/EventsLandingPage\")", "Suspense", "EventsLandingPage"]) requireText(lazyRoute, token, "events route split boundary");
for (const token of ["TexasEventCarousel", "GlobalEventCalendar", "calendarView.calendarDays", "calendarView.previousHref", "calendarView.todayHref", "calendarView.nextHref", "Previous", "Today", "Next", "Jump to next event", 'name="location"', 'name="category"', 'name="venue"', "aria-current", "Official event site", "Last verified", "calendarView.results.length", "calendarView.totalCount"]) requireText(eventsSurface, token, "global calendar UX");

if (failures.length) {
  console.error("Global event/calendar validation failed:\n" + failures.map((failure) => `- ${failure}`).join("\n"));
  process.exit(1);
}

console.log("PASS: one source-qualified Texas event contract powers a server-bounded statewide calendar and contextual carousel with shareable filters, rights-safe venue photo fallback, freshness disclosure and accessible controls.");
