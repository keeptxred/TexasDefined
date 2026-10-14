#!/usr/bin/env node
import { strict as assert } from "node:assert";
import { readFileSync } from "node:fs";
import { segmentOwnerMuseumNames, ownerMuseumIdentityKey, provisionalIdentityIssues } from "./museum-owner-inventory-parser.mjs";
const split = (value) => segmentOwnerMuseumNames(value);
assert.deepEqual(split("African American Museum of DallasAgricultural Heritage Museum"), ["African American Museum of Dallas", "Agricultural Heritage Museum"]);
assert.deepEqual(split("Art Center of WacoArt Museum of Southeast Texas"), ["Art Center of Waco", "Art Museum of Southeast Texas"]);
assert.deepEqual(split("McNay Art MuseumDeGolyer House and GardensDuBois-Allmon Museum"), ["McNay Art Museum", "DeGolyer House and Gardens", "DuBois-Allmon Museum"]);
assert.deepEqual(split("Heritage House Museum (Orange)Heritage Museum of Montgomery County"), ["Heritage House Museum (Orange)", "Heritage Museum of Montgomery County"]);
assert.equal(ownerMuseumIdentityKey("Audie Murphy/American Cotton Museum"), "audiemurphyamericancottonmuseum");
assert.ok(provisionalIdentityIssues("Mabee-Gerrer Museum (wait, that's Oklahoma, let's substitute)").includes("owner-annotation-or-proposed-substitution"));
const raw = readFileSync("docs/museums/owner-submitted-museum-names-20261012.txt", "utf8");
const entries = split(raw);
assert.ok(entries.length >= 650 && entries.length < 800, "Owner inventory must not be truncated or explode into false words");
for (const name of ["A.C. McMillan African American Museum", "McNay Art Museum", "DeGolyer House and Gardens", "DeLeon Area Historical Museum", "DuBois-Allmon Museum", "African American Museum of Dallas", "Agricultural Heritage Museum", "Art Center of Waco", "Art Museum of Southeast Texas", "Heritage House Museum (Orange)", "Heritage Museum of Montgomery County"]) {
 assert.ok(entries.includes(name), "Preserve complete owner-submitted name: " + name);
}
console.log("Museum owner inventory parser: source boundaries retained; " + entries.length + " provisional names; no publication authorization.");
