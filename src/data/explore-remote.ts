import type { CategorySlug, Destination, TexasRegion } from "./types";

const supabaseUrl = String(import.meta.env.VITE_TEXASDEFINED_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL || "").replace(/\/$/, "");
const supabaseKey = String(import.meta.env.VITE_TEXASDEFINED_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || "");

const PAGE_SIZE = 500;
const MAX_REMOTE_DESTINATIONS = 5000;
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export function hasExploreRemoteData(): boolean {
  return Boolean(supabaseUrl && supabaseKey);
}

function headers(): HeadersInit {
  return {
    apikey: supabaseKey,
    Authorization: `Bearer ${supabaseKey}`,
    Accept: "application/json",
  };
}

function record(value: unknown): Record<string, unknown> {
  if (Array.isArray(value)) return (value[0] as Record<string, unknown>) ?? {};
  if (value && typeof value === "object") return value as Record<string, unknown>;
  return {};
}

function records(value: unknown): Record<string, unknown>[] {
  if (Array.isArray(value)) return value.filter((item): item is Record<string, unknown> => Boolean(item) && typeof item === "object");
  return value && typeof value === "object" ? [value as Record<string, unknown>] : [];
}

function cleanText(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function stringArray(value: unknown): string[] {
  if (Array.isArray(value)) return value.map(String).map((item) => item.trim()).filter(Boolean);
  if (typeof value === "string" && value.trim()) return value.split(/[,;|]/).map((item) => item.trim()).filter(Boolean);
  return [];
}

function unique(values: string[], limit = values.length): string[] {
  return values.filter((item, index, all) => Boolean(item) && all.indexOf(item) === index).slice(0, limit);
}

function region(value: unknown): TexasRegion {
  const normalized = String(value || "").toLowerCase();
  if (normalized.includes("hill")) return "hill-country";
  if (normalized.includes("coast")) return "gulf-coast";
  if (normalized.includes("big bend") || normalized.includes("west")) return "big-bend";
  if (normalized.includes("panhandle")) return "panhandle";
  if (normalized.includes("piney") || normalized.includes("east")) return "piney-woods";
  if (normalized.includes("south")) return "south-texas";
  return "prairies-lakes";
}

function regionFromCoordinates(lat: number, lng: number): TexasRegion | undefined {
  if (!Number.isFinite(lat) || !Number.isFinite(lng) || (lat === 0 && lng === 0)) return undefined;
  if (lat >= 33) return "panhandle";
  if (lng <= -100) return "big-bend";
  if (lng >= -95.5 && lat >= 30) return "piney-woods";
  if (lat <= 28.6) return "south-texas";
  if (lat >= 29.4 && lat <= 31.4 && lng <= -97.6) return "hill-country";
  if (lng >= -97.6 && lat <= 30.2) return "gulf-coast";
  return "prairies-lakes";
}

function entityType(row: Record<string, unknown>): string {
  const relation = record(row.explore_entity_types);
  return String(relation.key || row.entity_type_key || row.entity_type || row.type || "");
}

function readableType(row: Record<string, unknown>): string {
  const relation = record(row.explore_entity_types);
  const label = cleanText(relation.name);
  if (label) return label;
  const key = entityType(row);
  return key ? key.replace(/[_-]+/g, " ").replace(/\b\w/g, (character) => character.toUpperCase()) : "Texas destination";
}

function category(value: unknown): CategorySlug {
  const normalized = String(value || "").toLowerCase().replace(/[\s-]+/g, "_");
  if (["national_park", "national_monument", "national_preserve", "national_seashore"].some((type) => normalized.includes(type))) return "national-parks";
  if (["major_spring", "spring", "spring_fed_pool"].some((type) => normalized.includes(type))) return "major-springs";
  if (["cavern", "cave", "karst"].some((type) => normalized.includes(type))) return "caverns";
  if (["lighthouse", "beach", "coast", "seashore", "island", "bay", "shore"].some((type) => normalized.includes(type))) return "beaches-coast";
  if (["museum", "historic_site", "historical_site", "mission", "battlefield", "monument", "heritage"].some((type) => normalized.includes(type))) return "historic-sites";
  if (["lake", "river", "reservoir", "waterfall", "swimming_hole"].some((type) => normalized.includes(type))) return "lakes-rivers";
  if (["wildlife_refuge", "wildlife_management_area", "wildlife_area", "birding_center"].some((type) => normalized.includes(type))) return "outdoors";
  if (["state_park", "park", "natural_area", "campground", "trail"].some((type) => normalized.includes(type))) return "state-parks";
  if (["town", "city", "community", "county"].some((type) => normalized.includes(type))) return "small-towns";
  if (["restaurant", "barbecue", "bbq", "winery", "brewery", "food"].some((type) => normalized.includes(type))) return "food-bbq";
  if (["road_trip", "scenic_drive", "highway"].some((type) => normalized.includes(type))) return "road-trips";
  return "outdoors";
}

function matchesCategory(row: Record<string, unknown>, requested?: CategorySlug): boolean {
  return !requested || category(entityType(row)) === requested;
}

export const DESTINATION_FALLBACK_IMAGE = "/images/texasdefined-destination-placeholder.svg";

function destinationImage(value: unknown): string {
  const raw = cleanText(value);
  if (!raw) return DESTINATION_FALLBACK_IMAGE;
  if (raw.startsWith("/")) return raw;
  if (/^https?:\/\//i.test(raw)) return raw;
  return DESTINATION_FALLBACK_IMAGE;
}

function mediaFor(row: Record<string, unknown>): Record<string, unknown> {
  const links = records(row.explore_entity_media)
    .filter((link) => cleanText(link.role) === "hero" || cleanText(link.role) === "thumbnail" || Boolean(link.is_primary))
    .sort((left, right) => Number(Boolean(right.is_primary)) - Number(Boolean(left.is_primary)) || Number(left.sort_order || 0) - Number(right.sort_order || 0));
  return record(links[0]?.explore_media);
}

function relatedNames(rows: unknown, relationKey: string, allowedStates: string[]): string[] {
  return unique(records(rows)
    .filter((item) => !allowedStates.length || allowedStates.includes(cleanText(item.suitability || item.availability)))
    .map((item) => cleanText(record(item[relationKey]).name))
    .filter(Boolean));
}

function bestSeasonFromActivities(row: Record<string, unknown>): string {
  const months = unique(records(row.explore_entity_activities)
    .flatMap((activity) => Array.isArray(activity.best_months) ? activity.best_months.map(Number) : [])
    .filter((month) => month >= 1 && month <= 12)
    .sort((left, right) => left - right)
    .map((month) => MONTHS[month - 1]));
  if (!months.length) return "";
  if (months.length <= 4) return months.join(", ");
  return `${months[0]} through ${months[months.length - 1]}`;
}

function formatMoney(cents: unknown): string {
  const amount = Number(cents);
  if (!Number.isFinite(amount)) return "";
  if (amount === 0) return "Free entry";
  return `$${(amount / 100).toFixed(amount % 100 ? 2 : 0)} entry fee`;
}

function parkEntryNote(profile: Record<string, unknown>): string {
  const parts = unique([
    cleanText(profile.fee_notes),
    formatMoney(profile.entrance_fee_cents),
    profile.reservations_required === true ? "Reservations may be required" : "",
    cleanText(profile.reservations_url) ? `Reservations: ${cleanText(profile.reservations_url)}` : "",
  ]);
  return parts.join(" · ");
}

function generatedSummary(name: string, typeLabel: string, town: string, county: string, park: Record<string, unknown>, lake: Record<string, unknown>): string {
  const acreage = Number(park.acreage);
  if (Number.isFinite(acreage) && acreage > 0) return `${name} is a ${typeLabel.toLowerCase()} near ${town}, Texas, covering ${Math.round(acreage).toLocaleString("en-US")} acres.`;
  const surfaceArea = Number(lake.surface_area_acres);
  if (Number.isFinite(surfaceArea) && surfaceArea > 0) return `${name} is a ${typeLabel.toLowerCase()} near ${town}, Texas, spanning about ${Math.round(surfaceArea).toLocaleString("en-US")} acres.`;
  if (county && county !== town) return `${name} is a ${typeLabel.toLowerCase()} near ${town} in ${county} County, Texas.`;
  return `${name} is a ${typeLabel.toLowerCase()} near ${town}, Texas.`;
}

function profileHighlights(park: Record<string, unknown>, lake: Record<string, unknown>): string[] {
  const items: string[] = [];
  if (park.camping_available === true) items.push("Camping available");
  if (park.visitor_center_available === true) items.push("Visitor center");
  if (park.playground_available === true) items.push("Playground");
  if (park.restrooms_available === true) items.push("Restrooms");
  if (park.pets_allowed === true) items.push("Pets allowed under current park rules");
  if (lake.swimming_allowed === true) items.push("Swimming allowed");
  if (lake.fishing_allowed === true) items.push("Fishing allowed");
  if (lake.boating_allowed === true) items.push("Boating allowed");
  return items;
}

function sourceParagraph(row: Record<string, unknown>): string {
  const source = records(row.explore_entity_sources)[0] ?? {};
  const verified = cleanText(source.verified_at || source.retrieved_at);
  const sourceUrl = cleanText(source.source_url);
  if (!verified && !sourceUrl) return "";
  const date = verified ? new Date(verified) : null;
  const dateLabel = date && !Number.isNaN(date.getTime()) ? date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : "";
  return `Source information${dateLabel ? ` checked ${dateLabel}` : ""}${sourceUrl ? `: ${sourceUrl}` : "."}`;
}

function mapRow(row: Record<string, unknown>): Destination {
  const place = record(row.explore_locations);
  const park = record(row.explore_park_profiles);
  const lake = record(row.explore_lake_profiles);
  const media = mediaFor(row);
  const name = cleanText(row.name) || "Texas destination";
  const type = entityType(row);
  const typeLabel = readableType(row);
  const county = cleanText(place.county || row.county);
  const town = cleanText(place.city || row.city || row.nearest_town) || county || "Texas";
  const lat = Number(place.latitude ?? row.latitude ?? row.lat ?? 0);
  const lng = Number(place.longitude ?? row.longitude ?? row.lng ?? 0);
  const summary = cleanText(row.summary || row.short_description || row.long_description) || generatedSummary(name, typeLabel, town, county, park, lake);
  const image = destinationImage(media.external_url || row.hero_image_url || row.image_url);
  const activityNames = relatedNames(row.explore_entity_activities, "explore_activities", ["excellent", "good", "available", "seasonal"]);
  const amenityNames = relatedNames(row.explore_entity_amenities, "explore_amenities", ["available", "limited", "seasonal"]);
  const highlights = unique([
    ...activityNames,
    ...amenityNames,
    ...profileHighlights(park, lake),
    ...stringArray(row.highlights),
    ...stringArray(row.alternate_names),
  ], 12);
  const managingAuthority = cleanText(park.managing_authority || lake.managing_authority);
  const body = unique([
    cleanText(row.long_description),
    summary,
    managingAuthority ? `${name} is managed by ${managingAuthority}.` : "",
    cleanText(park.accessibility_notes),
    sourceParagraph(row),
  ]);

  return {
    id: String(row.id || row.slug),
    brandId: "texasdefined",
    slug: cleanText(row.slug),
    name,
    summary,
    category: category(type),
    region: row.region || row.region_name || row.geographic_region
      ? region(row.region || row.region_name || row.geographic_region)
      : regionFromCoordinates(lat, lng) ?? region(county),
    nearestTown: town,
    coordinates: { lat: Number.isFinite(lat) ? lat : 0, lng: Number.isFinite(lng) ? lng : 0 },
    hero: {
      src: image,
      alt: cleanText(media.alt_text || media.title || row.hero_image_alt) || `${name} in Texas`,
      width: Number(media.width) > 0 ? Number(media.width) : 1600,
      height: Number(media.height) > 0 ? Number(media.height) : 1000,
    },
    bestSeason: cleanText(row.best_season || row.operating_season) || bestSeasonFromActivities(row) || "Check current conditions before visiting",
    entryNote: cleanText(row.entry_note || row.fees) || parkEntryNote(park) || "Confirm current hours, fees, reservations, and access with the official source.",
    highlights,
    body,
    featured: Boolean(row.featured),
  };
}

const EXPLORE_SELECT = [
  "*",
  "explore_entity_types(key,name)",
  "explore_locations(address_line_1,city,county,state_code,postal_code,latitude,longitude,directions)",
  "explore_park_profiles(park_type,acreage,managing_authority,entrance_fee_cents,fee_notes,reservations_required,reservations_url,pets_allowed,camping_available,visitor_center_available,playground_available,restrooms_available,accessibility_notes)",
  "explore_lake_profiles(surface_area_acres,shoreline_miles,max_depth_feet,water_type,reservoir,managing_authority,swimming_allowed,fishing_allowed,boating_allowed,wake_restrictions)",
  "explore_entity_activities(suitability,best_months,notes,explore_activities(key,name))",
  "explore_entity_amenities(availability,notes,explore_amenities(key,name))",
  "explore_entity_media(role,sort_order,is_primary,explore_media(external_url,title,alt_text,caption,credit_text,license_name,license_url,width,height))",
  "explore_entity_sources(source_url,retrieved_at,verified_at,confidence)",
].join(",");

async function fetchExplorePage(params: URLSearchParams, offset: number, limit: number): Promise<Record<string, unknown>[]> {
  const pageParams = new URLSearchParams(params);
  pageParams.set("offset", String(offset));
  pageParams.set("limit", String(limit));
  const response = await fetch(`${supabaseUrl}/rest/v1/explore_entities?${pageParams}`, { headers: headers() });
  if (!response.ok) throw new Error(`Explore catalog request failed: ${response.status}`);
  const rows = await response.json();
  return Array.isArray(rows) ? rows : [];
}

export async function fetchExploreDestinations(
  options: { featured?: boolean; query?: string; category?: CategorySlug; limit?: number } = {},
): Promise<Destination[]> {
  if (!hasExploreRemoteData()) return [];
  const resultLimit = Math.min(options.limit ?? MAX_REMOTE_DESTINATIONS, MAX_REMOTE_DESTINATIONS);
  const scanLimit = options.category ? MAX_REMOTE_DESTINATIONS : resultLimit;
  const params = new URLSearchParams({
    select: EXPLORE_SELECT,
    visibility: "eq.public",
    status: "in.(published,verified)",
    order: "featured.desc,popularity_score.desc,name.asc",
  });
  if (options.featured) params.set("featured", "eq.true");
  if (options.query?.trim()) {
    const clean = options.query.trim().replace(/[%_,()]/g, "");
    params.set("or", `(name.ilike.*${clean}*,slug.ilike.*${clean}*,short_description.ilike.*${clean}*,long_description.ilike.*${clean}*)`);
  }

  const rows: Record<string, unknown>[] = [];
  for (let offset = 0; offset < scanLimit; offset += PAGE_SIZE) {
    const page = await fetchExplorePage(params, offset, Math.min(PAGE_SIZE, scanLimit - offset));
    rows.push(...page);
    if (page.length < PAGE_SIZE) break;
  }

  return rows.filter((row) => matchesCategory(row, options.category)).map(mapRow).slice(0, resultLimit);
}

export async function fetchExploreDestination(slug: string): Promise<Destination | null> {
  if (!hasExploreRemoteData()) return null;
  const params = new URLSearchParams({
    select: EXPLORE_SELECT,
    slug: `eq.${slug}`,
    visibility: "eq.public",
    status: "in.(published,verified)",
    limit: "1",
  });
  const response = await fetch(`${supabaseUrl}/rest/v1/explore_entities?${params}`, { headers: headers() });
  if (!response.ok) throw new Error(`Explore destination request failed: ${response.status}`);
  const rows = await response.json();
  return Array.isArray(rows) && rows[0] ? mapRow(rows[0]) : null;
}
