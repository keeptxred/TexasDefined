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
    startDate: "2027-05-28",
    endDate: "2027-05-30",
    dateNote: "The organizer states that the National Polka Festival is held every year on Memorial Day Weekend and its current format runs Friday through Sunday. Applying that published recurrence to 2027 yields May 28-30. Recheck the organizer when the dedicated 2027 program is released.",
    venue: "Downtown Ennis and festival halls",
    officialUrl: "https://www.nationalpolkafestival.com/",
    sourceCheckedAt: "2026-08-27",
    whyItMatters: "The National Polka Festival is one of the clearest living expressions of Czech-Texan heritage, combining polka music, traditional dress, a downtown parade, food, dancing and programming across Ennis festival halls over Memorial Day weekend.",
    planningSections: [
      { title: "Treat Memorial Day Weekend as the stable planning window", body: "The festival explicitly says it is held every year on Memorial Day Weekend. Texas Defined maps its current Friday-through-Sunday format to May 28-30, 2027, while year-specific band times and admissions remain subject to the future organizer schedule." },
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
