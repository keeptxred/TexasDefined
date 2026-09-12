import fs from 'node:fs/promises';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);
const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, 'public/images/sports-venues');
const MAP_PATH = path.join(ROOT, 'src/data/sports-venue-images-additions-wave7.ts');
const REPORT_PATH = path.join(ROOT, 'scripts/data/sports-venue-hero-wave7-report.json');
const USER_AGENT = 'TexasDefined/1.0 (reviewed sports venue image sync; https://texasdefined.com)';
const MODEL = '@cf/black-forest-labs/flux-1-schnell';

const venues = [
  ['amarillo-national-center', 'Amarillo National Center', 'Amarillo', 'indoor equestrian and event arena'],
  ['childrens-health-stadium-prosper', "Children's Health Stadium", 'Prosper', 'high school football and soccer stadium'],
  ['colonial-country-club', 'Colonial Country Club', 'Fort Worth', 'historic championship golf course'],
  ['cy-fair-fcu-stadium', 'Cy-Fair FCU Stadium', 'Cypress', 'high school football stadium'],
  ['expo-center-taylor-county', 'Taylor County Expo Center', 'Abilene', 'multi-purpose arena and expo complex'],
  ['hodgetown', 'Hodgetown', 'Amarillo', 'downtown minor league baseball stadium'],
  ['houston-motorsports-park', 'Houston Motorsports Park', 'Houston', 'short-track motorsports facility'],
  ['legacy-stadium-katy', 'Legacy Stadium', 'Katy', 'high school football stadium'],
  ['memorial-park-golf-course', 'Memorial Park Golf Course', 'Houston', 'municipal championship golf course'],
  ['national-shooting-complex', 'National Shooting Complex', 'San Antonio', 'outdoor shooting sports complex'],
  ['pga-frisco-fields-ranch', 'PGA Frisco / Fields Ranch', 'Frisco', 'championship golf resort and tournament course'],
  ['retama-park', 'Retama Park', 'Selma', 'horse racing track'],
  ['round-rock-sports-center', 'Round Rock Sports Center', 'Round Rock', 'indoor basketball and volleyball sports complex'],
  ['texas-motorplex', 'Texas Motorplex', 'Ennis', 'NHRA drag racing facility'],
  ['tpc-san-antonio', 'TPC San Antonio', 'San Antonio', 'championship golf course'],
  ['waco-surf', 'Waco Surf', 'Waco', 'surf lagoon and action sports facility'],
].map(([slug, name, city, type]) => ({ slug, name, city, type }));

const exactCommonsFiles = {
  'round-rock-sports-center': 'File:Round Rock Sports Center, Texas (47603155501).jpg',
  'texas-motorplex': 'File:Ennis September 2017 30 (Texas Motorplex).jpg',
};

function cleanHtml(value) {
  return String(value || '').replace(/<[^>]*>/g, ' ').replace(/&nbsp;/gi, ' ').replace(/&amp;/gi, '&').replace(/&#39;|&apos;/gi, "'").replace(/&quot;/gi, '"').replace(/\s+/g, ' ').trim();
}
function ts(value) { return JSON.stringify(String(value ?? '')); }
function aiAvailable() { return Boolean(process.env.CLOUDFLARE_ACCOUNT_ID && process.env.CLOUDFLARE_API_TOKEN); }

async function fetchExactCommons(title) {
  const params = new URLSearchParams({ action: 'query', titles: title, prop: 'imageinfo', iiprop: 'url|mime|size|extmetadata', iiurlwidth: '1600', format: 'json', origin: '*' });
  const response = await fetch(`https://commons.wikimedia.org/w/api.php?${params}`, { headers: { 'User-Agent': USER_AGENT } });
  if (!response.ok) throw new Error(`Commons ${response.status}`);
  const payload = await response.json();
  const page = Object.values(payload.query?.pages || {})[0];
  const info = page?.imageinfo?.[0];
  if (!page || !info || info.mime !== 'image/jpeg') throw new Error(`Exact Commons image missing: ${title}`);
  const meta = info.extmetadata || {};
  const license = cleanHtml(meta.LicenseShortName?.value || meta.UsageTerms?.value).toLowerCase();
  if (!/(public domain|cc0|cc by|cc-by)/.test(license)) throw new Error(`Unsupported Commons license for ${title}: ${license}`);
  return { page, info, meta };
}

async function saveCommons(venue, title, destinationPath) {
  const { page, info, meta } = await fetchExactCommons(title);
  const response = await fetch(info.thumburl || info.url, { headers: { 'User-Agent': USER_AGENT, Accept: 'image/jpeg,image/*;q=0.8' } });
  if (!response.ok) throw new Error(`Image download ${response.status}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  if (bytes.length < 20_000) throw new Error(`Commons JPEG too small for ${venue.slug}`);
  await fs.writeFile(destinationPath, bytes);
  return {
    slug: venue.slug,
    alt: `${venue.name} in ${venue.city}, Texas`,
    imageUrl: `/images/sports-venues/${venue.slug}.jpg`,
    sourcePage: info.descriptionurl || `https://commons.wikimedia.org/wiki/${encodeURIComponent(page.title)}`,
    sourceName: 'Wikimedia Commons',
    author: cleanHtml(meta.Artist?.value || meta.Credit?.value || 'Wikimedia Commons contributor'),
    licenseName: cleanHtml(meta.LicenseShortName?.value || meta.UsageTerms?.value || 'free license'),
    licenseUrl: cleanHtml(meta.LicenseUrl?.value || 'https://commons.wikimedia.org/'),
    width: Number(info.thumbwidth || info.width || 1600),
    height: Number(info.thumbheight || info.height || 900),
  };
}

async function saveAi(venue, destinationPath) {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const token = process.env.CLOUDFLARE_API_TOKEN;
  if (!accountId || !token) throw new Error('Cloudflare AI credentials unavailable');
  const prompt = [
    `Create a unique photorealistic editorial landscape image inspired specifically by ${venue.name} in ${venue.city}, Texas, a ${venue.type}.`,
    'Use the real venue category and plausible Texas setting, but do not invent branded signage, sponsor marks, team logos, copyrighted artwork, or readable text.',
    'This is a representative editorial visualization rather than documentary photography. Natural Texas light, realistic lens and architecture, 16:9 landscape, no watermark, no recognizable faces.'
  ].join(' ');
  const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${encodeURIComponent(accountId)}/ai/run/${MODEL}`, {
    method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ prompt: prompt.slice(0, 2048), steps: 4 }),
  });
  if (!response.ok) throw new Error(`Cloudflare Workers AI ${response.status}: ${(await response.text()).slice(0, 180)}`);
  const contentType = response.headers.get('content-type') || '';
  let bytes;
  if (contentType.includes('application/json')) {
    const payload = await response.json();
    const b64 = payload?.result?.image || payload?.image;
    if (!b64) throw new Error(`No AI image returned for ${venue.slug}`);
    bytes = Buffer.from(b64, 'base64');
  } else {
    bytes = Buffer.from(await response.arrayBuffer());
  }
  if (bytes.length < 20_000) throw new Error(`AI image too small for ${venue.slug}`);
  const temp = `${destinationPath}.generated`;
  await fs.writeFile(temp, bytes);
  try {
    await execFileAsync('convert', [temp, '-auto-orient', '-strip', '-resize', '1600x1600>', '-quality', '88', destinationPath]);
  } finally {
    await fs.rm(temp, { force: true });
  }
  return {
    slug: venue.slug,
    alt: `AI-generated photorealistic editorial depiction of ${venue.name} in ${venue.city}, Texas`,
    imageUrl: `/images/sports-venues/${venue.slug}.jpg`,
    sourcePage: `https://texasdefined.com/sports-venue/${venue.slug}`,
    sourceName: 'Texas Defined generated media',
    author: 'Cloudflare Workers AI / FLUX.1 schnell',
    licenseName: 'AI-generated image supplied for TexasDefined use',
    licenseUrl: `https://texasdefined.com/sports-venue/${venue.slug}`,
    width: 1600,
    height: 900,
  };
}

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });
  const rows = [];
  const report = { generatedAt: new Date().toISOString(), total: venues.length, exactFreePhotos: [], aiGenerated: [], unresolved: [], aiAvailable: aiAvailable() };
  for (const venue of venues) {
    const destinationPath = path.join(OUT_DIR, `${venue.slug}.jpg`);
    try {
      const exactTitle = exactCommonsFiles[venue.slug];
      const row = exactTitle ? await saveCommons(venue, exactTitle, destinationPath) : await saveAi(venue, destinationPath);
      rows.push(row);
      if (exactTitle) report.exactFreePhotos.push({ slug: venue.slug, sourceTitle: exactTitle });
      else report.aiGenerated.push({ slug: venue.slug });
      console.log(`${venue.slug}: ${exactTitle ? 'exact licensed Commons photo' : 'AI-generated venue fallback'}`);
    } catch (error) {
      console.error(`${venue.slug}: ${error?.message || error}`);
      report.unresolved.push({ slug: venue.slug, message: String(error?.message || error) });
    }
  }

  const lines = [
    "import type { SportsVenuePhoto } from './sports-venue-images';", '',
    '/** Generated by scripts/data/sync-sports-venue-hero-assets-wave7-reviewed.mjs. Do not hand-edit. */',
    'export const sportsVenuePhotoAdditionsWave7: Record<string, SportsVenuePhoto> = {',
    ...rows.map((row) => [
      `  ${ts(row.slug)}: {`, `    slug: ${ts(row.slug)},`, `    alt: ${ts(row.alt)},`, `    imageUrl: ${ts(row.imageUrl)},`,
      `    sourcePage: ${ts(row.sourcePage)},`, `    sourceName: ${ts(row.sourceName)},`, `    author: ${ts(row.author)},`, `    licenseName: ${ts(row.licenseName)},`, `    licenseUrl: ${ts(row.licenseUrl)},`, `    width: ${row.width},`, `    height: ${row.height},`, '  },'
    ].join('\n')),
    '};', '', 'export function getSportsVenuePhotoAdditionWave7(slug: string) {', '  return sportsVenuePhotoAdditionsWave7[slug];', '}', ''
  ];
  await fs.writeFile(MAP_PATH, lines.join('\n'), 'utf8');
  await fs.writeFile(REPORT_PATH, `${JSON.stringify(report, null, 2)}\n`, 'utf8');
  console.log(JSON.stringify(report, null, 2));
  if (rows.length !== venues.length || report.unresolved.length) process.exitCode = 3;
}

await main();
