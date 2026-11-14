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
const musicWorkflow = read(".github/workflows/verify-music-history-authority.yml");
const dossierView = read("src/components/editorial/TexasMusicEvidenceDossier.tsx");
const venueView = read("src/components/editorial/TexasMusicVenueGuide.tsx");
const cityView = read("src/components/editorial/TexasMusicCityGuide.tsx");
const hub = read("src/data/texas-music-cities-hub.ts");
const publicRoutes = read("src/lib/public-routes.ts");
const boilerplate = /(?:in today's fast.paced world|delve into|unlock the secrets|ultimate guide to everything|comprehensive tapestry|lorem ipsum)/i;
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
    if(count < 4) fail("Music dossier needs at least four independently annotated findings: "+slug+" / "+field+" = "+count);
  }
  const researchSources=[...research.matchAll(/href: "(https:\/\/[^"]+)"/g)].map(x=>x[1]);
  if(new Set(researchSources).size < 2)fail("No independent corroboration across music research findings: "+slug);
  if(boilerplate.test(research))fail("Boilerplate in researched findings: "+slug);
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
if(!venueView.includes('guide.slug === "antones-austin-history" ? "2026-11-14"') ||
   !venueView.includes('guide.slug === "antones-austin-history" ? "November 14, 2026"'))
  fail("Antone's modified/review dates must reflect Nov 14 source correction, not the earlier Nov 13 date");
if(!dossiers.includes("The club dates its Guadalupe opening night to 1982") ||
   !dossiers.includes("Guadalupe Street in 1981") ||
   !dossiers.includes("September 3, 1982"))
  fail("Antone's official 1982 Guadalupe opening and Handbook 1981 retrospective must remain transparently distinguished");
if(!musicWorkflow.includes("github.event.issue.number || github.ref")) fail("Music acceptance concurrency must be isolated per issue so unrelated comments cannot cancel the workflow");
if(!liveAcceptance.includes('get(slug,"visitor")') ||
   !liveAcceptance.includes('["visitor",visitor]') ||
   !liveAcceptance.includes('cleanCanonicalStatus') ||
   !liveAcceptance.includes('const clean=kind==="visitor"'))
  fail("Music production verification must test the genuine unmodified canonical URL, not only a query nonce");
if(!liveAcceptance.includes('googlebot-like') || !liveAcceptance.includes("Unauthenticated crawler-UA"))
  fail("Crawler-like diagnosis must avoid falsely representing authenticated Googlebot access");
if(!hub.includes('"/corpus-christi-music-history"')) fail("Statewide city hub omits Corpus Christi");
if(!cityView.includes('musicCitiesComparison.map') || !cityView.includes('scope="col"') || !cityView.includes('<caption')) fail("Missing accessible city-by-city comparison");
if(!cityView.includes('musicHistoryMilestones') || !venueView.includes('musicHistoryMilestones') || !corpus.includes('musicHistoryMilestones')) fail("Unlinked evidence-based chronologies");
for (const [label, view] of [["city",cityView],["venue",venueView],["Corpus",corpus]]) {
  const expectedDateField = label==="venue" ? 'dateModified: reviewedAt' : 'dateModified: musicSourceReviewedAt';
  if(!view.includes('Texas Defined Editorial Desk') || !view.includes(expectedDateField) || !view.includes('to="/editorial-policy"')) fail("Editorial byline and structured date missing: "+label);
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
if(issues.length){issues.forEach(x=>console.error("FAIL:",x));process.exitCode=1}
else console.log("10 music history routes: deep source findings, disputed dates, content, citations, author desk and comparisons PASS; external link audit, visual and editorial originality review remain separate");
