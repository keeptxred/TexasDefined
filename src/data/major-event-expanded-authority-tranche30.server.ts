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
    whyItMatters: "Rodeo Austin combines a PRCA rodeo, concerts, carnival, fair attractions and a statewide youth livestock program at the Travis County Expo Center, giving Central Texas a major March western-sports and agriculture destination.",
    planningSections: [
      { title: "Hold March 12-27 for the 2027 Fair & Rodeo", body: "Rodeo Austin's official ticket and events pages confirm the 2027 Fair & Rodeo for March 12-27. Use that published window for lodging and travel planning, then recheck the daily concert, rodeo and livestock schedules as the organizer releases them." },
      { title: "Choose the program before choosing the day", body: "The event mixes ProRodeo and concerts with carnival, fair, shopping, food and youth livestock programming. Review the official schedule before buying tickets because the experience and access needs can vary substantially by day." },
      { title: "Plan around the Expo Center location", body: "Rodeo Austin's history identifies the Travis County Expo Center as its home. Check current organizer guidance for parking, rideshare, bag rules and gate procedures rather than assuming downtown Austin transportation patterns apply." },
    ],
    relatedLinks: [
      { href: "/browse/counties#county-travis", label: "Explore Travis County", description: "Build a broader Austin and Travis County trip around the rodeo." },
      { href: "/events", label: "Texas events calendar", description: "Compare other major Texas rodeos and spring events." },
    ],
    sources: [
      { label: "Rodeo Austin official tickets and 2027 dates", url: "https://rodeoaustin.com/tickets/" },
      { label: "Rodeo Austin official events calendar", url: "https://rodeoaustin.com/events/" },
      { label: "Rodeo Austin official history and Expo Center location", url: "https://rodeoaustin.com/about-us/history/" },
    ],
  },
  {
    slug: "austin-food-wine-festival",
    name: "Austin Food & Wine Festival",
    city: "Austin",
    countySlug: "travis",
    countyName: "Travis County",
    region: "hill-country",
    category: "food",
    startDate: "2026-11-06",
    endDate: "2026-11-08",
    venue: "The Long Center and Auditorium Shores",
    officialUrl: "https://www.austinfoodandwinefestival.com/",
    sourceCheckedAt: "2026-08-29",
    whyItMatters: "Austin Food & Wine Festival brings chef-driven tastings, cooking demonstrations, guided beverage sessions and live-fire programming to central Austin for a three-day culinary weekend spanning a Friday kickoff and weekend festival programming.",
    planningSections: [
      { title: "Use November 6-8 as the confirmed 2026 weekend", body: "The organizer publishes November 6-8, 2026. Friday's Made In Texas kickoff is at The Long Center, while Saturday and Sunday daytime festival programming is centered at Auditorium Shores, so the event should not be planned as a single-site weekend." },
      { title: "Know the 21-plus admission rule", body: "The official ticket page says attendees must be at least 21 years old. Confirm ticket type, identification requirements and any add-on access before building a group trip around the festival." },
      { title: "Plan transportation before the tasting sessions", body: "The organizer's visitor guidance encourages alternatives to driving and provides Auditorium Shores access information. Decide on rideshare, transit or another safe transportation plan before arrival." },
    ],
    relatedLinks: [
      { href: "/browse/counties#county-travis", label: "Explore Travis County", description: "Extend the festival into a broader Austin food and culture trip." },
      { href: "/events", label: "Texas events calendar", description: "Compare other major Texas food festivals." },
    ],
    sources: [
      { label: "Austin Food & Wine Festival official 2026 site", url: "https://www.austinfoodandwinefestival.com/" },
      { label: "Austin Food & Wine Festival official tickets and daily access", url: "https://www.austinfoodandwinefestival.com/tickets" },
      { label: "Austin Food & Wine Festival official transportation guidance", url: "https://support.austinfoodandwinefestival.com/hc/en-us/articles/4408281052692-How-do-I-get-to-the-festival" },
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
    whyItMatters: "The San Antonio Book Festival is a free downtown literary gathering that brings readers and writers together for author conversations, signings and family programming around the Central Library and UTSA Southwest Campus.",
    planningSections: [
      { title: "Hold April 10 for the 2027 festival", body: "The organizer's 2027 submission guidance and public FAQ both identify Saturday, April 10, 2027 as the 15th annual San Antonio Book Festival. Use that exact date for travel planning while waiting for the 2027 author lineup and session schedule." },
      { title: "Expect a multi-venue downtown day", body: "The festival's established footprint includes the Central Library and neighboring UTSA Southwest Campus. Once the 2027 schedule is released, allow walking time between sessions rather than treating the program as one auditorium." },
      { title: "Use the free-admission model, but still plan the day", body: "The organizer describes the festival as free and open to the public. Popular author sessions, parking and signings can still shape the day, so review the final map and program before arrival." },
    ],
    relatedLinks: [
      { href: "/browse/counties#county-bexar", label: "Explore Bexar County", description: "Build a broader San Antonio and Bexar County itinerary around the festival." },
      { href: "/events", label: "Texas events calendar", description: "Compare other major Texas arts and culture events." },
    ],
    sources: [
      { label: "San Antonio Book Festival official 2027 submission page", url: "https://sabookfestival.org/festival-info/submit-a-book/" },
      { label: "San Antonio Book Festival official FAQ and 2027 date", url: "https://sabookfestival.org/festival-info/faqs/" },
      { label: "San Antonio Book Festival mission and history", url: "https://sabookfestival.org/about/mission-history/" },
    ],
  },
];

const bySlug = new Map(records.map((event) => [event.slug, event]));

export function getExpandedMajorEventAuthorityTranche30Server(slug: string): MajorEventAuthorityRecord | null {
  return bySlug.get(slug) ?? null;
}
