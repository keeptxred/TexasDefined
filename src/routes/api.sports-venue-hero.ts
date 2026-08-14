import { createFileRoute } from '@tanstack/react-router';

import { findCompleteTexasEntity } from '@/data/knowledge-graph';
import { getSportsVenueEnrichmentAll } from '@/data/sports-venue-enrichment-all';

const publicHeaders = {
  'content-type': 'image/svg+xml; charset=utf-8',
  'cache-control': 'public, max-age=86400, stale-while-revalidate=604800',
  'x-robots-tag': 'noindex, follow',
};

export const Route = createFileRoute('/api/sports-venue-hero')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const slug = url.searchParams.get('slug')?.trim().toLowerCase();
        if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return new Response('Not found', { status: 404 });

        const lookupSlug = slug === 'galaxy-stadium' ? 'jones-att-stadium' : slug;
        const entity = await findCompleteTexasEntity(lookupSlug);
        const enrichment = getSportsVenueEnrichmentAll(lookupSlug);
        if (!entity || entity.kind !== 'sports-venue' || !enrichment) return new Response('Not found', { status: 404 });

        const tags = new Set(entity.tags ?? []);
        const kind = venueVisualKind(tags, enrichment.primaryEvents);
        const currentName = lookupSlug === 'jones-att-stadium' ? 'Galaxy Stadium' : entity.name;
        return new Response(renderVenueHero({
          name: currentName,
          city: enrichment.city,
          kind,
          imageBrief: enrichment.imageBrief,
        }), { headers: publicHeaders });
      },
    },
  },
});

type VenueVisualKind = 'stadium' | 'ballpark' | 'arena' | 'motorsports' | 'golf' | 'western' | 'surf';

function venueVisualKind(tags: Set<string>, primaryEvents: readonly string[]): VenueVisualKind {
  const haystack = [...tags, ...primaryEvents].join(' ').toLowerCase();
  if (/surf|wave-pool|waterpark/.test(haystack)) return 'surf';
  if (/golf|pga/.test(haystack)) return 'golf';
  if (/nascar|formula|motogp|race|speedway|motorsport|circuit/.test(haystack)) return 'motorsports';
  if (/rodeo|equestrian|western|livestock/.test(haystack)) return 'western';
  if (/baseball|ballpark/.test(haystack)) return 'ballpark';
  if (/basketball|hockey|arena|indoor/.test(haystack)) return 'arena';
  return 'stadium';
}

function renderVenueHero({ name, city, kind, imageBrief }: { name: string; city: string; kind: VenueVisualKind; imageBrief: string }) {
  const safeName = escapeXml(name);
  const safeCity = escapeXml(city);
  const safeBrief = escapeXml(imageBrief);
  const art = visual(kind);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900" role="img" aria-labelledby="title desc">
  <title id="title">${safeName} — TexasDefined editorial illustration</title>
  <desc id="desc">${safeBrief}</desc>
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#efe7d8"/><stop offset="1" stop-color="#d8cbb7"/></linearGradient>
    <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#315449"/><stop offset="1" stop-color="#17372f"/></linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="18" stdDeviation="22" flood-opacity="0.18"/></filter>
  </defs>
  <rect width="1600" height="900" fill="url(#sky)"/>
  <circle cx="1320" cy="165" r="92" fill="#c86f4a" opacity="0.92"/>
  <path d="M0 610 C260 545 440 650 705 588 C980 524 1190 604 1600 530 L1600 900 L0 900 Z" fill="url(#ground)"/>
  <g opacity="0.18" fill="none" stroke="#17372f" stroke-width="3"><path d="M80 154 H1520"/><path d="M80 196 H1520"/><path d="M80 238 H1520"/></g>
  <g filter="url(#shadow)">${art}</g>
  <rect x="92" y="86" width="246" height="42" fill="#17372f" rx="2"/>
  <text x="112" y="114" fill="#f8f3ea" font-family="Arial, sans-serif" font-size="20" letter-spacing="4">TEXASDEFINED</text>
  <text x="92" y="714" fill="#f8f3ea" font-family="Georgia, serif" font-size="64" font-weight="700">${safeName}</text>
  <text x="96" y="766" fill="#e7ded1" font-family="Arial, sans-serif" font-size="27" letter-spacing="2">${safeCity.toUpperCase()}, TEXAS · SPORTS VENUE GUIDE</text>
  <text x="96" y="824" fill="#d6c9b8" font-family="Arial, sans-serif" font-size="18">Original TexasDefined editorial illustration · no venue logos or sponsor marks</text>
</svg>`;
}

function visual(kind: VenueVisualKind) {
  if (kind === 'motorsports') return `<g transform="translate(265 250)"><ellipse cx="535" cy="270" rx="455" ry="210" fill="#f6f0e6" stroke="#17372f" stroke-width="34"/><ellipse cx="535" cy="270" rx="335" ry="120" fill="#315449" stroke="#c86f4a" stroke-width="18"/><path d="M80 270 H990" stroke="#17372f" stroke-width="10" stroke-dasharray="24 18"/><path d="M790 30 L860 240" stroke="#17372f" stroke-width="20"/><circle cx="802" cy="26" r="34" fill="#c86f4a"/></g>`;
  if (kind === 'golf') return `<g transform="translate(245 245)"><path d="M80 370 C260 210 400 440 610 265 C770 130 875 235 1040 120 L1040 450 L80 450 Z" fill="#6b8064"/><path d="M450 275 C545 235 635 250 730 295 C620 340 520 350 450 275 Z" fill="#e9dfc6"/><path d="M820 100 V300" stroke="#17372f" stroke-width="11"/><path d="M820 100 L920 142 L820 180 Z" fill="#c86f4a"/><ellipse cx="820" cy="310" rx="95" ry="30" fill="#25483e"/></g>`;
  if (kind === 'western') return `<g transform="translate(275 255)"><path d="M100 390 V120 H960 V390" fill="#d8c4a5" stroke="#17372f" stroke-width="28"/><path d="M180 120 V390 M880 120 V390" stroke="#17372f" stroke-width="18"/><ellipse cx="530" cy="350" rx="260" ry="86" fill="#a56f45"/><path d="M355 345 Q530 215 705 345" fill="none" stroke="#f5eadb" stroke-width="18"/><circle cx="530" cy="300" r="34" fill="#c86f4a"/></g>`;
  if (kind === 'surf') return `<g transform="translate(245 245)"><path d="M80 370 C220 180 400 185 520 325 C665 500 770 105 1060 255 C880 235 800 490 555 455 C360 428 265 305 80 370 Z" fill="#6f9ea0" stroke="#17372f" stroke-width="18"/><path d="M500 348 Q640 210 790 325" fill="none" stroke="#f8f3ea" stroke-width="24"/><circle cx="658" cy="270" r="25" fill="#c86f4a"/></g>`;
  if (kind === 'ballpark') return `<g transform="translate(285 240)"><path d="M115 400 L505 95 L895 400 Z" fill="#d9c9ad" stroke="#17372f" stroke-width="26"/><path d="M505 155 L765 400 H245 Z" fill="#6c865d"/><path d="M505 225 L640 400 H370 Z" fill="#b47c50"/><path d="M505 225 V92" stroke="#17372f" stroke-width="12"/><circle cx="505" cy="220" r="18" fill="#f7f0e6"/></g>`;
  if (kind === 'arena') return `<g transform="translate(255 250)"><path d="M120 390 Q160 115 550 95 Q940 115 980 390 Z" fill="#d5c7b2" stroke="#17372f" stroke-width="30"/><path d="M230 280 H870" stroke="#c86f4a" stroke-width="22"/><path d="M300 185 H800" stroke="#17372f" stroke-width="14"/><rect x="430" y="310" width="240" height="80" fill="#25483e"/></g>`;
  return `<g transform="translate(245 235)"><path d="M90 405 Q155 145 540 115 Q925 145 990 405 Z" fill="#d7c7ad" stroke="#17372f" stroke-width="30"/><path d="M170 405 Q225 235 540 215 Q855 235 910 405 Z" fill="#315449"/><ellipse cx="540" cy="395" rx="250" ry="72" fill="#7f925f"/><path d="M280 188 H800 M240 250 H840" stroke="#c86f4a" stroke-width="18"/><rect x="470" y="300" width="140" height="105" fill="#c3a477"/></g>`;
}

function escapeXml(value: string) {
  return value.replace(/[<>&'\"]/g, (character) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[character] ?? character);
}
