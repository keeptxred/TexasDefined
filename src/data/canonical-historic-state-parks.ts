import { legacyExploreDestinations } from "./fixtures/legacy-explore";
import type { Destination } from "./types";

/**
 * Canonical park entities were omitted because the old records used historical
 * short slugs. Reuse those records' identity/county before applying independently
 * researched visitor content. The old short paths remain non-primary aliases.
 */
type CanonicalRecovery = { from: string; to: string; override: Partial<Destination> };
const recovered: CanonicalRecovery[] = [
  {
    from: "goliad-state-park",
    to: "goliad-state-park",
    override: {
      name: "Goliad State Park & Historic Site",
      category: "state-parks",
      county: "Goliad",
      coordinates: { lat: 28.656544, lng: -97.387265 },
      address: "108 Park Road 6, Goliad, TX 77963",
      hero: { src: "/images/explore/historic-sites/goliad-state-park.jpg", alt: "Historic mission buildings at Goliad State Park and Historic Site, Texas", width: 1600, height: 1067, credit: "William L. Farr · CC BY 4.0 · Wikimedia Commons" },
      summary: "Visit restored Mission Espíritu Santo and the San Antonio River at Goliad State Park, then connect Spanish colonial and Indigenous history with Goliad's other historic sites and river recreation.",
      bestSeason: "December through March for milder historic-site exploring, with river recreation dependent on conditions.",
      entryNote: "Park access is daily 8 a.m.–10 p.m.; headquarters and historic buildings generally operate 8:30 a.m.–4:30 p.m. TPWD recommends reserving camping and day-use passes; verify current historic exhibits and ranger programs.",
      highlights: ["Restored Mission Espíritu Santo de Zúñiga", "Separate historic mission site and grounds maps", "Camping and San Antonio River recreation", "Contextual visits to Presidio La Bahía and other Goliad sites"],
      body: [
        "Goliad State Park is more than a scenic place beside the San Antonio River. Its central historic landmark, Mission Espíritu Santo de Zúñiga, connects the Spanish colonial period, Catholic missions and Indigenous communities whose lives were changed by colonial settlement. Understand the mission's physical structures, interpreted exhibits and broader history before treating the site as a picturesque backdrop. The restored building is one component of a larger regional story, not a surviving untouched eighteenth-century settlement.",
        "TPWD provides a park map and a separate Mission Espíritu Santo map, reflecting different visitor needs. Day-use areas and river recreation are not identical to the historic buildings: the park generally opens 8 a.m.–10 p.m., but historic buildings and headquarters have shorter visitor hours. The park is just south of Goliad along U.S. Highways 183 and 77A, with headquarters at 108 Park Road 6. Plan the mission visit during staffed hours and reserve a campsite or day pass ahead during busy periods.",
        "A strong Goliad trip places the mission in context with Presidio La Bahía, Goliad's historic town center, and the stories of the Texas Revolution. These are different sites with distinct management, admission rules, and opening times; do not imply a state-park admission pass covers every nearby attraction. Walking, picnicking, river access and camping may be options, but water level and current park alerts matter. Use the official maps for facilities, parking and appropriate entrances rather than relying on a general regional marker.",
        "The most respectful experience includes the people too often omitted from simplified mission histories: the Indigenous residents, missionaries, Spanish colonial administrators and later communities connected to the site. Check the state park's interpretive guide and current tours or events, then use the other sites' own official sources for the 1836 battle and massacre narratives. A visit that distinguishes these periods is more useful than treating all historic Goliad destinations as interchangeable."
      ],
      managingAuthority: "Texas Parks and Wildlife Department",
      officialUrl: "https://tpwd.texas.gov/state-parks/goliad",
      sourceCheckedAt: "2026-10-12",
    },
  },
  {
    from: "hueco-tanks-state-park",
    to: "hueco-tanks-state-park-and-historic-site",
    override: {
      name: "Hueco Tanks State Park & Historic Site",
      category: "state-parks",
      county: "El Paso",
      coordinates: { lat: 31.926453, lng: -106.042437 },
      address: "6900 Hueco Tanks Road No. 1, El Paso, TX 79938",
      hero: { src: "/images/explore/historic-sites/hueco-tanks-state-park.jpg", alt: "Hueco Tanks State Park rock formations in the El Paso desert", width: 1600, height: 1118, credit: "Brian Stansberry · CC BY 3.0 · Wikimedia Commons" },
      summary: "Protect and explore Hueco Tanks' ancient pictographs and desert rock basins east of El Paso, with strict North Mountain permits, advance-booked guided access, climbing rules and limited camping.",
      bestSeason: "Fall through spring for climbing and culturally focused walks; desert heat and limited permits require careful planning.",
      entryNote: "North Mountain self-guided permits are limited to 70 visitors daily and can be booked up to three months ahead. Guided tours require booking at least a week ahead. Annual orientation is required; verify activity, pet and fire restrictions directly with TPWD.",
      highlights: ["Ancient Indigenous pictographs and cultural protection", "70-person daily North Mountain self-guided limit", "Guided access to restricted rock imagery", "World-class bouldering with area-specific rules", "Only 20 campsites; advance preparation needed"],
      body: [
        "Hueco Tanks' water-holding rock hollows help explain why humans have returned to this desert landscape for thousands of years. The pictographs and other cultural traces deserve primary attention, not a passing mention between climbing areas. Indigenous communities continue to value this place. Never touch or mark the rock imagery; stay inside authorized areas and follow guides' instructions because access rules protect irreplaceable cultural resources.",
        "The operational distinction that matters most is guided versus self-guided access. TPWD limits self-guided use of North Mountain to permits for 70 people each day, with reservations offered up to three months ahead. Guided tours to other sensitive parts of the park require booking at least one week in advance. Visitors must complete an orientation video before entering the self-guided area or camping and repeat it annually when returning. The general entrance fee does not substitute for these special access rules.",
        "The park is roughly 32 miles northeast of El Paso on U.S. 62/180, then north on Ranch Road 2775 and onward to Hueco Tanks Road. TPWD specifically cautions that GPS directions can misdirect drivers. The park has 20 campsites, but most visits are day-use; arrive during office hours to check in. Firewood and charcoal fires are prohibited. Pets are barred from the mountains and most trails; specific short road and picnic routes and campground areas are exceptions under leash rules.",
        "World-renowned climbing is part of the park's modern reputation, but climbing restrictions, permitted areas and reservations must be understood in advance. Bring adequate desert water and weather protection, and consult the official park and trails maps for trailheads and the limits of your permit. Do not plan an improvised self-guided pictograph trip without a reservation; the park's preservation rules deliberately limit spontaneous access."
      ],
      managingAuthority: "Texas Parks and Wildlife Department",
      officialUrl: "https://tpwd.texas.gov/state-parks/hueco-tanks",
      sourceCheckedAt: "2026-10-12",
      directions: "From El Paso travel U.S. 62/180 northeast, take Ranch Road 2775, then Hueco Tanks Road to the park. TPWD warns that generic GPS directions may misroute travelers.",
    },
  },
  {
    from: "lyndon-b-johnson-state-park-historic-site",
    to: "lyndon-b-johnson-state-park-historic-site",
    override: {
      name: "Lyndon B. Johnson State Park & Historic Site",
      category: "state-parks",
      county: "Gillespie",
      coordinates: { lat: 30.237656, lng: -98.626279 },
      address: "199 Park Road 52, Stonewall, TX 78671",
      hero: { src: "/images/explore/historic-sites/lyndon-b-johnson-state-park-historic-site.jpg", alt: "Historic structures at Lyndon B. Johnson State Park and Historic Site near Stonewall", width: 1600, height: 1119, credit: "Larry D. Moore · CC BY 4.0 · Wikimedia Commons" },
      summary: "A free Texas state park at Stonewall featuring Sauer-Beckmann's working-farm interpretation, Hill Country German-Texan history, nature trails, longhorns and an orientation point for the separately managed LBJ Ranch.",
      bestSeason: "Fall through spring for walking; the farm and summer pool each have seasonal hours and closures.",
      entryNote: "There is no state-park entrance fee. The Sauer-Beckmann Farm typically has separate seasonal daytime hours and closes the final Tuesday of each month. The adjacent LBJ Ranch is an NPS destination with its own current tour rules.",
      highlights: ["Sauer-Beckmann Living History Farm", "About 1.2 miles of nature trails", "American bison and Texas longhorn herds", "Free state-park admission", "Orientation for separate LBJ National Historical Park ranch tour"],
      body: [
        "Lyndon B. Johnson State Park & Historic Site is a Texas-operated park, not the same property as the adjacent federally administered Lyndon B. Johnson National Historical Park. It is free to enter, with a visitor center and the Sauer-Beckmann Living History Farm illustrating the German-Texan rural world that shaped the Hill Country around Stonewall. The farm's historical interpretation and preserved setting warrant a meaningful stop even if travelers are not primarily visiting sites connected to the president.",
        "Visitors can explore roughly 1.2 miles of trails and see longhorns, bison, historic buildings and the surrounding Pedernales River landscape. TPWD lists Sauer-Beckmann Farm daytime hours that change between October–May and June–September and a regular last-Tuesday monthly closure. The grounds may remain accessible when staffed buildings are not. Verify the farm program schedule rather than treating the entire park as one uniform attraction with the same hours.",
        "The state park visitor center is also a logical first stop when planning the neighboring LBJ Ranch experience; the federal ranch and Texas White House have independent National Park Service operating status and access policies. Do not imply that every ranch building is open or that state-park admission includes a federal tour. For a history-focused route, pair the park with Johnson City and the NPS sites while checking those destinations separately.",
        "Reach the park on Park Road 52 from U.S. Highway 290 near Stonewall. The official state-park map distinguishes farm, visitor, picnic and river areas. There is no general state park entrance charge, but pool operations, group facility use and separate NPS services may involve different arrangements. Presenting this site as an affordable living-history excursion instead of a generic camping park gives visitors an accurate way to plan."
      ],
      managingAuthority: "Texas Parks and Wildlife Department",
      officialUrl: "https://tpwd.texas.gov/state-parks/lyndon-b-johnson",
      sourceCheckedAt: "2026-10-12",
    },
  },
];

export const canonicalHistoricStateParkDestinations: Destination[] = recovered.flatMap(({ from, to, override }) => {
  const original = legacyExploreDestinations.find((item) => item.slug === from);
  if (!original) return [];
  return [{ ...original, ...override, slug: to, id: `canonical-park-${to}` }];
});

/** Source-backed canonical records take precedence over old historical aliases and thin curation. */
export function applyCanonicalHistoricStatePark(destination: Destination): Destination {
  const canonical = canonicalHistoricStateParkDestinations.find((row) => row.slug === destination.slug);
  return canonical ? { ...destination, ...canonical, id: destination.id, featured: destination.featured } : destination;
}
