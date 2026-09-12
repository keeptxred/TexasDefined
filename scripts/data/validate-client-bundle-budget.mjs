import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';

const assetDirCandidates = [
  path.resolve('dist/client/assets'),
  path.resolve('.output/public/assets'),
];
const viteConfigPath = path.resolve('vite.config.ts');
const primarySitemapPath = path.resolve('src/routes/sitemap[.]xml.ts');
const feedRoutePaths = [
  path.resolve('src/routes/rss[.]xml.ts'),
  primarySitemapPath,
];
// CI measured the stable, non-route-split client bundle at 1,807,457 bytes.
// Keep less than 1% headroom so meaningful growth fails without making the
// budget smaller than the known-good production build.
const STABLE_MAIN_BASELINE_BYTES = 1_807_457;
const MAX_MAIN_BYTES = 1_825_000;
const MAX_CSS_BYTES = 140_000;

function reportCiError(title, message) {
  if (process.env.GITHUB_ACTIONS === 'true') {
    console.error(`::error title=${title}::${message}`);
  }
}

async function resolveAssetsDir() {
  for (const candidate of assetDirCandidates) {
    try {
      if ((await stat(candidate)).isDirectory()) {
        return candidate;
      }
    } catch (error) {
      if (error?.code !== 'ENOENT') {
        throw error;
      }
    }
  }

  throw new Error(
    `Client assets directory not found. Expected Cloudflare Vite output at ${assetDirCandidates[0]} or legacy Nitro output at ${assetDirCandidates[1]}.`,
  );
}

async function main() {
  const viteConfig = await readFile(viteConfigPath, 'utf8');
  if (!/autoCodeSplitting\s*:\s*false/.test(viteConfig)) {
    throw new Error('TanStack autoCodeSplitting must remain disabled: the measured route-splitting experiment increased the main client bundle.');
  }

  const eagerPlatformImport = /import\s*{\s*platform\s*,\s*scope\s*}\s*from\s*["']@\/data["']/;
  for (const feedRoutePath of feedRoutePaths) {
    const source = await readFile(feedRoutePath, 'utf8');
    if (eagerPlatformImport.test(source)) {
      throw new Error(`${path.relative(process.cwd(), feedRoutePath)} must not eagerly import the fixture-backed platform into the route tree.`);
    }
    if (!source.includes('const { platform, scope } = await import("@/data");')) {
      throw new Error(`${path.relative(process.cwd(), feedRoutePath)} must load platform/scope inside its server handler.`);
    }
  }

  const primarySitemap = await readFile(primarySitemapPath, 'utf8');
  if (/import\s*{\s*COUNTY_PROPERTY_RECORDS\s*}\s*from\s*["']@\/data\/property\/county-property-data["']/.test(primarySitemap)) {
    throw new Error('Primary sitemap must not eagerly import the full county property catalog into the route tree.');
  }
  if (!primarySitemap.includes('const { COUNTY_PROPERTY_RECORDS } = await import("@/data/property/county-property-data");')) {
    throw new Error('Primary sitemap must load the county property catalog inside its server handler.');
  }

  const assetsDir = await resolveAssetsDir();
  const entries = await readdir(assetsDir);
  const mainCandidates = entries.filter((name) => /^main-.*\.js$/.test(name));
  if (mainCandidates.length !== 1) {
    throw new Error(`Expected exactly one main client bundle, found ${mainCandidates.length}: ${mainCandidates.join(', ')}`);
  }

  const mainFile = mainCandidates[0];
  const mainBytes = (await stat(path.join(assetsDir, mainFile))).size;
  if (mainBytes > MAX_MAIN_BYTES) {
    const overageBytes = mainBytes - MAX_MAIN_BYTES;
    const message = `Main client bundle ${mainFile} is ${mainBytes.toLocaleString()} bytes; budget is ${MAX_MAIN_BYTES.toLocaleString()} bytes; over by ${overageBytes.toLocaleString()} bytes (stable baseline ${STABLE_MAIN_BASELINE_BYTES.toLocaleString()} bytes).`;
    reportCiError('Client bundle budget', message);
    throw new Error(message);
  }

  const cssFiles = entries.filter((name) => /^styles-.*\.css$/.test(name));
  for (const cssFile of cssFiles) {
    const cssBytes = (await stat(path.join(assetsDir, cssFile))).size;
    if (cssBytes > MAX_CSS_BYTES) {
      const message = `Primary stylesheet ${cssFile} is ${cssBytes.toLocaleString()} bytes; budget is ${MAX_CSS_BYTES.toLocaleString()} bytes.`;
      reportCiError('Client stylesheet budget', message);
      throw new Error(message);
    }
  }

  const headroomBytes = MAX_MAIN_BYTES - mainBytes;
  const usagePercent = (mainBytes / MAX_MAIN_BYTES) * 100;
  console.log(`Client main bundle measurement: file=${mainFile}; bytes=${mainBytes}; cap_bytes=${MAX_MAIN_BYTES}; headroom_bytes=${headroomBytes}; usage_percent=${usagePercent.toFixed(2)}.`);
  console.log(`Client performance budget passed using ${path.relative(process.cwd(), assetsDir)}: ${mainFile} ${(mainBytes / 1024).toFixed(1)} KiB <= ${(MAX_MAIN_BYTES / 1024).toFixed(1)} KiB (${headroomBytes.toLocaleString()} bytes headroom); ${cssFiles.length || 0} primary stylesheet(s) within budget; failed route-splitting experiment remains disabled.`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
