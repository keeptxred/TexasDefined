import { spawnSync } from 'node:child_process';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const workdir = mkdtempSync(path.join(tmpdir(), 'painted-church-guide-quality-'));
const outfile = path.join(workdir, 'search-guides.mjs');
const esbuild = path.resolve('node_modules', '.bin', process.platform === 'win32' ? 'esbuild.cmd' : 'esbuild');

const fail = (message) => {
  console.error(`Painted Churches search-guide quality gate failed: ${message}`);
  process.exitCode = 1;
};

try {
  const build = spawnSync(esbuild, [
    'src/data/painted-church-search-guides.ts',
    '--bundle',
    '--platform=node',
    '--format=esm',
    '--target=node22',
    `--outfile=${outfile}`,
  ], { stdio: 'inherit' });

  if (build.error) throw build.error;
  if (build.status !== 0) {
    console.error(`Unable to bundle Painted Churches search-guide data (exit ${build.status}).`);
    process.exit(build.status || 1);
  }

  const module = await import(`${pathToFileURL(outfile).href}?v=${Date.now()}`);
  const guides = module.paintedChurchSearchGuides;
  if (!Array.isArray(guides) || !guides.length) {
    fail('no dedicated guides were returned.');
  } else {
    const seenSlugs = new Set();
    for (const guide of guides) {
      const label = guide.slug || '(missing slug)';
      if (!guide.slug || seenSlugs.has(guide.slug)) fail(`${label}: slug must be present and unique.`);
      seenSlugs.add(guide.slug);

      if ((guide.title ?? '').trim().length < 30) fail(`${label}: title is too thin.`);
      if ((guide.description ?? '').trim().length < 90) fail(`${label}: description must provide substantive intent context.`);
      if ((guide.quickAnswer ?? '').trim().length < 180) fail(`${label}: quick answer must be at least 180 characters.`);

      const sections = Array.isArray(guide.sections) ? guide.sections : [];
      if (sections.length < 2) fail(`${label}: requires at least two substantive sections.`);
      const paragraphs = sections.flatMap((section) => Array.isArray(section.paragraphs) ? section.paragraphs : []);
      if (paragraphs.length < 3) fail(`${label}: requires at least three explanatory paragraphs.`);
      if (paragraphs.some((paragraph) => paragraph.trim().length < 100)) fail(`${label}: contains an undersized explanatory paragraph.`);

      const faqs = Array.isArray(guide.faqs) ? guide.faqs : [];
      if (faqs.length < 3) fail(`${label}: requires at least three FAQs.`);
      if (faqs.some((faq) => (faq.question ?? '').trim().length < 15 || (faq.answer ?? '').trim().length < 35)) fail(`${label}: contains a thin FAQ question/answer.`);

      const sources = Array.isArray(guide.sources) ? guide.sources : [];
      if (sources.length < 1) fail(`${label}: requires at least one named supporting source.`);
      const sourceUrls = sources.map((source) => source.url).filter(Boolean);
      if (sourceUrls.length !== sources.length || new Set(sourceUrls).size !== sourceUrls.length) fail(`${label}: source URLs must be present and unique within the guide.`);
      for (const url of sourceUrls) {
        try {
          const parsed = new URL(url);
          if (!['https:', 'http:'].includes(parsed.protocol)) fail(`${label}: unsupported source URL protocol ${parsed.protocol}.`);
        } catch {
          fail(`${label}: invalid source URL ${url}.`);
        }
      }

      const relatedChurches = Array.isArray(guide.relatedChurchSlugs) ? guide.relatedChurchSlugs : [];
      const relatedPaths = Array.isArray(guide.relatedPaths) ? guide.relatedPaths : [];
      if (relatedChurches.length + relatedPaths.length < 1) fail(`${label}: requires at least one canonical internal next step.`);

      const substantiveText = [guide.quickAnswer, ...paragraphs, ...faqs.map((faq) => faq.answer)].join(' ').replace(/\s+/g, ' ').trim();
      if (substantiveText.length < 900) fail(`${label}: total explanatory copy is below the 900-character anti-thin-content floor.`);
    }

    if (!process.exitCode) {
      console.log(`Painted Churches search-guide quality protected: ${guides.length} dedicated guides meet minimum title/description/quick-answer, multi-section, FAQ, source, internal-link and anti-thin-content floors.`);
    }
  }
} finally {
  rmSync(workdir, { recursive: true, force: true });
}
