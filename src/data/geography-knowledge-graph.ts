import { BOUNDARY_CITY_GEOGRAPHY, CANONICAL_PRIMARY_REGIONS, TEXAS_SUBREGIONS } from "./canonical-geography.ts";
import type {
  Article,
  CanonicalPrimaryRegionId,
  Destination,
  RelocationRegionLabel,
  TexasEvent,
  TexasGeographyAssignment,
  TexasMetroId,
  TexasRegion,
  TexasSubregionId,
} from "./types";

export interface TexasPlaceGeography extends TexasGeographyAssignment {
  citySlug: string;
  name: string;
}

export interface GeographyCoverageIssue {
  kind: "article" | "destination" | "event";
  slug: string;
  reason: string;
}

export interface GeographyCoverageReport {
  total: number;
  resolved: number;
  unresolved: number;
  issues: readonly GeographyCoverageIssue[];
}

const uniq = <T>(values: readonly T[]) => [...new Set(values)];
const slugify = (value: string) => value.toLowerCase().trim().replace(/&/g, " and ").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const normalize = (value: string) => slugify(value.replace(/\b(texas|tx)\b/gi, ""));

const relocation: Record<CanonicalPrimaryRegionId, readonly RelocationRegionLabel[]> = {
  "north-texas": ["Dallas–Fort Worth & North Texas"],
  "central-texas": ["Austin & Central Texas"],
  "east-texas": ["East Texas"],
  "south-texas": ["South Texas & Rio Grande Valley"],
  "west-texas": ["West Texas & Panhandle"],
  "gulf-coast": ["Houston & Gulf Coast"],
  panhandle: ["West Texas & Panhandle"],
};

const base = (
  primaryRegionId: CanonicalPrimaryRegionId,
  subregionIds: readonly TexasSubregionId[],
  travelRegionIds: readonly TexasRegion[],
  extra: Partial<TexasGeographyAssignment> = {},
): TexasGeographyAssignment => ({
  primaryRegionId,
  subregionIds,
  travelRegionIds,
  relocationPresentationLabels: relocation[primaryRegionId],
  ...extra,
});

export const LEGACY_TRAVEL_REGION_GEOGRAPHY: Readonly<Record<TexasRegion, TexasGeographyAssignment>> = {
  "hill-country": base("central-texas", ["texas-hill-country"], ["hill-country"], { relocationPresentationLabels: ["Austin & Central Texas", "San Antonio & Hill Country"] }),
  "gulf-coast": base("gulf-coast", ["upper-gulf-coast"], ["gulf-coast"]),
  "big-bend": base("west-texas", ["big-bend", "trans-pecos"], ["big-bend"]),
  panhandle: base("panhandle", ["texas-panhandle"], ["panhandle"]),
  "piney-woods": base("east-texas", ["piney-woods"], ["piney-woods"]),
  "prairies-lakes": base("north-texas", ["north-texas-prairies"], ["prairies-lakes"]),
  "south-texas": base("south-texas", ["south-texas-brush-country"], ["south-texas"]),
};

const place = (
  name: string,
  countySlugs: readonly string[],
  primaryRegionId: CanonicalPrimaryRegionId,
  subregionIds: readonly TexasSubregionId[],
  options: {
    metroId?: TexasMetroId;
    gatewaySubregionIds?: readonly TexasSubregionId[];
    adjacentRegionIds?: readonly CanonicalPrimaryRegionId[];
    aliases?: readonly string[];
    travelRegionIds?: readonly TexasRegion[];
    relocationPresentationLabels?: readonly RelocationRegionLabel[];
  } = {},
): TexasPlaceGeography => ({
  citySlug: slugify(name),
  name,
  primaryRegionId,
  subregionIds,
  countySlugs,
  metroId: options.metroId,
  gatewaySubregionIds: options.gatewaySubregionIds,
  adjacentRegionIds: options.adjacentRegionIds,
  aliases: uniq([name, `${name}, Texas`, `${name}, TX`, ...(options.aliases ?? [])]),
  travelRegionIds: options.travelRegionIds ?? CANONICAL_PRIMARY_REGIONS.find((region) => region.id === primaryRegionId)?.travelRegionIds ?? [],
  relocationPresentationLabels: options.relocationPresentationLabels ?? relocation[primaryRegionId],
});

export const TEXAS_PLACE_GEOGRAPHY: readonly TexasPlaceGeography[] = [
  ...BOUNDARY_CITY_GEOGRAPHY,
  place("Dallas", ["dallas"], "north-texas", ["dallas-fort-worth-metroplex"], { metroId: "dallas-fort-worth" }),
  place("Fort Worth", ["tarrant"], "north-texas", ["dallas-fort-worth-metroplex"], { metroId: "dallas-fort-worth", gatewaySubregionIds: ["cross-timbers"] }),
  place("Arlington", ["tarrant"], "north-texas", ["dallas-fort-worth-metroplex"], { metroId: "dallas-fort-worth" }),
  place("Denton", ["denton"], "north-texas", ["dallas-fort-worth-metroplex", "cross-timbers"], { metroId: "dallas-fort-worth" }),
  place("Plano", ["collin"], "north-texas", ["dallas-fort-worth-metroplex"], { metroId: "dallas-fort-worth" }),
  place("Frisco", ["collin", "denton"], "north-texas", ["dallas-fort-worth-metroplex"], { metroId: "dallas-fort-worth" }),
  place("McKinney", ["collin"], "north-texas", ["dallas-fort-worth-metroplex"], { metroId: "dallas-fort-worth" }),
  place("Grapevine", ["tarrant"], "north-texas", ["dallas-fort-worth-metroplex"], { metroId: "dallas-fort-worth" }),
  place("Weatherford", ["parker"], "north-texas", ["cross-timbers"], { gatewaySubregionIds: ["dallas-fort-worth-metroplex"] }),
  place("Sherman", ["grayson"], "north-texas", ["texoma"]),
  place("Denison", ["grayson"], "north-texas", ["texoma"]),
  place("Wichita Falls", ["wichita"], "north-texas", ["north-texas-prairies"]),
  place("Round Rock", ["williamson"], "central-texas", ["austin-area"], { metroId: "austin" }),
  place("Georgetown", ["williamson"], "central-texas", ["austin-area"], { metroId: "austin", gatewaySubregionIds: ["texas-hill-country"] }),
  place("Waco", ["mclennan"], "central-texas", ["central-texas-prairies"]),
  place("Temple", ["bell"], "central-texas", ["central-texas-prairies"]),
  place("Killeen", ["bell"], "central-texas", ["central-texas-prairies"]),
  place("Bryan", ["brazos"], "central-texas", ["brazos-valley"]),
  place("College Station", ["brazos"], "central-texas", ["brazos-valley"]),
  place("Fredericksburg", ["gillespie"], "central-texas", ["texas-hill-country"], { travelRegionIds: ["hill-country"], relocationPresentationLabels: ["San Antonio & Hill Country", "Austin & Central Texas"] }),
  place("Kerrville", ["kerr"], "central-texas", ["texas-hill-country"], { travelRegionIds: ["hill-country"] }),
  place("Marble Falls", ["burnet"], "central-texas", ["texas-hill-country"]),
  place("Llano", ["llano"], "central-texas", ["texas-hill-country"]),
  place("Wimberley", ["hays"], "central-texas", ["texas-hill-country"], { gatewaySubregionIds: ["austin-area"] }),
  place("Lockhart", ["caldwell"], "central-texas", ["central-texas-prairies"], { gatewaySubregionIds: ["austin-area"] }),
  place("New Braunfels", ["comal", "guadalupe"], "south-texas", ["san-antonio-area"], { metroId: "san-antonio", gatewaySubregionIds: ["texas-hill-country"], adjacentRegionIds: ["central-texas"], relocationPresentationLabels: ["San Antonio & Hill Country"] }),
  place("Boerne", ["kendall"], "south-texas", ["san-antonio-area"], { metroId: "san-antonio", gatewaySubregionIds: ["texas-hill-country"], adjacentRegionIds: ["central-texas"], relocationPresentationLabels: ["San Antonio & Hill Country"] }),
  place("Laredo", ["webb"], "south-texas", ["south-texas-brush-country"]),
  place("McAllen", ["hidalgo"], "south-texas", ["rio-grande-valley"], { metroId: "rio-grande-valley" }),
  place("Edinburg", ["hidalgo"], "south-texas", ["rio-grande-valley"], { metroId: "rio-grande-valley" }),
  place("Mission", ["hidalgo"], "south-texas", ["rio-grande-valley"], { metroId: "rio-grande-valley" }),
  place("Brownsville", ["cameron"], "south-texas", ["rio-grande-valley"], { metroId: "rio-grande-valley", gatewaySubregionIds: ["coastal-bend"] }),
  place("Harlingen", ["cameron"], "south-texas", ["rio-grande-valley"], { metroId: "rio-grande-valley" }),
  place("Tyler", ["smith"], "east-texas", ["upper-east-texas"]),
  place("Longview", ["gregg", "harrison"], "east-texas", ["upper-east-texas"]),
  place("Nacogdoches", ["nacogdoches"], "east-texas", ["piney-woods", "deep-east-texas"]),
  place("Lufkin", ["angelina"], "east-texas", ["piney-woods", "deep-east-texas"]),
  place("Marshall", ["harrison"], "east-texas", ["upper-east-texas"]),
  place("Texarkana", ["bowie"], "east-texas", ["upper-east-texas"], { aliases: ["Texarkana, Texas"] }),
  place("Palestine", ["anderson"], "east-texas", ["piney-woods"]),
  place("Jefferson", ["marion"], "east-texas", ["upper-east-texas", "piney-woods"]),
  place("Uncertain", ["harrison"], "east-texas", ["piney-woods"]),
  place("Houston", ["harris"], "gulf-coast", ["houston-area", "upper-gulf-coast"], { metroId: "houston" }),
  place("Katy", ["harris", "fort-bend", "waller"], "gulf-coast", ["houston-area"], { metroId: "houston" }),
  place("Sugar Land", ["fort-bend"], "gulf-coast", ["houston-area"], { metroId: "houston" }),
  place("The Woodlands", ["montgomery"], "gulf-coast", ["houston-area"], { metroId: "houston" }),
  place("Galveston", ["galveston"], "gulf-coast", ["upper-gulf-coast"]),
  place("Beaumont", ["jefferson"], "gulf-coast", ["golden-triangle", "upper-gulf-coast"]),
  place("Port Arthur", ["jefferson"], "gulf-coast", ["golden-triangle", "upper-gulf-coast"]),
  place("Orange", ["orange"], "gulf-coast", ["golden-triangle", "upper-gulf-coast"]),
  place("Corpus Christi", ["nueces"], "gulf-coast", ["coastal-bend"]),
  place("Rockport", ["aransas"], "gulf-coast", ["coastal-bend"]),
  place("Port Aransas", ["nueces"], "gulf-coast", ["coastal-bend"]),
  place("Victoria", ["victoria"], "gulf-coast", ["coastal-bend"], { adjacentRegionIds: ["south-texas"] }),
  place("El Paso", ["el-paso"], "west-texas", ["trans-pecos"], { metroId: "el-paso" }),
  place("Midland", ["midland"], "west-texas", ["permian-basin"]),
  place("Odessa", ["ector"], "west-texas", ["permian-basin"]),
  place("Marfa", ["presidio"], "west-texas", ["big-bend", "trans-pecos"]),
  place("Alpine", ["brewster"], "west-texas", ["big-bend", "trans-pecos"]),
  place("Fort Davis", ["jeff-davis"], "west-texas", ["big-bend", "trans-pecos"]),
  place("Pecos", ["reeves"], "west-texas", ["trans-pecos", "permian-basin"]),
  place("Fort Stockton", ["pecos"], "west-texas", ["trans-pecos"]),
  place("Monahans", ["ward"], "west-texas", ["permian-basin"]),
  place("San Angelo", ["tom-green"], "west-texas", [], { adjacentRegionIds: ["central-texas"] }),
  place("Abilene", ["taylor"], "west-texas", [], { adjacentRegionIds: ["north-texas", "central-texas"] }),
  place("Big Spring", ["howard"], "west-texas", ["permian-basin"]),
  place("Amarillo", ["potter", "randall"], "panhandle", ["texas-panhandle"], { metroId: "amarillo" }),
  place("Canyon", ["randall"], "panhandle", ["texas-panhandle"], { metroId: "amarillo" }),
  place("Lubbock", ["lubbock"], "panhandle", ["south-plains"], { metroId: "lubbock" }),
  place("Plainview", ["hale"], "panhandle", ["south-plains"]),
  place("Levelland", ["hockley"], "panhandle", ["south-plains"]),
].filter((candidate, index, values) => values.findIndex((other) => other.citySlug === candidate.citySlug) === index);

const placeLookup = new Map<string, TexasPlaceGeography>();
for (const item of TEXAS_PLACE_GEOGRAPHY) {
  for (const alias of [item.name, item.citySlug, ...(item.aliases ?? [])]) placeLookup.set(normalize(alias), item);
}

export const TEXAS_COUNTY_GEOGRAPHY = new Map<string, TexasGeographyAssignment>();
for (const item of TEXAS_PLACE_GEOGRAPHY) {
  for (const countySlug of item.countySlugs ?? []) {
    if (!TEXAS_COUNTY_GEOGRAPHY.has(countySlug)) TEXAS_COUNTY_GEOGRAPHY.set(countySlug, { ...item, aliases: undefined });
  }
}

const countyOverrides: Record<string, TexasGeographyAssignment> = {
  brewster: base("west-texas", ["big-bend", "trans-pecos"], ["big-bend"], { countySlugs: ["brewster"] }),
  presidio: base("west-texas", ["big-bend", "trans-pecos"], ["big-bend"], { countySlugs: ["presidio"] }),
  "jeff-davis": base("west-texas", ["big-bend", "trans-pecos"], ["big-bend"], { countySlugs: ["jeff-davis"] }),
  culberson: base("west-texas", ["trans-pecos"], ["big-bend"], { countySlugs: ["culberson"] }),
  hudspeth: base("west-texas", ["trans-pecos"], ["big-bend"], { countySlugs: ["hudspeth"] }),
  andrews: base("west-texas", ["permian-basin"], ["big-bend"], { countySlugs: ["andrews"] }),
  winkler: base("west-texas", ["permian-basin"], ["big-bend"], { countySlugs: ["winkler"] }),
  ector: base("west-texas", ["permian-basin"], ["big-bend"], { countySlugs: ["ector"] }),
  midland: base("west-texas", ["permian-basin"], ["big-bend"], { countySlugs: ["midland"] }),
  ward: base("west-texas", ["permian-basin"], ["big-bend"], { countySlugs: ["ward"] }),
  reeves: base("west-texas", ["trans-pecos", "permian-basin"], ["big-bend"], { countySlugs: ["reeves"] }),
  pecos: base("west-texas", ["trans-pecos"], ["big-bend"], { countySlugs: ["pecos"] }),
  brazos: base("central-texas", ["brazos-valley"], ["prairies-lakes"], { countySlugs: ["brazos"] }),
  grayson: base("north-texas", ["texoma"], ["prairies-lakes"], { countySlugs: ["grayson"] }),
  parker: base("north-texas", ["cross-timbers"], ["prairies-lakes"], { countySlugs: ["parker"] }),
  jefferson: base("gulf-coast", ["golden-triangle", "upper-gulf-coast"], ["gulf-coast"], { countySlugs: ["jefferson"] }),
  orange: base("gulf-coast", ["golden-triangle", "upper-gulf-coast"], ["gulf-coast"], { countySlugs: ["orange"] }),
};
for (const [countySlug, assignment] of Object.entries(countyOverrides)) TEXAS_COUNTY_GEOGRAPHY.set(countySlug, assignment);

export function geographyForPlace(value: string | undefined | null): TexasPlaceGeography | undefined {
  return value ? placeLookup.get(normalize(value)) : undefined;
}

export function geographyForCounty(value: string | undefined | null): TexasGeographyAssignment | undefined {
  if (!value) return undefined;
  return TEXAS_COUNTY_GEOGRAPHY.get(normalize(value.replace(/\bcounty\b/gi, "")));
}

function countySlugFromArticle(article: Pick<Article, "slug" | "title" | "tags">): string | undefined {
  const tag = article.tags.find((value) => / county$/i.test(value));
  if (tag) return normalize(tag.replace(/ county$/i, ""));
  const title = article.title.match(/^(.+?) County\b/i)?.[1];
  if (title) return normalize(title);
  return article.slug.match(/^(.+?)-county-/)?.[1];
}

function placeFromArticle(article: Pick<Article, "title" | "dek" | "tags">): TexasPlaceGeography | undefined {
  for (const tag of article.tags) {
    const exact = geographyForPlace(tag);
    if (exact) return exact;
  }
  const haystack = normalize(`${article.title} ${article.dek} ${article.tags.join(" ")}`);
  return TEXAS_PLACE_GEOGRAPHY.find((item) => {
    const token = normalize(item.name);
    return token.length >= 4 && (`-${haystack}-`).includes(`-${token}-`);
  });
}

export function resolveTexasGeography(input: {
  existing?: TexasGeographyAssignment;
  city?: string;
  county?: string;
  region?: TexasRegion;
  article?: Pick<Article, "slug" | "title" | "dek" | "tags">;
}): TexasGeographyAssignment | undefined {
  if (input.existing) return input.existing;
  const placeAssignment = geographyForPlace(input.city) ?? (input.article ? placeFromArticle(input.article) : undefined);
  if (placeAssignment) return placeAssignment;
  const countySlug = input.county ? normalize(input.county.replace(/\bcounty\b/gi, "")) : input.article ? countySlugFromArticle(input.article) : undefined;
  const countyAssignment = countySlug ? TEXAS_COUNTY_GEOGRAPHY.get(countySlug) : undefined;
  if (countyAssignment) return countyAssignment;
  if (!input.region) return undefined;
  const fallback = LEGACY_TRAVEL_REGION_GEOGRAPHY[input.region];
  return countySlug ? { ...fallback, countySlugs: [countySlug] } : fallback;
}

export function withCanonicalArticleGeography<T extends Article>(article: T): T {
  const geography = resolveTexasGeography({ existing: article.geography, region: article.region, article });
  return geography ? { ...article, geography } : article;
}

export function withCanonicalDestinationGeography<T extends Destination>(destination: T): T {
  const geography = resolveTexasGeography({ existing: destination.geography, city: destination.nearestTown, county: destination.county, region: destination.region });
  return geography ? { ...destination, geography } : destination;
}

export function withCanonicalEventGeography<T extends TexasEvent>(event: T): T {
  const geography = resolveTexasGeography({ existing: event.geography, city: event.city, region: event.region });
  return geography ? { ...event, geography } : event;
}

export function auditGeographyCoverage(input: { articles?: readonly Article[]; destinations?: readonly Destination[]; events?: readonly TexasEvent[] }): GeographyCoverageReport {
  const issues: GeographyCoverageIssue[] = [];
  let total = 0;
  let resolved = 0;
  for (const article of input.articles ?? []) {
    total += 1;
    const geography = resolveTexasGeography({ existing: article.geography, region: article.region, article });
    if (geography || !article.region) resolved += 1;
    else issues.push({ kind: "article", slug: article.slug, reason: "Local article has no resolvable canonical geography." });
  }
  for (const destination of input.destinations ?? []) {
    total += 1;
    if (resolveTexasGeography({ existing: destination.geography, city: destination.nearestTown, county: destination.county, region: destination.region })) resolved += 1;
    else issues.push({ kind: "destination", slug: destination.slug, reason: "Destination has no resolvable canonical geography." });
  }
  for (const event of input.events ?? []) {
    total += 1;
    if (resolveTexasGeography({ existing: event.geography, city: event.city, region: event.region })) resolved += 1;
    else issues.push({ kind: "event", slug: event.slug, reason: "Event has no resolvable canonical geography." });
  }
  return { total, resolved, unresolved: issues.length, issues };
}

export function validateGeographyKnowledgeGraph(): readonly string[] {
  const errors: string[] = [];
  const regionIds = new Set(CANONICAL_PRIMARY_REGIONS.map((region) => region.id));
  const subregionIds = new Set(TEXAS_SUBREGIONS.map((region) => region.id));
  const citySlugs = new Set<string>();
  for (const item of TEXAS_PLACE_GEOGRAPHY) {
    if (citySlugs.has(item.citySlug)) errors.push(`Duplicate city geography: ${item.citySlug}`);
    citySlugs.add(item.citySlug);
    if (!regionIds.has(item.primaryRegionId)) errors.push(`${item.citySlug} uses unknown primary region ${item.primaryRegionId}`);
    for (const id of item.subregionIds) if (!subregionIds.has(id)) errors.push(`${item.citySlug} uses unknown subregion ${id}`);
    for (const id of item.gatewaySubregionIds ?? []) if (!subregionIds.has(id)) errors.push(`${item.citySlug} uses unknown gateway subregion ${id}`);
  }
  for (const [legacyRegion, assignment] of Object.entries(LEGACY_TRAVEL_REGION_GEOGRAPHY)) {
    if (!regionIds.has(assignment.primaryRegionId)) errors.push(`${legacyRegion} fallback uses unknown primary region ${assignment.primaryRegionId}`);
  }
  return errors;
}

export const GEOGRAPHY_KNOWLEDGE_GRAPH_VALIDATION_ERRORS = validateGeographyKnowledgeGraph();
if (GEOGRAPHY_KNOWLEDGE_GRAPH_VALIDATION_ERRORS.length) {
  throw new Error(`Invalid Texas geography knowledge graph:\n${GEOGRAPHY_KNOWLEDGE_GRAPH_VALIDATION_ERRORS.join("\n")}`);
}
