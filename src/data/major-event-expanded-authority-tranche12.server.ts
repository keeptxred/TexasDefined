import type { MajorEventAuthorityRecord } from "./major-event-authority.server";

const records: MajorEventAuthorityRecord[] = [
  {
    slug: "luling-watermelon-thump",
    name: "Luling Watermelon Thump",
    city: "Luling",
    countySlug: "caldwell",
    countyName: "Caldwell County",
    region: "prairies-lakes",
    category: "food",
    startDate: "2027-06-24",
    endDate: "2027-06-27",
    dateNote: "The organizer states that the Watermelon Thump is always held on the last full weekend of June and its current schedule runs Thursday through Sunday. Applying that published recurrence to 2027 yields June 24-27. Recheck the organizer when the dedicated 2027 schedule is released.",
    venue: "Downtown Luling",
    officialUrl: "https://www.watermelonthump.com/",
    sourceCheckedAt: "2026-08-27",
    whyItMatters: "The Luling Watermelon Thump turns the town's agricultural identity into a four-day summer tradition built around champion melons, seed-spitting contests, a parade, live music and community events, making it a natural Caldwell County road-trip anchor.",
    planningSections: [
      { title: "Use the recurrence rule as the planning window", body: "The organizer describes the Thump as the last full weekend of June and currently programs the festival Thursday through Sunday. Texas Defined maps that rule to June 24-27, 2027, while leaving year-specific performance and admission details to the future organizer schedule." },
      { title: "Make Saturday the tradition-heavy day", body: "The current festival pattern places the parade, melon-eating contest, champion watermelon auction and World Championship Seed Spitting Contest on Saturday. If those traditions are your priority, plan for an early arrival and a long outdoor day." },
      { title: "Build in more of Caldwell County", body: "Luling works well as part of a broader Central Texas food and small-town trip. Leave room for nearby Lockhart and other Caldwell County stops rather than driving in only for a single concert." },
    ],
    relatedLinks: [
      { href: "/browse/counties#county-caldwell", label: "Explore Caldwell County", description: "Connect the Thump to Luling, Lockhart and the surrounding county." },
      { href: "/events", label: "Texas events calendar", description: "Compare other summer festivals across Texas." },
    ],
    sources: [
      { label: "Luling Watermelon Thump official site", url: "https://www.watermelonthump.com/" },
      { label: "Watermelon Thump official recurrence notice", url: "https://newsite.watermelonthump.com/" },
      { label: "Watermelon Thump official weekend schedule", url: "https://www.watermelonthump.com/properties" },
    ],
  },
  {
    slug: "national-polka-festival",
    name: "National Polka Festival",
    city: "Ennis",
    countySlug: "ellis",
    countyName: "Ellis County",
    region: "prairies-lakes",
    category: "culture",
    startDate: "2026-05-22",
    endDate: "2026-05-24",
    dateNote: "As of November 15, 2026, the organizer still publishes its May 22–24, 2026 schedule and has not announced the 2027 dates. Memorial Day weekend is a historic recurrence pattern, NOT verification of May 28–30, 2027; do not index a projected upcoming edition as confirmed.",
    venue: "Downtown Ennis and festival halls",
    officialUrl: "https://www.nationalpolkafestival.com/",
    sourceCheckedAt: "2026-11-15",
    whyItMatters: "The National Polka Festival is one of the clearest living expressions of Czech-Texan heritage, combining polka music, traditional dress, a downtown parade, food, dancing and programming across Ennis festival halls over Memorial Day weekend.",
    planningSections: [
      { title: "Do not turn the Memorial Day recurrence into a confirmed 2027 ticket", body: "Ennis organizers still show the completed May 22–24, 2026 60th anniversary program. They say the event takes place each Memorial Day weekend, but the official page contains no year-specific 2027 calendar. Keep the completed edition as historical and watch for the committee's next announcement rather than advertising a calculated 2027 Friday–Sunday schedule. Recheck the organizer for its dedicated year-specific schedule before booking travel or buying tickets." },
      { title: "Plan around the Saturday parade", body: "The organizer's current format places the major downtown parade on Saturday morning before festival activity continues downtown and at the halls. Arrive early if the parade is a priority." },
      { title: "Expect a multi-venue heritage weekend", body: "The festival is not confined to one stage. Current programming spans downtown Ennis and multiple halls, so review the official schedule before deciding how much can fit into one day." },
    ],
    relatedLinks: [
      { href: "/german-czech-texas-towns", label: "German and Czech Texas towns", description: "Place Ennis and the festival inside the larger Czech-Texan heritage story." },
      { href: "/browse/counties#county-ellis", label: "Explore Ellis County", description: "Build a wider North Texas itinerary." },
      { href: "/events", label: "Texas events calendar", description: "Compare other Texas heritage festivals." },
    ],
    sources: [
      { label: "National Polka Festival official site", url: "https://www.nationalpolkafestival.com/" },
    ],
  },
];

const bySlug = new Map(records.map((event) => [event.slug, event]));

export function getExpandedMajorEventAuthorityTranche12Server(slug: string): MajorEventAuthorityRecord | null {
  return bySlug.get(slug) ?? null;
}
