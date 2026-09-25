const origin = process.env.PRODUCTION_ORIGIN ?? "https://texasdefined.com";
const sha = process.env.GITHUB_SHA ?? "local";
const runId = process.env.GITHUB_RUN_ID ?? Date.now().toString();

const pages = [
  ["/gaming", "Gaming & Esports in Texas", ["CollectionPage", "ItemList"]],
  ["/gaming/video-game-industry", "Texas Video Game Industry", ["Article", "BreadcrumbList"]],
  ["/gaming/why-dallas-matters-online-gaming", "Why Dallas Matters to Online Gaming", ["Article", "BreadcrumbList"]],
  ["/gaming/latency", "Texas Online Gaming Latency Guide", ["Article", "BreadcrumbList"]],
  ["/gaming/companies", "Video Game Companies in Texas", ["Article", "BreadcrumbList"]],
  ["/gaming/austin", "Austin Game Development", ["Article", "BreadcrumbList"]],
  ["/gaming/dfw", "Dallas–Fort Worth Gaming Industry", ["Article", "BreadcrumbList"]],
  ["/gaming/esports", "Texas Esports", ["Article", "BreadcrumbList"]],
  ["/gaming/esports-stadium-arlington", "Esports Stadium Arlington", ["Article", "BreadcrumbList"]],
  ["/gaming/college-esports", "College Esports in Texas", ["Article", "BreadcrumbList"]],
  ["/gaming/careers", "Gaming Careers in Texas", ["Article", "BreadcrumbList"]],
  ["/gaming/history", "History of Video Games in Texas", ["Article", "BreadcrumbList"]],
  ["/gaming/events-conventions", "Gaming Conventions & Esports Events in Texas", ["Article", "BreadcrumbList"]],
  ["/gaming/data-centers-internet-infrastructure", "Texas Data Centers, Internet Infrastructure & Online Gaming", ["Article", "BreadcrumbList"]],
];

const commercialChecks = [
  {
    path: "/gaming/why-dallas-matters-online-gaming",
    markers: [
      'data-affiliate-partner="gearup"',
      'data-commercial-partner="gearup"',
      'data-cj-link-id="17255582"',
      'rel="sponsored nofollow noopener noreferrer"',
      "TexasDefined may earn a commission",
    ],
  },
  {
    path: "/gaming/latency",
    markers: [
      'data-affiliate-partner="gearup"',
      'data-commercial-partner="gearup"',
      'data-cj-link-id="17255582"',
      'rel="sponsored nofollow noopener noreferrer"',
      "TexasDefined may earn a commission",
    ],
  },
  {
    path: "/gaming/esports-stadium-arlington",
    markers: [
      'data-affiliate-partner="hotels.com"',
      'data-commercial-partner="hotels.com"',
      "gaming-esports-stadium-arlington-stay",
      "Live! by Loews",
      "TexasDefined may earn a commission",
    ],
  },
];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const esc = (v) => v.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

function requireCondition(ok, message) {
  if (!ok) throw new Error(message);
}

function canonical(html, url) {
  const value = esc(url);
  return new RegExp(
    `<link[^>]+rel=["']canonical["'][^>]+href=["']${value}["']|<link[^>]+href=["']${value}["'][^>]+rel=["']canonical["']`,
    "i",
  ).test(html);
}

function noindex(html) {
  return /<meta\b[^>]*(?:name=["']robots["'][^>]*content=["'][^"']*noindex|content=["'][^"']*noindex[^"']*["'][^>]*name=["']robots["'])/i.test(html);
}

async function fetchRetry(path, label) {
  let last;
  for (let i = 1; i <= 6; i += 1) {
    try {
      const response = await fetch(
        `${origin}${path}?verify=${encodeURIComponent(`${sha}-${runId}-${label}-${i}`)}`,
        {
          redirect: "follow",
          cache: "no-store",
          signal: AbortSignal.timeout(30000),
          headers: { "user-agent": "TexasDefined-Gaming-Production-Smoke/1.0" },
        },
      );
      const body = await response.text();
      last = { response, body };
      if (response.status < 500 && response.headers.get("cf-mitigated")?.toLowerCase() !== "challenge") return last;
    } catch (error) {
      last = { error };
    }
    if (i < 6) await sleep(5000);
  }
  return last;
}

const liveBodies = new Map();

for (const [path, title, schemas] of pages) {
  const result = await fetchRetry(path, path);
  requireCondition(result?.response?.status === 200, `${path}: expected 200`);
  requireCondition(!noindex(result.body), `${path}: unexpected noindex`);
  requireCondition(canonical(result.body, `${origin}${path}`), `${path}: canonical missing`);
  requireCondition(result.body.includes(title), `${path}: title marker missing`);
  for (const schema of schemas) {
    requireCondition(result.body.includes(schema), `${path}: schema ${schema} missing`);
  }
  liveBodies.set(path, result.body);
}

const localCrossLinkPages = [
  "/city/fort-worth",
  "/city/lubbock",
  "/city/college-station",
  "/county/mclennan",
  "/county/smith",
  "/county/hays",
  "/county/brazos",
];

for (const path of localCrossLinkPages) {
  const result = await fetchRetry(path, `gaming-local-crosslink-${path.replaceAll("/", "-")}`);
  requireCondition(result?.response?.status === 200, `${path}: expected 200 while verifying local gaming cross-link`);
  requireCondition(
    result.body.includes('href="/gaming/college-esports"'),
    `${path}: college-esports local-authority cross-link missing`,
  );
}

const sitemap = await fetchRetry("/sitemap.xml", "gaming-sitemap");
requireCondition(sitemap?.response?.status === 200, "gaming sitemap unavailable");
for (const [path] of pages) {
  requireCondition(sitemap.body.includes(`${origin}${path}`), `sitemap missing ${path}`);
}

for (const check of commercialChecks) {
  const body = liveBodies.get(check.path) ?? "";
  for (const marker of check.markers) {
    requireCondition(body.includes(marker), `${check.path}: commercial marker missing: ${marker}`);
  }
}

const authorityDepthChecks = [
  {
    path: "/gaming/college-esports",
    markers: ["Baylor University", "Texas Wesleyan University", "Lubbock Christian University", "The University of Texas at Tyler", "Texas Tech University", "Texas State University"],
  },
  {
    path: "/gaming/events-conventions",
    markers: ["QuakeCon has a durable Texas identity", "annual BYOC LAN party", "August 6–9"],
  },
];

for (const check of authorityDepthChecks) {
  const body = liveBodies.get(check.path) ?? "";
  for (const marker of check.markers) {
    requireCondition(body.includes(marker), `${check.path}: authority-depth marker missing: ${marker}`);
  }
}

for (const [path] of pages) {
  if (commercialChecks.some((check) => check.path === path)) continue;
  const body = liveBodies.get(path) ?? "";
  requireCondition(
    !body.includes('data-affiliate-partner="gearup"'),
    `${path}: GearUP appeared outside the two reviewed routing/latency guides`,
  );
}

const invalid = await fetchRetry("/gaming/not-a-real-topic", "gaming-invalid");
requireCondition(
  invalid?.response &&
    (invalid.response.status === 404 || (invalid.response.status === 200 && noindex(invalid.body))),
  "invalid gaming slug must fail closed",
);

console.log(
  `Texas gaming production verification passed: ${pages.length} governed routes are live, self-canonical, indexable, schema-complete and present in the sitemap; GearUP remains limited to the two reviewed network guides; the Arlington Hotels.com placement retains tracked commercial metadata; invalid slugs fail closed.`,
);
