import fs from "node:fs";
const read = file => fs.readFileSync(file, "utf8");
const component = read("src/components/camping/CampingDiscovery.tsx");
const page = read("src/routes/best-places-to-go-camping-in-texas.lazy.tsx");
const alerts = read("src/data/camping/official-alerts.generated.ts");
const monitor = read(".github/workflows/refresh-camping-authority.yml");
const health = read(".github/workflows/audit-camping-guide-sources.yml");
const finisher = read(".github/workflows/finish-camping-authority-refresh.yml");
const live = read(".github/workflows/verify-camping-authority-production.yml");
const audit = read("scripts/data/audit-camping-guide-freshness.mjs");
for (const [src,needle] of [
  [component,"reservationDestination(profile).url"],
  [component,"profile.sources.find"],
  [component,"alert.sourceUrl"],
  [page,"Best camping destinations by trip type"],
  [page,"Recent official park advisories"],
  [alerts,"goose-island-state-park"],
  [alerts,"enchanted-rock-state-natural-area"],
  [alerts,"palo-pinto-mountains-state-park"],
  [alerts,"big-bend-national-park"],
  [alerts,"brazos-bend-state-park"],
  [read("scripts/data/refresh-camping-alerts.mjs"),"Alerts & Conditions"],
  [monitor,"schedule:"],
  [monitor,"19 12 * * *"],
  [monitor,"needs-review"],
  [monitor,"automation/camping-official-alert-refresh-${{ github.run_id }}"],
  [finisher,"workflow_run:"],
  [finisher,"dispatch-validate-branch.sh \"$branch\" validate.yml"],
  [finisher,"dispatch-validate-branch.sh \"$branch\" merge-gate.yml"],
  [finisher,"src/data/camping/official-alerts.generated.ts"],
  [finisher,"--auto --match-head-commit"],
  [monitor,"steps.refresh.outcome == 'success'"],
  [monitor,"steps.refresh.outputs.needs_review"],
  [read("scripts/data/refresh-camping-alerts.mjs"),"fs.appendFileSync(process.env.GITHUB_OUTPUT"],
  [read("scripts/data/refresh-camping-alerts.mjs"),"sourceOutcome(sources[0]"],
  [read("scripts/data/refresh-camping-alerts.mjs"),"unchanged ? previous.checkedAt : day"],
  [health,"schedule:"],
  [health,"audit-camping-guide-freshness.mjs"],
  [audit,"temporary-http-failure"],
  [audit,"source-content-changed"],
  [audit,"relevantSourceDigest"],
  [health,"CAMPING_PREVIOUS_SOURCE_REPORT"],
  [audit,"access-restricted"],
  [audit,"redirected-source"],
  [health,"Reconcile resolved source-health issue"],
  [live,"Reconcile advisory review only after source recovery and live publication"],
  [live,"newest.conclusion !== 'success'"]
]) if (!src.includes(needle)) throw Error("Camping authority missing: " + needle);
const sourceMonitor = read("scripts/data/refresh-camping-alerts.mjs");
for (const pattern of ["park is under a burn ban", "Expect intermittent closures for sites", "Hot Springs Road beyond the overflow parking area", "You may use charcoal or containerized stoves", "windows.every(w => w.end < asOf)"]) if (!sourceMonitor.includes(pattern)) throw Error("Camping safety source guard missing: " + pattern);
if (alerts.includes("no wood fires; charcoal") || monitor.includes("Wood fires are not allowed")) throw Error("Retired Palo Pinto burn-ban text must not ship as active");
if (component.includes("border-amber-600") || page.includes("bg-amber-50")) throw Error("Camping guide must not introduce new palette styles");
if (page.includes(">Visit a State Park</h2>")) throw Error("National parks are not state parks");
console.log("Camping authority upgrade static checks passed.");
