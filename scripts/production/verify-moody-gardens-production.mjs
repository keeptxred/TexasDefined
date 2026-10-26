const targets = [
  ["direct-worker", "https://texasdefined-site.freddy-coppola.workers.dev/destination/moody-gardens"],
  ["canonical-domain", "https://texasdefined.com/destination/moody-gardens"],
];

const customMarker = "How to visit Moody Gardens without wasting time or ticket money";
const affiliateMarker = "Tours & bookable experiences";
const imageMarkers = [
  "Moody_Gardens_Aquarium_Pyramid_HDR_Galveston_(6971130700).jpg",
  "Moody_Gardens_Rainforest_Pyramid_(14248736931).jpg",
  "Discovery_Pyramid_Moody_Gardens.jpg",
  "The_Moody_Gardens_Hotel_pool_at_night_6-10.jpg",
];
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
  const customIndex = html.indexOf(customMarker);
  const affiliateIndex = html.indexOf(affiliateMarker);
  if (affiliateIndex >= 0 && customIndex >= affiliateIndex) failures.push(`${label}: Moody Gardens editorial must render before Viator affiliate content`);
  for (const imageMarker of imageMarkers) {
    if (!html.includes(imageMarker)) failures.push(`${label}: Moody Gardens image card missing asset ${imageMarker}`);
  }
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
