import fs from "node:fs/promises";

// Narrow source-drift guard: do not auto-publish changing fees or fire restrictions
// from scraped markup. Raise actionable drift for human source verification.
const ROOT = "https://tpwd.texas.gov/state-parks/martin-creek-lake";
const BOOK = "https://texasstateparks.reserveamerica.com/martin-creek-lake-state-park/r/facilityDetails.do?contractCode=TX&parkId=1200121";
const sources = [
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
  { label: "TPWD reservations", url: BOOK, required: [
    ["dump station", /Dump Station/i],
    ["late arrival park contact", /late arrival/i],
    ["late arrival call deadline", /prior to 5\s*p\.?m\.?/i],
    ["gate closure time", /10\s*p\.?m\.?/i],
  ] },
];

const drifts = [];
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
    .replace(/\s+/g, " ").trim();
  if (readable.length < 500) {
    console.error("Unexpectedly short source page for " + source.label + ". Not asserting facts.");
    process.exitCode = 1;
    continue;
  }
  for (const [name, pattern] of source.required) {
    if (!pattern.test(readable)) drifts.push(source.label + ": reverify " + name + " — " + source.url);
  }
  for (const [name, pattern] of source.forbidden ?? []) {
    if (pattern.test(readable)) drifts.push(source.label + ": reverify " + name + " — " + source.url);
  }
}
if (drifts.length) {
  const message = [
    "TPWD or the reservation service no longer matches the source-checked Martin Creek RV reference facts.",
    "This is source drift, not proof of a changed policy. Verify source content before editing.",
    "",
    ...drifts.map((line) => "- " + line),
    "",
    "Page: https://texasdefined.com/destination/martin-creek-lake-state-park-rv-area",
    "Source files: src/data/rv-parks/curated-public-wave4.ts and src/components/editorial/MartinCreekRvAuthority.tsx",
  ].join("\n");
  await fs.writeFile("/tmp/martin-creek-rv-drift.txt", message + "\n");
  console.error(message);
  process.exitCode = 2;
} else if (!process.exitCode) {
  console.log("Martin Creek RV campsite rates, operating details and critical notices still match the documented operator sources.");
}
