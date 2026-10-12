#!/usr/bin/env node
/**
 * Mandatory TexasDefined river-authority contract. Every registered river has a
 * live lazy profile, specific fishing/access/paddling/camping/visitor research,
 * cited primary sources and automatically reciprocal discovery links.
 */
import fs from "node:fs";
import path from "node:path";

const read = (file) => fs.readFileSync(file, "utf8");
const errors = [];
const registry = read("src/data/river-authority-registry.ts");
const content = read("src/data/fixtures/texas-river-visitor-authority.ts");
const stubs = read("src/data/fixtures/texas-river-visitor-stubs.ts");
const lazy = read("src/data/fixtures/lazy-evergreen.ts");
const hub = read("src/components/content/TexasRiversAuthorityHub.tsx");
const county = read("src/routes/$kind.$slug.lazy.tsx");
const destination = read("src/routes/destination.$slug.tsx");
const fishingLakes = read("src/routes/fishing.lakes.$slug.tsx");
const fishingHub = read("src/components/fishing/FishingHub.tsx");
const campingHub = read("src/routes/best-places-to-go-camping-in-texas.lazy.tsx");
const related = read("src/components/content/RiverContextualLinks.tsx");
const pillar = read("src/data/fixtures/texas-rivers-explained.ts");
const topology = read("src/data/fixtures/newest-evergreen.ts");
const extractJson = (source, prefix, suffix) => {
 const a = source.indexOf(prefix);
 if (a < 0) throw new Error(`Missing data declaration: ${prefix}`);
 const start = a + prefix.length;
 const b = source.indexOf(suffix, start);
 if (b < 0) throw new Error(`Missing delimiter: ${suffix}`);
 return JSON.parse(source.slice(start, b).trim());
};
const rivers = extractJson(registry, "RiverAuthorityRecord[] = ", ";\nexport const riverAuthorityBySlug");
const details = extractJson(content, "Record<string, RiverDetail> = ", ";\nconst BASIN_SOURCES");
const basins = extractJson(content, "const BASIN_SOURCES: Record<string, string> = ", ";\nconst COMMON_SOURCES");
const required = ["guadalupe","frio","comal","san-marcos","llano","colorado","brazos","neches","sabine","pecos"];
const seen = new Set(),seenPaths=new Set();
if (rivers.length < 10) errors.push("Fewer than ten canonical river profiles registered");
for (const key of required) if (!rivers.some((river) => river.key === key)) errors.push(`Missing required river: ${key}`);
for (const river of rivers) {
 if (seen.has(river.key)) errors.push(`Duplicate key ${river.key}`);
 if (seenPaths.has(river.slug)) errors.push(`Duplicate slug ${river.slug}`);
 seen.add(river.key);seenPaths.add(river.slug);
 const d = details[river.key];
 if (!d) {errors.push(`Missing visitor research for ${river.key}`);continue;}
 if (!river.slug.startsWith("texas-") || !river.slug.endsWith("-river-guide")) errors.push(`Invalid canonical slug ${river.slug}`);
 if (river.destinations.some((name) => ["landa-park","rio-vista-park","blue-hole-wimberley"].includes(name))) errors.push(`Unverified or misattributed destination on ${river.key}`);
 if (!river.counties.length || !river.basin || !river.name || !river.summary) errors.push(`Missing region identity or crosslinks for ${river.key}`);
 if (!basins[river.basin]?.startsWith("https://www.twdb.texas.gov/")) errors.push(`Missing TWDB primary basin source for ${river.key}`);
 for (const field of ["position","swim","trip","culture","extra"]) if ((d[field]??"").trim().length < 65) errors.push(`${river.key} ${field} needs unique visitor research`);
 for (const field of ["fish","access","camp","paddle"]) if (!Array.isArray(d[field]) || d[field].length < 3 || d[field].some((item) => item.length < 60)) errors.push(`${river.key} ${field} requires at least three specific planning insights`);
 const imagePath = path.join("public",river.image.replace(/^\//,""));
 if (!fs.existsSync(imagePath)) errors.push(`${river.key} missing hero asset: ${imagePath}`);
 if (!river.imageAlt || river.imageAlt.length < 25) errors.push(`${river.key} missing honest image alt text`);
}
for (const [file,label,tokens] of [
 [lazy,"lazy registry",["...texasRiverVisitorStubs","texasRiverVisitorStubs.some","texasRiverNewVisitorArticles","strengthenTexasRiverArticle"]],
 [stubs,"auto stubs",["LEGACY_RIVER_SLUGS","!LEGACY_RIVER_SLUGS.has(river.slug)"]],
 [content,"auto new articles",["texasRiverVisitorStubs.map","strengthenTexasRiverArticle","Sources, verification and how to cite"]],
 [hub,"river authority hub",["...riverAuthorityRecords.map"]],
 [registry,"reciprocal county and destination graph",["riverLinksForCounty","riverLinksForDestination"]],
 [county,"county pages",["<RiverContextualLinks countySlug={entity.slug}"]],
 [destination,"destination pages",["<RiverContextualLinks destinationSlug={destination.slug}"]],
 [fishingLakes,"fishing lake guides",["<RiverContextualLinks destinationSlug={data.lake.slug}"]],
 [fishingHub,"fishing hub discoverability",["riverAuthorityRecords.map","river-fishing-guides"]],
 [campingHub,"camping hub discoverability",["riverAuthorityRecords.map","river-camping-guides"]],
 [related,"contextual link widget",["href={river.href}","riverLinksForCounty","riverLinksForDestination"]],
 [pillar,"pillar links",["texas-frio-river-guide","texas-comal-river-guide","texas-san-marcos-river-guide","texas-llano-river-guide","texas-pecos-river-guide"]],
 [topology,"evergreen topic topology",["texas-frio-river-guide","texas-comal-river-guide","texas-san-marcos-river-guide","texas-llano-river-guide","texas-pecos-river-guide"]],
 ]) {
 for (const token of tokens) if (!file.includes(token)) errors.push(`${label} missing ${token}`);
}
for(const link of [
 "https://tpwd.texas.gov/landwater/water/habitats/rivers/access/index.phtml",
 "https://tpwd.texas.gov/regulations/outdoor-annual/fishing/freshwater-fishing/freshwater-fishing-laws-and-exceptions",
 "https://dashboard.waterdata.usgs.gov/",
 "https://www.weather.gov/safety/flood",
]) if(!content.includes(link)) errors.push(`Required current primary source missing: ${link}`);
if(errors.length) {
 console.error(`River authority validation FAILED (${errors.length}):\n- ${errors.join("\n- ")}`);
 process.exitCode = 1;
} else {
 console.log(`River authority contract PASSED for ${rivers.length} river profiles: unique content, media, lazy routes, auto crosslinks, primary sources and safety.`);
}
