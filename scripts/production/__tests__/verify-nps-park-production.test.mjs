import test from "node:test";
import assert from "node:assert/strict";
import sharp from "sharp";
import { verifyDirectoryHtml, verifyBattlefieldHtml, verifyChamizalHtml, extractChamizalImageUrls, verifyDecodableImageBytes } from "../verify-nps-park-production.mjs";

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


const photoHtml = [
 '<html><main>',
 '<figure class="main-hero"><img src="https://commons.wikimedia.org/wiki/Special:Redirect/file/Mural%20and%20Cultural%20Center.jpg%20%28d3498183-87fe-4a4f-854a-b1d4e2f5e815%29.jpg" alt="Chamizal National Memorial Cultural Center with the Nuestra Herencia mural" fetchPriority="high"></figure>',
 '<section aria-labelledby="destination-photo-archive"><h2>Documentary photographs</h2>',
 '<img src="/images/explore/historic-sites/chamizal-national-memorial.jpg" alt="Historical boundary marker at Chamizal National Memorial">',
 '</section></main></html>',
].join("");
test("Chamizal hero and actual archive image are extracted from SSR image elements",()=>{
 const result=extractChamizalImageUrls(photoHtml,"https://texasdefined.com");
 assert.equal(result.galleryUrls.length,1);
 assert.ok(result.heroUrl.includes("Mural%20and%20Cultural"));
 assert.equal(result.galleryUrls[0],"https://texasdefined.com/images/explore/historic-sites/chamizal-national-memorial.jpg");
});
test("Chamizal fails closed on absent hero, empty archive, duplicate hero/gallery and unsafe image URL",()=>{
 const base="https://texasdefined.com";
 assert.throws(()=>extractChamizalImageUrls(photoHtml.replace('fetchPriority="high"','loading="lazy"'),base),/priority hero/);
 assert.throws(()=>extractChamizalImageUrls(photoHtml.replace('src="/images/explore/historic-sites/chamizal-national-memorial.jpg"',''),base),/missing an image src/);
 assert.throws(()=>extractChamizalImageUrls(photoHtml.replace('src="/images/explore/historic-sites/chamizal-national-memorial.jpg"','src="javascript:alert(1)"'),base),/insecure origin/);
 assert.throws(()=>extractChamizalImageUrls(photoHtml.replace('src="/images/explore/historic-sites/chamizal-national-memorial.jpg"','src="https://commons.wikimedia.org/wiki/Special:Redirect/file/Mural%20and%20Cultural%20Center.jpg%20%28d3498183-87fe-4a4f-854a-b1d4e2f5e815%29.jpg"'),base),/reuse the same image/);
});
test("Chamizal image verifier decodes actual JPEG pixels rather than trusting status and headers",async()=>{
 const bytes=await sharp({create:{width:1000,height:650,channels:3,background:{r:80,g:125,b:150}}}).jpeg().toBuffer();
 const report=await verifyDecodableImageBytes(bytes,"image/jpeg");
 assert.equal(report.decoded,true);
 assert.equal(report.width,1000);
 assert.equal(report.height,650);
 await assert.rejects(()=>verifyDecodableImageBytes(Buffer.alloc(1500,65),"image/jpeg"));
 await assert.rejects(()=>verifyDecodableImageBytes(bytes,"text/html"));
 await assert.rejects(()=>verifyDecodableImageBytes(bytes,"image/png"),/format\/dimensions/);
 const tooSmall=await sharp({create:{width:100,height:100,channels:3,background:"red"}}).jpeg().toBuffer();
 await assert.rejects(()=>verifyDecodableImageBytes(tooSmall,"image/jpeg"));
});
