import fs from "node:fs";

const targets = [
  {
    file: "src/data/fixtures/texas-hurricane-preparation-guide.ts",
    label: "Texas hurricane preparation",
    minHeadings: 15,
    minParagraphs: 24,
    required: [
      "Texas Division of Emergency Management",
      "National Hurricane Center",
      "Texas Department of Insurance hurricane guidance",
      "Know the difference between homeowners and flood coverage",
      "Pools do not become irrelevant during a hurricane",
      "Build a hurricane file once and reuse it every year",
    ],
  },
  {
    file: "src/data/fixtures/prepare-texas-house-freeze.ts",
    label: "Texas freeze preparation",
    minHeadings: 14,
    minParagraphs: 22,
    required: [
      "Texas Division of Emergency Management preparedness",
      "National Weather Service cold safety",
      "CDC carbon-monoxide safety",
      "What to check on pool equipment before the front arrives",
      "Generator safety matters more than convenience",
      "Build a reusable freeze box",
    ],
  },
  {
    file: "src/data/fixtures/texas-foundation-care-clay-drought.ts",
    label: "Texas foundation care",
    minHeadings: 15,
    minParagraphs: 25,
    required: [
      "USDA Web Soil Survey",
      "Texas A&M AgriLife soil resources",
      "Do a ten-minute drainage audit after a hard rain",
      "Plumbing leaks can mimic or worsen soil problems",
      "Buying a Texas house with foundation history",
      "A seasonal foundation checklist for Texas",
    ],
  },
  {
    file: "src/data/fixtures/texas-roofs-hail-wind-heat.ts",
    label: "Texas roof weather guide",
    minHeadings: 14,
    minParagraphs: 22,
    required: [
      "Texas Department of Insurance roof replacement guidance",
      "TDI hail and windstorm guidance",
      "Gutters are part of the roof system",
      "Buying a Texas house with an older roof",
      "After a storm, document before the sales calls begin",
      "Repair or replace?",
    ],
  },
  {
    file: "src/data/fixtures/choose-electricity-plan-texas.ts",
    label: "Texas electricity shopping guide",
    minHeadings: 16,
    minParagraphs: 27,
    required: [
      "Power to Choose",
      "Public Utility Commission electricity information",
      "PUCT guide to the Electricity Facts Label",
      "Know the three companies that may appear on your bill",
      "Solar buyback plans require two calculations",
      "Build a one-page comparison table",
    ],
  },
  {
    file: "src/data/fixtures/texas-school-districts-explained.ts",
    label: "Texas school district guide",
    minHeadings: 14,
    minParagraphs: 23,
    required: [
      "Texas Education Agency district directory",
      "TXschools.gov",
      "The five address checks to make before you buy or lease",
      "What a rezoning proposal means for a homebuyer",
      "MUDs, PIDs, HOAs and school districts can all overlap one address",
      "Questions to ask before signing a contract",
    ],
  },
];

const failures = [];

for (const target of targets) {
  const text = fs.readFileSync(target.file, "utf8");
  const headings = (text.match(/\bh\("/g) ?? []).length;
  const paragraphs = (text.match(/\bp\("/g) ?? []).length;
  const internalLinks = (text.match(/href:/g) ?? []).length;

  if (headings < target.minHeadings) failures.push(`${target.label}: ${headings} headings; expected at least ${target.minHeadings}.`);
  if (paragraphs < target.minParagraphs) failures.push(`${target.label}: ${paragraphs} paragraphs; expected at least ${target.minParagraphs}.`);
  if (internalLinks < 7) failures.push(`${target.label}: ${internalLinks} source/internal links; expected at least 7.`);

  for (const token of target.required) {
    if (!text.includes(token)) failures.push(`${target.label}: missing protected authority element: ${token}`);
  }

  if (!text.includes("relatedCollections: []")) failures.push(`${target.label}: article contract changed unexpectedly.`);
}

if (failures.length) {
  console.error(`Practical Texas authority validation failed (${failures.length} issue${failures.length === 1 ? "" : "s"}):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Practical Texas authority protected: hurricane, freeze, foundation, roof, electricity and school-district guides retain substantive depth, official-source trails, checklists and Texas-specific decision support.");
