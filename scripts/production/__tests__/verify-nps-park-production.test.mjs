import test from "node:test";
import assert from "node:assert/strict";
import { verifyDirectoryHtml, verifyBattlefieldHtml, verifyChamizalHtml } from "../verify-nps-park-production.mjs";

const codes=["alfl","amis","bibe","bith","blsc","buov","cham","elte","elca","foda","gumo","lamr","lyjo","pais","paal","rigr","saan","waco"];
const directory=(links=codes.map(code=>'<a href="https://www.nps.gov/'+code+'/">Site</a>').join("")) =>
 '<html><body><section id="complete-texas-nps-inventory"><h2>All 18 National Park Service designations</h2>'+links+'<a href="/destination/palo-alto-battlefield-national-historical-park">TexasDefined guide</a></section></body></html>';
const battlefield='<html><img src="https://www.nps.gov/common/uploads/structured_data/3C792376-1DD8-B71B-0BFE87475AD26DCA.jpg" alt="Blue Mexican eight-pound field gun"><p>Palo Alto Battlefield National Historical Park · National Park Service</p></html>';

test("exact real federal NPS official links in one SSR section pass",()=>{
 assert.equal(verifyDirectoryHtml(directory()).uniqueFederalLinks,18);
});
test("missing federal unit and duplicate code are caught, even if string appears in JS",()=>{
 assert.throws(()=>verifyDirectoryHtml(directory(codes.slice(1).map(c=>'<a href="https://www.nps.gov/'+c+'/">Site</a>').join(""))+"<script>https://www.nps.gov/alfl/</script>"));
 assert.throws(()=>verifyDirectoryHtml(directory(codes.map(c=>'<a href="https://www.nps.gov/'+(c==="alfl"?"bibe":c)+'/">Site</a>').join(""))));
});
test("no rendered inventory, two inventories, or invented Amistad link fail",()=>{
 assert.throws(()=>verifyDirectoryHtml('<html><p>2 places mapped</p></html>'));
 assert.throws(()=>verifyDirectoryHtml(directory()+directory()));
 assert.throws(()=>verifyDirectoryHtml(directory().replace('TexasDefined guide','<a href="/destination/amistad-national-recreation-area">TexasDefined guide</a>')));
});
test("field-gun NPS credited Palo Alto source and subject must be in HTML",()=>{
 assert.ok(verifyBattlefieldHtml(battlefield).credited);
 assert.throws(()=>verifyBattlefieldHtml(battlefield.replace('3C792376-1DD8-B71B-0BFE87475AD26DCA.jpg','broken.jpg')));
 assert.throws(()=>verifyBattlefieldHtml(battlefield.replace('Blue Mexican eight-pound field gun','photo unavailable')));
});

const chamizal = [
 "Chamizal National Memorial", "John F. Kennedy", "January 14, 1964",
 "1968", "About 5,000 El Paso residents", "Nuestra Herencia",
 "Tuesday–Saturday", "free", "Magoffin Home",
 "National Park Service · Public domain", "Documentary photographs",
].join(" ");
test("Chamizal public guide acceptance recognizes researched visitor content",()=>{
 assert.equal(verifyChamizalHtml(chamizal).checked,11);
 for(const gone of ["John F. Kennedy", "January 14, 1964", "Nuestra Herencia", "Public domain"])
  assert.throws(()=>verifyChamizalHtml(chamizal.replace(gone,"")),gone);
});
test("Chamizal production probe rejects outdated generic sections",()=>{
 for(const old of ["Chamizal National Memorial occupies a significant landscape within El Paso, commemorating",
 "Tours and experiences near Chamizal National Memorial","First-time focused visit"])
  assert.throws(()=>verifyChamizalHtml(chamizal+" "+old));
});
