import type { Destination } from "./types";

/**
 * Primary-source Gainesville museum guide.
 * The public-domain medals illustration is NOT a photograph of the building
 * or its collections. Do not replace it with copyrighted NCTC imagery.
 * Checked against the current NCTC museum page, the NCTC field-trip handbook,
 * the Host City Program site and OpenStreetMap on 2026-11-08.
 */
// Time-limited visitor warning from NCTC's November 2026 events calendar.
// It expires without requiring another content deployment or a manual seasonal audit.
const veteransDayCampusClosure = Date.now() < Date.UTC(2026, 10, 12)
  ? "IMPORTANT: NCTC lists all campuses CLOSED Wednesday, November 11, 2026 (Veterans Day). Do not assume museum admission that day; verify any special access with museum staff. "
  : "";

export const medalOfHonorHostCityMuseumDestinations: Destination[] = [{
  id: "gainesville-medal-of-honor-host-city-museum",
  brandId: "texasdefined",
  slug: "medal-of-honor-host-city-museum-gainesville",
  name: "Medal of Honor Host City Museum",
  summary: "A free museum on North Central Texas College's Gainesville campus, devoted to the stories of Medal of Honor recipients and Gainesville's Host City tradition. This independent guide covers exhibits, current hours, school trips, parking and nearby historic stops.",
  category: "historic-sites",
  region: "prairies-lakes",
  geography: {
    primaryRegionId: "north-texas",
    subregionIds: ["north-texas-prairies", "cross-timbers"],
    countySlugs: ["cooke"],
    travelRegionIds: ["prairies-lakes"],
  },
  nearestTown: "Gainesville",
  county: "Cooke",
  coordinates: { lat: 33.6185, lng: -97.16337 },
  hero: {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Tri-service_medal_of_honor.jpg?width=1280",
    alt: "Illustration of the Army, Navy and Air Force Medals of Honor; contextual image, not a photograph of the Gainesville museum",
    width: 1000,
    height: 473,
    credit: "U.S. Special Operations Command · public domain · Wikimedia Commons; contextual medals illustration, not the museum or its exhibits",
  },
  gallery: [
    {
      image: {
        src: "https://media.defense.gov/2015/Apr/13/2001041341/-1/-1/0/150411-F-ZC626-703.JPG",
        alt: "U.S. military service members at Gainesville's separate Medal of Honor memorial during the 2015 Host City parade; not a photograph of the NCTC museum",
        width: 1200, height: 800,
        credit: "U.S. Air Force / Airman 1st Class Robert L. McIlrath · April 11, 2015 · U.S. government work, public domain",
      },
      caption: "Historical context: airmen, soldiers and sailors at the Gainesville Medal of Honor memorial during the 2015 Host City parade. This predates the permanent NCTC museum's 2025 opening and shows a different site, not the museum building.",
      sourceUrl: "https://www.sheppard.af.mil/News/Photos/igphoto/2001041341/",
    },
    {
      image: {
        src: "https://media.defense.gov/2015/Apr/13/2001041338/-1/-1/0/150411-F-OP138-160.JPG",
        alt: "Medal of Honor recipient Hershel Woody Williams greeting people from a historic 2015 Gainesville parade vehicle; historical Host City program photo, not a museum exhibit",
        width: 1200, height: 800,
        credit: "U.S. Air Force / Senior Airman Kyle Gese · April 11, 2015 · U.S. government work, public domain",
      },
      caption: "Historical context: Medal of Honor recipient Hershel “Woody” Williams greeted Gainesville residents during the city's 2015 Host City parade. His participation illustrates the annual community tradition; this is not an image of the NCTC museum or proof of current displays.",
      sourceUrl: "https://www.sheppard.af.mil/News/Photos/igphoto/2001041338/",
    },
  ],
  bestSeason: "A weekday visit can be planned year-round; regular and summer weekday hours differ. Verify campus holidays and event changes with North Central Texas College before driving.",
  entryNote: `${veteransDayCampusClosure}Admission is free per the NCTC museum field-trip handbook. Regular posted hours: Monday–Thursday 8 a.m.–5 p.m., Friday 8 a.m.–noon; closed during ordinary weekend hours. The handbook separately lists summer Monday–Thursday 7:30 a.m.–5:30 p.m. and Friday closed. Confirm your date and building access at the official museum page.`,
  address: "1525 W California St, Gainesville, TX 76240",
  officialUrl: "https://www.nctc.edu/museum/",
  managingAuthority: "North Central Texas College / Medal of Honor Host City Museum",
  sourceCheckedAt: "2026-11-08",
  directions: "On the NCTC Gainesville campus at 1525 W California Street. Use the museum entrance rather than assuming all campus entrances reach the exhibits. The school-trip handbook places the visitor parking lot across from the museum entrance.",
  accessibilityNotes: "The NCTC museum visitor page does not specify all accessibility facilities or accommodations. Call 940-668-3330 or email MOH.HostCityMuseum@nctc.edu to confirm step-free entrance, mobility access, accessible parking, sensory accommodations and tour arrangements before traveling.",
  highlights: [
    "Recipient stories, historic artifacts and memorabilia",
    "Gainesville's unique Medal of Honor Host City tradition",
    "Free museum admission according to NCTC's field-trip handbook",
    "School-group guided and self-guided educational options",
    "NCTC Gainesville campus location and nearby historic downtown",
    "Recipient gallery documented in 2025: Duane E. Dewey, Roger H. C. Donlon, Michael J. Fitzmaurice; current exhibits may differ",
  ],
  visitorFacts: [
    { topic: "admission", label: "Admission", detail: "Free admission is stated in NCTC's field-trip handbook. Confirm whether special programming has separate arrangements.", sourceUrl: "https://www.nctc.edu/media/nctc/documents/pdf/Field%20Trip%20Handbook.pdf", checkedAt: "2026-11-08" },
    { topic: "hours", label: "Regular museum hours", detail: "Monday–Thursday 8 a.m.–5 p.m.; Friday 8 a.m.–noon. Check the official calendar for holidays and closures.", sourceUrl: "https://www.nctc.edu/museum/", checkedAt: "2026-11-08" },
    { topic: "hours", label: "Summer hours", detail: "NCTC's school-trip handbook lists Monday–Thursday 7:30 a.m.–5:30 p.m.; Friday closed during the summer schedule. Confirm which calendar currently applies.", sourceUrl: "https://www.nctc.edu/media/nctc/documents/pdf/Field%20Trip%20Handbook.pdf", checkedAt: "2026-11-08" },
    { topic: "reservations", label: "School group scheduling", detail: "School groups must book at least two weeks ahead; groups are capped at 100 including teachers and chaperones, with larger groups split across sessions.", sourceUrl: "https://www.nctc.edu/media/nctc/documents/pdf/Field%20Trip%20Handbook.pdf", checkedAt: "2026-11-08" },
    ...(Date.now() < Date.UTC(2026, 10, 12) ? [{
      topic: "hours" as const, label: "NCTC campus closure calendar",
      detail: "The NCTC calendar lists all campuses closed on November 11, 2026 (Veterans Day). Special museum access is not assumed.",
      sourceUrl: "https://www.nctc.edu/events-calendar/?day=11&month=11&search=day&year=2026",
      checkedAt: "2026-11-08",
    }] : []),
    { topic: "parking", label: "Parking and bus arrival", detail: "The school handbook identifies an open lot opposite the museum entrance and bus drop-off/pick-up at the entrance. Check campus access for your visit.", sourceUrl: "https://www.nctc.edu/media/nctc/documents/pdf/Field%20Trip%20Handbook.pdf", checkedAt: "2026-11-08" },
  ],
  body: [
    "The Medal of Honor Host City Museum is a focused history destination on the North Central Texas College campus in Gainesville. Rather than attempting a complete history of every American war, it uses the experiences of Medal of Honor recipients to explore decisions, service, sacrifice and how stories of valor are preserved. The museum's own account describes historical artifacts, personal memorabilia, educational programs and changing community events.",
    "Gainesville's wider Host City story is central to what makes this stop distinctive. The community began welcoming living Medal of Honor recipients through the Host City Program in 2001. Annual visits, public recognition and educational activities give the museum a local civic purpose beyond displaying medals. This museum is not the National Medal of Honor Museum in Arlington, Texas; those are separate institutions with different experiences and access arrangements.",
    "The permanent museum held its ribbon-cutting on April 10, 2025 and later opened for regular public visits. Earlier opening stories quoted different schedules. For current planning, use the current NCTC museum page and its separate summer-hour guidance, not an undated third-party listing or last year's news coverage.",
    "What can you expect? The museum advertises exhibits about Medal of Honor recipients, material contributed by veterans and families, and interpretation of courage and personal service. Its published collection policy names uniforms, medals and honors, original reports, personal letters, photographs, oral histories and everyday military mementos among its collecting interests. That is a statement of collection priorities, not a promise that every listed type of artifact is on display on a given day.",
    "A June 2025 KXII photograph of the museum's recipient gallery shows panels for Marine Duane E. Dewey and Army recipients Roger Hugh C. Donlon and Michael John Fitzmaurice. Those labels are documented examples of the museum's biographical approach, not a promise that the same gallery arrangement remains in place today. Dewey's 1952 Korean War citation concerns protecting wounded fellow Marines from a grenade; Donlon's citation records the 1964 defense of Camp Nam Dong in Vietnam; and Fitzmaurice's citation describes his actions against explosive charges in a bunker near Khe Sanh in 1971. Comparing these three stories is an instructive way to study valor without assuming the museum has a fixed rotating-exhibit schedule.",
    "Why these names matter: two accounts involve shielding other service members from an explosion, but they took place in different wars, service branches and circumstances; Donlon's story instead centers on coordinating the defense of a remote camp under attack. When you visit, use the gallery labels and official citations to distinguish the circumstances rather than reducing different recipients to one generic narrative. Source trail: KXII's June 19, 2025 gallery image and published recipient citations from the U.S. government and the National Medal of Honor Museum.",
    "For a first visit, begin with the recipient biographies rather than trying to identify every artifact immediately. Ask which displays connect particular recipients to the Gainesville visits, then compare their military service and their lives afterward. The value of the visit is connecting a formal decoration with actual people and the difficult circumstances in which they acted.",
    "This is an especially suitable stop for teachers, families with school-age children and readers of military history who want an educational exhibit rather than a large vehicle or aircraft collection. It is a less appropriate choice for someone seeking shipboard tours, tanks or a full day of aircraft exhibits; TexasDefined's separate statewide military museum guide covers those experiences.",
    "Independent visit-planning judgment: treat this as one anchor of a Gainesville heritage outing, not automatically an all-day attraction. The museum does not publish a standard visit duration, and exhibit availability can change. Give yourself time for a thoughtful visit, then consider the Host City Park, historic downtown and the Morton Museum of Cooke County as distinct second stops. Check each site's hours separately.",
    "The museum's location is on an operating college campus. NCTC's school-trip handbook describes an open parking lot opposite the museum entrance, bus drop-off at the entrance, a ban on food and drinks inside galleries except closed bottled water, and photography only where permitted. Ordinary individual visitors should verify practical arrangements with the operator rather than assuming the school's group itinerary is their own admission procedure.",
    "For school field trips, the logistics matter more than typical walk-in planning. NCTC requires reservations at least two weeks in advance, limits groups to 100 people including adults, asks for one chaperone per ten students, and requests arrival 15 minutes before the scheduled tour. It offers guided visits and self-guided activity-sheet options. Contact the museum for age-specific materials and any changes to these arrangements.",
    "Do not confuse the federal Medal of Honor with the Texas Legislative Medal of Honor, a separate state distinction. The Gainesville museum concentrates on the national award and Host City traditions; TexasDefined's Texas Medal of Honor stories guide supplies biographical background on Audie Murphy, Macario Garcia and Roy Benavidez. The two resources work best together without pretending every person in the article has a dedicated Gainesville exhibit.",
    "For accessibility, step-free routes, seating, hearing assistance, accessible parking, and sensory accommodations are not detailed sufficiently on the public museum page to make definite claims. Contact museum staff ahead of time at 940-668-3330 or MOH.HostCityMuseum@nctc.edu. A lack of published specifics should not be presented as evidence that an accommodation is unavailable.",
    "See the original June 2025 KXII museum-opening coverage for a photograph of named recipient panels, and the government recipient indexes or published citations to check the wartime actions summarized here. The 2025 photo is a historical reference: current exhibit inventory has not been verified on-site. NCTC's official events calendar is the source for its November 11, 2026 campus closure, while its current museum page governs regular opening hours.",
    "Sources and methodology: this independently written guide reconciles current NCTC museum hours with the handbook's summer schedule and earlier opening notices. Museum exhibits and accessibility details are presented conservatively; location coordinates derive from the OpenStreetMap museum record. No first-hand visit or special staff access is claimed. Information checked November 8, 2026; changing details require a fresh source review.",
  ],
  areaGuide: {
    intro: "Use a weekday museum visit as the starting point for an independent Gainesville history outing. These are nearby, separate destinations with their own hours and access requirements.",
    nearbyAttractions: [
      { name: "Medal of Honor Host City Park", description: "A separate Gainesville outdoor tribute; do not confuse the park with the NCTC museum.", proximity: "Elsewhere in Gainesville" },
      { name: "Morton Museum of Cooke County", description: "Local archives, civic history and an 1884 former city hall. Check its current hours.", href: "/destination/morton-museum-of-cooke-county", proximity: "Downtown Gainesville" },
      { name: "Cooke County Courthouse", description: "Restored 1912 civic landmark that anchors Gainesville's downtown heritage district.", proximity: "Downtown square" },
    ],
    foodAndDrink: [{ name: "Downtown Gainesville", description: "Look for food and coffee near the courthouse square after a museum visit; verify individual business hours.", proximity: "East of the NCTC campus" }],
    lodging: [{ name: "Gainesville", description: "A practical base for a separate Cooke County day trip; lodging choice depends on your wider route.", proximity: "In town" }],
    neighborhoods: [{ name: "Historic downtown Gainesville", description: "Explore the courthouse square and older commercial blocks as a counterpart to the museum's modern campus location.", proximity: "Downtown" }],
    familyStops: [
      { name: "Medal of Honor Host City Museum", description: "The museum offers educational guided and self-guided options for students; school groups must arrange visits in advance.", proximity: "On NCTC campus" },
      { name: "Morton Museum of Cooke County", href: "/destination/morton-museum-of-cooke-county", description: "A contrasting collection focused on the local community and its civic architecture.", proximity: "Downtown Gainesville" },
    ],
    sideTrips: [
      { name: "Cooke County, Gainesville and the Red River", href: "/article/cooke-county-gainesville-red-river-muenster-north-texas", description: "Understand the county's frontier, railroad and wartime history before extending a North Texas trip." },
      { name: "Texas Medal of Honor Stories", href: "/article/texas-medal-of-honor-heroes", description: "Read carefully sourced stories of Audie Murphy, Macario Garcia and Roy Benavidez." },
      { name: "Texas military museums and historic sites", href: "/article/texas-military-museums-historic-sites-guide", description: "Compare Gainesville's focused recipient and community interpretation with aviation, naval, military forces and battlefield museums." },
      { name: "National Medal of Honor Museum (Arlington)", description: "Different institution and admission arrangement; consult its official website if you plan to visit both.", proximity: "Arlington, Texas" },
    ],
  },

}];
