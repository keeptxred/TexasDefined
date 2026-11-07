// Conservative TS diagnostic delta comparator for this isolated archive PR.
// The monorepo already contains TypeScript errors. Never treat that baseline
// as a release certificate; fail on ANY newly introduced diagnostic instead.
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

function canonicalLine(line) {
  return line.replace(/\x1b\[[0-9;]*m/g,'').trim();
}
export function parseTypeScriptDiagnostics(text) {
  const errors=new Map();
  for (const raw of String(text).split(/\r?\n/)) {
    const line=canonicalLine(raw);
    if (!line.includes('error TS')) continue;
    const match=line.match(/^(?:(.+?)\(\d+,\d+\): )?error (TS\d+): (.+)$/);
    if (!match) throw new Error('Unrecognized TypeScript error diagnostic; refusing false green: '+line.slice(0,200));
    const path=(match[1]||'<project>').replaceAll('\\','/');
    // TypeScript embeds checkout-local absolute paths inside import("...") types.
    // Base worktrees run under /tmp while the head runs under GITHUB_WORKSPACE.
    // Normalize ONLY absolute imports rooted at this project's src/ tree;
    // preserve module identity, types, error code and multiplicity.
    const message=match[3].replace(/\s+/g,' ').trim().replace(
      /import\("(?:(?:[A-Za-z]:)?[^"]*\/)(src\/[^"]+)"\)/g,
      'import("$1")',
    );
    const key=JSON.stringify([path,match[2],message]);
    errors.set(key,(errors.get(key)||0)+1);
  }
  return errors;
}
export function compareTypeScriptDiagnostics(baselineText,currentText) {
  const baseline=parseTypeScriptDiagnostics(baselineText);
  const current=parseTypeScriptDiagnostics(currentText);
  const introduced=[];
  for (const [key,count] of current) {
    const before=baseline.get(key)||0;
    if(count>before) {
      const [path,code,message]=JSON.parse(key);
      introduced.push({path,code,message,count:count-before});
    }
  }
  introduced.sort((a,b)=>a.path.localeCompare(b.path)||a.code.localeCompare(b.code));
  return {
    baselineDiagnostics:[...baseline.values()].reduce((a,b)=>a+b,0),
    currentDiagnostics:[...current.values()].reduce((a,b)=>a+b,0),
    introducedDiagnostics:introduced.reduce((n,x)=>n+x.count,0),
    introduced,
    noNewTypeScriptErrors:introduced.length===0,
  };
}
export async function verifyTypeScriptDelta({
  baselinePath,currentPath,reportPath,baselineExit,currentExit,
}) {
  if (![0,2].includes(baselineExit) || ![0,2].includes(currentExit))
    throw new Error('TypeScript compiler did not exit normally; comparison not trustworthy');
  const [base,head]=await Promise.all([readFile(baselinePath,'utf8'),readFile(currentPath,'utf8')]);
  const result=compareTypeScriptDiagnostics(base,head);
  if ((baselineExit!==0 && result.baselineDiagnostics===0) ||
      (currentExit!==0 && result.currentDiagnostics===0))
    throw new Error('Compiler failed without parseable TypeScript diagnostics');
  await mkdir(dirname(reportPath),{recursive:true});
  await writeFile(reportPath,JSON.stringify(result,null,2)+'\n');
  if (!result.noNewTypeScriptErrors)
    throw new Error('Archive PR introduced '+result.introducedDiagnostics+
      ' new TypeScript diagnostics; inspect '+reportPath);
  return result;
}
if (process.argv[1] && resolve(process.argv[1])===fileURLToPath(import.meta.url)) {
  if(process.argv.length!==5) throw new Error('Expected baseline.log current.log report.json');
  const result=await verifyTypeScriptDelta({
    baselinePath:process.argv[2],currentPath:process.argv[3],
    reportPath:process.argv[4],
    baselineExit:Number(process.env.BASELINE_TSC_EXIT),
    currentExit:Number(process.env.CURRENT_TSC_EXIT),
  });
  console.log('[immutable-ts-delta] baseline='+result.baselineDiagnostics+
    '; current='+result.currentDiagnostics+
    '; introduced='+result.introducedDiagnostics+
    '; no-new-errors='+result.noNewTypeScriptErrors);
}
