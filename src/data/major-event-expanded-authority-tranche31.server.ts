import type { MajorEventAuthorityRecord } from "./major-event-authority.server";

const records: MajorEventAuthorityRecord[] = [
  {
    slug: "international-quilt-festival-houston",
    name: "International Quilt Festival/Houston",
    city: "Houston",
    countySlug: "harris",
    countyName: "Harris County",
    region: "gulf-coast",
    category: "culture",
    startDate: "2026-11-12",
    endDate: "2026-11-15",
    venue: "George R. Brown Convention Center",
    officialUrl: "https://www.quilts.com/quilt-festival/",
    sourceCheckedAt: "2026-08-29",
    whyItMatters: "International Quilt Festival/Houston fills the George R. Brown Convention Center with quilt and textile art, vendors, classes, lectures and educational programming, making it a major fall destination for fiber arts in Texas.",
    planningSections: [
      { title: "Use November 12-15 for the public show", body: "Quilts, Inc. confirms the 2026 public festival for November 12-15 at the George R. Brown Convention Center. Classes and related events begin November 10, so travelers enrolling in education programming may need to arrive before the public show opens." },
      { title: "Separate show admission from class planning", body: "The organizer publishes daily show hours and a separate class catalog. Decide whether the trip is primarily for the exhibition floor, classes or both before booking the length of stay." },
      { title: "Plan around a downtown convention-center day", body: "The event is based at the George R. Brown Convention Center in downtown Houston. Recheck the official show-info hub for current admission, accessibility, hotel and transportation guidance before arrival." },
    ],
    relatedLinks: [
      { href: "/browse/counties#county-harris", label: "Explore Harris County", description: "Build a broader Houston-area itinerary around the festival." },
      { href: "/events", label: "Texas events calendar", description: "Compare other Texas arts and culture events." },
    ],
    sources: [
      { label: "International Quilt Festival/Houston official page", url: "https://www.quilts.com/quilt-festival/" },
      { label: "International Quilt Festival/Houston official show hours", url: "https://www.quilts.com/quilt-festival/quilt-festival-houston/" },
      { label: "Quilts, Inc. official 2026 date-change announcement", url: "https://www.quilts.com/major-changes-announced-festival-dates-changed-market-discontinued/" },
    ],
  },
  {
    slug: "pecan-street-festival",
    name: "Pecan Street Festival",
    city: "Bee Cave",
    countySlug: "travis",
    countyName: "Travis County",
    region: "hill-country",
    category: "culture",
    startDate: "2026-09-12",
    endDate: "2026-09-13",
    venue: "Hill Country Galleria",
    officialUrl: "https://pecanstreetfestival.org/",
    sourceCheckedAt: "2026-08-29",
    whyItMatters: "Pecan Street Festival is a free two-day arts, crafts and music weekend presented by the Pecan Street Association, with visual artists, live music, food vendors and family activities at Hill Country Galleria in Bee Cave.",
    planningSections: [
      { title: "Use September 12-13 for the 2026 fall festival", body: "The organizer publishes Saturday, September 12 and Sunday, September 13, 2026 as the fall festival dates, with separate operating hours each day at Hill Country Galleria." },
      { title: "Use the current Bee Cave location, not old Sixth Street assumptions", body: "The official event-information page places the 2026 festival at Hill Country Galleria in Bee Cave. Follow the current organizer map and access guidance instead of relying on older descriptions of the festival's historic downtown Austin footprint." },
      { title: "Treat it as a free, browse-at-your-own-pace event", body: "Admission and parking are listed as free. Leave enough time for artist booths and the published music lineup, and recheck the event schedule if a particular performance is the reason for the trip." },
    ],
    relatedLinks: [
      { href: "/browse/counties#county-travis", label: "Explore Travis County", description: "Connect the Bee Cave festival to a wider western Travis County trip." },
      { href: "/events", label: "Texas events calendar", description: "Compare other fall arts and music festivals." },
    ],
    sources: [
      { label: "Pecan Street Festival official site", url: "https://pecanstreetfestival.org/" },
      { label: "Pecan Street Festival official 2026 event information", url: "https://pecanstreetfestival.org/event-info/" },
      { label: "Pecan Street Festival official about page", url: "https://pecanstreetfestival.org/about/" },
    ],
  },
  {
    slug: "lone-star-rally",
    name: "Lone Star Rally",
    city: "Galveston",
    countySlug: "galveston",
    countyName: "Galveston County",
    region: "gulf-coast",
    category: "culture",
    startDate: "2026-11-05",
    endDate: "2026-11-08",
    venue: "Downtown Galveston and Seawall event areas",
    officialUrl: "https://lonestarrally.com/",
    sourceCheckedAt: "2026-08-29",
    whyItMatters: "Lone Star Rally turns central Galveston into a four-day motorcycle gathering with bike and car shows, live entertainment, vendors and rally programming spread through downtown and Seawall event areas.",
    planningSections: [
      { title: "Hold November 5-8 for the 2026 rally", body: "The organizer's official homepage publishes November 5-8, 2026 for the Galveston rally. Use that four-day window for lodging and travel planning while rechecking the official entertainment schedule as final 2026 programming is posted." },
      { title: "Expect a distributed island event", body: "Official rally information references downtown, Strand, Harborside and Seawall activity rather than one enclosed venue. Review current maps before arrival and plan realistic movement between the areas you want to visit." },
      { title: "Use organizer parking and access guidance", body: "The rally publishes dedicated maps, parking options and accommodations information. Review those resources before driving onto the island because normal Galveston weekend assumptions may not fit a large rally footprint." },
    ],
    relatedLinks: [
      { href: "/browse/counties#county-galveston", label: "Explore Galveston County", description: "Extend the rally trip into a broader Galveston Island visit." },
      { href: "/events", label: "Texas events calendar", description: "Compare other major Texas fall events." },
    ],
    sources: [
      { label: "Lone Star Rally official 2026 site", url: "https://lonestarrally.com/" },
      { label: "Lone Star Rally official 2026 vendor and operating information", url: "https://lonestarrally.com/vendors/vendor-application-online/" },
    ],
  },
];

const bySlug = new Map(records.map((event) => [event.slug, event]));

export function getExpandedMajorEventAuthorityTranche31Server(slug: string): MajorEventAuthorityRecord | null {
  return bySlug.get(slug) ?? null;
}
