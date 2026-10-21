import fs from 'node:fs';
import path from 'node:path';

const read = (p) => fs.readFileSync(p,'utf8');
const errors = [];
const relations = read('src/data/river-authority-relations.ts');
const canonicalSlugs = [...relations.matchAll(/slug:\s*"(texas-[a-z0-9-]+-(?:river|river-basin)-guide)"/g)].map((m) => m[1]);
const existingUpgrades = new Set([
  'texas-guadalupe-river-guide','texas-colorado-river-guide','texas-brazos-river-guide',
  'texas-neches-river-guide','texas-sabine-river-guide'
]);
if(canonicalSlugs.length === 0 || new Set(canonicalSlugs).size !== canonicalSlugs.length)
 errors.push('River registry must contain every existing river and basin guide exactly once.');
const publishedSource = [
 read('src/data/fixtures/texas-explained-river-profiles.ts'),
 read('src/data/fixtures/texas-explained-river-profiles-remaining.ts'),
].join('\n');
const publishedRiverSlugs = new Set([...publishedSource.matchAll(/slug:\s*"(texas-[a-z0-9-]+-(?:river|river-basin)-guide)"/g)].map((m) => m[1]));
const legacyBasins = publishedRiverSlugs;
const secondary = read('src/data/fixtures/texas-river-authority-remaining.ts');
const secondaryMatch = secondary.match(/export const additionalExistingRiverAuthorityResearch = ([\s\S]*?) as const;/);
let remainingEntries=[];
try {remainingEntries = JSON.parse(secondaryMatch?.[1] || '[]');}
catch(e) {errors.push('Other basin recreation research must be machine-readable: '+e.message);}
const remainingBySlug = new Map(remainingEntries.map((item)=>[item.slug,item]));
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
// Prevent the canonical [label, URL] evidence tuples from becoming fake article links.
// This validator is part of the shared deterministic pre-merge river contract.
if (!full.includes('...toOfficialLinks(river.official)') ||
    !full.includes('pairs.map(([label, href]) => ({ href, label'))
  errors.push('Official river references must be rendered as [label, external URL], never [href, label].');
const slugs = new Set(records.map(x=>x.slug));
const all = new Set(canonicalSlugs);
for(const slug of publishedRiverSlugs) {
 if(!all.has(slug)) errors.push('Published existing river guide excluded from universal standard: '+slug);
}
for(const name of canonicalSlugs) {
 if (!name.startsWith('texas-') || !/(?:river|river-basin)-guide$/.test(name))
   errors.push('Noncanonical river slug '+name);
 if (publishedRiverSlugs.has(name)) {
   if (!existingUpgrades.has(name) && !remainingBySlug.has(name))
     errors.push('Existing river guide missing river-specific recreation upgrade: '+name);
 } else {
   if (!slugs.has(name)) errors.push('New river missing comprehensive, structured river profile: '+name);
   if (!stub.includes(name)) errors.push('New river missing lazy discovery stub: '+name);
 }
}
for(const item of remainingEntries) {
 if (!all.has(item.slug)) errors.push('Existing river extension excluded from registry: '+item.slug);
 if (!publishedRiverSlugs.has(item.slug)) errors.push('Additional legacy river extension must match an existing profile: '+item.slug);
 for(const key of ['name','context','route','fish','camp','visit']) {
  if(typeof item[key] !== 'string' || item[key].length < (key === 'name' ? 4 : 120))
    errors.push('River '+item.slug+' lacks substantial, reach-specific '+key);
 }
 if(!Array.isArray(item.faq) || item.faq.length<5 || item.faq.some(q=>q.length!==2 || q[1].length<75))
   errors.push('River '+item.slug+' missing source-informed questions and answers');
 if(!Array.isArray(item.official) || item.official.length<2 || item.official.some(x=>!/^https:\/\//.test(x[1])))
   errors.push('River '+item.slug+' missing independently checkable primary sources');
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
 if(!Array.isArray(item.verifiedAccess) || item.verifiedAccess.length<1
   || item.verifiedAccess.some(site=>site.name.length<15 || site.access.length<150 || !/^https:\/\//.test(site.source)))
   errors.push(item.slug+' needs substantial, mapped or authority-backed reach-specific access details');
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
const articleRoute = read('src/routes/article.$slug.tsx');
if(!relations.includes('riverAuthorityLinksForArticleMetadata'))
 errors.push('Topical existing and future fishing, camping and travel articles must have generated contextual river links');
if(!articleRoute.includes('riverAuthorityLinksForArticleMetadata(article)'))
 errors.push('Article route must render automatically relevant river backlinks');
const fishingHub = read('src/components/fishing/FishingHub.tsx');
if(!fishingHub.includes('RIVER_AUTHORITY_RELATIONS.map'))
 errors.push('The statewide fishing hub must link automatically to every published river guide');
const campingGuide = read('src/routes/best-places-to-go-camping-in-texas.lazy.tsx');
if(!campingGuide.includes('riverAuthorityLinksForArticleMetadata'))
 errors.push('Relevant camping destinations must generate topical river backlinks');
const photoCatalog = read('src/data/river-authority-photo-catalog.ts');
if(!photoCatalog.includes('licenseUrl') || !photoCatalog.includes('photographer') || !photoCatalog.includes('sourceUrl'))
 errors.push('River gallery photos must include reusable linked attribution and license metadata');

for (const slug of canonicalSlugs) {
 const start = photoCatalog.indexOf('"/article/' + slug + '":');
 const end = start < 0 ? -1 : photoCatalog.indexOf('\n  "/article/', start + 1);
 const entry = start < 0 ? '' : photoCatalog.slice(start, end < 0 ? undefined : end);
 if (!entry) {
  errors.push('Published river guide lacks an exact-river photo catalog entry: ' + slug);
 } else {
  for (const property of ['"src"', '"alt"', '"photographer"', '"license"', '"licenseUrl"', '"sourceUrl"']) {
   if (!entry.includes(property)) errors.push('River photo entry missing '+property+' for '+slug);
  }
  if (!entry.includes('commons.wikimedia.org') && !entry.includes('upload.wikimedia.org')) {
   errors.push('River photo entry missing identifiable licensed source: ' + slug);
  }
 }
}

if(!hub.includes('RIVER_AUTHORITY_CARD_PHOTOS') || !landscape.includes('RIVER_AUTHORITY_CARD_PHOTOS'))
 errors.push('Both statewide river navigation surfaces must share the rights-cleared photo catalog');
for (const [label, source] of [['River atlas',hub],['River valleys',landscape]]) {
 if (!source.includes('editorialImageSrc(photo?.src ?? river.image)'))
  errors.push(label + ' gallery must deliver approved remote photos through /media/remote, not raw Wikimedia hotlinks');
}

// Three formerly representative-image basin entries must stay identified, credited
// and consistent across their real guide and lazy stub. Live Chrome QA separately
// verifies that the Wikimedia originals actually decode on public pages.
const basinGuidePhotos = read('src/data/fixtures/texas-explained-river-profiles-remaining.ts');
const basinGuidePhotoStubs = read('src/data/fixtures/texas-explained-river-profiles-remaining-stubs.ts');
const requiredExactRiverPhotos = [
  ['texas-lavaca-river-guide', 'Swing_Bridge_Over_Lavaca_River.jpg', 'Patrick Feller', 'CC BY 2.0'],
  ['texas-sabine-river-guide', 'Sabine_River_near_Big_Sandy%2C_TX_IMG_5294.JPG', 'Billy Hathorn', 'CC BY 3.0'],
  ['texas-san-jacinto-river-guide', 'West_Fork_San_Jacinto_River.jpg', 'Stedil', 'CC BY-SA 4.0'],
];
for (const [slug, filename, author, license] of requiredExactRiverPhotos) {
  const href = '/article/' + slug;
  const guideIndex = basinGuidePhotos.indexOf('slug: "' + slug + '"');
  const stubIndex = basinGuidePhotoStubs.indexOf('slug: "' + slug + '"');
  if (guideIndex < 0 || stubIndex < 0) {
    errors.push('River hero or stub missing for authenticated photo: ' + slug);
    continue;
  }
  const guide = basinGuidePhotos.slice(guideIndex, basinGuidePhotos.indexOf('body: [', guideIndex));
  const stub = basinGuidePhotoStubs.slice(stubIndex, basinGuidePhotoStubs.indexOf('body: []', stubIndex));
  const cardIndex = photoCatalog.indexOf('"' + href + '":');
  const nextCard = cardIndex < 0 ? -1 : photoCatalog.indexOf('\n  "/article/', cardIndex + 1);
  const card = cardIndex < 0 ? '' : photoCatalog.slice(cardIndex, nextCard > 0 ? nextCard : undefined);
  for (const [surface, content] of [['guide hero', guide], ['lazy stub hero', stub], ['directory photo', card]]) {
    if (!content.includes(filename) || !content.includes(author) || !content.includes(license))
      errors.push(surface + ' missing correct river-specific credited photo: ' + slug);
  }
  if (!card.includes('commons.wikimedia.org/wiki/File:') || !card.includes('creativecommons.org/licenses/'))
    errors.push('River catalog photo missing original file or license permalink: ' + slug);
}

// Four more primary river basin guides must have river-specific, rights-cleared
// photographs in BOTH SSR/lazy article records and in the two shared nav surfaces.
const majorRiverGuideSource = read('src/data/fixtures/texas-explained-river-profiles.ts');
const majorRiverStubSource = read('src/data/fixtures/texas-explained-river-profile-stubs.ts');
const verifiedMajorRiverPhotos = [
  [
    "texas-brazos-river-guide",
    "Brazos_River_at_Washington_on_the_Brazos.jpg",
    "Larry D. Moore",
    "CC BY 4.0"
  ],
  [
    "texas-guadalupe-river-guide",
    "Guadalupe_River_of_Texas_IMG_0500.JPG",
    "Billy Hathorn",
    "CC BY-SA 3.0"
  ],
  [
    "texas-trinity-river-guide",
    "Trinity-River-Dallas-TX-4667.jpg",
    "Loadmaster (David R. Tribble)",
    "CC BY-SA 3.0"
  ],
  [
    "texas-rio-grande-river-guide",
    "Big_Bend_Rio_Grande.jpg",
    "Adbar",
    "CC BY-SA 3.0"
  ]
];
for (const [slug,filename,author,license] of verifiedMajorRiverPhotos) {
  const articleStart = majorRiverGuideSource.indexOf('slug: "'+slug+'"');
  const stubStart = majorRiverStubSource.indexOf('"'+slug+'"');
  const cardStart = photoCatalog.indexOf('"/article/'+slug+'":');
  const article = articleStart < 0 ? '' : majorRiverGuideSource.slice(articleStart,majorRiverGuideSource.indexOf('body: [',articleStart));
  const stub = stubStart < 0 ? '' : majorRiverStubSource.slice(stubStart,majorRiverStubSource.indexOf('\n);',stubStart));
  const cardEnd = cardStart < 0 ? -1 : photoCatalog.indexOf('\n  "/article/',cardStart+1);
  const card = cardStart < 0 ? '' : photoCatalog.slice(cardStart,cardEnd > 0 ? cardEnd : undefined);
  for (const [surface,body] of [['article hero',article],['lazy stub hero',stub],['card',card]]) {
    if (![filename,author,license,'commons.wikimedia.org'].every(marker=>body.includes(marker)))
      errors.push('Verified actual river photograph missing ('+surface+'): '+slug);
  }
  if (!card.includes('licenseUrl') || !card.includes('sourceUrl'))
    errors.push('Attribution URLs missing from river photo catalogue for '+slug);
}

// Photo identity, verified photographer and license must survive in both loaded
// article variants and the shared cards for every remaining river guide.
const remainingBasinPhotoSource = read('src/data/fixtures/texas-explained-river-profiles-remaining.ts');
const remainingBasinStubSource = read('src/data/fixtures/texas-explained-river-profiles-remaining-stubs.ts');
const visitorPhotoSource = read('src/data/fixtures/texas-river-recreation-guides.ts');
const visitorPhotoStubSource = read('src/data/fixtures/texas-river-recreation-guide-stubs.ts');
const verifiedRemainingRiverPhotos = [
  [
    "texas-cypress-river-basin-guide",
    "Big_Cypress_Bayou,_Caddo_Lake_State_Park,_Harrison_County,_Texas,_USA_(April_2017).jpg",
    "William L. Farr",
    "CC BY-SA 4.0",
    "basin"
  ],
  [
    "texas-neches-river-guide",
    "Neches_River,_Orange_County,_Texas,_USA_(October_2016).jpg",
    "William L. Farr",
    "CC BY-SA 4.0",
    "basin"
  ],
  [
    "texas-red-river-guide",
    "Red_River,_Texas_(2395829167).jpg",
    "brewbooks",
    "CC BY-SA 2.0",
    "basin"
  ],
  [
    "texas-sulphur-river-guide",
    "Fishing_on_the_Sulphur_River_-_Wright_Patman_Dam,_Texas_(47476599752).jpg",
    "Tony Webster",
    "CC BY 2.0",
    "basin"
  ],
  [
    "texas-frio-river-guide",
    "Garner_state_park.jpg",
    "Larry D. Moore",
    "CC BY 4.0",
    "visitor"
  ],
  [
    "texas-llano-river-guide",
    "Llano_River_in_Junction,_TX_IMG_4345.JPG",
    "Billy Hathorn",
    "CC BY-SA 3.0",
    "visitor"
  ]
];
for (const [slug,filename,author,license,group] of verifiedRemainingRiverPhotos) {
  const isBasin = group === 'basin';
  const articleSource = isBasin ? remainingBasinPhotoSource : visitorPhotoSource;
  const stubSource = isBasin ? remainingBasinStubSource : visitorPhotoStubSource;
  const slugKey = isBasin ? 'slug: "'+slug+'"' : '"slug": "'+slug+'"';
  const articleAt = articleSource.indexOf(slugKey);
  const stubAt = stubSource.indexOf(slugKey);
  const cardAt = photoCatalog.indexOf('"/article/'+slug+'":');
  if (articleAt < 0 || stubAt < 0 || cardAt < 0) {
    errors.push('Actual river photo record missing: '+slug);
    continue;
  }
  const articleEnd = isBasin ? articleSource.indexOf('body: [',articleAt) : articleSource.indexOf('\n  {',articleAt+1);
  const stubEnd = isBasin ? stubSource.indexOf('body: []',stubAt) : stubSource.indexOf('\n  {',stubAt+1);
  const cardEnd = photoCatalog.indexOf('\n  "/article/',cardAt+1);
  const article = articleSource.slice(articleAt,articleEnd > articleAt ? articleEnd : undefined);
  const stub = stubSource.slice(stubAt,stubEnd > stubAt ? stubEnd : undefined);
  const card = photoCatalog.slice(cardAt,cardEnd > cardAt ? cardEnd : undefined);
  for (const [surface,text] of [['hero',article],['stub',stub],['card',card]]) {
    const sourceName = filename.replace(/_/g,' '); // allow encoded URL or Wikimedia File title
    const imageNamed = text.includes(filename) || text.includes(sourceName) ||
      text.includes(encodeURIComponent(filename));
    if (!imageNamed || !text.includes(author) || !text.includes(license))
      errors.push('River-specific '+surface+' source/rights missing: '+slug);
  }
  if (!card.includes('licenseUrl') || !card.includes('sourceUrl'))
    errors.push('Full photographer and license links missing: '+slug);
}

const countyServer = read('src/data/county-series.server.ts');
if(!countyServer.includes('riverAuthorityLinksForCounty(countySlug)')) errors.push('County river backlinks must be automatically maintained');
const existingMatch = addon.match(/export const existingRiverAuthorityEnhancements = ([\s\S]*?) as const;/);
let existingProfiles = {};
try { existingProfiles = JSON.parse(existingMatch?.[1] ?? '{}'); }
catch(e) { errors.push('Existing river upgrades not machine-readable: '+e.message); }
for(const slug of existingUpgrades) {
 const entry=existingProfiles[slug];
 if(!entry || !Array.isArray(entry.verifiedAccess) || entry.verifiedAccess.length===0)
   errors.push('Existing river upgrade missing documented visitor-access example: '+slug);
}
const known = new Set([...canonicalSlugs]);
// Detect addition of an unapproved river guide anywhere in the fixture catalog.
// New pages must adopt the full recreation contract rather than adding a bare 'guide' stub.
for(const filename of fs.readdirSync('src/data/fixtures').filter(x=>x.endsWith('.ts'))) {
 const source=read(path.join('src/data/fixtures',filename));
 for(const m of source.matchAll(/\bslug:\s*["'](texas-[a-z0-9-]+-(?:river|river-basin)-guide)["']/g)) {
  if (!known.has(m[1])) errors.push('New river guide without authority record: '+m[1]+' in '+filename);
 }
}
if (!lazy.includes('enhanceRemainingRiverGuide(enhanceExistingRiverGuide(article))'))
 errors.push('Every legacy river must pass through the universal river authority enrichment layer');
for(const marker of [
 'texasRiverRecreationGuideStubs','texasRiverRecreationGuideArticles',
 'enhanceExistingRiverGuide','enhanceRemainingRiverGuide','texas-river-authority-extensions'
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
