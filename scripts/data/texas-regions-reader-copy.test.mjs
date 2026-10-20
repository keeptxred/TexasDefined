import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const article = readFileSync('src/data/fixtures/texas-regions-explained.ts', 'utf8');

test('regional guide explains geography and visitor choices, not publishing architecture', () => {
  for (const unwanted of [
    'editorial and discovery system',
    'region IDs',
    'statewide discovery',
    'editorial copy',
    'top-level navigation region',
    'seven-region taxonomy',
  ]) {
    assert.ok(!article.includes(unwanted), 'reader-facing technical copy returned: '+unwanted);
  }
  for (const expected of [
    'How to use the seven regions when planning a trip',
    'County lines do not always follow forests, hills or watersheds.',
    'seven regions offer a manageable starting point',
    'The seven TexasDefined regions',
  ]) {
    assert.ok(article.includes(expected), 'missing practical reader guidance: '+expected);
  }
});

test('all seven regional guide links and unique regional sections remain intact', () => {
  for (const slug of [
    'big-bend', 'gulf-coast', 'hill-country', 'panhandle',
    'piney-woods', 'prairies-lakes', 'south-texas',
  ]) assert.ok(article.includes('"/explore/region/'+slug+'"'), 'region route missing: '+slug);
  for (const heading of [
    '1. Big Bend Country', '2. Gulf Coast', '3. Hill Country',
    '4. Panhandle Plains', '5. Piney Woods', '6. Prairies & Lakes',
    '7. South Texas Plains',
  ]) assert.ok(article.includes('h("'+heading+'")'), 'region section missing: '+heading);
});
