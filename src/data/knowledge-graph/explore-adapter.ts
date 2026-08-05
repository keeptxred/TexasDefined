import type { TexasEntityKind, TexasEntityRecord, TexasEntityStatus } from './types';

const supabaseUrl = String(import.meta.env.VITE_TEXASDEFINED_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL || '').replace(/\/$/, '');
const supabaseKey = String(import.meta.env.VITE_TEXASDEFINED_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || '');
const PAGE_SIZE = 500;
const MAX_GRAPH_ENTITIES = 5000;

export type ExploreGraphRow = Record<string, unknown>;

function headers(): HeadersInit {
  return { apikey: supabaseKey, Authorization: `Bearer ${supabaseKey}`, Accept: 'application/json' };
}

function record(value: unknown): Record<string, unknown> {
  if (Array.isArray(value)) return (value[0] as Record<string, unknown>) ?? {};
  return value && typeof value === 'object' ? value as Record<string, unknown> : {};
}

function records(value: unknown): Record<string, unknown>[] {
  if (Array.isArray(value)) return value.filter((item): item is Record<string, unknown> => Boolean(item) && typeof item === 'object');
  return value && typeof value === 'object' ? [value as Record<string, unknown>] : [];
}

function clean(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

function slugify(value: unknown) {
  return String(value || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function entityType(row: ExploreGraphRow): string {
  const relation = record(row.explore_entity_types);
  return String(relation.key || row.entity_type_key || row.entity_type || row.type || '');
}

function entityKind(row: ExploreGraphRow): TexasEntityKind {
  const value = entityType(row).toLowerCase().replace(/[\s_]+/g, '-');
  if (value.includes('state-park')) return 'state-park';
  if (value.includes('national-park')) return 'national-park';
  if (value.includes('forest')) return 'national-forest';
  if (value.includes('wildlife') || value.includes('wma')) return 'wildlife-management-area';
  if (value.includes('lake') || value.includes('reservoir')) return 'lake';
  if (value.includes('river') || value.includes('creek')) return 'river';
  if (value.includes('beach') || value.includes('coast') || value.includes('island')) return 'beach';
  if (value.includes('cavern') || value.includes('cave')) return 'cavern';
  if (value.includes('waterfall') || value.includes('falls')) return 'waterfall';
  if (value.includes('mountain') || value.includes('peak')) return 'mountain';
  if (value.includes('mission')) return 'mission';
  if (value.includes('battlefield')) return 'battlefield';
  if (value.includes('museum')) return 'museum';
  if (value.includes('historic') || value.includes('heritage') || value.includes('monument')) return 'historic-site';
  if (value.includes('courthouse')) return 'courthouse';
  if (value.includes('scenic') || value.includes('road-trip')) return 'scenic-drive';
  if (value.includes('rodeo')) return 'rodeo';
  if (value.includes('fair')) return 'fair';
  if (value.includes('festival')) return 'festival';
  if (value.includes('venue') || value.includes('stadium') || value.includes('arena')) return 'sports-venue';
  if (value.includes('city') || value.includes('town') || value.includes('community')) return 'city';
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

function relatedNames(rows: unknown, relationKey: string): string[] {
  return [...new Set(records(rows).map((item) => clean(record(item[relationKey]).name)).filter(Boolean))];
}

function relationships(row: ExploreGraphRow, countySlug?: string, regionSlug?: string) {
  const output: TexasEntityRecord['relationships'] = [];
  if (countySlug) output.push({ type: 'located-in-county', targetId: `county:${countySlug}`, sourceId: 'explore-shared-catalog' });
  if (regionSlug) output.push({ type: 'located-in-region', targetId: `region:${regionSlug}`, sourceId: 'explore-shared-catalog' });
  return output;
}

export function mapExploreRowToGraphEntity(row: ExploreGraphRow): TexasEntityRecord | null {
  const slug = slugify(row.slug || row.name);
  const name = clean(row.name);
  if (!slug || !name) return null;

  const kind = entityKind(row);
  const location = record(row.explore_locations);
  const source = records(row.explore_entity_sources)[0] ?? {};
  const county = clean(location.county || row.county);
  const regionName = clean(row.region_slug || row.region || row.region_name || row.geographic_region);
  const countySlug = slugify(county);
  const regionSlug = slugify(regionName);
  const latitude = Number(location.latitude ?? row.latitude ?? row.lat);
  const longitude = Number(location.longitude ?? row.longitude ?? row.lng ?? row.lon);
  const coordinates = Number.isFinite(latitude) && Number.isFinite(longitude) && !(latitude === 0 && longitude === 0)
    ? { latitude, longitude }
    : undefined;
  const officialUrl = clean(source.source_url || row.official_url || row.website_url || row.source_url) || undefined;
  const sourceCheckedAt = clean(source.verified_at || source.retrieved_at || row.source_checked_at || row.verified_at || row.updated_at) || undefined;
  const activityNames = relatedNames(row.explore_entity_activities, 'explore_activities');
  const amenityNames = relatedNames(row.explore_entity_amenities, 'explore_amenities');
  const tags = [...new Set([...activityNames, ...amenityNames, county, regionName].map(slugify).filter(Boolean))];

  return {
    id: `${kind}:${slug}`,
    kind,
    name,
    slug,
    aliases: aliases(row),
    description: clean(row.summary || row.short_description || row.long_description) || undefined,
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
    tags,
  };
}

export function hasRemoteExploreGraph(): boolean {
  return Boolean(supabaseUrl && supabaseKey);
}

async function fetchExploreGraphPage(params: URLSearchParams, offset: number, limit: number): Promise<ExploreGraphRow[]> {
  const pageParams = new URLSearchParams(params);
  pageParams.set('offset', String(offset));
  pageParams.set('limit', String(limit));
  const response = await fetch(`${supabaseUrl}/rest/v1/explore_entities?${pageParams}`, { headers: headers() });
  if (!response.ok) throw new Error(`Explore knowledge-graph request failed: ${response.status}`);
  const rows = await response.json();
  return Array.isArray(rows) ? rows : [];
}

export async function fetchExploreGraphEntities(options: { query?: string; limit?: number } = {}): Promise<TexasEntityRecord[]> {
  if (!hasRemoteExploreGraph()) return [];
  const requestedLimit = Math.min(options.limit ?? MAX_GRAPH_ENTITIES, MAX_GRAPH_ENTITIES);
  const params = new URLSearchParams({
    select: [
      '*',
      'explore_entity_types(key,name)',
      'explore_locations(city,county,latitude,longitude)',
      'explore_entity_sources(source_url,retrieved_at,verified_at)',
      'explore_entity_activities(explore_activities(key,name))',
      'explore_entity_amenities(explore_amenities(key,name))',
    ].join(','),
    visibility: 'eq.public',
    status: 'in.(published,verified)',
    order: 'featured.desc,popularity_score.desc,name.asc',
  });
  if (options.query?.trim()) {
    const cleanQuery = options.query.trim().replace(/[%_,()]/g, '');
    params.set('or', `(name.ilike.*${cleanQuery}*,slug.ilike.*${cleanQuery}*,summary.ilike.*${cleanQuery}*,short_description.ilike.*${cleanQuery}*,long_description.ilike.*${cleanQuery}*)`);
  }

  const rows: ExploreGraphRow[] = [];
  for (let offset = 0; offset < requestedLimit; offset += PAGE_SIZE) {
    const page = await fetchExploreGraphPage(params, offset, Math.min(PAGE_SIZE, requestedLimit - offset));
    rows.push(...page);
    if (page.length < PAGE_SIZE) break;
  }

  return rows.map(mapExploreRowToGraphEntity).filter((entity): entity is TexasEntityRecord => Boolean(entity));
}
