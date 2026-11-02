import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (path) => readFileSync(path, 'utf8');
const loader = read('src/data/high-school-football/program-editorial-b012-loader.server.ts');
const editorial = read('src/data/high-school-football/program-editorial-b012.ts');
const server = read('src/data/high-school-football/football-program-profile.server.ts');
const slugs = ['corpus-christi-flour-bluff','corpus-christi-king','corpus-christi-london','corpus-christi-miller','corpus-christi-moody'];

test('Batch012 first five are authored and gated; no remaining 20 are falsely implemented', () => {
  for (const slug of slugs) {
    assert.ok(loader.includes(`'${slug}'`), `loader missing ${slug}`);
    assert.ok(editorial.includes(`"${slug}"`), `editorial missing ${slug}`);
  }
  assert.ok(!loader.includes("'corpus-christi-ray'"));
  assert.ok(loader.includes("import('./program-editorial-b012')"));
});

test('canonical SSR loads Batch012 without replacing historical Batch011 or private branch', () => {
  assert.ok(server.includes('loadBatch012FootballProgramEditorial(canonicalSlug)'));
  assert.ok(server.includes('loadBatch011FootballProgramEditorial(canonicalSlug)'));
  assert.ok(server.includes('loadBatch011FootballProgramEditorial(legacy.featured.slug)'));
});

test('source-qualified guides avoid invented football results and third-party imagery', () => {
  assert.ok(editorial.includes('https://athletics.flourbluffschools.net/'));
  assert.ok(editorial.includes('https://moody.ccisd.us/'));
  assert.ok(!editorial.includes('imageUrl:'));
  assert.ok(!editorial.includes('wins:'));
  assert.ok(!editorial.includes('losses:'));
});

const secondLoader = read('src/data/high-school-football/program-editorial-b012-group2-loader.server.ts');
const secondEditorial = read('src/data/high-school-football/program-editorial-b012-group2.ts');
const secondSlugs = ['corpus-christi-ray','corpus-christi-tuloso-midway','corpus-christi-veterans-memorial','corpus-christi-west-oso','corrigan-camden'];

test('Batch012 second five have source-backed editorial and server-only SSR wiring', () => {
  for (const slug of secondSlugs) {
    assert.ok(secondLoader.includes(`'${slug}'`), `missing second-five loader slug ${slug}`);
    assert.ok(secondEditorial.includes(`"${slug}"`), `missing second-five editorial ${slug}`);
  }
  assert.ok(secondLoader.includes("import('./program-editorial-b012-group2')"));
  assert.ok(server.includes('loadBatch012GroupTwoEditorial(canonicalSlug)'));
  assert.ok(secondEditorial.includes('https://athletics.tmisd.us/football'));
  assert.ok(secondEditorial.includes('https://wohs.westosoisd.net/Athletics'));
  assert.ok(!secondEditorial.includes('imageUrl:'));
  assert.ok(!secondEditorial.includes('wins:'));
  assert.ok(!secondEditorial.includes('losses:'));
});
