import test from "node:test";
import assert from "node:assert/strict";
import {inspectDevilsRiverHtml} from "../verify-devils-river-hero.mjs";

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
test("legacy millipede hero cannot pass exact-site photo gate",()=>assert.throws(()=>inspectDevilsRiverHtml(page('<img src="/images/explore/lakes-rivers/devils-river-state-natural-area.jpg" alt="Devils River"/>'))));
test("lost source attribution fails",()=>assert.throws(()=>inspectDevilsRiverHtml(page().replace("Clinton &amp; Charles Robertson","Other photographer"))));
test("missing CC BY-SA license link fails",()=>assert.throws(()=>inspectDevilsRiverHtml(page().replace("https://creativecommons.org/licenses/by-sa/2.0/","https://example.org/no-license"))));
test("falls photo cannot imply open public trailhead",()=>assert.throws(()=>inspectDevilsRiverHtml(page().replace("not an advertised public trailhead","public unreserved walk-in trailhead"))));
