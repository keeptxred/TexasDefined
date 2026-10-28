import fs from "node:fs";
const read = file => fs.readFileSync(file, "utf8");
const component = read("src/components/camping/CampingDiscovery.tsx");
const page = read("src/routes/best-places-to-go-camping-in-texas.lazy.tsx");
const alerts = read("src/data/camping/official-alerts.generated.ts");
const monitor = read(".github/workflows/refresh-camping-authority.yml");
const health = read(".github/workflows/audit-camping-guide-sources.yml");
for (const [src,needle] of [
  [component,"reservationDestination(profile).url"],
  [component,"profile.sources.find"],
  [component,"alert.sourceUrl"],
  [page,"Best camping destinations by trip type"],
  [page,"Recent official park advisories"],
  [alerts,"goose-island-state-park"],
  [alerts,"enchanted-rock-state-natural-area"],
  [alerts,"palo-pinto-mountains-state-park"],
  [monitor,"schedule:"],
  [monitor,"needs-review"],
  [monitor,"--auto --squash"],
  [monitor,"steps.refresh.outcome == 'success'"],
  [read("scripts/data/refresh-camping-alerts.mjs"),"unchanged ? previous.checkedAt : day"],
  [health,"schedule:"],
  [health,"audit-camping-guide-freshness.mjs"]
]) if (!src.includes(needle)) throw Error("Camping authority missing: " + needle);
if (alerts.includes("no wood fires; charcoal") || monitor.includes("Wood fires are not allowed")) throw Error("Retired Palo Pinto burn-ban text must not ship as active");
if (component.includes("border-amber-600") || page.includes("bg-amber-50")) throw Error("Camping guide must not introduce new palette styles");
if (page.includes(">Visit a State Park</h2>")) throw Error("National parks are not state parks");
console.log("Camping authority upgrade static checks passed.");
