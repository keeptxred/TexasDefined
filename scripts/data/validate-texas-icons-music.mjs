import fs from "node:fs";

const rosterPath = "src/data/texas-icons-roster.server.ts";
const sourcePath = "src/data/texas-icons-source-history-music.server.ts";
const researchPaths = [
  "src/data/texas-icons-research-music-1.server.ts",
  "src/data/texas-icons-research-music-2.server.ts",
  "src/data/texas-icons-research-music-3.server.ts",
];
const resolverPath = "src/data/texas-icons.server.ts";
const talentProfilePaths = [
  "src/data/texas-talent-profiles.ts",
  "src/data/texas-talent-profiles-wave2-music.ts",
];
const failures = [];

for (const path of [rosterPath, sourcePath, ...researchPaths, resolverPath, ...talentProfilePaths]) {
  if (!fs.existsSync(path)) failures.push(`Missing Texas Icons music contract file: ${path}`);
}
if (failures.length) fail();

const roster = fs.readFileSync(rosterPath, "utf8");
const source = fs.readFileSync(sourcePath, "utf8");
const research = researchPaths.map((path) => fs.readFileSync(path, "utf8")).join("\n");
const resolver = fs.readFileSync(resolverPath, "utf8");
const talentProfiles = talentProfilePaths.map((path) => fs.readFileSync(path, "utf8")).join("\n");

const firstThirty = [
  { rank: 51, name: "Beyoncé Knowles", iconSlug: "beyonce-knowles", talentSlug: "beyonce", mode: "reuse" },
  { rank: 52, name: "Willie Nelson", iconSlug: "willie-nelson", talentSlug: "willie-nelson", mode: "reuse" },
  { rank: 53, name: "Selena Quintanilla", iconSlug: "selena-quintanilla", talentSlug: "selena", mode: "reuse" },
  { rank: 54, name: "George Strait", iconSlug: "george-strait", talentSlug: "george-strait", mode: "reuse" },
  { rank: 55, name: "Stevie Ray Vaughan", iconSlug: "stevie-ray-vaughan", talentSlug: "stevie-ray-vaughan", mode: "reuse" },
  { rank: 56, name: "Janis Joplin", iconSlug: "janis-joplin", talentSlug: "janis-joplin", mode: "reuse" },
  { rank: 57, name: "Buddy Holly", iconSlug: "buddy-holly", talentSlug: "buddy-holly", mode: "reuse" },
  { rank: 58, name: "ZZ Top", iconSlug: "zz-top", mode: "research" },
  { rank: 59, name: "Waylon Jennings", iconSlug: "waylon-jennings", talentSlug: "waylon-jennings", mode: "reuse" },
  { rank: 60, name: "Scott Joplin", iconSlug: "scott-joplin", mode: "research" },
  { rank: 61, name: "Blind Lemon Jefferson", iconSlug: "blind-lemon-jefferson", mode: "research" },
  { rank: 62, name: "Lead Belly", iconSlug: "lead-belly", talentSlug: "lead-belly", mode: "reuse" },
  { rank: 63, name: "Roy Orbison", iconSlug: "roy-orbison", talentSlug: "roy-orbison", mode: "reuse" },
  { rank: 64, name: "Kris Kristofferson", iconSlug: "kris-kristofferson", mode: "research" },
  { rank: 65, name: "Kenny Rogers", iconSlug: "kenny-rogers", mode: "research" },
  { rank: 66, name: "Ernest Tubb", iconSlug: "ernest-tubb", mode: "research" },
  { rank: 67, name: "Bob Wills", iconSlug: "bob-wills", mode: "research" },
  { rank: 68, name: "Lyle Lovett", iconSlug: "lyle-lovett", mode: "research" },
  { rank: 69, name: "Robert Earl Keen", iconSlug: "robert-earl-keen", mode: "research" },
  { rank: 70, name: "Townes Van Zandt", iconSlug: "townes-van-zandt", talentSlug: "townes-van-zandt", mode: "reuse" },
  { rank: 71, name: "Guy Clark", iconSlug: "guy-clark", mode: "research" },
  { rank: 72, name: "Lightnin' Hopkins", iconSlug: "lightnin-hopkins", talentSlug: "lightnin-hopkins", mode: "reuse" },
  { rank: 73, name: "T-Bone Walker", iconSlug: "t-bone-walker", talentSlug: "t-bone-walker", mode: "reuse" },
  { rank: 74, name: "Freddie King", iconSlug: "freddie-king", mode: "research" },
  { rank: 75, name: "Albert Collins", iconSlug: "albert-collins", mode: "research" },
  { rank: 76, name: "Don Henley", iconSlug: "don-henley", talentSlug: "don-henley", mode: "reuse" },
  { rank: 77, name: "Miranda Lambert", iconSlug: "miranda-lambert", talentSlug: "miranda-lambert", mode: "reuse" },
  { rank: 78, name: "Kelly Clarkson", iconSlug: "kelly-clarkson", talentSlug: "kelly-clarkson", mode: "reuse" },
  { rank: 79, name: "Kacey Musgraves", iconSlug: "kacey-musgraves", talentSlug: "kacey-musgraves", mode: "reuse" },
  { rank: 80, name: "Travis Scott", iconSlug: "travis-scott", mode: "research" },
];

for (const entry of firstThirty) {
  if (!source.includes(`${entry.rank},${entry.name},Music & Culture,`)) {
    failures.push(`Music & Culture roster drift at rank ${entry.rank}: expected ${entry.name}.`);
  }
}

const researchEntries = firstThirty.filter((entry) => entry.mode === "research");
for (const entry of researchEntries) {
  if (!research.includes(`slug: "${entry.iconSlug}"`)) failures.push(`Missing dedicated music research profile: ${entry.iconSlug}.`);
}
if ((research.match(/editorialStatus: "researched-staged"/g) ?? []).length !== researchEntries.length) {
  failures.push(`Music ranks 51–80 must contain exactly ${researchEntries.length} researched-staged profiles.`);
}
if ((research.match(/publicationNote:/g) ?? []).length !== researchEntries.length) failures.push("Every music research profile needs a publication boundary note.");
if ((research.match(/lastReviewedAt: reviewed/g) ?? []).length !== researchEntries.length) failures.push("Every music research profile needs a reviewed date.");
const sourceUrls = [...research.matchAll(/url: "(https:\/\/[^\"]+)"/g)].map((match) => match[1]);
if (sourceUrls.length < researchEntries.length * 3) failures.push(`Music ranks 51–80 need at least three HTTPS sources per research profile; found ${sourceUrls.length}.`);
for (const domain of [
  "tshaonline.org", "rockhall.com", "zztop.com", "txculturaltrust.org", "loc.gov",
  "thc.texas.gov", "countrymusichalloffame.org", "kriskristofferson.com", "songhall.org",
  "kennyrogers.com", "tcmhof.com", "stories.tamu.edu", "grammy.com", "hias.tamu.edu",
  "robertearlkeen.com", "nashvillesongwritersfoundation.com", "blues.org", "houstontx.gov",
]) {
  if (!research.includes(domain)) failures.push(`Music research is missing expected authority domain: ${domain}.`);
}
for (const token of [
  "Frank Beard", "August 17, 2026", "intended to continue", "Dusty Hill",
  "exact birthplace remains uncertain", "Texarkana", "Treemonisha", "Maple Leaf Rag",
  "surviving record does not support a single certain birth date", "cause of his blindness is also unknown",
  "Brownsville is the birthplace chapter", "public housing", "1939 tonsillectomy", "Tulsa",
  "The Front Porch Song", "Distinguished Alumnus", "Monahans", "Armadillo World Headquarters",
  "Showdown!", "Telecaster", "Missouri City", "killed ten people",
  "without assigning individual criminal responsibility",
]) {
  if (!research.includes(token)) failures.push(`Music research is missing required editorial context: ${token}.`);
}

const reuseEntries = firstThirty.filter((entry) => entry.mode === "reuse");
for (const entry of reuseEntries) {
  if (!talentProfiles.includes(`slug: "${entry.talentSlug}"`)) {
    failures.push(`Music rank ${entry.rank} must reuse existing Texas Talent slug ${entry.talentSlug}.`);
  }
  if (research.includes(`slug: "${entry.iconSlug}"`) || research.includes(`slug: "${entry.talentSlug}"`)) {
    failures.push(`Music rank ${entry.rank} ${entry.name} must not gain a duplicate Icons research profile.`);
  }
}

for (const aliasToken of [
  '"Beyoncé Knowles": ["Beyoncé", "Beyonce Knowles", "Beyonce"]',
  '"Selena Quintanilla": ["Selena", "Selena Quintanilla-Pérez", "Selena Quintanilla-Perez"]',
  '"Lead Belly": ["Huddie Ledbetter", "Huddie William Ledbetter"]',
  "\"Lightnin' Hopkins\": [\"Lightnin Hopkins\"]",
  '"T-Bone Walker": ["T Bone Walker"]',
]) {
  if (!roster.includes(aliasToken)) failures.push(`Music duplicate resolution is missing roster alias contract: ${aliasToken}.`);
}

for (const token of [
  'TEXAS_ICON_RESEARCH_MUSIC_BATCH_1',
  'from "@/data/texas-icons-research-music-1.server"',
  '...TEXAS_ICON_RESEARCH_MUSIC_BATCH_1',
  'TEXAS_ICON_RESEARCH_MUSIC_BATCH_2',
  'from "@/data/texas-icons-research-music-2.server"',
  '...TEXAS_ICON_RESEARCH_MUSIC_BATCH_2',
  'TEXAS_ICON_RESEARCH_MUSIC_BATCH_3',
  'from "@/data/texas-icons-research-music-3.server"',
  '...TEXAS_ICON_RESEARCH_MUSIC_BATCH_3',
]) {
  if (!resolver.includes(token)) failures.push(`Music research resolver wiring missing: ${token}.`);
}
const talentPrecedence = resolver.indexOf("if (talentProfile)");
const researchPrecedence = resolver.indexOf("if (researchProfile)");
if (talentPrecedence < 0 || researchPrecedence < 0 || talentPrecedence > researchPrecedence) {
  failures.push("Texas Talent must continue to resolve before Texas Icons research profiles.");
}
const researchPublicationBlock = resolver.match(/if \(researchProfile\) \{([\s\S]*?)\n  \}/)?.[1] ?? "";
if (!researchPublicationBlock.includes('reuseKind: "icon-research-staged"') || !researchPublicationBlock.includes("indexableAtOwnRoute: true")) {
  failures.push("Substantive music research profiles must publish at their canonical Texas Icons routes while data-only starter records remain withheld.");
}

const firstTen = firstThirty.filter((entry) => entry.rank <= 60);
const secondTen = firstThirty.filter((entry) => entry.rank >= 61 && entry.rank <= 70);
const thirdTen = firstThirty.filter((entry) => entry.rank >= 71);
const firstTenReuse = firstTen.filter((entry) => entry.mode === "reuse");
const firstTenResearch = firstTen.filter((entry) => entry.mode === "research");
const secondTenReuse = secondTen.filter((entry) => entry.mode === "reuse");
const secondTenResearch = secondTen.filter((entry) => entry.mode === "research");
const thirdTenReuse = thirdTen.filter((entry) => entry.mode === "reuse");
const thirdTenResearch = thirdTen.filter((entry) => entry.mode === "research");
if (new Set(firstThirty.map((entry) => entry.iconSlug)).size !== 30) failures.push("Music ranks 51–80 must resolve to thirty unique roster slugs.");
if (reuseEntries.length !== 17 || researchEntries.length !== 13) failures.push(`Music ranks 51–80 must remain 17 Talent reuses + 13 research profiles; found ${reuseEntries.length} reuse and ${researchEntries.length} research.`);
if (firstTenReuse.length !== 8 || firstTenResearch.length !== 2) failures.push(`Music ranks 51–60 must remain 8 Talent reuses + 2 research profiles; found ${firstTenReuse.length} reuse and ${firstTenResearch.length} research.`);
if (secondTenReuse.length !== 3 || secondTenResearch.length !== 7) failures.push(`Music ranks 61–70 must remain 3 Talent reuses + 7 research profiles; found ${secondTenReuse.length} reuse and ${secondTenResearch.length} research.`);
if (thirdTenReuse.length !== 6 || thirdTenResearch.length !== 4) failures.push(`Music ranks 71–80 must remain 6 Talent reuses + 4 research profiles; found ${thirdTenReuse.length} reuse and ${thirdTenResearch.length} research.`);

if (failures.length) fail();
console.log("Texas Icons music validation passed: ranks 51–80 preserve 17 Texas Talent reuses, 13 substantive sourced research profiles, alias-safe duplicate resolution, source depth, canonical written-content publication, and batch-specific editorial context.");

function fail() {
  console.error("Texas Icons music validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}