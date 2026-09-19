import fs from 'node:fs';
import path from 'node:path';

const inputPath = process.argv[2];
const outputPath = process.argv[3];
const alignmentPath = process.argv[4] ?? 'src/data/high-school-football/uil-football-alignments-2026.server.ts';

if (!inputPath || !outputPath) {
  console.error('Usage: node scripts/data/generate-uil-football-enrollments.mjs <uil-pdftotext.txt> <output.ts> [alignment-source.ts]');
  process.exit(2);
}

const EXPECTED_TOTAL = 1268;
const EXPECTED_CLASS_COUNTS = {
  '1A': 159,
  '2A': 205,
  '3A': 204,
  '4A': 205,
  '5A': 246,
  '6A': 249,
};

function extractPdfFootballRows(text) {
  const rows = new Map();

  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.replace(/\f/g, '').trim();
    if (!line || !/(?:6-Man|11-Man)$/.test(line)) continue;

    const match = line.match(/^(.*?)\s+(1A|2A|3A|4A|5A|6A)\s+([0-9]+(?:\.[0-9]+)?)\s+(.+?)\s+(6-Man|11-Man)$/);
    if (!match) {
      throw new Error(`Could not parse UIL football row: ${line}`);
    }

    const [, schoolName, submittedConference, enrollmentText, middle, footballType] = match;
    if (!/\d/.test(middle)) {
      throw new Error(`UIL football row has no district data: ${line}`);
    }
    const enrollment = Number(enrollmentText);
    if (!Number.isFinite(enrollment) || enrollment <= 0) {
      throw new Error(`Invalid enrollment for ${schoolName}: ${enrollmentText}`);
    }
    if (rows.has(schoolName)) {
      throw new Error(`Duplicate UIL football row for ${schoolName}`);
    }

    rows.set(schoolName, {
      schoolName,
      submittedConference,
      enrollment,
      footballType,
    });
  }

  return rows;
}

function parseStringLiteral(literal) {
  if (literal.startsWith('"')) return JSON.parse(literal);
  const inner = literal.slice(1, -1)
    .replace(/\\'/g, "'")
    .replace(/\\\\/g, '\\');
  return inner;
}

function extractAlignmentPrograms(source) {
  const programs = [];
  const blockPattern = /\{\s*classification:'([1-6]A)',\s*division:(1|2|null),\s*footballType:'(6-Man|11-Man)',\s*sourceUrl:'[^']+',\s*districts:\[([\s\S]*?)\]\s*\}/g;

  for (const block of source.matchAll(blockPattern)) {
    const [, classification, divisionText, footballType, districtSource] = block;
    const districtStrings = [];
    const literalPattern = /'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"/g;
    for (const literalMatch of districtSource.matchAll(literalPattern)) {
      districtStrings.push(parseStringLiteral(literalMatch[0]));
    }

    districtStrings.forEach((district, districtIndex) => {
      for (const schoolName of district.split(';').map((value) => value.trim()).filter(Boolean)) {
        programs.push({
          schoolName,
          classification,
          division: divisionText === 'null' ? null : Number(divisionText),
          district: districtIndex + 1,
          footballType,
        });
      }
    });
  }

  return programs;
}

const pdfRows = extractPdfFootballRows(fs.readFileSync(inputPath, 'utf8'));
const alignmentPrograms = extractAlignmentPrograms(fs.readFileSync(alignmentPath, 'utf8'));

if (pdfRows.size !== EXPECTED_TOTAL) {
  throw new Error(`UIL alphabetical listing expected ${EXPECTED_TOTAL} football rows; parsed ${pdfRows.size}.`);
}
if (alignmentPrograms.length !== EXPECTED_TOTAL) {
  throw new Error(`TexasDefined alignment expected ${EXPECTED_TOTAL} football programs; parsed ${alignmentPrograms.length}.`);
}

const classCounts = alignmentPrograms.reduce((counts, program) => {
  counts[program.classification] = (counts[program.classification] ?? 0) + 1;
  return counts;
}, {});
for (const [classification, expected] of Object.entries(EXPECTED_CLASS_COUNTS)) {
  if (classCounts[classification] !== expected) {
    throw new Error(`Alignment ${classification} count expected ${expected}; found ${classCounts[classification] ?? 0}.`);
  }
}

const missing = alignmentPrograms.filter((program) => !pdfRows.has(program.schoolName));
const extras = [...pdfRows.keys()].filter((schoolName) => !alignmentPrograms.some((program) => program.schoolName === schoolName));
if (missing.length || extras.length) {
  console.error('Missing from official alphabetical football rows:', missing.map((program) => program.schoolName));
  console.error('Official football rows not found in TexasDefined alignment:', extras);
  throw new Error(`Exact UIL school-name join failed: ${missing.length} missing, ${extras.length} extra.`);
}

for (const program of alignmentPrograms) {
  const row = pdfRows.get(program.schoolName);
  if (row.footballType !== program.footballType) {
    throw new Error(`Football type mismatch for ${program.schoolName}: alignment=${program.footballType}, alphabetical=${row.footballType}`);
  }
}

const sorted = [...pdfRows.values()].sort((left, right) => left.schoolName.localeCompare(right.schoolName));
const entries = sorted.map((row) =>
  `  ${JSON.stringify(row.schoolName)}: ${JSON.stringify({ enrollment: row.enrollment, submittedConference: row.submittedConference })},`
).join('\n');

const generated = `// AUTO-GENERATED by scripts/data/generate-uil-football-enrollments.mjs.
// Source: University Interscholastic League 2026–28 Realignment Alphabetical Listing.
// Do not edit individual values by hand. Re-run the governed sync instead.

export type UilFootballExactEnrollment = {
  enrollment: number;
  submittedConference: '1A' | '2A' | '3A' | '4A' | '5A' | '6A';
};

export const UIL_FOOTBALL_EXACT_ENROLLMENT_SOURCE = {
  label: 'UIL 2026–28 Realignment Alphabetical Listing',
  url: 'https://www.uiltexas.org/files/alignments/Alpha_26-28.pdf',
  cycle: '2026–28',
} as const;

export const UIL_FOOTBALL_EXACT_ENROLLMENTS_2026_28: Readonly<Record<string, UilFootballExactEnrollment>> = {
${entries}
};
`;

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, generated);
console.log(`Generated ${sorted.length} exact UIL football enrollments at ${outputPath}.`);
console.log('Alignment counts:', JSON.stringify(classCounts));
