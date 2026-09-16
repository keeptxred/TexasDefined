import { createFileRoute } from '@tanstack/react-router';

const CENSUS_GEOCODER = 'https://geocoding.geo.census.gov/geocoder/geographies/onelineaddress';
const RESPONSE_HEADERS = {
  'cache-control': 'private, no-store, max-age=0',
  'content-type': 'application/json; charset=utf-8',
  'referrer-policy': 'no-referrer',
  'x-robots-tag': 'noindex, nofollow',
};

type CensusCounty = {
  COUNTY?: unknown;
  STATE?: unknown;
  NAME?: unknown;
};

type CensusAddressMatch = {
  matchedAddress?: unknown;
  geographies?: {
    Counties?: unknown;
  };
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: RESPONSE_HEADERS });
}

function cleanAddress(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const cleaned = value.trim().replace(/\s+/g, ' ');
  if (cleaned.length < 5 || cleaned.length > 100) return null;
  return cleaned;
}

function firstCounty(match: CensusAddressMatch | undefined): CensusCounty | null {
  const counties = match?.geographies?.Counties;
  if (!Array.isArray(counties) || counties.length === 0) return null;
  const county = counties[0];
  return county && typeof county === 'object' ? county as CensusCounty : null;
}

export const Route = createFileRoute('/api/find-my-county')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return json({ ok: false, error: 'Enter a complete street address.' }, 400);
        }

        const address = cleanAddress((body as { address?: unknown } | null)?.address);
        if (!address) {
          return json({ ok: false, error: 'Enter a complete street address of 100 characters or fewer.' }, 400);
        }

        const url = new URL(CENSUS_GEOCODER);
        url.searchParams.set('address', address);
        url.searchParams.set('benchmark', 'Public_AR_Current');
        url.searchParams.set('vintage', 'Current_Current');
        url.searchParams.set('layers', 'Counties');
        url.searchParams.set('format', 'json');

        try {
          const response = await fetch(url, {
            headers: { accept: 'application/json' },
            cache: 'no-store',
          });
          if (!response.ok) {
            return json({ ok: false, error: 'The Census address service is temporarily unavailable. Try again shortly.' }, 502);
          }

          const payload = await response.json() as {
            result?: { addressMatches?: unknown };
          };
          const matches = payload.result?.addressMatches;
          if (!Array.isArray(matches) || matches.length === 0) {
            return json({ ok: false, error: 'No Census address match was found. Check the street number, street name, city, state and ZIP code.' }, 404);
          }

          const match = matches[0] as CensusAddressMatch;
          const county = firstCounty(match);
          if (!county) {
            return json({ ok: false, error: 'The address matched, but county geography was not returned. Try the complete address including ZIP code.' }, 404);
          }

          const stateCode = typeof county.STATE === 'string' ? county.STATE : '';
          const countyCode = typeof county.COUNTY === 'string' ? county.COUNTY.padStart(3, '0') : '';
          if (stateCode !== '48') {
            return json({ ok: false, error: 'That address is outside Texas. This tool only returns Texas counties.' }, 422);
          }

          // Keep the governed county registry behind the server handler boundary so
          // the route module cannot pull the full Texas places dataset into the
          // protected browser bundle.
          const { TEXAS_COUNTIES } = await import('@/data/texas-places');
          const record = TEXAS_COUNTIES.find((candidate) => candidate.code === countyCode);
          if (!record) {
            return json({ ok: false, error: 'The county code returned by Census could not be matched to the Texas county directory.' }, 502);
          }

          return json({
            ok: true,
            countyName: record.name,
            countySlug: record.slug,
            countyFips: `48${record.code}`,
            matchedAddress: typeof match.matchedAddress === 'string' ? match.matchedAddress : address,
            countyUrl: `/county/${record.slug}`,
            officialCountyDirectoryUrl: record.officialDirectoryUrl,
            source: 'U.S. Census Bureau Geocoding Services',
          });
        } catch {
          return json({ ok: false, error: 'The Census address service could not be reached. Try again shortly.' }, 502);
        }
      },
    },
  },
});
