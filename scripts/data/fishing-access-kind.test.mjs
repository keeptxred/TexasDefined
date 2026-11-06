import assert from "node:assert/strict";
import { test } from "node:test";
import { readFileSync } from "node:fs";
import { classifySourceReviewedAccessKind as classify } from "../../src/data/fishing/access-kind.ts";

const data = JSON.parse(readFileSync("src/data/fishing/curated-access-sites.json", "utf8"));
const found = (lake, site) => {
  const record = data.find((row) => row.lakeId === lake)?.facilities.find((f) => f[0] === site);
  assert.ok(record, "Missing source-backed facility " + lake + ":" + site);
  return record;
};
test("source-reviewed access identity overrides accidental ramp keywords", () => {
  for (const [kind, launch, expected] of [
    ["shore", "WALK-IN SHORE FISHING and not an additional trailer ramp", "shore"],
    ["kayak-launch", "Non-motorized gravel and dirt ramp", "kayak-launch"],
    ["pier", "ADA fishing pier, not a general boat launch", "pier"],
    ["public-ramp", "Two public ramps with 3 lanes", "boat-ramp"],
    ["park", "Two ramps with three lanes; campers only", "boat-ramp"],
    ["park", "NO boat ramp, only bank fishing", "shore"],
    ["park", "No launch lane documented", "shore"],
    ["park", "Unimproved shoreline without boat infrastructure", "shore"],
    ["marina", "Private operator; no public ramp amenities asserted", "marina"],
  ]) assert.equal(classify({ kind, launch }), expected, launch);
});
test("Arkansas Bend and all nine Travis facilities have direct TPWD concrete-ramp evidence", () => {
  const group = data.find((x) => x.lakeId === "lake-travis");
  assert.equal(group.sourcePage, "access2.phtml");
  const originalNames = [
    "Pace Bend/Collier Cove", "Pace Bend/Tatum Cove", "Arkansas Bend",
    "Mansfield Dam Park", "Bob Wentz at Windy Point", "Cypress Creek",
  ];
  const newNames = ["Gloster Bend Recreation Area", "Sandy Creek Park", "Hippie Hollow"];
  assert.equal(group.facilities.length, 9);
  assert.deepEqual(
    group.facilities.map(([name]) => name).sort(),
    [...originalNames, ...newNames].sort(),
    "Only individually source-verified TPWD concrete ramps belong in this group",
  );
  for (const [name, kind, description] of group.facilities) {
    assert.equal(kind, "boat-ramp", name);
    assert.match(description, /\b(?:one|two|four)[- ]lane|concrete lane/i, name);
    assert.match(
      description,
      name === "Gloster Bend Recreation Area" ? /Lower Colorado River Authority/ : /Travis County Parks/,
      name + ": managing operator must match TPWD",
    );
  }
  assert.match(found("lake-travis", "Arkansas Bend")[2], /FM 1431.*Sylvester Ford Road/);
  assert.match(found("lake-travis", "Bob Wentz at Windy Point")[2], /restricted to sailboats/);
  assert.match(found("lake-travis", "Gloster Bend Recreation Area")[2], /Singleton Road/);
  assert.match(found("lake-travis", "Sandy Creek Park")[2], /Lime Creek Road/);
  assert.match(found("lake-travis", "Hippie Hollow")[2], /17 parked vehicles/);
});
test("Bachman public shoreline and Shorecrest ramp are not merged", () => {
  const source = readFileSync("src/data/fishing/statewide-lake-network.ts", "utf8");
  assert.match(source, /name:"Bachman Lake public bank-fishing shoreline".{0,100}kind:"shore"/);
  assert.match(source, /name:"Shorecrest Drive municipal boat ramp".{0,120}kind:"public-ramp"/);
  assert.equal(classify({kind:"shore",launch:"Walk-in shoreline, not an additional trailer ramp"}), "shore");
});
test("Ray Hubbard's non-motorized launch never appears as a motorboat ramp", () => {
  const row = found("lake-ray-hubbard", "Paddle Point Park");
  assert.equal(row[1], "kayak-launch");
  assert.match(row[2], /non-motorized craft only/);
  const source = readFileSync("src/data/fishing/statewide-lake-network.ts", "utf8");
  assert.match(source, /name: "Paddle Point Park \(paddle craft only\)".{0,120}kind: "kayak-launch"/);
});
test("river, bank, pier and camper-only sites retain reviewed categories", () => {
  const network = readFileSync("src/data/fishing/statewide-lake-network.ts", "utf8");
  for (const [name, kind] of [
    ["Colorado Bend State Park","public-ramp"],
    ["Commons Ford Park","shore"],
    ["Selma Hughes Park (bank access only)","shore"],
    ["Fritz Hughes Park (bank access only)","shore"],
    ["Spring Canyon fishing pier","pier"],
    ["Chandler River Park","public-ramp"],
    ["Bear Creek Park","public-ramp"],
  ]) {
    const spaced = network.indexOf(`name: "${name}"`);
    const compact = network.indexOf(`name:"${name}"`);
    const at = spaced >= 0 ? spaced : compact;
    assert.ok(at >= 0, "Missing source facility " + name);
    const match = network.slice(at, at + 260).match(/kind:\s*"([a-z-]+)"/);
    assert.ok(match, "Missing reviewed identity for " + name);
    assert.equal(match[1], kind, name);
  }
});
