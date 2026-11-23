#!/usr/bin/env node
/**
 * Targeted contract for the ten Texas music history guides.
 * Guards source provenance, editorial accountability and indexing surface.
 * Does not replace fact checking, human editorial review or live URL inspection.
 */
import { readFileSync, existsSync } from "node:fs";

const read = path => readFileSync(path,"utf8");
const slugs = [
  "broken-spoke-austin-history", "continental-club-austin-history",
  "antones-austin-history", "billy-bobs-texas-history",
  "texas-music-cities", "austin-music-history",
  "houston-music-history", "san-antonio-music-history",
  "corpus-christi-music-history", "lubbock-music-history"
];
const issues = [];
const fail = msg => issues.push(msg);
const venue = read("src/data/texas-music-venue-guides.ts");
const city = read("src/data/texas-music-city-guides.ts");
const corpus = read("src/routes/corpus-christi-music-history.lazy.tsx");
const evidence = read("src/data/texas-music-history-evidence.ts");
const dossiers = read("src/data/texas-music-history-dossiers.ts");
const liveAcceptance = read("scripts/ci/verify-music-history-production.mjs");
const cachePurge = read("scripts/ci/purge-cloudflare-cache.mjs");
const dossierView = read("src/components/editorial/TexasMusicEvidenceDossier.tsx");
const venueView = read("src/components/editorial/TexasMusicVenueGuide.tsx");
const cityView = read("src/components/editorial/TexasMusicCityGuide.tsx");
const hub = read("src/data/texas-music-cities-hub.ts");
const deskProfile = read("src/routes/authors.$author.tsx");
const browserAcceptance = read("scripts/ci/verify-music-history-browser.mjs");
const publicRoutes = read("src/lib/public-routes.ts");
const citiesRoute = read("src/routes/texas-music-cities.tsx");
const continentalRoute = read("src/routes/continental-club-austin-history.tsx");
const billyRoute = read("src/routes/billy-bobs-texas-history.tsx");

if (!citiesRoute.includes('title: "Texas Music Cities: Austin, Houston & Beyond"')) fail("Statewide six-city title must not be cut off at a dangling comma");
if (!continentalRoute.includes('title: "Continental Club Austin History: South Congress Music Landmark"')) fail("Continental search title must not assert disputed 1955/1957 opening year");
if (!billyRoute.includes('title: "Billy Bob\'s Texas History: 1981 Opening & 1988 Reopening"')) fail("Billy Bob\'s search title must acknowledge the documented 1988 interruption");
if(!liveAcceptance.includes("historically misleading venue title") || !browserAcceptance.includes("historically accurate venue search title"))
  fail("Venue chronology title corrections require both SSR production and real Chrome regression coverage");
// The SEO helper omits the redundant publisher suffix rather than truncate a
// 53–68-character intact search title. Preserve exact live SSR/Chrome outputs.
const expectedCompleteVenueTitleLines = [
  `"continental-club-austin-history": "Continental Club Austin History: South Congress Music Landmark"`,
  `"billy-bobs-texas-history": "Billy Bob's Texas History: 1981 Opening & 1988 Reopening"`
];
for(const expectedTitleLine of expectedCompleteVenueTitleLines){
  if(!liveAcceptance.includes(expectedTitleLine) || !browserAcceptance.includes(expectedTitleLine))
    fail("Real production and Chrome music titles must preserve the complete venue subject, without an extra forced brand suffix: "+expectedTitleLine);
}
if(!liveAcceptance.includes("attempt<=2") ||
   !liveAcceptance.includes("!/TimeoutError|AbortError/i.test(String(error))") ||
   !liveAcceptance.includes("if(attempt===2"))
  fail("Music live acceptance must retry at most once for transient transport errors without forgiving HTTP/content failures");
if(!liveAcceptance.includes("malformed/stale statewide title")||!browserAcceptance.includes("complete statewide music cities search title"))
  fail("The clean and nonce-busted live title and real Chrome title must both reject stale punctuation");
const pushPaths = read(".github/workflows/verify-music-history-authority.yml").split('  push:')[1]?.split('  workflow_dispatch:')[0] ?? "";
for (const path of ["src/data/texas-music-city-guides.ts","src/data/texas-music-cities-hub.ts","src/routes/texas-music-cities.tsx","src/routes/*music-history*.tsx","src/routes/*austin-history*.tsx","src/routes/billy-bobs-texas-history*.tsx"]) {
  if(!pushPaths.includes("'"+path+"'")) fail("Push-time music quality gate missing "+path);
}
const boilerplate = /(?:in today's fast.paced world|delve into|unlock the secrets|ultimate guide to everything|comprehensive tapestry|lorem ipsum)/i;
// Public music descriptions should speak about places and records, not our SEO program.
const publisherJargon = /\\bauthority hub\\b|\\bdifferent kind of authority\\b/i;
for(const [label, content] of [["music city links",city],["Corpus Christi guide",corpus]]){
  if(publisherJargon.test(content))fail("Publisher-oriented authority jargon on reader-facing "+label);
}
// A future change to the editorial desk or single policy page must run the music QA gate.
const musicWorkflow=read(".github/workflows/verify-music-history-authority.yml");
for(const route of ["src/routes/authors.$author.tsx","src/routes/editorial-policy*.tsx"]){
  if(musicWorkflow.split(route).length<3)fail("Music PR and main-push checks must both watch "+route);
}
function block(source, slug) {
  const start = source.indexOf('  "'+slug+'": {');
  if(start === -1) return "";
  const end = source.indexOf('\n  "',start+6);
  return source.slice(start, end < 0 ? source.length : end);
}
if(slugs.length !== 10 || new Set(slugs).size !== 10) fail("Must check exactly 10 unique music guide routes");
if(evidence.includes("/texas-two-step")) fail("Dance history may not link to Texas Two Step lottery");
if(venue.includes('href: "/texas-two-step"')) fail("Venue still links dancing to lottery");
for(const slug of slugs) {
  const route = "src/routes/"+slug+".tsx";
  const lazy = "src/routes/"+slug+".lazy.tsx";
  if(!existsSync(route) || !existsSync(lazy)) fail("Route module missing for "+slug);
  if(!publicRoutes.includes('"/'+slug+'"')) fail("Route missing from public route inventory: "+slug);
  if(!cachePurge.includes('"/'+slug+'"')) fail("Music authority canonical is absent from postdeploy targeted cache invalidation: "+slug);
  const routeData = existsSync(route) ? read(route) : "";
  if(!routeData.includes('canonicalPath') || !routeData.includes('canonicalLink(')) fail("SEO canonical contract missing: "+slug);
  if(!routeData.includes('type: "article"')) fail("Article search metadata missing: "+slug);
  if(slug !== "texas-music-cities" && !evidence.includes('  "'+slug+'": [')) fail("Missing sourced chronology: "+slug);
  const base = slug === "corpus-christi-music-history" ? corpus : block(slug.includes("austin-history") && !slug.startsWith("broken") && !slug.startsWith("continental") && !slug.startsWith("antones") ? city : ["broken-spoke-austin-history","continental-club-austin-history","antones-austin-history","billy-bobs-texas-history"].includes(slug) ? venue : city,slug);
  if(!base) fail("Guide content missing: "+slug);
  const research = block(dossiers,slug);
  if(!research) fail("Missing individual research dossier: "+slug);
  for(const field of ["heading:", "record:", "reading:", "source:", "href:"]) {
    const count = (research.match(new RegExp("\\b"+field,"g"))||[]).length;
    if(count < 5) fail("Music dossier needs at least five independently annotated findings: "+slug+" / "+field+" = "+count);
  }
  const researchSources=[...research.matchAll(/href: "(https:\/\/[^"]+)"/g)].map(x=>x[1]);
  if(new Set(researchSources).size < 3)fail("Too few independent cited records for music research: "+slug);
  if(new Set(researchSources.map(u=>new URL(u).hostname)).size < 2)fail("Research must rely on at least two separately hosted institutions: "+slug);
  if(boilerplate.test(research))fail("Boilerplate in researched findings: "+slug);
  if(!deskProfile.includes('href: "/'+slug+'"'))fail("Editorial desk author archive omits historical feature: "+slug);
  // Do not freeze verified music sources to an obsolete Nov. 14 string:
  // each guide needs both material-update and source-review dates, allowing
  // later checked revisions while rejecting missing, invalid or future dates.
  const reviewed = [...evidence.matchAll(new RegExp('"'+slug+'": "(\\d{4}-\\d{2}-\\d{2})"', 'g'))].map(match => match[1]);
  const earliest = Date.parse('2026-11-14T00:00:00Z');
  if (reviewed.length < 2 || reviewed.some(date => {
    const ms = Date.parse(date + 'T00:00:00Z');
    return !Number.isFinite(ms) || ms < earliest || ms > Date.now();
  })) fail("Article-specific historical research review/modify date absent or invalid: "+slug);
  if(boilerplate.test(base)) fail("Boilerplate wording: "+slug);
  const words = (base.replace(/https?:\/\/\S+/g," ").match(/\b[A-Za-z][A-Za-z'-]*\b/g)||[]).length;
  if(words<520) fail("Insufficient contextual body text: "+slug+" ("+words+" words)");
  if(slug!=="corpus-christi-music-history" && (base.match(/heading:/g)||[]).length < 5) fail("Incomplete guide structure: "+slug);
}
if(!dossierView.includes("What the record establishes") || !dossierView.includes("Our reading") || !dossierView.includes("What remains uncertain:"))fail("Dossier must distinguish verified record, editorial interpretation and unresolved issues");
if(!dossierView.includes("rel=\"noopener noreferrer\"") || !dossierView.includes("finding.href"))fail("Original research lacks source links");
for(const view of [cityView,venueView,corpus]) {
  if(!view.includes("TexasMusicEvidenceDossier"))fail("One route family is missing researched dossier rendering");
}
if(!venue.includes('the venue gives 1955, while the Handbook of Texas') || !evidence.includes('1955 / 1957 (disputed)') || !dossiers.includes("the exact opening year should be marked disputed"))fail("Continental opening year must remain explicitly disputed");
// Protect the documented May 18 historic-zoning enactment from older recommendation-only copy.
if (!dossiers.includes("20230518-074") || !dossiers.includes("approved on all three readings") || !evidence.includes("May 18, 2023") || !venue.includes("historic-zoning change on May 18, 2023")) fail("Broken Spoke 2023 adopted zoning is missing or misrepresented");
if (dossiers.includes("uncompleted preservation recommendation described on the Broken Spoke")) fail("Historic-zoning cross-reference is outdated");
// Document specific new primary/archival research, not a repetitive source-count-only grade.
const archivalChecks = {
  "broken-spoke-austin-history":["The proposed protection became an enacted city ordinance","The rezoning centered on the hall"],
  "continental-club-austin-history":["A city permit file separates the club","The city's 2008 staff report"],
  "billy-bobs-texas-history":["A television report is dated to the day","An archival image dates the attempted revival"],
  "texas-music-cities":["A preserved Austin broadcast","A San Antonio concert map"],
  "austin-music-history":["A preserved U-matic program","Public television funding"],
  "houston-music-history":["Recording-session logbooks","Financial folders make"],
  "san-antonio-music-history":["A public-library concert list","Corrido performance and newspaper accounts"],
  "lubbock-music-history":["Texas Tech preserves the researcher's trail","The local radio show predates"]
};
for (const [slug, markers] of Object.entries(archivalChecks)) {
  const d=block(dossiers, slug);
  for(const marker of markers) if(!d.includes(marker)) fail("New source-specific archival finding missing: "+slug+" / "+marker);
}
if(!dossiers.includes("https://texashistory.unt.edu/ark:/67531/metadc2227177/"))fail("Contemporaneous Billy Bob's TV catalog not cited");
if(!dossiers.includes("https://cedish.utsa.edu/sounds/about"))fail("San Antonio concert map provenance missing");
if(!dossiers.includes("https://findingaids.lib.uh.edu/repositories/2/top_containers/255"))fail("Houston historic label accounting archive missing");
if(!dossiers.includes("https://txarchives.org/ttusw/finding_aids/40066.xml"))fail("Lubbock historical collection provenance missing");
if(!dossiers.includes("The club dates its Guadalupe opening night to 1982") ||
   !dossiers.includes("Guadalupe Street in 1981") ||
   !dossiers.includes("September 3, 1982"))
  fail("Antone's official 1982 Guadalupe opening and Handbook 1981 retrospective must remain transparently distinguished");
if(!liveAcceptance.includes('get(slug,"visitor")') ||
   !liveAcceptance.includes('["visitor",visitor]') ||
   !liveAcceptance.includes('cleanCanonicalStatus') ||
   !liveAcceptance.includes('const clean=kind==="visitor"'))
  fail("Music production verification must test the genuine unmodified canonical URL, not only a query nonce");
if(!liveAcceptance.includes('googlebot-like') || !liveAcceptance.includes("Unauthenticated crawler-UA"))
  fail("Crawler-like diagnosis must avoid falsely representing authenticated Googlebot access");
if(!liveAcceptance.includes("Clean canonical article differs from cache-busted") ||
   !liveAcceptance.includes("const cleanArticle=articleText(visitor)") ||
   !liveAcceptance.includes("Antones disputed Guadalupe 1981/1982 opening evidence absent"))
  fail("Production acceptance must compare every clean music SSR article to its cache-busted variants and guard Antone's 1981/1982 source correction");
if(!deskProfile.includes('to="/editorial-policy"'))fail("Canonical author profile must link to the one centralized editorial policy");
if(!deskProfile.includes("itemListElement: [") || deskProfile.includes("itemListElement: loaderData.articles.map"))
  fail("Central editorial desk JSON-LD ItemList must merge published and music guides as array entries rather than numeric object properties");
if(!dossiers.includes("garage with $400 in November 1969"))
  fail("Corpus Christi Freddie Records archival economic context missing");
if(!deskProfile.includes('musicHistoryEditorialArticles.map'))fail("Music author page omits its own canonical history archive");
if(!liveAcceptance.includes('PASS editorial desk profile') || !liveAcceptance.includes('expectedArchivalFindings') || !liveAcceptance.includes('article modification date not updated'))fail("Live acceptance missing archive/byline/update provenance checks");
if(!browserAcceptance.includes('desk byline links to one institutional profile') || !browserAcceptance.includes('at least five independently researched findings'))fail("Mobile and desktop browser acceptance missing upgraded research/byline checks");
if(!hub.includes('"/corpus-christi-music-history"')) fail("Statewide city hub omits Corpus Christi");
if(!cityView.includes('musicCitiesComparison.map') || !cityView.includes('scope="col"') || !cityView.includes('<caption')) fail("Missing accessible city-by-city comparison");
if(!cityView.includes('musicHistoryMilestones') || !venueView.includes('musicHistoryMilestones') || !corpus.includes('musicHistoryMilestones')) fail("Unlinked evidence-based chronologies");
for (const [label, view] of [["city",cityView],["venue",venueView],["Corpus",corpus]]) {
  if(!view.includes('Texas Defined Editorial Desk') || !view.includes('dateModified: articleModifiedAt') || !view.includes('to="/authors/a-hollis"') || !view.includes('url: `${siteUrl}/authors/a-hollis`') || !view.includes('Historical sources checked')) fail("Central linked editorial desk byline and honest article-specific date missing: "+label);
  if(!view.includes('sourceUrl') || !view.includes('sourceLabel')) fail("Point-of-claim citation links missing: "+label);
}
for (const slug of ["broken-spoke-austin-history","continental-club-austin-history","antones-austin-history","billy-bobs-texas-history"]) {
  const begin=evidence.indexOf('  "'+slug+'": {',evidence.indexOf('export const musicVenuePhotography'));
  const end=evidence.indexOf('\n  "',begin+6);
  const photo=evidence.slice(begin,end<0?evidence.length:end);
  for (const field of ["src:", "width:", "height:", "alt:", "caption:", "credit:", "sourcePage:", "license:", "licenseUrl:"]) {
    if(begin<0 || !photo.includes(field))fail("Verified photo attribution missing: "+slug+" / "+field);
  }
  if(!photo.includes('creativecommons.org/licenses/'))fail("Creative Commons license source missing: "+slug);
}
if(!venueView.includes("photograph.sourcePage") || !venueView.includes("photograph.licenseUrl") || !venueView.includes('alt={photograph.alt}') || !venueView.includes('loading="lazy"')) fail("Venue photos missing visible author/license, alt or deferred loading");
if(!evidence.includes('https://atlas.thc.texas.gov/Details') || !evidence.includes('https://www.tshaonline.org/handbook/entries/billy-bobs-texas')) fail("Historical marker / Billy Bob primary source missing");
for(const x of ["Austin","Houston","San Antonio","Lubbock","Dallas–Fort Worth","Corpus Christi"]){
 if(!evidence.includes('name: "'+x+'"')) fail("Six-city comparison missing "+x);
}

// Editorial uniqueness guard: compare substantial 5-word passages, not shared
// component styling or short common phrases. Prevent bulk-generated clones
// from satisfying per-page minimum source/length checks.
function musicArticleWords(slug) {
  const venueSlugs = new Set([
    "broken-spoke-austin-history","continental-club-austin-history",
    "antones-austin-history","billy-bobs-texas-history"
  ]);
  const guide = slug === "corpus-christi-music-history" ? corpus :
    slug === "texas-music-cities" ? block(city, slug)+" "+hub :
    block(venueSlugs.has(slug) ? venue : city, slug);
  const material = guide+" "+block(dossiers, slug);
  return (material.replace(/https?:\/\/[^\s"]+/g," ").toLowerCase()
    .match(/[a-z]+(?:'[a-z]+)?/g) || []).filter(word=>word.length>2);
}
function fiveWordShingles(words) {
  const grams = new Set();
  for(let i=0;i+4<words.length;i++) grams.add(words.slice(i,i+5).join(" "));
  return grams;
}
const uniqueCorpus = Object.fromEntries(slugs.map(slug=>[
  slug, fiveWordShingles(musicArticleWords(slug))
]));
for(let i=0;i<slugs.length;i++)for(let j=i+1;j<slugs.length;j++){
  const first=uniqueCorpus[slugs[i]],second=uniqueCorpus[slugs[j]];
  let shared=0;
  for(const gram of first) if(second.has(gram))shared++;
  const overlap=shared/(first.size+second.size-shared || 1);
  if(overlap>0.12)
    fail("Near-duplicate long-form music history material: "+slugs[i]+" / "+slugs[j]+" 5-gram overlap="+overlap.toFixed(3));
}
if(issues.length){issues.forEach(x=>console.error("FAIL:",x));process.exitCode=1}
else console.log("10 music history routes: deep source findings, disputed dates, content, citations, author desk and comparisons PASS; external link audit, visual and editorial originality review remain separate");
