/**
 * OFFLINE corporate venue geocoding RESEARCH — not a booking/location importer.
 *
 * Census Geocoder gives address-range INTERPOLATIONS, not confirmed building
 * entrances. Every result remains a quarantined editorial research proposal.
 * Nothing from this script can be passed to the verified-radius engine until
 * a human compares an exact venue address + entrance/premises position against
 * official sources and records an independently justified location.
 *
 * Manual invocation (no periodic workflow and no implicit fetch):
 *   node scripts/data/research-corporate-event-geocodes.mjs --input .artifacts/corporate-events/approved-public-addresses.json --output .artifacts/corporate-events/geocode-review.json --lookup
 *
 * Input: max 25 publicly listed BUSINESS street addresses with operator-
 * reviewed exact source URLs; never an organizer's personal/home location.
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { readFileSync } from 'node:fs';
import { resolve, relative, dirname } from 'node:path';
import { pathToFileURL } from 'node:url';

const CENSUS_HOST = 'geocoding.geo.census.gov';
const OUTPUT_ROOT = resolve('.artifacts/corporate-events');
const REVIEW_SOURCE = 'https://geocoding.geo.census.gov/geocoder/Geocoding_Services_API.html';
const API = 'https://' + CENSUS_HOST + '/geocoder/locations/onelineaddress';
const MAX_ITEMS = 25;
const MAX_BYTES = 50_000;
const texas = value => typeof value === 'string' && /^[A-Za-z0-9 .,'-]{2,120}$/.test(value);
const normalize = value => value.trim().toUpperCase().replace(/[^A-Z0-9]/g, '');

function catalog() {
  // Extract only public editorial metadata; never load private planners.
  const text = readFileSync('src/data/corporate-events.ts','utf8');
  const blocks = text.split(/(?=\{\s*slug:\s*['"][a-z0-9-]+['"])/);
  const rows = new Map();
  for (const block of blocks) {
    const slug = block.match(/^\{\s*slug:\s*['"]([a-z0-9-]+)['"]/);
    const city = block.match(/\bcity:\s*['"]([^'"]+)['"]/);
    const official = block.match(/\bofficialUrl:\s*['"]([^'"]+)['"]/);
    if (slug && city && official) rows.set(slug[1], { city:city[1], officialUrl:official[1] });
  }
  return rows;
}

function publicBusinessHost(url) {
  try {
    const x = new URL(url);
    if (x.protocol !== 'https:' || x.username || x.password || x.port || x.hash) return null;
    return x.hostname.toLowerCase().replace(/^www\./,'');
  } catch { return null; }
}

export function validatePublicVenueAddress(row, entry, asOf) {
  if (!row || typeof row !== 'object' || typeof entry?.city !== 'string') return 'Not in the sourced venue directory';
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(String(row.providerSlug??''))) return 'Invalid venue slug';
  if (!texas(row.city) || normalize(row.city) !== normalize(entry.city)) return 'Address city differs from the editorial venue city';
  const address = row.streetAddress;
  if (typeof address !== 'string' || address.length < 8 || address.length > 150
    || !/^\d{1,6}[A-Za-z]?\s+[A-Za-z0-9][A-Za-z0-9 .#'-]+$/.test(address)) {
    return 'A public street number and street name are required; area names cannot be geocoded';
  }
  const evidence = publicBusinessHost(row.officialAddressEvidenceUrl);
  const official = publicBusinessHost(entry.officialUrl);
  if (!evidence || !official || (evidence !== official && !evidence.endsWith('.'+official))) {
    return 'Address evidence must be on the already listed official venue HTTPS domain';
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(row.addressReviewedOn ?? '') ||
    Number.isNaN(Date.parse(row.addressReviewedOn+'T12:00:00Z')) ||
    new Date(row.addressReviewedOn+'T12:00:00Z').toISOString().slice(0,10)!==row.addressReviewedOn ||
    row.addressReviewedOn > asOf) return 'A real, nonfuture human source-review date is required';
  return null;
}

export function censusAddressLookupUrl(row) {
  const u = new URL(API);
  u.searchParams.set('address', row.streetAddress+', '+row.city+', TX'+(row.zip ? ' '+row.zip : ''));
  u.searchParams.set('benchmark','Public_AR_Current');
  u.searchParams.set('format','json');
  return u.href;
}

export function parseCensusCandidate(result, expectedCity, expectedStreetNumber) {
  const matches = result?.result?.addressMatches;
  if (!Array.isArray(matches) || matches.length !== 1) return null;
  const match=matches[0];
  if (normalize(String(match?.addressComponents?.city ?? ''))!==normalize(expectedCity)
    || String(match?.addressComponents?.state ?? '').toUpperCase()!=='TX'
    || normalize(String(match?.addressComponents?.fromAddress ?? ''))!==normalize(expectedStreetNumber)) return null;
  const x=match?.coordinates?.x, y=match?.coordinates?.y;
  if (!Number.isFinite(x) || !Number.isFinite(y)
    || y < 25.8 || y > 36.6 || x < -106.7 || x > -93.4) return null;
  return {
    latitude:y, longitude:x,
    kind:'census-address-range-interpolation',
    manualReviewRequired:true,
    canBeUsedAsVenueEntrance:false,
    canBeAutoPublished:false,
    matchDescription:String(match?.matchedAddress??'').slice(0,180),
  };
}

export async function researchPublicVenueCoordinates(rows, venues, fetchImpl, asOf) {
  if (!Array.isArray(rows) || rows.length > MAX_ITEMS) throw new Error('Maximum 25 public business addresses per manual review');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(asOf)) throw new Error('Valid as-of date required');
  const seen = new Set();
  const proposals = [];
  for (const row of rows) {
    const slug=String(row?.providerSlug??'');
    if (seen.has(slug)) throw new Error('One independently reviewed address candidate per venue per batch');
    seen.add(slug);
    const entry=venues.get(slug);
    const problem=validatePublicVenueAddress(row, entry, asOf);
    if (problem) {
      proposals.push({providerSlug:slug,status:'rejected-input',reason:problem,published:false});
      continue;
    }
    const requestUrl=censusAddressLookupUrl(row);
    let candidate=null, reason='Census address service returned no unambiguous Texas address-range match';
    try {
      const response=await fetchImpl(requestUrl,{
        headers:{accept:'application/json','user-agent':'TexasDefinedVenueResearch/1.0'},
        signal:AbortSignal.timeout(12000),
      });
      if (response.ok && new URL(response.url || requestUrl).hostname === CENSUS_HOST) {
        const raw=await response.text();
        if (raw.length <= MAX_BYTES) {
          candidate=parseCensusCandidate(JSON.parse(raw),row.city,row.streetAddress.match(/^\d+[A-Za-z]?/)[0]);
        } else reason='Census response exceeded research byte ceiling';
      } else reason='Official Census geocoder request failed or redirected to another host';
    } catch { reason='Census geocoder request failed or returned invalid JSON'; }
    proposals.push({
      providerSlug:slug,
      publicVenueAddress:row.streetAddress+', '+row.city+', TX'+(row.zip?' '+row.zip:''),
      officialAddressEvidenceUrl:row.officialAddressEvidenceUrl,
      addressReviewedOn:row.addressReviewedOn,
      geocoderDocumentationUrl:REVIEW_SOURCE,
      censusRequestUrl:requestUrl,
      status:candidate ? 'needs-premises-confirmation':'no-usable-census-match',
      reason:candidate ? 'Census point interpolates a street address range, not a venue entrance; independently verify premises location before admitting it to radius search' : reason,
      candidate,
      published:false,
      automaticallyImported:false,
    });
  }
  return {asOf,mode:'manual-only-research',queriedAddresses:rows.length,acceptedVerifiedVenuePoints:0,
    geocoderDocumentationUrl:REVIEW_SOURCE,proposals,
    warning:'None of these candidates is an entrance, GPS travel route, live availability, or an approved coordinate. No production catalog or database was edited.'};
}

function insideArtifacts(path) {
  const relativePath=relative(OUTPUT_ROOT,resolve(path));
  return relativePath && relativePath !== '..' && !relativePath.startsWith('../') && !relativePath.startsWith('..\\');
}

async function main() {
  const args=process.argv.slice(2);
  const get=flag=>{const i=args.indexOf(flag);return i<0?null:args[i+1]??null;};
  if (!args.includes('--lookup') || !get('--input') || !get('--output')) {
    throw new Error('Manual-only: provide --lookup --input path --output path; nothing is fetched by default');
  }
  const input=get('--input'), output=get('--output');
  if (!insideArtifacts(input) || !insideArtifacts(output) || resolve(input)===resolve(output)) {
    throw new Error('Input and output must be separate files below .artifacts/corporate-events');
  }
  const inputBytes=await readFile(input);
  if (inputBytes.length>MAX_BYTES) throw new Error('Too much input data for bounded public venue research');
  const data=JSON.parse(inputBytes.toString('utf8'));
  const asOf=new Date().toISOString().slice(0,10);
  const result=await researchPublicVenueCoordinates(data,catalog(),fetch,asOf);
  await mkdir(dirname(resolve(output)),{recursive:true});
  await writeFile(output,JSON.stringify(result,null,2)+'\n',{flag:'wx',mode:0o600});
  process.stdout.write('Review candidates written privately: '+result.proposals.length+'. Verified/admitted venue coordinates: ZERO.\n');
}
if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  main().catch(e=>{console.error('Manual venue research stopped:', e.message);process.exitCode=1;});
}
