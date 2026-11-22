import fs from "node:fs/promises";

// Narrow source-drift guard: do not auto-publish changing fees or fire restrictions
// from scraped markup. Raise actionable drift for human source verification.
const ROOT = "https://tpwd.texas.gov/state-parks/martin-creek-lake";
const BOOK = "https://texasstateparks.reserveamerica.com/martin-creek-lake-state-park/r/facilityDetails.do?contractCode=TX&parkId=1200121";
const COUNTY_FIRE = "https://www.ruskcountytxfire.gov/rusk-county-burn-ban-status";
const sources = [
  { label: "TPWD park operations and firewood quarantine", url: ROOT, required: [
    ["gate closing at 10 p.m.", /6\s*a\.m\.\s*[–-]\s*10\s*p\.m\./i],
    ["firewood quarantine", /emerald ash borer/i],
    ["no lifeguards", /do not have lifeguards/i],
    ["rent canoes", /rent canoes/i],
  ] },
  { label: "TPWD official trail distances", url: ROOT + "/trails-info", required: [
    ["Old Henderson Road 1.4 miles", /Old Henderson Road Loop\s+1\.4\s*mi/i],
    ["Harmony Hill 1.7 miles", /Harmony Hill Loop\s+1\.7\s*mi/i],
    ["Island Trails 0.9 miles", /Island Trails\s+0\.9\s*mi/i],
  ] },
  { label: "TPWD screened shelters", url: ROOT + "/fees-facilities/screened-shelters", required: [
    ["19 shelters", /Number of Sites:\s*19/i],
    ["$30 shelter rate", /\$\s*30\b/],
  ] },
  { label: "TPWD lodging", url: ROOT + "/fees-facilities/martin-creek-lodging/", required: [
    ["$85 cabin rate", /\$\s*85\b/],
    ["$55 cottage rate", /\$\s*55\b/],
    ["$75 deposit", /\$\s*75\b/],
  ] },
  { label: "TPWD lake access", url: "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/martin_creek/access.phtml", required: [
    ["four-lane ramp", /Four-lane ramp/i],
  ] },
  { label: "TPWD campsite classes", url: ROOT + "/fees-facilities/campsites", required: [
    ["13 lakefront sites", /Number of Sites:\s*13/i],
    ["6 fifty-amp sites", /Number of Sites:\s*6/i],
    ["37 standard sites", /Number of Sites:\s*37/i],
    ["nightly $17 rate", /\$\s*17\b/],
    ["nightly $20 rate", /\$\s*20\b/],
  ] },
  { label: "TPWD entrance fees", url: ROOT + "/fees-facilities/entrance-fees", required: [
    ["adult daily $4", /\$\s*4\b/],
    ["under-13 free entrance", /Free/i],
  ] },
  { label: "TPWD active alerts", url: ROOT + "/alert", required: [
    ["Argentine ant alert", /Argentine ants/i],
  ], forbidden: [
    ["new or restored fire restriction notice", /(?:burn ban|fires? (?:are )?(?:prohibited|banned)|no (?:wood|charcoal) fires)/i],
  ] },
  { label: "Rusk County fire restrictions", url: COUNTY_FIRE, required: [
    ["latest verified rescission", /Rusk County Burn Ban Status\s+November\s*3,?\s*2026\s*-\s*Burn\s*Ban\s*has\s*been\s*lifted/i],
  ] },
  { label: "TPWD accessibility", url: ROOT + "/fees-facilities/martin-creek-lake-accessibility", required: [
    ["accessible fishing pier and island bridge", /fishing pier[\s\S]{0,140}bridge[\s\S]{0,140}wheelchair accessible/i],
  ] },
  { label: "TPWD reservations", url: BOOK, required: [
    ["dump station", /Dump Station/i],
    ["late arrival park contact", /late arrival/i],
    ["late arrival call deadline", /prior to 5\s*p\.?m\.?/i],
    ["gate closure time", /10\s*p\.?m\.?/i],
  ] },
];

// The fast daily checks cover changeable visitor facts; quarterly review adds
// history, ecology and freshwater fishery facts. Manual dispatch exercises all.
if (process.env.MARTIN_CREEK_QUARTERLY === "true") sources.push(
  { label: "TPWD park history", url: ROOT + "/history/", required: [
    ["286-acre park", /286.acre/i], ["park opened in 1976", /1976/i],
    ["Daniel Martin in 1833", /Daniel Martin[\s\S]{0,220}1833/i],
    ["Harmony Hill", /Harmony Hill/i],
  ] },
  { label: "TPWD park nature", url: ROOT + "/nature", required: [
    ["usual autumn colors", /late October through the first two weeks of November/i],
    ["herons and pine species", /loblolly[\s\S]*herons/i],
  ] },
  { label: "TPWD fishery and lake facts", url: "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/martin_creek/index.phtml", required: [
    ["4,981-acre surface area", /4,981 acres/i], ["35-foot maximum depth", /Maximum depth:\s*35 feet/i],
    ["cooling-water impoundment", /Impounded:\s*1974/i],
    ["warm-water winter fishing", /winter and early spring/i],
  ] },
);
const PARK_PAGE = "https://texasdefined.com/destination/martin-creek-lake-state-park";
const RV_PAGE = PARK_PAGE + "-rv-area";
function affectedPages(source) {
  if (/park history|park nature|fishery and lake facts|official trail distances|screened shelters|TPWD lodging/i.test(source.label)) return [PARK_PAGE];
  if (/Rusk County fire restrictions|campsite classes|TPWD reservations/i.test(source.label)) return [RV_PAGE, PARK_PAGE];
  return [PARK_PAGE, RV_PAGE];
}
const drifts = [];
function reportDrift(source, name) {
  // The existing source-backed rewrite selector requires a canonical URL and
  // its actual source on the same line; never feed an unrelated source to a page.
  for (const page of affectedPages(source)) drifts.push(page + " — " + source.label + ": reverify " + name + " — " + source.url);
}
for (const source of sources) {
  let html;
  try {
    const response = await fetch(source.url, { headers: { "User-Agent": "TexasDefinedAuthoritySourceGuard/1.0 (+https://texasdefined.com)" }, signal: AbortSignal.timeout(20000) });
    if (!response.ok) throw Error("HTTP " + response.status);
    html = await response.text();
  } catch (error) {
    // Connectivity errors should fail the run, but must not create an inaccurate change report.
    console.error("Unable to check " + source.label + ": " + String(error));
    process.exitCode = 1;
    continue;
  }
  const readable = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&(?:nbsp|#160);/gi, " ")
    .replace(/&(?:amp|#38);/gi, "&")
    .replace(/&(?:ndash|mdash|#8211|#8212|#x2013|#x2014);/gi, "–")
    .replace(/&(?:shy|#173);/gi, "")
    .replace(/\s+/g, " ").trim();
  if (readable.length < 500) {
    console.error("Unexpectedly short source page for " + source.label + ". Not asserting facts.");
    process.exitCode = 1;
    continue;
  }
  for (const [name, pattern] of source.required) {
    if (!pattern.test(readable)) reportDrift(source, name);
  }
  for (const [name, pattern] of source.forbidden ?? []) {
    if (pattern.test(readable)) reportDrift(source, name);
  }
}
if (drifts.length) {
  const message = [
    "Official sources no longer match the source-checked Martin Creek park/RV reference facts.",
    "This is source drift, not proof of a changed policy. Verify source content before editing.",
    "",
    ...drifts.map((line) => "- " + line),
    "",
    "Pages: https://texasdefined.com/destination/martin-creek-lake-state-park-rv-area and https://texasdefined.com/destination/martin-creek-lake-state-park",
    "Source files: src/data/rv-parks/curated-public-wave4.ts, src/components/editorial/MartinCreekRvAuthority.tsx, src/data/destination-curation-batch5.ts, and src/components/editorial/MartinCreekParkAuthority.tsx",
  ].join("\n");
  await fs.writeFile("/tmp/martin-creek-rv-drift.txt", message + "\n");
  console.error(message);
  process.exitCode = 2;
} else if (!process.exitCode) {
  console.log("Martin Creek park/RV official source facts match the documented baseline; source checks did not advance editorial dates.");
}
