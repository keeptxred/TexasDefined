import type { Article } from "../types";

// Lightweight listing records. Full guides are dynamically imported only when requested.
const records = [
  {
    "slug": "texas-frio-river-guide",
    "title": "Frio River, Texas: Garner, Concan, Swimming, Tubing, Camping & Fishing",
    "dek": "A river-by-river planning guide to the clear upper Frio around Leakey, Concan and Garner State Park, with legal access, water conditions, campsite choices and lower-basin context.",
    "src": "https://upload.wikimedia.org/wikipedia/commons/7/7b/Garner_state_park.jpg",
    "alt": "Frio River winding through Garner State Park as seen from Old Baldy in Uvalde County",
    "credit": "Larry D. Moore · CC BY 4.0 · Wikimedia Commons · https://commons.wikimedia.org/wiki/File:Garner_state_park.jpg · License: https://creativecommons.org/licenses/by/4.0/",
    "width": 1600,
    "height": 1200,
    "source": "https://tpwd.texas.gov/state-parks/garner",
    "name": "Frio River"
  },
  {
    "slug": "texas-comal-river-guide",
    "title": "Comal River, New Braunfels: Tubing, Parks, Access, Rules & Visitor Guide",
    "dek": "A practical New Braunfels Comal River guide distinguishing its short spring-fed municipal float corridor from the Guadalupe, with official access, local rules, conservation and nearby stays.",
    "src": "https://upload.wikimedia.org/wikipedia/commons/b/ba/Comal_River_in_Landa_Park.jpg",
    "alt": "Comal River flowing through Landa Park in New Braunfels, Texas",
    "credit": "Larry D. Moore · CC BY 4.0 · Wikimedia Commons · https://commons.wikimedia.org/wiki/File:Comal_River_in_Landa_Park.jpg · License: https://creativecommons.org/licenses/by/4.0/",
    "width": 1801,
    "height": 1201,
    "source": "https://www.newbraunfels.gov/comalriver",
    "name": "Comal River"
  },
  {
    "slug": "texas-san-marcos-river-guide",
    "title": "San Marcos River: Springs, River Parks, Tubing, Paddling & Wildlife",
    "dek": "A visitor guide from the protected spring-fed headwaters and urban river parks of San Marcos to the lower paddling reaches near Luling, including city rules, access, angling and camping alternatives.",
    "src": "https://upload.wikimedia.org/wikipedia/commons/4/45/San_Marcos_River_San_Marcos_Texas_2023.jpg",
    "alt": "San Marcos River at San Marcos with people enjoying the water in August 2023",
    "credit": "Larry D. Moore · CC BY 4.0 · Wikimedia Commons · https://commons.wikimedia.org/wiki/File:San_Marcos_River_San_Marcos_Texas_2023.jpg · License: https://creativecommons.org/licenses/by/4.0/",
    "width": 3556,
    "height": 2000,
    "source": "https://www.visitsanmarcos.com/san-marcos-river/",
    "name": "San Marcos River"
  },
  {
    "slug": "texas-llano-river-guide",
    "title": "Llano River, Texas: South Llano, Junction, Castell, Fishing, Paddling & Camping",
    "dek": "Compare the North and South Llano branches, Junction and South Llano River State Park with the main Llano near Mason, Llano and Kingsland; plan verified fishing, paddling and overnight visits.",
    "src": "https://upload.wikimedia.org/wikipedia/commons/8/83/Llano_River_in_Junction%2C_TX_IMG_4345.JPG",
    "alt": "Llano River in the riverside park at Junction, Texas",
    "credit": "Billy Hathorn · CC BY-SA 3.0 · Wikimedia Commons · https://commons.wikimedia.org/wiki/File:Llano_River_in_Junction,_TX_IMG_4345.JPG · License: https://creativecommons.org/licenses/by-sa/3.0/",
    "width": 1600,
    "height": 1200,
    "source": "https://tpwd.texas.gov/state-parks/south-llano-river",
    "name": "Llano River"
  },
  {
    "slug": "texas-pecos-river-guide",
    "title": "Pecos River in Texas: Canyon History, Public Access, Fishing & Desert Travel",
    "dek": "An evidence-led West Texas Pecos River guide from the New Mexico line through remote desert country to the Rio Grande and Amistad, with realistic access expectations, conservation and historical places.",
    "src": "https://upload.wikimedia.org/wikipedia/commons/3/3e/Pecos_River.jpg",
    "alt": "Pecos River in the Lower Pecos canyon of Texas, photographed in 2005",
    "credit": "Badener / Lutz Fischer-Lamprecht · CC BY-SA 3.0 · Wikimedia Commons · https://commons.wikimedia.org/wiki/File:Pecos_River.jpg · License: https://creativecommons.org/licenses/by-sa/3.0/",
    "width": 2048,
    "height": 1536,
    "source": "https://www.nps.gov/amis/index.htm",
    "name": "Pecos River"
  }
] as const;
export const texasRiverRecreationGuideStubs: Article[] = records.map((item) => ({
 id: "evergreen-" + item.slug, brandId: "texasdefined", slug: item.slug,
 title: item.title, dek: item.dek, category: "lakes-rivers",
 hero: { src: item.src, alt: item.alt, width: item.width, height: item.height, credit: item.credit },
 authorId: "a-marisol", publishedAt: "2026-10-12", updatedAt: "2026-10-12", readingMinutes: 11,
 tags: [item.name, "Texas rivers", "river access", "fishing", "camping", "river tourism"],
 featured: false, sourceName: "Primary river operator / TPWD", sourceUrl: item.source,
 body: [], relatedCollections: [], relatedDestinations: [],
}));
