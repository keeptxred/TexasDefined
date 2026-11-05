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

test('equivalent TS import types from temporary worktree and main checkout are not new errors',()=>{
  const fromBase=[
    `src/platform/entity-promotion.ts(53,31): error TS2345: Argument of type 'import("/tmp/tmp.Abc123/src/data/knowledge-graph/types").TexasEntityRecord[]' is not assignable to parameter of type 'import("/tmp/tmp.Abc123/src/shared/platform-core/entities").TexasEntityRecord[]'.`,
    `src/platform/entity-promotion.ts(76,50): error TS2345: Argument of type 'import("/tmp/tmp.Abc123/src/data/knowledge-graph/types").TexasEntityRecord[]' is not assignable to parameter of type 'import("/tmp/tmp.Abc123/src/shared/platform-core/entities").TexasEntityRecord[]'.`,
    `src/platform/entity-promotion.ts(77,51): error TS2345: Argument of type 'import("/tmp/tmp.Abc123/src/data/knowledge-graph/types").TexasEntityRecord[]' is not assignable to parameter of type 'import("/tmp/tmp.Abc123/src/shared/platform-core/entities").TexasEntityRecord[]'.`,
    `src/platform/entity-promotion.ts(114,42): error TS2345: Argument of type 'import("/tmp/tmp.Abc123/src/data/knowledge-graph/types").TexasEntityRecord' is not assignable to parameter of type 'import("/tmp/tmp.Abc123/src/shared/platform-core/entities").TexasEntityRecord'.`,
  ].join('\n');
  const fromHead=fromBase
    .replaceAll('/tmp/tmp.Abc123/','/home/runner/work/TexasDefined/TexasDefined/')
    .replace('(53,31)','(56,31)')
    .replace('(76,50)','(79,50)');
  const result=compareTypeScriptDiagnostics(fromBase,fromHead);
  assert.equal(result.baselineDiagnostics,4);
  assert.equal(result.currentDiagnostics,4);
  assert.equal(result.introducedDiagnostics,0);
  assert.equal(result.noNewTypeScriptErrors,true);
});
test('TS delta still rejects changes to the imported project module identity',()=>{
  const old=`src/example.ts(1,1): error TS2345: Argument of type 'import("/tmp/base/src/first").Thing' is not assignable to type 'import("/tmp/base/src/second").Thing'.`;
  const changed=`src/example.ts(2,1): error TS2345: Argument of type 'import("/runner/head/src/first").Thing' is not assignable to type 'import("/runner/head/src/third").Thing'.`;
  const result=compareTypeScriptDiagnostics(old,changed);
  assert.equal(result.introducedDiagnostics,1);
  assert.equal(result.noNewTypeScriptErrors,false);
});
