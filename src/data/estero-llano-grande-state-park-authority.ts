import type { Destination } from "./types";

/** Official park entity, separate from old World Birding Center listing aliases. */
export const esteroLlanoGrandeStateParkAuthority: Destination = {
  id: "td-estero-llano-grande-state-park",
  brandId: "texasdefined",
  slug: "estero-llano-grande-state-park",
  name: "Estero Llano Grande State Park",
  category: "state-parks",
  region: "south-texas",
  nearestTown: "Weslaco",
  county: "Hidalgo",
  coordinates: { lat: 26.126411, lng: -97.956518 },
  address: "3301 S. International Boulevard (FM 1015), Weslaco, TX 78596",
  hero: {
    src: "/images/state-parks/world-birding-center-estero-llano-grande-state-park.jpg",
    alt: "Birding habitat at World Birding Center's Estero Llano Grande State Park near Weslaco",
    width: 1600, height: 1067,
    credit: "Alan D. Wilson · CC BY-SA 3.0 · Wikimedia Commons",
  },
  summary: "A Rio Grande Valley birding and wildlife sanctuary near Weslaco with accessible wetland viewing decks, trail loops, Indigo Nature Blind, all-terrain wheelchairs and alligator habitat.",
  bestSeason: "Winter migration and cooler months reward birders; spring can bring migrating birds and butterflies, while summer afternoons are hot and humid.",
  entryNote: "TPWD lists daily operations from 8 a.m. to 5 p.m., $5 adult entry, free for children 12 and under. Access from FM 1015 south of U.S. 83. Most visits are day trips; group halls and park programs have their own booking rules.",
  highlights: [
    "World Birding Center wetland, woodland and tropical-zone habitats",
    "More than five miles of trails and accessible viewing decks",
    "Green Jay and Spoonbill accessible trail options with weather caveats",
    "Indigo Nature Blind, resident birds, butterflies and Alligator Lake",
    "Wheelchair-accessible visitor center, restrooms and adapted equipment loans",
    "English and Spanish trail maps for park orientation",
  ],
  body: [
    "Estero Llano Grande State Park is primarily a place to watch wildlife, not a conventional overnight campground or swimming destination. Shallow wetlands, ponds, woodland and thornscrub bring many resident and migratory birds into a compact Lower Rio Grande Valley landscape. The Indigo Nature Blind and Alligator Lake viewing area are especially useful when planning a focused visit; wildlife sightings remain seasonal, and alligators must be observed from safe distances.",
    "The developed visitor center sits at 3301 South International Boulevard, FM 1015, in Weslaco. From Expressway 83, take FM 1015 south approximately two miles and look for the brick park entrance on the left. TPWD lists park hours 8 a.m. to 5 p.m., which makes early entry useful for birding. The center, its restrooms, the nearby wildlife viewing platform and Ibis Meeting Room are identified as wheelchair accessible. Park staff have braille maps, Grit Freedom Chairs and motorized trackchairs available by arrangement; reserve equipment by telephone instead of assuming it will be free on arrival.",
    "The park offers more than five miles of walking trails, including several accessibility-oriented options with conditions that vary by weather. TPWD describes the 0.9-mile Camino de Aves on hard-packed caliche, 0.2-mile Green Jay Trail on compacted soil that may become muddy, 0.5-mile Spoonbill boardwalk preceded by a short non-boardwalk approach, and 0.8-mile Wader's Trail that can flood. A roughly 1.6-mile Tropical Area uses former RV-park asphalt roads and is accessible throughout. These details matter far more than an unqualified claim that all trails are wheelchair accessible.",
    "Visitors can learn about tropical and local birds at the Indigo Blind, where a feeding station is maintained during the winter season, and watch for the Green Jay, White-tipped Dove and Altamira Oriole among other species. The visitor center offers maps, interpretive information, educational programs and a store. TPWD prohibits bicycling on the Green Jay and Alligator Lake trails and on boardwalks and decks; consult the current map for which routes permit bikes. The Alligator Lake Observation Deck is accessed by an accessible route but can be bumpy in places.",
    "There are group-event facilities, including meeting spaces with restrooms nearby, but these are not the same as ordinary individual overnight campsites. TPWD's park information should be checked before promising lodging or RV hookup availability. Park-specific accessible features can be affected by water and maintenance, so call before an accessibility-critical trip. For a broader Valley itinerary, pair Estero with Weslaco and other World Birding Center locations rather than implying a single park day pass covers every separate site.",
    "Source material includes park visitor maps in English and Spanish, TPWD's trail guide and accessible-facilities documentation. Download the trails map before heading out, plan shade and water for warmer weather, carry binoculars, stay on designated boardwalks near sensitive wetland habitats and check active alerts for flood closures. The quality of this place lies in quiet observation, bird diversity and practical accessible wildlife viewing, not generic adventure activities that would misrepresent a protected wetland."
  ],
  managingAuthority: "Texas Parks and Wildlife Department",
  officialUrl: "https://tpwd.texas.gov/state-parks/estero-llano-grande",
  sourceCheckedAt: "2026-10-12",
  accessibilityNotes: "Visitor center and restrooms are wheelchair accessible. TPWD identifies four accessible trail choices and paved Tropical Area roads; rain can affect some segments. Braille maps, Grit Freedom Chairs and motorized trackchairs are available to reserve with park staff.",
  directions: "From Expressway 83, exit at FM 1015 / International Boulevard and travel south about two miles; the park's brick entrance sign will be on your left.",
};
export function applyEsteroLlanoGrandeStateParkAuthority(destination: Destination): Destination {
  return destination.slug === esteroLlanoGrandeStateParkAuthority.slug
    ? { ...destination, ...esteroLlanoGrandeStateParkAuthority, id: destination.id, featured: destination.featured }
    : destination;
}
