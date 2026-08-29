import fs from "node:fs";
import path from "node:path";

const dataDir = "src/data";
const resolverPath = "src/data/texas-icons.server.ts";
const typesPath = "src/data/texas-icons-types.ts";
const routePath = "src/routes/texas-icons_.$slug.tsx";

const failures = [];
const researchFiles = fs
  .readdirSync(dataDir)
  .filter((name) => /^texas-icons-research-.*\.server\.ts$/.test(name))
  .sort();
const stagedSlugs = new Map();
let profileCount = 0;

function decodeDoubleQuotedString(raw) {
  try {
    return JSON.parse(`"${raw}"`);
  } catch {
    return raw;
  }
}

function moduleStringConstants(source) {
  const constants = new Map();
  for (const match of source.matchAll(
    /^const\s+([A-Za-z_$][\w$]*)\s*=\s*"((?:\\.|[^"\\])*)";/gm,
  )) {
    constants.set(match[1], decodeDoubleQuotedString(match[2]));
  }
  return constants;
}

function publicationNoteForBlock(block, constants) {
  const literalMatch = block.match(
    /^\s{4}publicationNote:\s*"((?:\\.|[^"\\])*)",/m,
  );
  if (literalMatch) return decodeDoubleQuotedString(literalMatch[1]);

  const identifierMatch = block.match(
    /^\s{4}publicationNote:\s*([A-Za-z_$][\w$]*),/m,
  );
  if (identifierMatch) return constants.get(identifierMatch[1]) ?? null;

  return null;
}

if (!researchFiles.length) {
  failures.push("No staged Texas Icons research modules were found.");
}

for (const file of researchFiles) {
  const source = fs.readFileSync(path.join(dataDir, file), "utf8");
  const constants = moduleStringConstants(source);
  const profileMatches = [...source.matchAll(/^\s{4}slug:\s*"([^"]+)",/gm)];

  if (!profileMatches.length) {
    failures.push(`${file} does not contain any top-level staged research profiles.`);
    continue;
  }

  for (let index = 0; index < profileMatches.length; index += 1) {
    const match = profileMatches[index];
    const slug = match[1];
    const start = match.index ?? 0;
    const end = profileMatches[index + 1]?.index ?? source.lastIndexOf("];\n");
    const block = source.slice(start, end > start ? end : source.length);
    profileCount += 1;

    const previousFile = stagedSlugs.get(slug);
    if (previousFile) {
      failures.push(`Duplicate staged Texas Icons research slug ${slug} appears in ${previousFile} and ${file}.`);
    } else {
      stagedSlugs.set(slug, file);
    }

    if (!/^\s{4}editorialStatus:\s*"researched-staged",/m.test(block)) {
      failures.push(`${file}:${slug} must remain editorialStatus \"researched-staged\".`);
    }

    const note = publicationNoteForBlock(block, constants);
    if (!note) {
      failures.push(`${file}:${slug} must have a resolvable publicationNote readiness blocker.`);
      continue;
    }

    if (!/noindex/i.test(note)) {
      failures.push(`${file}:${slug} publicationNote must explicitly preserve noindex.`);
    }
    if (!/image[-\s]?rights/i.test(note)) {
      failures.push(`${file}:${slug} publicationNote must explicitly preserve the image-rights blocker.`);
    }
    if (!/internal[-\s]?link/i.test(note)) {
      failures.push(`${file}:${slug} publicationNote must explicitly preserve the internal-link blocker.`);
    }
    if (!/(pending|until|remain|keep|review|certif|complete)/i.test(note)) {
      failures.push(`${file}:${slug} publicationNote must make clear that readiness work remains incomplete.`);
    }
  }
}

if (!profileCount) {
  failures.push("No staged Texas Icons research profiles were audited.");
}

const types = fs.readFileSync(typesPath, "utf8");
const researchTypeMatch = types.match(
  /export type TexasIconResearchProfile = TexasIconNarrativeProfile & \{([\s\S]*?)\n\};/,
);
if (!researchTypeMatch) {
  failures.push("TexasIconResearchProfile type contract is missing.");
} else {
  const researchType = researchTypeMatch[1];
  if (!/editorialStatus:\s*"researched-staged";/.test(researchType)) {
    failures.push("TexasIconResearchProfile must remain locked to editorialStatus \"researched-staged\".");
  }
  if (/editorialStatus:[^;]*\|/.test(researchType)) {
    failures.push("TexasIconResearchProfile editorialStatus must not gain a publishable status union.");
  }
  if (!/publicationNote:\s*string;/.test(researchType)) {
    failures.push("TexasIconResearchProfile must retain its publicationNote readiness blocker.");
  }
}

const resolver = fs.readFileSync(resolverPath, "utf8");
const talentBranch = resolver.indexOf("if (talentProfile)");
const researchBranch = resolver.indexOf("if (researchProfile)");
if (talentBranch < 0 || researchBranch < 0 || talentBranch >= researchBranch) {
  failures.push("Texas Talent ownership must continue to resolve before Texas Icons staged research.");
}

if (talentBranch >= 0 && researchBranch > talentBranch) {
  const talentBlock = resolver.slice(talentBranch, researchBranch);
  if (!talentBlock.includes("indexableAtOwnRoute: false")) {
    failures.push("Texas Talent-owned subjects must not make the Texas Icons route indexable.");
  }
}

if (researchBranch >= 0) {
  const researchEnd = resolver.indexOf("\n  return {", researchBranch);
  const researchBlock = resolver.slice(
    researchBranch,
    researchEnd > researchBranch ? researchEnd : resolver.length,
  );
  if (!researchBlock.includes('reuseKind: "icon-research-staged"')) {
    failures.push("Staged research must continue to resolve as icon-research-staged.");
  }
  if (!researchBlock.includes("indexableAtOwnRoute: false")) {
    failures.push("Staged research must remain non-indexable at its own route.");
  }
  if (!researchBlock.includes("`/texas-icons/${entry.slug}`")) {
    failures.push("Staged research must continue to reuse the stable Texas Icons slug.");
  }
}

if (!resolver.includes('resolved.reuseKind === "icon-research-staged" && researchProfile')) {
  failures.push("The server loader must expose research copy only for icon-research-staged resolution.");
}

const route = fs.readFileSync(routePath, "utf8");
if (!route.includes("robots: loaderData.icon.indexableAtOwnRoute")) {
  failures.push("Texas Icons route metadata must keep robots tied to indexableAtOwnRoute.");
}
if (!route.includes('"noindex, follow, max-image-preview:large"')) {
  failures.push("Texas Icons route must retain the noindex fallback for staged profiles.");
}
if (!route.includes("const schema = talentProfile")) {
  failures.push("Texas Icons structured data must remain gated to an owned Texas Talent profile.");
}
if (!route.includes("Researched draft · noindex")) {
  failures.push("Texas Icons researched drafts must retain the visible noindex editorial marker.");
}
if (!route.includes("profile.publicationNote")) {
  failures.push("Texas Icons researched drafts must continue to display their publication blocker note.");
}
if (!route.includes("does not emit") || !route.includes("cannot become indexable")) {
  failures.push("Texas Icons researched-draft notice must continue to explain the closed publication boundary.");
}

if (failures.length) {
  console.error("Texas Icons staged-readiness validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(
  `Texas Icons staged-readiness validation passed: ${profileCount} researched profiles across ${researchFiles.length} server-only research modules retain explicit noindex, image-rights and internal-link blockers; type, resolver and route publication boundaries remain closed.`,
);
