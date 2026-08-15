import fs from 'node:fs';

const dataPath = 'src/data/texas-symbols.ts';
const hubPath = 'src/routes/texas-symbols.lazy.tsx';
const profilePath = 'src/routes/texas-symbols.$slug.lazy.tsx';
const routePath = 'src/routes/texas-symbols.tsx';
const profileRoutePath = 'src/routes/texas-symbols.$slug.tsx';

const data = fs.readFileSync(dataPath, 'utf8');
const hub = fs.readFileSync(hubPath, 'utf8');
const profile = fs.readFileSync(profilePath, 'utf8');
const route = fs.readFileSync(routePath, 'utf8');
const profileRoute = fs.readFileSync(profileRoutePath, 'utf8');

function fail(message) {
  console.error(`Texas Symbols validation failed: ${message}`);
  process.exitCode = 1;
}

function assert(condition, message) {
  if (!condition) fail(message);
}

const entries = [...data.matchAll(/\{\s*slug:\s*"([^"]+)"[\s\S]*?category:\s*"([^"]+)"[\s\S]*?symbol:\s*"([^"]+)"[\s\S]*?resolution:\s*"([^"]+)"[\s\S]*?year:\s*(\d{4})([\s\S]*?)\}/g)].map((match) => ({
  slug: match[1],
  category: match[2],
  symbol: match[3],
  resolution: match[4],
  year: Number(match[5]),
  tail: match[6],
  featured: /featured:\s*true/.test(match[6]),
  historical: /historical:\s*true/.test(match[6]),
  hasSummary: /summary:\s*"[^"].*?"/.test(match[6]),
}));

assert(entries.length >= 50, `expected a complete statewide directory; only parsed ${entries.length} entries`);
assert(data.includes('Texas State Library and Archives Commission'), 'authoritative TSLAC source name is missing');
assert(data.includes('https://www.tsl.texas.gov/ref/abouttx/symbols'), 'authoritative TSLAC source URL is missing');

const slugs = new Set();
for (const entry of entries) {
  assert(!slugs.has(entry.slug), `duplicate slug: ${entry.slug}`);
  slugs.add(entry.slug);
  assert(entry.category.trim().length > 0, `missing category for ${entry.slug}`);
  assert(entry.symbol.trim().length > 0, `missing symbol for ${entry.slug}`);
  assert(entry.resolution.includes('Legislature') || /House Bill/i.test(entry.resolution), `legislative citation looks incomplete for ${entry.slug}`);
  assert(entry.year >= 1900 && entry.year <= new Date().getFullYear(), `implausible designation year for ${entry.slug}: ${entry.year}`);
  if (entry.featured) assert(entry.hasSummary, `featured symbol ${entry.slug} must have a summary`);
}

const historical = entries.filter((entry) => entry.historical);
assert(historical.length >= 1, 'historical/expired designations must remain separated from current symbols');
assert(historical.some((entry) => entry.slug === 'pastries'), 'expired state-pastries designation must remain marked historical');

const requiredCoreSlugs = ['bird', 'flower', 'motto', 'large-mammal', 'small-mammal', 'fish', 'insect', 'dish', 'tree'];
for (const slug of requiredCoreSlugs) assert(slugs.has(slug), `core Texas symbol missing: ${slug}`);

assert(route.includes('currentTexasSymbols') && route.includes('featuredTexasSymbols') && route.includes('historicalTexasSymbols'), 'hub loader must keep current, featured, and historical datasets separate');
assert(hub.includes('Every current designation in the source list'), 'hub must retain the complete current-designation directory');
assert(hub.includes('Verify with {sourceName}'), 'hub must expose the authoritative source link');
assert(hub.includes('historicalTexasSymbols'), 'hub must visibly handle historical designations');
assert(hub.includes('to="/texas-symbols/$slug"'), 'hub must link enriched symbols to profile routes');

assert(profileRoute.includes('getTexasSymbolProfile') || profileRoute.includes('getTexasSymbol'), 'profile route must resolve symbol data server-side');
assert(profile.includes('Designation at a glance'), 'profile must expose designation facts');
assert(profile.includes('Legislative citation'), 'profile must show the legislative citation');
assert(profile.includes('Verify the designation'), 'profile must link back to the authoritative source');
assert(profile.includes('relatedSymbols'), 'profile must preserve related-symbol discovery');

if (!process.exitCode) {
  const featuredCount = entries.filter((entry) => entry.featured).length;
  const currentCount = entries.filter((entry) => !entry.historical).length;
  console.log(`Texas Symbols validation passed: ${currentCount} current listings, ${featuredCount} enriched profiles, ${historical.length} historical designation(s).`);
}
