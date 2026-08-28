import { readFile, readdir, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';

const assetDirCandidates = [
  path.resolve('dist/client/assets'),
  path.resolve('.output/public/assets'),
];
const viteConfigPath = path.resolve('vite.config.ts');
const budgetReportPath = path.resolve('client-performance-budget-report.json');
// CI measured the stable, non-route-split client bundle at 1,807,457 bytes.
// Keep less than 1% headroom so meaningful growth fails without making the
// budget smaller than the known-good production build.
const STABLE_MAIN_BASELINE_BYTES = 1_807_457;
const MAX_MAIN_BYTES = 1_825_000;
const MAX_CSS_BYTES = 140_000;

function fail(message) {
  console.error(`::error title=Client performance budget::${message}`);
  throw new Error(message);
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

  fail(`Client assets directory not found. Expected Cloudflare Vite output at ${assetDirCandidates[0]} or legacy Nitro output at ${assetDirCandidates[1]}.`);
}

async function main() {
  const viteConfig = await readFile(viteConfigPath, 'utf8');
  if (!/autoCodeSplitting\s*:\s*false/.test(viteConfig)) {
    fail('TanStack autoCodeSplitting must remain disabled: the measured route-splitting experiment increased the main client bundle.');
  }

  const assetsDir = await resolveAssetsDir();
  const entries = await readdir(assetsDir);
  const mainCandidates = entries.filter((name) => /^main-.*\.js$/.test(name));
  const cssFiles = entries.filter((name) => /^styles-.*\.css$/.test(name));
  const mainAssets = await Promise.all(mainCandidates.map(async (name) => ({ name, bytes: (await stat(path.join(assetsDir, name))).size })));
  const cssAssets = await Promise.all(cssFiles.map(async (name) => ({ name, bytes: (await stat(path.join(assetsDir, name))).size })));
  const mainAssetSizes = mainAssets.map(({ name, bytes }) => `${name}=${bytes}`);
  const cssAssetSizes = cssAssets.map(({ name, bytes }) => `${name}=${bytes}`);
  await writeFile(budgetReportPath, `${JSON.stringify({
    assetsDir: path.relative(process.cwd(), assetsDir),
    limits: {
      stableMainBaselineBytes: STABLE_MAIN_BASELINE_BYTES,
      maxMainBytes: MAX_MAIN_BYTES,
      maxCssBytes: MAX_CSS_BYTES,
    },
    mainAssets,
    cssAssets,
  }, null, 2)}\n`, 'utf8');
  console.log(`::notice title=Protected client asset sizes::main: ${mainAssetSizes.join(', ') || 'none'}; styles: ${cssAssetSizes.join(', ') || 'none'}`);

  if (mainCandidates.length !== 1) {
    fail(`Expected exactly one main client bundle, found ${mainCandidates.length}: ${mainCandidates.join(', ')}`);
  }

  const mainFile = mainCandidates[0];
  const mainBytes = (await stat(path.join(assetsDir, mainFile))).size;
  if (mainBytes > MAX_MAIN_BYTES) {
    fail(`Main client bundle ${mainFile} is ${mainBytes.toLocaleString()} bytes; budget is ${MAX_MAIN_BYTES.toLocaleString()} bytes (stable baseline ${STABLE_MAIN_BASELINE_BYTES.toLocaleString()} bytes).`);
  }

  for (const cssFile of cssFiles) {
    const cssBytes = (await stat(path.join(assetsDir, cssFile))).size;
    if (cssBytes > MAX_CSS_BYTES) {
      fail(`Primary stylesheet ${cssFile} is ${cssBytes.toLocaleString()} bytes; budget is ${MAX_CSS_BYTES.toLocaleString()} bytes.`);
    }
  }

  const headroomBytes = MAX_MAIN_BYTES - mainBytes;
  console.log(`Client performance budget passed using ${path.relative(process.cwd(), assetsDir)}: ${mainFile} ${(mainBytes / 1024).toFixed(1)} KiB <= ${(MAX_MAIN_BYTES / 1024).toFixed(1)} KiB (${headroomBytes.toLocaleString()} bytes headroom); ${cssFiles.length || 0} primary stylesheet(s) within budget; failed route-splitting experiment remains disabled.`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
