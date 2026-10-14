const origin = process.env.PRODUCTION_ORIGIN ?? 'https://texasdefined.com';
const sha = process.env.GITHUB_SHA ?? 'local';
const runId = process.env.GITHUB_RUN_ID ?? Date.now().toString();
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function requireCondition(condition, message) {
  if (!condition) throw new Error(message);
}

async function fetchLive(path, label) {
  let lastError = null;
  let lastBody = '';

  for (let attempt = 1; attempt <= 5; attempt += 1) {
    const separator = path.includes('?') ? '&' : '?';
    const token = encodeURIComponent(`${sha}-${runId}-${label}-${attempt}`);
    const url = `${origin}${path}${separator}verify_angi=${token}`;
    console.log(`[angi-production] ${label} attempt ${attempt}: ${url}`);

    try {
      const response = await fetch(url, {
        redirect: 'follow',
        cache: 'no-store',
        signal: AbortSignal.timeout(30_000),
        headers: {
          'cache-control': 'no-cache, no-store, max-age=0',
          pragma: 'no-cache',
          'user-agent': 'TexasDefined-CI-Angi-Smoke/1.0',
        },
      });
      const body = await response.text();
      lastBody = body;
      const challenged = response.headers.get('cf-mitigated')?.toLowerCase() === 'challenge';

      if (challenged) throw new Error('Cloudflare returned cf-mitigated: challenge');
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return body;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      console.log(`[angi-production] ${label} attempt ${attempt} failed: ${lastError.message}`);
      if (attempt < 5) await sleep(5_000);
    }
  }

  if (lastBody) {
    console.error(`[angi-production] ${label} response sample: ${lastBody.slice(0, 1200).replace(/\s+/g, ' ')}`);
  }
  throw lastError ?? new Error(`${label} failed live verification.`);
}

try {
  const page = await fetchLive('/article/texas-roofs-hail-wind-heat', 'roofing-page');
  requireCondition(page.includes('/city-experience-affiliate.js'), 'Representative home-services page is missing the shared client affiliate bootstrap.');
  requireCondition(!/<script[^>]+src=["']\/angi-home-services\.js(?:[?"'])/i.test(page), 'Angi is being emitted directly from SSR instead of remaining client-bootstrapped.');

  const loader = await fetchLive('/city-experience-affiliate.js', 'affiliate-loader');
  for (const needle of [
    'td-angi-home-services-script',
    'eligibleRoute',
    'article|guides|texas-living|moving-to-texas|real-estate|home-garden|property-tax-guides',
    'document.getElementById(scriptId)',
    'window.addEventListener("popstate", scheduleAngiLoad)',
    'new MutationObserver(scheduleAngiLoad)',
    'document.createElement("script")',
    'script.src = "/angi-home-services.js"',
    'document.body.appendChild(script)',
  ]) {
    requireCondition(loader.includes(needle), `Deployed affiliate loader is missing Angi bootstrap marker: ${needle}`);
  }

  const moduleSource = await fetchLive('/angi-home-services.js', 'angi-module');
  for (const needle of [
    'td-angi-home-services',
    'data-affiliate-partner="angi"',
    'data-commercial-partner="angi"',
    'sponsored nofollow noopener noreferrer',
    'affiliate_module: "home-services"',
    'qualifying service request',
    'does not select, employ or endorse individual service providers',
    'aid=157319271',
    'm=comjuncaffnet',
    'category/12061/',
    'category/12002/',
    'category/12058/',
    'category/12050/',
    'category/12033/',
    'category/12001/',
    'category/12070/',
    'roof (?:replacement|repair|installation|installer|installers|inspection|inspector|inspectors|contractor|contractors|company|companies|cost|costs)',
    'landscaping (?:company|companies|contractor|contractors|service|services|installation|design|cost|costs)',
    'pageServiceOverrides',
    '["/article/texas-roofs-hail-wind-heat", "roofing"]',
    '["/article/texas-foundation-care-clay-soil-drought", "foundation"]',
    '["/article/texas-household-pests-guide", "pest-control"]',
    '["/article/texas-pool-owner-guide", "pools"]',
    '["/article/texas-home-maintenance-calendar", "handyman"]',
    '["/article/texas-native-garden-that-survives-august", "landscaping"]',
    '["/article/best-native-plants-texas-yard", "landscaping"]',
    '["/article/texas-homeowner-field-manual", null]',
    '["/article/true-cost-of-owning-a-home-in-texas", null]',
    '["/article/texas-wildfire-home-protection-guide", null]',
    '["/article/texas-home-architecture-regions", null]',
    '["/article/corporate-relocation-to-texas", null]',
    '["/article/health-insurance-when-moving-to-texas", null]',
    '["/article/texas-vs-florida-differences", null]',
    '["/moving-to-texas/data", null]',
    '["/moving-to-texas/tools", null]',
    'pageServiceOverrides.has(normalizedPathname)',
  ]) {
    requireCondition(moduleSource.includes(needle), `Deployed Angi module is missing governed marker: ${needle}`);
  }

  requireCondition(!moduleSource.includes('roof(?:ing| replacement| repair|er|ers)?'), 'Deployed Angi module restored the broad bare-roof matcher.');
  requireCondition(!moduleSource.includes('landscap(?:e|er|ers|ing)'), 'Deployed Angi module restored the generic landscape matcher.');

  console.log('[angi-production] Live page, route-gated client bootstrap, exact-path home-service overrides, service-intent roof/landscape fallbacks, false-positive opt-outs, governed Angi asset, CJ attribution and SSR separation passed production verification.');
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`::error title=ANGI PRODUCTION failure::${message}`);
  process.exit(1);
}