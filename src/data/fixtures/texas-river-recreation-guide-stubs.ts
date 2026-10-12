import type { Article } from "../types";

// Lightweight listing records. Full guides are dynamically imported only when requested.
const records = [
  {
    "slug": "texas-frio-river-guide",
    "title": "Frio River, Texas: Garner, Concan, Swimming, Tubing, Camping & Fishing",
    "dek": "A river-by-river planning guide to the clear upper Frio around Leakey, Concan and Garner State Park, with legal access, water conditions, campsite choices and lower-basin context.",
    "src": "/images/state-parks/garner-state-park.jpg",
    "alt": "Garner State Park on the upper Frio River in the Texas Hill Country",
    "source": "https://tpwd.texas.gov/state-parks/garner",
    "name": "Frio River"
  },
  {
    "slug": "texas-comal-river-guide",
    "title": "Comal River, New Braunfels: Tubing, Parks, Access, Rules & Visitor Guide",
    "dek": "A practical New Braunfels Comal River guide distinguishing its short spring-fed municipal float corridor from the Guadalupe, with official access, local rules, conservation and nearby stays.",
    "src": "/images/editorial/texas-river-basins.jpg",
    "alt": "Illustrated map of Texas river basins; a Comal River field photograph is pending licensed verification",
    "source": "https://www.nbtexas.org/",
    "name": "Comal River"
  },
  {
    "slug": "texas-san-marcos-river-guide",
    "title": "San Marcos River: Springs, River Parks, Tubing, Paddling & Wildlife",
    "dek": "A visitor guide from the protected spring-fed headwaters and urban river parks of San Marcos to the lower paddling reaches near Luling, including city rules, access, angling and camping alternatives.",
    "src": "/images/editorial/texas-river-basins.jpg",
    "alt": "Illustrated Texas river basin overview; replace with a rights-verified San Marcos River image",
    "source": "https://www.visitsanmarcos.com/san-marcos-river/",
    "name": "San Marcos River"
  },
  {
    "slug": "texas-llano-river-guide",
    "title": "Llano River, Texas: South Llano, Junction, Castell, Fishing, Paddling & Camping",
    "dek": "Compare the North and South Llano branches, Junction and South Llano River State Park with the main Llano near Mason, Llano and Kingsland; plan verified fishing, paddling and overnight visits.",
    "src": "/images/explore/lakes-rivers/south-llano-river-state-park.jpg",
    "alt": "South Llano River State Park and the Llano River watershed",
    "source": "https://tpwd.texas.gov/state-parks/south-llano-river",
    "name": "Llano River"
  },
  {
    "slug": "texas-pecos-river-guide",
    "title": "Pecos River in Texas: Canyon History, Public Access, Fishing & Desert Travel",
    "dek": "An evidence-led West Texas Pecos River guide from the New Mexico line through remote desert country to the Rio Grande and Amistad, with realistic access expectations, conservation and historical places.",
    "src": "/images/explore/lakes-rivers/amistad-national-recreation-area.jpg",
    "alt": "Amistad National Recreation Area near the Pecos and Rio Grande canyon country",
    "source": "https://www.nps.gov/amis/index.htm",
    "name": "Pecos River"
  }
] as const;
export const texasRiverRecreationGuideStubs: Article[] = records.map((item) => ({
 id: "evergreen-" + item.slug, brandId: "texasdefined", slug: item.slug,
 title: item.title, dek: item.dek, category: "lakes-rivers",
 hero: { src: item.src, alt: item.alt, width: 1600, height: 1067 },
 authorId: "a-marisol", publishedAt: "2026-10-12", updatedAt: "2026-10-12", readingMinutes: 11,
 tags: [item.name, "Texas rivers", "river access", "fishing", "camping", "river tourism"],
 featured: false, sourceName: "Primary river operator / TPWD", sourceUrl: item.source,
 body: [], relatedCollections: [], relatedDestinations: [],
}));
