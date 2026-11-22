import fs from "node:fs";

// Read official facts and production pages. Never update editorial dates from HTTP success.
const official = [
  { name: "TPWD Big Bend Ranch check-in and interior road", url: "https://tpwd.texas.gov/state-parks/big-bend-ranch/map", patterns: [/27 miles/i, /permanently closed/i, /Contrabando/i] },
  { name: "TPWD all four Lighthouse Lakes initial access coordinates", url: "https://tpwd.texas.gov/boating/paddling-trails/gulf-coast/lighthouse-lakes/", patterns: [/27\.8753/i, /27\.8691/i, /27\.8622/i, /27\.8680/i] },
  { name: "TPWD Lady Bird Lake additional official access points", url: "https://tpwd.texas.gov/boating/paddling-trails/hill-country/lady-bird-lake/", patterns: [/30\.2748/i, /30\.2642/i, /30\.2515/i, /30\.2483/i] },
  { name: "Federal Sam Houston pass purchase and offline proof", url: "https://www.recreation.gov/activitypass/f7f9e063-17cc-11eb-8594-76eb6c9a5645", patterns: [/888-361-6908/i, /non-refundable/i, /license plate/i, /printing is encouraged/i] },
  { name: "TPWD Tyler trail progression and clockwise bike direction", url: "https://tpwd.texas.gov/state-parks/tyler/trails-info/", patterns: [/EZ Loop/i, /0\.8 mi/i, /clockwise/i, /C Loop/i, /D Loop/i] },
  { name: "TPWD Palo Duro CCC descent and MTB loop", url: "https://tpwd.texas.gov/state-parks/palo-duro-canyon/trails-info", patterns: [/500 feet/i, /Capitol Peak/i, /3\.5 mi/i] },
  { name: "TPWD Hill Country equestrian campsite products", url: "https://tpwd.texas.gov/state-parks/hill-country/fees-facilities/horse-sites", patterns: [/Primitive Campsites/i, /Chapas Camp/i, /first-come/i] },
  { name: "TPWD Dinosaur Valley guided ride", url: "https://tpwd.texas.gov/state-parks/dinosaur-valley/", patterns: [/Eagle Eye Ranch/i, /817-382-9855/i] },
  { name: "NPS Lake Meredith ORV road access and permit application", url: "https://www.nps.gov/lamr/planyourvisit/ohv-off-highway-vehicles.htm", patterns: [/FM 1913/i, /87\/287/i, /Application For Special Use Permit/i] },
  { name: "TPWD Buffalo Bayou and Lady Bird Lake access coordinate evidence", url: "https://tpwd.texas.gov/boating/paddling-trails/gulf-coast/buffalo-bayou/", patterns: [/29\.7647/i, /-95\.3592/i, /Dairy Ashford/i, /Sabine Street/i] },
  { name: "TPWD South Llano monitor interpretation", url: "https://tpwd.texas.gov/state-parks/south-llano-river/dark-skies", patterns: [/21\.5/i, /22\.5/i, /15 minutes/i] },
  { name: "TPWD Copper Breaks seasonal scheduled programs", url: "https://tpwd.texas.gov/state-parks/copper-breaks/stargazing", patterns: [/April through November/i, /campsite/i] },
  { name: "TPWD Austin Redbud and Festival Beach verified GPS", url: "https://tpwd.texas.gov/boating/paddling-trails/hill-country/lady-bird-lake/", patterns: [/30\.2911/i, /30\.2483/i] },
  { name: "TPWD Buffalo Bayou Highway 6 and Terry Hershy GPS", url: "https://tpwd.texas.gov/boating/paddling-trails/gulf-coast/buffalo-bayou/", patterns: [/29\.7694/i, /29\.7733/i] },
  { name: "TPWD Waco two loops and Bledsoe dock GPS", url: "https://tpwd.texas.gov/boating/paddling-trails/prairies-and-lakes/bosque-bluffs-and-brazos-bridges/", patterns: [/31\.5929/i, /31\.5879/i, /31\.5628/i] },
  { name: "TPWD Caddo Lake Mill Pond GPS", url: "https://tpwd.texas.gov/boating/paddling-trails/pineywoods/hells-half-acre/", patterns: [/32\.6942/i, /Mill Pond Canoe\/Kayak Launch/i] },
  { name: "TPWD Lighthouse Lakes Cutters and South Bay launches", url: "https://tpwd.texas.gov/boating/paddling-trails/gulf-coast/lighthouse-lakes/", patterns: [/27\.8691/i, /27\.8753/i] },

  { name: "TPWD specific Eisenhower trail segments and 50-inch limit", url: "https://tpwd.texas.gov/state-parks/eisenhower/ohvs", patterns: [/Pee Wee Practice Area/i, /50 inches/i, /Big Woods Canyon/i] },
  { name: "TPWD Copper Breaks Dark Sky Viewing Area coordinates", url: "https://tpwd.texas.gov/state-parks/copper-breaks/trails-info", patterns: [/Dark Sky Viewing Area/i, /34\.1183/i] },
  { name: "TPWD Franklin elevations for contextual comparison", url: "https://tpwd.texas.gov/state-parks/franklin-mountains", patterns: [/7,192/i, /5,120/i] },
  { name: "TPWD explicit South Llano after-hours fee", url: "https://tpwd.texas.gov/state-parks/south-llano-river/dark-skies", patterns: [/past 10 p\.m\./i, /night activity fee/i] },
  { name: "TPWD Lighthouse Lakes named coastal launch and crossing", url: "https://tpwd.texas.gov/boating/paddling-trails/gulf-coast/lighthouse-lakes/", patterns: [/Hwy 361/i, /Aransas/i] },

  { name: "Sam Houston Recreation.gov individual passes and OHV limit", url: "https://www.recreation.gov/activitypass/f7f9e063-17cc-11eb-8594-76eb6c9a5645", patterns: [/50 inches/i, /pass is required per person/i, /936-344-6205/i] },
  { name: "NPS Lake Meredith year and zone boundaries", url: "https://www.nps.gov/lamr/planyourvisit/ohv-off-highway-vehicles.htm", patterns: [/December 31/i, /Blue Creek/i, /Rosita/i] },
  { name: "TPWD official Big Bend Ranch outfitter listing", url: "https://tpwd.texas.gov/state-parks/big-bend-ranch/outfitters", patterns: [/horseback riding/i, /guide service providers/i] },
  { name: "TPWD Hill Country SNA listed riding services", url: "https://tpwd.texas.gov/state-parks/hill-country/guide-service", patterns: [/Bandera Historical Rides/i, /Guide Service Providers/i] },
  { name: "TPWD paddling access and river FAQs", url: "https://tpwd.texas.gov/boating/paddling-trails/faqs/", patterns: [/take-out/i, /flow/i, /shuttle/i] },
  { name: "U.S. Naval Observatory moonrise/moonset tool", url: "https://aa.usno.navy.mil/data/RS_OneYear", patterns: [/Sun/i, /Moon/i] },
  { name: "TPWD certified paddling trails", url: "https://tpwd.texas.gov/boating/paddling-trails/", patterns: [/100 certified trails/i] },
  { name: "TPWD horse requirements", url: "https://tpwd.texas.gov/state-parks/parks/things-to-do/equestrian", patterns: [/Coggins/i, /Dinosaur Valley/i] },
  { name: "TPWD OHV legal venues", url: "https://tpwd.texas.gov/state-parks/texas-off-highway-program/where-to-ride-ohvs-in-texas", patterns: [/Barnwell/i, /Sam Houston/i] },
  { name: "TPWD OHV decal FAQ", url: "https://tpwd.texas.gov/state-parks/texas-off-highway-program/faqs-about-the-texas-ohv-program", patterns: [/Barnwell Mountain/i, /private/i, /grant/i] },
  { name: "TPWD current decal price and period", url: "https://tpwd.texas.gov/state-parks/texas-off-highway-program/where-to-buy-a-texas-ohv-decal", patterns: [/\$16/i, /Sept/i, /Aug/i] },
  { name: "NPS Meredith ORV permits", url: "https://www.nps.gov/lamr/planyourvisit/ohv-off-highway-vehicles.htm", patterns: [/Blue Creek/i, /Rosita/i, /permit/i] },
  { name: "TPWD Bortle ratings", url: "https://tpwd.texas.gov/state-parks/parks/things-to-do/stargazing/bortle-ratings", patterns: [/Caprock Canyons/i, /Copper Breaks/i, /South Llano River/i] },
  { name: "TPWD e-bike policy", url: "https://tpwd.texas.gov/state-parks/parks/things-to-do/biking-in-state-parks", patterns: [/E-bikes are allowed/i, /not on park trails/i] },
  { name: "Barnwell operator", url: "https://www.barnwellmountainra.com/info_directions", patterns: [/Barnwell/i] },
  { name: "Escondido operator", url: "https://www.escondidodraw.org/policies_fees.html", patterns: [/Escondido/i] },
];
const livePages = [
  { slug: "texas-mountain-biking-guide", must: ["Which Texas mountain bike trail should you ride first?", "Mobile comparison summary", "Five trailhead decisions that change the ride", "Choose an actual route", "e-bikes may use public park roadways", "Trailhead and parking decision", "Tom Mays Unit"] },
  { slug: "texas-horseback-riding-guide", must: ["Where can you book horseback riding without owning a horse?", "Mobile comparison summary", "Trailhead, equestrian campsite and guided service are three separate decisions", "Compare trailer logistics", "Trailer and rider checklist", "Lajitas Stables", "Bandera Historical Rides", "Guided ride or your own horse?"] },
  { slug: "texas-ohv-guide", must: ["Which Texas OHV permits and access points should you confirm before towing?", "Mobile comparison summary", "Trail names, entrance approaches and closure checks", "Which venue fits your machine?", "Before loading the trailer", "When does a Texas OHV decal apply?", "ordinary private property", "Sam Houston Multiple-Use Trail Pass", "50 inches", "NPS photo"] },
  { slug: "texas-paddling-guide", must: ["Which put-in and takeout make a practical Texas paddle?", "Mobile comparison summary", "Buffalo Bayou (west to east) numbered access point locations", "Lady Bird Lake (west to east) numbered access point locations", "Waco: Bosque Bluffs and Brazos Bridges numbered access point locations", "Caddo Lake: Hell\'s Half Acre numbered access point locations", "Lighthouse Lakes: coastal access numbered access point locations", "Individual put-ins, takeouts and water-condition links", "100 certified paddling trails", "Bosque Bluffs", "Lighthouse Lakes", "Launch and current-condition decision", "USGS river gauge", "NWS Corpus Christi marine conditions"] },
  { slug: "texas-stargazing-guide", must: ["When is the best time to stargaze in a Texas dark-sky park?", "Mobile comparison summary", "Where to set up, how to gain access, and what to check that night", "Compare actual sky darkness", "Plan the observing window", "Five certified state parks", "Big Bend National Park", "US Naval Observatory", "moonrise", "Where to view and what to confirm"] },
];
// Protect keyboard access to each guide's intact, responsive comparison table.
const comparisonLabels = {
  "texas-mountain-biking-guide": "Five Texas mountain biking trail systems comparison table",
  "texas-horseback-riding-guide": "Five Texas horseback riding destinations comparison table",
  "texas-ohv-guide": "Five legal Texas OHV riding areas comparison table",
  "texas-paddling-guide": "Five official Texas paddling trails comparison table",
  "texas-stargazing-guide": "Five certified Texas dark sky state parks comparison table",
};
const failures = [], evidence = [];
async function get(url) {
  let last;
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const response = await fetch(url, { headers: { "user-agent": "TexasDefinedEditorialSourceReview/1.0" }, signal: AbortSignal.timeout(18000), redirect: "follow" });
      if (!response.ok) throw new Error("HTTP " + response.status);
      const html = await response.text();
      if (html.length < 500) throw new Error("Unexpected short HTML");
      return html;
    } catch (error) { last = error; }
  }
  throw last;
}
for (const item of official) {
  try {
    const body = await get(item.url);
    const missing = item.patterns.filter((pattern) => !pattern.test(body)).map(String);
    if (missing.length) failures.push(item.name + ": possible fact drift " + missing.join(", "));
    evidence.push({ name: item.name, url: item.url, verified: missing.length === 0, missing });
  } catch (error) {
    failures.push(item.name + ": inaccessible " + String(error.message));
    evidence.push({ name: item.name, url: item.url, verified: false, error: String(error.message) });
  }
}
for (const item of livePages) {
  for (const origin of ["https://texasdefined.com", "https://texasdefined-site.freddy-coppola.workers.dev"]) {
    for (const cacheBust of [false, true]) {
      const canonical = "https://texasdefined.com/" + item.slug;
      const url = origin + "/" + item.slug + (cacheBust ? "?outdoor_authority_audit=" + encodeURIComponent(process.env.GITHUB_RUN_ID || "manual") : "");
      try {
        const body = await get(url);
        const visible = body.replace(/&amp;/g, "&");
        const missing = item.must.filter((token) => !visible.includes(token));
        const noindex = /<meta[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(body);
        const canonicalMatch = body.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)/i)?.[1];
        const wrongCanonical = canonicalMatch !== canonical;
        const comparisonLabel = comparisonLabels[item.slug];
        const accessibleComparison = [...visible.matchAll(/<div\b[^>]*>/gi)].some(([tag]) =>
          tag.includes('aria-label="' + comparisonLabel + '"') && /\brole="region"/i.test(tag) && /\btabindex="0"/i.test(tag));
        if (missing.length || noindex || wrongCanonical || !accessibleComparison) failures.push(item.slug + " [" + origin + (cacheBust ? ",busted" : ",visitor") + "]: missing " + missing.join(", ") + (noindex ? "; noindex" : "") + (wrongCanonical ? "; canonical=" + canonicalMatch : "") + (!accessibleComparison ? "; comparison region not keyboard accessible" : ""));
        evidence.push({ name: item.slug, url, verified: !missing.length && !noindex && !wrongCanonical && accessibleComparison, missing, noindex, canonicalMatch, accessibleComparison });
      } catch (error) {
        failures.push(item.slug + " [" + origin + "]: inaccessible " + String(error.message));
        evidence.push({ name: item.slug, url, verified: false, error: String(error.message) });
      }
    }
  }
}
// Confirm Google-discoverable primary sitemap lists the five substantially revised
// guides with their genuine editorial lastmod (not a synthetic scan timestamp).
for (const origin of ["https://texasdefined.com", "https://texasdefined-site.freddy-coppola.workers.dev"]) {
  for (const cacheBust of [false, true]) {
    const url = origin + "/sitemap.xml" + (cacheBust ? "?outdoor_sitemap_audit=" + encodeURIComponent(process.env.GITHUB_RUN_ID || "manual") : "");
    try {
      const xml = await get(url);
      const missing = Object.keys(comparisonLabels).filter((slug) =>
        !xml.includes("<loc>https://texasdefined.com/" + slug + "</loc><lastmod>2026-11-21</lastmod>"));
      if (missing.length) failures.push("Primary sitemap [" + origin + (cacheBust ? ",busted" : ",visitor") + "]: missing Nov21 editorial lastmod for " + missing.join(", "));
      evidence.push({ name: "five-outdoor-guides-sitemap", url, verified: missing.length === 0, missing });
    } catch (error) {
      failures.push("Primary sitemap [" + origin + "]: inaccessible " + String(error.message));
      evidence.push({ name: "five-outdoor-guides-sitemap", url, verified: false, error: String(error.message) });
    }
  }
}
const report = { checkedAt: new Date().toISOString(), officialSourceCount: official.length, livePageCount: livePages.length, evidence, failures };
fs.writeFileSync("outdoor-guides-authority-audit.json", JSON.stringify(report, null, 2) + "\n");
console.log(JSON.stringify(report, null, 2));
if (failures.length) process.exitCode = 1;
