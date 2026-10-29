const pages = [
  {
    label: 'Beaumont public Mardi Gras historical parade photograph',
    url: 'https://texasdefined.com/event/mardi-gras-southeast-texas-beaumont',
    required: [
      'Mardi Gras of Southeast Texas',
      '2C2KPhotography',
      'CC BY 2.0',
      'March 1, 2025',
      'BeaumontMardiGrasParade312532.jpg',
      'Image source',
    ],
    forbidden: ['name="robots" content="noindex', 'content="noindex, follow'],
  },
  {
    label: 'Beaumont Pardi Gras exact charity venue photograph',
    url: 'https://texasdefined.com/event/beaumont-pardi-gras',
    required: [
      'Beaumont Pardi Gras',
      'Beaumont Civic Center',
      'LUSportsFan',
      'CC BY-SA 4.0',
      'February 16, 2015',
      'Beaumont_February_16_025.JPG',
      'Image source',
    ],
    forbidden: ['name="robots" content="noindex', 'content="noindex, follow'],
  },
  {
    label: 'Oak Cliff Mardi Gras 2027 parade',
    url: 'https://texasdefined.com/event/oak-cliff-mardi-gras-parade',
    required: [
      'Sunday, February 7, 2027',
      'Dash for the Beads',
      'Michael Barera',
      'CC BY-SA 4.0',
    ],
    forbidden: [
      'Completed historical 2026 parade',
      'Latest confirmed occurrence has ended',
      '2027 parade date remain unannounced',
    ],
  },
  {
    label: 'Texas Mardi Gras 2027 statewide hub',
    url: 'https://texasdefined.com/events/mardi-gras',
    required: [
      'Mardi Gras in Texas',
      'Oak Cliff Mardi Gras Parade',
      'February 7, 2027',
      'Dash for the Beads',
    ],
    // Scope stale-Dallas detection to its specific listing. Other organizers
    // (notably Texas City) correctly remain unconfirmed for 2027.
    forbidden: [
      'Dallas · Date pending',
    ],
  },
  // Scoped Mardi Gras authority acceptance: with the four existing entries above,
  // exactly 11 local guides + one statewide hub. Never let a healthy generic
  // status code substitute for exact event identity, image rights or noindex.
  {
    label: 'Galveston licensed 2013 actual Mardi Gras parade',
    url: 'https://texasdefined.com/event/mardi-gras-galveston',
    required: ['Mardi Gras! Galveston', '2027', 'A Yee', 'CC BY 2.0', 'Galveston_Mardi_Gras_Parade_2013_08.jpg', 'data-major-event-hero="true"'],
    forbidden: ['name="robots" content="noindex', 'content="noindex, follow'],
  },
  {
    label: 'Jefferson Mardi Gras actual historic downtown venue',
    url: 'https://texasdefined.com/event/mardi-gras-upriver-jefferson',
    required: ['Mardi Gras Upriver', 'Krewe of Hebe', 'February 5', 'Renelibrary', 'CC BY-SA 4.0', 'data-major-event-hero="true"'],
    forbidden: ['name="robots" content="noindex', 'content="noindex, follow'],
  },
  {
    label: 'Bandera archive license and contradictory Sunday date disclosure',
    url: 'https://texasdefined.com/event/cowboy-mardi-gras-bandera',
    required: ['Cowboy Mardi Gras', 'January 28', 'January 30', 'January 31', 'Carol M. Highsmith', 'Public domain', 'data-major-event-hero="true"'],
    forbidden: ['name="robots" content="noindex', 'content="noindex, follow'],
  },
  {
    label: 'Kemah two separately organized 2027 parades and historical venue',
    url: 'https://texasdefined.com/event/kemah-yachty-gras',
    required: ['Yachty Gras', 'Krewe du Lac', 'February 6', 'February 9', 'Tony Webster', 'CC BY 2.0', 'data-major-event-hero="true"'],
    forbidden: ['name="robots" content="noindex', 'content="noindex, follow'],
  },
  {
    label: 'Palestine 2027 parade and true historic streetscape license',
    url: 'https://texasdefined.com/event/palestine-mardi-gras-parade',
    required: ['Palestine Mardi Gras Parade', 'January 30', 'Renelibrary', 'CC BY-SA 4.0', 'data-major-event-hero="true"'],
    forbidden: ['name="robots" content="noindex', 'content="noindex, follow'],
  },
  {
    label: 'Port Arthur gate hours remain distinct from parade hours and noindex',
    url: 'https://texasdefined.com/event/mardi-gras-port-arthur',
    required: ['Mardi Gras Port Arthur', 'February 5', '2027', 'FESTIVAL GATE', 'Ben J. Rogers Regional Visitors Center', 'noindex, follow'],
    forbidden: ['data-major-event-hero="true"', 'data-major-event-enrichment-image="true"'],
  },
  {
    label: 'Crystal Beach 2027 parade still protected pending image rights',
    url: 'https://texasdefined.com/event/crystal-beach-mardi-gras-parade',
    required: ['Crystal Beach Mardi Gras Parade', 'February 6', '2027', 'Highway 87', 'noindex, follow'],
    forbidden: ['data-major-event-hero="true"', 'data-major-event-enrichment-image="true"'],
  },
  {
    label: 'Orange 2026 historical source must not become false 2027 event',
    url: 'https://texasdefined.com/event/mardi-gras-on-the-sabine-orange',
    required: ['Mardi Gras on the Sabine', 'February 7, 2026', '2027', 'City of Orange', 'noindex, follow'],
    forbidden: ['data-major-event-hero="true"', 'data-major-event-enrichment-image="true"'],
  },
  {
    label: 'Texas rivers',
    url: 'https://texasdefined.com/article/texas-rivers-explained',
    required: [
      'Texas Rivers Explained',
      'See how Texas rivers cross the state',
      'How Texas Rivers Change Across the State',
      'Explore All 15 Major Texas River Basins',
      'Texas Rivers at a Glance',
      'Open the full 15-basin comparison',
    ],
    forbidden: [
      'Dedicated river profiles',
      "See Texas's Major Rivers on the Map",

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
    label: 'Katy District 22-6A game-week hub',
    url: 'https://texasdefined.com/texas-high-school-football-districts/6a-district-22',
    required: [
      'Katy ISD District 22-6A Football',
      'Katy ISD district game week',
      'District records from reported games',
      'not UIL-certified standings',
      'Reported final scores',
      'Scheduled / result awaiting verification',
      'MaxPreps reported final',
      'UIL alignment source',
      'Katy Tompkins',
    ],
    forbidden: [
      'Your district hub for the current UIL alignment',
      'District 22-6A Football | Teams &amp; UIL Guide',
    ],
  },
  {
    label: 'Six-man football',
    url: 'https://texasdefined.com/article/texas-six-man-football-rules-explained',
    required: [
      'Texas Six-Man Football: Rules, Scoring',
      'How It Works',
      'Six-man at a glance',
      'How the exchange rule works',
      'six-man-field-title',
      '100 yards including end zones',
    ],
    forbidden: ['80 yards × 40 yards · midfield at the 40'],
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

// Only the twelve Mardi Gras authority URLs receive this contract. Other
// production freshness checks remain unchanged; no sitewide crawl is introduced.
const mardiGrasPages = pages.filter((page) => /\/(?:event\/(?:mardi-gras-|cowboy-mardi-gras-|crystal-beach-mardi-gras-|kemah-yachty-gras|palestine-mardi-gras-|beaumont-pardi-gras|oak-cliff-mardi-gras-)|events\/mardi-gras)/.test(new URL(page.url).pathname));
const observedMardiGrasRoutes = new Set(mardiGrasPages.map((item) => new URL(item.url).pathname));
if (mardiGrasPages.length !== 12 || observedMardiGrasRoutes.size !== 12) {
  throw new Error('Mardi Gras canonical acceptance must cover exactly 11 distinct guides plus the statewide hub');
}
function mardiGrasHtmlDefects(html, url) {
  const route = new URL(url).pathname;
  if (!observedMardiGrasRoutes.has(route)) return [];
  const failures = [];
  const canonical = [...html.matchAll(/<link\b[^>]*>/gi)]
    .map(([tag]) => tag)
    .find((tag) => /\brel=["']canonical["']/i.test(tag));
  if (!canonical || !canonical.includes('href="' + url + '"')) failures.push('canonical link missing or wrong route');
  if (!/<script\b[^>]*type=["']application\/ld\+json["']/i.test(html)) {
    failures.push('JSON-LD script missing');
  }
  if (route === '/events/mardi-gras') {
    if (!/"@type"\s*:\s*"CollectionPage"/.test(html) || !/"@type"\s*:\s*"ItemList"/.test(html)) {
      failures.push('statewide hub CollectionPage / ItemList schema missing');
    }
  } else if (!/"@type"\s*:\s*"Event"/.test(html)) {
    failures.push('individual guide Event schema missing');
  }
  return failures;
}

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
        lastMissing.push(...mardiGrasHtmlDefects(html, page.url));
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
