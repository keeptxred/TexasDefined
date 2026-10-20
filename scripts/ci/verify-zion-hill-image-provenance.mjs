import fs from "node:fs";
import assert from "node:assert/strict";

const source = fs.readFileSync(new URL("../../src/data/zion-hill-nacogdoches-authority-destinations.ts", import.meta.url), "utf8");
const recordsText = source.slice(source.indexOf("= [") + 2).replace(/;\s*$/, "").trim();
const destinations = JSON.parse(recordsText);
const district = destinations.find(d => d.slug === "zion-hill-historic-district-nacogdoches");
const church = destinations.find(d => d.slug === "zion-hill-baptist-church-nacogdoches");
assert.ok(district && church, "Both Black heritage destinations must remain published");
assert.notEqual(district.hero.src, church.hero.src, "District and church require distinct, place-specific photographs");
assert.match(church.hero.alt, /Zion Hill First Baptist Church/i, "Church alt text must show its own place");
assert.match(church.hero.credit, /Michael Barera.*CC BY-SA 4.0/, "Church photo must retain verified creator/license");
assert.match(church.hero.src, /^https:\/\/commons\.wikimedia\.org\/wiki\/Special:Redirect\/file\//);
assert.ok(church.hero.width >= 1200);
const filename = "Nacogdoches August 2017 39 (Zion Hill First Baptist Church).jpg";
const commonsApi = new URL("https://commons.wikimedia.org/w/api.php");
commonsApi.searchParams.set("action", "query");
commonsApi.searchParams.set("format", "json");
commonsApi.searchParams.set("prop", "imageinfo");
commonsApi.searchParams.set("iiprop", "url|extmetadata");
commonsApi.searchParams.set("titles", "File:" + filename);
const response = await fetch(commonsApi, {
  headers: {"user-agent": "TexasDefinedEditorialSourceVerifier/1.0 (https://texasdefined.com; media compliance)"},
  signal: AbortSignal.timeout(20000),
});
if (!response.ok) throw Error("Commons image metadata returned HTTP " + response.status);
const payload = await response.json();
const page = Object.values(payload.query?.pages ?? {})[0];
assert.ok(page && page.pageid !== -1 && page.imageinfo?.length, "Exact Commons image file does not exist");
const metadata = page.imageinfo[0].extmetadata ?? {};
const creator = String(metadata.Artist?.value ?? "");
const license = String(metadata.LicenseShortName?.value ?? "") + " " + String(metadata.LicenseUrl?.value ?? "");
assert.match(creator, /Michael Barera/i, "Unexpected image author; verify source before publishing");
assert.match(license, /CC BY-SA 4\.0|by-sa\/4\.0/i, "Photograph is not confirmed CC BY-SA 4.0");
const src = page.imageinfo[0].url;
assert.ok(src?.startsWith("https://upload.wikimedia.org/"), "Unexpected original Commons image source");
console.log(JSON.stringify({status:"PASS",source:filename,artist:creator.replace(/<[^>]*>/g,"").slice(0,100),license,original:src,districtPhoto:district.hero.src}));
