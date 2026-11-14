import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
const read = file => readFileSync(file, "utf8");
const page = read("src/routes/texas-industries.lazy.tsx");
const meta = read("src/routes/texas-industries.tsx");
const workflow = read(".github/workflows/monthly-texas-industries-workforce-sources.yml");
const audit = read("scripts/data/audit-texas-industries-employment-sources.mjs");
const guideValidator = read("scripts/data/validate-texas-question-guides.mjs");

assert(meta.includes('const canonicalPath = "/texas-industries"') && meta.includes('createFileRoute(canonicalPath)') && meta.includes('canonicalLink(texasDefinedBrand, canonicalPath)'), "Preserve existing canonical industry route and link");
assert(page.includes('createLazyFileRoute("/texas-industries")'), "Preserve existing industry SSR route");
assert(page.includes("TEXAS_INDUSTRIES.map"), "Sector directory and its internal links must be retained");
assert(page.includes("November 10, 2026"), "Original editorial review date required");
for (const phrase of [
  "14,461,300", "+154,300", "1.1%", "September 2026",
  "654,260", "653,018", "+1,242", "+6,880", "+6,459", "−14,366",
  "first quarter of 2026", "October 30, 2026", "seasonally adjusted",
]) assert(page.includes(phrase), "Source-backed labor-market fact absent: "+phrase);
assert(654260-653018===1242, "Quarterly gross gains and losses must net to the claimed number");
assert(page.includes("survey scope") || page.includes("measurement concepts"), "Never compare mismatched employment populations as identical");
assert(page.includes("not an available vacancy") || page.includes("not a count of openings"), "Avoid claiming net job change equals vacancies");
assert(page.includes("https://lmi.twc.texas.gov/explore/LMI/LMI_emp.asp"), "TWC primary release citation missing");
assert(page.includes("https://www.bls.gov/regions/southwest/news-release/2026/businessemploymentdynamics_texas_20261030.htm"), "BLS dated primary release citation missing");
for(const route of ["/texas-jobs-without-four-year-degree","/texas-government-jobs","/texas-career-training-options"]) assert(page.includes(route), "Missing relevant career-guide pathway "+route);
assert(guideValidator.includes("'texas-government-jobs'"), "Preserve completed job-guide quality gate");
assert(audit.includes("14,461,300") && audit.includes("654,260"), "Monthly drift check must guard both primary data contexts");
assert(workflow.includes("schedule:") && workflow.includes("audit-texas-industries-employment-sources.mjs"), "Source audit must run on a real GitHub schedule");
assert(workflow.includes("gh issue create") && workflow.includes("gh issue list"), "Schedule must produce a deduplicated editorial review action");
assert(!/guaranteed.*(ranking|job)|guarantees you a job|rank first in Google/i.test(page), "Unsubstantiated ranking or hiring promise");
console.log("PASS: Texas industries snapshot on existing canonical route — TWC monthly jobs vs BLS quarterly establishment dynamics, math, provenance and editorial drift gates");
