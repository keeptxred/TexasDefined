import fs from "node:fs";

const failures = [];
const read = (path) => fs.readFileSync(path, "utf8");
const check = (ok, message) => { if (!ok) failures.push(message); };

const capitals = read("src/data/texas-capital-designations-official.ts");
const rowsLiteral = capitals.match(/const sourceRows = ("(?:\\.|[^"\\])*");/);
check(Boolean(rowsLiteral), "Missing serialized TSLAC place-designation source records.");
const rows = rowsLiteral ? JSON.parse(rowsLiteral[1]).split("\n") : [];
check(rows.length === 94, `Expected exactly 94 TSLAC place-designation entries, found ${rows.length}.`);
const keys = [];
for (const row of rows) {
  const [title, place, citation, year] = row.split("|");
  check(Boolean(title && place && citation && /^\d{4}$/.test(year)), `Incomplete official designation record: ${row}`);
  keys.push([title, place, year].join("|"));
}
check(keys.length === new Set(keys).size, "Duplicate official designation entries.");
for (const token of ["Aviation and Defense Capital of Texas|Fort Worth|H.C.R. 142|2025", "Banana Pudding Capital of Texas|Slaton|H.C.R. 135|2025", "Ice Cream Capital of Texas|Brenham|H.C.R. 80|2025"]) {
  check(rows.includes(token), `Missing official designation: ${token}`);
}
check(capitals.includes("year <= 2001") && capitals.includes("77th Regular Session"), "Place-designation statuses must document the pre-September 2001 exemption and 77th Regular Session evidence.");
const capitalRoute = read("src/routes/texas-capital-designations.tsx");
for (const token of ["OFFICIAL_CAPITALS.length", "TSLAC_CAPITAL_SOURCE", "CAPITAL_STATUS_LABELS", "H.C.R. 24", "aria-labelledby=\"full-capital-register\""]) check(capitalRoute.includes(token), `Capital register missing UI/content token: ${token}`);
check(!capitalRoute.includes('resolution: "H.R. 24"'), "San Angelo must cite the enacted H.C.R. 24 rather than the state-library transcription.");

const iconCatalog = read("src/data/things-unique-to-texas.ts");
const allIds = [...iconCatalog.matchAll(/\bitem\((\d+),/g)].map((match) => Number(match[1]));
check(allIds.length === 250 && new Set(allIds).size === 250, `Texas icon records must preserve 250 unique IDs; found ${allIds.length}.`);
const natural = iconCatalog.split('slug: "natural-wonders"')[1]?.split('slug: "landmarks"')[0] ?? "";
const landmarks = iconCatalog.split('slug: "landmarks"')[1]?.split('slug: "roadside-small-towns"')[0] ?? "";
const brands = iconCatalog.split('slug: "texas-brands"')[1]?.split('slug: "natural-wonders"')[0] ?? "";
const food = iconCatalog.split('slug: "food-drink"')[1]?.split('slug: "texas-brands"')[0] ?? "";
for (const id of [88,90]) {
  check(!natural.includes(`item(${id},`), `Cultural site ${id} must not appear as natural wonder.`);
  check(landmarks.includes(`item(${id},`), `Cultural site ${id} must appear with landmarks.`);
}
for (const id of [50,51,52,55]) check(!brands.includes(`item(${id},`), `Nonbrand ID ${id} must not appear as a brand.`);
for (const id of [52,55]) check(food.includes(`item(${id},`), `Beverage/food ID ${id} must appear with foods and drinks.`);

const chapter = read("src/data/texas-icon-chapter-evidence.ts");
const categoryRoute = read("src/routes/things-unique-to-texas_.$category.lazy.tsx");
for (const slug of ["food-drink","texas-brands","natural-wonders","landmarks"]) check(chapter.includes(`"${slug}": {`), `Missing substantive evidence chapter ${slug}`);
check(categoryRoute.includes("chapterEvidence.findings.map"), "Culture chapter narrative not rendered.");
const hub = read("src/routes/things-unique-to-texas.lazy.tsx");
for (const target of ["/destination/big-bend-national-park", "/destination/palo-duro-canyon-state-park", "/article/caddo-lake-cypress-morning", "/article/bucees-texas-road-trip-history", "/article/heb-texas-grocery-history-culture", "/article/kolache-or-klobasnek-texas-story", "/explore/painted-churches"]) check(hub.includes(target), `Texas culture hub missing exact topical link: ${target}`);

const music = read("src/data/texas-music-city-guides.ts");
for (const token of ["WBAP began broadcasting", "Deep Ellum developed around", "James Earl 'Pop' Sellers", "Longhorn Ballroom opened"]) check(music.includes(token), `Music-history depth token missing: ${token}`);
const musicSources = read("src/components/editorial/TexasMusicCityGuide.tsx");
for (const source of ["/handbook/entries/wbap", "/handbook/entries/longhorn-ballroom", "/handbook/entries/sellers-james-earl-j-e-pop"]) check(musicSources.includes(source), `Dallas–Fort Worth source missing: ${source}`);

const facts = read("src/routes/texas-facts.lazy.tsx");
check(facts.includes("2020 Census") && facts.includes("first among the contiguous 48 states"), "Facts page missing original sourced comparison.");
const symbols = read("src/routes/texas-symbols.lazy.tsx");
check(symbols.includes("A state symbol is not just") && symbols.includes("1901"), "Symbols page lacks legal and cultural context.");
const symbolsSchema = read("src/routes/texas-symbols.tsx");
check(symbolsSchema.includes("numberOfItems: featuredSymbols.length"), "Texas Symbols structured-data count still mismatches serialized items.");

const factCheck = read("src/data/priority-search-pages-public-services.ts");
for (const token of ["Six Texas superlatives at a glance", "302.64 ft versus 288 ft", "not a fixed census", "801,163 acres"]) check(factCheck.includes(token), `Texas-size fact check missing measurable claim or qualification: ${token}`);
const sloganRoute = read("src/routes/everything-bigger-in-texas.tsx");
check(sloganRoute.includes("officialSourcesIntro="), "Texas-size fact check still uses unrelated fees and appointment disclaimer.");

const methodology = read("src/routes/things-unique-to-texas_.methodology.tsx");
check(methodology.includes("What a fact check looks like in this collection") && methodology.includes("2026-11-13"), "Research methodology lacks documented examples or review date.");

if (failures.length) {
  console.error(`Texas culture authority validation failed (${failures.length} issues):`);
  for (const issue of failures) console.error(`- ${issue}`);
  process.exit(1);
}
console.log("PASS Texas culture authority: 94 unique official capital titles, 250 unique culture entries, 4 researched chapters, accurate categorization, sourced music and fact comparisons, symbol metadata and exact hub links.");
