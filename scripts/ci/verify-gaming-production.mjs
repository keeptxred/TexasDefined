const origin = process.env.PRODUCTION_ORIGIN ?? "https://texasdefined.com";
const sha = process.env.GITHUB_SHA ?? "local";
const runId = process.env.GITHUB_RUN_ID ?? Date.now().toString();
const pages = [
  ["/gaming", "Gaming & Esports in Texas", ["CollectionPage", "ItemList"]],
  ["/gaming/video-game-industry", "Texas Video Game Industry", ["Article", "BreadcrumbList"]],
  ["/gaming/companies", "Video Game Companies in Texas", ["Article"]],
  ["/gaming/esports", "Texas Esports", ["Article"]],
  ["/gaming/why-dallas-matters-online-gaming", "Why Dallas Matters to Online Gaming", ["Article"]],
  ["/gaming/latency", "Texas Online Gaming Latency Guide", ["Article"]],
];
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const esc = (v) => v.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
function requireCondition(ok, message) { if (!ok) throw new Error(message); }
function canonical(html, url) { const value=esc(url); return new RegExp(`<link[^>]+rel=["']canonical["'][^>]+href=["']${value}["']|<link[^>]+href=["']${value}["'][^>]+rel=["']canonical["']`, "i").test(html); }
function noindex(html) { return /<meta\b[^>]*(?:name=["']robots["'][^>]*content=["'][^"']*noindex|content=["'][^"']*noindex[^"']*["'][^>]*name=["']robots["'])/i.test(html); }
async function fetchRetry(path, label) {
  let last;
  for(let i=1;i<=6;i+=1){
    try {
      const response=await fetch(`${origin}${path}?verify=${encodeURIComponent(`${sha}-${runId}-${label}-${i}`)}`,{redirect:"follow",cache:"no-store",signal:AbortSignal.timeout(30000),headers:{"user-agent":"TexasDefined-Gaming-Production-Smoke/1.0"}});
      const body=await response.text(); last={response,body};
      if(response.status<500 && response.headers.get("cf-mitigated")?.toLowerCase()!=="challenge") return last;
    } catch(error){last={error};}
    if(i<6) await sleep(5000);
  }
  return last;
}
for(const [path,title,schemas] of pages){
  const r=await fetchRetry(path,path);
  requireCondition(r?.response?.status===200,`${path}: expected 200`);
  requireCondition(!noindex(r.body),`${path}: unexpected noindex`);
  requireCondition(canonical(r.body,`${origin}${path}`),`${path}: canonical missing`);
  requireCondition(r.body.includes(title),`${path}: title marker missing`);
  for(const schema of schemas) requireCondition(r.body.includes(schema),`${path}: schema ${schema} missing`);
}
const sitemap=await fetchRetry("/sitemap.xml","gaming-sitemap");
requireCondition(sitemap?.response?.status===200,"gaming sitemap unavailable");
for(const [path] of pages) requireCondition(sitemap.body.includes(`${origin}${path}`),`sitemap missing ${path}`);
const invalid=await fetchRetry("/gaming/not-a-real-topic","gaming-invalid");
requireCondition(invalid?.response && (invalid.response.status===404 || (invalid.response.status===200 && noindex(invalid.body))),"invalid gaming slug must fail closed");
console.log("Texas gaming production verification passed for flagship routes, sitemap, canonical/indexability, schema and invalid-slug behavior.");
