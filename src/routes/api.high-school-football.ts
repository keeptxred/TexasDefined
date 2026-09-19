import { createFileRoute } from '@tanstack/react-router';

import { searchFootballPrograms } from '@/data/high-school-football/football-directory.server';

const RESPONSE_HEADERS = {
  'cache-control': 'private, no-store, max-age=0',
  'content-type': 'application/json; charset=utf-8',
  'referrer-policy': 'no-referrer',
  'x-robots-tag': 'noindex, nofollow',
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: RESPONSE_HEADERS });
}

function cleanParam(value: string | null, maxLength = 100) {
  if (!value) return '';
  return value.trim().replace(/\s+/g, ' ').slice(0, maxLength);
}

function cleanLimit(value: string | null) {
  const parsed = Number.parseInt(value ?? '', 10);
  return Number.isFinite(parsed) ? Math.min(Math.max(parsed, 1), 500) : 50;
}

export const Route = createFileRoute('/api/high-school-football')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const query = cleanParam(url.searchParams.get('q'));
        const county = cleanParam(url.searchParams.get('county'));
        const district = cleanParam(url.searchParams.get('district'));
        const limit = cleanLimit(url.searchParams.get('limit'));

        if (!query && !county && !district) {
          return json({ ok: false, error: 'Search by high school, ISD, city or county.' }, 400);
        }

        try {
          const result = await searchFootballPrograms({ query, county, district, limit });
          return json({
            ok: true,
            alignmentCycle: '2026-28',
            ...result,
            sources: {
              footballAlignment: 'University Interscholastic League 2026-28 football alignment',
              recentStateFinals: 'University Interscholastic League Football State Archives, 2018-2019 through 2025-2026',
              allTimeStateFinals: 'University Interscholastic League Football All-Time Appearances, supplemented by newer completed State Archives rows when needed',
              schoolDirectory: 'Texas Education Agency AskTED',
            },
          });
        } catch (error) {
          console.error('High-school football lookup failed', error);
          return json({
            ok: false,
            error: 'The football directory could not be loaded right now. Try the high-school name again shortly.',
          }, 502);
        }
      },
    },
  },
});
