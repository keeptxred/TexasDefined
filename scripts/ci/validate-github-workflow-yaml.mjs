import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import * as prettier from 'prettier';

const workflowDir = '.github/workflows';
const files = (await readdir(workflowDir))
  .filter((name) => name.endsWith('.yml') || name.endsWith('.yaml'))
  .sort();
const failures = [];

for (const file of files) {
  const path = join(workflowDir, file);
  const source = await readFile(path, 'utf8');
  try {
    await prettier.format(source, { parser: 'yaml', filepath: path });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    failures.push(`${file}: ${message}`);
  }
}

if (failures.length) {
  for (const failure of failures) console.error(`FAIL: ${failure}`);
  process.exitCode = 1;
} else {
  console.log(`GitHub workflow YAML syntax passed (${files.length} files).`);
}
