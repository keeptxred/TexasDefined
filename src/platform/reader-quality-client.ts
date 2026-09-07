import type { ReaderQualityReferrerClass, ReaderQualitySignals } from './reader-quality';

const SESSION_KEY = 'texasdefined:analytics-session';
const INTERNAL_BROWSER_KEY = 'texasdefined:reader-quality-internal';
const INGEST_PATH = '/api/reader-quality';
const MAX_INTERACTIONS = 500;

function safeStorage(): Storage | undefined {
  try { return window.localStorage; } catch { return undefined; }
}

function analyticsSessionId() {
  const storage = safeStorage();
  const existing = storage?.getItem(SESSION_KEY);
  if (existing) return existing;
  const created = globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  storage?.setItem(SESSION_KEY, created);
  return created;
}

function classifyReferrer(referrer: string, origin: string): ReaderQualityReferrerClass {
  if (!referrer) return 'direct';
  try {
    const referrerUrl = new URL(referrer);
    if (referrerUrl.origin === origin) return 'internal';
    const host = referrerUrl.hostname.toLowerCase().replace(/^www\./, '');
    if (/(^|\.)(google|bing|duckduckgo|yahoo)\./.test(host)) return 'search';
    if (/(^|\.)(chatgpt\.com|perplexity\.ai|claude\.ai|copilot\.microsoft\.com)$/.test(host)) return 'ai';
    if (/(^|\.)(facebook\.com|instagram\.com|x\.com|twitter\.com|tiktok\.com|reddit\.com)$/.test(host)) return 'social';
    return 'other';
  } catch {
    return 'unknown';
  }
}

function excludedBrowserOrPath(path = window.location.pathname) {
  const hostname = window.location.hostname.toLowerCase();
  if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '::1') return true;
  if (path === '/admin' || path.startsWith('/admin/')) return true;
  return safeStorage()?.getItem(INTERNAL_BROWSER_KEY) === '1';
}

export function installReaderQualitySignals() {
  if (typeof window === 'undefined' || excludedBrowserOrPath()) return;

  const sessionId = analyticsSessionId();
  const referrerClass = classifyReferrer(document.referrer, window.location.origin);
  let currentPath = window.location.pathname + window.location.search;
  let visibleMs = 0;
  let visibleSince = document.visibilityState === 'visible' ? performance.now() : undefined;
  let interactionCount = 0;
  let maxScrollPercent = 0;
  let signals: ReaderQualitySignals = {};
  let lastMilestone = '';

  const totalVisibleMs = () => visibleMs + (visibleSince == null ? 0 : Math.max(0, performance.now() - visibleSince));
  const snapshot = () => {
    const total = totalVisibleMs();
    return {
      sessionId,
      path: currentPath,
      occurredAt: new Date().toISOString(),
      visibleMs: Math.round(total),
      interactionCount,
      maxScrollPercent,
      referrerClass,
      signals: {
        ...signals,
        visible10s: total >= 10_000,
        visible30s: total >= 30_000,
        scroll50: maxScrollPercent >= 50,
        scroll90: maxScrollPercent >= 90,
      },
    };
  };

  const send = (reason: string, preferBeacon = false) => {
    if (excludedBrowserOrPath(currentPath.split('?')[0])) return;
    const body = JSON.stringify({ ...snapshot(), reason });
    if (preferBeacon && navigator.sendBeacon) {
      const sent = navigator.sendBeacon(INGEST_PATH, new Blob([body], { type: 'application/json' }));
      if (sent) return;
    }
    void fetch(INGEST_PATH, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body,
      keepalive: true,
      credentials: 'same-origin',
    }).catch(() => undefined);
  };

  const resetForPath = (path: string) => {
    if (path === currentPath) return;
    currentPath = path;
    visibleMs = 0;
    visibleSince = document.visibilityState === 'visible' ? performance.now() : undefined;
    interactionCount = 0;
    maxScrollPercent = 0;
    signals = {};
    lastMilestone = '';
  };

  const afterNavigation = () => window.setTimeout(() => resetForPath(window.location.pathname + window.location.search), 75);

  const markInteraction = (kind: 'pointer' | 'keyboard', event: Event) => {
    if (!event.isTrusted) return;
    interactionCount = Math.min(MAX_INTERACTIONS, interactionCount + 1);
    signals[kind] = true;
  };

  const onPointer = (event: PointerEvent) => markInteraction('pointer', event);
  const onKeyboard = (event: KeyboardEvent) => {
    if (event.metaKey || event.ctrlKey || event.altKey) return;
    markInteraction('keyboard', event);
  };

  let scrollFrame = 0;
  const onScroll = (event: Event) => {
    if (!event.isTrusted || scrollFrame) return;
    scrollFrame = window.requestAnimationFrame(() => {
      scrollFrame = 0;
      const root = document.documentElement;
      const scrollable = Math.max(1, root.scrollHeight - window.innerHeight);
      const percent = Math.max(0, Math.min(100, Math.round((window.scrollY / scrollable) * 100)));
      maxScrollPercent = Math.max(maxScrollPercent, percent);
    });
  };

  const onClick = (event: MouseEvent) => {
    if (!event.isTrusted) return;
    const anchor = (event.target as Element | null)?.closest('a[href]') as HTMLAnchorElement | null;
    if (!anchor) return;
    try {
      const destination = new URL(anchor.href, window.location.href);
      if (destination.origin === window.location.origin && destination.pathname !== window.location.pathname) {
        interactionCount = Math.min(MAX_INTERACTIONS, interactionCount + 1);
        signals.internalClick = true;
        send('internal_navigation', true);
        afterNavigation();
      }
    } catch {
      // Ignore malformed links; this signal is advisory only.
    }
  };

  const onVisibility = () => {
    if (document.visibilityState === 'hidden') {
      if (visibleSince != null) visibleMs += Math.max(0, performance.now() - visibleSince);
      visibleSince = undefined;
      if (visibleMs >= 10_000 || interactionCount > 0 || maxScrollPercent >= 50) send('visibility_hidden', true);
      return;
    }
    if (visibleSince == null) visibleSince = performance.now();
  };

  const onPopState = () => {
    send('history_navigation', true);
    afterNavigation();
  };

  window.setInterval(() => {
    const seconds = Math.floor(totalVisibleMs() / 1000);
    const milestone = seconds >= 120 ? '120s' : seconds >= 30 ? '30s' : seconds >= 10 ? '10s' : '';
    if (milestone && milestone !== lastMilestone) {
      lastMilestone = milestone;
      send(`visible_${milestone}`);
    }
  }, 2_000);

  document.addEventListener('pointerdown', onPointer, { passive: true });
  document.addEventListener('keydown', onKeyboard);
  document.addEventListener('scroll', onScroll, { passive: true });
  document.addEventListener('click', onClick, true);
  document.addEventListener('visibilitychange', onVisibility);
  window.addEventListener('pagehide', () => send('pagehide', true));
  window.addEventListener('popstate', onPopState);
}