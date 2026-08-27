import type { MajorEventAuthorityRecord } from "./major-event-authority.server";

const records: MajorEventAuthorityRecord[] = [
  {
    slug: "schulenburg-festival",
    name: "Schulenburg Festival",
    city: "Schulenburg",
    countySlug: "fayette",
    countyName: "Fayette County",
    region: "prairies-lakes",
    category: "culture",
    startDate: "2027-08-05",
    endDate: "2027-08-08",
    dateNote: "The organizer states that the Schulenburg Festival is always the first weekend in August. Its current format runs Thursday through Sunday around that first August weekend; applying that published recurrence to 2027 yields August 5-8. Recheck the organizer when the dedicated 2027 schedule is released.",
    venue: "Wolters Park",
    officialUrl: "https://www.schulenburgfestival.org/",
    sourceCheckedAt: "2026-08-27",
    whyItMatters: "Schulenburg Festival combines rodeo, music, cook-offs, a parade and community reunions in a town that sits at the center of Texas' German and Czech cultural landscape, making the event a natural bridge into Fayette County heritage travel.",
    planningSections: [
      { title: "Treat the dates as recurrence-derived until the 2027 program posts", body: "The festival itself says it is always held the first weekend in August. Texas Defined has mapped that standing rule to August 5-8, 2027, but the organizer's year-specific schedule should control individual activity times once published." },
      { title: "Pick the rodeo, music or parade as your anchor", body: "Recent programs spread major activities across the four-day run. Decide what matters most before choosing a day, because the rodeo, headline music, cook-offs and parade do not all occur at the same time." },
      { title: "Connect the weekend to Fayette County heritage", body: "Schulenburg is well positioned for a broader German-Czech Texas trip. Leave room for nearby historic communities, painted churches and local food traditions rather than treating the festival as an isolated stop." },
    ],
    relatedLinks: [
      { href: "/german-czech-texas-towns", label: "German and Czech Texas towns", description: "Connect Schulenburg to the larger Central Texas heritage corridor." },
      { href: "/browse/counties#county-fayette", label: "Explore Fayette County", description: "Plan more of the surrounding visit." },
      { href: "/events", label: "Texas events calendar", description: "Compare other Texas heritage festivals." },
    ],
    sources: [
      { label: "Schulenburg Festival official site", url: "https://www.schulenburgfestival.org/" },
      { label: "Schulenburg Festival official schedule", url: "https://www.schulenburgfestival.org/schedule" },
      { label: "Schulenburg Festival official press releases", url: "https://www.schulenburgfestival.org/news" },
    ],
  },
  {
    slug: "westfest",
    name: "Westfest",
    city: "West",
    countySlug: "mclennan",
    countyName: "McLennan County",
    region: "prairies-lakes",
    category: "culture",
    startDate: "2027-09-03",
    endDate: "2027-09-05",
    dateNote: "Westfest states that it is an annual Labor Day Weekend event. Its current format includes a Friday preview party, Saturday parade and Sunday closing activities; applying that standing pattern to Labor Day Weekend 2027 yields September 3-5. Recheck the organizer when the dedicated 2027 program is posted.",
    venue: "West Fair and Rodeo Grounds",
    officialUrl: "https://westfest.com/",
    sourceCheckedAt: "2026-08-27",
    whyItMatters: "Westfest is one of Texas' best-known Czech heritage festivals, combining polka, Czech food, a downtown parade, dancing and community traditions in West over Labor Day weekend.",
    planningSections: [
      { title: "Use the Labor Day Weekend recurrence as the planning window", body: "The organizer describes Westfest as an annual Labor Day Weekend event. Texas Defined maps the current Friday-through-Sunday format to September 3-5, 2027, while leaving year-specific performance times to the future organizer schedule." },
      { title: "Plan around the Saturday parade if it matters to you", body: "The official parade guidance places the downtown parade on Labor Day Saturday. If the parade is part of your trip, arrive early enough for downtown viewing before heading to the festival grounds." },
      { title: "Expect a full heritage festival, not one concert", body: "Westfest mixes continuous music, food, dancing, contests, arts and crafts and family activities. Review the current schedule before choosing a one-day visit because different traditions are emphasized across the weekend." },
    ],
    relatedLinks: [
      { href: "/german-czech-texas-towns", label: "German and Czech Texas towns", description: "Place Westfest in the larger Czech-Texan story." },
      { href: "/browse/counties#county-mclennan", label: "Explore McLennan County", description: "Build a wider Central Texas itinerary." },
      { href: "/events", label: "Texas events calendar", description: "Compare other major Texas cultural events." },
    ],
    sources: [
      { label: "Westfest official site", url: "https://westfest.com/" },
      { label: "Westfest official about page", url: "https://westfest.com/about" },
      { label: "Westfest official parade guidance", url: "https://westfest.com/parade" },
    ],
  },
];

const bySlug = new Map(records.map((event) => [event.slug, event]));

export function getExpandedMajorEventAuthorityTranche11Server(slug: string): MajorEventAuthorityRecord | null {
  return bySlug.get(slug) ?? null;
}
