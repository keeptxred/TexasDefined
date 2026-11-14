import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import {
  selectActualScheduledRun, validateQuarterlyPR, checkBrowserEvidence, browserCases,
} from "./verify-first-turkey-quarterly.mjs";

const scheduled = {
  databaseId: 42, createdAt: "2027-01-02T15:17:01Z", event:"schedule",
  headBranch:"main", status:"completed", conclusion:"success",
};
const pr = {
  title:"Refresh verified TPWD turkey public draws and survey",
  head:{ref:"automation/turkey-quarterly-42"},base:{ref:"main"},
  user:{login:"github-actions[bot]"},merged_at:"2027-01-02T19:45:00Z",
  merge_commit_sha:"a".repeat(40),
};

test("requires a real successful Jan 2 scheduled source, not a dispatch or arbitrary prior run", () => {
  assert.deepEqual(selectActualScheduledRun([scheduled]),scheduled);
  assert.throws(()=>selectActualScheduledRun([{...scheduled,event:"workflow_dispatch"}]),/no confirmed scheduled/);
  assert.throws(()=>selectActualScheduledRun([{...scheduled,createdAt:"2026-10-30T14:00:00Z"}]),/no confirmed scheduled/);
  assert.throws(()=>selectActualScheduledRun([{...scheduled,conclusion:"failure"}]),/source verification failed/);
  assert.throws(()=>selectActualScheduledRun([{...scheduled,status:"in_progress"}]),/has not completed/);
  assert.throws(()=>selectActualScheduledRun([{...scheduled,headBranch:"automation/untrusted"}]),/no confirmed scheduled/);
});

test("only source-linked approved data PR and verified bot merge can pass", () => {
  assert.doesNotThrow(()=>validateQuarterlyPR(pr,42,["src/data/hunting/turkey-quarterly-facts.json"]));
  assert.throws(()=>validateQuarterlyPR({...pr,user:{login:"other-user"}},42,["src/data/hunting/turkey-quarterly-facts.json"]),/GitHub Actions bot/);
  assert.throws(()=>validateQuarterlyPR(pr,43,["src/data/hunting/turkey-quarterly-facts.json"]),/Source-run branch/);
  assert.throws(()=>validateQuarterlyPR(pr,42,[".github/workflows/finisher.yml","src/data/hunting/turkey-quarterly-facts.json"]),/only governed/);
  assert.throws(()=>validateQuarterlyPR({...pr,merged_at:null},42,["src/data/hunting/turkey-quarterly-facts.json"]),/actually merge/);
});

function makeEvidence() {
  return {route:"https://texasdefined.com/hunting/turkey-hunting",
    results:browserCases.map(viewport=>({
      viewport,title:"Texas turkey hunting guide",canonical:"https://texasdefined.com/hunting/turkey-hunting",
      imageCount:3,links:83,layoutOverflowPx:0,errors:[],schemas:["Article","FAQPage","BreadcrumbList"]
    }))
  };
}
test("requires the four actual PNG screenshots and data from exact live page", t => {
  const root = mkdtempSync(path.join(os.tmpdir(),"turkey-gh-qa-"));
  t.after(()=>rmSync(root,{recursive:true,force:true}));
  mkdirSync(root,{recursive:true});
  for(const viewport of browserCases) {
    const image=Buffer.alloc(4096);
    Buffer.from([137,80,78,71,13,10,26,10]).copy(image);
    writeFileSync(path.join(root,viewport+".png"),image);
  }
  const evidence=makeEvidence();
  assert.doesNotThrow(()=>checkBrowserEvidence(evidence,root));
  assert.throws(()=>checkBrowserEvidence({...evidence,results:evidence.results.slice(1)},root),/Four Chrome variants/);
  assert.throws(()=>checkBrowserEvidence({...evidence,results:evidence.results.map((v,i)=>i===1?{...v,layoutOverflowPx:50}:v)},root),/Horizontal overflow/);
  assert.throws(()=>checkBrowserEvidence({...evidence,results:evidence.results.map((v,i)=>i===2?{...v,failure:"timeout"}:v)},root),/Browser error/);
  assert.throws(()=>checkBrowserEvidence({...evidence,results:evidence.results.map((v,i)=>i===3?{...v,schemas:["Article"]}:v)},root),/Missing FAQPage/);
});
