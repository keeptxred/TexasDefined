import type { Destination } from "./types";

const curated: Record<string, Partial<Destination>> = {
  "palo-pinto-mountains-state-park": {
    summary: "Texas' newest state park, now open near Strawn, protects 4,871 acres of Cross Timbers hills and hardwood bottomlands with hiking, biking, fishing, camping and a growing trail system west of the DFW Metroplex.",
    nearestTown: "Strawn",
    coordinates: { lat: 32.53495, lng: -98.5566778 },
    bestSeason: "Fall through spring for hiking and camping; check current trail alerts during the park's first operating year",
    entryNote: "Palo Pinto Mountains State Park opened to visitors March 1, 2026 and held its grand opening April 10. The park is operating while final work continues, and trail availability can change, so reserve entry and check TPWD alerts before leaving.",
    highlights: ["Texas' first newly opened state park in North Texas in more than 25 years", "Cross Timbers hills and hardwood bottomlands", "Hiking, biking, fishing and overnight camping", "New park facilities with ongoing first-year trail and construction updates"],
    body: [
      "Palo Pinto Mountains State Park opened its gates in March 2026 after years of land assembly, planning and construction, adding a major new public landscape between Abilene and the Dallas-Fort Worth region. The park protects former ranch country across juniper-topped slopes and hardwood bottomlands in the Cross Timbers.",
      "Visitors can hike, bike, fish and camp, with a trail system designed to range from shorter family routes to longer outings. The park welcomed more than 15,000 visitors in its first month, so advance reservations are sensible for weekends and holidays.",
      "Because this is a newly opened park, trail and construction conditions are still evolving. Treat the TPWD alert page as part of trip planning: reserve entry, verify which trails are open and follow temporary signs rather than relying on an older map or pre-opening guide."
    ],
    managingAuthority: "Texas Parks and Wildlife Department",
    officialUrl: "https://tpwd.texas.gov/state-parks/palo-pinto-mountains",
    address: "100 Park Road 77, Strawn, TX 76475",
    sourceCheckedAt: "2026-08-07",
  },
};

export function applyCuratedDestinationBatch32(destination: Destination): Destination {
  const override = curated[destination.slug];
  return override ? { ...destination, ...override, hero: override.hero ? { ...destination.hero, ...override.hero } : destination.hero } : destination;
}

export function applyCuratedDestinationsBatch32(destinations: Destination[]): Destination[] {
  return destinations.map(applyCuratedDestinationBatch32);
}
