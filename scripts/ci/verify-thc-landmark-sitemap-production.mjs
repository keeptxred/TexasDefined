#!/usr/bin/env node
/* Live sitemap contract for the individually researched THC landmark set.
 * Do not turn image-ineligible pages into sitemap entries by overriding safety gates:
 * repair their exact-location photo provenance instead. */
const origin = "https://texasdefined.com";
const landmarkSlugs = [
  "olivewood-cemetery", "castro-county-courthouse", "kokernot-field",
  "alpine-downtown-historic-district", "downtown-bryan-historic-district",
  "bailey-county-courthouse", "wimberley-downtown-square-historic-district",
  "sour-lake-downtown-historic-district", "southern-pacific-passenger-depot-del-rio",
  "clifton-whipple-truss-bridge", "regency-suspension-bridge",
  "bosque-river-bridge-meridian", "holland-hotel", "sycamore-creek-bridge-fort-worth",
];
const errors=[];
const load = async path => {
  const url=new URL(path,origin);
  url.searchParams.set("thc_prod_verify",process.env.PRODUCTION_COMMIT_SHA||"current");
  const response=await fetch(url,{headers:{"user-agent":"TexasDefined-THC-ProductionVerifier/1.0"},redirect:"follow",signal:AbortSignal.timeout(25000)});
  if(!response.ok)throw Error(path+" HTTP "+response.status);
  return response.text();
};
try {
  const xml=await load("/sitemap-explore.xml");
  if (!xml.includes("<urlset")) errors.push("Explore sitemap missing XML urlset");
  for (const slug of landmarkSlugs) {
    const url=origin+"/destination/"+slug;
    if(!xml.includes("<loc>"+url+"</loc>")) errors.push("Missing canonical THC landmark in Explore sitemap: "+slug);
  }
  const html=await load("/destination/holland-hotel");
  if(!html.includes("<title>Holland Hotel |")) errors.push("Holland Hotel subject/title missing");
  if(!html.includes('rel="canonical" href="'+origin+'/destination/holland-hotel"'))errors.push("Wrong Holland Hotel canonical");
  if(/name="robots"[^>]*noindex/i.test(html))errors.push("Holland Hotel noindex");
  const preferredImageTag=html.match(/<meta\s+property="og:image"\s+content="([^"]+)"/i)?.[1] || "";
  const normalizedImageSource=(() => {
    try {
      const parsed=new URL(preferredImageTag.replaceAll("&amp;","&"));
      return decodeURIComponent(parsed.searchParams.get("url") || parsed.href);
    } catch { return preferredImageTag; }
  })();
  if(!normalizedImageSource.includes("/Alpine - Holland Hotel.jpg")) errors.push("Hotel's exact P. Hughes photo not present in preferred-image metadata");
  if(/(?:og:image|twitter:image)[^>]*(?:destination-placeholder|texasdefined-placeholder)/i.test(html)) errors.push("Hotel image metadata points to placeholder");
  const ogImage=html.match(/<meta\s+property="og:image"\s+content="([^"]+)"/i)?.[1];
  if (!ogImage) errors.push("Holland Hotel missing preferred image URL");
  else {
    const photoResponse=await fetch(ogImage,{headers:{"range":"bytes=0-1023","user-agent":"TexasDefined-THC-ProductionVerifier/1.0"},signal:AbortSignal.timeout(25000)});
    if(!photoResponse.ok)errors.push("Holland Hotel preferred image HTTP "+photoResponse.status);
    else {
      const mime=(photoResponse.headers.get("content-type")||"").toLowerCase();
      if (!mime.startsWith("image/")) errors.push("Hotel preferred image is not actual media: "+mime);
      const head=new Uint8Array(await photoResponse.arrayBuffer());
      if(head.length<4 || head[0]!==255 || head[1]!==216) errors.push("Hotel preferred media is not a valid JPEG payload");
    }
  }
  if(html.includes("Holland%20Avenue%20and%20Hotel%20Holland%20Alpine%20Texas%20DSC%205556"))errors.push("Hotel still reuses Alpine district photo");
  // Both historic transportation destinations must have real, helpful links;
  // a pairing string to a nonexistent destination is not a working link.
  const bridge=await load("/destination/sycamore-creek-bridge-fort-worth");
  const stockyards=await load("/destination/fort-worth-stockyards");
  if(!bridge.includes('href="/destination/fort-worth-stockyards"')) errors.push("Sycamore Creek bridge does not link to live Stockyards heritage guide");
  if(!stockyards.includes('href="/destination/sycamore-creek-bridge-fort-worth"')) errors.push("Fort Worth Stockyards does not provide reciprocal bridge heritage navigation");

}catch(e){errors.push(String(e?.message||e));}
console.log(JSON.stringify({site:"THC-landmarks",landmarks:landmarkSlugs.length,passed:errors.length===0,errors},null,2));
if(errors.length) process.exitCode=1;
