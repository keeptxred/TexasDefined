import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
const base = new URL("../../src/data/authority/", import.meta.url);
const owners = JSON.parse(readFileSync(fileURLToPath(new URL("content-ownership.json", base)), "utf8"));
const offers = JSON.parse(readFileSync(fileURLToPath(new URL("experience-offers.json", base)), "utf8"));
const supplemental = JSON.parse(readFileSync(fileURLToPath(new URL("independent-operators.json", base)), "utf8"));
const errors = [];
const stale = [];
const seenPaths = new Set();
const seenOffers = new Set();
const seenSupplemental = new Set();
const today = Date.parse(new Date().toISOString().slice(0, 10) + "T00:00:00Z");
const validDate = (s) => /^\d{4}-\d{2}-\d{2}$/.test(s) && Number.isFinite(Date.parse(s + "T00:00:00Z"))
  && new Date(Date.parse(s + "T00:00:00Z")).toISOString().slice(0, 10) === s;
for (const cluster of owners.clusters || []) {
  const roles = new Map();
  if (!cluster.id || !cluster.articleSlug) errors.push("Cluster lacks stable identity and article owner");
  for (const page of cluster.pages || []) {
    if (!/^\/(article|destination|explore)\//.test(page.path) || /[?#]/.test(page.path)) errors.push("Noncanonical path " + page.path);
    if (seenPaths.has(page.path)) errors.push("Competing declared owner for " + page.path);
    seenPaths.add(page.path);
    if (!page.role || !page.intent || page.intent.length < 25) errors.push("Missing distinct search intent " + page.path);
    const key = page.role + "::" + page.intent.toLowerCase().trim();
    if (roles.has(key)) errors.push("Duplicated page role and search intent: " + page.path + " and " + roles.get(key));
    roles.set(key,page.path);
  }
  if (!(cluster.pages || []).some((p) => p.path === "/article/" + cluster.articleSlug)) {
    errors.push("Cluster primary article not owned: " + cluster.articleSlug);
  }
}
for (const place of supplemental) {
  if (!place.slug || seenSupplemental.has(place.slug)) errors.push("Duplicate/empty independent operator slug: " + place.slug);
  seenSupplemental.add(place.slug);
  if (!place.name || !place.address || !place.sourceUrl?.startsWith("https://")) errors.push("Missing verified operator identity " + place.slug);
  if (!validDate(place.checkedAt)) errors.push("Missing verified date for operator " + place.slug);
}
for (const offer of offers) {
  const prefix = String(offer.id);
  if (!prefix || seenOffers.has(prefix)) errors.push("Duplicated offer ID " + prefix);
  seenOffers.add(prefix);
  if (!offer.destinationSlug || !offer.label || !offer.notes) errors.push("Incomplete offering " + prefix);
  if (!(offer.priceUsd >= 0) || (offer.durationMinutes !== null && !(offer.durationMinutes > 0)) || (offer.maxParty !== null && !(offer.maxParty > 0))) errors.push("Invalid offering price/time/capacity " + prefix);
  if (offer.minAge !== null && !(offer.minAge > 0)) errors.push("Invalid age rule " + prefix);
  if (!/^https:\/\/[^/]+\.[^/]+\/\S*/.test(offer.sourceUrl)) errors.push("Missing direct HTTPS operator evidence " + prefix);
  if (!validDate(offer.checkedAt) || Date.parse(offer.checkedAt + "T00:00:00Z") > today) errors.push("Invalid or future verification date " + prefix);
  else if ((today - Date.parse(offer.checkedAt + "T00:00:00Z")) / 86400000 > 45) stale.push(prefix + " requires operator re-verification: " + offer.sourceUrl);
}
console.log("Authority content ownership: " + seenPaths.size + " unique page intents, " + seenOffers.size + " operator offerings");
for (const issue of errors) console.error("ERROR " + issue);
for (const issue of stale) console.warn("STALE " + issue);
if (errors.length) process.exitCode = 1;
