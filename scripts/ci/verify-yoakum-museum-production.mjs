// Post-deployment technical check; does NOT certify 2026 visiting hours, photo
// licensing, manual accessibility, or independent museum benchmark completion.
const origin = "https://texasdefined.com";
const path = "/destination/yoakum-heritage-museum";
const markers = [
  "Yoakum Heritage Museum",
  "312 Simpson Street",
  "(361) 293-7022",
  "Original TexasDefined interpretive artwork, not a photograph of the house",
  "https://atlas.thc.texas.gov/Details/4200000614",
  "/county/lavaca",
  "/county/dewitt",
];
const problems = [];
let worker = "";
for (let attempt = 1; attempt <= 3; attempt += 1) {
  problems.length = 0;
  const url = origin + path + "?yoakum-production-acceptance=" + String(process.env.GITHUB_SHA || "latest").slice(0,12) + "-" + attempt;
  try {
    const response = await fetch(url, {headers:{accept:"text/html","cache-control":"no-cache, no-store"},signal:AbortSignal.timeout(15000)});
    worker = response.headers.get("x-texasdefined-worker-version") || "";
    const html = await response.text();
    const head = html.split("</head>")[0] || "";
    if (response.status !== 200 || response.headers.get("cf-mitigated") === "challenge") problems.push("Non-200 page or challenge");
    if ((html.match(/<h1\b/g) || []).length !== 1 || !html.includes("<h1") || !html.includes("Yoakum Heritage Museum</h1>")) problems.push("No single sourced SSR H1");
    const selfCanonicals = [...head.matchAll(/<link\b[^>]*\brel=["']canonical["'][^>]*>/gi)].map(x=>x[0]);
    if (selfCanonicals.length !== 1 || !selfCanonicals[0].includes(origin + path)) problems.push("Unique self canonical missing");
    if (/<meta\b[^>]*\bname=["']robots["'][^>]*\bcontent=["'][^"']*noindex/i.test(head)) problems.push("Unexpected noindex");
    if (!head.includes("<title>") || !/name=["']description["']/.test(head)) problems.push("Title or meta description missing");
    for (const marker of markers) if (!html.includes(marker)) problems.push("Missing source/reader marker: " + marker);
    if (!html.includes("/images/yoakum-heritage-museum-editorial.svg")) problems.push("Original explicitly illustrative hero missing");
    if (!worker) problems.push("Worker version header missing");
    if (!problems.length) {
      const art = await fetch(origin + "/images/yoakum-heritage-museum-editorial.svg", {signal:AbortSignal.timeout(15000)});
      if (art.status !== 200 || !String(art.headers.get("content-type")).includes("image/svg+xml")) problems.push("Missing original SVG hero bytes");
    }
    if (!problems.length) {console.log("Yoakum live technical guide PASS " + JSON.stringify({url:path,status:response.status,worker,sourceMarkers:markers.length,originalArtwork:true,manualVisitorAccessCertified:false}));process.exit(0);}
  } catch(error){problems.push(String(error?.message || error));}
  if(attempt<3) await new Promise(resolve=>setTimeout(resolve,1500));
}
throw Error("Yoakum production technical certification failed: "+JSON.stringify({path,worker,problems}));
