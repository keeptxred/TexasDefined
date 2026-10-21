import type { DestinationVisitorFact } from "./types";

/**
 * Primary-source visitor facts are deliberately opt-in. Different places need
 * different answers; missing amenities, admission or camping fields are never
 * filled from a generic template. Stale claims must not appear as current.
 */
export interface VisitorFactIssue {
  code: "visitor-fact-duplicate" | "visitor-fact-source" | "visitor-fact-date" | "visitor-fact-stale" | "visitor-fact-content";
  severity: "error" | "warning";
  message: string;
}
const TIME_SENSITIVE_TOPICS = new Set(["admission", "hours", "reservations", "access", "swimming"]);
const ISO_DAY = /^\d{4}-\d{2}-\d{2}$/;

function calendarDay(value: string): number | null {
  if (!ISO_DAY.test(value)) return null;
  const day = Date.parse(value + "T00:00:00Z");
  if (!Number.isFinite(day) || new Date(day).toISOString().slice(0, 10) !== value) return null;
  return day;
}

export function reviewDestinationVisitorFacts(
  facts: readonly DestinationVisitorFact[] | undefined,
  asOfDay = new Date().toISOString().slice(0, 10),
): { visible: DestinationVisitorFact[]; issues: VisitorFactIssue[] } {
  const visible: DestinationVisitorFact[] = [];
  const issues: VisitorFactIssue[] = [];
  const seen = new Set<string>();
  const today = calendarDay(asOfDay);
  for (const fact of facts ?? []) {
    const identity = fact.topic + ":" + fact.label.trim().toLocaleLowerCase("en-US").replace(/\s+/g, " ");
    let invalid = false;
    if (seen.has(identity)) {
      issues.push({ code: "visitor-fact-duplicate", severity: "error", message: "Repeated visitor fact: " + fact.label });
      invalid = true;
    }
    seen.add(identity);
    if (!fact.label.trim() || fact.detail.trim().length < 16) {
      issues.push({ code: "visitor-fact-content", severity: "error", message: "Visitor fact must include a real label and useful sourced answer." });
      invalid = true;
    }
    if (!/^https:\/\/[^\s/]+\.[^\s/]+(?:\/[^\s]*)?$/i.test(fact.sourceUrl)) {
      issues.push({ code: "visitor-fact-source", severity: "error", message: "Visitor fact needs its own HTTPS primary-source URL: " + fact.label });
      invalid = true;
    }
    const checked = calendarDay(fact.checkedAt);
    if (checked === null || today === null || checked > today) {
      issues.push({ code: "visitor-fact-date", severity: "error", message: "Visitor fact has a missing, future or invalid verification date: " + fact.label });
      invalid = true;
    }
    if (invalid || checked === null || today === null) continue;
    const maxAgeDays = TIME_SENSITIVE_TOPICS.has(fact.topic) ? 120 : 365;
    if ((today - checked) / 86400000 > maxAgeDays) {
      issues.push({ code: "visitor-fact-stale", severity: "warning", message: "Visitor fact needs fresh operator verification before displaying: " + fact.label });
      continue;
    }
    visible.push(fact);
  }
  return { visible, issues };
}
