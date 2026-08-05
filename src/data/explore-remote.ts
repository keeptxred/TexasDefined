import type { CategorySlug, Destination, TexasRegion } from "./types";

const supabaseUrl = String(import.meta.env.VITE_TEXASDEFINED_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL || "").replace(/\/$/, "");
const supabaseKey = String(import.meta.env.VITE_TEXASDEFINED_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || "");

const PAGE_SIZE = 500;
const MAX_REMOTE_DESTINATIONS = 5000;

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

function entityType(row: Record<string, unknown>): string {
  const relation = row.explore_entity_types;
  if (relation && typeof relation === "object" && !Array.isArray(relation)) {
    return String((relation as Record<string, unknown>).key || "");
  }
  if (Array.isArray(relation) && relation[0] && typeof relation[0] === "object") {
    return String((relation[0] as Record<string, unknown>).key || "");
  }
  return String(row.entity_type_key || row.entity_type || row.type || "");
}

function category(value: unknown): CategorySlug {
  const normalized = String(value || "").toLowerCase().replace(/[\s-]+/g, "_");
  if (["national_park", "national_monument", "national_preserve", "national_seashore"].some((type) => normalized.includes(type))) {
    return "national-parks";
  }
  if (["major_spring", "spring", "spring_fed_pool"].some((type) => normalized.includes(type))) return "major-springs";
  if (["cavern", "cave", "karst"].some((type) => normalized.includes(type))) return "caverns";
  if (["beach", "coast", "seashore", "island", "bay", "shore"].some((type) => normalized.includes(type))) return "beaches-coast";
  if (["museum", "historic_site", "historical_site", "mission", "battlefield", "monument", "heritage"].some((type) => normalized.includes(type))) {
    return "historic-sites";
  }
  if (["lake", "river", "reservoir", "waterfall", "swimming_hole"].some((type) => normalized.includes(type))) {
    return "lakes-rivers";
  }
  if (["state_park", "park", "natural_area", "wildlife_refuge", "campground", "trail"].some((type) => normalized.includes(type))) {
    return "state-parks";
  }
  if (["town", "city", "community", "county"].some((type) => normalized.includes(type))) return "small-towns";
  if (["restaurant", "barbecue", "bbq", "winery", "brewery", "food"].some((type) => normalized.includes(type))) return "food-bbq";
  if (["road_trip", "scenic_drive", "highway"].some((type) => normalized.includes(type))) return "road-trips";
  return "outdoors";
}

function matchesCategory(row: Record<string, unknown>, requested?: CategorySlug): boolean {
  return !requested || category(entityType(row)) === requested;
}

function stringArray(value: unknown): string[] {
  if (Array.isArray(value)) return value.map(String).filter(Boolean);
  if (typeof value === "string" && value.trim()) return value.split(/[,;|]/).map((item) => item.trim()).filter(Boolean);
  return [];
}

function mapRow(row: Record<string, unknown>): Destination {
  const summary = String(row.summary || row.short_description || row.long_description || "Explore this Texas destination.");
  const lat = Number(row.latitude ?? row.lat ?? 0);
  const lng = Number(row.longitude ?? row.lng ?? 0);
  const image = String(row.hero_image_url || row.image_url || "/images/texasdefined-placeholder.jpg");
  const type = entityType(row);
  const highlights = [...stringArray(row.activities), ...stringArray(row.highlights), ...stringArray(row.alternate_names)]
    .filter((item, index, all) => all.indexOf(item) === index)
    .slice(0, 8);

  return {
    id: String(row.id || row.slug),
    brandId: "texasdefined",
    slug: String(row.slug || ""),
    name: String(row.name || "Texas destination"),
    summary,
    category: category(type),
    region: region(row.region || row.region_name || row.geographic_region),
    nearestTown: String(row.city || row.nearest_town || row.county || "Texas"),
    coordinates: { lat: Number.isFinite(lat) ? lat : 0, lng: Number.isFinite(lng) ? lng : 0 },
    hero: {
      src: image,
      alt: String(row.hero_image_alt || `${String(row.name || "Texas destination")} in Texas`),
      width: 1600,
      height: 1000,
    },
    bestSeason: String(row.best_season || row.operating_season || "Check current conditions before visiting"),
    entryNote: String(row.entry_note || row.fees || "Confirm current hours, fees, reservations, and access with the official source."),
    highlights,
    body: [String(row.long_description || summary)],
    featured: Boolean(row.featured),
  };
}

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
  // Entity type is supplied through a related table, so category filtering is
  // performed after retrieval. Scan the catalog before applying a small result
  // limit or valid category records later in the ordered catalog can disappear.
  const scanLimit = options.category ? MAX_REMOTE_DESTINATIONS : resultLimit;
  const params = new URLSearchParams({
    select: "*,explore_entity_types(key,name)",
    visibility: "eq.public",
    status: "in.(published,verified)",
    order: "featured.desc,popularity_score.desc,name.asc",
  });
  if (options.featured) params.set("featured", "eq.true");
  if (options.query?.trim()) {
    const clean = options.query.trim().replace(/[%_,()]/g, "");
    params.set("or", `(name.ilike.*${clean}*,slug.ilike.*${clean}*,summary.ilike.*${clean}*)`);
  }

  const rows: Record<string, unknown>[] = [];
  for (let offset = 0; offset < scanLimit; offset += PAGE_SIZE) {
    const page = await fetchExplorePage(params, offset, Math.min(PAGE_SIZE, scanLimit - offset));
    rows.push(...page);
    if (page.length < PAGE_SIZE) break;
  }

  return rows
    .filter((row) => matchesCategory(row, options.category))
    .map(mapRow)
    .slice(0, resultLimit);
}

export async function fetchExploreDestination(slug: string): Promise<Destination | null> {
  if (!hasExploreRemoteData()) return null;
  const params = new URLSearchParams({ select: "*,explore_entity_types(key,name)", slug: `eq.${slug}`, limit: "1" });
  const response = await fetch(`${supabaseUrl}/rest/v1/explore_entities?${params}`, { headers: headers() });
  if (!response.ok) throw new Error(`Explore destination request failed: ${response.status}`);
  const rows = await response.json();
  return Array.isArray(rows) && rows[0] ? mapRow(rows[0]) : null;
}
