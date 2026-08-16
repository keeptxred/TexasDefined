import type { Article } from "../types";

const reservoirStub = (
  slug: string,
  title: string,
  dek: string,
  image: string,
  alt: string,
  sourceUrl: string,
  tags: string[],
): Article => ({
  id: `evergreen-${slug}`,
  brandId: "texasdefined",
  slug,
  title,
  dek,
  category: "lakes-rivers",
  hero: { src: image, alt, width: 1200, height: 800, credit: "Texas Water Development Board reservoir record" },
  authorId: "a-marisol",
  publishedAt: "2026-08-16",
  readingMinutes: 9,
  tags,
  featured: false,
  sourceName: "Texas Water Development Board",
  sourceUrl,
  body: [],
  relatedCollections: [],
  relatedDestinations: [],
});

export const lakeBuchananWaterSystemStub = reservoirStub(
  "lake-buchanan-water-system-guide",
  "Lake Buchanan Explained: The Upper Anchor of the Highland Lakes",
  "Lake Buchanan is more than a Hill Country lake. Built on the Colorado River and operated with downstream reservoirs as a system, it helps explain how Central Texas stores water, manages floods and produces hydropower.",
  "https://www.twdb.texas.gov/surfacewater/rivers/reservoirs/buchanan/img/buchanan.jpg",
  "Aerial view of Lake Buchanan and Buchanan Dam on the Colorado River",
  "https://www.twdb.texas.gov/surfacewater/rivers/reservoirs/buchanan/",
  ["Lake Buchanan", "Highland Lakes", "Colorado River", "LCRA", "Texas reservoirs", "Texas water"],
);

export const lakeTravisWaterSystemStub = reservoirStub(
  "lake-travis-water-system-guide",
  "Lake Travis Explained: Austin's Flood-Control and Water-Storage Reservoir",
  "Lake Travis sits just upstream from Austin, but its role reaches far beyond recreation. Mansfield Dam stores Colorado River water, provides flood-control space and operates as part of a larger chain of LCRA reservoirs.",
  "https://www.twdb.texas.gov/surfacewater/rivers/reservoirs/travis/img/travis.jpg",
  "Aerial view of Lake Travis and Mansfield Dam northwest of Austin",
  "https://www.twdb.texas.gov/surfacewater/rivers/reservoirs/travis/index.asp",
  ["Lake Travis", "Mansfield Dam", "Highland Lakes", "Colorado River", "Austin water", "LCRA"],
);

export const lakeWhitneyWaterSystemStub = reservoirStub(
  "lake-whitney-water-system-guide",
  "Lake Whitney Explained: A Brazos River Reservoir Built for Multiple Jobs",
  "Lake Whitney was designed as a multipurpose federal project on the Brazos. Flood control, municipal supply, irrigation, hydropower and recreation all share one reservoir, making it a classic example of Texas' engineered river system.",
  "https://www.twdb.texas.gov/surfacewater/rivers/reservoirs/whitney/img/whitney.jpg",
  "Aerial view of Lake Whitney on the Brazos River",
  "https://www.twdb.texas.gov/surfacewater/rivers/reservoirs/whitney/index.asp",
  ["Lake Whitney", "Brazos River", "Whitney Dam", "Texas reservoirs", "USACE", "Texas water"],
);

export const possumKingdomWaterSystemStub = reservoirStub(
  "possum-kingdom-water-system-guide",
  "Possum Kingdom Lake Explained: An Early Brazos River Multipurpose Reservoir",
  "Possum Kingdom Lake pairs a dramatic North Texas landscape with serious water infrastructure. Morris Sheppard Dam supports municipal and industrial supply, irrigation, flood control, recreation and power generation on the Brazos River.",
  "https://www.twdb.texas.gov/surfacewater/rivers/reservoirs/possum_kingdom/img/possum_kingdom.jpg",
  "Possum Kingdom Lake and its Brazos River shoreline near Morris Sheppard Dam",
  "https://www.twdb.texas.gov/surfacewater/rivers/reservoirs/possum_kingdom/index.asp",
  ["Possum Kingdom Lake", "Brazos River", "Morris Sheppard Dam", "Brazos River Authority", "Texas reservoirs", "Texas water"],
);

export const toledoBendWaterSystemStub = reservoirStub(
  "toledo-bend-water-system-guide",
  "Toledo Bend Explained: Texas' Largest Reservoir and a Two-State Water Project",
  "Toledo Bend stretches along the Sabine River on the Texas-Louisiana line. Its huge surface area, shared ownership and combined water-and-power role make it unlike any reservoir operated wholly inside Texas.",
  "https://www.twdb.texas.gov/surfacewater/rivers/reservoirs/toledo_bend/img/toledo_bend.jpg",
  "Aerial view of Toledo Bend Reservoir and spillway on the Sabine River",
  "https://www.twdb.texas.gov/surfacewater/rivers/reservoirs/toledo_bend/index.asp",
  ["Toledo Bend Reservoir", "Sabine River", "Texas Louisiana", "Texas reservoirs", "hydropower", "Texas water"],
);

export const texasExplainedReservoirProfileStubs: Article[] = [
  lakeBuchananWaterSystemStub,
  lakeTravisWaterSystemStub,
  lakeWhitneyWaterSystemStub,
  possumKingdomWaterSystemStub,
  toledoBendWaterSystemStub,
];