import fs from "node:fs";

// Fail closed. Date-only drift is handled by refresh-turkey-season-calendar.mjs; this check covers core legal text.
// Exit 3 means an upstream request failed; never mislabel a network error as a rule change.
const pages = [
  {
    label: "2026–27 Wild Turkey Outdoor Annual",
    url: "https://tpwd.texas.gov/regulations/outdoor-annual/regs/animals/turkey",
    assertions: [
      "Wild Turkey 2026-2027 Seasons",
      "Upland Game Bird Endorsement",
      "Harvest of unbearded hens is prohibited",
      "Mandatory harvest reporting within 24 hours of harvest",
    ],
  },
  {
    label: "TPWD 2026–27 drawn National Refuge Spring Turkey hunts",
    url: "https://tpwd.texas.gov/huntwild/hunt/public/public_hunt_drawing/hunt-category-details.phtml?OCat=NTS",
    assertions: [
      "National Refuge Spring Turkey",
      "November 01, 2026",
      "Hagerman NWR",
      "Lower Rio Grande Valley NWR",
      "Apr 22, 2027",
      "Apr 02, 2027",
    ],
  },
  {
    label: "TPWD 2026–27 walk-in hunting access",
    url: "https://tpwd.texas.gov/huntwild/hunt/public/annual_public_hunting/",
    assertions: ["2026-27", "Annual Public Hunting", "$48", "Area/Legal Game Search"],
  },
  {
    label: "TPWD turkey harvest and recruitment data",
    url: "https://tpwd.texas.gov/huntwild/wild/game_management/turkey/turkeyData.phtml",
    assertions: ["Summer Turkey Survey Results", "Statewide Mandatory Wild Turkey Harvest Data"],
  },
  {
    label: "2026–27 adopted turkey regulation changes",
    url: "https://tpwd.texas.gov/newsmedia/releases/?req=20260401b",
    assertions: [
      "Matagorda and Wharton counties were closed to wild turkey hunting",
    ],
  },
];

const source = fs.readFileSync("src/data/hunting/turkey-guide.ts", "utf8");
const reviewed = source.match(/TURKEY_GUIDE_LAST_VERIFIED = "(20\d{2}-\d{2}-\d{2})"/);
if (!reviewed || !source.includes("Matagorda and Wharton")) {
  console.error("Local turkey guide provenance or county closure missing; editorial review required.");
  process.exit(2);
}
const reviewDate = Date.parse(reviewed[1] + "T00:00:00Z");
if (!Number.isFinite(reviewDate) || reviewDate > Date.now() + 86400000) {
  console.error("Invalid turkey guide review date; editorial review required.");
  process.exit(2);
}

function normalize(html) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;|&#160;|&#xA0;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/[–—]/g, "-")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

let upstreamFailed = false;
const changes = [];
for (const page of pages) {
  let body;
  try {
    const response = await fetch(page.url, { signal: AbortSignal.timeout(25000), headers: { "User-Agent": "TexasDefined-turkey-source-check/1.0 (editorial monitoring)" } });
    if (!response.ok) throw new Error("HTTP " + response.status);
    body = normalize(await response.text());
    if (!body.includes("texas parks")) throw new Error("Unexpected non-TPWD response");
  } catch (err) {
    upstreamFailed = true;
    console.error("Upstream fetch unavailable for " + page.label + ": " + String(err));
    continue;
  }
  for (const item of page.assertions) {
    if (!body.includes(normalize(item))) changes.push({ page: page.label, expected: item, url: page.url });
  }
}

if (upstreamFailed) process.exit(3);
if (changes.length) {
  console.error("TPWD turkey content may have changed. DO NOT automatically publish replacement regulations:");
  for (const change of changes) console.error("- " + change.page + " no longer matches: " + change.expected + " (" + change.url + ")");
  process.exit(2);
}
console.log("Verified official TPWD legal, public-access, drawing and harvest markers. No detected source drift; editorial verification remains " + reviewed[1] + " (never automatically advanced).");
