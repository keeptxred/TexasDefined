import { readFileSync } from 'node:fs';

export const cjAccountRegistry = JSON.parse(readFileSync(new URL('../../src/data/cj-account-verified-links.json', import.meta.url), 'utf8'));

export function expectedCjPageSid(pathname) {
  const path = '/' + String(pathname).split('?')[0].replace(/^\/+|\/+$/g, '').toLowerCase();
  if (path === '/event/polar-express-palestine') return 'td_polar_palestine';
  const key = path.slice(1).replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '') || 'home';
  if (key.length <= 53) return 'td_' + key;
  let hash = 2166136261;
  for (const char of path) hash = Math.imul(hash ^ char.charCodeAt(0), 16777619) >>> 0;
  return 'td_' + key.slice(0, 47) + '_' + hash.toString(36).padStart(7, '0');
}

// Inspect hrefs only. Never fetch a CJ click URL from a verifier.
export function expectedCjAccountClick(program, pathname, destination) {
  const entry = cjAccountRegistry.links[program];
  if (!entry) throw new Error('Unapproved CJ program: ' + program);
  const target = destination ?? entry.destination;
  if (destination !== undefined && !entry.allowedDestinations.includes(target)) throw new Error('Unverified CJ destination');
  const url = new URL(entry.base);
  url.searchParams.set('sid', expectedCjPageSid(pathname));
  if (entry.includeDestination || target !== entry.destination) url.searchParams.set('url', target);
  return url.href;
}

export function expectedHotelsClick(pathname, destination = 'https://www.hotels.com/') {
  const url = new URL('https://www.anrdoezrs.net/click-101876465-15734399');
  url.searchParams.set('sid', expectedCjPageSid(pathname));
  url.searchParams.set('url', destination);
  return url.href;
}
