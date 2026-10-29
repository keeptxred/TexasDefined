import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";

const LEDGER_PATH = "ops/editorial/viator-new-destination-approval-ledger.json";
const BASE_DIR = "src/data";
const SEED_FILE = /^viator-destination-expansion-(?:base|wave\d+)\.ts$/;
const SLUG_LINE = /^\s*slug:\s*"([a-z0-9]+(?:-[a-z0-9]+)*)"/gm;

function validIsoDate(value) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = new Date(value + "T12:00:00Z");
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0,10)===value;
}
function httpsUrl(value) {
  if (typeof value !== "string") return false;
  try { const u = new URL(value); return u.protocol === "https:" && !u.username && !u.password; }
  catch { return false; }
}
/**
 * Form validation is deliberately NOT proof of human consent: the actual
 * owner decision must be inspected in its issue comment or PR review before
 * the assistant enters it in the ledger. CI blocks accidental omissions.
 */
function approvedRecord(record) {
  if (!record || record.decision !== "approved" ||
      record.approvedBy !== "editorial-owner" ||
      !validIsoDate(record.approvedAt) ||
      !httpsUrl(record.reviewUrl) || !httpsUrl(record.officialSourceUrl) ||
      !validIsoDate(record.officialCheckedAt) ||
      record.originalEditorialReviewed !== true ||
      !["licensed","original","generated-reviewed"].includes(record.imageRights) ||
      typeof record.valueProposition !== "string" || record.valueProposition.trim().length < 40) {
    return false;
  }
  const official = new URL(record.officialSourceUrl);
  if (/(^|\.)viator\.com$/i.test(official.hostname)) return false;
  const review = new URL(record.reviewUrl);
  const pieces = review.pathname.split("/").filter(Boolean);
  const isReview = pieces.length === 4 && pieces[0] && pieces[1] === "TexasDefined" &&
    ((pieces[2] === "issues" && pieces[3] === "6380" && /^#issuecomment-\d+$/.test(review.hash)) ||
     (pieces[2] === "pull" && /^\d+$/.test(pieces[3]) && /^#pullrequestreview-\d+$/.test(review.hash)));
  return review.hostname === "github.com" && Boolean(isReview);
}

function destinationFiles() {
  return readdirSync(BASE_DIR).filter(name => SEED_FILE.test(name)).sort().map(name=>({
    name,
    content:readFileSync(path.join(BASE_DIR,name),"utf8"),
  }));
}

function extractEntries(files) {
  const entries=[];
  for(const {name,content} of files){
    const matches=[...content.matchAll(SLUG_LINE)];
    for(let i=0;i<matches.length;i++){
      const match=matches[i];
      const block=content.slice(match.index, i+1<matches.length?matches[i+1].index:content.length);
      entries.push({slug:match[1],name,block});
    }
  }
  return entries;
}

function validate(entries,ledger) {
  assert.equal(ledger.schema,1,"Unknown approval-ledger schema");
  assert.ok(Array.isArray(ledger.existingSlugs),"Missing grandfathered slug inventory");
  const original=new Set(ledger.existingSlugs);
  assert.equal(original.size,ledger.existingSlugs.length,"Grandfathered slug list must not contain duplicates");
  assert.ok(original.size>=20,"Do not silently shrink/overwrite the existing reviewed destination baseline");
  const seen=new Set();
  const added=[];
  for(const entry of entries){
    assert.ok(!seen.has(entry.slug),`Duplicate Viator-discovered destination slug: ${entry.slug}`);
    seen.add(entry.slug);
    if(original.has(entry.slug)) continue;
    const record=ledger.approvedNew?.[entry.slug];
    assert.ok(approvedRecord(record),
      `NEW Viator-discovered destination ${entry.slug} in ${entry.name} is not owner-approved: hold publication; create researched proposal and obtain explicit owner decision in approval desk #6380`);
    assert.ok(/\bofficialUrl:\s*"https:\/\//.test(entry.block),"New guide must link official operator");
    assert.ok(/\bsourceCheckedAt:\s*(?:"\d{4}-\d{2}-\d{2}"|SOURCE_CHECKED_AT)\b?/.test(entry.block) ||
      /sourceCheckedAt:\s*"\d{4}-\d{2}-\d{2}"/.test(entry.block),"New guide must contain official-source freshness");
    assert.ok(/\bbody:\s*\[/.test(entry.block),"New guide must contain original visitor planning, not a thin affiliate stub");
    assert.ok(/\bhero:\s*\{/.test(entry.block),"New guide must have a review-cleared image plan");
    added.push(entry.slug);
  }
  const staged=Object.keys(ledger.approvedNew||{}).filter(s=>!seen.has(s));
  assert.equal(staged.length,0,`Approval ledger contains ${staged.length} stale/non-existent destinations: ${staged.join(", ")}`);
  return {total:entries.length,preexisting:entries.length-added.length,approvedAdded:added};
}

const ledger=JSON.parse(readFileSync(LEDGER_PATH,"utf8"));
const entries=extractEntries(destinationFiles());
const report=validate(entries,ledger);
console.log(`Viator destination publication gate: ${report.preexisting} existing guides, ${report.approvedAdded.length} explicitly ledger-approved new guides. No unreviewed new supplier-derived destination may publish.`);

if(process.argv.includes("--self-test")) {
  assert.throws(()=>validate([...entries,{slug:"unapproved-test-attraction",name:"fake-wave.ts",block:""}],ledger),/not owner-approved/);
  assert.equal(approvedRecord({decision:"approved",approvedBy:"editorial-owner",approvedAt:"2026-10-29",
    reviewUrl:"https://github.com/example/TexasDefined/issues/6380#issuecomment-123",
    officialSourceUrl:"https://viator.com/supplier",officialCheckedAt:"2026-10-29",
    originalEditorialReviewed:true,imageRights:"licensed",valueProposition:"Detailed visitor guidance that adds original value for travelers"}),false,
    "Viator is not an official identity/authority source");
  assert.equal(approvedRecord({decision:"approved",approvedBy:"editorial-owner",approvedAt:"2026-02-30",
    reviewUrl:"https://github.com/example/TexasDefined/issues/6380#issuecomment-123",
    officialSourceUrl:"https://example.com/operator",officialCheckedAt:"2026-10-29",
    originalEditorialReviewed:true,imageRights:"licensed",valueProposition:"Detailed visitor guidance that adds original value for travelers"}),false);
  console.log("Owner approval gate self-tests passed: unapproved pages, supplier-only proofs and invalid dates fail closed.");
}
