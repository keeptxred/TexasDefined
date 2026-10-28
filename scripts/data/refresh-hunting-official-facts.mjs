import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

export const FACTS_FILE = 'src/data/hunting/public-access-facts.json';
export const OFFICIAL_URLS = Object.freeze({
  access: 'https://tpwd.texas.gov/huntwild/hunt/public/annual_public_hunting/',
  changes: 'https://tpwd.texas.gov/regulations/outdoor-annual/hunting/new-this-year-hunting',
  seasons: 'https://tpwd.texas.gov/regulations/outdoor-annual/hunting/2026-2027-hunting-season-dates',
  hogs: 'https://tpwd.texas.gov/regulations/outdoor-annual/hunting/nongame-and-other-species/',
  areaSearch: 'https://tpwd.texas.gov/huntwild/hunt/public/annual_public_hunting/search.phtml',
});

export function visibleText(html) {
  return html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&(?:nbsp|#160);/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&(?:ndash|mdash|minus|#8211|#8212);/gi, '-')
    .replace(/[–—−]/g, '-')
    .replace(/\s+/g, ' ').trim();
}

export function parsePermitFacts(html) {
  const body = visibleText(html);
  if (body.length < 1500 || !/Annual Public Hunting Permit\s*\/\s*Walk-in Hunts/i.test(body)) {
    throw new Error('Official APH source lacks an identifiable public-hunting page; do not update.');
  }
  const year = body.match(/Annual Public Hunting Permit\s*\/\s*Walk-in Hunts\s*(20\d\d)\s*-\s*(\d\d)/i);
  const aph = body.match(/\$\s*(\d{1,3})\s+Annual Public Hunting\s*(?:\(APH\)\s*)?Permit/i);
  const lpu = body.match(/\$\s*(\d{1,3})\s+Limited Public Use\s*(?:\(LPU\)\s*)?Permit/i);
  if (!year || !aph || !lpu) throw new Error('Official APH season/permit prices could not be unambiguously verified; do not update.');
  const seasonYear = `${year[1]}–${year[2]}`;
  const aphPermitUsd = Number(aph[1]);
  const limitedPublicUsePermitUsd = Number(lpu[1]);
  if (aphPermitUsd < 15 || aphPermitUsd > 150 || limitedPublicUsePermitUsd < 5 || limitedPublicUsePermitUsd >= aphPermitUsd) {
    throw new Error('Official permit amounts violate conservative plausibility limits; manual source review required.');
  }
  return { seasonYear, aphPermitUsd, limitedPublicUsePermitUsd };
}

export function checkOtherOfficialSources(sourceHtml, seasonYear) {
  const changes = visibleText(sourceHtml.changes);
  const seasons = visibleText(sourceHtml.seasons);
  const hogs = visibleText(sourceHtml.hogs);
  const areaSearch = visibleText(sourceHtml.areaSearch);
  const required = [
    [changes, ['Doe Days', '21 counties', 'Special White-winged Dove Days', 'Matagorda', 'Wharton', 'unbearded'], '2026 season change notice'],
    [seasons, ['Hunting Season Dates', 'Dove', 'Duck', 'Turkey', seasonYear.slice(0, 4), '20' + seasonYear.slice(-2), 'Nov. 8, 2026', 'Jan. 7, 2027', 'Oct. 25, 2026', 'Dec. 11, 2026', 'Jan. 14, 2027', 'Jan. 21, 2027'], 'TPWD season tables and 2026–27 dove-zone dates'],
    [hogs, ['Feral Hogs', 'Hunter Education', 'No hunting license is required to hunt feral hogs on private'], 'feral hog license exception'],
    [areaSearch, ['Search for an Area or Legal Game', 'Legal Game', 'Public Hunting'], 'public hunt legal-game search'],
  ];
  for (const [text, markers, label] of required) {
    if (text.length < 500) throw new Error(label + ' returned unexpectedly short content.');
    const missing = markers.filter(marker => !text.toLowerCase().includes(marker.toLowerCase()));
    if (missing.length) throw new Error(label + ' changed or is unavailable: ' + missing.join(', ') + '. Stop automatic updates and review TPWD.');
  }
}

export function reconcile(existing, verified, date) {
  if (!/^20\d\d[–-]\d\d$/.test(existing.seasonYear) || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    throw new Error('Invalid governed source metadata.');
  }
  if (existing.seasonYear.replace('–', '-') !== verified.seasonYear.replace('–', '-')) {
    throw new Error('TPWD season-year rollover detected: ' + verified.seasonYear + '. County, species, and public-hunt content require a coordinated editorial release; do not silently relabel 2026 rules.');
  }
  if (existing.aphPermitUsd === verified.aphPermitUsd && existing.limitedPublicUsePermitUsd === verified.limitedPublicUsePermitUsd) {
    return null;
  }
  if (existing.source !== OFFICIAL_URLS.access) throw new Error('Official source identity changed; refuse to update.');
  return { ...existing, aphPermitUsd: verified.aphPermitUsd, limitedPublicUsePermitUsd: verified.limitedPublicUsePermitUsd, lastFactVerification: date };
}

async function fetchOfficial(url) {
  const response = await fetch(url, {
    headers: { 'user-agent': 'TexasDefined-hunting-official-facts-monitor/1.0 (noncommercial editorial source check)' },
    signal: AbortSignal.timeout(25000),
  });
  if (!response.ok || new URL(response.url).hostname !== 'tpwd.texas.gov') {
    throw new Error('Official TPWD source fetch failed or redirected off-domain: ' + url + ' (' + response.status + ')');
  }
  return response.text();
}

export async function main() {
  const baseline = JSON.parse(fs.readFileSync(FACTS_FILE, 'utf8'));
  const entries = await Promise.all(Object.entries(OFFICIAL_URLS).map(async ([key,url]) => [key, await fetchOfficial(url)]));
  const pages = Object.fromEntries(entries);
  const observed = parsePermitFacts(pages.access);
  checkOtherOfficialSources(pages, baseline.seasonYear);
  const updated = reconcile(baseline, observed, new Date().toISOString().slice(0,10));
  if (updated && process.argv.includes('--write')) {
    fs.writeFileSync(FACTS_FILE, JSON.stringify(updated, null, 2) + '\n');
    console.log('Verified APH/LPU source-backed permit prices changed; protected GitHub PR required.');
  } else if (updated) {
    console.log('Official permit amounts changed. Run --write within the scheduled GitHub PR workflow.');
    process.exitCode = 1;
  } else {
    console.log('TPWD APH/LPU amounts and watched hunting rule markers match official source. No editorial or freshness date changes made.');
  }
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  main().catch(error => { console.error(error.message); process.exitCode = 1; });
}
