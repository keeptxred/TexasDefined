import type { Destination } from "./types";

const curated: Record<string, Partial<Destination>> = {
  "hancock-springs-park": {
    summary: "A historic spring-fed city park in Lampasas built around one of Texas' oldest continuously used public swimming pools, with cool artesian water, mature pecan shade and easy access to downtown.",
    nearestTown: "Lampasas",
    bestSeason: "Late spring through summer for swimming; spring and fall for a quieter park visit",
    entryNote: "Swimming operations are seasonal and city schedules can change. Check current City of Lampasas pool hours and admission information before making a swimming-focused trip.",
    highlights: ["Spring-fed Hancock Pool", "Historic Lampasas mineral-springs setting", "Shaded picnic grounds", "Easy stop near downtown Lampasas"],
    body: [
      "Hancock Springs is part of the reason Lampasas developed as a nineteenth-century health-resort town. Mineral-rich spring water still feeds the park's historic swimming pool, giving the experience a natural-water character that ordinary municipal pools do not have.",
      "The surrounding park is compact and shaded, making it useful as a relaxed stop on a Hill Country drive even when the pool is not operating. Its real value is the combination of recreation and Lampasas' spring-resort history.",
      "Because swimming is seasonal, confirm current City of Lampasas operating hours before leaving home. Treat the park as a local historic spring destination rather than assuming year-round staffed pool access."
    ],
    managingAuthority: "City of Lampasas",
    officialUrl: "https://www.lampasas.org/",
  },
  "lipantitlan-state-historic-site": {
    summary: "A quiet Nueces River historic site near Sandia preserving the location of the former Mexican Fort Lipantitlán and a little-known 1835 Texas Revolution engagement.",
    nearestTown: "Sandia",
    bestSeason: "Fall through spring for comfortable outdoor history exploration",
    entryNote: "This is a small, lightly developed historic landscape rather than a staffed museum complex. Check current TPWD access information before making a dedicated trip.",
    highlights: ["Site of Mexican Fort Lipantitlán", "1835 Texas Revolution history", "Nueces River landscape", "Quiet interpretive stop away from major tourist routes"],
    body: [
      "Lipantitlán preserves a place where geography and early Texas conflict intersected. A Mexican fort once guarded an important Nueces River crossing here, making the location strategically significant before the better-known battles of 1836.",
      "Texian forces captured the fort in November 1835, and fighting followed near the river crossing. Little monumental architecture survives, so the experience depends on reading the interpretation and understanding the landscape rather than touring reconstructed buildings.",
      "Approach Lipantitlán as a focused historical stop. Verify current access and conditions with Texas Parks and Wildlife before traveling, and pair it with other Coastal Bend history destinations if you want a fuller day."
    ],
    managingAuthority: "Texas Parks and Wildlife Department",
    officialUrl: "https://tpwd.texas.gov/state-parks/lipantitlan",
  },
};

export function applyCuratedDestinationBatch52(destination: Destination): Destination {
  const override = curated[destination.slug];
  return override
    ? { ...destination, ...override, hero: override.hero ? { ...destination.hero, ...override.hero } : destination.hero }
    : destination;
}
