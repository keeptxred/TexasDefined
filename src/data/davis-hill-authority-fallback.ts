import type { Destination } from "./types";

/** Authoritative deterministic fallback: never relies on a remote visitor-park record. */
export const davisHillFallback: Destination = {
  id: "davis-hill-state-park",
  brandId: "texasdefined",
  slug: "davis-hill-state-park",
  name: "Davis Hill State Natural Area",
  summary: "Davis Hill is a protected, undeveloped Texas Parks & Wildlife property in Liberty County near the Trinity River, acquired in 1983. No general public entrance, trails, campground or opening date are published.",
  category: "state-parks",
  region: "piney-woods",
  nearestTown: "Tarkington Prairie",
  county: "Liberty",
  coordinates: { lat: 30.31684, lng: -94.8226 },
  hero: {
    src: "/images/texasdefined-destination-placeholder.svg",
    alt: "Davis Hill State Natural Area — no independently verified photograph available",
    width: 1600,
    height: 1067,
  },
  bestSeason: "Not open for routine public visits",
  entryNote: "No general public access, trailhead, camping reservations or legal driving approach are published; verify future status with TPWD.",
  highlights: ["Unusual coastal plain salt-dome uplift", "Trinity River bottomland hardwood forests", "Rare orchid and distinctive plant communities"],
  body: [
    "Davis Hill State Natural Area is a TPWD conservation holding in Liberty County near Tarkington Prairie and the Trinity River, not a West Texas location associated with Davis Mountains. The agency acquired it in 1983 and estimates the property at roughly 1,700 acres.",
    "TPWD describes unusual sandstone uplands formed by salt-dome uplift close to Trinity River bottomland forests, wetlands and diverse plant communities. The agency documented shadow witch orchid in clay-soil ravines and highlights its exceptional plant associations.",
    "TPWD currently lists Davis Hill among future parks, with no verified public entrance, trails, camping, reservations or opening date. The commission's March 2022 materials authorized pursuing inholdings and neighboring tracts; permission to negotiate is not proof that they were acquired.",
  ],
  managingAuthority: "Texas Parks and Wildlife Department",
  officialUrl: "https://tpwd.texas.gov/state-parks/park-information/future-parks",
  sourceCheckedAt: "2026-10-10",
  directions: "Do not attempt to drive to map pins, enter private roads, or access the property from Trinity River shoreline.",
};
