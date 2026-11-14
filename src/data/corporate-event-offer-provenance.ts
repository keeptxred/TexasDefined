/**
 * Venue identity domains are grounded only in the source-reviewed directory.
 * An applicant URL must be the same HTTPS site or a legitimate child of that
 * official hostname. Never trust a parent of the venue's official hostname:
 * "com", "co.uk" or a generic group parent is not independent venue proof.
 *
 * Public offer redemption URLs must additionally live on the already-verified
 * business website (or its own HTTPS subdomain).
 */
function cleanCorporateHost(rawUrl: string): string | null {
  try {
    const url = new URL(rawUrl);
    if (url.protocol !== 'https:' || url.username || url.password || url.port) return null;
    if (url.hostname.endsWith('.') || url.hostname.length > 253) return null;
    const host = url.hostname.toLowerCase().replace(/^www\./, '');
    const labels = host.split('.');
    if (labels.length < 2 || labels.some(label => !/^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/.test(label))) return null;
    if (labels[labels.length - 1].length < 2 || labels[labels.length - 1] === 'local') return null;
    return host;
  } catch {
    return null;
  }
}

function sameOrChildHost(testHost: string, officialHost: string): boolean {
  return testHost === officialHost || testHost.endsWith('.' + officialHost);
}

export function corporateEventOfficialDomainMatches(applicantWebsite: string, officialVenueUrl: string): boolean {
  const applicant = cleanCorporateHost(applicantWebsite);
  const official = cleanCorporateHost(officialVenueUrl);
  return applicant !== null && official !== null && sameOrChildHost(applicant, official);
}

export function corporateEventVerifiedRedemptionUrl(
  redemptionUrl: string, applicantWebsite: string, officialVenueUrl: string,
): boolean {
  const redemption = cleanCorporateHost(redemptionUrl);
  const business = cleanCorporateHost(applicantWebsite);
  return redemption !== null && business !== null
    && corporateEventOfficialDomainMatches(applicantWebsite, officialVenueUrl)
    && sameOrChildHost(redemption, business);
}

/** Evidence may be public only when actually recorded and not future-dated. */
export function corporateEventEvidenceTimestampIsValid(value: string | null | undefined, now: Date = new Date()): boolean {
  if (typeof value !== 'string') return false;
  const parsed = value.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.\d{1,9})?(Z|[+-]\d{2}:\d{2})$/);
  if (!parsed) return false;
  const [, yearText, monthText, dayText, hourText, minuteText, secondText, zone] = parsed;
  const [year, month, day, hour, minute, second] = [yearText, monthText, dayText, hourText, minuteText, secondText].map(Number);
  if (month < 1 || month > 12 || day < 1 || day > new Date(Date.UTC(year, month, 0)).getUTCDate()
      || hour > 23 || minute > 59 || second > 59) return false;
  if (zone !== 'Z') {
    const zoneHours = Number(zone.slice(1, 3));
    const zoneMinutes = Number(zone.slice(4, 6));
    if (zoneHours > 14 || zoneMinutes > 59 || (zoneHours === 14 && zoneMinutes !== 0)) return false;
  }
  const instant = Date.parse(value);
  return Number.isFinite(instant) && instant <= now.getTime();
}
