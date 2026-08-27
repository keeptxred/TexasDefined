import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

export const GATEWAY_FILES = [
  "src/data/fixtures/texas-gateway-articles.ts",
  "src/data/fixtures/texas-gateway-articles-batch2.ts",
  "src/data/fixtures/texas-gateway-lifestyle-batch3.ts",
  "src/data/fixtures/texas-gateway-lifestyle-batch4.ts",
  "src/data/fixtures/texas-gateway-lifestyle-batch5.ts",
  "src/data/fixtures/texas-gateway-lifestyle-batch6.ts",
  "src/data/fixtures/texas-gateway-regional-batch7.ts",
  "src/data/fixtures/texas-gateway-bestof-batch8.ts",
  "src/data/fixtures/texas-gateway-bestof-batch9.ts",
  "src/data/fixtures/texas-gateway-itinerary-batch10.ts",
  "src/data/fixtures/texas-gateway-decision-batch11.ts",
  "src/data/fixtures/texas-gateway-decision-batch12.ts",
  "src/data/fixtures/texas-gateway-decision-batch13.ts",
  "src/data/fixtures/texas-gateway-occasion-batch14.ts",
  "src/data/fixtures/texas-gateway-monthly-batch15.ts",
  "src/data/fixtures/texas-gateway-identity-batch16.ts",
];

const REVIEW_PATH = "scripts/data/texas-gateway-editorial-review.json";
const READINESS_PATH = "src/data/fixtures/texas-gateway-index-readiness.ts";
const STOPWORDS = new Set(["a", "an", "and", "are", "best", "for", "from", "how", "in", "of", "on", "the", "to", "texas", "things", "trip", "trips", "weekend", "weekends", "with", "you", "your"]);
const AUTHORITY_DOMAINS = [".gov", "tpwd.texas.gov", "nps.gov", "weather.gov", "noaa.gov", "fema.gov", "tamu.edu", "txdot.gov", "dps.texas.gov", "dshs.texas.gov"];

const read = (root, file) => fs.readFileSync(path.join(root, file), "utf8");
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
  ts.forEachChild(node, (child) => stringsIn(child, values));
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

function parseGatewayArticles(root) {
  const rows = [];
  for (let index = 0; index < GATEWAY_FILES.length; index += 1) {
    const file = GATEWAY_FILES[index];
    const sourceText = read(root, file);
    const source = ts.createSourceFile(file, sourceText, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
    for (const element of articleElements(source)) {
      const identity = articleIdentity(element);
      if (!identity.slug) continue;
      const strings = stringsIn(element).filter((value) => {
        const text = value.trim();
        return text && !text.startsWith("/") && !/^https?:\/\//i.test(text) && !/^gateway[-_]/i.test(text);
      });
      const allStrings = stringsIn(element);
      const externalUrls = allStrings.filter((value) => /^https?:\/\//i.test(value));
      const internalHrefs = allStrings.filter((value) => /^\/[a-z0-9]/i.test(value));
      const listItems = propertyArrayCount(element, "items");
      const title = propertyString(element, "title");
      const dek = propertyString(element, "dek");
      const sourceUrl = propertyString(element, "sourceUrl");
      const sourceName = propertyString(element, "sourceName");
      const text = element.getText(source);
      rows.push({
        file,
        batch: index + 1,
        id: identity.id,
        slug: identity.slug,
        title,
        dek,
        estimatedWords: strings.reduce((sum, value) => sum + wordCount(value), 0),
        paragraphCount: countBlockType(element, "paragraph"),
        headingCount: countBlockType(element, "heading"),
        listBlockCount: countBlockType(element, "list"),
        listItems,
        internalLinkCount: new Set(internalHrefs).size,
        relatedCollections: propertyArrayCount(element, "relatedCollections"),
        relatedDestinations: propertyArrayCount(element, "relatedDestinations"),
        sourceUrl,
        sourceName,
        externalUrls: [...new Set(externalUrls)],
        hasHero: /\bhero\s*:/.test(text),
        hasAuthor: /\bauthorId\s*:/.test(text),
        hasPublishedAt: /\bpublishedAt\s*:/.test(text),
        rawText: strings.join(" "),
      });
    }
  }
  return rows;
}

function routeCorpus(root) {
  const candidates = new Map();
  const add = (slug, url, source) => {
    if (!slug || slug.startsWith("gateway-")) return;
    if (!candidates.has(url)) candidates.set(url, { slug, url, source });
  };

  for (const full of walk(path.join(root, "src/routes"))) {
    if (!/\.(?:ts|tsx)$/.test(full)) continue;
    const relative = path.relative(path.join(root, "src/routes"), full).replaceAll("\\", "/");
    let route = relative.replace(/\.(?:ts|tsx)$/, "").replace(/\[\.\]/g, ".");
    if (route === "index") route = "";
    route = route.replace(/\._index$/, "").replaceAll(".", "/");
    if (route.includes("$") || route.includes("[")) continue;
    const url = `/${route}`.replace(/\/+$/, "") || "/";
    const slug = route.split("/").filter(Boolean).at(-1) ?? "home";
    add(slug, url, `route:${relative}`);
  }

  for (const full of walk(path.join(root, "src/data/fixtures"))) {
    if (!/\.ts$/.test(full)) continue;
    const relative = path.relative(root, full).replaceAll("\\", "/");
    if (GATEWAY_FILES.includes(relative) || relative.includes("texas-gateway-index")) continue;
    const source = fs.readFileSync(full, "utf8");
    for (const match of source.matchAll(/\bslug\s*:\s*["']([a-z0-9-]+)["']/g)) {
      add(match[1], `/article/${match[1]}`, `fixture:${relative}`);
    }
  }

  return [...candidates.values()];
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

function contentType(batch) {
  if (batch <= 2) return "broad-evergreen";
  if (batch <= 6) return "lifestyle-practical";
  if (batch === 7) return "regional-guide";
  if (batch <= 9) return "best-of-guide";
  if (batch === 10) return "itinerary";
  if (batch <= 13) return "decision-guide";
  if (batch === 14) return "occasion-wrapper";
  if (batch === 15) return "monthly-seasonal";
  return "identity-culture";
}

function minimumWords(type) {
  if (type === "itinerary") return 1600;
  if (type === "regional-guide" || type === "best-of-guide") return 1400;
  if (type === "decision-guide" || type === "monthly-seasonal") return 1300;
  if (type === "identity-culture") return 1100;
  return 1200;
}

function authorityRequired(review) {
  return review.reason === "expand-authority" || review.reason === "stage-audience";
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

function nearDuplicateScores(articles) {
  const result = new Map();
  for (const article of articles) result.set(article.slug, []);
  for (let i = 0; i < articles.length; i += 1) {
    for (let j = i + 1; j < articles.length; j += 1) {
      const a = articles[i];
      const b = articles[j];
      const score = similarity(`${a.title ?? a.slug} ${a.rawText}`, `${b.title ?? b.slug} ${b.rawText}`);
      if (score >= 0.78) {
        result.get(a.slug).push({ slug: b.slug, score: Number(score.toFixed(2)) });
        result.get(b.slug).push({ slug: a.slug, score: Number(score.toFixed(2)) });
      }
    }
  }
  return result;
}

function readReadySlugs(root) {
  const source = read(root, READINESS_PATH);
  const body = source.match(/TEXAS_GATEWAY_INDEX_READY_SLUGS\s*=\s*new Set<string>\(\[([\s\S]*?)\]\)/)?.[1] ?? "";
  return [...body.matchAll(/["']([^"']+)["']/g)].map((match) => match[1]);
}

export function buildGatewayProductionManifest(root = process.cwd()) {
  const review = JSON.parse(read(root, REVIEW_PATH));
  const reviewBySlug = new Map(review.entries.map((entry) => [entry.slug, entry]));
  const articles = parseGatewayArticles(root);
  const routes = routeCorpus(root);
  const duplicates = nearDuplicateScores(articles);
  const readySet = new Set(readReadySlugs(root));

  const entries = articles.map((article) => {
    const editorial = reviewBySlug.get(article.slug) ?? { batch: article.batch, status: "unreviewed", reason: "missing-review" };
    const type = contentType(article.batch);
    const targetMinimumWords = minimumWords(type);
    const sourceClass = authorityRequired(editorial) ? "authoritative-required" : "standard-editorial";
    const routeMatches = routes
      .map((candidate) => ({ ...candidate, score: similarity(article.slug, candidate.slug) }))
      .filter((candidate) => candidate.score >= 0.72)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .map((candidate) => ({ url: candidate.url, source: candidate.source, score: Number(candidate.score.toFixed(2)) }));

    const relatedCount = article.relatedCollections + article.relatedDestinations;
    const proseUnits = article.paragraphCount + article.headingCount;
    const listRatio = article.listItems ? article.listItems / Math.max(article.listItems + proseUnits * 4, 1) : 0;
    const blockers = [];
    if (editorial.status !== "index-ready") blockers.push(`editorial-status:${editorial.status}`);
    if (article.estimatedWords < targetMinimumWords) blockers.push(`depth:${article.estimatedWords}<${targetMinimumWords}`);
    if (article.paragraphCount < 6) blockers.push(`paragraphs:${article.paragraphCount}<6`);
    if (article.headingCount < 3) blockers.push(`headings:${article.headingCount}<3`);
    if (article.internalLinkCount < 5) blockers.push(`internal-links:${article.internalLinkCount}<5`);
    if (relatedCount < 2) blockers.push(`related-targets:${relatedCount}<2`);
    if (!article.hasHero) blockers.push("hero:missing");
    if (!article.hasAuthor) blockers.push("author:missing");
    if (!article.hasPublishedAt) blockers.push("published-at:missing");
    if (listRatio > 0.55) blockers.push(`list-heavy:${listRatio.toFixed(2)}>0.55`);
    if (sourceClass === "authoritative-required" && !authoritative(article.sourceUrl) && !article.externalUrls.some(authoritative)) blockers.push("authority-source:missing");
    if (routeMatches.some((match) => match.score >= 0.9)) blockers.push(`cannibalization:${routeMatches[0].url}`);
    if ((duplicates.get(article.slug) ?? []).length) blockers.push(`near-duplicate:${duplicates.get(article.slug)[0].slug}`);

    const score = Math.max(0, 100 - blockers.reduce((sum, blocker) => {
      if (blocker.startsWith("editorial-status")) return sum + 25;
      if (blocker.startsWith("depth")) return sum + 20;
      if (blocker.startsWith("authority-source")) return sum + 20;
      if (blocker.startsWith("cannibalization") || blocker.startsWith("near-duplicate")) return sum + 15;
      return sum + 7;
    }, 0));

    return {
      slug: article.slug,
      batch: article.batch,
      editorialStatus: editorial.status,
      editorialReason: editorial.reason,
      targetIntent: article.title ?? article.slug.replaceAll("-", " "),
      existingCompetingUrl: routeMatches[0]?.url ?? null,
      requiredSourceClass: sourceClass,
      contentType: type,
      targetMinimumWords,
      requiredDestinationsOrCollections: 2,
      minimumInternalLinks: 5,
      imageRequirement: "non-generic hero with descriptive alt text and verified rights metadata",
      metrics: {
        estimatedWords: article.estimatedWords,
        paragraphCount: article.paragraphCount,
        headingCount: article.headingCount,
        listBlockCount: article.listBlockCount,
        listItems: article.listItems,
        listRatio: Number(listRatio.toFixed(2)),
        internalLinkCount: article.internalLinkCount,
        relatedTargets: relatedCount,
        sourceUrl: article.sourceUrl,
      },
      cannibalizationCandidates: routeMatches,
      nearDuplicateGatewayCandidates: duplicates.get(article.slug) ?? [],
      qualityScore: score,
      readinessResult: blockers.length === 0 ? "pass" : "blocked",
      blockers,
      allowlisted: readySet.has(article.slug),
    };
  });

  const summary = entries.reduce((acc, entry) => {
    acc.total += 1;
    acc[entry.readinessResult] += 1;
    if (entry.allowlisted) acc.allowlisted += 1;
    if (entry.blockers.some((blocker) => blocker.startsWith("cannibalization") || blocker.startsWith("near-duplicate"))) acc.duplicationBlocked += 1;
    if (entry.blockers.some((blocker) => blocker.startsWith("authority-source"))) acc.authorityBlocked += 1;
    if (entry.blockers.some((blocker) => blocker.startsWith("depth"))) acc.depthBlocked += 1;
    return acc;
  }, { total: 0, pass: 0, blocked: 0, allowlisted: 0, duplicationBlocked: 0, authorityBlocked: 0, depthBlocked: 0 });

  return {
    generatedAt: new Date().toISOString(),
    sourceReview: REVIEW_PATH,
    criteria: ["depth", "usefulness", "originality", "evidence", "internal-link value", "intent fit", "thin-content risk", "cannibalization", "image readiness"],
    summary,
    entries,
  };
}

export function validatePromotedGatewayArticles(root = process.cwd()) {
  const manifest = buildGatewayProductionManifest(root);
  const failures = manifest.entries.filter((entry) => entry.allowlisted && entry.readinessResult !== "pass");
  return { manifest, failures };
}
