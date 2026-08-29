import type { MajorEventAuthorityRecord } from "./major-event-authority.server";

const records: MajorEventAuthorityRecord[] = [
  {
    slug: "texas-state-forest-festival",
    name: "Texas State Forest Festival",
    city: "Lufkin",
    countySlug: "angelina",
    countyName: "Angelina County",
    region: "piney-woods",
    category: "seasonal",
    startDate: "2026-09-17",
    endDate: "2026-09-20",
    venue: "George H. Henderson Expo Center",
    officialUrl: "https://www.texasstateforestfestival.com/",
    sourceCheckedAt: "2026-08-29",
    whyItMatters: "The Texas State Forest Festival gives travelers a concentrated East Texas weekend built around the region's forest identity, with four days of fair-style attractions, entertainment, food and family programming at Lufkin's George H. Henderson Expo Center.",
    planningSections: [
      { title: "Use the confirmed four-day window", body: "The organizer's current FAQ confirms September 17-20, 2026, with evening hours Thursday and Friday, a long Saturday and a shorter Sunday. Choose the day around the amount of festival time you want rather than assuming identical hours." },
      { title: "Plan parking and carnival time together", body: "The official FAQ identifies parking around the Expo Center and places the carnival inside the festival gates. If rides are part of the trip, review the current wristband windows and arrive early enough to use both the festival and carnival." },
      { title: "Make Lufkin part of the weekend", body: "The organizer points travelers toward Lufkin and Angelina County accommodations. Pair the festival with Piney Woods stops instead of treating the Expo Center as an isolated destination." },
    ],
    relatedLinks: [
      { href: "/browse/counties#county-angelina", label: "Explore Angelina County", description: "Build a broader Lufkin and Piney Woods itinerary." },
      { href: "/events", label: "Texas events calendar", description: "Compare other fall festivals across Texas." },
    ],
    sources: [
      { label: "Texas State Forest Festival official site", url: "https://www.texasstateforestfestival.com/" },
      { label: "Texas State Forest Festival official FAQ", url: "https://www.texasstateforestfestival.com/faq" },
    ],
  },
  {
    slug: "bayou-city-art-festival-memorial-park",
    name: "Bayou City Art Festival Memorial Park",
    city: "Houston",
    countySlug: "harris",
    countyName: "Harris County",
    region: "gulf-coast",
    category: "culture",
    startDate: "2026-10-09",
    endDate: "2026-10-11",
    venue: "Memorial Park South Picnic Lane",
    officialUrl: "https://www.bayoucityartfestival.com/",
    sourceCheckedAt: "2026-08-29",
    whyItMatters: "Bayou City Art Festival Memorial Park turns one of Houston's signature green spaces into a three-day juried fine-art festival with hundreds of artists, food, music and family activities, making it a strong fall arts anchor for a Houston trip.",
    planningSections: [
      { title: "Anchor the visit to October 9-11", body: "The producer confirms the 2026 Memorial Park festival for Friday through Sunday, October 9-11, with gates open 10 a.m. to 6 p.m. daily. Use those published hours as the fixed point for the day." },
      { title: "Use the festival transportation plan", body: "The official festival information directs general parking to Delmar Stadium with shuttle service to the festival entrance. Recheck current parking-pass and shuttle details before driving to Memorial Park." },
      { title: "Leave time to actually browse the art", body: "The producer describes a large juried field spanning 19 art disciplines. A short drop-in can miss the point of the event, so allow a broad browsing window before adding other Houston stops." },
    ],
    relatedLinks: [
      { href: "/browse/counties#county-harris", label: "Explore Harris County", description: "Extend the arts weekend into a wider Houston-area trip." },
      { href: "/events", label: "Texas events calendar", description: "Compare other Texas arts and culture events." },
    ],
    sources: [
      { label: "Bayou City Art Festival official site", url: "https://www.bayoucityartfestival.com/" },
      { label: "Bayou City Art Festival official festival information", url: "https://www.bayoucityartfestival.com/festival-info" },
      { label: "City of Houston — Bayou City Art Festival", url: "https://www.houstontx.gov/events/bayou-city-art-festival.html" },
    ],
  },
  {
    slug: "western-heritage-classic",
    name: "Western Heritage Classic",
    city: "Abilene",
    countySlug: "taylor",
    countyName: "Taylor County",
    region: "prairies-lakes",
    category: "rodeo",
    startDate: "2027-05-06",
    endDate: "2027-05-09",
    venue: "Taylor County Expo Center",
    officialUrl: "https://www.westernheritageclassic.com/",
    sourceCheckedAt: "2026-08-29",
    whyItMatters: "The Western Heritage Classic is an Abilene destination weekend built around working-ranch traditions, combining ranch rodeo, chuckwagon competition, horse events, cowboy music and poetry, a parade, trade exhibits and heritage programming at the Taylor County Expo Center.",
    planningSections: [
      { title: "Hold May 6-9 for the 2027 Classic", body: "The organizer publishes May 6-9, 2027 as the official event window. The detailed schedule is still being filled in, so use the dates for travel planning and recheck the organizer before choosing individual performances." },
      { title: "Choose the ranch events that matter most", body: "The official event catalog spans ranch rodeo, chuckwagon cooking, matched horse racing, ranch-horse competition, a parade, music, poetry and other demonstrations. Prioritize a few signature programs instead of assuming every activity fits into one day." },
      { title: "Use the Expo Center logistics", body: "The organizer publishes ticket, parking, RV and grounds information for the Taylor County Expo Center. Confirm the current 2027 access rules once ticket sales and final schedules are live." },
    ],
    relatedLinks: [
      { href: "/browse/counties#county-taylor", label: "Explore Taylor County", description: "Build more of an Abilene-area trip around the Classic." },
      { href: "/events", label: "Texas events calendar", description: "Compare other Texas rodeos and western heritage events." },
    ],
    sources: [
      { label: "Western Heritage Classic official site", url: "https://www.westernheritageclassic.com/" },
      { label: "Western Heritage Classic — 2027 event schedule", url: "https://www.westernheritageclassic.com/p/events/schedule" },
      { label: "Taylor County Expo Center — facility calendar", url: "https://www.taylorcountyexpocenter.com/location/all-facilities" },
    ],
  },
  {
    slug: "bob-wills-day",
    name: "Bob Wills Day",
    city: "Turkey",
    countySlug: "hall",
    countyName: "Hall County",
    region: "panhandle",
    category: "music",
    startDate: "2027-04-22",
    endDate: "2027-04-24",
    venue: "Turkey, Texas",
    officialUrl: "https://bobwillsday.com/",
    sourceCheckedAt: "2026-08-29",
    whyItMatters: "Bob Wills Day turns the small Panhandle town of Turkey into a living Western Swing destination, bringing together dances, musicians, fiddling traditions, museum programming and a free outdoor concert around the hometown legacy of Bob Wills.",
    planningSections: [
      { title: "Use the organizer's 2027 save-the-date", body: "The official Bob Wills Day site already publishes April 22, 23 and 24, 2027. Treat that Thursday-through-Saturday window as confirmed while waiting for the detailed 2027 dance, contest and concert schedule." },
      { title: "Make Saturday the heritage anchor", body: "The Bob Wills Foundation says the celebration has traditionally centered on the last Saturday of April, and the official outdoor concert is tied to that Saturday tradition. If you can attend only one day, review the final Saturday program first." },
      { title: "Plan for a very small host town", body: "Turkey has limited lodging and services compared with a metro festival destination. Arrange accommodations and driving logistics early, then use the organizer for final venue and ticket details." },
    ],
    relatedLinks: [
      { href: "/browse/counties#county-hall", label: "Explore Hall County", description: "Connect Bob Wills Day to a broader Panhandle trip." },
      { href: "/texas-music", label: "Texas Music", description: "Place Bob Wills and Western Swing inside the larger Texas music story." },
      { href: "/events", label: "Texas events calendar", description: "Compare other Texas music festivals and heritage weekends." },
    ],
    sources: [
      { label: "Bob Wills Day official 2027 save-the-date", url: "https://bobwillsday.com/home-2/" },
      { label: "Bob Wills Foundation — annual tradition", url: "https://bobwillsday.com/bwd-2/" },
      { label: "Turkey, Texas — Bob Wills Day", url: "https://www.turkeytx.com/bob-wills-day" },
    ],
  },
];

const bySlug = new Map(records.map((event) => [event.slug, event]));

export function getExpandedMajorEventAuthorityTranche26Server(slug: string): MajorEventAuthorityRecord | null {
  return bySlug.get(slug) ?? null;
}
