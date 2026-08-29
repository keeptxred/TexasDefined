import type { Destination, DestinationAreaGuide, ImageRef } from "./types";

type NationalCemeteryDetails = {
  address: string;
  hero: ImageRef;
  bestSeason: string;
  entryNote: string;
  directions: string;
  areaGuide: DestinationAreaGuide;
};

const nationalCemeteryDetails: Record<string, NationalCemeteryDetails> = {
  "fort-sam-houston-national-cemetery": {
    address: "1520 Harry Wurzbach Road, San Antonio, TX 78209",
    hero: {
      src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Fort_Sam_Houston_National_Cemetery.jpg?width=1600",
      alt: "Rows of grave markers across Fort Sam Houston National Cemetery in San Antonio",
      width: 1600,
      height: 481,
      credit: "Travis K. Witt · CC BY-SA 4.0 · Wikimedia Commons",
    },
    bestSeason: "Open daily from sunrise to sunset. Spring and fall usually offer the most comfortable weather for walking the grounds.",
    entryNote: "There is no admission fee. The VA visitor kiosk provides gravesite information and maps. Verify current hours, funeral activity and holiday access with the cemetery before visiting.",
    directions: "The cemetery is in northeast San Antonio on Harry Wurzbach Road. The VA advises travelers from San Antonio International Airport to use NE Loop 410, travel east to Harry Wurzbach Road, then continue south about four miles.",
    areaGuide: {
      intro: "Use Fort Sam Houston National Cemetery as the remembrance anchor of a San Antonio military-history itinerary. Its setting beside Fort Sam Houston connects individual veterans with the city's long role as a major Army center.",
      nearbyAttractions: [
        { name: "Fort Sam Houston and Joint Base San Antonio", description: "Place the cemetery beside the active military landscape that has shaped northeast San Antonio for generations." },
        { name: "The Alamo", description: "Continue into downtown for an earlier chapter of San Antonio military history.", href: "/destination/the-alamo" },
      ],
      foodAndDrink: [{ name: "Broadway and central San Antonio", description: "Use the nearby central-city corridors for meals while keeping the cemetery visit quiet and unhurried." }],
      lodging: [{ name: "Central San Antonio", description: "A central base makes it easy to combine the cemetery with downtown, Fort Sam Houston and other military-history stops." }],
      neighborhoods: [{ name: "Fort Sam Houston and Government Hill", description: "The surrounding neighborhoods help show how the military post became woven into the growth of San Antonio." }],
      familyStops: [{ name: "Visitor kiosk first", description: "Use the VA kiosk to locate a specific gravesite before walking the grounds, especially with younger visitors." }],
      sideTrips: [{ name: "Texas Military Forces Museum", description: "Continue the veteran story at Camp Mabry in Austin with uniforms, vehicles and Texas Guard history.", href: "/destination/texas-military-forces-museum" }],
    },
  },
  "houston-national-cemetery": {
    address: "10410 Veterans Memorial Drive, Houston, TX 77038",
    hero: {
      src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Houston_National_Cemetery.jpg?width=1600",
      alt: "Veterans' grave markers across the green grounds of Houston National Cemetery",
      width: 1600,
      height: 1200,
      credit: "WhisperToMe · CC0 · Wikimedia Commons",
    },
    bestSeason: "Open daily from 6:00 a.m. to 9:00 p.m. Cooler mornings in spring and fall are generally the most comfortable for walking the grounds.",
    entryNote: "There is no admission fee. A VA visitor kiosk provides gravesite information and maps. The cemetery is an active burial site, so visitors should respect funeral processions and verify current access before departure.",
    directions: "Houston National Cemetery is about 15 miles northwest of downtown Houston. From Bush Intercontinental Airport, the VA route uses JFK Boulevard to Beltway 8, then Veterans Memorial Drive and T.C. Jester Boulevard to the cemetery entrance.",
    areaGuide: {
      intro: "Make Houston National Cemetery the veteran-memory stop in a broader Houston history itinerary. The hemicycle and postwar cemetery landscape connect the city's rapid 20th-century growth with generations of military service.",
      nearbyAttractions: [
        { name: "Houston museum district", description: "Use Houston's major museums as a broader history and culture complement after the cemetery visit." },
        { name: "San Jacinto Battleground", description: "Connect modern veteran remembrance with the region's best-known Texas Revolution battlefield.", href: "/destination/san-jacinto-battleground" },
      ],
      foodAndDrink: [{ name: "North Houston", description: "Plan meals away from the burial sections and use the surrounding commercial corridors before or after the visit." }],
      lodging: [{ name: "North Houston or downtown", description: "Choose a base based on whether the cemetery or the wider museum and downtown itinerary is the priority." }],
      neighborhoods: [{ name: "Veterans Memorial corridor", description: "The north-Houston setting places the cemetery inside the metropolitan growth that followed World War II." }],
      familyStops: [{ name: "Hemicycle focus", description: "Use the distinctive memorial structure as the visual entry point for explaining national cemetery traditions to younger visitors." }],
      sideTrips: [{ name: "San Jacinto Battleground", description: "Add the battlefield and monument for a very different Houston-area military-history landscape.", href: "/destination/san-jacinto-battleground" }],
    },
  },
  "dallas-fort-worth-national-cemetery": {
    address: "2000 Mountain Creek Parkway, Dallas, TX 75211",
    hero: {
      src: "https://www.cem.va.gov/CEM/images/cemphotos/916_DallasFtWorth.jpg",
      alt: "Entrance gate at Dallas-Fort Worth National Cemetery in Dallas",
      width: 1200,
      height: 800,
      credit: "U.S. Department of Veterans Affairs · Public domain",
    },
    bestSeason: "Open daily from sunrise to sunset. Spring and fall generally provide the most comfortable temperatures for walking the cemetery's rolling grounds.",
    entryNote: "There is no admission fee. Visitor kiosks provide burial locations and printed maps. The cemetery is active; verify current hours, road access and funeral activity with VA before visiting.",
    directions: "The cemetery is in southwest Dallas between Interstate 20 and Interstate 30, just off Spur 408. VA directions place the entrance on Mountain Creek Parkway.",
    areaGuide: {
      intro: "Use Dallas–Fort Worth National Cemetery as the modern veteran-memory anchor for a North Texas military-history route. Its large rolling site above Mountain Creek Lake reflects the scale of the region and its veteran population.",
      nearbyAttractions: [
        { name: "Mountain Creek Lake", description: "The lake and rolling terrain are part of the cemetery's distinctive setting in southwest Dallas." },
        { name: "Eisenhower Birthplace", description: "Continue north to Denison for the Texas birthplace of the World War II commander and 34th president.", href: "/destination/eisenhower-birthplace" },
      ],
      foodAndDrink: [{ name: "Southwest Dallas", description: "Use nearby Dallas commercial areas for meals before or after the cemetery rather than treating the grounds as a recreation stop." }],
      lodging: [{ name: "Dallas", description: "A Dallas base gives the easiest access to the cemetery and the wider North Texas museum and aviation landscape." }],
      neighborhoods: [{ name: "Mountain Creek corridor", description: "The open southwest-Dallas landscape helps explain why a large modern national cemetery could be developed here." }],
      familyStops: [{ name: "Map the grounds first", description: "The cemetery is large; use the public-information kiosk and section map before walking to a particular grave or memorial." }],
      sideTrips: [{ name: "Eisenhower Birthplace", description: "Pair veteran remembrance with the North Texas origins of Dwight D. Eisenhower.", href: "/destination/eisenhower-birthplace" }],
    },
  },
};

export function enrichNationalCemeteryDestination(destination: Destination): Destination {
  const details = nationalCemeteryDetails[destination.slug];
  return details
    ? { ...destination, ...details, sourceCheckedAt: "2026-08-29", managingAuthority: "U.S. Department of Veterans Affairs — National Cemetery Administration" }
    : destination;
}
