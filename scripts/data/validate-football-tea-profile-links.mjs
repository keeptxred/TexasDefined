import fs from 'node:fs';

const files = {
  directory: 'src/data/high-school-football/football-directory.server.ts',
  lookup: 'src/components/sports/HighSchoolFootballLookup.tsx',
  profile: 'src/routes/texas-high-school-football-teams_.$slug.lazy.tsx',
};

const errors = [];
const read = (path) => fs.readFileSync(path, 'utf8');
const requireText = (source, marker, label) => {
  if (!source.includes(marker)) errors.push(`${label} missing: ${marker}`);
};

for (const path of Object.values(files)) {
  if (!fs.existsSync(path)) errors.push(`Missing TEA football-source file: ${path}`);
}

if (!errors.length) {
  const directory = read(files.directory);
  const lookup = read(files.lookup);
  const profile = read(files.profile);

  for (const marker of [
    'schoolNumber?: string',
    'districtNumber?: string',
    'schoolWebsite?: string',
    'districtWebsite?: string',
    "findColumn(headers, ['schoolnumber', 'campusnumber', 'campusid', 'schoolid'])",
    "findColumn(headers, ['districtnumber', 'districtid', 'leanumber', 'leaid'])",
    'normalizeTeaId',
    'normalizeOfficialUrl',
    'teaSchoolProfileUrl',
    'teaDistrictProfileUrl',
    'https://txschools.gov/?id=',
    'teaSchoolProfileUrl: teaSchoolProfileUrl(record.schoolNumber)',
    'teaDistrictProfileUrl: teaDistrictProfileUrl(record.districtNumber)',
  ]) requireText(directory, marker, 'Football AskTED enrichment');

  for (const marker of [
    'teaSchoolProfileUrl?: string',
    'teaDistrictProfileUrl?: string',
    'TEA school profile ↗',
    'TEA district profile ↗',
  ]) requireText(lookup, marker, 'Football lookup TEA links');

  for (const marker of [
    'Official school research',
    'Texas Education Agency and school-system sources',
    'program.teaSchoolProfileUrl',
    'program.teaDistrictProfileUrl',
    'Official school website ↗',
    'Official district website ↗',
  ]) requireText(profile, marker, 'Football profile TEA links');
}

if (errors.length) {
  console.error('Football TEA profile-link validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Football TEA profile-link validation passed.');
