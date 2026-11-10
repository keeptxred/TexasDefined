// Editorial drift detector for the dated workforce comparison on /texas-industries.
// Never silently rewrite a public job-market figure, date or page content.
import { appendFileSync } from "node:fs";

const references = [
  {
    label: "Texas Workforce Commission September 2026 employment",
    url: "https://lmi.twc.texas.gov/explore/LMI/LMI_emp.asp",
    markers: ["SEPTEMBER", "2026", "14,461,300", "154,300", "1.1%"],
  },
  {
    label: "BLS Texas business employment dynamics, Q1 2026",
    url: "https://www.bls.gov/regions/southwest/news-release/2026/businessemploymentdynamics_texas_20261030.htm",
    markers: ["October 30, 2026", "654,260", "653,018", "1,242", "6,880", "6,459", "14,366"],
  },
];
const outcomes = await Promise.all(references.map(async source => {
  try {
    const response = await fetch(source.url, {
      headers: { "User-Agent": "TexasDefined-GitHub-Editorial-Review/1.0" },
      signal: AbortSignal.timeout(16000),
    });
    if (!response.ok) return { ...source, state: "REVIEW", reason: "HTTP " + response.status };
    const html = await response.text();
    const missing = source.markers.filter(marker => !html.toLowerCase().includes(marker.toLowerCase()));
    return { ...source, state: missing.length ? "REVIEW" : "PASS",
      reason: missing.length ? "Expected published-period evidence missing: " + missing.join(", ") : "Expected source figures and period still present" };
  } catch (error) {
    return { ...source, state: "REVIEW", reason: String(error).slice(0,200) };
  }
}));
const log = [
  "### Monthly Texas industries workforce authority source audit",
  "Verified at " + new Date().toISOString() + ". REVIEW is a signal to research: official servers may reject automated requests and revised source figures must not silently replace original facts.",
  ...outcomes.map(x => "- " + x.state + " " + x.label + ": " + x.reason + " — " + x.url),
  "All public wage, employment, period and comparison edits require renewed editorial verification and protected publication.",
].join("\n") + "\n";
console.log(log);
if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, log);
if (outcomes.some(x => x.state === "REVIEW")) process.exitCode = 1;
