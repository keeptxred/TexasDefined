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
  const routeData = existsSync(route) ? read(route) : "";
  if(!routeData.includes('canonicalPath') || !routeData.includes('canonicalLink(')) fail("SEO canonical contract missing: "+slug);
  if(!routeData.includes('type: "article"')) fail("Article search metadata missing: "+slug);
  if(slug !== "texas-music-cities" && !evidence.includes('  "'+slug+'": [')) fail("Missing sourced chronology: "+slug);
  const base = slug === "corpus-christi-music-history" ? corpus : block(slug.includes("austin-history") && !slug.startsWith("broken") && !slug.startsWith("continental") && !slug.startsWith("antones") ? city : ["broken-spoke-austin-history","continental-club-austin-history","antones-austin-history","billy-bobs-texas-history"].includes(slug) ? venue : city,slug);
  if(!base) fail("Guide content missing: "+slug);
  if(boilerplate.test(base)) fail("Boilerplate wording: "+slug);
  const words = (base.replace(/https?:\/\/\S+/g," ").match(/\b[A-Za-z][A-Za-z'-]*\b/g)||[]).length;
  if(words<520) fail("Insufficient contextual body text: "+slug+" ("+words+" words)");
  if(slug!=="corpus-christi-music-history" && (base.match(/heading:/g)||[]).length < 5) fail("Incomplete guide structure: "+slug);
}
if(!hub.includes('"/corpus-christi-music-history"')) fail("Statewide city hub omits Corpus Christi");
if(!cityView.includes('musicCitiesComparison.map') || !cityView.includes('scope="col"') || !cityView.includes('<caption')) fail("Missing accessible city-by-city comparison");
if(!cityView.includes('musicHistoryMilestones') || !venueView.includes('musicHistoryMilestones') || !corpus.includes('musicHistoryMilestones')) fail("Unlinked evidence-based chronologies");
for (const [label, view] of [["city",cityView],["venue",venueView],["Corpus",corpus]]) {
  if(!view.includes('Texas Defined Editorial Desk') || !view.includes('dateModified: musicSourceReviewedAt') || !view.includes('to="/editorial-policy"')) fail("Editorial byline and structured date missing: "+label);
  if(!view.includes('sourceUrl') || !view.includes('sourceLabel')) fail("Point-of-claim citation links missing: "+label);
}
for (const slug of ["broken-spoke-austin-history","continental-club-austin-history","antones-austin-history","billy-bobs-texas-history"]) {
  const begin=evidence.indexOf('  "'+slug+'": {',evidence.indexOf('export const musicVenuePhotography'));
  const end=evidence.indexOf('\n  "',begin+6);
  const photo=evidence.slice(begin,end<0?evidence.length:end);
  for (const field of ["src:", "alt:", "caption:", "credit:", "sourcePage:", "license:", "licenseUrl:"]) {
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
else console.log("10 music history routes: content, citations, author desk, accessible comparison and source chronology contract PASS; external crawl, visual and originality certification remain separate");
