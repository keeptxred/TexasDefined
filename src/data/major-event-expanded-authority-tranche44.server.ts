import type { MajorEventAuthorityRecord } from "./major-event-authority.server";

interface EventRecordWithWindows extends MajorEventAuthorityRecord {
  occurrenceWindows?: Array<{ label?: string; startDate: string; endDate?: string }>;
}

const records: EventRecordWithWindows[] = [
  {
    slug: "shiner-oktoberfest-weekends",
    name: "Shiner Oktoberfest Weekends",
    city: "Shiner",
    countySlug: "lavaca",
    countyName: "Lavaca County",
    region: "gulf-coast",
    category: "food",
    startDate: "2026-09-19",
    endDate: "2026-10-03",
    occurrenceWindows: [
      { label: "Weekend 1", startDate: "2026-09-19", endDate: "2026-09-19" },
      { label: "Weekend 2", startDate: "2026-09-26", endDate: "2026-09-26" },
      { label: "Weekend 3", startDate: "2026-10-03", endDate: "2026-10-03" },
    ],
    dateNote: "Three separate Saturday events are scheduled September 19, September 26 and October 3 at K. Spoetzl Brewery & Distillery; this is not a continuous September 19-October 3 event.",
    venue: "K. Spoetzl Brewery & Distillery",
    officialUrl: "https://shiner.com/event/oktoberfest-weekend-1/",
    sourceCheckedAt: "2026-09-19",
    whyItMatters: "Shiner Oktoberfest Weekends turn the Spoetzl Brewery campus into a three-Saturday fall heritage event, connecting Shiner's German and Czech community story with seasonal beer, German-style food, music and family games at the working brewery.",
    planningSections: [
      { title: "Treat the three Saturdays as separate event dates", body: "The brewery publishes September 19, September 26 and October 3 as three distinct Oktoberfest weekends. Texas Defined models them as separate occurrence windows so visitors do not mistake the span between September 19 and October 3 for continuous daily programming." },
      { title: "Admission is free, but the brewery still has normal visitor logistics", body: "The official event pages list free admission and all-day programming. Brewery tours, distillery tours, restaurant service and other campus experiences have their own schedules and capacity, so reserve a timed tour separately if it is part of the trip." },
      { title: "Use the event to explore Shiner beyond the brewery", body: "Shiner's painted church, local museum, municipal park and downtown are close enough to combine with the brewery. A full-day plan works better than arriving only for a single food or music block if this is your first trip to town." },
    ],
    relatedLinks: [
      { href: "/destination/spoetzl-brewery", label: "Visit K. Spoetzl Brewery", description: "Plan tours, current beer releases, food and the brewery visitor campus around Oktoberfest." },
      { href: "/destination/shiner", label: "Explore Shiner", description: "Build the event into a fuller small-town itinerary." },
      { href: "/county/lavaca", label: "Explore Lavaca County", description: "Connect Shiner with Hallettsville, Yoakum, Moulton and the wider Czech-German heritage landscape." },
      { href: "/event/wurstfest", label: "Compare Wurstfest", description: "Compare another major German-Texan fall festival in New Braunfels." },
      { href: "/events", label: "Texas events calendar", description: "See other current Texas fall events." },
    ],
    sources: [
      { label: "Shiner official Oktoberfest Weekend 1", url: "https://shiner.com/event/oktoberfest-weekend-1/" },
      { label: "Shiner official Oktoberfest Weekend 2", url: "https://shiner.com/event/oktoberfest-weekend-2/" },
      { label: "Shiner official Oktoberfest Weekend 3", url: "https://shiner.com/event/oktoberfest-weekend-3/" },
      { label: "Shiner brewery visitor information", url: "https://shiner.com/visit/" },
    ],
  },
  {
    slug: "shinerfest",
    name: "ShinerFest 2026",
    city: "Shiner",
    countySlug: "lavaca",
    countyName: "Lavaca County",
    region: "gulf-coast",
    category: "music",
    startDate: "2026-10-24",
    endDate: "2026-10-24",
    dateNote: "The official event page lists the 4th annual ShinerFest for October 24, 2026 from noon to 10 p.m. with rising country artists; admission was listed at $80 when reviewed September 19, 2026.",
    venue: "K. Spoetzl Brewery & Distillery",
    officialUrl: "https://shiner.com/event/shinerfest-2026/",
    sourceCheckedAt: "2026-09-19",
    whyItMatters: "ShinerFest turns the Spoetzl Brewery campus into a full-day country-music destination, giving Shiner a major live-music anchor in addition to its brewery tours, heritage sites and other fall events.",
    planningSections: [
      { title: "Use October 24 as the confirmed 2026 date", body: "The official brewery event page lists the 4th annual ShinerFest for Saturday, October 24, 2026 from noon to 10 p.m. at K. Spoetzl Brewery & Distillery." },
      { title: "Treat the posted $80 admission as time-sensitive", body: "The official page listed $80 admission when Texas Defined reviewed it on September 19, 2026. Recheck the current event page before purchasing because ticket availability, pricing and lineup details can change." },
      { title: "Plan the rest of Shiner around the concert block", body: "A noon-to-10 p.m. music event can consume most of the day. If the brewery tour, painted church, museum or downtown matter too, place them earlier or on a separate day rather than overpacking the event schedule." },
    ],
    relatedLinks: [
      { href: "/destination/spoetzl-brewery", label: "K. Spoetzl Brewery visitor guide", description: "Plan the brewery campus around ShinerFest." },
      { href: "/destination/shiner", label: "Explore Shiner", description: "Add town history and nearby attractions before or after the music event." },
      { href: "/county/lavaca", label: "Explore Lavaca County", description: "Turn the event into a broader Lavaca County weekend." },
      { href: "/events", label: "Texas events calendar", description: "Compare other current Texas music events." },
    ],
    sources: [
      { label: "Shiner official ShinerFest 2026 page", url: "https://shiner.com/event/shinerfest-2026/" },
      { label: "Shiner official events calendar", url: "https://shiner.com/events/" },
      { label: "Shiner brewery visitor information", url: "https://shiner.com/visit/" },
    ],
  },
  {
    slug: "shiner-beer-run",
    name: "15th Annual Shiner Beer Run",
    city: "Shiner",
    countySlug: "lavaca",
    countyName: "Lavaca County",
    region: "gulf-coast",
    category: "sport",
    startDate: "2026-11-21",
    endDate: "2026-11-21",
    dateNote: "The 2026 brewery calendar lists 5K, 10K and half-marathon races from 7 a.m. to 3 p.m.; registration can fill, so confirm current race availability before traveling.",
    venue: "K. Spoetzl Brewery & Distillery",
    officialUrl: "https://shiner.com/event/15th-annual-beer-run/",
    sourceCheckedAt: "2026-09-19",
    whyItMatters: "The annual Shiner Beer Run turns the brewery into a destination race venue, with 5K, 10K and half-marathon options that draw runners to Shiner for a fall event built around the town's best-known landmark.",
    planningSections: [
      { title: "Use November 21 as the confirmed 2026 race date", body: "Shiner's official event page lists the 15th annual Beer Run for Saturday, November 21, 2026, with event hours from 7 a.m. to 3 p.m. and 5K, 10K and half-marathon distances." },
      { title: "Register before treating the trip as fixed", body: "The organizer warns that race spots can fill. Confirm current registration status and participant instructions before booking a trip around the race, and use the organizer's current social or registration guidance for packet pickup, start times and race-day rules." },
      { title: "Plan the brewery and town around the race, not through it", body: "Race-day operations can change normal traffic, parking and campus flow. Keep brewery tours or a longer Shiner itinerary after the race only when the current schedule leaves enough recovery and travel time." },
    ],
    relatedLinks: [
      { href: "/destination/spoetzl-brewery", label: "K. Spoetzl Brewery visitor guide", description: "Plan the brewery campus before or after the race." },
      { href: "/destination/shiner", label: "Explore Shiner", description: "Turn race day into a broader Shiner visit." },
      { href: "/county/lavaca", label: "Explore Lavaca County", description: "Build a wider weekend around Shiner and nearby Lavaca County towns." },
      { href: "/events", label: "Texas events calendar", description: "Compare other Texas races and fall events." },
    ],
    sources: [
      { label: "Shiner official 15th Annual Beer Run", url: "https://shiner.com/event/15th-annual-beer-run/" },
      { label: "Shiner official events calendar", url: "https://shiner.com/events/" },
      { label: "Shiner brewery visitor information", url: "https://shiner.com/visit/" },
    ],
  },
];

const bySlug = new Map(records.map((event) => [event.slug, event]));

export function getExpandedMajorEventAuthorityTranche44Server(slug: string): EventRecordWithWindows | null {
  return bySlug.get(slug) ?? null;
}
