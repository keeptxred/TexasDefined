import fs from 'node:fs';

const read = (path) => fs.readFileSync(path, 'utf8');
const failures = [];
const required = [
  'src/data/fishing/editorial-review.types.ts',
  'src/data/fishing/editorial-review.server.ts',
  'src/data/fishing/editorial-review.functions.ts',
  'src/routes/admin.fishing-review.tsx',
  'src/routes/admin.fishing-review.lazy.tsx',
  'src/data/fishing/guide-onboarding.server.ts',
  'src/data/fishing/report-onboarding.server.ts',
  'src/data/fishing/report-validation.ts',
  'src/data/fishing/validation.ts',
  'scripts/data/validate-fishing-report-platform.mjs',
];
for (const file of required) if (!fs.existsSync(file)) failures.push(`Missing Batch 18 fishing editorial-review file: ${file}`);

if (!failures.length) {
  const server = read('src/data/fishing/editorial-review.server.ts');
  const functions = read('src/data/fishing/editorial-review.functions.ts');
  const route = read('src/routes/admin.fishing-review.tsx');
  const lazy = read('src/routes/admin.fishing-review.lazy.tsx');
  const guideOnboarding = read('src/data/fishing/guide-onboarding.server.ts');
  const reportOnboarding = read('src/data/fishing/report-onboarding.server.ts');
  const reportValidation = read('src/data/fishing/report-validation.ts');
  const fishingValidation = read('src/data/fishing/validation.ts');
  const reportPlatformValidator = read('scripts/data/validate-fishing-report-platform.mjs');

  for (const marker of [
    "const GUIDE_SOURCE_PATH = '/fishing/guides/submit'",
    "const REPORT_SOURCE_PATH = '/fishing/reports/submit'",
    ".from('texasdefined_partner_inquiries')",
    ".in('source_path', [...REVIEW_SOURCE_PATHS])",
    'assertSportsPartnerAccess(accessKey)',
    '.update({ status })',
    "new: 0, reviewing: 0, contacted: 0, closed: 0",
    "'guide-listing': 0, 'fishing-report': 0",
  ]) if (!server.includes(marker)) failures.push(`Fishing editorial review server missing protected marker: ${marker}`);

  for (const forbidden of ['fishingPlatform.reports', 'fishingPlatform.guides', '.insert(', '.delete(', 'verifiedListing: true', 'contributorApproved: true']) {
    if (server.includes(forbidden)) failures.push(`Editorial review queue must not publish or mutate public fishing records: ${forbidden}`);
  }

  if (!functions.includes('createServerFn') || !functions.includes('z.string().uuid()') || !functions.includes("z.enum(['new', 'reviewing', 'contacted', 'closed'])")) failures.push('Fishing editorial review server-function validation is incomplete.');
  if (!route.includes("createFileRoute('/admin/fishing-review')") || !route.includes("noindex,nofollow,noarchive")) failures.push('Fishing editorial review route must remain private/noindex.');
  if (!lazy.includes("createLazyFileRoute('/admin/fishing-review')") || !lazy.includes('Fishing Editorial Review')) failures.push('Fishing editorial review UI must use a native lazy admin route.');
  for (const marker of ['Guide listings', 'Fishing reports', 'Changing status here never creates or edits a public fishing guide/report record.', 'sponsorship never changes editorial approval']) if (!lazy.includes(marker)) failures.push(`Fishing editorial review UI missing governance marker: ${marker}`);

  if (!guideOnboarding.includes('source_path: "/fishing/guides/submit"')) failures.push('Guide onboarding source path no longer matches the editorial review queue.');
  if (!reportOnboarding.includes('source_path: "/fishing/reports/submit"')) failures.push('Report onboarding source path no longer matches the editorial review queue.');
  if (!reportValidation.includes('guide.contributorApproved') || !reportValidation.includes('isFishingRecordVerified(report)')) failures.push('Public fishing report contributor/publication validation must remain independent of queue status.');
  if (!fishingValidation.includes('verified-guide') && !read('scripts/data/validate-fishing-guide-platform.mjs').includes('verifiedListing')) failures.push('Public guide verification gate must remain independent of queue status.');
  if (!reportPlatformValidator.includes("await import('./validate-fishing-editorial-review.mjs')")) failures.push('Batch 18 validator is not wired through the fishing report validation chain.');
}

if (failures.length) {
  console.error('Fishing Batch 18 editorial review validation failed:');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log('Fishing Batch 18 editorial review validation passed: guide/report intake review is private, source-scoped, status-only, access-controlled, lazy-loaded and unable to bypass public fishing verification gates.');
