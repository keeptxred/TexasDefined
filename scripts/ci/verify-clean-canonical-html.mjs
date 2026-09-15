const ORIGIN = (process.env.PRODUCTION_ORIGIN || "https://texasdefined.com").replace(/\/$/, "");

const targets = [
  ["austin-bluebonnets", "/article/bluebonnets-near-austin", "How to time an Austin bluebonnet day"],
  ["houston-bluebonnets", "/article/bluebonnets-near-houston", "Why Washington County is the safest bet from Houston"],
  ["dfw-bluebonnets", "/article/bluebonnets-near-dallas-fort-worth", "Use Ennis as a system, not a single stop"],
  ["san-antonio-bluebonnets", "/article/bluebonnets-near-san-antonio", "San Antonio sits between two bloom zones"],
  ["bluebonnet-festivals", "/article/texas-bluebonnet-festivals", "Festival weekend is not a bloom guarantee"],
  ["bluebonnet-law", "/article/is-it-illegal-to-pick-bluebonnets-in-texas", "The myth hides several real rules"],
  ["christmas-lights", "/article/best-christmas-lights-in-texas", "Choose the setting, not only the bulb count"],
  ["christmas-trains", "/article/texas-christmas-train-rides", "Two Texas rail experiences lead the list"],
  ["free-christmas", "/article/free-christmas-events-in-texas", "Fredericksburg: Christmas Nights of Lights at Marktplatz"],
  ["east-texas-fall", "/article/east-texas-fall-colors", "East Texas usually runs later than the Hill Country"],
  ["hill-country-fall", "/article/hill-country-fall-colors", "The Hill Country fall season follows water and elevation"],
  ["fall-state-parks", "/article/best-texas-state-parks-for-fall-colors", "Pick the park by the kind of fall color you want"],
  ["friday-night", "/article/friday-night-and-the-texas-town", "The easiest way to misunderstand Texas high-school football is to look only at the football"],
  ["moving-texas", "/article/moving-to-texas-what-nobody-tells-you", "The best way to move here is to understand the systems before you fall in love with a kitchen"],
  ["moving-houston", "/article/moving-to-houston-address-checklist", "Moving to Houston is an address-level decision"],
];

const forbiddenGlobal = ["About 1 minute"];
const forbiddenByPath = new Map([
  [
    "/article/free-christmas-events-in-texas",
    [
      "Texas Christmas trips can get expensive quickly when every evening has timed tickets.",
      "Walk the San Antonio River Walk lights",
    ],
  ],
]);

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function cacheSummary(response) {
  const headers = response.headers;
  return [
    `cf-cache-status=${headers.get("cf-cache-status") || "missing"}`,
    `age=${headers.get("age") || "missing"}`,
    `cache-control=${headers.get("cache-control") || "missing"}`,
    `cdn-cache-control=${headers.get("cdn-cache-control") || "missing"}`,
    `cloudflare-cdn-cache-control=${headers.get("cloudflare-cdn-cache-control") || "missing"}`,
  ].join("; ");
}

async function verifyTarget([label, path, requiredMarker]) {
  const url = `${ORIGIN}${path}`;
  let lastFailure = "not attempted";

  for (let attempt = 1; attempt <= 6; attempt += 1) {
    try {
      const response = await fetch(url, { redirect: "follow" });
      const html = await response.text();
      const forbidden = [...forbiddenGlobal, ...(forbiddenByPath.get(path) || [])];
      const problems = [];

      if (!response.ok) problems.push(`HTTP ${response.status}`);
      if (!html.includes(requiredMarker)) problems.push(`missing marker: ${requiredMarker}`);
      for (const needle of forbidden) {
        if (html.includes(needle)) problems.push(`forbidden stale marker: ${needle}`);
      }

      const cache = cacheSummary(response);
      if (problems.length === 0) {
        console.log(`[${label}] clean canonical HTML verified on attempt ${attempt}: ${cache}`);
        return;
      }

      lastFailure = `${problems.join(" | ")} | ${cache}`;
      console.warn(`[${label}] attempt ${attempt} stale/not-ready: ${lastFailure}`);
    } catch (error) {
      lastFailure = error instanceof Error ? error.message : String(error);
      console.warn(`[${label}] attempt ${attempt} request failed: ${lastFailure}`);
    }

    if (attempt < 6) await sleep(5_000);
  }

  throw new Error(`[${label}] clean canonical verification failed for ${url}: ${lastFailure}`);
}

const failures = [];
for (const target of targets) {
  try {
    await verifyTarget(target);
  } catch (error) {
    failures.push(error instanceof Error ? error.message : String(error));
  }
}

if (failures.length) {
  for (const failure of failures) console.error(`CLEAN CANONICAL HTML FAIL: ${failure}`);
  process.exit(1);
}

console.log(`Clean canonical HTML verification passed for ${targets.length} remediated article URLs with no cache-busting query parameters.`);
