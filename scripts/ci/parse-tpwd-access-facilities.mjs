// Only headings inside the actual TPWD "Public Access Facilities" article
// section are candidates. TPWD also renders unrelated sidebar headings
// (Fishing, Water Resources, Nearby State Parks) before the lake article.
// Do not treat those navigation labels as ramps or fishing access locations.
function headingText(raw) {
  return raw.replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;|&#160;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&apos;|&#x27;|&#39;/gi, "'")
    .replace(/&quot;/gi, '"')
    .replace(/\s+/g, " ")
    .trim();
}

export function extractAccessFacilityHeadings(html) {
  const headings = [...html.matchAll(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi)]
    .map((match) => ({ level: Number(match[1]), label: headingText(match[2]) }));
  const accessIndex = headings.findIndex(
    ({ level, label }) => level === 2 && /^Public Access Facilities$/i.test(label)
  );
  if (accessIndex < 0) return [];

  const candidates = [];
  for (const heading of headings.slice(accessIndex + 1)) {
    // Another primary section (including newsletter/footer) ends the access
    // article. Never search through an entire unrelated document for names.
    if (heading.level <= 2) break;
    if (heading.level < 3 || heading.label.length < 4 || heading.label.length > 100) continue;
    if (/^(?:return to|public access facilities|sign up for email|fishing regulations|fishing reports|local information|nearby state parks|water resources)$/i.test(heading.label)) continue;
    if (!candidates.includes(heading.label)) candidates.push(heading.label);
    if (candidates.length >= 30) break;
  }
  return candidates;
}
