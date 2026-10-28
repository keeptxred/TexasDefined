import fs from "node:fs";

const read = (p) => fs.readFileSync(p, "utf8");
const dataset = read("src/data/hunting/youth-hunting-data.ts");
const page = read("src/components/hunting/YouthHuntingPage.tsx");
const topicRoute = read("src/components/hunting/HuntingTopicPage.tsx");
const schema = read("src/components/hunting/HuntingSchema.tsx");
const authority = read("src/data/hunting/authority-v2.ts");

function check(haystack, needle, context) {
  if (!haystack.includes(needle)) throw new Error("Youth hunting guide missing " + context + ": " + needle);
}

for (const [needle, label] of [
  ["YOUTH_HUNTING_SEASONS", "shared season dataset"],
  ["YOUTH_HUNTING_FAQ", "shared FAQ dataset"],
  ["2026–27", "season year"],
  ["2026-10-28", "verified date"],
  ["Oct. 30–Nov. 1, 2026", "early deer dates"],
  ["Jan. 4–17, 2027", "late North deer dates"],
  ["Mar. 27–28; May 22–23, 2027", "North spring turkey"],
  ["Mar. 13–14; May 8–9, 2027", "South spring turkey"],
  ["Oct. 17–18, 2026", "High Plains duck"],
  ["Oct. 31–Nov. 1, 2026", "South duck"],
  ["Nov. 7–8, 2026", "North duck"],
  ["Sept. 25–27, 2026", "East Texas squirrel"],
  ["https://tpwd.texas.gov/regulations/outdoor-annual/", "agency sources"],
  ["$200", "mentored program fee"],
]) check(dataset,needle,label);
for (const anchor of ["youth-season-calendar","youth-eligibility","youth-access","youth-checklist","youth-harvest","youth-faq"]) check(page,anchor,"accessible section " + anchor);
check(page,"YOUTH_HUNTING_SEASONS.map","rendered season rows");
check(page,"YOUTH_HUNTING_FAQ.map","rendered FAQ");
check(topicRoute,'topic.slug === "youth-hunting"',"dedicated route");
check(schema,'topic.slug === "youth-hunting" ? "2026-10-28"',"page schema date");
check(authority,"faq: [...YOUTH_HUNTING_FAQ]","FAQ schema content");
console.log("Youth hunting authority static contract passed.");

if (process.argv.includes("--online")) {
  const sources = [
    {url:"https://tpwd.texas.gov/regulations/outdoor-annual/regs/season-types/youth-only", markers:["2026-2027","Oct. 30","Jan. 4","Sept. 25","Mar. 27","Mar. 13","Oct. 17","Nov. 7"]},
    {url:"https://tpwd.texas.gov/regulations/outdoor-annual/licenses/hunting-licenses-and-permits/hunting-licenses",markers:["Youth Hunting License","$7"]},
    {url:"https://tpwd.texas.gov/regulations/outdoor-annual/hunting/hunter-education",markers:["Minimum age","9 through 16"]},
    {url:"https://tpwd.texas.gov/huntwild/hunt/youth_hunting/tx_youth_hunt_program/",markers:["9 to 17","$200","Hunter Education"]},
  ];
  for (const source of sources) {
    const response = await fetch(source.url, {headers:{"User-Agent":"TexasDefined-YH-Authority-Monitor/1.0","Accept":"text/html"},signal:AbortSignal.timeout(20000)});
    if (!response.ok) throw new Error("TPWD returned " + response.status + " for " + source.url);
    const sourceText = (await response.text()).replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ").replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ").replace(/&nbsp;|&#160;/gi," ").replace(/\s+/g," ");
    for (const marker of source.markers) check(sourceText,marker,"official TPWD source " + source.url);
    console.log("Checked official source: " + source.url);
  }
  if (Date.now() >= Date.parse("2027-07-01T00:00:00Z")) throw new Error("2026–27 page requires source-verified 2027–28 rollover before Sept. 1.");
  console.log("TPWD source and rollover checks passed.");
}
