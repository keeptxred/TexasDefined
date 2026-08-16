import type { Article } from "../types";

const riverStub = (
  slug: string,
  title: string,
  dek: string,
  hero: Article["hero"],
  sourceUrl: string,
  tags: string[],
): Article => ({
  id: `evergreen-${slug}`,
  brandId: "texasdefined",
  slug,
  title,
  dek,
  category: "lakes-rivers",
  hero,
  authorId: "a-marisol",
  publishedAt: "2026-08-16",
  readingMinutes: 10,
  tags,
  featured: false,
  sourceName: "Texas Water Development Board",
  sourceUrl,
  body: [],
  relatedCollections: [],
  relatedDestinations: [],
});

export const texasBrazosRiverGuideStub = riverStub(
  "texas-brazos-river-guide",
  "The Brazos River Explained: The Texas Basin With the Biggest Flow",
  "The Brazos crosses an enormous slice of Texas from the Rolling Plains to the Gulf. Its tributaries, reservoirs and changing water demands help explain farming, cities, floodplains and the state's surface-water map.",
  { src: "/images/explore/lakes-rivers/lake-somerville-birch-creek-unit.jpg", alt: "Open water and wooded shoreline in the Brazos River basin", width: 1600, height: 1067 },
  "https://www.twdb.texas.gov/surfacewater/rivers/river_basins/brazos/index.asp",
  ["Brazos River", "Brazos River basin", "Texas rivers", "Texas water", "Texas geography", "TWDB"],
);

export const texasColoradoRiverGuideStub = riverStub(
  "texas-colorado-river-guide",
  "The Colorado River Explained: The Texas River That Runs Through Austin",
  "Texas' Colorado River begins far west of Austin and runs entirely within the state to Matagorda Bay. Its long, relatively dry basin and chain of reservoirs show why river length and water yield are not the same thing.",
  { src: "/images/explore/lakes-rivers/pedernales-falls-state-park.jpg", alt: "Limestone river channel and flowing water in the Colorado River basin", width: 1600, height: 1067 },
  "https://www.twdb.texas.gov/surfacewater/rivers/river_basins/colorado/",
  ["Colorado River Texas", "Colorado River basin", "Highland Lakes", "Texas rivers", "Austin water", "TWDB"],
);

export const texasGuadalupeRiverGuideStub = riverStub(
  "texas-guadalupe-river-guide",
  "The Guadalupe River Explained: Springs, Canyon Lake and a Hill Country River",
  "The Guadalupe begins in the Hill Country, receives important spring-fed tributaries and flows toward San Antonio Bay. Its basin makes the groundwater-surface-water connection unusually easy to see.",
  { src: "/images/explore/lakes-rivers/guadalupe-river-state-park.jpg", alt: "Clear Guadalupe River flowing beneath mature cypress trees", width: 1600, height: 1115 },
  "https://www.twdb.texas.gov/surfacewater/rivers/river_basins/guadalupe/index.asp",
  ["Guadalupe River", "Guadalupe River basin", "Canyon Lake", "Texas Hill Country", "Texas springs", "TWDB"],
);

export const texasTrinityRiverGuideStub = riverStub(
  "texas-trinity-river-guide",
  "The Trinity River Explained: The River System Behind Dallas-Fort Worth",
  "The Trinity River basin is entirely inside Texas and sits beneath much of Dallas-Fort Worth's water story. Its forks, reservoirs and downstream exports connect a major metro area with the Gulf Coast.",
  { src: "/images/explore/lakes-rivers/ray-roberts-lake-isle-du-bois-unit.jpg", alt: "Reservoir shoreline and open water in the upper Trinity River basin", width: 1600, height: 1067 },
  "https://www.twdb.texas.gov/surfacewater/rivers/river_basins/trinity/index.asp",
  ["Trinity River", "Trinity River basin", "Dallas Fort Worth water", "Texas rivers", "Texas reservoirs", "TWDB"],
);

export const texasRioGrandeGuideStub = riverStub(
  "texas-rio-grande-river-guide",
  "The Rio Grande Explained: Texas' International River and Largest Basin",
  "The Rio Grande crosses states, deserts and an international boundary before reaching the Gulf. In Texas, its enormous basin, low watershed yield and compact-and-treaty rules make it a river unlike any other in the state.",
  { src: "/images/explore/lakes-rivers/amistad-national-recreation-area.jpg", alt: "Blue reservoir water and arid canyon landscape in the Rio Grande basin", width: 1600, height: 1067 },
  "https://www.twdb.texas.gov/surfacewater/rivers/river_basins/riogrande/",
  ["Rio Grande", "Rio Grande basin", "Texas Mexico border", "Amistad Reservoir", "Texas water", "TWDB"],
);

export const texasExplainedRiverProfileStubs: Article[] = [
  texasBrazosRiverGuideStub,
  texasColoradoRiverGuideStub,
  texasGuadalupeRiverGuideStub,
  texasTrinityRiverGuideStub,
  texasRioGrandeGuideStub,
];