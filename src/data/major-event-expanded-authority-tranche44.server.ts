import type { MajorEventAuthorityRecord } from "./major-event-authority.server";

const records: MajorEventAuthorityRecord[] = [
  {
    slug: "fort-worth-parade-of-lights",
    name: "Fort Worth Parade of Lights",
    city: "Fort Worth",
    countySlug: "tarrant",
    countyName: "Tarrant County",
    region: "prairies-lakes",
    category: "seasonal",
    startDate: "2026-11-22",
    endDate: "2026-11-22",
    venue: "Downtown Fort Worth",
    officialUrl: "https://fortworthparadeoflights.org/",
    sourceCheckedAt: "2026-09-05",
    whyItMatters: "The Fort Worth Parade of Lights is a major downtown holiday tradition built around illuminated floats, marching bands, equestrian units, antique vehicles and Santa, giving visitors a concentrated evening event in the center of Fort Worth.",
    planningSections: [
      { title: "Use November 22 as the confirmed 2026 parade date", body: "The organizer publishes Sunday, November 22, 2026 at 6 p.m. for the downtown parade. Treat that start time as the fixed point and arrive earlier for street closures, parking and finding a viewing location." },
      { title: "Know the official downtown route", body: "The published route starts near Weatherford and Throckmorton, moves through Commerce, 9th and Houston streets, and returns toward Throckmorton. The organizer identifies staging areas where public viewing is not allowed, so use the current route map instead of choosing a spot from an older parade pattern." },
      { title: "Choose free viewing or reserved seating", body: "The parade is visible from public areas along the route, while the organizer also offers reserved seating. Review current availability before traveling if a guaranteed seat is important." },
    ],
    relatedLinks: [
      { href: "/browse/counties#county-tarrant", label: "Explore Tarrant County", description: "Build more Fort Worth stops around the parade." },
      { href: "/events", label: "Texas events calendar", description: "Compare other major Texas holiday traditions." },
    ],
    sources: [
      { label: "Fort Worth Parade of Lights official site", url: "https://fortworthparadeoflights.org/" },
      { label: "2026 Parade of Lights route information", url: "https://fortworthparadeoflights.org/gm-financial-parade-of-lights-information/route-information/" },
      { label: "2026 Parade of Lights media information", url: "https://fortworthparadeoflights.org/media/" },
    ],
  },
  {
    slug: "moody-gardens-holiday-in-the-gardens",
    name: "Moody Gardens Holiday in the Gardens",
    city: "Galveston",
    countySlug: "galveston",
    countyName: "Galveston County",
    region: "gulf-coast",
    category: "seasonal",
    startDate: "2026-11-21",
    endDate: "2027-01-02",
    venue: "Moody Gardens",
    officialUrl: "https://www.moodygardens.com/holiday-season",
    sourceCheckedAt: "2026-09-05",
    whyItMatters: "Holiday in the Gardens turns Moody Gardens into a long-running Galveston holiday destination with the Holiday Lights trail, ICE LAND, skating, seasonal films, live entertainment and family programming, making it useful for both day trips and overnight Gulf Coast visits.",
    planningSections: [
      { title: "Use November 21 through January 2 as the confirmed 2026-27 season", body: "Moody Gardens publishes November 21, 2026 through January 2, 2027 as the Holiday in the Gardens festival period. Individual attractions, dining events and special programs can use narrower dates, so check the official calendar before choosing a visit night." },
      { title: "Choose the attractions before buying tickets", body: "The holiday program includes ICE LAND, the Holiday Lights trail, ice skating, films, a live holiday show and other seasonal experiences. Ticket bundles and attraction availability vary, so decide what matters most before purchasing rather than assuming one admission includes every component." },
      { title: "Consider an overnight Galveston trip", body: "The season runs for more than a month and Moody Gardens promotes hotel packages tied to the holiday attractions. An overnight stay can make sense for visitors combining the festival with other Galveston destinations, especially on weekends and holiday periods." },
    ],
    relatedLinks: [
      { href: "/browse/counties#county-galveston", label: "Explore Galveston County", description: "Connect Moody Gardens with more island and Gulf Coast stops." },
      { href: "/events", label: "Texas events calendar", description: "Compare other Texas holiday and winter events." },
    ],
    sources: [
      { label: "Moody Gardens Holiday in the Gardens official page", url: "https://www.moodygardens.com/holiday-season" },
      { label: "Moody Gardens holiday attractions guide", url: "https://www.moodygardens.com/holiday-season/things-to-do" },
    ],
  },
  {
    slug: "holiday-with-the-cranes",
    name: "Holiday with the Cranes",
    city: "Galveston",
    countySlug: "galveston",
    countyName: "Galveston County",
    region: "gulf-coast",
    category: "seasonal",
    startDate: "2026-12-12",
    endDate: "2026-12-13",
    venue: "Galveston Island nature sites",
    officialUrl: "https://www.galvestonnaturetourism.org/holiday-with-the-cranes/",
    sourceCheckedAt: "2026-09-05",
    whyItMatters: "Holiday with the Cranes is Galveston's annual winter celebration of the Sandhill Cranes that spend the season on the island, combining birding and nature programming with a distinctive December reason to visit the Gulf Coast.",
    planningSections: [
      { title: "Use December 12-13 as the published 2026 weekend", body: "Visit Galveston, the island's official tourism bureau, publishes December 12-13, 2026 for Holiday with the Cranes and identifies the Galveston Island Nature Tourism Council as the presenter. Use the Nature Tourism Council for final program and registration details as the weekend approaches." },
      { title: "Expect nature programming rather than one festival ground", body: "The event is built around the island's wintering Sandhill Cranes and can include indoor and outdoor nature activities. Program locations and capacity can vary, so review the organizer's current schedule before setting the day's route." },
      { title: "Build around winter birding conditions", body: "The cranes are seasonal wildlife, not staged performers. Weather and bird movement affect what visitors see, so leave flexibility and use the event as part of a broader Galveston nature weekend." },
    ],
    relatedLinks: [
      { href: "/browse/counties#county-galveston", label: "Explore Galveston County", description: "Build a wider island itinerary around the crane weekend." },
      { href: "/outdoors-wildlife", label: "Texas outdoors and wildlife", description: "Continue into Texas Defined's nature coverage." },
      { href: "/events", label: "Texas events calendar", description: "Compare other Texas winter events." },
    ],
    sources: [
      { label: "Galveston Island Nature Tourism Council — Holiday with the Cranes", url: "https://www.galvestonnaturetourism.org/holiday-with-the-cranes/" },
      { label: "Visit Galveston 2026 Holiday with the Cranes listing", url: "https://www.visitgalveston.com/events/annual-events/holiday-with-the-cranes/" },
    ],
  },
];

const bySlug = new Map(records.map((event) => [event.slug, event]));

export function getExpandedMajorEventAuthorityTranche44Server(slug: string): MajorEventAuthorityRecord | null {
  return bySlug.get(slug) ?? null;
}
