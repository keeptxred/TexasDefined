import fs from "node:fs";

const source = fs.readFileSync("src/data/rv-parks/images.server.ts", "utf8");
const errors = [];
const body = source.split("export const RV_PARK_LICENSED_IMAGES")[1]?.split("export function rvParkLicensedImage")[0] ?? "";
const records = [...body.matchAll(/^\s{2}(["'])([^"']+)\1\s*:\s*\{([\s\S]*?)^\s{2}\},/gm)];
const prohibitedHosts = ["google.com", "googleusercontent.com", "yelp.com", "tripadvisor.com", "facebook.com", "instagram.com"];

function field(block, name) {
  const match = block.match(new RegExp(`^\\s{4}${name}:\\s*(["'])(.*?)\\1,?\\s*$`, "m"));
  return match?.[2] ?? null;
}

function httpsUrl(value) {
  return Boolean(value && /^https:\/\//i.test(value));
}

function allowedSourceHost(value) {
  if (!httpsUrl(value)) return false;
  try {
    const host = new URL(value).hostname.toLowerCase().replace(/^www\./, "");
    return !prohibitedHosts.some((forbidden) => host === forbidden || host.endsWith(`.${forbidden}`));
  } catch {
    return false;
  }
}

if (records.length !== 250) {
  errors.push(`Expected all 250 RV hero registry records to be parsed; found ${records.length}.`);
}

let exactLicensed = 0;
let representativeAi = 0;
for (const [, , slug, block] of records) {
  const sourceUrl = field(block, "sourceUrl");
  const alt = field(block, "alt") ?? "";
  const creator = field(block, "creator") ?? "";
  const license = field(block, "license") ?? "";
  const licenseUrl = field(block, "licenseUrl");
  const sourceKind = field(block, "sourceKind");
  const generatedRepresentative = sourceKind === "generated-representative";

  for (const marker of ["src:", "sourceUrl:", "alt:", "width:", "height:", "creator:", "license:", "licenseUrl:", "actualLocation:", "subjectScope:"]) {
    if (!block.includes(marker)) errors.push(`${slug} image record missing ${marker}`);
  }
  if (!/\bverifiedAt\b/.test(block)) errors.push(`${slug} image record missing verifiedAt.`);

  if (generatedRepresentative) {
    representativeAi += 1;
    if (!/actualLocation:\s*false/.test(block)) errors.push(`${slug} representative AI image must declare actualLocation:false.`);
    if (!/subjectScope:\s*(["'])representative\1/.test(block)) errors.push(`${slug} representative AI image must declare subjectScope:representative.`);
    if (!new RegExp(`src:\\s*(["'])/images/rv-parks/${slug.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\.jpg\\1`).test(block)) errors.push(`${slug} representative AI image must be a slug-specific TexasDefined RV asset.`);
    if (sourceUrl !== "https://texasdefined.com/") errors.push(`${slug} representative AI image must use TexasDefined as its source URL.`);
    if (!/AI-generated representative editorial image/i.test(`${alt} ${license}`)) errors.push(`${slug} representative AI image must disclose synthetic representative provenance.`);
    if (!/Texas Defined/i.test(creator)) errors.push(`${slug} representative AI image must identify Texas Defined as creator.`);
    continue;
  }

  exactLicensed += 1;
  if (!/actualLocation:\s*true/.test(block)) errors.push(`${slug} real/licensed RV image must declare actualLocation:true.`);
  if (!/subjectScope:\s*(["'])(?:campground|park-property)\1/.test(block)) errors.push(`${slug} real/licensed RV image must use campground or park-property subject scope.`);
  if (!allowedSourceHost(sourceUrl)) errors.push(`${slug} real/licensed RV image must retain an approved item-level HTTPS source URL.`);
  if (!httpsUrl(licenseUrl)) errors.push(`${slug} real/licensed RV image must retain an HTTPS license URL.`);
  if (!license.trim()) errors.push(`${slug} real/licensed RV image must retain a license or rights note.`);
}

if (exactLicensed + representativeAi !== records.length) {
  errors.push(`RV image classification mismatch: exact=${exactLicensed}, representative=${representativeAi}, parsed=${records.length}.`);
}

if (errors.length) {
  console.error("RV image registry provenance validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`RV image registry parsed all ${records.length} records: ${exactLicensed} exact/licensed and ${representativeAi} representative AI. Representative AI remains fail-closed for indexing until replaced by compliant place-specific imagery.`);
