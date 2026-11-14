// Read PageSpeed Insights only as independent evidence. This cannot certify
// Google's chosen canonical, indexing state, or fresh Core Web Vitals without
// real page-level CrUX observations. Missing/429 API data is UNKNOWN, not good.
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const REPORT_PATH = '.artifacts/homepage-vitals-evidence.json';
const HOMEPAGE_URL = 'https://texasdefined.com/';
const CATEGORIES = ['mobile', 'desktop'];

export function summarizePageSpeed(data, strategy) {
  const page = data?.loadingExperience;
  const origin = data?.originLoadingExperience;
  const urlMetrics = page?.metrics && !page.origin_fallback ? page.metrics : null;
  const originMetrics = origin?.metrics || null;
  const fieldSource = urlMetrics ? 'homepage-URL' : originMetrics ? 'origin-only' : 'insufficient-data';
  const metrics = urlMetrics || originMetrics || {};
  const keyed = {
    lcp: ['LARGEST_CONTENTFUL_PAINT_MS', 'largest_contentful_paint'],
    inp: ['INTERACTION_TO_NEXT_PAINT', 'interaction_to_next_paint'],
    cls: ['CUMULATIVE_LAYOUT_SHIFT_SCORE', 'cumulative_layout_shift'],
  };
  const selected = Object.fromEntries(Object.entries(keyed).map(([name, keys]) => {
    const entry = keys.map(key => metrics[key]).find(Boolean);
    return [name, entry && Number.isFinite(entry.percentile)
      ? {
        // PSI reports CLS as an integer percentage: 5 corresponds to 0.05.
        // Retain original API value to distinguish conversion from source data.
        p75: name === 'cls' ? entry.percentile / 100 : entry.percentile,
        rawP75: entry.percentile,
        unit: name === 'cls' ? 'unitless' : 'ms',
        category: entry.category ?? 'UNKNOWN',
      } : null];
  }));
  // Google's Core Web Vitals assessment requires both LCP and CLS field data.
  // INP may be absent if sampling is insufficient; LCP+INP alone cannot pass.
  const required = [selected.lcp, selected.cls];
  const observed = [selected.lcp, selected.cls, ...(selected.inp ? [selected.inp] : [])].filter(Boolean);
  const hasRequired = required.every(Boolean);
  const hasKnownCategories = observed.every(m => ['FAST', 'AVERAGE', 'SLOW'].includes(m.category));
  const urlFieldStatus = fieldSource !== 'homepage-URL' ? 'not-measured'
    : !hasRequired || !hasKnownCategories ? 'incomplete'
      : observed.some(m => m.category === 'SLOW' || m.category === 'AVERAGE')
        ? 'needs-improvement' : 'good';
  const labs = data?.lighthouseResult?.audits || {};
  return {
    strategy,
    fieldSource,
    urlFieldStatus,
    p75: selected,
    fieldPeriod: 'CrUX rolling 28-day user experience when sufficiently sampled',
    lab: {
      lcpMs: labs['largest-contentful-paint']?.numericValue ?? null,
      cls: labs['cumulative-layout-shift']?.numericValue ?? null,
      totalBlockingTimeMs: labs['total-blocking-time']?.numericValue ?? null,
      performanceScore: data?.lighthouseResult?.categories?.performance?.score ?? null,
    },
  };
}

export async function auditHomepageVitals({
  fetchImpl = fetch,
  key = process.env.PAGESPEED_API_KEY,
  reportPath = REPORT_PATH,
  strategies = CATEGORIES,
} = {}) {
  const report = {
    observedAt: new Date().toISOString(), source: 'Google PageSpeed Insights v5',
    url: HOMEPAGE_URL, indexingStatus: 'not-verified-Google-Search-Console-URL-Inspection-required',
    strategies: [], conclusion: 'field-data-unavailable',
  };
  for (const strategy of strategies) {
    const endpoint = new URL('https://www.googleapis.com/pagespeedonline/v5/runPagespeed');
    endpoint.searchParams.set('url', HOMEPAGE_URL);
    endpoint.searchParams.set('strategy', strategy);
    endpoint.searchParams.set('category', 'performance');
    if (key) endpoint.searchParams.set('key', key);
    try {
      const response = await fetchImpl(endpoint, { signal: AbortSignal.timeout(50000) });
      if (!response.ok) {
        report.strategies.push({ strategy, fieldSource: 'unavailable', urlFieldStatus: 'not-measured',
          apiHttpStatus: response.status });
        continue;
      }
      const data = await response.json();
      report.strategies.push(summarizePageSpeed(data, strategy));
    } catch (error) {
      report.strategies.push({ strategy, fieldSource: 'unavailable', urlFieldStatus: 'not-measured',
        detail: String(error) });
    }
  }
  const fieldStatuses = report.strategies.map(s => s.urlFieldStatus);
  if (fieldStatuses.includes('needs-improvement')) report.conclusion = 'url-field-vitals-need-improvement';
  else if (fieldStatuses.length && fieldStatuses.every(x => x === 'good')) report.conclusion = 'url-field-vitals-good';
  else if (fieldStatuses.includes('good')) report.conclusion = 'partial-url-field-data';
  await mkdir(dirname(reportPath), { recursive: true });
  await writeFile(reportPath, JSON.stringify(report, null, 2) + '\n');
  console.log('[homepage-vitals] ' + report.conclusion + ': ' +
    report.strategies.map(x => x.strategy + '=' + x.fieldSource + '/' + x.urlFieldStatus).join(', '));
  if (report.conclusion === 'url-field-vitals-need-improvement')
    throw new Error('Official URL-level CrUX observations show homepage field Web Vitals need improvement; see ' + reportPath);
  return report;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await auditHomepageVitals();
}
