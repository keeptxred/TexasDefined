/** Bounded, source-specific live verification of the Nacogdoches–San Augustine heritage release.
 * Verifies production, not search engine indexing/ranking. Never rewrites primary-source photo rights.
 */
const ORIGIN = "https://texasdefined.com";
const DEPLOY_SHA = process.env.PRODUCTION_COMMIT_SHA || "live";
const AGENT = "TexasDefined-Nacogdoches-San-Augustine-ProductionVerifier/1.0";
const destinations = [
  ["sterne-hoya-house-museum", "Sterne-Hoya"],
  ["ruby-m-mize-azalea-garden", "Ruby"],
  ["san-augustine-county-courthouse", "San Augustine"],
  ["san-augustine", "San Augustine"],
  ["angelina-national-forest", "Angelina"],
  ["stephen-f-austin-experimental-forest", "Experimental Forest"],
  ["aldridge-sawmill-ruins", "Aldridge"],
  ["nacogdoches-downtown-historic-district", "Nacogdoches"],
  ["zion-hill-historic-district-nacogdoches", "Zion Hill"],
  ["zion-hill-baptist-church-nacogdoches", "Zion Hill"],
];
const articles = [["nacogdoches-san-augustine-historic-road-trip", "Nacogdoches"]];
const errors = [], warnings = [], confirmed = [];
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
function decode(v="") { return v.replaceAll("&amp;","&").replaceAll("&quot;",'"').replaceAll("&#39;","'"); }
function tags(html, tag) { return html.match(new RegExp("<"+tag+"\\b[^>]*>", "gi")) || []; }
function attribute(tag, key) { return new RegExp("\\b"+key+"\\s*=\\s*[\"']([^\"']*)[\"']","i").exec(tag)?.[1] || ""; }
function metadata(html, key, attr="property") {
  for(const tag of tags(html,"meta")) if(attribute(tag,attr).toLowerCase()===key.toLowerCase()) return decode(attribute(tag,"content"));
  return "";
}
async function load(url, options={}) {
  let last;
  for(let attempt=1;attempt<=2;attempt++){
    try {
      const response=await fetch(url,{headers:{"user-agent":AGENT,...(options.headers||{})},redirect:"follow",signal:AbortSignal.timeout(22000),...options});
      if(response.status>=500 && attempt===1) {last=new Error("HTTP "+response.status);await sleep(900);continue}
      return response;
    } catch(e){last=e;if(attempt===1)await sleep(900)}
  }
  throw last;
}
function imageSize(bytes, mime) {
  if(mime==="image/png"&&bytes.length>=24&&bytes[0]===137) {
    const read=n=>((bytes[n]<<24)>>>0)+(bytes[n+1]<<16)+(bytes[n+2]<<8)+bytes[n+3];
    return [read(16),read(20)];
  }
  if(mime==="image/jpeg"&&bytes[0]===255&&bytes[1]===216){
    let o=2;
    const marks=new Set([192,193,194,195,197,198,199,201,202,203,205,206,207]);
    while(o+9<bytes.length){
      if(bytes[o]!==255){o++;continue}
      const marker=bytes[o+1],len=bytes[o+2]*256+bytes[o+3];
      if(marks.has(marker))return [bytes[o+7]*256+bytes[o+8],bytes[o+5]*256+bytes[o+6]];
      if(len<2)break;o+=2+len;
    }
  }
  return [0,0];
}
async function verify(path,label,sitemap,primarySitemap){
  const url=ORIGIN+path;
  try{
    // Destinations belong to Explore; locally authored articles belong to the
    // primary article sitemap. The static evergreen sitemap is a curated subset,
    // not an exhaustive article index. Do not warn about correct primary ownership.
    const articlePath = path.startsWith("/article/");
    const requiredSitemap = articlePath ? primarySitemap : sitemap;
    const sitemapName = articlePath ? "primary" : "Explore";
    if (!requiredSitemap.includes("<loc>"+url+"</loc>")) {
      throw Error("missing exact canonical URL from required "+sitemapName+" XML sitemap");
    }
    const cacheBusted=new URL(url);cacheBusted.searchParams.set("heritage_verifier",DEPLOY_SHA);
    const response=await load(cacheBusted.href);
    if(response.status!==200)throw Error("HTTP "+response.status);
    const html=await response.text(),clean=decode(html);
    if(/This story is no longer available|Story unavailable|Page not found/i.test(clean))throw Error("unavailable fall-back page");
    if(!clean.toLowerCase().includes(label.toLowerCase()))throw Error("subject absent from HTML");
    const canonical=tags(html,"link").find(tag=>attribute(tag,"rel")==="canonical");
    if(!canonical||decode(attribute(canonical,"href"))!==url)throw Error("incorrect/missing canonical");
    const robots=metadata(html,"robots","name").toLowerCase();
    if(robots.includes("noindex")||robots.includes("nofollow"))throw Error("noindex/nofollow");
    const hero=metadata(html,"og:image"),heroAlt=metadata(html,"og:image:alt");
    if(!hero||!heroAlt)throw Error("missing descriptive preferred image metadata");
    const heroURL=new URL(hero,url);
    if(heroURL.protocol!=="https:")throw Error("non-HTTPS preferred image");
    const image=await load(heroURL.href);
    if(image.status!==200)throw Error("preferred image returned HTTP "+image.status);
    const mime=(image.headers.get("content-type")||"").split(";")[0].toLowerCase();
    if(!mime.startsWith("image/"))throw Error("preferred image is not an image: "+mime);
    const bytes=new Uint8Array(await image.arrayBuffer()),[width,height]=imageSize(bytes,mime);
    if(width&&width<1200)warnings.push(path+" has accurate image but only "+width+"px width; >=1200px recommended for Google Discover");
    if(!width)warnings.push(path+" image dimensions not independently recognized ("+mime+")");
    if(/placeholder|image-unavailable|photo-unavailable|favicon|logo/i.test(heroURL.pathname))throw Error("generic placeholder image");
    confirmed.push({path,imageWidth:width,imageHeight:height,heroStatus:image.status});
    console.log("PASS "+url+" canonical sitemap robots image="+image.status+" "+mime+" "+width+"x"+height);
  }catch(e){errors.push(path+": "+(e instanceof Error?e.message:String(e)));console.error("FAIL "+url+": "+(e instanceof Error?e.message:String(e)))}
}
async function sitemap(path){
  const r=await load(ORIGIN+path);
  if(r.status!==200)throw Error(path+" returned HTTP "+r.status);
  const body=await r.text();if(!body.includes("<urlset")&&!body.includes("<sitemapindex"))throw Error(path+" is not XML sitemap");
  return body;
}
let explore="",evergreen="",primary="";
try{[explore,evergreen,primary]=await Promise.all([sitemap("/sitemap-explore.xml"),sitemap("/sitemap-evergreen.xml"),sitemap("/sitemap.xml")])}
catch(e){console.error("FAIL scoped sitemap:",e);process.exit(1)}
for(const [slug,name] of destinations) await verify("/destination/"+slug,name,explore,primary);
for(const [slug,name] of articles) await verify("/article/"+slug,name,evergreen,primary);
async function sourceText(path) {
  const response=await load(ORIGIN+path);
  if(response.status!==200)throw Error("HTTP "+response.status+" "+path);
  return decode(await response.text());
}
try{
  const article=await sourceText("/article/nacogdoches-san-augustine-historic-road-trip");
  for(const slug of ["zion-hill-baptist-church-nacogdoches","stephen-f-austin-experimental-forest","mission-dolores","caddo-mounds-state-historic-site"]){
    if(!article.includes(slug))errors.push("Road trip missing link to "+slug);
  }
  const zion=await sourceText("/destination/zion-hill-baptist-church-nacogdoches");
  if(!zion.includes("zion-hill-historic-district-nacogdoches"))errors.push("Zion Hill church missing district reciprocal link");
  const forest=await sourceText("/destination/stephen-f-austin-experimental-forest");
  if(!forest.includes("srs-SFAEF_Trails.pdf")||!forest.includes("1.5-mile"))errors.push("SFA forest missing official trail-map distinction");
  if(!forest.includes("srs-sfaef-bridge.jpg"))errors.push("SFA forest missing verified exact-site USDA photograph");
} catch(e){errors.push("Cross-link/source verification failed: "+(e instanceof Error?e.message:String(e)))}
console.log(JSON.stringify({release:"nacogdoches-san-augustine",deploySha:DEPLOY_SHA,checked:destinations.length+articles.length,passed:confirmed.length,warnings,errors,checkedAt:new Date().toISOString()},null,2));
if(errors.length)process.exit(1);
