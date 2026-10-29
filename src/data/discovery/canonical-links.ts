/**
 * One canonical TexasDefined event has one durable guide. Discovery sources
 * and ticket vendors are linked as supporting evidence, not extra pages.
 */
export function countyGuidePath(countyName: string | undefined): string | null {
  if (!countyName || !/^[\p{L}.'’\- ]+ County$/u.test(countyName.trim())) return null;
  const slug = countyName.replace(/ County$/i, "").normalize("NFKD").toLowerCase()
    .replace(/[’']/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return slug ? `/county/${slug}` : null;
}

export function canonicalEventGuidePath(slug: string, publishedPath?: string) {
  if (publishedPath && /^\/(?:event|holiday)\/[a-z0-9-]+$/.test(publishedPath)) return publishedPath;
  return /^[-a-z0-9]+$/.test(slug) ? `/event/${slug}` : null;
}

/** Related pages are source-governed and deduplicated; none implies admission. */
export function eventPlanningLinks(event: {slug:string; city:string; countyName?:string; href:string}) {
  const links = [{href:event.href,label:"Event guide"}];
  const countyPath=countyGuidePath(event.countyName);
  if(countyPath && countyPath!==event.href) links.push({href:countyPath,label:event.countyName!});
  return [...new Map(links.map((link)=>[link.href,link])).values()];
}
