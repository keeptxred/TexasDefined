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


test('Batch012 group three has five canonical source-backed guides wired into SSR', () => {
  const loader = read('src/data/high-school-football/program-editorial-b012-group3-loader.server.ts');
  const editorial = read('src/data/high-school-football/program-editorial-b012-group3.ts');
  const profile = read('src/data/high-school-football/football-program-profile.server.ts');
  for (const slug of ['corsicana','cotton-center','cotulla','covington','crandall']) {
    assert.ok(loader.includes(`'${slug}'`), `missing loader slug ${slug}`);
    assert.ok(editorial.includes(`"${slug}"`), `missing sourced editorial ${slug}`);
  }
  assert.ok(loader.includes("import('./program-editorial-b012-group3')"));
  assert.ok(profile.includes('loadBatch012Group3FootballProgramEditorial(canonicalSlug)'));
  assert.ok(editorial.includes('https://www.crandall-isd.net/gameday'));
  assert.ok(editorial.includes('https://www.covingtonisd.org/athletics-home'));
  assert.ok(!editorial.includes('imageUrl:'));
  assert.ok(!editorial.includes('wins:'));
  assert.ok(!editorial.includes('losses:'));
});

test('Batch012 group four has five distinct first-party sourced guides and SSR wiring', () => {
  const loader = read('src/data/high-school-football/program-editorial-b012-group4-loader.server.ts');
  const editorial = read('src/data/high-school-football/program-editorial-b012-group4.ts');
  const profile = read('src/data/high-school-football/football-program-profile.server.ts');
  for (const slug of ['crane','cranfills-gap','crawford','crockett','crosby']) {
    assert.ok(loader.includes(`'${slug}'`), `missing group-four loader slug ${slug}`);
    assert.ok(editorial.includes(`"${slug}"`), `missing group-four editorial ${slug}`);
  }
  assert.ok(loader.includes("import('./program-editorial-b012-group4')"));
  assert.ok(profile.includes('loadBatch012Group4FootballProgramEditorial(canonicalSlug)'));
  for (const official of ['https://www.craneisd.com/','https://www.cranfillsgapisd.net/high-school-football','https://www.crawford-isd.net/o/crawford/athletics','https://www.crockettisd.net/','https://www.crosbyisd.org/']) {
    assert.ok(editorial.includes(official), `missing official source ${official}`);
  }
  assert.ok(!editorial.includes('imageUrl:'));
  assert.ok(!editorial.includes('wins:'));
  assert.ok(!editorial.includes('losses:'));
});
