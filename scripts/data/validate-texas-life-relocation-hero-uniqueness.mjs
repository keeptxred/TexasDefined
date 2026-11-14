import fs from "node:fs";

const read = (file) => fs.readFileSync(file, "utf8");
const rights = read("src/data/heritage-photo-license-links.ts");
const media = [
  read("src/data/fixtures/relocation-wave5-media.ts"),
  read("src/data/fixtures/relocation-remaining-media.ts"),
];
const groups = [
  {
    files: [
      "src/data/fixtures/lazy-relocation-authority-wave5.ts",
      "src/data/fixtures/relocation-authority-wave5.ts",
    ],
    heroes: {
      "moving-to-texas-renter-guide": "renterHero",
      "how-to-verify-texas-moving-company": "moverVerificationHero",
      "health-insurance-when-moving-to-texas": "healthCoverageHero",
      "military-family-moving-to-texas": "militaryFamilyHero",
    },
  },
  {
    files: [
      "src/data/fixtures/lazy-relocation-authority-expansion.ts",
      "src/data/fixtures/relocation-authority-expansion.ts",
    ],
    heroes: {
      "best-houston-suburbs-for-commuters": "houstonCommuterHero",
      "best-dallas-suburbs-for-commuters": "dallasCommuterHero",
      "texas-property-taxes-for-new-residents": "propertyTaxHero",
      "corporate-relocation-to-texas": "corporateRelocationHero",
      "employee-relocation-guide-to-texas": "employeeRelocationHero",
    },
  },
];

const failures = [];
const used = new Map();
const sourceFor = (heroName) => {
  for (const source of media) {
    const match = source.match(new RegExp('export const ' + heroName + ': Article\\["hero"\\] = \\{([\\s\\S]*?)\\n\\};'));
    if (match) return match[1];
  }
  return "";
};
const field = (source, key) => source.match(new RegExp('\\b' + key + ': "([^"]+)"'))?.[1] ?? "";
const numberField = (source, key) => Number(source.match(new RegExp('\\b' + key + ': (\\d+)'))?.[1] ?? 0);
const normalize = (value) => {
  try {
    const u = new URL(value);
    return (u.origin + u.pathname).toLowerCase();
  } catch { return value.toLowerCase(); }
};

for (const group of groups) {
  for (const file of group.files) {
    const source = read(file);
    const slugs = [...source.matchAll(/\bslug:\s*"([^"]+)"/g)];
    for (const [slug, heroName] of Object.entries(group.heroes)) {
      const i = slugs.findIndex((entry) => entry[1] === slug);
      if (i < 0) {
        failures.push(file + ": missing slug " + slug);
        continue;
      }
      const excerpt = source.slice(slugs[i].index, slugs[i + 1]?.index ?? source.length);
      if (!new RegExp("\\bhero:\\s*" + heroName + "\\b").test(excerpt)) {
        failures.push(file + ": " + slug + " does not use " + heroName);
      }
    }
  }
  for (const [slug, heroName] of Object.entries(group.heroes)) {
    const source = sourceFor(heroName);
    if (!source) { failures.push(slug + ": missing shared hero " + heroName); continue; }
    const url = field(source, "src");
    const alt = field(source, "alt");
    const credit = field(source, "credit");
    const width = numberField(source, "width");
    const height = numberField(source, "height");
    if (!url.startsWith("https://commons.wikimedia.org/wiki/Special:Redirect/file/") ||
      !alt || !credit || width < 1200 || height < 800) {
      failures.push(slug + ": missing representative, high-resolution or rights-credited Commons photo");
    }
    const key = normalize(url);
    if (used.has(key)) failures.push(slug + " shares its hero with " + used.get(key));
    used.set(key, slug);
    if (!rights.includes('"/article/' + slug + '"') ||
        !rights.includes("File:" + decodeURIComponent(url.split("/file/")[1]?.split("?")[0] ?? ""))) {
      failures.push(slug + ": missing matching article source-and-license link");
    }
  }
}

// The independent housing-photo duplication must not reappear.
const finance = read("src/data/fixtures/finance-evergreen-depth-3.ts");
const architecture = read("src/data/fixtures/texas-home-architecture-regions.ts");
const financeHero = finance.match(/const rentBuyHero:[\s\S]*?\bsrc:\s*"([^"]+)"/)?.[1];
const architectureHero = architecture.match(/slug: "texas-home-architecture-regions"[\s\S]*?\bsrc:\s*"([^"]+)"/)?.[1];
if (!financeHero || !architectureHero || normalize(financeHero) === normalize(architectureHero)) {
  failures.push("rent-vs-buy and Texas architecture still share the same house photo");
}
if (!rights.includes('"/article/renting-vs-buying-in-texas"')) {
  failures.push("rent-vs-buy replacement missing clickable original-image licensing");
}
if (used.size !== 9) failures.push("Expected nine unique relocation hero URLs; got " + used.size);
if (failures.length) {
  console.error("Texas Life hero governance failed:");
  for (const failure of failures) console.error("- " + failure);
  process.exit(1);
}
console.log("PASS: Nine subject-specific relocation hero images, full/lazy agreement, source-license links, and unique housing comparison image.");
