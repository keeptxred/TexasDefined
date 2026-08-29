import type { MajorEventAuthorityRecord } from "./major-event-authority.server";

const records: MajorEventAuthorityRecord[] = [
  {
    slug: "rodeo-austin",
    name: "Rodeo Austin",
    city: "Austin",
    countySlug: "travis",
    countyName: "Travis County",
    region: "hill-country",
    category: "rodeo",
    startDate: "2027-03-12",
    endDate: "2027-03-27",
    venue: "Travis County Expo Center",
    officialUrl: "https://rodeoaustin.com/",
    sourceCheckedAt: "2026-08-29",
    whyItMatters: "Rodeo Austin combines a PRCA rodeo, concerts, carnival, fair attractions and a major youth livestock program at the Travis County Expo Center, giving Central Texas a substantial March western-sports and agriculture destination.",
    planningSections: [
      { title: "Hold March 12-27 for the 2027 Fair & Rodeo", body: "Rodeo Austin's official ticket and events pages confirm the 2027 Fair & Rodeo for March 12-27. Use that published window for lodging and travel planning, then recheck the daily concert, rodeo and livestock schedules as the organizer releases them." },
      { title: "Choose the program before choosing the day", body: "The event mixes ProRodeo and concerts with carnival, fair, shopping, food and youth livestock programming. Review the official schedule before buying tickets because the experience and access needs vary substantially by day." },
      { title: "Plan around the Expo Center location", body: "Rodeo Austin uses the Travis County Expo Center rather than a downtown venue. Check current organizer guidance for parking, rideshare, bag rules and gate procedures instead of assuming central-Austin transportation patterns apply." },
    ],
    relatedLinks: [
      { href: "/browse/counties#county-travis", label: "Explore Travis County", description: "Build a broader Austin and Travis County trip around the rodeo." },
      { href: "/events", label: "Texas events calendar", description: "Compare other major Texas rodeos and spring events." },
    ],
    sources: [
      { label: "Rodeo Austin official tickets and 2027 dates", url: "https://rodeoaustin.com/tickets/" },
      { label: "Rodeo Austin official events calendar", url: "https://rodeoaustin.com/events/" },
      { label: "Rodeo Austin 2027 livestock schedule", url: "https://rodeoaustin.com/youth-ag-programs/competitions/livestock-show/" },
    ],
  },
  {
    slug: "san-antonio-book-festival",
    name: "San Antonio Book Festival",
    city: "San Antonio",
    countySlug: "bexar",
    countyName: "Bexar County",
    region: "south-texas",
    category: "culture",
    startDate: "2027-04-10",
    endDate: "2027-04-10",
    venue: "Central Library and UTSA Southwest Campus",
    officialUrl: "https://sabookfestival.org/",
    sourceCheckedAt: "2026-08-29",
    whyItMatters: "The San Antonio Book Festival is a free literary gathering that brings readers and writers together for author conversations, signings and family programming around the Central Library and UTSA Southwest Campus.",
    planningSections: [
      { title: "Hold April 10 for the 2027 festival", body: "The organizer's public FAQ and 2027 submission guidance both identify Saturday, April 10, 2027 as the 15th annual San Antonio Book Festival. Use that exact date for travel planning while waiting for the author lineup and session schedule." },
      { title: "Expect a multi-venue downtown day", body: "The festival's established footprint includes the Central Library and neighboring UTSA Southwest Campus. Once the 2027 schedule is released, allow walking time between sessions rather than treating the program as one auditorium." },
      { title: "Free admission still benefits from advance planning", body: "The organizer describes the festival as free and open to the public. Popular author sessions, parking and signing lines can still shape the day, so review the final map and program before arrival." },
    ],
    relatedLinks: [
      { href: "/browse/counties#county-bexar", label: "Explore Bexar County", description: "Build a broader San Antonio and Bexar County itinerary around the festival." },
      { href: "/events", label: "Texas events calendar", description: "Compare other major Texas arts and culture events." },
    ],
    sources: [
      { label: "San Antonio Book Festival official FAQ and 2027 date", url: "https://sabookfestival.org/festival-info/faqs/" },
      { label: "San Antonio Book Festival official 2027 submission page", url: "https://sabookfestival.org/festival-info/submit-a-book/" },
    ],
  },
  {
    slug: "pecan-street-festival",
    name: "Pecan Street Festival",
    city: "Bee Cave",
    countySlug: "travis",
    countyName: "Travis County",
    region: "hill-country",
    category: "culture",
    startDate: "2026-09-12",
    endDate: "2026-09-13",
    venue: "Hill Country Galleria",
    officialUrl: "https://pecanstreetfestival.org/",
    sourceCheckedAt: "2026-08-29",
    whyItMatters: "Pecan Street Festival is a free two-day arts, crafts and music weekend presented by the Pecan Street Association, with visual artists, live music, food vendors and family activities at Hill Country Galleria in Bee Cave.",
    planningSections: [
      { title: "Use September 12-13 for the 2026 fall festival", body: "The organizer publishes Saturday, September 12 and Sunday, September 13, 2026 as the fall festival dates, with separate operating hours each day at Hill Country Galleria." },
      { title: "Use the current Bee Cave location", body: "The official event-information page places the 2026 festival at Hill Country Galleria in Bee Cave. Follow the current organizer map and access guidance instead of relying on older descriptions of the festival's historic downtown Austin footprint." },
      { title: "Treat it as a free browse-at-your-own-pace event", body: "Admission and parking are listed as free. Leave enough time for artist booths and the published music lineup, and recheck the event schedule if a particular performance is the reason for the trip." },
    ],
    relatedLinks: [
      { href: "/browse/counties#county-travis", label: "Explore Travis County", description: "Connect the Bee Cave festival to a wider western Travis County trip." },
      { href: "/events", label: "Texas events calendar", description: "Compare other fall arts and music festivals." },
    ],
    sources: [
      { label: "Pecan Street Festival official site", url: "https://pecanstreetfestival.org/" },
      { label: "Pecan Street Festival official 2026 event information", url: "https://pecanstreetfestival.org/event-info/" },
      { label: "Pecan Street Festival official 2026 music schedule", url: "https://pecanstreetfestival.org/music/" },
    ],
  },
  {
    slug: "lone-star-rally",
    name: "Lone Star Rally",
    city: "Galveston",
    countySlug: "galveston",
    countyName: "Galveston County",
    region: "gulf-coast",
    category: "culture",
    startDate: "2026-11-05",
    endDate: "2026-11-08",
    venue: "Downtown Galveston and Seawall event areas",
    officialUrl: "https://lonestarrally.com/",
    sourceCheckedAt: "2026-08-29",
    whyItMatters: "Lone Star Rally turns central Galveston into a four-day motorcycle gathering with bike and car shows, live entertainment, vendors and rally programming spread through downtown and Seawall event areas.",
    planningSections: [
      { title: "Hold November 5-8 for the 2026 rally", body: "The organizer's official homepage publishes November 5-8, 2026 for the Galveston rally. Use that four-day window for lodging and travel planning while rechecking the official entertainment schedule as final programming is posted." },
      { title: "Expect a distributed island event", body: "Official rally information references downtown, Strand, Harborside and Seawall activity rather than one enclosed venue. Review current maps before arrival and plan realistic movement between the areas you want to visit." },
      { title: "Use organizer parking and access guidance", body: "The rally publishes dedicated maps, parking options and accommodations information. Review those resources before driving onto the island because normal Galveston weekend assumptions may not fit a large rally footprint." },
    ],
    relatedLinks: [
      { href: "/browse/counties#county-galveston", label: "Explore Galveston County", description: "Extend the rally trip into a broader Galveston Island visit." },
      { href: "/events", label: "Texas events calendar", description: "Compare other major Texas fall events." },
    ],
    sources: [
      { label: "Lone Star Rally official 2026 site", url: "https://lonestarrally.com/" },
      { label: "Lone Star Rally official 2026 vendor operating information", url: "https://lonestarrally.com/vendors/food-application/" },
    ],
  },
];

const bySlug = new Map(records.map((event) => [event.slug, event]));

export function getExpandedMajorEventAuthorityTranche30Server(slug: string): MajorEventAuthorityRecord | null {
  return bySlug.get(slug) ?? null;
}
