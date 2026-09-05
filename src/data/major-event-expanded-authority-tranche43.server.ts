import type { MajorEventAuthorityRecord } from "./major-event-authority.server";

interface EventRecordWithWindows extends MajorEventAuthorityRecord {
  occurrenceWindows?: Array<{ label?: string; startDate: string; endDate?: string }>;
}

const records: EventRecordWithWindows[] = [
  {
    slug: "fredericksburg-food-wine-festival",
    name: "Fredericksburg Food & Wine Festival",
    city: "Fredericksburg",
    countySlug: "gillespie",
    countyName: "Gillespie County",
    region: "hill-country",
    category: "food",
    startDate: "2026-10-22",
    endDate: "2026-10-25",
    venue: "Fredericksburg festival venues",
    officialUrl: "https://fbgfoodandwine.com/",
    sourceCheckedAt: "2026-09-05",
    whyItMatters: "Fredericksburg Food & Wine Festival is a four-day Hill Country culinary weekend that moves through distinctive Fredericksburg settings, pairing Texas wine, chefs, restaurants and local hospitality with a Thursday opening night, Friday street dinner, Saturday Grand Tasting and Sunday brunch.",
    planningSections: [
      { title: "Use October 22-25 as the confirmed 2026 festival weekend", body: "The organizer publishes four consecutive ticketed events from Thursday through Sunday: Opening Night on October 22, the Street Dinner on October 23, the Grand Tasting on October 24 and Waterfront Brunch on October 25. Choose the event before booking because each day uses a different venue and format." },
      { title: "Treat Saturday as the broadest tasting day", body: "The Grand Tasting at Marktplatz is the weekend's largest tasting event, with dozens of wine, culinary, brewery and distillery partners. The more intimate dinner and brunch experiences have separate tickets and can sell out, so do not assume one ticket covers the entire weekend." },
      { title: "Build a Gillespie County food-and-wine trip", body: "Fredericksburg's downtown, wineries and US-290 corridor make the festival useful as a trip anchor rather than a single stop. Leave room outside the ticketed events for tasting rooms, restaurants and other Gillespie County destinations." },
    ],
    relatedLinks: [
      { href: "/browse/counties#county-gillespie", label: "Explore Gillespie County", description: "Build more Fredericksburg and Hill Country stops around the festival." },
      { href: "/food", label: "Texas food and BBQ", description: "Continue into Texas Defined's statewide food coverage." },
      { href: "/events", label: "Texas events calendar", description: "Compare other major Texas food and wine events." },
    ],
    sources: [
      { label: "Fredericksburg Food & Wine official site", url: "https://fbgfoodandwine.com/" },
      { label: "Fredericksburg Food & Wine 2026 event schedule", url: "https://fbgfoodandwine.com/events/" },
      { label: "Fredericksburg Food & Wine 2026 FAQ", url: "https://fbgfoodandwine.com/faq/" },
    ],
  },
  {
    slug: "korean-festival-houston",
    name: "Korean Festival Houston",
    city: "Houston",
    countySlug: "harris",
    countyName: "Harris County",
    region: "gulf-coast",
    category: "culture",
    startDate: "2026-10-10",
    endDate: "2026-10-11",
    venue: "Discovery Green",
    officialUrl: "https://www.kfesthouston.com/",
    sourceCheckedAt: "2026-09-05",
    whyItMatters: "Korean Festival Houston is a large free cultural festival at Discovery Green that combines Korean traditional arts, contemporary music and dance, food, vendors and community programming in downtown Houston over two full days.",
    planningSections: [
      { title: "Use October 10-11 as the confirmed 2026 weekend", body: "The organizer publishes Saturday, October 10 from 10 a.m. to 9 p.m. and Sunday, October 11 from 11 a.m. to 8 p.m. at Discovery Green. Admission is free, while the detailed performance lineup continues to be finalized." },
      { title: "Choose a day around performance priorities", body: "The festival uses multiple stages for traditional and contemporary programming, including cultural performances and a K-pop dance competition. Check the official schedule shortly before traveling because headliners and stage times can change after the event dates are already fixed." },
      { title: "Plan for a downtown Houston day", body: "Discovery Green puts the festival in a walkable downtown setting near other Houston attractions. Use transit or downtown parking guidance and leave time for nearby destinations before or after the festival." },
    ],
    relatedLinks: [
      { href: "/browse/counties#county-harris", label: "Explore Harris County", description: "Build more Houston-area stops around the festival." },
      { href: "/events", label: "Texas events calendar", description: "Compare other major Texas cultural festivals." },
    ],
    sources: [
      { label: "Korean Festival Houston official site", url: "https://www.kfesthouston.com/" },
      { label: "Korean Festival Houston 2026 performance schedule", url: "https://www.kfesthouston.com/schedule" },
      { label: "Korean Festival Houston history", url: "https://www.kfesthouston.com/about/history" },
    ],
  },
  {
    slug: "a-christmas-affair",
    name: "A Christmas Affair",
    city: "Austin",
    countySlug: "travis",
    countyName: "Travis County",
    region: "hill-country",
    category: "seasonal",
    startDate: "2026-11-13",
    endDate: "2026-11-22",
    occurrenceWindows: [
      { label: "Community Impact Center events", startDate: "2026-11-13", endDate: "2026-11-15" },
      { label: "Palmer Events Center market", startDate: "2026-11-18", endDate: "2026-11-22" },
    ],
    dateNote: "A Christmas Affair is not continuous daily programming from November 13-22. The organizer schedules children's and family events at the Junior League of Austin Community Impact Center on November 13-15, then the principal market and special events at Palmer Events Center on November 18-22.",
    venue: "Junior League of Austin Community Impact Center and Palmer Events Center",
    officialUrl: "https://www.jlaustin.org/a-christmas-affair/",
    sourceCheckedAt: "2026-09-05",
    whyItMatters: "A Christmas Affair is the Junior League of Austin's signature holiday fundraiser, bringing more than 200 merchants, themed events and family programming to Austin while supporting the league's community-impact work.",
    planningSections: [
      { title: "Use the two official 2026 event windows", body: "The organizer separates November 13-15 family programming at its Community Impact Center from the November 18-22 market and special events at Palmer Events Center. Texas Defined models those as separate occurrence windows rather than implying activity on the intervening dates." },
      { title: "Choose market admission or a special event", body: "General market admission covers a single shopping day at Palmer Events Center, while opening night, brunch, evening parties, children's events and other experiences use separate tickets. Review the official ticket page before purchasing because schedules, age guidance and inclusions differ." },
      { title: "Plan around Palmer Events Center crowds", body: "The principal market draws a large audience and more than 200 merchants. Choose your shopping day in advance, review parking and transportation guidance, and use Austin stops outside the event only when the ticketed schedule leaves enough time." },
    ],
    relatedLinks: [
      { href: "/browse/counties#county-travis", label: "Explore Travis County", description: "Build more Austin-area stops around the holiday market." },
      { href: "/events", label: "Texas events calendar", description: "Compare other major Texas holiday events." },
    ],
    sources: [
      { label: "Junior League of Austin — A Christmas Affair", url: "https://www.jlaustin.org/a-christmas-affair/" },
      { label: "2026 A Christmas Affair tickets and events", url: "https://www.jlaustin.org/a-christmas-affair/2026-a-christmas-affair-tickets-events/" },
      { label: "2026 A Christmas Affair about page", url: "https://www.jlaustin.org/a-christmas-affair/2026-a-christmas-affair-about/" },
    ],
  },
];

const bySlug = new Map(records.map((event) => [event.slug, event]));

export function getExpandedMajorEventAuthorityTranche43Server(slug: string): EventRecordWithWindows | null {
  return bySlug.get(slug) ?? null;
}
