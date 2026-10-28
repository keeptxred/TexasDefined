import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeVerifiedCountyOfficeUrl as normalize, retryPublicOfficeGetAfterHeadStatus as retryGet } from './county-office-link-normalization.mjs';

test('reject HTTPS redirects to locked, denied and login-only destinations', () => {
  const blocked = [
    'https://www.navarrocad.com/Home/UserLockedOut',
    'https://www.navarrocad.com/Home/AccessDenied',
    'https://www.navarrocad.com/login?ReturnUrl=%2F',
    'https://www.garzacounty.gov/account/Unauthorized',
    'https://www.example.gov/Error',
    'https://example.gov:443/signin',
  ];
  for (const url of blocked) assert.equal(normalize(url), null, url);
  assert.equal(normalize('https://www.navarrocad.com/'), 'https://www.navarrocad.com/');
});

test('keep only a named county-specific vendor key and remove volatile timestamp tokens', () => {
  const hopkins = 'https://iswdataclient.azurewebsites.net/webindex.aspx?dbkey=HOPKINSCAD&time=202610281504007';
  const parker = 'https://www.southwestdatasolution.com/webindex.aspx?dbkey=PARKERCAD&time=202610281504017';
  assert.equal(normalize(hopkins), 'https://iswdataclient.azurewebsites.net/webindex.aspx?dbkey=HOPKINSCAD');
  assert.equal(normalize(parker), 'https://www.southwestdatasolution.com/webindex.aspx?dbkey=PARKERCAD');
  assert.equal(normalize('https://iswdataclient.azurewebsites.net/webindex.aspx?dbkey=HOPKINSCAD'),
    'https://iswdataclient.azurewebsites.net/webindex.aspx?dbkey=HOPKINSCAD');
  assert.equal(normalize(hopkins.replace('202610281504007','bad')), null);
  assert.equal(normalize(hopkins+'&time=202610281504008'), null);
  assert.equal(normalize(hopkins.replace('HOPKINSCAD','')), null);
});

test('preserve meaningful parameters for unrelated offices and source identity', () => {
  const source='https://www.tax-office.example.gov/property/search?county=BELL&year=2026#top';
  assert.equal(normalize(source), 'https://www.tax-office.example.gov/property/search?county=BELL&year=2026');
  assert.equal(normalize('https://iswdataclient.azurewebsites.net/webindex.aspx?dbkey=HOPKINSCAD&other=1&time=202610281504007'),
    'https://iswdataclient.azurewebsites.net/webindex.aspx?dbkey=HOPKINSCAD&other=1');
  assert.equal(normalize('http://www.navarrocad.com/'), null);
  assert.equal(normalize('https://localhost/'), null);
  assert.equal(normalize('https://127.0.0.1/'), null);
  assert.equal(normalize('https://user:pass@www.bellcad.org/'), null);
});

test('publication sync uses the pure URL gate for source HTTPS and verified redirects', async () => {
  const fs = await import('node:fs/promises');
  const source = await fs.readFile('scripts/data/sync-county-property-data.mjs','utf8');
  assert.match(source,/if \(url\.protocol === 'https:'\) return normalizeVerifiedCountyOfficeUrl\(url\.toString\(\)\)/);
  assert.match(source,/if \(!response\.ok \|\| response\.headers\.get\('cf-mitigated'\) === 'challenge'\) \{/);
  assert.match(source,/County HTTPS GET rejected/);
  assert.match(source,/County HTTPS HEAD rejected/);
  assert.match(source,/return normalizeVerifiedCountyOfficeUrl\(resolved\.toString\(\)\)/);
  assert.match(source,/isAmbiguousCountyWithdrawal\(merged\[result\.county\.slug\], result\)/);
});

test('HEAD-only government 403 retries one bounded public HTTPS GET; failures remain quarantined', async()=>{
  for (const code of [403,405,501]) assert.equal(retryGet(code), true, 'HEAD '+code);
  for (const code of [200,301,302,401,404,429,500,502,503])
    assert.equal(retryGet(code), false, 'Untrusted HEAD '+code);
  const fs=await import('node:fs/promises');
  const source=await fs.readFile('scripts/data/sync-county-property-data.mjs','utf8');
  assert.match(source,/if \(retryPublicOfficeGetAfterHeadStatus\(response\.status\)\)/);
  assert.match(source,/response\.headers\.get\('cf-mitigated'\) === 'challenge'/);
  assert.match(source,/const resolved = new URL\(response\.url\)/);
  assert.match(source,/return normalizeVerifiedCountyOfficeUrl\(resolved\.toString\(\)\)/);
  assert.match(source,/signal: AbortSignal\.timeout\(8500\)/);
});
