export type ValidationIssue = { field: string; message: string };

export const finite = (value: number, fallback = 0) => Number.isFinite(value) ? value : fallback;
export const nonNegative = (value: number) => Math.max(0, finite(value));
export const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, finite(value, min)));

export function validatePercent(field: string, value: number, max = 100): ValidationIssue[] {
  if (!Number.isFinite(value)) return [{ field, message: 'Enter a valid number.' }];
  if (value < 0) return [{ field, message: 'Cannot be negative.' }];
  if (value > max) return [{ field, message: `Must be ${max}% or less.` }];
  return [];
}

export function validatePositive(field: string, value: number, label = 'Value'): ValidationIssue[] {
  if (!Number.isFinite(value)) return [{ field, message: 'Enter a valid number.' }];
  if (value <= 0) return [{ field, message: `${label} must be greater than zero.` }];
  return [];
}

export function issueMap(issues: ValidationIssue[]) {
  return issues.reduce<Record<string, string>>((map, issue) => {
    if (!map[issue.field]) map[issue.field] = issue.message;
    return map;
  }, {});
}
