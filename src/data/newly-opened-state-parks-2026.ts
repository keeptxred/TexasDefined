import type { Destination } from "./types";

/**
 * Newly opened 2026 Texas state park with independent TPWD source research.
 * A dated historical Creative Commons photograph is used transparently: it must
 * not be represented as a photograph of the 2026 visitor facilities.
 */
export const newlyOpenedStateParks2026: Destination[] = [
  {
    id: "td-authority-palo-pinto-mountains-state-park",
    brandId: "texasdefined",
    slug: "palo-pinto-mountains-state-park",
    name: "Palo Pinto Mountains State Park",
    category: "state-parks",
    region: "prairies-lakes",
    nearestTown: "Strawn",
    county: "Palo Pinto",
    address: "100 Park Road 77, Strawn, TX 76475",
    coordinates: { lat: 32.53495, lng: -98.5566778 },
    hero: {
      src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/TAS_star_party_at_Palo_Pinto_State_Park_in_Strawn_Texas._Nov._3,_2013_-_panoramio.jpg?width=1600",
      alt: "Astronomy gathering photographed in November 2013 on the land that later opened as Palo Pinto Mountains State Park; not a photograph of the 2026 facilities",
      width: 1600, height: 1067,
      credit: "Bob Salazar · CC BY 3.0 · Wikimedia Commons · photographed November 2013",
    },
    summary: "Texas' newest state park opened to visitors in 2026 near Strawn. Plan Tucker Lake outings, rugged Cross Timbers hikes, accessible trails, camping and stargazing with the correct entrance and park-specific facilities.",
    bestSeason: "Spring and fall for walking and wildlife; watch heat during summer, and avoid wet-condition trail closures after rain.",
    entryNote: "TPWD opened the park to visits March 1, 2026. The main entrance is on Park Road 77 north of Strawn, open daily 8 a.m.–10 p.m.; reserve passes for weekends or holidays. Fees and campground availability can change, so check the official park site.",
    highlights: [
      "4,871 acres of former North Texas ranch land opened to visitors in 2026",
      "90-acre Tucker Lake, accessible kayak/canoe launch and fishing pier",
      "16 miles of multiuse trails, including 1.25 miles of accessible trails",
      "Warbler Ridge electric camping, Painted Stick walk-in camping and hike-in primitive sites",
      "Golden-cheeked warbler and night-sky viewing in a protected Cross Timbers landscape",
    ],
    body: [
      "Palo Pinto Mountains State Park is not simply another reservoir campsite: it is a 4,871-acre conservation landscape of plateaus, draws, oak-juniper woods and sheltered canyons that opened to public visits on March 1, 2026. TPWD purchased the former ranch in 2011 and developed the park over many years; a formal grand opening followed in April 2026. Parts of the property fall within both Palo Pinto and Stephens counties. Its newness makes older travel advice, photos and maps especially likely to be outdated.",
      "The park's central water feature is approximately 90-acre Tucker Lake. TPWD lists fishing, paddling, swimming, an accessible canoe/kayak launch, an accessible fishing pier and a fish cleaning station. Do not assume water depth, fishing success or boat-launch availability are constant; verify current park alerts and lake conditions, and use the official map to identify the correct shoreline and designated access points. The lake is only one part of the trip: ridges above it provide views of the Cross Timbers and surrounding countryside.",
      "Walkers, cyclists and equestrians share about 16 miles of designated multiuse trails, including 1.25 miles TPWD identifies as accessible. Trail surfaces and gradients differ substantially outside those accessible routes; an all-terrain wheelchair loan program serves some less accessible paths by arrangement. Bring water, check trail closures after rain, and choose routes from the official trails map rather than assuming a paved-loop experience across the entire park. Golden-cheeked warblers are among the protected birds found in the park's oak and Ashe juniper habitat.",
      "Camping choices are unusually varied for a newly developed Texas state park. TPWD lists 23 Warbler Ridge campsites with 20/30/50-amp electrical service, nearby restrooms and showers, 12 Painted Stick walk-in water campsites with vault toilets nearby, and 13 primitive hike-in sites approximately two miles from parking with composting toilets but no water. These site categories are not interchangeable: people with mobility needs, larger RVs or children should check the individual site descriptions before purchasing a campsite.",
      "Arrive at 100 Park Road 77 near Strawn, reached from FM 2372, rather than navigating only to the broad center of the park. TPWD lists day-use gates from 8 a.m. to 10 p.m., with shorter office hours and potential capacity sellouts on popular dates. Source-verified photography is scarce: the hero image here records an astronomy gathering in November 2013, before the modern park opened, and must not be used to infer the present-day campgrounds or trail facilities. Confirm current alerts, permitted activities, bookings and routes with TPWD before leaving."
    ],
    officialUrl: "https://tpwd.texas.gov/state-parks/palo-pinto-mountains",
    sourceCheckedAt: "2026-10-12",
    managingAuthority: "Texas Parks and Wildlife Department",
    accessibilityNotes: "TPWD identifies 1.25 miles of accessible trails, an accessible canoe/kayak launch and fishing pier, and all-terrain wheelchair loans for selected routes. Verify current accessibility and reservation arrangements before arrival.",
    directions: "From I-20, exit toward Strawn, cross the railroad tracks and take FM 2372 approximately four miles to the Park Road 77 entrance. Use the official park map rather than an approximate lake or ridgeline pin.",
  },
];
/** Keep source-backed new-park depth from being replaced by older short curation. */
export function applyNewlyOpenedStateParkAuthority(destination: Destination): Destination {
  const guide = newlyOpenedStateParks2026.find((park) => park.slug === destination.slug);
  if (!guide) return destination;
  return { ...destination, ...guide, id: destination.id, featured: destination.featured };
}
