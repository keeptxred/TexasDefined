import test from "node:test";
import assert from "node:assert/strict";
import { parks,inspectParkHtml } from "../verify-tpwd-six-park-details.mjs";

function fixture(p){
 return '<html><head><script>outdated hidden data</script></head><body><h1>'+p.name+'</h1>'+
  '<a href="/county/'+p.county+'">County guide</a>'+
  '<a href="https://tpwd.texas.gov/state-parks/example">Official TPWD</a>'+
  '<img fetchpriority="high" src="/images/explore/state-parks/existing-photo.jpg" alt="'+p.name+' real park photography">'+
  '<p>Photography: Named artist CC BY 4.0</p><p>'+p.facts.join(". ")+'.</p>'+
  '<section>FAQ: '+p.faq+'</section></body></html>';
}
test("all six targeted park fixtures require real source FAQ county and photo",()=>{
 assert.equal(parks.length,6);
 for(const p of parks){const result=inspectParkHtml(fixture(p),p);assert.equal(result.slug,p.slug);assert.ok(result.imageSrc.includes(".jpg"));}
});
test("visible facts cannot be silently replaced by hydration script text",()=>{
 const p=parks[0];
 const html=fixture(p).replace(p.facts.join(". "),'Nothing applicable').replace('<script>','<script>'+p.facts.join(". "));
 assert.throws(()=>inspectParkHtml(html,p),/Missing current park rule/);
});
test("missing county and photo attribution fail independent acceptance",()=>{
 const p=parks[5];
 assert.throws(()=>inspectParkHtml(fixture(p).replace('/county/jasper','/county/harris'),p),/county internal link/);
 assert.throws(()=>inspectParkHtml(fixture(p).replace('Photography: Named artist CC BY 4.0',''),p),/Photograph source credit/);
});
test("wrong park slug's visible h1 fails",()=>{
 assert.throws(()=>inspectParkHtml(fixture(parks[1]),parks[0]),/Wrong or missing park H1/);
});
