// Pure codec for generated official county contact snapshots.
// If a snapshot was valid TypeScript but could not be decoded as JSON-like data,
// the old sync silently treated it as empty and could drop verified records.
// Fail closed instead of allowing a "successful" mass replacement.
export function parseExistingCountySnapshot(text, name='COUNTY_PROPERTY_ENRICHMENT') {
  const marker='export const ' + name;
  const start=text.indexOf(marker);
  if (start<0) throw new Error('Official county source snapshot does not export '+name);
  const open=text.indexOf('= {',start);
  const close=text.lastIndexOf('\n};');
  if (open<0||close<open) throw new Error('Truncated official county source snapshot '+name);
  const literal=text.slice(open+2,close+2);
  const jsonLike=literal
    .replace(/([,{]\s*)([a-z][a-z0-9-]*):/gi,'$1"$2":')
    .replace(/'([^'\\]*(?:\\.[^'\\]*)*)'/g,(_,value)=>JSON.stringify(value.replace(/\\'/g,"'")));
  // Generated TS objects may contain trailing commas; these are not valid
  // JSON. Only strip delimiter commas outside properly escaped JSON strings.
  let cleaned='',quoted=false,escaped=false;
  for(let i=0;i<jsonLike.length;i++){
    const char=jsonLike[i];
    if(quoted){
      cleaned+=char;
      if(escaped)escaped=false;
      else if(char==='\\')escaped=true;
      else if(char==='"')quoted=false;
      continue;
    }
    if(char==='"'){quoted=true;cleaned+=char;continue;}
    if(char===','){
      let next=i+1;
      while(next<jsonLike.length&&/\s/.test(jsonLike[next]))next++;
      if(jsonLike[next]==='}'||jsonLike[next]===']')continue;
    }
    cleaned+=char;
  }
  if(quoted)throw new Error('Unterminated source string in county snapshot '+name);
  let records;
  try{ records=JSON.parse(cleaned); }
  catch(error){ throw new Error('Cannot decode county source snapshot '+name+': '+error.message); }
  if(!records||Array.isArray(records)||typeof records!=='object')throw new Error('County source snapshot is not an object');
  for(const [slug,record] of Object.entries(records)){
    if(!/^[a-z0-9-]+$/.test(slug)||!record||typeof record!=='object'||
      !Array.isArray(record.sourceUrls)||!/^20\d\d-\d\d-\d\d$/.test(record.lastVerifiedAt??'')){
      throw new Error('Corrupt verified county source record: '+slug);
    }
  }
  return records;
}


/**
 * A refreshed Comptroller listing controls current office contacts. Preserve
 * only *separately source-listed*, recently reviewed local search/payment links
 * on the exact current official office host or a subdomain. Never resurrect
 * stale links when an office changes domain or when source evidence is missing.
 */
export function preserveSourcedCountyLinks(previous, current, today = new Date().toISOString().slice(0,10)) {
  if (!previous?.links || !current?.links) return current;
  const priorAt = Date.parse(String(previous.lastVerifiedAt ?? '') + 'T00:00:00Z');
  const now = Date.parse(today + 'T00:00:00Z');
  if (!Number.isFinite(priorAt) || !Number.isFinite(now) || priorAt > now ||
      now - priorAt > 400 * 86400000) return current;

  const hostname = (value) => {
    try {
      const u = new URL(value);
      return u.protocol === 'https:' ? u.hostname.toLowerCase().replace(/^www\./,'') : null;
    } catch { return null; }
  };
  const officialHosts = [
    hostname(current.appraisalDistrict?.websiteUrl),
    hostname(current.taxOffice?.websiteUrl),
  ].filter(Boolean);
  const sourceUrls = new Set(previous.sourceUrls ?? []);
  const retained = {};
  for (const key of ['propertySearchUrl','paymentUrl']) {
    const link = previous.links[key];
    if (typeof link !== 'string' || !sourceUrls.has(link)) continue;
    const host = hostname(link);
    if (!host || !officialHosts.some(office => host === office || host.endsWith('.'+office))) continue;
    if (!current.links[key]) retained[key] = link;
  }
  if (!Object.keys(retained).length) return current;
  return {
    ...current,
    links: {...retained, ...current.links},
    sourceUrls: [...new Set([...(current.sourceUrls ?? []), ...Object.values(retained)])],
  };
}


/**
 * A successful HTTP fetch is not evidence that a county has disappeared.
 * Distinguish positively stale official office dates from a parser/URL-security
 * failure. Reject a destructive refresh when previous data had recent upstream
 * dates and the new source was not affirmatively shown stale.
 */
export function isAmbiguousCountyWithdrawal(previous, result, now = new Date().toISOString().slice(0,10)) {
  if (!previous || !result?.fetched || result.enrichment) return false;
  const audit = result.audit ?? {};
  // Only explicit, successfully parsed stale dates justify withdrawal here.
  const confirmedStale = Boolean(
    audit.appraisalSourceUpdated && audit.taxOfficeSourceUpdated &&
    (audit.appraisalCurrent === false || audit.taxOfficeCurrent === false)
  );
  if (confirmedStale) return false;
  const cutoff = Date.parse(now + 'T00:00:00Z');
  const dates = [
    previous.sourceUpdatedAt?.appraisalDistrict,
    previous.sourceUpdatedAt?.taxOffice,
  ].map(value=>Date.parse(String(value ?? '')+'T00:00:00Z'));
  // Missing or non-future source dates mean we lack evidence for a safe delete.
  if (!Number.isFinite(cutoff) || dates.some(date=>!Number.isFinite(date))) return true;
  return dates.every(date => date<=cutoff && cutoff-date<=730*86400000);
}

// The weekly importer may advance independent verified counties while
// retaining existing source-backed records where a current official page's
// outgoing office links are unreachable or ambiguous. This NEVER creates a
// new verified record from an unverified page and never changes the old date.
export function applyQuarantinedCountyRefresh(previous, results, quarantinedSlugs) {
  const next = { ...previous };
  for (const { county, fetched, enrichment } of results) {
    if (enrichment) next[county.slug] = preserveSourcedCountyLinks(next[county.slug], enrichment);
    else if (fetched && !quarantinedSlugs.has(county.slug)) delete next[county.slug];
  }
  return next;
}
