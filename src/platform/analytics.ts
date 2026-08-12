import { classifyAIReferral } from './ai-referral';
import { recordInternalLinkExposure } from './internal-link-memory';

export type TexasDefinedOutcomeEvent =
  | 'resource_found'
  | 'resource_opened'
  | 'calculator_started'
  | 'calculator_completed'
  | 'journey_started'
  | 'journey_step_completed'
  | 'journey_completed'
  | 'official_resource_visited'
  | 'next_step_selected'
  | 'search_submitted'
  | 'assistant_submitted'
  | 'resource_saved'
  | 'internal_link_shown'
  | 'internal_link_clicked'
  | 'ai_referral_visit';

export type TexasDefinedAnalyticsPayload = {
  event: TexasDefinedOutcomeEvent;
  resourceId?: string;
  journeyId?: string;
  stepId?: string;
  query?: string;
  destination?: string;
  entityKind?: string;
  score?: number;
  sourcePlatform?: string;
  referrerHost?: string;
  detection?: string;
  occurredAt: string;
  path: string;
  sessionId: string;
};

const SESSION_KEY = 'texasdefined:analytics-session';
const QUEUE_KEY = 'texasdefined:analytics-queue';
const AI_REFERRAL_SESSION_KEY = 'texasdefined:ai-referral-recorded';
const MAX_QUEUE = 100;

function safeStorage(): Storage | undefined {
  try { return window.localStorage; } catch { return undefined; }
}

function safeSessionStorage(): Storage | undefined {
  try { return window.sessionStorage; } catch { return undefined; }
}

function sessionId() {
  const storage = safeStorage();
  const existing = storage?.getItem(SESSION_KEY);
  if (existing) return existing;
  const created = globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  storage?.setItem(SESSION_KEY, created);
  return created;
}

function readQueue(): TexasDefinedAnalyticsPayload[] {
  const raw = safeStorage()?.getItem(QUEUE_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.slice(-MAX_QUEUE) : [];
  } catch {
    return [];
  }
}

function writeQueue(queue: TexasDefinedAnalyticsPayload[]) {
  safeStorage()?.setItem(QUEUE_KEY, JSON.stringify(queue.slice(-MAX_QUEUE)));
}

export function trackTexasDefinedOutcome(
  event: TexasDefinedOutcomeEvent,
  details: Omit<Partial<TexasDefinedAnalyticsPayload>, 'event' | 'occurredAt' | 'path' | 'sessionId'> = {},
) {
  if (typeof window === 'undefined') return;
  const payload: TexasDefinedAnalyticsPayload = {
    event,
    ...details,
    occurredAt: new Date().toISOString(),
    path: window.location.pathname + window.location.search,
    sessionId: sessionId(),
  };
  const endpoint = import.meta.env.VITE_ANALYTICS_ENDPOINT as string | undefined;
  if (endpoint && navigator.sendBeacon) {
    const sent = navigator.sendBeacon(endpoint, new Blob([JSON.stringify(payload)], { type: 'application/json' }));
    if (sent) return;
  }
  writeQueue([...readQueue(), payload]);
}

export async function flushTexasDefinedAnalytics() {
  const endpoint = import.meta.env.VITE_ANALYTICS_ENDPOINT as string | undefined;
  if (!endpoint) return { sent: 0, remaining: readQueue().length };
  const queue = readQueue();
  if (!queue.length) return { sent: 0, remaining: 0 };
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ events: queue }),
      keepalive: true,
    });
    if (!response.ok) throw new Error(`Analytics endpoint returned ${response.status}`);
    writeQueue([]);
    return { sent: queue.length, remaining: 0 };
  } catch {
    return { sent: 0, remaining: queue.length };
  }
}

export function trackAIReferralVisit() {
  if (typeof window === 'undefined') return;
  const sessionStorage = safeSessionStorage();
  if (sessionStorage?.getItem(AI_REFERRAL_SESSION_KEY) === '1') return;

  const referral = classifyAIReferral(document.referrer, window.location.search);
  if (!referral) return;

  trackTexasDefinedOutcome('ai_referral_visit', {
    sourcePlatform: referral.platform,
    referrerHost: referral.referrerHost || 'not-provided',
    detection: referral.detection,
    destination: window.location.pathname,
  });
  sessionStorage?.setItem(AI_REFERRAL_SESSION_KEY, '1');
}

export function installTexasDefinedAnalytics() {
  if (typeof window === 'undefined') return () => undefined;
  const shown = new Set<string>();
  const click = (event: MouseEvent) => {
    const anchor = (event.target as Element | null)?.closest('a[href]') as HTMLAnchorElement | null;
    if (!anchor) return;
    const entityId = anchor.dataset.entityId;
    if (entityId) {
      recordInternalLinkExposure(entityId, 'click');
      trackTexasDefinedOutcome('internal_link_clicked', {
        resourceId: entityId,
        entityKind: anchor.dataset.entityKind,
        score: number(anchor.dataset.linkScore),
        destination: new URL(anchor.href, window.location.origin).pathname,
      });
      return;
    }
    const href = anchor.href;
    if (/^https:\/\//.test(href) && !href.startsWith(window.location.origin)) {
      trackTexasDefinedOutcome('official_resource_visited', { destination: href });
    }
  };

  const observer = 'IntersectionObserver' in window
    ? new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const anchor = entry.target as HTMLAnchorElement;
          const entityId = anchor.dataset.entityId;
          if (!entityId || shown.has(entityId)) continue;
          shown.add(entityId);
          recordInternalLinkExposure(entityId, 'impression');
          trackTexasDefinedOutcome('internal_link_shown', {
            resourceId: entityId,
            entityKind: anchor.dataset.entityKind,
            score: number(anchor.dataset.linkScore),
            destination: new URL(anchor.href, window.location.origin).pathname,
          });
          observer?.unobserve(anchor);
        }
      }, { threshold: 0.5 })
    : undefined;

  const observe = () => document.querySelectorAll<HTMLAnchorElement>('a[data-entity-id]').forEach((anchor) => observer?.observe(anchor));
  const mutation = observer ? new MutationObserver(observe) : undefined;
  document.addEventListener('click', click);
  observe();
  mutation?.observe(document.documentElement, { childList: true, subtree: true });
  trackAIReferralVisit();
  void flushTexasDefinedAnalytics();
  window.addEventListener('online', flushTexasDefinedAnalytics);

  return () => {
    document.removeEventListener('click', click);
    window.removeEventListener('online', flushTexasDefinedAnalytics);
    mutation?.disconnect();
    observer?.disconnect();
  };
}

function number(value: string | undefined) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}
