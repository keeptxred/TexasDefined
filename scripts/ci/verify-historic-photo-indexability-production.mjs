#!/usr/bin/env node
// Exact-deployment production contract: a correct HTTP page alone does not
// certify which physical heritage site an image portrays or whether it is
// appropriate to include that page in search discovery / Trip Planner.
const origin = "https://texasdefined.com";
const errors = [];
async function load(path) {
  const url = new URL(path, origin);
  url.searchParams.set("historic_photo_verify", process.env.PRODUCTION_COMMIT_SHA || "current");
  const response = await fetch(url, { headers: { "user-agent": "TexasDefined-Historic-Photo-Verifier/1.0" }, redirect: "follow", signal: AbortSignal.timeout(25000) });
  if (!response.ok) throw Error(path + " returned HTTP " + response.status);
  return response.text();
}
function imageSource(html) {
  const raw = html.match(/<meta\s+property="og:image"\s+content="([^"]+)"/i)?.[1] || "";
  try {
    const parsed = new URL(raw.replaceAll("&amp;", "&"));
    let source = parsed.searchParams.get("url") || parsed.href;
    // Commons filename embedded in the TexasDefined media URL is URL-escaped twice.
    for (let i = 0; i < 3; i++) { try { const next = decodeURIComponent(source); if (next === source) break; source = next; } catch { break; } }
    return source;
  } catch { return raw; }
}
function imageMatches(html, basename) {
  return imageSource(html).toLowerCase().includes(basename.toLowerCase());
}
function hasIndexMeta(html) {
  return !/<meta\s+name="robots"\s+content="[^"]*noindex/i.test(html);
}
try {
  const xml = await load("/sitemap-explore.xml");
  if (!xml.includes("<urlset")) errors.push("Explore sitemap lacks XML urlset");
  for (const test of [
    { slug: "kreische-brewery", expected: "Kreische Brewery Ruins Lower View.jpg", original: "https://commons.wikimedia.org/wiki/File:Kreische_Brewery_Ruins_Lower_View.jpg" },
    { slug: "monument-hill", expected: "Monument hill monument.jpg", original: "https://commons.wikimedia.org/wiki/File:Monument_hill_monument.jpg" },
  ]) {
    const html = await load("/destination/" + test.slug);
    if (!html.includes('rel="canonical" href="' + origin + '/destination/' + test.slug + '"')) errors.push(test.slug + " wrong canonical");
    if (!hasIndexMeta(html)) errors.push(test.slug + " unintentionally noindex");
    if (!imageMatches(html, test.expected)) errors.push(test.slug + " preferred image isn't its actual individual historic subject: " + imageSource(html));
    if (!html.includes(test.original)) errors.push(test.slug + " missing exact original Commons photographer/license source link");
    if (!xml.includes("<loc>" + origin + "/destination/" + test.slug + "</loc>")) errors.push(test.slug + " absent from canonical Explore sitemap");
  }
  for (const slug of ["old-socorro-mission", "lipantitlan"]) {
    const html = await load("/destination/" + slug);
    if (!html.includes('rel="canonical" href="' + origin + '/destination/' + slug + '"')) errors.push(slug + " wrong historical reference canonical");
    if (hasIndexMeta(html)) errors.push(slug + " inappropriately indexable with no licensed site-specific photograph");
    if (slug === "old-socorro-mission") {
      // The dedicated chronology/archaeology page replaces the generic image
      // placeholder with a text-first hero and a transparently captioned NPS
      // comparison photo of the LATER church. This must not be labeled the old site.
      if (!html.includes("Old Socorro Mission") || !html.includes("original mission site is closed")) errors.push("Old Socorro dedicated historical page or closure disclosure missing");
      if (!html.includes("Different location") || !html.includes("does not") || !html.includes("archaeological site")) errors.push("Modern Socorro contextual photo lacks clear subject warning");
      if (/maps\/search\/|maps\/dir\/|google\.com\/maps\/place\//.test(html)) errors.push("Closed Old Socorro page offers travel directions");
    } else if (!html.includes("texasdefined-destination-placeholder.svg")) {
      errors.push(slug + " missing candid photo-unavailable placeholder");
    }
    if (xml.includes("<loc>" + origin + "/destination/" + slug + "</loc>")) errors.push(slug + " in sitemap despite noindex and missing exact site photo");
  }
  const firstCapitol = await load("/destination/first-capitol-of-texas");
  if (!hasIndexMeta(firstCapitol)) errors.push("First Capitol historical reference lost indexability");
  if (!xml.includes("<loc>" + origin + "/destination/first-capitol-of-texas</loc>")) errors.push("First Capitol indexed page absent from sitemap");
  // Preserve plain-language 'Not Open' warnings and never link to an actual visit
  // booking flow at a THC-closed original site.
  if (!/not open|closed to/i.test(firstCapitol)) errors.push("First Capitol lost its visitor closure warning");
  const socorro = await load("/destination/old-socorro-mission");
  if (!/closed to the public|closed to visitors/i.test(socorro)) errors.push("Old original Socorro lost its closure warning");
} catch (e) { errors.push(String(e?.message || e)); }
console.log(JSON.stringify({ check: "historic-site-photo-subject-and-indexability", passed: errors.length === 0, errors }, null, 2));
if (errors.length) process.exitCode = 1;
