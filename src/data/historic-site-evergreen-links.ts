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
