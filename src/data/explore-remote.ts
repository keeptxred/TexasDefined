import type { CategorySlug, Destination, TexasRegion } from "./types";

const supabaseUrl = String(import.meta.env.VITE_TEXASDEFINED_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL || "").replace(/\/$/, "");
const supabaseKey = String(import.meta.env.VITE_TEXASDEFINED_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || "");

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

function category(value: unknown): CategorySlug {
  const normalized = String(value || "").toLowerCase();
  if (normalized.includes("lake") || normalized.includes("river") || normalized.includes("spring")) return "lakes-rivers";
  if (normalized.includes("park") || normalized.includes("natural") || normalized.includes("trail") || normalized.includes("cavern")) return "state-parks";
  if (normalized.includes("town") || normalized.includes("city")) return "small-towns";
  return "outdoors";
}

function mapRow(row: Record<string, unknown>): Destination {
  const summary = String(row.summary || row.short_description || row.long_description || "Explore this Texas destination.");
  const lat = Number(row.latitude ?? row.lat ?? 0);
  const lng = Number(row.longitude ?? row.lng ?? 0);
  const image = String(row.hero_image_url || row.image_url || "/images/texasdefined-placeholder.jpg");
  return {
    id: String(row.id || row.slug),
    brandId: "texasdefined",
    slug: String(row.slug || ""),
    name: String(row.name || "Texas destination"),
    summary,
    category: category(row.entity_type_key || row.entity_type || row.type),
    region: region(row.region),
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
    highlights: Array.isArray(row.activities) ? row.activities.map(String).slice(0, 8) : [],
    body: [String(row.long_description || summary)],
    featured: Boolean(row.featured),
  };
}

export async function fetchExploreDestinations(options: { featured?: boolean; query?: string; limit?: number } = {}): Promise<Destination[]> {
  if (!hasExploreRemoteData()) return [];
  const params = new URLSearchParams({
    select: "*",
    visibility: "eq.public",
    status: "in.(published,verified)",
    order: "featured.desc,popularity_score.desc,name.asc",
    limit: String(options.limit ?? 500),
  });
  if (options.featured) params.set("featured", "eq.true");
  if (options.query?.trim()) {
    const clean = options.query.trim().replace(/[%_,()]/g, "");
    params.set("or", `(name.ilike.*${clean}*,slug.ilike.*${clean}*,summary.ilike.*${clean}*)`);
  }
  const response = await fetch(`${supabaseUrl}/rest/v1/explore_entities?${params}`, { headers: headers() });
  if (!response.ok) throw new Error(`Explore catalog request failed: ${response.status}`);
  const rows = await response.json();
  return Array.isArray(rows) ? rows.map(mapRow) : [];
}

export async function fetchExploreDestination(slug: string): Promise<Destination | null> {
  if (!hasExploreRemoteData()) return null;
  const params = new URLSearchParams({ select: "*", slug: `eq.${slug}`, limit: "1" });
  const response = await fetch(`${supabaseUrl}/rest/v1/explore_entities?${params}`, { headers: headers() });
  if (!response.ok) throw new Error(`Explore destination request failed: ${response.status}`);
  const rows = await response.json();
  return Array.isArray(rows) && rows[0] ? mapRow(rows[0]) : null;
}
