// Evaluate visitor-rendered comparison HTML instead of source-only JSX tokens.
// This is pure and intentionally network-free for deterministic CI tests.
export function assessFishingCompareHtml(html, selectedLakeSlugs) {
  const source = String(html ?? "");
  const canonicalTags = [...source.matchAll(/<link\b[^>]*>/gi)].map(([tag]) => tag)
    .filter((tag) => /\brel=["']canonical["']/i.test(tag));
  const canonical = canonicalTags.length === 1
    && /\bhref=["']https:\/\/texasdefined\.com\/fishing\/compare["']/i.test(canonicalTags[0]);
  const robotsTags = [...source.matchAll(/<meta\b[^>]*>/gi)].map(([tag]) => tag)
    .filter((tag) => /\bname=["']robots["']/i.test(tag));
  const noindex = robotsTags.some((tag) => /\bcontent=["'][^"']*\b(?:noindex|none)\b/i.test(tag));
  const clean = source.replace(/<head\b[^>]*>[\s\S]*?<\/head>/gi, " ")
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;|&#160;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/\s+/g, " ").trim();
  const h1 = [...source.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)];
  const table = source.match(/<table\b[\s\S]*?<\/table>/i)?.[0] ?? "";
  const lakeLinks = [...table.matchAll(/\bhref=["']\/fishing\/lakes\/([a-z0-9-]+)["']/gi)]
    .map((match) => match[1]);
  const tableLakes = [...new Set(lakeLinks)].sort();
  const requested = [...new Set(selectedLakeSlugs)].sort();
  const tableText = table.replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  const checks = {
    canonical,
    indexable: !noindex,
    singleVisibleH1: h1.length === 1 && clean.includes("Compare Texas Fishing Lakes Side by Side"),
    semanticKeyboardTable: /\brole=["']region["']/i.test(source)
      && /\baria-label=["']Lake comparison table["']/i.test(source)
      && /\btabindex=["']?0["']?/i.test(source)
      && /<table\b/i.test(table)
      && /<th\b[^>]*scope=["']col["']/i.test(table)
      && /<th\b[^>]*scope=["']row["']/i.test(table),
    requestedLakesActuallyCompared: JSON.stringify(tableLakes) === JSON.stringify(requested),
    sourceLinked: /https:\/\/tpwd\.texas\.gov\//i.test(source) && clean.includes("Source-backed fishery grades"),
    honestAccess: clean.includes("Recorded access, not open-now status")
      && clean.includes("Access inventory is not a count of usable boat ramps"),
    practicalConditions: clean.includes("Official lake level and conditions")
      && clean.includes("Regulations, hazards and launch restrictions"),
    sourceDates: clean.includes("Reviewed source dates"),
    editorialDisclosure: clean.includes("How to Read This Comparison")
      && clean.includes("does not rank the selected lakes")
      && clean.includes("does not accept paid weighting")
      && source.includes("/corrections-policy"),
    alanHenryOfficialGrades: !requested.includes("alan-henry-reservoir")
      || (/Largemouth Bass\s*—\s*good/i.test(tableText) && /Crappie\s*—\s*poor/i.test(tableText)),
  };
  return { checks, failures: Object.entries(checks).filter(([, ok]) => !ok).map(([key]) => key), comparedLakeSlugs: tableLakes };
}
