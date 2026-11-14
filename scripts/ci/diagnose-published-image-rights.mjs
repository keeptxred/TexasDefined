// Read-only forensic probe for the published Hero ImageObject on both origins.
// Keeps source attribution facts separate from site deployment provenance.
const origins=["https://texasdefined.com","https://texasdefined-site.freddy-coppola.workers.dev"];
const page="/article/unusual-texas-businesses-services";
for (const origin of origins) for (const query of ["","?fishing-image-forensics=20261111"]) {
  const url=origin+page+query;
  try {
    const res=await fetch(url,{headers:{"accept":"text/html","user-agent":"TexasDefined-FishingRelease-ImageRights-Diagnostic/1.0"},signal:AbortSignal.timeout(20000)});
    const html=await res.text();
    const documents=[...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi)]
      .filter(([,attrs])=>/\btype\s*=\s*['"]application\/ld\+json['"]/i.test(attrs))
      .flatMap(([, ,source])=>{try{const j=JSON.parse(source);return Array.isArray(j)?j:[j];}catch{return [];}});
    const nodes=documents.flatMap(doc=>Array.isArray(doc?.["@graph"])?doc["@graph"]:[doc]);
    const expectedId="https://texasdefined.com"+page+"#primaryimage";
    const images=nodes.flatMap(n=>[n,...(Array.isArray(n?.image)?n.image:n?.image?[n.image]:[])]);
    const matched=images.filter(n=>n?.["@id"]===expectedId);
    const result={url,status:res.status,workerVersion:res.headers.get("x-worker-version")??res.headers.get("cf-ray"),canonical:/<link\b[^>]*rel=['"]canonical['"][^>]*>/i.exec(html)?.[0]??null,imagesFound:matched.length,
      images:matched.map(x=>({type:x["@type"],id:x["@id"],url:x.url,contentUrl:x.contentUrl,creditText:x.creditText,creator:x.creator,copyrightNotice:x.copyrightNotice,license:x.license,acquireLicensePage:x.acquireLicensePage})),
      visibleDustinCredit:html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,"").includes("Dustin Moore")};
    console.log(JSON.stringify(result));
    if(res.status!==200)process.exitCode=1;
  } catch(e){console.error(JSON.stringify({url,error:String(e)}));process.exitCode=1;}
}
