import fs from "node:fs";

const groups = [
  {
    files: ["src/data/fixtures/lazy-relocation-authority-wave5.ts", "src/data/fixtures/relocation-authority-wave5.ts"],
    slugs: [
      "moving-to-texas-renter-guide",
      "how-to-verify-texas-moving-company",
      "health-insurance-when-moving-to-texas",
      "military-family-moving-to-texas",
    ],
  },
  {
    files: ["src/data/fixtures/lazy-relocation-authority-expansion.ts", "src/data/fixtures/relocation-authority-expansion.ts"],
    slugs: [
      "best-houston-suburbs-for-commuters",
      "best-dallas-suburbs-for-commuters",
      "texas-property-taxes-for-new-residents",
      "corporate-relocation-to-texas",
      "employee-relocation-guide-to-texas",
    ],
  },
];

const subjectWords = new Map([
  ["moving-to-texas-renter-guide", /apartment|rental|housing/i],
  ["how-to-verify-texas-moving-company", /mover|moving truck/i],
  ["health-insurance-when-moving-to-texas", /clinic|health|patient/i],
  ["military-family-moving-to-texas", /military|air force|PCS/i],
  ["best-houston-suburbs-for-commuters", /Houston|Katy|commut/i],
  ["best-dallas-suburbs-for-commuters", /Dallas|DART|commut/i],
  ["texas-property-taxes-for-new-residents", /appraisal|tax/i],
  ["corporate-relocation-to-texas", /office|corporate|business/i],
  ["employee-relocation-guide-to-texas", /employee|office|work/i],
]);

const failures = [];
const seenImages = new Map();

function parseFile(file, slugs) {
  const source = fs.readFileSync(file, "utf8");
  const imports = new Map([...source.matchAll(/import\s+(\w+)\s+from\s+["']([^"']+)["']/g)].map((match) => [match[1], match[2]]));
  const heroObjects = new Map();
  for (const match of source.matchAll(/const\s+(\w+)\s*:\s*Article\["hero"\]\s*=\s*\{([\s\S]*?)\n\};/g)) {
    const value = match[2];
    const src = value.match(/\bsrc:\s*(["'])(.*?)\1/)?.[2] ?? value.match(/\bsrc:\s*(\w+)/)?.[1];
    heroObjects.set(match[1], {
      src: imports.get(src) ?? src,
      alt: value.match(/\balt:\s*"([^"]+)"/)?.[1] ?? "",
      credit: value.match(/\bcredit:\s*"([^"]+)"/)?.[1] ?? "",
      width: Number(value.match(/\bwidth:\s*(\d+)/)?.[1] ?? 0),
      height: Number(value.match(/\bheight:\s*(\d+)/)?.[1] ?? 0),
    });
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

for (const group of groups) {
  const snapshots = group.files.map((file) => ({ file, records: parseFile(file, group.slugs) }));
  for (const slug of group.slugs) {
    const [lazyHero, fullHero] = snapshots.map(({ records }) => records.get(slug));
    if (!lazyHero || !fullHero) continue;
    if (JSON.stringify(lazyHero) !== JSON.stringify(fullHero)) failures.push(`${slug}: lazy and full hero data differ`);
    if (lazyHero.width < 1200 || lazyHero.height < 1 || !lazyHero.alt.trim()) failures.push(`${slug}: missing 1200px image or useful alt text`);
    if (subjectWords.has(slug)) {
      if (!subjectWords.get(slug).test(lazyHero.alt)) failures.push(`${slug}: alt text does not describe this article's topic`);
      if (!lazyHero.src?.startsWith("https://upload.wikimedia.org/wikipedia/commons/") ||
        !/public domain|CC0|CC BY-SA/i.test(lazyHero.credit)) {
        failures.push(`${slug}: missing Wikimedia media and documented commercial reuse status`);
      }
    }
    const key = lazyHero.src?.replace(/[?#].*$/, "").toLowerCase();
    if (!key) continue;
    if (seenImages.has(key)) failures.push(`Repeat image used for ${slug} and ${seenImages.get(key)}`);
    seenImages.set(key, slug);
  }
}

if (seenImages.size !== 9) failures.push(`Only ${seenImages.size} distinct relocation hero URLs; expected nine`);
if (failures.length) {
  console.error("Texas Life relocation image uniqueness and provenance validation failed:");
  for (const failure of failures) console.error("- " + failure);
  process.exit(1);
}
console.log("PASS: nine distinct Texas Life relocation images; subject-specific alt text; recorded reuse rights; matching full and lazy article registries.");
