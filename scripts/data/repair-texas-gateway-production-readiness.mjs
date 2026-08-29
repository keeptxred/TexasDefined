import fs from "node:fs";
import path from "node:path";
import ts from "typescript";
import { GATEWAY_FILES } from "./texas-gateway-production-readiness-lib.mjs";

const FIXTURE_ROOT = "src/data/fixtures";
const ENRICHMENT_FILE_RE = /^texas-gateway-.*-enrichment\.ts$/;
const STOPWORDS = new Set(["a", "an", "and", "are", "best", "for", "from", "how", "in", "of", "on", "the", "to", "texas", "things", "trip", "trips", "weekend", "weekends", "with", "you", "your"]);
const AUTHORITY_DOMAINS = [".gov", "tpwd.texas.gov", "nps.gov", "weather.gov", "noaa.gov", "fema.gov", "tamu.edu", "txdot.gov", "dps.texas.gov", "dshs.texas.gov"];

const wordCount = (value) => String(value ?? "").trim().split(/\s+/).filter(Boolean).length;

function walk(dir, output = []) {
  if (!fs.existsSync(dir)) return output;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, output);
    else output.push(full);
  }
  return output;
}

function stringsIn(node, values = []) {
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
    values.push(node.text);
    return values;
  }
  if (ts.isTemplateExpression(node)) {
    values.push([node.head.text, ...node.templateSpans.map((span) => span.literal.text)].join(" "));
    return values;
  }
  ts.forEachChild(node, (child) => {
    stringsIn(child, values);
  });
  return values;
}

function propertyString(node, name) {
  let value = null;
  function visit(current) {
    if (value !== null) return;
    if (ts.isPropertyAssignment(current)) {
      const key = ts.isIdentifier(current.name) || ts.isStringLiteral(current.name) ? current.name.text : null;
      if (key === name && (ts.isStringLiteral(current.initializer) || ts.isNoSubstitutionTemplateLiteral(current.initializer))) {
        value = current.initializer.text;
        return;
      }
    }
    ts.forEachChild(current, visit);
  }
  visit(node);
  return value;
}

function directProperty(node, name) {
  if (!ts.isObjectLiteralExpression(node)) return null;
  return node.properties.find((property) => {
    if (!ts.isPropertyAssignment(property)) return false;
    const key = ts.isIdentifier(property.name) || ts.isStringLiteral(property.name) ? property.name.text : null;
    return key === name;
  }) ?? null;
}

function propertyArrayCount(node, name) {
  let count = 0;
  function visit(current) {
    if (ts.isPropertyAssignment(current)) {
      const key = ts.isIdentifier(current.name) || ts.isStringLiteral(current.name) ? current.name.text : null;
      if (key === name && ts.isArrayLiteralExpression(current.initializer)) {
        count = current.initializer.elements.length;
        return;
      }
    }
    ts.forEachChild(current, visit);
  }
  visit(node);
  return count;
}

function countBlockType(node, type) {
  let count = 0;
  function visit(current) {
    if (ts.isPropertyAssignment(current)) {
      const key = ts.isIdentifier(current.name) || ts.isStringLiteral(current.name) ? current.name.text : null;
      if (key === "type" && ts.isStringLiteral(current.initializer) && current.initializer.text === type) count += 1;
    }
    ts.forEachChild(current, visit);
  }
  visit(node);
  return count;
}

function articleIdentity(node) {
  let id = propertyString(node, "id");
  let slug = propertyString(node, "slug");
  if (ts.isCallExpression(node)) {
    const args = node.arguments;
    if (!id && args[0] && ts.isStringLiteral(args[0]) && args[0].text.startsWith("gateway-")) id = args[0].text;
    if (!slug && args[1] && ts.isStringLiteral(args[1])) slug = args[1].text;
  }
  return { id, slug };
}

function articleElements(source) {
  const rows = [];
  source.forEachChild((node) => {
    if (!ts.isVariableStatement(node)) return;
    for (const declaration of node.declarationList.declarations) {
      if (!ts.isIdentifier(declaration.name) || !/texasGateway.*Articles/i.test(declaration.name.text)) continue;
      if (!declaration.initializer || !ts.isArrayLiteralExpression(declaration.initializer)) continue;
      for (const element of declaration.initializer.elements) rows.push(element);
    }
  });
  return rows;
}

function parseEnrichments(root) {
  const result = new Map();
  const fixtureDir = path.join(root, FIXTURE_ROOT);
  for (const full of walk(fixtureDir)) {
    if (!ENRICHMENT_FILE_RE.test(path.basename(full))) continue;
    const source = ts.createSourceFile(full, fs.readFileSync(full, "utf8"), ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
    const arrays = new Map();
    source.forEachChild((node) => {
      if (!ts.isVariableStatement(node)) return;
      for (const declaration of node.declarationList.declarations) {
        if (ts.isIdentifier(declaration.name) && declaration.initializer && ts.isArrayLiteralExpression(declaration.initializer)) arrays.set(declaration.name.text, declaration.initializer);
      }
    });
    function visit(node) {
      if (ts.isPropertyAssignment(node) && ts.isStringLiteral(node.name) && /^[a-z0-9-]+$/.test(node.name.text) && ts.isObjectLiteralExpression(node.initializer)) {
        const bodyProperty = directProperty(node.initializer, "body");
        if (bodyProperty && ts.isPropertyAssignment(bodyProperty) && ts.isIdentifier(bodyProperty.initializer)) {
          const body = arrays.get(bodyProperty.initializer.text);
          if (body) {
            const all = stringsIn(node.initializer);
            const bodyStrings = stringsIn(body).filter((value) => value.trim() && !value.startsWith("/") && !/^https?:\/\//i.test(value));
            result.set(node.name.text, {
              words: bodyStrings.reduce((sum, value) => sum + wordCount(value), 0),
              paragraphs: countBlockType(body, "paragraph"),
              headings: countBlockType(body, "heading"),
              listBlocks: countBlockType(body, "list"),
              listItems: propertyArrayCount(body, "items"),
              internalHrefs: all.filter((value) => /^\/[a-z0-9]/i.test(value)),
              relatedCollections: propertyArrayCount(node.initializer, "relatedCollections"),
              relatedDestinations: propertyArrayCount(node.initializer, "relatedDestinations"),
              sourceUrl: propertyString(node.initializer, "sourceUrl"),
              rawText: bodyStrings.join(" "),
            });
          }
        }
      }
      ts.forEachChild(node, visit);
    }
    visit(source);
  }
  return result;
}

function parseMeasurements(root) {
  const enrichments = parseEnrichments(root);
  const measurements = new Map();
  for (let index = 0; index < GATEWAY_FILES.length; index += 1) {
    const file = GATEWAY_FILES[index];
    const sourceText = fs.readFileSync(path.join(root, file), "utf8");
    const source = ts.createSourceFile(file, sourceText, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
    for (const element of articleElements(source)) {
      const identity = articleIdentity(element);
      if (!identity.slug) continue;
      const all = stringsIn(element);
      const prose = all.filter((value) => {
        const text = value.trim();
        return text && !text.startsWith("/") && !/^https?:\/\//i.test(text) && !/^gateway[-_]/i.test(text);
      });
      const enrichment = enrichments.get(identity.slug);
      const externalUrls = all.filter((value) => /^https?:\/\//i.test(value));
      const sourceUrl = enrichment?.sourceUrl ?? propertyString(element, "sourceUrl");
      if (sourceUrl) externalUrls.push(sourceUrl);
      measurements.set(identity.slug, {
        words: prose.reduce((sum, value) => sum + wordCount(value), 0) + (enrichment?.words ?? 0),
        paragraphs: countBlockType(element, "paragraph") + (enrichment?.paragraphs ?? 0),
        headings: countBlockType(element, "heading") + (enrichment?.headings ?? 0),
        listBlocks: countBlockType(element, "list") + (enrichment?.listBlocks ?? 0),
        listItems: propertyArrayCount(element, "items") + (enrichment?.listItems ?? 0),
        internalHrefs: [...new Set([...all.filter((value) => /^\/[a-z0-9]/i.test(value)), ...(enrichment?.internalHrefs ?? [])])],
        relatedCollections: propertyArrayCount(element, "relatedCollections") + (enrichment?.relatedCollections ?? 0),
        relatedDestinations: propertyArrayCount(element, "relatedDestinations") + (enrichment?.relatedDestinations ?? 0),
        sourceUrl,
        externalUrls: [...new Set(externalUrls)],
        hasHero: /\bhero\s*:/.test(element.getText(source)),
        hasAuthor: /\bauthorId\s*:/.test(element.getText(source)),
        hasPublishedAt: /\bpublishedAt\s*:/.test(element.getText(source)),
        rawText: `${prose.join(" ")} ${enrichment?.rawText ?? ""}`.trim(),
      });
    }
  }
  return measurements;
}

function tokens(value) {
  return new Set(String(value ?? "").toLowerCase().split(/[^a-z0-9]+/).filter((token) => token.length > 2 && !STOPWORDS.has(token)));
}

function similarity(a, b) {
  const left = tokens(a);
  const right = tokens(b);
  if (!left.size || !right.size) return 0;
  const intersection = [...left].filter((token) => right.has(token)).length;
  const union = new Set([...left, ...right]).size;
  const jaccard = union ? intersection / union : 0;
  const containment = Math.min(left.size, right.size) ? intersection / Math.min(left.size, right.size) : 0;
  return Math.max(jaccard, containment * 0.9);
}

function authoritative(url) {
  if (!url) return false;
  try {
    const host = new URL(url).hostname.toLowerCase();
    return AUTHORITY_DOMAINS.some((domain) => host === domain.replace(/^\./, "") || host.endsWith(domain));
  } catch {
    return false;
  }
}

export function repairGatewayProductionEntries(root, entries) {
  const measurements = parseMeasurements(root);
  const rawEntries = entries.filter((entry) => measurements.has(entry.slug));
  const duplicateMap = new Map(rawEntries.map((entry) => [entry.slug, []]));
  for (let i = 0; i < rawEntries.length; i += 1) {
    for (let j = i + 1; j < rawEntries.length; j += 1) {
      const a = rawEntries[i];
      const b = rawEntries[j];
      const score = similarity(`${a.targetIntent} ${measurements.get(a.slug).rawText}`, `${b.targetIntent} ${measurements.get(b.slug).rawText}`);
      if (score >= 0.78) {
        duplicateMap.get(a.slug).push({ slug: b.slug, score: Number(score.toFixed(2)) });
        duplicateMap.get(b.slug).push({ slug: a.slug, score: Number(score.toFixed(2)) });
      }
    }
  }

  return entries.map((entry) => {
    const measurement = measurements.get(entry.slug);
    if (!measurement) return entry;
    const relatedCount = measurement.relatedCollections + measurement.relatedDestinations;
    const proseUnits = measurement.paragraphs + measurement.headings;
    const listRatio = measurement.listItems ? measurement.listItems / Math.max(measurement.listItems + proseUnits * 4, 1) : 0;
    const blockers = [];
    if (entry.editorialStatus !== "index-ready") blockers.push(`editorial-status:${entry.editorialStatus}`);
    if (measurement.words < entry.targetMinimumWords) blockers.push(`depth:${measurement.words}<${entry.targetMinimumWords}`);
    if (measurement.paragraphs < 6) blockers.push(`paragraphs:${measurement.paragraphs}<6`);
    if (measurement.headings < 3) blockers.push(`headings:${measurement.headings}<3`);
    if (measurement.internalHrefs.length < entry.minimumInternalLinks) blockers.push(`internal-links:${measurement.internalHrefs.length}<${entry.minimumInternalLinks}`);
    if (relatedCount < entry.requiredDestinationsOrCollections) blockers.push(`related-targets:${relatedCount}<${entry.requiredDestinationsOrCollections}`);
    if (!measurement.hasHero) blockers.push("hero:missing");
    if (!measurement.hasAuthor) blockers.push("author:missing");
    if (!measurement.hasPublishedAt) blockers.push("published-at:missing");
    if (listRatio > 0.55) blockers.push(`list-heavy:${listRatio.toFixed(2)}>0.55`);
    if (entry.requiredSourceClass === "authoritative-required" && !authoritative(measurement.sourceUrl) && !measurement.externalUrls.some(authoritative)) blockers.push("authority-source:missing");
    if ((entry.cannibalizationCandidates ?? []).some((candidate) => candidate.score >= 0.9)) blockers.push(`cannibalization:${entry.cannibalizationCandidates[0].url}`);
    const duplicates = duplicateMap.get(entry.slug) ?? [];
    if (duplicates.length) blockers.push(`near-duplicate:${duplicates[0].slug}`);

    const score = Math.max(0, 100 - blockers.reduce((sum, blocker) => {
      if (blocker.startsWith("editorial-status")) return sum + 25;
      if (blocker.startsWith("depth")) return sum + 20;
      if (blocker.startsWith("authority-source")) return sum + 20;
      if (blocker.startsWith("cannibalization") || blocker.startsWith("near-duplicate")) return sum + 15;
      return sum + 7;
    }, 0));

    return {
      ...entry,
      metrics: {
        ...entry.metrics,
        estimatedWords: measurement.words,
        paragraphCount: measurement.paragraphs,
        headingCount: measurement.headings,
        listBlockCount: measurement.listBlocks,
        listItems: measurement.listItems,
        listRatio: Number(listRatio.toFixed(2)),
        internalLinkCount: measurement.internalHrefs.length,
        relatedTargets: relatedCount,
        sourceUrl: measurement.sourceUrl,
      },
      nearDuplicateGatewayCandidates: duplicates,
      qualityScore: score,
      readinessResult: blockers.length === 0 ? "pass" : "blocked",
      blockers,
    };
  });
}
