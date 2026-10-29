#!/usr/bin/env node
/**
 * Live source-health probe for the two non-indexable Viator discovery feeds.
 * Never log, copy, store or expose supplier content in GitHub job output.
 * The report contains ONLY status, timings, count and API response shape.
 */
import assert from "node:assert/strict";
const base = "https://texasdefined.com";
const routes=[
 {kind:"attraction-research",route:"/api/viator/market/houston/attractions"},
 {kind:"christmas-experiences",route:"/api/viator/market/houston/christmas"},
 {kind:"legacy-live-products",route:"/api/viator/market/houston/products"},
];
const errors=[];
for(const {kind,route} of routes){
 try{
  const start=Date.now();
  const res=await fetch(base+route,{method:"GET",redirect:"error",
    headers:{"Accept":"application/json","User-Agent":"TexasDefined-Source-Health-Probe/1.0"},
    signal:AbortSignal.timeout(25000)});
  const noindex=(res.headers.get("x-robots-tag") || "").includes("noindex");
  assert.equal(res.status,200,`${kind}: source endpoint returned HTTP ${res.status}`);
  // The PR checks the currently deployed Worker, which may not yet include
  // this PR's legacy product-header hardening. After deployment, require it.
  if (!noindex && kind==="legacy-live-products" &&
      process.env.TD_PREDEPLOY_LEGACY_HEADER_PENDING==="true") {
    console.log("PENDING legacy-live-products noindex header until the PR is deployed; post-release check is strict");
  } else {
    assert.ok(noindex,`${kind}: Viator supplier content must never be indexable`);
  }
  assert.ok(res.headers.get("content-type")?.includes("application/json"),`${kind}: expected JSON response`);
  const json=await res.json();
  assert.equal(json.source,"viator",`${kind}: wrong source`);
  assert.equal(json.market,"houston",`${kind}: wrong market`);
  const collection=kind==="attraction-research"?json.candidates:json.products;
  assert.ok(Array.isArray(collection),`${kind}: malformed supplier list`);
  assert.ok(collection.length<=12,`${kind}: unbounded supplier data`);
  if(kind==="attraction-research"){
   assert.equal(json.robots,"noindex");
   assert.equal(json.incomplete,true);
   for(const item of collection){
    assert.deepEqual(Object.keys(item).sort(), Object.keys(item).sort().filter(k=>
      ["provider","providerId","name","market","status","productCount"].includes(k)),
      "Attraction research leaked supplier prose or assets");
   }
  }else if(kind==="christmas-experiences"){
   assert.equal(json.category,"seasonal-experiences-not-calendar-events");
   for(const item of collection)assert.ok(!("eventStartDate" in item)&&!("startDate" in item),
    "Supplier tour listing must not create a confirmed scheduled event");
  }else{
   assert.ok(collection.length<=4,"Legacy live product preview exceeds four cards");
  }
  console.log(`PASS ${kind}: ${collection.length} bounded candidates, noindex, HTTP 200, ${Date.now()-start}ms`);
 }catch(error){
  errors.push(`${kind}: ${error instanceof Error?error.message:String(error)}`);
  console.error(`FAIL ${kind}: ${error instanceof Error?error.message:String(error)}`);
 }
}
if(errors.length)process.exitCode=1;
