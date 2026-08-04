import type { TexasEntityKind, TexasEntityRecord, TexasEntityStatus } from './types';

const supabaseUrl = String(import.meta.env.VITE_TEXASDEFINED_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL || '').replace(/\/$/, '');
const supabaseKey = String(import.meta.env.VITE_TEXASDEFINED_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || '');

export type ExploreGraphRow = Record<string, unknown>;

function headers(): HeadersInit {
  return { apikey: supabaseKey, Authorization: `Bearer ${supabaseKey}`, Accept: 'application/json' };
}

function slugify(value: unknown) {
  return String(value || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function entityKind(row: ExploreGraphRow): TexasEntityKind {
  const value = String(row.entity_type_key || row.entity_type || row.type || '').toLowerCase();
  if (value.includes('state-park')) return 'state-park';
  if (value.includes('national-park')) return 'national-park';
  if (value.includes('forest')) return 'national-forest';
  if (value.includes('wildlife') || value.includes('wma')) return 'wildlife-management-area';
  if (value.includes('lake') || value.includes('reservoir')) return 'lake';
  if (value.includes('river') || value.includes('creek')) return 'river';
  if (value.includes('beach') || value.includes('coast')) return 'beach';
  if (value.includes('cavern') || value.includes('cave')) return 'cavern';
  if (value.includes('waterfall') || value.includes('falls')) return 'waterfall';
  if (value.includes('mountain') || value.includes('peak')) return 'mountain';
  if (value.includes('mission')) return 'mission';
  if (value.includes('battlefield')) return 'battlefield';
  if (value.includes('museum')) return 'museum';
  if (value.includes('historic')) return 'historic-site';
  if (value.includes('courthouse')) return 'courthouse';
  if (value.includes('scenic')) return 'scenic-drive';
  if (value.includes('rodeo')) return 'rodeo';
  if (value.includes('fair')) return 'fair';
  if (value.includes('festival')) return 'festival';
  if (value.includes('venue') || value.includes('stadium') || value.includes('arena')) return 'sports-venue';
  if (value.includes('city') || value.includes('town')) return 'city';
  return 'attraction';
}

function status(row: ExploreGraphRow): TexasEntityStatus {
  const value = String(row.status || '').toLowerCase();
  if (value.includes('temporary') || value.includes('closed')) return 'temporarily-closed';
  if (value.includes('seasonal')) return 'seasonal';
  if (value.includes('retired') || value.includes('archived')) return 'retired';
  return value === 'published' || value === 'verified' ? 'active' : 'pending-source-verification';
}

function aliases(row: ExploreGraphRow): string[] {
  const values = [row.aliases, row.alternate_names, row.alt_names].find(Array.isArray);
  return Array.isArray(values) ? [...new Set(values.map(String).map((value) => value.trim()).filter(Boolean))] : [];
}

function relationships(row: ExploreGraphRow, countySlug?: string, regionSlug?: string) {
  const output: TexasEntityRecord['relationships'] = [];
  if (countySlug) output.push({ type: 'located-in-county', targetId: `county:${countySlug}`, sourceId: 'explore-shared-catalog' });
  if (regionSlug) output.push({ type: 'located-in-region', targetId: `region:${regionSlug}`, sourceId: 'explore-shared-catalog' });
  return output;
}

export function mapExploreRowToGraphEntity(row: ExploreGraphRow): TexasEntityRecord | null {
  const slug = slugify(row.slug || row.name);
  const name = String(row.name || '').trim();
  if (!slug || !name) return null;
  const kind = entityKind(row);
  const countySlug = slugify(row.county_slug || row.county);
  const regionSlug = slugify(row.region_slug || row.region);
  const latitude = Number(row.latitude ?? row.lat);
  const longitude = Number(row.longitude ?? row.lng ?? row.lon);
  const coordinates = Number.isFinite(latitude) && Number.isFinite(longitude) && latitude !== 0 && longitude !== 0
    ? { latitude, longitude }
    : undefined;
  const officialUrl = String(row.official_url || row.website_url || row.source_url || '').trim() || undefined;
  const sourceCheckedAt = String(row.source_checked_at || row.verified_at || row.updated_at || '').trim() || undefined;
  return {
    id: `${kind}:${slug}`,
    kind,
    name,
    slug,
    aliases: aliases(row),
    description: String(row.summary || row.short_description || row.long_description || '').trim() || undefined,
    countySlug: countySlug || undefined,
    region: regionSlug || undefined,
    coordinates,
    officialUrl,
    sourceId: 'explore-shared-catalog',
    sourceConfidence: officialUrl ? 'official' : 'high',
    sourceCheckedAt,
    reviewDueAt: undefined,
    status: status(row),
    relationships: relationships(row, countySlug || undefined, regionSlug || undefined),
    tags: Array.isArray(row.activities) ? row.activities.map(String).map(slugify).filter(Boolean) : [],
  };
}

export function hasRemoteExploreGraph(): boolean {
  return Boolean(supabaseUrl && supabaseKey);
}

export async function fetchExploreGraphEntities(options: { query?: string; limit?: number } = {}): Promise<TexasEntityRecord[]> {
  if (!hasRemoteExploreGraph()) return [];
  const params = new URLSearchParams({
    select: '*',
    visibility: 'eq.public',
    status: 'in.(published,verified)',
    order: 'featured.desc,popularity_score.desc,name.asc',
    limit: String(options.limit ?? 1000),
  });
  if (options.query?.trim()) {
    const clean = options.query.trim().replace(/[%_,()]/g, '');
    params.set('or', `(name.ilike.*${clean}*,slug.ilike.*${clean}*,summary.ilike.*${clean}*)`);
  }
  const response = await fetch(`${supabaseUrl}/rest/v1/explore_entities?${params}`, { headers: headers() });
  if (!response.ok) throw new Error(`Explore knowledge-graph request failed: ${response.status}`);
  const rows = await response.json();
  return Array.isArray(rows) ? rows.map(mapExploreRowToGraphEntity).filter((entity): entity is TexasEntityRecord => Boolean(entity)) : [];
}
