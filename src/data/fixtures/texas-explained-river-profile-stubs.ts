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
  {"src":"https://commons.wikimedia.org/wiki/Special:Redirect/file/Brazos_River_at_Washington_on_the_Brazos.jpg?width=1600","alt":"The Brazos River at Washington-on-the-Brazos State Historic Site in Washington County, Texas","width":1600,"height":900,"credit":"Larry D. Moore · CC BY 4.0 · Wikimedia Commons · https://commons.wikimedia.org/wiki/File:Brazos_River_at_Washington_on_the_Brazos.jpg · License: https://creativecommons.org/licenses/by/4.0/"},
  "https://www.twdb.texas.gov/surfacewater/rivers/river_basins/brazos/index.asp",
  ["Brazos River", "Brazos River basin", "Texas rivers", "Texas water", "Texas geography", "TWDB"],
);

export const texasColoradoRiverGuideStub = riverStub(
  "texas-colorado-river-guide",
  "The Colorado River Explained: The Texas River That Runs Through Austin",
  "Texas' Colorado River begins far west of Austin and runs entirely within the state to Matagorda Bay. Its long, relatively dry basin and chain of reservoirs show why river length and water yield are not the same thing.",
  {"src":"https://commons.wikimedia.org/wiki/Special:Redirect/file/Colorado_River_at_Smithville_Texas_2026.jpg?width=1600","alt":"Colorado River passing beneath the Loop 230 bridge at Smithville, Texas, photographed September 2026","width":1600,"height":1067,"credit":"Larry D. Moore · CC BY 4.0 · Wikimedia Commons · https://commons.wikimedia.org/wiki/File:Colorado_River_at_Smithville_Texas_2026.jpg · License: https://creativecommons.org/licenses/by/4.0/"},
  "https://www.twdb.texas.gov/surfacewater/rivers/river_basins/colorado/",
  ["Colorado River Texas", "Colorado River basin", "Highland Lakes", "Texas rivers", "Austin water", "TWDB"],
);

export const texasGuadalupeRiverGuideStub = riverStub(
  "texas-guadalupe-river-guide",
  "The Guadalupe River Explained: Springs, Canyon Lake and a Hill Country River",
  "The Guadalupe begins in the Hill Country, receives important spring-fed tributaries and flows toward San Antonio Bay. Its basin makes the groundwater-surface-water connection unusually easy to see.",
  {"src":"https://commons.wikimedia.org/wiki/Special:Redirect/file/Guadalupe_River_of_Texas_IMG_0500.JPG?width=1600","alt":"The Guadalupe River at New Braunfels, Texas, photographed in May 2009","width":1600,"height":1200,"credit":"Billy Hathorn · CC BY-SA 3.0 · Wikimedia Commons · https://commons.wikimedia.org/wiki/File:Guadalupe_River_of_Texas_IMG_0500.JPG · License: https://creativecommons.org/licenses/by-sa/3.0/"},
  "https://www.twdb.texas.gov/surfacewater/rivers/river_basins/guadalupe/index.asp",
  ["Guadalupe River", "Guadalupe River basin", "Canyon Lake", "Texas Hill Country", "Texas springs", "TWDB"],
);

export const texasTrinityRiverGuideStub = riverStub(
  "texas-trinity-river-guide",
  "The Trinity River Explained: The River System Behind Dallas-Fort Worth",
  "The Trinity River basin is entirely inside Texas and sits beneath much of Dallas-Fort Worth's water story. Its forks, reservoirs and downstream exports connect a major metro area with the Gulf Coast.",
  {"src":"https://commons.wikimedia.org/wiki/Special:Redirect/file/Trinity-River-Dallas-TX-4667.jpg?width=1600","alt":"The Trinity River flowing past downtown Dallas, Texas","width":1600,"height":900,"credit":"Loadmaster (David R. Tribble) · CC BY-SA 3.0 · Wikimedia Commons · https://commons.wikimedia.org/wiki/File:Trinity-River-Dallas-TX-4667.jpg · License: https://creativecommons.org/licenses/by-sa/3.0/"},
  "https://www.twdb.texas.gov/surfacewater/rivers/river_basins/trinity/index.asp",
  ["Trinity River", "Trinity River basin", "Dallas Fort Worth water", "Texas rivers", "Texas reservoirs", "TWDB"],
);

export const texasRioGrandeGuideStub = riverStub(
  "texas-rio-grande-river-guide",
  "Rio Grande in Texas: River Guide, Big Bend, Reservoirs & Border History",
  "Follow the Rio Grande through Texas from El Paso and Big Bend to Amistad, Laredo, Falcon Reservoir and the Lower Rio Grande Valley, with river access, history, ecology and water-management context.",
  {"src":"https://commons.wikimedia.org/wiki/Special:Redirect/file/Big_Bend_Rio_Grande.jpg?width=1600","alt":"The Rio Grande near Santa Elena Canyon in Big Bend National Park, Texas","width":1600,"height":1067,"credit":"Adbar · CC BY-SA 3.0 · Wikimedia Commons · https://commons.wikimedia.org/wiki/File:Big_Bend_Rio_Grande.jpg · License: https://creativecommons.org/licenses/by-sa/3.0/"},
  "https://www.twdb.texas.gov/surfacewater/rivers/river_basins/riogrande/",
  ["Rio Grande", "Rio Grande Texas", "Big Bend", "Amistad Reservoir", "Falcon Reservoir", "Lower Rio Grande Valley", "Texas rivers", "Texas borderlands"],
);

export const texasExplainedRiverProfileStubs: Article[] = [
  texasBrazosRiverGuideStub,
  texasColoradoRiverGuideStub,
  texasGuadalupeRiverGuideStub,
  texasTrinityRiverGuideStub,
  texasRioGrandeGuideStub,
];