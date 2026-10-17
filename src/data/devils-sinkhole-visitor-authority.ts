import type { Destination } from "./types";

/** TPWD 2026-10-15: pins the guided tour departure point, not a protected cave entrance. */
export function applyDevilsSinkholeVisitorAuthority(destination: Destination): Destination {
  if (destination.slug !== "devils-sinkhole-state-natural-area") return destination;
  return {
    ...destination,
    name: "Devil's Sinkhole State Natural Area",
    category: "caverns",
    nearestTown: "Rocksprings",
    county: "Edwards",
    address: "Devil's Sinkhole Visitor Center, 101 N. Sweeten St., Rocksprings, TX 78880",
    coordinates: { lat: 30.015773, lng: -100.208552 },
    sourceCheckedAt: "2026-10-15",
    managingAuthority: "Texas Parks and Wildlife Department",
    officialUrl: "https://tpwd.texas.gov/state-parks/devils-sinkhole",
    summary: "A protected limestone sinkhole near Rocksprings accessible only on reserved guided tours, with summer bat flights, an accessible viewing platform and mandatory downtown visitor-center check-in.",
    bestSeason: "May to October for scheduled bat emergence tours; other guided walks and programs have separate seasonal hours.",
    entryNote: "ALL access requires a guided reservation. Call the Devil's Sinkhole Society at 830-683-2287. Tours meet at 101 N. Sweeten Street in Rocksprings, never at the closed cavern.",
    highlights: [
      "Reserved guided bat-flight programs, usually May 1 through October 31",
      "Wheelchair-accessible cavern-edge observation platform",
      "National Natural Landmark and protected bat colony",
      "Downtown Rocksprings visitor center is the required tour departure",
      "Seasonal nature walks and educational tours"
    ],
    body: [
      "Devil's Sinkhole State Natural Area protects a remarkable vertical limestone cavern and seasonal Mexican free-tailed bat colony. The opening is about 50 feet wide, dropping 140 feet into a much larger chamber. It is a protected National Natural Landmark, not a cave open for unguided entry, climbing or private self-guided exploration. Public access is permitted only as part of an arranged tour.",
      "Start in downtown Rocksprings, not on remote ranch roads. Texas Parks and Wildlife identifies the actual tour departure as Devil's Sinkhole Visitor Center at 101 N. Sweeten Street, Rocksprings, with coordinates 30.015773, -100.208552. That is the visitor navigation pin on this page, not the geological sinkhole itself. Call 830-683-2287 to reserve before driving out, because there is no ordinary walk-in admission at the cave.",
      "Evening bat-flight tours are generally Wednesday through Sunday, May 1 through October 31. Bats emerge at night to feed, but colony behavior, weather and seasonal migration make any given viewing unpredictable. The Devil's Sinkhole Society also arranges morning viewing, birding, nature walks and daytime tours. Ask about the exact meeting time, season and tour type rather than treating the natural area as having daily open-gate state park hours.",
      "The observation platform above the shaft is wheelchair accessible. That does not establish that every tour vehicle, footpath, bathroom or auxiliary program is accessible, so discuss transportation and other mobility requirements directly with the organizer before booking. The natural area is not a campground or RV hookup site. Nearby Kickapoo Cavern State Park offers separate protected-cave programs and overnight recreation subject to its own rules.",
      "The TPWD fee schedule checked October 15, 2026 lists evening bat tours at $14 for adults, $11 for visitors age 65 and older, $6 for children ages 4–12, and free for children under 4. Select morning tours are priced separately: $20 for adults and $10 for children age 11 or younger. These are guided tour prices, not an ordinary state-park day-use ticket. Dates, tour availability and fees may change, so confirm directly with the Devil's Sinkhole Society before traveling. TPWD's official events page may show no currently scheduled events even while it describes the general May-through-October tour season; call 830-683-2287 rather than assuming admission is available.",
    ],
    directions: "Meet the guide at 101 N. Sweeten Street in central Rocksprings, at U.S. 377 and Texas Highway 55. Do not navigate to the remote cave entrance or private ranch gates.",
    accessibilityNotes: "The TPWD cavern-edge observation platform is wheelchair accessible; verify tour transport, restrooms and any mobility needs directly before reserving."
  };
}
