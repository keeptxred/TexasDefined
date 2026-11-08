import { readFileSync } from 'node:fs';

const evidence = JSON.parse(readFileSync(new URL('../../src/data/property/hood-cad-isd-adopted.json', import.meta.url), 'utf8'));
const origins = ['https://texasdefined.com', 'https://texasdefined-site.freddy-coppola.workers.dev'];
const slugs = Object.keys(evidence.districts);
const failures = [];
const now = Date.now();

for (const slug of slugs) {
  const expected = evidence.districts[slug];
  for (const origin of origins) {
    const url = `${origin}/property-tax/taxing-unit/${slug}?verify-isd=${now}`;
    try {
      const response = await fetch(url, { cache: 'no-store', redirect: 'follow', signal: AbortSignal.timeout(20000) });
      const html = await response.text();
      if (!response.ok || !/text\/html/i.test(response.headers.get('content-type') ?? '')) throw new Error(`HTTP ${response.status} or non-HTML content`);
      const checks = [
        ['district heading', html.includes(expected.name) && html.includes('property tax rate')],
        ['local source year', html.includes(String(evidence.officialYear))],
        ['locally adopted rate', html.includes(expected.totalRate.toFixed(6))],
        ['M&O', html.includes(expected.maintenanceOperationsRate.toFixed(6))],
        ['debt', html.includes(expected.debtServiceRate.toFixed(6))],
        ['Hood CAD evidence', html.includes('hoodcad.net/truth-in-taxation-summary/')],
        ['homestead guidance', html.includes('$140,000') && html.includes('$60,000')],
        ['parcel caveat', html.includes('school-taxable value')],
        ['canonical', html.includes(`https://texasdefined.com/property-tax/taxing-unit/${slug}`)],
        ['not indexed unexpectedly', !/<meta[^>]+name=["']robots["'][^>]+noindex/i.test(html)],
      ];
      if (slug === 'tolar-isd') {
        checks.push(['2023 verified components', html.includes('0.669200') && html.includes('0.281682')]);
        checks.push(['2021 verified components', html.includes('0.963400')]);
        checks.push(['2022 historical warning', html.includes('2022 historical-source caution')]);
      }
      const missing = checks.filter(([, okay]) => !okay).map(([name]) => name);
      if (missing.length) throw new Error(missing.join(', '));
      console.log(`PASS ${slug} on ${origin}`);
    } catch (error) {
      failures.push(`${slug} at ${origin}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}

const summary = `## ISD authority production verification\n\nChecked ${slugs.length} verified school-district pages on both canonical and direct Worker origins.\n\n${failures.length ? failures.map((f) => `- FAIL: ${f}`).join('\n') : 'All source-backed ISD pages passed.'}\n`;
console.log(summary);
if (process.env.GITHUB_STEP_SUMMARY) {
  const { appendFileSync } = await import('node:fs');
  appendFileSync(process.env.GITHUB_STEP_SUMMARY, summary);
}
if (failures.length) process.exitCode = 1;
