import type { Destination, DestinationAreaItem } from "./types";

type RouteGuide = {
  slugs: Set<string>;
  item: DestinationAreaItem;
};

const routeGuides: RouteGuide[] = [
  {
    slugs: new Set([
      "san-felipe-de-austin",
      "washington-on-the-brazos",
      "star-of-the-republic-museum",
      "fannin-battleground",
      "presidio-la-bahia",
      "san-jacinto-battleground",
      "first-capitol-of-texas",
      "stephen-f-austin-memorial",
    ]),
    item: {
      name: "Texas Revolution road trip",
      description: "Place this stop in chronological context from Austin's colony and the independence convention through Goliad, San Jacinto and the early Republic.",
      href: "/article/texas-revolution-historic-sites-road-trip",
    },
  },
  {
    slugs: new Set([
      "san-felipe-de-austin",
      "washington-on-the-brazos",
      "star-of-the-republic-museum",
      "first-capitol-of-texas",
      "stephen-f-austin-memorial",
      "french-legation",
      "barrington-living-history-farm",
    ]),
    item: {
      name: "Republic of Texas government trail",
      description: "Follow the movement of government from Austin's colony and the independence convention through the Republic's first Congress, diplomacy and annexation.",
      href: "/article/republic-of-texas-government-trail",
    },
  },
  {
    slugs: new Set([
      "fort-martin-scott",
      "fort-griffin",
      "fort-mckavett",
      "fort-lancaster",
      "official-texas-longhorn-herd",
    ]),
    item: {
      name: "Texas frontier forts road trip",
      description: "Compare this landscape with other Army posts, frontier transportation routes, ranch country and the Native histories of westward expansion.",
      href: "/article/texas-frontier-forts-road-trip",
    },
  },
  {
    slugs: new Set([
      "eisenhower-birthplace",
      "bush-family-home",
      "sam-rayburn-house",
      "casa-navarro",
    ]),
    item: {
      name: "Presidential and political Texas",
      description: "Connect this home to Eisenhower, the Bush family, Sam Rayburn and the longer political history represented by José Antonio Navarro.",
      href: "/article/presidential-texas-historic-homes",
    },
  },
  {
    slugs: new Set([
      "levi-jordan-plantation",
      "varner-hogg-plantation",
      "first-capitol-of-texas",
      "stephen-f-austin-memorial",
    ]),
    item: {
      name: "Brazoria plantation history",
      description: "Place this stop in the Lower Brazos story of slavery, emancipation, Reconstruction, changing labor systems and archaeological recovery.",
      href: "/article/brazoria-plantations-slavery-emancipation-history",
    },
  },
  {
    slugs: new Set([
      "old-socorro-mission",
      "magoffin-home",
      "casa-navarro",
      "lipantitlan",
      "mission-dolores",
    ]),
    item: {
      name: "Texas borderlands historic sites",
      description: "Connect this place to Pueblo, Spanish, Mexican, Tejano, Indigenous and American histories across the Rio Grande, South Texas and East Texas borderlands.",
      href: "/article/texas-borderlands-historic-sites-guide",
    },
  },
  {
    slugs: new Set([
      "eisenhower-birthplace",
      "national-museum-pacific-war",
      "iwo-jima-museum-monument",
      "slaton-harvey-house",
    ]),
    item: {
      name: "Texas and World War II",
      description: "Connect leadership, the Pacific War, public memory and railroad-era mobility through four Texas historic sites tied to the global conflict.",
      href: "/article/texas-world-war-ii-historic-sites-guide",
    },
  },
  {
    slugs: new Set([
      "san-felipe-de-austin",
      "washington-on-the-brazos",
      "fannin-battleground",
      "presidio-la-bahia",
      "san-jacinto-battleground",
      "fort-martin-scott",
      "fort-griffin",
      "fort-mckavett",
      "fort-lancaster",
      "sabine-pass-battleground",
      "palmito-ranch-battlefield",
      "eisenhower-birthplace",
      "national-museum-pacific-war",
      "iwo-jima-museum-monument",
      "slaton-harvey-house",
    ]),
    item: {
      name: "Texas military history timeline",
      description: "Place this site inside the longer military chronology from the Texas Revolution and frontier Army through the Civil War, border mobilizations and the world wars.",
      href: "/article/texas-military-history-timeline",
    },
  },
  {
    slugs: new Set([
      "sabine-pass-battleground",
      "palmito-ranch-battlefield",
      "confederate-reunion-grounds",
      "sam-bell-maxey-house",
      "levi-jordan-plantation",
      "varner-hogg-plantation",
      "starr-family-home",
    ]),
    item: {
      name: "Texas in the Civil War and Reconstruction",
      description: "Connect battlefield history to slavery, emancipation, Reconstruction, postwar political life and the later construction of Civil War memory across Texas.",
      href: "/article/texas-civil-war-sites-guide",
    },
  },
  {
    slugs: new Set([
      "palmito-ranch-battlefield",
      "port-isabel-lighthouse",
      "iwo-jima-museum-monument",
    ]),
    item: {
      name: "Texas and the U.S.–Mexican War",
      description: "Use Palo Alto, Resaca de la Palma, Fort Brown and the lower Rio Grande corridor to connect annexation with the opening battles of the 1846–1848 war.",
      href: "/article/texas-us-mexican-war-palo-alto-guide",
    },
  },
  {
    slugs: new Set([
      "eisenhower-birthplace",
      "national-museum-pacific-war",
      "iwo-jima-museum-monument",
      "slaton-harvey-house",
    ]),
    item: {
      name: "Texas World War II bases and POW camps",
      description: "Move from this preserved place into the statewide training-camp, airfield, POW and civilian-internment systems that transformed Texas during World War II.",
      href: "/article/texas-world-war-ii-bases-pow-camps",
    },
  },
];

export function enrichHistoricSiteEvergreenLinks(destination: Destination): Destination {
  if (destination.category !== "historic-sites" || !destination.areaGuide) return destination;

  const additions = routeGuides
    .filter((guide) => guide.slugs.has(destination.slug))
    .map((guide) => guide.item)
    .filter((item) => !destination.areaGuide?.sideTrips.some((existing) => existing.href === item.href));

  if (!additions.length) return destination;

  return {
    ...destination,
    areaGuide: {
      ...destination.areaGuide,
      sideTrips: [...destination.areaGuide.sideTrips, ...additions],
    },
  };
}
