import { getGeneratedTexasEvents } from "./events-generated";
import type { TexasEvent, TexasRegion } from "./types";

const supabaseUrl = String(import.meta.env.VITE_TEXASDEFINED_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL || "").replace(/\/$/, "");
const supabaseKey = String(import.meta.env.VITE_TEXASDEFINED_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || "");

function headers(): HeadersInit {
  return { apikey: supabaseKey, Authorization: `Bearer ${supabaseKey}`, Accept: "application/json" };
}

function clean(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function region(value: unknown): TexasRegion {
  const normalized = clean(value).toLowerCase();
  if (normalized.includes("hill")) return "hill-country";
  if (normalized.includes("coast")) return "gulf-coast";
  if (normalized.includes("big bend") || normalized.includes("west")) return "big-bend";
  if (normalized.includes("panhandle")) return "panhandle";
  if (normalized.includes("piney") || normalized.includes("east")) return "piney-woods";
  if (normalized.includes("south")) return "south-texas";
  return "prairies-lakes";
}

function category(value: unknown): TexasEvent["category"] {
  const normalized = clean(value).toLowerCase();
  if (["music", "concert", "dance"].some((item) => normalized.includes(item))) return "music";
  if (["food", "fair", "festival"].some((item) => normalized.includes(item))) return "food";
  if (["rodeo", "livestock"].some((item) => normalized.includes(item))) return "rodeo";
  if (["run", "race", "sport"].some((item) => normalized.includes(item))) return "sport";
  if (["history", "culture", "art", "museum"].some((item) => normalized.includes(item))) return "culture";
  return "seasonal";
}

function mapRow(row: Record<string, unknown>): TexasEvent {
  return {
    id: String(row.id || row.source_event_id || row.slug),
    brandId: "texasdefined",
    slug: clean(row.slug),
    name: clean(row.name),
    blurb: clean(row.blurb),
    city: clean(row.city),
    region: region(row.region),
    startDate: clean(row.start_date),
    endDate: clean(row.end_date) || undefined,
    category: category(row.category),
    venue: clean(row.venue) || undefined,
    officialUrl: clean(row.official_url || row.source_url) || undefined,
    sourceName: clean(row.source_name) || undefined,
    sourceCheckedAt: clean(row.source_checked_at) || undefined,
  };
}

export async function fetchPublishedTexasEvents(limit = 24): Promise<TexasEvent[]> {
  const generated = getGeneratedTexasEvents(limit);
  if (generated.length) return generated;

  if (!supabaseUrl || !supabaseKey) return [];
  const today = new Date().toISOString().slice(0, 10);
  const params = new URLSearchParams({
    select: "id,source_event_id,source_url,source_name,source_checked_at,name,slug,blurb,city,region,venue,start_date,end_date,category,official_url",
    brand_id: "eq.texasdefined",
    status: "eq.published",
    or: `(end_date.gte.${today},and(end_date.is.null,start_date.gte.${today}))`,
    order: "start_date.asc,editorial_score.desc,confidence_score.desc",
    limit: String(Math.max(1, Math.min(limit, 100))),
  });
  const response = await fetch(`${supabaseUrl}/rest/v1/texas_events?${params}`, { headers: headers() });
  if (!response.ok) throw new Error(`Texas events request failed: ${response.status}`);
  const value = await response.json();
  if (!Array.isArray(value)) return [];
  return value.map((row) => mapRow(row as Record<string, unknown>)).filter((event) => event.name && event.startDate);
}
