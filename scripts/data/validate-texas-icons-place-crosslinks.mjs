import fs from "node:fs";

const resolverPath = "src/data/texas-icons.server.ts";
const routePath = "src/routes/texas-icons_.$slug.tsx";
const failures = [];

for (const path of [resolverPath, routePath]) {
  if (!fs.existsSync(path)) failures.push(`Missing Texas Icons place-link contract file: ${path}`);
}

if (!failures.length) {
  const resolver = fs.readFileSync(resolverPath, "utf8");
  const route = fs.readFileSync(routePath, "utf8");

  if (!resolver.includes("canonicalEntityPath, isIndexableEntityPage")) {
    failures.push("Texas Icons place enrichment must use both canonicalEntityPath and the knowledge-graph indexability gate.");
  }
  if (!resolver.includes("function enrichResearchProfilePlaceLinks")) {
    failures.push("Texas Icons resolver must define the research-profile place-link enrichment helper.");
  }
  if (!resolver.includes("if (place.href) return place")) {
    failures.push("Manually curated Texas place hrefs must take precedence over automatic knowledge-graph enrichment.");
  }
  if (!resolver.includes("normalizeTexasIconKey(place.name)")) {
    failures.push("Automatic place matching must normalize the researched place name before lookup.");
  }
  if (!resolver.includes("uniqueMatch(context.entitiesByKey, [key])")) {
    failures.push("Automatic place linking must require a single unambiguous knowledge-graph match.");
  }
  if (!resolver.includes("!entity || !isIndexableEntityPage(entity)")) {
    failures.push("Automatic place linking must reject missing, ambiguous, or non-indexable knowledge-graph entities.");
  }
  if (!resolver.includes("href: canonicalEntityPath(entity)")) {
    failures.push("Automatic place links must use the knowledge graph's canonical route helper.");
  }
  if (!resolver.includes("enrichResearchProfilePlaceLinks(researchProfile, context)")) {
    failures.push("Staged Texas Icons research returned to the route must pass through place-link enrichment.");
  }
  if (!route.includes("place.href ?")) {
    failures.push("Texas Icons profile UI must continue rendering researched place hrefs as links when present.");
  }
  if (!route.includes("Researched draft · noindex")) {
    failures.push("Place-link enrichment must not remove the staged-profile noindex disclosure.");
  }
  if (!resolver.includes('reuseKind: "icon-research-staged"') || !resolver.includes("indexableAtOwnRoute: false")) {
    failures.push("Place-link enrichment must not promote researched Icons profiles to indexable status.");
  }
}

if (failures.length) {
  console.error("Texas Icons place cross-link validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Texas Icons place cross-link validation passed: manual links win, only unique index-ready knowledge-graph matches are auto-linked, and staged profiles remain noindex.");
