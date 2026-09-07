import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';

export type ReaderQualityDaily = {
  date: string;
  ga4ActiveUsers: number | null;
  ga4Sessions: number | null;
  ga4Pageviews: number | null;
  observedQualitySessions: number;
  likelyGenuineReaders: number;
  engagedReaders: number;
  suspiciousSessions: number;
  averageQualityScore: number | null;
  qualityMeasured: boolean;
};

export type ReaderQualityDashboard = {
  generatedAt: string;
  windowDays: number;
  daily: ReaderQualityDaily[];
  latest: ReaderQualityDaily | null;
  topSuspiciousPaths: Array<{ path: string; sessions: number }>;
  likelyHumanReferrers: Array<{ referrerClass: string; sessions: number }>;
  privacy: {
    storesIpAddresses: false;
    storesNamesOrEmails: false;
    storesRawUserAgent: false;
    hashesSessionIdentifiers: true;
  };
};

const WINDOW_DAYS = 14;

type QualityEventRow = {
  metric_date?: unknown;
  session_hash?: unknown;
  path?: unknown;
  quality_score?: unknown;
  classification?: unknown;
  referrer_class?: unknown;
};

type DailyQualityRow = {
  metric_date?: unknown;
  observed_sessions?: unknown;
  likely_genuine_readers?: unknown;
  engaged_readers?: unknown;
  suspicious_sessions?: unknown;
  average_quality_score?: unknown;
};

type Ga4Row = {
  metric_date?: unknown;
  active_users?: unknown;
  sessions?: unknown;
  pageviews?: unknown;
};

export const getReaderQualityDashboard = createServerFn({ method: 'GET' })
  .inputValidator(z.object({ accessKey: z.string().min(20).max(200) }))
  .handler(async ({ data }): Promise<ReaderQualityDashboard> => {
    const [{ assertSportsPartnerAccess }, { supabaseAdmin }] = await Promise.all([
      import('@/data/sports-partner-leads.server'),
      import('@/integrations/supabase/client.server'),
    ]);
    await assertSportsPartnerAccess(data.accessKey);
    const client = supabaseAdmin as any;
    const dates = centralDateWindow(WINDOW_DAYS);
    const since = dates[0];

    const [qualityResult, ga4Result, eventResult] = await Promise.all([
      client
        .from('texasdefined_reader_quality_daily')
        .select('metric_date,observed_sessions,likely_genuine_readers,engaged_readers,suspicious_sessions,average_quality_score')
        .gte('metric_date', since)
        .order('metric_date', { ascending: true }),
      client
        .from('texasdefined_ga4_daily_traffic')
        .select('metric_date,active_users,sessions,pageviews')
        .gte('metric_date', since)
        .order('metric_date', { ascending: true }),
      client
        .from('texasdefined_reader_quality_events')
        .select('metric_date,session_hash,path,quality_score,classification,referrer_class')
        .gte('metric_date', since)
        .order('occurred_at', { ascending: true })
        .limit(10000),
    ]);

    if (qualityResult.error) throw new Error(`Reader-quality rollup could not be loaded: ${qualityResult.error.message}`);
    if (ga4Result.error) throw new Error(`GA4 daily rollup could not be loaded: ${ga4Result.error.message}`);
    if (eventResult.error) throw new Error(`Reader-quality detail could not be loaded: ${eventResult.error.message}`);

    const qualityByDate = new Map<string, DailyQualityRow>();
    for (const row of array<DailyQualityRow>(qualityResult.data)) qualityByDate.set(String(row.metric_date ?? ''), row);
    const ga4ByDate = new Map<string, Ga4Row>();
    for (const row of array<Ga4Row>(ga4Result.data)) ga4ByDate.set(String(row.metric_date ?? ''), row);

    const daily = dates.map((date): ReaderQualityDaily => {
      const quality = qualityByDate.get(date);
      const ga4 = ga4ByDate.get(date);
      const observed = whole(quality?.observed_sessions);
      return {
        date,
        ga4ActiveUsers: nullableWhole(ga4?.active_users),
        ga4Sessions: nullableWhole(ga4?.sessions),
        ga4Pageviews: nullableWhole(ga4?.pageviews),
        observedQualitySessions: observed,
        likelyGenuineReaders: whole(quality?.likely_genuine_readers),
        engagedReaders: whole(quality?.engaged_readers),
        suspiciousSessions: whole(quality?.suspicious_sessions),
        averageQualityScore: nullableNumber(quality?.average_quality_score),
        qualityMeasured: observed > 0,
      };
    });

    const strongest = strongestSessions(array<QualityEventRow>(eventResult.data));
    const suspiciousPaths = new Map<string, number>();
    const likelyReferrers = new Map<string, number>();
    for (const row of strongest.values()) {
      const score = whole(row.quality_score);
      const classification = String(row.classification ?? '');
      const path = cleanPath(row.path);
      if (classification === 'automation_suspected' && score <= 20 && path) {
        suspiciousPaths.set(path, (suspiciousPaths.get(path) ?? 0) + 1);
      }
      if (score >= 60) {
        const referrer = String(row.referrer_class ?? 'unknown');
        likelyReferrers.set(referrer, (likelyReferrers.get(referrer) ?? 0) + 1);
      }
    }

    const latest = [...daily].reverse().find((row) => row.ga4ActiveUsers != null || row.qualityMeasured) ?? null;
    return {
      generatedAt: new Date().toISOString(),
      windowDays: WINDOW_DAYS,
      daily,
      latest,
      topSuspiciousPaths: rankPaths(suspiciousPaths).slice(0, 10),
      likelyHumanReferrers: rankReferrers(likelyReferrers).slice(0, 10),
      privacy: {
        storesIpAddresses: false,
        storesNamesOrEmails: false,
        storesRawUserAgent: false,
        hashesSessionIdentifiers: true,
      },
    };
  });

function strongestSessions(rows: QualityEventRow[]) {
  const result = new Map<string, QualityEventRow>();
  for (const row of rows) {
    const date = String(row.metric_date ?? '');
    const session = String(row.session_hash ?? '');
    if (!date || !session) continue;
    const key = `${date}:${session}`;
    const existing = result.get(key);
    if (!existing || whole(row.quality_score) >= whole(existing.quality_score)) result.set(key, row);
  }
  return result;
}

function centralDateWindow(days: number) {
  const today = centralDate(new Date());
  const anchor = new Date(`${today}T12:00:00Z`);
  return Array.from({ length: days }, (_, index) => {
    const date = new Date(anchor);
    date.setUTCDate(anchor.getUTCDate() - (days - 1 - index));
    return date.toISOString().slice(0, 10);
  });
}

function centralDate(date: Date) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Chicago', year: 'numeric', month: '2-digit', day: '2-digit',
  }).formatToParts(date);
  const read = (type: 'year' | 'month' | 'day') => parts.find((part) => part.type === type)?.value ?? '';
  return `${read('year')}-${read('month')}-${read('day')}`;
}

function array<T>(value: unknown): T[] { return Array.isArray(value) ? value as T[] : []; }
function whole(value: unknown) { const parsed = Number(value); return Number.isFinite(parsed) ? Math.max(0, Math.round(parsed)) : 0; }
function nullableWhole(value: unknown) { if (value == null) return null; const parsed = Number(value); return Number.isFinite(parsed) ? Math.max(0, Math.round(parsed)) : null; }
function nullableNumber(value: unknown) { if (value == null) return null; const parsed = Number(value); return Number.isFinite(parsed) ? parsed : null; }
function cleanPath(value: unknown) { const path = String(value ?? ''); return path.startsWith('/') && path.length <= 500 ? path : ''; }
function rankPaths(map: Map<string, number>) { return [...map.entries()].map(([path, sessions]) => ({ path, sessions })).sort((left, right) => right.sessions - left.sessions || left.path.localeCompare(right.path)); }
function rankReferrers(map: Map<string, number>) { return [...map.entries()].map(([referrerClass, sessions]) => ({ referrerClass, sessions })).sort((left, right) => right.sessions - left.sessions || left.referrerClass.localeCompare(right.referrerClass)); }
