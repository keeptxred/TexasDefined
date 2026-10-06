#!/usr/bin/env node
import fs from "node:fs";

const source = fs.readFileSync("src/routes/article.$slug.tsx", "utf8");
const occurrences = (needle) => source.split(needle).length - 1;

const slug = '"texas-loops-spurs-explained"';
const marker = '"texas-loops-spurs-explained": "Frequently asked questions about Texas Loops and Spurs"';

if (occurrences(marker) !== 1) throw new Error(`Expected exactly one Loops & Spurs FAQ heading mapping; found ${occurrences(marker)}`);
const faqSetStart = source.indexOf("const FAQ_ARTICLE_SLUGS");
const faqMapStart = source.indexOf("const FAQ_START_HEADING_BY_SLUG");
if (faqSetStart < 0 || faqMapStart < 0 || !source.slice(faqSetStart, faqMapStart).includes(slug)) {
  throw new Error("Loops & Spurs slug is not registered in FAQ_ARTICLE_SLUGS");
}
console.log("Loops & Spurs FAQ schema registration test passed.");
