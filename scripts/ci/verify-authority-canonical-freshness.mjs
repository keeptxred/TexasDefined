const pages = [
  {
    label: 'Texas rivers',
    url: 'https://texasdefined.com/article/texas-rivers-explained',
    required: [
      'Texas Rivers Explained',
      'Start with the map',
      'Texas Rivers, Region by Region',
      'Go Deeper on Five Major Texas Rivers',
      'Open the full 15-basin comparison',
    ],
    forbidden: [
      'Dedicated river profiles',
      "See Texas's Major Rivers on the Map",
      'Texas rivers at a glance',
      'More stories to read next',
    ],
  },
  {
    label: 'Major Texas cities',
    url: 'https://texasdefined.com/article/texas-major-cities-regional-differences',
    required: [
      'Major Texas Cities Compared: Houston, DFW, Austin & San Antonio',
      'Texas cities compared at a glance',
      'U.S. Census Bureau, 2020 Decennial Census',
      'Use current official data for a final move decision.',
    ],
    forbidden: [
      'Politics changes by geography too',
      'Texas Cities and Regions: How Houston, DFW, Austin, San Antonio and the Rest Really Differ',
    ],
  },
  {
    label: 'Hill Country geology',
    url: 'https://texasdefined.com/explore/landscapes/why-is-the-texas-hill-country-so-hilly',
    required: [
      'Texas geology explained',
      'The answer in 30 seconds',
      'Llano Uplift',
      'Research desk',
    ],
    forbidden: ['Texas Landscapes guide'],
  },
  {
    label: 'Six-man football',
    url: 'https://texasdefined.com/article/texas-six-man-football-rules-explained',
    required: [
      'Texas Six-Man Football: Rules, Scoring',
      'How It Works',
      'Six-man at a glance',
      'How the exchange rule works',
    ],
    forbidden: [],
  },
  {
    label: 'Mountain biking',
    url: 'https://texasdefined.com/texas-mountain-biking-guide',
    required: ['Five Texas trail systems at a glance'],
    forbidden: ['This is trip planning, not riding instruction'],
  },
  {
    label: 'Horseback riding',
    url: 'https://texasdefined.com/texas-horseback-riding-guide',
    required: ['Conditions that should change the plan'],
    forbidden: ['This is trip planning, not horsemanship instruction'],
  },
  {
    label: 'OHV',
    url: 'https://texasdefined.com/texas-ohv-guide',
    required: ['Rules and conditions to check before you unload'],
    forbidden: ['This is access planning, not off-road driving instruction'],
  },
  {
    label: 'Paddling',
    url: 'https://texasdefined.com/texas-paddling-guide',
    required: ['Check the route, weather and exit plan before launching'],
    forbidden: ['This is trip planning, not paddling instruction'],
  },
  {
    label: 'Rock climbing',
    url: 'https://texasdefined.com/texas-rock-climbing-bouldering-guide',
    required: ['Check access, weather and site rules before committing to the day'],
    forbidden: ['This is a trip-planning guide, not climbing instruction'],
  },
];

const failures = [];

for (const page of pages) {
  let passed = false;
  let lastMissing = page.required;
  let lastForbidden = [];
  let lastProblem = '';

  for (let attempt = 1; attempt <= 4; attempt += 1) {
    try {
      const response = await fetch(page.url, {
        redirect: 'follow',
        cache: 'no-store',
        signal: AbortSignal.timeout(15_000),
        headers: {
          'user-agent': 'TexasDefined-CI-Authority-Freshness/1.0',
          'cache-control': 'no-cache',
          pragma: 'no-cache',
        },
      });

      if (!response.ok) {
        lastProblem = `HTTP ${response.status}`;
      } else {
        const html = await response.text();
        lastMissing = page.required.filter((marker) => !html.includes(marker));
        lastForbidden = page.forbidden.filter((marker) => html.includes(marker));
        lastProblem = '';

        if (lastMissing.length === 0 && lastForbidden.length === 0) {
          console.log(`${page.label} canonical page is fresh on attempt ${attempt}.`);
          passed = true;
          break;
        }
      }
    } catch (error) {
      lastProblem = error instanceof Error ? error.message : String(error);
    }

    if (attempt < 4) await new Promise((resolve) => setTimeout(resolve, 2_000));
  }

  if (!passed) {
    const details = [];
    if (lastProblem) details.push(lastProblem);
    if (lastMissing.length) details.push(`missing: ${lastMissing.join(', ')}`);
    if (lastForbidden.length) details.push(`obsolete text still present: ${lastForbidden.join(', ')}`);
    failures.push(`${page.label}: ${details.join('; ')}`);
  }
}

if (failures.length) {
  throw new Error(`Authority canonical freshness failed:\n- ${failures.join('\n- ')}`);
}

console.log(`Authority canonical freshness passed for ${pages.length} governed page(s).`);
