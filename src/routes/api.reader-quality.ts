import { createFileRoute } from '@tanstack/react-router';
import {
  scoreReaderQuality,
  type ReaderQualityReferrerClass,
  type ReaderQualitySignals,
} from '@/platform/reader-quality';

const MAX_BODY_BYTES = 16_384;
const allowedReferrers = new Set<ReaderQualityReferrerClass>(['direct', 'internal', 'search', 'social', 'ai', 'other', 'unknown']);
const allowedSignalKeys: Array<keyof ReaderQualitySignals> = ['pointer', 'touch', 'keyboard', 'internalClick', 'scroll50', 'scroll90', 'visible10s', 'visible30s', 'focusReturn'];

type Input = {
  sessionId?: unknown;
  path?: unknown;
  occurredAt?: unknown;
  visibleMs?: unknown;
  interactionCount?: unknown;
  maxScrollPercent?: unknown;
  referrerClass?: unknown;
  signals?: unknown;
};

export const Route = createFileRoute('/api/reader-quality')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const requestUrl = new URL(request.url);
        const origin = request.headers.get('origin');
        if (origin && origin !== requestUrl.origin) return response({ ok: false, error: 'cross_origin_rejected' }, 403);
        const fetchSite = request.headers.get('sec-fetch-site');
        if (fetchSite && !['same-origin', 'same-site', 'none'].includes(fetchSite)) return response({ ok: false, error: 'cross_site_rejected' }, 403);

        const contentLength = Number(request.headers.get('content-length') ?? '0');
        if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) return response({ ok: false, error: 'payload_too_large' }, 413);

        const text = await request.text().catch(() => '');
        if (!text || text.length > MAX_BODY_BYTES) return response({ ok: false, error: text ? 'payload_too_large' : 'empty_payload' }, text ? 413 : 400);
        let body: Input;
        try { body = JSON.parse(text) as Input; } catch { return response({ ok: false, error: 'invalid_json' }, 400); }

        const sessionId = typeof body.sessionId === 'string' ? body.sessionId.trim() : '';
        const path = typeof body.path === 'string' ? body.path.trim() : '';
        const occurredAtRaw = typeof body.occurredAt === 'string' ? body.occurredAt : '';
        if (sessionId.length < 8 || sessionId.length > 128) return response({ ok: false, error: 'invalid_session' }, 400);
        if (!path.startsWith('/') || path.length > 500) return response({ ok: false, error: 'invalid_path' }, 400);

        const occurredAt = new Date(occurredAtRaw);
        if (!Number.isFinite(occurredAt.getTime())) return response({ ok: false, error: 'invalid_timestamp' }, 400);
        const ageMs = Date.now() - occurredAt.getTime();
        if (ageMs < -300_000 || ageMs > 172_800_000) return response({ ok: false, error: 'timestamp_out_of_range' }, 400);

        const snapshot = {
          visibleMs: integer(body.visibleMs, 0, 86_400_000),
          interactionCount: integer(body.interactionCount, 0, 500),
          maxScrollPercent: integer(body.maxScrollPercent, 0, 100),
          signals: normalizeSignals(body.signals),
        };
        const referrerClass = allowedReferrers.has(body.referrerClass as ReaderQualityReferrerClass)
          ? body.referrerClass as ReaderQualityReferrerClass
          : 'unknown';
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
          return response({ ok: false, error: 'storage_failed' }, 500);
        }
        return response({ ok: true, classification: quality.classification, qualityScore: quality.score }, 202);
      },
    },
  },
});

function response(body: unknown, status: number) {
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
  const part = (type: Intl.DateTimeFormatPartTypes) => parts.find((entry) => entry.type === type)?.value ?? '';
  return `${part('year')}-${part('month')}-${part('day')}`;
}
