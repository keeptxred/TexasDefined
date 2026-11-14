import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

// Guard the batch label emitted by the actual Chrome runner. The previous
// successful 75+25 artifact was incorrectly labeled as Batch016.
test('Batch017 Chrome evidence is labeled Batch017 and refuses identity drift', () => {
 const source=readFileSync(new URL('./verify-football-b017-production.mjs',import.meta.url),'utf8');
 assert.match(source,/const report=\{batch:17,/);
 assert.match(source,/assert\.equal\(report\.batch,17,/);
 assert.doesNotMatch(source,/const report=\{batch:16,/);
});
