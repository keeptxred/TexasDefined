const COMPTROLLER_DIRECTORY_URL = 'https://comptroller.texas.gov/taxes/property-tax/county-directory/';
const TAC_COUNTY_BASE_URL = 'https://www.county.org';
const REQUEST_TIMEOUT_MS = 12000;

export type LocalOfficeProfile = {
  name?: string;
  websiteUrl?: string;
  phone?: string;
  email?: string;
  address?: string;
  lastUpdated?: string;
};

export type LocalGovernmentProfile = {
  countyWebsiteUrl?: string;
  appraisalDistrict: LocalOfficeProfile;
  taxOffice: LocalOfficeProfile;
  comptrollerCountyUrl?: string;
  tacCountyUrl: string;
  sourceUrls: string[];
};

const profileCache = new Map<string, Promise<LocalGovernmentProfile>>();
let comptrollerDirectoryPromise: Promise<Map<string, string>> | undefined;

export function loadLocalGovernmentProfile(countySlug: string, countyName: string) {
  const cached = profileCache.get(countySlug);
  if (cached) return cached;
  const promise = fetchLocalGovernmentProfile(countySlug, countyName);
  profileCache.set(countySlug, promise);
  return promise;
}

async function fetchLocalGovernmentProfile(countySlug: string, countyName: string): Promise<LocalGovernmentProfile> {
  const tacCountyUrl = `${TAC_COUNTY_BASE_URL}/${countySlug}-county`;
  const [countyWebsiteResult, comptrollerUrlResult] = await Promise.allSettled([
    fetchCountyWebsite(tacCountyUrl, countyName),
    findComptrollerCountyUrl(countySlug, countyName),
  ]);

  const countyWebsiteUrl = countyWebsiteResult.status === 'fulfilled' ? countyWebsiteResult.value : undefined;
  const comptrollerCountyUrl = comptrollerUrlResult.status === 'fulfilled' ? comptrollerUrlResult.value : undefined;
  let appraisalDistrict: LocalOfficeProfile = {};
  let taxOffice: LocalOfficeProfile = {};

  if (comptrollerCountyUrl) {
    try {
      const page = await fetchText(comptrollerCountyUrl);
      appraisalDistrict = parseOfficeSection(page, 'Appraisal District', 'Tax Assessor/Collector');
      taxOffice = parseOfficeSection(page, 'Tax Assessor/Collector');
    } catch (error) {
      console.error(`Unable to load Comptroller local-office directory for ${countySlug}`, error);
    }
  }

  return {
    countyWebsiteUrl,
    appraisalDistrict,
    taxOffice,
    comptrollerCountyUrl,
    tacCountyUrl,
    sourceUrls: [tacCountyUrl, comptrollerCountyUrl].filter((value): value is string => Boolean(value)),
  };
}

async function fetchCountyWebsite(tacCountyUrl: string, countyName: string) {
  const html = await fetchText(tacCountyUrl);
  const baseName = countyName.replace(/ County$/, '');
  const escaped = escapeRegExp(`${baseName} County`);
  const patterns = [
    new RegExp(`<a[^>]+href=["']([^"']+)["'][^>]*>[^<]*${escaped}(?:&#39;|'|&rsquo;|’)?s website[^<]*<\\/a>`, 'i'),
    new RegExp(`<a[^>]+href=["']([^"']+)["'][^>]*>[^<]*${escapeRegExp(baseName)}[^<]*website[^<]*<\\/a>`, 'i'),
  ];
  for (const pattern of patterns) {
    const match = pattern.exec(html);
    if (match?.[1]) return normalizeExternalUrl(decodeEntities(match[1]));
  }
  return undefined;
}

async function findComptrollerCountyUrl(countySlug: string, countyName: string) {
  if (!comptrollerDirectoryPromise) comptrollerDirectoryPromise = fetchComptrollerDirectory();
  const directory = await comptrollerDirectoryPromise;
  return directory.get(countySlug) ?? directory.get(slug(countyName.replace(/ County$/, '')));
}

async function fetchComptrollerDirectory() {
  const html = await fetchText(COMPTROLLER_DIRECTORY_URL);
  const result = new Map<string, string>();
  const anchorPattern = /<a[^>]+href=["']([^"']*county-directory\/([^"'?#]+\.php))["'][^>]*>([\s\S]*?)<\/a>/gi;
  for (const match of html.matchAll(anchorPattern)) {
    const href = match[1];
    const label = stripTags(match[3]).replace(/^\d{3}\s+/, '').trim();
    if (!label) continue;
    result.set(slug(label), new URL(href, COMPTROLLER_DIRECTORY_URL).toString());
  }
  return result;
}

function parseOfficeSection(html: string, heading: string, nextHeading?: string): LocalOfficeProfile {
  const start = new RegExp(`<h3[^>]*>\\s*${escapeRegExp(heading)}\\s*<\\/h3>`, 'i').exec(html);
  if (!start) return {};
  const remainder = html.slice(start.index + start[0].length);
  const end = nextHeading
    ? new RegExp(`<h3[^>]*>\\s*${escapeRegExp(nextHeading)}\\s*<\\/h3>`, 'i').exec(remainder)?.index
    : remainder.search(/<h2[^>]*>|<footer[^>]*>/i);
  const section = remainder.slice(0, end != null && end >= 0 ? end : undefined);

  const website = /Website:\s*(?:<[^>]+>\s*)*<a[^>]+href=["']([^"']+)["']/i.exec(section)?.[1];
  const emailHref = /href=["']mailto:([^"']+)["']/i.exec(section)?.[1];
  const emailText = /Email:\s*(?:<[^>]+>\s*)*([^<\r\n]+)/i.exec(section)?.[1];
  const phone = textAfterLabel(section, 'Phone');
  const lastUpdated = textAfterLabel(section, 'Last Updated');
  const name = textAfterLabel(section, heading === 'Appraisal District' ? 'Chief Appraiser' : 'Tax Assessor-Collector');
  const address = extractStreetAddress(section);

  return {
    name: cleanText(name),
    websiteUrl: website ? normalizeExternalUrl(decodeEntities(website)) : undefined,
    phone: cleanText(phone),
    email: cleanText(emailHref ? decodeEntities(emailHref) : emailText),
    address,
    lastUpdated: normalizeDate(cleanText(lastUpdated)),
  };
}

function textAfterLabel(section: string, label: string) {
  const escaped = escapeRegExp(label);
  const match = new RegExp(`${escaped}:\\s*(?:<[^>]+>\\s*)*([^<\\r\\n]+)`, 'i').exec(section);
  return match?.[1];
}

function extractStreetAddress(section: string) {
  const marker = /<h4[^>]*>\s*Street Address\s*<\/h4>/i.exec(section);
  if (!marker) return undefined;
  const after = section.slice(marker.index + marker[0].length);
  const end = after.search(/<h4[^>]*>|<h3[^>]*>/i);
  const text = stripTags(after.slice(0, end >= 0 ? end : undefined));
  return cleanText(text.replace(/\s+/g, ' '));
}

export function localOfficeDescription(countyName: string, kind: 'appraisal-district' | 'tax-office', office: LocalOfficeProfile) {
  const base = countyName.replace(/ County$/, '');
  const details: string[] = [];
  if (office.name) details.push(`${kind === 'appraisal-district' ? 'Chief appraiser' : 'Tax assessor-collector'}: ${office.name}`);
  if (office.phone) details.push(`phone ${office.phone}`);
  if (office.address) details.push(`office address ${office.address}`);
  if (office.email) details.push(`email ${office.email}`);
  const sourceNote = office.lastUpdated ? `The Texas Comptroller directory lists this information as updated ${office.lastUpdated}.` : 'The contact information is checked against the Texas Comptroller local property-tax directory.';
  if (kind === 'appraisal-district') {
    return `${base} County Appraisal District, also commonly searched as ${base} CAD or ${base} Central Appraisal District, is the local property appraisal authority for ${countyName}. Use the district for property search and appraisal records, appraised values, homestead and other exemptions, agricultural appraisal, and property-tax protests. ${details.join('; ')}. ${sourceNote}`;
  }
  return `${countyName} Tax Office is the county tax assessor-collector reference for property-tax bills, tax-payment information and county tax services. Residents commonly use the office to find payment options, due-date information and local tax records; county tax offices also commonly handle vehicle title and registration services in partnership with TxDMV. ${details.join('; ')}. ${sourceNote}`;
}

async function fetchText(url: string) {
  const response = await fetch(url, {
    redirect: 'follow',
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    headers: { accept: 'text/html', 'user-agent': 'TexasDefined local-government verifier/1.0' },
  });
  if (!response.ok) throw new Error(`HTTP ${response.status} for ${url}`);
  return response.text();
}

function normalizeExternalUrl(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  try {
    const url = new URL(/^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed.replace(/^\/+/, '')}`);
    if (!['http:', 'https:'].includes(url.protocol)) return undefined;
    return url.toString();
  } catch {
    return undefined;
  }
}

function normalizeDate(value?: string) {
  if (!value) return undefined;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toISOString().slice(0, 10);
}

function cleanText(value?: string) {
  if (!value) return undefined;
  const cleaned = decodeEntities(stripTags(value)).replace(/\s+/g, ' ').trim();
  return cleaned || undefined;
}

function stripTags(value: string) { return value.replace(/<[^>]+>/g, ' '); }
function decodeEntities(value: string) {
  return value.replace(/&amp;/g, '&').replace(/&#0*39;|&apos;|&rsquo;/g, "'").replace(/&quot;/g, '"').replace(/&nbsp;/g, ' ');
}
function slug(value: string) { return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
function escapeRegExp(value: string) { return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
