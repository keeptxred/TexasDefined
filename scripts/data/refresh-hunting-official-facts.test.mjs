import test from 'node:test';
import assert from 'node:assert/strict';
import { OFFICIAL_URLS, parsePermitFacts, checkOtherOfficialSources, reconcile } from './refresh-hunting-official-facts.mjs';

const example = `<html><h1>Annual Public Hunting Permit / Walk-in Hunts</h1><h2>2026-27</h2><p>${'Full public hunting program and access details '.repeat(55)}</p><p>$48 Annual Public Hunting (APH) Permit and $12 Limited Public Use (LPU) Permit</p></html>`;
const current = { seasonYear: '2026–27', aphPermitUsd: 48, limitedPublicUsePermitUsd: 12, lastFactVerification: '2026-10-28', source: OFFICIAL_URLS.access };
test('extract only complete official APH price and season evidence', () => {
  assert.deepEqual(parsePermitFacts(example), { seasonYear: '2026–27', aphPermitUsd: 48, limitedPublicUsePermitUsd: 12 });
  assert.throws(() => parsePermitFacts(example.replace('Limited Public Use (LPU) Permit', 'Some permit')), /unambiguously/);
  assert.equal(parsePermitFacts(example.replace('2026-27', '2027-28')).seasonYear, '2027–28');
});
test('do not update verified date when facts remain unchanged', () => {
  assert.equal(reconcile(current, parsePermitFacts(example), '2026-11-03'), null);
});
test('bounded verified permit price change produces a tiny safe diff', () => {
  const changed = reconcile(current, {...parsePermitFacts(example), aphPermitUsd: 52}, '2026-11-03');
  assert.equal(changed.aphPermitUsd, 52);
  assert.equal(changed.limitedPublicUsePermitUsd, 12);
  assert.equal(changed.lastFactVerification, '2026-11-03');
  assert.equal(changed.source, OFFICIAL_URLS.access);
});
test('future season rollover and implausible values stop automatic changes', () => {
  assert.throws(() => reconcile(current, {seasonYear:'2027–28',aphPermitUsd:49,limitedPublicUsePermitUsd:13},'2027-08-01'), /rollover/);
  assert.throws(() => parsePermitFacts(example.replace('$48 Annual','$155 Annual')), /plausibility/);
});
test('official rule notices must retain verified key markers', () => {
  const pages = {
    changes: 'Doe Days Special White-winged Dove Days Matagorda Wharton unbearded ' + 'source text '.repeat(90),
    seasons: '2026-27 Hunting Season Dates Dove Duck Turkey ' + 'source text '.repeat(90),
    hogs: 'Feral Hogs Hunter Education No hunting license is required to hunt feral hogs on private ' + 'source text '.repeat(90),
    areaSearch: 'Search for an Area or Legal Game Legal Game Public Hunting ' + 'source text '.repeat(90),
  };
  assert.doesNotThrow(() => checkOtherOfficialSources(pages, current.seasonYear));
  assert.throws(() => checkOtherOfficialSources({...pages,changes:pages.changes.replace('Matagorda','another county')}, current.seasonYear), /change notice/);
});
