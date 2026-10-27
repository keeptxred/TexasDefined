import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

export const CUTOFF = '2026-11-01T05:00:00Z';
export const TARGETS = [
  'public/stay-affiliate-options.js',
  'src/components/sports/FootballFanOffers.tsx',
];

function substitute(source, pattern, replacement, label) {
  const matches = [...source.matchAll(new RegExp(pattern.source, pattern.flags.includes('g') ? pattern.flags : pattern.flags + 'g'))];
  if (matches.length !== 1) throw new Error('Motel 6 cleanup contract changed: ' + label + ' (' + matches.length + ')');
  return source.replace(pattern, replacement);
}

export function expireMotel6Special(staySource, footballSource, now = new Date()) {
  const time = now instanceof Date ? now.getTime() : Date.parse(String(now));
  if (!Number.isFinite(time)) throw new Error('Invalid UTC time');
  if (time < Date.parse(CUTOFF)) return { due: false, changed: false, staySource, footballSource };
  const stayHasPromo = staySource.includes('MOTEL6_HALLOWEEN_AID');
  const footballHasPromo = footballSource.includes('MOTEL6_HALLOWEEN_URL');
  if (!stayHasPromo && !footballHasPromo) {
    if ((staySource + footballSource).includes('Trip and Treat')) throw new Error('Orphan expired promotional copy');
    return { due: true, changed: false, staySource, footballSource };
  }
  if (stayHasPromo !== footballHasPromo) throw new Error('Partially expired: manual review needed');

  let stay = staySource;
  stay = substitute(stay, /  \/\/ Motel 6 approved CJ publisher-email creatives:[\s\S]*?  const MOTEL6_CAMPAIGN_END = Date\.parse\("2026-11-01T05:00:00Z"\);\n/,
    '  // Approved standard Motel 6 CJ creative; PID 101876465 is not account CID 8062457.\n  const MOTEL6_STANDARD_AID = "17198227";\n', 'stay campaign constants');
  stay = substitute(stay, /  function motel6CampaignActive\([\s\S]*?\n  }\n/, '', 'campaign clock');
  stay = substitute(stay, /^    if \(aid === MOTEL6_HALLOWEEN_AID\).*?\n/m, '', 'seasonal AID');
  stay = substitute(stay, /function createMotel6Link\(promo\)/, 'function createMotel6Link()', 'seasonal CTA function');
  stay = substitute(stay, /const label = promo \? "Motel 6 Halloween stay offers" : "Explore Motel 6 budget stays";/,
    'const label = "Explore Motel 6 budget stays";', 'seasonal CTA label');
  stay = substitute(stay, /link\.href = buildMotel6Link\(promo \? MOTEL6_HALLOWEEN_AID : MOTEL6_STANDARD_AID\);/,
    'link.href = buildMotel6Link(MOTEL6_STANDARD_AID);', 'seasonal CTA URL');
  stay = substitute(stay, /link\.dataset\.affiliatePlacement = promo \? "motel6-halloween-travel" : "motel6-budget-travel";/,
    'link.dataset.affiliatePlacement = "motel6-budget-travel";', 'seasonal CTA placement');
  stay = substitute(stay, /    if \(motel6Eligible\(\)\) {\n      const promo = motel6CampaignActive\(\);[\s\S]*?^    }\n/m,
    '    if (motel6Eligible()) actions.appendChild(createMotel6Link());\n', 'seasonal stay callout');
  stay = substitute(stay, /    if \(panel\.dataset\.motel6PromoCopy\) {[\s\S]*?^    }\n/m, '', 'retired note');
  stay = substitute(stay, /const motel6Mode = motel6Eligible\(\) \? \(motel6CampaignActive\(\) \? "halloween" : "standard"\) : "none";/,
    'const motel6Mode = motel6Eligible() ? "standard" : "none";', 'seasonal booking mode');
  stay = substitute(stay, /    \/\/ Automatically switch back to the ordinary creative at Halloween cutoff\.\n    const remaining = MOTEL6_CAMPAIGN_END - Date\.now\(\);\n    if \(remaining > 0\) window\.setTimeout\(scheduleSync, Math\.min\(remaining \+ 250, 2147483647\)\);\n/,
    '', 'seasonal browser timer');
  stay = substitute(stay, /^    motel6CampaignActive,\n/m, '', 'retired API');

  let football = footballSource;
  football = substitute(football, /^  const MOTEL6_HALLOWEEN_URL = buildCjAccountClick\('motel6-halloween', pathname\);\n/m, '', 'retired seasonal account link');
  football = substitute(football, /^import { useEffect, useState } from 'react';\n/m, '', 'retired React timer');
  football = substitute(football, /\/\/ September 21 standard CJ creative and October 26 Halloween promotion\.[\s\S]*?const MOTEL6_CAMPAIGN_END = Date\.parse\('2026-11-01T05:00:00Z'\);\n/,
    "// Approved evergreen Motel 6 CJ creative with TexasDefined property PID.\n", 'football campaign');
  football = substitute(football, /  const \[clientNow, setClientNow\] = useState\(0\);[\s\S]*?  const motel6Halloween = clientNow >= MOTEL6_CAMPAIGN_START && clientNow < MOTEL6_CAMPAIGN_END;\n/,
    '', 'football hydration timer');
  football = substitute(football, /              {motel6Halloween\n[\s\S]*?not guaranteed\."}/,
    '              Explore Motel 6 budget stays only after confirming the game location and date. Prices, property locations and availability are not guaranteed.', 'football seasonal disclaimer');
  football = substitute(football, /href={motel6Halloween \? MOTEL6_HALLOWEEN_URL : MOTEL6_STANDARD_URL}/,
    'href={MOTEL6_STANDARD_URL}', 'football seasonal link');
  football = substitute(football, /label: motel6Halloween \? 'Motel 6 Halloween offer' : 'Motel 6 budget stays'/,
    "label: 'Motel 6 budget stays'", 'football seasonal analytics');
  football = substitute(football, /{motel6Halloween \? 'Check Motel 6 Halloween offers ↗' : 'Compare Motel 6 stays ↗'}/,
    'Compare Motel 6 stays ↗', 'football seasonal CTA');

  if (/17371482|MOTEL6_CAMPAIGN_|MOTEL6_HALLOWEEN|Trip and Treat|motel6Halloween|motel6CampaignActive|Motel 6 Halloween/.test(stay + football)) {
    throw new Error('Expired seasonal creative or copy was not fully removed');
  }
  if (!stay.includes('buildMotel6Link(MOTEL6_STANDARD_AID)') ||
      !football.includes('href={MOTEL6_STANDARD_URL}') ||
      !football.includes('data-commercial-partner="motel6"')) {
    throw new Error('Evergreen Motel 6 promotion would be damaged');
  }
  return { due: true, changed: true, staySource: stay, footballSource: football };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const write = process.argv.includes('--write');
  const check = process.argv.includes('--check');
  if (write === check) throw new Error('Specify exactly one of --check or --write');
  const [stay, football] = TARGETS.map(path => readFileSync(path, 'utf8'));
  const result = expireMotel6Special(stay, football, new Date());
  if (write && result.changed) {
    writeFileSync(TARGETS[0], result.staySource);
    writeFileSync(TARGETS[1], result.footballSource);
  }
  console.log(JSON.stringify({ cutoff: CUTOFF, due: result.due, changed: result.changed, mode: write ? 'write' : 'check' }));
}
