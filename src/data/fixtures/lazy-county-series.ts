import type { Article } from "../types";
import { countySlugForLegacyArticle, loadCountySeriesArticle } from "../county-series";

const stub = (article: Omit<Article, "body" | "relatedCollections" | "relatedDestinations"> & Partial<Pick<Article, "relatedCollections" | "relatedDestinations">>): Article => ({
  ...article,
  body: [],
  relatedCollections: article.relatedCollections ?? [],
  relatedDestinations: article.relatedDestinations ?? [],
});

const andrewsStub = stub({
  id: "county-andrews-andrews-oil-shafter-lake", brandId: "texasdefined", slug: "andrews-county-andrews-oil-shafter-lake-texas",
  title: "Andrews County: Oil, Shafter Lake and the Courthouse Town That Won",
  dek: "Andrews County is a West Texas story of county-seat rivalry, drought, oil booms and a courthouse town that grew into one of the Permian Basin's durable communities.",
  category: "texas-history", region: "big-bend",
  hero: { src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Andrews_County_Courthouse,_Andrews,_Texas.jpg?width=1600", alt: "Andrews County Courthouse in Andrews, Texas", width: 1600, height: 1067, credit: "Nicolas Henderson · CC BY 2.0 · Wikimedia Commons" },
  authorId: "a-hollis", publishedAt: "2026-08-10", readingMinutes: 9,
  tags: ["Andrews County", "Andrews", "Shafter Lake", "Permian Basin", "oil", "Texas counties", "West Texas", "Texas history"], featured: false,
});

const ectorStub = stub({
  id: "county-ector-odessa-oil-stonehenge", brandId: "texasdefined", slug: "ector-county-odessa-oil-stonehenge-texas",
  title: "Ector County: Odessa, Oil, Stonehenge and a Meteor Crater",
  dek: "Ector County is a compact piece of West Texas where railroad settlement, Permian Basin oil, a prehistoric impact crater and Odessa's wonderfully improbable Stonehenge all share the same horizon.",
  category: "texas-history", region: "big-bend",
  hero: { src: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Stonehenge_at_University_of_Texas_at_the_Permian_Basin_Picture_1851.jpg", alt: "Stonehenge replica on the University of Texas Permian Basin campus in Odessa, Ector County, Texas", width: 2592, height: 1944, credit: "Billy Hathorn · CC BY-SA 3.0 · Wikimedia Commons" },
  authorId: "a-hollis", publishedAt: "2026-08-10", readingMinutes: 10,
  tags: ["Ector County", "Odessa", "Permian Basin", "oil", "Stonehenge", "Odessa Meteor Crater", "White-Pool House", "UT Permian Basin", "Texas counties", "West Texas", "Texas history"], featured: false,
});

const wardStub = stub({
  id: "county-ward-monahans-sandhills", brandId: "texasdefined", slug: "ward-county-monahans-sandhills-texas",
  title: "Ward County: Monahans, Moving Sand and the Oil Roads of West Texas",
  dek: "Ward County is a place where wind-built dunes, railroad water stops, Pecos River irrigation, bomber-base history and Permian Basin oil all occupy the same compact stretch of West Texas.",
  category: "texas-history", region: "big-bend",
  hero: { src: "https://tpwd.texas.gov/state-parks/monahans-sandhills/gallery/monahans_106.jpg", alt: "Wind-shaped dunes at Monahans Sandhills State Park in Ward County, Texas", width: 1200, height: 800, credit: "Texas Parks and Wildlife Department" },
  authorId: "a-marisol", publishedAt: "2026-08-10", readingMinutes: 10,
  tags: ["Ward County", "Monahans", "Monahans Sandhills State Park", "Pyote", "Barstow", "Permian Basin", "Texas counties", "West Texas", "Texas history"], featured: false,
});

const pecosStub = stub({
  id: "county-pecos-fort-stockton-comanche-springs", brandId: "texasdefined", slug: "pecos-county-fort-stockton-comanche-springs-texas",
  title: "Pecos County: Fort Stockton, Comanche Springs and a West Texas County Built at the Crossroads",
  dek: "Pecos County is where desert springs, military roads, ranching, irrigation and oil-field booms converged around Fort Stockton — a place whose history makes more sense when you follow the routes that crossed it.",
  category: "texas-history", region: "big-bend",
  hero: { src: "https://upload.wikimedia.org/wikipedia/commons/f/f2/Guardhouse_Fort_Stockon_Texas_2023.jpg", alt: "Historic guardhouse at Fort Stockton in Pecos County, Texas", width: 3556, height: 2000, credit: "Larry D. Moore · CC BY 4.0 · Wikimedia Commons" },
  authorId: "a-marisol", publishedAt: "2026-08-10", readingMinutes: 10,
  tags: ["Pecos County", "Fort Stockton", "Comanche Springs", "Fort Stockton history", "West Texas", "Trans-Pecos", "Texas counties", "Texas history", "ranching", "oil and gas"], featured: false,
});

const reevesStub = stub({
  id: "county-reeves-pecos-balmorhea", brandId: "texasdefined", slug: "reeves-county-pecos-balmorhea-texas",
  title: "Reeves County: Pecos, Balmorhea and the West Texas County Built Around Water",
  dek: "Reeves County is where the Pecos River, San Solomon Springs, railroad history, ranching, rodeo tradition and the modern energy economy meet — a Far West Texas county whose story makes more sense once you follow the water.",
  category: "texas-history", region: "big-bend",
  hero: { src: "/images/explore/major-springs/balmorhea-state-park.jpg", alt: "Spring-fed water and historic structures at Balmorhea State Park in Reeves County, Texas", width: 1600, height: 900, credit: "SHAWN VR · CC BY-SA 4.0 · Wikimedia Commons" },
  authorId: "a-marisol", publishedAt: "2026-08-09", readingMinutes: 10,
  tags: ["Reeves County", "Pecos", "Balmorhea", "San Solomon Springs", "Pecos River", "Texas rodeo", "Texas counties", "West Texas", "Texas history"], featured: false,
});

const brewsterStub = stub({
  id: "county-brewster-big-bend", brandId: "texasdefined", slug: "brewster-county-big-bend-texas",
  title: "Brewster County: The Texas County Bigger Than Some States",
  dek: "From Alpine's courthouse square to Terlingua and the Chisos Mountains, Brewster County packs desert geology, border history, ranching, mining and one of America's great national parks into the largest county in Texas.",
  category: "texas-history", region: "big-bend",
  hero: { src: "/images/explore/national-parks/big-bend-national-park.jpg", alt: "Big Bend National Park in Brewster County, Texas", width: 1600, height: 2133, credit: "Betty Alex (U.S. National Park Service) · Public domain · Wikimedia Commons" },
  authorId: "a-marisol", publishedAt: "2026-08-07", readingMinutes: 11,
  tags: ["Brewster County", "Big Bend", "Alpine", "Terlingua", "Texas counties", "West Texas", "Texas history"], featured: false,
});

const culbersonStub = stub({
  id: "county-culberson-van-horn-guadalupe-mountains", brandId: "texasdefined", slug: "culberson-county-van-horn-guadalupe-mountains-texas",
  title: "Culberson County: Van Horn, Guadalupe Peak and a West Texas Landscape Built on Distance",
  dek: "From the old railroad town of Van Horn to Texas' highest point, white gypsum dunes and the Guadalupe Mountains, Culberson County turns a remote stretch of Far West Texas into a story of trails, ranches, geology and persistence.",
  category: "texas-history", region: "big-bend",
  hero: { src: "/images/explore/national-parks/guadalupe-mountains-national-park.jpg", alt: "Guadalupe Mountains National Park in Culberson County, home of Guadalupe Peak", width: 1600, height: 1053, credit: "NPS photo · Public domain · Wikimedia Commons" },
  authorId: "a-marisol", publishedAt: "2026-08-08", readingMinutes: 10,
  tags: ["Culberson County", "Van Horn", "Guadalupe Mountains", "Guadalupe Peak", "Salt Basin", "Texas counties", "West Texas", "Texas history"], featured: false,
});

const elPasoStub = stub({
  id: "county-el-paso-pass-missions-borderlands", brandId: "texasdefined", slug: "el-paso-county-missions-rio-grande-texas",
  title: "El Paso County: The Pass, the Missions and a Texas Story Written on Both Sides of the Rio Grande",
  dek: "El Paso County is where Texas narrows into a mountain pass and opens into one of the oldest, most layered borderlands in the state — home to Ysleta del Sur, historic missions, Fort Bliss, the Franklin Mountains and a city shaped as much by Mexico as by Texas.",
  category: "texas-history", region: "big-bend",
  hero: { src: "/images/explore/historic-sites/chamizal-national-memorial.jpg", alt: "Chamizal National Memorial in El Paso County, Texas", width: 1600, height: 2134, credit: "GoneBefore · CC BY-SA 4.0 · Wikimedia Commons" },
  authorId: "a-marisol", publishedAt: "2026-08-08", readingMinutes: 11,
  tags: ["El Paso County", "El Paso", "Ysleta Mission", "Ysleta del Sur Pueblo", "Franklin Mountains", "Fort Bliss", "Chamizal", "Texas counties", "West Texas", "Texas history"], featured: false,
});

const hudspethStub = stub({
  id: "county-hudspeth-sierra-blanca-salt-flats", brandId: "texasdefined", slug: "hudspeth-county-sierra-blanca-salt-flats-texas",
  title: "Hudspeth County: Sierra Blanca, Salt Flats and the Texas Borderlands Between Two Mountain Worlds",
  dek: "From an adobe courthouse and a historic railroad junction to salt flats, desert bighorn country and Rio Grande communities, Hudspeth County is a vast piece of Far West Texas where transportation, water and the border have always shaped the map.",
  category: "texas-history", region: "big-bend",
  hero: { src: "https://texas-time-travel.imgix.net/images/A-Regional-Photos/Mountain/Mountain_Hudspeth-County-Courthouse.jpeg?auto=compress%2Cformat&fit=max&h=1080&q=80&w=1920", alt: "Hudspeth County Courthouse in Sierra Blanca, Texas", width: 1920, height: 1080, credit: "Texas Historical Commission · Texas Time Travel" },
  authorId: "a-marisol", publishedAt: "2026-08-08", readingMinutes: 10,
  tags: ["Hudspeth County", "Sierra Blanca", "Fort Hancock", "Dell City", "Salt Flats", "Sierra Diablo", "Texas counties", "West Texas", "Texas history"], featured: false,
});

const jeffDavisStub = stub({
  id: "county-jeff-davis-fort-davis-mountains", brandId: "texasdefined", slug: "jeff-davis-county-fort-davis-mountains-texas",
  title: "Jeff Davis County: Forts, Dark Skies and the Mountain Side of West Texas",
  dek: "Fort Davis, the Davis Mountains, McDonald Observatory and tiny Valentine make Jeff Davis County one of the clearest examples of how much history, science and scenery can fit inside a sparsely populated corner of Texas.",
  category: "texas-history", region: "big-bend",
  hero: { src: "/images/explore/historic-sites/fort-davis-national-historic-site.jpg", alt: "Fort Davis National Historic Site beneath the Davis Mountains in Jeff Davis County", width: 1600, height: 1067, credit: "National Park Service Digital Image Archives · Public domain · Wikimedia Commons" },
  authorId: "a-marisol", publishedAt: "2026-08-08", readingMinutes: 10,
  tags: ["Jeff Davis County", "Fort Davis", "Davis Mountains", "McDonald Observatory", "Valentine", "Buffalo Soldiers", "Texas counties", "West Texas", "Texas history"], featured: false,
});

const presidioStub = stub({
  id: "county-presidio-marfa-borderlands", brandId: "texasdefined", slug: "presidio-county-marfa-borderlands-texas",
  title: "Presidio County: Where Marfa, the Rio Grande and the Big Bend Borderlands Meet",
  dek: "Marfa may get the headlines, but Presidio County stretches far beyond its art-world reputation — across ranch country, volcanic mountains, an ancient river corridor and one of the oldest continuously inhabited corners of the Big Bend.",
  category: "texas-history", region: "big-bend",
  hero: { src: "/images/explore/historic-sites/fort-leaton-state-historic-site.jpg", alt: "Fort Leaton State Historic Site in Presidio County near the Rio Grande borderlands", width: 1600, height: 1068, credit: "Carol M. Highsmith · Public domain · Wikimedia Commons" },
  authorId: "a-marisol", publishedAt: "2026-08-08", readingMinutes: 10,
  tags: ["Presidio County", "Marfa", "Presidio", "Fort Leaton", "Texas counties", "Big Bend", "West Texas", "Texas history"], featured: false,
});

export const winklerCountyArticleStub = stub({
  id: "county-winkler-kermit-wink-oil", brandId: "texasdefined", slug: "winkler-county-kermit-wink-oil-texas",
  title: "Winkler County: Kermit, Wink and the Oil Boom at the New Mexico Line",
  dek: "Winkler County is where shifting sand, a once-dismissed oil field, a courthouse built for a boom and Roy Orbison's teenage years all meet on the western edge of the Permian Basin.",
  category: "texas-history", region: "big-bend",
  hero: { src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/County_courthouse_for_Winkler_County,_near_the_New_Mexico_line_in_far-west_Texas_LCCN2014630676.jpg?width=1600", alt: "Winkler County Courthouse in Kermit, Texas, photographed in 2014", width: 1600, height: 1068, credit: "Carol M. Highsmith · Library of Congress · Public domain · Wikimedia Commons" },
  authorId: "a-hollis", publishedAt: "2026-08-10", readingMinutes: 9,
  tags: ["Winkler County", "Kermit", "Wink", "Hendrick Field", "Roy Orbison", "Permian Basin", "Sand Hills", "Texas counties", "West Texas", "Texas history"], featured: false,
});

export const countySeriesArticleStubs: Article[] = [
  andrewsStub, ectorStub, wardStub, pecosStub, reevesStub,
  brewsterStub, culbersonStub, elPasoStub, hudspethStub, jeffDavisStub, presidioStub,
];
const stubSlugs = new Set([...countySeriesArticleStubs, winklerCountyArticleStub].map((article) => article.slug));

export async function loadCountySeriesArticleBySlug(brandId: string, slug: string): Promise<Article | null> {
  if (brandId !== "texasdefined" || !stubSlugs.has(slug)) return null;
  const countySlug = countySlugForLegacyArticle(slug);
  return countySlug ? loadCountySeriesArticle(countySlug) : null;
}
