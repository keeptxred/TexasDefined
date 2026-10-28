import test from 'node:test';
import assert from 'node:assert/strict';
import { assertTurkeyHuntingAuthority } from './verify-changed-production-pages.mjs';

const markers = [
  'Texas Turkey Hunting: 2026–27 Seasons, Regulations',
  'Texas turkey dates, without the guesswork',
  'Official 2026–27 wild turkey season dates',
  'No unbearded hens',
  'Matagorda and Wharton are closed',
  'Official Texas turkey hunting zone maps',
  'National Refuge Spring Turkey drawings',
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
