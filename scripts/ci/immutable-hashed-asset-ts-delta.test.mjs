import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, writeFile, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import {
  compareTypeScriptDiagnostics, parseTypeScriptDiagnostics,
  verifyTypeScriptDelta,
} from './compare-typescript-diagnostics.mjs';

test('regression gate respects shifted source line numbers but not changed diagnostics',()=>{
  const base='src/server-entry.ts(109,18): error TS2339: Property \'success\' does not exist on type \'{}\'.\n';
  const head='src/server-entry.ts(126,18): error TS2339: Property \'success\' does not exist on type \'{}\'.\n';
  const result=compareTypeScriptDiagnostics(base,head);
  assert.equal(result.baselineDiagnostics,1);
  assert.equal(result.currentDiagnostics,1);
  assert.equal(result.introducedDiagnostics,0);
  assert.equal(result.noNewTypeScriptErrors,true);
});

test('regression gate refuses a new archive import error even amid 1000 baseline errors',()=>{
  const baseline=Array.from({length:1100},(_,i)=>
    'src/legacy'+i+'.tsx(4,3): error TS2322: baseline code').join('\n');
  const current=baseline+
    '\nsrc/server-entry.ts(8,5): error TS7016: Could not find a declaration file for module';
  const result=compareTypeScriptDiagnostics(baseline,current);
  assert.equal(result.baselineDiagnostics,1100);
  assert.equal(result.introducedDiagnostics,1);
  assert.equal(result.introduced[0].code,'TS7016');
  assert.equal(result.noNewTypeScriptErrors,false);
});

test('duplicate existing errors retain their multiplicity in regression comparison',()=>{
  const base='src/x.ts(1,2): error TS2345: bad\n';
  const head=base+'src/x.ts(3,4): error TS2345: bad\n';
  assert.equal(compareTypeScriptDiagnostics(base,head).introducedDiagnostics,1);
});

test('project-global errors are compared and unparseable errors fail closed',()=>{
  assert.equal(parseTypeScriptDiagnostics('error TS18003: No inputs were found.').size,1);
  assert.throws(()=>parseTypeScriptDiagnostics('unexpected: error TS9999: broken'),
    /Unrecognized TypeScript error diagnostic/);
});

test('file-backed regression proof persists real counts; compiler crash cannot be waved away',async()=>{
  const dir=await mkdtemp(join(tmpdir(),'td-ts-delta-'));
  try {
    const baseline=join(dir,'base.log'),head=join(dir,'head.log'),report=join(dir,'report.json');
    await writeFile(baseline,'src/legacy.ts(1,2): error TS2322: old\n');
    await writeFile(head,'src/legacy.ts(10,2): error TS2322: old\n');
    const result=await verifyTypeScriptDelta({
      baselinePath:baseline,currentPath:head,reportPath:report,
      baselineExit:2,currentExit:2,
    });
    assert.equal(result.introducedDiagnostics,0);
    assert.equal(JSON.parse(await readFile(report,'utf8')).noNewTypeScriptErrors,true);
    await assert.rejects(verifyTypeScriptDelta({
      baselinePath:baseline,currentPath:head,reportPath:report,
      baselineExit:137,currentExit:2,
    }),/did not exit normally/);
  } finally {await rm(dir,{recursive:true,force:true});}
});
