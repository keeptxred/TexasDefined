import type { Destination } from "./types";
import { makeThcHeritageDestination, thcFaq, thcSource, commonsFilePage } from "./thc-landmark-heritage-builder";

const register = "https://atlas.thc.texas.gov/Details?atlasnumber=2079002933";
const nps = "https://npgallery.nps.gov/AssetDetail/NRIS/79002933";
const thcPreservation = "https://www.thc.texas.gov/public/upload/Architecture_Committee_2-2-2021.pdf";
const history = "https://www.hotelpdn.com/history";
const official = "https://www.hotelpdn.com/";
const marriott = "https://www.marriott.com/en-us/hotels/elpak-hotel-paso-del-norte-autograph-collection/overview/";
const dining = "https://www.marriott.com/en-us/hotels/elpak-hotel-paso-del-norte-autograph-collection/dining/";
const tourism = "https://visitelpaso.com/places/hotel-paso-del-norte";
const downtownWalk = "https://visitelpaso.com/places/downtown-walking-tour";
const westTexasHeritageCenter = "https://www.preservationtexas.org/elpaso";
const trostTours = "https://trostsociety.org/tours/";
const buildersTours = "https://buildersofthedesert.org/tours";
const domePhoto = "Tiffany glass dome, Camino Real Hotel (formerly Hotel Paso del Norte), 1912 .JPG";
const exteriorPhoto = "Hotel Paso del Norte, El Paso, Texas.jpg";
const postcard = "Paso Del Norte, El Paso, Texas.jpg";
const commonsImage = (file: string, width = 1200) =>
  "https://commons.wikimedia.org/wiki/Special:Redirect/file/" + encodeURIComponent(file) + "?width=" + width;

/**
 * A single canonical, researched authority page about the operating 1912 hotel.
 * - Historic 115 El Paso St is the National Register address, NOT the current check-in address.
 * - Hotel services, public access, charges and restaurant schedules can change.
 * - 2015 CC0 dome photograph is documentary, NOT evidence of present-day furnishings.
 * - Never insert unverified hotel-specific CJ/Expedia tracking links.
 */
const base = makeThcHeritageDestination({
  slug: "hotel-paso-del-norte",
  name: "Hotel Paso del Norte",
  town: "El Paso", county: "El Paso", region: "big-bend",
  coordinates: { lat: 31.75778, lng: -106.48917 },
  address: "10 Henry Trost Court, El Paso, TX 79901",
  imageFile: domePhoto,
  imageAlt: "Historic stained-glass dome above the lobby of Hotel Paso del Norte in El Paso, photographed in 2015",
  imageCredit: "Wmpearl · 2015 photograph · CC0 1.0 · Wikimedia Commons",
  imageWidth: 3448, imageHeight: 2900,
  summary: "Opened in 1912 and designed by Henry C. Trost, downtown El Paso's Hotel Paso del Norte is a restored National Register landmark with a dramatic stained-glass Dome Bar, historic public spaces and modern lodging near the Plaza Theatre and convention center.",
  officialUrl: official,
  operator: "Hotel Paso del Norte, Autograph Collection (Marriott Bonvoy)",
  season: "Year-round for a hotel stay or architecture-focused downtown visit. Late fall through spring generally suits outdoor El Paso walking; summer afternoons can be very hot.",
  entry: "This is an operating hotel, not a free-admission museum. Rooms, dining, spa services and events have separate rates or policies. Non-guests should contact the hotel before expecting lobby or Dome Bar access, especially during private events; reservations and current hours change.",
  accessibility: "A restored 1912 building can contain historic design constraints. Ask the hotel directly about step-free arrivals, accessible room types, elevators, bathroom features, dining routes, parking and service-animal policies. Confirm the actual accessible route to the convention center rather than relying on straight-line proximity.",
  highlights: [
    "Thanksgiving Day 1912 opening as Zach T. White's ambitious downtown hotel, designed by Trost & Trost",
    "Original Chicago School and Beaux-Arts architectural character with terra-cotta details and a landmark lobby",
    "Stained-glass lobby dome and circular Dome Bar: examine the artistry without assuming the glass was made by Tiffany",
    "National Register of Historic Places listing dated January 5, 1979; reference 79002933",
    "Extensive interior rehabilitation certified by the Texas Historical Commission in October 2020",
    "Walkable downtown base near the Plaza Theatre, convention center, El Paso Museum of Art and historic business district",
    "Operating hotel with guest rooms, restaurants, meeting spaces, rooftop facilities and other separately priced services",
  ],
  body: [
    "Hotel Paso del Norte opened on Thanksgiving Day in 1912, at a moment when El Paso's railroad, border trade and downtown commercial growth supported an ambitious new class of urban hotels. Local businessman Zach T. White commissioned the building, working with architect Henry C. Trost and the Trost & Trost firm. It was not simply an overnight stop: the lobby and public rooms expressed El Paso's ambition to become a regional meeting point between the American Southwest and northern Mexico.",
    "The original hotel is associated with the Chicago School and Beaux-Arts architectural traditions. The National Register record attributes the design to Trost & Trost, with J. E. Lewis also named, and identifies the original 1912 building as significant for commerce, art and architecture. The Texas Historical Commission additionally notes terra-cotta ornament and a U-shaped original tower. Look for the rhythm of the windows, the massing and the classical detailing rather than assuming every visible section dates to 1912.",
    "The hotel's present appearance reflects several periods of construction. A seventeen-story addition dates to a later twentieth-century modernization, and the building served for many years under the Camino Real name before returning to Hotel Paso del Norte. The National Register entry uses the historic address of 115 El Paso Street; guests checking in today should use 10 Henry Trost Court, which the hotel and Visit El Paso publish as the current visitor address.",
    "Inside, the best-known feature is the stained-glass dome above the grand lobby and Dome Bar. Its colored glass, richly detailed ceiling, arches and columns create a striking contrast with the hotel's contemporary hospitality spaces. The operator describes it as a Tiffany-style dome, a useful description of its appearance; that phrase should not be treated as proof that the Tiffany Studios made it. Visitors should ask whether the bar and lobby can be entered without a room reservation before making a special trip.",
    "The hotel's geography also tells a borderlands story. It stands within downtown El Paso's early commercial streets, close to civic buildings, theaters, museums and the route toward the international boundary. Accounts of the Mexican Revolution describe visitors using the roof to observe events across the Rio Grande. The Texas Historical Commission treats this as a reported historical anecdote, not as a guarantee that today's rooftop provides the same view or public access.",
    "The hotel's 1979 National Register listing preserves an architectural and commercial-history identity independent of its current Marriott flag. Texas Historical Commission records identify National Register reference 79002933 and the property's inclusion in the multiple-property study of El Paso commercial buildings associated with Henry C. Trost. National Register recognition does not make the hotel public property or entitle visitors to enter guest-only rooms.",
    "A major restoration culminated in the hotel's 2020 reopening. The Texas Historical Commission's rehabilitation case study describes broad interior renewal, new building systems, conservation of the historic lobby's decorative finishes and cleaning and protection of the stained-glass dome. Scagliola plaster work and recovered historic gathering spaces illustrate why this was a preservation project, not merely a change of branding. The state certified the project on October 9, 2020 for its historic tax credit program.",
    "Today, Hotel Paso del Norte operates as an Autograph Collection property. Guests can compare its rooms and suites, fitness facilities, pool and spa directly with current hotel policies. The property advertises multiple food and beverage venues, including the Dome Bar, 1700° restaurant and El Mirador rooftop lounge. Those venues have different hours, restrictions and event schedules: check the hotel's dining and reservations pages for the specific day instead of assuming the entire building is open to the public.",
    "For visitors deciding whether to stay, the strongest advantage is the downtown location. The Plaza Theatre, convention center, El Paso Museum of Art and central restaurants are a compact urban cluster, while the Franklin Mountains, Mission Trail, Chamizal and other regional destinations require separately planned trips. Confirm parking charges, valet policies, airport transportation, check-in time, cancellation terms and the full nightly price directly; these are not historical facts and should not be hard-coded from an old promotion.",
    "A history-only stop works differently from a lodging visit. Start on public sidewalks for exterior architecture and the contrast between older portions and the later tower. If lobby entry is permitted, look up at the dome and compare what survives with archival images; do not photograph private events or enter guest corridors. Continue to nearby public attractions rather than representing the hotel as an independently ticketed heritage museum.",
    "For a balanced downtown walk, pair the hotel with the Plaza Theatre area, the El Paso Museum of Art and the city's surrounding historic streets. Those places offer distinct stories: entertainment, visual culture and business architecture. Visit El Paso publishes an independently maintained self-guided downtown architecture walk beginning near San Jacinto Plaza. A half-day can work without a car once you are downtown, but crossing to other El Paso districts or hiking in the Franklin Mountains should be treated as a separate itinerary shaped by weather, transport and opening hours.",
    "For more architecture, Preservation Texas operates the West Texas Heritage Center in downtown El Paso, with exhibits and educational programming subject to its current schedule. The Trost Society publishes an architect-focused downtown walking-tour resource, but its tour page is older: verify it still offers the experience and confirm availability and contributions before planning. Builders of the Desert publishes directly bookable guided historic tours; check route themes, meeting points, accessibility, and charges directly. These are independently operated visitor options. TexasDefined has not established paid-referral or affiliate relationships with them.",
    "For a deeper historical comparison, explore El Paso's broader Trost architecture and the records held by the Texas Historical Commission and National Park Service. Compare the 1913 postcard of the hotel with the 2012 federal survey photograph and a 2015 photograph of the dome. All three are historical documentation, not proof of today's decor, bar menu, public access or room condition.",
    "The hotel is a strong option for travelers who value historic interiors and a central urban base. Travelers primarily seeking low nightly rates, on-site free parking or easy drives to far-flung outdoor sites should compare alternatives before booking. For an architecture enthusiast who does not intend to sleep there, the exterior and permitted public spaces may provide enough context; paying for lodging is not necessary to understand the site's history.",
  ],
  faqs: [
    thcFaq("When did Hotel Paso del Norte open?", "It debuted on Thanksgiving Day in 1912. The hotel's modern restoration and return to the historic name culminated in October 2020.", history),
    thcFaq("Who designed Hotel Paso del Norte?", "Henry C. Trost and his firm Trost & Trost designed the original hotel; federal and state landmark records also identify J. E. Lewis in its construction history.", register),
    thcFaq("Is Hotel Paso del Norte on the National Register of Historic Places?", "Yes. Its listing date is January 5, 1979, under National Register reference number 79002933.", register),
    thcFaq("Where is Hotel Paso del Norte located?", "Guests use 10 Henry Trost Court, El Paso, TX 79901. Historic preservation listings also refer to 115 El Paso Street; that older street address is not the modern check-in instruction.", tourism),
    thcFaq("Is the Dome Bar open to non-hotel guests?", "The Dome Bar is an operating hotel venue, but admission, opening hours and event restrictions can change. Check directly with the hotel before visiting without a reservation.", dining),
    thcFaq("Was the stained-glass dome made by Tiffany?", "The operator calls it Tiffany-style glass. That description does not by itself establish a Tiffany Studios attribution.", history),
    thcFaq("Do I need to book a room to see the historic hotel?", "No room is needed to appreciate the public exterior. Access to lobby, bar, event areas and guest facilities depends on current hotel rules and events.", official),
    thcFaq("Are the pool, spa and restaurants included with a room?", "Do not assume each service is included. Check the hotel's current room terms and prices and each facility's access policy before purchasing.", marriott),
    thcFaq("Is Hotel Paso del Norte near El Paso's Plaza Theatre?", "Yes. The hotel is in central downtown near the Plaza Theatre, convention center and El Paso Museum of Art; check pedestrian and accessible routes before traveling.", tourism),
    thcFaq("Is the hotel wheelchair accessible?", "Ask the operator about the specific accessible guest room, accessible entrance, parking, elevator and restaurant route you need. The historical listing is not an accessibility certification.", marriott),
  ],
  sources: [
    thcSource("Texas Historical Commission — National Register record", register, "Official 1979 listing, historic address, architecture, attribution and register reference 79002933"),
    thcSource("National Park Service — Hotel Paso del Norte listing", nps, "Independent federal National Register identity, architecture and designation"),
    thcSource("Texas Historical Commission — certified rehabilitation", thcPreservation, "1912 construction; Trost; retained historic lobby, dome restoration and October 2020 certification"),
    thcSource("Hotel Paso del Norte — official history", history, "Thanksgiving 1912 opening; 1979 listing; 2020 reopening; Tiffany-style description"),
    thcSource("Hotel Paso del Norte — official current hotel site", official, "Direct reservations, accommodations, contact and current guest services"),
    thcSource("Marriott Autograph Collection — exact property", marriott, "Current brand affiliation, guest facilities, contact and booking details"),
    thcSource("Marriott — restaurants and bars", dining, "The Dome Bar, 1700° and El Mirador; verify present operational schedules"),
    thcSource("Visit El Paso — hotel visitor listing", tourism, "Current 10 Henry Trost Court visitor address, telephone and downtown orientation"),
    thcSource("Visit El Paso — official self-guided downtown walking tour", downtownWalk, "Official 90-minute self-guided historical architecture walk starting by San Jacinto Plaza; check latest brochure and route"),
    thcSource("Preservation Texas — West Texas Heritage Center", westTexasHeritageCenter, "El Paso heritage-exhibit and historic tour programming; confirm current opening times and events"),
    thcSource("Trost Society — downtown architecture guided tours", trostTours, "Preservation nonprofit historic tours; web page may contain older event/pricing information, confirm booking directly"),
    thcSource("Builders of the Desert — live guided walking tour catalog", buildersTours, "Independent downtown heritage tour operator; schedules, charges, accessibility and ticketing managed by operator, not TexasDefined"),
    thcSource("Texas Historical Commission — Magoffin Home access alert", "https://thc.texas.gov/historic-sites/magoffin-home", "Nearby historic home closed through 2027 for restoration; visitor center currently open"),
    thcSource("Wikimedia Commons — original 2015 dome photograph", commonsFilePage(domePhoto), "Wmpearl; CC0 1.0; 3448 × 2900; taken 2015, not a current amenity photograph"),
    thcSource("Wikimedia Commons — 2012 federal survey exterior", commonsFilePage(exteriorPhoto), "Federal Historic American Buildings Survey/NPS public-domain image; 646 × 804"),
    thcSource("Wikimedia Commons — 1913 hotel postcard", commonsFilePage(postcard), "Curt Teich & Co.; University of Houston Libraries public-domain dedication; credit University of Houston Special Collections"),
  ],
  whyVisit: "A landmark 1912 hotel and rare historic downtown hospitality interior, best for architecture, history and a carefully planned overnight stay or permitted public-space visit.",
  firstVisitSteps: [
    "Begin at the public street frontage near Henry Trost Court and distinguish the original 1912 structure from later additions.",
    "If permitted, enter the public lobby to see the stained-glass dome; check Dome Bar service and private-event restrictions first.",
    "Continue to the Plaza Theatre and El Paso Museum of Art for a compact downtown architecture and culture circuit.",
  ],
  physicalEffort: "Low",
});

export const hotelPasoDelNorteAuthorityDestination: Destination = {
  ...base,
  sourceCheckedAt: "2026-10-17",
  authorityGuide: {
    ...base.authorityGuide!,
    whyItMatters: "A nationally recognized 1912 Trost-designed hotel that preserves an unusually rich example of El Paso's railroad-era hospitality architecture and stained-glass lobby. The 2020 restoration kept important historic spaces in use while adapting the landmark for modern guests.",
    assessment: {
      ...base.authorityGuide!.assessment,
      recommendedVisit: "30–60 minutes for exterior architecture and permitted public rooms; overnight accommodation is a separate reservation.",
      weatherExposure: "Mixed indoor/outdoor",
      familyFit: "Families can enjoy a short exterior architecture walk and, when entry is permitted, see the lobby dome. Guest-only facilities are not public attractions.",
    },
  },
  // Official direct booking is NOT an affiliate link; existing travel widgets can
  // separately supply tracked comparison/search offers only within their gates.
  reservationUrl: marriott,
  directions: "For check-in, navigate to 10 Henry Trost Court, not the older 115 El Paso Street historic-register address. Ask the hotel about current valet/garage options and an accessible unloading route.",
  gallery: [
    {
      image: {
        src: commonsImage(exteriorPhoto, 900),
        alt: "Historic American Buildings Survey image of the Hotel Paso del Norte exterior taken in 2012",
        width: 646, height: 804,
        credit: "Historic American Buildings Survey / National Park Service · 2012 · U.S. public domain",
      },
      caption: "Federal architectural documentation of the hotel in 2012. This is an archival exterior, not today's booking photograph.",
      sourceUrl: commonsFilePage(exteriorPhoto),
    },
    {
      image: {
        src: commonsImage(postcard, 900),
        alt: "Early twentieth-century postcard showing Hotel Paso del Norte shortly after it opened in El Paso",
        width: 749, height: 1193,
        credit: "University of Houston Libraries Special Collections · 1913 · public domain",
      },
      caption: "1913 historic postcard. Courtesy of Special Collections, University of Houston Libraries; original image dedicated to the public domain.",
      sourceUrl: commonsFilePage(postcard),
    },
  ],
  areaGuide: {
    intro: "Hotel Paso del Norte is a downtown lodging and architecture anchor rather than a stand-alone public museum. Build nearby walks around verified visitor institutions and keep farther borderlands sites in separate trip blocks.",
    nearbyAttractions: [
      { name: "El Paso Museum of Art", description: "Downtown visual arts within a compact central-city itinerary.", href: "/destination/el-paso-museum-of-art" },
      { name: "Downtown El Paso self-guided walking tour", description: "Official Visit El Paso architecture and historic-streets itinerary starting near San Jacinto Plaza; check latest route brochure.", href: downtownWalk },
      { name: "Preservation Texas West Texas Heritage Center", description: "Downtown El Paso regional heritage exhibits and educational programming; confirm the current visitor schedule.", href: westTexasHeritageCenter },
      { name: "Magoffin Home State Historic Site", description: "The historic home is closed through 2027 for restoration; its visitor center is open. Check the Texas Historical Commission before planning this separately from a hotel visit.", href: "/destination/magoffin-home" },
      { name: "Ysleta del Sur Pueblo Cultural Center Museum", description: "Indigenous Tigua history on a separate Mission Valley visit.", href: "/destination/ysleta-del-sur-pueblo-cultural-center-museum-el-paso" },
    ],
    foodAndDrink: [
      { name: "The Dome Bar", description: "Hotel lobby drinks beneath the historic dome; hours and access can change.", href: dining },
      { name: "1700° Steakhouse", description: "On-property dining, priced separately; check reservations and menu.", href: dining },
      { name: "El Mirador", description: "Rooftop food-and-beverage venue; verify service days and event access.", href: dining },
    ],
    lodging: [
      { name: "Hotel Paso del Norte", description: "Stay in the historic landmark; check rates and terms directly.", href: marriott },
      { name: "Downtown El Paso", description: "Compare other central-city properties against your trip needs.", href: "/city/el-paso" },
      { name: "El Paso visitor area", description: "Explore nearby hotel alternatives before deciding.", href: "/explore/near/el-paso" },
    ],
    neighborhoods: [
      { name: "Downtown", description: "Historic architecture, the convention center, museums and walkable restaurants.", href: "/city/el-paso" },
      { name: "Segundo Barrio", description: "Related borderlands neighborhood heritage; plan a separate respectful walk.", href: "/city/el-paso" },
      { name: "UTEP / Kern Place", description: "A distinct city corridor for university visits and dining.", href: "/city/el-paso" },
    ],
    familyStops: [
      { name: "El Paso Museum of Art", description: "Check exhibitions and family programming directly.", href: "/destination/el-paso-museum-of-art" },
      { name: "Downtown architecture", description: "Short public-sidewalk walk; hotel guest areas remain private.", href: "/city/el-paso" },
      { name: "Franklin Mountains State Park", description: "Separate outdoor outing; plan for desert weather and trails.", href: "/destination/franklin-mountains-state-park" },
    ],
    sideTrips: [
      { name: "Franklin Mountains State Park", description: "Mountain scenery and trails require a separate weather-aware outing.", href: "/destination/franklin-mountains-state-park" },
      { name: "Ysleta del Sur Pueblo museum", description: "Pueblo-operated interpretation in the Mission Valley.", href: "/destination/ysleta-del-sur-pueblo-cultural-center-museum-el-paso" },
      { name: "El Paso County guide", description: "Broader borderlands heritage and visitor context.", href: "/county/el-paso" },
    ],
  },
};
