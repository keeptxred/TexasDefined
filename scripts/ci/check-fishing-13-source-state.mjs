/**
 * Monitor officially published TPWD text. Do not update verifiedAt from a HEAD
 * request, page view, or unchanged reachability response. Fail closed when the
 * operator changes rules or reopens Lake Abilene so the editorial review can
 * make an evidence-backed code update.
 */
const sources = [
  {
    label: "TPWD 2026-27 general fishing regulations",
    url: "https://tpwd.texas.gov/regulations/outdoor-annual/fishing/general-rules-regulations/general-fishing-regulations",
    checks: [
      {name:"2026-27 regulatory edition",pattern:/Valid\s+Sep\.?\s*1,\s*2026\s+through\s+Aug\.?\s*31,\s*2027/i},
      {name:"bait prohibition",pattern:/use any game fish or part of a game fish as bait/i},
      {name:"live bait transport",pattern:/Commercially purchased live bait that has come into contact/i},
      {name:"Gulf shrimp limitation",pattern:/only shrimp native to the Gulf of Mexico may be used/i},
    ],
  },
  {
    label: "TPWD Lake Abilene State Park operating alert",
    url: "https://tpwd.texas.gov/state-parks/abilene/alert/",
    checks: [
      {name:"Lake Abilene closure",pattern:/Lake Abilene Closures/i},
      {name:"no fishing",pattern:/swimming and fishing are not allowed/i},
      {name:"closed boat ramps",pattern:/boat ramps are closed/i},
    ],
  },
  {
    label:"TPWD legal fishing methods",
    url:"https://tpwd.texas.gov/regulations/outdoor-annual/fishing/general-rules-regulations/legal-devices-for-fish",
    checks:[{name:"pole and line rule",pattern:/Game fish may be taken only by pole and line/i}],
  },
  // New original technique comparisons rely on the specific below-recorded
  // reservoir tactics. Detect changed agency findings, not just HTTP 200.
  // Do not advance editorial or relationship review dates on this automated check.
  {
    label: "TPWD Sam Rayburn technique evidence",
    url: "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/sam_rayburn/",
    checks: [
      { name: "summer worm and Carolina rig tactics", pattern: /plastic worms.*Carolina rigs.*preferred baits/i },
      { name: "low-light topwater rationale", pattern: /topwater baits are good choices during low light conditions/i },
    ],
  },
  {
    label: "TPWD Lake Texoma technique evidence",
    url: "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/texoma/",
    checks: [
      { name: "black bass fall crankbait shoreline tactics", pattern: /work crank baits around brush and off rocky shorelines/i },
      { name: "striped bass open-water trolling option", pattern: /trolling with deep running lures can also be productive/i },
    ],
  },
  {
    label: "TPWD Lake Fork technique evidence",
    url: "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/fork/",
    checks: [
      { name: "spring shoreline spinnerbait context", pattern: /spinnerbaits, plastic worms and lizards, jigs and lipless crankbaits/i },
    ],
  },
  {
    label: "TPWD Canyon Lake technique and safety evidence",
    url: "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/canyon/",
    checks: [
      { name: "early and late topwater context", pattern: /topwater baits such as buzzbaits.*early morning and evening hours/i },
      { name: "extended cloudy-sky topwater opportunity", pattern: /cloudy days consistent topwater action can occur all day/i },
      { name: "current consumption advisory", pattern: /consumption advisory in effect/i },
      { name: "zebra mussel advisory", pattern: /zebra mussels have invaded this reservoir/i },
    ],
  },
  {
    label: "TPWD Lake Conroe technique evidence",
    url: "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/conroe/",
    checks: [
      { name: "hybrid striped bass open-water trolling", pattern: /most are taken by anglers trolling in open water areas/i },
      { name: "upper-reservoir timber boating risk", pattern: /standing timber still present along the river channel/i },
    ],
  },
  {
    label: "TPWD weekly fishing report availability",
    url: "https://tpwd.texas.gov/fishboat/fish/recreational/fishreport.phtml",
    checks: [
      { name: "report feed officially on hold", pattern: /weekly fishing reports are currently on hold/i },
    ],
  },
];
const errors=[];
for(const source of sources) {
  try {
    const response=await fetch(source.url,{headers:{"user-agent":"TexasDefined-FishingSourceMonitor/1.0 (+https://texasdefined.com/fishing/regulations)","accept":"text/html, text/plain;q=0.8"},signal:AbortSignal.timeout(18000)});
    if(!response.ok)throw new Error(`HTTP ${response.status}`);
    const raw=await response.text();
    const text=raw.replace(/<script[\s\S]*?<\/script>/gi," ").replace(/<style[\s\S]*?<\/style>/gi," ").replace(/<[^>]+>/g," ").replace(/&nbsp;|&#160;/gi," ").replace(/\s+/g," ");
    for(const check of source.checks){
      if(!check.pattern.test(text))errors.push(`${source.label}: expected evidence changed or missing: ${check.name}. Confirm the official page; do not automatically assume the old rule remains valid. ${source.url}`);
    }
    console.log(`Reviewed source reachability and signatures: ${source.label}`);
  }catch(error){errors.push(`${source.label}: unable to confirm official source (${error.message}); investigate provider/TLS before asserting a rule change. ${source.url}`)}
}
if(errors.length){for(const error of errors)console.error(error);process.exitCode=1;}
else console.log("PASS: Official TPWD regulations, Lake Abilene closure, five reservoir technique sources and dated report availability unchanged.");
