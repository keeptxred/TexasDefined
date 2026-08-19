export type HistoricSiteCluster = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  slugs: string[];
};

export const historicSiteClusters: HistoricSiteCluster[] = [
  {
    id: "texas-revolution",
    eyebrow: "1835–1836",
    title: "Texas Revolution: from colony to independence",
    description: "Follow the political, military and personal story from Stephen F. Austin's colony and Washington-on-the-Brazos through Goliad, San Jacinto and the first months of the Republic.",
    slugs: [
      "san-felipe-de-austin",
      "washington-on-the-brazos",
      "star-of-the-republic-museum",
      "fannin-battleground",
      "presidio-la-bahia",
      "san-jacinto-battleground",
      "first-capitol-of-texas",
      "stephen-f-austin-memorial",
    ],
  },
  {
    id: "frontier-forts",
    eyebrow: "Frontier Texas",
    title: "The frontier-fort circuit",
    description: "A statewide network of Army posts explains westward expansion, overland travel, conflict with Native nations and the service of Buffalo Soldiers.",
    slugs: ["fort-martin-scott", "fort-griffin", "fort-mckavett", "fort-lancaster"],
  },
  {
    id: "presidents-statesmen",
    eyebrow: "Public life",
    title: "Presidents, speakers and Texas statesmen",
    description: "Historic homes and birthplaces show national political figures in a more revealing Texas scale—from Eisenhower and the Bush family to Sam Rayburn and José Antonio Navarro.",
    slugs: ["eisenhower-birthplace", "bush-family-home", "sam-rayburn-house", "casa-navarro"],
  },
  {
    id: "borderlands-missions",
    eyebrow: "Borderlands",
    title: "Missions, borderlands and cultural exchange",
    description: "Connect Indigenous, Spanish, Mexican and American histories through El Paso, South Texas and the mission landscapes that long predate the Republic.",
    slugs: ["magoffin-home", "old-socorro-mission", "mission-dolores", "lipantitlan", "casa-navarro"],
  },
  {
    id: "german-texas",
    eyebrow: "Immigration & enterprise",
    title: "German Texas and the Hill Country",
    description: "Fredericksburg and Fayette County pair immigration history with frontier military sites, brewing, architecture and the communities that reshaped Central Texas.",
    slugs: ["fort-martin-scott", "kreische-brewery", "monument-hill", "national-museum-pacific-war"],
  },
  {
    id: "slavery-emancipation",
    eyebrow: "Labor, freedom & memory",
    title: "Slavery, emancipation and plantation Texas",
    description: "Brazoria County sites preserve difficult, essential histories of enslaved labor, emancipation, archaeology, agriculture, wealth and the communities that endured beyond slavery.",
    slugs: ["levi-jordan-plantation", "varner-hogg-plantation", "first-capitol-of-texas", "stephen-f-austin-memorial"],
  },
  {
    id: "twentieth-century-war",
    eyebrow: "20th-century military history",
    title: "Texas and the world wars",
    description: "From Eisenhower's Denison birthplace and Fredericksburg's Pacific War museum to the Iwo Jima monument in the Rio Grande Valley, Texas sites connect local places to global conflict.",
    slugs: ["eisenhower-birthplace", "national-museum-pacific-war", "iwo-jima-museum-monument", "slaton-harvey-house"],
  },
];
