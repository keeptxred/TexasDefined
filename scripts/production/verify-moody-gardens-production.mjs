const targets = [
  ["direct-worker", "https://texasdefined-site.freddy-coppola.workers.dev/destination/moody-gardens"],
  ["canonical-domain", "https://texasdefined.com/destination/moody-gardens"],
];

const customMarker = "How to visit Moody Gardens without wasting time or ticket money";
const forbiddenMarkers = [
  "Independent Texas Defined research",
  "Why this place matters",
  "Our trip-planning assessment",
  "Things to do and see",
];

const failures = [];
for (const [label, rawUrl] of targets) {
  const url = new URL(rawUrl);
  url.searchParams.set("production_acceptance", process.env.GITHUB_SHA || Date.now().toString());
  const response = await fetch(url, {
    redirect: "follow",
    headers: {
      "cache-control": "no-cache",
      pragma: "no-cache",
      "user-agent": "TexasDefined-production-acceptance/1.0",
    },
  });
  const html = await response.text();
  if (!response.ok) failures.push(`${label}: HTTP ${response.status}`);
  if (!html.includes(customMarker)) failures.push(`${label}: custom Moody Gardens planning section missing`);
  for (const marker of forbiddenMarkers) {
    if (html.includes(marker)) failures.push(`${label}: stale/duplicate generic authority marker present: ${marker}`);
  }
  console.log(`Moody Gardens production acceptance: ${label} HTTP ${response.status}; bytes=${html.length}`);
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log("Moody Gardens production acceptance passed.");
