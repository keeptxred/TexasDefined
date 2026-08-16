import type { Article } from "../types";

const roadStub = (
  slug: string,
  title: string,
  dek: string,
  hero: string,
  alt: string,
  sourceUrl: string,
  tags: string[],
): Article => ({
  id: `evergreen-${slug}`,
  brandId: "texasdefined",
  slug,
  title,
  dek,
  category: "road-trips",
  hero: { src: hero, alt, width: 1600, height: 900 },
  authorId: "a-marisol",
  publishedAt: "2026-08-16",
  readingMinutes: 9,
  tags,
  featured: false,
  sourceName: "Texas Department of Transportation",
  sourceUrl,
  body: [],
  relatedCollections: [],
  relatedDestinations: [],
});

export const texasRanchToMarketRoadsStub = roadStub(
  "texas-ranch-to-market-roads-explained",
  "Ranch-to-Market Roads Explained: Why Texas Has RM Highways",
  "Ranch-to-Market roads look like close cousins of FM roads, but RM is its own Texas highway designation. Here is what TxDOT actually says the label means, how it differs from Ranch Road 1, and why the distinction is less tidy than the name suggests.",
  "/images/editorial/texas-rm-roads.svg",
  "Illustrated two-lane Texas ranch road with an RM highway shield",
  "https://www.txdot.gov/projects/planning/highway-designations/glossary.html",
  ["Ranch to Market roads", "RM roads", "Texas highways", "TxDOT", "rural Texas", "Ranch Road 1"],
);

export const texasLoopsSpursStub = roadStub(
  "texas-loops-spurs-explained",
  "Texas Loops and Spurs Explained: The Roads Around and Off the Main Highway",
  "A Loop is usually built to route traffic around something; a Spur usually branches away and ends. Texas uses both designations across urban interchanges, bypasses and short state-system connectors, but their names do not always describe the road shape people expect.",
  "/images/editorial/texas-loops-spurs.svg",
  "Illustrated Texas interchange with Loop and Spur route shields",
  "https://www.txdot.gov/projects/planning/highway-designations/glossary.html",
  ["Texas loops", "Texas spurs", "state highway loop", "state highway spur", "TxDOT", "Texas highways"],
);

export const texasBusinessRoutesStub = roadStub(
  "texas-business-routes-explained",
  "Texas Business Routes Explained: Why the Old Highway Still Runs Through Town",
  "When a through highway bypasses a town, the older route may remain on the state system as a business route. Texas has business versions of Interstate, U.S., State and Farm-to-Market highways, each connecting local streets back to the main route.",
  "/images/editorial/texas-business-routes.svg",
  "Illustrated Texas main street with a green business-route highway shield",
  "https://www.txdot.gov/projects/planning/highway-designations/glossary.html",
  ["Texas business routes", "business loop", "business highway", "Texas main street", "TxDOT", "highway bypass"],
);

export const texasParkRecreationalRoadsStub = roadStub(
  "texas-park-recreational-roads-explained",
  "Texas Park Roads and Recreational Roads Explained",
  "PR and RE shields belong to two of the smallest, most destination-specific systems on the Texas highway map. Park Roads lead to recognized parks, while Recreational Roads connect recognized recreation areas to the state system.",
  "/images/editorial/texas-park-recreational-roads.svg",
  "Illustrated Texas park road entering a wooded recreational area with PR and RE shields",
  "https://www.txdot.gov/projects/planning/highway-designations/glossary.html",
  ["Texas Park Roads", "Recreational Roads", "PR roads", "RE roads", "Texas state parks", "TxDOT"],
);

export const texasHistoricMemorialRoutesStub = roadStub(
  "texas-historic-memorial-highways-explained",
  "Historic Routes vs. Memorial Highways: What a Texas Road Name Really Means",
  "A highway can carry a memorial name or historic-route sign without changing its official route designation. TxDOT records those names separately, while the numbered highway system remains the legal transportation designation.",
  "/images/editorial/texas-historic-memorial-routes.svg",
  "Illustrated Texas highway with a brown historic-route sign and memorial-highway plaque",
  "https://www.txdot.gov/projects/planning/highway-designations.html",
  ["Texas historic routes", "memorial highways", "Texas highway names", "TxDOT", "Texas Historical Commission", "Old San Antonio Road"],
);

export const texasExplainedRoadSystemStubs: Article[] = [
  texasRanchToMarketRoadsStub,
  texasLoopsSpursStub,
  texasBusinessRoutesStub,
  texasParkRecreationalRoadsStub,
  texasHistoricMemorialRoutesStub,
];
