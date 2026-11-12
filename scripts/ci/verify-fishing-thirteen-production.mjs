/** Exact-page production SSR acceptance for the 13 fishing authority URLs. */
const root = (process.env.FISHING_13_ORIGIN ?? "https://texasdefined.com").replace(/\/$/, "");
const guides = {
  "soft-plastics": "Match the soft-plastic rig to cover",
  "crankbaits": "Choose crankbait depth by actual contact",
  "spinnerbaits": "Spinnerbait choices by water visibility",
  "topwater": "Surface lures by cover and strike behavior",
  "trolling": "Build a controlled trolling pass",
  "vertical-jigging": "Keep the lure in the fish's depth band",
  "jigs-and-minnows": "Present crappie baits at the right depth",
  "live-bait": "Put bait legality before rig choice",
  "cut-bait": "Choose cut-bait rigs by current and depth",
};
const entries = [
  ["/fishing/techniques", ["Texas Fishing Techniques","Year-round is an applicability label"]],
  ...Object.entries(guides).map(([slug, heading]) => [`/fishing/techniques/${slug}`, [heading,"Explore all"]]),
  ["/fishing/regulations", ["Decide Which Rule Applies Before You Go","Bait Sourcing, Transport and Clean-Water Rules"]],
  ["/fishing/species", ["Directory records versus standalone guides","Standalone guides"]],
  ["/fishing/species/largemouth-bass", ["Identify Your Bass Before Checking a Limit","Lake Abilene is excluded"]],
];
const getAttr = (tag, key) => {
  const found = tag.match(new RegExp(`\\b${key}\\s*=\\s*(['"])(.*?)\\1`, "i"));
  return found?.[2] ?? "";
};
const meta = (html,name) => [...html.matchAll(/<meta\b[^>]*>/gi)].map(x=>x[0]).find(x=>getAttr(x,"name").toLowerCase()===name);
const decodeHtmlEntities = (value) => value
  .replace(/&#(x[0-9a-f]+|[0-9]+);/gi, (match, entity) => {
    const codepoint = entity[0].toLowerCase() === "x" ? Number.parseInt(entity.slice(1), 16) : Number.parseInt(entity, 10);
    return Number.isInteger(codepoint) && codepoint >= 0 && codepoint <= 0x10ffff ? String.fromCodePoint(codepoint) : match;
  })
  .replace(/&(nbsp|amp|quot|apos|lt|gt);/gi, (match, entity) => ({nbsp:" ",amp:"&",quot:'"',apos:"'",lt:"<",gt:">"}[entity.toLowerCase()] ?? match));
const htmlText = (html) => decodeHtmlEntities(html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi," ").replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi," ").replace(/<[^>]*>/g," ")).replace(/\s+/g," ");
if(htmlText("<h2>Keep the lure in the fish&#x27;s depth band</h2>").trim() !== "Keep the lure in the fish's depth band") throw new Error("SSR text decoding regression");
const failures = [];
const reports = [];
let cursor=0;
async function worker() {
  while(cursor<entries.length) {
    const [path, phrases] = entries[cursor++];
    const issues=[];
    try {
      const res=await fetch(root+path,{headers:{"user-agent":"TexasDefinedFishingAuthorityProductionVerifier/1.0 (+https://texasdefined.com/about)","accept":"text/html"},signal:AbortSignal.timeout(19000)});
      const body=await res.text();
      const visible=htmlText(body);
      if(res.status!==200)issues.push("HTTP_"+res.status);
      if(!/<title[\s>]/i.test(body))issues.push("no_title");
      if(!/<h1[\s>]/i.test(body))issues.push("no_ssr_h1");
      const canonTag=[...body.matchAll(/<link\b[^>]*>/gi)].map(x=>x[0]).find(tag=>getAttr(tag,"rel").toLowerCase().split(/\s+/).includes("canonical"));
      const actual=getAttr(canonTag??"","href").replace(/\/$/,"");
      if(actual!==root+path)issues.push("bad_canonical:"+actual);
      const robots=getAttr(meta(body,"robots")??"","content");
      if(/\bnoindex\b/i.test(robots)||/\bnoindex\b/i.test(res.headers.get("x-robots-tag")??""))issues.push("unexpected_noindex");
      if(!/application\/ld\+json/i.test(body))issues.push("no_jsonld");
      for(const phrase of phrases) if(!visible.includes(phrase))issues.push("missing_visible_content:"+phrase);
      const stripped=visible.replace(/\s+/g," ").trim();
      if(stripped.split(" ").length<190)issues.push("very_thin_ssr_content");
      reports.push({path,status:res.status,canonical:actual,robots,contentWords:stripped.split(" ").length,issues});
    }catch(e){issues.push("fetch_failed:"+e.message);reports.push({path,issues});}
    failures.push(...issues.map(issue=>`${path}: ${issue}`));
  }
}
await Promise.all([worker(),worker(),worker()]);
reports.sort((a,b)=>a.path.localeCompare(b.path));
console.log(JSON.stringify({origin:root,checked:reports.length,failures:failures.length,reports},null,2));
if(reports.length!==13||failures.length)process.exitCode=1;
