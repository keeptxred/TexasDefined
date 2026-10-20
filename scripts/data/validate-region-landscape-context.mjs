import fs from "node:fs";
const data = fs.readFileSync("src/data/region-landscape-crosslinks.ts", "utf8");
const region = fs.readFileSync("src/components/editorial/RegionAuthorityGuide.tsx", "utf8");
const landscape = fs.readFileSync("src/routes/explore.landscapes.$slug.lazy.tsx", "utf8");
const sources = fs.readFileSync("src/data/texas-landscapes.ts", "utf8");
const purge = fs.readFileSync("scripts/ci/purge-cloudflare-cache.mjs", "utf8");
const slugs = [
 "best-places-to-photograph-texas-landscapes","best-scenic-drives-for-every-texas-landscape",
 "cross-timbers","forests","guadalupe-mountains","most-beautiful-landscapes-in-texas",
 "permian-basin","post-oak-savannah","rivers-and-river-valleys","rolling-plains",
 "texas-geography-explained","texas-landscapes-by-region",
 "what-part-of-texas-looks-like-arizona-colorado-or-the-south","why-is-the-texas-hill-country-so-hilly"
];
const errors=[];
for(const slug of slugs){
 if(!data.includes('slug: "'+slug+'"'))errors.push("Underlinked landscape missing from regional crosslinks "+slug);
 if(!sources.includes("slug: '"+slug+"'"))errors.push("Not a published landscape guide "+slug);
}
for(const name of ["hill-country","gulf-coast","big-bend","panhandle","piney-woods","prairies-lakes","south-texas"])
 if(!data.includes('"'+name+'": ['))errors.push("Missing region "+name);
if(!region.includes("REGIONAL_LANDSCAPE_LINKS[region.id]"))errors.push("Region guide missing geography-specific outgoing links");
if(!landscape.includes("landscapeRegionBacklinks(slug)"))errors.push("Landscape guide missing inverse regional links");
if(!purge.includes("...regionalAuthorityPurgeUrls"))errors.push("Region/landscape HTML not protected from stale Cloudflare cache after deploy");
if(!purge.includes("swimming-holes-river-tubing"))errors.push("Swim guide HTML cache remains stale across deployment");
for(const slug of slugs)if(!purge.includes(slug))errors.push("Landscape HTML purge missing "+slug);
if(errors.length){errors.forEach(x=>console.error("FAIL "+x));process.exit(1);}
console.log("PASS: seven regional source-led contextual rails and fourteen reciprocally linked landscape authority pages");
