type EnvLike = Record<string, unknown> | undefined | null;

type EventOfferRow = {
  source_key: string;
  source_id?: string | null;
  external_id: string;
  title: string;
  description?: string | null;
  kind: 'event' | 'offer' | 'lodging' | 'attraction' | 'promo';
  category?: string | null;
  network: string;
  advertiser?: string | null;
  city?: string | null;
  region?: string | null;
  county?: string | null;
  venue?: string | null;
  lat?: number | null;
  long?: number | null;
  start_date?: string | null;
  start_at?: string | null;
  end_at?: string | null;
  price_label?: string | null;
  offer_label?: string | null;
  promo_code?: string | null;
  affiliate_url?: string | null;
  source_url?: string | null;
  image_url?: string | null;
  commission_status: 'preserved' | 'reduced' | 'zero' | 'unknown' | 'editorial';
  discount_preserves_commission?: boolean | null;
  is_discount: boolean;
  is_editorial_only: boolean;
  is_active: boolean;
  expires_at?: string | null;
  last_verified_at: string;
  tags: string[];
  raw_payload: Record<string, unknown>;
};

type SyncSourceSummary = {
  source: string;
  attempted: boolean;
  fetched: number;
  persisted: number;
  skipped: number;
  error?: string;
};

type OfferSourceSeed = {
  source_key: string;
  network: string;
  advertiser: string;
  source_label: string;
  fetch_strategy: string;
  is_active: boolean;
};

const DEFAULT_TICKETMASTER_IMPACT_BASE_URL =
  'https://ticketmaster.evyy.net/c/7758914/264167/4272?subId1=texasdefined&partnerpropertyid=8837726&MediaPartnerPropertyId=8837726';
const TICKETMASTER_ENDPOINT = 'https://app.ticketmaster.com/discovery/v2/events.json';
const CJ_LINK_SEARCH_ENDPOINT = 'https://link-search.api.cj.com/v2/link-search';
const IMPACT_API_BASE = 'https://api.impact.com';
const MAX_PUBLIC_ROWS = 500;
const MAX_SYNC_ROWS_PER_SOURCE = 250;

const OFFER_SOURCE_SEEDS: OfferSourceSeed[] = [
  {
    source_key: 'ticketmaster-impact',
    network: 'Impact',
    advertiser: 'Ticketmaster',
    source_label: 'Ticketmaster Texas events via Impact tracking',
    fetch_strategy: 'ticketmaster-discovery-api',
    is_active: true,
  },
  {
    source_key: 'cj-link-search',
    network: 'CJ',
    advertiser: 'CJ approved advertisers',
    source_label: 'CJ approved offer and content links',
    fetch_strategy: 'cj-link-search-api',
    is_active: true,
  },
  {
    source_key: 'impact-promotions',
    network: 'Impact',
    advertiser: 'Impact programs',
    source_label: 'Impact promotions and promo codes',
    fetch_strategy: 'impact-promotions-api',
    is_active: true,
  },
];

const TEXAS_CITY_HINTS = [
  'texas', 'tx', 'houston', 'dallas', 'austin', 'san antonio', 'fort worth', 'galveston', 'fredericksburg',
  'arlington', 'corpus christi', 'el paso', 'waco', 'lubbock', 'amarillo', 'mcallen', 'round rock', 'plano',
];

function envString(env: EnvLike, name: string): string {
  const direct = env && typeof env === 'object' ? env[name] : undefined;
  if (typeof direct === 'string' && direct.trim()) return direct.trim();
  const processValue = typeof process !== 'undefined' ? process.env?.[name] : undefined;
  return typeof processValue === 'string' ? processValue.trim() : '';
}

function optionalUrl(value: unknown): string | null {
  if (typeof value !== 'string' || !value.trim()) return null;
  try {
    const url = new URL(value.trim());
    if (!['http:', 'https:'].includes(url.protocol)) return null;
    url.hash = '';
    return url.toString();
  } catch {
    return null;
  }
}

function asText(value: unknown): string {
  if (typeof value === 'string') return value.trim();
  if (typeof value === 'number' || typeof value === 'boolean') return String(value);
  return '';
}

function truncate(value: string, max = 240): string {
  const normalized = value.replace(/\s+/g, ' ').trim();
  return normalized.length > max ? `${normalized.slice(0, max - 1).trim()}…` : normalized;
}

function compactTags(values: Array<unknown>): string[] {
  return [...new Set(values.map(asText).filter(Boolean).map((value) => value.toLowerCase().slice(0, 48)))].slice(0, 12);
}

async function shortHash(input: string): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(input));
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('').slice(0, 24);
}

function supabaseHeaders(serviceRoleKey: string, extra?: HeadersInit): Headers {
  const headers = new Headers(extra);
  headers.set('apikey', serviceRoleKey);
  if (!serviceRoleKey.startsWith('sb_secret_') && !serviceRoleKey.startsWith('sb_publishable_')) {
    headers.set('authorization', `Bearer ${serviceRoleKey}`);
  }
  return headers;
}

async function supabaseRequest<T>(env: EnvLike, path: string, init: RequestInit = {}): Promise<T> {
  const url = envString(env, 'SUPABASE_URL').replace(/\/$/, '');
  const key = envString(env, 'SUPABASE_SERVICE_ROLE_KEY');
  if (!url || !key) throw new Error('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required.');

  const response = await fetch(`${url}${path}`, {
    ...init,
    headers: supabaseHeaders(key, init.headers),
  });

  if (!response.ok) {
    const body = await response.text().catch(() => '');
    throw new Error(`Supabase ${response.status}: ${truncate(body || response.statusText, 500)}`);
  }

  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}

async function fetchJsonOrText(url: URL | string, init: RequestInit): Promise<unknown> {
  const response = await fetch(url, init);
  if (!response.ok) {
    const body = await response.text().catch(() => '');
    throw new Error(`HTTP ${response.status}: ${truncate(body || response.statusText, 300)}`);
  }
  const text = await response.text();
  if (!text.trim()) return null;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

function collectRecords(value: unknown, matcher: (record: Record<string, unknown>) => boolean, output: Record<string, unknown>[] = []): Record<string, unknown>[] {
  if (Array.isArray(value)) {
    for (const item of value) collectRecords(item, matcher, output);
    return output;
  }
  if (!value || typeof value !== 'object') return output;
  const record = value as Record<string, unknown>;
  if (matcher(record)) output.push(record);
  for (const child of Object.values(record)) collectRecords(child, matcher, output);
  return output;
}

function xmlRecords(text: string): Record<string, unknown>[] {
  const records: Record<string, unknown>[] = [];
  const linkBlocks = text.match(/<link\b[\s\S]*?<\/link>/gi) ?? [];
  for (const block of linkBlocks) {
    const field = (name: string) => {
      const match = block.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)<\\/${name}>`, 'i'));
      return match?.[1]?.replace(/<!\[CDATA\[|\]\]>/g, '').replace(/&amp;/g, '&').trim() ?? '';
    };
    records.push({
      linkName: field('link-name') || field('name'),
      advertiserName: field('advertiser-name'),
      clickUrl: field('click-url') || field('clickUrl'),
      description: field('description'),
      category: field('category'),
    });
  }
  return records;
}

function buildTicketmasterAffiliateUrl(officialUrl: string, baseUrl: string): string {
  const url = new URL(baseUrl || DEFAULT_TICKETMASTER_IMPACT_BASE_URL);
  url.searchParams.set('u', officialUrl);
  return url.toString();
}

async function fetchTicketmasterEventRows(env: EnvLike, now = new Date()): Promise<EventOfferRow[]> {
  const apiKey = envString(env, 'TICKETMASTER_API_KEY');
  if (!apiKey) return [];

  const start = new Date(now.getTime() - 60_000);
  const end = new Date(now.getTime() + 90 * 86400000);
  const url = new URL(TICKETMASTER_ENDPOINT);
  url.search = new URLSearchParams({
    apikey: apiKey,
    countryCode: 'US',
    stateCode: 'TX',
    locale: 'en-us',
    size: '200',
    page: '0',
    sort: 'date,asc',
    includeTBA: 'no',
    includeTBD: 'no',
    includeTest: 'no',
    startDateTime: start.toISOString().replace('.000', ''),
    endDateTime: end.toISOString().replace('.000', ''),
  }).toString();

  const payload = await fetchJsonOrText(url, { headers: { accept: 'application/json' } });
  const events = Array.isArray((payload as any)?._embedded?.events) ? (payload as any)._embedded.events : [];
  const trackingBase = envString(env, 'TICKETMASTER_IMPACT_BASE_URL') || DEFAULT_TICKETMASTER_IMPACT_BASE_URL;
  const verifiedAt = now.toISOString();

  return events.slice(0, MAX_SYNC_ROWS_PER_SOURCE).flatMap((event: any): EventOfferRow[] => {
    const venue = event?._embedded?.venues?.[0];
    const stateCode = venue?.state?.stateCode;
    const officialUrl = optionalUrl(event?.url);
    const localDate = asText(event?.dates?.start?.localDate);
    if (!event?.id || !event?.name || stateCode !== 'TX' || !officialUrl || !/^\d{4}-\d{2}-\d{2}$/.test(localDate)) return [];

    const publicSaleStart = asText(event?.sales?.public?.startDateTime);
    const saleStartedAt = publicSaleStart ? Date.parse(publicSaleStart) : NaN;
    const firstPublicOnsaleDay = Number.isFinite(saleStartedAt) && now.getTime() - saleStartedAt < 86400000;
    const startTime = asText(event?.dates?.start?.localTime);
    const startAt = startTime ? `${localDate}T${startTime}` : null;
    const image = Array.isArray(event?.images) ? event.images.find((item: any) => item?.url)?.url : null;
    const segment = asText(event?.classifications?.[0]?.segment?.name);
    const genre = asText(event?.classifications?.[0]?.genre?.name);

    return [{
      source_key: 'ticketmaster-impact',
      external_id: String(event.id),
      title: truncate(String(event.name), 180),
      description: segment && genre ? `${segment} · ${genre}` : segment || genre || 'Ticketmaster Texas event',
      kind: 'event',
      category: genre || segment || 'Events',
      network: 'Impact',
      advertiser: 'Ticketmaster',
      city: asText(venue?.city?.name) || null,
      region: 'TX',
      venue: asText(venue?.name) || null,
      lat: Number.isFinite(Number(venue?.location?.latitude)) ? Number(venue.location.latitude) : null,
      long: Number.isFinite(Number(venue?.location?.longitude)) ? Number(venue.location.longitude) : null,
      start_date: localDate,
      start_at: startAt,
      offer_label: firstPublicOnsaleDay ? 'Primary onsale — editorial only for first 24 hours' : 'Ticket availability',
      affiliate_url: firstPublicOnsaleDay ? null : buildTicketmasterAffiliateUrl(officialUrl, trackingBase),
      source_url: officialUrl,
      image_url: optionalUrl(image),
      commission_status: firstPublicOnsaleDay ? 'zero' : 'unknown',
      discount_preserves_commission: null,
      is_discount: false,
      is_editorial_only: firstPublicOnsaleDay,
      is_active: true,
      last_verified_at: verifiedAt,
      tags: compactTags(['ticketmaster', 'texas events', segment, genre, venue?.city?.name]),
      raw_payload: { id: event.id, status: event?.dates?.status?.code, publicSaleStart, source: 'ticketmaster-discovery' },
    }];
  });
}

async function fetchCjOfferRows(env: EnvLike, now = new Date()): Promise<EventOfferRow[]> {
  const token = envString(env, 'CJ_PERSONAL_ACCESS_TOKEN');
  const websiteId = envString(env, 'CJ_WEBSITE_ID');
  if (!token || !websiteId) return [];

  const url = new URL(CJ_LINK_SEARCH_ENDPOINT);
  url.search = new URLSearchParams({
    'website-id': websiteId,
    'records-per-page': '100',
    'link-type': 'Content Link',
  }).toString();

  const payload = await fetchJsonOrText(url, {
    headers: {
      accept: 'application/json, application/xml;q=0.8, text/xml;q=0.8',
      authorization: `Bearer ${token}`,
    },
  });
  const records = typeof payload === 'string'
    ? xmlRecords(payload)
    : collectRecords(payload, (record) => Boolean(record.clickUrl || record.clickURL || record.destination || record.linkUrl || record.linkCodeHtml));
  const verifiedAt = now.toISOString();
  const rows: EventOfferRow[] = [];

  for (const record of records.slice(0, MAX_SYNC_ROWS_PER_SOURCE)) {
    const rawUrl = record.clickUrl ?? record.clickURL ?? record.linkUrl ?? record.destination ?? record.href;
    const affiliateUrl = optionalUrl(rawUrl);
    if (!affiliateUrl) continue;
    const title = truncate(asText(record.linkName) || asText(record.name) || asText(record.title) || asText(record.advertiserName) || 'CJ approved offer');
    const advertiser = truncate(asText(record.advertiserName) || asText(record.advertiser) || 'CJ advertiser', 100);
    const description = truncate(asText(record.description) || asText(record.promotionDescription) || `${advertiser} affiliate offer`, 260);
    const searchable = `${title} ${advertiser} ${description}`.toLowerCase();
    const texasRelevant = TEXAS_CITY_HINTS.some((hint) => searchable.includes(hint));
    const externalId = asText(record.linkId) || asText(record.id) || await shortHash(`${advertiser}:${title}:${affiliateUrl}`);

    rows.push({
      source_key: 'cj-link-search',
      external_id: externalId,
      title,
      description,
      kind: texasRelevant ? 'attraction' : 'offer',
      category: truncate(asText(record.category) || asText(record.linkType) || 'Affiliate offer', 80),
      network: 'CJ',
      advertiser,
      offer_label: title,
      affiliate_url: affiliateUrl,
      source_url: optionalUrl(record.destinationUrl) || affiliateUrl,
      image_url: optionalUrl(record.imageUrl),
      commission_status: 'unknown',
      discount_preserves_commission: null,
      is_discount: /coupon|promo|discount|sale|save|%|\$\d+/i.test(`${title} ${description}`),
      is_editorial_only: false,
      is_active: true,
      last_verified_at: verifiedAt,
      tags: compactTags(['cj', advertiser, record.category, texasRelevant ? 'texas' : 'national']),
      raw_payload: { source: 'cj-link-search', linkId: record.linkId ?? record.id ?? null },
    });
  }

  return rows;
}

async function fetchImpactCollection(env: EnvLike, resource: 'Promotions' | 'PromoCodes'): Promise<Record<string, unknown>[]> {
  const sid = envString(env, 'IMPACT_ACCOUNT_SID');
  const token = envString(env, 'IMPACT_AUTH_TOKEN');
  if (!sid || !token) return [];
  const url = `${IMPACT_API_BASE}/Mediapartners/${encodeURIComponent(sid)}/${resource}?PageSize=100`;
  const payload = await fetchJsonOrText(url, {
    headers: {
      accept: 'application/json',
      authorization: `Basic ${btoa(`${sid}:${token}`)}`,
    },
  });
  return collectRecords(payload, (record) => Boolean(record.Id || record.id || record.PromoCode || record.Code || record.Name || record.Title));
}

async function fetchImpactOfferRows(env: EnvLike, now = new Date()): Promise<EventOfferRow[]> {
  const [promotions, promoCodes] = await Promise.all([
    fetchImpactCollection(env, 'Promotions'),
    fetchImpactCollection(env, 'PromoCodes'),
  ]);
  const verifiedAt = now.toISOString();
  const rows: EventOfferRow[] = [];

  for (const [resource, records] of [['Promotions', promotions], ['PromoCodes', promoCodes]] as const) {
    for (const record of records.slice(0, MAX_SYNC_ROWS_PER_SOURCE)) {
      const advertiser = truncate(asText(record.CampaignName) || asText(record.AdvertiserName) || asText(record.ProgramName) || 'Impact advertiser', 100);
      const title = truncate(asText(record.Name) || asText(record.Title) || asText(record.Description) || `${advertiser} ${resource === 'PromoCodes' ? 'promo code' : 'promotion'}`, 180);
      const code = asText(record.PromoCode) || asText(record.Code) || asText(record.CouponCode) || null;
      const url = optionalUrl(record.TrackingLink) || optionalUrl(record.TrackingUrl) || optionalUrl(record.Url) || optionalUrl(record.LandingPageUrl);
      const externalId = asText(record.Id) || asText(record.id) || await shortHash(`${resource}:${advertiser}:${title}:${code ?? ''}:${url ?? ''}`);
      const creditedPolicy = asText(record.CreditedPolicy || record.CreditingPolicy || record.WhenCredited).toUpperCase();
      const preservesCommission = creditedPolicy === 'ALWAYS' ? true : creditedPolicy === 'INVOLVED' ? null : null;

      if (!title || (!url && !code)) continue;
      rows.push({
        source_key: 'impact-promotions',
        external_id: `${resource.toLowerCase()}-${externalId}`,
        title,
        description: truncate(asText(record.Description) || asText(record.Terms) || `${advertiser} ${resource.toLowerCase()}`, 260),
        kind: resource === 'PromoCodes' ? 'promo' : 'offer',
        category: truncate(asText(record.Category) || asText(record.Type) || resource, 80),
        network: 'Impact',
        advertiser,
        offer_label: code ? `${title} — code ${code}` : title,
        promo_code: code,
        affiliate_url: url,
        source_url: optionalUrl(record.Url) || url,
        image_url: optionalUrl(record.ImageUrl) || optionalUrl(record.LogoUrl),
        commission_status: preservesCommission === true ? 'preserved' : 'unknown',
        discount_preserves_commission: preservesCommission,
        is_discount: Boolean(code) || /coupon|promo|discount|sale|save|%|\$\d+/i.test(title),
        is_editorial_only: false,
        is_active: true,
        expires_at: asText(record.EndDate) || asText(record.ExpirationDate) || null,
        last_verified_at: verifiedAt,
        tags: compactTags(['impact', advertiser, resource, record.Category]),
        raw_payload: { source: `impact-${resource.toLowerCase()}`, id: record.Id ?? record.id ?? null, creditedPolicy: creditedPolicy || null },
      });
    }
  }

  return rows;
}

async function ensureOfferSources(env: EnvLike): Promise<Map<string, string>> {
  await supabaseRequest(env, '/rest/v1/texasdefined_offer_sources?on_conflict=source_key', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      prefer: 'resolution=merge-duplicates,return=representation',
    },
    body: JSON.stringify(OFFER_SOURCE_SEEDS),
  });

  const params = new URLSearchParams({ select: 'id,source_key', source_key: `in.(${OFFER_SOURCE_SEEDS.map((source) => source.source_key).join(',')})` });
  const rows = await supabaseRequest<Array<{ id: string; source_key: string }>>(env, `/rest/v1/texasdefined_offer_sources?${params}`);
  return new Map(rows.map((row) => [row.source_key, row.id]));
}

async function persistRows(env: EnvLike, rows: EventOfferRow[]): Promise<number> {
  if (!rows.length) return 0;
  const sourceIds = await ensureOfferSources(env);
  const enriched = rows.map((row) => ({
    ...row,
    source_id: sourceIds.get(row.source_key) ?? row.source_id ?? null,
    updated_at: new Date().toISOString(),
  }));

  const persisted = await supabaseRequest<unknown[]>(env, '/rest/v1/texasdefined_event_offers?on_conflict=source_key,external_id', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      prefer: 'resolution=merge-duplicates,return=representation',
    },
    body: JSON.stringify(enriched),
  });
  return Array.isArray(persisted) ? persisted.length : enriched.length;
}

async function syncOne(source: string, fetcher: () => Promise<EventOfferRow[]>, env: EnvLike): Promise<SyncSourceSummary> {
  try {
    const rows = await fetcher();
    const persisted = await persistRows(env, rows);
    return { source, attempted: true, fetched: rows.length, persisted, skipped: 0 };
  } catch (error) {
    return {
      source,
      attempted: true,
      fetched: 0,
      persisted: 0,
      skipped: 0,
      error: error instanceof Error ? error.message : 'Unknown sync error',
    };
  }
}

export async function syncTexasDefinedEventOffers(env: EnvLike, reason = 'manual') {
  const startedAt = new Date();
  const summaries = await Promise.all([
    syncOne('ticketmaster-impact', () => fetchTicketmasterEventRows(env, startedAt), env),
    syncOne('cj-link-search', () => fetchCjOfferRows(env, startedAt), env),
    syncOne('impact-promotions', () => fetchImpactOfferRows(env, startedAt), env),
  ]);

  const totalPersisted = summaries.reduce((sum, summary) => sum + summary.persisted, 0);
  const errors = summaries.filter((summary) => summary.error);
  return {
    ok: totalPersisted > 0 && errors.length < summaries.length,
    reason,
    startedAt: startedAt.toISOString(),
    finishedAt: new Date().toISOString(),
    totalPersisted,
    summaries,
  };
}

export async function readTexasDefinedEventOffers(env: EnvLike, requestUrl: string) {
  const url = new URL(requestUrl);
  const limit = Math.max(1, Math.min(Number(url.searchParams.get('limit') ?? 80) || 80, MAX_PUBLIC_ROWS));
  const params = new URLSearchParams({
    select: 'id,source_key,external_id,title,description,kind,category,network,advertiser,city,region,county,venue,start_date,start_at,end_at,price_label,offer_label,promo_code,affiliate_url,source_url,image_url,commission_status,discount_preserves_commission,is_discount,is_editorial_only,expires_at,last_verified_at,tags',
    is_active: 'eq.true',
    order: 'start_date.asc.nullslast,last_verified_at.desc',
    limit: String(MAX_PUBLIC_ROWS),
  });
  const rows = await supabaseRequest<Array<Record<string, unknown>>>(env, `/rest/v1/texasdefined_event_offers?${params}`);

  const q = (url.searchParams.get('q') ?? '').trim().toLowerCase();
  const city = (url.searchParams.get('city') ?? '').trim().toLowerCase();
  const category = (url.searchParams.get('category') ?? '').trim().toLowerCase();
  const network = (url.searchParams.get('network') ?? '').trim().toLowerCase();
  const commissionSafeOnly = url.searchParams.get('commissionSafeOnly') === '1';
  const discountsOnly = url.searchParams.get('discountsOnly') === '1';

  const filtered = rows.filter((row) => {
    if (q) {
      const haystack = [row.title, row.description, row.advertiser, row.city, row.venue, row.category, ...(Array.isArray(row.tags) ? row.tags : [])]
        .map(asText)
        .join(' ')
        .toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    if (city && asText(row.city).toLowerCase() !== city) return false;
    if (category && asText(row.category).toLowerCase() !== category) return false;
    if (network && asText(row.network).toLowerCase() !== network) return false;
    if (commissionSafeOnly && row.commission_status !== 'preserved') return false;
    if (discountsOnly && row.is_discount !== true) return false;
    return true;
  }).slice(0, limit);

  return {
    ok: true,
    generatedAt: new Date().toISOString(),
    filters: { q, city, category, network, commissionSafeOnly, discountsOnly, limit },
    count: filtered.length,
    results: filtered,
  };
}

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
    },
  });
}

function authorizedSyncRequest(request: Request, env: EnvLike): boolean {
  const configured = envString(env, 'EVENT_OFFERS_SYNC_TOKEN');
  if (!configured) return false;
  const header = request.headers.get('x-texasdefined-sync-token') || request.headers.get('authorization')?.replace(/^Bearer\s+/i, '');
  return Boolean(header && header === configured);
}

export async function texasDefinedEventOffersResponse(request: Request, env: EnvLike): Promise<Response | null> {
  const url = new URL(request.url);
  if (url.pathname === '/api/texasdefined/event-offers' && request.method === 'GET') {
    try {
      return jsonResponse(await readTexasDefinedEventOffers(env, request.url));
    } catch (error) {
      return jsonResponse({ ok: false, error: error instanceof Error ? error.message : 'Event offers could not be loaded.' }, 500);
    }
  }

  if (url.pathname === '/api/texasdefined/event-offers/sync' && request.method === 'POST') {
    if (!authorizedSyncRequest(request, env)) {
      return jsonResponse({ ok: false, error: 'Event offer sync is not configured for manual HTTP access.' }, 403);
    }
    return jsonResponse(await syncTexasDefinedEventOffers(env, 'manual-http'));
  }

  return null;
}
