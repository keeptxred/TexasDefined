import test from "node:test";
import assert from "node:assert/strict";
import { verifyDirectoryHtml, verifyBattlefieldHtml, verifyAmistadHtml } from "../verify-nps-park-production.mjs";

const codes=["alfl","amis","bibe","bith","blsc","buov","cham","elte","elca","foda","gumo","lamr","lyjo","pais","paal","rigr","saan","waco"];
const directory=(links=codes.map(code=>'<a href="https://www.nps.gov/'+code+'/">Site</a>').join("")) =>
 '<html><body><section id="complete-texas-nps-inventory"><h2>All 18 National Park Service designations</h2>'+links+'<a href="/destination/palo-alto-battlefield-national-historical-park">TexasDefined guide</a><a href="/destination/amistad-national-recreation-area">TexasDefined guide</a></section></body></html>';
const battlefield='<html><img src="https://www.nps.gov/common/uploads/structured_data/3C792376-1DD8-B71B-0BFE87475AD26DCA.jpg" alt="Blue Mexican eight-pound field gun"><p>Palo Alto Battlefield National Historical Park · National Park Service</p></html>';

test("exact real federal NPS official links in one SSR section pass",()=>{
 assert.equal(verifyDirectoryHtml(directory()).uniqueFederalLinks,18);
});
test("missing federal unit and duplicate code are caught, even if string appears in JS",()=>{
 assert.throws(()=>verifyDirectoryHtml(directory(codes.slice(1).map(c=>'<a href="https://www.nps.gov/'+c+'/">Site</a>').join(""))+"<script>https://www.nps.gov/alfl/</script>"));
 assert.throws(()=>verifyDirectoryHtml(directory(codes.map(c=>'<a href="https://www.nps.gov/'+(c==="alfl"?"bibe":c)+'/">Site</a>').join(""))));
});
test("no rendered inventory, two inventories, or missing Amistad link fail",()=>{
 assert.throws(()=>verifyDirectoryHtml('<html><p>2 places mapped</p></html>'));
 assert.throws(()=>verifyDirectoryHtml(directory()+directory()));
 assert.throws(()=>verifyDirectoryHtml(directory().replace('<a href="/destination/amistad-national-recreation-area">TexasDefined guide</a>','')));
});
test("field-gun NPS credited Palo Alto source and subject must be in HTML",()=>{
 assert.ok(verifyBattlefieldHtml(battlefield).credited);
 assert.throws(()=>verifyBattlefieldHtml(battlefield.replace('3C792376-1DD8-B71B-0BFE87475AD26DCA.jpg','broken.jpg')));
 assert.throws(()=>verifyBattlefieldHtml(battlefield.replace('Blue Mexican eight-pound field gun','photo unavailable')));
});

const amistad='<html><h1>Amistad National Recreation Area</h1><a href="https://www.nps.gov/amis/">Official NPS</a><img alt="Amistad National Recreation Area in Texas" src="/images/explore/lakes-rivers/amistad-national-recreation-area.jpg"><p>National Park Service Digital Image Archives · Public domain · Lake Use Pass required for registered vessels</p></html>';
test("the 18th Texas NPS guide has distinct source, licensing, photograph and boat-permit facts",()=>{
 assert.equal(verifyAmistadHtml(amistad).officialSource,"nps.gov/amis");
 for(const missing of ["Amistad National Recreation Area</h1>","www.nps.gov/amis/","/images/explore/lakes-rivers/amistad-national-recreation-area.jpg","Public domain","Lake Use Pass"]){
   assert.throws(()=>verifyAmistadHtml(amistad.replace(missing,"removed")),/missing|not linked/i);
 }
});
