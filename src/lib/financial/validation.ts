export type ValidationIssue = {
  field: string;
  message: string;
};

export function finiteNumber(value: number, fallback = 0) {
  return Number.isFinite(value) ? value : fallback;
}

export function nonNegative(value: number) {
  return Math.max(0, finiteNumber(value));
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, finiteNumber(value, min)));
}

export function validateNonNegative(field: string, label: string, value: number): ValidationIssue[] {
  if (!Number.isFinite(value)) return [{ field, message: label + " must be a number." }];
  if (value < 0) return [{ field, message: label + " cannot be negative." }];
  return [];
}

export function validatePercent(field: string, label: string, value: number, max = 100): ValidationIssue[] {
  const issues = validateNonNegative(field, label, value);
  if (Number.isFinite(value) && value > max) issues.push({ field, message: label + " cannot exceed " + max + "%." });
  return issues;
}

export function uniqueIssues(issues: ValidationIssue[]) {
  const seen = new Set<string>();
  return issues.filter((issue) => {
    const key = issue.field + ":" + issue.message;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
