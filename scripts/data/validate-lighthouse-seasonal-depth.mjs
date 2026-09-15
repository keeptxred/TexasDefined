import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const articles = read("src/data/fixtures/lighthouse-seasonal-authority-articles.ts");
const loader = read("src/data/fixtures/lazy-seasonal-authority.ts");
const errors = [];

const targets = [
  {
    slug: "port-isabel-lighthouse-guide",
    required: [
      "Why Point Isabel needed a lighthouse",
      "The Fresnel lens brought light back in 2022",
      "What the climb actually involves",
      "Hours, tickets and the check-before-you-drive rule",
      "Build a bigger lower-coast history day",
    ],
  },
  {
    slug: "lost-lighthouses-of-texas",
    required: [
      "Brazos Santiago: a lighthouse lost to war and a changing harbor",
      "Red Fish Bar and the hidden hazards inside Galveston Bay",
      "Matagorda Bay lost lights to war and hurricanes",
      "Half Moon Reef survived—but not where it worked",
      "What 'lost' actually means on the Texas coast",
    ],
  },
];

function articleBlock(slug) {
  const start = articles.indexOf(`slug: \"${slug}\"`);
  if (start < 0) return "";
  const next = articles.indexOf("\n  {\n    id:", start + 1);
  return articles.slice(start, next > start ? next : articles.length);
}

function bodyWordCount(block) {
  const bodyStart = block.indexOf("body: [");
  if (bodyStart < 0) return 0;
  const body = block.slice(bodyStart);
  const textLiterals = [...body.matchAll(/text: \"((?:\\.|[^\"\\])*)\"/g)].map((match) => match[1]);
  const listBodies = [...body.matchAll(/items: \[([^\]]*)\]/g)].map((match) => match[1]);
  const combined = [...textLiterals, ...listBodies].join(" ")
    .replace(/\\\"/g, '"')
    .replace(/\\'/g, "'");
  return (combined.match(/[A-Za-z0-9]+(?:['’][A-Za-z0-9]+)*/g) ?? []).length;
}

for (const target of targets) {
  const block = articleBlock(target.slug);
  if (!block) {
    errors.push(`Missing canonical deep lighthouse article: ${target.slug}`);
    continue;
  }

  const words = bodyWordCount(block);
  const paragraphs = (block.match(/type: \"paragraph\"/g) ?? []).length;
  const headings = (block.match(/type: \"heading\"/g) ?? []).length;
  if (words < 900) errors.push(`${target.slug}: only ${words} body words; minimum is 900`);
  if (paragraphs < 12) errors.push(`${target.slug}: only ${paragraphs} paragraphs; minimum is 12`);
  if (headings < 8) errors.push(`${target.slug}: only ${headings} headings; minimum is 8`);
  if (!block.includes("readingMinutes: 7")) errors.push(`${target.slug}: reading time must stay aligned to the expanded body`);
  if (!block.includes('sourceName: "Texas Historical Commission"')) errors.push(`${target.slug}: missing Texas Historical Commission source authority`);
  if (!block.includes("internalLinks: [")) errors.push(`${target.slug}: missing internal authority links`);
  for (const marker of target.required) {
    if (!block.includes(marker)) errors.push(`${target.slug}: missing researched section ${marker}`);
  }
}

for (const marker of [
  '"port-isabel-lighthouse-guide"',
  '"lost-lighthouses-of-texas"',
  'await import("./lighthouse-seasonal-authority-articles")',
  'lighthouseSeasonalDepthSlugs.has(slug)',
]) {
  if (!loader.includes(marker)) errors.push(`Lighthouse seasonal lazy-load contract missing: ${marker}`);
}

for (const marker of [
  'slug: "port-isabel-lighthouse-guide"',
  'slug: "lost-lighthouses-of-texas"',
]) {
  const at = loader.indexOf(marker);
  const window = at >= 0 ? loader.slice(at, at + 500) : "";
  if (!window.includes("readingMinutes: 7")) errors.push(`Discovery stub reading time is stale near ${marker}`);
}

const dedicatedImportAt = loader.indexOf('await import("./lighthouse-seasonal-authority-articles")');
const genericImportAt = loader.indexOf('await import("./seasonal-authority-articles")');
if (dedicatedImportAt < 0 || genericImportAt < 0 || dedicatedImportAt > genericImportAt) {
  errors.push("Dedicated lighthouse authority resolution must intercept the two thin legacy slugs before the generic seasonal module");
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log("Lighthouse seasonal depth validation passed: Port Isabel and Lost Lighthouses retain 900+ body words, 12+ paragraphs, 8+ headings, source authority, corrected reading time and dedicated lazy resolution.");
