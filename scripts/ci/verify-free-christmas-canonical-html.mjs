const ORIGIN = (process.env.PRODUCTION_ORIGIN || "https://texasdefined.com").replace(/\/$/, "");
const PATH = "/article/free-christmas-events-in-texas";
const REQUIRED_MARKER = "Fredericksburg: Christmas Nights of Lights at Marktplatz";
const FORBIDDEN_MARKERS = [
  "About 1 minute",
  "Texas Christmas trips can get expensive quickly when every evening has timed tickets.",
  "Walk the San Antonio River Walk lights",
];
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function cacheSummary(response) {
  return [
    `cf-cache-status=${response.headers.get("cf-cache-status") || "missing"}`,
    `age=${response.headers.get("age") || "missing"}`,
    `cache-control=${response.headers.get("cache-control") || "missing"}`,
  ].join("; ");
}

let lastFailure = "not attempted";
for (let attempt = 1; attempt <= 6; attempt += 1) {
  try {
    const response = await fetch(`${ORIGIN}${PATH}`, { redirect: "follow" });
    const html = await response.text();
    const problems = [];
    if (!response.ok) problems.push(`HTTP ${response.status}`);
    if (!html.includes(REQUIRED_MARKER)) problems.push(`missing marker: ${REQUIRED_MARKER}`);
    for (const marker of FORBIDDEN_MARKERS) {
      if (html.includes(marker)) problems.push(`forbidden stale marker: ${marker}`);
    }

    const cache = cacheSummary(response);
    if (problems.length === 0) {
      console.log(`Free Christmas bare canonical HTML verified on attempt ${attempt}: ${cache}`);
      process.exit(0);
    }
    lastFailure = `${problems.join(" | ")} | ${cache}`;
    console.warn(`Attempt ${attempt} stale/not-ready: ${lastFailure}`);
  } catch (error) {
    lastFailure = error instanceof Error ? error.message : String(error);
    console.warn(`Attempt ${attempt} request failed: ${lastFailure}`);
  }

  if (attempt < 6) await sleep(5_000);
}

console.error(`FREE CHRISTMAS CANONICAL HTML FAIL: ${ORIGIN}${PATH}: ${lastFailure}`);
process.exit(1);
