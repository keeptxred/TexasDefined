import type { Article } from "../types";

const reservoirStub = (
  slug: string,
  title: string,
  dek: string,
  image: string,
  alt: string,
  imageCredit: string,
  imageHeight: number,
  sourceUrl: string,
  tags: string[],
): Article => ({
  id: `evergreen-${slug}`,
  brandId: "texasdefined",
  slug,
  title,
  dek,
  category: "lakes-rivers",
  hero: { src: image, alt, width: 1600, height: imageHeight, credit: imageCredit },
  authorId: "a-marisol",
  publishedAt: "2026-08-16",
  readingMinutes: 6,
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
  "https://commons.wikimedia.org/wiki/Special:Redirect/file/Lake_Buchanan%2C_Texas_%289302%29.jpg?width=1600",
  "Lake Buchanan in the Texas Hill Country",
  "Lars Plougmann · CC BY-SA 2.0 · Wikimedia Commons · File:Lake Buchanan, Texas (9302).jpg",
  1067,
  "https://www.twdb.texas.gov/surfacewater/rivers/reservoirs/buchanan/",
  ["Lake Buchanan", "Highland Lakes", "Colorado River", "LCRA", "Texas reservoirs", "Texas water"],
);

export const lakeTravisWaterSystemStub = reservoirStub(
  "lake-travis-water-system-guide",
  "Lake Travis Explained: Austin's Flood-Control and Water-Storage Reservoir",
  "Lake Travis sits just upstream from Austin, but its role reaches far beyond recreation. Mansfield Dam stores Colorado River water, provides flood-control space and operates as part of a larger chain of LCRA reservoirs.",
  "https://commons.wikimedia.org/wiki/Special:Redirect/file/Lake_travis_from_iguana_grill_2013.jpg?width=1600",
  "Lake Travis viewed from the former Iguana Grill site during the 2013 drought",
  "Larry D. Moore · CC BY 4.0 · Wikimedia Commons · File:Lake travis from iguana grill 2013.jpg",
  1067,
  "https://www.twdb.texas.gov/surfacewater/rivers/reservoirs/travis/index.asp",
  ["Lake Travis", "Mansfield Dam", "Highland Lakes", "Colorado River", "Austin water", "LCRA"],
);

export const lakeWhitneyWaterSystemStub = reservoirStub(
  "lake-whitney-water-system-guide",
  "Lake Whitney Explained: A Brazos River Reservoir Built for Multiple Jobs",
  "Lake Whitney was designed as a multipurpose federal project on the Brazos. Flood control, municipal supply, irrigation, hydropower and recreation all share one reservoir, making it a classic example of Texas' engineered river system.",
  "https://commons.wikimedia.org/wiki/Special:Redirect/file/Lake_Whitney_at_sunset6.jpg?width=1600",
  "Lake Whitney, Texas, at sunset",
  "Brett Spangler · CC BY-SA 2.0 · Wikimedia Commons · File:Lake Whitney at sunset6.jpg",
  1004,
  "https://www.twdb.texas.gov/surfacewater/rivers/reservoirs/whitney/index.asp",
  ["Lake Whitney", "Brazos River", "Whitney Dam", "Texas reservoirs", "USACE", "Texas water"],
);

export const possumKingdomWaterSystemStub = reservoirStub(
  "possum-kingdom-water-system-guide",
  "Possum Kingdom Lake Explained: An Early Brazos River Multipurpose Reservoir",
  "Possum Kingdom Lake pairs a dramatic North Texas landscape with serious water infrastructure. Morris Sheppard Dam supports municipal and industrial supply, irrigation, flood control, recreation and power generation on the Brazos River.",
  "https://commons.wikimedia.org/wiki/Special:Redirect/file/Possumkingdomlake.jpg?width=1600",
  "Possum Kingdom Lake, Texas, photographed in October 2010",
  "Mark Quadling and Henley Quadling · CC BY-SA 3.0 · Wikimedia Commons · File:Possumkingdomlake.jpg",
  1067,
  "https://www.twdb.texas.gov/surfacewater/rivers/reservoirs/possum_kingdom/index.asp",
  ["Possum Kingdom Lake", "Brazos River", "Morris Sheppard Dam", "Brazos River Authority", "Texas reservoirs", "Texas water"],
);

export const toledoBendWaterSystemStub = reservoirStub(
  "toledo-bend-water-system-guide",
  "Toledo Bend Explained: Texas' Largest Reservoir and a Two-State Water Project",
  "Toledo Bend stretches along the Sabine River on the Texas-Louisiana line. Its huge surface area, shared ownership and combined water-and-power role make it unlike any reservoir operated wholly inside Texas.",
  "https://commons.wikimedia.org/wiki/Special:Redirect/file/Sabine_National_Forest%2C_Toledo_Bend_Reservoir%2C_Texas.jpg?width=1600",
  "Toledo Bend Reservoir inlet in Sabine National Forest, Sabine County, Texas",
  "William L. Farr · CC BY 4.0 · Wikimedia Commons · File:Sabine National Forest, Toledo Bend Reservoir, Texas.jpg",
  1067,
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