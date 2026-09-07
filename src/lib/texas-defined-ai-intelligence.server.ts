import { loadTexasKnowledgeGraph, type TexasEntityRecord } from "../data/knowledge-graph";
import { applyCurrentEntityCorrections } from "../data/knowledge-graph/current-entity-corrections";
import { canonicalEntityPath, rankRelatedEntities } from "../data/knowledge-graph/relationships";

export type TexasAiIntent =
  | "explain"
  | "discover"
  | "nearby"
  | "compare"
  | "plan"
  | "current-status"
  | "rules-deadlines"
  | "event-time"
  | "how-to"
  | "general";

export type TexasAiFreshness = "static" | "periodic" | "seasonal" | "live";
export type TexasAiCoverage = "strong" | "medium" | "weak" | "none";

export type TexasAiClassification = {
  intent: TexasAiIntent;
  topics: string[];
  freshnessClass: TexasAiFreshness;
  texasPlace?: string;
  needsCurrentVerification: boolean;
};

export type TexasAiEntityContext = {
  text: string;
  entities: TexasEntityRecord[];
  currentEntityCount: number;
  matchedKinds: string[];
};

const SITE_ORIGIN = "https://texasdefined.com";
const DEFAULT_SUPABASE_URL = "https://ftkznprjljkhymknvhye.supabase.co";
const MAX_ENTITY_CONTEXT = 6;
const RELATED_PER_ENTITY = 4;
const CURRENT_MAX_AGE_DAYS = 45;

const STOP_WORDS = new Set([
  "a", "about", "an", "and", "are", "around", "at", "be", "best", "can", "do", "does", "for", "from", "how", "i", "in", "is", "it", "me", "my", "near", "of", "on", "or", "should", "texas", "that", "the", "there", "this", "to", "what", "when", "where", "which", "why", "with",
]);

const TOPIC_PATTERNS: Array<[string, RegExp]> = [
  ["events", /\b(event|events|festival|festivals|fair|fairs|rodeo|rodeos|concert|concerts|weekend)\b/i],
  ["outdoors", /\b(park|parks|hike|hiking|camp|camping|outdoors|trail|trails|wildlife)\b/i],
  ["water", /\b(beach|beaches|lake|lakes|river|rivers|swimming|spring|springs|waterfall|waterfalls)\b/i],
  ["food", /\b(bbq|barbecue|restaurant|restaurants|food|kolache|klobasnek|taco|tacos|food truck|food trucks)\b/i],
  ["brands", /\b(h-?e-?b|bucee'?s|buc-ee'?s|whataburger|academy|cavender'?s|texas brand|texas brands)\b/i],
  ["property-tax", /\b(property tax|appraisal|homestead|cad\b|tax office|protest deadline)\b/i],
  ["government", /\b(mud district|water district|county seat|school district|dps|county clerk|government)\b/i],
  ["roads", /\b(fm road|rm road|farm-to-market|ranch-to-market|frontage road|highway|highways|road trip|roads)\b/i],
  ["culture", /\b(homecoming mum|mums|tradition|traditions|flag|flags|culture|courthouse square)\b/i],
  ["history", /\b(history|historic|mission|missions|battlefield|museum|museums)\b/i],
  ["sports", /\b(stadium|arena|sports venue|football|baseball|basketball|soccer|golf|golf course)\b/i],
  ["travel", /\b(trip|visit|visiting|stay|hotel|hotels|things to do|destination|drive|route)\b/i],
  ["moving", /\b(move to texas|moving to texas|relocate|relocating|new to texas)\b/i],
  ["wildflowers", /\b(bluebonnet|bluebonnets|wildflower|wildflowers)\b/i],
  ["hunting-fishing", /\b(hunt|hunting|fish|fishing|license|bag limit|season)\b/i],
];

const EVENT_TIME_PATTERNS = [/\bthis weekend\b/, /\bthis week\b/, /\bthis month\b/, /\btonight\b/, /\btoday\b/, /\btomorrow\b/, /\bwhen is\b/, /\bwhat date\b/, /\bcoming up\b/];
const RULE_PATTERNS = [/\bdeadline\b/, /\brule\b/, /\brules\b/, /\blegal\b/, /\blaw\b/, /\blicense\b/, /\bpermit\b/, /\bbag limit\b/, /\bcan i drive\b/, /\bcan i have a campfire\b/];
const LIVE_PATTERNS = [/\bright now\b/, /\btoday\b/, /\btonight\b/, /\btomorrow\b/, /\bopen now\b/, /\bopen today\b/, /\bclosed\b/, /\bclosure\b/, /\bcurrent\b/, /\bstatus\b/, /\bavailable\b/, /\bavailability\b/, /\bburn ban\b/, /\bconditions?\b/, /\bcancel(?:ed|led)?\b/];
const NEARBY_PATTERNS = [/\bnear me\b/, /\bclosest\b/, /\bwithin \d+\s*(?:mi|mile|miles)\b/, /\bnear (?:austin|houston|dallas|san antonio|fort worth|el paso|corpus christi|lubbock|amarillo|waco|katy)\b/];

function hasAny(value: string, patterns: RegExp[]) {
  return patterns.some((pattern) => pattern.test(value));
}

export function classifyTexasQuestion(question: string): TexasAiClassification {
  const normalized = question.trim();
  const lower = normalized.toLowerCase();
  const topics = TOPIC_PATTERNS.filter(([, pattern]) => pattern.test(lower)).map(([topic]) => topic);
  const eventWithTime = topics.includes("events") && hasAny(lower, EVENT_TIME_PATTERNS);
  const ruleQuestion = hasAny(lower, RULE_PATTERNS);
  const liveQuestion = hasAny(lower, LIVE_PATTERNS)
    || (/\breservation\b/.test(lower) && hasAny(lower, [/\bthis weekend\b/, /\btoday\b/, /\btomorrow\b/, /\btonight\b/]));

  let intent: TexasAiIntent = "general";
  if (hasAny(lower, [/\bcompare\b/, /\bversus\b/, /\bvs\.?\b/, /\bdifference between\b/, /\bbetter than\b/])) intent = "compare";
  else if (eventWithTime) intent = "event-time";
  else if (ruleQuestion) intent = "rules-deadlines";
  else if (liveQuestion) intent = "current-status";
  else if (hasAny(lower, [/\bitinerary\b/, /\broad trip\b/, /\bon the way\b/, /\bplan (?:a|my|our)\b/, /\broute\b/])) intent = "plan";
  else if (hasAny(lower, NEARBY_PATTERNS)) intent = "nearby";
  else if (hasAny(lower, [/^how\b/, /\bhow do\b/, /\bhow can\b/])) intent = "how-to";
  else if (hasAny(lower, [/^why\b/, /^what (?:is|are|does|makes)\b/, /\bexplained?\b/, /\bwhat makes\b/])) intent = "explain";
  else if (hasAny(lower, [/\bbest\b/, /\bthings to do\b/, /\bwhere (?:can|should|do)\b/, /\bfind\b/, /\bvisit\b/])) intent = "discover";

  let freshnessClass: TexasAiFreshness = "static";
  if (liveQuestion || (eventWithTime && hasAny(lower, [/\btoday\b/, /\btonight\b/, /\btomorrow\b/, /\bthis weekend\b/, /\bthis week\b/, /\bthis month\b/]))) freshnessClass = "live";
  else if (hasAny(lower, [/\bbluebonnet\b/, /\bwildflower\b/, /\bhunting season\b/, /\bfishing season\b/, /\brodeo\b/, /\bfestival\b/, /\bstate fair\b/])) freshnessClass = "seasonal";
  else if (ruleQuestion || hasAny(lower, [/\bdeadline\b/, /\btax\b/, /\bhours\b/, /\bprice\b/, /\breservation\b/, /\bschedule\b/, /\bstores?\b/, /\bthis year\b/])) freshnessClass = "periodic";

  return {
    intent,
    topics: topics.length ? topics : ["texas-general"],
    freshnessClass,
    needsCurrentVerification: freshnessClass !== "static",
  };
}

function meaningfulTerms(question: string) {
  return question
    .toLowerCase()
    .replace(/[^a-z0-9' -]/g, " ")
    .split(/\s+/)
    .filter((token) => token.length >= 3 && !STOP_WORDS.has(token))
    .slice(0, 12);
}

function entityScore(entity: TexasEntityRecord, question: string, terms: string[]) {
  const lowerQuestion = question.toLowerCase();
  const names = [entity.name, entity.slug.replaceAll("-", " "), ...entity.aliases].map((value) => value.toLowerCase());
  let score = names.some((name) => name.length >= 3 && lowerQuestion.includes(name)) ? 20 : 0;
  const haystack = [entity.name, entity.slug, ...entity.aliases, entity.kind, entity.countySlug, entity.region, ...(entity.tags ?? [])]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  for (const term of terms) if (haystack.includes(term)) score += 2;
  if (entity.status === "active") score += 1;
  if (entity.sourceConfidence === "official") score += 1;
  return score;
}

function isCurrent(entity: TexasEntityRecord) {
  if (!entity.sourceCheckedAt) return false;
  const checked = Date.parse(entity.sourceCheckedAt);
  if (!Number.isFinite(checked)) return false;
  return Date.now() - checked <= CURRENT_MAX_AGE_DAYS * 86_400_000;
}

function resolvedPlace(entities: TexasEntityRecord[]) {
  const place = entities.find((entity) => ["city", "county", "metro-area", "region"].includes(entity.kind)) ?? entities.find((entity) => entity.countySlug);
  if (!place) return undefined;
  if (["city", "county", "metro-area", "region"].includes(place.kind)) return place.name;
  return place.countySlug?.replaceAll("-", " ");
}

export async function buildTexasEntityContext(question: string): Promise<TexasAiEntityContext> {
  const terms = meaningfulTerms(question);
  if (!terms.length) return { text: "No structured Texas entity match was found.", entities: [], currentEntityCount: 0, matchedKinds: [] };

  const graph = (await loadTexasKnowledgeGraph({ query: terms.join(" "), limit: 120 })).map(applyCurrentEntityCorrections);
  const ranked = graph
    .map((entity) => ({ entity, score: entityScore(entity, question, terms) }))
    .filter(({ score }) => score >= 3)
    .sort((left, right) => right.score - left.score || left.entity.name.localeCompare(right.entity.name))
    .slice(0, MAX_ENTITY_CONTEXT)
    .map(({ entity }) => entity);

  if (!ranked.length) return { text: "No structured Texas entity match was found.", entities: [], currentEntityCount: 0, matchedKinds: [] };

  const byId = new Map(graph.map((entity) => [entity.id, entity]));
  const blocks = ranked.map((entity, index) => {
    const related = rankRelatedEntities(entity, graph, RELATED_PER_ENTITY)
      .map(({ entity: item, reasons }) => `${item.name} (${item.kind}; ${reasons.join(", ")})`)
      .join("; ");
    const explicitRelations = entity.relationships
      .slice(0, RELATED_PER_ENTITY)
      .map((relationship) => {
        const target = byId.get(relationship.targetId);
        return `${relationship.type}: ${target?.name ?? relationship.targetId}${relationship.verifiedAt ? ` [verified ${relationship.verifiedAt}]` : ""}`;
      })
      .join("; ");
    const canonical = `${SITE_ORIGIN}${canonicalEntityPath(entity)}`;
    return [
      `Entity ${index + 1}: ${entity.name}`,
      `Kind: ${entity.kind}`,
      `Texas Defined URL: ${canonical}`,
      entity.description ? `Description: ${entity.description}` : undefined,
      entity.countySlug ? `County: ${entity.countySlug.replaceAll("-", " ")}` : undefined,
      entity.region ? `Region: ${entity.region.replaceAll("-", " ")}` : undefined,
      entity.coordinates ? `Coordinates: ${entity.coordinates.latitude}, ${entity.coordinates.longitude}` : undefined,
      `Status: ${entity.status}`,
      `Source confidence: ${entity.sourceConfidence}`,
      entity.sourceCheckedAt ? `Source checked: ${entity.sourceCheckedAt}` : "Source checked: not recorded",
      entity.reviewDueAt ? `Review due: ${entity.reviewDueAt}` : undefined,
      entity.officialUrl ? `Official source: ${entity.officialUrl}` : undefined,
      explicitRelations ? `Verified relationships: ${explicitRelations}` : undefined,
      related ? `Related TexasDefined entities: ${related}` : undefined,
    ].filter(Boolean).join("\n");
  });

  return {
    text: blocks.join("\n\n"),
    entities: ranked,
    currentEntityCount: ranked.filter(isCurrent).length,
    matchedKinds: [...new Set(ranked.map((entity) => entity.kind))],
  };
}

export function classifyCoverage(sourceCount: number, entityCount: number): TexasAiCoverage {
  const total = sourceCount + entityCount;
  if (sourceCount >= 3 || total >= 6) return "strong";
  if (sourceCount >= 1 && total >= 3) return "medium";
  if (total >= 1) return "weak";
  return "none";
}

function envValue(env: unknown, names: string[]) {
  if (typeof env !== "object" || env === null) return null;
  for (const name of names) {
    const value = Reflect.get(env, name);
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return null;
}

async function sha256(value: string) {
  const bytes = new TextEncoder().encode(value.trim().toLowerCase());
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function clusterKey(classification: TexasAiClassification, entityContext: TexasAiEntityContext) {
  const place = resolvedPlace(entityContext.entities)?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "statewide";
  const topics = classification.topics.slice(0, 3).sort().join("+");
  const kind = entityContext.matchedKinds[0] ?? "general";
  return `${classification.intent}:${topics}:${place}:${kind}`.slice(0, 240);
}

export async function recordTexasAiQuestionSignal(input: {
  env: unknown;
  question: string;
  classification: TexasAiClassification;
  entityContext: TexasAiEntityContext;
  sourceCount: number;
  coverageStatus: TexasAiCoverage;
  answerStatus: "answered" | "partial" | "unanswered" | "error";
  model: string;
  latencyMs?: number;
}) {
  const supabaseUrl = envValue(input.env, ["KEEP_TX_RED_SUPABASE_URL", "SUPABASE_URL"]) ?? DEFAULT_SUPABASE_URL;
  const serviceRoleKey = envValue(input.env, ["KEEP_TX_RED_SUPABASE_SERVICE_ROLE_KEY", "SUPABASE_SERVICE_ROLE_KEY"]);
  if (!serviceRoleKey) return;

  try {
    const fingerprint = await sha256(input.question);
    const place = resolvedPlace(input.entityContext.entities);
    const response = await fetch(`${supabaseUrl.replace(/\/$/, "")}/rest/v1/td_ai_question_signals`, {
      method: "POST",
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        question_fingerprint: fingerprint,
        cluster_key: clusterKey(input.classification, input.entityContext),
        intent: input.classification.intent,
        topics: input.classification.topics,
        texas_place: place ?? null,
        freshness_class: input.classification.freshnessClass,
        source_count: input.sourceCount,
        current_source_count: input.entityContext.currentEntityCount,
        coverage_status: input.coverageStatus,
        answer_status: input.answerStatus,
        model: input.model,
        latency_ms: input.latencyMs ?? null,
        metadata: {
          matchedEntityKinds: input.entityContext.matchedKinds,
          needsCurrentVerification: input.classification.needsCurrentVerification,
        },
      }),
    });
    if (!response.ok) console.error("Ask Texas AI telemetry insert failed", response.status);
  } catch (error) {
    console.error("Ask Texas AI telemetry unavailable", error);
  }
}

export function withResolvedPlace(classification: TexasAiClassification, entityContext: TexasAiEntityContext): TexasAiClassification {
  return { ...classification, texasPlace: resolvedPlace(entityContext.entities) };
}
