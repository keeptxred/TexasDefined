import type { Destination } from "./types";

const TPWD = "Texas Parks and Wildlife Department";
const CHECKED = "2026-08-07";
const curated: Record<string, Partial<Destination>> = {
  "choke-canyon-state-park": {
    summary: "A South Texas reservoir state park with two separate public units: full-service Calliham for camping and broader park facilities, and day-use South Shore for boating, fishing and birding.",
    category: "state-parks",
    nearestTown: "Three Rivers",
    county: "McMullen",
    coordinates: { lat: 28.465773, lng: -98.354195 },
    address: "358 Recreation Rd. 8, Calliham, TX 78007",
    bestSeason: "Fall through spring for birding, camping and comfortable shore time; fishing remains popular year-round",
    entryNote: "Both units are generally open daily 6 a.m.–10 p.m.; adult day use is $5 and children 12 and under enter free. Reservations are recommended. Choose the correct unit and check current TPWD alerts plus lake and ramp conditions before departure.",
    directions: "Use the Calliham Unit for park headquarters, camping, cabins and the full-service visit; it is about 12 miles west of Three Rivers on State Highway 72 toward Tilden. South Shore is a separate day-use entrance about 3.5 miles west of Three Rivers on State Highway 72.",
    accessibilityNotes: "At Calliham, TPWD lists an accessible fishing jetty, dock, pavilions, parts of the gym and sports complex, designated cabins and campsites, and accessible restrooms. South Shore includes an accessible courtesy dock and designated picnic sites.",
    highlights: ["Calliham Unit camping, cabins and recreation", "South Shore day-use fishing, boating and birding", "Choke Canyon Reservoir fishing", "Alligators and South Texas brush-country wildlife"],
    hero: {
      src: "/images/state-parks/choke-canyon-calliham-unit-state-park.jpg",
      alt: "Choke Canyon State Park's Calliham Unit in South Texas",
      width: 1600,
      height: 900,
      credit: "Larry D. Moore · CC BY 4.0 · Wikimedia Commons",
    },
    body: [
      "Choke Canyon State Park is one park with two separate public-use areas, and choosing the unit is the first planning decision. The Calliham Unit in McMullen County contains park headquarters, camping, cabins and the broader set of developed facilities. South Shore in Live Oak County is a separate day-use unit focused on boating, fishing and birding.",
      "The reservoir is one of South Texas' major fishing destinations, while surrounding thornscrub, wetlands and open water support an unusually rich bird list and wildlife that includes alligators. Swimming, hiking, wildlife watching and geocaching add options beyond the boat ramps and shoreline.",
      "Reservoir levels can change access quickly, so check TPWD's current park alerts and ramp information before towing a boat. Give alligators substantial space, plan for intense warm-season heat and use the unit-specific directions rather than a generic Choke Canyon map pin."
    ],
    managingAuthority: TPWD,
    officialUrl: "https://tpwd.texas.gov/state-parks/choke-canyon",
    sourceCheckedAt: "2026-09-17",
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
    sourceCheckedAt: CHECKED,
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
    sourceCheckedAt: CHECKED,
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
    sourceCheckedAt: CHECKED,
  },
};

export function applyCuratedDestinationBatch28(destination: Destination): Destination {
  const override = curated[destination.slug];
  return override ? { ...destination, ...override, hero: override.hero ? { ...destination.hero, ...override.hero } : destination.hero } : destination;
}

export function applyCuratedDestinationsBatch28(destinations: Destination[]): Destination[] {
  return destinations.map(applyCuratedDestinationBatch28);
}
