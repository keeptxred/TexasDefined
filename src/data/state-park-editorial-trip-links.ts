import type { DestinationEditorialLink } from "./destination-editorial-links";

/**
 * Reciprocal, intent-specific park comparisons. These are editorial choices,
 * not "nearby" mileage claims or automatic affiliate widgets. Actual park
 * availability is independently governed by destination-availability.
 */
const STATE_PARK_PAIRS: Readonly<Record<string, readonly DestinationEditorialLink[]>> = {
  "garner-state-park": [
    {
      "href": "/destination/lost-maples-state-natural-area",
      "label": "Frio River days or autumn maple hiking?",
      "description": "Compare Garner's developed Frio camping and river outing with the more rugged Lost Maples trails and no-water remote camping."
    }
  ],
  "lost-maples-state-natural-area": [
    {
      "href": "/destination/garner-state-park",
      "label": "Maples hiking or the Frio River?",
      "description": "Check Lost Maples' hike-in water restrictions versus Garner's day-use and campground choices."
    }
  ],
  "palo-duro-canyon-state-park": [
    {
      "href": "/destination/caprock-canyons-state-park",
      "label": "Compare Panhandle canyon parks",
      "description": "Decide between Palo Duro's Park Road 5 canyon access and Caprock's bison habitat and distinct Trailway system."
    }
  ],
  "caprock-canyons-state-park": [
    {
      "href": "/destination/palo-duro-canyon-state-park",
      "label": "Palo Duro or the Caprock Trailway?",
      "description": "Compare canyon trails at Palo Duro with Caprock's separate park and longer Trailway routes."
    }
  ],
  "guadalupe-river-state-park": [
    {
      "href": "/destination/honey-creek-state-natural-area",
      "label": "Public river access versus protected creek tours",
      "description": "Guadalupe River's established river day-use and camping differ from Honey Creek's reservation-controlled trails and guided creek visits."
    },
    {
      "href": "/destination/hill-country-state-natural-area",
      "label": "Guadalupe's river camps or Hill Country hiking?",
      "description": "Contrast river access and campground showers with Hill Country SNA's hike-in water-carry requirements."
    }
  ],
  "honey-creek-state-natural-area": [
    {
      "href": "/destination/guadalupe-river-state-park",
      "label": "Guadalupe River for an ordinary river day",
      "description": "Honey Creek's guided-only creek access is not interchangeable with Guadalupe River's park and campsites."
    }
  ],
  "bentsen-rio-grande-valley-state-park": [
    {
      "href": "/destination/estero-llano-grande-state-park",
      "label": "Two Rio Grande Valley birding parks",
      "description": "Bentsen's no-private-car trails and tram choices differ from Estero's wetlands, adapted-equipment loans and Indigo Blind."
    }
  ],
  "estero-llano-grande-state-park": [
    {
      "href": "/destination/bentsen-rio-grande-valley-state-park",
      "label": "Bentsen birding or Estero wetland viewing?",
      "description": "Compare Estero's birding decks and wetland trails with Bentsen's access by foot, bike or scheduled tram."
    }
  ],
  "hueco-tanks-state-park-and-historic-site": [
    {
      "href": "/destination/franklin-mountains-state-park",
      "label": "El Paso climbing access versus mountain trails",
      "description": "Hueco Tanks has controlled climbing and pictograph permits; Franklin Mountains offers broad hiking and primitive Tom Mays camping."
    }
  ],
  "franklin-mountains-state-park": [
    {
      "href": "/destination/hueco-tanks-state-park-and-historic-site",
      "label": "Franklin Mountains or Hueco Tanks permits?",
      "description": "Contrast Franklin's Tom Mays campground and hiking with Hueco's protected North Mountain permit system."
    }
  ],
  "colorado-bend-state-park": [
    {
      "href": "/destination/inks-lake-state-park",
      "label": "Remote river camping or developed lakeside camping?",
      "description": "Colorado Bend's small self-contained RV sites and no-water backcountry contrast with Inks Lake's developed loops and remote hike-in restrictions."
    }
  ],
  "inks-lake-state-park": [
    {
      "href": "/destination/colorado-bend-state-park",
      "label": "Inks Lake facilities versus Colorado Bend wilderness",
      "description": "Compare campground services and remote no-water areas before choosing a Highland Lakes trip."
    }
  ],
  "palo-pinto-mountains-state-park": [
    {
      "href": "/destination/possum-kingdom-state-park",
      "label": "New mountain trail park or established lakeshore?",
      "description": "Compare Palo Pinto Mountains' Tucker Lake, electric Warbler Ridge and primitive hike-ins against Possum Kingdom's shoreline loops."
    }
  ],
  "possum-kingdom-state-park": [
    {
      "href": "/destination/palo-pinto-mountains-state-park",
      "label": "Possum Kingdom or Palo Pinto Mountains?",
      "description": "Choose between established Possum Kingdom lake camps and Palo Pinto Mountains' new accessible trails and hike-in sites."
    }
  ],
  "dinosaur-valley-state-park": [
    {
      "href": "/destination/cleburne-state-park",
      "label": "Dinosaur tracks or a Cleburne lake camp?",
      "description": "Plan a Paluxy River track outing when water is favorable, or compare Cleburne's named electric and full-hookup campsite loops."
    }
  ],
  "cleburne-state-park": [
    {
      "href": "/destination/dinosaur-valley-state-park",
      "label": "Cleburne Lake or Paluxy dinosaur tracks?",
      "description": "Compare Cleburne's campground loop choices with Dinosaur Valley's river-level-dependent track access."
    }
  ],
  "ray-roberts-lake-state-park": [
    {
      "href": "/destination/eisenhower-state-park",
      "label": "Compare North Texas reservoir parks",
      "description": "Ray Roberts spreads camping and trails across Isle du Bois, Johnson Branch and Greenbelt; Eisenhower has multiple campground classes at Lake Texoma."
    }
  ],
  "eisenhower-state-park": [
    {
      "href": "/destination/ray-roberts-lake-state-park",
      "label": "Lake Texoma camping or Ray Roberts' two units?",
      "description": "Eisenhower camping options differ from Ray Roberts' separate Isle du Bois and Johnson Branch gateways."
    }
  ],
  "lake-somerville-state-park": [
    {
      "href": "/destination/stephen-f-austin-state-park",
      "label": "Lake Somerville or Brazos River history?",
      "description": "Somerville's Birch Creek, Nails Creek and long Trailway offer a different outing from Stephen F. Austin's established campground and river-history setting."
    }
  ],
  "stephen-f-austin-state-park": [
    {
      "href": "/destination/lake-somerville-state-park",
      "label": "Stephen F. Austin or Somerville Trailway?",
      "description": "Compare developed Stephen F. Austin campground rules against Somerville's distinct two units and waterless Trailway camps."
    }
  ],
  "fort-richardson-state-park-state-historic-site": [
    {
      "href": "/destination/lake-arrowhead-state-park",
      "label": "North Texas frontier history or a lake day?",
      "description": "Fort Richardson's restored Army post and history are a different visit from Lake Arrowhead's shoreline, fishing and camping."
    }
  ],
  "lake-arrowhead-state-park": [
    {
      "href": "/destination/fort-richardson-state-park-state-historic-site",
      "label": "Lake Arrowhead or Fort Richardson history?",
      "description": "Build a deliberate history-and-nature comparison rather than assuming these state parks provide the same activities."
    }
  ],
  "goose-island-state-park": [
    {
      "href": "/destination/mustang-island-state-park",
      "label": "Bayfront camping or Gulf surf beach?",
      "description": "Goose Island's wooded and bayfront camping differ from Mustang Island's developed sites behind dunes and first-come primitive beach zone."
    }
  ],
  "mustang-island-state-park": [
    {
      "href": "/destination/goose-island-state-park",
      "label": "Mustang Gulf beach or Goose Island bayside?",
      "description": "Compare swimming and beachside camping with Goose Island's bayfront and wooded campground layouts."
    }
  ],
  "enchanted-rock-state-natural-area": [
    {
      "href": "/destination/lyndon-b-johnson-state-park-and-historic-site",
      "label": "Granite summit or Hill Country living history?",
      "description": "Enchanted Rock's strenuous granite summit and remote camps differ from LBJ State Park's free farm interpretation and easier trails."
    }
  ],
  "lyndon-b-johnson-state-park-and-historic-site": [
    {
      "href": "/destination/enchanted-rock-state-natural-area",
      "label": "LBJ historic farm or Enchanted Rock hikes?",
      "description": "Combine history and outdoors only with realistic opening-hour and hiking-effort planning."
    },
    {
      "href": "/destination/old-tunnel-state-park",
      "label": "LBJ daytime visit and Old Tunnel bats",
      "description": "If combining these stops, check Sauer-Beckmann's staffed hours and Old Tunnel's separate bat-ticket times."
    }
  ],
  "old-tunnel-state-park": [
    {
      "href": "/destination/lyndon-b-johnson-state-park-and-historic-site",
      "label": "Seasonal bat viewing and daytime Hill Country stops",
      "description": "Old Tunnel offers ticketed seasonal evening bats, not overnight camping; LBJ State Park has daytime living-history exhibits and trails."
    }
  ],
  "hill-country-state-natural-area": [
    {
      "href": "/destination/guadalupe-river-state-park",
      "label": "Remote backcountry or established river camping?",
      "description": "Hill Country SNA's long rugged routes and no-water remote sites differ from Guadalupe River's electric campgrounds and river access."
    }
  ]
};

export function stateParkEditorialTripLinks(slug: string): DestinationEditorialLink[] {
  return [...(STATE_PARK_PAIRS[slug] ?? [])];
}
