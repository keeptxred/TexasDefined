import assert from 'node:assert/strict';

export function verifyVanZandtCountyHtml(html, origin = 'https://texasdefined.com') {
  const visible = html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;|&#160;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/\s+/g, ' ').trim();

  for (const required of [
    'Van Zandt County essentials', 'County registry checked', 'Guide updated',
    'Salt Palace Museum', 'does not collect property taxes', 'Historical background:',
    'The story of Van Zandt County', 'Places on the map',
    'Taxing units in Van Zandt County', 'High school football in Van Zandt County',
  ]) assert.ok(visible.includes(required), 'County HTML missing: ' + required);

  const months = 'January|February|March|April|May|June|July|August|September|October|November|December';
  const dates = {};
  for (const label of ['County registry checked', 'Guide updated']) {
    const pattern = new RegExp(label + '\\s*:?\\s*(' + months + ')\\s+(\\d{1,2}),\\s+(\\d{4})', 'i');
    const match = visible.match(pattern);
    assert.ok(match, label + ' must have its own adjacent full calendar date');
    const month = months.split('|').findIndex(name => name.toLowerCase() === match[1].toLowerCase());
    const day = Number(match[2]), year = Number(match[3]);
    const utc = new Date(Date.UTC(year, month, day));
    assert.ok(year >= 2000 && utc.getUTCFullYear() === year && utc.getUTCMonth() === month && utc.getUTCDate() === day,
      label + ': invalid calendar date');
    assert.ok(utc.getTime() <= Date.now() + 86400000, label + ': date cannot be in the future');
    dates[label] = utc.toISOString().slice(0, 10);
  }
  // Do not pin either verification date, an estimate vintage, or a population count.
  for (const link of [
    'www.tshaonline.org/handbook/entries/van-zandt-county',
    'atlas.thc.texas.gov/Details/4302000092',
    'grandsalinesaltpalace.com/',
    'www.firstmondaycanton.com/about',
    'tpwd.texas.gov/state-parks/lake-tawakoni',
    'tpwd.texas.gov/state-parks/purtis-creek',
    'www.openstreetmap.org/search?query=',
    '/destination/wills-point-depot-museum',
    '/texas-high-school-football-teams/wills-point',
  ]) assert.ok(html.includes(link), 'County HTML missing reference or destination: ' + link);
  assert.ok(html.includes('census.gov/quickfacts/fact/table/vanzandtcountytexas/'),
    'County HTML missing Census QuickFacts county link');
  const canonical = origin.replace(/\/$/, '') + '/county/van-zandt';
  const canonicalTags = html.match(/<link\b[^>]*\brel=["']canonical["'][^>]*>/gi) || [];
  assert.ok(canonicalTags.some(tag => tag.includes(canonical)), 'County HTML missing canonical: ' + canonical);
  assert.ok(!/<meta\b[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html),
    'County HTML unexpectedly noindexed');
  assert.ok((html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [,''])[1].includes('Van Zandt County'),
    'County SEO title missing county name');
  assert.ok(/<meta\b[^>]*(?:name=["']description["'][^>]*content=["'][^"']+["']|content=["'][^"']+["'][^>]*name=["']description["'])/i.test(html),
    'County SEO description missing');
  return dates;
}
