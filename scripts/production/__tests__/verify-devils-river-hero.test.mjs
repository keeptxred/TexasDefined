import test from "node:test";
import assert from "node:assert/strict";
import {inspectDevilsRiverHtml, isVerifiedProxyFallbackForCommons429} from "../verify-devils-river-hero.mjs";

function page(override=""){
 return '<html><head><link rel="canonical" href="https://texasdefined.com/destination/devils-river-state-natural-area"/></head>'+
 '<body><h1>Devils River State Natural Area</h1><a href="/county/val-verde">Val Verde County</a>'+
 '<a href="https://tpwd.texas.gov/state-parks/devils-river">TPWD</a>'+
 '<div>Photography: Clinton &amp; Charles Robertson <a href="https://commons.wikimedia.org/wiki/File:Devils_River_-_Dolan_Falls_(174119624).jpg">Original</a>'+
 '<a href="https://creativecommons.org/licenses/by-sa/2.0/">License</a></div>'+
 (override||'<img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Devils_River_-_Dolan_Falls_%28174119624%29.jpg" alt="Dolan Falls along the Devils River, not an advertised public trailhead"/>')+
 '</body></html>';
}
test("true landscape photo with exact original and legal terms passes",()=>assert.equal(inspectDevilsRiverHtml(page()).photoCredit,true));
test("server-side image proxy qualifies only for the exact same verified Wikimedia original",()=>{
 const official="https://upload.wikimedia.org/wikipedia/commons/b/b1/Devils_River_-_Dolan_Falls_%28174119624%29.jpg";
 const proxy="/media/remote?url="+encodeURIComponent(official);
 const pageHtml=page().replace(official,proxy);
 assert.equal(inspectDevilsRiverHtml(pageHtml).heroSrc,proxy);
 assert.throws(()=>inspectDevilsRiverHtml(pageHtml.replace(proxy,proxy+"&another=1")));
});
test("legacy millipede hero cannot pass exact-site photo gate",()=>assert.throws(()=>inspectDevilsRiverHtml(page('<img src="/images/explore/lakes-rivers/devils-river-state-natural-area.jpg" alt="Devils River"/>'))));
test("lost source attribution fails",()=>assert.throws(()=>inspectDevilsRiverHtml(page().replace("Clinton &amp; Charles Robertson","Other photographer"))));
test("missing CC BY-SA license link fails",()=>assert.throws(()=>inspectDevilsRiverHtml(page().replace("https://creativecommons.org/licenses/by-sa/2.0/","https://example.org/no-license"))));
test("falls photo cannot imply open public trailhead",()=>assert.throws(()=>inspectDevilsRiverHtml(page().replace("not an advertised public trailhead","public unreserved walk-in trailhead"))));

test("Wikimedia 429 is advisory only with two identical properly attributed on-site JPEG deliveries", () => {
 const official="https://upload.wikimedia.org/wikipedia/commons/b/b1/Devils_River_-_Dolan_Falls_%28174119624%29.jpg";
 const proxy="/media/remote?url="+encodeURIComponent(official);
 const digest="a".repeat(64);
 const origins=["https://texasdefined-site.freddy-coppola.workers.dev","https://texasdefined.com"];
 const good=origins.map(origin=>({
   origin,heroSrc:proxy,photoCredit:true,proxiedImageStatus:200,proxiedMime:"image/jpeg",
   proxiedBytes:98330,width:800,height:415,proxiedSha256:digest,
 }));
 assert.equal(isVerifiedProxyFallbackForCommons429(new Error("Photo URL HTTP 429"),good),true);
 assert.equal(isVerifiedProxyFallbackForCommons429(new Error("Photo URL HTTP 404"),good),false);
 assert.equal(isVerifiedProxyFallbackForCommons429(new Error("Photo URL HTTP 500"),good),false);
 assert.equal(isVerifiedProxyFallbackForCommons429(new Error("Photo URL HTTP 429"),good.slice(0,1)),false);
 assert.equal(isVerifiedProxyFallbackForCommons429(new Error("Photo URL HTTP 429"),[...good.slice(0,1),{...good[1],proxiedSha256:"b".repeat(64)}]),false);
 assert.equal(isVerifiedProxyFallbackForCommons429(new Error("Photo URL HTTP 429"),[...good.slice(0,1),{...good[1],proxiedImageStatus:429}]),false);
 assert.equal(isVerifiedProxyFallbackForCommons429(new Error("Photo URL HTTP 429"),[...good.slice(0,1),{...good[1],heroSrc:"/media/remote?url=https%3A%2F%2Fexample.com"}]),false);
 assert.equal(isVerifiedProxyFallbackForCommons429(new Error("Photo URL HTTP 429"),[...good.slice(0,1),{...good[1],photoCredit:false}]),false);
 assert.equal(isVerifiedProxyFallbackForCommons429(new Error("Photo URL HTTP 429"),[...good.slice(0,1),{...good[1],width:801}]),false);
});
