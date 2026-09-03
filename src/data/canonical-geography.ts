import type {
  CanonicalPrimaryRegionId,
  RelocationRegionLabel,
  TexasGeographyAssignment,
  TexasMetroId,
  TexasRegion,
  TexasSubregionId,
} from "./types";

/**
 * The single canonical broad-region backbone used by new TexasDefined
 * geography. Public Explore/travel routes keep their existing `TexasRegion`
 * identifiers and are cross-walked through `travelRegionIds` below.
 */
export const CANONICAL_PRIMARY_REGION_IDS: readonly CanonicalPrimaryRegionId[] = [
  "north-texas",
  "central-texas",
  "east-texas",
  "south-texas",
  "west-texas",
  "gulf-coast",
  "panhandle",
] as const;

export interface CanonicalPrimaryRegionDefinition {
  id: CanonicalPrimaryRegionId;
  name: string;
  aliases: readonly string[];
  adjacentRegionIds: readonly CanonicalPrimaryRegionId[];
  subregionIds: readonly TexasSubregionId[];
  travelRegionIds: readonly TexasRegion[];
  relocationPresentationLabels: readonly RelocationRegionLabel[];
}

export interface TexasSubregionDefinition {
  id: TexasSubregionId;
  name: string;
  primaryRegionId: CanonicalPrimaryRegionId;
  aliases: readonly string[];
  metroIds: readonly TexasMetroId[];
}

export interface TexasMetroDefinition {
  id: TexasMetroId;
  name: string;
  primaryRegionId: CanonicalPrimaryRegionId;
  subregionIds: readonly TexasSubregionId[];
  aliases: readonly string[];
}

export interface BoundaryCityGeography extends TexasGeographyAssignment {
  citySlug: string;
  name: string;
}

export const CANONICAL_PRIMARY_REGIONS: readonly CanonicalPrimaryRegionDefinition[] = [
  {
    id: "north-texas",
    name: "North Texas",
    aliases: ["North Texas", "North Central Texas", "DFW region"],
    adjacentRegionIds: ["central-texas", "east-texas", "panhandle"],
    subregionIds: ["dallas-fort-worth-metroplex", "north-texas-prairies", "cross-timbers", "texoma"],
    travelRegionIds: ["prairies-lakes"],
    relocationPresentationLabels: ["Dallas–Fort Worth & North Texas"],
  },
  {
    id: "central-texas",
    name: "Central Texas",
    aliases: ["Central Texas", "Central Texas corridor"],
    adjacentRegionIds: ["north-texas", "east-texas", "south-texas", "west-texas", "gulf-coast"],
    subregionIds: ["austin-area", "texas-hill-country", "central-texas-prairies", "brazos-valley"],
    travelRegionIds: ["hill-country", "prairies-lakes"],
    relocationPresentationLabels: ["Austin & Central Texas", "San Antonio & Hill Country"],
  },
  {
    id: "east-texas",
    name: "East Texas",
    aliases: ["East Texas", "East Texas forests"],
    adjacentRegionIds: ["north-texas", "central-texas", "gulf-coast"],
    subregionIds: ["piney-woods", "upper-east-texas", "deep-east-texas"],
    travelRegionIds: ["piney-woods", "prairies-lakes"],
    relocationPresentationLabels: ["East Texas"],
  },
  {
    id: "south-texas",
    name: "South Texas",
    aliases: ["South Texas", "South Texas Plains", "South Texas Brush Country"],
    adjacentRegionIds: ["central-texas", "west-texas", "gulf-coast"],
    subregionIds: ["san-antonio-area", "rio-grande-valley", "south-texas-brush-country"],
    travelRegionIds: ["south-texas", "hill-country"],
    relocationPresentationLabels: ["San Antonio & Hill Country", "South Texas & Rio Grande Valley"],
  },
  {
    id: "west-texas",
    name: "West Texas",
    aliases: ["West Texas", "Far West Texas"],
    adjacentRegionIds: ["central-texas", "south-texas", "panhandle"],
    subregionIds: ["big-bend", "trans-pecos", "permian-basin"],
    travelRegionIds: ["big-bend"],
    relocationPresentationLabels: ["West Texas & Panhandle"],
  },
  {
    id: "gulf-coast",
    name: "Gulf Coast",
    aliases: ["Texas Gulf Coast", "Coastal Texas", "Gulf Coast"],
    adjacentRegionIds: ["central-texas", "east-texas", "south-texas"],
    subregionIds: ["houston-area", "upper-gulf-coast", "golden-triangle", "coastal-bend"],
    travelRegionIds: ["gulf-coast"],
    relocationPresentationLabels: ["Houston & Gulf Coast"],
  },
  {
    id: "panhandle",
    name: "Panhandle",
    aliases: ["Texas Panhandle", "Panhandle Plains", "Panhandle"],
    adjacentRegionIds: ["north-texas", "west-texas"],
    subregionIds: ["texas-panhandle", "south-plains"],
    travelRegionIds: ["panhandle"],
    relocationPresentationLabels: ["West Texas & Panhandle"],
  },
] as const;

export const TEXAS_SUBREGIONS: readonly TexasSubregionDefinition[] = [
  { id: "dallas-fort-worth-metroplex", name: "Dallas–Fort Worth Metroplex", primaryRegionId: "north-texas", aliases: ["DFW", "Metroplex"], metroIds: ["dallas-fort-worth"] },
  { id: "north-texas-prairies", name: "North Texas Prairies", primaryRegionId: "north-texas", aliases: ["North Texas prairie country"], metroIds: [] },
  { id: "cross-timbers", name: "Cross Timbers", primaryRegionId: "north-texas", aliases: ["Texas Cross Timbers"], metroIds: [] },
  { id: "texoma", name: "Texoma", primaryRegionId: "north-texas", aliases: ["Lake Texoma region", "Texoma Texas"], metroIds: [] },
  { id: "austin-area", name: "Austin Area", primaryRegionId: "central-texas", aliases: ["Austin area", "Greater Austin"], metroIds: ["austin"] },
  { id: "texas-hill-country", name: "Texas Hill Country", primaryRegionId: "central-texas", aliases: ["Hill Country"], metroIds: [] },
  { id: "central-texas-prairies", name: "Central Texas Prairies", primaryRegionId: "central-texas", aliases: ["Central Texas prairie country"], metroIds: [] },
  { id: "brazos-valley", name: "Brazos Valley", primaryRegionId: "central-texas", aliases: ["Bryan–College Station region"], metroIds: [] },
  { id: "piney-woods", name: "Piney Woods", primaryRegionId: "east-texas", aliases: ["Pineywoods", "East Texas Piney Woods"], metroIds: [] },
  { id: "upper-east-texas", name: "Upper East Texas", primaryRegionId: "east-texas", aliases: ["Northeast Texas"], metroIds: [] },
  { id: "deep-east-texas", name: "Deep East Texas", primaryRegionId: "east-texas", aliases: ["Deep East Texas forests"], metroIds: [] },
  { id: "san-antonio-area", name: "San Antonio Area", primaryRegionId: "south-texas", aliases: ["Greater San Antonio"], metroIds: ["san-antonio"] },
  { id: "rio-grande-valley", name: "Rio Grande Valley", primaryRegionId: "south-texas", aliases: ["RGV", "Lower Rio Grande Valley"], metroIds: ["rio-grande-valley"] },
  { id: "south-texas-brush-country", name: "South Texas Brush Country", primaryRegionId: "south-texas", aliases: ["Brush Country"], metroIds: [] },
  { id: "big-bend", name: "Big Bend", primaryRegionId: "west-texas", aliases: ["Big Bend Country"], metroIds: [] },
  { id: "trans-pecos", name: "Trans-Pecos", primaryRegionId: "west-texas", aliases: ["Far West Texas", "Trans Pecos"], metroIds: ["el-paso"] },
  { id: "permian-basin", name: "Permian Basin", primaryRegionId: "west-texas", aliases: ["Midland–Odessa", "Permian"], metroIds: [] },
  { id: "houston-area", name: "Houston Area", primaryRegionId: "gulf-coast", aliases: ["Greater Houston"], metroIds: ["houston"] },
  { id: "upper-gulf-coast", name: "Upper Gulf Coast", primaryRegionId: "gulf-coast", aliases: ["Upper Texas Coast"], metroIds: [] },
  { id: "golden-triangle", name: "Golden Triangle", primaryRegionId: "gulf-coast", aliases: ["Beaumont–Port Arthur–Orange", "Southeast Texas Golden Triangle"], metroIds: [] },
  { id: "coastal-bend", name: "Coastal Bend", primaryRegionId: "gulf-coast", aliases: ["Texas Coastal Bend"], metroIds: [] },
  { id: "texas-panhandle", name: "Texas Panhandle", primaryRegionId: "panhandle", aliases: ["Panhandle"], metroIds: ["amarillo"] },
  { id: "south-plains", name: "South Plains", primaryRegionId: "panhandle", aliases: ["Llano Estacado south plains"], metroIds: ["lubbock"] },
] as const;

export const TEXAS_METROS: readonly TexasMetroDefinition[] = [
  { id: "dallas-fort-worth", name: "Dallas–Fort Worth", primaryRegionId: "north-texas", subregionIds: ["dallas-fort-worth-metroplex"], aliases: ["DFW", "Dallas–Fort Worth–Arlington"] },
  { id: "austin", name: "Austin", primaryRegionId: "central-texas", subregionIds: ["austin-area"], aliases: ["Greater Austin", "Austin–Round Rock"] },
  { id: "san-antonio", name: "San Antonio", primaryRegionId: "south-texas", subregionIds: ["san-antonio-area"], aliases: ["Greater San Antonio", "San Antonio–New Braunfels"] },
  { id: "houston", name: "Houston", primaryRegionId: "gulf-coast", subregionIds: ["houston-area"], aliases: ["Greater Houston", "Houston metro"] },
  { id: "el-paso", name: "El Paso", primaryRegionId: "west-texas", subregionIds: ["trans-pecos"], aliases: ["El Paso metro"] },
  { id: "amarillo", name: "Amarillo", primaryRegionId: "panhandle", subregionIds: ["texas-panhandle"], aliases: ["Amarillo metro"] },
  { id: "lubbock", name: "Lubbock", primaryRegionId: "panhandle", subregionIds: ["south-plains"], aliases: ["Lubbock metro"] },
  { id: "rio-grande-valley", name: "Rio Grande Valley", primaryRegionId: "south-texas", subregionIds: ["rio-grande-valley"], aliases: ["RGV", "Lower Rio Grande Valley"] },
] as const;

export const BOUNDARY_CITY_GEOGRAPHY: readonly BoundaryCityGeography[] = [
  {
    citySlug: "austin", name: "Austin", primaryRegionId: "central-texas", subregionIds: ["austin-area"],
    gatewaySubregionIds: ["texas-hill-country"], metroId: "austin", countySlugs: ["travis"],
    aliases: ["Austin, Texas", "Austin, TX"], travelRegionIds: ["hill-country"], relocationPresentationLabels: ["Austin & Central Texas"],
  },
  {
    citySlug: "san-antonio", name: "San Antonio", primaryRegionId: "south-texas", subregionIds: ["san-antonio-area"],
    gatewaySubregionIds: ["texas-hill-country"], metroId: "san-antonio", countySlugs: ["bexar"], adjacentRegionIds: ["central-texas"],
    aliases: ["San Antonio, Texas", "San Antonio, TX"], travelRegionIds: ["hill-country", "south-texas"], relocationPresentationLabels: ["San Antonio & Hill Country"],
  },
] as const;

const canonicalPrimaryRegionIdSet = new Set<string>(CANONICAL_PRIMARY_REGION_IDS);
const legacyTravelRegionIdSet = new Set<TexasRegion>(["big-bend", "gulf-coast", "hill-country", "panhandle", "piney-woods", "prairies-lakes", "south-texas"]);

export function isCanonicalPrimaryRegionId(value: string): value is CanonicalPrimaryRegionId {
  return canonicalPrimaryRegionIdSet.has(value);
}

export function assertCanonicalPrimaryRegionId(value: string): asserts value is CanonicalPrimaryRegionId {
  if (!isCanonicalPrimaryRegionId(value)) throw new Error(`Unknown canonical primary region: ${value}`);
}

export function canonicalPrimaryRegion(id: CanonicalPrimaryRegionId): CanonicalPrimaryRegionDefinition {
  const region = CANONICAL_PRIMARY_REGIONS.find((candidate) => candidate.id === id);
  if (!region) throw new Error(`Missing canonical primary region definition: ${id}`);
  return region;
}

export function boundaryCityGeography(citySlug: string): BoundaryCityGeography | undefined {
  return BOUNDARY_CITY_GEOGRAPHY.find((city) => city.citySlug === citySlug);
}

export function validateCanonicalGeography(): readonly string[] {
  const errors: string[] = [];
  const regionIds = new Set(CANONICAL_PRIMARY_REGIONS.map((region) => region.id));
  const subregionIds = new Set(TEXAS_SUBREGIONS.map((subregion) => subregion.id));
  const metroIds = new Set(TEXAS_METROS.map((metro) => metro.id));
  const boundaryCitySlugs = new Set(BOUNDARY_CITY_GEOGRAPHY.map((city) => city.citySlug));
  const subregionsById = new Map<TexasSubregionId, TexasSubregionDefinition>(TEXAS_SUBREGIONS.map((subregion) => [subregion.id, subregion] as const));
  const metrosById = new Map<TexasMetroId, TexasMetroDefinition>(TEXAS_METROS.map((metro) => [metro.id, metro] as const));

  if (CANONICAL_PRIMARY_REGIONS.length !== CANONICAL_PRIMARY_REGION_IDS.length) errors.push(`Expected ${CANONICAL_PRIMARY_REGION_IDS.length} canonical primary regions; found ${CANONICAL_PRIMARY_REGIONS.length}.`);
  if (regionIds.size !== CANONICAL_PRIMARY_REGIONS.length) errors.push("Canonical primary region IDs must be unique.");
  if (subregionIds.size !== TEXAS_SUBREGIONS.length) errors.push("Texas subregion IDs must be unique.");
  if (metroIds.size !== TEXAS_METROS.length) errors.push("Texas metro IDs must be unique.");
  if (boundaryCitySlugs.size !== BOUNDARY_CITY_GEOGRAPHY.length) errors.push("Boundary city slugs must be unique.");

  for (const id of CANONICAL_PRIMARY_REGION_IDS) if (!regionIds.has(id)) errors.push(`Missing canonical primary region definition for ${id}.`);

  for (const region of CANONICAL_PRIMARY_REGIONS) {
    if (!canonicalPrimaryRegionIdSet.has(region.id)) errors.push(`Arbitrary primary region id detected: ${region.id}.`);
    for (const adjacentId of region.adjacentRegionIds) {
      if (adjacentId === region.id) errors.push(`${region.id} cannot be adjacent to itself.`);
      if (!regionIds.has(adjacentId)) errors.push(`${region.id} references unknown adjacent region ${adjacentId}.`);
      const reciprocal = CANONICAL_PRIMARY_REGIONS.find((candidate) => candidate.id === adjacentId);
      if (reciprocal && !reciprocal.adjacentRegionIds.includes(region.id)) errors.push(`Adjacency must be reciprocal: ${region.id} -> ${adjacentId}.`);
    }
    for (const subregionId of region.subregionIds) {
      const subregion = subregionsById.get(subregionId);
      if (!subregion) errors.push(`${region.id} references unknown subregion ${subregionId}.`);
      else if (subregion.primaryRegionId !== region.id) errors.push(`${subregionId} is listed under ${region.id} but belongs to ${subregion.primaryRegionId}.`);
    }
    for (const travelRegionId of region.travelRegionIds) if (!legacyTravelRegionIdSet.has(travelRegionId)) errors.push(`${region.id} references unknown travel region ${travelRegionId}.`);
  }

  for (const subregion of TEXAS_SUBREGIONS) {
    if (!regionIds.has(subregion.primaryRegionId)) errors.push(`${subregion.id} references unknown primary region ${subregion.primaryRegionId}.`);
    else {
      const owner = CANONICAL_PRIMARY_REGIONS.find((region) => region.id === subregion.primaryRegionId);
      if (owner && !owner.subregionIds.includes(subregion.id)) errors.push(`${subregion.id} is not listed by its owning primary region ${subregion.primaryRegionId}.`);
    }
    for (const metroId of subregion.metroIds) {
      const metro = metrosById.get(metroId);
      if (!metro) errors.push(`${subregion.id} references unknown metro ${metroId}.`);
      else if (!metro.subregionIds.includes(subregion.id)) errors.push(`${subregion.id} -> ${metroId} metro relationship is not reciprocal.`);
    }
  }

  for (const metro of TEXAS_METROS) {
    if (!regionIds.has(metro.primaryRegionId)) errors.push(`${metro.id} references unknown primary region ${metro.primaryRegionId}.`);
    for (const subregionId of metro.subregionIds) {
      const subregion = subregionsById.get(subregionId);
      if (!subregion) errors.push(`${metro.id} references unknown subregion ${subregionId}.`);
      else {
        if (subregion.primaryRegionId !== metro.primaryRegionId) errors.push(`${metro.id} crosses primary-region ownership through ${subregionId}.`);
        if (!subregion.metroIds.includes(metro.id)) errors.push(`${metro.id} -> ${subregionId} subregion relationship is not reciprocal.`);
      }
    }
  }

  for (const city of BOUNDARY_CITY_GEOGRAPHY) {
    if (!regionIds.has(city.primaryRegionId)) errors.push(`${city.citySlug} references unknown primary region ${city.primaryRegionId}.`);
    for (const subregionId of city.subregionIds) {
      const subregion = subregionsById.get(subregionId);
      if (!subregion) errors.push(`${city.citySlug} references unknown subregion ${subregionId}.`);
      else if (subregion.primaryRegionId !== city.primaryRegionId) errors.push(`${city.citySlug} primary subregion ${subregionId} belongs to another primary region.`);
    }
    for (const gatewaySubregionId of city.gatewaySubregionIds ?? []) if (!subregionsById.has(gatewaySubregionId)) errors.push(`${city.citySlug} references unknown gateway subregion ${gatewaySubregionId}.`);
    if (city.metroId) {
      const metro = metrosById.get(city.metroId);
      if (!metro) errors.push(`${city.citySlug} references unknown metro ${city.metroId}.`);
      else if (metro.primaryRegionId !== city.primaryRegionId) errors.push(`${city.citySlug} metro ${city.metroId} belongs to another primary region.`);
    }
    for (const adjacentId of city.adjacentRegionIds ?? []) {
      if (!regionIds.has(adjacentId)) errors.push(`${city.citySlug} references unknown adjacent region ${adjacentId}.`);
      if (adjacentId === city.primaryRegionId) errors.push(`${city.citySlug} cannot list its primary region as adjacent.`);
    }
    for (const travelRegionId of city.travelRegionIds ?? []) if (!legacyTravelRegionIdSet.has(travelRegionId)) errors.push(`${city.citySlug} references unknown travel region ${travelRegionId}.`);
  }

  return errors;
}

export const CANONICAL_GEOGRAPHY_VALIDATION_ERRORS = validateCanonicalGeography();
if (CANONICAL_GEOGRAPHY_VALIDATION_ERRORS.length > 0) {
  throw new Error(`Invalid canonical Texas geography:\n${CANONICAL_GEOGRAPHY_VALIDATION_ERRORS.join("\n")}`);
}
