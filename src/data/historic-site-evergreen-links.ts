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
