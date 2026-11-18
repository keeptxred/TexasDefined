#!/usr/bin/env node
/**
 * Bounded 2026–27 Alabama Creek WMA source check for the deer authority guide.
 * Only two TPWD pages. Does not scrape all public-hunt opportunities or infer
 * availability. Source changes fail closed and trigger editorial review.
 */
import assert from 'node:assert/strict';
import fs from 'node:fs';

const season = JSON.parse(fs.readFileSync('src/data/hunting/deer-season-dates.json', 'utf8'));
const catalogUrl = 'https://tpwd.texas.gov/huntwild/hunt/public/public_hunt_drawing/hunt-area-details.phtml?OArea=AL';
const accessUrl = 'https://tpwd.texas.gov/huntwild/hunt/public/annual_public_hunting/need-to-know/';
const simplify = html => html
  .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
  .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
  .replace(/<[^>]+>/g, ' ')
  .replace(/&(?:nbsp|#160);/gi, ' ')
  .replace(/&amp;/gi, '&')
  .replace(/\s+/g, ' ').trim();
const requireSource = (source, text, label) => {
  if (!source.includes(text)) throw new Error(label + ' missing official TPWD assertion: ' + text);
};
function verify(catalogHtml, accessHtml) {
  const catalog = simplify(catalogHtml);
  const access = simplify(accessHtml);
  for (const marker of [
    'Texas Public Hunt System 2026 - 2027', 'ALABAMA CREEK WMA',
    'USFS Antlerless Deer Permit - Adult', 'USFS Buck Deer Permit - Adult',
    'Application Deadline Expired: September 15, 2026', 'No standbys available.',
    'Nov 07, 2026', 'Jan 03, 2027',
    'One White-tailed Deer; Antlerless Only; Limit One Antlerless',
    'One White-tailed Deer; Buck Only; Limit One Buck',
    'Annual Public Hunting Permit ($48) required to apply',
  ]) requireSource(catalog, marker, 'TPWD Alabama Creek drawn-hunt catalog');
  for (const marker of [
    'Public Hunting in Texas 2026-27', 'Alabama Creek WMA',
    'September 15, 2026', 'Annual Public Hunting (APH) Permit',
    'hunting license', 'electronic on-site registration',
  ]) requireSource(access.toLowerCase(), marker.toLowerCase(), 'TPWD current public-hunt access');
}

if (process.argv.includes('--self-test')) {
  // Fixtures must include distinct adult buck and antlerless categories, year,
  // expired application, exact season dates and genuine permit/access duties.
  const catalog = [
    'Texas Public Hunt System 2026 - 2027 ALABAMA CREEK WMA',
    'USFS Antlerless Deer Permit - Adult',
    'Application Deadline Expired: September 15, 2026',
    'No standbys available. Annual Public Hunting Permit ($48) required to apply',
    'Nov 07, 2026 – Jan 03, 2027',
    'One White-tailed Deer; Antlerless Only; Limit One Antlerless',
    'USFS Buck Deer Permit - Adult',
    'One White-tailed Deer; Buck Only; Limit One Buck',
  ].join(' ');
  const access = 'Public Hunting in Texas 2026-27 Alabama Creek WMA September 15, 2026 Annual Public Hunting (APH) Permit hunting license electronic on-site registration';
  verify(catalog, access);
  assert.throws(() => verify(catalog.replace('September 15, 2026', 'October 1, 2026'), access), /September 15/);
  assert.throws(() => verify(catalog.replace('One White-tailed Deer; Buck Only; Limit One Buck', ''), access), /Buck Only/);
  assert.throws(() => verify(catalog, access.replace('Alabama Creek WMA', 'Other WMA')), /alabama creek/i);
  assert.throws(() => verify(catalog.replace('2026 - 2027', '2027 - 2028'), access), /2026 - 2027/);
  console.log('Deer public-unit TPWD source assertions and false-positive rejections passed offline.');
  process.exit(0);
}
if (season.startYear !== 2026) {
  console.log('Annual unit check safely skipped: 2026–27 example is hidden after TPWD season rollover.');
  process.exit(0);
}
async function get(url) {
  let last;
  for (let i = 0; i < 2; i++) {
    try {
      const response = await fetch(url, {
        headers: { 'user-agent': 'TexasDefined-Official-Source-Verification/1.0',
          accept: 'text/html', 'cache-control': 'no-cache' },
        signal: AbortSignal.timeout(25000),
      });
      if (!response.ok) throw new Error('TPWD source returned HTTP ' + response.status + ': ' + url);
      const html = await response.text();
      if (html.length < 10000) throw new Error('TPWD returned an unexpectedly short page: ' + url);
      return html;
    } catch (error) {
      last = error;
      if (i === 0) await new Promise(resolve => setTimeout(resolve, 1200));
    }
  }
  throw last;
}
const [catalog, access] = await Promise.all([get(catalogUrl), get(accessUrl)]);
verify(catalog, access);
console.log('TPWD Unit 904 Alabama Creek 2026–27 adult buck/antlerless public-hunt permit facts verified against both live official pages.');
