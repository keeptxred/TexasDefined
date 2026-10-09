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
  { src: "/images/editorial/texas-guadalupe-river.jpg", alt: "Clear Guadalupe River flowing beneath mature cypress trees", width: 1600, height: 1115 },
  "https://www.twdb.texas.gov/surfacewater/rivers/river_basins/guadalupe/index.asp",
  ["Guadalupe River", "Guadalupe River basin", "Canyon Lake", "Texas Hill Country", "Texas springs", "TWDB"],
);

export const texasTrinityRiverGuideStub = riverStub(
  "texas-trinity-river-guide",
  "The Trinity River Explained: The River System Behind Dallas-Fort Worth",
  "The Trinity River basin is entirely inside Texas and sits beneath much of Dallas-Fort Worth's water story. Its forks, reservoirs and downstream exports connect a major metro area with the Gulf Coast.",
  { src: "/images/editorial/texas-trinity-river.jpg", alt: "Reservoir shoreline and open water in the upper Trinity River basin", width: 1600, height: 1067 },
  "https://www.twdb.texas.gov/surfacewater/rivers/river_basins/trinity/index.asp",
  ["Trinity River", "Trinity River basin", "Dallas Fort Worth water", "Texas rivers", "Texas reservoirs", "TWDB"],
);

export const texasRioGrandeGuideStub = riverStub(
  "texas-rio-grande-river-guide",
  "Rio Grande in Texas: River Guide, Big Bend, Reservoirs & Border History",
  "Follow the Rio Grande through Texas from El Paso and Big Bend to Amistad, Laredo, Falcon Reservoir and the Lower Rio Grande Valley, with river access, history, ecology and water-management context.",
  { src: "/images/explore/lakes-rivers/amistad-national-recreation-area.jpg", alt: "Blue reservoir water and arid canyon landscape in the Rio Grande basin", width: 1600, height: 1067 },
  "https://www.twdb.texas.gov/surfacewater/rivers/river_basins/riogrande/",
  ["Rio Grande", "Rio Grande Texas", "Big Bend", "Amistad Reservoir", "Falcon Reservoir", "Lower Rio Grande Valley", "Texas rivers", "Texas borderlands"],
);


export const texasPecosRiverGuideStub = riverStub(
  "texas-pecos-river-guide",
  "Pecos River in Texas: Desert Basin, Canyons & Rio Grande Guide",
  "Follow the Pecos through arid West Texas to Amistad and the Rio Grande, with desert hydrology, canyon geography, salinity, reservoirs and places to see the river.",
  { src: "/images/explore/historic-sites/seminole-canyon-state-park.jpg", alt: "Canyon country near the lower Pecos River in West Texas", width: 1600, height: 1067 },
  "https://www.twdb.texas.gov/surfacewater/rivers/river_basins/riogrande/",
  ["Pecos River", "West Texas rivers", "Lower Pecos", "Amistad", "Rio Grande basin", "Texas geography"],
);

export const texasSabineRiverGuideStub = riverStub(
  "texas-sabine-river-guide",
  "Sabine River in Texas: East Texas, Toledo Bend & Gulf Guide",
  "Understand the Sabine River from wet East Texas headwaters to Toledo Bend, the Louisiana boundary and Sabine Lake, with basin geography, reservoirs and public access.",
  { src: "/images/state-parks/lake-tawakoni-state-park.jpg", alt: "Lake Tawakoni in the upper Sabine River basin of East Texas", width: 1600, height: 1100 },
  "https://www.twdb.texas.gov/surfacewater/rivers/river_basins/sabine/index.asp",
  ["Sabine River", "Toledo Bend", "East Texas rivers", "Sabine basin", "Texas Louisiana border"],
);

export const texasNechesRiverGuideStub = riverStub(
  "texas-neches-river-guide",
  "Neches River in Texas: Big Thicket, Angelina & Bottomlands Guide",
  "Follow the Neches through Piney Woods bottomlands, the Angelina system, Sam Rayburn and Big Thicket to Sabine Lake, with ecology, reservoirs and public access.",
  { src: "/images/state-parks/village-creek-state-park.jpg", alt: "Forested East Texas waterway in the Neches River basin", width: 1600, height: 1200 },
  "https://www.twdb.texas.gov/surfacewater/rivers/river_basins/neches/index.asp",
  ["Neches River", "Big Thicket", "Angelina River", "East Texas rivers", "Neches basin"],
);

export const texasNuecesRiverGuideStub = riverStub(
  "texas-nueces-river-guide",
  "Nueces River in Texas: Headwaters, Choke Canyon & Coastal Bend",
  "Trace the Nueces from clear Edwards Plateau headwaters through dry South Texas to Choke Canyon, Lake Corpus Christi and Nueces Bay.",
  { src: "/images/state-parks/choke-canyon-calliham-unit-state-park.jpg", alt: "Choke Canyon reservoir landscape in the Nueces River basin", width: 1600, height: 900 },
  "https://www.twdb.texas.gov/surfacewater/rivers/river_basins/nueces/",
  ["Nueces River", "Choke Canyon", "South Texas rivers", "Nueces basin", "Coastal Bend"],
);

export const texasFrioRiverGuideStub = riverStub(
  "texas-frio-river-guide",
  "Frio River in Texas: Garner, Concan, Springs & Clear Water",
  "Explore the Frio River through Garner State Park and Concan, with spring-fed Hill Country geography, cypress corridors, flood risk and its place in the Nueces basin.",
  { src: "/images/state-parks/garner-state-park.jpg", alt: "The Frio River corridor at Garner State Park in Texas", width: 1600, height: 230 },
  "https://www.twdb.texas.gov/surfacewater/rivers/river_basins/nueces/",
  ["Frio River", "Garner State Park", "Concan", "Hill Country rivers", "Nueces basin"],
);

export const texasSanAntonioRiverGuideStub = riverStub(
  "texas-san-antonio-river-guide",
  "San Antonio River: Headwaters, River Walk, Missions & Lower Basin",
  "Follow the San Antonio River from spring-fed headwaters through downtown, the missions and rural South Texas to its confluence with the Guadalupe.",
  { src: "/images/editorial/moving/san-antonio.jpg", alt: "The San Antonio River through the River Walk in downtown San Antonio", width: 1600, height: 900 },
  "https://www.twdb.texas.gov/surfacewater/rivers/river_basins/sanantonio/",
  ["San Antonio River", "River Walk", "San Antonio Missions", "Bexar County", "Texas rivers"],
);

export const texasRedRiverGuideStub = riverStub(
  "texas-red-river-guide",
  "Red River in Texas: Oklahoma Boundary, Plains & Lake Texoma",
  "Follow the Red River along North Texas with its sediment-rich water, prairie tributaries, Lake Texoma, interstate compact and Mississippi-system connection.",
  { src: "/images/state-parks/copper-breaks-state-park.jpg", alt: "Rolling Plains landscape in the Red River basin of North Texas", width: 1600, height: 900 },
  "https://www.twdb.texas.gov/surfacewater/rivers/river_basins/red/index.asp",
  ["Red River Texas", "Lake Texoma", "Texas Oklahoma border", "North Texas rivers", "Red River basin"],
);

export const texasCanadianRiverGuideStub = riverStub(
  "texas-canadian-river-guide",
  "Canadian River in Texas: Panhandle Breaks, Lake Meredith & High Plains",
  "Trace the Canadian River across the Texas Panhandle from High Plains breaks to Lake Meredith, with drought, Ogallala context, canyon geography and interstate water management.",
  { src: "/images/explore/lakes-rivers/lake-meredith-national-recreation-area.jpg", alt: "Lake Meredith and Canadian River canyon country in the Texas Panhandle", width: 1600, height: 2979 },
  "https://www.twdb.texas.gov/surfacewater/rivers/river_basins/canadian/index.asp",
  ["Canadian River Texas", "Lake Meredith", "Texas Panhandle", "High Plains", "Canadian River basin"],
);

export const texasExplainedRiverProfileStubs: Article[] = [
  texasBrazosRiverGuideStub,
  texasColoradoRiverGuideStub,
  texasGuadalupeRiverGuideStub,
  texasTrinityRiverGuideStub,
  texasRioGrandeGuideStub,
  texasPecosRiverGuideStub,
  texasSabineRiverGuideStub,
  texasNechesRiverGuideStub,
  texasNuecesRiverGuideStub,
  texasFrioRiverGuideStub,
  texasSanAntonioRiverGuideStub,
  texasRedRiverGuideStub,
  texasCanadianRiverGuideStub,
];