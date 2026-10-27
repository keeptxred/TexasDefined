import { test } from 'node:test';
import assert from 'node:assert/strict';
import { verifyVanZandtCountyHtml } from './van-zandt-html-contract.mjs';

const fixture = (registry = 'August 4, 2026', editorial = 'October 26, 2026') =>
  ['<html><head><title>Van Zandt County | Texas Defined</title>',
   '<link rel="canonical" href="https://texasdefined.com/county/van-zandt">',
   '<meta name="description" content="County guide"></head><body>',
   'Van Zandt County essentials County registry checked ', registry,
   ' Guide updated ', editorial,
   ' Salt Palace Museum does not collect property taxes Historical background:',
   ' The story of Van Zandt County Places on the map Taxing units in Van Zandt County',
   ' High school football in Van Zandt County',
   '<a href="https://www.tshaonline.org/handbook/entries/van-zandt-county"></a>',
   '<a href="https://atlas.thc.texas.gov/Details/4302000092"></a>',
   '<a href="https://grandsalinesaltpalace.com/about"></a>',
   '<a href="https://www.firstmondaycanton.com/about"></a>',
   '<a href="https://tpwd.texas.gov/state-parks/lake-tawakoni"></a>',
   '<a href="https://tpwd.texas.gov/state-parks/purtis-creek"></a>',
   '<a href="https://www.openstreetmap.org/search?query=Canton"></a>',
   '<a href="/destination/wills-point-depot-museum"></a>',
   '<a href="/texas-high-school-football-teams/wills-point"></a>',
   '<a href="https://www.census.gov/quickfacts/fact/table/vanzandtcountytexas/PST045225"></a></body></html>'].join('');

test('old and legitimately updated dates pass without pinning Census value or vintage', () => {
  assert.deepEqual(verifyVanZandtCountyHtml(fixture()), {'County registry checked':'2026-08-04','Guide updated':'2026-10-26'});
  assert.deepEqual(verifyVanZandtCountyHtml(fixture('September 2, 2026', 'October 25, 2026')),
    {'County registry checked':'2026-09-02','Guide updated':'2026-10-25'});
});
test('missing labels, impossible dates, missing canonical and noindex fail', () => {
  assert.throws(() => verifyVanZandtCountyHtml(fixture().replace('County registry checked', 'County source')), /County registry checked/);
  assert.throws(() => verifyVanZandtCountyHtml(fixture('February 30, 2026')), /invalid calendar date/);
  assert.throws(() => verifyVanZandtCountyHtml(fixture().replace('https://texasdefined.com/county/van-zandt','https://texasdefined.com/')), /canonical/);
  assert.throws(() => verifyVanZandtCountyHtml(fixture().replace('</head>', '<meta name="robots" content="noindex"></head>')), /noindex/);
});
test('missing Salt Palace reference and missing publication-specific date fail', () => {
  assert.throws(() => verifyVanZandtCountyHtml(fixture().replace('grandsalinesaltpalace.com/', 'example.invalid/')), /grandsalinesaltpalace/);
  assert.throws(() => verifyVanZandtCountyHtml(fixture().replace('Guide updated October 26, 2026', 'Guide updated without date')), /Guide updated/);
});
