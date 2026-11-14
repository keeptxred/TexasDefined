import { test } from "node:test";
import assert from "node:assert/strict";
import { matchesTpwdLakeHeading } from "./tpwd-lake-source-identity.mjs";

const lake = (slug, kind = "lake-fishery-profile") => ({ slug, kind });

test("official TPWD long-form Lake LBJ H1 matches only its own lake", () => {
  assert.equal(matchesTpwdLakeHeading(lake("lake-lbj"), "Lake Lyndon B. Johnson"), true);
  assert.equal(matchesTpwdLakeHeading(lake("lake-lbj"), "Lake LBJ"), true);
  assert.equal(matchesTpwdLakeHeading(lake("lake-lbj"), "Lake Johnson Creek"), false);
  assert.equal(matchesTpwdLakeHeading(lake("lake-lbj"), "Lake Lyndon B. Johnson — unrelated announcement"), false);
  assert.equal(matchesTpwdLakeHeading(lake("lake-buchanan"), "Lake Lyndon B. Johnson"), false);
});

test("source type and existing matching for other lakes remain strict", () => {
  assert.equal(matchesTpwdLakeHeading(lake("lake-buchanan"), "Lake Buchanan"), true);
  assert.equal(matchesTpwdLakeHeading(lake("lewisville-lake"), "Lewisville Lake"), true);
  assert.equal(matchesTpwdLakeHeading(lake("lewisville-lake"), "Lake Lyndon B. Johnson"), false);
  assert.equal(matchesTpwdLakeHeading(lake("lake-lbj", "waterbody-regulations"), "Lake Lyndon B. Johnson"), false);
  assert.equal(matchesTpwdLakeHeading(lake("lake-lbj", "waterbody-regulations"), "Fishing regulations for Lake LBJ"), true);
  assert.equal(matchesTpwdLakeHeading(lake("lake-lbj", "unsupported"), "Lake LBJ"), false);
});
