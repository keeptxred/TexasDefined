import type { MajorEventAuthorityRecord } from "./major-event-authority.server";

const records: MajorEventAuthorityRecord[] = [
  {
    slug: "autumn-at-the-arboretum",
    name: "Autumn at the Arboretum",
    city: "Dallas",
    countySlug: "dallas",
    countyName: "Dallas County",
    region: "prairies-lakes",
    category: "seasonal",
    startDate: "2026-09-19",
    endDate: "2026-11-01",
    venue: "Dallas Arboretum and Botanical Garden",
    officialUrl: "https://www.dallasarboretum.org/autumn-at-the-arboretum/",
    sourceCheckedAt: "2026-08-29",
    whyItMatters: "Autumn at the Arboretum is one of North Texas's largest fall destination events, transforming the Dallas Arboretum with more than 100,000 pumpkins, gourds and squash while layering seasonal installations and special programming onto the garden's regular visitor experience.",
    planningSections: [
      { title: "Use September 19 through November 1 as the confirmed 2026 window", body: "The Dallas Arboretum publishes Autumn at the Arboretum for September 19 through November 1, 2026. The garden is open daily, but special evening programs and individual activities have their own dates and ticketing, so use the organizer calendar for day-specific planning." },
      { title: "Plan around the Pumpkin Village", body: "The 2026 Harvest Hues presentation uses more than 100,000 pumpkins, gourds and squash across Pumpkin Village. Weekend traffic and special-program dates can increase demand, so advance admission and parking planning are worthwhile." },
      { title: "Build the visit into a Dallas day", body: "The Arboretum sits on Garland Road near White Rock Lake. Pairing the garden with nearby East Dallas or lake-area stops can make better use of the trip than treating the festival as an isolated photo stop." },
    ],
    relatedLinks: [
      { href: "/browse/counties#county-dallas", label: "Explore Dallas County", description: "Connect the fall festival to more Dallas-area planning." },
      { href: "/events", label: "Texas events calendar", description: "Compare other fall festivals and seasonal events around Texas." },
    ],
    sources: [
      { label: "Dallas Arboretum — Autumn at the Arboretum", url: "https://www.dallasarboretum.org/autumn-at-the-arboretum/" },
      { label: "Dallas Arboretum 2026 press resources", url: "https://www.dallasarboretum.org/contact/press-resources/" },
    ],
  },
  {
    slug: "austin-powwow",
    name: "Austin Powwow and Native American Heritage Festival",
    city: "Austin",
    countySlug: "travis",
    countyName: "Travis County",
    region: "hill-country",
    category: "culture",
    startDate: "2026-11-21",
    endDate: "2026-11-21",
    venue: "Travis County Expo Center",
    officialUrl: "https://austinpowwow.net/",
    sourceCheckedAt: "2026-08-29",
    whyItMatters: "The Austin Powwow and Native American Heritage Festival brings dancers, artists, food vendors and Native communities together for a large one-day public cultural gathering in Central Texas, with the organizer describing it as one of the country's largest single-day powwows.",
    planningSections: [
      { title: "Anchor the trip on November 21", body: "The Native American Cultural Center publishes the 2026 Austin Powwow for Saturday, November 21, with event guidance running from 9 a.m. to 9 p.m. at the Travis County Expo Center." },
      { title: "Arrive before the busiest part of the day", body: "The organizer recommends arriving by 11 a.m. for closer parking before Grand Entry traffic builds. Parking is free, and the event uses the Expo Center and adjacent show-barn market areas, so comfortable walking shoes are practical." },
      { title: "Follow powwow etiquette", body: "The organizer asks visitors to request permission before photographing individual dancers and publishes additional safety and etiquette guidance. Treat the event as a living cultural gathering rather than a generic performance venue." },
    ],
    relatedLinks: [
      { href: "/browse/counties#county-travis", label: "Explore Travis County", description: "Build more of Austin and Travis County around the powwow." },
      { href: "/events", label: "Texas events calendar", description: "Compare other Texas cultural and heritage events." },
    ],
    sources: [
      { label: "Austin Powwow official site", url: "https://austinpowwow.net/" },
      { label: "Austin Powwow 2026 know-before-you-go guidance", url: "https://austinpowwow.net/purchase-confirmation/" },
      { label: "Austin Powwow organizer background", url: "https://austinpowwow.net/about-austin-powwow/" },
    ],
  },
  {
    slug: "ford-holiday-river-parade",
    name: "Ford Holiday River Parade and Lighting Ceremony",
    city: "San Antonio",
    countySlug: "bexar",
    countyName: "Bexar County",
    region: "south-texas-plains",
    category: "seasonal",
    startDate: "2026-11-27",
    endDate: "2026-11-27",
    venue: "San Antonio River Walk",
    officialUrl: "https://www.thesanantonioriverwalk.com/events/ford-holiday-river-parade/",
    sourceCheckedAt: "2026-08-29",
    whyItMatters: "The Ford Holiday River Parade is San Antonio's signature start to the Christmas season, combining illuminated river floats, live entertainment and the River Walk lighting ceremony in one of Texas's most recognizable visitor districts.",
    planningSections: [
      { title: "Use November 27 as the confirmed 2026 parade date", body: "The official River Walk organizer publishes the 45th annual parade and lighting ceremony for Friday, November 27, 2026. The parade begins at 6 p.m. at the Tobin Center, with the televised portion beginning later from the Arneson River Theatre." },
      { title: "Choose ticketed or free viewing deliberately", body: "The organizer sells reserved viewing sections and also publishes a limited free viewing area on the east side of the River Walk between Pecan Street and Richmond Avenue. Free space is first come, first served, so arrival timing matters." },
      { title: "Expect special River Walk access rules", body: "The event has restrictions on strollers, ice chests and carriers in the viewing area and publishes dedicated ADA sections. Review the current event rules before committing to a particular part of the parade route." },
    ],
    relatedLinks: [
      { href: "/browse/counties#county-bexar", label: "Explore Bexar County", description: "Build more San Antonio and Bexar County stops around the parade." },
      { href: "/events", label: "Texas events calendar", description: "Compare other holiday and seasonal events across Texas." },
    ],
    sources: [
      { label: "San Antonio River Walk — Ford Holiday River Parade", url: "https://www.thesanantonioriverwalk.com/events/ford-holiday-river-parade/" },
      { label: "San Antonio River Walk event calendar", url: "https://www.thesanantonioriverwalk.com/events/" },
    ],
  },
];

const bySlug = new Map(records.map((event) => [event.slug, event]));

export function getExpandedMajorEventAuthorityTranche35Server(slug: string): MajorEventAuthorityRecord | null {
  return bySlug.get(slug) ?? null;
}
