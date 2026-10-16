import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { test } from "node:test";
import { governedDiscoverSlugs, requireGovernedDiscoverBuildAssets } from "./governed-discover-build-guard.mjs";

const fixture = Buffer.alloc(16);
fixture.write("RIFF", 0, "ascii");
fixture.write("WEBP", 8, "ascii");

test("governed Discover manifest reads without image generation or network calls", () => {
  const slugs = governedDiscoverSlugs();
  assert.ok(slugs.length >= 42);
  assert.ok(slugs.includes("collin-county"));
  assert.equal(new Set(slugs).size, slugs.length);
});

test("a missing derivative forbids a production build, even when other assets exist", () => {
  const dir = mkdtempSync(path.join(tmpdir(), "td-governed-build-"));
  try {
    mkdirSync(dir, { recursive: true });
    writeFileSync(path.join(dir, "freeman-coliseum.webp"), fixture);
    assert.throws(() => requireGovernedDiscoverBuildAssets({
      directory: dir, slugs: ["collin-county", "freeman-coliseum"], minimum: 2,
    }), /1 missing.*collin-county/);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test("a false HTML 404 body can never pass as a WebP asset", () => {
  const dir = mkdtempSync(path.join(tmpdir(), "td-governed-build-"));
  try {
    writeFileSync(path.join(dir, "collin-county.webp"), "<!DOCTYPE html><title>Not Found</title>");
    assert.throws(() => requireGovernedDiscoverBuildAssets({
      directory: dir, slugs: ["collin-county"], minimum: 1,
    }), /1 invalid WebP/);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test("fully accounted-for real WebP headers pass the fail-closed guard", () => {
  const dir = mkdtempSync(path.join(tmpdir(), "td-governed-build-"));
  try {
    for (const slug of ["collin-county", "freeman-coliseum"]) {
      writeFileSync(path.join(dir, slug + ".webp"), fixture);
    }
    assert.equal(requireGovernedDiscoverBuildAssets({
      directory: dir, slugs: ["collin-county", "freeman-coliseum"], minimum: 2,
    }), 2);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});
