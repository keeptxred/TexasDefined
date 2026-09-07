import { createFileRoute } from '@tanstack/react-router';
import { loadTexasKnowledgeGraph } from '@/data/knowledge-graph';
import { resolveInternalEntityLinks } from '@/platform/internal-linking';
import type { ReaderQualityReferrerClass, ReaderQualitySignals } from '@/platform/reader-quality';

const READER_QUALITY_MODE = 'reader-quality';
const MAX_READER_QUALITY_BODY_BYTES = 16_384;
const allowedReferrers = new Set<ReaderQualityReferrerClass>(['direct', 'internal', 'search', 'social', 'ai', 'other', 'unknown']);
const allowedSignalKeys: Array<keyof ReaderQualitySignals> = ['pointer', 'touch', 'keyboard', 'internalClick', 'scroll50', 'scroll90', 'visible10s', 'visible30s', 'focusReturn'];

type ReaderQualityInput = {
  sessionId?: unknown;
  path?: unknown;
  occurredAt?: unknown;
  visibleMs?: unknown;
  interactionCount?: unknown;
  maxScrollPercent?: unknown;
  referrerClass?: unknown;
  signals?: unknown;
};

export const Route = createFileRoute('/api/internal-links')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        if (new URL(request.url).searchParams.get('mode') === READER_QUALITY_MODE) {
          return readerQualityResponse(request);
        }

        const body = await request.json().catch(() => null) as { text?: unknown; maxLinks?: unknown; excludedEntityIds?: unknown; entityExposureWeights?: unknown } | null;
        const text = typeof body?.text === 'string' ? body.text.trim() : '';
        if (!text) return Response.json({ error: 'A non-empty text field is required.' }, { status: 400 });
        if (text.length > 50000) return Response.json({ error: 'Text exceeds the 50,000-character preview limit.' }, { status: 413 });
        const graph = await loadTexasKnowledgeGraph();
        const maxLinks = Math.min(25, Math.max(1, Number(body?.maxLinks ?? 8) || 8));
        const excludedEntityIds = Array.isArray(body?.excludedEntityIds) ? body.excludedEntityIds.filter((value): value is string => typeof value === 'string').slice(0, 100) : [];
        const entityExposureWeights = normalizeExposureWeights(body?.entityExposureWeights);
        const result = resolveInternalEntityLinks(text, graph, { maxLinks, excludedEntityIds, entityExposureWeights });
        return Response.json({
          textLength: text.length,
          graphEntities: graph.length,
          exposureWeightsApplied: Object.keys(entityExposureWeights).length,
          diagnostics: result.diagnostics,
          matches: result.matches.map((match) => ({
            label: match.label,
            start: match.start,
            end: match.end,
            href: match.href,
            score: match.score,
            reasons: match.reasons,
            entity: { id: match.entity.id, kind: match.entity.kind, name: match.entity.name, sourceConfidence: match.entity.sourceConfidence },
          })),
        }, { headers: { 'cache-control': 'no-store', 'x-robots-tag': 'noindex, nofollow' } });
      },
    },
  },
});

async function readerQualityResponse(request: Request) {
  const requestUrl = new URL(request.url);
  const origin = request.headers.get('origin');
  if (origin && origin !== requestUrl.origin) return qualityJson({ ok: false, error: 'cross_origin_rejected' }, 403);
  const fetchSite = request.headers.get('sec-fetch-site');
  if (fetchSite && !['same-origin', 'same-site', 'none'].includes(fetchSite)) return qualityJson({ ok: false, error: 'cross_site_rejected' }, 403);

  const contentLength = Number(request.headers.get('content-length') ?? '0');
  if (Number.isFinite(contentLength) && contentLength > MAX_READER_QUALITY_BODY_BYTES) return qualityJson({ ok: false, error: 'payload_too_large' }, 413);

  const text = await request.text().catch(() => '');
  if (!text || text.length > MAX_READER_QUALITY_BODY_BYTES) return qualityJson({ ok: false, error: text ? 'payload_too_large' : 'empty_payload' }, text ? 413 : 400);
  let body: ReaderQualityInput;
  try { body = JSON.parse(text) as ReaderQualityInput; } catch { return qualityJson({ ok: false, error: 'invalid_json' }, 400); }

  const sessionId = typeof body.sessionId === 'string' ? body.sessionId.trim() : '';
  const path = typeof body.path === 'string' ? body.path.trim() : '';
  const occurredAtRaw = typeof body.occurredAt === 'string' ? body.occurredAt : '';
  if (sessionId.length < 8 || sessionId.length > 128) return qualityJson({ ok: false, error: 'invalid_session' }, 400);
  if (!path.startsWith('/') || path.length > 500) return qualityJson({ ok: false, error: 'invalid_path' }, 400);

  const occurredAt = new Date(occurredAtRaw);
  if (!Number.isFinite(occurredAt.getTime())) return qualityJson({ ok: false, error: 'invalid_timestamp' }, 400);
  const ageMs = Date.now() - occurredAt.getTime();
  if (ageMs < -300_000 || ageMs > 172_800_000) return qualityJson({ ok: false, error: 'timestamp_out_of_range' }, 400);

  const snapshot = {
    visibleMs: integer(body.visibleMs, 0, 86_400_000),
    interactionCount: integer(body.interactionCount, 0, 500),
    maxScrollPercent: integer(body.maxScrollPercent, 0, 100),
    signals: normalizeSignals(body.signals),
  };
  const referrerClass = allowedReferrers.has(body.referrerClass as ReaderQualityReferrerClass)
    ? body.referrerClass as ReaderQualityReferrerClass
    : 'unknown';
  const { scoreReaderQuality } = await import('@/platform/reader-quality');
  const quality = scoreReaderQuality(snapshot);
  const sessionHash = await sha256(sessionId);
  const signalCount = Object.values(snapshot.signals).filter(Boolean).length;

  const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
  const client = supabaseAdmin as any;
  const { error } = await client.from('texasdefined_reader_quality_events').insert({
    metric_date: chicagoDate(occurredAt),
    occurred_at: occurredAt.toISOString(),
    session_hash: sessionHash,
    path,
    quality_score: quality.score,
    classification: quality.classification,
    visible_ms: snapshot.visibleMs,
    interaction_count: snapshot.interactionCount,
    max_scroll_percent: snapshot.maxScrollPercent,
    signal_count: signalCount,
    referrer_class: referrerClass,
    signals: snapshot.signals,
  });
  if (error) {
    console.error('[reader-quality] storage failed', error.code ?? 'unknown');
    return qualityJson({ ok: false, error: 'storage_failed' }, 500);
  }
  return qualityJson({ ok: true, classification: quality.classification, qualityScore: quality.score }, 202);
}

function qualityJson(body: unknown, status: number) {
  return Response.json(body, {
    status,
    headers: {
      'cache-control': 'no-store',
      'x-robots-tag': 'noindex, nofollow, noarchive',
    },
  });
}

function integer(value: unknown, min: number, max: number) {
  const parsed = typeof value === 'number' ? value : Number(value);
  if (!Number.isFinite(parsed)) return min;
  return Math.max(min, Math.min(max, Math.round(parsed)));
}

function normalizeSignals(value: unknown): ReaderQualitySignals {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
  const source = value as Record<string, unknown>;
  return Object.fromEntries(allowedSignalKeys.map((key) => [key, source[key] === true])) as ReaderQualitySignals;
}

async function sha256(value: string) {
  const digest = await globalThis.crypto.subtle.digest('SHA-256', new TextEncoder().encode(value));
  return Array.from(new Uint8Array(digest)).map((byte) => byte.toString(16).padStart(2, '0')).join('');
}

function chicagoDate(date: Date) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Chicago',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date);
  const part = (type: 'year' | 'month' | 'day') => parts.find((entry) => entry.type === type)?.value ?? '';
  return `${part('year')}-${part('month')}-${part('day')}`;
}

function normalizeExposureWeights(value: unknown): Record<string, number> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
  return Object.fromEntries(Object.entries(value as Record<string, unknown>)
    .filter(([entityId, weight]) => entityId.length <= 160 && Number.isFinite(Number(weight)))
    .slice(0, 250)
    .map(([entityId, weight]) => [entityId, Math.min(4, Math.max(0, Number(weight)))]));
}
