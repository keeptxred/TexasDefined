#!/usr/bin/env node

/**
 * One-shot, concurrency-safe source transformer for the Texas Loops & Spurs FAQ schema.
 *
 * This deliberately edits only the two missing FAQ registration lines in
 * src/routes/article.$slug.tsx. It is idempotent and refuses to run if the
 * expected current source anchors are not present, preventing a stale full-file
 * replacement from clobbering concurrent route work.
 */
import fs from "node:fs";

const path = "src/routes/article.$slug.tsx";
let source = fs.readFileSync(path, "utf8");

const slugLine = '  "texas-loops-spurs-explained",';
const markerLine = '  "texas-loops-spurs-explained": "Frequently asked questions about Texas Loops and Spurs",';

if (!source.includes(slugLine)) {
  const anchor = '  "texas-flag-etiquette-display-guide",\n]);';
  if (!source.includes(anchor)) throw new Error("FAQ slug anchor changed; refusing unsafe edit");
  source = source.replace(anchor, `  "texas-flag-etiquette-display-guide",\n${slugLine}\n]);`);
}

if (!source.includes(markerLine)) {
  const anchor = '  [MOVING_TO_TEXAS_PILLAR_SLUG]: "Frequently asked questions about moving to Texas",\n};';
  if (!source.includes(anchor)) throw new Error("FAQ marker anchor changed; refusing unsafe edit");
  source = source.replace(anchor, `  [MOVING_TO_TEXAS_PILLAR_SLUG]: "Frequently asked questions about moving to Texas",\n${markerLine}\n};`);
}

fs.writeFileSync(path, source);
console.log("Texas Loops & Spurs FAQ schema registration is enabled.");
