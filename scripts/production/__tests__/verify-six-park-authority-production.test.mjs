import test from "node:test";
import assert from "node:assert/strict";
import { inspectParkHtml } from "../verify-six-park-authority-production.mjs";
const site={slug:"fort-boggy-state-park",county:"leon",words:["Lake Trail","January 17","November 15"],source:"fort-boggy"};
function sample(text="Lake Trail closure November 15 January 17"){
 return '<html><head><link rel="canonical" href="https://texasdefined.com/destination/fort-boggy-state-park"></head><body><h1>Fort Boggy State Park</h1><img alt="Fort Boggy State Park" src="/images/state-parks/fort-boggy-state-park.jpg"><p>Photography: Mike · CC BY-SA</p><a href="/county/leon">Leon County</a><a href="https://tpwd.texas.gov/state-parks/fort-boggy/alert">Official TPWD</a><article>'+text+'</article></body></html>';
}
test("signed-off route with visible restrictions, county, hero attribution and source passes",()=>{
 assert.equal(inspectParkHtml(sample(),site).verifiedVisitorFacts,3);
});
test("missing or masked restrictions are not accepted",()=>{
 assert.throws(()=>inspectParkHtml(sample("No actual closure details"),site),/fact.*missing|restriction missing/);
 assert.throws(()=>inspectParkHtml(sample("No closures")+"<script>Lake Trail January 17 November 15</script>",site),/restriction missing/);
});
test("location, official link, image and canonical checks are independent",()=>{
 assert.throws(()=>inspectParkHtml(sample().replace('href="/county/leon"','href="/county/harris"'),site),/County crosslink/);
 assert.throws(()=>inspectParkHtml(sample().replace("tpwd.texas.gov/state-parks/fort-boggy","other.example/park"),site),/Official park link/);
 assert.throws(()=>inspectParkHtml(sample().replace("Photography: Mike · CC BY-SA",""),site),/attribution/);
 assert.throws(()=>inspectParkHtml(sample().replace('https://texasdefined.com/destination/fort-boggy-state-park','https://texasdefined.com/other'),site),/canonical/);
});

test("exact site hero, not an unrelated or script-only JPEG, is required",()=>{
 assert.throws(()=>inspectParkHtml(sample().replace("/images/state-parks/fort-boggy-state-park.jpg","/images/state-parks/another-park.jpg"),site),/Approved park-specific photo/);
 assert.throws(()=>inspectParkHtml(sample().replace('alt="Fort Boggy State Park"','alt=""'),site),/Approved park-specific photo/);
 assert.throws(()=>inspectParkHtml(sample().replace('<img alt="Fort Boggy State Park" src="/images/state-parks/fort-boggy-state-park.jpg">','<script>"/images/state-parks/fort-boggy-state-park.jpg"</script><img alt="Elsewhere" src="/other.jpg">'),site),/Approved park-specific photo/);
});

test("only specifically approved Lakes/Rivers or Coast park photos can stand in for the state-park image",()=>{
 const guadalupe={slug:"guadalupe-river-state-park",county:"comal",words:["charcoal","November 20","January 11"],source:"guadalupe-river"};
 const base='<html><head><link rel="canonical" href="https://texasdefined.com/destination/guadalupe-river-state-park"></head><body><h1>Guadalupe River State Park</h1><img alt="Guadalupe River State Park in Texas" src="/images/explore/lakes-rivers/guadalupe-river-state-park.jpg"><p>Photography: Larry D. Moore · CC BY 4.0</p><a href="/county/comal">Comal County</a><a href="https://tpwd.texas.gov/state-parks/guadalupe-river/alert">Official source</a><article>Charcoal fire ban, November 20 and January 11 hunt closures.</article></body></html>';
 const verified=inspectParkHtml(base,guadalupe);
 assert.equal(verified.heroPath,"/images/explore/lakes-rivers/guadalupe-river-state-park.jpg");
 assert.throws(()=>inspectParkHtml(base.replaceAll("/images/explore/lakes-rivers/guadalupe-river-state-park.jpg","/images/explore/lakes-rivers/other-park.jpg"),guadalupe),/Approved park-specific photo/);
 const coast={slug:"galveston-island-state-park",county:"galveston",words:["71","95","boardwalk"],source:"galveston-island"};
 const coastal=base.replaceAll("Guadalupe River State Park","Galveston Island State Park").replaceAll("guadalupe-river-state-park","galveston-island-state-park").replaceAll("/county/comal","/county/galveston").replaceAll("guadalupe-river/alert","galveston-island/alert").replaceAll("Charcoal fire ban, November 20 and January 11 hunt closures.","Boardwalk closure and drinking fountains 71 through 95").replaceAll("/images/explore/lakes-rivers/galveston-island-state-park.jpg","/images/explore/beaches-coast/galveston-island-state-park.jpg");
 assert.equal(inspectParkHtml(coastal,coast).heroPath,"/images/explore/beaches-coast/galveston-island-state-park.jpg");
});
