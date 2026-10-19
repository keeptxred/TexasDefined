import type { ArticleInternalLink } from "./types";

/**
 * One place to declare factual river geography for the site's reciprocal discovery.
 * A river page must be in this catalog before the mandatory authority validator accepts it.
 *
 * Associations are editorially curated: being in the same county does not imply
 * a public launch, trail, camping site, boating connection, or riverfront frontage.
 * Declare a destination only when its canonical /destination/{slug} route exists.
 * Cities and fishing lakes must use their actual owners rather than fabricated
 * /destination aliases. An empty destinations array is intentional until a
 * genuinely published, factually appropriate destination is verified.
 */
export type RiverAuthorityLink = ArticleInternalLink & { description: string };

export const RIVER_AUTHORITY_RELATIONS = [
  {
    slug: "texas-guadalupe-river-guide",
    name: "Guadalupe River",
    counties: ["kerr", "comal", "guadalupe", "gonzales", "victoria"],
    destinations: ["guadalupe-river-state-park", "new-braunfels"],
  },
  {
    slug: "texas-frio-river-guide",
    name: "Frio River",
    counties: ["real", "uvalde", "frio", "mcmullen"],
    destinations: ["garner-state-park", "leakey"],
  },
  {
    slug: "texas-comal-river-guide",
    name: "Comal River",
    counties: ["comal"],
    destinations: ["new-braunfels"],
  },
  {
    slug: "texas-san-marcos-river-guide",
    name: "San Marcos River",
    counties: ["hays", "guadalupe", "caldwell", "gonzales"],
    destinations: ["san-marcos"],
  },
  {
    slug: "texas-llano-river-guide",
    name: "Llano River",
    counties: ["kimble", "mason", "llano"],
    destinations: ["south-llano-river-state-park", "junction", "llano"],
  },
  {
    slug: "texas-colorado-river-guide",
    name: "Colorado River (Texas)",
    counties: ["llano", "bastrop", "fayette", "colorado", "matagorda"],
    destinations: ["colorado-bend-state-park", "bastrop"],
  },
  {
    slug: "texas-brazos-river-guide",
    name: "Brazos River",
    counties: ["brazos", "mclennan", "washington", "fort-bend"],
    destinations: ["washington-on-the-brazos-state-historic-site"],
  },
  {
    slug: "texas-neches-river-guide",
    name: "Neches River",
    counties: ["henderson", "cherokee", "tyler", "jasper"],
    destinations: [],
  },
  {
    slug: "texas-sabine-river-guide",
    name: "Sabine River",
    counties: ["sabine", "newton", "panola", "orange"],
    destinations: [],
  },
  {
    slug: "texas-pecos-river-guide",
    name: "Pecos River",
    counties: ["loving", "reeves", "ward", "crockett", "val-verde"],
    destinations: ["amistad-national-recreation-area", "seminole-canyon-state-park"],
  },
  {slug:"texas-trinity-river-guide","name":"Trinity River","counties":["tarrant","dallas","ellis","kaufman","liberty"],"destinations":[]},
  {slug:"texas-rio-grande-river-guide","name":"Rio Grande","counties":["el-paso","presidio","brewster","val-verde","webb","hidalgo","cameron"],"destinations":["big-bend-national-park","amistad-national-recreation-area","falcon-state-park"]},
  {slug:"texas-canadian-river-guide","name":"Canadian River","counties":["potter","hutchinson","hemphill"],"destinations":["lake-meredith-national-recreation-area","alibates-flint-quarries-national-monument"]},
  {slug:"texas-cypress-river-basin-guide","name":"Big Cypress Bayou and Cypress River Basin","counties":["marion","harrison","cass"],"destinations":["caddo-lake-state-park","caddo-lake","jefferson"]},
  {slug:"texas-lavaca-river-guide","name":"Lavaca River","counties":["lavaca","jackson","calhoun"],"destinations":[]},
  {slug:"texas-nueces-river-guide","name":"Nueces River","counties":["uvalde","real","live-oak","nueces"],"destinations":["choke-canyon-state-park"]},
  {slug:"texas-red-river-guide","name":"Red River","counties":["wichita","grayson","lamar","red-river","bowie"],"destinations":["eisenhower-state-park"]},
  {slug:"texas-san-antonio-river-guide","name":"San Antonio River","counties":["bexar","wilson","goliad","victoria"],"destinations":["san-antonio-missions-national-historical-park","goliad-state-park-and-historic-site","san-antonio"]},
  {slug:"texas-san-jacinto-river-guide","name":"San Jacinto River","counties":["montgomery","harris","liberty","chambers"],"destinations":["san-jacinto-battleground-state-historic-site"]},
  {slug:"texas-sulphur-river-guide","name":"Sulphur River","counties":["hopkins","delta","franklin","bowie"],"destinations":["cooper-lake-state-park"]},
] as const;

type Relation = (typeof RIVER_AUTHORITY_RELATIONS)[number];

function linksFor(kind: "counties" | "destinations", slug: string): RiverAuthorityLink[] {
  return RIVER_AUTHORITY_RELATIONS
    .filter((river) => (river[kind] as readonly string[]).includes(slug))
    .map((river: Relation) => ({
      href: `/article/${river.slug}`,
      label: `Explore the ${river.name} guide`,
      description: "Use the dedicated river guide to compare watershed history, visitor options, lawful access, fishing and camping. Check exact reach conditions before planning water activities.",
    }));
}

export function riverAuthorityLinksForCounty(slug: string): ArticleInternalLink[] {
  return linksFor("counties", slug);
}

export function riverAuthorityLinksForDestination(slug: string): RiverAuthorityLink[] {
  return linksFor("destinations", slug);
}

/** Statewide navigation is automatic for any editorially registered river. */
export function allRiverAuthorityNavigationLinks(): ArticleInternalLink[] {
  return RIVER_AUTHORITY_RELATIONS.map((river) => ({
    href: `/article/${river.slug}`,
    label: `${river.name} fishing, camping and visitor guide`,
    description: "Compare source-led river access, water safety and recreation options by reach.",
  }));
}

/**
 * Automatic but conservative topical article backlinks. Do not match an entire
 * article body: passing mentions of a river are not evidence of a useful trip link.
 * An exact named river in title, dek or tags is a meaningful topic signal.
 */
export function riverAuthorityLinksForArticleMetadata(article: {
  slug: string;
  title: string;
  dek: string;
  tags: readonly string[];
}): RiverAuthorityLink[] {
  const haystack = [article.title, article.dek, ...article.tags]
    .join(" | ")
    .toLocaleLowerCase("en-US");
  return RIVER_AUTHORITY_RELATIONS.filter((river) => {
    if (river.slug === article.slug) return false;
    const names = river.slug === "texas-cypress-river-basin-guide"
      ? ["big cypress bayou", "cypress river basin"]
      : river.slug === "texas-colorado-river-guide"
      ? ["colorado river", "texas colorado"]
      : [river.name.toLocaleLowerCase("en-US")];
    return names.some((name) => haystack.includes(name));
  }).slice(0, 4).map((river) => ({
    href: `/article/${river.slug}`,
    label: `Learn more about the ${river.name}`,
    description: "Compare the named river's landscape, fishing, camping, mapped access and visitor-planning details.",
  }));
}
