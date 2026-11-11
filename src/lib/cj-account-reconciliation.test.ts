import test from 'node:test';
import assert from 'node:assert/strict';
import {
  aggregateCjCommissions, commissionGraphqlQuery, verifiedRgsContractStatus,
  rgsProgramTermsGraphqlQuery, CJ_PUBLISHER_CID,
} from './cj-account-reconciliation.ts';

const record = (overrides: Record<string, unknown> = {}) => ({
  commissionId: '1001',
  publisherId: CJ_PUBLISHER_CID,
  advertiserId: '1702763',
  shopperId: 'td_polar_palestine',
  actionStatus: 'new',
  original: true,
  pubCommissionAmountUsd: '5.500',
  ...overrides,
});

test('queries only private publisher company CID and a bounded UTC window', () => {
  const q = commissionGraphqlQuery('2026-10-13T00:00:00Z', '2026-11-12T00:00:00Z', null);
  assert.match(q, /forPublishers: \["8062457"\]/);
  assert.match(q, /shopperId/);
  assert.doesNotMatch(q, /101876465/);
  assert.match(commissionGraphqlQuery('2026-10-13T00:00:00Z', '2026-11-12T00:00:00Z', '123'), /sinceCommissionId: "123"/);
  assert.throws(() => commissionGraphqlQuery('2026-10-01T00:00:00Z', '2026-11-12T00:00:00Z', null));
  assert.throws(() => commissionGraphqlQuery('2026-10-13T00:00:00Z', '2026-11-12T00:00:00Z', '"} injected'));
  assert.match(rgsProgramTermsGraphqlQuery(), /advertiserId: "7552520"/);
});

test('commission corrections are signed deltas and only exact SID is Palestine-attributable', () => {
  const result = aggregateCjCommissions([
    record(),
    record({ commissionId: '1002', original: false, pubCommissionAmountUsd: '-5.500' }),
    record({ commissionId: '1003', shopperId: null, actionStatus: 'locked', pubCommissionAmountUsd: '2.250' }),
    record({ commissionId: '1004', advertiserId: '999', shopperId: 'td_polar_palestine', actionStatus: 'closed', pubCommissionAmountUsd: '4.000' }),
  ]);
  assert.equal(result.commissionRecordCount, 4);
  assert.equal(result.commissionDeltaUsd, 6.25);
  assert.equal(result.palestineCommissionRecordCount, 2);
  assert.equal(result.palestineCommissionDeltaUsd, 0);
  assert.equal(result.palestineMissingSidUnattributed, true);
  assert.equal(result.closedOrLockedCount, 2);
});

test('reject foreign publisher, duplicate commission ID, malformed money', () => {
  assert.throws(() => aggregateCjCommissions([record({ publisherId: '101876465' })]));
  assert.throws(() => aggregateCjCommissions([record(), record()]));
  assert.throws(() => aggregateCjCommissions([record({ pubCommissionAmountUsd: 'not-a-number' })]));
  assert.throws(() => aggregateCjCommissions([record({ commissionId: 'abc' })]));
});

test('RGS can be ACTIVE only for a currently effective provider contract', () => {
  const now = Date.parse('2026-11-11T16:00:00Z');
  const old = { advertiserId: '7552520', status: 'EXPIRED', startTime: '2026-09-01T00:00:00Z', endTime: '2026-10-01T00:00:00Z' };
  const current = { advertiserId: '7552520', status: 'ACTIVE', startTime: '2026-11-02T00:00:00Z', endTime: null };
  assert.equal(verifiedRgsContractStatus([old], now).status, 'INACTIVE');
  assert.equal(verifiedRgsContractStatus([old, current], now).status, 'ACTIVE');
  assert.equal(verifiedRgsContractStatus([{ ...current, startTime: '2026-12-01T00:00:00Z' }], now).status, 'INACTIVE');
  assert.equal(verifiedRgsContractStatus([{ ...current, status: 'PENDING_OFFER' }], now).status, 'PENDING');
  assert.equal(verifiedRgsContractStatus([{ ...current, advertiserId: '9999' }], now).status, 'NO_MATCH');
});
