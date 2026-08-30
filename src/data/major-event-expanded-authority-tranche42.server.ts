import type { MajorEventAuthorityRecord } from "./major-event-authority.server";

type MajorEventAuthorityRecordWithWindows = MajorEventAuthorityRecord & {
  occurrenceWindows?: Array<{ label?: string; startDate: string; endDate?: string }>;
};

const records: MajorEventAuthorityRecordWithWindows[] = [
  {
    slug: "rockport-fulton-seafair",
    name: "Rockport-Fulton SeaFair",
    city: "Rockport",
    countySlug: "aransas",
    countyName: "Aransas County",
    region: "gulf-coast",
    category: "food",
    startDate: "2026-10-01",
    endDate: "2026-10-04",
    venue: "Rockport Harbor Festival Grounds",
    officialUrl: "https://www.rockportseafair.com/",
    sourceCheckedAt: "2026-08-30",
    whyItMatters: "Rockport-Fulton SeaFair is a four-day Gulf Coast tradition combining live music, Cajun cooking competitions, crab races, a downtown parade, carnival rides and harbor-side family programming in Rockport.",
    planningSections: [
      { title: "Use October 1-4 as the confirmed 2026 festival window", body: "The organizer publishes the 51st annual SeaFair for October 1 through 4, 2026 at Rockport Harbor. Thursday and Friday begin later in the day, while Saturday carries the parade, cook-off and the densest program." },
      { title: "Make Saturday the activity-heavy day", body: "The current schedule places the downtown SeaFair Parade, Cajun cook-off and cardboard boat races on Saturday before the evening music program. If you only have one day, review Saturday's official schedule first." },
      { title: "Build a coastal weekend around the harbor", body: "SeaFair is naturally paired with Rockport, Fulton and the Aransas County waterfront. Leave time for the coast outside festival hours and check the organizer's latest parking and ticket guidance before traveling." },
    ],
    relatedLinks: [
      { href: "/browse/counties#county-aransas", label: "Explore Aransas County", description: "Build more Rockport-Fulton and coastal stops around SeaFair." },
      { href: "/events", label: "Texas events calendar", description: "Compare other Gulf Coast and fall events." },
    ],
    sources: [
      { label: "Rockport-Fulton SeaFair official site", url: "https://www.rockportseafair.com/" },
      { label: "SeaFair official experience and schedule", url: "https://www.rockportseafair.com/experience" },
      { label: "SeaFair official ticket information", url: "https://www.rockportseafair.com/tickets" },
    ],
  },
  {
    slug: "orange-film-and-arts-festival",
    name: "Orange Film and Arts Festival",
    city: "Orange",
    countySlug: "orange",
    countyName: "Orange County",
    region: "gulf-coast",
    category: "culture",
    startDate: "2026-11-05",
    endDate: "2026-11-08",
    venue: "Downtown Orange venues",
    officialUrl: "https://www.orangefilmandartsfestival.com/",
    sourceCheckedAt: "2026-08-30",
    whyItMatters: "The Orange Film and Arts Festival gives Southeast Texas a multi-day showcase for independent film, visual art, theater, comedy, workshops and creative-industry conversations centered in Orange.",
    planningSections: [
      { title: "Use November 5-8 as the confirmed 2026 festival window", body: "The festival organizer publishes November 5 through 8, 2026, and the Texas Film Commission independently lists the same four-day window. Use the organizer for final screening, workshop and venue times." },
      { title: "Build the visit around a program track", body: "The festival combines screenings with visual art, theater, comedy, panels, workshops and networking. Review the current program and choose priority sessions before arrival because activities can overlap across venues." },
      { title: "Make downtown Orange part of the trip", body: "The festival is designed to strengthen downtown Orange as a creative hub. Leave time between scheduled programs for the district and broader Orange County rather than moving only from screening to screening." },
    ],
    relatedLinks: [
      { href: "/browse/counties#county-orange", label: "Explore Orange County", description: "Build more Southeast Texas stops around the festival." },
      { href: "/events", label: "Texas events calendar", description: "Compare other Texas arts and film events." },
    ],
    sources: [
      { label: "Orange Film and Arts Festival official site", url: "https://www.orangefilmandartsfestival.com/" },
      { label: "Orange Film and Arts Festival official overview", url: "https://www.orangefilmandartsfestival.com/overview" },
      { label: "Texas Film Commission event listing", url: "https://gov.texas.gov/film/event/orange-film-and-arts-festival-2026" },
    ],
  },
  {
    slug: "big-country-frontier-day",
    name: "Big Country Frontier Day",
    city: "Tuscola",
    countySlug: "taylor",
    countyName: "Taylor County",
    region: "panhandle-plains",
    category: "culture",
    startDate: "2026-11-14",
    endDate: "2026-11-14",
    venue: "Abilene State Park",
    officialUrl: "https://tpwd.texas.gov/calendar/abilene/copy2_of_big-country-frontier-day",
    sourceCheckedAt: "2026-08-30",
    whyItMatters: "Big Country Frontier Day turns Abilene State Park into a one-day living-history gathering focused on the Native peoples, soldiers, settlers, cowboys, music and dance that shaped the Texas frontier experience.",
    planningSections: [
      { title: "Use November 14 as the confirmed 2026 date", body: "Texas Parks and Wildlife schedules Big Country Frontier Day for Saturday, November 14, 2026 from 10 a.m. to 4 p.m. at Abilene State Park. Reserve the current day pass if the agency recommends doing so for guaranteed entry." },
      { title: "Treat it as a living-history day", body: "The event emphasizes re-enactors and cultural perspectives rather than rides or a conventional fair midway. Give demonstrations time to unfold and use the park's current program to prioritize the history presentations that interest you most." },
      { title: "Use the event to anchor a Big Country trip", body: "Abilene State Park sits south of Abilene near Tuscola, so the event can connect naturally to a broader Taylor County weekend. Build travel time into the plan rather than assuming a downtown Abilene venue." },
    ],
    relatedLinks: [
      { href: "/browse/counties#county-taylor", label: "Explore Taylor County", description: "Connect the event to Abilene, Tuscola and the surrounding Big Country." },
      { href: "/texas-history", label: "Texas history", description: "Continue into Texas Defined's statewide history coverage." },
      { href: "/events", label: "Texas events calendar", description: "Compare other Texas living-history events." },
    ],
    sources: [
      { label: "Texas Parks and Wildlife — Big Country Frontier Day", url: "https://tpwd.texas.gov/calendar/abilene/copy2_of_big-country-frontier-day" },
      { label: "Texas Parks and Wildlife fairs and festivals calendar", url: "https://tpwd.texas.gov/calendar/fairs-festivals-and-food" },
    ],
  },
  {
    slug: "fort-richardson-living-history-days",
    name: "Fort Richardson Living History Days",
    city: "Jacksboro",
    countySlug: "jack",
    countyName: "Jack County",
    region: "prairies-lakes",
    category: "culture",
    startDate: "2026-11-13",
    endDate: "2026-11-14",
    dateNote: "Texas Parks and Wildlife schedules November 13 for school, private-school and homeschool groups and November 14 for the general public. Texas Defined models those as two labeled occurrence windows rather than treating both days as identical public programming.",
    occurrenceWindows: [
      { label: "School and homeschool day", startDate: "2026-11-13", endDate: "2026-11-13" },
      { label: "General public day", startDate: "2026-11-14", endDate: "2026-11-14" },
    ],
    venue: "Fort Richardson State Park & Historic Site",
    officialUrl: "https://tpwd.texas.gov/calendar/fort-richardson/living-history-days",
    sourceCheckedAt: "2026-08-30",
    whyItMatters: "Fort Richardson Living History Days uses one of Texas's major 19th-century frontier sites for military drills, black-powder demonstrations, blacksmithing, chuckwagon interpretation and hands-on stories about soldiers, settlers and craftspeople.",
    planningSections: [
      { title: "Use Saturday for the general-public program", body: "Texas Parks and Wildlife identifies Friday, November 13 for school groups and Saturday, November 14 for the general public. General travelers should build around Saturday unless they are attending through an eligible educational group." },
      { title: "Plan for an outdoor historic-site day", body: "The agency recommends comfortable walking shoes and water. Demonstrations occur around the historic parade grounds and site, so plan for weather and walking rather than expecting a single indoor performance." },
      { title: "Keep Jacksboro and Jack County in the itinerary", body: "The fort is the anchor, but Living History Days can support a broader North Texas history trip. Leave time for Jacksboro and other local history stops around the fixed park schedule." },
    ],
    relatedLinks: [
      { href: "/browse/counties#county-jack", label: "Explore Jack County", description: "Build more Jacksboro and Jack County stops around Fort Richardson." },
      { href: "/texas-history", label: "Texas history", description: "Continue into Texas Defined's statewide history coverage." },
      { href: "/events", label: "Texas events calendar", description: "Compare other Texas living-history events." },
    ],
    sources: [
      { label: "Texas Parks and Wildlife — Living History Days", url: "https://tpwd.texas.gov/calendar/fort-richardson/living-history-days" },
      { label: "Texas Parks and Wildlife — November 14 public occurrence", url: "https://tpwd.texas.gov/calendar/fort-richardson/living-history-days/2026-11-14" },
    ],
  },
];

const bySlug = new Map(records.map((event) => [event.slug, event]));

export function getExpandedMajorEventAuthorityTranche42Server(slug: string): MajorEventAuthorityRecordWithWindows | null {
  return bySlug.get(slug) ?? null;
}
