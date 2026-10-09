import fs from "node:fs";

const authority = fs.readFileSync("src/data/major-event-expanded-authority-tranche39.server.ts", "utf8");
const schema = fs.readFileSync("src/data/major-event-schema-enrichment-batch11.server.ts", "utf8");
const seo = fs.readFileSync("src/lib/seo.ts", "utf8");
const failures = [];

const fail = (message) => failures.push(message);
const requireMarkers = (label, source, markers) => {
  for (const marker of markers) {
    if (!source.includes(marker)) fail(`${label} missing protected marker: ${marker}`);
  }
};

const authorityBlock = authority.match(/slug: "heart-o-texas-fair-rodeo"[\s\S]*?(?=\n  \},\n  \{|\n  \},\n\];)/)?.[0] ?? "";
const schemaBlock = schema.match(/slug: "heart-o-texas-fair-rodeo"[\s\S]*?(?=\n  \},\n  \{|\n  \},\n\];)/)?.[0] ?? "";

if (!authorityBlock) fail("Heart O' Texas authority record is missing.");
if (!schemaBlock) fail("Heart O' Texas schema enrichment is missing.");

requireMarkers("Heart O' Texas authority", authorityBlock, [
  'startDate: "2026-10-08"',
  'endDate: "2026-10-18"',
  "Heart O' Texas Fair 2026 dates and hours",
  "One HOT Rodeo 2026 schedule",
  "October 9, 10 and 11; October 13, 14, 15 and 16; October 17; and October 18",
  "October 18 Extreme Bulls performance starts at 5 p.m.",
  "gate admission does not include the rodeo",
  "Rodeo tickets use reserved seating and include fairgrounds gate admission",
  "https://www.hotfair.com/directions.aspx",
  "https://www.hotfair.com/p/rodeo",
  "https://www.hotfair.com/p/tickets",
]);

const sourceCheckedAt = authorityBlock.match(/sourceCheckedAt: "([0-9]{4}-[0-9]{2}-[0-9]{2})"/)?.[1];
if (!sourceCheckedAt || sourceCheckedAt < "2026-10-04") {
  fail(`Heart O' Texas visible-content source verification is stale: ${sourceCheckedAt ?? "missing"}`);
}

requireMarkers("Heart O' Texas schema", schemaBlock, [
  'organizer: organization("Heart O\' Texas Fair & Rodeo", "https://www.hotfair.com/")',
  'usdOffer("Advance fair gate admission", 18, "https://www.hotfair.com/p/tickets")',
  "https://www.hotfair.com/directions.aspx",
  "https://www.hotfair.com/p/rodeo",
  "https://www.hotfair.com/p/tickets",
]);

const verifiedAt = schemaBlock.match(/verifiedAt: "([0-9]{4}-[0-9]{2}-[0-9]{2})"/)?.[1];
if (!verifiedAt || verifiedAt < "2026-10-04") {
  fail(`Heart O' Texas schema verification is stale: ${verifiedAt ?? "missing"}`);
}

requireMarkers("Heart O' Texas SERP", seo, [
  '"/event/heart-o-texas-fair-rodeo"',
  "Heart O' Texas Fair & Rodeo 2026: Dates, Schedule & Tickets",
  "The 2026 Heart O' Texas Fair & Rodeo runs Oct. 8-18 in Waco",
]);

if (schemaBlock.includes("Rodeo admission") || schemaBlock.includes("Rodeo ticket", schemaBlock.indexOf("offers:"))) {
  fail("Heart O' Texas schema must not invent a single rodeo ticket price; performance pricing varies.");
}

if (failures.length) {
  console.error("Heart O' Texas 2026 validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Heart O' Texas 2026 CTR, schedule, source and schema contract passed.");
