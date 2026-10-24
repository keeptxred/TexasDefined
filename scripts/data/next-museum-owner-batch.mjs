#!/usr/bin/env node
/**
 * Deterministic statewide museum research queue using the EXISTING owner
 * inventory audit and STATEWIDE_IMPLEMENTATION_LEDGER_20261013.json.
 *
 * Default mode is read-only. --assign reserves up to 25 candidates by writing
 * the existing ledger; commit/merge that ledger change before another chat
 * selects candidates. A branch-local assignment is NOT a cross-chat lock until
 * it is merged. GitHub's normal conflict/branch-protection checks are required.
 *
 * Neither assignment nor a source HTTP 200 is permission to publish a museum.
 */
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync, renameSync, openSync, closeSync, unlinkSync } from "node:fs";
import { ownerMuseumIdentityKey } from "./museum-owner-inventory-parser.mjs";

const ledgerPath = "docs/museums/STATEWIDE_IMPLEMENTATION_LEDGER_20261013.json";
const countArg = process.argv.find((arg) => arg.startsWith("--size="));
const size = countArg ? Number(countArg.slice(7)) : 25;
if (!Number.isInteger(size) || size < 1 || size > 25) throw Error("Batch size must be an integer from 1 to 25");

const terminal = new Set(["guide-merged", "authority-certified", "duplicate", "out-of-state", "closed", "not-visitable"]);
const eligible = new Set(["requires-independent-source-research", "existing-destination-needs-authority-audit"]);
const keyFor = (row) => ownerMuseumIdentityKey(row.submittedName);
function selectBatch(audit, ledger, limit) {
  const state = ledger.ownerInventoryExecution || { records: {} };
  const records = state.records || {};
  const unique = audit.uniqueRows || [];
  const keys = new Set();
  for (const row of unique) {
    const key = keyFor(row);
    if (!key || keys.has(key)) throw Error("Inventory contains empty/duplicate unique identity key: " + row.submittedName);
    keys.add(key);
  }
  const assigned = unique.filter((row) => records[keyFor(row)]?.status === "assigned");
  // Resume outstanding assignments before selecting anything new; never silently
  // discard an incomplete batch because a new chat began.
  if (assigned.length > limit) throw Error("More outstanding assigned museum records than one batch; finish existing assignments first");
  const candidates = unique.filter((row) =>
    !records[keyFor(row)] &&
    eligible.has(row.status) &&
    !row.duplicateOfOccurrence &&
    !(row.parseIssues || []).length);
  const selected = [...assigned, ...candidates.slice(0, limit - assigned.length)];
  const known = unique.filter((row) => records[keyFor(row)]?.status);
  const unreviewed = unique.filter((row) => !records[keyFor(row)]);
  const excludedByAudit = unreviewed.filter((row) =>
    row.status === "identity-or-geography-problem" || (row.parseIssues || []).length);
  const pendingAuthorityCertification = unreviewed.filter((row) =>
    row.status === "existing-authority-dossier-needs-independent-certification");
  return {
    inventoryOccurrences: audit.rows?.length ?? 0,
    uniqueCandidates: unique.length,
    assignedResumed: assigned.length,
    selected,
    recordedDecisions: known.length,
    unresolvedSourceResearch: candidates.length,
    provisionalParsingOrGeographyReview: excludedByAudit.length,
    existingDossiersAwaitingIndependentCertification: pendingAuthorityCertification.length,
    warning: "All names are provisional until operator identity and Texas location have been independently checked. A batch assignment does not certify or approve publication.",
  };
}
function assertTests() {
  const rows = ["Museum A", "Museum B", "Museum C", "Museum D"].map((name, i) => ({
    submittedName:name, rawOccurrence:i + 1, status:"requires-independent-source-research", parseIssues:[],
  }));
  const audit = { rows, uniqueRows:rows };
  const assigned = keyFor(rows[1]), completed = keyFor(rows[2]);
  const ledger = {ownerInventoryExecution:{records:{
    [assigned]:{status:"assigned", submittedName:"Museum B"},
    [completed]:{status:"guide-merged",submittedName:"Museum C",evidence:"https://github.com/example/PR"},
  }}};
  const result = selectBatch(audit,ledger,3);
  if (result.selected.map((r)=>r.submittedName).join("|") !== "Museum B|Museum A|Museum D")
    throw Error("Existing assignments must be resumed, completed omitted and unassigned kept in source order");
  if (selectBatch(audit,ledger,1).selected[0].submittedName !== "Museum B")
    throw Error("Small batches must resume existing assignments");
  if (selectBatch(audit,ledger,2).selected.length !== 2)
    throw Error("Batch selector exceeds limit");
  rows[3].parseIssues = ["ambiguous"];
  if (selectBatch(audit,ledger,3).selected.some((r)=>r.submittedName==="Museum D"))
    throw Error("Ambiguous provisional museum must not be automatically assigned");
  if (!terminal.has("guide-merged")) throw Error("Missing terminal museum state");
  console.log("Museum owner queue self-test PASSED");
}
if (process.argv.includes("--self-test")) {
  assertTests();
} else {
  const audit = JSON.parse(execFileSync(process.execPath, ["scripts/data/audit-owner-museum-inventory.mjs"], {
    encoding:"utf8", maxBuffer:32 * 1024 * 1024,
  }));
  const ledger = JSON.parse(readFileSync(ledgerPath,"utf8"));
  // Record a researched candidate's disposition explicitly before moving on.
  // These statuses are administrative research outcomes, NOT editorial certificates.
  const resolveKey = process.argv.find((arg) => arg.startsWith("--resolve="))?.slice(10);
  if (resolveKey) {
    const status = process.argv.find((arg) => arg.startsWith("--status="))?.slice(9);
    const evidence = process.argv.find((arg) => arg.startsWith("--evidence="))?.slice(11);
    const reason = process.argv.find((arg) => arg.startsWith("--reason="))?.slice(9);
    const allowed = new Set(["guide-merged", "duplicate", "out-of-state", "closed", "not-visitable", "research-blocked", "photo-permission-blocked"]);
    if (!allowed.has(status)) throw Error("Dispositions must be researched outcomes; editorial certification is a separate human-reviewed process");
    if (!/^https:\/\/\S+$/.test(evidence || "")) throw Error("A source or merged-PR evidence URL is required for each disposition");
    if (!reason || reason.trim().length < 12) throw Error("A specific 12+ character disposition reason is required");
    if (status === "guide-merged" && !/^https:\/\/github\.com\/keeptxred\/TexasDefined\/pull\/\d+$/.test(evidence))
      throw Error("Guide-merged requires evidence pointing to a TexasDefined GitHub pull request (confirm it is actually merged before use)");
    if (!(audit.uniqueRows || []).some((row) => keyFor(row) === resolveKey))
      throw Error("Resolution key does not exist in the owner-supplied museum inventory audit");
    const execution = ledger.ownerInventoryExecution;
    if (execution?.records?.[resolveKey]?.status !== "assigned")
      throw Error("Only currently assigned candidate records may be dispositioned");
    const lock = ledgerPath + ".lock";
    let fd;
    try {
      fd = openSync(lock,"wx");
      execution.records[resolveKey] = {
        ...execution.records[resolveKey], status, evidence, reason,
        dispositionAt:new Date().toISOString(), editorialCertified:false,
      };
      const temporary = ledgerPath + ".next.tmp";
      writeFileSync(temporary,JSON.stringify(ledger,null,2)+"\\n",{flag:"wx"});
      renameSync(temporary,ledgerPath);
    } finally {
      if (fd !== undefined) { closeSync(fd); unlinkSync(lock); }
    }
    console.log(JSON.stringify({checkpoint:ledgerPath, resolvedKey:resolveKey, status, evidence, editorialCertified:false},null,2));
    process.exit(0);
  }
  const plan = selectBatch(audit,ledger,size);
  if (process.argv.includes("--assign")) {
    if (plan.selected.length === 0) throw Error("No eligible museum candidates remain for automatic research assignment");
    // Same-machine mutex only. Cross-chat safety still requires merging the
    // resulting checkpoint and checking current main before further assignment.
    const lock = ledgerPath + ".lock";
    let fd;
    try {
      fd = openSync(lock,"wx");
      const execution = ledger.ownerInventoryExecution || {schemaVersion:1, records:{}};
      execution.schemaVersion = 1;
      execution.records ||= {};
      const now = new Date().toISOString();
      for (const row of plan.selected) {
        const key = keyFor(row);
        if (!execution.records[key]) execution.records[key] = {
          submittedName:row.submittedName, rawOccurrence:row.rawOccurrence,
          status:"assigned", assignedAt:now, note:"Unverified research candidate; NOT publication approved",
        };
      }
      execution.lastAssignmentAt = now;
      execution.lastAssignmentCount = plan.selected.length;
      ledger.ownerInventoryExecution = execution;
      const temporary = ledgerPath + ".next.tmp";
      writeFileSync(temporary,JSON.stringify(ledger,null,2)+"\n",{flag:"wx"});
      renameSync(temporary,ledgerPath);
    } finally {
      if (fd !== undefined) { closeSync(fd); unlinkSync(lock); }
    }
  }
  console.log(JSON.stringify({
    ...plan,
    selected:plan.selected.map((row)=>({
      rawOccurrence:row.rawOccurrence,
      submittedName:row.submittedName,
      task:row.status,
      checkpointKey:keyFor(row),
      alreadyAssigned:ledger.ownerInventoryExecution?.records?.[keyFor(row)]?.status === "assigned",
    })),
    checkpoint:ledgerPath,
    mutated:process.argv.includes("--assign"),
  },null,2));
}
