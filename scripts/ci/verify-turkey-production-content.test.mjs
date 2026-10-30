import test from 'node:test';
import assert from 'node:assert/strict';
import { assertTurkeyHuntingAuthority } from './verify-changed-production-pages.mjs';
import { readFileSync } from 'node:fs';
const quarterlyCheckedAt = JSON.parse(readFileSync('src/data/hunting/turkey-quarterly-facts.json', 'utf8')).checkedAt;

const markers = [
  'Texas Turkey Hunting: 2026–27 Seasons, Regulations',
  'Texas turkey dates, without the guesswork',
  'Official 2026–27 wild turkey season dates',
  'No unbearded hens',
  'Matagorda and Wharton are closed',
  'Official Texas turkey hunting zone maps',
  'National Refuge Spring Turkey drawings',
  'Two verified 2027 public turkey draw opportunities',
  'Find walk-in turkey hunting where it is actually legal',
  'Using TPWD turkey harvest numbers responsibly',
  'TPWD legal-game and property finder',
  'Hagerman hunt rules and permit details',
  'East Lake hunt rules and permit details',
  'TPWD draw and survey data machine-checked ' + quarterlyCheckedAt,
  'Machine-checked ' + quarterlyCheckedAt,
];
const article = '<main>' + markers.map(x => '<section>' + x + '</section>').join('') + '</main>';

test('accepts all verified turkey authority sections in rendered HTML', () => {
  assert.doesNotThrow(() => assertTurkeyHuntingAuthority(article, 'test'));
});

test('rejects the former generic turkey page even if the URL loads', () => {
  assert.throws(() => assertTurkeyHuntingAuthority(
    '<h1>Texas Turkey Hunting Guide</h1><p>Start with the current TPWD rule</p>',
    'canonical visitor',
  ), /authority section missing/);
});

test('does not count content hidden in framework scripts as rendered article text', () => {
  const hidden = '<main>Old generic turkey guide</main><script>' + markers.join(' ') + '</script>';
  assert.throws(() => assertTurkeyHuntingAuthority(hidden, 'cache-busted release'), /authority section missing/);
});

test('requires every core section instead of accepting a partial turkey release', () => {
  assert.throws(() => assertTurkeyHuntingAuthority(article.replace('Official Texas turkey hunting zone maps', ''), 'test'), /zone maps/);
});

test('rejects the previous October 28 turkey page even if original content matches', () => {
  const oldMarkers = markers.filter(marker => ![
    'Two verified 2027 public turkey draw opportunities',
    'Find walk-in turkey hunting where it is actually legal',
    'Using TPWD turkey harvest numbers responsibly',
    'TPWD legal-game and property finder',
    'Hagerman hunt rules and permit details',
    'East Lake hunt rules and permit details',
  ].includes(marker));
  const oldPage = '<main>' + oldMarkers.map(x => '<section>' + x + '</section>').join('') + '</main>';
  assert.throws(() => assertTurkeyHuntingAuthority(oldPage, 'canonical visitor'), /authority section missing/);
});

test('rejects a canonical turkey page serving the prior static draw and survey content', () => {
  const stale = article.replace('TPWD draw and survey data machine-checked ' + quarterlyCheckedAt, 'Old static drawing information');
  assert.throws(() => assertTurkeyHuntingAuthority(stale, 'canonical visitor'), /machine-checked/);
});

test('rejects stale quarterly source dates even if the prior authority sections render', () => {
  const stale = article.replaceAll(quarterlyCheckedAt, '2026-01-01');
  assert.throws(() => assertTurkeyHuntingAuthority(stale, 'cache-busted release'), /machine-checked/);
});
