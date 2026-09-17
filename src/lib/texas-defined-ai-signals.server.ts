type CoverageStatus = "strong" | "medium" | "weak" | "none";
type AnswerStatus = "answered" | "partial" | "unanswered" | "error";
type FreshnessClass = "static" | "periodic" | "seasonal" | "live";

type QuestionSignalRow = {
  question_fingerprint: string;
  cluster_key: string;
  intent: string;
  topics: string[];
  texas_place: string | null;
  freshness_class: FreshnessClass;
  source_count: number;
  current_source_count: number;
  coverage_status: CoverageStatus;
  answer_status: AnswerStatus;
  model: string | null;
  latency_ms: number | null;
  metadata: Record<string, unknown>;
};

type InsertResult = { error: { message: string } | null };
type SignalInsert = PromiseLike<InsertResult>;
type SignalAdminClient = {
  from: (table: string) => {
    insert: (row: QuestionSignalRow) => SignalInsert;
  };
};

export type AskTexasQuestionSignal = {
  question: string;
  clusterKey?: string;
  intent: string;
  topics: string[];
  texasPlace?: string | null;
  freshnessClass: FreshnessClass;
  sourceCount: number;
  currentSourceCount: number;
  coverageStatus: CoverageStatus;
  answerStatus: AnswerStatus;
  model?: string | null;
  latencyMs?: number | null;
  metadata?: Record<string, unknown>;
};

function fingerprint(value: string) {
  let hash = 2_166_136_261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16_777_619);
  }
  return `q-${(hash >>> 0).toString(16)}`;
}

function normalizedFingerprint(question: string) {
  return fingerprint(question.toLowerCase().replace(/\s+/g, " ").trim());
}

function safeToken(value: string, fallback: string) {
  const normalized = value
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
  return normalized || fallback;
}

export function classifyAskTexasIntent(question: string) {
  if (/\b(?:near|nearest|closest|nearby|around|find|location|locations|store|stores)\b/i.test(question)) return "nearby";
  if (/\b(?:trip|visit|weekend|itinerary|stay|plan|planning|vacation|travel)\b/i.test(question)) return "plan";
  if (/\b(?:versus|vs\.?|compare|difference between|better)\b/i.test(question)) return "compare";
  if (/\b(?:why|how|what is|what are|explain|mean|work)\b/i.test(question)) return "explain";
  return "lookup";
}

export function buildAskTexasClusterKey(input: {
  question: string;
  intent: string;
  topics: string[];
  texasPlace?: string | null;
  explicitKey?: string;
}) {
  if (input.explicitKey) return input.explicitKey.slice(0, 240);
  const topic = safeToken(input.topics[0] ?? "texas-general", "texas-general");
  const place = safeToken(input.texasPlace ?? "statewide", "statewide");
  return `${safeToken(input.intent, "lookup")}:${topic}:${place}:${normalizedFingerprint(input.question)}`;
}

export async function recordAskTexasQuestionSignal(input: AskTexasQuestionSignal) {
  const questionFingerprint = normalizedFingerprint(input.question);
  const clusterKey = buildAskTexasClusterKey({
    question: input.question,
    intent: input.intent,
    topics: input.topics,
    texasPlace: input.texasPlace,
    explicitKey: input.clusterKey,
  });

  const row: QuestionSignalRow = {
    question_fingerprint: questionFingerprint,
    cluster_key: clusterKey,
    intent: input.intent.slice(0, 80),
    topics: input.topics.slice(0, 8).map((topic) => topic.slice(0, 100)),
    texas_place: input.texasPlace?.slice(0, 160) ?? null,
    freshness_class: input.freshnessClass,
    source_count: Math.max(0, Math.min(32767, Math.trunc(input.sourceCount))),
    current_source_count: Math.max(0, Math.min(32767, Math.trunc(input.currentSourceCount))),
    coverage_status: input.coverageStatus,
    answer_status: input.answerStatus,
    model: input.model?.slice(0, 160) ?? null,
    latency_ms: input.latencyMs == null ? null : Math.max(0, Math.trunc(input.latencyMs)),
    metadata: input.metadata ?? {},
  };

  try {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const client = supabaseAdmin as unknown as SignalAdminClient;
    const { error } = await client.from("td_ai_question_signals").insert(row);
    if (error) console.error(`Ask Texas question-signal write failed: ${error.message}`);
  } catch (error) {
    const message = error instanceof Error ? error.message : "unknown error";
    console.error(`Ask Texas question-signal write failed: ${message}`);
  }
}
