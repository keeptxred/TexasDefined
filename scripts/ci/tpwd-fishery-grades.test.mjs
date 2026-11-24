import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { parseTpwdGrades } from "./tpwd-fishery-grades.mjs";

test("extracts only explicit agency grade markers",()=>{
 const html='<table><tr><th>Species</th><th>Poor</th><th>Fair</th><th>Good</th><th>Excellent</th></tr>'+
  '<tr><td>Largemouth Bass</td><td></td><td></td><td></td><td><img src="/assets/yes.gif" alt="yes"></td></tr>'+
  '<tr><td>Crappie</td><td></td><td></td><td><img alt="yes" src="/check.gif"></td><td></td></tr></table>';
 assert.deepEqual(parseTpwdGrades(html),[{name:"Largemouth Bass",grade:"excellent"},{name:"Crappie",grade:"good"}]);
});
test("rejects ambiguous or unrelated tables",()=>{
 const html='<table><tr><th>Species</th><th>Poor</th><th>Fair</th><th>Good</th><th>Excellent</th></tr>'+
  '<tr><td>Unscored</td><td></td><td></td><td></td><td></td></tr>'+
  '<tr><td>Ambiguous</td><td><img alt="yes"></td><td><img alt="yes"></td><td></td><td></td></tr></table>';
 assert.deepEqual(parseTpwdGrades(html),[]);
});

// The official TPWD Caddo Lake Angling Opportunities table marks these three
// species Excellent as of the independent November 24, 2026 source review.
// Preserve the exact public lake-species labels; do not confuse quality grades
// with fish harvest regulations or a live catch forecast.
test("Caddo Lake published grades match official TPWD for three previously understated species", () => {
  const source = readFileSync("src/data/fishing/statewide-lake-network.ts", "utf8");
  const start = source.indexOf('    slug: "caddo-lake",');
  const end = source.indexOf('\n  {\n    slug:', start + 1);
  assert.ok(start >= 0 && end > start, "Caddo lake source entry must exist");
  const record = source.slice(start, end);
  for (const [id, name] of [
    ["crappie", "Crappie"],
    ["white-bass", "White bass"],
    ["sunfish", "Sunfish"],
  ]) {
    assert.ok(record.includes('fish("' + id + '","' + name + '","excellent"'),
      name + " must match the TPWD Excellent fishery-quality grade");
  }
  assert.ok(record.includes('fish("catfish","Catfish","good"'), "Do not overgrade catfish");
});
