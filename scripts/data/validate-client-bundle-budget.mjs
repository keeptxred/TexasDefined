import { readdir, stat } from 'node:fs/promises';
import path from 'node:path';

const assetsDir = path.resolve('.output/public/assets');
const MAX_MAIN_BYTES = 1_760_000;
const MAX_CSS_BYTES = 140_000;

async function main() {
  const entries = await readdir(assetsDir);
  const mainCandidates = entries.filter((name) => /^main-.*\.js$/.test(name));
  if (mainCandidates.length !== 1) {
    throw new Error(`Expected exactly one main client bundle, found ${mainCandidates.length}: ${mainCandidates.join(', ')}`);
  }

  const mainFile = mainCandidates[0];
  const mainBytes = (await stat(path.join(assetsDir, mainFile))).size;
  if (mainBytes > MAX_MAIN_BYTES) {
    throw new Error(`Main client bundle ${mainFile} is ${mainBytes.toLocaleString()} bytes; budget is ${MAX_MAIN_BYTES.toLocaleString()} bytes.`);
  }

  const cssFiles = entries.filter((name) => /^styles-.*\.css$/.test(name));
  for (const cssFile of cssFiles) {
    const cssBytes = (await stat(path.join(assetsDir, cssFile))).size;
    if (cssBytes > MAX_CSS_BYTES) {
      throw new Error(`Primary stylesheet ${cssFile} is ${cssBytes.toLocaleString()} bytes; budget is ${MAX_CSS_BYTES.toLocaleString()} bytes.`);
    }
  }

  console.log(`Client performance budget passed: ${mainFile} ${(mainBytes / 1024).toFixed(1)} KiB <= ${(MAX_MAIN_BYTES / 1024).toFixed(1)} KiB; ${cssFiles.length || 0} primary stylesheet(s) within budget.`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
