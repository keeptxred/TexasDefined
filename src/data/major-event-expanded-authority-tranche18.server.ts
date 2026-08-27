import type { MajorEventAuthorityRecord } from "./major-event-authority.server";

const records: MajorEventAuthorityRecord[] = [
  {
    slug: "larry-joe-taylor-texas-music-festival",
    name: "Larry Joe Taylor's Texas Music Festival",
    city: "Stephenville",
    countySlug: "erath",
    countyName: "Erath County",
    region: "prairies-lakes",
    category: "music",
    startDate: "2027-04-19",
    endDate: "2027-04-24",
    dateNote: "The official LJT Fest site confirms the 38th annual festival for April 19-24, 2027 in Stephenville. This corrects the supplied seed inventory's separate 'Larry Joe Taylor Coastal Cowboy Festival' entry, which placed an April event in Galveston; the organizer's current calendar instead identifies the April 2027 flagship festival in Stephenville, while its Galveston-linked Coastin' & Cruisin' event runs January 3-10, 2027.",
    venue: "Melody Mountain Ranch",
    officialUrl: "https://ljtfest.com/",
    sourceCheckedAt: "2026-08-27",
    whyItMatters: "Larry Joe Taylor's Texas Music Festival is a long-running showcase of Texas country, Americana and songwriter culture. Its multi-day format at Melody Mountain Ranch combines a deep music lineup with camping and the festival's chili-cookoff tradition, making it a destination event rather than a single-night concert.",
    planningSections: [
      { title: "Use the organizer's confirmed six-day window", body: "The official festival site lists April 19-24, 2027 and already has festival tickets and open-camping reservations on sale. Use those dates as the authoritative planning window rather than the Galveston April placement in the discovery inventory." },
      { title: "Decide whether camping is part of the trip", body: "LJT Fest is structured around a ranch venue and multi-day attendance. Review the official camping options, arrival rules and ticket terms before booking lodging because a campsite-based trip is a materially different experience from commuting to individual performance days." },
      { title: "Build extra time around Stephenville", body: "The festival sits in Erath County west of the Dallas-Fort Worth core. If you are traveling from farther away, leave enough time for the drive, festival traffic and a wider Stephenville-area stop instead of planning a tight same-day turnaround." },
    ],
    relatedLinks: [
      { href: "/texas-music", label: "Texas Music", description: "Explore the artists, places and traditions behind the state's music identity." },
      { href: "/browse/counties#county-erath", label: "Explore Erath County", description: "Connect the festival to Stephenville and the surrounding county." },
      { href: "/events", label: "Texas events calendar", description: "Compare other Texas music festivals and spring events." },
    ],
    sources: [
      { label: "LJT Fest official site", url: "https://ljtfest.com/" },
      { label: "Larry Joe Taylor official tour schedule", url: "https://www.larryjoetaylor.com/tour.htm" },
    ],
  },
];

const bySlug = new Map(records.map((event) => [event.slug, event]));

export function getExpandedMajorEventAuthorityTranche18Server(slug: string): MajorEventAuthorityRecord | null {
  return bySlug.get(slug) ?? null;
}
