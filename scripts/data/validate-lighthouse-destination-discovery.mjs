import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const registry = read("src/data/destination-editorial-links.ts");
const planner = read("src/components/editorial/DestinationVisitPlanner.tsx");

assert(registry.includes('"port-isabel-lighthouse-state-park"'), "Port Isabel destination editorial registry entry is missing");
for (const href of [
  "/article/best-lighthouses-to-visit-in-texas",
  "/article/port-isabel-lighthouse-guide",
  "/explore/lighthouses",
]) {
  assert(registry.includes(`href: \"${href}\"`), `Port Isabel destination must discover ${href}`);
}
assert(planner.includes('destinationEditorialLinks(destination.slug)'), "Destination visit planner must resolve destination editorial links");
assert(planner.includes("Go deeper"), "Destination visit planner editorial discovery heading is missing");
assert(planner.includes("Editorial guides for"), "Destination editorial discovery navigation landmark is missing");

console.log("Port Isabel destination-to-lighthouse editorial discovery is protected.");
