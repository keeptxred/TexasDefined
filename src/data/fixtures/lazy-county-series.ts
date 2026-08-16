import type { Article } from "../types";
import { countySlugForLegacyArticle, loadCountySeriesArticle } from "../county-series";

const andrewsStub: Article = {
  id: "county-andrews-andrews-oil-shafter-lake",
  brandId: "texasdefined",
  slug: "andrews-county-andrews-oil-shafter-lake-texas",
  title: "Andrews County: Oil, Shafter Lake and the Courthouse Town That Won",
  dek: "Andrews County is a West Texas story of county-seat rivalry, drought, oil booms and a courthouse town that grew into one of the Permian Basin's durable communities.",
  category: "texas-history",
  region: "big-bend",
  hero: { src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Andrews_County_Courthouse,_Andrews,_Texas.jpg?width=1600", alt: "Andrews County Courthouse in Andrews, Texas", width: 1600, height: 1067, credit: "Nicolas Henderson · CC BY 2.0 · Wikimedia Commons" },
  authorId: "a-hollis",
  publishedAt: "2026-08-10",
  readingMinutes: 9,
  tags: ["Andrews County", "Andrews", "Shafter Lake", "Permian Basin", "oil", "Texas counties", "West Texas", "Texas history"],
  featured: false,
  body: [], relatedCollections: [], relatedDestinations: [],
};

const ectorStub: Article = {
  id: "county-ector-odessa-oil-stonehenge",
  brandId: "texasdefined",
  slug: "ector-county-odessa-oil-stonehenge-texas",
  title: "Ector County: Odessa, Oil, Stonehenge and a Meteor Crater",
  dek: "Ector County is a compact piece of West Texas where railroad settlement, Permian Basin oil, a prehistoric impact crater and Odessa's wonderfully improbable Stonehenge all share the same horizon.",
  category: "texas-history",
  region: "big-bend",
  hero: { src: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Stonehenge_at_University_of_Texas_at_the_Permian_Basin_Picture_1851.jpg", alt: "Stonehenge replica on the University of Texas Permian Basin campus in Odessa, Ector County, Texas", width: 2592, height: 1944, credit: "Billy Hathorn · CC BY-SA 3.0 · Wikimedia Commons" },
  authorId: "a-hollis",
  publishedAt: "2026-08-10",
  readingMinutes: 10,
  tags: ["Ector County", "Odessa", "Permian Basin", "oil", "Stonehenge", "Odessa Meteor Crater", "White-Pool House", "UT Permian Basin", "Texas counties", "West Texas", "Texas history"],
  featured: false,
  body: [], relatedCollections: [], relatedDestinations: [],
};

const wardStub: Article = {
  id: "county-ward-monahans-sandhills",
  brandId: "texasdefined",
  slug: "ward-county-monahans-sandhills-texas",
  title: "Ward County: Monahans, Moving Sand and the Oil Roads of West Texas",
  dek: "Ward County is a place where wind-built dunes, railroad water stops, Pecos River irrigation, bomber-base history and Permian Basin oil all occupy the same compact stretch of West Texas.",
  category: "texas-history",
  region: "big-bend",
  hero: { src: "https://tpwd.texas.gov/state-parks/monahans-sandhills/gallery/monahans_106.jpg", alt: "Wind-shaped dunes at Monahans Sandhills State Park in Ward County, Texas", width: 1200, height: 800, credit: "Texas Parks and Wildlife Department" },
  authorId: "a-marisol",
  publishedAt: "2026-08-10",
  readingMinutes: 10,
  tags: ["Ward County", "Monahans", "Monahans Sandhills State Park", "Pyote", "Barstow", "Permian Basin", "Texas counties", "West Texas", "Texas history"],
  featured: false,
  body: [], relatedCollections: [], relatedDestinations: [],
};

const pecosStub: Article = {
  id: "county-pecos-fort-stockton-comanche-springs",
  brandId: "texasdefined",
  slug: "pecos-county-fort-stockton-comanche-springs-texas",
  title: "Pecos County: Fort Stockton, Comanche Springs and a West Texas County Built at the Crossroads",
  dek: "Pecos County is where desert springs, military roads, ranching, irrigation and oil-field booms converged around Fort Stockton — a place whose history makes more sense when you follow the routes that crossed it.",
  category: "texas-history",
  region: "big-bend",
  hero: { src: "https://upload.wikimedia.org/wikipedia/commons/f/f2/Guardhouse_Fort_Stockon_Texas_2023.jpg", alt: "Historic guardhouse at Fort Stockton in Pecos County, Texas", width: 3556, height: 2000, credit: "Larry D. Moore · CC BY 4.0 · Wikimedia Commons" },
  authorId: "a-marisol",
  publishedAt: "2026-08-10",
  readingMinutes: 10,
  tags: ["Pecos County", "Fort Stockton", "Comanche Springs", "Fort Stockton history", "West Texas", "Trans-Pecos", "Texas counties", "Texas history", "ranching", "oil and gas"],
  featured: false,
  body: [], relatedCollections: [], relatedDestinations: [],
};

const reevesStub: Article = {
  id: "county-reeves-pecos-balmorhea",
  brandId: "texasdefined",
  slug: "reeves-county-pecos-balmorhea-texas",
  title: "Reeves County: Pecos, Balmorhea and the West Texas County Built Around Water",
  dek: "Reeves County is where the Pecos River, San Solomon Springs, railroad history, ranching, rodeo tradition and the modern energy economy meet — a Far West Texas county whose story makes more sense once you follow the water.",
  category: "texas-history",
  region: "big-bend",
  hero: { src: "/images/explore/major-springs/balmorhea-state-park.jpg", alt: "Spring-fed water and historic structures at Balmorhea State Park in Reeves County, Texas", width: 1600, height: 900, credit: "SHAWN VR · CC BY-SA 4.0 · Wikimedia Commons" },
  authorId: "a-marisol",
  publishedAt: "2026-08-09",
  readingMinutes: 10,
  tags: ["Reeves County", "Pecos", "Balmorhea", "San Solomon Springs", "Pecos River", "Texas rodeo", "Texas counties", "West Texas", "Texas history"],
  featured: false,
  body: [], relatedCollections: [], relatedDestinations: [],
};

export const countySeriesArticleStubs: Article[] = [andrewsStub, ectorStub, wardStub, pecosStub, reevesStub];
const stubSlugs = new Set(countySeriesArticleStubs.map((article) => article.slug));

export async function loadCountySeriesArticleBySlug(brandId: string, slug: string): Promise<Article | null> {
  if (brandId !== "texasdefined" || !stubSlugs.has(slug)) return null;
  const countySlug = countySlugForLegacyArticle(slug);
  return countySlug ? loadCountySeriesArticle(countySlug) : null;
}
