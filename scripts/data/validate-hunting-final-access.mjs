import assert from "node:assert/strict";
import fs from "node:fs";
import { loadSeasonContract, rolloverStatus } from "./check-hunting-season-rollover.mjs";
const read = (path) => fs.readFileSync(path,"utf8");
const base=read("src/data/hunting/authority.ts"), v2=read("src/data/hunting/authority-v2.ts");
const hub=read("src/components/hunting/HuntingAuthority.tsx");
const planner=read("src/components/hunting/HuntingSeasonPlanner.tsx");
const access=read("src/components/hunting/HuntingPublicAccessPlanner.tsx");
const stay=read("src/components/hunting/HuntingTripStayOptions.tsx");
const schema=read("src/components/hunting/HuntingSchema.tsx");
const workflow=read(".github/workflows/monitor-hunting-tpwd-sources.yml");
const deploy=read(".github/workflows/deploy-production.yml");
const species=JSON.parse(read("src/data/hunting/species-season-calendar.json"));
const contract=loadSeasonContract(read("src/data/hunting/freshness.ts"));
const keys=(content)=>[...content.matchAll(/^\s{2}"([a-z0-9-]+)":/gm)].map(m=>m[1]);
const topics=new Set([...keys(base),...keys(v2)]);
assert.equal(topics.size,30,"preserve exactly 30 established hunting authority topic paths");
assert.equal(species.sections.length,17);
assert.ok(hub.includes("<HuntingPublicAccessPlanner />") && hub.includes("<HuntingTripStayOptions />"),"hub must mount access and travel");
for(const field of ['id="hunting-access-county"','id="hunting-access-game"','id="hunting-access-type"','TPWD_AREAS','TPWD_DRAWN','TPWD_APH','TPWD_DAILY','This page does not prefilter','not necessarily open to hunting']){
  assert.ok(access.includes(field),"safe TPWD handoff is missing "+field);
}
for(const field of ['buildCjAccountClick("rvshare"','buildHotelsComEvergreenClick','rel="sponsored nofollow noopener noreferrer"','trackAffiliateClick','Affiliate disclosure:','do not include land access']){
  assert.ok(stay.includes(field),"approved/disclosed travel contract missing "+field);
}
const cj = JSON.parse(read("src/data/cj-account-verified-links.json"));
const gear = read("src/components/hunting/KingsCamoGearOffers.tsx");
assert.equal(cj.publisherId, "101876465", "hunting CJ links must remain account-scoped");
for (const program of ["rvshare", "kings-camo-shop", "kings-camo-pants", "kings-camo-rain-jacket", "kings-camo-backpacks", "kings-camo-kids", "kings-camo-women", "kings-camo-turkey-accessories", "kings-camo-lightweight-shirts", "kings-camo-camping"]) {
  const creative = cj.links[program];
  assert.ok(creative, "hunting partner creative not registered: " + program);
  const url = new URL(creative.base);
  assert.ok(["www.jdoqocy.com", "www.kqzyfj.com", "www.anrdoezrs.net", "www.dpbolvw.net", "www.tkqlhce.com"].includes(url.hostname), "unexpected affiliate redirect origin " + program);
  assert.equal(url.protocol, "https:");
  assert.equal(url.pathname, "/click-" + cj.publisherId + "-" + creative.linkId, "unapproved affiliate link id: " + program);
  assert.equal(url.search, "", "registry must not hide query-string overrides");
}
for (const [partner, creative] of [["hotels.com", "15734399"], ["rvshare", cj.links.rvshare.linkId]]) {
  const source = partner === "hotels.com" ? read("src/lib/cj-hotels-evergreen.ts") : stay;
  assert.ok(source.includes(creative), "hunting travel creative missing " + partner);
}
for (const field of ["buildCjAccountClick(offer.program, pathname)", 'rel="sponsored nofollow noopener noreferrer"', 'trackAffiliateClick(', "Affiliate disclosure:", "kings-camo"]) {
  assert.ok(gear.includes(field), "hunting equipment affiliate guard missing " + field);
}
// Do not request or automatically follow referral click URLs: that would
// create fabricated affiliate traffic and cannot prove commission attribution.
assert.ok(schema.includes('dateModified: HUNTING_REGULATION_FRESHNESS.editorialUpdated'),'SEO date must be editorial');
assert.ok(planner.includes('today > HUNTING_REGULATION_FRESHNESS.validThrough'),'season must archive from governed date');
assert.ok(planner.includes("Archived 2026–27 season snapshot."),'archived source warning missing');
assert.ok(planner.includes("Current TPWD hunting regulations"),'expired users need official current destination');
assert.equal(rolloverStatus(contract,"2027-09-01").state,"expired");
for(const slug of ['squirrel-hunting','pheasant-hunting','chachalaca-hunting','pronghorn-hunting','goose-hunting','teal-hunting','sandhill-crane-hunting','rabbit-hare-hunting']){
  assert.ok(v2.includes('"'+slug+'": topic({'),"specific species guide still generated from generic template: "+slug);
}
for(const slug of ['mule-deer','dove-hunting','quail-hunting','waterfowl-hunting','javelina-hunting','exotic-game']){
  const row=base.split('  "'+slug+'": speciesTopic(')[1]?.split('\n')[0] || '';
  assert.ok(row.includes('ruleHighlights:') && row.includes('currentAnswer:'),"core species lacks source-specific depth: "+slug);
}
assert.ok(workflow.includes("check-hunting-season-rollover.mjs --expired-only"),"scheduled expired regulatory guard missing");
assert.ok(workflow.includes("Hunting next-season rollover requires TPWD-verified editorial release"),"protected renewal alert missing");
assert.ok(deploy.includes("verify-hunting-hub-responsive-browser.mjs"),"release Chrome UI contract missing");
console.log("Hunting final authority QA passed: 30 topic routes; 17 TPWD categories; dated archive guard, official county/game access handoff, approved travel clicks and scoped Chrome release checks.");
