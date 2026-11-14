import assert from "node:assert/strict";
import test from "node:test";
import { triageAttractionCandidate } from "../attraction-triage.ts";
import type { ViatorAttractionCandidate } from "../../../lib/viator-attraction-discovery.ts";

const candidate:ViatorAttractionCandidate={
 provider:"viator",providerId:"1000",market:"san-antonio",
 name:"The Alamo",status:"needs-independent-source-review",productCount:10,
};

test("existing Texas authority page is suggested but never automatically claimed",()=>{
 const result=triageAttractionCandidate(candidate);
 assert.equal(result.possibleExistingSlug,"the-alamo");
 assert.equal(result.disposition,"review-existing-guide");
 assert.equal(result.eligibleForAutoPublication,false);
 assert.ok(result.requiredEvidence.includes("official-operator-identity"));
});
test("unseen Viator attraction requires independent research before publication",()=>{
 const result=triageAttractionCandidate({...candidate,providerId:"1001",name:"Unverified Venue Name"});
 assert.equal(result.possibleExistingSlug,undefined);
 assert.equal(result.disposition,"research-new-or-alias");
 assert.equal(result.eligibleForAutoPublication,false);
});
