import fs from "node:fs";

const rosterPath = "src/data/texas-icons-roster.server.ts";
const sourcePaths = [
  "src/data/texas-icons-source-history-music.server.ts",
  "src/data/texas-icons-source-sports-business.server.ts",
  "src/data/texas-icons-source-media-symbols.server.ts",
];
const researchPaths = [
  "src/data/texas-icons-research-history-1.server.ts",
  "src/data/texas-icons-research-history-2.server.ts",
  "src/data/texas-icons-research-history-3.server.ts",
  "src/data/texas-icons-research-history-4.server.ts",
  "src/data/texas-icons-research-history-5.server.ts",
  "src/data/texas-icons-research-history-6.server.ts",
  "src/data/texas-icons-research-history-7.server.ts",
  "src/data/texas-icons-research-history-8.server.ts",
  "src/data/texas-icons-research-history-9.server.ts",
  "src/data/texas-icons-research-history-10.server.ts",
];
const typesPath = "src/data/texas-icons-types.ts";
const serverPath = "src/data/texas-icons.server.ts";
const functionsPath = "src/data/texas-icons.functions.ts";
const publicRoutesPath = "src/lib/public-routes.ts";
const workflowPath = ".github/workflows/texas-icons-registry.yml";
const hubPath = "src/routes/texas-icons.tsx";
const profilePath = "src/routes/texas-icons_.$slug.tsx";
const talentProfilePath = "src/data/texas-talent-profiles-wave2-arts.ts";
const talentReadinessPath = "src/data/texas-talent-readiness-batch10.ts";

const failures = [];
for (const path of [
  rosterPath, ...sourcePaths, ...researchPaths, typesPath, serverPath, functionsPath,
  publicRoutesPath, workflowPath, hubPath, profilePath, talentProfilePath, talentReadinessPath,
]) {
  if (!fs.existsSync(path)) failures.push(`Missing Texas Icons contract file: ${path}`);
}
if (failures.length) fail();

const rosterSource = fs.readFileSync(rosterPath, "utf8");
const research = researchPaths.map((path) => fs.readFileSync(path, "utf8")).join("\n");
const types = fs.readFileSync(typesPath, "utf8");
const server = fs.readFileSync(serverPath, "utf8");
const functions = fs.readFileSync(functionsPath, "utf8");
const publicRoutes = fs.readFileSync(publicRoutesPath, "utf8");
const workflow = fs.readFileSync(workflowPath, "utf8");
const hub = fs.readFileSync(hubPath, "utf8");
const profile = fs.readFileSync(profilePath, "utf8");
const talentProfiles = fs.readFileSync(talentProfilePath, "utf8");
const talentReadiness = fs.readFileSync(talentReadinessPath, "utf8");

const sourceFragments = sourcePaths.map((path) => {
  const source = fs.readFileSync(path, "utf8");
  const match = source.match(/String\.raw`([\s\S]*?)`;/);
  if (!match) failures.push(`Texas Icons source fragment missing raw CSV payload: ${path}`);
  return match?.[1] ?? "";
});
const rows = parseCsv(["Rank,Name,Category,Description", ...sourceFragments].join("\n"));
const header = rows[0] ?? [];
if (header.join("|") !== "Rank|Name|Category|Description") failures.push(`Unexpected Texas Icons CSV header: ${header.join("|")}`);
const records = rows.slice(1).map(([rank, name, category, description]) => ({ rank: Number(rank), name, category, description, slug: slugify(name ?? "") }));
if (records.length !== 250) failures.push(`Expected exactly 250 Texas Icon records; found ${records.length}.`);
if (records.map((record) => record.rank).join(",") !== Array.from({ length: 250 }, (_, index) => index + 1).join(",")) failures.push("Texas Icon ranks must be exactly 1 through 250 in source order.");
if (new Set(records.map((record) => record.slug)).size !== records.length) failures.push("Texas Icon slugs must be unique.");
if (new Set(records.map((record) => normalize(record.name))).size !== records.length) failures.push("Texas Icon names collide after punctuation/accent normalization.");
if (records.some((record) => !record.name || !record.description)) failures.push("Every Texas Icon intake row must retain a name and roster note.");

const expectedCategoryCounts = new Map([
  ["History & Politics", 50], ["Music & Culture", 50], ["Sports", 50],
  ["Business & Science", 40], ["Media & Arts", 35], ["Symbols & Food", 25],
]);
for (const [category, expected] of expectedCategoryCounts) {
  const actual = records.filter((record) => record.category === category).length;
  if (actual !== expected) failures.push(`Expected ${expected} ${category} records; found ${actual}.`);
}

for (const token of [
  'label: "History & Politics"', 'label: "Music & Culture"', 'label: "Sports"',
  'label: "Business & Science"', 'label: "Media & Arts"', 'label: "Symbols & Food"',
  "TexasIconNarrativeProfile", "TexasIconResearchProfile", 'editorialStatus: "researched-staged"',
]) if (!types.includes(token)) failures.push(`Texas Icons type/category contract missing: ${token}`);

const researchedHistorySlugs = [
  "lyndon-b-johnson", "sam-houston", "stephen-f-austin", "george-w-bush", "barbara-jordan",
  "george-h-w-bush", "ann-richards", "sam-rayburn", "davy-crockett", "james-baker",
  "jose-antonio-navarro", "william-b-travis", "jim-bowie", "dwight-d-eisenhower", "mirabeau-b-lamar",
  "lorenzo-de-zavala", "john-nance-garner", "chester-w-nimitz", "audie-murphy", "kay-bailey-hutchison",
  "juan-seguin", "quanah-parker", "lady-bird-johnson", "rick-perry", "john-connally",
  "henry-b-gonzalez", "irma-rangel", "lulu-belle-madison-white", "sallie-reynolds-matthews", "molly-goodnight",
  "richard-king", "charles-goodnight", "james-hogg", "ma-ferguson", "allan-shivers",
  "phil-gramm", "tom-connally", "anson-jones", "adina-de-zavala", "clara-driscoll",
  "cynthia-ann-parker", "satanta", "george-t-ruby", "norris-wright-cuney",
  "roy-bedichek", "walter-prescott-webb", "william-bill-clements", "wallace-jefferson", "alberto-gonzales",
];
for (const slug of researchedHistorySlugs) {
  if (!records.some((record) => record.slug === slug)) failures.push(`Researched History & Politics profile is not in the 250-icon roster: ${slug}.`);
  if (!research.includes(`slug: "${slug}"`)) failures.push(`History research profile missing: ${slug}.`);
}
if (researchedHistorySlugs.length !== 49) failures.push(`Expected 49 dedicated History & Politics research profiles; found ${researchedHistorySlugs.length}.`);
if ((research.match(/editorialStatus: "researched-staged"/g) ?? []).length !== researchedHistorySlugs.length) failures.push("Every researched History & Politics profile must remain explicitly researched-staged for provenance.");
if ((research.match(/publicationNote:/g) ?? []).length !== researchedHistorySlugs.length) failures.push("Every researched History & Politics profile must retain its publication-workflow note as provenance.");
if ((research.match(/lastReviewedAt: reviewed/g) ?? []).length !== researchedHistorySlugs.length) failures.push("Every researched History & Politics profile must retain a reviewed date.");
const researchSourceUrls = [...research.matchAll(/url: "(https:\/\/[^\"]+)"/g)].map((match) => match[1]);
if (researchSourceUrls.length < researchedHistorySlugs.length * 3) failures.push(`History research needs at least three HTTPS sources per profile; found ${researchSourceUrls.length} source URLs.`);
for (const domain of [
  "lbjlibrary.org", "nps.gov", "tshaonline.org", "tsl.texas.gov", "glo.texas.gov",
  "georgewbushlibrary.gov", "history.house.gov", "utexas.edu", "tsu.edu", "bush41.org",
  "history.state.gov", "archives.gov", "thealamo.org", "bakerinstitute.org", "senate.gov",
  "history.navy.mil", "pacificwarmuseum.org", "cmohs.org", "arlingtoncemetery.mil", "history.army.mil",
  "okhistory.org", "lrl.texas.gov", "energy.gov", "cemetery.texas.gov", "capitol.texas.gov",
  "humanitiestexas.org", "texashistory.unt.edu", "tpwd.texas.gov", "thc.texas.gov", "king-ranch.com",
  "banking.senate.gov", "gao.gov", "uiltexas.org", "utpress.utexas.edu", "smu.edu", "txcourts.gov",
  "justice.gov", "oig.justice.gov",
]) if (!research.includes(domain)) failures.push(`History research is missing expected institutional source authority: ${domain}.`);
for (const contextualToken of [
  "Vietnam", "slaveowner", "enslaved labor", "September 11", "Watergate",
  "end of the Cold War", "women and minority", "longest-serving Speaker", "exact circumstances", "Gulf War",
  "Tejano citizenship", "slave trading", "Texas-born president", "Joe", "Santa Fe Expedition",
  "Yucatán-born", "Supreme Court", "Pacific Ocean Areas", "post-traumatic stress disorder", "first woman senator from Texas",
  "only Mexican Texan", "different leadership titles", "Highway Beautification Act", "more than fourteen years", "Kennedy assassination",
  "first Mexican American from Texas", "first Mexican American woman elected", "differ between 1899 and 1900",
  "Interwoven: A Pioneer Chronicle", "orphaned southern-plains bison", "roughly 614,000 acres",
  "supervising enslaved Black labor", "Railroad Commission", "first woman elected governor of Texas", "opposed school integration",
  "Democratic-to-Republican", "anti-lynching", "five enslaved people", "three days", "$65,000",
  "forcibly returned to white society", "exact death date is uncertain", "Orator of the Plains",
  "civilian murder trial", "only Black member of the Texas delegation", "Screwmen's Benevolent Association", "lily-white",
  "longest-serving director", "Anglo-centered", "phase out illicit player payments", "first African American justice",
  "first Hispanic attorney general", "failed to adequately supervise", "mishandled highly classified materials",
]) if (!research.includes(contextualToken)) failures.push(`History research is missing required contextual coverage: ${contextualToken}.`);

const reusedTalentSlug = "j-frank-dobie";
if (!records.some((record) => record.slug === reusedTalentSlug && record.rank === 45)) failures.push("J. Frank Dobie must remain roster rank 45 for duplicate-reuse governance.");
if (!talentProfiles.includes(`slug: "${reusedTalentSlug}"`)) failures.push("J. Frank Dobie's existing Texas Talent profile must remain available for Icons reuse.");
if (!talentReadiness.includes(`"${reusedTalentSlug}"`)) failures.push("J. Frank Dobie's existing Texas Talent readiness record must remain available for Icons reuse.");
if (research.includes(`slug: "${reusedTalentSlug}"`)) failures.push("J. Frank Dobie must reuse Texas Talent and must not gain a duplicate Texas Icons research profile.");

const historyPoliticsRecords = records.filter((record) => record.category === "History & Politics");
const coveredHistorySlugs = new Set([...researchedHistorySlugs, reusedTalentSlug]);
if (historyPoliticsRecords.length !== 50) failures.push(`History & Politics must retain exactly 50 roster records; found ${historyPoliticsRecords.length}.`);
if (coveredHistorySlugs.size !== 50) failures.push(`History & Politics coverage must resolve to exactly 50 unique slugs; found ${coveredHistorySlugs.size}.`);
for (const record of historyPoliticsRecords) {
  if (!coveredHistorySlugs.has(record.slug)) failures.push(`History & Politics roster entry lacks research/reuse coverage: rank ${record.rank} ${record.slug}.`);
}
for (const slug of coveredHistorySlugs) {
  if (!historyPoliticsRecords.some((record) => record.slug === slug)) failures.push(`History & Politics coverage references a non-category slug: ${slug}.`);
}

for (const token of [
  "loadTexasTalentProfilesServer", "loadTexasKnowledgeGraph", "canonicalEntityPath", "uniqueMatch",
  'entry.subjectType === "place"', "isTexasTalentPublishable", "TEXAS_ICON_RESEARCH_HISTORY_BATCH_1",
  "TEXAS_ICON_RESEARCH_HISTORY_BATCH_2", "TEXAS_ICON_RESEARCH_HISTORY_BATCH_3", "TEXAS_ICON_RESEARCH_HISTORY_BATCH_4",
  "TEXAS_ICON_RESEARCH_HISTORY_BATCH_5", "TEXAS_ICON_RESEARCH_HISTORY_BATCH_6", "TEXAS_ICON_RESEARCH_HISTORY_BATCH_7",
  "TEXAS_ICON_RESEARCH_HISTORY_BATCH_8", "TEXAS_ICON_RESEARCH_HISTORY_BATCH_9", "TEXAS_ICON_RESEARCH_HISTORY_BATCH_10",
  "TEXAS_ICON_RESEARCH_PROFILES", 'reuseKind: "icon-research-staged"', "matchedResearchSlug",
  'resolved.reuseKind === "icon-research-staged"',
]) if (!server.includes(token)) failures.push(`Texas Icons duplicate/research resolver contract missing: ${token}`);
const talentPrecedence = server.indexOf("if (talentProfile)");
const researchPrecedence = server.indexOf("if (researchProfile)");
if (talentPrecedence < 0 || researchPrecedence < 0 || talentPrecedence > researchPrecedence) failures.push("Existing Texas Talent records must resolve before Texas Icons narrative research.");
const narrativeResearchBlock = server.match(/if \(researchProfile\) \{([\s\S]*?)\n  \}/)?.[1] ?? "";
if (!narrativeResearchBlock.includes('reuseKind: "icon-research-staged"') || !narrativeResearchBlock.includes("indexableAtOwnRoute: true")) failures.push("Completed sourced Texas Icons narratives must publish at their own route while retaining research provenance.");

for (const token of ['createServerFn({ method: "GET" })', 'import("./texas-icons.server")', "loadTexasIconsServer", "loadTexasIconProfileServer"]) {
  if (!functions.includes(token)) failures.push(`Texas Icons server-function boundary missing: ${token}`);
}
if (!hub.includes('from "@/data/texas-icons.functions"') || !profile.includes('from "@/data/texas-icons.functions"')) failures.push("Texas Icons public routes must load server data only through texas-icons.functions.ts.");
if (hub.includes('import("@/data/texas-icons.server")') || profile.includes('import("@/data/texas-icons.server")')) failures.push("Texas Icons public routes must never directly import the .server resolver.");

const conditionalBlock = publicRoutes.match(/export const CONDITIONAL_INDEXABLE_PUBLIC_PATHS = \[([\s\S]*?)\] as const;/)?.[1] ?? "";
if (!conditionalBlock.includes('"/texas-icons"')) failures.push("Texas Icons hub must remain explicitly classified as a conditional-index public route.");
if (!/node-version:\s*22\b/.test(workflow)) failures.push("Texas Icons validation workflow must use the repository-supported Node 22 runtime.");
if (!workflow.includes('"src/data/texas-icons-research-*.server.ts"')) failures.push("Texas Icons workflow must run when narrative research profile batches change.");

for (const token of [
  "CANONICAL_PATHS", '"/destination/the-alamo"', '"/destination/cadillac-ranch"',
  '"/destination/palo-duro-canyon-state-park"', '"/destination/big-bend-national-park"',
  '"/destination/space-center-houston"', '"/dr-pepper-texas-history"',
  '"/texas-chili-con-carne-history"', '"/article/history-of-the-texas-flag"',
]) if (!rosterSource.includes(token)) failures.push(`Texas Icons explicit canonical reuse missing: ${token}`);

for (const token of ["Existing canonical pages reused", "Texas Talent records reused", "Written profiles published", "Data-only records", "Data stays data; written profiles publish"]) {
  if (!hub.includes(token)) failures.push(`Texas Icons hub publication safeguard missing: ${token}`);
}
for (const token of ['throw redirect({ href: result.icon.href, statusCode: 301 })', "if (!result.talentProfile && !result.researchProfile) throw notFound();", "Cross-linked profiles", "const schema = {", "Research trail", "Last reviewed"]) {
  if (!profile.includes(token)) failures.push(`Texas Icons profile publication safeguard missing: ${token}`);
}
if (!server.includes("getRelatedTexasIcons(entry, 8)")) failures.push("Texas Icons related-profile resolver must retain eight same-category cross-links.");
if (!/Description (?:field|column).*roster note.*not a publishable authority citation\./s.test(rosterSource)) failures.push("Texas Icons source provenance must distinguish roster notes from authority citations.");
if (!/short intake records are not articles[\s\S]*do not get standalone public profile pages\./.test(hub)) failures.push("Texas Icons hub must disclose that data-only intake records are not public narrative profiles.");

if (failures.length) fail();
console.log(`Texas Icons validation passed: ${records.length} unique source records, all 50 History & Politics roster positions covered by ${researchedHistorySlugs.length} substantive sourced research profiles plus one protected Texas Talent reuse, protected duplicate resolution, server-only data boundary, conditional route governance, canonical reuse, written-content publication with data-only rows withheld, and eight related-profile links per record.`);

function fail() {
  console.error("Texas Icons validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}
function slugify(value) {
  return value.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/&/g, " and ").replace(/['’]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
function normalize(value) {
  return value.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/&/g, " and ").replace(/['’".,()]/g, "").replace(/\b(the)\b/g, " ").replace(/[^a-z0-9]+/g, " ").trim().replace(/\s+/g, " ");
}
function parseCsv(source) {
  const rows = []; let row = []; let field = ""; let quoted = false;
  for (let index = 0; index < source.length; index += 1) {
    const character = source[index]; const next = source[index + 1];
    if (quoted) {
      if (character === '"' && next === '"') { field += '"'; index += 1; }
      else if (character === '"') quoted = false;
      else field += character;
      continue;
    }
    if (character === '"') quoted = true;
    else if (character === ",") { row.push(field); field = ""; }
    else if (character === "\n") { row.push(field.replace(/\r$/, "")); rows.push(row); row = []; field = ""; }
    else field += character;
  }
  if (field.length || row.length) { row.push(field.replace(/\r$/, "")); rows.push(row); }
  return rows;
}