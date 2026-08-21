import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const route = read("src/routes/texas-lighthouses[.]json.ts");
const mapPoints = read("src/data/texas-lighthouse-map-points.ts");
const visitorPlans = read("src/data/lighthouse-visitor-planning.ts");
const authorityLinks = read("src/data/fixtures/lighthouse-authority-links.ts");

assert(route.includes("createFileRoute('/texas-lighthouses.json')"), "Texas lighthouse JSON route is missing");
assert(route.includes("texasLighthouseMapPoints") && route.includes("lighthouseVisitorPlans"), "Lighthouse JSON must derive from the shared map and visitor-planning datasets");
assert(route.includes("canonicalCollection: 'https://texasdefined.com/explore/lighthouses'"), "Lighthouse JSON canonical collection is missing");
assert(route.includes("visitorGuide: 'https://texasdefined.com/article/best-lighthouses-to-visit-in-texas'"), "Lighthouse JSON visitor guide is missing");
assert(route.includes("Sabine Pass Lighthouse stands on the Louisiana side"), "Lighthouse JSON must preserve the Sabine Pass geographic caveat");
assert(route.includes("'x-robots-tag': 'noindex, follow'"), "Lighthouse JSON download must stay noindex/follow");
assert(route.includes("texasdefined-texas-lighthouses.json"), "Lighthouse JSON download filename is missing");
assert(authorityLinks.includes('href: "/texas-lighthouses.json"'), "Best-lighthouses authority page must discover the lighthouse JSON download");

const mapCount = (mapPoints.match(/slug: \"[^\"]+\"/g) ?? []).length;
const planCount = (visitorPlans.match(/slug: \"[^\"]+\"/g) ?? []).length;
assert(mapCount === 6, `Expected 6 lighthouse map records; found ${mapCount}`);
assert(planCount === 6, `Expected 6 lighthouse visitor plans; found ${planCount}`);

for (const slug of [
  "port-isabel-lighthouse",
  "point-bolivar-lighthouse",
  "halfmoon-reef-lighthouse",
  "lydia-ann-lighthouse",
  "matagorda-island-lighthouse",
  "sabine-pass-lighthouse",
]) {
  assert(mapPoints.includes(`slug: \"${slug}\"`), `Lighthouse map record missing: ${slug}`);
  assert(visitorPlans.includes(`slug: \"${slug}\"`), `Lighthouse visitor plan missing: ${slug}`);
}

console.log("Texas lighthouse machine-readable reference contract is protected: 6 map records + 6 visitor plans.");
