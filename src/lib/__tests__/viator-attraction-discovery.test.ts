import assert from "node:assert/strict";
import test from "node:test";
import { attractionDiscoveryRequestBody, viatorAttractionCandidates } from "../viator-attraction-discovery.ts";

test("searches reviewed Viator destinations only, with a bounded page", () => {
  assert.deepEqual(attractionDiscoveryRequestBody("houston"), {
    destinationId: 5186, sorting: {sort:"DEFAULT"}, pagination:{start:1,count:12},
  });
  assert.throws(() => attractionDiscoveryRequestBody("random-county"));
});

test("candidate feed excludes all proprietary editorial text, scores, photos and hours", () => {
  const records = viatorAttractionCandidates({
    attractions: [
      { attractionId:123, name:"Museum of Texas Heritage", productCount:4,
        introduction:"Viator marketing copy", overview:"Protected long text",
        images:[{url:"https://example.org/photo"}], reviews:[{text:"Protected user review"}],
        openingHours:"Any time", address:{street:"Some street"}},
      { attractionId:123, name:"Duplicate Museum" },
      { attractionId:"456", name:"Historic Texas Square", productCount:0 },
      { attractionId:"not-id", name:"Bad ID" },
    ],
  }, "houston");
  assert.equal(records.length,2);
  assert.deepEqual(records[0], {
    provider:"viator",providerId:"123",name:"Museum of Texas Heritage",market:"houston",
    status:"needs-independent-source-review",productCount:4,
  });
  assert.ok(!("overview" in records[0]));
  assert.ok(!("address" in records[0]));
  assert.ok(!("reviews" in records[0]));
  assert.throws(()=>viatorAttractionCandidates({}, "houston"));
});
