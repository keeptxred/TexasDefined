import { stateParkHeroMap } from "../state-park-hero-map";
import type { ImageRef } from "../types";

export type GuideFact = { label: string; value: string; sourceUrl: string; verifiedAt: string };
export type GuidePhoto = { image: ImageRef; sourceUrl: string; licenseUrl: string; exactSubject: string; status: "item-verified" | "governed-local" };
export type GuideEvidence = { facts: GuideFact[]; photos: GuidePhoto[]; relevantDestinationSlugs: string[]; reviewDate: string };
const REVIEWED_AT = "2026-10-12";
const photoFromPark = (slug: string): GuidePhoto => {
  const image = stateParkHeroMap[slug];
  if (!image || !/(CC BY|Public domain)/i.test(image.credit ?? "")) throw new Error("State-park photo missing usable license: " + slug);
  const licenseName = image.credit ?? "";
  const match = licenseName.match(/CC BY(?:-SA)? (\d\.\d)/);
  const licenseUrl = match
    ? `https://creativecommons.org/licenses/${licenseName.includes("CC BY-SA") ? "by-sa" : "by"}/${match[1]}/`
    : "https://commons.wikimedia.org/wiki/Commons:Public_domain";
  return { image, sourceUrl: "https://commons.wikimedia.org/", licenseUrl, exactSubject: slug, status: "governed-local" };
};
const commons = (filename: string, creator: string, license: string, width: number, height: number): GuidePhoto => {
  const sourceUrl = `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(filename).replace(/%20/g, "_")}`;
  const src = `https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(filename)}?width=1600`;
  const type = license.startsWith("CC BY-SA") ? "by-sa" : "by";
  const version = license.match(/\d\.\d/)?.[0];
  if (!version) throw new Error("Unrecognized Commons license: " + license);
  return {
    image: { src, alt: filename.replace(/\.[^.]+$/, "").replace(/[-_]/g, " "), width: 1600, height: Math.round(height * 1600 / width), credit: `${creator} · ${license} · Wikimedia Commons` },
    sourceUrl, licenseUrl: `https://creativecommons.org/licenses/${type}/${version}/`,
    exactSubject: filename, status: "item-verified",
  };
};
const facts: Record<number, [string,string,string][]> = {
  "106": [
    [
      "Lake Fork surface area",
      "27,264 acres",
      "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/fork/"
    ],
    [
      "Lake Texoma surface area",
      "74,686 acres; maximum depth 100 feet",
      "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/texoma/"
    ],
    [
      "Lake Conroe surface area",
      "20,118 acres; impounded in 1973",
      "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/conroe/"
    ]
  ],
  "107": [
    [
      "Palo Duro Juniper electric sites",
      "18 sites, with 30/50-amp hookup choices",
      "https://tpwd.texas.gov/state-parks/palo-duro-canyon/fees-facilities/campsites"
    ],
    [
      "Palo Duro Mesquite/Sagebrush electric sites",
      "47 sites; some sites accommodate RVs up to 60 feet",
      "https://tpwd.texas.gov/state-parks/palo-duro-canyon/fees-facilities/campsites"
    ],
    [
      "Palo Duro Hackberry electric sites",
      "32 sites; 20/30-amp service listed for this loop",
      "https://tpwd.texas.gov/state-parks/palo-duro-canyon/fees-facilities/campsites"
    ]
  ],
  "108": [
    [
      "Fredericksburg museum anchor",
      "National Museum of the Pacific War is in Fredericksburg",
      "https://www.pacificwarmuseum.org/"
    ],
    [
      "Small-town heritage network",
      "Texas Historical Commission manages 42 state historic sites across Texas",
      "https://thc.texas.gov/historic-sites"
    ],
    [
      "Canton as nearby shopping detour",
      "First Monday Trade Days is held Thursday through Sunday before each month's first Monday",
      "https://www.firstmondaycanton.com/frequently-asked-questions"
    ]
  ],
  "109": [
    [
      "Palo Duro developed electric inventory",
      "18 Juniper + 47 Mesquite/Sagebrush + 32 Hackberry sites; 97 individual electric sites across those three categories",
      "https://tpwd.texas.gov/state-parks/palo-duro-canyon/fees-facilities/campsites"
    ],
    [
      "Palo Duro drive-up tent option",
      "18 Fortress Cliff campsites are tent-only; no RVs or travel trailers",
      "https://tpwd.texas.gov/state-parks/palo-duro-canyon/fees-facilities/campsites"
    ],
    [
      "Garner river and trail extent",
      "2.9 miles of Frio River within 1,774 park acres; 16 miles of hiking trails",
      "https://tpwd.texas.gov/state-parks/garner"
    ]
  ],
  "110": [
    [
      "Inks Lake trail mileage",
      "9 miles of hiking trails; swimming is permitted but no lifeguards are on duty",
      "https://tpwd.texas.gov/state-parks/inks-lake"
    ],
    [
      "Devil's Waterhole route",
      "0.2-mile nature trail; the Waterhole lies where Spring Creek and Inks Lake meet",
      "https://tpwd.texas.gov/state-parks/inks-lake/trails-info/"
    ],
    [
      "Lake Meredith designated swim area",
      "Spring Canyon Swim Beach is the designated swimming area; other sections have restrictions",
      "https://www.nps.gov/lamr/planyourvisit"
    ]
  ],
  "111": [
    [
      "Guadalupe River State Park frontage",
      "4 miles of Guadalupe River frontage; the park permits tubing subject to conditions",
      "https://tpwd.texas.gov/state-parks/guadalupe-river"
    ],
    [
      "Garner's Frio River stretch",
      "2.9 miles of Frio River wind through Garner State Park",
      "https://tpwd.texas.gov/state-parks/garner"
    ],
    [
      "Garner non-water alternative",
      "16 miles of park trails; useful when the river cannot safely be floated",
      "https://tpwd.texas.gov/state-parks/garner"
    ]
  ],
  "112": [
    [
      "First Monday Trade Days schedule",
      "Thursday through Sunday before the first Monday of each month",
      "https://www.firstmondaycanton.com/frequently-asked-questions"
    ],
    [
      "First Monday event admission",
      "Free entry to the Original First Monday Park",
      "https://www.firstmondaycanton.com/frequently-asked-questions"
    ],
    [
      "First Monday vehicle parking",
      "Official Canton event FAQ lists $10 parking per vehicle; verify before the visit",
      "https://www.firstmondaycanton.com/frequently-asked-questions"
    ]
  ],
  "113": [
    [
      "Ross Maxwell Scenic Drive",
      "30 miles (48 km) within Big Bend National Park",
      "https://www.nps.gov/bibe/planyourvisit/paved-roads.htm"
    ],
    [
      "Historic Route 66 across Texas",
      "Approximately 185 miles, per the National Park Service",
      "https://www.nps.gov/articles/000/route-66-texas.htm"
    ],
    [
      "Preserved Route 66 road segment",
      "7.2 miles between SH 207 and I-40 west of Conway, per NPS",
      "https://www.nps.gov/places/route-66-texas-sh-207-to-interstate-40.htm"
    ]
  ],
  "114": [
    [
      "Bullock Texas State History Museum",
      "Three floors of exhibition galleries",
      "https://www.thestoryoftexas.com/press/press-releases/summer-at-the-bullock-20230523"
    ],
    [
      "Perot Museum of Nature and Science",
      "Eleven permanent exhibit halls",
      "https://www.perotmuseum.org/tickets/"
    ],
    [
      "Bullock museum founding",
      "Museum opened to the public in 2001",
      "https://www.thestoryoftexas.com/press/press-releases/summer-at-the-bullock-20230523"
    ]
  ],
  "115": [
    [
      "Big Bend National Park size",
      "801,163 acres (1,252 square miles), per National Park Service",
      "https://www.nps.gov/bibe/learn/management/statistics.htm"
    ],
    [
      "Palo Duro park activity depth",
      "More than 30 miles of hiking, biking and equestrian trails",
      "https://tpwd.texas.gov/state-parks/palo-duro-canyon"
    ],
    [
      "Garner State Park scale",
      "1,774 acres and 2.9 miles of Frio River frontage",
      "https://tpwd.texas.gov/state-parks/garner"
    ]
  ]
};
const photoSpecs: Record<number, (["park", string] | ["commons", string,string,string,number,number])[]> = {
  "106": [
    [
      "park",
      "inks-lake-state-park"
    ],
    [
      "park",
      "lake-whitney-state-park"
    ],
    [
      "park",
      "caddo-lake-state-park"
    ]
  ],
  "107": [
    [
      "commons",
      "Campground Palo Duro Canyon State Park Texas 2024.jpg",
      "Larry D. Moore",
      "CC BY 4.0",
      3556,
      2000
    ],
    [
      "park",
      "garner-state-park"
    ],
    [
      "park",
      "palo-duro-canyon-state-park"
    ]
  ],
  "108": [
    [
      "commons",
      "Main Street at Fredericksburg.JPG",
      "Lombana",
      "CC BY-SA 3.0",
      4608,
      3072
    ],
    [
      "commons",
      "Round Top Historic Library -- Round Top, Texas.jpg",
      "Jim Evans",
      "CC BY-SA 4.0",
      2514,
      2096
    ],
    [
      "park",
      "guadalupe-river-state-park"
    ]
  ],
  "109": [
    [
      "park",
      "palo-duro-canyon-state-park"
    ],
    [
      "park",
      "garner-state-park"
    ],
    [
      "park",
      "inks-lake-state-park"
    ]
  ],
  "110": [
    [
      "park",
      "inks-lake-state-park"
    ],
    [
      "park",
      "tyler-state-park"
    ],
    [
      "park",
      "lake-whitney-state-park"
    ]
  ],
  "111": [
    [
      "park",
      "guadalupe-river-state-park"
    ],
    [
      "park",
      "garner-state-park"
    ],
    [
      "park",
      "south-llano-river-state-park"
    ]
  ],
  "112": [
    [
      "commons",
      "Canton October 2017 09 (First Monday Trade Days Main Gate).jpg",
      "Michael Barera",
      "CC BY-SA 4.0",
      6000,
      4000
    ],
    [
      "commons",
      "Main Street at Fredericksburg.JPG",
      "Lombana",
      "CC BY-SA 3.0",
      4608,
      3072
    ],
    [
      "commons",
      "Salado, TX, Civic Center IMG 4058.JPG",
      "Billy Hathorn",
      "CC BY 3.0",
      4000,
      3000
    ]
  ],
  "113": [
    [
      "park",
      "palo-duro-canyon-state-park"
    ],
    [
      "park",
      "davis-mountains-state-park"
    ],
    [
      "park",
      "big-bend-ranch-state-park"
    ]
  ],
  "114": [
    [
      "commons",
      "Texas state history museum.jpg",
      "Larry D. Moore",
      "CC BY 4.0",
      2200,
      1452
    ],
    [
      "commons",
      "Perot Museum of Nature and Science 01.jpg",
      "Joe Mabel",
      "CC BY-SA 3.0",
      2848,
      4288
    ],
    [
      "commons",
      "Front entrance of Witte Museum.jpg",
      "Witte Museum",
      "CC BY-SA 4.0",
      6000,
      4000
    ]
  ],
  "115": [
    [
      "commons",
      "Main Street at Fredericksburg.JPG",
      "Lombana",
      "CC BY-SA 3.0",
      4608,
      3072
    ],
    [
      "commons",
      "Galveston March 2022 06 (Strand Historic District).jpg",
      "Michael Barera",
      "CC BY-SA 4.0",
      6000,
      4000
    ],
    [
      "park",
      "palo-duro-canyon-state-park"
    ]
  ]
};
const related: Record<number, string[]> = {
  "106": [
    "lake-fork",
    "lake-texoma",
    "lake-conroe",
    "lake-whitney"
  ],
  "107": [
    "palo-duro-canyon-state-park",
    "garner-state-park",
    "inks-lake-state-park",
    "mustang-island-state-park"
  ],
  "108": [
    "fredericksburg",
    "wimberley",
    "jefferson",
    "salado",
    "granbury"
  ],
  "109": [
    "palo-duro-canyon-state-park",
    "garner-state-park",
    "inks-lake-state-park",
    "caddo-lake-state-park"
  ],
  "110": [
    "inks-lake-state-park",
    "tyler-state-park",
    "lake-whitney-state-park",
    "lake-meredith"
  ],
  "111": [
    "guadalupe-river-state-park",
    "garner-state-park",
    "south-llano-river-state-park"
  ],
  "112": [
    "fredericksburg",
    "salado",
    "jefferson",
    "mckinney"
  ],
  "113": [
    "palo-duro-canyon-state-park",
    "big-bend-national-park",
    "davis-mountains-state-park"
  ],
  "114": [
    "bullock-texas-state-history-museum",
    "perot-museum-of-nature-and-science",
    "witte-museum",
    "national-museum-of-the-pacific-war"
  ],
  "115": [
    "fredericksburg",
    "rockport",
    "palo-duro-canyon-state-park",
    "san-antonio"
  ]
};
export const HIGH_INTENT_AUTHORITY_EVIDENCE: Record<number, GuideEvidence> = Object.fromEntries(
  Object.entries(facts).map(([key, records]) => {
    const number = Number(key);
    const photos = photoSpecs[number].map((spec) => spec[0] === "park" ? photoFromPark(spec[1]) : commons(spec[1], spec[2], spec[3], spec[4], spec[5]));
    return [number, {
      reviewDate: REVIEWED_AT,
      facts: records.map(([label,value,sourceUrl]) => ({ label, value, sourceUrl, verifiedAt: REVIEWED_AT })),
      photos,
      relevantDestinationSlugs: related[number],
    }];
  }),
);
export const guideEvidenceFor = (number: number): GuideEvidence | null => HIGH_INTENT_AUTHORITY_EVIDENCE[number] ?? null;
export const destinationInboundHighIntentGuides = (slug: string) => Object.entries(HIGH_INTENT_AUTHORITY_EVIDENCE)
  .filter(([, evidence]) => evidence.relevantDestinationSlugs.includes(slug))
  .map(([number]) => Number(number));
