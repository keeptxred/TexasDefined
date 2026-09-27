import fs from 'node:fs/promises';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);
const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, 'public/images/sports-venues');
const MAP_PATH = path.join(ROOT, 'src/data/sports-venue-images-additions-wave7.ts');
const REPORT_PATH = path.join(ROOT, 'scripts/data/sports-venue-hero-wave7-report.json');
const USER_AGENT = 'TexasDefined/1.0 (reviewed documentary sports venue image sync; https://texasdefined.com)';
const SUPPORTED_COMMONS_MIME = new Set(['image/jpeg', 'image/png']);

const reviewedCommons = [
  {
    slug: 'round-rock-sports-center',
    name: 'Round Rock Sports Center',
    city: 'Round Rock',
    title: 'File:Round Rock Sports Center, Texas (47603155501).jpg',
  },
  {
    slug: 'texas-motorplex',
    name: 'Texas Motorplex',
    city: 'Ennis',
    title: 'File:Ennis September 2017 30 (Texas Motorplex).jpg',
  },
];

function cleanHtml(value) {
  return String(value || '').replace(/<[^>]*>/g, ' ').replace(/&nbsp;/gi, ' ').replace(/&amp;/gi, '&').replace(/&#39;|&apos;/gi, "'").replace(/&quot;/gi, '"').replace(/\s+/g, ' ').trim();
}
function ts(value) { return JSON.stringify(String(value ?? '')); }

async function fetchExactCommons(title) {
  const params = new URLSearchParams({ action: 'query', titles: title, prop: 'imageinfo', iiprop: 'url|mime|size|extmetadata', iiurlwidth: '1600', format: 'json', origin: '*' });
  const response = await fetch(`https://commons.wikimedia.org/w/api.php?${params}`, { headers: { 'User-Agent': USER_AGENT } });
  if (!response.ok) throw new Error(`Commons ${response.status}`);
  const payload = await response.json();
  const page = Object.values(payload.query?.pages || {})[0];
  const info = page?.imageinfo?.[0];
  if (!page || !info || !SUPPORTED_COMMONS_MIME.has(info.mime)) throw new Error(`Exact Commons image missing or unsupported: ${title}`);
  const meta = info.extmetadata || {};
  const license = cleanHtml(meta.LicenseShortName?.value || meta.UsageTerms?.value).toLowerCase();
  if (!/(public domain|cc0|cc by|cc-by)/.test(license)) throw new Error(`Unsupported Commons license for ${title}: ${license}`);
  return { page, info, meta };
}

async function stageCommons(venue, destinationPath) {
  const { page, info, meta } = await fetchExactCommons(venue.title);
  const response = await fetch(info.thumburl || info.url, { headers: { 'User-Agent': USER_AGENT, Accept: 'image/jpeg,image/png,image/*;q=0.8' } });
  if (!response.ok) throw new Error(`Image download ${response.status}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  if (bytes.length < 20_000) throw new Error(`Commons image too small for ${venue.slug}`);

  const stagedPath = `${destinationPath}.next.jpg`;
  if (info.mime === 'image/jpeg') {
    await fs.writeFile(stagedPath, bytes);
  } else {
    const sourcePath = `${destinationPath}.source`;
    await fs.writeFile(sourcePath, bytes);
    try {
      await execFileAsync('convert', [sourcePath, '-auto-orient', '-strip', '-resize', '1600x1600>', '-quality', '88', stagedPath]);
    } finally {
      await fs.rm(sourcePath, { force: true });
    }
  }

  return {
    stagedPath,
    row: {
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
    },
  };
}

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });
  const rows = [];
  const stagedAssets = [];

  for (const venue of reviewedCommons) {
    const destinationPath = path.join(OUT_DIR, `${venue.slug}.jpg`);
    const { stagedPath, row } = await stageCommons(venue, destinationPath);
    stagedAssets.push({ stagedPath, destinationPath });
    rows.push(row);
    console.log(`${venue.slug}: exact licensed Commons photo staged`);
  }

  const lines = [
    "import type { SportsVenuePhoto } from './sports-venue-images';", '',
    '/** Documentary-only Wave 7 venue photos. Ambiguous or unlicensed venues intentionally fall back. */',
    'export const sportsVenuePhotoAdditionsWave7: Record<string, SportsVenuePhoto> = {',
    ...rows.map((row) => [
      `  ${ts(row.slug)}: {`, `    slug: ${ts(row.slug)},`, `    alt: ${ts(row.alt)},`, `    imageUrl: ${ts(row.imageUrl)},`,
      `    sourcePage: ${ts(row.sourcePage)},`, `    sourceName: ${ts(row.sourceName)},`, `    author: ${ts(row.author)},`,
      `    licenseName: ${ts(row.licenseName)},`, `    licenseUrl: ${ts(row.licenseUrl)},`, `    width: ${row.width},`,
      `    height: ${row.height},`, '  },'
    ].join('\n')),
    '};', '', 'export function getSportsVenuePhotoAdditionWave7(slug: string) {', '  return sportsVenuePhotoAdditionsWave7[slug];', '}', ''
  ];

  const report = {
    generatedAt: new Date().toISOString(),
    policy: 'documentary-only',
    total: reviewedCommons.length,
    exactFreePhotos: reviewedCommons.map(({ slug, title }) => ({ slug, sourceTitle: title })),
    generatedVenueDepictions: 0,
  };

  const stagedMapPath = `${MAP_PATH}.next`;
  const stagedReportPath = `${REPORT_PATH}.next`;
  await fs.writeFile(stagedMapPath, lines.join('\n'), 'utf8');
  await fs.writeFile(stagedReportPath, `${JSON.stringify(report, null, 2)}\n`, 'utf8');

  for (const { stagedPath, destinationPath } of stagedAssets) await fs.rename(stagedPath, destinationPath);
  await fs.rename(stagedMapPath, MAP_PATH);
  await fs.rename(stagedReportPath, REPORT_PATH);

  console.log(JSON.stringify(report, null, 2));
}

await main();
