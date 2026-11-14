// Supporting evidence extractor for the existing whole-site HTML auditor.
// This is deliberately not a second crawler or a separately enforced SEO gate.
export function extractSnippetHtmlSignals(html = '') {
  const types = new Set();
  let jsonLdCount = 0;
  let invalidJsonLdCount = 0;
  const visit = (value) => {
    if (Array.isArray(value)) { for (const item of value) visit(item); return; }
    if (!value || typeof value !== 'object') return;
    const type = value['@type'];
    if (typeof type === 'string') types.add(type);
    else if (Array.isArray(type)) for (const item of type) if (typeof item === 'string') types.add(item);
    for (const nested of Object.values(value)) if (nested && typeof nested === 'object') visit(nested);
  };
  for (const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
    if (!/\btype\s*=\s*["']application\/ld\+json["']/i.test(match[1])) continue;
    jsonLdCount++;
    try { visit(JSON.parse(match[2].trim())); }
    catch { invalidJsonLdCount++; }
  }
  return {
    jsonLdCount,
    invalidJsonLdCount,
    schemaTypes: [...types].sort(),
    hasBreadcrumbSchema: types.has('BreadcrumbList'),
    hasVisibleBreadcrumb: /<nav\b[^>]*aria-label\s*=\s*["'][^"']*breadcrumb[^"']*["']/i.test(html),
  };
}
