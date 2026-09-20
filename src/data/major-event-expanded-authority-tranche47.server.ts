import type { MajorEventAuthorityRecord } from "./major-event-authority.server";

const records: MajorEventAuthorityRecord[] = [
  {
    slug: "blanco-lavender-festival",
    name: "22nd Annual Blanco Lavender Festival 2027",
    city: "Blanco",
    countySlug: "blanco",
    countyName: "Blanco County",
    region: "hill-country",
    category: "seasonal",
    startDate: "2027-06-04",
    endDate: "2027-06-06",
    dateNote: "The official festival and Hill Country Lavender sites have published June 4-6, 2027 as the 22nd annual Blanco Lavender Festival. As of September 20, 2026, the detailed 2027 market hours, entertainment schedule, shuttle pricing and farm-weekend schedule have not yet been published.",
    venue: "Historic Blanco town square and Hill Country Lavender",
    officialUrl: "https://www.blancolavenderfest.com/",
    sourceCheckedAt: "2026-09-20",
    whyItMatters: "The Blanco Lavender Festival grew out of Blanco County's pioneering commercial lavender industry and now connects the historic courthouse square with a working lavender farm, Texas-made products, growers, artists, food, drink and live music. It is one of Blanco's signature annual events and an unusually direct link between local agriculture and the town's visitor economy.",
    planningSections: [
      {
        title: "Save June 4-6, 2027 now; wait for the detailed program",
        body: "The official festival homepage and Hill Country Lavender have confirmed the Friday-through-Sunday dates for the 22nd annual festival. The complete 2027 market hours, music lineup, farm schedule, shuttle details and vendor program are not yet posted, so Texas Defined will not copy the 2026 timetable forward as if it were current.",
      },
      {
        title: "Expect two distinct visitor zones",
        body: "The festival's established structure uses the historic Blanco town square for the Lavender Market and Hill Country Lavender at 8241 FM 165 for the farm experience. The farm is several miles east of downtown, so visitors should plan for separate stops rather than assuming the entire event is walkable.",
      },
      {
        title: "Bloom conditions are never guaranteed",
        body: "Hill Country Lavender explicitly publishes bloom updates because lavender varieties respond differently to weather and can bloom before, during or after festival weekend. The farm has warned visitors in past seasons not to expect a solid purple field, so check the live bloom update close to the trip.",
      },
      {
        title: "Use the official festival page for parking and shuttle rules",
        body: "Past festivals have used remote parking and shuttles between Blanco and the lavender farm, but those prices and operating details can change. Treat any older parking or shuttle price as historical until the 2027 festival publishes its current logistics.",
      },
      {
        title: "Book Blanco-area lodging before the final schedule drops",
        body: "The festival is a multi-day signature event in a small Hill Country town with limited lodging inventory. Travelers who know they want the full weekend can reserve flexible Blanco or nearby Hill Country lodging before individual 2027 performances and vendor schedules are released.",
      },
    ],
    relatedLinks: [
      {
        href: "/destination/blanco",
        label: "Explore Blanco",
        description: "Use the town guide for the courthouse square, Blanco State Park, museums, food and year-round attractions around festival weekend.",
      },
      {
        href: "/county/blanco",
        label: "Explore Blanco County",
        description: "Connect the festival with Johnson City, Hye, the Pedernales corridor and a broader Hill Country weekend.",
      },
      {
        href: "/destination/blanco-state-park",
        label: "Blanco State Park",
        description: "Add river time only after checking current park capacity, weather and water conditions.",
      },
      {
        href: "/events",
        label: "Texas events calendar",
        description: "Compare other current Texas festivals and seasonal events.",
      },
    ],
    sources: [
      {
        label: "Blanco Lavender Festival — official site",
        url: "https://www.blancolavenderfest.com/",
      },
      {
        label: "Blanco Lavender Festival — contact and locations",
        url: "https://www.blancolavenderfest.com/contact",
      },
      {
        label: "Hill Country Lavender — events",
        url: "https://www.hillcountrylavender.com/events",
      },
      {
        label: "Hill Country Lavender — official farm site",
        url: "https://www.hillcountrylavender.com/",
      },
    ],
  },
];

const bySlug = new Map(records.map((event) => [event.slug, event]));

export function getExpandedMajorEventAuthorityTranche47Server(slug: string): MajorEventAuthorityRecord | null {
  return bySlug.get(slug) ?? null;
}
