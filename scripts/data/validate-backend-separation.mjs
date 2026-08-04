import fs from 'node:fs';

const required = [
  'src/routes/decide.property-taxes.tsx',
  'src/routes/do.property-tax-protest.tsx',
  'src/routes/do.homestead-exemption.tsx',
  'src/routes/moving-to-texas.tsx',
  'src/routes/moving-to-texas-checklist.tsx',
  'src/routes/decide.financial-tools.tsx',
  'src/routes/browse.counties.tsx',
  'src/routes/browse.cities.tsx',
  'src/routes/tax-calculator.tsx',
  'src/routes/texas-property-tax-protest-guide.tsx',
  'src/routes/texas-property-tax-increase-calculator.tsx',
  'src/routes/texas-financial-tools.tsx',
];
const errors = [];
for (const file of required) if (!fs.existsSync(file)) errors.push(`Missing TexasDefined-owned route: ${file}`);
if (!errors.length) {
  const aliases = new Map([
    ['src/routes/tax-calculator.tsx', '/decide/property-taxes'],
    ['src/routes/texas-property-tax-increase-calculator.tsx', '/decide/property-taxes'],
    ['src/routes/texas-property-tax-protest-guide.tsx', '/do/property-tax-protest'],
    ['src/routes/texas-financial-tools.tsx', '/decide/financial-tools'],
  ]);
  for (const [file, target] of aliases) {
    const source = fs.readFileSync(file, 'utf8');
    if (!source.includes('statusCode: 301') || !source.includes(target)) errors.push(`${file} must permanently redirect to ${target}.`);
  }
  const movingChecklist = fs.readFileSync('src/routes/moving-to-texas-checklist.tsx', 'utf8');
  for (const token of ['Moving to Texas Checklist', 'canonicalLink', 'Vehicles and identification', 'Taxes, voting, and the home']) {
    if (!movingChecklist.includes(token)) errors.push(`Moving checklist missing ${token}.`);
  }
  const movingHub = fs.readFileSync('src/routes/moving-to-texas.tsx', 'utf8');
  for (const token of ['createFileRoute("/moving-to-texas")', 'CategoryPage', 'moving-to-texas']) {
    if (!movingHub.includes(token)) errors.push(`Moving hub missing ${token}.`);
  }
  const tools = fs.readFileSync('src/routes/decide.financial-tools.tsx', 'utf8');
  for (const token of ["createFileRoute('/decide/financial-tools')", 'Texas Financial Tools', '/browse/counties', '/browse/cities']) {
    if (!tools.includes(token)) errors.push(`Financial tools hub missing ${token}.`);
  }
}
for (const forbidden of ['src/platform/governance-persistence.ts', 'supabase/migrations/20260804195800_governance_events.sql']) {
  if (fs.existsSync(forbidden)) errors.push(`TexasDefined must not depend on the abandoned shared database artifact: ${forbidden}`);
}
if (errors.length) {
  console.error(`TexasDefined backend-separation validation failed (${errors.length}):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log('TexasDefined lifestyle ownership, directories, compatibility routes, and independent backend boundary are valid.');
