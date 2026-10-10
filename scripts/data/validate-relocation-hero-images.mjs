import fs from "node:fs";

const files = [
  "src/data/fixtures/lazy-relocation-authority-wave5.ts",
  "src/data/fixtures/relocation-authority-wave5.ts",
];
const slugs = [
  "moving-to-texas-renter-guide",
  "how-to-verify-texas-moving-company",
  "health-insurance-when-moving-to-texas",
  "military-family-moving-to-texas",
];
const subjectWords = new Map([
  ["how-to-verify-texas-moving-company", /mover|moving truck/i],
  ["health-insurance-when-moving-to-texas", /clinic|health|patient/i],
  ["military-family-moving-to-texas", /military|air force|PCS/i],
]);

const failures = [];
const snapshots = [];

function parseFile(file) {
  const source = fs.readFileSync(file, "utf8");
  const imports = new Map([...source.matchAll(/import\s+(\w+)\s+from\s+["']([^"']+)["']/g)].map((match) => [match[1], match[2]]));
  const heroObjects = new Map();

  for (const match of source.matchAll(/const\s+(\w+)\s*:\s*Article\["hero"\]\s*=\s*\{([\s\S]*?)\n\};/g)) {
    const value = match[2];
    const src = value.match(/\bsrc:\s*(["'])(.*?)\1/)?.[2] ?? value.match(/\bsrc:\s*(\w+)/)?.[1];
    const alt = value.match(/\balt:\s*"([^"]+)"/)?.[1] ?? "";
    const credit = value.match(/\bcredit:\s*"([^"]+)"/)?.[1] ?? "";
    const width = Number(value.match(/\bwidth:\s*(\d+)/)?.[1] ?? 0);
    const height = Number(value.match(/\bheight:\s*(\d+)/)?.[1] ?? 0);
    heroObjects.set(match[1], { src: imports.get(src) ?? src, alt, credit, width, height });
  }

  const records = new Map();
  const slugMatches = [...source.matchAll(/\bslug:\s*"([^"]+)"/g)];
  for (let i = 0; i < slugMatches.length; i++) {
    const match = slugMatches[i];
    if (!slugs.includes(match[1])) continue;
    const segment = source.slice(match.index, slugMatches[i + 1]?.index ?? source.length);
    const alias = segment.match(/\bhero:\s*(\w+)/)?.[1];
    const hero = heroObjects.get(alias);
    if (!hero) failures.push(`${file}: missing or unresolved hero for ${match[1]}`);
    else records.set(match[1], hero);
  }

  for (const slug of slugs) if (!records.has(slug)) failures.push(`${file}: missing ${slug}`);
  return records;
}

for (const file of files) snapshots.push({ file, records: parseFile(file) });

for (const slug of slugs) {
  const entries = snapshots.map(({ file, records }) => ({ file, hero: records.get(slug) }));
  if (entries.some((entry) => !entry.hero)) continue;
  const [first, second] = entries;
  if (JSON.stringify(first.hero) !== JSON.stringify(second.hero)) {
    failures.push(`${slug}: article and lazy catalog hero data do not match`);
  }
  if (first.hero.width < 1200 || first.hero.height < 1 || !first.hero.alt) {
    failures.push(`${slug}: hero does not meet image dimensions/alt requirements`);
  }
  if (subjectWords.has(slug)) {
    if (!subjectWords.get(slug).test(first.hero.alt)) failures.push(`${slug}: subject-specific alt text is missing`);
    if (!first.hero.src.startsWith("https://upload.wikimedia.org/wikipedia/commons/thumb/") ||
        !first.hero.credit.includes("public domain")) {
      failures.push(`${slug}: missing verified rights-cleared Wikimedia hero and attribution`);
    }
  }
}

const images = new Map();
for (const slug of slugs) {
  const image = snapshots[0].records.get(slug)?.src;
  if (!image) continue;
  const previous = images.get(image);
  if (previous) failures.push(`Relocation card duplicate image: ${previous} and ${slug}`);
  images.set(image, slug);
}

if (failures.length) {
  console.error("Relocation image governance validation failed:");
  for (const failure of failures) console.error("- " + failure);
  process.exit(1);
}
console.log("PASS: each relocation story has a distinct, representative hero; lazy and full records agree; all three newly assigned photographs have public-domain provenance.");
