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
const SUPPORTED_COMMONS_MIME = new Set(['image/jpeg', 'image/png']);

const reviewedCommonsFiles = [
  {
    slug: 'cy-fair-fcu-stadium',
    name: 'Cy-Fair FCU Stadium',
    city: 'Cypress',
    title: 'File:Berry Center.jpg',
    alt: 'Cy-Fair FCU Stadium at the Berry Center complex in Cypress, Texas, photographed while the venue was known as the Berry Center',
  },
  {
    slug: 'round-rock-sports-center',
    name: 'Round Rock Sports Center',
    city: 'Round Rock',
    title: 'File:Round Rock Sports Center, Texas (47603155501).jpg',
    alt: 'Round Rock Sports Center in Round Rock, Texas',
  },
  {
    slug: 'texas-motorplex',
    name: 'Texas Motorplex',
    city: 'Ennis',
    title: 'File:Ennis September 2017 30 (Texas Motorplex).jpg',
    alt: 'Texas Motorplex in Ennis, Texas',
  },
];

function cleanHtml(value) {
  return String(value || '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&quot;/gi, '"')
    .replace(/\s+/g, ' ')
    .trim();
}

function ts(value) {
  return JSON.stringify(String(value ?? ''));
}

async function fetchExactCommons(title) {
  const params = new URLSearchParams({
    action: 'query',
    titles: title,
    prop: 'imageinfo',
    iiprop: 'url|mime|size|extmetadata',
    iiurlwidth: '1600',
    format: 'json',
    origin: '*',
  });
  const response = await fetch(`https://commons.wikimedia.org/w/api.php?${params}`, {
    headers: { 'User-Agent': USER_AGENT },
  });
  if (!response.ok) throw new Error(`Commons ${response.status}`);

  const payload = await response.json();
  const page = Object.values(payload.query?.pages || {})[0];
  const info = page?.imageinfo?.[0];
  if (!page || !info || !SUPPORTED_COMMONS_MIME.has(info.mime)) {
    throw new Error(`Exact Commons image missing or unsupported: ${title}`);
  }

  const meta = info.extmetadata || {};
  const licenseName = cleanHtml(meta.LicenseShortName?.value || meta.UsageTerms?.value);
  const normalizedLicense = licenseName.toLowerCase();
  if (!/(public domain|cc0|cc by|cc-by)/.test(normalizedLicense)) {
    throw new Error(`Unsupported Commons license for ${title}: ${licenseName || '(missing)'}`);
  }

  const author = cleanHtml(meta.Artist?.value || meta.Credit?.value);
  if (!author) throw new Error(`Missing Commons author/creator for ${title}`);

  const licenseUrl = cleanHtml(meta.LicenseUrl?.value)
    || (normalizedLicense.includes('public domain')
      ? 'https://commons.wikimedia.org/wiki/Commons:Public_domain'
      : '');
  if (!licenseUrl.startsWith('https://')) {
    throw new Error(`Missing HTTPS license URL for ${title}`);
  }

  return { page, info, author, licenseName, licenseUrl };
}

async function stageCommons(venue) {
  const { page, info, author, licenseName, licenseUrl } = await fetchExactCommons(venue.title);
  const response = await fetch(info.thumburl || info.url, {
    headers: { 'User-Agent': USER_AGENT, Accept: 'image/jpeg,image/png,image/*;q=0.8' },
  });
  if (!response.ok) throw new Error(`Image download ${response.status}`);

  const bytes = Buffer.from(await response.arrayBuffer());
  if (bytes.length < 20_000) throw new Error(`Commons image too small for ${venue.slug}`);

  const destinationPath = path.join(OUT_DIR, `${venue.slug}.jpg`);
  const stagedPath = `${destinationPath}.next.jpg`;

  if (info.mime === 'image/jpeg') {
    await fs.writeFile(stagedPath, bytes);
  } else {
    const sourcePath = `${destinationPath}.source`;
    await fs.writeFile(sourcePath, bytes);
    try {
      await execFileAsync('convert', [
        sourcePath,
        '-auto-orient',
        '-strip',
        '-resize',
        '1600x1600>',
        '-quality',
        '88',
        stagedPath,
      ]);
    } finally {
      await fs.rm(sourcePath, { force: true });
    }
  }

  return {
    stagedPath,
    destinationPath,
    row: {
      slug: venue.slug,
      alt: venue.alt,
      imageUrl: `/images/sports-venues/${venue.slug}.jpg`,
      sourcePage: info.descriptionurl || `https://commons.wikimedia.org/wiki/${encodeURIComponent(page.title)}`,
      sourceName: 'Wikimedia Commons',
      author,
      licenseName,
      licenseUrl,
      width: Number(info.thumbwidth || info.width || 1600),
      height: Number(info.thumbheight || info.height || 900),
    },
  };
}

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });

  const rows = [];
  const stagedAssets = [];
  const unresolved = [];

  for (const venue of reviewedCommonsFiles) {
    try {
      const result = await stageCommons(venue);
      rows.push(result.row);
      stagedAssets.push({ stagedPath: result.stagedPath, destinationPath: result.destinationPath });
      console.log(`${venue.slug}: exact licensed Commons photo staged`);
    } catch (error) {
      const message = String(error?.message || error);
      unresolved.push({ slug: venue.slug, message });
      console.error(`${venue.slug}: ${message}`);
    }
  }

  if (unresolved.length) {
    await Promise.all(stagedAssets.map(({ stagedPath }) => fs.rm(stagedPath, { force: true })));
    throw new Error(`Reviewed sports venue hero sync aborted with ${unresolved.length} unresolved venue(s).`);
  }

  const lines = [
    "import type { SportsVenuePhoto } from './sports-venue-images';",
    '',
    '/**',
    ' * Reviewed reusable venue photography retained from Wave 7.',
    ' * AI-generated venue depictions are intentionally excluded: unresolved venues fail closed',
    ' * until an exact, commercially reusable venue photo is verified.',
    ' */',
    'export const sportsVenuePhotoAdditionsWave7: Record<string, SportsVenuePhoto> = {',
    ...rows.map((row) => [
      `  ${ts(row.slug)}: {`,
      `    slug: ${ts(row.slug)},`,
      `    alt: ${ts(row.alt)},`,
      `    imageUrl: ${ts(row.imageUrl)},`,
      `    sourcePage: ${ts(row.sourcePage)},`,
      `    sourceName: ${ts(row.sourceName)},`,
      `    author: ${ts(row.author)},`,
      `    licenseName: ${ts(row.licenseName)},`,
      `    licenseUrl: ${ts(row.licenseUrl)},`,
      `    width: ${row.width},`,
      `    height: ${row.height},`,
      '  },',
    ].join('\n')),
    '};',
    '',
    'export function getSportsVenuePhotoAdditionWave7(slug: string) {',
    '  return sportsVenuePhotoAdditionsWave7[slug];',
    '}',
    '',
  ];

  const report = {
    generatedAt: new Date().toISOString(),
    total: reviewedCommonsFiles.length,
    exactFreePhotos: reviewedCommonsFiles.map(({ slug, title }) => ({ slug, sourceTitle: title })),
    aiGenerated: [],
    unresolved: [],
  };

  const stagedMapPath = `${MAP_PATH}.next`;
  const stagedReportPath = `${REPORT_PATH}.next`;
  await fs.writeFile(stagedMapPath, lines.join('\n'), 'utf8');
  await fs.writeFile(stagedReportPath, `${JSON.stringify(report, null, 2)}\n`, 'utf8');

  for (const { stagedPath, destinationPath } of stagedAssets) {
    await fs.rename(stagedPath, destinationPath);
  }
  await fs.rename(stagedMapPath, MAP_PATH);
  await fs.rename(stagedReportPath, REPORT_PATH);

  console.log(JSON.stringify(report, null, 2));
}

await main();
