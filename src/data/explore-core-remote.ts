import type { CategorySlug, Destination, TexasRegion } from "./types";
import { DESTINATION_FALLBACK_IMAGE } from "./explore-remote";

const supabaseUrl = String(import.meta.env.VITE_TEXASDEFINED_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL || "").replace(/\/$/, "");
const supabaseKey = String(import.meta.env.VITE_TEXASDEFINED_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || "");
const PAGE_SIZE = 500;
const MAX_REMOTE_DESTINATIONS = 5000;

function headers(): HeadersInit {
  return { apikey: supabaseKey, Authorization: `Bearer ${supabaseKey}`, Accept: "application/json" };
}

function clean(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
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

function regionFromCoordinates(lat: number, lng: number): TexasRegion {
  if (lat >= 33) return "panhandle";
  if (lng <= -100) return "big-bend";
  if (lng >= -95.5 && lat >= 30) return "piney-woods";
  if (lat <= 28.6) return "south-texas";
  if (lat >= 29.4 && lat <= 31.4 && lng <= -97.6) return "hill-country";
  if (lng >= -97.6 && lat <= 30.2) return "gulf-coast";
  return "prairies-lakes";
}

function category(value: unknown): CategorySlug {
  const normalized = String(value || "").toLowerCase().replace(/[\s-]+/g, "_");
  if (["national_park", "national_monument", "national_preserve", "national_seashore"].some((type) => normalized.includes(type))) return "national-parks";
  if (["major_spring", "spring", "spring_fed_pool"].some((type) => normalized.includes(type))) return "major-springs";
  if (["cavern", "cave", "karst"].some((type) => normalized.includes(type))) return "caverns";
  if (["lighthouse", "beach", "coast", "seashore", "island", "bay", "shore"].some((type) => normalized.includes(type))) return "beaches-coast";
  if (["museum", "historic_site", "historical_site", "mission", "battlefield", "monument", "heritage"].some((type) => normalized.includes(type))) return "historic-sites";
  if (["lake", "river", "reservoir", "waterfall", "swimming_hole"].some((type) => normalized.includes(type))) return "lakes-rivers";
  if (["state_park", "park", "natural_area", "campground", "trail"].some((type) => normalized.includes(type))) return "state-parks";
  if (["town", "city", "community", "county"].some((type) => normalized.includes(type))) return "small-towns";
  if (["restaurant", "barbecue", "bbq", "winery", "brewery", "food"].some((type) => normalized.includes(type))) return "food-bbq";
  if (["road_trip", "scenic_drive", "highway"].some((type) => normalized.includes(type))) return "road-trips";
  return "outdoors";
}

function mapRow(row: Record<string, unknown>): Destination {
  const name = clean(row.name) || "Texas destination";
  const town = clean(row.city || row.nearest_town || row.county) || "Texas";
  const county = clean(row.county) || undefined;
  const lat = Number(row.latitude ?? row.lat ?? 0);
  const lng = Number(row.longitude ?? row.lng ?? 0);
  const type = clean(row.entity_type_key || row.entity_type || row.type) || "destination";
  const summary = clean(row.summary || row.short_description || row.long_description)
    || `${name} is a ${type.replace(/[_-]+/g, " ")} near ${town}, Texas.`;
  return {
    id: String(row.id || row.slug),
    brandId: "texasdefined",
    slug: clean(row.slug),
    name,
    summary,
    category: category(type),
    region: clean(row.region || row.region_name || row.geographic_region)
      ? region(row.region || row.region_name || row.geographic_region)
      : regionFromCoordinates(lat, lng),
    nearestTown: town,
    coordinates: { lat: Number.isFinite(lat) ? lat : 0, lng: Number.isFinite(lng) ? lng : 0 },
    hero: { src: DESTINATION_FALLBACK_IMAGE, alt: `${name} in Texas`, width: 1600, height: 1000 },
    bestSeason: "Check current conditions before visiting",
    entryNote: "Confirm current hours, fees, reservations, and access with the official source.",
    highlights: [],
    body: [summary],
    county,
    featured: Boolean(row.featured),
  };
}

function baseParams(): URLSearchParams {
  return new URLSearchParams({
    select: "*",
    visibility: "eq.public",
    status: "in.(published,verified)",
    order: "featured.desc,popularity_score.desc,name.asc",
  });
}

export async function fetchCoreExploreDestinations(options: { featured?: boolean; query?: string; category?: CategorySlug; limit?: number } = {}): Promise<Destination[]> {
  if (!supabaseUrl || !supabaseKey) return [];
  const limit = Math.min(options.limit ?? MAX_REMOTE_DESTINATIONS, MAX_REMOTE_DESTINATIONS);
  const params = baseParams();
  if (options.featured) params.set("featured", "eq.true");
  if (options.query?.trim()) {
    const query = options.query.trim().replace(/[%_,()]/g, "");
    params.set("or", `(name.ilike.*${query}*,slug.ilike.*${query}*,short_description.ilike.*${query}*,long_description.ilike.*${query}*)`);
  }
  const rows: Record<string, unknown>[] = [];
  for (let offset = 0; offset < MAX_REMOTE_DESTINATIONS; offset += PAGE_SIZE) {
    const pageParams = new URLSearchParams(params);
    pageParams.set("offset", String(offset));
    pageParams.set("limit", String(PAGE_SIZE));
    const response = await fetch(`${supabaseUrl}/rest/v1/explore_entities?${pageParams}`, { headers: headers() });
    if (!response.ok) throw new Error(`Core Explore catalog request failed: ${response.status}`);
    const page = await response.json();
    if (!Array.isArray(page)) break;
    rows.push(...page);
    if (page.length < PAGE_SIZE) break;
  }
  return rows.map(mapRow).filter((item) => !options.category || item.category === options.category).slice(0, limit);
}

export async function fetchCoreExploreDestination(slug: string): Promise<Destination | null> {
  if (!supabaseUrl || !supabaseKey) return null;
  const params = baseParams();
  params.set("slug", `eq.${slug}`);
  params.set("limit", "1");
  const response = await fetch(`${supabaseUrl}/rest/v1/explore_entities?${params}`, { headers: headers() });
  if (!response.ok) throw new Error(`Core Explore destination request failed: ${response.status}`);
  const rows = await response.json();
  return Array.isArray(rows) && rows[0] ? mapRow(rows[0]) : null;
}
