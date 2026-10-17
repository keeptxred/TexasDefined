import { readFileSync } from "node:fs";

const source = readFileSync("src/data/texas-water-parks.ts", "utf8");
const hub = readFileSync("src/routes/explore.water-parks.index.tsx", "utf8");
const detail = readFileSync("src/routes/explore.water-parks.$slug.tsx", "utf8");
const detailUi = readFileSync("src/routes/explore.water-parks.$slug.lazy.tsx", "utf8");
const headBuilders = readFileSync("src/data/texas-water-parks-seo.ts", "utf8");
const hubUi = readFileSync("src/routes/explore.water-parks.index.lazy.tsx", "utf8");
const sitemap = readFileSync("src/routes/sitemap-explore[.]xml.ts", "utf8");
const explore = readFileSync("src/routes/explore.index.lazy.tsx", "utf8");
const countyRoute = readFileSync("src/routes/$kind.$slug.tsx", "utf8");
const countyUi = readFileSync("src/routes/$kind.$slug.lazy.tsx", "utf8");
const countyWidget = readFileSync("src/components/content/CountyWaterParks.tsx", "utf8");
const match = source.match(/export const texasWaterParks: WaterParkGuide\[\] = (\[[\s\S]*?\]);\nexport const texasWaterParksBySlug/);
if (!match) throw new Error("Canonical Texas water-park source registry is missing.");
const parks = JSON.parse(match[1]);
if (parks.length < 124) throw new Error(`Water-park census unexpectedly dropped from 124 to ${parks.length} sources.`);
const slugs = new Set();
const names = new Set();
for (const park of parks) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(park.slug)) throw new Error(`Bad water-park slug: ${park.slug}`);
  if (slugs.has(park.slug)) throw new Error(`Duplicate water-park slug: ${park.slug}`);
  slugs.add(park.slug);
  if (names.has(park.name)) throw new Error(`Duplicate named water-park venue: ${park.name}`);
  names.add(park.name);
  if (!park.city || !park.region || !park.setting || !park.kind || !park.admission) throw new Error(`Incomplete park: ${park.slug}`);
  if (!park.summary || park.summary.length < 55 || !park.distinctiveNote || park.distinctiveNote.length < 55) {
    throw new Error(`Missing visitor-specific facts: ${park.slug}`);
  }
  if (!/^https:\/\/[a-z0-9.-]+\//i.test(park.officialUrl)) throw new Error(`Park lacks HTTPS official source: ${park.slug}`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(park.reviewedAt)) throw new Error(`Source review date invalid: ${park.slug}`);
  if (park.visitorFaqs) {
    if (park.visitorFaqs.length < 2) throw new Error(`Insufficient visitor questions for ${park.slug}`);
    const questions = new Set();
    for (const faq of park.visitorFaqs) {
      if (!faq.question || faq.answer?.length < 55 || !/^https:\/\//.test(faq.sourceUrl) || questions.has(faq.question)) throw new Error(`Invalid or duplicate sourced visitor answer for ${park.slug}`);
      questions.add(faq.question);
    }
  }
}
for (const park of parks) {
  // A statewide directory row cannot substitute for a researched individual guide.
  if (!park.visitorAddress || !/^.{10,140}$/.test(park.visitorAddress)) throw new Error(`Missing individual park address: ${park.slug}`);
  if (!Array.isArray(park.visitorHighlights) || park.visitorHighlights.length < 3 || park.visitorHighlights.some((entry) => typeof entry !== "string" || entry.length < 20)) throw new Error(`Insufficient individual waterpark highlights: ${park.slug}`);
  if (!Array.isArray(park.visitorFaqs) || park.visitorFaqs.length < 2) throw new Error(`Missing sourced park-specific questions: ${park.slug}`);
  for (const faq of park.visitorFaqs) if (!faq.question || faq.answer.length < 55 || !faq.sourceUrl.startsWith("https://")) throw new Error(`Incomplete source-linked park answer: ${park.slug}`);
  if (park.areaAttractions) {
    if (!Array.isArray(park.areaAttractions) || park.areaAttractions.length < 2) throw new Error(`Too few county attractions for ${park.slug}`);
    const hrefs = new Set();
    for (const item of park.areaAttractions) {
      if (!item.label || !/^\/(destination|article)\/[a-z0-9-]+$/.test(item.href) || hrefs.has(item.href)) throw new Error(`Invalid or duplicate county attraction link: ${park.slug}`);
      hrefs.add(item.href);
    }
  }
  if (park.licensedMedia) {
    const media = park.licensedMedia;
    if (!/^https:\/\/commons\.wikimedia\.org\/wiki\/Special:Redirect\/file\//.test(media.src)
        || !/^https:\/\/commons\.wikimedia\.org\/wiki\/File:/.test(media.sourceUrl)
        || !/^https:\/\/creativecommons\.org\//.test(media.licenseUrl)
        || !media.photographer || !media.licenseLabel || !media.alt || !Number.isInteger(media.year)
        || media.year > new Date().getFullYear() || media.year < 1990) {
      throw new Error(`Unlicensed or insufficiently attributed park media: ${park.slug}`);
    }
  }
}
if (!detailUi.includes("park.visitorHighlights.map") || !detailUi.includes("park.visitorAddress")) throw new Error("Source-reviewed address and amenities must render on individual guides.");
if (!detailUi.includes("park.areaAttractions.map")) throw new Error("Curated area attractions must render in venue guides.");
if (!detailUi.includes("park.licensedMedia.src") || !detailUi.includes("park.licensedMedia.sourceUrl") || !detailUi.includes("park.licensedMedia.licenseUrl")) throw new Error("Licensed venue photographs require in-page attribution and source/license links.");
for (const closed of ["hurricane-alley-corpus-christi", "splashtown-san-antonio", "water-park-at-the-villages-flint"]) {
  if (slugs.has(closed)) throw new Error(`Closed or unverified park published as open: ${closed}`);
}
for (const anchor of ['"/explore/water-parks"', '...(await indexReadyWaterParkPaths())']) {
  if (!sitemap.includes(anchor)) throw new Error(`Sitemap missing park route coverage: ${anchor}`);
}
if ((sitemap.match(/await indexReadyWaterParkPaths\(\)/g) ?? []).length < 2) throw new Error("Both primary and fallback explore sitemaps must include waterpark guides.");
if (!headBuilders.includes('"@type": "ItemList"') || !hubUi.includes("useState") || !hubUi.includes("actively researched collection")) throw new Error("Directory must preserve schema, filtering and census completeness disclosure.");
if (!headBuilders.includes('robots: park.authorityReady ? undefined : "noindex, follow"')) throw new Error("Uncertified water-park guides must remain noindex.");
const authorityReady = parks.filter((park) => park.authorityReady);
for (const park of authorityReady) {
  const evidence = park.authorityEvidence;
  if (!evidence?.exactAddress || !evidence?.licensedImageSrc || !evidence?.imageCredit || !evidence?.accessVerifiedAt || !Array.isArray(evidence.rideHighlights) || evidence.rideHighlights.length < 3 || !Array.isArray(evidence.sourceUrls) || evidence.sourceUrls.length < 2) {
    throw new Error(`Attempted indexation without primary-source + photography + features authority proof: ${park.slug}`);
  }
}
if (!headBuilders.includes('"@type": "TouristAttraction"') || !headBuilders.includes('park.officialUrl') || !detailUi.includes('park.distinctiveNote')) throw new Error("Per-park pages require operator facts and tourist attraction schema.");
if (!hub.includes('import("@/data/texas-water-parks")') || !detail.includes('import("@/data/texas-water-parks")') || !hub.includes('import("@/data/texas-water-parks-seo")') || !detail.includes('import("@/data/texas-water-parks-seo")')) throw new Error("Both water-park routes must lazy-load source records to protect client bundles.");
if (!detailUi.includes('href={`/county/${park.county.toLowerCase().replace(/\\s+/g, "-")}`}')) throw new Error("Visitor guides must link to canonical county pages rather than directory fragments.");
if (!detailUi.includes("park.visitorFaqs.map") || !detailUi.includes("Official source")) throw new Error("Operator-sourced visitor answers must render with each park-specific source.");
if (!detailUi.includes("Open map and directions for this venue") || !detailUi.includes("encodeURIComponent(park.visitorAddress)")) throw new Error("Exact-address waterpark visitor guides need map directions.");
if (detailUi.includes("Check official tickets, hours and rules")) throw new Error("Not every official waterpark source is a booking page.");
if (!countyRoute.includes("countyWaterParksPromise") || !countyRoute.includes("countyWaterParks") || !countyUi.includes("<CountyWaterParks") || !countyWidget.includes("data-county-water-parks") || !countyWidget.includes("/explore/water-parks/")) throw new Error("County waterpark reverse links must remain source-backed and SSR-visible.");
if (!explore.includes('to="/explore/water-parks"')) throw new Error("Explore landing must link to the new water-park hub.");
console.log(`Texas water-park guide contract passed: ${parks.length} unique official-source facilities, primary/fallback sitemaps, venue pages and truthful census scope.`);
