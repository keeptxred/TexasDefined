import fs from "node:fs";

const contracts = [
  {
    file: "src/components/editorial/ExploreIntentPaths.tsx",
    needles: [
      "texas-places-worth-driving-for",
      "best-texas-weekend-trips-by-season",
      "best-texas-small-towns-by-trip-type",
      "best-texas-state-parks-for-first-time-visitors",
      "best-texas-family-road-trips",
      "best-texas-food-towns",
    ],
  },
  {
    file: "src/routes/texas-facts.tsx",
    needles: ["/article/texas-facts-that-sound-made-up"],
  },
  {
    file: "src/routes/texas-vs-every-state.tsx",
    needles: [
      "/article/texas-vs-california-differences",
      "/article/texas-vs-florida-differences",
      "/article/things-texas-does-differently-than-every-other-state",
      "/article/things-that-define-texas",
    ],
  },
  {
    file: "src/routes/texas-vs.$state.tsx",
    needles: [
      "/article/texas-vs-california-differences",
      "/article/texas-vs-florida-differences",
      "/article/things-nobody-tells-you-before-moving-to-texas",
    ],
  },
];

const failures = [];
for (const contract of contracts) {
  if (!fs.existsSync(contract.file)) {
    failures.push(`Missing reciprocal-link source: ${contract.file}`);
    continue;
  }
  const source = fs.readFileSync(contract.file, "utf8");
  for (const needle of contract.needles) {
    if (!source.includes(needle)) failures.push(`${contract.file} is missing reciprocal gateway discovery link: ${needle}`);
  }
}

if (failures.length) {
  console.error("Gateway reciprocal-link validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`PASS gateway reciprocal discovery: ${contracts.reduce((sum, contract) => sum + contract.needles.length, 0)} required inbound links across ${contracts.length} sources`);
