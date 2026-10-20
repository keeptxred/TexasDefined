/** Enforce readable meta-description lengths without fabricating a complete sentence. */
const MAX_LENGTH = 160;
const DANGLING_ENDING = /(?:\s+(?:a|an|and|or|but|for|with|to|of|in|on|onto|the|by|from|at|into|before|while|than|as)|\s+&)+$/i;

export function cleanMetaDescription(value: string, maxLength = MAX_LENGTH) {
  const cleaned = value.replace(/\s+/g, " ").trim();
  if (cleaned.length <= maxLength) return cleaned;
  const slice = cleaned.slice(0, maxLength - 1);
  const wordBoundary = slice.lastIndexOf(" ");
  const trimmed = (wordBoundary >= maxLength - 40 ? slice.slice(0, wordBoundary) : slice)
    .replace(/[,:;\s]+$/, "");
  // A shortened sentence ending in "and", "the", etc. is an incomplete clause.
  // A continuation marker is clearer than a period after a dangling preposition.
  const withoutDangling = trimmed.replace(DANGLING_ENDING, "").trim();
  if (withoutDangling !== trimmed && withoutDangling) return withoutDangling + "…";
  return trimmed + ".";
}
