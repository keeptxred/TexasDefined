import type { Article } from "../types";

const riverStub = (
  slug: string,
  title: string,
  dek: string,
  hero: Article["hero"],
  sourceUrl: string,
  tags: string[],
  readingMinutes: number,
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
  updatedAt: "2026-10-05",
  readingMinutes,
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
  "Brazos River Guide: History, Reservoirs, Fishing & Places to Visit",
  "Follow the Brazos from its West Texas forks to the Gulf, with major reservoirs, tributaries, wildlife, history, recreation, floodplain geography and the best places to experience the river.",
  { src: "/images/explore/lakes-rivers/lake-somerville-birch-creek-unit.jpg", alt: "Open water and wooded shoreline in the Brazos River basin", width: 1600, height: 1067 },
  "https://www.twdb.texas.gov/surfacewater/rivers/river_basins/brazos/index.asp",
  ["Brazos River", "Brazos River basin", "Texas rivers", "Texas water", "Texas geography", "TWDB"],
  22,
);

export const texasColoradoRiverGuideStub = riverStub(
  "texas-colorado-river-guide",
  "Texas Colorado River Guide: Highland Lakes, Austin, History & Things to Do",
  "Follow Texas' Colorado River from West Texas through the Highland Lakes and Austin to Matagorda Bay, with reservoirs, tributaries, recreation, ecology, flood history and places to visit.",
  { src: "/images/explore/lakes-rivers/pedernales-falls-state-park.jpg", alt: "Limestone river channel and flowing water in the Colorado River basin", width: 1600, height: 1067 },
  "https://www.twdb.texas.gov/surfacewater/rivers/river_basins/colorado/",
  ["Colorado River Texas", "Colorado River basin", "Highland Lakes", "Texas rivers", "Austin water", "TWDB"],
  20,
);

export const texasGuadalupeRiverGuideStub = riverStub(
  "texas-guadalupe-river-guide",
  "Guadalupe River Guide: Hill Country, Canyon Lake, Tubing, Fishing & History",
  "Follow the Guadalupe from Kerr County springs and cypress-lined Hill Country reaches through Canyon Lake, New Braunfels, Seguin and the coastal plain to San Antonio Bay.",
  { src: "/images/editorial/texas-guadalupe-river.jpg", alt: "Clear Guadalupe River flowing beneath mature cypress trees", width: 1600, height: 1115 },
  "https://www.twdb.texas.gov/surfacewater/rivers/river_basins/guadalupe/index.asp",
  ["Guadalupe River", "Guadalupe River basin", "Canyon Lake", "Texas Hill Country", "Texas springs", "TWDB"],
  20,
);

export const texasTrinityRiverGuideStub = riverStub(
  "texas-trinity-river-guide",
  "Trinity River Guide: Dallas-Fort Worth, Reservoirs, Wildlife & Gulf Coast",
  "Follow the Trinity River system from its North Texas forks through Dallas-Fort Worth, East Texas reservoirs and bottomland forests to Trinity Bay, with water supply, flooding, recreation and history.",
  { src: "/images/editorial/texas-trinity-river.jpg", alt: "Reservoir shoreline and open water in the upper Trinity River basin", width: 1600, height: 1067 },
  "https://www.twdb.texas.gov/surfacewater/rivers/river_basins/trinity/index.asp",
  ["Trinity River", "Trinity River basin", "Dallas Fort Worth water", "Texas rivers", "Texas reservoirs", "TWDB"],
  20,
);

export const texasRioGrandeGuideStub = riverStub(
  "texas-rio-grande-river-guide",
  "Rio Grande in Texas: River Guide, Big Bend, Reservoirs & Border History",
  "Follow the Rio Grande through Texas from El Paso and Big Bend to Amistad, Laredo, Falcon Reservoir and the Lower Rio Grande Valley, with river access, history, ecology and water-management context.",
  { src: "/images/explore/lakes-rivers/amistad-national-recreation-area.jpg", alt: "Blue reservoir water and arid canyon landscape in the Rio Grande basin", width: 1600, height: 1067 },
  "https://www.twdb.texas.gov/surfacewater/rivers/river_basins/riogrande/",
  ["Rio Grande", "Rio Grande Texas", "Big Bend", "Amistad Reservoir", "Falcon Reservoir", "Lower Rio Grande Valley", "Texas rivers", "Texas borderlands"],
  24,
);

export const texasExplainedRiverProfileStubs: Article[] = [
  texasBrazosRiverGuideStub,
  texasColoradoRiverGuideStub,
  texasGuadalupeRiverGuideStub,
  texasTrinityRiverGuideStub,
  texasRioGrandeGuideStub,
];