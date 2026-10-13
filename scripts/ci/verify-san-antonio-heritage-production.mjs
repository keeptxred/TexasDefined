/** Bounded live QA for a verified deployment, not an indexation or rank guarantee. */
const ORIGIN = "https://texasdefined.com";
const sites = [
  {
    "path": "/destination/mission-concepcion-san-antonio",
    "name": "Mission Concepción"
  },
  {
    "path": "/destination/mission-san-jose-san-antonio",
    "name": "Mission San José"
  },
  {
    "path": "/destination/mission-san-juan-capistrano-san-antonio",
    "name": "Mission San Juan Capistrano"
  },
  {
    "path": "/destination/mission-espada-san-antonio",
    "name": "Mission Espada"
  },
  {
    "path": "/destination/san-fernando-cathedral",
    "name": "San Fernando Cathedral"
  },
  {
    "path": "/destination/bexar-county-courthouse-historic",
    "name": "Historic Bexar County Courthouse"
  },
  {
    "path": "/destination/guenther-house-san-antonio",
    "name": "Guenther House"
  },
  {
    "path": "/destination/steves-homestead-san-antonio",
    "name": "Steves Homestead"
  },
  {
    "path": "/destination/la-villita-historic-district",
    "name": "La Villita Historic District"
  },
  {
    "path": "/destination/menger-hotel-san-antonio",
    "name": "Menger Hotel"
  },
  {
    "path": "/destination/casa-navarro",
    "name": "Casa Navarro"
  },
  {
    "path": "/destination/spanish-governors-palace-san-antonio",
    "name": "Spanish Governor's Palace"
  },
  {
    "path": "/destination/king-william-historic-district",
    "name": "King William Historic District"
  },
  {
    "path": "/destination/villa-finale-museum-gardens-san-antonio",
    "name": "Villa Finale"
  },
  {
    "path": "/destination/the-alamo",
    "name": "The Alamo"
  },
  {
    "path": "/destination/san-antonio-missions-national-historical-park",
    "name": "San Antonio Missions National Historical Park"
  }
];
const guide = {path:"/article/historic-san-antonio-heritage-road-trip",name:"Historic San Antonio Road Trip"};
const headers = {"user-agent":"TexasDefinedSanAntonioHeritageVerifier/1.0"};
const pause = (ms) => new Promise(resolve => setTimeout(resolve,ms));
const decode = (value) => value.replaceAll("&amp;","&").replaceAll("&quot;",'"').replaceAll("&#39;","'");
async function fetchText(path) {
  let error;
  for (let attempt=1;attempt<=3;attempt++) {
    try {
      const u = new URL(path,ORIGIN);
      u.searchParams.set("heritage_verification",process.env.DEPLOY_SHA || "production");
      const response=await fetch(u,{headers,redirect:"follow",signal:AbortSignal.timeout(24000)});
      if(response.status===200)return response.text();
      error = new Error(`HTTP ${response.status} for ${path}`);
    } catch(e) {error=e;}
    if(attempt<3)await pause(4000);
  }
  throw error;
}
const bodyChecks=[];
const sitemapExplore=await fetchText("/sitemap-explore.xml");
const sitemapEvergreen=await fetchText("/sitemap-evergreen.xml");
const sitemapPrimary=await fetchText("/sitemap.xml");
const checkPage=async (page,sitemap) => {
  const canonical=ORIGIN+page.path;
  if(!sitemap.includes(canonical) && !sitemapPrimary.includes(canonical))throw new Error("Not present in canonical sitemap: "+canonical);
  const html=await fetchText(page.path);
  const clean=decode(html);
  if(!clean.toLowerCase().includes(page.name.toLowerCase()))throw new Error("Page content lacks subject: "+canonical);
  const canonicalTags=(html.match(/<link[^>]*rel=["']canonical["'][^>]*>/gi) || []).concat(html.match(/<link[^>]*href=["'][^"']+["'][^>]*rel=["']canonical["'][^>]*>/gi)||[]);
  if(!canonicalTags.some(tag=>decode(tag).includes(canonical)))throw new Error("Canonical link missing: "+canonical);
  if(/<meta[^>]+name=["']robots["'][^>]+noindex/i.test(html))throw new Error("Noindex page: "+canonical);
  if(/Story unavailable|This story is no longer available|404[^0-9].*not found/i.test(clean))throw new Error("Unavailable fallback on page: "+canonical);
  bodyChecks.push({path:page.path,canonical:true,subject:true,sitemap:true});
  console.log("PASS",page.path,"canonical, indexable, distinct subject, sitemap");
};
for(const page of sites)await checkPage(page,sitemapExplore);
await checkPage(guide,sitemapEvergreen);
// The ten newly researched landmark pages must display their photo provenance
// visibly rather than hiding media credits only in schema metadata.
for (const site of sites.slice(0, 10)) {
  const html=decode(await fetchText(site.path));
  if (!html.includes("Research sources and image rights") ||
      !html.includes("Historic-site photo: source, original creator and usage rights") ||
      !html.includes("commons.wikimedia.org/wiki/File:")) {
    throw new Error("Landmark lacks visible documentary photo/source citations: "+site.path);
  }
}
for(const slug of ["mission-san-jose-san-antonio","casa-navarro","steves-homestead-san-antonio"]) {
  const html=decode(await fetchText("/destination/"+slug));
  if(!html.includes("historic-san-antonio-heritage-road-trip"))throw new Error("Missing inbound historic road trip link: "+slug);
}
const steves=decode(await fetchText("/destination/steves-homestead-san-antonio"));
if(!steves.includes("2022"))throw new Error("Steves 2022 sale correction absent");
console.log(JSON.stringify({result:"passed",verifiedPages:bodyChecks.length,scopedSitemaps:["explore","main","evergreen"],inboundLinksChecked:3,verifiedAt:new Date().toISOString()}));
