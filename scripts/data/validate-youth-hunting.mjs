import fs from "node:fs";
const read = (path) => fs.readFileSync(path, "utf8");
const source = read("src/data/hunting/youth-hunting-data.ts");
const status = read("src/data/hunting/youth-hunting-status.ts");
const head = read("src/routes/hunting.$slug.tsx");
const page = read("src/components/hunting/YouthHuntingPage.tsx");
const route = read("src/components/hunting/HuntingTopicPage.tsx");
const schema = read("src/components/hunting/HuntingSchema.tsx");
const authority = read("src/data/hunting/authority-v2.ts");
const monitor = read(".github/workflows/monitor-youth-hunting.yml");
const importer = read("scripts/data/refresh-youth-hunting-calendar.mjs");
const productionScope = read("scripts/ci/production-change-scope.mjs");
const productionSmoke = read("scripts/ci/verify-changed-production-pages.mjs");
const deployWorkflow = read(".github/workflows/deploy-production.yml");
const check = (body,needle,label) => {if(!body.includes(needle))throw new Error("Youth hunting contract missing "+label+": "+needle);};
const year = /YOUTH_HUNTING_SEASON_YEAR = "(20\d{2})–(\d{2})"/.exec(source);
if (!year || Number(year[1]) + 1 !== Number(year[1].slice(0,2)+year[2])) throw new Error("Invalid maintained season year");
check(source,"YOUTH_HUNTING_LAST_CHECKED","dated official source verification");
check(source,"YOUTH_HUNTING_SEASONS","single shared calendar");
check(source,"YOUTH_HUNTING_FAQ","single shared FAQ");
check(source,"YOUTH_HUNTING_IMAGE","shared public-domain hunting photo");
check(source,"YOUTH_HUNTING_SECTIONS","shared section navigation");
check(source,"https://www.fws.gov/media/youth-hunter","photo license provenance");
check(status,"America/Chicago","Texas-local season status");
check(status,"Verify with TPWD","fail-closed unknown date format");
check(source,"$200","TYHP financial transparency");
check(source,"https://tpwd.texas.gov/regulations/outdoor-annual/","official agency sources");
for (const region of ["North & South — early","North — late","North — fall","South — fall","North — spring","South — spring","Brooks, Kenedy, Kleberg & Willacy","High Plains Mallard Management Unit","South Zone","North Zone","East Texas eligible counties"])check(source,'region: "'+region+'"',"11 local calendar rows");
for (const anchor of ["youth-season-calendar","youth-eligibility","youth-access","youth-checklist","youth-harvest","youth-faq"])check(page,anchor,"accessible section");
check(page,"YOUTH_HUNTING_SEASONS.map","rendered official calendar");
check(page,"YOUTH_HUNTING_FAQ.map","rendered FAQs");
check(page,"youthSeasonWindows(dates)","per-window date labels");
check(page,"TEXAS_COUNTIES.map","254-county TPWD lookup");
check(page,'countySlug === "la-salle" ? "lasalle" : countySlug',"TPWD La Salle exception");
check(page,"md:hidden","mobile calendar cards");
check(page,"YOUTH_HUNTING_IMAGE.src","correct editorial photo");
check(page,"mailto:admin@texasdefined.com","editorial corrections contact");
check(page,"YOUTH_HUNTING_SECTIONS.map","same navigation as schema");
check(head,"image: YOUTH_HUNTING_IMAGE.src","correct social sharing image");
check(schema,"YOUTH_HUNTING_SECTIONS.map","schema matches visible sections");
check(schema,"YOUTH_HUNTING_IMAGE.src","schema image is exact social photo");
check(page,"Prior season archive","stale-calendar reader warning");
check(route,'topic.slug === "youth-hunting"',"dedicated route");
check(schema,"topic.reviewedOn ?? HUNTING_REGULATION_FRESHNESS.lastVerified","existing schema review-date fallback");
check(authority, "reviewedOn: YOUTH_HUNTING_LAST_CHECKED", "youth topic explicit source-check date");
check(authority,'faq: [...YOUTH_HUNTING_FAQ]',"FAQ and schema agreement");
check(authority,'YOUTH_HUNTING_SEASON_YEAR',"dynamic title");
check(importer,"parseYouthCalendar","source calendar parser");
check(monitor,"schedule:","GitHub-owned recurrence");
check(monitor,"gh pr create","governed proposed publication");
check(monitor,"youth-hunting-calendar-status.test.mjs","scheduled status regression testing");
check(productionScope,"candidates.add('/hunting/youth-hunting')","bounded youth release canary");
check(productionSmoke,"assertYouthHuntingAuthority(visitorHtml","ordinary visitor authority content check");
check(productionSmoke,"assertYouthHuntingAuthority(html","cache-busted authority content check");
check(deployWorkflow,"https://texasdefined.com/hunting/youth-hunting","exact youth page Cloudflare targeted cache purge");
console.log("Youth hunting authority contract passed for verified season "+year[0]+".");

if (process.argv.includes("--online")) {
  const pages = [
    {url:"https://tpwd.texas.gov/regulations/outdoor-annual/licenses/hunting-licenses-and-permits/hunting-licenses",markers:["Youth Hunting License","$7"]},
    {url:"https://tpwd.texas.gov/regulations/outdoor-annual/hunting/hunter-education",markers:["Minimum age","9 through 16"]},
    {url:"https://tpwd.texas.gov/huntwild/hunt/youth_hunting/tx_youth_hunt_program/",markers:["9 to 17","$200","Hunter Education"]},
  ];
  for(const {url,markers} of pages) {
    const res=await fetch(url,{headers:{"User-Agent":"TexasDefined-Youth-Authority-Monitor/1.0"},signal:AbortSignal.timeout(20000)});
    if(!res.ok)throw new Error("TPWD status "+res.status+" at "+url);
    const txt=(await res.text()).replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi," ").replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi," ").replace(/<[^>]+>/g," ").replace(/\s+/g," ");
    for(const marker of markers)check(txt,marker,"official TPWD policy "+url);
    if(url.includes("hunting-licenses-and-permits")) {
      const section=txt.slice(txt.indexOf("Youth Hunting License"));
      if(!/Youth Hunting License.{0,1600}\b169\s+\$7\b/.test(section)) throw new Error("Official TPWD youth license Type 169 fee changed or source structure drifted");
    }
    console.log("Verified source markers: "+url);
  }
}
