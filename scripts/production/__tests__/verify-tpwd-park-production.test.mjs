import test from "node:test";
import assert from "node:assert/strict";
import { verifyParkPage } from "../verify-tpwd-park-production.mjs";

const park={slug:"abilene-state-park",title:"Abilene State Park",county:"Taylor",source:"abilene",terms:["Lake Abilene boat ramps","pellet fires","swimming pool"]};
const working = '<html><body><h1>Abilene State Park</h1><a href="/county/taylor">Taylor County</a>'
 + '<section><h2 id="why-go">Visiting Abilene</h2><p>Lake Abilene boat ramps close during low water. Wood and pellet fires are banned. The swimming pool is under renovation.</p></section>'
 + '<section><h2 id="state-park-essentials">Park entrances and facilities</h2><a href="https://tpwd.texas.gov/state-parks/abilene/alert">TPWD</a></section><p>Photography: Artist Name · CC BY-SA</p></body></html>';

test("fully rendered evidence in SSR destination body qualifies",()=>{
 assert.equal(verifyParkPage(working,park).slug,park.slug);
});
test("site-only HTTP response or single generic source link cannot pass",()=>{
 assert.throws(()=>verifyParkPage("<html><h1>Abilene State Park</h1></html>",park));
 assert.throws(()=>verifyParkPage(working.replace('id="state-park-essentials"','id="generic"'),park));
 assert.throws(()=>verifyParkPage(working.replace('href="/county/taylor"','href="/nowhere"'),park));
});
test("alert terms only in serialized hydration scripts do not count as rendered",()=>{
 const missing=working.replace("Wood and pellet fires","Wood and fires");
 assert.throws(()=>verifyParkPage(missing+"<script>Wood and pellet fires</script>",park));
});
test("unsafe missing-photo placeholder fails the park acceptance gate",()=>{
 assert.throws(()=>verifyParkPage(working+"<p>Photo unavailable</p>",park));
});
test("official park link must identify correct TPWD path",()=>{
 assert.throws(()=>verifyParkPage(working.replace("tpwd.texas.gov/state-parks/abilene","tpwd.texas.gov/state-parks/another-park"),park));
});
