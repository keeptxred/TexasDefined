import type { MajorEventAuthorityRecord } from "./major-event-authority.server";

const records: MajorEventAuthorityRecord[] = [
  {
    slug: "gruene-music-wine-festival",
    name: "Gruene Music & Wine Festival",
    city: "New Braunfels",
    countySlug: "comal",
    countyName: "Comal County",
    region: "hill-country",
    category: "music",
    startDate: "2026-10-08",
    endDate: "2026-10-11",
    venue: "Gruene Historic District, Gruene Hall and The Grapevine",
    officialUrl: "https://gruenemusicandwinefest.org/",
    sourceCheckedAt: "2026-08-29",
    whyItMatters: "The 40th Gruene Music & Wine Festival combines Texas and Americana music, Texas wine and beer, historic Gruene venues and fundraising for the United Way of Comal & Guadalupe Counties across four distinct October event days.",
    planningSections: [
      { title: "Treat each day as a different event experience", body: "The organizer confirms October 8-11, 2026 and programs four distinct days: Thursday's kickoff party, Friday's Stars & Guitars, Saturday's Tastings & Tunes and Sunday's all-star playlist. Pick the day by program before buying tickets or arranging lodging." },
      { title: "Know which activities are free and which are ticketed", body: "Some festival components are free while others require tickets or tables. Review the official ticket page for the exact program you want instead of assuming one festival admission covers the full four-day run." },
      { title: "Use historic Gruene as part of the itinerary", body: "Programming is spread across Gruene Hall, The Grapevine and the historic district. Leave walking and dining time between activities and connect the festival to a wider New Braunfels and Comal County visit." },
    ],
    relatedLinks: [
      { href: "/texas-music", label: "Texas Music", description: "Connect the festival to Texas live-music traditions and venues." },
      { href: "/browse/counties#county-comal", label: "Explore Comal County", description: "Build a larger New Braunfels and Hill Country itinerary." },
      { href: "/events", label: "Texas events calendar", description: "Compare other major fall music weekends." },
    ],
    sources: [
      { label: "Gruene Music & Wine Festival official site", url: "https://gruenemusicandwinefest.org/" },
      { label: "Gruene Music & Wine Festival official tickets and daily program", url: "https://gruenemusicandwinefest.org/tickets/" },
    ],
  },
  {
    slug: "texas-clay-festival",
    name: "Texas Clay Festival",
    city: "New Braunfels",
    countySlug: "comal",
    countyName: "Comal County",
    region: "hill-country",
    category: "culture",
    startDate: "2026-10-24",
    endDate: "2026-10-25",
    venue: "Gruene Historical District",
    officialUrl: "https://texasclayfestival.com/",
    sourceCheckedAt: "2026-08-29",
    whyItMatters: "The 34th annual Texas Clay Festival brings more than 80 Texas potters and clay artists into the Gruene Historical District for a two-day statewide showcase of functional, traditional and sculptural ceramics.",
    planningSections: [
      { title: "Hold October 24-25 for Gruene", body: "The organizer confirms Saturday and Sunday, October 24-25, 2026, with separate daily hours. Use that two-day window and recheck the official site for artist or demonstration updates before making the trip." },
      { title: "Plan to browse rather than rush", body: "More than 80 Texas clay artists are expected. Give yourself time to compare work, talk with artists and move through the historic district instead of treating the festival as a quick retail stop." },
      { title: "Pair the festival with the historic district", body: "The setting is part of the draw. Build in time for Gruene's historic streets, dining and nearby New Braunfels stops so the event anchors a full Hill Country day." },
    ],
    relatedLinks: [
      { href: "/browse/counties#county-comal", label: "Explore Comal County", description: "Extend the festival into a broader New Braunfels and Gruene visit." },
      { href: "/events", label: "Texas events calendar", description: "Compare other arts and culture weekends." },
    ],
    sources: [
      { label: "Texas Clay Festival official site", url: "https://texasclayfestival.com/" },
      { label: "Texas Clay Festival official about and schedule page", url: "https://texasclayfestival.com/about/" },
    ],
  },
  {
    slug: "texas-craft-brewers-festival",
    name: "Texas Craft Brewers Festival",
    city: "Austin",
    countySlug: "travis",
    countyName: "Travis County",
    region: "hill-country",
    category: "food",
    startDate: "2026-11-14",
    endDate: "2026-11-14",
    venue: "Fiesta Gardens",
    officialUrl: "https://texascraftbrewersfestival.org/",
    sourceCheckedAt: "2026-08-29",
    whyItMatters: "The Texas Craft Brewers Festival is the Texas Craft Brewers Guild's statewide celebration of small and independent breweries, bringing roughly 80 Texas breweries and more than 200 craft beers to Austin's Fiesta Gardens for one major tasting day.",
    planningSections: [
      { title: "Use November 14 as the fixed event day", body: "The organizer confirms Saturday, November 14, 2026 at Fiesta Gardens, with VIP entry at noon, general admission at 2 p.m., last call at 6:15 p.m. and festival close at 6:30 p.m." },
      { title: "Treat the 21-plus rule as absolute", body: "The official visitor information says the festival is strictly 21 and older, including no admission for infants or children. Confirm identification and ticket requirements before building a group trip around the event." },
      { title: "Plan transportation before sampling", body: "The organizer recommends alternative transportation and notes limited neighborhood parking. Decide how you will arrive and leave before the tasting session rather than making that decision after entering the festival." },
    ],
    relatedLinks: [
      { href: "/browse/counties#county-travis", label: "Explore Travis County", description: "Connect the festival to a broader Austin visit." },
      { href: "/events", label: "Texas events calendar", description: "Compare other Texas food and drink events." },
    ],
    sources: [
      { label: "Texas Craft Brewers Festival official site", url: "https://texascraftbrewersfestival.org/" },
      { label: "Texas Craft Brewers Festival official visitor information", url: "https://texascraftbrewersfestival.org/info/" },
      { label: "Texas Craft Brewers Guild official festival listing", url: "https://texascraftbrewersguild.org/" },
    ],
  },
  {
    slug: "texas-tribune-festival",
    name: "Texas Tribune Festival",
    city: "Austin",
    countySlug: "travis",
    countyName: "Travis County",
    region: "hill-country",
    category: "culture",
    startDate: "2026-09-24",
    endDate: "2026-09-26",
    venue: "Downtown Austin venues",
    officialUrl: "https://festival.texastribune.org/",
    sourceCheckedAt: "2026-08-29",
    whyItMatters: "The Texas Tribune Festival is a three-day downtown Austin gathering centered on Texas and national civic life, public policy, journalism, technology, education and culture, with more than 100 programs spread across multiple venues in 2026.",
    planningSections: [
      { title: "Hold September 24-26 for downtown Austin", body: "The Texas Tribune confirms the 2026 festival for September 24-26. Use the official program to identify must-see sessions before choosing lodging or a daily arrival plan." },
      { title: "Treat the festival as a multi-venue event", body: "Sessions are distributed across downtown venues rather than one convention hall. Leave walking time between programs and avoid scheduling consecutive sessions that are unrealistic to reach." },
      { title: "Match the ticket to the access you need", body: "The organizer offers several ticket types with different benefits. Review the current ticket page for session access, priority-entry rules and special-event inclusions before purchasing." },
    ],
    relatedLinks: [
      { href: "/browse/counties#county-travis", label: "Explore Travis County", description: "Build a broader downtown Austin and Travis County visit." },
      { href: "/events", label: "Texas events calendar", description: "Compare other major Texas culture and public events." },
    ],
    sources: [
      { label: "Texas Tribune Festival official site", url: "https://festival.texastribune.org/" },
      { label: "Texas Tribune official 2026 lineup announcement", url: "https://www.texastribune.org/2026/08/18/texas-tribune-festival-2026-lineup/" },
      { label: "Texas Tribune Festival official tickets", url: "https://festival.texastribune.org/tickets" },
    ],
  },
  {
    slug: "san-antonio-beer-festival",
    name: "San Antonio Beer Festival",
    city: "San Antonio",
    countySlug: "bexar",
    countyName: "Bexar County",
    region: "south-texas",
    category: "food",
    startDate: "2026-10-17",
    endDate: "2026-10-17",
    venue: "Civic Park at Hemisfair",
    officialUrl: "https://sanantoniobeerfestival.com/",
    sourceCheckedAt: "2026-08-29",
    whyItMatters: "The 21st annual San Antonio Beer Festival brings a large tasting lineup, music, food vendors and games to Civic Park at Hemisfair while supporting the San Antonio Food Bank, creating a major adults-only fall event in downtown San Antonio.",
    planningSections: [
      { title: "Use October 17 as the fixed festival day", body: "The organizer confirms Saturday, October 17, 2026 at Civic Park at Hemisfair. VIP entry begins at noon, GA Plus at 1 p.m., general admission at 2 p.m., and the festival closes at 6:30 p.m." },
      { title: "Remember that this is strictly 21-plus", body: "The festival requires every guest to be at least 21 with valid identification. Build the group plan around that restriction before purchasing tickets or arranging transportation." },
      { title: "Avoid depending on downtown parking", body: "The organizer describes parking as limited and encourages rideshare. Decide on a safe arrival and departure plan in advance, especially because the event centers on beverage sampling." },
    ],
    relatedLinks: [
      { href: "/browse/counties#county-bexar", label: "Explore Bexar County", description: "Extend the event into a broader San Antonio visit." },
      { href: "/events", label: "Texas events calendar", description: "Compare other fall events across Texas." },
    ],
    sources: [
      { label: "San Antonio Beer Festival official site", url: "https://sanantoniobeerfestival.com/" },
      { label: "San Antonio Beer Festival official FAQ", url: "https://sanantoniobeerfestival.com/faqs/" },
    ],
  },
];

const bySlug = new Map(records.map((event) => [event.slug, event]));

export function getExpandedMajorEventAuthorityTranche29Server(slug: string): MajorEventAuthorityRecord | null {
  return bySlug.get(slug) ?? null;
}
