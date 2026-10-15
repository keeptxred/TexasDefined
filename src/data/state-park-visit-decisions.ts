import type { Destination } from "./types";
import { VERIFIED_PARK_FACILITIES } from "./state-park-authority";

type ParkVisitDecision = {
  title: string;
  suitedTo: string;
  plan: string;
  watch: string;
};

/**
 * Human-curated choices tied to source-checked TPWD park facts, not invented
 * accessibility or instant inventory. These serve the actual trade-off a
 * visitor needs to resolve before booking a specific park unit or activity.
 */
const PARK_VISIT_CHOICES: Readonly<Record<string, readonly ParkVisitDecision[]>> = {
  "big-bend-ranch-state-park": [
    { title: "FM 170 day trip", suitedTo: "Scenic drives and borderland stops", plan: "Use Barton Warnock or Fort Leaton to orient around the river-road portions of this immense park.", watch: "Do not route through the permanently closed old north entrance. Carry fuel and drinking water." },
    { title: "Interior Sauceda stay", suitedTo: "Well-prepared remote travelers", plan: "Plan for the approximately 27-mile rugged dirt-road approach from FM 170 to Sauceda; check in first and get current road and permit details.", watch: "RVs and trailers are not recommended on the Sauceda approach. Do not assume an ordinary passenger car is appropriate after rain." },
  ],
  "lake-somerville-state-park": [
    { title: "Birch Creek campground", suitedTo: "RVs, established campsites and a lake weekend", plan: "Book the north-side Birch Creek entrance at Park Road 57; pick a Yaupon, Post Oak or Old Hickory loop site by hookup type.", watch: "Tall RVs should check the 13-foot-4-inch bridge near Deanville on FM 60." },
    { title: "Nails Creek and horse trails", suitedTo: "Equestrian campers and a quieter lake base", plan: "Use the separate Nails Creek entrance on FM 180; check Cedar Creek and Bent Tree sites for the actual reservation type.", watch: "Birch Creek and Nails Creek are separate units across the lake, not adjoining campground loops." },
    { title: "Trailway backpacking", suitedTo: "Longer hikes and experienced riders", plan: "Plan the 13.11-mile connecting Trailway and designated Flag Pond or Wolf Pond overnight stops using the official Trailway map.", watch: "Primitive sites do not provide drinking water; some cannot be booked in advance." },
  ],
  "ray-roberts-lake-state-park": [
    { title: "Isle du Bois", suitedTo: "Pilot Point lake and developed camping", plan: "Reserve the Isle du Bois unit near Pilot Point. Accessible numbered campsite choices and an all-terrain wheelchair loan can be discussed with TPWD.", watch: "Electric amperage varies by campsite and the accessible equipment must be arranged separately." },
    { title: "Johnson Branch", suitedTo: "Valley View shore access and woodland hikes", plan: "Navigate to the separate Johnson Branch entrance in Cooke County and use its campground/trails maps.", watch: "Walk-in primitive sites may require a quarter-mile gear carry. Check posted DORBA trail conditions." },
    { title: "Greenbelt trails", suitedTo: "Linear trail outings beyond the two campgrounds", plan: "Select an official Greenbelt trail segment rather than routing to either campground.", watch: "TPWD reported trails south of Overlook closed on October 9, 2026; verify the latest closure notice." },
  ],
  "palo-pinto-mountains-state-park": [
    { title: "Tucker Lake day outing", suitedTo: "Fishing, paddling and accessible lake access", plan: "Use the official map for the Tucker Lake shore, accessible launch and fishing pier.", watch: "Water and boat access depend on current park conditions; reserve busy day-use dates." },
    { title: "Warbler Ridge electric camping", suitedTo: "RVs needing power and nearby showers", plan: "Reserve a Warbler Ridge electric site, checking the exact electric connection, vehicle length and accessible approach.", watch: "Do not treat the new park's walk-in or hike-in sites as equivalent RV pads." },
    { title: "Painted Stick or primitive", suitedTo: "Tent campers who can carry their gear", plan: "Painted Stick has walk-in camps and nearby vault toilets; more remote primitive sites require an approximately two-mile hike.", watch: "Primitive sites have no drinking water. Carry enough for the entire backcountry stay." },
  ],
  "hueco-tanks-state-park-and-historic-site": [
    { title: "Self-guided North Mountain", suitedTo: "Visitors with confirmed North Mountain permits", plan: "Reserve a limited self-guided permit in advance and complete the park's required orientation.", watch: "Only 70 daily self-guided permits are offered; general entrance fees do not bypass the protection rules." },
    { title: "Guided cultural-site visit", suitedTo: "Rock art and protected-history interpretation", plan: "Book a guided tour for restricted areas with enough lead time to access the permitted locations.", watch: "Guided bookings are required at least a week ahead. Never touch pictographs or leave authorized routes." },
    { title: "Climbing or camping", suitedTo: "Experienced boulderers and planned overnight visitors", plan: "Check where climbing is permitted and whether one of the park's 20 campsites is available.", watch: "Area-specific restrictions, no wood/charcoal fires and no pets on mountain trails." },
  ],
  "enchanted-rock-state-natural-area": [
    { title: "Summit-focused day visit", suitedTo: "Hikers prioritizing the granite dome", plan: "Reserve a day pass and use the official summit and trail maps for your route and conditions.", watch: "Exposed rock gets hot; trail closures and capacity restrictions can change." },
    { title: "Walk-in frontcountry tent stay", suitedTo: "Campers wanting nearby shower facilities", plan: "Choose one of the 35 designated walk-in water sites and carry gear from the parking area.", watch: "These are tent camping areas, not RV hookup pads." },
    { title: "Moss Lake or Walnut Springs", suitedTo: "Experienced primitive campers", plan: "Reserve the correct remote campsite and hike 1–3 miles carrying all drinking water.", watch: "Remote sites do not supply drinking water and prohibit ground fires. Hammocks are not allowed." },
  ],
  "galveston-island-state-park": [
    { title: "Beachside camping", suitedTo: "Families who want Gulf beach proximity", plan: "Choose the developed beachside campground or designated primitive walk-in beach sites.", watch: "Some beach tent platforms prohibit parking beside the tent. Tropical weather and tides can close access." },
    { title: "Bayside stay", suitedTo: "Birding, paddling and less beach-oriented evenings", plan: "Book the bay-side loops about 1.5 miles from the beach, matching electric, water-only or dry-site requirements.", watch: "The ten water-only bayside sites limit vehicles to 18 feet. Bayside does not mean beachfront." },
  ],
  "dinosaur-valley-state-park": [
    { title: "Tracks and river day visit", suitedTo: "Families and fossil-track enthusiasts", plan: "Check Paluxy River levels and visit the designated dinosaur track viewing areas.", watch: "Tracks and crossings may be submerged after rain. Never promise visibility at a given time." },
    { title: "Developed campsite", suitedTo: "Campers needing electricity and shower access", plan: "Reserve from the developed 30-amp electric campsites and use the campground map.", watch: "Winding campground roads and trees limit RVs/trailers to around 35 feet." },
    { title: "Remote hike-in camp", suitedTo: "Experienced river-crossing backpackers", plan: "Confirm official river conditions before selecting a site beyond the Paluxy crossing and carry water and equipment.", watch: "Remote camps require wading the river and provide no drinking water or restrooms. Do not enter during high water." },
  ],
  "guadalupe-river-state-park": [
    { title: "Turkey Sink or Cedar Sage", suitedTo: "Developed RV and campsite facilities", plan: "Select the 50-amp Turkey Sink or 30-amp Cedar Sage electric campground based on your actual rig needs.", watch: "Campgrounds prohibit generators and require an assigned campsite reservation." },
    { title: "Wagon Ford riverside tent", suitedTo: "Tent campers happy to carry gear", plan: "Plan a 50–100-yard gear carry into the Wagon Ford river-terrace tent sites.", watch: "Wagon Ford provides no campsite electricity. Monitor Guadalupe River water conditions before swimming." },
  ],
  "hill-country-state-natural-area": [
    { title: "Hiking or equestrian day visit", suitedTo: "Rugged hill routes and trail riding", plan: "Choose from about 40 miles of marked multiuse trails and use the official map at the signed caliche-road entrance.", watch: "Trail closures can follow rain and the remote terrain requires water and early starts." },
    { title: "Creekside walk-in overnight", suitedTo: "Primitive campers wanting water nearby", plan: "Choose West Verde Creek or Comanche Bluff with their short, site-specific walk from parking and nearby toilets.", watch: "Water is nearby, not automatically at an individual tent; check which site type you booked." },
    { title: "Backcountry campsite", suitedTo: "Experienced backpackers seeking seclusion", plan: "Carry water and gear 2.3–3.25 miles to designated Butterfly Springs, Hermit's Shack or Wilderness camps.", watch: "These remote sites provide no water and prohibit ground fires." },
  ],
  "old-tunnel-state-park": [
    { title: "Daytime interpretive visit", suitedTo: "Short wildlife and historical outings", plan: "Visit signed nature areas during ordinary daylight access and use the TPWD interpretive materials.", watch: "The site provides no overnight camping or drinking water and does not allow pets." },
    { title: "Seasonal evening bat viewing", suitedTo: "Visitors with advance bat-viewing tickets", plan: "Book for the correct upper or lower viewing area during May 1–October 31 before arriving.", watch: "Everyone needs a ticket after 5 p.m., including infants; no ticket sales on site. The lower area excludes children under four." },
  ],
  "bentsen-rio-grande-valley-state-park": [
    { title: "Birding on foot or bicycle", suitedTo: "Wildlife observers using trails and blinds", plan: "Park at headquarters and enter interior trails on foot or bicycle; choose the accessible Rio Grande Trail when appropriate.", watch: "Private cars are not allowed inside; bicycles are prohibited on the Rio Grande Trail." },
    { title: "Park tram or reserved camp", suitedTo: "Visitors needing transportation planning", plan: "Check the tram-tour schedule or arrange a primitive campsite with the park's no-private-car rules in mind.", watch: "A campground reservation does not grant permission to drive a private vehicle into the park." },
  ],
  "estero-llano-grande-state-park": [
    { title: "Wetland birding", suitedTo: "Birders, photographers and quiet day visitors", plan: "Start at the Weslaco visitor center; follow the official map toward the Indigo Nature Blind and Alligator Lake observation areas.", watch: "Stay on designated paths and observe alligators from safe distances." },
    { title: "Mobility-focused nature visit", suitedTo: "Visitors requiring mapped accessible sections", plan: "Ask for available Grit Freedom Chair, trackchair or Braille maps; select the Tropical Area paved loop or marked accessible boardwalk segments.", watch: "Green Jay and Wader's paths can be muddy or flood; verify accessible equipment availability before arriving." },
  ],
};

export function stateParkVisitDecisions(destination: Destination): readonly ParkVisitDecision[] {
  if (!VERIFIED_PARK_FACILITIES[destination.slug]) return [];
  return PARK_VISIT_CHOICES[destination.slug] ?? [];
}
