import type { Destination } from "./types";

/**
 * Fifty-second statewide museum wave. This Nacogdoches record adds SFA's
 * Stone Fort Museum, a Texas Centennial reconstruction interpreting early
 * East Texas and the long history of Antonio Gil Y'Barbo's stone house.
 */
export const statewideMuseumExpansionWave52Destinations: Destination[] = [
  {
    id: "museum-statewide-wave52-stone-fort-museum",
    brandId: "texasdefined",
    slug: "stone-fort-museum-nacogdoches",
    name: "Stone Fort Museum",
    summary: "Stone Fort Museum on the Stephen F. Austin State University campus in Nacogdoches interprets early East Texas history inside the 1936 Texas Centennial reconstruction of Antonio Gil Y'Barbo's eighteenth-century stone house.",
    category: "historic-sites",
    region: "piney-woods",
    nearestTown: "Nacogdoches",
    county: "Nacogdoches County",
    coordinates: { lat: 31.61937, lng: -94.64879 },
    hero: {
      src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/StoneFortMuseum-SFA.jpg?width=1600",
      alt: "1936 Stone Fort Museum reconstruction on the Stephen F. Austin State University campus",
      width: 1600, height: 1064,
      credit: "StoneFortMuseum · CC BY-SA 4.0 · Wikimedia Commons",
    },
    bestSeason: "Year-round for the indoor museum; fall through spring is especially comfortable for pairing a visit with Nacogdoches historic sites and the SFA campus.",
    entryNote: "Admission is free. The museum publishes Tuesday-Saturday 9 a.m.-5 p.m. and Sunday 1-5 p.m. hours. University schedules and holidays can affect access, so confirm current visitor information before a dedicated trip.",
    highlights: [
      "1936 Texas Centennial reconstruction of the Old Stone Fort",
      "Antonio Gil Y'Barbo and Spanish Colonial Nacogdoches history",
      "Early East Texas cultural and material history",
      "Stephen F. Austin State University museum and educational resource",
    ],
    body: [
      "Stone Fort Museum preserves the story of one of Nacogdoches' most recognizable historic landmarks even though the structure visitors see today is a reconstruction. Antonio Gil Y'Barbo built the original stone house in the late eighteenth century along the Camino Real. Over its long life the building served several roles and became known locally as the Old Stone Fort before the original structure was demolished in 1902.",
      "The present museum was reconstructed in 1936 as a Texas Centennial project and placed on the Stephen F. Austin State University campus. Rather than presenting the building simply as a fort, the museum uses it to explore the people, objects, places and conflicts that shaped early East Texas and Nacogdoches. SFA describes the institution as a resource for regional history, university learning, research, exhibitions and public educational programs.",
      "The museum's setting makes it a useful anchor for a broader Nacogdoches history itinerary. Visitors can connect its Spanish Colonial and early East Texas interpretation with the city's historic houses, downtown heritage and other SFA resources. Free admission and a regular six-day public schedule make Stone Fort Museum a worthwhile destination in its own right rather than only a campus landmark.",
    ],
    officialUrl: "https://www.sfasu.edu/stonefortmuseum",
    managingAuthority: "Stephen F. Austin State University",
    address: "1808 Alumni Drive, Nacogdoches, TX 75962",
    sourceCheckedAt: "2026-10-12",
    accessibilityNotes: "SFA's campus-museum visitor information should be used for current accessible entry and exhibit access. The historic-looking exterior is a 1936 reconstruction; call the museum before an accessibility-dependent visit.",
    areaGuide: {
      intro: "Combine the museum with historic Nacogdoches, El Camino Real and a separate garden or community-history stop.",
      nearbyAttractions: [{ name: "Ruby M. Mize Azalea Garden", description: "Walk SFA's free public garden.", href: "/destination/ruby-m-mize-azalea-garden" }],
      foodAndDrink: [{ name: "Campus and downtown dining", description: "Independent restaurants are found around SFA and the downtown corridor." }],
      lodging: [{ name: "Nacogdoches", description: "Stay in the city to explore its historic core and Piney Woods surroundings." }],
      neighborhoods: [{ name: "SFA campus", description: "The museum occupies a 1936 replica; the university grounds contain other historic and cultural resources." }],
      familyStops: [{ name: "Ruby Mize Garden", description: "Follow indoor regional history with an outdoor, weather-dependent garden visit.", href: "/destination/ruby-m-mize-azalea-garden" }],
      sideTrips: [{ name: "Historic Nacogdoches to San Augustine", description: "Connect Caddo and Spanish histories with the El Camino Real route.", href: "/article/nacogdoches-san-augustine-historic-road-trip" }],
    },
    visitorFaqs: [
      { question: "Is the Stone Fort Museum the original eighteenth-century fort?", answer: "No. The present building was reconstructed in 1936 for the Texas Centennial to recall Antonio Gil Y'Barbo's eighteenth-century stone house.", sourceUrl: "https://www.sfasu.edu/stonefortmuseum" },
      { question: "Is admission free?", answer: "SFA currently lists free individual admission; educational programs require reservations.", sourceUrl: "https://www.sfasu.edu/history/historical-resources/stone-fort-museum" },
      { question: "When can I visit?", answer: "SFA publishes Tuesday–Saturday 9 a.m.–5 p.m. and Sunday 1–5 p.m., excluding university holidays. Confirm the current schedule before travel.", sourceUrl: "https://www.sfasu.edu/history/historical-resources/stone-fort-museum" },
      { question: "Where should I park?", answer: "SFA describes free legal on-campus parking near the museum and a paid student-center garage; always follow posted campus parking requirements.", sourceUrl: "https://www.sfasu.edu/history/historical-resources/stone-fort-museum" },
    ],
  },
];
