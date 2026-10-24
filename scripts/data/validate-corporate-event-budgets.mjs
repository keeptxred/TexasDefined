import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { groupEventPlanningAmounts } from '../../src/data/corporate-event-budgets.ts';

assert.deepEqual(groupEventPlanningAmounts(45,100,40),{budgetCeiling:4500,indicativeStartingTotal:1800});
assert.deepEqual(groupEventPlanningAmounts(45,null,null),{budgetCeiling:null,indicativeStartingTotal:null});
assert.deepEqual(groupEventPlanningAmounts(1,100,40),{budgetCeiling:null,indicativeStartingTotal:null});
assert.deepEqual(groupEventPlanningAmounts(45,-5,0),{budgetCeiling:null,indicativeStartingTotal:null});
assert.deepEqual(groupEventPlanningAmounts(45,100,null),{budgetCeiling:4500,indicativeStartingTotal:null});
assert.deepEqual(groupEventPlanningAmounts(45,null,40),{budgetCeiling:null,indicativeStartingTotal:1800});
assert.deepEqual(groupEventPlanningAmounts(5000,100,null),{budgetCeiling:500000,indicativeStartingTotal:null});
assert.deepEqual(groupEventPlanningAmounts(8000,100,40),{budgetCeiling:800000,indicativeStartingTotal:320000});
assert.deepEqual(groupEventPlanningAmounts(8001,100,40),{budgetCeiling:null,indicativeStartingTotal:null});
const page=readFileSync('src/routes/corporate-events.lazy.tsx','utf8');
assert(page.includes('groupEventPlanningAmounts'), 'Cost estimator must be connected to corporate-event finder');
assert(page.includes('planningAmounts.budgetCeiling'), 'Management proposal must expose total planning ceiling');
assert(page.includes('indicativeStartingTotal'), 'Show starting group totals only when provider has rate');
assert(page.includes('not all-inclusive') && page.includes('NOT verified quotes'), 'Do not misrepresent published rates as confirmed corporate quotes');
console.log('Corporate event group budgeting and quote-uncertainty guard PASSED.');
