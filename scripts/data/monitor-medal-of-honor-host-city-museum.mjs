import fs from "node:fs";

const sources = [
  { name: "NCTC museum", url: "https://www.nctc.edu/museum/", requirements: [
    { label: "Monday–Thursday regular hours", pattern: /Monday\s*[-–]\s*Thursday\s*:\s*8\s*:?\s*00\s*AM\s*to\s*5\s*:?\s*00\s*PM/i },
    { label: "Friday regular hours", pattern: /Friday\s*:\s*8\s*:?\s*00\s*AM\s*[-–to ]+\s*12\s*:?\s*00\s*PM/i },
    { label: "museum phone", pattern: /940\s*[-–]\s*668\s*[-–]\s*3330/ },
  ] },
  { name: "Host City Program museum", url: "https://medalofhonorhostcity.com/museum/", requirements: [
    { label: "Museum name", pattern: /Medal of Honor Host City Museum/i },
    { label: "Gainesville address", pattern: /1525\s*W(?:est)?\.?\s*California/i },
  ] },
  { name: "NCTC handbook", url: "https://www.nctc.edu/media/nctc/documents/pdf/Field%20Trip%20Handbook.pdf", requirements: [
    { label: "Field-trip handbook remains a PDF", pattern: /^%PDF-/ },
  ], pdf: true },
];
const issues = [], results = [];
for (const source of sources) {
  try {
    const response = await fetch(source.url, { headers: { "User-Agent": "TexasDefined-MuseumSourceAudit/1.0 (+https://texasdefined.com/)" }, signal: AbortSignal.timeout(20000) });
    if (!response.ok) throw new Error("HTTP " + response.status);
    const body = source.pdf ? (await response.arrayBuffer()) : await response.text();
    const normalized = source.pdf ? Buffer.from(body).subarray(0, 12).toString() : body.replace(/<[^>]*>/g, " ").replace(/&nbsp;|&#160;/g, " ").replace(/\s+/g, " ");
    const missing = source.requirements.filter((criterion) => !criterion.pattern.test(normalized)).map((criterion) => criterion.label);
    results.push({ source: source.name, url: source.url, status: missing.length ? "review-needed" : "matched", missing });
    if (missing.length) issues.push(source.name + ": source has changed or check needs a revised parser: " + missing.join("; "));
  } catch (err) {
    results.push({ source: source.name, url: source.url, status: "unavailable", reason: String(err) });
    issues.push(source.name + ": unavailable; needs human follow-up if repeated (" + String(err) + ")");
  }
}
const report = { runAt: new Date().toISOString(), destination: "/destination/medal-of-honor-host-city-museum-gainesville", sources: results, issues, note: "No dates, prices or other copy are automatically restamped without an actual fact review." };
fs.mkdirSync("artifacts/museum-source-review", { recursive: true });
fs.writeFileSync("artifacts/museum-source-review/medal-of-honor-host-city-museum.json", JSON.stringify(report, null, 2) + "\n");
console.log(JSON.stringify(report, null, 2));
if (issues.length) process.exitCode = 1;
