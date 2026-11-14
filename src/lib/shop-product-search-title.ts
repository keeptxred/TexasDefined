/**
 * A merchandise title is the human product name, not the list of synonyms
 * appended by a print-on-demand storefront. The full name remains in the H1
 * and Product schema; only the search title uses this compact display name.
 * Shared buildMeta() enforces the overall 68-character TexasDefined budget.
 */
export function shopProductSearchName(input: string | null | undefined): string {
  const clean = String(input ?? "").replace(/\s+/g, " ").trim();
  const primary = clean.split(",")[0]?.trim() || clean;
  const unbranded = primary.replace(/\s*[|–—]\s*Texas Defined(?: Shop)?\s*$/i, "").trim();
  return unbranded || "Texas Shop Product";
}
