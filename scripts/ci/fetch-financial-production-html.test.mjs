import assert from 'node:assert/strict';
import test from 'node:test';
import { fetchFinancialProductionHtml } from './fetch-financial-production-html.mjs';

test('one timed-out financial response retries and preserves real HTML status/content', async () => {
  let count = 0;
  const reasons = [];
  const result = await fetchFinancialProductionHtml('https://texasdefined.com/texas-salary-calculator', {
    fetchImpl: async () => {
      count++;
      if (count < 3) throw new Error('The operation was aborted due to timeout');
      return new Response('<html>valid page marker</html>', { status: 200 });
    },
    sleep: async () => {},
    onRetry: ({ attempt, error }) => reasons.push({ attempt, error }),
  });
  assert.equal(count, 3);
  assert.equal(reasons.length, 2);
  assert.equal(result.response.status, 200);
  assert.equal(result.body, '<html>valid page marker</html>');
});

test('three persistent network failures still stop release verification', async () => {
  let count = 0;
  await assert.rejects(() => fetchFinancialProductionHtml('https://texasdefined.com/texas-budget-planner', {
    fetchImpl: async () => { count++; throw new Error('The operation was aborted due to timeout'); },
    sleep: async () => {},
  }), /failed after 3 bounded network attempts/);
  assert.equal(count, 3);
});

test('HTTP 404/503 and incorrect HTML remain visible to strict caller, without retry', async () => {
  for (const status of [404, 503]) {
    let count = 0;
    const result = await fetchFinancialProductionHtml('https://texasdefined.com/texas-budget-planner', {
      fetchImpl: async () => { count++; return new Response('<html>error</html>', { status }); },
      sleep: async () => {},
    });
    assert.equal(result.response.ok, false);
    assert.equal(result.response.status, status);
    assert.equal(count, 1);
  }
  const empty = await fetchFinancialProductionHtml('https://texasdefined.com/texas-budget-planner', {
    fetchImpl: async () => new Response('<html>missing expected links</html>', { status: 200 }),
  });
  assert.ok(!empty.body.includes('Connect the one-time move'));
});

test('retry and timeout configuration stay strictly bounded', async () => {
  await assert.rejects(() => fetchFinancialProductionHtml('https://texasdefined.com', { attempts: 4 }), /between 1 and 3/);
  await assert.rejects(() => fetchFinancialProductionHtml('https://texasdefined.com', { timeoutMs: 60000 }), /<= 30 seconds/);
});
