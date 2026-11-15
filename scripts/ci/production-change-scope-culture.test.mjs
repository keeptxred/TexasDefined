import test from 'node:test';
import assert from 'node:assert/strict';
import { buildChangePlan, TEXAS_CULTURE_AUTHORITY_PAGES } from './production-change-scope.mjs';

const editorialOwnerChanges = [
  'src/data/texas-icon-chapter-evidence.ts',
  'src/data/things-unique-to-texas.ts',
  'src/data/texas-evergreen-guides.ts',
  'src/routes/texas-food-history.tsx',
  'src/routes/what-does-chud-mean.tsx',
  'src/components/editorial/TexasEvergreenGuide.tsx',
  'scripts/ci/production-change-scope.mjs',
];

test('all ten culture and food authority pages receive deterministic smoke coverage on their shared owner change', () => {
  assert.equal(TEXAS_CULTURE_AUTHORITY_PAGES.length, 10);
  assert.equal(new Set(TEXAS_CULTURE_AUTHORITY_PAGES).size, 10);
  for (const owner of editorialOwnerChanges) {
    const plan = buildChangePlan({ baseline: 'previous', head: 'next',
      changedFiles: [owner], sources: {} });
    for (const path of TEXAS_CULTURE_AUTHORITY_PAGES) {
      assert.ok(plan.selectedPaths.includes(path), `Missing ${path} after ${owner} update`);
    }
    assert.equal(plan.omittedCount, 0, `Unnecessary truncation for ${owner}`);
    assert.ok(plan.selectedPaths.length <= plan.pageBudget, 'Must respect bounded deploy budget');
  }
});

test('the culture smoke does not expand ordinary unrelated editorial updates', () => {
  const plan = buildChangePlan({ baseline: 'previous', head: 'next',
    changedFiles: ['src/data/texas-lakes-compare.ts'], sources: {} });
  for (const path of TEXAS_CULTURE_AUTHORITY_PAGES) {
    assert.ok(!plan.selectedPaths.includes(path), `Unexpected culture smoke: ${path}`);
  }
});
