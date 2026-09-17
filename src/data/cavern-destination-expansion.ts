import type { Destination } from "./types";

const sourceCheckedAt = "2026-09-09";

/**
 * Checked-in public cave/cavern destinations that are not guaranteed to be
 * present in the remote Explore catalog. These records intentionally distinguish
 * between caves the public can enter and protected caves that are only viewable
 * from an authorized public route.
 */
export const cavernExpansionDestinations: Destination[] = [
  {
    id: "cavern-wonder-world-cave",
    brandId: "texasdefined",
    slug: "wonder-world-cave",
    name: "Wonder World Cave",
    summary:
      "A historic San Marcos show cave along the Balcones Fault Zone, offering guided public tours through a dry-formed limestone fissure beneath Wonder World Cave & Adventure Park.",
    category: "caverns",
    region: "hill-country",
    nearestTown: "San Marcos",
    coordinates: { lat: 29.87752, lng: -97.95673 },
    hero: {
      src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Wonder%20Cave%20Sign.jpg?width=1600",
      alt: "Historic Wonder Cave marker at Wonder World Cave in San Marcos, Texas",
      width: 1600,
      height: 1200,
      credit: "CMBJ · CC BY-SA 3.0 / CC BY-SA 2.5 · Wikimedia Commons",
    },
    bestSeason:
      "Year-round; tour schedules vary seasonally, so verify current operating hours before making the drive",
    entryNote:
      "Cave-only and combination tickets are sold for guided tours. Advance booking secures a tour time, while walk-ins may be accepted when space is available.",
    highlights: [
      "Guided tour through the Balcones Fault Line cave",
      "Historic Texas show cave in operation since the early 1900s",
      "Visible fault-zone geology beneath San Marcos",
      "Easy pairing with other San Marcos attractions",
    ],
    body: [
      "Wonder World Cave is one of Texas' oldest developed cave attractions and a distinctly different underground experience from the state's dripstone show caverns. The cave follows a fault-zone fissure in the limestone, giving visitors a close look at the geologic forces associated with the Balcones Fault system beneath San Marcos.",
      "Public access is through a guided cave tour operated by Wonder World Cave & Adventure Park. The cave can be purchased as a stand-alone experience or as part of a broader attraction package, making it practical for families who want to combine geology with the park's other activities.",
      "Tour schedules change with the season. Book ahead when a specific time matters, wear shoes suitable for cave stairs and uneven surfaces, and check the current operating calendar before leaving home rather than relying on older posted hours.",
    ],
    managingAuthority: "Wonder World Cave & Adventure Park",
    officialUrl: "https://www.wonderworldpark.com/",
    reservationUrl: "https://www.wonderworldpark.com/",
    sourceCheckedAt,
    county: "Hays",
    address: "1000 Prospect St, San Marcos, TX 78666",
    accessibilityNotes:
      "The cave route includes stairs and natural underground surfaces. Visitors with mobility concerns should confirm current tour requirements directly with the operator before purchasing tickets.",
  },
  {
    id: "cavern-gorman-cave",
    brandId: "texasdefined",
    slug: "gorman-cave",
    name: "Gorman Cave",
    summary:
      "A protected limestone cave beside the Colorado River in Colorado Bend State Park, where visitors can view part of the entrance area from the River Trail while a bat-friendly gate protects the cave interior and its roosting myotis bats.",
    category: "caverns",
    region: "hill-country",
    nearestTown: "Bend",
    coordinates: { lat: 31.0497, lng: -98.4696 },
    hero: {
      src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Gorman%20Falls%20Base%20Colorado%20Bend%20SP%202024.jpg?width=1600",
      alt: "Gorman Falls landscape in Colorado Bend State Park near the protected Gorman Cave area",
      width: 1600,
      height: 1067,
      credit: "Wikimedia Commons · free-license photograph",
    },
    bestSeason:
      "Fall through spring for comfortable hiking; check Colorado Bend State Park alerts before visiting",
    entryNote:
      "Gorman Cave is not an open walk-in cave. Texas Parks and Wildlife says part of the cave can be viewed from the River Trail, while interior access is limited by a bat-friendly gate. Separate guided wild-cave tours elsewhere in Colorado Bend require reservations.",
    highlights: [
      "Public view of part of Gorman Cave from the River Trail",
      "Important cave-myotis bat roost protected by a bat-friendly gate",
      "Colorado River and karst landscape inside Colorado Bend State Park",
      "Nearby Gorman Falls, Gorman Spring and park cave-tour opportunities",
    ],
    body: [
      "Gorman Cave sits in the karst landscape of Colorado Bend State Park close to the Colorado River. Texas Parks and Wildlife identifies it as a park point of interest and provides exact trail coordinates, but the cave is managed first as sensitive habitat rather than as a developed show cave.",
      "Visitors can see part of Gorman Cave from the River Trail. A bat-friendly gate limits access farther inside and protects a large group of cave myotis bats, so this destination should not be confused with the park's separately scheduled wild-cave tours. Those tours explore designated caves under guided, reservation-based access.",
      "Make Gorman Cave part of a broader Colorado Bend day rather than planning on entering it. The same park contains Gorman Falls, Gorman Spring, the Colorado River and more than 35 miles of hiking and biking trails, and current alerts can affect trail access at short notice.",
    ],
    managingAuthority: "Texas Parks and Wildlife Department",
    officialUrl: "https://tpwd.texas.gov/state-parks/colorado-bend/trails-info",
    reservationUrl: "https://tpwd.texas.gov/state-parks/colorado-bend",
    sourceCheckedAt,
    county: "San Saba",
    address: "1201 Colorado Park Road, Bend, TX 76824",
    accessibilityNotes:
      "Viewing the cave requires reaching the relevant portion of the park trail system. Trail conditions are natural and can be rocky; the protected cave interior is not general public access.",
  },
  {
    id: "cavern-westcave-preserve",
    brandId: "texasdefined",
    slug: "westcave-preserve",
    name: "Westcave Preserve",
    summary:
      "A reservation-only Hill Country preserve where a guided canyon hike descends through limestone terrain to a spring-fed grotto, waterfall and one-room cave west of Austin.",
    category: "caverns",
    region: "hill-country",
    nearestTown: "Round Mountain",
    coordinates: { lat: 30.3368, lng: -98.14059 },
    hero: {
      src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Grotto%20West%20Cave.jpg?width=1200",
      alt: "The lush grotto and cave at Westcave Preserve in the Texas Hill Country",
      width: 1200,
      height: 1600,
      credit: "Vicki Mitchell · CC BY 2.0 · Wikimedia Commons",
    },
    bestSeason:
      "Year-round when tours are operating; spring and fall usually offer the most comfortable canyon hiking weather",
    entryNote:
      "The canyon, grotto and cave are guided-access only, and reservations are required. The standard Guided Canyon Tour is about 1.5 hours with a one-mile round trip over uneven stairs, rocks, roots and elevation changes; tours are weather permitting.",
    highlights: [
      "Guided descent into a sheltered limestone canyon",
      "Spring-fed grotto, waterfall and one-room cave",
      "Balcones Canyonlands Preserve habitat",
      "Reservation-only small-group nature experience",
    ],
    body: [
      "Westcave Preserve hides its signature landscape below the surrounding Hill Country uplands. A guided route descends through a limestone crevice into a shaded canyon where springs support dense vegetation around a grotto, waterfall, pool and one-room cave.",
      "The preserve is not an open-access park. Westcave requires reservations for its Guided Canyon Tour, and visitors reach the cave and grotto only with a guide. The roughly one-mile round trip includes a long uneven staircase, rocks, roots and elevation changes, so the short mileage understates the physical effort.",
      "Because the preserve is managed for conservation and is part of the larger Balcones Canyonlands Preserve network, weather and habitat protection can affect access. Arrive on time, bring water, wear hiking footwear and review current tour guidance before leaving home.",
    ],
    managingAuthority: "Westcave Outdoor Discovery Center",
    officialUrl: "https://www.westcave.org/the-grotto",
    reservationUrl: "https://www.westcave.org/the-grotto",
    sourceCheckedAt,
    county: "Travis",
    address: "24814 Hamilton Pool Rd, Round Mountain, TX 78663",
    accessibilityNotes:
      "The Guided Canyon Tour is described by Westcave as a moderate-to-difficult hike with a long uneven staircase, rocks, roots and elevation changes.",
  },
];
