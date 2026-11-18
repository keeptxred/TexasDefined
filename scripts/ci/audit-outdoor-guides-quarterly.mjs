import fs from "node:fs";

// Read official facts and production pages. Never update editorial dates from HTTP success.
const official = [
  { name: "TPWD certified paddling trails", url: "https://tpwd.texas.gov/boating/paddling-trails/", patterns: [/100 certified trails/i] },
  { name: "TPWD horse requirements", url: "https://tpwd.texas.gov/state-parks/parks/things-to-do/equestrian", patterns: [/Coggins/i, /Dinosaur Valley/i] },
  { name: "TPWD OHV legal venues", url: "https://tpwd.texas.gov/state-parks/texas-off-highway-program/where-to-ride-ohvs-in-texas", patterns: [/Barnwell/i, /Sam Houston/i] },
  { name: "NPS Meredith ORV permits", url: "https://www.nps.gov/lamr/planyourvisit/ohv-off-highway-vehicles.htm", patterns: [/Blue Creek/i, /Rosita/i, /permit/i] },
  { name: "TPWD Bortle ratings", url: "https://tpwd.texas.gov/state-parks/parks/things-to-do/stargazing/bortle-ratings", patterns: [/Caprock Canyons/i, /Copper Breaks/i, /South Llano River/i] },
  { name: "TPWD e-bike policy", url: "https://tpwd.texas.gov/state-parks/parks/things-to-do/biking-in-state-parks", patterns: [/E-bikes are allowed/i, /not on park trails/i] },
  { name: "Barnwell operator", url: "https://www.barnwellmountainra.com/info_directions", patterns: [/Barnwell/i] },
  { name: "Escondido operator", url: "https://www.escondidodraw.org/policies_fees.html", patterns: [/Escondido/i] },
];
const livePages = [
  { slug: "texas-mountain-biking-guide", must: ["Choose an actual route", "e-bikes may use public park roadways"] },
  { slug: "texas-horseback-riding-guide", must: ["Compare trailer logistics", "Trailer and rider checklist"] },
  { slug: "texas-ohv-guide", must: ["Which venue fits your machine?", "Before loading the trailer"] },
  { slug: "texas-paddling-guide", must: ["100 certified paddling trails", "Bosque Bluffs", "Lighthouse Lakes"] },
  { slug: "texas-stargazing-guide", must: ["Compare actual sky darkness", "Plan the observing window"] },
];
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
  const url = "https://texasdefined.com/" + item.slug;
  try {
    const body = await get(url);
    const missing = item.must.filter((token) => !body.includes(token));
    const noindex = /<meta[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(body);
    const wrongCanonical = !body.includes(url);
    if (missing.length || noindex || wrongCanonical) failures.push(item.slug + ": missing " + missing.join(", ") + (noindex ? "; noindex" : "") + (wrongCanonical ? "; canonical" : ""));
    evidence.push({ name: item.slug, url, verified: !missing.length && !noindex && !wrongCanonical, missing, noindex, wrongCanonical });
  } catch (error) {
    failures.push(item.slug + ": inaccessible " + String(error.message));
    evidence.push({ name: item.slug, url, verified: false, error: String(error.message) });
  }
}
const report = { checkedAt: new Date().toISOString(), officialSourceCount: official.length, livePageCount: livePages.length, evidence, failures };
fs.writeFileSync("outdoor-guides-authority-audit.json", JSON.stringify(report, null, 2) + "\n");
console.log(JSON.stringify(report, null, 2));
if (failures.length) process.exitCode = 1;
