import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const visitPlanner = readFileSync("src/components/editorial/DestinationVisitPlanner.tsx", "utf8");
const relationships = readFileSync("src/components/editorial/DestinationRelationships.tsx", "utf8");

// Every published destination already has a single canonical Trip Planner handoff
// in its global bottom navigation. Never print another generic CTA under authority content.
assert.match(relationships, /to="\/explore\/trip-planner" search=\{\{ destination: destination\.slug \}\}/);
assert.doesNotMatch(visitPlanner, /(?:Customize a route around|showTripPlannerHandoff|href=\{\x60\/explore\/trip-planner)/);
assert.match(visitPlanner, /<DestinationAuthoritySections destination=\{destination\} \/>/);
console.log("Destination planner handoff ownership passed: one shared navigation CTA; no duplicate authority CTA.");
