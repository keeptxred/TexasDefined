import assert from 'node:assert/strict';
import { test } from 'node:test';
import { assertLindenMusicPage, lindenMusicPages } from './verify-linden-music-discovery-production.mjs';

const links = {
  '/county/cass': ['/texas-music-venues', '/texas-music-cities'],
  '/texas-music-venues': ['/county/cass', '/texas-icons/don-henley'],
  '/texas-music-cities': ['/county/cass', '/texas-music-venues'],
};
function fixture(path) {
  return '<!DOCTYPE html><html><head><link rel="canonical" href="https://texasdefined.com' + path
    + '"><meta name="robots" content="index, follow"></head><body><main>'
    + lindenMusicPages[path].map((part) => '<section>' + part + '</section>').join('')
    + links[path].map((link) => '<a href="' + link + '">See guide</a>').join('')
    + '</main></body></html>';
}
test('every county and statewide music discovery page passes with the complete links', () => {
  for (const path of Object.keys(lindenMusicPages)) {
    assert.doesNotThrow(() => assertLindenMusicPage(fixture(path), path, path));
  }
});
test('React streamed text and entity escapes do not become false negatives', () => {
  const path = '/county/cass';
  const streamed = fixture(path)
    .replace('Music City Texas Theater: a concert room', 'Music City Texas Theater: a <!-- -->concert room');
  assert.doesNotThrow(() => assertLindenMusicPage(streamed, path, path));
});
test('scripts alone cannot satisfy missing visible Linden musician coverage', () => {
  const path = '/texas-music-cities';
  const marker = 'Richard Bowden';
  const page = fixture(path).replace('<section>' + marker + '</section>', '')
    .replace('</body>', '<script>window.hidden = ' + JSON.stringify(marker) + '</script></body>');
  assert.throws(() => assertLindenMusicPage(page, path, path), /evidence missing/);
});
test('noindex and wrong canonical cannot be certified', () => {
  const path = '/texas-music-venues';
  assert.throws(() => assertLindenMusicPage(fixture(path).replace('index, follow', 'noindex, follow'), path, path), /noindexed/);
  assert.throws(() => assertLindenMusicPage(fixture(path).replace('href="https://texasdefined.com/texas-music-venues"', 'href="https://texasdefined.com/another"'), path, path), /canonical/);
});
test('missing reciprocal internal links fail publication acceptance', () => {
  const path = '/county/cass';
  assert.throws(() => assertLindenMusicPage(fixture(path).replace('<a href="/texas-music-venues">See guide</a>', ''), path, path), /navigation/);
});
