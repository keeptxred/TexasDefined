import type { Destination } from "./types";

const CHECKED = "2026-08-19";

const curated: Record<string, Partial<Destination>> = {
  "fort-richardson-state-park-state-historic-site": {
    summary: "A preserved frontier Army post in Jacksboro where restored nineteenth-century military buildings share a park with camping, trails and access to the Lost Creek Reservoir State Trailway.",
    nearestTown: "Jacksboro",
    bestSeason: "Fall through spring for history walks and trail use",
    entryNote: "Historic buildings follow current tour and self-guided schedules, and the park can reach capacity. Check TPWD alerts, tour times and reservations before visiting.",
    highlights: ["Restored Fort Richardson military buildings", "Frontier Army history", "Lost Creek Reservoir State Trailway", "Camping and creekside recreation"],
    body: [
      "Fort Richardson preserves one of the clearest physical records of the U.S. Army's post-Civil War presence on the Texas frontier. Several original buildings remain at the former post, including the hospital and other structures that help explain how soldiers lived and worked at what was once a major Army installation.",
      "The surrounding state park extends the visit beyond the historic post with camping, trails, fishing, swimming and access to the Lost Creek Reservoir State Trailway for hiking, biking and horseback riding. That mix makes Fort Richardson both a history destination and a practical outdoor stop near Jacksboro.",
      "TPWD currently offers self-guided historic-building access on weekends and guided tours on selected weekdays, with schedules subject to events and conditions. Check current park alerts and reservations before arrival so the historical buildings and programs you want to see are available."
    ],
    managingAuthority: "Texas Parks and Wildlife Department",
    officialUrl: "https://tpwd.texas.gov/state-parks/fort-richardson/",
    sourceCheckedAt: CHECKED,
  },
  "hancock-springs-park": {
    summary: "A historic spring-fed city park in Lampasas built around one of Texas' oldest continuously used public swimming pools, with cool artesian water, mature shade and a strong connection to the town's mineral-springs history.",
    nearestTown: "Lampasas",
    bestSeason: "Late spring through summer for swimming; spring and fall for a quieter park visit",
    entryNote: "The park is open year-round, while Hancock Springs Pool operates seasonally and may have limited hours or temporary closures. Check the City of Lampasas pool schedule before making a swimming-focused trip.",
    highlights: ["Spring-fed Hancock Springs Pool", "Historic Lampasas mineral-springs setting", "Picnic, playground and park facilities", "Easy stop along U.S. 281 in Lampasas"],
    body: [
      "Hancock Springs is part of the reason Lampasas developed as a nineteenth-century health-resort town. The mineral springs drew visitors who came to bathe in and drink the water, and the city's history still describes Hancock Springs as a major piece of that resort-era identity.",
      "The park's free-flowing swimming pool is fed by the spring and remains a distinctive warm-season attraction, while the surrounding city park includes picnic space, a playground, the Hostess House and other recreation. The broader park remains useful even outside the pool's seasonal operating period.",
      "Swimming operations depend on the City of Lampasas seasonal schedule, staffing and water conditions, so do not assume the pool is open simply because the park is. Check the city's current Hancock Springs Park and swimming-pool pages before traveling specifically to swim."
    ],
    managingAuthority: "City of Lampasas",
    officialUrl: "https://lampasas.org/367/Hancock-Springs-Park",
    sourceCheckedAt: CHECKED,
  },
  "lipantitlan-state-historic-site": {
    summary: "A quiet Nueces County historic site near Sandia preserving the location of former Fort Lipantitlán, a Mexican military post tied to the opening months of the Texas Revolution and an 1835 engagement near the Nueces River.",
    nearestTown: "Sandia",
    bestSeason: "Fall through spring for comfortable outdoor history exploration",
    entryNote: "The Texas Historical Commission currently lists Lipantitlán as open daily from 9 a.m. to 5 p.m. with free admission. The site has no visitor services and little interpretation beyond the historical marker, so plan it as a short outdoor history stop.",
    highlights: ["Site of Mexican Fort Lipantitlán", "1835 Texas Revolution history", "Nueces River landscape", "Free lightly developed state historic site"],
    body: [
      "Lipantitlán preserves a place where geography and early Texas conflict intersected. Mexican forces established a fort here near an important Nueces River crossing in the early 1830s, giving the location strategic importance before the better-known battles of 1836.",
      "Texian forces captured the fort in November 1835, and fighting followed near the river crossing. Little monumental architecture survives, so the value of the site comes from understanding the landscape, the surviving marker and the role this location played in the opening phase of the Texas Revolution.",
      "The site is now operated by the Texas Historical Commission rather than Texas Parks and Wildlife. THC currently lists daily 9 a.m.–5 p.m. access and free admission, but no visitor services and no interpretation beyond the historical marker. Treat it as a focused historical stop and confirm current THC information before a dedicated drive."
    ],
    managingAuthority: "Texas Historical Commission",
    officialUrl: "https://thc.texas.gov/historic-sites/lipantitlan",
    sourceCheckedAt: CHECKED,
  },
};

export function applyCuratedDestinationBatch52(destination: Destination): Destination {
  const override = curated[destination.slug];
  return override
    ? { ...destination, ...override, hero: override.hero ? { ...destination.hero, ...override.hero } : destination.hero }
    : destination;
}
