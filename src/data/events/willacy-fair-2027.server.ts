import type { TexasEventRecord } from "./texas-event-record";

/**
 * Willacy County Livestock Show & Fair's first-party 2027 confirmed dates.
 * Dates are from the organizer's actual 2027 homepage, not annual estimates.
 * Exact start times, fairground entrances, ticketing/contest fees and media
 * permissions have NOT been confirmed.
 */
const records: TexasEventRecord[] = [
  {
    id: "curated-willacy-fair-2027:beef-syndicate-bbq",
    slug: "willacy-county-beef-syndicate-bbq",
    title: "Willacy County Beef Syndicate BBQ",
    summary: "The Willacy County Livestock Show & Fair Association's official 2027 homepage lists its Beef Syndicate BBQ for January 16, 2027, as a separate kickoff community activity ahead of the livestock show. The organizer does not supply a start time, public meal service hours, menu, admission terms or verified exact venue on this date notice. Consult the current association program before travel.",
    guidePath: "/events?location=county%3Awillacy&start=2027-01-16&end=2027-01-16#calendar",
    startDate: "2027-01-16",
    city: "Raymondville",
    countySlug: "willacy",
    countyName: "Willacy County",
    region: "south-texas",
    category: "culture",
    venueName: "Willacy County fair community · Raymondville, Texas (confirm precise venue)",
    officialEventUrl: "https://www.wclsf.com/",
    status: "scheduled",
    lastVerifiedAt: "2026-11-23",
    lastUpdatedAt: "2026-11-23",
    sourceName: "Willacy County Livestock Show & Fair — original 2027 event notices",
  },
  {
    id: "curated-willacy-fair-2027:chili-cookoff",
    slug: "willacy-county-chili-cookoff",
    title: "Willacy County Fair Chili Cookoff",
    summary: "The Willacy County Livestock Show & Fair Association's 2027 current-edition homepage explicitly schedules its Chili Cookoff January 22–23, 2027. The date range identifies the event weekend but does not confirm daily start times, cooking or judging schedules, spectator access, fees or an exact venue entrance. Verify those details with the organizer rather than assuming the livestock-show hours.",
    guidePath: "/events?location=county%3Awillacy&start=2027-01-22&end=2027-01-23#calendar",
    startDate: "2027-01-22",
    endDate: "2027-01-23",
    city: "Raymondville",
    countySlug: "willacy",
    countyName: "Willacy County",
    region: "south-texas",
    category: "culture",
    venueName: "Willacy County fair community · Raymondville, Texas (confirm precise cookoff location)",
    officialEventUrl: "https://www.wclsf.com/",
    status: "scheduled",
    lastVerifiedAt: "2026-11-23",
    lastUpdatedAt: "2026-11-23",
    sourceName: "Willacy County Livestock Show & Fair — original 2027 event notices",
  },
  {
    id: "curated-willacy-fair-2027:livestock-show",
    slug: "willacy-county-livestock-show-and-fair",
    title: "Willacy County Livestock Show & Fair",
    summary: "The Willacy County Livestock Show & Fair's own 2027 event calendar announces its January 27–30, 2027, fair dates. The association also publishes separate programs for livestock, ropings, a ranch rodeo and entertainment, but the landing page does not establish each program's 2027 daily timetable, fees, precise arena access or complete visitor schedule. Check the organizer's official announcements before attending.",
    guidePath: "/events?location=county%3Awillacy&start=2027-01-27&end=2027-01-30#calendar",
    startDate: "2027-01-27",
    endDate: "2027-01-30",
    city: "Raymondville",
    countySlug: "willacy",
    countyName: "Willacy County",
    region: "south-texas",
    category: "culture",
    venueName: "Willacy County Livestock Showgrounds · Raymondville, Texas (confirm entrance)",
    officialEventUrl: "https://www.wclsf.com/",
    status: "scheduled",
    lastVerifiedAt: "2026-11-23",
    lastUpdatedAt: "2026-11-23",
    sourceName: "Willacy County Livestock Show & Fair — original 2027 fair date",
  },
];

export function getVerifiedWillacyFairCalendarEvents2027(): TexasEventRecord[] {
  return records.map((event) => ({ ...event }));
}
