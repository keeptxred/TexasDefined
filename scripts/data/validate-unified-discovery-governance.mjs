import fs from "node:fs";
import assert from "node:assert/strict";
const read=(p)=>fs.readFileSync(p,"utf8");
const server=read("src/server.ts");
const robots=read("public/robots.txt");
const calendar=read("src/components/events/CalendarBookingDiscovery.tsx");
const statewide=read("src/components/events/EventsLandingPage.tsx");
const collections=read("src/routes/events.$collection.lazy.tsx");
const registry=read("src/data/discovery/entity-registry.ts");
const discovery=read("src/lib/viator-attraction-discovery.ts");
const cron=read(".github/workflows/weekly-viator-attraction-discovery.yml");

assert.ok((robots.match(/Disallow: \/api\/viator\//g)||[]).length>=5,"Every robot group must disallow provider API content");
for(const token of [
 'VIATOR_API_BASE + "/attractions/search"', 
 'attractionDiscoveryRequestBody(market)',
 '"X-Robots-Tag": "noindex, nofollow, noarchive"',
 's-maxage=604800',
 'normalizeChristmasViatorExperiences',
 'VIATOR_API_BASE + "/search/freetext"',
 'christmasExperienceSearchBody(market)',
]) assert.ok(server.includes(token),`Server lacks: ${token}`);
for(const token of ["status: \"needs-independent-source-review\"","productCount","results.length >= 12"]) assert.ok(discovery.includes(token),`Discovery contract lacks: ${token}`);
assert.ok(!discovery.includes("overview:")&&!discovery.includes("reviews:"),"Supplier unique prose cannot be copied to editorial source");
assert.ok(calendar.includes("not admission to the listed festival") && calendar.includes("separate tours and activities"),"Calendar must distinguish supplier products from events");
assert.ok(calendar.includes('feedKind={christmas ? "christmas" : "products"}'),"Christmas must use topical supplier search, not generic tour listings");
assert.ok(statewide.includes("CalendarBookingDiscovery") && collections.includes("CalendarBookingDiscovery"),"Global and seasonal collections must expose optional booking discovery");
for(const key of ['location','start','end']) assert.ok(statewide.includes(`search.${key}?.startsWith`), `Optional calendar search parameter ${key} must be null-safe during SSR`);
assert.ok(!read('src/data/discovery/__tests__/entity-registry.test.ts').includes('/event/hill-country-holiday-festival'),"Unpublished test fixture must not enter live changed-page release scope");
assert.ok(registry.includes("eligibleForAutoPublication")===false,"Canonical entity model must be quality-governed, not autopublish");
assert.ok(registry.includes("mayIndexDiscoveryEntity")&&registry.includes("reconcileConfirmedOccurrence"),"Authority and official-date gates must exist");
assert.ok(cron.includes("cron:")&&cron.includes("retention-days: 13"),"Weekly bounded discovery must publish a short-lived review artifact");
const workflow=read(".github/workflows/weekly-viator-attraction-discovery.yml");
const ownerPolicy=read("docs/editorial-discovery-owner-approval.md");
assert.ok(workflow.includes("issues: write") && workflow.includes("issue_number: 6380"),"Weekly batch must notify actual owner approval desk");
assert.ok(workflow.includes("No Viator names, product IDs"),"Never paste supplier data in an indexable GitHub issue");
assert.ok(ownerPolicy.includes("approve, reject, or request edits") && ownerPolicy.includes("in ChatGPT"),"Owner decisions must be presented in chat");
assert.ok(registry.includes("hasRecordedOwnerApproval") && registry.includes('entity.discoveryOrigin === "supplier-candidate"'),"Supplier-derived new pages must fail closed without recorded owner approval");
assert.ok(read("scripts/ci/verify-viator-discovery-live.mjs").includes("x-robots-tag"),"Source-only live proof must verify noindex");
console.log("Unified event, attraction and Viator governance passed: non-indexable supplier research; original-authority quality gates; optional calendar offers; official event occurrence independence.");
