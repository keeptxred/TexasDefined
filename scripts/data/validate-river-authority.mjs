import fs from 'node:fs';
import path from 'node:path';

const read = (p) => fs.readFileSync(p,'utf8');
const errors = [];
const relations = read('src/data/river-authority-relations.ts');
const canonicalSlugs = [...relations.matchAll(/slug:\\s*"(texas-[a-z0-9-]+-river-guide)"/g)].map((m) => m[1]);
const existingUpgrades = new Set([
  'texas-guadalupe-river-guide','texas-colorado-river-guide','texas-brazos-river-guide',
  'texas-neches-river-guide','texas-sabine-river-guide'
]);
if(canonicalSlugs.length < 10 || new Set(canonicalSlugs).size !== canonicalSlugs.length)
 errors.push('River registry must contain at least ten unique, canonical river guide slugs.');
const legacyBasins = new Set([
  'texas-brazos-river-guide','texas-colorado-river-guide','texas-guadalupe-river-guide',
  'texas-trinity-river-guide','texas-rio-grande-river-guide','texas-canadian-river-guide',
  'texas-lavaca-river-guide','texas-neches-river-guide','texas-nueces-river-guide',
  'texas-red-river-guide','texas-sabine-river-guide','texas-san-antonio-river-guide',
  'texas-san-jacinto-river-guide','texas-sulphur-river-guide'
]);
const full = read('src/data/fixtures/texas-river-recreation-guides.ts');
const stub = read('src/data/fixtures/texas-river-recreation-guide-stubs.ts');
const addon = read('src/data/fixtures/texas-river-authority-extensions.ts');
const lazy = read('src/data/fixtures/lazy-evergreen.ts');
const hub = read('src/components/content/TexasRiversAuthorityHub.tsx');
const pillar = read('src/data/fixtures/texas-rivers-explained.ts');
const landscape = read('src/components/editorial/TexasRiverValleysLandscapePage.tsx');
const related = read('src/data/destination-editorial-links.ts');
const policy = read('docs/editorial/RIVER_AUTHORITY_STANDARD.md');
const match = full.match(/export const riverRecreationGuideRecords = ([\s\S]*?) as const;/);
if (!match) errors.push('Missing machine-readable five-river recreation records');
let records=[];
try {records = JSON.parse(match?.[1] || '[]');}catch(e){errors.push('Failed to parse river recreation records: '+e.message);}
const slugs = new Set(records.map(x=>x.slug));
const all = new Set(canonicalSlugs);
for(const name of canonicalSlugs) {
 if (!name.startsWith('texas-') || !name.endsWith('-river-guide')) errors.push('Noncanonical river slug '+name);
 if (existingUpgrades.has(name)) {
   if (!addon.includes(name)) errors.push('Existing river missing recreation upgrade: '+name);
 } else {
   if (!slugs.has(name)) errors.push('New river missing substantive recreation record: '+name);
   if (!stub.includes(name)) errors.push('New river missing lazy preview: '+name);
 }
}
for(const item of records) {
 if (!all.has(item.slug)) errors.push('New river must be in canonical authority registry: '+item.slug);
 for (const key of ['name','title','summary','overview','route','access','float','fish','camp','nearby','history','family']) {
   if (typeof item[key] !== 'string' || item[key].trim().length < (['name','title'].includes(key)?4:75))
     errors.push(item.slug+' missing substantive '+key);
 }
 if (!Array.isArray(item.faq) || item.faq.length<5 || item.faq.some(x=>x.length!==2 || x[0].length<10 || x[1].length<55))
   errors.push(item.slug+' lacks five substantial researched FAQs');
 if (!Array.isArray(item.official) || item.official.length<2 || item.official.some(x=>!/^https:\/\//.test(x[1])))
   errors.push(item.slug+' needs at least two valid official evidence URLs');
 if (!Array.isArray(item.extraLinks)||item.extraLinks.length<3||item.extraLinks.some(x=>!x[0].startsWith('/')))
   errors.push(item.slug+' needs contextual internal links');
 if (!(item.hero?.startsWith('/images/') || item.hero?.startsWith('https://upload.wikimedia.org/')) || !item.heroAlt || item.heroAlt.length<25 || !item.heroCredit)
   errors.push(item.slug+' missing correctly described local imagery');
 if (item.hero.includes('texas-river-basins') && !/illustrat|map|overview/i.test(item.heroAlt))
   errors.push(item.slug+' mislabels an illustrative basin image as field photography');
}
for(const required of [
 'riverAuthorityLinksForCounty', 'riverAuthorityLinksForDestination',
 'allRiverAuthorityNavigationLinks'
]) if(!relations.includes(required)) errors.push('River relationship engine lacks '+required);
if(!hub.includes('RIVER_AUTHORITY_RELATIONS')) errors.push('Statewide hub must generate future river entries from canonical registry');
if(!lazy.includes('allRiverAuthorityNavigationLinks()')) errors.push('River pillar must automatically include future authority guides');
if(!landscape.includes('RIVER_AUTHORITY_RELATIONS')) errors.push('River valleys guide must automatically include future river authority guides');
if(!related.includes('riverAuthorityLinksForDestination(slug)')) errors.push('Destination reciprocal links must be driven by river authority registry');
const countyServer = read('src/data/county-series.server.ts');
if(!countyServer.includes('riverAuthorityLinksForCounty(countySlug)')) errors.push('County river backlinks must be automatically maintained');
const known = new Set([...legacyBasins,...slugs]);
// Detect addition of an unapproved river guide anywhere in the fixture catalog.
// New pages must adopt the full recreation contract rather than adding a bare 'guide' stub.
for(const filename of fs.readdirSync('src/data/fixtures').filter(x=>x.endsWith('.ts'))) {
 const source=read(path.join('src/data/fixtures',filename));
 for(const m of source.matchAll(/\bslug:\s*["'](texas-[a-z0-9-]+-river-guide)["']/g)) {
  if (!known.has(m[1])) errors.push('New river guide without authority record: '+m[1]+' in '+filename);
 }
}
for(const marker of [
 'texasRiverRecreationGuideStubs','texasRiverRecreationGuideArticles',
 'enhanceExistingRiverGuide','texas-river-authority-extensions'
]) if(!lazy.includes(marker))errors.push('Lazy loading missing river integration: '+marker);
for(const marker of ['/article/texas-pecos-river-guide','/article/texas-llano-river-guide',
 '/article/texas-comal-river-guide','/article/texas-san-marcos-river-guide',
 '/article/texas-frio-river-guide']) if (!landscape.includes(marker))errors.push('River valleys landscape missing new guide: '+marker);
for(const marker of ['/article/texas-frio-river-guide','/article/texas-llano-river-guide',
 '/article/texas-guadalupe-river-guide','/article/texas-san-marcos-river-guide']) {
 if (!related.includes(marker)) errors.push('Destination reciprocal links missing '+marker);
}
for(const marker of ['Fishing rigor','Bidirectional links','Freshness and ownership','Supabase',
 'fishing','camping']) if (!policy.includes(marker)) errors.push('River production specification missing '+marker);
if(errors.length) {
 console.error('RIVER AUTHORITY CONTRACT FAILED: '+errors.length+' issue(s)');
 for(const error of errors) console.error(' - '+error);
 process.exitCode=1;
} else {
 console.log('River authority contract passed: '+canonicalSlugs.length+' registered river guides; new recreation records, existing upgrades, automated county/destination/pillar/landscape linking and future additions gate.');
}
