import type { Destination } from "./types";

const TPWD = "Texas Parks and Wildlife Department";
const curated: Record<string, Partial<Destination>> = {
  "choke-canyon-state-park": {
    summary: "A South Texas reservoir park between San Antonio and Corpus Christi with excellent fishing, birding and brush-country wildlife across the full-service Calliham Unit and day-use South Shore Unit.",
    nearestTown: "Three Rivers",
    bestSeason: "Fall through spring for birding, camping and comfortable shore time; fishing remains popular year-round",
    entryNote: "Choose the unit before navigating: Calliham is the full-service camping unit, while South Shore is day use only. Low reservoir levels can close boat ramps, so check TPWD alerts before bringing a boat.",
    highlights: ["Calliham Unit camping and recreation", "South Shore day-use fishing and birding", "Choke Canyon Reservoir fishing", "Alligators and South Texas brush-country wildlife"],
    body: [
      "Choke Canyon State Park occupies two different public-use areas on the reservoir, and that distinction matters when planning the day. Calliham is the full-service unit with camping and broader amenities; South Shore is a day-use unit focused on boating, fishing and birding.",
      "The reservoir is one of South Texas' major fishing destinations, while surrounding thornscrub, wetlands and open water support an unusually rich bird list and wildlife that includes alligators. The landscape feels distinctly different from Hill Country lake parks farther north.",
      "Check reservoir level and ramp notices before towing a boat because low water can affect multiple access points at once. Give alligators substantial space, plan for intense warm-season heat and confirm the correct unit before following GPS."
    ],
    managingAuthority: TPWD,
    officialUrl: "https://tpwd.texas.gov/state-parks/choke-canyon",
  },
  "cooper-lake-state-park": {
    summary: "A Northeast Texas lake park 90 minutes from Dallas with two active units—Doctors Creek on the north shore and South Sulphur on the south—offering fishing, swimming, trails, camping and cabins around Jim Chapman Lake.",
    nearestTown: "Cooper",
    bestSeason: "Spring through fall for lake recreation; cooler months for hiking, riding and camping",
    entryNote: "Doctors Creek and South Sulphur are separate entrances on opposite sides of the lake. Both can reach capacity, so reserve ahead and verify the unit before navigating.",
    highlights: ["Doctors Creek Unit", "South Sulphur Unit", "Jim Chapman Lake fishing and swimming", "Camping, cabins and multiuse trails"],
    body: [
      "Cooper State Park is a two-unit destination wrapped around Jim Chapman Lake. Doctors Creek sits on the north side and South Sulphur on the south, so a reservation or meeting point should always include the unit name rather than simply 'Cooper Lake.'",
      "Both units support fishing, lake recreation and overnight stays, while trail and equestrian options expand the park beyond the shoreline. South Sulphur has a particularly broad mix of developed facilities, but Doctors Creek is a full destination in its own right.",
      "Reserve popular weekends and confirm current lake and trail conditions before departure. Older catalog references to additional Cooper Lake 'units' should not override TPWD's current two-unit structure."
    ],
    managingAuthority: TPWD,
    officialUrl: "https://tpwd.texas.gov/state-parks/cooper-lake",
  },
  "devils-river-state-natural-area": {
    summary: "A remote, exceptionally clear spring-fed river natural area in Southwest Texas with two reservation-only units—Del Norte and Dan A. Hughes—protecting rugged limestone canyon country and primitive backcountry access.",
    nearestTown: "Del Rio",
    bestSeason: "Spring and fall for cooler backcountry travel; summer heat is severe",
    entryNote: "Reservations are required for either unit and no check-in is allowed after the posted gate deadline. Del Norte and Dan A. Hughes are separate locations; river trips may also require a Devils River Access Permit.",
    highlights: ["Del Norte Unit", "Dan A. Hughes Unit", "Clear spring-fed Devils River", "Permit-managed paddling and primitive camping"],
    body: [
      "Devils River State Natural Area protects one of Texas' clearest and least-developed river corridors, but it is not a single trailhead or campground. TPWD currently operates the Del Norte Unit and Dan A. Hughes Unit as separate reservation-only destinations.",
      "The river attracts paddlers and anglers, while both units offer primitive backcountry experiences in exposed limestone and desert terrain. Extended river trips have additional access-permit requirements designed to control use and protect the river corridor.",
      "Study the exact unit, road, check-in time and permit requirements before leaving Del Rio. Cell service is unreliable, summer heat is dangerous and an older 'Big Satan Unit' name in legacy data refers to property now identified by TPWD as the Dan A. Hughes Unit."
    ],
    managingAuthority: TPWD,
    officialUrl: "https://tpwd.texas.gov/state-parks/devils-river/",
  },
  "chinati-mountains-state-natural-area": {
    summary: "A nearly 39,000-acre Trans-Pecos natural area protecting volcanic peaks, steep canyons and desert-to-oak-woodland habitat west of Presidio; the property remains closed while TPWD develops public access.",
    nearestTown: "Presidio",
    coordinates: { lat: 29.881586, lng: -104.581089 },
    bestSeason: "Not yet open to public visitation",
    entryNote: "Chinati Mountains State Natural Area is closed for development and TPWD has not set an opening date. Do not route a recreational trip to the property; use this guide only for future-planning context.",
    highlights: ["Nearly 39,000 acres of Trans-Pecos habitat", "More than 4,000 feet of elevation change", "Volcanic mountain and canyon geology", "Future state natural area under development"],
    body: [
      "Chinati Mountains State Natural Area protects one of the largest undeveloped additions to the Texas state-park system. Its terrain rises from low Chihuahuan Desert into higher gray-oak woodland, reflecting a dramatic elevation range across rugged volcanic country.",
      "The property supports diverse desert and mountain wildlife and preserves a landscape shaped by major volcanic events more than 35 million years ago. That conservation value is already real even though ordinary visitor infrastructure is not.",
      "TPWD states that the natural area is not yet open and no opening date has been set. Keep it out of a current road-trip itinerary and check the agency's official page for future public-use and opening announcements."
    ],
    managingAuthority: TPWD,
    officialUrl: "https://tpwd.texas.gov/state-parks/chinati-mountains/",
  },
};

export function applyCuratedDestinationBatch28(destination: Destination): Destination {
  const override = curated[destination.slug];
  return override ? { ...destination, ...override, hero: override.hero ? { ...destination.hero, ...override.hero } : destination.hero } : destination;
}

export function applyCuratedDestinationsBatch28(destinations: Destination[]): Destination[] {
  return destinations.map(applyCuratedDestinationBatch28);
}
