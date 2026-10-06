#!/usr/bin/env node
import fs from "node:fs";

const source = fs.readFileSync("src/routes/article.$slug.tsx", "utf8");
const slug = '  "texas-loops-spurs-explained",';
const marker = '  "texas-loops-spurs-explained": "Frequently asked questions about Texas Loops and Spurs",';

if (!source.includes(slug) || !source.includes(marker)) {
  throw new Error("Texas Loops & Spurs FAQ schema registration is incomplete");
}
console.log("Texas Loops & Spurs FAQ schema registration verified.");
